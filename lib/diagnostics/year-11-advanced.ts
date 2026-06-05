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
      slug: "sequences-series",
      title: "Sequences and Series",
      startHref: "/course/year-11-advanced/sequences-series",
    },
    {
      slug: "trigonometry-measure-angles",
      title: "Trigonometry and Measure of Angles",
      startHref: "/course/year-11-advanced/trigonometry-measure-angles",
    },
    {
      slug: "trigonometric-identities-equations",
      title: "Trigonometric Identities and Equations",
      startHref: "/course/year-11-advanced/trigonometric-identities-equations",
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
  ],

  questions: [
    // ── Working with Functions (3 questions) ──────────────────────────────────
    {
      id: "y11adv-wf1",
      unitSlug: "working-with-functions",
      prompt: "For $f(x) = x^2 - 3$, find $f(-2)$.",
      latex: "f(x) = x^2 - 3",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$7$" },
        { label: "C", text: "$-7$" },
        { label: "D", text: "$-1$" },
      ],
      correctAnswer: "A",
      explanation: "$f(-2) = (-2)^2 - 3 = 4 - 3 = 1$.",
    },
    {
      id: "y11adv-wf2",
      unitSlug: "working-with-functions",
      prompt: "The domain of $f(x) = \\dfrac{1}{x - 2}$ is:",
      latex: "f(x) = \\frac{1}{x-2}",
      choices: [
        { label: "A", text: "All real $x$" },
        { label: "B", text: "$x \\ne 2$" },
        { label: "C", text: "$x > 2$" },
        { label: "D", text: "$x < 2$" },
      ],
      correctAnswer: "B",
      explanation:
        "The denominator cannot equal zero: $x - 2 \\ne 0 \\Rightarrow x \\ne 2$.",
    },
    {
      id: "y11adv-wf3",
      unitSlug: "working-with-functions",
      prompt: "Which of the following represents a function?",
      choices: [
        { label: "A", text: "$x = 4$ (a vertical line)" },
        { label: "B", text: "$x^2 + y^2 = 9$ (a circle)" },
        { label: "C", text: "$y = x + 1$" },
        { label: "D", text: "$y^2 = x$" },
      ],
      correctAnswer: "C",
      explanation:
        "A function passes the vertical line test — each $x$ gives exactly one $y$. Only $y = x + 1$ satisfies this.",
    },

    // ── Graph Transformations (2 questions) ───────────────────────────────────
    {
      id: "y11adv-gt1",
      unitSlug: "graph-transformations",
      prompt: "The graph $y = f(x) + 3$ is a translation of $y = f(x)$:",
      choices: [
        { label: "A", text: "$3$ units left" },
        { label: "B", text: "$3$ units right" },
        { label: "C", text: "$3$ units up" },
        { label: "D", text: "$3$ units down" },
      ],
      correctAnswer: "C",
      explanation:
        "Adding a constant outside the function shifts the graph vertically upward by that amount.",
    },
    {
      id: "y11adv-gt2",
      unitSlug: "graph-transformations",
      prompt: "$y = -f(x)$ reflects the graph $y = f(x)$ over the:",
      choices: [
        { label: "A", text: "$x$-axis" },
        { label: "B", text: "$y$-axis" },
        { label: "C", text: "Origin" },
        { label: "D", text: "Line $y = x$" },
      ],
      correctAnswer: "A",
      explanation:
        "Multiplying the output by $-1$ negates every $y$-value, reflecting over the $x$-axis.",
    },

    // ── Sequences and Series (2 questions) ────────────────────────────────────
    {
      id: "y11adv-ss1",
      unitSlug: "sequences-series",
      prompt:
        "An arithmetic sequence has first term $a = 3$ and common difference $d = 4$. The $8$th term is:",
      latex: "T_n = a + (n-1)d",
      choices: [
        { label: "A", text: "$31$" },
        { label: "B", text: "$32$" },
        { label: "C", text: "$35$" },
        { label: "D", text: "$27$" },
      ],
      correctAnswer: "A",
      explanation:
        "$T_8 = 3 + (8-1) \\times 4 = 3 + 28 = 31$.",
    },
    {
      id: "y11adv-ss2",
      unitSlug: "sequences-series",
      prompt:
        "A geometric sequence has first term $a = 2$ and common ratio $r = 3$. The $4$th term is:",
      latex: "T_n = a \\cdot r^{n-1}",
      choices: [
        { label: "A", text: "$18$" },
        { label: "B", text: "$27$" },
        { label: "C", text: "$54$" },
        { label: "D", text: "$162$" },
      ],
      correctAnswer: "C",
      explanation:
        "$T_4 = 2 \\times 3^{4-1} = 2 \\times 27 = 54$.",
    },

    // ── Trigonometry and Measure of Angles (3 questions) ──────────────────────
    {
      id: "y11adv-tm1",
      unitSlug: "trigonometry-measure-angles",
      prompt: "$\\dfrac{\\pi}{4}$ radians in degrees is:",
      latex: "\\frac{\\pi}{4} \\text{ radians}",
      choices: [
        { label: "A", text: "$30°$" },
        { label: "B", text: "$45°$" },
        { label: "C", text: "$60°$" },
        { label: "D", text: "$90°$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\dfrac{\\pi}{4} \\times \\dfrac{180°}{\\pi} = 45°$.",
    },
    {
      id: "y11adv-tm2",
      unitSlug: "trigonometry-measure-angles",
      prompt: "The exact value of $\\sin\\!\\left(\\dfrac{\\pi}{6}\\right)$ is:",
      latex: "\\sin\\!\\left(\\frac{\\pi}{6}\\right)",
      choices: [
        { label: "A", text: "$\\dfrac{1}{2}$" },
        { label: "B", text: "$\\dfrac{\\sqrt{3}}{2}$" },
        { label: "C", text: "$1$" },
        { label: "D", text: "$\\dfrac{\\sqrt{2}}{2}$" },
      ],
      correctAnswer: "A",
      explanation:
        "$\\sin(30°) = \\dfrac{1}{2}$, and $\\dfrac{\\pi}{6} = 30°$.",
    },
    {
      id: "y11adv-tm3",
      unitSlug: "trigonometry-measure-angles",
      prompt:
        "On the unit circle, $\\sin(\\theta)$ is defined as the:",
      choices: [
        { label: "A", text: "$x$-coordinate of the point" },
        { label: "B", text: "$y$-coordinate of the point" },
        { label: "C", text: "Ratio $x/y$" },
        { label: "D", text: "Ratio $y/x$" },
      ],
      correctAnswer: "B",
      explanation:
        "On the unit circle, the point $(\\cos\\theta, \\sin\\theta)$ lies on the circle. $\\sin\\theta$ is the $y$-coordinate.",
    },

    // ── Trigonometric Identities and Equations (2 questions) ──────────────────
    {
      id: "y11adv-ti1",
      unitSlug: "trigonometric-identities-equations",
      prompt: "Which identity is correct?",
      choices: [
        { label: "A", text: "$\\sin^2 x + \\cos^2 x = 0$" },
        { label: "B", text: "$\\sin^2 x - \\cos^2 x = 1$" },
        { label: "C", text: "$\\sin^2 x + \\cos^2 x = 1$" },
        { label: "D", text: "$\\sin x + \\cos x = 1$" },
      ],
      correctAnswer: "C",
      explanation:
        "The Pythagorean identity: $\\sin^2 x + \\cos^2 x = 1$ for all $x$.",
    },
    {
      id: "y11adv-ti2",
      unitSlug: "trigonometric-identities-equations",
      prompt: "Solve $\\sin x = 0$ for $x \\in [0, 2\\pi]$. The solutions are:",
      latex: "\\sin x = 0, \\quad x \\in [0, 2\\pi]",
      choices: [
        { label: "A", text: "$x = 0$ only" },
        { label: "B", text: "$x = \\pi$ only" },
        { label: "C", text: "$x = 0$ and $x = \\pi$" },
        { label: "D", text: "$x = 0,\\, \\pi,\\, 2\\pi$" },
      ],
      correctAnswer: "D",
      explanation:
        "$\\sin x = 0$ when $x$ is a multiple of $\\pi$. In $[0, 2\\pi]$: $x = 0, \\pi, 2\\pi$.",
    },

    // ── Exponential and Logarithmic Functions (3 questions) ───────────────────
    {
      id: "y11adv-el1",
      unitSlug: "exponential-logarithmic-functions",
      prompt: "$\\log_2 8 =$",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$4$" },
        { label: "D", text: "$16$" },
      ],
      correctAnswer: "B",
      explanation:
        "$\\log_2 8 = 3$ because $2^3 = 8$.",
    },
    {
      id: "y11adv-el2",
      unitSlug: "exponential-logarithmic-functions",
      prompt: "$e^{\\ln 5} =$",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$5$" },
        { label: "C", text: "$e + 5$" },
        { label: "D", text: "$\\ln(e+5)$" },
      ],
      correctAnswer: "B",
      explanation:
        "$e^{\\ln x} = x$ for all $x > 0$. Therefore $e^{\\ln 5} = 5$.",
    },
    {
      id: "y11adv-el3",
      unitSlug: "exponential-logarithmic-functions",
      prompt: "Solve $3^x = 81$.",
      choices: [
        { label: "A", text: "$x = 3$" },
        { label: "B", text: "$x = 4$" },
        { label: "C", text: "$x = 5$" },
        { label: "D", text: "$x = 27$" },
      ],
      correctAnswer: "B",
      explanation:
        "$3^4 = 81$, so $x = 4$.",
    },

    // ── Introduction to Differentiation (3 questions) ─────────────────────────
    {
      id: "y11adv-id1",
      unitSlug: "introduction-differentiation",
      prompt: "The gradient of $f(x) = x^2$ at $x = 3$ is:",
      latex: "f(x) = x^2",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$9$" },
        { label: "D", text: "$12$" },
      ],
      correctAnswer: "B",
      explanation:
        "$f'(x) = 2x$. At $x = 3$: $f'(3) = 2(3) = 6$.",
    },
    {
      id: "y11adv-id2",
      unitSlug: "introduction-differentiation",
      prompt: "Differentiate $y = 5x^3$.",
      latex: "y = 5x^3",
      choices: [
        { label: "A", text: "$5x^2$" },
        { label: "B", text: "$15x^2$" },
        { label: "C", text: "$15x^3$" },
        { label: "D", text: "$x^2$" },
      ],
      correctAnswer: "B",
      explanation:
        "Using the power rule: $\\dfrac{dy}{dx} = 5 \\times 3x^{3-1} = 15x^2$.",
    },
    {
      id: "y11adv-id3",
      unitSlug: "introduction-differentiation",
      prompt:
        "If $f'(x) > 0$ on an interval, then the function is:",
      choices: [
        { label: "A", text: "Decreasing" },
        { label: "B", text: "Concave up" },
        { label: "C", text: "Increasing" },
        { label: "D", text: "Stationary" },
      ],
      correctAnswer: "C",
      explanation:
        "A positive first derivative means the function is increasing on that interval.",
    },

    // ── Probability and Data (2 questions) ────────────────────────────────────
    {
      id: "y11adv-pd1",
      unitSlug: "probability-data",
      prompt:
        "In a normal distribution, data is distributed:",
      choices: [
        { label: "A", text: "Mostly above the mean" },
        { label: "B", text: "Mostly below the mean" },
        { label: "C", text: "Symmetrically around the mean" },
        { label: "D", text: "Uniformly across all values" },
      ],
      correctAnswer: "C",
      explanation:
        "A normal distribution is symmetric: the mean, median, and mode coincide at the centre.",
    },
    {
      id: "y11adv-pd2",
      unitSlug: "probability-data",
      prompt:
        "Two events $A$ and $B$ are independent if:",
      choices: [
        { label: "A", text: "$P(A \\cap B) = 0$" },
        { label: "B", text: "$P(A \\cap B) = P(A) \\times P(B)$" },
        { label: "C", text: "$P(A) = P(B)$" },
        { label: "D", text: "$P(A \\cup B) = 1$" },
      ],
      correctAnswer: "B",
      explanation:
        "Events are independent when $P(A \\cap B) = P(A) \\times P(B)$.",
    },
  ],
};
