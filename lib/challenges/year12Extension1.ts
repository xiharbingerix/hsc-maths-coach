import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Extension 1 lessons. All answers
// SymPy-verified. Auto-markable (single values / expressions / inequalities).

export const inverseTrigChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e1-it-1",
    prompt: "Find the exact value of $\\sin(\\cos^{-1}\\tfrac{3}{5})$.",
    latex: "\\sin\\left(\\cos^{-1}\\tfrac{3}{5}\\right)",
    answer: "4/5",
    acceptedAnswers: ["0.8"],
    hint: "Draw a right triangle with cos θ = 3/5 and find the opposite side.",
    explanation:
      "If $\\cos\\theta = \\tfrac{3}{5}$ then (3-4-5 triangle) $\\sin\\theta = \\tfrac{4}{5}$.",
  },
  {
    id: "chal-y12e1-it-2",
    prompt: "State the domain of $f(x) = \\sin^{-1}(2x-1)$.",
    latex: "f(x) = \\sin^{-1}(2x-1)",
    answer: "0 <= x <= 1",
    acceptedAnswers: ["0<=x<=1", "[0,1]", "0 ≤ x ≤ 1", "0 \\le x \\le 1"],
    hint: "The input of arcsin must lie between −1 and 1.",
    explanation:
      "Require $-1 \\le 2x-1 \\le 1$, which gives $0 \\le x \\le 1$.",
  },
  {
    id: "chal-y12e1-it-3",
    prompt: "Find the exact value of $\\cos(2\\sin^{-1}\\tfrac{1}{3})$.",
    latex: "\\cos\\left(2\\sin^{-1}\\tfrac{1}{3}\\right)",
    answer: "7/9",
    hint: "Use the double-angle identity $\\cos 2\\theta = 1 - 2\\sin^2\\theta$.",
    explanation:
      "With $\\sin\\theta = \\tfrac{1}{3}$: $\\cos 2\\theta = 1 - 2\\left(\\tfrac{1}{9}\\right) = \\tfrac{7}{9}$.",
  },
];

export const vectorsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e1-vec-1",
    prompt:
      "Given $\\mathbf{a}=2\\mathbf{i}+3\\mathbf{j}$ and $\\mathbf{b}=\\mathbf{i}-\\mathbf{j}$, find $\\mathbf{a}\\cdot\\mathbf{b}$.",
    latex: "\\mathbf{a}=2\\mathbf{i}+3\\mathbf{j},\\quad \\mathbf{b}=\\mathbf{i}-\\mathbf{j}",
    answer: "-1",
    hint: "Multiply matching components and add.",
    explanation: "$2(1) + 3(-1) = -1$.",
  },
  {
    id: "chal-y12e1-vec-2",
    prompt:
      "Find the value of k for which $2\\mathbf{i}+k\\mathbf{j}$ is perpendicular to $3\\mathbf{i}-6\\mathbf{j}$.",
    latex: "(2\\mathbf{i}+k\\mathbf{j}) \\perp (3\\mathbf{i}-6\\mathbf{j})",
    answer: "1",
    hint: "Perpendicular vectors have a dot product of zero.",
    explanation: "$2(3) + k(-6) = 6 - 6k = 0 \\Rightarrow k = 1$.",
  },
  {
    id: "chal-y12e1-vec-3",
    prompt:
      "Find the cosine of the angle between the vectors $(1,2,2)$ and $(2,2,1)$.",
    latex: "\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}|\\,|\\mathbf{b}|}",
    answer: "8/9",
    hint: "Both vectors have magnitude 3.",
    explanation:
      "$\\mathbf{a}\\cdot\\mathbf{b} = 2+4+2 = 8$, and $|\\mathbf{a}| = |\\mathbf{b}| = 3$, so $\\cos\\theta = \\tfrac{8}{9}$.",
  },
];

export const inductionChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e1-ind-1",
    prompt:
      "In proving $1+2+\\cdots+n = \\tfrac{n(n+1)}{2}$ by induction, what term is added to both sides going from $n=k$ to $n=k+1$?",
    latex: "1+2+\\cdots+k+\\;?\\;=\\frac{(k+1)(k+2)}{2}",
    answer: "k+1",
    acceptedAnswers: ["(k+1)"],
    hint: "It is the next term in the sum.",
    explanation: "The $(k+1)$th term, namely $k+1$, is added.",
  },
  {
    id: "chal-y12e1-ind-2",
    prompt:
      "When proving $\\sum_{r=1}^{n} r^2 = \\tfrac{n(n+1)(2n+1)}{6}$, the $k+1$ form factors to $\\tfrac{(k+1)(k+2)(\\,?\\,)}{6}$. Find the missing factor.",
    latex: "\\frac{(k+1)(k+2)(\\,?\\,)}{6}",
    answer: "2k+3",
    acceptedAnswers: ["2k + 3"],
    hint: "Replace n with k+1 in the factor 2n+1.",
    explanation: "$2(k+1)+1 = 2k+3$.",
  },
  {
    id: "chal-y12e1-ind-3",
    prompt:
      "Simplify $(k+1)^3 + 2(k+1) - (k^3 + 2k)$ — the change at the inductive step for divisibility of $n^3+2n$ by 3.",
    latex: "(k+1)^3 + 2(k+1) - (k^3 + 2k)",
    answer: "3k^2+3k+3",
    acceptedAnswers: ["3(k^2+k+1)", "3k^2 + 3k + 3"],
    hint: "Expand and collect like terms.",
    explanation:
      "Expanding gives $3k^2 + 3k + 3 = 3(k^2+k+1)$, a multiple of 3.",
  },
];
