export type DiagnosticQuestion = {
  id: string;
  section: string;
  prompt: string;
  latex: string;
};

export const questions: DiagnosticQuestion[] = [
  {
    id: "q1",
    section: "Algebra foundations",
    prompt: "Simplify:",
    latex: "3(x - 2)^2 - 2x(x + 1)",
  },
  {
    id: "q2",
    section: "Algebra foundations",
    prompt: "Make x the subject:",
    latex: "y = 3\\,e^{2x} - 5",
  },
  {
    id: "q3",
    section: "Algebra foundations",
    prompt: "Solve:",
    latex: "2x^2 - 5x - 3 = 0",
  },
  {
    id: "q4",
    section: "Algebra foundations",
    prompt: "Simplify:",
    latex: "\\frac{(2x^3y^{-2})^2}{4xy^{-1}}",
  },
  {
    id: "q5",
    section: "Functions and graphs",
    prompt: "Find:",
    latex: "\\text{If } f(x)=2x^2-3x+1, \\text{ find } f(x+2).",
  },
  {
    id: "q6",
    section: "Functions and graphs",
    prompt: "Find the domain:",
    latex: "f(x)=\\sqrt{5-2x}",
  },
  {
    id: "q7",
    section: "Functions and graphs",
    prompt: "Describe the transformations:",
    latex: "y=x^2 \\quad \\longrightarrow \\quad y=-2(x-3)^2+5",
  },
  {
    id: "q8",
    section: "Functions and graphs",
    prompt: "Find the x-intercepts:",
    latex: "y=x^2-4x-5",
  },
  {
    id: "q9",
    section: "Trigonometry",
    prompt: "Convert to radians:",
    latex: "150^\\circ",
  },
  {
    id: "q10",
    section: "Trigonometry",
    prompt: "Evaluate exactly:",
    latex: "\\sin\\left(\\frac{\\pi}{3}\\right)+\\cos(\\pi)",
  },
  {
    id: "q11",
    section: "Trigonometry",
    prompt: "Solve:",
    latex: "\\text{For } 0 \\leq x \\leq 2\\pi, \\quad 2\\sin(x)-1=0",
  },
  {
    id: "q12",
    section: "Trigonometry",
    prompt: "State the amplitude and period:",
    latex: "y=3\\sin(2x)",
  },
  {
    id: "q13",
    section: "Calculus",
    prompt: "Differentiate:",
    latex: "y=4x^5-3x^2+7x-9",
  },
  {
    id: "q14",
    section: "Calculus",
    prompt: "Find the gradient of the tangent at x = 2:",
    latex: "y=x^3-4x",
  },
  {
    id: "q15",
    section: "Calculus",
    prompt: "Find the stationary points:",
    latex: "y=x^3-3x^2-9x+5",
  },
  {
    id: "q16",
    section: "Calculus",
    prompt: "Classify the stationary points from the previous question:",
    latex: "y=x^3-3x^2-9x+5",
  },
  {
    id: "q17",
    section: "Calculus",
    prompt: "Find the indefinite integral:",
    latex: "\\int \\left(6x^2-4x+3\\right)\\,dx",
  },
  {
    id: "q18",
    section: "Calculus",
    prompt: "Evaluate:",
    latex: "\\int_0^2 \\left(3x^2+1\\right)\\,dx",
  },
  {
    id: "q19",
    section: "Exponential and logarithmic functions",
    prompt: "Simplify, where x > 0:",
    latex: "\\ln(x^3)-\\ln(x)",
  },
  {
    id: "q20",
    section: "Exponential and logarithmic functions",
    prompt: "Solve:",
    latex: "5e^{2x}=20",
  },
  {
    id: "q21",
    section: "Exponential and logarithmic functions",
    prompt: "Find the population after 10 years, correct to the nearest whole number:",
    latex: "P(t)=500e^{0.03t}",
  },
  {
    id: "q22",
    section: "Statistics and probability",
    prompt: "How many standard deviations above the mean is Student A?",
    latex: "\\text{Mean}=68, \\quad \\text{Standard deviation}=8, \\quad \\text{Student A score}=84",
  },
  {
    id: "q23",
    section: "Statistics and probability",
    prompt: "Find the probability that both balls are red:",
    latex: "\\text{A bag contains 5 red balls and 3 blue balls. Two balls are selected without replacement.}",
  },
  {
    id: "q24",
    section: "Statistics and probability",
    prompt: "Describe the relationship:",
    latex: "r=-0.82",
  },
  {
    id: "q25",
    section: "Financial mathematics",
    prompt: "Find the value of the investment after 3 years, to the nearest cent:",
    latex: "\\$2000 \\text{ is invested at } 4\\% \\text{ p.a. compound interest for 3 years.}",
  },
];