import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 11 Mathematics Advanced",

  units: [
    {
      slug: "working-with-functions",
      title: "Working with Functions",
      startHref: "/course/year-11-advanced/working-with-functions",
    },
    {
      slug: "graph-transformations",
      title: "Graph Transformations",
      startHref: "/course/year-11-advanced/graph-transformations",
    },
    {
      slug: "trigonometry-measure-angles",
      title: "Trigonometry and Measure of Angles",
      startHref: "/course/year-11-advanced/trigonometry-measure-angles",
    },
    {
      slug: "trigonometric-identities-equations",
      title: "Trigonometric Identities and Equations",
      startHref:
        "/course/year-11-advanced/trigonometric-identities-equations",
    },
    {
      slug: "exponential-logarithmic-functions",
      title: "Exponential and Logarithmic Functions",
      startHref: "/course/year-11-advanced/exponential-logarithmic-functions",
    },
    {
      slug: "introduction-differentiation",
      title: "Introduction to Differentiation",
      startHref: "/course/year-11-advanced/introduction-differentiation",
    },
    {
      slug: "probability-data",
      title: "Probability and Data",
      startHref: "/course/year-11-advanced/probability-data",
    },
    {
      slug: "sequences-series",
      title: "Sequences and Series",
      startHref: "/course/year-11-advanced/sequences-series",
    },
    {
      slug: "integration",
      title: "Integration",
      startHref: "/course/year-11-advanced/integration",
    },
    {
      slug: "curve-sketching",
      title: "Curve Sketching",
      startHref: "/course/year-11-advanced/curve-sketching",
    },
    {
      slug: "exp-log-calculus",
      title: "Exponential and Logarithmic Calculus",
      startHref: "/course/year-11-advanced/exp-log-calculus",
    },
    {
      slug: "trig-calculus",
      title: "Trigonometric Calculus",
      startHref: "/course/year-11-advanced/trig-calculus",
    },
    {
      slug: "motion-rates",
      title: "Motion and Rates of Change",
      startHref: "/course/year-11-advanced/motion-rates",
    },
    {
      slug: "series-finance",
      title: "Series and Financial Mathematics",
      startHref: "/course/year-11-advanced/series-finance",
    },
    {
      slug: "graphs-equations",
      title: "Graphs and Equations",
      startHref: "/course/year-11-advanced/graphs-equations",
    },
    {
      slug: "bivariate-data",
      title: "Bivariate Data Analysis",
      startHref: "/course/year-11-advanced/bivariate-data",
    },
    {
      slug: "continuous-probability",
      title: "Continuous Probability Distributions",
      startHref: "/course/year-11-advanced/continuous-probability",
    },
  ],

  questions: [
    {
      id: "y11adv-d5-log-transform-domain",
      unitSlug: "working-with-functions",
      assessedUnitSlugs: ["graph-transformations", "graphs-equations"],
      difficulty: 5,
      targetMisconception:
        "Applies vertical transformations correctly but forgets that the horizontal shift changes the logarithm's domain and asymptote.",
      prompt:
        "Let $f(x)=\\ln(x-1)$ and $g(x)=2f(x-3)+1$. Which statement about $g$ is correct?",
      choices: [
        {
          label: "A",
          text: "The domain is $x>4$, the vertical asymptote is $x=4$, and the range is all real numbers.",
        },
        {
          label: "B",
          text: "The domain is $x>2$, the vertical asymptote is $x=2$, and the range is $y>1$.",
        },
        {
          label: "C",
          text: "The domain is $x>4$, the vertical asymptote is $x=1$, and the range is $y>1$.",
        },
        {
          label: "D",
          text: "The domain is all real numbers except $x=4$, the vertical asymptote is $x=4$, and the range is all real numbers.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "$g(x)=2\\ln((x-3)-1)+1=2\\ln(x-4)+1$. The logarithm requires $x-4>0$, so the domain is $x>4$ and the vertical asymptote is $x=4$. The vertical stretch and shift do not restrict the range.",
    },
    {
      id: "y11adv-d5-polynomial-end-behaviour",
      unitSlug: "curve-sketching",
      assessedUnitSlugs: ["working-with-functions", "graphs-equations"],
      difficulty: 5,
      targetMisconception:
        "Identifies the roots but treats a repeated root as a crossing or misses the negative leading coefficient's end behaviour.",
      prompt:
        "For $h(x)=-(x-2)^2(x+1)$, which description matches the graph?",
      choices: [
        {
          label: "A",
          text: "It crosses at $x=-1$, touches at $x=2$, rises to the left, and falls to the right.",
        },
        {
          label: "B",
          text: "It touches at $x=-1$, crosses at $x=2$, falls to the left, and rises to the right.",
        },
        {
          label: "C",
          text: "It crosses both roots and rises to the right because it is cubic.",
        },
        {
          label: "D",
          text: "It touches both roots and has the same end behaviour on both sides.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The root $x=-1$ has odd multiplicity, so the graph crosses there. The root $x=2$ has even multiplicity, so it touches there. The leading term is $-x^3$, so the graph rises left and falls right.",
    },
    {
      id: "y11adv-d5-trig-gradient-exact",
      unitSlug: "trigonometry-measure-angles",
      assessedUnitSlugs: ["trigonometric-identities-equations", "trig-calculus"],
      difficulty: 5,
      targetMisconception:
        "Evaluates the trig value but differentiates with respect to the wrong angle or drops the chain-rule factor.",
      prompt:
        "For $y=\\sin(2x)$, what are the value of $y$ and the gradient at $x=\\frac{\\pi}{3}$?",
      choices: [
        {
          label: "A",
          text: "$y=\\dfrac{\\sqrt{3}}{2}$ and gradient $=-1$",
        },
        {
          label: "B",
          text: "$y=\\dfrac{\\sqrt{3}}{2}$ and gradient $=-2$",
        },
        {
          label: "C",
          text: "$y=-\\dfrac{\\sqrt{3}}{2}$ and gradient $=-1$",
        },
        {
          label: "D",
          text: "$y=\\dfrac{1}{2}$ and gradient $=2$",
        },
      ],
      correctAnswer: "A",
      explanation:
        "At $x=\\frac{\\pi}{3}$, $2x=\\frac{2\\pi}{3}$, so $y=\\sin\\frac{2\\pi}{3}=\\frac{\\sqrt{3}}{2}$. Since $y'=2\\cos(2x)$, the gradient is $2\\cos\\frac{2\\pi}{3}=2(-\\frac12)=-1$.",
    },
    {
      id: "y11adv-d5-exp-log-tangent",
      unitSlug: "exponential-logarithmic-functions",
      assessedUnitSlugs: ["exp-log-calculus", "graphs-equations"],
      difficulty: 5,
      targetMisconception:
        "Solves the logarithmic equation but finds the tangent gradient using the function value instead of the derivative.",
      prompt:
        "The curve $y=e^x$ has a tangent at the point where $e^x=4$. Which equation is that tangent?",
      choices: [
        { label: "A", text: "$y=4x+4-4\\ln4$" },
        { label: "B", text: "$y=(\\ln4)x+4-\\ln4$" },
        { label: "C", text: "$y=4x$" },
        { label: "D", text: "$y=x+4-\\ln4$" },
      ],
      correctAnswer: "A",
      explanation:
        "The point is $(\\ln4,4)$. For $y=e^x$, the derivative is also $e^x$, so the gradient there is $4$. The tangent is $y-4=4(x-\\ln4)$, or $y=4x+4-4\\ln4$.",
    },
    {
      id: "y11adv-d5-motion-displacement",
      unitSlug: "motion-rates",
      assessedUnitSlugs: ["integration", "introduction-differentiation"],
      difficulty: 5,
      targetMisconception:
        "Uses velocity at the endpoints instead of integrating velocity and checking whether the particle changes direction.",
      prompt:
        "A particle has velocity $v(t)=3t^2-12t+9$ for $0\\leq t\\leq3$. Which statement about its displacement and distance travelled is correct?",
      choices: [
        {
          label: "A",
          text: "Displacement is $0$ and distance travelled is $8$.",
        },
        {
          label: "B",
          text: "Displacement is $0$ and distance travelled is $0$.",
        },
        {
          label: "C",
          text: "Displacement is $-9$ and distance travelled is $9$.",
        },
        {
          label: "D",
          text: "Displacement is $8$ and distance travelled is $8$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "$v(t)=3(t-1)(t-3)$ changes sign at $t=1$ in the interval. An antiderivative is $t^3-6t^2+9t$. The displacement from 0 to 3 is $0$. The signed area is $4$ from 0 to 1 and $-4$ from 1 to 3, so distance is $8$.",
    },
    {
      id: "y11adv-d5-sequence-finance-limit",
      unitSlug: "sequences-series",
      assessedUnitSlugs: ["series-finance"],
      difficulty: 5,
      targetMisconception:
        "Treats regular deposits as simple addition and ignores the geometric multiplier created by compound interest.",
      prompt:
        "An account starts at 0 dollars. At the end of each year, 1000 dollars is deposited, and the balance then earns 5% annual interest. Which expression gives the balance after 4 deposits and interest applications?",
      choices: [
        {
          label: "A",
          text: "$1000(1.05)+1000(1.05)^2+1000(1.05)^3+1000(1.05)^4$",
        },
        {
          label: "B",
          text: "$4000(1.05)^4$",
        },
        {
          label: "C",
          text: "$1000\\dfrac{1.05^4-1}{0.05}$",
        },
        {
          label: "D",
          text: "$1000+1000(1.05)+1000(1.05)^2+1000(1.05)^3$",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Because interest is applied after each end-of-year deposit, the first deposit earns interest four times and the last earns interest once. That gives $1000(1.05)+1000(1.05)^2+1000(1.05)^3+1000(1.05)^4$.",
    },
    {
      id: "y11adv-d5-probability-regression-risk",
      unitSlug: "probability-data",
      assessedUnitSlugs: ["bivariate-data", "continuous-probability"],
      difficulty: 5,
      targetMisconception:
        "Calculates a regression residual but interprets raw error without standardising against the residual distribution.",
      prompt:
        "A model predicts running time by $\\hat{t}=18-0.4x$, where $x$ is training hours and $t$ is minutes. For $x=15$, an athlete runs 10.5 min. Residuals are approximately normal with standard deviation 1.5 min. Which interpretation is best?",
      choices: [
        {
          label: "A",
          text: "The residual is $-1.5$ min, about 1 standard deviation faster than predicted.",
        },
        {
          label: "B",
          text: "The residual is $1.5$ min, about 1 standard deviation slower than predicted.",
        },
        {
          label: "C",
          text: "The residual is $7.5$ min, about 5 standard deviations slower than predicted.",
        },
        {
          label: "D",
          text: "The residual is $0$ because $18-0.4(15)=10.5$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The predicted time is $18-0.4(15)=12$ min. The residual is actual minus predicted, $10.5-12=-1.5$ min, which is one residual standard deviation below prediction. For running time, lower is faster.",
    },
    {
      id: "y11adv-d5-optimisation-area",
      unitSlug: "introduction-differentiation",
      assessedUnitSlugs: ["curve-sketching", "working-with-functions"],
      difficulty: 5,
      targetMisconception:
        "Finds a stationary point but does not use the constraint to build the correct quadratic or classify the turning point.",
      prompt:
        "A rectangle has perimeter 40 cm. If its width is $x$ cm, which statement about its maximum area is correct?",
      choices: [
        {
          label: "A",
          text: "Area $A=x(20-x)$, maximum area $100\\text{ cm}^2$ at $x=10$.",
        },
        {
          label: "B",
          text: "Area $A=x(40-x)$, maximum area $400\\text{ cm}^2$ at $x=20$.",
        },
        {
          label: "C",
          text: "Area $A=2x(20-x)$, maximum area $200\\text{ cm}^2$ at $x=10$.",
        },
        {
          label: "D",
          text: "Area increases without bound as $x$ increases.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "If width is $x$, the length is $20-x$ because $2L+2x=40$. Thus $A=x(20-x)=20x-x^2$, a downward-opening parabola with vertex at $x=10$ and maximum area $100\\text{ cm}^2$.",
    },
    {
      id: "y11adv-d5-trig-equation-domain",
      unitSlug: "trigonometric-identities-equations",
      assessedUnitSlugs: ["graphs-equations", "trigonometry-measure-angles"],
      difficulty: 5,
      targetMisconception:
        "Solves the reference-angle equation but ignores the transformed period and the restricted interval.",
      prompt:
        "How many solutions does $\\cos(2x)=\\frac12$ have for $0\\leq x\\leq2\\pi$?",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$4$" },
        { label: "D", text: "$6$" },
      ],
      correctAnswer: "C",
      explanation:
        "Let $u=2x$. Then $0\\leq u\\leq4\\pi$. The equation $\\cos u=\\frac12$ has two solutions in each $2\\pi$ cycle, so it has four solutions over $0\\leq u\\leq4\\pi$, hence four corresponding $x$ values.",
    },
    {
      id: "y11adv-d5-calculus-composite-rate",
      unitSlug: "exp-log-calculus",
      assessedUnitSlugs: ["trig-calculus", "motion-rates"],
      difficulty: 5,
      targetMisconception:
        "Differentiates each component separately but fails to combine the chain rule with rate interpretation.",
      prompt:
        "A displacement is modelled by $s(t)=e^{-t}\\sin t$. Which expression gives the velocity at time $t$, and what is $v(0)$?",
      choices: [
        {
          label: "A",
          text: "$v(t)=e^{-t}(\\cos t-\\sin t)$ and $v(0)=1$.",
        },
        {
          label: "B",
          text: "$v(t)=e^{-t}(\\sin t+\\cos t)$ and $v(0)=1$.",
        },
        {
          label: "C",
          text: "$v(t)=-e^{-t}\\sin t$ and $v(0)=0$.",
        },
        {
          label: "D",
          text: "$v(t)=e^{-t}\\cos t$ and $v(0)=1$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Use the product rule: $s'(t)=(-e^{-t})\\sin t+e^{-t}\\cos t=e^{-t}(\\cos t-\\sin t)$. At $t=0$, this is $1(1-0)=1$.",
    },
  ],
};
