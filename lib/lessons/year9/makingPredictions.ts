import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

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

const equivalentProbabilities: Record<string, string[]> = {
  "0": ["0%", "0/1"],
  "1": ["100%", "1/1"],
  "1/10": ["0.1", "10%"],
  "1/8": ["0.125", "12.5%"],
  "1/6": [],
  "1/5": ["0.2", "20%"],
  "1/4": ["0.25", "25%"],
  "3/10": ["0.3", "30%"],
  "1/3": [],
  "3/8": ["0.375", "37.5%"],
  "2/5": ["0.4", "40%"],
  "1/2": ["0.5", "50%"],
  "3/5": ["0.6", "60%"],
  "5/8": ["0.625", "62.5%"],
  "2/3": [],
  "7/10": ["0.7", "70%"],
  "3/4": ["0.75", "75%"],
  "4/5": ["0.8", "80%"],
  "5/6": [],
  "7/8": ["0.875", "87.5%"],
  "9/10": ["0.9", "90%"],
};

function terminatingFractionVariants(answer: string) {
  const match = answer.match(/^(\d+)\/(\d+)$/);
  if (!match) return [];

  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  let remainingDenominator = denominator;

  while (remainingDenominator % 2 === 0) remainingDenominator /= 2;
  while (remainingDenominator % 5 === 0) remainingDenominator /= 5;

  if (remainingDenominator !== 1) return [];

  const decimal = Number((numerator / denominator).toPrecision(12));
  const percentage = Number((decimal * 100).toPrecision(12));
  return [String(decimal), `${percentage}%`];
}

function probability(id: string, prompt: string, latex: string, answer: string, explanation: string, acceptedAnswers: string[] = []): PracticeQuestion {
  const displayLatex = /-(?:g|i)\d+$/.test(id) ? "" : latex;
  return {
    id,
    prompt,
    latex: displayLatex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...(equivalentProbabilities[answer] ?? []), ...terminatingFractionVariants(answer), ...acceptedAnswers])),
    hint: "Identify the possible outcomes and the favourable outcomes before calculating.",
    explanation,
  };
}

function number(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const displayLatex = /-(?:g|i)\d+$/.test(id)
    ? ""
    : latex;
  const autoVariants: string[] = [];
  const numericValue = Number(answer);
  if (Number.isFinite(numericValue) && Number.isInteger(numericValue)) {
    autoVariants.push(numericValue.toFixed(1));
  }
  return {
    id,
    prompt,
    latex: displayLatex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...autoVariants])),
    hint: "List or count the outcomes carefully.",
    explanation,
  };
}

function choice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = ""): PracticeQuestion {
  return { id, prompt, latex, choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })), answer, hint: "Compare each option with the experiment described.", explanation };
}

const simpleComplementary: LessonContent = {
  description: "Calculate simple probabilities, interpret the probability scale and use complementary events.",
  learningIntention: "Calculate the probability of an event and use its complement efficiently.",
  successCriteria: ["Calculate probability from favourable and total equally likely outcomes.", "Interpret impossible, unlikely, likely and certain events.", "Use the complement rule.", "Express simple probabilities as fractions, decimals or percentages."],
  teaching: {
    paragraphs: ["Probability measures how likely an event is. A probability of 0 is impossible and a probability of 1 is certain.", "When outcomes are equally likely, divide the number of favourable outcomes by the total number of outcomes.", "The complement of an event is everything that is not in the event. An event and its complement always add to 1.", "A probability can be written as a fraction, decimal or percentage. Choose a form that communicates the result clearly."],
    latexBlocks: ["P(A)=\\frac{\\text{favourable outcomes}}{\\text{total outcomes}}", "0\\leq P(A)\\leq1", "P(\\text{not }A)=1-P(A)"],
  },
  workedExamples: [
    { title: "Roll an even number", questionLatex: "\\text{A fair die is rolled. Find }P(\\text{even}).", steps: [{ explanation: "The even outcomes are 2, 4 and 6.", latex: "P(\\text{even})=\\frac{3}{6}" }, { explanation: "Simplify.", latex: "\\frac{3}{6}=\\frac12" }], finalAnswerLatex: "\\frac12" },
    { title: "Use a complement", questionLatex: "\\text{A bag contains 7 red and 3 blue counters. Find }P(\\text{not blue}).", steps: [{ explanation: "First find the probability of blue.", latex: "P(\\text{blue})=\\frac{3}{10}" }, { explanation: "Subtract from 1.", latex: "P(\\text{not blue})=1-\\frac{3}{10}=\\frac{7}{10}" }], finalAnswerLatex: "\\frac{7}{10}" },
    { title: "Recognise an impossible event", questionLatex: "\\text{A standard die is rolled. Find }P(\\text{rolling }9).", steps: [{ explanation: "A standard die has outcomes 1 to 6 only.", latex: "9\\notin\\{1,2,3,4,5,6\\}" }, { explanation: "The event cannot happen.", latex: "P(9)=0" }], finalAnswerLatex: "0" },
  ],
  guidedPractice: [
    probability("y9-pred-simple-g1", "A fair die is rolled. Find the probability of rolling a 5.", "P(5)=\\frac16", "1/6", "There is one favourable outcome out of six."),
    probability("y9-pred-simple-g2", "A fair coin is tossed. Find the probability of not getting heads.", "P(\\text{not H})=1-\\frac12", "1/2", "Not heads means tails."),
    probability("y9-pred-simple-g3", "A bag contains 4 green and 6 yellow counters. Find the probability of selecting green.", "P(\\text{green})=\\frac{4}{10}", "2/5", "There are 4 green counters out of 10."),
    choice("y9-pred-simple-g4", "Which probability represents a certain event?", "D", ["0", "0.25", "0.8", "1"], "A certain event has probability 1."),
  ],
  independentPractice: [
    probability("y9-pred-simple-i1", "A fair die is rolled. Find the probability of rolling a number greater than 4.", "P(>4)=\\frac26", "1/3", "The favourable outcomes are 5 and 6.", ["2/6"]),
    probability("y9-pred-simple-i2", "A bag contains 2 red, 5 blue and 3 white counters. Find the probability of not selecting blue.", "P(\\text{not blue})=1-\\frac{5}{10}", "1/2", "Five of the ten counters are not blue."),
    choice("y9-pred-simple-i3", "Which event is impossible when rolling a standard die?", "C", ["Rolling an odd number", "Rolling a number below 3", "Rolling a 7", "Rolling a factor of 6"], "A standard die has no 7."),
    probability("y9-pred-simple-i4", "A spinner has 8 equal sectors: 3 orange and 5 purple. Find the probability of not landing on orange.", "P(\\text{not orange})=1-\\frac38", "5/8", "Five of the eight sectors are not orange."),
    choice("y9-pred-simple-i5", "Which probability is closest to a likely but not certain event?", "C", ["0", "0.1", "0.8", "1"], "A probability near 1 but below 1 is likely but not certain."),
  ],
  commonMistakes: [
    { mistake: "Dividing total outcomes by favourable outcomes.", fix: "Place favourable outcomes over total outcomes." },
    { mistake: "Treating an unlikely event as impossible.", fix: "Impossible means probability exactly 0." },
    { mistake: "Adding when using a complement.", fix: "Subtract the known probability from 1." },
    { mistake: "Counting outcomes that do not satisfy the event.", fix: "List the favourable outcomes before forming the fraction." },
  ],
  masteryQuiz: [
    probability("y9-pred-simple-m1", "A fair die is rolled. Find the probability of rolling an even number.", "P(\\text{even})=\\frac36", "1/2", "Three of the six outcomes are even."),
    probability("y9-pred-simple-m2", "A bag contains 3 black and 7 white counters. Find the probability of selecting black.", "P(\\text{black})=\\frac{3}{10}", "3/10", "There are 3 black counters out of 10."),
    choice("y9-pred-simple-m3", "Which probability represents an impossible event?", "A", ["0", "0.2", "0.5", "1"], "Impossible events have probability 0."),
    probability("y9-pred-simple-m4", "A spinner has 5 equal sectors, one labelled A. Find the probability of not landing on A.", "P(\\text{not A})=1-\\frac15", "4/5", "Four sectors are not A."),
    choice("y9-pred-simple-m5", "Which value cannot be a probability?", "D", ["0", "0.45", "1", "1.2"], "Probabilities must be between 0 and 1 inclusive."),
    probability("y9-pred-simple-m6", "A card numbered 1 to 10 is selected at random. Find the probability of selecting a number below 4.", "P(<4)=\\frac{3}{10}", "3/10", "The favourable cards are 1, 2 and 3."),
    probability("y9-pred-simple-m7", "The probability of rain is 0.3. Find the probability that it does not rain.", "P(\\text{not rain})=1-0.3", "0.7", "Subtract the probability of rain from 1.", ["7/10", "70%"]),
    probability("y9-pred-simple-m8", "A bag contains 5 red, 4 blue and 1 green counter. Find the probability of selecting neither red nor green.", "P(\\text{blue})=\\frac{4}{10}", "2/5", "Neither red nor green means blue."),
    probability("y9-pred-simple-m9", "The probability that a bus is late is 1/8. Find the probability that it is not late.", "P(\\text{not late})=1-\\frac18", "7/8", "Subtract one eighth from 1."),
    choice("y9-pred-simple-m10", "An event has probability 0.62. Which description is best?", "C", ["Impossible", "Unlikely", "More likely than not, but not certain", "Certain"], "The probability is above 0.5 and below 1."),
  ],
};

const sampleSpaces: LessonContent = {
  description: "List and count sample spaces for simple one-stage and two-stage experiments.",
  learningIntention: "Build complete sample spaces and use them to calculate probabilities.",
  successCriteria: ["List every possible outcome once.", "Use tables or ordered pairs for two-stage experiments.", "Count favourable outcomes from a sample space.", "Avoid double-counting."],
  teaching: {
    paragraphs: ["A sample space is the list of all possible outcomes of an experiment.", "For a two-stage experiment, ordered pairs make the order clear. A table can help ensure that every combination appears once.", "Outcomes such as heads then tails and tails then heads are different when order matters.", "After building the sample space, count favourable outcomes and divide by the total."],
    latexBlocks: ["S=\\{\\text{all possible outcomes}\\}", "P(A)=\\frac{n(A)}{n(S)}"],
  },
  workedExamples: [
    { title: "Two coins", questionLatex: "\\text{Two fair coins are tossed. List the sample space and find }P(\\text{exactly one head}).", steps: [{ explanation: "List the ordered outcomes.", latex: "S=\\{HH,HT,TH,TT\\}" }, { explanation: "HT and TH are favourable.", latex: "P(\\text{exactly one H})=\\frac24=\\frac12" }], finalAnswerLatex: "\\frac12" },
    { title: "Coin and die", questionLatex: "\\text{A coin and die are used. Find }P(\\text{heads and an even number}).", steps: [{ explanation: "There are 2 times 6 equally likely outcomes.", latex: "n(S)=12" }, { explanation: "The favourable outcomes are H2, H4 and H6.", latex: "P=\\frac{3}{12}=\\frac14" }], finalAnswerLatex: "\\frac14" },
    { title: "Two dice sum", questionLatex: "\\text{Two fair dice are rolled. Find }P(\\text{sum }7).", steps: [{ explanation: "There are 36 ordered outcomes.", latex: "n(S)=6\\times6=36" }, { explanation: "Six ordered pairs sum to 7.", latex: "P=\\frac{6}{36}=\\frac16" }], finalAnswerLatex: "\\frac16" },
  ],
  guidedPractice: [
    number("y9-pred-space-g1", "Two coins are tossed. How many outcomes are in the sample space?", "n(S)=4", "4", "The outcomes are HH, HT, TH and TT."),
    probability("y9-pred-space-g2", "Two fair coins are tossed. Find the probability of two tails.", "P(TT)=\\frac14", "1/4", "Only TT is favourable."),
    number("y9-pred-space-g3", "A coin and a four-sided spinner are used. How many ordered outcomes are possible?", "n(S)=2\\times4", "8", "Multiply the number of coin outcomes by the number of spinner outcomes."),
    choice("y9-pred-space-g4", "Which list is the complete sample space for two coin tosses?", "B", ["HH, HT, TT", "HH, HT, TH, TT", "H, T", "HH, TT"], "Order matters, so both HT and TH are included."),
  ],
  independentPractice: [
    probability("y9-pred-space-i1", "Two fair coins are tossed. Find the probability of at least one head.", "P=\\frac34", "3/4", "HH, HT and TH are favourable."),
    number("y9-pred-space-i2", "A fair die and a coin are used. How many ordered outcomes are possible?", "n(S)=6\\times2", "12", "Multiply 6 by 2."),
    probability("y9-pred-space-i3", "A coin and a fair die are used. Find the probability of tails and a number above 4.", "P=\\frac{2}{12}", "1/6", "The favourable outcomes are T5 and T6.", ["2/12"]),
    choice("y9-pred-space-i4", "Why are HT and TH both included when two coins are tossed in order?", "C", ["They have different probabilities", "They both mean two heads", "The order of the results is different", "One of them is impossible"], "The first and second toss positions differ."),
    probability("y9-pred-space-i5", "Two fair dice are rolled. Find the probability that the sum is 2.", "P=\\frac{1}{36}", "1/36", "Only the ordered pair (1, 1) is favourable."),
  ],
  commonMistakes: [
    { mistake: "Leaving out an ordered outcome such as TH.", fix: "List outcomes systematically using positions or a table." },
    { mistake: "Treating HT and TH as the same outcome.", fix: "Keep the order when stages occur one after another." },
    { mistake: "Assuming all sums from two dice are equally likely.", fix: "Count the ordered pairs that produce each sum." },
    { mistake: "Double-counting an outcome.", fix: "Use a table or ordered list so each combination appears once." },
  ],
  masteryQuiz: [
    number("y9-pred-space-m1", "Two coins are tossed. How many ordered outcomes are possible?", "n(S)=2^2", "4", "There are four ordered outcomes."),
    probability("y9-pred-space-m2", "Two fair coins are tossed. Find the probability of HH.", "P(HH)=\\frac14", "1/4", "One of the four outcomes is HH."),
    number("y9-pred-space-m3", "A coin and a six-sided die are used. How many outcomes are possible?", "n(S)=2\\times6", "12", "Multiply the choices for each stage."),
    probability("y9-pred-space-m4", "A coin and a fair die are used. Find the probability of heads and a number below 3.", "P=\\frac{2}{12}", "1/6", "The favourable outcomes are H1 and H2.", ["2/12"]),
    choice("y9-pred-space-m5", "Which sample space is complete for a spinner labelled A or B used twice?", "D", ["AA, BB", "A, B", "AA, AB, BB", "AA, AB, BA, BB"], "The two mixed ordered outcomes are both needed."),
    probability("y9-pred-space-m6", "Two fair dice are rolled. Find the probability of a sum of 12.", "P=\\frac{1}{36}", "1/36", "Only (6, 6) is favourable."),
    probability("y9-pred-space-m7", "Two fair dice are rolled. Find the probability of a sum of 6.", "P=\\frac{5}{36}", "5/36", "The favourable pairs are (1,5), (2,4), (3,3), (4,2) and (5,1)."),
    number("y9-pred-space-m8", "A spinner has 3 equal sectors and a die has 6 faces. How many ordered spinner-die outcomes are possible?", "n(S)=3\\times6", "18", "Multiply the outcomes for the two stages."),
    probability("y9-pred-space-m9", "Two fair dice are rolled. Find the probability that the sum is 5 or 6.", "P=\\frac{4+5}{36}", "1/4", "Four pairs sum to 5 and five pairs sum to 6, giving 9 out of 36."),
    probability("y9-pred-space-m10", "Two fair coins are tossed and a fair die is rolled. Find the probability of exactly one head and an even die result.", "P=\\frac{2\\times3}{4\\times6}", "1/4", "There are 6 favourable outcomes out of 24."),
  ],
};

const multiStage: LessonContent = {
  description: "Calculate probabilities for two-stage experiments by multiplying along paths and adding successful paths.",
  learningIntention: "Combine probabilities across stages of a chance experiment.",
  successCriteria: ["Multiply probabilities along a path.", "Add separate successful paths.", "Use replacement contexts correctly.", "Describe a multi-stage event clearly."],
  teaching: {
    paragraphs: ["A multi-stage experiment has more than one step, such as tossing a coin and then rolling a die.", "For a specific path, multiply the probability at each stage.", "If an event can happen along separate paths, find each path probability and add the successful paths.", "With replacement means the first selected item is returned before the next draw, so the probabilities remain the same."],
    latexBlocks: ["P(A\\text{ then }B)=P(A)\\times P(B)", "P(\\text{successful paths})=P(\\text{path }1)+P(\\text{path }2)+\\cdots"],
  },
  workedExamples: [
    { title: "Coin then die", questionLatex: "\\text{Find }P(\\text{heads then rolling }6).", steps: [{ explanation: "Multiply along the single path.", latex: "P(H\\text{ then }6)=\\frac12\\times\\frac16" }, { explanation: "Simplify.", latex: "P=\\frac{1}{12}" }], finalAnswerLatex: "\\frac{1}{12}" },
    {
      title: "Two spins",
      questionLatex: "\\text{A spinner has equal red and blue sectors. Find }P(\\text{red twice}).",
      steps: [{ explanation: "Each spin has red probability one half.", latex: "P(RR)=\\frac12\\times\\frac12" }, { explanation: "Multiply.", latex: "P(RR)=\\frac14" }],
      finalAnswerLatex: "\\frac14",
      probabilityTreeDiagram: {
        description: "Two-stage spinner tree. The highlighted red-red path shows that the unchanged one-half branch probability is multiplied twice.",
        rootLabel: "spinner",
        stages: ["first spin", "second spin"],
        branches: [
          { id: "R", label: "red", probability: "1/2", children: [{ id: "R", label: "red", probability: "1/2" }, { id: "B", label: "blue", probability: "1/2" }] },
          { id: "B", label: "blue", probability: "1/2", children: [{ id: "R", label: "red", probability: "1/2" }, { id: "B", label: "blue", probability: "1/2" }] },
        ],
        highlightedPaths: [["R", "R"]],
      },
    },
    {
      title: "Add two successful paths",
      questionLatex: "\\text{Two fair coins are tossed. Find }P(\\text{exactly one head}).",
      steps: [{ explanation: "The successful paths are HT and TH.", latex: "P(HT)=\\frac14,\\quad P(TH)=\\frac14" }, { explanation: "Add the separate paths.", latex: "P(\\text{exactly one H})=\\frac14+\\frac14=\\frac12" }],
      finalAnswerLatex: "\\frac12",
      probabilityTreeDiagram: {
        description: "Two-stage fair-coin tree. The highlighted heads-tails and tails-heads paths are the separate successful paths for exactly one head.",
        rootLabel: "start",
        stages: ["first toss", "second toss"],
        branches: [
          { id: "H", label: "heads", probability: "1/2", children: [{ id: "H", label: "heads", probability: "1/2" }, { id: "T", label: "tails", probability: "1/2" }] },
          { id: "T", label: "tails", probability: "1/2", children: [{ id: "H", label: "heads", probability: "1/2" }, { id: "T", label: "tails", probability: "1/2" }] },
        ],
        highlightedPaths: [["H", "T"], ["T", "H"]],
      },
    },
  ],
  guidedPractice: [
    probability("y9-pred-multi-g1", "A fair coin is tossed and a fair die is rolled. Find the probability of tails then rolling a 2.", "P=\\frac12\\times\\frac16", "1/12", "Multiply the probabilities along the path."),
    probability("y9-pred-multi-g2", "A spinner has equal red and blue sectors. It is spun twice. Find the probability of blue twice.", "P=\\frac12\\times\\frac12", "1/4", "Multiply the two blue probabilities."),
    probability("y9-pred-multi-g3", "A bag has 3 red and 2 blue counters. A counter is drawn, replaced, then another is drawn. Find the probability of red twice.", "P=\\frac35\\times\\frac35", "9/25", "Replacement keeps the probability of red at three fifths."),
    choice("y9-pred-multi-g4", "Which operation is used along one path of a multi-stage experiment?", "B", ["Add", "Multiply", "Subtract", "Round"], "Multiply probabilities along a path."),
  ],
  independentPractice: [
    probability("y9-pred-multi-i1", "A fair coin is tossed twice. Find the probability of two heads.", "P=\\frac12\\times\\frac12", "1/4", "Multiply the two head probabilities."),
    probability("y9-pred-multi-i2", "A spinner has 3 equal sectors: red, blue and green. It is spun twice. Find the probability of green then red.", "P=\\frac13\\times\\frac13", "1/9", "Multiply the probabilities for the required path."),
    probability("y9-pred-multi-i3", "A bag has 4 yellow and 1 purple counter. A counter is drawn, replaced, then another is drawn. Find the probability of purple twice.", "P=\\frac15\\times\\frac15", "1/25", "Replacement keeps the second purple probability at one fifth."),
    probability("y9-pred-multi-i4", "Two fair coins are tossed. Find the probability of one head and one tail in any order.", "P(HT)+P(TH)=\\frac14+\\frac14", "1/2", "Add the two successful paths."),
    choice("y9-pred-multi-i5", "When should separate successful paths be added?", "C", ["Before listing outcomes", "Only when an event is impossible", "When any one of the separate paths satisfies the event", "Whenever replacement occurs"], "Add distinct paths that each produce success."),
  ],
  commonMistakes: [
    { mistake: "Adding probabilities along one path.", fix: "Multiply along a path." },
    { mistake: "Forgetting a second successful path.", fix: "List each way the event can occur, then add those paths." },
    { mistake: "Changing probabilities after replacement.", fix: "Replacement restores the original contents." },
    { mistake: "Multiplying by a probability from the wrong stage.", fix: "Read the event in order and match each factor to its stage." },
  ],
  masteryQuiz: [
    probability("y9-pred-multi-m1", "A coin is tossed and a die is rolled. Find the probability of heads then rolling 3.", "P=\\frac12\\times\\frac16", "1/12", "Multiply along the path."),
    probability("y9-pred-multi-m2", "A spinner has 4 equal sectors, one gold. It is spun twice. Find the probability of gold twice.", "P=\\frac14\\times\\frac14", "1/16", "Multiply the gold probabilities."),
    choice("y9-pred-multi-m3", "Which expression finds the probability of heads then tails for two fair coins?", "A", ["1/2 x 1/2", "1/2 + 1/2", "1 - 1/2", "2 x 1/2 + 1/2"], "Multiply along the specified path."),
    probability("y9-pred-multi-m4", "A bag has 2 red and 3 blue counters. A counter is drawn, replaced, then another is drawn. Find the probability of blue twice.", "P=\\frac35\\times\\frac35", "9/25", "Replacement keeps both probabilities at three fifths."),
    probability("y9-pred-multi-m5", "Two fair coins are tossed. Find the probability of at least one head.", "P(HH)+P(HT)+P(TH)=\\frac34", "3/4", "Three of the four paths include at least one head."),
    probability("y9-pred-multi-m6", "A fair die is rolled twice. Find the probability of rolling a 6 twice.", "P=\\frac16\\times\\frac16", "1/36", "Multiply the probabilities."),
    probability("y9-pred-multi-m7", "A spinner has equal red and blue sectors and is spun twice. Find the probability of different colours.", "P(RB)+P(BR)=\\frac14+\\frac14", "1/2", "Add the red-blue and blue-red paths."),
    probability("y9-pred-multi-m8", "A bag has 3 red and 1 blue counter. A counter is drawn, replaced, then another is drawn. Find the probability of exactly one blue.", "P(BR)+P(RB)=\\frac14\\times\\frac34+\\frac34\\times\\frac14", "3/8", "Add the blue-red and red-blue paths."),
    probability("y9-pred-multi-m9", "A fair coin is tossed three times. Find the probability of three heads.", "P(HHH)=\\left(\\frac12\\right)^3", "1/8", "Multiply one half three times."),
    probability("y9-pred-multi-m10", "A fair coin is tossed twice and a fair die is rolled. Find the probability of exactly one head and an even die result.", "P=\\frac12\\times\\frac12", "1/4", "Exactly one head has probability one half and an even die result has probability one half."),
  ],
};

const independentEvents: LessonContent = {
  description: "Recognise independent events and calculate their combined probabilities.",
  learningIntention: "Identify when one event does not change another and multiply independent probabilities.",
  successCriteria: ["Explain independence in context.", "Multiply independent event probabilities.", "Recognise replacement contexts.", "Distinguish independent events from dependent events."],
  teaching: {
    paragraphs: ["Two events are independent when the result of one event does not change the probability of the other.", "Separate coin tosses, separate die rolls and draws with replacement are common independent experiments.", "For independent events joined by and, multiply the probabilities.", "Do not assume events are independent. Ask whether the first result changes the second probability."],
    latexBlocks: ["P(A\\text{ and }B)=P(A)\\times P(B)\\quad\\text{for independent events}"],
  },
  workedExamples: [
    { title: "Coin and die", questionLatex: "\\text{Find }P(\\text{heads and an even die result}).", steps: [{ explanation: "The coin does not affect the die.", latex: "P(H)=\\frac12,\\quad P(\\text{even})=\\frac12" }, { explanation: "Multiply independent probabilities.", latex: "P=\\frac12\\times\\frac12=\\frac14" }], finalAnswerLatex: "\\frac14" },
    { title: "Two spins", questionLatex: "\\text{A spinner lands on red with probability }\\frac14.\\text{ Find }P(\\text{red on both of two spins}).", steps: [{ explanation: "Each spin is independent.", latex: "P(RR)=\\frac14\\times\\frac14" }, { explanation: "Multiply.", latex: "P(RR)=\\frac{1}{16}" }], finalAnswerLatex: "\\frac{1}{16}" },
    { title: "Replacement preserves independence", questionLatex: "\\text{A bag has 2 red and 3 blue counters. Draw, replace and draw again. Find }P(\\text{red twice}).", steps: [{ explanation: "Replacement restores the original bag.", latex: "P(R)=\\frac25\\text{ on each draw}" }, { explanation: "Multiply.", latex: "P(RR)=\\frac25\\times\\frac25=\\frac{4}{25}" }], finalAnswerLatex: "\\frac{4}{25}" },
  ],
  guidedPractice: [
    probability("y9-pred-ind-g1", "A fair coin is tossed and a fair die is rolled. Find the probability of tails and a number above 4.", "P=\\frac12\\times\\frac26", "1/6", "The independent probabilities are one half and one third.", ["2/12"]),
    probability("y9-pred-ind-g2", "A spinner lands on green with probability 1/3. It is spun twice. Find the probability of green twice.", "P=\\frac13\\times\\frac13", "1/9", "Separate spins are independent."),
    choice("y9-pred-ind-g3", "Which experiment describes independent events?", "A", ["Toss a coin twice", "Draw two counters without replacement", "Select two students without returning the first name", "Take two cards from a pack without replacement"], "One coin toss does not change the next."),
    probability("y9-pred-ind-g4", "A bag contains 4 red and 1 blue counter. A counter is drawn, replaced, then another is drawn. Find the probability of blue twice.", "P=\\frac15\\times\\frac15", "1/25", "Replacement makes the draws independent."),
  ],
  independentPractice: [
    probability("y9-pred-ind-i1", "A fair die is rolled twice. Find the probability of rolling an even number both times.", "P=\\frac12\\times\\frac12", "1/4", "Each roll is independent."),
    probability("y9-pred-ind-i2", "A spinner lands on yellow with probability 3/5. It is spun twice. Find the probability of yellow twice.", "P=\\frac35\\times\\frac35", "9/25", "Multiply the unchanged probabilities."),
    choice("y9-pred-ind-i3", "Why are two draws with replacement independent?", "B", ["The second draw is skipped", "The original contents are restored before the second draw", "The first result is always red", "The probabilities are added"], "Replacement restores the initial probabilities."),
    probability("y9-pred-ind-i4", "A fair coin is tossed three times. Find the probability of three tails.", "P=\\left(\\frac12\\right)^3", "1/8", "Multiply one half three times."),
    probability("y9-pred-ind-i5", "A die is rolled and a coin is tossed. Find the probability of rolling a number below 3 and getting heads.", "P=\\frac26\\times\\frac12", "1/6", "Multiply one third by one half.", ["2/12"]),
  ],
  commonMistakes: [
    { mistake: "Adding probabilities for an and event.", fix: "Multiply independent probabilities when both events must occur." },
    { mistake: "Calling draws without replacement independent.", fix: "Without replacement changes the bag contents and the next probability." },
    { mistake: "Changing the second probability after replacement.", fix: "Replacement restores the original probabilities." },
    { mistake: "Assuming every two-stage experiment is independent.", fix: "Check whether the first result changes the second probability." },
  ],
  masteryQuiz: [
    probability("y9-pred-ind-m1", "A coin is tossed twice. Find the probability of two heads.", "P=\\frac12\\times\\frac12", "1/4", "Multiply independent probabilities."),
    probability("y9-pred-ind-m2", "A die is rolled twice. Find the probability of rolling 1 twice.", "P=\\frac16\\times\\frac16", "1/36", "Multiply one sixth by one sixth."),
    choice("y9-pred-ind-m3", "Which phrase signals that two draws from a bag can be independent?", "C", ["Without looking", "Without replacement", "With replacement", "With different colours"], "Replacement restores the bag."),
    probability("y9-pred-ind-m4", "A spinner lands on blue with probability 1/4. It is spun twice. Find the probability of blue twice.", "P=\\frac14\\times\\frac14", "1/16", "Multiply the two blue probabilities."),
    choice("y9-pred-ind-m5", "Which operation finds P(A and B) for independent events?", "B", ["Subtract", "Multiply", "Add", "Divide"], "Multiply independent probabilities."),
    probability("y9-pred-ind-m6", "A bag has 3 green and 2 white counters. Draw, replace and draw again. Find the probability of green twice.", "P=\\frac35\\times\\frac35", "9/25", "Replacement leaves both probabilities unchanged."),
    probability("y9-pred-ind-m7", "A fair coin is tossed and a fair die is rolled. Find the probability of tails and a number at least 5.", "P=\\frac12\\times\\frac26", "1/6", "Multiply one half by one third.", ["2/12"]),
    choice("y9-pred-ind-m8", "A counter is drawn from a bag and replaced before another draw. Which statement is correct?", "D", ["The second probability must be smaller", "The second draw has no possible outcomes", "The first counter stays outside the bag", "The original probabilities apply again"], "Replacement restores the original bag."),
    probability("y9-pred-ind-m9", "A spinner lands on red with probability 2/5. It is spun three times. Find the probability of red every time.", "P=\\left(\\frac25\\right)^3", "8/125", "Multiply two fifths three times."),
    probability("y9-pred-ind-m10", "A fair coin is tossed twice and a fair die is rolled. Find the probability of two heads and a number above 4.", "P=\\frac12\\times\\frac12\\times\\frac26", "1/12", "Multiply one half, one half and one third.", ["2/24"]),
  ],
};

const dependentEvents: LessonContent = {
  description: "Calculate probabilities for dependent events without replacement.",
  learningIntention: "Update probabilities after an outcome changes the available options.",
  successCriteria: ["Recognise dependent events.", "Update numerator and denominator after a draw without replacement.", "Multiply dependent path probabilities.", "Compare with-replacement and without-replacement contexts."],
  teaching: {
    paragraphs: ["Events are dependent when the first result changes the probability of a later result.", "Drawing without replacement changes the total number of items and may also change the number of favourable items.", "For a required path, update the second probability and multiply along the path.", "Keep this reasoning concrete: track what remains in the bag after the first draw."],
    latexBlocks: ["P(A\\text{ then }B)=P(A)\\times P(B\\text{ after }A)"],
  },
  workedExamples: [
    {
      title: "Two red counters",
      questionLatex: "\\text{A bag has 3 red and 2 blue counters. Two are drawn without replacement. Find }P(RR).",
      steps: [{ explanation: "The first red probability is three fifths.", latex: "P(R_1)=\\frac35" }, { explanation: "After one red is removed, 2 red remain among 4 counters.", latex: "P(R_2\\text{ after }R_1)=\\frac24" }, { explanation: "Multiply.", latex: "P(RR)=\\frac35\\times\\frac24=\\frac{3}{10}" }],
      finalAnswerLatex: "\\frac{3}{10}",
      probabilityTreeDiagram: {
        description: "Two-stage counter tree without replacement. The highlighted red-red path changes from three fifths to two quarters after the first red counter is removed.",
        rootLabel: "bag",
        stages: ["first draw", "second draw"],
        branches: [
          { id: "R", label: "red", probability: "3/5", children: [{ id: "R", label: "red", probability: "2/4" }, { id: "B", label: "blue", probability: "2/4" }] },
          { id: "B", label: "blue", probability: "2/5", children: [{ id: "R", label: "red", probability: "3/4" }, { id: "B", label: "blue", probability: "1/4" }] },
        ],
        highlightedPaths: [["R", "R"]],
      },
    },
    {
      title: "Two different colours",
      questionLatex: "\\text{A bag has 2 red and 3 blue counters. Find }P(R\\text{ then }B)\\text{ without replacement}.",
      steps: [{ explanation: "Draw red first.", latex: "P(R)=\\frac25" }, { explanation: "All 3 blue counters remain among 4 counters.", latex: "P(B\\text{ after }R)=\\frac34" }, { explanation: "Multiply.", latex: "P(RB)=\\frac25\\times\\frac34=\\frac{3}{10}" }],
      finalAnswerLatex: "\\frac{3}{10}",
      probabilityTreeDiagram: {
        description: "Two-stage counter tree without replacement. The highlighted red-blue path uses two fifths for red first and three quarters for blue after red is removed.",
        rootLabel: "bag",
        stages: ["first draw", "second draw"],
        branches: [
          { id: "R", label: "red", probability: "2/5", children: [{ id: "R", label: "red", probability: "1/4" }, { id: "B", label: "blue", probability: "3/4" }] },
          { id: "B", label: "blue", probability: "3/5", children: [{ id: "R", label: "red", probability: "2/4" }, { id: "B", label: "blue", probability: "2/4" }] },
        ],
        highlightedPaths: [["R", "B"]],
      },
    },
    { title: "Small card set", questionLatex: "\\text{Cards }1,2,3,4\\text{ are used. Two are drawn without replacement. Find }P(\\text{both even}).", steps: [{ explanation: "Two of four cards are even.", latex: "P(E_1)=\\frac24" }, { explanation: "One even card remains among three cards.", latex: "P(E_2\\text{ after }E_1)=\\frac13" }, { explanation: "Multiply.", latex: "P(EE)=\\frac24\\times\\frac13=\\frac16" }], finalAnswerLatex: "\\frac16" },
  ],
  guidedPractice: [
    probability("y9-pred-dep-g1", "A bag has 4 red and 1 blue counter. Two are drawn without replacement. Find the probability of two red counters.", "P=\\frac45\\times\\frac34", "3/5", "After one red is removed, 3 red remain among 4 counters."),
    probability("y9-pred-dep-g2", "A bag has 2 green and 3 yellow counters. Two are drawn without replacement. Find the probability of green then yellow.", "P=\\frac25\\times\\frac34", "3/10", "After green is removed, all 3 yellow counters remain among 4 counters."),
    choice("y9-pred-dep-g3", "What changes after a counter is drawn without replacement?", "D", ["Only the counter colour names", "Nothing", "Only the first probability", "The available counters and the total number remaining"], "The second draw uses the updated bag."),
    probability("y9-pred-dep-g4", "Cards A, B and C are used. Two are drawn without replacement. Find the probability of drawing A then B.", "P=\\frac13\\times\\frac12", "1/6", "After A is removed, B is one of two remaining cards."),
  ],
  independentPractice: [
    probability("y9-pred-dep-i1", "A bag has 3 red and 3 blue counters. Two are drawn without replacement. Find the probability of red twice.", "P=\\frac36\\times\\frac25", "1/5", "After one red, 2 red remain among 5 counters."),
    probability("y9-pred-dep-i2", "A bag has 1 green and 4 yellow counters. Two are drawn without replacement. Find the probability of green then yellow.", "P=\\frac15\\times\\frac44", "1/5", "After green is removed, every remaining counter is yellow."),
    choice("y9-pred-dep-i3", "Which experiment contains dependent events?", "C", ["Toss a coin twice", "Roll a die and toss a coin", "Draw two cards without replacement", "Spin a spinner twice"], "The first card removal changes the second draw."),
    probability("y9-pred-dep-i4", "Cards numbered 1 to 5 are used. Two are drawn without replacement. Find the probability of drawing 5 then 4.", "P=\\frac15\\times\\frac14", "1/20", "After drawing 5, card 4 is one of four remaining cards."),
    probability("y9-pred-dep-i5", "A bag has 2 red and 2 blue counters. Two are drawn without replacement. Find the probability of red then blue.", "P=\\frac24\\times\\frac23", "1/3", "After red is removed, 2 blue remain among 3 counters.", ["4/12"]),
  ],
  commonMistakes: [
    { mistake: "Keeping the original denominator for the second draw.", fix: "Without replacement leaves one fewer item for the next draw." },
    { mistake: "Reducing the favourable count when the first draw has a different colour.", fix: "Update the favourable count only if that type was removed." },
    { mistake: "Adding probabilities along a required path.", fix: "Multiply the updated probabilities along the path." },
    { mistake: "Treating without replacement as independent.", fix: "The changed contents make later events dependent." },
  ],
  masteryQuiz: [
    probability("y9-pred-dep-m1", "A bag has 3 red and 2 blue counters. Two are drawn without replacement. Find the probability of red twice.", "P=\\frac35\\times\\frac24", "3/10", "Update the second probability after one red is removed."),
    probability("y9-pred-dep-m2", "A bag has 2 black and 3 white counters. Find the probability of black then white without replacement.", "P=\\frac25\\times\\frac34", "3/10", "After black is removed, 3 white counters remain among 4 counters."),
    choice("y9-pred-dep-m3", "Which phrase signals dependent draws from a bag?", "B", ["With replacement", "Without replacement", "With a fair coin", "With equal spinner sectors"], "Without replacement changes the contents."),
    probability("y9-pred-dep-m4", "Cards numbered 1, 2, 3 and 4 are used. Find the probability of drawing 1 then 2 without replacement.", "P=\\frac14\\times\\frac13", "1/12", "After card 1 is removed, card 2 is one of three cards."),
    probability("y9-pred-dep-m5", "A bag has 5 green and 1 purple counter. Find the probability of purple then green without replacement.", "P=\\frac16\\times\\frac55", "1/6", "After purple is removed, every remaining counter is green.", ["5/30"]),
    probability("y9-pred-dep-m6", "A bag has 4 red and 2 blue counters. Find the probability of blue twice without replacement.", "P=\\frac26\\times\\frac15", "1/15", "After one blue is removed, 1 blue remains among 5 counters.", ["2/30"]),
    choice("y9-pred-dep-m7", "A bag has 3 red and 2 blue counters. After drawing one red without replacement, what is the probability of red next?", "C", ["3/5", "3/4", "2/4", "2/5"], "Two red counters remain among four counters."),
    probability("y9-pred-dep-m8", "A bag has 3 red and 2 blue counters. Find the probability of red then blue without replacement.", "P=\\frac35\\times\\frac24", "3/10", "After red is removed, 2 blue remain among 4 counters."),
    probability("y9-pred-dep-m9", "A bag has 2 red and 3 blue counters. Find the probability of drawing different colours in either order without replacement.", "P(RB)+P(BR)=\\frac25\\times\\frac34+\\frac35\\times\\frac24", "3/5", "Add the red-blue and blue-red paths."),
    probability("y9-pred-dep-m10", "A bag has 3 red and 2 blue counters. Find the probability that both counters drawn without replacement have the same colour.", "P(RR)+P(BB)=\\frac35\\times\\frac24+\\frac25\\times\\frac14", "2/5", "Add the red-red and blue-blue paths."),
  ],
};

const simulations: LessonContent = {
  description: "Use relative frequency and simulations to estimate probabilities and assess reliability.",
  learningIntention: "Interpret simulations as estimates of probability and judge when an estimate is more reliable.",
  successCriteria: ["Calculate relative frequency.", "Explain why simulation results vary.", "Compare reliability using trial counts.", "Choose a suitable random simulation model."],
  teaching: {
    paragraphs: ["A simulation uses random trials to model a chance situation. It is useful when an exact probability is difficult to calculate or when we want to test a prediction.", "Relative frequency is the number of successes divided by the number of trials.", "Simulation results vary because of randomness. A larger number of trials usually gives a more reliable estimate.", "The simulation tool must match the situation. For example, a fair die can model six equally likely outcomes."],
    latexBlocks: ["\\text{relative frequency}=\\frac{\\text{number of successes}}{\\text{number of trials}}"],
  },
  workedExamples: [
    { title: "Estimate from results", questionLatex: "\\text{A simulation records 48 successes in 80 trials. Estimate the probability of success.}", steps: [{ explanation: "Divide successes by trials.", latex: "\\text{relative frequency}=\\frac{48}{80}" }, { explanation: "Simplify.", latex: "\\frac{48}{80}=\\frac35=0.6" }], finalAnswerLatex: "0.6" },
    { title: "Compare reliability", questionLatex: "\\text{One simulation uses 20 trials and another uses 500 trials. Which usually gives a more reliable estimate?}", steps: [{ explanation: "Larger samples tend to reduce the effect of random variation.", latex: "500>20" }], finalAnswerLatex: "\\text{The 500-trial simulation}" },
    { title: "Choose a simulation model", questionLatex: "\\text{Choose a tool to simulate a random day of the week.}", steps: [{ explanation: "The model needs seven equally likely outcomes.", latex: "\\text{Use a random integer from }1\\text{ to }7." }], finalAnswerLatex: "\\text{A random integer from 1 to 7}" },
  ],
  guidedPractice: [
    probability("y9-pred-sim-g1", "A simulation records 30 successes in 50 trials. Estimate the probability of success.", "\\frac{30}{50}", "3/5", "Divide 30 by 50."),
    probability("y9-pred-sim-g2", "A simulation records 25 heads in 100 coin tosses. Estimate the probability of heads.", "\\frac{25}{100}", "1/4", "Divide the number of heads by the number of tosses."),
    choice("y9-pred-sim-g3", "Which estimate is usually more reliable?", "C", ["An estimate from 5 trials", "An estimate from 20 trials", "An estimate from 500 trials", "All trial counts are equally reliable"], "A larger trial count usually gives a more reliable estimate."),
    choice("y9-pred-sim-g4", "Which tool can model a fair six-sided die?", "A", ["A random integer from 1 to 6", "A coin toss", "A spinner with 5 equal sectors", "A random integer from 1 to 4"], "A fair die has six equally likely outcomes."),
  ],
  independentPractice: [
    probability("y9-pred-sim-i1", "A simulation records 72 rainy days in 120 trials. Estimate the probability of rain.", "\\frac{72}{120}", "3/5", "Divide successes by trials."),
    probability("y9-pred-sim-i2", "A simulation of a spinner records blue 18 times in 40 spins. Estimate the probability of blue.", "\\frac{18}{40}", "0.45", "Divide 18 by 40.", ["45%", "9/20"]),
    choice("y9-pred-sim-i3", "Why might two simulations of the same event give different results?", "B", ["The event changes its exact probability every time", "Random variation affects the results", "Relative frequency cannot be calculated", "A simulation must always be exact"], "Random trials naturally vary."),
    choice("y9-pred-sim-i4", "Which model suits a spinner with four equal coloured sectors?", "D", ["A random integer from 1 to 3", "A coin toss only", "A random integer from 1 to 10", "A random integer from 1 to 4"], "Use four equally likely values."),
    probability("y9-pred-sim-i5", "A simulated game is won 35 times in 50 trials. Estimate the probability of winning.", "\\frac{35}{50}", "7/10", "Divide 35 by 50."),
  ],
  commonMistakes: [
    { mistake: "Dividing trials by successes.", fix: "Relative frequency is successes divided by trials." },
    { mistake: "Assuming a small simulation must match the exact probability.", fix: "Random variation can be noticeable in small samples." },
    { mistake: "Calling a larger simulation perfectly accurate.", fix: "Larger trial counts are usually more reliable, but they are still estimates." },
    { mistake: "Choosing a simulation tool with the wrong number of equally likely outcomes.", fix: "Match the random model to the situation." },
  ],
  masteryQuiz: [
    probability("y9-pred-sim-m1", "A simulation records 40 successes in 100 trials. Estimate the probability of success.", "\\frac{40}{100}", "2/5", "Divide successes by trials."),
    probability("y9-pred-sim-m2", "A simulation records 75 wins in 100 trials. Estimate the probability of winning.", "\\frac{75}{100}", "3/4", "Divide 75 by 100."),
    choice("y9-pred-sim-m3", "Which trial count usually gives the most reliable estimate?", "D", ["10", "25", "100", "1000"], "The largest trial count usually gives the most reliable estimate."),
    choice("y9-pred-sim-m4", "Which statement about simulations is correct?", "B", ["Every simulation gives the exact probability", "Results can vary because trials are random", "Fewer trials are always more reliable", "Relative frequency is successes plus trials"], "Random variation causes results to vary."),
    probability("y9-pred-sim-m5", "A simulated event occurs 84 times in 120 trials. Estimate its probability.", "\\frac{84}{120}", "7/10", "Simplify 84 out of 120."),
    choice("y9-pred-sim-m6", "Which tool best models selecting one month of the year at random?", "C", ["A coin toss", "A random integer from 1 to 6", "A random integer from 1 to 12", "A random integer from 1 to 100"], "There are 12 months."),
    probability("y9-pred-sim-m7", "A simulation gives 126 successes in 180 trials. Estimate the probability of success.", "\\frac{126}{180}", "7/10", "Simplify 126 out of 180."),
    choice("y9-pred-sim-m8", "Simulation A gives 9 successes in 10 trials. Simulation B gives 760 successes in 1000 trials. Which is the stronger estimate for prediction?", "B", ["Simulation A because 0.9 is larger", "Simulation B because it uses many more trials", "Simulation A because it is shorter", "They are equally reliable"], "A larger number of trials generally gives a more reliable estimate."),
    probability("y9-pred-sim-m9", "A fair coin is expected to land heads with probability 1/2. A simulation gives 230 heads in 500 tosses. Find the simulated relative frequency.", "\\frac{230}{500}", "0.46", "Divide 230 by 500.", ["46%", "23/50"]),
    choice("y9-pred-sim-m10", "A student wants to simulate whether a randomly chosen day is a weekend. Which method is suitable?", "A", ["Generate a random integer from 1 to 7 and treat two values as weekend", "Toss a coin and always call heads Saturday", "Generate a random integer from 1 to 5 only", "Use a six-sided die and call every result a weekday"], "Two of seven equally likely day labels should represent the weekend."),
  ],
};

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function fraction(numerator: number, denominator: number): string {
  const divisor = gcd(numerator, denominator);
  const n = numerator / divisor;
  const d = denominator / divisor;
  return d === 1 ? String(n) : `${n}/${d}`;
}

function withDifficulty(question: PracticeQuestion, difficulty: number): PracticeQuestion {
  return { ...question, difficulty };
}

function countProbability(
  id: string,
  prompt: string,
  favourable: number,
  total: number,
  difficulty: number,
  eventLatex = "A"
): PracticeQuestion {
  const answer = fraction(favourable, total);
  return withDifficulty(
    probability(
      id,
      prompt,
      `P(${eventLatex})=\\frac{${favourable}}{${total}}`,
      answer,
      `There are ${favourable} favourable outcomes out of ${total} equally likely outcomes, so the probability is ${answer}.`
    ),
    difficulty
  );
}

function relativeFrequency(id: string, prompt: string, successes: number, trials: number, difficulty: number): PracticeQuestion {
  const answer = fraction(successes, trials);
  return withDifficulty(
    probability(
      id,
      prompt,
      `\\frac{${successes}}{${trials}}`,
      answer,
      `Relative frequency is successes divided by trials: ${successes} out of ${trials}, which simplifies to ${answer}.`
    ),
    difficulty
  );
}

simpleComplementary.teaching = {
  paragraphs: [
    "Probability is a way of measuring uncertainty on a scale from 0 to 1. A probability of 0 means the event cannot happen; a probability of 1 means it must happen. Values between 0 and 1 describe how much of the possible outcome space belongs to the event.",
    "For equally likely outcomes, imagine the outcome space as a set of same-sized tiles. If 3 of 8 tiles are favourable, a random result lands in the favourable region 3 times out of every 8 in the long run, so the probability is $\\frac{3}{8}$.",
    "That is why the fraction has favourable outcomes on top and total outcomes on the bottom. The denominator describes the whole experiment; the numerator describes the part of that experiment that counts as success.",
    "The complement of an event is the rest of the outcome space. If the event and its complement are placed together, they fill the whole space exactly once, so their probabilities must add to 1.",
    "This is often faster than counting the event directly. If a spinner has probability $\\frac{7}{10}$ of not landing on blue, then blue occupies the missing $\\frac{3}{10}$ of the probability space.",
    "A common trap is to treat an unlikely event as impossible. A probability near 0 still means the event can happen; only exactly 0 means impossible. In exam-style questions, always decide whether you are measuring the event, its complement, or the whole sample space.",
  ],
  latexBlocks: ["P(A)=\\frac{\\text{number of favourable outcomes}}{\\text{number of equally likely outcomes}}", "0\\le P(A)\\le 1", "P(A)+P(\\text{not }A)=1", "P(\\text{not }A)=1-P(A)"],
};
simpleComplementary.masteryQuizPool = [
  ...[
    ["pool1", "A bag contains 5 red and 7 blue counters. One counter is selected. Find the probability of selecting red.", 5, 12, 3],
    ["pool2", "A spinner has 10 equal sectors, 6 of which are shaded. Find the probability of landing on a shaded sector.", 6, 10, 3],
    ["pool3", "Cards numbered 1 to 12 are mixed. Find the probability of selecting a multiple of 3.", 4, 12, 3],
    ["pool4", "A fair die is rolled. Find the probability of not rolling a 1.", 5, 6, 3],
    ["pool5", "A box has 4 green, 3 yellow and 5 black tiles. Find the probability of selecting yellow.", 3, 12, 3],
    ["pool6", "Numbers 1 to 20 are written on cards. Find the probability of selecting an even number.", 10, 20, 3],
    ["pool7", "A spinner has 8 equal sectors. Three are labelled prize. Find the probability of not landing on prize.", 5, 8, 4],
    ["pool8", "A bag contains 9 red and 6 blue counters. Find the probability of not selecting red.", 6, 15, 4],
    ["pool9", "A card is selected from numbers 1 to 15. Find the probability of selecting a number greater than 10.", 5, 15, 4],
    ["pool10", "A random letter is chosen from the word PROBABILITY. Find the probability of choosing the letter B.", 2, 11, 4],
    ["pool11", "A survey has 18 students: 7 walk to school. If one student is chosen at random, find the probability they do not walk.", 11, 18, 4],
    ["pool12", "A drawer has 6 black socks, 4 white socks and 2 grey socks. Find the probability of not choosing white.", 8, 12, 4],
    ["pool13", "Cards numbered 1 to 30 are used. Find the probability of selecting a factor of 30.", 8, 30, 5],
    ["pool14", "A code digit is chosen from 0 to 9. Find the probability that it is neither 0 nor odd.", 4, 10, 5],
    ["pool15", "A class has 14 students who play soccer, 9 who play netball and 7 who play neither, with no overlap between the two sports. One student is chosen. Find the probability the student plays a listed sport.", 23, 30, 5],
    ["pool16", "A spinner has 12 equal sectors. The probability of landing on orange is $\\frac{1}{3}$. Find the probability of not landing on orange.", 8, 12, 5],
    ["pool17", "Numbers 1 to 40 are used. Find the probability of selecting a number that is a multiple of 4 or 5.", 16, 40, 5],
    ["pool18", "A bag has 3 red, 5 blue, 4 green and 8 yellow counters. Find the probability of selecting neither blue nor yellow.", 7, 20, 5],
    ["pool19", "A restaurant order is chosen from 6 mains and 4 desserts listed on a menu. Find the probability a randomly chosen item is a dessert.", 4, 10, 3],
    ["pool20", "A random integer from 1 to 25 is generated. Find the probability it is at least 21.", 5, 25, 4],
    ["pool21", "A bag contains 11 winning tickets and 39 losing tickets. Find the probability of not selecting a winning ticket.", 39, 50, 4],
    ["pool22", "A card is selected from numbers 1 to 18. Find the probability of selecting a prime number.", 7, 18, 5],
    ["pool23", "A train is late on 3 days in a 20-day record. Estimate the probability it is not late on a recorded day.", 17, 20, 4],
    ["pool24", "A password character is randomly chosen from 26 letters and 10 digits. Find the probability the character is a digit.", 10, 36, 5],
    ["pool25", "A spinner has 9 equal sectors. Two are red, three are blue and four are green. Find the probability of not blue.", 6, 9, 4],
    ["pool26", "A fair six-sided die is rolled. Find the probability of rolling a number that is not a factor of 6.", 2, 6, 4],
  ].map(([suffix, prompt, favourable, total, difficulty]) =>
    countProbability(`y9-pred-simple-${suffix}`, String(prompt), Number(favourable), Number(total), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-simple-pool27", "Which statement correctly describes an event with probability $0.04$?", "B", ["It is impossible", "It is possible but unlikely", "It is certain", "It is more likely than not"], "A probability of 0.04 is greater than 0, so it can happen, but it is close to 0.", ""), 5),
  withDifficulty(choice("y9-pred-simple-pool28", "If $P(A)=\\frac{7}{20}$, what is $P(\\text{not }A)$?", "C", ["$\\frac{7}{20}$", "$\\frac{13}{7}$", "$\\frac{13}{20}$", "$\\frac{20}{7}$"], "The complement fills the remaining probability: $1-\\frac{7}{20}=\\frac{13}{20}$."), 4),
  withDifficulty(choice("y9-pred-simple-pool29", "A student says $P(\\text{not rain})=1+P(\\text{rain})$. What is the error?", "A", ["Complements subtract from 1", "Probabilities must be larger than 1", "Rain cannot have a complement", "The total outcomes should be squared"], "An event and its complement add to 1, so the complement is found by subtracting from 1."), 5),
  withDifficulty(choice("y9-pred-simple-pool30", "Which value cannot be a probability?", "D", ["$\\frac{3}{5}$", "$0.99$", "$1$", "$-0.2$"], "Probabilities cannot be below 0 or above 1."), 3),
];
simpleComplementary.multiPartPractice = [
  {
    id: "y9-pred-simple-mp1",
    prompt: "A school raffle has 40 tickets: 6 gold tickets, 10 silver tickets and the rest standard tickets. One ticket is selected at random.",
    latex: "\\text{Use the raffle information.}",
    answer: "3/20",
    acceptedAnswers: ["0.15", "15%"],
    hint: "Break the 40 tickets into the categories named in the stem.",
    explanation: "Gold uses 6 out of 40 tickets; non-standard uses gold or silver; standard is the complement of non-standard.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the probability of selecting a gold ticket.", marks: 1, answer: "3/20", acceptedAnswers: ["6/40", "0.15", "15%"], hint: "Gold tickets are the favourable outcomes.", explanation: "There are 6 gold tickets out of 40, so $P(\\text{gold})=\\frac{6}{40}=\\frac{3}{20}$.", working: ["P(\\text{gold})=\\frac{6}{40}=\\frac{3}{20}"] },
      { key: "b", label: "(b)", prompt: "Find the probability of selecting a non-standard ticket.", marks: 2, answer: "2/5", acceptedAnswers: ["16/40", "0.4", "40%"], hint: "Non-standard means gold or silver.", explanation: "There are $6+10=16$ non-standard tickets out of 40, so the probability is $\\frac{16}{40}=\\frac{2}{5}$.", working: ["P(\\text{non-standard})=\\frac{6+10}{40}=\\frac{16}{40}=\\frac{2}{5}"] },
      { key: "c", label: "(c)", prompt: "Find the probability of selecting a standard ticket.", marks: 2, answer: "3/5", acceptedAnswers: ["24/40", "0.6", "60%"], hint: "Standard is the complement of non-standard.", explanation: "The standard tickets are the remaining $40-16=24$ tickets, so $P(\\text{standard})=\\frac{24}{40}=\\frac{3}{5}$.", working: ["P(\\text{standard})=1-\\frac{2}{5}=\\frac{3}{5}"] },
    ],
  },
];

sampleSpaces.teaching = {
  paragraphs: [
    "A sample space is the complete set of outcomes that could happen. It is the probability version of drawing a map before counting: if the map is incomplete, the probability will be wrong even if the arithmetic is neat.",
    "For one-stage experiments, the sample space is often a simple list. For two-stage experiments, order matters because the first and second positions carry different information. Heads then tails is not the same ordered outcome as tails then heads.",
    "A table or ordered-pair list works because it gives each stage its own position. If stage one has 2 outcomes and stage two has 6 outcomes, every first-stage outcome pairs with every second-stage outcome, giving $2\\times6=12$ outcomes.",
    "Once the sample space is complete, probability returns to the same idea: count the favourable outcomes and divide by the total outcomes. The careful work is usually in listing without missing or double-counting.",
    "A common mistake is to assume sums from two dice are equally likely because the sums 2 to 12 look like a simple list. They are not equally likely: a sum of 7 has many ordered pairs, while a sum of 2 has only one.",
    "When a question asks for a prediction from a sample space, build the space first, then count. That habit protects you in unfamiliar contexts where a shortcut is tempting but unsafe.",
  ],
  latexBlocks: ["S=\\{\\text{all possible outcomes}\\}", "n(S)=n(\\text{stage 1})\\times n(\\text{stage 2})", "P(A)=\\frac{n(A)}{n(S)}"],
};
sampleSpaces.masteryQuizPool = [
  ...[
    ["pool1", "A coin and a fair die are used. How many ordered outcomes are possible?", 12, 3],
    ["pool2", "A spinner with 5 equal sectors is spun twice. How many ordered outcomes are possible?", 25, 3],
    ["pool3", "A fair die and a 4-colour spinner are used. How many ordered outcomes are possible?", 24, 3],
    ["pool4", "Three fair coins are tossed. How many ordered outcomes are possible?", 8, 4],
    ["pool5", "A lunch has 3 sandwich choices and 4 drink choices. How many ordered meal combinations are possible?", 12, 3],
    ["pool6", "A random letter from A, B, C is followed by a random digit from 1 to 5. How many ordered codes are possible?", 15, 4],
    ["pool7", "Two fair dice are rolled. How many ordered outcomes have a sum of 8?", 5, 4],
    ["pool8", "Two fair dice are rolled. How many ordered outcomes have a sum less than 5?", 6, 5],
    ["pool9", "A coin is tossed and then a card numbered 1 to 8 is selected. How many outcomes show heads and an even number?", 4, 4],
    ["pool10", "A two-character code uses one of 4 letters followed by one of 6 digits. How many codes are possible?", 24, 3],
    ["pool11", "Two fair dice are rolled. How many ordered outcomes have the same number on both dice?", 6, 4],
    ["pool12", "Two fair dice are rolled. How many ordered outcomes have a product of 6?", 4, 5],
  ].map(([suffix, prompt, answer, difficulty]) => withDifficulty(number(`y9-pred-space-${suffix}`, String(prompt), "\\text{Count the ordered outcomes.}", String(answer), `Systematic listing or multiplication gives ${answer} ordered outcomes.`), Number(difficulty))),
  ...[
    ["pool13", "Two fair coins are tossed. Find the probability of at least one tail.", 3, 4, 3],
    ["pool14", "A fair die and a coin are used. Find the probability of heads and a number above 4.", 2, 12, 3],
    ["pool15", "Two fair dice are rolled. Find the probability of a sum of 7.", 6, 36, 4],
    ["pool16", "Two fair dice are rolled. Find the probability of a sum of 4 or 5.", 5, 36, 5],
    ["pool17", "A spinner with sectors A, B and C is spun twice. Find the probability of getting the same letter twice.", 3, 9, 4],
    ["pool18", "Three fair coins are tossed. Find the probability of exactly two heads.", 3, 8, 5],
    ["pool19", "A coin is tossed and a number from 1 to 10 is selected. Find the probability of tails and a prime number.", 4, 20, 5],
    ["pool20", "Two fair dice are rolled. Find the probability that the first die is larger than the second.", 15, 36, 5],
    ["pool21", "A letter from A, B, C is chosen twice in order. Find the probability of no repeated letter.", 6, 9, 5],
    ["pool22", "Two fair dice are rolled. Find the probability that the sum is at least 10.", 6, 36, 4],
    ["pool23", "A coin is tossed three times. Find the probability of at least two heads.", 4, 8, 5],
    ["pool24", "Two cards are selected in order from cards numbered 1 to 4 with replacement. Find the probability both numbers are odd.", 4, 16, 4],
    ["pool25", "A fair die is rolled twice. Find the probability the second roll is 6.", 6, 36, 3],
    ["pool26", "A spinner with four equal colours is spun twice. Find the probability the colours are different.", 12, 16, 4],
  ].map(([suffix, prompt, favourable, total, difficulty]) =>
    countProbability(`y9-pred-space-${suffix}`, String(prompt), Number(favourable), Number(total), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-space-pool27", "Why are HT and TH counted separately for two coin tosses?", "B", ["They have different likelihoods", "They occur in different orders", "One is impossible", "They both mean no heads"], "The first and second toss positions are different, so HT and TH are different ordered outcomes."), 3),
  withDifficulty(choice("y9-pred-space-pool28", "Which sample space is complete for choosing A or B twice in order?", "D", ["AA, BB", "A, B", "AA, AB, BB", "AA, AB, BA, BB"], "Both mixed orders AB and BA must be included."), 4),
  withDifficulty(choice("y9-pred-space-pool29", "A student says each dice sum from 2 to 12 is equally likely. What is the flaw?", "C", ["Dice cannot make sums", "Only even sums occur", "Different sums have different numbers of ordered pairs", "There are only six sums"], "Sums are not equally likely because, for example, 7 has more ordered pairs than 2."), 5),
  withDifficulty(choice("y9-pred-space-pool30", "Which method best prevents missing outcomes in a two-stage experiment?", "A", ["Use an ordered table", "Only list favourable outcomes", "Estimate from the largest number", "Ignore order"], "An ordered table forces each first-stage outcome to be paired with each second-stage outcome."), 4),
];
sampleSpaces.multiPartPractice = [
  {
    id: "y9-pred-space-mp1",
    prompt: "A cafe lets a customer choose one of 3 wraps and one of 4 drinks. Each meal combination is equally likely in a lunch simulation.",
    latex: "\\text{Use the sample-space structure.}",
    answer: "12",
    acceptedAnswers: [],
    hint: "Pair each wrap with each drink.",
    explanation: "The sample space has $3\\times4=12$ combinations. Favourable combinations can then be counted from that space.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the number of possible meal combinations.", marks: 1, answer: "12", hint: "Multiply the number of wrap choices by the number of drink choices.", explanation: "Each of the 3 wraps can pair with each of the 4 drinks, giving $3\\times4=12$ combinations.", working: ["n(S)=3\\times4=12"] },
      { key: "b", label: "(b)", prompt: "One wrap is vegetarian and two drinks are juice. Find the number of vegetarian-and-juice combinations.", marks: 2, answer: "2", hint: "Pair the 1 vegetarian wrap with the 2 juice choices.", explanation: "There is 1 vegetarian wrap and 2 juice drinks, so there are $1\\times2=2$ favourable combinations.", working: ["n(V\\cap J)=1\\times2=2"] },
      { key: "c", label: "(c)", prompt: "Find the probability of a vegetarian-and-juice combination.", marks: 2, answer: "1/6", acceptedAnswers: ["2/12", "0.1667"], hint: "Use favourable combinations over total combinations.", explanation: "There are 2 favourable combinations out of 12 total combinations, so the probability is $\\frac{2}{12}=\\frac{1}{6}$.", working: ["P=\\frac{2}{12}=\\frac{1}{6}"] },
    ],
  },
];

multiStage.teaching = {
  paragraphs: [
    "A multi-stage experiment is a chance situation that unfolds in steps. A single final outcome is a path through those steps, such as heads then 4, or red then blue.",
    "For one exact path, multiply because each stage narrows the outcome space again. If half the outcomes survive stage one and one sixth of those survive stage two, then only $\\frac12\\times\\frac16$ of the original space survives both conditions.",
    "For an event that can happen in several separate ways, find each successful path and add the path probabilities. Exactly one head in two tosses has two paths: HT and TH.",
    "The words 'and' and 'or' are useful, but they are not magic rules. 'And' usually points to a single path and multiplication; 'or' between separate successful paths usually points to addition.",
    "Replacement keeps later stage probabilities unchanged. Without replacement belongs to dependent events because the contents change after a draw.",
    "The common error is to add along a path or multiply separate alternatives. Ask: am I moving along one path, or combining different successful paths?",
  ],
  latexBlocks: ["P(A\\text{ then }B)=P(A)\\times P(B\\text{ after }A)", "P(\\text{path 1 or path 2})=P(\\text{path 1})+P(\\text{path 2})"],
};
multiStage.masteryQuizPool = [
  ...[
    ["pool1", "A coin is tossed and a fair die is rolled. Find the probability of heads then rolling an even number.", 1, 4, 3],
    ["pool2", "A spinner with 3 equal colours is spun twice. Find the probability of red then blue.", 1, 9, 3],
    ["pool3", "A fair die is rolled twice. Find the probability of rolling 4 then 5.", 1, 36, 3],
    ["pool4", "A bag has 2 red and 3 blue counters. A counter is drawn, replaced, then another is drawn. Find the probability of red then blue.", 6, 25, 4],
    ["pool5", "Two fair coins are tossed. Find the probability of exactly one tail.", 2, 4, 3],
    ["pool6", "A spinner with 4 equal sectors is spun twice. Find the probability of the same colour twice.", 4, 16, 4],
    ["pool7", "A fair die is rolled twice. Find the probability of at least one 6.", 11, 36, 5],
    ["pool8", "A coin is tossed three times. Find the probability of exactly one head.", 3, 8, 5],
    ["pool9", "A bag has 1 gold and 4 silver tokens. A token is drawn, replaced, then another is drawn. Find the probability of exactly one gold.", 8, 25, 5],
    ["pool10", "A fair die is rolled and a coin is tossed. Find the probability of a factor of 6 and tails.", 4, 12, 4],
    ["pool11", "A spinner lands on blue with probability $\\frac{2}{5}$. It is spun twice. Find the probability of blue then not blue.", 6, 25, 4],
    ["pool12", "A fair coin is tossed twice and a die is rolled. Find the probability of two tails and a prime number on the die.", 3, 24, 5],
    ["pool13", "A 3-option random generator is used twice. Find the probability the second result matches the first.", 3, 9, 4],
    ["pool14", "A coin is tossed and then a card from 1 to 8 is selected. Find the probability of heads or an even card, counting all outcomes once.", 12, 16, 5],
    ["pool15", "A spinner with red probability $\\frac{1}{4}$ is spun three times. Find the probability of red every time.", 1, 64, 5],
    ["pool16", "Two fair dice are rolled. Find the probability the ordered result is (2, 5) or (5, 2).", 2, 36, 4],
    ["pool17", "A bag has 3 green and 2 white counters. Draw with replacement twice. Find the probability of different colours.", 12, 25, 5],
    ["pool18", "A coin is tossed three times. Find the probability of at least one tail.", 7, 8, 5],
    ["pool19", "A fair die is rolled twice. Find the probability that both rolls are odd.", 9, 36, 3],
    ["pool20", "A spinner has five equal sectors, two red. It is spun twice. Find the probability of no red.", 9, 25, 4],
    ["pool21", "A fair die is rolled and a fair coin is tossed. Find the probability of an odd number and heads.", 3, 12, 3],
    ["pool22", "A bag has 4 blue and 1 yellow token. Draw with replacement twice. Find the probability of at least one yellow.", 9, 25, 5],
    ["pool23", "A coin is tossed twice and a spinner with 3 colours is spun. Find the probability of exactly one head and colour A.", 2, 12, 5],
    ["pool24", "A fair die is rolled three times. Find the probability of three sixes.", 1, 216, 5],
    ["pool25", "A spinner lands on prize with probability $\\frac{3}{10}$. It is spun twice. Find the probability of prize then no prize.", 21, 100, 4],
    ["pool26", "A fair coin is tossed four times. Find the probability of all heads.", 1, 16, 4],
  ].map(([suffix, prompt, favourable, total, difficulty]) =>
    countProbability(`y9-pred-multi-${suffix}`, String(prompt), Number(favourable), Number(total), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-multi-pool27", "For one specified path in a tree diagram, which operation combines the branch probabilities?", "B", ["Add", "Multiply", "Subtract from 1", "Average"], "A single path is found by multiplying along its branches."), 3),
  withDifficulty(choice("y9-pred-multi-pool28", "For exactly one head in two tosses, why are two path probabilities added?", "C", ["The tosses are unfair", "The paths happen at the same time", "HT and TH are separate successful paths", "The complement is impossible"], "Exactly one head can happen by HT or by TH, so the separate path probabilities are added."), 4),
  withDifficulty(choice("y9-pred-multi-pool29", "A student calculates $\\frac12+\\frac16$ for heads then rolling 6. What is the error?", "A", ["They added along one required path", "They used too many outcomes", "They used a complement", "They counted order twice"], "Heads then 6 is one path, so the probabilities should be multiplied."), 5),
  withDifficulty(choice("y9-pred-multi-pool30", "Which expression represents at least one success over two independent trials with success probability $p$?", "D", ["$p^2$", "$1-p$", "$p+p$", "$1-(1-p)^2$"], "At least one success is the complement of no successes, so subtract the no-success path from 1."), 5),
];
multiStage.multiPartPractice = [
  {
    id: "y9-pred-multi-mp1",
    prompt: "A game uses a fair coin and a fair six-sided die. A player wins a small prize for heads and an even number, and a major prize for heads and a 6.",
    latex: "\\text{Use path probabilities.}",
    answer: "1/4",
    acceptedAnswers: ["3/12"],
    hint: "The coin result and die result form a two-stage path.",
    explanation: "Multiply along each required path. The major-prize path is contained inside the small-prize condition.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the probability of winning a small prize.", marks: 2, answer: "1/4", acceptedAnswers: ["3/12", "0.25", "25%"], hint: "Heads has probability $\\frac12$ and even has probability $\\frac36$.", explanation: "The probability is $\\frac12\\times\\frac36=\\frac14$.", working: ["P(H\\text{ and even})=\\frac12\\times\\frac36=\\frac14"] },
      { key: "b", label: "(b)", prompt: "Find the probability of winning a major prize.", marks: 1, answer: "1/12", acceptedAnswers: ["0.0833"], hint: "Major prize means heads and a 6.", explanation: "The probability is $\\frac12\\times\\frac16=\\frac{1}{12}$.", working: ["P(H\\text{ and }6)=\\frac12\\times\\frac16=\\frac{1}{12}"] },
      { key: "c", label: "(c)", prompt: "Find the probability of winning a small prize but not a major prize.", marks: 2, answer: "1/6", acceptedAnswers: ["2/12", "0.1667"], hint: "Use heads with die results 2 or 4.", explanation: "Small but not major means heads and an even number other than 6, so the die has 2 favourable results out of 6.", working: ["P=\\frac12\\times\\frac26=\\frac16"] },
    ],
  },
];

independentEvents.teaching = {
  paragraphs: [
    "Events are independent when one result does not change the chance of the other result. The key question is not whether the events feel related, but whether the probability for the later event stays the same after the earlier event is known.",
    "Coin tosses are independent because the coin has no memory. If the first toss is heads, the next toss still has probability $\\frac12$ of heads.",
    "This is why independent 'and' probabilities multiply. The first event keeps a fraction of the whole outcome space; the second event keeps the same fraction of what remains possible.",
    "Replacement is a common way to create independence in bag problems. Returning the first item restores the original contents, so the second draw uses the original probabilities again.",
    "Do not multiply just because a question has two events. If the first event changes the second probability, the events are dependent and the second fraction must be updated.",
    "In prediction questions, independence is an assumption that must be checked from the context. With replacement, separate spins and separate rolls usually support it; without replacement usually breaks it.",
  ],
  latexBlocks: ["A\\text{ and }B\\text{ independent}\\quad\\Longrightarrow\\quad P(A\\text{ and }B)=P(A)P(B)", "P(B\\text{ after }A)=P(B)\\quad\\text{for independent events}"],
};
independentEvents.masteryQuizPool = [
  ...[
    ["pool1", "A fair coin is tossed twice. Find the probability of tails both times.", 1, 4, 3],
    ["pool2", "A fair die is rolled twice. Find the probability of two even numbers.", 9, 36, 3],
    ["pool3", "A spinner lands on red with probability $\\frac{1}{5}$. It is spun twice. Find the probability of red twice.", 1, 25, 3],
    ["pool4", "A bag has 3 red and 7 blue counters. Draw, replace, then draw again. Find the probability of red twice.", 9, 100, 4],
    ["pool5", "A fair die is rolled and a coin is tossed. Find the probability of rolling 6 and getting tails.", 1, 12, 3],
    ["pool6", "A spinner lands on green with probability $\\frac{2}{3}$. It is spun twice. Find the probability of green both times.", 4, 9, 4],
    ["pool7", "A fair coin is tossed three times. Find the probability of three heads.", 1, 8, 4],
    ["pool8", "A bag has 2 gold and 3 black counters. Draw with replacement twice. Find the probability of black twice.", 9, 25, 4],
    ["pool9", "A fair die is rolled twice. Find the probability of an odd number then a number greater than 4.", 6, 36, 4],
    ["pool10", "A spinner lands on prize with probability $\\frac{3}{8}$. It is spun twice. Find the probability of no prize both times.", 25, 64, 5],
    ["pool11", "A coin is tossed four times. Find the probability of four tails.", 1, 16, 4],
    ["pool12", "A bag has 4 red and 1 white counter. Draw with replacement three times. Find the probability of white every time.", 1, 125, 5],
    ["pool13", "A fair die is rolled three times. Find the probability of no 6 in all three rolls.", 125, 216, 5],
    ["pool14", "Two independent machines each have probability $\\frac{1}{10}$ of failing today. Find the probability both fail.", 1, 100, 5],
    ["pool15", "Two independent events have probabilities $\\frac{2}{5}$ and $\\frac{3}{4}$. Find the probability both occur.", 6, 20, 4],
    ["pool16", "A draw with replacement from a bag has $P(\\text{blue})=\\frac{3}{7}$. Find the probability of blue then not blue.", 12, 49, 5],
    ["pool17", "A fair die is rolled twice. Find the probability of at least one 1.", 11, 36, 5],
    ["pool18", "A coin is tossed three times. Find the probability of at least one head.", 7, 8, 5],
    ["pool19", "An archer independently hits with probability $\\frac{4}{5}$ on each shot. Find the probability of two hits.", 16, 25, 4],
    ["pool20", "A spinner independently lands on A with probability $\\frac{1}{3}$ each spin. Find the probability of exactly one A in two spins.", 4, 9, 5],
    ["pool21", "A bag has 6 red and 4 blue counters. Draw with replacement twice. Find the probability of blue then red.", 24, 100, 4],
    ["pool22", "A fair die and a fair coin are used independently. Find the probability of a factor of 6 and heads.", 4, 12, 3],
    ["pool23", "A spinner lands on yellow with probability $\\frac{3}{10}$. It is spun twice independently. Find the probability of exactly one yellow.", 42, 100, 5],
    ["pool24", "A coin is tossed twice and a die is rolled independently. Find the probability of two heads and a multiple of 3.", 2, 24, 5],
    ["pool25", "A bag has 1 red and 4 blue counters. Draw with replacement twice. Find the probability of no red.", 16, 25, 4],
    ["pool26", "A die is rolled twice. Find the probability the first roll is even and the second roll is prime.", 9, 36, 4],
  ].map(([suffix, prompt, favourable, total, difficulty]) =>
    countProbability(`y9-pred-ind-${suffix}`, String(prompt), Number(favourable), Number(total), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-ind-pool27", "Which context most clearly describes independent events?", "A", ["Rolling a die twice", "Drawing two cards without replacement", "Selecting two names and removing the first", "Taking two counters without returning the first"], "A die roll does not change the next die roll."), 3),
  withDifficulty(choice("y9-pred-ind-pool28", "Why does replacement make two bag draws independent?", "C", ["It changes the colours", "It removes all outcomes", "It restores the original contents before the second draw", "It makes the first draw impossible"], "After replacement, the second draw has the same probabilities as the first draw."), 4),
  withDifficulty(choice("y9-pred-ind-pool29", "A student treats two draws without replacement as independent. What did they ignore?", "B", ["The first draw has no probability", "The bag contents changed before the second draw", "The events must be added", "The denominator should be squared only"], "Without replacement, the first draw changes the available items for the second draw."), 5),
  withDifficulty(choice("y9-pred-ind-pool30", "For independent events with $P(A)=0.2$ and $P(B)=0.5$, find $P(A\\text{ and }B)$.", "A", ["0.1", "0.3", "0.7", "1"], "Multiply independent probabilities: $0.2\\times0.5=0.1$."), 4),
];
independentEvents.multiPartPractice = [
  {
    id: "y9-pred-ind-mp1",
    prompt: "A basketballer has an independent probability of $\\frac{3}{5}$ of making each free throw. The player takes two free throws.",
    latex: "\\text{Assume the shots are independent.}",
    answer: "9/25",
    acceptedAnswers: ["0.36", "36%"],
    hint: "Independence means each shot keeps probability $\\frac{3}{5}$.",
    explanation: "Use multiplication for both made shots, and use complements for missed shots.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the probability the player makes both shots.", marks: 1, answer: "9/25", acceptedAnswers: ["0.36", "36%"], hint: "Multiply $\\frac35$ by $\\frac35$.", explanation: "Both shots made has probability $\\frac35\\times\\frac35=\\frac{9}{25}$.", working: ["P(MM)=\\frac35\\times\\frac35=\\frac{9}{25}"] },
      { key: "b", label: "(b)", prompt: "Find the probability the player misses both shots.", marks: 1, answer: "4/25", acceptedAnswers: ["0.16", "16%"], hint: "The probability of missing one shot is $\\frac25$.", explanation: "Missing one shot has probability $\\frac25$, so missing both is $\\frac25\\times\\frac25=\\frac{4}{25}$.", working: ["P(XX)=\\frac25\\times\\frac25=\\frac{4}{25}"] },
      { key: "c", label: "(c)", prompt: "Find the probability the player makes exactly one shot.", marks: 2, answer: "12/25", acceptedAnswers: ["0.48", "48%"], hint: "Exactly one make can happen as make-miss or miss-make.", explanation: "There are two successful paths: $MX$ and $XM$, each with probability $\\frac35\\times\\frac25=\\frac{6}{25}$.", working: ["P(\\text{exactly one})=\\frac35\\times\\frac25+\\frac25\\times\\frac35=\\frac{12}{25}"] },
    ],
  },
];

dependentEvents.teaching = {
  paragraphs: [
    "Events are dependent when an earlier result changes the probability of a later result. The most common Year 9 example is drawing without replacement: once an item leaves the bag, the bag is not the same.",
    "Track the actual contents after the first draw. If a bag starts with 3 red and 2 blue counters, then drawing one red leaves 2 red and 2 blue counters, so the second red probability is $\\frac24$, not $\\frac35$.",
    "You still multiply along a required path, but the later fractions must match the updated situation. Dependence changes the branch probabilities; it does not change the path rule.",
    "If the first draw is a different colour from the second target, the favourable count for the target colour may stay the same while the total count falls. That is why context beats memorising a pattern.",
    "For events such as 'different colours' or 'same colour', there may be more than one successful path. Update and multiply each path, then add the separate successful paths.",
    "The common trap is to use the original denominator twice. In any without-replacement problem, pause after the first draw and ask what remains.",
  ],
  latexBlocks: ["P(A\\text{ then }B)=P(A)\\times P(B\\mid A)", "P(B\\mid A)=\\frac{\\text{favourable outcomes remaining after }A}{\\text{total outcomes remaining after }A}"],
};
dependentEvents.masteryQuizPool = [
  ...[
    ["pool1", "A bag has 4 red and 2 blue counters. Two are drawn without replacement. Find the probability of red twice.", 12, 30, 3],
    ["pool2", "A bag has 3 green and 2 yellow counters. Two are drawn without replacement. Find the probability of green then yellow.", 6, 20, 3],
    ["pool3", "Cards A, B, C and D are drawn without replacement. Find the probability of A then B.", 1, 12, 3],
    ["pool4", "A bag has 5 black and 1 white counter. Two are drawn without replacement. Find the probability of white then black.", 5, 30, 4],
    ["pool5", "A bag has 2 red and 4 blue counters. Two are drawn without replacement. Find the probability of blue twice.", 12, 30, 4],
    ["pool6", "Cards numbered 1 to 6 are drawn without replacement. Find the probability of two even cards.", 6, 30, 4],
    ["pool7", "A bag has 3 red and 2 blue counters. Two are drawn without replacement. Find the probability of different colours.", 12, 20, 5],
    ["pool8", "A bag has 4 red and 3 blue counters. Two are drawn without replacement. Find the probability of the same colour.", 18, 42, 5],
    ["pool9", "Cards numbered 1 to 5 are drawn without replacement. Find the probability of drawing a prime then an even number.", 4, 20, 5],
    ["pool10", "A bag has 2 gold, 3 silver and 1 bronze token. Two are drawn without replacement. Find the probability of no bronze.", 20, 30, 4],
    ["pool11", "A bag has 5 red and 3 blue counters. Two are drawn without replacement. Find the probability of blue then red.", 15, 56, 4],
    ["pool12", "Cards numbered 1 to 8 are drawn without replacement. Find the probability of two numbers greater than 5.", 6, 56, 4],
    ["pool13", "A bag has 3 red, 3 blue and 2 green counters. Two are drawn without replacement. Find the probability of first green then not green.", 12, 56, 5],
    ["pool14", "A bag has 6 red and 4 blue counters. Two are drawn without replacement. Find the probability of at least one blue.", 54, 90, 5],
    ["pool15", "Cards 1 to 6 are drawn without replacement. Find the probability the two cards have different parity.", 18, 30, 5],
    ["pool16", "A bag has 1 red and 5 blue counters. Two are drawn without replacement. Find the probability of at least one red.", 10, 30, 5],
    ["pool17", "A bag has 4 green, 2 orange and 2 purple counters. Two are drawn without replacement. Find the probability both are not green.", 12, 56, 5],
    ["pool18", "Cards A, B, C, D and E are drawn without replacement. Find the probability that C appears before D in two ordered draws containing C and D.", 1, 10, 5],
    ["pool19", "A bag has 3 white and 4 black counters. Two are drawn without replacement. Find the probability of black then white.", 12, 42, 4],
    ["pool20", "A bag has 2 red and 5 yellow counters. Two are drawn without replacement. Find the probability of yellow then red.", 10, 42, 4],
    ["pool21", "Cards numbered 1 to 7 are drawn without replacement. Find the probability of drawing 7 then an odd number.", 3, 42, 4],
    ["pool22", "A bag has 3 red, 1 blue and 2 green counters. Two are drawn without replacement. Find the probability of blue then green.", 2, 30, 4],
    ["pool23", "A bag has 2 red and 2 blue counters. Two are drawn without replacement. Find the probability of different colours.", 8, 12, 4],
    ["pool24", "A bag has 5 red and 5 blue counters. Two are drawn without replacement. Find the probability of red twice.", 20, 90, 4],
    ["pool25", "Cards 1 to 9 are drawn without replacement. Find the probability of two multiples of 3.", 6, 72, 4],
    ["pool26", "A bag has 3 red and 5 blue counters. Two are drawn without replacement. Find the probability of blue twice.", 20, 56, 4],
  ].map(([suffix, prompt, favourable, total, difficulty]) =>
    countProbability(`y9-pred-dep-${suffix}`, String(prompt), Number(favourable), Number(total), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-dep-pool27", "After one red is drawn without replacement from a bag of 3 red and 2 blue counters, what is the next red probability?", "C", ["$\\frac35$", "$\\frac34$", "$\\frac24$", "$\\frac25$"], "One red is gone, leaving 2 red among 4 counters."), 3),
  withDifficulty(choice("y9-pred-dep-pool28", "Which phrase signals dependent draws?", "B", ["With replacement", "Without replacement", "With a fair die", "With separate coin tosses"], "Without replacement changes what remains for the next draw."), 3),
  withDifficulty(choice("y9-pred-dep-pool29", "A bag has 2 red and 3 blue counters. For red then blue without replacement, which second probability is correct?", "D", ["$\\frac35$", "$\\frac25$", "$\\frac24$", "$\\frac34$"], "After red is removed, all 3 blue counters remain among 4 counters."), 4),
  withDifficulty(choice("y9-pred-dep-pool30", "A student uses $\\frac35\\times\\frac35$ for two red draws without replacement from 3 red and 2 blue. What is wrong?", "A", ["The second draw should be updated to $\\frac24$", "The first draw should be $\\frac25$", "The probabilities should be added", "The denominator should increase"], "Without replacement, after one red is removed there are 2 red among 4 counters."), 5),
];
dependentEvents.multiPartPractice = [
  {
    id: "y9-pred-dep-mp1",
    prompt: "A bag contains 4 red counters and 3 blue counters. Two counters are drawn without replacement.",
    latex: "\\text{Update the bag after the first draw.}",
    answer: "2/7",
    acceptedAnswers: ["0.2857"],
    hint: "After the first counter is removed, 6 counters remain.",
    explanation: "The second probability must be updated for the colour removed on the first draw.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the probability of drawing two red counters.", marks: 2, answer: "2/7", acceptedAnswers: ["12/42", "0.2857"], hint: "After one red is removed, 3 red counters remain among 6.", explanation: "The probability is $\\frac47\\times\\frac36=\\frac{12}{42}=\\frac27$.", working: ["P(RR)=\\frac47\\times\\frac36=\\frac27"] },
      { key: "b", label: "(b)", prompt: "Find the probability of drawing red then blue.", marks: 1, answer: "2/7", acceptedAnswers: ["12/42", "0.2857"], hint: "After red is removed, all 3 blue counters remain.", explanation: "The probability is $\\frac47\\times\\frac36=\\frac27$.", working: ["P(RB)=\\frac47\\times\\frac36=\\frac27"] },
      { key: "c", label: "(c)", prompt: "Find the probability of drawing two counters of different colours.", marks: 2, answer: "4/7", acceptedAnswers: ["24/42", "0.5714"], hint: "Different colours can happen as red-blue or blue-red.", explanation: "Add the two successful paths: red-blue and blue-red.", working: ["P(RB)+P(BR)=\\frac47\\times\\frac36+\\frac37\\times\\frac46=\\frac47"] },
    ],
  },
];

simulations.teaching = {
  paragraphs: [
    "A simulation is a repeated random model of a situation. It is useful when exact counting is difficult, or when we want to test whether a theoretical prediction seems reasonable.",
    "Relative frequency is the experimental version of probability: successes divided by trials. If 48 of 80 trials succeed, the simulation estimates success probability as $\\frac{48}{80}=0.6$.",
    "Simulation results vary because random trials do not distribute themselves perfectly in small samples. Ten tosses of a fair coin might not give exactly five heads, even though the theoretical probability of heads is $\\frac12$.",
    "Larger simulations are usually more reliable because random variation has more chances to balance out. This does not make the estimate exact; it makes the estimate less jumpy.",
    "The simulation tool must match the real situation. A random integer from 1 to 7 can model days of the week because the seven outcomes are equally likely in the model; a coin cannot model seven equally likely outcomes without extra rules.",
    "When using simulations to make predictions, keep the language cautious. The estimate supports a prediction; it does not guarantee the next result.",
  ],
  latexBlocks: ["\\text{relative frequency}=\\frac{\\text{number of successes}}{\\text{number of trials}}", "\\text{predicted count}\\approx \\text{relative frequency}\\times\\text{number of future trials}"],
};
simulations.masteryQuizPool = [
  ...[
    ["pool1", "A simulation records 36 successes in 60 trials. Estimate the probability of success.", 36, 60, 3],
    ["pool2", "A coin simulation records 58 heads in 100 tosses. Estimate the probability of heads.", 58, 100, 3],
    ["pool3", "A game is won 42 times in 70 simulated plays. Estimate the probability of winning.", 42, 70, 3],
    ["pool4", "A spinner lands on blue 33 times in 120 spins. Estimate the probability of blue.", 33, 120, 4],
    ["pool5", "A weather simulation gives rain on 84 of 140 days. Estimate the probability of rain.", 84, 140, 4],
    ["pool6", "A simulation records 96 successes in 160 trials. Estimate the probability of success.", 96, 160, 4],
    ["pool7", "A traffic simulation records congestion in 75 of 250 trials. Estimate the probability of congestion.", 75, 250, 4],
    ["pool8", "A game simulation records 135 wins in 180 trials. Estimate the probability of winning.", 135, 180, 4],
    ["pool9", "A simulation records 57 failures in 300 trials. Estimate the probability of failure.", 57, 300, 5],
    ["pool10", "A machine simulation records 612 acceptable items in 720 trials. Estimate the probability of an acceptable item.", 612, 720, 5],
    ["pool11", "A simulation gives 44 successes in 80 trials. Use the relative frequency to predict successes in 200 trials.", 110, 200, 5],
    ["pool12", "A simulation gives 72 wins in 120 trials. Use the relative frequency to predict wins in 50 future plays.", 30, 50, 5],
    ["pool13", "A simulation gives 18 breakdowns in 300 trips. Estimate the probability of no breakdown.", 282, 300, 5],
    ["pool14", "A simulation records 126 blue results in 210 trials. Estimate the probability of not blue.", 84, 210, 5],
    ["pool15", "A spinner simulation records 49 red results in 140 spins. Estimate the probability of red.", 49, 140, 4],
    ["pool16", "A trial records 27 successes in 45 attempts. Estimate the probability of success.", 27, 45, 3],
    ["pool17", "A simulated queue is longer than 5 people in 64 of 160 trials. Estimate that probability.", 64, 160, 4],
    ["pool18", "A simulation records 9 rare events in 150 trials. Estimate the probability of the rare event.", 9, 150, 5],
    ["pool19", "A game simulation loses 35 times in 100 plays. Estimate the probability of not losing.", 65, 100, 4],
    ["pool20", "A simulation gives 210 successes in 350 trials. Estimate the probability of success.", 210, 350, 3],
    ["pool21", "A bus simulation is on time in 468 of 600 trips. Estimate the probability of being on time.", 468, 600, 5],
    ["pool22", "A simulation records 32 defective items in 400 items. Estimate the probability of a defect.", 32, 400, 5],
    ["pool23", "A simulation records 154 successes in 220 trials. Estimate the probability of success.", 154, 220, 4],
    ["pool24", "A simulation records 125 sunny days in 500 trials. Estimate the probability of not sunny.", 375, 500, 5],
    ["pool25", "A simulation records 81 wins in 90 trials. Estimate the probability of winning.", 81, 90, 3],
    ["pool26", "A simulation records 39 successes in 130 trials. Estimate the probability of success.", 39, 130, 4],
  ].map(([suffix, prompt, successes, trials, difficulty]) =>
    relativeFrequency(`y9-pred-sim-${suffix}`, String(prompt), Number(successes), Number(trials), Number(difficulty))
  ),
  withDifficulty(choice("y9-pred-sim-pool27", "Which simulation estimate is usually more reliable?", "D", ["6 successes in 10 trials", "15 successes in 20 trials", "70 successes in 100 trials", "720 successes in 1000 trials"], "The 1000-trial estimate is usually less affected by random variation."), 4),
  withDifficulty(choice("y9-pred-sim-pool28", "Why can two simulations of the same event give different relative frequencies?", "B", ["The theoretical probability disappears", "Random variation affects finite samples", "Relative frequency is not a fraction", "The larger answer is always correct"], "Random trials vary, especially when the number of trials is limited."), 3),
  withDifficulty(choice("y9-pred-sim-pool29", "Which tool best simulates a random month of the year?", "C", ["A coin", "A six-sided die", "A random integer from 1 to 12", "A random integer from 1 to 5"], "A month model needs 12 equally likely outcomes."), 4),
  withDifficulty(choice("y9-pred-sim-pool30", "A simulation estimates a win probability of 0.62. What is the best prediction for 500 future games?", "A", ["310 wins", "62 wins", "500 wins", "438 wins"], "Use predicted count $0.62\\times500=310$."), 5),
];
simulations.multiPartPractice = [
  {
    id: "y9-pred-sim-mp1",
    prompt: "A computer simulation of a school fundraiser records a profit in 168 out of 240 trials.",
    latex: "\\text{Use relative frequency to make a cautious prediction.}",
    answer: "7/10",
    acceptedAnswers: ["0.7", "70%"],
    hint: "Relative frequency is successes divided by trials.",
    explanation: "The simulation estimate is $\\frac{168}{240}=\\frac{7}{10}$. Use that proportion for predictions, while remembering it is not a guarantee.",
    parts: [
      { key: "a", label: "(a)", prompt: "Estimate the probability of making a profit.", marks: 1, answer: "7/10", acceptedAnswers: ["168/240", "0.7", "70%"], hint: "Divide profit trials by total trials.", explanation: "The estimate is $\\frac{168}{240}=\\frac{7}{10}$.", working: ["\\text{relative frequency}=\\frac{168}{240}=\\frac{7}{10}"] },
      { key: "b", label: "(b)", prompt: "Using this estimate, predict the number of profit outcomes in 500 future trials.", marks: 2, answer: "350", hint: "Multiply 500 by the estimated probability.", explanation: "The prediction is $500\\times\\frac{7}{10}=350$ profit outcomes.", working: ["500\\times\\frac{7}{10}=350"] },
      { key: "c", label: "(c)", prompt: "A second simulation has 690 profit outcomes in 1000 trials. Which estimate should be used for prediction: first or second?", marks: 2, answer: "second", acceptedAnswers: ["Second", "simulation 2", "2"], hint: "Compare the number of trials, not just the percentage.", explanation: "The second simulation uses many more trials, so it is usually the more reliable estimate for prediction.", working: ["1000>240"] },
    ],
  },
];

const lessons: Record<string, LessonContent> = {
  "simple-complementary-events": simpleComplementary,
  "sample-spaces": sampleSpaces,
  "multi-stage-events": multiStage,
  "independent-events": independentEvents,
  "dependent-events": dependentEvents,
  "probability-simulations": simulations,
};

export function year9MakingPredictionsLessonOverride(course: CoursePathwaySeed, unit: CourseUnitSeed, lesson: CourseLessonSeed): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "making-predictions") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return { syllabusArea: "Statistics and Probability", masteryPassMark: 0.8, ...content };
}
