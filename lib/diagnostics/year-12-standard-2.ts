import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Standard 2",

  units: [
    {
      slug: "algebraic-relationships",
      title: "Algebraic Relationships",
      startHref: "/course/year-12-standard-2/algebraic-relationships",
    },
    {
      slug: "trigonometry-ratios-rates",
      title: "Trigonometry, Ratios and Rates",
      startHref: "/course/year-12-standard-2/trigonometry-ratios-rates",
    },
    {
      slug: "investments-loans-annuities",
      title: "Investments, Loans and Annuities",
      startHref: "/course/year-12-standard-2/investments-loans-annuities",
    },
    {
      slug: "bivariate-data-normal-distribution",
      title: "Bivariate Data and Normal Distribution",
      startHref: "/course/year-12-standard-2/bivariate-data-normal-distribution",
    },
    {
      slug: "networks-critical-path-analysis",
      title: "Networks and Critical Path Analysis",
      startHref: "/course/year-12-standard-2/networks-critical-path-analysis",
    },
  ],

  questions: [
    // ── Algebraic Relationships (4 questions) ─────────────────────────────────
    {
      id: "y12std2-ar1",
      unitSlug: "algebraic-relationships",
      prompt: "Solve $3x - 7 = 11$.",
      choices: [
        { label: "A", text: "$x = 4$" },
        { label: "B", text: "$x = 5$" },
        { label: "C", text: "$x = 6$" },
        { label: "D", text: "$x = 7$" },
      ],
      correctAnswer: "C",
      explanation: "$3x = 11 + 7 = 18 \\Rightarrow x = 6$.",
    },
    {
      id: "y12std2-ar2",
      unitSlug: "algebraic-relationships",
      prompt: "Which equation represents a straight line?",
      choices: [
        { label: "A", text: "$y = x^2$" },
        { label: "B", text: "$y = \\dfrac{1}{x}$" },
        { label: "C", text: "$y = 2x + 3$" },
        { label: "D", text: "$y = x^3$" },
      ],
      correctAnswer: "C",
      explanation:
        "A straight line has equation $y = mx + b$. Only $y = 2x + 3$ matches this form.",
    },
    {
      id: "y12std2-ar3",
      unitSlug: "algebraic-relationships",
      prompt:
        "Find the gradient of the line passing through $(1, 2)$ and $(5, 10)$.",
      latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$2$" },
        { label: "C", text: "$3$" },
        { label: "D", text: "$4$" },
      ],
      correctAnswer: "B",
      explanation: "$m = \\dfrac{10 - 2}{5 - 1} = \\dfrac{8}{4} = 2$.",
    },
    {
      id: "y12std2-ar4",
      unitSlug: "algebraic-relationships",
      prompt: "The $y$-intercept of $y = 3x - 5$ is:",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$-3$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$-5$" },
      ],
      correctAnswer: "D",
      explanation:
        "In $y = mx + b$, the $y$-intercept is $b$. Here $b = -5$.",
    },

    // ── Trigonometry, Ratios and Rates (4 questions) ───────────────────────────
    {
      id: "y12std2-tr1",
      unitSlug: "trigonometry-ratios-rates",
      prompt:
        "Using the sine rule: in a triangle, $a = 8$, $A = 30°$, $B = 60°$. Find $b$.",
      latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B}",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$8\\sqrt{3}$" },
        { label: "C", text: "$4\\sqrt{3}$" },
        { label: "D", text: "$16$" },
      ],
      correctAnswer: "B",
      explanation:
        "$b = \\dfrac{8 \\sin 60°}{\\sin 30°} = \\dfrac{8 \\times \\frac{\\sqrt{3}}{2}}{\\frac{1}{2}} = 8\\sqrt{3}$.",
    },
    {
      id: "y12std2-tr2",
      unitSlug: "trigonometry-ratios-rates",
      prompt:
        "Area of a triangle $= \\frac{1}{2}ab\\sin C$. With $a = 6$, $b = 8$, $C = 30°$, the area is:",
      latex: "A = \\tfrac{1}{2}ab\\sin C",
      choices: [
        { label: "A", text: "$6$" },
        { label: "B", text: "$8$" },
        { label: "C", text: "$12$" },
        { label: "D", text: "$24$" },
      ],
      correctAnswer: "C",
      explanation:
        "$A = \\frac{1}{2} \\times 6 \\times 8 \\times \\sin 30° = 24 \\times 0.5 = 12$.",
    },
    {
      id: "y12std2-tr3",
      unitSlug: "trigonometry-ratios-rates",
      prompt: "$\\cos(60°) =$",
      choices: [
        { label: "A", text: "$\\dfrac{1}{2}$" },
        { label: "B", text: "$\\dfrac{\\sqrt{3}}{2}$" },
        { label: "C", text: "$\\dfrac{\\sqrt{2}}{2}$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "A",
      explanation: "$\\cos(60°) = \\dfrac{1}{2}$.",
    },
    {
      id: "y12std2-tr4",
      unitSlug: "trigonometry-ratios-rates",
      prompt:
        "A person walks $5$ km on a bearing of $090°$ then $12$ km on a bearing of $000°$. The straight-line distance from the start is:",
      choices: [
        { label: "A", text: "$13$ km" },
        { label: "B", text: "$17$ km" },
        { label: "C", text: "$60$ km" },
        { label: "D", text: "$169$ km" },
      ],
      correctAnswer: "A",
      explanation:
        "The two legs are perpendicular. $d = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$ km.",
    },

    // ── Investments, Loans and Annuities (4 questions) ────────────────────────
    {
      id: "y12std2-il1",
      unitSlug: "investments-loans-annuities",
      prompt:
        "$5000 is invested at $6\\%$ p.a. compounded annually for $4$ years. The final amount is closest to:",
      latex: "A = P(1+r)^n",
      choices: [
        { label: "A", text: "$5600" },
        { label: "B", text: "$6312" },
        { label: "C", text: "$7200" },
        { label: "D", text: "$8000" },
      ],
      correctAnswer: "B",
      explanation:
        "$A = 5000 \\times (1.06)^4 = 5000 \\times 1.2625 \\approx \\$6312$.",
    },
    {
      id: "y12std2-il2",
      unitSlug: "investments-loans-annuities",
      prompt:
        "A loan has monthly repayments of $450 for $3$ years. The total amount repaid is:",
      choices: [
        { label: "A", text: "$10,800" },
        { label: "B", text: "$14,400" },
        { label: "C", text: "$16,200" },
        { label: "D", text: "$18,000" },
      ],
      correctAnswer: "C",
      explanation: "$\\$450 \\times 36 \\text{ months} = \\$16\\,200$.",
    },
    {
      id: "y12std2-il3",
      unitSlug: "investments-loans-annuities",
      prompt:
        "Compared to simple interest over a long period, compound interest will produce:",
      choices: [
        { label: "A", text: "Less interest" },
        { label: "B", text: "More interest" },
        { label: "C", text: "Exactly the same interest" },
        { label: "D", text: "It depends on the principal only" },
      ],
      correctAnswer: "B",
      explanation:
        "Compound interest earns interest on previously accumulated interest, producing more growth over time than simple interest.",
    },
    {
      id: "y12std2-il4",
      unitSlug: "investments-loans-annuities",
      prompt:
        "The present value of an annuity gives the:",
      choices: [
        { label: "A", text: "Future value of all payments" },
        { label: "B", text: "Total interest paid over the loan" },
        { label: "C", text: "Current worth of a series of future payments" },
        { label: "D", text: "Monthly repayment amount" },
      ],
      correctAnswer: "C",
      explanation:
        "The present value discounts all future payments back to today's dollars, giving their current worth.",
    },

    // ── Bivariate Data and Normal Distribution (4 questions) ──────────────────
    {
      id: "y12std2-bd1",
      unitSlug: "bivariate-data-normal-distribution",
      prompt:
        "A $z$-score of $2$ means the data value is:",
      latex: "z = \\frac{x - \\mu}{\\sigma}",
      choices: [
        { label: "A", text: "$2$ below the mean" },
        { label: "B", text: "$2$ above the mean" },
        { label: "C", text: "$2$ standard deviations above the mean" },
        { label: "D", text: "$2$ standard deviations below the mean" },
      ],
      correctAnswer: "C",
      explanation:
        "A $z$-score measures the number of standard deviations from the mean. $z = 2$ means $2$ standard deviations above.",
    },
    {
      id: "y12std2-bd2",
      unitSlug: "bivariate-data-normal-distribution",
      prompt: "A correlation coefficient of $r = 0.9$ indicates:",
      choices: [
        { label: "A", text: "No correlation" },
        { label: "B", text: "Weak negative correlation" },
        { label: "C", text: "Strong positive correlation" },
        { label: "D", text: "Perfect negative correlation" },
      ],
      correctAnswer: "C",
      explanation:
        "$r$ close to $+1$ indicates a strong positive linear relationship between the variables.",
    },
    {
      id: "y12std2-bd3",
      unitSlug: "bivariate-data-normal-distribution",
      prompt:
        "In a normal distribution, approximately $95\\%$ of data lies within:",
      choices: [
        { label: "A", text: "$1$ standard deviation of the mean" },
        { label: "B", text: "$2$ standard deviations of the mean" },
        { label: "C", text: "$3$ standard deviations of the mean" },
        { label: "D", text: "$4$ standard deviations of the mean" },
      ],
      correctAnswer: "B",
      explanation:
        "The empirical rule: $68\\%$ within $1\\sigma$, $95\\%$ within $2\\sigma$, $99.7\\%$ within $3\\sigma$.",
    },
    {
      id: "y12std2-bd4",
      unitSlug: "bivariate-data-normal-distribution",
      prompt:
        "A scatter plot where points follow a clear upward trend shows:",
      choices: [
        { label: "A", text: "No correlation" },
        { label: "B", text: "Negative correlation" },
        { label: "C", text: "Positive correlation" },
        { label: "D", text: "Non-linear correlation" },
      ],
      correctAnswer: "C",
      explanation:
        "An upward trend means as one variable increases, so does the other — positive correlation.",
    },

    // ── Networks and Critical Path Analysis (4 questions) ─────────────────────
    {
      id: "y12std2-nc1",
      unitSlug: "networks-critical-path-analysis",
      prompt:
        "The minimum number of edges to connect $4$ vertices without cycles (a spanning tree) is:",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$4$" },
        { label: "D", text: "$6$" },
      ],
      correctAnswer: "B",
      explanation:
        "A spanning tree on $n$ vertices has $n - 1$ edges. For $n = 4$: $3$ edges.",
    },
    {
      id: "y12std2-nc2",
      unitSlug: "networks-critical-path-analysis",
      prompt:
        "The critical path through a project network is the:",
      choices: [
        { label: "A", text: "Shortest path from start to finish" },
        { label: "B", text: "Longest path from start to finish" },
        { label: "C", text: "Path with the fewest activities" },
        { label: "D", text: "Any path that completes the project" },
      ],
      correctAnswer: "B",
      explanation:
        "The critical path is the longest path through the network — it determines the minimum project duration.",
    },
    {
      id: "y12std2-nc3",
      unitSlug: "networks-critical-path-analysis",
      prompt:
        "Activity $A$ takes $3$ days. After $A$, activities $B$ (4 days) and $C$ (2 days) can run simultaneously. The minimum total time is:",
      choices: [
        { label: "A", text: "$7$ days" },
        { label: "B", text: "$9$ days" },
        { label: "C", text: "$5$ days" },
        { label: "D", text: "$3$ days" },
      ],
      correctAnswer: "A",
      explanation:
        "$3 + \\max(4, 2) = 3 + 4 = 7$ days.",
    },
    {
      id: "y12std2-nc4",
      unitSlug: "networks-critical-path-analysis",
      prompt:
        "An Euler path (traversing every edge exactly once) exists in a network when:",
      choices: [
        { label: "A", text: "All vertices have even degree" },
        { label: "B", text: "Exactly two vertices have odd degree" },
        { label: "C", text: "All vertices have odd degree" },
        { label: "D", text: "No vertices are connected to more than two edges" },
      ],
      correctAnswer: "B",
      explanation:
        "An Euler path exists when exactly two vertices have odd degree (the start and end vertices).",
    },
  ],
};
