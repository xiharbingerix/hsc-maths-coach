import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(id: string, prompt: string, latex: string, answer: string, acceptedAnswers: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(id: string, prompt: string, answer: string, choices: { label: string; text: string }[], explanation: string, latex?: string): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

// ─── L1: Continuous Random Variables ─────────────────────────────────────────

const crvWorked: WorkedExample[] = [
  {
    title: "A continuous RV X has pdf f(x) = kx on [0, 2]. Find k.",
    questionLatex: "f(x)=kx,\\quad 0\\leq x\\leq 2",
    steps: [
      { explanation: "The total area under the pdf must equal 1.", latex: "\\int_0^2 kx\\,dx=1" },
      { explanation: "Integrate.", latex: "k\\left[\\frac{x^2}{2}\\right]_0^2=k\\cdot 2=1" },
      { explanation: "Solve for k.", latex: "k=\\frac{1}{2}" },
    ],
    finalAnswerLatex: "k=\\tfrac{1}{2}",
  },
  {
    title: "Find P(1 ≤ X ≤ 2) for f(x) = (1/2)x on [0, 2].",
    questionLatex: "f(x)=\\tfrac{1}{2}x,\\quad P(1\\leq X\\leq 2)",
    steps: [
      { explanation: "Integrate f(x) over [1, 2].", latex: "P(1\\leq X\\leq 2)=\\int_1^2\\frac{x}{2}\\,dx" },
      { explanation: "Evaluate.", latex: "=\\left[\\frac{x^2}{4}\\right]_1^2=1-\\frac{1}{4}=\\frac{3}{4}" },
    ],
    finalAnswerLatex: "P(1\\leq X\\leq 2)=\\tfrac{3}{4}",
  },
];

const crvGuided: PracticeQuestion[] = [
  mc("y11adv-cp-crv-g1", "For a continuous random variable X, P(X = 3) equals:", "A",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$f(3)$" }, { label: "C", text: "$F(3)$" }, { label: "D", text: "undefined" }],
    "For a continuous distribution, the probability at a single point is always 0 — there is no area under a single point. Probabilities are computed over intervals only.", ""),
  fa("y11adv-cp-crv-g2", "f(x) = c on [0, 5] (uniform). Find c so that f is a valid pdf.", "\\int_0^5 c\\,dx=1", "c = 1/5", ["1/5"]),
  mc("y11adv-cp-crv-g3", "For a continuous pdf f(x) on [a, b], P(a ≤ X ≤ b) must equal:", "C",
    [{ label: "A", text: "$f(a) + f(b)$" }, { label: "B", text: "$b - a$" }, { label: "C", text: "$1$" }, { label: "D", text: "$0$" }],
    "The total area under any pdf must equal 1. This is the defining property: ∫f(x) dx = 1 over the entire range.", ""),
  fa("y11adv-cp-crv-g4", "f(x) = (3/4)(1−x²) on [−1, 1]. Verify this is a valid pdf.", "\\int_{-1}^{1}\\frac{3}{4}(1-x^2)\\,dx", "∫ = (3/4)[x - x³/3] from -1 to 1 = (3/4)(4/3) = 1 ✓", ["1"]),
];

const crvIndep: PracticeQuestion[] = [
  fa("y11adv-cp-crv-i1", "f(x) = kx² on [0, 3]. Find k.", "\\int_0^3 kx^2\\,dx=1", "k = 1/9", ["1/9"]),
  mc("y11adv-cp-crv-i2", "Why can f(x) > 1 at some point and still be a valid pdf?", "C",
    [{ label: "A", text: "It cannot — pdf values must be between 0 and 1" }, { label: "B", text: "Because some distributions are unbounded" }, { label: "C", text: "Because f(x) is a density, not a probability; only the area (integral) must equal 1" }, { label: "D", text: "f(x) > 1 means the distribution is invalid" }],
    "f(x) is a probability density, not a probability. The area under the curve must equal 1, but the height f(x) can exceed 1 as long as the interval over which it exceeds 1 is narrow enough.", ""),
  fa("y11adv-cp-crv-i3", "f(x) = (1/2)x on [0, 2]. Find P(0 ≤ X ≤ 1).", "\\int_0^1\\frac{x}{2}\\,dx", "P = 1/4", ["1/4"]),
  mc("y11adv-cp-crv-i4", "For a uniform distribution on [2, 7], f(x) equals:", "B",
    [{ label: "A", text: "$1/2$" }, { label: "B", text: "$1/5$" }, { label: "C", text: "$1/7$" }, { label: "D", text: "$5$" }],
    "Uniform on [a, b]: f(x) = 1/(b−a). Here f(x) = 1/(7−2) = 1/5.", ""),
  fa("y11adv-cp-crv-i5", "X is uniform on [0, 10]. Find P(3 < X < 7).", "", "P = (7−3)/10 = 4/10 = 0.4", ["0.4", "2/5"]),
];

const crvMastery: PracticeQuestion[] = [
  fa("y11adv-cp-crv-m1", "f(x) = 2e^(−2x) for x ≥ 0. Verify ∫₀^∞ f(x) dx = 1.", "\\int_0^\\infty 2e^{-2x}\\,dx", "= [-e^{-2x}]₀^∞ = 0 − (−1) = 1 ✓", ["1"]),
  mc("y11adv-cp-crv-m2", "If X has pdf f(x) on [0, 4], then P(X > 3) equals:", "C",
    [{ label: "A", text: "$f(3)$" }, { label: "B", text: "$1 - f(3)$" }, { label: "C", text: "$\\int_3^4 f(x)\\,dx$" }, { label: "D", text: "$4 - 3$" }],
    "P(X > 3) = ∫₃⁴ f(x) dx. It is the area under the pdf from 3 to the upper bound.", ""),
  fa("y11adv-cp-crv-m3", "f(x) = k(4−x) on [0, 4]. Find k and P(X > 2).", "\\int_0^4 k(4-x)\\,dx=1", "k = 1/8; P(X>2) = ∫₂⁴ (4-x)/8 dx = 1/4", ["k=1/8; P=1/4"]),
  mc("y11adv-cp-crv-m4", "The cumulative distribution function F(x) = P(X ≤ x) is found by:", "B",
    [{ label: "A", text: "$F(x) = f(x)$" }, { label: "B", text: "$F(x) = \\int_{-\\infty}^x f(t)\\,dt$" }, { label: "C", text: "$F(x) = f'(x)$" }, { label: "D", text: "$F(x) = \\int_x^\\infty f(t)\\,dt$" }],
    "The CDF gives the probability up to x. It is the integral of f from the left boundary to x. Note: F'(x) = f(x) — the pdf is the derivative of the CDF.", ""),
  fa("y11adv-cp-crv-m5", "X is uniform on [3, 9]. Find the mean μ and variance σ².", "\\mu=(a+b)/2,\\;\\sigma^2=(b-a)^2/12", "μ = 6; σ² = 3", ["μ=6; σ²=3"]),
  mc("y11adv-cp-crv-m6", "A pdf must satisfy which TWO conditions?", "C",
    [{ label: "A", text: "$f(x) \\geq 0$ and $f(x) \\leq 1$ everywhere" }, { label: "B", text: "$f(x) > 0$ everywhere and $\\int f(x)\\,dx = 1$" }, { label: "C", text: "$f(x) \\geq 0$ everywhere and $\\int f(x)\\,dx = 1$" }, { label: "D", text: "$f(x) = 1$ somewhere and $\\int f(x)\\,dx = 1$" }],
    "A valid pdf requires: (1) f(x) ≥ 0 everywhere (no negative density), and (2) total area = 1. There is no requirement that f(x) ≤ 1.", ""),
  fa("y11adv-cp-crv-m7", "f(x) = 3x² on [0, 1]. Find the median m (where P(X ≤ m) = 0.5).", "\\int_0^m 3x^2\\,dx=0.5", "m³ = 0.5, so m = (1/2)^(1/3) ≈ 0.794", ["0.794", "(0.5)^(1/3)"]),
  mc("y11adv-cp-crv-m8", "For a continuous RV, P(a < X < b) equals P(a ≤ X ≤ b) because:", "A",
    [{ label: "A", text: "Including or excluding endpoints makes no difference — single points have probability 0" }, { label: "B", text: "The CDF is continuous" }, { label: "C", text: "The pdf is bounded" }, { label: "D", text: "This is only true for uniform distributions" }],
    "For a continuous distribution, P(X = a) = 0 and P(X = b) = 0. Adding or removing zero-probability points doesn't change the interval probability.", ""),
];

// ─── L2: The Normal Distribution ──────────────────────────────────────────────

const ndWorked: WorkedExample[] = [
  {
    title: "Describe the key features of a normal distribution with μ = 50 and σ = 5.",
    questionLatex: "X\\sim N(50,\\,5^2)",
    steps: [
      { explanation: "The distribution is bell-shaped and symmetric about the mean μ = 50.", latex: "" },
      { explanation: "68% of values fall within 1σ: between 45 and 55.", latex: "\\mu\\pm\\sigma=(45,55)" },
      { explanation: "95% fall within 2σ: between 40 and 60.", latex: "\\mu\\pm2\\sigma=(40,60)" },
      { explanation: "99.7% fall within 3σ: between 35 and 65.", latex: "\\mu\\pm3\\sigma=(35,65)" },
    ],
    finalAnswerLatex: "68\\%,\\;95\\%,\\;99.7\\%\\text{ rules}",
  },
  {
    title: "Heights are normally distributed with μ = 170 cm and σ = 8 cm. What % of people are between 154 cm and 186 cm?",
    questionLatex: "X\\sim N(170,\\,8^2),\\;P(154<X<186)",
    steps: [
      { explanation: "154 = 170 − 2(8) = μ − 2σ; 186 = 170 + 2(8) = μ + 2σ.", latex: "" },
      { explanation: "The interval (μ−2σ, μ+2σ) contains 95% of the distribution.", latex: "P(154<X<186)=95\\%" },
    ],
    finalAnswerLatex: "95\\%",
  },
];

const ndGuided: PracticeQuestion[] = [
  mc("y11adv-cp-nd-g1", "The normal distribution is symmetric about:", "B",
    [{ label: "A", text: "The standard deviation" }, { label: "B", text: "The mean" }, { label: "C", text: "Zero always" }, { label: "D", text: "The variance" }],
    "The normal distribution is perfectly symmetric about the mean μ. For a normal distribution, mean = median = mode all coincide. It is NOT necessarily centred at zero (only the standard normal Z is), and symmetry is about the mean, not the SD or variance.", ""),
  fa("y11adv-cp-nd-g2", "X ~ N(100, 15²). What interval contains 68% of values?", "\\mu\\pm\\sigma", "85 to 115", ["85 to 115", "(85, 115)"]),
  mc("y11adv-cp-nd-g3", "For X ~ N(μ, σ²), approximately what percentage of values lie within 3 standard deviations of the mean?", "D",
    [{ label: "A", text: "$68\\%$" }, { label: "B", text: "$90\\%$" }, { label: "C", text: "$95\\%$" }, { label: "D", text: "$99.7\\%$" }],
    "The empirical rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ.", ""),
  fa("y11adv-cp-nd-g4", "Test scores are N(72, 10²). What percentage score below 52 or above 92?", "52=\\mu-2\\sigma,\\;92=\\mu+2\\sigma", "5% (100% − 95%)", ["5%"]),
];

const ndIndep: PracticeQuestion[] = [
  fa("y11adv-cp-nd-i1", "X ~ N(50, 4²). Find P(42 < X < 58).", "42=50-2\\sigma,\\;58=50+2\\sigma", "95%", ["95%"]),
  mc("y11adv-cp-nd-i2", "Which best describes the shape of a normal distribution?", "C",
    [{ label: "A", text: "Skewed right with a long right tail" }, { label: "B", text: "Uniform (flat)" }, { label: "C", text: "Symmetric, bell-shaped, with tails extending to ±∞" }, { label: "D", text: "Triangular" }],
    "The normal distribution is the classic bell curve: symmetric, unimodal (one peak at the mean), and theoretically extending to ±∞ (but effectively all values within ≈3σ of the mean).", ""),
  fa("y11adv-cp-nd-i3", "Rainfall is N(600 mm, 80²). Find the interval containing the middle 99.7% of years.", "\\mu\\pm3\\sigma=600\\pm240", "360 mm to 840 mm", ["360 to 840"]),
  mc("y11adv-cp-nd-i4", "Increasing σ while keeping μ fixed will:", "B",
    [{ label: "A", text: "Shift the bell curve to the right" }, { label: "B", text: "Make the bell curve wider and flatter" }, { label: "C", text: "Make the bell curve taller and narrower" }, { label: "D", text: "Have no effect on the shape" }],
    "σ controls the spread. Larger σ → wider, flatter bell (more data far from the mean). Smaller σ → narrower, taller bell (data clustered close to the mean).", ""),
  mc("y11adv-cp-nd-i5", "X ~ N(30, 6²). What % of X values exceed 42?", "C",
    [{ label: "A", text: "$16\\%$" }, { label: "B", text: "$5\\%$" }, { label: "C", text: "$2.5\\%$" }, { label: "D", text: "$0.15\\%$" }],
    "42 = 30 + 2(6) = μ + 2σ. By symmetry, 5% of values lie outside (μ−2σ, μ+2σ). Half of that (2.5%) lies above μ + 2σ = 42.", ""),
];

const ndMastery: PracticeQuestion[] = [
  fa("y11adv-cp-nd-m1", "X ~ N(80, 10²). Find P(60 < X < 110) using the empirical rule.", "60=\\mu-2\\sigma,\\;110=\\mu+3\\sigma", "P = 95%/2 + 99.7%/2 = 47.5% + 49.85% = 97.35%", ["97.35%"]),
  mc("y11adv-cp-nd-m2", "For X ~ N(μ, σ²), P(X < μ) equals:", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$0.5$" }, { label: "C", text: "$\\sigma$" }, { label: "D", text: "depends on μ" }],
    "By symmetry, exactly half the distribution lies below the mean and half above. P(X < μ) = 0.5 for any normal distribution.", ""),
  fa("y11adv-cp-nd-m3", "N(μ=200, σ=25). What value is exceeded by only 0.15% of the distribution?", "\\mu+3\\sigma", "275", ["275"]),
  mc("y11adv-cp-nd-m4", "Two data sets both follow a normal distribution. Set A has σ = 2; Set B has σ = 8. Which has more data close to its mean?", "A",
    [{ label: "A", text: "Set A (smaller σ means tighter clustering)" }, { label: "B", text: "Set B (larger σ means more data)" }, { label: "C", text: "Both have the same concentration near the mean" }, { label: "D", text: "Cannot tell without knowing the means" }],
    "σ measures spread. Smaller σ → tighter clustering around the mean → more values close to μ. Set A (σ = 2) has 68% of values within 2 units of the mean; Set B only within 8 units.", ""),
  fa("y11adv-cp-nd-m5", "Lifetimes of batteries: N(300 hours, 20²). Find the proportion lasting between 260 and 340 hours.", "260=300-2\\sigma,\\;340=300+2\\sigma", "95%", ["95%"]),
  mc("y11adv-cp-nd-m6", "Which statement about the normal distribution is FALSE?", "D",
    [{ label: "A", text: "Mean = Median = Mode" }, { label: "B", text: "The total area under the curve is 1" }, { label: "C", text: "The curve is symmetric about the mean" }, { label: "D", text: "All normal distributions have μ = 0 and σ = 1" }],
    "Only the STANDARD normal distribution has μ = 0 and σ = 1. A general normal distribution N(μ, σ²) can have any mean and positive standard deviation.", ""),
  fa("y11adv-cp-nd-m7", "N(50, 5²). What % of values are between 45 and 55, given the 68% rule?", "45=\\mu-\\sigma,\\;55=\\mu+\\sigma", "68%", ["68%"]),
  mc("y11adv-cp-nd-m8", "The tails of a normal distribution are 'asymptotic to the x-axis'. This means:", "B",
    [{ label: "A", text: "The distribution has a finite maximum value" }, { label: "B", text: "The curve approaches but never touches the x-axis as x → ±∞" }, { label: "C", text: "There is a definite cutoff beyond 3 standard deviations" }, { label: "D", text: "The probability is zero beyond ±3σ" }],
    "Asymptotic means the curve gets arbitrarily close to zero but never reaches it. In theory, a normal distribution assigns non-zero probability to every real number — the probability just becomes negligibly small beyond ±3σ.", ""),
];

// ─── L3: z-Scores and Standardising ──────────────────────────────────────────

const zsWorked: WorkedExample[] = [
  {
    title: "Find the z-score for X = 85 in a N(70, 10²) distribution.",
    questionLatex: "X=85,\\;\\mu=70,\\;\\sigma=10",
    steps: [
      { explanation: "Apply the z-score formula.", latex: "z=\\frac{X-\\mu}{\\sigma}=\\frac{85-70}{10}=1.5" },
      { explanation: "Interpret: X = 85 is 1.5 standard deviations above the mean.", latex: "" },
    ],
    finalAnswerLatex: "z=1.5",
  },
  {
    title: "A student scores 72 in Maths (class: μ=60, σ=8) and 80 in English (class: μ=75, σ=6). Which is the better result relative to the class?",
    questionLatex: "\\text{Maths: }x=72,\\mu=60,\\sigma=8;\\quad\\text{English: }x=80,\\mu=75,\\sigma=6",
    steps: [
      { explanation: "z-score for Maths.", latex: "z_M=\\frac{72-60}{8}=1.5" },
      { explanation: "z-score for English.", latex: "z_E=\\frac{80-75}{6}=0.83" },
      { explanation: "Maths z = 1.5 > English z = 0.83, so the Maths result is better relative to the class.", latex: "" },
    ],
    finalAnswerLatex: "\\text{Maths is better (higher z)}",
  },
];

const zsGuided: PracticeQuestion[] = [
  fa("y11adv-cp-zs-g1", "Find the z-score for X = 45 in a N(50, 5²) distribution.", "z=(X-\\mu)/\\sigma", "z = −1", ["-1"]),
  mc("y11adv-cp-zs-g2", "A z-score of 2.3 means the value is:", "C",
    [{ label: "A", text: "2.3 units above the mean" }, { label: "B", text: "2.3 times the mean" }, { label: "C", text: "2.3 standard deviations above the mean" }, { label: "D", text: "In the top 2.3%" }],
    "z = (X − μ)/σ measures the number of standard deviations from the mean. z = 2.3 means 2.3 standard deviations above (positive z) the mean.", ""),
  fa("y11adv-cp-zs-g3", "X has μ = 100 and σ = 15. If z = −2, find X.", "X=\\mu+z\\sigma", "X = 70", ["70"]),
  mc("y11adv-cp-zs-g4", "Two students each have z = 1.5 in different tests. This means:", "B",
    [{ label: "A", text: "They scored the same mark" }, { label: "B", text: "They each scored 1.5 standard deviations above their respective class means" }, { label: "C", text: "They are in the same percentile of the same distribution" }, { label: "D", text: "Their scores are identical after standardising" }],
    "z = 1.5 means 1.5 SDs above the mean, regardless of the actual mean or SD of the distribution. The same z-score in two different distributions means the same relative performance — but not necessarily the same actual score.", ""),
];

const zsIndep: PracticeQuestion[] = [
  fa("y11adv-cp-zs-i1", "X ~ N(200, 30²). Find z if X = 245.", "z=(245-200)/30", "z = 1.5", ["1.5"]),
  mc("y11adv-cp-zs-i2", "For a standard normal Z ~ N(0, 1), P(Z < 0) =", "B",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$0.5$" }, { label: "C", text: "$1$" }, { label: "D", text: "undefined" }],
    "The standard normal is symmetric about 0. P(Z < 0) = P(Z > 0) = 0.5.", ""),
  fa("y11adv-cp-zs-i3", "Heights are N(175, 7²). A man is 189 cm. Find his z-score.", "z=(189-175)/7", "z = 2", ["2"]),
  mc("y11adv-cp-zs-i4", "Which z-score corresponds to the highest relative performance?", "D",
    [{ label: "A", text: "$z = -0.5$" }, { label: "B", text: "$z = 0$" }, { label: "C", text: "$z = 1.2$" }, { label: "D", text: "$z = 2.8$" }],
    "Higher z-score = more standard deviations above the mean = better relative performance (assuming higher score is better). z = 2.8 is highest here.", ""),
  fa("y11adv-cp-zs-i5", "Two tests: Test A (μ=60, σ=10, score=75) and Test B (μ=80, σ=6, score=92). Compare relative performance.", "z_A=(75-60)/10,\\;z_B=(92-80)/6", "zA=1.5; zB=2.0. Test B is better relative to class.", ["Test B better; zA=1.5, zB=2.0"]),
];

const zsMastery: PracticeQuestion[] = [
  fa("y11adv-cp-zs-m1", "X ~ N(50, 8²). Find X when z = −1.5.", "X=\\mu+z\\sigma=50+(-1.5)(8)", "X = 38", ["38"]),
  mc("y11adv-cp-zs-m2", "Standardising transforms X ~ N(μ, σ²) to Z ~ N(0, 1). The transformation is:", "B",
    [{ label: "A", text: "$Z = X + \\mu - \\sigma$" }, { label: "B", text: "$Z = (X - \\mu)/\\sigma$" }, { label: "C", text: "$Z = \\sigma(X - \\mu)$" }, { label: "D", text: "$Z = X/\\sigma$" }],
    "Standardising subtracts the mean (centres at 0) then divides by the standard deviation (scales to unit spread). Result: Z = (X − μ)/σ ~ N(0, 1).", ""),
  fa("y11adv-cp-zs-m3", "A factory produces bolts with diameter N(10 mm, 0.1²). A bolt is accepted if its z-score is between −2 and 2. Find the acceptance range.", "X=\\mu\\pm2\\sigma", "9.8 mm to 10.2 mm", ["9.8 to 10.2"]),
  mc("y11adv-cp-zs-m4", "P(−1 < Z < 1) for the standard normal is approximately:", "C",
    [{ label: "A", text: "$50\\%$" }, { label: "B", text: "$75\\%$" }, { label: "C", text: "$68\\%$" }, { label: "D", text: "$95\\%$" }],
    "By the empirical rule, 68% of values lie within 1 standard deviation of the mean. For Z ~ N(0,1), this means P(−1 < Z < 1) ≈ 0.68.", ""),
  fa("y11adv-cp-zs-m5", "Test scores N(65, 12²). What score corresponds to z = 1.25?", "X=65+1.25\\times12", "X = 80", ["80"]),
  mc("y11adv-cp-zs-m6", "A negative z-score means:", "A",
    [{ label: "A", text: "The value is below the mean" }, { label: "B", text: "The value is impossible" }, { label: "C", text: "The distribution is negatively skewed" }, { label: "D", text: "The standard deviation is negative" }],
    "z = (X − μ)/σ. If X < μ, then X − μ < 0, and since σ > 0, z < 0. A negative z-score simply means the value is below the mean.", ""),
  fa("y11adv-cp-zs-m7", "N(μ, σ²). If the value at z = 2 is 84 and z = −1 is 66, find μ and σ.", "\\mu+2\\sigma=84,\\;\\mu-\\sigma=66", "σ = 6; μ = 72", ["σ=6, μ=72"]),
  mc("y11adv-cp-zs-m8", "Using z-scores to compare results from different tests is valid because:", "C",
    [{ label: "A", text: "All tests have the same mean" }, { label: "B", text: "z-scores remove all differences between tests" }, { label: "C", text: "z-scores express results in units of standard deviation, making different distributions comparable on the same scale" }, { label: "D", text: "z-scores are percentiles" }],
    "Standardising translates raw scores into 'how many SDs above/below the mean' — a scale that is identical across different normal distributions. This makes relative comparisons meaningful even when means and SDs differ.", ""),
];

// ─── L4: Using Normal Tables ──────────────────────────────────────────────────

const ntWorked: WorkedExample[] = [
  {
    title: "Find P(Z < 1.32) using the standard normal table.",
    questionLatex: "P(Z<1.32)",
    steps: [
      { explanation: "Look up z = 1.32 in the standard normal table (cumulative from left).", latex: "P(Z<1.32)=0.9066" },
      { explanation: "Interpret: about 90.66% of a normal distribution lies below z = 1.32.", latex: "" },
    ],
    finalAnswerLatex: "P(Z<1.32)=0.9066",
  },
  {
    title: "X ~ N(50, 8²). Find P(X > 58) using z-scores and the standard normal table.",
    questionLatex: "X\\sim N(50,8^2),\\;P(X>58)",
    steps: [
      { explanation: "Convert to z-score.", latex: "z=\\frac{58-50}{8}=1" },
      { explanation: "P(X > 58) = P(Z > 1) = 1 − P(Z < 1).", latex: "P(Z<1)=0.8413" },
      { explanation: "Final answer.", latex: "P(X>58)=1-0.8413=0.1587" },
    ],
    finalAnswerLatex: "P(X>58)=0.1587\\;(15.87\\%)",
  },
];

const ntGuided: PracticeQuestion[] = [
  mc("y11adv-cp-nt-g1", "P(Z < −1.5) equals:", "B",
    [{ label: "A", text: "$0.9332$" }, { label: "B", text: "$0.0668$" }, { label: "C", text: "$0.5$" }, { label: "D", text: "$-0.9332$" }],
    "P(Z < −1.5) = 1 − P(Z < 1.5) = 1 − 0.9332 = 0.0668. By symmetry of the normal distribution.", ""),
  fa("y11adv-cp-nt-g2", "Using tables: P(0 < Z < 1.5) = P(Z < 1.5) − P(Z < 0) = 0.9332 − 0.5. Evaluate.", "P(0<Z<1.5)", "0.4332", ["0.4332"]),
  mc("y11adv-cp-nt-g3", "To find P(a < Z < b), you compute:", "B",
    [{ label: "A", text: "$P(Z < a) + P(Z < b)$" }, { label: "B", text: "$P(Z < b) - P(Z < a)$" }, { label: "C", text: "$P(Z > b) - P(Z > a)$" }, { label: "D", text: "$P(Z < a) \\times P(Z < b)$" }],
    "The area between a and b equals the cumulative area up to b minus the cumulative area up to a. P(a < Z < b) = Φ(b) − Φ(a).", ""),
  fa("y11adv-cp-nt-g4", "Weights are N(68 kg, 9²). Find P(weight < 50 kg) using z = (50−68)/9 ≈ −2.0.", "z=(50-68)/9", "P ≈ 0.0228 (2.28%)", ["0.0228", "2.28%"]),
];

const ntIndep: PracticeQuestion[] = [
  fa("y11adv-cp-nt-i1", "P(Z < 2.05) from tables. Interpret the result.", "P(Z<2.05)", "≈0.9798; about 97.98% of values are below z = 2.05", ["0.9798"]),
  mc("y11adv-cp-nt-i2", "P(Z > 1.65) equals:", "B",
    [{ label: "A", text: "$0.9505$" }, { label: "B", text: "$0.0495$" }, { label: "C", text: "$0.5$" }, { label: "D", text: "$-0.0495$" }],
    "P(Z > 1.65) = 1 − P(Z < 1.65) = 1 − 0.9505 = 0.0495.", ""),
  fa("y11adv-cp-nt-i3", "X ~ N(100, 15²). Find P(85 < X < 115) via z-scores.", "z_1=(85-100)/15=-1,\\;z_2=(115-100)/15=1", "P(−1<Z<1) = 0.8413−0.1587 = 0.6826 ≈ 68%", ["0.6826", "68%"]),
  mc("y11adv-cp-nt-i4", "P(−1.96 < Z < 1.96) is approximately:", "C",
    [{ label: "A", text: "$68\\%$" }, { label: "B", text: "$90\\%$" }, { label: "C", text: "$95\\%$" }, { label: "D", text: "$99.7\\%$" }],
    "P(−1.96 < Z < 1.96) ≈ 0.95. The value z = 1.96 is the 97.5th percentile, so the area between ±1.96 is 95%.", ""),
  fa("y11adv-cp-nt-i5", "Exam scores N(65, 12²). Find the minimum score in the top 10%.", "P(Z<z)=0.9,\\;z\\approx1.28", "X = 65 + 1.28(12) ≈ 80.4", ["80.4"]),
];

const ntMastery: PracticeQuestion[] = [
  fa("y11adv-cp-nt-m1", "P(−1.5 < Z < 2.0) = P(Z < 2.0) − P(Z < −1.5). Evaluate.", "P(Z<2.0)=0.9772,\\;P(Z<-1.5)=0.0668", "0.9772 − 0.0668 = 0.9104", ["0.9104"]),
  mc("y11adv-cp-nt-m2", "If P(Z < k) = 0.8413, then k is:", "C",
    [{ label: "A", text: "$0$" }, { label: "B", text: "$0.5$" }, { label: "C", text: "$1$" }, { label: "D", text: "$2$" }],
    "P(Z < 1) = 0.8413 (from the 68% rule: P(Z < 1) = 0.5 + 0.34 = 0.84). So k = 1.", ""),
  fa("y11adv-cp-nt-m3", "Machine bolts: N(20 mm, 0.3²). Bolts are rejected if X < 19.4 mm. Find the rejection rate.", "z=(19.4-20)/0.3=-2", "P(Z<−2) = 0.0228 = 2.28%", ["0.0228", "2.28%"]),
  mc("y11adv-cp-nt-m4", "The 90th percentile of Z ~ N(0, 1) corresponds approximately to z =", "B",
    [{ label: "A", text: "$1.65$" }, { label: "B", text: "$1.28$" }, { label: "C", text: "$2.33$" }, { label: "D", text: "$0.90$" }],
    "P(Z < 1.28) ≈ 0.90 from standard normal tables. z = 1.28 is the 90th percentile of the standard normal.", ""),
  fa("y11adv-cp-nt-m5", "N(μ=75, σ=10). Find P(60 < X < 90).", "z_1=-1.5,\\;z_2=1.5", "P = 0.9332 − 0.0668 = 0.8664 (86.64%)", ["0.8664", "86.64%"]),
  mc("y11adv-cp-nt-m6", "P(Z < −2.5) equals (by symmetry):", "C",
    [{ label: "A", text: "$P(Z<2.5)$" }, { label: "B", text: "$2\\times P(Z<2.5)$" }, { label: "C", text: "$1-P(Z<2.5)$" }, { label: "D", text: "$P(Z<2.5)-0.5$" }],
    "By symmetry of the normal distribution: P(Z < −a) = P(Z > a) = 1 − P(Z < a). So P(Z < −2.5) = 1 − P(Z < 2.5).", ""),
  fa("y11adv-cp-nt-m7", "IQ scores N(100, 15²). What IQ puts a person in the top 2.5%?", "z=1.96,\\;X=100+1.96(15)", "X ≈ 129.4", ["129.4"]),
  mc("y11adv-cp-nt-m8", "A normal distribution table gives Φ(z) = P(Z < z). Then P(Z > z) =", "A",
    [{ label: "A", text: "$1-\\Phi(z)$" }, { label: "B", text: "$\\Phi(-z)+\\Phi(z)$" }, { label: "C", text: "$\\Phi(z)-1$" }, { label: "D", text: "$\\Phi(z)\\times 2$" }],
    "P(Z > z) = 1 − P(Z ≤ z) = 1 − Φ(z). Total probability is 1; splitting at z gives Φ(z) below and 1−Φ(z) above.", ""),
];

// ─── L5: Exam Practice ────────────────────────────────────────────────────────

const cpExGuided: PracticeQuestion[] = [
  mc("y11adv-cp-ex-g1", "A continuous RV has pdf f(x) = cx on [0, 4]. Find c.", "C",
    [{ label: "A", text: "$1/4$" }, { label: "B", text: "$1/2$" }, { label: "C", text: "$1/8$" }, { label: "D", text: "$1/16$" }],
    "∫₀⁴ cx dx = c[x²/2]₀⁴ = 8c = 1 → c = 1/8.", ""),
  fa("y11adv-cp-ex-g2", "X ~ N(45, 6²). Find P(33 < X < 57) using the empirical rule.", "33=45-2\\sigma,\\;57=45+2\\sigma", "95%", ["95%"]),
  fa("y11adv-cp-ex-g3", "X ~ N(80, 10²). Find the z-score for X = 65.", "z=(65-80)/10", "z = −1.5", ["-1.5"]),
  mc("y11adv-cp-ex-g4", "P(Z < −1) from tables (P(Z < 1) = 0.8413):", "B",
    [{ label: "A", text: "$0.8413$" }, { label: "B", text: "$0.1587$" }, { label: "C", text: "$0.3174$" }, { label: "D", text: "$-0.8413$" }],
    "P(Z < −1) = 1 − P(Z < 1) = 1 − 0.8413 = 0.1587.", ""),
];

const cpExIndep: PracticeQuestion[] = [
  fa("y11adv-cp-ex-i1", "f(x) = k(2x − x²) on [0, 2]. Find k and P(0 < X < 1).", "\\int_0^2 k(2x-x^2)\\,dx=1", "k=3/4; P(0<X<1) = 1/2", ["k=3/4; P=1/2"]),
  mc("y11adv-cp-ex-i2", "Scores are N(60, 8²). Using the 68–95–99.7 rule, what % score above 76?", "B",
    [{ label: "A", text: "$5\\%$" }, { label: "B", text: "$2.5\\%$" }, { label: "C", text: "$16\\%$" }, { label: "D", text: "$0.15\\%$" }],
    "76 = 60 + 2(8) = μ + 2σ. 5% of the distribution lies outside (μ−2σ, μ+2σ); by symmetry, 2.5% lies above μ+2σ = 76.", ""),
  fa("y11adv-cp-ex-i3", "X ~ N(72, 9²). Comparing to Y ~ N(50, 5²), which is more extreme: X = 81 or Y = 60?", "z_X=(81-72)/9=1,\\;z_Y=(60-50)/5=2", "Y = 60 is more extreme (z = 2 > 1)", ["Y = 60 is more extreme"]),
  mc("y11adv-cp-ex-i4", "P(−2 < Z < 1) = P(Z < 1) − P(Z < −2) = 0.8413 − 0.0228 =", "C",
    [{ label: "A", text: "$0.9772$" }, { label: "B", text: "$0.7500$" }, { label: "C", text: "$0.8185$" }, { label: "D", text: "$0.9000$" }],
    "0.8413 − 0.0228 = 0.8185.", ""),
  fa("y11adv-cp-ex-i5", "Reaction times: N(250 ms, 20²). Find P(X > 290 ms).", "z=(290-250)/20=2", "P(Z>2) = 1 − 0.9772 = 0.0228 (2.28%)", ["0.0228", "2.28%"]),
];

const cpExMastery: PracticeQuestion[] = [
  fa("y11adv-cp-ex-m1", "f(x) = 3x²/8 on [0, 2]. Find P(X > 1).", "f(x)=3x^2/8,\\;\\int_1^2 3x^2/8\\,dx", "= [x³/8]₁² = 8/8 − 1/8 = 7/8", ["7/8"]),
  mc("y11adv-cp-ex-m2", "X ~ N(100, 16). A value is at the 84th percentile. Find X. (Recall P(Z < 1) ≈ 0.84.)", "C",
    [{ label: "A", text: "$100$" }, { label: "B", text: "$116$" }, { label: "C", text: "$104$" }, { label: "D", text: "$108$" }],
    "P(Z < 1) ≈ 0.8413 ≈ 84th percentile. X = μ + z·σ = 100 + 1·4 = 104. (σ = 4 since σ² = 16.)", ""),
  fa("y11adv-cp-ex-m3", "Quality control: bolts N(50 mm, 1.5²) accepted if 47 < X < 53. Find the acceptance rate.", "z_1=(47-50)/1.5=-2,\\;z_2=(53-50)/1.5=2", "P(−2<Z<2) = 0.9772−0.0228 = 0.9544 (95.44%)", ["0.9544", "95.44%"]),
  mc("y11adv-cp-ex-m4", "X ~ N(μ, σ²). If P(X < 70) = 0.84 and P(X < 80) = 0.975, find μ and σ.", "B",
    [{ label: "A", text: "$\\mu=70,\\sigma=10$" }, { label: "B", text: "$\\mu=60,\\sigma=10$" }, { label: "C", text: "$\\mu=70,\\sigma=5$" }, { label: "D", text: "$\\mu=75,\\sigma=5$" }],
    "P(X < 70) = 0.84 → z = 1 → μ + σ = 70. P(X < 80) = 0.975 → z = 1.96 ≈ 2 → μ + 2σ = 80. Solving: σ = 10, μ = 60.", ""),
  fa("y11adv-cp-ex-m5", "In a N(0, 1) distribution, find k such that P(−k < Z < k) = 0.9.", "P(Z<k)=0.95", "k ≈ 1.645", ["1.645", "1.64"]),
  mc("y11adv-cp-ex-m6", "A continuous pdf f(x) must integrate to 1. Which of the following CANNOT be a pdf on [0, 1]?", "D",
    [{ label: "A", text: "$f(x) = 2x$" }, { label: "B", text: "$f(x) = 3x^2$" }, { label: "C", text: "$f(x) = 6x(1-x)$" }, { label: "D", text: "$f(x) = 3x^2 + 1$" }],
    "∫₀¹ (3x²+1) dx = [x³+x]₀¹ = 1+1 = 2 ≠ 1. So 3x²+1 cannot be a pdf on [0,1] without scaling. The others all integrate to 1.", ""),
  fa("y11adv-cp-ex-m7", "Wages at a company: N($1200, $150²). At least what wage do the top 5% earn?", "z=1.645,\\;X=1200+1.645(150)", "≈$1446.75", ["1446.75"]),
  mc("y11adv-cp-ex-m8", "The standard normal table gives Φ(1.5) = 0.9332. Then P(|Z| > 1.5) =", "B",
    [{ label: "A", text: "$0.9332$" }, { label: "B", text: "$0.1336$" }, { label: "C", text: "$0.0668$" }, { label: "D", text: "$0.5$" }],
    "P(|Z| > 1.5) = P(Z > 1.5) + P(Z < −1.5) = (1−0.9332) + 0.0668 = 0.0668 + 0.0668 = 0.1336.", ""),
];

// ─── Export ───────────────────────────────────────────────────────────────────

export function year11AdvancedContinuousProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "continuous-probability") return null;

  const base = { moduleSlug: lesson.slug, syllabusRef: "MA-S4" };

  if (lesson.slug === "continuous-random-variables") {
    return {
      ...base,
      description: "Introduce continuous random variables, probability density functions, and computing probabilities as areas under the pdf curve.",
      learningIntention: "Understand that probabilities for continuous variables are areas under the pdf, and verify or find constants in a given pdf.",
      successCriteria: [
        "State the two conditions for a valid pdf: f(x) ≥ 0 and ∫f(x) dx = 1.",
        "Explain why P(X = a) = 0 for any specific value a in a continuous distribution.",
        "Find the constant k in a given pdf by setting the integral equal to 1.",
        "Compute probabilities P(a ≤ X ≤ b) by integrating f(x) over [a, b].",
        "Find the mean of a uniform distribution on [a, b] as (a+b)/2.",
      ],
      teaching: {
        paragraphs: [
          "A continuous random variable X can take any value in an interval — not just specific discrete values. Since there are infinitely many possible values, the probability of any single exact value is zero: P(X = 3) = 0. Instead, probabilities are assigned to intervals: P(a ≤ X ≤ b) is the area under the probability density function (pdf) f(x) between a and b.",
          "The probability density function f(x) has two requirements: (1) f(x) ≥ 0 for all x (density cannot be negative), and (2) the total area under the curve equals 1, i.e. ∫f(x) dx = 1 over the entire range. Notice that f(x) can be greater than 1 at some points — it is a density, not a probability.",
          "To find an unknown constant in a pdf: set up the equation ∫f(x) dx = 1 and solve for the constant. For example, if f(x) = kx² on [0, 3], then ∫₀³ kx² dx = k·[x³/3]₀³ = 9k = 1, so k = 1/9.",
          "To compute a probability: integrate f(x) over the relevant interval. P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx. For a continuous RV, P(a < X < b) = P(a ≤ X ≤ b) because including or excluding endpoints adds zero probability.",
          "The uniform distribution on [a, b] has f(x) = 1/(b−a) (a constant density). For this distribution, P(c ≤ X ≤ d) = (d−c)/(b−a) — the probability is simply the length of the interval divided by the total length. Mean = (a+b)/2; Variance = (b−a)²/12.",
        ],
        latexBlocks: [
          "\\text{pdf conditions: }f(x)\\geq 0\\text{ and }\\int f(x)\\,dx=1",
          "P(a\\leq X\\leq b)=\\int_a^b f(x)\\,dx",
          "\\text{Uniform on }[a,b]:\\;f(x)=\\frac{1}{b-a},\\;\\mu=\\frac{a+b}{2}",
        ],
      },
      workedExamples: crvWorked,
      guidedPractice: crvGuided,
      independentPractice: crvIndep,
      commonMistakes: [
        { mistake: "Reading f(a) as the probability that X equals a.", fix: "f(a) is a density value (height), not a probability. The probability is the area: P(X = a) = 0. P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx." },
        { mistake: "Forgetting the constant when integrating to find P(a ≤ X ≤ b).", fix: "Set up the definite integral carefully and evaluate using the antiderivative. Don't confuse the integrand f(x) with the area." },
        { mistake: "Assuming a valid pdf must have f(x) ≤ 1 everywhere.", fix: "Only probabilities must be ≤ 1. A pdf is a density — it can exceed 1 as long as the total area still equals 1. For example, f(x) = 2 on [0, 0.5] is a valid pdf." },
      ],
      masteryQuiz: crvMastery,
    };
  }

  if (lesson.slug === "normal-distribution") {
    return {
      ...base,
      description: "Describe the features of the normal distribution and apply the 68–95–99.7 empirical rule to find probabilities.",
      learningIntention: "Use the properties of the normal distribution and the empirical rule to calculate probabilities and interpret data in context.",
      successCriteria: [
        "State the key features of a normal distribution: bell-shaped, symmetric, mean = median = mode.",
        "Write X ~ N(μ, σ²) and identify the mean and standard deviation from the notation.",
        "Apply the 68–95–99.7 empirical rule to find probabilities for intervals μ±σ, μ±2σ, μ±3σ.",
        "Use symmetry to find probabilities for one-sided intervals (e.g. P(X > μ + 2σ) = 2.5%).",
        "Interpret the effect of changing μ and σ on the shape and position of the normal curve.",
      ],
      teaching: {
        paragraphs: [
          "The normal distribution is the most important continuous distribution in statistics. It is fully described by two parameters: the mean μ (location of the centre) and the standard deviation σ (spread). We write X ~ N(μ, σ²). Its graph is the classic bell curve — symmetric, unimodal, with tails that extend to ±∞.",
          "The empirical rule (68–95–99.7 rule): for any normal distribution, approximately 68% of values lie within 1σ of the mean, 95% within 2σ, and 99.7% within 3σ. Formally: P(μ−σ < X < μ+σ) ≈ 0.68, P(μ−2σ < X < μ+2σ) ≈ 0.95, P(μ−3σ < X < μ+3σ) ≈ 0.997.",
          "By symmetry, P(X < μ) = P(X > μ) = 0.5. This symmetry also lets us split the empirical rule: the interval (μ, μ+σ) contains 34% of the distribution (half of 68%). So P(X > μ+2σ) = (100% − 95%)/2 = 2.5%.",
          "Changing μ shifts the curve left or right without changing its shape. Changing σ changes the width: larger σ → wider, flatter curve; smaller σ → narrower, taller curve. The area remains 1 regardless.",
          "The normal distribution arises naturally from the Central Limit Theorem: the sum or average of many independent random variables, regardless of their individual distribution, tends to a normal distribution as the sample size grows. This is why heights, measurement errors, test scores, and many biological variables follow approximately normal distributions.",
        ],
        latexBlocks: [
          "X\\sim N(\\mu,\\sigma^2):\\;P(\\mu-k\\sigma<X<\\mu+k\\sigma)\\approx\\begin{cases}68\\%&k=1\\\\95\\%&k=2\\\\99.7\\%&k=3\\end{cases}",
          "P(X<\\mu)=P(X>\\mu)=0.5\\quad\\text{(symmetry)}",
        ],
      },
      workedExamples: ndWorked,
      guidedPractice: ndGuided,
      independentPractice: ndIndep,
      commonMistakes: [
        { mistake: "Applying the empirical rule to one side only when asked for both tails.", fix: "P(X < μ−2σ or X > μ+2σ) = 100% − 95% = 5% total. Each tail contains 2.5%. Be clear whether you need both tails or just one." },
        { mistake: "Confusing σ and σ² in the N(μ, σ²) notation.", fix: "The second parameter in N(μ, σ²) is the VARIANCE σ², not the standard deviation σ. For N(50, 25), σ² = 25 and σ = 5." },
        { mistake: "Treating the normal distribution as if it has a definite cutoff at ±3σ.", fix: "The normal distribution has non-zero (though tiny) probability beyond ±3σ. The tails extend to ±∞. The 99.7% rule means 0.3% lies beyond ±3σ, not that it is impossible." },
      ],
      masteryQuiz: ndMastery,
    };
  }

  if (lesson.slug === "z-scores-standardising") {
    return {
      ...base,
      description: "Convert values to z-scores to compare across different normal distributions and to standardise for use with the standard normal table.",
      learningIntention: "Use z = (X − μ)/σ to measure relative standing, compare values from different distributions, and prepare for use with normal tables.",
      successCriteria: [
        "Calculate the z-score for a value X in a N(μ, σ²) distribution using z = (X−μ)/σ.",
        "Interpret the z-score as the number of standard deviations from the mean.",
        "Convert z back to X using X = μ + zσ.",
        "Use z-scores to compare performances across different normal distributions.",
        "Recognise that standardising transforms any N(μ, σ²) to Z ~ N(0, 1).",
      ],
      teaching: {
        paragraphs: [
          "A z-score measures how many standard deviations a value X is from the mean. The formula is z = (X − μ)/σ. A positive z means X is above the mean; negative z means below. z = 0 means X equals the mean. z = 2 means X is 2 standard deviations above the mean.",
          "The z-score converts any N(μ, σ²) to the standard normal Z ~ N(0, 1) by the transformation Z = (X − μ)/σ. The standard normal has mean 0 and standard deviation 1. This standardisation is why one table (the standard normal table) can serve all normal distributions.",
          "To go from z back to X: rearrange z = (X−μ)/σ to get X = μ + zσ. This is used when you know the percentile or probability and need the corresponding raw value (called an inverse normal problem).",
          "z-scores enable fair comparison across different scales. If a student scores 75 in a test with mean 60, σ = 10 (z = 1.5) and 85 in another test with mean 80, σ = 8 (z = 0.625), the first result is better relative to the class despite the lower absolute score.",
          "The z-score formula can also be reversed to find μ or σ. Given two data points and their percentiles (which give two z-values), you can set up two equations in two unknowns and solve for μ and σ simultaneously.",
        ],
        latexBlocks: [
          "z=\\frac{X-\\mu}{\\sigma},\\quad X=\\mu+z\\sigma",
          "Z\\sim N(0,1)\\text{ is the standard normal (mean 0, SD 1)}",
        ],
      },
      workedExamples: zsWorked,
      guidedPractice: zsGuided,
      independentPractice: zsIndep,
      commonMistakes: [
        { mistake: "Dividing by σ² instead of σ in the z-score formula.", fix: "z = (X − μ)/σ, not /σ². Always use the standard deviation (the square root of the variance) in the denominator." },
        { mistake: "Interpreting z = −1 as a bad or wrong result.", fix: "A negative z simply means the value is below the mean. It is not incorrect — it just indicates relative position. In some contexts (e.g. lower is better), negative z is desirable." },
        { mistake: "Comparing raw scores across different distributions without standardising.", fix: "A score of 80 in one test and 80 in another means nothing without knowing the means and SDs. Always standardise to z before comparing relative performance." },
      ],
      masteryQuiz: zsMastery,
    };
  }

  if (lesson.slug === "normal-tables-probabilities") {
    return {
      ...base,
      description: "Use the standard normal table (z-table) to compute probabilities for normal distributions by converting to z-scores.",
      learningIntention: "Read standard normal tables to find P(Z < z) and use symmetry and subtraction to find probabilities for any interval.",
      successCriteria: [
        "Read P(Z < z) directly from a standard normal table for z > 0.",
        "Use symmetry to find P(Z < z) for z < 0: P(Z < −z) = 1 − P(Z < z).",
        "Find P(a < Z < b) = P(Z < b) − P(Z < a).",
        "Convert from X to z then use tables to find P(X < x) for X ~ N(μ, σ²).",
        "Solve inverse normal problems: find x given P(X < x) = p.",
      ],
      teaching: {
        paragraphs: [
          "The standard normal table lists Φ(z) = P(Z < z) for Z ~ N(0, 1). It gives the cumulative probability from −∞ up to z. For z = 1.5, the table gives Φ(1.5) = P(Z < 1.5) = 0.9332, meaning 93.32% of the standard normal distribution lies below 1.5.",
          "Symmetry rules for the standard normal: P(Z < −z) = 1 − P(Z < z) (left tail = 1 minus right side). P(Z > z) = 1 − Φ(z). These two rules mean you only need the table for positive z — any negative-z probability can be derived by symmetry.",
          "For a range: P(a < Z < b) = Φ(b) − Φ(a). Subtract the cumulative probability at the lower bound from the cumulative probability at the upper bound. This gives the area between a and b.",
          "For a general X ~ N(μ, σ²): first convert x to z = (x−μ)/σ, then use the standard normal table. P(X < x) = P(Z < z) = Φ(z). The conversion maps any normal probability to a standard normal probability.",
          "Inverse normal: given P(X < x) = p, find x. Steps: (1) find z from the table such that Φ(z) = p; (2) convert back: x = μ + zσ. Common critical values: Φ(1.28) ≈ 0.90 (90th percentile), Φ(1.645) ≈ 0.95, Φ(1.96) ≈ 0.975, Φ(2.326) ≈ 0.99.",
        ],
        latexBlocks: [
          "P(Z<z)=\\Phi(z)\\quad\\text{from table}",
          "P(Z<-z)=1-\\Phi(z),\\quad P(a<Z<b)=\\Phi(b)-\\Phi(a)",
          "P(X<x)=\\Phi\\!\\left(\\frac{x-\\mu}{\\sigma}\\right);\\quad\\text{inverse: }x=\\mu+z\\sigma\\text{ where }\\Phi(z)=p",
        ],
      },
      workedExamples: ntWorked,
      guidedPractice: ntGuided,
      independentPractice: ntIndep,
      commonMistakes: [
        { mistake: "Reading Φ(z) directly as P(Z > z).", fix: "The standard normal table gives P(Z < z), the area to the LEFT. P(Z > z) = 1 − Φ(z). Identify which tail the question asks for before reading the table." },
        { mistake: "Forgetting to convert X to z before looking up the table.", fix: "The table is for Z ~ N(0, 1) only. For X ~ N(μ, σ²), always compute z = (x−μ)/σ first, then use the table." },
        { mistake: "Computing P(a < X < b) = Φ(b) − Φ(a) without converting a and b to z-scores.", fix: "Convert both endpoints to z-scores first: z₁ = (a−μ)/σ, z₂ = (b−μ)/σ. Then P(a < X < b) = Φ(z₂) − Φ(z₁)." },
      ],
      masteryQuiz: ntMastery,
    };
  }

  if (lesson.slug === "continuous-probability-exam-practice") {
    return {
      ...base,
      description: "HSC-style problems combining continuous random variables, the normal distribution, z-scores, and standard normal tables.",
      learningIntention: "Apply all continuous probability techniques to multi-step exam-standard problems.",
      successCriteria: [
        "Verify and use pdf conditions (f(x) ≥ 0 and ∫f(x) dx = 1) in problem contexts.",
        "Apply the empirical rule to find probabilities without tables.",
        "Use z-scores to compare values from different normal distributions.",
        "Use the standard normal table with symmetry and subtraction to find any normal probability.",
        "Solve inverse normal problems: find the value corresponding to a given percentile.",
      ],
      teaching: {
        paragraphs: [
          "Continuous probability questions fall into four types: (1) PDF questions — find k, verify, or compute P(a < X < b) by integration; (2) Empirical rule — apply 68/95/99.7% for intervals at μ±σ, μ±2σ, μ±3σ; (3) z-score and table — convert X to z, look up Φ(z), apply symmetry; (4) Inverse normal — find x given the percentile. Identify the type before starting.",
          "PDF questions require careful integration. Set up ∫f(x) dx = 1 to find constants. Compute ∫ₐᵇ f(x) dx for probabilities. The antiderivative must be evaluated at the bounds — do not forget to subtract F(a) from F(b).",
          "For normal distribution problems: always draw a sketch. Mark the mean, label the relevant x-values, shade the required region. This prevents symmetry errors (confusing left-tail and right-tail) and helps you set up the correct z-score calculation.",
          "Inverse normal: read critical z-values from the question or a provided table. The most common: z = 1.645 (top 5%), z = 1.96 (top 2.5%), z = 2.326 (top 1%). Convert back to X = μ + zσ.",
          "Multi-step problems often chain: (1) standardise multiple values to z; (2) look up two z-values; (3) subtract to get an interval probability; (4) interpret in context. Work in z-space throughout rather than switching back and forth.",
        ],
        latexBlocks: [
          "\\text{Four types: PDF}\\to\\text{integrate;\\;Emp. rule}\\to\\text{68/95/99.7};\\;\\text{z-table;\\;Inverse normal}",
          "\\text{Inverse: }p=\\Phi(z)\\implies x=\\mu+z\\sigma",
        ],
      },
      workedExamples: [],
      guidedPractice: cpExGuided,
      independentPractice: cpExIndep,
      commonMistakes: [
        { mistake: "Applying the empirical rule when the interval doesn't align with μ±kσ.", fix: "The 68/95/99.7 rule only applies to intervals centred at the mean with endpoints at exactly μ±σ, μ±2σ, μ±3σ. For other intervals, convert to z and use the table." },
        { mistake: "In inverse normal, finding z from the table but then not converting back to X.", fix: "The table gives z; the question asks for X. Final step: X = μ + z·σ. Never leave the answer as a z-score if the question asks for an original value." },
        { mistake: "Confusing 'top k%' with the z-value from the table.", fix: "If k% is in the top tail, then P(Z < z) = (100 − k)/100 = the cumulative probability up to z. Find this z from the table, then compute X = μ + zσ." },
      ],
      masteryQuiz: cpExMastery,
    };
  }

  return null;
}
