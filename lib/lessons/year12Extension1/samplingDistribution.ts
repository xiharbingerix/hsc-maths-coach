import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";

function sdChoice(
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
    hint: "Re-read the definitions of E(x̄), Var(x̄) and standard error before selecting.",
    explanation,
  };
}

function sdTyped(
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
    hint: "Use Var(x̄) = σ²/n and SE = σ/√n.",
    explanation,
  };
}

// ─── LESSON 1: Sampling Distribution of the Mean ────────────────────────────

const samplingDistributionMean: Partial<ExplicitLesson> = {
  description:
    "Define statistical population and sample, find the distribution of the sample mean x̄, and examine how sample size n affects its variance.",
  learningIntention:
    "Understand that sample means x̄ vary from sample to sample, that E(x̄) = μ and Var(x̄) = σ²/n, and that increasing n reduces the spread of x̄.",
  successCriteria: [
    "Distinguish a statistical population (with mean μ and variance σ²) from a random sample (with sample mean x̄ and sample variance s²).",
    "State E(x̄) = μ for any sample size n.",
    "Calculate Var(x̄) = σ²/n and the standard error SE = σ/√n.",
    "Describe the effect of increasing n on the spread of the sampling distribution of x̄.",
  ],
  teaching: {
    paragraphs: [
      "A statistical population is the entire group of individuals or measurements under study. Its mean is μ and its variance is σ². Because measuring every member is often impractical, we instead draw a sample: a smaller subset of size n selected at random.",
      "The sample mean is x̄ = (x₁ + x₂ + ⋯ + xₙ)/n. Each time we take a new sample, we get a different value of x̄ — so x̄ is itself a random variable with its own probability distribution, called the sampling distribution of the mean.",
      "Two key results follow from the linearity of expectation: E(x̄) = μ (the sample mean is an unbiased estimator of the population mean) and Var(x̄) = σ²/n (the variance of x̄ equals the population variance divided by the sample size n).",
      "The quantity SE = σ/√n is called the standard error of the mean. As n increases, SE shrinks: larger samples produce sample means that cluster more tightly around μ. Quadrupling the sample size halves the standard error.",
    ],
    latexBlocks: [
      "\\bar{x} = \\frac{x_1+x_2+\\cdots+x_n}{n}",
      "E(\\bar{x}) = \\mu",
      "\\operatorname{Var}(\\bar{x}) = \\frac{\\sigma^2}{n}",
      "\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}",
    ],
  },
  workedExamples: [
    {
      title: "Find E(x̄) and Var(x̄) from population parameters",
      questionLatex:
        "\\text{A population has mean }\\mu=50\\text{ and variance }\\sigma^2=100.\\text{ Random samples of size }n=25\\text{ are drawn. Find E}(\\bar{x})\\text{ and Var}(\\bar{x})\\text{, and state the standard error.}",
      steps: [
        {
          explanation: "The expected value of the sample mean always equals the population mean.",
          latex: "E(\\bar{x}) = \\mu = 50",
        },
        {
          explanation: "Divide the population variance by the sample size.",
          latex: "\\operatorname{Var}(\\bar{x}) = \\frac{\\sigma^2}{n} = \\frac{100}{25} = 4",
        },
        {
          explanation: "The standard error is the square root of Var(x̄).",
          latex: "\\text{SE} = \\sqrt{4} = 2",
        },
      ],
      finalAnswerLatex: "E(\\bar{x})=50,\\quad \\operatorname{Var}(\\bar{x})=4,\\quad \\text{SE}=2",
      normalDistributionDiagram: {
        description:
          "Bell curve showing the sampling distribution of x̄. The curve is centred at μ = 50 with standard error SE = 2, so the bulk of sample means fall between 44 and 56.",
        mean: 50,
        standardDeviation: 2,
        xMin: 42,
        xMax: 58,
        showStandardDeviationLabels: true,
        shadedBands: [
          { standardDeviations: 1, color: "blue", label: "68% of sample means within 1 SE of μ" },
        ],
      },
    },
    {
      title: "Effect of increasing sample size on Var(x̄)",
      questionLatex:
        "\\text{Using the same population (}\\mu=50,\\,\\sigma^2=100\\text{), compare Var}(\\bar{x})\\text{ and SE when }n=25\\text{ and when }n=100.",
      steps: [
        {
          explanation: "Calculate Var(x̄) for n = 25.",
          latex: "\\operatorname{Var}(\\bar{x}) = \\frac{100}{25} = 4 \\Rightarrow \\text{SE} = 2",
        },
        {
          explanation: "Calculate Var(x̄) for n = 100.",
          latex: "\\operatorname{Var}(\\bar{x}) = \\frac{100}{100} = 1 \\Rightarrow \\text{SE} = 1",
        },
        {
          explanation: "Increasing n by a factor of 4 halved the standard error from 2 to 1.",
          latex: "\\text{SE}_{n=100} = \\tfrac{1}{2}\\,\\text{SE}_{n=25}",
        },
      ],
      finalAnswerLatex:
        "\\text{Quadrupling }n\\text{ halves SE: from 2 (at }n=25\\text{) to 1 (at }n=100\\text{).}",
    },
  ],
  guidedPractice: [
    sdChoice(
      "y12e1-samp-g1",
      "A population has mean μ and variance σ². What is E(x̄) for random samples of size n?",
      "A",
      ["μ", "μ/n", "nμ", "σ/√n"],
      "The expected value of the sample mean always equals the population mean μ, regardless of n."
    ),
    sdTyped(
      "y12e1-samp-g2",
      "A population has σ² = 36. Random samples of size n = 9 are taken. Find Var(x̄).",
      "4",
      [],
      "Var(x̄) = σ²/n = 36/9 = 4."
    ),
    sdChoice(
      "y12e1-samp-g3",
      "A researcher increases sample size from n = 16 to n = 64. What happens to the standard error SE = σ/√n?",
      "B",
      [
        "SE doubles.",
        "SE is halved.",
        "SE stays the same.",
        "SE increases by 48.",
      ],
      "Quadrupling n (16 → 64) multiplies √n by 2, so SE = σ/√n is halved."
    ),
    sdTyped(
      "y12e1-samp-g4",
      "A population has σ = 10 and random samples of size n = 100 are drawn. Find the standard error SE.",
      "1",
      [],
      "SE = σ/√n = 10/√100 = 10/10 = 1."
    ),
  ],
  independentPractice: [
    sdTyped(
      "y12e1-samp-i1",
      "A population has σ² = 25. Random samples of size n = 25 are taken. Find Var(x̄).",
      "1",
      [],
      "Var(x̄) = 25/25 = 1."
    ),
    sdChoice(
      "y12e1-samp-i2",
      "A population has μ = 80 and σ² = 64. What is Var(x̄) for samples of size n = 16?",
      "C",
      ["8", "16", "4", "64"],
      "Var(x̄) = σ²/n = 64/16 = 4."
    ),
    sdTyped(
      "y12e1-samp-i3",
      "A population has σ = 6 and random samples of size n = 4 are drawn. Find the standard error SE.",
      "3",
      [],
      "SE = σ/√n = 6/√4 = 6/2 = 3."
    ),
    sdChoice(
      "y12e1-samp-i4",
      "Which sample size gives the smallest Var(x̄) for a fixed population?",
      "D",
      ["n = 4", "n = 9", "n = 16", "n = 100"],
      "Var(x̄) = σ²/n decreases as n increases, so the largest n gives the smallest Var(x̄)."
    ),
    sdTyped(
      "y12e1-samp-i5",
      "A population has mean μ = 150. What is E(x̄) for samples of size n = 30?",
      "150",
      [],
      "E(x̄) = μ = 150 for any sample size."
    ),
  ],
  masteryQuiz: [
    sdChoice(
      "y12e1-samp-m1",
      "Which formula correctly defines the sample mean x̄ for a sample x₁, x₂, …, xₙ?",
      "A",
      [
        "x̄ = (x₁ + x₂ + ⋯ + xₙ)/n",
        "x̄ = (x₁ + x₂ + ⋯ + xₙ) × n",
        "x̄ = (x₁ × x₂ × ⋯ × xₙ)^(1/n)",
        "x̄ = (x₁ + xₙ)/2",
      ],
      "The sample mean is the sum of all observations divided by the number of observations."
    ),
    sdTyped(
      "y12e1-samp-m2",
      "A population has σ² = 50. Random samples of size n = 10 are taken. Find Var(x̄).",
      "5",
      [],
      "Var(x̄) = σ²/n = 50/10 = 5."
    ),
    sdChoice(
      "y12e1-samp-m3",
      "A population has mean μ = 70. For samples of size n = 40, what is E(x̄)?",
      "B",
      ["70/40 = 1.75", "70", "70 × 40 = 2800", "√70"],
      "E(x̄) = μ regardless of sample size."
    ),
    sdTyped(
      "y12e1-samp-m4",
      "A population has σ = 12 and samples of size n = 9 are taken. Find SE.",
      "4",
      [],
      "SE = σ/√n = 12/3 = 4."
    ),
    sdChoice(
      "y12e1-samp-m5",
      "A population has σ = 8. If n is doubled from 4 to 8, what happens to SE?",
      "C",
      [
        "SE halves.",
        "SE doubles.",
        "SE is multiplied by 1/√2.",
        "SE stays the same.",
      ],
      "SE = σ/√n. Doubling n multiplies √n by √2, so SE is divided by √2 ≈ 0.707."
    ),
    sdTyped(
      "y12e1-samp-m6",
      "A population has σ = 8 and samples of size n = 16 are taken. Find Var(x̄).",
      "4",
      [],
      "Var(x̄) = σ²/n = 64/16 = 4."
    ),
    sdChoice(
      "y12e1-samp-m7",
      "If SE = σ/√n, increasing n by a factor of 9 multiplies SE by:",
      "B",
      ["9", "1/3", "3", "1/9"],
      "√(9n) = 3√n, so SE = σ/(3√n), which is 1/3 of the original SE."
    ),
    sdTyped(
      "y12e1-samp-m8",
      "A population has σ² = 144. Random samples of size n = 36 are taken. Find Var(x̄).",
      "4",
      [],
      "Var(x̄) = 144/36 = 4."
    ),
    sdChoice(
      "y12e1-samp-m9",
      "Which statement about the sample variance s² is correct?",
      "D",
      [
        "s² = σ² always.",
        "s² = σ²/n always.",
        "s² is always less than σ².",
        "s² is calculated from the sample and estimates σ².",
      ],
      "The sample variance s² is computed from the observed data and acts as an estimate of the unknown population variance σ²."
    ),
    sdChoice(
      "y12e1-samp-m10",
      "Why is the sampling distribution of x̄ important in statistics?",
      "A",
      [
        "It describes how likely different values of the sample mean are, allowing probability statements about x̄.",
        "It always equals the population distribution.",
        "It removes the need to collect any data.",
        "It shows the exact value of μ.",
      ],
      "By knowing the distribution of x̄, we can calculate probabilities and make inferences about the population mean μ."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── LESSON 2: The Central Limit Theorem ────────────────────────────────────

const centralLimitTheorem: Partial<ExplicitLesson> = {
  description:
    "State and apply the Central Limit Theorem: for large n, the sampling distribution of x̄ is approximately normal, and use this to calculate probabilities about x̄.",
  learningIntention:
    "Apply the Central Limit Theorem to find probabilities about sample means by standardising x̄ to a z-score and using normal distribution values.",
  successCriteria: [
    "State the Central Limit Theorem: for large n, x̄ ~ N(μ, σ²/n) approximately, regardless of population shape.",
    "Convert a value of x̄ to a z-score using z = (x̄ − μ)/(σ/√n).",
    "Use a given normal probability (P(Z < z)) to find P(x̄ < a) or P(a < x̄ < b).",
    "Interpret a probability about x̄ in the context of a real-world sampling problem.",
  ],
  teaching: {
    paragraphs: [
      "The Central Limit Theorem (CLT) is one of the most powerful results in statistics. It states: if random samples of size n are drawn from any population with mean μ and variance σ², then the sampling distribution of x̄ is approximately normal when n is large — typically n ≥ 30 is taken as a guideline.",
      "In symbols: x̄ approximately follows N(μ, σ²/n) for large n. This means the sample mean behaves like a normal random variable centred at μ with standard error σ/√n, regardless of the shape of the original population.",
      "To find P(x̄ < a), convert x̄ to a z-score: z = (a − μ)/(σ/√n). Then use P(Z < z) from a standard normal table or given value. For P(x̄ > a), use P(Z > z) = 1 − P(Z < z). For a two-sided interval, find both z-scores and subtract.",
      "The CLT justifies why normal-distribution methods are used so widely: even when the original data is not normally distributed, the sample mean is approximately normal for large samples. This allows meaningful probability statements about how close x̄ is likely to be to μ.",
    ],
    latexBlocks: [
      "\\text{CLT: }\\bar{x} \\approx N\\!\\left(\\mu,\\,\\frac{\\sigma^2}{n}\\right)\\text{ for large }n",
      "z = \\frac{\\bar{x} - \\mu}{\\sigma/\\sqrt{n}}",
      "P(\\bar{x}<a) = P\\!\\left(Z < \\frac{a-\\mu}{\\sigma/\\sqrt{n}}\\right)",
    ],
  },
  workedExamples: [
    {
      title: "Find P(x̄ > a) using CLT",
      questionLatex:
        "\\text{A population has }\\mu=100,\\,\\sigma=10.\\text{ Samples of size }n=25\\text{ are taken.}\\\\\\text{Given }P(Z<1)=0.8413,\\text{ find }P(\\bar{x}>102).",
      steps: [
        {
          explanation: "By CLT, x̄ ~ N(100, 100/25) = N(100, 4) approximately. SE = √4 = 2.",
          latex: "\\bar{x} \\approx N(100,\\,4),\\quad \\text{SE}=2",
        },
        {
          explanation: "Convert x̄ = 102 to a z-score.",
          latex: "z = \\frac{102-100}{2} = 1",
        },
        {
          explanation: "Use the complement rule.",
          latex: "P(\\bar{x}>102) = P(Z>1) = 1 - 0.8413 = 0.1587",
        },
      ],
      finalAnswerLatex: "P(\\bar{x}>102) = 0.1587",
      normalDistributionDiagram: {
        description:
          "Sampling distribution of x̄ centred at μ = 100 with SE = 2. The shaded band shows the central 68% region (μ ± 1 SE = 98 to 102). The right tail beyond x̄ = 102 (z = 1) represents P(x̄ > 102) = 0.1587.",
        mean: 100,
        standardDeviation: 2,
        xMin: 93,
        xMax: 107,
        showStandardDeviationLabels: true,
        shadedBands: [{ standardDeviations: 1, color: "blue", label: "P(x̄ < 102) = 0.8413 (shaded)" }],
        markers: [{ value: 102, label: "x̄ = 102, z = 1" }],
      },
    },
    {
      title: "Find P(a < x̄ < b) using symmetry",
      questionLatex:
        "\\text{A population has }\\mu=50,\\,\\sigma=6.\\text{ Samples of size }n=9\\text{ are taken.}\\\\\\text{Given }P(-1<Z<1)=0.6826,\\text{ find }P(48<\\bar{x}<52).",
      steps: [
        {
          explanation: "SE = σ/√n = 6/3 = 2.",
          latex: "\\text{SE} = \\frac{6}{\\sqrt{9}} = 2",
        },
        {
          explanation: "Find z-scores for the two boundaries.",
          latex: "z_1 = \\frac{48-50}{2} = -1,\\quad z_2 = \\frac{52-50}{2} = 1",
        },
        {
          explanation: "Use the given symmetric probability directly.",
          latex: "P(48<\\bar{x}<52) = P(-1<Z<1) = 0.6826",
        },
      ],
      finalAnswerLatex: "P(48<\\bar{x}<52) = 0.6826",
      normalDistributionDiagram: {
        description:
          "Sampling distribution of x̄ centred at μ = 50 with SE = 2. The shaded band shows P(48 < x̄ < 52) = P(−1 < Z < 1) = 0.6826 — the probability that the sample mean falls within 1 SE of the population mean.",
        mean: 50,
        standardDeviation: 2,
        xMin: 43,
        xMax: 57,
        showStandardDeviationLabels: true,
        shadedBands: [{ standardDeviations: 1, color: "green", label: "P(48 < x̄ < 52) = 0.6826" }],
      },
    },
  ],
  guidedPractice: [
    sdChoice(
      "y12e1-clt-g1",
      "The Central Limit Theorem states that for large n, the distribution of x̄ is approximately:",
      "B",
      [
        "The same as the population distribution.",
        "Normal with mean μ and variance σ²/n.",
        "Uniform regardless of population shape.",
        "Normal with mean μ/n and variance σ².",
      ],
      "The CLT tells us x̄ ~ N(μ, σ²/n) approximately when n is large, whatever the population shape."
    ),
    sdTyped(
      "y12e1-clt-g2",
      "A population has μ = 200 and σ = 20. Samples of size n = 100 are taken. Find SE.",
      "2",
      [],
      "SE = σ/√n = 20/10 = 2."
    ),
    sdChoice(
      "y12e1-clt-g3",
      "Using the population from above (μ = 200, SE = 2) and P(Z < 1.5) = 0.9332, find P(x̄ < 203).",
      "C",
      ["0.0668", "0.5000", "0.9332", "0.8413"],
      "z = (203 − 200)/2 = 1.5. P(x̄ < 203) = P(Z < 1.5) = 0.9332."
    ),
    sdTyped(
      "y12e1-clt-g4",
      "A population has μ = 50 and σ = 5. Samples of size n = 25 are taken. Find the z-score for x̄ = 52.",
      "2",
      [],
      "SE = 5/5 = 1. z = (52 − 50)/1 = 2."
    ),
  ],
  independentPractice: [
    sdTyped(
      "y12e1-clt-i1",
      "A population has μ = 80 and σ = 12. Samples of size n = 36 are taken. Find SE.",
      "2",
      [],
      "SE = 12/√36 = 12/6 = 2."
    ),
    sdChoice(
      "y12e1-clt-i2",
      "A population has μ = 60 and σ = 10. CLT applies for n = 25. What is the variance of x̄?",
      "B",
      ["100", "4", "10", "2"],
      "Var(x̄) = σ²/n = 100/25 = 4."
    ),
    sdTyped(
      "y12e1-clt-i3",
      "A population has μ = 60 and SE = 1. Given P(Z < 2) = 0.9772, find P(x̄ < 62).",
      "0.9772",
      [],
      "z = (62 − 60)/1 = 2. P(x̄ < 62) = P(Z < 2) = 0.9772."
    ),
    sdChoice(
      "y12e1-clt-i4",
      "Which condition makes the CLT approximation most reliable?",
      "D",
      [
        "n = 2 and a perfectly symmetric population.",
        "n = 5 and a known population distribution.",
        "n = 10 regardless of population shape.",
        "n ≥ 30 regardless of population shape.",
      ],
      "The CLT is most reliable when n ≥ 30. Smaller samples can work for near-normal populations but n ≥ 30 is the standard guideline."
    ),
    sdTyped(
      "y12e1-clt-i5",
      "A population has μ = 80 and SE = 3. Find the z-score for x̄ = 77.",
      "-1",
      ["-1.0"],
      "z = (77 − 80)/3 = −3/3 = −1."
    ),
  ],
  masteryQuiz: [
    sdChoice(
      "y12e1-clt-m1",
      "What does the Central Limit Theorem state about the sampling distribution of x̄ for large n?",
      "A",
      [
        "x̄ is approximately normally distributed with mean μ and variance σ²/n.",
        "x̄ is exactly normally distributed regardless of n.",
        "x̄ always has the same distribution as the population.",
        "x̄ is uniformly distributed for any n.",
      ],
      "The CLT guarantees approximate normality of x̄ for large n, with E(x̄) = μ and Var(x̄) = σ²/n."
    ),
    sdTyped(
      "y12e1-clt-m2",
      "A population has σ = 9. Samples of size n = 9 are taken. Find SE.",
      "3",
      [],
      "SE = 9/√9 = 9/3 = 3."
    ),
    sdChoice(
      "y12e1-clt-m3",
      "A population has μ = 50 and SE = 2. Given P(Z < 1) = 0.8413, find P(x̄ < 52).",
      "C",
      ["0.5000", "0.1587", "0.8413", "0.9772"],
      "z = (52 − 50)/2 = 1. P(x̄ < 52) = P(Z < 1) = 0.8413."
    ),
    sdTyped(
      "y12e1-clt-m4",
      "A population has μ = 100 and SE = 2. Find the z-score for x̄ = 98.",
      "-1",
      ["-1.0"],
      "z = (98 − 100)/2 = −1."
    ),
    sdChoice(
      "y12e1-clt-m5",
      "Which of the following is a commonly used minimum sample size guideline for the CLT to apply?",
      "B",
      ["n ≥ 5", "n ≥ 30", "n ≥ 100", "n ≥ 10"],
      "n ≥ 30 is the standard guideline, though the approximation improves further as n grows."
    ),
    sdTyped(
      "y12e1-clt-m6",
      "A population has μ = 50 and SE = 2. Given P(Z < 1) = 0.8413, find P(x̄ > 52).",
      "0.1587",
      [],
      "z = 1. P(x̄ > 52) = P(Z > 1) = 1 − 0.8413 = 0.1587."
    ),
    sdChoice(
      "y12e1-clt-m7",
      "A population has σ² = 100. Samples of size n = 25 are taken. What is Var(x̄)?",
      "B",
      ["100", "4", "25", "2"],
      "Var(x̄) = σ²/n = 100/25 = 4."
    ),
    sdTyped(
      "y12e1-clt-m8",
      "A population has μ = 50 and SE = 2. Given P(−1 < Z < 1) = 0.6826, find P(48 < x̄ < 52).",
      "0.6826",
      [],
      "z₁ = (48 − 50)/2 = −1, z₂ = (52 − 50)/2 = 1. P(48 < x̄ < 52) = P(−1 < Z < 1) = 0.6826."
    ),
    sdChoice(
      "y12e1-clt-m9",
      "Why does the standard error SE decrease as n increases?",
      "D",
      [
        "The population variance σ² decreases with more sampling.",
        "Larger samples are less variable by definition.",
        "The CLT forces normality which has lower variance.",
        "Averaging more values smooths out individual variation, so x̄ clusters more tightly around μ.",
      ],
      "Each new observation in the average helps cancel out random deviations, so larger n leads to tighter clustering of x̄ around μ."
    ),
    sdChoice(
      "y12e1-clt-m10",
      "If the original population is already normally distributed (for any n), what can we say about the distribution of x̄?",
      "A",
      [
        "x̄ is exactly normally distributed, even for small n.",
        "x̄ is approximately normal only for n ≥ 30.",
        "x̄ follows a t-distribution regardless of n.",
        "x̄ has the same variance as the population.",
      ],
      "When the population is normal, x̄ ~ N(μ, σ²/n) exactly for any n — the CLT approximation is not needed."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Registry ────────────────────────────────────────────────────────────────

const lessons: Record<string, Partial<ExplicitLesson>> = {
  "sampling-distribution-mean": samplingDistributionMean,
  "central-limit-theorem": centralLimitTheorem,
};

export function year12Extension1SamplingDistributionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  return lessons[lesson.slug];
}
