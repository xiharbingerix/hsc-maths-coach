import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Level-6 challenge sets for Year 11 Mathematics Extension lessons. All answers
// SymPy-verified. Auto-markable (single values / expressions).

export const combinationsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11e-comb-1",
    prompt:
      "In how many ways can a committee of 3 be chosen from 8 people?",
    latex: "",
    answer: "56",
    hint: "Order does not matter, so use a combination.",
    explanation: "$\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3!} = 56$.",
  },
  {
    id: "chal-y11e-comb-2",
    prompt:
      "From 5 men and 4 women, how many committees of 3 contain exactly 2 men?",
    latex: "",
    answer: "40",
    hint: "Choose 2 of the 5 men AND 1 of the 4 women, then multiply.",
    explanation:
      "$\\binom{5}{2}\\binom{4}{1} = 10 \\times 4 = 40$.",
  },
  {
    id: "chal-y11e-comb-3",
    prompt: "In how many ways can 4 cards be chosen from a standard deck of 52?",
    latex: "",
    answer: "270725",
    acceptedAnswers: ["270,725"],
    hint: "Order does not matter — use a single combination.",
    explanation: "$\\binom{52}{4} = 270725$.",
  },
];

export const rootsCoefficientsChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11e-rc-1",
    prompt:
      "The quadratic $2x^2 - 6x + 1 = 0$ has roots α and β. Find α + β.",
    latex: "2x^2 - 6x + 1 = 0",
    answer: "3",
    hint: "The sum of roots is −b/a.",
    explanation: "$\\alpha + \\beta = -\\dfrac{-6}{2} = 3$.",
  },
  {
    id: "chal-y11e-rc-2",
    prompt:
      "For the same equation $2x^2 - 6x + 1 = 0$, find the product αβ.",
    latex: "2x^2 - 6x + 1 = 0",
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    hint: "The product of roots is c/a.",
    explanation: "$\\alpha\\beta = \\dfrac{1}{2}$.",
  },
  {
    id: "chal-y11e-rc-3",
    prompt:
      "For $2x^2 - 6x + 1 = 0$ with roots α and β, find $\\alpha^2 + \\beta^2$.",
    latex: "",
    answer: "8",
    hint: "Use the identity α² + β² = (α + β)² − 2αβ.",
    explanation:
      "$(\\alpha+\\beta)^2 - 2\\alpha\\beta = 3^2 - 2\\left(\\tfrac{1}{2}\\right) = 9 - 1 = 8$.",
  },
];

export const doubleAngleChallenge: PracticeQuestion[] = [
  {
    id: "chal-y11e-da-1",
    prompt:
      "Given $\\sin\\theta = \\tfrac{5}{13}$ with θ acute, find $\\cos 2\\theta$.",
    latex: "",
    answer: "119/169",
    hint: "Use cos 2θ = 1 − 2sin²θ.",
    explanation:
      "$\\cos 2\\theta = 1 - 2\\left(\\tfrac{25}{169}\\right) = \\tfrac{119}{169}$.",
  },
  {
    id: "chal-y11e-da-2",
    prompt: "Find the exact value of $2\\sin 15° \\cos 15°$.",
    latex: "2\\sin 15°\\cos 15°",
    answer: "1/2",
    acceptedAnswers: ["0.5"],
    hint: "Recognise the double-angle form 2 sin A cos A = sin 2A.",
    explanation: "$2\\sin 15°\\cos 15° = \\sin 30° = \\tfrac{1}{2}$.",
  },
  {
    id: "chal-y11e-da-3",
    prompt:
      "θ is acute with $\\cos\\theta = \\tfrac{\\sqrt{3}}{2}$. Find the exact value of $\\sin 2\\theta$.",
    latex: "",
    answer: "sqrt(3)/2",
    acceptedAnswers: ["√3/2", "\\dfrac{\\sqrt{3}}{2}", "\\sqrt{3}/2"],
    hint: "Here θ = 30°, so sin θ = 1/2.",
    explanation:
      "$\\sin 2\\theta = 2\\left(\\tfrac{1}{2}\\right)\\left(\\tfrac{\\sqrt{3}}{2}\\right) = \\tfrac{\\sqrt{3}}{2}$.",
  },
];
