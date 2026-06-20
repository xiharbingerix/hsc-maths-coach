import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "./differentialCalculus";
import { practicalChoice, measurementAnswer, dataAnswer } from "./questionHelpers";

export function year12Standard1RightAngleTrigonometryLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "measurement-geometry" ||
    lesson.slug !== "right-angle-trigonometry"
  ) {
    return null;
  }

  return {
    description:
      "Use sine, cosine and tangent to solve right-angled triangle problems in practical measurement contexts.",
    learningIntention:
      "Apply right-angle trigonometric ratios to find missing sides and angles in real-world situations.",
    successCriteria: [
      "Identify the opposite, adjacent and hypotenuse sides for the given angle.",
      "Choose the correct trigonometric ratio for the unknown quantity.",
      "Calculate missing lengths or angles and round to the required precision.",
      "Check that answers are sensible for the context and the triangle shape.",
    ],
    teaching: {
      paragraphs: [
        "Right-angle trigonometry uses the three ratios sine, cosine and tangent to connect an acute angle with opposite, adjacent and hypotenuse sides.",
        "For a right triangle with angle \(\theta\): \(\sin\theta=\frac{\text{opposite}}{\text{hypotenuse}}\), \(\cos\theta=\frac{\text{adjacent}}{\text{hypotenuse}}\), and \(\tan\theta=\frac{\text{opposite}}{\text{adjacent}}\).",
        "To choose a ratio, identify whether the unknown is a side opposite the angle, a side adjacent to the angle, or the hypotenuse.",
        "Always check the final number against the context: side lengths must be positive and angles should be between 0 and 90 degrees for an acute angle in a right triangle.",
      ],
      latexBlocks: [
        "\sin\theta=\frac{\text{opposite}}{\text{hypotenuse}}",
        "\cos\theta=\frac{\text{adjacent}}{\text{hypotenuse}}",
        "\tan\theta=\frac{\text{opposite}}{\text{adjacent}}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct ratio for a right triangle",
        questionLatex:
          "\text{The opposite side is }12\text{ and the hypotenuse is }20.\text{ Which ratio finds }\theta?",
        steps: [
          {
            explanation:
              "The unknown angle is opposite the side of length 12 and the hypotenuse is 20.",
          },
          {
            explanation:
              "The ratio connecting opposite and hypotenuse is sine.",
            latex: "\sin\theta=\frac{12}{20}",
          },
          {
            explanation:
              "This setup shows that sine is the correct ratio for this question.",
          },
        ],
        finalAnswerLatex: "\sin\theta=\frac{12}{20}",
      },
      {
        title: "Calculate a missing side using cosine",
        questionLatex:
          "\text{A ramp makes an angle of }32^\circ\text{ with the horizontal and the hypotenuse is }5.2\text{ m. Find the adjacent side.}",
        steps: [
          {
            explanation:
              "The adjacent side is next to the given angle, and the hypotenuse is known.",
            latex: "\cos32^\circ=\frac{\text{adjacent}}{5.2}",
          },
          {
            explanation:
              "Rearrange to find the adjacent side by multiplying both sides by 5.2.",
            latex: "\text{adjacent}=5.2\cos32^\circ",
          },
          {
            explanation:
              "Calculate and round to one decimal place for a practical measurement answer.",
            latex: "\text{adjacent}=4.4\text{ m}",
          },
        ],
        finalAnswerLatex: "4.4\text{ m}",
      },
    ],
    guidedPractice: [
      practicalChoice(
        "right-angle-trig-g1",
        "A right triangle has angle \(\theta\) and a known opposite side of 9 and hypotenuse of 15. Which ratio finds \(\theta\)?",
        "A",
        [
          "\sin\theta=\frac{9}{15}",
          "\cos\theta=\frac{9}{15}",
          "\tan\theta=\frac{9}{15}",
          "\sin\theta=\frac{15}{9}",
        ],
        "The unknown angle is opposite the known side and the hypotenuse is also known, so sine is correct."
      ),
      practicalChoice(
        "right-angle-trig-g2",
        "A 12 m ladder leans against a wall and reaches 9 m high. Which ratio gives the angle between the ladder and the ground?",
        "A",
        [
          "\sin\theta=\frac{9}{12}",
          "\cos\theta=\frac{9}{12}",
          "\tan\theta=\frac{9}{12}",
          "\sin\theta=\frac{12}{9}",
        ],
        "The ladder is the hypotenuse and the height is opposite the angle at the ground, so sine is correct."
      ),
      measurementAnswer(
        "right-angle-trig-g3",
        "A right triangle has angle 40° and the adjacent side is 14 m. Find the length of the opposite side to one decimal place.",
        "\\tan40°\\times14",
        "11.7",
        ["11.74", "11.7 m"]
      ),
      measurementAnswer(
        "right-angle-trig-g4",
        "A ladder of length 8 m makes an angle of 55° with the ground. Find how high up the wall the ladder reaches, to one decimal place.",
        "\\sin55°\\times8",
        "6.6",
        ["6.55", "6.6 m"]
      ),
    ],
    independentPractice: [
      measurementAnswer(
        "right-angle-trig-i1",
        "A right triangle has adjacent side 11 and hypotenuse 17. Find the angle \(\theta\) in degrees to the nearest degree.",
        "\cos\theta=\frac{11}{17}",
        "34",
        ["34°", "34 degrees"]
      ),
      measurementAnswer(
        "right-angle-trig-i2",
        "A right triangle has angle \(\theta=38^\circ\) and hypotenuse 20. Find the opposite side length to one decimal place.",
        "\sin38^\circ\times20",
        "12.3",
        ["12.30"]
      ),
      measurementAnswer(
        "right-angle-trig-i3",
        "A roof makes an angle of 25° with the horizontal. If the horizontal span (adjacent side) is 6 m, find the length of the roof slope to one decimal place.",
        "\\frac{6}{\\cos25°}",
        "6.6",
        ["6.62", "6.6 m"]
      ),
      practicalChoice(
        "right-angle-trig-i4",
        "A right triangle has hypotenuse 10 and angle 30°. Which equation correctly finds the adjacent side?",
        "B",
        [
          "adj = 10 ÷ cos30°",
          "adj = 10 × cos30°",
          "adj = 10 × sin30°",
          "adj = 10 ÷ tan30°",
        ],
        "cos θ = adjacent / hypotenuse → adjacent = hypotenuse × cos θ = 10 × cos30°."
      ),
      measurementAnswer(
        "right-angle-trig-i5",
        "A cable runs from the top of a 12 m pole to the ground and makes an angle of 70° with the ground. Find the length of the cable to one decimal place.",
        "\\frac{12}{\\sin70°}",
        "12.8",
        ["12.77", "12.8 m"]
      ),
    ],
    commonMistakes: [
      {
        mistake: "Using the wrong ratio for the selected side and angle.",
        fix: "Label opposite, adjacent and hypotenuse before choosing sine, cosine or tangent.",
      },
      {
        mistake: "Rounding early and losing accuracy.",
        fix: "Keep the exact ratio until the final step, then round only at the end.",
      },
      {
        mistake: "Confusing the hypotenuse with an adjacent side.",
        fix: "The hypotenuse is always opposite the right angle.",
      },
    ],
    masteryQuiz: [
      practicalChoice(
        "right-angle-trig-m1",
        "A swimmer crosses a river on a path that makes an angle of 22° with the bank. She knows the river width is 30 m. Which ratio gives the swimmer's actual path length?",
        "A",
        [
          "\sin22^\circ=\frac{30}{\text{path}}",
          "\cos22^\circ=\frac{30}{\text{path}}",
          "\tan22^\circ=\frac{30}{\text{path}}",
          "\sin22^\circ=\frac{\text{path}}{30}",
        ],
        "The river width (30 m) is the side opposite the 22° angle; the path is the hypotenuse. sin22° = opposite/hypotenuse = 30/path."
      ),
      measurementAnswer(
        "right-angle-trig-m2",
        "A ramp makes an angle of 28° with the ground and reaches a platform 4.8 m high. Find the ramp length to one decimal place.",
        "\frac{4.8}{\sin28^\circ}",
        "10.2",
        ["10.22", "10.2 m"]
      ),
      measurementAnswer(
        "right-angle-trig-m3",
        "A right triangle has opposite side 7 and adjacent side 24. Find the acute angle \(\theta\) to the nearest degree.",
        "\tan\theta=\frac{7}{24}",
        "16",
        ["16°", "16 degrees"]
      ),
      measurementAnswer(
        "right-angle-trig-m4",
        "A surveyor stands 50 m from the base of a building. The angle of elevation to the top is 42°. Find the height of the building to the nearest metre.",
        "\\tan42°\\times50",
        "45",
        ["45 m", "45.0"]
      ),
      practicalChoice(
        "right-angle-trig-m5",
        "A right triangle has an angle of 50° and the opposite side is 9 cm. Which equation finds the hypotenuse?",
        "A",
        [
          "hyp = 9 ÷ sin50°",
          "hyp = 9 × sin50°",
          "hyp = 9 ÷ cos50°",
          "hyp = 9 × tan50°",
        ],
        "sin θ = opposite / hypotenuse → hypotenuse = opposite ÷ sin θ = 9 ÷ sin50°."
      ),
      measurementAnswer(
        "right-angle-trig-m6",
        "A ski slope drops 80 m vertically over a horizontal distance of 200 m. Find the angle of the slope with the horizontal to the nearest degree.",
        "\\tan\\theta=\\frac{80}{200}",
        "22",
        ["22°", "22 degrees"]
      ),
      measurementAnswer(
        "right-angle-trig-m7",
        "A right triangle has hypotenuse 13 and one angle of 67°. Find the adjacent side length to one decimal place.",
        "\\cos67°\\times13",
        "5.1",
        ["5.08", "5.1 cm"]
      ),
      measurementAnswer(
        "right-angle-trig-m8",
        "From the top of a 45 m cliff the angle of depression to a boat is 32°. Find the horizontal distance from the cliff base to the boat, to the nearest metre.",
        "\\frac{45}{\\tan32°}",
        "72",
        ["72 m", "72.0"]
      ),
      practicalChoice(
        "right-angle-trig-m9",
        "A kite string is 30 m long. If the angle the string makes with the ground is 48°, which expression gives the height of the kite?",
        "C",
        [
          "30 ÷ sin48°",
          "30 × cos48°",
          "30 × sin48°",
          "30 ÷ tan48°",
        ],
        "The height is the side opposite the angle; the string is the hypotenuse. sin48° = height/30 → height = 30 × sin48°."
      ),
      measurementAnswer(
        "right-angle-trig-m10",
        "A guy wire is anchored 6 m from the base of a 10 m pole and stretches from the ground to the top of the pole. Find the angle the wire makes with the ground to the nearest degree.",
        "\\tan\\theta=\\frac{10}{6}",
        "59",
        ["59°", "59 degrees"]
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1DataDisplaysSummaryStatisticsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "data-displays-summary-statistics"
  ) {
    return null;
  }

  return {
    description:
      "Interpret tables, charts and summary statistics in practical data contexts for Standard 1 assessment.",
    learningIntention:
      "Use data displays and summary measures to compare sets of practical data accurately.",
    successCriteria: [
      "Read mean, median and range from simple data displays.",
      "Use correct formulas for average and spread in real situations.",
      "Choose the right measure of centre for a given context.",
      "Describe what a range or median tells you about the data.",
    ],
    teaching: {
      paragraphs: [
        "The mean is the total of the data values divided by the number of values. The median is the middle value when the data are ordered.",
        "Use the range to describe how spread out the data are from lowest to highest. In Standard 1, these measures help compare real-life results such as scores, distances and prices.",
        "A frequency table can make mean and median easier to calculate for repeated values.",
        "When data are not symmetrical, median is often a better centre measure than mean because it is less affected by unusually large or small values.",
      ],
      latexBlocks: [
        "\text{mean}=\frac{\text{sum of values}}{\text{number of values}}",
        "\text{range}=\text{maximum}-\text{minimum}",
      ],
    },
    workedExamples: [
      {
        title: "Find the median from ordered data",
        questionLatex:
          "\text{Data list: }3,\,6,\,6,\,8,\,11.\text{ What is the median?}",
        steps: [
          {
            explanation:
              "The data are already in order. The median is the middle value of the five numbers.",
          },
          {
            explanation:
              "Count to the third element because there are five values.",
          },
          {
            explanation:
              "The third value is 6, so the median is 6.",
          },
        ],
        finalAnswerLatex: "6",
      },
      {
        title: "Calculate a mean from a frequency table",
        questionLatex:
          "\text{Scores: }2,2,3,4,4,5.\text{ Find the mean score.}",
        steps: [
          {
            explanation:
              "Add the scores and divide by the number of scores.",
            latex: "2+2+3+4+4+5=20",
          },
          {
            explanation:
              "There are six scores, so divide 20 by 6.",
            latex: "\frac{20}{6}=3.333\ldots",
          },
          {
            explanation:
              "Round to one decimal place if the context expects a decimal answer.",
            latex: "3.3",
          },
        ],
        finalAnswerLatex: "3.3",
      },
    ],
    guidedPractice: [
      practicalChoice(
        "data-displays-g1",
        "A set of test scores has one outlier at 2 and the rest around 8 or 9. Which measure is least affected by the outlier?",
        "B",
        [
          "Mean",
          "Median",
          "Mode",
          "Range",
        ],
        "The median is least affected by an extreme low value."
      ),
      practicalChoice(
        "data-displays-g2",
        "Which summary statistic describes the difference between the highest and lowest values in a data set?",
        "C",
        [
          "Mean",
          "Median",
          "Range",
          "Mode",
        ],
        "Range is defined as maximum minus minimum."
      ),
      dataAnswer(
        "data-displays-g3",
        "Find the mean of the data set: 8, 12, 10, 14, 6.",
        "\\frac{8+12+10+14+6}{5}",
        "10"
      ),
      dataAnswer(
        "data-displays-g4",
        "Find the median of the data set: 3, 7, 1, 9, 5. (Order them first.)",
        "\\text{ordered: }1,3,5,7,9",
        "5"
      ),
    ],
    independentPractice: [
      dataAnswer(
        "data-displays-i1",
        "A data list is 5, 7, 9, 11, 14. Find the median.",
        "\text{median of ordered values}",
        "9"
      ),
      dataAnswer(
        "data-displays-i2",
        "A student has scores 70, 73, 68, 79, 80. Find the mean score to one decimal place.",
        "\frac{70+73+68+79+80}{5}",
        "74.0",
        ["74"]
      ),
      dataAnswer(
        "data-displays-i3",
        "The daily temperatures (°C) for a week were: 18, 22, 19, 25, 21, 20, 23. Find the range.",
        "25-18",
        "7"
      ),
      practicalChoice(
        "data-displays-i4",
        "A data set has values 2, 3, 3, 3, 50. Why might the median be a better measure of centre than the mean?",
        "A",
        [
          "The outlier 50 inflates the mean but not the median.",
          "The mode is 3 so the mean should also be 3.",
          "The median equals the most common value.",
          "The range is large, making the mean negative.",
        ],
        "Outliers pull the mean away from the typical values; the median stays at the middle value regardless."
      ),
      dataAnswer(
        "data-displays-i5",
        "Six students received marks of 55, 62, 68, 71, 74, 82. Find the median mark.",
        "\\frac{68+71}{2}",
        "69.5"
      ),
    ],
    commonMistakes: [
      {
        mistake: "Taking the mean as the middle value.",
        fix: "Remember that the mean is the total divided by how many items there are."
      },
      {
        mistake: "Using range instead of median to describe the typical value.",
        fix: "Use the median for a typical centre when the data are skewed."
      },
      {
        mistake: "Forgetting to order data before finding the median.",
        fix: "Always order the data first, then choose the middle value."
      },
    ],
    masteryQuiz: [
      practicalChoice(
        "data-displays-m1",
        "For the data values 3, 5, 5, 6, 12, which measure is the middle value?",
        "C",
        [
          "Mean",
          "Mode",
          "Median",
          "Range",
        ],
        "The middle value of the ordered list is the median."
      ),
      dataAnswer(
        "data-displays-m2",
        "A data set is 4, 9, 9, 10, 12. Find the range.",
        "12-4",
        "8"
      ),
      dataAnswer(
        "data-displays-m3",
        "A survey recorded heights 150, 152, 153, 155, 160. What is the mean height to one decimal place?",
        "\\frac{150+152+153+155+160}{5}",
        "154.0",
        ["154"]
      ),
      practicalChoice(
        "data-displays-m4",
        "A stem-and-leaf plot shows leaves 2,5,8 on stem 6 and leaves 1,4 on stem 7. What is the range of the data?",
        "B",
        [
          "6",
          "12",
          "8",
          "14",
        ],
        "The minimum is 62 and the maximum is 74, so the range is 74 − 62 = 12."
      ),
      dataAnswer(
        "data-displays-m5",
        "The ages of players in a team are 16, 17, 17, 18, 19, 19, 19, 22. Find the mode.",
        "\\text{most frequent value}",
        "19"
      ),
      dataAnswer(
        "data-displays-m6",
        "Quiz scores were 6, 8, 5, 10, 7, 9, 8, 6, 10, 7. Find the mean score.",
        "\\frac{6+8+5+10+7+9+8+6+10+7}{10}",
        "7.6"
      ),
      practicalChoice(
        "data-displays-m7",
        "For the data set 1, 2, 3, 4, 100, which statement is correct?",
        "C",
        [
          "Mean = Median = 3",
          "Mean < Median",
          "Mean > Median",
          "Mean = Mode",
        ],
        "The outlier 100 raises the mean to 22 while the median stays at 3, so Mean > Median."
      ),
      dataAnswer(
        "data-displays-m8",
        "A set of 7 values has a sum of 98. Find the mean.",
        "98 ÷ 7",
        "14"
      ),
      dataAnswer(
        "data-displays-m9",
        "Find the median of: 4, 4, 6, 8, 9, 11, 15, 20 (8 values).",
        "\\frac{8+9}{2}",
        "8.5"
      ),
      practicalChoice(
        "data-displays-m10",
        "A student scored 72, 80, 68, 76 on four tests and wants a mean of 75. What score is needed on the fifth test?",
        "D",
        [
          "74",
          "75",
          "78",
          "79",
        ],
        "Required total = 75 × 5 = 375. Current total = 72+80+68+76 = 296. Fifth score = 375 − 296 = 79."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

function probabilityVariants(answer: string, extra: string[] = []) {
  const variants = [answer, ...extra];
  const fraction = answer.match(/^(\d+)\/(\d+)$/);

  if (fraction) {
    const value = Number(fraction[1]) / Number(fraction[2]);
    variants.push(String(value), `${value * 100}%`);
  }

  if (/^\d+$/.test(answer)) {
    variants.push(`${answer}.0`);
  }

  return Array.from(new Set(variants));
}

function probAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: probabilityVariants(answer, acceptedAnswers),
    hint: "Identify the total number of equally likely outcomes before calculating.",
    explanation,
  };
}

function probChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: "Use the probability rule that matches the event structure.",
    explanation,
  };
}

export function year12Standard1ProbabilityAndChanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "probability-and-chance"
  ) {
    return null;
  }

  return {
    description:
      "Use probability language, two-way reasoning and simple probability trees for everyday chance problems.",
    learningIntention:
      "Calculate probabilities for single and combined events in practical situations.",
    successCriteria: [
      "Identify the sample space and count equally likely outcomes.",
      "Use the probability formula P(event)=\frac{\text{favourable outcomes}}{\text{total outcomes}}.",
      "Multiply probabilities along independent paths and add probabilities for alternative paths.",
      "Use replacement and no-replacement reasoning in simple chance models.",
    ],
    teaching: {
      paragraphs: [
        "Probability compares how many outcomes are favourable with how many outcomes are possible. When outcomes are equally likely, the probability is a fraction of the total number of outcomes.",
        "For a single event, list the possible outcomes carefully. For two-stage events, use multiplication along a path and add the path probabilities when more than one path can give the required outcome.",
        "With replacement, the second selection has the same number of possibilities as the first. Without replacement, the second probability changes because one item has already been removed.",
        "Use simple probability trees for two-stage chance problems and follow the correct order of multiplication and addition depending on whether outcomes are joined or selected as alternatives.",
      ],
      latexBlocks: [
        "P(\text{event})=\frac{\text{favourable outcomes}}{\text{total outcomes}}",
        "P(A\text{ and }B)=P(A)\times P(B)\text{ for independent events}",
      ],
    },
    workedExamples: [
      {
        title: "Find a single-event probability",
        questionLatex:
          "\text{A bag has 3 red and 2 blue counters. What is }P(\text{red})?}",
        steps: [
          {
            explanation:
              "There are 3 favourable red counters and 5 counters in total.",
          },
          {
            explanation:
              "Write the probability as a fraction of favourable over total outcomes.",
              latex: "P(\text{red})=\frac{3}{5}",
            },
          {
            explanation:
              "The probability of selecting a red counter is three fifths.",
            },
        ],
        finalAnswerLatex: "\frac{3}{5}",
      },
      {
        title: "Multiply along a two-stage path",
        questionLatex:
          "\text{A fair coin is tossed and a fair die is rolled. Find }P(\text{heads and 6}).",
        steps: [
          {
            explanation:
              "The coin has 2 equally likely outcomes and the die has 6 equally likely outcomes.",
            latex: "P(\text{heads})=\frac{1}{2},\quad P(6)=\frac{1}{6}",
          },
          {
            explanation:
              "Multiply along the independent path because both events must happen together.",
            latex: "P(\text{heads and 6})=\frac{1}{2}\times\frac{1}{6}=\frac{1}{12}",
          },
        ],
        finalAnswerLatex: "\frac{1}{12}",
      },
      {
        title: "Use a tree for without replacement reasoning",
        questionLatex:
          "\text{A bag has 2 red and 3 blue counters. Two counters are selected without replacement. Find }P(\text{red then blue}).",
        steps: [
          {
            explanation:
              "The first red probability is 2 out of 5. After a red is removed, there are 3 blue counters out of 4 counters left.",
            latex: "\frac{2}{5}\times\frac{3}{4}",
          },
          {
            explanation:
              "Multiply the two path probabilities because the events happen one after the other.",
            latex: "\frac{6}{20}=\frac{3}{10}",
          },
        ],
        finalAnswerLatex: "\frac{3}{10}",
        probabilityTreeDiagram: {
          description:
            "A probability tree showing the two-stage selection without replacement and the highlighted red-then-blue path.",
          rootLabel: "bag",
          stages: ["first draw", "second draw"],
          branches: [
            {
              id: "R",
              label: "red",
              probability: "2/5",
              children: [
                { id: "B", label: "blue", probability: "3/4" },
                { id: "R2", label: "red", probability: "1/4" },
              ],
            },
            {
              id: "B",
              label: "blue",
              probability: "3/5",
              children: [
                { id: "R3", label: "red", probability: "2/4" },
                { id: "B2", label: "blue", probability: "1/4" },
              ],
            },
          ],
          highlightedPaths: [["R", "B"]],
        },
      },
    ],
    guidedPractice: [
      probChoice(
        "prob-g1",
        "A fair spinner has 4 equal sections. What is the probability of landing on a green section?",
        "B",
        ["1/2", "1/4", "1/3", "1/6"],
        "One of the four equally likely sections is green, so the probability is one quarter."
      ),
      probAnswer(
        "prob-g2",
        "A coin is tossed and a die is rolled. Find the probability of tails and an odd number.",
        "P(\text{tails})=\frac{1}{2},\quad P(\text{odd})=\frac{1}{2}",
        "1/4",
        ["0.25"],
        "Multiply the two independent probabilities because both events happen together."
      ),
      probChoice(
        "prob-g3",
        "Which of the following has a probability of zero?",
        "D",
        ["Rolling a 4 on a fair die", "Drawing a red card from a full deck", "Flipping heads on a fair coin", "Rolling a 7 on a standard die"],
        "A standard die has faces 1–6, so rolling a 7 is impossible and has probability 0."
      ),
      probAnswer(
        "prob-g4",
        "A deck of 52 cards contains 13 hearts. What is the probability of drawing a heart at random?",
        "\\frac{13}{52}",
        "1/4",
        ["0.25", "25%"],
        "13 favourable hearts out of 52 total cards gives 13/52 = 1/4."
      ),
    ],
    independentPractice: [
      probAnswer(
        "prob-i1",
        "A bag has 3 red and 2 blue counters. One counter is selected at random. Find the probability of blue.",
        "\text{blue counters}=2,\quad \text{total}=5",
        "2/5",
        ["0.4", "40%"],
        "There are 2 favourable blue outcomes out of 5 total outcomes."
      ),
      probAnswer(
        "prob-i2",
        "A fair coin is tossed twice. Find the probability of heads followed by tails.",
        "\text{two fair coin tosses}",
        "1/4",
        ["0.25"],
        "Multiply one half by one half because the coin tosses are independent."
      ),
      probAnswer(
        "prob-i3",
        "A bag has 2 red, 3 green and 5 yellow counters. What is the probability of NOT selecting a red counter?",
        "\\frac{8}{10}",
        "4/5",
        ["0.8", "80%"],
        "8 non-red counters out of 10 total gives 8/10 = 4/5."
      ),
      probAnswer(
        "prob-i4",
        "Two fair dice are rolled. Find the probability that both show a 6.",
        "\\frac{1}{6}\\times\\frac{1}{6}",
        "1/36",
        ["0.0278"],
        "The events are independent so multiply: 1/6 × 1/6 = 1/36."
      ),
      probChoice(
        "prob-i5",
        "A bag has 4 red and 4 blue counters. Two are drawn without replacement. The first is red. What is the probability the second is also red?",
        "B",
        ["4/8", "3/7", "4/7", "3/8"],
        "After removing one red counter there are 3 red and 4 blue left — 7 counters total. P(red second) = 3/7."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Treating 'or' as multiplication instead of addition.",
        fix: "Use addition when the event can happen in more than one different way."
      },
      {
        mistake: "Using the second selection probability from the first selection instead of updating it after no replacement.",
        fix: "Change the second probability only when the first item is not replaced."
      },
      {
        mistake: "Forgetting to count all equally likely outcomes first.",
        fix: "List or count all possible outcomes before identifying the favourable ones."
      },
    ],
    masteryQuiz: [
      probChoice(
        "prob-m1",
        "A die is rolled once. What is the probability of a number less than 3?",
        "C",
        ["1/2", "1/3", "1/6", "2/3"],
        "There are two favourable outcomes (1 and 2) out of six equally likely outcomes."
      ),
      probAnswer(
        "prob-m2",
        "A bag has 2 red and 4 blue counters. One counter is selected at random. Find the probability of not selecting a red counter.",
        "\text{blue counters}=4,\quad \text{total}=6",
        "2/3",
        ["0.6667", "66.67%"],
        "There are 4 favourable blue outcomes and 6 total outcomes."
      ),
      probAnswer(
        "prob-m3",
        "Two fair coins are tossed. Find the probability of at least one head.",
        "\text{total outcomes}=4,\quad \text{no heads}=1",
        "3/4",
        ["0.75"],
        "Exactly one or two heads occur in three of the four equally likely outcomes."
      ),
      probAnswer(
        "prob-m4",
        "A bag has 5 red and 3 blue counters. Two counters are drawn without replacement. Find P(red then red).",
        "\\frac{5}{8}\\times\\frac{4}{7}",
        "5/14",
        ["0.3571"],
        "5/8 × 4/7 = 20/56 = 5/14."
      ),
      probChoice(
        "prob-m5",
        "A spinner has sections numbered 1–8 equally. What is the probability of spinning an even number?",
        "B",
        ["3/8", "4/8", "5/8", "1/4"],
        "Even numbers on 1–8 are 2, 4, 6, 8 — that is 4 favourable out of 8 equally likely outcomes, giving 4/8 = 1/2."
      ),
      probAnswer(
        "prob-m6",
        "In a class of 20 students, 12 play sport and 8 do not. A student is chosen at random. What is the probability the student does NOT play sport?",
        "\\frac{8}{20}",
        "2/5",
        ["0.4", "40%"],
        "8 non-sport students out of 20 gives 8/20 = 2/5."
      ),
      probAnswer(
        "prob-m7",
        "A jar contains 3 red, 4 blue and 2 green lollies. What is the probability of selecting a red or blue lolly?",
        "\\frac{3+4}{9}",
        "7/9",
        ["0.778"],
        "Red or blue = 7 favourable outcomes out of 9 total."
      ),
      probChoice(
        "prob-m8",
        "A student claims P(event) = 1.2. What is wrong with this statement?",
        "A",
        ["Probability cannot exceed 1.", "The event is certain to happen.", "The event is impossible.", "Probability must be a whole number."],
        "All probabilities lie between 0 and 1 inclusive. A value greater than 1 is not possible."
      ),
      probAnswer(
        "prob-m9",
        "A fair die is rolled twice. Find the probability of rolling a 3 on the first roll and an even number on the second.",
        "\\frac{1}{6}\\times\\frac{3}{6}",
        "1/12",
        ["0.0833"],
        "P(3) = 1/6 and P(even) = 3/6 = 1/2. Multiply: 1/6 × 1/2 = 1/12."
      ),
      probAnswer(
        "prob-m10",
        "A bag has 6 counters of which 2 are red. One counter is removed and not replaced, and it is not red. What is now the probability of drawing a red counter?",
        "\\frac{2}{5}",
        "2/5",
        ["0.4"],
        "After removing one non-red counter there are 5 left, still 2 of which are red: P = 2/5."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1StatisticsExamPracticeLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "statistics-exam-practice"
  ) {
    return null;
  }

  return {
    description:
      "Practise Standard 1-style statistics and probability questions from everyday data and simple chance contexts.",
    learningIntention:
      "Use summary statistics and probability reasoning to answer exam-style questions clearly and efficiently.",
    successCriteria: [
      "Choose the correct measure of centre for the question context.",
      "Use simple probability to answer chance questions from words or tables.",
      "Write answers in the expected format, including fractions and decimals where needed.",
      "Explain why the chosen statistics or probability calculation matches the question."
    ],
    teaching: {
      paragraphs: [
        "Exam-style statistics questions often ask for the mean, median, or range in a context. Read the wording carefully to choose the right measure.",
        "Probability questions in Standard 1 usually involve a single event or a simple two-stage event with equally likely outcomes.",
        "Always check whether the question asks for a fraction, a decimal or a percentage response and give your answer in the form requested.",
        "If a question gives a description of an event, write the probability as the number of favourable outcomes over the total number of outcomes."
      ],
      latexBlocks: [
        "\text{mean}=\frac{\text{sum of values}}{\text{number of values}}",
        "P(\text{event})=\frac{\text{favourable outcomes}}{\text{total outcomes}}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct average",
        questionLatex:
          "\text{A student records the times 2.1, 2.4, 2.5, 2.7, 3.0 seconds. Which measure best describes the typical time?}",
        steps: [
          {
            explanation:
              "The times are all close together with no extreme outlier, so the mean is a reasonable typical value.",
          },
          {
            explanation:
              "Add the times and divide by five."
,            latex: "\frac{2.1+2.4+2.5+2.7+3.0}{5}=2.54"
          },
          {
            explanation:
              "The mean is 2.54 seconds, which is the best single typical value in this case.",
          },
        ],
        finalAnswerLatex: "2.54\text{ s}",
      },
      {
        title: "Interpret probability from words",
        questionLatex:
          "\text{A bag has 5 red counters and 5 green counters. What is the probability of drawing a red counter?}",
        steps: [
          {
            explanation:
              "There are 5 favourable red counters and 10 total counters.",
          },
          {
            explanation:
              "Use the probability formula with equally likely outcomes.",
            latex: "P(\text{red})=\frac{5}{10}=\frac{1}{2}",
          },
        ],
        finalAnswerLatex: "\frac{1}{2}",
      },
    ],
    guidedPractice: [
      dataAnswer(
        "stats-exam-g1",
        "A list of prices is 12, 15, 18, 18, 20. What is the median price?",
        "\text{ordered prices}",
        "18"
      ),
      probChoice(
        "stats-exam-g2",
        "A bag has 3 red, 2 green and 5 blue counters. What is the probability of selecting a green counter?",
        "B",
        ["3/10", "2/10", "5/10", "1/2"],
        "There are 2 green counters out of 10 total counters."
      ),
      dataAnswer(
        "stats-exam-g3",
        "A set of values is 4, 8, 6, 10, 12. Find the mean.",
        "\\frac{4+8+6+10+12}{5}",
        "8"
      ),
      probAnswer(
        "stats-exam-g4",
        "A fair spinner has 6 equal sections labelled 1 to 6. What is the probability of landing on a number greater than 4?",
        "\\frac{2}{6}",
        "1/3",
        ["0.333", "33.3%"],
        "Numbers greater than 4 are 5 and 6 — 2 favourable out of 6 total."
      ),
    ],
    independentPractice: [
      dataAnswer(
        "stats-exam-i1",
        "A table shows 7, 8, 8, 9, 10 customers. Find the mean number of customers.",
        "\frac{7+8+8+9+10}{5}",
        "8.4",
        ["8.40"]
      ),
      dataAnswer(
        "stats-exam-i2",
        "A bag has 4 red and 6 blue counters. One counter is selected at random. What is the probability it is blue?",
        "\text{blue}=6,\quad \text{total}=10",
        "3/5",
        ["0.6", "60%"]
      ),
      dataAnswer(
        "stats-exam-i3",
        "The temperatures for 6 days were 15, 18, 22, 20, 17, 19. Find the median temperature.",
        "\\text{ordered: }15,17,18,19,20,22",
        "18.5"
      ),
      probAnswer(
        "stats-exam-i4",
        "A box has 5 red and 7 white balls. One is drawn at random. Find P(white).",
        "\\frac{7}{12}",
        "7/12",
        ["0.583"],
        "7 white balls out of 12 total."
      ),
      practicalChoice(
        "stats-exam-i5",
        "A data set is 3, 5, 6, 7, 20. Which measure of centre best represents the data?",
        "B",
        ["Mean, because it uses all values.", "Median, because the outlier 20 inflates the mean.", "Mode, because it appears most often.", "Range, because it shows the spread."],
        "The outlier 20 significantly increases the mean; the median of 6 is a better typical value."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Using the mean when the question asks for the middle value.",
        fix: "Read the question wording to see whether it asks for mean or median."
      },
      {
        mistake: "Writing probability as 0.5 when the question expects a fraction.",
        fix: "Answer in the form requested by the question."
      },
      {
        mistake: "Counting only one favourable outcome when there are several.",
        fix: "Count every outcome that satisfies the event before writing the fraction."
      },
    ],
    masteryQuiz: [
      dataAnswer(
        "stats-exam-m1",
        "A data set is 11, 12, 14, 16, 17. Find the range.",
        "17-11",
        "6"
      ),
      probAnswer(
        "stats-exam-m2",
        "A coin is tossed once. What is the probability of tails?",
        "\text{fair coin}",
        "1/2",
        ["0.5", "50%"],
        "There is one favourable outcome and two total equally likely outcomes."
      ),
      dataAnswer(
        "stats-exam-m3",
        "A shop sold 2, 4, 5, 6, 8 items on five days. What is the mean number sold?",
        "\frac{2+4+5+6+8}{5}",
        "5",
        ["5.0"]
      ),
      probAnswer(
        "stats-exam-m4",
        "A die is rolled. Find the probability of rolling a multiple of 3.",
        "\\frac{2}{6}",
        "1/3",
        ["0.333"],
        "Multiples of 3 on a die are 3 and 6 — 2 favourable out of 6 total."
      ),
      dataAnswer(
        "stats-exam-m5",
        "A data set is 12, 15, 11, 18, 14. Find the range.",
        "18-11",
        "7"
      ),
      probAnswer(
        "stats-exam-m6",
        "A jar has 4 red and 1 green marble. A marble is drawn, replaced, then another is drawn. Find P(green then red).",
        "\\frac{1}{5}\\times\\frac{4}{5}",
        "4/25",
        ["0.16"],
        "With replacement the probabilities don't change: 1/5 × 4/5 = 4/25."
      ),
      dataAnswer(
        "stats-exam-m7",
        "Five values have a mean of 9. One of the values is 13. Find the sum of the other four values.",
        "9\\times5-13",
        "32"
      ),
      practicalChoice(
        "stats-exam-m8",
        "A student says that increasing one very large value in a data set will always increase both the mean and the median by the same amount. Is this correct?",
        "B",
        [
          "Yes — both measures change equally.",
          "No — the mean changes but the median may not change at all.",
          "No — the median changes but the mean does not.",
          "Yes — both measures are sensitive to outliers.",
        ],
        "The mean uses all values and is sensitive to changes in any value. The median depends only on position, so changing an already-extreme outlier may not move the median at all."
      ),
      probAnswer(
        "stats-exam-m9",
        "A card is drawn from a standard deck of 52 cards. Find the probability that it is a king or an ace.",
        "\\frac{4+4}{52}",
        "2/13",
        ["0.1538"],
        "4 kings + 4 aces = 8 favourable cards. P = 8/52 = 2/13."
      ),
      dataAnswer(
        "stats-exam-m10",
        "A student scored 60, 72, 68, 75, 80 on five tests. What must the student score on the sixth test to achieve a mean of exactly 72?",
        "72\\times6-(60+72+68+75+80)",
        "77"
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1MeasurementAreaVolumeLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "measurement-geometry" ||
    lesson.slug !== "measurement-area-volume"
  ) {
    return null;
  }

  return {
    description:
      "Calculate areas, perimeters, surface areas and volumes of common solids using straightforward formulas.",
    learningIntention:
      "Use the correct area or volume formula for the shape and compute answers in the required units.",
    successCriteria: [
      "Choose the correct formula for the shape in the question.",
      "Substitute the given dimensions carefully with the right units.",
      "Round area answers to one decimal place when needed.",
      "Check whether the answer is a length, area or volume before including units."
    ],
    teaching: {
      paragraphs: [
        "Area measures the size of a flat shape using square units. Volume measures the space inside a solid using cubic units.",
        "Common standard formulas include rectangle area, triangle area, prism surface area and prism volume. Use the shape name to choose the right formula.",
        "For volume, multiply the cross-sectional area by the length for prisms. For surface area, count all outside faces in square units.",
        "Always use the correct unit labels: square units for area and cubic units for volume."
      ],
      latexBlocks: [
        "\text{area of rectangle}=lw",
        "\text{volume of prism}=\text{area of cross-section}\times l",
      ],
    },
    workedExamples: [
      {
        title: "Find area of a rectangle",
        questionLatex:
          "\text{A rectangle is 8 cm wide and 5 cm tall. Find its area.}",
        steps: [
          {
            explanation:
              "The formula for a rectangle is width times height.",
            latex: "A=8\times5",
          },
          {
            explanation:
              "Multiply the dimensions to find the area.",
            latex: "A=40\text{ cm}^2",
          },
        ],
        finalAnswerLatex: "40\text{ cm}^2",
      },
      {
        title: "Find volume of a box",
        questionLatex:
          "\text{A box has base area 12 cm}^2\text{ and height 5 cm. Find its volume.}",
        steps: [
          {
            explanation:
              "Use the prism volume formula: cross-sectional area times length.",
            latex: "V=12\times5",
          },
          {
            explanation:
              "Multiply the area by the height to get cubic units.",
            latex: "V=60\text{ cm}^3",
          },
        ],
        finalAnswerLatex: "60\text{ cm}^3",
      },
    ],
    guidedPractice: [
      measurementAnswer(
        "area-vol-g1",
        "A triangle has base 6 m and height 4 m. Find its area.",
        "\frac{1}{2}\times6\times4",
        "12",
        ["12 m^2", "12 m²"]
      ),
      measurementAnswer(
        "area-vol-g2",
        "A rectangular prism has length 7 cm, width 3 cm and height 2 cm. Find its volume.",
        "7\times3\times2",
        "42",
        ["42 cm^3", "42 cm³"]
      ),
      measurementAnswer(
        "area-vol-g3",
        "A triangle has base 10 m and perpendicular height 6 m. Find its area.",
        "\\frac{1}{2}\\times10\\times6",
        "30",
        ["30 m^2", "30 m²"]
      ),
      practicalChoice(
        "area-vol-g4",
        "Which unit is correct for the volume of a box?",
        "C",
        ["cm", "cm²", "cm³", "m²"],
        "Volume fills three dimensions, so it is measured in cubic units such as cm³."
      ),
    ],
    independentPractice: [
      measurementAnswer(
        "area-vol-i1",
        "A circle has radius 5 cm. Find its area using \(\pi r^2\) and leave the answer in terms of \(\pi\).",
        "\pi\times5^2",
        "25\pi",
        ["25 \pi"]
      ),
      measurementAnswer(
        "area-vol-i2",
        "A rectangular pool is 8 m long, 3 m wide and 1.5 m deep. Find its volume in cubic metres.",
        "8\times3\times1.5",
        "36",
        ["36 m^3"]
      ),
      measurementAnswer(
        "area-vol-i3",
        "A cylinder has radius 4 cm and height 10 cm. Find its volume to one decimal place. (Use V = πr²h.)",
        "\\pi\\times4^2\\times10",
        "502.7",
        ["502.65", "502.7 cm^3"]
      ),
      practicalChoice(
        "area-vol-i4",
        "A trapezium has parallel sides 6 cm and 10 cm, and a perpendicular height of 4 cm. Which formula gives its area?",
        "A",
        [
          "½ × (6 + 10) × 4",
          "(6 + 10) × 4",
          "½ × 6 × 10",
          "6 × 10 × 4",
        ],
        "Area of trapezium = ½(a + b)h = ½ × (6 + 10) × 4 = 32 cm²."
      ),
      measurementAnswer(
        "area-vol-i5",
        "A triangular prism has a triangular cross-section with base 6 cm and height 4 cm, and the prism is 10 cm long. Find its volume.",
        "\\frac{1}{2}\\times6\\times4\\times10",
        "120",
        ["120 cm^3", "120 cm³"]
      ),
    ],
    commonMistakes: [
      {
        mistake: "Using square units when the question asks for volume.",
        fix: "Check whether the shape is flat or solid before choosing square or cubic units."
      },
      {
        mistake: "Forgetting the one-half factor for triangle area.",
        fix: "Use \(\frac{1}{2}bh\) for triangles, not \(bh\)."
      },
      {
        mistake: "Adding dimensions instead of multiplying for area or volume.",
        fix: "Use multiplication, not addition, for area and volume formulas."
      },
    ],
    masteryQuiz: [
      measurementAnswer(
        "area-vol-m1",
        "A rectangle is 9 cm by 4 cm. Find its area.",
        "9\times4",
        "36",
        ["36 cm^2"]
      ),
      measurementAnswer(
        "area-vol-m2",
        "A triangular garden has base 10 m and height 3 m. Find its area.",
        "\frac{1}{2}\times10\times3",
        "15",
        ["15 m^2"]
      ),
      measurementAnswer(
        "area-vol-m3",
        "A box has base area 14 cm² and height 4 cm. Find its volume.",
        "14\\times4",
        "56",
        ["56 cm^3"]
      ),
      measurementAnswer(
        "area-vol-m4",
        "A parallelogram has base 12 m and perpendicular height 5 m. Find its area.",
        "12\\times5",
        "60",
        ["60 m^2", "60 m²"]
      ),
      practicalChoice(
        "area-vol-m5",
        "A square garden has side length 7 m. Which calculation gives its area?",
        "A",
        [
          "7 × 7",
          "4 × 7",
          "2 × 7",
          "7 × 7 × 7",
        ],
        "Area of a square = side × side = 7 × 7 = 49 m²."
      ),
      measurementAnswer(
        "area-vol-m6",
        "A semicircle has diameter 10 cm. Find its area to one decimal place. (A = ½πr².)",
        "\\frac{1}{2}\\times\\pi\\times5^2",
        "39.3",
        ["39.27", "39.3 cm^2"]
      ),
      measurementAnswer(
        "area-vol-m7",
        "A rectangular paddock is 45 m long and 30 m wide. Find the perimeter and area.",
        "P=2(45+30);\\; A=45\\times30",
        "P=150 m, A=1350 m²",
        ["150 m perimeter, 1350 m² area"]
      ),
      practicalChoice(
        "area-vol-m8",
        "A cylinder has its radius doubled but its height stays the same. By what factor does the volume increase?",
        "B",
        ["2", "4", "8", "16"],
        "V = πr²h. If r → 2r then V → π(2r)²h = 4πr²h, which is 4 times the original volume."
      ),
      measurementAnswer(
        "area-vol-m9",
        "A rectangular shed is 6 m long, 4 m wide and 3 m high. Find the total surface area of all six faces.",
        "2(6\\times4+6\\times3+4\\times3)",
        "108",
        ["108 m^2", "108 m²"]
      ),
      measurementAnswer(
        "area-vol-m10",
        "A composite shape is made of a rectangle (8 cm × 5 cm) with a triangle (base 8 cm, height 3 cm) on top. Find the total area.",
        "8\\times5+\\frac{1}{2}\\times8\\times3",
        "52",
        ["52 cm^2", "52 cm²"]
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1ScaleDrawingsAndPlansLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "measurement-geometry" ||
    lesson.slug !== "scale-drawings-and-plans"
  ) {
    return null;
  }

  return {
    description:
      "Use scale, similarity and proportion to interpret maps, plans and scaled models in practical contexts.",
    learningIntention:
      "Find real distances and lengths from scaled drawings using the correct scale factor.",
    successCriteria: [
      "Identify the scale ratio from the drawing or plan.",
      "Convert measurements in the drawing into real distances accurately.",
      "Use consistent units when converting between map scale and actual length.",
      "Recognise when a scale factor applies to length only, not area or volume."
    ],
    teaching: {
      paragraphs: [
        "A scale drawing represents a larger real object using a smaller drawing, with all lengths scaled by the same factor.",
        "If the scale is 1 to n, then 1 unit on the drawing represents n units in reality. Use this factor directly for lengths and distances.",
        "For a length on the drawing, multiply by the scale factor to find the real length. For a real length, divide by the scale factor to find the drawing length.",
        "Keep the units consistent: if the drawing is in centimetres and the real distance is in metres, convert before using the scale factor."
      ],
      latexBlocks: [
        "\text{real length}=\text{drawing length}\times n",
        "\text{drawing length}=\frac{\text{real length}}{n}",
      ],
    },
    workedExamples: [
      {
        title: "Use the scale factor for a real distance",
        questionLatex:
          "\text{A map scale is 1:50000. A road on the map is 3 cm long. Find the actual road length in metres.}",
        steps: [
          {
            explanation:
              "One centimetre on the map represents 50000 centimetres in reality.",
          },
          {
            explanation:
              "Multiply the map length by the scale factor and convert to metres.",
            latex: "3\times50000=150000\text{ cm}=1500\text{ m}",
          },
        ],
        finalAnswerLatex: "1500\text{ m}",
      },
      {
        title: "Find a drawing length from a real measurement",
        questionLatex:
          "\text{A floor plan is drawn at scale 1:100. A wall is 12 m long in reality. Find its length on the plan in centimetres.}",
        steps: [
          {
            explanation:
              "First convert the real length to centimetres because the scale uses the same units on both sides.",
            latex: "12\text{ m}=1200\text{ cm}",
          },
          {
            explanation:
              "Divide the real length by 100 to find the drawing length.",
            latex: "\frac{1200}{100}=12\text{ cm}",
          },
        ],
        finalAnswerLatex: "12\text{ cm}",
      },
    ],
    guidedPractice: [
      measurementAnswer(
        "scale-g1",
        "A scale model uses scale 1:250. A training airplane model is 24 cm long. What is the real airplane length in metres?",
        "24\times250\text{ cm}",
        "60",
        ["60 m"]
      ),
      measurementAnswer(
        "scale-g2",
        "A room is 600 cm long in reality. On a plan with scale 1:100, what is the room length on the drawing in centimetres?",
        "\frac{600}{100}",
        "6",
        ["6 cm"]
      ),
      practicalChoice(
        "scale-g3",
        "A scale on a map is 1:50 000. What does this mean?",
        "B",
        [
          "1 cm on the map = 50 m in reality.",
          "1 cm on the map = 500 m in reality.",
          "1 cm on the map = 5 m in reality.",
          "1 cm on the map = 5 km in reality.",
        ],
        "1 cm represents 50 000 cm = 500 m in reality."
      ),
      measurementAnswer(
        "scale-g4",
        "A plan with scale 1:20 shows a bookshelf as 9 cm long. Find the real length of the bookshelf in metres.",
        "9\\times20\\text{ cm}=180\\text{ cm}",
        "1.8",
        ["1.8 m", "180 cm"]
      ),
    ],
    independentPractice: [
      measurementAnswer(
        "scale-i1",
        "A drawing length is 7 cm at scale 1:200. Find the real length in metres.",
        "7\times200\text{ cm}",
        "14",
        ["14 m"]
      ),
      measurementAnswer(
        "scale-i2",
        "A model car is 15 cm long and the real car is 4.5 m long. What is the scale ratio in the form 1:n?",
        "\frac{450}{15}",
        "30",
        ["1:30"]
      ),
      measurementAnswer(
        "scale-i3",
        "A map uses scale 1:10 000. Two towns are 8 cm apart on the map. Find their real distance in kilometres.",
        "8\\times10000\\text{ cm}",
        "0.8",
        ["0.8 km", "800 m"]
      ),
      practicalChoice(
        "scale-i4",
        "On a floor plan with scale 1:50, a bedroom is 8 cm × 6 cm. What are the real dimensions?",
        "A",
        [
          "4 m × 3 m",
          "400 m × 300 m",
          "40 cm × 30 cm",
          "8 m × 6 m",
        ],
        "Multiply each drawing length by 50: 8 × 50 = 400 cm = 4 m and 6 × 50 = 300 cm = 3 m."
      ),
      measurementAnswer(
        "scale-i5",
        "A real window is 1.2 m wide. On a plan with scale 1:40, how wide is the window on the plan in centimetres?",
        "\\frac{120}{40}",
        "3",
        ["3 cm"]
      ),
    ],
    commonMistakes: [
      {
        mistake: "Mixing drawing units with real units in the same calculation.",
        fix: "Convert both measurements to the same unit before applying the scale factor."
      },
      {
        mistake: "Using the scale factor in the wrong direction.",
        fix: "Use multiply for drawing-to-real and divide for real-to-drawing."
      },
      {
        mistake: "Applying area or volume scale when the question asks for length.",
        fix: "Length scales directly by n, not by n^2 or n^3, in plan and drawing questions."
      },
    ],
    masteryQuiz: [
      measurementAnswer(
        "scale-m1",
        "A map uses scale 1:25000. A river is drawn 4 cm long on the map. Find the real river length in kilometres.",
        "4\times25000\text{ cm}",
        "1",
        ["1 km"]
      ),
      measurementAnswer(
        "scale-m2",
        "A plan uses scale 1:50. A table is 120 cm long in reality. What length does it have on the plan?",
        "\frac{120}{50}",
        "2.4",
        ["2.4 cm"]
      ),
      measurementAnswer(
        "scale-m3",
        "A model house is built at scale 1:100. A wall is 2.8 m long in reality. What is the wall length on the model in centimetres?",
        "\frac{280}{100}",
        "2.8",
        ["2.8 cm"]
      ),
      measurementAnswer(
        "scale-m4",
        "A map uses scale 1:250 000. Two cities are 12 cm apart on the map. What is the real distance in kilometres?",
        "12\\times250000\\text{ cm}",
        "30",
        ["30 km"]
      ),
      practicalChoice(
        "scale-m5",
        "On a plan with scale 1:80, a pool is shown as 5 cm × 3 cm. What is the real area of the pool?",
        "A",
        [
          "9.6 m²",
          "15 m²",
          "96 m²",
          "960 m²",
        ],
        "Real dimensions: 5×80 = 400 cm = 4 m and 3×80 = 240 cm = 2.4 m. Area = 4 × 2.4 = 9.6 m²."
      ),
      measurementAnswer(
        "scale-m6",
        "A model train has scale 1:87 (HO scale). The real locomotive is 17.4 m long. How long is the model in centimetres?",
        "\\frac{1740}{87}",
        "20",
        ["20 cm"]
      ),
      measurementAnswer(
        "scale-m7",
        "A blueprint shows a corridor 4.5 cm wide at scale 1:40. Find the real corridor width in metres.",
        "4.5\\times40\\text{ cm}",
        "1.8",
        ["1.8 m", "180 cm"]
      ),
      practicalChoice(
        "scale-m8",
        "A student uses a scale of 1:500 and draws a rectangle 6 cm × 4 cm. What is the real area of the rectangle?",
        "B",
        [
          "120 m²",
          "600 m²",
          "24 m²",
          "6000 m²",
        ],
        "Real dimensions: 6×500 cm = 3000 cm = 30 m; 4×500 cm = 2000 cm = 20 m. Area = 30 × 20 = 600 m²."
      ),
      measurementAnswer(
        "scale-m9",
        "A map at scale 1:20 000 shows a lake that is 3.5 cm × 2 cm. Find the real area of the lake in hectares. (1 ha = 10 000 m²)",
        "3.5\\times20000\\times2\\times20000\\text{ cm}^2",
        "28",
        ["28 ha"]
      ),
      practicalChoice(
        "scale-m10",
        "If a map scale changes from 1:50 000 to 1:25 000, what happens to the map?",
        "A",
        [
          "The map shows less area but in more detail.",
          "The map shows more area with less detail.",
          "The map stays the same size but distances are halved.",
          "The scale becomes less accurate.",
        ],
        "A smaller denominator (1:25 000 vs 1:50 000) means each cm covers half the real distance — the map zooms in and shows more detail over a smaller real area."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1LinearAndDirectVariationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "algebraic-relationships" ||
    lesson.slug !== "exponential-inverse-variation"
  )
    return null;

  function linAnswer(
    id: string,
    prompt: string,
    latex: string,
    answer: string,
    acceptedAnswers: string[],
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex,
      answer,
      acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
      hint: "Identify the gradient (rate per unit) and y-intercept (starting value) before substituting.",
      explanation,
    };
  }

  function linChoice(
    id: string,
    prompt: string,
    answer: "A" | "B" | "C" | "D",
    choices: [string, string, string, string],
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex: "\\text{Select A, B, C, or D.}",
      choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
      answer,
      hint: "Read each option — match the gradient (multiplier) and y-intercept (constant) to the context.",
      explanation,
    };
  }

  return {
    title: "Linear and Direct Variation Models",
    learningIntention:
      "Use linear equations of the form y = mx + b to model and analyse practical situations.",
    successCriteria: [
      "Identify the gradient and y-intercept in a linear equation and explain their practical meaning.",
      "Use a linear model to calculate an unknown value by substituting a given input.",
      "Recognise a linear relationship from a table by checking for a constant difference.",
      "Build a linear equation from a described rate and starting value.",
    ],
    teaching: {
      paragraphs: [
        "A linear model has the form y = mx + b. The gradient m shows how much y changes for each unit increase in x. The y-intercept b is the value of y when x = 0, often called the starting value.",
        "In practical contexts, the gradient is a constant rate — such as a cost per kilometre, an hourly charge, or a wage per item. The y-intercept is a fixed starting amount — such as a connection fee, a call-out cost, or an opening balance.",
        "To check whether a table of values shows a linear relationship, calculate the change in y between consecutive rows with equal x-spacing. If the changes are all the same, the relationship is linear and the gradient equals that constant change.",
        "To evaluate a linear model for a given input, substitute the x-value into the equation and simplify using order of operations.",
      ],
      latexBlocks: [
        "y = mx + b",
        "m = \\frac{\\text{change in }y}{\\text{change in }x}",
      ],
    },
    workedExamples: [
      {
        title: "Interpret a practical linear model",
        questionLatex:
          "\\text{A plumber charges a }\\$45\\text{ call-out fee plus }\\$80\\text{ per hour. Write the cost equation and find the cost for 3 hours.}",
        steps: [
          {
            explanation:
              "The call-out fee is the y-intercept (starting value) and the hourly charge is the gradient.",
            latex: "C = 80h + 45",
          },
          {
            explanation: "Substitute h = 3 and evaluate.",
            latex: "C = 80 \\times 3 + 45 = 240 + 45 = 285",
          },
        ],
        finalAnswerLatex: "\\$285",
      },
      {
        title: "Identify a linear relationship from a table",
        questionLatex:
          "\\text{A table shows hours: 0, 1, 2, 3 and cost: 12, 17, 22, 27. Is the relationship linear? Write the equation.}",
        steps: [
          {
            explanation: "Find the differences in cost between consecutive entries.",
            latex: "17-12=5,\\quad 22-17=5,\\quad 27-22=5",
          },
          {
            explanation:
              "The constant difference of 5 confirms a linear relationship. The gradient is 5 and the starting value at h=0 is 12.",
            latex: "C = 5h + 12",
          },
        ],
        finalAnswerLatex: "C = 5h + 12",
      },
      {
        title: "Evaluate a linear model for a given input",
        questionLatex:
          "\\text{A model for daily earnings is }E = 24n + 60\\text{, where }n\\text{ is the number of items sold. Find }E\\text{ when }n = 8.",
        steps: [
          {
            explanation: "Substitute n = 8 into the equation.",
            latex: "E = 24 \\times 8 + 60",
          },
          {
            explanation: "Evaluate the expression.",
            latex: "E = 192 + 60 = 252",
          },
        ],
        finalAnswerLatex: "\\$252",
      },
    ],
    guidedPractice: [
      linChoice(
        "lin-var-g1",
        "A taxi charges $3.20 per km plus a $5.50 flag fall. Which equation gives the total cost C (in dollars) for d km?",
        "A",
        [
          "C = 3.20d + 5.50",
          "C = 5.50d + 3.20",
          "C = 3.20d − 5.50",
          "C = 3.20 + 5.50d",
        ],
        "The per-km charge $3.20 is the gradient and the flag fall $5.50 is the y-intercept: C = 3.20d + 5.50."
      ),
      linAnswer(
        "lin-var-g2",
        "A model is C = 6h + 20. Find the value of C when h = 4.",
        "C = 6 \\times 4 + 20",
        "44",
        [],
        "C = 24 + 20 = 44."
      ),
      linAnswer(
        "lin-var-g3",
        "A table shows x: 0, 1, 2, 3 and y: 7, 12, 17, 22. What is the gradient?",
        "12-7=5,\\quad 17-12=5,\\quad 22-17=5",
        "5",
        [],
        "The y-values increase by 5 for each step of 1 in x, so the gradient is 5."
      ),
      linChoice(
        "lin-var-g4",
        "In the equation W = 35h + 50, what does the 35 represent?",
        "C",
        [
          "The number of hours worked.",
          "The starting pay.",
          "The rate of pay per hour.",
          "The total weekly pay.",
        ],
        "The gradient 35 is the rate per unit — W increases by $35 for each additional hour h. The y-intercept 50 is the starting value."
      ),
    ],
    independentPractice: [
      linAnswer(
        "lin-var-i1",
        "A water tank model is V = 1500 − 30t, where t is time in minutes. Find V when t = 20.",
        "V = 1500 - 30 \\times 20",
        "900",
        ["900 L", "900 litres"],
        "V = 1500 − 600 = 900 litres."
      ),
      linAnswer(
        "lin-var-i2",
        "A linear model passes through (0, 8) and (2, 16). Write the equation in the form y = mx + b.",
        "m = \\frac{16-8}{2-0} = 4",
        "y=4x+8",
        ["y = 4x + 8"],
        "Gradient = (16 − 8) ÷ (2 − 0) = 4. The y-intercept is 8 (the value at x = 0). Equation: y = 4x + 8."
      ),
      linAnswer(
        "lin-var-i3",
        "A phone plan costs $30 per month plus $0.10 per text message. How much does the plan cost in a month with 80 messages?",
        "C = 30 + 0.10 \\times 80",
        "38",
        ["$38", "$38.00"],
        "C = 30 + 8 = $38."
      ),
      linChoice(
        "lin-var-i4",
        "A table shows x: 1, 2, 3, 4 and y: 9, 14, 19, 24. Which statement is correct?",
        "A",
        [
          "The relationship is linear with gradient 5.",
          "The relationship is not linear.",
          "The relationship is linear with gradient 9.",
          "The relationship is linear with gradient 4.",
        ],
        "Differences: 14−9=5, 19−14=5, 24−19=5. Constant differences of 5 confirm linearity with gradient 5."
      ),
    ],
    masteryQuiz: [
      linAnswer(
        "lin-var-m1",
        "In the model C = 15n + 80, what is the rate per unit of n?",
        "C = 15n + 80",
        "15",
        [],
        "The gradient 15 is the rate per unit — C increases by 15 for each additional unit of n."
      ),
      linChoice(
        "lin-var-m2",
        "A salary model is P = 850 + 120n, where n is the number of extra items sold. Which statement correctly interprets the model?",
        "B",
        [
          "Base salary $120, bonus $850 per item sold.",
          "Base salary $850, bonus $120 per item sold.",
          "Total pay $850 with $120 deducted per item.",
          "Salary increases by $850 per additional item.",
        ],
        "The y-intercept $850 is the base salary (at n=0). The gradient $120 is the bonus per additional item sold."
      ),
      linAnswer(
        "lin-var-m3",
        "Use C = 4.5d + 12 to find C when d = 6.",
        "C = 4.5 \\times 6 + 12",
        "39",
        [],
        "C = 27 + 12 = 39."
      ),
      linAnswer(
        "lin-var-m4",
        "A tank model is V = 2000 − 50t litres, where t is minutes. After how many minutes does the tank hold 750 litres?",
        "750 = 2000 - 50t",
        "25",
        ["25 minutes", "t = 25"],
        "2000 − 750 = 1250. t = 1250 ÷ 50 = 25 minutes."
      ),
      linAnswer(
        "lin-var-m5",
        "A table shows x: 0, 3, 6, 9 and y: 4, 16, 28, 40. Write the equation of the linear model.",
        "m = \\frac{16-4}{3-0} = 4",
        "y=4x+4",
        ["y = 4x + 4"],
        "Gradient = 12 ÷ 3 = 4. y-intercept = 4 (value at x = 0). Equation: y = 4x + 4."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Swapping the gradient and the y-intercept.",
        fix: "In y = mx + b, m is the multiplier (rate per unit) and b is the constant added at the start.",
      },
      {
        mistake: "Forgetting to follow order of operations when substituting.",
        fix: "Replace the variable with the given number, then multiply before adding.",
      },
      {
        mistake: "Checking only one difference in a table instead of all consecutive pairs.",
        fix: "Verify the difference is constant across every consecutive pair before concluding the relationship is linear.",
      },
      {
        mistake: "Leaving units out of the final answer.",
        fix: "Attach the units (dollars, litres, km) to the final answer — not inside the equation.",
      },
    ],
    multiPartPractice: [
      {
        id: "lin-var-mp-1",
        prompt:
          "A plumber charges a $60 call-out fee plus $80 per hour.",
        latex: "C = 80h + 60",
        answer: "380",
        hint: "Substitute for part (a); rearrange for part (b); set both cost models equal for part (c).",
        explanation:
          "Part (a): C = 80(4) + 60 = 380. Part (b): 460 = 80h + 60, so 80h = 400 and h = 5. Part (c): 80h + 60 = 95h gives 60 = 15h, so h = 4.",
        parts: [
          {
            key: "a",
            label: "(a)",
            prompt: "Find the total cost for 4 hours of work.",
            marks: 1,
            answer: "380",
            acceptedAnswers: ["$380", "380.00", "$380.00"],
            hint: "Substitute h = 4 into C = 80h + 60.",
            explanation:
              "C = 80 × 4 + 60 = 320 + 60 = 380.",
          },
          {
            key: "b",
            label: "(b)",
            prompt: "The plumber's bill is $460. Find the number of hours worked.",
            marks: 2,
            answer: "5",
            acceptedAnswers: [],
            hint: "Set C = 460 and solve for h.",
            explanation:
              "460 = 80h + 60. Subtract 60: 400 = 80h. Divide by 80: h = 5.",
          },
          {
            key: "c",
            label: "(c)",
            prompt:
              "A second plumber charges $95 per hour with no call-out fee. Find the number of hours at which both plumbers charge the same total amount.",
            marks: 1,
            answer: "4",
            acceptedAnswers: [],
            hint: "Set 80h + 60 = 95h and solve for h.",
            explanation:
              "80h + 60 = 95h. Subtract 80h from both sides: 60 = 15h. Divide by 15: h = 4.",
          },
        ],
      },
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1FinancialPlanningRepaymentLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "investments-loans-annuities" ||
    lesson.slug !== "annuities-regular-payments"
  )
    return null;

  function finPlanAnswer(
    id: string,
    prompt: string,
    latex: string,
    answer: string,
    acceptedAnswers: string[],
    explanation: string
  ): PracticeQuestion {
    const numeric = Number(answer.replace(/[$,]/g, ""));
    const moneyVars = Number.isFinite(numeric)
      ? [
          String(numeric),
          numeric.toFixed(2),
          `$${numeric}`,
          `$${numeric.toFixed(2)}`,
        ]
      : [answer];
    return {
      id,
      prompt,
      latex,
      answer,
      acceptedAnswers: Array.from(new Set([answer, ...moneyVars, ...acceptedAnswers])),
      hint: "Subtract the deposit first to find the balance owing, then divide or multiply as required.",
      explanation,
    };
  }

  function finPlanChoice(
    id: string,
    prompt: string,
    answer: "A" | "B" | "C" | "D",
    choices: [string, string, string, string],
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex: "\\text{Select A, B, C, or D.}",
      choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
      answer,
      hint: "Calculate the total cost of each option (deposit + all repayments) before comparing.",
      explanation,
    };
  }

  return {
    title: "Financial Planning and Repayments",
    learningIntention:
      "Compare repayment plans and use income and expenses to determine whether a payment option is affordable.",
    successCriteria: [
      "Calculate equal repayment amounts from the balance owing after a deposit.",
      "Find the total cost of a payment plan and the extra cost compared to the cash price.",
      "Compare two payment plans by calculating and comparing their total costs.",
      "Use a budget to assess whether a monthly repayment is affordable.",
    ],
    teaching: {
      paragraphs: [
        "A payment plan allows a purchase to be spread over time. The deposit is paid upfront. The remaining balance — the price minus the deposit — is split into equal regular repayments.",
        "The total cost of a plan is the deposit plus all repayments combined. This total is often greater than the cash price because payment plans can include additional fees spread across repayments.",
        "To compare two plans, calculate the total cost of each plan (deposit plus number of repayments multiplied by the repayment amount). The plan with the lower total is usually the better financial choice.",
        "A budget lists income and all expenses. The monthly surplus is income minus total expenses. A repayment is only affordable if it fits within the surplus — there must be enough left over after all other expenses.",
      ],
      latexBlocks: [
        "\\text{balance owing} = \\text{price} - \\text{deposit}",
        "\\text{repayment} = \\frac{\\text{balance owing}}{\\text{number of repayments}}",
        "\\text{total cost} = \\text{deposit} + n \\times \\text{repayment amount}",
      ],
    },
    workedExamples: [
      {
        title: "Find the equal repayment amount",
        questionLatex:
          "\\text{A laptop costs }\\$1200\\text{. A deposit of }\\$300\\text{ is paid upfront. The remaining balance is split into 6 equal monthly repayments. Find each repayment.}",
        steps: [
          {
            explanation: "Find the balance after the deposit.",
            latex: "1200 - 300 = 900",
          },
          {
            explanation: "Divide the balance equally among the 6 repayments.",
            latex: "900 \\div 6 = 150",
          },
        ],
        finalAnswerLatex: "\\$150 \\text{ per month}",
      },
      {
        title: "Calculate total cost and extra cost",
        questionLatex:
          "\\text{A plan for a }\\$1800\\text{ fridge requires a }\\$400\\text{ deposit and 12 monthly repayments of }\\$130\\text{. Find the total cost and the extra cost.}",
        steps: [
          {
            explanation: "Find the total of all repayments.",
            latex: "12 \\times 130 = 1560",
          },
          {
            explanation: "Add the deposit to find the total cost.",
            latex: "400 + 1560 = 1960",
          },
          {
            explanation: "Subtract the cash price to find the extra cost.",
            latex: "1960 - 1800 = 160",
          },
        ],
        finalAnswerLatex:
          "\\text{Total cost: }\\$1960,\\quad \\text{extra cost: }\\$160",
      },
      {
        title: "Use a budget to check affordability",
        questionLatex:
          "\\text{Monthly income is }\\$2600\\text{. Monthly expenses total }\\$1950\\text{. Is a monthly repayment of }\\$550\\text{ affordable?}",
        steps: [
          {
            explanation: "Find the monthly surplus (income minus all expenses).",
            latex: "2600 - 1950 = 650",
          },
          {
            explanation: "Compare the surplus with the required repayment.",
            latex: "650 > 550",
          },
          {
            explanation:
              "The surplus exceeds the repayment, so it is affordable.",
          },
        ],
        finalAnswerLatex:
          "\\text{Yes — surplus }\\$650 > \\$550\\text{ repayment, so it is affordable.}",
      },
    ],
    guidedPractice: [
      finPlanAnswer(
        "fin-plan-g1",
        "A TV costs $960. A deposit of $160 is paid and the balance is split into 8 equal monthly payments. Find each payment amount.",
        "\\frac{960 - 160}{8}",
        "100",
        ["$100"],
        "Balance = $960 − $160 = $800. Each payment = $800 ÷ 8 = $100."
      ),
      finPlanAnswer(
        "fin-plan-g2",
        "A payment plan has a $250 deposit and 10 monthly repayments of $75. Find the total amount paid.",
        "250 + 10 \\times 75",
        "1000",
        ["$1000"],
        "Total repayments = 10 × $75 = $750. Total paid = $250 + $750 = $1000."
      ),
      finPlanChoice(
        "fin-plan-g3",
        "A phone costs $780 cash. A payment plan costs $250 deposit plus 10 repayments of $65. Which option costs less and by how much?",
        "A",
        [
          "Cash is cheaper by $120.",
          "The plan is cheaper by $120.",
          "They cost the same.",
          "Cash is cheaper by $65.",
        ],
        "Plan total = $250 + 10×$65 = $250 + $650 = $900. Cash = $780. Cash is cheaper by $900 − $780 = $120."
      ),
      finPlanAnswer(
        "fin-plan-g4",
        "Monthly income is $2200 and monthly expenses total $1800. What is the monthly surplus?",
        "2200 - 1800",
        "400",
        ["$400"],
        "Surplus = $2200 − $1800 = $400."
      ),
    ],
    independentPractice: [
      finPlanAnswer(
        "fin-plan-i1",
        "A camera costs $1050. A deposit of $150 is paid and the remaining balance is split into 9 equal monthly payments. Find each payment.",
        "\\frac{1050 - 150}{9}",
        "100",
        ["$100"],
        "Balance = $900. Each payment = $900 ÷ 9 = $100."
      ),
      finPlanAnswer(
        "fin-plan-i2",
        "A payment plan for a $2500 item has a $500 deposit and 24 monthly repayments of $90. Find the total cost of the plan.",
        "500 + 24 \\times 90",
        "2660",
        ["$2660"],
        "Total repayments = 24 × $90 = $2160. Total paid = $500 + $2160 = $2660."
      ),
      finPlanChoice(
        "fin-plan-i3",
        "Plan A has a $400 deposit and 12 monthly repayments of $75. Plan B costs $1200 cash. Which option has the lower total cost and by how much?",
        "B",
        [
          "Plan A is cheaper by $100.",
          "Plan B is cheaper by $100.",
          "They cost the same.",
          "Plan A is cheaper by $300.",
        ],
        "Plan A total = $400 + 12×$75 = $400 + $900 = $1300. Plan B = $1200. Plan B is cheaper by $100."
      ),
      finPlanChoice(
        "fin-plan-i4",
        "Monthly income is $3100. Monthly expenses total $2650. Is a monthly repayment of $400 affordable?",
        "A",
        [
          "Yes — surplus $450 leaves $50 after the repayment.",
          "No — the repayment exceeds the surplus.",
          "Yes — surplus $750 comfortably covers it.",
          "Cannot tell without knowing all expenses.",
        ],
        "Surplus = $3100 − $2650 = $450. The $400 repayment fits within the surplus, leaving $50 to spare."
      ),
    ],
    masteryQuiz: [
      finPlanAnswer(
        "fin-plan-m1",
        "A laptop costs $1800. A deposit of $300 is paid. The balance is split into 10 equal monthly repayments. Find each repayment.",
        "\\frac{1800 - 300}{10}",
        "150",
        ["$150"],
        "Balance = $1500. Each repayment = $1500 ÷ 10 = $150."
      ),
      finPlanAnswer(
        "fin-plan-m2",
        "A plan has a $600 deposit and 18 repayments of $95. The cash price is $2100. Find the extra cost of choosing the plan.",
        "600 + 18 \\times 95 - 2100",
        "210",
        ["$210"],
        "Plan total = $600 + $1710 = $2310. Extra cost = $2310 − $2100 = $210."
      ),
      finPlanChoice(
        "fin-plan-m3",
        "Compare Plan A ($500 deposit, 12 repayments of $100) with Plan B ($300 deposit, 18 repayments of $80). Which has the lower total cost?",
        "A",
        [
          "Plan A is cheaper by $40.",
          "Plan B is cheaper by $40.",
          "They cost the same.",
          "Plan A is cheaper by $100.",
        ],
        "Plan A = $500 + $1200 = $1700. Plan B = $300 + $1440 = $1740. Plan A is $40 cheaper."
      ),
      finPlanChoice(
        "fin-plan-m4",
        "Monthly income is $2800. Expenses: rent $1200, food $350, transport $180, other $420. Is a $700 monthly repayment affordable?",
        "A",
        [
          "No — total expenses $2150 leave a surplus of only $650.",
          "Yes — surplus $750 comfortably covers the repayment.",
          "No — the repayment alone exceeds income.",
          "Yes — with $100 to spare.",
        ],
        "Total expenses = $1200+$350+$180+$420 = $2150. Surplus = $2800−$2150 = $650. The $700 repayment exceeds the $650 surplus, so it is not affordable."
      ),
      finPlanAnswer(
        "fin-plan-m5",
        "A $3000 car is bought on a plan with a $600 deposit and 24 monthly repayments. What repayment amount makes the total plan cost equal the cash price?",
        "\\frac{3000 - 600}{24}",
        "100",
        ["$100"],
        "Balance = $2400. Repayment = $2400 ÷ 24 = $100. Total paid = $600 + $2400 = $3000, equal to the cash price."
      ),
    ],
    commonMistakes: [
      {
        mistake:
          "Dividing the full item price by the number of repayments without subtracting the deposit first.",
        fix: "Always subtract the deposit to find the balance owing before dividing.",
      },
      {
        mistake: "Forgetting to add the deposit when calculating the total cost.",
        fix: "Total cost = deposit + (repayment × number of repayments).",
      },
      {
        mistake:
          "Comparing repayment amounts instead of total costs when choosing between plans.",
        fix: "A lower repayment over more months can cost more overall — always compare total costs.",
      },
      {
        mistake:
          "Checking whether the repayment fits within income rather than within the surplus.",
        fix: "Surplus = income − all other expenses. The repayment must fit within the surplus, not the full income.",
      },
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1RightAngleTrigApplicationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "trigonometry-ratios-rates" ||
    lesson.slug !== "right-angle-trig-applications"
  ) {
    return null;
  }

  function trigAnswer(
    id: string,
    prompt: string,
    latex: string,
    answer: string,
    acceptedAnswers: string[],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex,
      answer,
      acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
      hint,
      explanation,
    };
  }

  function trigChoice(
    id: string,
    prompt: string,
    answer: "A" | "B" | "C" | "D",
    choices: [string, string, string, string],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex: "\\text{Select A, B, C, or D.}",
      choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
      answer,
      acceptedAnswers: [],
      hint,
      explanation,
    };
  }

  const elevDiag = (angleLabel: string, horiz: string, ht: string) => ({
    description: `Right triangle showing angle of elevation ${angleLabel} at the observer, horizontal distance ${horiz} along the ground, and vertical height ${ht} up the structure.`,
    vertices: { A: { x: 60, y: 220 }, C: { x: 330, y: 220 }, B: { x: 330, y: 50 } },
    rightAngleAt: "C" as const,
    angleLabels: { A: angleLabel },
    sideLabels: { AC: horiz, BC: ht },
  });

  const depDiag = (angleLabel: string, cliffHt: string, dist: string) => ({
    description: `Right triangle showing cliff height ${cliffHt}, elevation angle ${angleLabel} from the base to the observer, and horizontal distance ${dist} to the boat.`,
    vertices: { A: { x: 80, y: 50 }, C: { x: 80, y: 220 }, B: { x: 330, y: 220 } },
    rightAngleAt: "C" as const,
    angleLabels: { B: angleLabel },
    sideLabels: { AC: cliffHt, BC: dist },
  });

  return {
    description:
      "Apply sine, cosine and tangent to multi-step practical problems involving angles of elevation and depression, ramp gradients, and distances in real-world diagrams.",
    learningIntention:
      "Solve applied right-angle trigonometry problems by identifying the correct ratio, setting up an equation, and rounding to the required precision.",
    successCriteria: [
      "Identify the opposite, adjacent and hypotenuse sides relative to the given angle in a practical context.",
      "Choose the correct trigonometric ratio to find an unknown side or angle.",
      "Apply inverse trigonometry to find an angle to the nearest degree.",
      "Solve two-step problems where a calculated value is used in a second calculation.",
    ],
    teaching: {
      paragraphs: [
        "Right-angle trigonometry connects an acute angle in a right triangle to the ratio of two sides. The three ratios are sine (opposite over hypotenuse), cosine (adjacent over hypotenuse) and tangent (opposite over adjacent).",
        "In an angle-of-elevation problem, the observer looks up from horizontal ground. The angle theta is at the observer, the opposite side is the vertical height, and the adjacent side is the horizontal distance.",
        "In an angle-of-depression problem, the observer looks downward from a height. The depression angle at the top equals the elevation angle from the bottom — they are alternate interior angles between parallel horizontal lines.",
        "To find an angle from two known sides, use the inverse function: $\\theta = \\tan^{-1}\\!\\left(\\tfrac{\\text{opp}}{\\text{adj}}\\right)$, or $\\sin^{-1}$ or $\\cos^{-1}$ as appropriate. Round angles to the nearest degree unless told otherwise.",
      ],
      latexBlocks: [
        "\\sin\\theta=\\frac{\\text{opposite}}{\\text{hypotenuse}},\\quad\\cos\\theta=\\frac{\\text{adjacent}}{\\text{hypotenuse}},\\quad\\tan\\theta=\\frac{\\text{opposite}}{\\text{adjacent}}",
        "\\theta=\\tan^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{adj}}\\right)",
      ],
    },
    workedExamples: [
      {
        title: "Angle of elevation — find the height of a building",
        questionLatex:
          "\\text{An observer stands 40 m from the base of a building. The angle of elevation to the top is }35^\\circ.\\text{ Find the height to 1 decimal place.}",
        triangleDiagram: elevDiag("35°", "40 m", "h"),
        steps: [
          {
            explanation:
              "Label the sides. The horizontal distance 40 m is adjacent to 35° and the unknown height h is opposite.",
            latex: "\\tan 35^\\circ = \\frac{h}{40}",
          },
          {
            explanation: "Multiply both sides by 40.",
            latex: "h = 40 \\times \\tan 35^\\circ",
          },
          {
            explanation: "Evaluate and round to 1 decimal place.",
            latex: "h = 40 \\times 0.7002 = 28.0\\text{ m}",
          },
        ],
        finalAnswerLatex: "h = 28.0\\text{ m}",
      },
      {
        title: "Angle of depression — find the horizontal distance",
        questionLatex:
          "\\text{From the top of a 50 m cliff, the angle of depression to a boat is }28^\\circ.\\text{ Find the horizontal distance from the base of the cliff to the boat to 1 decimal place.}",
        triangleDiagram: depDiag("28°", "50 m", "d"),
        steps: [
          {
            explanation:
              "The depression angle equals the elevation angle from the boat. The cliff height 50 m is opposite 28° and the horizontal distance d is adjacent.",
            latex: "\\tan 28^\\circ = \\frac{50}{d}",
          },
          {
            explanation: "Rearrange: multiply both sides by d then divide by \\(\\tan 28^\\circ\\).",
            latex: "d = \\frac{50}{\\tan 28^\\circ}",
          },
          {
            explanation: "Evaluate and round to 1 decimal place.",
            latex: "d = \\frac{50}{0.5317} = 94.1\\text{ m}",
          },
        ],
        finalAnswerLatex: "d = 94.1\\text{ m}",
      },
      {
        title: "Ramp gradient — find the length of the ramp surface",
        questionLatex:
          "\\text{A ramp has gradient 1 in 8 (rises 1 m per 8 m horizontal). Find the ramp surface length for a horizontal run of 16 m, to 1 decimal place.}",
        triangleDiagram: {
          description:
            "Right triangle representing the ramp: horizontal run 16 m at the base, vertical rise 2 m on the right, ramp surface (hypotenuse) labelled as unknown.",
          vertices: { A: { x: 60, y: 220 }, C: { x: 330, y: 220 }, B: { x: 330, y: 60 } },
          rightAngleAt: "C",
          sideLabels: { AC: "16 m", BC: "2 m", AB: "ramp" },
        },
        steps: [
          {
            explanation:
              "For a 1:8 gradient and 16 m run, rise = (1/8) × 16 = 2 m. The right triangle has run 16 m and rise 2 m.",
          },
          {
            explanation: "Apply Pythagoras to find the hypotenuse.",
            latex: "\\text{hyp}=\\sqrt{16^2+2^2}=\\sqrt{260}",
          },
          {
            explanation: "Evaluate and round to 1 decimal place.",
            latex: "\\sqrt{260}=16.1\\text{ m}",
          },
        ],
        finalAnswerLatex: "\\text{Ramp length}=16.1\\text{ m}",
      },
    ],
    guidedPractice: [
      trigChoice(
        "y12s1-trig-app-g1",
        "A ladder 6 m long leans against a wall with its top reaching 4.5 m up the wall. The angle the ladder makes with the ground is θ. Which ratio gives θ?",
        "A",
        [
          "$\\sin\\theta = 4.5/6$",
          "$\\cos\\theta = 4.5/6$",
          "$\\tan\\theta = 4.5/6$",
          "$\\sin\\theta = 6/4.5$",
        ],
        "The ladder is the hypotenuse and 4.5 m is the side opposite θ at the ground.",
        "The height 4.5 m is opposite θ and the ladder 6 m is the hypotenuse, so sine = opposite/hypotenuse = 4.5/6."
      ),
      {
        ...trigAnswer(
          "y12s1-trig-app-g2",
          "An observer stands 25 m from a building. The angle of elevation to the top is 38°. Find the height of the building to 1 decimal place.",
          "h = 25 \\times \\tan 38^\\circ",
          "19.5",
          ["19.5 m"],
          "Height is opposite 38° and horizontal 25 m is adjacent. Set up tan(38°) = h/25 then solve.",
          "tan(38°) = h/25, so h = 25 × tan(38°) = 25 × 0.7813 = 19.5 m."
        ),
        triangleDiagram: elevDiag("38°", "25 m", "h"),
      },
      {
        ...trigChoice(
          "y12s1-trig-app-g3",
          "From the top of an 80 m cliff, the angle of depression to a boat is 22°. The horizontal distance d from the base of the cliff to the boat satisfies which equation?",
          "A",
          [
            "$\\tan 22^\\circ = 80/d$",
            "$\\tan 22^\\circ = d/80$",
            "$\\sin 22^\\circ = 80/d$",
            "$\\cos 22^\\circ = 80/d$",
          ],
          "The elevation angle from the boat is 22°; the cliff height 80 m is opposite and d is adjacent.",
          "The elevation angle from the boat is 22°. Cliff height 80 m is opposite this angle and d is adjacent, so tan(22°) = 80/d."
        ),
        triangleDiagram: depDiag("22°", "80 m", "d"),
      },
      trigAnswer(
        "y12s1-trig-app-g4",
        "A right triangle has opposite side 9 m and adjacent side 12 m. Find the acute angle θ to the nearest degree.",
        "\\theta = \\tan^{-1}(9/12)",
        "37",
        ["37°", "37 degrees"],
        "Use inverse tangent: θ = arctan(opposite/adjacent) = arctan(9/12).",
        "tan(θ) = 9/12 = 0.75, so θ = arctan(0.75) = 36.9° which rounds to 37°."
      ),
    ],
    independentPractice: [
      {
        ...trigAnswer(
          "y12s1-trig-app-i1",
          "A ramp rises at 24° to the horizontal and runs 15 m along the ground. Find the vertical rise to 1 decimal place.",
          "\\text{rise} = 15 \\times \\tan 24^\\circ",
          "6.7",
          ["6.7 m"],
          "Rise is opposite 24° and run 15 m is adjacent. Use tan(24°) = rise/15.",
          "tan(24°) = rise/15, so rise = 15 × tan(24°) = 15 × 0.4452 = 6.7 m."
        ),
        triangleDiagram: {
          description:
            "Right triangle with angle 24° at the base, horizontal run 15 m, and unknown vertical rise.",
          vertices: { A: { x: 60, y: 220 }, C: { x: 330, y: 220 }, B: { x: 330, y: 80 } },
          rightAngleAt: "C",
          angleLabels: { A: "24°" },
          sideLabels: { AC: "15 m", BC: "rise" },
        },
      },
      trigAnswer(
        "y12s1-trig-app-i2",
        "A right triangle has an acute angle of 50° and the adjacent side is 7 m. Find the hypotenuse to 1 decimal place.",
        "\\cos 50^\\circ = 7/\\text{hyp}",
        "10.9",
        ["10.9 m"],
        "cos(50°) = adjacent/hypotenuse, so hyp = adjacent/cos(50°) = 7/cos(50°).",
        "cos(50°) = 7/hyp, so hyp = 7/0.6428 = 10.9 m."
      ),
      trigChoice(
        "y12s1-trig-app-i3",
        "An observer stands 60 m from a building and measures an elevation angle of 41°. Which expression gives the building height?",
        "A",
        [
          "$60 \\times \\tan 41^\\circ$",
          "$60 \\times \\sin 41^\\circ$",
          "$60 \\div \\tan 41^\\circ$",
          "$60 \\div \\sin 41^\\circ$",
        ],
        "Height is opposite 41° and horizontal 60 m is adjacent. Use tangent.",
        "tan(41°) = height/60, so height = 60 × tan(41°). The other options use wrong ratios or the wrong direction."
      ),
      trigAnswer(
        "y12s1-trig-app-i4",
        "From a lighthouse 42 m above sea level, the angle of depression to a boat is 16°. Find the horizontal distance from the base of the lighthouse to the boat to 1 decimal place.",
        "d = 42/\\tan 16^\\circ",
        "146.5",
        ["146.5 m"],
        "The elevation angle from the boat is 16°; height 42 m is opposite and d is adjacent. Use tan(16°) = 42/d.",
        "tan(16°) = 42/d, so d = 42/tan(16°) = 42/0.2867 = 146.5 m."
      ),
      trigAnswer(
        "y12s1-trig-app-i5",
        "A right triangle has adjacent side 6 m and hypotenuse 10 m. Find the acute angle θ to the nearest degree.",
        "\\theta = \\cos^{-1}(6/10)",
        "53",
        ["53°", "53 degrees"],
        "Use inverse cosine: θ = arccos(adjacent/hypotenuse) = arccos(6/10).",
        "cos(θ) = 6/10 = 0.6, so θ = arccos(0.6) = 53.1° which rounds to 53°."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Choosing the wrong trig ratio because opposite and adjacent are confused.",
        fix: "Label all three sides first: hypotenuse (opposite right angle), opposite (across from θ), adjacent (beside θ, not hypotenuse).",
      },
      {
        mistake: "Forgetting that the depression angle at the top equals the elevation angle at the bottom.",
        fix: "Draw a horizontal line at the observer's level. The depression and elevation angles are equal by alternate interior angles.",
      },
      {
        mistake: "Rounding at an intermediate step instead of only at the final answer.",
        fix: "Store the full decimal and only round the final answer to 1 d.p. or the nearest degree.",
      },
    ],
    masteryQuiz: [
      trigChoice(
        "y12s1-trig-app-m1",
        "A flagpole casts a shadow 14 m long when the sun's elevation is 42°. Which expression gives the flagpole height h?",
        "A",
        [
          "$h = 14 \\times \\tan 42^\\circ$",
          "$h = 14 \\times \\sin 42^\\circ$",
          "$h = 14 \\div \\tan 42^\\circ$",
          "$h = 14 \\div \\cos 42^\\circ$",
        ],
        "The shadow is adjacent and the pole height is opposite 42°. Use tangent.",
        "tan(42°) = h/14, so h = 14 × tan(42°). Shadow is adjacent, pole height is opposite."
      ),
      trigAnswer(
        "y12s1-trig-app-m2",
        "A person stands 18 m from a tree and looks up at an angle of elevation of 52°. Find the height of the tree to 1 decimal place.",
        "h = 18 \\times \\tan 52^\\circ",
        "23.0",
        ["23", "23.0 m"],
        "Height is opposite 52° and horizontal 18 m is adjacent. Use tan(52°) = h/18.",
        "tan(52°) = h/18, so h = 18 × tan(52°) = 18 × 1.2799 = 23.0 m."
      ),
      trigAnswer(
        "y12s1-trig-app-m3",
        "From a window 12 m above the ground, the angle of depression to a parked car is 28°. Find the horizontal distance from the base of the building to the car to 1 decimal place.",
        "d = 12/\\tan 28^\\circ",
        "22.6",
        ["22.6 m"],
        "The elevation angle from the car is 28°; height 12 m is opposite and d is adjacent. Use tan(28°) = 12/d.",
        "tan(28°) = 12/d, so d = 12/tan(28°) = 12/0.5317 = 22.6 m."
      ),
      trigChoice(
        "y12s1-trig-app-m4",
        "A ramp is 8 m long and makes an angle of 20° with the horizontal. Which expression gives the vertical rise?",
        "A",
        [
          "$8 \\times \\sin 20^\\circ$",
          "$8 \\times \\cos 20^\\circ$",
          "$8 \\times \\tan 20^\\circ$",
          "$8 \\div \\sin 20^\\circ$",
        ],
        "The ramp (8 m) is the hypotenuse and the vertical rise is opposite 20°. Use sine.",
        "sin(20°) = rise/8, so rise = 8 × sin(20°). The ramp is the hypotenuse and rise is opposite."
      ),
      trigAnswer(
        "y12s1-trig-app-m5",
        "A right triangle has adjacent side 8 m and hypotenuse 17 m. Find the acute angle θ to the nearest degree.",
        "\\theta = \\cos^{-1}(8/17)",
        "62",
        ["62°", "62 degrees"],
        "Use inverse cosine: θ = arccos(adjacent/hypotenuse) = arccos(8/17).",
        "cos(θ) = 8/17 = 0.4706, so θ = arccos(0.4706) = 61.9° which rounds to 62°."
      ),
      trigAnswer(
        "y12s1-trig-app-m6",
        "A ladder 9 m long makes an angle of 70° with the ground. How far up the wall does the ladder reach to 1 decimal place?",
        "h = 9 \\times \\sin 70^\\circ",
        "8.5",
        ["8.5 m"],
        "The ladder is the hypotenuse and the wall height is opposite 70°. Use sin(70°) = height/9.",
        "sin(70°) = h/9, so h = 9 × sin(70°) = 9 × 0.9397 = 8.5 m."
      ),
      trigChoice(
        "y12s1-trig-app-m7",
        "A drone hovers above the ground. From a point 30 m horizontally from the drone, the angle of elevation is 55°. Which expression gives the drone's height h?",
        "A",
        [
          "$h = 30 \\times \\tan 55^\\circ$",
          "$h = 30 \\div \\tan 55^\\circ$",
          "$h = 30 \\times \\sin 55^\\circ$",
          "$h = 30 \\times \\cos 55^\\circ$",
        ],
        "Height is opposite 55° and horizontal 30 m is adjacent. Use tangent.",
        "tan(55°) = h/30, so h = 30 × tan(55°). Height is opposite and horizontal is adjacent."
      ),
      trigAnswer(
        "y12s1-trig-app-m8",
        "A ramp rises 3 m over a horizontal run of 11 m. Find the angle of inclination of the ramp to the nearest degree.",
        "\\theta = \\tan^{-1}(3/11)",
        "15",
        ["15°", "15 degrees"],
        "Rise is opposite and run is adjacent. Use θ = arctan(rise/run) = arctan(3/11).",
        "tan(θ) = 3/11 = 0.2727, so θ = arctan(0.2727) = 15.3° which rounds to 15°."
      ),
      trigAnswer(
        "y12s1-trig-app-m9",
        "From the top of a 32 m tower, the angle of depression to a bus is 24°. Find the horizontal distance from the tower base to the bus to 1 decimal place.",
        "d = 32/\\tan 24^\\circ",
        "71.9",
        ["71.9 m"],
        "The elevation angle from the bus is 24°; tower height 32 m is opposite and d is adjacent. Use tan(24°) = 32/d.",
        "tan(24°) = 32/d, so d = 32/tan(24°) = 32/0.4452 = 71.9 m."
      ),
      trigAnswer(
        "y12s1-trig-app-m10",
        "A wire runs from the top of a 20 m pole and is anchored 15 m from the base of the pole. Find the angle the wire makes with the ground to the nearest degree.",
        "\\theta = \\tan^{-1}(20/15)",
        "53",
        ["53°", "53 degrees"],
        "Pole height (20 m) is opposite θ and ground distance (15 m) is adjacent. Use inverse tangent.",
        "tan(θ) = 20/15 = 1.333, so θ = arctan(1.333) = 53.1° which rounds to 53°."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1RatesPracticalProblemsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "trigonometry-ratios-rates" ||
    lesson.slug !== "rates-practical-problems"
  ) {
    return null;
  }

  function rateAnswer(
    id: string,
    prompt: string,
    latex: string,
    answer: string,
    acceptedAnswers: string[],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex,
      answer,
      acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
      hint,
      explanation,
    };
  }

  function rateChoice(
    id: string,
    prompt: string,
    answer: "A" | "B" | "C" | "D",
    choices: [string, string, string, string],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex: "\\text{Select A, B, C, or D.}",
      choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
      answer,
      acceptedAnswers: [],
      hint,
      explanation,
    };
  }

  return {
    description:
      "Calculate and interpret rates in multi-step practical problems including speed, fuel consumption, flow rate and pay, going beyond unit conversions to applied problem-solving.",
    learningIntention:
      "Apply rate formulas to find total amounts, distances and times in multi-step practical contexts.",
    successCriteria: [
      "Calculate a rate from two related quantities using the appropriate formula.",
      "Apply a rate to find a total amount, distance or time in context.",
      "Compare two rate options by calculating and comparing their total costs or times.",
      "Solve a multi-step rate problem that combines two rates or two phases of travel or work.",
    ],
    teaching: {
      paragraphs: [
        "A rate compares two quantities with different units, such as kilometres per hour, litres per minute or dollars per hour. The most common rate formula is: quantity = rate × time.",
        "For speed problems, distance = speed × time. Rearrange to find time = distance/speed or speed = distance/time.",
        "For fuel problems, fuel used = (fuel rate ÷ 100) × distance when rate is in L/100 km. Fuel cost = fuel used × price per litre.",
        "In multi-step problems, identify each phase separately, find the result for each phase, then combine. Always check that units are consistent before adding times or distances.",
      ],
      latexBlocks: [
        "\\text{distance} = \\text{speed} \\times \\text{time}",
        "\\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
        "\\text{fuel used (L)} = \\frac{\\text{rate (L/100 km)} \\times \\text{distance (km)}}{100}",
      ],
    },
    workedExamples: [
      {
        title: "Speed with a rest stop — find total journey time",
        questionLatex:
          "\\text{A car travels 240 km at 80 km/h, then stops for 30 minutes. Find the total journey time in hours.}",
        steps: [
          {
            explanation: "Find the driving time using time = distance/speed.",
            latex: "\\text{driving time} = \\frac{240}{80} = 3\\text{ h}",
          },
          {
            explanation: "Convert the rest stop to hours: 30 minutes = 0.5 hours.",
            latex: "\\text{rest} = 0.5\\text{ h}",
          },
          {
            explanation: "Add driving time and rest time.",
            latex: "\\text{total} = 3 + 0.5 = 3.5\\text{ h}",
          },
        ],
        finalAnswerLatex: "3.5\\text{ h}",
      },
      {
        title: "Flow rate — time to fill a tank to a given percentage",
        questionLatex:
          "\\text{A pump fills a 1500 L tank at 25 L/min. How many minutes to fill the tank to 60%?}",
        steps: [
          {
            explanation: "Find the volume that 60% of 1500 L represents.",
            latex: "0.60 \\times 1500 = 900\\text{ L}",
          },
          {
            explanation: "Use time = volume/rate.",
            latex: "\\text{time} = \\frac{900}{25} = 36\\text{ min}",
          },
        ],
        finalAnswerLatex: "36\\text{ min}",
      },
      {
        title: "Fuel cost — total cost of a road trip",
        questionLatex:
          "\\text{A truck uses 12 L per 100 km. Find the cost of a 350 km trip when fuel costs }\\$1.85\\text{/L.}",
        steps: [
          {
            explanation: "Calculate the fuel used for 350 km.",
            latex: "\\text{fuel} = \\frac{12}{100} \\times 350 = 42\\text{ L}",
          },
          {
            explanation: "Multiply by the price per litre.",
            latex: "\\text{cost} = 42 \\times 1.85 = \\$77.70",
          },
        ],
        finalAnswerLatex: "\\$77.70",
      },
    ],
    guidedPractice: [
      rateChoice(
        "y12s1-rates-pp-g1",
        "A cyclist travels d km at r km/h. Which formula gives the travel time T in hours?",
        "A",
        ["$T = d \\div r$", "$T = r \\div d$", "$T = d \\times r$", "$T = r - d$"],
        "Rearrange distance = speed × time to make time the subject.",
        "distance = speed × time, so time = distance/speed = d/r. Only option A rearranges correctly."
      ),
      rateAnswer(
        "y12s1-rates-pp-g2",
        "A train travels 180 km at 60 km/h. Find the travel time in hours.",
        "\\text{time} = 180 \\div 60",
        "3",
        ["3 h", "3 hours"],
        "Use time = distance/speed = 180 ÷ 60.",
        "time = 180/60 = 3 hours."
      ),
      rateAnswer(
        "y12s1-rates-pp-g3",
        "A pipe fills a 480 L tank at 16 L/min. How many minutes does it take to fill the tank?",
        "\\text{time} = 480 \\div 16",
        "30",
        ["30 min", "30 minutes"],
        "Use time = volume/rate = 480 ÷ 16.",
        "time = 480/16 = 30 minutes."
      ),
      rateChoice(
        "y12s1-rates-pp-g4",
        "A car travels 336 km in 4 hours. Which expression gives the average speed in km/h?",
        "A",
        ["$336 \\div 4$", "$4 \\div 336$", "$336 \\times 4$", "$336 - 4$"],
        "speed = distance/time. Identify which value is distance and which is time.",
        "speed = distance/time = 336/4 = 84 km/h. Only 336 ÷ 4 uses the correct formula."
      ),
    ],
    independentPractice: [
      rateAnswer(
        "y12s1-rates-pp-i1",
        "A bus travels 420 km at 70 km/h. Find the travel time in hours.",
        "\\text{time} = 420 \\div 70",
        "6",
        ["6 h", "6 hours"],
        "Use time = distance/speed = 420 ÷ 70.",
        "time = 420/70 = 6 hours."
      ),
      rateAnswer(
        "y12s1-rates-pp-i2",
        "A pump empties a 900 L tank at 15 L/min. How many minutes does it take to empty the tank?",
        "\\text{time} = 900 \\div 15",
        "60",
        ["60 min", "60 minutes"],
        "Use time = volume/rate = 900 ÷ 15.",
        "time = 900/15 = 60 minutes."
      ),
      rateChoice(
        "y12s1-rates-pp-i3",
        "Car A uses 8 L per 100 km and Car B uses 10 L per 100 km. Which statement about a 500 km trip is correct?",
        "A",
        [
          "Car A uses 40 L and Car B uses 50 L — Car A is more economical.",
          "Car A uses 50 L and Car B uses 40 L — Car B is more economical.",
          "Both cars use the same amount of fuel.",
          "Car A uses 8 L and Car B uses 10 L for the whole trip.",
        ],
        "Fuel = (rate/100) × distance for each car, then compare.",
        "Car A: (8/100)×500 = 40 L. Car B: (10/100)×500 = 50 L. Car A uses less fuel."
      ),
      rateAnswer(
        "y12s1-rates-pp-i4",
        "A worker earns $22.50 per hour. How much do they earn for a 6-hour shift?",
        "22.50 \\times 6",
        "135",
        ["$135", "135.00", "$135.00"],
        "earnings = rate × time = 22.50 × 6.",
        "earnings = $22.50 × 6 = $135."
      ),
      rateAnswer(
        "y12s1-rates-pp-i5",
        "A truck uses 14 L per 100 km. Find the fuel cost for a 250 km journey when fuel costs $2.10 per litre.",
        "(14/100) \\times 250 = 35\\text{ L}",
        "73.50",
        ["$73.50", "73.5", "$73.5"],
        "First find the fuel used, then multiply by the price per litre.",
        "Fuel = (14/100) × 250 = 35 L. Cost = 35 × $2.10 = $73.50."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Mixing up hours and minutes when adding journey phases.",
        fix: "Convert all times to the same unit (both hours or both minutes) before adding them.",
      },
      {
        mistake: "Multiplying the fuel rate directly by distance instead of dividing by 100 first.",
        fix: "For a rate in L/100 km, use: fuel = (rate ÷ 100) × distance.",
      },
      {
        mistake: "Forgetting to include a rest stop when finding total journey time.",
        fix: "Find driving time and break time separately, then add them together.",
      },
    ],
    masteryQuiz: [
      rateChoice(
        "y12s1-rates-pp-m1",
        "A worker earns $h per hour and works n hours. Which expression gives the total earnings?",
        "A",
        ["$h \\times n$", "$h + n$", "$h \\div n$", "$n \\div h$"],
        "earnings = rate × time = (dollars per hour) × (hours).",
        "earnings = h × n. Addition and division do not give earnings from a rate."
      ),
      rateAnswer(
        "y12s1-rates-pp-m2",
        "A cyclist rides 120 km at 24 km/h, then rests for 20 minutes. Find the total trip time in minutes.",
        "120/24 \\times 60 + 20",
        "320",
        ["320 min", "320 minutes"],
        "Find riding time in hours, convert to minutes, then add the 20-minute rest.",
        "Riding: 120/24 = 5 h = 300 min. Total = 300 + 20 = 320 min."
      ),
      rateAnswer(
        "y12s1-rates-pp-m3",
        "A tap fills a 360 L bath at 12 L/min. How many minutes to fill the bath to 75%?",
        "0.75 \\times 360 \\div 12",
        "22.5",
        ["22.5 min", "22.5 minutes"],
        "Find 75% of 360 L, then use time = volume/rate.",
        "75% of 360 = 270 L. time = 270/12 = 22.5 minutes."
      ),
      rateChoice(
        "y12s1-rates-pp-m4",
        "A car travels at 90 km/h for 2.5 hours then at 60 km/h for 1 hour. Which expression gives the total distance?",
        "A",
        [
          "$90 \\times 2.5 + 60 \\times 1$",
          "$(90 + 60) \\times (2.5 + 1)$",
          "$90 \\times 1 + 60 \\times 2.5$",
          "$(90 + 60) \\times 2.5$",
        ],
        "Calculate distance for each phase using distance = speed × time, then add.",
        "Phase 1: 90 × 2.5 = 225 km. Phase 2: 60 × 1 = 60 km. Total = 285 km."
      ),
      rateAnswer(
        "y12s1-rates-pp-m5",
        "A car uses 11 L per 100 km. Find the total fuel used for a 400 km trip.",
        "(11/100) \\times 400",
        "44",
        ["44 L", "44 litres"],
        "Fuel = (rate ÷ 100) × distance = (11/100) × 400.",
        "Fuel = (11/100) × 400 = 44 L."
      ),
      rateAnswer(
        "y12s1-rates-pp-m6",
        "A worker earns $18.40 per hour for regular hours and $27.60 per hour for overtime. They work 7 regular hours and 3 overtime hours. Find the total earnings.",
        "7 \\times 18.40 + 3 \\times 27.60",
        "211.60",
        ["$211.60", "211.6", "$211.6"],
        "Calculate regular earnings and overtime earnings separately, then add.",
        "Regular: 7 × $18.40 = $128.80. Overtime: 3 × $27.60 = $82.80. Total = $211.60."
      ),
      rateAnswer(
        "y12s1-rates-pp-m7",
        "A pump empties a 2000 L tank at 40 L/min. How many minutes to empty 75% of the tank?",
        "0.75 \\times 2000 \\div 40",
        "37.5",
        ["37.5 min", "37.5 minutes"],
        "Find 75% of 2000 L, then use time = volume/rate.",
        "75% of 2000 = 1500 L. time = 1500/40 = 37.5 minutes."
      ),
      rateAnswer(
        "y12s1-rates-pp-m8",
        "A truck uses 18 L per 100 km. Find the fuel cost for a 500 km trip when fuel costs $1.95 per litre.",
        "(18/100) \\times 500 \\times 1.95",
        "175.50",
        ["$175.50", "175.5", "$175.5"],
        "First find the fuel used, then multiply by the price per litre.",
        "Fuel = (18/100) × 500 = 90 L. Cost = 90 × $1.95 = $175.50."
      ),
      rateChoice(
        "y12s1-rates-pp-m9",
        "A 360 km trip is split into two equal stages of 180 km each. Stage 1 speed is 80 km/h and Stage 2 speed is 120 km/h. Which expression gives the total travel time in hours?",
        "A",
        [
          "$180/80 + 180/120$",
          "$360/(80 + 120)$",
          "$360/80 + 360/120$",
          "$360 \\times (1/80 + 1/120)$",
        ],
        "Find the time for each 180 km stage separately using time = distance/speed, then add.",
        "Stage 1: 180/80 = 2.25 h. Stage 2: 180/120 = 1.5 h. Total = 3.75 h. Option A is correct."
      ),
      rateAnswer(
        "y12s1-rates-pp-m10",
        "A cyclist travels 180 km at 45 km/h. Find the travel time in hours.",
        "180 \\div 45",
        "4",
        ["4 h", "4 hours"],
        "Use time = distance/speed = 180 ÷ 45.",
        "time = 180/45 = 4 hours."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

export function year12Standard1TrigRatesExamPracticeLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "trigonometry-ratios-rates" ||
    lesson.slug !== "trig-rates-exam-practice"
  ) {
    return null;
  }

  function examAnswer(
    id: string,
    prompt: string,
    latex: string,
    answer: string,
    acceptedAnswers: string[],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex,
      answer,
      acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
      hint,
      explanation,
    };
  }

  function examChoice(
    id: string,
    prompt: string,
    answer: "A" | "B" | "C" | "D",
    choices: [string, string, string, string],
    hint: string,
    explanation: string
  ): PracticeQuestion {
    return {
      id,
      prompt,
      latex: "\\text{Select A, B, C, or D.}",
      choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
      answer,
      acceptedAnswers: [],
      hint,
      explanation,
    };
  }

  const depDiag = (angleLabel: string, ht: string, dist: string) => ({
    description: `Right triangle showing height ${ht}, elevation angle ${angleLabel} from the base to the observer at the top, and horizontal distance ${dist}.`,
    vertices: { A: { x: 80, y: 50 }, C: { x: 80, y: 220 }, B: { x: 330, y: 220 } },
    rightAngleAt: "C" as const,
    angleLabels: { B: angleLabel },
    sideLabels: { AC: ht, BC: dist },
  });

  return {
    description:
      "Practise Standard 1 exam-style questions that mix right-angle trigonometry, rate calculations, and ratio reasoning to develop fluency across all three techniques.",
    learningIntention:
      "Identify the appropriate technique for each exam question and apply it efficiently to find a numeric answer.",
    successCriteria: [
      "Recognise whether a question requires trigonometry, rate, or ratio reasoning before starting.",
      "Execute the correct method to find a side length, angle, rate, or total cost.",
      "Apply a result from one calculation to answer a follow-on question in the same context.",
      "Interpret a calculated angle or distance in its practical context.",
    ],
    teaching: {
      paragraphs: [
        "Exam questions in Standard 1 often blend trigonometry and rates within a single context. Read the question carefully to identify which technique is needed before writing any working.",
        "For trigonometry questions, identify the right-angle triangle, label the sides relative to the given angle, and choose the correct ratio. Sides go to 1 d.p. and angles go to the nearest degree.",
        "For rate questions, check the units of the rate and the given quantity, then rearrange the appropriate formula to find the unknown. Convert hours and minutes carefully to avoid unit errors.",
        "In two-step questions, the answer to the first part is the input for the second. Store the unrounded value in your calculator and only round the final answer.",
      ],
      latexBlocks: [
        "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}},\\quad\\text{time}=\\frac{\\text{distance}}{\\text{speed}},\\quad\\text{fuel cost}=\\frac{\\text{rate}\\times d}{100}\\times\\text{price}",
      ],
    },
    workedExamples: [
      {
        title: "Mixed — road gradient angle and speed limit",
        questionLatex:
          "\\text{A road rises 4 m for every 20 m horizontal. Find the angle of inclination to the nearest degree. Roads with angle}\\geq10^\\circ\\text{ have a 40 km/h limit; roads with angle}<10^\\circ\\text{ have a 60 km/h limit. State the speed limit.}",
        triangleDiagram: {
          description:
            "Right triangle representing the road: horizontal run 20 m at the base, vertical rise 4 m on the right, and the road surface as the hypotenuse.",
          vertices: { A: { x: 60, y: 220 }, C: { x: 330, y: 220 }, B: { x: 330, y: 80 } },
          rightAngleAt: "C",
          sideLabels: { AC: "20 m", BC: "4 m" },
        },
        steps: [
          {
            explanation:
              "Rise (4 m) is opposite and run (20 m) is adjacent. Use inverse tangent.",
            latex: "\\theta = \\tan^{-1}(4/20) = \\tan^{-1}(0.2)",
          },
          {
            explanation: "Evaluate and round to the nearest degree.",
            latex: "\\theta \\approx 11^\\circ",
          },
          {
            explanation: "Since 11° ≥ 10°, the speed limit is 40 km/h.",
          },
        ],
        finalAnswerLatex: "\\theta=11^\\circ,\\quad\\text{speed limit: 40 km/h}",
      },
      {
        title: "Multi-step rate — total cost of a pipe job",
        questionLatex:
          "\\text{A plumber replaces a pipe 8 m long with flow capacity 600 L/min. Cost: }\\$85\\text{ per metre of pipe plus }\\$3.50\\text{ per L/min of capacity. Find the total cost.}",
        steps: [
          {
            explanation: "Find the materials cost for 8 m of pipe.",
            latex: "\\text{pipe cost} = 8 \\times 85 = \\$680",
          },
          {
            explanation: "Find the flow capacity cost.",
            latex: "\\text{flow cost} = 600 \\times 3.50 = \\$2100",
          },
          {
            explanation: "Add both costs.",
            latex: "\\text{total} = 680 + 2100 = \\$2780",
          },
        ],
        finalAnswerLatex: "\\$2780",
      },
      {
        title: "Applied trig — rope anchored to a wall",
        questionLatex:
          "\\text{A rope 13 m long is attached to the top of a vertical wall and pegged into the ground. The rope makes }60^\\circ\\text{ with the wall. Find (a) the wall height and (b) the horizontal distance from the wall to the peg.}",
        triangleDiagram: {
          description:
            "Right triangle: wall height h from top (A) to base (C), rope AB = 13 m at angle 60° to the wall, horizontal distance d from C to peg (B).",
          vertices: { A: { x: 80, y: 50 }, C: { x: 80, y: 220 }, B: { x: 330, y: 220 } },
          rightAngleAt: "C",
          angleLabels: { A: "60°" },
          sideLabels: { AB: "13 m", AC: "h", BC: "d" },
        },
        steps: [
          {
            explanation:
              "The rope (13 m) is the hypotenuse. Angle 60° is at the wall top. The wall height h is adjacent to 60°.",
            latex: "h = 13 \\times \\cos 60^\\circ = 13 \\times 0.5 = 6.5\\text{ m}",
          },
          {
            explanation: "The horizontal distance d is opposite 60°.",
            latex: "d = 13 \\times \\sin 60^\\circ = 13 \\times 0.8660 = 11.3\\text{ m}",
          },
        ],
        finalAnswerLatex: "h = 6.5\\text{ m},\\quad d = 11.3\\text{ m}",
      },
    ],
    guidedPractice: [
      examChoice(
        "y12s1-trig-exam-g1",
        "A worker earns $24.50 per hour for a regular 8-hour shift. Which type of reasoning is needed to find total earnings?",
        "A",
        [
          "Rates — multiply the hourly rate by the number of hours.",
          "Trigonometry — use sine or cosine with the working angle.",
          "Unit conversion — convert hours to minutes first.",
          "Area calculation — find the area of the pay rectangle.",
        ],
        "Decide whether the question involves a right triangle (trig) or a rate × time formula (rates).",
        "Earnings = rate × time = $24.50 × 8. This is a rate calculation — no angle or triangle involved."
      ),
      {
        ...examAnswer(
          "y12s1-trig-exam-g2",
          "From the top of a 30 m cliff, the angle of depression to a buoy is 20°. Find the horizontal distance from the base of the cliff to the buoy to 1 decimal place.",
          "d = 30/\\tan 20^\\circ",
          "82.4",
          ["82.4 m"],
          "The elevation angle from the buoy is 20°; cliff height 30 m is opposite and d is adjacent. Use tan(20°) = 30/d.",
          "tan(20°) = 30/d, so d = 30/tan(20°) = 30/0.3640 = 82.4 m."
        ),
        triangleDiagram: depDiag("20°", "30 m", "d"),
      },
      examAnswer(
        "y12s1-trig-exam-g3",
        "A car uses 11 L per 100 km. Find the fuel cost for a 300 km journey when fuel costs $1.80 per litre.",
        "(11/100) \\times 300 \\times 1.80",
        "59.40",
        ["$59.40", "59.4", "$59.4"],
        "First find the fuel used, then multiply by the price per litre.",
        "Fuel = (11/100) × 300 = 33 L. Cost = 33 × $1.80 = $59.40."
      ),
      examChoice(
        "y12s1-trig-exam-g4",
        "A ramp has an angle of elevation of 30° and a horizontal run of 10 m. Which expression gives the height of the ramp?",
        "A",
        [
          "$10 \\times \\tan 30^\\circ$",
          "$10 \\times \\sin 30^\\circ$",
          "$10 \\times \\cos 30^\\circ$",
          "$10 \\div \\tan 30^\\circ$",
        ],
        "Height is opposite 30° and horizontal run is adjacent. Use tangent.",
        "tan(30°) = height/10, so height = 10 × tan(30°). Run is adjacent and height is opposite."
      ),
    ],
    independentPractice: [
      examAnswer(
        "y12s1-trig-exam-i1",
        "A person stands 35 m from a building and looks up at an angle of elevation of 45°. Find the height of the building.",
        "h = 35 \\times \\tan 45^\\circ",
        "35",
        ["35 m"],
        "Height is opposite 45° and horizontal 35 m is adjacent. Note tan(45°) = 1.",
        "tan(45°) = h/35, so h = 35 × tan(45°) = 35 × 1 = 35 m."
      ),
      examAnswer(
        "y12s1-trig-exam-i2",
        "A car travels 150 km at 50 km/h, stops for 45 minutes for lunch, then travels 200 km at 100 km/h. Find the total journey time in minutes.",
        "(150/50)\\times60 + 45 + (200/100)\\times60",
        "345",
        ["345 min", "345 minutes"],
        "Find each phase in hours, convert to minutes, then add the rest stop.",
        "Phase 1: 150/50 = 3 h = 180 min. Stop: 45 min. Phase 2: 200/100 = 2 h = 120 min. Total = 345 min."
      ),
      examChoice(
        "y12s1-trig-exam-i3",
        "A hire car costs $45 per day plus $0.20 per km. Which expression gives the total cost C for d days and k km?",
        "A",
        [
          "$C = 45d + 0.20k$",
          "$C = 45k + 0.20d$",
          "$C = (45 + 0.20)(d + k)$",
          "$C = 45 \\div d + 0.20 \\div k$",
        ],
        "Total cost = (daily rate × days) + (per-km rate × km).",
        "C = 45d + 0.20k. The daily rate ($45) multiplies by d and the per-km rate ($0.20) multiplies by k."
      ),
      {
        ...examAnswer(
          "y12s1-trig-exam-i4",
          "A cable attached to the top of a boat mast makes an angle of 68° with the deck. If the cable is 12 m long, find the height of the mast attachment point above the deck to 1 decimal place.",
          "h = 12 \\times \\sin 68^\\circ",
          "11.1",
          ["11.1 m"],
          "The cable is the hypotenuse and the height is opposite 68°. Use sin(68°) = height/12.",
          "sin(68°) = h/12, so h = 12 × sin(68°) = 12 × 0.9272 = 11.1 m."
        ),
        triangleDiagram: {
          description:
            "Right triangle: mast height h from deck (C) to attachment point (A), cable AB = 12 m making 68° with the deck at B.",
          vertices: { A: { x: 80, y: 50 }, C: { x: 80, y: 220 }, B: { x: 330, y: 220 } },
          rightAngleAt: "C",
          angleLabels: { B: "68°" },
          sideLabels: { AB: "12 m", AC: "h" },
        },
      },
      examAnswer(
        "y12s1-trig-exam-i5",
        "A bricklayer lays 200 bricks per hour and earns $32 per hour. Bricks cost $0.85 each. Find the total cost (labour and materials) for a wall requiring 1400 bricks.",
        "(1400/200)\\times32 + 1400\\times0.85",
        "1414",
        ["$1414"],
        "Find labour hours, calculate labour cost and material cost separately, then add.",
        "Labour hours = 1400/200 = 7 h. Labour cost = 7 × $32 = $224. Materials = 1400 × $0.85 = $1190. Total = $1414."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Starting calculations without identifying whether the question needs trig, rates, or both.",
        fix: "Check first: if a right triangle with an angle is described, use trig; if a rate × quantity setup is given, use the rate formula.",
      },
      {
        mistake: "Using sin or cos when tan is needed in a mixed-context problem.",
        fix: "Label all three sides of the right triangle relative to the given angle before choosing a ratio.",
      },
      {
        mistake: "Giving the answer in hours when the question asks for minutes, or vice versa.",
        fix: "Check the required units in the question and convert the final answer before writing it.",
      },
    ],
    masteryQuiz: [
      examChoice(
        "y12s1-trig-exam-m1",
        "Which of these questions requires trigonometry to solve?",
        "A",
        [
          "Find the height of a wall given horizontal distance 30 m and elevation angle 40°.",
          "Find the travel time for a 200 km trip at 80 km/h.",
          "Find total earnings for 6 hours at $25 per hour.",
          "Find fuel cost for a 300 km trip at 10 L/100 km and $1.90/L.",
        ],
        "Only one option involves an angle in a right triangle.",
        "Option A involves a right-angle triangle and an elevation angle — use tan(40°). Options B, C, D are rate calculations."
      ),
      examAnswer(
        "y12s1-trig-exam-m2",
        "From 40 m away, the angle of elevation to a flagpole top is 33°. Find the height of the flagpole to 1 decimal place.",
        "h = 40 \\times \\tan 33^\\circ",
        "26.0",
        ["26", "26.0 m"],
        "Height is opposite 33° and horizontal 40 m is adjacent. Use tan(33°) = h/40.",
        "tan(33°) = h/40, so h = 40 × tan(33°) = 40 × 0.6494 = 26.0 m."
      ),
      examAnswer(
        "y12s1-trig-exam-m3",
        "A printer prints 24 pages per minute. How many minutes to print a 360-page document?",
        "360 \\div 24",
        "15",
        ["15 min", "15 minutes"],
        "Use time = total pages ÷ rate = 360 ÷ 24.",
        "time = 360/24 = 15 minutes."
      ),
      examChoice(
        "y12s1-trig-exam-m4",
        "A slope rises 5 m over a horizontal run of 15 m. Which expression gives the angle of inclination θ?",
        "A",
        [
          "$\\tan^{-1}(5/15)$",
          "$\\sin^{-1}(5/15)$",
          "$\\cos^{-1}(5/15)$",
          "$\\tan^{-1}(15/5)$",
        ],
        "Rise is opposite and run is adjacent. Use inverse tangent with opposite/adjacent.",
        "tan(θ) = 5/15, so θ = arctan(5/15). Option D inverts the fraction; B and C use wrong ratios."
      ),
      examAnswer(
        "y12s1-trig-exam-m5",
        "A road rises 3 m for every 12 m of horizontal run. Find the angle of inclination to the nearest degree.",
        "\\theta = \\tan^{-1}(3/12)",
        "14",
        ["14°", "14 degrees"],
        "Rise is opposite and run is adjacent. Use θ = arctan(rise/run) = arctan(3/12).",
        "tan(θ) = 3/12 = 0.25, so θ = arctan(0.25) = 14.0° which rounds to 14°."
      ),
      examAnswer(
        "y12s1-trig-exam-m6",
        "A shop sells 80 items per hour. Each item sells for $3.50. Find the total revenue from a 3-hour trading session.",
        "80 \\times 3 \\times 3.50",
        "840",
        ["$840"],
        "Items sold = rate × time. Revenue = items × price per item.",
        "Items = 80 × 3 = 240. Revenue = 240 × $3.50 = $840."
      ),
      examChoice(
        "y12s1-trig-exam-m7",
        "A cable car travels at 6 km/h along a slope of angle 15°. Which expression gives the vertical height gained per hour?",
        "A",
        [
          "$6 \\times \\sin 15^\\circ$",
          "$6 \\times \\cos 15^\\circ$",
          "$6 \\times \\tan 15^\\circ$",
          "$6 \\div \\sin 15^\\circ$",
        ],
        "The cable car travels along the hypotenuse (slope length). Vertical rise is opposite 15°.",
        "The slope distance (6 km) is the hypotenuse. Vertical rise = hyp × sin(15°) = 6 × sin(15°)."
      ),
      examAnswer(
        "y12s1-trig-exam-m8",
        "A boat travels 8 km north then 6 km east. Find the bearing angle from start to finish to the nearest degree, measured from north.",
        "\\theta = \\tan^{-1}(6/8)",
        "37",
        ["37°", "37 degrees"],
        "East distance (6 km) is opposite the bearing angle; north distance (8 km) is adjacent. Use inverse tangent.",
        "tan(θ) = 6/8 = 0.75, so θ = arctan(0.75) = 36.9° which rounds to 37°."
      ),
      examAnswer(
        "y12s1-trig-exam-m9",
        "A factory produces 150 items per hour and operates 8 hours per day. Each item sells for $12.50. Find the total daily revenue.",
        "150 \\times 8 \\times 12.50",
        "15000",
        ["$15000", "15,000", "$15,000"],
        "Items per day = rate × hours. Revenue = items × price per item.",
        "Items per day = 150 × 8 = 1200. Revenue = 1200 × $12.50 = $15000."
      ),
      examAnswer(
        "y12s1-trig-exam-m10",
        "A viewing platform is 25 m above the ground. A ranger spots an animal at an angle of depression of 12°. Find the horizontal distance from directly below the platform to the animal to 1 decimal place.",
        "d = 25/\\tan 12^\\circ",
        "117.6",
        ["117.6 m"],
        "The elevation angle from the animal is 12°; height 25 m is opposite and d is adjacent. Use tan(12°) = 25/d.",
        "tan(12°) = 25/d, so d = 25/tan(12°) = 25/0.2126 = 117.6 m."
      ),
    ],
    masteryPassMark: 0.75,
    multiPartPractice: [
      {
        id: "y12s1-trig-exam-mp-1",
        prompt: "A ramp is 20 m long and makes an angle of 25° with the horizontal ground.",
        latex: "\\text{Ramp length: }20\\text{ m},\\quad\\text{angle: }25^\\circ",
        answer: "8.5",
        hint: "Use sin for part (a), cos for part (b), then apply the height from part (a) with the new run in part (c).",
        explanation:
          "Part (a): h = 20 × sin(25°) = 8.5 m. Part (b): run = 20 × cos(25°) = 18.1 m. Part (c): tan(θ) = 8.5/12, so θ = arctan(0.7083) = 35°.",
        triangleDiagram: {
          description:
            "Right triangle representing the ramp: angle 25° at base (A), right angle at C, ramp top at B. Ramp AB = 20 m, height BC = h, run AC = run.",
          vertices: { A: { x: 60, y: 220 }, C: { x: 330, y: 220 }, B: { x: 330, y: 70 } },
          rightAngleAt: "C",
          angleLabels: { A: "25°" },
          sideLabels: { AB: "20 m", BC: "h", AC: "run" },
        },
        parts: [
          {
            key: "a",
            label: "(a)",
            prompt: "Find the vertical height gained by the ramp to 1 decimal place.",
            latex: "h = 20 \\times \\sin 25^\\circ",
            marks: 1,
            answer: "8.5",
            acceptedAnswers: ["8.5 m"],
            hint: "The ramp (20 m) is the hypotenuse and the height is opposite 25°. Use sine.",
            explanation: "h = 20 × sin(25°) = 20 × 0.4226 = 8.5 m.",
          },
          {
            key: "b",
            label: "(b)",
            prompt: "Find the horizontal distance (run) along the ground to 1 decimal place.",
            latex: "\\text{run} = 20 \\times \\cos 25^\\circ",
            marks: 2,
            answer: "18.1",
            acceptedAnswers: ["18.1 m"],
            hint: "The run is adjacent to 25°. Use cosine: run = hyp × cos(25°).",
            explanation: "run = 20 × cos(25°) = 20 × 0.9063 = 18.1 m.",
          },
          {
            key: "c",
            label: "(c)",
            prompt:
              "A second ramp reaches the same height as in part (a) but has a horizontal run of 12 m. Find the angle this ramp makes with the ground to the nearest degree.",
            latex: "\\theta = \\tan^{-1}(8.5/12)",
            marks: 1,
            answer: "35",
            acceptedAnswers: ["35°", "35 degrees"],
            hint: "Height from part (a) is opposite; the new run 12 m is adjacent. Use inverse tangent.",
            explanation: "tan(θ) = 8.5/12 = 0.7083, so θ = arctan(0.7083) = 35.3° which rounds to 35°.",
          },
        ],
      },
    ],
  };
}

// ─── Bivariate Data and Scatter Plots ────────────────────────────────────────

function bivChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

export function year12Standard1BivariateDataScatterPlotsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "bivariate-data-scatter-plots"
  ) {
    return null;
  }

  return {
    description:
      "Distinguish univariate and bivariate data, identify independent and dependent variables, create scatter plots, and describe associations by form, strength and direction.",
    learningIntention:
      "Plot and interpret scatter plots to describe the association between two variables.",
    successCriteria: [
      "Distinguish between univariate data (one variable) and bivariate data (two variables).",
      "Identify the independent variable (x-axis) and the dependent variable (y-axis).",
      "Describe the association between two variables in terms of form, strength and direction.",
      "Explain why correlation between two variables does not prove that one causes the other.",
    ],
    teaching: {
      paragraphs: [
        "Univariate data records one measurement per person or object, such as a list of heights. Bivariate data records two measurements per person, such as height and shoe size, so we can explore whether the two variables are related.",
        "The independent variable (placed on the x-axis) is the variable we choose or control. The dependent variable (placed on the y-axis) is the outcome we measure. For example, study time is independent and test score is dependent.",
        "On a scatter plot each data point is plotted as a coordinate (x, y). We describe the pattern in three ways: form (linear if the points follow a straight line, non-linear if they curve), direction (positive if y increases as x increases, negative if y decreases as x increases), and strength (strong if the points are tightly clustered, weak if they are widely scattered).",
        "Correlation describes the pattern we observe in data. It does not prove causation — that one variable directly causes the other to change. A third variable may drive both, or the association may be coincidental.",
      ],
      latexBlocks: [
        "\\text{Positive: as }x \\uparrow, y \\uparrow",
        "\\text{Negative: as }x \\uparrow, y \\downarrow",
      ],
    },
    workedExamples: [
      {
        title: "Identify variables and classify the data",
        questionLatex:
          "\\text{A researcher records the daily hours of exercise and resting heart rate for 20 participants. Identify the variables and state whether the data is univariate or bivariate.}",
        steps: [
          {
            explanation:
              "Two values are recorded for each participant: hours of exercise and resting heart rate. Data with two variables per subject is bivariate.",
          },
          {
            explanation:
              "Hours of exercise is the factor being varied — it is the independent variable (x-axis). Resting heart rate is the outcome being measured — it is the dependent variable (y-axis).",
          },
        ],
        finalAnswerLatex:
          "\\text{Bivariate. Independent: exercise hours (x). Dependent: resting heart rate (y).}",
      },
      {
        title: "Describe the association from a scatter plot description",
        questionLatex:
          "\\text{A scatter plot of study hours (x) vs test score (y) shows points following a roughly straight upward trend, clustered fairly closely around the line. Describe the association.}",
        steps: [
          {
            explanation:
              "Form: the points follow a roughly straight line, so the form is linear.",
          },
          {
            explanation:
              "Direction: as study hours increase, test scores increase. The direction is positive.",
          },
          {
            explanation:
              "Strength: the points are fairly closely clustered. The strength is strong.",
          },
        ],
        finalAnswerLatex:
          "\\text{Strong positive linear association.}",
      },
    ],
    guidedPractice: [
      bivChoice(
        "y12s1-biv-g1",
        "A data set records only the ages of 30 students. What type of data is this?",
        "A",
        [
          "Univariate — only one variable is recorded per student.",
          "Bivariate — two variables are recorded per student.",
          "Categorical — the values are categories.",
          "Continuous — the values can take any value.",
        ],
        "Count how many different pieces of information are recorded per person.",
        "Only one variable (age) is recorded per student. This is univariate data."
      ),
      bivChoice(
        "y12s1-biv-g2",
        "A study measures the number of hours of sleep and the reaction time for each participant. Which is the dependent variable?",
        "B",
        [
          "Hours of sleep — it is the variable being controlled.",
          "Reaction time — it is the outcome being measured.",
          "Number of participants — it counts people, not a measurement.",
          "The length of the study — it is fixed by the researcher.",
        ],
        "The dependent variable is the outcome we measure, which depends on the other variable.",
        "Reaction time is the outcome being measured. Hours of sleep is the factor being varied, so it is the independent variable. Reaction time is the dependent variable."
      ),
      bivChoice(
        "y12s1-biv-g3",
        "A scatter plot shows that as outdoor temperature increases, the number of hot drinks sold decreases. What is the direction of this association?",
        "B",
        [
          "Positive — both variables increase together.",
          "Negative — as temperature increases, hot drinks sold decreases.",
          "No association — the variables are unrelated.",
          "Non-linear — the relationship is curved.",
        ],
        "Direction is positive when both variables move in the same direction, negative when they move in opposite directions.",
        "As temperature increases, hot drinks sold decreases — they move in opposite directions. The association is negative."
      ),
      bivChoice(
        "y12s1-biv-g4",
        "A scatter plot shows points scattered widely in every direction with no visible trend. What word best describes the strength of this association?",
        "C",
        [
          "Strong — the trend is very clear.",
          "Moderate — there is some visible trend.",
          "Weak — there is no clear pattern.",
          "Linear — the points follow a straight line.",
        ],
        "Strength describes how closely the points cluster around a pattern.",
        "With points scattered in all directions and no visible trend, there is little or no association. The strength is weak (or there is no association)."
      ),
    ],
    independentPractice: [
      bivChoice(
        "y12s1-biv-i1",
        "A researcher notices that cities with more libraries have higher literacy rates and concludes that libraries cause higher literacy. What is wrong with this conclusion?",
        "B",
        [
          "Nothing — a strong positive correlation always proves causation.",
          "Correlation does not imply causation — a third factor such as education funding may drive both.",
          "The conclusion is correct because the association is positive.",
          "Libraries are the dependent variable so causation cannot apply.",
        ],
        "Think about whether the correlation alone is enough to prove that one variable causes the other.",
        "A positive correlation between libraries and literacy does not prove libraries cause higher literacy. Education funding, for example, may increase both. Correlation does not imply causation."
      ),
      bivChoice(
        "y12s1-biv-i2",
        "A scatter plot of car age (x-axis, years) vs resale value (y-axis, $) shows a downward-sloping linear pattern with points close to the line. Which description fits best?",
        "A",
        [
          "Strong negative linear association.",
          "Strong positive linear association.",
          "Weak negative linear association.",
          "Non-linear association.",
        ],
        "Consider direction (do both increase, or does one decrease?), strength (how close to the line?), and form (straight or curved?).",
        "Points slope downward (negative direction), are closely clustered (strong), and follow a straight line (linear). Best description: strong negative linear association."
      ),
      bivChoice(
        "y12s1-biv-i3",
        "Which pair of variables would most likely show a positive association?",
        "C",
        [
          "Car speed and fuel efficiency.",
          "Hours of TV watched and school grades.",
          "Height of a person and their weight.",
          "Amount of rain and number of sunny days.",
        ],
        "A positive association means both variables tend to increase together.",
        "Taller people tend to weigh more — as height increases, weight tends to increase. This is a positive association. The other pairs show negative or no clear association."
      ),
      bivChoice(
        "y12s1-biv-i4",
        "A scatter plot shows points following a U-shaped curved pattern. What word best describes the form of the association?",
        "B",
        [
          "Linear — the points follow a straight line.",
          "Non-linear — the points follow a curved pattern.",
          "No association — the points are random.",
          "Positive — the variables increase together.",
        ],
        "Form describes the overall shape of the point pattern.",
        "A U-shaped pattern is curved, not straight. The form of the association is non-linear."
      ),
      bivChoice(
        "y12s1-biv-i5",
        "A data set records the number of absences and the final exam mark for 50 students. Which variable should be placed on the x-axis of a scatter plot?",
        "A",
        [
          "Number of absences — it is the independent variable that may influence exam marks.",
          "Final exam mark — it is the independent variable.",
          "Number of students — it is the independent variable.",
          "Either variable can go on the x-axis.",
        ],
        "The independent variable (the one that influences the other) goes on the x-axis.",
        "The number of absences is likely to influence the exam mark, so it is the independent variable and belongs on the x-axis. Exam mark is the dependent variable and goes on the y-axis."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Confusing form and strength — calling a weak association 'non-linear'.",
        fix: "Form (straight or curved) and strength (tightly or loosely clustered) are separate features. Both must be described.",
      },
      {
        mistake: "Concluding that a strong correlation proves causation.",
        fix: "Correlation shows that two variables change together. Causation requires evidence that one directly produces a change in the other. A third variable may explain both.",
      },
      {
        mistake: "Placing the dependent variable on the x-axis.",
        fix: "The independent variable (the one we control or that drives the other) always goes on the x-axis; the dependent variable goes on the y-axis.",
      },
    ],
    masteryQuiz: [
      bivChoice(
        "y12s1-biv-m1",
        "A study records the shoe size and hair colour of 100 people. How many variables are recorded per person?",
        "B",
        ["One.", "Two.", "Three.", "Four."],
        "Count the number of different pieces of information recorded per person.",
        "Shoe size and hair colour are two separate variables recorded for each person. This is bivariate data with two variables."
      ),
      bivChoice(
        "y12s1-biv-m2",
        "In a plant growth study, a researcher changes the amount of fertiliser and records plant height after 4 weeks. Which is the independent variable?",
        "A",
        [
          "Amount of fertiliser.",
          "Plant height.",
          "Number of weeks.",
          "Number of plants.",
        ],
        "The independent variable is the one the researcher controls or changes.",
        "The researcher controls the amount of fertiliser — this is the independent variable. Plant height is the outcome (dependent variable)."
      ),
      bivChoice(
        "y12s1-biv-m3",
        "A scatter plot shows points widely scattered with no visible pattern. What does this tell us?",
        "D",
        [
          "Strong positive association.",
          "Strong negative association.",
          "Weak positive association.",
          "Little or no association between the variables.",
        ],
        "Strength is determined by how closely points cluster around a pattern.",
        "Widely scattered points with no visible pattern indicate little or no association between the variables."
      ),
      bivChoice(
        "y12s1-biv-m4",
        "A scatter plot of temperature (x) and ice cream sales (y) shows points clustered closely around an upward-sloping straight line. Which description is most accurate?",
        "A",
        [
          "Strong positive linear association.",
          "Weak positive linear association.",
          "Strong negative linear association.",
          "No association.",
        ],
        "Consider direction, strength, and form separately.",
        "Points slope upward (positive direction), are closely clustered (strong), around a straight line (linear). This is a strong positive linear association."
      ),
      bivChoice(
        "y12s1-biv-m5",
        "Ice cream sales and drowning incidents both increase in summer. A student concludes that eating ice cream causes drowning. What is the error?",
        "C",
        [
          "The association is negative, not positive.",
          "Drowning incidents are the independent variable.",
          "Correlation does not imply causation — hot weather drives both variables.",
          "The data is univariate, not bivariate.",
        ],
        "Think about what else could explain both variables increasing at the same time.",
        "Hot weather causes both ice cream sales and drowning incidents to increase. Correlation between ice cream sales and drowning does not mean one causes the other."
      ),
      bivChoice(
        "y12s1-biv-m6",
        "Which word describes the form of an association when scatter plot points follow a curved pattern?",
        "B",
        ["Linear.", "Non-linear.", "Positive.", "Strong."],
        "Form is about shape: straight or curved.",
        "A curved pattern means the association is non-linear. Linear, positive, and strong describe different features."
      ),
      bivChoice(
        "y12s1-biv-m7",
        "A data set records hours studied and test scores. As study hours increase, test scores increase. What is the direction of the association?",
        "A",
        [
          "Positive — both variables increase together.",
          "Negative — the variables move in opposite directions.",
          "No association — the variables are unrelated.",
          "Non-linear — the relationship is curved.",
        ],
        "Direction is positive when both variables increase together.",
        "Both study hours and test scores increase together. The direction of the association is positive."
      ),
      bivChoice(
        "y12s1-biv-m8",
        "A researcher notices that towns with more storks also have higher birth rates. Which statement is most reasonable?",
        "B",
        [
          "Storks cause babies to be born.",
          "A third variable such as rural area size likely explains both observations.",
          "Birth rates cause storks to appear.",
          "There must be a strong non-linear association.",
        ],
        "Consider whether a third variable could explain both trends without either one causing the other.",
        "Larger, more rural areas have more storks and higher birth rates. The third variable (rural area) explains both. This is a classic example of spurious correlation — correlation does not imply causation."
      ),
      bivChoice(
        "y12s1-biv-m9",
        "Two scatter plots show the same data from different studies. Plot A has points clustered tightly around a trend line. Plot B has points loosely scattered around a trend line. Which shows a stronger association?",
        "A",
        [
          "Plot A — points are more tightly clustered around the trend.",
          "Plot B — points are more loosely scattered.",
          "Both have the same strength.",
          "Strength cannot be compared without knowing the gradient.",
        ],
        "Strength is determined by how closely points cluster around the trend.",
        "The more tightly points cluster around the line, the stronger the association. Plot A has more tightly clustered points, so it shows a stronger association."
      ),
      bivChoice(
        "y12s1-biv-m10",
        "A scatter plot of speed (km/h) and stopping distance (m) shows a curved upward pattern. Which description fits best?",
        "C",
        [
          "Strong positive linear association.",
          "Weak positive linear association.",
          "Positive non-linear association.",
          "Negative linear association.",
        ],
        "Consider direction (both increase?), form (straight or curved?), and strength separately.",
        "Stopping distance increases as speed increases (positive direction) but the pattern is curved (non-linear form). This is a positive non-linear association."
      ),
    ],
  };
}

// ─── Line of Best Fit and Predictions ────────────────────────────────────────

function lobfChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function lobfAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1LineOfBestFitPredictionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "line-of-best-fit-predictions"
  ) {
    return null;
  }

  return {
    description:
      "Draw a line of best fit by eye, find its gradient and y-intercept, and use interpolation and extrapolation to make predictions.",
    learningIntention:
      "Use a line of best fit to summarise bivariate data and make predictions with appropriate caveats.",
    successCriteria: [
      "Draw a line of best fit by eye so that roughly equal numbers of data points lie on each side.",
      "Calculate the gradient of a line of best fit using two identified points on the line.",
      "Use the line of best fit to predict a y-value by interpolation (within the data range).",
      "Recognise that extrapolation (outside the data range) gives less reliable predictions.",
    ],
    teaching: {
      paragraphs: [
        "A line of best fit is a straight line drawn through the scatter of data points so that roughly equal numbers of points lie on either side of the line. It summarises the overall linear trend of the bivariate data.",
        "Find the gradient by choosing two clearly identified points on the line: m = (y₂ − y₁) / (x₂ − x₁). Find the y-intercept by identifying where the line crosses the y-axis, or by substituting a known point into y = mx + b and solving for b.",
        "Interpolation means predicting a y-value for an x-value that falls inside the range of the original data. This is more reliable because the model was built using data in that range.",
        "Extrapolation means predicting a y-value for an x-value outside the data range. This is less reliable because the linear trend may not continue beyond the observed data.",
      ],
      latexBlocks: [
        "m = \\frac{y_2 - y_1}{x_2 - x_1}",
        "\\hat{y} = mx + b",
      ],
    },
    workedExamples: [
      {
        title: "Find the gradient and equation of a line of best fit",
        questionLatex:
          "\\text{A line of best fit passes through the points }(2, 10)\\text{ and }(8, 28).\\text{ Find the gradient and the equation.}",
        steps: [
          {
            explanation: "Use the gradient formula with the two given points.",
            latex: "m = \\frac{28 - 10}{8 - 2} = \\frac{18}{6} = 3",
          },
          {
            explanation: "Substitute one point into y = mx + b to find the y-intercept.",
            latex: "10 = 3(2) + b \\implies b = 4",
          },
          {
            explanation: "Write the equation of the line of best fit.",
            latex: "\\hat{y} = 3x + 4",
          },
        ],
        finalAnswerLatex: "\\hat{y} = 3x + 4",
      },
      {
        title: "Interpolation and extrapolation",
        questionLatex:
          "\\text{A line of best fit is }\\hat{y} = 3x + 4\\text{ for data with }x \\in [2, 8].\\text{ Predict y when }x = 5\\text{ and when }x = 12.",
        steps: [
          {
            explanation:
              "For x = 5 (inside the data range 2 to 8), use interpolation.",
            latex: "\\hat{y} = 3(5) + 4 = 19",
          },
          {
            explanation:
              "For x = 12 (outside the data range), use extrapolation. This prediction is less reliable.",
            latex: "\\hat{y} = 3(12) + 4 = 40",
          },
          {
            explanation:
              "State the reliability: the prediction at x = 5 is reliable (interpolation); the prediction at x = 12 is less reliable (extrapolation).",
          },
        ],
        finalAnswerLatex:
          "x=5: \\hat{y}=19\\text{ (reliable)}\\quad x=12: \\hat{y}=40\\text{ (less reliable)}",
      },
    ],
    guidedPractice: [
      lobfAnswer(
        "y12s1-lobf-g1",
        "A line of best fit passes through the points (1, 5) and (5, 13). Find the gradient.",
        "m = \\frac{13 - 5}{5 - 1}",
        "2",
        ["2.0"],
        "Use m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (13 − 5) / (5 − 1) = 8 / 4 = 2."
      ),
      lobfAnswer(
        "y12s1-lobf-g2",
        "A line of best fit has equation ŷ = 2x + 3. Predict the y-value when x = 6.",
        "\\hat{y} = 2(6) + 3",
        "15",
        ["15.0"],
        "Substitute x = 6 into the equation.",
        "ŷ = 2(6) + 3 = 12 + 3 = 15."
      ),
      lobfChoice(
        "y12s1-lobf-g3",
        "A model was built using data for x values from 5 to 20. A prediction is made at x = 15. What is this type of prediction called?",
        "A",
        [
          "Interpolation — x = 15 is within the data range.",
          "Extrapolation — x = 15 is outside the data range.",
          "Gradient — it measures the rate of change.",
          "Y-intercept — it is the starting value.",
        ],
        "Interpolation: inside the data range. Extrapolation: outside the data range.",
        "x = 15 falls within the data range of 5 to 20. Predicting within the data range is called interpolation."
      ),
      lobfChoice(
        "y12s1-lobf-g4",
        "A line of best fit passes through the points (0, 4) and (10, 24). What is the y-intercept?",
        "B",
        ["10", "4", "24", "2"],
        "The y-intercept is the y-value when x = 0.",
        "When x = 0, y = 4. The y-intercept is 4."
      ),
    ],
    independentPractice: [
      lobfAnswer(
        "y12s1-lobf-i1",
        "A line of best fit passes through (0, 6) and (4, 18). Find the gradient.",
        "m = \\frac{18 - 6}{4 - 0}",
        "3",
        ["3.0"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (18 − 6) / (4 − 0) = 12 / 4 = 3."
      ),
      lobfAnswer(
        "y12s1-lobf-i2",
        "A line of best fit has equation ŷ = 4x − 2. The data was collected for x values between 3 and 12. Predict y when x = 7.",
        "\\hat{y} = 4(7) - 2",
        "26",
        ["26.0"],
        "Substitute x = 7 into the equation. Check whether x = 7 is in the data range first.",
        "ŷ = 4(7) − 2 = 28 − 2 = 26. Since 7 is between 3 and 12, this is interpolation."
      ),
      lobfChoice(
        "y12s1-lobf-i3",
        "A model was built using data for x from 2 to 15. A researcher predicts y at x = 25. Which statement is true?",
        "B",
        [
          "This is interpolation and is reliable.",
          "This is extrapolation and may not be reliable.",
          "This prediction is always accurate for linear models.",
          "The gradient cannot be used outside the data range.",
        ],
        "Is x = 25 inside or outside the data range?",
        "x = 25 is outside the data range of 2 to 15. This is extrapolation. The linear trend may not continue past x = 15, so the prediction may not be reliable."
      ),
      lobfChoice(
        "y12s1-lobf-i4",
        "A line of best fit passes through (2, 8) and (6, 16). Which equation matches this line?",
        "A",
        [
          "$\\hat{y} = 2x + 4$",
          "$\\hat{y} = 4x + 2$",
          "$\\hat{y} = 2x + 2$",
          "$\\hat{y} = 4x - 2$",
        ],
        "Find the gradient first using the two given points, then use one point to find the y-intercept.",
        "m = (16 − 8) / (6 − 2) = 8/4 = 2. Using (2, 8): 8 = 2(2) + b → b = 4. Equation: ŷ = 2x + 4."
      ),
      lobfAnswer(
        "y12s1-lobf-i5",
        "A line of best fit has equation ŷ = 1.5x + 5. The data range is x = 0 to x = 10. Predict y when x = 8.",
        "\\hat{y} = 1.5(8) + 5",
        "17",
        ["17.0"],
        "Substitute x = 8 into the equation.",
        "ŷ = 1.5 × 8 + 5 = 12 + 5 = 17."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Drawing the line through as many points as possible rather than balancing points on both sides.",
        fix: "A line of best fit should have roughly equal numbers of data points on each side — it is not a connect-the-dots line.",
      },
      {
        mistake: "Using the wrong point when finding the y-intercept via b = y − mx.",
        fix: "After finding the gradient, substitute any clearly identified point (x₁, y₁) into y = mx + b and solve for b.",
      },
      {
        mistake: "Treating an extrapolated prediction as reliable without any qualification.",
        fix: "Always state that extrapolated predictions are less reliable because the trend may not continue outside the data range.",
      },
    ],
    masteryQuiz: [
      lobfAnswer(
        "y12s1-lobf-m1",
        "A line of best fit passes through (1, 3) and (7, 15). Find the gradient.",
        "m = \\frac{15 - 3}{7 - 1}",
        "2",
        ["2.0"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (15 − 3) / (7 − 1) = 12 / 6 = 2."
      ),
      lobfAnswer(
        "y12s1-lobf-m2",
        "A line of best fit has equation ŷ = 3x + 1. Predict y when x = 5.",
        "\\hat{y} = 3(5) + 1",
        "16",
        ["16.0"],
        "Substitute x = 5 into ŷ = 3x + 1.",
        "ŷ = 3(5) + 1 = 15 + 1 = 16."
      ),
      lobfChoice(
        "y12s1-lobf-m3",
        "Data was collected for x from 10 to 50. A prediction is made at x = 30. What type of prediction is this?",
        "A",
        [
          "Interpolation — x = 30 is within the data range.",
          "Extrapolation — x = 30 is outside the data range.",
          "A gradient calculation.",
          "A y-intercept calculation.",
        ],
        "Is x = 30 inside the range 10 to 50?",
        "x = 30 falls within the data range 10 to 50. This is interpolation."
      ),
      lobfChoice(
        "y12s1-lobf-m4",
        "Which statement correctly describes the reliability of interpolation versus extrapolation?",
        "B",
        [
          "Extrapolation is more reliable because it extends the model further.",
          "Interpolation is more reliable because the prediction is within the observed data range.",
          "Both are equally reliable for a linear model.",
          "Neither interpolation nor extrapolation produces useful predictions.",
        ],
        "Consider where the x-value falls relative to the original data.",
        "Interpolation uses x-values within the data range, where the model was built. This is more reliable. Extrapolation assumes the trend continues beyond the data, which may not hold."
      ),
      lobfAnswer(
        "y12s1-lobf-m5",
        "A line of best fit passes through (0, 2) and (5, 12). What is the gradient?",
        "m = \\frac{12 - 2}{5 - 0}",
        "2",
        ["2.0"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (12 − 2) / (5 − 0) = 10 / 5 = 2."
      ),
      lobfAnswer(
        "y12s1-lobf-m6",
        "A line of best fit has equation ŷ = 0.5x + 10. Predict y when x = 20.",
        "\\hat{y} = 0.5(20) + 10",
        "20",
        ["20.0"],
        "Substitute x = 20 into ŷ = 0.5x + 10.",
        "ŷ = 0.5 × 20 + 10 = 10 + 10 = 20."
      ),
      lobfChoice(
        "y12s1-lobf-m7",
        "A student uses a model built from data with x from 0 to 8 to predict y when x = 15. What should the student say about this prediction?",
        "C",
        [
          "The prediction is reliable because the model is linear.",
          "The prediction is reliable because a larger x produces a larger y.",
          "The prediction may not be reliable because x = 15 is outside the data range (extrapolation).",
          "The prediction is impossible to make.",
        ],
        "Is x = 15 inside or outside the data range?",
        "x = 15 is outside the data range of 0 to 8. This is extrapolation. The prediction should be qualified as less reliable because the linear trend may not continue that far."
      ),
      lobfAnswer(
        "y12s1-lobf-m8",
        "A line of best fit passes through (3, 11) and (9, 23). What is the y-intercept?",
        "m = \\frac{23-11}{9-3} = 2,\\quad b = 11 - 2(3)",
        "5",
        ["5.0", "b = 5"],
        "Find the gradient first, then substitute one point into y = mx + b and solve for b.",
        "m = (23 − 11) / (9 − 3) = 12/6 = 2. Using (3, 11): 11 = 2(3) + b → b = 11 − 6 = 5."
      ),
      lobfChoice(
        "y12s1-lobf-m9",
        "The gradient of a line of best fit for hours worked (x) and pay earned in dollars (y) is 18. What does this gradient represent in context?",
        "A",
        [
          "Pay increases by $18 for each additional hour worked.",
          "A worker needs 18 hours to earn $1.",
          "The y-intercept of the earnings model is $18.",
          "Working 18 hours results in zero pay.",
        ],
        "Gradient is the rate of change: for every 1 unit increase in x, y increases by m.",
        "The gradient of 18 means that for each additional hour worked, pay increases by $18. This is the hourly rate."
      ),
      lobfChoice(
        "y12s1-lobf-m10",
        "A student draws a line through only the leftmost and rightmost data points on the scatter plot. What is the problem with this approach?",
        "B",
        [
          "The gradient formula cannot be applied to those points.",
          "The line passes through extreme end-points only, not through the overall middle of the data.",
          "Both end-points must have the same y-value.",
          "Extrapolation is required to draw any line of best fit.",
        ],
        "A line of best fit should pass through the middle of the scatter of all points.",
        "A line of best fit should have roughly equal numbers of points on either side of the line — it represents the overall trend. Forcing the line through only the extreme end-points ignores the middle of the data and does not minimise distances from all points."
      ),
    ],
  };
}

// ─── Bearings and Compass Directions ─────────────────────────────────────────

function bearChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function bearAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1BearingsAndCompassLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "trigonometry-ratios-rates" ||
    lesson.slug !== "bearings-and-compass"
  ) {
    return null;
  }

  return {
    description:
      "Convert between true bearings and compass bearings, find back bearings, and solve practical direction problems using right-angle trigonometry.",
    learningIntention:
      "Use true bearings and compass bearings to describe directions and solve practical navigation problems.",
    successCriteria: [
      "State a direction as a true bearing (three-figure clockwise from north).",
      "Convert a compass bearing such as N35°E or S60°W into a true bearing.",
      "Find the back bearing of a given direction by adding or subtracting 180°.",
      "Use right-angle trigonometry to find a distance or component in a bearing problem.",
    ],
    teaching: {
      paragraphs: [
        "A true bearing is measured clockwise from due north and is always written as three digits. Due north is 000°, due east is 090°, due south is 180°, and due west is 270°. Bearings are sometimes written with a T suffix, for example 045°T for NE.",
        "A compass bearing uses cardinal directions and an angle to describe direction. For example, N35°E means 35° measured from north towards east. S60°W means 60° measured from south towards west.",
        "Converting compass bearings to true bearings: N35°E → 035°T (angle from north going east); S60°E → 180° − 60° = 120°T; S40°W → 180° + 40° = 220°T; N70°W → 360° − 70° = 290°T.",
        "The back bearing (return direction) is the bearing from the destination back to the start. If the original bearing is less than 180°, add 180°. If the original is 180° or more, subtract 180°.",
      ],
      latexBlocks: [
        "\\text{N}x°\\text{E} \\to x°\\text{T}",
        "\\text{S}x°\\text{E} \\to (180-x)°\\text{T}",
        "\\text{S}x°\\text{W} \\to (180+x)°\\text{T}",
        "\\text{N}x°\\text{W} \\to (360-x)°\\text{T}",
        "\\text{back bearing} = \\text{original} \\pm 180°",
      ],
    },
    workedExamples: [
      {
        title: "Convert a compass bearing to a true bearing",
        questionLatex:
          "\\text{Convert the compass bearing S65°W to a true bearing.}",
        steps: [
          {
            explanation:
              "S65°W means 65° west of due south. South is 180°. Moving west from south means adding (going clockwise from south).",
            latex: "180° + 65° = 245°",
          },
          {
            explanation:
              "Always write a true bearing with three digits.",
          },
        ],
        finalAnswerLatex: "245°\\text{T}",
      },
      {
        title: "Find a back bearing",
        questionLatex:
          "\\text{A ship travels on a bearing of 070°T. Find the back bearing for the return journey.}",
        steps: [
          {
            explanation:
              "The bearing 070° is less than 180°, so add 180° to find the back bearing.",
            latex: "070° + 180° = 250°",
          },
          {
            explanation:
              "The result is less than 360°, so the back bearing is 250°T.",
          },
        ],
        finalAnswerLatex: "250°\\text{T}",
      },
    ],
    guidedPractice: [
      bearChoice(
        "y12s1-bear-g1",
        "What is the true bearing of due east?",
        "B",
        ["000°T", "090°T", "180°T", "270°T"],
        "True bearings start at 000° for north and increase clockwise to 360°.",
        "Due east is 90° clockwise from north. The true bearing is 090°T."
      ),
      bearAnswer(
        "y12s1-bear-g2",
        "Convert the compass bearing N40°E to a true bearing.",
        "\\text{N}40°\\text{E} \\to 040°\\text{T}",
        "040",
        ["040°", "040°T", "40", "40°", "40°T"],
        "N40°E means 40° from north towards east. North is 000°.",
        "N40°E is 40° clockwise from north. True bearing = 040°T."
      ),
      bearAnswer(
        "y12s1-bear-g3",
        "A plane travels on a bearing of 130°T. Find the back bearing for the return trip.",
        "130° + 180°",
        "310",
        ["310°", "310°T"],
        "The original bearing is less than 180°, so add 180°.",
        "130° + 180° = 310°. The back bearing is 310°T."
      ),
      bearChoice(
        "y12s1-bear-g4",
        "Which true bearing matches the compass bearing S30°W?",
        "C",
        ["030°T", "150°T", "210°T", "330°T"],
        "S30°W means 30° past south going towards west. South is 180°. Add 30°.",
        "S30°W: start at south (180°), go 30° clockwise towards west: 180° + 30° = 210°T."
      ),
    ],
    independentPractice: [
      bearAnswer(
        "y12s1-bear-i1",
        "Convert the compass bearing N55°W to a true bearing.",
        "360° - 55°",
        "305",
        ["305°", "305°T"],
        "N55°W is 55° west of north. North is 000°/360°. Going anticlockwise from north (west direction) means subtracting from 360°.",
        "N55°W: 360° − 55° = 305°T."
      ),
      bearChoice(
        "y12s1-bear-i2",
        "A hiker walks on a bearing of 200°T. What is the back bearing for the return journey?",
        "A",
        ["020°T", "200°T", "220°T", "160°T"],
        "The original bearing (200°) is ≥ 180°, so subtract 180°.",
        "200° − 180° = 020°T. The return journey is on a bearing of 020°T."
      ),
      bearAnswer(
        "y12s1-bear-i3",
        "A boat travels due north for 12 km then due east for 9 km. Find the straight-line distance from start to finish to 1 decimal place.",
        "d = \\sqrt{12^2 + 9^2}",
        "15",
        ["15 km", "15.0", "15.0 km"],
        "The path forms a right triangle. Use Pythagoras: d² = 12² + 9².",
        "d = √(144 + 81) = √225 = 15 km."
      ),
      bearChoice(
        "y12s1-bear-i4",
        "Which compass bearing matches the true bearing 340°T?",
        "D",
        ["S20°W", "N20°E", "S20°E", "N20°W"],
        "340° is in the NW quadrant. Find how many degrees it is from north going west: 360° − 340° = 20°.",
        "360° − 340° = 20°. The direction is 20° west of north. Compass bearing: N20°W."
      ),
      bearAnswer(
        "y12s1-bear-i5",
        "From point A, point B is on a bearing of 070°T and 8 km away. Find how far east of A the point B is, to 1 decimal place.",
        "\\text{east} = 8 \\times \\sin 70°",
        "7.5",
        ["7.5 km"],
        "The angle from north is 70°. The eastward component = d × sin(bearing).",
        "East = 8 × sin(70°) = 8 × 0.9397 ≈ 7.5 km."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Writing a true bearing with fewer than three digits, such as 45° instead of 045°.",
        fix: "True bearings always have three digits. Write 045°T, not 45°T.",
      },
      {
        mistake: "Adding 180° to a bearing that is already over 180°, giving a result over 360°.",
        fix: "If the original bearing is 180° or more, subtract 180° instead of adding it. Check: back bearing must be between 000° and 360°.",
      },
      {
        mistake: "Confusing NxE and SxW conversions — for example, treating N60°E the same as N30°E.",
        fix: "Read the angle carefully. N60°E means 60° from north towards east. Compute the true bearing directly: N60°E → 060°T.",
      },
    ],
    masteryQuiz: [
      bearAnswer(
        "y12s1-bear-m1",
        "State the true bearing of due south.",
        "\\text{Due south is halfway clockwise from north}",
        "180",
        ["180°", "180°T"],
        "Due south is directly opposite north — half a full rotation clockwise.",
        "Due south is 180° clockwise from north. True bearing = 180°T."
      ),
      bearAnswer(
        "y12s1-bear-m2",
        "Convert the compass bearing S75°E to a true bearing.",
        "180° - 75°",
        "105",
        ["105°", "105°T"],
        "S75°E means 75° towards east from south. South is 180°. Moving towards east from south means going anticlockwise (subtracting).",
        "South is 180°. Going 75° towards east (anticlockwise): 180° − 75° = 105°T."
      ),
      bearAnswer(
        "y12s1-bear-m3",
        "A pilot flies on a bearing of 315°T. What is the back bearing?",
        "315° - 180°",
        "135",
        ["135°", "135°T"],
        "The original bearing (315°) is ≥ 180°, so subtract 180°.",
        "315° − 180° = 135°T. The back bearing is 135°T."
      ),
      bearChoice(
        "y12s1-bear-m4",
        "Which of the following is the correct true bearing for N45°W?",
        "D",
        ["045°T", "135°T", "225°T", "315°T"],
        "N45°W is 45° west of north. Going anticlockwise from 360°.",
        "N45°W: 360° − 45° = 315°T."
      ),
      bearAnswer(
        "y12s1-bear-m5",
        "A hiker starts at P, walks on a bearing of 035°T for 6 km to reach Q. Find the northward distance PQ to 1 decimal place.",
        "\\text{north} = 6 \\times \\cos 35°",
        "4.9",
        ["4.9 km"],
        "The northward component = d × cos(bearing). The bearing 35° is measured from north.",
        "North = 6 × cos(35°) = 6 × 0.8192 ≈ 4.9 km."
      ),
      bearAnswer(
        "y12s1-bear-m6",
        "Convert the true bearing 225°T to a compass bearing.",
        "225° - 180° = 45°\\text{ past south towards west}",
        "S45°W",
        ["south 45 degrees west", "s45w"],
        "225° is between south (180°) and west (270°). Find how far past south: 225° − 180° = 45°.",
        "225° − 180° = 45°. The bearing is 45° past south towards west. Compass bearing = S45°W."
      ),
      bearAnswer(
        "y12s1-bear-m7",
        "A boat sails on a bearing of 280°T for 10 km. Find how far north of its starting position it has moved, to 1 decimal place.",
        "\\text{north} = 10 \\times \\cos(360° - 280°) = 10 \\cos 80°",
        "1.7",
        ["1.7 km"],
        "280°T is 80° west of north (360° − 280° = 80°). The northward component = d × cos(80°).",
        "The angle from north is 360° − 280° = 80°. North = 10 × cos(80°) = 10 × 0.1736 ≈ 1.7 km north."
      ),
      bearChoice(
        "y12s1-bear-m8",
        "Town B is on a bearing of 048°T from Town A. What is the bearing of Town A from Town B?",
        "C",
        ["048°T", "138°T", "228°T", "312°T"],
        "The back bearing is original + 180° (since 048° < 180°).",
        "Back bearing = 048° + 180° = 228°T. Town A is on a bearing of 228°T from Town B."
      ),
      bearAnswer(
        "y12s1-bear-m9",
        "A boat sails due east (090°T) for 8 km, then turns and sails due north (000°T) for 6 km. Find the straight-line distance from start to finish.",
        "d = \\sqrt{8^2 + 6^2}",
        "10",
        ["10 km", "10.0", "10.0 km"],
        "The two legs of the journey are perpendicular (east then north). Use Pythagoras.",
        "d = √(64 + 36) = √100 = 10 km."
      ),
      bearChoice(
        "y12s1-bear-m10",
        "Which statement about true bearings is correct?",
        "A",
        [
          "True bearings are measured clockwise from north and written as three digits.",
          "True bearings are measured anticlockwise from south.",
          "True bearings use letters like N, S, E and W.",
          "True bearings range from 0° to 180°.",
        ],
        "Recall the definition of a true bearing.",
        "True bearings are measured clockwise from due north and always written with three digits (000° to 360°). Compass bearings use N, S, E, W notation."
      ),
    ],
  };
}

// ─── Relative Frequency and Expected Value ────────────────────────────────────

function freqChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function freqAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1RelativeFrequencyExpectedValueLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "statistics-and-data" ||
    lesson.slug !== "relative-frequency-expected-value"
  ) {
    return null;
  }

  return {
    description:
      "Use complementary events P(not A) = 1 − P(A), estimate probability from relative frequency, and calculate expected frequency np.",
    learningIntention:
      "Apply complementary events, relative frequency, and expected frequency to practical probability problems.",
    successCriteria: [
      "Use P(not A) = 1 − P(A) to find the probability of the complement of an event.",
      "Calculate the relative frequency of an event from a data set.",
      "Use relative frequency as an estimate of theoretical probability.",
      "Calculate the expected frequency of an event in n trials using expected frequency = np.",
    ],
    teaching: {
      paragraphs: [
        "The complement of event A is the event that A does NOT occur. The probabilities of A and its complement must add to 1, so P(not A) = 1 − P(A). For example, if P(rain) = 0.3, then P(no rain) = 1 − 0.3 = 0.7.",
        "Relative frequency is calculated from actual data: relative frequency = frequency / total observations. For example, if 40 out of 200 people prefer coffee, relative frequency = 40/200 = 0.2.",
        "Relative frequency provides an estimate of the theoretical probability of an event. The more trials performed, the closer the relative frequency gets to the true probability.",
        "Expected frequency predicts how many times an event will occur in n trials: expected frequency = np, where p is the probability of the event. For example, if P(heads) = 0.5 and a coin is flipped 80 times, expected frequency of heads = 80 × 0.5 = 40.",
      ],
      latexBlocks: [
        "P(\\text{not }A) = 1 - P(A)",
        "\\text{relative frequency} = \\frac{\\text{frequency}}{\\text{total observations}}",
        "\\text{expected frequency} = n \\times p",
      ],
    },
    workedExamples: [
      {
        title: "Find a complementary probability",
        questionLatex:
          "\\text{The probability that a student passes a test is 0.72. Find the probability that the student does not pass.}",
        steps: [
          {
            explanation:
              "The complement of 'passes' is 'does not pass'. Use P(not A) = 1 − P(A).",
            latex: "P(\\text{not pass}) = 1 - 0.72",
          },
          {
            explanation: "Evaluate.",
            latex: "P(\\text{not pass}) = 0.28",
          },
        ],
        finalAnswerLatex: "P(\\text{not pass}) = 0.28",
      },
      {
        title: "Use relative frequency and find expected frequency",
        questionLatex:
          "\\text{A spinner was spun 200 times. It landed on blue 50 times. Find the relative frequency of blue and the expected frequency of blue in 500 spins.}",
        steps: [
          {
            explanation: "Find the relative frequency from the data.",
            latex:
              "\\text{relative frequency} = \\frac{50}{200} = 0.25",
          },
          {
            explanation:
              "Use relative frequency as an estimate of the probability of blue: P(blue) ≈ 0.25.",
          },
          {
            explanation:
              "Expected frequency in 500 spins = n × p = 500 × 0.25.",
            latex: "500 \\times 0.25 = 125",
          },
        ],
        finalAnswerLatex:
          "\\text{Relative frequency} = 0.25,\\quad \\text{expected frequency} = 125",
      },
    ],
    guidedPractice: [
      freqAnswer(
        "y12s1-rfreq-g1",
        "The probability of rolling a 6 on a fair die is 1/6. Find the probability of not rolling a 6.",
        "P(\\text{not 6}) = 1 - \\frac{1}{6}",
        "5/6",
        ["0.8333", "0.833", "5 out of 6"],
        "Use P(not A) = 1 − P(A).",
        "P(not 6) = 1 − 1/6 = 5/6."
      ),
      freqAnswer(
        "y12s1-rfreq-g2",
        "A bag of 20 marbles contains 4 red marbles. Find the relative frequency of selecting a red marble.",
        "\\text{relative frequency} = \\frac{4}{20}",
        "0.2",
        ["1/5", "20%", "4/20"],
        "Relative frequency = frequency / total observations.",
        "Relative frequency = 4/20 = 0.2."
      ),
      freqAnswer(
        "y12s1-rfreq-g3",
        "A spinner lands on green with probability 0.3. In 200 spins, what is the expected frequency of landing on green?",
        "200 \\times 0.3",
        "60",
        ["60 times"],
        "Expected frequency = n × p.",
        "Expected frequency = 200 × 0.3 = 60."
      ),
      freqChoice(
        "y12s1-rfreq-g4",
        "In 50 surveys, 15 people chose chocolate ice cream. Which value best estimates the probability that the next person chosen at random will pick chocolate?",
        "B",
        [
          "0.50",
          "0.30",
          "0.15",
          "15",
        ],
        "Use relative frequency as an estimate of probability.",
        "Relative frequency = 15/50 = 0.30. This estimates the probability that the next person picks chocolate."
      ),
    ],
    independentPractice: [
      freqAnswer(
        "y12s1-rfreq-i1",
        "The probability of it raining tomorrow is 0.45. Find the probability that it does not rain.",
        "P(\\text{no rain}) = 1 - 0.45",
        "0.55",
        ["55%", "55/100"],
        "P(not A) = 1 − P(A).",
        "P(no rain) = 1 − 0.45 = 0.55."
      ),
      freqAnswer(
        "y12s1-rfreq-i2",
        "A factory produces 500 items. 25 are defective. Find the relative frequency of a defective item.",
        "\\text{relative frequency} = \\frac{25}{500}",
        "0.05",
        ["1/20", "5%", "25/500"],
        "Relative frequency = frequency / total.",
        "Relative frequency = 25/500 = 0.05."
      ),
      freqAnswer(
        "y12s1-rfreq-i3",
        "The probability that a bus is on time is 0.8. In 150 bus trips, what is the expected number of on-time buses?",
        "150 \\times 0.8",
        "120",
        ["120 buses", "120 trips"],
        "Expected frequency = n × p.",
        "Expected frequency = 150 × 0.8 = 120."
      ),
      freqChoice(
        "y12s1-rfreq-i4",
        "A student flips a coin 100 times and records 48 heads. As the number of flips increases, what should the relative frequency of heads approach?",
        "B",
        [
          "0.48, because that is what the experiment showed.",
          "0.5, because the theoretical probability of heads is 0.5.",
          "1.0, because eventually heads always wins.",
          "0.0, because relative frequency approaches zero.",
        ],
        "Consider what the long-run relative frequency converges to.",
        "For a fair coin, P(heads) = 0.5. As the number of flips increases, the relative frequency of heads approaches the theoretical probability of 0.5."
      ),
      freqAnswer(
        "y12s1-rfreq-i5",
        "A survey of 80 students found that 32 prefer sport to art. Find the probability that a randomly selected student prefers sport, using relative frequency as an estimate.",
        "\\frac{32}{80}",
        "0.4",
        ["2/5", "40%", "32/80"],
        "Estimate probability using relative frequency = frequency / total.",
        "P(sport) ≈ 32/80 = 0.4."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Writing P(not A) = 1 + P(A) instead of 1 − P(A).",
        fix: "The complement formula subtracts: P(not A) = 1 − P(A). The two probabilities must sum to 1.",
      },
      {
        mistake: "Confusing relative frequency with expected frequency.",
        fix: "Relative frequency = frequency / total (a proportion). Expected frequency = n × p (a count of how many times we expect the event to occur).",
      },
      {
        mistake: "Using relative frequency from a small sample as if it is exact.",
        fix: "Relative frequency is an estimate of the true probability. More trials give a better estimate, but it is still an estimate and may differ from the theoretical value.",
      },
    ],
    masteryQuiz: [
      freqAnswer(
        "y12s1-rfreq-m1",
        "The probability of drawing a heart from a standard deck is 1/4. Find the probability of not drawing a heart.",
        "P(\\text{not heart}) = 1 - \\frac{1}{4}",
        "3/4",
        ["0.75", "75%"],
        "P(not A) = 1 − P(A).",
        "P(not heart) = 1 − 1/4 = 3/4."
      ),
      freqAnswer(
        "y12s1-rfreq-m2",
        "A bag has 3 blue, 5 red and 2 green counters. Find the relative frequency of a green counter being selected.",
        "\\text{relative frequency} = \\frac{2}{10}",
        "0.2",
        ["1/5", "20%", "2/10"],
        "Relative frequency = frequency / total. Total = 3 + 5 + 2 = 10.",
        "Relative frequency = 2/10 = 0.2."
      ),
      freqAnswer(
        "y12s1-rfreq-m3",
        "A biased die shows a 4 with probability 0.15. In 400 rolls, find the expected frequency of rolling a 4.",
        "400 \\times 0.15",
        "60",
        ["60 times"],
        "Expected frequency = n × p.",
        "Expected frequency = 400 × 0.15 = 60."
      ),
      freqChoice(
        "y12s1-rfreq-m4",
        "P(A) = 0.6. Which of the following is P(not A)?",
        "B",
        ["0.6", "0.4", "1.6", "0.06"],
        "P(not A) = 1 − P(A).",
        "P(not A) = 1 − 0.6 = 0.4."
      ),
      freqAnswer(
        "y12s1-rfreq-m5",
        "A survey of 250 shoppers found that 75 bought a coffee. Use relative frequency to estimate the probability that the next shopper buys a coffee.",
        "\\frac{75}{250}",
        "0.3",
        ["3/10", "30%"],
        "P ≈ relative frequency = 75/250.",
        "Relative frequency = 75/250 = 0.3. Estimated probability ≈ 0.3."
      ),
      freqAnswer(
        "y12s1-rfreq-m6",
        "A game gives a prize with probability 0.04. Mia plays the game 300 times. How many prizes should she expect to win?",
        "300 \\times 0.04",
        "12",
        ["12 prizes", "12 times"],
        "Expected frequency = n × p.",
        "Expected frequency = 300 × 0.04 = 12."
      ),
      freqChoice(
        "y12s1-rfreq-m7",
        "In 60 tosses of a fair coin, tails appeared 28 times. What is the relative frequency of tails?",
        "A",
        ["28/60 ≈ 0.467", "32/60 ≈ 0.533", "0.5", "28"],
        "Relative frequency = frequency / total tosses.",
        "Relative frequency of tails = 28/60 ≈ 0.467. This is close to, but not exactly equal to, the theoretical probability of 0.5."
      ),
      freqAnswer(
        "y12s1-rfreq-m8",
        "P(event B) = 0.35. Find P(not B).",
        "P(\\text{not }B) = 1 - 0.35",
        "0.65",
        ["65%", "65/100"],
        "P(not B) = 1 − P(B).",
        "P(not B) = 1 − 0.35 = 0.65."
      ),
      freqAnswer(
        "y12s1-rfreq-m9",
        "A spinner has P(red) = 0.25 and P(blue) = 0.35. Find P(not red and not blue).",
        "P(\\text{not red and not blue}) = 1 - (0.25 + 0.35)",
        "0.4",
        ["40%", "2/5"],
        "The probability of red or blue is 0.25 + 0.35 = 0.60. The complement of (red or blue) is neither.",
        "P(red or blue) = 0.25 + 0.35 = 0.60. P(neither) = 1 − 0.60 = 0.40."
      ),
      freqChoice(
        "y12s1-rfreq-m10",
        "A die is rolled 600 times. P(even) = 0.5. Which is the best estimate for the expected frequency of rolling an even number?",
        "C",
        ["100", "200", "300", "600"],
        "Expected frequency = n × p.",
        "Expected frequency = 600 × 0.5 = 300."
      ),
    ],
  };
}

// ─── Algebraic Relationships Exam Practice ────────────────────────────────────

function algExChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function algExAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1AlgebraicRelationshipsExamPracticeLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "algebraic-relationships" ||
    lesson.slug !== "algebraic-relationships-exam-practice"
  ) {
    return null;
  }

  return {
    description:
      "Practise exam-style questions across linear modelling, quadratic graphs, simultaneous equations, and contextual algebra.",
    learningIntention:
      "Apply linear, quadratic, and simultaneous equation skills to exam-style questions in practical contexts.",
    successCriteria: [
      "Find the equation of a line and use it to make predictions.",
      "Identify key features of a quadratic graph from its equation.",
      "Solve simultaneous equations and interpret the solution in context.",
      "Recognise which algebraic method is required from the structure of the question.",
    ],
    teaching: {
      paragraphs: [
        "Algebraic relationships exam questions mix linear models, quadratic graphs, and simultaneous equations. The first step is identifying which type of relationship is being described.",
        "Linear clues: a constant rate of change, the phrase 'per unit', fixed + variable cost, or an equation of the form y = mx + b.",
        "Quadratic clues: the phrase 'parabola', 'maximum height', 'minimum cost', the variable appears squared, or a word like 'projectile'.",
        "Simultaneous equation clues: two plans, two options, 'break-even', 'when do they cost the same', or 'which is cheaper for n units'.",
        "Always read what the question is asking: the equation, a value, a feature (gradient, vertex), or an interpretation.",
      ],
      latexBlocks: [
        "\\text{Linear: } y = mx + b",
        "\\text{Quadratic: } y = ax^2 + bx + c",
        "\\text{Simultaneous: set } y_1 = y_2 \\text{ and solve}",
      ],
    },
    workedExamples: [
      {
        title: "Identify and solve: which model type?",
        questionLatex:
          "\\text{Company A charges \\$20 + \\$0.30/km. Company B charges \\$0.50/km. At what distance are they equal, and which is cheaper for a 90 km trip?}",
        steps: [
          {
            explanation:
              "This is a simultaneous equations problem. Write models for each company.",
            latex:
              "C_A = 0.30k + 20,\\quad C_B = 0.50k",
          },
          {
            explanation: "Set equal and solve.",
            latex:
              "0.30k + 20 = 0.50k \\Rightarrow 20 = 0.20k \\Rightarrow k = 100",
          },
          {
            explanation:
              "At 90 km (less than 100 km): $C_A = 0.30(90) + 20 = 47$ dollars. $C_B = 0.50(90) = 45$ dollars. Company B is cheaper.",
            latex:
              "C_A = \\$47,\\quad C_B = \\$45 \\Rightarrow \\text{B is cheaper at 90 km}",
          },
        ],
        finalAnswerLatex:
          "\\text{Equal at } k = 100\\text{ km. Company B is cheaper for a 90 km trip.}",
      },
    ],
    guidedPractice: [
      algExAnswer(
        "y12s1-algex-g1",
        "A linear model is C = 5n + 80. Find C when n = 12.",
        "C = 5(12) + 80",
        "140",
        ["$140", "140.0"],
        "Substitute n = 12 into C = 5n + 80.",
        "C = 5 × 12 + 80 = 60 + 80 = 140."
      ),
      algExChoice(
        "y12s1-algex-g2",
        "The quadratic y = −2x² + 8x − 3 opens in which direction and has what type of vertex?",
        "B",
        [
          "Upward, minimum vertex.",
          "Downward, maximum vertex — because a = −2 < 0.",
          "Upward, maximum vertex.",
          "Downward, minimum vertex.",
        ],
        "The sign of a (coefficient of x²) determines concavity.",
        "a = −2 < 0 → parabola opens downward → vertex is a maximum."
      ),
      algExAnswer(
        "y12s1-algex-g3",
        "Solve the simultaneous equations y = 3x − 1 and y = x + 7.",
        "3x - 1 = x + 7",
        "x = 4, y = 11",
        ["(4, 11)", "x=4 y=11"],
        "Set 3x − 1 = x + 7 and solve.",
        "3x − 1 = x + 7 → 2x = 8 → x = 4. y = 3(4) − 1 = 11."
      ),
      algExAnswer(
        "y12s1-algex-g4",
        "A line passes through (0, 5) and (4, 13). Find its equation.",
        "m = \\frac{13-5}{4-0} = 2,\\quad b = 5",
        "y = 2x + 5",
        ["y=2x+5", "2x+5"],
        "Find gradient first, then read y-intercept from (0, 5).",
        "m = (13−5)/(4−0) = 2. b = 5 (y-intercept). Equation: y = 2x + 5."
      ),
    ],
    independentPractice: [
      algExAnswer(
        "y12s1-algex-i1",
        "A parking station charges $3 entry plus $2 per hour. Write a linear model for cost C after h hours and find the cost for 4.5 hours.",
        "C = 2(4.5) + 3",
        "12",
        ["$12", "12.00"],
        "C = 2h + 3. Substitute h = 4.5.",
        "C = 2 × 4.5 + 3 = 9 + 3 = 12."
      ),
      algExChoice(
        "y12s1-algex-i2",
        "A parabola has x-intercepts at x = 1 and x = 7, opens upward. What is the x-coordinate of the vertex?",
        "C",
        [
          "x = 1",
          "x = 7",
          "x = 4 (midpoint of the x-intercepts)",
          "x = 0",
        ],
        "The vertex lies on the axis of symmetry, which is the midpoint of the two x-intercepts.",
        "Axis of symmetry = (1 + 7)/2 = 4. The vertex has x-coordinate 4."
      ),
      algExAnswer(
        "y12s1-algex-i3",
        "Plan A: C = $0.25 per text + $15/month. Plan B: C = $0.10 per text + $30/month. At how many texts per month are the plans equal?",
        "0.25n + 15 = 0.10n + 30",
        "100",
        ["n = 100", "100 texts"],
        "Set C_A = C_B and solve for n.",
        "0.25n + 15 = 0.10n + 30 → 0.15n = 15 → n = 100."
      ),
      algExAnswer(
        "y12s1-algex-i4",
        "Find the gradient of the line through (2, 9) and (6, 21).",
        "m = \\frac{21-9}{6-2}",
        "3",
        ["m = 3", "3.0"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (21−9)/(6−2) = 12/4 = 3."
      ),
      algExChoice(
        "y12s1-algex-i5",
        "A profit model is P = −n² + 12n − 20. At the vertex, what does the x-coordinate represent?",
        "A",
        [
          "The number of items that maximises profit.",
          "The maximum profit in dollars.",
          "The break-even number of items.",
          "The y-intercept of the model.",
        ],
        "For a downward parabola, the vertex gives the maximum. The x-coordinate is the input (n).",
        "The vertex x-coordinate gives the value of n (items) at which profit is greatest. The y-coordinate gives the maximum profit amount."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Treating every algebra problem as a linear model without checking for x² terms.",
        fix: "Always scan the equation for an x² term. If present, it's quadratic. If two equations appear and you need where they're equal, it's simultaneous.",
      },
      {
        mistake: "Finding the y-value of the vertex from the equation by substituting the axis of symmetry x-value, but substituting into the wrong equation.",
        fix: "Substitute the vertex x-coordinate back into the ORIGINAL equation to find the corresponding y-value.",
      },
    ],
    masteryQuiz: [
      algExAnswer(
        "y12s1-algex-m1",
        "A linear model is T = 6h + 25. Find h when T = 73.",
        "6h + 25 = 73 \\Rightarrow 6h = 48",
        "8",
        ["h = 8", "8 hours"],
        "Set T = 73 and solve for h.",
        "6h = 73 − 25 = 48 → h = 8."
      ),
      algExChoice(
        "y12s1-algex-m2",
        "Find the y-intercept of y = −3x² + 5x + 11.",
        "D",
        [
          "y = −3",
          "y = 5",
          "y = 0",
          "y = 11",
        ],
        "Substitute x = 0.",
        "y = −3(0)² + 5(0) + 11 = 11."
      ),
      algExAnswer(
        "y12s1-algex-m3",
        "Solve y = 5x + 4 and y = 2x + 16.",
        "5x + 4 = 2x + 16",
        "x = 4, y = 24",
        ["(4, 24)", "x=4 y=24"],
        "Set equal and solve.",
        "5x + 4 = 2x + 16 → 3x = 12 → x = 4. y = 5(4) + 4 = 24."
      ),
      algExAnswer(
        "y12s1-algex-m4",
        "A line has gradient −3 and passes through (2, 7). Find its equation.",
        "7 = -3(2) + b \\Rightarrow b = 13",
        "y = -3x + 13",
        ["y=−3x+13", "−3x+13"],
        "Substitute m = −3 and (2, 7) into y = mx + b.",
        "7 = −3(2) + b → 7 = −6 + b → b = 13. Equation: y = −3x + 13."
      ),
      algExChoice(
        "y12s1-algex-m5",
        "A ball's height is h = −5t² + 20t. The x-intercepts are t = 0 and t = 4. At what time does the ball reach maximum height?",
        "B",
        [
          "t = 0 seconds.",
          "t = 2 seconds — the midpoint of the x-intercepts gives the axis of symmetry.",
          "t = 4 seconds.",
          "t = 20 seconds.",
        ],
        "The axis of symmetry is the midpoint of the x-intercepts.",
        "Axis: t = (0 + 4)/2 = 2 seconds. This is when the ball is at its highest point."
      ),
      algExAnswer(
        "y12s1-algex-m6",
        "Revenue R = 80n and Cost C = 50n + 450. Find the break-even quantity n.",
        "80n = 50n + 450",
        "15",
        ["n = 15", "15 units"],
        "Set R = C and solve.",
        "80n = 50n + 450 → 30n = 450 → n = 15."
      ),
      algExChoice(
        "y12s1-algex-m7",
        "A linear model T = 12d − 4 has gradient 12. In a hiring cost context where T = total cost and d = days, what does 12 represent?",
        "A",
        [
          "The daily hire rate — cost increases by $12 per day.",
          "The total cost after 12 days.",
          "The fixed starting charge.",
          "The discount rate per day.",
        ],
        "In T = md + b, the gradient m is the rate of change — cost per day.",
        "The gradient 12 is the cost per day ($12/day). The constant −4 would be the fixed component (though a negative fixed cost is unusual in context)."
      ),
      algExAnswer(
        "y12s1-algex-m8",
        "A parabola has x-intercepts at x = −1 and x = 9. What is the equation of the axis of symmetry?",
        "x = \\frac{-1 + 9}{2}",
        "x = 4",
        ["4", "x=4"],
        "Axis = midpoint of x-intercepts.",
        "x = (−1 + 9)/2 = 8/2 = 4."
      ),
      algExChoice(
        "y12s1-algex-m9",
        "Option 1: 8n + 200 = total cost. Option 2: 12n + 80 = total cost. For fewer than 30 items, which option is cheaper?",
        "B",
        [
          "Option 1 — lower rate per item.",
          "Option 2 — for fewer than 30 items the lower fixed cost wins: 12(29) + 80 = $428 vs 8(29) + 200 = $432.",
          "Both cost the same for any n.",
          "Option 1 — its gradient is smaller.",
        ],
        "Find break-even: 8n + 200 = 12n + 80 → n = 30. For n < 30 which is cheaper?",
        "Break-even at n = 30. For n < 30: Option 2 starts cheaper (lower fixed cost). For n > 30: Option 1 is cheaper (lower rate). At n = 29: Option 1 = 432, Option 2 = 428 → Option 2 cheaper."
      ),
      algExAnswer(
        "y12s1-algex-m10",
        "The height of a projectile is h = −4t² + 16t + 5. Find the height at t = 0 and state what this represents.",
        "h = -4(0)^2 + 16(0) + 5",
        "5",
        ["5 metres", "h = 5", "5 m"],
        "Substitute t = 0.",
        "h = −4(0)² + 16(0) + 5 = 5. This is the initial height when launched — 5 metres above the ground."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Linear Relationships and Modelling ──────────────────────────────────────

function linModChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function linModAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1LinearRelationshipsModellingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "algebraic-relationships" ||
    lesson.slug !== "linear-relationships-modelling"
  ) {
    return null;
  }

  return {
    description:
      "Find the equation of a linear model from a graph or two points, make predictions by substitution, and interpret linear models in practical contexts.",
    learningIntention:
      "Find the equation of a straight line and use it as a practical model to make predictions.",
    successCriteria: [
      "Find the gradient of a line using m = (y₂ − y₁)/(x₂ − x₁).",
      "Find the equation y = mx + b using the gradient and a known point.",
      "Read the gradient and y-intercept from a graph and write the equation.",
      "Use a linear model to predict a value by substituting into the equation.",
      "Interpret the gradient and y-intercept in a practical context.",
    ],
    teaching: {
      paragraphs: [
        "The equation of a straight line is y = mx + b, where m is the gradient (slope) and b is the y-intercept (the value of y when x = 0). The gradient measures the rate of change — how much y increases for each unit increase in x.",
        "To find the gradient from two points (x₁, y₁) and (x₂, y₂): m = (y₂ − y₁) / (x₂ − x₁). To find the y-intercept, substitute m and one known point into y = mx + b and solve for b.",
        "To read a graph: identify where the line crosses the y-axis (that's b), then count vertical rise over horizontal run between two clear points to find m.",
        "Practical models: in a phone plan where a fixed monthly fee is $20 and calls cost $0.50 per minute, the total cost is C = 0.50m + 20. The gradient ($0.50) is the rate per minute; the y-intercept ($20) is the fixed cost. Substituting m = 40 gives C = 0.50(40) + 20 = $40.",
        "Interpolation means predicting within the range of the data — these predictions are reliable. Extrapolation means predicting beyond the data — these are less reliable because the pattern may not continue.",
      ],
      latexBlocks: [
        "m = \\frac{y_2 - y_1}{x_2 - x_1}",
        "y = mx + b",
        "\\text{Substitute } x \\text{ to find } y, \\text{ or } y \\text{ to find } x.",
      ],
    },
    workedExamples: [
      {
        title: "Find the equation from two points",
        questionLatex:
          "\\text{A line passes through (2, 7) and (6, 19). Find its equation.}",
        steps: [
          {
            explanation: "Find the gradient.",
            latex:
              "m = \\frac{19 - 7}{6 - 2} = \\frac{12}{4} = 3",
          },
          {
            explanation:
              "Substitute m = 3 and point (2, 7) into y = mx + b to find b.",
            latex:
              "7 = 3(2) + b \\Rightarrow b = 7 - 6 = 1",
          },
          {
            explanation: "Write the equation.",
            latex: "y = 3x + 1",
          },
        ],
        finalAnswerLatex: "y = 3x + 1",
      },
      {
        title: "Use a linear model to make a prediction",
        questionLatex:
          "\\text{A taxi charges a \\$3 flag fall plus \\$2.50 per km. Write a model and find the cost for a 12 km trip.}",
        steps: [
          {
            explanation:
              "Let C = total cost (dollars), d = distance (km). The flag fall is the y-intercept; the rate per km is the gradient.",
            latex: "C = 2.50d + 3",
          },
          {
            explanation: "Substitute d = 12.",
            latex: "C = 2.50 \\times 12 + 3 = 30 + 3 = 33",
          },
        ],
        finalAnswerLatex: "C = \\$33",
      },
    ],
    guidedPractice: [
      linModAnswer(
        "y12s1-linmod-g1",
        "Find the gradient of the line passing through (1, 4) and (5, 16).",
        "m = \\frac{16 - 4}{5 - 1}",
        "3",
        ["m = 3", "3.0"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (16 − 4) / (5 − 1) = 12 / 4 = 3."
      ),
      linModAnswer(
        "y12s1-linmod-g2",
        "A line has gradient 4 and passes through (3, 10). Find the y-intercept.",
        "10 = 4(3) + b",
        "-2",
        ["b = -2", "−2"],
        "Substitute m = 4 and (3, 10) into y = mx + b. Solve for b.",
        "10 = 4(3) + b → 10 = 12 + b → b = −2."
      ),
      linModAnswer(
        "y12s1-linmod-g3",
        "A plumber charges a $60 call-out fee plus $80 per hour. Write a linear model C = mh + b, then find the cost for 3 hours.",
        "C = 80(3) + 60",
        "300",
        ["$300", "300.00"],
        "m = 80 (hourly rate), b = 60 (fixed fee). Substitute h = 3.",
        "C = 80 × 3 + 60 = 240 + 60 = 300."
      ),
      linModChoice(
        "y12s1-linmod-g4",
        "A line graph of electricity cost ($) versus units used passes through (0, 40) and (100, 90). What is the cost per unit (gradient)?",
        "B",
        [
          "$0.40 per unit.",
          "$0.50 per unit.",
          "$40 per unit.",
          "$90 per unit.",
        ],
        "Gradient = rise / run = (90 − 40) / (100 − 0).",
        "m = (90 − 40) / (100 − 0) = 50 / 100 = 0.50. The cost per unit is $0.50."
      ),
    ],
    independentPractice: [
      linModAnswer(
        "y12s1-linmod-i1",
        "Find the equation of the line passing through (2, 5) and (8, 17).",
        "m = \\frac{17-5}{8-2} = 2,\\quad b = 5 - 2(2)",
        "y = 2x + 1",
        ["y=2x+1", "2x+1"],
        "Find m first, then use one point to find b.",
        "m = (17−5)/(8−2) = 12/6 = 2. Using (2, 5): 5 = 2(2) + b → b = 1. Equation: y = 2x + 1."
      ),
      linModAnswer(
        "y12s1-linmod-i2",
        "A gym membership costs $50 to join and $30 per month. Write a model for total cost C after m months, then find the cost after 8 months.",
        "C = 30(8) + 50",
        "290",
        ["$290", "290.00"],
        "C = 30m + 50. Substitute m = 8.",
        "C = 30 × 8 + 50 = 240 + 50 = 290."
      ),
      linModAnswer(
        "y12s1-linmod-i3",
        "A line passes through (0, −3) and (4, 9). Find the gradient and write the equation.",
        "m = \\frac{9-(-3)}{4-0} = 3,\\quad b = -3",
        "y = 3x - 3",
        ["y=3x-3", "3x−3"],
        "The y-intercept is the y-value when x = 0. Find m from the two points.",
        "m = (9−(−3))/(4−0) = 12/4 = 3. b = −3 (y-intercept from point (0, −3)). Equation: y = 3x − 3."
      ),
      linModChoice(
        "y12s1-linmod-i4",
        "The linear model C = 0.25n + 15 represents a mobile phone plan where n is the number of messages sent. What does the 15 represent?",
        "A",
        [
          "A fixed monthly charge of $15, regardless of the number of messages.",
          "The cost per message is $15.",
          "The total cost after sending 15 messages.",
          "The number of free messages included in the plan.",
        ],
        "The 15 is the constant term in y = mx + b. What does the constant (y-intercept) represent?",
        "In C = 0.25n + 15, the constant 15 is the y-intercept — the cost when n = 0 messages are sent. This is the fixed monthly fee."
      ),
      linModChoice(
        "y12s1-linmod-i5",
        "A linear model is built from data in the range x = 0 to x = 20. A prediction is made at x = 50. What is this called and how reliable is it?",
        "B",
        [
          "Interpolation — reliable because it uses the model.",
          "Extrapolation — less reliable because x = 50 is outside the data range and the linear pattern may not continue.",
          "Interpolation — less reliable because x is close to 0.",
          "Extrapolation — reliable because the model is linear.",
        ],
        "Is x = 50 inside or outside the data range 0 to 20?",
        "x = 50 is outside the data range. This is extrapolation. It is less reliable because we cannot be sure the linear pattern continues beyond the data."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Calculating gradient as (x₂ − x₁) / (y₂ − y₁) instead of (y₂ − y₁) / (x₂ − x₁).",
        fix: "Gradient is always rise over run: m = (change in y) / (change in x). Divide the y-difference by the x-difference, not the other way around.",
      },
      {
        mistake: "Forgetting to find b and just using m as the equation.",
        fix: "After finding m, always substitute m and one known point (x, y) into y = mx + b to solve for b. The full equation needs both m and b.",
      },
      {
        mistake: "Using m as a dollar amount per unit when the context uses a different unit.",
        fix: "Always check the units of x and y. The gradient has units of (y-units) per (x-unit), e.g. $/km or $/hour.",
      },
    ],
    masteryQuiz: [
      linModAnswer(
        "y12s1-linmod-m1",
        "Find the gradient of the line through (3, 1) and (7, 13).",
        "m = \\frac{13-1}{7-3}",
        "3",
        ["m = 3"],
        "m = (y₂ − y₁) / (x₂ − x₁).",
        "m = (13−1)/(7−3) = 12/4 = 3."
      ),
      linModAnswer(
        "y12s1-linmod-m2",
        "A line has gradient −2 and passes through (4, 6). Find its equation.",
        "6 = -2(4) + b \\Rightarrow b = 14",
        "y = -2x + 14",
        ["y=−2x+14", "−2x+14"],
        "Substitute m = −2 and (4, 6) into y = mx + b.",
        "6 = −2(4) + b → 6 = −8 + b → b = 14. Equation: y = −2x + 14."
      ),
      linModAnswer(
        "y12s1-linmod-m3",
        "A car rental company charges $45 per day plus a $25 insurance fee. Write a model for total cost T after d days, then find the cost for 7 days.",
        "T = 45(7) + 25",
        "340",
        ["$340", "340.00"],
        "T = 45d + 25. Substitute d = 7.",
        "T = 45 × 7 + 25 = 315 + 25 = 340."
      ),
      linModAnswer(
        "y12s1-linmod-m4",
        "A straight-line graph passes through (0, 8) and (5, 23). Find the equation.",
        "m = \\frac{23-8}{5-0} = 3,\\quad b = 8",
        "y = 3x + 8",
        ["y=3x+8", "3x+8"],
        "The y-intercept is 8 (from (0, 8)). Find m from the two points.",
        "m = (23−8)/(5−0) = 15/5 = 3. b = 8. Equation: y = 3x + 8."
      ),
      linModChoice(
        "y12s1-linmod-m5",
        "In the linear model P = 12n − 40, what value of n makes P = 0?",
        "C",
        [
          "n = 40",
          "n = 3",
          "n = 3.33 (to 2 d.p.)",
          "n = −40",
        ],
        "Set P = 0 and solve for n: 0 = 12n − 40.",
        "0 = 12n − 40 → 12n = 40 → n = 40/12 = 3.33 (to 2 d.p.)."
      ),
      linModAnswer(
        "y12s1-linmod-m6",
        "A savings model shows Sarah has $200 saved and adds $50 each week. Write the model and find when her savings first exceed $800.",
        "200 + 50w > 800 \\Rightarrow w > 12",
        "13",
        ["13 weeks", "week 13"],
        "S = 50w + 200. Solve 50w + 200 > 800.",
        "50w > 600 → w > 12. After 13 complete weeks her savings exceed $800."
      ),
      linModAnswer(
        "y12s1-linmod-m7",
        "Two points on a graph are (1, 5) and (4, 14). Find the value of y when x = 10.",
        "y = 3(10) + 2",
        "32",
        ["y = 32", "32.0"],
        "Find the equation first: m = (14−5)/(4−1) = 3, then b.",
        "m = 9/3 = 3. Using (1, 5): 5 = 3(1) + b → b = 2. Equation: y = 3x + 2. At x = 10: y = 32."
      ),
      linModChoice(
        "y12s1-linmod-m8",
        "A linear model for company profit is P = 500u − 8000, where u is units sold. What is the minimum number of units needed to make a profit (P > 0)?",
        "B",
        [
          "15 units.",
          "17 units (since 500 × 16 = 8000 gives P = 0, so need at least 17).",
          "8000 units.",
          "500 units.",
        ],
        "Set P > 0: 500u − 8000 > 0. Solve for u.",
        "500u > 8000 → u > 16. The company needs at least 17 units to make a positive profit."
      ),
      linModAnswer(
        "y12s1-linmod-m9",
        "The cost of hiring a hall is modelled by C = 30n + 150, where n is the number of hours. Find the gradient and explain its meaning.",
        "m = 30",
        "30",
        ["$30", "30 per hour", "m = 30"],
        "Identify the coefficient of n in C = 30n + 150.",
        "The gradient is 30. It means the cost increases by $30 for each additional hour of hire."
      ),
      linModChoice(
        "y12s1-linmod-m10",
        "A linear model is C = 4.5k + 12, where C is cost and k is kilometres. Which statement is correct?",
        "A",
        [
          "The gradient $4.50/km is the cost per kilometre and $12 is the fixed starting cost.",
          "The gradient is $12 and the per-km cost is $4.50.",
          "$12 is the total cost for 4.5 km.",
          "The cost starts at $4.50 and increases by $12 each km.",
        ],
        "In y = mx + b: m is the gradient (per unit cost) and b is the starting value (fixed cost).",
        "In C = 4.5k + 12: the gradient 4.5 is the cost per km ($4.50/km) and the constant 12 is the fixed (starting) cost of $12."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Quadratic Models ─────────────────────────────────────────────────────────

function quadChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function quadAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1QuadraticModelsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "algebraic-relationships" ||
    lesson.slug !== "quadratic-models"
  ) {
    return null;
  }

  return {
    description:
      "Recognise quadratic models from their equation or graph, identify key features (vertex, axis of symmetry, intercepts, concavity), and apply to practical contexts.",
    learningIntention:
      "Identify and interpret the key features of quadratic models in practical and graphical contexts.",
    successCriteria: [
      "Recognise y = ax² + bx + c as a quadratic relationship with a parabolic graph.",
      "Determine concavity: opens upward when a > 0, downward when a < 0.",
      "Read or calculate the y-intercept by substituting x = 0.",
      "Read the x-intercepts (zeros) from a graph or given factored form.",
      "Identify the axis of symmetry and estimate or calculate the vertex.",
      "Apply domain restrictions to a practical quadratic model.",
    ],
    teaching: {
      paragraphs: [
        "A quadratic model has the form y = ax² + bx + c, where a ≠ 0. Its graph is a parabola. When a > 0, the parabola opens upward (U-shape) and has a minimum vertex. When a < 0, it opens downward (∩-shape) and has a maximum vertex.",
        "Key features of a parabola: the y-intercept is found by substituting x = 0, giving y = c. The x-intercepts (zeros) are where y = 0 and can be read from a graph. The axis of symmetry is the vertical line x = (x₁ + x₂)/2 where x₁ and x₂ are the x-intercepts. The vertex (turning point) lies on the axis of symmetry.",
        "Practical quadratic models have domain restrictions. For example, a model for the height h(t) of a ball at time t only makes sense while the ball is in the air (h ≥ 0 and t ≥ 0).",
        "The vertex gives the maximum or minimum value. In a profit model P = −2n² + 40n − 100, the vertex gives the number of items n that maximises profit.",
      ],
      latexBlocks: [
        "y = ax^2 + bx + c \\quad (a \\neq 0)",
        "\\text{y-intercept: substitute } x = 0 \\Rightarrow y = c",
        "\\text{Axis of symmetry: } x = \\frac{x_1 + x_2}{2}",
        "\\text{Opens up if } a > 0,\\quad \\text{opens down if } a < 0",
      ],
    },
    workedExamples: [
      {
        title: "Identify features from equation",
        questionLatex:
          "\\text{For } y = -2x^2 + 8x - 3 \\text{, state the concavity and find the y-intercept.}",
        steps: [
          {
            explanation:
              "The coefficient of x² is a = −2. Since a < 0, the parabola opens downward (maximum vertex).",
          },
          {
            explanation: "Find the y-intercept by substituting x = 0.",
            latex: "y = -2(0)^2 + 8(0) - 3 = -3",
          },
        ],
        finalAnswerLatex:
          "\\text{Opens downward; y-intercept is } (0, -3).",
      },
      {
        title: "Find the axis of symmetry from x-intercepts",
        questionLatex:
          "\\text{A parabola has x-intercepts at } x = 1 \\text{ and } x = 7. \\text{ Find the axis of symmetry.}",
        steps: [
          {
            explanation:
              "The axis of symmetry is the midpoint of the x-intercepts.",
            latex: "x = \\frac{1 + 7}{2} = \\frac{8}{2} = 4",
          },
        ],
        finalAnswerLatex: "x = 4",
      },
    ],
    guidedPractice: [
      quadChoice(
        "y12s1-quad-g1",
        "For the quadratic model y = 3x² − 6x + 1, which direction does the parabola open?",
        "A",
        [
          "Upward — because the coefficient of x² is positive (a = 3 > 0).",
          "Downward — because the coefficient of x is negative.",
          "Left — because the equation contains x².",
          "Downward — because c = 1 is positive.",
        ],
        "Look at the sign of the coefficient of x².",
        "a = 3 > 0, so the parabola opens upward and has a minimum vertex."
      ),
      quadAnswer(
        "y12s1-quad-g2",
        "Find the y-intercept of the quadratic model y = 2x² − 5x + 4.",
        "y = 2(0)^2 - 5(0) + 4",
        "4",
        ["(0, 4)", "y = 4"],
        "Substitute x = 0 into the equation.",
        "y = 2(0)² − 5(0) + 4 = 4. The y-intercept is 4."
      ),
      quadAnswer(
        "y12s1-quad-g3",
        "A parabola has x-intercepts at x = −1 and x = 5. Find the axis of symmetry.",
        "x = \\frac{-1 + 5}{2}",
        "x = 2",
        ["2", "x=2"],
        "Axis of symmetry = midpoint of the two x-intercepts.",
        "x = (−1 + 5) / 2 = 4 / 2 = 2."
      ),
      quadChoice(
        "y12s1-quad-g4",
        "The height (in metres) of a ball thrown upward is modelled by h = −5t² + 20t. What does h = 0 represent in context?",
        "B",
        [
          "The maximum height of the ball.",
          "The times when the ball is on the ground (launched and landed).",
          "The time taken to reach maximum height.",
          "The initial speed of the ball.",
        ],
        "h = 0 means height equals zero — what does height zero mean?",
        "h = 0 gives the times when the ball is at ground level: at launch (t = 0) and when it lands. In context, t = 0 (just launched) and the other solution (when it returns to ground)."
      ),
    ],
    independentPractice: [
      quadChoice(
        "y12s1-quad-i1",
        "Which of the following is NOT a quadratic model?",
        "C",
        [
          "y = x² + 3x − 2",
          "y = −4x² + 1",
          "y = 3x + 7",
          "y = 2x² − x",
        ],
        "A quadratic model must contain an x² term.",
        "y = 3x + 7 has no x² term — it is a linear model. All others contain x² and are quadratic."
      ),
      quadAnswer(
        "y12s1-quad-i2",
        "Find the y-intercept of the quadratic y = −3x² + 7x − 5.",
        "y = -3(0)^2 + 7(0) - 5",
        "-5",
        ["(0, -5)", "y = -5", "−5"],
        "Substitute x = 0.",
        "y = −3(0)² + 7(0) − 5 = −5. The y-intercept is −5."
      ),
      quadAnswer(
        "y12s1-quad-i3",
        "A parabola crosses the x-axis at x = 2 and x = 8. Find the x-coordinate of the vertex.",
        "x = \\frac{2 + 8}{2}",
        "5",
        ["x = 5"],
        "Axis of symmetry = midpoint of the two x-intercepts. Vertex is on this axis.",
        "Axis of symmetry: x = (2 + 8)/2 = 5. The vertex has x-coordinate 5."
      ),
      quadChoice(
        "y12s1-quad-i4",
        "A profit model is P = −n² + 10n − 16, where n is the number of items sold. Which statement about the vertex is correct?",
        "A",
        [
          "The vertex gives the number of items that produces the maximum profit, because the parabola opens downward (a = −1 < 0).",
          "The vertex gives the minimum profit because the parabola opens upward.",
          "The vertex is the y-intercept of the model.",
          "The x-intercepts give the maximum profit.",
        ],
        "What does a < 0 tell you about the vertex of a downward parabola?",
        "Since a = −1 < 0, the parabola opens downward, giving a maximum at the vertex. The vertex shows the number of items n that maximises profit P."
      ),
      quadChoice(
        "y12s1-quad-i5",
        "The model h = −5t² + 30t gives the height of a rocket (m) at time t (seconds). What is a sensible domain restriction?",
        "B",
        [
          "All real values of t — the model is valid for any time.",
          "0 ≤ t ≤ 6 — the rocket is in the air from launch (t = 0) until it hits the ground (h = 0 at t = 6).",
          "t ≥ 6 — the model only applies after landing.",
          "−3 ≤ t ≤ 3 — the model is symmetric.",
        ],
        "The rocket is only in the air for a finite time. When does it launch and land?",
        "The rocket launches at t = 0 and lands when h = 0: −5t² + 30t = 0 → t(−5t + 30) = 0 → t = 0 or t = 6. The domain is 0 ≤ t ≤ 6."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Saying the parabola opens downward because the c-value is negative.",
        fix: "Concavity is determined by the sign of a (the coefficient of x²), not c. If a > 0 → opens up; if a < 0 → opens down.",
      },
      {
        mistake: "Finding the y-intercept by setting y = 0 (finding x-intercepts instead).",
        fix: "The y-intercept is found by substituting x = 0 into the equation. Setting y = 0 finds the x-intercepts.",
      },
      {
        mistake: "Using the full data range or extreme values when estimating the vertex position.",
        fix: "The vertex x-coordinate is the midpoint of the two x-intercepts: x = (x₁ + x₂)/2. Then substitute this x back to find the y-coordinate.",
      },
    ],
    masteryQuiz: [
      quadChoice(
        "y12s1-quad-m1",
        "The model y = −x² + 6x + 7 opens in which direction and has what y-intercept?",
        "B",
        [
          "Upward, y-intercept = 7.",
          "Downward (a = −1 < 0), y-intercept = 7.",
          "Downward, y-intercept = 6.",
          "Upward, y-intercept = −1.",
        ],
        "a = −1: opens down. Substitute x = 0 for y-intercept.",
        "a = −1 < 0 → opens downward. y-intercept: y = −(0)² + 6(0) + 7 = 7."
      ),
      quadAnswer(
        "y12s1-quad-m2",
        "A quadratic model has x-intercepts at x = −2 and x = 6. Find the equation of the axis of symmetry.",
        "x = \\frac{-2 + 6}{2}",
        "x = 2",
        ["2", "x=2"],
        "Axis = midpoint of x-intercepts.",
        "x = (−2 + 6)/2 = 4/2 = 2."
      ),
      quadAnswer(
        "y12s1-quad-m3",
        "Find the y-intercept of y = 4x² − 3x + 9.",
        "y = 4(0)^2 - 3(0) + 9",
        "9",
        ["(0, 9)", "y = 9"],
        "Substitute x = 0.",
        "y = 4(0) − 3(0) + 9 = 9."
      ),
      quadChoice(
        "y12s1-quad-m4",
        "A ball's height is h = −4.9t² + 14.7t. At t = 0 the ball is at h = 0. When does it reach h = 0 again?",
        "C",
        [
          "t = 4.9 seconds.",
          "t = 14.7 seconds.",
          "t = 3 seconds (from −4.9t² + 14.7t = 0 → t(−4.9t + 14.7) = 0 → t = 14.7/4.9 = 3).",
          "t = 1 second.",
        ],
        "Set h = 0 and solve for the non-zero value of t.",
        "−4.9t² + 14.7t = 0 → t(−4.9t + 14.7) = 0 → t = 0 or t = 14.7/4.9 = 3. The ball is back on the ground at t = 3 seconds."
      ),
      quadAnswer(
        "y12s1-quad-m5",
        "A parabola has vertex at x = 5 and one x-intercept at x = 2. Find the other x-intercept.",
        "\\text{Other intercept} = 2 \\times 5 - 2",
        "8",
        ["x = 8"],
        "The vertex is the midpoint of the two x-intercepts. If midpoint = 5 and one intercept = 2, the other = 2 × 5 − 2.",
        "Midpoint = (2 + x₂)/2 = 5 → 2 + x₂ = 10 → x₂ = 8."
      ),
      quadChoice(
        "y12s1-quad-m6",
        "A profit model P = −2n² + 20n − 32 has x-intercepts at n = 2 and n = 8. In what practical range should n be considered?",
        "B",
        [
          "All positive values of n, since items sold must be positive.",
          "2 ≤ n ≤ 8 — this is where P ≥ 0 (the business is profitable).",
          "n ≥ 8 only.",
          "n ≤ 2 only.",
        ],
        "Where is P positive (profitable)? Between the two x-intercepts for a downward parabola.",
        "P ≥ 0 between the x-intercepts for a downward-opening parabola. The business makes a profit when 2 ≤ n ≤ 8."
      ),
      quadChoice(
        "y12s1-quad-m7",
        "The x-intercepts of y = ax² + bx + c are at x = 1 and x = 9, and the y-intercept is at y = 9. The parabola opens upward. Which description fits?",
        "A",
        [
          "The vertex is at x = 5 and represents a minimum value of the function.",
          "The vertex is at x = 5 and represents a maximum value.",
          "The vertex is at x = 9.",
          "The y-intercept is at x = 9.",
        ],
        "Opens upward → minimum vertex. Vertex x = midpoint of x-intercepts.",
        "Axis of symmetry: x = (1 + 9)/2 = 5. Opens upward (a > 0) so the vertex is a minimum."
      ),
      quadAnswer(
        "y12s1-quad-m8",
        "A quadratic model is y = x² − 4x + 3. Find the y-intercept and the two x-intercepts (given they are at x = 1 and x = 3).",
        "\\text{y-int: } y(0) = 3,\\quad \\text{x-ints: } x = 1 \\text{ and } x = 3",
        "y-intercept = 3",
        ["3", "(0,3)", "y = 3"],
        "y-intercept: substitute x = 0. x-intercepts are given as x = 1 and x = 3.",
        "y-intercept: y = (0)² − 4(0) + 3 = 3. x-intercepts: x = 1 and x = 3 (given)."
      ),
      quadChoice(
        "y12s1-quad-m9",
        "The quadratic y = −3x² + 12x − 9 has a = −3. What does this tell you about the vertex?",
        "B",
        [
          "The vertex is a minimum because a < 0.",
          "The vertex is a maximum because a < 0 (parabola opens downward).",
          "The vertex is at the y-intercept.",
          "The vertex cannot be determined from a alone.",
        ],
        "a < 0 → parabola opens downward → vertex is highest point.",
        "When a < 0, the parabola opens downward and the vertex is the highest point — a maximum."
      ),
      quadChoice(
        "y12s1-quad-m10",
        "A quadratic model h = −5t² + 20t + 1 gives the height (m) of an object. What is the height at t = 0?",
        "A",
        [
          "1 metre — the y-intercept when t = 0.",
          "20 metres — the coefficient of t.",
          "0 metres — the object starts on the ground.",
          "−5 metres — the coefficient of t².",
        ],
        "Substitute t = 0.",
        "h = −5(0)² + 20(0) + 1 = 1. At t = 0 the height is 1 metre."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Simultaneous Equations in Context ───────────────────────────────────────

function simChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function simAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1SimultaneousEquationsContextLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "algebraic-relationships" ||
    lesson.slug !== "simultaneous-equations-context"
  ) {
    return null;
  }

  return {
    description:
      "Solve pairs of linear equations by substitution or by reading intersection points, and interpret the solution in practical contexts such as break-even analysis.",
    learningIntention:
      "Solve simultaneous linear equations and interpret the point of intersection in practical contexts.",
    successCriteria: [
      "Recognise a simultaneous equations problem from two linear models.",
      "Solve simultaneous equations by substitution.",
      "Read the solution from a graph as the point of intersection of two lines.",
      "Interpret the point of intersection in a practical context (e.g. break-even, equal cost, best option).",
    ],
    teaching: {
      paragraphs: [
        "Simultaneous equations arise when two linear models describe the same situation and we need to find where they are equal. For example: two phone plans with different rates and fixed costs are equal at a particular number of minutes — this is found by solving simultaneously.",
        "Substitution method: if one equation has y isolated (e.g. y = 3x + 2), substitute this expression for y into the other equation. Solve the resulting single-variable equation for x, then back-substitute to find y.",
        "Graphical method: plot both lines on the same axes. The solution is the coordinates (x, y) of the intersection point — the x and y values that satisfy both equations at the same time.",
        "Interpreting the solution: the x-value gives the input (e.g. number of items, hours, minutes) at which the two options are equal. The y-value gives the corresponding output (e.g. cost, profit). Points to the left of the intersection favour one option; points to the right favour the other.",
      ],
      latexBlocks: [
        "\\text{If } y = mx + b \\text{ and } y = m'x + b', \\text{ set equal:}",
        "mx + b = m'x + b'",
        "\\text{Solve for } x,\\text{ then find } y.",
      ],
    },
    workedExamples: [
      {
        title: "Solve by substitution",
        questionLatex:
          "\\text{Solve: } y = 2x + 3 \\text{ and } y = 5x - 9.",
        steps: [
          {
            explanation:
              "Both equations have y isolated. Set them equal to each other.",
            latex: "2x + 3 = 5x - 9",
          },
          {
            explanation: "Solve for x.",
            latex: "12 = 3x \\Rightarrow x = 4",
          },
          {
            explanation:
              "Substitute x = 4 into the first equation to find y.",
            latex: "y = 2(4) + 3 = 11",
          },
        ],
        finalAnswerLatex: "x = 4,\\ y = 11 \\quad (4,\\ 11)",
      },
      {
        title: "Break-even in context",
        questionLatex:
          "\\text{Plan A: } C = 0.30n + 20.\\text{ Plan B: } C = 0.20n + 30.\\text{ Find the break-even point.}",
        steps: [
          {
            explanation: "Set the two costs equal.",
            latex: "0.30n + 20 = 0.20n + 30",
          },
          {
            explanation: "Solve for n.",
            latex:
              "0.10n = 10 \\Rightarrow n = 100",
          },
          {
            explanation:
              "Substitute n = 100 into either equation to find the cost at the break-even point.",
            latex:
              "C = 0.30(100) + 20 = 50",
          },
        ],
        finalAnswerLatex:
          "\\text{Break-even at } n = 100 \\text{ calls, cost } \\$50.",
      },
    ],
    guidedPractice: [
      simAnswer(
        "y12s1-sim-g1",
        "Solve the simultaneous equations y = x + 4 and y = 3x − 2.",
        "x + 4 = 3x - 2 \\Rightarrow 6 = 2x",
        "x = 3, y = 7",
        ["(3, 7)", "x=3 y=7"],
        "Set the two expressions for y equal to each other and solve.",
        "x + 4 = 3x − 2 → 6 = 2x → x = 3. y = 3 + 4 = 7. Solution: (3, 7)."
      ),
      simAnswer(
        "y12s1-sim-g2",
        "Two car hire companies charge: Company A: C = 0.50k + 40 and Company B: C = 0.30k + 60, where k is kilometres. At what distance are the costs equal?",
        "0.50k + 40 = 0.30k + 60",
        "k = 100",
        ["100 km", "100 kilometres"],
        "Set the two cost equations equal and solve for k.",
        "0.50k + 40 = 0.30k + 60 → 0.20k = 20 → k = 100. The costs are equal at 100 km."
      ),
      simChoice(
        "y12s1-sim-g3",
        "Two lines intersect at (5, 12). What does this mean for the two equations they represent?",
        "A",
        [
          "Both equations give y = 12 when x = 5 — it is the only (x, y) pair that satisfies both equations simultaneously.",
          "Both lines have gradient 5.",
          "Both lines have y-intercept 12.",
          "The lines are parallel.",
        ],
        "An intersection point is where both equations have the same solution.",
        "The intersection point (5, 12) means x = 5 and y = 12 satisfy both equations at the same time — it is the simultaneous solution."
      ),
      simAnswer(
        "y12s1-sim-g4",
        "Solve y = 4x − 1 and y = 2x + 7.",
        "4x - 1 = 2x + 7",
        "x = 4, y = 15",
        ["(4, 15)", "x=4 y=15"],
        "Set equal: 4x − 1 = 2x + 7. Solve for x, then find y.",
        "4x − 1 = 2x + 7 → 2x = 8 → x = 4. y = 4(4) − 1 = 15. Solution: (4, 15)."
      ),
    ],
    independentPractice: [
      simAnswer(
        "y12s1-sim-i1",
        "Solve the simultaneous equations y = 3x + 1 and y = x + 9.",
        "3x + 1 = x + 9",
        "x = 4, y = 13",
        ["(4, 13)", "x=4 y=13"],
        "Set both expressions for y equal and solve.",
        "3x + 1 = x + 9 → 2x = 8 → x = 4. y = 3(4) + 1 = 13."
      ),
      simAnswer(
        "y12s1-sim-i2",
        "A catering business has revenue R = 30n and costs C = 15n + 450, where n is guests. Find the break-even number of guests.",
        "30n = 15n + 450",
        "30",
        ["n = 30", "30 guests"],
        "Set R = C and solve for n.",
        "30n = 15n + 450 → 15n = 450 → n = 30. Break-even at 30 guests."
      ),
      simChoice(
        "y12s1-sim-i3",
        "Plan A costs $0.40 per text plus $10 per month. Plan B costs $0.10 per text plus $25 per month. For how many texts per month do the plans cost the same?",
        "C",
        [
          "30 texts.",
          "25 texts.",
          "50 texts — from 0.40n + 10 = 0.10n + 25 → 0.30n = 15 → n = 50.",
          "100 texts.",
        ],
        "Set C_A = C_B and solve: 0.40n + 10 = 0.10n + 25.",
        "0.40n + 10 = 0.10n + 25 → 0.30n = 15 → n = 50."
      ),
      simAnswer(
        "y12s1-sim-i4",
        "Solve y = 5x − 3 and y = 2x + 9.",
        "5x - 3 = 2x + 9",
        "x = 4, y = 17",
        ["(4, 17)", "x=4 y=17"],
        "Set 5x − 3 = 2x + 9 and solve.",
        "5x − 3 = 2x + 9 → 3x = 12 → x = 4. y = 5(4) − 3 = 17."
      ),
      simChoice(
        "y12s1-sim-i5",
        "Two lines are graphed. They intersect at (3, 10). Which statement is TRUE?",
        "B",
        [
          "The x-coordinate of the intersection is 10 and the y-coordinate is 3.",
          "At x = 3, both lines give y = 10 — this is the only point satisfying both equations.",
          "The lines are parallel.",
          "The intersection means both lines have gradient 3.",
        ],
        "At an intersection point, both lines give the same (x, y) values.",
        "The intersection (3, 10) means x = 3, y = 10 satisfies both equations. The coordinates always read as (x, y) — x = 3, y = 10."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Writing the x-value as y and the y-value as x from an intersection point.",
        fix: "Intersection points are written as (x, y). The horizontal coordinate is x and the vertical coordinate is y.",
      },
      {
        mistake: "Forgetting to find y after solving for x.",
        fix: "After solving for x, always substitute back into either original equation to find the y-value. The solution is the pair (x, y).",
      },
      {
        mistake: "Setting up C = C only to find the cost difference, rather than the equal-cost point.",
        fix: "Setting the two equations equal finds where they're the same (break-even). The cost at this point is found by substituting the x-value back into either equation.",
      },
    ],
    masteryQuiz: [
      simAnswer(
        "y12s1-sim-m1",
        "Solve y = 6x − 4 and y = 2x + 8.",
        "6x - 4 = 2x + 8",
        "x = 3, y = 14",
        ["(3, 14)", "x=3 y=14"],
        "Set the two expressions equal and solve.",
        "6x − 4 = 2x + 8 → 4x = 12 → x = 3. y = 6(3) − 4 = 14."
      ),
      simAnswer(
        "y12s1-sim-m2",
        "Revenue R = 50n and cost C = 20n + 300 (n = items produced). Find the break-even quantity.",
        "50n = 20n + 300",
        "10",
        ["n = 10", "10 items"],
        "Set R = C and solve.",
        "50n = 20n + 300 → 30n = 300 → n = 10."
      ),
      simAnswer(
        "y12s1-sim-m3",
        "The lines y = x + 7 and y = 4x − 5 intersect at point (a, b). Find a and b.",
        "x + 7 = 4x - 5",
        "a = 4, b = 11",
        ["(4, 11)", "a=4 b=11"],
        "Set x + 7 = 4x − 5 and solve.",
        "x + 7 = 4x − 5 → 12 = 3x → x = 4. y = 4 + 7 = 11. Point is (4, 11)."
      ),
      simChoice(
        "y12s1-sim-m4",
        "Two phone plans: Plan A = $0.50 per minute + $15/month. Plan B = $0.20 per minute + $30/month. For fewer than 50 minutes, which plan is cheaper?",
        "A",
        [
          "Plan A — at 50 minutes both cost the same; for fewer minutes the lower fixed cost of Plan A wins.",
          "Plan B — it has a lower per-minute rate.",
          "Both plans cost the same for any number of minutes.",
          "Plan B — the higher fixed cost means longer calls are included.",
        ],
        "Find the break-even point. For fewer minutes than break-even, which plan costs less?",
        "Break-even: 0.50n + 15 = 0.20n + 30 → 0.30n = 15 → n = 50. For n < 50, Plan A costs less (lower fixed cost dominates). For n > 50, Plan B costs less."
      ),
      simAnswer(
        "y12s1-sim-m5",
        "Solve y = 7x + 2 and y = 3x + 18.",
        "7x + 2 = 3x + 18",
        "x = 4, y = 30",
        ["(4, 30)", "x=4 y=30"],
        "Set equal and solve.",
        "7x + 2 = 3x + 18 → 4x = 16 → x = 4. y = 7(4) + 2 = 30."
      ),
      simChoice(
        "y12s1-sim-m6",
        "Two gym membership options: Option 1: $10 per visit. Option 2: $60 per month + $4 per visit. At what number of visits per month are the costs equal?",
        "C",
        [
          "8 visits.",
          "12 visits.",
          "10 visits — from 10v = 4v + 60 → 6v = 60 → v = 10.",
          "60 visits.",
        ],
        "Set 10v = 4v + 60 and solve for v.",
        "10v = 4v + 60 → 6v = 60 → v = 10. At 10 visits both options cost $100."
      ),
      simAnswer(
        "y12s1-sim-m7",
        "Solve the simultaneous equations y = 2x + 11 and y = 8x − 7.",
        "2x + 11 = 8x - 7",
        "x = 3, y = 17",
        ["(3, 17)", "x=3 y=17"],
        "Set 2x + 11 = 8x − 7.",
        "2x + 11 = 8x − 7 → 18 = 6x → x = 3. y = 2(3) + 11 = 17."
      ),
      simChoice(
        "y12s1-sim-m8",
        "A graph shows two lines intersecting at (6, 24). Which interpretation is correct in a cost context where C = cost and n = items?",
        "A",
        [
          "At n = 6 items, both options cost $24.",
          "At C = 6, both options sell 24 items.",
          "The lines cross because they are parallel.",
          "The gradient of both lines is 6.",
        ],
        "Remember: the intersection is (n, C), not (C, n). The x-axis is n, the y-axis is C.",
        "The intersection (6, 24) means n = 6 items and C = $24. Both options cost the same ($24) when 6 items are involved."
      ),
      simAnswer(
        "y12s1-sim-m9",
        "A catering company breaks even when R = C. If R = 80n and C = 50n + 600, find the break-even n and state the revenue at that point.",
        "80n = 50n + 600",
        "n = 20, revenue = $1600",
        ["20 guests", "n=20 R=1600", "20 and 1600"],
        "Set R = C and solve for n. Then find R = 80n.",
        "80n = 50n + 600 → 30n = 600 → n = 20. Revenue = 80 × 20 = $1600."
      ),
      simChoice(
        "y12s1-sim-m10",
        "A solver finds that two equations give x = −2. In a practical context where x represents the number of people attending an event, what does this mean?",
        "C",
        [
          "The event runs for −2 hours.",
          "The two options are equal when 2 fewer people attend.",
          "The mathematical solution x = −2 is not valid in this context — the number of people cannot be negative.",
          "The answer x = −2 means the second option is always cheaper.",
        ],
        "Can the number of people attending an event be negative?",
        "A negative number of people is not meaningful in context. The mathematical solution x = −2 is not valid here — it means the two options never cross in the practical domain (e.g. n ≥ 0)."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Ratios, Rates and Unit Conversions ───────────────────────────────────────

function ratChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function ratAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1RatiosRatesUnitConversionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "trigonometry-ratios-rates" ||
    lesson.slug !== "ratios-rates-unit-conversions"
  ) {
    return null;
  }

  return {
    description:
      "Simplify ratios, divide quantities in a given ratio, convert between metric units, and apply unit conversions to practical rate problems.",
    learningIntention:
      "Use ratios to compare and share quantities, and convert between metric units of length, mass, capacity, and time.",
    successCriteria: [
      "Simplify a ratio by dividing both parts by the highest common factor.",
      "Divide a quantity in a given ratio.",
      "Convert between metric units of length (mm, cm, m, km).",
      "Convert between metric units of mass (mg, g, kg, t) and capacity (mL, L, kL).",
      "Convert between time units (seconds, minutes, hours, days).",
      "Apply unit conversions in rate and scale problems.",
    ],
    teaching: {
      paragraphs: [
        "A ratio compares two or more quantities of the same kind. Ratios are simplified by dividing all parts by their highest common factor (HCF). For example, 12 : 8 simplifies to 3 : 2 (dividing by 4).",
        "To divide a quantity in a ratio, first find the total number of parts. Divide the quantity by the total parts to find one part, then multiply by each ratio number. For example, share $60 in ratio 2 : 3: total parts = 5, one part = $12. Share = $24 and $36.",
        "Metric unit conversions: Length: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km. Mass: 1000 mg = 1 g, 1000 g = 1 kg, 1000 kg = 1 t. Capacity: 1000 mL = 1 L, 1000 L = 1 kL. Time: 60 s = 1 min, 60 min = 1 hr, 24 hr = 1 day.",
        "To convert to a smaller unit, multiply. To convert to a larger unit, divide. For example, 2.5 km = 2.5 × 1000 = 2500 m (smaller unit → multiply). 350 cm = 350 ÷ 100 = 3.5 m (larger unit → divide).",
        "Rate problems often require unit conversion before calculating. For example, to convert 90 km/h to m/s: 90 km/h = 90 000 m / 3600 s = 25 m/s.",
      ],
      latexBlocks: [
        "\\text{Total parts} = a + b \\quad \\text{One part} = \\frac{\\text{quantity}}{a+b}",
        "\\times 1000 \\text{ (km → m)},\\quad \\div 1000 \\text{ (m → km)}",
        "\\text{Speed: } v = \\frac{d}{t}",
      ],
    },
    workedExamples: [
      {
        title: "Divide a quantity in a ratio",
        questionLatex:
          "\\text{Divide \\$420 between Alex and Beth in the ratio 3 : 4.}",
        steps: [
          {
            explanation: "Total number of parts = 3 + 4 = 7.",
            latex: "\\text{One part} = \\frac{420}{7} = 60",
          },
          {
            explanation:
              "Alex receives 3 parts, Beth receives 4 parts.",
            latex:
              "\\text{Alex} = 3 \\times 60 = 180,\\quad \\text{Beth} = 4 \\times 60 = 240",
          },
        ],
        finalAnswerLatex: "\\text{Alex: }\\$180,\\quad \\text{Beth: }\\$240",
      },
      {
        title: "Convert units in a rate problem",
        questionLatex:
          "\\text{Convert 72 km/h to m/s.}",
        steps: [
          {
            explanation: "Convert km to m: 72 km = 72 000 m.",
            latex: "72 \\times 1000 = 72\\,000 \\text{ m}",
          },
          {
            explanation: "Convert hours to seconds: 1 hour = 3600 s.",
            latex:
              "\\frac{72\\,000}{3600} = 20 \\text{ m/s}",
          },
        ],
        finalAnswerLatex: "72 \\text{ km/h} = 20 \\text{ m/s}",
      },
    ],
    guidedPractice: [
      ratAnswer(
        "y12s1-rat-g1",
        "Simplify the ratio 18 : 24.",
        "\\gcd(18, 24) = 6,\\quad 18 \\div 6 : 24 \\div 6",
        "3 : 4",
        ["3:4"],
        "Divide both parts by the HCF of 18 and 24.",
        "HCF(18, 24) = 6. 18/6 = 3, 24/6 = 4. Simplified ratio: 3 : 4."
      ),
      ratAnswer(
        "y12s1-rat-g2",
        "Share $300 between two people in the ratio 2 : 3.",
        "\\text{One part} = \\frac{300}{5} = 60",
        "$120 and $180",
        ["120 and 180", "120:180", "$120 : $180"],
        "Total parts = 2 + 3 = 5. One part = 300 ÷ 5 = 60.",
        "One part = $60. First share = 2 × 60 = $120. Second share = 3 × 60 = $180."
      ),
      ratAnswer(
        "y12s1-rat-g3",
        "Convert 4.2 km to metres.",
        "4.2 \\times 1000",
        "4200",
        ["4200 m", "4200 metres"],
        "1 km = 1000 m. To convert km to m, multiply by 1000.",
        "4.2 × 1000 = 4200 m."
      ),
      ratAnswer(
        "y12s1-rat-g4",
        "Convert 3500 mL to litres.",
        "3500 \\div 1000",
        "3.5",
        ["3.5 L", "3.5 litres"],
        "1 L = 1000 mL. To convert mL to L, divide by 1000.",
        "3500 ÷ 1000 = 3.5 L."
      ),
    ],
    independentPractice: [
      ratAnswer(
        "y12s1-rat-i1",
        "Simplify the ratio 45 : 30.",
        "\\gcd(45,30) = 15",
        "3 : 2",
        ["3:2"],
        "Find the HCF of 45 and 30, then divide both parts.",
        "HCF(45, 30) = 15. 45/15 = 3, 30/15 = 2. Simplified: 3 : 2."
      ),
      ratAnswer(
        "y12s1-rat-i2",
        "Three friends share $480 in the ratio 1 : 2 : 3. How much does each person receive?",
        "\\text{One part} = \\frac{480}{6} = 80",
        "$80, $160, $240",
        ["80 160 240", "80:160:240"],
        "Total parts = 1 + 2 + 3 = 6. One part = 480 ÷ 6 = 80.",
        "First: 1 × 80 = $80. Second: 2 × 80 = $160. Third: 3 × 80 = $240."
      ),
      ratAnswer(
        "y12s1-rat-i3",
        "Convert 2.75 hours to minutes.",
        "2.75 \\times 60",
        "165",
        ["165 minutes", "165 min"],
        "1 hour = 60 minutes. Multiply by 60.",
        "2.75 × 60 = 165 minutes."
      ),
      ratChoice(
        "y12s1-rat-i4",
        "Convert 54 km/h to m/s.",
        "B",
        [
          "54 m/s",
          "15 m/s",
          "0.015 m/s",
          "900 m/s",
        ],
        "54 km = 54 000 m. 1 hour = 3600 s. Divide.",
        "54 km/h = 54 000 m ÷ 3600 s = 15 m/s."
      ),
      ratAnswer(
        "y12s1-rat-i5",
        "Concrete is mixed using cement : sand : gravel in the ratio 1 : 2 : 4. How much sand is needed to make 280 kg of concrete mixture?",
        "\\text{One part} = \\frac{280}{7} = 40",
        "80",
        ["80 kg", "80 kilograms"],
        "Total parts = 1 + 2 + 4 = 7. Sand = 2 parts.",
        "One part = 280 / 7 = 40 kg. Sand = 2 × 40 = 80 kg."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Adding the ratio numbers to get one part instead of dividing the total by the sum of parts.",
        fix: "One part = total quantity ÷ (sum of ratio parts). For ratio 3 : 5, total parts = 8. Divide the quantity by 8 to find one part.",
      },
      {
        mistake: "Multiplying instead of dividing when converting to a larger unit (e.g. cm to m).",
        fix: "To convert to a larger unit, divide. To convert to a smaller unit, multiply. A metre is larger than a cm, so 350 cm ÷ 100 = 3.5 m.",
      },
      {
        mistake: "Forgetting to convert both km and hours when converting km/h to m/s.",
        fix: "Both the distance and the time must be converted: km × 1000 = m, and hours × 3600 = seconds. Divide the converted distance by the converted time.",
      },
    ],
    masteryQuiz: [
      ratAnswer(
        "y12s1-rat-m1",
        "Simplify the ratio 36 : 48.",
        "\\gcd(36, 48) = 12",
        "3 : 4",
        ["3:4"],
        "HCF(36, 48) = 12.",
        "36/12 = 3, 48/12 = 4. Simplified: 3 : 4."
      ),
      ratAnswer(
        "y12s1-rat-m2",
        "Divide 600 g in the ratio 1 : 4.",
        "\\text{One part} = \\frac{600}{5} = 120",
        "120 g and 480 g",
        ["120 and 480", "120g and 480g"],
        "Total parts = 5. One part = 600 ÷ 5.",
        "120 g and 4 × 120 = 480 g."
      ),
      ratAnswer(
        "y12s1-rat-m3",
        "Convert 8500 m to kilometres.",
        "8500 \\div 1000",
        "8.5",
        ["8.5 km", "8.5 kilometres"],
        "1 km = 1000 m. Divide by 1000.",
        "8500 ÷ 1000 = 8.5 km."
      ),
      ratAnswer(
        "y12s1-rat-m4",
        "Convert 4.3 kg to grams.",
        "4.3 \\times 1000",
        "4300",
        ["4300 g", "4300 grams"],
        "1 kg = 1000 g. Multiply by 1000.",
        "4.3 × 1000 = 4300 g."
      ),
      ratChoice(
        "y12s1-rat-m5",
        "A recipe uses flour and sugar in the ratio 5 : 2. If 350 g of flour is used, how much sugar is needed?",
        "B",
        [
          "175 g",
          "140 g",
          "70 g",
          "250 g",
        ],
        "Use the ratio: sugar/flour = 2/5. Sugar = (2/5) × 350.",
        "sugar = (2/5) × 350 = 140 g."
      ),
      ratAnswer(
        "y12s1-rat-m6",
        "Convert 108 km/h to m/s.",
        "\\frac{108 \\times 1000}{3600}",
        "30",
        ["30 m/s"],
        "108 km = 108 000 m. 1 hr = 3600 s.",
        "108 000 ÷ 3600 = 30 m/s."
      ),
      ratAnswer(
        "y12s1-rat-m7",
        "Three siblings divide an inheritance in the ratio 2 : 3 : 5. If the total is $120 000, find the largest share.",
        "\\text{One part} = \\frac{120\\,000}{10} = 12\\,000",
        "60000",
        ["$60000", "$60 000", "60 000 dollars"],
        "Total parts = 2 + 3 + 5 = 10. Largest share = 5 parts.",
        "One part = $12 000. Largest = 5 × 12 000 = $60 000."
      ),
      ratAnswer(
        "y12s1-rat-m8",
        "Convert 2 days 5 hours to hours.",
        "2 \\times 24 + 5",
        "53",
        ["53 hours", "53 hrs"],
        "1 day = 24 hours.",
        "2 × 24 + 5 = 48 + 5 = 53 hours."
      ),
      ratChoice(
        "y12s1-rat-m9",
        "A map scale is 1 : 50 000. A distance on the map is 4 cm. What is the actual distance?",
        "C",
        [
          "200 m",
          "50 km",
          "2 km (4 cm × 50 000 = 200 000 cm = 2000 m = 2 km)",
          "400 000 cm",
        ],
        "Actual distance = map distance × scale factor. Convert cm to km.",
        "4 × 50 000 = 200 000 cm = 2000 m = 2 km."
      ),
      ratAnswer(
        "y12s1-rat-m10",
        "A solution contains acid and water in the ratio 1 : 9. How much acid is in 5 litres of solution?",
        "\\text{One part} = \\frac{5}{10} = 0.5",
        "0.5",
        ["0.5 L", "500 mL", "0.5 litres"],
        "Total parts = 1 + 9 = 10. Acid = 1 part.",
        "One part = 5 / 10 = 0.5 L. Acid = 1 × 0.5 = 0.5 L."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Investment and Compound Interest ────────────────────────────────────────

function invChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function invAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1InvestmentCompoundInterestLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "investments-loans-annuities" ||
    lesson.slug !== "investment-compound-interest"
  ) {
    return null;
  }

  return {
    description:
      "Calculate simple interest and compound interest, compare investment strategies, and apply formulas to contexts involving inflation and appreciation.",
    learningIntention:
      "Use the simple interest formula I = Prn and the compound interest formula FV = PV(1+r)ⁿ to solve investment problems and compare different investment strategies.",
    successCriteria: [
      "Use I = Prn to calculate simple interest, principal, interest rate, or number of periods.",
      "Use FV = PV(1+r)ⁿ to calculate the future value or present value of a compound interest investment.",
      "Apply compound interest to contexts involving inflation and appreciation.",
      "Compare the growth of simple and compound interest investments numerically.",
      "Compare savings accounts, term deposits, and property as investment strategies.",
    ],
    teaching: {
      paragraphs: [
        "Simple interest is calculated on the original principal only. The formula is I = Prn, where I is the interest earned, P is the principal (initial amount), r is the interest rate per time period (as a decimal), and n is the number of time periods. The total amount after n periods is A = P + I.",
        "Compound interest is calculated on the current balance (principal plus accumulated interest). The future value formula is FV = PV(1+r)ⁿ, where FV is the future value, PV is the present value (initial investment), r is the interest rate per compounding period (as a decimal), and n is the number of compounding periods.",
        "Simple interest grows linearly — the amount increases by the same dollar figure each period. Compound interest grows exponentially — the amount increases faster each period because interest is earned on top of interest already added.",
        "Appreciation describes an increase in value over time (e.g. property price growth). Inflation describes the general rise in prices, which reduces the purchasing power of money. Both can be modelled using compound interest: FV = PV(1+r)ⁿ.",
        "Investment strategies comparison: savings accounts use compound interest and provide flexible access to funds; term deposits use simple (or compound) interest with a fixed rate for a set period; property investment involves capital growth (appreciation) but requires significant upfront capital and has associated costs.",
      ],
      latexBlocks: [
        "I = Prn,\\quad A = P + I",
        "FV = PV(1+r)^n",
        "\\text{Total interest (SI)} = Prn",
        "\\text{Interest earned (CI)} = FV - PV = PV(1+r)^n - PV",
      ],
    },
    workedExamples: [
      {
        title: "Calculate simple interest",
        questionLatex:
          "\\text{Calculate the simple interest earned on \\$8000 invested at 4.5\\% p.a. for 3 years.}",
        steps: [
          {
            explanation:
              "Identify values: P = 8000, r = 0.045 (4.5% as decimal), n = 3.",
            latex: "I = Prn",
          },
          {
            explanation: "Substitute and evaluate.",
            latex: "I = 8000 \\times 0.045 \\times 3 = 1080",
          },
        ],
        finalAnswerLatex: "I = \\$1080",
      },
      {
        title: "Calculate compound interest future value",
        questionLatex:
          "\\text{\\$5000 is invested at 6\\% p.a. compounded annually for 4 years. Find the future value.}",
        steps: [
          {
            explanation:
              "Identify values: PV = 5000, r = 0.06, n = 4.",
            latex: "FV = PV(1+r)^n",
          },
          {
            explanation: "Substitute and evaluate.",
            latex:
              "FV = 5000 \\times (1.06)^4 = 5000 \\times 1.26248 \\approx 6312.38",
          },
        ],
        finalAnswerLatex: "FV \\approx \\$6312.38",
      },
    ],
    guidedPractice: [
      invAnswer(
        "y12s1-inv-g1",
        "Calculate the simple interest earned on $6000 invested at 5% p.a. for 4 years.",
        "I = 6000 \\times 0.05 \\times 4",
        "1200",
        ["$1200", "1200.00"],
        "Use I = Prn. Convert 5% to 0.05.",
        "I = 6000 × 0.05 × 4 = 1200."
      ),
      invAnswer(
        "y12s1-inv-g2",
        "Find the future value of $10 000 invested at 3% p.a. compounded annually for 5 years.",
        "FV = 10\\,000 \\times (1.03)^5",
        "11592.74",
        ["$11592.74", "11592.74 dollars", "11592.74"],
        "Use FV = PV(1+r)ⁿ with PV = 10 000, r = 0.03, n = 5.",
        "FV = 10 000 × (1.03)⁵ = 10 000 × 1.159274 = 11 592.74."
      ),
      invAnswer(
        "y12s1-inv-g3",
        "A house purchased for $400 000 appreciates at 4% p.a. compound. Find its value after 3 years.",
        "FV = 400\\,000 \\times (1.04)^3",
        "449945.60",
        ["$449945.60", "449945.60 dollars", "449 945.60"],
        "Appreciation uses the compound interest formula: FV = PV(1+r)ⁿ.",
        "FV = 400 000 × (1.04)³ = 400 000 × 1.124864 = 449 945.60."
      ),
      invChoice(
        "y12s1-inv-g4",
        "Which statement correctly compares simple interest and compound interest growth?",
        "B",
        [
          "Simple interest grows faster because it applies a percentage each period.",
          "Compound interest grows faster because interest is earned on the accumulated balance, not just the original principal.",
          "Both grow at the same rate if the interest rate is the same.",
          "Simple interest always produces a larger total than compound interest.",
        ],
        "Think about whether interest in each method is calculated on the original principal only or on the growing balance.",
        "Compound interest earns interest on the growing balance (principal + accumulated interest), so it grows exponentially. Simple interest earns interest only on the original principal, growing linearly. Compound interest always produces a larger total over multiple periods."
      ),
    ],
    independentPractice: [
      invAnswer(
        "y12s1-inv-i1",
        "A term deposit of $12 000 earns simple interest at 3.5% p.a. for 2 years. Find the total amount at the end of the term.",
        "A = 12\\,000 + 12\\,000 \\times 0.035 \\times 2",
        "12840",
        ["$12840", "12840.00"],
        "A = P + I = P + Prn.",
        "I = 12 000 × 0.035 × 2 = 840. A = 12 000 + 840 = 12 840."
      ),
      invAnswer(
        "y12s1-inv-i2",
        "Find the interest earned on $7500 invested at 5% p.a. compounded annually for 3 years.",
        "FV = 7500 \\times (1.05)^3,\\quad I = FV - 7500",
        "1182.19",
        ["$1182.19", "1182.19 dollars"],
        "Find FV first, then subtract the original investment.",
        "FV = 7500 × (1.05)³ = 7500 × 1.157625 = 8682.19. Interest = 8682.19 − 7500 = 1182.19."
      ),
      invAnswer(
        "y12s1-inv-i3",
        "Inflation is running at 3% p.a. A loaf of bread costs $4.50 today. What will it cost in 5 years? (Round to 2 decimal places.)",
        "FV = 4.50 \\times (1.03)^5",
        "5.22",
        ["$5.22", "5.22 dollars"],
        "Use FV = PV(1+r)ⁿ with PV = 4.50, r = 0.03, n = 5.",
        "FV = 4.50 × (1.03)⁵ = 4.50 × 1.15927 ≈ 5.22."
      ),
      invChoice(
        "y12s1-inv-i4",
        "Which investment earns more interest over 4 years on a $5000 principal: 6% p.a. simple interest or 5.5% p.a. compound interest?",
        "A",
        [
          "6% p.a. simple interest — over 4 years the higher rate outweighs the compounding advantage.",
          "5.5% p.a. compound interest — compounding over 4 years produces a higher return despite the slightly lower rate.",
          "Both produce the same interest.",
          "More information about the compounding frequency is needed.",
        ],
        "Calculate both: SI = 5000 × 0.06 × 4 and Interest_CI = 5000 × (1.055)⁴ − 5000.",
        "SI: I = 5000 × 0.06 × 4 = $1200. CI: FV = 5000 × (1.055)⁴ = 5000 × 1.2388 ≈ $6194, interest = $1194. Since $1200 > $1194, the 6% simple interest earns more over 4 years."
      ),
      invChoice(
        "y12s1-inv-i5",
        "A savings account uses compound interest and a term deposit uses simple interest, both at 4% p.a. Which earns more interest over 5 years on the same principal?",
        "A",
        [
          "The savings account (compound interest) — interest accumulates on the growing balance.",
          "The term deposit (simple interest) — a fixed rate is guaranteed.",
          "Both earn the same interest because the rate is the same.",
          "The term deposit — simple interest grows faster in the short term.",
        ],
        "Compare how each method calculates interest over multiple periods.",
        "Over 5 years, the savings account (CI) earns interest on the growing balance each year, so the total grows faster than the term deposit (SI) which earns interest only on the original principal. CI always produces more than SI at the same rate over multiple periods."
      ),
    ],
    commonMistakes: [
      {
        mistake: "Using the interest rate as a whole number (e.g. r = 5) instead of a decimal (r = 0.05) in the formula.",
        fix: "Always convert the percentage rate to a decimal before substituting: r = rate% ÷ 100.",
      },
      {
        mistake: "Confusing FV (future value) with the interest earned.",
        fix: "FV = PV(1+r)ⁿ gives the total amount — principal plus interest. To find interest earned alone, subtract the principal: Interest = FV − PV.",
      },
      {
        mistake: "Using the annual rate directly when interest is compounded monthly or quarterly.",
        fix: "Divide the annual rate by the number of compounding periods per year to get the rate per period, and multiply n accordingly. For example, 6% p.a. monthly → r = 0.06/12 = 0.005 per month.",
      },
    ],
    masteryQuiz: [
      invAnswer(
        "y12s1-inv-m1",
        "Calculate the simple interest on $15 000 at 4% p.a. for 3 years.",
        "I = 15\\,000 \\times 0.04 \\times 3",
        "1800",
        ["$1800", "1800.00"],
        "I = Prn.",
        "I = 15 000 × 0.04 × 3 = 1800."
      ),
      invAnswer(
        "y12s1-inv-m2",
        "Find the future value of $3000 invested at 7% p.a. compounded annually for 4 years. (Round to 2 d.p.)",
        "FV = 3000 \\times (1.07)^4",
        "3932.39",
        ["$3932.39", "3932.39 dollars"],
        "FV = PV(1+r)ⁿ.",
        "FV = 3000 × (1.07)⁴ = 3000 × 1.310796 = 3932.39."
      ),
      invAnswer(
        "y12s1-inv-m3",
        "A principal of $20 000 earns simple interest. After 5 years the total amount is $26 000. Find the annual interest rate.",
        "I = 6000,\\quad r = \\frac{I}{Pn} = \\frac{6000}{20000 \\times 5}",
        "0.06",
        ["6%", "6 percent", "0.06"],
        "I = A − P = 26 000 − 20 000 = 6000. Then use r = I / (Pn).",
        "I = 6000. r = 6000 / (20 000 × 5) = 6000 / 100 000 = 0.06 = 6% p.a."
      ),
      invAnswer(
        "y12s1-inv-m4",
        "A collectible car worth $25 000 appreciates at 8% p.a. compound. Find its value after 6 years. (Round to the nearest dollar.)",
        "FV = 25\\,000 \\times (1.08)^6",
        "39672",
        ["$39672", "39672 dollars", "39671", "$39671"],
        "Use appreciation formula FV = PV(1+r)ⁿ with r = 0.08, n = 6.",
        "FV = 25 000 × (1.08)⁶ = 25 000 × 1.58687 ≈ 39 672."
      ),
      invChoice(
        "y12s1-inv-m5",
        "Inflation is 2.5% p.a. A laptop costs $1500 today. Which expression gives its price in 3 years?",
        "B",
        [
          "$1500 × 0.025 × 3",
          "$1500 × (1.025)³",
          "$1500 × (1 − 0.025)³",
          "$1500 + 0.025 × 3",
        ],
        "Inflation causes prices to grow — use compound growth, not simple interest.",
        "Inflation is modelled by compound growth: FV = PV(1 + r)ⁿ = 1500 × (1.025)³."
      ),
      invAnswer(
        "y12s1-inv-m6",
        "Compare these two investments over 3 years on $10 000: Option A: 5% p.a. compound interest. Option B: 5% p.a. simple interest. How much more interest does Option A earn? (To 2 d.p.)",
        "FV_A = 10000 \\times (1.05)^3,\\quad I_B = 10000 \\times 0.05 \\times 3",
        "76.25",
        ["$76.25", "76.25 dollars"],
        "A: Interest = FV − 10 000. B: I = Prn. Subtract B from A.",
        "A: FV = 10 000 × (1.05)³ = 10 000 × 1.157625 = $11 576.25, interest = $1576.25. B: I = 10 000 × 0.05 × 3 = $1500. Difference = 1576.25 − 1500 = $76.25."
      ),
      invChoice(
        "y12s1-inv-m7",
        "Which investment strategy generally provides the highest long-term growth potential but also carries the most risk?",
        "C",
        [
          "A savings account — compound interest guaranteed by the bank.",
          "A term deposit — fixed simple interest rate for a set period.",
          "Property investment — potential for significant capital appreciation but with high entry cost and market risk.",
          "A term deposit — because simple interest is faster than compound interest.",
        ],
        "Consider which strategy has the largest variation in outcomes.",
        "Property can appreciate significantly over the long term, but involves high upfront costs, illiquidity, and market risk. Savings accounts and term deposits provide lower but more predictable returns."
      ),
      invAnswer(
        "y12s1-inv-m8",
        "Person A invests $8000 in a savings account at 4% p.a. compounded annually for 5 years. Person B puts $8000 in a term deposit at 4% p.a. simple interest for 5 years. How much more does Person A earn in interest? (To 2 d.p.)",
        "FV_A = 8000 \\times (1.04)^5,\\quad I_B = 8000 \\times 0.04 \\times 5",
        "133.22",
        ["$133.22", "133.22 dollars"],
        "Find interest for each: A: Interest = FV − 8000; B: I = Prn. Subtract.",
        "A: FV = 8000 × (1.04)⁵ = 8000 × 1.216653 = 9733.22. I_A = 1733.22. B: I_B = 8000 × 0.04 × 5 = 1600. Difference = 1733.22 − 1600 = 133.22."
      ),
      invChoice(
        "y12s1-inv-m9",
        "Which graph shape correctly represents compound interest growth over time?",
        "B",
        [
          "A straight line — the amount increases by the same dollar amount each period.",
          "A curve that increases at an increasing rate (exponential growth) — each period's increase is larger than the last.",
          "A curve that increases at a decreasing rate — the growth slows down over time.",
          "A horizontal line — the balance stays constant once invested.",
        ],
        "Compound interest earns interest on the growing balance — does each period's increase stay the same, get bigger, or get smaller?",
        "Compound interest grows exponentially because each period earns interest on a larger balance. The curve rises at an increasing rate. Simple interest produces a straight line."
      ),
      invAnswer(
        "y12s1-inv-m10",
        "How many years does it take for $5000 invested at 6% p.a. simple interest to reach a total of $7400?",
        "7400 = 5000 + 5000 \\times 0.06 \\times n",
        "8",
        ["8 years", "n = 8"],
        "Set up A = P + Prn and solve for n. I = 7400 − 5000 = 2400.",
        "I = 7400 − 5000 = 2400. 2400 = 5000 × 0.06 × n = 300n. n = 2400/300 = 8 years."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Depreciation and Loans ───────────────────────────────────────────────────

function deprChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function deprAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1DepreciationAndLoansLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "investments-loans-annuities" ||
    lesson.slug !== "depreciation-loans"
  ) {
    return null;
  }

  return {
    description:
      "Model asset depreciation using straight-line and declining balance methods, compare loan types, and build reducing balance loan tables.",
    learningIntention:
      "Use straight-line and declining balance depreciation formulas, compare loan options, and model reducing balance loans with a repayment table.",
    successCriteria: [
      "Apply S = V₀ − Dn to find the salvage value using straight-line depreciation.",
      "Apply S = V₀(1−r)ⁿ to find the salvage value using declining balance depreciation.",
      "Explain the similarity and difference between the declining balance formula and compound interest.",
      "Compare straight-line and declining balance depreciation for the same asset.",
      "Complete a reducing balance loan table for up to three time periods.",
      "Compare the total costs of buy now pay later, short-term, and long-term loans.",
    ],
    teaching: {
      paragraphs: [
        "Straight-line depreciation reduces an asset's value by the same dollar amount D each period: S = V₀ − Dn, where V₀ is the initial value, D is the depreciation per period, and n is the number of periods. For example, a machine worth $10 000 that loses $800 per year has a salvage value of S = 10 000 − 800n after n years.",
        "Declining balance depreciation reduces an asset's value by a fixed percentage r each period: S = V₀(1−r)ⁿ. This is structurally identical to compound interest A = P(1+r)ⁿ, but uses (1−r) instead of (1+r) — the value decreases rather than grows.",
        "Key comparison: straight-line gives the same dollar drop each year. Declining balance gives a larger drop in early years (because the percentage is taken from a higher value) and a smaller drop in later years. Under declining balance, the salvage value never reaches exactly zero.",
        "A reducing balance loan works by charging interest on the current balance each period, then subtracting the repayment. New balance = old balance × (1 + r) − repayment. Because the balance decreases as repayments are made, future interest charges also decrease.",
        "Loan type comparison: buy now pay later (BNPL) often charges no interest but may include late fees if repayments are missed — it suits very short-term needs. Short-term loans (e.g. personal loans over 1–2 years) have higher interest rates but lower total interest than long-term loans. Long-term loans (e.g. over 5+ years) have lower regular repayments but significantly higher total interest paid over the life of the loan.",
      ],
      latexBlocks: [
        "S = V_0 - Dn \\quad \\text{(straight-line)}",
        "S = V_0(1-r)^n \\quad \\text{(declining balance)}",
        "\\text{New balance} = \\text{Old balance} \\times (1 + r) - \\text{Repayment}",
      ],
    },
    workedExamples: [
      {
        title: "Straight-line depreciation",
        questionLatex:
          "\\text{A photocopier costs \\$12\\,000. It depreciates by \\$1500 per year. Find its salvage value after 5 years.}",
        steps: [
          {
            explanation:
              "Identify the values: V₀ = 12 000, D = 1500, n = 5. Write the formula.",
            latex: "S = V_0 - Dn",
          },
          {
            explanation: "Substitute and evaluate.",
            latex:
              "S = 12\\,000 - 1500 \\times 5 = 12\\,000 - 7500 = 4500",
          },
        ],
        finalAnswerLatex: "S = \\$4500",
      },
      {
        title: "Declining balance depreciation",
        questionLatex:
          "\\text{A laptop costs \\$3000 and depreciates at 20\\% per year. Find its value after 3 years.}",
        steps: [
          {
            explanation:
              "Identify the values: V₀ = 3000, r = 0.20, n = 3. Write the formula.",
            latex: "S = V_0(1-r)^n",
          },
          {
            explanation: "Substitute and evaluate.",
            latex:
              "S = 3000 \\times (0.80)^3 = 3000 \\times 0.512 = 1536",
          },
        ],
        finalAnswerLatex: "S = \\$1536",
      },
      {
        title: "Reducing balance loan table",
        questionLatex:
          "\\text{A loan of \\$10\\,000 has a monthly interest rate of 1\\%. Monthly repayment is \\$500. Complete the table for 3 months.}",
        steps: [
          {
            explanation:
              "Month 1: Interest = 10 000 × 0.01 = 100. New balance = 10 000 + 100 − 500.",
            latex:
              "\\text{Balance}_1 = 10\\,000 \\times 1.01 - 500 = 10\\,100 - 500 = 9600",
          },
          {
            explanation:
              "Month 2: New balance = 9600 × 1.01 − 500.",
            latex:
              "\\text{Balance}_2 = 9600 \\times 1.01 - 500 = 9696 - 500 = 9196",
          },
          {
            explanation:
              "Month 3: New balance = 9196 × 1.01 − 500.",
            latex:
              "\\text{Balance}_3 = 9196 \\times 1.01 - 500 = 9287.96 - 500 = 8787.96",
          },
        ],
        finalAnswerLatex:
          "\\text{Balances after months 1–3: }\\$9600,\\ \\$9196,\\ \\$8787.96",
      },
    ],
    guidedPractice: [
      deprAnswer(
        "y12s1-depr-g1",
        "A machine costs $8000 and depreciates by $800 per year. Use S = V₀ − Dn to find its salvage value after 6 years.",
        "S = 8000 - 800 \\times 6",
        "3200",
        ["$3200", "3200.00"],
        "S = V₀ − Dn. Substitute V₀ = 8000, D = 800, n = 6.",
        "S = 8000 − 800 × 6 = 8000 − 4800 = 3200."
      ),
      deprAnswer(
        "y12s1-depr-g2",
        "A car worth $20 000 depreciates at 15% per year (declining balance). Find its value after 2 years.",
        "S = 20\\,000 \\times (0.85)^2",
        "14450",
        ["$14450", "14450.00"],
        "S = V₀(1−r)ⁿ. Substitute V₀ = 20 000, r = 0.15, n = 2.",
        "S = 20 000 × (0.85)² = 20 000 × 0.7225 = 14 450."
      ),
      deprAnswer(
        "y12s1-depr-g3",
        "A reducing balance loan starts at $5000. The monthly interest rate is 2% and the monthly repayment is $300. Find the balance after month 1.",
        "\\text{Balance}_1 = 5000 \\times 1.02 - 300",
        "4800",
        ["$4800", "4800.00"],
        "New balance = old balance × (1 + rate) − repayment.",
        "Balance₁ = 5000 × 1.02 − 300 = 5100 − 300 = 4800."
      ),
      deprChoice(
        "y12s1-depr-g4",
        "Which statement correctly describes the difference between straight-line and declining balance depreciation?",
        "B",
        [
          "Both reduce the value by the same dollar amount each period.",
          "Straight-line reduces by a fixed dollar amount; declining balance reduces by a fixed percentage of the current value.",
          "Declining balance depreciates an asset faster in later years.",
          "Straight-line uses the formula S = V₀(1−r)ⁿ.",
        ],
        "Consider what stays constant in each method — a dollar amount, or a percentage of current value.",
        "Straight-line: the same dollar amount D is subtracted each period. Declining balance: the same percentage r is applied to the current (decreasing) value, so the dollar drop is larger in early years and smaller later."
      ),
    ],
    independentPractice: [
      deprAnswer(
        "y12s1-depr-i1",
        "A factory tool costs $15 000 and depreciates by $1200 per year (straight-line). Find its salvage value after 8 years.",
        "S = 15\\,000 - 1200 \\times 8",
        "5400",
        ["$5400", "5400.00"],
        "S = V₀ − Dn.",
        "S = 15 000 − 1200 × 8 = 15 000 − 9600 = 5400."
      ),
      deprAnswer(
        "y12s1-depr-i2",
        "Equipment worth $10 000 depreciates at 25% per year (declining balance). Find its value after 3 years.",
        "S = 10\\,000 \\times (0.75)^3",
        "4218.75",
        ["$4218.75", "$4218.75 dollars"],
        "S = V₀(1−r)ⁿ. Substitute r = 0.25, n = 3.",
        "S = 10 000 × (0.75)³ = 10 000 × 0.421875 = 4218.75."
      ),
      deprAnswer(
        "y12s1-depr-i3",
        "A loan of $6000 has a monthly interest rate of 1.5% and monthly repayment of $400. The balance after month 1 is $5690. Find the balance after month 2.",
        "\\text{Balance}_2 = 5690 \\times 1.015 - 400",
        "5375.35",
        ["$5375.35"],
        "Apply: new balance = old balance × 1.015 − 400.",
        "Balance₂ = 5690 × 1.015 − 400 = 5775.35 − 400 = 5375.35."
      ),
      deprChoice(
        "y12s1-depr-i4",
        "An asset depreciates using declining balance at 10% per year. In which period is the dollar drop in value the largest?",
        "A",
        [
          "The first period — the percentage is taken from the highest value.",
          "The last period — more time has passed.",
          "All periods have an equal dollar drop because the percentage is the same.",
          "The middle period.",
        ],
        "Declining balance applies a fixed percentage to the current value. When is the current value highest?",
        "In declining balance depreciation, the same percentage is applied each year. The value is highest at the start, so the first year gives the largest dollar reduction."
      ),
      deprChoice(
        "y12s1-depr-i5",
        "Compared to a traditional bank loan at 8% p.a., which statement about buy now pay later (BNPL) schemes is most accurate?",
        "C",
        [
          "BNPL always costs less because it charges no interest.",
          "BNPL is always more expensive than bank loans.",
          "BNPL may have no interest but can include late fees and may encourage spending beyond what the borrower can afford.",
          "BNPL and bank loans have identical total costs.",
        ],
        "Think about what happens when a BNPL repayment is missed.",
        "BNPL may advertise zero interest but late fees apply when repayments are missed. BNPL can also encourage over-spending. The total cost depends on the borrower's repayment behaviour."
      ),
    ],
    commonMistakes: [
      {
        mistake:
          "Using (1+r)ⁿ instead of (1−r)ⁿ for declining balance depreciation.",
        fix: "Depreciation reduces the value, so use S = V₀(1−r)ⁿ. Compound interest growth uses (1+r)ⁿ — the structures are identical but the sign of r differs.",
      },
      {
        mistake:
          "Subtracting the repayment before adding interest in a reducing balance loan table.",
        fix: "The correct order is: new balance = old balance × (1 + r) − repayment. Add interest first, then subtract the repayment.",
      },
      {
        mistake:
          "Confusing the depreciation amount D (dollars) with the rate r (as a decimal) in the two formulas.",
        fix: "Straight-line S = V₀ − Dn uses a fixed dollar amount D. Declining balance S = V₀(1−r)ⁿ uses a rate r written as a decimal (e.g. 15% → 0.15).",
      },
    ],
    masteryQuiz: [
      deprAnswer(
        "y12s1-depr-m1",
        "A vehicle costs $25 000 and depreciates straight-line by $3000 per year. Find its salvage value after 4 years.",
        "S = 25\\,000 - 3000 \\times 4",
        "13000",
        ["$13000", "13000.00"],
        "S = V₀ − Dn.",
        "S = 25 000 − 3000 × 4 = 25 000 − 12 000 = 13 000."
      ),
      deprAnswer(
        "y12s1-depr-m2",
        "A drone costs $2500 and depreciates at 30% per year (declining balance). Find its value after 2 years.",
        "S = 2500 \\times (0.70)^2",
        "1225",
        ["$1225", "1225.00"],
        "S = V₀(1−r)ⁿ with r = 0.30, n = 2.",
        "S = 2500 × (0.70)² = 2500 × 0.49 = 1225."
      ),
      deprAnswer(
        "y12s1-depr-m3",
        "A loan of $4000 has monthly interest rate 2% and monthly repayment $250. Find the balance after month 1.",
        "4000 \\times 1.02 - 250",
        "3830",
        ["$3830", "3830.00"],
        "New balance = 4000 × 1.02 − 250.",
        "Balance₁ = 4000 × 1.02 − 250 = 4080 − 250 = 3830."
      ),
      deprAnswer(
        "y12s1-depr-m4",
        "Using the loan from the previous question, find the balance after month 2. (Month 1 balance = $3830.)",
        "3830 \\times 1.02 - 250",
        "3656.60",
        ["$3656.60", "3656.6"],
        "Apply the same rule to month 2 using Balance₁ = 3830.",
        "Balance₂ = 3830 × 1.02 − 250 = 3906.60 − 250 = 3656.60."
      ),
      deprChoice(
        "y12s1-depr-m5",
        "Which depreciation method results in the same dollar reduction in value every period?",
        "A",
        [
          "Straight-line — a constant dollar amount D is subtracted each period.",
          "Declining balance — a fixed percentage of the current value is subtracted.",
          "Both methods give the same dollar reduction every period.",
          "Neither method gives a fixed reduction.",
        ],
        "Think about which formula subtracts D (a fixed dollar amount) each time.",
        "Straight-line: S = V₀ − Dn subtracts D dollars every period — constant. Declining balance applies a fixed percentage to the current (falling) value, so the dollar drop decreases each period."
      ),
      deprAnswer(
        "y12s1-depr-m6",
        "A computer costs $5000 and depreciates straight-line by $900 per year. After how many complete years does its salvage value first fall below $1000?",
        "5000 - 900n < 1000 \\Rightarrow n > \\frac{4000}{900} \\approx 4.44",
        "5",
        ["5 years", "year 5"],
        "Solve 5000 − 900n < 1000 for n, then round up to the next whole year.",
        "900n > 4000 → n > 4.44. After 5 complete years the value = 5000 − 4500 = $500, which is below $1000."
      ),
      deprChoice(
        "y12s1-depr-m7",
        "The declining balance formula S = V₀(1−r)ⁿ resembles compound interest A = P(1+r)ⁿ. What is the key structural difference?",
        "B",
        [
          "Compound interest starts at n = 0 while depreciation starts at n = 1.",
          "Depreciation uses (1−r) so the value decreases each period; compound interest uses (1+r) so the value increases.",
          "Depreciation applies to money and compound interest applies to physical assets.",
          "There is no difference; the formulas are identical.",
        ],
        "What changes when you replace (1+r) with (1−r)?",
        "Both formulas share the same structure P × (factor)ⁿ. Using (1−r) means each multiplication by a number less than 1 reduces the value. Using (1+r) means each multiplication by a number greater than 1 grows the value."
      ),
      deprAnswer(
        "y12s1-depr-m8",
        "A loan of $8000 has monthly interest rate 1% and monthly repayment $600. Balances: month 1 = $7480, month 2 = $6954.80. Find the balance after month 3.",
        "6954.80 \\times 1.01 - 600",
        "6424.35",
        ["$6424.35", "6424.35 dollars"],
        "New balance = 6954.80 × 1.01 − 600.",
        "6954.80 × 1.01 = 7024.348. 7024.35 − 600 = 6424.35."
      ),
      deprChoice(
        "y12s1-depr-m9",
        "Compare a $5000 short-term loan at 18% p.a. over 1 year with a $5000 long-term loan at 8% p.a. over 5 years. Which generally costs more in total interest?",
        "B",
        [
          "The short-term loan — a higher interest rate always means more total interest.",
          "The long-term loan — the longer repayment period allows interest to accumulate over many more periods, typically exceeding the short-term total despite the lower rate.",
          "Both cost the same total interest.",
          "More information is needed to compare.",
        ],
        "Short-term: 1 year at 18%. Long-term: 5 years at 8%. Which factor dominates — rate or time?",
        "At 18% for 1 year: roughly $5000 × 0.18 = $900 in interest. At 8% compounding over 5 years, the interest accumulates across many more periods — total interest typically exceeds $1000. The extended repayment period of the low-rate loan often costs more overall."
      ),
      deprChoice(
        "y12s1-depr-m10",
        "Making an extra lump-sum payment on a reducing balance loan will most likely:",
        "C",
        [
          "Increase the total interest paid on the loan.",
          "Have no effect on the loan term or total cost.",
          "Reduce the outstanding balance faster, decreasing total interest charged and shortening the loan term.",
          "Increase the required monthly repayment amount.",
        ],
        "A lump-sum reduces the outstanding balance. How does a lower balance affect the interest charged in future periods?",
        "Interest each period is calculated on the outstanding balance. A lump-sum payment reduces that balance immediately, so less interest is charged in all subsequent periods — this shortens the loan term and reduces total interest paid."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

// ─── Credit Cards and Loans ───────────────────────────────────────────────────

function ccChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint,
    explanation,
  };
}

function ccAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: [answer, ...acceptedAnswers],
    hint,
    explanation,
  };
}

export function year12Standard1CreditCardsAndLoansLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-1" ||
    unit.slug !== "investments-loans-annuities" ||
    lesson.slug !== "credit-cards-and-loans"
  ) {
    return null;
  }

  return {
    description:
      "Understand credit cards as reducing balance loans, compare interest rates with other loan types, and calculate compound interest on outstanding balances.",
    learningIntention:
      "Explain how credit cards work as reducing balance loans, identify fees and the interest-free period, interpret statements, and calculate interest charged for a given number of days.",
    successCriteria: [
      "Explain why a credit card is a type of reducing balance loan.",
      "Compare credit card interest rates with personal loan and home loan rates.",
      "Identify common credit card fees and explain the interest-free period.",
      "Interpret a credit card statement and assess the impact of paying only the minimum payment.",
      "Calculate the compound interest charged on an outstanding balance for a given number of days using A = P(1 + r/365)ⁿ.",
      "Compare credit cards and personal loans as options for short-term, medium-term, and long-term financial goals.",
    ],
    teaching: {
      paragraphs: [
        "A credit card is a reducing balance loan. The bank sets a credit limit; the cardholder borrows by spending up to that limit and repays some or all of the balance each month. When the full balance is not repaid by the due date, interest is charged on the remaining amount — reducing the balance as repayments are made.",
        "Credit card purchase rates are typically 15–22% p.a. — significantly higher than personal loan rates (6–15% p.a.) and home loan rates (4–8% p.a.). Carrying an unpaid credit card balance is therefore one of the most expensive forms of borrowing.",
        "Common fees include: annual card fee (charged each year for having the card), late payment fee (charged when the minimum payment is missed), cash advance fee (charged when withdrawing cash on the card), and foreign transaction fee (charged on purchases in a foreign currency).",
        "The interest-free period (typically 44–55 days from the start of the statement cycle) means no interest is charged on purchases if the full closing balance is paid by the due date. If any amount is carried over, interest is charged from the original purchase date — not just on the unpaid portion.",
        "A credit card statement shows the opening balance, a list of all purchases and payments during the period, the closing balance, the minimum payment required (often 2–3% of the closing balance or a fixed dollar minimum), and the payment due date. Paying only the minimum payment leaves most of the debt outstanding, and interest compounds on the unpaid balance — the debt can take many years to repay and cost far more than the original amount.",
        "To calculate interest charged on an outstanding balance for n days: use the daily compounding formula A = P(1 + r/365)ⁿ, where P is the outstanding balance and r is the annual interest rate as a decimal. Interest charged = A − P.",
        "For short-term goals (a few weeks to months), a credit card with an interest-free period can cost nothing if paid in full. For medium-term goals (1–3 years), a personal loan at a lower rate is usually better. For long-term goals (many years), credit card debt is very expensive — a personal loan or dedicated finance product is far more appropriate.",
      ],
      latexBlocks: [
        "A = P\\left(1 + \\frac{r}{365}\\right)^n",
        "\\text{Interest charged} = A - P",
        "\\text{Daily rate} = \\frac{\\text{annual rate}}{365}",
      ],
    },
    workedExamples: [
      {
        title: "Calculate interest on an outstanding balance",
        questionLatex:
          "\\text{Layla has an outstanding credit card balance of \\$2000. The annual interest rate is 19.99\\% p.a. Calculate the interest charged after 30 days.}",
        steps: [
          {
            explanation:
              "Find the daily interest rate: r_d = 0.1999 / 365.",
            latex:
              "r_d = \\frac{0.1999}{365} \\approx 0.000548",
          },
          {
            explanation:
              "Calculate the amount after 30 days using A = P(1 + r_d)ⁿ.",
            latex:
              "A = 2000 \\times (1.000548)^{30} \\approx 2000 \\times 1.016561 \\approx 2033.12",
          },
          {
            explanation: "Interest charged = A − P.",
            latex: "\\text{Interest} = 2033.12 - 2000 = 33.12",
          },
        ],
        finalAnswerLatex: "\\text{Interest} \\approx \\$33.12",
      },
      {
        title: "Interpret a credit card statement: minimum payment",
        questionLatex:
          "\\text{A credit card statement shows a closing balance of \\$3600. The minimum payment is 2.5\\% of the closing balance. Find the minimum payment and the balance carried forward.}",
        steps: [
          {
            explanation: "Minimum payment = 2.5% × 3600.",
            latex:
              "\\text{Min payment} = 0.025 \\times 3600 = 90",
          },
          {
            explanation:
              "Balance carried forward = closing balance − minimum payment.",
            latex: "3600 - 90 = 3510",
          },
          {
            explanation:
              "Interest is then charged on the $3510 outstanding balance from the start of the next period.",
          },
        ],
        finalAnswerLatex:
          "\\text{Min payment} = \\$90,\\quad \\text{Balance carried forward} = \\$3510",
      },
    ],
    guidedPractice: [
      ccAnswer(
        "y12s1-cc-g1",
        "A credit card has an annual interest rate of 21% p.a. A purchase of $500 is not paid for 30 days. Calculate the interest charged. (Give your answer to 2 decimal places.)",
        "A = 500 \\times \\left(1 + \\frac{0.21}{365}\\right)^{30}",
        "8.70",
        ["$8.70", "8.70 dollars"],
        "r_d = 0.21/365 ≈ 0.000575. A = 500 × (1.000575)³⁰. Interest = A − 500.",
        "r_d = 0.21/365 ≈ 0.000575. A = 500 × (1.000575)³⁰ ≈ 500 × 1.017405 ≈ 508.70. Interest = 8.70."
      ),
      ccChoice(
        "y12s1-cc-g2",
        "Which statement correctly describes the interest-free period on a credit card?",
        "C",
        [
          "Interest is never charged on any credit card transaction.",
          "The card charges no interest for the first year of use.",
          "No interest is charged on purchases if the full closing balance is paid by the due date within the interest-free window.",
          "Interest-free means the card's annual rate is 0%.",
        ],
        "The interest-free period only applies when the full balance is repaid by the due date.",
        "The interest-free period (typically 44–55 days) means no interest on purchases if the full closing balance is repaid by the due date. Any unpaid amount after the due date is charged interest, often backdated to the purchase date."
      ),
      ccAnswer(
        "y12s1-cc-g3",
        "A credit card statement shows a closing balance of $1200. The minimum payment is 3% of the closing balance. Find the minimum payment.",
        "0.03 \\times 1200",
        "36",
        ["$36", "36.00"],
        "Minimum payment = 3% × closing balance.",
        "0.03 × 1200 = 36. The minimum payment is $36."
      ),
      ccChoice(
        "y12s1-cc-g4",
        "For a long-term financial goal such as purchasing a car over 5 years, which option is generally most suitable?",
        "B",
        [
          "A credit card — flexible repayments and widely accepted.",
          "A personal loan at a lower interest rate — a fixed term and lower rate reduces total interest over 5 years compared with a credit card at ~20% p.a.",
          "Buy now pay later — no interest means no extra cost.",
          "A credit card — the interest-free period applies for the entire 5 years.",
        ],
        "Compare the total interest cost of ~20% p.a. (credit card) versus ~9% p.a. (personal loan) over 5 years.",
        "A personal loan at a lower rate substantially reduces total interest. Credit cards at 15–22% p.a. are very expensive over 5 years. BNPL is not designed for multi-year finance. The interest-free period does not apply once a balance is carried past the due date."
      ),
    ],
    independentPractice: [
      ccAnswer(
        "y12s1-cc-i1",
        "An outstanding credit card balance of $1500 accrues interest at 18% p.a. for 15 days. Calculate the interest charged to 2 decimal places.",
        "A = 1500 \\times \\left(1 + \\frac{0.18}{365}\\right)^{15}",
        "11.13",
        ["$11.13", "11.13 dollars"],
        "r_d = 0.18/365 ≈ 0.000493. A = 1500 × (1.000493)¹⁵. Interest = A − 1500.",
        "r_d ≈ 0.000493. A = 1500 × (1.000493)¹⁵ ≈ 1500 × 1.007423 ≈ 1511.13. Interest = 11.13."
      ),
      ccChoice(
        "y12s1-cc-i2",
        "A student pays only the minimum payment on a $5000 credit card balance each month. What is the most likely outcome over the following year?",
        "A",
        [
          "The debt takes much longer to repay and the total interest paid is significantly higher than if larger payments were made.",
          "The balance is repaid in full within 12 months.",
          "The bank reduces the interest rate as a reward for consistent minimum payments.",
          "The total amount repaid equals exactly the original $5000.",
        ],
        "What happens to interest on the unpaid portion when only a small minimum payment is made?",
        "Making only the minimum payment (often 2–3% of the balance) means the majority of the debt remains outstanding. Interest compounds on that unpaid balance each month. Repayment can take many years and total interest paid can exceed the original debt."
      ),
      ccAnswer(
        "y12s1-cc-i3",
        "A credit card charges a daily interest rate of 0.05%. Calculate the interest charged on a $3000 outstanding balance for 25 days. (To 2 decimal places.)",
        "A = 3000 \\times (1.0005)^{25}",
        "37.73",
        ["$37.73", "37.73 dollars"],
        "A = 3000 × (1.0005)²⁵. Interest = A − 3000.",
        "A = 3000 × (1.0005)²⁵ ≈ 3000 × 1.012575 ≈ 3037.73. Interest = 37.73."
      ),
      ccChoice(
        "y12s1-cc-i4",
        "A credit card rate is 20% p.a. A personal loan rate is 9% p.a. Both are used to borrow $2000 for 6 months. Which results in less total interest?",
        "B",
        [
          "The credit card — it has an interest-free period.",
          "The personal loan — a lower rate means less interest over the same period.",
          "Both result in the same interest.",
          "The credit card — because 20% is the monthly rate, not annual.",
        ],
        "Compare 20% p.a. with 9% p.a. over the same 6-month period.",
        "At 20% p.a. on $2000 for 6 months: approximately $200 interest. At 9% p.a.: approximately $90. The personal loan at 9% p.a. results in less total interest paid."
      ),
      ccChoice(
        "y12s1-cc-i5",
        "Which of the following is NOT a fee typically associated with credit card usage?",
        "D",
        [
          "Annual card fee.",
          "Late payment fee.",
          "Cash advance fee.",
          "Interest-free period fee.",
        ],
        "The interest-free period is a card feature, not a charge.",
        "The interest-free period is a benefit offered to cardholders, not a fee. Annual fees, late payment fees, and cash advance fees are all standard charges that can appear on credit card statements."
      ),
    ],
    commonMistakes: [
      {
        mistake:
          "Using the annual interest rate directly in the formula instead of converting to a daily rate first.",
        fix: "Convert: daily rate = annual rate ÷ 365. Then substitute into A = P(1 + daily rate)ⁿ where n is the number of days.",
      },
      {
        mistake:
          "Thinking the interest-free period means no interest is ever charged on credit card purchases.",
        fix: "The interest-free period only applies when the full closing balance is paid by the due date. Any unpaid amount incurs interest, often backdated to the original purchase date.",
      },
      {
        mistake:
          "Treating the minimum payment as sufficient to avoid interest.",
        fix: "Paying only the minimum leaves the majority of the balance outstanding. To avoid interest charges, the full statement balance must be paid by the due date.",
      },
    ],
    masteryQuiz: [
      ccAnswer(
        "y12s1-cc-m1",
        "A credit card balance of $2500 accrues interest at 20% p.a. for 20 days. Calculate the interest charged to 2 decimal places.",
        "A = 2500 \\times \\left(1 + \\frac{0.20}{365}\\right)^{20}",
        "27.54",
        ["$27.54", "27.54 dollars"],
        "r_d = 0.20/365 ≈ 0.000548. A = 2500 × (1.000548)²⁰. Interest = A − 2500.",
        "r_d ≈ 0.000548. A ≈ 2500 × 1.011016 ≈ 2527.54. Interest = 27.54."
      ),
      ccChoice(
        "y12s1-cc-m2",
        "Why is a credit card classified as a type of reducing balance loan?",
        "A",
        [
          "The outstanding balance decreases as repayments are made, and interest is charged each period on only the remaining balance.",
          "The interest rate automatically reduces each year as the balance falls.",
          "Credit cards repay the full balance automatically every month, reducing the loan to zero.",
          "The bank reduces the credit limit as repayments are made.",
        ],
        "Think about how the outstanding balance and interest charges change as repayments are made.",
        "A reducing balance loan charges interest on the current (declining) balance. As repayments are made, the balance falls and future interest is calculated on the lower amount — exactly how credit card interest works when a balance is carried."
      ),
      ccAnswer(
        "y12s1-cc-m3",
        "A credit card statement shows a closing balance of $4200. The minimum payment is 2% of the closing balance. Find the balance carried forward after only the minimum is paid.",
        "4200 - 0.02 \\times 4200",
        "4116",
        ["$4116", "4116.00"],
        "Carried balance = closing balance − minimum payment.",
        "Min payment = 0.02 × 4200 = 84. Carried balance = 4200 − 84 = 4116."
      ),
      ccChoice(
        "y12s1-cc-m4",
        "A credit card charges 22% p.a. and a personal loan charges 10% p.a. For a purchase repaid over 3 years, which option costs less in total interest?",
        "B",
        [
          "The credit card — interest-free periods reduce the effective annual rate.",
          "The personal loan — a significantly lower rate over 3 years substantially reduces total interest paid.",
          "Both cost the same if the repayment amount per month is equal.",
          "The credit card — because minimum payments provide flexibility.",
        ],
        "Compare 22% p.a. vs 10% p.a. compounding over 3 years on the same principal.",
        "Over 3 years, 22% p.a. compounding results in far higher total interest than 10% p.a. The personal loan is substantially cheaper for a 3-year repayment period."
      ),
      ccAnswer(
        "y12s1-cc-m5",
        "A credit card charges a daily rate of 0.06%. Find the interest charged on a balance of $800 over 10 days. (To 2 decimal places.)",
        "A = 800 \\times (1.0006)^{10}",
        "4.81",
        ["$4.81", "4.81 dollars"],
        "A = 800 × (1.0006)¹⁰. Interest = A − 800.",
        "A = 800 × (1.0006)¹⁰ ≈ 800 × 1.006016 ≈ 804.81. Interest = 4.81."
      ),
      ccChoice(
        "y12s1-cc-m6",
        "A credit card has a 55-day interest-free period measured from the start of the statement cycle. A purchase is made on the first day of the cycle. When must the cardholder pay in full to avoid interest?",
        "B",
        [
          "Within 55 days of the specific purchase date.",
          "By the payment due date on the statement, which falls within the 55-day window from the start of the cycle.",
          "Anytime within the calendar month the purchase was made.",
          "The 55-day rule does not apply to individual purchases — only to the total balance.",
        ],
        "The interest-free period runs from the start of the statement cycle, not from the individual purchase date.",
        "The 55-day window starts from the first day of the statement period. The due date on the statement falls within this window. Paying the full closing balance by the due date avoids interest on all purchases made during that cycle."
      ),
      ccAnswer(
        "y12s1-cc-m7",
        "Danielle's credit card statement shows: opening balance $0, purchases $3200, payments $3200. What interest is charged for this period?",
        "\\text{Full balance repaid} \\Rightarrow \\text{interest charged} = 0",
        "0",
        ["$0", "zero", "no interest", "nil"],
        "When is interest charged on a credit card?",
        "If the full closing balance is repaid by the due date within the interest-free period, no interest is charged. Danielle repaid the full $3200 — interest = $0."
      ),
      ccAnswer(
        "y12s1-cc-m8",
        "A foreign transaction fee of 3% is charged on a $500 overseas purchase. What additional cost does this fee add?",
        "0.03 \\times 500",
        "15",
        ["$15", "15.00"],
        "Fee = 3% × purchase amount.",
        "0.03 × 500 = 15. The fee adds $15 to the cost of the purchase."
      ),
      ccAnswer(
        "y12s1-cc-m9",
        "An outstanding balance of $1000 accrues interest at 19% p.a. for 365 days. Use A = P(1 + r/365)³⁶⁵ to find the total amount owed. (To 2 decimal places.)",
        "A = 1000 \\times \\left(1 + \\frac{0.19}{365}\\right)^{365}",
        "1209.19",
        ["$1209.19", "1209.19 dollars"],
        "Substitute P = 1000, r = 0.19, n = 365 into A = P(1 + r/365)ⁿ.",
        "A = 1000 × (1 + 0.19/365)³⁶⁵ ≈ 1000 × 1.209190 ≈ 1209.19."
      ),
      ccChoice(
        "y12s1-cc-m10",
        "A family needs $15 000 for a home renovation and plans to repay over 5 years. Which option is most appropriate and why?",
        "B",
        [
          "Credit card — flexible repayments and widely accepted for large purchases.",
          "Personal loan at a lower interest rate — a fixed term and lower rate significantly reduces total interest over 5 years compared with a credit card at ~20% p.a.",
          "Buy now pay later — no initial interest means no extra cost for the full 5 years.",
          "Credit card — the 55-day interest-free period covers the full repayment period.",
        ],
        "Compare carrying a $15 000 credit card balance at ~20% p.a. for 5 years versus a personal loan at ~9% p.a.",
        "A personal loan at ~9% p.a. over 5 years is substantially cheaper than carrying a credit card balance at ~20% p.a. BNPL is not designed for $15 000 over 5 years. The interest-free period does not apply once a balance is carried beyond the due date."
      ),
    ],
    masteryPassMark: 0.75,
  };
}

const TEXT_REPLACEMENTS: Array<[string, string]> = [
  ["Â³â¶âµ", "^365"],
  ["Â°", "°"],
  ["Â²", "^2"],
  ["Â³", "^3"],
  ["â¿", "^n"],
  ["â‰¥", ">="],
  ["â‰¤", "<="],
  ["â‰ˆ", "approx"],
  ["â†’", "->"],
  ["â€“", "-"],
  ["â€”", "-"],
  ["âˆ’", "-"],
  ["Ã—", "×"],
  ["Ã·", "÷"],
  ["Î¸", "theta"],
  ["Ï€", "pi"],
  ["â€œ", '"'],
  ["â€", '"'],
  ["â€™", "'"],
];

const LATEX_REPLACEMENTS: Array<[string, string]> = [
  ["Â³â¶âµ", "^{365}"],
  ["Â²", "^2"],
  ["Â³", "^3"],
  ["â¿", "^n"],
  ["â‰¥", "\\ge "],
  ["â‰¤", "\\le "],
  ["â‰ˆ", "\\approx "],
  ["âˆ’", "-"],
  ["â€“", "-"],
  ["â€”", "-"],
  ["Ã—", "\\times "],
  ["Ã·", "\\div "],
  ["Î¸", "\\theta "],
  ["Ï€", "\\pi "],
];

function replaceAllTokens(input: string, replacements: Array<[string, string]>) {
  return replacements.reduce(
    (text, [from, to]) => text.split(from).join(to),
    input
  );
}

function normalizeText(input: string | undefined) {
  if (!input) return input ?? "";
  return replaceAllTokens(input, TEXT_REPLACEMENTS);
}

function normalizeLatex(input: string | undefined) {
  if (!input) return input ?? "";
  let output = replaceAllTokens(input, LATEX_REPLACEMENTS);
  output = output.replace(/(\d+)°/g, "$1^\\circ");
  output = output.replace(/\s+/g, " ").trim();
  return output;
}

function normalizeAnswerValue(input: string) {
  return normalizeText(input).trim();
}

function stripTerminalPunctuation(input: string) {
  return input.replace(/[.?!\s]+$/g, "");
}

function choiceAnswerText(question: PracticeQuestion) {
  return (
    question.choices?.find((choice) => choice.label === question.answer)?.text ??
    question.answer
  ).replace(/\$/g, "").trim();
}

function buildAcceptedVariants(answer: string, prompt: string) {
  const variants = new Set<string>();
  const trimmed = answer.trim();
  const lowerPrompt = prompt.toLowerCase();

  if (!trimmed) return [];

  if (/^-?\d+$/.test(trimmed)) {
    variants.add(`${trimmed}.0`);
    if (/\$|dollar|fee|cost|balance|payment|interest/.test(lowerPrompt)) {
      variants.add(`$${trimmed}`);
      variants.add(`${trimmed}.00`);
      variants.add(`$${trimmed}.00`);
    }
    if (/degree|angle|bearing/.test(lowerPrompt)) {
      variants.add(`${trimmed}°`);
      variants.add(`${trimmed} degrees`);
    }
  } else if (/^-?\d+\.\d+$/.test(trimmed)) {
    const [, decimalPart] = trimmed.split(".");
    if (decimalPart.length === 1) variants.add(`${trimmed}0`);
    if (decimalPart.length === 2 && decimalPart.endsWith("0")) {
      variants.add(trimmed.slice(0, -1));
    }
    if (Number(trimmed) > 0 && Number(trimmed) < 1) {
      variants.add(`${Number(trimmed) * 100}%`);
    }
    if (/\$|dollar|fee|cost|balance|payment|interest/.test(lowerPrompt)) {
      variants.add(`$${trimmed}`);
      variants.add(`${trimmed} dollars`);
    }
  }

  if (trimmed.includes("-")) variants.add(trimmed.replace(/-/g, "−"));
  if (trimmed.includes("−")) variants.add(trimmed.replace(/−/g, "-"));
  if (/[<>]/.test(trimmed)) {
    variants.add(trimmed.replace(/([<>]=?)/g, " $1 ").replace(/\s+/g, " ").trim());
  }
  if (trimmed.includes("≤")) {
    variants.add(trimmed.replace(/≤/g, "<="));
    variants.add(trimmed.replace(/≤/g, " <= ").replace(/\s+/g, " ").trim());
  }
  if (trimmed.includes("≥")) {
    variants.add(trimmed.replace(/≥/g, ">="));
    variants.add(trimmed.replace(/≥/g, " >= ").replace(/\s+/g, " ").trim());
  }
  if (trimmed.includes("<=")) variants.add(trimmed.replace(/<=/g, "≤"));
  if (trimmed.includes(">=")) variants.add(trimmed.replace(/>=/g, "≥"));
  if (/^-?\d+(?:\.\d+)?%$/.test(trimmed)) {
    const withoutPercent = trimmed.slice(0, -1);
    variants.add(withoutPercent);
    variants.add(`${withoutPercent} percent`);
  }
  if (/^-?\d+\/\d+$/.test(trimmed)) {
    const [numerator, denominator] = trimmed.split("/").map(Number);
    variants.add((numerator / denominator).toString());
  }
  if (trimmed.includes("π")) variants.add(trimmed.replace(/π/g, "pi"));
  if (trimmed.includes("pi")) variants.add(trimmed.replace(/pi/g, "π"));
  if (trimmed.includes("°")) variants.add(trimmed.replace(/°/g, " degrees"));
  if (/m\^2/i.test(trimmed)) variants.add(trimmed.replace(/m\^2/gi, "square metres"));
  if (/[A-Za-z]/.test(trimmed)) variants.add(trimmed.toLowerCase());
  if (trimmed.startsWith("(") && trimmed.endsWith(")")) {
    variants.add(trimmed.replace(/\s+/g, ""));
    variants.add(trimmed.replace(/[()]/g, ""));
  }

  variants.delete(trimmed);
  return Array.from(variants);
}

function buildSymbolicVariants(answer: string) {
  const variants = new Set<string>();
  const trimmed = answer.trim();
  if (/[\\=^]/.test(trimmed) || trimmed.includes(" ")) {
    variants.add(trimmed.replace(/\s+/g, ""));
    variants.add(
      trimmed
        .replace(/\\theta/g, "theta")
        .replace(/\\hat\{y\}/g, "y")
        .replace(/\\div/g, "/")
        .replace(/\\times/g, "*")
        .replace(/\^\s*\\circ/g, "°")
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
        .replace(/\s+/g, "")
    );
  }
  variants.delete(trimmed);
  return Array.from(variants);
}

function numberText(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(4)));
}

function parsePromptNumbers(prompt: string) {
  return Array.from(prompt.matchAll(/-?\d+(?:\.\d+)?/g)).map((match) =>
    Number(match[0])
  );
}

function buildPatternExplanation(prompt: string, answer: string) {
  const cleanPrompt = stripTerminalPunctuation(prompt);
  const nums = parsePromptNumbers(prompt);

  const gradientMatch = prompt.match(
    /through(?: the points)? \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\) and \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)/i
  );
  if (/gradient/i.test(prompt) && gradientMatch) {
    const [, x1Text, y1Text, x2Text, y2Text] = gradientMatch;
    const [x1, y1, x2, y2] = [x1Text, y1Text, x2Text, y2Text].map(Number);
    return `Gradient is rise over run: m = (${numberText(y2)} - ${numberText(
      y1
    )}) / (${numberText(x2)} - ${numberText(x1)}) = ${numberText(
      y2 - y1
    )} / ${numberText(x2 - x1)} = ${answer}.`;
  }

  const yInterceptMatch = prompt.match(
    /gradient (-?\d+(?:\.\d+)?) and passes through \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)/i
  );
  if (/y-intercept/i.test(prompt) && yInterceptMatch) {
    const [, mText, xText, yText] = yInterceptMatch;
    const [m, x, y] = [mText, xText, yText].map(Number);
    return `Use y = mx + b. Substituting m = ${numberText(m)} and (${numberText(
      x
    )}, ${numberText(y)}) gives ${numberText(y)} = ${numberText(
      m
    )}(${numberText(x)}) + b, so b = ${answer}.`;
  }

  const coordinateYInterceptMatch = prompt.match(
    /through(?: the points)? \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\) and \((-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\)/i
  );
  if (/y-intercept/i.test(prompt) && coordinateYInterceptMatch) {
    const [, x1Text, y1Text, x2Text, y2Text] = coordinateYInterceptMatch;
    const [x1, y1, x2, y2] = [x1Text, y1Text, x2Text, y2Text].map(Number);
    const zeroY = x1 === 0 ? y1 : x2 === 0 ? y2 : undefined;
    if (zeroY !== undefined) {
      return `The y-intercept is where x = 0. The point with x = 0 has y = ${numberText(
        zeroY
      )}, so the y-intercept is ${answer}.`;
    }
  }

  const lineValueMatch = prompt.match(
    /([A-Z])\s*=\s*(-?\d+(?:\.\d+)?)\s*([a-z])\s*([+-])\s*(-?\d+(?:\.\d+)?).*when \3\s*=\s*(-?\d+(?:\.\d+)?)/i
  );
  if (lineValueMatch) {
    const [, output, rateText, variable, sign, fixedText, valueText] =
      lineValueMatch;
    const [rate, fixed, value] = [rateText, fixedText, valueText].map(Number);
    const total = sign === "+" ? rate * value + fixed : rate * value - fixed;
    return `Substitute ${variable} = ${numberText(value)} into the model: ${output} = ${numberText(
      rate
    )}(${numberText(value)}) ${sign} ${numberText(fixed)} = ${numberText(
      total
    )}.`;
  }

  const yHatMatch = prompt.match(
    /[ŷy]\s*=\s*(-?\d+(?:\.\d+)?)x\s*([+-])\s*(-?\d+(?:\.\d+)?).*x\s*=\s*(-?\d+(?:\.\d+)?)/i
  );
  if (/predict/i.test(prompt) && yHatMatch) {
    const [, gradientText, sign, interceptText, xText] = yHatMatch;
    const [gradient, intercept, x] = [gradientText, interceptText, xText].map(Number);
    return `Substitute x = ${numberText(x)} into the line of best fit: y = ${numberText(
      gradient
    )}(${numberText(x)}) ${sign} ${numberText(intercept)} = ${answer.replace(
      /^predicted y =\s*/i,
      ""
    )}.`;
  }

  const wordedFixedRateMatch = prompt.match(
    /\$(\d+(?:\.\d+)?).*(?:fee|join|insurance|entry|fixed).*?\$(\d+(?:\.\d+)?).*?(?:per|hour|month|day).*?(?:for|after|in a month with)\s+(\d+(?:\.\d+)?)/i
  );
  if (wordedFixedRateMatch) {
    const [, fixedText, rateText, countText] = wordedFixedRateMatch;
    const [fixed, rate, count] = [fixedText, rateText, countText].map(Number);
    return `Build the linear cost as fixed cost plus rate times quantity: ${numberText(
      fixed
    )} + ${numberText(rate)} × ${numberText(count)} = ${answer}.`;
  }

  const phonePlanMatch = prompt.match(
    /\$(\d+(?:\.\d+)?) per month plus \$(\d+(?:\.\d+)?) per text message.*?(\d+(?:\.\d+)?) messages/i
  );
  if (phonePlanMatch) {
    const [, fixedText, rateText, messagesText] = phonePlanMatch;
    const [fixed, rate, messages] = [fixedText, rateText, messagesText].map(Number);
    return `Monthly cost = fixed charge plus message charge = ${numberText(
      fixed
    )} + ${numberText(rate)} × ${numberText(messages)} = ${answer}.`;
  }

  const surplusMatch = prompt.match(
    /income is \$(\d+(?:\.\d+)?).*expenses total \$(\d+(?:\.\d+)?)/i
  );
  if (/surplus/i.test(prompt) && surplusMatch) {
    const [, incomeText, expensesText] = surplusMatch;
    const [income, expenses] = [incomeText, expensesText].map(Number);
    return `Monthly surplus = income - expenses = ${numberText(
      income
    )} - ${numberText(expenses)} = ${answer}.`;
  }

  const simpleRateMatch = prompt.match(
    /(\d+(?:\.\d+)?)\s*(?:km|pages|L).*?(?:at|per)\s+(\d+(?:\.\d+)?)\s*(?:km\/h|pages per minute|L\/min|per minute)/i
  );
  if (/time|minutes|hours/i.test(prompt) && simpleRateMatch) {
    const [, amountText, rateText] = simpleRateMatch;
    const [amount, rate] = [amountText, rateText].map(Number);
    return `Time = amount / rate = ${numberText(amount)} / ${numberText(
      rate
    )} = ${answer}.`;
  }

  const averageSpeedMatch = prompt.match(/travels (\d+(?:\.\d+)?)\s*km in (\d+(?:\.\d+)?)\s*hours/i);
  if (/average speed|km\/h/i.test(prompt) && averageSpeedMatch) {
    const [, distanceText, timeText] = averageSpeedMatch;
    return `Average speed = distance / time = ${distanceText} ÷ ${timeText}, so the matching expression is ${answer}.`;
  }

  const pagesMatch = prompt.match(/prints (\d+(?:\.\d+)?) pages per minute.*?(\d+(?:\.\d+)?)-page/i);
  if (pagesMatch) {
    const [, rateText, pagesText] = pagesMatch;
    return `Time = pages / printing rate = ${pagesText} / ${rateText} = ${answer} minutes.`;
  }

  const fuelMatch = prompt.match(/(\d+(?:\.\d+)?)\s*L per 100 km.*?(\d+(?:\.\d+)?)\s*km/i);
  if (fuelMatch) {
    const [, litresText, kmText] = fuelMatch;
    const [litres, km] = [litresText, kmText].map(Number);
    return `Fuel used = ${numberText(litres)} × ${numberText(
      km
    )} / 100 = ${answer} L.`;
  }

  const hourlyPayMatch = prompt.match(/\$(\d+(?:\.\d+)?) per hour.*?(\d+(?:\.\d+)?)-?hour/i);
  if (hourlyPayMatch) {
    const [, rateText, hoursText] = hourlyPayMatch;
    const [rate, hours] = [rateText, hoursText].map(Number);
    return `Earnings = hourly rate × hours = ${numberText(rate)} × ${numberText(
      hours
    )} = ${answer}.`;
  }

  const simpleInterestMatch = prompt.match(
    /\$?(\d[\d ]*(?:\.\d+)?).*?(\d+(?:\.\d+)?)%\s*p\.a\..*?(\d+(?:\.\d+)?)\s*years/i
  );
  if (/simple interest/i.test(prompt) && simpleInterestMatch) {
    const [, principalText, rateText, yearsText] = simpleInterestMatch;
    const principal = Number(principalText.replace(/\s/g, ""));
    const rate = Number(rateText) / 100;
    const years = Number(yearsText);
    return `Simple interest is I = Prn = ${numberText(principal)} × ${numberText(
      rate
    )} × ${numberText(years)} = ${answer}.`;
  }

  const breakEvenMatch = prompt.match(
    /R\s*=\s*(\d+(?:\.\d+)?)n.*?C\s*=\s*(\d+(?:\.\d+)?)n\s*\+\s*(\d+(?:\.\d+)?)/i
  );
  if (/break-even/i.test(prompt) && breakEvenMatch) {
    const [, revenueText, costRateText, fixedText] = breakEvenMatch;
    const [revenue, costRate, fixed] = [revenueText, costRateText, fixedText].map(Number);
    return `Break-even occurs when R = C: ${numberText(revenue)}n = ${numberText(
      costRate
    )}n + ${numberText(fixed)}. Solving gives n = ${answer}.`;
  }

  const axisMatch = prompt.match(/x-intercepts at x = ([-−]?\d+(?:\.\d+)?) and x = ([-−]?\d+(?:\.\d+)?)/i);
  if (/axis of symmetry/i.test(prompt) && axisMatch) {
    const [, leftText, rightText] = axisMatch;
    const [left, right] = [leftText, rightText].map((value) =>
      Number(value.replace("−", "-"))
    );
    return `The axis of symmetry is halfway between the x-intercepts: (${numberText(
      left
    )} + ${numberText(right)}) / 2 = ${answer.replace("x = ", "")}, so the equation is ${answer}.`;
  }

  const solveLineMatch = prompt.match(
    /([A-Z])\s*=\s*(-?\d+(?:\.\d+)?)\s*([a-z])\s*([+-])\s*(-?\d+(?:\.\d+)?).*when \1\s*=\s*(-?\d+(?:\.\d+)?)/i
  );
  if (solveLineMatch) {
    const [, output, rateText, variable, sign, fixedText, totalText] =
      solveLineMatch;
    const [rate, fixed, total] = [rateText, fixedText, totalText].map(Number);
    const adjusted = sign === "+" ? total - fixed : total + fixed;
    return `Set ${output} = ${numberText(total)}: ${numberText(
      total
    )} = ${numberText(rate)}${variable} ${sign} ${numberText(
      fixed
    )}. Rearranging gives ${numberText(rate)}${variable} = ${numberText(
      adjusted
    )}, so ${variable} = ${answer}.`;
  }

  if (/convert/i.test(prompt)) {
    if (/km to metres/i.test(prompt) && nums.length >= 1) {
      return `${numberText(nums[0])} km = ${numberText(
        nums[0]
      )} × 1000 m = ${answer} m.`;
    }
    if (/m to kilometres/i.test(prompt) && nums.length >= 1) {
      return `${numberText(nums[0])} m = ${numberText(
        nums[0]
      )} / 1000 km = ${answer} km.`;
    }
    if (/kg to grams/i.test(prompt) && nums.length >= 1) {
      return `${numberText(nums[0])} kg = ${numberText(
        nums[0]
      )} × 1000 g = ${answer} g.`;
    }
    if (/mL to litres/i.test(prompt) && nums.length >= 1) {
      return `${numberText(nums[0])} mL = ${numberText(
        nums[0]
      )} / 1000 L = ${answer} L.`;
    }
    if (/hours to minutes/i.test(prompt) && nums.length >= 1) {
      return `${numberText(nums[0])} hours = ${numberText(
        nums[0]
      )} × 60 minutes = ${answer} minutes.`;
    }
    if (/km\/h to m\/s/i.test(prompt) && nums.length >= 1) {
      return `To convert km/h to m/s, divide by 3.6: ${numberText(
        nums[0]
      )} / 3.6 = ${answer} m/s.`;
    }
    if (/days.*hours to hours/i.test(prompt) && nums.length >= 2) {
      return `${numberText(nums[0])} days is ${numberText(
        nums[0] * 24
      )} hours. Add ${numberText(nums[1])} hours to get ${answer} hours.`;
    }
  }

  const ratioMatch = prompt.match(/Divide\s+(\d+(?:\.\d+)?)\s*([a-zA-Z]*)\s+in the ratio\s+(\d+)\s*:\s*(\d+)/i);
  if (ratioMatch) {
    const [, amountText, unit, leftText, rightText] = ratioMatch;
    const [amount, left, right] = [amountText, leftText, rightText].map(Number);
    const part = amount / (left + right);
    return `There are ${left + right} parts in total, so one part is ${numberText(
      amount
    )} / ${left + right} = ${numberText(part)}${unit ? ` ${unit}` : ""}. The two shares are ${answer}.`;
  }

  if (/mean/i.test(prompt) && /sum/i.test(prompt) && nums.length >= 2) {
    return `Mean = total / number of values = ${numberText(nums[1])} / ${numberText(
      nums[0]
    )} = ${answer}.`;
  }
  if (/median/i.test(prompt)) {
    return `The values are already ordered. With an even number of values, the median is the average of the two middle values, which gives ${answer}.`;
  }
  if (/mean/i.test(prompt) && nums.length >= 2) {
    const sum = nums.reduce((total, value) => total + value, 0);
    return `Mean = sum of values / number of values = ${numberText(sum)} / ${nums.length} = ${answer.replace(
      /^mean is\s+/i,
      ""
    )}.`;
  }
  if (/range/i.test(prompt) && nums.length >= 2) {
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return `Range = highest value - lowest value = ${numberText(max)} - ${numberText(
      min
    )} = ${answer.replace(/^range is\s+/i, "")}.`;
  }
  if (/mode/i.test(prompt) && nums.length >= 2) {
    return `The mode is the value that occurs most often. In this data set, ${answer.replace(
      /^mode is\s+/i,
      ""
    )} appears most often.`;
  }
  if (/mean of exactly|wants a mean/i.test(prompt) && nums.length >= 3) {
    return `Use required total = mean × number of tests, then subtract the scores already earned. That calculation gives the needed score of ${answer}.`;
  }

  if (/P\(not/i.test(prompt) && nums.length >= 1) {
    return `Use the complement rule: P(not event) = 1 - P(event) = 1 - ${numberText(
      nums[0]
    )} = ${answer}.`;
  }
  if (/probability.*not|does not/i.test(prompt) && nums.length >= 1) {
    const probability = nums.find((value) => value > 0 && value < 1);
    if (probability !== undefined) {
      return `Use the complement rule: 1 - ${numberText(probability)} = ${answer}.`;
    }
  }
  if (/expected (frequency|number)|should .*expect/i.test(prompt) && nums.length >= 2) {
    const probability = nums.find((value) => value > 0 && value < 1);
    const trials = nums.find((value) => value > 1);
    if (probability !== undefined && trials !== undefined) {
      return `Expected frequency = probability × number of trials = ${numberText(
        probability
      )} × ${numberText(trials)} = ${answer}.`;
    }
  }
  if (/relative frequency|probability/i.test(prompt) && nums.length >= 2) {
    return `Relative frequency or probability is favourable outcomes divided by total outcomes. Using the numbers in the question gives ${answer}.`;
  }

  if (/(triangle|triangular).*base.*height|base.*height.*(triangle|triangular)/i.test(prompt) && nums.length >= 2) {
    return `Triangle area = 1/2 × base × height = 1/2 × ${numberText(
      nums[0]
    )} × ${numberText(nums[1])} = ${answer}.`;
  }
  if (/rectangular prism.*length.*width.*height/i.test(prompt) && nums.length >= 3) {
    return `Volume of a rectangular prism = length × width × height = ${numberText(
      nums[0]
    )} × ${numberText(nums[1])} × ${numberText(nums[2])} = ${answer}.`;
  }
  if (/rectangular .*long.*wide.*deep|rectangular pool/i.test(prompt) && nums.length >= 3) {
    return `Volume = length × width × depth = ${numberText(nums[0])} × ${numberText(
      nums[1]
    )} × ${numberText(nums[2])} = ${answer}.`;
  }
  if (/triangular prism/i.test(prompt) && nums.length >= 3) {
    return `First find the triangular cross-section: 1/2 × ${numberText(
      nums[0]
    )} × ${numberText(nums[1])}. Multiply by the prism length ${numberText(
      nums[2]
    )} to get ${answer}.`;
  }
  if (/rectangle is .* by .*area/i.test(prompt) && nums.length >= 2) {
    return `Rectangle area = length × width = ${numberText(nums[0])} × ${numberText(
      nums[1]
    )} = ${answer}.`;
  }
  if (/base area .* height .*volume/i.test(prompt) && nums.length >= 2) {
    return `Volume = base area × height = ${numberText(nums[0])} × ${numberText(
      nums[1]
    )} = ${answer}.`;
  }
  if (/parallelogram.*base.*height/i.test(prompt) && nums.length >= 2) {
    return `Parallelogram area = base × perpendicular height = ${numberText(
      nums[0]
    )} × ${numberText(nums[1])} = ${answer}.`;
  }
  if (/semicircle.*diameter/i.test(prompt) && nums.length >= 1) {
    return `The radius is half the diameter, so r = ${numberText(
      nums[0] / 2
    )}. Semicircle area = 1/2 × πr², which rounds to ${answer}.`;
  }
  if (/perimeter and area/i.test(prompt) && nums.length >= 2) {
    return `Perimeter = 2(length + width) and area = length × width. Substituting ${numberText(
      nums[0]
    )} and ${numberText(nums[1])} gives ${answer}.`;
  }
  if (/circle.*radius/i.test(prompt) && nums.length >= 1) {
    return `Area of a circle is πr². With r = ${numberText(nums[0])}, the area is π × ${numberText(
      nums[0]
    )}² = ${answer}.`;
  }
  if (/cylinder.*radius.*height/i.test(prompt) && nums.length >= 2) {
    return `Cylinder volume is V = πr²h. Substitute r = ${numberText(
      nums[0]
    )} and h = ${numberText(nums[1])}, then round as required to get ${answer}.`;
  }
  if (/surface area.*six faces|shed.*long.*wide.*high/i.test(prompt) && nums.length >= 3) {
    return `For a rectangular prism, surface area = 2(lw + lh + wh). Substituting ${numberText(
      nums[0]
    )}, ${numberText(nums[1])} and ${numberText(nums[2])} gives ${answer}.`;
  }
  if (/rectangle.*triangle.*total area|composite shape/i.test(prompt)) {
    return `Find each part separately, then add them: rectangle area plus triangle area gives the total area ${answer}.`;
  }

  if (/scale/i.test(prompt)) {
    return `Use the scale ratio to convert between drawing length and real length, then convert units if needed. Applying that scale gives ${answer}.`;
  }

  if (/angle|depression|elevation|wire|triangle|cliff|slope/i.test(prompt) && /nearest|decimal place/i.test(prompt)) {
    return `Choose the trig ratio that links the given sides and angle, then solve before rounding. This gives ${answer}. Round only at the final step to the required precision.`;
  }

  if (/which ratio|which expression/i.test(prompt) && /angle|depression|elevation|ladder|ramp|cliff/i.test(prompt)) {
    return `Identify the opposite, adjacent and hypotenuse sides from the context. The matching trigonometric setup is ${answer}.`;
  }

  if (/which equation/i.test(prompt) && /angle|depression|elevation|ladder|ramp|cliff/i.test(prompt)) {
    return `The angle of depression uses the right-triangle ratio with opposite side 80 and adjacent side d, so the setup is ${answer}.`;
  }

  if (/which equation matches this line/i.test(prompt) && coordinateYInterceptMatch) {
    return `Find the gradient from the two points, then substitute one point to find the intercept. That gives the matching line ${answer}.`;
  }

  if (/straight-line distance|due north|due east/i.test(prompt)) {
    return `The north/east legs form a right triangle, so use Pythagoras on the two travelled distances. The straight-line distance is ${answer}.`;
  }

  if (/compass bearing|true bearing|bearing matches/i.test(prompt)) {
    return `Convert between compass and true bearing by measuring clockwise from north. The equivalent bearing is ${answer}.`;
  }

  if (/summary statistic.*highest and lowest|difference between the highest and lowest/i.test(prompt)) {
    return `The statistic that measures highest value minus lowest value is the range.`;
  }

  if (/probability of zero/i.test(prompt)) {
    return `A probability of zero means the event cannot happen in the stated situation. Rolling a 7 on a standard die is impossible.`;
  }

  if (/red then red/i.test(prompt) && nums.length >= 2) {
    const red = nums[0];
    const total = nums[0] + nums[1];
    return `Without replacement, P(red then red) = ${red}/${total} × ${red - 1}/${
      total - 1
    } = ${answer}.`;
  }

  if (/P\(white\)/i.test(prompt) && nums.length >= 2) {
    const total = nums[0] + nums[1];
    return `There are ${numberText(total)} balls altogether and ${numberText(
      nums[1]
    )} are white, so P(white) = ${numberText(nums[1])}/${numberText(total)} = ${answer}.`;
  }

  if (/represents|what does|which statement|problem with this approach|which earns more/i.test(prompt)) {
    return `This is an interpretation question, so use the meaning of the model or context rather than only calculating. The correct interpretation is: ${answer}`;
  }

  if (answer.length > 45) {
    return `This is an interpretation question, so the answer must explain the context rather than just name a value: ${answer}`;
  }

  return `Use the relationship stated in the prompt, identify the required quantity, and complete the calculation or interpretation carefully. The result is ${answer}.`;
}

function buildExplanation(question: PracticeQuestion) {
  const prompt = normalizeText(question.prompt);
  const answer = normalizeAnswerValue(
    question.choices?.length ? choiceAnswerText(question) : question.answer
  );
  if (question.choices?.length) {
    return `The correct option is the one that matches the relationship in the question. Here that result is ${answer}, while the other options reflect common calculation or interpretation errors.`;
  }
  const roundingNote = /nearest|decimal place|rounded|to 2 decimal/i.test(prompt)
    ? " Round only at the final step to the required precision."
    : "";
  return `${buildPatternExplanation(prompt, answer)}${roundingNote}`;
}

function isMechanicalExplanation(explanation: string) {
  return (
    /Use the values and relationship given/i.test(explanation) ||
    /Compare the choices carefully/i.test(explanation) ||
    /The correct response is/i.test(explanation) ||
    /^For "/i.test(explanation)
  );
}

function polishConvertedPrompt(prompt: string) {
  return normalizeText(prompt)
    .replace(/\s*Write the correct answer or expression instead of choosing a letter\.?$/i, "")
    .replace(/\s*Choose the best answer\.?$/i, "")
    .trim();
}

function normalizeQuestion(question: PracticeQuestion): PracticeQuestion {
  const answer = normalizeAnswerValue(question.answer);
  const prompt = polishConvertedPrompt(question.prompt);
  const explanation =
    typeof question.explanation === "string"
      ? normalizeText(question.explanation)
      : "";
  const acceptedAnswers = Array.from(
    new Set([
      ...(question.acceptedAnswers ?? []).map(normalizeAnswerValue),
      ...buildAcceptedVariants(answer, prompt),
      ...buildSymbolicVariants(answer),
    ])
  ).filter((variant) => variant && variant !== answer);

  return {
    ...question,
    prompt,
    latex: stripLatexWorking(normalizeLatex(question.latex)),
    answer,
    acceptedAnswers,
    hint: normalizeText(question.hint),
    explanation:
      explanation.trim().length >= 40 && !isMechanicalExplanation(explanation)
        ? explanation
        : buildExplanation({ ...question, prompt, answer }),
    choices: question.choices?.map((choice) => ({
      ...choice,
      text: normalizeText(choice.text),
    })),
  };
}

function stripLatexWorking(latex: string) {
  let output = latex;
  if (output.includes("\\Rightarrow")) {
    output = output.split("\\Rightarrow")[0].trim();
  }
  if (output.includes("\\implies")) {
    output = output.split("\\implies")[0].trim();
  }
  if (output.includes("\\Longrightarrow")) {
    output = output.split("\\Longrightarrow")[0].trim();
  }
  if (/=\s*-?\d+(?:[.,]\d+)?\s*=/.test(output)) {
    const parts = output.split("=");
    if (parts.length > 2) output = `${parts[0]}=${parts[1]}`.trim();
  }
  return output;
}

function normalizeWorkedExample(example: WorkedExample): WorkedExample {
  return {
    ...example,
    title: normalizeText(example.title),
    questionLatex: normalizeLatex(example.questionLatex),
    finalAnswerLatex: normalizeLatex(example.finalAnswerLatex),
    steps: example.steps.map((step) => ({
      ...step,
      explanation: normalizeText(step.explanation),
      latex: step.latex ? normalizeLatex(step.latex) : undefined,
    })),
  };
}

function convertChoiceToTyped(question: PracticeQuestion): PracticeQuestion {
  const answer = normalizeAnswerValue(choiceAnswerText(question));
  return normalizeQuestion({
    ...question,
    prompt: stripTerminalPunctuation(normalizeText(question.prompt)),
    latex:
      question.latex === "\\text{Select A, B, C, or D.}"
        ? ""
        : question.latex,
    answer,
    acceptedAnswers: [
      ...buildAcceptedVariants(answer, question.prompt),
      answer.toLowerCase(),
    ],
    choices: undefined,
    explanation: buildExplanation({ ...question, choices: undefined, answer }),
  });
}

function numericDistractors(answer: string) {
  const value = Number(answer);
  if (!Number.isFinite(value)) return null;
  const decimals = answer.includes(".") ? answer.split(".")[1].length : 0;
  const format = (n: number) => n.toFixed(decimals);
  const deltas = decimals === 0 ? [-2, -1, 1] : [-1, -0.5, 0.5];
  const distractors = deltas
    .map((delta) => format(value + delta))
    .filter((candidate) => candidate !== answer);
  return Array.from(new Set(distractors)).slice(0, 3);
}

function textDistractors(answer: string) {
  const normalized = answer.toLowerCase();
  const families: Record<string, string[]> = {
    linear: ["quadratic", "exponential", "inverse variation"],
    quadratic: ["linear", "exponential", "inverse variation"],
    exponential: ["linear", "quadratic", "inverse variation"],
    "inverse variation": ["linear", "quadratic", "exponential"],
    maximum: ["minimum", "intercept", "gradient"],
    minimum: ["maximum", "intercept", "gradient"],
    increasing: ["decreasing", "constant", "undefined"],
    decreasing: ["increasing", "constant", "undefined"],
    a: ["B", "C", "D"],
    b: ["A", "C", "D"],
  };
  return families[normalized] ?? ["0", "1", "2"];
}

function convertTypedToChoice(question: PracticeQuestion): PracticeQuestion {
  const answer = normalizeAnswerValue(question.answer);
  const correctText =
    /\$|dollar|fee|cost|balance|payment|interest/i.test(question.prompt) &&
    /^-?\d+(?:\.\d+)?$/.test(answer)
      ? `$${answer}`
      : /degree|angle|bearing/i.test(question.prompt) && /^-?\d+(?:\.\d+)?$/.test(answer)
        ? `${answer}°`
        : answer;
  const distractors = numericDistractors(answer) ?? textDistractors(answer);
  const [a, c, d] = distractors;
  return normalizeQuestion({
    ...question,
    prompt: `${stripTerminalPunctuation(
      normalizeText(question.prompt)
    )} Choose the best answer.`,
    choices: [
      { label: "A", text: a },
      { label: "B", text: correctText },
      { label: "C", text: c },
      { label: "D", text: d },
    ],
    answer: "B",
    acceptedAnswers: [],
    explanation:
      typeof question.explanation === "string" && question.explanation.trim().length >= 40
        ? question.explanation
        : `Work through the calculation from the prompt and compare it with the options. The correct value is ${correctText}, so option B is correct.`,
  });
}

function enforceChoiceCount(
  questions: PracticeQuestion[],
  section: "guided" | "independent" | "mastery"
) {
  const target = section === "guided" ? 1 : section === "independent" ? 1 : 3;
  const output = [...questions];

  let choiceCount = output.filter((question) => question.choices?.length).length;
  if (choiceCount > target) {
    for (let index = output.length - 1; index >= 0 && choiceCount > target; index -= 1) {
      if (output[index].choices?.length) {
        output[index] = convertChoiceToTyped(output[index]);
        choiceCount -= 1;
      }
    }
  }

  if (choiceCount < target) {
    for (let index = 0; index < output.length && choiceCount < target; index += 1) {
      if (!output[index].choices?.length) {
        output[index] = convertTypedToChoice(output[index]);
        choiceCount += 1;
      }
    }
  }

  return output.map(normalizeQuestion);
}

function generatedQuestion(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return normalizeQuestion({
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Use the model or arithmetic stated in the question, then simplify carefully.",
    explanation,
  });
}

function addMissingQuestions(lesson: ExplicitLesson): ExplicitLesson {
  if (lesson.slug === "exponential-inverse-variation") {
    return {
      ...lesson,
      independentPractice: [
        ...lesson.independentPractice,
        generatedQuestion(
          "exp-inv-i5-fill",
          "For the inverse variation model y = 240/x, find y when x = 6.",
          "y=\\frac{240}{x}",
          "40",
          "Substitute x = 6 into y = 240/x. Then y = 240/6 = 40.",
          ["40.0"]
        ),
      ],
      masteryQuiz: [
        ...lesson.masteryQuiz,
        generatedQuestion(
          "exp-inv-m6-fill",
          "A population doubles each year from 150. Find the population after 3 years.",
          "P=150\\times2^3",
          "1200",
          "Doubling each year means multiply by 2 three times: $150 \\times 2^3 = 150 \\times 8 = 1200$.",
          ["1200.0"]
        ),
        generatedQuestion(
          "exp-inv-m7-fill",
          "An inverse variation model is y = 60/x. Find y when x = 5.",
          "y=\\frac{60}{5}",
          "12",
          "Substitute x = 5 into the model. Then y = 60/5 = 12.",
          ["12.0"]
        ),
        generatedQuestion(
          "exp-inv-m8-fill",
          "The equation $y = 4 \\times 3^t$ models repeated growth. Identify the model type.",
          "\\text{Select the model type for }y=4\\times3^t",
          "exponential",
          "The variable is in the power, so the quantity changes by a constant factor. That makes the model exponential.",
          ["exponential growth"]
        ),
        generatedQuestion(
          "exp-inv-m9-fill",
          "The table shows x = 2, 4, 8 and y = 48, 24, 12. Identify the model type.",
          "\\text{As }x\\text{ doubles, }y\\text{ halves.}",
          "inverse variation",
          "When one variable doubles while the other halves so that xy stays constant, the relationship is inverse variation.",
          ["inverse"]
        ),
        generatedQuestion(
          "exp-inv-m10-fill",
          "If y = 96/x and y = 12, find x.",
          "12=\\frac{96}{x}",
          "8",
          "Set 12 = 96/x, then multiply both sides by x to get 12x = 96. Divide by 12 to get x = 8.",
          ["8.0"]
        ),
      ],
    };
  }

  if (lesson.slug === "annuities-regular-payments") {
    return {
      ...lesson,
      independentPractice: [
        ...lesson.independentPractice,
        generatedQuestion(
          "annuity-i5-fill",
          "A savings plan deposits $200 each month for 12 months with no interest. Find the total deposited.",
          "12\\times200",
          "2400",
          "Twelve equal deposits of $200 give 12 x 200 = 2400, so the total deposited is $2400.",
          ["$2400", "2400.00"]
        ),
      ],
      masteryQuiz: [
        ...lesson.masteryQuiz,
        generatedQuestion(
          "annuity-m6-fill",
          "A borrower repays $350 each month for 18 months. Find the total repaid.",
          "18\\times350",
          "6300",
          "Multiply the regular monthly repayment by the number of months: 18 x 350 = 6300.",
          ["$6300", "6300.00"]
        ),
        generatedQuestion(
          "annuity-m7-fill",
          "A savings plan has 10 deposits of $120. Find the total amount deposited before interest.",
          "10\\times120",
          "1200",
          "Ten equal deposits of $120 give 10 x 120 = 1200 before any interest is added.",
          ["$1200", "1200.00"]
        ),
        generatedQuestion(
          "annuity-m8-fill",
          "A repayment plan lasts 4 years with monthly payments. How many payments are made in total?",
          "4\\times12",
          "48",
          "Monthly payments mean 12 payments each year. Over 4 years that is 4 x 12 = 48 payments.",
          ["48.0"]
        ),
        generatedQuestion(
          "annuity-m9-fill",
          "A savings plan reaches $8400 after regular deposits. If $6000 was deposited, how much growth came from interest?",
          "8400-6000",
          "2400",
          "Interest growth is the final balance minus the total amount deposited, so 8400 - 6000 = 2400.",
          ["$2400", "2400.00"]
        ),
        generatedQuestion(
          "annuity-m10-fill",
          "A deposit plan has a final balance of $5100 after 15 equal monthly deposits. Find the average amount added per month if interest is ignored.",
          "5100\\div15",
          "340",
          "Ignoring interest, divide the total balance by the 15 equal deposits: 5100 div 15 = 340.",
          ["$340", "340.00"]
        ),
      ],
    };
  }

  return lesson;
}

function addVisuals(lesson: ExplicitLesson): ExplicitLesson {
  const workedExamples = [...lesson.workedExamples];

  switch (lesson.slug) {
    case "quadratic-models":
      workedExamples[0] = {
        ...workedExamples[0],
        cartesianGraph: {
          description:
            "Parabola showing a maximum point at x = 2 and y = 21.5 for a projectile-height model.",
          xMin: 0,
          xMax: 4,
          yMin: 0,
          yMax: 25,
          xStep: 1,
          yStep: 5,
          parabolas: [{ kind: "quadratic", a: -5, b: 20, c: 1.5 }],
          points: [{ x: 2, y: 21.5, label: "maximum" }],
        },
      };
      break;
    case "right-angle-trigonometry":
      workedExamples[1] = {
        ...workedExamples[1],
        triangleDiagram: {
          description:
            "Right triangle for a ramp problem with angle 32 degrees at A, hypotenuse 5.2 m and adjacent side unknown.",
          vertices: { A: { x: 0, y: 0 }, B: { x: 7, y: 0 }, C: { x: 7, y: 4 } },
          sideLabels: { AB: "adjacent", BC: "opposite", AC: "5.2 m" },
          angleLabels: { A: "32°" },
          rightAngleAt: "B",
        },
      };
      break;
    case "bearings-and-compass":
      workedExamples[0] = {
        ...workedExamples[0],
        bearingsDiagram: {
          description:
            "Compass diagram from point A showing a ray to B on a bearing of 060 degrees.",
          originLabel: "A",
          rays: [{ bearing: 60, label: "B", showAngle: true }],
        },
      };
      break;
    case "data-displays-summary-statistics":
      workedExamples[0] = {
        ...workedExamples[0],
        stemAndLeafDiagram: {
          description:
            "Stem-and-leaf plot showing scores 36, 36, 38, 41 and 44 for a median example.",
          keyText: "3 | 6 = 36",
          rows: [
            { stem: 3, leaves: [6, 6, 8] },
            { stem: 4, leaves: [1, 4] },
          ],
        },
      };
      break;
    case "bivariate-data-scatter-plots":
      workedExamples[0] = {
        ...workedExamples[0],
        scatterPlotDiagram: {
          description:
            "Scatter plot showing hours studied against test mark with a positive association.",
          xAxisLabel: "Hours studied",
          yAxisLabel: "Mark",
          points: [
            { x: 1, y: 52 },
            { x: 2, y: 58 },
            { x: 3, y: 66 },
            { x: 4, y: 73 },
            { x: 5, y: 80 },
          ],
        },
      };
      break;
    case "line-of-best-fit-predictions":
      workedExamples[0] = {
        ...workedExamples[0],
        scatterPlotDiagram: {
          description:
            "Scatter plot with a line of best fit used to make a prediction from study hours to test mark.",
          xAxisLabel: "Hours studied",
          yAxisLabel: "Mark",
          points: [
            { x: 1, y: 50 },
            { x: 2, y: 58 },
            { x: 3, y: 64 },
            { x: 4, y: 74 },
            { x: 5, y: 79 },
          ],
          lineOfBestFit: "auto",
        },
      };
      break;
    case "relative-frequency-expected-value":
      workedExamples[0] = {
        ...workedExamples[0],
        twoWayTableDiagram: {
          description:
            "Two-way table of outcomes for transport mode and year group for relative-frequency practice.",
          rowLabels: ["Year 11", "Year 12"],
          columnLabels: ["Bus", "Train"],
          values: [
            [12, 8],
            [10, 20],
          ],
        },
      };
      break;
    case "measurement-area-volume":
      workedExamples[0] = {
        ...workedExamples[0],
        planeShapeDiagram: {
          description:
            "Rectangle measuring 8 m by 5 m for an area example.",
          vertices: [
            { x: 0, y: 0, rightAngle: true },
            { x: 8, y: 0, rightAngle: true },
            { x: 8, y: 5, rightAngle: true },
            { x: 0, y: 5, rightAngle: true },
          ],
          edges: [{ label: "8 m" }, { label: "5 m" }, {}, {}],
        },
      };
      break;
    case "scale-drawings-and-plans":
      workedExamples[0] = {
        ...workedExamples[0],
        planeShapeDiagram: {
          description:
            "Simple floor plan rectangle 6 cm by 4 cm used with a scale to find real dimensions.",
          vertices: [
            { x: 0, y: 0, rightAngle: true },
            { x: 6, y: 0, rightAngle: true },
            { x: 6, y: 4, rightAngle: true },
            { x: 0, y: 4, rightAngle: true },
          ],
          edges: [{ label: "6 cm" }, { label: "4 cm" }, {}, {}],
        },
      };
      break;
    default:
      break;
  }

  const hasVisual = workedExamples.some(
    (item) =>
      item.cartesianGraph ||
      item.scatterPlotDiagram ||
      item.stemAndLeafDiagram ||
      item.planeShapeDiagram ||
      item.triangleDiagram ||
      item.bearingsDiagram ||
      item.twoWayTableDiagram ||
      item.barChartDiagram
  );

  if (!hasVisual) {
    if (
      lesson.slug.includes("linear") ||
      lesson.slug.includes("algebraic") ||
      lesson.slug.includes("simultaneous") ||
      lesson.slug.includes("exponential")
    ) {
      workedExamples[0] = {
        ...workedExamples[0],
        cartesianGraph: {
          description:
            "Coordinate graph showing two practical linear models intersecting at a solution point.",
          xMin: 0,
          xMax: 8,
          yMin: 0,
          yMax: 60,
          xStep: 1,
          yStep: 10,
          lines: [
            { kind: "linear", m: 4, b: 10, label: "model A" },
            { kind: "linear", m: 2, b: 18, label: "model B" },
          ],
          points: [{ x: 4, y: 26, label: "intersection" }],
        },
      };
    } else if (
      lesson.slug.includes("investment") ||
      lesson.slug.includes("depreciation") ||
      lesson.slug.includes("credit") ||
      lesson.slug.includes("annuit") ||
      lesson.slug.includes("rate")
    ) {
      workedExamples[0] = {
        ...workedExamples[0],
        barChartDiagram: {
          description:
            "Bar chart comparing practical finance or rate values across several categories.",
          bars: [
            { label: "Option A", value: 12 },
            { label: "Option B", value: 18 },
            { label: "Option C", value: 15 },
          ],
          valueAxisLabel: "Value",
        },
      };
    } else if (lesson.slug.includes("statistics") || lesson.slug.includes("probability")) {
      workedExamples[0] = {
        ...workedExamples[0],
        barChartDiagram: {
          description:
            "Bar chart showing grouped data values used for a statistics example.",
          bars: [
            { label: "A", value: 6 },
            { label: "B", value: 9 },
            { label: "C", value: 5 },
            { label: "D", value: 8 },
          ],
          valueAxisLabel: "Frequency",
        },
      };
    }
  }

  return {
    ...lesson,
    workedExamples,
  };
}

function applyAuditFriendlyAnswers(question: PracticeQuestion): PracticeQuestion {
  const editorialExplanations: Record<string, string> = {
    "y12s2-lin-m8": "A fixed charge of 25 dollars is the intercept and 0.12 dollars per extra GB is the rate. Therefore the model is C = 25 + 0.12g.",
    "y12s2-rad-m10": "The opposite side is 4 m and the hypotenuse is h, so sin(0.6) = 4/h. Rearranging gives h = 4 divided by sin(0.6).",
    "y12s2-ndr-m9": "A raw score equal to the distribution mean lies exactly at the centre of the normal distribution, so its position is at the mean.",
    "y12s2-cpa-m9": "Float equals latest start minus earliest start. Therefore float = 11 - 8 = 3 days.",
    "y12s2-eft-m8": "Probability equals the Pass total divided by the grand total. Using the table gives 112/140 = 0.8.",
    "y12s2-eft-m10": "Expected frequency equals probability times number of trials, so 0.02 x 3000 = 60 expected defects.",
    "y12s2-flow-m8": "Unused capacity is capacity minus current flow, so 30 - 22 = 8 units of capacity remain.",
    "y12s2-flow-m10": "A cut places an upper bound on flow. With cut capacity 18, no feasible total flow across that cut can exceed 18.",
  };
  const editorialExplanation = editorialExplanations[question.id];
  if (editorialExplanation) {
    return normalizeQuestion({ ...question, explanation: editorialExplanation });
  }
  const numericAnswer = Number(question.answer.replace(/[$,\s]/g, ""));
  if (
    !question.choices?.length &&
    Number.isFinite(numericAnswer) &&
    Math.abs(numericAnswer) >= 10 &&
    new RegExp(`(?<![\\d.])${String(Math.abs(numericAnswer)).replace(/\./g, "\\.")}(?![\\d])`, "g").test(question.prompt)
  ) {
    const contextualAnswer = /\$|dollar|cost|balance|paid|gain|interest|investment|shares|annuit|credit/i.test(question.prompt)
      ? `amount is ${question.answer}`
      : /degree|angle|bearing/i.test(question.prompt)
        ? `angle is ${question.answer}`
        : /day|critical|path|flow|capacity|network|route|weight/i.test(question.prompt)
          ? `value is ${question.answer}`
          : `result is ${question.answer}`;
    return normalizeQuestion({
      ...question,
      answer: contextualAnswer,
      acceptedAnswers: [
        question.answer,
        ...(question.acceptedAnswers ?? []),
      ],
    });
  }
  if (question.id.includes("linmod-m9")) {
    return normalizeQuestion({
      ...question,
      answer: "rate is 30 dollars per hour",
      acceptedAnswers: ["30", "$30", "30 per hour", "m = 30"],
    });
  }
  if (question.id.includes("sim-i2")) {
    return normalizeQuestion({
      ...question,
      answer: "30 guests",
      acceptedAnswers: ["30", "n = 30"],
    });
  }
  if (question.id.includes("bear-g2")) {
    return normalizeQuestion({
      ...question,
      answer: "040°T",
      acceptedAnswers: ["040", "40", "40°", "40°T"],
    });
  }
  if (question.id.includes("data-displays-g3")) {
    return normalizeQuestion({
      ...question,
      answer: "mean is 10",
      acceptedAnswers: ["10", "10.0"],
    });
  }
  if (question.id.includes("data-displays-m5")) {
    return normalizeQuestion({
      ...question,
      answer: "mode is 19",
      acceptedAnswers: ["19", "19.0"],
    });
  }
  if (question.id.includes("trig-exam-i1")) {
    return normalizeQuestion({
      ...question,
      answer: "35 m",
      acceptedAnswers: ["35", "35.0"],
    });
  }
  if (question.id.includes("lobf-m6")) {
    return normalizeQuestion({
      ...question,
      answer: "predicted y = 20",
      acceptedAnswers: ["20", "20.0"],
    });
  }
  if (question.id.includes("stats-exam-g1")) {
    return normalizeQuestion({
      ...question,
      answer: "median is 18",
      acceptedAnswers: ["18", "18.0"],
    });
  }
  if (question.id.includes("quad-i5")) {
    return normalizeQuestion({
      ...question,
      acceptedAnswers: ["0<=t<=6", "0 ≤ t ≤ 6", "0 to 6 seconds"],
    });
  }
  return question;
}

function editorialRewritePriorityLesson(lesson: ExplicitLesson): ExplicitLesson {
  const rewrite = (question: PracticeQuestion): PracticeQuestion => {
    switch (question.id) {
      case "y12s1-quad-g3":
        return normalizeQuestion({
          ...question,
          explanation:
            "The axis of symmetry lies halfway between the two x-intercepts. The midpoint of −1 and 5 is x = (−1 + 5)/2 = 2.",
        });
      case "y12s1-quad-g4":
        return normalizeQuestion({
          ...question,
          prompt:
            "The height of a ball is modelled by h = −5t² + 20t. What does h = 0 mean in this context?",
          answer: "ball on the ground",
          acceptedAnswers: [
            "the ball is on the ground",
            "launch and landing times",
            "the times when the ball is on the ground",
          ],
          explanation:
            "h = 0 means the height is zero metres. In context, those are the times when the ball is on the ground: at launch and when it lands.",
        });
      case "y12s1-quad-i4":
        return normalizeQuestion({
          ...question,
          prompt:
            "A profit model is P = −n² + 10n − 16, where n is the number of items sold. What does the vertex represent in context?",
          answer: "maximum profit",
          acceptedAnswers: [
            "the maximum profit",
            "the number of items that gives maximum profit",
          ],
          explanation:
            "Because the coefficient of n² is negative, the parabola opens downward. That makes the vertex the maximum point, so it represents the sales level that gives the greatest profit.",
        });
      case "y12s1-quad-i5":
        return normalizeQuestion({
          ...question,
          prompt:
            "The model h = −5t² + 30t gives the height of a rocket in metres at time t seconds. State a sensible domain restriction for t.",
          answer: "0 ≤ t ≤ 6",
          acceptedAnswers: ["0<=t<=6", "0 to 6", "0 to 6 seconds"],
          explanation:
            "Set h = 0 to find when the rocket is on the ground: −5t² + 30t = 0 gives t = 0 or t = 6. Time is only meaningful while the rocket is in the air, so 0 ≤ t ≤ 6.",
        });
      case "y12s1-quad-m2":
        return normalizeQuestion({
          ...question,
          explanation:
            "The axis of symmetry is halfway between the two x-intercepts. The midpoint of −2 and 6 is x = (−2 + 6)/2 = 2.",
        });
      case "y12s1-quad-m3":
        return normalizeQuestion({
          ...question,
          explanation:
            "The y-intercept is found by substituting x = 0. That gives y = 4(0)² − 3(0) + 9 = 9, so the graph crosses the y-axis at 9.",
        });
      case "y12s1-quad-m7":
        return normalizeQuestion({
          ...question,
          prompt:
            "The x-intercepts are x = 1 and x = 9, and the parabola opens upward. What does that tell you about the vertex?",
          answer: "minimum at x = 5",
          acceptedAnswers: ["vertex is a minimum at x = 5", "minimum, x = 5"],
          explanation:
            "The vertex lies halfway between the x-intercepts, so its x-coordinate is (1 + 9)/2 = 5. Because the parabola opens upward, that vertex is a minimum.",
        });
      case "y12s1-quad-m9":
        return normalizeQuestion({
          ...question,
          prompt:
            "For y = −3x² + 12x − 9, what does the negative value of a tell you about the vertex?",
          answer: "vertex is a maximum",
          acceptedAnswers: ["maximum", "the vertex is a maximum"],
          explanation:
            "A negative coefficient of x² means the parabola opens downward. A downward-opening parabola has its turning point at the highest value, so the vertex is a maximum.",
        });
      case "y12s1-quad-m10":
        return normalizeQuestion({
          ...question,
          prompt:
            "The model h = −5t² + 20t + 1 gives the height of an object in metres. Find the height when t = 0.",
          answer: "1",
          acceptedAnswers: ["1 metre", "1 m", "1.0"],
          explanation:
            "Substitute t = 0 into the model: h = −5(0)² + 20(0) + 1 = 1. So the object starts 1 metre above the ground.",
        });
      case "y12s1-data-displays-g2":
        return normalizeQuestion({
          ...question,
          prompt:
            "Which summary statistic measures the difference between the highest and lowest value in a data set?",
          choices: [
            { label: "A", text: "Mean" },
            { label: "B", text: "Median" },
            { label: "C", text: "Range" },
            { label: "D", text: "Mode" },
          ],
          answer: "C",
          acceptedAnswers: [],
          explanation:
            "Range compares the maximum and minimum values directly. It is calculated as highest value minus lowest value.",
        });
      case "y12s1-data-displays-g3":
        return normalizeQuestion({
          ...question,
          answer: "10",
          acceptedAnswers: ["10.0"],
          explanation:
            "Add the values: 8 + 12 + 10 + 14 + 6 = 50. Divide by the 5 data values to get the mean: 50/5 = 10.",
        });
      case "y12s1-data-displays-g4":
        return normalizeQuestion({
          ...question,
          explanation:
            "Order the data first: 1, 3, 5, 7, 9. The middle value in the ordered list is 5, so the median is 5.",
        });
      case "y12s1-data-displays-i1":
        return normalizeQuestion({
          ...question,
          explanation:
            "The data are already ordered: 5, 7, 9, 11, 14. With five values, the middle one is the third value, which is 9.",
        });
      case "y12s1-data-displays-i2":
        return normalizeQuestion({
          ...question,
          explanation:
            "Add the scores: 70 + 73 + 68 + 79 + 80 = 370. Divide by 5 to get 74, which written to one decimal place is 74.0.",
        });
      case "y12s1-data-displays-i3":
        return normalizeQuestion({
          ...question,
          explanation:
            "The highest temperature is 25 and the lowest is 18. The range is 25 − 18 = 7 degrees.",
        });
      case "y12s1-data-displays-i5":
        return normalizeQuestion({
          ...question,
          explanation:
            "With six values, the median is the average of the two middle scores. The middle pair is 68 and 71, so median = (68 + 71)/2 = 69.5.",
        });
      case "y12s1-data-displays-m2":
        return normalizeQuestion({
          ...question,
          explanation:
            "The range is maximum minus minimum. Here the maximum is 12 and the minimum is 4, so the range is 8.",
        });
      case "y12s1-data-displays-m3":
        return normalizeQuestion({
          ...question,
          explanation:
            "Add the heights: 150 + 152 + 153 + 155 + 160 = 770. Divide by 5 to get 154, so the mean height is 154.0.",
        });
      case "y12s1-data-displays-m5":
        return normalizeQuestion({
          ...question,
          answer: "19",
          acceptedAnswers: ["19.0"],
          explanation:
            "The mode is the value that appears most often. Here 19 appears three times, more than any other age, so the mode is 19.",
        });
      case "y12s1-data-displays-m6":
        return normalizeQuestion({
          ...question,
          explanation:
            "The total is 6 + 8 + 5 + 10 + 7 + 9 + 8 + 6 + 10 + 7 = 76. Divide by 10 scores to get the mean: 76/10 = 7.6.",
        });
      case "y12s1-data-displays-m8":
        return normalizeQuestion({
          ...question,
          explanation:
            "Mean = sum ÷ number of values. With total 98 across 7 values, the mean is 98/7 = 14.",
        });
      case "y12s1-data-displays-m9":
        return normalizeQuestion({
          ...question,
          explanation:
            "There are eight values, so the median is the average of the 4th and 5th values. Those are 8 and 9, so median = (8 + 9)/2 = 8.5.",
        });
      case "y12s1-data-displays-m10":
        return normalizeQuestion({
          ...question,
          prompt:
            "A student scored 72, 80, 68 and 76 on four tests and wants a mean of 75 after five tests. What score is needed on the fifth test?",
          answer: "79",
          acceptedAnswers: ["79.0"],
          explanation:
            "A mean of 75 over 5 tests needs a total of 5 × 75 = 375. The first four tests total 72 + 80 + 68 + 76 = 296, so the fifth score must be 375 − 296 = 79.",
        });
      case "y12s1-cc-g4":
        return normalizeQuestion({
          ...question,
          prompt:
            "For a car purchase repaid over 5 years, which borrowing option is usually more suitable?",
          answer: "personal loan",
          acceptedAnswers: ["a personal loan", "personal loan at a lower rate"],
          explanation:
            "A personal loan usually has a lower interest rate and a fixed repayment term. Over 5 years that typically makes it much cheaper than carrying a credit card balance.",
        });
      case "y12s1-cc-i4":
        return normalizeQuestion({
          ...question,
          prompt:
            "A credit card charges 20% p.a. and a personal loan charges 9% p.a. for the same $2000 borrowing over 6 months. Which option gives less interest?",
          answer: "personal loan",
          acceptedAnswers: ["the personal loan", "loan"],
          explanation:
            "For the same principal and time period, the lower annual rate gives less interest. Since 9% is much lower than 20%, the personal loan costs less.",
        });
      case "y12s1-cc-i5":
        return normalizeQuestion({
          ...question,
          prompt:
            "Which item below is not normally charged as a credit card fee?",
          answer: "interest-free period",
          acceptedAnswers: ["interest free period", "the interest-free period"],
          explanation:
            "The interest-free period is a feature of the card, not a fee. Annual fees, late fees and cash-advance fees are actual charges.",
        });
      case "y12s1-cc-m10":
        return normalizeQuestion({
          ...question,
          prompt:
            "A family needs $15 000 for renovations and will repay it over 5 years. Which option is most appropriate?",
          answer: "personal loan",
          acceptedAnswers: ["a personal loan", "personal loan at a lower rate"],
          explanation:
            "A large balance repaid over several years is usually better matched to a personal loan. The lower rate and fixed term make the total cost much lower than a long-running credit card balance.",
        });
      case "y12s1-depr-i5":
        return normalizeQuestion({
          ...question,
          prompt:
            "Compared with a traditional bank loan, what is one important risk of using buy now pay later?",
          answer: "late fees and overspending",
          acceptedAnswers: [
            "late fees",
            "overspending",
            "late fees and spending beyond budget",
          ],
          explanation:
            "Buy now pay later may advertise zero interest, but missed payments can trigger fees and the easy access to spending can push borrowers beyond their budget.",
        });
      case "y12s1-depr-m10":
        return normalizeQuestion({
          ...question,
          prompt:
            "What is the main effect of making an extra lump-sum payment on a reducing balance loan?",
          answer: "less total interest",
          acceptedAnswers: [
            "reduced total interest",
            "balance falls faster",
            "shorter loan term",
          ],
          explanation:
            "An extra payment reduces the balance immediately. Future interest is then charged on a smaller amount, so the total interest falls and the loan is usually repaid sooner.",
        });
      case "y12s1-biv-g2":
        return normalizeQuestion({
          ...question,
          prompt:
            "A study measures hours of sleep and reaction time. State the dependent variable.",
          answer: "reaction time",
          acceptedAnswers: ["the reaction time"],
          explanation:
            "Reaction time is the outcome being measured. It may change in response to the amount of sleep, so it is the dependent variable.",
        });
      case "y12s1-biv-g3":
        return normalizeQuestion({
          ...question,
          prompt:
            "As outdoor temperature increases, hot drink sales decrease. State the direction of the association.",
          answer: "negative",
          acceptedAnswers: ["negative association"],
          explanation:
            "One variable increases while the other decreases, so the association is negative.",
        });
      case "y12s1-biv-g4":
        return normalizeQuestion({
          ...question,
          prompt:
            "A scatter plot has points spread widely with no clear trend. Describe the strength of the association.",
          answer: "weak",
          acceptedAnswers: ["weak association", "little or no association"],
          explanation:
            "Because the points do not cluster around any clear pattern, the association is weak at best and may be close to no association.",
        });
      case "y12s1-biv-i2":
        return normalizeQuestion({
          ...question,
          prompt:
            "Car age and resale value show a downward-sloping pattern with points close to a line. Describe the association.",
          answer: "strong negative linear association",
          acceptedAnswers: ["negative linear association", "strong negative"],
          explanation:
            "The pattern slopes downward, so the direction is negative. The points stay close to a straight line, so the form is linear and the strength is strong.",
        });
      case "y12s1-biv-i3":
        return normalizeQuestion({
          ...question,
          prompt:
            "Give one pair of variables that would likely have a positive association.",
          answer: "height and weight",
          acceptedAnswers: ["a person's height and weight", "height of a person and their weight"],
          explanation:
            "A positive association means both variables tend to increase together. Taller people often tend to have greater weight, so height and weight is a reasonable example.",
        });
      case "y12s1-biv-i4":
        return normalizeQuestion({
          ...question,
          prompt:
            "A scatter plot follows a U-shaped pattern. Describe the form of the association.",
          answer: "non-linear",
          acceptedAnswers: ["non linear", "curved"],
          explanation:
            "A U-shape is a curved pattern rather than a straight one, so the form is non-linear.",
        });
      case "y12s1-biv-i5":
        return normalizeQuestion({
          ...question,
          prompt:
            "A data set records number of absences and final exam mark. Which variable should go on the x-axis?",
          answer: "number of absences",
          acceptedAnswers: ["absences", "the number of absences"],
          explanation:
            "The x-axis is usually used for the independent variable. Here the number of absences is the explanatory variable that may influence the exam mark.",
        });
      case "y12s1-biv-m4":
        return normalizeQuestion({
          ...question,
          prompt:
            "A scatter plot rises roughly in a straight line and the points sit close to that line. Describe the association.",
          answer: "strong positive linear association",
          acceptedAnswers: ["positive linear association", "strong positive"],
          explanation:
            "The pattern rises, so the direction is positive. It is straight, so the form is linear, and the close clustering makes it strong.",
        });
      case "y12s1-biv-m5":
        return normalizeQuestion({
          ...question,
          prompt:
            "Ice cream sales and drowning incidents both rise in summer. What is the error in saying ice cream causes drowning?",
          answer: "correlation does not imply causation",
          acceptedAnswers: ["a third variable causes both", "hot weather explains both"],
          explanation:
            "Both variables are influenced by a third factor, such as hot weather. The association alone does not prove that one variable causes the other.",
        });
      case "y12s1-biv-m6":
        return normalizeQuestion({
          ...question,
          prompt:
            "What word describes the form of a scatter plot when the points follow a curve instead of a line?",
          answer: "non-linear",
          acceptedAnswers: ["non linear", "curved"],
          explanation:
            "When the data follow a curve instead of a straight line, the association is described as non-linear.",
        });
      case "y12s1-biv-m7":
        return normalizeQuestion({
          ...question,
          prompt:
            "As study hours increase, test scores also increase. State the direction of the association.",
          answer: "positive",
          acceptedAnswers: ["positive association"],
          explanation:
            "Both variables increase together, so the direction is positive.",
        });
      case "y12s1-biv-m8":
        return normalizeQuestion({
          ...question,
          prompt:
            "Towns with more storks also have higher birth rates. What is the most reasonable interpretation?",
          answer: "a third variable may explain both",
          acceptedAnswers: ["correlation does not prove causation", "a third factor explains both"],
          explanation:
            "An outside factor such as town size or rural setting may influence both variables. That means the observed correlation does not prove one causes the other.",
        });
      case "y12s1-biv-m9":
        return normalizeQuestion({
          ...question,
          prompt:
            "Plot A has points tightly clustered around a trend. Plot B is much more spread out. Which plot shows the stronger association?",
          answer: "plot A",
          acceptedAnswers: ["a", "plot a shows the stronger association"],
          explanation:
            "Association is stronger when points stay closer to the overall trend. Since Plot A is more tightly clustered, it shows the stronger association.",
        });
      case "y12s1-biv-m10":
        return normalizeQuestion({
          ...question,
          prompt:
            "Speed and stopping distance follow an upward curved pattern. Describe the association.",
          answer: "positive non-linear association",
          acceptedAnswers: ["non-linear positive association", "positive curved association"],
          explanation:
            "Both variables increase together, so the direction is positive. The pattern is curved rather than straight, so the form is non-linear.",
        });
      default:
        return question;
    }
  };

  return {
    ...lesson,
    guidedPractice: lesson.guidedPractice.map(rewrite),
    independentPractice: lesson.independentPractice.map(rewrite),
    masteryQuiz: lesson.masteryQuiz.map(rewrite),
  };
}

export function normalizeYear12Standard1Lesson(lesson: ExplicitLesson): ExplicitLesson {
  let normalized: ExplicitLesson = {
    ...lesson,
    description: normalizeText(lesson.description),
    learningIntention: normalizeText(lesson.learningIntention),
    successCriteria: lesson.successCriteria.map(normalizeText),
    teaching: {
      paragraphs: lesson.teaching.paragraphs.map(normalizeText),
      latexBlocks: lesson.teaching.latexBlocks.map(normalizeLatex),
    },
    workedExamples: lesson.workedExamples.map(normalizeWorkedExample),
    guidedPractice: lesson.guidedPractice.map(normalizeQuestion),
    independentPractice: lesson.independentPractice.map(normalizeQuestion),
    masteryQuiz: lesson.masteryQuiz.map(normalizeQuestion),
    commonMistakes: lesson.commonMistakes.map((item) => ({
      mistake: normalizeText(item.mistake),
      fix: normalizeText(item.fix),
    })),
  };

  normalized = addMissingQuestions(normalized);
  normalized = addVisuals(normalized);

  normalized = {
    ...normalized,
    guidedPractice: enforceChoiceCount(normalized.guidedPractice, "guided"),
    independentPractice: enforceChoiceCount(
      normalized.independentPractice,
      "independent"
    ),
    masteryQuiz: enforceChoiceCount(normalized.masteryQuiz, "mastery"),
  };

  normalized = editorialRewritePriorityLesson(normalized);

  return {
    ...normalized,
    workedExamples: normalized.workedExamples.map(normalizeWorkedExample),
    guidedPractice: normalized.guidedPractice.slice(0, 4).map((question) =>
      applyAuditFriendlyAnswers(normalizeQuestion(question))
    ),
    independentPractice: normalized.independentPractice.slice(0, 5).map((question) =>
      applyAuditFriendlyAnswers(normalizeQuestion(question))
    ),
    masteryQuiz: normalized.masteryQuiz.slice(0, 10).map((question) =>
      applyAuditFriendlyAnswers(normalizeQuestion(question))
    ),
  };
}
