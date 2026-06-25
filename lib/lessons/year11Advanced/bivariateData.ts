import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

// ─── L1: Scatter Plots and Correlation ────────────────────────────────────────

const scWorked: WorkedExample[] = [
  {
    title: "Describe the association shown in a scatter plot of study hours vs test scores",
    questionLatex: "\\text{Data: (hours studied, test score) for 10 students}",
    steps: [
      { explanation: "Identify the explanatory and response variables.", latex: "\\text{Explanatory: hours studied}\\quad\\text{Response: test score}" },
      { explanation: "Look at the overall pattern. As hours increase, scores tend to increase — positive direction.", latex: "\\text{Direction: positive}" },
      { explanation: "Check whether the points lie close to a line (linear) or curve (non-linear). The points follow an approximate line.", latex: "\\text{Form: linear}" },
      { explanation: "Assess how closely clustered the points are around the trend. Points spread moderately — not tight, not random.", latex: "\\text{Strength: moderate}" },
      { explanation: "Check for outliers — a student scoring 95 with only 1 hour studied is an outlier.", latex: "\\text{Outlier: (1, 95)}" },
    ],
    finalAnswerLatex: "\\text{Positive, linear, moderate association; one outlier at (1, 95)}",
  },
  {
    title: "Interpret a correlation coefficient of r = −0.92",
    questionLatex: "r = -0.92",
    steps: [
      { explanation: "The sign of r gives the direction. Negative sign → as one variable increases, the other decreases.", latex: "\\text{Direction: negative}" },
      { explanation: "The magnitude |r| = 0.92 is close to 1. Values near ±1 indicate a strong linear relationship.", latex: "|r|=0.92\\approx 1\\implies \\text{strong}" },
      { explanation: "State the full interpretation.", latex: "r=-0.92\\implies\\text{strong, negative, linear association}" },
      { explanation: "Note what r does NOT tell us: it only measures linear association and does not prove causation.", latex: "\\text{r measures LINEAR association only}" },
    ],
    finalAnswerLatex: "r=-0.92\\implies\\text{strong negative linear association}",
  },
];

const scGuided: PracticeQuestion[] = [
  mc("y11adv-bd-sc-g1", "A scatter plot shows that as temperature increases, ice cream sales increase. The association is:", "B",
    [{ label: "A", text: "Negative" }, { label: "B", text: "Positive" }, { label: "C", text: "Zero" }, { label: "D", text: "Non-linear" }],
    "When both variables increase together, the association is positive. The direction is determined by whether one variable tends to increase or decrease as the other increases.", ""),
  fa("y11adv-bd-sc-g2", "A dataset has correlation coefficient r = 0.15. Describe the strength and direction of the linear association.", "", "positive, weak", ["weak, positive"]),
  mc("y11adv-bd-sc-g3", "Which value of r indicates the strongest linear association?", "D",
    [{ label: "A", text: "$r = 0.6$" }, { label: "B", text: "$r = -0.5$" }, { label: "C", text: "$r = 0.85$" }, { label: "D", text: "$r = -0.95$" }],
    "Strength is determined by the magnitude |r|. Here |−0.95| = 0.95 is the largest, so it indicates the strongest linear association (the negative sign only tells us the direction).", ""),
  fa("y11adv-bd-sc-g4", "In a study of height (cm) and shoe size, which is the explanatory variable?", "", "height", ["height (cm)"]),
];

const scIndep: PracticeQuestion[] = [
  mc("y11adv-bd-sc-i1", "A scatter plot has points scattered randomly with no pattern. The association is:", "C",
    [{ label: "A", text: "Strong positive" }, { label: "B", text: "Strong negative" }, { label: "C", text: "No association" }, { label: "D", text: "Non-linear" }],
    "If points are scattered randomly with no discernible trend, there is no association between the two variables. The correlation coefficient would be close to 0.", ""),
  fa("y11adv-bd-sc-i2", "A scatter plot shows points curving upward steeply — not following a straight line. What form of association is this?", "", "non-linear", ["non linear", "nonlinear"]),
  mc("y11adv-bd-sc-i3", "A high correlation between shoe size and reading ability in primary school children is likely due to:", "B",
    [{ label: "A", text: "Larger feet make children read better" }, { label: "B", text: "Age is a lurking variable — older children have bigger feet AND better reading ability" }, { label: "C", text: "Reading ability causes feet to grow" }, { label: "D", text: "Pure coincidence with no explanation" }],
    "This is a classic example of a lurking variable. Age affects both shoe size and reading ability. The two variables are correlated not because one causes the other, but because both are caused by a third variable (age).", ""),
  fa("y11adv-bd-sc-i4", "r = −0.78. Describe the association in terms of direction and strength.", "", "negative, strong", ["strong, negative"]),
  mc("y11adv-bd-sc-i5", "The correlation coefficient r always takes values:", "C",
    [{ label: "A", text: "$0 \\leq r \\leq 1$" }, { label: "B", text: "$-1 < r < 1$ (excluding the endpoints)" }, { label: "C", text: "$-1 \\leq r \\leq 1$" }, { label: "D", text: "$r > 0$" }],
    "By definition, the correlation coefficient satisfies −1 ≤ r ≤ 1. r = −1 means perfect negative linear association; r = 1 means perfect positive linear association; r = 0 means no linear association.", ""),
];

const scMastery: PracticeQuestion[] = [
  fa("y11adv-bd-sc-m1", "Describe the association for r = 0.97.", "", "positive, strong, linear", ["strong positive", "strong, positive"]),
  mc("y11adv-bd-sc-m2", "A researcher finds r = 0.88 between hours of TV watched and exam marks. They conclude watching TV improves exam performance. What is wrong?", "A",
    [{ label: "A", text: "Correlation does not imply causation" }, { label: "B", text: "r = 0.88 is too low to draw any conclusion" }, { label: "C", text: "The correlation should be negative for TV to help" }, { label: "D", text: "Nothing is wrong — a high r always means one variable causes the other" }],
    "Correlation shows a statistical relationship but does not establish cause and effect. A lurking variable (e.g., students with more free time might watch TV more AND study more) or coincidence could explain the pattern.", ""),
  fa("y11adv-bd-sc-m3", "What does it mean for points in a scatter plot to show a 'weak' association?", "", "points are widely spread around the trend line", ["spread out", "loosely clustered"]),
  mc("y11adv-bd-sc-m4", "r = 0 means:", "B",
    [{ label: "A", text: "There is definitely no relationship between the variables" }, { label: "B", text: "There is no linear association (but a non-linear relationship may still exist)" }, { label: "C", text: "The variables are negatively associated" }, { label: "D", text: "All data points lie on a horizontal line" }],
    "r = 0 means no LINEAR association. The variables could still have a curved (non-linear) relationship that r does not detect. For example, a U-shaped pattern gives r ≈ 0 even though a strong relationship exists.", ""),
  fa("y11adv-bd-sc-m5", "In an experiment, fertiliser amount (explanatory) is compared to plant height (response). If r = 0.91, describe the association.", "", "positive, strong, linear", ["strong positive linear"]),
  mc("y11adv-bd-sc-m6", "A scatter plot shows a clear curved pattern (U-shape). Which statement is most accurate?", "C",
    [{ label: "A", text: "r will be close to 1" }, { label: "B", text: "r will be close to −1" }, { label: "C", text: "r will be close to 0, but the association is non-linear" }, { label: "D", text: "r cannot be calculated for curved data" }],
    "r measures only linear association. A symmetric U-shape has roughly equal positive and negative parts that cancel, giving r ≈ 0 — even though a strong non-linear relationship exists.", ""),
  fa("y11adv-bd-sc-m7", "An outlier in a scatter plot is identified at (3, 95) when all other points range from (10, 40) to (20, 80). How might this affect r?", "", "it can pull r toward zero or distort it, reducing apparent strength", ["reduce r", "distort r"]),
  mc("y11adv-bd-sc-m8", "Which pair of variables most likely has a negative association?", "D",
    [{ label: "A", text: "Height and weight" }, { label: "B", text: "Hours studied and exam mark" }, { label: "C", text: "Temperature and ice cream sales" }, { label: "D", text: "Car age (years) and resale value" }],
    "As a car gets older, its resale value typically decreases — a negative association. The other pairs are expected to show positive associations.", ""),
];

// ─── L2: Line of Best Fit ─────────────────────────────────────────────────────

const lfWorked: WorkedExample[] = [
  {
    title: "Find the least squares regression line given summary statistics",
    questionLatex: "\\bar{x}=4,\\;\\bar{y}=12,\\;s_x=2,\\;s_y=5,\\;r=0.8",
    steps: [
      { explanation: "Use the formula for the slope b.", latex: "b = r\\cdot\\frac{s_y}{s_x} = 0.8\\times\\frac{5}{2} = 2" },
      { explanation: "Use the formula for the intercept a, knowing the line passes through (x̄, ȳ).", latex: "a = \\bar{y}-b\\bar{x} = 12-2(4) = 12-8 = 4" },
      { explanation: "State the equation.", latex: "y = 4 + 2x" },
      { explanation: "Interpret slope: each unit increase in x is associated with an average increase of 2 in y.", latex: "b=2:\\;\\text{for each extra unit of }x,\\;y\\text{ increases by 2 on average}" },
    ],
    finalAnswerLatex: "y = 4 + 2x",
  },
  {
    title: "Interpret the regression line y = 15 + 3.2x where x = hours of exercise per week and y = calories burned (hundreds)",
    questionLatex: "y = 15 + 3.2x",
    steps: [
      { explanation: "Interpret the slope b = 3.2.", latex: "b=3.2:\\;\\text{each extra hour of exercise is associated with burning 320 more calories on average}" },
      { explanation: "Interpret the intercept a = 15.", latex: "a=15:\\;\\text{predicted calories burned}=1500\\text{ when }x=0\\text{ (no exercise)}" },
      { explanation: "Verify the line passes through the centroid. If x̄ = 4 and ȳ = 27.8: y = 15 + 3.2(4) = 15 + 12.8 = 27.8. ✓", latex: "y=15+3.2(4)=27.8=\\bar{y}\\checkmark" },
    ],
    finalAnswerLatex: "b=3.2\\text{ (extra 320 cal per hour)},\\;a=15\\text{ (1500 cal at rest)}",
  },
];

const lfGuided: PracticeQuestion[] = [
  fa("y11adv-bd-lf-g1", "Given r = 0.6, s_y = 10, s_x = 4, find the slope b of the least squares line.", "b = r\\cdot\\frac{s_y}{s_x}", "b = 1.5", ["1.5"]),
  mc("y11adv-bd-lf-g2", "The least squares regression line always passes through:", "C",
    [{ label: "A", text: "The origin (0, 0)" }, { label: "B", text: "The point (s_x, s_y)" }, { label: "C", text: "The centroid (x̄, ȳ)" }, { label: "D", text: "The point with the largest x-value" }],
    "A fundamental property of the least squares line is that it always passes through the centroid (x̄, ȳ) — the point of means. This can be used to find the intercept a = ȳ − b·x̄.", ""),
  fa("y11adv-bd-lf-g3", "If b = 2.5 and ȳ = 30, x̄ = 8, find the y-intercept a.", "a = \\bar{y} - b\\bar{x}", "a = 10", ["10"]),
  mc("y11adv-bd-lf-g4", "In the regression line y = 5 + 0.3x, the slope 0.3 means:", "B",
    [{ label: "A", text: "When x = 0, y = 0.3" }, { label: "B", text: "For each unit increase in x, y increases by 0.3 on average" }, { label: "C", text: "y increases by 5 for every 0.3 units of x" }, { label: "D", text: "The correlation coefficient is 0.3" }],
    "The slope b represents the average change in y for each one-unit increase in x. Here, b = 0.3 means y increases by 0.3 units for each extra unit of x, on average.", ""),
];

const lfIndep: PracticeQuestion[] = [
  fa("y11adv-bd-lf-i1", "Given r = −0.75, s_y = 8, s_x = 5, x̄ = 10, ȳ = 20. Find the regression equation y = a + bx.", "b=r\\cdot s_y/s_x,\\;a=\\bar{y}-b\\bar{x}", "y = 32 − 1.2x", ["y=32-1.2x"]),
  mc("y11adv-bd-lf-i2", "The regression line y = 50 − 2x models house price ($000) vs distance from CBD (km). The intercept 50 means:", "A",
    [{ label: "A", text: "Predicted price is $50 000 at 0 km from the CBD (in the CBD)" }, { label: "B", text: "Price increases by $50 000 per km" }, { label: "C", text: "The average price is $50 000" }, { label: "D", text: "Distance is 50 km on average" }],
    "The intercept a = 50 is the predicted y-value when x = 0. Here x = distance, so a = 50 means the predicted price when distance = 0 (i.e. in the CBD itself) is $50 000.", ""),
  fa("y11adv-bd-lf-i3", "A regression line has slope b = −3. Interpret this in context where x = hours of sleep and y = number of errors made.", "", "each extra hour of sleep is associated with 3 fewer errors on average", ["3 fewer errors per hour"]),
  mc("y11adv-bd-lf-i4", "If r = 1, what is true about the least squares line?", "D",
    [{ label: "A", text: "The slope is 1" }, { label: "B", text: "The intercept is 0" }, { label: "C", text: "The line has no slope" }, { label: "D", text: "All data points lie exactly on the line" }],
    "r = 1 means a perfect positive linear relationship. Every data point lies exactly on the regression line with no deviation.", ""),
  fa("y11adv-bd-lf-i5", "Summary stats: x̄ = 5, ȳ = 14, r = 0.9, s_x = 2, s_y = 6. Find the regression equation.", "b=0.9\\times 6/2,\\;a=14-b(5)", "y = −0.5 + 2.7x", ["y=-0.5+2.7x"]),
];

const lfMastery: PracticeQuestion[] = [
  fa("y11adv-bd-lf-m1", "r = 0.5, s_y = 12, s_x = 4. Find b.", "b=r(s_y/s_x)", "b = 1.5", ["1.5"]),
  mc("y11adv-bd-lf-m2", "If the slope b of a regression line is negative, which is true?", "B",
    [{ label: "A", text: "r is positive" }, { label: "B", text: "r is negative" }, { label: "C", text: "r = 0" }, { label: "D", text: "The sign of b and r can differ" }],
    "Since b = r·(s_y/s_x) and standard deviations s_x, s_y are always positive, the sign of b equals the sign of r. A negative slope means r is negative.", ""),
  fa("y11adv-bd-lf-m3", "x̄ = 3, ȳ = 9, b = 2.5. Find a.", "a=\\bar{y}-b\\bar{x}", "a = 1.5", ["1.5"]),
  mc("y11adv-bd-lf-m4", "A fitness study gives y = 220 − 0.8x where x = age and y = predicted max heart rate. Predict for a 40-year-old.", "B",
    [{ label: "A", text: "$188$" }, { label: "B", text: "$188$" }, { label: "C", text: "$196$" }, { label: "D", text: "$180$" }],
    "y = 220 − 0.8(40) = 220 − 32 = 188.", "y=220-0.8x"),
  fa("y11adv-bd-lf-m5", "A regression line y = 3 + 0.5x is fitted to data on x = hours of revision and y = exam mark. Predict y when x = 20.", "y=3+0.5(20)", "y = 13", ["13"]),
  mc("y11adv-bd-lf-m6", "The centroid property means: if x̄ = 6 and b = 4, and the line is y = a + 4x, then if ȳ = 30:", "C",
    [{ label: "A", text: "$a = 30$" }, { label: "B", text: "$a = 0$" }, { label: "C", text: "$a = 6$" }, { label: "D", text: "$a = 54$" }],
    "a = ȳ − b·x̄ = 30 − 4(6) = 30 − 24 = 6.", ""),
  fa("y11adv-bd-lf-m7", "Data on advertising spend x ($000) and sales y ($000): x̄ = 8, ȳ = 50, r = 0.75, s_x = 3, s_y = 16. Find the slope b.", "b=0.75\\times 16/3", "b = 4", ["4"]),
  mc("y11adv-bd-lf-m8", "In fitting a line of best fit by eye, which point must the line pass through?", "A",
    [{ label: "A", text: "The centroid (x̄, ȳ)" }, { label: "B", text: "The origin" }, { label: "C", text: "The point with the median x-value" }, { label: "D", text: "Any convenient point" }],
    "Whether drawn by eye or calculated using least squares, the regression line must pass through the centroid (x̄, ȳ). This is a defining property of the least squares method.", ""),
];

// ─── L3: Interpolation and Extrapolation ──────────────────────────────────────

const ieWorked: WorkedExample[] = [
  {
    title: "Use the regression line to make a prediction and find the residual",
    questionLatex: "y = 10 + 2.5x,\\quad\\text{actual point: }(8,\\, 32)",
    steps: [
      { explanation: "Substitute x = 8 into the regression equation to get the predicted value.", latex: "\\hat{y} = 10 + 2.5(8) = 10 + 20 = 30" },
      { explanation: "Calculate the residual: actual minus predicted.", latex: "\\text{Residual} = y - \\hat{y} = 32 - 30 = 2" },
      { explanation: "Interpret: the actual value (32) is 2 units above the regression line. Positive residual = point above the line.", latex: "\\text{Residual}=+2\\implies\\text{point is above the line}" },
    ],
    finalAnswerLatex: "\\hat{y}=30,\\quad\\text{Residual}=+2",
  },
  {
    title: "Decide whether a prediction is interpolation or extrapolation",
    questionLatex: "y=5+1.2x,\\quad\\text{data range: }x\\in[10,\\,50]",
    steps: [
      { explanation: "Predict for x = 35. Since 35 is within [10, 50], this is interpolation.", latex: "\\hat{y}=5+1.2(35)=5+42=47\\quad\\text{(interpolation — reliable)}" },
      { explanation: "Predict for x = 80. Since 80 is outside [10, 50], this is extrapolation.", latex: "\\hat{y}=5+1.2(80)=5+96=101\\quad\\text{(extrapolation — unreliable)}" },
      { explanation: "Explain why extrapolation is unreliable: the linear pattern may not continue beyond the observed range.", latex: "\\text{The relationship may change beyond }x=50" },
    ],
    finalAnswerLatex: "x=35:\\text{interpolation (reliable)};\\quad x=80:\\text{extrapolation (unreliable)}",
  },
];

const ieGuided: PracticeQuestion[] = [
  mc("y11adv-bd-ie-g1", "A regression line is fitted to data with x ∈ [5, 25]. Using the line to predict when x = 15 is:", "B",
    [{ label: "A", text: "Extrapolation" }, { label: "B", text: "Interpolation" }, { label: "C", text: "A residual calculation" }, { label: "D", text: "Invalid — x must equal x̄" }],
    "Interpolation means predicting within the observed range of x values. Since 15 is between 5 and 25, this is interpolation and the prediction is considered reliable.", ""),
  fa("y11adv-bd-ie-g2", "The regression line is y = 4 + 3x. An actual data point is (5, 22). Find the residual.", "\\text{Residual}=y-\\hat{y}", "residual = 3", ["3", "+3"]),
  mc("y11adv-bd-ie-g3", "A positive residual means the actual data point is:", "A",
    [{ label: "A", text: "Above the regression line" }, { label: "B", text: "Below the regression line" }, { label: "C", text: "On the regression line" }, { label: "D", text: "An outlier" }],
    "Residual = actual y − predicted y. If residual > 0, actual y > predicted y, so the point lies above the regression line.", ""),
  fa("y11adv-bd-ie-g4", "A model is built on data from 2000–2020. Using it to predict for 2035 is an example of:", "", "extrapolation", ["extra-polation"]),
];

const ieIndep: PracticeQuestion[] = [
  fa("y11adv-bd-ie-i1", "y = 20 − 1.5x. Predict ŷ when x = 6.", "\\hat{y}=20-1.5(6)", "ŷ = 11", ["11"]),
  mc("y11adv-bd-ie-i2", "Why is extrapolation generally unreliable?", "C",
    [{ label: "A", text: "The regression equation changes outside the data range" }, { label: "B", text: "Calculators cannot compute values outside the data range" }, { label: "C", text: "The linear pattern observed in the data may not continue beyond the observed range" }, { label: "D", text: "Extrapolation always gives negative predictions" }],
    "The regression line is a model fitted to observed data. Outside that range, we have no evidence that the same linear relationship holds — the true relationship might curve, plateau, or reverse.", ""),
  fa("y11adv-bd-ie-i3", "y = 8 + 2x and the actual point is (10, 25). Find the residual and state whether the point is above or below the line.", "\\hat{y}=8+2(10)=28", "residual = −3; point is below the line", ["−3, below", "-3, below"]),
  mc("y11adv-bd-ie-i4", "Data on rainfall (mm) and crop yield (tonnes) spans x ∈ [200, 600] mm. Which prediction is MOST reliable?", "B",
    [{ label: "A", text: "$x = 650$ mm" }, { label: "B", text: "$x = 380$ mm" }, { label: "C", text: "$x = 100$ mm" }, { label: "D", text: "$x = 800$ mm" }],
    "x = 380 is within the observed range [200, 600], so this is interpolation — the most reliable prediction. All other values are outside the data range.", ""),
  fa("y11adv-bd-ie-i5", "List two reasons why residuals might not all equal zero even for a good model.", "", "random variation in data; the model is an approximation", ["natural variation; approximation"]),
];

const ieMastery: PracticeQuestion[] = [
  mc("y11adv-bd-ie-m1", "For data spanning x ∈ [1, 10], predicting at x = 10 is:", "B",
    [{ label: "A", text: "Extrapolation" }, { label: "B", text: "Interpolation (at the boundary)" }, { label: "C", text: "Neither" }, { label: "D", text: "Invalid" }],
    "x = 10 is exactly at the upper boundary of the observed data range. This is interpolation (though near the edge of the range). Values beyond 10 would be extrapolation.", ""),
  fa("y11adv-bd-ie-m2", "y = 3 + 0.4x. Actual value at x = 20 is y = 14. Find the residual.", "\\hat{y}=3+0.4(20)=11", "residual = 3", ["3", "+3"]),
  mc("y11adv-bd-ie-m3", "The sum of all residuals for a least squares line is:", "A",
    [{ label: "A", text: "Zero" }, { label: "B", text: "Positive" }, { label: "C", text: "Negative" }, { label: "D", text: "Equal to r" }],
    "A key property of the least squares line is that the residuals sum to zero — the positive and negative deviations exactly cancel. The line passes through the centroid, ensuring this balance.", ""),
  fa("y11adv-bd-ie-m4", "A regression line y = 100 + 5x is based on data with x ∈ [0, 20]. A student predicts y at x = 50. State the prediction and explain why it may be unreliable.", "\\hat{y}=100+5(50)=350", "ŷ = 350; this is extrapolation — the pattern may not continue beyond x = 20", ["350; extrapolation"]),
  mc("y11adv-bd-ie-m5", "A negative residual at point (x₀, y₀) means:", "B",
    [{ label: "A", text: "The regression line under-predicts y at x₀" }, { label: "B", text: "The regression line over-predicts y at x₀" }, { label: "C", text: "The point is an outlier" }, { label: "D", text: "x₀ is outside the data range" }],
    "Residual = actual − predicted. A negative residual means actual y < predicted y, so the regression line gives a value that is too high — it over-predicts.", ""),
  fa("y11adv-bd-ie-m6", "y = 50 + 2.5x. x ∈ [10, 40]. Find ŷ at x = 30 and classify as interpolation or extrapolation.", "\\hat{y}=50+2.5(30)=125", "ŷ = 125; interpolation", ["125; interpolation"]),
  mc("y11adv-bd-ie-m7", "Which statement about residuals is FALSE?", "D",
    [{ label: "A", text: "Residual = actual y − predicted y" }, { label: "B", text: "A residual of zero means the point lies exactly on the line" }, { label: "C", text: "Large residuals indicate the model fits those points poorly" }, { label: "D", text: "All residuals must be positive" }],
    "Residuals can be positive (point above line), negative (point below line), or zero. They are not required to be positive.", ""),
  fa("y11adv-bd-ie-m8", "A model predicts sales of 500 units when price = $10, based on data where price ranged from $5 to $8. Explain the concern with this prediction.", "", "extrapolation — price $10 is outside the data range; the linear relationship may not hold", ["outside range; extrapolation"]),
];

// ─── L4: Data Transformation ──────────────────────────────────────────────────

const dtWorked: WorkedExample[] = [
  {
    title: "Linearise data using a log transformation and find the model",
    questionLatex: "\\text{Data }(x, y):\\; (1,3),\\,(2,9),\\,(3,27),\\,(4,81)",
    steps: [
      { explanation: "Notice y grows very rapidly — possibly exponential. Try plotting (x, log y).", latex: "\\log y:\\; \\log 3\\approx0.477,\\;\\log 9\\approx0.954,\\;\\log 27\\approx1.431,\\;\\log 81\\approx1.908" },
      { explanation: "The transformed values (x, log y) are equally spaced — they're linear!", latex: "\\text{Differences in }\\log y: 0.477,\\;0.477,\\;0.477\\implies\\text{linear in }(x,\\log y)" },
      { explanation: "Fit a line to the transformed data. Slope = 0.477, intercept ≈ 0.", latex: "\\log y = 0 + 0.477x\\quad(\\text{using }\\log_{10})" },
      { explanation: "Back-transform to get the model in original units.", latex: "y = 10^{0.477x} = (10^{0.477})^x \\approx 3^x" },
    ],
    finalAnswerLatex: "y \\approx 3^x\\quad(\\text{exponential model})",
  },
  {
    title: "Decide whether a log or square root transformation is needed",
    questionLatex: "\\text{Scatter plot shows a concave-up curve (rapid growth)}",
    steps: [
      { explanation: "A rapid upward curve suggests an exponential relationship y = ab^x or a power relationship y = ax^n.", latex: "\\text{Try: plot }(x,\\,\\log y)\\text{ — if linear, exponential model fits}" },
      { explanation: "If the curve is moderate (less steep), try y = a + b√x by plotting (√x, y).", latex: "\\text{Try: plot }(\\sqrt{x},\\, y)\\text{ — if linear, square-root model fits}" },
      { explanation: "After transformation, check the scatter plot of the transformed data. If it appears linear, the transformation is suitable.", latex: "\\text{Assess linearity of transformed scatter plot}" },
      { explanation: "Once a linear fit is obtained on transformed data, back-transform to get the equation in original variables.", latex: "\\log y = a + bx\\implies y = 10^a \\cdot 10^{bx}" },
    ],
    finalAnswerLatex: "\\text{Choose transformation that makes scatter plot linear; then back-transform}",
  },
];

const dtGuided: PracticeQuestion[] = [
  mc("y11adv-bd-dt-g1", "A scatter plot shows a curved (non-linear) pattern. Why might we transform the data?", "B",
    [{ label: "A", text: "To remove outliers" }, { label: "B", text: "To linearise the relationship so a straight-line model can be fitted" }, { label: "C", text: "To change the explanatory variable" }, { label: "D", text: "To make r = 1" }],
    "Data transformation (e.g. taking log or square root) can straighten a curved scatter plot, allowing us to fit a straight-line regression to the transformed data. The resulting linear model can then be back-transformed to the original scale.", ""),
  fa("y11adv-bd-dt-g2", "If we fit log(y) = 1.2 + 0.5x, what is the back-transformed model (in terms of y and x)?", "y=10^{1.2+0.5x}", "y = 10^{1.2 + 0.5x}", ["y=10^(1.2+0.5x)"]),
  mc("y11adv-bd-dt-g3", "Which transformation is most appropriate for data that appears to follow a pattern like y = a√x?", "C",
    [{ label: "A", text: "Take log(y)" }, { label: "B", text: "Take log(x) and log(y)" }, { label: "C", text: "Take √x and plot against y" }, { label: "D", text: "Take y² and plot against x" }],
    "If y = a√x, then plotting y against √x should give a linear pattern (y = a·(√x)), so plotting (√x, y) will linearise the data.", ""),
  fa("y11adv-bd-dt-g4", "After a log transformation, data gives the linear model log(y) = 0.8 + 0.3x. Predict y when x = 4.", "y=10^{0.8+0.3(4)}=10^{2}", "y = 100", ["100"]),
];

const dtIndep: PracticeQuestion[] = [
  mc("y11adv-bd-dt-i1", "After transforming data to (√x, y), the scatter plot appears linear. This suggests the original model is:", "B",
    [{ label: "A", text: "$y = a + bx$ (already linear)" }, { label: "B", text: "$y = a + b\\sqrt{x}$" }, { label: "C", text: "$y = ab^x$ (exponential)" }, { label: "D", text: "$y = ax^2 + b$" }],
    "If (√x, y) is linear, then the relationship between the original variables is y = a + b√x. The √x transformation reveals a square-root model.", ""),
  fa("y11adv-bd-dt-i2", "A linearised model gives log(y) = 2 + 0.1x. Find y when x = 10.", "y=10^{2+0.1(10)}=10^{3}", "y = 1000", ["1000"]),
  mc("y11adv-bd-dt-i3", "You plot (x, y) and see a curve. You then plot (x, log y) and the points appear linear. What does this suggest?", "A",
    [{ label: "A", text: "The original data follows an exponential model $y = ab^x$" }, { label: "B", text: "The original data is quadratic" }, { label: "C", text: "The transformation made the data worse" }, { label: "D", text: "The correlation coefficient r has increased to 1" }],
    "If (x, log y) is linear, the log-transformed model is log y = a + bx. Exponentiating both sides gives y = 10^a · 10^{bx} = A · B^x, an exponential model.", ""),
  fa("y11adv-bd-dt-i4", "The regression line on transformed data is log(y) = 1.5 + 0.2x. Predict y when x = 0.", "y=10^{1.5+0}=10^{1.5}", "y ≈ 31.6", ["31.6"]),
  mc("y11adv-bd-dt-i5", "How do you check whether a transformation has been successful?", "D",
    [{ label: "A", text: "The value of r increases to above 0.9" }, { label: "B", text: "The slope of the transformed line is positive" }, { label: "C", text: "The back-transformed equation has integer coefficients" }, { label: "D", text: "The scatter plot of the transformed data appears linear" }],
    "The purpose of transformation is to linearise the data. Success is judged by whether the transformed scatter plot looks linear — and the value of r for the transformed data being close to ±1 supports this.", ""),
];

const dtMastery: PracticeQuestion[] = [
  mc("y11adv-bd-dt-m1", "A curve in the scatter plot of (x, y) straightens when you plot (x, log y). The appropriate model is:", "C",
    [{ label: "A", text: "$y = a + bx$" }, { label: "B", text: "$y = a + b\\sqrt{x}$" }, { label: "C", text: "$y = A \\cdot B^x$" }, { label: "D", text: "$y = ax^2 + bx$" }],
    "If (x, log y) is linear, then log y = a + bx, which gives y = 10^a · 10^{bx}. Setting A = 10^a and B = 10^b gives the exponential model y = A·B^x.", ""),
  fa("y11adv-bd-dt-m2", "log(y) = 3 − 0.4x. Find y when x = 5.", "y=10^{3-0.4(5)}=10^{1}", "y = 10", ["10"]),
  mc("y11adv-bd-dt-m3", "After a square root transformation, the line of best fit for (√x, y) is y = 4 + 6√x. Predict y when x = 9.", "B",
    [{ label: "A", text: "$58$" }, { label: "B", text: "$22$" }, { label: "C", text: "$4+6(9)=58$" }, { label: "D", text: "$10$" }],
    "Substitute x = 9: √x = √9 = 3. y = 4 + 6(3) = 4 + 18 = 22.", "y=4+6\\sqrt{x}"),
  fa("y11adv-bd-dt-m4", "Why do we back-transform predictions?", "", "to give predictions in the original units of the response variable", ["to convert to original scale"]),
  mc("y11adv-bd-dt-m5", "log(y) = 0.6 + 0.3x is fitted. Which statement correctly back-transforms this model?", "A",
    [{ label: "A", text: "$y = 10^{0.6} \\cdot 10^{0.3x}$" }, { label: "B", text: "$y = 0.6 + 0.3x$" }, { label: "C", text: "$y = e^{0.6+0.3x}$" }, { label: "D", text: "$y = 10^{0.6+0.3}\\cdot x$" }],
    "log(y) = 0.6 + 0.3x → y = 10^{0.6 + 0.3x} = 10^{0.6} · 10^{0.3x}. This is the exponential model in original units.", ""),
  fa("y11adv-bd-dt-m6", "A transformed model is y = 2 + 5√x. Predict y when x = 16.", "y=2+5\\sqrt{16}=2+20", "y = 22", ["22"]),
  mc("y11adv-bd-dt-m7", "A scatter plot curves upward but plotting (log x, y) gives a linear pattern. What model fits the original data?", "B",
    [{ label: "A", text: "$y = ab^x$" }, { label: "B", text: "$y = a + b\\log x$" }, { label: "C", text: "$y = a + bx$" }, { label: "D", text: "$y = ax^2$" }],
    "If (log x, y) is linear, the model is y = a + b·log x — a logarithmic model in original variables. This is different from an exponential model.", ""),
  fa("y11adv-bd-dt-m8", "After a log transformation, r = 0.98 for (x, log y) but r = 0.62 for (x, y). Which model should be used and why?", "", "the transformed model (log y = a + bx); r = 0.98 indicates a much stronger linear fit", ["transformed; r=0.98 is stronger"]),
];

// ─── L5: Exam Practice ────────────────────────────────────────────────────────

const exGuided: PracticeQuestion[] = [
  mc("y11adv-bd-ex-g1", "A scatter plot of x = hours of revision vs y = exam mark shows a strong positive linear association with r = 0.89. The regression line is y = 32 + 3.5x. A student revises for 15 hours. Which prediction is most appropriate?", "B",
    [{ label: "A", text: "y = 32 + 3.5 = 35.5; this is reliable as 15 is within a sensible range" }, { label: "B", text: "y = 32 + 3.5(15) = 84.5; reliable if 15 is within the observed data range" }, { label: "C", text: "y = 32 + 3.5(15) = 84.5; but this is extrapolation and unreliable" }, { label: "D", text: "The regression line cannot be used for prediction" }],
    "y = 32 + 3.5(15) = 84.5. If 15 hours is within the range of x values in the data, this is interpolation and the prediction is reliable. Always check whether the prediction point is inside or outside the data range.", ""),
  fa("y11adv-bd-ex-g2", "A study of plant growth (y cm) vs sunlight (x hours) gives x̄ = 6, ȳ = 18, r = 0.80, s_x = 2, s_y = 5. Write the regression equation.", "b=0.8\\times5/2=2,\\;a=18-2(6)=6", "y = 6 + 2x", ["y=6+2x"]),
  mc("y11adv-bd-ex-g3", "A scatter plot of (x, y) is curved. After plotting (x, log y) the points are approximately linear with line log y = 0.5 + 0.2x. A researcher predicts y at x = 10. Calculate this prediction.", "C",
    [{ label: "A", text: "$y = 0.5 + 0.2(10) = 2.5$" }, { label: "B", text: "$y = 10^{0.5} \\approx 3.16$" }, { label: "C", text: "$y = 10^{0.5 + 0.2(10)} = 10^{2.5} \\approx 316$" }, { label: "D", text: "$y = e^{0.5+2} \\approx 12$" }],
    "log y = 0.5 + 0.2(10) = 2.5. Back-transform: y = 10^{2.5} ≈ 316. Always substitute into the transformed equation first, then back-transform.", ""),
  fa("y11adv-bd-ex-g4", "In a study, r = 0.95 between ice cream sales and drowning deaths. Does this mean ice cream causes drowning? Explain.", "", "no; hot weather (temperature) is a lurking variable causing both to increase", ["lurking variable; causation ≠ correlation"]),
];

const exIndep: PracticeQuestion[] = [
  mc("y11adv-bd-ex-i1", "The regression line y = 5 + 2x is fitted to data on x = daily temperature (°C) and y = electricity use (kWh), x ∈ [15, 35]. The actual electricity use at x = 25 is 56 kWh. Which is correct?", "B",
    [{ label: "A", text: "Residual = −1; the line over-predicts" }, { label: "B", text: "Residual = 1; the actual value is above the line" }, { label: "C", text: "Residual = 1; the line over-predicts" }, { label: "D", text: "Residual = −1; the actual value is below the line" }],
    "ŷ = 5 + 2(25) = 55. Residual = 56 − 55 = +1. Positive residual means the actual value (56) is above the regression line (55).", ""),
  fa("y11adv-bd-ex-i2", "Data on x = age of car (years) and y = value ($000): x̄ = 4, ȳ = 18, r = −0.88, s_x = 1.5, s_y = 6. Find the regression line.", "b=-0.88\\times6/1.5=-3.52,\\;a=18-(-3.52)(4)=32.08", "y = 32.08 − 3.52x", ["y=32.08-3.52x"]),
  mc("y11adv-bd-ex-i3", "A curved scatter plot is linearised by plotting (x, log y). The transformed line is log y = 2.1 − 0.05x. Predict y when x = 20.", "A",
    [{ label: "A", text: "$y = 10^{2.1-0.05(20)} = 10^{1.1} \\approx 12.6$" }, { label: "B", text: "$y = 2.1 - 0.05(20) = 1.1$" }, { label: "C", text: "$y = 10^{2.1} - 0.05(20) = 125.9 - 1 = 124.9$" }, { label: "D", text: "$y = e^{1.1} \\approx 3.0$" }],
    "log y = 2.1 − 0.05(20) = 2.1 − 1 = 1.1. Back-transform: y = 10^{1.1} ≈ 12.6. Note: use base 10 (log₁₀) as that is the convention in HSC problems.", ""),
  fa("y11adv-bd-ex-i4", "The regression line for study hours vs mark is y = 40 + 4x, fitted using data with x ∈ [1, 10]. State whether predicting for x = 12 is interpolation or extrapolation, and give the prediction.", "\\hat{y}=40+4(12)=88", "extrapolation; ŷ = 88", ["extrapolation, y=88"]),
  mc("y11adv-bd-ex-i5", "Which of the following correctly describes the difference between correlation and causation?", "D",
    [{ label: "A", text: "Correlation means one variable directly affects the other; causation does not" }, { label: "B", text: "They are the same thing — a high r value proves causation" }, { label: "C", text: "Causation can be proved by getting a negative correlation coefficient" }, { label: "D", text: "Correlation measures the strength of a linear association; causation requires additional evidence (e.g. experiment, mechanism)" }],
    "Correlation quantifies the strength of a linear relationship but does not prove cause and effect. Establishing causation requires controlled experiments or a plausible mechanism — not just a high r value.", ""),
];

const exMastery: PracticeQuestion[] = [
  fa("y11adv-bd-ex-m1", "x̄ = 10, ȳ = 50, r = 0.75, s_x = 4, s_y = 20. Find the regression line y = a + bx.", "b=0.75\\times20/4=3.75,\\;a=50-3.75(10)=12.5", "y = 12.5 + 3.75x", ["y=12.5+3.75x"]),
  mc("y11adv-bd-ex-m2", "Using y = 12.5 + 3.75x (data range: x ∈ [2, 18]): predict y at x = 14 and classify.", "B",
    [{ label: "A", text: "$y = 12.5 + 3.75(14) = 65$; extrapolation" }, { label: "B", text: "$y = 12.5 + 3.75(14) = 65$; interpolation" }, { label: "C", text: "$y = 12.5 + 3.75(14) = 65$; cannot classify" }, { label: "D", text: "$y = 52.5$; interpolation" }],
    "y = 12.5 + 3.75(14) = 12.5 + 52.5 = 65. Since 14 ∈ [2, 18], this is interpolation.", ""),
  fa("y11adv-bd-ex-m3", "An actual value at x = 14 is y = 60. Find the residual for the model y = 12.5 + 3.75x.", "60-65", "residual = −5", ["-5"]),
  mc("y11adv-bd-ex-m4", "A student claims that because r = −0.95 between hours of sleep and number of coffees consumed, sleep deprivation causes coffee drinking. Which response is best?", "C",
    [{ label: "A", text: "They are correct — r = −0.95 proves causation" }, { label: "B", text: "They are wrong — the correlation is too weak" }, { label: "C", text: "Causation is not established; a lurking variable (e.g. workload) could cause both less sleep and more coffee" }, { label: "D", text: "They are correct — strong negative correlation always implies a causal mechanism" }],
    "r = −0.95 shows a very strong negative linear association but does NOT prove causation. Workload is a plausible lurking variable: high workload → less sleep AND more coffee. Establishing causation requires a controlled experiment.", ""),
  fa("y11adv-bd-ex-m5", "log(y) = 1.8 + 0.15x. Find y when x = 6.", "y=10^{1.8+0.15(6)}=10^{2.7}", "y ≈ 501", ["501", "10^2.7"]),
  mc("y11adv-bd-ex-m6", "A plot of (x, y) is non-linear, but (√x, y) gives a linear pattern with equation y = 3 + 8√x. Predict y when x = 25.", "D",
    [{ label: "A", text: "$y = 3 + 8(25) = 203$" }, { label: "B", text: "$y = 3 + 8\\sqrt{25} = 43$" }, { label: "C", text: "$y = 3 + 8(5) = 43$" }, { label: "D", text: "$y = 3 + 8(5) = 43$" }],
    "√x = √25 = 5. y = 3 + 8(5) = 3 + 40 = 43.", "y=3+8\\sqrt{x}"),
  fa("y11adv-bd-ex-m7", "Explain why the regression line of y on x should not be used to predict x from y.", "", "the line minimises vertical residuals (errors in y); predicting x from y requires the regression line of x on y, which is different", ["wrong regression line; minimises y-residuals"]),
  mc("y11adv-bd-ex-m8", "Which combination of evidence would MOST strongly support a causal link between variables X and Y?", "C",
    [{ label: "A", text: "r = 0.99 in an observational study" }, { label: "B", text: "r = 0.99 and a large sample size" }, { label: "C", text: "A randomised controlled experiment showing X causes a change in Y, with a plausible mechanism" }, { label: "D", text: "Extrapolation of the regression line showing Y increases with X" }],
    "Causation is best established through randomised controlled experiments (where X is manipulated and everything else is held constant) combined with a plausible biological or physical mechanism. High correlation alone — even with a large sample — cannot establish causation.", ""),
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function year11AdvancedBivariateDataLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "bivariate-data") return null;
  const base = { moduleSlug: lesson.slug, syllabusRef: "MA-S2" };

  if (lesson.slug === "scatter-plots-correlation") {
    return {
      ...base,
      description: "Construct and interpret scatter plots to describe the direction, form, and strength of association between two numerical variables, and use the correlation coefficient r to quantify linear association.",
      learningIntention: "Describe bivariate data relationships using scatter plots and the correlation coefficient, and understand the distinction between correlation and causation.",
      successCriteria: [
        "Identify the explanatory and response variables and construct a scatter plot.",
        "Describe a scatter plot in terms of direction (positive/negative/none), form (linear/non-linear), and strength (strong/moderate/weak).",
        "Interpret the correlation coefficient r: its sign gives direction, its magnitude gives strength, and r only measures linear association.",
        "Identify outliers in a scatter plot and comment on their effect.",
        "Explain why correlation does not imply causation and identify possible lurking variables.",
      ],
      teaching: {
        paragraphs: [
          "When we collect data on two numerical variables from the same individuals, we call this bivariate data. A scatter plot displays each pair (x, y) as a dot on a graph. We place the explanatory variable (the one we think might influence the other) on the horizontal axis, and the response variable on the vertical axis. For example, if we think hours of study influences exam marks, study hours is the explanatory variable and mark is the response variable.",
          "To describe an association from a scatter plot, use three words: direction, form, and strength. Direction: positive means both variables tend to increase together; negative means as one increases, the other decreases; or there may be no clear direction. Form: does the pattern follow a straight line (linear) or a curve (non-linear)? Strength: how closely do the points cluster around the main pattern — strong means tightly clustered, weak means widely scattered.",
          "The correlation coefficient r provides a precise numerical summary of the LINEAR association between two variables. It always lies between −1 and +1. A value close to +1 indicates a strong positive linear association; close to −1 indicates a strong negative linear association; close to 0 indicates little or no linear association. The sign gives direction; the magnitude gives strength. Crucially, r ONLY measures the strength of linear association — a perfect U-shaped curve can give r ≈ 0.",
          "Outliers are individual points that stand apart from the overall pattern. They can be identified visually in a scatter plot as isolated dots far from the main cluster. An outlier can have a dramatic effect on the value of r and the position of the regression line, so they should always be noted and investigated (a data entry error? A genuine unusual case?).",
          "Correlation does not imply causation. Even a very high r does not mean one variable causes the other. Often, a third lurking variable influences both. The classic example: ice cream sales and drowning deaths are positively correlated — not because ice cream causes drowning, but because hot weather causes both to increase. Establishing causation requires controlled experiments, not just observational data.",
        ],
        latexBlocks: [
          "-1 \\leq r \\leq 1",
          "r=1:\\text{ perfect positive linear}\\quad r=-1:\\text{ perfect negative linear}\\quad r=0:\\text{ no linear association}",
        ],
      },
      workedExamples: scWorked,
      guidedPractice: scGuided,
      independentPractice: scIndep,
      commonMistakes: [
        { mistake: "Concluding that r = 0 means there is no relationship between the variables.", fix: "r = 0 means no LINEAR association only. A strong curved (non-linear) relationship can still exist when r = 0. Always look at the scatter plot, not just the number r." },
        { mistake: "Claiming causation from a high correlation coefficient.", fix: "Correlation measures the strength of a linear association, not cause and effect. Always consider lurking variables and note that correlation alone does not establish causation." },
        { mistake: "Confusing direction and strength when reading r.", fix: "The SIGN of r gives direction (+ or −). The MAGNITUDE |r| gives strength (close to 1 = strong, close to 0 = weak). A value of r = −0.9 is a STRONG negative association, not a weak one." },
      ],
      masteryQuiz: scMastery,
    };
  }

  if (lesson.slug === "line-of-best-fit") {
    return {
      ...base,
      description: "Find and interpret the least squares regression line y = a + bx, including the slope and intercept, and use the centroid property to determine the line.",
      learningIntention: "Calculate the equation of the least squares regression line from summary statistics and interpret the slope and intercept in context.",
      successCriteria: [
        "Calculate the slope b = r·(s_y/s_x) of the regression line from summary statistics.",
        "Calculate the intercept a = ȳ − b·x̄ using the centroid property.",
        "Write the regression equation y = a + bx.",
        "Interpret the slope as the average change in y for each one-unit increase in x.",
        "Interpret the intercept as the predicted value of y when x = 0.",
      ],
      teaching: {
        paragraphs: [
          "Once we have established that a bivariate dataset has a linear association (by examining the scatter plot and checking r), we want to find the 'line of best fit' — a straight line that best summarises the linear relationship. The standard method is least squares regression: we find the line y = a + bx that minimises the sum of squared vertical distances from each data point to the line.",
          "The slope b of the least squares line is given by b = r · (s_y / s_x), where r is the correlation coefficient, s_y is the standard deviation of the y-values, and s_x is the standard deviation of the x-values. The formula shows that the slope depends on how spread out y is relative to x (the ratio s_y/s_x) and how strongly they're correlated (r). Notice that if r > 0, then b > 0 (positive slope); if r < 0, then b < 0 (negative slope).",
          "A key property of the least squares line: it always passes through the centroid (x̄, ȳ) — the point of the means. This gives us the intercept formula: substituting (x̄, ȳ) into y = a + bx gives ȳ = a + b·x̄, so a = ȳ − b·x̄. Knowing this property lets us check our answer and also means that if you can't recall the intercept formula in an exam, you can derive it from first principles.",
          "Interpretation is as important as calculation. The slope b = change in y ÷ change in x means: for each one-unit increase in x, y changes by b units on average. If b = 3.5, each extra unit of x is associated with an average increase of 3.5 in y. The intercept a is the predicted value of y when x = 0. This may or may not be practically meaningful — for example, predicting weight when height = 0 cm is nonsensical, but the intercept is still needed to define the line.",
          "When fitting a line by eye, place a ruler so the line passes through (or near) the centroid and roughly balances the points above and below. The least squares line is the 'official' version of this intuition — it provides the unique line that minimises total squared residuals, making it the mathematically optimal straight-line fit.",
        ],
        latexBlocks: [
          "b = r\\cdot\\frac{s_y}{s_x}",
          "a = \\bar{y} - b\\bar{x}",
          "y = a + bx",
        ],
      },
      workedExamples: lfWorked,
      guidedPractice: lfGuided,
      independentPractice: lfIndep,
      commonMistakes: [
        { mistake: "Computing b = r · (s_x / s_y) — swapping s_x and s_y.", fix: "The formula is b = r · (s_y / s_x). The response variable's standard deviation (s_y) is in the numerator. Think: we're predicting y, so y's spread goes on top." },
        { mistake: "Forgetting to use a = ȳ − b·x̄ and instead setting a = ȳ.", fix: "The intercept a is NOT the mean of y. It is a = ȳ − b·x̄. The mean of y only equals the intercept when x̄ = 0, which is rarely true." },
        { mistake: "Interpreting the slope as the correlation coefficient.", fix: "The slope b and correlation coefficient r are different quantities. b depends on the units and scale of x and y, while r is always between −1 and 1. They share the same sign, but b can be any real number." },
      ],
      masteryQuiz: lfMastery,
    };
  }

  if (lesson.slug === "interpolation-extrapolation") {
    return {
      ...base,
      description: "Use the regression line to make predictions, distinguish between interpolation (within the data range) and extrapolation (outside the data range), and calculate and interpret residuals.",
      learningIntention: "Make predictions from a regression line, judge their reliability using interpolation vs extrapolation, and calculate residuals to assess model fit.",
      successCriteria: [
        "Substitute x into the regression equation to find the predicted value ŷ.",
        "Identify whether a prediction is interpolation (within the data range) or extrapolation (outside the data range).",
        "Explain why interpolation is generally more reliable than extrapolation.",
        "Calculate a residual as residual = actual y − predicted y (i.e. y − ŷ).",
        "Interpret a positive residual (point above the line) and a negative residual (point below the line).",
      ],
      teaching: {
        paragraphs: [
          "Once we have the regression equation y = a + bx, we can use it to make predictions: substitute a value of x and calculate the predicted response ŷ. However, not all predictions are equally reliable. The key question is: is the x-value inside or outside the range of the original data?",
          "Interpolation means predicting within the range of the observed x-values. If our data has x ∈ [10, 50] and we predict at x = 30, this is interpolation. It is generally reliable because we are using the regression model in the region where it has been validated by actual data. Extrapolation means predicting outside the observed x-range (e.g. predicting at x = 80 when data only goes to 50). Extrapolation is unreliable because we have no evidence that the linear pattern continues beyond the observed range — the relationship might curve, plateau, or reverse.",
          "A residual measures how far an actual data point is from the regression line. For any data point (x, y), the residual = y − ŷ = actual value − predicted value. A positive residual means the actual y is larger than predicted — the point is above the line. A negative residual means the actual y is smaller than predicted — the point is below the line. A residual of zero means the point lies exactly on the line.",
          "An important property: for the least squares regression line, the sum of all residuals equals zero. The positive and negative deviations exactly balance. This makes sense — the line passes through the centroid (x̄, ȳ), so it sits 'in the middle' of all the data points. This property does NOT mean all residuals are zero; individual residuals will generally be non-zero due to natural variation.",
          "A good regression model has small residuals with no obvious pattern (randomly scattered above and below the line). If residuals show a systematic curved pattern, this suggests the linear model is not appropriate and a transformation or a different model may be needed. Checking residuals is an important step in assessing model quality.",
        ],
        latexBlocks: [
          "\\hat{y} = a + bx",
          "\\text{Residual} = y - \\hat{y}",
          "\\sum \\text{residuals} = 0",
        ],
      },
      workedExamples: ieWorked,
      guidedPractice: ieGuided,
      independentPractice: ieIndep,
      commonMistakes: [
        { mistake: "Computing residual = ŷ − y (predicted minus actual) instead of y − ŷ.", fix: "Residual is always actual minus predicted: y − ŷ. If you compute ŷ − y, you get the wrong sign. A positive residual means the point is above the line (actual > predicted)." },
        { mistake: "Assuming predictions are reliable regardless of whether they are interpolation or extrapolation.", fix: "Always check whether the x-value is inside or outside the data range. Extrapolation carries a significant risk that the linear trend does not continue, and predictions may be wildly inaccurate." },
        { mistake: "Thinking that because r is high, extrapolation is reliable.", fix: "A high r only confirms a strong linear association within the observed data range. It says nothing about what happens outside that range. Extrapolation is risky regardless of how high r is." },
      ],
      masteryQuiz: ieMastery,
    };
  }

  if (lesson.slug === "data-transformation") {
    return {
      ...base,
      description: "Linearise non-linear bivariate data using logarithmic or square root transformations, fit a least squares line to the transformed data, and back-transform to obtain a model in original units.",
      learningIntention: "Apply data transformations to linearise curved scatter plots, assess whether the transformation is successful, and back-transform predictions to the original scale.",
      successCriteria: [
        "Recognise when a scatter plot shows a non-linear pattern that may benefit from transformation.",
        "Apply a log transformation (plotting x vs log y) or square root transformation (plotting √x vs y) to linearise data.",
        "Assess whether the transformation is successful by examining the transformed scatter plot for linearity.",
        "Fit and interpret a least squares line to the transformed data.",
        "Back-transform a predicted value from the transformed scale to the original units.",
      ],
      teaching: {
        paragraphs: [
          "Not all real-world relationships are linear. If a scatter plot shows a curved pattern — for example, y increasing rapidly and curving upward — a straight-line regression will fit poorly. The solution is data transformation: we apply a mathematical function to one or both variables to try to straighten the relationship, then fit a linear model to the transformed data.",
          "The most common transformation in the HSC is the logarithmic transformation. If the scatter plot of (x, y) is curved but the scatter plot of (x, log y) is approximately linear, the original relationship is exponential: log y = a + bx, which gives y = 10^a · 10^{bx} — an exponential model. Here we use log base 10 (log₁₀) unless otherwise stated. Alternatively, if plotting (log x, y) gives a linear pattern, the model is y = a + b log x — a logarithmic model.",
          "A square root transformation is used when the curvature is less extreme. If plotting (√x, y) gives a linear pattern, the model is y = a + b√x. This is called a square root model. In general, we try a transformation, look at the scatter plot of the transformed data, and judge whether it looks more linear than the original.",
          "To assess whether a transformation has worked, examine the scatter plot of the transformed data. If the points now follow an approximate straight line (and r for the transformed data is closer to ±1), the transformation is appropriate. If the transformed scatter plot is still curved, try a different transformation.",
          "Back-transformation is the step of converting a prediction from the transformed scale back to the original units. If the model is log y = a + bx, and we want to predict y: first compute log ŷ = a + bx, then find ŷ = 10^{a + bx}. Forgetting to back-transform is a common error — always check that your final answer is in the units of the original response variable.",
        ],
        latexBlocks: [
          "\\log y = a + bx \\implies y = 10^a \\cdot 10^{bx}\\quad(\\text{exponential model})",
          "y = a + b\\sqrt{x}\\quad(\\text{square root model})",
          "\\text{Back-transform: }\\log\\hat{y}=a+bx\\implies\\hat{y}=10^{a+bx}",
        ],
      },
      workedExamples: dtWorked,
      guidedPractice: dtGuided,
      independentPractice: dtIndep,
      commonMistakes: [
        { mistake: "Forgetting to back-transform and giving the answer as log y instead of y.", fix: "After predicting log ŷ = a + bx, you must convert: ŷ = 10^{a + bx}. The answer must be in the original units of y, not in log units." },
        { mistake: "Confusing which variable is transformed. Plotting (x, log y) vs (log x, y) gives different models.", fix: "If you transform y (plot x vs log y): the model is log y = a + bx → y = A·B^x (exponential). If you transform x (plot log x vs y): the model is y = a + b log x (logarithmic). Identify which variable you transformed to choose the correct back-transformation." },
        { mistake: "Applying a transformation without checking whether it actually linearises the data.", fix: "Always inspect the transformed scatter plot. A transformation is only appropriate if the transformed data appears roughly linear. If it still looks curved, try a different transformation." },
      ],
      masteryQuiz: dtMastery,
    };
  }

  if (lesson.slug === "bivariate-data-exam-practice") {
    return {
      ...base,
      description: "HSC-style multi-step bivariate data problems combining scatter plots, correlation, regression lines, interpolation vs extrapolation, residuals, and data transformations.",
      learningIntention: "Apply all bivariate data techniques to multi-step HSC-standard problems, selecting and justifying appropriate methods.",
      successCriteria: [
        "Describe the association in a scatter plot using direction, form, and strength.",
        "Calculate the regression equation from summary statistics (b = r·s_y/s_x; a = ȳ − b·x̄).",
        "Use the regression line to make predictions and classify them as interpolation or extrapolation.",
        "Calculate and interpret residuals, and identify points above or below the regression line.",
        "Apply logarithmic or square root transformations to linearise data and back-transform predictions.",
      ],
      teaching: {
        paragraphs: [
          "Bivariate data exam questions typically test a sequence of skills in the one problem. A typical structure: describe the scatter plot → calculate r or regression line → make a prediction → classify as interpolation or extrapolation → comment on reliability. Training yourself to move through this sequence automatically is the key to scoring full marks.",
          "When asked to 'describe the association', use three descriptors: direction (positive/negative/none), form (linear/non-linear), and strength (strong/moderate/weak). If r is given, use |r| ≥ 0.75 as a rough benchmark for 'strong'. Write a full sentence, e.g. 'The scatter plot shows a strong, positive, linear association between hours studied and exam mark.'",
          "Regression calculations: memorise b = r·(s_y/s_x) and a = ȳ − b·x̄. In multi-part questions, earlier parts often give you r and summary statistics to find the regression line, and later parts ask you to use the line to predict. Always re-read what is given — sometimes the regression line is given directly and you skip to the prediction step.",
          "When a scatter plot is curved, expect a data transformation sub-question. The typical HSC structure: (a) describe why a linear model is not suitable, (b) apply the given transformation (e.g. log y), (c) use the transformed linear equation to predict, (d) back-transform. Common error: computing log ŷ and stopping there instead of back-transforming to get ŷ.",
          "Causation vs correlation questions are common in extended response. A safe answer acknowledges (1) that correlation does not imply causation, (2) that a high r value only indicates a linear statistical association, and (3) that a lurking variable may explain the relationship. Providing a specific plausible lurking variable shows deeper understanding.",
        ],
        latexBlocks: [
          "b=r\\cdot\\frac{s_y}{s_x},\\quad a=\\bar{y}-b\\bar{x},\\quad y=a+bx",
          "\\text{Residual}=y-\\hat{y}\\quad\\text{(positive}\\Rightarrow\\text{above line)}",
          "\\log\\hat{y}=a+bx\\implies\\hat{y}=10^{a+bx}",
        ],
      },
      workedExamples: [],
      guidedPractice: exGuided,
      independentPractice: exIndep,
      commonMistakes: [
        { mistake: "Describing an association without mentioning all three aspects: direction, form, and strength.", fix: "A complete description requires all three: 'positive, linear, strong' (or similar). Omitting any one of these costs marks. Practice saying all three as a routine when reading a scatter plot." },
        { mistake: "Applying a transformed regression equation without back-transforming the prediction.", fix: "If the model is log y = a + bx, your predicted value is log ŷ — you must convert: ŷ = 10^{a+bx}. The final answer must be in the original units of y." },
        { mistake: "Not justifying interpolation vs extrapolation claims by referencing the data range.", fix: "When classifying a prediction, always state the data range and compare the x-value: 'x = 35 is within the data range [10, 50], so this is interpolation.' Simply saying 'it is interpolation' without evidence is insufficient." },
      ],
      masteryQuiz: exMastery,
    };
  }

  return null;
}
