import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 10 Mathematics Core",

  units: [
    {
      slug: "algebra-equations-linear-relationships",
      title: "Algebra, Equations and Linear Relationships",
      startHref:
        "/course/year-10-mathematics-core/algebra-equations-linear-relationships",
    },
    {
      slug: "geometrical-figures-circle-geometry",
      title: "Properties of Geometrical Figures and Circle Geometry",
      startHref:
        "/course/year-10-mathematics-core/geometrical-figures-circle-geometry",
    },
    {
      slug: "indices-exponentials-logarithms",
      title: "Indices, Exponentials and Logarithms",
      startHref:
        "/course/year-10-mathematics-core/indices-exponentials-logarithms",
    },
    {
      slug: "measurement-and-surds",
      title: "Measurement and Surds",
      startHref: "/course/year-10-mathematics-core/measurement-and-surds",
    },
    {
      slug: "quadratic-expressions-equations",
      title: "Quadratic Expressions and Equations",
      startHref:
        "/course/year-10-mathematics-core/quadratic-expressions-equations",
    },
    {
      slug: "trigonometry",
      title: "Trigonometry",
      startHref: "/course/year-10-mathematics-core/trigonometry",
    },
    {
      slug: "parabolas-rates-variation",
      title: "Parabolas, Rates of Change and Variation",
      startHref: "/course/year-10-mathematics-core/parabolas-rates-variation",
    },
    {
      slug: "probability",
      title: "Probability",
      startHref: "/course/year-10-mathematics-core/probability",
    },
    {
      slug: "single-variable-bivariate-statistics",
      title: "Single Variable and Bivariate Statistics",
      startHref:
        "/course/year-10-mathematics-core/single-variable-bivariate-statistics",
    },
    {
      slug: "functions-polynomials-graphs",
      title: "Functions, Polynomials and Other Graphs",
      startHref:
        "/course/year-10-mathematics-core/functions-polynomials-graphs",
    },
    {
      slug: "financial-mathematics",
      title: "Financial Mathematics",
      startHref: "/course/year-10-mathematics-core/financial-mathematics",
    },
  ],

  questions: [
    {
      id: "y10core-d5-plan-break-even",
      unitSlug: "algebra-equations-linear-relationships",
      assessedUnitSlugs: ["financial-mathematics"],
      difficulty: 5,
      targetMisconception:
        "Solves a break-even equation but does not interpret which payment option is cheaper before the intersection.",
      prompt:
        "Plan A costs 18 dollars plus 4 dollars per lesson. Plan B costs 42 dollars with lessons included. Which statement is correct?",
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
          text: "They cost the same at 15 lessons; Plan A is cheaper for 4 lessons.",
        },
        {
          label: "D",
          text: "Plan A is always cheaper because it starts lower.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solve $18+4n=42$, giving $n=6$. For 4 lessons, Plan A costs $18+4(4)=34$ dollars, which is cheaper than 42 dollars.",
    },
    {
      id: "y10core-d5-quadratic-vertex",
      unitSlug: "quadratic-expressions-equations",
      assessedUnitSlugs: ["parabolas-rates-variation"],
      difficulty: 5,
      targetMisconception:
        "Factors the quadratic but treats the roots as the maximum point or misses the symmetry halfway between roots.",
      prompt:
        "For $y=-(x-2)(x-8)$, which graph features are correct?",
      choices: [
        {
          label: "A",
          text: "Roots $x=2,8$ and maximum at $x=5$.",
        },
        {
          label: "B",
          text: "Roots $x=-2,-8$ and maximum at $x=-5$.",
        },
        {
          label: "C",
          text: "Roots $x=2,8$ and maximum at $x=8$.",
        },
        {
          label: "D",
          text: "Roots $x=5,8$ and maximum at $x=2$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The roots are where each factor is zero: $x=2$ and $x=8$. The axis of symmetry is halfway between them, so the maximum occurs at $x=(2+8)/2=5$.",
    },
    {
      id: "y10core-d5-compound-simple-gap",
      unitSlug: "financial-mathematics",
      assessedUnitSlugs: ["indices-exponentials-logarithms"],
      difficulty: 5,
      targetMisconception:
        "Uses simple interest for a repeated percentage change or assumes compound and simple growth match after more than one year.",
      prompt:
        "1000 dollars grows at $10\\%$ p.a. for 2 years. How much more is the compound amount than the simple-interest amount?",
      choices: [
        { label: "A", text: "10 dollars" },
        { label: "B", text: "100 dollars" },
        { label: "C", text: "200 dollars" },
        { label: "D", text: "210 dollars" },
      ],
      correctAnswer: "A",
      explanation:
        "Simple interest gives $1000+200=1200$ dollars. Compound interest gives $1000(1.10)^2=1210$ dollars, which is 10 dollars more.",
    },
    {
      id: "y10core-d5-log-domain-value",
      unitSlug: "indices-exponentials-logarithms",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Solves the logarithmic equation but ignores the domain restriction created by the expression inside the logarithm.",
      prompt:
        "For $f(x)=\\log_{10}(x-2)$, which statement is correct?",
      choices: [
        {
          label: "A",
          text: "Domain $x>2$ and $f(x)=1$ when $x=12$.",
        },
        {
          label: "B",
          text: "Domain $x\\geq2$ and $f(x)=1$ when $x=10$.",
        },
        {
          label: "C",
          text: "Domain all real $x$ and $f(x)=1$ when $x=3$.",
        },
        {
          label: "D",
          text: "Domain $x>0$ and $f(x)=1$ when $x=12$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The logarithm requires $x-2>0$, so $x>2$. If $f(x)=1$, then $x-2=10^1=10$, so $x=12$.",
    },
    {
      id: "y10core-d5-ramp-height",
      unitSlug: "trigonometry",
      assessedUnitSlugs: ["measurement-and-surds"],
      difficulty: 5,
      targetMisconception:
        "Uses the wrong trigonometric ratio by pairing the vertical height with the adjacent side instead of the hypotenuse.",
      prompt:
        "A ramp is 3 m long and makes a $30^\\circ$ angle with the ground. What vertical height does it reach?",
      choices: [
        { label: "A", text: "$1.5$ m" },
        { label: "B", text: "$3\\sqrt{3}$ m" },
        { label: "C", text: "$\\dfrac{3\\sqrt{3}}{2}$ m" },
        { label: "D", text: "$6$ m" },
      ],
      correctAnswer: "A",
      explanation:
        "The ramp is the hypotenuse and the height is opposite the angle. Since $\\sin30^\\circ=1/2$, the height is $3\\times1/2=1.5$ m.",
    },
    {
      id: "y10core-d5-tangent-length",
      unitSlug: "geometrical-figures-circle-geometry",
      assessedUnitSlugs: ["measurement-and-surds"],
      difficulty: 5,
      targetMisconception:
        "Knows the tangent-radius angle fact but does not use it to form the right triangle correctly.",
      prompt:
        "From point $P$, tangent $PT$ touches a circle at $T$. The centre is $O$, $OP=10$ cm and radius $OT=6$ cm. What is $PT$?",
      choices: [
        { label: "A", text: "$4$ cm" },
        { label: "B", text: "$8$ cm" },
        { label: "C", text: "$\\sqrt{136}$ cm" },
        { label: "D", text: "$16$ cm" },
      ],
      correctAnswer: "B",
      explanation:
        "A radius to a tangent is perpendicular, so triangle $OPT$ is right-angled at $T$. Thus $PT=\\sqrt{10^2-6^2}=\\sqrt{64}=8$ cm.",
    },
    {
      id: "y10core-d5-without-replacement-expected",
      unitSlug: "probability",
      assessedUnitSlugs: ["single-variable-bivariate-statistics"],
      difficulty: 5,
      targetMisconception:
        "Uses replacement when sampling is without replacement, or finds a probability but does not scale it to an expected frequency.",
      prompt:
        "A bag has 4 red and 2 blue counters. Two counters are drawn without replacement. In 60 repeated trials, how many two-red results are expected?",
      choices: [
        { label: "A", text: "$24$" },
        { label: "B", text: "$30$" },
        { label: "C", text: "$40$" },
        { label: "D", text: "$48$" },
      ],
      correctAnswer: "A",
      explanation:
        "$P(\\text{two red})=\\frac{4}{6}\\times\\frac{3}{5}=\\frac{2}{5}$. In 60 trials, the expected number is $60\\times\\frac{2}{5}=24$.",
    },
    {
      id: "y10core-d5-residual-sign",
      unitSlug: "single-variable-bivariate-statistics",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Substitutes into the line of best fit but calculates residual with the wrong sign.",
      prompt:
        "A line of best fit is $\\hat y=3x+5$. For $x=6$, the actual value is $20$. What is the residual?",
      choices: [
        { label: "A", text: "$-3$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$23$" },
      ],
      correctAnswer: "A",
      explanation:
        "The predicted value is $3(6)+5=23$. Residual is actual minus predicted, so $20-23=-3$.",
    },
    {
      id: "y10core-d5-inverse-variation",
      unitSlug: "parabolas-rates-variation",
      assessedUnitSlugs: ["functions-polynomials-graphs"],
      difficulty: 5,
      targetMisconception:
        "Treats inverse variation as linear change instead of keeping the product constant.",
      prompt:
        "$y$ varies inversely with $x$. When $x=3$, $y=20$. What is $y$ when $x=12$?",
      choices: [
        { label: "A", text: "$5$" },
        { label: "B", text: "$11$" },
        { label: "C", text: "$29$" },
        { label: "D", text: "$80$" },
      ],
      correctAnswer: "A",
      explanation:
        "For inverse variation, $xy$ is constant. Since $3\\times20=60$, when $x=12$, $y=60/12=5$.",
    },
    {
      id: "y10core-d5-surd-side-perimeter",
      unitSlug: "measurement-and-surds",
      assessedUnitSlugs: ["algebra-equations-linear-relationships"],
      difficulty: 5,
      targetMisconception:
        "Finds the square root of the area but then treats the side length as the perimeter or rounds the exact surd too early.",
      prompt:
        "A square has area $50\\text{ cm}^2$. What is its exact perimeter?",
      choices: [
        { label: "A", text: "$20\\sqrt{2}$ cm" },
        { label: "B", text: "$10\\sqrt{2}$ cm" },
        { label: "C", text: "$25\\sqrt{2}$ cm" },
        { label: "D", text: "$200$ cm" },
      ],
      correctAnswer: "A",
      explanation:
        "The side length is $\\sqrt{50}=5\\sqrt{2}$ cm. The perimeter is $4\\times5\\sqrt{2}=20\\sqrt{2}$ cm.",
    },
  ],
};
