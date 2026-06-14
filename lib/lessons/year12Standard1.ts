import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";
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
        "C",
        [
          "\sin\theta=\frac{9}{12}",
          "\cos\theta=\frac{9}{12}",
          "\tan\theta=\frac{9}{12}",
          "\sin\theta=\frac{12}{9}",
        ],
        "The ladder is the hypotenuse and the height is opposite the angle at the ground, so use sine."
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
        "B",
        [
          "\sin22^\circ=\frac{30}{\text{path}}",
          "\cos22^\circ=\frac{30}{\text{path}}",
          "\tan22^\circ=\frac{30}{\text{path}}",
          "\sin22^\circ=\frac{\text{path}}{30}",
        ],
        "The width is opposite the angle and the path is the hypotenuse, so cosine matches the ratio."
      ),
      measurementAnswer(
        "right-angle-trig-m2",
        "A ramp makes an angle of 28° with the ground and reaches a platform 4.8 m high. Find the ramp length to one decimal place.",
        "\frac{4.8}{\sin28^\circ}",
        "10.3",
        ["10.30"]
      ),
      measurementAnswer(
        "right-angle-trig-m3",
        "A right triangle has opposite side 7 and adjacent side 24. Find the acute angle \(\theta\) to the nearest degree.",
        "\tan\theta=\frac{7}{24}",
        "16",
        ["16°", "16 degrees"]
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
        "154.0",
        "154.0",
        ["154"]
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
        "A box has base area 14 cm^2 and height 4 cm. Find its volume.",
        "14\times4",
        "56",
        ["56 cm^3"]
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
        "To find an angle from two known sides, use the inverse function: \\(\\theta = \\tan^{-1}\\!\\left(\\tfrac{\\text{opp}}{\\text{adj}}\\right)\\), or \\(\\sin^{-1}\\) or \\(\\cos^{-1}\\) as appropriate. Round angles to the nearest degree unless told otherwise.",
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
