import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import type { CartesianGraph, HistogramDiagram } from "./types";
import { formatChoiceText } from "./questionHelpers";

type QuestionVisual = Partial<PracticeQuestion>;

function rvChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  hint: string,
  explanation: string,
  latex = "",
  visual: QuestionVisual = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
    ...visual,
  };
}

function rvAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  hint: string,
  explanation: string,
  visual: QuestionVisual = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
    ...visual,
  };
}

function maS3Lesson(
  lesson: Omit<
    ExplicitLesson,
    | "moduleSlug"
    | "moduleTitle"
    | "courseTitle"
    | "syllabusArea"
    | "focus"
    | "status"
    | "coursePlacement"
    | "syllabusOutcomes"
    | "masteryPassMark"
  >
): ExplicitLesson {
  return {
    ...lesson,
    moduleSlug: "ma-s3-random-variables",
    moduleTitle: "Random Variables",
    courseTitle: "Year 12 Mathematics Advanced",
    syllabusArea: "Statistical Analysis",
    focus: "Random variables",
    status: "active",
    coursePlacement: "year-12",
    syllabusOutcomes: ["MA12-8", "MA12-9", "MA12-10"],
    masteryPassMark: 0.8,
  };
}

const triangularPdf: CartesianGraph = {
  description:
    "Probability density f of x equals x over 2 on the interval zero to two. The region from one to two is shaded.",
  xMin: 0,
  xMax: 2,
  yMin: 0,
  yMax: 1.1,
  xStep: 0.5,
  yStep: 0.25,
  showGrid: true,
  xAxisLabel: "x",
  yAxisLabel: "f(x)",
  lines: [{ kind: "linear", m: 0.5, b: 0, xMin: 0, xMax: 2, label: "f(x)=x/2" }],
  shadedRegions: [
    {
      kind: "under-function",
      functionType: "line",
      line: { m: 0.5, b: 0 },
      xMin: 1,
      xMax: 2,
      baseline: 0,
      color: "blue",
      description: "P(1≤X≤2)",
    },
  ],
};

const uniformPdf: CartesianGraph = {
  description:
    "Uniform density on the interval two to eight with height one sixth. The interval from three to five is shaded.",
  xMin: 2,
  xMax: 8,
  yMin: 0,
  yMax: 0.25,
  xStep: 1,
  yStep: 0.05,
  showGrid: true,
  xAxisLabel: "x",
  yAxisLabel: "f(x)",
  lines: [{ kind: "linear", m: 0, b: 1 / 6, xMin: 2, xMax: 8, label: "f(x)=1/6" }],
  shadedRegions: [
    {
      kind: "under-function",
      functionType: "line",
      line: { m: 0, b: 1 / 6 },
      xMin: 3,
      xMax: 5,
      baseline: 0,
      color: "green",
      description: "P(3≤X≤5)",
    },
  ],
};

const waitingTimeHistogram: HistogramDiagram = {
  description:
    "Histogram of forty observed waiting times. Frequencies are ten in zero to one minutes, eighteen in one to two minutes, and twelve in two to three minutes.",
  bins: [
    { label: "0–1", frequency: 10 },
    { label: "1–2", frequency: 18 },
    { label: "2–3", frequency: 12 },
  ],
  axisLabel: "waiting time (minutes)",
  frequencyAxisLabel: "frequency",
  valueMax: 20,
  valueStep: 5,
};

const pdfWorkedExamples: WorkedExample[] = [
  {
    title: "Estimate probability from observed relative frequency",
    questionLatex:
      "\\text{Forty waiting times are grouped in the displayed histogram. Estimate }P(X\\ge1).",
    steps: [
      {
        explanation:
          "Treat relative frequency as the point estimate of probability and count the observations in the requested classes.",
        latex: "n(X\\ge1)=18+12=30",
      },
      {
        explanation:
          "Divide the relevant frequency by the total number of observations.",
        latex: "\\widehat{P}(X\\ge1)=\\frac{30}{40}=0.75",
      },
    ],
    finalAnswerLatex: "\\widehat{P}(X\\ge1)=0.75",
    histogramDiagram: waitingTimeHistogram,
  },
  {
    title: "Normalise a probability density function",
    questionLatex: "f(x)=kx,\\quad 0\\le x\\le2.\\quad\\text{Find }k.",
    steps: [
      {
        explanation:
          "A density must have total area 1, so integrate over its entire support.",
        latex: "\\int_0^2kx\\,dx=1",
      },
      {
        explanation: "Evaluate the integral before solving for the constant.",
        latex: "k\\left[\\frac{x^2}{2}\\right]_0^2=2k=1",
      },
      {
        explanation:
          "The value is positive and makes the area exactly 1, so it satisfies both density conditions.",
        latex: "k=\\frac12",
      },
    ],
    finalAnswerLatex: "k=\\frac12",
    cartesianGraph: triangularPdf,
  },
  {
    title: "Find a continuous probability as an area",
    questionLatex:
      "X\\sim U(2,8).\\quad\\text{Find }P(3\\le X\\le5).",
    steps: [
      {
        explanation:
          "The uniform density is the reciprocal of the support length.",
        latex: "f(x)=\\frac1{8-2}=\\frac16",
      },
      {
        explanation:
          "Probability is the rectangular area over the requested interval.",
        latex: "P(3\\le X\\le5)=\\int_3^5\\frac16\\,dx=\\frac{5-3}{6}",
      },
      {
        explanation:
          "Interpret the result as one third of the total support length.",
        latex: "P(3\\le X\\le5)=\\frac13",
      },
    ],
    finalAnswerLatex: "\\frac13",
    cartesianGraph: uniformPdf,
  },
];

export const continuousRandomVariablesPdfsLesson = maS3Lesson({
  id: "continuous-random-variables-pdfs",
  slug: "continuous-random-variables-pdfs",
  title: "Continuous Random Variables and Probability Density Functions",
  description:
    "Estimate continuous probabilities from relative frequency, validate density functions, and calculate probabilities by integration.",
  syllabusReferences: ["MA-S3.1"],
  syllabusContent: [
    "Use relative frequencies and histograms to estimate probabilities for continuous data",
    "Recognise the defining properties of a probability density function",
    "Calculate probabilities as areas using definite integration",
    "Solve problems involving simple and uniform continuous random variables",
    "Identify the mode from a probability density function",
  ],
  video: {
    title: "Continuous Random Variables and Probability Density Functions",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Connect observed relative frequency, area under a density curve, and definite integration when modelling continuous random variables.",
  successCriteria: [
    "Use a histogram and relative frequency to estimate a continuous probability.",
    "Verify that a proposed density is non-negative and has total area 1.",
    "Find an unknown density constant by normalising the total area.",
    "Calculate an interval probability with a definite integral.",
    "Solve uniform continuous-distribution problems and identify a mode from a density graph or rule.",
  ],
  teaching: {
    paragraphs: [
      "A continuous random variable records measurements such as time, mass or temperature and can take any value across an interval. Before choosing a model, observed relative frequencies from a large sample or histogram provide sensible point estimates of probabilities.",
      "A probability density function, or pdf, replaces the bars of a relative-frequency histogram with a curve. The height $f(x)$ is a density, not the probability of the exact value $x$; probability is represented by area under the curve.",
      "Every pdf obeys two conditions: it is never negative and its total area is 1. These conditions are diagnostic—if a rule dips below the axis or integrates to something other than 1, it cannot be a pdf without modification.",
      "For an interval, integrate the density between its endpoints. A single point has zero width and therefore zero area, so including or excluding interval endpoints does not change a continuous probability.",
      "A uniform continuous distribution has constant density, so probabilities are ratios of interval lengths. For a non-uniform density, the mode is the input where the density reaches its greatest height, not necessarily the centre of the support.",
    ],
    latexBlocks: [
      "f(x)\\ge0,\\qquad \\int_{-\\infty}^{\\infty}f(x)\\,dx=1",
      "P(a\\le X\\le b)=\\int_a^bf(x)\\,dx",
      "P(X=a)=0,\\qquad P(a<X<b)=P(a\\le X\\le b)",
      "X\\sim U(a,b):\\quad f(x)=\\frac1{b-a}",
    ],
  },
  workedExamples: pdfWorkedExamples,
  guidedPractice: [
    rvChoice(
      "ma-s3-pdf-g1",
      "Which pair of conditions must every probability density function satisfy?",
      "C",
      [
        "$0\\le f(x)\\le1$ and $\\int f=1$",
        "$f(x)>0$ and $f(\\mu)=1$",
        "$f(x)\\ge0$ and the total integral is $1$",
        "$f(x)$ is increasing and the total integral is $1$",
      ],
      "Separate the height of a density from the probability represented by area.",
      "A valid pdf is non-negative everywhere and has total area 1; its height may exceed 1 on a sufficiently short interval."
    ),
    rvAnswer(
      "ma-s3-pdf-g2",
      "A constant density is defined on $0\\le x\\le5$. Find its height $c$.",
      "\\int_0^5c\\,dx=1",
      "1/5",
      ["0.2", "c=1/5", "c = 1/5"],
      "Set the rectangular area, width times height, equal to 1.",
      "The total area is $5c$, so $5c=1$ and the required density height is $c=1/5$."
    ),
    rvAnswer(
      "ma-s3-pdf-g3",
      "Use the displayed density to find $P(1\\le X\\le2)$.",
      "f(x)=\\frac{x}{2},\\quad0\\le x\\le2",
      "3/4",
      ["0.75", "0.750"],
      "Integrate $x/2$ from 1 to 2, matching the shaded region.",
      "$P(1\\le X\\le2)=\\int_1^2x/2\\,dx=[x^2/4]_1^2=1-1/4=3/4$.",
      { cartesianGraph: triangularPdf }
    ),
    rvAnswer(
      "ma-s3-pdf-g4",
      "Use the displayed histogram to estimate $P(X\\ge1)$.",
      "n=40",
      "0.75",
      ["3/4", "75%"],
      "Add the frequencies for the classes from 1 minute onward, then divide by 40.",
      "There are $18+12=30$ relevant observations, so the relative-frequency estimate is $30/40=0.75$.",
      { histogramDiagram: waitingTimeHistogram }
    ),
  ],
  independentPractice: [
    rvAnswer(
      "ma-s3-pdf-i1",
      "The rule $f(x)=kx$ applies on $0\\le x\\le2$. Find $k$.",
      "\\int_0^2kx\\,dx=1",
      "1/2",
      ["0.5", "k=1/2"],
      "Normalise the rule over the whole support.",
      "$\\int_0^2kx\\,dx=2k$. Setting $2k=1$ gives $k=1/2$, which is positive."
    ),
    rvAnswer(
      "ma-s3-pdf-i2",
      "For $f(x)=x/2$ on $0\\le x\\le2$, find $P(0<X<1)$.",
      "P(0<X<1)=\\int_0^1\\frac{x}{2}\\,dx",
      "1/4",
      ["0.25"],
      "Evaluate the area from 0 to 1 rather than reading the curve height at 1.",
      "$[x^2/4]_0^1=1/4$, so the probability of the interval is $0.25$."
    ),
    rvAnswer(
      "ma-s3-pdf-i3",
      "A waiting time is uniform on $[2,8]$ minutes. Find $P(3\\le X\\le5)$.",
      "X\\sim U(2,8)",
      "1/3",
      ["0.333", "0.3333"],
      "Compare the requested interval length with the total support length.",
      "The requested width is $2$ and the total width is $6$, so the probability is $2/6=1/3$.",
      { cartesianGraph: uniformPdf }
    ),
    rvChoice(
      "ma-s3-pdf-i4",
      "Why is $P(1<X<2)=P(1\\le X\\le2)$ for a continuous random variable?",
      "B",
      [
        "Every continuous density is uniform",
        "Each endpoint has probability zero",
        "The density equals zero at each endpoint",
        "All intervals have the same probability",
      ],
      "Think about the area contributed by a single point.",
      "A single value has zero width and hence zero probability, so adding or removing the two endpoints changes no area."
    ),
    rvAnswer(
      "ma-s3-pdf-i5",
      "The density $f(x)=3x^2$ is defined on $0\\le x\\le1$. State its mode.",
      "f(x)=3x^2",
      "1",
      ["x=1"],
      "Locate where the density reaches its maximum height on the support.",
      "Because $3x^2$ increases throughout $[0,1]$, its greatest density occurs at $x=1$, so the mode is 1."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Treating the height $f(a)$ as $P(X=a)$.",
      fix: "Density is height; probability is area. For a continuous variable, every single exact value has probability zero.",
    },
    {
      mistake: "Checking that the integral is 1 but ignoring negative density.",
      fix: "Verify both conditions independently: $f(x)\\ge0$ on the support and the complete area equals 1.",
    },
    {
      mistake: "Integrating over the full support when an interval probability is requested.",
      fix: "Use the requested endpoints as the definite-integral limits, after confirming they lie inside the support.",
    },
    {
      mistake: "Assuming a pdf height can never exceed 1.",
      fix: "Only probability must be at most 1. A density can exceed 1 if the supporting interval is narrow enough.",
    },
  ],
  masteryQuiz: [
    rvChoice(
      "ma-s3-pdf-m1",
      "Which proposed rule cannot be a pdf on the stated support?",
      "D",
      [
        "$f(x)=1/4$ on $[0,4]$",
        "$f(x)=2x$ on $[0,1]$",
        "$f(x)=3x^2$ on $[0,1]$",
        "$f(x)=2x-1$ on $[0,1]$",
      ],
      "Check non-negativity before checking total area.",
      "$2x-1$ is negative for $0\\le x<1/2$, so it fails the non-negativity condition even before its area is considered."
    ),
    rvAnswer(
      "ma-s3-pdf-m2",
      "For $f(x)=k(3-x)$ on $0\\le x\\le3$, find $k$.",
      "\\int_0^3k(3-x)\\,dx=1",
      "2/9",
      ["0.2222", "k=2/9"],
      "Integrate the entire triangular density and equate the result to 1.",
      "$\\int_0^3(3-x)dx=9/2$, so $k(9/2)=1$ and therefore $k=2/9$."
    ),
    rvAnswer(
      "ma-s3-pdf-m3",
      "Using $f(x)=\\frac{2}{9}(3-x)$ on $[0,3]$, find $P(X>2)$.",
      "\\int_2^3\\frac{2}{9}(3-x)\\,dx",
      "1/9",
      ["0.1111"],
      "Use 2 and 3 as the integral limits and retain the normalising constant.",
      "The tail area is $\\frac29[3x-x^2/2]_2^3=\\frac29(1/2)=1/9$."
    ),
    rvAnswer(
      "ma-s3-pdf-m4",
      "A bus arrival time is uniform from 8:00 to 8:20. Find the probability it arrives after 8:15.",
      "X\\sim U(0,20)",
      "1/4",
      ["0.25", "25%"],
      "Measure the favourable time length and divide by the full 20-minute length.",
      "The final five minutes form $5/20$ of the uniform interval, so the probability is $1/4$."
    ),
    rvAnswer(
      "ma-s3-pdf-m5",
      "For $f(x)=2x$ on $0\\le x\\le1$, find $a$ if $P(X<a)=0.36$.",
      "\\int_0^a2x\\,dx=0.36",
      "0.6",
      ["3/5", "a=0.6"],
      "Integrate to obtain an equation in the boundary $a$.",
      "$\\int_0^a2x\\,dx=a^2=0.36$. Since $a$ lies in $[0,1]$, $a=0.6$."
    ),
    rvChoice(
      "ma-s3-pdf-m6",
      "A density has height 2 on $0\\le x\\le0.5$ and zero elsewhere. Which statement is correct?",
      "C",
      [
        "It is invalid because a density exceeds 1",
        "It is invalid because its support is shorter than 1",
        "It is valid because it is non-negative and its area is 1",
        "It assigns probability 2 to every value in its support",
      ],
      "Compute the rectangular area and remember that height is not probability.",
      "The rectangle has area $2(0.5)=1$ and is non-negative, so it is a valid pdf despite its height exceeding 1."
    ),
    rvAnswer(
      "ma-s3-pdf-m7",
      "A lifetime has density $f(x)=\\frac1{100}$ for $0\\le x\\le100$. Find $P(20<X<65)$.",
      "X\\sim U(0,100)",
      "0.45",
      ["45%", "9/20"],
      "Use the length of the lifetime interval from 20 to 65.",
      "The relevant width is $65-20=45$ out of a total width 100, giving probability $45/100=0.45$."
    ),
    rvAnswer(
      "ma-s3-pdf-m8",
      "For $f(x)=\\frac34(1-x^2)$ on $-1\\le x\\le1$, verify the total area.",
      "\\int_{-1}^{1}\\frac34(1-x^2)\\,dx",
      "1",
      ["area=1"],
      "Use symmetry or evaluate the antiderivative at both endpoints.",
      "$\\frac34[x-x^3/3]_{-1}^{1}=\\frac34(4/3)=1$, and the rule is non-negative on the support."
    ),
    rvChoice(
      "ma-s3-pdf-m9",
      "A density increases to its greatest height at $x=4$ and then decreases. What is its mode?",
      "B",
      ["The mean", "$x=4$", "The total area", "It cannot be determined"],
      "The mode is read from the location of the highest density.",
      "For a continuous density, the mode is the value at which the pdf reaches its maximum, so the mode is $x=4$."
    ),
    rvAnswer(
      "ma-s3-pdf-m10",
      "A sensor reading has $f(x)=\\frac{x}{8}$ on $0\\le x\\le4$. Find $P(1\\le X\\le3)$.",
      "\\int_1^3\\frac{x}{8}\\,dx",
      "1/2",
      ["0.5"],
      "Evaluate the antiderivative $x^2/16$ at 3 and 1.",
      "$P(1\\le X\\le3)=[x^2/16]_1^3=(9-1)/16=8/16=1/2$."
    ),
  ],
});

const quadraticCdf: CartesianGraph = {
  description:
    "Cumulative distribution function equal to zero before x equals zero, x squared from zero to one, and one after x equals one. The 25th, 50th and 75th percentile levels are marked.",
  xMin: -0.25,
  xMax: 1.25,
  yMin: 0,
  yMax: 1.1,
  xStep: 0.25,
  yStep: 0.25,
  showGrid: true,
  xAxisLabel: "x",
  yAxisLabel: "F(x)",
  lines: [
    { kind: "linear", m: 0, b: 0, xMin: -0.25, xMax: 0 },
    { kind: "linear", m: 0, b: 1, xMin: 1, xMax: 1.25 },
  ],
  parabolas: [
    { kind: "quadratic", a: 1, b: 0, c: 0, xMin: 0, xMax: 1, label: "F(x)=x²" },
  ],
  points: [
    { x: 0.5, y: 0.25, label: "Q₁" },
    { x: Math.SQRT1_2, y: 0.5, label: "median" },
    { x: Math.sqrt(0.75), y: 0.75, label: "Q₃" },
  ],
};

const piecewiseLinearCdf: CartesianGraph = {
  description:
    "A cumulative distribution function rising linearly from zero at x equals two to one at x equals six, with horizontal sections at zero before two and one after six.",
  xMin: 0,
  xMax: 8,
  yMin: 0,
  yMax: 1.1,
  xStep: 1,
  yStep: 0.25,
  showGrid: true,
  xAxisLabel: "x",
  yAxisLabel: "F(x)",
  lineSegments: [
    { from: { x: 0, y: 0 }, to: { x: 2, y: 0 } },
    { from: { x: 2, y: 0 }, to: { x: 6, y: 1 }, label: "F(x)=(x−2)/4" },
    { from: { x: 6, y: 1 }, to: { x: 8, y: 1 } },
  ],
};

const cdfWorkedExamples: WorkedExample[] = [
  {
    title: "Build a cumulative distribution function from a pdf",
    questionLatex:
      "f(x)=2x\\text{ on }0\\le x\\le1.\\quad\\text{Find }F(x).",
    steps: [
      {
        explanation:
          "Below the support no probability has accumulated, so the CDF is zero.",
        latex: "F(x)=0\\quad(x<0)",
      },
      {
        explanation:
          "Within the support, integrate the density from the left endpoint to the current value.",
        latex: "F(x)=\\int_0^x2t\\,dt=x^2\\quad(0\\le x\\le1)",
      },
      {
        explanation:
          "At and beyond the upper endpoint all probability has accumulated.",
        latex: "F(x)=1\\quad(x>1)",
      },
    ],
    finalAnswerLatex:
      "F(x)=\\begin{cases}0&x<0\\\\x^2&0\\le x\\le1\\\\1&x>1\\end{cases}",
    cartesianGraph: quadraticCdf,
  },
  {
    title: "Find an interval probability by subtracting CDF values",
    questionLatex:
      "F(x)=x^2\\text{ on }0\\le x\\le1.\\quad\\text{Find }P(0.3<X\\le0.8).",
    steps: [
      {
        explanation:
          "The cumulative area to 0.8 includes the cumulative area to 0.3, so subtract it.",
        latex: "P(0.3<X\\le0.8)=F(0.8)-F(0.3)",
      },
      {
        explanation: "Evaluate the two cumulative probabilities.",
        latex: "=0.8^2-0.3^2=0.64-0.09",
      },
      {
        explanation:
          "The difference is the probability between the two boundaries.",
        latex: "P(0.3<X\\le0.8)=0.55",
      },
    ],
    finalAnswerLatex: "0.55",
    cartesianGraph: quadraticCdf,
  },
  {
    title: "Use a CDF to find a percentile",
    questionLatex:
      "F(x)=x^2\\text{ on }0\\le x\\le1.\\quad\\text{Find the 25th percentile }q_{0.25}.",
    steps: [
      {
        explanation:
          "A 25th percentile has cumulative probability 0.25, so form an inverse-CDF equation.",
        latex: "F(q_{0.25})=0.25",
      },
      {
        explanation:
          "Substitute the CDF rule and choose the root inside the support.",
        latex: "q_{0.25}^2=0.25\\quad\\Rightarrow\\quad q_{0.25}=0.5",
      },
      {
        explanation:
          "Interpretation checks the direction: 25% of values are at or below 0.5.",
        latex: "P(X\\le0.5)=0.25",
      },
    ],
    finalAnswerLatex: "q_{0.25}=0.5",
    cartesianGraph: quadraticCdf,
  },
];

export const cumulativeDistributionFunctionsPercentilesLesson = maS3Lesson({
  id: "cumulative-distribution-functions-percentiles",
  slug: "cumulative-distribution-functions-percentiles",
  title: "Cumulative Distribution Functions and Percentiles",
  description:
    "Construct and analyse cumulative distribution functions, then use inverse-CDF reasoning to find medians and percentiles.",
  syllabusReferences: ["MA-S3.1"],
  syllabusContent: [
    "Obtain and analyse the cumulative distribution function of a continuous random variable",
    "Interpret the cumulative distribution function as F(x)=P(X≤x)",
    "Calculate interval and tail probabilities using cumulative probabilities",
    "Use a cumulative distribution function to calculate the median and other percentiles",
  ],
  video: {
    title: "Cumulative Distribution Functions and Percentiles",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Use a cumulative distribution function as an accumulated-area model and reverse it to locate medians and percentiles.",
  successCriteria: [
    "Explain and use $F(x)=P(X\\le x)$.",
    "Construct a piecewise CDF by integrating a density over its support.",
    "Find interval and upper-tail probabilities from CDF values.",
    "Check that a CDF is non-decreasing and runs from 0 to 1.",
    "Solve $F(q_p)=p$ to find and interpret a median or percentile.",
  ],
  teaching: {
    paragraphs: [
      "A cumulative distribution function, or CDF, is a running total of probability. At an input $x$, the value $F(x)$ is all the area under the pdf to the left of and including $x$, so it answers a probability question directly.",
      "A valid continuous CDF begins at 0, never decreases, and approaches 1. Outside a bounded support it is constant: no probability has accumulated before the lower endpoint, while all probability has accumulated after the upper endpoint.",
      "Within the support, build $F(x)$ by integrating the pdf from its lower boundary to a variable endpoint. Differentiation reverses this process, so wherever the CDF is differentiable its gradient is the density $f(x)$.",
      "CDF subtraction isolates an interval: accumulated probability to the right endpoint minus accumulated probability to the left endpoint. An upper tail is the complement $1-F(x)$, which prevents unnecessary re-integration.",
      "Percentiles reverse the CDF. The $p$th quantile $q_p$ solves $F(q_p)=p$; in particular, the median solves $F(m)=0.5$. A complete answer interprets the result in context, for example that 25% of observations are at or below the first quartile.",
    ],
    latexBlocks: [
      "F(x)=P(X\\le x)=\\int_{-\\infty}^{x}f(t)\\,dt",
      "P(a<X\\le b)=F(b)-F(a),\\qquad P(X>x)=1-F(x)",
      "F'(x)=f(x)",
      "F(q_p)=p,\\qquad F(m)=0.5",
    ],
  },
  workedExamples: cdfWorkedExamples,
  guidedPractice: [
    rvChoice(
      "ma-s3-cdf-g1",
      "What does $F(4)=0.7$ mean?",
      "B",
      [
        "$P(X=4)=0.7$",
        "$P(X\\le4)=0.7$",
        "$P(X>4)=0.7$",
        "$f(4)=0.7$",
      ],
      "Recall that a CDF accumulates probability from the far left up to its input.",
      "$F(4)=P(X\\le4)$, so 70% of the distribution lies at or below 4."
    ),
    rvAnswer(
      "ma-s3-cdf-g2",
      "For $F(x)=x^2$ on $0\\le x\\le1$, calculate $F(0.6)$.",
      "F(0.6)=0.6^2",
      "0.36",
      ["36%", "9/25"],
      "Substitute 0.6 into the CDF rule rather than the pdf.",
      "$F(0.6)=0.6^2=0.36$, which means $P(X\\le0.6)=0.36$."
    ),
    rvAnswer(
      "ma-s3-cdf-g3",
      "For $F(x)=x^2$ on $[0,1]$, find $P(0.2<X\\le0.7)$.",
      "F(0.7)-F(0.2)",
      "0.45",
      ["45%", "9/20"],
      "Subtract the cumulative value at the lower boundary from the value at the upper boundary.",
      "$0.7^2-0.2^2=0.49-0.04=0.45$, so the interval contains 45% of the probability."
    ),
    rvAnswer(
      "ma-s3-cdf-g4",
      "Use the displayed CDF to find the 25th percentile.",
      "F(q)=0.25",
      "0.5",
      ["1/2", "q=0.5"],
      "Locate where the cumulative probability reaches 0.25, or solve $q^2=0.25$.",
      "The graph and rule give $q^2=0.25$, so the support-appropriate solution is $q=0.5$.",
      { cartesianGraph: quadraticCdf }
    ),
  ],
  independentPractice: [
    rvAnswer(
      "ma-s3-cdf-i1",
      "For $f(x)=2x$ on $[0,1]$, state the CDF rule within the support.",
      "F(x)=\\int_0^x2t\\,dt",
      "x^2",
      ["F(x)=x^2", "x²"],
      "Integrate using a dummy variable from 0 to the current input $x$.",
      "$F(x)=[t^2]_0^x=x^2$ for $0\\le x\\le1$; outside the support it is 0 or 1."
    ),
    rvAnswer(
      "ma-s3-cdf-i2",
      "A variable is uniform on $[2,6]$. Find its median using its CDF.",
      "F(x)=\\frac{x-2}{4},\\quad F(m)=0.5",
      "4",
      ["m=4"],
      "Set the linear CDF equal to 0.5 and solve for the input.",
      "$(m-2)/4=0.5$ gives $m-2=2$ and $m=4$, the midpoint of the uniform support.",
      { cartesianGraph: piecewiseLinearCdf }
    ),
    rvChoice(
      "ma-s3-cdf-i3",
      "A lifetime CDF satisfies $F(12)=0.7$. Which contextual statement is correct?",
      "C",
      [
        "Every item lasts 12 hours",
        "70% last longer than 12 hours",
        "70% last at most 12 hours",
        "The density at 12 is 0.7",
      ],
      "Translate $F(12)$ directly into a cumulative probability statement.",
      "$F(12)=P(X\\le12)=0.7$, so 70% of item lifetimes are at most 12 hours."
    ),
    rvAnswer(
      "ma-s3-cdf-i4",
      "If $F(x)=x^3$ on $0\\le x\\le1$, find the density $f(x)$ within the support.",
      "f(x)=F'(x)",
      "3x^2",
      ["3x²", "f(x)=3x^2"],
      "Differentiate the cumulative distribution function.",
      "Because density is the derivative of cumulative probability, $f(x)=F'(x)=3x^2$ on $[0,1]$."
    ),
    rvAnswer(
      "ma-s3-cdf-i5",
      "For $F(x)=x^2$ on $[0,1]$, find the median to three decimal places.",
      "F(m)=0.5",
      "0.707",
      ["0.7071", "1/sqrt(2)", "√0.5"],
      "Solve $m^2=0.5$ and select the positive root inside the support.",
      "$m=\\sqrt{0.5}=0.707106\\ldots$, so the median is $0.707$ to three decimal places."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the CDF value $F(x)$ with the density height $f(x)$.",
      fix: "$F(x)$ is already a probability from the far left to $x$; $f(x)$ is its gradient and must be integrated to give probability.",
    },
    {
      mistake: "Adding two CDF values to find an interval probability.",
      fix: "Subtract accumulated areas: $P(a<X\\le b)=F(b)-F(a)$.",
    },
    {
      mistake: "Using the positive and negative roots when solving for a percentile.",
      fix: "Check the support and the monotonic CDF; retain only the input that lies in the distribution's support.",
    },
    {
      mistake: "Writing a formula only within the support and calling it the complete CDF.",
      fix: "For bounded support, include the outer pieces: 0 below the lower endpoint and 1 above the upper endpoint.",
    },
  ],
  masteryQuiz: [
    rvChoice(
      "ma-s3-cdf-m1",
      "Which property is impossible for a cumulative distribution function?",
      "D",
      [
        "It approaches 1 as $x$ increases",
        "It can be constant over an interval",
        "Its values lie between 0 and 1",
        "It decreases from 0.8 to 0.6",
      ],
      "A cumulative total cannot lose probability as its boundary moves right.",
      "A CDF is non-decreasing, so it cannot fall from 0.8 to 0.6 as $x$ increases."
    ),
    rvAnswer(
      "ma-s3-cdf-m2",
      "Given $F(3)=0.18$ and $F(7)=0.76$, find $P(3<X\\le7)$.",
      "F(7)-F(3)",
      "0.58",
      ["58%", "29/50"],
      "Subtract the earlier accumulated probability from the later one.",
      "$P(3<X\\le7)=0.76-0.18=0.58$, the probability accumulated between the boundaries."
    ),
    rvAnswer(
      "ma-s3-cdf-m3",
      "Given $F(9)=0.83$, find $P(X>9)$.",
      "1-F(9)",
      "0.17",
      ["17%", "17/100"],
      "Use the complement of the cumulative probability.",
      "$P(X>9)=1-P(X\\le9)=1-0.83=0.17$."
    ),
    rvAnswer(
      "ma-s3-cdf-m4",
      "For $F(x)=x^3$ on $[0,1]$, find the 80th percentile to three decimal places.",
      "q^3=0.8",
      "0.928",
      ["0.9283", "cube root 0.8"],
      "Set the CDF equal to 0.8 and take the real cube root.",
      "$q=\\sqrt[3]{0.8}=0.928317\\ldots$, so the 80th percentile is $0.928$."
    ),
    rvChoice(
      "ma-s3-cdf-m5",
      "The median $m$ of a continuous distribution is best characterised by which equation?",
      "B",
      ["$f(m)=0.5$", "$F(m)=0.5$", "$F(m)=m$", "$f'(m)=0$"],
      "A median divides cumulative probability, not density height, in half.",
      "The median is the 50th percentile, so it solves $F(m)=P(X\\le m)=0.5$."
    ),
    rvAnswer(
      "ma-s3-cdf-m6",
      "A uniform delivery time is modelled on $[2,6]$. Find $P(X>5)$ from its CDF.",
      "F(5)=\\frac{5-2}{4}",
      "1/4",
      ["0.25", "25%"],
      "Find the cumulative probability to 5 and take its complement.",
      "$F(5)=3/4$, so $P(X>5)=1-3/4=1/4$.",
      { cartesianGraph: piecewiseLinearCdf }
    ),
    rvAnswer(
      "ma-s3-cdf-m7",
      "The CDF is $F(x)=1-e^{-0.2x}$ for $x\\ge0$. Find $P(X>10)$ to three decimal places.",
      "1-F(10)",
      "0.135",
      ["0.1353", "e^-2"],
      "The upper tail is the complement of the CDF; simplify before approximating.",
      "$P(X>10)=1-(1-e^{-2})=e^{-2}=0.135335\\ldots$, which rounds to $0.135$."
    ),
    rvChoice(
      "ma-s3-cdf-m8",
      "If a differentiable CDF is steepest near $x=6$, what does this suggest?",
      "A",
      [
        "The density is greatest near $x=6$",
        "The probability to the left of 6 is zero",
        "The CDF is invalid",
        "The median must equal 6",
      ],
      "Relate the gradient of the CDF to the pdf.",
      "Since $f(x)=F'(x)$, the steepest part of the CDF corresponds to the greatest density and hence a possible mode near 6."
    ),
    rvAnswer(
      "ma-s3-cdf-m9",
      "For $F(x)=x^2$ on $[0,1]$, find the interquartile range to three decimal places.",
      "IQR=q_{0.75}-q_{0.25}",
      "0.366",
      ["0.3660", "(sqrt(3)-1)/2"],
      "Solve $q_p^2=p$ separately for the first and third quartiles.",
      "$q_{0.75}=\\sqrt{0.75}=0.8660$ and $q_{0.25}=0.5$, so $IQR=0.3660\\approx0.366$."
    ),
    rvAnswer(
      "ma-s3-cdf-m10",
      "A reliability model has $F(100)=0.04$. In a batch of 500 independent items, estimate how many fail by 100 hours.",
      "500F(100)",
      "20",
      ["20 items"],
      "Interpret the CDF value as a proportion, then multiply by the batch size.",
      "The estimated number is $500(0.04)=20$, so about 20 items fail by 100 hours."
    ),
  ],
});

const standardNormalDiagram = {
  description:
    "Standard normal bell curve centred at zero, labelled in standard-deviation units, with markers at negative two, zero, one and two.",
  mean: 0,
  standardDeviation: 1,
  axisLabel: "z",
  xMin: -3.5,
  xMax: 3.5,
  showStandardDeviationLabels: true,
  shadedBands: [
    { standardDeviations: 2 as const, label: "central region", color: "green" as const },
    { standardDeviations: 1 as const, label: "within one SD", color: "blue" as const },
  ],
  markers: [
    { value: -2, label: "−2", zScore: -2 },
    { value: 0, label: "0", zScore: 0 },
    { value: 1, label: "1", zScore: 1 },
    { value: 2, label: "2", zScore: 2 },
  ],
};

const scoreNormalDiagram = {
  description:
    "Normal distribution of scores with mean fifty and standard deviation eight. A score of fifty-eight is marked one standard deviation above the mean.",
  mean: 50,
  standardDeviation: 8,
  axisLabel: "score",
  xMin: 20,
  xMax: 80,
  showStandardDeviationLabels: true,
  shadedBands: [
    { standardDeviations: 1 as const, label: "within one SD", color: "blue" as const },
  ],
  markers: [{ value: 58, label: "58", zScore: 1 }],
};

const normalCalculationWorkedExamples: WorkedExample[] = [
  {
    title: "Read a cumulative probability from a standard-normal table",
    questionLatex: "\\text{Find }P(Z<1.32).",
    steps: [
      {
        explanation:
          "Confirm that the table or technology reports left-tail cumulative probability $\\Phi(z)=P(Z\\le z)$.",
        latex: "\\Phi(1.32)=0.9066",
      },
      {
        explanation:
          "The event is already a left tail, so no complement or subtraction is needed.",
        latex: "P(Z<1.32)=0.9066",
      },
      {
        explanation:
          "Interpret the area: about 90.66% of standard-normal values lie below 1.32.",
        latex: "0.9066=90.66\\%",
      },
    ],
    finalAnswerLatex: "P(Z<1.32)=0.9066",
    normalDistributionDiagram: standardNormalDiagram,
  },
  {
    title: "Standardise a raw value and find an upper tail",
    questionLatex:
      "X\\sim N(50,8^2).\\quad\\text{Find }P(X>58).",
    steps: [
      {
        explanation:
          "Translate the raw boundary into standard-deviation units using the population parameters.",
        latex: "z=\\frac{58-50}{8}=1",
      },
      {
        explanation:
          "Technology or a cumulative table gives the area to the left of 1.",
        latex: "\\Phi(1)=0.8413",
      },
      {
        explanation:
          "The question asks for the upper tail, so take the complement.",
        latex: "P(X>58)=1-0.8413=0.1587",
      },
    ],
    finalAnswerLatex: "P(X>58)=0.1587",
    normalDistributionDiagram: scoreNormalDiagram,
  },
  {
    title: "Find a raw quantile for the top ten per cent",
    questionLatex:
      "X\\sim N(65,12^2).\\quad\\text{Find the minimum score in the top }10\\%.",
    steps: [
      {
        explanation:
          "Top 10% means 90% lies below the cutoff, so use the 0.90 standard-normal quantile.",
        latex: "P(Z<z)=0.90\\quad\\Rightarrow\\quad z\\approx1.2816",
      },
      {
        explanation:
          "Undo standardisation to return from the z-scale to the score scale.",
        latex: "x=\\mu+z\\sigma=65+1.2816(12)",
      },
      {
        explanation:
          "Calculate and state the practical cutoff with sensible rounding.",
        latex: "x\\approx80.38\\quad\\text{so a whole-number cutoff is }81",
      },
    ],
    finalAnswerLatex: "x\\approx80.4\\text{, or }81\\text{ for whole-number scores}",
    normalDistributionDiagram: {
      description:
        "Normal score distribution centred at 65 with standard deviation 12. The cutoff 80.4 is marked at z approximately 1.28, leaving ten percent above.",
      mean: 65,
      standardDeviation: 12,
      axisLabel: "score",
      showStandardDeviationLabels: true,
      markers: [{ value: 80.38, label: "top 10% cutoff", zScore: 1.2816 }],
    },
  },
];

export const standardNormalProbabilitiesQuantilesLesson = maS3Lesson({
  id: "standard-normal-probabilities-quantiles",
  slug: "standard-normal-probabilities-quantiles",
  title: "Standard Normal Probabilities and Quantiles",
  description:
    "Standardise normal variables, use tables or technology for probabilities, and reverse the process to calculate quantiles.",
  syllabusReferences: ["MA-S3.2"],
  syllabusContent: [
    "Use the normal density with parameters μ and σ and identify the standard normal distribution",
    "Standardise values with z=(x−μ)/σ and interpret z-scores",
    "Calculate normal probabilities for less, greater, between and more-extreme events",
    "Use standard-normal tables or technology to calculate probabilities",
    "Calculate normal-distribution quantiles, including cutoffs for upper percentages",
    "Make judgments from normal-distribution calculations in context",
  ],
  video: {
    title: "Standard Normal Probabilities and Quantiles",
    url: "/videos/placeholder-lesson.mp4",
  },
  learningIntention:
    "Translate between raw values and the standard-normal scale to calculate probabilities, percentiles and decision cutoffs.",
  successCriteria: [
    "Write and interpret $X\\sim N(\\mu,\\sigma^2)$ and the standard normal model.",
    "Standardise a raw value and interpret the sign and magnitude of its z-score.",
    "Use cumulative tables or technology for left, right and between probabilities.",
    "Calculate the probability of a value being more extreme than a given z-score.",
    "Use an inverse-normal calculation and transform the result into a raw quantile.",
  ],
  teaching: {
    paragraphs: [
      "Every normal model has the same bell shape after its horizontal scale is measured in standard deviations. Writing $X\\sim N(\\mu,\\sigma^2)$ records the population mean and variance; the associated density is centred at $\\mu$ and has total area 1.",
      "Standardising subtracts the centre and divides by the spread. The transformed variable $Z$ has mean 0 and standard deviation 1, allowing one cumulative table or technology command to answer probability questions for every normal distribution.",
      "Most tables report $\\Phi(z)=P(Z\\le z)$, the area to the left. A right tail needs the complement $1-\\Phi(z)$, while an interval needs the subtraction $\\Phi(b)-\\Phi(a)$; a quick shaded sketch is a reliable way to choose the operation.",
      "‘More extreme’ is a two-tail idea when distance from the mean matters. For a symmetric standard normal, $P(|Z|>|z|)=2[1-\\Phi(|z|)]$, whereas a directional claim such as ‘higher than’ uses only one tail.",
      "A quantile reverses the probability calculation. First translate wording such as ‘top 10%’ into the left-tail area 0.90, obtain the corresponding z-value with a table or inverse-normal technology, then use $x=\\mu+z\\sigma$ and interpret the cutoff in context.",
    ],
    latexBlocks: [
      "X\\sim N(\\mu,\\sigma^2),\\qquad f(x)=\\frac1{\\sigma\\sqrt{2\\pi}}e^{-\\frac12\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}",
      "Z=\\frac{X-\\mu}{\\sigma}\\sim N(0,1),\\qquad X=\\mu+Z\\sigma",
      "\\Phi(z)=P(Z\\le z),\\quad P(Z>z)=1-\\Phi(z)",
      "P(a<Z<b)=\\Phi(b)-\\Phi(a),\\quad P(|Z|>c)=2[1-\\Phi(c)]",
    ],
  },
  workedExamples: normalCalculationWorkedExamples,
  guidedPractice: [
    rvAnswer(
      "ma-s3-normal-g1",
      "Find the z-score of $x=85$ when $X\\sim N(70,10^2)$.",
      "z=\\frac{85-70}{10}",
      "1.5",
      ["z=1.5"],
      "Subtract the population mean, then divide by the population standard deviation.",
      "$z=(85-70)/10=1.5$, so the value is 1.5 standard deviations above the mean."
    ),
    rvChoice(
      "ma-s3-normal-g2",
      "A cumulative standard-normal table gives $\\Phi(1.32)=0.9066$. What is $P(Z<1.32)$?",
      "D",
      ["0.0934", "0.4066", "1.2266", "0.9066"],
      "The event matches the cumulative left-tail definition exactly.",
      "Because $\\Phi(z)=P(Z\\le z)$, the supplied value directly gives $P(Z<1.32)=0.9066$."
    ),
    rvAnswer(
      "ma-s3-normal-g3",
      "Given $\\Phi(1)=0.8413$, find $P(Z>1)$.",
      "1-\\Phi(1)",
      "0.1587",
      ["15.87%"],
      "A right-tail probability is the complement of the cumulative left tail.",
      "$P(Z>1)=1-0.8413=0.1587$, so about 15.87% lies above one standard deviation."
    ),
    rvAnswer(
      "ma-s3-normal-g4",
      "The 90th percentile of $Z$ is $1.2816$. Find the 90th percentile of $X\\sim N(50,8^2)$.",
      "x=50+1.2816(8)",
      "60.25",
      ["60.3", "60.2528"],
      "Undo standardisation with $x=\\mu+z\\sigma$.",
      "$x=50+1.2816(8)=60.2528$, which is $60.25$ to two decimal places."
    ),
  ],
  independentPractice: [
    rvAnswer(
      "ma-s3-normal-i1",
      "Given $\\Phi(1.5)=0.9332$ and $\\Phi(-0.5)=0.3085$, find $P(-0.5<Z<1.5)$.",
      "\\Phi(1.5)-\\Phi(-0.5)",
      "0.6247",
      ["62.47%"],
      "Subtract the smaller cumulative area from the larger one.",
      "$P(-0.5<Z<1.5)=0.9332-0.3085=0.6247$."
    ),
    rvAnswer(
      "ma-s3-normal-i2",
      "Heights satisfy $X\\sim N(170,8^2)$. Find $P(X<154)$, given $\\Phi(-2)=0.0228$.",
      "z=\\frac{154-170}{8}",
      "0.0228",
      ["2.28%"],
      "Standardise 154, then use the matching cumulative probability.",
      "$z=-2$, so $P(X<154)=P(Z<-2)=0.0228$, or about 2.28%."
    ),
    rvAnswer(
      "ma-s3-normal-i3",
      "A student scores 72 where $\\mu=60,\\sigma=8$, and 80 where $\\mu=75,\\sigma=6$. Which result is stronger relative to its cohort?",
      "z_1=\\frac{72-60}{8},\\quad z_2=\\frac{80-75}{6}",
      "first",
      ["first result", "72", "first, because 1.5>0.833"],
      "Calculate both z-scores and compare their relative positions.",
      "$z_1=1.5$ and $z_2=0.833\\ldots$, so the first result is further above its cohort mean."
    ),
    rvAnswer(
      "ma-s3-normal-i4",
      "Scores satisfy $X\\sim N(65,12^2)$. Find the minimum whole-number score in the top 10%, using $z_{0.90}=1.2816$.",
      "x=65+1.2816(12)",
      "81",
      ["81 marks"],
      "Find the continuous cutoff, then round upward because a score must meet or exceed it.",
      "The cutoff is $80.3792$; therefore the minimum whole-number score in the top 10% is 81."
    ),
    rvChoice(
      "ma-s3-normal-i5",
      "For a standard normal variable, which expression gives the probability of being more extreme than $z=2$ in either direction?",
      "C",
      [
        "$1-\\Phi(2)$",
        "$2\\Phi(2)$",
        "$2[1-\\Phi(2)]$",
        "$\\Phi(2)-0.5$",
      ],
      "The phrase ‘either direction’ requires two symmetric tails.",
      "The upper tail beyond 2 is $1-\\Phi(2)$ and symmetry gives an equal lower tail, so double it."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using sample notation $\\bar{x}$ and $s$ as the parameters of a stated normal model.",
      fix: "A distribution model uses population parameters $\\mu$ and $\\sigma$; reserve $\\bar{x}$ and $s$ for statistics calculated from a sample.",
    },
    {
      mistake: "Reading every table value as a right-tail probability.",
      fix: "Check the table heading. If it reports $\\Phi(z)=P(Z\\le z)$, take a complement for a right tail.",
    },
    {
      mistake: "Using 0.10 as the cumulative area for a top-10% cutoff.",
      fix: "Top 10% leaves 90% below the boundary, so use the left-tail quantile 0.90.",
    },
    {
      mistake: "Doubling a probability whenever the normal curve is symmetric.",
      fix: "Double only for a two-sided event such as ‘more extreme in either direction’; directional upper or lower tails remain one-sided.",
    },
  ],
  masteryQuiz: [
    rvChoice(
      "ma-s3-normal-m1",
      "In $X\\sim N(40,6^2)$, what does the second parameter $6^2$ represent?",
      "B",
      ["The mean", "The variance", "The standard deviation", "The median"],
      "Use the convention $N(\\mu,\\sigma^2)$.",
      "Normal notation lists the mean first and the variance second, so $6^2=36$ is the variance and $\\sigma=6$."
    ),
    rvAnswer(
      "ma-s3-normal-m2",
      "Find $P(Z<-2)$, given $\\Phi(2)=0.9772$.",
      "P(Z<-2)=1-\\Phi(2)",
      "0.0228",
      ["2.28%"],
      "Use symmetry to match the lower tail below −2 with the upper tail above 2.",
      "$P(Z<-2)=P(Z>2)=1-0.9772=0.0228$."
    ),
    rvAnswer(
      "ma-s3-normal-m3",
      "Find $P(-1<Z<1)$, given $\\Phi(1)=0.8413$ and $\\Phi(-1)=0.1587$.",
      "\\Phi(1)-\\Phi(-1)",
      "0.6826",
      ["68.26%"],
      "Subtract the cumulative area at the left boundary from that at the right boundary.",
      "$P(-1<Z<1)=0.8413-0.1587=0.6826$, consistent with the empirical rule."
    ),
    rvAnswer(
      "ma-s3-normal-m4",
      "Battery lives satisfy $X\\sim N(300,20^2)$. Find $P(X>340)$, given $\\Phi(2)=0.9772$.",
      "z=\\frac{340-300}{20}",
      "0.0228",
      ["2.28%"],
      "Standardise the boundary and take the upper-tail complement.",
      "$z=2$, so $P(X>340)=1-\\Phi(2)=1-0.9772=0.0228$."
    ),
    rvChoice(
      "ma-s3-normal-m5",
      "Which technology calculation finds the cutoff exceeded by 5% of a normal distribution?",
      "D",
      [
        "inverse normal with left area 0.05",
        "normal CDF with left area 0.05",
        "normal CDF with left area 0.95",
        "inverse normal with left area 0.95",
      ],
      "Convert ‘exceeded by 5%’ into the proportion below the cutoff.",
      "If 5% exceeds the cutoff then 95% lies below it, so use an inverse-normal calculation with left area 0.95."
    ),
    rvAnswer(
      "ma-s3-normal-m6",
      "IQ scores satisfy $X\\sim N(100,15^2)$. Find the 97.5th percentile using $z_{0.975}=1.960$.",
      "x=100+1.960(15)",
      "129.4",
      ["129.40"],
      "Transform the supplied standard-normal quantile back to the IQ scale.",
      "$x=100+1.960(15)=129.4$, so approximately 97.5% of scores lie at or below 129.4."
    ),
    rvAnswer(
      "ma-s3-normal-m7",
      "Given $\\Phi(1.5)=0.9332$, find $P(|Z|>1.5)$.",
      "2[1-\\Phi(1.5)]",
      "0.1336",
      ["13.36%"],
      "Absolute value greater than 1.5 describes both symmetric tails.",
      "$P(|Z|>1.5)=2(1-0.9332)=2(0.0668)=0.1336$."
    ),
    rvChoice(
      "ma-s3-normal-m8",
      "Two normal models have the same mean. Model A has $\\sigma=3$ and model B has $\\sigma=9$. Which statement is true?",
      "A",
      [
        "A is narrower and taller",
        "A is wider and flatter",
        "B has a larger total area",
        "B must have a different median",
      ],
      "Standard deviation changes spread, while every density keeps total area 1.",
      "The smaller standard deviation concentrates values closer to the mean, making model A narrower and taller; both areas remain 1."
    ),
    rvAnswer(
      "ma-s3-normal-m9",
      "Package masses satisfy $X\\sim N(500,4^2)$. Estimate the number below 492 g in a shipment of 2500, given $\\Phi(-2)=0.0228$.",
      "2500\\Phi(-2)",
      "57",
      ["57 packages"],
      "Find the expected count and round to a sensible whole package.",
      "$492$ has $z=-2$, so the expected count is $2500(0.0228)=57$ packages."
    ),
    rvAnswer(
      "ma-s3-normal-m10",
      "A cutoff is $x=74$ in $N(68,5^2)$. Find its percentile to two decimals if $\\Phi(1.2)=0.8849$.",
      "z=\\frac{74-68}{5}",
      "88.49%",
      ["0.8849", "88.49"],
      "Standardise the cutoff, then interpret the cumulative probability as a percentile.",
      "$z=1.2$ and $\\Phi(1.2)=0.8849$, so 74 is at approximately the 88.49th percentile."
    ),
  ],
});

export const year12AdvancedRandomVariablesLessons: ExplicitLesson[] = [
  continuousRandomVariablesPdfsLesson,
  cumulativeDistributionFunctionsPercentilesLesson,
  standardNormalProbabilitiesQuantilesLesson,
];
