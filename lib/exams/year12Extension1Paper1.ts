import type { ExamPaper } from "./types";

// Year 12 Extension 1 mini practice exam (Paper 1).
// Extension courses map to E-bands. g = 10 m/s^2 is stated explicitly for
// the projectile question.
const REMEDIATION = "/course/year-12-extension-1";

export const year12Extension1Paper1: ExamPaper = {
  id: "y12-ext1-paper-1",
  courseSlug: "year-12-extension-1",
  courseTitle: "Year 12 Mathematics Extension 1",
  title: "Practice Exam - Paper 1",
  description:
    "A short, timed Extension 1 paper across trigonometric equations, the binomial distribution, vectors, calculus, projectile motion and induction. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 21,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice and short answer.",
      questions: [
        {
          id: "y12e1-p1-q1",
          prompt:
            "If $\\sin A = \\frac{3}{5}$ and A is acute, what is $\\sin 2A$?",
          latex: "\\sin A=\\frac{3}{5}",
          marks: 1,
          difficulty: 3,
          topicSlug: "trigonometric-equations",
          topicTitle: "Double-angle formulae",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$\\dfrac{24}{25}$" },
            { label: "B", text: "$\\dfrac{7}{25}$" },
            { label: "C", text: "$\\dfrac{6}{5}$" },
            { label: "D", text: "$\\dfrac{12}{25}$" },
          ],
          answer: "A",
          explanation:
            "Since A is acute, $\\cos A=\\frac{4}{5}$. Therefore $\\sin 2A=2\\sin A\\cos A=2\\cdot\\frac35\\cdot\\frac45=\\frac{24}{25}$.",
        },
        {
          id: "y12e1-p1-q2",
          prompt: "Find the coefficient of $x^2$ in the expansion of $(1 + x)^6$.",
          latex: "(1+x)^6",
          marks: 1,
          difficulty: 3,
          topicSlug: "binomial-distribution",
          topicTitle: "Binomial coefficients",
          remediationHref: REMEDIATION,
          answer: "15",
          explanation: "The coefficient is $\\binom{6}{2} = 15$.",
        },
        {
          id: "y12e1-p1-q3",
          prompt: "Find the magnitude of the vector $3\\mathbf{i} - 4\\mathbf{j}$.",
          latex: "|3\\mathbf{i} - 4\\mathbf{j}|",
          marks: 1,
          difficulty: 2,
          topicSlug: "vectors",
          topicTitle: "Vectors (magnitude)",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "5" },
            { label: "B", text: "7" },
            { label: "C", text: "25" },
            { label: "D", text: "1" },
          ],
          answer: "A",
          explanation: "$\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.",
        },
        {
          id: "y12e1-p1-q4",
          prompt: "What is the derivative of $e^x\\sin x$?",
          latex: "e^x\\sin x",
          marks: 1,
          difficulty: 3,
          topicSlug: "further-calculus",
          topicTitle: "Product rule",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$e^x\\sin x+e^x\\cos x$" },
            { label: "B", text: "$e^x\\cos x$" },
            { label: "C", text: "$e^x\\sin x-e^x\\cos x$" },
            { label: "D", text: "$\\sin x+\\cos x$" },
          ],
          answer: "A",
          explanation:
            "Use the product rule: $(e^x\\sin x)'=e^x\\sin x+e^x\\cos x$.",
        },
        {
          id: "y12e1-p1-q5",
          prompt:
            "Find the cosine of the angle between the vectors $(1, 0)$ and $(1, 1)$.",
          latex: "(1,0)\\text{ and }(1,1)",
          marks: 1,
          difficulty: 4,
          topicSlug: "vectors",
          topicTitle: "Vectors (angle between)",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "0" },
            { label: "B", text: "$\\dfrac{1}{\\sqrt{2}}$" },
            { label: "C", text: "$\\dfrac{1}{2}$" },
            { label: "D", text: "1" },
          ],
          answer: "B",
          explanation:
            "Dot product = 1; magnitudes 1 and $\\sqrt2$, so $\\cos\\theta = 1/\\sqrt2$.",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y12e1-p1-q6",
          prompt: "Consider the expansion of $(1 + 2x)^5$.",
          latex: "(1 + 2x)^5",
          marks: 3,
          difficulty: 5,
          topicSlug: "binomial-distribution",
          topicTitle: "Binomial coefficients",
          remediationHref: REMEDIATION,
          explanation:
            "General term $\\binom{5}{r}(2x)^r$. For $x^2$: $\\binom{5}{2}2^2 = 10 \\times 4 = 40$. Constant term ($r=0$) is 1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the coefficient of $x^2$.",
              marks: 2,
              answer: "40",
              explanation: "$\\binom{5}{2}\\,2^2 = 10 \\times 4 = 40$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the constant term.",
              marks: 1,
              answer: "1",
              explanation: "The $r=0$ term is $\\binom{5}{0}(2x)^0 = 1$.",
            },
          ],
        },
        {
          id: "y12e1-p1-q7",
          prompt: "Let $\\mathbf{a} = (2, 3)$ and $\\mathbf{b} = (4, -1)$.",
          latex: "\\mathbf{a}=(2,3),\\quad \\mathbf{b}=(4,-1)",
          marks: 4,
          difficulty: 6,
          topicSlug: "vectors",
          topicTitle: "Vectors (dot product, projection)",
          remediationHref: REMEDIATION,
          explanation:
            "$\\mathbf{a}\\cdot\\mathbf{b} = 8 - 3 = 5$. $|\\mathbf{a}| = \\sqrt{13}$. Scalar projection of $\\mathbf{a}$ onto $\\mathbf{b}$ is $\\mathbf{a}\\cdot\\mathbf{b}/|\\mathbf{b}| = 5/\\sqrt{17}$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find $\\mathbf{a} \\cdot \\mathbf{b}$.",
              marks: 1,
              answer: "5",
              explanation: "$2(4) + 3(-1) = 5$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find $|\\mathbf{a}|$ as an exact value.",
              marks: 1,
              answer: "sqrt(13)",
              acceptedAnswers: ["\\sqrt{13}", "13^(1/2)"],
              explanation: "$|\\mathbf{a}| = \\sqrt{2^2+3^2} = \\sqrt{13}$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt:
                "Find the scalar projection of $\\mathbf{a}$ onto $\\mathbf{b}$ as an exact value.",
              marks: 2,
              answer: "5/sqrt(17)",
              acceptedAnswers: ["5\\sqrt{17}/17", "(5\\sqrt{17})/17", "1.21"],
              explanation:
                "Scalar projection $= \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|} = \\dfrac{5}{\\sqrt{17}}$.",
            },
          ],
        },
        {
          id: "y12e1-p1-q8",
          prompt:
            "A projectile is launched at 20 m/s at 30 degrees to the horizontal. Take g = 10 metres per second squared.",
          latex: "u = 20\\text{ m/s},\\quad \\theta = 30^\\circ,\\quad g = 10\\text{ m/s}^2",
          marks: 4,
          difficulty: 6,
          transfer: true,
          topicSlug: "projectile-motion",
          topicTitle: "Projectile motion",
          remediationHref: REMEDIATION,
          explanation:
            "Vertical launch speed = $20\\sin30^\\circ = 10$ m/s. Time to maximum height is $10/g = 1$ s. Maximum height is $10^2/(2g) = 5$ m.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find the initial vertical velocity, in m/s.",
              marks: 1,
              answer: "10",
              acceptedAnswers: ["10 m/s"],
              explanation: "$20\\sin 30^\\circ = 10$ m/s.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the time to reach maximum height, in seconds.",
              marks: 1,
              answer: "1",
              acceptedAnswers: ["1 s"],
              explanation:
                "At maximum height the vertical velocity is 0, so $t = 10/10 = 1$ s.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the maximum height, in metres.",
              marks: 2,
              answer: "5",
              acceptedAnswers: ["5 m"],
              explanation: "$H = \\dfrac{10^2}{2(10)} = 5$ m.",
            },
          ],
        },
        {
          id: "y12e1-p1-q9",
          prompt: "Evaluate the definite integral.",
          latex: "\\int_0^1 x e^x \\, dx",
          marks: 3,
          difficulty: 6,
          topicSlug: "further-calculus",
          topicTitle: "Integration by parts",
          remediationHref: REMEDIATION,
          answer: "1",
          explanation:
            "By parts: $\\int x e^x dx = e^x(x-1)$. Evaluating from 0 to 1 gives $0 - (-1) = 1$.",
        },
        {
          id: "y12e1-p1-q10",
          prompt:
            "In an induction proof of $1+2+\\cdots+n = \\tfrac{n(n+1)}{2}$, simplify the $k+1$ step: $\\tfrac{k(k+1)}{2} + (k+1)$. Give the factored form.",
          latex: "\\frac{k(k+1)}{2} + (k+1)",
          marks: 2,
          difficulty: 5,
          topicSlug: "proof-induction",
          topicTitle: "Mathematical induction",
          remediationHref: REMEDIATION,
          answer: "(k+1)(k+2)/2",
          acceptedAnswers: ["(k^2+3k+2)/2"],
          explanation:
            "Factor out $(k+1)$: $\\dfrac{k(k+1)}{2} + (k+1) = \\dfrac{(k+1)(k+2)}{2}$.",
        },
      ],
    },
  ],
};
