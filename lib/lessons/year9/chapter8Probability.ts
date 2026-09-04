// Year 9 — Chapter 8 (Probability & Single-Variable Data), probability sections, 10-lesson rework:
// making-predictions (consolidating), sample-space-and-probability (core), complementary-events
// (consolidating), venn-diagrams (path), two-way-tables (path). Ported/adapted from the
// pre-restructure `makingPredictions.ts` and `probabilityB.ts` (both retired — see
// docs/migrations/Y9-probability-rework-slug-map.md) plus this file's own prior content.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Count favourable outcomes over total, or read the diagram/table.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the probability/set idea.", explanation };
}
const fr = (n: number, d: number) => { const g = (a: number, b: number): number => (b ? g(b, a % b) : a); const k = g(n, d); const sn = n / k, sd = d / k; return [`${sn}/${sd}`, `${sn} / ${sd}`, `${n}/${d}`, (sn / sd).toString()]; };

// ── making-predictions (consolidating) — MA4-PRO-C-01 review ──────────────────────────
const makingPredictionsLesson: Partial<ExplicitLesson> = {
  description: "Use probability to predict the likelihood of an event, from listing outcomes to the 0–1 probability scale.",
  learningIntention: "Use probability to predict the likelihood of an event, using the scale from impossible to certain.",
  successCriteria: [
    "List the outcomes of a simple chance experiment.",
    "Calculate P(event) = favourable ÷ total for equally likely outcomes.",
    "Place an event on the probability scale from 0 (impossible) to 1 (certain).",
    "Confirm that the probabilities of all outcomes in a sample space add to 1.",
  ],
  teaching: {
    paragraphs: [
      "Probability lets us PREDICT how likely an event is before it happens. We list every possible OUTCOME of a chance experiment, then compare the FAVOURABLE outcomes (the ones we want) to the TOTAL number of equally likely outcomes.",
      "P(event) = favourable outcomes ÷ total outcomes. Rolling a die and wanting a 3: there is 1 favourable outcome (the 3) out of 6 total outcomes, so P(3) = 1/6.",
      "Every probability sits on a scale from 0 to 1. A probability of 0 means the event is IMPOSSIBLE; a probability of 1 means it is CERTAIN. Values in between describe how likely the event is — closer to 0 is unlikely, closer to 1 is likely.",
      "The probabilities of every outcome in a sample space always add to 1, because together they cover everything that could happen. A spinner with outcomes red, blue and green, with P(red) = 0.5 and P(blue) = 0.3, must have P(green) = 1 − 0.5 − 0.3 = 0.2.",
      "Predicting an outcome from theoretical probability tells us what SHOULD happen if the experiment is fair. Later lessons compare this prediction against what actually happens when you run real trials.",
    ],
    latexBlocks: ["P(\\text{event})=\\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}", "0\\le P(\\text{event})\\le1", "P_1+P_2+\\cdots+P_n=1"],
  },
  workedExamples: [
    { title: "Predict a coin toss", questionLatex: "\\text{A fair coin is tossed. Find }P(\\text{head}).", steps: [{ explanation: "1 favourable outcome out of 2.", latex: "P(\\text{head})=\\tfrac12" }], finalAnswerLatex: "\\tfrac12" },
    { title: "Predict a die roll", questionLatex: "\\text{A fair die is rolled. Find }P(\\text{a number greater than 4}).", steps: [{ explanation: "5 and 6 are favourable, out of 6 total.", latex: "P(>4)=\\tfrac26" }, { explanation: "Simplify.", latex: "\\tfrac26=\\tfrac13" }], finalAnswerLatex: "\\tfrac13" },
    { title: "Outcomes must total 1", questionLatex: "\\text{A spinner has outcomes red, blue and green. }P(\\text{red})=0.4\\text{, }P(\\text{blue})=0.25\\text{. Find }P(\\text{green}).", steps: [{ explanation: "All three probabilities add to 1.", latex: "P(\\text{green})=1-0.4-0.25" }], finalAnswerLatex: "0.35" },
  ],
  guidedPractice: [
    ans("y9-mkp-g1", "A fair die is rolled. Find the probability of rolling a 5.", "P(5)", "1/6", 2, "1 favourable outcome (5) out of 6.", fr(1, 6)),
    ans("y9-mkp-g2", "A bag has 4 green and 6 yellow counters (10 total). Find the probability of selecting green.", "P(\\text{green})", "2/5", 2, "4 green out of 10 total: 4/10 = 2/5.", [...fr(2, 5), "4/10"]),
    mcq("y9-mkp-g3", "Which probability represents a certain event?", "D", ["0", "0.25", "0.8", "1"], 2, "A certain event has probability 1."),
    ans("y9-mkp-g4", "A coin is tossed. How many outcomes are in the sample space?", "n(S)", "2", 2, "Heads and tails: 2 outcomes.", []),
  ],
  independentPractice: [
    ans("y9-mkp-i1", "A fair die is rolled. Find the probability of rolling a number greater than 4.", "P(>4)", "1/3", 3, "5 and 6 are favourable: 2/6 = 1/3.", [...fr(1, 3), "2/6"]),
    mcq("y9-mkp-i2", "Which event is impossible when rolling a standard die?", "C", ["Rolling an odd number", "Rolling a number below 3", "Rolling a 7", "Rolling a factor of 6"], 2, "A standard die has no 7."),
    ans("y9-mkp-i3", "A spinner has 10 equal sectors, 4 of which are labelled WIN. Find the probability of landing on WIN.", "P(\\text{WIN})", "2/5", 3, "4 out of 10: 4/10 = 2/5.", [...fr(2, 5), "4/10"]),
    mcq("y9-mkp-i4", "Which probability describes an event that is likely but not certain?", "C", ["0", "0.1", "0.8", "1"], 2, "0.8 is close to 1 but not equal to it."),
    ans("y9-mkp-i5", "A spinner has three sectors A, B and C. P(A) = 0.2 and P(B) = 0.45. Find P(C).", "P(C)", "0.35", 3, "All three probabilities add to 1: 1 − 0.2 − 0.45 = 0.35.", []),
  ],
  masteryQuiz: [
    ans("y9-mkp-m1", "A fair die is rolled. Find the probability of rolling an even number.", "P(\\text{even})", "1/2", 2, "3 of 6 outcomes are even: 3/6 = 1/2.", fr(1, 2)),
    ans("y9-mkp-m2", "A bag has 3 black and 7 white counters. Find the probability of selecting black.", "P(\\text{black})", "3/10", 2, "3 out of 10.", fr(3, 10)),
    mcq("y9-mkp-m3", "Which probability represents an impossible event?", "A", ["0", "0.2", "0.5", "1"], 2, "Impossible events have probability 0."),
    ans("y9-mkp-m4", "A spinner has 5 equal sectors numbered 1 to 5. Find the probability of selecting an odd number.", "P(\\text{odd})", "3/5", 3, "1, 3 and 5 are odd: 3/5.", fr(3, 5)),
    mcq("y9-mkp-m5", "Which value cannot be a probability?", "D", ["0", "0.45", "1", "1.2"], 3, "Probabilities must be between 0 and 1 inclusive."),
    ans("y9-mkp-m6", "A card numbered 1 to 10 is selected at random. Find the probability of selecting a number below 4.", "P(<4)", "3/10", 3, "1, 2 and 3 are favourable: 3/10.", fr(3, 10)),
    ans("y9-mkp-m7", "Numbers 1 to 9 are written on cards. Find the probability of selecting a multiple of 3.", "P(\\text{mult of }3)", "1/3", 3, "3, 6 and 9 are favourable: 3/9 = 1/3.", [...fr(1, 3), "3/9"]),
    mcq("y9-mkp-m8", "Which statement about probability is correct?", "C", ["Probabilities must be whole numbers", "A probability of 0.5 means the event is certain", "A probability of 0 means the event is impossible", "Probabilities can be negative"], 2, "A probability of exactly 0 means the event cannot happen."),
    ans("y9-mkp-m9", "A survey of 40 people found that 25 prefer tea. Find the probability a randomly selected person prefers tea.", "P(\\text{tea})", "5/8", 3, "25/40 = 5/8.", [...fr(5, 8), "25/40"]),
    mcq("y9-mkp-m10", "An event has probability 0.62. Which description is best?", "C", ["Impossible", "Unlikely", "More likely than not, but not certain", "Certain"], 3, "The probability is above 0.5 and below 1."),
  ],
  masteryQuizPool: [
    ans("y9-mkp-p1", "A bag has 5 red and 7 blue counters (12 total). Find the probability of selecting red.", "P(\\text{red})", "5/12", 3, "5 out of 12.", fr(5, 12)),
    ans("y9-mkp-p2", "A spinner has 10 equal sectors, 6 shaded. Find the probability of landing on a shaded sector.", "P(\\text{shaded})", "3/5", 3, "6/10 = 3/5.", [...fr(3, 5), "6/10"]),
    ans("y9-mkp-p3", "Cards numbered 1 to 12 are mixed. Find the probability of selecting a multiple of 3.", "P(\\text{mult of }3)", "1/3", 3, "3, 6, 9, 12 are favourable: 4/12 = 1/3.", [...fr(1, 3), "4/12"]),
    ans("y9-mkp-p4", "A box has 4 green, 3 yellow and 5 black tiles (12 total). Find the probability of selecting yellow.", "P(\\text{yellow})", "1/4", 3, "3/12 = 1/4.", [...fr(1, 4), "3/12"]),
    ans("y9-mkp-p5", "Numbers 1 to 20 are written on cards. Find the probability of selecting an even number.", "P(\\text{even})", "1/2", 3, "10/20 = 1/2.", fr(1, 2)),
    mcq("y9-mkp-p6", "Which statement correctly describes an event with probability 0.04?", "B", ["It is impossible", "It is possible but unlikely", "It is certain", "It is more likely than not"], 4, "A probability of 0.04 is greater than 0, so it can happen, but it is close to 0."),
    ans("y9-mkp-p7", "A random letter is chosen from the word PROBABILITY. Find the probability of choosing the letter B.", "P(B)", "2/11", 4, "PROBABILITY has 11 letters and the letter B appears twice: 2/11.", []),
    ans("y9-mkp-p8", "A code digit is chosen at random from 0 to 9. Find the probability the digit is at least 7.", "P(\\ge7)", "3/10", 4, "7, 8 and 9 are favourable: 3/10.", fr(3, 10)),
    ans("y9-mkp-p9", "Three outcomes have probabilities 0.15, 0.35 and x. Find x.", "", "0.5", 4, "The probabilities add to 1: 1 − 0.15 − 0.35 = 0.5.", []),
    ans("y9-mkp-p10", "A drawer has 6 black socks, 4 white socks and 2 grey socks (12 total). Find the probability of selecting a grey sock.", "P(\\text{grey})", "1/6", 4, "2/12 = 1/6.", [...fr(1, 6), "2/12"]),
  ],
  commonMistakes: [
    { mistake: "Dividing total outcomes by favourable outcomes.", fix: "Always put favourable outcomes on top, total outcomes on the bottom." },
    { mistake: "Treating an unlikely event (small probability) as impossible.", fix: "Only a probability of exactly 0 means impossible." },
    { mistake: "Forgetting that a sample space's probabilities must add to 1.", fix: "Check a missing probability by subtracting the known ones from 1." },
    { mistake: "Giving a probability greater than 1 or less than 0.", fix: "Every probability must satisfy 0 ≤ P ≤ 1." },
  ],
  masteryPassMark: 0.8,
};

// ── sample-space-and-probability (core) — MA5-PRO-C-01 ────────────────────────────────
const sampleSpaceProbability: Partial<ExplicitLesson> = {
  description: "List and count sample spaces for one-stage and two-stage experiments, using tables/arrays, and use them to calculate probabilities.",
  learningIntention: "Build complete sample spaces and use them to calculate probabilities.",
  successCriteria: [
    "List every possible outcome of an experiment once.",
    "Use an ordered list, table or array for two-stage experiments.",
    "Count favourable outcomes from a sample space.",
    "Avoid double-counting or missing outcomes.",
  ],
  teaching: {
    paragraphs: [
      "A sample space is the complete list of all possible outcomes of an experiment — the probability version of drawing a map before counting. If the map is incomplete, the probability will be wrong even if the arithmetic is neat.",
      "For one-stage experiments, the sample space is often a simple list. For two-stage experiments, order matters: heads then tails is a different ordered outcome from tails then heads, so a table or array (grid) is used to make sure every combination appears exactly once.",
      "If stage one has 2 outcomes and stage two has 6 outcomes, every first-stage outcome pairs with every second-stage outcome, giving 2 × 6 = 12 outcomes. Rolling two dice gives a 6 × 6 = 36-outcome grid.",
      "Once the sample space is complete, probability returns to the same idea: count the favourable outcomes and divide by the total. P(sum = 7) on two dice = 6/36 = 1/6, because six cells of the grid give a sum of 7.",
      "A common mistake is to assume sums from two dice are equally likely because 2 to 12 looks like a simple list. It is not: a sum of 7 has many ordered pairs, while a sum of 2 has only one — always count the grid cells, not the possible totals.",
    ],
    latexBlocks: ["S=\\{\\text{all possible outcomes}\\}", "n(S)=n(\\text{stage 1})\\times n(\\text{stage 2})", "P(A)=\\dfrac{n(A)}{n(S)}"],
  },
  workedExamples: [
    { title: "Two coins", questionLatex: "\\text{Two fair coins are tossed. List the sample space and find }P(\\text{exactly one head}).", steps: [{ explanation: "List the ordered outcomes.", latex: "S=\\{HH,HT,TH,TT\\}" }, { explanation: "HT and TH are favourable.", latex: "P(\\text{exactly one H})=\\tfrac24=\\tfrac12" }], finalAnswerLatex: "\\tfrac12" },
    { title: "Coin and die array", questionLatex: "\\text{A coin and a die are used. Find }P(\\text{heads and an even number}).", steps: [{ explanation: "There are 2 × 6 equally likely outcomes.", latex: "n(S)=12" }, { explanation: "The favourable outcomes are H2, H4 and H6.", latex: "P=\\tfrac{3}{12}=\\tfrac14" }], finalAnswerLatex: "\\tfrac14" },
    {
      title: "Two dice sum",
      questionLatex: "\\text{Two fair dice are rolled. Find }P(\\text{sum }=7).",
      dataTableDiagram: {
        description: "6×6 array of sums for two dice. Rows are the first die, columns are the second die. Six cells (the diagonal from (1,6) to (6,1)) show a sum of 7.",
        columnHeaders: ["2nd die: 1", "2", "3", "4", "5", "6"],
        rowHeaders: ["1st die: 1", "2", "3", "4", "5", "6"],
        values: [
          [2, 3, 4, 5, 6, 7],
          [3, 4, 5, 6, 7, 8],
          [4, 5, 6, 7, 8, 9],
          [5, 6, 7, 8, 9, 10],
          [6, 7, 8, 9, 10, 11],
          [7, 8, 9, 10, 11, 12],
        ],
      },
      steps: [{ explanation: "There are 6 × 6 = 36 ordered outcomes.", latex: "n(S)=36" }, { explanation: "Six ordered pairs sum to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1).", latex: "P=\\tfrac{6}{36}=\\tfrac16" }],
      finalAnswerLatex: "\\tfrac16",
    },
  ] as WorkedExample[],
  guidedPractice: [
    ans("y9-ssp-g1", "Two coins are tossed. How many outcomes are in the sample space?", "n(S)", "4", 2, "The outcomes are HH, HT, TH and TT.", []),
    ans("y9-ssp-g2", "Two fair coins are tossed. Find the probability of two tails.", "P(TT)", "1/4", 2, "Only TT is favourable out of 4 outcomes.", fr(1, 4)),
    ans("y9-ssp-g3", "A coin and a four-sided spinner are used. How many ordered outcomes are possible?", "n(S)", "8", 2, "Multiply the number of coin outcomes by the number of spinner outcomes.", []),
    mcq("y9-ssp-g4", "Which list is the complete sample space for two coin tosses?", "B", ["HH, HT, TT", "HH, HT, TH, TT", "H, T", "HH, TT"], 3, "Order matters, so both HT and TH are included."),
  ],
  independentPractice: [
    ans("y9-ssp-i1", "Two fair coins are tossed. Find the probability of at least one head.", "P", "3/4", 3, "HH, HT and TH are favourable out of 4.", fr(3, 4)),
    ans("y9-ssp-i2", "A fair die and a coin are used. How many ordered outcomes are possible?", "n(S)", "12", 2, "Multiply 6 by 2.", []),
    ans("y9-ssp-i3", "A coin and a fair die are used. Find the probability of tails and a number above 4.", "P", "1/6", 3, "The favourable outcomes are T5 and T6: 2/12 = 1/6.", [...fr(1, 6), "2/12"]),
    mcq("y9-ssp-i4", "Why are HT and TH both included when two coins are tossed in order?", "C", ["They have different likelihoods", "They both mean two heads", "The order of the results is different", "One of them is impossible"], 3, "The first and second toss positions are different."),
    ans("y9-ssp-i5", "Two fair dice are rolled. Find the probability that the sum is 2.", "P", "1/36", 4, "Only the ordered pair (1,1) is favourable.", fr(1, 36)),
  ],
  masteryQuiz: [
    ans("y9-ssp-m1", "Two coins are tossed. How many ordered outcomes are possible?", "n(S)", "4", 2, "There are four ordered outcomes.", []),
    ans("y9-ssp-m2", "Two fair coins are tossed. Find the probability of HH.", "P(HH)", "1/4", 2, "One of the four outcomes is HH.", fr(1, 4)),
    ans("y9-ssp-m3", "A coin and a six-sided die are used. How many outcomes are possible?", "n(S)", "12", 2, "Multiply the choices for each stage.", []),
    ans("y9-ssp-m4", "A coin and a fair die are used. Find the probability of heads and a number below 3.", "P", "1/6", 3, "The favourable outcomes are H1 and H2: 2/12 = 1/6.", [...fr(1, 6), "2/12"]),
    mcq("y9-ssp-m5", "Which sample space is complete for a spinner labelled A or B, used twice?", "D", ["AA, BB", "A, B", "AA, AB, BB", "AA, AB, BA, BB"], 3, "The two mixed ordered outcomes are both needed."),
    ans("y9-ssp-m6", "Two fair dice are rolled. Find the probability of a sum of 12.", "P", "1/36", 3, "Only (6,6) is favourable.", fr(1, 36)),
    ans("y9-ssp-m7", "Two fair dice are rolled. Find the probability of a sum of 6.", "P", "5/36", 4, "The favourable pairs are (1,5),(2,4),(3,3),(4,2),(5,1).", fr(5, 36)),
    ans("y9-ssp-m8", "A spinner has 3 equal sectors and a die has 6 faces. How many ordered spinner-die outcomes are possible?", "n(S)", "18", 2, "Multiply the outcomes for the two stages.", []),
    ans("y9-ssp-m9", "Two fair dice are rolled. Find the probability that the sum is 5 or 6.", "P", "1/4", 4, "4 pairs sum to 5 and 5 pairs sum to 6, giving 9/36 = 1/4.", fr(1, 4)),
    ans("y9-ssp-m10", "Two fair coins are tossed and a fair die is rolled. Find the probability of exactly one head and an even die result.", "P", "1/4", 4, "Exactly one head has probability 1/2 and an even die result has probability 1/2.", fr(1, 4)),
  ],
  masteryQuizPool: [
    ans("y9-ssp-p1", "A coin is tossed and a fair die is rolled. How many ordered outcomes are possible?", "n(S)", "12", 3, "2 × 6 = 12.", []),
    ans("y9-ssp-p2", "Three fair coins are tossed. How many ordered outcomes are possible?", "n(S)", "8", 4, "2 × 2 × 2 = 8.", []),
    ans("y9-ssp-p3", "Two fair dice are rolled. How many ordered outcomes have a sum of 8?", "\\text{count}", "5", 4, "(2,6),(3,5),(4,4),(5,3),(6,2) — 5 outcomes.", []),
    ans("y9-ssp-p4", "A coin is tossed and then a card numbered 1 to 8 is selected. Find the probability of heads and an even number.", "P", "1/4", 4, "The favourable outcomes are H2, H4, H6, H8: 4/16 = 1/4.", [...fr(1, 4), "4/16"]),
    ans("y9-ssp-p5", "Two fair coins are tossed. Find the probability of at least one tail.", "P", "3/4", 3, "HT, TH and TT are favourable out of 4.", fr(3, 4)),
    ans("y9-ssp-p6", "A spinner with sectors A, B and C is spun twice. Find the probability of getting the same letter twice.", "P", "1/3", 4, "3 matching outcomes out of 9: 3/9 = 1/3.", [...fr(1, 3), "3/9"]),
    ans("y9-ssp-p7", "Three fair coins are tossed. Find the probability of exactly two heads.", "P", "3/8", 4, "HHT, HTH and THH are favourable: 3/8.", fr(3, 8)),
    ans("y9-ssp-p8", "Two fair dice are rolled. Find the probability that the first die shows a larger number than the second.", "P", "5/12", 5, "15 of the 36 ordered pairs have a larger first die: 15/36 = 5/12.", [...fr(5, 12), "15/36"]),
    mcq("y9-ssp-p9", "Why are HT and TH counted separately for two coin tosses?", "B", ["They have different likelihoods", "They occur in different orders", "One is impossible", "They both mean no heads"], 3, "The first and second toss positions are different."),
    mcq("y9-ssp-p10", "A student says each dice sum from 2 to 12 is equally likely. What is the flaw?", "C", ["Dice cannot make sums", "Only even sums occur", "Different sums have different numbers of ordered pairs", "There are only six sums"], 4, "Sums are not equally likely because, for example, 7 has more ordered pairs than 2."),
  ],
  multiPartPractice: [
    {
      id: "y9-ssp-mp1",
      prompt: "A cafe lets a customer choose one of 3 wraps and one of 4 drinks. Each meal combination is equally likely.",
      latex: "\\text{Use the sample-space structure.}",
      answer: "12",
      acceptedAnswers: [],
      hint: "Pair each wrap with each drink.",
      explanation: "The sample space has 3 × 4 = 12 combinations. Favourable combinations can then be counted from that space.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the number of possible meal combinations.", marks: 1, answer: "12", hint: "Multiply the number of wrap choices by the number of drink choices.", explanation: "Each of the 3 wraps can pair with each of the 4 drinks: 3 × 4 = 12.", working: ["n(S)=3\\times4=12"] },
        { key: "b", label: "(b)", prompt: "One wrap is vegetarian and two drinks are juice. Find the number of vegetarian-and-juice combinations.", marks: 2, answer: "2", hint: "Pair the 1 vegetarian wrap with the 2 juice choices.", explanation: "1 vegetarian wrap × 2 juice drinks = 2 favourable combinations.", working: ["n(V\\cap J)=1\\times2=2"] },
        { key: "c", label: "(c)", prompt: "Find the probability of a vegetarian-and-juice combination.", marks: 2, answer: "1/6", acceptedAnswers: ["2/12", "0.1667"], hint: "Use favourable combinations over total combinations.", explanation: "2 favourable combinations out of 12 total: 2/12 = 1/6.", working: ["P=\\tfrac{2}{12}=\\tfrac16"] },
      ],
    },
  ],
  commonMistakes: [
    { mistake: "Leaving out an ordered outcome such as TH.", fix: "List outcomes systematically using positions or a table." },
    { mistake: "Treating HT and TH as the same outcome.", fix: "Keep the order when stages occur one after another." },
    { mistake: "Assuming all sums from two dice are equally likely.", fix: "Count the ordered pairs that produce each sum." },
    { mistake: "Double-counting an outcome.", fix: "Use a table or array so each combination appears once." },
  ],
  masteryPassMark: 0.8,
};

// ── complementary-events (consolidating) — MA4-PRO-C-01 ───────────────────────────────
const complementaryEvents: Partial<ExplicitLesson> = {
  description: "Use the complement rule P(not A) = 1 − P(A) to solve probability problems without directly counting.",
  learningIntention: "Identify the complement of an event and use it to calculate probability efficiently.",
  successCriteria: [
    "Identify and describe the complement of an event.",
    "Verify that P(event) + P(complement) = 1.",
    "Solve problems using the complement rule P(not A) = 1 − P(A).",
    "Represent complementary outcomes as a fraction, decimal or percentage.",
  ],
  teaching: {
    paragraphs: [
      "The complement of an event A, written 'not A', is everything in the sample space that is NOT in A. Together, A and 'not A' cover every possible outcome exactly once.",
      "Because A and its complement cover the whole sample space with no overlap, their probabilities always add to 1: P(A) + P(\\text{not }A) = 1. Rearranging gives the complement rule: P(\\text{not }A) = 1 - P(A).",
      "The complement rule is often the fastest way to solve a problem. If a spinner has P(\\text{blue}) = 7/10, then P(\\text{not blue}) = 1 - 7/10 = 3/10 — no counting of the other sectors required.",
      "Complementary events can be written as a fraction, a decimal or a percentage. Whichever form you use, the event and its complement must still add to 1 (or 100%).",
      "Watch for events that sound complementary but are not exact opposites. 'Not rolling a 6' and 'rolling an even number' are different events — the complement is always precisely everything the original event excludes, nothing more and nothing less.",
    ],
    latexBlocks: ["P(A)+P(\\text{not }A)=1", "P(\\text{not }A)=1-P(A)"],
  },
  workedExamples: [
    { title: "Find a complement directly", questionLatex: "\\text{A fair die is rolled. Find }P(\\text{not rolling a 3}).", steps: [{ explanation: "Subtract from 1.", latex: "P(\\text{not }3)=1-\\tfrac16" }], finalAnswerLatex: "\\tfrac56" },
    { title: "Complement from a bag", questionLatex: "\\text{A bag has 7 red and 3 blue counters. Find }P(\\text{not blue}).", steps: [{ explanation: "P(blue) = 3/10.", latex: "P(\\text{blue})=\\tfrac{3}{10}" }, { explanation: "Subtract from 1.", latex: "P(\\text{not blue})=1-\\tfrac{3}{10}=\\tfrac{7}{10}" }], finalAnswerLatex: "\\tfrac{7}{10}" },
    { title: "Complement as a percentage", questionLatex: "\\text{The probability of rain is 35\\%. Find the probability it does not rain.}", steps: [{ explanation: "Subtract from 100%.", latex: "100\\%-35\\%" }], finalAnswerLatex: "65\\%" },
  ],
  guidedPractice: [
    ans("y9-cev-g1", "A fair coin is tossed. Find the probability of not getting heads.", "P(\\text{not H})", "1/2", 2, "Not heads means tails: 1 − 1/2 = 1/2.", fr(1, 2)),
    ans("y9-cev-g2", "If P(A) = 1/4, find P(not A).", "P(\\text{not }A)", "3/4", 2, "1 − 1/4 = 3/4.", fr(3, 4)),
    ans("y9-cev-g3", "A bag has 4 red and 1 blue counter (5 total). Find the probability of not selecting blue.", "P(\\text{not blue})", "4/5", 2, "P(blue) = 1/5, so P(not blue) = 1 − 1/5 = 4/5.", fr(4, 5)),
    mcq("y9-cev-g4", "A student says P(not rain) = 1 + P(rain). What is the error?", "A", ["Complements are found by subtracting from 1, not adding", "Rain cannot have a complement", "The total outcomes should be doubled", "Probabilities cannot describe weather"], 3, "The complement rule subtracts from 1: P(not A) = 1 − P(A)."),
  ],
  independentPractice: [
    ans("y9-cev-i1", "A spinner has 8 equal sectors, 3 of which are orange. Find the probability of not landing on orange.", "P(\\text{not orange})", "5/8", 3, "5/8.", fr(5, 8)),
    ans("y9-cev-i2", "The probability of a bus being late is 1/8. Find the probability that it is not late.", "P(\\text{not late})", "7/8", 3, "7/8.", fr(7, 8)),
    ans("y9-cev-i3", "If P(win) = 0.35, find P(not win).", "", "0.65", 2, "1 − 0.35 = 0.65.", []),
    ans("y9-cev-i4", "A bag has 5 red, 4 blue and 1 green counter (10 total). Find the probability of selecting neither red nor green.", "", "2/5", 4, "Neither red nor green means blue: 4/10 = 2/5. This is the complement of (red or green).", [...fr(2, 5), "4/10"]),
    mcq("y9-cev-i5", "If P(A) = 7/20, what is P(not A)?", "C", ["7/20", "13/7", "13/20", "20/7"], 3, "1 − 7/20 = 13/20."),
  ],
  masteryQuiz: [
    ans("y9-cev-m1", "A spinner has 5 equal sectors, one labelled X. Find the probability of not landing on X.", "", "4/5", 2, "Four of the five sectors are not X.", fr(4, 5)),
    ans("y9-cev-m2", "If P(A) = 0.3, find P(not A).", "", "0.7", 2, "1 − 0.3 = 0.7.", []),
    ans("y9-cev-m3", "The probability that it rains tomorrow is 3/10. Find the probability that it does not rain.", "", "7/10", 3, "1 − 3/10 = 7/10.", fr(7, 10)),
    mcq("y9-cev-m4", "Which statement about complements is correct?", "B", ["P(A) and P(not A) can both be greater than 0.5", "P(A) + P(not A) always equals 1", "P(not A) is always smaller than P(A)", "Complements only apply to coins and dice"], 3, "An event and its complement always add to 1."),
    ans("y9-cev-m5", "A bag has 9 red and 6 blue counters (15 total). Find the probability of not selecting red.", "", "2/5", 3, "P(red) = 9/15 = 3/5, so P(not red) = 2/5.", [...fr(2, 5), "6/15"]),
    ans("y9-cev-m6", "The probability a train arrives on time is 0.82. Find the probability it does not arrive on time.", "", "0.18", 2, "1 − 0.82 = 0.18.", []),
    ans("y9-cev-m7", "A card is chosen from a set numbered 1–15. Find the probability of NOT choosing a number greater than 10.", "", "2/3", 4, "P(>10) = 5/15 = 1/3, so P(not >10) = 2/3.", fr(2, 3)),
    mcq("y9-cev-m8", "P(A) = 0.9. Which of the following is P(not A)?", "A", ["0.1", "0.9", "1.9", "−0.1"], 2, "1 − 0.9 = 0.1."),
    ans("y9-cev-m9", "A survey of 50 students found 32 own a pet. Find the probability a randomly chosen student does NOT own a pet.", "", "9/25", 4, "P(pet) = 32/50 = 16/25, so P(not pet) = 9/25.", [...fr(9, 25), "18/50"]),
    mcq("y9-cev-m10", "A student says the complement of 'rolling a 6' on a die is 'rolling a 1'. What is wrong with this statement?", "B", ["Nothing is wrong", "The complement of 'rolling a 6' is 'not rolling a 6', which includes 1, 2, 3, 4 and 5", "A die cannot have a complement", "P(not 6) is always 0"], 4, "The complement includes every outcome that is not a 6."),
  ],
  masteryQuizPool: [
    ans("y9-cev-p1", "P(A) = 0.72. Find P(not A).", "", "0.28", 3, "1 − 0.72 = 0.28.", []),
    ans("y9-cev-p2", "A bag has 11 winning and 39 losing tickets (50 total). Find the probability of NOT selecting a winning ticket.", "", "39/50", 4, "39/50 tickets are losing.", []),
    mcq("y9-cev-p3", "Which value cannot be a probability?", "D", ["0", "0.45", "1", "1.2"], 3, "Probabilities cannot be below 0 or above 1."),
    ans("y9-cev-p4", "A spinner has 12 equal sectors; P(orange) = 1/3. Find P(not orange).", "", "2/3", 3, "1 − 1/3 = 2/3.", fr(2, 3)),
    ans("y9-cev-p5", "The probability a light bulb is faulty is 1/25. Find the probability it is not faulty.", "", "24/25", 3, "1 − 1/25 = 24/25.", fr(24, 25)),
    mcq("y9-cev-p6", "If P(A) = x, which expression gives P(not A)?", "B", ["x − 1", "1 − x", "1 + x", "−x"], 2, "The complement rule is P(not A) = 1 − P(A)."),
    ans("y9-cev-p7", "A class has 30 students; 18 walk to school. Find the probability a randomly chosen student does NOT walk to school.", "", "2/5", 4, "12 of 30 do not walk: 12/30 = 2/5.", [...fr(2, 5), "12/30"]),
    ans("y9-cev-p8", "P(pass an exam) = 0.88. Find P(fail).", "", "0.12", 3, "1 − 0.88 = 0.12.", []),
    ans("y9-cev-p9", "A bag has 3 red, 5 blue, 4 green and 8 yellow counters (20 total). Find the probability of selecting neither blue nor yellow.", "", "7/20", 5, "Neither blue nor yellow means red or green: (3+4)/20 = 7/20.", []),
    ans("y9-cev-p10", "A random integer from 1 to 25 is generated. Find the probability it is NOT at least 21.", "", "4/5", 4, "P(at least 21) = 5/25 = 1/5, so P(not at least 21) = 4/5.", fr(4, 5)),
  ],
  commonMistakes: [
    { mistake: "Adding 1 to the known probability instead of subtracting from 1.", fix: "P(not A) = 1 − P(A) — always subtract." },
    { mistake: "Forgetting that P(A) and P(not A) must add to exactly 1.", fix: "Check your two probabilities sum to 1 (or 100%)." },
    { mistake: "Treating 'neither...nor...' as unrelated to the complement rule.", fix: "'Neither X nor Y' is the complement of (X or Y)." },
    { mistake: "Mixing forms — subtracting a percentage from a probability written as a fraction.", fix: "Convert to the same form (fraction, decimal or percentage) before subtracting." },
  ],
  masteryPassMark: 0.8,
};

// ── venn-diagrams (path) — MA5-PRO-P-01 ────────────────────────────────────────────────
const vennDiagramsLesson: Partial<ExplicitLesson> = {
  description: "Construct and interpret two-set Venn diagrams using set notation, and calculate probabilities including unions, intersections, complements and mutually exclusive events.",
  learningIntention: "Use Venn diagrams and set notation to represent events and calculate probabilities, including P(A), P(A∪B), P(A∩B), P(A'), and mutually exclusive events.",
  successCriteria: [
    "Define a set as a collection of distinct elements, and identify the regions of a two-set Venn diagram: A only, B only, A∩B, and neither.",
    "Use set notation A∪B, A∩B, and A' correctly.",
    "Calculate P(A), P(B), P(A∩B), and P(A∪B) from frequency counts in a Venn diagram.",
    "Apply the addition rule P(A∪B) = P(A) + P(B) − P(A∩B).",
    "Recognise mutually exclusive events (A∩B = 0, non-overlapping circles).",
  ],
  teaching: {
    paragraphs: [
      "A SET is simply a collection of distinct elements — for example, the set of students who play sport. A Venn diagram uses overlapping circles inside a rectangle that represents the entire sample space (the universal set). Each circle represents an event; elements in the overlapping region belong to BOTH events.",
      "Set notation describes each region precisely. A∪B (union) contains everything in A or B or both. A∩B (intersection) contains only elements in both A and B. A' (complement) contains everything NOT in A. The total of all four regions — A only, B only, A∩B, and neither — always equals the total number of outcomes in the sample space.",
      "To calculate probabilities, count the elements in each region and divide by the total: P(A) = n(A) ÷ n(S). The region 'A only' means elements in A but NOT in B, so n(A only) = n(A) − n(A∩B).",
      "The addition rule avoids double-counting the intersection: P(A∪B) = P(A) + P(B) − P(A∩B). Without subtracting the intersection, elements in both sets would be counted twice. This rule always applies, whether or not A and B overlap.",
      "Two events are MUTUALLY EXCLUSIVE if they cannot both happen — their circles do not overlap, so P(A∩B) = 0, and the addition rule simplifies to P(A∪B) = P(A) + P(B) because there is nothing to subtract.",
    ],
    latexBlocks: [
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "P(A')=1-P(A)",
      "P(A\\cap B)=\\dfrac{n(A\\cap B)}{n(S)}",
      "\\text{mutually exclusive: }P(A\\cap B)=0\\Rightarrow P(A\\cup B)=P(A)+P(B)",
    ],
  },
  workedExamples: [
    {
      title: "Read probabilities from a Venn diagram",
      questionLatex: "\\text{A survey of 40 students asked whether they play sport (S) or music (M).}\\\\\\text{The Venn diagram shows: S only = 15, S}\\cap\\text{M = 8, M only = 12, neither = 5.}\\\\\\text{Find P(S), P(M), P(S}\\cap\\text{M), P(S}\\cup\\text{M), and P(S').}",
      vennDiagram: { description: "Venn diagram for 40 students. Sport only = 15, both sport and music = 8, music only = 12, neither = 5.", setALabel: "Sport", setBLabel: "Music", aOnly: 15, intersection: 8, bOnly: 12, neither: 5, total: 40, showCounts: true },
      steps: [
        { explanation: "n(S) = S only + intersection = 15 + 8 = 23. Divide by 40.", latex: "P(S)=\\frac{23}{40}" },
        { explanation: "n(M) = M only + intersection = 12 + 8 = 20. Divide by 40.", latex: "P(M)=\\frac{20}{40}=\\frac{1}{2}" },
        { explanation: "The intersection region has 8 students.", latex: "P(S\\cap M)=\\frac{8}{40}=\\frac{1}{5}" },
        { explanation: "The union covers all students in at least one circle: 15 + 8 + 12 = 35.", latex: "P(S\\cup M)=\\frac{35}{40}=\\frac{7}{8}" },
        { explanation: "The complement of S includes everyone not in S: M only + neither = 12 + 5 = 17.", latex: "P(S')=1-\\frac{23}{40}=\\frac{17}{40}" },
      ],
      finalAnswerLatex: "P(S)=\\dfrac{23}{40},\\;P(M)=\\dfrac{1}{2},\\;P(S\\cap M)=\\dfrac{1}{5},\\;P(S\\cup M)=\\dfrac{7}{8},\\;P(S')=\\dfrac{17}{40}",
    },
    {
      title: "Find P(A only)",
      questionLatex: "\\text{Using the same diagram, find P(sport only) — the probability a student plays sport but NOT music.}",
      vennDiagram: { description: "Venn diagram for 40 students. Sport only = 15, both sport and music = 8, music only = 12, neither = 5.", setALabel: "Sport", setBLabel: "Music", aOnly: 15, intersection: 8, bOnly: 12, neither: 5, total: 40, showCounts: true },
      steps: [
        { explanation: "The 'S only' region contains students in S but not in M: the diagram shows 15 students there.", latex: "n(S\\text{ only})=15" },
        { explanation: "Divide by the total of 40.", latex: "P(S\\text{ only})=\\frac{15}{40}=\\frac{3}{8}" },
      ],
      finalAnswerLatex: "P(S\\text{ only})=\\dfrac{3}{8}",
    },
    {
      title: "Mutually exclusive events",
      questionLatex: "\\text{A fair die is rolled. A = rolling an even number, B = rolling a 5.}\\\\\\text{Are A and B mutually exclusive? Find P(A}\\cup\\text{B).}",
      steps: [
        { explanation: "No outcome is both even and a 5, so A and B do not overlap.", latex: "A\\cap B=\\varnothing\\Rightarrow P(A\\cap B)=0" },
        { explanation: "Because they are mutually exclusive, add the probabilities directly.", latex: "P(A\\cup B)=P(A)+P(B)=\\frac36+\\frac16" },
      ],
      finalAnswerLatex: "P(A\\cup B)=\\dfrac23\\text{ — A and B are mutually exclusive.}",
    },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-vend-g1", "A Venn diagram has two circles A and B. Which region represents A∩B?", "B", ["The region inside A but outside B", "The region inside both A and B", "The region inside B but outside A", "The region outside both circles"], 2, "A∩B is the intersection — where both circles overlap."),
    { ...ans("y9-vend-g2", "The Venn diagram below shows: A only = 10, A∩B = 4, B only = 6, neither = 5. What is the total n(S)?", "", "25", 2, "Add all four regions: 10 + 4 + 6 + 5 = 25.", []), vennDiagram: { description: "Venn diagram of the sample space. A only = 10, A∩B = 4, B only = 6, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 10, intersection: 4, bOnly: 6, neither: 5, total: 25, showCounts: true } },
    { ...ans("y9-vend-g3", "Using the same diagram, find P(A∩B) as a fraction in simplest form.", "P(A\\cap B)=\\dfrac{n(A\\cap B)}{n(S)}", "4/25", 3, "The intersection region has 4 elements: 4/25.", []), vennDiagram: { description: "Venn diagram of the sample space. A only = 10, A∩B = 4, B only = 6, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 10, intersection: 4, bOnly: 6, neither: 5, total: 25, showCounts: true } },
    { ...ans("y9-vend-g4", "Using the same diagram, find P(A').", "P(A')=1-P(A)", "11/25", 3, "n(A) = 10 + 4 = 14, so P(A) = 14/25 and P(A') = 11/25.", []), vennDiagram: { description: "Venn diagram of the sample space. A only = 10, A∩B = 4, B only = 6, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 10, intersection: 4, bOnly: 6, neither: 5, total: 25, showCounts: true } },
  ],
  independentPractice: [
    { ...ans("y9-vend-i1", "The Venn diagram below shows: A only = 6, A∩B = 5, B only = 9, neither = 10, total = 30. Find P(A∩B) as a fraction in simplest form.", "", "1/6", 3, "P(A∩B) = 5/30 = 1/6.", ["5/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 6, A∩B = 5, B only = 9, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 6, intersection: 5, bOnly: 9, neither: 10, total: 30, showCounts: true } },
    { ...ans("y9-vend-i2", "Using the same diagram, find P(A∪B) as a fraction in simplest form.", "", "2/3", 3, "n(A∪B) = 6 + 5 + 9 = 20. P(A∪B) = 20/30 = 2/3.", ["20/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 6, A∩B = 5, B only = 9, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 6, intersection: 5, bOnly: 9, neither: 10, total: 30, showCounts: true } },
    { ...ans("y9-vend-i3", "Using the same diagram, find P(A only) as a fraction in simplest form.", "", "1/5", 3, "n(A only) = 6. P(A only) = 6/30 = 1/5.", ["6/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 6, A∩B = 5, B only = 9, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 6, intersection: 5, bOnly: 9, neither: 10, total: 30, showCounts: true } },
    { ...ans("y9-vend-i4", "The Venn diagram below shows: A only = 8, A∩B = 7, B only = 10, neither = 5, total = 30. Find P(A') as a fraction in simplest form.", "P(A')=1-P(A)", "1/2", 3, "n(A) = 15, so P(A) = 1/2 and P(A') = 1/2.", ["15/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 8, A∩B = 7, B only = 10, neither = 5.", setALabel: "A", setBLabel: "B", aOnly: 8, intersection: 7, bOnly: 10, neither: 5, total: 30, showCounts: true } },
    mcq("y9-vend-i5", "P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.2. What is P(A∪B)?", "C", ["0.7", "0.8", "0.9", "1.1"], 3, "P(A∪B) = 0.6 + 0.5 − 0.2 = 0.9."),
  ],
  masteryQuiz: [
    { ...ans("y9-vend-m1", "The Venn diagram below shows: A only = 12, A∩B = 6, B only = 8, neither = 4, total = 30. Find P(A∩B) as a fraction in simplest form.", "", "1/5", 3, "P(A∩B) = 6/30 = 1/5.", ["6/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 12, A∩B = 6, B only = 8, neither = 4.", setALabel: "A", setBLabel: "B", aOnly: 12, intersection: 6, bOnly: 8, neither: 4, total: 30, showCounts: true } },
    { ...ans("y9-vend-m2", "Using the same diagram, find P(A∪B) as a fraction in simplest form.", "", "13/15", 4, "n(A∪B) = 12 + 6 + 8 = 26. P(A∪B) = 26/30 = 13/15.", ["26/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 12, A∩B = 6, B only = 8, neither = 4.", setALabel: "A", setBLabel: "B", aOnly: 12, intersection: 6, bOnly: 8, neither: 4, total: 30, showCounts: true } },
    mcq("y9-vend-m3", "Which expression correctly represents the region 'A only' (inside A but outside B)?", "A", ["P(A) − P(A∩B)", "P(A) + P(B)", "P(A∪B) − P(B)", "1 − P(A)"], 3, "'A only' is A minus the shared part with B."),
    { ...ans("y9-vend-m4", "The Venn diagram below shows: A only = 9, A∩B = 3, B only = 12, neither = 6, total = 30. Find P(B only) as a fraction in simplest form.", "", "2/5", 3, "P(B only) = 12/30 = 2/5.", ["12/30"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 9, A∩B = 3, B only = 12, neither = 6.", setALabel: "A", setBLabel: "B", aOnly: 9, intersection: 3, bOnly: 12, neither: 6, total: 30, showCounts: true } },
    ans("y9-vend-m5", "P(A) = 7/20 and P(A∩B) = 3/20. Find P(A only) as a fraction in simplest form.", "P(A\\text{ only})=P(A)-P(A\\cap B)", "1/5", 3, "7/20 − 3/20 = 4/20 = 1/5.", ["4/20"]),
    ans("y9-vend-m6", "P(A) = 0.45, P(B) = 0.55, P(A∩B) = 0.15. Find P(A∪B).", "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)", "0.85", 3, "0.45 + 0.55 − 0.15 = 0.85.", [".85"]),
    mcq("y9-vend-m7", "A Venn diagram shows P(A) = 0.5 and P(A∩B) = 0.2. What is P(A')?", "B", ["0.3", "0.5", "0.7", "0.8"], 3, "P(A') = 1 − P(A) = 0.5; the intersection is not needed to find P(A')."),
    { ...ans("y9-vend-m8", "The Venn diagram below has A only = 14, A∩B = 6, B only = 10, neither = 10, total = 40. Find P(neither) as a fraction in simplest form.", "", "1/4", 3, "P(neither) = 10/40 = 1/4.", ["10/40"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 14, A∩B = 6, B only = 10, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 14, intersection: 6, bOnly: 10, neither: 10, total: 40, showCounts: true } },
    { ...ans("y9-vend-m9", "Using the same diagram, find P(A∪B) using the addition rule.", "P(A\\cup B)", "3/4", 4, "(14+6+10)/40 = 30/40 = 3/4.", ["30/40"]), vennDiagram: { description: "Venn diagram of the sample space. A only = 14, A∩B = 6, B only = 10, neither = 10.", setALabel: "A", setBLabel: "B", aOnly: 14, intersection: 6, bOnly: 10, neither: 10, total: 40, showCounts: true } },
    mcq("y9-vend-m10", "A class of 30 students: 18 like reading (R), 14 like art (A), and 6 like both. How many like neither?", "A", ["4", "2", "6", "8"], 4, "n(R∪A) = 18 + 14 − 6 = 26. Neither = 30 − 26 = 4."),
  ],
  masteryQuizPool: [
    ans("y9-vend-p1", "A Venn diagram shows: A only = 9, A∩B = 6, B only = 5, neither = 10, total = 30. Find P(A∩B).", "", "1/5", 3, "6/30 = 1/5.", ["6/30"]),
    ans("y9-vend-p2", "Using the same diagram, find P(A∪B).", "", "2/3", 3, "(9+6+5)/30 = 20/30 = 2/3.", ["20/30"]),
    ans("y9-vend-p3", "Using the same diagram, find P(neither).", "", "1/3", 3, "10/30 = 1/3.", ["10/30"]),
    mcq("y9-vend-p4", "Which region of a Venn diagram is the union A∪B?", "C", ["Only the overlap", "Only outside both circles", "Everything in A, B, or both", "Only in A but not B"], 2, "The union includes A only, B only and the intersection."),
    ans("y9-vend-p5", "P(A) = 0.7, P(B) = 0.4, P(A∩B) = 0.3. Find P(A∪B).", "", "0.8", 3, "0.7 + 0.4 − 0.3 = 0.8.", [".8"]),
    ans("y9-vend-p6", "A Venn diagram shows A only = 5, A∩B = 0, B only = 8, neither = 7. Find P(A∩B), and state whether A and B are mutually exclusive.", "", "0", 3, "P(A∩B) = 0, so A and B are mutually exclusive.", []),
    mcq("y9-vend-p7", "Two events are mutually exclusive when:", "A", ["P(A∩B) = 0 — they cannot both happen", "P(A∪B) = 0", "P(A) = P(B)", "Their probabilities always add to 1"], 3, "Mutually exclusive events cannot both occur, so their intersection probability is 0."),
    ans("y9-vend-p8", "In a class of 25 students, 12 like reading and 8 like art, and no student likes both (mutually exclusive). Find P(reading or art).", "", "4/5", 4, "12/25 + 8/25 = 20/25 = 4/5.", ["20/25"]),
    ans("y9-vend-p9", "P(A) = 0.55. Find P(A').", "", "0.45", 2, "1 − 0.55 = 0.45.", []),
    mcq("y9-vend-p10", "A Venn diagram total is 40. n(A) = 18, n(B) = 22, n(A∩B) = 5. Find n(A∪B).", "A", ["35", "40", "45", "5"], 4, "18 + 22 − 5 = 35."),
  ],
  commonMistakes: [
    { mistake: "Confusing A∩B (intersection) with A∪B (union): thinking the overlapping region is the union.", fix: "The intersection A∩B is only the overlapping part. The union A∪B includes everything in either circle." },
    { mistake: "Forgetting to subtract P(A∩B) in the addition rule, getting P(A∪B) = P(A) + P(B).", fix: "Elements in A∩B are counted in both P(A) and P(B), so subtract P(A∩B) once — unless the events are mutually exclusive." },
    { mistake: "Using n(S) = n(A) + n(B) rather than including 'neither'.", fix: "n(S) = n(A only) + n(A∩B) + n(B only) + n(neither). Always add all four regions." },
    { mistake: "Calculating P(A) as just the 'A only' region, forgetting to include A∩B.", fix: "n(A) includes all elements in A: n(A only) + n(A∩B)." },
  ],
  masteryPassMark: 0.8,
};

// ── two-way-tables (path) — MA5-PRO-P-01 ───────────────────────────────────────────────
const twoWayTablesLesson: Partial<ExplicitLesson> = {
  description: "Construct and read two-way frequency tables to find marginal frequencies, joint probabilities and informal conditional probabilities, and convert between Venn diagrams and two-way tables.",
  learningIntention: "Use two-way tables to organise data for two categorical variables and calculate probabilities, including informal conditional probabilities.",
  successCriteria: [
    "Identify rows, columns, cells, marginal totals, and the grand total in a two-way table.",
    "Find a probability by dividing a cell count (or row/column total) by the grand total.",
    "Find a conditional probability from a table by restricting to the relevant row or column.",
    "Convert the same data between a Venn diagram and a two-way table.",
  ],
  teaching: {
    paragraphs: [
      "A two-way table (also called a contingency table) displays two categorical variables at once. Rows represent one variable and columns represent another. Each cell shows the count of outcomes with that particular combination of categories.",
      "The totals at the end of each row and at the bottom of each column are called marginal frequencies — they show the total for one variable, ignoring the other. The bottom-right cell is the grand total, which equals the sample size and equals the sum of all row totals or all column totals.",
      "To find probabilities, divide the relevant count by the grand total. P(male and sport) = (count in the male-and-sport cell) ÷ (grand total). P(sport) = (sport column total) ÷ (grand total).",
      "A conditional probability from a table restricts the sample space to one row or column. P(sport | male) = (count in the male-and-sport cell) ÷ (male row total) — we are 'given' the person is male, so we only look within the male row.",
      "The same two categorical variables can be shown either as a Venn diagram (regions and overlaps) or as a two-way table (rows and columns). A Venn diagram's 'A only', 'B only', 'A∩B' and 'neither' regions become exactly the four cells of a two-way table with rows [A, not A] and columns [B, not B].",
    ],
    latexBlocks: [
      "P(\\text{event})=\\frac{\\text{cell count}}{\\text{grand total}}",
      "P(A\\mid B)=\\frac{n(A\\text{ and }B)}{n(B)}",
      "\\text{row total or column total = marginal frequency}",
    ],
  },
  workedExamples: [
    {
      title: "Find joint and marginal probabilities",
      questionLatex: "\\text{60 students were surveyed about gender and activity preference.}\\\\\\text{Use the table to find P(male), P(sport), and P(male and sport).}",
      twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16. Row totals 30/30. Column totals 32/28. Grand total 60.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60 },
      steps: [
        { explanation: "P(male) uses the Male row total divided by the grand total.", latex: "P(\\text{male})=\\frac{30}{60}=\\frac{1}{2}" },
        { explanation: "P(sport) uses the Sport column total divided by the grand total.", latex: "P(\\text{sport})=\\frac{32}{60}=\\frac{8}{15}" },
        { explanation: "P(male and sport) uses the cell at the intersection of the Male row and Sport column.", latex: "P(\\text{male and sport})=\\frac{18}{60}=\\frac{3}{10}" },
      ],
      finalAnswerLatex: "P(\\text{male})=\\dfrac{1}{2},\\quad P(\\text{sport})=\\dfrac{8}{15},\\quad P(\\text{male and sport})=\\dfrac{3}{10}",
    },
    {
      title: "Find a conditional probability from the table",
      questionLatex: "\\text{Using the same table, find P(sport | male).}",
      twoWayTableDiagram: { description: "Same table with the Male row highlighted: Sport=18, Music=12, total=30.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60, highlight: { kind: "row", rowIndex: 0, label: "Restrict to Male row" } },
      steps: [
        { explanation: "Restrict to the Male row. Within that row, 18 out of 30 prefer sport.", latex: "P(\\text{sport}\\mid\\text{male})=\\frac{18}{30}=\\frac{3}{5}" },
      ],
      finalAnswerLatex: "P(\\text{sport}\\mid\\text{male})=\\dfrac{3}{5}",
    },
    {
      title: "Convert a Venn diagram to a two-way table",
      questionLatex: "\\text{The 40-student sport/music Venn diagram (S only=15, S}\\cap\\text{M=8, M only=12, neither=5) is}\\\\\\text{shown as a two-way table. Confirm the grand total matches.}",
      twoWayTableDiagram: { description: "Two-way table for the same 40 students. Rows Sport/No sport, columns Music/No music. Sport&Music=8, Sport&NoMusic=15, NoSport&Music=12, NoSport&NoMusic=5. Row totals 23/17. Column totals 20/20. Grand total 40.", rowLabels: ["Sport", "No sport"], columnLabels: ["Music", "No music"], values: [[8, 15], [12, 5]], rowTotals: [23, 17], columnTotals: [20, 20], grandTotal: 40 },
      steps: [
        { explanation: "The Venn diagram's intersection (S∩M = 8) becomes the Sport-and-Music cell; 'S only' (15) becomes Sport-and-No-music; 'M only' (12) becomes No-sport-and-Music; 'neither' (5) becomes No-sport-and-No-music.", latex: "8+15+12+5=40" },
        { explanation: "Both representations describe the same 40 students, so every probability calculated from the Venn diagram matches the same calculation from the table.", latex: "P(S\\cap M)=\\frac{8}{40}=\\frac15\\text{ either way}" },
      ],
      finalAnswerLatex: "\\text{The Venn diagram and the two-way table describe the same data — grand total }40\\text{ either way.}",
    },
  ] as WorkedExample[],
  guidedPractice: [
    mcq("y9-twty-g1", "In a two-way table, what is the grand total?", "D", ["The total for one row", "The total for one column", "The total for one category only", "The sum of all cell counts in the table"], 2, "The grand total is the overall sample size."),
    { ...ans("y9-twty-g2", "The two-way table below shows 60 students' gender and activity preference. How many students prefer sport in total?", "", "32", 2, "Sport column total = 18 + 14 = 32.", []), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60 } },
    { ...ans("y9-twty-g3", "Using the same table, find P(female and music) as a fraction in simplest form.", "", "4/15", 3, "16/60 = 4/15.", ["16/60"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60 } },
    { ...ans("y9-twty-g4", "Using the same table, find P(music | female) as a fraction in simplest form.", "P(\\text{music}\\mid\\text{female})", "8/15", 3, "Restrict to the Female row: 16/30 = 8/15.", ["16/30"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60, highlight: { kind: "row", rowIndex: 1, label: "Restrict to Female row" } } },
  ],
  independentPractice: [
    { ...ans("y9-twty-i1", "The two-way table below shows 60 students' gender and activity preference. Find P(female).", "", "1/2", 3, "Female row total = 30. P(female) = 30/60 = 1/2.", ["30/60"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60 } },
    { ...ans("y9-twty-i2", "Using the same table, find P(sport | male).", "P(\\text{sport}\\mid\\text{male})", "3/5", 3, "18/30 = 3/5.", ["18/30"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60, highlight: { kind: "row", rowIndex: 0, label: "Restrict to Male row" } } },
    { ...ans("y9-twty-i3", "Using the same table, find P(female | music).", "P(\\text{female}\\mid\\text{music})", "4/7", 4, "16/28 = 4/7.", ["16/28"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Sport/Music. Male/Sport=18, Male/Music=12, Female/Sport=14, Female/Music=16.", rowLabels: ["Male", "Female"], columnLabels: ["Sport", "Music"], values: [[18, 12], [14, 16]], rowTotals: [30, 30], columnTotals: [32, 28], grandTotal: 60, highlight: { kind: "column", columnIndex: 1, label: "Restrict to Music column" } } },
    ans("y9-twty-i4", "A two-way table shows: Passed/Studied=35, Passed/Did not study=5, Failed/Studied=10, Failed/Did not study=10. Grand total=60. Find P(passed and studied).", "", "7/12", 3, "35/60 = 7/12.", ["35/60"]),
    mcq("y9-twty-i5", "In the same table (Studied row total=45, Passed/Studied=35), what is P(passed | studied)?", "B", ["35/60", "7/9", "35/40", "5/9"], 4, "Restrict to the Studied row: 35/45 = 7/9."),
  ],
  masteryQuiz: [
    { ...ans("y9-twty-m1", "The two-way table below shows 80 adults' exercise habits and health rating. Find P(healthy).", "", "11/16", 3, "Healthy column total = 55. 55/80 = 11/16.", ["55/80"]), twoWayTableDiagram: { description: "Two-way table: rows Exercises/Does not exercise, columns Healthy/Unhealthy. Exercises/Healthy=45, Exercises/Unhealthy=15, No-exercise/Healthy=10, No-exercise/Unhealthy=10.", rowLabels: ["Exercises", "Does not exercise"], columnLabels: ["Healthy", "Unhealthy"], values: [[45, 15], [10, 10]], rowTotals: [60, 20], columnTotals: [55, 25], grandTotal: 80 } },
    { ...ans("y9-twty-m2", "Using the same table, find P(healthy | exercises).", "", "3/4", 3, "45/60 = 3/4.", ["45/60"]), twoWayTableDiagram: { description: "Two-way table: rows Exercises/Does not exercise, columns Healthy/Unhealthy. Exercises/Healthy=45, Exercises/Unhealthy=15, No-exercise/Healthy=10, No-exercise/Unhealthy=10.", rowLabels: ["Exercises", "Does not exercise"], columnLabels: ["Healthy", "Unhealthy"], values: [[45, 15], [10, 10]], rowTotals: [60, 20], columnTotals: [55, 25], grandTotal: 80, highlight: { kind: "row", rowIndex: 0, label: "Restrict to Exercises row" } } },
    mcq("y9-twty-m3", "A table has grand total 100. P(A and B) = 0.24 and P(B) = 0.4. What is P(A|B)?", "B", ["0.096", "0.6", "0.24", "0.16"], 4, "P(A|B) = 0.24 / 0.4 = 0.6."),
    { ...ans("y9-twty-m4", "The two-way table below shows 60 students' gender and exam result. Find P(pass).", "", "23/30", 3, "Pass column total = 46. 46/60 = 23/30.", ["46/60"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Pass/Fail. Male/Pass=22, Male/Fail=8, Female/Pass=24, Female/Fail=6.", rowLabels: ["Male", "Female"], columnLabels: ["Pass", "Fail"], values: [[22, 8], [24, 6]], rowTotals: [30, 30], columnTotals: [46, 14], grandTotal: 60 } },
    { ...ans("y9-twty-m5", "Using the same table, find P(pass | female).", "", "4/5", 3, "24/30 = 4/5.", ["24/30"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Pass/Fail. Male/Pass=22, Male/Fail=8, Female/Pass=24, Female/Fail=6.", rowLabels: ["Male", "Female"], columnLabels: ["Pass", "Fail"], values: [[22, 8], [24, 6]], rowTotals: [30, 30], columnTotals: [46, 14], grandTotal: 60, highlight: { kind: "row", rowIndex: 1, label: "Restrict to Female row" } } },
    { ...ans("y9-twty-m6", "Using the same table, find P(pass | male).", "", "11/15", 4, "22/30 = 11/15.", ["22/30"]), twoWayTableDiagram: { description: "Two-way table: rows Male/Female, columns Pass/Fail. Male/Pass=22, Male/Fail=8, Female/Pass=24, Female/Fail=6.", rowLabels: ["Male", "Female"], columnLabels: ["Pass", "Fail"], values: [[22, 8], [24, 6]], rowTotals: [30, 30], columnTotals: [46, 14], grandTotal: 60, highlight: { kind: "row", rowIndex: 0, label: "Restrict to Male row" } } },
    mcq("y9-twty-m7", "A table shows P(pass) = 23/30 ≈ 0.767 and P(pass | female) = 4/5 = 0.8. Are gender and pass/fail independent?", "B", ["Yes, because P(pass | female) is close to P(pass)", "No, because P(pass | female) ≠ P(pass)", "Yes, because both probabilities are greater than 0.5", "Cannot be determined from a two-way table"], 4, "For independence, P(pass | female) must equal P(pass)."),
    { ...ans("y9-twty-m8", "The two-way table below shows 100 people's location and transport choice. Find P(country and car) as a decimal.", "", "0.4", 3, "40/100 = 0.4.", [".4", "40/100"]), twoWayTableDiagram: { description: "Two-way table: rows City/Country, columns Car/Train. City/Car=30, City/Train=20, Country/Car=40, Country/Train=10.", rowLabels: ["City", "Country"], columnLabels: ["Car", "Train"], values: [[30, 20], [40, 10]], rowTotals: [50, 50], columnTotals: [70, 30], grandTotal: 100 } },
    { ...ans("y9-twty-m9", "Using the same table, find P(car | country).", "", "4/5", 3, "40/50 = 4/5.", ["40/50"]), twoWayTableDiagram: { description: "Two-way table: rows City/Country, columns Car/Train. City/Car=30, City/Train=20, Country/Car=40, Country/Train=10.", rowLabels: ["City", "Country"], columnLabels: ["Car", "Train"], values: [[30, 20], [40, 10]], rowTotals: [50, 50], columnTotals: [70, 30], grandTotal: 100, highlight: { kind: "row", rowIndex: 1, label: "Restrict to Country row" } } },
    mcq("y9-twty-m10", "Which calculation gives P(train | city) from a two-way table?", "A", ["(city and train cell) ÷ (city row total)", "(city and train cell) ÷ (grand total)", "(train column total) ÷ (grand total)", "(city row total) ÷ (train column total)"], 3, "Conditional probability restricts to the City row."),
  ],
  masteryQuizPool: [
    ans("y9-twty-p1", "A table: Male/Sport=20, Male/Music=10, Female/Sport=15, Female/Music=15. Grand total=60. Find P(female).", "", "1/2", 3, "Female total = 30. 30/60 = 1/2.", ["30/60"]),
    ans("y9-twty-p2", "Using the same table, find P(sport | female).", "", "1/2", 3, "15/30 = 1/2.", ["15/30"]),
    ans("y9-twty-p3", "Using the same table, find P(male and music).", "", "1/6", 3, "10/60 = 1/6.", ["10/60"]),
    mcq("y9-twty-p4", "In a two-way table, a marginal frequency is:", "B", ["a single cell count", "a row or column total", "the grand total only", "always zero"], 2, "A marginal frequency is a row or column total."),
    ans("y9-twty-p5", "A table: Passed/Studied=50, Passed/No study=10, Failed/Studied=15, Failed/No study=25. Grand total=100. Find P(studied).", "", "13/20", 3, "Studied total = 65. 65/100 = 13/20.", ["65/100"]),
    ans("y9-twty-p6", "Using the same table, find P(passed | studied).", "", "10/13", 4, "50/65 = 10/13.", ["50/65"]),
    mcq("y9-twty-p7", "P(A and B) = 0.18, P(B) = 0.3. Find P(A|B).", "A", ["0.6", "0.06", "0.48", "0.12"], 4, "P(A|B) = 0.18 / 0.3 = 0.6."),
    ans("y9-twty-p8", "A table: City/Bus=40, City/Car=20, Country/Bus=10, Country/Car=30. Grand total=100. Find P(country and car).", "", "3/10", 3, "30/100 = 3/10.", ["30/100"]),
    ans("y9-twty-p9", "Using the same table, find P(bus | city).", "", "2/3", 4, "City total = 60. 40/60 = 2/3.", ["40/60"]),
    mcq("y9-twty-p10", "Which calculation finds P(A|B) from a two-way table?", "A", ["(A and B cell) ÷ (B's row or column total)", "(A and B cell) ÷ (grand total)", "(B total) ÷ (grand total)", "(A total) ÷ (B total)"], 3, "Restrict to B's row or column, then find A within it."),
  ],
  commonMistakes: [
    { mistake: "Using the grand total instead of a row or column total when finding a conditional probability.", fix: "For P(A | B), divide the joint count by the row or column total for B, not by the grand total." },
    { mistake: "Confusing P(male and sport) with P(sport | male).", fix: "P(male and sport) divides by the grand total. P(sport | male) divides by the male row total only." },
    { mistake: "Misreading the table: reading the wrong cell because rows and columns are swapped.", fix: "Always check: row label first, then column label." },
    { mistake: "Adding row totals and column totals to get the grand total (double-counting).", fix: "The grand total is the sum of the individual cells, not the marginal totals added together." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "making-predictions": makingPredictionsLesson,
  "sample-space-and-probability": sampleSpaceProbability,
  "complementary-events": complementaryEvents,
  "venn-diagrams": vennDiagramsLesson,
  "two-way-tables": twoWayTablesLesson,
};

export function year9Chapter8ProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "probability-data-analysis") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
