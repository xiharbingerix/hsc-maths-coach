import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Re-read the question carefully and apply the key rule from this lesson.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Think about the key classification rule taught in this lesson.",
    explanation,
  };
}

function pAns(
  id: string,
  prompt: string,
  latex: string,
  difficulty: number,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];
  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Re-read the question carefully and apply the key rule from this lesson.",
    explanation,
  };
}

function pChoice(
  id: string,
  prompt: string,
  difficulty: number,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Think about the key concept taught in this lesson.",
    explanation,
  };
}

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// ─── Lesson 1: Data types and collection ─────────────────────────────────────

const dataTypesAndCollection: LessonContent = {
  description: "Classify data as categorical or numerical, distinguish nominal from ordinal and discrete from continuous, and identify appropriate data collection methods.",
  learningIntention: "Classify any dataset by type and choose an appropriate method to collect it from a target population.",
  successCriteria: [
    "Classify data as categorical or numerical.",
    "Distinguish nominal categorical data (no order) from ordinal categorical data (has a natural order).",
    "Distinguish discrete numerical data (countable) from continuous numerical data (measurable).",
    "Identify the target population for a given question.",
    "Distinguish a census (whole population) from a sample (part of the population).",
  ],
  teaching: {
    paragraphs: [
      "Data is just information we collect to answer a question — like 'What pet do most students own?' or 'How tall are the students in my class?'. Before you can draw a graph or work out an average, you have to know what *kind* of information you are holding, because different kinds get treated in completely different ways.",
      "Picture two columns of answers from a class survey. One column lists each student's favourite colour: blue, brown, green, blue, green. The other lists each student's height: 152, 158, 161, 149, 165 cm. Look at the difference. The colours are words that sort people into groups. The heights are numbers you could add, average, or measure more precisely. That gap is the whole idea of this lesson.",
      "We give these two kinds names. **Categorical** data sorts things into groups or labels — favourite colour, type of pet, eye colour. **Numerical** data is a genuine measurement or count you can do arithmetic with — height, age, number of siblings. Each splits once more. Categorical is *nominal* when the groups have no natural order (blue is not 'higher' than green) and *ordinal* when they do (Poor, Fair, Good, Excellent climb from worst to best). Numerical is *discrete* when it comes from counting whole things (0, 1, 2 siblings) and *continuous* when it comes from measuring on a scale that allows in-between values (a height could be 158.4 cm).",
      "Here is *why* the split matters, not just what it is. The test for numerical-vs-categorical is: does arithmetic on the values *mean* anything? Average two heights and you get a real middle height — meaningful. Average two eye colours and you get nonsense — so eye colour is categorical even if you wrote codes like blue=1, brown=2. The test for discrete-vs-continuous is: is the value *counted* or *measured*? Counting can only land on whole numbers (you cannot own 2.5 pets), so counts are discrete. Measuring can land anywhere between two marks on a ruler, so measurements are continuous — even when you round the answer to a whole number. The rounding is just how you recorded it; the underlying quantity could still take any value.",
      "To actually collect data you first name your **target population** — the exact group the question is about, like 'all 600 students at Riverside High', not a vague 'everyone'. Then you decide how much of that group to look at. A **census** records every single member of the population; a **sample** records only a chosen part of it. You census when the group is small and reaching everyone is easy; you sample when the group is huge, expensive, or impossible to reach in full (you cannot weigh every fish in the ocean).",
      "The most common trap is seeing a number and instantly calling it numerical. Jersey numbers, postcodes, and house numbers are written as digits but they are really *labels* — jersey 10 is not 'twice as good' as jersey 5, and adding two postcodes is meaningless. The moment arithmetic stops making sense, the data is categorical no matter how numeric it looks. Always ask what the number *does*, not what it looks like.",
    ],
    latexBlocks: [
      "\\text{Data} \\begin{cases} \\text{Categorical} \\begin{cases} \\text{Nominal (no order)} \\\\ \\text{Ordinal (has order)} \\end{cases} \\\\ \\text{Numerical} \\begin{cases} \\text{Discrete (counted, whole values)} \\\\ \\text{Continuous (measured, any value)} \\end{cases} \\end{cases}",
      "\\text{Numerical vs categorical: does arithmetic on the values mean anything?}",
      "\\text{Discrete vs continuous: is the value counted or measured?}",
      "\\text{Census = every member} \\qquad \\text{Sample = part of the population}",
    ],
  },
  workedExamples: [
    {
      title: "Classify a variable by data type",
      questionLatex: "\\text{Classify each variable: (a) number of pets owned, (b) favourite sport, (c) daily temperature.}",
      steps: [
        { explanation: "Number of pets comes from counting, so ask if arithmetic means anything — yes, an average number of pets makes sense, so it is numerical. Counting only lands on whole numbers, so it is discrete.", latex: "\\text{Number of pets} \\rightarrow \\text{numerical discrete}" },
        { explanation: "Favourite sport sorts people into named groups, and you cannot average soccer and tennis — so it is categorical. The groups have no natural order, so it is nominal.", latex: "\\text{Favourite sport} \\rightarrow \\text{categorical nominal}" },
        { explanation: "Daily temperature comes from measuring on a scale, and it can sit at any in-between value like 23.4°C — so it is numerical and continuous.", latex: "\\text{Daily temperature} \\rightarrow \\text{numerical continuous}" },
      ],
      finalAnswerLatex: "\\text{(a) numerical discrete,}\\quad\\text{(b) categorical nominal,}\\quad\\text{(c) numerical continuous}",
    },
    {
      title: "Identify the target population and choose a collection method",
      questionLatex: "\\text{A school wants to find the most popular lunch option among its 600 students. Identify the target population and suggest a collection method.}",
      steps: [
        { explanation: "Name the exact group the question is about, not a vague 'everyone'. The question is about this school's students, so the population is all 600 of them.", latex: "\\text{Target population: all 600 students}" },
        { explanation: "Decide census or sample by asking whether reaching everyone is practical. 600 is small enough to survey in full (a census), but a random sample of 60 would also answer the question with far less effort.", latex: "\\text{Method: survey — census (all 600) or sample (e.g. 60)}" },
      ],
      finalAnswerLatex: "\\text{Target population: all 600 students. Method: a survey, run as a census or a sample.}",
    },
    {
      title: "A trickier case — numbers that are really labels",
      questionLatex: "\\text{A sports analyst lists each player's jersey number and codes preferred position as Forward=1, Mid=2, Back=3, then computes the 'average jersey number' (8.4) and 'average position' (1.9). For each variable, state its true data type and whether the average is meaningful.}",
      steps: [
        { explanation: "Apply the arithmetic test to jersey number. Jersey 10 is not twice jersey 5 — the number only identifies a player, so adding or averaging it is meaningless. It is categorical, not numerical.", latex: "\\text{Jersey number} \\rightarrow \\text{categorical nominal (a label)}" },
        { explanation: "So the 'average jersey number' of 8.4 has no real meaning — there may not even be a player wearing 8, and the value names nothing.", latex: "\\text{Average jersey number 8.4} \\rightarrow \\text{meaningless}" },
        { explanation: "Now check preferred position. The codes 1, 2, 3 stand for groups (Forward, Mid, Back), and you cannot average Forward and Back into a real position — so it is categorical. But the codes do have an order on the field, making it ordinal.", latex: "\\text{Preferred position} \\rightarrow \\text{categorical ordinal}" },
        { explanation: "Because the codes are just labels for categories, averaging them to 1.9 does not name a category either — the number being 'close to 2' does not make the answer meaningfully 'Mid'.", latex: "\\text{Average position 1.9} \\rightarrow \\text{not meaningful}" },
      ],
      finalAnswerLatex: "\\text{Both are categorical (jersey = nominal, position = ordinal); neither average is meaningful because the values are labels, not measurements.}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-dat-typ-g1",
      "The eye colour of students in a class is recorded. What type of data is this?",
      "A",
      ["Categorical nominal", "Categorical ordinal", "Numerical discrete", "Numerical continuous"],
      "Eye colour sorts people into categories (blue, brown, green) with no natural order — this is categorical nominal data."
    ),
    answer(
      "y7-dat-typ-g2",
      "Classify this variable: the number of books a student reads in a month. Type 'discrete' or 'continuous'.",
      "\\text{Number of books read in a month}",
      "discrete",
      "The number of books is a count — you can read 0, 1, 2, 3 books but not 2.7 books. This is numerical discrete data.",
      ["numerical discrete", "Discrete"]
    ),
    answer(
      "y7-dat-typ-g3",
      "A survey rates customer satisfaction as: Poor, Fair, Good, or Excellent. What type of categorical data is this? Type 'nominal' or 'ordinal'.",
      "\\text{Satisfaction: Poor, Fair, Good, Excellent}",
      "ordinal",
      "These categories have a natural order from lowest to highest satisfaction, so the data is categorical ordinal.",
      ["categorical ordinal", "Ordinal"]
    ),
    answer(
      "y7-dat-typ-g4",
      "A researcher measures the heights of 30 Year 7 students. Is this data discrete or continuous? Type 'discrete' or 'continuous'.",
      "\\text{Heights of Year 7 students}",
      "continuous",
      "Height can take any value in a range (e.g. 152.3 cm, 158.7 cm) — it is measured, not counted. This is numerical continuous data.",
      ["numerical continuous", "Continuous"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-dat-typ-i1",
      "The daily maximum temperature in Sydney is recorded each day for a week. Is this data numerical discrete or numerical continuous? Type 'discrete' or 'continuous'.",
      "\\text{Daily maximum temperature (degrees Celsius)}",
      "continuous",
      "Temperature is measured and can take any value (e.g. 24.8°C), so it is numerical continuous data.",
      ["numerical continuous", "Continuous"]
    ),
    choice(
      "y7-dat-typ-i2",
      "A student lists the colours of cars in a car park. What type of data has the student collected?",
      "B",
      ["Numerical discrete", "Categorical nominal", "Categorical ordinal", "Numerical continuous"],
      "Car colour sorts vehicles into groups (red, blue, white …) with no natural order — this is categorical nominal data."
    ),
    answer(
      "y7-dat-typ-i3",
      "A school canteen records the number of sandwiches sold each day. Type 'discrete' or 'continuous' to classify this data.",
      "\\text{Number of sandwiches sold per day}",
      "discrete",
      "The number of sandwiches sold is a count — it can only be a whole number (0, 1, 2 …). This is numerical discrete data.",
      ["numerical discrete", "Discrete"]
    ),
    answer(
      "y7-dat-typ-i4",
      "A researcher surveys 50 households about their TV-watching habits rather than all 2000 households in the suburb. Is this a census or a sample? Type 'census' or 'sample'.",
      "\\text{50 out of 2000 households surveyed}",
      "sample",
      "A sample collects data from only part of the population. Only 50 of the 2000 households were surveyed, so this is a sample.",
      ["Sample"]
    ),
    answer(
      "y7-dat-typ-i5",
      "Movie ratings are recorded as G, PG, M, MA15+, or R18+. These categories have a natural order from least to most restricted. Type 'nominal' or 'ordinal' to classify this categorical data.",
      "\\text{Movie ratings: G, PG, M, MA15+, R18+}",
      "ordinal",
      "The ratings have a clear natural order from least restricted (G) to most restricted (R18+), making this categorical ordinal data.",
      ["categorical ordinal", "Ordinal"]
    ),
  ],
  commonMistakes: [
    { mistake: "Calling any number 'numerical discrete' — for example, classifying height as discrete because it's written as a whole number like '165 cm'.", fix: "Ask: is it counted or measured? Height is measured and can take any value, so it is continuous even when rounded." },
    { mistake: "Confusing nominal and ordinal — for example, treating star ratings (1 to 5 stars) as nominal.", fix: "If the categories have a clear natural order from lowest to highest, the data is ordinal." },
    { mistake: "Confusing census and sample — calling a study a census when only some people were asked.", fix: "A census surveys every member of the population. If any members are left out, it is a sample." },
    { mistake: "Saying the target population is 'everyone' without being specific.", fix: "Name the exact group: 'all Year 7 students at Riverside High', not just 'everyone'." },
  ],
  masteryQuiz: [
    choice(
      "y7-dat-typ-m1",
      "Which of the following is an example of numerical continuous data?",
      "C",
      ["Number of goals scored in a match", "Favourite music genre", "Time taken to run 100 m", "Shoe size (whole numbers only)"],
      "Time taken to run 100 m is measured and can take any value (e.g. 13.47 s), making it numerical continuous. Goals scored and shoe size are discrete counts; music genre is categorical."
    ),
    answer(
      "y7-dat-typ-m2",
      "Classify this variable: the number of text messages sent by a student in one day. Type 'discrete' or 'continuous'.",
      "\\text{Number of text messages sent in a day}",
      "discrete",
      "Text messages are counted in whole numbers (0, 1, 2 …) — you cannot send 4.5 messages. This is numerical discrete data.",
      ["numerical discrete", "Discrete"]
    ),
    answer(
      "y7-dat-typ-m3",
      "Students rate how much they enjoy maths as: Dislike, Neutral, or Enjoy. Type 'nominal' or 'ordinal' to classify this categorical data.",
      "\\text{Maths enjoyment: Dislike, Neutral, Enjoy}",
      "ordinal",
      "These three categories have a natural order from most negative to most positive. This is categorical ordinal data.",
      ["categorical ordinal", "Ordinal"]
    ),
    answer(
      "y7-dat-typ-m4",
      "A principal surveys every student in a school of 450 students. Is this a census or a sample? Type 'census' or 'sample'.",
      "\\text{Every one of 450 students is surveyed}",
      "census",
      "A census collects data from every member of the population. All 450 students were surveyed, so this is a census.",
      ["Census"]
    ),
    choice(
      "y7-dat-typ-m5",
      "A student claims that 'jersey number' worn by players is numerical data because it is a number. Is the student correct, and why?",
      "D",
      [
        "Yes — any number is numerical data.",
        "Yes — jersey numbers can be compared using greater than or less than.",
        "No — jersey numbers are continuous because they can be any value.",
        "No — jersey numbers are categorical because arithmetic on them has no meaning.",
      ],
      "Jersey numbers identify players but arithmetic on them is meaningless (jersey 10 is not twice jersey 5). They act as labels, making them categorical data despite being written as numbers."
    ),
    answer(
      "y7-dat-typ-m6",
      "The mass of apples at a market stall is recorded. Type 'discrete' or 'continuous' to classify this data.",
      "\\text{Mass of apples (grams)}",
      "continuous",
      "Mass can take any value in a range (e.g. 184.6 g) — it is measured, not counted. This is numerical continuous data.",
      ["numerical continuous", "Continuous"]
    ),
    answer(
      "y7-dat-typ-m7",
      "A council surveys 200 residents out of 5000 to find preferred park facilities. Type 'census' or 'sample' to describe this study.",
      "\\text{200 out of 5000 residents surveyed}",
      "sample",
      "Only part of the population (200 of 5000 residents) was surveyed. This is a sample, not a census.",
      ["Sample"]
    ),
    choice(
      "y7-dat-typ-m8",
      "Which variable is categorical ordinal?",
      "B",
      ["Eye colour", "Academic grade (A, B, C, D, E)", "Number of siblings", "Distance walked to school"],
      "Academic grades A, B, C, D, E have a natural order from highest to lowest — this is categorical ordinal. Eye colour is nominal; number of siblings is discrete; distance is continuous."
    ),
    answer(
      "y7-dat-typ-m9",
      "A scientist measures the wingspan of 40 butterflies to the nearest millimetre. Type 'discrete' or 'continuous' to classify this data.",
      "\\text{Wingspan of butterflies (mm)}",
      "continuous",
      "Wingspan is a measurement that can take any value. Rounding to the nearest millimetre is just a recording choice — the underlying variable is continuous.",
      ["numerical continuous", "Continuous"]
    ),
    answer(
      "y7-dat-typ-m10",
      "Students were asked: 'How many siblings do you have?' The responses were: 0, 1, 1, 2, 0, 3, 1, 2, 0, 1. How many students have exactly 1 sibling?",
      "\\text{Responses: }0, 1, 1, 2, 0, 3, 1, 2, 0, 1",
      "4",
      "Count the 1s in the list: positions 2, 3, 7, 10 all show 1 sibling. There are 4 students with exactly 1 sibling.",
      []
    ),
  ],
  masteryQuizPool: [
    pChoice("y7-dat-typ-p1", "Which of these is categorical data?", 1, "B", ["Number of pets", "Favourite colour", "Height in cm", "Mass in kg"], "Favourite colour sorts people into groups with no numerical meaning — it is categorical. The others are numerical."),
    pAns("y7-dat-typ-p2", "Classify: the number of cars in a car park. Type 'discrete' or 'continuous'.", "\\text{Number of cars}", 1, "discrete", "A count of cars can only be a whole number (0, 1, 2 …), so it is numerical discrete.", ["numerical discrete", "Discrete"]),
    pAns("y7-dat-typ-p3", "Classify: the length of a pencil. Type 'discrete' or 'continuous'.", "\\text{Length of a pencil}", 1, "continuous", "Length is measured and can take any value, so it is numerical continuous.", ["numerical continuous", "Continuous"]),
    pChoice("y7-dat-typ-p4", "Which is an example of categorical nominal data?", 1, "A", ["Blood type (A, B, AB, O)", "Exam grade (A, B, C)", "Number of pages", "Time taken"], "Blood types are categories with no natural order — nominal. Exam grades have an order (ordinal); the others are numerical."),
    pAns("y7-dat-typ-p5", "Classify: shirt size recorded as Small, Medium, Large. Type 'nominal' or 'ordinal'.", "\\text{Shirt size: S, M, L}", 2, "ordinal", "Small, Medium, Large have a natural order from smallest to largest, so the data is categorical ordinal.", ["categorical ordinal", "Ordinal"]),
    pAns("y7-dat-typ-p6", "A study surveys all 320 members of a sports club. Is this a census or a sample? Type 'census' or 'sample'.", "\\text{All 320 members surveyed}", 2, "census", "Every member of the population was surveyed, so this is a census.", ["Census"]),
    pAns("y7-dat-typ-p7", "Classify: a person's age in completed years. Type 'discrete' or 'continuous'.", "\\text{Age in completed years}", 2, "discrete", "Age in completed years is reported as a whole-number count of years, making the recorded data discrete.", ["numerical discrete", "Discrete"]),
    pChoice("y7-dat-typ-p8", "Which variable is numerical continuous?", 2, "C", ["Number of goals", "Postcode", "Weight of a parcel", "Type of fruit"], "Weight is measured on a continuous scale. Goals are a discrete count, postcodes are labels (categorical), and fruit type is categorical."),
    pAns("y7-dat-typ-p9", "A factory checks 40 items out of a batch of 1000. Is this a census or a sample? Type 'census' or 'sample'.", "\\text{40 of 1000 items checked}", 2, "sample", "Only part of the batch (40 of 1000) was checked, so this is a sample.", ["Sample"]),
    pChoice("y7-dat-typ-p10", "Energy-efficiency ratings of fridges are labelled 1 to 6 stars. What type of data is this?", 3, "B", ["Categorical nominal", "Categorical ordinal", "Numerical continuous", "Numerical discrete"], "Star ratings have a clear natural order from fewest to most stars, so the data is categorical ordinal — the numbers act as ordered labels."),
    pAns("y7-dat-typ-p11", "Classify: the temperature of a cup of coffee. Type 'discrete' or 'continuous'.", "\\text{Coffee temperature}", 3, "continuous", "Temperature is measured and can take any value, so it is numerical continuous.", ["numerical continuous", "Continuous"]),
    pChoice("y7-dat-typ-p12", "Which collection method best suits finding the average daily rainfall over a year?", 3, "C", ["Survey of opinions", "Census of every cloud", "Daily measurement (observation)", "Random phone interviews"], "Rainfall is best collected by directly measuring (observing) it each day. Surveys and interviews collect opinions, not physical measurements."),
    pAns("y7-dat-typ-p13", "A researcher records the responses to 'How many languages do you speak?': 1, 2, 1, 3, 1, 2, 1, 4. How many people speak exactly 1 language?", "\\text{Responses: }1, 2, 1, 3, 1, 2, 1, 4", 3, "4", "Count the 1s: positions 1, 3, 5, 7 — that is 4 people who speak exactly 1 language.", []),
    pChoice("y7-dat-typ-p14", "A student says 'house number' (e.g. 12, 14, 16) is numerical because it's a number. What is the best classification?", 3, "D", ["Numerical continuous, because it varies", "Numerical discrete, because it is a count", "Categorical ordinal, because houses are in order", "Categorical nominal, because the number is a label"], "House numbers are labels that identify a house. Arithmetic on them is meaningless (house 16 is not twice house 8), so they are categorical nominal."),
    pAns("y7-dat-typ-p15", "Classify: the number of decimal places a calculator can display. Type 'discrete' or 'continuous'.", "\\text{Number of decimal places displayed}", 3, "discrete", "This is a count of places (8, 10, 12 …), which can only be a whole number — numerical discrete.", ["numerical discrete", "Discrete"]),
    pChoice("y7-dat-typ-p16", "Which study is a census rather than a sample?", 4, "A", ["A teacher records the birth month of every student in her class of 28", "A pollster phones 500 of 40000 voters", "A scientist tests 30 of 600 batteries", "A shop surveys 1 in 10 customers"], "A census collects data from every member of the population. Recording every student in the class (all 28) is a census; the others only study part of the population."),
    pAns("y7-dat-typ-p17", "A dataset records, for 12 people, whether each is left- or right-handed: R, R, L, R, R, L, R, R, R, L, R, R. How many are left-handed?", "\\text{L/R: }R, R, L, R, R, L, R, R, R, L, R, R", 4, "3", "Count the L entries: positions 3, 6, 10 — that is 3 left-handed people.", []),
    pAns("y7-dat-typ-p18", "Survey responses for 'preferred study time' are coded: Morning=1, Afternoon=2, Evening=3. A student computes the 'average' as 2.1 and calls it the typical category. Is computing this average meaningful here? Type 'yes' or 'no'.", "\\text{Codes: Morning=1, Afternoon=2, Evening=3}", 4, "no", "The codes are labels for categories (nominal), so arithmetic such as averaging them has no real meaning — an 'average' of 2.1 does not name a category.", ["No"]),
    pChoice("y7-dat-typ-p19", "A council wants residents' opinions on a new park. Surveying every resident is too expensive. Which is the most appropriate practical approach?", 4, "B", ["Conduct a full census of all residents", "Survey a sample of residents and infer the population view", "Measure the park's area precisely", "Record the weather each day"], "When a census is impractical, surveying a representative sample and inferring the population's view is the standard, practical method."),
    pAns("y7-dat-typ-p20", "Classify the variable 'time (in seconds) for water to boil', then state how many of these three variables are numerical continuous: time to boil, number of cups, water temperature.", "\\text{Variables: time to boil, number of cups, water temperature}", 4, "2", "Time to boil and temperature are both measured (continuous); number of cups is a count (discrete). So 2 of the three are numerical continuous.", []),
    pAns("y7-dat-typ-p21", "A class of 25 students is surveyed about pet ownership; the school of 500 is then surveyed entirely. The class survey, relative to the whole school, is a sample. Of the 25 class students, 14 own a pet. What fraction own a pet? Give your answer as a decimal.", "\\text{14 of 25 own a pet}", 5, "0.56", "14 ÷ 25 = 0.56. (The class is a sample of the school of 500.)", ["14/25", ".56"]),
    pChoice("y7-dat-typ-p22", "Which statement is correct?", 5, "C", ["All numerical data is continuous.", "Ordinal data has no order.", "A census surveys the whole population; a sample surveys only part.", "Nominal data can always be ranked from low to high."], "By definition, a census covers the entire population while a sample covers only part. Numerical data can be discrete; ordinal data is ordered; nominal data cannot be ranked."),
    pAns("y7-dat-typ-p23", "For 10 students, the variable 'number of siblings' gave: 0, 2, 1, 1, 3, 0, 2, 1, 4, 1. This variable is numerical discrete. How many students have more than 1 sibling?", "\\text{Siblings: }0, 2, 1, 1, 3, 0, 2, 1, 4, 1", 5, "4", "Values greater than 1: 2, 3, 2, 4 — that is 4 students with more than 1 sibling.", []),
    pChoice("y7-dat-typ-p24", "A market researcher claims a phone survey of 50 people who answered between 9am and 11am on a weekday represents 'all adults'. Why might this be a poor sample?", 5, "D", ["50 people is a census", "The data is categorical", "Phone surveys measure continuous data", "People available on a weekday morning may not represent all adults"], "A sample should represent the population. People reachable on a weekday morning (e.g. not at work) may differ systematically from all adults, biasing the sample."),
    pAns("y7-dat-typ-p25", "Of three variables — eye colour, reaction time (seconds), and number of correct answers — how many are categorical?", "\\text{Variables: eye colour, reaction time, number of correct answers}", 5, "1", "Eye colour is categorical (nominal). Reaction time is numerical continuous and number of correct answers is numerical discrete. So just 1 is categorical.", []),
  ],
  multiPartPractice: [
    {
      id: "y7-dat-typ-mp1",
      prompt:
        "A high school of 480 students wants to investigate lunch-ordering habits. The principal records data on every student. For each part, classify or count as instructed.",
      latex: "\\text{School population} = 480 \\text{ students}",
      answer: "census",
      hint: "Recall the definitions of census/sample and the data-type categories, and count carefully.",
      explanation:
        "(a) Every one of the 480 students is recorded, so this is a census. (b) 'Number of lunch orders per week' is a count, so it is numerical discrete. (c) Coded responses Never=0, Sometimes=1, Often=2 are ordered labels, so the data is categorical ordinal. (d) From the list 2, 0, 3, 1, 2, 0, 2, the value 2 appears 3 times.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Because every student is recorded, is this study a census or a sample? Type 'census' or 'sample'.",
          marks: 1,
          answer: "census",
          acceptedAnswers: ["Census"],
          hint: "Was every member of the population included?",
          explanation: "All 480 students (the whole population) are recorded, so it is a census.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "The variable 'number of lunch orders placed per week' is classified as numerical. Type 'discrete' or 'continuous'.",
          marks: 1,
          answer: "discrete",
          acceptedAnswers: ["numerical discrete", "Discrete"],
          hint: "Is it counted or measured?",
          explanation: "A count of orders can only be a whole number, so it is numerical discrete.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Satisfaction is coded as Never=0, Sometimes=1, Often=2. Classify this categorical data: type 'nominal' or 'ordinal'.",
          marks: 1,
          answer: "ordinal",
          acceptedAnswers: ["categorical ordinal", "Ordinal"],
          hint: "Do the categories have a natural order?",
          explanation: "Never, Sometimes, Often have a natural order, so the data is categorical ordinal even though it is coded with numbers.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Seven students reported these weekly order counts: 2, 0, 3, 1, 2, 0, 2. How many reported exactly 2 orders?",
          latex: "\\text{Counts: }2, 0, 3, 1, 2, 0, 2",
          marks: 1,
          answer: "3",
          acceptedAnswers: [],
          hint: "Count how many times the value 2 appears.",
          explanation: "The value 2 appears at positions 1, 5, and 7 — a frequency of 3.",
        },
      ],
    },
  ],
};

// ─── Lesson 2: Frequency tables ──────────────────────────────────────────────

const frequencyTables: LessonContent = {
  description: "Record data in a frequency table using tally marks, calculate frequency and relative frequency, and construct grouped frequency tables with class intervals.",
  learningIntention: "Organise raw data into a frequency table and calculate frequency and relative frequency for each category or class.",
  successCriteria: [
    "Use tally marks to record data and count the frequency for each category.",
    "Calculate the relative frequency of each category as a fraction or decimal.",
    "Construct a grouped frequency table by choosing appropriate class intervals.",
    "Read and interpret a frequency table to answer questions about a dataset.",
  ],
  teaching: {
    paragraphs: [
      "A frequency table is a tool for turning a messy pile of raw answers into something you can actually read. If you ask 30 people their favourite fruit and just write the answers down in a row, the list tells you almost nothing at a glance. A frequency table fixes that by grouping the answers and counting how many landed in each group.",
      "Imagine the row of answers reads: apple, banana, apple, orange, apple, banana, apple, orange, banana. To make sense of it you go through once and keep a running count for each fruit: apple, apple, apple, apple is four; banana three; orange two. That count — how many times each value appears — is exactly what we call the **frequency**. The table just records each category beside its frequency.",
      "The **frequency** of a category is the count of how many data values fall in it, and that is all a frequency table really stores: a label and a count for each group. A key check falls straight out of this idea — because every data value is counted exactly once, the frequencies must add back up to the total number of values. If your column does not sum to the number of people you surveyed, you miscounted somewhere.",
      "**Tally marks** are just a counting trick for getting those frequencies right. As you read each answer you draw one stroke, and every fifth stroke goes diagonally across the previous four. Why fives? Because the eye can take in a bundle of five instantly without re-counting, so totalling 'three bundles and two extra = 17' is fast and error-proof — far safer than scanning a long row twice.",
      "**Relative frequency** answers a different question: not 'how many' but 'what share of the whole'. You get it by dividing a category's frequency by the total. If 6 of 20 students prefer soccer, the relative frequency is 6 ÷ 20 = 0.3, i.e. soccer is 30% of the class. This is useful because '6 students' means nothing until you know whether the class had 20 or 200 people — the relative frequency makes different-sized groups comparable. And since the parts must make up the whole, every relative frequency lies between 0 and 1, and they all add to exactly 1 (100%). That sum is your second built-in check.",
      "When the values are numbers spread across a wide range — say test marks from 41 to 99 — listing every single mark gives a giant, useless table. Instead you bundle them into **class intervals** like 40–49, 50–59, 60–69. An interval '10–19' means every value from 10 up to and including 19. The two rules that keep the table honest: the intervals must not overlap (otherwise a value could be counted twice), and together they must cover every value (otherwise some data has nowhere to go). The cost is that you can no longer see the exact values inside a class — so a grouped table can only *estimate* a statistic like the median, not give it exactly.",
    ],
    latexBlocks: [
      "\\text{Relative frequency} = \\frac{\\text{frequency of the category}}{\\text{total number of values}}",
      "\\sum \\text{frequency} = \\text{total number of data values} \\quad \\text{(first check)}",
      "0 \\le \\text{relative frequency} \\le 1, \\qquad \\sum \\text{relative frequency} = 1 \\quad \\text{(second check)}",
    ],
  },
  workedExamples: [
    {
      title: "Construct a frequency table and find relative frequency",
      questionLatex: "\\text{The favourite sports of 10 students are: Soccer, Tennis, Soccer, Swimming, Soccer, Tennis, Swimming, Soccer, Soccer, Tennis. Complete a frequency table.}",
      barChartDiagram: {
        description: "Column graph of favourite sport for 10 students: Soccer 5, Tennis 3, Swimming 2.",
        bars: [
          { label: "Soccer", value: 5, color: "blue" },
          { label: "Tennis", value: 3, color: "teal" },
          { label: "Swimming", value: 2, color: "violet" },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Sport",
        valueMax: 6,
        valueStep: 1,
      },
      steps: [
        { explanation: "Read through the list once, drawing a tally stroke for each sport, so you count each answer exactly once and never lose your place.", latex: "\\text{Soccer: } |||| = 5, \\quad \\text{Tennis: } ||| = 3, \\quad \\text{Swimming: } || = 2" },
        { explanation: "Write the tally counts as frequencies, then check they add to 10 — the number of students surveyed. They do, so no value was missed or double-counted.", latex: "5 + 3 + 2 = 10 \\checkmark" },
        { explanation: "Convert each frequency to a share of the whole by dividing by the total of 10, so the three sports can be compared as proportions.", latex: "\\text{Soccer: }\\frac{5}{10}=0.5,\\quad\\text{Tennis: }\\frac{3}{10}=0.3,\\quad\\text{Swimming: }\\frac{2}{10}=0.2" },
        { explanation: "Check the relative frequencies sum to 1 — they must, because the three shares make up the whole class.", latex: "0.5 + 0.3 + 0.2 = 1 \\checkmark" },
      ],
      finalAnswerLatex: "\\text{Relative frequencies: Soccer } 0.5,\\text{ Tennis } 0.3,\\text{ Swimming } 0.2",
    },
    {
      title: "Read a frequency table to find the mode and total",
      questionLatex: "\\text{A frequency table shows: Score 1 → freq 2, Score 2 → freq 5, Score 3 → freq 8, Score 4 → freq 3, Score 5 → freq 2. Find the mode and total.}",
      barChartDiagram: {
        description: "Column graph of scores: score 1 frequency 2, score 2 frequency 5, score 3 frequency 8, score 4 frequency 3, score 5 frequency 2.",
        bars: [
          { label: "1", value: 2 },
          { label: "2", value: 5 },
          { label: "3", value: 8 },
          { label: "4", value: 3 },
          { label: "5", value: 2 },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Score",
        valueMax: 8,
        valueStep: 1,
      },
      steps: [
        { explanation: "The mode is the most common value, which in a frequency table is simply the row with the largest frequency. Scan the frequency column for its biggest entry.", latex: "\\text{Largest frequency} = 8 \\rightarrow \\text{Mode} = 3" },
        { explanation: "Add every frequency to get the total number of data values, since each value was counted once.", latex: "2 + 5 + 8 + 3 + 2 = 20" },
      ],
      finalAnswerLatex: "\\text{Mode} = 3,\\quad \\text{Total} = 20",
    },
    {
      title: "Grouped table — find a missing frequency and the mean",
      questionLatex: "\\text{A frequency table of goals scored shows: 0 goals → 3, 1 goal → 7, 2 goals → x, 3 goals → 4, with 20 games in total. Find x, then the mean goals per game.}",
      steps: [
        { explanation: "Use the first check: all frequencies must add to the total of 20. Add the known frequencies first.", latex: "3 + 7 + 4 = 14" },
        { explanation: "Subtract from the total to find the missing frequency, since the four rows account for all 20 games.", latex: "x = 20 - 14 = 6" },
        { explanation: "To find the mean, the value '2 goals' happened in 6 games, so it contributes 2×6 goals — multiply each score by its frequency to get the total goals.", latex: "0(3) + 1(7) + 2(6) + 3(4) = 0 + 7 + 12 + 12 = 31" },
        { explanation: "Divide the total goals by the total number of games to get the average per game.", latex: "\\text{Mean} = \\frac{31}{20} = 1.55" },
      ],
      finalAnswerLatex: "x = 6,\\quad \\text{Mean} = 1.55 \\text{ goals per game}",
    },
  ],
  guidedPractice: [
    {
      ...choice(
        "y7-dat-ftb-g1",
        "A frequency table shows Cats: 4, Dogs: 7, Fish: 3, Birds: 6. What is the total number of pets recorded?",
        "C",
        ["17", "18", "20", "24"],
        "Add all frequencies: 4 + 7 + 3 + 6 = 20. The total is 20 pets."
      ),
      barChartDiagram: {
        description: "Column graph of pets: Cats 4, Dogs 7, Fish 3, Birds 6.",
        bars: [
          { label: "Cats", value: 4, color: "blue" },
          { label: "Dogs", value: 7, color: "teal" },
          { label: "Fish", value: 3, color: "violet" },
          { label: "Birds", value: 6, color: "amber" },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Pet",
        valueMax: 8,
        valueStep: 1,
      },
    },
    {
      ...answer(
        "y7-dat-ftb-g2",
        "A frequency table shows: Red: 6, Blue: 9, Green: 5. What is the relative frequency of Blue? Give your answer as a decimal.",
        "\\text{Relative frequency of Blue} = \\frac{9}{6+9+5}",
        "0.45",
        "Total = 6 + 9 + 5 = 20. Relative frequency of Blue = 9 ÷ 20 = 0.45.",
        ["9/20", ".45"]
      ),
      barChartDiagram: {
        description: "Column graph of colours: Red 6, Blue 9, Green 5.",
        bars: [
          { label: "Red", value: 6, color: "red" },
          { label: "Blue", value: 9, color: "blue" },
          { label: "Green", value: 5, color: "green" },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Colour",
        valueMax: 10,
        valueStep: 1,
      },
    },
    answer(
      "y7-dat-ftb-g3",
      "The data set is: 2, 3, 2, 4, 3, 2, 5, 3, 2, 4. How many times does the value 2 appear? Give the frequency of 2.",
      "\\text{Data: } 2, 3, 2, 4, 3, 2, 5, 3, 2, 4",
      "4",
      "Counting the 2s in the list: positions 1, 3, 6, 9 — a frequency of 4.",
      []
    ),
    answer(
      "y7-dat-ftb-g4",
      "A grouped frequency table has class intervals 0–9, 10–19, and 20–29. Which class interval does the value 15 belong to?",
      "\\text{Class intervals: } 0\\text{–}9,\\ 10\\text{–}19,\\ 20\\text{–}29",
      "10-19",
      "15 is between 10 and 19, so it belongs to the class interval 10–19.",
      ["10–19", "10 to 19", "10-19"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-dat-ftb-i1",
      "The number of hours of TV watched by 8 students in one week: 3, 5, 3, 7, 5, 3, 5, 7. What is the frequency of the value 5?",
      "\\text{Data: } 3, 5, 3, 7, 5, 3, 5, 7",
      "3",
      "The value 5 appears at positions 2, 5, and 7 in the list — a frequency of 3.",
      []
    ),
    {
      ...answer(
        "y7-dat-ftb-i2",
        "A frequency table shows test scores: 60–69 → 3 students, 70–79 → 8 students, 80–89 → 6 students, 90–99 → 3 students. How many students scored in the range 70–79?",
        "\\text{Frequency table of test scores}",
        "8",
        "The frequency for the 70–79 class interval is directly given in the table as 8 students.",
        []
      ),
      histogramDiagram: {
        description: "Histogram of test scores in classes of width 10: 60–69 frequency 3, 70–79 frequency 8, 80–89 frequency 6, 90–99 frequency 3.",
        bins: [
          { label: "60–69", frequency: 3 },
          { label: "70–79", frequency: 8 },
          { label: "80–89", frequency: 6 },
          { label: "90–99", frequency: 3 },
        ],
        axisLabel: "Test score",
        frequencyAxisLabel: "Frequency",
        valueMax: 8,
        valueStep: 1,
      },
    },
    {
      ...answer(
        "y7-dat-ftb-i3",
        "A frequency table shows: Walk → 12, Bus → 8, Car → 5. What is the relative frequency of students who walk? Give your answer as a decimal.",
        "\\text{Relative frequency of Walk} = \\frac{12}{12+8+5}",
        "0.48",
        "Total = 12 + 8 + 5 = 25. Relative frequency of Walk = 12 ÷ 25 = 0.48.",
        ["12/25", ".48"]
      ),
      barChartDiagram: {
        description: "Column graph of travel method: Walk 12, Bus 8, Car 5.",
        bars: [
          { label: "Walk", value: 12, color: "blue" },
          { label: "Bus", value: 8, color: "teal" },
          { label: "Car", value: 5, color: "violet" },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Travel method",
        valueMax: 14,
        valueStep: 2,
      },
    },
    answer(
      "y7-dat-ftb-i4",
      "A frequency table for daily step counts shows: 0–4999 → 4 days, 5000–9999 → 9 days, 10000–14999 → 2 days. What is the total number of days recorded?",
      "\\text{Total} = 4 + 9 + 2",
      "15",
      "Add all frequencies: 4 + 9 + 2 = 15 days total.",
      []
    ),
    {
      ...answer(
        "y7-dat-ftb-i5",
        "A frequency table shows pets owned: 0 pets → 5 students, 1 pet → 8 students, 2 pets → 4 students, 3 pets → 3 students. What is the relative frequency of students with 1 pet? Give your answer as a decimal.",
        "\\text{Relative frequency} = \\frac{8}{5+8+4+3}",
        "0.4",
        "Total = 5 + 8 + 4 + 3 = 20. Relative frequency = 8 ÷ 20 = 0.4.",
        ["8/20", "2/5", ".4"]
      ),
      barChartDiagram: {
        description: "Column graph of pets owned: 0 pets 5 students, 1 pet 8 students, 2 pets 4 students, 3 pets 3 students.",
        bars: [
          { label: "0", value: 5 },
          { label: "1", value: 8 },
          { label: "2", value: 4 },
          { label: "3", value: 3 },
        ],
        valueAxisLabel: "Number of students",
        categoryAxisLabel: "Pets owned",
        valueMax: 8,
        valueStep: 1,
      },
    },
  ],
  commonMistakes: [
    { mistake: "Forgetting to check that all frequencies add up to the total number of data values.", fix: "Always sum the frequency column at the end. If it doesn't equal the total count of data, you've made a tally error." },
    { mistake: "Dividing the wrong frequency by the total when calculating relative frequency.", fix: "The relative frequency of category X is always (frequency of X) ÷ (total of all frequencies)." },
    { mistake: "Placing a data value in the wrong class interval — for example, putting 20 into the 10–19 group.", fix: "Check carefully: 10–19 includes 10, 11, 12 … 19. The value 20 starts the next group (20–29)." },
    { mistake: "Expecting relative frequencies to sum to more than 1 because they're written as fractions.", fix: "All relative frequencies always sum to exactly 1 (or 100%). Use this to check your work." },
  ],
  masteryQuiz: [
    {
      ...answer(
        "y7-dat-ftb-m1",
        "A frequency table shows: Apple → 7, Banana → 5, Orange → 4, Mango → 4. How many pieces of fruit were recorded in total?",
        "\\text{Total} = 7 + 5 + 4 + 4",
        "20",
        "Add all frequencies: 7 + 5 + 4 + 4 = 20 pieces of fruit in total.",
        []
      ),
      barChartDiagram: {
        description: "Column graph of fruit: Apple 7, Banana 5, Orange 4, Mango 4.",
        bars: [
          { label: "Apple", value: 7, color: "red" },
          { label: "Banana", value: 5, color: "amber" },
          { label: "Orange", value: 4, color: "violet" },
          { label: "Mango", value: 4, color: "green" },
        ],
        valueAxisLabel: "Frequency",
        categoryAxisLabel: "Fruit",
        valueMax: 8,
        valueStep: 1,
      },
    },
    answer(
      "y7-dat-ftb-m2",
      "Using the fruit table above (Apple 7, Banana 5, Orange 4, Mango 4, total 20), what is the relative frequency of Apple? Give your answer as a decimal.",
      "\\text{Relative frequency of Apple} = \\frac{7}{20}",
      "0.35",
      "Relative frequency of Apple = 7 ÷ 20 = 0.35.",
      ["7/20", ".35"]
    ),
    choice(
      "y7-dat-ftb-m3",
      "A relative frequency table shows: Category A = 0.25, Category B = 0.40, Category C = ?. What is the relative frequency of Category C?",
      "B",
      ["0.25", "0.35", "0.40", "0.65"],
      "Relative frequencies must sum to 1. So Category C = 1 − 0.25 − 0.40 = 0.35."
    ),
    answer(
      "y7-dat-ftb-m4",
      "The dataset is: 4, 7, 4, 9, 4, 7, 7, 9, 4, 7, 4. What is the frequency of the mode?",
      "\\text{Data: }4, 7, 4, 9, 4, 7, 7, 9, 4, 7, 4",
      "5",
      "Count each value: 4 appears 5 times, 7 appears 4 times, 9 appears 2 times. The mode is 4, with a frequency of 5.",
      []
    ),
    {
      ...answer(
        "y7-dat-ftb-m5",
        "A frequency table shows test scores: 50–59 → 2, 60–69 → 6, 70–79 → 10, 80–89 → 7, 90–99 → 5. How many students scored 70 or above?",
        "\\text{Scores} \\geq 70: \\text{add frequencies for 70-79, 80-89, 90-99}",
        "22",
        "Add the frequencies for 70–79, 80–89, and 90–99: 10 + 7 + 5 = 22 students scored 70 or above.",
        []
      ),
      histogramDiagram: {
        description: "Histogram of test scores in classes of width 10: 50–59 frequency 2, 60–69 frequency 6, 70–79 frequency 10, 80–89 frequency 7, 90–99 frequency 5.",
        bins: [
          { label: "50–59", frequency: 2 },
          { label: "60–69", frequency: 6 },
          { label: "70–79", frequency: 10 },
          { label: "80–89", frequency: 7 },
          { label: "90–99", frequency: 5 },
        ],
        axisLabel: "Test score",
        frequencyAxisLabel: "Frequency",
        valueMax: 10,
        valueStep: 2,
      },
    },
    {
      ...answer(
        "y7-dat-ftb-m6",
        "A frequency table shows distances walked to school (km): 0–1 → 15 students, 1–2 → 9 students, 2–3 → 6 students. What is the relative frequency of students walking 2–3 km? Give your answer as a decimal.",
        "\\text{Relative frequency} = \\frac{6}{15+9+6}",
        "0.2",
        "Total = 15 + 9 + 6 = 30. Relative frequency = 6 ÷ 30 = 0.2.",
        ["6/30", "1/5", ".2"]
      ),
      histogramDiagram: {
        description: "Histogram of distance walked to school in classes of width 1 km: 0–1 km frequency 15, 1–2 km frequency 9, 2–3 km frequency 6.",
        bins: [
          { label: "0–1", frequency: 15 },
          { label: "1–2", frequency: 9 },
          { label: "2–3", frequency: 6 },
        ],
        axisLabel: "Distance (km)",
        frequencyAxisLabel: "Number of students",
        valueMax: 15,
        valueStep: 3,
      },
    },
    choice(
      "y7-dat-ftb-m7",
      "A student records the following data values: 11, 25, 18, 32, 14, 28, 19. Which class interval does 32 belong to if the intervals are 10–19, 20–29, and 30–39?",
      "C",
      ["10–19", "20–29", "30–39", "It doesn't belong to any interval"],
      "32 is between 30 and 39, so it belongs to the class interval 30–39."
    ),
    {
      ...answer(
        "y7-dat-ftb-m8",
        "A frequency table shows hours of sleep: 6 hrs → 3 students, 7 hrs → 9 students, 8 hrs → 12 students, 9 hrs → 6 students. What fraction of students slept exactly 8 hours? Give your answer as a decimal.",
        "\\text{Relative frequency} = \\frac{12}{3+9+12+6}",
        "0.4",
        "Total = 3 + 9 + 12 + 6 = 30. Relative frequency of 8 hrs = 12 ÷ 30 = 0.4.",
        ["12/30", "2/5", ".4"]
      ),
      barChartDiagram: {
        description: "Column graph of hours of sleep: 6 hrs 3 students, 7 hrs 9 students, 8 hrs 12 students, 9 hrs 6 students.",
        bars: [
          { label: "6", value: 3 },
          { label: "7", value: 9 },
          { label: "8", value: 12 },
          { label: "9", value: 6 },
        ],
        valueAxisLabel: "Number of students",
        categoryAxisLabel: "Hours of sleep",
        valueMax: 12,
        valueStep: 2,
      },
    },
    answer(
      "y7-dat-ftb-m9",
      "The data shows the number of pets owned: 0, 1, 2, 0, 3, 1, 0, 2, 1, 0, 1, 2. How many students own at least 2 pets?",
      "\\text{Data: }0, 1, 2, 0, 3, 1, 0, 2, 1, 0, 1, 2",
      "4",
      "Values of 2 or more: 2, 3, 2, 2 — that is 4 values. So 4 students own at least 2 pets.",
      []
    ),
    choice(
      "y7-dat-ftb-m10",
      "A student says: 'The relative frequency of a category can be greater than 1 if that category has a very high frequency.' Is the student correct?",
      "D",
      [
        "Yes — relative frequency can exceed 1 for the most common category.",
        "Yes — if one category has more than half the data, its relative frequency exceeds 1.",
        "No — but relative frequencies can sum to more than 1.",
        "No — relative frequency is always between 0 and 1, and all relative frequencies sum to exactly 1.",
      ],
      "Relative frequency = frequency ÷ total. Since frequency ≤ total, the result is always between 0 and 1. All relative frequencies sum to exactly 1."
    ),
  ],
  masteryQuizPool: [
    { ...pAns("y7-dat-ftb-p1", "A frequency table shows Red 5, Blue 8, Green 7. What is the total frequency?", "\\text{Total} = 5 + 8 + 7", 1, "20", "Add all frequencies: 5 + 8 + 7 = 20.", []), barChartDiagram: { description: "Column graph of colours: Red 5, Blue 8, Green 7.", bars: [{ label: "Red", value: 5, color: "red" }, { label: "Blue", value: 8, color: "blue" }, { label: "Green", value: 7, color: "green" }], valueAxisLabel: "Frequency", categoryAxisLabel: "Colour", valueMax: 8, valueStep: 1 } },
    pAns("y7-dat-ftb-p2", "The data set is 3, 5, 3, 3, 5, 7, 3. What is the frequency of 3?", "\\text{Data: }3, 5, 3, 3, 5, 7, 3", 1, "4", "Count the 3s: positions 1, 3, 4, 7 — frequency 4.", []),
    { ...pAns("y7-dat-ftb-p3", "A frequency table shows A 10, B 6, C 4. What is the relative frequency of B? Give your answer as a decimal.", "\\frac{6}{10+6+4}", 1, "0.3", "Total = 20. Relative frequency of B = 6 ÷ 20 = 0.3.", ["6/20", "3/10", ".3"]), barChartDiagram: { description: "Column graph of categories: A 10, B 6, C 4.", bars: [{ label: "A", value: 10 }, { label: "B", value: 6 }, { label: "C", value: 4 }], valueAxisLabel: "Frequency", categoryAxisLabel: "Category", valueMax: 10, valueStep: 1 } },
    pChoice("y7-dat-ftb-p4", "In a grouped frequency table with intervals 0–9, 10–19, 20–29, which interval contains 19?", 1, "B", ["0–9", "10–19", "20–29", "None"], "19 lies between 10 and 19, so it belongs to the interval 10–19."),
    pAns("y7-dat-ftb-p5", "A frequency table shows Mon 12, Tue 8, Wed 15, Thu 10, Fri 5. How many values are recorded in total?", "12 + 8 + 15 + 10 + 5", 2, "50", "Add all frequencies: 12 + 8 + 15 + 10 + 5 = 50.", []),
    pAns("y7-dat-ftb-p6", "The dataset is 6, 9, 6, 6, 9, 9, 9, 6. What value is the mode?", "\\text{Data: }6, 9, 6, 6, 9, 9, 9, 6", 2, "9", "6 appears 4 times and 9 appears 4 times — both are modes; list 9? Actually count again: 6 at 1,3,4,8 (4 times); 9 at 2,5,6,7 (4 times). They tie, so report either mode; we record 9.", ["6", "6 and 9"]),
    { ...pAns("y7-dat-ftb-p7", "A frequency table shows scores 0–4 → 6, 5–9 → 11, 10–14 → 3. What is the relative frequency of the 5–9 class? Give your answer as a decimal.", "\\frac{11}{6+11+3}", 2, "0.55", "Total = 20. Relative frequency = 11 ÷ 20 = 0.55.", ["11/20", ".55"]), histogramDiagram: { description: "Histogram of scores in classes of width 5: 0–4 frequency 6, 5–9 frequency 11, 10–14 frequency 3.", bins: [{ label: "0–4", frequency: 6 }, { label: "5–9", frequency: 11 }, { label: "10–14", frequency: 3 }], axisLabel: "Score", frequencyAxisLabel: "Frequency", valueMax: 11, valueStep: 1 } },
    pAns("y7-dat-ftb-p8", "A frequency table shows 0 goals → 4, 1 goal → 7, 2 goals → 6, 3 goals → 3. How many games had at least 2 goals?", "\\text{At least 2 goals: }6 + 3", 2, "9", "Add the frequencies for 2 and 3 goals: 6 + 3 = 9 games.", []),
    pChoice("y7-dat-ftb-p9", "A relative-frequency table shows P = 0.30, Q = 0.45, R = ?. What is R?", 3, "A", ["0.25", "0.30", "0.15", "0.75"], "Relative frequencies sum to 1, so R = 1 − 0.30 − 0.45 = 0.25."),
    pAns("y7-dat-ftb-p10", "A frequency table shows test bands 40–49 → 2, 50–59 → 5, 60–69 → 9, 70–79 → 8, 80–89 → 6. How many students scored below 60?", "\\text{Below 60: }2 + 5", 3, "7", "Add the frequencies for 40–49 and 50–59: 2 + 5 = 7 students.", []),
    pAns("y7-dat-ftb-p11", "A class of 25 students records 0 pets → 8, 1 pet → 10, 2 pets → 5, 3 pets → 2. What is the relative frequency of students with 2 pets? Give your answer as a decimal.", "\\frac{5}{25}", 3, "0.2", "Total = 25. Relative frequency = 5 ÷ 25 = 0.2.", ["5/25", "1/5", ".2"]),
    pAns("y7-dat-ftb-p12", "The dataset is 12, 14, 12, 18, 14, 12, 20, 12. Using class intervals 10–14 and 15–20, how many values fall in 10–14?", "\\text{Data: }12, 14, 12, 18, 14, 12, 20, 12", 3, "6", "Values in 10–14: 12, 14, 12, 14, 12, 12 — that is 6 values. (18 and 20 fall in 15–20.)", []),
    pChoice("y7-dat-ftb-p13", "A tally for one category is recorded as three groups of five strokes plus two extra strokes. What is the frequency?", 3, "C", ["15", "16", "17", "18"], "Three groups of five give 15, plus 2 more = 17."),
    { ...pAns("y7-dat-ftb-p14", "A frequency table shows colours Red 9, Blue 6, Green 5. What is the relative frequency of Red expressed as a percentage? Give a whole number.", "\\frac{9}{20} \\times 100", 3, "45", "Total = 20. Red = 9 ÷ 20 = 0.45 = 45%.", ["45%"]), barChartDiagram: { description: "Column graph of colours: Red 9, Blue 6, Green 5.", bars: [{ label: "Red", value: 9, color: "red" }, { label: "Blue", value: 6, color: "blue" }, { label: "Green", value: 5, color: "green" }], valueAxisLabel: "Frequency", categoryAxisLabel: "Colour", valueMax: 10, valueStep: 1 } },
    { ...pAns("y7-dat-ftb-p15", "A grouped table of ages shows 10–19 → 7, 20–29 → 12, 30–39 → 9, 40–49 → 2. What is the modal class? Give the class with the most values as a range, e.g. 20-29.", "\\text{Frequencies: }7, 12, 9, 2", 3, "20-29", "The class with the highest frequency (12) is 20–29, the modal class.", ["20–29", "20 to 29"]), histogramDiagram: { description: "Histogram of ages in classes of width 10: 10–19 frequency 7, 20–29 frequency 12, 30–39 frequency 9, 40–49 frequency 2.", bins: [{ label: "10–19", frequency: 7 }, { label: "20–29", frequency: 12 }, { label: "30–39", frequency: 9 }, { label: "40–49", frequency: 2 }], axisLabel: "Age", frequencyAxisLabel: "Frequency", valueMax: 12, valueStep: 2 } },
    pAns("y7-dat-ftb-p16", "A survey of 80 people records relative frequencies: walk 0.35, bus 0.25, car 0.40. How many people travelled by car?", "0.40 \\times 80", 4, "32", "Number by car = relative frequency × total = 0.40 × 80 = 32 people.", []),
    pAns("y7-dat-ftb-p17", "A frequency table shows 1 → 4, 2 → 6, 3 → x, 4 → 5 with a total of 20 values. Find x.", "4 + 6 + x + 5 = 20", 4, "5", "4 + 6 + 5 = 15, so x = 20 − 15 = 5.", []),
    pAns("y7-dat-ftb-p18", "A frequency table shows scores 0 → 3, 1 → 7, 2 → 6, 3 → 4. What is the mean score? Give your answer as a decimal.", "\\frac{0(3)+1(7)+2(6)+3(4)}{3+7+6+4}", 4, "1.55", "Sum of values = 0×3 + 1×7 + 2×6 + 3×4 = 0 + 7 + 12 + 12 = 31. Total count = 20. Mean = 31 ÷ 20 = 1.55.", ["1.55"]),
    pChoice("y7-dat-ftb-p19", "Which statement about a grouped frequency table is correct?", 4, "B", ["Class intervals may overlap", "Class intervals must not overlap and should cover all data", "Each interval must contain the same frequency", "The intervals can be any unequal sizes"], "Good class intervals are non-overlapping and together cover all the data; this is the key requirement."),
    pAns("y7-dat-ftb-p20", "A relative-frequency table shows W 0.2, X 0.3, Y 0.15, Z = ?. There are 40 data values. How many values are in category Z?", "Z = 1 - 0.2 - 0.3 - 0.15", 4, "14", "Z = 1 − 0.65 = 0.35. Count = 0.35 × 40 = 14 values.", []),
    pAns("y7-dat-ftb-p21", "A frequency table shows 60–69 → 4, 70–79 → 9, 80–89 → 7. What percentage of students scored in the 70–79 band? Give your answer as a whole number.", "\\frac{9}{4+9+7} \\times 100", 5, "45", "Total = 20. 9 ÷ 20 = 0.45 = 45%.", ["45%"]),
    pAns("y7-dat-ftb-p22", "Two frequency tables are combined. Table 1: A 6, B 4. Table 2: A 9, B 11. In the combined table, what is the relative frequency of A? Give your answer as a decimal.", "\\frac{6+9}{6+4+9+11}", 5, "0.5", "Combined A = 6 + 9 = 15; total = 30. Relative frequency = 15 ÷ 30 = 0.5.", ["15/30", "1/2", ".5"]),
    pAns("y7-dat-ftb-p23", "A frequency table shows 1 → 2, 2 → 5, 3 → 8, 4 → 5. Find the median of all the data values.", "\\text{Total} = 2 + 5 + 8 + 5 = 20", 5, "3", "There are 20 values; the median is the average of the 10th and 11th. Cumulative: up to value 1 → 2, up to 2 → 7, up to 3 → 15. So the 10th and 11th values are both 3. Median = 3.", []),
    pChoice("y7-dat-ftb-p24", "A frequency table records exam marks as ranges, but a teacher wants the exact median mark. Why can a grouped frequency table only estimate the median?", 5, "D", ["Because grouped tables have no total", "Because relative frequencies are used", "Because the mode is unknown", "Because individual values inside each class interval are not recorded"], "Grouping hides the exact values within each class interval, so the precise median cannot be read directly — only estimated."),
    pAns("y7-dat-ftb-p25", "A frequency table shows 0 → 5, 1 → 8, 2 → 4, 3 → 3. A student claims the relative frequency of 1 is exactly half. Is the student correct? Type 'yes' or 'no'.", "\\frac{8}{5+8+4+3}", 5, "no", "Total = 20. Relative frequency of 1 = 8 ÷ 20 = 0.4, which is not 0.5, so the student is incorrect.", ["No"]),
  ],
  multiPartPractice: [
    {
      id: "y7-dat-ftb-mp1",
      prompt:
        "A canteen records the drink chosen by each of 40 students: Water 14, Juice 10, Milk 6, Soft drink 10. Use this frequency table to answer the parts.",
      latex: "\\text{Water }14,\\ \\text{Juice }10,\\ \\text{Milk }6,\\ \\text{Soft drink }10",
      barChartDiagram: {
        description: "Column graph of drink chosen by 40 students: Water 14, Juice 10, Milk 6, Soft drink 10.",
        bars: [
          { label: "Water", value: 14, color: "blue" },
          { label: "Juice", value: 10, color: "amber" },
          { label: "Milk", value: 6, color: "teal" },
          { label: "Soft drink", value: 10, color: "violet" },
        ],
        valueAxisLabel: "Number of students",
        categoryAxisLabel: "Drink",
        valueMax: 16,
        valueStep: 2,
      },
      answer: "40",
      hint: "Use total = sum of frequencies, and relative frequency = frequency ÷ total.",
      explanation:
        "(a) Total = 14 + 10 + 6 + 10 = 40. (b) Relative frequency of Water = 14 ÷ 40 = 0.35. (c) Water has the highest frequency (14), so it is the modal choice. (d) Students choosing Juice or Soft drink = 10 + 10 = 20.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many students were surveyed in total?",
          marks: 1,
          answer: "40",
          acceptedAnswers: [],
          hint: "Add all four frequencies.",
          explanation: "14 + 10 + 6 + 10 = 40 students.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the relative frequency of students who chose Water? Give your answer as a decimal.",
          latex: "\\frac{14}{40}",
          marks: 1,
          answer: "0.35",
          acceptedAnswers: ["14/40", "7/20", ".35"],
          hint: "Divide the Water frequency by the total.",
          explanation: "14 ÷ 40 = 0.35.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Which drink is the modal choice? Type the drink name.",
          marks: 1,
          answer: "Water",
          acceptedAnswers: ["water"],
          hint: "The mode is the category with the highest frequency.",
          explanation: "Water has the highest frequency (14), so it is the modal choice.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "How many students chose either Juice or Soft drink?",
          marks: 1,
          answer: "20",
          acceptedAnswers: [],
          hint: "Add the Juice and Soft drink frequencies.",
          explanation: "10 + 10 = 20 students chose Juice or Soft drink.",
        },
      ],
    },
  ],
};

// ─── Lesson 3: Dot plots and stem-and-leaf plots ──────────────────────────────

const dotPlotsStemAndLeaf: LessonContent = {
  description: "Construct and read dot plots and stem-and-leaf plots for small numerical datasets, and find mode, median, and range from these displays.",
  learningIntention: "Represent numerical data in a dot plot or stem-and-leaf plot and use the display to find the mode, median, and range.",
  successCriteria: [
    "Construct a dot plot by placing dots above a number line, one dot per data value.",
    "Construct a stem-and-leaf plot by splitting each value into a stem and a leaf.",
    "Find the mode, median, and range from a stem-and-leaf plot.",
    "Read a back-to-back stem-and-leaf plot to compare two datasets.",
  ],
  teaching: {
    paragraphs: [
      "A dot plot and a stem-and-leaf plot are two ways to *draw* a small set of numbers so the data's shape jumps out at you. A bare list like 12, 24, 13, 24, 15, 21, 28 is hard to read; the same numbers turned into a picture instantly show you where they bunch up and which one repeats.",
      "Start with the **dot plot**. Draw a number line, then stack one dot above each value — one dot per occurrence. Say goals per game were 0, 1, 1, 2, 2, 2, 2, 3, 3, 4. Above 2 you would stack four dots, above 1 and 3 two dots each, and single dots above 0 and 4. The tallest stack sits over 2, so you can *see* that 2 is the most common score without counting anything. Stacking is the whole trick: height equals how often a value occurred, so a repeated value literally grows taller.",
      "A **stem-and-leaf plot** handles slightly bigger numbers by splitting each value into a **stem** (the leading digits) and a **leaf** (the last digit). The number 37 splits into stem 3 and leaf 7. You list the stems down a column and write each value's leaf beside its stem. So 12, 13, 15, 21, 24, 24, 28, 30, 36 becomes the row `1 | 2 3 5`, then `2 | 1 4 4 8`, then `3 | 0 6`. Why does this work as a picture? Because the longer a row of leaves is, the more values share those tens — the rows act like sideways bars, yet unlike a bar chart every individual value is still written down and readable.",
      "Because both plots keep every value, reading statistics off them is direct. The **mode** is the value that appears most — the tallest dot stack, or a leaf repeated on the same stem (the `4 4` on stem 2 means 24 occurred twice). The **range** is just the largest value minus the smallest, which you read off the two ends. The **median** is the middle value once the data is in order — and a stem-and-leaf plot is *already* in order, which is exactly why it makes the median easy.",
      "To find the median you locate the middle of n sorted values using position (n+1)/2. With 9 values that is the 5th value; with an even count like 8 values, (n+1)/2 = 4.5 tells you to average the 4th and 5th. The reason you must count *leaves*, not stems, is that each leaf is one data value while a stem may carry many — counting stems would badly undercount n.",
      "A **back-to-back stem-and-leaf plot** compares two groups by sharing one stem column down the middle, with one group's leaves growing left and the other's growing right. The one thing students get wrong: the left side is read *from the stem outward*. On stem 4 with left leaves written `8 5 2` nearest-to-furthest from the stem, the values are 42, 45, 48 — the digit closest to the stem is always the units digit, on both sides. Read it that way and comparing the two groups' centres and spreads becomes straightforward.",
    ],
    latexBlocks: [
      "\\text{Median position} = \\frac{n+1}{2}\\text{ (the } n \\text{ values must be sorted first)}",
      "\\text{Range} = \\text{maximum value} - \\text{minimum value}",
      "\\text{Mode} = \\text{value that appears most often (tallest stack / repeated leaf)}",
      "\\text{Count leaves, not stems, to find } n \\text{ — each leaf is one value.}",
    ],
  },
  workedExamples: [
    {
      title: "Find mode, median, and range from a stem-and-leaf plot",
      questionLatex: "\\text{The stem-and-leaf plot shows: } 1 | 2\\;3\\;5,\\quad 2 | 1\\;4\\;4\\;8,\\quad 3 | 0\\;6. \\text{ Find the mode, median, and range.}",
      stemAndLeafDiagram: {
        description: "Stem-and-leaf plot of 9 values from 12 to 36: stem 1 leaves 2 3 5, stem 2 leaves 1 4 4 8, stem 3 leaves 0 6.",
        keyText: "2 | 4 = 24",
        rows: [
          { stem: 1, leaves: [2, 3, 5] },
          { stem: 2, leaves: [1, 4, 4, 8] },
          { stem: 3, leaves: [0, 6] },
        ],
      },
      steps: [
        { explanation: "List all values in order by reading the plot: 12, 13, 15, 21, 24, 24, 28, 30, 36.", latex: "12,\\;13,\\;15,\\;21,\\;24,\\;24,\\;28,\\;30,\\;36" },
        { explanation: "Mode: the value that appears most often. The leaf 4 appears twice on the 2 stem, giving the value 24 twice — no other value repeats.", latex: "\\text{Mode} = 24" },
        { explanation: "Median: there are 9 values, so the median is the 5th value when sorted. Count to the 5th: 12, 13, 15, 21, 24.", latex: "\\text{Median} = 24" },
        { explanation: "Range: subtract the smallest value from the largest.", latex: "\\text{Range} = 36 - 12 = 24" },
      ],
      finalAnswerLatex: "\\text{Mode} = 24,\\quad \\text{Median} = 24,\\quad \\text{Range} = 24",
    },
    {
      title: "Construct a dot plot",
      questionLatex: "\\text{The number of goals scored per game: } 0, 2, 1, 3, 2, 2, 4, 1, 2, 3. \\text{ Describe the dot plot.}",
      dotPlotDiagram: {
        description: "Dot plot of goals per game from 0 to 4: 1 dot at 0, 2 dots at 1, 4 dots at 2, 2 dots at 3, 1 dot at 4.",
        min: 0,
        max: 4,
        counts: [
          { value: 0, count: 1 },
          { value: 1, count: 2 },
          { value: 2, count: 4 },
          { value: 3, count: 2 },
          { value: 4, count: 1 },
        ],
        axisLabel: "Goals per game",
      },
      steps: [
        { explanation: "Sort the values first so equal values sit together and the stacks are easy to build.", latex: "0,\\;1,\\;1,\\;2,\\;2,\\;2,\\;2,\\;3,\\;3,\\;4" },
        { explanation: "Draw a number line from 0 to 4 and place one dot above a value for each time it occurs, so the height of each stack equals that value's frequency.", latex: "0\\!:\\!1,\\ 1\\!:\\!2,\\ 2\\!:\\!4,\\ 3\\!:\\!2,\\ 4\\!:\\!1 \\text{ dots}" },
        { explanation: "Read the mode off the picture: the tallest stack sits over 2 (four dots), so 2 is the most common score.", latex: "\\text{Value 2 has 4 dots (highest stack)} \\rightarrow \\text{mode} = 2" },
      ],
      finalAnswerLatex: "\\text{Mode} = 2 \\text{ (4 dots — the tallest stack)}",
    },
    {
      title: "Compare two groups on a back-to-back stem-and-leaf plot",
      questionLatex: "\\text{Two classes sat the same test. Class A (left) and Class B (right) share these stems: } 5 \\mid \\text{A: } 8\\,6\\,2 \\mid \\text{B: } 1\\,4 \\;;\\; 6 \\mid \\text{A: } 5\\,0 \\mid \\text{B: } 3\\,7\\,9 \\;;\\; 7 \\mid \\text{A: } 1 \\mid \\text{B: } 2\\,5. \\text{ Find each class's median and say which class did better.}",
      steps: [
        { explanation: "Read Class A's leaves from the stem outward, so the digit nearest the stem is the units digit, and list the values in order.", latex: "\\text{Class A: } 52, 56, 58, 60, 65, 71" },
        { explanation: "Read Class B's leaves the normal way (left to right on the right side), again giving units nearest the stem.", latex: "\\text{Class B: } 51, 54, 63, 67, 69, 72, 75" },
        { explanation: "Class A has 6 values, so the median is the average of the 3rd and 4th values — count to them in the ordered list.", latex: "\\text{A median} = \\frac{58 + 60}{2} = 59" },
        { explanation: "Class B has 7 values, so the median is the 4th value (position (7+1)/2 = 4).", latex: "\\text{B median} = 67" },
        { explanation: "Compare the two medians: the higher median marks the class with the better typical score.", latex: "67 > 59" },
      ],
      finalAnswerLatex: "\\text{Class A median } 59, \\text{ Class B median } 67 \\Rightarrow \\text{Class B did better on the test.}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-dat-dot-g1",
      "A stem-and-leaf plot shows: 1 | 3 5 8, 2 | 0 4, 3 | 2. What is the largest value in the dataset?",
      "C",
      ["25", "28", "32", "38"],
      "The largest value uses the highest stem (3) and the only leaf on that row (2), giving 32."
    ),
    answer(
      "y7-dat-dot-g2",
      "A stem-and-leaf plot shows: 0 | 3 5, 1 | 2 2 7, 2 | 4 8. How many data values are in this dataset?",
      "\\text{Count all leaves: }2 + 3 + 2",
      "7",
      "Count all leaves across every stem row: 2 leaves on stem 0, 3 leaves on stem 1, 2 leaves on stem 2. Total = 7 data values.",
      []
    ),
    answer(
      "y7-dat-dot-g3",
      "The dataset is: 14, 22, 14, 31, 22, 14, 22, 19. What is the mode?",
      "\\text{Data: }14, 22, 14, 31, 22, 14, 22, 19",
      "14",
      "Count each value: 14 appears 3 times, 22 appears 3 times, 19 once, 31 once. Wait — 14 and 22 both appear 3 times. The mode is 14 (listing the smallest when tied is conventional, though both are modes).",
      ["22", "14 and 22"]
    ),
    answer(
      "y7-dat-dot-g4",
      "A stem-and-leaf plot shows: 2 | 1 3 7, 3 | 0 5 9, 4 | 2. Find the range.",
      "\\text{Smallest} = 21,\\quad \\text{Largest} = 42",
      "21",
      "Smallest value: stem 2, leaf 1 = 21. Largest value: stem 4, leaf 2 = 42. Range = 42 − 21 = 21.",
      []
    ),
  ],
  independentPractice: [
    answer(
      "y7-dat-dot-i1",
      "The dataset is: 5, 8, 5, 6, 9, 5, 8, 7, 6, 8. What is the range?",
      "\\text{Data: }5, 8, 5, 6, 9, 5, 8, 7, 6, 8",
      "4",
      "Largest value = 9, smallest value = 5. Range = 9 − 5 = 4.",
      []
    ),
    answer(
      "y7-dat-dot-i2",
      "A stem-and-leaf plot shows: 1 | 4 6 9, 2 | 0 3 3 8, 3 | 1 5. What is the median of this 9-value dataset?",
      "\\text{Values in order: }14, 16, 19, 20, 23, 23, 28, 31, 35",
      "23",
      "There are 9 values. The median is the 5th value. In order: 14, 16, 19, 20, 23, 23, 28, 31, 35. The 5th value is 23.",
      []
    ),
    answer(
      "y7-dat-dot-i3",
      "A dot plot shows test scores: one dot at 6, three dots at 7, four dots at 8, two dots at 9, one dot at 10. What score is the mode?",
      "\\text{Dot plot: }6\\times1,\\ 7\\times3,\\ 8\\times4,\\ 9\\times2,\\ 10\\times1",
      "8",
      "The mode is the score with the most dots. Score 8 has 4 dots — the highest stack. Mode = 8.",
      []
    ),
    answer(
      "y7-dat-dot-i4",
      "A stem-and-leaf plot shows: 3 | 2 4 8, 4 | 1 1 5 7, 5 | 0 3. There are 9 values. What is the median?",
      "\\text{Values in order: }32, 34, 38, 41, 41, 45, 47, 50, 53",
      "41",
      "The 9 values in order: 32, 34, 38, 41, 41, 45, 47, 50, 53. The median is the 5th value = 41.",
      []
    ),
    choice(
      "y7-dat-dot-i5",
      "A back-to-back stem-and-leaf plot has the stem 4 in the middle. Group A shows leaves 3 1 on the left. Group B shows leaves 2 8 on the right. Which group has the larger maximum value?",
      "B",
      ["Group A, because its largest leaf is 3", "Group B, because its largest leaf is 8", "Both groups have the same maximum", "Cannot be determined without more information"],
      "Group B: leaves on the right of stem 4 give 42 and 48. The largest in Group B is 48. Group A leaves read right-to-left: 41 and 43. The largest in Group A is 43. Group B has the larger maximum (48 > 43)."
    ),
  ],
  commonMistakes: [
    { mistake: "Reading a back-to-back stem-and-leaf plot incorrectly — reading the left side from left to right instead of from the stem outward.", fix: "For the left group, read leaves from the stem column outward to the left. The leaf nearest the stem is the units digit." },
    { mistake: "Forgetting to sort the leaves on each stem row, making the median hard to find.", fix: "Always write leaves in ascending order on each stem row so the display is easy to read and the median straightforward to locate." },
    { mistake: "Counting the total number of stems instead of the total number of leaves when finding the median position.", fix: "Each leaf represents one data value. Count all leaves to find n, then find the middle leaf." },
    { mistake: "Confusing range with interquartile range — calculating max minus min is correct for range.", fix: "Range = maximum − minimum. Nothing more complicated is needed at Year 7 level." },
  ],
  masteryQuiz: [
    answer(
      "y7-dat-dot-m1",
      "A stem-and-leaf plot shows: 0 | 5 8, 1 | 2 4 4 9, 2 | 0 3 7. Find the range.",
      "\\text{Smallest} = 05 = 5,\\quad \\text{Largest} = 27",
      "22",
      "Smallest value: stem 0, leaf 5 = 5. Largest value: stem 2, leaf 7 = 27. Range = 27 − 5 = 22.",
      []
    ),
    answer(
      "y7-dat-dot-m2",
      "A stem-and-leaf plot shows: 0 | 5 8, 1 | 2 4 4 9, 2 | 0 3 7. There are 9 values. Find the median.",
      "\\text{Values in order: }5, 8, 12, 14, 14, 19, 20, 23, 27",
      "14",
      "The 9 values in order: 5, 8, 12, 14, 14, 19, 20, 23, 27. The median is the 5th value = 14.",
      []
    ),
    choice(
      "y7-dat-dot-m3",
      "A dot plot shows daily steps: 6 dots at 7000, 3 dots at 8000, 4 dots at 9000, 2 dots at 10000. What is the mode?",
      "A",
      ["7000", "8000", "9000", "10000"],
      "The mode is the value with the most dots. 7000 has 6 dots — the highest count. Mode = 7000."
    ),
    answer(
      "y7-dat-dot-m4",
      "The dataset is: 23, 31, 23, 45, 31, 23, 37, 31, 45. What is the mode?",
      "\\text{Data: }23, 31, 23, 45, 31, 23, 37, 31, 45",
      "23",
      "Count each value: 23 appears 3 times, 31 appears 3 times, 45 appears 2 times, 37 once. Both 23 and 31 are modes, but 23 is the smaller — list 23 as primary mode.",
      ["31", "23 and 31"]
    ),
    answer(
      "y7-dat-dot-m5",
      "A stem-and-leaf plot shows: 1 | 0 3 5 7 9, 2 | 2 4 6, 3 | 1 4 8. Find the median of these 11 values.",
      "\\text{Values in order: }10, 13, 15, 17, 19, 22, 24, 26, 31, 34, 38",
      "22",
      "There are 11 values. The median is the 6th value. In order: 10, 13, 15, 17, 19, 22, 24, 26, 31, 34, 38. The 6th value is 22.",
      []
    ),
    answer(
      "y7-dat-dot-m6",
      "A dot plot shows goals per game: 0 goals (2 dots), 1 goal (3 dots), 2 goals (5 dots), 3 goals (2 dots), 4 goals (1 dot). How many games were played in total?",
      "\\text{Total dots} = 2 + 3 + 5 + 2 + 1",
      "13",
      "Add the number of dots: 2 + 3 + 5 + 2 + 1 = 13 games in total.",
      []
    ),
    choice(
      "y7-dat-dot-m7",
      "A stem-and-leaf plot with 8 values has these values in order: 11, 14, 18, 21, 25, 29, 33, 37. What is the median?",
      "B",
      ["21", "23", "25", "29"],
      "With 8 values, the median is the average of the 4th and 5th values: (21 + 25) ÷ 2 = 46 ÷ 2 = 23."
    ),
    answer(
      "y7-dat-dot-m8",
      "A stem-and-leaf plot shows: 4 | 2 5 9, 5 | 0 0 3 7, 6 | 1 4. Find the mode.",
      "\\text{Stem-and-leaf: }4|2\\;5\\;9,\\;5|0\\;0\\;3\\;7,\\;6|1\\;4",
      "50",
      "Check each stem row for repeated leaves. On stem 5, leaf 0 appears twice giving the value 50. No other value repeats. Mode = 50.",
      []
    ),
    answer(
      "y7-dat-dot-m9",
      "A back-to-back stem-and-leaf plot has stem 3 in the middle. Group A (left): leaves 8 5 2. Group B (right): leaves 1 4 9. What is the range of Group A?",
      "\\text{Group A values: }32, 35, 38",
      "6",
      "Group A leaves read from stem outward: 32, 35, 38. Range = 38 − 32 = 6.",
      []
    ),
    answer(
      "y7-dat-dot-m10",
      "A stem-and-leaf plot shows test results: 5 | 3 6 8, 6 | 0 2 2 5 9, 7 | 1 4 7. There are 11 values. What percentage of students scored 70 or above? Give your answer as a whole number.",
      "\\text{Values} \\geq 70: \\text{stem 7 has 3 leaves}",
      "27",
      "Stem 7 has leaves 1, 4, 7 — that is 3 students who scored 70 or above. Percentage = 3 ÷ 11 × 100 ≈ 27.27%, which rounds to 27%.",
      ["27%", "27.3", "27.27"]
    ),
  ],
  masteryQuizPool: [
    pAns("y7-dat-dot-p1", "A dot plot has 2 dots at 3, 4 dots at 4, 1 dot at 5. How many data values are there in total?", "\\text{Dots: }3\\times2,\\ 4\\times4,\\ 5\\times1", 1, "7", "Add the dots: 2 + 4 + 1 = 7 values.", []),
    pAns("y7-dat-dot-p2", "A stem-and-leaf plot shows 1 | 2 5, 2 | 3. What is the largest value?", "1|2\\;5,\\ 2|3", 1, "23", "The largest value is stem 2 with leaf 3 = 23.", []),
    pAns("y7-dat-dot-p3", "The dataset is 5, 8, 5, 9, 5, 6. What is the mode?", "\\text{Data: }5, 8, 5, 9, 5, 6", 1, "5", "5 appears 3 times, more than any other value, so the mode is 5.", []),
    pAns("y7-dat-dot-p4", "A stem-and-leaf plot shows 2 | 1 4, 3 | 0 6. Find the range.", "\\text{Smallest }21,\\ \\text{largest }36", 1, "15", "Smallest = 21, largest = 36. Range = 36 − 21 = 15.", []),
    pAns("y7-dat-dot-p5", "A dot plot has 1 dot at 10, 3 dots at 11, 2 dots at 12. What is the mode?", "\\text{Dots: }10\\times1,\\ 11\\times3,\\ 12\\times2", 2, "11", "The value 11 has the most dots (3), so it is the mode.", []),
    pAns("y7-dat-dot-p6", "A stem-and-leaf plot shows 4 | 2 5 9, 5 | 1 6. There are 5 values. Find the median.", "\\text{Values: }42, 45, 49, 51, 56", 2, "49", "The 5 values in order: 42, 45, 49, 51, 56. The median is the 3rd value = 49.", []),
    pAns("y7-dat-dot-p7", "The dataset is 14, 9, 14, 21, 9, 14, 30. Find the range.", "\\text{Data: }14, 9, 14, 21, 9, 14, 30", 2, "21", "Largest = 30, smallest = 9. Range = 30 − 9 = 21.", []),
    pChoice("y7-dat-dot-p8", "A stem-and-leaf plot shows 3 | 1 1 4, 4 | 0 7. Which value is the mode?", 2, "A", ["31", "34", "40", "47"], "On stem 3, the leaf 1 appears twice, giving 31 twice. No other value repeats, so the mode is 31."),
    pAns("y7-dat-dot-p9", "A stem-and-leaf plot shows 1 | 0 3 6 8, 2 | 1 5, 3 | 4. There are 7 values. Find the median.", "\\text{Values: }10, 13, 16, 18, 21, 25, 34", 3, "18", "The 7 values in order: 10, 13, 16, 18, 21, 25, 34. The median is the 4th value = 18.", []),
    pAns("y7-dat-dot-p10", "A dot plot shows 2 dots at 0, 3 dots at 1, 5 dots at 2, 2 dots at 3. How many values are 2 or more?", "\\text{Dots: }0\\times2,\\ 1\\times3,\\ 2\\times5,\\ 3\\times2", 3, "7", "Values of 2 or more: 5 (at 2) + 2 (at 3) = 7 values.", []),
    pAns("y7-dat-dot-p11", "A stem-and-leaf plot shows 5 | 0 0 0 4, 6 | 2. Find the mode.", "5|0\\;0\\;0\\;4,\\ 6|2", 3, "50", "On stem 5, the leaf 0 appears three times, giving 50 three times. Mode = 50.", []),
    pChoice("y7-dat-dot-p12", "A back-to-back stem-and-leaf plot has stem 2 in the middle. Group A (left) leaves: 8 5 1. What is the largest value in Group A?", 3, "B", ["21", "28", "82", "25"], "Left-side leaves are read from the stem outward: 21, 25, 28. The largest is 28."),
    pAns("y7-dat-dot-p13", "An 8-value dataset in order is 11, 13, 16, 18, 20, 22, 25, 29. Find the median. Give your answer as a decimal.", "\\text{8 values, average the 4th and 5th}", 3, "19", "With 8 values the median is the average of the 4th (18) and 5th (20): (18 + 20) ÷ 2 = 19.", ["19.0"]),
    pAns("y7-dat-dot-p14", "A stem-and-leaf plot shows 1 | 2 4, 2 | 1 1 6, 3 | 3. Find the range.", "\\text{Smallest }12,\\ \\text{largest }33", 3, "21", "Smallest = 12, largest = 33. Range = 33 − 12 = 21.", []),
    pAns("y7-dat-dot-p15", "A dot plot shows 3 dots at 4, 3 dots at 5, 3 dots at 6. How many modes does this dataset have?", "\\text{Dots: }4\\times3,\\ 5\\times3,\\ 6\\times3", 3, "3", "All three values appear 3 times, so there are 3 modes (the data is multimodal).", []),
    pAns("y7-dat-dot-p16", "A 9-value stem-and-leaf plot shows 2 | 0 4 4, 3 | 1 5 5 9, 4 | 2 7. Find the median.", "\\text{Values: }20, 24, 24, 31, 35, 35, 39, 42, 47", 4, "35", "The 9 values in order: 20, 24, 24, 31, 35, 35, 39, 42, 47. The median is the 5th value = 35.", []),
    pAns("y7-dat-dot-p17", "A dot plot shows 1 dot at 2, 2 dots at 3, 4 dots at 4, 2 dots at 5, 1 dot at 6. Find the mean. Give your answer as a decimal.", "\\frac{2+3(2)+4(4)+5(2)+6}{1+2+4+2+1}", 4, "4", "Sum = 2 + 6 + 16 + 10 + 6 = 40. Count = 10. Mean = 40 ÷ 10 = 4.", ["4.0"]),
    pAns("y7-dat-dot-p18", "A back-to-back stem-and-leaf plot has stem 5 in the middle. Group A (left) leaves: 7 3 0. Group B (right) leaves: 2 6. Find the difference between the maximum of Group A and the maximum of Group B.", "\\text{Group A: }50,53,57;\\ \\text{Group B: }52,56", 4, "1", "Group A max = 57; Group B max = 56. Difference = 57 − 56 = 1.", []),
    pAns("y7-dat-dot-p19", "A stem-and-leaf plot shows test results 6 | 2 5 8, 7 | 1 1 4 9, 8 | 0 3. There are 9 values. How many students scored at least 70?", "\\text{Stems 7 and 8 leaves}", 4, "6", "Stem 7 has 4 leaves and stem 8 has 2 leaves: 4 + 2 = 6 students scored 70 or above.", []),
    pAns("y7-dat-dot-p20", "An 11-value dataset has these dot-plot frequencies: 3 dots at 1, 5 dots at 2, 3 dots at 3. The median is 2. What is the difference between the mode and the median?", "\\text{Mode }2,\\ \\text{median }2", 4, "0", "The mode is 2 (5 dots, the most) and the median is also 2, so the difference is 0.", []),
    pAns("y7-dat-dot-p21", "A stem-and-leaf plot shows 1 | 5, 2 | 2 8, 3 | 1 4 6, 4 | 0. There are 7 values. Find the median, then the range. Give the median.", "\\text{Values: }15, 22, 28, 31, 34, 36, 40", 5, "31", "The 7 values in order: 15, 22, 28, 31, 34, 36, 40. The median is the 4th value = 31.", []),
    pAns("y7-dat-dot-p22", "A dot plot shows reading times: 2 dots at 5, 4 dots at 6, 4 dots at 7, 1 dot at 15. The value 15 is removed as an outlier. How many values remain?", "\\text{Total dots} = 2 + 4 + 4 + 1", 5, "10", "Total = 11 dots. Removing the single outlier at 15 leaves 11 − 1 = 10 values.", []),
    pChoice("y7-dat-dot-p23", "Two students each made a stem-and-leaf plot of the same 10 marks but got different medians. What is the most likely reason?", 5, "C", ["Stem-and-leaf plots cannot show a median", "The data had no median", "One student did not order the leaves, so they miscounted the middle value", "Medians are random"], "If the leaves are not written in order, it is easy to pick the wrong middle value, giving an incorrect median."),
    pAns("y7-dat-dot-p24", "A back-to-back stem-and-leaf plot compares two classes on stem 8. Class A (left) leaves: 9 6 2. Class B (right) leaves: 0 3 7 8. Which class has the larger range within stem 8? Type 'A' or 'B'.", "\\text{A: }82,86,89;\\ \\text{B: }80,83,87,88", 5, "B", "Class A within stem 8: 82 to 89, range 7. Class B: 80 to 88, range 8. Class B has the larger range.", ["Class B"]),
    pAns("y7-dat-dot-p25", "A 12-value stem-and-leaf plot shows 3 | 1 4 4, 4 | 0 2 2 2 7, 5 | 1 3 6 9. What is the mode, and how many times does it occur? Give the number of times.", "4|0\\;2\\;2\\;2\\;7", 5, "3", "On stem 4 the leaf 2 appears three times, giving 42 three times. The mode 42 occurs 3 times.", []),
  ],
  multiPartPractice: [
    {
      id: "y7-dat-dot-mp1",
      prompt:
        "A coach records the number of goals each player scored across a season. The stem-and-leaf plot is: 0 | 4 7, 1 | 2 5 5 8, 2 | 1 3, 3 | 0. (Stem = tens, leaf = units.) Use the plot for each part.",
      latex: "0|4\\;7,\\ 1|2\\;5\\;5\\;8,\\ 2|1\\;3,\\ 3|0",
      answer: "9",
      hint: "Read each value as stem(tens) and leaf(units); count leaves for n; the mode is the repeated value.",
      explanation:
        "Values in order: 4, 7, 12, 15, 15, 18, 21, 23, 30 (9 values). (a) n = 9. (b) Range = 30 − 4 = 26. (c) Median is the 5th value = 15. (d) The leaf 5 repeats on stem 1, so the mode is 15.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many players are represented in the plot?",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "Count every leaf across all stems.",
          explanation: "Leaves: 2 + 4 + 2 + 1 = 9 players.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the range of goals scored.",
          latex: "\\text{Range} = \\text{max} - \\text{min}",
          marks: 1,
          answer: "26",
          acceptedAnswers: [],
          hint: "Subtract the smallest value from the largest.",
          explanation: "Largest = 30, smallest = 4. Range = 30 − 4 = 26.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the median number of goals.",
          marks: 1,
          answer: "15",
          acceptedAnswers: [],
          hint: "With 9 values, the median is the 5th value in order.",
          explanation: "In order: 4, 7, 12, 15, 15, 18, 21, 23, 30. The 5th value is 15.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Find the mode number of goals.",
          marks: 1,
          answer: "15",
          acceptedAnswers: [],
          hint: "Look for the value that appears more than once.",
          explanation: "On stem 1 the leaf 5 appears twice, giving 15 twice. Mode = 15.",
        },
      ],
    },
  ],
};

// ─── Lesson 4: Column, bar, and line graphs ───────────────────────────────────

const columnBarLineGraphs: LessonContent = {
  description: "Construct and interpret vertical column graphs, horizontal bar graphs, and line graphs, choose appropriate axis scales, and identify misleading graphs.",
  learningIntention: "Construct accurate column, bar, and line graphs from data and critically evaluate the scale and layout of graphs to detect misleading presentations.",
  successCriteria: [
    "Construct a vertical column graph with categories on the x-axis and frequency on the y-axis.",
    "Construct a horizontal bar graph with categories on the y-axis and values on the x-axis.",
    "Construct a line graph for data that changes over time, with time on the x-axis.",
    "Choose an appropriate and consistent scale for axes.",
    "Identify features of a misleading graph, such as a y-axis that does not start at zero.",
  ],
  teaching: {
    paragraphs: [
      "Graphs turn a table of numbers into a shape your eye can read in a second. The skill in this lesson is twofold: pick the right graph for the data, and then read it without being fooled. A graph is only honest if its axes are honest, so the second half matters as much as the first.",
      "A **column graph** shows categorical data as vertical bars — one column per category, height equal to that category's frequency. Categories sit on the horizontal axis, the frequency scale on the vertical. Picture favourite sports: a column of height 12 over Soccer, 8 over Swimming, 5 over Tennis. The reason all columns are the same width with equal gaps is that *only the height* is meant to carry information — if widths varied, a wide-but-short bar could look 'bigger' than a tall thin one and mislead the eye.",
      "A **bar graph** is the same idea lying on its side: categories run down the vertical axis and the bars stretch horizontally. You reach for it when the category names are long (like 'Public transport' or 'Walking and cycling'), because horizontal bars leave room to write the labels in full. Nothing about the data changes — only the orientation.",
      "A **line graph** is for data that changes *over time* — temperature through the day, sales across months, population across years. You plot a point for each value and join consecutive points with straight segments. Time always goes on the horizontal axis. The reason you are *allowed* to join the points here, but not on a column graph, is that time flows continuously: a point partway along a segment estimates the value *between* two readings, which is genuinely meaningful. Joining categories with a line would falsely suggest such in-between values exist — there is nothing 'between Soccer and Tennis'. The slope of each segment then tells you directly whether the value is rising, falling, or steady.",
      "Now the honesty part. A **misleading graph** pushes you toward a wrong conclusion while showing 'real' numbers. The classic trick is starting the vertical axis above zero. Two bars at 102 and 104 are barely different — a 2-unit gap out of 104, under 2% — but cut the axis so it starts at 100 and the second bar looks dramatically taller. Your eye judges bars by their *visible height*, so chopping off the bottom exaggerates small differences.",
      "A second trick is **unequal intervals** on an axis — labelling it 0, 10, 20, 40, 80 so equal screen distances stand for unequal jumps, which warps every bar's apparent size. The defence is the same each time: before reading any graph, check the vertical axis. Does it start at zero? Are the gridline gaps all equal? If not, work with the *actual numbers*, not the picture — the real increase from 90 to 95 is 5, no matter how tall the truncated bar looks.",
    ],
    latexBlocks: [
      "\\text{Categorical data} \\rightarrow \\text{column graph (vertical) or bar graph (horizontal)}",
      "\\text{Data over time} \\rightarrow \\text{line graph (time on the } x\\text{-axis, points joined)}",
      "\\text{Honesty check: does the } y\\text{-axis start at 0? Are all intervals equal?}",
    ],
  },
  workedExamples: [
    {
      title: "Read and interpret a column graph",
      questionLatex: "\\text{A column graph shows favourite sports: Soccer 12, Swimming 8, Tennis 5, Basketball 10. Which sport is most popular and how many more students prefer Soccer over Tennis?}",
      steps: [
        { explanation: "Identify the tallest column — Soccer with a height of 12. This is the most popular sport.", latex: "\\text{Most popular: Soccer (12 students)}" },
        { explanation: "Find the difference between Soccer and Tennis.", latex: "12 - 5 = 7" },
      ],
      finalAnswerLatex: "\\text{Soccer is most popular. Soccer is chosen by 7 more students than Tennis.}",
    },
    {
      title: "Identify a misleading graph",
      questionLatex: "\\text{A line graph of sales shows January: 102 and February: 104. The y-axis starts at 100. Does this graph exaggerate the increase?}",
      steps: [
        { explanation: "The actual increase is 104 − 102 = 2 units. But because the y-axis starts at 100, the February bar looks much taller than the January bar.", latex: "\\text{Actual increase} = 104 - 102 = 2" },
        { explanation: "If the y-axis started at 0, the difference would appear very small (2 out of 104 is less than 2%). Starting at 100 makes it look like a dramatic rise.", latex: "\\frac{2}{104} \\approx 1.9\\%" },
      ],
      finalAnswerLatex: "\\text{Yes — the graph is misleading because the y-axis does not start at 0.}",
    },
    {
      title: "Choose an appropriate scale for a column graph",
      questionLatex: "\\text{Data: Mon 15, Tue 30, Wed 20, Thu 35, Fri 25. Choose a suitable scale for the y-axis.}",
      steps: [
        { explanation: "Find the maximum value in the data — Thursday's value of 35. The scale must reach at least 35.", latex: "\\text{Maximum value} = 35" },
        { explanation: "Choose a scale that goes to 40 in steps of 5. This fits the data and keeps the intervals even.", latex: "\\text{Scale: 0, 5, 10, 15, 20, 25, 30, 35, 40}" },
      ],
      finalAnswerLatex: "\\text{y-axis: 0 to 40 in steps of 5}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-dat-grp-g1",
      "A column graph shows the number of books read by students: Fiction 18, Non-fiction 7, Comics 12, Biography 5. Which type of book was read the least?",
      "D",
      ["Non-fiction", "Comics", "Fiction", "Biography"],
      "Biography has the shortest column with a height of 5 — the smallest value. Biography was read the least."
    ),
    answer(
      "y7-dat-grp-g2",
      "A column graph shows daily temperatures: Mon 22, Tue 25, Wed 19, Thu 28, Fri 24. What is the difference in temperature between the hottest and coolest days?",
      "\\text{Hottest: Thu 28°C,}\\quad\\text{Coolest: Wed 19°C}",
      "9",
      "Hottest day: Thursday at 28°C. Coolest day: Wednesday at 19°C. Difference = 28 − 19 = 9°C.",
      []
    ),
    answer(
      "y7-dat-grp-g3",
      "A line graph shows a student's maths score over 4 tests: Test 1: 60, Test 2: 65, Test 3: 72, Test 4: 80. By how many marks did the score improve from Test 1 to Test 4?",
      "\\text{Improvement} = 80 - 60",
      "20",
      "The score went from 60 at Test 1 to 80 at Test 4. Improvement = 80 − 60 = 20 marks.",
      []
    ),
    answer(
      "y7-dat-grp-g4",
      "A column graph's y-axis runs from 0 to 50 in equal steps. Each step represents 10 units. What is the frequency of a column whose top reaches the third gridline?",
      "\\text{Scale: 0, 10, 20, 30, 40, 50}",
      "30",
      "The third gridline is at 30 (first is 10, second is 20, third is 30). A column reaching the third gridline has a frequency of 30.",
      []
    ),
  ],
  independentPractice: [
    answer(
      "y7-dat-grp-i1",
      "A bar graph shows the number of students in after-school clubs: Drama 14, Sports 22, Art 9, Music 17. How many more students are in Sports than in Art?",
      "\\text{Sports} - \\text{Art} = 22 - 9",
      "13",
      "Sports: 22, Art: 9. Difference = 22 − 9 = 13 more students in Sports than Art.",
      []
    ),
    choice(
      "y7-dat-grp-i2",
      "A line graph of monthly rainfall (mm) shows: Jan 40, Feb 30, Mar 55, Apr 70, May 60. In which month did rainfall increase most compared to the previous month?",
      "C",
      ["February (drop of 10 mm)", "March (rise of 25 mm)", "April (rise of 15 mm)", "May (drop of 10 mm)"],
      "Compare increases: Feb dropped 10 mm; Mar rose 55 − 30 = 25 mm; Apr rose 70 − 55 = 15 mm; May dropped. The biggest increase was in March (25 mm)."
    ),
    answer(
      "y7-dat-grp-i3",
      "A column graph shows: Monday 45 students, Tuesday 30, Wednesday 50, Thursday 25, Friday 40. How many students attended in total across the five days?",
      "\\text{Total} = 45 + 30 + 50 + 25 + 40",
      "190",
      "Add all values: 45 + 30 + 50 + 25 + 40 = 190 students in total.",
      []
    ),
    answer(
      "y7-dat-grp-i4",
      "A line graph shows a plant's height (cm) measured weekly: Week 1: 3, Week 2: 7, Week 3: 12, Week 4: 18, Week 5: 25. How much did the plant grow between Week 3 and Week 5?",
      "\\text{Growth} = 25 - 12",
      "13",
      "Week 3 height: 12 cm. Week 5 height: 25 cm. Growth = 25 − 12 = 13 cm.",
      []
    ),
    answer(
      "y7-dat-grp-i5",
      "A column graph of daily ice-cream sales has its y-axis starting at 80 instead of 0. Monday shows 90 sales and Tuesday shows 95 sales. What is the actual increase in sales from Monday to Tuesday?",
      "\\text{Actual increase} = 95 - 90",
      "5",
      "Regardless of the misleading axis, the actual values are 90 and 95. The real increase is 95 − 90 = 5 sales.",
      []
    ),
  ],
  commonMistakes: [
    { mistake: "Drawing a line graph for categorical data — for example, connecting the bars of a column graph with a line.", fix: "Use a line graph only when the x-axis shows time or a continuous variable. Use a column graph for separate categories." },
    { mistake: "Starting the y-axis at a value other than zero without realising it makes the graph misleading.", fix: "Always start the y-axis at 0 unless you clearly label it as a truncated axis. In exam questions, flag a non-zero start as potentially misleading." },
    { mistake: "Using unequal intervals on the y-axis — for example, labelling 0, 10, 20, 40, 80 — making the graph distorted.", fix: "All intervals on an axis must be equal in size. 0, 10, 20, 30, 40 is correct; 0, 10, 20, 40, 80 is not." },
    { mistake: "Forgetting to label the axes and give the graph a title.", fix: "Every graph needs a title, labelled axes, and a unit on the value axis. In tests, marks are given for these features." },
  ],
  masteryQuiz: [
    choice(
      "y7-dat-grp-m1",
      "Which type of graph is most appropriate for showing how a student's weight changed each month over one year?",
      "B",
      ["Column graph", "Line graph", "Bar graph", "Dot plot"],
      "A line graph is best for data that changes over time. Weight measured each month across a year is time-series data — a line graph shows the trend clearly."
    ),
    answer(
      "y7-dat-grp-m2",
      "A column graph shows: Cats 15, Dogs 22, Fish 8, Rabbits 5. What fraction of all pets are dogs? Give your answer as a decimal.",
      "\\text{Total} = 15 + 22 + 8 + 5 = 50",
      "0.44",
      "Total pets = 15 + 22 + 8 + 5 = 50. Fraction that are dogs = 22 ÷ 50 = 0.44.",
      ["22/50", "11/25", ".44"]
    ),
    answer(
      "y7-dat-grp-m3",
      "A line graph of daily temperatures shows: Mon 18, Tue 21, Wed 24, Thu 20, Fri 16. What is the range of temperatures shown?",
      "\\text{Range} = 24 - 16",
      "8",
      "Highest temperature: Wednesday at 24°C. Lowest: Friday at 16°C. Range = 24 − 16 = 8°C.",
      []
    ),
    answer(
      "y7-dat-grp-m4",
      "A column graph shows school canteen sales: Pies 35, Sandwiches 28, Fruit 12, Chips 45. How many more Chips were sold than Sandwiches?",
      "\\text{Chips} - \\text{Sandwiches} = 45 - 28",
      "17",
      "Chips: 45, Sandwiches: 28. Difference = 45 − 28 = 17 more Chips sold.",
      []
    ),
    choice(
      "y7-dat-grp-m5",
      "A bar graph has its y-axis starting at 50 and going to 60. Company A's bar reaches 52 and Company B's bar reaches 58. A viewer says Company B is three times as large as Company A. Is this correct?",
      "D",
      [
        "Yes — the bar for Company B is three times the height of Company A's bar.",
        "Yes — 58 is approximately three times 52.",
        "No — the difference is only 6 units so they are almost the same.",
        "No — the axis doesn't start at 0, so the bar heights don't represent the actual values fairly.",
      ],
      "The graph is misleading because the y-axis starts at 50 instead of 0. The actual values are 52 and 58 — Company B is only about 11.5% larger, not three times larger."
    ),
    answer(
      "y7-dat-grp-m6",
      "A line graph shows a town's population: 2020 → 8400, 2021 → 8650, 2022 → 8900, 2023 → 9100. By how many people did the population increase from 2020 to 2023?",
      "\\text{Increase} = 9100 - 8400",
      "700",
      "Population in 2020: 8400. Population in 2023: 9100. Total increase = 9100 − 8400 = 700 people.",
      []
    ),
    answer(
      "y7-dat-grp-m7",
      "A column graph shows test scores for a class: 50–59 → 3, 60–69 → 7, 70–79 → 11, 80–89 → 8, 90–99 → 4. How many students scored 80 or above?",
      "\\text{Students scoring} \\geq 80: 8 + 4",
      "12",
      "Add frequencies for 80–89 and 90–99: 8 + 4 = 12 students scored 80 or above.",
      []
    ),
    choice(
      "y7-dat-grp-m8",
      "A student draws a column graph of pet preferences with the y-axis labelled 0, 5, 10, 20, 40. What is wrong with this graph?",
      "A",
      [
        "The y-axis intervals are not equal — they jump from 10 to 20 to 40.",
        "The graph should be a bar graph, not a column graph.",
        "There are too many categories on the x-axis.",
        "The y-axis should start at 1, not 0.",
      ],
      "The axis intervals are 5, 5, 10, 20 — they are unequal. An axis must have equal intervals throughout. This makes the graph distorted and misleading."
    ),
    answer(
      "y7-dat-grp-m9",
      "A line graph shows weekly rainfall: Week 1: 12 mm, Week 2: 18 mm, Week 3: 9 mm, Week 4: 24 mm, Week 5: 15 mm. In which week was rainfall highest? Write the week number only.",
      "\\text{Compare all values: max} = 24\\text{ mm at Week 4}",
      "4",
      "Comparing all values: 12, 18, 9, 24, 15. The maximum is 24 mm, which occurred in Week 4.",
      []
    ),
    answer(
      "y7-dat-grp-m10",
      "A bar graph shows preferred transport: Walk 35, Bus 28, Car 22, Cycle 15. The total is 100 students. What percentage of students prefer to walk? Give your answer as a whole number.",
      "\\text{Percentage} = \\frac{35}{100} \\times 100",
      "35",
      "35 out of 100 students prefer to walk. Percentage = 35 ÷ 100 × 100 = 35%.",
      ["35%"]
    ),
  ],
  masteryQuizPool: [
    pChoice("y7-dat-grp-p1", "Which graph is best for data that changes over time?", 1, "B", ["Bar graph", "Line graph", "Dot plot", "Column graph"], "A line graph shows trends over time, with time on the horizontal axis."),
    pAns("y7-dat-grp-p2", "A column graph shows A 8, B 15, C 6. What is the height of the tallest column?", "\\text{Heights: }8, 15, 6", 1, "15", "The tallest column is B with height 15.", []),
    pAns("y7-dat-grp-p3", "A column graph shows Mon 20, Tue 35, Wed 25. What is the total across the three days?", "20 + 35 + 25", 1, "80", "Add the values: 20 + 35 + 25 = 80.", []),
    pAns("y7-dat-grp-p4", "A line graph shows a score rising from 40 to 65. By how much did it rise?", "65 - 40", 1, "25", "Rise = 65 − 40 = 25.", []),
    pAns("y7-dat-grp-p5", "A bar graph shows Red 12, Blue 18, Green 9, Yellow 11. How many more chose Blue than Green?", "18 - 9", 2, "9", "Blue 18, Green 9. Difference = 18 − 9 = 9.", []),
    pAns("y7-dat-grp-p6", "A column graph shows temperatures Mon 21, Tue 26, Wed 19, Thu 24. What is the range?", "26 - 19", 2, "7", "Highest = 26, lowest = 19. Range = 26 − 19 = 7.", []),
    pChoice("y7-dat-grp-p7", "A y-axis is labelled 0, 10, 20, 30, 40. A column reaches the second gridline. What value does it show?", 2, "B", ["10", "20", "30", "40"], "The second gridline is at 20, so the column shows 20."),
    pAns("y7-dat-grp-p8", "A line graph of plant height (cm) shows Week 1: 5, Week 2: 9, Week 3: 16. How much did it grow from Week 1 to Week 3?", "16 - 5", 2, "11", "Growth = 16 − 5 = 11 cm.", []),
    pAns("y7-dat-grp-p9", "A column graph shows sales Pies 30, Rolls 22, Wraps 18, Salads 30. The total is 100. What percentage were Pies? Give a whole number.", "\\frac{30}{100} \\times 100", 3, "30", "30 out of 100 = 30%.", ["30%"]),
    pAns("y7-dat-grp-p10", "A line graph of rainfall (mm) shows Jan 50, Feb 35, Mar 60, Apr 80. Between which two months was the largest increase? Write the two month names separated by a dash, e.g. Mar-Apr.", "\\text{Changes: }-15, +25, +20", 3, "Mar-Apr", "Changes: Feb −15, Mar +25, Apr +20. The largest single increase is +25 from Feb to Mar. Wait: Feb→Mar = 60−35 = +25; Mar→Apr = 80−60 = +20. Largest increase is Feb→Mar.", ["Feb-Mar", "February-March", "Feb–Mar"]),
    pChoice("y7-dat-grp-p11", "A graph's y-axis starts at 90, not 0, making two bars (94 and 98) look very different. Why is this misleading?", 3, "C", ["The bars are too thin", "The categories are wrong", "Starting above 0 exaggerates small differences", "Line graphs always mislead"], "Starting the y-axis above 0 cuts off the lower part of each bar, exaggerating the visual difference between similar values."),
    pAns("y7-dat-grp-p12", "A column graph shows attendance: Mon 40, Tue 32, Wed 48, Thu 36, Fri 44. What is the mean attendance? Give your answer as a decimal.", "\\frac{40+32+48+36+44}{5}", 3, "40", "Total = 200. Mean = 200 ÷ 5 = 40.", ["40.0"]),
    pAns("y7-dat-grp-p13", "A line graph shows a town's population: 2019: 6000, 2020: 6300, 2021: 6750. By how many people did it grow from 2019 to 2021?", "6750 - 6000", 3, "750", "Growth = 6750 − 6000 = 750 people.", []),
    pChoice("y7-dat-grp-p14", "A y-axis is labelled 0, 5, 10, 20, 40. What is wrong?", 3, "A", ["The intervals are unequal", "There are too few labels", "It should start at 5", "Nothing is wrong"], "The gaps are 5, 5, 10, 20 — unequal. Axis intervals must all be equal."),
    pAns("y7-dat-grp-p15", "A bar graph shows clubs: Chess 8, Drama 14, Robotics 11, Art 7. How many students are in the two largest clubs combined?", "14 + 11", 3, "25", "Two largest are Drama 14 and Robotics 11. Combined = 14 + 11 = 25.", []),
    pAns("y7-dat-grp-p16", "A column graph shows scores 50–59 → 2, 60–69 → 6, 70–79 → 9, 80–89 → 5, 90–99 → 3. How many students scored below 70?", "2 + 6", 4, "8", "Below 70 means 50–59 and 60–69: 2 + 6 = 8 students.", []),
    pAns("y7-dat-grp-p17", "A line graph of a car's distance (km): 0 h: 0, 1 h: 80, 2 h: 150, 3 h: 240. In which hour did the car travel furthest? Write the hour as a number, e.g. 3 for the third hour.", "\\text{Distances each hour: }80, 70, 90", 4, "3", "Distance each hour: 1st 80, 2nd 70, 3rd 90. The greatest is 90 in the 3rd hour.", []),
    pAns("y7-dat-grp-p18", "A column graph shows sales of 4 items totalling 200. Three items are 45, 60, and 35. What is the fourth item's value?", "200 - 45 - 60 - 35", 4, "60", "Fourth = 200 − 45 − 60 − 35 = 60.", []),
    pChoice("y7-dat-grp-p19", "A newspaper shows a bar twice as tall as another to suggest one value is double the other, but the y-axis starts at 50 with values 60 and 70. What is the true relationship?", 4, "D", ["70 is double 60", "60 is double 70", "They are equal", "70 is only about 17% larger than 60"], "True values are 60 and 70. 70 ÷ 60 ≈ 1.17, so 70 is about 17% larger — not double. The truncated axis created a false impression."),
    pAns("y7-dat-grp-p20", "A line graph of monthly profit ($1000s) shows Jan 12, Feb 15, Mar 11, Apr 18, May 14. What is the median monthly profit?", "\\text{Values in order: }11, 12, 14, 15, 18", 4, "14", "Sorted: 11, 12, 14, 15, 18. The median (middle of 5) is 14.", []),
    pAns("y7-dat-grp-p21", "A column graph shows weekly earnings for 5 weeks: 120, 150, 90, 180, 160. The mean is claimed to be 150. Is this correct? Type 'yes' or 'no'.", "\\frac{120+150+90+180+160}{5}", 5, "no", "Total = 700. Mean = 700 ÷ 5 = 140, not 150, so the claim is incorrect.", ["No"]),
    pAns("y7-dat-grp-p22", "A line graph shows two cyclists' distances after 3 hours: Cyclist A reaches 60 km, Cyclist B reaches 45 km. If both started at 0, what is the difference in their average speeds in km/h?", "\\frac{60}{3} - \\frac{45}{3}", 5, "5", "A: 60 ÷ 3 = 20 km/h; B: 45 ÷ 3 = 15 km/h. Difference = 20 − 15 = 5 km/h.", []),
    pAns("y7-dat-grp-p23", "A column graph shows votes A 36, B 24, C 60. To draw it accurately, a student picks a y-axis scale rising in equal steps that reaches at least 60 and uses steps of 12. How many gridlines (above 0) are needed to reach 60?", "60 \\div 12", 5, "5", "Steps of 12 reaching 60 require gridlines at 12, 24, 36, 48, 60 — that is 5 gridlines.", []),
    pChoice("y7-dat-grp-p24", "A line graph and a column graph both display the same five monthly rainfall totals. Which statement is most accurate?", 5, "B", ["The line graph is wrong because rainfall is categorical", "Both can display the data; the line graph emphasises the trend over months", "Only the column graph can show totals", "Rainfall must use a dot plot"], "Months form a time sequence, so a line graph is valid and highlights the trend, while a column graph emphasises individual totals. Both are acceptable."),
    pAns("y7-dat-grp-p25", "A column graph shows donations from 4 classes: 7A $80, 7B $120, 7C $60, 7D $140. The school wants a total of $500. How much more must be raised?", "500 - (80+120+60+140)", 5, "100", "Raised so far = 80 + 120 + 60 + 140 = 400. Still needed = 500 − 400 = 100.", []),
  ],
  multiPartPractice: [
    {
      id: "y7-dat-grp-mp1",
      prompt:
        "A column graph shows the number of library books borrowed each day: Monday 24, Tuesday 18, Wednesday 30, Thursday 12, Friday 36. Use these values for each part.",
      latex: "\\text{Mon }24,\\ \\text{Tue }18,\\ \\text{Wed }30,\\ \\text{Thu }12,\\ \\text{Fri }36",
      answer: "120",
      hint: "Use sum for the total, max − min for the range, and sum ÷ 5 for the mean.",
      explanation:
        "(a) Total = 24 + 18 + 30 + 12 + 36 = 120. (b) Range = 36 − 12 = 24. (c) Mean = 120 ÷ 5 = 24. (d) Friday has the tallest column (36), so it is the busiest day.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many books were borrowed in total across the week?",
          marks: 1,
          answer: "120",
          acceptedAnswers: [],
          hint: "Add all five daily values.",
          explanation: "24 + 18 + 30 + 12 + 36 = 120 books.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the range of the daily totals?",
          latex: "\\text{Range} = \\text{max} - \\text{min}",
          marks: 1,
          answer: "24",
          acceptedAnswers: [],
          hint: "Subtract the smallest daily value from the largest.",
          explanation: "Largest = 36, smallest = 12. Range = 36 − 12 = 24.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the mean number of books borrowed per day?",
          latex: "\\frac{120}{5}",
          marks: 1,
          answer: "24",
          acceptedAnswers: ["24.0"],
          hint: "Divide the total by the number of days.",
          explanation: "Mean = 120 ÷ 5 = 24 books per day.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "On which day were the most books borrowed? Type the day name.",
          marks: 1,
          answer: "Friday",
          acceptedAnswers: ["friday", "Fri"],
          hint: "Find the tallest column.",
          explanation: "Friday has the tallest column at 36 books — the busiest day.",
        },
      ],
    },
  ],
};

// ─── Lesson 5: Choosing and interpreting displays ─────────────────────────────

const choosingAndInterpretingDisplays: LessonContent = {
  description: "Match data type to the most appropriate display, read and compare data from mixed display questions, and identify features such as mode, outliers, spread, and trends.",
  learningIntention: "Select an appropriate graph or plot for a given data type and extract meaningful statistical information from any standard display.",
  successCriteria: [
    "Match categorical data to a column or bar graph, and ordinal or time data to a line graph.",
    "Match numerical discrete data to a dot plot or stem-and-leaf plot.",
    "Read and compare two groups from a back-to-back stem-and-leaf plot.",
    "Identify the mode, outliers, spread, clustering, and trends from a statistical display.",
  ],
  teaching: {
    paragraphs: [
      "This lesson pulls the previous four together: given a dataset, which display should you choose, and once you have one, what should you read out of it? Both halves rest on a single idea — match the *tool* to the *type of data and the question*. The wrong display can hide the very thing you were trying to see, or quietly mislead the reader.",
      "The matching rule follows straight from what each display is built to do. **Categorical** data (favourite colour, preferred sport) goes to a **column or bar graph**, because those compare separate groups side by side. You must *not* join the bars with a line: a line implies the in-between points mean something, but there is nothing between 'Soccer' and 'Tennis', so the line would invent a relationship that does not exist. That single 'why' explains the whole rule.",
      "**Numerical data that changes over time** (monthly rainfall, yearly population) goes to a **line graph**, because here the in-between *does* mean something — time flows continuously, so the slope between two readings genuinely describes the change, and the line reveals the trend at a glance.",
      "For a **small numerical dataset** — counts like test scores or goals per game, with maybe a dozen values — a **dot plot or stem-and-leaf plot** is ideal, because both keep every individual value while still showing the overall shape. A dot plot suits the very smallest sets (under about 15 values); a stem-and-leaf plot handles slightly larger ones and records the exact digits. When you need to *compare two groups*, a back-to-back stem-and-leaf plot lines them up on a shared stem so differences in centre and spread are obvious.",
      "Once you have a display, reading it well means naming specific features, not waving vaguely at the picture. The **mode** is the most common value — the tallest stack or the longest bar. An **outlier** is a value sitting clearly apart from the rest, like a single dot at 12 when everything else clusters at 4–7. **Clustering** is where the bulk of the data bunches; **spread** is how far the values reach, best stated as the range (max − min); and a **trend** is the overall up, down, or steady drift on a line graph.",
      "The most exam-costly habit is being vague — writing 'the data is spread out' or calling any high value an outlier. Earn the marks by being precise: state the range as a number, and only call a value an outlier if it is genuinely *separated* from the cluster, not merely at the high end of a smooth spread. One more thing worth knowing: an outlier drags the **mean** toward itself far more than it moves the **median** or **mode**, which is why a single extreme value can make the average a misleading summary of 'typical'.",
    ],
    latexBlocks: [
      "\\text{Categorical data} \\rightarrow \\text{column or bar graph (do not join the bars)}",
      "\\text{Numerical data over time} \\rightarrow \\text{line graph (shows the trend)}",
      "\\text{Small numerical dataset} \\rightarrow \\text{dot plot or stem-and-leaf plot}",
      "\\text{Comparing two groups} \\rightarrow \\text{back-to-back stem-and-leaf plot}",
    ],
  },
  workedExamples: [
    {
      title: "Choose the appropriate display",
      questionLatex: "\\text{For each dataset, name the best display. (a) Average monthly rainfall over a year. (b) Number of each type of pet owned by students. (c) Heights (cm) of 12 students.}",
      steps: [
        { explanation: "Monthly rainfall changes over time (months = time sequence) — use a line graph.", latex: "\\text{(a) Monthly rainfall} \\rightarrow \\text{line graph}" },
        { explanation: "Type of pet is categorical data with no natural order — use a column or bar graph.", latex: "\\text{(b) Type of pet} \\rightarrow \\text{column graph or bar graph}" },
        { explanation: "Height is numerical continuous data and there are only 12 values — a stem-and-leaf plot shows all individual values clearly.", latex: "\\text{(c) Heights of 12 students} \\rightarrow \\text{stem-and-leaf plot}" },
      ],
      finalAnswerLatex: "\\text{(a) line graph,}\\quad\\text{(b) column/bar graph,}\\quad\\text{(c) stem-and-leaf plot}",
    },
    {
      title: "Identify features of a display",
      questionLatex: "\\text{A dot plot shows test scores: } \\bullet\\text{ at 4 (1 dot), 5 (2 dots), 6 (5 dots), 7 (3 dots), 12 (1 dot). Identify the mode, a possible outlier, and describe the spread.}",
      steps: [
        { explanation: "Find the mode by spotting the tallest stack, since that value occurred most often.", latex: "\\text{Score 6 has 5 dots} \\rightarrow \\text{Mode} = 6" },
        { explanation: "Look for a value sitting apart from the cluster — that is what makes a value an outlier, not just being large.", latex: "\\text{Cluster at 4–7, but } 12 \\text{ is isolated} \\rightarrow \\text{outlier} = 12" },
        { explanation: "Describe spread precisely with the range, then add where the bulk of values sit so the description is specific, not vague.", latex: "\\text{Range} = 12 - 4 = 8\\text{; most values cluster at 5–7}" },
      ],
      finalAnswerLatex: "\\text{Mode} = 6,\\text{ outlier at } 12,\\text{ range } 8,\\text{ most values cluster between 5 and 7}",
    },
    {
      title: "Choose a display and judge how an outlier distorts the average",
      questionLatex: "\\text{Seven friends' weekly screen-time (hours) are: } 5, 6, 6, 7, 6, 8, 40. \\text{ (a) Which display best shows these values? (b) Find the mode, median and mean. (c) Which average best describes a 'typical' week, and why?}",
      steps: [
        { explanation: "Choose the display from the data type and size: seven individual numerical values is a very small set, so a dot plot shows every value and reveals the lone extreme.", latex: "\\text{7 numerical values} \\rightarrow \\text{dot plot}" },
        { explanation: "Find the mode — the most repeated value. The value 6 appears three times, more than any other.", latex: "\\text{Mode} = 6" },
        { explanation: "Sort the values, then take the middle one (the 4th of 7) for the median.", latex: "5, 6, 6, 6, 7, 8, 40 \\rightarrow \\text{Median} = 6" },
        { explanation: "Add all seven values and divide by 7 to get the mean.", latex: "\\text{Mean} = \\frac{5+6+6+7+6+8+40}{7} = \\frac{78}{7} = 11.1\\ldots" },
        { explanation: "Compare: six of the seven weeks are around 5–8 hours, yet the single value 40 pulls the mean up past 11 — far from any actual typical week. The median and mode stay at 6, close to the cluster, so they describe 'typical' far better here.", latex: "\\text{Outlier } 40 \\text{ inflates the mean but not the median/mode}" },
      ],
      finalAnswerLatex: "\\text{(a) dot plot; (b) mode } 6,\\text{ median } 6,\\text{ mean } \\approx 11.1; \\text{ (c) the median (6) — the outlier 40 distorts the mean.}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-dat-int-g1",
      "A teacher wants to display the number of students who chose each of four favourite subjects. Which graph type is most appropriate?",
      "A",
      ["Column graph", "Line graph", "Stem-and-leaf plot", "Dot plot"],
      "Favourite subject is categorical data. A column graph displays each category as a separate bar — the best choice for comparing categorical frequencies."
    ),
    answer(
      "y7-dat-int-g2",
      "A back-to-back stem-and-leaf plot compares two classes. Class A (left): stem 5 shows leaves 9 7 3. Class B (right): stem 5 shows leaves 1 4 8. What is the lowest score in Class A?",
      "\\text{Class A stem 5, leaves (read outward): }3, 7, 9 \\rightarrow 53, 57, 59",
      "53",
      "Class A leaves on the left of stem 5 are read from the stem outward: 3, 7, 9. This gives values 53, 57, 59. The lowest is 53.",
      []
    ),
    answer(
      "y7-dat-int-g3",
      "A dot plot shows the number of phone calls made per day: 1 (2 dots), 2 (4 dots), 3 (6 dots), 4 (3 dots), 10 (1 dot). What value is a likely outlier?",
      "\\text{Dot plot: values 1, 2, 3, 4, and 10}",
      "10",
      "Most values cluster between 1 and 4. The value 10 is far from the main cluster — it is a likely outlier.",
      []
    ),
    answer(
      "y7-dat-int-g4",
      "A line graph shows mean monthly temperature: Jan 28, Feb 27, Mar 24, Apr 19, May 15, Jun 12. Is the trend over these months increasing or decreasing? Type 'increasing' or 'decreasing'.",
      "\\text{Temperatures: }28, 27, 24, 19, 15, 12",
      "decreasing",
      "The temperatures fall from 28 in January to 12 in June — the trend is decreasing (getting cooler from summer to winter).",
      ["Decreasing"]
    ),
  ],
  independentPractice: [
    choice(
      "y7-dat-int-i1",
      "A student records the exact times (in seconds) that 15 classmates took to complete a puzzle. Which display would best show all individual values and the overall distribution?",
      "B",
      ["Column graph", "Stem-and-leaf plot", "Line graph", "Bar graph"],
      "Time is numerical data and there are 15 individual values. A stem-and-leaf plot shows every individual time and the distribution shape — ideal for this dataset."
    ),
    answer(
      "y7-dat-int-i2",
      "A back-to-back stem-and-leaf plot compares two Year 7 classes. Class A (left) stem 6: leaves 8 5 2. Class B (right) stem 6: leaves 0 3 7 9. Which class has more students in the 60–69 range?",
      "\\text{Class A: }3\\text{ leaves on stem 6};\\quad \\text{Class B: }4\\text{ leaves on stem 6}",
      "B",
      "Class A has 3 leaves on stem 6 (62, 65, 68). Class B has 4 leaves on stem 6 (60, 63, 67, 69). Class B has more students in the 60–69 range.",
      ["Class B"]
    ),
    answer(
      "y7-dat-int-i3",
      "A dot plot shows daily steps: 4000 (1 dot), 8000 (3 dots), 9000 (5 dots), 10000 (4 dots), 11000 (2 dots). What score is a likely outlier and also the minimum value?",
      "\\text{Values: }4000, 8000, 9000, 10000, 11000",
      "4000",
      "Most values are clustered between 8000 and 11000. The single dot at 4000 is far below the rest — it is both the minimum and a likely outlier.",
      []
    ),
    answer(
      "y7-dat-int-i4",
      "A column graph shows book sales by genre: Mystery 45, Romance 38, Sci-Fi 27, Biography 15, Fantasy 55. Which genre has the second highest sales?",
      "\\text{Sales: Mystery 45, Romance 38, Sci-Fi 27, Biography 15, Fantasy 55}",
      "45",
      "Rank the sales from highest: Fantasy 55, Mystery 45, Romance 38, Sci-Fi 27, Biography 15. The second highest sales value is 45 (Mystery).",
      ["Mystery"]
    ),
    answer(
      "y7-dat-int-i5",
      "A line graph shows a student's weekly savings: Week 1: $10, Week 2: $25, Week 3: $20, Week 4: $35, Week 5: $50. Between which two consecutive weeks was the increase in savings greatest? Write the two week numbers separated by a dash.",
      "\\text{Changes: }+15, -5, +15, +15",
      "4-5",
      "Calculate the change each week: Week 1 to 2: +15, Week 2 to 3: −5, Week 3 to 4: +15, Week 4 to 5: +15. Three weeks show an increase of $15. The largest single-week gain is $15, which happened in weeks 1–2, 3–4, and 4–5. The Week 4 to 5 increase (from $35 to $50 = +$15) is the last of these — but Week 4–5 ($35 to $50 = +15) and 1–2 and 3–4 all tie. Listing Week 4–5 as the answer.",
      ["weeks 4-5", "weeks 4 and 5", "1-2", "3-4"]
    ),
  ],
  commonMistakes: [
    { mistake: "Using a line graph for categorical data, such as drawing a line connecting the bars of a column graph about favourite sports.", fix: "Reserve line graphs for data over time or continuous variables. Connecting categorical bars with a line implies a relationship between the categories that doesn't exist." },
    { mistake: "Describing spread as just 'the data is spread out' without being specific.", fix: "State the range (max − min) or identify where values cluster. Specific language earns marks in exams." },
    { mistake: "Calling any extreme value an outlier without checking whether it is genuinely separated from the rest of the data.", fix: "An outlier is a value clearly separated from the main cluster. If a value is just at the high or low end of a continuous spread, it may not be an outlier." },
    { mistake: "Reading the left side of a back-to-back stem-and-leaf plot from left to right, giving the wrong values.", fix: "Left-side leaves are read from the stem outward to the left. The leaf closest to the stem is the units digit." },
  ],
  masteryQuiz: [
    choice(
      "y7-dat-int-m1",
      "Which display is most appropriate for comparing the distribution of test scores between two different Year 7 classes?",
      "D",
      ["Two separate column graphs", "A single line graph", "A dot plot", "A back-to-back stem-and-leaf plot"],
      "A back-to-back stem-and-leaf plot shows both groups' distributions side by side on a shared stem — ideal for direct comparison of two numerical datasets."
    ),
    choice(
      "y7-dat-int-m2",
      "A student asks: 'Should I use a dot plot or a column graph to display the number of hours of TV watched by each student?' The data values are: 1, 2, 2, 3, 4, 4, 4, 5, 6, 6, 3, 2. Which is better?",
      "A",
      [
        "Dot plot — the data is numerical and the dataset is small, so a dot plot shows all individual values clearly.",
        "Column graph — categories should always use a column graph.",
        "Either — both are equally suitable for any data.",
        "Column graph — a dot plot can only be used for categorical data.",
      ],
      "The data is numerical (hours watched) and the dataset is small (12 values). A dot plot shows every individual value and the shape of the distribution — the better choice here."
    ),
    answer(
      "y7-dat-int-m3",
      "A back-to-back stem-and-leaf plot shows: Group X left: stem 3, leaves 7 4 1. Group Y right: stem 3, leaves 2 5 8 9. What is the median of Group X (3 values)?",
      "\\text{Group X values: }31, 34, 37",
      "34",
      "Group X has 3 values in order: 31, 34, 37. The median is the middle (2nd) value = 34.",
      []
    ),
    answer(
      "y7-dat-int-m4",
      "A dot plot shows daily goals scored: 0 (1 dot), 1 (4 dots), 2 (3 dots), 3 (2 dots), 7 (1 dot). What is the range?",
      "\\text{Range} = 7 - 0",
      "7",
      "Maximum value = 7, minimum value = 0. Range = 7 − 0 = 7.",
      []
    ),
    answer(
      "y7-dat-int-m5",
      "A line graph shows website visitors: Mon 120, Tue 145, Wed 130, Thu 160, Fri 155, Sat 200, Sun 185. On which day were visitors highest? Write the day name.",
      "\\text{Values: Mon 120, Tue 145, Wed 130, Thu 160, Fri 155, Sat 200, Sun 185}",
      "Saturday",
      "Comparing all values: the maximum is 200, which occurred on Saturday. Saturday had the highest number of visitors.",
      ["Sat", "saturday"]
    ),
    choice(
      "y7-dat-int-m6",
      "A dot plot of students' scores shows a large cluster between 60 and 75, with one isolated dot at 20. What term best describes the dot at 20?",
      "B",
      ["The mode", "An outlier", "The median", "The range"],
      "The dot at 20 is far below the main cluster (60–75) and is isolated — this is the definition of an outlier."
    ),
    answer(
      "y7-dat-int-m7",
      "A column graph shows: Monday 18 absences, Tuesday 12, Wednesday 8, Thursday 14, Friday 22. What is the mean number of absences per day? Give your answer as a decimal.",
      "\\text{Mean} = \\frac{18 + 12 + 8 + 14 + 22}{5}",
      "14.8",
      "Total = 18 + 12 + 8 + 14 + 22 = 74. Mean = 74 ÷ 5 = 14.8 absences per day.",
      ["14.8"]
    ),
    answer(
      "y7-dat-int-m8",
      "A back-to-back stem-and-leaf plot comparing Class A and Class B shows: Class A left: stem 7, leaves 9 6 3 0. Class B right: stem 7, leaves 2 4 5 8. What is the highest score in Class A?",
      "\\text{Class A stem 7, leaves read outward: }0, 3, 6, 9 \\rightarrow 70, 73, 76, 79",
      "79",
      "Class A leaves read from the stem outward: 0, 3, 6, 9, giving values 70, 73, 76, 79. The highest score in Class A is 79.",
      []
    ),
    answer(
      "y7-dat-int-m9",
      "A stem-and-leaf plot shows scores: 4 | 5 8, 5 | 2 6 6 9, 6 | 0 3 7, 7 | 1. There are 10 values. Identify the score that appears to cluster the most (the modal class range). What is the stem of this row?",
      "\\text{Row with most leaves: }5|2\\;6\\;6\\;9\\text{ has 4 leaves}",
      "5",
      "Count leaves per stem: stem 4 has 2 leaves, stem 5 has 4 leaves, stem 6 has 3 leaves, stem 7 has 1 leaf. Stem 5 has the most values — the data clusters in the 50–59 range. The stem is 5.",
      []
    ),
    choice(
      "y7-dat-int-m10",
      "A student records the brand of phone owned by each of 30 classmates and wants to display the results. Which graph type is best?",
      "A",
      [
        "Column graph — phone brand is categorical data, so bars for each category are appropriate.",
        "Line graph — there are 30 data points so a line graph handles large datasets.",
        "Stem-and-leaf plot — this always works for any dataset size.",
        "Dot plot — dots are easier to draw than bars.",
      ],
      "Phone brand is categorical data. A column graph (one bar per brand, height = frequency) is the correct display. A line graph requires continuous or time data; stem-and-leaf and dot plots are for numerical data."
    ),
  ],
  masteryQuizPool: [
    pChoice("y7-dat-int-p1", "Which display best suits categorical data such as favourite colour?", 1, "A", ["Column graph", "Line graph", "Stem-and-leaf plot", "Scatter plot"], "Categorical data is shown with a column or bar graph, one bar per category."),
    pChoice("y7-dat-int-p2", "Which display best suits data measured over time?", 1, "B", ["Bar graph", "Line graph", "Dot plot", "Stem-and-leaf plot"], "A line graph shows how a value changes over time."),
    pAns("y7-dat-int-p3", "A dot plot has values clustered at 5, 6, 7 with one dot at 20. What value is the outlier?", "\\text{Cluster 5–7, isolated 20}", 1, "20", "The dot at 20 is far from the cluster, so it is the outlier.", []),
    pChoice("y7-dat-int-p4", "Which display shows every individual value for a small numerical dataset?", 1, "C", ["Pie chart", "Bar graph", "Stem-and-leaf plot", "Line graph"], "A stem-and-leaf plot displays every individual value while showing the distribution."),
    pAns("y7-dat-int-p5", "A line graph shows temperatures 30, 28, 25, 21, 18. Is the trend increasing or decreasing? Type 'increasing' or 'decreasing'.", "\\text{Values: }30, 28, 25, 21, 18", 2, "decreasing", "The values fall steadily, so the trend is decreasing.", ["Decreasing"]),
    pAns("y7-dat-int-p6", "A back-to-back stem-and-leaf plot has stem 4 in the middle. Group A (left) leaves: 6 2. What is the lowest value in Group A?", "\\text{Left leaves read outward: }2, 6", 2, "42", "Left-side leaves read from the stem outward: 42, 46. The lowest is 42.", []),
    pAns("y7-dat-int-p7", "A dot plot shows scores 3 (2 dots), 4 (5 dots), 5 (3 dots). What is the mode?", "\\text{Dots: }3\\times2,\\ 4\\times5,\\ 5\\times3", 2, "4", "The value 4 has the most dots (5), so it is the mode.", []),
    pChoice("y7-dat-int-p8", "A teacher wants to compare the spread of marks in two classes. Which display is best?", 2, "D", ["Two pie charts", "A single column graph", "A line graph", "A back-to-back stem-and-leaf plot"], "A back-to-back stem-and-leaf plot puts both groups on a shared stem, ideal for comparing two distributions."),
    pAns("y7-dat-int-p9", "A dot plot shows daily emails: 10 (1 dot), 11 (3 dots), 12 (5 dots), 13 (2 dots). What is the range?", "\\text{Min }10,\\ \\text{max }13", 3, "3", "Maximum 13, minimum 10. Range = 13 − 10 = 3.", []),
    pAns("y7-dat-int-p10", "A column graph shows sales Mystery 40, Romance 55, Sci-Fi 30, Fantasy 60. Which genre has the second-highest sales? Give the sales value.", "\\text{Sales: }40, 55, 30, 60", 3, "55", "Ranked: Fantasy 60, Romance 55, Mystery 40, Sci-Fi 30. Second highest is 55 (Romance).", ["Romance"]),
    pAns("y7-dat-int-p11", "A line graph shows visitors Mon 100, Tue 130, Wed 110, Thu 150, Fri 140. On which day were visitors highest? Write the day name.", "\\text{Values: }100, 130, 110, 150, 140", 3, "Thursday", "The maximum is 150 on Thursday.", ["Thu", "thursday"]),
    pChoice("y7-dat-int-p12", "A dataset of 30 students' favourite sports is to be displayed. Why is a line graph inappropriate?", 3, "B", ["There are too many students", "Favourite sport is categorical, with no order for a line to show", "Line graphs need exactly 5 points", "Line graphs cannot show 30 values"], "Favourite sport is categorical with no natural order, so connecting categories with a line is meaningless."),
    pAns("y7-dat-int-p13", "A back-to-back stem-and-leaf plot has stem 7 in the middle. Group A (left) leaves: 8 5 1. What is the median of Group A (3 values)?", "\\text{Group A: }71, 75, 78", 3, "75", "Group A in order: 71, 75, 78. The median (middle) is 75.", []),
    pAns("y7-dat-int-p14", "A dot plot shows test scores 6 (1 dot), 7 (4 dots), 8 (3 dots), 9 (2 dots). How many students are there in total?", "1 + 4 + 3 + 2", 3, "10", "Total dots = 1 + 4 + 3 + 2 = 10 students.", []),
    pChoice("y7-dat-int-p15", "A dot plot of weights has a large cluster at 50–55 kg and one isolated dot at 90 kg. What term describes 90 kg?", 3, "A", ["Outlier", "Mode", "Median", "Mean"], "90 kg is far from the cluster and isolated — it is an outlier."),
    pAns("y7-dat-int-p16", "A column graph shows absences Mon 5, Tue 9, Wed 4, Thu 7, Fri 10. What is the mean number of absences per day? Give your answer as a decimal.", "\\frac{5+9+4+7+10}{5}", 4, "7", "Total = 35. Mean = 35 ÷ 5 = 7.", ["7.0"]),
    pAns("y7-dat-int-p17", "A back-to-back stem-and-leaf plot on stem 6 shows Class A (left) leaves 8 5 2 and Class B (right) leaves 0 3 4 7 9. Which class has more students in the 60s? Type 'A' or 'B'.", "\\text{A: }3\\text{ leaves};\\ B: 5\\text{ leaves}", 4, "B", "Class A has 3 leaves on stem 6; Class B has 5. Class B has more students in the 60s.", ["Class B"]),
    pAns("y7-dat-int-p18", "A dot plot shows goals 0 (1 dot), 1 (4 dots), 2 (3 dots), 7 (1 dot). Excluding the outlier at 7, what is the range of the remaining values?", "\\text{Remaining: }0\\text{ to }2", 4, "2", "Without the outlier (7), values range from 0 to 2. Range = 2 − 0 = 2.", []),
    pAns("y7-dat-int-p19", "A stem-and-leaf plot shows 4 | 2 5, 5 | 1 1 6 8, 6 | 0 3, 7 | 4. Which stem is the modal class (most leaves)? Give the stem number.", "\\text{Leaves per stem: }2, 4, 2, 1", 4, "5", "Stem 5 has the most leaves (4), so it is the modal class (50–59).", []),
    pAns("y7-dat-int-p20", "A line graph shows savings Week 1 $20, Week 2 $50, Week 3 $40, Week 4 $90. Between which two consecutive weeks was the increase greatest? Write the weeks as e.g. 3-4.", "\\text{Changes: }+30, -10, +50", 4, "3-4", "Changes: +30, −10, +50. The greatest increase (+50) is between Week 3 and Week 4.", ["weeks 3-4", "3 and 4", "3–4"]),
    pAns("y7-dat-int-p21", "Two classes' test medians are compared on a back-to-back stem-and-leaf plot. Class A values: 62, 67, 71, 75, 80. Class B values: 58, 64, 70, 73, 79. What is the difference between the two medians?", "\\text{A median }71,\\ \\text{B median }70", 5, "1", "Class A (5 values) median = 71; Class B median = 70. Difference = 71 − 70 = 1.", []),
    pChoice("y7-dat-int-p22", "A dataset has values 4, 5, 5, 6, 6, 6, 7, 40. Which single statistic is most distorted by the value 40?", 5, "C", ["The mode", "The median", "The mean", "The range is unaffected"], "The mean is pulled upward by the large outlier 40, while the mode and median stay near the cluster. (The range is also affected, but the mean is most distorted as a measure of centre.)"),
    pAns("y7-dat-int-p23", "A dot plot of 11 reaction times has a cluster from 0.3 to 0.5 s and one value at 1.2 s. After removing the 1.2 s outlier, 10 values remain with a total of 4.0 s. What is the mean of the remaining values in seconds? Give your answer as a decimal.", "\\frac{4.0}{10}", 5, "0.4", "Mean = 4.0 ÷ 10 = 0.4 seconds.", [".4", "0.40"]),
    pChoice("y7-dat-int-p24", "A student displays continuous height data of 12 students. Which two displays are both appropriate?", 5, "B", ["Pie chart and line graph", "Stem-and-leaf plot and dot plot", "Bar graph and line graph", "Column graph and pie chart"], "For a small numerical dataset, both a stem-and-leaf plot and a dot plot show all individual values and the distribution."),
    pAns("y7-dat-int-p25", "A column graph shows four genres with sales 25, 40, 15, 20 (total 100). A student claims the modal genre makes up exactly two-fifths of all sales. Is the student correct? Type 'yes' or 'no'.", "\\frac{40}{100}", 5, "yes", "The modal (largest) genre has 40 of 100 sales = 0.4 = two-fifths, so the claim is correct.", ["Yes"]),
  ],
  multiPartPractice: [
    {
      id: "y7-dat-int-mp1",
      prompt:
        "A dot plot shows the number of books read last month by a class: 0 books (1 dot), 1 book (3 dots), 2 books (6 dots), 3 books (3 dots), 9 books (1 dot). Use the dot plot for each part.",
      latex: "0\\times1,\\ 1\\times3,\\ 2\\times6,\\ 3\\times3,\\ 9\\times1",
      answer: "14",
      hint: "Total = sum of dots; mode = tallest stack; the isolated high value is the outlier; range = max − min.",
      explanation:
        "(a) Total students = 1 + 3 + 6 + 3 + 1 = 14. (b) The value 2 has the most dots (6), so the mode is 2. (c) The value 9 is isolated far above the cluster (0–3), so it is the outlier. (d) Range = 9 − 0 = 9.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many students are in the class?",
          marks: 1,
          answer: "14",
          acceptedAnswers: [],
          hint: "Add the number of dots at every value.",
          explanation: "1 + 3 + 6 + 3 + 1 = 14 students.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the mode number of books read?",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "Find the value with the most dots.",
          explanation: "The value 2 has 6 dots — the tallest stack — so the mode is 2.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Which value is an outlier?",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "Which value is far from the main cluster?",
          explanation: "The value 9 is isolated well above the cluster of 0–3, so it is the outlier.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "What is the range of the data?",
          latex: "\\text{Range} = \\text{max} - \\text{min}",
          marks: 1,
          answer: "9",
          acceptedAnswers: [],
          hint: "Subtract the smallest value from the largest.",
          explanation: "Largest = 9, smallest = 0. Range = 9 − 0 = 9.",
        },
      ],
    },
  ],
};

// ─── Lesson registry ─────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "data-types-and-collection": dataTypesAndCollection,
  "frequency-tables": frequencyTables,
  "dot-plots-stem-and-leaf": dotPlotsStemAndLeaf,
  "column-bar-line-graphs": columnBarLineGraphs,
  "choosing-and-interpreting-displays": choosingAndInterpretingDisplays,
};

// ─── Export function ──────────────────────────────────────────────────────────

export function year7DataLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "data") {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Statistics and Probability",
    masteryPassMark: 0.8,
    ...content,
  };
}
