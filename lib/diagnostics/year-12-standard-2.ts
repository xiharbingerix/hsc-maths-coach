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
      slug: "investment-loans",
      title: "Investment and Loans",
      startHref: "/course/year-12-standard-2/investment-loans",
    },
    {
      slug: "annuities",
      title: "Annuities",
      startHref: "/course/year-12-standard-2/annuities",
    },
    {
      slug: "trigonometry",
      title: "Trigonometry",
      startHref: "/course/year-12-standard-2/trigonometry",
    },
    {
      slug: "ratios-rates",
      title: "Rates and Ratios",
      startHref: "/course/year-12-standard-2/ratios-rates",
    },
    {
      slug: "network-flow",
      title: "Network Flow",
      startHref: "/course/year-12-standard-2/network-flow",
    },
    {
      slug: "critical-path-analysis",
      title: "Critical Path Analysis",
      startHref: "/course/year-12-standard-2/critical-path-analysis",
    },
    {
      slug: "bivariate-data",
      title: "Bivariate Data Analysis",
      startHref: "/course/year-12-standard-2/bivariate-data",
    },
    {
      slug: "probability",
      title: "Relative Frequency and Probability",
      startHref: "/course/year-12-standard-2/probability",
    },
    {
      slug: "normal-distribution",
      title: "The Normal Distribution",
      startHref: "/course/year-12-standard-2/normal-distribution",
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

    // ── Investment and Loans (4 questions) ────────────────────────────────────
    {
      id: "y12std2-il1",
      unitSlug: "investment-loans",
      prompt:
        "$5000 is invested at $6\\%$ p.a. compounded annually for $4$ years. The final amount is closest to:",
      latex: "A = P(1+r)^n",
      choices: [
        { label: "A", text: "$\\$5600$" },
        { label: "B", text: "$\\$6312$" },
        { label: "C", text: "$\\$7200$" },
        { label: "D", text: "$\\$8000$" },
      ],
      correctAnswer: "B",
      explanation:
        "$A = 5000 \\times (1.06)^4 = 5000 \\times 1.2625 \\approx \\$6312$.",
    },
    {
      id: "y12std2-il2",
      unitSlug: "investment-loans",
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
      id: "y12std2-il3",
      unitSlug: "investment-loans",
      prompt:
        "An asset worth $\\$12\\,000$ depreciates at $20\\%$ p.a. (declining balance). Its value after $2$ years is:",
      latex: "S = V_0(1 - r)^n",
      choices: [
        { label: "A", text: "$\\$7680$" },
        { label: "B", text: "$\\$8000$" },
        { label: "C", text: "$\\$9600$" },
        { label: "D", text: "$\\$10\\,200$" },
      ],
      correctAnswer: "A",
      explanation:
        "$S = 12000 \\times (0.80)^2 = 12000 \\times 0.64 = \\$7680$.",
    },
    {
      id: "y12std2-il4",
      unitSlug: "investment-loans",
      prompt:
        "$\\$8000$ is invested at $4\\%$ p.a. compounded annually. The interest earned after $1$ year is:",
      choices: [
        { label: "A", text: "$\\$160$" },
        { label: "B", text: "$\\$320$" },
        { label: "C", text: "$\\$480$" },
        { label: "D", text: "$\\$640$" },
      ],
      correctAnswer: "B",
      explanation:
        "Interest $= 8000 \\times 0.04 = \\$320$. (After 1 year, compound and simple give the same result.)",
    },

    // ── Annuities (4 questions) ────────────────────────────────────────────────
    {
      id: "y12std2-an1",
      unitSlug: "annuities",
      prompt:
        "A loan has monthly repayments of $\\$450$ for $3$ years. The total amount repaid is:",
      choices: [
        { label: "A", text: "$\\$10\\,800$" },
        { label: "B", text: "$\\$14\\,400$" },
        { label: "C", text: "$\\$16\\,200$" },
        { label: "D", text: "$\\$18\\,000$" },
      ],
      correctAnswer: "C",
      explanation: "$\\$450 \\times 36 \\text{ months} = \\$16\\,200$.",
    },
    {
      id: "y12std2-an2",
      unitSlug: "annuities",
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
    {
      id: "y12std2-an3",
      unitSlug: "annuities",
      prompt:
        "A savings account starts with $\\$1000$. Each month $\\$200$ is deposited and $2\\%$ monthly interest is added. The recurrence relation is:",
      choices: [
        { label: "A", text: "$S_{n+1} = 1.02\\,S_n - 200$" },
        { label: "B", text: "$S_{n+1} = S_n + 200$" },
        { label: "C", text: "$S_{n+1} = 1.02\\,S_n + 200$" },
        { label: "D", text: "$S_{n+1} = 0.98\\,S_n + 200$" },
      ],
      correctAnswer: "C",
      explanation:
        "Apply interest first (multiply by $1.02$), then add the deposit: $S_{n+1} = 1.02\\,S_n + 200$.",
    },
    {
      id: "y12std2-an4",
      unitSlug: "annuities",
      prompt:
        "A loan of $\\$10\\,000$ has balance recurrence $B_{n+1} = 1.005\\,B_n - M$. If $B_0 = 10\\,000$ and $M = 150$, then $B_1$ is:",
      choices: [
        { label: "A", text: "$\\$9900$" },
        { label: "B", text: "$\\$9900.50$" },
        { label: "C", text: "$\\$9950$" },
        { label: "D", text: "$\\$10\\,050$" },
      ],
      correctAnswer: "A",
      explanation:
        "$B_1 = 1.005 \\times 10\\,000 - 150 = 10\\,050 - 150 = \\$9900$.",
    },

    // ── Trigonometry (4 questions) ────────────────────────────────────────────
    {
      id: "y12std2-tr1",
      unitSlug: "trigonometry",
      prompt:
        "Using the sine rule: in a triangle, $a = 8$, $A = 30^\\circ$, $B = 60^\\circ$. Find $b$.",
      latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B}",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$8\\sqrt{3}$" },
        { label: "C", text: "$4\\sqrt{3}$" },
        { label: "D", text: "$16$" },
      ],
      correctAnswer: "B",
      explanation:
        "$b = \\dfrac{8 \\sin 60^\\circ}{\\sin 30^\\circ} = \\dfrac{8 \\times \\frac{\\sqrt{3}}{2}}{\\frac{1}{2}} = 8\\sqrt{3}$.",
    },
    {
      id: "y12std2-tr2",
      unitSlug: "trigonometry",
      prompt:
        "Area of a triangle $= \\frac{1}{2}ab\\sin C$. With $a = 6$, $b = 8$, $C = 30^\\circ$, the area is:",
      latex: "A = \\tfrac{1}{2}ab\\sin C",
      choices: [
        { label: "A", text: "$6$" },
        { label: "B", text: "$8$" },
        { label: "C", text: "$12$" },
        { label: "D", text: "$24$" },
      ],
      correctAnswer: "C",
      explanation:
        "$A = \\frac{1}{2} \\times 6 \\times 8 \\times \\sin 30^\\circ = 24 \\times 0.5 = 12$.",
    },
    {
      id: "y12std2-tr3",
      unitSlug: "trigonometry",
      prompt: "$\\cos(60^\\circ) =$",
      choices: [
        { label: "A", text: "$\\dfrac{1}{2}$" },
        { label: "B", text: "$\\dfrac{\\sqrt{3}}{2}$" },
        { label: "C", text: "$\\dfrac{\\sqrt{2}}{2}$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "A",
      explanation: "$\\cos(60^\\circ) = \\dfrac{1}{2}$.",
    },
    {
      id: "y12std2-tr4",
      unitSlug: "trigonometry",
      prompt:
        "Convert $60^\\circ$ to radians.",
      choices: [
        { label: "A", text: "$\\dfrac{\\pi}{2}$" },
        { label: "B", text: "$\\dfrac{\\pi}{3}$" },
        { label: "C", text: "$\\dfrac{\\pi}{4}$" },
        { label: "D", text: "$\\dfrac{\\pi}{6}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$60^\\circ \\times \\dfrac{\\pi}{180} = \\dfrac{60\\pi}{180} = \\dfrac{\\pi}{3}$.",
    },

    // ── Rates and Ratios (4 questions) ────────────────────────────────────────
    {
      id: "y12std2-rr1",
      unitSlug: "ratios-rates",
      prompt:
        "A person walks $5$ km on a bearing of $090^\\circ$ then $12$ km on a bearing of $000^\\circ$. The straight-line distance from the start is:",
      choices: [
        { label: "A", text: "$13$ km" },
        { label: "B", text: "$17$ km" },
        { label: "C", text: "$60$ km" },
        { label: "D", text: "$169$ km" },
      ],
      correctAnswer: "A",
      explanation:
        "The two legs are perpendicular. $d = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ km.",
    },
    {
      id: "y12std2-rr2",
      unitSlug: "ratios-rates",
      prompt: "Simplify the ratio $15 : 25$.",
      choices: [
        { label: "A", text: "$1 : 2$" },
        { label: "B", text: "$3 : 5$" },
        { label: "C", text: "$5 : 3$" },
        { label: "D", text: "$2 : 1$" },
      ],
      correctAnswer: "B",
      explanation: "Divide both terms by $5$: $15 : 25 = 3 : 5$.",
    },
    {
      id: "y12std2-rr3",
      unitSlug: "ratios-rates",
      prompt:
        "A car travels $240$ km in $3$ hours. Its average speed is:",
      choices: [
        { label: "A", text: "$60$ km/h" },
        { label: "B", text: "$70$ km/h" },
        { label: "C", text: "$80$ km/h" },
        { label: "D", text: "$90$ km/h" },
      ],
      correctAnswer: "C",
      explanation: "$\\text{Speed} = \\dfrac{240}{3} = 80$ km/h.",
    },
    {
      id: "y12std2-rr4",
      unitSlug: "ratios-rates",
      prompt:
        "$\\$360$ is shared in the ratio $2 : 3 : 4$. The smallest share is:",
      choices: [
        { label: "A", text: "$\\$60$" },
        { label: "B", text: "$\\$80$" },
        { label: "C", text: "$\\$100$" },
        { label: "D", text: "$\\$120$" },
      ],
      correctAnswer: "B",
      explanation:
        "Total parts $= 9$. One part $= 360 \\div 9 = 40$. Smallest share (2 parts) $= 2 \\times 40 = \\$80$.",
    },

    // ── Network Flow (4 questions) ────────────────────────────────────────────
    {
      id: "y12std2-nf1",
      unitSlug: "network-flow",
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
      id: "y12std2-nf2",
      unitSlug: "network-flow",
      prompt:
        "An open Euler path (traversing every edge exactly once, starting and ending at different vertices) exists when:",
      choices: [
        { label: "A", text: "All vertices have even degree" },
        { label: "B", text: "Exactly two vertices have odd degree" },
        { label: "C", text: "All vertices have odd degree" },
        { label: "D", text: "No vertex has degree greater than 2" },
      ],
      correctAnswer: "B",
      explanation:
        "An open Euler path exists when exactly two vertices have odd degree (the start and end vertices).",
    },
    {
      id: "y12std2-nf3",
      unitSlug: "network-flow",
      prompt:
        "In a network, the degree of vertex $A$ is the:",
      choices: [
        { label: "A", text: "Number of vertices in the network" },
        { label: "B", text: "Number of edges incident to vertex $A$" },
        { label: "C", text: "Weight of the heaviest edge at $A$" },
        { label: "D", text: "Distance from $A$ to the nearest vertex" },
      ],
      correctAnswer: "B",
      explanation:
        "The degree of a vertex counts the number of edges that connect to it.",
    },
    {
      id: "y12std2-nf4",
      unitSlug: "network-flow",
      prompt:
        "A path through a network visits each vertex:",
      choices: [
        { label: "A", text: "At most once" },
        { label: "B", text: "Exactly twice" },
        { label: "C", text: "At least once" },
        { label: "D", text: "Any number of times" },
      ],
      correctAnswer: "A",
      explanation:
        "A path visits each vertex at most once. A circuit is a path that returns to its starting vertex.",
    },

    // ── Critical Path Analysis (4 questions) ──────────────────────────────────
    {
      id: "y12std2-cp1",
      unitSlug: "critical-path-analysis",
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
      id: "y12std2-cp2",
      unitSlug: "critical-path-analysis",
      prompt:
        "Activity $A$ takes $3$ days. After $A$, activities $B$ ($4$ days) and $C$ ($2$ days) can run simultaneously. The minimum total time is:",
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
      id: "y12std2-cp3",
      unitSlug: "critical-path-analysis",
      prompt:
        "The float of a non-critical activity is:",
      choices: [
        { label: "A", text: "Its duration in days" },
        { label: "B", text: "The maximum delay it can have without delaying the project" },
        { label: "C", text: "The total project completion time" },
        { label: "D", text: "The number of activities that depend on it" },
      ],
      correctAnswer: "B",
      explanation:
        "Float (slack) is the amount by which an activity can be delayed without extending the overall project duration.",
    },
    {
      id: "y12std2-cp4",
      unitSlug: "critical-path-analysis",
      prompt:
        "On a Gantt chart, the critical path activities are shown as:",
      choices: [
        { label: "A", text: "Dashed bars" },
        { label: "B", text: "Bars with no slack (no gap after them before the next activity must start)" },
        { label: "C", text: "Bars that are always the longest" },
        { label: "D", text: "Bars that start at time zero" },
      ],
      correctAnswer: "B",
      explanation:
        "Critical activities have zero float, so their bars on a Gantt chart have no slack gap — any delay extends the project.",
    },

    // ── Bivariate Data Analysis (4 questions) ─────────────────────────────────
    {
      id: "y12std2-bd1",
      unitSlug: "bivariate-data",
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
      id: "y12std2-bd2",
      unitSlug: "bivariate-data",
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
    {
      id: "y12std2-bd3",
      unitSlug: "bivariate-data",
      prompt:
        "The regression equation $\\hat{y} = 2x + 3$ predicts that when $x = 5$, $\\hat{y}$ equals:",
      choices: [
        { label: "A", text: "$10$" },
        { label: "B", text: "$13$" },
        { label: "C", text: "$15$" },
        { label: "D", text: "$25$" },
      ],
      correctAnswer: "B",
      explanation: "$\\hat{y} = 2(5) + 3 = 10 + 3 = 13$.",
    },
    {
      id: "y12std2-bd4",
      unitSlug: "bivariate-data",
      prompt:
        "A data point has actual value $y = 18$ and predicted value $\\hat{y} = 15$. The residual is:",
      choices: [
        { label: "A", text: "$-3$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$15$" },
        { label: "D", text: "$33$" },
      ],
      correctAnswer: "B",
      explanation:
        "Residual $=$ actual $-$ predicted $= 18 - 15 = 3$. A positive residual means the actual value is above the regression line.",
    },

    // ── Relative Frequency and Probability (4 questions) ──────────────────────
    {
      id: "y12std2-pr1",
      unitSlug: "probability",
      prompt:
        "A fair die is rolled. The probability of rolling a number greater than $4$ is:",
      choices: [
        { label: "A", text: "$\\dfrac{1}{6}$" },
        { label: "B", text: "$\\dfrac{1}{3}$" },
        { label: "C", text: "$\\dfrac{1}{2}$" },
        { label: "D", text: "$\\dfrac{2}{3}$" },
      ],
      correctAnswer: "B",
      explanation:
        "Numbers greater than $4$ are $\\{5, 6\\}$ — two outcomes out of $6$. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.",
    },
    {
      id: "y12std2-pr2",
      unitSlug: "probability",
      prompt:
        "If $P(A) = 0.35$, then $P(A') =$",
      choices: [
        { label: "A", text: "$0.35$" },
        { label: "B", text: "$0.55$" },
        { label: "C", text: "$0.65$" },
        { label: "D", text: "$1.35$" },
      ],
      correctAnswer: "C",
      explanation:
        "$P(A') = 1 - P(A) = 1 - 0.35 = 0.65$.",
    },
    {
      id: "y12std2-pr3",
      unitSlug: "probability",
      prompt:
        "A bag contains $3$ red and $2$ blue marbles. One marble is drawn without looking. The probability it is red is:",
      choices: [
        { label: "A", text: "$\\dfrac{2}{5}$" },
        { label: "B", text: "$\\dfrac{3}{5}$" },
        { label: "C", text: "$\\dfrac{1}{3}$" },
        { label: "D", text: "$\\dfrac{2}{3}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$P(\\text{red}) = \\dfrac{3}{3+2} = \\dfrac{3}{5}$.",
    },
    {
      id: "y12std2-pr4",
      unitSlug: "probability",
      prompt:
        "Events $A$ and $B$ are independent with $P(A) = 0.4$ and $P(B) = 0.5$. Then $P(A \\text{ and } B) =$",
      choices: [
        { label: "A", text: "$0.1$" },
        { label: "B", text: "$0.2$" },
        { label: "C", text: "$0.45$" },
        { label: "D", text: "$0.9$" },
      ],
      correctAnswer: "B",
      explanation:
        "For independent events, $P(A \\text{ and } B) = P(A) \\times P(B) = 0.4 \\times 0.5 = 0.2$.",
    },

    // ── The Normal Distribution (4 questions) ─────────────────────────────────
    {
      id: "y12std2-nd1",
      unitSlug: "normal-distribution",
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
      id: "y12std2-nd2",
      unitSlug: "normal-distribution",
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
      id: "y12std2-nd3",
      unitSlug: "normal-distribution",
      prompt:
        "A data set has mean $\\mu = 50$ and standard deviation $\\sigma = 5$. The $z$-score for $x = 60$ is:",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$2$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$10$" },
      ],
      correctAnswer: "B",
      explanation:
        "$z = \\dfrac{60 - 50}{5} = \\dfrac{10}{5} = 2$.",
    },
    {
      id: "y12std2-nd4",
      unitSlug: "normal-distribution",
      prompt:
        "In a normal distribution with mean $100$ and standard deviation $15$, the interval containing approximately $68\\%$ of values is:",
      choices: [
        { label: "A", text: "$70$ to $130$" },
        { label: "B", text: "$85$ to $115$" },
        { label: "C", text: "$55$ to $145$" },
        { label: "D", text: "$100$ to $115$" },
      ],
      correctAnswer: "B",
      explanation:
        "$68\\%$ lies within $1$ standard deviation: $100 - 15 = 85$ to $100 + 15 = 115$.",
    },
  ],
};
