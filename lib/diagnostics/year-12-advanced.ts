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
    {
      id: "y12adv-rich-1",
      unitSlug: "functions-graphing-techniques",
      prompt:
        "A ball is launched from a platform. Its height (metres) after $t$ seconds is $h(t)=-5t^2+20t+1$.",
      explanation:
        "This item links quadratic modelling, gradient ideas and interpretation of physical constraints.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt: "The ball reaches its maximum height at which time?",
          choices: [
            { label: "A", text: "$t=1$" },
            { label: "B", text: "$t=2$" },
            { label: "C", text: "$t=3$" },
            { label: "D", text: "$t=4$" },
          ],
          correctAnswer: "B",
          hint: "Use the vertex time $t=-\\dfrac{b}{2a}$ for $at^2+bt+c$.",
          explanation:
            "Here $a=-5$ and $b=20$, so $t=-\\dfrac{20}{2(-5)}=2$ seconds.",
          assessedUnitSlug: "functions-graphing-techniques",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "What is the maximum height reached by the ball?",
          choices: [
            { label: "A", text: "$11$ m" },
            { label: "B", text: "$16$ m" },
            { label: "C", text: "$21$ m" },
            { label: "D", text: "$26$ m" },
          ],
          correctAnswer: "C",
          hint: "Substitute the time from part (a) into $h(t)$.",
          explanation:
            "$h(2)=-5(4)+20(2)+1=-20+40+1=21$ metres.",
          assessedUnitSlug: "functions-graphing-techniques",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "At what time is the instantaneous velocity zero?",
          choices: [
            { label: "A", text: "$t=1$" },
            { label: "B", text: "$t=2$" },
            { label: "C", text: "$t=2.5$" },
            { label: "D", text: "$t=4$" },
          ],
          correctAnswer: "B",
          hint: "Differentiate height to get velocity and set it to zero.",
          explanation:
            "$v(t)=h'(t)=-10t+20$. Solve $-10t+20=0$ to get $t=2$.",
          assessedUnitSlug: "differential-calculus",
        },
      ],
    },
    {
      id: "y12adv-rich-2",
      unitSlug: "trigonometric-functions-graphs",
      prompt:
        "A tidal model is $T(t)=2\\sin\\left(t-\\dfrac{\\pi}{6}\\right)+1$ for $0\\le t\\le2\\pi$.",
      explanation:
        "This item checks trig graph features, solving equations and derivative transfer.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the period of $T(t)$?",
          choices: [
            { label: "A", text: "$\\dfrac{\\pi}{2}$" },
            { label: "B", text: "$\\pi$" },
            { label: "C", text: "$2\\pi$" },
            { label: "D", text: "$4\\pi$" },
          ],
          correctAnswer: "C",
          hint: "A horizontal shift does not change period for sine.",
          explanation:
            "The coefficient of $t$ is $1$, so the period remains $2\\pi$.",
          assessedUnitSlug: "trigonometric-functions-graphs",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "How many solutions does $T(t)=1$ have in $[0,2\\pi]$?",
          choices: [
            { label: "A", text: "0" },
            { label: "B", text: "1" },
            { label: "C", text: "2" },
            { label: "D", text: "3" },
          ],
          correctAnswer: "C",
          hint:
            "Set $2\\sin(t-\\pi/6)+1=1$ and solve for one full cycle.",
          explanation:
            "Equation becomes $\\sin(t-\\pi/6)=0$. Over one full cycle there are two zeros, so there are 2 solutions.",
          assessedUnitSlug: "trigonometric-functions-graphs",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "What is $T'(t)$ evaluated at $t=\\dfrac{2\\pi}{3}$?",
          choices: [
            { label: "A", text: "$-1$" },
            { label: "B", text: "$0$" },
            { label: "C", text: "$1$" },
            { label: "D", text: "$2$" },
          ],
          correctAnswer: "B",
          hint: "Differentiate then substitute $t=2\\pi/3$.",
          explanation:
            "$T'(t)=2\\cos(t-\\pi/6)$. At $t=2\\pi/3$, the angle is $\\pi/2$, so $T'(t)=2\\cos(\\pi/2)=0$.",
          assessedUnitSlug: "differential-calculus",
        },
      ],
    },
    {
      id: "y12adv-rich-3",
      unitSlug: "differential-calculus",
      prompt:
        "A function has derivative $f'(x)=3x^2-6x$ and satisfies $f(0)=4$.",
      explanation:
        "This item connects antidifferentiation, stationary points and area from a derivative graph.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Which formula is correct for $f(x)$?",
          choices: [
            { label: "A", text: "$f(x)=x^3-3x^2+4$" },
            { label: "B", text: "$f(x)=x^3-3x^2$" },
            { label: "C", text: "$f(x)=3x^2-6x+4$" },
            { label: "D", text: "$f(x)=x^3-6x+4$" },
          ],
          correctAnswer: "A",
          hint: "Integrate $f'(x)$ then use $f(0)=4$.",
          explanation:
            "$f(x)=\\int(3x^2-6x)dx=x^3-3x^2+C$. Since $f(0)=4$, $C=4$.",
          assessedUnitSlug: "integral-calculus",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "How many stationary points does $f$ have?",
          choices: [
            { label: "A", text: "0" },
            { label: "B", text: "1" },
            { label: "C", text: "2" },
            { label: "D", text: "3" },
          ],
          correctAnswer: "C",
          hint: "Solve $f'(x)=0$.",
          explanation:
            "$3x^2-6x=3x(x-2)=0$, so $x=0$ and $x=2$. Two stationary points.",
          assessedUnitSlug: "differential-calculus",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "What is $\\int_0^2 f'(x)\\,dx$?",
          choices: [
            { label: "A", text: "$-4$" },
            { label: "B", text: "$0$" },
            { label: "C", text: "$4$" },
            { label: "D", text: "$8$" },
          ],
          correctAnswer: "A",
          hint: "Use an antiderivative or $f(2)-f(0)$.",
          explanation:
            "$\\int_0^2(3x^2-6x)dx=[x^3-3x^2]_0^2=(8-12)-0=-4$.",
          assessedUnitSlug: "integral-calculus",
        },
      ],
    },
    {
      id: "y12adv-rich-4",
      unitSlug: "integral-calculus",
      prompt:
        "Consider $g(x)=x^2-4x+3$ and the interval $[1,3]$.",
      explanation:
        "This item checks graph structure first, then area and average value reasoning.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Which statement about intercepts is true?",
          choices: [
            { label: "A", text: "No real x-intercepts" },
            { label: "B", text: "One repeated x-intercept at $x=2$" },
            { label: "C", text: "x-intercepts at $x=1$ and $x=3$" },
            { label: "D", text: "x-intercepts at $x=-1$ and $x=3$" },
          ],
          correctAnswer: "C",
          hint: "Factor $x^2-4x+3$.",
          explanation:
            "$x^2-4x+3=(x-1)(x-3)$, so intercepts are $x=1$ and $x=3$.",
          assessedUnitSlug: "functions-graphing-techniques",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "The exact area between the curve and x-axis on $[1,3]$ is:",
          choices: [
            { label: "A", text: "$\\dfrac{2}{3}$" },
            { label: "B", text: "$\\dfrac{4}{3}$" },
            { label: "C", text: "$2$" },
            { label: "D", text: "$\\dfrac{8}{3}$" },
          ],
          correctAnswer: "B",
          hint:
            "Function is non-positive on this interval, so take absolute value of the signed integral.",
          explanation:
            "$\\int_1^3 g(x)dx=[x^3/3-2x^2+3x]_1^3=-4/3$. Area is $4/3$.",
          assessedUnitSlug: "integral-calculus",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "What is the average value of $g(x)$ on $[1,3]$?",
          choices: [
            { label: "A", text: "$-\\dfrac{2}{3}$" },
            { label: "B", text: "$-\\dfrac{1}{3}$" },
            { label: "C", text: "$\\dfrac{1}{3}$" },
            { label: "D", text: "$\\dfrac{2}{3}$" },
          ],
          correctAnswer: "A",
          hint: "Average value is $\\dfrac{1}{b-a}\\int_a^b g(x)dx$.",
          explanation:
            "Average value $=\\dfrac{1}{2}(-4/3)=-2/3$.",
          assessedUnitSlug: "integral-calculus",
        },
      ],
    },
    {
      id: "y12adv-rich-5",
      unitSlug: "sequences-series-financial-maths",
      prompt:
        "A debt starts at $B_0=10000$ dollars and grows by 6% per year before a payment of $2500$ is made at year-end.",
      explanation:
        "This item tests recurrence interpretation, one-step evaluation and long-term trend.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Which recurrence models the balance?",
          choices: [
            { label: "A", text: "$B_{n+1}=1.06B_n+2500$" },
            { label: "B", text: "$B_{n+1}=1.06(B_n-2500)$" },
            { label: "C", text: "$B_{n+1}=1.06B_n-2500$" },
            { label: "D", text: "$B_{n+1}=B_n-2500$" },
          ],
          correctAnswer: "C",
          hint: "Interest first, payment second.",
          explanation:
            "Balance increases to $1.06B_n$, then payment subtracts $2500$.",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "What is $B_1$?",
          choices: [
            { label: "A", text: "$7800$" },
            { label: "B", text: "$8100$" },
            { label: "C", text: "$8600$" },
            { label: "D", text: "$10600$" },
          ],
          correctAnswer: "B",
          hint: "Substitute $B_0=10000$ into the recurrence.",
          explanation:
            "$B_1=1.06(10000)-2500=10600-2500=8100$.",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "If this pattern continues, the balance will eventually:",
          choices: [
            { label: "A", text: "Grow without bound" },
            { label: "B", text: "Approach $2500$" },
            { label: "C", text: "Reach $0$ then stay non-positive" },
            { label: "D", text: "Oscillate forever" },
          ],
          correctAnswer: "C",
          hint:
            "Compare yearly payment with yearly interest when the balance is moderate.",
          explanation:
            "The fixed payment is large enough to reduce balance over time, so debt is eventually cleared.",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
      ],
    },
    {
      id: "y12adv-rich-6",
      unitSlug: "sequences-series-financial-maths",
      prompt:
        "Two savings plans start with $5000$. Plan A compounds at 4% annually: $A_n=5000(1.04)^n$. Plan B adds simple interest $250$ each year: $B_n=5000+250n$.",
      explanation:
        "This item tests arithmetic vs geometric growth and comparison of models.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Which classification is correct?",
          choices: [
            { label: "A", text: "Both arithmetic" },
            { label: "B", text: "Both geometric" },
            { label: "C", text: "A geometric, B arithmetic" },
            { label: "D", text: "A arithmetic, B geometric" },
          ],
          correctAnswer: "C",
          hint: "Look for multiply-by-constant versus add-constant patterns.",
          explanation:
            "$A_n$ multiplies by $1.04$ each step (geometric). $B_n$ adds $250$ each step (arithmetic).",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "After 5 years, which statement is true?",
          choices: [
            { label: "A", text: "$A_5<B_5$ by about $100$" },
            { label: "B", text: "$A_5>B_5$ by about $100$" },
            { label: "C", text: "$A_5=B_5$" },
            { label: "D", text: "$A_5>B_5$ by about $500$" },
          ],
          correctAnswer: "A",
          hint: "Estimate $1.04^5\\approx1.21665$.",
          explanation:
            "$A_5\\approx5000(1.21665)=6083.25$ and $B_5=6250$, so $A_5<B_5$ by about $167$.",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "For large $n$, which plan eventually grows faster each year?",
          choices: [
            { label: "A", text: "Plan A" },
            { label: "B", text: "Plan B" },
            { label: "C", text: "Both same rate" },
            { label: "D", text: "Cannot be determined" },
          ],
          correctAnswer: "A",
          hint: "Exponential growth eventually beats linear growth.",
          explanation:
            "Plan A is exponential while Plan B is linear, so Plan A eventually has larger yearly increases.",
          assessedUnitSlug: "functions-graphing-techniques",
        },
      ],
    },
    {
      id: "y12adv-rich-7",
      unitSlug: "statistical-analysis",
      prompt:
        "Test scores are normally distributed with mean $70$ and standard deviation $4$.",
      explanation:
        "This item checks z-score fluency and transfer to sampling distributions.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "For a score of $78$, what is the z-score?",
          choices: [
            { label: "A", text: "$1$" },
            { label: "B", text: "$1.5$" },
            { label: "C", text: "$2$" },
            { label: "D", text: "$2.5$" },
          ],
          correctAnswer: "C",
          hint: "Use $z=\\dfrac{x-\\mu}{\\sigma}$.",
          explanation:
            "$z=\\dfrac{78-70}{4}=2$.",
          assessedUnitSlug: "statistical-analysis",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "A z-score of 2 is approximately which percentile?",
          choices: [
            { label: "A", text: "50th" },
            { label: "B", text: "84th" },
            { label: "C", text: "95th to 98th" },
            { label: "D", text: "99.9th" },
          ],
          correctAnswer: "C",
          hint: "Recall common normal table values near $z=2$.",
          explanation:
            "For $z=2$, cumulative probability is about 0.977, so around the 98th percentile.",
          assessedUnitSlug: "statistical-analysis",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "If sample size is $n=16$, what is the standard deviation of the sample mean?",
          choices: [
            { label: "A", text: "$4$" },
            { label: "B", text: "$2$" },
            { label: "C", text: "$1$" },
            { label: "D", text: "$0.5$" },
          ],
          correctAnswer: "C",
          hint: "Use $\\sigma_{\\bar{x}}=\\dfrac{\\sigma}{\\sqrt{n}}$.",
          explanation:
            "$\\sigma_{\\bar{x}}=\\dfrac{4}{\\sqrt{16}}=\\dfrac{4}{4}=1$.",
          assessedUnitSlug: "statistical-analysis",
        },
      ],
    },
    {
      id: "y12adv-rich-8",
      unitSlug: "differential-calculus",
      prompt:
        "A business has revenue $R(x)=12x$ and cost $C(x)=x^2-18x+90$ (in hundreds of dollars), where $x$ is units sold.",
      explanation:
        "This item checks profit modelling, optimisation and interpretation in context.",
      questionParts: [
        {
          key: "a",
          label: "(a)",
          prompt:
            "Which expression gives profit $P(x)$?",
          choices: [
            { label: "A", text: "$x^2-30x+90$" },
            { label: "B", text: "$-x^2+30x-90$" },
            { label: "C", text: "$-x^2-6x+90$" },
            { label: "D", text: "$x^2+30x-90$" },
          ],
          correctAnswer: "B",
          hint: "Profit is revenue minus cost.",
          explanation:
            "$P(x)=R(x)-C(x)=12x-(x^2-18x+90)=-x^2+30x-90$.",
          assessedUnitSlug: "functions-graphing-techniques",
        },
        {
          key: "b",
          label: "(b)",
          prompt:
            "At what $x$ is profit maximised?",
          choices: [
            { label: "A", text: "$x=10$" },
            { label: "B", text: "$x=12$" },
            { label: "C", text: "$x=15$" },
            { label: "D", text: "$x=30$" },
          ],
          correctAnswer: "C",
          hint: "For a downward parabola, maximum at vertex or where $P'(x)=0$.",
          explanation:
            "$P'(x)=-2x+30=0$ gives $x=15$.",
          assessedUnitSlug: "differential-calculus",
        },
        {
          key: "c",
          label: "(c)",
          prompt:
            "What is the maximum profit in dollars?",
          choices: [
            { label: "A", text: "$13,500$" },
            { label: "B", text: "$13,500,000$" },
            { label: "C", text: "$1,350$" },
            { label: "D", text: "$135,000$" },
          ],
          correctAnswer: "A",
          hint: "Evaluate $P(15)$ and remember values are in hundreds of dollars.",
          explanation:
            "$P(15)=-225+450-90=135$ hundreds, so $13500$ dollars.",
          assessedUnitSlug: "sequences-series-financial-maths",
        },
      ],
    },
  ],
};
