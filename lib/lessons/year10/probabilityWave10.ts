// Year 10 restructure — Wave 10 (Probability). Authors all hidden stubs in Unit 8 (probability):
// review-of-probability (8A), mutually-exclusive-events (8B), dependent-independent-events (8C),
// arrays-two-step-experiments (8D). Architecture untouched. Prose uses unicode superscripts (no
// raw ^ or _). Y10 audit: 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.
// Emphasis: probability as long-run relative frequency; sample space & equally-likely outcomes;
// mutually exclusive (add) vs independent (multiply) -- they are DIFFERENT ideas.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Find the sample space first, then count favourable outcomes.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Think about what the events mean before computing.", explanation };
}

// ── 8A Review of Probability (path) ────────────────────────────────────────────────────
const reviewProbability: Partial<ExplicitLesson> = {
  description: "Find probabilities of equally likely outcomes, use the 0-1 scale, and apply the complement.",
  learningIntention: "Calculate basic probabilities and interpret them as long-run relative frequencies.",
  successCriteria: ["Use P(event) = favourable ÷ total for equally likely outcomes.", "Place probabilities on the 0-1 scale.", "Apply the complement P(not A) = 1 − P(A).", "Interpret probability as a long-run proportion."],
  teaching: {
    paragraphs: [
      "Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain). For EQUALLY LIKELY outcomes, P(event) = (favourable outcomes) ÷ (total outcomes). Rolling a 3 on a fair die is 1 of 6 equally likely faces, so P = 1/6.",
      "Behind that fraction is a deeper meaning: probability is the LONG-RUN RELATIVE FREQUENCY — the proportion of times the event would happen over very many trials. A probability of 1/6 means 'about one-sixth of the time in the long run', not a guarantee about the next roll.",
      "The set of all possible outcomes is the SAMPLE SPACE. Counting it correctly is the first step every time.",
      "The COMPLEMENT is a powerful shortcut: P(not A) = 1 − P(A), because something either happens or it doesn't. So P(not rolling a 3) = 1 − 1/6 = 5/6. When 'at least' or 'not' appears, the complement is often the quickest route.",
    ],
    latexBlocks: ["P(\\text{event}) = \\frac{\\text{favourable}}{\\text{total}},\\quad 0 \\le P \\le 1", "P(\\text{not } A) = 1 - P(A)", "P = \\text{long-run relative frequency}"],
  },
  workedExamples: [
    { title: "Equally likely", questionLatex: "\\text{Find P(rolling a 3) on a fair die.}", steps: [{ explanation: "1 favourable of 6.", latex: "\\tfrac{1}{6}" }], finalAnswerLatex: "1/6" },
    { title: "Complement", questionLatex: "\\text{Find P(not rolling a 3).}", steps: [{ explanation: "1 − P(3).", latex: "1 - \\tfrac{1}{6} = \\tfrac{5}{6}" }], finalAnswerLatex: "5/6" },
    { title: "From a probability", questionLatex: "\\text{If P(rain)} = 0.4, \\text{ find P(no rain).}", steps: [{ explanation: "Complement.", latex: "1 - 0.4 = 0.6" }], finalAnswerLatex: "0.6" },
  ],
  guidedPractice: [
    ans("y10-rop-g1", "Find the probability of heads on a fair coin.", "P(H)", "1/2", 2, "1 of 2 equally likely outcomes.", ["0.5", "1 / 2"]),
    ans("y10-rop-g2", "Find the probability of rolling an even number on a fair die.", "P(\\text{even})", "1/2", 2, "Evens are 2, 4, 6 — that is 3 of 6 = 1/2.", ["0.5", "3/6", "1 / 2"]),
    ans("y10-rop-g3", "If P(A) = 0.3, find P(not A).", "P(\\text{not }A)", "0.7", 2, "1 − 0.3 = 0.7.", []),
    mcq("y10-rop-g4", "Probability values range from:", "C", ["−1 to 1", "0 to 100", "0 to 1", "1 to 6"], 2, "Probabilities lie between 0 (impossible) and 1 (certain)."),
  ],
  independentPractice: [
    ans("y10-rop-i1", "Find the probability of rolling a 5 on a fair die.", "P(5)", "1/6", 2, "1 of 6 outcomes.", ["1 / 6"]),
    ans("y10-rop-i2", "Find the probability of drawing a red card from a standard 52-card deck.", "P(\\text{red})", "1/2", 3, "26 red of 52 = 1/2.", ["0.5", "26/52", "1 / 2"]),
    ans("y10-rop-i3", "If P(rain) = 0.4, find P(no rain).", "P(\\text{no rain})", "0.6", 2, "1 − 0.4 = 0.6.", []),
    mcq("y10-rop-i4", "A probability of 0 means the event is:", "A", ["impossible", "certain", "likely", "even chance"], 2, "P = 0 means it cannot happen."),
    mcq("y10-rop-i5", "A probability of 1 means the event is:", "B", ["impossible", "certain", "unlikely", "random"], 2, "P = 1 means it is certain."),
  ],
  masteryQuiz: [
    ans("y10-rop-m1", "Find the probability of a tail on a fair coin.", "P(T)", "1/2", 2, "1 of 2 outcomes.", ["0.5", "1 / 2"]),
    ans("y10-rop-m2", "Find the probability of rolling a number greater than 4 on a die.", "P(>4)", "1/3", 3, "5 and 6 are 2 of 6 = 1/3.", ["2/6", "1 / 3"]),
    ans("y10-rop-m3", "If P(A) = 0.25, find P(not A).", "P(\\text{not }A)", "0.75", 2, "1 − 0.25 = 0.75.", []),
    mcq("y10-rop-m4", "Probability as a long-run relative frequency means:", "C", ["the next trial is guaranteed", "it never varies", "the proportion over many trials", "exactly half the time"], 3, "It is the proportion of occurrences over many repetitions."),
    ans("y10-rop-m5", "Find the probability of drawing an ace from a 52-card deck.", "P(\\text{ace})", "1/13", 3, "4 aces of 52 = 1/13.", ["4/52", "1 / 13"]),
    ans("y10-rop-m6", "Find the probability of rolling a 7 on a standard die.", "P(7)", "0", 2, "Impossible — a die has no 7, so P = 0.", []),
    ans("y10-rop-m7", "Find the probability of NOT rolling a 6 on a die.", "P(\\text{not }6)", "5/6", 3, "1 − 1/6 = 5/6.", ["5 / 6"]),
    mcq("y10-rop-m8", "Equally likely outcomes have:", "B", ["different probabilities", "the same probability", "probability 0", "probability greater than 1"], 2, "Equally likely means each has the same probability."),
    ans("y10-rop-m9", "If P(win) = 0.1, find P(not win).", "P(\\text{not win})", "0.9", 2, "1 − 0.1 = 0.9.", []),
    ans("y10-rop-m10", "Find the probability of drawing a spade from a 52-card deck.", "P(\\spadesuit)", "1/4", 3, "13 spades of 52 = 1/4.", ["13/52", "1 / 4"]),
  ],
  commonMistakes: [
    { mistake: "Giving a probability greater than 1 or less than 0.", fix: "Every probability lies between 0 and 1." },
    { mistake: "Miscounting the sample space.", fix: "Count all equally likely outcomes before dividing." },
    { mistake: "Forgetting the complement shortcut.", fix: "P(not A) = 1 − P(A), handy for 'not'/'at least'." },
    { mistake: "Reading probability as a guarantee for the next trial.", fix: "It is a long-run proportion, not a promise about one trial." },
  ],
  masteryPassMark: 0.8,
};

// ── 8B Mutually Exclusive Events (path) ────────────────────────────────────────────────
const mutuallyExclusive: Partial<ExplicitLesson> = {
  description: "Recognise mutually exclusive events and use the addition rule, distinguishing them from overlapping and from independent events.",
  learningIntention: "Identify mutually exclusive events and add their probabilities correctly.",
  successCriteria: ["Recognise events that cannot occur together.", "Use P(A or B) = P(A) + P(B) for mutually exclusive events.", "Spot overlapping (non-mutually-exclusive) events.", "Distinguish mutually exclusive from independent."],
  teaching: {
    paragraphs: [
      "Two events are MUTUALLY EXCLUSIVE if they CANNOT happen at the same time — there is no overlap. Rolling a 3 and rolling a 5 on one die are mutually exclusive; heads and tails on one flip are too.",
      "For mutually exclusive events the OR-probability simply adds: P(A or B) = P(A) + P(B). So P(rolling a 1 or a 2) = 1/6 + 1/6 = 1/3, and for mutually exclusive events P(A and B) = 0.",
      "Be careful when events OVERLAP. 'A king or a heart' from a deck is NOT mutually exclusive — the king of hearts is both — so you cannot just add (you would double-count that card). Only add directly when there is no overlap.",
      "A crucial distinction: MUTUALLY EXCLUSIVE is NOT the same as INDEPENDENT. Mutually exclusive means they can't both happen (about overlap); independent means one doesn't affect the other's chance (about influence). Don't mix them up.",
    ],
    latexBlocks: ["\\text{mutually exclusive} \\Rightarrow \\text{cannot co-occur}", "P(A \\text{ or } B) = P(A) + P(B)\\ (\\text{if mutually exclusive})", "\\text{mutually exclusive} \\ne \\text{independent}"],
  },
  workedExamples: [
    { title: "Addition rule", questionLatex: "\\text{Find P(rolling a 1 or a 2) on a die.}", steps: [{ explanation: "Mutually exclusive — add.", latex: "\\tfrac{1}{6} + \\tfrac{1}{6} = \\tfrac{1}{3}" }], finalAnswerLatex: "1/3" },
    { title: "Cards (no overlap)", questionLatex: "\\text{Find P(king or queen) from a deck.}", steps: [{ explanation: "No card is both — add.", latex: "\\tfrac{4}{52} + \\tfrac{4}{52} = \\tfrac{8}{52} = \\tfrac{2}{13}" }], finalAnswerLatex: "2/13" },
    { title: "Spotting overlap", questionLatex: "\\text{Are 'king' and 'heart' (one card) mutually exclusive?}", steps: [{ explanation: "The king of hearts is both.", latex: "\\text{No — they overlap}" }], finalAnswerLatex: "\\text{No}" },
  ],
  guidedPractice: [
    mcq("y10-mee-g1", "Mutually exclusive events:", "A", ["cannot happen at the same time", "always happen together", "are independent", "have probability 1"], 3, "Mutually exclusive means no overlap — they can't co-occur."),
    ans("y10-mee-g2", "Find P(rolling a 1 or a 2) on a die.", "P(1\\text{ or }2)", "1/3", 3, "1/6 + 1/6 = 1/3.", ["2/6", "1 / 3"]),
    mcq("y10-mee-g3", "For mutually exclusive events, P(A or B) =", "B", ["P(A) × P(B)", "P(A) + P(B)", "P(A) − P(B)", "1"], 3, "Add the probabilities when there is no overlap."),
    mcq("y10-mee-g4", "Rolling a 3 and rolling a 5 on one die are:", "A", ["mutually exclusive", "independent", "the same event", "certain"], 3, "One roll cannot be both 3 and 5."),
  ],
  independentPractice: [
    ans("y10-mee-i1", "Find P(rolling a 2 or a 4) on a die.", "P(2\\text{ or }4)", "1/3", 3, "1/6 + 1/6 = 1/3.", ["2/6", "1 / 3"]),
    mcq("y10-mee-i2", "Drawing a single card, 'a king' or 'a queen' are:", "A", ["mutually exclusive", "not mutually exclusive", "independent", "dependent"], 3, "No card is both a king and a queen."),
    ans("y10-mee-i3", "Find P(king or queen) from a 52-card deck.", "P(K\\text{ or }Q)", "2/13", 4, "4/52 + 4/52 = 8/52 = 2/13.", ["8/52", "2 / 13"]),
    mcq("y10-mee-i4", "Drawing a single card, 'a king' or 'a heart' are:", "B", ["mutually exclusive", "not mutually exclusive (they overlap)", "impossible", "certain"], 4, "The king of hearts is both, so they overlap."),
    ans("y10-mee-i5", "Find P(rolling a 1, 2, or 3) on a die.", "P(1,2,3)", "1/2", 3, "3 of 6 = 1/2.", ["3/6", "1 / 2"]),
  ],
  masteryQuiz: [
    mcq("y10-mee-m1", "Mutually exclusive means:", "A", ["no overlap", "complete overlap", "independence", "certainty"], 3, "The events share no outcomes."),
    ans("y10-mee-m2", "Find P(rolling a 2 or a 5) on a die.", "P(2\\text{ or }5)", "1/3", 3, "1/6 + 1/6 = 1/3.", ["2/6", "1 / 3"]),
    mcq("y10-mee-m3", "For mutually exclusive events, P(A or B) equals:", "B", ["P(A) × P(B)", "P(A) + P(B)", "0", "1"], 3, "Add the probabilities."),
    mcq("y10-mee-m4", "Heads and tails on a single flip are:", "A", ["mutually exclusive", "independent", "the same", "overlapping"], 3, "One flip cannot be both heads and tails."),
    ans("y10-mee-m5", "Find P(a red or a black card) from a deck.", "P(\\text{red or black})", "1", 3, "26/52 + 26/52 = 1 (the whole deck).", []),
    mcq("y10-mee-m6", "Is 'mutually exclusive' the same as 'independent'?", "B", ["yes, identical", "no, different ideas", "only for cards", "only for dice"], 4, "Mutually exclusive is about overlap; independent is about influence."),
    ans("y10-mee-m7", "Find P(rolling an even number or a 1) on a die.", "P(\\text{even or }1)", "2/3", 4, "Evens 2,4,6 plus 1 = 4 of 6 = 2/3 (no overlap).", ["4/6", "2 / 3"]),
    mcq("y10-mee-m8", "If two events can both occur, they are:", "B", ["mutually exclusive", "not mutually exclusive", "impossible", "certain"], 3, "Overlapping events are not mutually exclusive."),
    ans("y10-mee-m9", "Find P(an ace or a king) from a 52-card deck.", "P(A\\text{ or }K)", "2/13", 4, "4/52 + 4/52 = 8/52 = 2/13.", ["8/52", "2 / 13"]),
    mcq("y10-mee-m10", "For mutually exclusive events, P(A and B) =", "A", ["0", "1", "P(A) + P(B)", "P(A) × P(B)"], 4, "They can't co-occur, so P(A and B) = 0."),
  ],
  commonMistakes: [
    { mistake: "Adding probabilities when events overlap.", fix: "Only add directly for mutually exclusive (non-overlapping) events." },
    { mistake: "Confusing mutually exclusive with independent.", fix: "Mutually exclusive = can't co-occur; independent = no influence." },
    { mistake: "Thinking mutually exclusive events can both happen.", fix: "By definition they cannot, so P(A and B) = 0." },
    { mistake: "Double-counting an overlapping outcome.", fix: "Subtract the overlap when events share outcomes." },
  ],
  masteryPassMark: 0.8,
};

// ── 8C Dependent and Independent Events (path) ─────────────────────────────────────────
const dependentIndependent: Partial<ExplicitLesson> = {
  description: "Distinguish independent from dependent events and use the multiplication rule for 'and'.",
  learningIntention: "Recognise independence and multiply probabilities for combined events.",
  successCriteria: ["Recognise independent events (no influence).", "Use P(A and B) = P(A) × P(B) for independent events.", "Recognise dependent events (e.g. without replacement).", "Distinguish independence from mutual exclusivity."],
  teaching: {
    paragraphs: [
      "Two events are INDEPENDENT if one happening does NOT change the probability of the other — separate coins, separate dice, or drawing WITH replacement. For independent events the AND-probability multiplies: P(A and B) = P(A) × P(B). Two heads on two coins is 1/2 × 1/2 = 1/4.",
      "Events are DEPENDENT when an earlier outcome CHANGES the next probability. Drawing two aces WITHOUT replacement is dependent: the first is 4/52, but the second is now 3/51 because the deck has changed.",
      "So the key question for 'and' problems is whether the events influence each other. 'With replacement' keeps them independent (multiply unchanged probabilities); 'without replacement' makes them dependent (adjust the second probability).",
      "Don't confuse INDEPENDENT with MUTUALLY EXCLUSIVE — they are different ideas. Mutually exclusive events can't both happen (you ADD for 'or'); independent events don't affect each other (you MULTIPLY for 'and').",
    ],
    latexBlocks: ["\\text{independent: } P(A \\text{ and } B) = P(A) \\times P(B)", "\\text{dependent: earlier outcome changes the next probability}", "\\text{independent} \\ne \\text{mutually exclusive}"],
  },
  workedExamples: [
    { title: "Independent (multiply)", questionLatex: "\\text{Find P(two heads) on two coins.}", steps: [{ explanation: "Independent — multiply.", latex: "\\tfrac{1}{2} \\times \\tfrac{1}{2} = \\tfrac{1}{4}" }], finalAnswerLatex: "1/4" },
    { title: "Dependent (without replacement)", questionLatex: "\\text{P(two aces) drawn without replacement.}", steps: [{ explanation: "Second draw changes.", latex: "\\tfrac{4}{52} \\times \\tfrac{3}{51}" }], finalAnswerLatex: "\\tfrac{4}{52}\\times\\tfrac{3}{51}" },
    { title: "With replacement", questionLatex: "\\text{Are draws WITH replacement independent?}", steps: [{ explanation: "The pool is restored each time.", latex: "\\text{Yes}" }], finalAnswerLatex: "\\text{Yes}" },
  ],
  guidedPractice: [
    mcq("y10-din-g1", "Independent events:", "A", ["do not affect each other", "cannot both happen", "always happen together", "have probability 0"], 3, "Independence means one has no effect on the other."),
    ans("y10-din-g2", "Find P(two heads) on two fair coins.", "P(HH)", "1/4", 3, "1/2 × 1/2 = 1/4.", ["1 / 4"]),
    mcq("y10-din-g3", "For independent events, P(A and B) =", "B", ["P(A) + P(B)", "P(A) × P(B)", "0", "1"], 3, "Multiply for independent 'and'."),
    mcq("y10-din-g4", "Drawing without replacement makes events:", "A", ["dependent", "independent", "mutually exclusive", "impossible"], 3, "The first draw changes the second's probability."),
  ],
  independentPractice: [
    ans("y10-din-i1", "Find P(rolling two 6s) on two dice.", "P(66)", "1/36", 3, "1/6 × 1/6 = 1/36.", ["1 / 36"]),
    mcq("y10-din-i2", "'With replacement' keeps events:", "B", ["dependent", "independent", "mutually exclusive", "certain"], 3, "Restoring the pool leaves probabilities unchanged."),
    ans("y10-din-i3", "Find P(heads then tails) on two flips.", "P(HT)", "1/4", 3, "1/2 × 1/2 = 1/4.", ["1 / 4"]),
    mcq("y10-din-i4", "Dependent events occur when:", "A", ["an earlier outcome changes the next probability", "events can't co-occur", "probabilities add", "outcomes are equally likely"], 4, "Dependence means the earlier result affects the later probability."),
    ans("y10-din-i5", "Find P(three heads in a row).", "P(HHH)", "1/8", 4, "1/2 × 1/2 × 1/2 = 1/8.", ["1 / 8"]),
  ],
  masteryQuiz: [
    mcq("y10-din-m1", "For independent events, one outcome:", "A", ["has no effect on the other", "guarantees the other", "prevents the other", "equals the other"], 3, "Independence means no influence."),
    ans("y10-din-m2", "Find P(two tails) on two coins.", "P(TT)", "1/4", 3, "1/2 × 1/2 = 1/4.", ["1 / 4"]),
    mcq("y10-din-m3", "For independent events you:", "B", ["add the probabilities", "multiply the probabilities", "subtract them", "ignore one"], 3, "Multiply for independent 'and'."),
    mcq("y10-din-m4", "Drawing without replacement is:", "A", ["dependent", "independent", "mutually exclusive", "certain"], 3, "Removing an item changes later probabilities."),
    ans("y10-din-m5", "Find P(rolling a 6 then a 6) on two dice.", "P(66)", "1/36", 3, "1/6 × 1/6 = 1/36.", ["1 / 36"]),
    mcq("y10-din-m6", "Mutually exclusive and independent are:", "B", ["the same", "different ideas", "both about 'and'", "both add"], 4, "One is about overlap, the other about influence."),
    ans("y10-din-m7", "Find P(heads, heads, heads) on three coins.", "P(HHH)", "1/8", 4, "1/2 × 1/2 × 1/2 = 1/8.", ["1 / 8"]),
    mcq("y10-din-m8", "A second draw without replacement has:", "A", ["fewer items left (changed probability)", "the same probability", "probability 1", "no outcomes"], 4, "The pool is smaller, so the probability changes."),
    ans("y10-din-m9", "Find P(a 1 on a die AND heads on a coin).", "P(1\\text{ and }H)", "1/12", 4, "1/6 × 1/2 = 1/12 (independent).", ["1 / 12"]),
    mcq("y10-din-m10", "'And' for independent events means:", "B", ["add", "multiply", "subtract", "divide"], 3, "Independent 'and' multiplies the probabilities."),
  ],
  commonMistakes: [
    { mistake: "Adding probabilities for 'and'.", fix: "Multiply for independent 'and'; add is for mutually exclusive 'or'." },
    { mistake: "Keeping the same probability for a draw without replacement.", fix: "Adjust the second probability — the pool has changed." },
    { mistake: "Confusing independent with mutually exclusive.", fix: "Independent = no influence; mutually exclusive = can't co-occur." },
    { mistake: "Forgetting 'with replacement' restores independence.", fix: "With replacement, the probabilities stay the same each draw." },
  ],
  masteryPassMark: 0.8,
};

// ── 8D Arrays and Two-Step Experiments (path) ──────────────────────────────────────────
const arraysTwoStep: Partial<ExplicitLesson> = {
  description: "List outcomes of two-step experiments with arrays and tree diagrams, and find probabilities.",
  learningIntention: "Build the sample space of a two-step experiment and read probabilities from it.",
  successCriteria: ["Use an array or tree diagram to list all outcomes.", "Find the sample-space size as the product of the steps.", "Count favourable outcomes without double-counting.", "Compute two-step probabilities."],
  teaching: {
    paragraphs: [
      "A TWO-STEP experiment (two dice, a coin and a die, two draws) is easiest to handle by listing ALL outcomes — with an ARRAY (a table) or a TREE DIAGRAM. Seeing the whole sample space makes the counting reliable.",
      "The SIZE of the sample space is the PRODUCT of the steps (the multiplication principle): two dice give 6 × 6 = 36 outcomes; a coin and a die give 2 × 6 = 12.",
      "Then probability is favourable ÷ total as usual. For two dice, a sum of 7 happens in 6 of the 36 cells — (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — so P = 6/36 = 1/6.",
      "The array's job is to stop DOUBLE-COUNTING: list each outcome exactly once, count the favourable cells carefully, and don't count any cell twice. Tree diagrams do the same job for steps with different sizes.",
    ],
    latexBlocks: ["\\text{sample space size} = (\\text{step 1}) \\times (\\text{step 2})", "\\text{two dice: } 6 \\times 6 = 36", "P = \\frac{\\text{favourable cells}}{\\text{total cells}}"],
  },
  workedExamples: [
    { title: "Sample-space size", questionLatex: "\\text{How many outcomes when rolling two dice?}", steps: [{ explanation: "6 × 6 array.", latex: "36" }], finalAnswerLatex: "36" },
    { title: "A sum on two dice", questionLatex: "\\text{Find P(sum = 7) for two dice.}", steps: [{ explanation: "6 favourable cells of 36.", latex: "\\tfrac{6}{36} = \\tfrac{1}{6}" }], finalAnswerLatex: "1/6" },
    { title: "Different-sized steps", questionLatex: "\\text{How many outcomes: a coin then a die?}", steps: [{ explanation: "2 × 6.", latex: "= 12" }], finalAnswerLatex: "12" },
  ],
  guidedPractice: [
    mcq("y10-a2s-g1", "A two-step experiment is best shown with an:", "A", ["array or tree diagram", "single number", "pie chart", "bar graph"], 2, "Arrays and tree diagrams list all outcomes."),
    ans("y10-a2s-g2", "How many outcomes when rolling two dice?", "6\\times6", "36", 2, "6 × 6 = 36.", []),
    ans("y10-a2s-g3", "How many outcomes when tossing a coin and rolling a die?", "2\\times6", "12", 2, "2 × 6 = 12.", []),
    ans("y10-a2s-g4", "Find P(two heads) when tossing two coins.", "P(HH)", "1/4", 3, "1 favourable of the 4-cell array.", ["1 / 4"]),
  ],
  independentPractice: [
    ans("y10-a2s-i1", "Two dice: find P(sum = 7).", "P(\\text{sum }7)", "1/6", 4, "6 of 36 cells, so 1/6.", ["6/36", "1 / 6"]),
    ans("y10-a2s-i2", "How many outcomes when tossing two coins?", "2\\times2", "4", 2, "2 × 2 = 4.", []),
    mcq("y10-a2s-i3", "The size of a two-step sample space is the:", "B", ["sum of the steps", "product of the steps", "larger step", "difference of the steps"], 3, "Multiply the number of outcomes at each step."),
    ans("y10-a2s-i4", "Two dice: find P(a double, i.e. both the same).", "P(\\text{double})", "1/6", 4, "6 doubles of 36 = 1/6.", ["6/36", "1 / 6"]),
    ans("y10-a2s-i5", "Coin and die: find P(a head and a 6).", "P(H\\text{ and }6)", "1/12", 4, "1 of the 12 outcomes.", ["1 / 12"]),
  ],
  masteryQuiz: [
    ans("y10-a2s-m1", "How many outcomes when rolling two dice?", "6\\times6", "36", 2, "6 × 6 = 36.", []),
    ans("y10-a2s-m2", "Two dice: find P(sum = 12).", "P(\\text{sum }12)", "1/36", 4, "Only (6,6) — 1 of 36.", ["1 / 36"]),
    ans("y10-a2s-m3", "How many outcomes when tossing three coins?", "2\\times2\\times2", "8", 3, "2 × 2 × 2 = 8.", []),
    mcq("y10-a2s-m4", "A tree diagram is useful for:", "B", ["a single outcome", "showing all outcomes of a multi-step experiment", "categorical totals", "averages"], 3, "Tree diagrams lay out every multi-step outcome."),
    ans("y10-a2s-m5", "Two dice: find P(sum = 2).", "P(\\text{sum }2)", "1/36", 4, "Only (1,1) — 1 of 36.", ["1 / 36"]),
    ans("y10-a2s-m6", "How many outcomes: a coin and a die?", "2\\times6", "12", 2, "2 × 6 = 12.", []),
    ans("y10-a2s-m7", "Two dice: find P(both even).", "P(\\text{both even})", "1/4", 4, "3 × 3 = 9 of 36 = 1/4.", ["9/36", "1 / 4"]),
    mcq("y10-a2s-m8", "To avoid double-counting, list each outcome:", "A", ["once", "twice", "as many times as it appears", "never"], 3, "Each outcome should appear exactly once."),
    ans("y10-a2s-m9", "Two coins: find P(at least one head).", "P(\\ge 1 H)", "3/4", 4, "3 of the 4 outcomes have a head, so 3/4.", ["3 / 4"]),
    ans("y10-a2s-m10", "Two dice: find P(sum = 7).", "P(\\text{sum }7)", "1/6", 4, "6 of 36 = 1/6.", ["6/36", "1 / 6"]),
  ],
  commonMistakes: [
    { mistake: "Adding the steps instead of multiplying for the sample-space size.", fix: "Multiply: two dice give 6 × 6 = 36 outcomes." },
    { mistake: "Double-counting favourable cells.", fix: "List each outcome once and count carefully." },
    { mistake: "Forgetting order can matter in an array (e.g. (2,5) vs (5,2)).", fix: "Each ordered cell is a distinct outcome unless the problem says otherwise." },
    { mistake: "Guessing instead of building the sample space.", fix: "Draw the array or tree, then count." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "review-of-probability": reviewProbability,
  "mutually-exclusive-events": mutuallyExclusive,
  "dependent-independent-events": dependentIndependent,
  "arrays-two-step-experiments": arraysTwoStep,
};

export function year10ProbabilityWave10LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "probability"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
