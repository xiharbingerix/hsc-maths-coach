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

function auditedEqAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...eqAnswer(id, prompt, latex, answer, acceptedAnswers),
    difficulty,
    explanation,
    hint,
  };
}

function auditedEqChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: 1 | 2 | 3 | 4 | 5,
  explanation: string,
  hint: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    ...eqChoice(id, prompt, answer, choices, explanation, latex),
    difficulty,
    hint,
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
  auditedEqAnswer("lin-g1", "Solve $x+9=22$.", "x+9=22", "13", 1,
    "Subtract 9 from both sides: $x+9-9=22-9$, so $x=13$. Substitution gives $13+9=22$, confirming the solution.",
    "Undo the addition of 9 while keeping both sides balanced.", ["x=13"]),
  auditedEqChoice("lin-g2", "Which step correctly begins solving $2x+5=17$?", "A",
    ["Subtract 5 from both sides", "Add 5 to both sides", "Divide both sides by 2", "Multiply both sides by 2"],
    1, "The outer operation on $2x$ is adding 5, so undo it first: $2x+5-5=17-5$, giving $2x=12$.",
    "Identify the operation applied after multiplication by 2."),
  auditedEqAnswer("lin-g3", "Solve $-4x=28$.", "-4x=28", "-7", 2,
    "Divide both sides by $-4$: $x=28\\div(-4)=-7$. Checking gives $-4(-7)=28$.",
    "The coefficient of x is negative; divide by the complete coefficient.", ["x=-7"]),
  auditedEqChoice("lin-g4", "What is the solution to $5x-3=2x+12$?", "B",
    ["$x=3$", "$x=5$", "$x=9$", "$x=15$"],
    2, "Subtract $2x$ and add 3 on both sides: $3x=15$. Dividing by 3 gives $x=5$; both original sides then equal 22.",
    "Bring variable terms to one side and constants to the other.", "5x-3=2x+12"),
];

const solvingLinearIndependent: PracticeQuestion[] = [
  auditedEqAnswer("lin-i1", "Solve $3x-7=-19$.", "3x-7=-19", "-4", 2,
    "Add 7 to both sides to obtain $3x=-12$, then divide by 3: $x=-4$. The check $3(-4)-7=-19$ is true.",
    "Undo subtraction before dividing by the coefficient.", ["x=-4"]),
  auditedEqChoice("lin-i2", "Which equation is equivalent to $3(2x-5)=21$ after one valid balancing step?", "C",
    ["$6x-5=21$", "$2x-5=18$", "$2x-5=7$", "$6x-15=7$"],
    2, "Dividing the whole equation by 3 gives $2x-5=7$. Option A fails to distribute 3 to $-5$; B and D change only part of the equation.",
    "Apply one operation to both complete sides, not to selected terms.", "3(2x-5)=21"),
  auditedEqAnswer("lin-i3", "Solve $4(x-2)=2x+10$.", "4(x-2)=2x+10", "9", 3,
    "Expand to get $4x-8=2x+10$. Subtract $2x$ and add 8: $2x=18$, so $x=9$. Both sides equal 28 when checked.",
    "Expand first, then collect variable terms and constants on opposite sides.", ["x=9"]),
  auditedEqChoice("lin-i4", "A student changes $5-2(x+3)=3x$ into $5-2x+6=3x$. Which diagnosis is correct?", "B",
    ["They should multiply 5 by -2", "They distributed -2 incorrectly; the constant term should be -6", "They should change 3x to -3x", "Their expansion is correct"],
    3, "The factor $-2$ multiplies both terms: $-2(x+3)=-2x-6$. The valid equation is $5-2x-6=3x$, not $5-2x+6=3x$.",
    "Track the negative factor across every term in the bracket."),
  auditedEqChoice("lin-i5", "Plan A costs $12+3n$ dollars and Plan B costs $24+2n$ dollars for $n$ sessions. Which option gives the break-even number and the cheaper plan for fewer sessions?", "D",
    ["6 sessions; Plan B", "10 sessions; Plan A", "12 sessions; Plan B", "12 sessions; Plan A"],
    3, "Set the costs equal: $12+3n=24+2n$, so $n=12$. At $n=0$, Plan A costs $12$ and Plan B costs $24$, so Plan A is cheaper below break-even.",
    "Find the intersection, then test a value below it to interpret which plan is cheaper."),
];

const solvingLinearMistakes = [
  { mistake: "Performing an operation on only one side, e.g. writing 2x + 5 = 17 then 2x = 17 (forgetting to subtract 5 from the right).", fix: "Whatever you do to one side must be done to the other. Subtract 5 from both sides: 2x = 12." },
  { mistake: "Moving a term to the other side without changing its sign, e.g. writing 5x = 2x + 12 then 5x + 2x = 12.", fix: "When a term crosses the equals sign, its sign changes. Subtract 2x from both sides: 3x = 12." },
  { mistake: "Not dividing all terms by the coefficient, e.g. from 3x = 15 writing x = 15 instead of x = 5.", fix: "Divide every term on both sides by the coefficient of x. 3x = 15 → x = 15 ÷ 3 = 5." },
  { mistake: "Forgetting to expand brackets before solving, e.g. from 3(x − 2) = 15 immediately dividing only the 3, leaving − 2 undivided.", fix: "Either expand first (3x − 6 = 15) or divide the entire right-hand side by 3 (x − 2 = 5). Both give x = 7." },
];

const solvingLinearMastery: PracticeQuestion[] = [
  auditedEqAnswer("lin-m1", "Solve $7-3x=25$.", "7-3x=25", "-6", 2,
    "Subtract 7 to obtain $-3x=18$, then divide by $-3$: $x=-6$. Checking gives $7-3(-6)=25$.",
    "Isolate the negative x-term before dividing.", ["x=-6"]),
  auditedEqAnswer("lin-m2", "Three consecutive integers have sum 72. Find the middle integer.", "(x-1)+x+(x+1)=72", "24", 3,
    "Represent the integers as $x-1,x,x+1$. Their sum is $3x=72$, so $x=24$; the integers $23,24,25$ total 72.",
    "Represent consecutive integers relative to the middle one.", ["x=24"]),
  auditedEqAnswer("lin-m3", "Solve $\\dfrac{2x-3}{5}=\\dfrac{x+4}{3}$.", "\\frac{2x-3}{5}=\\frac{x+4}{3}", "29", 3,
    "Multiply by 15: $3(2x-3)=5(x+4)$. Expanding gives $6x-9=5x+20$, hence $x=29$. Substitution makes both sides 11.",
    "Clear both denominators with 15 before expanding.", ["x=29"]),
  auditedEqChoice("lin-m4", "Classify $4(x-2)=4x-8$.", "C",
    ["One solution: $x=0$", "No solution", "Infinitely many solutions", "One solution: $x=2$"],
    3, "Expanding the left side gives $4x-8=4x-8$, an identity true for every real $x$. Therefore the equation has infinitely many solutions.",
    "Simplify both sides completely and see what remains."),
  auditedEqChoice("lin-m5", "A theatre charges a $90 booking fee plus $14 per ticket. Another charges no fee but $20 per ticket. Which statement is correct?", "B",
    ["They cost the same at 10 tickets; the first is cheaper above 10", "They cost the same at 15 tickets; the first is cheaper above 15", "They cost the same at 15 tickets; the second is cheaper above 15", "They never cost the same"],
    4, "Solve $90+14t=20t$: $90=6t$, so $t=15$. Beyond 15 tickets, the smaller per-ticket rate makes the first theatre cheaper.",
    "Model both total costs, solve their equality, then interpret the rates."),
  auditedEqAnswer("lin-m6", "Find $k$ so that $3(x-2)+k=2x+7$ has solution $x=5$.", "3(x-2)+k=2x+7,\\quad x=5", "8", 4,
    "Substitute the required solution: $3(5-2)+k=2(5)+7$. Thus $9+k=17$, so $k=8$. The resulting equation solves back to $x=5$.",
    "A required solution must make the original left and right sides equal.", ["k=8"]),
  auditedEqChoice("lin-m7", "A student solves $2(3x-4)=5x+7$ as shown: $6x-4=5x+7$, then $x=11$. What is the first error?", "A",
    ["The -4 should also be multiplied by 2", "The 5x should be moved without changing sign", "The 7 should be divided by 2 first", "There is no error"],
    4, "Distribution must reach both bracket terms: $2(3x-4)=6x-8$, not $6x-4$. The correct equation gives $6x-8=5x+7$, so $x=15$.",
    "Check the earliest line against the distributive law."),
  auditedEqChoice("lin-m8", "A rectangle has perimeter 70 cm. Its length is 5 cm more than twice its width. Which option gives its dimensions?", "D",
    ["11 cm by 24 cm", "12 cm by 23 cm", "15 cm by 20 cm", "10 cm by 25 cm"],
    4, "Let width be $w$ and length $2w+5$. Then $2[w+(2w+5)]=70$, so $6w+10=70$ and $w=10$; the length is 25 cm.",
    "Translate the perimeter and length conditions into one equation."),
  auditedEqChoice("lin-m9", "Classify $(a-2)x=3a-6$ for every real value of $a$.", "A",
    ["If $a\\ne2$, $x=3$; if $a=2$, every real x is a solution", "The only solution is $x=3$ for every a", "If $a\\ne2$, $x=3$; if $a=2$, there is no solution", "If $a\\ne2$, every real x is a solution; if $a=2$, $x=3$"],
    5, "Factor the right side: $(a-2)x=3(a-2)$. If $a\\ne2$, division gives $x=3$. If $a=2$, the equation becomes $0=0$, so every real x is a solution.",
    "Do not divide by a-2 until you have handled the case where it is zero."),
  auditedEqChoice("lin-m10", "The identity $p(x-3)=px+q$ holds for every real $x$, and $p+q=-8$. Find $(p,q)$.", "B",
    ["$p=0,q=-3$", "$p=4,q=-12$", "$p=4,q=12$", "$p=-4,q=-3$"],
    5, "The identity gives $q=-3p$. Combining this with $p+q=-8$ gives $p-3p=-8$, so $p=4$ and then $q=-12$.",
    "Use the identity to create one parameter relation, then combine it with the second condition."),
];

const solvingLinearMultiPart: PracticeQuestion[] = [
  {
    id: "lin-mp-d6-1",
    prompt:
      "A 240-seat school concert sells standard tickets for $18 and concession tickets for $12. Exactly 60 concession tickets are sold. Fixed costs are $1680, plus $3 per attendee. Let $n$ be the total attendance.",
    latex: "",
    answer: "90%",
    hint:
      "Express standard-ticket sales as n−60, form profit as revenue minus cost, then use the required profit and capacity.",
    explanation:
      "Revenue is $18(n-60)+12(60)=18n-360$ and cost is $1680+3n$, so profit is $P=15n-2040$. Break-even is $n=136$. For at least $1200 profit, $15n-2040\\ge1200$, giving $n\\ge216$. This is within the 240-seat capacity, and $216/240=90\\%$.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Write the profit $P$ as a simplified linear expression in $n$.",
        latex: "",
        marks: 3,
        answer: "15n-2040",
        acceptedAnswers: ["P=15n-2040", "P = 15n - 2040", "15n − 2040"],
        hint: "Revenue is standard-ticket revenue plus concession-ticket revenue; subtract both cost components.",
        explanation:
          "There are $n-60$ standard tickets. Revenue is $18(n-60)+12(60)=18n-360$. Costs are $1680+3n$, so $P=(18n-360)-(1680+3n)=15n-2040$.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Use your model to find the break-even attendance.",
        latex: "",
        marks: 2,
        answer: "136",
        acceptedAnswers: ["136 attendees", "n=136", "n = 136"],
        hint: "Break-even means profit equals zero.",
        explanation:
          "Set $P=0$: $15n-2040=0$, so $15n=2040$ and $n=136$ attendees.",
      },
      {
        key: "c",
        label: "(c)",
        prompt:
          "The concert must make at least $1200 profit. Find the least whole-number attendance that meets this requirement.",
        latex: "",
        marks: 3,
        answer: "216",
        acceptedAnswers: ["216 attendees", "n=216", "n = 216"],
        hint: "Replace break-even by the inequality P≥1200 and interpret the capacity constraint.",
        explanation:
          "$15n-2040\\ge1200$ gives $15n\\ge3240$, hence $n\\ge216$. Attendance is whole-numbered and 216 is below the 240-seat capacity, so the least feasible attendance is 216.",
      },
      {
        key: "d",
        label: "(d)",
        prompt: "At the attendance from part (c), what percentage of seats are occupied?",
        latex: "",
        marks: 2,
        answer: "90%",
        acceptedAnswers: ["90", "0.9", "90 percent"],
        hint: "Divide the attendance from part (c) by 240 and convert to a percentage.",
        explanation:
          "The occupied fraction is $216/240=0.9$, so $0.9\\times100\\%=90\\%$ of the seats are occupied.",
      },
    ],
  },
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

function auditedIneqAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...ineqAnswer(id, prompt, latex, answer, acceptedAnswers),
    difficulty,
    explanation,
    hint,
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
  auditedEqChoice("ineq-g1", "Which is the correct solution to $2x+3<11$?", "A",
    ["$x<4$", "$x>4$", "$x\\le4$", "$x<8$"],
    1, "Subtract 3 to get $2x<8$, then divide by positive 2, so the direction stays unchanged: $x<4$.",
    "Positive division preserves the inequality direction.", "2x+3<11"),
  auditedEqChoice("ineq-g2", "When must the direction of an inequality be reversed?", "B",
    ["When adding a positive number to both sides", "When multiplying or dividing both sides by a negative number", "When subtracting a variable term from both sides", "When the solution is a negative number"],
    1, "Only multiplication or division by a negative reverses order. Adding or subtracting the same amount preserves the order, even when the result is negative.",
    "Think about how multiplying two ordered numbers by -1 swaps their positions."),
  auditedIneqAnswer("ineq-g3", "Solve $-4x>20$.", "-4x>20", "x < -5", 2,
    "Divide both sides by $-4$. Because the divisor is negative, reverse $>$ to $<$: $x<20/(-4)=-5$.",
    "Divide by the negative coefficient and reverse the sign.", ["x<-5"]),
  auditedEqChoice("ineq-g4", "Which description matches $x\\ge3$?", "C",
    ["Open endpoint at 3, values to the right", "Closed endpoint at 3, values to the left", "Closed endpoint at 3, values to the right", "Open endpoint at -3, values to the right"],
    2, "The symbol $\\ge$ includes 3, so the endpoint is closed. Greater values lie to the right, giving a closed endpoint at 3 with shading right.",
    "Separate endpoint inclusion from the direction of the solution set."),
];

const linearInequalitiesIndependent: PracticeQuestion[] = [
  auditedIneqAnswer("ineq-i1", "Solve $3(x-2)\\le15$.", "3(x-2)\\le15", "x ≤ 7", 2,
    "Divide by positive 3 to get $x-2\\le5$, then add 2: $x\\le7$. No reversal occurs because the divisor is positive.",
    "Remove the positive outer factor before isolating x.", ["x≤7", "x<=7"]),
  auditedEqChoice("ineq-i2", "Which correctly solves $-5x<15$?", "C",
    ["$x<-3$", "$x<3$", "$x>-3$", "$x>3$"],
    2, "Dividing by $-5$ reverses the sign: $x>15/(-5)=-3$. Option A is the common no-reversal error.",
    "A negative divisor reverses the order.", "-5x<15"),
  auditedIneqAnswer("ineq-i3", "Solve $4x-7>2x+9$.", "4x-7>2x+9", "x > 8", 3,
    "Subtract $2x$ to get $2x-7>9$, then add 7: $2x>16$. Dividing by positive 2 gives $x>8$.",
    "Collect variable terms first; track whether any negative division occurs.", ["x>8"]),
  auditedEqChoice("ineq-i4", "A student claims $2-3x\\ge11$ gives $x\\ge-3$. Which check most directly disproves the claim?", "D",
    ["Substitute $x=-3$; the statement is true", "Substitute $x=0$; the statement is false", "Add 3 to both sides", "Substitute $x=1$; it satisfies $x\\ge-3$ but makes the original inequality false"],
    3, "The claimed set includes $x=1$, but $2-3(1)=-1$ is not at least 11. Correctly solving gives $-3x\\ge9$, hence $x\\le-3$.",
    "Test a value admitted by the claimed solution, not just its endpoint."),
  auditedEqChoice("ineq-i5", "A ride has a minimum height of 140 cm. Sam is 132 cm tall and grows $g$ cm. Which inequality and conclusion are correct?", "B",
    ["$132+g>140$, so $g>8$", "$132+g\\ge140$, so $g\\ge8$", "$132g\\ge140$, so $g\\ge8/132$", "$132+g\\le140$, so $g\\le8$"],
    3, "A minimum includes the boundary, so $132+g\\ge140$. Subtracting 132 gives $g\\ge8$ cm.",
    "Translate 'minimum' with an inclusive inequality before solving."),
];

const linearInequalitiesMistakes = [
  { mistake: "Forgetting to reverse the inequality sign when dividing by a negative, e.g. writing −2x > 8 → x > −4 instead of x < −4.", fix: "Whenever you multiply or divide both sides by a negative number, immediately reverse the inequality sign. Add a note like 'dividing by −2, sign flips' in your working." },
  { mistake: "Using a closed circle on the number line for a strict inequality (< or >).", fix: "Strict inequalities (< and >) use an open circle because the endpoint is not included. Closed circles are for ≤ and ≥, where the endpoint is included." },
  { mistake: "Solving an inequality and getting the correct number but writing the wrong direction of the inequality, e.g. writing x > 5 instead of x < 5.", fix: "After solving, substitute a test value to verify. If x = 0 satisfies the original inequality, the solution set must contain 0. Check which side of your answer 0 falls on." },
  { mistake: "Moving a variable term to the other side without changing its sign.", fix: "When a term crosses the inequality sign, its sign changes — just as in equations. For 3 − x > 1, subtract 3: −x > −2, then divide by −1 and reverse: x < 2." },
];

const linearInequalitiesMastery: PracticeQuestion[] = [
  auditedIneqAnswer("ineq-m1", "Solve $5-2x<-9$.", "5-2x<-9", "x > 7", 2,
    "Subtract 5: $-2x<-14$. Divide by $-2$ and reverse the sign to obtain $x>7$.",
    "Isolate the negative x-term, then reverse on division.", ["x>7"]),
  auditedEqChoice("ineq-m2", "An integer $n$ satisfies $3n+2<20$. What is the greatest possible value of $n$?", "A",
    ["5", "6", "17", "18"],
    3, "Solving gives $3n<18$, so $n<6$. Because $n$ is an integer and 6 is excluded, its greatest possible value is 5.",
    "Solve the inequality, then apply the integer constraint."),
  auditedEqChoice("ineq-m3", "A student solves $6-2x\\le14$ by writing $-2x\\le8$, then $x\\le-4$. What is the first incorrect step or conclusion?", "C",
    ["Subtracting 6", "Obtaining $-2x\\le8$", "Failing to reverse the sign when dividing by -2", "Using an inclusive inequality"],
    3, "The line $-2x\\le8$ is correct. Dividing by $-2$ must reverse $\\le$ to $\\ge$, giving $x\\ge-4$.",
    "Locate the first transition that involves a negative divisor."),
  auditedEqChoice("ineq-m4", "Which inequality has a closed endpoint at $-2$ and includes all values to its left?", "B",
    ["$x<-2$", "$x\\le-2$", "$x\\ge-2$", "$x>-2$"],
    3, "A closed endpoint means equality is included, and values to the left are smaller. Therefore the symbolic form is $x\\le-2$.",
    "Decode endpoint inclusion and direction separately."),
  auditedEqChoice("ineq-m5", "A club has $420 to spend. Venue hire is $135 and each meal costs $19. What is the greatest whole number of meals it can buy without exceeding the budget?", "B",
    ["14", "15", "16", "17"],
    4, "Model $135+19m\\le420$. Then $19m\\le285$, so $m\\le15$. The greatest whole number is 15; 16 meals would cost $439$.",
    "Use an inclusive budget inequality, then interpret the whole-number result."),
  auditedEqChoice("ineq-m6", "Plan A costs $18+4n$ and Plan B costs $42+2n$. For which whole-number values of $n$ is Plan A strictly cheaper?", "A",
    ["$n<12$", "$n\\le12$", "$n>12$", "$n\\ge12$"],
    4, "Solve $18+4n<42+2n$: $2n<24$, so $n<12$. At $n=12$ the plans are equal, so the endpoint is excluded.",
    "Translate 'strictly cheaper' with < and preserve the strict endpoint."),
  auditedEqAnswer("ineq-m7", "Find $k$ so that $x=4$ is the boundary value of $3x+k\\le20$.", "3x+k\\le20,\\quad x=4", "8", 4,
    "A boundary value makes the corresponding equation true: $3(4)+k=20$. Thus $12+k=20$ and $k=8$; the solution is then $x\\le4$.",
    "Replace the boundary inequality by equality and substitute the given x-value.", ["k=8"]),
  auditedIneqAnswer("ineq-m8", "Solve $\\dfrac{3-2x}{5}>\\dfrac{x+1}{2}$.", "\\frac{3-2x}{5}>\\frac{x+1}{2}", "x < 1/9", 4,
    "Multiply by positive 10, so the sign stays: $2(3-2x)>5(x+1)$. Then $6-4x>5x+5$, so $1>9x$ and $x<1/9$.",
    "Clear denominators with a positive LCD, expand, and collect x-terms.", ["x<1/9", "x < 0.1111111111"]),
  auditedEqChoice("ineq-m9", "For which values of $a$ does $ax>6$ have the solution $x<6/a$?", "B",
    ["$a>0$", "$a<0$", "$a=0$", "All real $a$"],
    4, "Dividing by $a$ produces $x<6/a$ only when $a<0$, because negative division reverses $>$. For $a>0$ the solution is $x>6/a$; for $a=0$ there is no solution.",
    "The direction after division depends on the sign of the parameter."),
  auditedEqChoice("ineq-m10", "Classify the solutions of $(a-1)x<a-1$ for all possible real $a$.", "D",
    ["Always $x<1$", "$x<1$ if $a>1$, otherwise $x>1$", "$x<1$ if $a>1$, otherwise no solution", "$x<1$ if $a>1$; $x>1$ if $a<1$; no solution if $a=1$"],
    5, "If $a-1>0$, division keeps the sign and gives $x<1$. If $a-1<0$, it reverses to $x>1$. If $a=1$, the statement is $0<0$, which is false, so there is no solution.",
    "Split into positive, negative, and zero cases for the coefficient."),
];

const linearInequalitiesMultiPart: PracticeQuestion[] = [
  {
    id: "ineq-mp-d6-1",
    prompt:
      "A courier van can carry at most 1200 kg. Fixed equipment weighs 360 kg. Each crate weighs 42 kg and earns $310, while the delivery has a fixed operating cost of $900. Let $n$ be the number of crates.",
    latex: "",
    answer: "19",
    hint:
      "Build separate capacity and net-proceeds inequalities, combine their integer solutions, then revisit capacity after the percentage mass increase.",
    explanation:
      "Capacity gives $360+42n\\le1200$, so $n\\le20$. Net proceeds of at least $3750$ give $310n-900\\ge3750$, so $n\\ge15$. Thus $15\\le n\\le20$. Maximum proceeds occur at $n=20$ and equal $5300$. After a 5% mass increase, each crate is 44.1 kg and capacity gives $n\\le840/44.1\\approx19.05$, so at most 19 whole crates fit.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Use the mass limit to find the greatest possible whole-number value of $n$.",
        latex: "",
        marks: 2,
        answer: "20",
        acceptedAnswers: ["20 crates", "n=20", "n = 20"],
        hint: "Equipment mass plus crate mass cannot exceed 1200 kg.",
        explanation:
          "$360+42n\\le1200$ gives $42n\\le840$, so $n\\le20$. Therefore at most 20 whole crates fit.",
      },
      {
        key: "b",
        label: "(b)",
        prompt:
          "The delivery must earn net proceeds of at least $3750$. Combine this with part (a) to state the feasible integer range for $n$.",
        latex: "",
        marks: 3,
        answer: "15≤n≤20",
        acceptedAnswers: ["15 <= n <= 20", "15≤n≤20, n integer", "15 to 20 crates"],
        hint: "Net proceeds are 310n−900; solve its inequality and intersect it with the capacity range.",
        explanation:
          "$310n-900\\ge3750$ gives $310n\\ge4650$, so $n\\ge15$. Combining this with $n\\le20$ from part (a) gives $15\\le n\\le20$ for integer $n$.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the maximum net proceeds over the feasible range from part (b).",
        latex: "",
        marks: 2,
        answer: "5300",
        acceptedAnswers: ["$5300", "5300 dollars"],
        hint: "The proceeds expression increases with n, so use the largest feasible value.",
        explanation:
          "Because $310n-900$ increases as $n$ increases, use $n=20$. The maximum net proceeds are $310(20)-900=5300$ dollars.",
      },
      {
        key: "d",
        label: "(d)",
        prompt:
          "A packaging change increases each crate's mass by 5%, while the equipment and van limit stay unchanged. Find the new maximum whole number of crates.",
        latex: "",
        marks: 3,
        answer: "19",
        acceptedAnswers: ["19 crates", "n=19", "n = 19"],
        hint: "Increase 42 kg by 5%, then solve the revised capacity inequality and round down.",
        explanation:
          "The new crate mass is $42(1.05)=44.1$ kg. Then $360+44.1n\\le1200$, so $n\\le840/44.1\\approx19.05$. The largest whole number that does not exceed this is 19.",
      },
    ],
  },
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
      multiPartPractice: solvingLinearMultiPart,
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
      multiPartPractice: linearInequalitiesMultiPart,
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
