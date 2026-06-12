import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

type LessonContent = Pick<ExplicitLesson, "description" | "learningIntention" | "successCriteria" | "teaching" | "workedExamples" | "guidedPractice" | "independentPractice" | "commonMistakes" | "masteryQuiz">;

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
  const displayLatex = /-(?:g|i)\d+$/.test(id) ? "\\text{Show your probability method clearly.}" : latex;
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
    ? "\\text{Show your method clearly.}"
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

function choice(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], explanation: string, latex = "\\text{Select A, B, C, or D.}"): PracticeQuestion {
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
