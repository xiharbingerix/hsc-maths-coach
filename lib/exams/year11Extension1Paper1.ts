import type { ExamPaper } from "./types";

// Year 11 Mathematics Extension — mini practice exam (Paper 1).
// Every answer SymPy-verified. Extension courses map to the E-band scale
// (year-11-extension is in EXTENSION_SLUGS). Covers further functions,
// polynomials, further trigonometry, permutations/combinations and the
// binomial theorem.
const REMEDIATION = "/course/year-11-extension";

export const year11Extension1Paper1: ExamPaper = {
  id: "y11-ext-paper-1",
  courseSlug: "year-11-extension",
  courseTitle: "Year 11 Mathematics Extension",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Year 11 Extension paper across inverse functions, polynomials, further trigonometry, permutations and combinations, and the binomial theorem. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 21,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y11e-p1-q1",
          prompt:
            "In how many ways can a committee of 2 be chosen from 7 people?",
          latex: "\\binom{7}{2}",
          marks: 1,
          difficulty: 3,
          topicSlug: "combinations",
          topicTitle: "Combinations",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "21" },
            { label: "B", text: "42" },
            { label: "C", text: "14" },
            { label: "D", text: "49" },
          ],
          answer: "A",
          explanation:
            "$\\binom{7}{2} = \\dfrac{7 \\times 6}{2} = 21$ (order does not matter).",
        },
        {
          id: "y11e-p1-q2",
          prompt:
            "Find the remainder when P(x) = x³ − 2x + 5 is divided by (x − 2).",
          latex: "P(x) = x^3 - 2x + 5",
          marks: 1,
          difficulty: 3,
          topicSlug: "polynomial-division-remainder-theorem",
          topicTitle: "The remainder theorem",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "9" },
            { label: "B", text: "5" },
            { label: "C", text: "1" },
            { label: "D", text: "13" },
          ],
          answer: "A",
          explanation:
            "By the remainder theorem the remainder is $P(2) = 8 - 4 + 5 = 9$.",
        },
        {
          id: "y11e-p1-q3",
          prompt:
            "If θ is acute with sin θ = 3/5 and cos θ = 4/5, find sin 2θ.",
          latex: "\\sin 2\\theta = 2\\sin\\theta\\cos\\theta",
          marks: 1,
          difficulty: 4,
          topicSlug: "double-angle-formulae",
          topicTitle: "Double angle formulae",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$\\dfrac{24}{25}$" },
            { label: "B", text: "$\\dfrac{7}{25}$" },
            { label: "C", text: "$\\dfrac{12}{25}$" },
            { label: "D", text: "$\\dfrac{6}{5}$" },
          ],
          answer: "A",
          explanation:
            "$\\sin 2\\theta = 2\\left(\\tfrac{3}{5}\\right)\\left(\\tfrac{4}{5}\\right) = \\tfrac{24}{25}$.",
        },
        {
          id: "y11e-p1-q4",
          prompt: "Find the inverse function of f(x) = 2x + 3.",
          latex: "f(x) = 2x + 3",
          marks: 1,
          difficulty: 3,
          topicSlug: "inverse-functions",
          topicTitle: "Inverse functions",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$f^{-1}(x) = \\dfrac{x - 3}{2}$" },
            { label: "B", text: "$f^{-1}(x) = \\dfrac{x + 3}{2}$" },
            { label: "C", text: "$f^{-1}(x) = 2x - 3$" },
            { label: "D", text: "$f^{-1}(x) = \\dfrac{1}{2x + 3}$" },
          ],
          answer: "A",
          explanation:
            "Swap x and y in $x = 2y + 3$ and solve: $y = \\dfrac{x - 3}{2}$.",
        },
        {
          id: "y11e-p1-q5",
          prompt:
            "How many different arrangements are there of the 5 distinct letters in the word MATHS?",
          latex: "5!",
          marks: 1,
          difficulty: 2,
          topicSlug: "permutations",
          topicTitle: "Permutations",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "120" },
            { label: "B", text: "25" },
            { label: "C", text: "60" },
            { label: "D", text: "20" },
          ],
          answer: "A",
          explanation: "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y11e-p1-q6",
          prompt: "Consider the expansion of (2 + x)⁵.",
          latex: "(2 + x)^5",
          marks: 3,
          difficulty: 5,
          topicSlug: "general-term",
          topicTitle: "The binomial theorem — general term",
          remediationHref: REMEDIATION,
          explanation:
            "General term $\\binom{5}{r}2^{5-r}x^r$. For x²: $\\binom{5}{2}2^3 = 10 \\times 8 = 80$. Constant term (r = 0) is $2^5 = 32$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the coefficient of x².",
              marks: 2,
              answer: "80",
              explanation: "$\\binom{5}{2}2^{3} = 10 \\times 8 = 80$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the constant term.",
              marks: 1,
              answer: "32",
              explanation: "The $r = 0$ term is $\\binom{5}{0}2^5 = 32$.",
            },
          ],
        },
        {
          id: "y11e-p1-q7",
          prompt:
            "The quadratic equation x² − 5x + 6 = 0 has roots α and β.",
          latex: "x^2 - 5x + 6 = 0",
          marks: 3,
          difficulty: 5,
          topicSlug: "roots-and-coefficients",
          topicTitle: "Roots and coefficients",
          remediationHref: REMEDIATION,
          explanation:
            "Sum of roots $\\alpha + \\beta = 5$; product $\\alpha\\beta = 6$; $\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 25 - 12 = 13$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find α + β.",
              marks: 1,
              answer: "5",
              explanation: "$\\alpha + \\beta = -\\tfrac{b}{a} = 5$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find αβ.",
              marks: 1,
              answer: "6",
              explanation: "$\\alpha\\beta = \\tfrac{c}{a} = 6$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find α² + β².",
              marks: 1,
              answer: "13",
              explanation:
                "$\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 25 - 12 = 13$.",
            },
          ],
        },
        {
          id: "y11e-p1-q8",
          prompt: "θ is an acute angle with cos θ = 4/5.",
          latex: "\\cos\\theta = \\tfrac{4}{5},\\quad \\theta \\text{ acute}",
          marks: 3,
          difficulty: 5,
          topicSlug: "double-angle-formulae",
          topicTitle: "Double angle formulae",
          remediationHref: REMEDIATION,
          explanation:
            "Since θ is acute, $\\sin\\theta = \\tfrac{3}{5}$. Then $\\cos 2\\theta = 2\\cos^2\\theta - 1 = \\tfrac{7}{25}$ and $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta = \\tfrac{24}{25}$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find sin θ.",
              marks: 1,
              answer: "3/5",
              acceptedAnswers: ["0.6"],
              explanation: "$\\sin\\theta = \\sqrt{1 - \\tfrac{16}{25}} = \\tfrac{3}{5}$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find cos 2θ.",
              marks: 1,
              answer: "7/25",
              acceptedAnswers: ["0.28"],
              explanation:
                "$\\cos 2\\theta = 2\\cos^2\\theta - 1 = 2\\left(\\tfrac{16}{25}\\right) - 1 = \\tfrac{7}{25}$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find sin 2θ.",
              marks: 1,
              answer: "24/25",
              acceptedAnswers: ["0.96"],
              explanation:
                "$\\sin 2\\theta = 2\\left(\\tfrac{3}{5}\\right)\\left(\\tfrac{4}{5}\\right) = \\tfrac{24}{25}$.",
            },
          ],
        },
        {
          id: "y11e-p1-q9",
          prompt: "Five different people are to be arranged in a row.",
          latex: "n = 5",
          marks: 3,
          difficulty: 6,
          topicSlug: "arrangements-with-restrictions",
          topicTitle: "Arrangements with restrictions",
          remediationHref: REMEDIATION,
          explanation:
            "Total arrangements $= 5! = 120$. Treating two particular people as a block: $2! \\times 4! = 48$. So the number with them not together is $120 - 48 = 72$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "How many arrangements are there in total?",
              marks: 1,
              answer: "120",
              explanation: "$5! = 120$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "In how many arrangements are two particular people seated together?",
              marks: 1,
              answer: "48",
              explanation:
                "Treat the pair as one block: $2! \\times 4! = 2 \\times 24 = 48$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "In how many arrangements are those two people NOT together?",
              marks: 1,
              answer: "72",
              explanation: "$120 - 48 = 72$.",
            },
          ],
        },
        {
          id: "y11e-p1-q10",
          prompt: "Consider f(x) = x² + 1 defined for x ≥ 0.",
          latex: "f(x) = x^2 + 1,\\quad x \\ge 0",
          marks: 3,
          difficulty: 6,
          topicSlug: "inverse-functions",
          topicTitle: "Inverse functions",
          remediationHref: REMEDIATION,
          explanation:
            "For $x \\ge 0$, $f$ is one-to-one. Swapping and solving $x = y^2 + 1$ gives $f^{-1}(x) = \\sqrt{x - 1}$, with domain $x \\ge 1$ (the range of f). So $f^{-1}(5) = \\sqrt{4} = 2$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find an expression for f⁻¹(x).",
              marks: 1,
              answer: "sqrt(x-1)",
              acceptedAnswers: ["√(x-1)", "\\sqrt{x-1}", "(x-1)^(1/2)"],
              explanation: "$x = y^2 + 1 \\Rightarrow y = \\sqrt{x - 1}$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the domain of f⁻¹(x).",
              marks: 1,
              answer: "x >= 1",
              acceptedAnswers: ["x>=1", "x ≥ 1", "[1, ∞)", "x \\ge 1"],
              explanation:
                "The domain of $f^{-1}$ is the range of $f$, which is $x \\ge 1$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find f⁻¹(5).",
              marks: 1,
              answer: "2",
              explanation: "$f^{-1}(5) = \\sqrt{5 - 1} = 2$.",
            },
          ],
        },
      ],
    },
  ],
};
