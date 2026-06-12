import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function binomialChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Identify the model assumptions or formula before selecting an option.",
    explanation,
  };
}

function binomialTyped(
  id: string,
  prompt: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: answer,
    answer,
    acceptedAnswers,
    hint: "Write the exact binomial value or equivalent decimal form requested.",
    explanation,
  };
}

const bernoulliTrials: Partial<ExplicitLesson> = {
  description:
    "Define Bernoulli trials, identify the parameters of a binomial model, and distinguish success from failure in simple experiments.",
  learningIntention:
    "Recognise when repeated trials form a binomial model and label n, p, q and X correctly.",
  successCriteria: [
    "Describe a Bernoulli trial as a single success/failure experiment.",
    "State the number of trials n and the success probability p clearly.",
    "Write q = 1 - p for the failure probability.",
    "Use the binomial model only when trials are independent and identical.",
  ],
  teaching: {
    paragraphs: [
      "A Bernoulli trial is one experiment with exactly two outcomes: success or failure. Examples include a coin toss, a pass/fail test, or a defective/not defective item.",
      "A binomial distribution counts how many successes occur after n independent identical Bernoulli trials, with a constant success probability p.",
      "When the model applies, the random variable X is written as X ~ B(n,p). Its possible values are 0, 1, 2, ..., n.",
      "The failure probability q is the complement of p: q = 1 - p. Use q for probabilities that involve failures.",
    ],
    latexBlocks: ["X\\sim B(n,p)", "q=1-p", "P(X=k)=\\binom{n}{k}p^kq^{n-k}"],
  },
  workedExamples: [
    {
      title: "Identify n, p and q",
      questionLatex:
        "\\text{A student answers 10 questions, each with probability }0.75\text{ of success. Find n, p and q.}",
      steps: [
        { explanation: "There are 10 independent trials.", latex: "n=10" },
        { explanation: "The success probability is 0.75.", latex: "p=0.75" },
        { explanation: "The failure probability is the complement of p.", latex: "q=0.25" },
      ],
      finalAnswerLatex: "n=10, p=0.75, q=0.25",
    },
    {
      title: "Check model assumptions",
      questionLatex:
        "\\text{Which assumption is required for X to follow B(n,p)?}",
      steps: [
        { explanation: "The trials must be independent.", latex: "\text{independence}" },
        { explanation: "Each trial must have the same success probability.", latex: "\text{constant }p" },
      ],
      finalAnswerLatex:
        "\text{Trials are independent and each has the same probability }p.",
    },
  ],
  guidedPractice: [
    binomialChoice(
      "y12e1-binomial-bern-g1",
      "Which description matches a Bernoulli trial?",
      "A",
      [
        "A single experiment with success or failure.",
        "A sequence of different events with changing probabilities.",
        "A question that always uses the normal model.",
        "A process with more than two possible outcomes.",
      ],
      "A Bernoulli trial has exactly two outcomes and a fixed success probability."
    ),
    binomialTyped(
      "y12e1-binomial-bern-g2",
      "For X~B(6,0.4), what is q?",
      "0.6",
      ["60%"],
      "q is the complement of p."
    ),
  ],
  independentPractice: [
    binomialChoice(
      "y12e1-binomial-bern-i1",
      "Which choice can be modelled by a binomial distribution?",
      "D",
      [
        "The average height of a class.",
        "The time until the first success.",
        "The total score on a continuous test.",
        "The number of heads in 12 fair coin flips.",
      ],
      "Binomial counts successes in a fixed number of independent identical trials."
    ),
    binomialTyped(
      "y12e1-binomial-bern-i2",
      "A die is rolled 4 times and success is getting an even number. What is p?",
      "1/2",
      ["0.5"],
      "Three of the six die faces are even, so the success probability is 1/2."
    ),
  ],
  masteryQuiz: [
    binomialChoice(
      "y12e1-binomial-bern-m1",
      "For X~B(5,0.3), which values can X take?",
      "C",
      ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3, 4, 5", "3, 4, 5"],
      "X can take all integer values from 0 to n inclusive."
    ),
    binomialTyped(
      "y12e1-binomial-bern-m2",
      "If p=0.2, what is q?",
      "0.8",
      ["4/5"],
      "q is the complement of p."
    ),
  ],
  masteryPassMark: 0.8,
};

const binomialProbabilities: Partial<ExplicitLesson> = {
  description:
    "Use the binomial probability formula and calculator methods to compute probabilities for exact and at-least events.",
  learningIntention:
    "Calculate binomial probabilities with the right formula and interpret the result in context.",
  successCriteria: [
    "Write P(X=k) using nCk, p^k and q^{n-k}.",
    "Use complements for at least or at most probabilities.",
    "Compute probabilities with a calculator or by hand and explain the result.",
  ],
  teaching: {
    paragraphs: [
      "The binomial formula is P(X=k)=nCk p^k q^{n-k}, where q=1-p.",
      "For at least or at most questions, use the complement to avoid adding many probabilities when possible.",
      "A calculator can compute combinations and powers quickly, but the formula tells you why the probability is correct.",
    ],
    latexBlocks: [
      "P(X=k)=\\binom{n}{k}p^kq^{n-k}",
      "q=1-p",
      "P(X\ge k)=1-P(X\le k-1)",
    ],
  },
  workedExamples: [
    {
      title: "Exact probability calculation",
      questionLatex:
        "\\text{If each trial has p=0.8 and n=4, find }P(X=3).",
      steps: [
        { explanation: "There are 4 trials and we need exactly 3 successes.", latex: "n=4, k=3, p=0.8, q=0.2" },
        { explanation: "Substitute into the binomial formula.", latex: "P(X=3)=\\binom{4}{3}(0.8)^3(0.2)^1" },
        { explanation: "Calculate the value.", latex: "P(X=3)=4\times0.512\times0.2=0.4096" },
      ],
      finalAnswerLatex: "0.4096",
    },
    {
      title: "Use a complement for at least one success",
      questionLatex:
        "\\text{With n=5 and p=0.15, find }P(X\\ge1).",
      steps: [
        { explanation: "At least one success is the complement of zero successes.", latex: "P(X\ge1)=1-P(X=0)" },
        { explanation: "Find P(X=0) using q=0.85.", latex: "P(X=0)=0.85^5=0.4437" },
        { explanation: "Subtract from 1.", latex: "P(X\ge1)=0.5563" },
      ],
      finalAnswerLatex: "0.5563",
    },
  ],
  guidedPractice: [
    binomialTyped(
      "y12e1-binomial-prob-g1",
      "Find P(X=2) for X~B(6,0.25).",
      "0.2966",
      ["0.297", "0.296"],
      "Use the binomial formula with the correct combination and probability powers."
    ),
    binomialTyped(
      "y12e1-binomial-prob-g2",
      "If P(X\le2)=0.6778 for X~B(10,0.3), what is P(X\ge3)?",
      "0.3222",
      ["0.322", "0.32220"],
      "Use the complement of the cumulative probability."
    ),
  ],
  independentPractice: [
    binomialChoice(
      "y12e1-binomial-prob-i1",
      "Which method is best for P(X\ge2)?",
      "C",
      [
        "Add P(X=2)+P(X=3)+...+P(X=n)",
        "Use P(X=2) only.",
        "Use 1-P(X\le1)",
        "Use q^2 directly.",
      ],
      "The complement is usually the most efficient way to get at least two successes."
    ),
    binomialTyped(
      "y12e1-binomial-prob-i2",
      "For X~B(5,0.1), find P(X=0).",
      "0.59049",
      ["0.59"],
      "Use q^5 with q = 0.9."
    ),
  ],
  masteryQuiz: [
    binomialTyped(
      "y12e1-binomial-prob-m1",
      "Find P(X=0) for X~B(4,0.6).",
      "0.0256",
      ["0.0256"],
      "Use q=0.4 and raise it to the fourth power."
    ),
    binomialChoice(
      "y12e1-binomial-prob-m2",
      "What is q in X~B(6,0.25)?",
      "C",
      ["0.25", "6", "0.75", "1.5"],
      "q is 1 minus p."
    ),
  ],
  masteryPassMark: 0.8,
};

const meanVariance: Partial<ExplicitLesson> = {
  description:
    "Find the expected value and variance of a binomial distribution and interpret them for repeated trials.",
  learningIntention:
    "Use E(X)=np and Var(X)=npq to describe the centre and spread of a binomial variable.",
  successCriteria: [
    "Apply E(X)=np to find the expected number of successes.",
    "Apply Var(X)=npq to calculate variance.",
    "Interpret the meaning of mean and variance in context.",
  ],
  teaching: {
    paragraphs: [
      "The expected value E(X)=np gives the long-run average number of successes in repeated experiments.",
      "The variance Var(X)=npq measures how much the number of successes varies around the mean.",
      "For binomial variables, q = 1 - p and standard deviation is the square root of the variance.",
    ],
    latexBlocks: ["E(X)=np", "Var(X)=npq", "q=1-p"],
  },
  workedExamples: [
    {
      title: "Expected value calculation",
      questionLatex:
        "\\text{For X~B(20,0.3), calculate E(X).}",
      steps: [
        { explanation: "Use the formula E(X)=np.", latex: "E(X)=np" },
        { explanation: "Multiply the number of trials by the success probability.", latex: "E(X)=20\times0.3=6" },
      ],
      finalAnswerLatex: "6",
    },
    {
      title: "Variance calculation",
      questionLatex:
        "\\text{For X~B(15,0.4), calculate Var(X).}",
      steps: [
        { explanation: "Use q=1-p first.", latex: "q=0.6" },
        { explanation: "Then calculate npq.", latex: "Var(X)=15\times0.4\times0.6=3.6" },
      ],
      finalAnswerLatex: "3.6",
    },
  ],
  guidedPractice: [
    binomialTyped(
      "y12e1-binomial-mean-g1",
      "For X~B(12,0.25), find E(X).",
      "3",
      ["3.0"],
      "Multiply n and p."
    ),
    binomialTyped(
      "y12e1-binomial-mean-g2",
      "For X~B(8,0.6), find Var(X).",
      "1.92",
      ["1.920"],
      "Use q=0.4 and compute npq."
    ),
  ],
  independentPractice: [
    binomialTyped(
      "y12e1-binomial-mean-i1",
      "For X~B(10,0.3), find the standard deviation to three decimal places.",
      "1.449",
      ["1.45"],
      "Find the square root of npq = 2.1."
    ),
    binomialChoice(
      "y12e1-binomial-mean-i2",
      "Which describes E(X)?",
      "A",
      [
        "The long-run average number of successes.",
        "The probability of success.",
        "The number of failures.",
        "The variance value.",
      ],
      "E(X) gives the expected number of successes over many repetitions."
    ),
  ],
  masteryQuiz: [
    binomialTyped(
      "y12e1-binomial-mean-m1",
      "For X~B(6,0.25), find E(X).",
      "1.5",
      ["3/2"],
      "Multiply n by p."
    ),
    binomialTyped(
      "y12e1-binomial-mean-m2",
      "For X~B(15,0.2), find Var(X).",
      "2.4",
      ["12/5"],
      "Use q=0.8 and npq = 15 \times 0.2 \times 0.8."
    ),
  ],
  masteryPassMark: 0.8,
};

const examPractice: Partial<ExplicitLesson> = {
  description:
    "Consolidate the binomial distribution with exam-style questions that cover interpretation, calculation, and model assumptions.",
  learningIntention:
    "Develop confidence using binomial probabilities, complements, and mean/variance in exam questions.",
  successCriteria: [
    "Interpret a context as a binomial experiment.",
    "Use formulas and calculator outputs correctly.",
    "Explain the meaning of a probability, expected value, or variance answer.",
  ],
  teaching: {
    paragraphs: [
      "Exam questions often ask for both probability values and model assumptions together.",
      "Answer in context by including the variable X and the meaning of success and failure.",
      "Use complements and expected value formulas where appropriate, and give exact answers when the question asks for them.",
    ],
    latexBlocks: ["P(X=k)=\\binom{n}{k}p^kq^{n-k}", "E(X)=np", "Var(X)=npq"],
  },
  workedExamples: [
    {
      title: "Interpreting a binomial probability",
      questionLatex:
        "\\text{If X~B(5,0.4), what does P(X=2) represent?}",
      steps: [
        { explanation: "It is the probability of exactly two successes.", latex: "P(X=2)" },
        { explanation: "Describe the trial context clearly.", latex: "\text{two successes in five independent trials}" },
      ],
      finalAnswerLatex:
        "\text{The chance of exactly two successes in five independent trials with }p=0.4.",
    },
    {
      title: "Combine probability and expectation",
      questionLatex:
        "\\text{For X~B(12,0.25), calculate E(X) and explain its meaning.}",
      steps: [
        { explanation: "Compute the expected value using np.", latex: "E(X)=12\times0.25=3" },
        { explanation: "Explain this as the long-run average number of successes.", latex: "\text{average successes}=3" },
      ],
      finalAnswerLatex: "3\text{ expected successes in the long run}",
    },
  ],
  guidedPractice: [
    binomialTyped(
      "y12e1-binomial-exam-g1",
      "A machine has probability 0.1 of producing a faulty item. In 8 items, find P(X=1).",
      "0.3874",
      ["0.387"],
      "Use the binomial formula with q = 0.9 and nCk = 8."
    ),
    binomialChoice(
      "y12e1-binomial-exam-g2",
      "Which is a valid assumption for the binomial model?",
      "A",
      [
        "Each trial has the same success probability.",
        "The outcomes are continuous measurements.",
        "The number of trials is unknown.",
        "The probability changes after each trial.",
      ],
      "A constant success probability is required for binomial trials."
    ),
  ],
  independentPractice: [
    binomialTyped(
      "y12e1-binomial-exam-i1",
      "For X~B(10,0.3), calculate Var(X).",
      "2.1",
      ["21/10"],
      "Use npq with q = 0.7."
    ),
    binomialTyped(
      "y12e1-binomial-exam-i2",
      "If P(X\le1)=0.6778 for X~B(10,0.3), what is P(X\ge2)?",
      "0.3222",
      ["0.322"],
      "Take 1 minus the cumulative probability of at most 1 success."
    ),
  ],
  masteryQuiz: [
    binomialChoice(
      "y12e1-binomial-exam-m1",
      "What does E(X)=np represent?",
      "A",
      [
        "The long-run average number of successes.",
        "The probability of success.",
        "The exact number of failures.",
        "The number of trials.",
      ],
      "It gives the average number of successes over many repetitions."
    ),
    binomialTyped(
      "y12e1-binomial-exam-m2",
      "For X~B(5,0.5), find P(X=0).",
      "0.03125",
      ["1/32"],
      "Use q^5 with q = 0.5."
    ),
  ],
  masteryPassMark: 0.8,
};

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "bernoulli-trials": bernoulliTrials,
  "binomial-probabilities": binomialProbabilities,
  "mean-and-variance": meanVariance,
  "binomial-exam-practice": examPractice,
};

export function year12Extension1BinomialDistributionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  return lessons[lesson.slug];
}
