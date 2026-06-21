import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

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

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint,
    explanation,
  };
}

// ── Lesson 1: Solving One-Step Equations ─────────────────────────────────────

const solvingOneStepEquations: LessonContent = {
  description:
    "Solve equations that require a single inverse operation to isolate the variable, and verify solutions by substituting back into the original equation.",
  learningIntention:
    "Use a single inverse operation to solve equations involving addition, subtraction, multiplication and division.",
  successCriteria: [
    "Identify which operation has been applied to the variable in the equation.",
    "Apply the correct inverse operation to both sides to isolate the variable.",
    "Solve equations of the form x + a = b, x − a = b, ax = b, and x ÷ a = b.",
    "Verify a solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "An equation is a statement that two expressions are equal. Solving it means finding the value of the variable that makes the statement true. In x + 5 = 12, you need the value of x that makes the left side equal to 12.",
      "Every operation has an inverse that undoes it. The inverse of adding is subtracting; the inverse of subtracting is adding; the inverse of multiplying is dividing; the inverse of dividing is multiplying.",
      "To isolate the variable, apply the inverse of whatever was done to it — to both sides. This keeps the equation balanced. If you subtract 5 from the left side, you must subtract 5 from the right side too.",
      "Always check: substitute your answer back into the original equation. For x + 5 = 12 with x = 7: 7 + 5 = 12. Since both sides match, x = 7 is correct.",
    ],
    latexBlocks: [
      "x + 5 = 12 \\Rightarrow x = 12 - 5 = 7",
      "4x = 28 \\Rightarrow x = 28 \\div 4 = 7",
      "\\dfrac{x}{3} = 6 \\Rightarrow x = 6 \\times 3 = 18",
    ],
  },
  workedExamples: [
    {
      title: "Solve an addition equation",
      questionLatex: "\\text{Solve }x + 9 = 16.",
      steps: [
        {
          explanation: "The variable has 9 added to it, so subtract 9 from both sides.",
          latex: "x + 9 - 9 = 16 - 9",
        },
        {
          explanation: "Simplify both sides.",
          latex: "x = 7",
        },
      ],
      finalAnswerLatex: "x = 7",
    } as WorkedExample,
    {
      title: "Solve a multiplication equation",
      questionLatex: "\\text{Solve }7x = 42.",
      steps: [
        {
          explanation: "The variable is multiplied by 7, so divide both sides by 7.",
          latex: "\\dfrac{7x}{7} = \\dfrac{42}{7}",
        },
        {
          explanation: "Simplify.",
          latex: "x = 6",
        },
      ],
      finalAnswerLatex: "x = 6",
    } as WorkedExample,
    {
      title: "Solve a division equation",
      questionLatex: "\\text{Solve }\\dfrac{x}{5} = 8.",
      steps: [
        {
          explanation: "The variable is divided by 5, so multiply both sides by 5.",
          latex: "\\dfrac{x}{5} \\times 5 = 8 \\times 5",
        },
        {
          explanation: "Simplify.",
          latex: "x = 40",
        },
      ],
      finalAnswerLatex: "x = 40",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-1eq-g1",
      "To solve x − 5 = 8, which inverse operation is needed?",
      "B",
      [
        "Subtract 5 from both sides",
        "Add 5 to both sides",
        "Multiply both sides by 5",
        "Divide both sides by 5",
      ],
      "The inverse of subtracting 5 is adding 5. Adding 5 to both sides gives x = 13.",
      "Ask: what was done to x? Then use the opposite operation."
    ),
    answer(
      "y8-aeq-1eq-g2",
      "Solve x + 9 = 15.",
      "x + 9 = 15,\\quad x = \\;?",
      "6",
      "Subtract 9 from both sides: x = 15 − 9 = 6.",
      "Subtract 9 from both sides to remove the 9 from the left side.",
      ["x = 6"]
    ),
    answer(
      "y8-aeq-1eq-g3",
      "Solve 8x = 48.",
      "8x = 48,\\quad x = \\;?",
      "6",
      "Divide both sides by 8: x = 48 ÷ 8 = 6.",
      "Divide both sides by 8 to undo the multiplication.",
      ["x = 6"]
    ),
    answer(
      "y8-aeq-1eq-g4",
      "Solve x − 4 = 11.",
      "x - 4 = 11,\\quad x = \\;?",
      "15",
      "Add 4 to both sides: x = 11 + 4 = 15.",
      "Add 4 to both sides to undo the subtraction.",
      ["x = 15"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-1eq-i1",
      "Solve x ÷ 6 = 4.",
      "x \\div 6 = 4,\\quad x = \\;?",
      "24",
      "Multiply both sides by 6: x = 4 × 6 = 24.",
      "The inverse of dividing by 6 is multiplying by 6.",
      ["x = 24"]
    ),
    answer(
      "y8-aeq-1eq-i2",
      "Solve x + 17 = 30.",
      "x + 17 = 30,\\quad x = \\;?",
      "13",
      "Subtract 17 from both sides: x = 30 − 17 = 13.",
      "Undo the addition by subtracting 17 from both sides.",
      ["x = 13"]
    ),
    answer(
      "y8-aeq-1eq-i3",
      "Solve 9x = 63.",
      "9x = 63,\\quad x = \\;?",
      "7",
      "Divide both sides by 9: x = 63 ÷ 9 = 7.",
      "Undo the multiplication by dividing both sides by 9.",
      ["x = 7"]
    ),
    choice(
      "y8-aeq-1eq-i4",
      "Which equation has the solution x = 4?",
      "B",
      [
        "$x + 7 = 12$",
        "\\(2x = 8\\)",
        "$x - 4 = 8$",
        "$x \\div 4 = 2$",
      ],
      "Check B: 2 × 4 = 8 ✓. Check A: 4 + 7 = 11 ≠ 12. Check C: 4 − 4 = 0 ≠ 8. Check D: 4 ÷ 4 = 1 ≠ 2.",
      "Substitute x = 4 into each equation and see which gives a true statement."
    ),
    answer(
      "y8-aeq-1eq-i5",
      "Solve x − 13 = 7.",
      "x - 13 = 7,\\quad x = \\;?",
      "20",
      "Add 13 to both sides: x = 7 + 13 = 20.",
      "Undo the subtraction by adding 13 to both sides.",
      ["x = 20"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the same operation instead of the inverse: solving x + 7 = 12 as x = 12 + 7 = 19.",
      fix: "The inverse of addition is subtraction. Subtract the constant from both sides: x = 12 − 7 = 5.",
    },
    {
      mistake: "Applying the inverse to only one side: subtracting 4 from the left but not the right.",
      fix: "An equation stays balanced only when the same operation is performed on both sides.",
    },
    {
      mistake: "Multiplying to undo multiplication: solving 4x = 28 by multiplying both sides by 4.",
      fix: "To undo multiplication by 4, divide by 4: x = 28 ÷ 4 = 7.",
    },
    {
      mistake: "Not checking the answer by substituting it back into the original equation.",
      fix: "Substitute your answer back. For x − 5 = 8 with x = 13: 13 − 5 = 8. ✓",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-1eq-m1",
      "Solve x + 8 = 23.",
      "x + 8 = 23,\\quad x = \\;?",
      "15",
      "Subtract 8 from both sides: x = 23 − 8 = 15.",
      "Subtract the constant from both sides.",
      ["x = 15"]
    ),
    answer(
      "y8-aeq-1eq-m2",
      "Solve 6x = 54.",
      "6x = 54,\\quad x = \\;?",
      "9",
      "Divide both sides by 6: x = 54 ÷ 6 = 9.",
      "Divide both sides by the coefficient.",
      ["x = 9"]
    ),
    choice(
      "y8-aeq-1eq-m3",
      "What is the solution to 3x = 27?",
      "A",
      ["$x = 9$", "$x = 24$", "$x = 81$", "$x = 8$"],
      "Divide both sides by 3: x = 27 ÷ 3 = 9.",
      "Divide both sides by 3.",
      "3x = 27,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-1eq-m4",
      "Solve x − 6 = 18.",
      "x - 6 = 18,\\quad x = \\;?",
      "24",
      "Add 6 to both sides: x = 18 + 6 = 24.",
      "Add the constant to both sides.",
      ["x = 24"]
    ),
    answer(
      "y8-aeq-1eq-m5",
      "Solve x ÷ 7 = 8.",
      "x \\div 7 = 8,\\quad x = \\;?",
      "56",
      "Multiply both sides by 7: x = 8 × 7 = 56.",
      "Multiply both sides by the divisor.",
      ["x = 56"]
    ),
    choice(
      "y8-aeq-1eq-m6",
      "A student solves x + 4 = 10 by writing x = 10 + 4 = 14. What is wrong?",
      "B",
      [
        "Adding undoes addition, so x = 14 is correct",
        "The inverse of addition is subtraction; x = 10 − 4 = 6",
        "Both sides must be divided by 4",
        "Subtract 10 from both sides to get x = −6",
      ],
      "To undo adding 4, subtract 4 from both sides: x = 10 − 4 = 6.",
      "Which operation undoes addition?"
    ),
    answer(
      "y8-aeq-1eq-m7",
      "Solve 11x = 77.",
      "11x = 77,\\quad x = \\;?",
      "7",
      "Divide both sides by 11: x = 77 ÷ 11 = 7.",
      "Divide both sides by the coefficient of x.",
      ["x = 7"]
    ),
    answer(
      "y8-aeq-1eq-m8",
      "Solve x + 25 = 40.",
      "x + 25 = 40,\\quad x = \\;?",
      "15",
      "Subtract 25 from both sides: x = 40 − 25 = 15.",
      "Subtract 25 from both sides.",
      ["x = 15"]
    ),
    choice(
      "y8-aeq-1eq-m9",
      "Solve x ÷ 9 = 5.",
      "A",
      ["$x = 45$", "$x = 14$", "$x = 4$", "$x = 1.8$"],
      "Multiply both sides by 9: x = 5 × 9 = 45.",
      "The inverse of dividing by 9 is multiplying by 9.",
      "x \\div 9 = 5,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-1eq-m10",
      "Solve x − 15 = 19.",
      "x - 15 = 19,\\quad x = \\;?",
      "34",
      "Add 15 to both sides: x = 19 + 15 = 34.",
      "Add the constant to both sides.",
      ["x = 34"]
    ),
  ],
};

// ── Lesson 2: Solving Two-Step Equations ─────────────────────────────────────

const solvingTwoStepEquations: LessonContent = {
  description:
    "Solve equations that require two inverse operations to isolate the variable, undoing the operations in reverse order.",
  learningIntention:
    "Solve two-step equations by undoing the constant term first and then the coefficient of the variable.",
  successCriteria: [
    "Identify the two operations applied to the variable.",
    "Undo addition or subtraction before undoing multiplication or division.",
    "Solve two-step equations with integer solutions.",
    "Verify solutions by substituting back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "A two-step equation has two operations applied to the variable. In 3x + 5 = 20, the variable x has been multiplied by 3 and then had 5 added. To solve, undo these in reverse order.",
      "Always undo addition or subtraction first — remove the constant term from the side with the variable. Then undo the multiplication or division. This reverse order works because it mirrors how the expression was built.",
      "Write each simplified equation on a new line so you can follow the working clearly. For 3x + 5 = 20: subtract 5 to get 3x = 15, then divide by 3 to get x = 5.",
      "Verify by substituting back: 3(5) + 5 = 15 + 5 = 20. ✓",
    ],
    latexBlocks: [
      "3x + 5 = 20 \\Rightarrow 3x = 15 \\Rightarrow x = 5",
      "\\dfrac{x}{4} - 3 = 2 \\Rightarrow \\dfrac{x}{4} = 5 \\Rightarrow x = 20",
      "\\text{Step 1: undo } + \\text{ or } -,\\quad \\text{Step 2: undo } \\times \\text{ or } \\div",
    ],
  },
  workedExamples: [
    {
      title: "Undo addition then multiplication",
      questionLatex: "\\text{Solve }4x + 3 = 23.",
      steps: [
        {
          explanation: "Subtract 3 from both sides to remove the constant.",
          latex: "4x + 3 - 3 = 23 - 3 \\Rightarrow 4x = 20",
        },
        {
          explanation: "Divide both sides by 4 to isolate x.",
          latex: "x = 20 \\div 4 = 5",
        },
        {
          explanation: "Check: 4(5) + 3 = 23. ✓",
          latex: "4(5) + 3 = 23\\checkmark",
        },
      ],
      finalAnswerLatex: "x = 5",
    } as WorkedExample,
    {
      title: "Undo subtraction then multiplication",
      questionLatex: "\\text{Solve }6x - 7 = 11.",
      steps: [
        {
          explanation: "Add 7 to both sides to remove the constant.",
          latex: "6x = 18",
        },
        {
          explanation: "Divide both sides by 6.",
          latex: "x = 3",
        },
      ],
      finalAnswerLatex: "x = 3",
    } as WorkedExample,
    {
      title: "Undo addition then division",
      questionLatex: "\\text{Solve }\\dfrac{x}{4} + 3 = 8.",
      steps: [
        {
          explanation: "Subtract 3 from both sides.",
          latex: "\\dfrac{x}{4} = 5",
        },
        {
          explanation: "Multiply both sides by 4.",
          latex: "x = 20",
        },
      ],
      finalAnswerLatex: "x = 20",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-2eq-g1",
      "What is the first step when solving 5x − 8 = 22?",
      "B",
      [
        "Divide both sides by 5",
        "Add 8 to both sides",
        "Subtract 22 from both sides",
        "Multiply both sides by 5",
      ],
      "Undo addition and subtraction before multiplication. Add 8 to both sides: 5x = 30.",
      "Which operation is furthest from x in the expression 5x − 8?"
    ),
    answer(
      "y8-aeq-2eq-g2",
      "Solve 4x + 3 = 23.",
      "4x + 3 = 23,\\quad x = \\;?",
      "5",
      "Subtract 3 from both sides: 4x = 20. Divide by 4: x = 5.",
      "Subtract 3 from both sides first, then divide by 4.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-2eq-g3",
      "Solve 3x − 9 = 6.",
      "3x - 9 = 6,\\quad x = \\;?",
      "5",
      "Add 9 to both sides: 3x = 15. Divide by 3: x = 5.",
      "Add 9 to both sides first, then divide by 3.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-2eq-g4",
      "Solve x/5 + 2 = 6.",
      "\\dfrac{x}{5} + 2 = 6,\\quad x = \\;?",
      "20",
      "Subtract 2 from both sides: x/5 = 4. Multiply by 5: x = 20.",
      "Subtract 2 from both sides first, then multiply by 5.",
      ["x = 20"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-2eq-i1",
      "Solve 2x + 9 = 21.",
      "2x + 9 = 21,\\quad x = \\;?",
      "6",
      "Subtract 9 from both sides: 2x = 12. Divide by 2: x = 6.",
      "Undo the constant term first, then undo the coefficient.",
      ["x = 6"]
    ),
    answer(
      "y8-aeq-2eq-i2",
      "Solve 6x − 5 = 25.",
      "6x - 5 = 25,\\quad x = \\;?",
      "5",
      "Add 5 to both sides: 6x = 30. Divide by 6: x = 5.",
      "Undo the subtraction first, then divide by 6.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-2eq-i3",
      "Solve x/3 + 6 = 10.",
      "\\dfrac{x}{3} + 6 = 10,\\quad x = \\;?",
      "12",
      "Subtract 6 from both sides: x/3 = 4. Multiply by 3: x = 12.",
      "Subtract 6 first, then multiply both sides by 3.",
      ["x = 12"]
    ),
    choice(
      "y8-aeq-2eq-i4",
      "Solve 4x − 7 = 13.",
      "C",
      ["$x = 1.5$", "$x = 3$", "$x = 5$", "$x = 20$"],
      "Add 7 to both sides: 4x = 20. Divide by 4: x = 5.",
      "Undo the subtraction first, then undo the multiplication.",
      "4x - 7 = 13,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-2eq-i5",
      "Solve 7x + 4 = 39.",
      "7x + 4 = 39,\\quad x = \\;?",
      "5",
      "Subtract 4 from both sides: 7x = 35. Divide by 7: x = 5.",
      "Subtract 4 first, then divide by 7.",
      ["x = 5"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing before removing the constant: for 3x + 6 = 21, dividing by 3 first to get x + 6 = 7.",
      fix: "Subtract the constant first: 3x = 15, then divide: x = 5.",
    },
    {
      mistake: "Applying an operation to only one side of the equation.",
      fix: "Every step must be applied to both sides equally to keep the equation balanced.",
    },
    {
      mistake: "Forgetting to divide after removing the constant: stopping at 3x = 15.",
      fix: "Once the constant is removed, divide both sides by the coefficient of x.",
    },
    {
      mistake: "Not checking the solution by substituting back into the original equation.",
      fix: "Substitute back: for 3x − 9 = 6 with x = 5, check 3(5) − 9 = 6. ✓",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-2eq-m1",
      "Solve 3x + 8 = 29.",
      "3x + 8 = 29,\\quad x = \\;?",
      "7",
      "Subtract 8: 3x = 21. Divide by 3: x = 7.",
      "Subtract 8 from both sides, then divide by 3.",
      ["x = 7"]
    ),
    answer(
      "y8-aeq-2eq-m2",
      "Solve 5x − 12 = 18.",
      "5x - 12 = 18,\\quad x = \\;?",
      "6",
      "Add 12: 5x = 30. Divide by 5: x = 6.",
      "Add 12 to both sides, then divide by 5.",
      ["x = 6"]
    ),
    choice(
      "y8-aeq-2eq-m3",
      "Solve 2x + 11 = 25.",
      "B",
      ["$x = 18$", "$x = 7$", "$x = 4$", "$x = 12$"],
      "Subtract 11: 2x = 14. Divide by 2: x = 7.",
      "Subtract 11 first, then divide by 2.",
      "2x + 11 = 25,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-2eq-m4",
      "Solve x/6 + 4 = 9.",
      "\\dfrac{x}{6} + 4 = 9,\\quad x = \\;?",
      "30",
      "Subtract 4: x/6 = 5. Multiply by 6: x = 30.",
      "Subtract 4 from both sides, then multiply by 6.",
      ["x = 30"]
    ),
    answer(
      "y8-aeq-2eq-m5",
      "Solve 8x − 3 = 45.",
      "8x - 3 = 45,\\quad x = \\;?",
      "6",
      "Add 3: 8x = 48. Divide by 8: x = 6.",
      "Add 3 to both sides, then divide by 8.",
      ["x = 6"]
    ),
    choice(
      "y8-aeq-2eq-m6",
      "What is the correct first step when solving x/4 − 5 = 3?",
      "B",
      [
        "Multiply both sides by 4",
        "Add 5 to both sides",
        "Subtract 3 from both sides",
        "Divide both sides by 4",
      ],
      "Undo subtraction first: add 5 to both sides to get x/4 = 8, then multiply by 4 to get x = 32.",
      "Which operation is furthest from x in x/4 − 5?"
    ),
    answer(
      "y8-aeq-2eq-m7",
      "Solve 9x + 7 = 52.",
      "9x + 7 = 52,\\quad x = \\;?",
      "5",
      "Subtract 7: 9x = 45. Divide by 9: x = 5.",
      "Subtract 7 from both sides, then divide by 9.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-2eq-m8",
      "Solve 4x − 15 = 1.",
      "4x - 15 = 1,\\quad x = \\;?",
      "4",
      "Add 15: 4x = 16. Divide by 4: x = 4.",
      "Add 15 to both sides, then divide by 4.",
      ["x = 4"]
    ),
    choice(
      "y8-aeq-2eq-m9",
      "A student solves 3x + 6 = 24 by writing x + 6 = 8, so x = 2. What is the correct approach?",
      "B",
      [
        "The student is correct; x = 2",
        "Subtract 6 from both sides first: 3x = 18, then divide by 3 to get x = 6",
        "Divide all terms by 3 after moving the 6: x = 6/3 = 2",
        "Add 6 to both sides first: 3x = 30, then divide by 3",
      ],
      "The correct first step is subtracting 6: 3x = 18. Then divide by 3: x = 6.",
      "What should be done to both sides before dividing by 3?"
    ),
    answer(
      "y8-aeq-2eq-m10",
      "Solve x/2 + 7 = 15.",
      "\\dfrac{x}{2} + 7 = 15,\\quad x = \\;?",
      "16",
      "Subtract 7: x/2 = 8. Multiply by 2: x = 16.",
      "Subtract 7 from both sides, then multiply by 2.",
      ["x = 16"]
    ),
  ],
};

// ── Lesson 3: Equations with Brackets ────────────────────────────────────────

const equationsWithBrackets: LessonContent = {
  description:
    "Solve linear equations that contain brackets by expanding first and then applying inverse operations.",
  learningIntention:
    "Expand brackets using the distributive law and then solve the resulting two-step equation.",
  successCriteria: [
    "Expand brackets in an equation using the distributive law.",
    "Solve the two-step equation that results from expanding.",
    "Recognise when dividing both sides first is an efficient alternative to expanding.",
    "Check solutions by substituting back into the original equation with brackets.",
  ],
  teaching: {
    paragraphs: [
      "When an equation contains brackets, the brackets must be removed before solving. To do this, multiply every term inside the bracket by the term outside — this is the distributive law.",
      "For example, 3(x + 4) = 21 becomes 3x + 12 = 21 after expanding. Then subtract 12 to get 3x = 9, and divide by 3 to get x = 3.",
      "Sometimes you can avoid expanding by dividing both sides first. In 3(x + 4) = 21, dividing both sides by 3 gives x + 4 = 7, so x = 3. This only works cleanly when the right side is divisible by the coefficient.",
      "Always check: for x = 3, substitute back into the original: 3(3 + 4) = 3 × 7 = 21. ✓",
    ],
    latexBlocks: [
      "a(b + c) = ab + ac",
      "3(x + 4) = 21 \\Rightarrow 3x + 12 = 21 \\Rightarrow 3x = 9 \\Rightarrow x = 3",
      "\\text{Check: }3(3 + 4) = 3 \\times 7 = 21\\checkmark",
    ],
  },
  workedExamples: [
    {
      title: "Expand then solve",
      questionLatex: "\\text{Solve }2(x + 5) = 18.",
      steps: [
        {
          explanation: "Expand the bracket using the distributive law.",
          latex: "2x + 10 = 18",
        },
        {
          explanation: "Subtract 10 from both sides.",
          latex: "2x = 8",
        },
        {
          explanation: "Divide both sides by 2.",
          latex: "x = 4",
        },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
    {
      title: "Brackets with a variable term inside",
      questionLatex: "\\text{Solve }3(2x - 1) = 21.",
      steps: [
        {
          explanation: "Expand: multiply 3 by each term inside the bracket.",
          latex: "6x - 3 = 21",
        },
        {
          explanation: "Add 3 to both sides.",
          latex: "6x = 24",
        },
        {
          explanation: "Divide both sides by 6.",
          latex: "x = 4",
        },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
    {
      title: "Dividing both sides first",
      questionLatex: "\\text{Solve }4(x + 3) = 32.",
      steps: [
        {
          explanation: "Divide both sides by 4 to remove the coefficient outside the bracket.",
          latex: "x + 3 = 8",
        },
        {
          explanation: "Subtract 3 from both sides.",
          latex: "x = 5",
        },
      ],
      finalAnswerLatex: "x = 5",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-bkt-g1",
      "What is the first step when solving 3(x + 4) = 24?",
      "C",
      [
        "Add 4 to both sides",
        "Divide both sides by 4",
        "Expand to get 3x + 12 = 24",
        "Subtract 3 from both sides",
      ],
      "Expand the bracket first: 3(x + 4) = 3x + 12, giving 3x + 12 = 24.",
      "Apply the distributive law to remove the bracket."
    ),
    answer(
      "y8-aeq-bkt-g2",
      "Solve 2(x + 5) = 18.",
      "2(x + 5) = 18,\\quad x = \\;?",
      "4",
      "Expand: 2x + 10 = 18. Subtract 10: 2x = 8. Divide by 2: x = 4.",
      "Expand the bracket first: 2 × x and 2 × 5.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-bkt-g3",
      "Solve 3(x − 2) = 15.",
      "3(x - 2) = 15,\\quad x = \\;?",
      "7",
      "Expand: 3x − 6 = 15. Add 6: 3x = 21. Divide by 3: x = 7.",
      "Expand first: 3 × x = 3x and 3 × (−2) = −6.",
      ["x = 7"]
    ),
    answer(
      "y8-aeq-bkt-g4",
      "Solve 4(2x + 1) = 20.",
      "4(2x + 1) = 20,\\quad x = \\;?",
      "2",
      "Expand: 8x + 4 = 20. Subtract 4: 8x = 16. Divide by 8: x = 2.",
      "Expand first: 4 × 2x = 8x and 4 × 1 = 4.",
      ["x = 2"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-bkt-i1",
      "Solve 5(x + 3) = 35.",
      "5(x + 3) = 35,\\quad x = \\;?",
      "4",
      "Expand: 5x + 15 = 35. Subtract 15: 5x = 20. Divide by 5: x = 4.",
      "Expand the bracket, then solve the two-step equation.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-bkt-i2",
      "Solve 2(3x − 4) = 16.",
      "2(3x - 4) = 16,\\quad x = \\;?",
      "4",
      "Expand: 6x − 8 = 16. Add 8: 6x = 24. Divide by 6: x = 4.",
      "Expand first: 2 × 3x = 6x and 2 × (−4) = −8.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-bkt-i3",
      "Solve 6(x + 1) = 42.",
      "6(x + 1) = 42,\\quad x = \\;?",
      "6",
      "Expand: 6x + 6 = 42. Subtract 6: 6x = 36. Divide by 6: x = 6.",
      "Expand or divide both sides by 6 first.",
      ["x = 6"]
    ),
    choice(
      "y8-aeq-bkt-i4",
      "Solve 4(x − 3) = 12.",
      "C",
      ["$x = 0$", "$x = 3$", "$x = 6$", "$x = 15$"],
      "Expand: 4x − 12 = 12. Add 12: 4x = 24. Divide by 4: x = 6.",
      "Expand the bracket, then solve the resulting equation.",
      "4(x - 3) = 12,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-bkt-i5",
      "Solve 3(2x + 5) = 33.",
      "3(2x + 5) = 33,\\quad x = \\;?",
      "3",
      "Expand: 6x + 15 = 33. Subtract 15: 6x = 18. Divide by 6: x = 3.",
      "Multiply 3 by each term inside the bracket, then solve.",
      ["x = 3"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Only multiplying the first term: expanding 3(x + 4) as 3x + 4.",
      fix: "Every term inside the bracket must be multiplied: 3 × x = 3x and 3 × 4 = 12, giving 3x + 12.",
    },
    {
      mistake: "Getting a wrong sign: expanding −2(x − 5) as −2x − 10.",
      fix: "Negative × negative = positive: −2 × (−5) = +10, so the result is −2x + 10.",
    },
    {
      mistake: "Forgetting to expand before solving and subtracting the bracket term directly.",
      fix: "Always expand the bracket first. Only then apply inverse operations to solve.",
    },
    {
      mistake: "Dividing one term only: for 4(x + 3) = 32, writing 4x + 3 = 8 by dividing only the variable term.",
      fix: "When dividing both sides, divide the entire bracket: (x + 3) = 8, giving x = 5.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-bkt-m1",
      "Solve 2(x + 7) = 26.",
      "2(x + 7) = 26,\\quad x = \\;?",
      "6",
      "Expand: 2x + 14 = 26. Subtract 14: 2x = 12. Divide by 2: x = 6.",
      "Expand the bracket, then solve.",
      ["x = 6"]
    ),
    answer(
      "y8-aeq-bkt-m2",
      "Solve 5(x − 4) = 25.",
      "5(x - 4) = 25,\\quad x = \\;?",
      "9",
      "Expand: 5x − 20 = 25. Add 20: 5x = 45. Divide by 5: x = 9.",
      "Expand the bracket, then solve the two-step equation.",
      ["x = 9"]
    ),
    choice(
      "y8-aeq-bkt-m3",
      "Expand and solve 3(x + 6) = 30.",
      "B",
      ["$x = 8$", "$x = 4$", "$x = 16$", "$x = 12$"],
      "Expand: 3x + 18 = 30. Subtract 18: 3x = 12. Divide by 3: x = 4.",
      "Expand the bracket first, then apply inverse operations.",
      "3(x + 6) = 30,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-bkt-m4",
      "Solve 4(3x − 2) = 28.",
      "4(3x - 2) = 28,\\quad x = \\;?",
      "3",
      "Expand: 12x − 8 = 28. Add 8: 12x = 36. Divide by 12: x = 3.",
      "Expand first: 4 × 3x = 12x and 4 × (−2) = −8.",
      ["x = 3"]
    ),
    answer(
      "y8-aeq-bkt-m5",
      "Solve 2(5x + 1) = 32.",
      "2(5x + 1) = 32,\\quad x = \\;?",
      "3",
      "Expand: 10x + 2 = 32. Subtract 2: 10x = 30. Divide by 10: x = 3.",
      "Expand first: 2 × 5x = 10x and 2 × 1 = 2.",
      ["x = 3"]
    ),
    choice(
      "y8-aeq-bkt-m6",
      "A student expands 3(x + 2) = 15 as 3x + 2 = 15. What is the correct expansion?",
      "C",
      [
        "$3x + 2 = 15$",
        "$3x + 5 = 15$",
        "$3x + 6 = 15$",
        "$6x + 2 = 15$",
      ],
      "Every term inside the bracket must be multiplied by 3: 3 × 2 = 6, giving 3x + 6 = 15.",
      "The coefficient outside must multiply every term inside — including the constant."
    ),
    answer(
      "y8-aeq-bkt-m7",
      "Solve 7(x − 3) = 28.",
      "7(x - 3) = 28,\\quad x = \\;?",
      "7",
      "Expand: 7x − 21 = 28. Add 21: 7x = 49. Divide by 7: x = 7.",
      "Expand first, then solve the resulting equation.",
      ["x = 7"]
    ),
    answer(
      "y8-aeq-bkt-m8",
      "Solve 6(2x + 3) = 54.",
      "6(2x + 3) = 54,\\quad x = \\;?",
      "3",
      "Expand: 12x + 18 = 54. Subtract 18: 12x = 36. Divide by 12: x = 3.",
      "Expand first: 6 × 2x = 12x and 6 × 3 = 18.",
      ["x = 3"]
    ),
    choice(
      "y8-aeq-bkt-m9",
      "Solve 2(4x − 5) = 30.",
      "A",
      ["$x = 5$", "$x = 2.5$", "$x = 10$", "$x = 7.5$"],
      "Expand: 8x − 10 = 30. Add 10: 8x = 40. Divide by 8: x = 5.",
      "Expand the bracket, then solve.",
      "2(4x - 5) = 30,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-bkt-m10",
      "Solve 5(x + 4) = 55.",
      "5(x + 4) = 55,\\quad x = \\;?",
      "7",
      "Expand: 5x + 20 = 55. Subtract 20: 5x = 35. Divide by 5: x = 7.",
      "Expand the bracket, then solve the two-step equation.",
      ["x = 7"]
    ),
  ],
};

// ── Lesson 4: Equations with Pronumerals on Both Sides ───────────────────────

const equationsPronumeralsBothSides: LessonContent = {
  description:
    "Solve linear equations where the variable appears on both sides by collecting all variable terms on one side and all constant terms on the other.",
  learningIntention:
    "Collect pronumerals on one side of the equation and constants on the other, then solve.",
  successCriteria: [
    "Identify pronumeral terms on both sides of an equation.",
    "Subtract the smaller pronumeral term from both sides to collect variables on one side.",
    "Rearrange to have all constants on the other side.",
    "Solve the resulting single-step or two-step equation.",
  ],
  teaching: {
    paragraphs: [
      "When the variable appears on both sides of an equation, you must collect all variable terms on one side first. To do this, subtract the smaller variable term from both sides.",
      "For example, in 5x = 2x + 12, subtract 2x from both sides: 5x − 2x = 12, giving 3x = 12, so x = 4.",
      "When the equation also has constants on both sides, move the variables first, then move the constants. In 3x + 4 = x + 10, subtract x: 2x + 4 = 10. Then subtract 4: 2x = 6. Then divide: x = 3.",
      "Always check by substituting back: for x = 3 in 3x + 4 = x + 10: left = 3(3) + 4 = 13, right = 3 + 10 = 13. ✓",
    ],
    latexBlocks: [
      "5x = 2x + 12 \\Rightarrow 3x = 12 \\Rightarrow x = 4",
      "3x + 4 = x + 10 \\Rightarrow 2x = 6 \\Rightarrow x = 3",
      "\\text{Collect variable terms first, then constant terms.}",
    ],
  },
  workedExamples: [
    {
      title: "Variable on both sides, no constants",
      questionLatex: "\\text{Solve }6x = 2x + 16.",
      steps: [
        {
          explanation: "Subtract 2x from both sides to collect the variable terms.",
          latex: "6x - 2x = 16",
        },
        {
          explanation: "Simplify and divide by the coefficient.",
          latex: "4x = 16 \\Rightarrow x = 4",
        },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
    {
      title: "Variables and constants on both sides",
      questionLatex: "\\text{Solve }4x + 3 = x + 12.",
      steps: [
        {
          explanation: "Subtract x from both sides to collect variable terms on the left.",
          latex: "3x + 3 = 12",
        },
        {
          explanation: "Subtract 3 from both sides.",
          latex: "3x = 9",
        },
        {
          explanation: "Divide both sides by 3.",
          latex: "x = 3",
        },
      ],
      finalAnswerLatex: "x = 3",
    } as WorkedExample,
    {
      title: "Larger constant on the right",
      questionLatex: "\\text{Solve }5x - 2 = 2x + 10.",
      steps: [
        {
          explanation: "Subtract 2x from both sides.",
          latex: "3x - 2 = 10",
        },
        {
          explanation: "Add 2 to both sides.",
          latex: "3x = 12",
        },
        {
          explanation: "Divide both sides by 3.",
          latex: "x = 4",
        },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-pvb-g1",
      "What is the first step when solving 5x = 3x + 8?",
      "A",
      [
        "Subtract 3x from both sides",
        "Subtract 5x from both sides",
        "Divide both sides by 3",
        "Add 8 to both sides",
      ],
      "Subtract 3x from both sides: 5x − 3x = 8, giving 2x = 8, so x = 4.",
      "Subtract the smaller variable term from both sides."
    ),
    answer(
      "y8-aeq-pvb-g2",
      "Solve 6x = 2x + 16.",
      "6x = 2x + 16,\\quad x = \\;?",
      "4",
      "Subtract 2x from both sides: 4x = 16. Divide by 4: x = 4.",
      "Subtract 2x from both sides to collect x terms on the left.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-pvb-g3",
      "Solve 4x + 3 = x + 12.",
      "4x + 3 = x + 12,\\quad x = \\;?",
      "3",
      "Subtract x: 3x + 3 = 12. Subtract 3: 3x = 9. Divide by 3: x = 3.",
      "Subtract x from both sides first, then subtract the constant.",
      ["x = 3"]
    ),
    answer(
      "y8-aeq-pvb-g4",
      "Solve 5x − 2 = 2x + 10.",
      "5x - 2 = 2x + 10,\\quad x = \\;?",
      "4",
      "Subtract 2x: 3x − 2 = 10. Add 2: 3x = 12. Divide by 3: x = 4.",
      "Subtract 2x from both sides, then deal with the constant.",
      ["x = 4"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-pvb-i1",
      "Solve 7x = 3x + 20.",
      "7x = 3x + 20,\\quad x = \\;?",
      "5",
      "Subtract 3x from both sides: 4x = 20. Divide by 4: x = 5.",
      "Collect x terms on one side by subtracting 3x from both sides.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-pvb-i2",
      "Solve 6x + 1 = 4x + 9.",
      "6x + 1 = 4x + 9,\\quad x = \\;?",
      "4",
      "Subtract 4x: 2x + 1 = 9. Subtract 1: 2x = 8. Divide by 2: x = 4.",
      "Subtract 4x from both sides, then move the constant.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-pvb-i3",
      "Solve 8x − 3 = 5x + 9.",
      "8x - 3 = 5x + 9,\\quad x = \\;?",
      "4",
      "Subtract 5x: 3x − 3 = 9. Add 3: 3x = 12. Divide by 3: x = 4.",
      "Subtract 5x from both sides, then solve the resulting equation.",
      ["x = 4"]
    ),
    choice(
      "y8-aeq-pvb-i4",
      "Solve 3x + 10 = 7x − 2.",
      "B",
      ["$x = 2$", "$x = 3$", "$x = 4$", "$x = 6$"],
      "Subtract 3x: 10 = 4x − 2. Add 2: 12 = 4x. Divide by 4: x = 3.",
      "Move all x terms to one side and all constants to the other.",
      "3x + 10 = 7x - 2,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-pvb-i5",
      "Solve 9x − 5 = 6x + 7.",
      "9x - 5 = 6x + 7,\\quad x = \\;?",
      "4",
      "Subtract 6x: 3x − 5 = 7. Add 5: 3x = 12. Divide by 3: x = 4.",
      "Subtract 6x from both sides, then solve.",
      ["x = 4"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Subtracting the variable term from the wrong side: solving 5x = 2x + 9 by subtracting 5x to get 0 = −3x + 9, which is harder to work with.",
      fix: "Subtract the smaller variable term from both sides: 5x − 2x = 9, giving 3x = 9.",
    },
    {
      mistake: "Collecting variable terms by adding instead of subtracting: treating 5x = 2x + 9 as 5x + 2x = 9.",
      fix: "To move 2x from the right, subtract 2x from both sides: 5x − 2x = 9.",
    },
    {
      mistake: "Moving the constant to the wrong side: for 3x + 4 = x + 10, ending up with 2x + 10 = 4.",
      fix: "After subtracting x: 2x + 4 = 10. Now subtract 4 from both sides: 2x = 6.",
    },
    {
      mistake: "Forgetting to divide by the coefficient after collecting like terms.",
      fix: "After getting kx = n, always divide both sides by k to find x = n ÷ k.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-pvb-m1",
      "Solve 5x = x + 20.",
      "5x = x + 20,\\quad x = \\;?",
      "5",
      "Subtract x from both sides: 4x = 20. Divide by 4: x = 5.",
      "Subtract x from both sides.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-pvb-m2",
      "Solve 7x + 4 = 3x + 16.",
      "7x + 4 = 3x + 16,\\quad x = \\;?",
      "3",
      "Subtract 3x: 4x + 4 = 16. Subtract 4: 4x = 12. Divide by 4: x = 3.",
      "Subtract 3x from both sides, then solve.",
      ["x = 3"]
    ),
    choice(
      "y8-aeq-pvb-m3",
      "Solve 6x − 2 = 2x + 14.",
      "B",
      ["$x = 3$", "$x = 4$", "$x = 6$", "$x = 8$"],
      "Subtract 2x: 4x − 2 = 14. Add 2: 4x = 16. Divide by 4: x = 4.",
      "Collect variable terms on one side first.",
      "6x - 2 = 2x + 14,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-pvb-m4",
      "Solve 4x + 9 = x + 18.",
      "4x + 9 = x + 18,\\quad x = \\;?",
      "3",
      "Subtract x: 3x + 9 = 18. Subtract 9: 3x = 9. Divide by 3: x = 3.",
      "Subtract x from both sides, then subtract the constant.",
      ["x = 3"]
    ),
    answer(
      "y8-aeq-pvb-m5",
      "Solve 10x = 4x + 24.",
      "10x = 4x + 24,\\quad x = \\;?",
      "4",
      "Subtract 4x from both sides: 6x = 24. Divide by 6: x = 4.",
      "Subtract 4x from both sides.",
      ["x = 4"]
    ),
    choice(
      "y8-aeq-pvb-m6",
      "A student solves 5x = 2x + 9 by writing 5x − 2x = 9 + 2x. What went wrong?",
      "A",
      [
        "They subtracted 2x from the left but added 2x to the right; subtract from both sides to get 3x = 9, x = 3",
        "The answer x = 9 is correct",
        "They should have added 2x to both sides",
        "They should have divided both sides by 5 first",
      ],
      "Subtracting 2x must be done to both sides equally: 5x − 2x = 9 − 2x, which simplifies to 3x = 9, giving x = 3.",
      "What does subtracting 2x from both sides look like correctly?"
    ),
    answer(
      "y8-aeq-pvb-m7",
      "Solve 3x + 15 = 8x.",
      "3x + 15 = 8x,\\quad x = \\;?",
      "3",
      "Subtract 3x from both sides: 15 = 5x. Divide by 5: x = 3.",
      "Collect x terms on the right by subtracting 3x from both sides.",
      ["x = 3"]
    ),
    answer(
      "y8-aeq-pvb-m8",
      "Solve 9x − 7 = 5x + 13.",
      "9x - 7 = 5x + 13,\\quad x = \\;?",
      "5",
      "Subtract 5x: 4x − 7 = 13. Add 7: 4x = 20. Divide by 4: x = 5.",
      "Subtract 5x from both sides, then solve the two-step equation.",
      ["x = 5"]
    ),
    choice(
      "y8-aeq-pvb-m9",
      "Solve 4x + 3 = x + 12.",
      "B",
      ["$x = 1$", "$x = 3$", "$x = 5$", "$x = 9$"],
      "Subtract x: 3x + 3 = 12. Subtract 3: 3x = 9. Divide by 3: x = 3.",
      "Collect x terms on one side by subtracting x from both sides.",
      "4x + 3 = x + 12,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-pvb-m10",
      "Solve 6x + 1 = 2x + 21.",
      "6x + 1 = 2x + 21,\\quad x = \\;?",
      "5",
      "Subtract 2x: 4x + 1 = 21. Subtract 1: 4x = 20. Divide by 4: x = 5.",
      "Subtract 2x from both sides, then solve.",
      ["x = 5"]
    ),
  ],
};

// ── Lesson 5: Forming Equations from Word Problems ───────────────────────────

const formingEquationsWordProblems: LessonContent = {
  description:
    "Translate word problems into algebraic equations, solve them, and interpret the solution in the context of the problem.",
  learningIntention:
    "Write an equation from a word problem and solve it to find the unknown value.",
  successCriteria: [
    "Identify the unknown and assign it a variable.",
    "Translate key phrases into algebraic expressions.",
    "Write and solve the equation.",
    "Check that the solution makes sense in the original context.",
  ],
  teaching: {
    paragraphs: [
      "Many practical problems can be solved by forming an equation. The first step is to decide what the unknown is and call it a variable, usually x.",
      "Key phrases have algebraic equivalents: 'more than' means add, 'less than' means subtract, 'times' means multiply, 'divided equally' means divide. Write each phrase as part of the equation.",
      "Once the equation is written, solve it using the same inverse operations as before. Then check the answer by substituting back into the original context.",
      "For example: 'A number doubled and increased by 5 gives 17.' This translates to 2x + 5 = 17. Solving: 2x = 12, so x = 6. Check: 2(6) + 5 = 17. ✓",
    ],
    latexBlocks: [
      "\\text{'3 more than a number' } \\rightarrow x + 3",
      "\\text{'twice a number minus 4' } \\rightarrow 2x - 4",
      "\\text{Perimeter of rectangle: } 2(l + w) = P",
    ],
  },
  workedExamples: [
    {
      title: "Number problem",
      questionLatex: "\\text{A number increased by 7 gives 15. Find the number.}",
      steps: [
        {
          explanation: "Let x be the unknown number.",
          latex: "x + 7 = 15",
        },
        {
          explanation: "Subtract 7 from both sides.",
          latex: "x = 8",
        },
        {
          explanation: "Check: 8 + 7 = 15. ✓",
          latex: "8 + 7 = 15\\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{The number is }8.",
    } as WorkedExample,
    {
      title: "Two-step number problem",
      questionLatex: "\\text{Three times a number minus 5 equals 16. Find the number.}",
      steps: [
        {
          explanation: "Let x be the number. 'Three times x minus 5 equals 16' gives the equation:",
          latex: "3x - 5 = 16",
        },
        {
          explanation: "Add 5 to both sides.",
          latex: "3x = 21",
        },
        {
          explanation: "Divide both sides by 3.",
          latex: "x = 7",
        },
      ],
      finalAnswerLatex: "\\text{The number is }7.",
    } as WorkedExample,
    {
      title: "Perimeter problem",
      questionLatex: "\\text{A rectangle has perimeter 28 cm and width 5 cm. Find the length.}",
      steps: [
        {
          explanation: "Let l be the length. Use the perimeter formula.",
          latex: "2(l + 5) = 28",
        },
        {
          explanation: "Divide both sides by 2.",
          latex: "l + 5 = 14",
        },
        {
          explanation: "Subtract 5 from both sides.",
          latex: "l = 9",
        },
      ],
      finalAnswerLatex: "\\text{The length is }9\\text{ cm.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-wrd-g1",
      "A number x is doubled and then 3 is added to get 11. Which equation represents this?",
      "B",
      [
        "\\(2x - 3 = 11\\)",
        "\\(2x + 3 = 11\\)",
        "$x + 2 = 11 - 3$",
        "\\(3x + 2 = 11\\)",
      ],
      "Doubling x gives 2x; adding 3 gives 2x + 3; this equals 11: 2x + 3 = 11.",
      "Translate each part in order: double x is 2x, then add 3, then set equal to 11."
    ),
    answer(
      "y8-aeq-wrd-g2",
      "A number plus 8 equals 23. Find the number.",
      "x + 8 = 23,\\quad x = \\;?",
      "15",
      "Let x be the number. x + 8 = 23. Subtract 8: x = 15. Check: 15 + 8 = 23. ✓",
      "Write the equation x + 8 = 23, then subtract 8 from both sides.",
      []
    ),
    answer(
      "y8-aeq-wrd-g3",
      "Four times a number equals 32. Find the number.",
      "4x = 32,\\quad x = \\;?",
      "8",
      "Let x be the number. 4x = 32. Divide by 4: x = 8. Check: 4 × 8 = 32. ✓",
      "Write 4x = 32, then divide both sides by 4.",
      []
    ),
    answer(
      "y8-aeq-wrd-g4",
      "Three times a number minus 4 equals 11. Find the number.",
      "3x - 4 = 11,\\quad x = \\;?",
      "5",
      "Let x be the number. 3x − 4 = 11. Add 4: 3x = 15. Divide by 3: x = 5. Check: 3(5) − 4 = 11. ✓",
      "Write 3x − 4 = 11, then add 4 to both sides, then divide by 3.",
      []
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-wrd-i1",
      "Five more than twice a number is 19. Find the number.",
      "\\text{Write and solve the equation.}",
      "7",
      "Let x be the number. 2x + 5 = 19. Subtract 5: 2x = 14. Divide by 2: x = 7.",
      "Translate the problem: 5 more than twice x is 2x + 5 = 19.",
      []
    ),
    answer(
      "y8-aeq-wrd-i2",
      "A rectangle has perimeter 40 cm and length 12 cm. Find the width.",
      "\\text{Write an equation using the perimeter formula.}",
      "8",
      "Let w be the width. 2(12 + w) = 40. Divide by 2: 12 + w = 20. Subtract 12: w = 8.",
      "Use the perimeter formula: 2(length + width) = perimeter.",
      []
    ),
    choice(
      "y8-aeq-wrd-i3",
      "Two children share 24 stickers. One child gets 3 times as many as the other. How many stickers does the child with fewer stickers get?",
      "B",
      ["4", "6", "8", "18"],
      "Let x = fewer stickers. Then 3x = more stickers. Total: x + 3x = 4x = 24, so x = 6.",
      "Let x be the smaller share and write an equation for the total."
    ),
    answer(
      "y8-aeq-wrd-i4",
      "A student buys 3 identical books and pays $6 change from $30. Find the cost of each book.",
      "\\text{Write and solve the equation.}",
      "8",
      "Total spent = 30 − 6 = 24. Let x be the cost of each book. 3x = 24. Divide by 3: x = 8.",
      "Find the total spent first, then divide equally among 3 books.",
      []
    ),
    answer(
      "y8-aeq-wrd-i5",
      "A number is halved and then 3 is added to give 9. Find the number.",
      "\\text{Write and solve the equation.}",
      "12",
      "Let x be the number. x/2 + 3 = 9. Subtract 3: x/2 = 6. Multiply by 2: x = 12.",
      "Translate: half of x plus 3 equals 9, giving x/2 + 3 = 9.",
      []
    ),
  ],
  commonMistakes: [
    {
      mistake: "Translating 'less than' in the wrong order: writing '5 less than x' as x − 5 is correct, but writing '5 less than twice a number' as 5 − 2x instead of 2x − 5.",
      fix: "'A less than B' means B − A. So '5 less than twice a number' is 2x − 5.",
    },
    {
      mistake: "Forgetting to check the solution makes sense in context, for example getting a negative number of items.",
      fix: "Substitute back into the word problem — not just the equation — to confirm the answer is reasonable.",
    },
    {
      mistake: "Setting up the equation for the wrong unknown: finding total price when the question asks for unit price.",
      fix: "Re-read the question. Identify exactly what you are asked to find and let x equal that quantity.",
    },
    {
      mistake: "Using the perimeter formula incorrectly: writing l + w = P instead of 2(l + w) = P.",
      fix: "Perimeter is the total of all sides. For a rectangle: perimeter = 2 × (length + width).",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-wrd-m1",
      "A number increased by 15 equals 34. Find the number.",
      "\\text{Write and solve the equation.}",
      "19",
      "Let x be the number. x + 15 = 34. Subtract 15: x = 19. Check: 19 + 15 = 34. ✓",
      "Write x + 15 = 34 and solve.",
      []
    ),
    answer(
      "y8-aeq-wrd-m2",
      "Twice a number minus 7 equals 13. Find the number.",
      "\\text{Write and solve the equation.}",
      "10",
      "Let x be the number. 2x − 7 = 13. Add 7: 2x = 20. Divide by 2: x = 10.",
      "Write 2x − 7 = 13 and solve.",
      []
    ),
    choice(
      "y8-aeq-wrd-m3",
      "The equation 5x + 3 = 28 represents a number problem. What is x?",
      "B",
      ["$x = 31$", "$x = 5$", "$x = 6.2$", "$x = 25$"],
      "Subtract 3: 5x = 25. Divide by 5: x = 5.",
      "Solve the equation using inverse operations.",
      "5x + 3 = 28,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-wrd-m4",
      "A rectangle's length is 3 cm more than its width. The perimeter is 30 cm. Find the width.",
      "\\text{Write an equation for the perimeter.}",
      "6",
      "Let w = width, length = w + 3. Perimeter: 2(w + w + 3) = 30 → 4w + 6 = 30 → 4w = 24 → w = 6.",
      "Write perimeter as 2(w + w + 3) = 30 and solve.",
      []
    ),
    answer(
      "y8-aeq-wrd-m5",
      "Three consecutive integers sum to 42. Find the smallest integer.",
      "\\text{Write and solve the equation.}",
      "13",
      "Let n = smallest integer. n + (n+1) + (n+2) = 42 → 3n + 3 = 42 → 3n = 39 → n = 13.",
      "Write n + (n+1) + (n+2) = 42 and simplify.",
      []
    ),
    choice(
      "y8-aeq-wrd-m6",
      "Which equation represents: '6 more than 4 times a number equals 26'?",
      "C",
      [
        "\\(4x - 6 = 26\\)",
        "\\(6x + 4 = 26\\)",
        "\\(4x + 6 = 26\\)",
        "\\(4(x + 6) = 26\\)",
      ],
      "4 times x is 4x; adding 6 gives 4x + 6; this equals 26.",
      "Translate 'more than' as addition and 'times' as multiplication."
    ),
    answer(
      "y8-aeq-wrd-m7",
      "A school buys 5 identical calculators and pays $175 in total. Find the cost of each calculator.",
      "\\text{Write and solve the equation.}",
      "35",
      "Let x = cost of each calculator. 5x = 175. Divide by 5: x = 35.",
      "Write 5x = 175 and divide by 5.",
      []
    ),
    answer(
      "y8-aeq-wrd-m8",
      "Tom is 4 years older than Sam. Their ages sum to 28. Find Sam's age.",
      "\\text{Write and solve the equation.}",
      "12",
      "Let s = Sam's age. Tom's age = s + 4. Sum: s + (s + 4) = 28 → 2s + 4 = 28 → 2s = 24 → s = 12.",
      "Write s + (s + 4) = 28 and simplify.",
      []
    ),
    choice(
      "y8-aeq-wrd-m9",
      "Which equation represents: 'A number tripled and decreased by 5 gives 16'?",
      "C",
      [
        "\\(3(x - 5) = 16\\)",
        "\\(5 - 3x = 16\\)",
        "\\(3x - 5 = 16\\)",
        "\\(3x + 5 = 16\\)",
      ],
      "Triple x is 3x; decreasing by 5 gives 3x − 5; this equals 16.",
      "Translate 'tripled' as 3x and 'decreased by' as subtraction."
    ),
    answer(
      "y8-aeq-wrd-m10",
      "A ribbon is cut into two pieces. One piece is 15 cm longer than the other. The total length is 53 cm. Find the length of the shorter piece.",
      "\\text{Write and solve the equation.}",
      "19",
      "Let x = shorter piece. Longer piece = x + 15. Total: x + (x + 15) = 53 → 2x + 15 = 53 → 2x = 38 → x = 19.",
      "Write x + (x + 15) = 53 and solve.",
      []
    ),
  ],
};

// ── Lesson 6: Checking Solutions and Error Analysis ──────────────────────────

const checkingSolutionsErrorAnalysis: LessonContent = {
  description:
    "Verify solutions by substituting back into equations, identify errors in incorrect working, and practise mixed equation types with a focus on accuracy.",
  learningIntention:
    "Check whether a given value is a correct solution and identify errors in algebraic working.",
  successCriteria: [
    "Substitute a value into an equation to verify whether it is a solution.",
    "Identify and name the type of error in incorrect working.",
    "Correct the error and find the right solution.",
    "Solve mixed equation types accurately.",
  ],
  teaching: {
    paragraphs: [
      "Checking a solution is simple: substitute your answer back into the original equation and evaluate both sides. If they are equal, the solution is correct. If not, an error was made somewhere.",
      "For example, to check x = 5 in 2x + 3 = 13: left side = 2(5) + 3 = 13. Right side = 13. They match, so x = 5 is correct.",
      "The most common errors in equation solving are: using the wrong inverse operation, applying an operation to only one side, forgetting to expand a bracket before solving, or forgetting to collect the constant term before dividing.",
      "When analysing an error, read through the working step by step. Identify which step first gives an incorrect result, and state clearly what the correct operation should have been.",
    ],
    latexBlocks: [
      "\\text{Check: substitute }x = k\\text{ into both sides and compare}",
      "\\text{Left side} = \\text{right side} \\Rightarrow \\text{solution is correct}",
      "\\text{Left side} \\neq \\text{right side} \\Rightarrow \\text{error in working}",
    ],
  },
  workedExamples: [
    {
      title: "Verify a solution",
      questionLatex: "\\text{Is }x = 4\\text{ a solution to }3x + 5 = 17?",
      steps: [
        {
          explanation: "Substitute x = 4 into the left side.",
          latex: "3(4) + 5 = 12 + 5 = 17",
        },
        {
          explanation: "The left side equals the right side.",
          latex: "17 = 17 \\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{Yes, }x = 4\\text{ is correct.}",
    } as WorkedExample,
    {
      title: "Identify an error",
      questionLatex: "\\text{A student solves }2(x + 3) = 14\\text{ as }2x + 3 = 14 \\Rightarrow 2x = 11.\\text{ Find the error.}",
      steps: [
        {
          explanation: "The error is in the expansion: the student multiplied x by 2 but did not multiply 3 by 2.",
          latex: "\\text{Incorrect: }2x + 3 = 14",
        },
        {
          explanation: "Correct expansion: multiply every term inside the bracket by 2.",
          latex: "2x + 6 = 14",
        },
        {
          explanation: "Solve correctly: subtract 6, then divide by 2.",
          latex: "2x = 8 \\Rightarrow x = 4",
        },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
    {
      title: "Correct and solve",
      questionLatex: "\\text{Solve }5x - 3 = 2x + 12.",
      steps: [
        {
          explanation: "Collect variable terms: subtract 2x from both sides.",
          latex: "3x - 3 = 12",
        },
        {
          explanation: "Add 3 to both sides.",
          latex: "3x = 15",
        },
        {
          explanation: "Divide by 3.",
          latex: "x = 5",
        },
      ],
      finalAnswerLatex: "x = 5",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-chk-g1",
      "Is x = 3 a correct solution to 5x + 1 = 16? Substitute to check.",
      "A",
      [
        "Yes — substituting gives 5(3) + 1 = 16 ✓",
        "No — substituting gives 5(3) + 1 = 14",
        "No — x must equal 17/5",
        "Yes — because 3 is the coefficient of x",
      ],
      "5(3) + 1 = 15 + 1 = 16. The left side equals the right side, so x = 3 is correct.",
      "Substitute x = 3 into 5x + 1 and compare the result to 16."
    ),
    answer(
      "y8-aeq-chk-g2",
      "Substitute x = 4 into 3x − 5. Write the result.",
      "3x - 5 = \\;?\\text{ when }x = 4",
      "7",
      "3(4) − 5 = 12 − 5 = 7.",
      "Replace x with 4: calculate 3 × 4 first, then subtract 5.",
      []
    ),
    choice(
      "y8-aeq-chk-g3",
      "A student solves x + 8 = 20 and gets x = 28. What error was made?",
      "A",
      [
        "Added instead of subtracting; the correct answer is x = 12",
        "Divided by 8; the correct answer is x = 2.5",
        "The answer x = 28 is correct",
        "Subtracted 20; the correct answer is x = −12",
      ],
      "To undo adding 8, subtract 8 from both sides: x = 20 − 8 = 12. The student added instead.",
      "The inverse of adding is subtracting — which direction should you go?"
    ),
    answer(
      "y8-aeq-chk-g4",
      "Solve 4x + 2 = 18.",
      "4x + 2 = 18,\\quad x = \\;?",
      "4",
      "Subtract 2 from both sides: 4x = 16. Divide by 4: x = 4. Check: 4(4) + 2 = 18. ✓",
      "Subtract 2 from both sides first, then divide by 4.",
      ["x = 4"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-chk-i1",
      "Substitute x = 6 into 2x − 4. Write the result.",
      "2x - 4 = \\;?\\text{ when }x = 6",
      "8",
      "2(6) − 4 = 12 − 4 = 8.",
      "Replace x with 6: multiply first, then subtract.",
      []
    ),
    choice(
      "y8-aeq-chk-i2",
      "A student solves 2(x + 3) = 14 by writing 2x + 3 = 14, giving x = 5.5. What is the correct solution?",
      "B",
      ["$x = 5.5$", "$x = 4$", "$x = 7$", "$x = 2$"],
      "Correct expansion: 2x + 6 = 14. Subtract 6: 2x = 8. Divide by 2: x = 4.",
      "Check the expansion: the 3 inside the bracket must also be multiplied by 2."
    ),
    answer(
      "y8-aeq-chk-i3",
      "Substitute x = 5 into 5x + 8. Write the result.",
      "5x + 8 = \\;?\\text{ when }x = 5",
      "33",
      "5(5) + 8 = 25 + 8 = 33.",
      "Replace x with 5: calculate 5 × 5 first, then add 8.",
      []
    ),
    answer(
      "y8-aeq-chk-i4",
      "Solve 3(x + 4) = 33.",
      "3(x + 4) = 33,\\quad x = \\;?",
      "7",
      "Expand: 3x + 12 = 33. Subtract 12: 3x = 21. Divide by 3: x = 7.",
      "Expand the bracket first, then solve the two-step equation.",
      ["x = 7"]
    ),
    answer(
      "y8-aeq-chk-i5",
      "Substitute x = 7 into 4x. Write the result.",
      "4x = \\;?\\text{ when }x = 7",
      "28",
      "4 × 7 = 28.",
      "Replace x with 7 and multiply.",
      []
    ),
  ],
  commonMistakes: [
    {
      mistake: "Substituting the wrong value or into the wrong part of the equation when checking.",
      fix: "Substitute into the full original equation, evaluating both the left side and the right side separately, then compare.",
    },
    {
      mistake: "Adding when checking instead of substituting: writing 'x + 3 = 5 check: x = 5 + 3 = 8'.",
      fix: "To check, replace x with the answer and evaluate: if x = 2, the left side = 2 + 3 = 5, which matches the right side.",
    },
    {
      mistake: "Stating that a solution is correct because 'it looks right' without completing the substitution.",
      fix: "Always complete the arithmetic. A number that looks plausible may still be wrong.",
    },
    {
      mistake: "Identifying the wrong step as the error when analysing incorrect working.",
      fix: "Go through the working step by step. The first line that produces a different result from your own correct working is where the error occurred.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-aeq-chk-m1",
      "Solve 6x − 5 = 31.",
      "6x - 5 = 31,\\quad x = \\;?",
      "6",
      "Add 5 to both sides: 6x = 36. Divide by 6: x = 6. Check: 6(6) − 5 = 31. ✓",
      "Add 5 to both sides first, then divide by 6.",
      ["x = 6"]
    ),
    choice(
      "y8-aeq-chk-m2",
      "A student solves 3x + 5 = 20 and writes 3x = 25, giving x = 25/3. What error was made?",
      "B",
      [
        "The student divided by 3 instead of subtracting; correct is x = 4",
        "The student added 5 to 20 instead of subtracting; correct is 3x = 15, so x = 5",
        "The answer x = 25/3 is correct",
        "The student should have multiplied both sides by 3 first",
      ],
      "Correct first step: subtract 5 from both sides → 3x = 15. Then divide by 3 → x = 5.",
      "What should happen to the +5 when solving for x?"
    ),
    answer(
      "y8-aeq-chk-m3",
      "Substitute x = 4 into 2(x + 3). Write the result.",
      "2(x + 3) = \\;?\\text{ when }x = 4",
      "14",
      "Substitute: 2(4 + 3) = 2 × 7 = 14.",
      "Replace x with 4 inside the bracket first, then multiply.",
      []
    ),
    answer(
      "y8-aeq-chk-m4",
      "Solve 5(x − 2) = 15.",
      "5(x - 2) = 15,\\quad x = \\;?",
      "5",
      "Expand: 5x − 10 = 15. Add 10: 5x = 25. Divide by 5: x = 5. Check: 5(5 − 2) = 5 × 3 = 15. ✓",
      "Expand the bracket, then solve the two-step equation.",
      ["x = 5"]
    ),
    answer(
      "y8-aeq-chk-m5",
      "Substitute x = 6 into 7x. Write the result.",
      "7x = \\;?\\text{ when }x = 6",
      "42",
      "7 × 6 = 42.",
      "Replace x with 6 and multiply.",
      []
    ),
    choice(
      "y8-aeq-chk-m6",
      "Solve 2(3x − 1) = 22.",
      "A",
      ["$x = 4$", "$x = 7$", "$x = 12$", "$x = 2$"],
      "Expand: 6x − 2 = 22. Add 2: 6x = 24. Divide by 6: x = 4.",
      "Expand the bracket first, then solve.",
      "2(3x - 1) = 22,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-chk-m7",
      "Solve 8x − 3 = 5x + 12.",
      "8x - 3 = 5x + 12,\\quad x = \\;?",
      "5",
      "Subtract 5x: 3x − 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5.",
      "Collect variable terms first by subtracting 5x from both sides.",
      ["x = 5"]
    ),
    choice(
      "y8-aeq-chk-m8",
      "A student solves x − 9 = 15 and gets x = 6. What is the correct solution?",
      "B",
      ["$x = 6$", "$x = 24$", "$x = 135$", "$x = -6$"],
      "To undo subtracting 9, add 9 to both sides: x = 15 + 9 = 24.",
      "The inverse of subtracting 9 is adding 9 — what does that give?"
    ),
    answer(
      "y8-aeq-chk-m9",
      "Solve 4(2x + 3) = 44.",
      "4(2x + 3) = 44,\\quad x = \\;?",
      "4",
      "Expand: 8x + 12 = 44. Subtract 12: 8x = 32. Divide by 8: x = 4. Check: 4(2(4) + 3) = 4 × 11 = 44. ✓",
      "Expand the bracket first: 4 × 2x = 8x and 4 × 3 = 12.",
      ["x = 4"]
    ),
    answer(
      "y8-aeq-chk-m10",
      "Solve 6x + 7 = 3x + 22.",
      "6x + 7 = 3x + 22,\\quad x = \\;?",
      "5",
      "Subtract 3x: 3x + 7 = 22. Subtract 7: 3x = 15. Divide by 3: x = 5. Check: 6(5) + 7 = 37 = 3(5) + 22. ✓",
      "Collect variable terms on one side by subtracting 3x from both sides.",
      ["x = 5"]
    ),
  ],
};

// ── Lesson 7: Linear Inequalities ────────────────────────────────────────────

const linearInequalities: LessonContent = {
  description:
    "Understand inequality notation, solve one- and two-step linear inequalities, and represent solutions on a number line and in set notation.",
  learningIntention:
    "Solve linear inequalities using inverse operations, including reversing the inequality sign when multiplying or dividing by a negative number.",
  successCriteria: [
    "Interpret inequality symbols $<$, $>$, $\\leq$, $\\geq$ and use them correctly.",
    "Solve one-step and two-step linear inequalities using inverse operations.",
    "Reverse the inequality sign when multiplying or dividing both sides by a negative number.",
    "Represent solutions on a number line using open circles (strict) and closed circles (inclusive).",
    "Write solutions using inequality notation and set notation.",
  ],
  teaching: {
    paragraphs: [
      "An inequality is like an equation, but instead of an equals sign it uses $<$ (less than), $>$ (greater than), $\\leq$ (less than or equal to), or $\\geq$ (greater than or equal to). For example, $x > 3$ means x can be any value greater than 3 — there are infinitely many solutions.",
      "You solve inequalities almost exactly like equations: apply inverse operations to isolate the variable. For $x + 5 > 11$, subtract 5 from both sides to get $x > 6$. For $2x \\leq 14$, divide both sides by 2 to get $x \\leq 7$.",
      "There is one critical difference from equations: when you multiply or divide both sides by a negative number, the inequality sign reverses. This is because the number line flips. For example, if $-2x < 6$, dividing by $-2$ gives $x > -3$ — the $<$ becomes $>$. This is the most common error students make with inequalities.",
      "On a number line, a strict inequality ($<$ or $>$) is shown with an open circle at the boundary value, and the arrow extends in the correct direction. An inclusive inequality ($\\leq$ or $\\geq$) uses a closed (filled) circle. In set notation, $\\{x : x > 3\\}$ means the set of all $x$ values greater than 3.",
      "To check a solution, substitute a test value from your answer region into the original inequality. If it satisfies the inequality, your answer is correct.",
    ],
    latexBlocks: [
      "x + 5 > 11 \\Rightarrow x > 6",
      "\\dfrac{x}{3} \\leq 4 \\Rightarrow x \\leq 12",
      "-2x < 6 \\Rightarrow x > -3 \\quad (\\text{sign reverses when dividing by } -2)",
    ],
  },
  workedExamples: [
    {
      title: "Solve a one-step inequality",
      questionLatex: "\\text{Solve }x - 4 \\geq 3.",
      steps: [
        {
          explanation: "Add 4 to both sides to isolate x.",
          latex: "x - 4 + 4 \\geq 3 + 4",
        },
        {
          explanation: "Simplify.",
          latex: "x \\geq 7",
        },
        {
          explanation: "On a number line, place a closed circle at 7 and shade to the right.",
          latex: "\\{x : x \\geq 7\\}",
        },
      ],
      finalAnswerLatex: "x \\geq 7",
    } as WorkedExample,
    {
      title: "Solve a two-step inequality",
      questionLatex: "\\text{Solve }3x + 2 < 14.",
      steps: [
        {
          explanation: "Subtract 2 from both sides.",
          latex: "3x < 12",
        },
        {
          explanation: "Divide both sides by 3 (positive — sign stays the same).",
          latex: "x < 4",
        },
      ],
      finalAnswerLatex: "x < 4",
    } as WorkedExample,
    {
      title: "Dividing by a negative — sign reverses",
      questionLatex: "\\text{Solve }-4x \\leq 20.",
      steps: [
        {
          explanation: "Divide both sides by $-4$. Because we divide by a negative, reverse the inequality sign.",
          latex: "\\dfrac{-4x}{-4} \\geq \\dfrac{20}{-4}",
        },
        {
          explanation: "Simplify.",
          latex: "x \\geq -5",
        },
      ],
      finalAnswerLatex: "x \\geq -5",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-ine-g1",
      "Which inequality symbol means 'greater than or equal to'?",
      "C",
      [
        "$<$",
        "$>$",
        "$\\geq$",
        "$\\leq$",
      ],
      "$\\geq$ means 'greater than or equal to'. A closed circle on a number line indicates the boundary value is included.",
      "Think about which symbol includes the boundary value and points upward (greater)."
    ),
    answer(
      "y8-aeq-ine-g2",
      "Solve x + 6 > 10.",
      "x + 6 > 10,\\quad x > \\;?",
      "4",
      "Subtract 6 from both sides: x > 10 − 6, so x > 4.",
      "Subtract 6 from both sides to isolate x.",
      ["x > 4"]
    ),
    answer(
      "y8-aeq-ine-g3",
      "Solve 2x ≤ 16.",
      "2x \\leq 16,\\quad x \\leq \\;?",
      "8",
      "Divide both sides by 2 (positive, so sign stays): x ≤ 8.",
      "Divide both sides by 2. The sign stays the same because 2 is positive.",
      ["x ≤ 8", "x\\leq 8"]
    ),
    answer(
      "y8-aeq-ine-g4",
      "Solve 3x − 4 ≥ 11.",
      "3x - 4 \\geq 11,\\quad x \\geq \\;?",
      "5",
      "Add 4 to both sides: 3x ≥ 15. Divide by 3: x ≥ 5.",
      "Add 4 to both sides first, then divide by 3.",
      ["x ≥ 5", "x\\geq 5"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-ine-i1",
      "Solve x − 9 < 2.",
      "x - 9 < 2,\\quad x < \\;?",
      "11",
      "Add 9 to both sides: x < 2 + 9 = 11.",
      "Add 9 to both sides to isolate x.",
      ["x < 11"]
    ),
    answer(
      "y8-aeq-ine-i2",
      "Solve 5x > 30.",
      "5x > 30,\\quad x > \\;?",
      "6",
      "Divide both sides by 5: x > 30 ÷ 5 = 6.",
      "Divide both sides by 5. The sign stays the same because 5 is positive.",
      ["x > 6"]
    ),
    answer(
      "y8-aeq-ine-i3",
      "Solve 4x + 3 ≤ 19.",
      "4x + 3 \\leq 19,\\quad x \\leq \\;?",
      "4",
      "Subtract 3 from both sides: 4x ≤ 16. Divide by 4: x ≤ 4.",
      "Subtract 3 first, then divide by 4.",
      ["x ≤ 4", "x\\leq 4"]
    ),
    choice(
      "y8-aeq-ine-i4",
      "Solve −3x < 12.",
      "B",
      [
        "$x < -4$",
        "$x > -4$",
        "$x < 4$",
        "$x > 4$",
      ],
      "Divide both sides by −3. Dividing by a negative reverses the sign: x > 12 ÷ (−3) = −4.",
      "Dividing by a negative number reverses the inequality sign.",
      "-3x < 12,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-ine-i5",
      "Solve 2x − 7 ≥ 1.",
      "2x - 7 \\geq 1,\\quad x \\geq \\;?",
      "4",
      "Add 7 to both sides: 2x ≥ 8. Divide by 2: x ≥ 4.",
      "Add 7 to both sides first, then divide by 2.",
      ["x ≥ 4", "x\\geq 4"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to reverse the inequality sign when multiplying or dividing by a negative: solving −2x > 8 as x > −4.",
      fix: "When you divide both sides by −2, the sign flips: −2x > 8 becomes x < −4.",
    },
    {
      mistake: "Using an open circle on the number line for ≤ or ≥ (inclusive inequalities).",
      fix: "Open circles are for strict inequalities (< and >). Closed (filled) circles are for ≤ and ≥, because the boundary value is included.",
    },
    {
      mistake: "Treating an inequality exactly like an equation and writing a single value as the answer: 'x = 6' instead of 'x > 6'.",
      fix: "An inequality has infinitely many solutions. Always write the solution as an inequality, for example x > 6, not just the boundary value.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-aeq-ine-m1",
      "Which number line description matches the solution x < 5?",
      "A",
      [
        "Open circle at 5, arrow pointing left",
        "Closed circle at 5, arrow pointing left",
        "Open circle at 5, arrow pointing right",
        "Closed circle at 5, arrow pointing right",
      ],
      "x < 5 is a strict inequality (open circle) and means all values less than 5 (arrow pointing left).",
      "Is 5 included? Which direction is 'less than' on the number line?"
    ),
    choice(
      "y8-aeq-ine-m2",
      "Solve −x > 4.",
      "B",
      [
        "$x > -4$",
        "$x < -4$",
        "$x > 4$",
        "$x < 4$",
      ],
      "Multiply both sides by −1 (or divide by −1); the sign reverses: x < −4.",
      "Multiplying or dividing by a negative number reverses the inequality sign.",
      "-x > 4,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-ine-m3",
      "Solve x + 11 ≥ 20.",
      "x + 11 \\geq 20,\\quad x \\geq \\;?",
      "9",
      "Subtract 11 from both sides: x ≥ 20 − 11 = 9.",
      "Subtract 11 from both sides.",
      ["x ≥ 9", "x\\geq 9"]
    ),
    answer(
      "y8-aeq-ine-m4",
      "Solve 6x < 42.",
      "6x < 42,\\quad x < \\;?",
      "7",
      "Divide both sides by 6: x < 42 ÷ 6 = 7.",
      "Divide both sides by 6. The sign stays the same.",
      ["x < 7"]
    ),
    answer(
      "y8-aeq-ine-m5",
      "Solve 5x − 3 > 17.",
      "5x - 3 > 17,\\quad x > \\;?",
      "4",
      "Add 3 to both sides: 5x > 20. Divide by 5: x > 4.",
      "Add 3 to both sides first, then divide by 5.",
      ["x > 4"]
    ),
    answer(
      "y8-aeq-ine-m6",
      "Solve −2x ≥ 10.",
      "-2x \\geq 10,\\quad x \\leq \\;?",
      "-5",
      "Divide both sides by −2 and reverse the sign: x ≤ 10 ÷ (−2) = −5.",
      "Dividing by a negative reverses the sign — ≥ becomes ≤.",
      ["x ≤ -5", "x\\leq -5"]
    ),
    answer(
      "y8-aeq-ine-m7",
      "Solve 4x + 6 ≤ 26.",
      "4x + 6 \\leq 26,\\quad x \\leq \\;?",
      "5",
      "Subtract 6: 4x ≤ 20. Divide by 4: x ≤ 5.",
      "Subtract 6 from both sides first, then divide by 4.",
      ["x ≤ 5", "x\\leq 5"]
    ),
    answer(
      "y8-aeq-ine-m8",
      "Solve 7 − x < 3.",
      "7 - x < 3,\\quad x > \\;?",
      "4",
      "Subtract 7 from both sides: −x < −4. Multiply both sides by −1 and reverse the sign: x > 4.",
      "After subtracting 7, you will have −x on the left. Multiplying by −1 reverses the sign.",
      ["x > 4"]
    ),
    answer(
      "y8-aeq-ine-m9",
      "Solve 3x + 9 > 3.",
      "3x + 9 > 3,\\quad x > \\;?",
      "-2",
      "Subtract 9: 3x > −6. Divide by 3: x > −2.",
      "Subtract 9 from both sides first, then divide by 3.",
      ["x > -2"]
    ),
    answer(
      "y8-aeq-ine-m10",
      "Solve 2x − 5 ≥ −1.",
      "2x - 5 \\geq -1,\\quad x \\geq \\;?",
      "2",
      "Add 5 to both sides: 2x ≥ 4. Divide by 2: x ≥ 2.",
      "Add 5 to both sides first, then divide by 2.",
      ["x ≥ 2", "x\\geq 2"]
    ),
  ],
};

// ── Lesson 8: Inequality Problem Solving ─────────────────────────────────────

const inequalityProblemSolving: LessonContent = {
  description:
    "Form and solve inequalities from real-world word problems, work with compound inequalities, and check whether values satisfy an inequality.",
  learningIntention:
    "Translate word problems into inequalities, solve them including compound inequalities, and interpret solutions in context.",
  successCriteria: [
    "Identify inequality language in word problems (at least, at most, no more than, exceeds).",
    "Write and solve a linear inequality from a word problem.",
    "Determine whether a given value satisfies an inequality by substituting.",
    "Solve and graph compound inequalities of the form $a < x \\leq b$.",
    "Interpret inequality solutions in real contexts such as minimum cost or maximum capacity.",
  ],
  teaching: {
    paragraphs: [
      "Many real situations involve a range of acceptable values rather than a single answer. Words like 'at least' mean $\\geq$, 'at most' and 'no more than' mean $\\leq$, 'exceeds' means $>$, and 'fewer than' means $<$. Identifying these key words is the first step in forming an inequality.",
      "Once you have identified the inequality, define a variable and write the inequality just as you would write an equation — then solve using inverse operations, remembering to reverse the sign if you multiply or divide by a negative number. Always interpret the answer in context: if x represents the number of items sold, x must also be a whole number.",
      "To check whether a specific value satisfies an inequality, substitute it in. For example, does $x = 5$ satisfy $3x - 2 > 10$? Substituting: $3(5) - 2 = 13 > 10$. Yes, it does.",
      "A compound inequality has two boundary conditions, for example $-2 < x \\leq 5$. This means x is greater than $-2$ AND at most 5. You can solve a compound inequality by performing the same operation on all three parts simultaneously: for $1 < 2x + 3 \\leq 11$, subtract 3 from all parts to get $-2 < 2x \\leq 8$, then divide by 2 to get $-1 < x \\leq 4$.",
      "On a number line, a compound inequality is represented by a segment — an open or closed circle at each end, with the region between them shaded.",
    ],
    latexBlocks: [
      "\\text{'at least 5'} \\rightarrow x \\geq 5,\\quad \\text{'at most 10'} \\rightarrow x \\leq 10",
      "1 < 2x + 3 \\leq 11 \\Rightarrow -2 < 2x \\leq 8 \\Rightarrow -1 < x \\leq 4",
      "\\text{Check } x = 3 \\text{ in } 4x - 1 > 10:\\quad 4(3) - 1 = 11 > 10 \\checkmark",
    ],
  },
  workedExamples: [
    {
      title: "Form and solve an inequality from a word problem",
      questionLatex: "\\text{A taxi charges a base fee of }\\$3\\text{ plus }\\$2\\text{ per kilometre. Find the maximum distance if the fare must stay below }\\$15.",
      steps: [
        {
          explanation: "Let d = distance in kilometres. Write the inequality for the fare.",
          latex: "3 + 2d < 15",
        },
        {
          explanation: "Subtract 3 from both sides.",
          latex: "2d < 12",
        },
        {
          explanation: "Divide both sides by 2.",
          latex: "d < 6",
        },
      ],
      finalAnswerLatex: "\\text{The distance must be less than 6 km.}",
    } as WorkedExample,
    {
      title: "Check whether a value satisfies an inequality",
      questionLatex: "\\text{Does }x = 4\\text{ satisfy }2x + 3 \\leq 11?",
      steps: [
        {
          explanation: "Substitute x = 4 into the left side.",
          latex: "2(4) + 3 = 11",
        },
        {
          explanation: "Check whether 11 ≤ 11.",
          latex: "11 \\leq 11 \\checkmark",
        },
      ],
      finalAnswerLatex: "\\text{Yes, }x = 4\\text{ satisfies the inequality.}",
    } as WorkedExample,
    {
      title: "Solve a compound inequality",
      questionLatex: "\\text{Solve }-1 < 3x - 4 \\leq 8.",
      steps: [
        {
          explanation: "Add 4 to all three parts.",
          latex: "3 < 3x \\leq 12",
        },
        {
          explanation: "Divide all three parts by 3.",
          latex: "1 < x \\leq 4",
        },
      ],
      finalAnswerLatex: "1 < x \\leq 4",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-ips-g1",
      "Which inequality represents 'a number x is at most 12'?",
      "C",
      [
        "$x > 12$",
        "$x \\geq 12$",
        "$x \\leq 12$",
        "$x < 12$",
      ],
      "'At most 12' means x cannot exceed 12, so x ≤ 12.",
      "Think about whether 12 itself is allowed, and whether the values below or above are included."
    ),
    answer(
      "y8-aeq-ips-g2",
      "Does x = 5 satisfy 3x − 2 > 10? Write YES or NO.",
      "\\text{Substitute }x = 5\\text{ into }3x - 2 > 10.",
      "YES",
      "3(5) − 2 = 13. Is 13 > 10? Yes.",
      "Replace x with 5 and evaluate the left side, then compare with 10.",
      ["yes", "Yes"]
    ),
    answer(
      "y8-aeq-ips-g3",
      "A hall can hold at most 150 people. There are already 87 people inside. Write and solve an inequality for the number of additional people, n, that can enter.",
      "87 + n \\leq 150,\\quad n \\leq \\;?",
      "63",
      "87 + n ≤ 150. Subtract 87 from both sides: n ≤ 63.",
      "Write 87 + n ≤ 150, then subtract 87 from both sides.",
      ["n ≤ 63", "n\\leq 63"]
    ),
    answer(
      "y8-aeq-ips-g4",
      "Solve the compound inequality −2 < x + 3 ≤ 7.",
      "-2 < x + 3 \\leq 7,\\quad \\text{find the range of }x.",
      "-5 < x ≤ 4",
      "Subtract 3 from all parts: −2 − 3 < x ≤ 7 − 3, giving −5 < x ≤ 4.",
      "Subtract 3 from every part of the compound inequality.",
      ["-5 < x \\leq 4", "−5 < x ≤ 4"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-ips-i1",
      "Does x = −3 satisfy −2x ≤ 5? Write YES or NO.",
      "\\text{Substitute }x = -3\\text{ into }-2x \\leq 5.",
      "NO",
      "−2(−3) = 6. Since 6 ≤ 5 is false, x = −3 does not satisfy the inequality, so the answer is NO.",
      "Replace x with −3: −2 × (−3) = 6. Then check whether 6 ≤ 5.",
      ["NO", "No", "no"]
    ),
    answer(
      "y8-aeq-ips-i2",
      "A student needs at least 65 marks to pass a test worth 80 marks. She has already scored 48 marks on the first part. Find the minimum marks m she must score on the second part.",
      "48 + m \\geq 65,\\quad m \\geq \\;?",
      "17",
      "48 + m ≥ 65. Subtract 48: m ≥ 17.",
      "Write 48 + m ≥ 65, then subtract 48 from both sides.",
      ["m ≥ 17", "m\\geq 17"]
    ),
    answer(
      "y8-aeq-ips-i3",
      "Solve the compound inequality 0 ≤ 2x − 4 < 10.",
      "0 \\leq 2x - 4 < 10,\\quad \\text{find the range of }x.",
      "2 ≤ x < 7",
      "Add 4 to all parts: 4 ≤ 2x < 14. Divide by 2: 2 ≤ x < 7.",
      "Add 4 to all three parts first, then divide by 2.",
      ["2 ≤ x < 7", "2 \\leq x < 7"]
    ),
    choice(
      "y8-aeq-ips-i4",
      "A speed limit sign reads 'maximum 60 km/h'. Which inequality represents all legal speeds s?",
      "B",
      [
        "$s < 60$",
        "$s \\leq 60$",
        "$s > 60$",
        "$s \\geq 60$",
      ],
      "A maximum speed of 60 km/h means you can travel at 60 km/h or below: s ≤ 60.",
      "Does 'maximum 60' include exactly 60 km/h?"
    ),
    answer(
      "y8-aeq-ips-i5",
      "A plumber charges $50 call-out fee plus $40 per hour. Find the maximum number of hours h he can work if the total cost must not exceed $250.",
      "50 + 40h \\leq 250,\\quad h \\leq \\;?",
      "5",
      "50 + 40h ≤ 250. Subtract 50: 40h ≤ 200. Divide by 40: h ≤ 5.",
      "Write 50 + 40h ≤ 250, subtract 50, then divide by 40.",
      ["h ≤ 5", "h\\leq 5"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing 'at least' with 'at most': writing x ≤ 5 when the problem says 'at least 5'.",
      fix: "'At least 5' means x cannot go below 5, so x ≥ 5. 'At most 5' means x cannot exceed 5, so x ≤ 5.",
    },
    {
      mistake: "Forgetting to reverse the inequality sign when multiplying or dividing by a negative in a compound inequality.",
      fix: "When you multiply or divide all parts of a compound inequality by a negative number, reverse both inequality symbols. For example, $-2 < -x \\leq 4$ becomes $-4 \\leq x < 2$ after multiplying by $-1$.",
    },
    {
      mistake: "Giving only the boundary value as the answer to a compound inequality: writing 'x = 4' instead of '1 < x ≤ 4'.",
      fix: "A compound inequality defines a range. Write both boundaries and the correct symbols, for example $1 < x \\leq 4$.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-aeq-ips-m1",
      "A lift has a maximum capacity of 8 people. There are currently 5 people in the lift. Which inequality gives the number of additional people p who can enter?",
      "B",
      [
        "$5 + p < 8$",
        "$5 + p \\leq 8$",
        "$5 + p > 8$",
        "$p \\leq 3$",
      ],
      "The total must not exceed the maximum of 8: 5 + p ≤ 8, which gives p ≤ 3.",
      "Write an inequality for the total number of people and use the maximum capacity."
    ),
    choice(
      "y8-aeq-ips-m2",
      "Solve −5x > 20.",
      "A",
      [
        "$x < -4$",
        "$x > -4$",
        "$x < 4$",
        "$x > 4$",
      ],
      "Divide both sides by −5 and reverse the sign: x < 20 ÷ (−5) = −4.",
      "Dividing by a negative reverses the inequality sign.",
      "-5x > 20,\\quad x = \\;?"
    ),
    answer(
      "y8-aeq-ips-m3",
      "Does x = 6 satisfy 4x − 5 ≥ 19? Write YES or NO.",
      "\\text{Substitute }x = 6\\text{ into }4x - 5 \\geq 19.",
      "YES",
      "4(6) − 5 = 24 − 5 = 19. Is 19 ≥ 19? Yes.",
      "Replace x with 6 and evaluate the left side, then compare with 19.",
      ["yes", "Yes"]
    ),
    answer(
      "y8-aeq-ips-m4",
      "A phone plan costs $20 per month plus $0.10 per text message. Find the maximum number of texts t you can send if your budget is $35 per month.",
      "20 + 0.10t \\leq 35,\\quad t \\leq \\;?",
      "150",
      "20 + 0.10t ≤ 35. Subtract 20: 0.10t ≤ 15. Divide by 0.10: t ≤ 150.",
      "Write 20 + 0.10t ≤ 35, subtract 20, then divide by 0.10.",
      ["t ≤ 150", "t\\leq 150"]
    ),
    answer(
      "y8-aeq-ips-m5",
      "Solve the compound inequality 3 ≤ 2x − 1 < 9.",
      "3 \\leq 2x - 1 < 9,\\quad \\text{find the range of }x.",
      "2 ≤ x < 5",
      "Add 1 to all parts: 4 ≤ 2x < 10. Divide by 2: 2 ≤ x < 5.",
      "Add 1 to all three parts, then divide everything by 2.",
      ["2 ≤ x < 5", "2 \\leq x < 5"]
    ),
    answer(
      "y8-aeq-ips-m6",
      "A driver must travel at least 180 km in 3 hours. Write and solve an inequality for the minimum average speed s in km/h.",
      "3s \\geq 180,\\quad s \\geq \\;?",
      "60",
      "3s ≥ 180. Divide by 3: s ≥ 60.",
      "Write 3s ≥ 180, then divide both sides by 3.",
      ["s ≥ 60", "s\\geq 60"]
    ),
    answer(
      "y8-aeq-ips-m7",
      "Does x = 0 satisfy −3x + 6 > 0? Write YES or NO.",
      "\\text{Substitute }x = 0\\text{ into }-3x + 6 > 0.",
      "YES",
      "−3(0) + 6 = 6. Is 6 > 0? Yes.",
      "Replace x with 0 and evaluate the left side.",
      ["yes", "Yes"]
    ),
    answer(
      "y8-aeq-ips-m8",
      "A school hall has 400 seats. At least 320 must be filled for the event to proceed. Write and solve an inequality for the number of empty seats e.",
      "400 - e \\geq 320,\\quad e \\leq \\;?",
      "80",
      "400 − e ≥ 320. Subtract 400 from both sides: −e ≥ −80. Multiply by −1 and reverse: e ≤ 80.",
      "Write 400 − e ≥ 320, then subtract 400 and remember to reverse the sign when multiplying by −1.",
      ["e ≤ 80", "e\\leq 80"]
    ),
    answer(
      "y8-aeq-ips-m9",
      "Solve the compound inequality −6 < 3x + 6 ≤ 15.",
      "-6 < 3x + 6 \\leq 15,\\quad \\text{find the range of }x.",
      "-4 < x ≤ 3",
      "Subtract 6 from all parts: −12 < 3x ≤ 9. Divide by 3: −4 < x ≤ 3.",
      "Subtract 6 from all three parts, then divide by 3.",
      ["-4 < x ≤ 3", "-4 < x \\leq 3"]
    ),
    answer(
      "y8-aeq-ips-m10",
      "A ticket costs $12. A group wants to spend less than $100 on tickets. Find the maximum number of tickets n the group can buy.",
      "12n < 100,\\quad n < \\;?",
      "8",
      "12n < 100. Divide by 12: n < 8.33... Since n must be a whole number, n ≤ 8.",
      "Write 12n < 100, divide by 12, then consider that the number of tickets must be a whole number.",
      ["8", "n ≤ 8", "n\\leq 8"]
    ),
  ],
};

// ── Lesson 9: Formula Rearrangement ──────────────────────────────────────────

const formulaRearrangement: LessonContent = {
  description:
    "Change the subject of a formula by isolating a specified variable using inverse operations, including formulas with fractions and square roots.",
  learningIntention:
    "Rearrange formulas to make a different variable the subject, using the same inverse-operation strategy as solving equations.",
  successCriteria: [
    "Explain what it means for a variable to be the 'subject' of a formula.",
    "Change the subject of simple formulas using one or two inverse operations.",
    "Change the subject of formulas involving fractions.",
    "Change the subject of formulas involving squares, taking the positive square root when the context requires it.",
    "Use a rearranged formula to evaluate an unknown given numerical values.",
  ],
  teaching: {
    paragraphs: [
      "A formula is an equation that expresses one variable in terms of others. The variable on its own on one side is called the subject. In A = lb, A is the subject. Changing the subject means rearranging so a different variable is isolated — for example, making b the subject gives b = A/l. The technique is identical to solving an equation: apply inverse operations to both sides until the target variable stands alone.",
      "The key misconception to name and dismiss is this: students sometimes think changing the subject is a different skill from solving equations. It is not. In v = u + at, making t the subject means treating t as the unknown and every other letter as a known constant. Subtract u from both sides (v − u = at), then divide by a (t = (v − u)/a). The steps are the same inverse-operation sequence used in any two-step equation.",
      "Formulas involving a square require one extra step: taking the square root. In A = πr², divide both sides by π to get r² = A/π, then take the positive square root to get r = √(A/π). Do not stop after dividing — the variable is still trapped under the square. In physical contexts (radius, speed, length) the subject must be positive, so take only the positive root.",
      "Formulas involving fractions are handled by multiplying both sides by the denominator first. In I = V/R, multiplying both sides by R gives IR = V, then dividing by I gives R = V/I. As always, perform the same operation to both sides and the balance is maintained.",
      "Real-world formulas follow the same rules. Speed: s = d/t → t = d/s. Temperature: C = 5/9(F − 32) → rearrange to find F. Simple interest: I = Prn → r = I/(Pn). In each case, identify the target variable, plan the inverse operations needed to isolate it, and execute them step by step.",
  ],
    latexBlocks: [
      "A = lb \\Rightarrow b = \\dfrac{A}{l}",
      "v = u + at \\Rightarrow t = \\dfrac{v - u}{a}",
      "A = \\pi r^2 \\Rightarrow r = \\sqrt{\\dfrac{A}{\\pi}}",
    ],
  },
  workedExamples: [
    {
      title: "Two-step formula rearrangement",
      questionLatex: "\\text{Make }t\\text{ the subject of }v = u + at.",
      steps: [
        {
          explanation: "Subtract u from both sides to isolate the term containing t.",
          latex: "v - u = at",
        },
        {
          explanation: "Divide both sides by a.",
          latex: "t = \\dfrac{v - u}{a}",
        },
      ],
      finalAnswerLatex: "t = \\dfrac{v - u}{a}",
    } as WorkedExample,
    {
      title: "Formula with a square root",
      questionLatex: "\\text{Make }r\\text{ the subject of }A = \\pi r^2.",
      steps: [
        {
          explanation: "Divide both sides by π to isolate r².",
          latex: "\\dfrac{A}{\\pi} = r^2",
        },
        {
          explanation: "Take the positive square root of both sides (radius must be positive).",
          latex: "r = \\sqrt{\\dfrac{A}{\\pi}}",
        },
      ],
      finalAnswerLatex: "r = \\sqrt{\\dfrac{A}{\\pi}}",
    } as WorkedExample,
    {
      title: "Formula involving a fraction",
      questionLatex: "\\text{Make }R\\text{ the subject of }I = \\dfrac{V}{R}.",
      steps: [
        {
          explanation: "Multiply both sides by R to remove R from the denominator.",
          latex: "IR = V",
        },
        {
          explanation: "Divide both sides by I to isolate R.",
          latex: "R = \\dfrac{V}{I}",
        },
      ],
      finalAnswerLatex: "R = \\dfrac{V}{I}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-aeq-frm-g1",
      "To make b the subject of a = b/c, which step is correct?",
      "B",
      [
        "Divide both sides by c",
        "Multiply both sides by c",
        "Subtract c from both sides",
        "Square both sides",
      ],
      "b is divided by c, so multiply both sides by c: a × c = b, giving b = ac.",
      "What operation is being applied to b in b/c? Use the inverse."
    ),
    answer(
      "y8-aeq-frm-g2",
      "Make x the subject of y = 3x + 7.",
      "y = 3x + 7,\\quad x = \\;?",
      "(y - 7) / 3",
      "Subtract 7 from both sides: y − 7 = 3x. Divide by 3: x = (y − 7)/3.",
      "Undo the +7 first (subtract 7), then undo the ×3 (divide by 3).",
      ["(y-7)/3", "\\frac{y-7}{3}"]
    ),
    answer(
      "y8-aeq-frm-g3",
      "Make r the subject of A = πr². Take the positive root only.",
      "A = \\pi r^2,\\quad r = \\;?",
      "sqrt(A/pi)",
      "Divide both sides by π: A/π = r². Take the positive square root: r = √(A/π).",
      "Divide both sides by π first to isolate r², then take the positive square root.",
      ["√(A/π)", "\\sqrt{A/\\pi}", "sqrt(A / pi)"]
    ),
    answer(
      "y8-aeq-frm-g4",
      "Using t = (v − u)/a, find t when v = 25, u = 5, and a = 4.",
      "t = \\dfrac{v - u}{a},\\quad v = 25,\\ u = 5,\\ a = 4",
      "5",
      "t = (25 − 5)/4 = 20/4 = 5.",
      "Substitute the values into the rearranged formula and evaluate step by step.",
      ["t = 5"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-aeq-frm-i1",
      "Make u the subject of v = u + at.",
      "v = u + at,\\quad u = \\;?",
      "v - at",
      "Subtract at from both sides: u = v − at.",
      "at is added to u, so subtract at from both sides.",
      ["v-at", "v - at"]
    ),
    choice(
      "y8-aeq-frm-i2",
      "A student rearranges A = ½bh to make h the subject and writes h = A/b. What is the error?",
      "C",
      [
        "The student should have divided by b first",
        "The student should have squared both sides",
        "The student forgot to multiply by 2; the correct answer is h = 2A/b",
        "There is no error; h = A/b is correct",
      ],
      "Multiply both sides by 2 first: 2A = bh. Then divide by b: h = 2A/b. The factor of ½ means a factor of 2 appears when rearranging.",
      "Start from A = ½bh. What must you do to remove the ½?"
    ),
    answer(
      "y8-aeq-frm-i3",
      "Make h the subject of A = ½bh.",
      "A = \\tfrac{1}{2}bh,\\quad h = \\;?",
      "2A / b",
      "Multiply both sides by 2: 2A = bh. Divide both sides by b: h = 2A/b.",
      "Multiply both sides by 2 to clear the fraction, then divide by b.",
      ["2A/b", "\\frac{2A}{b}"]
    ),
    answer(
      "y8-aeq-frm-i4",
      "Make R the subject of I = V/R.",
      "I = \\dfrac{V}{R},\\quad R = \\;?",
      "V / I",
      "Multiply both sides by R: IR = V. Divide both sides by I: R = V/I.",
      "Multiply both sides by R first to get R out of the denominator, then divide by I.",
      ["V/I", "\\frac{V}{I}"]
    ),
    answer(
      "y8-aeq-frm-i5",
      "Using s = d/t rearranged to t = d/s, find the time to travel 240 km at a speed of 80 km/h.",
      "t = \\dfrac{d}{s},\\quad d = 240,\\ s = 80",
      "3",
      "t = 240/80 = 3 hours.",
      "Substitute d = 240 and s = 80 into t = d/s and evaluate.",
      ["t = 3", "3 hours"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Stopping after moving a term without fully isolating the subject: rearranging v = u + at for t as v − u = at and leaving the answer as at instead of dividing by a.",
      fix: "Keep going until the target variable is completely alone. After v − u = at, divide both sides by a to get t = (v − u)/a.",
    },
    {
      mistake: "Forgetting to take the square root after isolating a squared variable: writing r² = A/π as the final answer when making r the subject of A = πr².",
      fix: "Once r² is isolated, take the positive square root of both sides: r = √(A/π). The subject must be r, not r².",
    },
    {
      mistake: "Confusing the formula for the area of a triangle: rearranging A = ½bh as h = A/b by ignoring the ½.",
      fix: "Multiply both sides by 2 first to clear the fraction: 2A = bh. Then divide by b to get h = 2A/b.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-aeq-frm-m1",
      "Make a the subject of v² = u² + 2as.",
      "B",
      [
        "$a = \\dfrac{v^2 + u^2}{2s}$",
        "$a = \\dfrac{v^2 - u^2}{2s}$",
        "$a = \\dfrac{v^2 - u^2}{s}$",
        "$a = 2s(v^2 - u^2)$",
      ],
      "Subtract u²: v² − u² = 2as. Divide by 2s: a = (v² − u²)/(2s).",
      "Subtract u² from both sides first, then divide by 2s.",
      "v^2 = u^2 + 2as,\\quad a = \\;?"
    ),
    choice(
      "y8-aeq-frm-m2",
      "The temperature formula is $C = \\frac{5}{9}(F - 32)$. Make $F$ the subject.",
      "A",
      [
        "$F = \\dfrac{9C}{5} + 32$",
        "$F = \\dfrac{9C + 32}{5}$",
        "$F = \\dfrac{5C}{9} + 32$",
        "$F = \\dfrac{9(C + 32)}{5}$",
      ],
      "Multiply both sides by 9/5: (9/5)C = F − 32. Add 32: F = 9C/5 + 32.",
      "Multiply both sides by 9/5 to remove the fraction, then add 32.",
      "C = \\dfrac{5}{9}(F - 32),\\quad F = \\;?"
    ),
    answer(
      "y8-aeq-frm-m3",
      "Make b the subject of A = lb.",
      "A = lb,\\quad b = \\;?",
      "A / l",
      "Divide both sides by l: b = A/l.",
      "l is multiplied by b, so divide both sides by l.",
      ["A/l", "\\frac{A}{l}"]
    ),
    answer(
      "y8-aeq-frm-m4",
      "Make t the subject of s = d/t.",
      "s = \\dfrac{d}{t},\\quad t = \\;?",
      "d / s",
      "Multiply both sides by t: st = d. Divide by s: t = d/s.",
      "Multiply both sides by t to remove it from the denominator, then divide by s.",
      ["d/s", "\\frac{d}{s}"]
    ),
    answer(
      "y8-aeq-frm-m5",
      "Make s the subject of v² = u² + 2as.",
      "v^2 = u^2 + 2as,\\quad s = \\;?",
      "(v^2 - u^2) / (2a)",
      "Subtract u²: v² − u² = 2as. Divide by 2a: s = (v² − u²)/(2a).",
      "Subtract u² from both sides, then divide by 2a.",
      ["(v²-u²)/(2a)", "\\frac{v^2-u^2}{2a}"]
    ),
    answer(
      "y8-aeq-frm-m6",
      "Make r the subject of I = Prn (simple interest). P, n are constants.",
      "I = Prn,\\quad r = \\;?",
      "I / (Pn)",
      "Divide both sides by Pn: r = I/(Pn).",
      "r is multiplied by P and n, so divide both sides by Pn.",
      ["I/(Pn)", "\\frac{I}{Pn}"]
    ),
    answer(
      "y8-aeq-frm-m7",
      "Make x the subject of y = 5x − 3.",
      "y = 5x - 3,\\quad x = \\;?",
      "(y + 3) / 5",
      "Add 3 to both sides: y + 3 = 5x. Divide by 5: x = (y + 3)/5.",
      "Add 3 to both sides first, then divide by 5.",
      ["(y+3)/5", "\\frac{y+3}{5}"]
    ),
    answer(
      "y8-aeq-frm-m8",
      "Using the formula r = I/(Pn), find the rate r when I = 360, P = 1500, n = 4.",
      "r = \\dfrac{I}{Pn},\\quad I = 360,\\ P = 1500,\\ n = 4",
      "0.06",
      "r = 360/(1500 × 4) = 360/6000 = 0.06.",
      "Multiply P and n first, then divide I by that product.",
      ["6/100", "6%", "0.06"]
    ),
    answer(
      "y8-aeq-frm-m9",
      "Make u the subject of v² = u² + 2as. Take the positive root only.",
      "v^2 = u^2 + 2as,\\quad u = \\;?",
      "sqrt(v^2 - 2as)",
      "Subtract 2as from both sides: u² = v² − 2as. Take the positive square root: u = √(v² − 2as).",
      "Subtract 2as from both sides to isolate u², then take the positive square root.",
      ["√(v²-2as)", "\\sqrt{v^2-2as}", "sqrt(v^2-2as)"]
    ),
    answer(
      "y8-aeq-frm-m10",
      "A rectangle has area A = lb. The area is 54 cm² and the length is 9 cm. Use the rearranged formula b = A/l to find the width.",
      "b = \\dfrac{A}{l},\\quad A = 54,\\ l = 9",
      "6",
      "b = 54/9 = 6 cm.",
      "Substitute A = 54 and l = 9 into b = A/l.",
      ["b = 6", "6 cm"]
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "solving-one-step-equations":               solvingOneStepEquations,
  "solving-two-step-equations":               solvingTwoStepEquations,
  "equations-with-brackets":                  equationsWithBrackets,
  "equations-with-pronumerals-on-both-sides": equationsPronumeralsBothSides,
  "forming-equations-from-word-problems":     formingEquationsWordProblems,
  "checking-solutions-and-error-analysis":    checkingSolutionsErrorAnalysis,
  "linear-inequalities":                      linearInequalities,
  "inequality-problem-solving":               inequalityProblemSolving,
  "formula-rearrangement":                    formulaRearrangement,
};

export function year8AlgebraEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "algebra-equations"
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
