import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 11 Mathematics Advanced lessons. All answers
// SymPy-verified. Auto-markable (single values / expressions).

export const discriminantChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11a-disc-1",
    prompt:
      "For what positive value of k does $x^2 + kx + 9 = 0$ have exactly one (repeated) root?",
    latex: "x^2 + kx + 9 = 0",
    answer: "6",
    acceptedAnswers: ["k=6", "k = 6"],
    hint: "A repeated root means the discriminant equals zero.",
    explanation:
      "$\\Delta = k^2 - 36 = 0$ gives $k = \\pm 6$; the positive value is $k = 6$.",
  },
  {
    id: "chal-y11a-disc-2",
    prompt:
      "Describe the nature of the roots of $3x^2 - 2x + 5 = 0$.",
    latex: "3x^2 - 2x + 5 = 0",
    answer: "no real roots",
    acceptedAnswers: ["no real solutions", "none", "0 real roots", "no roots"],
    hint: "Evaluate the discriminant and check its sign.",
    explanation:
      "$\\Delta = (-2)^2 - 4(3)(5) = -56 < 0$, so there are no real roots.",
  },
  {
    id: "chal-y11a-disc-3",
    prompt:
      "For what values of c does $x^2 + 6x + c = 0$ have no real roots?",
    latex: "x^2 + 6x + c = 0",
    answer: "c > 9",
    acceptedAnswers: ["c>9"],
    hint: "No real roots means the discriminant is negative.",
    explanation:
      "$\\Delta = 36 - 4c < 0 \\Rightarrow c > 9$.",
  },
];

export const completingSquareChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11a-cts-1",
    prompt:
      "Write $x^2 + 8x + 10$ in completed-square form $(x + h)^2 + k$.",
    latex: "x^2 + 8x + 10",
    answer: "(x+4)^2-6",
    acceptedAnswers: ["(x+4)^2 - 6", "(x + 4)^2 - 6"],
    hint: "Halve the coefficient of x to find h, then adjust the constant.",
    explanation:
      "$x^2 + 8x + 10 = (x+4)^2 - 16 + 10 = (x+4)^2 - 6$.",
  },
  {
    id: "chal-y11a-cts-2",
    prompt:
      "Find the minimum value of $x^2 - 10x + 30$.",
    latex: "x^2 - 10x + 30",
    answer: "5",
    hint: "Complete the square; the minimum is the constant left over.",
    explanation:
      "$x^2 - 10x + 30 = (x-5)^2 + 5$, so the minimum value is $5$.",
  },
  {
    id: "chal-y11a-cts-3",
    prompt:
      "Writing $x^2 - 4x + 1$ as $(x - h)^2 + k$, find the value of $h + k$.",
    latex: "x^2 - 4x + 1 = (x - h)^2 + k",
    answer: "-1",
    hint: "First complete the square to read off h and k.",
    explanation:
      "$x^2 - 4x + 1 = (x-2)^2 - 3$, so $h = 2$, $k = -3$ and $h + k = -1$.",
  },
];

export const surdsIndicesChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11a-surd-1",
    prompt:
      "Rationalise the denominator and simplify $\\dfrac{1}{\\sqrt{5} - 2}$.",
    latex: "\\dfrac{1}{\\sqrt{5} - 2}",
    answer: "sqrt(5)+2",
    acceptedAnswers: ["√5+2", "2+√5", "2 + sqrt(5)", "\\sqrt{5}+2"],
    hint: "Multiply top and bottom by the conjugate √5 + 2.",
    explanation:
      "$\\dfrac{1}{\\sqrt{5}-2} \\times \\dfrac{\\sqrt{5}+2}{\\sqrt{5}+2} = \\dfrac{\\sqrt{5}+2}{5 - 4} = \\sqrt{5} + 2$.",
  },
  {
    id: "chal-y11a-surd-2",
    prompt: "Simplify $\\sqrt{12} + \\sqrt{27}$.",
    latex: "\\sqrt{12} + \\sqrt{27}",
    answer: "5sqrt(3)",
    acceptedAnswers: ["5√3", "5 sqrt(3)", "5\\sqrt{3}"],
    hint: "Simplify each surd to a multiple of √3, then add.",
    explanation:
      "$\\sqrt{12} + \\sqrt{27} = 2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$.",
  },
  {
    id: "chal-y11a-surd-3",
    prompt: "Evaluate $16^{3/4}$.",
    latex: "16^{3/4}",
    answer: "8",
    hint: "Take the fourth root first, then cube the result.",
    explanation: "$16^{3/4} = (16^{1/4})^3 = 2^3 = 8$.",
  },
];

export const directInverseVariationChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11a-var-1",
    prompt:
      "For a fixed area of 96 cm², the length L of a rectangle varies inversely with its width w. The cost C of a border varies directly with the perimeter. If C = 80 when w = 8, find the larger possible value of w when C = 88.",
    latex:
      "A = 96,\\quad L = \\frac{96}{w},\\quad C \\propto P",
    answer: "16",
    hint: "Use the first case to connect cost with perimeter, then solve for the new width.",
    explanation:
      "When $w = 8$, the length is $96/8 = 12$, so the perimeter is $2(8 + 12) = 40$. Since $C = 80$, the cost is 2 dollars per perimeter unit. If $C = 88$, the perimeter is 44, so $2\\left(w + \\frac{96}{w}\\right) = 44$. Hence $w + \\frac{96}{w} = 22$, giving $w^2 - 22w + 96 = 0$. This factorises to $(w - 6)(w - 16) = 0$, so the larger possible width is 16.",
  },
  {
    id: "chal-y11a-var-2",
    prompt:
      "A direct variation model y = ax and an inverse variation model y = b/x satisfy these conditions: when x = 4, their outputs add to 14; when x = 6, the direct output exceeds the inverse output by 8. Find the positive value of x for which the two models have equal output.",
    latex:
      "y = ax,\\quad y = \\frac{b}{x}",
    answer: "2sqrt(3)",
    acceptedAnswers: ["2 sqrt(3)", "2\\sqrt{3}", "2√3"],
    hint: "First determine a and b from the two conditions, then solve ax = b/x.",
    explanation:
      "When $x = 4$, $4a + \\frac{b}{4} = 14$, so $16a + b = 56$. When $x = 6$, $6a - \\frac{b}{6} = 8$, so $36a - b = 48$. Adding gives $52a = 104$, so $a = 2$. Then $b = 24$. Equality of outputs means $2x = \\frac{24}{x}$, so $x^2 = 12$. The positive solution is $x = 2\\sqrt{3}$.",
  },
];
