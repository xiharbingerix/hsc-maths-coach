import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 12 Mathematics Extension 2 lessons. All answers
// SymPy-verified. Auto-markable (single values / expressions).

export const complexArithmeticChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e2-ca-1",
    prompt: "Simplify $(2 + 3i)(4 - i)$, giving your answer in the form $a + bi$.",
    latex: "(2 + 3i)(4 - i)",
    answer: "11+10i",
    acceptedAnswers: ["11 + 10i", "11+10*i"],
    hint: "Expand using the distributive law and replace i² with −1.",
    explanation:
      "$(2+3i)(4-i) = 8 - 2i + 12i - 3i^2 = 8 + 10i + 3 = 11 + 10i$.",
  },
  {
    id: "chal-y12e2-ca-2",
    prompt:
      "Express $\\dfrac{1 + 2i}{3 - i}$ in the form $a + bi$.",
    latex: "\\dfrac{1 + 2i}{3 - i}",
    answer: "1/10 + 7/10 i",
    acceptedAnswers: ["0.1+0.7i", "(1+7i)/10", "1/10+7i/10", "0.1 + 0.7i"],
    hint: "Multiply numerator and denominator by the conjugate 3 + i.",
    explanation:
      "$\\dfrac{(1+2i)(3+i)}{(3-i)(3+i)} = \\dfrac{1 + 7i}{10} = \\tfrac{1}{10} + \\tfrac{7}{10}i$.",
  },
  {
    id: "chal-y12e2-ca-3",
    prompt: "Simplify $i^{2023}$.",
    latex: "i^{2023}",
    answer: "-i",
    hint: "Find the remainder when 2023 is divided by 4.",
    explanation:
      "Since 2023 = 4 × 505 + 3, the power $i^{2023} = i^3 = -i$.",
  },
];

export const modulusArgumentChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e2-ma-1",
    prompt: "Find the modulus of $5 - 12i$.",
    latex: "|5 - 12i|",
    answer: "13",
    hint: "Use |a + bi| = √(a² + b²).",
    explanation: "$|5 - 12i| = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
  },
  {
    id: "chal-y12e2-ma-2",
    prompt:
      "Find the principal argument of $1 + i\\sqrt{3}$.",
    latex: "\\arg(1 + i\\sqrt{3})",
    answer: "pi/3",
    acceptedAnswers: ["π/3", "\\dfrac{\\pi}{3}", "60°"],
    hint: "The point is in the first quadrant; use tan θ = (imaginary)/(real).",
    explanation:
      "$\\tan\\theta = \\dfrac{\\sqrt{3}}{1} = \\sqrt{3}$, so $\\theta = \\tfrac{\\pi}{3}$.",
  },
  {
    id: "chal-y12e2-ma-3",
    prompt:
      "Using the multiplicative property of modulus, find $|(3 + 4i)(1 - i)|$ (exact value).",
    latex: "|(3 + 4i)(1 - i)|",
    answer: "5sqrt(2)",
    acceptedAnswers: ["5√2", "5 sqrt(2)", "5\\sqrt{2}"],
    hint: "|zw| = |z| × |w| — find each modulus separately.",
    explanation:
      "$|3+4i|\\,|1-i| = 5 \\times \\sqrt{2} = 5\\sqrt{2}$.",
  },
];

export const polarDeMoivreChallenge: PracticeQuestion[] = [
  {
    id: "chal-y12e2-dm-1",
    prompt:
      "Use De Moivre's theorem to evaluate $(\\cos 30° + i\\sin 30°)^6$.",
    latex: "(\\cos 30° + i\\sin 30°)^6",
    answer: "-1",
    hint: "By De Moivre's theorem, raise to the power by multiplying the angle by 6.",
    explanation:
      "$(\\cos 30° + i\\sin 30°)^6 = \\cos 180° + i\\sin 180° = -1$.",
  },
  {
    id: "chal-y12e2-dm-2",
    prompt: "Evaluate $(1 + i)^8$.",
    latex: "(1 + i)^8",
    answer: "16",
    hint: "Write 1 + i in polar form: modulus √2, argument π/4.",
    explanation:
      "$|1+i| = \\sqrt{2}$, $\\arg = \\tfrac{\\pi}{4}$. So $(1+i)^8 = (\\sqrt{2})^8\\operatorname{cis}(2\\pi) = 16$.",
  },
  {
    id: "chal-y12e2-dm-3",
    prompt:
      "Find the modulus of $\\left(2\\operatorname{cis}\\tfrac{\\pi}{5}\\right)^3$.",
    latex: "\\left|\\left(2\\operatorname{cis}\\tfrac{\\pi}{5}\\right)^3\\right|",
    answer: "8",
    hint: "The modulus of zⁿ is |z|ⁿ.",
    explanation: "$|2\\operatorname{cis}\\tfrac{\\pi}{5}|^3 = 2^3 = 8$.",
  },
];
