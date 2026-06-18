import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import { practicalChoice, dataAnswer as baseDataAnswer } from "../questionHelpers";

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x;
}

function probabilityAnswerVariants(prompt: string, answer: string): string[] {
  const lowerPrompt = prompt.toLowerCase();
  const isProbabilityPrompt =
    lowerPrompt.includes("probability") ||
    lowerPrompt.includes("relative frequency") ||
    lowerPrompt.includes("complement") ||
    lowerPrompt.includes("union") ||
    lowerPrompt.includes("event occurs") ||
    lowerPrompt.includes("at least") ||
    lowerPrompt.includes("at most");
  const asksForSpecificForm = lowerPrompt.includes("exact fraction") || lowerPrompt.includes("decimal only");

  if (!isProbabilityPrompt || asksForSpecificForm) return [];

  const variants: string[] = [];
  const fractionMatch = answer.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    if (denominator !== 0) {
      let remainingDenominator = Math.abs(denominator);
      while (remainingDenominator % 2 === 0) remainingDenominator /= 2;
      while (remainingDenominator % 5 === 0) remainingDenominator /= 5;
      if (remainingDenominator === 1) {
        const decimal = numerator / denominator;
        variants.push(String(decimal), `${decimal * 100}%`);
      }
    }
  }

  const decimalMatch = answer.match(/^(-?\d+)(?:\.(\d+))?$/);
  if (decimalMatch) {
    const decimal = Number(answer);
    const places = decimalMatch[2]?.length ?? 0;
    if (Number.isFinite(decimal) && decimal >= 0 && decimal <= 1 && places > 0) {
      const denominator = 10 ** places;
      const numerator = Math.round(decimal * denominator);
      const divisor = gcd(numerator, denominator);
      variants.push(`${numerator / divisor}/${denominator / divisor}`, `${decimal * 100}%`);
    }
  }

  return variants;
}

function labelledDataAnswerVariants(prompt: string, answer: string): string[] {
  const lowerPrompt = prompt.toLowerCase();
  const variants = probabilityAnswerVariants(prompt, answer);
  const labels: string[] = [];

  if (lowerPrompt.includes("median")) labels.push("median");
  if (lowerPrompt.includes("interquartile range")) labels.push("IQR", "iqr");
  if (lowerPrompt.includes("mean")) labels.push("mean");
  if (lowerPrompt.includes("range")) labels.push("range");
  if (lowerPrompt.includes("mode")) labels.push("mode");
  if (lowerPrompt.includes("upper fence")) labels.push("upper fence");
  if (lowerPrompt.includes("expected value") || lowerPrompt.includes("expected winnings")) labels.push("E(X)", "E");
  if (lowerPrompt.includes("second moment")) labels.push("E(X^2)", "second moment");
  if (lowerPrompt.includes("variance")) labels.push("Var(X)", "variance");
  if (lowerPrompt.includes("standard deviation")) labels.push("SD", "sd", "standard deviation");

  for (const label of labels) {
    variants.push(`${label}=${answer}`, `${label} = ${answer}`);
  }

  return variants;
}

function probabilityDataFeedback(
  id: string,
  prompt: string,
  answer: string
) {
  if (prompt.includes("median")) {
    return `Put the values in order and locate the middle position. The median is the centre value, so unusually large or small values do not pull it around; here it is ${answer}.`;
  }
  if (prompt.includes("interquartile range")) {
    return `The IQR measures the width of the middle half of the data. Subtract Q1 from Q3 to get ${answer}.`;
  }
  if (prompt.includes("range")) {
    return `The range measures the full spread from the smallest value to the largest. Subtract minimum from maximum to get ${answer}.`;
  }
  if (prompt.includes("mode")) {
    return `The mode is the value that appears most often. In a frequency table, look for the value above the largest frequency; this gives ${answer}.`;
  }
  if (prompt.includes("mean")) {
    return `The mean shares the total evenly across the data values. For a frequency table, multiply each value by its frequency before dividing by the total frequency; the result is ${answer}.`;
  }
  if (prompt.includes("upper fence")) {
    return `The upper outlier fence is Q3 + 1.5(IQR). Find the middle-half spread first, then extend beyond Q3 to get ${answer}.`;
  }
  if (prompt.includes("complement rule") || prompt.includes("not equal")) {
    return `A complement means everything except the stated event. Subtract the stated probability from 1 to get ${answer}.`;
  }
  if (prompt.includes("relative frequency")) {
    return `Relative frequency is an estimate from observed trials. Divide the outcome count by the total number of trials to get ${answer}.`;
  }
  if (prompt.includes("union") || prompt.includes("either event")) {
    return `A union means either event occurs. Add the event probabilities, then subtract the overlap once if both events can happen together; this gives ${answer}.`;
  }
  if (prompt.includes("missing probability")) {
    return `A complete probability distribution must add to 1. Add the known probabilities and subtract that total from 1 to get ${answer}.`;
  }
  if (prompt.includes("at least")) {
    return `At least means the stated value or anything larger. Add the probabilities for those table entries to get ${answer}.`;
  }
  if (prompt.includes("at most")) {
    return `At most means the stated value or anything smaller. Add the probabilities for those table entries to get ${answer}.`;
  }
  if (prompt.includes("X is odd")) {
    return `Odd values in the table are 1 and 3. Add their probabilities, $0.4+0.2$, to get ${answer}.`;
  }
  if (prompt.includes("Read the probability")) {
    return `Match the requested x-value to its probability in the table. Read from the probability row, not the value row; this gives ${answer}.`;
  }
  if (prompt.includes("expected value") || prompt.includes("expected winnings")) {
    return `Expected value is a long-run weighted average. Multiply each possible value by its probability and add the products to get ${answer}.`;
  }
  if (prompt.includes("second moment")) {
    return `For E(X^2), square each possible value before weighting it by its probability. Add those weighted squares to get ${answer}.`;
  }
  if (prompt.includes("variance")) {
    return `Variance measures spread after accounting for the mean. Use Var(X) = E(X^2) - [E(X)]^2 to get ${answer}.`;
  }
  if (prompt.includes("standard deviation") && prompt.includes("moments")) {
    return `Use the moments to find the variance first: $20-2^2=16$. The standard deviation is the square root of variance, so the result is ${answer}.`;
  }
  if (prompt.includes("standard deviation")) {
    return `Standard deviation is the square root of the variance, so it returns the spread to the original units. The result is ${answer}.`;
  }
  if (prompt.includes("addition formula") && !prompt.includes("P(A∩B)") && !prompt.includes("find P(A∩B)")) {
    return `Apply the addition formula: n(A∪B)=n(A)+n(B)−n(A∩B) or P(A∪B)=P(A)+P(B)−P(A∩B). Substitute the given values and simplify to get ${answer}.`;
  }
  if ((prompt.includes("addition formula") && (prompt.includes("P(A∩B)") || prompt.includes("find P(A∩B)"))) || (prompt.includes("rearrange") && prompt.includes("addition"))) {
    return `Rearrange the addition rule: P(A∩B)=P(A)+P(B)−P(A∪B). Substitute the given values and simplify to get ${answer}.`;
  }
  if (prompt.includes("outside A∪B") || prompt.includes("A'∩B'") || prompt.includes("outside the union")) {
    return `Elements outside A∪B form its complement. Subtract n(A∪B) from n(ξ) to get ${answer}.`;
  }
  if (prompt.includes("conditional probability") || prompt.includes("given they") || prompt.includes("given B")) {
    return `Conditional probability restricts the sample space. Divide the joint probability by the given event's probability: P(A|B)=P(A∩B)/P(B), giving ${answer}.`;
  }
  if (prompt.includes("multiplication rule")) {
    return `The multiplication rule: P(A∩B)=P(A|B)·P(B). Multiply or divide the given values to find the unknown, giving ${answer}.`;
  }
  if (prompt.includes("total probability")) {
    return `The law of total probability: P(A)=P(A∩B)+P(A∩B'). Add the two joint probabilities to get ${answer}.`;
  }
  if (id.includes("-prob-")) {
    return `List all possible outcomes, then count the outcomes that match the event. Probability is favourable outcomes divided by total outcomes, which gives ${answer}.`;
  }
  return `Read the representation first and choose the matching rule before calculating. Following that structure gives ${answer}.`;
}

function dataAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseDataAnswer(id, prompt, latex, answer, [...acceptedAnswers, ...labelledDataAnswerVariants(prompt, answer)]),
    explanation: probabilityDataFeedback(id, prompt, answer),
  };
}

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
          "Start by asking what kind of data you have. Counts are discrete, measurements are continuous, and labels such as phone brand are categorical.",
          "A frequency table is a compressed list: instead of rewriting a score five times, it records that the score occurred five times. For a mean, each value must still contribute once for every occurrence, which is why you multiply value by frequency.",
          "Centre and spread answer different questions. Mean, median, and mode describe a typical location; range and IQR describe how scattered the values are.",
          "The IQR is the width of the middle half of the data. It ignores the outer quarters, so one extreme value affects it much less than it affects the full range.",
          "Outlier fences give a consistent check for unusually distant values. When an outlier pulls the mean away from most of the data, the median is often the calmer summary of centre.",
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
        dataAnswer("y11adv-pd-data-m3", "Find the interquartile range of the sorted data set.", "4,\\ 6,\\ 8,\\ 10,\\ 15,\\ 20,\\ 24", "14"),
        dataAnswer("y11adv-pd-data-m4", "Find the mean from the frequency table. Give the exact fraction.", "\\begin{array}{c|ccc}x&1&2&5\\\\ \\hline f&2&3&1\\end{array}", "13/6"),
        dataAnswer("y11adv-pd-data-m5", "Find the mode from the frequency table.", "\\begin{array}{c|cccc}x&4&5&6&7\\\\ \\hline f&1&4&2&3\\end{array}", "5"),
        practicalChoice("y11adv-pd-data-m6", "Using the displayed outlier fences, classify the test value.", "B", ["Not an outlier", "High outlier", "Low outlier", "The upper quartile"], "The test value is greater than the upper fence.", "\\text{lower fence}=2,\\quad \\text{upper fence}=26,\\quad \\text{test value}=29"),
        practicalChoice("y11adv-pd-data-m7", "Which statistic is affected most by replacing the largest value with a much larger value?", "A", ["Mean", "Median", "Lower quartile", "Sample size"], "The mean uses every value, so an extreme maximum can pull it strongly."),
        practicalChoice("y11adv-pd-data-m8", "Which statement best describes why the median is chosen here?", "D", ["The data has no centre", "The range is zero", "The frequency table is invalid", "The data is skewed by an extreme value"], "The median is resistant when one value is unusually large.", "12,\\ 13,\\ 13,\\ 14,\\ 80"),
        dataAnswer("y11adv-pd-data-m9", "Find the upper fence for the displayed summary values.", "Q_1=20,\\quad Q_3=32", "50"),
        practicalChoice("y11adv-pd-data-m10", "Which value should be used as the lower quartile for this sorted data set?", "B", ["5", "7", "12", "19"], "With 7 values, exclude the median; the lower half is 5, 7, 9, so $Q_1=7$.", "5,\\ 7,\\ 9,\\ 12,\\ 15,\\ 19,\\ 24"),
      ],
      masteryQuizPool: [
        { id: "y11adv-pd-data-p1", prompt: "Find the median of the sorted data set.", latex: "3,\\ 5,\\ 8,\\ 11,\\ 14", answer: "8", difficulty: 1, hint: "The median is the middle value of 5 sorted values.", explanation: "With 5 values the median is the 3rd value, which is 8." },
        { id: "y11adv-pd-data-p2", prompt: "Find the range of the data set.", latex: "7,\\ 10,\\ 15,\\ 22", answer: "15", difficulty: 1, hint: "Subtract the smallest value from the largest.", explanation: "Range $=22-7=15$." },
        { id: "y11adv-pd-data-p3", prompt: "Find the mode from the frequency table.", latex: "\\begin{array}{c|cccc}x&2&3&4&5\\\\ \\hline f&1&5&2&1\\end{array}", answer: "3", difficulty: 1, hint: "The mode is the value with the largest frequency.", explanation: "The largest frequency is 5, above $x=3$, so the mode is 3." },
        { id: "y11adv-pd-data-p4", prompt: "Which data type best describes the number of cars in a car park?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "Categorical" }, { label: "B", text: "Discrete numerical" }, { label: "C", text: "Continuous numerical" }, { label: "D", text: "Ordinal only" }], hint: "Are the values counted or measured?", explanation: "A count of cars is discrete numerical data." },
        { id: "y11adv-pd-data-p5", prompt: "Find the median of the sorted data set.", latex: "12,\\ 14,\\ 17,\\ 19", answer: "15.5", difficulty: 2, acceptedAnswers: ["31/2"], hint: "With 4 values the median is the average of the two middle values.", explanation: "Median $=\\frac{14+17}{2}=15.5$." },
        { id: "y11adv-pd-data-p6", prompt: "Find the interquartile range from the displayed quartiles.", latex: "Q_1=13,\\quad Q_3=27", answer: "14", difficulty: 2, hint: "Subtract $Q_1$ from $Q_3$.", explanation: "$IQR=27-13=14$." },
        { id: "y11adv-pd-data-p7", prompt: "Find the mean of the data set.", latex: "4,\\ 7,\\ 9,\\ 12", answer: "8", difficulty: 2, hint: "Add the values and divide by 4.", explanation: "Mean $=\\frac{4+7+9+12}{4}=\\frac{32}{4}=8$." },
        { id: "y11adv-pd-data-p8", prompt: "Find which measure of centre is most resistant to one extreme value.", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Range" }, { label: "C", text: "Median" }, { label: "D", text: "Maximum" }], hint: "Which value ignores the size of the largest entry?", explanation: "The median is resistant to extreme values." },
        { id: "y11adv-pd-data-p9", prompt: "Find the interquartile range of the sorted data set.", latex: "3,\\ 5,\\ 7,\\ 9,\\ 12,\\ 14,\\ 18", answer: "9", difficulty: 3, hint: "Exclude the median, then find $Q_1$ and $Q_3$.", explanation: "Median is 9; lower half $3,5,7$ gives $Q_1=5$, upper half $12,14,18$ gives $Q_3=14$, so $IQR=14-5=9$." },
        { id: "y11adv-pd-data-p10", prompt: "Find the mean from the frequency table. Give the exact fraction.", latex: "\\begin{array}{c|ccc}x&1&3&5\\\\ \\hline f&2&3&1\\end{array}", answer: "8/3", difficulty: 3, acceptedAnswers: ["16/6"], hint: "Use $\\bar{x}=\\frac{\\sum xf}{\\sum f}$.", explanation: "$\\sum xf=1(2)+3(3)+5(1)=16$ and $\\sum f=6$, so $\\bar{x}=\\frac{16}{6}=\\frac{8}{3}$." },
        { id: "y11adv-pd-data-p11", prompt: "Find the upper fence for the displayed quartiles.", latex: "Q_1=10,\\quad Q_3=18", answer: "30", difficulty: 3, hint: "Upper fence $=Q_3+1.5(IQR)$.", explanation: "$IQR=8$, so upper fence $=18+1.5(8)=18+12=30$." },
        { id: "y11adv-pd-data-p12", prompt: "Find the lower fence for the displayed quartiles.", latex: "Q_1=20,\\quad Q_3=32", answer: "2", difficulty: 3, hint: "Lower fence $=Q_1-1.5(IQR)$.", explanation: "$IQR=12$, so lower fence $=20-1.5(12)=20-18=2$." },
        { id: "y11adv-pd-data-p13", prompt: "Using the displayed fences, decide whether the test value is an outlier.", latex: "\\text{lower fence}=3,\\quad \\text{upper fence}=27,\\quad \\text{test value}=30", answer: "A", difficulty: 2, choices: [{ label: "A", text: "It is an outlier" }, { label: "B", text: "It is not an outlier" }, { label: "C", text: "It is the median" }, { label: "D", text: "It is the IQR" }], hint: "Compare the test value with the upper fence.", explanation: "$30>27$, so the value is an outlier." },
        { id: "y11adv-pd-data-p14", prompt: "Find the mode from the frequency table.", latex: "\\begin{array}{c|cccc}x&10&11&12&13\\\\ \\hline f&3&6&4&2\\end{array}", answer: "11", difficulty: 2, hint: "Find the value with the largest frequency.", explanation: "The largest frequency is 6 above $x=11$, so the mode is 11." },
        { id: "y11adv-pd-data-p15", prompt: "Find the range of the data set.", latex: "21,\\ 14,\\ 30,\\ 9,\\ 18", answer: "21", difficulty: 2, hint: "Identify the maximum and minimum first.", explanation: "Maximum 30, minimum 9, so range $=30-9=21$." },
        { id: "y11adv-pd-data-p16", prompt: "Find the median from the frequency table.", latex: "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline f&2&2&1\\end{array}", answer: "2", difficulty: 3, hint: "There are 5 values; find the 3rd in order.", explanation: "Ordered values: $1,1,2,2,3$. The 3rd value is 2, so the median is 2." },
        { id: "y11adv-pd-data-p17", prompt: "Which statistic changes most if the largest value is doubled?", latex: "\\text{Choose one}", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Median" }, { label: "C", text: "Mode" }, { label: "D", text: "Lower quartile" }], hint: "Which statistic uses every value?", explanation: "The mean uses every value, so doubling the largest value moves it most." },
        { id: "y11adv-pd-data-p18", prompt: "Find the mean from the frequency table. Give the exact fraction.", latex: "\\begin{array}{c|ccc}x&2&4&6\\\\ \\hline f&1&1&1\\end{array}", answer: "4", difficulty: 2, hint: "Add the products $xf$ and divide by $\\sum f$.", explanation: "$\\sum xf=2+4+6=12$ and $\\sum f=3$, so $\\bar{x}=\\frac{12}{3}=4$." },
        { id: "y11adv-pd-data-p19", prompt: "Using the displayed fences, classify the test value.", latex: "\\text{lower fence}=0,\\quad \\text{upper fence}=24,\\quad \\text{test value}=-3", answer: "C", difficulty: 3, choices: [{ label: "A", text: "Not an outlier" }, { label: "B", text: "High outlier" }, { label: "C", text: "Low outlier" }, { label: "D", text: "The median" }], hint: "Compare with the lower fence.", explanation: "$-3<0$, so the value is a low outlier." },
        { id: "y11adv-pd-data-p20", prompt: "Find the interquartile range of the sorted data set.", latex: "2,\\ 4,\\ 5,\\ 8,\\ 10,\\ 12,\\ 13,\\ 16", answer: "8", difficulty: 4, hint: "With 8 values, split into two halves of 4.", explanation: "The lower half 2, 4, 5, 8 gives $Q_1=\\frac{4+5}{2}=4.5$ and the upper half 10, 12, 13, 16 gives $Q_3=\\frac{12+13}{2}=12.5$, so $IQR=12.5-4.5=8$." },
        { id: "y11adv-pd-data-p21", prompt: "Find the mean from the frequency table. Give the exact fraction.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline f&4&3&2&1\\end{array}", answer: "1", difficulty: 4, hint: "Compute $\\sum xf$ and $\\sum f$ carefully.", explanation: "$\\sum xf=0(4)+1(3)+2(2)+3(1)=10$ and $\\sum f=10$, so $\\bar{x}=\\frac{10}{10}=1$." },
        { id: "y11adv-pd-data-p22", prompt: "Find the upper fence for the displayed quartiles, then state whether 41 is an outlier (enter the fence value).", latex: "Q_1=15,\\quad Q_3=25", answer: "40", difficulty: 4, hint: "Find $IQR$ first, then $Q_3+1.5(IQR)$.", explanation: "$IQR=10$, so upper fence $=25+1.5(10)=40$; since $41>40$, the value 41 is an outlier." },
        { id: "y11adv-pd-data-p23", prompt: "Which measure of centre best summarises a strongly skewed data set, and why?", latex: "18,\\ 19,\\ 20,\\ 21,\\ 95", answer: "B", difficulty: 4, choices: [{ label: "A", text: "Mean, because it uses every value" }, { label: "B", text: "Median, because it resists the extreme value" }, { label: "C", text: "Range, because it is a single number" }, { label: "D", text: "Maximum, because it is largest" }], hint: "One value (95) is far from the rest.", explanation: "The median is resistant to the extreme value 95, so it better represents the centre." },
        { id: "y11adv-pd-data-p24", prompt: "Find the median of the combined data set.", latex: "\\text{set: }4,\\ 9,\\ 2,\\ 7,\\ 5,\\ 8", answer: "6", difficulty: 3, hint: "Sort first, then average the two middle values.", explanation: "Sorted: $2,4,5,7,8,9$. Median $=\\frac{5+7}{2}=6$." },
        { id: "y11adv-pd-data-p25", prompt: "A data set has $Q_1=8$, $Q_3=20$. Find the smallest test value above $Q_3$ that would be flagged as a high outlier (the upper fence).", latex: "Q_1=8,\\quad Q_3=20", answer: "38", difficulty: 5, hint: "Any value greater than the upper fence is an outlier.", explanation: "$IQR=12$, so upper fence $=20+1.5(12)=38$; values greater than 38 are high outliers." },
        { id: "y11adv-pd-data-p26", prompt: "A frequency table has total frequency 12 and $\\sum xf=54$. After adding one more data value of 9, find the new mean. Give the exact fraction.", latex: "\\sum xf=54,\\quad \\sum f=12,\\quad \\text{new value}=9", answer: "63/13", difficulty: 5, hint: "Update both the total and the count, then divide.", explanation: "New $\\sum xf=54+9=63$ and new $\\sum f=13$, so mean $=\\frac{63}{13}$." },
        { id: "y11adv-pd-data-p27", prompt: "Find the interquartile range of the sorted data set.", latex: "2,\\ 4,\\ 6,\\ 8,\\ 11,\\ 13,\\ 15,\\ 17,\\ 20,\\ 24", answer: "11", difficulty: 5, hint: "With 10 values, split into two halves of 5 and take each half's median.", explanation: "Lower half $2,4,6,8,11$ gives $Q_1=6$; upper half $13,15,17,20,24$ gives $Q_3=17$, so $IQR=17-6=11$." },
        { id: "y11adv-pd-data-p28", prompt: "Find the mean from the frequency table, then state the difference between the mean and the mode (enter the difference).", latex: "\\begin{array}{c|ccc}x&2&4&6\\\\ \\hline f&1&2&1\\end{array}", answer: "0", difficulty: 5, hint: "Find both the mean and the mode, then subtract.", explanation: "$\\sum xf=2+8+6=16$, $\\sum f=4$, so mean $=4$; the mode is 4 (largest frequency), so the difference is $4-4=0$." },
        { id: "y11adv-pd-data-p29", prompt: "Compare the two sorted data sets and choose the correct statement about their spread.", latex: "A:\\ 10,\\ 12,\\ 14,\\ 16\\qquad B:\\ 2,\\ 9,\\ 17,\\ 24", answer: "B", difficulty: 5, choices: [{ label: "A", text: "Set A has the larger range" }, { label: "B", text: "Set B has the larger range" }, { label: "C", text: "The ranges are equal" }, { label: "D", text: "Range cannot be compared" }], hint: "Compute each range: $\\max-\\min$.", explanation: "Range of A $=16-10=6$; range of B $=24-2=22$, so set B is more spread out." },
        { id: "y11adv-pd-data-p30", prompt: "A data set of 6 values has mean 10. Five of the values are $7,9,10,11,13$. Find the sixth value.", latex: "\\bar{x}=10,\\quad n=6", answer: "10", difficulty: 5, hint: "The total of all values is $\\bar{x}\\times n$.", explanation: "Total $=10\\times6=60$; the five known values sum to 50, so the sixth value is $60-50=10$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-data-mp1",
          prompt: "A teacher records the sorted test marks of 7 students.",
          latex: "5,\\ 8,\\ 10,\\ 12,\\ 15,\\ 18,\\ 26",
          answer: "12",
          hint: "Find the median, then the quartiles and IQR, then the upper fence.",
          explanation:
            "(a) Median is the 4th value, 12. (b) $Q_1=8$, $Q_3=18$, so $IQR=10$. (c) Upper fence $=18+1.5(10)=33$; since $26<33$, 26 is not an outlier.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the median.", marks: 1, answer: "12", hint: "With 7 values, the median is the 4th value.", explanation: "The 4th value is 12." },
            { key: "b", label: "(b)", prompt: "Find the interquartile range.", latex: "IQR=Q_3-Q_1", marks: 2, answer: "10", hint: "Lower half $5,8,10$ and upper half $15,18,26$.", explanation: "$Q_1=8$ and $Q_3=18$, so $IQR=18-8=10$." },
            { key: "c", label: "(c)", prompt: "Find the upper outlier fence.", latex: "\\text{upper fence}=Q_3+1.5(IQR)", marks: 1, answer: "33", hint: "Use $Q_3=18$ and $IQR=10$.", explanation: "Upper fence $=18+1.5(10)=33$." },
          ],
        },
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
          "A sample space is simply the full list of possible outcomes. An event is the smaller group of outcomes you care about.",
          "For equally likely outcomes, probability is favourable outcomes divided by all possible outcomes. The denominator comes from the whole sample space.",
          "A complement means everything except the event, so its probability is what remains after subtracting from 1. A union means A or B; if events overlap, subtract the intersection once because it was counted twice.",
          "Mutually exclusive events cannot happen together. Independent events can happen together, but one event does not change the chance of the other.",
          "A row-and-column table has cell counts inside and totals at the edges. Conditional probability means restrict your attention to the named row, column, or group, so the denominator becomes that smaller total.",
          "Relative frequency is an estimate built from observed trials. It often settles down as more trials are collected, but it is not automatically the exact theoretical probability.",
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
      masteryQuizPool: [
        { id: "y11adv-pd-prob-p1", prompt: "Find the probability of choosing a red counter.", latex: "\\text{bag: }2\\text{ red},\\ 3\\text{ blue}", answer: "2/5", difficulty: 1, acceptedAnswers: ["0.4", "40%"], hint: "Favourable over total.", explanation: "There are 2 red of 5 counters, so $P=\\frac{2}{5}$." },
        { id: "y11adv-pd-prob-p2", prompt: "Use the complement rule to find the probability that the event does not occur.", latex: "P(A)=0.3", answer: "0.7", difficulty: 1, acceptedAnswers: ["7/10", "70%"], hint: "Subtract from 1.", explanation: "$P(A')=1-0.3=0.7$." },
        { id: "y11adv-pd-prob-p3", prompt: "Find the relative frequency of success.", latex: "\\text{successes}=15,\\quad \\text{trials}=60", answer: "1/4", difficulty: 1, acceptedAnswers: ["0.25", "25%"], hint: "Divide successes by trials.", explanation: "$\\frac{15}{60}=\\frac{1}{4}$." },
        { id: "y11adv-pd-prob-p4", prompt: "Find the probability of rolling an even number on a fair die.", latex: "\\{1,2,3,4,5,6\\}", answer: "1/2", difficulty: 1, acceptedAnswers: ["0.5", "50%", "3/6"], hint: "Even outcomes are 2, 4, 6.", explanation: "3 even outcomes of 6, so $P=\\frac{1}{2}$." },
        { id: "y11adv-pd-prob-p5", prompt: "Use the complement rule to find the probability that the event occurs.", latex: "P(A')=\\frac{2}{5}", answer: "3/5", difficulty: 2, acceptedAnswers: ["0.6", "60%"], hint: "Subtract $P(A')$ from 1.", explanation: "$P(A)=1-\\frac{2}{5}=\\frac{3}{5}$." },
        { id: "y11adv-pd-prob-p6", prompt: "Use the addition rule for mutually exclusive events.", latex: "P(A)=\\frac{1}{6},\\quad P(B)=\\frac{1}{3}", answer: "1/2", difficulty: 2, acceptedAnswers: ["0.5", "50%", "3/6"], hint: "Mutually exclusive means $P(A\\cap B)=0$.", explanation: "$P(A\\cup B)=\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$." },
        { id: "y11adv-pd-prob-p7", prompt: "Find the probability of selecting a vowel from the displayed letters.", latex: "\\{P,\\ A,\\ I,\\ N,\\ T\\}", answer: "2/5", difficulty: 2, acceptedAnswers: ["0.4", "40%"], hint: "Vowels are A and I.", explanation: "2 vowels of 5 letters, so $P=\\frac{2}{5}$." },
        { id: "y11adv-pd-prob-p8", prompt: "Use the general addition rule to find the union probability.", latex: "P(A)=0.45,\\quad P(B)=0.3,\\quad P(A\\cap B)=0.1", answer: "0.65", difficulty: 2, acceptedAnswers: ["13/20", "65%"], hint: "Add then subtract the overlap once.", explanation: "$P(A\\cup B)=0.45+0.3-0.1=0.65$." },
        { id: "y11adv-pd-prob-p9", prompt: "From the two-way table, find the joint probability that a person is a Year 11 bus user.", latex: "\\begin{array}{c|cc|c}&\\text{Bus}&\\text{Train}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&12&30\\\\ \\text{Year 12}&10&20&30\\\\ \\hline \\text{Total}&28&32&60\\end{array}", answer: "3/10", difficulty: 3, acceptedAnswers: ["0.3", "30%", "18/60"], hint: "Divide the cell count by the grand total.", explanation: "$P=\\frac{18}{60}=\\frac{3}{10}$." },
        { id: "y11adv-pd-prob-p10", prompt: "From the two-way table, find the conditional probability that a person uses the train, given they are in Year 11.", latex: "\\begin{array}{c|cc|c}&\\text{Bus}&\\text{Train}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&12&30\\\\ \\text{Year 12}&10&20&30\\\\ \\hline \\text{Total}&28&32&60\\end{array}", answer: "2/5", difficulty: 3, acceptedAnswers: ["0.4", "40%", "12/30"], hint: "Restrict to the Year 11 row total 30.", explanation: "$P(\\text{Train}\\mid\\text{Year 11})=\\frac{12}{30}=\\frac{2}{5}$." },
        { id: "y11adv-pd-prob-p11", prompt: "Classify the relationship between the events using the displayed probabilities.", latex: "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.3", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Independent" }, { label: "B", text: "Not independent" }, { label: "C", text: "Mutually exclusive" }, { label: "D", text: "Impossible" }], hint: "Check $P(A)P(B)$ against $P(A\\cap B)$.", explanation: "$P(A)P(B)=0.6\\times0.5=0.3=P(A\\cap B)$, so the events are independent." },
        { id: "y11adv-pd-prob-p12", prompt: "Find the probability of drawing a heart from a standard 52-card deck.", latex: "\\text{13 hearts in 52 cards}", answer: "1/4", difficulty: 2, acceptedAnswers: ["0.25", "25%", "13/52"], hint: "Hearts are one of four suits.", explanation: "$\\frac{13}{52}=\\frac{1}{4}$." },
        { id: "y11adv-pd-prob-p13", prompt: "Find the relative frequency of the outcome.", latex: "\\text{outcome count}=36,\\quad \\text{trials}=120", answer: "0.3", difficulty: 2, acceptedAnswers: ["3/10", "30%", "36/120"], hint: "Divide outcomes by trials.", explanation: "$\\frac{36}{120}=0.3$." },
        { id: "y11adv-pd-prob-p14", prompt: "From the two-way table, find the conditional probability that a customer used a coupon, given they bought online.", latex: "\\begin{array}{c|cc|c}&\\text{Coupon}&\\text{No coupon}&\\text{Total}\\\\ \\hline \\text{Online}&12&18&30\\\\ \\text{Store}&8&42&50\\\\ \\hline \\text{Total}&20&60&80\\end{array}", answer: "2/5", difficulty: 3, acceptedAnswers: ["0.4", "40%", "12/30"], hint: "Restrict to the Online row total 30.", explanation: "$P(\\text{Coupon}\\mid\\text{Online})=\\frac{12}{30}=\\frac{2}{5}$." },
        { id: "y11adv-pd-prob-p15", prompt: "Decide whether the displayed probabilities show independence.", latex: "P(A)=0.5,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Independent" }, { label: "B", text: "Not independent" }, { label: "C", text: "Mutually exclusive" }, { label: "D", text: "Complementary" }], hint: "Compare $P(A)P(B)$ with $P(A\\cap B)$.", explanation: "$P(A)P(B)=0.25\\ne0.2$, so the events are not independent." },
        { id: "y11adv-pd-prob-p16", prompt: "Find the probability that either event occurs when the events are mutually exclusive.", latex: "P(A)=\\frac{1}{4},\\quad P(B)=\\frac{1}{2}", answer: "3/4", difficulty: 2, acceptedAnswers: ["0.75", "75%"], hint: "Add the probabilities; no overlap.", explanation: "$P(A\\cup B)=\\frac{1}{4}+\\frac{1}{2}=\\frac{3}{4}$." },
        { id: "y11adv-pd-prob-p17", prompt: "From the two-way table, find the marginal probability that a person owns a laptop.", latex: "\\begin{array}{c|cc|c}&\\text{Tablet}&\\text{No tablet}&\\text{Total}\\\\ \\hline \\text{Laptop}&18&32&50\\\\ \\text{No laptop}&12&28&40\\\\ \\hline \\text{Total}&30&60&90\\end{array}", answer: "5/9", difficulty: 3, acceptedAnswers: ["50/90"], hint: "Divide the laptop row total by the grand total.", explanation: "$P(\\text{Laptop})=\\frac{50}{90}=\\frac{5}{9}$." },
        { id: "y11adv-pd-prob-p18", prompt: "Use the general addition rule to find the union probability.", latex: "P(A)=\\frac{1}{2},\\quad P(B)=\\frac{1}{3},\\quad P(A\\cap B)=\\frac{1}{6}", answer: "2/3", difficulty: 3, acceptedAnswers: ["4/6"], hint: "Use a common denominator of 6.", explanation: "$P(A\\cup B)=\\frac{3}{6}+\\frac{2}{6}-\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}$." },
        { id: "y11adv-pd-prob-p19", prompt: "Which option identifies the mistake in the displayed conditional probability calculation?", latex: "P(\\text{Pass}\\mid\\text{Group B})=\\frac{21}{60}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "The numerator should be 45" }, { label: "B", text: "The answer should be a percentage only" }, { label: "C", text: "The denominator should be the Group B total, not 60" }, { label: "D", text: "The events must be mutually exclusive" }], hint: "Conditioning restricts the denominator.", explanation: "Conditioning on Group B requires the Group B total (e.g. 30) as the denominator, not the whole-table total 60." },
        { id: "y11adv-pd-prob-p20", prompt: "A survey estimate is based on the displayed results. Choose the best interpretation.", latex: "\\text{preferred option}=18,\\quad \\text{surveyed}=72", answer: "A", difficulty: 2, choices: [{ label: "A", text: "About 25% of similar people may prefer the option" }, { label: "B", text: "Exactly 25% of all people must prefer the option" }, { label: "C", text: "The complement is impossible" }, { label: "D", text: "The probability must be 1" }], hint: "Relative frequency is an estimate.", explanation: "$\\frac{18}{72}=0.25$, an estimate of the true probability from observed data." },
        { id: "y11adv-pd-prob-p21", prompt: "From the two-way table, find the conditional probability that a student studies music, given they are in Year 11.", latex: "\\begin{array}{c|cc|c}&\\text{Music}&\\text{No music}&\\text{Total}\\\\ \\hline \\text{Year 11}&16&24&40\\\\ \\text{Year 12}&10&20&30\\\\ \\hline \\text{Total}&26&44&70\\end{array}", answer: "2/5", difficulty: 4, acceptedAnswers: ["0.4", "40%", "16/40"], hint: "Use the Year 11 row total 40.", explanation: "$P(\\text{Music}\\mid\\text{Year 11})=\\frac{16}{40}=\\frac{2}{5}$." },
        { id: "y11adv-pd-prob-p22", prompt: "Events A and B are independent with $P(A)=0.4$ and $P(B)=0.5$. Find $P(A\\cup B)$.", latex: "P(A)=0.4,\\quad P(B)=0.5,\\quad \\text{independent}", answer: "0.7", difficulty: 5, acceptedAnswers: ["7/10", "70%"], hint: "First find $P(A\\cap B)=P(A)P(B)$, then use the addition rule.", explanation: "$P(A\\cap B)=0.4\\times0.5=0.2$, so $P(A\\cup B)=0.4+0.5-0.2=0.7$." },
        { id: "y11adv-pd-prob-p23", prompt: "From the two-way table, find the conditional probability that a person owns no tablet, given they own no laptop.", latex: "\\begin{array}{c|cc|c}&\\text{Tablet}&\\text{No tablet}&\\text{Total}\\\\ \\hline \\text{Laptop}&18&32&50\\\\ \\text{No laptop}&12&28&40\\\\ \\hline \\text{Total}&30&60&90\\end{array}", answer: "7/10", difficulty: 4, acceptedAnswers: ["0.7", "70%", "28/40"], hint: "Use the No laptop row total 40.", explanation: "$P(\\text{No tablet}\\mid\\text{No laptop})=\\frac{28}{40}=\\frac{7}{10}$." },
        { id: "y11adv-pd-prob-p24", prompt: "Given $P(A)=0.7$, $P(B)=0.4$, and $P(A\\cup B)=0.9$, find $P(A\\cap B)$.", latex: "P(A)=0.7,\\quad P(B)=0.4,\\quad P(A\\cup B)=0.9", answer: "0.2", difficulty: 4, acceptedAnswers: ["1/5", "20%"], hint: "Rearrange the addition rule for $P(A\\cap B)$.", explanation: "$P(A\\cap B)=P(A)+P(B)-P(A\\cup B)=0.7+0.4-0.9=0.2$." },
        { id: "y11adv-pd-prob-p25", prompt: "From the two-way table, find the conditional probability that a person passed, given they were tutored.", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Tutored}&15&5&20\\\\ \\text{Not tutored}&5&25&30\\\\ \\hline \\text{Total}&20&30&50\\end{array}", answer: "3/4", difficulty: 5, acceptedAnswers: ["0.75", "75%", "15/20"], hint: "Restrict to the Tutored row total 20.", explanation: "$P(\\text{Pass}\\mid\\text{Tutored})=\\frac{15}{20}=\\frac{3}{4}$." },
        { id: "y11adv-pd-prob-p26", prompt: "Using the same table, test independence of Pass and Tutored by comparing $P(\\text{Pass}\\mid\\text{Tutored})$ with $P(\\text{Pass})$ (enter $P(\\text{Pass})$ as a fraction).", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Tutored}&15&5&20\\\\ \\text{Not tutored}&5&25&30\\\\ \\hline \\text{Total}&20&30&50\\end{array}", answer: "2/5", difficulty: 5, acceptedAnswers: ["0.4", "40%", "20/50"], hint: "Use the Pass column total 20 over the grand total 50.", explanation: "$P(\\text{Pass})=\\frac{20}{50}=\\frac{2}{5}=0.4$; since $P(\\text{Pass}\\mid\\text{Tutored})=0.75\\ne0.4$, Pass and Tutored are not independent." },
        { id: "y11adv-pd-prob-p27", prompt: "A and B are mutually exclusive with $P(A)=0.35$ and $P(B)=0.4$. Find the probability that neither occurs.", latex: "P(A)=0.35,\\quad P(B)=0.4,\\quad A\\cap B=\\emptyset", answer: "0.25", difficulty: 5, acceptedAnswers: ["1/4", "25%"], hint: "Find $P(A\\cup B)$ first, then take its complement.", explanation: "$P(A\\cup B)=0.35+0.4=0.75$, so $P(\\text{neither})=1-0.75=0.25$." },
        { id: "y11adv-pd-prob-p28", prompt: "From the two-way table, find the probability that a randomly chosen person owns a tablet OR a laptop (at least one).", latex: "\\begin{array}{c|cc|c}&\\text{Tablet}&\\text{No tablet}&\\text{Total}\\\\ \\hline \\text{Laptop}&18&32&50\\\\ \\text{No laptop}&12&28&40\\\\ \\hline \\text{Total}&30&60&90\\end{array}", answer: "31/45", difficulty: 5, acceptedAnswers: ["62/90"], hint: "Either count the complement (no tablet and no laptop) or add the three relevant cells.", explanation: "Neither is 28 of 90, so $P(\\text{at least one})=1-\\frac{28}{90}=\\frac{62}{90}=\\frac{31}{45}$." },
        { id: "y11adv-pd-prob-p29", prompt: "Given $P(A)=0.6$, $P(B)=0.3$, with A and B independent, find the probability that neither A nor B occurs.", latex: "P(A)=0.6,\\quad P(B)=0.3,\\quad \\text{independent}", answer: "0.28", difficulty: 5, acceptedAnswers: ["7/25", "28%"], hint: "Neither means $A'\\cap B'$; use independence of complements.", explanation: "$P(A')P(B')=0.4\\times0.7=0.28$." },
        { id: "y11adv-pd-prob-p30", prompt: "Two fair coins are tossed. Find the probability of at least one head.", latex: "\\{HH,\\ HT,\\ TH,\\ TT\\}", answer: "3/4", difficulty: 4, acceptedAnswers: ["0.75", "75%"], hint: "Use the complement: at least one head is the opposite of no heads.", explanation: "$P(\\text{no heads})=\\frac{1}{4}$, so $P(\\text{at least one head})=1-\\frac{1}{4}=\\frac{3}{4}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-prob-mp1",
          prompt: "A survey of 80 students records lunch choices by year group.",
          latex: "\\begin{array}{c|cc|c}&\\text{Canteen}&\\text{Brought lunch}&\\text{Total}\\\\ \\hline \\text{Year 11}&20&30&50\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&32&48&80\\end{array}",
          answer: "2/5",
          hint: "Use the grand total for marginal and joint probabilities, and a row total for the conditional probability.",
          explanation:
            "(a) $P(\\text{Canteen})=\\frac{32}{80}=\\frac{2}{5}$. (b) $P(\\text{Year 11}\\cap\\text{Canteen})=\\frac{20}{80}=\\frac{1}{4}$. (c) $P(\\text{Canteen}\\mid\\text{Year 12})=\\frac{12}{30}=\\frac{2}{5}$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the probability a randomly chosen student uses the canteen.", marks: 1, answer: "2/5", acceptedAnswers: ["0.4", "40%", "32/80"], hint: "Use the canteen column total over 80.", explanation: "$P=\\frac{32}{80}=\\frac{2}{5}$." },
            { key: "b", label: "(b)", prompt: "Find the probability a student is a Year 11 canteen user.", marks: 1, answer: "1/4", acceptedAnswers: ["0.25", "25%", "20/80"], hint: "Use the matching cell count over 80.", explanation: "$P=\\frac{20}{80}=\\frac{1}{4}$." },
            { key: "c", label: "(c)", prompt: "Find the probability a student uses the canteen, given they are in Year 12.", latex: "P(\\text{Canteen}\\mid\\text{Year 12})", marks: 2, answer: "2/5", acceptedAnswers: ["0.4", "40%", "12/30"], hint: "Restrict to the Year 12 row total 30.", explanation: "$P(\\text{Canteen}\\mid\\text{Year 12})=\\frac{12}{30}=\\frac{2}{5}$." },
          ],
        },
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
          "A random variable gives a number to each outcome of a chance process. It is discrete when the possible values are countable, such as 0, 1, 2, or 3 goals.",
          "A probability distribution table pairs each possible value with its chance. Read across carefully: the value row tells you what can happen, and the probability row tells you how likely it is.",
          "The probabilities must all be non-negative and add to 1 because the table must account for every possible outcome.",
          "Words matter: at least means include the stated value and everything above it; at most means include the stated value and everything below it. For not equal, a complement is often quicker.",
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
        dataAnswer("y11adv-pd-drv-m3", "Find the probability that X is odd.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.4&0.3&0.2\\end{array}", "0.6", ["3/5", "0.60"]),
        dataAnswer("y11adv-pd-drv-m4", "Find the probability that the random variable is at least the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.4&0.3\\end{array}\\quad P(X\\ge2)", "0.7", ["7/10", "0.70"]),
        dataAnswer("y11adv-pd-drv-m5", "Find the probability that the random variable is at most the displayed value.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&0.35&0.30&0.20\\end{array}\\quad P(X\\le1)", "0.5", ["1/2", "0.50"]),
        dataAnswer("y11adv-pd-drv-m6", "Find the probability that the random variable is not equal to the displayed value.", "P(X=2)=0.6,\\quad P(X\\ne2)", "0.4", ["2/5", "0.40"]),
        practicalChoice("y11adv-pd-drv-m7", "Which option identifies the error in the displayed distribution?", "D", ["The probabilities should be whole numbers", "The values must start at 1", "The probabilities add to exactly 1", "One probability is negative"], "A probability cannot be negative.", "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.6&-0.1&0.5\\end{array}"),
        practicalChoice("y11adv-pd-drv-m8", "Which probability matches the phrase at least two successes?", "C", ["$P(X<2)$", "$P(X\\le2)$", "$P(X\\ge2)$", "$P(X\\ne2)$"], "At least two means two or more."),
        dataAnswer("y11adv-pd-drv-m9", "Find the missing probability, then give the probability of the displayed event.", "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.25&p&0.30&0.15\\end{array}\\quad P(X=1)", "0.3", ["3/10", "0.30"]),
        practicalChoice("y11adv-pd-drv-m10", "A random variable records the number of late assignments submitted in a week. Which statement is correct?", "A", ["It is discrete because the values are counts", "It is continuous because time is involved", "Its probabilities do not need to add to 1", "It cannot have value 0"], "The number of assignments is counted, so the random variable is discrete."),
      ],
      masteryQuizPool: [
        { id: "y11adv-pd-drv-p1", prompt: "Choose the correct judgement about the displayed distribution.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&0.5\\end{array}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "Valid" }, { label: "B", text: "Invalid: a probability is negative" }, { label: "C", text: "Invalid: the total exceeds 1" }, { label: "D", text: "Invalid: values must be percentages" }], hint: "Check non-negative and sum to 1.", explanation: "All probabilities are non-negative and add to 1, so it is valid." },
        { id: "y11adv-pd-drv-p2", prompt: "Find the missing probability.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.3&0.4&p\\end{array}", answer: "0.3", difficulty: 1, acceptedAnswers: ["3/10", "30%"], hint: "Probabilities add to 1.", explanation: "$p=1-0.3-0.4=0.3$." },
        { id: "y11adv-pd-drv-p3", prompt: "Read the probability for the displayed value.", latex: "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}\\quad P(X=2)", answer: "0.5", difficulty: 1, acceptedAnswers: ["1/2", "50%"], hint: "Read the probability row above $x=2$.", explanation: "$P(X=2)=0.5$." },
        { id: "y11adv-pd-drv-p4", prompt: "Find the probability that the random variable is not equal to the displayed value.", latex: "P(X=0)=0.25,\\quad P(X\\ne0)", answer: "0.75", difficulty: 1, acceptedAnswers: ["3/4", "75%"], hint: "Use the complement.", explanation: "$P(X\\ne0)=1-0.25=0.75$." },
        { id: "y11adv-pd-drv-p5", prompt: "Find the missing probability.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&p&0.4\\end{array}", answer: "0.3", difficulty: 2, acceptedAnswers: ["3/10", "30%"], hint: "Sum to 1.", explanation: "$p=1-0.1-0.2-0.4=0.3$." },
        { id: "y11adv-pd-drv-p6", prompt: "Find the probability that the random variable is at least the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.2&0.3&0.1&0.4\\end{array}\\quad P(X\\ge2)", answer: "0.5", difficulty: 2, acceptedAnswers: ["1/2", "50%"], hint: "Add probabilities for 2 and 3.", explanation: "$P(X\\ge2)=0.1+0.4=0.5$." },
        { id: "y11adv-pd-drv-p7", prompt: "Find the probability that the random variable is at most the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.2&0.3&0.1&0.4\\end{array}\\quad P(X\\le1)", answer: "0.5", difficulty: 2, acceptedAnswers: ["1/2", "50%"], hint: "Add probabilities for 0 and 1.", explanation: "$P(X\\le1)=0.2+0.3=0.5$." },
        { id: "y11adv-pd-drv-p8", prompt: "Which context is best modelled by a discrete random variable?", latex: "\\text{Choose one}", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Exact waiting time for a bus" }, { label: "B", text: "Number of heads in four coin tosses" }, { label: "C", text: "Temperature at noon" }, { label: "D", text: "Height of a plant" }], hint: "Discrete values are counted.", explanation: "The number of heads is counted with listable values." },
        { id: "y11adv-pd-drv-p9", prompt: "Find the probability that X is odd.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.4&0.3&0.2\\end{array}", answer: "0.6", difficulty: 3, acceptedAnswers: ["3/5", "60%"], hint: "Odd values are 1 and 3.", explanation: "$P(X=1)+P(X=3)=0.4+0.2=0.6$." },
        { id: "y11adv-pd-drv-p10", prompt: "Find the probability that X is even (include 0).", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&0.35&0.30&0.20\\end{array}", answer: "0.45", difficulty: 3, acceptedAnswers: ["9/20", "45%"], hint: "Even values are 0 and 2.", explanation: "$P(X=0)+P(X=2)=0.15+0.30=0.45$." },
        { id: "y11adv-pd-drv-p11", prompt: "Find the missing probability.", latex: "\\begin{array}{c|cccc}x&1&2&3&4\\\\ \\hline P(X=x)&0.25&p&0.15&0.30\\end{array}", answer: "0.3", difficulty: 3, acceptedAnswers: ["3/10", "30%"], hint: "Sum to 1.", explanation: "$p=1-0.25-0.15-0.30=0.30$." },
        { id: "y11adv-pd-drv-p12", prompt: "Which probability matches the phrase at least two successes?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$P(X<2)$" }, { label: "B", text: "$P(X\\le2)$" }, { label: "C", text: "$P(X\\ge2)$" }, { label: "D", text: "$P(X\\ne2)$" }], hint: "At least means greater than or equal.", explanation: "At least two means $X\\ge2$." },
        { id: "y11adv-pd-drv-p13", prompt: "Decide why the displayed distribution is invalid.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.4&0.4&0.3\\end{array}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "It has too many x-values" }, { label: "B", text: "The x-values are not probabilities" }, { label: "C", text: "The probabilities add to more than 1" }, { label: "D", text: "The random variable is continuous" }], hint: "Add the probabilities.", explanation: "$0.4+0.4+0.3=1.1>1$, so the distribution is invalid." },
        { id: "y11adv-pd-drv-p14", prompt: "Which option identifies the error in the displayed distribution?", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.6&-0.1&0.5\\end{array}", answer: "D", difficulty: 3, choices: [{ label: "A", text: "The probabilities should be whole numbers" }, { label: "B", text: "The values must start at 1" }, { label: "C", text: "The probabilities add to exactly 1" }, { label: "D", text: "One probability is negative" }], hint: "Probabilities cannot be negative.", explanation: "$-0.1$ is negative, which is not allowed." },
        { id: "y11adv-pd-drv-p15", prompt: "Find the probability that the random variable is at least the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.4&0.3\\end{array}\\quad P(X\\ge2)", answer: "0.7", difficulty: 3, acceptedAnswers: ["7/10", "70%"], hint: "Add probabilities for 2 and 3.", explanation: "$P(X\\ge2)=0.4+0.3=0.7$." },
        { id: "y11adv-pd-drv-p16", prompt: "Find the probability that the random variable is not equal to the displayed value.", latex: "P(X=2)=0.6,\\quad P(X\\ne2)", answer: "0.4", difficulty: 2, acceptedAnswers: ["2/5", "40%"], hint: "Complement.", explanation: "$P(X\\ne2)=1-0.6=0.4$." },
        { id: "y11adv-pd-drv-p17", prompt: "Read the probability for the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.05&0.25&0.45&0.25\\end{array}\\quad P(X=3)", answer: "0.25", difficulty: 1, acceptedAnswers: ["1/4", "25%"], hint: "Read the probability above $x=3$.", explanation: "$P(X=3)=0.25$." },
        { id: "y11adv-pd-drv-p18", prompt: "Find the probability that the random variable is at most the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&0.35&0.30&0.20\\end{array}\\quad P(X\\le1)", answer: "0.5", difficulty: 2, acceptedAnswers: ["1/2", "50%"], hint: "Add probabilities for 0 and 1.", explanation: "$P(X\\le1)=0.15+0.35=0.5$." },
        { id: "y11adv-pd-drv-p19", prompt: "A random variable records the number of goals scored in a match. Which statement is correct?", latex: "\\text{Choose one}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "It is discrete because the values are counts" }, { label: "B", text: "It is continuous because time is involved" }, { label: "C", text: "Its probabilities do not need to add to 1" }, { label: "D", text: "It cannot take the value 0" }], hint: "Goals are counted.", explanation: "The number of goals is a count, so the variable is discrete." },
        { id: "y11adv-pd-drv-p20", prompt: "Find the missing probability, then give the probability of the displayed event.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.25&p&0.30&0.15\\end{array}\\quad P(X=1)", answer: "0.3", difficulty: 3, acceptedAnswers: ["3/10", "30%"], hint: "Find $p$ from the sum to 1.", explanation: "$p=1-0.25-0.30-0.15=0.30$, so $P(X=1)=0.3$." },
        { id: "y11adv-pd-drv-p21", prompt: "Find the value of $k$ that makes the distribution valid.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&k&0.3&0.4\\end{array}", answer: "0.3", difficulty: 3, acceptedAnswers: ["3/10", "30%"], hint: "The total must equal 1.", explanation: "$k=1-0.3-0.4=0.3$." },
        { id: "y11adv-pd-drv-p22", prompt: "Find the probability that the random variable is more than the displayed value.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.3&0.4&0.2\\end{array}\\quad P(X>1)", answer: "0.6", difficulty: 4, acceptedAnswers: ["3/5", "60%"], hint: "More than 1 means $X=2$ or $X=3$.", explanation: "$P(X>1)=0.4+0.2=0.6$." },
        { id: "y11adv-pd-drv-p23", prompt: "Find the missing probability when one entry is expressed in terms of another. The distribution has $P(X=2)=2P(X=0)$.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&p&0.4&2p\\end{array}", answer: "0.2", difficulty: 4, acceptedAnswers: ["1/5", "20%"], hint: "Solve $p+0.4+2p=1$.", explanation: "$3p=0.6$, so $p=0.2$ (and $P(X=2)=0.4$)." },
        { id: "y11adv-pd-drv-p24", prompt: "Find the probability that the random variable is strictly between 0 and 3.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.2&0.25&0.35&0.20\\end{array}\\quad P(0<X<3)", answer: "0.6", difficulty: 4, acceptedAnswers: ["3/5", "60%"], hint: "Strictly between means $X=1$ or $X=2$.", explanation: "$P(0<X<3)=0.25+0.35=0.6$." },
        { id: "y11adv-pd-drv-p25", prompt: "A distribution has $P(X=x)=\\frac{x}{10}$ for $x=1,2,3,4$. Find $P(X\\ge3)$.", latex: "P(X=x)=\\frac{x}{10},\\quad x=1,2,3,4", answer: "7/10", difficulty: 5, acceptedAnswers: ["0.7", "70%"], hint: "Add $P(X=3)$ and $P(X=4)$.", explanation: "$P(X\\ge3)=\\frac{3}{10}+\\frac{4}{10}=\\frac{7}{10}$." },
        { id: "y11adv-pd-drv-p26", prompt: "A distribution has $P(X=x)=\\frac{x}{10}$ for $x=1,2,3,4$. Verify it is valid by finding the total probability.", latex: "P(X=x)=\\frac{x}{10},\\quad x=1,2,3,4", answer: "1", difficulty: 5, hint: "Add all four probabilities.", explanation: "$\\frac{1+2+3+4}{10}=\\frac{10}{10}=1$, so the distribution is valid." },
        { id: "y11adv-pd-drv-p27", prompt: "Find $a$ so the distribution is valid, given $P(X=0)=a$, $P(X=1)=2a$, $P(X=2)=3a$, $P(X=3)=4a$.", latex: "a+2a+3a+4a=1", answer: "0.1", difficulty: 5, acceptedAnswers: ["1/10", "10%"], hint: "Combine like terms and solve $10a=1$.", explanation: "$10a=1$, so $a=0.1$." },
        { id: "y11adv-pd-drv-p28", prompt: "Using $P(X=0)=0.1$, $P(X=1)=0.2$, $P(X=2)=0.3$, $P(X=3)=0.4$, find $P(X\\ge1\\mid X\\le2)$.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.3&0.4\\end{array}", answer: "5/6", difficulty: 5, acceptedAnswers: ["0.833", "0.8333"], hint: "Conditional probability: divide $P(1\\le X\\le2)$ by $P(X\\le2)$.", explanation: "$P(1\\le X\\le2)=0.5$ and $P(X\\le2)=0.6$, so $P(X\\ge1\\mid X\\le2)=\\frac{0.5}{0.6}=\\frac{5}{6}$." },
        { id: "y11adv-pd-drv-p29", prompt: "A distribution has $P(X=x)=c(4-x)$ for $x=0,1,2,3$. Find $c$.", latex: "P(X=x)=c(4-x),\\quad x=0,1,2,3", answer: "1/10", difficulty: 5, acceptedAnswers: ["0.1", "10%"], hint: "Sum $c(4+3+2+1)=1$.", explanation: "$c(4+3+2+1)=10c=1$, so $c=\\frac{1}{10}$." },
        { id: "y11adv-pd-drv-p30", prompt: "Using $P(X=x)=\\frac{4-x}{10}$ for $x=0,1,2,3$, find $P(X\\le1)$.", latex: "P(X=x)=\\frac{4-x}{10},\\quad x=0,1,2,3", answer: "7/10", difficulty: 5, acceptedAnswers: ["0.7", "70%"], hint: "Add $P(X=0)$ and $P(X=1)$.", explanation: "$P(X=0)=\\frac{4}{10}$ and $P(X=1)=\\frac{3}{10}$, so $P(X\\le1)=\\frac{7}{10}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-drv-mp1",
          prompt: "A discrete random variable X has the probability distribution shown, where p is unknown.",
          latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&0.30&p&0.20\\end{array}",
          answer: "0.35",
          hint: "Find p from the sum to 1, then read and add probabilities for the requested events.",
          explanation:
            "(a) $p=1-0.15-0.30-0.20=0.35$. (b) $P(X\\ge2)=0.35+0.20=0.55$. (c) $P(X\\ne0)=1-0.15=0.85$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find the value of p.", latex: "\\sum P(X=x)=1", marks: 1, answer: "0.35", acceptedAnswers: ["7/20", "35%"], hint: "Subtract the known probabilities from 1.", explanation: "$p=1-0.15-0.30-0.20=0.35$." },
            { key: "b", label: "(b)", prompt: "Find P(X ≥ 2).", marks: 2, answer: "0.55", acceptedAnswers: ["11/20", "55%"], hint: "Add the probabilities for $x=2$ and $x=3$.", explanation: "$P(X\\ge2)=0.35+0.20=0.55$." },
            { key: "c", label: "(c)", prompt: "Find P(X ≠ 0).", marks: 1, answer: "0.85", acceptedAnswers: ["17/20", "85%"], hint: "Use the complement of $P(X=0)$.", explanation: "$P(X\\ne0)=1-0.15=0.85$." },
          ],
        },
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
          "Expected value is the long-run average you would expect after many repetitions. More likely outcomes should influence that average more strongly, which is why each value is multiplied by its probability.",
          "Variance measures how spread out the results are around that long-run average. The shortcut $E(X^2) - [E(X)]^2$ compares the weighted square values with the square of the mean.",
          "Standard deviation is the square root of variance. Taking the square root brings the spread back into the same units as the original random variable.",
          "For games of chance, expected winnings describe the long-run balance, not what must happen on one play. Zero is fair, a positive result favours the player, and a negative result does not.",
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
        dataAnswer("y11adv-pd-ev-m3", "Find the standard deviation using the displayed moments.", "E(X)=2,\\quad E(X^2)=20", "4"),
        dataAnswer("y11adv-pd-ev-m4", "Find the variance using the displayed moments.", "E(X)=2,\\quad E(X^2)=7", "3"),
        dataAnswer("y11adv-pd-ev-m5", "Find the expected winnings for the game.", "\\begin{array}{c|cc}\\text{winnings}&5&-1\\\\ \\hline P&\\frac14&\\frac34\\end{array}", "0.5", ["1/2", "0.50"]),
        practicalChoice("y11adv-pd-ev-m6", "Decide whether the game is favourable to the player.", "B", ["Fair", "Favourable", "Unfavourable", "Impossible"], "A positive expected winning is favourable to the player.", "E(\\text{winnings})=0.5"),
        practicalChoice("y11adv-pd-ev-m7", "Which option identifies the error in the displayed variance calculation?", "D", ["The probabilities should be ignored", "The expected value is always zero", "The standard deviation should be negative", "The square of the expected value was not subtracted"], "Variance is $E(X^2)-[E(X)]^2$.", "E(X)=3,\\quad E(X^2)=11,\\quad \\operatorname{Var}(X)=11"),
        practicalChoice("y11adv-pd-ev-m8", "Choose the correct interpretation of the expected value in this context.", "A", ["Over many days, the average number of calls is about 4.5", "Every day has exactly 4.5 calls", "The probability of a call is 4.5", "The standard deviation is 4.5"], "Expected value is a long-run average.", "E(X)=4.5\\quad \\text{calls per day}"),
        practicalChoice("y11adv-pd-ev-m9", "Find the expected value after completing the missing probability.", "C", ["1.4", "1.6", "1.8", "2.0"], "The missing probability is 0.2, so $E(X)=1(0.4)+2(0.4)+3(0.2)=1.8$.", "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.4&0.4&p\\end{array}"),
        practicalChoice("y11adv-pd-ev-m10", "Choose the statement that correctly compares spread using the displayed standard deviations.", "B", ["Class A is more spread out", "Class B is more spread out", "The means must be equal", "Both distributions are invalid"], "A larger standard deviation indicates greater spread.", "SD(A)=2.1,\\quad SD(B)=3.4"),
      ],
      masteryQuizPool: [
        { id: "y11adv-pd-ev-p1", prompt: "Find the expected value.", latex: "\\begin{array}{c|cc}x&0&4\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", answer: "2", difficulty: 1, hint: "Multiply each value by its probability and add.", explanation: "$E(X)=0(0.5)+4(0.5)=2$." },
        { id: "y11adv-pd-ev-p2", prompt: "Find the expected value.", latex: "\\begin{array}{c|cc}x&0&10\\\\ \\hline P(X=x)&0.7&0.3\\end{array}", answer: "3", difficulty: 1, hint: "Weight each value by its probability.", explanation: "$E(X)=0(0.7)+10(0.3)=3$." },
        { id: "y11adv-pd-ev-p3", prompt: "Find the standard deviation using the displayed variance.", latex: "\\operatorname{Var}(X)=9", answer: "3", difficulty: 1, hint: "Take the square root.", explanation: "$SD(X)=\\sqrt{9}=3$." },
        { id: "y11adv-pd-ev-p4", prompt: "Find the variance using the displayed moments.", latex: "E(X)=3,\\quad E(X^2)=13", answer: "4", difficulty: 1, hint: "Use $\\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.", explanation: "$\\operatorname{Var}(X)=13-3^2=13-9=4$." },
        { id: "y11adv-pd-ev-p5", prompt: "Find the value of the displayed second moment.", latex: "\\begin{array}{c|cc}x&1&3\\\\ \\hline P(X=x)&0.5&0.5\\end{array}\\quad E(X^2)", answer: "5", difficulty: 2, hint: "Square each value first, then weight.", explanation: "$E(X^2)=1^2(0.5)+3^2(0.5)=0.5+4.5=5$." },
        { id: "y11adv-pd-ev-p6", prompt: "Find the expected value.", latex: "\\begin{array}{c|ccc}x&0&2&4\\\\ \\hline P(X=x)&0.25&0.50&0.25\\end{array}", answer: "2", difficulty: 2, hint: "Weighted average.", explanation: "$E(X)=0(0.25)+2(0.5)+4(0.25)=2$." },
        { id: "y11adv-pd-ev-p7", prompt: "Find the variance using the displayed moments.", latex: "E(X)=2,\\quad E(X^2)=7", answer: "3", difficulty: 2, hint: "Subtract the square of the mean.", explanation: "$\\operatorname{Var}(X)=7-2^2=3$." },
        { id: "y11adv-pd-ev-p8", prompt: "Classify the game using the displayed expected winnings.", latex: "E(\\text{winnings})=0", answer: "A", difficulty: 2, choices: [{ label: "A", text: "Fair" }, { label: "B", text: "Favourable to the player" }, { label: "C", text: "Unfavourable to the player" }, { label: "D", text: "Impossible to decide" }], hint: "Zero expected winnings means fair.", explanation: "An expected winning of zero means the game is fair." },
        { id: "y11adv-pd-ev-p9", prompt: "Find the standard deviation using the displayed moments.", latex: "E(X)=2,\\quad E(X^2)=20", answer: "4", difficulty: 3, hint: "Find the variance first, then square-root.", explanation: "$\\operatorname{Var}(X)=20-4=16$, so $SD(X)=\\sqrt{16}=4$." },
        { id: "y11adv-pd-ev-p10", prompt: "Find the value of the displayed second moment.", latex: "\\begin{array}{c|cc}x&2&4\\\\ \\hline P(X=x)&0.5&0.5\\end{array}\\quad E(X^2)", answer: "10", difficulty: 3, hint: "Square each value, then weight.", explanation: "$E(X^2)=2^2(0.5)+4^2(0.5)=2+8=10$." },
        { id: "y11adv-pd-ev-p11", prompt: "Find the expected winnings for the game.", latex: "\\begin{array}{c|cc}\\text{winnings}&5&-1\\\\ \\hline P&\\frac14&\\frac34\\end{array}", answer: "0.5", difficulty: 3, acceptedAnswers: ["1/2", "50%"], hint: "Weight each payout by its probability.", explanation: "$E=5\\left(\\frac14\\right)+(-1)\\left(\\frac34\\right)=\\frac54-\\frac34=\\frac12=0.5$." },
        { id: "y11adv-pd-ev-p12", prompt: "Classify the game from the player's viewpoint using the displayed expected winnings.", latex: "E(\\text{winnings})=0.5", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Fair" }, { label: "B", text: "Favourable" }, { label: "C", text: "Unfavourable" }, { label: "D", text: "Impossible" }], hint: "Positive expected winnings favour the player.", explanation: "A positive expected winning is favourable to the player." },
        { id: "y11adv-pd-ev-p13", prompt: "Find the expected value.", latex: "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}", answer: "2.1", difficulty: 3, acceptedAnswers: ["21/10"], hint: "Multiply and add.", explanation: "$E(X)=1(0.2)+2(0.5)+3(0.3)=0.2+1.0+0.9=2.1$." },
        { id: "y11adv-pd-ev-p14", prompt: "Find the second moment.", latex: "\\begin{array}{c|cc}x&0&5\\\\ \\hline P(X=x)&0.6&0.4\\end{array}\\quad E(X^2)", answer: "10", difficulty: 3, hint: "Square each value first.", explanation: "$E(X^2)=0^2(0.6)+5^2(0.4)=10$." },
        { id: "y11adv-pd-ev-p15", prompt: "Which option identifies the error in the displayed variance calculation?", latex: "E(X)=3,\\quad E(X^2)=11,\\quad \\operatorname{Var}(X)=11", answer: "D", difficulty: 3, choices: [{ label: "A", text: "The probabilities should be ignored" }, { label: "B", text: "The expected value is always zero" }, { label: "C", text: "The standard deviation should be negative" }, { label: "D", text: "The square of the expected value was not subtracted" }], hint: "Variance is $E(X^2)-[E(X)]^2$.", explanation: "$\\operatorname{Var}(X)=11-3^2=2$, not 11; the $[E(X)]^2$ term was omitted." },
        { id: "y11adv-pd-ev-p16", prompt: "Find the standard deviation using the displayed moments.", latex: "E(X)=1,\\quad E(X^2)=10", answer: "3", difficulty: 3, hint: "Find variance, then square-root.", explanation: "$\\operatorname{Var}(X)=10-1=9$, so $SD(X)=3$." },
        { id: "y11adv-pd-ev-p17", prompt: "Find the variance using the displayed moments.", latex: "E(X)=5,\\quad E(X^2)=29", answer: "4", difficulty: 2, hint: "Subtract the square of the mean.", explanation: "$\\operatorname{Var}(X)=29-25=4$." },
        { id: "y11adv-pd-ev-p18", prompt: "Choose the best long-run interpretation of the expected value.", latex: "E(X)=2.5", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Every trial must equal 2.5" }, { label: "B", text: "The average result over many trials is about 2.5" }, { label: "C", text: "The most common value must be 2.5" }, { label: "D", text: "There are exactly 2.5 outcomes" }], hint: "Expected value is a long-run average.", explanation: "Expected value describes the long-run average." },
        { id: "y11adv-pd-ev-p19", prompt: "Choose the statement that correctly compares spread using the displayed standard deviations.", latex: "SD(A)=1.8,\\quad SD(B)=2.9", answer: "B", difficulty: 2, choices: [{ label: "A", text: "Set A is more spread out" }, { label: "B", text: "Set B is more spread out" }, { label: "C", text: "The means must be equal" }, { label: "D", text: "Both distributions are invalid" }], hint: "Larger SD means more spread.", explanation: "Set B has the larger standard deviation, so it is more spread out." },
        { id: "y11adv-pd-ev-p20", prompt: "Find the expected value after completing the missing probability.", latex: "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.4&0.4&p\\end{array}", answer: "1.8", difficulty: 3, acceptedAnswers: ["9/5"], hint: "Find $p=0.2$ first.", explanation: "$p=0.2$, so $E(X)=1(0.4)+2(0.4)+3(0.2)=1.8$." },
        { id: "y11adv-pd-ev-p21", prompt: "Find the expected value.", latex: "\\begin{array}{c|ccc}x&-1&0&2\\\\ \\hline P(X=x)&0.3&0.4&0.3\\end{array}", answer: "0.3", difficulty: 4, acceptedAnswers: ["3/10"], hint: "Include the negative value with its sign.", explanation: "$E(X)=-1(0.3)+0(0.4)+2(0.3)=-0.3+0.6=0.3$." },
        { id: "y11adv-pd-ev-p22", prompt: "Find the variance of the displayed distribution.", latex: "\\begin{array}{c|cc}x&0&2\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", answer: "1", difficulty: 4, hint: "Find $E(X)$ and $E(X^2)$, then subtract.", explanation: "$E(X)=1$, $E(X^2)=0^2(0.5)+2^2(0.5)=2$, so $\\operatorname{Var}(X)=2-1=1$." },
        { id: "y11adv-pd-ev-p23", prompt: "Find the variance of the displayed distribution.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&0.5&0.25\\end{array}", answer: "0.5", difficulty: 4, acceptedAnswers: ["1/2"], hint: "Compute $E(X)$ and $E(X^2)$ from the table.", explanation: "$E(X)=1$, $E(X^2)=0+0.5+1=1.5$, so $\\operatorname{Var}(X)=1.5-1=0.5$." },
        { id: "y11adv-pd-ev-p24", prompt: "Find the fair entry fee for a game that pays the displayed prizes (the expected payout).", latex: "\\begin{array}{c|cc}\\text{prize}&0&12\\\\ \\hline P&\\frac23&\\frac13\\end{array}", answer: "4", difficulty: 5, hint: "A fair fee equals the expected payout.", explanation: "$E=0\\left(\\frac23\\right)+12\\left(\\frac13\\right)=4$, so a fair fee is $\\$4$." },
        { id: "y11adv-pd-ev-p25", prompt: "Find the expected value of the displayed distribution.", latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.1&0.2&0.4&0.3\\end{array}", answer: "1.9", difficulty: 4, acceptedAnswers: ["19/10"], hint: "Multiply each value by its probability.", explanation: "$E(X)=0(0.1)+1(0.2)+2(0.4)+3(0.3)=0.2+0.8+0.9=1.9$." },
        { id: "y11adv-pd-ev-p26", prompt: "Find the standard deviation of the displayed distribution.", latex: "\\begin{array}{c|ccc}x&1&2&3\\\\ \\hline P(X=x)&0.25&0.5&0.25\\end{array}", answer: "0.707", difficulty: 5, acceptedAnswers: ["0.7071", "0.71"], hint: "Find the variance first, then take the square root.", explanation: "$E(X)=2$, $E(X^2)=0.25(1)+0.5(4)+0.25(9)=4.5$, so $\\operatorname{Var}(X)=0.5$ and $SD(X)=\\sqrt{0.5}\\approx0.707$." },
        { id: "y11adv-pd-ev-p27", prompt: "A game charges $\\$3$ to play and pays the displayed prizes. Find the expected profit to the player.", latex: "\\begin{array}{c|cc}\\text{prize}&0&10\\\\ \\hline P&0.8&0.2\\end{array}", answer: "-1", difficulty: 5, acceptedAnswers: ["−1"], hint: "Expected profit = expected prize − cost.", explanation: "Expected prize $=0(0.8)+10(0.2)=2$; profit $=2-3=-1$, so the player loses $\\$1$ on average." },
        { id: "y11adv-pd-ev-p28", prompt: "Find the variance of the displayed distribution.", latex: "\\begin{array}{c|ccc}x&0&3&6\\\\ \\hline P(X=x)&0.5&0.3&0.2\\end{array}", answer: "4.89", difficulty: 5, acceptedAnswers: ["4.89"], hint: "Compute $E(X)$ and $E(X^2)$ carefully.", explanation: "$E(X)=0+0.9+1.2=2.1$; $E(X^2)=0+0.3(9)+0.2(36)=2.7+7.2=9.9$; $\\operatorname{Var}(X)=9.9-2.1^2=9.9-4.41=4.89$." },
        { id: "y11adv-pd-ev-p29", prompt: "The distribution has $P(X=0)=0.5$, $P(X=k)=0.5$ and $E(X)=4$. Find $k$.", latex: "\\begin{array}{c|cc}x&0&k\\\\ \\hline P(X=x)&0.5&0.5\\end{array},\\quad E(X)=4", answer: "8", difficulty: 5, hint: "Set up $0.5k=4$.", explanation: "$E(X)=0(0.5)+k(0.5)=0.5k=4$, so $k=8$." },
        { id: "y11adv-pd-ev-p30", prompt: "For the displayed distribution, find $E(2X+1)$.", latex: "\\begin{array}{c|cc}x&1&5\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", answer: "7", difficulty: 5, hint: "Find $E(X)$ first, then use $E(2X+1)=2E(X)+1$.", explanation: "$E(X)=3$, so $E(2X+1)=2(3)+1=7$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-ev-mp1",
          prompt: "A discrete random variable X has the probability distribution shown.",
          latex: "\\begin{array}{c|ccc}x&0&2&4\\\\ \\hline P(X=x)&0.25&0.50&0.25\\end{array}",
          answer: "2",
          hint: "Find E(X), then E(X^2), then use the variance formula.",
          explanation:
            "(a) $E(X)=0(0.25)+2(0.5)+4(0.25)=2$. (b) $E(X^2)=0+0.5(4)+0.25(16)=6$. (c) $\\operatorname{Var}(X)=6-2^2=2$.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find E(X).", latex: "E(X)=\\sum xP(X=x)", marks: 1, answer: "2", hint: "Weight each value by its probability.", explanation: "$E(X)=0(0.25)+2(0.5)+4(0.25)=2$." },
            { key: "b", label: "(b)", prompt: "Find E(X^2).", latex: "E(X^2)=\\sum x^2P(X=x)", marks: 1, answer: "6", hint: "Square each value before weighting.", explanation: "$E(X^2)=0^2(0.25)+2^2(0.5)+4^2(0.25)=2+4=6$." },
            { key: "c", label: "(c)", prompt: "Find the variance.", latex: "\\operatorname{Var}(X)=E(X^2)-[E(X)]^2", marks: 2, answer: "2", hint: "Subtract the square of E(X) from E(X^2).", explanation: "$\\operatorname{Var}(X)=6-2^2=2$." },
          ],
        },
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
          "Mixed questions become easier when you name the representation before calculating: sorted list, frequency table, row-and-column table, or probability distribution.",
          "Then name the job. Are you finding a typical value, measuring spread, restricting a denominator, completing probabilities to 1, or calculating a weighted average?",
          "In a row-and-column table, a condition narrows the group and therefore narrows the denominator. In a probability distribution, every possible outcome must still be accounted for.",
          "Keep typed answers short, but keep the meaning in mind: exact fractions and clean decimals can describe the same probability, while variance and standard deviation are different stages of the calculation.",
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
          twoWayTableDiagram: {
            description:
              "Two-way table of pass results by group. The Group A row is highlighted because the condition says to work within Group A.",
            rowLabels: ["Group A", "Group B"],
            columnLabels: ["Pass", "Not pass"],
            values: [[24, 6], [21, 9]],
            rowTotals: [30, 30],
            columnTotals: [45, 15],
            grandTotal: 60,
            highlight: {
              kind: "row",
              rowIndex: 0,
              label: "Conditioned group",
            },
          },
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
      masteryQuizPool: [
        { id: "y11adv-pd-exam-p1", prompt: "Find the median of the sorted data set.", latex: "9,\\ 11,\\ 14,\\ 16,\\ 19", answer: "14", difficulty: 1, hint: "Middle of 5 values.", explanation: "The 3rd value is 14." },
        { id: "y11adv-pd-exam-p2", prompt: "Find the missing probability.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&p\\end{array}", answer: "0.5", difficulty: 1, acceptedAnswers: ["1/2", "50%"], hint: "Sum to 1.", explanation: "$p=1-0.2-0.3=0.5$." },
        { id: "y11adv-pd-exam-p3", prompt: "Find the expected value.", latex: "\\begin{array}{c|cc}x&1&5\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", answer: "3", difficulty: 1, hint: "Weighted average.", explanation: "$E(X)=1(0.5)+5(0.5)=3$." },
        { id: "y11adv-pd-exam-p4", prompt: "Find the range of the data set.", latex: "6,\\ 9,\\ 12,\\ 20", answer: "14", difficulty: 1, hint: "Max minus min.", explanation: "$20-6=14$." },
        { id: "y11adv-pd-exam-p5", prompt: "Use the complement rule to find the probability that the event does not occur.", latex: "P(A)=\\frac{7}{10}", answer: "3/10", difficulty: 2, acceptedAnswers: ["0.3", "30%"], hint: "Subtract from 1.", explanation: "$P(A')=1-\\frac{7}{10}=\\frac{3}{10}$." },
        { id: "y11adv-pd-exam-p6", prompt: "Find the interquartile range from the displayed quartiles.", latex: "Q_1=8,\\quad Q_3=21", answer: "13", difficulty: 2, hint: "Subtract.", explanation: "$IQR=21-8=13$." },
        { id: "y11adv-pd-exam-p7", prompt: "Use the general addition rule to find the union probability.", latex: "P(A)=0.4,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", answer: "0.7", difficulty: 2, acceptedAnswers: ["7/10", "70%"], hint: "Add then subtract overlap.", explanation: "$P(A\\cup B)=0.4+0.5-0.2=0.7$." },
        { id: "y11adv-pd-exam-p8", prompt: "Find the variance using the displayed moments.", latex: "E(X)=4,\\quad E(X^2)=20", answer: "4", difficulty: 2, hint: "Use the variance formula.", explanation: "$\\operatorname{Var}(X)=20-16=4$." },
        { id: "y11adv-pd-exam-p9", prompt: "From the two-way table, find the conditional probability of a pass, given Group A.", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Group A}&24&6&30\\\\ \\text{Group B}&21&9&30\\\\ \\hline \\text{Total}&45&15&60\\end{array}", answer: "4/5", difficulty: 3, acceptedAnswers: ["0.8", "80%", "24/30"], hint: "Use the Group A row total 30.", explanation: "$P(\\text{Pass}\\mid\\text{Group A})=\\frac{24}{30}=\\frac{4}{5}$." },
        { id: "y11adv-pd-exam-p10", prompt: "Using the displayed fences, classify the test value.", latex: "\\text{lower fence}=1,\\quad \\text{upper fence}=25,\\quad \\text{test value}=31", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Low outlier" }, { label: "B", text: "Not an outlier" }, { label: "C", text: "High outlier" }, { label: "D", text: "The IQR" }], hint: "Compare with the upper fence.", explanation: "$31>25$, so the value is a high outlier." },
        { id: "y11adv-pd-exam-p11", prompt: "Decide whether the displayed probabilities show independence.", latex: "P(A)=0.3,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.12", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Independent" }, { label: "B", text: "Not independent" }, { label: "C", text: "Mutually exclusive" }, { label: "D", text: "Complementary" }], hint: "Check $P(A)P(B)$.", explanation: "$P(A)P(B)=0.3\\times0.4=0.12=P(A\\cap B)$, so independent." },
        { id: "y11adv-pd-exam-p12", prompt: "Find the standard deviation using the displayed moments.", latex: "E(X)=3,\\quad E(X^2)=13", answer: "2", difficulty: 3, hint: "Find variance, then square-root.", explanation: "$\\operatorname{Var}(X)=13-9=4$, so $SD(X)=2$." },
        { id: "y11adv-pd-exam-p13", prompt: "Find the mean from the frequency table. Give the exact fraction.", latex: "\\begin{array}{c|ccc}x&1&2&4\\\\ \\hline f&2&3&1\\end{array}", answer: "2", difficulty: 3, hint: "Use $\\frac{\\sum xf}{\\sum f}$.", explanation: "$\\sum xf=1(2)+2(3)+4(1)=12$, $\\sum f=6$, so $\\bar{x}=2$." },
        { id: "y11adv-pd-exam-p14", prompt: "From the two-way table, find the conditional probability that a student prefers online lessons, given Year 11.", latex: "\\begin{array}{c|cc|c}&\\text{Online}&\\text{In person}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&22&40\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&30&40&70\\end{array}", answer: "9/20", difficulty: 3, acceptedAnswers: ["0.45", "45%", "18/40"], hint: "Use the Year 11 row total 40.", explanation: "$P(\\text{Online}\\mid\\text{Year 11})=\\frac{18}{40}=\\frac{9}{20}$." },
        { id: "y11adv-pd-exam-p15", prompt: "Find the missing probability.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&p&0.50\\end{array}", answer: "0.25", difficulty: 2, acceptedAnswers: ["1/4", "25%"], hint: "Sum to 1.", explanation: "$p=1-0.25-0.50=0.25$." },
        { id: "y11adv-pd-exam-p16", prompt: "Which summary statistic is least affected by one very large maximum?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "Mean" }, { label: "B", text: "Range" }, { label: "C", text: "Median" }, { label: "D", text: "Maximum" }], hint: "Which ignores the size of the largest value?", explanation: "The median is resistant to an extreme value." },
        { id: "y11adv-pd-exam-p17", prompt: "Find the expected value.", latex: "\\begin{array}{c|ccc}x&0&2&5\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}", answer: "2.5", difficulty: 3, acceptedAnswers: ["5/2"], hint: "Weight and add.", explanation: "$E(X)=0(0.2)+2(0.5)+5(0.3)=2.5$." },
        { id: "y11adv-pd-exam-p18", prompt: "Decide why the displayed probability distribution is invalid.", latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.2&0.3&0.4\\end{array}", answer: "A", difficulty: 2, choices: [{ label: "A", text: "The probabilities add to less than 1" }, { label: "B", text: "The probabilities add to exactly 1" }, { label: "C", text: "The values are not all positive" }, { label: "D", text: "The random variable has too few values" }], hint: "Add the probabilities.", explanation: "$0.2+0.3+0.4=0.9<1$, so the distribution is invalid." },
        { id: "y11adv-pd-exam-p19", prompt: "Use the complement rule to find the probability the event occurs.", latex: "P(A')=0.35", answer: "0.65", difficulty: 2, acceptedAnswers: ["13/20", "65%"], hint: "Subtract from 1.", explanation: "$P(A)=1-0.35=0.65$." },
        { id: "y11adv-pd-exam-p20", prompt: "Use the addition formula to find n(A∪B).", latex: "n(A)=14,\\quad n(B)=9,\\quad n(A\\cap B)=5", answer: "18", difficulty: 3, hint: "$n(A)+n(B)-n(A\\cap B)$.", explanation: "$n(A\\cup B)=14+9-5=18$." },
        { id: "y11adv-pd-exam-p21", prompt: "From the two-way table, find the conditional probability of a pass, given Group B.", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Group A}&24&6&30\\\\ \\text{Group B}&21&9&30\\\\ \\hline \\text{Total}&45&15&60\\end{array}", answer: "7/10", difficulty: 4, acceptedAnswers: ["0.7", "70%", "21/30"], hint: "Use the Group B row total 30.", explanation: "$P(\\text{Pass}\\mid\\text{Group B})=\\frac{21}{30}=\\frac{7}{10}$." },
        { id: "y11adv-pd-exam-p22", prompt: "Events A and B are independent with $P(A)=0.5$ and $P(B)=0.4$. Find $P(A\\cup B)$.", latex: "P(A)=0.5,\\quad P(B)=0.4,\\quad \\text{independent}", answer: "0.7", difficulty: 4, acceptedAnswers: ["7/10", "70%"], hint: "Find $P(A\\cap B)=P(A)P(B)$ first.", explanation: "$P(A\\cap B)=0.2$, so $P(A\\cup B)=0.5+0.4-0.2=0.7$." },
        { id: "y11adv-pd-exam-p23", prompt: "Find the variance of the displayed distribution.", latex: "\\begin{array}{c|cc}x&0&4\\\\ \\hline P(X=x)&0.5&0.5\\end{array}", answer: "4", difficulty: 4, hint: "Find $E(X)$ and $E(X^2)$.", explanation: "$E(X)=2$, $E(X^2)=0+4^2(0.5)=8$, so $\\operatorname{Var}(X)=8-4=4$." },
        { id: "y11adv-pd-exam-p24", prompt: "Find n(A'∩B') using the complement of A∪B.", latex: "n(A)=15,\\quad n(B)=10,\\quad n(A\\cap B)=6,\\quad n(\\xi)=28", answer: "9", difficulty: 4, hint: "Find $n(A\\cup B)$ first, then subtract from $n(\\xi)$.", explanation: "$n(A\\cup B)=15+10-6=19$, so $n(A'\\cap B')=28-19=9$." },
        { id: "y11adv-pd-exam-p25", prompt: "From the two-way table, test independence of Pass and Group A by comparing $P(\\text{Pass}\\mid\\text{Group A})$ with $P(\\text{Pass})$ (enter $P(\\text{Pass})$).", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Group A}&24&6&30\\\\ \\text{Group B}&21&9&30\\\\ \\hline \\text{Total}&45&15&60\\end{array}", answer: "3/4", difficulty: 5, acceptedAnswers: ["0.75", "75%", "45/60"], hint: "Use the Pass column total 45 over the grand total 60.", explanation: "$P(\\text{Pass})=\\frac{45}{60}=\\frac{3}{4}=0.75$; since $P(\\text{Pass}\\mid\\text{Group A})=0.8\\ne0.75$, Pass and Group A are not independent." },
        { id: "y11adv-pd-exam-p26", prompt: "Given $P(A)=0.6$, $P(B)=0.5$, $P(A\\cup B)=0.8$, find the probability that exactly one of A or B occurs.", latex: "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cup B)=0.8", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "50%"], hint: "Exactly one $=P(A\\cup B)-P(A\\cap B)$; find $P(A\\cap B)$ first.", explanation: "$P(A\\cap B)=0.6+0.5-0.8=0.3$, so exactly one $=0.8-0.3=0.5$." },
        { id: "y11adv-pd-exam-p27", prompt: "A distribution has $P(X=x)=\\frac{x}{6}$ for $x=1,2,3$. Find $E(X)$.", latex: "P(X=x)=\\frac{x}{6},\\quad x=1,2,3", answer: "7/3", difficulty: 5, acceptedAnswers: ["2.333", "2.33"], hint: "Weight each value by $\\frac{x}{6}$.", explanation: "$E(X)=1\\cdot\\frac16+2\\cdot\\frac26+3\\cdot\\frac36=\\frac{1+4+9}{6}=\\frac{14}{6}=\\frac{7}{3}$." },
        { id: "y11adv-pd-exam-p28", prompt: "A bag has 5 red and 3 blue counters. Two are drawn without replacement. Find the probability both are red.", latex: "5\\text{ red},\\ 3\\text{ blue},\\ \\text{draw 2 without replacement}", answer: "5/14", difficulty: 5, acceptedAnswers: ["0.357", "0.3571"], hint: "Multiply $P(\\text{1st red})\\times P(\\text{2nd red}\\mid\\text{1st red})$.", explanation: "$\\frac{5}{8}\\times\\frac{4}{7}=\\frac{20}{56}=\\frac{5}{14}$." },
        { id: "y11adv-pd-exam-p29", prompt: "The upper fence of a data set is 40 and $Q_3=28$. Find $Q_1$.", latex: "\\text{upper fence}=40,\\quad Q_3=28", answer: "20", difficulty: 5, hint: "Upper fence $=Q_3+1.5(IQR)$; solve for $IQR$ then $Q_1$.", explanation: "$40=28+1.5(IQR)$ gives $IQR=8$, so $Q_1=Q_3-IQR=28-8=20$." },
        { id: "y11adv-pd-exam-p30", prompt: "A game pays the displayed prizes and costs $\\$2$ to play. Find the expected profit to the player.", latex: "\\begin{array}{c|ccc}\\text{prize}&0&3&9\\\\ \\hline P&0.5&0.3&0.2\\end{array}", answer: "0.7", difficulty: 5, acceptedAnswers: ["7/10", "70%"], hint: "Find the expected prize, then subtract the cost.", explanation: "Expected prize $=0(0.5)+3(0.3)+9(0.2)=0.9+1.8=2.7$; profit $=2.7-2=0.7$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-exam-mp1",
          prompt: "A class is surveyed on whether they passed a quiz, grouped by whether they studied.",
          latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Studied}&18&2&20\\\\ \\text{Did not study}&6&14&20\\\\ \\hline \\text{Total}&24&16&40\\end{array}",
          answer: "9/10",
          hint: "Use a row total for the conditional, and the grand total for the marginal and joint probabilities.",
          explanation:
            "(a) $P(\\text{Pass}\\mid\\text{Studied})=\\frac{18}{20}=\\frac{9}{10}$. (b) $P(\\text{Pass})=\\frac{24}{40}=\\frac{3}{5}$. (c) $P(\\text{Pass}\\cap\\text{Studied})=\\frac{18}{40}=\\frac{9}{20}$; since $P(\\text{Pass})\\cdot P(\\text{Studied})=\\frac35\\cdot\\frac12=\\frac{3}{10}\\ne\\frac{9}{20}$, the events are not independent.",
          parts: [
            { key: "a", label: "(a)", prompt: "Find P(Pass | Studied).", marks: 1, answer: "9/10", acceptedAnswers: ["0.9", "90%", "18/20"], hint: "Use the Studied row total 20.", explanation: "$P(\\text{Pass}\\mid\\text{Studied})=\\frac{18}{20}=\\frac{9}{10}$." },
            { key: "b", label: "(b)", prompt: "Find P(Pass) using the table totals.", marks: 1, answer: "3/5", acceptedAnswers: ["0.6", "60%", "24/40"], hint: "Use the Pass column total over 40.", explanation: "$P(\\text{Pass})=\\frac{24}{40}=\\frac{3}{5}$." },
            { key: "c", label: "(c)", prompt: "Find P(Pass ∩ Studied).", latex: "P(\\text{Pass}\\cap\\text{Studied})=\\frac{18}{40}", marks: 2, answer: "9/20", acceptedAnswers: ["0.45", "45%", "18/40"], hint: "Divide the cell count 18 by the grand total 40.", explanation: "$P(\\text{Pass}\\cap\\text{Studied})=\\frac{18}{40}=\\frac{9}{20}$, and since this differs from $P(\\text{Pass})\\cdot P(\\text{Studied})=\\frac{3}{10}$, the events are not independent." },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "sets-venn-diagrams") {
    return {
      ...base,
      description:
        "Use formal set notation and Venn diagrams; apply n(A∪B)=n(A)+n(B)−n(A∩B) and P(A∪B)=P(A)+P(B)−P(A∩B).",
      learningIntention:
        "Learn set notation, how to read and use Venn diagrams, and how the addition formula connects set counts and probabilities.",
      successCriteria: [
        "Use set notation: ∈, ∉, ∅, ξ, A', A∩B, A∪B, A⊆B.",
        "Read counts from each region of a Venn diagram.",
        "Apply n(A∪B)=n(A)+n(B)−n(A∩B) to find union counts.",
        "Find n(A'∩B') as the complement of A∪B.",
        "Apply P(A∪B)=P(A)+P(B)−P(A∩B) to find union probabilities.",
        "Recognise that mutually exclusive events have P(A∩B)=0.",
      ],
      teaching: {
        paragraphs: [
          "Set notation gives a precise language for collections of outcomes. The symbol ∈ means 'is an element of'; A' is the complement of A (everything in ξ not in A); A∩B is the intersection (both); A∪B is the union (at least one).",
          "A Venn diagram splits the universal set ξ into up to four regions: A only, B only, A∩B (both), and neither. Counts in each region must add up to n(ξ).",
          "The addition formula n(A∪B)=n(A)+n(B)−n(A∩B) corrects for double-counting: elements in A∩B are included in both n(A) and n(B), so they are subtracted once.",
          "Mutually exclusive events share no outcomes: A∩B=∅ and P(A∩B)=0. The addition formula simplifies to P(A∪B)=P(A)+P(B) in that case.",
          "The complement of A∪B contains elements outside both A and B. It equals A'∩B' and has count n(ξ)−n(A∪B).",
        ],
        latexBlocks: [
          "n(A\\cup B)=n(A)+n(B)-n(A\\cap B)",
          "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
          "A\\cap B=\\emptyset\\Rightarrow P(A\\cup B)=P(A)+P(B)\\quad(\\text{mutually exclusive})",
          "n((A\\cup B)')=n(\\xi)-n(A\\cup B)",
        ],
      },
      workedExamples: [
        {
          title: "Use the addition formula to find n(A∪B)",
          questionLatex: "n(\\xi)=40,\\quad n(A)=20,\\quad n(B)=15,\\quad n(A\\cap B)=8",
          steps: [
            { explanation: "Apply the addition formula.", latex: "n(A\\cup B)=n(A)+n(B)-n(A\\cap B)" },
            { explanation: "Substitute the given values.", latex: "n(A\\cup B)=20+15-8=27" },
            { explanation: "Find elements in neither set.", latex: "n((A\\cup B)')=40-27=13" },
          ],
          finalAnswerLatex: "n(A\\cup B)=27,\\quad n(A'\\cap B')=13.",
        },
        {
          title: "Find P(A∪B) using the addition rule",
          questionLatex: "P(A)=0.6,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.15",
          steps: [
            { explanation: "Write the probability addition rule.", latex: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)" },
            { explanation: "Substitute.", latex: "P(A\\cup B)=0.6+0.4-0.15=0.85" },
          ],
          finalAnswerLatex: "P(A\\cup B)=0.85",
        },
        {
          title: "Mutually exclusive events",
          questionLatex: "P(A)=0.3,\\quad P(B)=0.4,\\quad A\\cap B=\\emptyset",
          steps: [
            { explanation: "Mutually exclusive events have no overlap.", latex: "P(A\\cap B)=0" },
            { explanation: "The union formula simplifies.", latex: "P(A\\cup B)=0.3+0.4-0=0.7" },
          ],
          finalAnswerLatex: "P(A\\cup B)=0.7",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y11adv-pd-sets-g1",
          "Which symbol means 'is an element of'?",
          "B",
          ["$\\cup$", "$\\in$", "$\\cap$", "$\\subset$"],
          "The symbol ∈ is read as 'belongs to' or 'is an element of' a set."
        ),
        dataAnswer(
          "y11adv-pd-sets-g2",
          "Find the number of elements in A∪B using the addition formula.",
          "n(\\xi)=20,\\quad n(A)=8,\\quad n(B)=6,\\quad n(A\\cap B)=3",
          "11"
        ),
        dataAnswer(
          "y11adv-pd-sets-g3",
          "Find the number of elements outside A∪B.",
          "n(\\xi)=20,\\quad n(A\\cup B)=11",
          "9"
        ),
        dataAnswer(
          "y11adv-pd-sets-g4",
          "Find the union probability P(A∪B).",
          "P(A)=0.5,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.1",
          "0.8",
          ["4/5", "80%"]
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y11adv-pd-sets-i1",
          "Which statement correctly describes A'?",
          "D",
          ["$A\\cap B$", "$A\\cup B$", "The empty set", "The set of elements in $\\xi$ but not in $A$"],
          "A' (A complement) contains every element of the universal set that does not belong to A.",
          "A'"
        ),
        dataAnswer(
          "y11adv-pd-sets-i2",
          "Find the number of elements in A∪B using the addition formula.",
          "n(A)=10,\\quad n(B)=7,\\quad n(A\\cap B)=3",
          "14"
        ),
        dataAnswer(
          "y11adv-pd-sets-i3",
          "Find the number of elements outside A∪B.",
          "n(\\xi)=30,\\quad n(A\\cup B)=14",
          "16"
        ),
        practicalChoice(
          "y11adv-pd-sets-i4",
          "Which is P(A∪B) for the displayed mutually exclusive events?",
          "B",
          ["$0.12$", "$0.7$", "$0.88$", "$1.0$"],
          "Mutually exclusive events have P(A∩B)=0, so P(A∪B)=P(A)+P(B)=0.7.",
          "P(A)=0.3,\\quad P(B)=0.4,\\quad A\\cap B=\\emptyset"
        ),
        dataAnswer(
          "y11adv-pd-sets-i5",
          "Find the union probability P(A∪B).",
          "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2",
          "0.9",
          ["9/10", "90%"]
        ),
      ],
      commonMistakes: [
        { mistake: "Adding n(A) and n(B) without subtracting the overlap.", fix: "Elements in A∩B are counted in both n(A) and n(B); subtract n(A∩B) once to avoid double-counting." },
        { mistake: "Thinking mutually exclusive means A∪B=∅.", fix: "Mutually exclusive means A∩B=∅ (no shared elements), not that the union is empty." },
        { mistake: "Confusing A' with B' or with A∩B.", fix: "A' is everything in ξ outside A; it includes B-only elements and the neither region." },
        { mistake: "Using n(ξ)−n(A)−n(B) to find the complement of A∪B.", fix: "Find n(A∪B) first using the addition formula, then subtract from n(ξ)." },
      ],
      masteryQuiz: [
        practicalChoice(
          "y11adv-pd-sets-m1",
          "Which region of the Venn diagram represents elements in A but not B?",
          "A",
          ["$A\\cap B'$", "$A\\cap B$", "$A'\\cap B$", "$A'\\cap B'$"],
          "A∩B' is the region inside A and outside B — the 'A only' region.",
          "\\text{Venn diagram of }A\\text{ and }B"
        ),
        dataAnswer(
          "y11adv-pd-sets-m2",
          "Find the number of elements in A∪B using the addition formula.",
          "n(A)=12,\\quad n(B)=8,\\quad n(A\\cap B)=4",
          "16"
        ),
        dataAnswer(
          "y11adv-pd-sets-m3",
          "Find n(A∪B) by adding the three separate region counts.",
          "n(A\\text{ only})=5,\\quad n(A\\cap B)=3,\\quad n(B\\text{ only})=7",
          "15"
        ),
        practicalChoice(
          "y11adv-pd-sets-m4",
          "Which condition means A and B are mutually exclusive?",
          "C",
          ["$A=B$", "$A\\subset B$", "$A\\cap B=\\emptyset$", "$A\\cup B=\\xi$"],
          "Mutually exclusive events share no outcomes; their intersection is the empty set.",
          "A\\text{ and }B\\text{ mutually exclusive}"
        ),
        dataAnswer(
          "y11adv-pd-sets-m5",
          "Use the addition formula to find P(A∩B).",
          "P(A\\cup B)=0.8,\\quad P(A)=0.5,\\quad P(B)=0.6",
          "0.3",
          ["3/10", "30%"]
        ),
        dataAnswer(
          "y11adv-pd-sets-m6",
          "Find the number of elements outside A∪B.",
          "n(\\xi)=25,\\quad n(A\\cup B)=18",
          "7"
        ),
        practicalChoice(
          "y11adv-pd-sets-m7",
          "Which Venn diagram region represents elements in neither A nor B?",
          "D",
          ["$A\\cap B$", "$A\\cup B$", "$A\\cap B'$", "$A'\\cap B'$"],
          "Elements in neither A nor B are in the complement of A∪B, which equals A'∩B'.",
          "\\text{Venn diagram of }A\\text{ and }B"
        ),
        dataAnswer(
          "y11adv-pd-sets-m8",
          "Find the union probability P(A∪B).",
          "P(A)=0.35,\\quad P(B)=0.45,\\quad P(A\\cap B)=0.15",
          "0.65",
          ["13/20", "65%"]
        ),
        practicalChoice(
          "y11adv-pd-sets-m9",
          "Which option correctly identifies the student's error?",
          "B",
          [
            "The intersection should be added twice",
            "The intersection must be subtracted: $n(A\\cup B)=12+8-4=16$",
            "The formula should use multiplication",
            "$n(A\\cup B)$ cannot be less than $n(A)$",
          ],
          "The addition rule subtracts the overlap once to avoid counting it twice.",
          "n(A)=12,\\quad n(B)=8,\\quad n(A\\cap B)=4,\\quad \\text{student claims }n(A\\cup B)=20"
        ),
        dataAnswer(
          "y11adv-pd-sets-m10",
          "Find n(A'∩B') using the complement of A∪B.",
          "n(A)=15,\\quad n(B)=10,\\quad n(A\\cap B)=6,\\quad n(\\xi)=28",
          "9"
        ),
      ],
      masteryQuizPool: [
        { id: "y11adv-pd-sets-p1", prompt: "Which symbol means 'is an element of'?", latex: "\\text{Choose one}", answer: "B", difficulty: 1, choices: [{ label: "A", text: "$\\cup$" }, { label: "B", text: "$\\in$" }, { label: "C", text: "$\\cap$" }, { label: "D", text: "$\\subset$" }], hint: "It is read 'belongs to'.", explanation: "$\\in$ means 'is an element of'." },
        { id: "y11adv-pd-sets-p2", prompt: "Find n(A∪B) using the addition formula.", latex: "n(A)=8,\\quad n(B)=6,\\quad n(A\\cap B)=3", answer: "11", difficulty: 1, hint: "$n(A)+n(B)-n(A\\cap B)$.", explanation: "$8+6-3=11$." },
        { id: "y11adv-pd-sets-p3", prompt: "Find the number of elements outside A∪B.", latex: "n(\\xi)=20,\\quad n(A\\cup B)=11", answer: "9", difficulty: 1, hint: "Subtract from $n(\\xi)$.", explanation: "$20-11=9$." },
        { id: "y11adv-pd-sets-p4", prompt: "Find the union probability P(A∪B).", latex: "P(A)=0.5,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.1", answer: "0.8", difficulty: 1, acceptedAnswers: ["4/5", "80%"], hint: "Add then subtract the overlap.", explanation: "$P(A\\cup B)=0.5+0.4-0.1=0.8$." },
        { id: "y11adv-pd-sets-p5", prompt: "Which statement correctly describes A'?", latex: "A'", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$A\\cap B$" }, { label: "B", text: "$A\\cup B$" }, { label: "C", text: "The empty set" }, { label: "D", text: "Elements in $\\xi$ but not in $A$" }], hint: "Complement means 'not in A'.", explanation: "A' is everything in the universal set not in A." },
        { id: "y11adv-pd-sets-p6", prompt: "Find n(A∪B) using the addition formula.", latex: "n(A)=10,\\quad n(B)=7,\\quad n(A\\cap B)=3", answer: "14", difficulty: 2, hint: "Subtract the overlap once.", explanation: "$10+7-3=14$." },
        { id: "y11adv-pd-sets-p7", prompt: "Find n(A∪B) by adding the three region counts.", latex: "n(A\\text{ only})=5,\\quad n(A\\cap B)=3,\\quad n(B\\text{ only})=7", answer: "15", difficulty: 2, hint: "Add the three disjoint regions.", explanation: "$5+3+7=15$." },
        { id: "y11adv-pd-sets-p8", prompt: "Which is P(A∪B) for the displayed mutually exclusive events?", latex: "P(A)=0.3,\\quad P(B)=0.4,\\quad A\\cap B=\\emptyset", answer: "B", difficulty: 2, choices: [{ label: "A", text: "$0.12$" }, { label: "B", text: "$0.7$" }, { label: "C", text: "$0.88$" }, { label: "D", text: "$1.0$" }], hint: "No overlap means just add.", explanation: "$P(A\\cup B)=0.3+0.4=0.7$." },
        { id: "y11adv-pd-sets-p9", prompt: "Use the addition formula to find P(A∩B).", latex: "P(A\\cup B)=0.8,\\quad P(A)=0.5,\\quad P(B)=0.6", answer: "0.3", difficulty: 3, acceptedAnswers: ["3/10", "30%"], hint: "Rearrange: $P(A\\cap B)=P(A)+P(B)-P(A\\cup B)$.", explanation: "$P(A\\cap B)=0.5+0.6-0.8=0.3$." },
        { id: "y11adv-pd-sets-p10", prompt: "Find the union probability P(A∪B).", latex: "P(A)=0.35,\\quad P(B)=0.45,\\quad P(A\\cap B)=0.15", answer: "0.65", difficulty: 3, acceptedAnswers: ["13/20", "65%"], hint: "Add then subtract overlap.", explanation: "$P(A\\cup B)=0.35+0.45-0.15=0.65$." },
        { id: "y11adv-pd-sets-p11", prompt: "Find n(A'∩B') using the complement of A∪B.", latex: "n(A)=15,\\quad n(B)=10,\\quad n(A\\cap B)=6,\\quad n(\\xi)=28", answer: "9", difficulty: 3, hint: "Find $n(A\\cup B)$ first.", explanation: "$n(A\\cup B)=19$, so $n(A'\\cap B')=28-19=9$." },
        { id: "y11adv-pd-sets-p12", prompt: "Which region of the Venn diagram represents elements in A but not B?", latex: "\\text{Venn diagram of }A\\text{ and }B", answer: "A", difficulty: 2, choices: [{ label: "A", text: "$A\\cap B'$" }, { label: "B", text: "$A\\cap B$" }, { label: "C", text: "$A'\\cap B$" }, { label: "D", text: "$A'\\cap B'$" }], hint: "In A, outside B.", explanation: "$A\\cap B'$ is the 'A only' region." },
        { id: "y11adv-pd-sets-p13", prompt: "Which Venn region represents elements in neither A nor B?", latex: "\\text{Venn diagram of }A\\text{ and }B", answer: "D", difficulty: 2, choices: [{ label: "A", text: "$A\\cap B$" }, { label: "B", text: "$A\\cup B$" }, { label: "C", text: "$A\\cap B'$" }, { label: "D", text: "$A'\\cap B'$" }], hint: "Outside both circles.", explanation: "Elements in neither set are in $A'\\cap B'$." },
        { id: "y11adv-pd-sets-p14", prompt: "Which condition means A and B are mutually exclusive?", latex: "\\text{Choose one}", answer: "C", difficulty: 2, choices: [{ label: "A", text: "$A=B$" }, { label: "B", text: "$A\\subset B$" }, { label: "C", text: "$A\\cap B=\\emptyset$" }, { label: "D", text: "$A\\cup B=\\xi$" }], hint: "No shared elements.", explanation: "Mutually exclusive means $A\\cap B=\\emptyset$." },
        { id: "y11adv-pd-sets-p15", prompt: "Find the number of elements outside A∪B.", latex: "n(\\xi)=30,\\quad n(A\\cup B)=14", answer: "16", difficulty: 1, hint: "Subtract from $n(\\xi)$.", explanation: "$30-14=16$." },
        { id: "y11adv-pd-sets-p16", prompt: "Find n(A∪B) using the addition formula.", latex: "n(A)=12,\\quad n(B)=8,\\quad n(A\\cap B)=4", answer: "16", difficulty: 2, hint: "Subtract the overlap once.", explanation: "$12+8-4=16$." },
        { id: "y11adv-pd-sets-p17", prompt: "Find the union probability P(A∪B).", latex: "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", answer: "0.9", difficulty: 2, acceptedAnswers: ["9/10", "90%"], hint: "Add then subtract overlap.", explanation: "$P(A\\cup B)=0.6+0.5-0.2=0.9$." },
        { id: "y11adv-pd-sets-p18", prompt: "Which option correctly identifies the student's error?", latex: "n(A)=12,\\quad n(B)=8,\\quad n(A\\cap B)=4,\\quad \\text{student claims }n(A\\cup B)=20", answer: "B", difficulty: 3, choices: [{ label: "A", text: "The intersection should be added twice" }, { label: "B", text: "The intersection must be subtracted: $n(A\\cup B)=12+8-4=16$" }, { label: "C", text: "The formula should use multiplication" }, { label: "D", text: "$n(A\\cup B)$ cannot be less than $n(A)$" }], hint: "The overlap is double-counted in $n(A)+n(B)$.", explanation: "Subtract $n(A\\cap B)$ once: $12+8-4=16$, not 20." },
        { id: "y11adv-pd-sets-p19", prompt: "Find P(A∪B) for the displayed mutually exclusive events.", latex: "P(A)=\\frac{1}{5},\\quad P(B)=\\frac{2}{5},\\quad A\\cap B=\\emptyset", answer: "3/5", difficulty: 2, acceptedAnswers: ["0.6", "60%"], hint: "Just add; no overlap.", explanation: "$P(A\\cup B)=\\frac{1}{5}+\\frac{2}{5}=\\frac{3}{5}$." },
        { id: "y11adv-pd-sets-p20", prompt: "Use the addition formula to find P(A∩B).", latex: "P(A\\cup B)=0.9,\\quad P(A)=0.6,\\quad P(B)=0.5", answer: "0.2", difficulty: 3, acceptedAnswers: ["1/5", "20%"], hint: "Rearrange the addition rule.", explanation: "$P(A\\cap B)=0.6+0.5-0.9=0.2$." },
        { id: "y11adv-pd-sets-p21", prompt: "Find n(A only) given the totals.", latex: "n(A)=18,\\quad n(A\\cap B)=7", answer: "11", difficulty: 3, hint: "Subtract the intersection from $n(A)$.", explanation: "$n(A\\text{ only})=18-7=11$." },
        { id: "y11adv-pd-sets-p22", prompt: "Find n(B only) given the region counts.", latex: "n(B)=12,\\quad n(A\\cap B)=7", answer: "5", difficulty: 3, hint: "Subtract the intersection from $n(B)$.", explanation: "$n(B\\text{ only})=12-7=5$." },
        { id: "y11adv-pd-sets-p23", prompt: "Find the probability that an element is in neither A nor B.", latex: "n(\\xi)=30,\\quad n(A\\cup B)=23", answer: "7/30", difficulty: 4, acceptedAnswers: ["0.233", "0.2333"], hint: "Find $n(A'\\cap B')$, then divide by $n(\\xi)$.", explanation: "$n(A'\\cap B')=30-23=7$, so $P=\\frac{7}{30}$." },
        { id: "y11adv-pd-sets-p24", prompt: "Given the region counts, find P(A∪B) as a fraction.", latex: "n(A\\text{ only})=11,\\quad n(A\\cap B)=7,\\quad n(B\\text{ only})=5,\\quad n(\\xi)=30", answer: "23/30", difficulty: 4, hint: "Add the three union regions, then divide by $n(\\xi)$.", explanation: "$n(A\\cup B)=11+7+5=23$, so $P(A\\cup B)=\\frac{23}{30}$." },
        { id: "y11adv-pd-sets-p25", prompt: "Find n(A∩B) from the given counts.", latex: "n(A)=20,\\quad n(B)=15,\\quad n(A\\cup B)=28", answer: "7", difficulty: 5, hint: "Rearrange: $n(A\\cap B)=n(A)+n(B)-n(A\\cup B)$.", explanation: "$n(A\\cap B)=20+15-28=7$." },
        { id: "y11adv-pd-sets-p26", prompt: "Find P(A only) — in A but not B.", latex: "P(A)=0.5,\\quad P(A\\cap B)=0.2", answer: "0.3", difficulty: 5, acceptedAnswers: ["3/10", "30%"], hint: "$P(A\\cap B')=P(A)-P(A\\cap B)$.", explanation: "$P(A\\cap B')=0.5-0.2=0.3$." },
        { id: "y11adv-pd-sets-p27", prompt: "In a group of 50, 30 play tennis, 22 play golf, and 12 play both. Find how many play neither.", latex: "n(\\xi)=50,\\quad n(T)=30,\\quad n(G)=22,\\quad n(T\\cap G)=12", answer: "10", difficulty: 5, hint: "Find $n(T\\cup G)$ first, then subtract from 50.", explanation: "$n(T\\cup G)=30+22-12=40$, so neither $=50-40=10$." },
        { id: "y11adv-pd-sets-p28", prompt: "In a survey of 80, 45 like coffee, 38 like tea, and 17 like both. Find the probability a person likes coffee only.", latex: "n(\\xi)=80,\\quad n(C)=45,\\quad n(T)=38,\\quad n(C\\cap T)=17", answer: "7/20", difficulty: 5, acceptedAnswers: ["0.35", "35%", "28/80"], hint: "Coffee only $=n(C)-n(C\\cap T)$, then divide by 80.", explanation: "$n(C\\text{ only})=45-17=28$, so $P=\\frac{28}{80}=\\frac{7}{20}$." },
        { id: "y11adv-pd-sets-p29", prompt: "If P(A)=0.5, P(B)=0.4, and A and B are independent, find P(A∪B).", latex: "P(A)=0.5,\\quad P(B)=0.4,\\quad \\text{independent}", answer: "0.7", difficulty: 5, acceptedAnswers: ["7/10", "70%"], hint: "Independent means $P(A\\cap B)=P(A)P(B)$.", explanation: "$P(A\\cap B)=0.2$, so $P(A\\cup B)=0.5+0.4-0.2=0.7$." },
        { id: "y11adv-pd-sets-p30", prompt: "In a class of 28, 15 study Physics, 10 study Chemistry, and 6 study both. Find the probability a student studies exactly one of the two subjects.", latex: "n(\\xi)=28,\\quad n(P)=15,\\quad n(C)=10,\\quad n(P\\cap C)=6", answer: "13/28", difficulty: 5, acceptedAnswers: ["0.464", "0.4643"], hint: "Exactly one $=n(P\\cup C)-n(P\\cap C)$.", explanation: "$n(P\\cup C)=15+10-6=19$; exactly one $=19-6=13$, so $P=\\frac{13}{28}$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-sets-mp1",
          prompt: "Use the Venn diagram information to answer the following.",
          latex: "n(\\xi)=30,\\quad n(A)=18,\\quad n(B)=12,\\quad n(A\\cap B)=7",
          vennDiagram: {
            description:
              "Venn diagram for 30 elements. A only is 11, the intersection of A and B is 7, B only is 5, and neither is 7.",
            setALabel: "A",
            setBLabel: "B",
            aOnly: 11,
            intersection: 7,
            bOnly: 5,
            neither: 7,
            total: 30,
          },
          answer: "23",
          hint: "Apply n(A∪B)=n(A)+n(B)−n(A∩B), then find the complement and probability.",
          explanation:
            "(a) n(A∪B)=18+12−7=23. (b) n(A'∩B')=30−23=7. (c) P(A∪B)=23/30.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find n(A∪B).",
              latex: "n(A\\cup B)=n(A)+n(B)-n(A\\cap B)",
              marks: 1,
              answer: "23",
              hint: "Substitute into the addition formula and simplify.",
              explanation: "n(A∪B)=18+12−7=23.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find n(A'∩B').",
              latex: "n(\\xi)=30,\\quad n(A\\cup B)=23",
              marks: 1,
              answer: "7",
              hint: "Subtract n(A∪B) from n(ξ).",
              explanation: "n(A'∩B')=n(ξ)−n(A∪B)=30−23=7.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find P(A∪B) as an exact fraction.",
              latex: "P(A\\cup B)=\\frac{n(A\\cup B)}{n(\\xi)}",
              marks: 1,
              answer: "23/30",
              hint: "Divide the count n(A∪B) by n(ξ).",
              explanation: "P(A∪B)=23/30.",
            },
          ],
        },
        {
          id: "y11adv-pd-sets-mp2",
          prompt: "Use the probability information to answer the following.",
          latex: "P(A)=0.5,\\quad P(B)=0.4,\\quad P(A\\cap B)=0.1",
          answer: "0.8",
          hint: "Apply the addition rule, then use the complement rule for A and for A∪B.",
          explanation:
            "(a) P(A∪B)=0.5+0.4−0.1=0.8. (b) P(A')=1−0.5=0.5. (c) P((A∪B)')=1−0.8=0.2.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find P(A∪B).",
              latex: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
              marks: 1,
              answer: "0.8",
              acceptedAnswers: ["4/5", "80%"],
              hint: "Substitute into the addition rule.",
              explanation: "P(A∪B)=0.5+0.4−0.1=0.8.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find P(A').",
              latex: "P(A')=1-P(A)",
              marks: 1,
              answer: "0.5",
              acceptedAnswers: ["1/2", "50%"],
              hint: "Subtract P(A) from 1.",
              explanation: "P(A')=1−0.5=0.5.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find P((A∪B)').",
              latex: "P((A\\cup B)')=1-P(A\\cup B)",
              marks: 1,
              answer: "0.2",
              acceptedAnswers: ["1/5", "20%"],
              hint: "Subtract P(A∪B) from 1.",
              explanation: "P((A∪B)')=1−0.8=0.2.",
            },
          ],
        },
      ],
    };
  }

  if (lesson.slug === "conditional-probability-independence") {
    const practiceTable =
      "\\begin{array}{c|cc|c}&\\text{Win}&\\text{Lose}&\\text{Total}\\\\ \\hline \\text{Practice}&12&8&20\\\\ \\text{No practice}&4&16&20\\\\ \\hline \\text{Total}&16&24&40\\end{array}";
    const yearTable =
      "\\begin{array}{c|cc|c}&\\text{Online}&\\text{In-person}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&22&40\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&30&40&70\\end{array}";
    return {
      ...base,
      description:
        "Calculate P(A|B) from tables and formulas; apply the multiplication rule P(A∩B)=P(A|B)P(B); test independence using P(A|B)=P(A).",
      learningIntention:
        "Learn conditional probability, the multiplication rule, and the formal test for independence.",
      successCriteria: [
        "Calculate P(A|B)=P(A∩B)/P(B) from given probabilities.",
        "Read conditional probabilities from two-way tables by restricting to the given row or column.",
        "Apply the multiplication rule P(A∩B)=P(A|B)·P(B).",
        "Test independence by checking P(A|B)=P(A) or equivalently P(A∩B)=P(A)·P(B).",
        "Explain why conditioning restricts the sample space.",
      ],
      teaching: {
        paragraphs: [
          "A conditional probability P(A|B) answers: given that B has occurred, what is the probability of A? Knowing B restricts the sample space to B's outcomes only.",
          "The formula P(A|B)=P(A∩B)/P(B) divides the joint probability by the probability of the condition. The denominator P(B) rescales so that probabilities within B sum to 1.",
          "In a two-way table, conditioning on a row (or column) means using that row's total as the denominator. For P(A|Year 11), restrict to the Year 11 row and read from its total.",
          "The multiplication rule rearranges the conditional formula: P(A∩B)=P(A|B)·P(B). It is used to find joint probabilities when conditional and marginal probabilities are known.",
          "Events A and B are independent when knowing B gives no new information about A: P(A|B)=P(A). An equivalent test is P(A∩B)=P(A)·P(B).",
        ],
        latexBlocks: [
          "P(A|B)=\\frac{P(A\\cap B)}{P(B)}",
          "P(A\\cap B)=P(A|B)\\cdot P(B)\\quad(\\text{multiplication rule})",
          "A,B\\text{ independent}\\iff P(A|B)=P(A)\\iff P(A\\cap B)=P(A)\\cdot P(B)",
        ],
      },
      workedExamples: [
        {
          title: "Calculate P(A|B) from probabilities",
          questionLatex: "P(A\\cap B)=0.12,\\quad P(B)=0.4",
          steps: [
            { explanation: "Write the conditional probability formula.", latex: "P(A|B)=\\frac{P(A\\cap B)}{P(B)}" },
            { explanation: "Substitute the given values.", latex: "P(A|B)=\\frac{0.12}{0.4}=0.3" },
          ],
          finalAnswerLatex: "P(A|B)=0.3",
        },
        {
          title: "Apply the multiplication rule",
          questionLatex: "P(A|B)=0.6,\\quad P(B)=0.5",
          steps: [
            { explanation: "Write the multiplication rule.", latex: "P(A\\cap B)=P(A|B)\\cdot P(B)" },
            { explanation: "Substitute and calculate.", latex: "P(A\\cap B)=0.6\\times0.5=0.3" },
          ],
          finalAnswerLatex: "P(A\\cap B)=0.3",
        },
        {
          title: "Read conditional probability from a two-way table",
          questionLatex:
            "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Tutored}&15&5&20\\\\ \\text{Not tutored}&5&25&30\\\\ \\hline \\text{Total}&20&30&50\\end{array}",
          steps: [
            { explanation: "Condition on Tutored: restrict to the Tutored row.", latex: "\\text{Tutored row total}=20" },
            { explanation: "The number who passed and were tutored is 15.", latex: "P(\\text{Pass}|\\text{Tutored})=\\frac{15}{20}=\\frac{3}{4}" },
          ],
          finalAnswerLatex: "P(\\text{Pass}|\\text{Tutored})=\\tfrac{3}{4}=0.75",
        },
      ],
      guidedPractice: [
        practicalChoice(
          "y11adv-pd-cond-g1",
          "Which formula correctly defines P(A|B)?",
          "C",
          [
            "$P(A)\\cdot P(B)$",
            "$P(A)+P(B)-P(A\\cap B)$",
            "$\\dfrac{P(A\\cap B)}{P(B)}$",
            "$\\dfrac{P(B)}{P(A\\cap B)}$",
          ],
          "P(A|B) divides the joint probability by the probability of the given condition.",
          "P(A|B)"
        ),
        dataAnswer(
          "y11adv-pd-cond-g2",
          "Find the conditional probability of A given B.",
          "P(A\\cap B)=0.3,\\quad P(B)=0.5",
          "0.6",
          ["3/5", "60%"]
        ),
        dataAnswer(
          "y11adv-pd-cond-g3",
          "Use the multiplication rule to find P(A∩B).",
          "P(A|B)=0.4,\\quad P(B)=0.5",
          "0.2",
          ["1/5", "20%"]
        ),
        practicalChoice(
          "y11adv-pd-cond-g4",
          "Which condition means events A and B are independent?",
          "A",
          [
            "$P(A|B)=P(A)$",
            "$P(A|B)=0$",
            "$P(A\\cap B)=1$",
            "$P(A|B)=P(B)$",
          ],
          "Independence means knowing B gives no information about A; the conditional probability equals the unconditional.",
          "\\text{Independence condition}"
        ),
      ],
      independentPractice: [
        practicalChoice(
          "y11adv-pd-cond-i1",
          "From the two-way table, which is P(Win | Practice)?",
          "B",
          ["$12/40$", "$12/20$", "$16/40$", "$4/20$"],
          "Conditioning on Practice restricts to the Practice row (total 20); 12 of those won.",
          practiceTable
        ),
        dataAnswer(
          "y11adv-pd-cond-i2",
          "Use the multiplication rule to find P(A∩B).",
          "P(A|B)=0.3,\\quad P(B)=0.4",
          "0.12",
          ["3/25", "12%"]
        ),
        dataAnswer(
          "y11adv-pd-cond-i3",
          "Find the conditional probability of A given B.",
          "P(A\\cap B)=0.6,\\quad P(B)=0.8",
          "0.75",
          ["3/4", "75%"]
        ),
        practicalChoice(
          "y11adv-pd-cond-i4",
          "Are A and B independent? Use the displayed probabilities to check.",
          "A",
          [
            "Yes, because $P(A\\cap B)=P(A)\\cdot P(B)$",
            "Yes, because $P(A|B)=P(B)$",
            "No, because $P(A)\\ne P(B)$",
            "No, because $P(A\\cap B)=0$",
          ],
          "P(A)·P(B)=0.4×0.5=0.2=P(A∩B), confirming independence.",
          "P(A)=0.4,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2"
        ),
        practicalChoice(
          "y11adv-pd-cond-i5",
          "From the two-way table, which is P(Practice | Win)?",
          "D",
          ["$12/40$", "$16/40$", "$12/20$", "$12/16$"],
          "Conditioning on Win restricts to the Win column (total 16); 12 of those Practiced.",
          practiceTable
        ),
      ],
      commonMistakes: [
        { mistake: "Using the full sample size instead of the conditional total.", fix: "P(A|B) uses P(B) as the denominator, not 1; in a table, use the row or column total of the given condition." },
        { mistake: "Confusing P(A|B) with P(B|A).", fix: "The given event is the denominator; P(A|B) and P(B|A) are usually different." },
        { mistake: "Claiming independence because P(A)=P(B).", fix: "Equal probabilities do not mean independence; the test is P(A∩B)=P(A)·P(B) or P(A|B)=P(A)." },
        { mistake: "Applying the multiplication rule to non-independent events using P(A)·P(B).", fix: "P(A∩B)=P(A)·P(B) only holds for independent events; use P(A|B)·P(B) in general." },
      ],
      masteryQuiz: [
        dataAnswer(
          "y11adv-pd-cond-m1",
          "Find the conditional probability of A given B.",
          "P(A\\cap B)=0.12,\\quad P(B)=0.4",
          "0.3",
          ["3/10", "30%"]
        ),
        dataAnswer(
          "y11adv-pd-cond-m2",
          "Use the multiplication rule to find P(A∩B).",
          "P(A|B)=0.6,\\quad P(B)=0.5",
          "0.3",
          ["3/10", "30%"]
        ),
        practicalChoice(
          "y11adv-pd-cond-m3",
          "From the two-way table, which is P(Online | Year 11)?",
          "B",
          ["$18/70$", "$18/40$", "$30/70$", "$18/30$"],
          "Conditioning on Year 11 restricts to the Year 11 row (total 40); 18 of those chose Online.",
          yearTable
        ),
        practicalChoice(
          "y11adv-pd-cond-m4",
          "Are A and B independent? Use the displayed probabilities to check.",
          "A",
          [
            "Yes, because $P(A\\cap B)=P(A)\\cdot P(B)$",
            "Yes, because $P(A)=P(B)$",
            "No, because $P(A)\\ne P(B)$",
            "No, because $P(A\\cap B)=0$",
          ],
          "P(A)·P(B)=0.3×0.5=0.15=P(A∩B), confirming independence.",
          "P(A)=0.3,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.15"
        ),
        dataAnswer(
          "y11adv-pd-cond-m5",
          "Find the conditional probability of A given B.",
          "P(A\\cap B)=0.15,\\quad P(B)=0.5",
          "0.3",
          ["3/10", "30%"]
        ),
        dataAnswer(
          "y11adv-pd-cond-m6",
          "Use the multiplication rule to find P(A∩B).",
          "P(A|B)=0.7,\\quad P(B)=0.3",
          "0.21",
          ["21/100", "21%"]
        ),
        practicalChoice(
          "y11adv-pd-cond-m7",
          "What does conditioning on event B mean?",
          "B",
          [
            "B is certain to occur",
            "The sample space is restricted to B; probability is recalculated within B",
            "A and B must be independent",
            "B is subtracted from the total probability",
          ],
          "Conditioning on B treats B as the new universe; only outcomes within B are considered.",
          "P(A|B)"
        ),
        dataAnswer(
          "y11adv-pd-cond-m8",
          "Use the multiplication rule to find P(B).",
          "P(A\\cap B)=0.24,\\quad P(A|B)=0.6",
          "0.4",
          ["2/5", "40%"]
        ),
        practicalChoice(
          "y11adv-pd-cond-m9",
          "From the two-way table, which is P(Year 12 | Online)?",
          "C",
          ["$12/70$", "$30/70$", "$12/30$", "$18/30$"],
          "Conditioning on Online restricts to the Online column (total 30); 12 of those were Year 12.",
          yearTable
        ),
        practicalChoice(
          "y11adv-pd-cond-m10",
          "Are A and B independent? Use the displayed probabilities to check.",
          "B",
          [
            "Yes, because $P(A\\cap B)=P(A)\\cdot P(B)$",
            "No, because $P(A\\cap B)\\ne P(A)\\cdot P(B)$",
            "Yes, because $P(A)=P(B|A)$",
            "No, because $P(A)=0$",
          ],
          "P(A)·P(B)=0.6×0.5=0.30≠0.25=P(A∩B), so A and B are NOT independent.",
          "P(A)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.25"
        ),
      ],
      masteryQuizPool: [
        { id: "y11adv-pd-cond-p1", prompt: "Which formula correctly defines P(A|B)?", latex: "P(A|B)", answer: "C", difficulty: 1, choices: [{ label: "A", text: "$P(A)\\cdot P(B)$" }, { label: "B", text: "$P(A)+P(B)-P(A\\cap B)$" }, { label: "C", text: "$\\dfrac{P(A\\cap B)}{P(B)}$" }, { label: "D", text: "$\\dfrac{P(B)}{P(A\\cap B)}$" }], hint: "Divide joint by the condition.", explanation: "$P(A|B)=\\frac{P(A\\cap B)}{P(B)}$." },
        { id: "y11adv-pd-cond-p2", prompt: "Find the conditional probability of A given B.", latex: "P(A\\cap B)=0.3,\\quad P(B)=0.5", answer: "0.6", difficulty: 1, acceptedAnswers: ["3/5", "60%"], hint: "Divide joint by $P(B)$.", explanation: "$\\frac{0.3}{0.5}=0.6$." },
        { id: "y11adv-pd-cond-p3", prompt: "Use the multiplication rule to find P(A∩B).", latex: "P(A|B)=0.4,\\quad P(B)=0.5", answer: "0.2", difficulty: 1, acceptedAnswers: ["1/5", "20%"], hint: "$P(A|B)\\cdot P(B)$.", explanation: "$0.4\\times0.5=0.2$." },
        { id: "y11adv-pd-cond-p4", prompt: "Which condition means events A and B are independent?", latex: "\\text{Choose one}", answer: "A", difficulty: 1, choices: [{ label: "A", text: "$P(A|B)=P(A)$" }, { label: "B", text: "$P(A|B)=0$" }, { label: "C", text: "$P(A\\cap B)=1$" }, { label: "D", text: "$P(A|B)=P(B)$" }], hint: "Knowing B gives no new information about A.", explanation: "Independence means $P(A|B)=P(A)$." },
        { id: "y11adv-pd-cond-p5", prompt: "Find the conditional probability of A given B.", latex: "P(A\\cap B)=0.12,\\quad P(B)=0.4", answer: "0.3", difficulty: 2, acceptedAnswers: ["3/10", "30%"], hint: "Divide joint by $P(B)$.", explanation: "$\\frac{0.12}{0.4}=0.3$." },
        { id: "y11adv-pd-cond-p6", prompt: "Use the multiplication rule to find P(A∩B).", latex: "P(A|B)=0.6,\\quad P(B)=0.5", answer: "0.3", difficulty: 2, acceptedAnswers: ["3/10", "30%"], hint: "Multiply.", explanation: "$0.6\\times0.5=0.3$." },
        { id: "y11adv-pd-cond-p7", prompt: "From the two-way table, find P(Win | Practice).", latex: "\\begin{array}{c|cc|c}&\\text{Win}&\\text{Lose}&\\text{Total}\\\\ \\hline \\text{Practice}&12&8&20\\\\ \\text{No practice}&4&16&20\\\\ \\hline \\text{Total}&16&24&40\\end{array}", answer: "3/5", difficulty: 2, acceptedAnswers: ["0.6", "60%", "12/20"], hint: "Use the Practice row total 20.", explanation: "$P(\\text{Win}\\mid\\text{Practice})=\\frac{12}{20}=\\frac{3}{5}$." },
        { id: "y11adv-pd-cond-p8", prompt: "What does conditioning on event B mean?", latex: "P(A|B)", answer: "B", difficulty: 2, choices: [{ label: "A", text: "B is certain to occur" }, { label: "B", text: "The sample space is restricted to B" }, { label: "C", text: "A and B must be independent" }, { label: "D", text: "B is subtracted from the total" }], hint: "B becomes the new universe.", explanation: "Conditioning on B restricts the sample space to outcomes in B." },
        { id: "y11adv-pd-cond-p9", prompt: "Use the multiplication rule to find P(A∩B).", latex: "P(A|B)=0.7,\\quad P(B)=0.3", answer: "0.21", difficulty: 3, acceptedAnswers: ["21/100", "21%"], hint: "Multiply.", explanation: "$0.7\\times0.3=0.21$." },
        { id: "y11adv-pd-cond-p10", prompt: "Use the multiplication rule to find P(B).", latex: "P(A\\cap B)=0.24,\\quad P(A|B)=0.6", answer: "0.4", difficulty: 3, acceptedAnswers: ["2/5", "40%"], hint: "Rearrange: $P(B)=\\frac{P(A\\cap B)}{P(A|B)}$.", explanation: "$\\frac{0.24}{0.6}=0.4$." },
        { id: "y11adv-pd-cond-p11", prompt: "From the two-way table, find P(Practice | Win).", latex: "\\begin{array}{c|cc|c}&\\text{Win}&\\text{Lose}&\\text{Total}\\\\ \\hline \\text{Practice}&12&8&20\\\\ \\text{No practice}&4&16&20\\\\ \\hline \\text{Total}&16&24&40\\end{array}", answer: "3/4", difficulty: 3, acceptedAnswers: ["0.75", "75%", "12/16"], hint: "Use the Win column total 16.", explanation: "$P(\\text{Practice}\\mid\\text{Win})=\\frac{12}{16}=\\frac{3}{4}$." },
        { id: "y11adv-pd-cond-p12", prompt: "Are A and B independent? Use the displayed probabilities.", latex: "P(A)=0.4,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", answer: "A", difficulty: 3, choices: [{ label: "A", text: "Yes, because $P(A\\cap B)=P(A)\\cdot P(B)$" }, { label: "B", text: "Yes, because $P(A|B)=P(B)$" }, { label: "C", text: "No, because $P(A)\\ne P(B)$" }, { label: "D", text: "No, because $P(A\\cap B)=0$" }], hint: "Check $P(A)P(B)$.", explanation: "$0.4\\times0.5=0.2=P(A\\cap B)$, so independent." },
        { id: "y11adv-pd-cond-p13", prompt: "Find the conditional probability of A given B.", latex: "P(A\\cap B)=0.6,\\quad P(B)=0.8", answer: "0.75", difficulty: 3, acceptedAnswers: ["3/4", "75%"], hint: "Divide joint by $P(B)$.", explanation: "$\\frac{0.6}{0.8}=0.75$." },
        { id: "y11adv-pd-cond-p14", prompt: "From the two-way table, find P(Online | Year 11).", latex: "\\begin{array}{c|cc|c}&\\text{Online}&\\text{In-person}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&22&40\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&30&40&70\\end{array}", answer: "9/20", difficulty: 3, acceptedAnswers: ["0.45", "45%", "18/40"], hint: "Use the Year 11 row total 40.", explanation: "$P(\\text{Online}\\mid\\text{Year 11})=\\frac{18}{40}=\\frac{9}{20}$." },
        { id: "y11adv-pd-cond-p15", prompt: "Are A and B independent? Use the displayed probabilities.", latex: "P(A)=0.5,\\quad P(B)=0.5,\\quad P(A\\cap B)=0.2", answer: "B", difficulty: 3, choices: [{ label: "A", text: "Yes, because $P(A\\cap B)=P(A)\\cdot P(B)$" }, { label: "B", text: "No, because $P(A\\cap B)\\ne P(A)\\cdot P(B)$" }, { label: "C", text: "Yes, because $P(A)=P(B)$" }, { label: "D", text: "No, because $P(A)=0$" }], hint: "Compare $P(A)P(B)$ with $P(A\\cap B)$.", explanation: "$0.5\\times0.5=0.25\\ne0.2$, so not independent." },
        { id: "y11adv-pd-cond-p16", prompt: "Use the multiplication rule to find P(A∩B).", latex: "P(A|B)=0.25,\\quad P(B)=0.8", answer: "0.2", difficulty: 2, acceptedAnswers: ["1/5", "20%"], hint: "Multiply.", explanation: "$0.25\\times0.8=0.2$." },
        { id: "y11adv-pd-cond-p17", prompt: "From the two-way table, find P(Year 12 | Online).", latex: "\\begin{array}{c|cc|c}&\\text{Online}&\\text{In-person}&\\text{Total}\\\\ \\hline \\text{Year 11}&18&22&40\\\\ \\text{Year 12}&12&18&30\\\\ \\hline \\text{Total}&30&40&70\\end{array}", answer: "2/5", difficulty: 3, acceptedAnswers: ["0.4", "40%", "12/30"], hint: "Use the Online column total 30.", explanation: "$P(\\text{Year 12}\\mid\\text{Online})=\\frac{12}{30}=\\frac{2}{5}$." },
        { id: "y11adv-pd-cond-p18", prompt: "Which mistake is shown in this calculation?", latex: "P(A|B)=\\frac{P(A\\cap B)}{P(A)}", answer: "C", difficulty: 3, choices: [{ label: "A", text: "The numerator is wrong" }, { label: "B", text: "Nothing is wrong" }, { label: "C", text: "The denominator should be $P(B)$, not $P(A)$" }, { label: "D", text: "It should use addition" }], hint: "The condition is B.", explanation: "Conditioning on B uses $P(B)$ as the denominator." },
        { id: "y11adv-pd-cond-p19", prompt: "Find P(A|B) given the joint and conditional setup.", latex: "P(A\\cap B)=0.18,\\quad P(B)=0.6", answer: "0.3", difficulty: 2, acceptedAnswers: ["3/10", "30%"], hint: "Divide.", explanation: "$\\frac{0.18}{0.6}=0.3$." },
        { id: "y11adv-pd-cond-p20", prompt: "Use the multiplication rule to find P(B).", latex: "P(A\\cap B)=0.15,\\quad P(A|B)=0.5", answer: "0.3", difficulty: 3, acceptedAnswers: ["3/10", "30%"], hint: "Divide joint by $P(A|B)$.", explanation: "$\\frac{0.15}{0.5}=0.3$." },
        { id: "y11adv-pd-cond-p21", prompt: "From the two-way table, find P(Win | No practice).", latex: "\\begin{array}{c|cc|c}&\\text{Win}&\\text{Lose}&\\text{Total}\\\\ \\hline \\text{Practice}&12&8&20\\\\ \\text{No practice}&4&16&20\\\\ \\hline \\text{Total}&16&24&40\\end{array}", answer: "1/5", difficulty: 4, acceptedAnswers: ["0.2", "20%", "4/20"], hint: "Use the No practice row total 20.", explanation: "$P(\\text{Win}\\mid\\text{No practice})=\\frac{4}{20}=\\frac{1}{5}$." },
        { id: "y11adv-pd-cond-p22", prompt: "Test independence of Win and Practice from the table (enter P(Win)).", latex: "\\begin{array}{c|cc|c}&\\text{Win}&\\text{Lose}&\\text{Total}\\\\ \\hline \\text{Practice}&12&8&20\\\\ \\text{No practice}&4&16&20\\\\ \\hline \\text{Total}&16&24&40\\end{array}", answer: "2/5", difficulty: 4, acceptedAnswers: ["0.4", "40%", "16/40"], hint: "$P(\\text{Win})=\\frac{16}{40}$; compare with $P(\\text{Win}\\mid\\text{Practice})$.", explanation: "$P(\\text{Win})=\\frac{16}{40}=\\frac{2}{5}=0.4$; since $P(\\text{Win}\\mid\\text{Practice})=0.6\\ne0.4$, Win and Practice are not independent." },
        { id: "y11adv-pd-cond-p23", prompt: "Given P(A|B)=0.5, P(B)=0.4, P(A∩B')=0.1, find P(A).", latex: "P(A|B)=0.5,\\quad P(B)=0.4,\\quad P(A\\cap B')=0.1", answer: "0.3", difficulty: 5, acceptedAnswers: ["3/10", "30%"], hint: "Find $P(A\\cap B)$ first, then add $P(A\\cap B')$.", explanation: "$P(A\\cap B)=0.5\\times0.4=0.2$, so $P(A)=0.2+0.1=0.3$." },
        { id: "y11adv-pd-cond-p24", prompt: "A and B are independent with P(A)=0.6 and P(B)=0.3. Find P(A|B).", latex: "P(A)=0.6,\\quad P(B)=0.3,\\quad \\text{independent}", answer: "0.6", difficulty: 4, acceptedAnswers: ["3/5", "60%"], hint: "For independent events, $P(A|B)=P(A)$.", explanation: "Independence gives $P(A|B)=P(A)=0.6$." },
        { id: "y11adv-pd-cond-p25", prompt: "From the two-way table, find P(Pass | Tutored).", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Tutored}&15&5&20\\\\ \\text{Not tutored}&5&25&30\\\\ \\hline \\text{Total}&20&30&50\\end{array}", answer: "3/4", difficulty: 4, acceptedAnswers: ["0.75", "75%", "15/20"], hint: "Use the Tutored row total 20.", explanation: "$P(\\text{Pass}\\mid\\text{Tutored})=\\frac{15}{20}=\\frac{3}{4}$." },
        { id: "y11adv-pd-cond-p26", prompt: "Two cards are drawn without replacement from a deck. Find P(2nd is a King | 1st was a King).", latex: "\\text{52 cards, 4 Kings, 1st King removed}", answer: "1/17", difficulty: 5, acceptedAnswers: ["3/51", "0.0588"], hint: "After removing one King, 3 Kings remain in 51 cards.", explanation: "$\\frac{3}{51}=\\frac{1}{17}$." },
        { id: "y11adv-pd-cond-p27", prompt: "Using P(A|B)=0.8, P(B)=0.5, P(A|B')=0.2, find P(A) by total probability.", latex: "P(A|B)=0.8,\\quad P(B)=0.5,\\quad P(A|B')=0.2", answer: "0.5", difficulty: 5, acceptedAnswers: ["1/2", "50%"], hint: "$P(A)=P(A|B)P(B)+P(A|B')P(B')$.", explanation: "$P(A)=0.8(0.5)+0.2(0.5)=0.4+0.1=0.5$." },
        { id: "y11adv-pd-cond-p28", prompt: "From the table, test independence of Pass and Tutored (enter P(Pass)).", latex: "\\begin{array}{c|cc|c}&\\text{Pass}&\\text{Fail}&\\text{Total}\\\\ \\hline \\text{Tutored}&15&5&20\\\\ \\text{Not tutored}&5&25&30\\\\ \\hline \\text{Total}&20&30&50\\end{array}", answer: "2/5", difficulty: 5, acceptedAnswers: ["0.4", "40%", "20/50"], hint: "$P(\\text{Pass})=\\frac{20}{50}$; compare with $P(\\text{Pass}\\mid\\text{Tutored})$.", explanation: "$P(\\text{Pass})=\\frac{20}{50}=\\frac{2}{5}=0.4$; since $P(\\text{Pass}\\mid\\text{Tutored})=0.75\\ne0.4$, the events are not independent." },
        { id: "y11adv-pd-cond-p29", prompt: "A bag has 4 red and 6 blue. Two drawn without replacement. Find P(both red).", latex: "4\\text{ red},\\ 6\\text{ blue},\\ \\text{draw 2 without replacement}", answer: "2/15", difficulty: 5, acceptedAnswers: ["0.133", "0.1333"], hint: "$P(\\text{1st red})\\times P(\\text{2nd red}\\mid\\text{1st red})$.", explanation: "$\\frac{4}{10}\\times\\frac{3}{9}=\\frac{12}{90}=\\frac{2}{15}$." },
        { id: "y11adv-pd-cond-p30", prompt: "Given P(A∩B)=0.18 and the events are independent with P(B)=0.6, find P(A).", latex: "P(A\\cap B)=0.18,\\quad P(B)=0.6,\\quad \\text{independent}", answer: "0.3", difficulty: 5, acceptedAnswers: ["3/10", "30%"], hint: "For independent events, $P(A)=\\frac{P(A\\cap B)}{P(B)}$.", explanation: "$P(A)=\\frac{0.18}{0.6}=0.3$." },
      ],
      multiPartPractice: [
        {
          id: "y11adv-pd-cond-mp1",
          prompt: "Use the two-way table to answer questions about conditional probability.",
          latex: practiceTable,
          answer: "3/5",
          hint: "For each conditional probability, identify the row or column total that acts as the restricted sample space.",
          explanation:
            "(a) P(Win|Practice)=12/20=3/5. (b) P(Win)=16/40=2/5. (c) P(Win∩Practice)=12/40=3/10. Since 3/10≠(2/5)×(1/2)=1/5, the events are not independent.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find P(Win | Practice).",
              latex: "\\text{restrict to the Practice row}",
              marks: 1,
              answer: "3/5",
              acceptedAnswers: ["0.6", "60%", "12/20"],
              hint: "Use the Practice row total (20) as the denominator.",
              explanation: "P(Win|Practice)=12/20=3/5.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find P(Win) using the table totals.",
              latex: "P(\\text{Win})=\\frac{\\text{total wins}}{\\text{grand total}}",
              marks: 1,
              answer: "2/5",
              acceptedAnswers: ["0.4", "40%", "16/40"],
              hint: "Use the Win column total and the grand total.",
              explanation: "P(Win)=16/40=2/5.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find P(Win ∩ Practice).",
              latex: "P(\\text{Win}\\cap\\text{Practice})=\\frac{12}{40}",
              marks: 2,
              answer: "3/10",
              acceptedAnswers: ["0.3", "30%", "12/40"],
              hint: "Divide the cell count (12) by the grand total (40).",
              explanation:
                "P(Win∩Practice)=12/40=3/10. Since P(Win)·P(Practice)=(2/5)·(1/2)=1/5≠3/10, Win and Practice are not independent.",
            },
          ],
        },
        {
          id: "y11adv-pd-cond-mp2",
          prompt: "Use the multiplication rule and the law of total probability.",
          latex: "P(A|B)=0.6,\\quad P(B)=0.5,\\quad P(A\\cap B')=0.1",
          answer: "0.3",
          hint: "Use the multiplication rule for part (a), the complement rule for part (b), and add the two joint probabilities for part (c).",
          explanation:
            "(a) P(A∩B)=0.6×0.5=0.3. (b) P(B')=1−0.5=0.5. (c) P(A)=P(A∩B)+P(A∩B')=0.3+0.1=0.4.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find P(A∩B) using the multiplication rule.",
              latex: "P(A\\cap B)=P(A|B)\\cdot P(B)",
              marks: 1,
              answer: "0.3",
              acceptedAnswers: ["3/10", "30%"],
              hint: "Multiply P(A|B) by P(B).",
              explanation: "P(A∩B)=0.6×0.5=0.3.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find P(B').",
              latex: "P(B')=1-P(B)",
              marks: 1,
              answer: "0.5",
              acceptedAnswers: ["1/2", "50%"],
              hint: "Use the complement rule.",
              explanation: "P(B')=1−0.5=0.5.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find P(A) using the law of total probability.",
              latex: "P(A)=P(A\\cap B)+P(A\\cap B')",
              marks: 2,
              answer: "0.4",
              acceptedAnswers: ["2/5", "40%"],
              hint: "Add P(A∩B) from part (a) and the given P(A∩B').",
              explanation: "P(A)=P(A∩B)+P(A∩B')=0.3+0.1=0.4.",
            },
          ],
        },
      ],
    };
  }

  return null;
}
