import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 10 Mathematics Advanced",

  units: [
    {
      slug: "algebra-equations-linear-relationships",
      title: "Algebra, Equations and Linear Relationships",
      startHref:
        "/course/year-10-mathematics-advanced/algebra-equations-linear-relationships",
    },
    {
      slug: "geometrical-figures-circle-geometry",
      title: "Properties of Geometrical Figures and Circle Geometry",
      startHref:
        "/course/year-10-mathematics-advanced/geometrical-figures-circle-geometry",
    },
    {
      slug: "indices-exponentials-logarithms",
      title: "Indices, Exponentials and Logarithms",
      startHref:
        "/course/year-10-mathematics-advanced/indices-exponentials-logarithms",
    },
    {
      slug: "measurement-and-surds",
      title: "Measurement and Surds",
      startHref: "/course/year-10-mathematics-advanced/measurement-and-surds",
    },
    {
      slug: "quadratic-expressions-equations",
      title: "Quadratic Expressions and Equations",
      startHref:
        "/course/year-10-mathematics-advanced/quadratic-expressions-equations",
    },
    {
      slug: "trigonometry",
      title: "Trigonometry",
      startHref: "/course/year-10-mathematics-advanced/trigonometry",
    },
    {
      slug: "parabolas-rates-variation",
      title: "Parabolas, Rates of Change and Variation",
      startHref:
        "/course/year-10-mathematics-advanced/parabolas-rates-variation",
    },
    {
      slug: "probability",
      title: "Probability",
      startHref: "/course/year-10-mathematics-advanced/probability",
    },
    {
      slug: "single-variable-bivariate-statistics",
      title: "Single Variable and Bivariate Statistics",
      startHref:
        "/course/year-10-mathematics-advanced/single-variable-bivariate-statistics",
    },
    {
      slug: "functions-polynomials-graphs",
      title: "Functions, Polynomials and Other Graphs",
      startHref:
        "/course/year-10-mathematics-advanced/functions-polynomials-graphs",
    },
    {
      slug: "networks",
      title: "Networks",
      startHref: "/course/year-10-mathematics-advanced/networks",
    },
    {
      slug: "counting-principles",
      title: "Counting Principles",
      startHref: "/course/year-10-mathematics-advanced/counting-principles",
    },
    {
      slug: "financial-mathematics",
      title: "Financial Mathematics",
      startHref: "/course/year-10-mathematics-advanced/financial-mathematics",
    },
  ],

  questions: [
    {
      id: "y10adv-d5-plan-break-even",
      unitSlug: "algebra-equations-linear-relationships",
      assessedUnitSlugs: ["financial-mathematics"],
      difficulty: 5,
      targetMisconception:
        "Solves the equation but does not interpret which cost model is cheaper on either side of the break-even point.",
      prompt:
        "Plan A costs 12 dollars plus 3 dollars per lesson. Plan B costs 30 dollars with lessons included. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "They cost the same at 6 lessons; Plan A is cheaper for 4 lessons.",
        },
        {
          label: "B",
          text: "They cost the same at 6 lessons; Plan B is cheaper for 4 lessons.",
        },
        {
          label: "C",
          text: "They cost the same at 14 lessons; Plan A is cheaper for 4 lessons.",
        },
        {
          label: "D",
          text: "Plan A is always cheaper because its lesson rate is lower.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solve $12+3n=30$, giving $n=6$. For 4 lessons, Plan A costs $12+3(4)=24$ dollars, which is cheaper than 30 dollars.",
    },
    {
      id: "y10adv-d5-quadratic-graph-features",
      unitSlug: "quadratic-expressions-equations",
      assessedUnitSlugs: ["parabolas-rates-variation"],
      difficulty: 5,
      targetMisconception:
        "Factors the quadratic but treats the roots as the vertex or misses the axis of symmetry.",
      prompt:
        "For $y=(x-1)(x-5)$, which graph features are correct?",
      choices: [
        {
          label: "A",
          text: "Roots $x=1,5$ and vertex $x=3$.",
        },
        {
          label: "B",
          text: "Roots $x=-1,-5$ and vertex $x=-3$.",
        },
        {
          label: "C",
          text: "Roots $x=1,5$ and vertex $x=5$.",
        },
        {
          label: "D",
          text: "Roots $x=3,5$ and vertex $x=1$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The roots occur when each factor is zero: $x=1$ and $x=5$. The axis of symmetry is halfway between the roots, so the vertex has $x=(1+5)/2=3$.",
    },
    {
      id: "y10adv-d5-compound-doubling",
      unitSlug: "indices-exponentials-logarithms",
      assessedUnitSlugs: ["financial-mathematics"],
      difficulty: 5,
      targetMisconception:
        "Uses simple-interest growth or adds percentages instead of modelling repeated percentage change exponentially.",
      prompt:
        "An investment grows by $8\\%$ each year. After how many whole years is it first at least double its starting value?",
      choices: [
        { label: "A", text: "$10$ years" },
        { label: "B", text: "$9$ years" },
        { label: "C", text: "$13$ years" },
        { label: "D", text: "$25$ years" },
      ],
      correctAnswer: "A",
      explanation:
        "Doubling requires $(1.08)^n\\geq2$. Since $1.08^9\\approx1.999<2$ and $1.08^{10}\\approx2.159$, the first whole year is 10.",
    },
    {
      id: "y10adv-d5-ramp-trig-surd",
      unitSlug: "trigonometry",
      assessedUnitSlugs: ["measurement-and-surds"],
      difficulty: 5,
      targetMisconception:
        "Uses a trigonometric ratio with the wrong side pairing or rounds away the exact surd relationship.",
      prompt:
        "A ramp makes a $30^\\circ$ angle with the ground and rises $1.5$ m vertically. What is the ramp length?",
      choices: [
        { label: "A", text: "$3$ m" },
        { label: "B", text: "$1.5\\sqrt{3}$ m" },
        { label: "C", text: "$0.75$ m" },
        { label: "D", text: "$3\\sqrt{3}$ m" },
      ],
      correctAnswer: "A",
      explanation:
        "The vertical rise is opposite the $30^\\circ$ angle and the ramp length is the hypotenuse. Since $\\sin30^\\circ=1/2$, $1.5/L=1/2$, so $L=3$ m.",
    },
    {
      id: "y10adv-d5-circle-tangent-radius",
      unitSlug: "geometrical-figures-circle-geometry",
      assessedUnitSlugs: ["measurement-and-surds"],
      difficulty: 5,
      targetMisconception:
        "Knows tangent-radius facts but does not use the right angle to choose the correct Pythagorean relationship.",
      prompt:
        "From point $P$, a tangent $PT$ touches a circle at $T$. The centre is $O$, $OP=13$ cm and radius $OT=5$ cm. What is $PT$?",
      choices: [
        { label: "A", text: "$8$ cm" },
        { label: "B", text: "$12$ cm" },
        { label: "C", text: "$\\sqrt{194}$ cm" },
        { label: "D", text: "$18$ cm" },
      ],
      correctAnswer: "B",
      explanation:
        "A radius to a tangent is perpendicular, so triangle $OPT$ is right-angled at $T$. Thus $PT=\\sqrt{13^2-5^2}=\\sqrt{144}=12$ cm.",
    },
    {
      id: "y10adv-d5-code-count-probability",
      unitSlug: "counting-principles",
      assessedUnitSlugs: ["probability"],
      difficulty: 5,
      targetMisconception:
        "Counts favourable outcomes but uses replacement or fails to condition the second choice after the first digit is fixed.",
      prompt:
        "A 3-digit code uses different digits from $1$ to $6$. What is the probability it starts with an even digit and ends with a digit greater than $4$?",
      choices: [
        { label: "A", text: "$\\dfrac{1}{6}$" },
        { label: "B", text: "$\\dfrac{1}{4}$" },
        { label: "C", text: "$\\dfrac{1}{3}$" },
        { label: "D", text: "$\\dfrac{1}{2}$" },
      ],
      correctAnswer: "A",
      explanation:
        "There are $6\\times5\\times4=120$ possible codes. If the first digit is 2 or 4, the last digit can be 5 or 6, giving $2\\times4\\times2=16$ codes. If the first digit is 6, the last digit must be 5, giving $4$ more. The probability is $20/120=1/6$.",
    },
    {
      id: "y10adv-d5-residual-line",
      unitSlug: "single-variable-bivariate-statistics",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Substitutes into the line of best fit but calculates residual with the wrong sign or compares to the intercept.",
      prompt:
        "A line of best fit is $\\hat y=4x+12$. For $x=8$, the actual value is $47$. What is the residual?",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$-3$" },
        { label: "C", text: "$15$" },
        { label: "D", text: "$47$" },
      ],
      correctAnswer: "A",
      explanation:
        "The predicted value is $4(8)+12=44$. Residual is actual minus predicted: $47-44=3$.",
    },
    {
      id: "y10adv-d5-network-shortest-path",
      unitSlug: "networks",
      assessedUnitSlugs: ["algebra-equations-linear-relationships"],
      difficulty: 5,
      targetMisconception:
        "Chooses the route with fewer edges instead of comparing total path weights.",
      prompt:
        "Path $A-B-D$ has weights $5+9$, path $A-C-D$ has $7+6$, and path $A-C-E-D$ has $7+2+3$. Which path is shortest?",
      choices: [
        { label: "A", text: "$A-B-D$" },
        { label: "B", text: "$A-C-D$" },
        { label: "C", text: "$A-C-E-D$" },
        { label: "D", text: "$A-C-D$ and $A-C-E-D$ tie" },
      ],
      correctAnswer: "C",
      explanation:
        "The total weights are 14, 13, and 12. The shortest path is $A-C-E-D$ even though it uses more edges.",
    },
    {
      id: "y10adv-d5-inverse-variation",
      unitSlug: "parabolas-rates-variation",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Treats inverse variation as linear change and adds the same amount rather than keeping the product constant.",
      prompt:
        "$y$ varies inversely with $x$. When $x=4$, $y=18$. What is $y$ when $x=12$?",
      choices: [
        { label: "A", text: "$6$" },
        { label: "B", text: "$26$" },
        { label: "C", text: "$54$" },
        { label: "D", text: "$72$" },
      ],
      correctAnswer: "A",
      explanation:
        "For inverse variation, $xy$ is constant. Since $4\\times18=72$, when $x=12$, $y=72/12=6$.",
    },
    {
      id: "y10adv-d5-log-domain-graph",
      unitSlug: "indices-exponentials-logarithms",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Solves the logarithmic equation but ignores the domain restriction created by the expression inside the logarithm.",
      prompt:
        "For $f(x)=\\log_2(x-3)$, which statement is correct?",
      choices: [
        {
          label: "A",
          text: "Domain $x>3$ and $f(x)=2$ when $x=7$.",
        },
        {
          label: "B",
          text: "Domain $x\\geq3$ and $f(x)=2$ when $x=5$.",
        },
        {
          label: "C",
          text: "Domain all real $x$ and $f(x)=2$ when $x=4$.",
        },
        {
          label: "D",
          text: "Domain $x>0$ and $f(x)=2$ when $x=7$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The logarithm requires $x-3>0$, so $x>3$. For $f(x)=2$, $\\log_2(x-3)=2$, so $x-3=4$ and $x=7$.",
    },
  ],
};
