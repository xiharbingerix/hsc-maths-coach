// Year 9 — Chapter 8 (Probability & Data Analysis), DATA rework, core lessons:
// single-vs-bivariate-data, scatter-plots, line-of-best-fit, describing-and-predicting.
// NESA Mathematics K-10 (2022) Stage 5 Data Analysis B — MA5-DAT-C-02: "displays and
// interprets datasets involving bivariate data". Replaces the 6 lessons formerly in
// chapter8Statistics.ts (see docs/migrations/Y9-data-rework-slug-map.md) — that content
// (mean/median/mode, stem-and-leaf, standard deviation, quartiles/IQR, box plots) already
// exists properly at Year 10 (single-variable-bivariate-statistics unit) and is not
// duplicated here. The Cambridge 10G "interpreting tables and graphs" skill (a deliberate
// Year 9 Core-conformance addition) is folded into lesson 1 as the single-variable review
// that motivates "why bivariate data is different".

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Read the data or diagram carefully before answering.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about what the data or graph is showing.", explanation };
}

const fruitChart = { description: "Column graph of favourite fruits: Apple 8, Banana 12, Orange 5, Grape 7.", bars: [{ label: "Apple", value: 8 }, { label: "Banana", value: 12 }, { label: "Orange", value: 5 }, { label: "Grape", value: 7 }], valueAxisLabel: "Students", categoryAxisLabel: "Fruit" };
const transportChart = { description: "Column graph of travel method: Bus 14, Train 8, Car 6, Walk 9.", bars: [{ label: "Bus", value: 14 }, { label: "Train", value: 8 }, { label: "Car", value: 6 }, { label: "Walk", value: 9 }], valueAxisLabel: "Students", categoryAxisLabel: "Travel method" };
const sportChart = { description: "Column graph of favourite sport: Soccer 12, Netball 9, Basketball 7, Tennis 5.", bars: [{ label: "Soccer", value: 12 }, { label: "Netball", value: 9 }, { label: "Basketball", value: 7 }, { label: "Tennis", value: 5 }], valueAxisLabel: "Students", categoryAxisLabel: "Sport" };

// ── single-vs-bivariate-data (core) — MA5-DAT-C-02 ─────────────────────────────────────
const singleVsBivariate: Partial<ExplicitLesson> = {
  description: "Distinguish single-variable from bivariate data, review reading single-variable displays, and identify variables and association vs causation.",
  learningIntention: "Decide whether a question needs single-variable or bivariate data, and describe the roles of the variables involved.",
  successCriteria: [
    "Distinguish situations that need single-variable data from those that need bivariate (two-variable) data.",
    "Read and interpret single-variable displays: frequency tables, column graphs, line graphs and sector graphs.",
    "Identify the dependent and independent variable in a two-variable relationship.",
    "Explain the difference between an association and a causal relationship.",
  ],
  teaching: {
    paragraphs: [
      "SINGLE-VARIABLE (univariate) data records ONE quantity per subject — favourite fruit, height, or daily rainfall. BIVARIATE data records TWO quantities per subject at once, so you can investigate whether they are related — for example, a student's hours of sleep AND their test score.",
      "Choose single-variable data when a question is about ONE quantity on its own ('what is the most popular sport?'). Choose bivariate data when a question is about a RELATIONSHIP between two quantities ('does more study lead to a higher mark?').",
      "Reading single-variable displays is a useful review: a frequency table or COLUMN GRAPH shows how often each category occurs — the column's HEIGHT is the frequency, not the label. A LINE GRAPH shows a quantity changing over time. A SECTOR (pie) GRAPH shows each category as a fraction of the whole.",
      "In a bivariate relationship, the INDEPENDENT variable is the one that is changed or believed to influence the other (usually the horizontal axis); the DEPENDENT variable is the one being measured or affected (usually the vertical axis). Study time is independent; test score, which may depend on it, is dependent.",
      "An ASSOCIATION means two variables tend to change together — this does NOT prove one CAUSES the other. A CAUSAL relationship means changing one variable actually produces a change in the other. Ice-cream sales and drowning incidents are associated (both rise in summer), but ice cream does not cause drowning — a third factor, hot weather, likely drives both.",
    ],
    latexBlocks: ["\\text{independent variable (input)}\\ \\longrightarrow\\ \\text{dependent variable (output)}"],
  },
  workedExamples: [
    { title: "Choose single-variable or bivariate", questionLatex: "\\text{A researcher wants to know whether taller students tend to have a longer stride length.}\\\\\\text{Should they collect single-variable or bivariate data?}", steps: [{ explanation: "They need BOTH height and stride length for the same student to look for a relationship." }], finalAnswerLatex: "\\text{Bivariate data (height and stride length for each student).}" },
    { title: "Read a column graph", questionLatex: "\\text{The column graph shows favourite fruits. How many more students chose banana than orange?}", steps: [{ explanation: "Banana = 12, orange = 5.", latex: "12-5" }], finalAnswerLatex: "7", barChartDiagram: fruitChart },
    { title: "Association vs causation", questionLatex: "\\text{A study finds that towns with more ice-cream shops report more sunburn cases. Does this mean}\\\\\\text{more ice-cream shops cause sunburn?}", steps: [{ explanation: "Both are likely driven by a third (lurking) factor: hot, sunny weather increases both ice-cream sales and sunburn." }], finalAnswerLatex: "\\text{No — this is an association, likely both caused by sunny weather, not a causal link.}" },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-svb-g1", "A survey records only each student's favourite subject. Is this single-variable or bivariate data?", "A", ["Single-variable — one quantity is recorded per student", "Bivariate — two quantities are recorded per student", "Neither — this is not data", "Both, because subjects vary"], 2, "Only one quantity (favourite subject) is recorded per student."),
    { ...ans("y9-svb-g2", "The column graph shows favourite fruits. How many students chose banana?", "", "12", 2, "Read the height of the Banana column: 12."), barChartDiagram: fruitChart },
    mcq("y9-svb-g3", "An experiment tests whether more fertiliser increases plant height. Which variable is independent (deliberately changed)?", "B", ["Plant height", "Amount of fertiliser", "The pot size", "The species of plant"], 2, "Fertiliser is deliberately varied; height is measured in response."),
    mcq("y9-svb-g4", "Ice-cream sales and sunburn cases both rise in summer. What is the safest conclusion?", "C", ["Ice cream causes sunburn", "Sunburn causes people to buy ice cream", "Both are associated with a third factor — hot, sunny weather", "There is no relationship between them"], 3, "A third (lurking) variable, hot weather, likely drives both."),
  ],
  independentPractice: [
    mcq("y9-svb-i1", "A researcher wants to know whether students who sleep more tend to score higher on a test. What kind of data do they need?", "B", ["Single-variable data on sleep only", "Bivariate data: sleep hours and test score for each student", "Single-variable data on test scores only", "No data is needed"], 3, "Investigating a relationship between two quantities needs bivariate data."),
    { ...ans("y9-svb-i2", "The column graph shows how students travel to school. How many students travel by train?", "", "8", 2, "Read the Train column: 8."), barChartDiagram: transportChart },
    mcq("y9-svb-i3", "In a study of ice-cream sales vs temperature, which is the independent variable?", "A", ["Temperature", "Ice-cream sales", "The shop's location", "The day of the week"], 3, "Temperature is the variable believed to influence sales."),
    mcq("y9-svb-i4", "Which question needs bivariate data?", "C", ["What is the most common eye colour in a class?", "What is the average height of Year 9 students?", "Does height affect shoe size?", "How many students are in the class?"], 3, "This asks about a relationship between two variables."),
    mcq("y9-svb-i5", "A study shows that towns with more fire stations have more fires. Does this mean fire stations cause fires?", "B", ["Yes, definitely", "No — larger, busier towns tend to have both more fire stations and more fires (town size is a lurking variable)", "Fires cause fire stations to be built, and nothing else is relevant", "There is no possible explanation"], 4, "Town size is a lurking variable influencing both."),
  ],
  masteryQuiz: [
    mcq("y9-svb-m1", "A dataset records each person's height only. This is:", "A", ["single-variable data", "bivariate data", "a scatter plot", "a line of best fit"], 2, "Only one quantity is recorded per person."),
    { ...ans("y9-svb-m2", "The column graph shows favourite sports. How many more students chose soccer than tennis?", "", "7", 3, "Soccer 12 − tennis 5 = 7."), barChartDiagram: sportChart },
    mcq("y9-svb-m3", "Which scenario calls for bivariate data?", "B", ["Recording each student's favourite colour", "Recording each student's study hours and exam mark", "Recording the temperature each day", "Recording each car's colour in a car park"], 3, "This records two quantities per student."),
    mcq("y9-svb-m4", "In a bivariate relationship, the dependent variable is usually:", "C", ["chosen at random", "plotted on the horizontal axis", "the one being measured, which may respond to the other", "always time"], 3, "The dependent variable is measured in response to the independent variable."),
    mcq("y9-svb-m5", "Two variables that change together are described as having a(n):", "A", ["association", "causal proof", "independent variable only", "outlier"], 2, "An association is a tendency to change together."),
    mcq("y9-svb-m6", "Which statement is true about correlation and causation?", "B", ["Correlation always proves causation", "An association between two variables does not, by itself, prove one causes the other", "Causation can never be tested", "Only bivariate data can show correlation"], 3, "Association alone is not proof of causation."),
    mcq("y9-svb-m7", "A study of icy footpaths finds more slips happen when more people wear boots. What is the likely explanation?", "C", ["Boots cause slips", "Slipping causes people to buy boots", "Icy conditions (a lurking variable) lead to both more boot-wearing and more slips", "There is no relationship"], 4, "Icy conditions are the likely lurking variable."),
    mcq("y9-svb-m8", "Which of these is an example of single-variable data?", "D", ["Hours studied and test score for each student", "Height and weight for each student", "Age and income for each person", "The favourite genre of each student in a survey"], 3, "Only one quantity is recorded per student."),
    mcq("y9-svb-m9", "In an experiment testing whether screen time affects sleep duration, which is the dependent variable?", "B", ["Screen time", "Sleep duration", "The day of the week", "The student's age"], 3, "Sleep duration is measured in response to screen time."),
    ans("y9-svb-m10", "A frequency table records how many students prefer each of 4 subjects: Maths 6, English 9, Science 5, Art 4. Find the total number of students surveyed.", "", "24", 2, "Add all the frequencies: 6 + 9 + 5 + 4 = 24."),
  ],
  masteryQuizPool: [
    mcq("y9-svb-p1", "A dataset recording each runner's finishing time only is:", "A", ["single-variable data", "bivariate data", "a line of best fit", "an outlier"], 2, "Only one quantity is recorded."),
    mcq("y9-svb-p2", "A dataset recording each runner's training hours AND finishing time is:", "B", ["single-variable data", "bivariate data", "a sector graph", "a frequency table"], 2, "Two quantities are recorded per runner."),
    mcq("y9-svb-p3", "Which is the independent variable in a study of 'does more revision improve exam marks'?", "A", ["Hours of revision", "Exam mark", "The exam date", "The classroom"], 3, "Revision hours are believed to influence the mark."),
    mcq("y9-svb-p4", "Which is the dependent variable in that same study?", "B", ["Hours of revision", "Exam mark", "The exam date", "The classroom"], 3, "Exam mark is measured in response to revision."),
    mcq("y9-svb-p5", "A town's ice-cream sales and swimming-pool visits both increase in summer. This is best described as:", "C", ["proof that ice cream causes pool visits", "proof that pool visits cause ice-cream sales", "an association likely driven by a third factor (hot weather)", "a coincidence with no possible explanation"], 4, "Hot weather is the likely lurking variable."),
    mcq("y9-svb-p6", "Which question is answered using single-variable data?", "A", ["What is the median height of Year 9 students?", "Does more sleep improve concentration?", "Is there a relationship between age and reaction time?", "Does rainfall affect crop yield?"], 3, "This asks about one quantity only."),
    mcq("y9-svb-p7", "A survey records each person's age and their reaction time in a test. This is:", "B", ["single-variable data", "bivariate data", "a sector graph only", "not valid data"], 2, "Two quantities are recorded per person."),
    mcq("y9-svb-p8", "Which best describes 'association' between two variables?", "A", ["They tend to change together, without necessarily one causing the other", "One variable definitely causes the other", "There is no pattern between them", "They must both be categorical"], 3, "Association is a tendency to change together."),
    mcq("y9-svb-p9", "A study finds that as coffee sales increase, so do library late fees. What should a careful researcher conclude?", "C", ["Coffee causes late fees", "Late fees cause coffee sales", "Both may be linked to a third factor, such as exam-period stress", "The study is meaningless"], 4, "Exam-period stress is a plausible lurking variable."),
    ans("y9-svb-p10", "A column graph shows the number of pets owned by students: 0 pets → 10, 1 pet → 15, 2 pets → 8, 3 pets → 2. Find the total number of students surveyed.", "", "35", 3, "Add all frequencies: 10 + 15 + 8 + 2 = 35."),
  ],
  commonMistakes: [
    { mistake: "Assuming any two related measurements automatically need bivariate analysis.", fix: "Bivariate data is needed only when investigating a RELATIONSHIP between two variables for the same subject." },
    { mistake: "Treating an association as proof of causation.", fix: "An association only shows two variables change together — a causal claim needs stronger evidence, such as a controlled experiment." },
    { mistake: "Reading the category label instead of the column height (frequency).", fix: "The column's height is the frequency (how many) — read that value, not the label underneath." },
    { mistake: "Mixing up independent and dependent variables.", fix: "The independent variable is deliberately changed or believed to influence the outcome; the dependent variable is what's measured in response." },
  ],
  masteryPassMark: 0.8,
};

// ── scatter-plots (core) — MA5-DAT-C-02 ────────────────────────────────────────────────
const scatterPlots: Partial<ExplicitLesson> = {
  description: "Represent bivariate data as a scatter plot, and recognise rising, falling and unclear trends and outliers.",
  learningIntention: "Represent and read bivariate data using a scatter plot.",
  successCriteria: [
    "Represent bivariate data as a scatter plot by plotting ordered pairs.",
    "Read values and identify an outlier from a scatter plot.",
    "Recognise whether a scatter plot shows a rising trend, a falling trend, or no clear trend.",
    "Explain what each point on a scatter plot represents.",
  ],
  teaching: {
    paragraphs: [
      "A SCATTER PLOT displays bivariate data as points on a coordinate grid — one axis for each variable. Each point represents ONE subject's pair of values, e.g. (hours studied, test score) for one student.",
      "To construct a scatter plot: choose a variable for each axis (independent variable on the horizontal axis, dependent on the vertical), then plot each data pair as a single point, written as an ordered pair (independent value, dependent value).",
      "The overall pattern of points reveals whether there's a trend. Points that generally RISE from left to right suggest a POSITIVE trend; points that generally FALL suggest a NEGATIVE trend; points with no clear rising or falling pattern show NO CLEAR TREND.",
      "A point that sits noticeably away from the main pattern of the other points is an OUTLIER — it's worth checking whether it's a genuine unusual case or a data-entry error.",
    ],
    latexBlocks: ["(\\text{independent value},\\ \\text{dependent value})"],
  },
  workedExamples: [
    {
      title: "Plot a data pair",
      questionLatex: "\\text{A student studied for 3 hours and scored 65 on a test. Write this as an ordered pair}\\\\\\text{(study hours, score), and show it on a scatter plot.}",
      steps: [{ explanation: "Horizontal value first (hours), then vertical value (score).", latex: "(3,65)" }],
      finalAnswerLatex: "(3,65)",
      cartesianGraph: { description: "Scatter plot of study hours vs test score for several students, with (3, 65) highlighted among the cloud of points.", xMin: 0, xMax: 8, yMin: 0, yMax: 100, xStep: 1, yStep: 20, showGrid: true, showAxisLabels: true, xAxisLabel: "study hours", yAxisLabel: "test score", points: [{ x: 1, y: 40 }, { x: 2, y: 52 }, { x: 3, y: 65, label: "(3, 65)" }, { x: 4, y: 70 }, { x: 5, y: 82 }, { x: 6, y: 88 }] },
    },
    {
      title: "Recognise a rising trend",
      questionLatex: "\\text{Describe the trend shown by the scatter plot.}",
      steps: [{ explanation: "The points generally rise from left to right." }],
      finalAnswerLatex: "\\text{A rising (positive) trend.}",
      cartesianGraph: { description: "Scatter plot with points rising steadily from left to right, showing a positive trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 90, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 20 }, { x: 2, y: 30 }, { x: 3, y: 45 }, { x: 4, y: 55 }, { x: 5, y: 68 }, { x: 6, y: 80 }] },
    },
    {
      title: "Identify an outlier",
      questionLatex: "\\text{Which point is the outlier in the scatter plot?}",
      steps: [{ explanation: "Most points rise gently, but one point sits far above the rest for its input value.", latex: "(5,60)" }],
      finalAnswerLatex: "(5,60)",
      cartesianGraph: { description: "Scatter plot with a mild rising trend and one clear outlier at (5, 60), well above the other points.", xMin: 0, xMax: 7, yMin: 0, yMax: 70, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 10 }, { x: 2, y: 15 }, { x: 3, y: 18 }, { x: 4, y: 22 }, { x: 5, y: 60, label: "outlier" }, { x: 6, y: 28 }] },
    },
  ] as WorkedExample[],
  guidedPractice: [
    ans("y9-scat-g1", "A student studied 2 hours and scored 55. Write this as an ordered pair for a scatter plot with study hours on the horizontal axis.", "", "(2,55)", 2, "Horizontal value first (2 hours), then vertical value (55).", ["(2, 55)"]),
    { ...mcq("y9-scat-g2", "Which trend does the scatter plot show?", "A", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points rise from left to right."), cartesianGraph: { description: "Scatter plot with points rising steadily from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 90, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 25 }, { x: 2, y: 35 }, { x: 3, y: 48 }, { x: 4, y: 58 }, { x: 5, y: 70 }, { x: 6, y: 82 }] } },
    { ...mcq("y9-scat-g3", "Which trend does the scatter plot show?", "B", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points fall from left to right."), cartesianGraph: { description: "Scatter plot with points falling steadily from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 100, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 90 }, { x: 2, y: 75 }, { x: 3, y: 60 }, { x: 4, y: 50 }, { x: 5, y: 35 }, { x: 6, y: 20 }] } },
    { ...ans("y9-scat-g4", "Which point is the outlier in the scatter plot?", "", "(5,60)", 3, "Most points sit between 5 and 30, but one point at (5, 60) sits far above the pattern.", ["(5, 60)"]), cartesianGraph: { description: "Scatter plot with a mild rising trend and one point at (5, 60) well above the rest.", xMin: 0, xMax: 7, yMin: 0, yMax: 70, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 8 }, { x: 2, y: 12 }, { x: 3, y: 16 }, { x: 4, y: 20 }, { x: 5, y: 60 }, { x: 6, y: 26 }] } },
  ],
  independentPractice: [
    mcq("y9-scat-i1", "In the ordered pair (5, 42) representing (training hours, race time in minutes), what does 42 represent?", "B", ["Training hours", "Race time in minutes", "The runner's age", "The race distance"], 2, "The second value corresponds to the vertical (dependent) variable."),
    { ...mcq("y9-scat-i2", "Which trend does the scatter plot show?", "A", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A perfectly straight line only"], 2, "The points rise from left to right."), cartesianGraph: { description: "Scatter plot with points rising from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 8 }, { x: 2, y: 18 }, { x: 3, y: 22 }, { x: 4, y: 34 }, { x: 5, y: 40 }, { x: 6, y: 52 }] } },
    { ...mcq("y9-scat-i3", "Which trend does the scatter plot show?", "C", ["Strong positive trend", "Strong negative trend", "No clear trend", "A single outlier only"], 3, "The points are scattered with no clear rising or falling pattern."), cartesianGraph: { description: "Scatter plot with points scattered randomly, showing no clear trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 40 }, { x: 2, y: 15 }, { x: 3, y: 55 }, { x: 4, y: 20 }, { x: 5, y: 48 }, { x: 6, y: 10 }] } },
    ans("y9-scat-i4", "A car is 3 years old and worth $12000. Write this as an ordered pair (age, value).", "", "(3,12000)", 2, "Horizontal value first (age), then vertical value (value).", ["(3, 12000)"]),
    mcq("y9-scat-i5", "Each point on a scatter plot represents:", "A", ["one subject's pair of values for the two variables", "the average of all data", "only the independent variable", "the total of both variables"], 2, "Each point is one subject's (x, y) pair."),
  ],
  masteryQuiz: [
    ans("y9-scat-m1", "A student watched TV for 2 hours and scored 78 on a test. Write this as an ordered pair (TV hours, score).", "", "(2,78)", 2, "Horizontal value first (2 hours), then vertical value (78).", ["(2, 78)"]),
    { ...mcq("y9-scat-m2", "Which trend does the scatter plot show?", "A", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points rise from left to right."), cartesianGraph: { description: "Scatter plot with points rising from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 70, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 12 }, { x: 2, y: 22 }, { x: 3, y: 30 }, { x: 4, y: 40 }, { x: 5, y: 52 }, { x: 6, y: 62 }] } },
    { ...mcq("y9-scat-m3", "Which trend does the scatter plot show?", "B", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points fall from left to right."), cartesianGraph: { description: "Scatter plot with points falling from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 70, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 60 }, { x: 2, y: 50 }, { x: 3, y: 42 }, { x: 4, y: 30 }, { x: 5, y: 20 }, { x: 6, y: 10 }] } },
    { ...ans("y9-scat-m4", "Which point is the outlier in the scatter plot?", "", "(3,50)", 3, "Most points sit between 5 and 18, but one point at (3, 50) sits far above the pattern.", ["(3, 50)"]), cartesianGraph: { description: "Scatter plot with a mild pattern and one point at (3, 50) well above the rest.", xMin: 0, xMax: 6, yMin: 0, yMax: 55, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 5 }, { x: 2, y: 9 }, { x: 3, y: 50 }, { x: 4, y: 14 }, { x: 5, y: 18 }] } },
    mcq("y9-scat-m5", "Which axis usually holds the independent variable on a scatter plot?", "A", ["horizontal", "vertical", "neither", "both"], 2, "The independent variable is usually plotted on the horizontal axis."),
    mcq("y9-scat-m6", "A scatter plot of (age, price) for used cars shows points falling from left to right. What does this suggest?", "B", ["Older cars tend to be worth more", "Older cars tend to be worth less", "Age has no effect on price", "All cars have the same price"], 3, "A falling trend suggests price decreases as age increases."),
    ans("y9-scat-m7", "A plant's height was recorded as 15 cm after 3 weeks. Write this as an ordered pair (weeks, height).", "", "(3,15)", 2, "Horizontal value first (3 weeks), then vertical value (15 cm).", ["(3, 15)"]),
    { ...mcq("y9-scat-m8", "Which trend does the scatter plot show?", "C", ["Strong positive trend", "Strong negative trend", "No clear trend", "A single outlier only"], 3, "The points are scattered with no clear direction."), cartesianGraph: { description: "Scatter plot with points scattered randomly, showing no clear trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 30 }, { x: 2, y: 50 }, { x: 3, y: 12 }, { x: 4, y: 44 }, { x: 5, y: 20 }, { x: 6, y: 38 }] } },
    mcq("y9-scat-m9", "Why is a point far from the main scatter pattern worth investigating?", "C", ["It should always be deleted immediately", "It always proves the data is wrong", "It may be a genuine unusual case or a data-entry error", "It always shows a perfect trend"], 3, "An outlier is worth checking, not automatically dismissed or trusted."),
    mcq("y9-scat-m10", "A scatter plot compares hours of sleep and reaction time, with points falling from left to right. This suggests:", "A", ["More sleep is associated with faster (lower) reaction time", "More sleep is associated with slower reaction time", "Sleep has no relationship with reaction time", "The data must be single-variable"], 4, "A falling trend means reaction time tends to decrease as sleep increases."),
  ],
  masteryQuizPool: [
    ans("y9-scat-p1", "A worker has 4 years of experience and earns $28 an hour. Write this as an ordered pair (years, wage).", "", "(4,28)", 2, "Horizontal value first (4 years), then vertical value (28).", ["(4, 28)"]),
    { ...mcq("y9-scat-p2", "Which trend does the scatter plot show?", "A", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points rise from left to right."), cartesianGraph: { description: "Scatter plot with points rising from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 28 }, { x: 4, y: 36 }, { x: 5, y: 46 }, { x: 6, y: 55 }] } },
    { ...mcq("y9-scat-p3", "Which trend does the scatter plot show?", "B", ["A rising (positive) trend", "A falling (negative) trend", "No clear trend", "A single outlier only"], 2, "The points fall from left to right."), cartesianGraph: { description: "Scatter plot with points falling from left to right.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 55 }, { x: 2, y: 44 }, { x: 3, y: 36 }, { x: 4, y: 28 }, { x: 5, y: 18 }, { x: 6, y: 8 }] } },
    mcq("y9-scat-p4", "A scatter plot with points scattered with no clear rise or fall shows:", "C", ["strong positive trend", "strong negative trend", "no clear trend", "a perfect line"], 2, "No clear rising or falling pattern means no clear trend."),
    { ...ans("y9-scat-p5", "Which point is the outlier in the scatter plot?", "", "(4,55)", 3, "Most points sit close together, but one point at (4, 55) sits far above the pattern.", ["(4, 55)"]), cartesianGraph: { description: "Scatter plot with a mild pattern and one point at (4, 55) well above the rest.", xMin: 0, xMax: 6, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 6 }, { x: 2, y: 10 }, { x: 3, y: 13 }, { x: 4, y: 55 }, { x: 5, y: 17 }] } },
    mcq("y9-scat-p6", "In a scatter plot of (distance driven, fuel remaining), which variable is most likely dependent?", "B", ["Distance driven", "Fuel remaining", "Neither", "Both equally"], 3, "Fuel remaining responds to distance driven."),
    ans("y9-scat-p7", "A shop recorded a daily temperature of 30°C and sold 120 cold drinks. Write this as an ordered pair (temperature, drinks sold).", "", "(30,120)", 2, "Horizontal value first (30), then vertical value (120).", ["(30, 120)"]),
    mcq("y9-scat-p8", "Two scatter plots are compared: Plot A's points rise steadily; Plot B's points are scattered randomly. Which shows a clearer relationship between the variables?", "A", ["Plot A", "Plot B", "Neither shows any relationship", "Both are identical"], 3, "A rising pattern is a clearer relationship than random scatter."),
    mcq("y9-scat-p9", "A single point on a scatter plot that lies well away from the rest is called a(n):", "B", ["trend", "outlier", "axis", "interval"], 2, "A point away from the main pattern is an outlier."),
    mcq("y9-scat-p10", "Before plotting bivariate data on a scatter plot, what must be true?", "C", ["Both variables must be categorical", "There must be more than 100 data points", "Each subject must have a value recorded for BOTH variables", "The data must already show a trend"], 3, "Each point needs a value for each of the two variables."),
  ],
  commonMistakes: [
    { mistake: "Plotting the independent and dependent values on the wrong axis.", fix: "The independent variable goes on the horizontal axis, the dependent variable on the vertical axis." },
    { mistake: "Treating a single outlier as the overall trend.", fix: "Look at the pattern of the MAJORITY of points, then consider the outlier separately." },
    { mistake: "Assuming any scatter of points must show a clear trend.", fix: "Randomly scattered points with no rising or falling pattern show NO clear trend — that is a valid, useful conclusion too." },
    { mistake: "Reversing the order of coordinates in an ordered pair.", fix: "Write (independent value, dependent value) in that order, matching the axis order." },
  ],
  masteryPassMark: 0.8,
};

// ── line-of-best-fit (core) — MA5-DAT-C-02 ─────────────────────────────────────────────
const lineOfBestFit: Partial<ExplicitLesson> = {
  description: "Construct a line of best fit by eye on a scatter plot, judge how well a line fits the data, and use a given line's equation to estimate values.",
  learningIntention: "Draw and use a line of best fit, by eye, to summarise a bivariate trend.",
  successCriteria: [
    "Explain what a line of best fit represents.",
    "Judge whether a line reasonably fits a scatter plot, by eye.",
    "Recognise a poorly-fitted line versus a well-fitted line.",
    "Use a given line of best fit's equation to estimate a value.",
  ],
  teaching: {
    paragraphs: [
      "A LINE OF BEST FIT is a straight line drawn through a scatter plot that best represents the overall trend of the data. It does not need to pass through every point — it summarises the general direction and closeness of the relationship.",
      "To draw a line of best fit BY EYE: aim for roughly equal numbers of points above and below the line, follow the overall direction of the data, and keep the line as close as possible to as many points as reasonable.",
      "A well-fitted line follows the direction and centre of the point cloud. A poorly-fitted line is tilted at the wrong angle, or sits mostly above or mostly below the data instead of through its middle.",
      "Once a line of best fit is drawn, its equation (in the form y = mx + b) can be used to estimate values — substitute the input value for x and evaluate y.",
    ],
    latexBlocks: ["y=mx+b"],
  },
  workedExamples: [
    {
      title: "Judge a good fit",
      questionLatex: "\\text{Does the line shown reasonably represent the trend of the scatter of points?}",
      steps: [{ explanation: "The line follows the overall rising direction, with points roughly balanced above and below it." }],
      finalAnswerLatex: "\\text{Yes — it is a reasonable fit.}",
      cartesianGraph: { description: "Scatter plot with a rising trend and a line of best fit that follows the direction and centre of the points well.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 10 }, { x: 2, y: 18 }, { x: 3, y: 22 }, { x: 4, y: 32 }, { x: 5, y: 38 }, { x: 6, y: 48 }], lines: [{ kind: "linear", m: 7.5, b: 3, label: "line of best fit" }] },
    },
    {
      title: "Spot a poor fit",
      questionLatex: "\\text{Explain why the line shown is a poor fit for the scatter of points.}",
      steps: [{ explanation: "The data clearly rises from left to right, but the line shown is flat and does not follow that direction." }],
      finalAnswerLatex: "\\text{The line does not follow the rising direction of the data — most points sit well above it on the right.}",
      cartesianGraph: { description: "Scatter plot with a clear rising trend, but a flat (poorly-fitted) line drawn through it.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 10 }, { x: 2, y: 18 }, { x: 3, y: 22 }, { x: 4, y: 32 }, { x: 5, y: 38 }, { x: 6, y: 48 }], lines: [{ kind: "linear", m: 0, b: 20, label: "poor fit" }] },
    },
    { title: "Use a line's equation", questionLatex: "\\text{A line of best fit is }y=2x+10.\\text{ Estimate }y\\text{ when }x=5.", steps: [{ explanation: "Substitute x = 5 into the equation.", latex: "y=2(5)+10" }], finalAnswerLatex: "20" },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-lobf-g1", "A line of best fit should be drawn so that:", "B", ["it passes through every single point exactly", "points are roughly balanced above and below it, following the overall trend", "it is always horizontal", "it connects only the first and last points"], 2, "A good line of best fit balances the points around it while following the trend."),
    { ...mcq("y9-lobf-g2", "Does the line shown reasonably fit the scatter of points?", "A", ["Yes — it follows the rising trend with points balanced around it", "No — it is far too flat", "No — it goes in the wrong direction", "No — it only touches one point"], 2, "The line follows the rising trend with points balanced around it."), cartesianGraph: { description: "Scatter plot with a rising trend and a well-fitted line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 8 }, { x: 2, y: 16 }, { x: 3, y: 24 }, { x: 4, y: 30 }, { x: 5, y: 40 }, { x: 6, y: 46 }], lines: [{ kind: "linear", m: 7.6, b: 1, label: "line of best fit" }] } },
    { ...mcq("y9-lobf-g3", "Does the line shown reasonably fit the scatter of points?", "B", ["Yes, it fits perfectly", "No — the line falls while the data clearly rises", "No — there are too many points", "Yes, because it touches the most points"], 3, "The data rises, but the line shown falls — a poor fit."), cartesianGraph: { description: "Scatter plot with a rising trend, but a falling (poorly-fitted) line drawn through it.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 8 }, { x: 2, y: 16 }, { x: 3, y: 24 }, { x: 4, y: 30 }, { x: 5, y: 40 }, { x: 6, y: 46 }], lines: [{ kind: "linear", m: -4, b: 40, label: "poor fit" }] } },
    ans("y9-lobf-g4", "A line of best fit is y = 4x + 2. Estimate y when x = 3.", "", "14", 3, "y = 4(3) + 2 = 14."),
  ],
  independentPractice: [
    { ...mcq("y9-lobf-i1", "Does the line shown reasonably fit the scatter of points?", "A", ["Yes — it follows the falling trend with points balanced around it", "No — it is far too steep", "No — it goes in the wrong direction", "No — it is horizontal"], 2, "The line follows the falling trend with points balanced around it."), cartesianGraph: { description: "Scatter plot with a falling trend and a well-fitted line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 50 }, { x: 2, y: 42 }, { x: 3, y: 35 }, { x: 4, y: 26 }, { x: 5, y: 18 }, { x: 6, y: 10 }], lines: [{ kind: "linear", m: -7.8, b: 58, label: "line of best fit" }] } },
    { ...mcq("y9-lobf-i2", "Does the line shown reasonably fit the scatter of points?", "B", ["Yes, it fits well", "No — it is far too steep for the gentle trend shown", "No — it goes in the wrong direction", "Yes, because it is a straight line"], 3, "The line is much steeper than the gentle trend in the data."), cartesianGraph: { description: "Scatter plot with a gentle rising trend, but a very steep (poorly-fitted) line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 20 }, { x: 2, y: 24 }, { x: 3, y: 27 }, { x: 4, y: 30 }, { x: 5, y: 33 }, { x: 6, y: 36 }], lines: [{ kind: "linear", m: 8, b: 0, label: "poor fit" }] } },
    ans("y9-lobf-i3", "A line of best fit is y = 5x − 1. Estimate y when x = 4.", "", "19", 3, "y = 5(4) − 1 = 19."),
    mcq("y9-lobf-i4", "Why doesn't a line of best fit need to pass through every point?", "C", ["Because scatter plots never contain useful information", "Because only the first and last points matter", "Because it summarises the OVERALL trend, not each individual value", "Because lines cannot be drawn on scatter plots"], 2, "A line of best fit summarises the overall trend."),
    mcq("y9-lobf-i5", "A line of best fit has almost all points above it, with very few below. What does this suggest?", "B", ["The line is a good fit", "The line is likely drawn too low and should be adjusted upward", "The data has no trend", "The line must be perfectly vertical"], 3, "A good line should have points balanced above and below it."),
  ],
  masteryQuiz: [
    { ...mcq("y9-lobf-m1", "Does the line shown reasonably fit the scatter of points?", "A", ["Yes — it follows the trend with points balanced around it", "No — it is far too flat", "No — it goes in the wrong direction", "No — it only touches one point"], 2, "The line follows the trend with points balanced around it."), cartesianGraph: { description: "Scatter plot with a rising trend and a well-fitted line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 6 }, { x: 2, y: 14 }, { x: 3, y: 20 }, { x: 4, y: 28 }, { x: 5, y: 36 }, { x: 6, y: 44 }], lines: [{ kind: "linear", m: 7.5, b: -1, label: "line of best fit" }] } },
    { ...mcq("y9-lobf-m2", "Does the line shown reasonably fit the scatter of points?", "B", ["Yes, it fits perfectly", "No — the line falls while the data clearly rises", "No — there are too many points", "Yes, because it touches the most points"], 3, "The data rises, but the line shown falls."), cartesianGraph: { description: "Scatter plot with a rising trend, but a falling line drawn through it.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 6 }, { x: 2, y: 14 }, { x: 3, y: 20 }, { x: 4, y: 28 }, { x: 5, y: 36 }, { x: 6, y: 44 }], lines: [{ kind: "linear", m: -5, b: 45, label: "poor fit" }] } },
    ans("y9-lobf-m3", "A line of best fit is y = 2x + 6. Estimate y when x = 7.", "", "20", 3, "y = 2(7) + 6 = 20."),
    mcq("y9-lobf-m4", "A good line of best fit should have points:", "A", ["roughly balanced above and below it", "all exactly on the line", "all above the line", "all below the line"], 2, "A good fit balances the points around it."),
    ans("y9-lobf-m5", "A line of best fit is y = 3x. Estimate y when x = 9.", "", "27", 3, "y = 3(9) = 27."),
    mcq("y9-lobf-m6", "Which best describes the purpose of a line of best fit?", "B", ["To connect every data point in order", "To summarise the overall trend of bivariate data with a straight line", "To replace the need for a scatter plot", "To calculate the mean of one variable only"], 2, "A line of best fit summarises the overall trend."),
    { ...mcq("y9-lobf-m7", "Is the line shown a good fit for the data?", "B", ["Yes, it fits well", "No — it follows the right direction but sits above most of the points", "No — it goes in the wrong direction entirely", "Yes, because it is a straight line"], 4, "The line has the right slope but is shifted too high."), cartesianGraph: { description: "Scatter plot with a rising trend and a correctly-angled but too-high line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 6 }, { x: 2, y: 12 }, { x: 3, y: 18 }, { x: 4, y: 24 }, { x: 5, y: 30 }, { x: 6, y: 36 }], lines: [{ kind: "linear", m: 6, b: 15, label: "shifted too high" }] } },
    ans("y9-lobf-m8", "A line of best fit is y = 10x + 50. Estimate y when x = 2.", "", "70", 3, "y = 10(2) + 50 = 70."),
    mcq("y9-lobf-m9", "A line of best fit for (study hours, test score) has a positive slope. What does this suggest?", "A", ["More study hours tend to go with higher test scores", "More study hours tend to go with lower test scores", "Study hours and test scores are unrelated", "The line must be horizontal"], 3, "A positive slope means both variables tend to increase together."),
    mcq("y9-lobf-m10", "Which of these would make a line of best fit a poor choice to describe a scatter plot?", "C", ["The points show a clear straight-line trend", "The points are tightly clustered around a straight trend", "The points are scattered with no clear direction at all", "The points rise steadily from left to right"], 4, "With no clear direction, no straight line can represent the data well."),
  ],
  masteryQuizPool: [
    { ...mcq("y9-lobf-p1", "Does the line shown reasonably fit the scatter of points?", "A", ["Yes — it follows the trend with points balanced around it", "No — it is far too flat", "No — it goes in the wrong direction", "No — it only touches one point"], 2, "The line follows the trend with points balanced around it."), cartesianGraph: { description: "Scatter plot with a rising trend and a well-fitted line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 9 }, { x: 2, y: 15 }, { x: 3, y: 24 }, { x: 4, y: 29 }, { x: 5, y: 37 }, { x: 6, y: 45 }], lines: [{ kind: "linear", m: 7, b: 2, label: "line of best fit" }] } },
    { ...mcq("y9-lobf-p2", "Does the line shown reasonably fit the scatter of points?", "B", ["Yes, it fits well", "No — it is far too steep for the trend shown", "No — it goes in the wrong direction", "Yes, because it is straight"], 3, "The line is much steeper than the actual trend."), cartesianGraph: { description: "Scatter plot with a gentle trend and an overly steep line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 18 }, { x: 2, y: 21 }, { x: 3, y: 24 }, { x: 4, y: 27 }, { x: 5, y: 30 }, { x: 6, y: 33 }], lines: [{ kind: "linear", m: 7, b: 0, label: "too steep" }] } },
    ans("y9-lobf-p3", "A line of best fit is y = 6x − 4. Estimate y when x = 5.", "", "26", 3, "y = 6(5) − 4 = 26."),
    ans("y9-lobf-p4", "A line of best fit is y = x + 15. Estimate y when x = 8.", "", "23", 2, "y = 8 + 15 = 23."),
    mcq("y9-lobf-p5", "A line of best fit should generally:", "A", ["follow the direction and centre of the scatter of points", "touch as few points as possible", "always start at the origin", "be drawn before the data is collected"], 2, "A good line of best fit follows the direction and centre of the data."),
    { ...mcq("y9-lobf-p6", "Is the line shown a good fit for the data?", "B", ["Yes, it fits well", "No — the direction is right but it sits well below most points", "No — it goes in the wrong direction entirely", "Yes, because it is straight"], 3, "The line's slope is right but it sits too low."), cartesianGraph: { description: "Scatter plot with a rising trend and a correctly-angled but too-low line.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 20 }, { x: 2, y: 26 }, { x: 3, y: 32 }, { x: 4, y: 38 }, { x: 5, y: 44 }, { x: 6, y: 50 }], lines: [{ kind: "linear", m: 6, b: 5, label: "shifted too low" }] } },
    ans("y9-lobf-p7", "A line of best fit is y = 7x + 3. Estimate y when x = 6.", "", "45", 3, "y = 7(6) + 3 = 45."),
    mcq("y9-lobf-p8", "Why might two students draw slightly different lines of best fit for the same scatter plot?", "B", ["Because one of them made an error and there is only one correct line", "Because 'by eye' fitting allows some reasonable variation while still capturing the trend", "Because scatter plots have no real pattern", "Because lines of best fit are never useful"], 4, "Fitting a line by eye allows reasonable variation between two sensible fits."),
    ans("y9-lobf-p9", "A line of best fit is y = 2x + 20. Estimate y when x = 10.", "", "40", 3, "y = 2(10) + 20 = 40."),
    mcq("y9-lobf-p10", "A line of best fit fits the data well if:", "A", ["it captures the overall trend with points reasonably balanced around it", "it passes through the highest point only", "it is perfectly horizontal", "it ignores half the data"], 2, "A good fit captures the overall trend with balanced points."),
  ],
  commonMistakes: [
    { mistake: "Trying to force the line through every point.", fix: "A line of best fit follows the OVERALL trend — it usually will not touch most points exactly." },
    { mistake: "Drawing the line in the wrong direction relative to the data.", fix: "Check whether the data rises or falls, and match the line's slope to that direction." },
    { mistake: "Using a line whose slope is right but that sits too high or too low.", fix: "Balance the line so roughly equal numbers of points sit above and below it." },
    { mistake: "Forgetting to substitute carefully when using the line's equation.", fix: "Substitute the given x-value into y = mx + b and simplify using the correct order of operations." },
  ],
  masteryPassMark: 0.8,
};

// ── describing-and-predicting (core) — MA5-DAT-C-02 ────────────────────────────────────
const describingAndPredicting: Partial<ExplicitLesson> = {
  description: "Describe a bivariate association's direction, strength and form, and use a line of best fit for interpolation and extrapolation.",
  learningIntention: "Describe an association informally and use a line of best fit to make and evaluate predictions.",
  successCriteria: [
    "Describe an association's direction (positive/negative/none), strength (strong/moderate/weak) and form (linear).",
    "Distinguish interpolation from extrapolation.",
    "Use a line of best fit to make predictions within and beyond the data range.",
    "Explain the limitations of predictions made from a line of best fit.",
  ],
  teaching: {
    paragraphs: [
      "A bivariate association can be described using three features: DIRECTION (positive — both variables rise together; negative — one rises as the other falls), STRENGTH (strong — points sit close to a clear trend; moderate; or weak — points are more loosely scattered around the trend), and FORM (in Year 9, we describe LINEAR associations — where the trend follows roughly a straight line).",
      "A line of best fit lets us PREDICT values we didn't directly measure. INTERPOLATION predicts a value WITHIN the range of the collected data — this is usually reliable, since it's supported by nearby data. EXTRAPOLATION predicts a value OUTSIDE the collected range — this is less reliable, because the trend might not continue in the same way beyond the data we have.",
      "The further a prediction extrapolates beyond the data, the less trustworthy it becomes. A model built from 5 years of data might reasonably predict 1 year ahead, but predicting 50 years ahead assumes the same trend continues indefinitely, which is rarely safe.",
      "Every prediction from a line of best fit has LIMITATIONS: the line is only an approximate summary (not an exact rule), it applies only to the population and range studied, and real-world relationships can change over time or be affected by variables the model didn't include.",
    ],
    latexBlocks: ["y=mx+b"],
  },
  workedExamples: [
    {
      title: "Describe an association",
      questionLatex: "\\text{Describe the association shown: its direction, strength and form.}",
      steps: [{ explanation: "The points rise together and sit close to a clear straight-line trend." }],
      finalAnswerLatex: "\\text{A strong, positive, linear association.}",
      cartesianGraph: { description: "Scatter plot with points rising tightly along a clear straight-line trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 8 }, { x: 2, y: 16 }, { x: 3, y: 25 }, { x: 4, y: 32 }, { x: 5, y: 41 }, { x: 6, y: 49 }] },
    },
    { title: "Interpolate", questionLatex: "\\text{Data was collected for }x\\text{ from 2 to 10. A line of best fit is }y=3x+5.\\text{ Predict }y\\text{ when }x=6.", steps: [{ explanation: "x = 6 is within the data range 2 to 10, so this is interpolation.", latex: "2\\leq6\\leq10" }, { explanation: "Substitute x = 6 into the line.", latex: "y=3(6)+5" }], finalAnswerLatex: "23\\text{ (interpolation, since }x=6\\text{ is within the data range)}" },
    { title: "Extrapolate with caution", questionLatex: "\\text{Using the same line and data range (}x\\text{ from 2 to 10), predict }y\\text{ when }x=40.", steps: [{ explanation: "x = 40 is far outside the data range, so this is extrapolation." }, { explanation: "Substitute x = 40 into the line.", latex: "y=3(40)+5" }], finalAnswerLatex: "125\\text{, but this is extrapolation far beyond the data — unreliable}" },
  ] as WorkedExample[],
  guidedPractice: [
    { ...mcq("y9-dap-g1", "Describe the strength of the association shown.", "B", ["Strong", "Weak", "Perfect", "Negative"], 2, "The points are loosely scattered around a mild rising trend."), cartesianGraph: { description: "Scatter plot with points loosely scattered around a mild rising trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 30 }, { x: 2, y: 12 }, { x: 3, y: 40 }, { x: 4, y: 20 }, { x: 5, y: 48 }, { x: 6, y: 35 }] } },
    mcq("y9-dap-g2", "Data was collected for x from 0 to 20. Which prediction is interpolation?", "B", ["x = 25", "x = 12", "x = 30", "x = −5"], 2, "12 lies within the observed range 0–20."),
    mcq("y9-dap-g3", "Data was collected for x from 0 to 20. Which prediction is extrapolation?", "C", ["x = 5", "x = 15", "x = 30", "x = 10"], 2, "30 lies outside the observed range."),
    ans("y9-dap-g4", "A line of best fit is y = 4x + 1, fitted to data with x from 1 to 8. Predict y when x = 3 (interpolation, since x = 3 is within 1 to 8).", "", "13", 3, "y = 4(3) + 1 = 13."),
  ],
  independentPractice: [
    { ...mcq("y9-dap-i1", "Describe the direction and strength of the association shown.", "A", ["Strong, negative", "Strong, positive", "Weak, negative", "No association"], 2, "The points fall tightly along a clear trend."), cartesianGraph: { description: "Scatter plot with points falling tightly along a clear straight-line trend.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 52 }, { x: 2, y: 44 }, { x: 3, y: 37 }, { x: 4, y: 29 }, { x: 5, y: 21 }, { x: 6, y: 12 }] } },
    mcq("y9-dap-i2", "Why is extrapolation generally less reliable than interpolation?", "B", ["It always gives a smaller answer", "It predicts beyond the range of collected data, where the trend may not continue", "It uses a different formula entirely", "It can only be used with negative associations"], 2, "Extrapolation goes beyond the data range, where the trend may change."),
    ans("y9-dap-i3", "A line of best fit is y = 2x + 30, fitted to data with x from 5 to 15. Predict y when x = 10 (interpolation, since x = 10 is within 5 to 15).", "", "50", 3, "y = 2(10) + 30 = 50."),
    mcq("y9-dap-i4", "A line of best fit is used to predict a value far beyond the collected data range. Which limitation applies?", "C", ["The line becomes automatically more accurate", "Predictions are always exact", "The trend may not continue that far, so the prediction may be unreliable", "Extrapolation cannot produce a numeric answer"], 3, "The trend may not continue beyond the studied range."),
    mcq("y9-dap-i5", "Two scatter plots both show a positive trend, but Plot A's points sit tightly along a line while Plot B's points are loosely scattered. Which has the stronger association?", "A", ["Plot A", "Plot B", "They are equally strong", "Neither shows an association"], 3, "Tightly clustered points indicate a stronger association."),
  ],
  masteryQuiz: [
    { ...mcq("y9-dap-m1", "Describe the strength and direction of the association shown.", "A", ["Moderate, positive", "Strong, negative", "None", "Perfect, negative"], 3, "The points rise with a moderate amount of scatter around the trend."), cartesianGraph: { description: "Scatter plot showing a moderate positive association.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 10 }, { x: 2, y: 22 }, { x: 3, y: 18 }, { x: 4, y: 34 }, { x: 5, y: 30 }, { x: 6, y: 46 }] } },
    mcq("y9-dap-m2", "Data collected for x from 10 to 50. Which value requires extrapolation?", "D", ["20", "35", "10", "60"], 2, "60 lies outside the observed range 10–50."),
    ans("y9-dap-m3", "A line of best fit is y = 5x − 2, fitted to data with x from 0 to 10. Predict y when x = 4.", "", "18", 3, "y = 5(4) − 2 = 18."),
    mcq("y9-dap-m4", "A model's line of best fit is used to predict 100 years into the future from only 5 years of data. What is the main concern?", "B", ["The line equation becomes invalid mathematically", "This is extreme extrapolation, and the real trend may change well before then", "Interpolation is not possible with 5 years of data", "The line must be recalculated using a different formula"], 4, "Extreme extrapolation is highly unreliable."),
    mcq("y9-dap-m5", "Which set of words correctly describes an association?", "A", ["direction, strength, form", "height, width, depth", "mean, median, mode", "interpolation, extrapolation, residual"], 2, "Associations are described by direction, strength and form."),
    ans("y9-dap-m6", "A line of best fit is y = 3x + 12, fitted to data with x from 2 to 20. Predict y when x = 8.", "", "36", 3, "y = 3(8) + 12 = 36."),
    mcq("y9-dap-m7", "A prediction is made for a value within the range of the collected data. This is called:", "B", ["extrapolation", "interpolation", "causation", "an outlier"], 2, "A prediction within the data range is interpolation."),
    mcq("y9-dap-m8", "Which is a genuine limitation of predictions made using a line of best fit?", "C", ["The line always predicts perfectly", "Predictions never need any data", "The line is only an approximate summary and may not apply outside the studied population or range", "Lines of best fit cannot be used for predictions at all"], 3, "The line is an approximate summary with limited scope."),
    ans("y9-dap-m9", "A line of best fit is y = x + 40, fitted to data with x from 0 to 30. Predict y when x = 25.", "", "65", 3, "y = 25 + 40 = 65."),
    mcq("y9-dap-m10", "A scatter plot shows a weak positive association. What does this mean?", "A", ["The points generally rise, but are quite loosely scattered around the trend", "The points fall steeply and consistently", "There is no relationship at all between the variables", "The line of best fit must be horizontal"], 3, "A weak association has a lot of scatter around a mild trend."),
  ],
  masteryQuizPool: [
    { ...mcq("y9-dap-p1", "Describe the strength and direction of the association shown.", "A", ["Strong, positive", "Strong, negative", "None", "Weak, negative"], 2, "The points rise tightly along a clear trend."), cartesianGraph: { description: "Scatter plot showing a strong positive association.", xMin: 0, xMax: 7, yMin: 0, yMax: 60, xStep: 1, yStep: 10, showGrid: true, points: [{ x: 1, y: 6 }, { x: 2, y: 15 }, { x: 3, y: 24 }, { x: 4, y: 33 }, { x: 5, y: 42 }, { x: 6, y: 50 }] } },
    mcq("y9-dap-p2", "Data collected for x from 1 to 9. Which value is interpolation?", "B", ["15", "5", "20", "−2"], 2, "5 lies within the observed range 1–9."),
    ans("y9-dap-p3", "A line of best fit is y = 4x + 5, fitted to data with x from 0 to 12. Predict y when x = 6.", "", "29", 3, "y = 4(6) + 5 = 29."),
    mcq("y9-dap-p4", "Which best describes a strong association?", "B", ["Points are scattered with almost no pattern", "Points sit close to a clear trend line", "Points form a perfect circle", "Points are all identical"], 2, "A strong association has points tightly clustered around the trend."),
    ans("y9-dap-p5", "A line of best fit is y = 6x − 10, fitted to data with x from 3 to 20. Predict y when x = 15.", "", "80", 3, "y = 6(15) − 10 = 80."),
    mcq("y9-dap-p6", "Predicting a value well beyond the collected data range carries more risk because:", "A", ["the relationship might not continue in the same way outside the studied range", "the line equation becomes mathematically undefined", "interpolation is always wrong", "extrapolated values are always negative"], 3, "The trend may change outside the studied range."),
    mcq("y9-dap-p7", "Which pair correctly matches direction with description?", "C", ["Negative — both variables increase together", "Positive — one variable increases as the other decreases", "Positive — both variables tend to increase together", "Negative — no relationship exists"], 3, "Positive direction means both variables tend to increase together."),
    ans("y9-dap-p8", "A line of best fit is y = 2x + 18, fitted to data with x from 0 to 25. Predict y when x = 25 (this is interpolation, since x = 25 is at the edge of the range).", "", "68", 4, "y = 2(25) + 18 = 68."),
    mcq("y9-dap-p9", "A researcher predicts a country's population in the year 2200 using data from 2000–2020. This prediction is:", "B", ["interpolation, and highly reliable", "extreme extrapolation, and unreliable", "not a prediction at all", "impossible to describe"], 4, "Predicting 180 years beyond a 20-year dataset is extreme extrapolation."),
    mcq("y9-dap-p10", "Which of these is NOT a limitation of a line-of-best-fit model?", "D", ["It is only an approximate summary of the trend", "It may not apply outside the population studied", "Extrapolated predictions can be unreliable", "It always predicts the exact correct value"], 3, "A line of best fit never guarantees an exact value."),
  ],
  commonMistakes: [
    { mistake: "Describing every association as 'strong' regardless of how scattered the points are.", fix: "Judge strength by how closely the points cluster around the trend — tightly clustered means strong, loosely scattered means weak." },
    { mistake: "Treating extrapolated predictions as equally reliable as interpolated ones.", fix: "Extrapolation goes beyond the collected data range and carries more risk that the trend has changed." },
    { mistake: "Forgetting to check whether a given x-value lies inside or outside the data range before predicting.", fix: "Compare the x-value to the stated data range first — inside is interpolation, outside is extrapolation." },
    { mistake: "Assuming a line of best fit gives an exact, guaranteed value.", fix: "A line of best fit gives an ESTIMATE based on the overall trend — real values can differ from the prediction." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "single-vs-bivariate-data": singleVsBivariate,
  "scatter-plots": scatterPlots,
  "line-of-best-fit": lineOfBestFit,
  "describing-and-predicting": describingAndPredicting,
};

export function year9Chapter8DataAnalysisLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
