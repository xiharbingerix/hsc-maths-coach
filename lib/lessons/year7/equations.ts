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
    hint: "Use inverse operations to isolate the unknown.",
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
    hint: "Think about which operation is being done to the unknown, then reverse it.",
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

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — One-step equations
// ─────────────────────────────────────────────────────────────────────────────

const oneStepEquations: LessonContent = {
  description: "Understand the difference between expressions and equations, then solve one-step linear equations using inverse operations.",
  learningIntention: "Solve one-step linear equations by applying the appropriate inverse operation and verify the solution by substitution.",
  successCriteria: [
    "Distinguish between an algebraic expression and an equation.",
    "Identify which inverse operation undoes the operation applied to the unknown.",
    "Solve one-step equations involving addition, subtraction, multiplication, and division.",
    "Verify a solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "An expression is a collection of terms — like 3x + 5 — that can be simplified but has no equals sign. An equation has an equals sign and makes a statement that two sides balance. The equation x + 5 = 12 says 'some number plus 5 gives 12'. Our job is to find that number.",
      "To solve an equation, we want the unknown on one side by itself. Every operation has an inverse — an opposite that undoes it. Addition is undone by subtraction, subtraction by addition, multiplication by division, and division by multiplication. We apply the inverse operation to both sides so the equation stays balanced.",
      "For example, in x + 5 = 12, the number 5 is being added to x. To undo that, subtract 5 from both sides: x + 5 − 5 = 12 − 5, which gives x = 7. For 3x = 18, the unknown is being multiplied by 3, so divide both sides by 3: x = 6.",
      "Always check your answer by substituting it back into the original equation. If x = 7 and the equation was x + 5 = 12, check: 7 + 5 = 12. That is true, so x = 7 is correct. A substitution check catches arithmetic errors before they cost marks.",
    ],
    latexBlocks: [
      "x + a = b \\implies x = b - a",
      "x - a = b \\implies x = b + a",
      "ax = b \\implies x = \\frac{b}{a}",
      "\\frac{x}{a} = b \\implies x = b \\times a",
    ],
  },
  workedExamples: [
    {
      title: "Solve an addition equation",
      questionLatex: "\\text{Solve } x + 5 = 12.",
      steps: [
        { explanation: "5 is added to x. The inverse of addition is subtraction, so subtract 5 from both sides.", latex: "x + 5 - 5 = 12 - 5" },
        { explanation: "Simplify both sides.", latex: "x = 7" },
        { explanation: "Verify by substituting x = 7 back into the original equation.", latex: "7 + 5 = 12 \\checkmark" },
      ],
      finalAnswerLatex: "x = 7",
    },
    {
      title: "Solve a multiplication equation",
      questionLatex: "\\text{Solve } 3x = 18.",
      steps: [
        { explanation: "x is being multiplied by 3. The inverse of multiplication is division, so divide both sides by 3.", latex: "\\frac{3x}{3} = \\frac{18}{3}" },
        { explanation: "Simplify both sides.", latex: "x = 6" },
        { explanation: "Check: substitute x = 6 into 3x = 18.", latex: "3 \\times 6 = 18 \\checkmark" },
      ],
      finalAnswerLatex: "x = 6",
    },
    {
      title: "Solve a division equation",
      questionLatex: "\\text{Solve } \\dfrac{x}{2} = 6.",
      steps: [
        { explanation: "x is being divided by 2. The inverse of division is multiplication, so multiply both sides by 2.", latex: "\\frac{x}{2} \\times 2 = 6 \\times 2" },
        { explanation: "Simplify both sides.", latex: "x = 12" },
        { explanation: "Check: 12 ÷ 2 = 6.", latex: "\\frac{12}{2} = 6 \\checkmark" },
      ],
      finalAnswerLatex: "x = 12",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-one-g1",
      "To solve x + 8 = 15, which operation should you apply to both sides?",
      "B",
      ["Add 8", "Subtract 8", "Multiply by 8", "Divide by 8"],
      "8 is added to x, so subtract 8 from both sides to leave x alone: x = 15 − 8 = 7.",
      "x + 8 = 15"
    ),
    answer(
      "y7-equ-one-g2",
      "Solve the equation.",
      "x - 4 = 7",
      "11",
      "Add 4 to both sides: x = 7 + 4 = 11. Check: 11 − 4 = 7."
    ),
    answer(
      "y7-equ-one-g3",
      "Solve the equation.",
      "4x = 28",
      "7",
      "Divide both sides by 4: x = 28 ÷ 4 = 7. Check: 4 × 7 = 28."
    ),
    answer(
      "y7-equ-one-g4",
      "Solve the equation.",
      "\\dfrac{x}{3} = 9",
      "27",
      "Multiply both sides by 3: x = 9 × 3 = 27. Check: 27 ÷ 3 = 9."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-one-i1",
      "Solve the equation.",
      "x + 13 = 20",
      "7",
      "Subtract 13 from both sides: x = 20 − 13 = 7."
    ),
    answer(
      "y7-equ-one-i2",
      "Solve the equation.",
      "x - 9 = 14",
      "23",
      "Add 9 to both sides: x = 14 + 9 = 23."
    ),
    answer(
      "y7-equ-one-i3",
      "Solve the equation.",
      "7x = 56",
      "8",
      "Divide both sides by 7: x = 56 ÷ 7 = 8."
    ),
    answer(
      "y7-equ-one-i4",
      "Solve the equation.",
      "\\dfrac{x}{5} = 8",
      "40",
      "Multiply both sides by 5: x = 8 × 5 = 40."
    ),
    choice(
      "y7-equ-one-i5",
      "A student solves 5x = 35 and gets x = 175. What error did they make?",
      "C",
      ["They divided 35 by 5 instead of 5 by 35.", "They subtracted 5 instead of dividing.", "They multiplied 35 by 5 instead of dividing.", "They added 5 to both sides."],
      "To undo multiplication by 5, divide both sides by 5: x = 35 ÷ 5 = 7. Multiplying gives 175, which is the wrong inverse operation.",
      "5x = 35"
    ),
  ],
  commonMistakes: [
    { mistake: "Applying the operation to only one side: x + 5 = 12, so x = 12 + 5 = 17.", fix: "Whatever you do to one side, you must do to the other. Subtract 5 from both sides: x = 12 − 5 = 7." },
    { mistake: "Using the same operation instead of the inverse: x + 5 = 12, so x = 12 + 5.", fix: "Identify the operation on x (here, +5) and apply the opposite (−5) to both sides." },
    { mistake: "Not checking the answer by substitution.", fix: "Always substitute your answer back into the original equation to confirm both sides are equal." },
    { mistake: "Confusing expressions and equations: trying to 'solve' 3x + 5.", fix: "An expression has no equals sign and cannot be solved. An equation has an equals sign — that is what you solve." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-one-m1",
      "Solve the equation.",
      "x + 6 = 19",
      "13",
      "Subtract 6 from both sides: x = 19 − 6 = 13."
    ),
    answer(
      "y7-equ-one-m2",
      "Solve the equation.",
      "x - 11 = 8",
      "19",
      "Add 11 to both sides: x = 8 + 11 = 19."
    ),
    choice(
      "y7-equ-one-m3",
      "Which equation has the solution x = 9?",
      "C",
      ["$x + 9 = 9$", "$3x = 36$", "$x - 5 = 4$", "$\\dfrac{x}{9} = 81$"],
      "Check each: x + 9 = 9 gives x = 0; 3x = 36 gives x = 12; x − 5 = 4 gives x = 9 (correct); x/9 = 81 gives x = 729.",
      "\\text{Select the equation with solution } x = 9."
    ),
    answer(
      "y7-equ-one-m4",
      "Solve the equation.",
      "9x = 63",
      "7",
      "Divide both sides by 9: x = 63 ÷ 9 = 7."
    ),
    answer(
      "y7-equ-one-m5",
      "Solve the equation.",
      "\\dfrac{x}{4} = 11",
      "44",
      "Multiply both sides by 4: x = 11 × 4 = 44."
    ),
    answer(
      "y7-equ-one-m6",
      "Solve the equation.",
      "x + 25 = 40",
      "15",
      "Subtract 25 from both sides: x = 40 − 25 = 15."
    ),
    choice(
      "y7-equ-one-m7",
      "A student says x/6 = 7 has solution x = 7/6. What is the correct solution?",
      "B",
      ["$x = \\dfrac{7}{6}$", "$x = 42$", "$x = 1$", "$x = 13$"],
      "To undo division by 6, multiply both sides by 6: x = 7 × 6 = 42. The student divided instead of multiplying.",
      "\\dfrac{x}{6} = 7"
    ),
    answer(
      "y7-equ-one-m8",
      "Solve the equation.",
      "x - 17 = 30",
      "47",
      "Add 17 to both sides: x = 30 + 17 = 47."
    ),
    answer(
      "y7-equ-one-m9",
      "Solve the equation.",
      "12x = 96",
      "8",
      "Divide both sides by 12: x = 96 ÷ 12 = 8."
    ),
    answer(
      "y7-equ-one-m10",
      "A value of x satisfies the equation $\\dfrac{x}{8} = 6$. What is x?",
      "\\dfrac{x}{8} = 6",
      "48",
      "Multiply both sides by 8: x = 6 × 8 = 48. Check: 48 ÷ 8 = 6."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Two-step equations
// ─────────────────────────────────────────────────────────────────────────────

const twoStepEquations: LessonContent = {
  description: "Solve two-step linear equations by undoing addition or subtraction first, then multiplication or division.",
  learningIntention: "Solve two-step linear equations using inverse operations in the correct order, and verify solutions by substitution.",
  successCriteria: [
    "Identify the two operations applied to the unknown in a two-step equation.",
    "Apply inverse operations in the correct order: undo addition or subtraction first, then multiplication or division.",
    "Solve two-step equations of the form ax + b = c and x/a + b = c.",
    "Verify the solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "A two-step equation has two operations applied to the unknown. For example, in 2x + 3 = 11, the unknown x is first multiplied by 2, then 3 is added. To solve it, we undo those steps in reverse — like putting on shoes and socks: you put socks on first, but take shoes off first when you reverse.",
      "The rule is: undo addition or subtraction first, then undo multiplication or division. For 2x + 3 = 11, start by subtracting 3 from both sides to get 2x = 8, then divide both sides by 2 to get x = 4.",
      "The same rule applies when subtraction is involved. For 3x − 5 = 16, add 5 to both sides first (getting 3x = 21), then divide by 3 (getting x = 7). For x/4 + 2 = 7, subtract 2 first (getting x/4 = 5), then multiply by 4 (getting x = 20).",
      "Always substitute your answer back to check. If x = 4 for 2x + 3 = 11, check: 2 × 4 + 3 = 8 + 3 = 11. Correct. This step takes five seconds and catches most errors.",
    ],
    latexBlocks: [
      "ax + b = c \\implies ax = c - b \\implies x = \\frac{c-b}{a}",
      "ax - b = c \\implies ax = c + b \\implies x = \\frac{c+b}{a}",
      "\\frac{x}{a} + b = c \\implies \\frac{x}{a} = c - b \\implies x = a(c-b)",
    ],
  },
  workedExamples: [
    {
      title: "Solve a two-step equation with addition",
      questionLatex: "\\text{Solve } 2x + 3 = 11.",
      steps: [
        { explanation: "3 is added last, so undo it first by subtracting 3 from both sides.", latex: "2x + 3 - 3 = 11 - 3" },
        { explanation: "Simplify to get the multiplication step.", latex: "2x = 8" },
        { explanation: "x is multiplied by 2, so divide both sides by 2.", latex: "x = \\frac{8}{2} = 4" },
        { explanation: "Check by substituting x = 4: 2(4) + 3 = 8 + 3 = 11.", latex: "2(4) + 3 = 11 \\checkmark" },
      ],
      finalAnswerLatex: "x = 4",
    },
    {
      title: "Solve a two-step equation with subtraction",
      questionLatex: "\\text{Solve } 3x - 5 = 16.",
      steps: [
        { explanation: "5 is subtracted last, so undo it first by adding 5 to both sides.", latex: "3x - 5 + 5 = 16 + 5" },
        { explanation: "Simplify.", latex: "3x = 21" },
        { explanation: "Divide both sides by 3.", latex: "x = \\frac{21}{3} = 7" },
        { explanation: "Check: 3(7) − 5 = 21 − 5 = 16.", latex: "3(7) - 5 = 16 \\checkmark" },
      ],
      finalAnswerLatex: "x = 7",
    },
    {
      title: "Solve a two-step equation with division",
      questionLatex: "\\text{Solve } \\dfrac{x}{4} + 2 = 7.",
      steps: [
        { explanation: "2 is added last, so subtract 2 from both sides first.", latex: "\\frac{x}{4} + 2 - 2 = 7 - 2" },
        { explanation: "Simplify.", latex: "\\frac{x}{4} = 5" },
        { explanation: "x is divided by 4, so multiply both sides by 4.", latex: "x = 5 \\times 4 = 20" },
        { explanation: "Check: 20/4 + 2 = 5 + 2 = 7.", latex: "\\frac{20}{4} + 2 = 7 \\checkmark" },
      ],
      finalAnswerLatex: "x = 20",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-two-g1",
      "For the equation 4x + 6 = 22, which is the correct first step?",
      "A",
      ["Subtract 6 from both sides", "Divide both sides by 4", "Add 6 to both sides", "Multiply both sides by 4"],
      "Undo the addition of 6 first by subtracting 6 from both sides: 4x = 22 − 6 = 16. Then divide by 4 to get x = 4.",
      "4x + 6 = 22"
    ),
    answer(
      "y7-equ-two-g2",
      "Solve the equation.",
      "2x + 5 = 13",
      "4",
      "Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4. Check: 2(4) + 5 = 13."
    ),
    answer(
      "y7-equ-two-g3",
      "Solve the equation.",
      "3x - 7 = 14",
      "7",
      "Add 7 to both sides: 3x = 21. Divide by 3: x = 7. Check: 3(7) − 7 = 14."
    ),
    answer(
      "y7-equ-two-g4",
      "Solve the equation.",
      "\\dfrac{x}{3} + 4 = 9",
      "15",
      "Subtract 4 from both sides: x/3 = 5. Multiply by 3: x = 15. Check: 15/3 + 4 = 9."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-two-i1",
      "Solve the equation.",
      "5x + 3 = 28",
      "5",
      "Subtract 3 from both sides: 5x = 25. Divide by 5: x = 5."
    ),
    answer(
      "y7-equ-two-i2",
      "Solve the equation.",
      "4x - 9 = 19",
      "7",
      "Add 9 to both sides: 4x = 28. Divide by 4: x = 7."
    ),
    answer(
      "y7-equ-two-i3",
      "Solve the equation.",
      "\\dfrac{x}{5} - 3 = 4",
      "35",
      "Add 3 to both sides: x/5 = 7. Multiply by 5: x = 35."
    ),
    answer(
      "y7-equ-two-i4",
      "Solve the equation.",
      "6x + 11 = 47",
      "6",
      "Subtract 11 from both sides: 6x = 36. Divide by 6: x = 6."
    ),
    choice(
      "y7-equ-two-i5",
      "A student solves 3x + 2 = 17 and gets x = 19/3. What went wrong?",
      "B",
      ["They divided by 3 before subtracting 2.", "They forgot to subtract 2 first and divided 17 by 3.", "They added 2 instead of subtracting it.", "They multiplied instead of dividing."],
      "The correct first step is to subtract 2: 3x = 15, then divide by 3 to get x = 5. Dividing 17 by 3 before subtracting 2 gives a wrong result.",
      "3x + 2 = 17"
    ),
  ],
  commonMistakes: [
    { mistake: "Dividing before subtracting: for 2x + 3 = 11, dividing by 2 first to get x + 3/2 = 11/2.", fix: "Undo addition and subtraction first. Subtract 3 to get 2x = 8, then divide by 2." },
    { mistake: "Subtracting from the wrong side: 2x + 3 = 11 becomes 2x = 11 + 3 = 14.", fix: "Whatever you do to one side you must do to the other. Subtract 3 from both sides: 2x = 11 − 3 = 8." },
    { mistake: "Forgetting to verify the answer.", fix: "Substitute your solution back into the original equation to confirm both sides are equal." },
    { mistake: "Getting the sign wrong when undoing subtraction: 3x − 5 = 16 becomes 3x = 16 − 5.", fix: "To undo −5, add 5 to both sides: 3x = 16 + 5 = 21." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-two-m1",
      "Solve the equation.",
      "2x + 7 = 21",
      "7",
      "Subtract 7 from both sides: 2x = 14. Divide by 2: x = 7."
    ),
    answer(
      "y7-equ-two-m2",
      "Solve the equation.",
      "5x - 4 = 31",
      "7",
      "Add 4 to both sides: 5x = 35. Divide by 5: x = 7."
    ),
    choice(
      "y7-equ-two-m3",
      "Which equation has the solution x = 3?",
      "D",
      ["$2x + 3 = 3$", "$4x - 5 = 17$", "$3x + 6 = 6$", "$5x - 1 = 14$"],
      "Check each: 2(3)+3=9≠3; 4(3)−5=7≠17; 3(3)+6=15≠6; 5(3)−1=14. Only D gives 14.",
      "\\text{Select the equation with solution } x = 3."
    ),
    answer(
      "y7-equ-two-m4",
      "Solve the equation.",
      "\\dfrac{x}{6} + 3 = 8",
      "30",
      "Subtract 3 from both sides: x/6 = 5. Multiply by 6: x = 30."
    ),
    answer(
      "y7-equ-two-m5",
      "Solve the equation.",
      "7x - 8 = 41",
      "7",
      "Add 8 to both sides: 7x = 49. Divide by 7: x = 7."
    ),
    answer(
      "y7-equ-two-m6",
      "Solve the equation.",
      "3x + 14 = 35",
      "7",
      "Subtract 14 from both sides: 3x = 21. Divide by 3: x = 7."
    ),
    choice(
      "y7-equ-two-m7",
      "To solve x/4 − 3 = 5, a student writes x/4 = 2. What error did they make?",
      "A",
      ["They subtracted 3 instead of adding it.", "They multiplied instead of dividing.", "They forgot to subtract from the left side.", "They divided by 4 before moving the constant."],
      "To undo −3, add 3 to both sides: x/4 = 5 + 3 = 8. Then x = 32. The student subtracted 3 instead.",
      "\\dfrac{x}{4} - 3 = 5"
    ),
    answer(
      "y7-equ-two-m8",
      "Solve the equation.",
      "\\dfrac{x}{2} - 6 = 4",
      "20",
      "Add 6 to both sides: x/2 = 10. Multiply by 2: x = 20. Check: 20/2 − 6 = 4."
    ),
    answer(
      "y7-equ-two-m9",
      "Solve the equation.",
      "9x + 3 = 57",
      "6",
      "Subtract 3 from both sides: 9x = 54. Divide by 9: x = 6."
    ),
    answer(
      "y7-equ-two-m10",
      "Solve the equation.",
      "4x - 13 = 23",
      "9",
      "Add 13 to both sides: 4x = 36. Divide by 4: x = 9. Check: 4(9) − 13 = 36 − 13 = 23."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Equations from worded problems
// ─────────────────────────────────────────────────────────────────────────────

const equationsWordedProblems: LessonContent = {
  description: "Translate worded problems into equations using a pronumeral, solve them, and interpret the answer in context.",
  learningIntention: "Write and solve linear equations from worded problems, and verify that the solution makes sense in the original situation.",
  successCriteria: [
    "Choose a pronumeral and state clearly what it represents.",
    "Translate a worded problem into a linear equation.",
    "Solve the equation and state the answer using the correct units and context.",
    "Check that the answer makes sense in the original problem.",
  ],
  teaching: {
    paragraphs: [
      "Many real-world problems can be solved with algebra. The key step is translating the words into an equation. Choose a letter — a pronumeral — to stand for the unknown quantity, and write down what it represents before you write any equation.",
      "Once you have the pronumeral, look for the key relationship in the problem. Words like 'add', 'more than', 'increased by' suggest addition; 'subtract', 'less than', 'decreased by' suggest subtraction; 'times', 'product', 'each' suggest multiplication. The word 'is' or 'equals' tells you where the = sign goes.",
      "For example: 'I think of a number, add 7, and get 15. What is the number?' Let n = the number. The equation is n + 7 = 15. Solving gives n = 8. Check: 8 + 7 = 15. State the answer clearly: the number is 8.",
      "After solving, always check whether the answer makes sense in the original problem. If you find a number of students is −3 or a distance is 1000 km, something went wrong. Sense-checking prevents you from writing down a technically correct algebraic answer that is physically impossible.",
    ],
    latexBlocks: [
      "\\text{Let } n = \\text{the unknown number}",
      "\\text{'a number plus 7 equals 15'} \\implies n + 7 = 15",
      "\\text{Perimeter of rectangle} = 2l + 2w",
    ],
  },
  workedExamples: [
    {
      title: "Think of a number problem",
      questionLatex: "\\text{I think of a number, add 7, and get 15. Find the number.}",
      steps: [
        { explanation: "Define the unknown. Let n = the number.", latex: "\\text{Let } n = \\text{the number.}" },
        { explanation: "Write the equation using the words of the problem.", latex: "n + 7 = 15" },
        { explanation: "Solve by subtracting 7 from both sides.", latex: "n = 15 - 7 = 8" },
        { explanation: "Check: 8 + 7 = 15. The number is 8.", latex: "8 + 7 = 15 \\checkmark" },
      ],
      finalAnswerLatex: "n = 8 \\text{ (the number is 8)}",
    },
    {
      title: "Perimeter problem",
      questionLatex: "\\text{A rectangle has perimeter 28 cm. Its width is 5 cm. Find the length.}",
      steps: [
        { explanation: "Let l = the length in cm. The perimeter formula gives an equation.", latex: "2l + 2(5) = 28" },
        { explanation: "Simplify the constant term.", latex: "2l + 10 = 28" },
        { explanation: "Subtract 10 from both sides.", latex: "2l = 18" },
        { explanation: "Divide both sides by 2.", latex: "l = 9" },
        { explanation: "Check: 2(9) + 2(5) = 18 + 10 = 28.", latex: "2(9) + 2(5) = 28 \\checkmark" },
      ],
      finalAnswerLatex: "l = 9 \\text{ cm}",
    },
    {
      title: "Age problem",
      questionLatex: "\\text{Sam is 4 years older than Alex. The sum of their ages is 26. How old is Alex?}",
      steps: [
        { explanation: "Let a = Alex's age. Then Sam's age = a + 4.", latex: "\\text{Alex} = a, \\quad \\text{Sam} = a + 4" },
        { explanation: "Write the equation: their ages add to 26.", latex: "a + (a + 4) = 26" },
        { explanation: "Simplify the left side.", latex: "2a + 4 = 26" },
        { explanation: "Subtract 4 from both sides.", latex: "2a = 22" },
        { explanation: "Divide by 2.", latex: "a = 11" },
        { explanation: "Check: Alex is 11, Sam is 15, and 11 + 15 = 26.", latex: "11 + 15 = 26 \\checkmark" },
      ],
      finalAnswerLatex: "a = 11 \\text{ (Alex is 11 years old)}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-wrd-g1",
      "I think of a number, multiply it by 3, and get 24. Which equation represents this?",
      "B",
      ["$n + 3 = 24$", "$3n = 24$", "$n - 3 = 24$", "$n \\div 3 = 24$"],
      "'Multiply by 3' means the number is multiplied by 3, giving 3n = 24. The solution is n = 8."
    ),
    answer(
      "y7-equ-wrd-g2",
      "I think of a number, subtract 6, and get 10. Let n = the number. Solve for n.",
      "n - 6 = 10",
      "16",
      "Add 6 to both sides: n = 10 + 6 = 16. Check: 16 − 6 = 10."
    ),
    answer(
      "y7-equ-wrd-g3",
      "A rectangle has length 9 cm and perimeter 30 cm. Let w = the width. Solve for w.",
      "2(9) + 2w = 30",
      "6",
      "18 + 2w = 30. Subtract 18: 2w = 12. Divide by 2: w = 6. Check: 2(9) + 2(6) = 18 + 12 = 30."
    ),
    answer(
      "y7-equ-wrd-g4",
      "I think of a number, add 9, and get 22. Let n = the number. Solve for n.",
      "n + 9 = 22",
      "13",
      "Subtract 9 from both sides: n = 22 − 9 = 13. Check: 13 + 9 = 22."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-wrd-i1",
      "Five times a number equals 45. Let n = the number. Find n.",
      "5n = 45",
      "9",
      "Divide both sides by 5: n = 45 ÷ 5 = 9."
    ),
    answer(
      "y7-equ-wrd-i2",
      "A number is doubled and then 3 is added. The result is 19. Let n = the number. Find n.",
      "2n + 3 = 19",
      "8",
      "Subtract 3: 2n = 16. Divide by 2: n = 8. Check: 2(8) + 3 = 19."
    ),
    answer(
      "y7-equ-wrd-i3",
      "Maya and Lena together have 36 stickers. Maya has 14 more than Lena. Let s = Lena's stickers. Find s.",
      "s + (s + 14) = 36",
      "11",
      "2s + 14 = 36. Subtract 14: 2s = 22. Divide by 2: s = 11. Check: 11 + 25 = 36."
    ),
    answer(
      "y7-equ-wrd-i4",
      "A square has perimeter 52 cm. Let s = the side length. Find s.",
      "4s = 52",
      "13",
      "Divide both sides by 4: s = 52 ÷ 4 = 13 cm."
    ),
    choice(
      "y7-equ-wrd-i5",
      "Which equation models this problem: 'A number is halved and 5 is subtracted, giving 7'?",
      "A",
      ["$\\dfrac{n}{2} - 5 = 7$", "$2n - 5 = 7$", "$\\dfrac{n}{2} + 5 = 7$", "$\\dfrac{n-5}{2} = 7$"],
      "'Halved' means divided by 2 (n/2), then 5 is subtracted, giving n/2 − 5 = 7. Solving: n/2 = 12, n = 24."
    ),
  ],
  commonMistakes: [
    { mistake: "Setting up the wrong equation — reversing the relationship: 'Sam is 4 older than Alex' written as a = s + 4 instead of s = a + 4.", fix: "Read carefully who is older. If Sam is 4 older than Alex, Sam's age = Alex's age + 4." },
    { mistake: "Forgetting to state what the pronumeral represents before writing the equation.", fix: "Always write 'Let n = …' first. Without this, the equation has no meaning." },
    { mistake: "Giving a purely algebraic answer without interpreting it in context.", fix: "If the question asks for the number of students, write 'There are 11 students', not just n = 11." },
    { mistake: "Not checking whether the answer makes sense — for example, accepting a negative number of people.", fix: "After solving, re-read the problem and ask whether the answer is physically possible." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-wrd-m1",
      "I think of a number, subtract 11, and get 7. Let n = the number. Find n.",
      "n - 11 = 7",
      "18",
      "Add 11 to both sides: n = 7 + 11 = 18."
    ),
    answer(
      "y7-equ-wrd-m2",
      "A number is multiplied by 6 and then 4 is added, giving 34. Let n = the number. Find n.",
      "6n + 4 = 34",
      "5",
      "Subtract 4: 6n = 30. Divide by 6: n = 5. Check: 6(5) + 4 = 34."
    ),
    choice(
      "y7-equ-wrd-m3",
      "Which equation models: 'Three less than four times a number is 17'?",
      "C",
      ["$4n + 3 = 17$", "$3 - 4n = 17$", "$4n - 3 = 17$", "$4(n - 3) = 17$"],
      "'Four times a number' is 4n; 'three less than' means subtract 3 from 4n, giving 4n − 3 = 17. Solving: n = 5."
    ),
    answer(
      "y7-equ-wrd-m4",
      "The perimeter of an equilateral triangle is 39 cm. Let s = the side length in cm. Find s.",
      "3s = 39",
      "13",
      "All three sides are equal, so 3s = 39. Divide by 3: s = 13 cm."
    ),
    answer(
      "y7-equ-wrd-m5",
      "Two friends share $50. One receives $8 more than the other. Let a = the smaller share. Find a.",
      "a + (a + 8) = 50",
      "21",
      "2a + 8 = 50. Subtract 8: 2a = 42. Divide by 2: a = 21. Check: 21 + 29 = 50."
    ),
    answer(
      "y7-equ-wrd-m6",
      "I think of a number, divide it by 4, and add 3 to get 8. Let n = the number. Find n.",
      "\\dfrac{n}{4} + 3 = 8",
      "20",
      "Subtract 3: n/4 = 5. Multiply by 4: n = 20. Check: 20/4 + 3 = 8."
    ),
    choice(
      "y7-equ-wrd-m7",
      "A rectangle's length is 3 times its width. The perimeter is 48 cm. What is the width?",
      "B",
      ["8 cm", "6 cm", "12 cm", "4 cm"],
      "Let w = width, so length = 3w. Perimeter: 2(3w) + 2w = 48, giving 8w = 48, w = 6 cm.",
      "2(3w) + 2w = 48"
    ),
    answer(
      "y7-equ-wrd-m8",
      "Tickets cost $9 each. Mia spent $63 on tickets. Let t = the number of tickets. Find t.",
      "9t = 63",
      "7",
      "Divide both sides by 9: t = 63 ÷ 9 = 7 tickets."
    ),
    answer(
      "y7-equ-wrd-m9",
      "Three consecutive integers add to 48. Let n = the smallest integer. Find n.",
      "n + (n+1) + (n+2) = 48",
      "15",
      "3n + 3 = 48. Subtract 3: 3n = 45. Divide by 3: n = 15. The three integers are 15, 16, 17."
    ),
    answer(
      "y7-equ-wrd-m10",
      "A bag of apples weighs 2 kg more than a bag of oranges. Together they weigh 14 kg. Let o = the mass of oranges in kg. Find o.",
      "o + (o + 2) = 14",
      "6",
      "2o + 2 = 14. Subtract 2: 2o = 12. Divide by 2: o = 6 kg. Check: 6 + 8 = 14."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Quadratic equations of the form ax² = c
// ─────────────────────────────────────────────────────────────────────────────

const quadraticEquationsAxSquaredEqualsC: LessonContent = {
  description: "Solve equations of the form ax² = c by isolating x² and taking the square root, giving both positive and negative solutions where appropriate.",
  learningIntention: "Solve quadratic equations of the form ax² = c by isolating x² then taking the square root, and recognise when no real solution exists.",
  successCriteria: [
    "Isolate x² by dividing both sides by the coefficient.",
    "Take the square root of both sides, giving both the positive and negative root when the context allows.",
    "Identify that x² = negative number has no real solution.",
    "Solve equations of the form ax² = c including cases like 2x² = 50.",
  ],
  teaching: {
    paragraphs: [
      "A quadratic equation contains x² (x squared) as the highest power. The simplest type is ax² = c, where there are no other x terms. To solve it, first isolate x² by dividing both sides by the coefficient a, then take the square root of both sides.",
      "When you take the square root, remember there are always two square roots of a positive number: one positive and one negative. For x² = 25, both x = 5 and x = −5 are solutions, because 5² = 25 and (−5)² = 25. We write x = 5 or x = −5, which is often written as x = ±5.",
      "Some questions will ask for 'the positive solution' or 'the value of x if x > 0' — in those cases, give only the positive root. This makes the answer auto-markable and reflects the most common exam framing at this level.",
      "If x² equals a negative number — for example x² = −4 — there is no real solution. No real number squared gives a negative result, because squaring always produces zero or a positive value.",
    ],
    latexBlocks: [
      "ax^2 = c \\implies x^2 = \\frac{c}{a} \\implies x = \\pm\\sqrt{\\frac{c}{a}}",
      "x^2 = 25 \\implies x = 5 \\text{ or } x = -5",
      "x^2 = -4 \\implies \\text{no real solution (squaring never gives a negative)}",
    ],
  },
  workedExamples: [
    {
      title: "Solve x² = 25",
      questionLatex: "\\text{Solve } x^2 = 25.",
      steps: [
        { explanation: "x² is already isolated. Take the square root of both sides.", latex: "x = \\pm\\sqrt{25}" },
        { explanation: "Evaluate the square root.", latex: "x = 5 \\text{ or } x = -5" },
        { explanation: "Verify both solutions: 5² = 25 and (−5)² = 25.", latex: "5^2 = 25 \\checkmark, \\quad (-5)^2 = 25 \\checkmark" },
      ],
      finalAnswerLatex: "x = 5 \\text{ or } x = -5",
    },
    {
      title: "Solve 2x² = 50",
      questionLatex: "\\text{Solve } 2x^2 = 50.",
      steps: [
        { explanation: "Divide both sides by 2 to isolate x².", latex: "x^2 = \\frac{50}{2} = 25" },
        { explanation: "Take the square root of both sides.", latex: "x = \\pm\\sqrt{25}" },
        { explanation: "Evaluate.", latex: "x = 5 \\text{ or } x = -5" },
        { explanation: "Check: 2(5²) = 2(25) = 50.", latex: "2(25) = 50 \\checkmark" },
      ],
      finalAnswerLatex: "x = 5 \\text{ or } x = -5",
    },
    {
      title: "Recognise no real solution",
      questionLatex: "\\text{Solve } x^2 = -4.",
      steps: [
        { explanation: "x² is isolated. Consider what x² = −4 means.", latex: "x^2 = -4" },
        { explanation: "Squaring any real number gives zero or a positive result, never a negative. So there is no real number x such that x² = −4.", latex: "\\text{No real solution exists.}" },
      ],
      finalAnswerLatex: "\\text{No real solution}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-qdr-g1",
      "How many real solutions does x² = 36 have?",
      "C",
      ["None", "One (x = 6 only)", "Two (x = 6 and x = −6)", "Three"],
      "Taking the square root of a positive number gives two solutions: x = 6 and x = −6, since both square to 36.",
      "x^2 = 36"
    ),
    answer(
      "y7-equ-qdr-g2",
      "Solve x² = 49. Find the positive solution.",
      "x^2 = 49",
      "7",
      "Take the square root: x = 7 or x = −7. The positive solution is x = 7. Note: x = −7 is also a valid solution.",
      ["7"]
    ),
    answer(
      "y7-equ-qdr-g3",
      "Solve 3x² = 75. Find the positive solution.",
      "3x^2 = 75",
      "5",
      "Divide both sides by 3: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.",
      ["5"]
    ),
    answer(
      "y7-equ-qdr-g4",
      "Solve 5x² = 80. Find the positive solution.",
      "5x^2 = 80",
      "4",
      "Divide both sides by 5: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4.",
      ["4"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-qdr-i1",
      "Solve x² = 64. Find the positive solution.",
      "x^2 = 64",
      "8",
      "Take the square root: x = 8 or x = −8. The positive solution is x = 8.",
      ["8"]
    ),
    answer(
      "y7-equ-qdr-i2",
      "Solve 4x² = 100. Find the positive solution.",
      "4x^2 = 100",
      "5",
      "Divide by 4: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.",
      ["5"]
    ),
    answer(
      "y7-equ-qdr-i3",
      "Solve 2x² = 72. Find the positive solution.",
      "2x^2 = 72",
      "6",
      "Divide by 2: x² = 36. Take the square root: x = 6 or x = −6. The positive solution is x = 6.",
      ["6"]
    ),
    answer(
      "y7-equ-qdr-i4",
      "Solve x² = 121. Find the negative solution.",
      "x^2 = 121",
      "-11",
      "Take the square root: x = 11 or x = −11. The negative solution is x = −11.",
      ["−11"]
    ),
    choice(
      "y7-equ-qdr-i5",
      "Which equation has no real solution?",
      "D",
      ["$x^2 = 1$", "$x^2 = 0$", "$2x^2 = 8$", "$x^2 = -9$"],
      "x² = −9 has no real solution because squaring any real number cannot give a negative result. All other options have non-negative right-hand sides."
    ),
  ],
  commonMistakes: [
    { mistake: "Forgetting the negative solution: solving x² = 25 and giving only x = 5.", fix: "Taking the square root of a positive number always gives two solutions: x = 5 and x = −5. Check which solutions the question asks for." },
    { mistake: "Trying to take the square root before isolating x²: for 2x² = 50, writing x = ±√50 ÷ 2.", fix: "Divide by the coefficient first: x² = 25. Then take the square root to get x = ±5." },
    { mistake: "Saying x² = −4 has solution x = −2 (thinking the negative sign cancels).", fix: "Squaring always gives a non-negative result. x² = −4 has no real solution." },
    { mistake: "Writing x = ±√25 = ±(±5), creating four 'answers'.", fix: "√25 = 5 (the principal positive root). Then the two solutions are x = 5 and x = −5." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-qdr-m1",
      "Solve x² = 81. Find the positive solution.",
      "x^2 = 81",
      "9",
      "Take the square root: x = 9 or x = −9. The positive solution is x = 9. Note: x = −9 is also a valid solution."
    ),
    answer(
      "y7-equ-qdr-m2",
      "Solve 2x² = 32. Find the positive solution.",
      "2x^2 = 32",
      "4",
      "Divide by 2: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4."
    ),
    choice(
      "y7-equ-qdr-m3",
      "What are the solutions of x² = 100?",
      "C",
      ["$x = 10$ only", "$x = 50$ only", "$x = 10$ or $x = -10$", "$x = 10$ or $x = 0$"],
      "Both 10² = 100 and (−10)² = 100, so x = 10 or x = −10 are both solutions."
    ),
    answer(
      "y7-equ-qdr-m4",
      "Solve 3x² = 48. Find the positive solution.",
      "3x^2 = 48",
      "4",
      "Divide by 3: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4."
    ),
    answer(
      "y7-equ-qdr-m5",
      "Solve x² = 144. Find the negative solution.",
      "x^2 = 144",
      "-12",
      "Take the square root: x = 12 or x = −12. The negative solution is x = −12.",
      ["−12"]
    ),
    answer(
      "y7-equ-qdr-m6",
      "Solve 5x² = 125. Find the positive solution.",
      "5x^2 = 125",
      "5",
      "Divide by 5: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5."
    ),
    choice(
      "y7-equ-qdr-m7",
      "How many real solutions does x² = −16 have?",
      "A",
      ["None", "One", "Two", "Four"],
      "No real number squared equals a negative number. x² = −16 has no real solution."
    ),
    answer(
      "y7-equ-qdr-m8",
      "Solve 4x² = 196. Find the positive solution.",
      "4x^2 = 196",
      "7",
      "Divide by 4: x² = 49. Take the square root: x = 7 or x = −7. The positive solution is x = 7."
    ),
    answer(
      "y7-equ-qdr-m9",
      "Solve 6x² = 54. Find the positive solution.",
      "6x^2 = 54",
      "3",
      "Divide by 6: x² = 9. Take the square root: x = 3 or x = −3. The positive solution is x = 3."
    ),
    choice(
      "y7-equ-qdr-m10",
      "A student solves 2x² = 18 and gets x = 3 only. What is missing from their answer?",
      "B",
      ["They should also give x = 0.", "They should also give x = −3.", "They should also give x = 9.", "Their answer is complete."],
      "Dividing by 2 gives x² = 9. Taking the square root gives x = 3 or x = −3. Both solutions must be stated — the student omitted x = −3.",
      "2x^2 = 18"
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lessons map and export
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "one-step-equations": oneStepEquations,
  "two-step-equations": twoStepEquations,
  "equations-worded-problems": equationsWordedProblems,
  "quadratic-equations-ax2-equals-c": quadraticEquationsAxSquaredEqualsC,
};

export function year7EquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "equations") {
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
