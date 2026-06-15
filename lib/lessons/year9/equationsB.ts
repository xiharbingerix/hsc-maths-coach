import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const autoVariants: string[] = [];

  if (/^-?\d{4,}$/.test(ans)) {
    autoVariants.push(ans.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }
  if (/^-?\d+$/.test(ans)) {
    autoVariants.push(`${ans}.0`);
  }
  if (/^-?\d*\.\d+$/.test(ans)) {
    autoVariants.push(`${ans}0`);
  }
  if (/^0\./.test(ans)) {
    autoVariants.push(ans.slice(1));
  }

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants])),
    hint: "Use the equation-solving techniques taught in this lesson carefully.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key rule taught in this lesson before choosing.",
    explanation,
  };
}

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
>;

// ─── Lesson 1: Solving Monic Quadratic Equations by Factorising ───────────────

const quadraticEquationsFactorise: LessonContent = {
  description: "Solve monic quadratic equations of the form x² + bx + c = 0 by factorising into two brackets and applying the null factor law.",
  learningIntention: "Factorise and solve monic quadratic equations of the form x² + bx + c = 0 using the null factor law.",
  successCriteria: [
    "Identify the two numbers p and q such that p + q = b and p × q = c.",
    "Write the equation in factorised form (x + p)(x + q) = 0.",
    "Apply the null factor law to find both solutions.",
    "Verify both solutions by substituting back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "A monic quadratic has leading coefficient 1: x² + bx + c = 0. Factorising means finding two numbers p and q such that p + q = b and p × q = c, giving (x + p)(x + q) = 0.",
      "The null factor law states: if AB = 0, then A = 0 or B = 0. Once the quadratic is factorised, each bracket is set equal to zero to give one solution each.",
      "Always check your answers by substituting both solutions back into the original equation. This confirms that no arithmetic errors were made in the factorising step.",
      "A common mistake is forgetting that there are TWO solutions. If x² − 5x + 6 = 0 factors as (x − 2)(x − 3) = 0, both x = 2 and x = 3 are solutions — not just one of them.",
    ],
    latexBlocks: [
      "x^2 + bx + c = 0 \\rightarrow (x+p)(x+q)=0",
      "p+q=b,\\quad p\\times q=c",
      "x+p=0 \\;\\text{or}\\; x+q=0",
    ],
  },
  workedExamples: [
    {
      title: "Basic monic quadratic",
      questionLatex: "\\text{Solve }x^2 - 5x + 6 = 0.",
      steps: [
        { explanation: "Find two numbers that multiply to 6 and add to −5: those are −2 and −3.", latex: "p \\times q = 6,\\quad p + q = -5 \\implies p=-2,\\;q=-3" },
        { explanation: "Write in factorised form.", latex: "(x-2)(x-3)=0" },
        { explanation: "Apply the null factor law: set each bracket to zero.", latex: "x-2=0 \\implies x=2 \\quad\\text{or}\\quad x-3=0 \\implies x=3" },
      ],
      finalAnswerLatex: "x = 2 \\text{ or } x = 3",
    },
    {
      title: "Quadratic with mixed signs",
      questionLatex: "\\text{Solve }x^2 + 3x - 10 = 0.",
      steps: [
        { explanation: "Find two numbers that multiply to −10 and add to 3: those are 5 and −2.", latex: "p \\times q = -10,\\quad p + q = 3 \\implies p=5,\\;q=-2" },
        { explanation: "Write in factorised form.", latex: "(x+5)(x-2)=0" },
        { explanation: "Apply the null factor law.", latex: "x+5=0 \\implies x=-5 \\quad\\text{or}\\quad x-2=0 \\implies x=2" },
      ],
      finalAnswerLatex: "x = -5 \\text{ or } x = 2",
    },
    {
      title: "Difference of two squares",
      questionLatex: "\\text{Solve }x^2 - 9 = 0.",
      steps: [
        { explanation: "Recognise this as a difference of squares: a² − b² = (a − b)(a + b) with a = x and b = 3.", latex: "x^2 - 9 = (x-3)(x+3)" },
        { explanation: "Apply the null factor law.", latex: "(x-3)(x+3)=0 \\implies x=3 \\text{ or } x=-3" },
      ],
      finalAnswerLatex: "x = 3 \\text{ or } x = -3",
    },
  ] as WorkedExample[],
  guidedPractice: [
    // g1: MCQ — correct factorisation
    choice(
      "eqb-qua-g1",
      "Which factorisation is correct for x² + 5x + 6 = 0?",
      "B",
      ["$(x+1)(x+6)$", "$(x+2)(x+3)$", "$(x-2)(x-3)$", "$(x+6)(x-1)$"],
      "We need two numbers that multiply to 6 and add to 5: those are 2 and 3, giving (x + 2)(x + 3) = 0."
    ),
    // g2: typed — smaller solution
    answer(
      "eqb-qua-g2",
      "Solve x² + 5x + 6 = 0. What is the smaller solution?",
      "x^2 + 5x + 6 = 0",
      "-3",
      "(x + 2)(x + 3) = 0, so x = −2 or x = −3. The smaller value is −3.",
      ["-3.0"]
    ),
    // g3: typed — larger solution of rearranged quadratic
    answer(
      "eqb-qua-g3",
      "Rearrange x² + 3x = 10 into standard form, then solve. What is the larger solution?",
      "x^2 + 3x = 10",
      "2",
      "x² + 3x − 10 = 0 → (x + 5)(x − 2) = 0 → x = −5 or x = 2. The larger value is 2."
    ),
    // g4: typed — difference of squares
    answer(
      "eqb-qua-g4",
      "Solve x² − 16 = 0. What is the positive solution?",
      "x^2 - 16 = 0",
      "4",
      "(x − 4)(x + 4) = 0 → x = 4 or x = −4. The positive solution is 4."
    ),
  ],
  independentPractice: [
    // i1: typed — smaller solution
    answer(
      "eqb-qua-i1",
      "Solve x² − 7x + 12 = 0. What is the smaller solution?",
      "x^2 - 7x + 12 = 0",
      "3",
      "(x − 3)(x − 4) = 0 → x = 3 or x = 4. The smaller value is 3."
    ),
    // i2: typed — larger solution
    answer(
      "eqb-qua-i2",
      "Solve x² − 7x + 12 = 0. What is the larger solution?",
      "x^2 - 7x + 12 = 0",
      "4",
      "(x − 3)(x − 4) = 0 → x = 3 or x = 4. The larger value is 4."
    ),
    // i3: MCQ — how many solutions
    choice(
      "eqb-qua-i3",
      "How many real solutions does x² + 5x + 6 = 0 have?",
      "B",
      ["0", "2", "1", "3"],
      "(x + 2)(x + 3) = 0 gives two solutions: x = −2 and x = −3."
    ),
    // i4: typed — smaller solution with mixed signs
    answer(
      "eqb-qua-i4",
      "Solve x² − x − 6 = 0. What is the smaller solution?",
      "x^2 - x - 6 = 0",
      "-2",
      "(x − 3)(x + 2) = 0 → x = 3 or x = −2. The smaller value is −2.",
      ["-2.0"]
    ),
    // i5: typed — rearranged quadratic
    answer(
      "eqb-qua-i5",
      "Rearrange x² − 4x = 21 into standard form, then solve. What is the larger solution?",
      "x^2 - 4x = 21",
      "7",
      "x² − 4x − 21 = 0 → (x − 7)(x + 3) = 0 → x = 7 or x = −3. The larger value is 7."
    ),
  ],
  commonMistakes: [
    { mistake: "Finding only one solution and stopping.", fix: "A quadratic equation always produces two solutions (from the null factor law). Set each bracket equal to zero." },
    { mistake: "Choosing numbers that add to c and multiply to b instead of the other way round.", fix: "You need p × q = c (the constant) and p + q = b (the coefficient of x)." },
    { mistake: "Forgetting to rearrange before factorising (e.g. x² + 3x = 10).", fix: "Always write the equation as x² + bx + c = 0 (zero on the right) before factorising." },
    { mistake: "Sign errors in the factorised form.", fix: "Check by expanding (x + p)(x + q) to verify you get back the original expression." },
  ],
  masteryQuiz: [
    // m1: typed
    answer(
      "eqb-qua-m1",
      "Solve x² − 9x + 20 = 0. What is the smaller solution?",
      "x^2 - 9x + 20 = 0",
      "4",
      "(x − 4)(x − 5) = 0 → x = 4 or x = 5. The smaller value is 4."
    ),
    // m2: typed
    answer(
      "eqb-qua-m2",
      "Solve x² − 9x + 20 = 0. What is the larger solution?",
      "x^2 - 9x + 20 = 0",
      "5",
      "(x − 4)(x − 5) = 0 → x = 4 or x = 5. The larger value is 5."
    ),
    // m3: MCQ — correct factorisation
    choice(
      "eqb-qua-m3",
      "Which factorisation is correct for x² − 2x − 15 = 0?",
      "C",
      ["$(x-5)(x-3)$", "$(x+5)(x+3)$", "$(x-5)(x+3)$", "$(x+5)(x-3)$"],
      "We need numbers that multiply to −15 and add to −2: those are −5 and 3, giving (x − 5)(x + 3) = 0."
    ),
    // m4: typed
    answer(
      "eqb-qua-m4",
      "Solve x² + 2x − 15 = 0. What is the smaller solution?",
      "x^2 + 2x - 15 = 0",
      "-5",
      "(x + 5)(x − 3) = 0 → x = −5 or x = 3. The smaller value is −5.",
      ["-5.0"]
    ),
    // m5: typed
    answer(
      "eqb-qua-m5",
      "Solve x² − 25 = 0. What is the positive solution?",
      "x^2 - 25 = 0",
      "5",
      "(x − 5)(x + 5) = 0 → x = 5 or x = −5. The positive solution is 5."
    ),
    // m6: typed — rearranged
    answer(
      "eqb-qua-m6",
      "Rearrange x² + 6x = −8 into standard form, then solve. What is the larger solution?",
      "x^2 + 6x = -8",
      "-2",
      "x² + 6x + 8 = 0 → (x + 2)(x + 4) = 0 → x = −2 or x = −4. The larger value is −2.",
      ["-2.0"]
    ),
    // m7: typed
    answer(
      "eqb-qua-m7",
      "Solve x² − 11x + 30 = 0. What is the smaller solution?",
      "x^2 - 11x + 30 = 0",
      "5",
      "(x − 5)(x − 6) = 0 → x = 5 or x = 6. The smaller value is 5."
    ),
    // m8: MCQ — identifying a perfect square
    choice(
      "eqb-qua-m8",
      "Solve x² − 6x + 9 = 0. How many distinct solutions does it have?",
      "C",
      ["0", "2", "1", "3"],
      "x² − 6x + 9 = (x − 3)² = 0, so x = 3 is a repeated root — only one distinct solution."
    ),
    // m9: typed
    answer(
      "eqb-qua-m9",
      "Solve x² − 36 = 0. What is the negative solution?",
      "x^2 - 36 = 0",
      "-6",
      "(x − 6)(x + 6) = 0 → x = 6 or x = −6. The negative solution is −6.",
      ["-6.0"]
    ),
    // m10: MCQ — error identification
    choice(
      "eqb-qua-m10",
      "A student solves x² − 5x + 6 = 0 and writes x = 2 as the only answer. What error did they make?",
      "A",
      [
        "They found only one of the two solutions.",
        "They used the wrong factorisation.",
        "They forgot to rearrange the equation first.",
        "They applied the null factor law to the wrong bracket.",
      ],
      "(x − 2)(x − 3) = 0 gives x = 2 AND x = 3. The student applied the null factor law to only one bracket."
    ),
  ],
};

// ─── Lesson 2: Solving Linear Inequalities ────────────────────────────────────

const linearInequalities: LessonContent = {
  description: "Solve linear inequalities in one variable, represent solutions on a number line, and understand when to reverse the inequality sign.",
  learningIntention: "Solve linear inequalities and represent solution sets using inequality notation and number lines.",
  successCriteria: [
    "Solve a linear inequality using the same steps as solving a linear equation.",
    "Reverse the inequality sign when multiplying or dividing both sides by a negative number.",
    "Represent the solution on a number line using open or closed circles.",
    "Verify a solution by substituting a test value into the original inequality.",
  ],
  teaching: {
    paragraphs: [
      "A linear inequality is like a linear equation but uses >, <, ≥, or ≤ instead of =. Solve the same way: isolate the variable by performing the same operation on both sides.",
      "Critical rule: if you multiply or divide BOTH sides by a NEGATIVE number, REVERSE the inequality sign. For example, −2x > 6 → x < −3 (sign flips when dividing by −2).",
      "Represent the solution on a number line: use an open circle (○) for strict inequalities (< or >) and a closed circle (●) for ≤ or ≥. Shade the correct side to show all values that satisfy the inequality.",
      "Express the solution set using inequality notation (x > 3) or interval notation. Always substitute a test value into the original inequality to verify that your solution is on the correct side.",
    ],
    latexBlocks: [
      "-2x > 6 \\;\\Rightarrow\\; x < -3",
      "\\text{Divide by negative: flip the sign}",
      "\\circ\\text{ (open) for }<\\text{ or }>\\text{; }\\bullet\\text{ (closed) for }\\leq\\text{ or }\\geq",
    ],
  },
  workedExamples: [
    {
      title: "Simple linear inequality",
      questionLatex: "\\text{Solve }3x - 5 > 7.",
      steps: [
        { explanation: "Add 5 to both sides.", latex: "3x - 5 + 5 > 7 + 5 \\implies 3x > 12" },
        { explanation: "Divide both sides by 3 (positive, so sign stays).", latex: "x > 4" },
        { explanation: "Represent on a number line: open circle at 4, shade to the right.", latex: "\\circ\\!\\!\\longrightarrow \\quad x > 4" },
      ],
      finalAnswerLatex: "x > 4",
    },
    {
      title: "Dividing by a negative — sign flips",
      questionLatex: "\\text{Solve }-2x + 1 \\leq 9.",
      steps: [
        { explanation: "Subtract 1 from both sides.", latex: "-2x \\leq 8" },
        { explanation: "Divide both sides by −2. Because we divide by a negative number, the inequality sign reverses.", latex: "x \\geq \\frac{8}{-2} \\implies x \\geq -4" },
        { explanation: "Closed circle at −4, shade to the right.", latex: "\\bullet\\!\\!\\longrightarrow \\quad x \\geq -4" },
      ],
      finalAnswerLatex: "x \\geq -4",
    },
    {
      title: "Expanding brackets first",
      questionLatex: "\\text{Solve }2(x+3) < x + 10.",
      steps: [
        { explanation: "Expand the bracket on the left.", latex: "2x + 6 < x + 10" },
        { explanation: "Subtract x from both sides.", latex: "x + 6 < 10" },
        { explanation: "Subtract 6 from both sides.", latex: "x < 4" },
      ],
      finalAnswerLatex: "x < 4",
    },
  ] as WorkedExample[],
  guidedPractice: [
    // g1: MCQ — identify which operation flips the sign
    choice(
      "eqb-ine-g1",
      "Which of the following operations reverses the inequality sign?",
      "B",
      ["Adding 5 to both sides", "Dividing both sides by −3", "Subtracting 2 from both sides", "Multiplying both sides by 4"],
      "Only multiplying or dividing by a negative number reverses the inequality sign."
    ),
    // g2: typed — boundary value of a basic inequality
    answer(
      "eqb-ine-g2",
      "Solve 2x + 1 > 9. The solution is x > ?",
      "2x + 1 > 9",
      "4",
      "2x > 8 → x > 4. The boundary value is 4."
    ),
    // g3: MCQ — correct solution to negative coefficient
    choice(
      "eqb-ine-g3",
      "Which of the following is the correct solution to −3x > 9?",
      "B",
      ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"],
      "Divide both sides by −3 and flip the sign: x < −3.",
      "-3x > 9"
    ),
    // g4: typed — boundary value after expanding
    answer(
      "eqb-ine-g4",
      "Solve 3(x − 2) ≤ 6. The solution is x ≤ ?",
      "3(x-2) \\leq 6",
      "4",
      "3x − 6 ≤ 6 → 3x ≤ 12 → x ≤ 4. The boundary value is 4."
    ),
  ],
  independentPractice: [
    // i1: typed
    answer(
      "eqb-ine-i1",
      "Solve 4x − 3 > 13. The solution is x > ?",
      "4x - 3 > 13",
      "4",
      "4x > 16 → x > 4. The boundary value is 4."
    ),
    // i2: typed — negative coefficient
    answer(
      "eqb-ine-i2",
      "Solve −5x ≤ 20. The solution is x ≥ ?",
      "-5x \\leq 20",
      "-4",
      "Divide by −5 and flip: x ≥ −4. The boundary value is −4.",
      ["-4.0"]
    ),
    // i3: typed — with expansion
    answer(
      "eqb-ine-i3",
      "Solve 2(x + 1) < x + 7. The solution is x < ?",
      "2(x+1) < x+7",
      "5",
      "2x + 2 < x + 7 → x < 5. The boundary value is 5."
    ),
    // i4: typed
    answer(
      "eqb-ine-i4",
      "Solve 5 − x > 2. The solution is x < ?",
      "5 - x > 2",
      "3",
      "−x > −3 → x < 3 (flip sign when dividing by −1). The boundary value is 3."
    ),
    // i5: MCQ — number line representation
    choice(
      "eqb-ine-i5",
      "The solution to an inequality is x ≥ −2. Which number-line description is correct?",
      "C",
      [
        "Open circle at −2, shaded to the left.",
        "Open circle at −2, shaded to the right.",
        "Closed circle at −2, shaded to the right.",
        "Closed circle at −2, shaded to the left.",
      ],
      "≥ uses a closed circle (the endpoint is included), and x ≥ −2 means values to the right of −2."
    ),
  ],
  commonMistakes: [
    { mistake: "Not flipping the inequality sign when dividing by a negative number.", fix: "Any time you multiply or divide BOTH sides by a negative number, reverse the inequality sign." },
    { mistake: "Using a closed circle (●) for a strict inequality (< or >).", fix: "Strict inequalities use an open circle (○). Only ≤ and ≥ use a closed circle (●)." },
    { mistake: "Moving the variable to the right side and then misreading the direction.", fix: "It is usually safer to keep the variable on the left. If you have a > b after solving, the solution is a > b." },
    { mistake: "Forgetting to expand brackets before isolating the variable.", fix: "Expand all brackets first, then collect like terms before solving." },
  ],
  masteryQuiz: [
    // m1: typed
    answer(
      "eqb-ine-m1",
      "Solve 3x + 4 ≥ 16. The solution is x ≥ ?",
      "3x + 4 \\geq 16",
      "4",
      "3x ≥ 12 → x ≥ 4. The boundary value is 4."
    ),
    // m2: typed — negative
    answer(
      "eqb-ine-m2",
      "Solve −4x < 20. The solution is x > ?",
      "-4x < 20",
      "-5",
      "Divide by −4 and flip: x > −5. The boundary value is −5.",
      ["-5.0"]
    ),
    // m3: MCQ — identify correct solution
    choice(
      "eqb-ine-m3",
      "Solve −2x + 3 > 9. Which answer is correct?",
      "B",
      ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"],
      "−2x > 6 → divide by −2 and flip → x < −3.",
      "-2x + 3 > 9"
    ),
    // m4: typed
    answer(
      "eqb-ine-m4",
      "Solve 4(x − 1) ≥ 2x + 6. The solution is x ≥ ?",
      "4(x-1) \\geq 2x+6",
      "5",
      "4x − 4 ≥ 2x + 6 → 2x ≥ 10 → x ≥ 5. The boundary value is 5."
    ),
    // m5: typed
    answer(
      "eqb-ine-m5",
      "Solve 7 − 3x ≤ 1. The solution is x ≥ ?",
      "7 - 3x \\leq 1",
      "2",
      "−3x ≤ −6 → divide by −3 and flip → x ≥ 2. The boundary value is 2."
    ),
    // m6: MCQ — sign flip when dividing by negative fraction
    choice(
      "eqb-ine-m6",
      "In solving −x/2 < 3, a student divides both sides by −1/2. What happens to the inequality sign?",
      "A",
      [
        "It reverses (becomes >).",
        "It stays the same (remains <).",
        "It becomes ≤.",
        "It becomes ≥.",
      ],
      "Dividing by any negative number (including −1/2) reverses the inequality sign, giving x > −6."
    ),
    // m7: typed
    answer(
      "eqb-ine-m7",
      "Solve 2x − 7 < x + 1. The solution is x < ?",
      "2x - 7 < x + 1",
      "8",
      "x − 7 < 1 → x < 8. The boundary value is 8."
    ),
    // m8: typed
    answer(
      "eqb-ine-m8",
      "Solve 3(2x + 1) > 2(x + 9). The solution is x > ?",
      "3(2x+1) > 2(x+9)",
      "3.75",
      "6x + 3 > 2x + 18 → 4x > 15 → x > 15/4 = 3.75.",
      ["15/4"]
    ),
    // m9: typed
    answer(
      "eqb-ine-m9",
      "Solve −6 ≤ 2x + 4. The solution is x ≥ ?",
      "-6 \\leq 2x + 4",
      "-5",
      "−10 ≤ 2x → x ≥ −5. The boundary value is −5.",
      ["-5.0"]
    ),
    // m10: MCQ — test value check
    choice(
      "eqb-ine-m10",
      "The solution to an inequality is x > 5. Which test value correctly verifies this solution in the inequality 2x − 3 > 7?",
      "C",
      ["x = 3", "x = 5", "x = 7", "x = 0"],
      "x = 7 is greater than 5. Substituting: 2(7) − 3 = 11 > 7. The other values either equal the boundary (x = 5) or fall outside the solution set."
    ),
  ],
};

// ─── Lesson 3: Cubic Equations of the Form ax³ = k ──────────────────────────

const cubicEquations: LessonContent = {
  description: "Solve cubic equations of the form ax³ = k by isolating x³ and taking the cube root of both sides, including cases with negative k.",
  learningIntention: "Solve cubic equations of the form ax³ = k using cube roots, including those with negative solutions.",
  successCriteria: [
    "Isolate x³ by dividing both sides by a.",
    "Take the cube root of both sides to find x.",
    "Evaluate cube roots of perfect cubes as whole numbers.",
    "Recognise that cube roots of negative numbers are real and negative.",
  ],
  teaching: {
    paragraphs: [
      "A cubic equation of the form ax³ = k is solved by isolating x³ and then taking the cube root of both sides: x = ∛(k/a). Unlike square roots, cube roots of negative numbers are real — ∛(−8) = −2.",
      "When a = 1: x³ = k → x = ∛k. When a ≠ 1: divide both sides by a first to get x³ = k/a, then take the cube root. There is exactly one real solution.",
      "Leave answers in exact form using ∛ notation unless the cube root is a whole number or a simple fraction. Common perfect cubes to know: 1, 8, 27, 64, 125, 216.",
    ],
    latexBlocks: [
      "ax^3=k \\;\\Rightarrow\\; x^3=\\frac{k}{a} \\;\\Rightarrow\\; x=\\sqrt[3]{\\frac{k}{a}}",
      "\\sqrt[3]{-8}=-2",
      "\\sqrt[3]{27}=3",
    ],
  },
  workedExamples: [
    {
      title: "Positive perfect cube",
      questionLatex: "\\text{Solve }2x^3 = 54.",
      steps: [
        { explanation: "Divide both sides by 2 to isolate x³.", latex: "x^3 = \\frac{54}{2} = 27" },
        { explanation: "Take the cube root of both sides.", latex: "x = \\sqrt[3]{27} = 3" },
      ],
      finalAnswerLatex: "x = 3",
    },
    {
      title: "Negative cube root",
      questionLatex: "\\text{Solve }x^3 + 8 = 0.",
      steps: [
        { explanation: "Subtract 8 from both sides to isolate x³.", latex: "x^3 = -8" },
        { explanation: "Take the cube root of both sides. Cube roots of negative numbers are real.", latex: "x = \\sqrt[3]{-8} = -2" },
      ],
      finalAnswerLatex: "x = -2",
    },
  ] as WorkedExample[],
  guidedPractice: [
    // g1: MCQ — how to begin
    choice(
      "eqb-cub-g1",
      "What is the first step in solving 3x³ = 81?",
      "A",
      ["Divide both sides by 3.", "Take the cube root of both sides.", "Subtract 81 from both sides.", "Square both sides."],
      "Divide both sides by 3 first to isolate x³: x³ = 27. Then take the cube root.",
      "3x^3 = 81"
    ),
    // g2: typed
    answer(
      "eqb-cub-g2",
      "Solve 3x³ = 81.",
      "3x^3 = 81",
      "3",
      "x³ = 27 → x = ∛27 = 3."
    ),
    // g3: typed — negative
    answer(
      "eqb-cub-g3",
      "Solve x³ = −27.",
      "x^3 = -27",
      "-3",
      "x = ∛(−27) = −3. Cube roots of negative numbers are negative.",
      ["-3.0"]
    ),
    // g4: MCQ — correct answer from list
    choice(
      "eqb-cub-g4",
      "Solve 4x³ = 32. Which answer is correct?",
      "B",
      ["$x = 2^3$", "$x = 2$", "$x = 8$", "$x = \\sqrt[3]{8}$"],
      "x³ = 32/4 = 8, so x = ∛8 = 2.",
      "4x^3 = 32"
    ),
  ],
  independentPractice: [
    // i1: typed
    answer(
      "eqb-cub-i1",
      "Solve 5x³ = 40.",
      "5x^3 = 40",
      "2",
      "x³ = 8 → x = ∛8 = 2."
    ),
    // i2: typed — negative
    answer(
      "eqb-cub-i2",
      "Solve x³ + 64 = 0.",
      "x^3 + 64 = 0",
      "-4",
      "x³ = −64 → x = ∛(−64) = −4.",
      ["-4.0"]
    ),
    // i3: typed — coefficient
    answer(
      "eqb-cub-i3",
      "Solve 2x³ = 16.",
      "2x^3 = 16",
      "2",
      "x³ = 8 → x = ∛8 = 2."
    ),
    // i4: typed — decimal answer for non-perfect cube (to 2 dp)
    answer(
      "eqb-cub-i4",
      "Solve x³ = 10. Give your answer correct to 2 decimal places.",
      "x^3 = 10",
      "2.15",
      "x = ∛10 ≈ 2.154. Rounded to 2 dp: 2.15.",
      ["2.154", "2.1544"]
    ),
    // i5: MCQ
    choice(
      "eqb-cub-i5",
      "How many real solutions does the equation 2x³ = −16 have?",
      "B",
      ["0", "1", "2", "3"],
      "x³ = −8 → x = −2. There is exactly one real cube root for any real number."
    ),
  ],
  commonMistakes: [
    { mistake: "Writing ∛(−k) has no real solution (confusing with square roots).", fix: "Cube roots of negative numbers are real. ∛(−8) = −2 because (−2)³ = −8." },
    { mistake: "Forgetting to divide by a before taking the cube root.", fix: "Isolate x³ first by dividing both sides by a, then take the cube root." },
    { mistake: "Writing two solutions (±) as with square roots.", fix: "Cubic equations of this form have exactly one real solution — there is no ± with cube roots." },
    { mistake: "Confusing cube root with square root notation.", fix: "The cube root symbol is ∛ (index 3). The square root symbol is √ (index 2). They give different results." },
  ],
  masteryQuiz: [
    // m1: typed
    answer(
      "eqb-cub-m1",
      "Solve x³ = 64.",
      "x^3 = 64",
      "4",
      "x = ∛64 = 4."
    ),
    // m2: typed — negative
    answer(
      "eqb-cub-m2",
      "Solve x³ = −125.",
      "x^3 = -125",
      "-5",
      "x = ∛(−125) = −5.",
      ["-5.0"]
    ),
    // m3: typed — coefficient
    answer(
      "eqb-cub-m3",
      "Solve 3x³ = 375.",
      "3x^3 = 375",
      "5",
      "x³ = 125 → x = ∛125 = 5."
    ),
    // m4: MCQ — correct interpretation
    choice(
      "eqb-cub-m4",
      "Solve 6x³ = −48. Which answer is correct?",
      "C",
      ["$x = 2$", "$x = -2\\sqrt{2}$", "$x = -2$", "$x = 2\\sqrt{2}$"],
      "x³ = −48/6 = −8 → x = ∛(−8) = −2.",
      "6x^3 = -48"
    ),
    // m5: typed — decimal for non-perfect cube
    answer(
      "eqb-cub-m5",
      "Solve x³ = 20. Give your answer correct to 2 decimal places.",
      "x^3 = 20",
      "2.71",
      "x = ∛20 ≈ 2.714. Rounded to 2 dp: 2.71.",
      ["2.714", "2.7144"]
    ),
    // m6: typed
    answer(
      "eqb-cub-m6",
      "Solve 4x³ = 256.",
      "4x^3 = 256",
      "4",
      "x³ = 64 → x = ∛64 = 4."
    ),
    // m7: typed — negative non-perfect cube decimal
    answer(
      "eqb-cub-m7",
      "Solve x³ = −15. Give your answer correct to 2 decimal places.",
      "x^3 = -15",
      "-2.47",
      "x = ∛(−15) ≈ −2.466. Rounded to 2 dp: −2.47.",
      ["-2.466", "-2.4662"]
    ),
    // m8: MCQ — number of solutions
    choice(
      "eqb-cub-m8",
      "How many real solutions does 7x³ = 0 have?",
      "C",
      ["0", "3", "1", "2"],
      "x³ = 0 → x = 0. There is exactly one real solution."
    ),
    // m9: typed
    answer(
      "eqb-cub-m9",
      "Solve 2x³ = −54.",
      "2x^3 = -54",
      "-3",
      "x³ = −27 → x = ∛(−27) = −3.",
      ["-3.0"]
    ),
    // m10: MCQ — identify the correct first step
    choice(
      "eqb-cub-m10",
      "To solve 5x³ + 10 = 0, what should you do first?",
      "B",
      [
        "Take the cube root of both sides immediately.",
        "Subtract 10 from both sides to get 5x³ = −10.",
        "Divide both sides by 5 first.",
        "Add 5x³ to both sides.",
      ],
      "First move the constant: 5x³ = −10. Then divide by 5: x³ = −2. Then take the cube root: x = ∛(−2)."
    ),
  ],
};

// ─── Lessons map and override ─────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "quadratic-equations-factorise": quadraticEquationsFactorise,
  "linear-inequalities": linearInequalities,
  "cubic-equations": cubicEquations,
};

export function year9EquationsBLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced"].includes(course.slug) ||
    unit.slug !== "equations-b"
  ) {
    return null;
  }
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
