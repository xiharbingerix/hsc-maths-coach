import type { ExplicitLesson } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, dataAnswer } from "../questionHelpers";
export function year11AdvancedProbabilityDataLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "probability-data") {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "data-displays-summary-statistics") {
    return {
      ...base,
      description:
        "Use data type, frequency tables, centre, spread, IQR, and outlier fences to summarise data.",
      learningIntention:
        "Summarise and interpret data using appropriate measures of centre, spread, frequency, and outlier checks.",
      successCriteria: [
        "Classify data as categorical, numerical, discrete, or continuous.",
        "Read counts and frequencies from compact tables.",
        "Calculate mean, median, mode, range, and IQR.",
        "Use the five-number summary to identify quartiles and spread.",
        "Apply outlier fences and choose resistant summary statistics.",
      ],
      teaching: {
        paragraphs: [
          "Data can be categorical, such as a phone brand, or numerical, such as a time or score. Numerical data can be discrete when it is counted, or continuous when it is measured.",
          "A frequency table records how often each value or category occurs. For numerical data, the mean from a frequency table is found by multiplying each value by its frequency, adding the products, and dividing by the total frequency.",
          "The mean, median, and mode describe centre. The range and interquartile range describe spread.",
          "The five-number summary is the minimum, lower quartile, median, upper quartile, and maximum. The IQR is the upper quartile minus the lower quartile.",
          "Outlier fences are used to detect unusually low or high values. The median and IQR are usually better than the mean and range when data is skewed or has an outlier.",
        ],
        latexBlocks: [
          "\\bar{x}=\\frac{\\sum x}{n}",
          "\\bar{x}=\\frac{\\sum xf}{\\sum f}\\quad \\text{for a frequency table}",
          "IQR=Q_3-Q_1",
          "\\text{lower fence}=Q_1-1.5(IQR),\\quad \\text{upper fence}=Q_3+1.5(IQR)",
        ],
      },
      workedExamples: [
        {
          title: "Median and IQR from sorted data",
          questionLatex:
            "\\text{Scores: }12,\\ 14,\\ 15,\\ 18,\\ 20,\\ 22,\\ 30",
          steps: [
            {
              explanation: "There are 7 values, so the median is the 4th value.",
              latex: "\\text{median}=18",
            },
            {
              explanation: "The lower half is 12, 14, 15, so the lower quartile is 14.",
              latex: "Q_1=14",
            },
            {
              explanation: "The upper half is 20, 22, 30, so the upper quartile is 22.",
              latex: "Q_3=22",
            },
            {
              explanation: "Subtract the quartiles to find the IQR.",
              latex: "IQR=22-14=8",
            },
          ],
          finalAnswerLatex: "\\text{median}=18,\\quad IQR=8",
        },
        {
          title: "Mean from a frequency table",
          questionLatex:
            "\\begin{array}{c|cccc}\\text{score}&1&2&3&4\\\\ \\hline \\text{frequency}&2&3&4&1\\end{array}",
          steps: [
            {
              explanation: "Multiply each score by its frequency.",
              latex: "1(2)+2(3)+3(4)+4(1)=24",
            },
            {
              explanation: "Add the frequencies.",
              latex: "2+3+4+1=10",
            },
            {
              explanation: "Divide the weighted total by the total frequency.",
              latex: "\\bar{x}=\\frac{24}{10}=2.4",
            },
          ],
          finalAnswerLatex: "2.4",
        },
        {
          title: "Apply the outlier test",
          questionLatex:
            "Q_1=10,\\quad Q_3=18,\\quad \\text{test value}=32",
          steps: [
            {
              explanation: "Find the IQR.",
              latex: "IQR=18-10=8",
            },
            {
              explanation: "Find the fences.",
              latex:
                "10-1.5(8)=-2,\\quad 18+1.5(8)=30",
            },
            {
              explanation: "Compare the test value with the fences.",
              latex: "32>30",
            },
          ],
          finalAnswerLatex: "32\\text{ is an outlier.}",
        },
        {
          title: "Choose a resistant measure of centre",
          questionLatex: "18,\\ 19,\\ 20,\\ 21,\\ 70",
          steps: [
            {
              explanation: "The large value pulls the mean upward.",
              latex: "\\bar{x}=\\frac{148}{5}=29.6",
            },
            {
              explanation: "The median remains the middle value.",
              latex: "\\text{median}=20",
            },
          ],
          finalAnswerLatex:
            "\\text{The median better represents the centre because of the outlier.}",
        },
      ],
      guidedPractice: [
        dataAnswer("y11adv-pd-data-g1", "Find the median of the sorted data set.", "6,\\ 8,\\ 9,\\ 12,\\ 15", "9"),
        dataAnswer("y11adv-pd-data-g2", "Find the interquartile range from the displayed quartiles.", "Q_1=11,\\quad Q_3=19", "8"),
        dataAnswer("y11adv-pd-data-g3", "Find the mean of the data set.", "4,\\ 5,\\ 6,\\ 9", "6"),
        practicalChoice("y11adv-pd-data-g4", "Which data type best describes the number of siblings in a class survey?", "B", ["Categorical", "Discrete numerical", "Continuous numerical", "Ordinal only"], "The number of siblings is counted, so it is discrete numerical data."),
      ],
      independentPractice: [
        dataAnswer("y11adv-pd-data-i1", "Find the range of the data set.", "14,\\ 18,\\ 19,\\ 21,\\ 30", "16"),
        dataAnswer("y11adv-pd-data-i2", "Find the mean from the frequency table. Give the exact fraction.", "\\begin{array}{c|ccc}x&2&4&6\\\\ \\hline f&3&2&1\\end{array}", "10/3"),
        dataAnswer("y11adv-pd-data-i3", "Find the mode from the frequency table.", "\\begin{array}{c|cccc}x&1&2&3&4\\\\ \\hline f&2&5&3&1\\end{array}", "2"),
        practicalChoice("y11adv-pd-data-i4", "Using the displayed fences, decide whether the test value is an outlier.", "A", ["It is an outlier", "It is not an outlier", "It is the median", "It is the IQR"], "A value greater than the upper fence is an outlier.", "\\text{lower fence}=4,\\quad \\text{upper fence}=28,\\quad \\text{test value}=31"),
        practicalChoice("y11adv-pd-data-i5", "Which measure of centre is more appropriate for a strongly skewed data set with one extreme value?", "C", ["Mean", "Range", "Median", "Maximum"], "The median is resistant to extreme values."),
      ],
      commonMistakes: [
        { mistake: "Using the unsorted order when finding the median or quartiles.", fix: "Sort the data first, then locate the middle positions." },
        { mistake: "Dividing by the number of rows instead of the total frequency.", fix: "For a frequency table, divide by the sum of the frequencies." },
        { mistake: "Calling every large value an outlier.", fix: "Use the lower and upper fences before deciding." },
        { mistake: "Using the mean when an outlier makes the centre misleading.", fix: "Use the median when data is skewed or contains an extreme value." },
      ],
      masteryQuiz: [
        dataAnswer("y11adv-pd-data-m1", "Find the median of the sorted data set.", "7,\\ 9,\\ 10,\\ 14,\\ 18", "10"),
        dataAnswer("y11adv-pd-data-m2", "Find the range of the data set.", "3,\\ 8,\\ 12,\\ 17", "14"),
        dataAnswer("y11adv-pd-data-m3", "Find the interquartile range from the displayed quartiles.", "Q_1=6,\\quad Q_3=15", "9"),
        dataAnswer("y11adv-pd-data-m4", "Find the mean from the frequency table. Give the exact fraction.", "\\begin{array}{c|ccc}x&1&2&5\\\\ \\hline f&2&3&1\\end{array}", "13/6"),
        dataAnswer("y11adv-pd-data-m5", "Find the mode from the frequency table.", "\\begin{array}{c|cccc}x&4&5&6&7\\\\ \\hline f&1&4&2&3\\end{array}", "5"),
        practicalChoice("y11adv-pd-data-m6", "Using the displayed outlier fences, classify the test value.", "B", ["Not an outlier", "High outlier", "Low outlier", "The upper quartile"], "The test value is greater than the upper fence.", "\\text{lower fence}=2,\\quad \\text{upper fence}=26,\\quad \\text{test value}=29"),
        practicalChoice("y11adv-pd-data-m7", "Which statistic is affected most by replacing the largest value with a much larger value?", "A", ["Mean", "Median", "Lower quartile", "Sample size"], "The mean uses every value, so an extreme maximum can pull it strongly."),
        practicalChoice("y11adv-pd-data-m8", "Which statement best describes why the median is chosen here?", "D", ["The data has no centre", "The range is zero", "The frequency table is invalid", "The data is skewed by an extreme value"], "The median is resistant when one value is unusually large.", "12,\\ 13,\\ 13,\\ 14,\\ 80"),
        dataAnswer("y11adv-pd-data-m9", "Find the upper fence for the displayed summary values.", "Q_1=20,\\quad Q_3=32", "50"),
        practicalChoice("y11adv-pd-data-m10", "Which value should be used as the lower quartile for this sorted data set?", "B", ["5", "7", "12", "19"], "With 7 values, exclude the median; the lower half is 5, 7, 9, so $Q_1=7$.", "5,\\ 7,\\ 9,\\ 12,\\ 15,\\ 19,\\ 24"),
      ],
    };
  }

  if (lesson.slug === "probability-relative-frequency") {
    return {
      ...base,
      description:
        "Calculate classical, relative-frequency, complementary, addition-rule, conditional, and independence probabilities.",
      learningIntention:
        "Use sample spaces, events, two-way tables, relative frequency, and probability rules to solve markable probability questions.",
      successCriteria: [
        "Calculate classical probability from equally likely outcomes.",
        "Use complements and addition rules accurately.",
        "Interpret relative frequency as an estimate of probability.",
        "Read joint and marginal frequencies from two-way tables.",
        "Use conditional probability and independence tests in simple contexts.",
      ],
      teaching: {
        paragraphs: [
          "A sample space is the set of possible outcomes. An event is a subset of the sample space.",
          "For equally likely outcomes, probability is the number of favourable outcomes divided by the total number of outcomes.",
          "The complement rule finds the probability that an event does not happen. Addition rules combine probabilities for events.",
          "Relative frequency estimates probability using observed data. As the number of trials increases, relative frequency often becomes a more reliable estimate.",
          "Two-way tables show joint frequencies inside the table and marginal totals on the edges. Conditional probability restricts attention to one row, column, or group.",
        ],
        latexBlocks: [
          "P(A)=\\frac{n(A)}{n(S)}",
          "P(A')=1-P(A)",
          "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
          "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
          "A\\text{ and }B\\text{ independent if }P(A\\cap B)=P(A)P(B)",
        ],
      },
      workedExamples: [
        {
          title: "Classical probability and complement",
          questionLatex:
            "\\text{A fair die is rolled. }A=\\{2,4,6\\}.",
          steps: [
            {
              explanation: "There are 3 favourable outcomes out of 6.",
              latex: "P(A)=\\frac{3}{6}=\\frac{1}{2}",
            },
            {
              explanation: "Use the complement rule.",
              latex: "P(A')=1-\\frac{1}{2}=\\frac{1}{2}",
            },
          ],
          finalAnswerLatex: "P(A)=\\frac{1}{2},\\quad P(A')=\\frac{1}{2}",
        },
        {
          title: "Conditional probability from a two-way table",
          questionLatex:
            "\\begin{array}{c|cc|c}&\\text{Bus}&\\text{Train}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&12&30\\\\ \\text{Year 12}&10&20&30\\\\ \\hline \\text{Total}&28&32&60\\end{array}",
          steps: [
            {
              explanation: "Restrict attention to Year 11 students.",
              latex: "\\text{Year 11 total}=30",
            },
            {
              explanation: "There are 12 Year 11 students who use the train.",
              latex: "P(\\text{Train}\\mid \\text{Year 11})=\\frac{12}{30}=\\frac{2}{5}",
            },
          ],
          finalAnswerLatex: "\\frac{2}{5}",
        },
        {
          title: "Use the addition rule with overlap",
          questionLatex:
            "P(A)=0.45,\\quad P(B)=0.30,\\quad P(A\\cap B)=0.10",
          steps: [
            {
              explanation: "Add the two probabilities, then subtract the overlap once.",
              latex: "P(A\\cup B)=0.45+0.30-0.10",
            },
            {
              explanation: "Calculate the union probability.",
              latex: "P(A\\cup B)=0.65",
            },
          ],
          finalAnswerLatex: "0.65",
        },
        {
          title: "Test independence",
          questionLatex:
            "P(A)=0.4,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2",
          steps: [
            {
              explanation: "Multiply the individual probabilities.",
              latex: "P(A)P(B)=0.4(0.5)=0.2",
            },
            {
              explanation: "Compare with the intersection probability.",
              latex: "P(A\\cap B)=0.2",
            },
          ],
          finalAnswerLatex: "\\text{The events are independent.}",
        },
      ],
      guidedPractice: [
        dataAnswer("y11adv-pd-prob-g1", "Find the probability of choosing a red counter.", "\\text{bag: }3\\text{ red},\\ 7\\text{ blue}", "3/10", ["0.3", "0.30"]),
        dataAnswer("y11adv-pd-prob-g2", "Use the complement rule to find the probability that the event does not occur.", "P(A)=0.4", "0.6", ["3/5", "0.60"]),
        dataAnswer("y11adv-pd-prob-g3", "Find the relative frequency of success.", "\\text{successes}=18,\\quad \\text{trials}=60", "3/10", ["0.3", "0.30"]),
        practicalChoice("y11adv-pd-prob-g4", "From the two-way table, find the conditional probability that a selected student studies music, given that the student is in Year 11.", "B", ["$10/40$", "$16/40$", "$16/70$", "$40/70$"], "Conditioning on Year 11 means use the Year 11 row total as the denominator.", "\\begin{array}{c|cc|c}&\\text{Music}&\\text{No music}&\\text{Total}\\\\ \\hline \\text{Year 11}&16&24&40\\\\ \\text{Year 12}&10&20&30\\\\ \\hline \\text{Total}&26&44&70\\end{array}"),
      ],
      independentPractice: [
        dataAnswer("y11adv-pd-prob-i1", "Find the probability of selecting a vowel from the displayed letters.", "\\{A,\\ B,\\ C,\\ D,\\ E\\}", "2/5", ["0.4", "0.40"]),
        dataAnswer("y11adv-pd-prob-i2", "Use the general addition rule to find the union probability.", "P(A)=0.5,\\quad P(B)=0.3,\\quad P(A\\cap B)=0.1", "0.7", ["7/10", "0.70"]),
        practicalChoice("y11adv-pd-prob-i3", "From the two-way table, choose the joint probability that a selected customer bought online and used a coupon.", "C", ["$18/80$", "$30/80$", "$12/80$", "$12/30$"], "The joint frequency for online and coupon is 12 out of 80 customers.", "\\begin{array}{c|cc|c}&\\text{Coupon}&\\text{No coupon}&\\text{Total}\\\\ \\hline \\text{Online}&12&18&30\\\\ \\text{Store}&8&42&50\\\\ \\hline \\text{Total}&20&60&80\\end{array}"),
        practicalChoice("y11adv-pd-prob-i4", "Decide whether the events are independent.", "A", ["Independent", "Not independent", "Mutually exclusive", "Impossible"], "Since $P(A)P(B)=0.6(0.5)=0.3$, which equals $P(A\\cap B)$, the events are independent.", "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.3"),
        dataAnswer("y11adv-pd-prob-i5", "Find the probability that either event occurs when the events are mutually exclusive.", "P(A)=\\frac{1}{4},\\quad P(B)=\\frac{1}{2}", "3/4", ["0.75"]),
      ],
      commonMistakes: [
        { mistake: "Using the whole table denominator for conditional probability.", fix: "Once a condition is given, use the total for that condition as the denominator." },
        { mistake: "Adding overlapping events without subtracting the overlap.", fix: "Use $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$." },
        { mistake: "Assuming relative frequency is always the exact theoretical probability.", fix: "Relative frequency is an estimate from observed trials." },
        { mistake: "Confusing mutually exclusive with independent.", fix: "Mutually exclusive events cannot occur together; independent events do not affect each other's probabilities." },
      ],
      masteryQuiz: [
        dataAnswer("y11adv-pd-prob-m1", "Find the probability of selecting a blue counter.", "\\text{bag: }4\\text{ blue},\\ 6\\text{ green}", "2/5", ["0.4", "0.40"]),
        dataAnswer("y11adv-pd-prob-m2", "Use the complement rule to find the probability that the event occurs.", "P(A')=\\frac{3}{10}", "7/10", ["0.7", "0.70"]),
        dataAnswer("y11adv-pd-prob-m3", "Find the relative frequency of the outcome.", "\\text{outcome count}=45,\\quad \\text{trials}=100", "0.45", ["45/100", "9/20"]),
        dataAnswer("y11adv-pd-prob-m4", "Use the addition rule for mutually exclusive events.", "P(A)=\\frac{1}{5},\\quad P(B)=\\frac{2}{5}", "3/5", ["0.6", "0.60"]),
        practicalChoice("y11adv-pd-prob-m5", "From the two-way table, choose the probability that a selected person owns a laptop and a tablet.", "A", ["$18/90$", "$18/50$", "$32/90$", "$50/90$"], "The joint frequency is 18 out of the 90 people surveyed.", "\\begin{array}{c|cc|c}&\\text{Tablet}&\\text{No tablet}&\\text{Total}\\\\ \\hline \\text{Laptop}&18&32&50\\\\ \\text{No laptop}&12&28&40\\\\ \\hline \\text{Total}&30&60&90\\end{array}"),
        practicalChoice("y11adv-pd-prob-m6", "From the two-way table, find the conditional probability that a person owns a tablet, given that they own a laptop.", "D", ["$18/90$", "$30/90$", "$50/90$", "$18/50$"], "Conditioning on owning a laptop means use the laptop row total 50.", "\\begin{array}{c|cc|c}&\\text{Tablet}&\\text{No tablet}&\\text{Total}\\\\ \\hline \\text{Laptop}&18&32&50\\\\ \\text{No laptop}&12&28&40\\\\ \\hline \\text{Total}&30&60&90\\end{array}"),
        practicalChoice("y11adv-pd-prob-m7", "Which option identifies the mistake in the displayed conditional probability calculation?", "C", ["The numerator should be 60", "The answer should be a percentage only", "The denominator should be the conditioned group total", "The events must be mutually exclusive"], "For a conditional probability given Year 12, the denominator should be the Year 12 total, not the whole table total.", "P(\\text{Train}\\mid \\text{Year 12})=\\frac{20}{60}"),
        practicalChoice("y11adv-pd-prob-m8", "Decide whether the displayed probabilities show independence.", "B", ["Independent", "Not independent", "Mutually exclusive", "Complementary"], "$P(A)P(B)=0.25$ but $P(A\\cap B)=0.20$, so the events are not independent.", "P(A)=0.5,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.20"),
        dataAnswer("y11adv-pd-prob-m9", "Find the probability that either event occurs when there is overlap.", "P(A)=0.55,\\quad P(B)=0.35,\\quad P(A\\cap B)=0.15", "0.75", ["3/4"]),
        practicalChoice("y11adv-pd-prob-m10", "A survey estimate is based on the displayed results. Choose the best interpretation.", "A", ["About 30% of similar students may prefer the option", "Exactly 30% of all students must prefer the option", "The complement is impossible", "The probability must be 1"], "Relative frequency estimates probability from the survey data.", "\\text{preferred option}=24,\\quad \\text{surveyed}=80"),
      ],
    };
  }

  if (lesson.slug === "discrete-random-variables") {
    return {
      ...base,
      description:
        "Read, validate, and use probability distributions for discrete random variables.",
      learningIntention:
        "Use discrete random-variable distributions to find missing probabilities and event probabilities.",
      successCriteria: [
        "Identify whether a context can be modelled by a discrete random variable.",
        "Check that probabilities are non-negative and sum to 1.",
        "Find a missing probability in a distribution.",
        "Read exact probabilities from a distribution table.",
        "Calculate probabilities using sums and complements.",
      ],
      teaching: {
        paragraphs: [
          "A random variable assigns a number to the outcome of a chance process. It is discrete when the possible values can be listed.",
          "A probability distribution table lists each possible value of the random variable and the probability of that value.",
          "For a valid probability distribution, every probability must be at least zero and all probabilities must add to 1.",
          "To find probabilities such as at least, at most, or not equal to a value, add the relevant table probabilities or use a complement.",
        ],
        latexBlocks: [
          "\\sum P(X=x)=1",
          "P(X=x)\\ge 0\\quad \\text{for every value of }x",
          "P(X\\ge k)=\\text{sum probabilities where }X\\ge k",
          "P(X\\ne k)=1-P(X=k)",
        ],
      },
      workedExamples: [
        {
          title: "Check whether a distribution is valid",
          questionLatex:
            "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}",
          steps: [
            {
              explanation: "Check that all probabilities are non-negative.",
              latex: "0.2,\\ 0.5,\\ 0.3\\ge 0",
            },
            {
              explanation: "Check that the probabilities add to 1.",
              latex: "0.2+0.5+0.3=1",
            },
          ],
          finalAnswerLatex: "\\text{Valid distribution}",
        },
        {
          title: "Find a missing probability",
          questionLatex:
            "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&0.35&p\\end{array}",
          steps: [
            {
              explanation: "Probabilities in a distribution must add to 1.",
              latex: "0.25+0.35+p=1",
            },
            {
              explanation: "Solve for the missing probability.",
              latex: "p=1-0.60=0.40",
            },
          ],
          finalAnswerLatex: "0.4",
        },
        {
          title: "Calculate at least and at most probabilities",
          questionLatex:
            "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.4&0.3\\end{array}",
          steps: [
            {
              explanation: "For at least 2, add probabilities for 2 and 3.",
              latex: "P(X\\ge2)=0.4+0.3=0.7",
            },
            {
              explanation: "For at most 1, add probabilities for 0 and 1.",
              latex: "P(X\\le1)=0.1+0.2=0.3",
            },
          ],
          finalAnswerLatex: "P(X\\ge2)=0.7,\\quad P(X\\le1)=0.3",
        },
      ],
      guidedPractice: [
        practicalChoice("y11adv-pd-drv-g1", "Decide whether the distribution is valid.", "A", ["Valid", "Invalid because a probability is negative", "Invalid because the total is greater than 1", "Invalid because values must be percentages"], "The probabilities are non-negative and add to 1.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&0.5\\end{array}"),
        dataAnswer("y11adv-pd-drv-g2", "Find the missing probability.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.3&0.4&p\\end{array}", "0.3", ["3/10", "0.30"]),
        dataAnswer("y11adv-pd-drv-g3", "Read the probability for the displayed value.", "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}\\quad P(X=2)", "0.5", ["1/2", "0.50"]),
        dataAnswer("y11adv-pd-drv-g4", "Find the probability that the random variable is not equal to the displayed value.", "P(X=0)=0.25,\\quad P(X\\ne0)", "0.75", ["3/4"]),
      ],
      independentPractice: [
        practicalChoice("y11adv-pd-drv-i1", "Which context is best modelled by a discrete random variable?", "B", ["Exact waiting time for a bus", "Number of heads in four coin tosses", "Temperature at noon", "Height of a plant"], "The number of heads is counted and has listable values."),
        dataAnswer("y11adv-pd-drv-i2", "Find the missing probability.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&p&0.4\\end{array}", "0.3", ["3/10", "0.30"]),
        dataAnswer("y11adv-pd-drv-i3", "Find the probability that the random variable is at least the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.2&0.3&0.1&0.4\\end{array}\\quad P(X\\ge2)", "0.5", ["1/2", "0.50"]),
        dataAnswer("y11adv-pd-drv-i4", "Find the probability that the random variable is at most the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.2&0.3&0.1&0.4\\end{array}\\quad P(X\\le1)", "0.5", ["1/2", "0.50"]),
        practicalChoice("y11adv-pd-drv-i5", "Decide why the displayed distribution is invalid.", "C", ["It has too many x-values", "The x-values are not probabilities", "The probabilities add to more than 1", "The random variable is continuous"], "The probabilities add to 1.1, so the distribution is invalid.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.4&0.4&0.3\\end{array}"),
      ],
      commonMistakes: [
        { mistake: "Forgetting that probabilities must add to 1.", fix: "Add every probability in the distribution before using it." },
        { mistake: "Reading the x-value as the probability.", fix: "Use the probability row, not the random-variable value row." },
        { mistake: "Mixing up at least and at most.", fix: "At least means greater than or equal; at most means less than or equal." },
        { mistake: "Treating a measured quantity as discrete just because it has numbers.", fix: "Discrete values are counted or listable; measured values are usually continuous." },
      ],
      masteryQuiz: [
        practicalChoice("y11adv-pd-drv-m1", "Decide whether the distribution is valid.", "B", ["Invalid", "Valid", "Invalid because values are not equally spaced", "Invalid because x includes zero"], "The probabilities add to 1 and are non-negative.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&0.25&0.50\\end{array}"),
        dataAnswer("y11adv-pd-drv-m2", "Find the missing probability.", "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.2&p&0.5\\end{array}", "0.3", ["3/10", "0.30"]),
        dataAnswer("y11adv-pd-drv-m3", "Read the probability for the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.4&0.3&0.2\\end{array}\\quad P(X=1)", "0.4", ["2/5", "0.40"]),
        dataAnswer("y11adv-pd-drv-m4", "Find the probability that the random variable is at least the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.4&0.3\\end{array}\\quad P(X\\ge2)", "0.7", ["7/10", "0.70"]),
        dataAnswer("y11adv-pd-drv-m5", "Find the probability that the random variable is at most the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&0.35&0.30&0.20\\end{array}\\quad P(X\\le1)", "0.5", ["1/2", "0.50"]),
        dataAnswer("y11adv-pd-drv-m6", "Find the probability that the random variable is not equal to the displayed value.", "P(X=2)=0.6,\\quad P(X\\ne2)", "0.4", ["2/5", "0.40"]),
        practicalChoice("y11adv-pd-drv-m7", "Which option identifies the error in the displayed distribution?", "D", ["The probabilities should be whole numbers", "The values must start at 1", "The probabilities add to exactly 1", "One probability is negative"], "A probability cannot be negative.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.6&-0.1&0.5\\end{array}"),
        practicalChoice("y11adv-pd-drv-m8", "Which probability matches the phrase at least two successes?", "C", ["$P(X<2)$", "$P(X\\le2)$", "$P(X\\ge2)$", "$P(X\\ne2)$"], "At least two means two or more."),
        dataAnswer("y11adv-pd-drv-m9", "Find the missing probability, then give the probability of the displayed event.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.25&p&0.30&0.15\\end{array}\\quad P(X=1)", "0.3", ["3/10", "0.30"]),
        practicalChoice("y11adv-pd-drv-m10", "A random variable records the number of late assignments submitted in a week. Which statement is correct?", "A", ["It is discrete because the values are counts", "It is continuous because time is involved", "Its probabilities do not need to add to 1", "It cannot have value 0"], "The number of assignments is counted, so the random variable is discrete."),
      ],
    };
  }

  if (lesson.slug === "expected-value-standard-deviation") {
    return {
      ...base,
      description:
        "Calculate and interpret expected value, variance, standard deviation, and fair-game outcomes for discrete random variables.",
      learningIntention:
        "Use probability distributions to calculate expected value, variance, standard deviation, and fair-game decisions.",
      successCriteria: [
        "Calculate expected value as a weighted average.",
        "Calculate $E(X^2)$ from a distribution.",
        "Use $\\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.",
        "Find standard deviation from a clean variance.",
        "Interpret expected value and decide whether a game is fair.",
      ],
      teaching: {
        paragraphs: [
          "Expected value is the long-run average value of a random variable. It is a weighted average where each value is weighted by its probability.",
          "Variance measures spread around the expected value. For a discrete random variable, it is often calculated using $E(X^2)-[E(X)]^2$.",
          "Standard deviation is the square root of the variance and is measured in the same units as the random variable.",
          "In games of chance, expected winnings can show whether the game is favourable, unfavourable, or fair. A fair game has expected winnings of zero.",
        ],
        latexBlocks: [
          "E(X)=\\sum xP(X=x)",
          "E(X^2)=\\sum x^2P(X=x)",
          "\\operatorname{Var}(X)=E(X^2)-[E(X)]^2",
          "SD(X)=\\sqrt{\\operatorname{Var}(X)}",
        ],
      },
      workedExamples: [
        {
          title: "Expected value from a two-value distribution",
          questionLatex:
            "\\begin{array}{c|cc}x&0&10\\\\ \\hline P(X=x)&0.7&0.3\\end{array}",
          steps: [
            {
              explanation: "Multiply each value by its probability.",
              latex: "0(0.7)+10(0.3)",
            },
            {
              explanation: "Add the products.",
              latex: "E(X)=3",
            },
          ],
          finalAnswerLatex: "E(X)=3",
        },
        {
          title: "Variance from the second moment",
          questionLatex:
            "\\begin{array}{c|cc}x&0&2\\\\ \\hline P(X=x)&0.5&0.5\\end{array}",
          steps: [
            {
              explanation: "Find the expected value.",
              latex: "E(X)=0(0.5)+2(0.5)=1",
            },
            {
              explanation: "Find $E(X^2)$.",
              latex: "E(X^2)=0^2(0.5)+2^2(0.5)=2",
            },
            {
              explanation: "Subtract the square of the expected value.",
              latex: "\\operatorname{Var}(X)=2-1^2=1",
            },
          ],
          finalAnswerLatex: "\\operatorname{Var}(X)=1",
        },
        {
          title: "Standard deviation from variance",
          questionLatex: "\\operatorname{Var}(X)=4",
          steps: [
            {
              explanation: "Standard deviation is the square root of variance.",
              latex: "SD(X)=\\sqrt{4}=2",
            },
          ],
          finalAnswerLatex: "2",
        },
        {
          title: "Fair-game interpretation",
          questionLatex:
            "\\begin{array}{c|cc}\\text{winnings}&6&-2\\\\ \\hline P&\\frac14&\\frac34\\end{array}",
          steps: [
            {
              explanation: "Calculate expected winnings.",
              latex: "E=6\\left(\\frac14\\right)+(-2)\\left(\\frac34\\right)=1.5-1.5=0",
            },
            {
              explanation: "An expected winning of zero means the game is fair in the long run.",
            },
          ],
          finalAnswerLatex: "\\text{Fair game}",
        },
      ],
      guidedPractice: [
        dataAnswer("y11adv-pd-ev-g1", "Find the expected value.", "\\begin{array}{c|cc}x&0&4\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", "2"),
        dataAnswer("y11adv-pd-ev-g2", "Find the value of the displayed second moment.", "\\begin{array}{c|cc}x&1&3\\\\ \\hline P(X=x)&0.5&0.5\\end{array}\\quad E(X^2)", "5"),
        dataAnswer("y11adv-pd-ev-g3", "Find the variance using the displayed moments.", "E(X)=3,\\quad E(X^2)=13", "4"),
        practicalChoice("y11adv-pd-ev-g4", "Choose the best long-run interpretation of the expected value.", "B", ["Every trial must equal 2.5", "The average result over many trials is about 2.5", "The most common value must be 2.5", "There are exactly 2.5 outcomes"], "Expected value is interpreted as a long-run average.", "E(X)=2.5"),
      ],
      independentPractice: [
        dataAnswer("y11adv-pd-ev-i1", "Find the expected value.", "\\begin{array}{c|ccc}x&0&2&4\\\\ \\hline P(X=x)&0.25&0.50&0.25\\end{array}", "2"),
        dataAnswer("y11adv-pd-ev-i2", "Find the value of the displayed second moment.", "\\begin{array}{c|cc}x&0&5\\\\ \\hline P(X=x)&0.6&0.4\\end{array}\\quad E(X^2)", "10"),
        dataAnswer("y11adv-pd-ev-i3", "Find the standard deviation using the displayed variance.", "\\operatorname{Var}(X)=9", "3"),
        practicalChoice("y11adv-pd-ev-i4", "Decide whether the game is fair from the expected winnings.", "A", ["Fair", "Favourable to the player", "Unfavourable to the player", "Impossible to decide"], "Expected winnings of zero means the game is fair.", "E(\\text{winnings})=0"),
        practicalChoice("y11adv-pd-ev-i5", "Find the expected value after completing the missing probability.", "C", ["1.2", "1.5", "1.8", "2.4"], "The missing probability is 0.2, so $E(X)=1(0.4)+2(0.4)+3(0.2)=1.8$.", "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.4&0.4&p\\end{array}"),
      ],
      commonMistakes: [
        { mistake: "Averaging the x-values without using probabilities.", fix: "Expected value is a weighted average, so multiply each value by its probability." },
        { mistake: "Forgetting to square x-values when finding $E(X^2)$.", fix: "Use x squared times the probability, not x times the probability." },
        { mistake: "Using $E(X^2)$ as the variance.", fix: "Subtract $[E(X)]^2$ to find variance." },
        { mistake: "Calling a game fair because there is a chance of winning.", fix: "A fair game has expected winnings of zero." },
      ],
      masteryQuiz: [
        dataAnswer("y11adv-pd-ev-m1", "Find the expected value.", "\\begin{array}{c|cc}x&0&8\\\\ \\hline P(X=x)&0.75&0.25\\end{array}", "2"),
        dataAnswer("y11adv-pd-ev-m2", "Find the displayed second moment.", "\\begin{array}{c|cc}x&2&4\\\\ \\hline P(X=x)&0.5&0.5\\end{array}\\quad E(X^2)", "10"),
        dataAnswer("y11adv-pd-ev-m3", "Find the standard deviation using the displayed variance.", "\\operatorname{Var}(X)=16", "4"),
        dataAnswer("y11adv-pd-ev-m4", "Find the variance using the displayed moments.", "E(X)=2,\\quad E(X^2)=7", "3"),
        dataAnswer("y11adv-pd-ev-m5", "Find the expected winnings for the game.", "\\begin{array}{c|cc}\\text{winnings}&5&-1\\\\ \\hline P&\\frac14&\\frac34\\end{array}", "0.5", ["1/2", "0.50"]),
        practicalChoice("y11adv-pd-ev-m6", "Decide whether the game is favourable to the player.", "B", ["Fair", "Favourable", "Unfavourable", "Impossible"], "A positive expected winning is favourable to the player.", "E(\\text{winnings})=0.5"),
        practicalChoice("y11adv-pd-ev-m7", "Which option identifies the error in the displayed variance calculation?", "D", ["The probabilities should be ignored", "The expected value is always zero", "The standard deviation should be negative", "The square of the expected value was not subtracted"], "Variance is $E(X^2)-[E(X)]^2$.", "E(X)=3,\\quad E(X^2)=11,\\quad \\operatorname{Var}(X)=11"),
        practicalChoice("y11adv-pd-ev-m8", "Choose the correct interpretation of the expected value in this context.", "A", ["Over many days, the average number of calls is about 4.5", "Every day has exactly 4.5 calls", "The probability of a call is 4.5", "The standard deviation is 4.5"], "Expected value is a long-run average.", "E(X)=4.5\\quad \\text{calls per day}"),
        practicalChoice("y11adv-pd-ev-m9", "Find the expected value after completing the missing probability.", "C", ["1.4", "1.6", "1.8", "2.0"], "The missing probability is 0.2, so $E(X)=1(0.4)+2(0.4)+3(0.2)=1.8$.", "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.4&0.4&p\\end{array}"),
        practicalChoice("y11adv-pd-ev-m10", "Choose the statement that correctly compares spread using the displayed standard deviations.", "B", ["Class A is more spread out", "Class B is more spread out", "The means must be equal", "Both distributions are invalid"], "A larger standard deviation indicates greater spread.", "SD(A)=2.1,\\quad SD(B)=3.4"),
      ],
    };
  }

  if (lesson.slug === "probability-data-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed probability and data questions involving summaries, outliers, probability rules, distributions, expected value, and spread.",
      learningIntention:
        "Apply data summary, probability, random-variable, and expected-value skills to mixed school-assessment-style questions.",
      successCriteria: [
        "Select an appropriate statistic or probability rule from the question wording.",
        "Calculate centre, spread, and outlier decisions from displayed data.",
        "Read and use two-way tables and probability distributions.",
        "Calculate expected value, variance, and standard deviation in clean cases.",
        "Interpret probability and expected value results in context.",
      ],
      teaching: {
        paragraphs: [
          "Mixed assessment questions often combine reading data, choosing a summary statistic, calculating a probability, and interpreting a result.",
          "Before calculating, identify the representation: sorted list, frequency table, two-way table, probability distribution, or expected-value table.",
          "Keep typed answers short. For interpretation questions, choose the option that matches the statistical meaning rather than just the largest number.",
          "Use exact fractions or clean decimals where appropriate, and include units or context in your thinking even when the answer box only needs a number.",
        ],
        latexBlocks: [
          "IQR=Q_3-Q_1",
          "P(A')=1-P(A)",
          "\\sum P(X=x)=1",
          "E(X)=\\sum xP(X=x)",
          "\\operatorname{Var}(X)=E(X^2)-[E(X)]^2",
        ],
      },
      workedExamples: [
        {
          title: "Outlier decision from summary values",
          questionLatex:
            "Q_1=12,\\quad Q_3=20,\\quad \\text{test value}=35",
          steps: [
            {
              explanation: "Calculate the IQR.",
              latex: "IQR=20-12=8",
            },
            {
              explanation: "Calculate the upper fence.",
              latex: "20+1.5(8)=32",
            },
            {
              explanation: "Compare the test value with the upper fence.",
              latex: "35>32",
            },
          ],
          finalAnswerLatex: "\\text{The value is a high outlier.}",
        },
        {
          title: "Conditional probability from a table",
          questionLatex:
            "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Not pass}&\\text{Total}\\\\ \\hline \\text{Group A}&24&6&30\\\\ \\text{Group B}&21&9&30\\\\ \\hline \\text{Total}&45&15&60\\end{array}",
          steps: [
            {
              explanation: "Conditioning on Group A means use the Group A total.",
              latex: "\\text{denominator}=30",
            },
            {
              explanation: "There are 24 passes in Group A.",
              latex: "P(\\text{Pass}\\mid \\text{Group A})=\\frac{24}{30}=\\frac45",
            },
          ],
          finalAnswerLatex: "\\frac45",
        },
        {
          title: "Expected value from a distribution",
          questionLatex:
            "\\begin{array}{c|ccc}x&0&2&5\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}",
          steps: [
            {
              explanation: "Multiply each value by its probability.",
              latex: "0(0.2)+2(0.5)+5(0.3)",
            },
            {
              explanation: "Add the products.",
              latex: "E(X)=2.5",
            },
          ],
          finalAnswerLatex: "2.5",
        },
      ],
      guidedPractice: [
        dataAnswer("y11adv-pd-exam-g1", "Find the median of the sorted data set.", "11,\\ 13,\\ 14,\\ 18,\\ 20", "14"),
        dataAnswer("y11adv-pd-exam-g2", "Find the missing probability.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&p&0.50\\end{array}", "0.25", ["1/4", "0.250"]),
        practicalChoice("y11adv-pd-exam-g3", "From the two-way table, find the conditional probability of a pass, given Group B.", "D", ["$21/60$", "$30/60$", "$45/60$", "$21/30$"], "Use the Group B total as the denominator.", "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Not pass}&\\text{Total}\\\\ \\hline \\text{Group A}&24&6&30\\\\ \\text{Group B}&21&9&30\\\\ \\hline \\text{Total}&45&15&60\\end{array}"),
        dataAnswer("y11adv-pd-exam-g4", "Find the expected value.", "\\begin{array}{c|cc}x&0&6\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", "3"),
      ],
      independentPractice: [
        dataAnswer("y11adv-pd-exam-i1", "Find the interquartile range from the displayed quartiles.", "Q_1=8,\\quad Q_3=21", "13"),
        practicalChoice("y11adv-pd-exam-i2", "Using the displayed fences, decide whether the value is an outlier.", "A", ["Not an outlier", "Low outlier", "High outlier", "The median"], "The value lies between the lower and upper fences.", "\\text{lower fence}=5,\\quad \\text{upper fence}=29,\\quad \\text{value}=27"),
        dataAnswer("y11adv-pd-exam-i3", "Use the complement rule to find the probability that the event does not occur.", "P(A)=\\frac{7}{10}", "3/10", ["0.3", "0.30"]),
        practicalChoice("y11adv-pd-exam-i4", "Decide whether the displayed probabilities show independence.", "A", ["Independent", "Not independent", "Mutually exclusive", "Complementary"], "$P(A)P(B)=0.3(0.4)=0.12$, which equals $P(A\\cap B)$.", "P(A)=0.3,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.12"),
        dataAnswer("y11adv-pd-exam-i5", "Find the variance using the displayed moments.", "E(X)=4,\\quad E(X^2)=20", "4"),
      ],
      commonMistakes: [
        { mistake: "Using one rule for every representation.", fix: "First identify whether the question uses a data list, frequency table, two-way table, or probability distribution." },
        { mistake: "Writing a long explanation for an interpretation question.", fix: "Choose the option that directly matches the statistical meaning." },
        { mistake: "Forgetting decimal and fraction equivalence in probability.", fix: "Check whether a fraction such as 3/10 is the same as 0.3." },
        { mistake: "Using standard deviation when the question asks for variance.", fix: "Variance is before the square root; standard deviation is after the square root." },
      ],
      masteryQuiz: [
        dataAnswer("y11adv-pd-exam-m1", "Find the range of the data set.", "6,\\ 9,\\ 12,\\ 20", "14"),
        dataAnswer("y11adv-pd-exam-m2", "Find the missing probability.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&p\\end{array}", "0.5", ["1/2", "0.50"]),
        dataAnswer("y11adv-pd-exam-m3", "Find the expected value.", "\\begin{array}{c|cc}x&1&5\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", "3"),
        practicalChoice("y11adv-pd-exam-m4", "Using the displayed fences, classify the test value.", "C", ["Low outlier", "Not an outlier", "High outlier", "The IQR"], "The value is greater than the upper fence.", "\\text{lower fence}=1,\\quad \\text{upper fence}=25,\\quad \\text{test value}=31"),
        dataAnswer("y11adv-pd-exam-m5", "Use the general addition rule to find the union probability.", "P(A)=0.4,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", "0.7", ["7/10", "0.70"]),
        practicalChoice("y11adv-pd-exam-m6", "From the two-way table, find the conditional probability that a selected student prefers online lessons, given Year 11.", "B", ["$18/70$", "$18/40$", "$40/70$", "$22/40$"], "Conditioning on Year 11 means use the Year 11 total 40.", "\\begin{array}{c|cc|c}&\\text{Online}&\\text{In person}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&22&40\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&30&40&70\\end{array}"),
        practicalChoice("y11adv-pd-exam-m7", "Which summary statistic is least affected by one very large maximum?", "C", ["Mean", "Range", "Median", "Maximum"], "The median is resistant to an extreme value."),
        practicalChoice("y11adv-pd-exam-m8", "Decide why the displayed probability distribution is invalid.", "A", ["The probabilities add to less than 1", "The probabilities add to exactly 1", "The values are not all positive", "The random variable has too few values"], "The probabilities add to 0.9, not 1.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&0.4\\end{array}"),
        dataAnswer("y11adv-pd-exam-m9", "Find the standard deviation using the displayed moments.", "E(X)=3,\\quad E(X^2)=13", "2"),
        practicalChoice("y11adv-pd-exam-m10", "Choose the best judgement about the game from the expected winnings.", "D", ["The game is fair", "The player must win every time", "The probabilities are invalid", "The game is unfavourable to the player"], "A negative expected winning is unfavourable to the player in the long run.", "E(\\text{winnings})=-0.40"),
      ],
    };
  }

  return null;
}
