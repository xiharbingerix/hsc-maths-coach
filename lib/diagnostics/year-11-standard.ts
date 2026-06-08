import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 11 Mathematics Standard",

  units: [
    {
      slug: "formulas-equations",
      title: "Formulas and Equations",
      startHref: "/course/year-11-standard/formulas-equations",
    },
    {
      slug: "linear-relationships",
      title: "Linear Relationships",
      startHref: "/course/year-11-standard/linear-relationships",
    },
    {
      slug: "earning-money",
      title: "Earning Money",
      startHref: "/course/year-11-standard/earning-money",
    },
    {
      slug: "managing-money",
      title: "Managing Money",
      startHref: "/course/year-11-standard/managing-money",
    },
    {
      slug: "applications-measurement",
      title: "Applications of Measurement",
      startHref: "/course/year-11-standard/applications-measurement",
    },
    {
      slug: "time-location",
      title: "Time and Location",
      startHref: "/course/year-11-standard/time-location",
    },
    {
      slug: "networks-paths-trees",
      title: "Networks, Paths and Trees",
      startHref: "/course/year-11-standard/networks-paths-trees",
    },
    {
      slug: "probability-relative-frequency",
      title: "Probability and Relative Frequency",
      startHref: "/course/year-11-standard/probability-relative-frequency",
    },
    {
      slug: "data-analysis",
      title: "Data Analysis",
      startHref: "/course/year-11-standard/data-analysis",
    },
  ],

  questions: [
    // ── Formulas and Equations (2 questions) ──────────────────────────────────
    {
      id: "y11std-fe1",
      unitSlug: "formulas-equations",
      prompt: "Substitute $x = 3$ into $y = 2x^2 - 5$. Find $y$.",
      latex: "y = 2x^2 - 5",
      choices: [
        { label: "A", text: "$1$" },
        { label: "B", text: "$4$" },
        { label: "C", text: "$13$" },
        { label: "D", text: "$18$" },
      ],
      correctAnswer: "C",
      explanation: "$y = 2(3)^2 - 5 = 2(9) - 5 = 18 - 5 = 13$.",
    },
    {
      id: "y11std-fe2",
      unitSlug: "formulas-equations",
      prompt: "Make $r$ the subject of $A = \\pi r^2$.",
      latex: "A = \\pi r^2",
      choices: [
        { label: "A", text: "$r = \\sqrt{\\dfrac{A}{\\pi}}$" },
        { label: "B", text: "$r = \\dfrac{A}{\\pi}$" },
        { label: "C", text: "$r = \\sqrt{A\\pi}$" },
        { label: "D", text: "$r = \\dfrac{A}{2\\pi}$" },
      ],
      correctAnswer: "A",
      explanation:
        "$r^2 = \\dfrac{A}{\\pi} \\Rightarrow r = \\sqrt{\\dfrac{A}{\\pi}}$.",
    },

    // ── Linear Relationships (2 questions) ────────────────────────────────────
    {
      id: "y11std-lr1",
      unitSlug: "linear-relationships",
      prompt: "The equation $y = 3x - 2$ has a $y$-intercept of:",
      choices: [
        { label: "A", text: "$3$" },
        { label: "B", text: "$-2$" },
        { label: "C", text: "$2$" },
        { label: "D", text: "$-3$" },
      ],
      correctAnswer: "B",
      explanation:
        "In $y = mx + b$, the $y$-intercept is $b$. Here $b = -2$.",
    },
    {
      id: "y11std-lr2",
      unitSlug: "linear-relationships",
      prompt: "Which of the following is a linear relationship?",
      choices: [
        { label: "A", text: "$y = x^2$" },
        { label: "B", text: "$y = 2x + 1$" },
        { label: "C", text: "$y = \\dfrac{1}{x}$" },
        { label: "D", text: "$y = x^3$" },
      ],
      correctAnswer: "B",
      explanation:
        "A linear relationship has the form $y = mx + b$. Only $y = 2x + 1$ fits this pattern.",
    },

    // ── Earning Money (2 questions) ───────────────────────────────────────────
    {
      id: "y11std-em1",
      unitSlug: "earning-money",
      prompt:
        "Sarah earns \\$18 per hour and works $35$ hours. Her weekly gross pay is:",
      choices: [
        { label: "A", text: "\\$540" },
        { label: "B", text: "\\$630" },
        { label: "C", text: "\\$680" },
        { label: "D", text: "\\$720" },
      ],
      correctAnswer: "B",
      explanation: "$\\$18 \\times 35 = \\$630$.",
    },
    {
      id: "y11std-em2",
      unitSlug: "earning-money",
      prompt:
        "Overtime is paid at time-and-a-half. If the regular rate is \\$20/hr, the overtime rate is:",
      choices: [
        { label: "A", text: "\\$25/hr" },
        { label: "B", text: "\\$28/hr" },
        { label: "C", text: "\\$30/hr" },
        { label: "D", text: "\\$40/hr" },
      ],
      correctAnswer: "C",
      explanation: "$\\$20 \\times 1.5 = \\$30$/hr.",
    },

    // ── Managing Money (2 questions) ──────────────────────────────────────────
    {
      id: "y11std-mm1",
      unitSlug: "managing-money",
      prompt:
        "Weekly income is \\$900. Weekly expenses are \\$680. The surplus is:",
      choices: [
        { label: "A", text: "\\$120" },
        { label: "B", text: "\\$180" },
        { label: "C", text: "\\$220" },
        { label: "D", text: "\\$300" },
      ],
      correctAnswer: "C",
      explanation: "$\\$900 - \\$680 = \\$220$.",
    },
    {
      id: "y11std-mm2",
      unitSlug: "managing-money",
      prompt: "A phone plan costs \\$45 per month. The annual cost is:",
      choices: [
        { label: "A", text: "\\$480" },
        { label: "B", text: "\\$520" },
        { label: "C", text: "\\$540" },
        { label: "D", text: "\\$560" },
      ],
      correctAnswer: "C",
      explanation: "$\\$45 \\times 12 = \\$540$.",
    },

    // ── Applications of Measurement (3 questions) ─────────────────────────────
    {
      id: "y11std-am1",
      unitSlug: "applications-measurement",
      prompt:
        "A fence is measured as $85$ m to the nearest metre. The maximum possible error is:",
      choices: [
        { label: "A", text: "$0.1$ m" },
        { label: "B", text: "$0.5$ m" },
        { label: "C", text: "$1$ m" },
        { label: "D", text: "$5$ m" },
      ],
      correctAnswer: "B",
      explanation:
        "When rounding to the nearest metre, the maximum error is half the unit of measurement: $0.5$ m.",
    },
    {
      id: "y11std-am2",
      unitSlug: "applications-measurement",
      prompt: "Convert $2.5$ km to metres.",
      choices: [
        { label: "A", text: "$25$ m" },
        { label: "B", text: "$250$ m" },
        { label: "C", text: "$2500$ m" },
        { label: "D", text: "$25\\,000$ m" },
      ],
      correctAnswer: "C",
      explanation: "$2.5 \\times 1000 = 2500$ m.",
    },
    {
      id: "y11std-am3",
      unitSlug: "applications-measurement",
      prompt: "The area of a rectangle $8$ cm $\\times$ $5$ cm is:",
      choices: [
        { label: "A", text: "$26$ cm$^2$" },
        { label: "B", text: "$40$ cm$^2$" },
        { label: "C", text: "$13$ cm$^2$" },
        { label: "D", text: "$80$ cm$^2$" },
      ],
      correctAnswer: "B",
      explanation: "$A = 8 \\times 5 = 40$ cm$^2$.",
    },

    // ── Time and Location (2 questions) ───────────────────────────────────────
    {
      id: "y11std-tl1",
      unitSlug: "time-location",
      prompt:
        "A train leaves at 9:45 am and arrives at 1:20 pm. The journey takes:",
      choices: [
        { label: "A", text: "$3$ hr $25$ min" },
        { label: "B", text: "$3$ hr $35$ min" },
        { label: "C", text: "$4$ hr $25$ min" },
        { label: "D", text: "$4$ hr $35$ min" },
      ],
      correctAnswer: "B",
      explanation:
        "9:45 am to 1:20 pm: $9{:}45 \\to 1{:}20$ is $3$ hours and $35$ minutes.",
    },
    {
      id: "y11std-tl2",
      unitSlug: "time-location",
      prompt:
        "Sydney is UTC+11. London is UTC+0. When it is 3:00 pm in Sydney, the time in London is:",
      choices: [
        { label: "A", text: "$2{:}00$ am" },
        { label: "B", text: "$4{:}00$ am" },
        { label: "C", text: "$2{:}00$ pm" },
        { label: "D", text: "$4{:}00$ pm" },
      ],
      correctAnswer: "B",
      explanation:
        "Sydney is $11$ hours ahead: $3{:}00$ pm $- 11$ hours $= 4{:}00$ am in London.",
    },

    // ── Networks, Paths and Trees (2 questions) ───────────────────────────────
    {
      id: "y11std-np1",
      unitSlug: "networks-paths-trees",
      prompt:
        "The minimum number of edges needed to connect $5$ vertices without forming a cycle (a spanning tree) is:",
      choices: [
        { label: "A", text: "$4$" },
        { label: "B", text: "$5$" },
        { label: "C", text: "$6$" },
        { label: "D", text: "$10$" },
      ],
      correctAnswer: "A",
      explanation:
        "A spanning tree on $n$ vertices has exactly $n - 1$ edges. For $n = 5$: $4$ edges.",
    },
    {
      id: "y11std-np2",
      unitSlug: "networks-paths-trees",
      prompt: "In a network diagram, the degree of a vertex is:",
      choices: [
        { label: "A", text: "The number of edges connected to it" },
        { label: "B", text: "The number of vertices in the network" },
        { label: "C", text: "The number of paths through the network" },
        { label: "D", text: "The weight of the vertex" },
      ],
      correctAnswer: "A",
      explanation:
        "The degree of a vertex is the number of edges that connect to it.",
    },

    // ── Probability and Relative Frequency (2 questions) ──────────────────────
    {
      id: "y11std-pr1",
      unitSlug: "probability-relative-frequency",
      prompt:
        "A spinner has $8$ equal sections, $3$ of which are red. In $200$ spins, the expected number of red results is:",
      choices: [
        { label: "A", text: "$50$" },
        { label: "B", text: "$60$" },
        { label: "C", text: "$75$" },
        { label: "D", text: "$80$" },
      ],
      correctAnswer: "C",
      explanation:
        "$200 \\times \\dfrac{3}{8} = 75$.",
    },
    {
      id: "y11std-pr2",
      unitSlug: "probability-relative-frequency",
      prompt: "$P(\\text{not } A) = 0.3$. Therefore $P(A) =$",
      choices: [
        { label: "A", text: "$0.3$" },
        { label: "B", text: "$0.6$" },
        { label: "C", text: "$0.7$" },
        { label: "D", text: "$1.3$" },
      ],
      correctAnswer: "C",
      explanation:
        "$P(A) = 1 - P(\\text{not } A) = 1 - 0.3 = 0.7$.",
    },

    // ── Data Analysis (3 questions) ───────────────────────────────────────────
    {
      id: "y11std-da1",
      unitSlug: "data-analysis",
      prompt: "The median of $4, 7, 9, 11, 14, 16$ is:",
      choices: [
        { label: "A", text: "$9$" },
        { label: "B", text: "$10$" },
        { label: "C", text: "$11$" },
        { label: "D", text: "$14$" },
      ],
      correctAnswer: "B",
      explanation:
        "With $6$ values, the median is the average of the $3$rd and $4$th values: $\\dfrac{9 + 11}{2} = 10$.",
    },
    {
      id: "y11std-da2",
      unitSlug: "data-analysis",
      prompt:
        "If every value in a dataset increases by $5$, the mean will:",
      choices: [
        { label: "A", text: "Stay the same" },
        { label: "B", text: "Increase by $5$" },
        { label: "C", text: "Increase by $25$" },
        { label: "D", text: "Double" },
      ],
      correctAnswer: "B",
      explanation:
        "Adding a constant to every value shifts the mean by the same constant.",
    },
    {
      id: "y11std-da3",
      unitSlug: "data-analysis",
      prompt:
        "In a histogram, the height of each bar represents the:",
      choices: [
        { label: "A", text: "Mean of the class interval" },
        { label: "B", text: "Median of the class interval" },
        { label: "C", text: "Mode of the data" },
        { label: "D", text: "Frequency of the class interval" },
      ],
      correctAnswer: "D",
      explanation:
        "In a frequency histogram, the height of each bar shows the frequency (count) of data values in that class interval.",
    },
  ],
};
