import type { ExamPaper } from "./types";

// Year 11 Mathematics Advanced — mini practice exam (Paper 1).
// Every answer SymPy-verified. Year 11 Advanced uses the regular Band scale.
// Covers functions, quadratics/discriminant, linear functions, surds, and
// radian measure (arc length and sector area).
const REMEDIATION = "/course/year-11-advanced";

export const year11AdvancedPaper1: ExamPaper = {
  id: "y11-adv-paper-1",
  courseSlug: "year-11-advanced",
  courseTitle: "Year 11 Mathematics Advanced",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Year 11 Advanced paper across functions, quadratics and the discriminant, linear functions, surds and radian measure. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 22,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y11a-p1-q1",
          prompt: "What is the domain of f(x) = √(x − 3)?",
          latex: "f(x) = \\sqrt{x - 3}",
          marks: 1,
          difficulty: 2,
          topicSlug: "function-notation-domain-range",
          topicTitle: "Domain and range",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$x \\ge 3$" },
            { label: "B", text: "$x > 3$" },
            { label: "C", text: "$x \\le 3$" },
            { label: "D", text: "all real $x$" },
          ],
          answer: "A",
          explanation:
            "The expression under the root must be $\\ge 0$: $x - 3 \\ge 0$, so $x \\ge 3$.",
        },
        {
          id: "y11a-p1-q2",
          prompt:
            "How many real roots does x² − 4x + 7 = 0 have?",
          latex: "x^2 - 4x + 7 = 0",
          marks: 1,
          difficulty: 3,
          topicSlug: "quadratic-equations-discriminant",
          topicTitle: "The discriminant",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "no real roots" },
            { label: "B", text: "one real root" },
            { label: "C", text: "two real roots" },
            { label: "D", text: "three real roots" },
          ],
          answer: "A",
          explanation:
            "$\\Delta = (-4)^2 - 4(1)(7) = -12 < 0$, so there are no real roots.",
        },
        {
          id: "y11a-p1-q3",
          prompt:
            "A line has equation y = 2x + 1. What is the gradient of a line perpendicular to it?",
          latex: "y = 2x + 1",
          marks: 1,
          difficulty: 3,
          topicSlug: "linear-functions",
          topicTitle: "Perpendicular gradients",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$-\\dfrac{1}{2}$" },
            { label: "B", text: "$2$" },
            { label: "C", text: "$\\dfrac{1}{2}$" },
            { label: "D", text: "$-2$" },
          ],
          answer: "A",
          explanation:
            "Perpendicular gradients multiply to $-1$, so the gradient is $-\\tfrac{1}{2}$.",
        },
        {
          id: "y11a-p1-q4",
          prompt: "What is the exact value of cos(π/3)?",
          latex: "\\cos\\left(\\tfrac{\\pi}{3}\\right)",
          marks: 1,
          difficulty: 2,
          topicSlug: "exact-trig-values-special-triangles",
          topicTitle: "Exact trigonometric values",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$\\dfrac{1}{2}$" },
            { label: "B", text: "$\\dfrac{\\sqrt{3}}{2}$" },
            { label: "C", text: "$\\dfrac{1}{\\sqrt{2}}$" },
            { label: "D", text: "$1$" },
          ],
          answer: "A",
          explanation:
            "$\\cos\\tfrac{\\pi}{3} = \\cos 60° = \\tfrac{1}{2}$.",
        },
        {
          id: "y11a-p1-q5",
          prompt: "Simplify √50.",
          latex: "\\sqrt{50}",
          marks: 1,
          difficulty: 2,
          topicSlug: "algebraic-techniques",
          topicTitle: "Surds",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$5\\sqrt{2}$" },
            { label: "B", text: "$2\\sqrt{5}$" },
            { label: "C", text: "$25\\sqrt{2}$" },
            { label: "D", text: "$10\\sqrt{5}$" },
          ],
          answer: "A",
          explanation: "$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y11a-p1-q6",
          prompt: "Consider the quadratic x² + 6x + 5.",
          latex: "x^2 + 6x + 5",
          marks: 3,
          difficulty: 4,
          topicSlug: "completing-the-square",
          topicTitle: "Completing the square",
          remediationHref: REMEDIATION,
          explanation:
            "$x^2 + 6x + 5 = (x+3)^2 - 4$. The vertex is $(-3, -4)$, so the minimum value is $-4$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Write it in completed-square form (x + h)² + k.",
              marks: 1,
              answer: "(x+3)^2-4",
              acceptedAnswers: ["(x+3)^2 - 4", "(x + 3)^2 - 4"],
              explanation: "$x^2 + 6x + 5 = (x+3)^2 - 9 + 5 = (x+3)^2 - 4$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the coordinates of the vertex.",
              marks: 1,
              answer: "(-3,-4)",
              acceptedAnswers: ["(-3, -4)", "-3,-4"],
              explanation: "The vertex of $(x+3)^2 - 4$ is $(-3, -4)$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "State the minimum value of the quadratic.",
              marks: 1,
              answer: "-4",
              explanation: "The minimum value is the y-coordinate of the vertex, $-4$.",
            },
          ],
        },
        {
          id: "y11a-p1-q7",
          prompt: "Consider the equation 2x² − 3x − 2 = 0.",
          latex: "2x^2 - 3x - 2 = 0",
          marks: 3,
          difficulty: 4,
          topicSlug: "quadratic-equations-discriminant",
          topicTitle: "Quadratic equations and the discriminant",
          remediationHref: REMEDIATION,
          explanation:
            "$\\Delta = (-3)^2 - 4(2)(-2) = 25$. Since $\\Delta > 0$ there are two real roots: $x = 2$ and $x = -\\tfrac{1}{2}$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the value of the discriminant.",
              marks: 1,
              answer: "25",
              explanation: "$\\Delta = (-3)^2 - 4(2)(-2) = 9 + 16 = 25$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Solve the equation. Give both roots.",
              marks: 2,
              answer: "x=2, x=-1/2",
              acceptedAnswers: [
                "2, -1/2",
                "-1/2, 2",
                "x = 2, x = -1/2",
                "2 and -1/2",
              ],
              explanation:
                "$(2x + 1)(x - 2) = 0$, so $x = -\\tfrac{1}{2}$ or $x = 2$.",
            },
          ],
        },
        {
          id: "y11a-p1-q8",
          prompt: "A line passes through the points A(1, 2) and B(5, 10).",
          latex: "A(1, 2),\\quad B(5, 10)",
          marks: 3,
          difficulty: 4,
          topicSlug: "linear-functions",
          topicTitle: "Linear functions",
          remediationHref: REMEDIATION,
          explanation:
            "Gradient $= \\dfrac{10 - 2}{5 - 1} = 2$. Using $y - 2 = 2(x - 1)$ gives $y = 2x$. Midpoint $= \\left(\\tfrac{1+5}{2}, \\tfrac{2+10}{2}\\right) = (3, 6)$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the gradient of the line.",
              marks: 1,
              answer: "2",
              explanation: "$m = \\dfrac{10 - 2}{5 - 1} = \\dfrac{8}{4} = 2$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the equation of the line in the form y = mx + b.",
              marks: 1,
              answer: "y=2x",
              acceptedAnswers: ["y = 2x", "2x", "y=2x+0"],
              explanation: "$y - 2 = 2(x - 1) \\Rightarrow y = 2x$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the midpoint of AB.",
              marks: 1,
              answer: "(3,6)",
              acceptedAnswers: ["(3, 6)", "3,6"],
              explanation:
                "Midpoint $= \\left(\\tfrac{1+5}{2}, \\tfrac{2+10}{2}\\right) = (3, 6)$.",
            },
          ],
        },
        {
          id: "y11a-p1-q9",
          prompt:
            "A sector of a circle has radius 6 cm and a central angle of π/3 radians. Give exact answers in terms of π.",
          latex: "r = 6,\\quad \\theta = \\tfrac{\\pi}{3}",
          marks: 3,
          difficulty: 5,
          topicSlug: "arc-length-radian-measure",
          topicTitle: "Arc length and sector area",
          remediationHref: REMEDIATION,
          explanation:
            "Arc length $\\ell = r\\theta = 6 \\times \\tfrac{\\pi}{3} = 2\\pi$ cm. Sector area $= \\tfrac{1}{2}r^2\\theta = \\tfrac{1}{2}(36)\\tfrac{\\pi}{3} = 6\\pi$ cm².",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the arc length (cm).",
              marks: 1,
              answer: "2pi",
              acceptedAnswers: ["2π", "2\\pi", "2 pi"],
              explanation: "$\\ell = r\\theta = 6 \\times \\tfrac{\\pi}{3} = 2\\pi$ cm.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the area of the sector (cm²).",
              marks: 2,
              answer: "6pi",
              acceptedAnswers: ["6π", "6\\pi", "6 pi"],
              explanation:
                "Area $= \\tfrac{1}{2}r^2\\theta = \\tfrac{1}{2}(6)^2\\tfrac{\\pi}{3} = 6\\pi$ cm².",
            },
          ],
        },
        {
          id: "y11a-p1-q10",
          prompt:
            "Let f(x) = 2x − 1 and g(x) = x². Evaluate the composite functions below.",
          latex: "f(x) = 2x - 1,\\quad g(x) = x^2",
          marks: 3,
          difficulty: 5,
          topicSlug: "composite-functions",
          topicTitle: "Composite functions",
          remediationHref: REMEDIATION,
          explanation:
            "$f(g(2)) = f(4) = 7$. $g(f(2)) = g(3) = 9$. $f(g(x)) = 2x^2 - 1$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find f(g(2)).",
              marks: 1,
              answer: "7",
              explanation: "$g(2) = 4$, then $f(4) = 2(4) - 1 = 7$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find g(f(2)).",
              marks: 1,
              answer: "9",
              explanation: "$f(2) = 3$, then $g(3) = 3^2 = 9$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find an expression for f(g(x)).",
              marks: 1,
              answer: "2x^2-1",
              acceptedAnswers: ["2x^2 - 1", "2*x^2-1"],
              explanation: "$f(g(x)) = 2(x^2) - 1 = 2x^2 - 1$.",
            },
          ],
        },
      ],
    },
  ],
};
