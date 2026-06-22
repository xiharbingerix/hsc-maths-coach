import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 10 Mathematics Advanced",

  // Remapped to the 12-chapter restructure (ADR-Y10-001). Equations and Linear Relationships
  // now both live in Chapter 1, so their two diagnostic topics merge into one.
  units: [
    {
      slug: "quadratic-expressions-equations",
      title: "Quadratic Expressions and Equations",
      startHref: "/course/year-10-mathematics-advanced/quadratic-expressions-equations",
    },
    {
      slug: "algebra-equations-linear-relationships",
      title: "Algebra, Equations and Linear Relationships",
      startHref: "/course/year-10-mathematics-advanced/algebra-equations-linear-relationships",
    },
    {
      slug: "parabolas-rates-variation",
      title: "Parabolas, Rates of Change and Variation",
      startHref: "/course/year-10-mathematics-advanced/parabolas-rates-variation",
    },
    {
      slug: "trigonometry",
      title: "Trigonometry",
      startHref: "/course/year-10-mathematics-advanced/trigonometry",
    },
    {
      slug: "measurement-and-surds",
      title: "Measurement and Surds",
      startHref: "/course/year-10-mathematics-advanced/measurement-and-surds",
    },
    {
      slug: "geometrical-figures-circle-geometry",
      title: "Properties of Geometrical Figures and Circle Geometry",
      startHref: "/course/year-10-mathematics-advanced/geometrical-figures-circle-geometry",
    },
    {
      slug: "probability",
      title: "Probability",
      startHref: "/course/year-10-mathematics-advanced/probability",
    },
    {
      slug: "single-variable-bivariate-statistics",
      title: "Single Variable and Bivariate Statistics",
      startHref: "/course/year-10-mathematics-advanced/single-variable-bivariate-statistics",
    },
    {
      slug: "financial-mathematics",
      title: "Financial Mathematics",
      startHref: "/course/year-10-mathematics-advanced/financial-mathematics",
    },
  ],

  questions: [
    // ── Algebraic Techniques (2 questions) ────────────────────────────────────
    {
      id: "y10a-y10-at1",
      unitSlug: "quadratic-expressions-equations",
      prompt: "Expand $(x + 3)(x - 2)$.",
      choices: [
        { label: "A", text: "$x^2 + x - 6$" },
        { label: "B", text: "$x^2 - x - 6$" },
        { label: "C", text: "$x^2 + 5x - 6$" },
        { label: "D", text: "$x^2 - 6$" },
      ],
      correctAnswer: "A",
      explanation:
        "$(x+3)(x-2) = x^2 - 2x + 3x - 6 = x^2 + x - 6$.",
    },
    {
      id: "y10a-y10-at2",
      unitSlug: "quadratic-expressions-equations",
      prompt: "Factorise $x^2 - 9$.",
      choices: [
        { label: "A", text: "$(x - 3)^2$" },
        { label: "B", text: "$(x + 9)(x - 1)$" },
        { label: "C", text: "$(x + 3)(x - 3)$" },
        { label: "D", text: "$(x - 9)(x + 1)$" },
      ],
      correctAnswer: "C",
      explanation:
        "$x^2 - 9$ is a difference of two squares: $(x + 3)(x - 3)$.",
    },

    // ── Equations and Simultaneous Equations (2 questions) ────────────────────
    {
      id: "y10a-y10-es1",
      unitSlug: "algebra-equations-linear-relationships",
      prompt: "Solve $2x + 3 = 11$.",
      choices: [
        { label: "A", text: "$x = 2$" },
        { label: "B", text: "$x = 3$" },
        { label: "C", text: "$x = 4$" },
        { label: "D", text: "$x = 7$" },
      ],
      correctAnswer: "C",
      explanation: "$2x = 11 - 3 = 8 \\Rightarrow x = 4$.",
    },
    {
      id: "y10a-y10-es2",
      unitSlug: "algebra-equations-linear-relationships",
      prompt:
        "Solve simultaneously: $y = 2x$ and $y = x + 3$. The value of $x$ is:",
      choices: [
        { label: "A", text: "$x = 1$" },
        { label: "B", text: "$x = 2$" },
        { label: "C", text: "$x = 3$" },
        { label: "D", text: "$x = 6$" },
      ],
      correctAnswer: "C",
      explanation:
        "Setting equal: $2x = x + 3 \\Rightarrow x = 3$. Then $y = 6$.",
    },

    // ── Linear Relationships (2 questions) ────────────────────────────────────
    {
      id: "y10a-y10-lr1",
      unitSlug: "algebra-equations-linear-relationships",
      prompt:
        "A line has gradient $2$ and $y$-intercept $-3$. Its equation is:",
      choices: [
        { label: "A", text: "$y = 2x + 3$" },
        { label: "B", text: "$y = -3x + 2$" },
        { label: "C", text: "$y = 2x - 3$" },
        { label: "D", text: "$y = 3x - 2$" },
      ],
      correctAnswer: "C",
      explanation: "Using $y = mx + b$ with $m = 2$ and $b = -3$: $y = 2x - 3$.",
    },
    {
      id: "y10a-y10-lr2",
      unitSlug: "algebra-equations-linear-relationships",
      prompt: "Two lines are parallel if they have:",
      choices: [
        { label: "A", text: "The same $y$-intercept" },
        { label: "B", text: "The same gradient" },
        { label: "C", text: "Gradients that multiply to $-1$" },
        { label: "D", text: "No $x$-intercept" },
      ],
      correctAnswer: "B",
      explanation:
        "Parallel lines have equal gradients and different $y$-intercepts.",
    },

    // ── Non-Linear Relationships (2 questions) ────────────────────────────────
    {
      id: "y10a-y10-nl1",
      unitSlug: "parabolas-rates-variation",
      prompt: "The vertex of $y = x^2 - 4x + 7$ is at:",
      latex: "y = x^2 - 4x + 7",
      choices: [
        { label: "A", text: "$(2, 3)$" },
        { label: "B", text: "$(-2, 3)$" },
        { label: "C", text: "$(2, -3)$" },
        { label: "D", text: "$(4, 7)$" },
      ],
      correctAnswer: "A",
      explanation:
        "$x = -\\dfrac{b}{2a} = \\dfrac{4}{2} = 2$. Then $y = 4 - 8 + 7 = 3$. Vertex: $(2, 3)$.",
    },
    {
      id: "y10a-y10-nl2",
      unitSlug: "parabolas-rates-variation",
      prompt: "The parabola $y = -x^2 + 4$ opens:",
      choices: [
        { label: "A", text: "Upward" },
        { label: "B", text: "Downward" },
        { label: "C", text: "To the right" },
        { label: "D", text: "To the left" },
      ],
      correctAnswer: "B",
      explanation:
        "When the coefficient of $x^2$ is negative, the parabola opens downward.",
    },

    // ── Trigonometry (2 questions) ────────────────────────────────────────────
    {
      id: "y10a-y10-tr1",
      unitSlug: "trigonometry",
      prompt:
        "In a right triangle with hypotenuse $13$ and opposite side $5$, $\\sin(\\theta) =$",
      choices: [
        { label: "A", text: "$\\dfrac{5}{12}$" },
        { label: "B", text: "$\\dfrac{5}{13}$" },
        { label: "C", text: "$\\dfrac{12}{13}$" },
        { label: "D", text: "$\\dfrac{13}{5}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\sin(\\theta) = \\dfrac{\\text{opposite}}{\\text{hypotenuse}} = \\dfrac{5}{13}$.",
    },
    {
      id: "y10a-y10-tr2",
      unitSlug: "trigonometry",
      prompt: "$\\tan(45°) =$",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$\\dfrac{1}{2}$" },
        { label: "C", text: "$1$" },
        { label: "D", text: "$\\sqrt{2}$" },
      ],
      correctAnswer: "C",
      explanation:
        "In a right isosceles triangle, opposite $=$ adjacent, so $\\tan(45°) = 1$.",
    },

    // ── Measurement (2 questions) ─────────────────────────────────────────────
    {
      id: "y10a-y10-me1",
      unitSlug: "measurement-and-surds",
      prompt: "The total surface area of a cube with side length $3$ cm is:",
      choices: [
        { label: "A", text: "$27$ cm$^2$" },
        { label: "B", text: "$36$ cm$^2$" },
        { label: "C", text: "$54$ cm$^2$" },
        { label: "D", text: "$81$ cm$^2$" },
      ],
      correctAnswer: "C",
      explanation:
        "A cube has $6$ square faces. $\\text{TSA} = 6 \\times 3^2 = 54$ cm$^2$.",
    },
    {
      id: "y10a-y10-me2",
      unitSlug: "measurement-and-surds",
      prompt: "The volume of a cone is:",
      choices: [
        { label: "A", text: "$\\pi r^2 h$" },
        { label: "B", text: "$\\dfrac{1}{3}\\pi r^2 h$" },
        { label: "C", text: "$\\dfrac{2}{3}\\pi r^2 h$" },
        { label: "D", text: "$2\\pi r h$" },
      ],
      correctAnswer: "B",
      explanation:
        "Volume of a cone $= \\dfrac{1}{3}\\pi r^2 h$ (one-third of the cylinder with the same base and height).",
    },

    // ── Geometry and Proofs (2 questions) ─────────────────────────────────────
    {
      id: "y10a-y10-gp1",
      unitSlug: "geometrical-figures-circle-geometry",
      prompt:
        "Two triangles are congruent when two sides and the included angle are equal. This is the:",
      choices: [
        { label: "A", text: "SSS test" },
        { label: "B", text: "SAS test" },
        { label: "C", text: "AAS test" },
        { label: "D", text: "RHS test" },
      ],
      correctAnswer: "B",
      explanation:
        "SAS (Side-Angle-Side): two sides and the included angle are equal.",
    },
    {
      id: "y10a-y10-gp2",
      unitSlug: "geometrical-figures-circle-geometry",
      prompt: "The sum of the interior angles of a hexagon is:",
      choices: [
        { label: "A", text: "$360°$" },
        { label: "B", text: "$540°$" },
        { label: "C", text: "$720°$" },
        { label: "D", text: "$900°$" },
      ],
      correctAnswer: "C",
      explanation:
        "Sum of interior angles $= (n - 2) \\times 180°$. For a hexagon ($n = 6$): $(6-2) \\times 180 = 720°$.",
    },

    // ── Probability (2 questions) ─────────────────────────────────────────────
    {
      id: "y10a-y10-pr1",
      unitSlug: "probability",
      prompt: "A fair die is rolled. $P(\\text{even number}) =$",
      choices: [
        { label: "A", text: "$\\dfrac{1}{6}$" },
        { label: "B", text: "$\\dfrac{1}{3}$" },
        { label: "C", text: "$\\dfrac{1}{2}$" },
        { label: "D", text: "$\\dfrac{2}{3}$" },
      ],
      correctAnswer: "C",
      explanation:
        "Even numbers on a die: $\\{2, 4, 6\\}$. $P = \\dfrac{3}{6} = \\dfrac{1}{2}$.",
    },
    {
      id: "y10a-y10-pr2",
      unitSlug: "probability",
      prompt: "Two coins are flipped. $P(\\text{both heads}) =$",
      choices: [
        { label: "A", text: "$\\dfrac{1}{4}$" },
        { label: "B", text: "$\\dfrac{1}{2}$" },
        { label: "C", text: "$\\dfrac{3}{4}$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "A",
      explanation:
        "Sample space: $\\{HH, HT, TH, TT\\}$. Only $HH$ satisfies both heads. $P = \\dfrac{1}{4}$.",
    },

    // ── Statistics and Data (2 questions) ─────────────────────────────────────
    {
      id: "y10a-y10-sd1",
      unitSlug: "single-variable-bivariate-statistics",
      prompt:
        "For the data set $2, 4, 6, 8, 10, 12$, the interquartile range (IQR) is:",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$8$" },
        { label: "D", text: "$10$" },
      ],
      correctAnswer: "B",
      explanation:
        "Lower half $\\{2, 4, 6\\}$: $Q_1 = 4$. Upper half $\\{8, 10, 12\\}$: $Q_3 = 10$. $IQR = 10 - 4 = 6$.",
    },
    {
      id: "y10a-y10-sd2",
      unitSlug: "single-variable-bivariate-statistics",
      prompt:
        "A score of $70$ comes from a distribution with mean $50$ and standard deviation $10$. It is how many standard deviations above the mean?",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$2$" },
        { label: "C", text: "$3$" },
        { label: "D", text: "$5$" },
      ],
      correctAnswer: "B",
      explanation: "$\\dfrac{70 - 50}{10} = \\dfrac{20}{10} = 2$ standard deviations above the mean.",
    },

    // ── Financial Mathematics (2 questions) ───────────────────────────────────
    {
      id: "y10a-y10-fm1",
      unitSlug: "financial-mathematics",
      prompt:
        "Simple interest on \\$500 at $4\\%$ per year for $3$ years. $I = Prn$:",
      latex: "I = Prn",
      choices: [
        { label: "A", text: "\\$40" },
        { label: "B", text: "\\$60" },
        { label: "C", text: "\\$120" },
        { label: "D", text: "\\$200" },
      ],
      correctAnswer: "B",
      explanation: "$I = 500 \\times 0.04 \\times 3 = \\$60$.",
    },
    {
      id: "y10a-y10-fm2",
      unitSlug: "financial-mathematics",
      prompt:
        "\\$1000 is invested at $10\\%$ p.a. compounded annually for $2$ years. The final amount $A$ is:",
      latex: "A = P(1 + r)^n",
      choices: [
        { label: "A", text: "\\$1100" },
        { label: "B", text: "\\$1200" },
        { label: "C", text: "\\$1210" },
        { label: "D", text: "\\$1250" },
      ],
      correctAnswer: "C",
      explanation:
        "$A = 1000 \\times (1.10)^2 = 1000 \\times 1.21 = \\$1210$.",
    },
  ],
};
