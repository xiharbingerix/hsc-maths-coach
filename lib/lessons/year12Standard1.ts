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
