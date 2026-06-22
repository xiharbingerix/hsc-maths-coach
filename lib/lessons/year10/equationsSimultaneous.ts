import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function terminatingDecimalFromFraction(answer: string): string | null {
  const match = answer.match(/^(-?\d+)\/(\d+)$/);
  if (!match) return null;

  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  if (denominator === 0) return null;

  let remainingDenominator = Math.abs(denominator);
  while (remainingDenominator % 2 === 0) remainingDenominator /= 2;
  while (remainingDenominator % 5 === 0) remainingDenominator /= 5;

  return remainingDenominator === 1 ? String(numerator / denominator) : null;
}

function safeEquationAnswerVariants(prompt: string, answer: string): string[] {
  const variants: string[] = [];
  const normalisedPrompt = prompt.toLowerCase();
  const numericAnswer = Number(answer);

  if (Number.isFinite(numericAnswer) && Number.isInteger(numericAnswer)) {
    variants.push(numericAnswer.toFixed(1));
  }

  const terminatingDecimal = terminatingDecimalFromFraction(answer);
  if (terminatingDecimal) variants.push(terminatingDecimal);

  const coordinatePair = answer.match(/^\(\s*([^,]+),\s*([^)]+)\)$/);
  if (coordinatePair) {
    const [, x, y] = coordinatePair;
    variants.push(`(${x},${y})`, `${x},${y}`, `${x}, ${y}`, `x=${x}, y=${y}`, `x = ${x}, y = ${y}`);
    return variants;
  }

  const rootPair = answer.match(/^\s*([^,]+),\s*([^,]+)\s*$/);
  if (rootPair && normalisedPrompt.includes("both solutions")) {
    const [, firstRoot, secondRoot] = rootPair;
    variants.push(
      `${firstRoot},${secondRoot}`,
      `${secondRoot}, ${firstRoot}`,
      `${secondRoot},${firstRoot}`,
      `x=${firstRoot} or x=${secondRoot}`,
      `x=${secondRoot} or x=${firstRoot}`,
      `${firstRoot} or ${secondRoot}`,
      `${secondRoot} or ${firstRoot}`,
      `${firstRoot} and ${secondRoot}`,
      `${secondRoot} and ${firstRoot}`
    );
    return variants;
  }

  let variable: "x" | "y" | null = null;
  if (normalisedPrompt.includes("what is y") || normalisedPrompt.includes("value of y")) variable = "y";
  if (
    normalisedPrompt.includes("what is x") ||
    normalisedPrompt.includes("value of x") ||
    normalisedPrompt.includes("positive solution") ||
    normalisedPrompt.includes("larger solution") ||
    normalisedPrompt.includes("larger root") ||
    normalisedPrompt.startsWith("solve ")
  ) {
    variable = "x";
  }

  if (variable) variants.push(`${variable}=${answer}`, `${variable} = ${answer}`);

  return variants;
}

function eqAnswerHint(id: string) {
  if (id.startsWith("lin-")) {
    return "Treat the equation like a balance scale. Undo operations in reverse order and make the same change to both sides.";
  }
  if (id.startsWith("qf-")) {
    return "Make one side zero, factorise, then set each factor equal to zero separately.";
  }
  if (id.startsWith("qform-")) {
    return "Identify a, b and c with their signs before using the discriminant or quadratic formula.";
  }
  if (id.startsWith("sub-")) {
    return "Replace one variable with its matching expression in the other equation, then substitute back for the second value.";
  }
  return "Choose a variable to cancel by adding or subtracting the whole equations, then substitute back for the second value.";
}

function eqAnswerExplanation(id: string, prompt: string, latex: string, answer: string) {
  const question = `${prompt} ${latex}`.toLowerCase();

  if (id.startsWith("lin-")) {
    if (question.includes("(") || question.includes("\\dfrac")) {
      return `An equation is a balance scale. Undo the outside operation first, then undo the operation grouped with x, making the same change to both sides each time. This isolates x and gives ${answer}.`;
    }
    if ((question.match(/x/g) ?? []).length > 1) {
      return `Keep the equation balanced while bringing the x-terms together on one side and the constants together on the other. Then divide by the coefficient of x; this gives ${answer}.`;
    }
    return `Keep the equation balanced: undo the operation attached to x by doing the same thing to both sides. This isolates x and gives ${answer}.`;
  }

  if (id.startsWith("qf-")) {
    if (question.includes("sum of the two solutions")) {
      return `Factorise the quadratic and use the zero-product property to find both roots. Add those two roots only after solving the two bracket equations; their sum is ${answer}.`;
    }
    if (question.includes("x² =") || question.includes("x^2=")) {
      return `A positive square has two square roots, one positive and one negative. Check both values in the original equation; the solutions are ${answer}.`;
    }
    return `First write the quadratic as a product equal to zero. The zero-product property means each factor gets its own mini-equation, so solve both factors and keep every root: ${answer}.`;
  }

  if (id.startsWith("qform-")) {
    if (question.includes("discriminant equal to 0")) {
      return `The discriminant is the part under the square root. When it is zero, the plus and minus versions meet at the same value, so there is ${answer} repeated real solution.`;
    }
    if (question.includes("discriminant")) {
      return `Read a, b and c with their signs, then evaluate b^2 - 4ac carefully. This number tells you what the square-root part of the quadratic formula will do; here it is ${answer}.`;
    }
    return `Use the quadratic formula when factorising is not the chosen route. Copy the signs of a, b and c carefully, evaluate both plus-or-minus branches, and select the root requested: ${answer}.`;
  }

  if (id.startsWith("sub-")) {
    const pairReminder = question.includes("(x, y)")
      ? "The final pair is the point where both equations are true at the same time."
      : "Substitute back if you need the other variable.";
    return `Substitution means replacing a variable with an equal expression from the other equation. That turns two variables into one so you can solve normally. ${pairReminder} This gives ${answer}.`;
  }

  const operation = question.includes("add the") || question.includes("x-y") || question.includes("x − y")
    ? "add"
    : "subtract";
  const pairReminder = question.includes("(x, y)")
    ? "Substitute back for the second value: the coordinate pair is the point where both equations meet."
    : "Substitute back if the question asks for the other variable.";
  return `Elimination works by combining the whole equations so one variable cancels out. Here, ${operation} the equations, solve the remaining one-variable equation, then check the result. ${pairReminder} This gives ${answer}.`;
}

function eqAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers, ...safeEquationAnswerVariants(prompt, answer)])),
    hint: eqAnswerHint(id),
    explanation: eqAnswerExplanation(id, prompt, latex, answer),
  };
}

function eqChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({
      label,
      text: choices[i],
    })),
    answer,
    hint: "Apply the method, then check each option.",
    explanation,
  };
}

// ─── Lesson 1: Solving Linear Equations ──────────────────────────────────────

const solvingLinearWorkedExamples: WorkedExample[] = [
  {
    title: "Solving a one-step equation",
    questionLatex: "\\text{Solve }x+7=19.",
    steps: [
      { explanation: "Subtract 7 from both sides to isolate x.", latex: "x+7-7=19-7" },
      { explanation: "Simplify.", latex: "x=12" },
    ],
    finalAnswerLatex: "x=12",
  },
  {
    title: "Solving a two-step equation",
    questionLatex: "\\text{Solve }2x+5=17.",
    steps: [
      { explanation: "Subtract 5 from both sides.", latex: "2x+5-5=17-5\\implies 2x=12" },
      { explanation: "Divide both sides by 2.", latex: "x=\\frac{12}{2}=6" },
    ],
    finalAnswerLatex: "x=6",
  },
  {
    title: "Solving an equation with brackets",
    questionLatex: "\\text{Solve }3(x-2)=15.",
    steps: [
      { explanation: "Divide both sides by 3 first (or expand — both work).", latex: "x-2=\\frac{15}{3}=5" },
      { explanation: "Add 2 to both sides.", latex: "x=5+2=7" },
      { explanation: "Check: 3(7 − 2) = 3 × 5 = 15 ✓", latex: "3(7-2)=15\\checkmark" },
    ],
    finalAnswerLatex: "x=7",
  },
];

const solvingLinearGuided: PracticeQuestion[] = [
  eqAnswer("lin-g1", "Solve x + 9 = 22.", "x+9=22", "13", ["13"]),
  eqChoice("lin-g2", "Which step correctly begins solving 2x + 5 = 17?", "A",
    ["Subtract 5 from both sides", "Add 5 to both sides", "Divide both sides by 2", "Multiply both sides by 2"],
    "To isolate the x-term, first undo the +5 by subtracting 5 from both sides: 2x = 12."),
  eqAnswer("lin-g3", "Solve 4x = 28.", "4x=28", "7", ["7"]),
  eqChoice("lin-g4", "What is the solution to 5x − 3 = 2x + 12?", "B",
    ["$x=3$", "$x=5$", "$x=9$", "$x=15$"],
    "Collect x-terms: 5x − 2x = 3x. Collect constants: 12 + 3 = 15. So 3x = 15, x = 5.",
    "5x-3=2x+12"),
];

const solvingLinearIndependent: PracticeQuestion[] = [
  eqAnswer("lin-i1", "Solve x − 6 = 13.", "x-6=13", "19", ["19"]),
  eqChoice("lin-i2", "Which is the solution to 3x + 2 = 14?", "C",
    ["$x=6$", "$x=12$", "$x=4$", "$x=2$"],
    "Subtract 2: 3x = 12. Divide by 3: x = 4.",
    "3x+2=14"),
  eqAnswer("lin-i3", "Solve 6x = 42.", "6x=42", "7", ["7"]),
  eqChoice("lin-i4", "Which is the solution to 4x − 1 = 2x + 9?", "A",
    ["$x=5$", "$x=4$", "$x=10$", "$x=3$"],
    "Collect x-terms: 2x. Collect constants: 10. So 2x = 10, x = 5.",
    "4x-1=2x+9"),
  eqAnswer("lin-i5", "Solve 2(x + 3) = 16.", "2(x+3)=16", "5", ["5"]),
];

const solvingLinearMistakes = [
  { mistake: "Performing an operation on only one side, e.g. writing 2x + 5 = 17 then 2x = 17 (forgetting to subtract 5 from the right).", fix: "Whatever you do to one side must be done to the other. Subtract 5 from both sides: 2x = 12." },
  { mistake: "Moving a term to the other side without changing its sign, e.g. writing 5x = 2x + 12 then 5x + 2x = 12.", fix: "When a term crosses the equals sign, its sign changes. Subtract 2x from both sides: 3x = 12." },
  { mistake: "Not dividing all terms by the coefficient, e.g. from 3x = 15 writing x = 15 instead of x = 5.", fix: "Divide every term on both sides by the coefficient of x. 3x = 15 → x = 15 ÷ 3 = 5." },
  { mistake: "Forgetting to expand brackets before solving, e.g. from 3(x − 2) = 15 immediately dividing only the 3, leaving − 2 undivided.", fix: "Either expand first (3x − 6 = 15) or divide the entire right-hand side by 3 (x − 2 = 5). Both give x = 7." },
];

const solvingLinearMastery: PracticeQuestion[] = [
  eqAnswer("lin-m1", "Solve x + 14 = 25.", "x+14=25", "11", ["11"]),
  eqChoice("lin-m2", "Which is the solution to 7x = 56?", "B",
    ["$x=7$", "$x=8$", "$x=9$", "$x=6$"],
    "Divide both sides by 7: x = 56 ÷ 7 = 8.",
    "7x=56"),
  eqAnswer("lin-m3", "Solve 2x − 3 = 11.", "2x-3=11", "7", ["7"]),
  eqChoice("lin-m4", "Which is the solution to 6x + 1 = 4x + 13?", "C",
    ["$x=4$", "$x=7$", "$x=6$", "$x=3$"],
    "Collect: 2x = 12, x = 6. Check: 6(6) + 1 = 37 and 4(6) + 13 = 37 ✓",
    "6x+1=4x+13"),
  eqAnswer("lin-m5", "Solve 4(x − 1) = 2(x + 5).", "4(x-1)=2(x+5)", "7", ["7"]),
  eqChoice("lin-m6", "Which equation has solution x = 4?", "A",
    ["$2x+3=11$", "$3x=9$", "$x+7=12$", "$4x-2=10$"],
    "Check A: 2(4) + 3 = 11 ✓. The others give x = 3, x = 5, x = 3 respectively.",
    "\\text{Which equation has solution }x=4?"),
  eqAnswer("lin-m7", "Solve 5x − 7 = 3x + 9.", "5x-7=3x+9", "8", ["8"]),
  eqChoice("lin-m8", "What is the solution to 4(2x − 1) = 28?", "A",
    ["$x=4$", "$x=3$", "$x=5$", "$x=3.5$"],
    "Divide both sides by 4: 2x − 1 = 7. Add 1: 2x = 8. Divide by 2: x = 4.",
    "4(2x-1)=28"),
  eqAnswer("lin-m9", "Solve (x + 2)/3 = 5. Multiply both sides by 3 first.", "\\dfrac{x+2}{3}=5", "13", ["13"]),
  eqChoice("lin-m10", "A student solves 3x + 5 = 20 and gets x = 3. What went wrong?", "A",
    ["They subtracted 5 correctly to get 3x = 15, then divided by 5 instead of 3.", "They forgot to subtract 5 and divided 20 by 3.", "They made no error — x = 3 is correct.", "They multiplied both sides by 3 instead of dividing."],
    "3x + 5 = 20 → 3x = 15 → x = 5. Dividing 15 by 5 instead of 3 gives the wrong answer of 3.",
    "\\text{Identify the error in }3x+5=20\\Rightarrow x=3"),
];

// ─── Lesson 2: Solving Quadratics by Factorising ─────────────────────────────

const quadraticsFactorisingWorkedExamples: WorkedExample[] = [
  {
    title: "Factorising and applying the null factor law",
    questionLatex: "\\text{Solve }x^2+7x+12=0.",
    steps: [
      { explanation: "Find two numbers that multiply to 12 and add to 7: 3 and 4.", latex: "x^2+7x+12=(x+3)(x+4)" },
      { explanation: "Set each factor equal to zero — this is the null factor law.", latex: "(x+3)=0\\text{ or }(x+4)=0" },
      { explanation: "Solve each.", latex: "x=-3\\text{ or }x=-4" },
    ],
    finalAnswerLatex: "x=-3\\text{ or }x=-4",
  },
  {
    title: "Equation with opposite-sign factors",
    questionLatex: "\\text{Solve }x^2-x-6=0.",
    steps: [
      { explanation: "Find two numbers with product −6 and sum −1: −3 and 2.", latex: "(x-3)(x+2)=0" },
      { explanation: "Apply the null factor law.", latex: "x=3\\text{ or }x=-2" },
    ],
    finalAnswerLatex: "x=3\\text{ or }x=-2",
  },
  {
    title: "Factorising with a common factor",
    questionLatex: "\\text{Solve }2x^2-8x=0.",
    steps: [
      { explanation: "Take out the common factor 2x.", latex: "2x(x-4)=0" },
      { explanation: "Apply the null factor law.", latex: "2x=0\\text{ or }x-4=0" },
      { explanation: "Solve each. Note x = 0 is a valid solution.", latex: "x=0\\text{ or }x=4" },
    ],
    finalAnswerLatex: "x=0\\text{ or }x=4",
  },
];

const quadraticsFactorisingGuided: PracticeQuestion[] = [
  eqAnswer("qf-g1", "Solve x² + 5x + 6 = 0. Write both solutions separated by a comma.", "x^2+5x+6=0",
    "-2, -3", ["-2,-3", "-3, -2", "-3,-2", "x=-2 and x=-3", "x=-3 and x=-2"]),
  eqChoice("qf-g2", "The equation (x − 5)(x + 1) = 0 has solutions:", "A",
    ["$x=5$ and $x=-1$", "$x=-5$ and $x=1$", "$x=5$ and $x=1$", "$x=-5$ and $x=-1$"],
    "The null factor law gives x − 5 = 0 → x = 5, and x + 1 = 0 → x = −1.",
    "(x-5)(x+1)=0"),
  eqAnswer("qf-g3", "Solve x² = 16. Write both solutions separated by a comma.", "x^2=16",
    "4, -4", ["4,-4", "-4, 4", "-4,4", "x=4 and x=-4", "x=-4 and x=4"]),
  eqChoice("qf-g4", "Which is the correct first step for solving x² − 3x − 10 = 0?", "A",
    ["Write $(x-5)(x+2)=0$", "Write $(x+5)(x-2)=0$", "Write $x(x-3)=10$", "Add 10 to both sides"],
    "Need two numbers with product −10 and sum −3: −5 and 2. So (x − 5)(x + 2) = 0.",
    "x^2-3x-10=0"),
];

const quadraticsFactorisingIndependent: PracticeQuestion[] = [
  eqAnswer("qf-i1", "Solve x² + 8x + 15 = 0. Write both solutions separated by a comma.", "x^2+8x+15=0",
    "-3, -5", ["-3,-5", "-5, -3", "-5,-3", "x=-3 and x=-5", "x=-5 and x=-3"]),
  eqChoice("qf-i2", "Which correctly applies the null factor law to (x + 4)(x − 6) = 0?", "B",
    ["$x=4$ and $x=-6$", "$x=-4$ and $x=6$", "$x=4$ and $x=6$", "$x=-4$ and $x=-6$"],
    "Set each factor to zero: x + 4 = 0 → x = −4; x − 6 = 0 → x = 6.",
    "(x+4)(x-6)=0"),
  eqAnswer("qf-i3", "Solve x² − 4x − 12 = 0. Write only the positive solution.", "x^2-4x-12=0", "6", ["6"]),
  eqChoice("qf-i4", "How many solutions does x² − 9 = 0 have?", "C",
    ["One solution: $x=3$ only", "One solution: $x=-3$ only", "Two solutions: $x=3$ and $x=-3$", "No solutions"],
    "Rearrange: x² = 9, so x = ±3. Both values satisfy the equation.",
    "x^2-9=0"),
  eqAnswer("qf-i5", "Solve x² + 3x = 0. Write both solutions separated by a comma.", "x^2+3x=0",
    "0, -3", ["0,-3", "-3, 0", "-3,0", "x=0 and x=-3", "x=-3 and x=0"]),
];

const quadraticsFactorisingMistakes = [
  { mistake: "Not rearranging to = 0 before factorising, e.g. factorising x² + 5x = 6 as x(x + 5) = 6 and writing x = 6 or x + 5 = 6.", fix: "The null factor law only applies when one side is zero. Rearrange first: x² + 5x − 6 = 0." },
  { mistake: "Getting the sign wrong in the null factor law, e.g. from (x + 3) = 0 writing x = 3 instead of x = −3.", fix: "If (x + 3) = 0, then x = −3. If (x − 3) = 0, then x = 3. The sign of x is always opposite to the sign in the bracket." },
  { mistake: "Missing the solution x = 0 when factorising, e.g. for x² − 4x = 0 writing only x = 4.", fix: "Factor as x(x − 4) = 0. Both factors give a solution: x = 0 or x = 4." },
  { mistake: "Finding only one solution when two are expected, e.g. solving x² − 9 = 0 as x = 3 only.", fix: "x² = 9 means x could be +3 or −3. Always check whether a quadratic equation can have two solutions." },
];

const quadraticsFactorisingMastery: PracticeQuestion[] = [
  eqChoice("qf-m1", "The equation (x − 2)(x + 7) = 0 has solutions:", "A",
    ["$x=2$ and $x=-7$", "$x=-2$ and $x=7$", "$x=2$ and $x=7$", "$x=-2$ and $x=-7$"],
    "Null factor law: x − 2 = 0 → x = 2; x + 7 = 0 → x = −7.",
    "(x-2)(x+7)=0"),
  eqAnswer("qf-m2", "Solve x² + 10x + 24 = 0. Write both solutions separated by a comma.", "x^2+10x+24=0",
    "-4, -6", ["-4,-6", "-6, -4", "-6,-4", "x=-4 and x=-6"]),
  eqAnswer("qf-m3", "Solve x² − 25 = 0. Write both solutions separated by a comma.", "x^2-25=0",
    "5, -5", ["5,-5", "-5, 5", "-5,5", "x=5 and x=-5"]),
  eqChoice("qf-m4", "Which correctly factorises x² + 5x − 14 = 0?", "A",
    ["$(x+7)(x-2)=0$", "$(x-7)(x+2)=0$", "$(x+7)(x+2)=0$", "$(x-7)(x-2)=0$"],
    "Need product = −14 and sum = 5: 7 and −2 work. Check: (x+7)(x−2) = x²+5x−14 ✓",
    "x^2+5x-14=0"),
  eqAnswer("qf-m5", "Solve x² − 7x = 0. Write both solutions separated by a comma.", "x^2-7x=0",
    "0, 7", ["0,7", "7, 0", "7,0", "x=0 and x=7"]),
  eqChoice("qf-m6", "Which gives the solutions of x² + x − 20 = 0?", "A",
    ["$x=4$ and $x=-5$", "$x=-4$ and $x=5$", "$x=4$ and $x=5$", "$x=-4$ and $x=-5$"],
    "Need product = −20 and sum = 1: 5 and −4. So (x+5)(x−4)=0 → x=−5 or x=4.",
    "x^2+x-20=0"),
  eqAnswer("qf-m7", "What is the sum of the two solutions of x² − x − 6 = 0?", "x^2-x-6=0", "1", ["1"]),
  eqChoice("qf-m8", "Which equation has solutions x = 3 and x = −8?", "A",
    ["$x^2+5x-24=0$", "$x^2-5x-24=0$", "$x^2+5x+24=0$", "$x^2-11x+24=0$"],
    "(x−3)(x+8) = x²+5x−24 = 0. Check: sum = 5 ✓, product = −24 ✓",
    "\\text{Which equation has solutions }x=3\\text{ and }x=-8?"),
  eqAnswer("qf-m9", "Solve 3x² − 12x = 0. Write both solutions separated by a comma.", "3x^2-12x=0",
    "0, 4", ["0,4", "4, 0", "4,0", "x=0 and x=4"]),
  eqChoice("qf-m10", "A student solves x² − 4x + 4 = 0 and writes x = 2 and x = −2. What is wrong?", "A",
    ["The correct solution is $x=2$ only (repeated root); $x=-2$ does not satisfy the equation.", "The correct solutions are $x=-2$ (repeated).", "Both solutions are correct.", "The equation cannot be factorised."],
    "(x−2)² = 0 gives only x = 2. Check x = −2: (−2)² − 4(−2) + 4 = 4+8+4 = 16 ≠ 0.",
    "x^2-4x+4=0"),
];

// ─── Lesson 3: The Quadratic Formula ─────────────────────────────────────────

const quadraticFormulaWorkedExamples: WorkedExample[] = [
  {
    title: "Identifying a, b and c",
    questionLatex: "\\text{Identify }a,b,c\\text{ for }2x^2-3x-5=0.",
    steps: [
      { explanation: "The equation is already in the form ax² + bx + c = 0.", latex: "a=2,\\quad b=-3,\\quad c=-5" },
      { explanation: "Note that b and c carry their signs. Here b is negative.", latex: "\\text{Do not write }b=3\\text{ — the sign is part of the value.}" },
    ],
    finalAnswerLatex: "a=2,\\;b=-3,\\;c=-5",
  },
  {
    title: "Using the quadratic formula",
    questionLatex: "\\text{Solve }x^2+3x-1=0.\\text{ Give answers to 2 decimal places.}",
    steps: [
      { explanation: "Identify a = 1, b = 3, c = −1. Write the formula.", latex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}" },
      { explanation: "Calculate the discriminant.", latex: "b^2-4ac=9-4(1)(-1)=9+4=13" },
      { explanation: "Substitute and evaluate both solutions.", latex: "x=\\frac{-3\\pm\\sqrt{13}}{2}" },
      { explanation: "Round to 2 decimal places.", latex: "x\\approx\\frac{-3+3.61}{2}\\approx0.30\\quad\\text{or}\\quad x\\approx\\frac{-3-3.61}{2}\\approx-3.30" },
    ],
    finalAnswerLatex: "x\\approx0.30\\text{ or }x\\approx-3.30",
  },
  {
    title: "Using the discriminant to count solutions",
    questionLatex: "\\text{How many real solutions does }x^2-4x+5=0\\text{ have?}",
    steps: [
      { explanation: "Calculate the discriminant: a = 1, b = −4, c = 5.", latex: "b^2-4ac=16-4(1)(5)=16-20=-4" },
      { explanation: "The discriminant is negative, so the square root does not exist over the reals.", latex: "\\Delta<0\\implies\\text{no real solutions}" },
    ],
    finalAnswerLatex: "\\text{No real solutions}",
  },
];

const quadraticFormulaGuided: PracticeQuestion[] = [
  eqAnswer("qform-g1", "For 2x² − 5x + 1 = 0, calculate the discriminant b² − 4ac.", "2x^2-5x+1=0\\;\\Rightarrow\\; b^2-4ac", "17", ["17"]),
  eqChoice("qform-g2", "Which correctly identifies a, b, c for x² − 4x + 3 = 0?", "A",
    ["$a=1,\\;b=-4,\\;c=3$", "$a=1,\\;b=4,\\;c=3$", "$a=1,\\;b=-4,\\;c=-3$", "$a=-1,\\;b=4,\\;c=3$"],
    "The coefficient of x is −4 (negative), not +4. a=1, b=−4, c=3.",
    "x^2-4x+3=0"),
  eqAnswer("qform-g3", "Use the quadratic formula to solve x² + 2x − 3 = 0. Write the larger solution.", "x^2+2x-3=0",
    "1", ["1"]),
  eqChoice("qform-g4", "Which is the correct formula substitution for 2x² + x − 1 = 0?", "A",
    ["$x=\\dfrac{-1\\pm\\sqrt{1+8}}{4}$", "$x=\\dfrac{-1\\pm\\sqrt{1-8}}{4}$", "$x=\\dfrac{1\\pm\\sqrt{1+8}}{4}$", "$x=\\dfrac{-1\\pm\\sqrt{1+8}}{2}$"],
    "a=2, b=1, c=−1. Discriminant = 1+8=9. Denominator = 2(2)=4. So x=(−1±√9)/4.",
    "2x^2+x-1=0"),
];

const quadraticFormulaIndependent: PracticeQuestion[] = [
  eqAnswer("qform-i1", "For 3x² − 5x + 1 = 0, calculate the discriminant.", "3x^2-5x+1=0\\;\\Rightarrow\\; b^2-4ac", "13", ["13"]),
  eqChoice("qform-i2", "If the discriminant of a quadratic is positive, how many real solutions does it have?", "A",
    ["2", "1", "0", "Cannot be determined without more information"],
    "A positive discriminant means the square root exists and ± gives two different values — two distinct real solutions.",
    "\\Delta>0\\implies\\text{how many solutions?}"),
  eqAnswer("qform-i3", "Use the quadratic formula to solve x² − 5x + 6 = 0. Write the larger root.", "x^2-5x+6=0", "3", ["3"]),
  eqChoice("qform-i4", "Which correctly states the discriminant of x² + 3x − 4 = 0?", "A",
    ["$b^2-4ac=9+16=25$", "$b^2-4ac=9-16=-7$", "$b^2-4ac=9+4=13$", "$b^2-4ac=3+4=7$"],
    "a=1, b=3, c=−4. b²−4ac = 9 − 4(1)(−4) = 9 + 16 = 25.",
    "x^2+3x-4=0"),
  eqAnswer("qform-i5", "A quadratic has a discriminant equal to 0. How many real solutions does it have?", "\\Delta=0\\implies\\text{number of real solutions}", "1", ["1"]),
];

const quadraticFormulaMistakes = [
  { mistake: "Assigning the wrong sign to b or c when reading the equation, e.g. writing b = 3 instead of b = −3 for x² − 3x + 2 = 0.", fix: "Copy the sign with the coefficient. For x² − 3x + 2, b = −3 and c = 2." },
  { mistake: "Forgetting the ± and computing only one solution, e.g. writing x = (−b + √Δ)/(2a) only.", fix: "The formula always gives two expressions: one with + and one with −. Both must be evaluated." },
  { mistake: "Using the wrong denominator, e.g. writing 2 instead of 2a when a ≠ 1.", fix: "The denominator is 2a, not 2. For 3x² + x − 2 = 0, the denominator is 2 × 3 = 6." },
  { mistake: "Computing b² − 4ac as (b² − 4a)c or b² − (4a + c), applying order of operations incorrectly.", fix: "Evaluate 4ac first (multiply three numbers), then subtract from b². For a=2, b=3, c=−1: 4ac = 4(2)(−1) = −8, b² − 4ac = 9 − (−8) = 17." },
];

const quadraticFormulaMastery: PracticeQuestion[] = [
  eqChoice("qform-m1", "Which correctly identifies a, b, c for 3x² − 7x + 2 = 0?", "A",
    ["$a=3,\\;b=-7,\\;c=2$", "$a=3,\\;b=7,\\;c=2$", "$a=3,\\;b=-7,\\;c=-2$", "$a=-3,\\;b=7,\\;c=2$"],
    "The coefficient of x is −7. a=3, b=−7, c=2.",
    "3x^2-7x+2=0"),
  eqAnswer("qform-m2", "What is the discriminant of 3x² − 4x − 4 = 0?", "3x^2-4x-4=0\\;\\Rightarrow\\;b^2-4ac", "64", ["64"]),
  eqChoice("qform-m3", "The discriminant of x² − 6x + 9 = 0 equals 0. What does this mean?", "B",
    ["Two different real solutions", "One repeated real solution", "No real solutions", "Cannot be determined"],
    "Δ = 0 means the formula gives x = −b/(2a) only — one solution repeated.",
    "\\Delta=0"),
  eqAnswer("qform-m4", "Use the quadratic formula to solve 2x² + x − 6 = 0. Write the larger root.", "2x^2+x-6=0", "3/2", ["3/2", "1.5"]),
  eqChoice("qform-m5", "Which is the correct formula expression for x² − 3x − 4 = 0?", "A",
    ["$x=\\dfrac{3\\pm\\sqrt{25}}{2}$", "$x=\\dfrac{-3\\pm\\sqrt{25}}{2}$", "$x=\\dfrac{3\\pm\\sqrt{-7}}{2}$", "$x=\\dfrac{-3\\pm\\sqrt{-7}}{2}$"],
    "a=1, b=−3, c=−4. −b=3, discriminant=9+16=25, denominator=2. So x=(3±5)/2.",
    "x^2-3x-4=0"),
  eqAnswer("qform-m6", "Solve x² + 4x − 5 = 0 using the formula. Write the positive solution.", "x^2+4x-5=0", "1", ["1"]),
  eqChoice("qform-m7", "A student computes the discriminant of 2x² + 3x + 4 = 0 as 9 − 32 = −23. What does this mean?", "A",
    ["The equation has no real solutions.", "The equation has two real solutions.", "The equation has one repeated solution.", "The student made an arithmetic error."],
    "Δ = b²−4ac = 9−32 = −23 < 0. A negative discriminant means no real solutions exist.",
    "2x^2+3x+4=0,\\;\\Delta=-23"),
  eqAnswer("qform-m8", "For 2x² − 7x + 3 = 0, what is the discriminant?", "2x^2-7x+3=0\\;\\Rightarrow\\;b^2-4ac", "25", ["25"]),
  eqChoice("qform-m9", "Solve 2x² − 7x + 3 = 0 using the formula. Which pair gives both solutions?", "A",
    ["$x=3$ and $x=\\tfrac{1}{2}$", "$x=3$ and $x=-\\tfrac{1}{2}$", "$x=-3$ and $x=\\tfrac{1}{2}$", "$x=\\tfrac{7}{4}$ and $x=0$"],
    "Δ=25, so x=(7±5)/4. x=12/4=3 or x=2/4=1/2.",
    "2x^2-7x+3=0"),
  eqChoice("qform-m10", "Which quadratic equation has solutions x ≈ 1.30 and x ≈ −2.30 (to 2 d.p.)?", "A",
    ["$x^2+x-3=0$", "$x^2-x-3=0$", "$x^2+x+3=0$", "$x^2-x+3=0$"],
    "For x²+x−3=0: Δ=1+12=13, x=(−1±√13)/2 ≈ 1.30 or −2.30 ✓. Option B gives ≈2.30 and −1.30.",
    "\\text{Which equation gives solutions }\\approx1.30\\text{ and }\\approx-2.30?"),
];

// ─── Lesson 4: Simultaneous Equations — Substitution ─────────────────────────

const simultaneousSubstitutionWorkedExamples: WorkedExample[] = [
  {
    title: "Substituting an expression for y",
    questionLatex: "\\text{Solve }y=x+2\\text{ and }x+y=8.",
    steps: [
      { explanation: "Substitute y = x + 2 into the second equation.", latex: "x+(x+2)=8" },
      { explanation: "Simplify and solve for x.", latex: "2x+2=8\\implies x=3" },
      { explanation: "Substitute x = 3 back into y = x + 2.", latex: "y=3+2=5" },
      { explanation: "Write the solution as a coordinate pair.", latex: "(x,y)=(3,5)" },
    ],
    finalAnswerLatex: "(3,\\,5)",
  },
  {
    title: "Both equations expressed in terms of y",
    questionLatex: "\\text{Solve }y=2x-1\\text{ and }y=x+4.",
    steps: [
      { explanation: "Both expressions equal y, so set them equal to each other.", latex: "2x-1=x+4" },
      { explanation: "Solve for x.", latex: "x=5" },
      { explanation: "Substitute into y = x + 4.", latex: "y=5+4=9" },
    ],
    finalAnswerLatex: "(5,\\,9)",
  },
  {
    title: "Rearranging before substituting",
    questionLatex: "\\text{Solve }2x+y=10\\text{ and }y=x+1.",
    steps: [
      { explanation: "y is already isolated in the second equation. Substitute into the first.", latex: "2x+(x+1)=10" },
      { explanation: "Collect and solve.", latex: "3x+1=10\\implies 3x=9\\implies x=3" },
      { explanation: "Find y.", latex: "y=3+1=4" },
    ],
    finalAnswerLatex: "(3,\\,4)",
  },
];

const simultaneousSubstitutionGuided: PracticeQuestion[] = [
  eqAnswer("sub-g1", "For y = x + 3 and 2x + y = 12: after substituting y, what value of x solves the equation?",
    "y=x+3,\\quad 2x+y=12", "3", ["3"]),
  eqChoice("sub-g2", "Which equation correctly substitutes y = 2x into x + y = 9?", "A",
    ["$x+2x=9$", "$2x+y=9$", "$x+2=9$", "$2x+2=9$"],
    "Replace y with 2x in x + y = 9 to get x + 2x = 9, which simplifies to 3x = 9.",
    "x+y=9,\\;y=2x"),
  eqAnswer("sub-g3", "Solve y = 3x − 1 and y = x + 5. What is x?", "y=3x-1,\\quad y=x+5", "3", ["3"]),
  eqChoice("sub-g4", "Which equation results from substituting y = x + 4 into x + y = 10?", "A",
    ["$2x+4=10$", "$x+4=10$", "$x+x=10$", "$x-4=10$"],
    "Replace y with (x + 4): x + (x + 4) = x + x + 4 = 2x + 4 = 10.",
    "x+y=10,\\;y=x+4"),
];

const simultaneousSubstitutionIndependent: PracticeQuestion[] = [
  eqAnswer("sub-i1", "Solve y = x + 1 and x + y = 7. Write solution as (x, y).", "y=x+1,\\quad x+y=7",
    "(3, 4)", ["(3,4)", "x=3, y=4", "x = 3, y = 4", "3, 4"]),
  eqChoice("sub-i2", "Which correctly substitutes y = 3x into 2x + y = 15?", "A",
    ["$2x+3x=15$", "$2x+3=15$", "$3(2x)=15$", "$x+3x=15$"],
    "Replace y with 3x: 2x + 3x = 5x = 15, so x = 3.",
    "2x+y=15,\\;y=3x"),
  eqAnswer("sub-i3", "Solve y = 2x + 1 and y = x + 6. What is the value of y?", "y=2x+1,\\quad y=x+6", "11", ["11"]),
  eqAnswer("sub-i4", "Solve y = x − 3 and 2x + y = 9. Write solution as (x, y).", "y=x-3,\\quad 2x+y=9",
    "(4, 1)", ["(4,1)", "x=4, y=1", "x = 4, y = 1", "4, 1"]),
  eqAnswer("sub-i5", "What is x in the solution of y = 4x and x + y = 10?", "y=4x,\\quad x+y=10", "2", ["2"]),
];

const simultaneousSubstitutionMistakes = [
  { mistake: "Substituting into the same equation the expression came from, e.g. substituting y = x + 2 back into y = x + 2.", fix: "Always substitute into the OTHER equation. Use the expression from one equation to replace y (or x) in the second equation." },
  { mistake: "Solving for one variable but stopping there, writing only x = 3 instead of (3, 5).", fix: "After finding x, substitute back to find y. A simultaneous equation solution is always a pair (x, y)." },
  { mistake: "Incorrectly expanding when substituting, e.g. writing x + (2x − 1) = x + 2x − 1 correctly but then adding terms as 3x + 1 instead of 3x − 1.", fix: "Be careful with subtraction: x + (2x − 1) = x + 2x − 1 = 3x − 1. The minus stays with the 1." },
  { mistake: "Substituting back into the wrong equation to find the second variable.", fix: "Substitute the found value of x into the simpler original equation, and then check both equations to verify the solution." },
];

const simultaneousSubstitutionMastery: PracticeQuestion[] = [
  eqAnswer("sub-m1", "For y = x + 5 and x + y = 11, what is y?", "y=x+5,\\quad x+y=11", "8", ["8"]),
  eqChoice("sub-m2", "Which correctly substitutes y = 2x − 3 into x + y = 9?", "A",
    ["$x+2x-3=9$", "$x+2x+3=9$", "$2x-3=9$", "$x-(2x-3)=9$"],
    "Replace y with (2x − 3): x + (2x − 3) = x + 2x − 3 = 3x − 3 = 9.",
    "x+y=9,\\;y=2x-3"),
  eqAnswer("sub-m3", "For y = x + 4 and 2y + x = 17, what is y?", "y=x+4,\\quad 2y+x=17", "7", ["7"]),
  eqAnswer("sub-m4", "Solve y = x − 2 and y = 2x − 7. Write solution as (x, y).", "y=x-2,\\quad y=2x-7",
    "(5, 3)", ["(5,3)", "x=5, y=3", "x = 5, y = 3", "5, 3"]),
  eqChoice("sub-m5", "After substituting y = x + 1 into x + y = 9 and solving, what is x?", "A",
    ["$x=4$", "$x=5$", "$x=3$", "$x=8$"],
    "x + (x + 1) = 9 → 2x + 1 = 9 → 2x = 8 → x = 4.",
    "y=x+1,\\quad x+y=9"),
  eqAnswer("sub-m6", "Solve y = 2x + 3 and y = x + 8. What is y?", "y=2x+3,\\quad y=x+8", "13", ["13"]),
  eqChoice("sub-m7", "The solution to y = x + 6 and 3x + y = 18 is (x, y). Which is correct?", "A",
    ["$(3,\\,9)$", "$(4,\\,10)$", "$(2,\\,8)$", "$(6,\\,12)$"],
    "3x + (x + 6) = 18 → 4x = 12 → x = 3. Then y = 3 + 6 = 9.",
    "3x+y=18,\\;y=x+6"),
  eqAnswer("sub-m8", "Solve 3x + y = 17 and y = x + 1. What is x?", "y=x+1,\\quad 3x+y=17", "4", ["4"]),
  eqAnswer("sub-m9", "Solve y = 2x − 1 and 3x − y = 7. Write solution as (x, y).", "y=2x-1,\\quad 3x-y=7",
    "(6, 11)", ["(6,11)", "x=6, y=11", "x = 6, y = 11", "6, 11"]),
  eqChoice("sub-m10", "Two simultaneous equations have solution (4, −1). Which pair is consistent with this?", "A",
    ["$y=x-5$ and $x+y=3$", "$y=x+5$ and $x+y=3$", "$y=x-5$ and $x+y=5$", "$y=x+5$ and $x+y=5$"],
    "Check A: y = 4 − 5 = −1 ✓ and x + y = 4 + (−1) = 3 ✓. Option B gives y = 9 ≠ −1.",
    "\\text{Which pair is satisfied by }(4,-1)?"),
];

// ─── Lesson 5: Simultaneous Equations — Elimination ──────────────────────────

const simultaneousEliminationWorkedExamples: WorkedExample[] = [
  {
    title: "Eliminating by adding",
    questionLatex: "\\text{Solve }x+y=9\\text{ and }x-y=3.",
    steps: [
      { explanation: "Add the two equations. The y-terms cancel.", latex: "(x+y)+(x-y)=9+3\\implies 2x=12\\implies x=6" },
      { explanation: "Substitute x = 6 into the first equation.", latex: "6+y=9\\implies y=3" },
      { explanation: "Write the solution.", latex: "(x,y)=(6,3)" },
    ],
    finalAnswerLatex: "(6,\\,3)",
  },
  {
    title: "Eliminating by subtracting",
    questionLatex: "\\text{Solve }2x+y=11\\text{ and }x+y=7.",
    steps: [
      { explanation: "The y-coefficients are equal. Subtract the second from the first.", latex: "(2x+y)-(x+y)=11-7\\implies x=4" },
      { explanation: "Substitute x = 4 into x + y = 7.", latex: "4+y=7\\implies y=3" },
    ],
    finalAnswerLatex: "(4,\\,3)",
  },
  {
    title: "Matching a coefficient before eliminating",
    questionLatex: "\\text{Solve }3x+2y=16\\text{ and }x+2y=8.",
    steps: [
      { explanation: "The y-coefficients are already equal (both 2). Subtract the second equation from the first.", latex: "(3x+2y)-(x+2y)=16-8\\implies 2x=8\\implies x=4" },
      { explanation: "Substitute x = 4 into x + 2y = 8.", latex: "4+2y=8\\implies 2y=4\\implies y=2" },
    ],
    finalAnswerLatex: "(4,\\,2)",
  },
];

const simultaneousEliminationGuided: PracticeQuestion[] = [
  eqAnswer("elim-g1", "For x + y = 8 and x − y = 2: add the two equations. What is x?", "x+y=8,\\quad x-y=2", "5", ["5"]),
  eqChoice("elim-g2", "Which operation eliminates y from 3x + y = 10 and x + y = 4?", "A",
    ["Subtract the second equation from the first", "Add the two equations", "Multiply the first by 2 then subtract", "Multiply the second by 3 then add"],
    "(3x+y) − (x+y) = 2x. The y-terms cancel when we subtract.",
    "3x+y=10\\text{ and }x+y=4"),
  eqAnswer("elim-g3", "Solve 2x + y = 9 and x + y = 6. Subtract to eliminate y. What is x?", "2x+y=9,\\quad x+y=6", "3", ["3"]),
  eqChoice("elim-g4", "Which operation correctly eliminates x from x + 2y = 7 and x + y = 5?", "A",
    ["Subtract the second equation from the first", "Add the two equations", "Multiply the first by 2 then subtract", "Divide both equations by x"],
    "(x+2y) − (x+y) = y. The x-terms cancel when we subtract, giving y = 2.",
    "x+2y=7\\text{ and }x+y=5"),
];

const simultaneousEliminationIndependent: PracticeQuestion[] = [
  eqAnswer("elim-i1", "Solve x + y = 10 and x − y = 4. Write solution as (x, y).", "x+y=10,\\quad x-y=4",
    "(7, 3)", ["(7,3)", "x=7, y=3", "x = 7, y = 3", "7, 3"]),
  eqAnswer("elim-i2", "Solve 2x + y = 13 and x + y = 8. Subtract to eliminate y. What is y?", "2x+y=13\\text{ and }x+y=8",
    "3", ["3"]),
  eqChoice("elim-i3", "Which step correctly sets up elimination for 2x + 3y = 14 and 2x + y = 6?", "A",
    ["Subtract the second from the first to eliminate x", "Add the two equations to eliminate x", "Multiply the first by 2 then subtract", "Divide both equations by 2"],
    "The x-coefficients are both 2. Subtract: (2x+3y)−(2x+y) = 2y = 8, giving y = 4.",
    "2x+3y=14\\text{ and }2x+y=6"),
  eqAnswer("elim-i4", "Solve 4x + y = 19 and 2x + y = 11. Subtract. What is x?", "4x+y=19,\\quad 2x+y=11", "4", ["4"]),
  eqAnswer("elim-i5", "Solve 3x + 2y = 20 and x + 2y = 12. Write solution as (x, y).", "3x+2y=20,\\quad x+2y=12",
    "(4, 4)", ["(4,4)", "x=4, y=4", "x = 4, y = 4", "4, 4"]),
];

const simultaneousEliminationMistakes = [
  { mistake: "Adding when the operation should be subtracting, e.g. adding 2x + y = 11 and x + y = 7 to get 3x + 2y = 18 (which does not eliminate anything).", fix: "When both equations have the same coefficient on a variable, subtract one equation from the other to cancel that term." },
  { mistake: "Subtracting inconsistently — applying subtraction to the left side but forgetting to subtract on the right, e.g. writing (2x+y)−(x+y) = 11 instead of 11−7 = 4.", fix: "Subtract the entire second equation from the entire first: left side minus left side equals right side minus right side." },
  { mistake: "Not substituting back to find the second variable after eliminating the first.", fix: "After finding x (or y), substitute into either original equation to find the other variable. The solution requires both values." },
  { mistake: "Multiplying only one term in an equation when scaling before elimination, e.g. multiplying 2 × (x + y = 7) as 2x + y = 14 instead of 2x + 2y = 14.", fix: "Multiply every term — both sides — by the chosen value. Both the x-term, the y-term, and the right-hand side must be multiplied." },
];

const simultaneousEliminationMastery: PracticeQuestion[] = [
  eqAnswer("elim-m1", "For x + y = 12 and x − y = 4, add the equations. What is x?", "x+y=12,\\quad x-y=4", "8", ["8"]),
  eqChoice("elim-m2", "To eliminate y from 3x + 2y = 10 and x + 2y = 6, which step works?", "A",
    ["Subtract the second equation from the first", "Add the two equations", "Multiply the first by 3 then subtract", "Multiply the second by 2 then add"],
    "(3x+2y)−(x+2y) = 2x = 4 → x = 2. Subtracting removes the equal y-terms.",
    "3x+2y=10\\text{ and }x+2y=6"),
  eqAnswer("elim-m3", "Solve 4x + y = 22 and x + y = 10. What is x?", "4x+y=22,\\quad x+y=10", "4", ["4"]),
  eqAnswer("elim-m4", "Solve x + y = 9 and x − y = 1. Write solution as (x, y).", "x+y=9,\\quad x-y=1",
    "(5, 4)", ["(5,4)", "x=5, y=4", "x = 5, y = 4", "5, 4"]),
  eqChoice("elim-m5", "Which is the correct solution to 2x + y = 10 and 2x − y = 6?", "A",
    ["$(4,\\,2)$", "$(4,\\,-2)$", "$(3,\\,4)$", "$(2,\\,4)$"],
    "Add: 4x = 16 → x = 4. Substitute: 8 + y = 10 → y = 2.",
    "2x+y=10\\text{ and }2x-y=6"),
  eqAnswer("elim-m6", "Solve 5x + 2y = 21 and x + 2y = 9. Subtract. What is x?", "5x+2y=21,\\quad x+2y=9", "3", ["3"]),
  eqChoice("elim-m7", "To solve 2x + 3y = 12 and 4x + 3y = 18, which step correctly eliminates y?", "A",
    ["Subtract the first equation from the second", "Add the two equations", "Multiply the first by 2 then subtract", "Divide both equations by 3"],
    "(4x+3y)−(2x+3y) = 2x = 6 → x = 3. Then 6 + 3y = 12 → y = 2.",
    "2x+3y=12\\text{ and }4x+3y=18"),
  eqAnswer("elim-m8", "For 3x + 4y = 25 and 3x + y = 13, what is y?", "3x+4y=25,\\quad 3x+y=13", "4", ["4"]),
  eqAnswer("elim-m9", "Solve 2x + 3y = 16 and 2x + y = 8. Write solution as (x, y).", "2x+3y=16,\\quad 2x+y=8",
    "(2, 4)", ["(2,4)", "x=2, y=4", "x = 2, y = 4", "2, 4"]),
  eqChoice("elim-m10", "A student correctly uses elimination and gets x = 3. Which pair of equations could they have used?", "D",
    ["$x+y=8$ and $x-y=2$", "$2x+y=10$ and $x+y=5$", "$x+2y=7$ and $x+y=4$", "$3x+y=12$ and $x+y=6$"],
    "Check D: (3x+y)−(x+y) = 2x = 6 → x = 3 ✓. Options A, B, C all give x = 5, 5, 1 respectively.",
    "\\text{Which pair gives }x=3\\text{ by elimination?}"),
];

// ─── Lesson 6: Linear Inequalities ───────────────────────────────────────────

function ineqAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const normalised = answer.replace(/\s+/g, "");
  const variants = [answer, normalised];
  // Accept >= and <= as alternatives to ≥ and ≤
  const asciiVariant = answer.replace("≥", ">=").replace("≤", "<=").replace(" ", "");
  variants.push(asciiVariant);
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([...variants, ...acceptedAnswers])),
    hint: "Solve like a linear equation, but reverse the inequality sign if you multiply or divide both sides by a negative number.",
    explanation: `Apply inverse operations step by step. Remember to flip the inequality sign when dividing by a negative. The solution is ${answer}.`,
  };
}

const linearInequalitiesWorkedExamples: WorkedExample[] = [
  {
    title: "Solving a two-step inequality — no sign reversal",
    questionLatex: "\\text{Solve }2x+3<11.",
    steps: [
      { explanation: "Subtract 3 from both sides.", latex: "2x<8" },
      { explanation: "Divide both sides by 2. The sign stays the same because 2 is positive.", latex: "x<4" },
    ],
    finalAnswerLatex: "x<4",
  },
  {
    title: "Dividing by a negative — sign reversal",
    questionLatex: "\\text{Solve }-3x\\ge 9.",
    steps: [
      { explanation: "Divide both sides by −3. The inequality sign reverses because we divide by a negative.", latex: "x\\le\\frac{9}{-3}=-3" },
    ],
    finalAnswerLatex: "x\\le -3",
  },
  {
    title: "Collecting terms first, then dealing with a negative coefficient",
    questionLatex: "\\text{Solve }4-2x>-2.",
    steps: [
      { explanation: "Subtract 4 from both sides.", latex: "-2x>-6" },
      { explanation: "Divide both sides by −2. Reverse the sign.", latex: "x<3" },
    ],
    finalAnswerLatex: "x<3",
  },
];

const linearInequalitiesGuided: PracticeQuestion[] = [
  eqChoice("ineq-g1", "Which is the correct solution to 2x + 3 < 11?", "A",
    ["$x<4$", "$x>4$", "$x\\le4$", "$x<8$"],
    "Subtract 3: 2x < 8. Divide by 2 (positive — no sign change): x < 4.",
    "2x+3<11"),
  eqChoice("ineq-g2", "When solving an inequality, in which situation must the inequality sign be reversed?", "B",
    ["When adding a positive number to both sides", "When multiplying or dividing both sides by a negative number", "When subtracting a variable term from both sides", "When the solution is a negative number"],
    "The inequality sign must be reversed only when multiplying or dividing both sides by a negative number."),
  ineqAnswer("ineq-g3", "Solve −4x > 20. Write your answer (e.g. x < −5).", "-4x>20", "x < -5", ["x<-5"]),
  eqChoice("ineq-g4", "Which is the correct solution to 3x − 2 ≥ 7?", "A",
    ["$x\\ge3$", "$x\\le3$", "$x>3$", "$x\\ge9$"],
    "Add 2: 3x ≥ 9. Divide by 3 (positive — no sign change): x ≥ 3.",
    "3x-2\\ge7"),
];

const linearInequalitiesIndependent: PracticeQuestion[] = [
  ineqAnswer("ineq-i1", "Solve 2x + 5 ≤ 13. Write your answer.", "2x+5\\le13", "x ≤ 4", ["x≤4", "x<=4"]),
  eqChoice("ineq-i2", "Which correctly solves −5x < 15?", "C",
    ["$x<-3$", "$x<3$", "$x>-3$", "$x>3$"],
    "Divide by −5. Because −5 is negative, the sign reverses from < to >. Result: x > −3.",
    "-5x<15"),
  eqChoice("ineq-i3", "Which is the correct solution to 4 − 3x > −2?", "A",
    ["$x<2$", "$x>2$", "$x<-2$", "$x<-6$"],
    "Subtract 4: −3x > −6. Divide by −3 (reverse sign): x < 2.",
    "4-3x>-2"),
  ineqAnswer("ineq-i4", "Solve 3x + 4 > 13. Write your answer.", "3x+4>13", "x > 3", ["x>3"]),
  eqChoice("ineq-i5", "Which describes the number-line graph of x < 2?", "A",
    ["Open circle at 2 with the arrow pointing to the left", "Closed circle at 2 with the arrow pointing to the left", "Open circle at 2 with the arrow pointing to the right", "Closed circle at 0 with the arrow pointing to the right"],
    "x < 2 excludes the value 2 (open circle) and includes all values less than 2 (arrow pointing left)."),
];

const linearInequalitiesMistakes = [
  { mistake: "Forgetting to reverse the inequality sign when dividing by a negative, e.g. writing −2x > 8 → x > −4 instead of x < −4.", fix: "Whenever you multiply or divide both sides by a negative number, immediately reverse the inequality sign. Add a note like 'dividing by −2, sign flips' in your working." },
  { mistake: "Using a closed circle on the number line for a strict inequality (< or >).", fix: "Strict inequalities (< and >) use an open circle because the endpoint is not included. Closed circles are for ≤ and ≥, where the endpoint is included." },
  { mistake: "Solving an inequality and getting the correct number but writing the wrong direction of the inequality, e.g. writing x > 5 instead of x < 5.", fix: "After solving, substitute a test value to verify. If x = 0 satisfies the original inequality, the solution set must contain 0. Check which side of your answer 0 falls on." },
  { mistake: "Moving a variable term to the other side without changing its sign.", fix: "When a term crosses the inequality sign, its sign changes — just as in equations. For 3 − x > 1, subtract 3: −x > −2, then divide by −1 and reverse: x < 2." },
];

const linearInequalitiesMastery: PracticeQuestion[] = [
  eqChoice("ineq-m1", "Which is the correct solution to 3x − 1 < 8?", "A",
    ["$x<3$", "$x<3.67$", "$x<9$", "$x<7$"],
    "Add 1: 3x < 9. Divide by 3: x < 3.",
    "3x-1<8"),
  ineqAnswer("ineq-m2", "Solve 5x + 2 ≥ 17. Write your answer.", "5x+2\\ge17", "x ≥ 3", ["x≥3", "x>=3"]),
  eqChoice("ineq-m3", "Which is the correct solution to −2x ≤ 8?", "A",
    ["$x\\ge-4$", "$x\\le-4$", "$x\\ge4$", "$x\\le4$"],
    "Divide both sides by −2. Reverse the sign: x ≥ 8/(−2) = −4.",
    "-2x\\le8"),
  ineqAnswer("ineq-m4", "Solve 4 − x > 9. Write your answer.", "4-x>9", "x < -5", ["x<-5"]),
  eqChoice("ineq-m5", "A student solves −3x > 6 and writes x > −2. What went wrong?", "A",
    ["Dividing by −3 requires reversing the inequality — the correct answer is x < −2", "The answer is correct", "They should subtract 3 first, not divide", "The inequality should become an equation before solving"],
    "Dividing by a negative number reverses the inequality. −3x > 6 → x < 6/(−3) = −2."),
  ineqAnswer("ineq-m6", "Solve 2(x + 1) ≤ 12. Write your answer.", "2(x+1)\\le12", "x ≤ 5", ["x≤5", "x<=5"]),
  eqChoice("ineq-m7", "Which describes the correct number-line graph of x ≥ −1?", "A",
    ["Closed circle at −1, arrow pointing to the right", "Open circle at −1, arrow pointing to the right", "Closed circle at −1, arrow pointing to the left", "Closed circle at 1, arrow pointing to the right"],
    "x ≥ −1 includes −1 (closed circle) and all values greater than −1 (arrow pointing right)."),
  ineqAnswer("ineq-m8", "Solve 5 − 3x < −1. Write your answer.", "5-3x<-1", "x > 2", ["x>2"]),
  eqChoice("ineq-m9", "Which is the correct solution to 2x − 3 > x + 4?", "A",
    ["$x>7$", "$x>1$", "$x<7$", "$x<1$"],
    "Subtract x from both sides: x − 3 > 4. Add 3: x > 7.",
    "2x-3>x+4"),
  eqChoice("ineq-m10", "Which inequality has x ≤ 3 as its solution?", "B",
    ["$2x+1\\ge7$", "$-x-1\\ge-4$", "$3x>9$", "$x+2<3$"],
    "Option B: −x − 1 ≥ −4 → −x ≥ −3 → x ≤ 3 (reverse sign when dividing by −1) ✓. Option A gives x ≥ 3, C gives x > 3, D gives x < 1.",
    "\\text{Which has solution }x\\le3?"),
];

// ─── Main override function ───────────────────────────────────────────────────

export function year10EquationsSimultaneousLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) || !["algebra-equations-linear-relationships", "quadratic-expressions-equations"].includes(unit.slug)) {
    return null;
  }

  if (lesson.slug === "solving-linear-equations") {
    return {
      description: "Solve linear equations using inverse operations, including equations with brackets and variables on both sides.",
      learningIntention: "Solve linear equations by applying inverse operations to keep both sides balanced.",
      successCriteria: [
        "Use inverse operations to isolate x in one-step and two-step equations.",
        "Collect variable terms on one side when x appears on both sides.",
        "Expand brackets before solving, or divide both sides to remove a bracket.",
        "Verify solutions by substituting back into the original equation.",
      ],
      teaching: {
        paragraphs: [
          "An equation is a balance. Any operation applied to one side must also be applied to the other side.",
          "To solve, apply inverse operations in reverse order: undo addition/subtraction first, then multiplication/division.",
          "When x appears on both sides, collect all x-terms on one side and all constants on the other.",
          "Brackets must be handled carefully — either expand first using the distributive law, or divide both sides by the coefficient before solving.",
        ],
        latexBlocks: [
          "\\text{Inverse operations: }+\\leftrightarrow-\\text{ and }\\times\\leftrightarrow\\div",
          "\\text{e.g. }2x+5=17\\implies 2x=12\\implies x=6",
          "\\text{e.g. }5x-3=2x+12\\implies 3x=15\\implies x=5",
        ],
      },
      workedExamples: solvingLinearWorkedExamples,
      guidedPractice: solvingLinearGuided,
      independentPractice: solvingLinearIndependent,
      commonMistakes: solvingLinearMistakes,
      masteryQuiz: solvingLinearMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "quadratics-by-factorising") {
    return {
      description: "Solve quadratic equations by factorising and applying the null factor law.",
      learningIntention: "Factorise quadratic equations and use the null factor law to find both solutions.",
      successCriteria: [
        "Rearrange a quadratic equation so that one side equals zero.",
        "Factorise the left-hand side as a product of two linear factors.",
        "Apply the null factor law: if AB = 0 then A = 0 or B = 0.",
        "Write both solutions and recognise when x = 0 is one of them.",
      ],
      teaching: {
        paragraphs: [
          "A quadratic equation has the form ax² + bx + c = 0. The right-hand side must be zero before factorising.",
          "The null factor law states that if a product of two factors equals zero, at least one factor must be zero.",
          "After factorising as (x + p)(x + q) = 0, set each factor to zero separately: x = −p or x = −q.",
          "Quadratic equations generally have two solutions. Always check for the case x = 0 when factorising by common factor.",
        ],
        latexBlocks: [
          "\\text{Null factor law: }AB=0\\implies A=0\\text{ or }B=0",
          "\\text{e.g. }x^2+7x+12=0\\implies(x+3)(x+4)=0\\implies x=-3\\text{ or }x=-4",
          "\\text{e.g. }2x^2-8x=0\\implies 2x(x-4)=0\\implies x=0\\text{ or }x=4",
        ],
      },
      workedExamples: quadraticsFactorisingWorkedExamples,
      guidedPractice: quadraticsFactorisingGuided,
      independentPractice: quadraticsFactorisingIndependent,
      commonMistakes: quadraticsFactorisingMistakes,
      masteryQuiz: quadraticsFactorisingMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "quadratic-formula") {
    return {
      description: "Use the quadratic formula to solve quadratic equations and interpret the discriminant.",
      learningIntention: "Apply the quadratic formula to equations that do not factorise easily and use the discriminant to determine the number of real solutions.",
      successCriteria: [
        "Identify a, b and c correctly, including their signs.",
        "Calculate the discriminant b² − 4ac and interpret its sign.",
        "Substitute into the quadratic formula and evaluate both solutions.",
        "Round solutions to a given number of decimal places when exact values are irrational.",
      ],
      teaching: {
        paragraphs: [
          "The quadratic formula works for any quadratic equation ax² + bx + c = 0, even when factorising is difficult.",
          "The discriminant Δ = b² − 4ac tells you how many real solutions exist: if Δ > 0 there are two, if Δ = 0 there is one (repeated), and if Δ < 0 there are none.",
          "Always identify a, b and c with their signs before substituting. For example, in 2x² − 3x − 5 = 0: a = 2, b = −3, c = −5.",
          "Evaluate the ± separately to find both solutions. The denominator is 2a, not just 2.",
        ],
        latexBlocks: [
          "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
          "\\Delta=b^2-4ac:\\quad\\Delta>0\\text{ (two solutions)},\\quad\\Delta=0\\text{ (one)},\\quad\\Delta<0\\text{ (none)}",
          "\\text{e.g. }x^2+3x-1=0:\\quad x=\\frac{-3\\pm\\sqrt{13}}{2}\\approx0.30\\text{ or }-3.30",
        ],
      },
      workedExamples: quadraticFormulaWorkedExamples,
      guidedPractice: quadraticFormulaGuided,
      independentPractice: quadraticFormulaIndependent,
      commonMistakes: quadraticFormulaMistakes,
      masteryQuiz: quadraticFormulaMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "simultaneous-substitution") {
    return {
      description: "Solve pairs of simultaneous equations by substituting one expression into the other equation.",
      learningIntention: "Use the substitution method to solve simultaneous equations and write the solution as a coordinate pair.",
      successCriteria: [
        "Identify which equation has a variable already isolated (or isolate one).",
        "Substitute the expression into the other equation and solve.",
        "Substitute the found value back to determine the second variable.",
        "Write the solution as an ordered pair (x, y) and verify in both equations.",
      ],
      teaching: {
        paragraphs: [
          "Simultaneous equations are two equations that must both be true at the same time. The solution is the single (x, y) pair that satisfies both.",
          "Substitution works best when one equation already expresses y (or x) in terms of the other variable.",
          "Replace y in the second equation with the expression from the first. This creates a one-variable equation you can solve.",
          "After finding x, always substitute back to find y. The answer is a pair — not just one number.",
        ],
        latexBlocks: [
          "\\text{If }y=x+2\\text{ and }x+y=8:\\quad x+(x+2)=8\\implies x=3,\\;y=5",
          "\\text{Solution: }(x,y)=(3,5)\\text{ — check both equations before finishing.}",
        ],
      },
      workedExamples: simultaneousSubstitutionWorkedExamples,
      guidedPractice: simultaneousSubstitutionGuided,
      independentPractice: simultaneousSubstitutionIndependent,
      commonMistakes: simultaneousSubstitutionMistakes,
      masteryQuiz: simultaneousSubstitutionMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "linear-inequalities") {
    return {
      description: "Solve linear inequalities, represent solutions on a number line, and apply the sign-reversal rule when dividing by a negative.",
      learningIntention: "Solve linear inequalities and represent their solution sets correctly on a number line.",
      successCriteria: [
        "Apply inverse operations to isolate the variable in a linear inequality.",
        "Reverse the inequality sign when multiplying or dividing by a negative number.",
        "Represent the solution on a number line using open (< or >) or closed (≤ or ≥) circles.",
        "Verify a solution by substituting a test value from the solution set.",
      ],
      teaching: {
        paragraphs: [
          "A linear inequality is solved using the same inverse operations as a linear equation, with one extra rule.",
          "When you multiply or divide both sides by a negative number, the direction of the inequality sign reverses. For example, −2x > 6 becomes x < −3.",
          "The solution is a range of values. Represent it on a number line with an open circle (○) for strict inequalities < or >, and a closed circle (●) for ≤ or ≥.",
          "Check by substituting a test value from your solution set back into the original inequality.",
        ],
        latexBlocks: [
          "\\text{Solving like an equation — but FLIP the sign when }\\div\\text{ or }\\times\\text{ by a negative}",
          "\\text{e.g. }-3x\\ge9\\implies x\\le-3\\quad\\text{(sign reversed)}",
          "\\text{Number line: }\\circ\\text{ for }<\\text{ or }>\\;\\quad \\bullet\\text{ for }\\le\\text{ or }\\ge",
        ],
      },
      workedExamples: linearInequalitiesWorkedExamples,
      guidedPractice: linearInequalitiesGuided,
      independentPractice: linearInequalitiesIndependent,
      commonMistakes: linearInequalitiesMistakes,
      masteryQuiz: linearInequalitiesMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "simultaneous-elimination") {
    return {
      description: "Solve pairs of simultaneous equations by adding or subtracting equations to eliminate one variable.",
      learningIntention: "Use the elimination method to solve simultaneous equations by choosing the correct operation to cancel a variable.",
      successCriteria: [
        "Identify which variable has equal or opposite coefficients in both equations.",
        "Add or subtract the equations to eliminate that variable.",
        "Solve the resulting single-variable equation and substitute back.",
        "Recognise when to multiply one equation before eliminating.",
      ],
      teaching: {
        paragraphs: [
          "The elimination method removes one variable by combining the two equations. If the coefficients on a variable match, subtract one equation from the other. If they are equal but opposite, add.",
          "Choose to eliminate whichever variable has equal coefficients in both equations — this avoids fractions.",
          "When no coefficients match, multiply one (or both) equations to create a match before eliminating.",
          "After finding one variable, substitute its value into either original equation to find the other. Write the final answer as (x, y).",
        ],
        latexBlocks: [
          "\\text{Add: }(x+y=9)+(x-y=3)\\implies 2x=12\\implies x=6,\\;y=3",
          "\\text{Subtract: }(2x+y=11)-(x+y=7)\\implies x=4,\\;y=3",
          "\\text{If coefficients differ, multiply first to match before eliminating.}",
        ],
      },
      workedExamples: simultaneousEliminationWorkedExamples,
      guidedPractice: simultaneousEliminationGuided,
      independentPractice: simultaneousEliminationIndependent,
      commonMistakes: simultaneousEliminationMistakes,
      masteryQuiz: simultaneousEliminationMastery,
      masteryPassMark: 0.8,
    };
  }

  return null;
}
