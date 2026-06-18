import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 7 Mathematics",

  units: [
    {
      slug: "integers",
      title: "Computation with Integers",
      startHref: "/course/year-7-mathematics/integers",
    },
    {
      slug: "fractions",
      title: "Understanding Fractions and Decimals",
      startHref: "/course/year-7-mathematics/fractions",
    },
    {
      slug: "algebraic-techniques",
      title: "Algebraic Techniques",
      startHref: "/course/year-7-mathematics/algebraic-techniques",
    },
    {
      slug: "percentages",
      title: "Understanding Percentages",
      startHref: "/course/year-7-mathematics/percentages",
    },
    {
      slug: "equations",
      title: "Equations",
      startHref: "/course/year-7-mathematics/equations",
    },
    {
      slug: "indices",
      title: "Indices",
      startHref: "/course/year-7-mathematics/indices",
    },
    {
      slug: "perimeter",
      title: "Perimeter of Plane Shapes",
      startHref: "/course/year-7-mathematics/perimeter",
    },
    {
      slug: "area",
      title: "Areas of Triangles and Quadrilaterals",
      startHref: "/course/year-7-mathematics/area",
    },
    {
      slug: "angles",
      title: "Angle Relationships",
      startHref: "/course/year-7-mathematics/angles",
    },
    {
      slug: "data",
      title: "Data Classification and Visualisation",
      startHref: "/course/year-7-mathematics/data",
    },
    {
      slug: "ratios-and-rates",
      title: "Ratios and Rates",
      startHref: "/course/year-7-mathematics/ratios-and-rates",
    },
    {
      slug: "probability-and-chance",
      title: "Probability",
      startHref: "/course/year-7-mathematics/probability-and-chance",
    },
  ],

  questions: [
    {
      id: "y7-int-1",
      unitSlug: "integers",
      prompt: "Evaluate $-7 + 12$.",
      choices: [
        { label: "A", text: "$-19$" },
        { label: "B", text: "$5$" },
        { label: "C", text: "$19$" },
        { label: "D", text: "$-5$" },
      ],
      correctAnswer: "B",
      explanation: "Moving 12 units right from -7 gives 5, so $-7 + 12 = 5$.",
    },
    {
      id: "y7-int-2",
      unitSlug: "integers",
      prompt: "Evaluate $(-4) \\times 6$.",
      choices: [
        { label: "A", text: "$24$" },
        { label: "B", text: "$-24$" },
        { label: "C", text: "$2$" },
        { label: "D", text: "$-10$" },
      ],
      correctAnswer: "B",
      explanation:
        "A negative times a positive is negative, and $4 \\times 6 = 24$, so the value is -24.",
    },
    {
      id: "y7-fr-1",
      unitSlug: "fractions",
      prompt: "Simplify $\\dfrac{12}{18}$.",
      choices: [
        { label: "A", text: "$\\dfrac{2}{3}$" },
        { label: "B", text: "$\\dfrac{3}{2}$" },
        { label: "C", text: "$\\dfrac{6}{9}$" },
        { label: "D", text: "$\\dfrac{4}{9}$" },
      ],
      correctAnswer: "A",
      explanation:
        "Divide numerator and denominator by 6: $12/18 = 2/3$.",
    },
    {
      id: "y7-fr-2",
      unitSlug: "fractions",
      prompt: "Calculate $\\dfrac{1}{4} + \\dfrac{3}{8}$.",
      choices: [
        { label: "A", text: "$\\dfrac{4}{12}$" },
        { label: "B", text: "$\\dfrac{5}{8}$" },
        { label: "C", text: "$\\dfrac{1}{2}$" },
        { label: "D", text: "$\\dfrac{7}{8}$" },
      ],
      correctAnswer: "B",
      explanation:
        "$1/4 = 2/8$, so $2/8 + 3/8 = 5/8$.",
    },
    {
      id: "y7-alg-1",
      unitSlug: "algebraic-techniques",
      prompt: "Simplify $3x + 5x$.",
      choices: [
        { label: "A", text: "$8x$" },
        { label: "B", text: "$15x$" },
        { label: "C", text: "$8x^2$" },
        { label: "D", text: "$3x + 5x$" },
      ],
      correctAnswer: "A",
      explanation:
        "They are like terms, so add coefficients: $3 + 5 = 8$, giving $8x$.",
    },
    {
      id: "y7-alg-2",
      unitSlug: "algebraic-techniques",
      prompt: "Expand $4(x + 2)$.",
      choices: [
        { label: "A", text: "$4x + 2$" },
        { label: "B", text: "$4x + 6$" },
        { label: "C", text: "$4x + 8$" },
        { label: "D", text: "$x + 8$" },
      ],
      correctAnswer: "C",
      explanation:
        "Distribute 4 to each term inside the bracket: $4x + 8$.",
    },
    {
      id: "y7-perc-1",
      unitSlug: "percentages",
      prompt: "Write $35\\%$ as a decimal.",
      choices: [
        { label: "A", text: "$0.035$" },
        { label: "B", text: "$0.35$" },
        { label: "C", text: "$3.5$" },
        { label: "D", text: "$35$" },
      ],
      correctAnswer: "B",
      explanation:
        "Percent means per hundred, so $35\\% = 35/100 = 0.35$.",
    },
    {
      id: "y7-perc-2",
      unitSlug: "percentages",
      prompt: "Find $25\\%$ of $60$.",
      choices: [
        { label: "A", text: "$12$" },
        { label: "B", text: "$15$" },
        { label: "C", text: "$20$" },
        { label: "D", text: "$24$" },
      ],
      correctAnswer: "B",
      explanation:
        "$25\\% = 1/4$, and one quarter of 60 is 15.",
    },
    {
      id: "y7-eq-1",
      unitSlug: "equations",
      prompt: "Solve $x + 9 = 14$.",
      choices: [
        { label: "A", text: "$x = 5$" },
        { label: "B", text: "$x = 23$" },
        { label: "C", text: "$x = -5$" },
        { label: "D", text: "$x = 4$" },
      ],
      correctAnswer: "A",
      explanation:
        "Subtract 9 from both sides to isolate x: $x = 14 - 9 = 5$.",
    },
    {
      id: "y7-eq-2",
      unitSlug: "equations",
      prompt: "Solve $3x = 27$.",
      choices: [
        { label: "A", text: "$x = 6$" },
        { label: "B", text: "$x = 8$" },
        { label: "C", text: "$x = 9$" },
        { label: "D", text: "$x = 12$" },
      ],
      correctAnswer: "C",
      explanation:
        "Divide both sides by 3: $x = 27/3 = 9$.",
    },
    {
      id: "y7-ind-1",
      unitSlug: "indices",
      prompt: "Write $2^3$ as a whole number.",
      choices: [
        { label: "A", text: "$6$" },
        { label: "B", text: "$8$" },
        { label: "C", text: "$9$" },
        { label: "D", text: "$12$" },
      ],
      correctAnswer: "B",
      explanation:
        "$2^3 = 2 \\times 2 \\times 2 = 8$.",
    },
    {
      id: "y7-ind-2",
      unitSlug: "indices",
      prompt: "Evaluate $5^0$.",
      choices: [
        { label: "A", text: "$0$" },
        { label: "B", text: "$1$" },
        { label: "C", text: "$5$" },
        { label: "D", text: "$25$" },
      ],
      correctAnswer: "B",
      explanation:
        "Any non-zero number to the power of 0 equals 1.",
    },
    {
      id: "y7-perim-1",
      unitSlug: "perimeter",
      prompt: "A rectangle has length $9$ cm and width $4$ cm. What is its perimeter?",
      choices: [
        { label: "A", text: "$13$ cm" },
        { label: "B", text: "$26$ cm" },
        { label: "C", text: "$36$ cm" },
        { label: "D", text: "$18$ cm" },
      ],
      correctAnswer: "B",
      explanation:
        "Perimeter of a rectangle is $2(l + w) = 2(9 + 4) = 26$ cm.",
    },
    {
      id: "y7-area-1",
      unitSlug: "area",
      prompt: "Find the area of a triangle with base $10$ cm and height $6$ cm.",
      choices: [
        { label: "A", text: "$30$ cm$^2$" },
        { label: "B", text: "$60$ cm$^2$" },
        { label: "C", text: "$16$ cm$^2$" },
        { label: "D", text: "$20$ cm$^2$" },
      ],
      correctAnswer: "A",
      explanation:
        "Area of a triangle is $\\frac{1}{2}bh = \\frac{1}{2}(10)(6) = 30$ cm$^2$.",
    },
    {
      id: "y7-ang-1",
      unitSlug: "angles",
      prompt: "Angles on a straight line add to:",
      choices: [
        { label: "A", text: "$90^\\circ$" },
        { label: "B", text: "$180^\\circ$" },
        { label: "C", text: "$270^\\circ$" },
        { label: "D", text: "$360^\\circ$" },
      ],
      correctAnswer: "B",
      explanation:
        "A straight angle measures $180^\\circ$, so adjacent angles on a line total $180^\\circ$.",
    },
    {
      id: "y7-ang-2",
      unitSlug: "angles",
      prompt: "The interior angles of a triangle add to:",
      choices: [
        { label: "A", text: "$90^\\circ$" },
        { label: "B", text: "$120^\\circ$" },
        { label: "C", text: "$180^\\circ$" },
        { label: "D", text: "$360^\\circ$" },
      ],
      correctAnswer: "C",
      explanation:
        "The angle sum of every triangle is $180^\\circ$.",
    },
    {
      id: "y7-data-1",
      unitSlug: "data",
      prompt: "Which graph is best for showing parts of a whole?",
      choices: [
        { label: "A", text: "Pie chart" },
        { label: "B", text: "Line graph" },
        { label: "C", text: "Stem-and-leaf plot" },
        { label: "D", text: "Scatter plot" },
      ],
      correctAnswer: "A",
      explanation:
        "Pie charts split a whole into sectors, making proportions easy to compare.",
    },
    {
      id: "y7-rat-1",
      unitSlug: "ratios-and-rates",
      prompt: "Simplify the ratio $18:24$.",
      choices: [
        { label: "A", text: "$9:12$" },
        { label: "B", text: "$3:4$" },
        { label: "C", text: "$4:3$" },
        { label: "D", text: "$6:8$" },
      ],
      correctAnswer: "B",
      explanation:
        "Divide both parts by 6: $18:24 = 3:4$.",
    },
    {
      id: "y7-rat-2",
      unitSlug: "ratios-and-rates",
      prompt: "A car travels $180$ km in $3$ hours. What is its average speed?",
      choices: [
        { label: "A", text: "$30$ km/h" },
        { label: "B", text: "$45$ km/h" },
        { label: "C", text: "$60$ km/h" },
        { label: "D", text: "$90$ km/h" },
      ],
      correctAnswer: "C",
      explanation:
        "Speed = distance/time = 180/3 = 60 km/h.",
    },
    {
      id: "y7-prob-1",
      unitSlug: "probability-and-chance",
      prompt: "A fair six-sided die is rolled once. What is the probability of rolling an even number?",
      choices: [
        { label: "A", text: "$\\dfrac{1}{6}$" },
        { label: "B", text: "$\\dfrac{1}{3}$" },
        { label: "C", text: "$\\dfrac{1}{2}$" },
        { label: "D", text: "$\\dfrac{2}{3}$" },
      ],
      correctAnswer: "C",
      explanation:
        "Even outcomes are 2, 4 and 6, so 3 favourable outcomes out of 6 total gives $3/6 = 1/2$.",
    },
  ],
};
