import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";

function probabilityAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use favourable outcomes over total outcomes, or read the data carefully.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function probabilityChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint: "Check whether the question is asking for a count, a probability, or an interpretation.",
    explanation,
  };
}

const halves = ["0.5", "0.50", "50%", "50 percent"];
const quarters = ["0.25", "25%", "25 percent"];
const threeQuarters = ["0.75", "75%", "75 percent"];
const tenths3 = ["0.3", "0.30", "30%", "30 percent"];
const tenths7 = ["0.7", "0.70", "70%", "70 percent"];
const fifths2 = ["0.4", "0.40", "40%", "40 percent"];
const fifths3 = ["0.6", "0.60", "60%", "60 percent"];
const eighths1 = ["0.125", "12.5%", "12.5 percent"];

function probabilityWorkedExamples(slug: string): WorkedExample[] {
  if (slug === "outcomes-sample-space-probability") {
    return [
      {
        title: "Probability from equally likely outcomes",
        questionLatex:
          "\\text{A bag contains 3 red counters and 2 blue counters. Find }P(\\text{red}).",
        steps: [
          { explanation: "There are 3 favourable red counters.", latex: "\\text{favourable}=3" },
          { explanation: "There are 5 counters in total.", latex: "\\text{total}=5" },
          { explanation: "Write favourable outcomes over total outcomes.", latex: "P(\\text{red})=\\frac{3}{5}" },
        ],
        finalAnswerLatex: "\\frac{3}{5}",
      },
      {
        title: "Using a sample space",
        questionLatex:
          "\\text{A fair die is rolled. Find the probability of rolling a number greater than 4.}",
        steps: [
          { explanation: "The sample space is 1, 2, 3, 4, 5, 6.", latex: "S=\\{1,2,3,4,5,6\\}" },
          { explanation: "The favourable outcomes are 5 and 6.", latex: "\\{5,6\\}" },
          { explanation: "There are 2 favourable outcomes out of 6.", latex: "\\frac{2}{6}=\\frac{1}{3}" },
        ],
        finalAnswerLatex: "\\frac{1}{3}",
      },
      {
        title: "Complement rule",
        questionLatex:
          "\\text{The probability a train is late is }0.2.\\text{ Find the probability it is not late.}",
        steps: [
          { explanation: "Late and not late are complementary events.", latex: "P(E)+P(E')=1" },
          { explanation: "Subtract the late probability from 1.", latex: "1-0.2=0.8" },
        ],
        finalAnswerLatex: "0.8",
      },
    ];
  }

  if (slug === "relative-frequency-experimental-probability") {
    return [
      {
        title: "Relative frequency from trial data",
        questionLatex:
          "\\text{A coin lands heads 18 times in 40 tosses. Find the relative frequency of heads.}",
        steps: [
          { explanation: "Relative frequency is frequency divided by total trials.", latex: "\\frac{18}{40}" },
          { explanation: "Simplify or write as a decimal.", latex: "\\frac{18}{40}=\\frac{9}{20}=0.45" },
        ],
        finalAnswerLatex: "0.45",
      },
      {
        title: "Experimental and theoretical probability",
        questionLatex:
          "\\text{A fair four-colour spinner lands on red 28 times in 100 spins.}",
        steps: [
          { explanation: "The theoretical probability of red is one colour out of four.", latex: "\\frac{1}{4}=0.25" },
          { explanation: "The experimental relative frequency is 28 out of 100.", latex: "\\frac{28}{100}=0.28" },
        ],
        finalAnswerLatex: "\\text{The experimental result is close, but not exactly theoretical.}",
      },
      {
        title: "Interpreting larger samples",
        questionLatex:
          "\\text{A spinner is tested for 20 spins and then for 500 spins. Which result is usually more reliable?}",
        steps: [
          { explanation: "Small trials can vary a lot by chance." },
          { explanation: "A larger number of trials usually gives a more stable relative frequency." },
        ],
        finalAnswerLatex: "\\text{The 500-spin result is usually more reliable.}",
      },
    ];
  }

  if (slug === "two-way-tables-probability") {
    return [
      {
        title: "Reading a two-way table",
        questionLatex:
          "\\begin{array}{c|ccc}\\text{Year}&\\text{Bus}&\\text{Train}&\\text{Walk}\\\\\\hline\\text{Year 11}&12&8&5\\\\\\text{Year 12}&10&6&9\\end{array}",
        steps: [
          { explanation: "The total number of students is the sum of all cells.", latex: "12+8+5+10+6+9=50" },
          { explanation: "Year 11 bus students are in the Year 11 row and Bus column.", latex: "12" },
        ],
        finalAnswerLatex: "12\\text{ students}",
        twoWayTableDiagram: {
          description: "Two-way table of transport mode by year group. The highlighted cell shows the 12 Year 11 students who catch the bus.",
          rowLabels: ["Year 11", "Year 12"],
          columnLabels: ["Bus", "Train", "Walk"],
          values: [[12, 8, 5], [10, 6, 9]],
          rowTotals: [25, 25],
          columnTotals: [22, 14, 14],
          grandTotal: 50,
          highlight: { kind: "cell", rowIndex: 0, columnIndex: 0, label: "Year 11 and bus" },
        },
      },
      {
        title: "Probability of an 'and' event",
        questionLatex:
          "\\begin{array}{c|ccc}\\text{Year}&\\text{Bus}&\\text{Train}&\\text{Walk}\\\\\\hline\\text{Year 11}&12&8&5\\\\\\text{Year 12}&10&6&9\\end{array}",
        steps: [
          { explanation: "The event 'Year 12 and walk' is one cell of the table.", latex: "9" },
          { explanation: "There are 50 students in total.", latex: "P(\\text{Year 12 and walk})=\\frac{9}{50}" },
        ],
        finalAnswerLatex: "\\frac{9}{50}",
        twoWayTableDiagram: {
          description: "Two-way table of transport mode by year group. The highlighted Year 12 and Walk cell supplies the favourable count 9, while the highlighted-table context uses the grand total 50 as the denominator.",
          rowLabels: ["Year 11", "Year 12"],
          columnLabels: ["Bus", "Train", "Walk"],
          values: [[12, 8, 5], [10, 6, 9]],
          rowTotals: [25, 25],
          columnTotals: [22, 14, 14],
          grandTotal: 50,
          highlight: { kind: "cell", rowIndex: 1, columnIndex: 2, label: "Year 12 and walk favourable count" },
        },
      },
      {
        title: "Simple 'or' from categories",
        questionLatex:
          "\\text{In a survey of 40 students, 14 choose soccer, 10 choose netball and 16 choose basketball. Find }P(\\text{soccer or netball}).",
        steps: [
          { explanation: "The sport categories are separate, so add the soccer and netball counts.", latex: "14+10=24" },
          { explanation: "Write the result over the total of 40.", latex: "\\frac{24}{40}=\\frac{3}{5}" },
        ],
        finalAnswerLatex: "\\frac{3}{5}",
      },
    ];
  }

  return [
    {
      title: "Mixed probability from a practical context",
      questionLatex:
        "\\text{A school records 30 bus students, 20 train students and 10 walking students.}",
      steps: [
        { explanation: "Find the total number of students.", latex: "30+20+10=60" },
        { explanation: "For a probability, place the favourable count over the total count." },
      ],
      finalAnswerLatex: "\\text{For bus, }\\frac{30}{60}=\\frac{1}{2}",
    },
    {
      title: "Choosing the correct interpretation",
      questionLatex:
        "\\text{A spinner lands on blue 32 times in 80 spins.}",
      steps: [
        { explanation: "The number 32 is a frequency, not a probability." },
        { explanation: "The experimental probability is the relative frequency.", latex: "\\frac{32}{80}=\\frac{2}{5}" },
      ],
      finalAnswerLatex: "\\frac{2}{5}",
    },
    {
      title: "Using the complement",
      questionLatex:
        "\\text{The probability of rain tomorrow is }0.35.\\text{ Find the probability of no rain.}",
      steps: [
        { explanation: "Rain and no rain are complements." },
        { explanation: "Subtract from 1.", latex: "1-0.35=0.65" },
      ],
      finalAnswerLatex: "0.65",
    },
  ];
}

export function year11StandardProbabilityRelativeFrequencyLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "probability-relative-frequency"
  ) {
    return null;
  }

  const base = {
    workedExamples: probabilityWorkedExamples(lesson.slug),
    syllabusArea: "Statistical Analysis",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "outcomes-sample-space-probability") {
    return {
      ...base,
      description:
        "Use sample spaces, favourable outcomes, the probability scale and complements in simple practical probability questions.",
      learningIntention:
        "Represent simple chance situations with sample spaces, events and probabilities from 0 to 1.",
      successCriteria: [
        "Identify the sample space for a simple chance situation.",
        "Identify favourable outcomes for an event.",
        "Calculate probability from equally likely outcomes.",
        "Write simple probabilities as fractions, decimals or percentages.",
        "Use the complement rule for events such as not late or not selected.",
      ],
      teaching: {
        paragraphs: [
          "A sample space is the list of all possible outcomes in a chance situation.",
          "An event is the outcome or group of outcomes we are interested in.",
          "When outcomes are equally likely, probability is the number of favourable outcomes divided by the total number of outcomes.",
          "Probabilities range from 0 to 1. A probability of 0 is impossible and a probability of 1 is certain.",
          "The complement of an event means the event does not happen. The probability of an event and its complement add to 1.",
        ],
        latexBlocks: [
          "P(E)=\\frac{\\text{number of favourable outcomes}}{\\text{number of equally likely outcomes}}",
          "0\\le P(E)\\le 1",
          "P(E')=1-P(E)",
        ],
      },
      guidedPractice: [
        probabilityChoice("prob-outcomes-g1", "A fair die is rolled. Which list is the sample space?", "B", ["{1, 2, 3}", "{1, 2, 3, 4, 5, 6}", "{2, 4, 6}", "{6}"], "A die has six possible outcomes: 1 to 6."),
        probabilityAnswer("prob-outcomes-g2", "A bag has 3 red counters and 2 blue counters. Find the probability of selecting a red counter.", "\\text{3 red counters, 2 blue counters}", "3/5", fifths3),
        probabilityChoice("prob-outcomes-g3", "Which probability describes an impossible event?", "A", ["0", "0.5", "1", "1.5"], "An impossible event has probability 0."),
        probabilityAnswer("prob-outcomes-g4", "The probability a train is late is 0.2. Find the probability it is not late.", "P(\\text{late})=0.2", "0.8", ["80%", "80 percent", "4/5"]),
      ],
      independentPractice: [
        probabilityAnswer("prob-outcomes-i1", "A fair die is rolled. Find the probability of rolling an even number.", "\\text{fair six-sided die}", "1/2", halves),
        probabilityAnswer("prob-outcomes-i2", "A spinner has four equal sectors labelled A, B, C and D. Find the probability of landing on A.", "\\text{A, B, C, D are equally likely}", "1/4", quarters),
        probabilityChoice("prob-outcomes-i3", "A student chooses one day of the school week at random. Which event has probability 1?", "D", ["Choosing Monday", "Choosing the weekend", "Choosing Friday", "Choosing a weekday"], "If the choice is from school days only, choosing a weekday is certain."),
        probabilityAnswer("prob-outcomes-i4", "The probability a parcel arrives today is 7/10. Find the probability it does not arrive today.", "P(\\text{arrives today})=\\frac{7}{10}", "3/10", tenths3),
        probabilityChoice("prob-outcomes-i5", "A bag contains 5 green and 5 yellow counters. Which statement is true for one random selection?", "C", ["Green is impossible", "Yellow is certain", "Green and yellow are equally likely", "The probability of green is 5"], "There are equal numbers of green and yellow counters."),
      ],
      commonMistakes: [
        { mistake: "Writing P(red) = 3 when a bag has 3 red and 2 blue counters, without dividing by the total.", fix: "Probability = favourable ÷ total: P(red) = 3/5, not 3." },
        { mistake: "Getting a probability greater than 1, such as 5 for 5 bus students out of 10.", fix: "A probability must be between 0 and 1. Divide the count by the total number of outcomes." },
        { mistake: "Forgetting that the complement means the event does not happen.", fix: "P(not late) = 1 - P(late). Subtract from 1, do not add the two probabilities together." },
        { mistake: "Assuming outcomes are equally likely when the context does not say so.", fix: "Check whether the outcomes have the same chance before using the simple counting formula." },
      ],
      masteryQuiz: [
        probabilityAnswer("prob-outcomes-m1", "A fair coin is tossed once. Find the probability of heads.", "\\text{fair coin}", "1/2", halves),
        probabilityAnswer("prob-outcomes-m2", "A fair die is rolled. Find the probability of rolling a 5.", "\\text{fair six-sided die}", "1/6", ["one sixth", "1 in 6", "16 2/3%", "16⅔%"]),
        probabilityAnswer("prob-outcomes-m3", "A spinner has 8 equal sectors, with 2 sectors shaded blue. Find the probability of blue.", "\\text{8 equal sectors, 2 blue}", "1/4", quarters),
        probabilityChoice("prob-outcomes-m4", "Which value could not be a probability?", "D", ["0", "0.25", "1", "1.2"], "A probability cannot be greater than 1."),
        probabilityAnswer("prob-outcomes-m5", "The probability a randomly selected student catches the bus is 3/5. Find the probability the student does not catch the bus.", "P(\\text{bus})=\\frac{3}{5}", "2/5", fifths2),
        probabilityChoice("prob-outcomes-m6", "A sample space for tossing two coins is:", "C", ["{H, T}", "{HH, TT}", "{HH, HT, TH, TT}", "{2H, 2T}"], "The two tosses have four ordered outcomes."),
        probabilityAnswer("prob-outcomes-m7", "A bag contains 1 red, 3 blue and 4 green counters. Find the probability of selecting a red counter.", "\\text{1 red, 3 blue, 4 green}", "1/8", eighths1),
        probabilityChoice("prob-outcomes-m8", "A student says that if there are 4 favourable outcomes, the probability must be 4. Which option identifies the error?", "B", ["The event is certain", "The total number of outcomes is also needed", "The sample space is empty", "The complement must be negative"], "Probability needs favourable outcomes divided by total outcomes."),
        probabilityAnswer("prob-outcomes-m9", "The probability that a kiosk sells out of sandwiches is 0.35. Find the probability it does not sell out.", "P(\\text{sells out})=0.35", "0.65", ["65%", "65 percent", "13/20"]),
        probabilityChoice("prob-outcomes-m10", "A spinner has four equal sectors, but two sectors are red, one is blue and one is yellow. Which statement is correct?", "A", ["Red is more likely than blue", "All colours are equally likely", "Blue is impossible", "Yellow has probability 1"], "The red colour appears on two of the four equal sectors."),
      ],
    };
  }

  if (lesson.slug === "relative-frequency-experimental-probability") {
    return {
      ...base,
      description:
        "Calculate relative frequency from trial data and compare experimental probability with theoretical probability.",
      learningIntention:
        "Use relative frequency to describe experimental probability and interpret how trial results change with sample size.",
      successCriteria: [
        "Calculate relative frequency from frequency and total trials.",
        "Interpret relative frequency as an experimental probability.",
        "Distinguish a raw frequency from a probability.",
        "Compare experimental and theoretical probabilities.",
        "Explain why larger numbers of trials usually give more stable results.",
      ],
      teaching: {
        paragraphs: [
          "Relative frequency compares how often an outcome occurs with the total number of trials.",
          "Experimental probability comes from data collected in trials or observations.",
          "Theoretical probability comes from the expected chance in a model, such as a fair coin or fair die.",
          "Experimental results do not have to match theoretical probability exactly, especially in small trials.",
          "As the number of trials increases, relative frequency often settles closer to the theoretical probability.",
        ],
        latexBlocks: [
          "\\text{relative frequency}=\\frac{\\text{frequency of outcome}}{\\text{total number of trials}}",
          "\\text{experimental probability}\\approx\\text{relative frequency}",
        ],
      },
      guidedPractice: [
        probabilityAnswer("prob-rf-g1", "A spinner lands on red 24 times in 60 spins. Find the relative frequency of red.", "\\text{red frequency}=24,\\quad \\text{trials}=60", "2/5", fifths2),
        probabilityChoice("prob-rf-g2", "A coin lands heads 13 times in 20 tosses. What is 13?", "A", ["A frequency", "A probability", "The sample space", "A percentage"], "The number 13 is the count of heads, so it is a frequency."),
        probabilityAnswer("prob-rf-g3", "A basketballer makes 45 shots out of 100 attempts. Find the relative frequency of made shots.", "\\text{45 made shots from 100 attempts}", "0.45", ["45%", "45 percent", "9/20"]),
        probabilityChoice("prob-rf-g4", "Which set of trials usually gives a more stable estimate of a spinner's probability?", "D", ["5 spins", "10 spins", "20 spins", "500 spins"], "More trials usually reduce the effect of random variation."),
      ],
      independentPractice: [
        probabilityAnswer("prob-rf-i1", "A quality check finds 13 faulty items in a sample of 50. Find the relative frequency of faulty items.", "\\text{13 faulty items from 50 checked}", "0.26", ["26%", "26 percent", "13/50"]),
        probabilityAnswer("prob-rf-i2", "A game player wins 18 games out of 30. Find the relative frequency of wins.", "\\text{18 wins from 30 games}", "3/5", fifths3),
        probabilityChoice("prob-rf-i3", "A student records that a bus was late 8 times in 40 school days. Which value is the experimental probability of a late bus?", "C", ["8", "40", "8/40", "48"], "Experimental probability is the late frequency divided by the total days."),
        probabilityChoice("prob-rf-i4", "Two groups test the same spinner. Group A gets red 6 times in 20 spins. Group B gets red 32 times in 100 spins. Which relative frequency is higher?", "B", ["Group A", "Group B", "They are equal", "It cannot be compared"], "Group A has 0.30 and Group B has 0.32."),
        probabilityAnswer("prob-rf-i5", "A website survey has 70 positive responses from 100 responses. Find the relative frequency of positive responses.", "\\text{70 positive responses from 100 responses}", "0.7", tenths7),
      ],
      commonMistakes: [
        { mistake: "Writing 24 as the probability of red after a spinner lands on red 24 times in 60 spins.", fix: "Divide by the number of trials: 24 ÷ 60 = 2/5 = 0.4, not 24." },
        { mistake: "Saying a spinner is broken because it lands on red 28 times in 100 spins instead of the expected 25.", fix: "Experimental results vary, especially in small samples. A small difference from theoretical probability is normal." },
        { mistake: "Saying Group A (6 reds in 20) beats Group B (32 reds in 100) because 32 is bigger than 6.", fix: "Convert to relative frequencies first: Group A is 6/20 = 0.30 and Group B is 32/100 = 0.32." },
        { mistake: "Drawing a strong conclusion about fairness from 10 or 20 spins.", fix: "Small trials vary a lot. More trials are needed before concluding a spinner is unfair." },
      ],
      masteryQuiz: [
        probabilityAnswer("prob-rf-m1", "A coin lands heads 30 times in 60 tosses. Find the relative frequency of heads.", "\\text{30 heads from 60 tosses}", "1/2", halves),
        probabilityAnswer("prob-rf-m2", "A goalkeeper saves 12 penalties out of 20. Find the relative frequency of saves.", "\\text{12 saves from 20 penalties}", "3/5", fifths3),
        probabilityChoice("prob-rf-m3", "A survey reports 18 students walk to school out of 90 students surveyed. What does 18 represent?", "A", ["A frequency", "The relative frequency", "The probability scale", "The complement"], "The number 18 is the count of students who walk."),
        probabilityAnswer("prob-rf-m4", "A machine passes inspection 48 times in 80 tests. Find the relative frequency of passing inspection.", "\\text{48 passes from 80 tests}", "3/5", fifths3),
        probabilityChoice("prob-rf-m5", "A fair die is rolled 12 times and sixes appear 4 times. Which statement is most reasonable?", "C", ["The theoretical probability of six is 4", "The die is definitely unfair", "The experimental result may vary in a small number of trials", "Six is now certain"], "Small samples can vary from the theoretical probability."),
        probabilityAnswer("prob-rf-m6", "In 200 train trips, 50 are delayed. Find the relative frequency of delayed trips.", "\\text{50 delayed trips from 200 trips}", "1/4", quarters),
        probabilityChoice("prob-rf-m7", "A student compares 9 wins from 15 games with 40 wins from 100 games. Which result has the greater relative frequency of wins?", "A", ["9 wins from 15 games", "40 wins from 100 games", "They are equal", "The larger frequency always wins"], "9 out of 15 is 0.6, while 40 out of 100 is 0.4."),
        probabilityAnswer("prob-rf-m8", "A spinner does not land on blue 75 times in 100 spins. Find the relative frequency of landing on blue.", "\\text{100 spins, 75 not blue}", "1/4", quarters),
        probabilityChoice("prob-rf-m9", "A canteen trials two queues. Queue A has 7 late orders from 25. Queue B has 18 late orders from 100. Which queue has the lower relative frequency of late orders?", "B", ["Queue A", "Queue B", "They are equal", "It cannot be decided"], "Queue A has 0.28 late orders and Queue B has 0.18."),
        probabilityChoice("prob-rf-m10", "A spinner with four equal colours lands on green 8 times in 10 spins. What is the safest conclusion?", "D", ["Green is certain", "The theoretical probability of green is 0.8", "The spinner must be unfair", "More trials are needed before making a strong conclusion"], "Ten spins is a small trial, so the result alone is not enough for a strong conclusion."),
      ],
    };
  }

  if (lesson.slug === "two-way-tables-probability") {
    return {
      ...base,
      description:
        "Read two-way tables, calculate row and column totals, and find simple probabilities from table cells and categories.",
      learningIntention:
        "Use two-way tables to calculate practical probabilities from survey and classification data.",
      successCriteria: [
        "Read row, column and cell information from a two-way table.",
        "Calculate table totals accurately.",
        "Find probabilities from a single table cell.",
        "Find simple category probabilities from row or column totals.",
        "Recognise when a probability is asking for an 'and' event in a table.",
      ],
      teaching: {
        paragraphs: [
          "A two-way table organises data using two categories, such as year group and transport type.",
          "A cell in the table sits at the intersection of a row and a column.",
          "Row totals and column totals help answer questions about one category.",
          "An 'and' probability from a two-way table usually comes from one cell, such as Year 11 and bus.",
          "For simple table probabilities, divide the relevant count by the total number of people or items in the table.",
        ],
        latexBlocks: [
          "P(\\text{event})=\\frac{\\text{relevant table count}}{\\text{table total}}",
          "\\text{row total}=\\text{sum across the row}",
          "\\text{column total}=\\text{sum down the column}",
        ],
      },
      guidedPractice: [
        probabilityAnswer("prob-table-g1", "A survey table has 12 Year 11 bus students, 8 Year 11 train students, 10 Year 12 bus students and 20 Year 12 train students. How many students are in the survey?", "\\begin{array}{c|cc}\\text{Year}&\\text{Bus}&\\text{Train}\\\\\\hline\\text{Year 11}&12&8\\\\\\text{Year 12}&10&20\\end{array}", "50", ["50 students"]),
        probabilityAnswer("prob-table-g2", "Using the table, find the probability that a randomly selected student is in Year 11 and catches the bus.", "\\begin{array}{c|cc}\\text{Year}&\\text{Bus}&\\text{Train}\\\\\\hline\\text{Year 11}&12&8\\\\\\text{Year 12}&10&20\\end{array}", "6/25", ["0.24", "24%", "24 percent"]),
        probabilityChoice("prob-table-g3", "In a two-way table, the count at the intersection of 'Year 12' and 'Walk' represents:", "B", ["All Year 12 students", "Students who are Year 12 and walk", "All students who walk or catch a bus", "The table total"], "A cell combines the row category and the column category."),
        probabilityAnswer("prob-table-g4", "A table of 40 students shows 14 choose soccer and 10 choose netball, with each student choosing one sport. Find the probability of soccer or netball.", "\\text{40 students; 14 soccer, 10 netball}", "3/5", fifths3),
      ],
      independentPractice: [
        probabilityAnswer("prob-table-i1", "A cafe survey table shows 18 people prefer tea, 22 prefer coffee and 10 prefer juice. How many people were surveyed?", "\\text{tea}=18,\\quad \\text{coffee}=22,\\quad \\text{juice}=10", "50", ["50 people"]),
        probabilityAnswer("prob-table-i2", "In a table of 80 students, 20 are Year 11 and play netball. Find the probability that a randomly selected student is Year 11 and plays netball.", "\\text{20 students from 80}", "1/4", quarters),
        probabilityChoice("prob-table-i3", "A two-way table has row totals for junior and senior students. Which total should be used for the probability a randomly selected student is senior?", "C", ["A single cell only", "The largest column total", "The senior row total", "The smallest row total"], "The senior row total counts all senior students."),
        probabilityAnswer("prob-table-i4", "A club table shows 16 tennis members, 24 swimming members and 20 athletics members. Each member is in one listed sport. Find the probability of swimming.", "\\text{tennis}=16,\\quad \\text{swimming}=24,\\quad \\text{athletics}=20", "2/5", fifths2),
        probabilityAnswer("prob-table-i5", "A table of 100 students shows 35 use public transport. Find the probability that a randomly selected student does not use public transport.", "\\text{35 public transport users from 100 students}", "0.65", ["65%", "65 percent", "13/20"]),
      ],
      commonMistakes: [
        { mistake: "For P(Year 12 and walk), using the Year 12 row total instead of the Year 12 walk cell.", fix: "The word 'and' means both categories at once — find the cell where Year 12 and Walk intersect." },
        { mistake: "For P(Year 11 and bus), using the Year 11 row total of 25 instead of the Year 11 bus cell of 12.", fix: "An 'and' event is a single table cell, not a whole row or column." },
        { mistake: "Finding the total of a 2×3 table by adding only two of the three cells in each row.", fix: "Add every cell in the table, or check that the row totals themselves include every column." },
        { mistake: "Adding row total and column total to find the count for an 'and' event.", fix: "Row and column totals overlap. Use the cell value directly for an 'and' probability." },
      ],
      masteryQuiz: [
        probabilityAnswer("prob-table-m1", "A two-way table has 8 Year 11 bus students, 12 Year 11 train students, 10 Year 12 bus students and 20 Year 12 train students. Find the table total.", "\\begin{array}{c|cc}\\text{Year}&\\text{Bus}&\\text{Train}\\\\\\hline\\text{Year 11}&8&12\\\\\\text{Year 12}&10&20\\end{array}", "50", ["50 students"]),
        probabilityAnswer("prob-table-m2", "Using the table, find the probability that a randomly selected student is in Year 12 and catches the train.", "\\begin{array}{c|cc}\\text{Year}&\\text{Bus}&\\text{Train}\\\\\\hline\\text{Year 11}&8&12\\\\\\text{Year 12}&10&20\\end{array}", "2/5", fifths2),
        probabilityChoice("prob-table-m3", "Using the table, find the Year 11 row total.", "A", ["20", "18", "30", "50"], "The Year 11 row total is 8 plus 12.", "\\begin{array}{c|cc}\\text{Year}&\\text{Bus}&\\text{Train}\\\\\\hline\\text{Year 11}&8&12\\\\\\text{Year 12}&10&20\\end{array}"),
        probabilityAnswer("prob-table-m4", "A survey of 60 students records 15 who bike to school. Find the probability of biking to school.", "\\text{15 bike riders from 60 students}", "1/4", quarters),
        probabilityChoice("prob-table-m5", "A table cell is labelled 'female and part-time'. Which probability uses that cell count directly?", "D", ["Female", "Part-time", "Female or part-time", "Female and part-time"], "A single cell represents both categories at once."),
        probabilityAnswer("prob-table-m6", "A table of 100 customers shows 45 pay by card. Find the probability a randomly selected customer does not pay by card.", "\\text{45 card payments from 100 customers}", "0.55", ["55%", "55 percent", "11/20"]),
        probabilityAnswer("prob-table-m7", "A sports survey has 18 students choosing soccer, 12 choosing netball and 30 choosing basketball. Each student chooses one sport. Find the probability of soccer or netball.", "\\text{60 students across three sports}", "1/2", halves),
        probabilityChoice("prob-table-m8", "A student uses the table total when the question asks 'How many Year 12 students are there?' What should they use instead?", "B", ["A single cell only", "The Year 12 row total", "The Year 11 row total", "The largest number in the table"], "A row total counts all students in that row category."),
        probabilityAnswer("prob-table-m9", "A canteen table has 14 Year 11 students buying wraps, 16 Year 11 students buying salads, 10 Year 12 students buying wraps and 20 Year 12 students buying salads. Find the probability that a randomly selected order is a wrap.", "\\begin{array}{c|cc}\\text{Year}&\\text{Wrap}&\\text{Salad}\\\\\\hline\\text{Year 11}&14&16\\\\\\text{Year 12}&10&20\\end{array}", "2/5", fifths2),
        probabilityChoice("prob-table-m10", "A table of travel method by year group has 100 students in total. The bus column total is 35 and the Year 12 row total is 48. Which extra information is needed to find the probability of Year 12 and bus?", "C", ["The table title", "The largest cell", "The Year 12 bus cell count", "The number of columns"], "The 'Year 12 and bus' event is a specific cell count."),
      ],
    };
  }

  if (lesson.slug === "probability-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed probability questions involving sample spaces, complements, relative frequency and two-way tables.",
      learningIntention:
        "Select and apply the right probability method in mixed Year 11 Standard exam-style contexts.",
      successCriteria: [
        "Recognise whether a question uses theoretical probability, relative frequency or table data.",
        "Calculate probabilities from equally likely outcomes.",
        "Use complements to find not-event probabilities.",
        "Read probabilities from practical trial data and two-way tables.",
        "Interpret answers as fractions, decimals or percentages in context.",
        "Avoid confusing frequency counts with probabilities.",
      ],
      teaching: {
        paragraphs: [
          "Mixed probability questions require you to identify the source of the probability first.",
          "For equally likely outcomes, count favourable outcomes and total outcomes.",
          "For experimental probability, use relative frequency from the trial data.",
          "For table questions, decide whether the question asks for a cell, a row total, a column total or a complement.",
          "In exam practice, short exact fractions are usually safest unless the question requests a decimal or percentage.",
        ],
        latexBlocks: [
          "P(E)=\\frac{\\text{favourable outcomes}}{\\text{total outcomes}}",
          "\\text{relative frequency}=\\frac{\\text{frequency}}{\\text{number of trials}}",
          "P(E')=1-P(E)",
        ],
      },
      guidedPractice: [
        probabilityAnswer("prob-exam-g1", "A fair die is rolled once. Find the probability of rolling a number greater than 4.", "\\text{fair six-sided die}", "1/3", ["one third", "1 in 3", "33 1/3%", "33⅓%"]),
        probabilityAnswer("prob-exam-g2", "A bus is late 15 times in 50 school mornings. Find the relative frequency of late buses.", "\\text{15 late mornings from 50 mornings}", "3/10", tenths3),
        probabilityChoice("prob-exam-g3", "A bag has 4 red and 6 blue counters. Which option gives the probability of not selecting red?", "C", ["4/10", "4/6", "6/10", "10/6"], "Not red means selecting blue, which is 6 out of 10."),
        probabilityAnswer("prob-exam-g4", "A table of 80 students shows 20 students are Year 11 and walk to school. Find the probability of Year 11 and walking.", "\\text{20 students from 80}", "1/4", quarters),
      ],
      independentPractice: [
        probabilityAnswer("prob-exam-i1", "A spinner has 10 equal sectors and 3 are green. Find the probability of green.", "\\text{10 equal sectors, 3 green}", "3/10", tenths3),
        probabilityChoice("prob-exam-i2", "A coin lands tails 22 times in 40 tosses. What probability type is found from this data?", "A", ["Experimental probability", "Theoretical probability only", "A certain event", "A sample space"], "The result comes from trial data, so it is experimental probability."),
        probabilityAnswer("prob-exam-i3", "The probability a student brings lunch from home is 0.7. Find the probability the student does not bring lunch from home.", "P(\\text{brings lunch})=0.7", "0.3", tenths3),
        probabilityAnswer("prob-exam-i4", "In a survey of 100 students, 25 choose basketball. Find the probability of choosing basketball.", "\\text{25 basketball choices from 100 students}", "1/4", quarters),
        probabilityChoice("prob-exam-i5", "A two-way table question asks for 'Year 11 and train'. Which count should be used?", "D", ["The Year 11 row total", "The train column total", "The table total", "The Year 11 train cell"], "The word 'and' points to the cell where the row and column meet."),
      ],
      commonMistakes: [
        { mistake: "Writing P(blue) = 32 after a spinner lands on blue 32 times in 80 spins.", fix: "Divide the frequency by the number of trials: 32 ÷ 80 = 2/5, not 32." },
        { mistake: "Adding 0.3 and 0.7 to find P(no rain) when P(rain) = 0.3.", fix: "Use subtraction for the complement: P(no rain) = 1 - 0.3 = 0.7." },
        { mistake: "Using the theoretical probability of 1/6 for a die question that asks about trial data.", fix: "When the question gives trial results, use relative frequency, not the theoretical value." },
        { mistake: "Using the Year 12 row total when the question asks for P(Year 12 and train).", fix: "Track both the row and column named in the question to find the one matching cell." },
      ],
      masteryQuiz: [
        probabilityAnswer("prob-exam-m1", "A fair coin is tossed twice. Find the probability of getting two heads.", "\\text{two fair coin tosses}", "1/4", quarters),
        probabilityAnswer("prob-exam-m2", "A spinner has 5 equal sectors and 2 are purple. Find the probability of purple.", "\\text{5 equal sectors, 2 purple}", "2/5", fifths2),
        probabilityAnswer("prob-exam-m3", "A bus arrives on time 42 times in 60 mornings. Find the relative frequency of arriving on time.", "\\text{42 on-time arrivals from 60 mornings}", "7/10", tenths7),
        probabilityChoice("prob-exam-m4", "A student says 18 successes from 30 trials gives probability 18. Which option identifies the error?", "B", ["The trial total should be ignored", "The frequency must be divided by the number of trials", "The complement is always 18", "The answer must be a whole number"], "A probability from trials is the frequency divided by the number of trials."),
        probabilityAnswer("prob-exam-m5", "A table of 50 students shows 15 are Year 12 and catch the train. Find the probability of Year 12 and train.", "\\text{15 students from a table total of 50}", "3/10", tenths3),
        probabilityChoice("prob-exam-m6", "The probability a cafe sells out of muffins is 0.25. Which option gives the probability it does not sell out?", "C", ["0.25", "0.5", "0.75", "1.25"], "The complement is 1 minus 0.25."),
        probabilityAnswer("prob-exam-m7", "A game is won 16 times and lost 24 times. Find the relative frequency of wins.", "\\text{16 wins, 24 losses}", "2/5", fifths2),
        probabilityChoice("prob-exam-m8", "A two-way table question asks for all students who catch the bus, regardless of year group. Which count should be used?", "A", ["The bus column total", "One bus cell only", "The Year 11 row total", "The table title"], "All bus students are counted by the bus column total."),
        probabilityAnswer("prob-exam-m9", "A weather app gives a 30% chance of rain. Find the probability of no rain.", "P(\\text{rain})=30\\%", "0.7", ["0.70", "70%", "70 percent", "7/10"]),
        probabilityChoice("prob-exam-m10", "A canteen survey has 12 Year 11 wrap orders, 18 Year 11 salad orders, 8 Year 12 wrap orders and 22 Year 12 salad orders. Which probability matches choosing a wrap order from the survey?", "B", ["12/60", "20/60", "30/60", "8/60"], "Wrap orders are 12 plus 8 out of the 60 total orders."),
      ],
    };
  }

  return null;
}
