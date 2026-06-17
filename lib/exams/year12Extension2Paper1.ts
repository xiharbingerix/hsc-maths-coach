import type { ExamPaper } from "./types";

// Year 12 Mathematics Extension 2 — mini practice exam (Paper 1).
// Every answer SymPy-verified. Extension 2 maps to the E-band scale
// (year-12-extension-2 is in EXTENSION_SLUGS). Covers complex numbers,
// vectors in 3D, integration by parts and roots of unity.
const REMEDIATION = "/course/year-12-extension-2";

export const year12Extension2Paper1: ExamPaper = {
  id: "y12-ext2-paper-1",
  courseSlug: "year-12-extension-2",
  courseTitle: "Year 12 Mathematics Extension 2",
  title: "Practice Exam — Paper 1",
  description:
    "A short, timed Extension 2 paper across complex numbers, vectors in three dimensions, further calculus and roots of unity. Work under exam conditions, then review your predicted band and the topics to revise.",
  timeLimitMins: 40,
  totalMarks: 22,
  sections: [
    {
      title: "Section I",
      instructions: "Multiple choice. Choose the best answer.",
      questions: [
        {
          id: "y12e2-p1-q1",
          prompt: "Simplify (3 + 2i)(1 − i).",
          latex: "(3 + 2i)(1 - i)",
          marks: 1,
          difficulty: 3,
          topicSlug: "complex-number-arithmetic",
          topicTitle: "Complex number arithmetic",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$5 - i$" },
            { label: "B", text: "$1 - i$" },
            { label: "C", text: "$5 + i$" },
            { label: "D", text: "$3 - 2i$" },
          ],
          answer: "A",
          explanation:
            "$(3+2i)(1-i) = 3 - 3i + 2i - 2i^2 = 3 - i + 2 = 5 - i$.",
        },
        {
          id: "y12e2-p1-q2",
          prompt: "Find the modulus of 3 + 4i.",
          latex: "|3 + 4i|",
          marks: 1,
          difficulty: 2,
          topicSlug: "modulus-argument-conjugate",
          topicTitle: "Modulus and argument",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "5" },
            { label: "B", text: "7" },
            { label: "C", text: "25" },
            { label: "D", text: "$\\sqrt{7}$" },
          ],
          answer: "A",
          explanation: "$|3 + 4i| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$.",
        },
        {
          id: "y12e2-p1-q3",
          prompt: "Simplify i¹⁵.",
          latex: "i^{15}",
          marks: 1,
          difficulty: 3,
          topicSlug: "complex-number-arithmetic",
          topicTitle: "Powers of i",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "$-i$" },
            { label: "B", text: "$i$" },
            { label: "C", text: "$-1$" },
            { label: "D", text: "$1$" },
          ],
          answer: "A",
          explanation:
            "$i^{15} = i^{12} \\cdot i^3 = 1 \\cdot (-i) = -i$ (since $15 = 4 \\times 3 + 3$).",
        },
        {
          id: "y12e2-p1-q4",
          prompt:
            "Find the dot product of the vectors (1, 2, 2) and (2, 0, −1).",
          latex: "(1,2,2)\\cdot(2,0,-1)",
          marks: 1,
          difficulty: 3,
          topicSlug: "dot-product-and-angle",
          topicTitle: "Dot product in 3D",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "0" },
            { label: "B", text: "4" },
            { label: "C", text: "$-2$" },
            { label: "D", text: "5" },
          ],
          answer: "A",
          explanation:
            "$(1)(2) + (2)(0) + (2)(-1) = 2 + 0 - 2 = 0$ (the vectors are perpendicular).",
        },
        {
          id: "y12e2-p1-q5",
          prompt: "What is the sum of all five fifth-roots of unity?",
          latex: "\\sum_{k=0}^{4} \\operatorname{cis}\\tfrac{2\\pi k}{5}",
          marks: 1,
          difficulty: 4,
          topicSlug: "roots-of-unity",
          topicTitle: "Roots of unity",
          remediationHref: REMEDIATION,
          choices: [
            { label: "A", text: "0" },
            { label: "B", text: "1" },
            { label: "C", text: "5" },
            { label: "D", text: "$-1$" },
          ],
          answer: "A",
          explanation:
            "The nth roots of unity sum to 0 for $n \\ge 2$ (they are symmetric about the origin).",
        },
      ],
    },
    {
      title: "Section II",
      instructions: "Extended response. Enter each part's final answer.",
      questions: [
        {
          id: "y12e2-p1-q6",
          prompt: "Consider the complex number z = 1 + i.",
          latex: "z = 1 + i",
          marks: 3,
          difficulty: 5,
          topicSlug: "modulus-argument-conjugate",
          topicTitle: "Modulus, argument and powers",
          remediationHref: REMEDIATION,
          explanation:
            "$|z| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$; $\\arg z = \\tfrac{\\pi}{4}$; $z^2 = (1+i)^2 = 1 + 2i + i^2 = 2i$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find |z| (exact value).",
              marks: 1,
              answer: "sqrt(2)",
              acceptedAnswers: ["√2", "\\sqrt{2}", "2^(1/2)"],
              explanation: "$|z| = \\sqrt{1 + 1} = \\sqrt{2}$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find arg z (principal argument).",
              marks: 1,
              answer: "pi/4",
              acceptedAnswers: ["π/4", "\\dfrac{\\pi}{4}", "45°"],
              explanation: "Both parts equal and positive, so $\\arg z = \\tfrac{\\pi}{4}$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find z² in the form a + bi.",
              marks: 1,
              answer: "2i",
              acceptedAnswers: ["0+2i", "2*i"],
              explanation: "$(1+i)^2 = 1 + 2i + i^2 = 2i$.",
            },
          ],
        },
        {
          id: "y12e2-p1-q7",
          prompt:
            "The polynomial P(x) = x² − 6x + 13 has complex roots.",
          latex: "P(x) = x^2 - 6x + 13",
          marks: 3,
          difficulty: 5,
          topicSlug: "complex-polynomials",
          topicTitle: "Complex polynomials",
          remediationHref: REMEDIATION,
          explanation:
            "By the quadratic formula the roots are $3 \\pm 2i$. Their sum is 6 and product is 13 (matching $-\\tfrac{b}{a}$ and $\\tfrac{c}{a}$).",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find both roots, in the form a ± bi.",
              marks: 1,
              answer: "3+/-2i",
              acceptedAnswers: ["3±2i", "3+2i, 3-2i", "3 ± 2i", "3+2i and 3-2i"],
              explanation:
                "$x = \\dfrac{6 \\pm \\sqrt{36 - 52}}{2} = 3 \\pm 2i$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "State the sum of the roots.",
              marks: 1,
              answer: "6",
              explanation: "Sum $= -\\tfrac{b}{a} = 6$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "State the product of the roots.",
              marks: 1,
              answer: "13",
              explanation: "Product $= \\tfrac{c}{a} = 13$.",
            },
          ],
        },
        {
          id: "y12e2-p1-q8",
          prompt:
            "Let a = (1, 2, 2) and b = (2, −1, 2).",
          latex: "\\mathbf{a} = (1,2,2),\\quad \\mathbf{b} = (2,-1,2)",
          marks: 3,
          difficulty: 5,
          topicSlug: "dot-product-and-angle",
          topicTitle: "Dot product and angle",
          remediationHref: REMEDIATION,
          explanation:
            "$\\mathbf{a}\\cdot\\mathbf{b} = 2 - 2 + 4 = 4$. $|\\mathbf{a}| = |\\mathbf{b}| = 3$. So $\\cos\\theta = \\dfrac{4}{3 \\times 3} = \\dfrac{4}{9}$.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "Find a · b.",
              marks: 1,
              answer: "4",
              explanation: "$(1)(2) + (2)(-1) + (2)(2) = 4$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find |a|.",
              marks: 1,
              answer: "3",
              explanation: "$|\\mathbf{a}| = \\sqrt{1 + 4 + 4} = 3$.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the cosine of the angle between a and b.",
              marks: 1,
              answer: "4/9",
              acceptedAnswers: ["0.444", "0.44"],
              explanation:
                "$\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|} = \\dfrac{4}{9}$.",
            },
          ],
        },
        {
          id: "y12e2-p1-q9",
          prompt: "Evaluate the definite integral using integration by parts.",
          latex: "\\int_0^{\\pi/2} x\\cos x \\, dx",
          marks: 3,
          difficulty: 6,
          topicSlug: "integration-by-parts-extension",
          topicTitle: "Integration by parts",
          remediationHref: REMEDIATION,
          answer: "pi/2 - 1",
          acceptedAnswers: ["π/2 - 1", "\\dfrac{\\pi}{2}-1", "(pi-2)/2", "0.5708"],
          explanation:
            "With $u = x$, $dv = \\cos x\\,dx$: $\\int x\\cos x\\,dx = x\\sin x + \\cos x$. Evaluating from 0 to $\\tfrac{\\pi}{2}$: $\\left(\\tfrac{\\pi}{2} + 0\\right) - (0 + 1) = \\tfrac{\\pi}{2} - 1$.",
        },
        {
          id: "y12e2-p1-q10",
          prompt: "Consider the equation z³ = 1 over the complex numbers.",
          latex: "z^3 = 1",
          marks: 3,
          difficulty: 6,
          topicSlug: "roots-of-unity",
          topicTitle: "Roots of unity",
          remediationHref: REMEDIATION,
          explanation:
            "The three cube roots of unity are $1$, $\\operatorname{cis}\\tfrac{2\\pi}{3}$ and $\\operatorname{cis}\\tfrac{4\\pi}{3}$. Their sum is 0 and their product is 1.",
          parts: [
            {
              key: "a",
              label: "(a)",
              prompt: "State the real cube root of unity.",
              marks: 1,
              answer: "1",
              explanation: "$z = 1$ satisfies $z^3 = 1$.",
            },
            {
              key: "b",
              label: "(b)",
              prompt: "Find the sum of the three cube roots of unity.",
              marks: 1,
              answer: "0",
              explanation:
                "The roots are symmetric about the origin (coefficient of $z^2$ is 0), so the sum is 0.",
            },
            {
              key: "c",
              label: "(c)",
              prompt: "Find the product of the three cube roots of unity.",
              marks: 1,
              answer: "1",
              explanation:
                "For $z^3 - 1 = 0$ the product of roots is $-\\tfrac{(-1)}{1} = 1$.",
            },
          ],
        },
      ],
    },
  ],
};
