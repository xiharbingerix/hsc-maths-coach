import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson } from "../differentialCalculus";
import { financeChoice, financeShortAnswer } from "../questionHelpers";
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

  if (lesson.slug === "correlation-regression") {
    return {
      ...base,
      description:
        "Use correlation, regression equations, predictions, residuals, slope, intercept, and extrapolation warnings.",
      learningIntention:
        "Use correlation and least-squares regression ideas to make and interpret statistical predictions.",
      successCriteria: [
        "Interpret the sign and size of a correlation coefficient.",
        "Use a regression equation to make an appropriate prediction.",
        "Interpret slope and intercept in context.",
        "Calculate and interpret residuals using actual minus predicted.",
      ],
      teaching: {
        paragraphs: [
          "The correlation coefficient r describes the direction and strength of a linear association. Values close to 1 show strong positive association, values close to -1 show strong negative association, and values close to 0 show weak linear association.",
          "A regression equation models the relationship between an explanatory variable x and a response variable y. It can be used for prediction within the data range.",
          "The slope gives the predicted change in y for a one-unit increase in x. The intercept is the predicted y-value when x is 0, but it should only be interpreted when x = 0 makes sense in context.",
          "A residual is actual value minus predicted value. A positive residual means the actual value is above the regression prediction.",
        ],
        latexBlocks: [
          "-1\\le r\\le 1",
          "\\hat{y}=a+bx",
          "\\text{residual}=y-\\hat{y}",
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
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-reg-g1", "A correlation coefficient is r = 0.84. Which description is best?", "A", ["Strong positive linear association", "Strong negative linear association", "Weak association", "No variables are related"], "A value close to 1 is strong positive."),
        financeChoice("y12s2-reg-g2", "A correlation coefficient is r = -0.78. Which description is best?", "B", ["Strong positive", "Strong negative", "No association", "Causation proven"], "A value close to -1 is strong negative."),
        financeShortAnswer("y12s2-reg-g3", "Use the regression model shown to predict the response value.", "y=12.5+4.2x,\\quad x=6", "37.7"),
        financeShortAnswer("y12s2-reg-g4", "A predicted score is 74 and the actual score is 80. Find the residual.", "80-74", "6"),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-reg-i1", "Use the sales model shown to predict sales for the given advertising level.", "y=220+18x,\\quad x=5", "310"),
        financeChoice("y12s2-reg-i2", "In the displayed sales model, what does the slope mean?", "C", ["Sales start at 18", "Advertising causes all sales", "Predicted sales increase by 18 for each extra advertising unit", "The residual is 18"], "Slope is predicted change in y for a one-unit increase in x.", "y=220+18x"),
        financeShortAnswer("y12s2-reg-i3", "Predicted delivery time is 42 minutes and actual delivery time is 38 minutes. Find the residual.", "38-42", "-4", ["-4 min", "-4 minutes"]),
        financeChoice("y12s2-reg-i4", "A model was built from training times between 1 and 8 hours. Predicting for 20 hours is:", "D", ["Interpolation", "Always exact", "A residual", "Extrapolation and should be treated cautiously"], "20 hours is outside the data range."),
        financeChoice("y12s2-reg-i5", "In the displayed regression model, the intercept should be interpreted only if:", "A", ["$x=0$ is meaningful in context", "r is negative", "there is an outlier", "the residual is positive"], "Intercepts are contextual.", "y=12.5+4.2x"),
      ],
      commonMistakes: [
        { mistake: "Treating correlation as proof of causation.", fix: "Correlation measures association, not proof of cause and effect." },
        { mistake: "Reversing x and y in the regression equation.", fix: "Substitute the explanatory variable into x to predict y." },
        { mistake: "Calculating residual as predicted minus actual.", fix: "Use residual = actual - predicted." },
        { mistake: "Extrapolating far outside the data range without caution.", fix: "Predictions are most reliable within the observed data range." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-reg-m1", "r = 0.91 is best described as:", "A", ["Strong positive linear association", "Strong negative linear association", "Weak association", "No linear association"], "0.91 is close to 1."),
        financeChoice("y12s2-reg-m2", "r = -0.86 is best described as:", "B", ["Strong positive", "Strong negative", "No association", "Causation"], "-0.86 is close to -1."),
        financeChoice("y12s2-reg-m3", "r = 0.08 suggests:", "C", ["Strong positive", "Strong negative", "Weak or no linear association", "A guaranteed cause"], "0.08 is close to 0."),
        financeShortAnswer("y12s2-reg-m4", "Use the regression equation shown to predict the response value.", "y=30+2.5x,\\quad x=8", "50"),
        financeShortAnswer("y12s2-reg-m5", "Use the model shown to predict the response value.", "y=5+1.8x,\\quad x=10", "23"),
        financeShortAnswer("y12s2-reg-m6", "A predicted value is 62 and the actual value is 57. Find the residual.", "57-62", "-5"),
        financeChoice("y12s2-reg-m7", "A positive residual means:", "D", ["The correlation is positive", "The model proves causation", "The actual value is below predicted", "The actual value is above predicted"], "Residual = actual - predicted."),
        financeChoice("y12s2-reg-m8", "In the displayed regression model, what does the slope mean?", "A", ["Predicted y increases by 3 for each 1-unit increase in x", "Predicted y is always 3", "x must be 3", "The residual is 3"], "Slope is the predicted rate of change.", "y=12+3x"),
        financeChoice("y12s2-reg-m9", "Predicting outside the range of the data is called:", "B", ["Interpolation", "Extrapolation", "Residual calculation", "Standardising"], "Extrapolation is outside the observed data range."),
        financeChoice("y12s2-reg-m10", "Which conclusion is safest from a strong positive correlation?", "C", ["x definitely causes y", "y definitely causes x", "x and y have a strong positive association", "There is no relationship"], "Correlation describes association, not causation."),
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
        financeShortAnswer("y12s2-normal-m4", "Scores have mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
        financeShortAnswer("y12s2-normal-m5", "Scores have mean 50 and standard deviation 5. Find the z-score for 40.", "(40-50)/5", "-2", ["-2.0"]),
        financeShortAnswer("y12s2-normal-m6", "A value has z = 2 in a distribution with mean 30 and standard deviation 4. Find the raw value.", "30+2(4)", "38"),
        financeChoice("y12s2-normal-m7", "A z-score of -1.25 means:", "C", ["1.25 above the mean", "Equal to the mean", "1.25 standard deviations below the mean", "A residual of -1.25"], "Negative z-scores are below the mean."),
        financeShortAnswer("y12s2-normal-m8", "Scores are normal with mean 70 and standard deviation 6. Find the interval within 1 standard deviation. Enter the lower value.", "70-6", "64"),
        financeShortAnswer("y12s2-normal-m9", "Scores are normal with mean 70 and standard deviation 6. Find the upper value within 2 standard deviations.", "70+2(6)", "82"),
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
      financeShortAnswer("y12s2-stat-exam-m4", "Predicted score is 72 and actual score is 68. Find the residual.", "68-72", "-4"),
      financeChoice("y12s2-stat-exam-m5", "A positive residual means the actual value is:", "C", ["Below predicted", "Equal to the mean", "Above predicted", "Outside the data range"], "Positive residual means actual minus predicted is positive."),
      financeChoice("y12s2-stat-exam-m6", "A regression prediction far outside the data range should be treated with caution because it is:", "D", ["Correlation", "Causation", "Standardising", "Extrapolation"], "Outside the data range is extrapolation."),
      financeShortAnswer("y12s2-stat-exam-m7", "Exam scores have mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
      financeShortAnswer("y12s2-stat-exam-m8", "Product weights have mean 500 g and standard deviation 20 g. Find the z-score for 460 g.", "(460-500)/20", "-2", ["-2.0"]),
      financeChoice("y12s2-stat-exam-m9", "About what percentage of normal data is within 1 standard deviation of the mean?", "A", ["68%", "95%", "99.7%", "1%"], "One standard deviation is about 68%."),
      financeChoice("y12s2-stat-exam-m10", "Which conclusion is safest from correlation alone?", "B", ["One variable definitely causes the other", "The variables are associated", "The variables must be normally distributed", "The residual is always zero"], "Correlation alone supports association, not causation."),
    ],
  };
}

