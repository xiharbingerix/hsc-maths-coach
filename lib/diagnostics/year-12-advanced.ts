import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Advanced",

  units: [
    {
      slug: "functions-graphing-techniques",
      title: "Functions and Graphing Techniques",
      startHref: "/course/functions-graphing-techniques",
    },
    {
      slug: "trigonometric-functions-graphs",
      title: "Trigonometric Functions and Graphs",
      startHref: "/course/trigonometric-functions-graphs",
    },
    {
      slug: "differential-calculus",
      title: "Differential Calculus",
      startHref: "/course/differential-calculus",
    },
    {
      slug: "integral-calculus",
      title: "Integral Calculus",
      startHref: "/course/integral-calculus",
    },
    {
      slug: "sequences-series-financial-maths",
      title: "Sequences, Series and Financial Mathematics",
      startHref: "/course/sequences-series-financial-maths",
    },
    {
      slug: "statistical-analysis",
      title: "Statistical Analysis",
      startHref: "/course/statistical-analysis",
    },
  ],

  questions: [
    // ── Functions and Graphing Techniques (3 questions) ───────────────────────
    {
      id: "y12adv-f1",
      unitSlug: "functions-graphing-techniques",
      prompt: "What is the domain of $f(x) = \\sqrt{4 - x}$?",
      latex: "f(x)=\\sqrt{4-x}",
      choices: [
        { label: "A", text: "$x \\leq 4$" },
        { label: "B", text: "$x \\geq 4$" },
        { label: "C", text: "$x < 4$" },
        { label: "D", text: "All real $x$" },
      ],
      correctAnswer: "A",
      explanation:
        "The expression under the square root must be non-negative: $4 - x \\geq 0 \\Rightarrow x \\leq 4$. Domain is $(-\\infty, 4]$.",
    },
    {
      id: "y12adv-f2",
      unitSlug: "functions-graphing-techniques",
      prompt:
        "If $f(x) = 2x + 1$ and $g(x) = x^2$, find $f(g(3))$.",
      latex: "f(x)=2x+1, \\quad g(x)=x^2",
      choices: [
        { label: "A", text: "$7$" },
        { label: "B", text: "$19$" },
        { label: "C", text: "$13$" },
        { label: "D", text: "$49$" },
      ],
      correctAnswer: "B",
      explanation:
        "$g(3) = 3^2 = 9$, then $f(9) = 2(9) + 1 = 19$.",
    },
    {
      id: "y12adv-f3",
      unitSlug: "functions-graphing-techniques",
      prompt:
        "The graph $y = f(x)$ is shifted $2$ units right and $3$ units up. The new equation is:",
      choices: [
        { label: "A", text: "$y = f(x - 2) + 3$" },
        { label: "B", text: "$y = f(x + 2) + 3$" },
        { label: "C", text: "$y = f(x - 2) - 3$" },
        { label: "D", text: "$y = f(x + 2) - 3$" },
      ],
      correctAnswer: "A",
      explanation:
        "Shifting right by $2$ replaces $x$ with $x - 2$ inside the function. Shifting up by $3$ adds $3$ outside. Result: $y = f(x - 2) + 3$.",
    },

    // ── Trigonometric Functions and Graphs (3 questions) ─────────────────────
    {
      id: "y12adv-t1",
      unitSlug: "trigonometric-functions-graphs",
      prompt: "What is the period of $y = \\sin(3x)$?",
      latex: "y=\\sin(3x)",
      choices: [
        { label: "A", text: "$\\dfrac{\\pi}{3}$" },
        { label: "B", text: "$\\dfrac{2\\pi}{3}$" },
        { label: "C", text: "$3\\pi$" },
        { label: "D", text: "$6\\pi$" },
      ],
      correctAnswer: "B",
      explanation:
        "The period of $y = \\sin(nx)$ is $\\dfrac{2\\pi}{n}$. With $n = 3$, period $= \\dfrac{2\\pi}{3}$.",
    },
    {
      id: "y12adv-t2",
      unitSlug: "trigonometric-functions-graphs",
      prompt: "The exact value of $\\cos\\left(\\dfrac{\\pi}{3}\\right)$ is:",
      latex: "\\cos\\!\\left(\\frac{\\pi}{3}\\right)",
      choices: [
        { label: "A", text: "$\\dfrac{\\sqrt{3}}{2}$" },
        { label: "B", text: "$\\dfrac{1}{2}$" },
        { label: "C", text: "$\\dfrac{\\sqrt{2}}{2}$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\cos\\!\\left(\\dfrac{\\pi}{3}\\right) = \\cos(60°) = \\dfrac{1}{2}$.",
    },
    {
      id: "y12adv-t3",
      unitSlug: "trigonometric-functions-graphs",
      prompt:
        "Solve $2\\sin x - 1 = 0$ for $x \\in [0,\\,2\\pi]$. The solutions are:",
      latex: "2\\sin x - 1 = 0, \\quad x \\in [0,\\,2\\pi]",
      choices: [
        { label: "A", text: "$x = \\dfrac{\\pi}{6}$ only" },
        { label: "B", text: "$x = \\dfrac{\\pi}{6}$ and $x = \\dfrac{5\\pi}{6}$" },
        { label: "C", text: "$x = \\dfrac{\\pi}{6}$ and $x = \\dfrac{11\\pi}{6}$" },
        { label: "D", text: "$x = \\dfrac{\\pi}{3}$ and $x = \\dfrac{2\\pi}{3}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\sin x = \\dfrac{1}{2}$. Sine is positive in the first and second quadrants: $x = \\dfrac{\\pi}{6}$ and $x = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$.",
    },

    // ── Differential Calculus (4 questions) ───────────────────────────────────
    {
      id: "y12adv-dc1",
      unitSlug: "differential-calculus",
      prompt: "Find $f'(x)$ for $f(x) = 4x^3 - 3x^2 + 2x - 7$.",
      latex: "f(x)=4x^3-3x^2+2x-7",
      choices: [
        { label: "A", text: "$12x^2 - 6x + 2$" },
        { label: "B", text: "$12x^2 - 3x + 2$" },
        { label: "C", text: "$12x^3 - 6x + 2$" },
        { label: "D", text: "$4x^2 - 6x + 2$" },
      ],
      correctAnswer: "A",
      explanation:
        "Differentiating term by term: $4x^3 \\to 12x^2$, $-3x^2 \\to -6x$, $2x \\to 2$, $-7 \\to 0$. So $f'(x) = 12x^2 - 6x + 2$.",
    },
    {
      id: "y12adv-dc2",
      unitSlug: "differential-calculus",
      prompt:
        "The $x$-value of the stationary point of $y = x^2 - 4x + 3$ is:",
      latex: "y=x^2-4x+3",
      choices: [
        { label: "A", text: "$x = -2$" },
        { label: "B", text: "$x = 2$" },
        { label: "C", text: "$x = 4$" },
        { label: "D", text: "$x = 1$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\dfrac{dy}{dx} = 2x - 4 = 0 \\Rightarrow x = 2$.",
    },
    {
      id: "y12adv-dc3",
      unitSlug: "differential-calculus",
      prompt: "The gradient of the tangent to $y = x^3$ at $x = 2$ is:",
      latex: "y=x^3, \\quad x=2",
      choices: [
        { label: "A", text: "$6$" },
        { label: "B", text: "$8$" },
        { label: "C", text: "$12$" },
        { label: "D", text: "$24$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\dfrac{dy}{dx} = 3x^2$. At $x = 2$: $3(2)^2 = 12$.",
    },
    {
      id: "y12adv-dc4",
      unitSlug: "differential-calculus",
      prompt:
        "A particle has displacement $s(t) = t^2 - 6t + 5$. When is its velocity zero?",
      latex: "s(t)=t^2-6t+5",
      choices: [
        { label: "A", text: "$t = 2$" },
        { label: "B", text: "$t = 3$" },
        { label: "C", text: "$t = 5$" },
        { label: "D", text: "$t = 6$" },
      ],
      correctAnswer: "B",
      explanation:
        "$v(t) = s'(t) = 2t - 6$. Setting $v(t) = 0$: $2t - 6 = 0 \\Rightarrow t = 3$.",
    },

    // ── Integral Calculus (4 questions) ───────────────────────────────────────
    {
      id: "y12adv-ic1",
      unitSlug: "integral-calculus",
      prompt: "$\\displaystyle\\int (6x^2 - 4x + 3)\\,dx =$",
      latex: "\\int(6x^2-4x+3)\\,dx",
      choices: [
        { label: "A", text: "$2x^3 - 2x^2 + 3x + C$" },
        { label: "B", text: "$12x - 4 + C$" },
        { label: "C", text: "$2x^3 - 4x^2 + 3x + C$" },
        { label: "D", text: "$6x^3 - 4x^2 + 3x + C$" },
      ],
      correctAnswer: "A",
      explanation:
        "$\\int 6x^2\\,dx = 2x^3$, $\\int{-4x}\\,dx = -2x^2$, $\\int 3\\,dx = 3x$. Result: $2x^3 - 2x^2 + 3x + C$.",
    },
    {
      id: "y12adv-ic2",
      unitSlug: "integral-calculus",
      prompt: "Evaluate $\\displaystyle\\int_1^3 2x\\,dx$.",
      latex: "\\int_1^3 2x\\,dx",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$8$" },
        { label: "D", text: "$12$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\bigl[x^2\\bigr]_1^3 = 3^2 - 1^2 = 9 - 1 = 8$.",
    },
    {
      id: "y12adv-ic3",
      unitSlug: "integral-calculus",
      prompt:
        "The area bounded by $y = x^2$, the $x$-axis, and $x = 0$ to $x = 2$ is:",
      latex: "\\int_0^2 x^2\\,dx",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$\\dfrac{4}{3}$" },
        { label: "C", text: "$\\dfrac{8}{3}$" },
        { label: "D", text: "$4$" },
      ],
      correctAnswer: "C",
      explanation:
        "$\\left[\\dfrac{x^3}{3}\\right]_0^2 = \\dfrac{8}{3} - 0 = \\dfrac{8}{3}$.",
    },
    {
      id: "y12adv-ic4",
      unitSlug: "integral-calculus",
      prompt: "If $F'(x) = 4x + 1$, then $F(x)$ is:",
      latex: "F'(x)=4x+1",
      choices: [
        { label: "A", text: "$4x^2 + x + C$" },
        { label: "B", text: "$2x^2 + x + C$" },
        { label: "C", text: "$4x + C$" },
        { label: "D", text: "$2x^2 + C$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\int (4x + 1)\\,dx = 2x^2 + x + C$.",
    },

    // ── Sequences, Series and Financial Mathematics (3 questions) ─────────────
    {
      id: "y12adv-fm1",
      unitSlug: "sequences-series-financial-maths",
      prompt:
        "Using $A = P(1 + r)^n$, find the value of \\$2000 invested at $5\\%$ p.a. compounded annually for $3$ years.",
      latex: "A = 2000(1.05)^3",
      choices: [
        { label: "A", text: "\\$2200.00" },
        { label: "B", text: "\\$2300.00" },
        { label: "C", text: "\\$2315.25" },
        { label: "D", text: "\\$2420.50" },
      ],
      correctAnswer: "C",
      explanation:
        "$A = 2000 \\times (1.05)^3 = 2000 \\times 1.157625 = \\$2315.25$.",
    },
    {
      id: "y12adv-fm2",
      unitSlug: "sequences-series-financial-maths",
      prompt:
        "The present value of an annuity with regular payment $R$, interest rate $r$ per period, and $n$ periods is:",
      choices: [
        { label: "A", text: "$PV = R \\cdot \\dfrac{1-(1+r)^{-n}}{r}$" },
        { label: "B", text: "$PV = R \\cdot \\dfrac{(1+r)^n - 1}{r}$" },
        { label: "C", text: "$PV = R \\cdot r \\cdot (1+r)^n$" },
        { label: "D", text: "$PV = \\dfrac{R}{(1+r)^n}$" },
      ],
      correctAnswer: "A",
      explanation:
        "The present value of an annuity formula is $PV = R \\cdot \\dfrac{1-(1+r)^{-n}}{r}$, which discounts each future payment back to the present.",
    },
    {
      id: "y12adv-fm3",
      unitSlug: "sequences-series-financial-maths",
      prompt:
        "An arithmetic sequence has first term $a = 5$ and common difference $d = 3$. The $10$th term $T_{10}$ is:",
      latex: "T_n = a + (n-1)d",
      choices: [
        { label: "A", text: "$30$" },
        { label: "B", text: "$32$" },
        { label: "C", text: "$35$" },
        { label: "D", text: "$38$" },
      ],
      correctAnswer: "B",
      explanation:
        "$T_{10} = 5 + (10 - 1) \\times 3 = 5 + 27 = 32$.",
    },

    // ── Statistical Analysis (3 questions) ────────────────────────────────────
    {
      id: "y12adv-sa1",
      unitSlug: "statistical-analysis",
      prompt:
        "In a normal distribution, approximately what percentage of data lies within $1$ standard deviation of the mean?",
      choices: [
        { label: "A", text: "$50\\%$" },
        { label: "B", text: "$68\\%$" },
        { label: "C", text: "$95\\%$" },
        { label: "D", text: "$99.7\\%$" },
      ],
      correctAnswer: "B",
      explanation:
        "By the empirical rule: approximately $68\\%$ within $1\\sigma$, $95\\%$ within $2\\sigma$, and $99.7\\%$ within $3\\sigma$.",
    },
    {
      id: "y12adv-sa2",
      unitSlug: "statistical-analysis",
      prompt:
        "A score of $72$ comes from a distribution with mean $\\mu = 60$ and standard deviation $\\sigma = 8$. The $z$-score is:",
      latex: "z = \\dfrac{x - \\mu}{\\sigma}",
      choices: [
        { label: "A", text: "$z = 0.8$" },
        { label: "B", text: "$z = 1.0$" },
        { label: "C", text: "$z = 1.5$" },
        { label: "D", text: "$z = 2.0$" },
      ],
      correctAnswer: "C",
      explanation:
        "$z = \\dfrac{72 - 60}{8} = \\dfrac{12}{8} = 1.5$.",
    },
    {
      id: "y12adv-sa3",
      unitSlug: "statistical-analysis",
      prompt: "A $95\\%$ confidence interval for the population mean means:",
      choices: [
        { label: "A", text: "$95\\%$ of the data lies within the interval" },
        {
          label: "B",
          text: "In repeated sampling, $95\\%$ of such intervals would contain the true population mean",
        },
        { label: "C", text: "The sample mean is definitely within the interval" },
        { label: "D", text: "$95\\%$ of samples will be identical" },
      ],
      correctAnswer: "B",
      explanation:
        "A $95\\%$ CI means that if the procedure were repeated many times, $95\\%$ of the constructed intervals would contain the true population parameter.",
    },
  ],
};
