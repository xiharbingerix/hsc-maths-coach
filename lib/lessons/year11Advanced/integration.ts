import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function fa(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers };
}

function mc(
  id: string,
  prompt: string,
  answer: string,
  choices: { label: string; text: string }[],
  explanation: string,
  latex?: string
): PracticeQuestion {
  return { id, prompt, latex: latex ?? "", answer, choices, explanation };
}

// ─── L1: Primitives and Antidifferentiation ──────────────────────────────────

const primWorked: WorkedExample[] = [
  {
    title: "Find a primitive using the reverse power rule",
    questionLatex: "\\int 6x^2\\,dx",
    steps: [
      { explanation: "The power is 2. Increase it by one to get 3.", latex: "x^{2+1}=x^3" },
      { explanation: "Divide the coefficient by the new power.", latex: "\\frac{6}{3}x^3=2x^3" },
      { explanation: "Add the constant of integration.", latex: "2x^3+C" },
      { explanation: "Check by differentiating.", latex: "\\frac{d}{dx}(2x^3+C)=6x^2\\checkmark" },
    ],
    finalAnswerLatex: "2x^3+C",
  },
  {
    title: "Find a primitive for a polynomial",
    questionLatex: "\\int (3x^2-4x+5)\\,dx",
    steps: [
      { explanation: "Integrate term by term.", latex: "" },
      { explanation: "Antidifferentiate 3x².", latex: "\\frac{3}{3}x^3=x^3" },
      { explanation: "Antidifferentiate −4x.", latex: "\\frac{-4}{2}x^2=-2x^2" },
      { explanation: "Antidifferentiate the constant 5.", latex: "5x" },
      { explanation: "Combine and add a single +C.", latex: "x^3-2x^2+5x+C" },
    ],
    finalAnswerLatex: "x^3-2x^2+5x+C",
  },
  {
    title: "Integrate a negative power",
    questionLatex: "\\int 4x^{-3}\\,dx",
    steps: [
      { explanation: "Increase the power from −3 to −2.", latex: "x^{-3+1}=x^{-2}" },
      { explanation: "Divide the coefficient by the new power.", latex: "\\frac{4}{-2}x^{-2}=-2x^{-2}" },
      { explanation: "Add the constant of integration.", latex: "-2x^{-2}+C" },
    ],
    finalAnswerLatex: "-2x^{-2}+C",
  },
];

const primGuided: PracticeQuestion[] = [
  fa("y11adv-intg-prim-g1", "Find the primitive.", "\\int 8x^3\\,dx", "2x^4+C", ["2x^4 + C"]),
  mc("y11adv-intg-prim-g2", "What is the new power when integrating x⁵?", "B",
    [{ label: "A", text: "5" }, { label: "B", text: "6" }, { label: "C", text: "4" }, { label: "D", text: "10" }],
    "Integrating increases the power by one: 5 + 1 = 6.", "\\int x^5\\,dx"),
  fa("y11adv-intg-prim-g3", "Find the primitive.", "\\int (2x+3)\\,dx", "x^2+3x+C", ["x^2 + 3x + C"]),
  mc("y11adv-intg-prim-g4", "Which function is an antiderivative of 4x³?", "C",
    [{ label: "A", text: "$12x^2$" }, { label: "B", text: "$4x^4$" }, { label: "C", text: "$x^4$" }, { label: "D", text: "$x^4+7$" }],
    "Both x⁴ and x⁴+7 differentiate to 4x³, but only x⁴ alone is listed in options A–C as a primitive.", ""),
];

const primIndep: PracticeQuestion[] = [
  fa("y11adv-intg-prim-i1", "Find the primitive.", "\\int 10x^4\\,dx", "2x^5+C", ["2x^5 + C"]),
  fa("y11adv-intg-prim-i2", "Find the primitive.", "\\int -6x^2\\,dx", "-2x^3+C", ["-2x^3 + C"]),
  fa("y11adv-intg-prim-i3", "Find the primitive.", "\\int (x^2+2x-1)\\,dx", "x^3/3+x^2-x+C", ["(1/3)x^3+x^2-x+C"]),
  fa("y11adv-intg-prim-i4", "Find the primitive.", "\\int x^7\\,dx", "x^8/8+C", ["(1/8)x^8+C"]),
  mc("y11adv-intg-prim-i5", "What does the constant of integration C represent?", "A",
    [{ label: "A", text: "A family of parallel curves, each a valid antiderivative" }, { label: "B", text: "An error in the calculation" }, { label: "C", text: "The area under the curve" }, { label: "D", text: "The derivative of the function" }],
    "Because d/dx(C) = 0, any constant added to a primitive still differentiates to the original expression. All such curves are valid antiderivatives.", ""),
];

const primMastery: PracticeQuestion[] = [
  fa("y11adv-intg-prim-m1", "Find the primitive.", "\\int 4x^3\\,dx", "x^4+C", ["x^4 + C"]),
  fa("y11adv-intg-prim-m2", "Find the primitive.", "\\int 12x^5\\,dx", "2x^6+C", ["2x^6 + C"]),
  mc("y11adv-intg-prim-m3", "Which is the correct primitive of 5x⁴?", "B",
    [{ label: "A", text: "$20x^3+C$" }, { label: "B", text: "$x^5+C$" }, { label: "C", text: "$5x^5+C$" }, { label: "D", text: "$x^3+C$" }],
    "Increase the power to 5 and divide 5 by 5: (5/5)x⁵ = x⁵. So the primitive is x⁵ + C.", ""),
  fa("y11adv-intg-prim-m4", "Find the primitive.", "\\int x\\,dx", "x^2/2+C", ["(1/2)x^2+C"]),
  mc("y11adv-intg-prim-m5", "Which expression checks that 3x⁴ + C is a primitive of 12x³?", "D",
    [{ label: "A", text: "$\\int 3x^4\\,dx$" }, { label: "B", text: "$3x^4+C=12x^3$" }, { label: "C", text: "$\\int 12x^3+C\\,dx$" }, { label: "D", text: "$\\frac{d}{dx}(3x^4+C)=12x^3$" }],
    "To check a primitive, differentiate it and confirm you recover the original integrand.", ""),
  fa("y11adv-intg-prim-m6", "Find the primitive.", "\\int (6x^2-2x+4)\\,dx", "2x^3-x^2+4x+C", ["2x^3-x^2+4x+C"]),
  mc("y11adv-intg-prim-m7", "What is the primitive of a constant k?", "A",
    [{ label: "A", text: "$kx+C$" }, { label: "B", text: "$k+C$" }, { label: "C", text: "$kx^2/2+C$" }, { label: "D", text: "$0+C$" }],
    "A constant k = kx⁰ has power 0; integrating gives kx^(0+1)/(0+1) = kx. So ∫k dx = kx + C.", ""),
  fa("y11adv-intg-prim-m8", "Find the primitive.", "\\int 4x^{-3}\\,dx", "-2x^{-2}+C", ["-2/x^2+C", "-2x^(-2)+C"]),
];

// ─── L2: Standard Antiderivatives ────────────────────────────────────────────

const stdWorked: WorkedExample[] = [
  {
    title: "Integrate a sum involving exponential and polynomial",
    questionLatex: "\\int (e^x + 2x)\\,dx",
    steps: [
      { explanation: "The antiderivative of eˣ is eˣ.", latex: "\\int e^x\\,dx = e^x" },
      { explanation: "The antiderivative of 2x is x².", latex: "\\int 2x\\,dx = x^2" },
      { explanation: "Combine with one constant of integration.", latex: "e^x+x^2+C" },
    ],
    finalAnswerLatex: "e^x+x^2+C",
  },
  {
    title: "Integrate a trigonometric expression",
    questionLatex: "\\int (3\\cos x - 2\\sin x)\\,dx",
    steps: [
      { explanation: "The antiderivative of cos x is sin x.", latex: "\\int 3\\cos x\\,dx = 3\\sin x" },
      { explanation: "The antiderivative of sin x is −cos x.", latex: "\\int -2\\sin x\\,dx = 2\\cos x" },
      { explanation: "Combine with +C.", latex: "3\\sin x+2\\cos x+C" },
    ],
    finalAnswerLatex: "3\\sin x+2\\cos x+C",
  },
  {
    title: "Integrate a reciprocal function",
    questionLatex: "\\int \\frac{4}{x}\\,dx",
    steps: [
      { explanation: "The antiderivative of 1/x is ln|x|.", latex: "\\int \\frac{1}{x}\\,dx=\\ln|x|" },
      { explanation: "Multiply by the constant 4.", latex: "4\\ln|x|+C" },
    ],
    finalAnswerLatex: "4\\ln|x|+C",
  },
];

const stdGuided: PracticeQuestion[] = [
  fa("y11adv-intg-std-g1", "Find the primitive.", "\\int e^x\\,dx", "e^x+C", ["e^x + C"]),
  mc("y11adv-intg-std-g2", "What is the antiderivative of cos x?", "A",
    [{ label: "A", text: "$\\sin x+C$" }, { label: "B", text: "$-\\sin x+C$" }, { label: "C", text: "$\\cos x+C$" }, { label: "D", text: "$-\\cos x+C$" }],
    "Since d/dx(sin x) = cos x, the antiderivative of cos x is sin x + C.", "\\int \\cos x\\,dx"),
  fa("y11adv-intg-std-g3", "Find the primitive.", "\\int (e^x + \\cos x)\\,dx", "e^x+sin x+C", ["e^x + sinx + C", "e^x+\\sin x+C"]),
  mc("y11adv-intg-std-g4", "Which is the antiderivative of sin x?", "B",
    [{ label: "A", text: "$\\cos x+C$" }, { label: "B", text: "$-\\cos x+C$" }, { label: "C", text: "$\\sin x+C$" }, { label: "D", text: "$-\\sin x+C$" }],
    "Since d/dx(−cos x) = sin x, the antiderivative of sin x is −cos x + C.", "\\int \\sin x\\,dx"),
];

const stdIndep: PracticeQuestion[] = [
  fa("y11adv-intg-std-i1", "Find the primitive.", "\\int 5e^x\\,dx", "5e^x+C", ["5e^x + C"]),
  fa("y11adv-intg-std-i2", "Find the primitive.", "\\int 3\\cos x\\,dx", "3sin x+C", ["3\\sin x+C", "3sinx+C"]),
  fa("y11adv-intg-std-i3", "Find the primitive.", "\\int \\frac{2}{x}\\,dx", "2ln|x|+C", ["2\\ln|x|+C", "2ln|x|+C"]),
  fa("y11adv-intg-std-i4", "Find the primitive.", "\\int (2\\sin x + e^x)\\,dx", "-2cos x+e^x+C", ["-2\\cos x+e^x+C"]),
  fa("y11adv-intg-std-i5", "Find the primitive.", "\\int (x^2 + 3e^x - \\sin x)\\,dx", "x^3/3+3e^x+cos x+C", ["(1/3)x^3+3e^x+\\cos x+C"]),
];

const stdMastery: PracticeQuestion[] = [
  fa("y11adv-intg-std-m1", "Find the primitive.", "\\int 4e^x\\,dx", "4e^x+C", ["4e^x + C"]),
  mc("y11adv-intg-std-m2", "What is ∫(1/x) dx?", "C",
    [{ label: "A", text: "$x^{-2}+C$" }, { label: "B", text: "$\\ln x+C$" }, { label: "C", text: "$\\ln|x|+C$" }, { label: "D", text: "$e^x+C$" }],
    "The antiderivative of 1/x is ln|x| + C. The absolute value is needed because ln is only defined for positive numbers, but 1/x is defined for all x ≠ 0.", "\\int \\frac{1}{x}\\,dx"),
  fa("y11adv-intg-std-m3", "Find the primitive.", "\\int 2\\cos x\\,dx", "2sin x+C", ["2\\sin x+C"]),
  fa("y11adv-intg-std-m4", "Find the primitive.", "\\int -3\\sin x\\,dx", "3cos x+C", ["3\\cos x+C"]),
  mc("y11adv-intg-std-m5", "Which is the primitive of eˣ + sin x?", "A",
    [{ label: "A", text: "$e^x-\\cos x+C$" }, { label: "B", text: "$e^x+\\cos x+C$" }, { label: "C", text: "$e^x-\\sin x+C$" }, { label: "D", text: "$e^x+\\sin x+C$" }],
    "∫eˣ dx = eˣ and ∫sin x dx = −cos x. So the primitive is eˣ − cos x + C.", "\\int(e^x+\\sin x)\\,dx"),
  fa("y11adv-intg-std-m6", "Find the primitive.", "\\int \\left(x^3+\\frac{1}{x}\\right)dx", "x^4/4+ln|x|+C", ["(1/4)x^4+ln|x|+C"]),
  mc("y11adv-intg-std-m7", "Why does ∫eˣ dx = eˣ + C (not eˣ⁺¹/(x+1))?", "B",
    [{ label: "A", text: "The power rule applies to all functions" }, { label: "B", text: "eˣ is its own derivative, so eˣ is also its own antiderivative" }, { label: "C", text: "The exponent in eˣ is a constant" }, { label: "D", text: "eˣ cannot be integrated" }],
    "Since d/dx(eˣ) = eˣ, eˣ is its own antiderivative. The reverse power rule requires a variable base, not a constant base.", ""),
  fa("y11adv-intg-std-m8", "Find the primitive.", "\\int (e^x-\\cos x+3)\\,dx", "e^x-sin x+3x+C", ["e^x-\\sin x+3x+C"]),
];

// ─── L3: Initial-Value Problems ───────────────────────────────────────────────

const ivWorked: WorkedExample[] = [
  {
    title: "Find the particular primitive given a point",
    questionLatex: "f'(x)=2x+3,\\quad f(1)=7",
    steps: [
      { explanation: "Integrate the derivative to get the family of primitives.", latex: "f(x)=x^2+3x+C" },
      { explanation: "Substitute the known point (1, 7) to find C.", latex: "7=1+3+C\\Rightarrow C=3" },
      { explanation: "Write the particular primitive.", latex: "f(x)=x^2+3x+3" },
    ],
    finalAnswerLatex: "f(x)=x^2+3x+3",
  },
  {
    title: "Reconstruct a function from its derivative",
    questionLatex: "y'=6x^2-4,\\quad y=10\\text{ when }x=2",
    steps: [
      { explanation: "Antidifferentiate to get the general solution.", latex: "y=2x^3-4x+C" },
      { explanation: "Substitute x = 2, y = 10.", latex: "10=2(8)-4(2)+C=16-8+C\\Rightarrow C=2" },
      { explanation: "Write the equation of the curve.", latex: "y=2x^3-4x+2" },
    ],
    finalAnswerLatex: "y=2x^3-4x+2",
  },
];

const ivGuided: PracticeQuestion[] = [
  fa("y11adv-intg-iv-g1", "Find C given f'(x) = 4x and f(0) = 5.", "", "5", ["C=5"]),
  fa("y11adv-intg-iv-g2", "Find f(x) given f'(x) = 3x² and f(1) = 4.", "f'(x)=3x^2,\\quad f(1)=4", "x^3+3", ["f(x)=x^3+3"]),
  mc("y11adv-intg-iv-g3", "What does finding C from an initial condition do?", "B",
    [{ label: "A", text: "Removes the need for +C in all future integrals" }, { label: "B", text: "Selects one particular curve from the family of primitives" }, { label: "C", text: "Differentiates the primitive again" }, { label: "D", text: "Gives the area under the curve" }],
    "Each value of C corresponds to a different vertical shift of the same curve. An initial condition pins down which one passes through the given point.", ""),
  fa("y11adv-intg-iv-g4", "Find f(x) given f'(x) = 2x − 1 and f(3) = 6.", "f'(x)=2x-1,\\quad f(3)=6", "x^2-x+0", ["x^2-x", "f(x)=x^2-x"]),
];

const ivIndep: PracticeQuestion[] = [
  fa("y11adv-intg-iv-i1", "Find f(x) given f'(x) = 6x + 2 and f(0) = −3.", "f'(x)=6x+2,\\quad f(0)=-3", "3x^2+2x-3", ["f(x)=3x^2+2x-3"]),
  fa("y11adv-intg-iv-i2", "Find y given dy/dx = 4x³ and y = 8 when x = 1.", "\\frac{dy}{dx}=4x^3,\\quad (1,8)", "x^4+7", ["y=x^4+7"]),
  fa("y11adv-intg-iv-i3", "Find f(x) given f'(x) = e^x and f(0) = 2.", "f'(x)=e^x,\\quad f(0)=2", "e^x+1", ["f(x)=e^x+1"]),
  mc("y11adv-intg-iv-i4", "The family y = x² + C contains which of the following curves?", "D",
    [{ label: "A", text: "Only the curve through the origin" }, { label: "B", text: "Only curves with a positive y-intercept" }, { label: "C", text: "Only the curve with y-intercept 3" }, { label: "D", text: "All curves with gradient function 2x" }],
    "All members of y = x² + C have derivative 2x. They are parallel curves, all shifted vertically by different amounts of C.", ""),
  fa("y11adv-intg-iv-i5", "Find y given y' = cos x and y = 1 when x = 0.", "y'=\\cos x,\\quad y(0)=1", "sin x+1", ["y=\\sin x+1", "\\sin x+1"]),
];

const ivMastery: PracticeQuestion[] = [
  fa("y11adv-intg-iv-m1", "Find C if f'(x) = 8x and f(0) = −4.", "f'(x)=8x,\\quad f(0)=-4", "-4", ["C=-4"]),
  fa("y11adv-intg-iv-m2", "Find f(x) given f'(x) = x² + 1 and f(3) = 12.", "f'(x)=x^2+1,\\quad f(3)=12", "x^3/3+x+0", ["x^3/3+x", "(1/3)x^3+x"]),
  mc("y11adv-intg-iv-m3", "A curve has gradient function f'(x) = 4x and passes through (2, 10). What is f(x)?", "B",
    [{ label: "A", text: "$2x^2$" }, { label: "B", text: "$2x^2+2$" }, { label: "C", text: "$2x^2-2$" }, { label: "D", text: "$4x+2$" }],
    "∫4x dx = 2x² + C. Substituting (2, 10): 10 = 2(4) + C → C = 2. So f(x) = 2x² + 2.", ""),
  fa("y11adv-intg-iv-m4", "Find y given y' = 2x − 3 and y = 4 when x = 2.", "y'=2x-3,\\quad(2,4)", "x^2-3x+6", ["y=x^2-3x+6"]),
  mc("y11adv-intg-iv-m5", "Which describes the graph of y = x³ + C for three different values of C?", "C",
    [{ label: "A", text: "Three curves with different shapes" }, { label: "B", text: "Three curves with different gradients" }, { label: "C", text: "Three identical curves shifted vertically" }, { label: "D", text: "Three curves with different x-intercepts only" }],
    "Changing C shifts the curve up or down without altering its shape or gradient at any x-value.", ""),
  fa("y11adv-intg-iv-m6", "Find f(x) given f'(x) = 3e^x and f(0) = 5.", "f'(x)=3e^x,\\quad f(0)=5", "3e^x+2", ["f(x)=3e^x+2"]),
  mc("y11adv-intg-iv-m7", "Which step correctly starts solving 'find f(x) given f'(x) = 6x², f(1) = 5'?", "A",
    [{ label: "A", text: "Integrate 6x² to get 2x³ + C, then substitute (1, 5)" }, { label: "B", text: "Differentiate 6x² to get 12x, then substitute" }, { label: "C", text: "Substitute (1, 5) into f'(x) = 6x²" }, { label: "D", text: "Set 6x² = 5 and solve for x" }],
    "First antidifferentiate to get the general form, then use the initial condition to find C.", ""),
  fa("y11adv-intg-iv-m8", "Find y given dy/dx = sin x and y = 3 when x = 0.", "\\frac{dy}{dx}=\\sin x,\\quad y(0)=3", "-cos x+4", ["y=-\\cos x+4", "-\\cos x+4"]),
];

// ─── L4: Definite Integrals ───────────────────────────────────────────────────

const defWorked: WorkedExample[] = [
  {
    title: "Evaluate a definite integral",
    questionLatex: "\\int_1^4 (2x+1)\\,dx",
    steps: [
      { explanation: "Find the primitive.", latex: "F(x)=x^2+x" },
      { explanation: "Evaluate F(4) − F(1).", latex: "F(4)=(16+4)=20,\\quad F(1)=(1+1)=2" },
      { explanation: "Subtract.", latex: "20-2=18" },
    ],
    finalAnswerLatex: "18",
  },
  {
    title: "Evaluate using bracket notation",
    questionLatex: "\\int_0^3 x^2\\,dx",
    steps: [
      { explanation: "Find the primitive and write in brackets.", latex: "\\left[\\frac{x^3}{3}\\right]_0^3" },
      { explanation: "Substitute the upper limit.", latex: "\\frac{27}{3}=9" },
      { explanation: "Subtract the lower limit value.", latex: "9-0=9" },
    ],
    finalAnswerLatex: "9",
  },
];

const defGuided: PracticeQuestion[] = [
  fa("y11adv-intg-def-g1", "Evaluate the definite integral.", "\\int_0^2 3x^2\\,dx", "8", []),
  fa("y11adv-intg-def-g2", "Evaluate the definite integral.", "\\int_1^3 2x\\,dx", "8", []),
  mc("y11adv-intg-def-g3", "In ∫₁⁴ f(x) dx, what do 1 and 4 represent?", "B",
    [{ label: "A", text: "The coefficient and power" }, { label: "B", text: "The lower and upper limits of integration" }, { label: "C", text: "The values of f at the endpoints" }, { label: "D", text: "The area height" }],
    "The numbers at the bottom and top of the integral sign are the limits of integration: 1 is the lower limit and 4 is the upper limit.", "\\int_1^4 f(x)\\,dx"),
  fa("y11adv-intg-def-g4", "Evaluate the definite integral.", "\\int_2^5 (x+1)\\,dx", "16.5", ["33/2", "16½"]),
];

const defIndep: PracticeQuestion[] = [
  fa("y11adv-intg-def-i1", "Evaluate the definite integral.", "\\int_0^3 (x^2+2)\\,dx", "15", []),
  fa("y11adv-intg-def-i2", "Evaluate the definite integral.", "\\int_1^4 (3x^2-2x)\\,dx", "57", []),
  fa("y11adv-intg-def-i3", "Evaluate the definite integral.", "\\int_0^{\\pi/2} \\cos x\\,dx", "1", []),
  mc("y11adv-intg-def-i4", "∫₂⁵ f(x) dx is negative. What does this mean?", "C",
    [{ label: "A", text: "An error has occurred; definite integrals are always positive" }, { label: "B", text: "The function has no antiderivative" }, { label: "C", text: "The curve lies below the x-axis between x = 2 and x = 5" }, { label: "D", text: "The limits must be reversed" }],
    "A negative definite integral means the signed area between the curve and x-axis is below the axis on that interval. This is not an error.", ""),
  fa("y11adv-intg-def-i5", "Evaluate the definite integral.", "\\int_0^1 e^x\\,dx", "e-1", ["e − 1"]),
];

const defMastery: PracticeQuestion[] = [
  fa("y11adv-intg-def-m1", "Evaluate the definite integral.", "\\int_1^3 4x\\,dx", "16", []),
  fa("y11adv-intg-def-m2", "Evaluate the definite integral.", "\\int_0^2 (x^2+x)\\,dx", "14/3", ["4⅔", "4.667"]),
  mc("y11adv-intg-def-m3", "How is ∫₁³ f(x) dx calculated?", "B",
    [{ label: "A", text: "$F(3)\\times F(1)$" }, { label: "B", text: "$F(3)-F(1)$" }, { label: "C", text: "$F(1)-F(3)$" }, { label: "D", text: "$F(1)+F(3)$" }],
    "A definite integral equals F(upper) − F(lower) where F' = f.", ""),
  fa("y11adv-intg-def-m4", "Evaluate the definite integral.", "\\int_0^{\\pi} \\sin x\\,dx", "2", []),
  mc("y11adv-intg-def-m5", "Which statement about ∫ₐᵃ f(x) dx is always true?", "D",
    [{ label: "A", text: "It equals f(a)" }, { label: "B", text: "It equals 2f(a)" }, { label: "C", text: "It is undefined" }, { label: "D", text: "It equals 0" }],
    "When both limits are equal, F(a) − F(a) = 0, regardless of the function.", "\\int_a^a f(x)\\,dx"),
  fa("y11adv-intg-def-m6", "Evaluate the definite integral.", "\\int_{-1}^{2} (3x^2-1)\\,dx", "6", []),
  mc("y11adv-intg-def-m7", "What happens to ∫ₐᵇ f(x) dx when the limits are reversed?", "C",
    [{ label: "A", text: "It doubles" }, { label: "B", text: "It stays the same" }, { label: "C", text: "It changes sign" }, { label: "D", text: "It becomes undefined" }],
    "∫ₐᵇ f(x) dx = −∫ᵦₐ f(x) dx. Reversing limits negates the result.", ""),
  fa("y11adv-intg-def-m8", "Evaluate the definite integral.", "\\int_1^e \\frac{1}{x}\\,dx", "1", ["ln e − ln 1 = 1"]),
];

// ─── L5: Fundamental Theorem of Calculus ──────────────────────────────────────

const ftcWorked: WorkedExample[] = [
  {
    title: "Use the FTC to evaluate a definite integral",
    questionLatex: "\\int_1^4 \\sqrt{x}\\,dx",
    steps: [
      { explanation: "Write √x as x^(1/2) and find the primitive.", latex: "\\int x^{1/2}\\,dx=\\frac{x^{3/2}}{3/2}=\\frac{2}{3}x^{3/2}" },
      { explanation: "Evaluate at the upper limit.", latex: "\\frac{2}{3}(4)^{3/2}=\\frac{2}{3}\\cdot8=\\frac{16}{3}" },
      { explanation: "Evaluate at the lower limit.", latex: "\\frac{2}{3}(1)^{3/2}=\\frac{2}{3}" },
      { explanation: "Subtract.", latex: "\\frac{16}{3}-\\frac{2}{3}=\\frac{14}{3}" },
    ],
    finalAnswerLatex: "\\dfrac{14}{3}",
  },
  {
    title: "Verify the FTC connection",
    questionLatex: "\\text{If }F(x)=\\int_0^x t^2\\,dt,\\text{ find }F'(x).",
    steps: [
      { explanation: "The FTC states that F'(x) = f(x) where f is the integrand.", latex: "F'(x)=x^2" },
    ],
    finalAnswerLatex: "F'(x)=x^2",
  },
];

const ftcGuided: PracticeQuestion[] = [
  fa("y11adv-intg-ftc-g1", "Evaluate using the FTC.", "\\int_0^4 \\sqrt{x}\\,dx", "16/3", ["5.333", "5⅓"]),
  mc("y11adv-intg-ftc-g2", "The FTC says d/dx ∫₀ˣ f(t) dt = ?", "C",
    [{ label: "A", text: "$\\int_0^x f'(t)\\,dt$" }, { label: "B", text: "$f(0)$" }, { label: "C", text: "$f(x)$" }, { label: "D", text: "$F(x)-F(0)$" }],
    "The FTC: differentiating an accumulation function returns the original integrand evaluated at the upper variable limit x.", "\\frac{d}{dx}\\int_0^x f(t)\\,dt"),
  fa("y11adv-intg-ftc-g3", "Use the FTC to evaluate.", "\\int_0^2 e^x\\,dx", "e^2-1", ["e² − 1"]),
  mc("y11adv-intg-ftc-g4", "What is the key insight of the FTC?", "A",
    [{ label: "A", text: "Differentiation and integration are inverse operations" }, { label: "B", text: "Every definite integral equals zero" }, { label: "C", text: "The constant C disappears in definite integrals" }, { label: "D", text: "Area is always positive" }],
    "The FTC connects the two main operations of calculus: integration undoes differentiation and vice versa.", ""),
];

const ftcIndep: PracticeQuestion[] = [
  fa("y11adv-intg-ftc-i1", "Evaluate using the FTC.", "\\int_1^9 \\sqrt{x}\\,dx", "52/3", ["17.333"]),
  fa("y11adv-intg-ftc-i2", "Evaluate using the FTC.", "\\int_0^{\\pi/2} \\sin x\\,dx", "1", []),
  fa("y11adv-intg-ftc-i3", "Evaluate using the FTC.", "\\int_1^e \\frac{1}{x}\\,dx", "1", []),
  mc("y11adv-intg-ftc-i4", "If F(x) = ∫₀ˣ (t² + 1) dt, what is F'(x)?", "B",
    [{ label: "A", text: "$2t$" }, { label: "B", text: "$x^2+1$" }, { label: "C", text: "$\\frac{x^3}{3}+x$" }, { label: "D", text: "$0$" }],
    "By the FTC, F'(x) = f(x) where f is the integrand, so F'(x) = x² + 1.", "F(x)=\\int_0^x(t^2+1)\\,dt"),
  fa("y11adv-intg-ftc-i5", "Evaluate using the FTC.", "\\int_{-2}^{2} (x^3+x)\\,dx", "0", []),
];

const ftcMastery: PracticeQuestion[] = [
  fa("y11adv-intg-ftc-m1", "Evaluate.", "\\int_0^1 (e^x+x)\\,dx", "e-1/2", ["e − 0.5", "e-½"]),
  mc("y11adv-intg-ftc-m2", "Which correctly states the FTC for ∫ₐᵇ f(x) dx?", "A",
    [{ label: "A", text: "$F(b)-F(a)$ where $F'(x)=f(x)$" }, { label: "B", text: "$f(b)-f(a)$" }, { label: "C", text: "$F(a)-F(b)$" }, { label: "D", text: "$f'(b)-f'(a)$" }],
    "The FTC: ∫ₐᵇ f(x) dx = F(b) − F(a) where F is any primitive of f.", ""),
  fa("y11adv-intg-ftc-m3", "Evaluate.", "\\int_0^{\\pi} \\cos x\\,dx", "0", []),
  fa("y11adv-intg-ftc-m4", "Evaluate.", "\\int_4^9 \\frac{1}{\\sqrt{x}}\\,dx", "2", []),
  mc("y11adv-intg-ftc-m5", "Why does the +C cancel in a definite integral?", "C",
    [{ label: "A", text: "The limits make C = 0" }, { label: "B", text: "C is always negative" }, { label: "C", text: "(F(b)+C) − (F(a)+C) = F(b) − F(a)" }, { label: "D", text: "The FTC assumes C = 1" }],
    "When evaluating F(b) − F(a), the constant C appears in both terms and subtracts away: (F(b)+C) − (F(a)+C) = F(b) − F(a).", ""),
  fa("y11adv-intg-ftc-m6", "Evaluate.", "\\int_0^2 (x^2-2x+1)\\,dx", "2/3", ["0.667"]),
  mc("y11adv-intg-ftc-m7", "If G(x) = ∫₀ˣ cos t dt, what is G'(x)?", "B",
    [{ label: "A", text: "$\\sin x$" }, { label: "B", text: "$\\cos x$" }, { label: "C", text: "$-\\sin x$" }, { label: "D", text: "$0$" }],
    "By the FTC, the derivative of ∫₀ˣ f(t) dt is f(x). Here f(t) = cos t so G'(x) = cos x.", ""),
  fa("y11adv-intg-ftc-m8", "Evaluate.", "\\int_1^2 \\left(x+\\frac{1}{x}\\right)dx", "3/2+ln2", ["1.5+ln2", "3/2+\\ln 2"]),
];

// ─── L6: Areas Under and Between Curves ───────────────────────────────────────

const areaWorked: WorkedExample[] = [
  {
    title: "Find the area under a curve",
    questionLatex: "\\text{Area between }y=x^2\\text{ and the }x\\text{-axis for }0\\le x\\le 3",
    steps: [
      { explanation: "Set up the definite integral (curve is above x-axis on [0,3]).", latex: "A=\\int_0^3 x^2\\,dx" },
      { explanation: "Evaluate.", latex: "\\left[\\frac{x^3}{3}\\right]_0^3=9-0=9" },
    ],
    finalAnswerLatex: "9\\text{ square units}",
  },
  {
    title: "Area when the curve is below the x-axis",
    questionLatex: "\\text{Area between }y=x^2-4\\text{ and the }x\\text{-axis for }0\\le x\\le 2",
    steps: [
      { explanation: "Check: on [0,2], y = x²−4 ≤ 0 (below the axis), so the integral gives a negative value.", latex: "\\int_0^2(x^2-4)\\,dx=\\left[\\frac{x^3}{3}-4x\\right]_0^2=\\frac{8}{3}-8=-\\frac{16}{3}" },
      { explanation: "Area = absolute value of the integral.", latex: "A=\\left|-\\frac{16}{3}\\right|=\\frac{16}{3}" },
    ],
    finalAnswerLatex: "\\dfrac{16}{3}\\text{ square units}",
  },
  {
    title: "Area between two curves",
    questionLatex: "\\text{Area between }y=x^2\\text{ and }y=x\\text{ for }0\\le x\\le 1",
    steps: [
      { explanation: "On [0,1]: x ≥ x², so the upper curve is y = x.", latex: "A=\\int_0^1(x-x^2)\\,dx" },
      { explanation: "Evaluate.", latex: "\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}" },
    ],
    finalAnswerLatex: "\\dfrac{1}{6}\\text{ square units}",
  },
];

const areaGuided: PracticeQuestion[] = [
  fa("y11adv-intg-area-g1", "Find the area under the curve above the x-axis.", "y=3x^2,\\;0\\le x\\le 2", "8", ["8 sq units"]),
  mc("y11adv-intg-area-g2", "If ∫ₐᵇ f(x) dx = −5, what is the area?", "B",
    [{ label: "A", text: "$-5$ square units" }, { label: "B", text: "$5$ square units" }, { label: "C", text: "$10$ square units" }, { label: "D", text: "Cannot be determined" }],
    "Area is always positive. When the integral is negative, the curve is below the x-axis on that interval. The area is the absolute value: |−5| = 5.", ""),
  fa("y11adv-intg-area-g3", "Find the area between the curves.", "y=x^2\\text{ and }y=x,\\;0\\le x\\le 1", "1/6", ["0.167", "⅙"]),
  mc("y11adv-intg-area-g4", "Which setup gives the area between y = x² and y = x for 0 ≤ x ≤ 1?", "C",
    [{ label: "A", text: "$\\int_0^1 x^2\\,dx$" }, { label: "B", text: "$\\int_0^1 x\\,dx$" }, { label: "C", text: "$\\int_0^1 (x-x^2)\\,dx$" }, { label: "D", text: "$\\int_0^1 (x^2-x)\\,dx$" }],
    "Area between curves = ∫(upper − lower) dx. On [0,1] the line y = x lies above y = x².", ""),
];

const areaIndep: PracticeQuestion[] = [
  fa("y11adv-intg-area-i1", "Find the area under the curve above the x-axis.", "y=x^3,\\;0\\le x\\le 2", "4", ["4 sq units"]),
  fa("y11adv-intg-area-i2", "Find the area enclosed between the curve and the x-axis.", "y=x(x-3),\\;0\\le x\\le 3", "9/2", ["4.5", "4½"]),
  fa("y11adv-intg-area-i3", "Find the area between the two curves.", "y=x^2\\text{ and }y=4,\\;-2\\le x\\le 2", "32/3", ["10.667"]),
  mc("y11adv-intg-area-i4", "The graph crosses the x-axis at x = 2. What must you do to find the total area for 0 ≤ x ≤ 4?", "B",
    [{ label: "A", text: "Evaluate one integral from 0 to 4" }, { label: "B", text: "Split at x = 2 and add the absolute values of each part" }, { label: "C", text: "Subtract the integral from 0 to 4 from zero" }, { label: "D", text: "The area equals zero by symmetry" }],
    "When a curve crosses the x-axis, negative and positive parts cancel in a single integral. Split at the crossing point and add the absolute values to get the true area.", ""),
  fa("y11adv-intg-area-i5", "Find the area between y = 4 − x² and the x-axis.", "y=4-x^2,\\;-2\\le x\\le 2", "32/3", ["10.667"]),
];

const areaMastery: PracticeQuestion[] = [
  fa("y11adv-intg-area-m1", "Find the area under the curve above the x-axis.", "y=6x^2,\\;0\\le x\\le 2", "16", []),
  fa("y11adv-intg-area-m2", "Find the area between the curve and the x-axis.", "y=x^2-9,\\;-3\\le x\\le 3", "36", []),
  mc("y11adv-intg-area-m3", "Which equals the area enclosed by y = f(x) and the x-axis from a to b when f(x) ≤ 0?", "B",
    [{ label: "A", text: "$\\int_a^b f(x)\\,dx$" }, { label: "B", text: "$-\\int_a^b f(x)\\,dx$" }, { label: "C", text: "$\\int_a^b f(x)\\,dx + C$" }, { label: "D", text: "$\\left(\\int_a^b f(x)\\,dx\\right)^2$" }],
    "When f(x) ≤ 0, the integral is negative. The area is positive, so we negate it: Area = −∫ₐᵇ f(x) dx.", ""),
  fa("y11adv-intg-area-m4", "Find the area between the parabola and the line.", "y=x^2\\text{ and }y=2x,\\;0\\le x\\le 2", "4/3", ["1.333"]),
  mc("y11adv-intg-area-m5", "The area between y = sin x and the x-axis for 0 ≤ x ≤ π is:", "C",
    [{ label: "A", text: "0" }, { label: "B", text: "$\\pi$" }, { label: "C", text: "2" }, { label: "D", text: "1" }],
    "∫₀^π sin x dx = [−cos x]₀^π = (−cos π) − (−cos 0) = 1 + 1 = 2. Since sin x ≥ 0 on [0, π], this is also the area.", ""),
  fa("y11adv-intg-area-m6", "Find the area enclosed between the curves.", "y=x^2\\text{ and }y=x^3,\\;0\\le x\\le 1", "1/12", ["0.0833"]),
  mc("y11adv-intg-area-m7", "The graph of f(x) is above the x-axis for 0 ≤ x ≤ 2 and below for 2 ≤ x ≤ 5. Which gives the total area?", "D",
    [{ label: "A", text: "$\\int_0^5 f(x)\\,dx$" }, { label: "B", text: "$\\int_0^2 f(x)\\,dx - \\int_2^5 f(x)\\,dx$" }, { label: "C", text: "$\\int_2^5 f(x)\\,dx$" }, { label: "D", text: "$\\int_0^2 f(x)\\,dx + \\left|\\int_2^5 f(x)\\,dx\\right|$" }],
    "Add the area above the axis (positive integral) to the absolute value of the area below the axis (negative integral becomes positive).", ""),
  fa("y11adv-intg-area-m8", "Find the area between y = cos x and the x-axis.", "y=\\cos x,\\;0\\le x\\le \\pi/2", "1", []),
];

// ─── L7: Reverse Chain Rule ───────────────────────────────────────────────────

const rcrWorked: WorkedExample[] = [
  {
    title: "Integrate a linear function raised to a power",
    questionLatex: "\\int (2x+3)^4\\,dx",
    steps: [
      { explanation: "Identify the inner function u = 2x + 3 with du/dx = 2.", latex: "u=2x+3" },
      { explanation: "Apply the reverse chain rule: raise the power by 1, divide by the new power AND the inner derivative.", latex: "\\int(2x+3)^4\\,dx=\\frac{(2x+3)^5}{5\\times2}=\\frac{(2x+3)^5}{10}" },
      { explanation: "Add the constant.", latex: "\\frac{(2x+3)^5}{10}+C" },
      { explanation: "Check by differentiating: chain rule gives 5(2x+3)⁴×2/10 = (2x+3)⁴. ✓", latex: "" },
    ],
    finalAnswerLatex: "\\dfrac{(2x+3)^5}{10}+C",
  },
  {
    title: "Integrate a shifted exponential",
    questionLatex: "\\int e^{3x+1}\\,dx",
    steps: [
      { explanation: "The inner linear function has coefficient 3.", latex: "u=3x+1,\\quad \\frac{du}{dx}=3" },
      { explanation: "∫e^(3x+1) dx = e^(3x+1) divided by the inner coefficient.", latex: "\\frac{e^{3x+1}}{3}+C" },
    ],
    finalAnswerLatex: "\\dfrac{e^{3x+1}}{3}+C",
  },
  {
    title: "Integrate cos(ax + b)",
    questionLatex: "\\int \\cos(2x-1)\\,dx",
    steps: [
      { explanation: "The inner coefficient is 2.", latex: "u=2x-1,\\quad \\frac{du}{dx}=2" },
      { explanation: "∫cos(2x−1) dx = sin(2x−1) divided by 2.", latex: "\\frac{\\sin(2x-1)}{2}+C" },
    ],
    finalAnswerLatex: "\\dfrac{\\sin(2x-1)}{2}+C",
  },
];

const rcrGuided: PracticeQuestion[] = [
  fa("y11adv-intg-rcr-g1", "Integrate using the reverse chain rule.", "\\int (x+2)^5\\,dx", "(x+2)^6/6+C", ["\\frac{(x+2)^6}{6}+C"]),
  fa("y11adv-intg-rcr-g2", "Integrate using the reverse chain rule.", "\\int e^{2x}\\,dx", "e^{2x}/2+C", ["\\frac{e^{2x}}{2}+C"]),
  mc("y11adv-intg-rcr-g3", "Which is ∫(3x+1)³ dx?", "B",
    [{ label: "A", text: "$\\frac{(3x+1)^4}{4}+C$" }, { label: "B", text: "$\\frac{(3x+1)^4}{12}+C$" }, { label: "C", text: "$3(3x+1)^4+C$" }, { label: "D", text: "$\\frac{(3x+1)^2}{2}+C$" }],
    "Increase the power to 4, divide by 4, then divide again by the inner coefficient 3: (3x+1)⁴/(4×3) = (3x+1)⁴/12.", "\\int(3x+1)^3\\,dx"),
  fa("y11adv-intg-rcr-g4", "Integrate using the reverse chain rule.", "\\int \\sin(4x)\\,dx", "-cos(4x)/4+C", ["-\\frac{\\cos(4x)}{4}+C"]),
];

const rcrIndep: PracticeQuestion[] = [
  fa("y11adv-intg-rcr-i1", "Integrate.", "\\int (2x-1)^6\\,dx", "(2x-1)^7/14+C", ["\\frac{(2x-1)^7}{14}+C"]),
  fa("y11adv-intg-rcr-i2", "Integrate.", "\\int e^{-x}\\,dx", "-e^{-x}+C", []),
  fa("y11adv-intg-rcr-i3", "Integrate.", "\\int \\cos(3x+2)\\,dx", "sin(3x+2)/3+C", ["\\frac{\\sin(3x+2)}{3}+C"]),
  fa("y11adv-intg-rcr-i4", "Integrate.", "\\int (5x+1)^2\\,dx", "(5x+1)^3/15+C", ["\\frac{(5x+1)^3}{15}+C"]),
  mc("y11adv-intg-rcr-i5", "The reverse chain rule requires the inner function to be:", "A",
    [{ label: "A", text: "Linear (of the form ax + b)" }, { label: "B", text: "Any polynomial" }, { label: "C", text: "A quadratic only" }, { label: "D", text: "A trig function" }],
    "At Cambridge Year 11 level, the reverse chain rule is applied only when the inner function is linear (ax + b). More general substitution is an Extension topic.", ""),
];

const rcrMastery: PracticeQuestion[] = [
  fa("y11adv-intg-rcr-m1", "Integrate.", "\\int (x+1)^4\\,dx", "(x+1)^5/5+C", ["\\frac{(x+1)^5}{5}+C"]),
  fa("y11adv-intg-rcr-m2", "Integrate.", "\\int e^{5x}\\,dx", "e^{5x}/5+C", ["\\frac{e^{5x}}{5}+C"]),
  mc("y11adv-intg-rcr-m3", "What is ∫sin(2x+1) dx?", "A",
    [{ label: "A", text: "$-\\frac{\\cos(2x+1)}{2}+C$" }, { label: "B", text: "$\\frac{\\cos(2x+1)}{2}+C$" }, { label: "C", text: "$-\\cos(2x+1)+C$" }, { label: "D", text: "$2\\cos(2x+1)+C$" }],
    "∫sin(ax+b) dx = −cos(ax+b)/a + C. Here a = 2, so the answer is −cos(2x+1)/2 + C.", "\\int\\sin(2x+1)\\,dx"),
  fa("y11adv-intg-rcr-m4", "Integrate.", "\\int (4x-3)^3\\,dx", "(4x-3)^4/16+C", ["\\frac{(4x-3)^4}{16}+C"]),
  mc("y11adv-intg-rcr-m5", "Which differentiation rule is reversed when integrating f(ax+b)?", "C",
    [{ label: "A", text: "Product rule" }, { label: "B", text: "Quotient rule" }, { label: "C", text: "Chain rule" }, { label: "D", text: "Power rule" }],
    "The reverse chain rule undoes the chain rule: we divide by the inner derivative a to compensate for the factor that appears when differentiating.", ""),
  fa("y11adv-intg-rcr-m6", "Integrate.", "\\int \\cos(5-x)\\,dx", "-sin(5-x)+C", ["-\\sin(5-x)+C"]),
  fa("y11adv-intg-rcr-m7", "Integrate.", "\\int e^{3-2x}\\,dx", "-e^{3-2x}/2+C", ["-\\frac{e^{3-2x}}{2}+C"]),
  mc("y11adv-intg-rcr-m8", "Which integral cannot be found using the reverse chain rule at Year 11 level?", "D",
    [{ label: "A", text: "$\\int(3x+2)^5\\,dx$" }, { label: "B", text: "$\\int e^{4x}\\,dx$" }, { label: "C", text: "$\\int\\cos(2x-1)\\,dx$" }, { label: "D", text: "$\\int xe^{x^2}\\,dx$" }],
    "The integral ∫xe^(x²) dx requires a non-linear substitution u = x² (not a linear inner function). This is beyond Year 11 scope.", ""),
];

// ─── L8: Trapezoidal Rule ─────────────────────────────────────────────────────

const trapWorked: WorkedExample[] = [
  {
    title: "Apply the trapezoidal rule with 3 strips",
    questionLatex: "\\text{Approximate }\\int_0^3 x^2\\,dx\\text{ using 3 strips.}",
    steps: [
      { explanation: "Width h = (3−0)/3 = 1. Function values at x = 0, 1, 2, 3.", latex: "f(0)=0,\\;f(1)=1,\\;f(2)=4,\\;f(3)=9" },
      { explanation: "Apply the rule: T = h/2 × (first + 2×middle + last).", latex: "T=\\frac{1}{2}(0+2\\cdot1+2\\cdot4+9)=\\frac{1}{2}(19)=9.5" },
      { explanation: "Compare with exact value ∫₀³ x² dx = 9.", latex: "\\text{Overestimate (curve is concave up)}" },
    ],
    finalAnswerLatex: "9.5",
  },
  {
    title: "Apply the trapezoidal rule with 4 strips from a table",
    questionLatex: "\\begin{array}{c|ccccc}x&1&2&3&4&5\\\\f(x)&3&5&4&6&2\\end{array}",
    steps: [
      { explanation: "h = 1, 4 strips, first = 3, last = 2, middle values = 5, 4, 6.", latex: "T=\\frac{1}{2}(3+2\\times5+2\\times4+2\\times6+2)=\\frac{1}{2}(2+12+8+12+3)" },
      { explanation: "Wait: h = 1, so T = h/2(f₀ + 2f₁ + 2f₂ + 2f₃ + f₄) = 1/2(3+10+8+12+2).", latex: "T=\\frac{1}{2}(35)=17.5" },
    ],
    finalAnswerLatex: "17.5",
  },
];

const trapGuided: PracticeQuestion[] = [
  fa("y11adv-intg-trap-g1", "Use the trapezoidal rule with 2 strips to approximate the integral.", "\\int_0^2 x^2\\,dx,\\;h=1", "3", ["T≈3"]),
  mc("y11adv-intg-trap-g2", "The trapezoidal rule gives an overestimate when the curve is:", "A",
    [{ label: "A", text: "Concave up (f'' > 0)" }, { label: "B", text: "Concave down (f'' < 0)" }, { label: "C", text: "Linear" }, { label: "D", text: "Decreasing" }],
    "When a curve is concave up, each trapezoid lies above the curve. This means the sum of trapezoid areas exceeds the true area — an overestimate.", ""),
  fa("y11adv-intg-trap-g3", "Use the trapezoidal rule to approximate.", "\\begin{array}{c|ccc}x&0&1&2\\\\f(x)&2&5&6\\end{array}", "9", ["T≈9"]),
  mc("y11adv-intg-trap-g4", "To improve a trapezoidal approximation, you should:", "B",
    [{ label: "A", text: "Use fewer strips" }, { label: "B", text: "Use more strips (smaller h)" }, { label: "C", text: "Square the function values" }, { label: "D", text: "Use only the endpoints" }],
    "More strips means thinner trapezoids that better approximate the curve, reducing the error.", ""),
];

const trapIndep: PracticeQuestion[] = [
  fa("y11adv-intg-trap-i1", "Use the trapezoidal rule with 4 strips to approximate.", "\\int_0^4 \\sqrt{x}\\,dx", "5.146", ["5.15", "5.1"]),
  fa("y11adv-intg-trap-i2", "Approximate the integral using the table.", "\\begin{array}{c|cccc}x&1&2&3&4\\\\f(x)&4&3&5&2\\end{array}", "10.5", ["T≈10.5"]),
  mc("y11adv-intg-trap-i3", "For a concave-down curve, the trapezoidal rule gives:", "B",
    [{ label: "A", text: "An exact answer" }, { label: "B", text: "An underestimate" }, { label: "C", text: "An overestimate" }, { label: "D", text: "Zero" }],
    "When concave down, each trapezoid lies below the curve. The sum of trapezoid areas is less than the true area — an underestimate.", ""),
  fa("y11adv-intg-trap-i4", "Use the trapezoidal rule with 3 strips to approximate.", "\\int_0^3 e^x\\,dx,\\;h=1", "17.63", ["17.6", "≈17.6"]),
  mc("y11adv-intg-trap-i5", "The trapezoidal rule formula for n strips of width h is:", "C",
    [{ label: "A", text: "$h(f_0+f_1+\\cdots+f_n)$" }, { label: "B", text: "$\\frac{h}{2}(f_0+f_n)$" }, { label: "C", text: "$\\frac{h}{2}(f_0+2f_1+\\cdots+2f_{n-1}+f_n)$" }, { label: "D", text: "$h(f_0+2f_1+f_n)$" }],
    "The full formula doubles all interior (middle) function values and uses the endpoint values once each, multiplied by h/2.", ""),
];

const trapMastery: PracticeQuestion[] = [
  fa("y11adv-intg-trap-m1", "Use the trapezoidal rule with 2 strips to approximate.", "\\int_0^2 (x^2+1)\\,dx,\\;h=1", "5", []),
  mc("y11adv-intg-trap-m2", "Which statement correctly describes error in the trapezoidal rule?", "B",
    [{ label: "A", text: "There is never any error if h is exact" }, { label: "B", text: "Error decreases as the number of strips increases" }, { label: "C", text: "Error is always positive" }, { label: "D", text: "Error is larger for linear functions" }],
    "Finer strips produce trapezoids that conform more closely to the curve, reducing approximation error. For linear functions, the trapezoidal rule is exact.", ""),
  fa("y11adv-intg-trap-m3", "Approximate the integral using the table.", "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\f(x)&1&4&3&5&2\\end{array}", "15.5", []),
  mc("y11adv-intg-trap-m4", "The trapezoidal rule approximates the area by replacing the curve with:", "C",
    [{ label: "A", text: "A horizontal line at each midpoint" }, { label: "B", text: "Rectangles" }, { label: "C", text: "Straight-line segments (chords)" }, { label: "D", text: "Parabolic arcs" }],
    "Each strip is approximated by a trapezoid whose slanted top edge is the chord connecting adjacent curve points.", ""),
  fa("y11adv-intg-trap-m5", "The exact value of ∫₀² x² dx = 8/3 ≈ 2.667. Using 2 strips gives T = 3. What type of error does this represent?", "", "overestimate", ["overestimate (curve is concave up)", "over-estimate"]),
  fa("y11adv-intg-trap-m6", "Use the trapezoidal rule with 4 strips to approximate.", "\\int_0^4 \\sin x\\,dx,\\;h=1", "2.840", ["2.84", "≈2.84"]),
  mc("y11adv-intg-trap-m7", "What is the strip width h for approximating ∫₁⁵ f(x) dx using 4 strips?", "B",
    [{ label: "A", text: "2" }, { label: "B", text: "1" }, { label: "C", text: "4" }, { label: "D", text: "0.5" }],
    "h = (upper − lower) / n = (5 − 1) / 4 = 1.", ""),
  fa("y11adv-intg-trap-m8", "Use the trapezoidal rule with 3 strips to approximate.", "\\int_0^3 \\cos x\\,dx,\\;h=1", "0.355", ["0.36", "≈0.355"]),
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function year11AdvancedIntegrationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "integration") {
    return null;
  }

  const base = {
    syllabusArea: "Calculus",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "primitives-and-antidifferentiation") {
    return {
      ...base,
      description:
        "Understand antidifferentiation as the reverse of differentiation and apply the reverse power rule to find primitives.",
      learningIntention:
        "Learn to find antiderivatives using the reverse power rule and understand what the constant of integration represents.",
      successCriteria: [
        "Explain that a primitive F(x) satisfies F'(x) = f(x).",
        "Use integral notation ∫f(x) dx correctly.",
        "Apply the reverse power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, n ≠ −1.",
        "Include the constant of integration +C in every indefinite integral.",
        "Check an antiderivative by differentiating it.",
        "Identify when the reverse power rule does not apply (n = −1 and non-polynomial functions).",
      ],
      teaching: {
        paragraphs: [
          "Antidifferentiation is the reverse of differentiation. If differentiating F(x) gives f(x), then antidifferentiating f(x) gives back F(x). This reverse process is called finding a primitive or an antiderivative.",
          "The reverse power rule is the mirror image of the power rule for derivatives. To differentiate xⁿ you multiply by n and reduce the power by one; to antidifferentiate xⁿ you increase the power by one and divide by the new power.",
          "Every antiderivative has a constant of integration +C added to it. This reflects the fact that differentiating any constant gives zero — so the original function could have had any constant term, and integration cannot recover it without extra information.",
          "The notation ∫f(x) dx is read as 'the indefinite integral of f(x) with respect to x'. The result is a family of functions, all differing only in the value of C.",
          "To check an antiderivative, differentiate your answer. If you recover the original function, the antiderivative is correct. This also confirms the correct coefficient and power.",
        ],
        latexBlocks: [
          "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C, \\quad n\\ne -1",
          "\\frac{d}{dx}\\left(\\frac{x^{n+1}}{n+1}+C\\right) = x^n \\checkmark",
          "\\int ax^n\\,dx = \\frac{a}{n+1}\\,x^{n+1}+C",
        ],
      },
      workedExamples: primWorked,
      guidedPractice: primGuided,
      independentPractice: primIndep,
      commonMistakes: [
        { mistake: "Forgetting to add +C to an indefinite integral.", fix: "Every indefinite integral must include +C. Omitting it is an error in HSC exams." },
        { mistake: "Multiplying by the power instead of dividing.", fix: "The reverse power rule divides by the new power, not multiplies. Differentiation multiplies; integration divides." },
        { mistake: "Applying the reverse power rule to xˉ¹.", fix: "The reverse power rule fails when n = −1 because dividing by (n+1) = 0 is undefined. The antiderivative of 1/x is ln|x|, not x⁰/0." },
      ],
      masteryQuiz: primMastery,
    };
  }

  if (lesson.slug === "standard-antiderivatives") {
    return {
      ...base,
      description:
        "Build a table of standard antiderivatives including exponential, trigonometric and reciprocal forms.",
      learningIntention:
        "Learn and use the standard antiderivatives for eˣ, sin x, cos x, and 1/x, and integrate sums of these forms.",
      successCriteria: [
        "State and use ∫eˣ dx = eˣ + C.",
        "State and use ∫sin x dx = −cos x + C.",
        "State and use ∫cos x dx = sin x + C.",
        "State and use ∫(1/x) dx = ln|x| + C.",
        "Integrate sums and differences involving these standard forms.",
        "Explain why the power rule does not apply to eˣ or trig functions.",
      ],
      teaching: {
        paragraphs: [
          "Standard antiderivatives extend the table of integration results beyond polynomials. Each result is derived by asking: which function differentiates to give this integrand?",
          "Since d/dx(eˣ) = eˣ, we have ∫eˣ dx = eˣ + C. The exponential function eˣ is its own derivative and its own antiderivative — a unique property.",
          "For trigonometric functions: d/dx(sin x) = cos x, so ∫cos x dx = sin x + C. Similarly d/dx(−cos x) = sin x, so ∫sin x dx = −cos x + C. Notice the sign pattern carefully.",
          "For the reciprocal: d/dx(ln|x|) = 1/x, so ∫(1/x) dx = ln|x| + C. The absolute value is needed because ln is only defined for positive arguments, yet 1/x is defined for all x ≠ 0.",
          "As with polynomials, integration is linear: ∫[af(x) + bg(x)] dx = a∫f(x) dx + b∫g(x) dx. This means you can integrate term by term and use a single +C.",
        ],
        latexBlocks: [
          "\\int e^x\\,dx = e^x+C \\qquad \\int \\cos x\\,dx = \\sin x+C \\qquad \\int \\sin x\\,dx = -\\cos x+C",
          "\\int \\frac{1}{x}\\,dx = \\ln|x|+C",
          "\\int [f(x)+g(x)]\\,dx = \\int f(x)\\,dx + \\int g(x)\\,dx",
        ],
      },
      workedExamples: stdWorked,
      guidedPractice: stdGuided,
      independentPractice: stdIndep,
      commonMistakes: [
        { mistake: "Writing ∫sin x dx = cos x + C (wrong sign).", fix: "Differentiating cos x gives −sin x, NOT sin x. So ∫sin x dx = −cos x + C. Memorise the sign carefully." },
        { mistake: "Applying the reverse power rule to eˣ.", fix: "eˣ is not xⁿ. Its antiderivative is eˣ, not eˣ⁺¹/(x+1)." },
        { mistake: "Writing ∫(1/x) dx = ln x + C without the absolute value.", fix: "ln is undefined for negative numbers, but 1/x is defined for x < 0. The correct answer is ln|x| + C." },
      ],
      masteryQuiz: stdMastery,
    };
  }

  if (lesson.slug === "initial-value-problems") {
    return {
      ...base,
      description:
        "Use a given point to determine the constant of integration and find the particular primitive.",
      learningIntention:
        "Find a specific antiderivative by substituting an initial condition to determine the constant of integration.",
      successCriteria: [
        "Find the general antiderivative F(x) + C from a given derivative.",
        "Substitute a given point to set up an equation for C.",
        "Solve for C and write the particular primitive.",
        "Interpret C geometrically as a vertical shift within a family of curves.",
        "Reconstruct a function from its derivative and one known value.",
      ],
      teaching: {
        paragraphs: [
          "When you integrate without limits, you get a family of curves F(x) + C. All members share the same shape and the same derivative, but each sits at a different height.",
          "An initial condition is a known point on the curve (an x-value and its corresponding y-value). Substituting this point into F(x) + C creates an equation that can be solved for C.",
          "Once C is found, you have the particular primitive — the unique curve from the family that passes through the given point.",
          "This process is exactly what happens when solving a differential equation: integrate to find the general solution, then apply the initial condition to pin down the particular solution.",
          "Always write the general form first, then substitute. Writing the answer before substituting leads to errors.",
        ],
        latexBlocks: [
          "\\text{General: } F(x)+C",
          "\\text{Particular: substitute }(x_0,y_0)\\Rightarrow y_0=F(x_0)+C\\Rightarrow C=y_0-F(x_0)",
        ],
      },
      workedExamples: ivWorked,
      guidedPractice: ivGuided,
      independentPractice: ivIndep,
      commonMistakes: [
        { mistake: "Substituting the point before integrating.", fix: "Always antidifferentiate first to get F(x) + C, then substitute the point to find C." },
        { mistake: "Forgetting +C when writing the general form.", fix: "Without C, you cannot accommodate the initial condition. The general form must include C." },
        { mistake: "Solving for C correctly but forgetting to write the final function.", fix: "The answer is f(x) = F(x) + [value of C], not just C." },
      ],
      masteryQuiz: ivMastery,
    };
  }

  if (lesson.slug === "definite-integrals") {
    return {
      ...base,
      description:
        "Evaluate definite integrals using the antiderivative notation, understand signed area, and interpret the geometric meaning.",
      learningIntention:
        "Use the definite integral to compute exact values using F(b) − F(a) and interpret the sign of the result.",
      successCriteria: [
        "Write and interpret the notation ∫ₐᵇ f(x) dx.",
        "Evaluate a definite integral using F(b) − F(a).",
        "Identify why +C cancels in a definite integral.",
        "Explain the meaning of a positive and a negative definite integral.",
        "Recognise that the definite integral gives signed area, not raw area.",
      ],
      teaching: {
        paragraphs: [
          "A definite integral ∫ₐᵇ f(x) dx has specific numbers (limits) at the top and bottom of the integral sign. The result is a single number, not a family of functions.",
          "To evaluate, find any antiderivative F(x) (no +C needed), then compute F(b) − F(a). This is written using bracket notation: [F(x)]ₐᵇ.",
          "The constant of integration always cancels: (F(b) + C) − (F(a) + C) = F(b) − F(a). This is why we do not write +C in definite integrals.",
          "If the curve lies above the x-axis on [a, b], the definite integral is positive and equals the enclosed area. If the curve lies below the x-axis, the integral is negative — it gives signed area, not absolute area.",
          "Swapping limits negates the result: ∫ₐᵇ f(x) dx = −∫ᵦₐ f(x) dx. The order of the limits determines the sign.",
        ],
        latexBlocks: [
          "\\int_a^b f(x)\\,dx = \\bigl[F(x)\\bigr]_a^b = F(b)-F(a)",
          "\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx",
        ],
      },
      workedExamples: defWorked,
      guidedPractice: defGuided,
      independentPractice: defIndep,
      commonMistakes: [
        { mistake: "Adding +C when evaluating a definite integral.", fix: "+C cancels when the limits are substituted. Do not include it in a definite integral." },
        { mistake: "Computing F(a) − F(b) instead of F(b) − F(a).", fix: "Subtract the lower-limit value FROM the upper-limit value. Upper minus lower." },
        { mistake: "Treating a negative integral as an error.", fix: "A negative result means the curve is below the x-axis. It is signed area, not raw area." },
      ],
      masteryQuiz: defMastery,
    };
  }

  if (lesson.slug === "fundamental-theorem-of-calculus") {
    return {
      ...base,
      description:
        "Understand the Fundamental Theorem of Calculus as the connection between differentiation and integration.",
      learningIntention:
        "Apply the FTC to evaluate definite integrals and understand the derivative of an accumulation function.",
      successCriteria: [
        "State the FTC: ∫ₐᵇ f(x) dx = F(b) − F(a) where F' = f.",
        "Evaluate definite integrals using the FTC, including expressions with roots and fractions.",
        "Use the FTC to find d/dx ∫₀ˣ f(t) dt = f(x).",
        "Explain why the FTC shows integration and differentiation are inverse operations.",
        "Recognise that the +C cancels and does not affect definite integral results.",
      ],
      teaching: {
        paragraphs: [
          "The Fundamental Theorem of Calculus (FTC) is the central theorem of calculus. It reveals that differentiation and integration are not separate operations — they are inverses of each other.",
          "The first part of the FTC says that if F is any antiderivative of f, then ∫ₐᵇ f(x) dx = F(b) − F(a). This is the formula used to evaluate every definite integral.",
          "The second part says that d/dx ∫₀ˣ f(t) dt = f(x). Differentiating an accumulation integral returns the original integrand at the variable upper limit.",
          "This theorem is why definite integrals can be calculated exactly from antiderivatives alone, without computing infinite sums of rectangles. The theorem bypasses the limit entirely.",
          "When evaluating, always substitute the upper limit first, then subtract the lower limit value. The constant C cancels in the subtraction.",
        ],
        latexBlocks: [
          "\\int_a^b f(x)\\,dx = F(b)-F(a), \\quad F'(x)=f(x)",
          "\\frac{d}{dx}\\int_0^x f(t)\\,dt = f(x)",
        ],
      },
      workedExamples: ftcWorked,
      guidedPractice: ftcGuided,
      independentPractice: ftcIndep,
      commonMistakes: [
        { mistake: "Differentiating rather than integrating when the FTC is being applied.", fix: "Read the question carefully. If it asks for ∫ₐᵇ, you integrate; if it asks for d/dx ∫₀ˣ, you return the integrand." },
        { mistake: "Including +C after evaluating a definite integral.", fix: "The +C always cancels because it is subtracted from itself. Never include +C in a definite integral evaluation." },
        { mistake: "Writing F(a) − F(b) instead of F(b) − F(a).", fix: "The FTC uses upper limit minus lower limit: F(b) − F(a)." },
      ],
      masteryQuiz: ftcMastery,
    };
  }

  if (lesson.slug === "areas-under-curves") {
    return {
      ...base,
      description:
        "Use definite integrals to calculate areas under curves, between curves, and identify when splitting is required.",
      learningIntention:
        "Calculate areas enclosed between curves and axes, handle curves below the x-axis, and find areas between two curves.",
      successCriteria: [
        "Set up and evaluate an integral to find area under a curve above the x-axis.",
        "Explain why a negative integral does not mean zero area.",
        "Use absolute value or negation to find area when a curve is below the x-axis.",
        "Split an integral at the x-intercept when the curve crosses the axis.",
        "Find the area between two curves using ∫(upper − lower) dx.",
      ],
      teaching: {
        paragraphs: [
          "The definite integral ∫ₐᵇ f(x) dx gives signed area. When f(x) ≥ 0 on [a, b], the integral equals the geometric area under the curve. When f(x) < 0, the integral is negative — the region is below the axis.",
          "To find the true geometric area when a curve dips below the axis, take the absolute value of the integral over that region, or negate it: Area = −∫ₐᵇ f(x) dx for the below-axis part.",
          "When a curve crosses the x-axis at some point c inside [a, b], you must split the integral: Area = ∫ₐ^c f(x) dx + |∫_c^b f(x) dx|. A single integral over the whole interval would partially cancel.",
          "To find the area between two curves y = f(x) (upper) and y = g(x) (lower) on [a, b]: Area = ∫ₐᵇ [f(x) − g(x)] dx. Check which curve is on top on the given interval before setting up.",
          "Finding intersection points is the key step before setting up an area-between-curves problem. Set f(x) = g(x) and solve to locate where the curves swap order. At this stage all intersection equations reduce to simple factoring — expect expressions like x² = x or x² = 4 that factor easily. Problems requiring more complex intersections are a Year 12 extension.",
        ],
        latexBlocks: [
          "\\text{Area above axis: }\\int_a^b f(x)\\,dx\\quad (f(x)\\ge0)",
          "\\text{Area below axis: }-\\int_a^b f(x)\\,dx\\quad (f(x)\\le0)",
          "\\text{Area between curves: }\\int_a^b[f(x)-g(x)]\\,dx\\quad (f(x)\\ge g(x))",
        ],
      },
      workedExamples: areaWorked,
      guidedPractice: areaGuided,
      independentPractice: areaIndep,
      commonMistakes: [
        { mistake: "Using a single integral when the curve crosses the x-axis.", fix: "A single integral cancels positive and negative areas. Split at every x-intercept and add absolute values." },
        { mistake: "Setting up ∫(lower − upper) for between-curve area.", fix: "Always subtract the lower curve from the upper curve. Reversing this gives a negative area." },
        { mistake: "Reporting a negative integral as the area.", fix: "Area is always positive. If the integral is negative, the actual area is its absolute value." },
      ],
      masteryQuiz: areaMastery,
    };
  }

  if (lesson.slug === "reverse-chain-rule-integration") {
    return {
      ...base,
      description:
        "Integrate composite functions of the form f(ax + b) by reversing the chain rule.",
      learningIntention:
        "Apply the reverse chain rule to integrate expressions of the form (ax+b)ⁿ, e^(ax+b), sin(ax+b), and cos(ax+b).",
      successCriteria: [
        "Recognise when the reverse chain rule applies (linear inner function).",
        "Integrate ∫(ax+b)ⁿ dx by increasing the power and dividing by (n+1)×a.",
        "Integrate ∫e^(ax+b) dx by dividing eˣ by the inner coefficient a.",
        "Integrate ∫sin(ax+b) dx and ∫cos(ax+b) dx by dividing by a.",
        "Check reverse-chain-rule integrals by differentiating the answer.",
        "Identify that a non-linear inner function requires Extension-level techniques.",
      ],
      teaching: {
        paragraphs: [
          "The chain rule for differentiation gives d/dx[f(ax+b)] = a·f'(ax+b). To reverse this, we integrate f'(ax+b) and divide by the inner coefficient a.",
          "For power functions: ∫(ax+b)ⁿ dx = (ax+b)ⁿ⁺¹ / [a(n+1)] + C. The denominator now has two factors: (n+1) from the power rule and a from the chain rule.",
          "For exponentials: ∫e^(ax+b) dx = e^(ax+b) / a + C. The function itself does not change; you only divide by the inner coefficient.",
          "For trigonometric functions: ∫sin(ax+b) dx = −cos(ax+b)/a + C and ∫cos(ax+b) dx = sin(ax+b)/a + C.",
          "The reverse chain rule only works cleanly when the inner function is linear (ax + b). When the inner function is quadratic or more complex, a substitution method is needed — that is an Extension topic.",
        ],
        latexBlocks: [
          "\\int (ax+b)^n\\,dx = \\frac{(ax+b)^{n+1}}{a(n+1)}+C",
          "\\int e^{ax+b}\\,dx = \\frac{e^{ax+b}}{a}+C",
          "\\int \\cos(ax+b)\\,dx = \\frac{\\sin(ax+b)}{a}+C \\qquad \\int \\sin(ax+b)\\,dx = -\\frac{\\cos(ax+b)}{a}+C",
        ],
      },
      workedExamples: rcrWorked,
      guidedPractice: rcrGuided,
      independentPractice: rcrIndep,
      commonMistakes: [
        { mistake: "Forgetting to divide by the inner coefficient a.", fix: "When using the reverse chain rule, you must divide by a in addition to dividing by (n+1). One factor for the power, one for the chain." },
        { mistake: "Applying the reverse chain rule to a non-linear inner function.", fix: "∫xe^(x²) dx requires substitution u = x². At Year 11 level, only linear inner functions (ax + b) are in scope." },
        { mistake: "Getting the sign wrong for ∫sin(ax+b) dx.", fix: "∫sin(ax+b) dx = −cos(ax+b)/a + C. The negative sign is there because d/dx(cos) = −sin." },
      ],
      masteryQuiz: rcrMastery,
    };
  }

  if (lesson.slug === "trapezoidal-rule") {
    return {
      ...base,
      description:
        "Use the trapezoidal rule to approximate definite integrals numerically and interpret the accuracy of the result.",
      learningIntention:
        "Apply the trapezoidal rule to approximate areas and understand when it over- or underestimates.",
      successCriteria: [
        "State the trapezoidal rule formula: T = (h/2)(f₀ + 2f₁ + 2f₂ + ⋯ + 2f_{n−1} + fₙ).",
        "Calculate the strip width h = (b − a)/n.",
        "Apply the rule from a table of function values.",
        "Identify whether the approximation is an overestimate or underestimate from the concavity.",
        "Explain how increasing the number of strips reduces error.",
        "Use the trapezoidal rule in modelling contexts.",
      ],
      teaching: {
        paragraphs: [
          "The trapezoidal rule approximates ∫ₐᵇ f(x) dx by dividing the interval [a, b] into n equal strips of width h = (b−a)/n, then using the area of trapezoids to estimate the total area.",
          "Each trapezoid has parallel sides at consecutive x-values. The interior values are counted twice (they are the shared edge of adjacent trapezoids), while the endpoints are counted once.",
          "The formula is T = (h/2)(f₀ + 2f₁ + 2f₂ + ⋯ + 2f_{n−1} + fₙ) where f_k = f(a + kh).",
          "When the curve is concave up (f'' > 0), each trapezoid lies above the curve, giving an overestimate. When the curve is concave down (f'' < 0), trapezoids lie below the curve, giving an underestimate. For linear curves, the approximation is exact.",
          "Increasing the number of strips n (decreasing h) always improves accuracy. The error is proportional to h², so halving h reduces error by a factor of 4.",
        ],
        latexBlocks: [
          "T = \\frac{h}{2}\\bigl(f_0+2f_1+2f_2+\\cdots+2f_{n-1}+f_n\\bigr)",
          "h = \\frac{b-a}{n}",
        ],
      },
      workedExamples: trapWorked,
      guidedPractice: trapGuided,
      independentPractice: trapIndep,
      commonMistakes: [
        { mistake: "Doubling all values including the endpoints.", fix: "The first and last values are NOT doubled. Only interior function values get the factor of 2." },
        { mistake: "Confusing n (number of strips) with the number of x-values.", fix: "n strips require n+1 function values: f₀, f₁, …, fₙ. The number of values is one more than the number of strips." },
        { mistake: "Forgetting the factor of h/2 outside the bracket.", fix: "The h/2 factor is always required. Omitting it gives a result that is off by a factor of h/2." },
      ],
      masteryQuiz: trapMastery,
    };
  }

  return null;
}
