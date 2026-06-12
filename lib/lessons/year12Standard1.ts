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
