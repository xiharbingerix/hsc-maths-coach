import type {
  ExplicitLesson,
  PracticeQuestion,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function simChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function simAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

export const probabilitySimulationRelativeFrequencyLesson: ExplicitLesson = {
  id: "probability-simulation-relative-frequency",
  slug: "probability-simulation-relative-frequency",
  moduleSlug: "ma-s1-probability-and-discrete-probability-distributions",
  moduleTitle:
    "Probability and Discrete Probability Distributions (Year 11 assumed knowledge)",
  courseTitle: "Year 12 Mathematics Advanced — assumed knowledge revision",
  title: "Probability Simulation and Relative Frequency",
  description:
    "Design simulations, calculate relative frequencies, and judge how trial count affects probability estimates.",
  syllabusArea: "Statistical Analysis",
  focus: "Probability",
  status: "active",
  coursePlacement: "year-11-assumed-knowledge",
  syllabusReferences: ["MA-S1.1"],
  syllabusOutcomes: ["MA11-7", "MA11-8", "MA11-9"],
  syllabusContent: [
    "Distinguish theoretical probability from relative frequency",
    "Represent probabilities on a scale from 0 to 1",
    "Conduct and interpret simulations with repeated trials",
    "Recognise practical factors that complicate simulations",
    "Use relative frequency as a point estimate of probability",
  ],
  video: {
    title: "Probability Simulation and Relative Frequency",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Design fair simulations and use repeated relative frequency as evidence about an unknown probability.",
  successCriteria: [
    "Distinguish theoretical probability from experimental relative frequency.",
    "Calculate relative frequency and place it on the probability scale.",
    "Map equally likely random-device outcomes to a target probability without bias.",
    "Explain why larger independent trial counts usually give more stable estimates.",
    "Identify bias, dependence and poor modelling choices that weaken a simulation.",
  ],
  teaching: {
    paragraphs: [
      "Theoretical probability comes from a model of equally likely outcomes, while experimental probability comes from observed results. Relative frequency is calculated after trials have occurred and can differ from the theoretical value because of random variation.",
      "A simulation replaces a real process with a random device such as digits, cards, dice or technology. The mapping must reproduce the target probabilities: equally likely device outcomes must be allocated in the correct proportions, and unused outcomes need an explicit rule.",
      "Each repetition is a trial and the recorded result must match the event being studied. A clear design states the random device, the outcome mapping, what counts as success, the number of trials, and how results will be summarised.",
      "Relative frequency is a point estimate of the underlying probability. As the number of independent trials grows it usually stabilises near the true probability, although a larger experiment does not guarantee an estimate closer on every particular run.",
      "A simulation can mislead if the random device is biased, trials influence one another, the mapping uses unequal outcome groups, or the model omits an important real-world feature. In an exam, judge both the calculation and the quality of the design.",
    ],
    latexBlocks: [
      "\\text{relative frequency of }E=\\frac{\\text{number of times }E\\text{ occurs}}{\\text{number of trials}}",
      "0\\le P(E)\\le1",
      "\\widehat{P}(E)=\\frac{x}{n}",
      "n\\text{ increases}\\quad\\Rightarrow\\quad\\widehat{P}(E)\\text{ usually becomes more stable}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate and interpret a relative frequency",
      questionLatex:
        "\\text{A seed germinates in }84\\text{ of }120\\text{ trials. Estimate the germination probability.}",
      steps: [
        {
          explanation:
            "Identify successes and total independent trials from the experiment.",
          latex: "x=84,\\quad n=120",
        },
        {
          explanation:
            "Divide successes by trials to form the point estimate.",
          latex: "\\widehat P(\\text{germinates})=\\frac{84}{120}=0.70",
        },
        {
          explanation:
            "Interpret 0.70 as an estimate, not a claim that every future group has exactly 70% successes.",
          latex: "\\widehat P=70\\%",
        },
      ],
      finalAnswerLatex: "\\widehat P(\\text{germinates})=0.70",
    },
    {
      title: "Design an unbiased digit simulation",
      questionLatex:
        "\\text{Use a random digit }0\\text{–}9\\text{ to simulate an event with probability }0.3.",
      steps: [
        {
          explanation:
            "A random digit provides ten equally likely outcomes, so three must represent success.",
          latex: "\\frac3{10}=0.3",
        },
        {
          explanation:
            "Allocate any three digits to success and all remaining digits to failure.",
          latex: "0,1,2:\\ S;\\qquad3,4,5,6,7,8,9:\\ F",
        },
        {
          explanation:
            "Generate a fresh independent digit for each trial and record the relative frequency of success.",
          latex: "\\widehat P(S)=\\frac{\\#S}{n}",
        },
      ],
      finalAnswerLatex:
        "\\text{For example, let }0,1,2\\text{ mean success and the other digits mean failure.}",
    },
    {
      title: "Compare the strength of two estimates",
      questionLatex:
        "\\widehat P_1=\\frac7{10}=0.70,\\qquad\\widehat P_2=\\frac{684}{1000}=0.684",
      steps: [
        {
          explanation:
            "Both values are point estimates, and their numerical closeness alone does not determine reliability.",
          latex: "0.70\\text{ versus }0.684",
        },
        {
          explanation:
            "The second estimate uses one hundred times as many trials and is therefore less exposed to random fluctuation.",
          latex: "n_2=1000\\gg n_1=10",
        },
        {
          explanation:
            "Assuming fair, independent trials, prefer the second estimate while acknowledging remaining sampling variation.",
          latex: "\\widehat P\\approx0.684",
        },
      ],
      finalAnswerLatex:
        "\\text{The }1000\\text{-trial estimate }0.684\\text{ is generally more reliable.}",
    },
  ],
  guidedPractice: [
    simChoice(
      "ma-s1-sim-g1",
      "Which value is an experimental relative frequency?",
      "C",
      ["$1/6$ from a fair-die model", "$1/2$ by symmetry", "$47/100$ from 100 tosses", "$0$ for an impossible event"],
      "Look for a ratio calculated from observed trials.",
      "$47/100$ comes from recorded experimental outcomes; the other values are theoretical or logical probabilities."
    ),
    simAnswer(
      "ma-s1-sim-g2",
      "A spinner lands on blue 36 times in 80 spins. Estimate $P(\\text{blue})$.",
      "\\widehat P(B)=\\frac{36}{80}",
      "0.45",
      ["45%", "9/20"],
      "Divide the observed number of blue results by the number of spins.",
      "$\\widehat P(B)=36/80=0.45$, so the observed relative frequency of blue is 45%."
    ),
    simChoice(
      "ma-s1-sim-g3",
      "Which random-digit mapping correctly simulates an event with probability $0.4$?",
      "B",
      [
        "Digits 0–4 mean success",
        "Digits 0–3 mean success",
        "Digits 1–3 mean success",
        "Even digits mean success",
      ],
      "Four of ten equally likely digits must represent success.",
      "The digits 0, 1, 2 and 3 are four of the ten equally likely digits, producing probability $4/10=0.4$."
    ),
    simAnswer(
      "ma-s1-sim-g4",
      "In 250 independent trials, an event occurs 65 times. Find its relative frequency.",
      "\\frac{65}{250}",
      "0.26",
      ["26%", "13/50"],
      "Use event count over total trial count.",
      "$65/250=0.26$, so the point estimate of the event probability is 0.26."
    ),
  ],
  independentPractice: [
    simAnswer(
      "ma-s1-sim-i1",
      "A quality check finds 9 defects among 300 items. Estimate the defect probability.",
      "\\widehat P(D)=\\frac9{300}",
      "0.03",
      ["3%", "3/100"],
      "Divide defects by all inspected items.",
      "$9/300=0.03$, giving an estimated defect probability of 3% for items produced under similar conditions."
    ),
    simAnswer(
      "ma-s1-sim-i2",
      "A six-sided die is used to simulate rain with probability $1/3$. State a valid success mapping.",
      "\\frac26=\\frac13",
      "two faces",
      ["1 or 2", "faces 1 and 2", "any 2 faces"],
      "Allocate two of the six equally likely faces to rain.",
      "Any two faces can represent rain and the remaining four no rain; for example, 1 or 2 means rain."
    ),
    simChoice(
      "ma-s1-sim-i3",
      "Why is a 2000-trial estimate usually preferred to a 20-trial estimate?",
      "A",
      [
        "It is usually less affected by random fluctuation",
        "It must equal the theoretical probability exactly",
        "It removes every possible source of bias",
        "It makes trials dependent",
      ],
      "Separate reduced sampling variation from guarantees about accuracy or bias.",
      "More independent trials usually stabilise relative frequency, but they neither guarantee exactness nor repair a biased design."
    ),
    simAnswer(
      "ma-s1-sim-i4",
      "Two simulations estimate the same probability as 0.62 from 50 trials and 0.587 from 5000 trials. Which estimate is generally more reliable?",
      "n_1=50,\\quad n_2=5000",
      "0.587",
      ["second", "the 5000-trial estimate"],
      "Compare trial counts, assuming both simulation designs are fair and independent.",
      "The estimate 0.587 is based on far more trials, so it is generally more stable and reliable than the 50-trial estimate."
    ),
    simAnswer(
      "ma-s1-sim-i5",
      "A simulation records 420 successes and reports a relative frequency of 0.56. Find the number of trials.",
      "\\frac{420}{n}=0.56",
      "750",
      ["750 trials"],
      "Rearrange success count divided by trial count equals relative frequency.",
      "$420/n=0.56$ gives $n=420/0.56=750$ trials."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calling a relative frequency the exact theoretical probability.",
      fix: "Use estimate language and retain the hat notation $\\widehat P$ when the value comes from observed trials.",
    },
    {
      mistake: "Mapping unequal numbers of equally likely device outcomes to events that should be equally likely.",
      fix: "Count the device outcomes assigned to each event and check that their proportions match the target model.",
    },
    {
      mistake: "Assuming a larger trial count fixes a biased or dependent simulation.",
      fix: "More trials reduce random variation only when the device, mapping and trial independence are appropriate.",
    },
    {
      mistake: "Dividing the total trials by the number of successes.",
      fix: "Relative frequency is successes divided by trials, so it must lie between 0 and 1.",
    },
  ],
  masteryQuiz: [
    simChoice(
      "ma-s1-sim-m1",
      "A reported relative frequency is 1.08. What is the best conclusion?",
      "D",
      ["The event is certain", "The event is very likely", "More trials are needed", "The calculation is invalid"],
      "Every relative frequency must lie on the probability scale from 0 to 1.",
      "A ratio of successes to trials cannot exceed 1, so 1.08 indicates an arithmetic or recording error."
    ),
    simAnswer(
      "ma-s1-sim-m2",
      "An event occurs 312 times in 800 trials. Estimate its probability.",
      "\\frac{312}{800}",
      "0.39",
      ["39%", "39/100"],
      "Simplify the success count divided by the trial count.",
      "$312/800=0.39$, so the simulation estimates the event probability as 39%."
    ),
    simAnswer(
      "ma-s1-sim-m3",
      "Use two fair coin tosses to simulate an event with probability $3/4$. Give a valid success rule.",
      "S=\\{HH,HT,TH\\}",
      "all except TT",
      ["HH, HT or TH", "success unless TT"],
      "Two tosses have four equally likely ordered outcomes; select three.",
      "The outcomes $HH,HT,TH,TT$ are equally likely, so declaring success for all except $TT$ gives probability $3/4$."
    ),
    simAnswer(
      "ma-s1-sim-m4",
      "A medical simulation gives 145 adverse events in 10 000 trials. Estimate the adverse-event rate as a percentage.",
      "\\frac{145}{10000}\\times100\\%",
      "1.45%",
      ["0.0145", "1.45"],
      "First form the decimal relative frequency, then convert it to a percentage.",
      "$145/10000=0.0145$, which is an estimated adverse-event rate of 1.45%."
    ),
    simChoice(
      "ma-s1-sim-m5",
      "A coin is tossed, then placed heads-up before every next toss. What key simulation condition is threatened?",
      "B",
      ["Sample size", "Independence or fairness", "The probability scale", "The definition of relative frequency"],
      "Ask whether the method of resetting could influence later outcomes.",
      "A physical reset may bias the launch or make trials systematically related, threatening a fair independent-trial model."
    ),
    simAnswer(
      "ma-s1-sim-m6",
      "A model predicts probability 0.35. In 200 trials, how many successes would be expected in the long run?",
      "200(0.35)",
      "70",
      ["70 successes"],
      "Multiply the trial count by the model probability.",
      "The long-run expected count is $np=200(0.35)=70$, although an individual simulation may differ."
    ),
    simAnswer(
      "ma-s1-sim-m7",
      "A researcher wants a random-digit simulation for probability 0.25. Explain why one digit is inconvenient and give a two-digit rule.",
      "\\frac{25}{100}=0.25",
      "00 to 24",
      ["00–24 success", "25 of 100 pairs"],
      "A single digit creates tenths; two digits create one hundred equally likely pairs.",
      "Using 00–99, assign 00–24 to success and 25–99 to failure. Exactly 25 of 100 pairs represent success."
    ),
    simChoice(
      "ma-s1-sim-m8",
      "Which statement about increasing independent trials is most accurate?",
      "C",
      [
        "The relative frequency always moves closer to the truth",
        "The relative frequency becomes the theoretical probability",
        "The relative frequency generally becomes more stable",
        "The event becomes more likely",
      ],
      "Choose a long-run tendency, not a guarantee for each added trial.",
      "Increasing independent trials generally reduces random fluctuation and stabilises the estimate, but no particular step is guaranteed to be closer."
    ),
    simAnswer(
      "ma-s1-sim-m9",
      "Two fair simulations give 18 successes from 30 trials and 570 successes from 1000 trials. State the two estimates and identify the stronger evidence.",
      "\\frac{18}{30},\\quad\\frac{570}{1000}",
      "0.60 and 0.57; second",
      ["0.6 and 0.57, 1000-trial result", "second"],
      "Calculate both relative frequencies, then compare their trial counts.",
      "The estimates are 0.60 and 0.57. The second is stronger evidence because it uses 1000 independent trials rather than 30."
    ),
    simChoice(
      "ma-s1-sim-m10",
      "A simulation of customer arrivals ignores the fact that lunch-hour arrivals cluster. What is the main limitation?",
      "A",
      [
        "The model omits a real dependence pattern",
        "Its relative frequency cannot be calculated",
        "Probabilities greater than 1 are required",
        "The sample space has no outcomes",
      ],
      "Compare the simulation's independence assumption with the real process.",
      "Ignoring clustering treats arrivals as more independent and uniform than they are, so the simulation omits an important dependence pattern."
    ),
  ],
  masteryPassMark: 0.8,
};

