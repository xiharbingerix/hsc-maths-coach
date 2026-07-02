// Year 12 Standard 1 — Unit 6 "Further Statistical Analysis" — Wave 3 authored sections.
//
//   6B Using a Scatterplot          (scatterplot-interpretation)  — association & correlation
//   6D Interpolation and Extrapolation (interpolation-extrapolation) — predictions & limits
//
// Surviving/folded sections (6A bivariate-data-scatter-plots, 6C line-of-best-fit-predictions,
// 6E data-displays-summary-statistics, probability-and-chance, relative-frequency-expected-value)
// keep their existing overrides. Same pattern as Waves 1–2: Feynman teaching, 4/5/10 with
// EXACTLY 1/1/3 MCQs per section, authored cognitive-demand difficulty, markable answers.
// IDs unprefixed; `y12s1-` is auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";

const UNIT = "further-statistical-analysis";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// ── 6B Using a Scatterplot (association & correlation) ────────────────────────────────
export function year12Standard1ScatterplotInterpretationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "scatterplot-interpretation"
  ) {
    return null;
  }
  const strongPos = {
    description: "Scatterplot of 8 points rising tightly together from lower-left to upper-right, showing a strong positive linear association.",
    points: [
      { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }, { x: 4, y: 6 },
      { x: 5, y: 8 }, { x: 6, y: 9 }, { x: 7, y: 11 }, { x: 8, y: 12 },
    ],
    xMin: 0, xMax: 9, yMin: 0, yMax: 14, xStep: 1, yStep: 2,
    xAxisLabel: "x", yAxisLabel: "y",
  };
  const strongNeg = {
    description: "Scatterplot of 8 points falling tightly from upper-left to lower-right, showing a strong negative linear association.",
    points: [
      { x: 1, y: 12 }, { x: 2, y: 10 }, { x: 3, y: 9 }, { x: 4, y: 7 },
      { x: 5, y: 6 }, { x: 6, y: 4 }, { x: 7, y: 3 }, { x: 8, y: 1 },
    ],
    xMin: 0, xMax: 9, yMin: 0, yMax: 14, xStep: 1, yStep: 2,
    xAxisLabel: "x", yAxisLabel: "y",
  };
  const withOutlier = {
    description: "Scatterplot of 7 points: six lie close to a rising line, and one point at (3, 12) sits far above the pattern as an outlier.",
    points: [
      { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 },
      { x: 5, y: 6 }, { x: 6, y: 7 }, { x: 3, y: 12 },
    ],
    xMin: 0, xMax: 8, yMin: 0, yMax: 14, xStep: 1, yStep: 2,
    xAxisLabel: "x", yAxisLabel: "y",
  };
  return {
    description:
      "Describe the association shown in a scatterplot by direction, form and strength, identify outliers, and distinguish correlation from causation.",
    learningIntention:
      "Interpret a scatterplot's association (direction, form, strength), spot outliers, and avoid the correlation-causation trap.",
    successCriteria: [
      "State the direction of an association as positive or negative.",
      "Describe the strength of a linear association as strong or weak.",
      "Identify the form as linear or non-linear and spot outliers.",
      "Explain why a correlation does not prove that one variable causes the other.",
    ],
    teaching: {
      paragraphs: [
        "A scatterplot turns two measurements on each person or thing into a single dot, and the CLOUD of dots tells a story in three parts. Direction: do the dots rise together (positive — as one goes up so does the other) or fall (negative — one up, the other down)? Form: do they line up straight (linear) or bend (non-linear)? Strength: are they hugging a clear trend (strong) or loosely scattered (weak)? Read all three before saying anything else.",
        "Correlation is just a name for the strength and direction of a LINEAR association. 'Strong positive correlation' means the dots climb together in a tight straight band; 'weak negative' means a loose downward drift. Strength is about how tightly the dots cluster around a line — not how many dots there are.",
        "The biggest trap in all of statistics: correlation is not causation. Two things can move together without one causing the other — often a third 'lurking' variable drives both. Ice-cream sales and drowning rates rise together, but ice cream does not cause drowning; hot weather lifts both. A strong correlation is a reason to investigate, never proof of cause.",
        "Finally, watch for OUTLIERS — points that sit far from the main pattern. They can come from errors or genuinely unusual cases, and a single outlier can distort a trend line, so always note them rather than ignore them.",
      ],
      latexBlocks: [
        "\\text{direction: positive (rises) or negative (falls)}",
        "\\text{strength: strong (tight) or weak (scattered)}",
        "\\text{correlation} \\ne \\text{causation}",
      ],
    },
    workedExamples: [
      {
        title: "Describe an association",
        questionLatex: "\\text{As the hours of study increase, exam marks increase, with points in a tight straight band. Describe the association.}",
        steps: [
          { explanation: "Both rise together, so the direction is positive.", latex: "\\text{positive}" },
          { explanation: "A tight straight band means strong and linear.", latex: "\\text{strong, linear}" },
        ],
        finalAnswerLatex: "\\text{strong positive linear association}",
      },
      {
        title: "Correlation is not causation",
        questionLatex: "\\text{Ice-cream sales and drowning rates are strongly correlated. Does ice cream cause drowning?}",
        steps: [
          { explanation: "A correlation does not prove cause; look for a lurking variable.", latex: "\\text{no}" },
          { explanation: "Hot weather raises both, so it is the common cause.", latex: "\\text{weather drives both}" },
        ],
        finalAnswerLatex: "\\text{No — hot weather drives both}",
      },
    ],
    guidedPractice: [
      mcq(
        "scat-g1",
        "On a scatterplot the points rise together — as x increases, y also increases. The association is:",
        "B",
        ["negative", "positive", "non-existent", "always causal"],
        1,
        "Rising together means both go up.",
        "When both variables increase together the association is positive. (It rising together says nothing about cause.)"
      ),
      ans(
        "scat-g2",
        "As the temperature rises, ice-cream sales rise. State the direction of the association (positive or negative).",
        "\\text{both increase}",
        "positive",
        2,
        "Do the two variables move the same way or opposite ways?",
        "Both variables increase together, so the direction of the association is positive.",
        ["positive association"]
      ),
      ans(
        "scat-g3",
        "Using the scatterplot, state the direction of the association (positive or negative).",
        "\\text{read the trend}",
        "positive",
        2,
        "Do the points rise or fall from left to right?",
        "The points rise from lower-left to upper-right, so the association is positive.",
        ["positive association"],
        { scatterPlotDiagram: strongPos }
      ),
      ans(
        "scat-g4",
        "On a scatterplot the points are tightly clustered along a straight line. Is the correlation strong or weak?",
        "\\text{tight cluster}",
        "strong",
        2,
        "Strength is about how tightly the points hug the trend.",
        "Points tightly clustered along a line show a strong correlation (a loose scatter would be weak).",
        ["strong correlation"]
      ),
    ],
    independentPractice: [
      ans(
        "scat-i1",
        "As the number of days absent increases, exam marks decrease. State the direction of the association.",
        "\\text{one up, one down}",
        "negative",
        2,
        "The variables move in opposite directions.",
        "As one variable increases the other decreases, so the association is negative.",
        ["negative association"]
      ),
      mcq(
        "scat-i2",
        "Town records show ice-cream sales and drowning rates are strongly correlated. What is the best conclusion?",
        "C",
        [
          "Eating ice cream causes drowning",
          "Drowning causes ice-cream sales",
          "A third factor (hot weather) likely drives both",
          "The correlation must be a calculation error",
        ],
        3,
        "Correlation does not prove causation; look for a lurking variable.",
        "A strong correlation does not prove cause. Hot weather is a lurking variable that raises both ice-cream sales and swimming (and so drownings) — neither causes the other."
      ),
      ans(
        "scat-i3",
        "Using the scatterplot, how many outliers (points far from the main pattern) are shown?",
        "\\text{count off-pattern points}",
        "1",
        3,
        "Look for any point sitting well away from the trend of the others.",
        "Six points lie close to a rising line; the point at (3, 12) sits far above them, so there is 1 outlier.",
        ["one"],
        { scatterPlotDiagram: withOutlier }
      ),
      ans(
        "scat-i4",
        "A scatterplot shows points widely spread out with only a slight upward drift. Describe the strength of the correlation.",
        "\\text{loose scatter}",
        "weak",
        3,
        "How tightly do the points follow a trend?",
        "Widely spread points with only a slight trend show a weak correlation.",
        ["weak correlation"]
      ),
      ans(
        "scat-i5",
        "A scatterplot's points follow a clear curved (U-shaped) pattern. Is the association linear or non-linear?",
        "\\text{curved pattern}",
        "non-linear",
        3,
        "Linear means the points follow a straight line.",
        "A curved (U-shaped) pattern is not a straight line, so the association is non-linear.",
        ["nonlinear", "not linear"]
      ),
    ],
    masteryQuiz: [
      ans(
        "scat-m1",
        "Using the scatterplot, state the direction of the association.",
        "\\text{read the trend}",
        "negative",
        2,
        "Do the points rise or fall from left to right?",
        "The points fall from upper-left to lower-right, so the association is negative.",
        ["negative association"],
        { scatterPlotDiagram: strongNeg }
      ),
      mcq(
        "scat-m2",
        "Which description matches points that fall steeply in a tight straight band?",
        "C",
        ["weak positive", "strong positive", "strong negative", "no association"],
        3,
        "Falling = negative; tight band = strong.",
        "Falling together means negative; a tight straight band means strong and linear — a strong negative (linear) correlation."
      ),
      ans(
        "scat-m3",
        "Height and shoe size in a class are plotted, and the points climb in a tight band. Describe the correlation in two words (strength and direction).",
        "\\text{tight, rising}",
        "strong positive",
        3,
        "State strength then direction.",
        "A tight rising band is a strong positive correlation.",
        ["strong, positive", "positive strong"]
      ),
      ans(
        "scat-m4",
        "A scatterplot of points is almost a random cloud with no clear trend. Describe the strength.",
        "\\text{no clear trend}",
        "weak",
        3,
        "No clear trend means the points do not hug a line.",
        "A near-random cloud has little or no linear pattern, so the correlation is weak (close to none).",
        ["very weak", "no correlation", "none"]
      ),
      mcq(
        "scat-m5",
        "Across many towns, the number of fire trucks at a fire correlates with the damage caused. The best explanation is:",
        "B",
        [
          "Fire trucks cause more damage",
          "Bigger fires (a third factor) need more trucks AND cause more damage",
          "Damage causes trucks to appear",
          "The data must be wrong",
        ],
        3,
        "Find the lurking variable.",
        "The size of the fire is the lurking variable: bigger fires both bring more trucks and cause more damage. The trucks do not cause the damage — correlation is not causation."
      ),
      ans(
        "scat-m6",
        "Using the scatterplot, does the data contain an outlier? Answer yes or no.",
        "\\text{look off-pattern}",
        "yes",
        3,
        "Is there a point well away from the others' pattern?",
        "Yes — the point at (3, 12) sits far above the rising line formed by the other points, so it is an outlier.",
        ["Yes"],
        { scatterPlotDiagram: withOutlier }
      ),
      ans(
        "scat-m7",
        "Two variables have a strong positive correlation. Can we conclude that one causes the other? Answer yes or no.",
        "\\text{correlation} \\ne \\text{causation}",
        "no",
        4,
        "Does a strong correlation prove cause?",
        "No. Even a strong correlation can be explained by a lurking variable or coincidence, so it does not prove that one variable causes the other.",
        ["No"]
      ),
      mcq(
        "scat-m8",
        "A scatterplot shows points climbing together but quite spread out. The best description is:",
        "A",
        ["weak positive", "strong positive", "weak negative", "strong negative"],
        3,
        "Climbing = positive; spread out = weak.",
        "Climbing together = positive; spread out (loosely scattered) = weak. So it is a weak positive correlation."
      ),
      ans(
        "scat-m9",
        "As a car's age increases, its resale value decreases. State the direction of the association.",
        "\\text{one up, one down}",
        "negative",
        2,
        "The variables move oppositely.",
        "Older cars are worth less, so as age increases value decreases — a negative association.",
        ["negative association"]
      ),
      ans(
        "scat-m10",
        "A scatterplot shows a strong positive linear association between hours trained and race speed. As a runner trains more, their race speed will most likely do what — increase or decrease?",
        "\\text{positive trend}",
        "increase",
        4,
        "Use the direction of the association to predict the trend.",
        "A positive association means the two rise together, so more training is associated with an increase in race speed (a trend, not a guarantee for any individual).",
        ["increases"]
      ),
    ],
    commonMistakes: [
      { mistake: "Treating a correlation as proof that one variable causes the other.", fix: "Correlation is not causation — look for a lurking variable before claiming cause." },
      { mistake: "Judging strength by the number of points rather than the scatter.", fix: "Strength is how tightly the points hug the trend, not how many there are." },
      { mistake: "Calling a clear curved pattern 'no association'.", fix: "A curve is a non-linear association, not the absence of one." },
      { mistake: "Ignoring outliers.", fix: "Note points far from the pattern — they can distort the trend." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 6D Interpolation and Extrapolation ───────────────────────────────────────────────
export function year12Standard1InterpolationExtrapolationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== UNIT ||
    lesson.slug !== "interpolation-extrapolation"
  ) {
    return null;
  }
  const lobfPlot = {
    description: "Scatterplot of points scattered closely around the line of best fit y = 2x + 5, with x-data ranging from about 1 to 7.",
    points: [
      { x: 1, y: 7 }, { x: 2, y: 9 }, { x: 3, y: 12 }, { x: 4, y: 12 },
      { x: 5, y: 16 }, { x: 6, y: 16 }, { x: 7, y: 19 },
    ],
    xMin: 0, xMax: 12, yMin: 0, yMax: 30, xStep: 2, yStep: 5,
    xAxisLabel: "x", yAxisLabel: "y",
    lineOfBestFit: { m: 2, b: 5 } as const,
    correlationLabel: "y = 2x + 5",
  };
  return {
    description:
      "Use a line of best fit to make predictions, distinguish interpolation from extrapolation, and judge the reliability of a prediction.",
    learningIntention:
      "Predict from a line of best fit and judge reliability by whether the prediction interpolates within the data or extrapolates beyond it.",
    successCriteria: [
      "Substitute a value into a line of best fit to make a prediction.",
      "Classify a prediction as interpolation (within the data) or extrapolation (outside it).",
      "Explain why interpolation is generally more reliable than extrapolation.",
      "Recognise limitations such as assuming the trend continues beyond the data.",
    ],
    teaching: {
      paragraphs: [
        "Once a line of best fit summarises the data, you can use it to predict: substitute an x-value into y = mx + b and read off the y. But not all predictions are equally trustworthy, and the difference comes down to one question — are you predicting inside the data you actually have, or beyond it?",
        "INTERPOLATION means predicting WITHIN the range of the observed x-values (between the smallest and largest x in the data). Because you are filling in among points you have seen, the trend is supported by evidence, so interpolation is generally reliable.",
        "EXTRAPOLATION means predicting OUTSIDE the data range. Here you are assuming the straight-line trend keeps going where you have no evidence — and real relationships often bend, level off, or break down. The further you go beyond the data, the less reliable the prediction. A prediction that gives an impossible value (like a negative height or a speed beyond human ability) is a red flag that you have extrapolated too far.",
        "So the method is the same — substitute into the line — but the judgement differs: check the data's x-range first. Inside it, interpolation, usually fine. Outside it, extrapolation, treat with caution and state the limitation. A model is only as good as the data behind it.",
      ],
      latexBlocks: [
        "\\text{prediction: substitute } x \\text{ into } y = mx + b",
        "\\text{interpolation: } x \\text{ within the data range (reliable)}",
        "\\text{extrapolation: } x \\text{ outside the data range (less reliable)}",
      ],
    },
    workedExamples: [
      {
        title: "Predict with a line of best fit",
        questionLatex: "\\text{A line of best fit is } y = 2x + 5.\\ \\text{Predict } y \\text{ when } x = 10.",
        steps: [
          { explanation: "Substitute x = 10 into the line.", latex: "y = 2(10) + 5 = 25" },
        ],
        finalAnswerLatex: "y = 25",
      },
      {
        title: "Interpolation or extrapolation?",
        questionLatex: "\\text{The data has x from 5 to 20. Is a prediction at } x = 25 \\text{ interpolation or extrapolation?}",
        steps: [
          { explanation: "Compare x = 25 with the data range 5 to 20.", latex: "25 > 20" },
          { explanation: "x = 25 is beyond the largest data value, so it is outside the range.", latex: "\\text{extrapolation}" },
        ],
        finalAnswerLatex: "\\text{Extrapolation (less reliable)}",
      },
    ],
    guidedPractice: [
      mcq(
        "inex-g1",
        "Predicting a value WITHIN the range of the data is called:",
        "A",
        ["interpolation", "extrapolation", "correlation", "causation"],
        1,
        "Inside the data range.",
        "Predicting within the range of the observed data is interpolation; predicting outside it is extrapolation."
      ),
      ans(
        "inex-g2",
        "A line of best fit is y = 2x + 5. Predict y when x = 10.",
        "",
        "25",
        2,
        "Substitute x = 10 into the line.",
        "y = 2 × 10 + 5 = 25.",
        [],
        { scatterPlotDiagram: lobfPlot }
      ),
      ans(
        "inex-g3",
        "Predicting a value OUTSIDE the range of the data is called:",
        "",
        "extrapolation",
        2,
        "Outside the observed range.",
        "Predicting beyond the range of the data is called extrapolation.",
        []
      ),
      ans(
        "inex-g4",
        "Data covers x from 5 to 20. Is a prediction at x = 12 interpolation or extrapolation?",
        "",
        "interpolation",
        2,
        "Is 12 inside the range 5 to 20?",
        "x = 12 is between 5 and 20, inside the data range, so it is interpolation.",
        []
      ),
    ],
    independentPractice: [
      ans(
        "inex-i1",
        "A line of best fit is y = 0.5x + 3. Predict y when x = 8.",
        "",
        "7",
        2,
        "Substitute x = 8.",
        "y = 0.5 × 8 + 3 = 4 + 3 = 7."
      ),
      mcq(
        "inex-i2",
        "Data covers x from 10 to 50. A prediction at x = 70 is:",
        "B",
        ["interpolation, reliable", "extrapolation, less reliable", "interpolation, less reliable", "extrapolation, reliable"],
        3,
        "Is 70 inside or outside 10 to 50, and what does that mean for reliability?",
        "x = 70 is beyond the largest data value (50), so it is extrapolation — and predictions outside the data range are less reliable."
      ),
      ans(
        "inex-i3",
        "Data ranges from x = 2 to x = 15. A prediction at x = 20 extrapolates beyond the data. Is the prediction reliable? Answer yes or no.",
        "",
        "no",
        3,
        "Predictions outside the data range are extrapolations.",
        "x = 20 is outside the data range (2 to 15), so it is an extrapolation and is not reliable.",
        ["No"]
      ),
      ans(
        "inex-i4",
        "A line of best fit y = 3x + 2 was found from data with x between 0 and 10. Predict y at x = 6.",
        "",
        "20",
        3,
        "Substitute x = 6 (note it is inside the data range).",
        "y = 3 × 6 + 2 = 20. Since x = 6 is within 0 to 10, this is reliable interpolation."
      ),
      ans(
        "inex-i5",
        "Data covers x from 5 to 20. Classify a prediction at x = 25 as interpolation or extrapolation.",
        "",
        "extrapolation",
        3,
        "Compare 25 with the largest data value.",
        "x = 25 is beyond the largest data value (20), so the prediction is an extrapolation."
      ),
    ],
    masteryQuiz: [
      ans(
        "inex-m1",
        "A line of best fit is y = 4x + 1. Predict y when x = 5.",
        "",
        "21",
        2,
        "Substitute x = 5.",
        "y = 4 × 5 + 1 = 21."
      ),
      mcq(
        "inex-m2",
        "Why is extrapolation generally less reliable than interpolation?",
        "B",
        [
          "The arithmetic is harder outside the data",
          "The trend may not continue beyond the observed data",
          "Extrapolation uses a different formula",
          "Interpolation is always exactly correct",
        ],
        3,
        "Think about evidence beyond the data range.",
        "Extrapolation assumes the straight-line trend continues outside the data, where there is no evidence — the real relationship may bend or break down, so it is less reliable."
      ),
      ans(
        "inex-m3",
        "Data covers x from 0 to 30. Classify a prediction at x = 15 as interpolation or extrapolation.",
        "",
        "interpolation",
        3,
        "Is 15 inside the range?",
        "x = 15 lies within the data range 0 to 30, so the prediction is interpolation.",
        []
      ),
      ans(
        "inex-m4",
        "A line of best fit is y = −2x + 50. Predict y when x = 12.",
        "",
        "26",
        3,
        "Substitute x = 12, watching the negative gradient.",
        "y = −2 × 12 + 50 = −24 + 50 = 26."
      ),
      mcq(
        "inex-m5",
        "Data covers x from 1 to 40. Which prediction is the MOST reliable?",
        "C",
        ["x = 0", "x = 45", "x = 25", "x = 60"],
        3,
        "The most reliable prediction interpolates within the data.",
        "x = 25 is inside the data range (1 to 40), so it is interpolation — the most reliable. The others (0, 45, 60) are outside the range (extrapolation)."
      ),
      ans(
        "inex-m6",
        "A line of best fit passes through (0, 20) and (10, 70). Use it to predict y at x = 4.",
        "",
        "40",
        4,
        "Find the gradient and y-intercept first, then substitute x = 4.",
        "Gradient = (70 − 20) ÷ 10 = 5; y-intercept = 20, so y = 5x + 20. At x = 4: y = 5 × 4 + 20 = 40."
      ),
      ans(
        "inex-m7",
        "Data ranges from x = 8 to x = 40. Classify a prediction at x = 6 as interpolation or extrapolation.",
        "",
        "extrapolation",
        3,
        "x = 6 is below the smallest data value.",
        "x = 6 is below the smallest data value (8), so it is outside the range — extrapolation (extrapolation can occur below the range too, not just above)."
      ),
      mcq(
        "inex-m8",
        "Extending a line of best fit far beyond the data predicts a NEGATIVE number of customers. This best shows that:",
        "B",
        [
          "The line of best fit was calculated wrongly",
          "Extrapolating too far gives unreliable, even impossible, results",
          "Negative customers are acceptable in a model",
          "The data must be deleted",
        ],
        3,
        "An impossible predicted value is a warning sign.",
        "An impossible value (negative customers) shows the linear trend does not hold that far out — extrapolating well beyond the data is unreliable."
      ),
      ans(
        "inex-m9",
        "A line of best fit y = −2x + 30 came from data with x from 1 to 12. Predict y at x = 10.",
        "",
        "10",
        4,
        "Substitute x = 10 (inside the data range, so reliable interpolation).",
        "y = −2 × 10 + 30 = 10. Since x = 10 is within 1 to 12, this is reliable interpolation."
      ),
      ans(
        "inex-m10",
        "A line of best fit is y = 1.5x + 4, found from data with x from 0 to 15. Predict y at x = 40.",
        "",
        "64",
        4,
        "Substitute x = 40, then note it is far outside the data range.",
        "y = 1.5 × 40 + 4 = 64. But x = 40 is far beyond the data (0 to 15), so this is extrapolation and should be treated as unreliable.",
        []
      ),
    ],
    commonMistakes: [
      { mistake: "Trusting an extrapolated prediction as much as an interpolated one.", fix: "Outside the data range the trend may not hold — extrapolation is less reliable." },
      { mistake: "Confusing interpolation and extrapolation.", fix: "Interpolation is within the data range; extrapolation is outside it (above OR below)." },
      { mistake: "Only checking the top of the data range.", fix: "A value below the smallest data x is also extrapolation." },
      { mistake: "Accepting impossible predicted values.", fix: "An impossible value (e.g. negative count) signals you have extrapolated too far." },
    ],
    masteryPassMark: 0.8,
  };
}
