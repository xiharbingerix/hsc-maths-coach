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
