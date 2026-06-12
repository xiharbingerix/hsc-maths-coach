import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 9 Mathematics Advanced",

  units: [
    {
      slug: "geometrical-representations",
      title: "Geometrical Representations",
      startHref: "/course/year-9-mathematics-advanced/geometrical-representations",
    },
    {
      slug: "working-with-triangles",
      title: "Working with Triangles",
      startHref: "/course/year-9-mathematics-advanced/working-with-triangles",
    },
    {
      slug: "prisms-and-cylinders",
      title: "Prisms and Cylinders",
      startHref: "/course/year-9-mathematics-advanced/prisms-and-cylinders",
    },
    {
      slug: "index-laws",
      title: "Index Laws",
      startHref: "/course/year-9-mathematics-advanced/index-laws",
    },
    {
      slug: "financial-mathematics",
      title: "Financial Mathematics",
      startHref: "/course/year-9-mathematics-advanced/financial-mathematics",
    },
    {
      slug: "constant-rates-of-change",
      title: "Constant Rates of Change",
      startHref: "/course/year-9-mathematics-advanced/constant-rates-of-change",
    },
    {
      slug: "making-predictions",
      title: "Making Predictions",
      startHref: "/course/year-9-mathematics-advanced/making-predictions",
    },
    {
      slug: "making-decisions",
      title: "Making Decisions",
      startHref: "/course/year-9-mathematics-advanced/making-decisions",
    },
  ],

  questions: [
    // ── Geometrical Representations (2 questions) ─────────────────────────────
    {
      id: "y9a-y9-gr1",
      unitSlug: "geometrical-representations",
      prompt: "Two triangles are similar. What must be true about their corresponding angles?",
      choices: [
        { label: "A", text: "They are equal" },
        { label: "B", text: "They are supplementary" },
        { label: "C", text: "They are complementary" },
        { label: "D", text: "One is double the other" },
      ],
      correctAnswer: "A",
      explanation: "Similar figures have exactly the same shape but may differ in size. All corresponding angles are equal.",
    },
    {
      id: "y9a-y9-gr2",
      unitSlug: "geometrical-representations",
      prompt: "Two similar shapes have a side length ratio (scale factor) of $3$. The ratio of their areas is:",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$9$" },
        { label: "D", text: "$27$" },
      ],
      correctAnswer: "C",
      explanation: "Area scales by the square of the linear scale factor. $3^2 = 9$.",
    },

    // ── Working with Triangles (3 questions) ──────────────────────────────────
    {
      id: "y9a-y9-wt1",
      unitSlug: "working-with-triangles",
      prompt: "A right triangle has legs of length $3$ cm and $4$ cm. The hypotenuse is:",
      latex: "c^2 = a^2 + b^2",
      choices: [
        { label: "A", text: "$5$ cm" },
        { label: "B", text: "$6$ cm" },
        { label: "C", text: "$7$ cm" },
        { label: "D", text: "$\\sqrt{7}$ cm" },
      ],
      correctAnswer: "A",
      explanation: "$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$ cm.",
    },
    {
      id: "y9a-y9-wt2",
      unitSlug: "working-with-triangles",
      prompt:
        "In a right triangle, the opposite side is $6$ and the hypotenuse is $10$. Find $\\sin(\\theta)$.",
      latex: "\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}",
      choices: [
        { label: "A", text: "$0.4$" },
        { label: "B", text: "$0.5$" },
        { label: "C", text: "$0.6$" },
        { label: "D", text: "$0.8$" },
      ],
      correctAnswer: "C",
      explanation: "$\\sin(\\theta) = \\dfrac{6}{10} = 0.6$.",
    },
    {
      id: "y9a-y9-wt3",
      unitSlug: "working-with-triangles",
      prompt:
        "A $5$ m ladder leans against a wall with its base $3$ m from the wall. How high up the wall does it reach?",
      choices: [
        { label: "A", text: "$3$ m" },
        { label: "B", text: "$4$ m" },
        { label: "C", text: "$\\sqrt{34}$ m" },
        { label: "D", text: "$8$ m" },
      ],
      correctAnswer: "B",
      explanation: "$h = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$ m.",
    },

    // ── Prisms and Cylinders (2 questions) ────────────────────────────────────
    {
      id: "y9a-y9-pc1",
      unitSlug: "prisms-and-cylinders",
      prompt: "Find the volume of a rectangular prism with length $4$, width $3$, and height $2$.",
      latex: "V = l \\times w \\times h",
      choices: [
        { label: "A", text: "$9$" },
        { label: "B", text: "$18$" },
        { label: "C", text: "$24$" },
        { label: "D", text: "$48$" },
      ],
      correctAnswer: "C",
      explanation: "$V = 4 \\times 3 \\times 2 = 24$ cubic units.",
    },
    {
      id: "y9a-y9-pc2",
      unitSlug: "prisms-and-cylinders",
      prompt: "The formula for the volume of a cylinder is:",
      choices: [
        { label: "A", text: "$V = \\pi r^2 h$" },
        { label: "B", text: "$V = 2\\pi r h$" },
        { label: "C", text: "$V = \\pi r^2 / h$" },
        { label: "D", text: "$V = 2\\pi r^2$" },
      ],
      correctAnswer: "A",
      explanation: "Volume of a cylinder $= \\pi r^2 h$ (area of circular base times height).",
    },

    // ── Index Laws (3 questions) ───────────────────────────────────────────────
    {
      id: "y9a-y9-il1",
      unitSlug: "index-laws",
      prompt: "Simplify $3^2 \\times 3^3$.",
      choices: [
        { label: "A", text: "$3^5$" },
        { label: "B", text: "$3^6$" },
        { label: "C", text: "$9^5$" },
        { label: "D", text: "$6^3$" },
      ],
      correctAnswer: "A",
      explanation: "When multiplying powers with the same base, add the exponents: $3^2 \\times 3^3 = 3^{2+3} = 3^5$.",
    },
    {
      id: "y9a-y9-il2",
      unitSlug: "index-laws",
      prompt: "Simplify $x^6 \\div x^2$.",
      choices: [
        { label: "A", text: "$x^4$" },
        { label: "B", text: "$x^8$" },
        { label: "C", text: "$x^3$" },
        { label: "D", text: "$x^{12}$" },
      ],
      correctAnswer: "A",
      explanation: "When dividing powers with the same base, subtract the exponents: $x^6 \\div x^2 = x^{6-2} = x^4$.",
    },
    {
      id: "y9a-y9-il3",
      unitSlug: "index-laws",
      prompt: "Evaluate $(2^3)^2$.",
      choices: [
        { label: "A", text: "$2^5$" },
        { label: "B", text: "$2^6$" },
        { label: "C", text: "$4^6$" },
        { label: "D", text: "$16$" },
      ],
      correctAnswer: "B",
      explanation: "When raising a power to a power, multiply the exponents: $(2^3)^2 = 2^{3 \\times 2} = 2^6 = 64$.",
    },

    // ── Financial Mathematics (2 questions) ───────────────────────────────────
    {
      id: "y9a-y9-fm1",
      unitSlug: "financial-mathematics",
      prompt: "Jack earns \\$22 per hour and works $8$ hours. His gross pay is:",
      choices: [
        { label: "A", text: "\\$144" },
        { label: "B", text: "\\$176" },
        { label: "C", text: "\\$196" },
        { label: "D", text: "\\$220" },
      ],
      correctAnswer: "B",
      explanation: "$\\$22 \\times 8 = \\$176$.",
    },
    {
      id: "y9a-y9-fm2",
      unitSlug: "financial-mathematics",
      prompt:
        "Simple interest on \\$1000 at $5\\%$ per year for $2$ years. Using $I = Prn$:",
      latex: "I = Prn",
      choices: [
        { label: "A", text: "\\$50" },
        { label: "B", text: "\\$100" },
        { label: "C", text: "\\$150" },
        { label: "D", text: "\\$200" },
      ],
      correctAnswer: "B",
      explanation: "$I = 1000 \\times 0.05 \\times 2 = \\$100$.",
    },

    // ── Constant Rates of Change (3 questions) ────────────────────────────────
    {
      id: "y9a-y9-cr1",
      unitSlug: "constant-rates-of-change",
      prompt: "Find the gradient of the line passing through $(0, 2)$ and $(4, 10)$.",
      latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$2$" },
        { label: "C", text: "$3$" },
        { label: "D", text: "$4$" },
      ],
      correctAnswer: "B",
      explanation: "$m = \\dfrac{10 - 2}{4 - 0} = \\dfrac{8}{4} = 2$.",
    },
    {
      id: "y9a-y9-cr2",
      unitSlug: "constant-rates-of-change",
      prompt: "A car travels $120$ km in $2$ hours. Its average speed is:",
      choices: [
        { label: "A", text: "$30$ km/h" },
        { label: "B", text: "$40$ km/h" },
        { label: "C", text: "$60$ km/h" },
        { label: "D", text: "$240$ km/h" },
      ],
      correctAnswer: "C",
      explanation: "$\\text{speed} = \\dfrac{120}{2} = 60$ km/h.",
    },
    {
      id: "y9a-y9-cr3",
      unitSlug: "constant-rates-of-change",
      prompt:
        "Which equation represents a line with gradient $3$ and $y$-intercept $-1$?",
      choices: [
        { label: "A", text: "$y = 3x - 1$" },
        { label: "B", text: "$y = -x + 3$" },
        { label: "C", text: "$y = x + 3$" },
        { label: "D", text: "$y = -3x + 1$" },
      ],
      correctAnswer: "A",
      explanation:
        "Using $y = mx + b$ with $m = 3$ and $b = -1$: $y = 3x - 1$.",
    },

    // ── Making Predictions (2 questions) ──────────────────────────────────────
    {
      id: "y9a-y9-mp1",
      unitSlug: "making-predictions",
      prompt:
        "A bag has $3$ red balls and $7$ blue balls. The probability of drawing a red ball is:",
      choices: [
        { label: "A", text: "$\\dfrac{3}{7}$" },
        { label: "B", text: "$\\dfrac{7}{10}$" },
        { label: "C", text: "$\\dfrac{3}{10}$" },
        { label: "D", text: "$\\dfrac{7}{3}$" },
      ],
      correctAnswer: "C",
      explanation: "$P(\\text{red}) = \\dfrac{3}{3 + 7} = \\dfrac{3}{10}$.",
    },
    {
      id: "y9a-y9-mp2",
      unitSlug: "making-predictions",
      prompt: "For any event $A$: $P(A) + P(\\text{not } A) =$",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$0.5$" },
        { label: "C", text: "$1$" },
        { label: "D", text: "$2$" },
      ],
      correctAnswer: "C",
      explanation:
        "The complementary event rule: $P(A) + P(\\overline{A}) = 1$ always.",
    },

    // ── Making Decisions (3 questions) ────────────────────────────────────────
    {
      id: "y9a-y9-md1",
      unitSlug: "making-decisions",
      prompt: "Find the mean of the data set: $2, 4, 6, 8, 10$.",
      choices: [
        { label: "A", text: "$5$" },
        { label: "B", text: "$6$" },
        { label: "C", text: "$7$" },
        { label: "D", text: "$8$" },
      ],
      correctAnswer: "B",
      explanation: "$\\text{Mean} = \\dfrac{2+4+6+8+10}{5} = \\dfrac{30}{5} = 6$.",
    },
    {
      id: "y9a-y9-md2",
      unitSlug: "making-decisions",
      prompt: "Find the median of the data set: $3, 5, 7, 9, 11$.",
      choices: [
        { label: "A", text: "$5$" },
        { label: "B", text: "$7$" },
        { label: "C", text: "$9$" },
        { label: "D", text: "$11$" },
      ],
      correctAnswer: "B",
      explanation:
        "The data is already sorted. With $5$ values, the median is the middle value: $7$.",
    },
    {
      id: "y9a-y9-md3",
      unitSlug: "making-decisions",
      prompt: "Find the range of: $4, 8, 2, 15, 6$.",
      choices: [
        { label: "A", text: "$11$" },
        { label: "B", text: "$13$" },
        { label: "C", text: "$15$" },
        { label: "D", text: "$17$" },
      ],
      correctAnswer: "B",
      explanation: "$\\text{Range} = \\text{maximum} - \\text{minimum} = 15 - 2 = 13$.",
    },
  ],
};
