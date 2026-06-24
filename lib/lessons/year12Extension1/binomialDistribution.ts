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
    // Display formula is intentionally blank: echoing `answer` here leaks the
    // result to the student. The prompt carries the question.
    latex: "",
    answer,
    acceptedAnswers,
    hint: "Write the exact binomial value or equivalent decimal form requested.",
    explanation,
  };
}

// Gold-standard authoring helpers for the reworked Bernoulli/Binomial lessons:
// every question carries a specific explanation and may attach a visual payload.
type BinomialExtras = {
  latex?: string;
  accepted?: string[];
  hint?: string;
} & Partial<PracticeQuestion>;

function bTyped(
  id: string,
  prompt: string,
  answer: string,
  explanation: string,
  extras: BinomialExtras = {}
): PracticeQuestion {
  const { latex = "", accepted = [], hint, ...payload } = extras;
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...accepted])),
    hint: hint ?? "Identify n, p and q, then apply the binomial rule carefully.",
    explanation,
    ...payload,
  };
}

function bChoiceQ(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  extras: { latex?: string; hint?: string } & Partial<PracticeQuestion> = {}
): PracticeQuestion {
  const { latex = "\\text{Choose the best option.}", hint, ...payload } = extras;
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: hint ?? "Check the model assumptions or formula before selecting.",
    explanation,
    ...payload,
  };
}

// B(6, 0.5) and B(4, 0.5) probability distributions for the "read the model
// from the bar chart" mastery questions.
const bernB6Half = {
  description:
    "Bar chart of the probability distribution of X ~ B(6, 0.5): bars at k = 0,1,2,3,4,5,6 with probabilities 0.016, 0.094, 0.234, 0.313, 0.234, 0.094, 0.016.",
  bars: [
    { label: "0", value: 0.016 },
    { label: "1", value: 0.094 },
    { label: "2", value: 0.234 },
    { label: "3", value: 0.313 },
    { label: "4", value: 0.234 },
    { label: "5", value: 0.094 },
    { label: "6", value: 0.016 },
  ],
  valueAxisLabel: "P(X = k)",
  categoryAxisLabel: "Number of successes, k",
};

const bernB4Half = {
  description:
    "Bar chart of the probability distribution of X ~ B(4, p): symmetric bars at k = 0,1,2,3,4 with probabilities 0.0625, 0.25, 0.375, 0.25, 0.0625.",
  bars: [
    { label: "0", value: 0.0625 },
    { label: "1", value: 0.25 },
    { label: "2", value: 0.375 },
    { label: "3", value: 0.25 },
    { label: "4", value: 0.0625 },
  ],
  valueAxisLabel: "P(X = k)",
  categoryAxisLabel: "Number of successes, k",
};

const bernoulliMastery: PracticeQuestion[] = [
  bChoiceQ(
    "y12e1-binomial-bern-m1",
    "For a count of successes to follow a binomial distribution, which condition must hold?",
    "A",
    [
      "Each trial is independent and has the same success probability",
      "Each trial must have at least three possible outcomes",
      "The success probability must change from trial to trial",
      "The number of trials must be unknown in advance",
    ],
    "A binomial model needs a fixed number of independent, identical Bernoulli trials — two outcomes per trial with a constant success probability. Changing probabilities, extra outcomes, or an unknown n all break the model.",
    { difficulty: 3 },
  ),
  bTyped(
    "y12e1-binomial-bern-m2",
    "For a binomial model the success probability is p = 0.85. Find the failure probability q.",
    "0.15",
    "q = 1 − p = 1 − 0.85 = 0.15.",
    { accepted: ["3/20", "15%"], difficulty: 3, hint: "q is the complement of p." },
  ),
  bTyped(
    "y12e1-binomial-bern-m3",
    "The bar chart shows the probability distribution of X ~ B(n, 0.5). State the value of n.",
    "6",
    "X can take the values 0, 1, …, n, so the number of bars is n + 1. There are 7 bars (k = 0 to 6), so n = 6.",
    { accepted: ["n=6"], difficulty: 3, hint: "X ranges over 0 to n, so count the bars and subtract 1.", barChartDiagram: bernB6Half },
  ),
  bTyped(
    "y12e1-binomial-bern-m4",
    "The random variable X ~ B(n, p) has exactly 9 possible values. Find n.",
    "8",
    "X takes the integer values 0, 1, …, n — that is n + 1 values. Setting n + 1 = 9 gives n = 8.",
    { accepted: ["n=8"], difficulty: 3, hint: "The number of possible values of X is n + 1." },
  ),
  bChoiceQ(
    "y12e1-binomial-bern-m5",
    "Which experiment is NOT a binomial experiment?",
    "B",
    [
      "The number of sixes in 20 rolls of a fair die",
      "The number of rolls of a die until the first six appears",
      "The number of heads in 10 tosses of a coin",
      "The number of defective items in a sample of 50, each independently faulty with probability 0.02",
    ],
    "Counting rolls until the first six has no fixed number of trials (it is a geometric experiment), so it is not binomial. The others fix n and count successes with a constant p.",
    { difficulty: 4 },
  ),
  bTyped(
    "y12e1-binomial-bern-m6",
    "For a binomial model the failure probability is q = 0.7. Find the success probability p.",
    "0.3",
    "p = 1 − q = 1 − 0.7 = 0.3.",
    { accepted: ["3/10", "30%"], difficulty: 4, hint: "p and q are complements: p = 1 − q." },
  ),
  bTyped(
    "y12e1-binomial-bern-m7",
    "A spinner has 8 equal sectors, 3 of which are red. It is spun 12 times and X is the number of reds. Find the success probability p as a fraction.",
    "3/8",
    "Success is landing on red. With 3 red sectors out of 8 equal sectors, p = 3/8.",
    { accepted: ["0.375"], difficulty: 4, hint: "p is the fraction of sectors that count as a success." },
  ),
  bTyped(
    "y12e1-binomial-bern-m8",
    "The bar chart shows the distribution of X ~ B(4, p). It is symmetric about k = 2. Use the symmetry to state the value of p.",
    "0.5",
    "A binomial distribution is symmetric only when success and failure are equally likely, i.e. p = q. Then p = 1 − p gives p = 0.5.",
    { accepted: ["1/2"], difficulty: 4, hint: "Symmetry of the bars means a success is as likely as a failure.", barChartDiagram: bernB4Half },
  ),
  bTyped(
    "y12e1-binomial-bern-m9",
    "For X ~ B(5, 0.2), find the probability that all five trials fail, P(X = 0), to 3 decimal places.",
    "0.328",
    "All five trials failing means each fails with probability q = 0.8. By independence, P(X = 0) = 0.8^5 = 0.32768 ≈ 0.328.",
    { accepted: ["0.32768", "0.3277"], difficulty: 5, hint: "All failures has probability q^n with q = 1 − p." },
  ),
  bChoiceQ(
    "y12e1-binomial-bern-m10",
    "A student models 'the number of rainy days next week' as X ~ B(7, p). Which binomial assumption is the most questionable here?",
    "A",
    [
      "Independence — whether it rains on one day is often linked to nearby days",
      "Two outcomes — each day is either rainy or not",
      "A fixed number of trials — there are 7 days in a week",
      "A success can be defined — 'rainy' can be the success",
    ],
    "Weather is correlated from day to day, so the trials are not independent — the weakest assumption. The other three (two outcomes, fixed n = 7, a definable success) are reasonable.",
    { difficulty: 5 },
  ),
];

const bernoulliHardPool: PracticeQuestion[] = [
  bTyped(
    "y12e1-binomial-bern-pool-d5-1",
    "For X ~ B(6, 1/3), find P(X = 0) as an exact fraction.",
    "64/729",
    "P(X = 0) = q^6 with q = 1 − 1/3 = 2/3, so P(X = 0) = (2/3)^6 = 64/729.",
    { accepted: ["0.0878", "0.088"], difficulty: 5, hint: "All failures: raise q = 2/3 to the power n." },
  ),
  bTyped(
    "y12e1-binomial-bern-pool-d5-2",
    "For X ~ B(n, 0.5), the probability of no successes is P(X = 0) = 1/32. Find n.",
    "5",
    "P(X = 0) = 0.5^n = 1/32. Since 2^5 = 32, we have 0.5^n = 1/32 when n = 5.",
    { accepted: ["n=5"], difficulty: 5, hint: "Write 0.5^n = 1/32 and recognise 32 as a power of 2." },
  ),
  bTyped(
    "y12e1-binomial-bern-pool-d6-1",
    "For X ~ B(10, p) the probability of zero successes equals the probability of ten successes. Find p.",
    "0.5",
    "P(X = 0) = q^10 and P(X = 10) = p^10. Setting q^10 = p^10 gives q = p, and since p + q = 1 this means p = 0.5.",
    { accepted: ["1/2"], difficulty: 6, hint: "Equate q^10 with p^10, then use p + q = 1." },
  ),
];

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
        "\\text{A student answers 10 questions, each with probability }0.75\\text{ of success. Find n, p and q.}",
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
        { explanation: "The trials must be independent.", latex: "\\text{independence}" },
        { explanation: "Each trial must have the same success probability.", latex: "\\text{constant }p" },
      ],
      finalAnswerLatex:
        "\\text{Trials are independent and each has the same probability }p.",
    },
  ],
  guidedPractice: [
    bChoiceQ(
      "y12e1-binomial-bern-g1",
      "Which of these describes a single Bernoulli trial?",
      "A",
      [
        "Taking one free throw and recording it as 'in' or 'out'",
        "Recording the total points a team scores in a game",
        "Rolling a die and recording the number from 1 to 6",
        "Measuring a person's exact height in centimetres",
      ],
      "A Bernoulli trial is one experiment with exactly two outcomes (success/failure). A free throw is 'in' or 'out'. A total score or a height is numerical, and a die roll has six outcomes — none are Bernoulli trials.",
    ),
    bTyped(
      "y12e1-binomial-bern-g2",
      "For X ~ B(6, 0.4), find the failure probability q.",
      "0.6",
      "q = 1 − p = 1 − 0.4 = 0.6.",
      { accepted: ["3/5", "60%"], hint: "q is the complement of p." },
    ),
    bChoiceQ(
      "y12e1-binomial-bern-g3",
      "Which experiment can be modelled by a binomial distribution?",
      "A",
      [
        "The number of sixes in 20 rolls of a fair die",
        "The time until the first six appears",
        "The average of 20 die rolls",
        "The highest number rolled in 20 rolls",
      ],
      "Binomial counts successes in a fixed number of independent identical trials, like the number of sixes in 20 rolls. A waiting time, an average, or a maximum is not a count of successes.",
    ),
    bTyped(
      "y12e1-binomial-bern-g4",
      "A fair coin is tossed 8 times and X is the number of heads. Find q, the probability of a tail on a single toss.",
      "0.5",
      "A fair coin gives heads (success) with p = 0.5, so q = 1 − 0.5 = 0.5.",
      { accepted: ["1/2", "50%"], hint: "For a fair coin, heads and tails are equally likely." },
    ),
  ],
  independentPractice: [
    bTyped(
      "y12e1-binomial-bern-i1",
      "A die is rolled and a success is rolling an even number. Find the success probability p as a fraction.",
      "1/2",
      "Three of the six faces (2, 4, 6) are even, so p = 3/6 = 1/2.",
      { accepted: ["0.5", "3/6"], hint: "Count how many of the six faces count as a success." },
    ),
    bTyped(
      "y12e1-binomial-bern-i2",
      "In a large batch, 3% of items are defective. A sample of 20 is inspected and X is the number defective. State the success probability p (a defective item).",
      "0.03",
      "Each item is independently defective with probability 3% = 0.03, so p = 0.03.",
      { accepted: ["3%", "3/100"], hint: "Convert the percentage of defectives to a probability." },
    ),
    bTyped(
      "y12e1-binomial-bern-i3",
      "For X ~ B(8, 0.35), find the failure probability q.",
      "0.65",
      "q = 1 − p = 1 − 0.35 = 0.65.",
      { accepted: ["13/20", "65%"], hint: "q is the complement of p." },
    ),
    bChoiceQ(
      "y12e1-binomial-bern-i4",
      "Which experiment is NOT binomial?",
      "B",
      [
        "Tossing a coin 10 times and counting heads",
        "Drawing 5 cards from a deck without replacement and counting hearts",
        "Inspecting 30 independent items and counting the defectives",
        "Asking 12 randomly chosen people whether they own a car",
      ],
      "Drawing without replacement changes the probability of a heart on each draw, so the trials are not identical — not binomial. The other three keep p constant across independent trials.",
    ),
    bTyped(
      "y12e1-binomial-bern-i5",
      "A basketball player makes 80% of free throws and takes 15 shots. With success = a made shot, find the failure probability q.",
      "0.2",
      "p = 0.8 (a made shot), so q = 1 − 0.8 = 0.2 (a missed shot).",
      { accepted: ["1/5", "20%"], hint: "Find the probability of a miss as the complement of a make." },
    ),
  ],
  masteryQuiz: bernoulliMastery,
  masteryQuizPool: bernoulliHardPool,
  masteryPassMark: 0.8,
};

const probB5p4 = {
  description:
    "Bar chart of X ~ B(5, 0.4): probabilities at k = 0,1,2,3,4,5 are 0.078, 0.259, 0.346, 0.230, 0.077, 0.010, peaking at k = 2.",
  bars: [
    { label: "0", value: 0.078 },
    { label: "1", value: 0.259 },
    { label: "2", value: 0.346 },
    { label: "3", value: 0.230 },
    { label: "4", value: 0.077 },
    { label: "5", value: 0.010 },
  ],
  valueAxisLabel: "P(X = k)",
  categoryAxisLabel: "Number of successes, k",
};

const probB4p3 = {
  description:
    "Bar chart of X ~ B(4, 0.3): probabilities at k = 0,1,2,3,4 are 0.240, 0.412, 0.265, 0.076, 0.008.",
  bars: [
    { label: "0", value: 0.24 },
    { label: "1", value: 0.412 },
    { label: "2", value: 0.265 },
    { label: "3", value: 0.076 },
    { label: "4", value: 0.008 },
  ],
  valueAxisLabel: "P(X = k)",
  categoryAxisLabel: "Number of successes, k",
};

const binomialProbMastery: PracticeQuestion[] = [
  bTyped(
    "y12e1-binomial-prob-m1",
    "Find P(X = 0) for X ~ B(4, 0.6).",
    "0.0256",
    "P(X = 0) = q^4 with q = 1 − 0.6 = 0.4, so P(X = 0) = 0.4^4 = 0.0256.",
    { accepted: ["0.026"], difficulty: 3, hint: "Zero successes means all four trials fail: use q^4." },
  ),
  bChoiceQ(
    "y12e1-binomial-prob-m2",
    "For X ~ B(6, 0.25), what is the failure probability q?",
    "C",
    ["0.25", "6", "0.75", "1.5"],
    "q = 1 − p = 1 − 0.25 = 0.75. The value 0.25 is p, 6 is n, and 1.5 is the mean np — none of these is q.",
    { difficulty: 3 },
  ),
  bTyped(
    "y12e1-binomial-prob-m3",
    "Find P(X = 1) for X ~ B(5, 0.2).",
    "0.4096",
    "P(X = 1) = C(5,1) · p · q^4 = 5 · 0.2 · 0.8^4 = 5 · 0.2 · 0.4096 = 0.4096.",
    { accepted: ["0.41"], difficulty: 3, hint: "Use C(5,1) · p^1 · q^4." },
  ),
  bTyped(
    "y12e1-binomial-prob-m4",
    "For X ~ B(6, 0.2), find P(X ≥ 1) to 4 decimal places.",
    "0.7379",
    "P(X ≥ 1) = 1 − P(X = 0) = 1 − 0.8^6 = 1 − 0.262144 = 0.737856 ≈ 0.7379.",
    { accepted: ["0.738", "0.7378"], difficulty: 4, hint: "Use the complement: 1 − P(X = 0)." },
  ),
  bChoiceQ(
    "y12e1-binomial-prob-m5",
    "What is the most efficient way to compute P(X ≥ 2)?",
    "B",
    [
      "Add P(X = 2) + P(X = 3) + … + P(X = n)",
      "Use 1 − P(X = 0) − P(X = 1)",
      "Use P(X = 2) on its own",
      "Use q² directly",
    ],
    "P(X ≥ 2) is the complement of 'fewer than 2 successes', so 1 − P(X = 0) − P(X = 1) needs only two terms. Adding every term from 2 upward works but is far longer; the other options are simply wrong.",
    { difficulty: 4 },
  ),
  bTyped(
    "y12e1-binomial-prob-m6",
    "The bar chart shows X ~ B(4, 0.3). Find P(X ≥ 3) by adding the relevant probabilities.",
    "0.0837",
    "P(X ≥ 3) = P(X = 3) + P(X = 4) = C(4,3)(0.3)^3(0.7) + (0.3)^4 = 0.0756 + 0.0081 = 0.0837.",
    { accepted: ["0.084", "0.0837"], difficulty: 4, hint: "Add only the k = 3 and k = 4 bars.", barChartDiagram: probB4p3 },
  ),
  bTyped(
    "y12e1-binomial-prob-m7",
    "Find P(X = 2) for X ~ B(8, 0.5), to 4 decimal places.",
    "0.1094",
    "P(X = 2) = C(8,2)(0.5)^2(0.5)^6 = 28 · (0.5)^8 = 28/256 = 0.109375 ≈ 0.1094.",
    { accepted: ["28/256", "7/64", "0.109"], difficulty: 4, hint: "With p = 0.5, P(X=k) = C(8,k)/2^8." },
  ),
  bTyped(
    "y12e1-binomial-prob-m8",
    "A quiz has 10 true/false questions answered at random. Find the probability of getting at least one correct, to 4 decimal places.",
    "0.9990",
    "Each guess is correct with p = 0.5. P(at least one) = 1 − P(none) = 1 − 0.5^10 = 1 − 1/1024 = 1023/1024 ≈ 0.9990.",
    { accepted: ["1023/1024", "0.999"], difficulty: 5, hint: "Use the complement of getting every question wrong." },
  ),
  bChoiceQ(
    "y12e1-binomial-prob-m9",
    "For a binomial experiment, P(X ≥ 1) = 0.96. What does this tell you in context?",
    "A",
    [
      "It is very likely (96% chance) that at least one success occurs",
      "Exactly 96% of the trials are successes",
      "There is a 96% chance of no successes",
      "The success probability p must equal 0.96",
    ],
    "P(X ≥ 1) is the probability of one or more successes, so 0.96 means a 96% chance of at least one success. It is not the proportion of successful trials, nor the probability of none, nor the value of p.",
    { difficulty: 5 },
  ),
  bTyped(
    "y12e1-binomial-prob-m10",
    "For X ~ B(3, p), the probability of no successes is P(X = 0) = 0.216. Find p.",
    "0.4",
    "P(X = 0) = q^3 = 0.216, so q = 0.216^(1/3) = 0.6. Then p = 1 − q = 0.4.",
    { accepted: ["2/5", "40%"], difficulty: 5, hint: "Take the cube root of 0.216 to get q, then p = 1 − q." },
  ),
];

const binomialProbHardPool: PracticeQuestion[] = [
  bTyped(
    "y12e1-binomial-prob-pool-d5-1",
    "For X ~ B(5, 1/3), find P(X = 2) as an exact fraction.",
    "80/243",
    "P(X = 2) = C(5,2)(1/3)^2(2/3)^3 = 10 · (1/9) · (8/27) = 80/243.",
    { accepted: ["0.329", "0.3292"], difficulty: 5, hint: "Use C(5,2) p^2 q^3 with p = 1/3, q = 2/3." },
  ),
  bTyped(
    "y12e1-binomial-prob-pool-d5-2",
    "For X ~ B(3, 0.5), find P(X ≤ 2) as a fraction.",
    "7/8",
    "P(X ≤ 2) = 1 − P(X = 3) = 1 − (0.5)^3 = 1 − 1/8 = 7/8.",
    { accepted: ["0.875"], difficulty: 5, hint: "Use the complement of P(X = 3)." },
  ),
  bTyped(
    "y12e1-binomial-prob-pool-d6-1",
    "For X ~ B(4, 0.5), find the conditional probability P(X = 2 | X ≥ 1).",
    "0.4",
    "P(X = 2) = C(4,2)/2^4 = 6/16. P(X ≥ 1) = 1 − P(X = 0) = 1 − 1/16 = 15/16. So P(X = 2 | X ≥ 1) = (6/16)/(15/16) = 6/15 = 0.4.",
    { accepted: ["2/5", "6/15"], difficulty: 6, hint: "Use P(A | B) = P(A and B)/P(B); here X = 2 already implies X ≥ 1." },
  ),
];

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
      "The binomial formula is $P(X=k)=nCk p^k q^{n-k}$, where $q=1-p$.",
      "For at least or at most questions, use the complement to avoid adding many probabilities when possible.",
      "A calculator can compute combinations and powers quickly, but the formula tells you why the probability is correct.",
    ],
    latexBlocks: [
      "P(X=k)=\\binom{n}{k}p^kq^{n-k}",
      "q=1-p",
      "P(X\\ge k)=1-P(X\\le k-1)",
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
        { explanation: "Calculate the value.", latex: "P(X=3)=4\\times0.512\\times0.2=0.4096" },
      ],
      finalAnswerLatex: "0.4096",
    },
    {
      title: "Use a complement for at least one success",
      questionLatex:
        "\\text{With n=5 and p=0.15, find }P(X\\ge1).",
      steps: [
        { explanation: "At least one success is the complement of zero successes.", latex: "P(X\\ge1)=1-P(X=0)" },
        { explanation: "Find P(X=0) using q=0.85.", latex: "P(X=0)=0.85^5=0.4437" },
        { explanation: "Subtract from 1.", latex: "P(X\\ge1)=0.5563" },
      ],
      finalAnswerLatex: "0.5563",
    },
  ],
  guidedPractice: [
    bTyped(
      "y12e1-binomial-prob-g1",
      "For X ~ B(4, 0.8), find P(X = 3).",
      "0.4096",
      "P(X = 3) = C(4,3) · p^3 · q^1 = 4 · (0.8)^3 · (0.2) = 4 · 0.512 · 0.2 = 0.4096.",
      { accepted: ["0.41"], hint: "Use C(4,3) · p^3 · q with p = 0.8, q = 0.2." },
    ),
    bTyped(
      "y12e1-binomial-prob-g2",
      "For X ~ B(5, 0.1), find P(X = 0).",
      "0.59049",
      "P(X = 0) = q^5 with q = 1 − 0.1 = 0.9, so P(X = 0) = 0.9^5 = 0.59049.",
      { accepted: ["0.5905", "0.59"], hint: "Zero successes means all five trials fail: use q^5." },
    ),
    bChoiceQ(
      "y12e1-binomial-prob-g3",
      "Which expression gives P(X = k) for X ~ B(n, p)?",
      "B",
      [
        "$n \\times p^k \\times q^{n-k}$",
        "$\\binom{n}{k} p^k q^{n-k}$",
        "$\\binom{n}{k} p^{n-k} q^k$",
        "$p^k + q^{n-k}$",
      ],
      "The binomial formula is $P(X=k)=\\binom{n}{k}p^k q^{n-k}$: the combination counts the arrangements, $p^k$ gives the successes and $q^{n-k}$ the failures. Swapping the powers or dropping the combination is incorrect.",
    ),
    bTyped(
      "y12e1-binomial-prob-g4",
      "For X ~ B(6, 0.25), find P(X = 2), to 4 decimal places.",
      "0.2966",
      "P(X = 2) = C(6,2)(0.25)^2(0.75)^4 = 15 · 0.0625 · 0.316406… = 0.296630… ≈ 0.2966.",
      { accepted: ["0.297", "0.296"], hint: "Use C(6,2) p^2 q^4 with p = 0.25, q = 0.75." },
    ),
  ],
  independentPractice: [
    bTyped(
      "y12e1-binomial-prob-i1",
      "For X ~ B(5, 0.15), find P(X ≥ 1), to 4 decimal places.",
      "0.5563",
      "P(X ≥ 1) = 1 − P(X = 0) = 1 − 0.85^5 = 1 − 0.443705… = 0.556294… ≈ 0.5563.",
      { accepted: ["0.556", "0.5563"], hint: "At least one success is the complement of zero successes." },
    ),
    bChoiceQ(
      "y12e1-binomial-prob-i2",
      "Which is the most efficient method to find P(X ≥ 2)?",
      "C",
      [
        "Add P(X = 2) + P(X = 3) + … + P(X = n)",
        "Use P(X = 2) on its own",
        "Use 1 − P(X = 0) − P(X = 1)",
        "Use q² directly",
      ],
      "P(X ≥ 2) is the complement of 'fewer than two successes', so 1 − P(X = 0) − P(X = 1) is quickest. Summing every term from 2 upward also works but is much longer; the other two are wrong.",
    ),
    bTyped(
      "y12e1-binomial-prob-i3",
      "For X ~ B(7, 0.5), find P(X = 2) as a fraction.",
      "21/128",
      "P(X = 2) = C(7,2)(0.5)^2(0.5)^5 = 21 · (0.5)^7 = 21/128.",
      { accepted: ["0.1641", "0.164"], hint: "With p = 0.5, P(X = k) = C(7,k)/2^7." },
    ),
    bTyped(
      "y12e1-binomial-prob-i4",
      "For X ~ B(4, 0.3), find P(X ≤ 1), to 4 decimal places.",
      "0.6517",
      "P(X ≤ 1) = P(X = 0) + P(X = 1) = 0.7^4 + C(4,1)(0.3)(0.7)^3 = 0.2401 + 0.4116 = 0.6517.",
      { accepted: ["0.652"], hint: "Add P(X = 0) and P(X = 1)." },
    ),
    bTyped(
      "y12e1-binomial-prob-i5",
      "The bar chart shows the distribution of X ~ B(5, 0.4). Which number of successes is the most likely (the mode)?",
      "2",
      "The mode is the tallest bar. For X ~ B(5, 0.4) the highest probability is at k = 2 (about 0.346), so 2 successes is the most likely outcome.",
      { accepted: ["k=2", "2 successes"], hint: "Read off the tallest bar.", barChartDiagram: probB5p4 },
    ),
  ],
  masteryQuiz: binomialProbMastery,
  masteryQuizPool: binomialProbHardPool,
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
        { explanation: "Multiply the number of trials by the success probability.", latex: "E(X)=20\\times0.3=6" },
      ],
      finalAnswerLatex: "6",
    },
    {
      title: "Variance calculation",
      questionLatex:
        "\\text{For X~B(15,0.4), calculate Var(X).}",
      steps: [
        { explanation: "Use q=1-p first.", latex: "q=0.6" },
        { explanation: "Then calculate npq.", latex: "Var(X)=15\\times0.4\\times0.6=3.6" },
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
      "Use q=0.8 and npq = 15 \\times 0.2 \\times 0.8."
    ),
  ],
  masteryQuizPool: [
    {
      id: "y12e1-binomial-mean-pool-d5-1",
      prompt: "For X ~ B(20, 0.3), find the mean.",
      latex: "X \\sim B(20, 0.3)",
      answer: "6",
      acceptedAnswers: [],
      hint: "Mean = np.",
      explanation: "E(X) = np = 20 × 0.3 = 6.",
      difficulty: 5,
    },
  ],
  masteryPassMark: 0.8,

  multiPartPractice: [
    {
      id: "binom-mp-1",
      prompt:
        "$X \\sim B(n, 0.5)$ and the mean of $X$ is $5$.",
      latex: "E(X) = np = 5,\\quad p = 0.5",
      answer: "10",
      hint: "Use $E(X)=np$ to find $n$, then $\\text{Var}(X)=npq$ for part (b), then $P(X=0)=(0.5)^n$ for part (c).",
      explanation:
        "Part (a): $E(X)=np=0.5n=5$, so $n=10$. Part (b): $\\text{Var}(X)=npq=10\\times0.5\\times0.5=2.5$. Part (c): $P(X=0)=\\binom{10}{0}(0.5)^{10}=\\frac{1}{1024}$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find $n$.",
          latex: "E(X) = np",
          marks: 1,
          answer: "10",
          acceptedAnswers: [],
          hint: "Substitute $p=0.5$ and $E(X)=5$ into $E(X)=np$ and solve for $n$.",
          explanation:
            "$0.5n=5$, so $n=10$.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find $\\text{Var}(X)$.",
          latex: "\\text{Var}(X) = npq",
          marks: 1,
          answer: "2.5",
          acceptedAnswers: ["5/2"],
          hint: "Use $q=1-p=0.5$ and your value of $n$ from part (a).",
          explanation:
            "$\\text{Var}(X)=10\\times0.5\\times0.5=2.5$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find $P(X = 0)$, giving your answer as a fraction.",
          latex: "P(X=0) = \\binom{n}{0} p^0 q^n",
          marks: 2,
          answer: "1/1024",
          acceptedAnswers: ["0.000977", "0.0009765625"],
          hint: "Use $P(X=0)=q^n=(0.5)^{10}$.",
          explanation:
            "$P(X=0)=\\binom{10}{0}(0.5)^{10}(0.5)^0=(0.5)^{10}=\\frac{1}{1024}$.",
        },
      ],
    },
  ],
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
        { explanation: "Describe the trial context clearly.", latex: "\\text{two successes in five independent trials}" },
      ],
      finalAnswerLatex:
        "\\text{The chance of exactly two successes in five independent trials with }p=0.4.",
    },
    {
      title: "Combine probability and expectation",
      questionLatex:
        "\\text{For X~B(12,0.25), calculate E(X) and explain its meaning.}",
      steps: [
        { explanation: "Compute the expected value using np.", latex: "E(X)=12\\times0.25=3" },
        { explanation: "Explain this as the long-run average number of successes.", latex: "\\text{average successes}=3" },
      ],
      finalAnswerLatex: "3\\text{ expected successes in the long run}",
    },
  ],
  guidedPractice: [
    binomialTyped(
      "y12e1-binomial-exam-g1",
      "A machine has probability 0.1 of producing a faulty item. In 8 items, find P(X=1).",
      "0.3826",
      ["0.383", "0.38264"],
      "Use the binomial formula: $C(8,1) × 0.1^1 × 0.9^7 = 8 × 0.1 × 0.4783 ≈ 0.3826$."
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
  masteryQuizPool: [
    {
      id: "y12e1-binomial-exam-pool-d5-1",
      prompt: "For X ~ B(20, 0.3), find the variance.",
      latex: "X \\sim B(20, 0.3)",
      answer: "4.2",
      acceptedAnswers: ["21/5"],
      hint: "Variance = np(1−p).",
      explanation: "Var(X) = np(1−p) = 20 × 0.3 × 0.7 = 4.2.",
      difficulty: 5,
    },
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
