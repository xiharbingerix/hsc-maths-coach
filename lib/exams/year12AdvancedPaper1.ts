import type { ExamPaper } from "./types";

// Year 12 Advanced — mini practice exam (Paper 1).
// Every answer verified with SymPy before authoring. Difficulty 1–5 ≈ practice
// depth; 6 = synoptic / transfer / exam-hard. Multi-part answers are kept
// cleanly auto-markable so the exam scorer can mark each part.
const REMEDIATION = "/course/year-12-advanced";

export const year12AdvancedPaper1: ExamPaper = {
  id: "y12-adv-paper-1",
  courseSlug: "year-12-advanced",
  courseTitle: "Year 12 Mathematics Advanced",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed HSC-style paper. Section I is multiple choice and short answer; Section II is extended-response. Work through it under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 45,
  totalMarks: 29,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice and short answer.",
      questions: [
        {
          id: "y12a-p1-q1",
          prompt: "Differentiate y = (2x + 1)³.",
          latex: "y = (2x+1)^3",
          marks: 1,
          difficulty: 3,
          topicSlug: "differentiation",
          topicTitle: "Differentiation (chain rule)",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "6(2x+1)^2" },
            { label: "B", text: "3(2x+1)^2" },
            { label: "C", text: "2(2x+1)^3" },
            { label: "D", text: "6(2x+1)" },
          ],
          answer: "A",
          explanation:
            "Chain rule: dy/dx = 3(2x+1)² × 2 = 6(2x+1)².",
        },
        {
          id: "y12a-p1-q2",
          prompt: "Find ∫ (6x² − 4x) dx.",
          latex: "\\int (6x^2 - 4x)\\,dx",
          marks: 1,
          difficulty: 3,
          topicSlug: "integration",
          topicTitle: "Integration of polynomials",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "2x^3 - 2x^2 + C" },
            { label: "B", text: "12x - 4 + C" },
            { label: "C", text: "2x^3 - 4x^2 + C" },
            { label: "D", text: "6x^3 - 2x^2 + C" },
          ],
          answer: "A",
          explanation:
            "Increase each power by one and divide: 6x²→2x³, −4x→−2x². So ∫(6x²−4x)dx = 2x³ − 2x² + C.",
        },
        {
          id: "y12a-p1-q3",
          prompt: "Solve e^(2x) = 5 for x. Give the exact value.",
          latex: "e^{2x} = 5",
          marks: 2,
          difficulty: 4,
          topicSlug: "exponential-logarithmic",
          topicTitle: "Exponential and logarithmic equations",
          remediationHref: REMEDIATION,
          answer: "ln(5)/2",
          acceptedAnswers: [
            "(1/2)ln(5)",
            "(ln 5)/2",
            "ln5/2",
            "0.8047",
            "0.805",
            "0.80",
          ],
          explanation:
            "Take natural logs: 2x = ln 5, so x = (ln 5)/2 ≈ 0.8047.",
        },
        {
          id: "y12a-p1-q4",
          prompt: "What is the period of y = 3 sin(2x)?",
          latex: "y = 3\\sin(2x)",
          marks: 1,
          difficulty: 3,
          topicSlug: "trigonometric-functions",
          topicTitle: "Trigonometric functions and graphs",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "2\\pi" },
            { label: "B", text: "\\pi" },
            { label: "C", text: "\\pi/2" },
            { label: "D", text: "4\\pi" },
          ],
          answer: "B",
          explanation:
            "Period = 2π ÷ (coefficient of x) = 2π ÷ 2 = π. The amplitude 3 does not affect the period.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Show all working in your own notes; enter each part's final answer.",
      questions: [
        {
          id: "y12a-p1-q5",
          prompt: "Consider the curve f(x) = x³ − 3x².",
          latex: "f(x) = x^3 - 3x^2",
          marks: 5,
          difficulty: 4,
          topicSlug: "calculus-applications",
          topicTitle: "Applications of differentiation (stationary points)",
          remediationHref: REMEDIATION,
          explanation:
            "f'(x) = 3x² − 6x = 3x(x − 2), zero at x = 0 and x = 2. f''(x) = 6x − 6: f''(0) = −6 < 0 (maximum), f''(2) = 6 > 0 (minimum).",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find f'(x).",
              marks: 2,
              answer: "3x^2-6x",
              acceptedAnswers: ["3x(x-2)", "-6x+3x^2"],
              explanation: "Differentiate term by term: f'(x) = 3x² − 6x.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the x-coordinates of the two stationary points.",
              marks: 2,
              answer: "0, 2",
              acceptedAnswers: ["2, 0", "0 and 2", "x=0, x=2"],
              explanation: "Set f'(x) = 3x(x − 2) = 0, giving x = 0 and x = 2.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "State the x-coordinate of the maximum turning point.",
              marks: 1,
              answer: "0",
              explanation:
                "f''(0) = −6 < 0, so x = 0 is the maximum turning point.",
            },
          ],
        },
        {
          id: "y12a-p1-q6",
          prompt:
            "Find the area enclosed between the curve y = x² and the line y = 2x.",
          latex: "y = x^2,\\quad y = 2x",
          marks: 3,
          difficulty: 5,
          topicSlug: "integration-area",
          topicTitle: "Area between curves",
          remediationHref: REMEDIATION,
          answer: "4/3",
          acceptedAnswers: ["1.33", "1.333", "1 1/3"],
          explanation:
            "Curves meet where x² = 2x → x = 0, 2. Area = ∫₀² (2x − x²) dx = [x² − x³/3]₀² = 4 − 8/3 = 4/3.",
        },
        {
          id: "y12a-p1-q7",
          prompt:
            "A population is modelled by P(t) = 500e^(0.08t), where t is in years.",
          latex: "P(t) = 500e^{0.08t}",
          marks: 5,
          difficulty: 6,
          transfer: true,
          topicSlug: "exponential-logarithmic",
          topicTitle: "Exponential growth (synoptic with calculus)",
          remediationHref: REMEDIATION,
          explanation:
            "P(0) = 500. P'(t) = 40e^{0.08t}, so P'(10) = 40e^{0.8} ≈ 89. Set 500e^{0.08t} = 1500 → e^{0.08t} = 3 → t = (ln 3)/0.08 ≈ 13.73 years.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the initial population.",
              marks: 1,
              answer: "500",
              explanation: "At t = 0, P(0) = 500e⁰ = 500.",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "Find the rate of growth when t = 10, to the nearest whole number (people per year).",
              marks: 2,
              answer: "89",
              explanation: "P'(t) = 40e^{0.08t}; P'(10) = 40e^{0.8} ≈ 89.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "Find the time taken for the population to reach 1500, to 2 decimal places.",
              marks: 2,
              answer: "13.73",
              acceptedAnswers: ["13.7"],
              explanation: "500e^{0.08t} = 1500 → t = (ln 3)/0.08 ≈ 13.73.",
            },
          ],
        },
        {
          id: "y12a-p1-q8",
          prompt:
            "At the START of each year for 3 years, $2000 is invested at 5% per annum compounded annually. Find the total value at the END of the third year.",
          latex: "\\$2000 \\text{ per year, } 5\\% \\text{ p.a.}",
          marks: 4,
          difficulty: 6,
          transfer: true,
          topicSlug: "financial-mathematics",
          topicTitle: "Financial mathematics (annuities / series)",
          remediationHref: REMEDIATION,
          answer: "6620.25",
          acceptedAnswers: ["$6620.25", "6620.3", "6620"],
          explanation:
            "Each deposit grows for 3, 2, then 1 years: 2000(1.05)³ + 2000(1.05)² + 2000(1.05) = 2315.25 + 2205 + 2100 = $6620.25.",
        },
        {
          id: "y12a-p1-q9",
          prompt:
            "Test scores are normally distributed with mean 60 and standard deviation 12.",
          latex: "\\mu = 60,\\ \\sigma = 12",
          marks: 3,
          difficulty: 4,
          topicSlug: "statistical-analysis",
          topicTitle: "The normal distribution",
          remediationHref: REMEDIATION,
          explanation:
            "z = (84 − 60)/12 = 2. By the empirical rule, 95% lie within 2 sd, so 5% lie outside, and 2.5% lie above 84.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the z-score of a test score of 84.",
              marks: 1,
              answer: "2",
              explanation: "z = (84 − 60)/12 = 2.",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "Using the empirical (68–95–99.7) rule, what percentage of scores are above 84?",
              marks: 2,
              answer: "2.5%",
              acceptedAnswers: ["2.5", "2.5 %"],
              explanation:
                "95% lie within 2 sd of the mean, so 2.5% lie above 84.",
            },
          ],
        },
        {
          id: "y12a-p1-q10",
          prompt:
            "An open box is made from a 12 cm × 12 cm square sheet by cutting a square of side x from each corner and folding up the sides.",
          latex: "V(x) = x(12 - 2x)^2",
          marks: 4,
          difficulty: 6,
          topicSlug: "calculus-applications",
          topicTitle: "Optimisation",
          remediationHref: REMEDIATION,
          explanation:
            "V'(x) = (12 − 2x)(12 − 6x), zero at x = 2 (x = 6 gives V = 0). V(2) = 2 × 8² = 128 cm³.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Write an expression for the volume V(x).",
              marks: 1,
              answer: "x(12-2x)^2",
              acceptedAnswers: ["4x^3-48x^2+144x", "x(12-2x)(12-2x)"],
              explanation: "Base (12 − 2x) by (12 − 2x), height x: V = x(12 − 2x)².",
            },
            {
              key: "b",
              label: "(b)",
              prompt:
                "Find the value of x that maximises the volume.",
              marks: 2,
              answer: "2",
              explanation:
                "V'(x) = (12 − 2x)(12 − 6x) = 0 → x = 2 (x = 6 gives zero volume).",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the maximum volume, in cm³.",
              marks: 1,
              answer: "128",
              acceptedAnswers: ["128 cm^3"],
              explanation: "V(2) = 2 × (12 − 4)² = 2 × 64 = 128 cm³.",
            },
          ],
        },
      ],
    },
  ],
};
