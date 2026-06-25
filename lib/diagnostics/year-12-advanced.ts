import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Advanced",

  units: [
    {
      slug: "ma-f1-working-with-functions",
      title: "Working with Functions",
      startHref: "/course/year-12-advanced/ma-f1-working-with-functions",
    },
    {
      slug: "ma-f2-graphing-techniques",
      title: "Graphing Techniques",
      startHref: "/course/year-12-advanced/ma-f2-graphing-techniques",
    },
    {
      slug: "ma-t1-trigonometry-and-measure-of-angles",
      title: "Trigonometry and Measure of Angles",
      startHref: "/course/year-12-advanced/ma-t1-trigonometry-and-measure-of-angles",
    },
    {
      slug: "ma-t2-trigonometric-functions-and-identities",
      title: "Trigonometric Functions and Identities",
      startHref: "/course/year-12-advanced/ma-t2-trigonometric-functions-and-identities",
    },
    {
      slug: "ma-t3-trigonometric-equations",
      title: "Trigonometric Equations",
      startHref: "/course/year-12-advanced/ma-t3-trigonometric-equations",
    },
    {
      slug: "ma-c1-introduction-to-differentiation",
      title: "Introduction to Differentiation",
      startHref: "/course/year-12-advanced/ma-c1-introduction-to-differentiation",
    },
    {
      slug: "ma-c2-differential-calculus",
      title: "Differential Calculus",
      startHref: "/course/year-12-advanced/ma-c2-differential-calculus",
    },
    {
      slug: "ma-c3-applications-of-differentiation",
      title: "Applications of Differentiation",
      startHref: "/course/year-12-advanced/ma-c3-applications-of-differentiation",
    },
    {
      slug: "ma-c4-integral-calculus",
      title: "Integral Calculus",
      startHref: "/course/year-12-advanced/ma-c4-integral-calculus",
    },
    {
      slug: "ma-e1-exponential-and-logarithmic-functions",
      title: "Exponential and Logarithmic Functions",
      startHref: "/course/year-12-advanced/ma-e1-exponential-and-logarithmic-functions",
    },
    {
      slug: "ma-m1-modelling-financial-situations",
      title: "Modelling Financial Situations",
      startHref: "/course/year-12-advanced/ma-m1-modelling-financial-situations",
    },
    {
      slug: "ma-s1-probability-and-discrete-probability-distributions",
      title: "Probability and Discrete Probability Distributions",
      startHref: "/course/year-12-advanced/ma-s1-probability-and-discrete-probability-distributions",
    },
    {
      slug: "ma-s2-descriptive-statistics-and-bivariate-data",
      title: "Descriptive Statistics and Bivariate Data Analysis",
      startHref: "/course/year-12-advanced/ma-s2-descriptive-statistics-and-bivariate-data",
    },
    {
      slug: "ma-s3-random-variables",
      title: "Random Variables",
      startHref: "/course/year-12-advanced/ma-s3-random-variables",
    },
  ],

  questions: [
    {
      id: "y12adv-d5-function-transform-domain",
      unitSlug: "ma-f1-working-with-functions",
      assessedUnitSlugs: [
        "ma-f1-working-with-functions",
        "ma-f2-graphing-techniques",
      ],
      difficulty: 5,
      targetMisconception:
        "Confuses horizontal transformations with outside transformations, or applies the original function's domain without recomposing it.",
      prompt:
        "A function is transformed by $g(x)=f(2-x)+3$, where $f(x)=\\sqrt{x-1}$. Which domain and range are correct for $g$?",
      latex: "f(x)=\\sqrt{x-1}, \\qquad g(x)=f(2-x)+3",
      choices: [
        { label: "A", text: "Domain $x\\leq1$, range $y\\geq3$" },
        { label: "B", text: "Domain $x\\geq1$, range $y\\geq3$" },
        { label: "C", text: "Domain $x\\leq1$, range $y\\leq3$" },
        { label: "D", text: "Domain $x\\geq3$, range $y\\geq1$" },
      ],
      correctAnswer: "A",
      explanation:
        "The input to $f$ is $2-x$, and $f$ needs its input to be at least $1$. So $2-x\\geq1$, giving $x\\leq1$. The square root is non-negative and the outside $+3$ shifts the range to $y\\geq3$.",
    },
    {
      id: "y12adv-d5-log-model-features",
      unitSlug: "ma-e1-exponential-and-logarithmic-functions",
      assessedUnitSlugs: [
        "ma-f2-graphing-techniques",
        "ma-e1-exponential-and-logarithmic-functions",
      ],
      difficulty: 5,
      targetMisconception:
        "Treats a logarithmic model as though its shift controls a horizontal asymptote, or misses the domain restriction inside the logarithm.",
      prompt:
        "A sensor is calibrated by $R=3\\log_2(t-1)-6$, where $t$ is time in seconds. Which statement about the model is correct?",
      latex: "R=3\\log_2(t-1)-6",
      choices: [
        { label: "A", text: "It is defined for $t>1$, and $R=0$ when $t=5$." },
        { label: "B", text: "It is defined for $t\\geq1$, and $R=0$ when $t=4$." },
        { label: "C", text: "It has horizontal asymptote $R=-6$, and $R=0$ when $t=5$." },
        { label: "D", text: "It is defined for all $t$, and $R=0$ when $t=3$." },
      ],
      correctAnswer: "A",
      explanation:
        "The logarithm requires $t-1>0$, so $t>1$. For $R=0$, $3\\log_2(t-1)-6=0$, so $\\log_2(t-1)=2$ and $t-1=4$, giving $t=5$.",
    },
    {
      id: "y12adv-d5-trig-period-sector",
      unitSlug: "ma-t1-trigonometry-and-measure-of-angles",
      assessedUnitSlugs: [
        "ma-t1-trigonometry-and-measure-of-angles",
        "ma-t2-trigonometric-functions-and-identities",
        "ma-t3-trigonometric-equations",
      ],
      difficulty: 5,
      targetMisconception:
        "Uses degrees and radians interchangeably, or solves the trigonometric equation using only the first-quadrant solution.",
      prompt:
        "A sector has radius $9$ cm and arc length $3\\pi$ cm. The sector angle is used as the period of $y=\\sin(kx)$. Which value of $k$ and first positive solution of $\\sin(kx)=1$ are correct?",
      latex: "s=r\\theta, \\qquad y=\\sin(kx)",
      choices: [
        { label: "A", text: "$k=6$, first solution $x=\\dfrac{\\pi}{12}$" },
        { label: "B", text: "$k=6$, first solution $x=\\dfrac{\\pi}{6}$" },
        { label: "C", text: "$k=\\dfrac{1}{6}$, first solution $x=3\\pi$" },
        { label: "D", text: "$k=3$, first solution $x=\\dfrac{\\pi}{6}$" },
      ],
      correctAnswer: "A",
      explanation:
        "The sector angle is $\\theta=3\\pi/9=\\pi/3$. For $\\sin(kx)$, period $=2\\pi/k$, so $2\\pi/k=\\pi/3$ gives $k=6$. Then $\\sin(6x)=1$ first occurs when $6x=\\pi/2$, so $x=\\pi/12$.",
    },
    {
      id: "y12adv-d5-implicit-chain-rate",
      unitSlug: "ma-c2-differential-calculus",
      assessedUnitSlugs: [
        "ma-c1-introduction-to-differentiation",
        "ma-c2-differential-calculus",
        "ma-e1-exponential-and-logarithmic-functions",
      ],
      difficulty: 5,
      targetMisconception:
        "Differentiates a logarithmic composite as $1/u$ only, or fails to connect the derivative to a rate of change.",
      prompt:
        "A population index is $P(t)=50\\ln(2t+1)$. At what time is the instantaneous growth rate first equal to $10$ units per year?",
      latex: "P(t)=50\\ln(2t+1)",
      choices: [
        { label: "A", text: "$t=4.5$" },
        { label: "B", text: "$t=2$" },
        { label: "C", text: "$t=5$" },
        { label: "D", text: "$t=9$" },
      ],
      correctAnswer: "A",
      explanation:
        "$P'(t)=50\\cdot\\frac{2}{2t+1}=\\frac{100}{2t+1}$. Set this equal to $10$: $100/(2t+1)=10$, so $2t+1=10$ and $t=4.5$.",
    },
    {
      id: "y12adv-d5-optimisation-area",
      unitSlug: "ma-c3-applications-of-differentiation",
      assessedUnitSlugs: [
        "ma-c1-introduction-to-differentiation",
        "ma-c3-applications-of-differentiation",
      ],
      difficulty: 5,
      targetMisconception:
        "Maximises before forming the constrained model, or treats perimeter as area.",
      prompt:
        "A rectangle has its base on a river, so fencing is needed only for the other three sides. There is $60$ m of fencing. What maximum area can be enclosed?",
      latex: "2x+y=60",
      choices: [
        { label: "A", text: "$450\\text{ m}^2$" },
        { label: "B", text: "$600\\text{ m}^2$" },
        { label: "C", text: "$900\\text{ m}^2$" },
        { label: "D", text: "$1800\\text{ m}^2$" },
      ],
      correctAnswer: "A",
      explanation:
        "Let the two equal fenced sides be $x$ and the side parallel to the river be $y$. Then $2x+y=60$, so $y=60-2x$. Area $A=x(60-2x)=60x-2x^2$, maximised when $A'=60-4x=0$, so $x=15$, $y=30$, and $A=450$.",
    },
    {
      id: "y12adv-d5-signed-area-total",
      unitSlug: "ma-c4-integral-calculus",
      assessedUnitSlugs: [
        "ma-c3-applications-of-differentiation",
        "ma-c4-integral-calculus",
      ],
      difficulty: 5,
      targetMisconception:
        "Finds signed displacement when the question asks for total distance/area, or misses the sign change inside the interval.",
      prompt:
        "A particle has velocity $v(t)=t^2-4t+3$ for $0\\leq t\\leq4$. What total distance does it travel?",
      latex: "v(t)=t^2-4t+3",
      choices: [
        { label: "A", text: "$\\dfrac{4}{3}$ units" },
        { label: "B", text: "$\\dfrac{8}{3}$ units" },
        { label: "C", text: "$4$ units" },
        { label: "D", text: "$\\dfrac{16}{3}$ units" },
      ],
      correctAnswer: "C",
      explanation:
        "$v(t)=(t-1)(t-3)$, so the sign changes at $t=1$ and $t=3$. With antiderivative $F(t)=t^3/3-2t^2+3t$, the signed areas are $4/3$, $-4/3$, and $4/3$, so the total distance is $4/3+4/3+4/3=4$.",
    },
    {
      id: "y12adv-d5-financial-break-even",
      unitSlug: "ma-m1-modelling-financial-situations",
      assessedUnitSlugs: [
        "ma-e1-exponential-and-logarithmic-functions",
        "ma-m1-modelling-financial-situations",
      ],
      difficulty: 5,
      targetMisconception:
        "Compares yearly rates additively instead of solving the exponential break-even condition.",
      prompt:
        "Account A starts with 5000 dollars and grows at $6\\%$ p.a. compounded annually. Account B starts with 6200 dollars and grows at $3\\%$ p.a. compounded annually. After how many whole years is Account A first worth more than Account B?",
      latex: "5000(1.06)^n>6200(1.03)^n",
      choices: [
        { label: "A", text: "$7$ years" },
        { label: "B", text: "$8$ years" },
        { label: "C", text: "$9$ years" },
        { label: "D", text: "$10$ years" },
      ],
      correctAnswer: "B",
      explanation:
        "Divide both sides by $5000(1.03)^n$ to get $(1.06/1.03)^n>1.24$. This gives $n>\\ln(1.24)/\\ln(1.06/1.03)\\approx7.50$, so the first whole year is $8$.",
    },
    {
      id: "y12adv-d5-probability-random-variable",
      unitSlug: "ma-s1-probability-and-discrete-probability-distributions",
      assessedUnitSlugs: [
        "ma-s1-probability-and-discrete-probability-distributions",
        "ma-s3-random-variables",
      ],
      difficulty: 5,
      targetMisconception:
        "Uses replacement when the sampling is without replacement, or treats expected value as the most likely value.",
      prompt:
        "A bag has $5$ red and $3$ blue counters. Two counters are drawn without replacement. Let $X$ be the number of red counters drawn. Which pair is correct?",
      latex: "X=\\text{number of red counters in two draws}",
      choices: [
        { label: "A", text: "$P(X=2)=\\dfrac{25}{64}$ and $E(X)=\\dfrac{5}{4}$" },
        { label: "B", text: "$P(X=2)=\\dfrac{5}{14}$ and $E(X)=\\dfrac{5}{4}$" },
        { label: "C", text: "$P(X=2)=\\dfrac{5}{14}$ and $E(X)=\\dfrac{10}{7}$" },
        { label: "D", text: "$P(X=2)=\\dfrac{25}{64}$ and $E(X)=\\dfrac{10}{7}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$P(X=2)=\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{5}{14}$. Linearity of expectation gives $E(X)=2\\cdot\\frac{5}{8}=\\frac{5}{4}$, even without replacement.",
    },
    {
      id: "y12adv-d5-regression-standardised-residual",
      unitSlug: "ma-s2-descriptive-statistics-and-bivariate-data",
      assessedUnitSlugs: [
        "ma-s2-descriptive-statistics-and-bivariate-data",
        "ma-s3-random-variables",
      ],
      difficulty: 5,
      targetMisconception:
        "Computes residual with the wrong sign, or standardises the raw observed value instead of the residual.",
      prompt:
        "A regression model predicts $\\hat y=2.5x+18$. For $x=20$, the observed value is $75$. If residuals have standard deviation $4$, what are the residual and its standardised value?",
      latex: "\\hat y=2.5x+18",
      choices: [
        { label: "A", text: "Residual $7$, standardised value $1.75$" },
        { label: "B", text: "Residual $-7$, standardised value $-1.75$" },
        { label: "C", text: "Residual $7$, standardised value $18.75$" },
        { label: "D", text: "Residual $57$, standardised value $14.25$" },
      ],
      correctAnswer: "A",
      explanation:
        "The predicted value is $2.5(20)+18=68$. Residual is observed minus predicted: $75-68=7$. Standardising the residual gives $7/4=1.75$.",
    },
    {
      id: "y12adv-d5-normal-conditional",
      unitSlug: "ma-s3-random-variables",
      assessedUnitSlugs: [
        "ma-s1-probability-and-discrete-probability-distributions",
        "ma-s3-random-variables",
      ],
      difficulty: 5,
      targetMisconception:
        "Finds an unconditional normal probability when the question asks for a conditional probability in a restricted tail.",
      prompt:
        "A score $X$ is normally distributed with mean $70$ and standard deviation $8$. A student is known to have scored above $70$. What is the probability they scored above $86$?",
      latex: "X\\sim N(70,8^2)",
      choices: [
        { label: "A", text: "$0.0228$" },
        { label: "B", text: "$0.0456$" },
        { label: "C", text: "$0.4772$" },
        { label: "D", text: "$0.9544$" },
      ],
      correctAnswer: "B",
      explanation:
        "$86$ is two standard deviations above the mean, so $P(X>86)\\approx0.0228$. Given $X>70$, the denominator is $0.5$, so $P(X>86\\mid X>70)=0.0228/0.5=0.0456$.",
    },
  ],
};
