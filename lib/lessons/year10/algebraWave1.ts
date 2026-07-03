// Year 10 restructure — Wave 1 (Algebra). Authors the hidden interim stubs in
//   Unit 1 (algebra-equations-linear-relationships): review-of-algebra, equations-complex-algebraic-fractions, regions-cartesian-plane
//   Unit 5 (quadratic-expressions-equations): completing-the-square-factorising, quadratic-problems, solving-completing-the-square
// Architecture untouched (no checkpoint/derivation/redirect changes). Local helpers carry
// EXPLICIT explanations (the shared algExplanation fallback emits a banned "The answer is X").
// MCQ mix mirrors the Standard-1 benchmark: 1 guided / 1 independent / 3 mastery.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint: "Identify the method first, then work step by step.",
    explanation,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    difficulty,
    hint: "Apply the rule, then check each option.",
    explanation,
  };
}

// ── 1A Review of Algebra (core) ────────────────────────────────────────────────────────
const reviewOfAlgebra: Partial<ExplicitLesson> = {
  description: "Collect like terms, multiply and divide algebraic terms, and substitute values into expressions.",
  learningIntention: "Simplify algebraic expressions by collecting like terms and substitute values to evaluate them.",
  successCriteria: [
    "Identify like terms and collect them.",
    "Multiply and divide simple algebraic terms.",
    "Substitute given values into an expression and evaluate.",
    "Write a simplified expression in its simplest form.",
  ],
  teaching: {
    paragraphs: [
      "An algebraic term is a number multiplied by one or more pronumerals, like 5x or 3ab. The number in front is the coefficient. LIKE terms have exactly the same pronumeral part (3x and 5x are like; 3x and 3y are not), and only like terms can be added or subtracted.",
      "Collecting like terms means adding their coefficients: 4x + 3x = 7x, while 4x + 3y stays as 4x + 3y because the terms are unlike. Think of x and y as different objects — you cannot combine apples with oranges.",
      "Multiplying and dividing terms works on the numbers and pronumerals together: 5 × 2x = 10x, 2x × 3x = 6x², and 8a ÷ 2 = 4a. Multiplication combines unlike pronumerals (no requirement to be 'like').",
      "Substitution replaces each pronumeral with a given number, then evaluates using order of operations. For x = 3, 2x + 5 = 2(3) + 5 = 11. Watch negatives: if x = −2, then x² = (−2)² = 4.",
    ],
    latexBlocks: [
      "4x + 3x = 7x\\quad\\text{(like terms)}",
      "5 \\times 2x = 10x,\\quad 2x \\times 3x = 6x^2",
      "\\text{If } x = 3:\\ 2x + 5 = 2(3) + 5 = 11",
    ],
  },
  workedExamples: [
    {
      title: "Collecting like terms",
      questionLatex: "\\text{Simplify } 3a + 5a - 2a.",
      steps: [
        { explanation: "All three are like terms — add and subtract the coefficients.", latex: "3 + 5 - 2 = 6" },
        { explanation: "Write the result.", latex: "3a + 5a - 2a = 6a" },
      ],
      finalAnswerLatex: "6a",
    },
    {
      title: "Substitution",
      questionLatex: "\\text{Evaluate } 2x + 7 \\text{ when } x = 4.",
      steps: [
        { explanation: "Replace x with 4.", latex: "2(4) + 7" },
        { explanation: "Evaluate.", latex: "8 + 7 = 15" },
      ],
      finalAnswerLatex: "15",
    },
    {
      title: "Multiplying terms",
      questionLatex: "\\text{Simplify } 4a \\times 2b.",
      steps: [
        { explanation: "Multiply the coefficients.", latex: "4 \\times 2 = 8" },
        { explanation: "Multiply the pronumerals (unlike, so they combine).", latex: "a \\times b = ab" },
      ],
      finalAnswerLatex: "8ab",
    },
  ],
  guidedPractice: [
    mcq("y10-roa-g1", "Simplify 4x + 3x.", "A", ["$7x$", "$12x$", "$7x^2$", "$1x$"], 1,
      "4x and 3x are like terms, so add the coefficients: 4 + 3 = 7, giving 7x. They are not multiplied (that would give 12x²) and the pronumeral stays x."),
    ans("y10-roa-g2", "Simplify 5a − 2a.", "5a-2a", "3a", 1, "Like terms: subtract the coefficients, 5 − 2 = 3, giving 3a.", ["3a"]),
    ans("y10-roa-g3", "Evaluate 2x + 5 when x = 3.", "2x+5,\\ x=3", "11", 2, "Substitute x = 3: 2(3) + 5 = 6 + 5 = 11.", ["11"]),
    ans("y10-roa-g4", "Simplify 3x + 2y + 4x.", "3x+2y+4x", "7x + 2y", 2, "Collect only the like terms: 3x + 4x = 7x. The 2y is unlike and stays, giving 7x + 2y.", ["7x+2y"]),
  ],
  independentPractice: [
    mcq("y10-roa-i1", "Which pair are like terms?", "C", ["$3x$ and $3y$", "$2x$ and $2x^2$", "$3x$ and $5x$", "$4a$ and $4b$"], 2,
      "Like terms have identical pronumeral parts. 3x and 5x both have the pronumeral x, so they are like; the others differ in pronumeral or power."),
    ans("y10-roa-i2", "Simplify 6a + 2b − a + 3b.", "6a+2b-a+3b", "5a + 5b", 3, "Collect like terms: 6a − a = 5a and 2b + 3b = 5b, giving 5a + 5b.", ["5a+5b"]),
    ans("y10-roa-i3", "Evaluate 3a + 2b when a = 2 and b = 3.", "3a+2b", "12", 3, "Substitute: 3(2) + 2(3) = 6 + 6 = 12.", ["12"]),
    ans("y10-roa-i4", "Simplify 2x × 3x.", "2x \\times 3x", "6x^2", 2, "Multiply the coefficients (2 × 3 = 6) and the pronumerals (x × x = x²), giving 6x².", ["6x^2", "6x²"]),
    ans("y10-roa-i5", "Evaluate x² + 1 when x = −2.", "x^2+1,\\ x=-2", "5", 3, "Substitute: (−2)² + 1 = 4 + 1 = 5. A negative squared is positive.", ["5"]),
  ],
  masteryQuiz: [
    ans("y10-roa-m1", "Simplify 7y − 3y + y.", "7y-3y+y", "5y", 1, "Like terms: 7 − 3 + 1 = 5, giving 5y.", ["5y"]),
    mcq("y10-roa-m2", "Simplify 8a ÷ 2.", "A", ["$4a$", "$6a$", "$16a$", "$4$"], 2, "Divide the coefficient by 2: 8 ÷ 2 = 4, and the pronumeral a remains, giving 4a."),
    ans("y10-roa-m3", "Evaluate 3x − 4 when x = 5.", "3x-4,\\ x=5", "11", 2, "Substitute: 3(5) − 4 = 15 − 4 = 11.", ["11"]),
    ans("y10-roa-m4", "Simplify 2a + 3a + 4b.", "2a+3a+4b", "5a + 4b", 2, "Collect like terms: 2a + 3a = 5a; 4b is unlike and stays, giving 5a + 4b.", ["5a+4b"]),
    mcq("y10-roa-m5", "Which is the simplest form of 3x + x?", "B", ["$3x^2$", "$4x$", "$3x$", "$4x^2$"], 2, "x means 1x, so 3x + 1x = 4x. The terms are added (like terms), not multiplied."),
    ans("y10-roa-m6", "Simplify 5 × 2x.", "5 \\times 2x", "10x", 1, "Multiply the numbers: 5 × 2 = 10, giving 10x.", ["10x"]),
    ans("y10-roa-m7", "Evaluate xy when x = 2 and y = 4.", "xy,\\ x=2,\\ y=4", "8", 2, "xy means x × y = 2 × 4 = 8.", ["8"]),
    mcq("y10-roa-m8", "Are 3x and 3y like terms?", "B", ["Yes", "No", "Only if x = y", "Only when added"], 2, "Like terms need identical pronumerals. x and y are different pronumerals, so 3x and 3y are NOT like terms."),
    ans("y10-roa-m9", "Simplify 10a − 4a − a.", "10a-4a-a", "5a", 2, "Like terms: 10 − 4 − 1 = 5, giving 5a.", ["5a"]),
    ans("y10-roa-m10", "Evaluate 2x² when x = 3.", "2x^2,\\ x=3", "18", 3, "Square first, then multiply: 2 × (3)² = 2 × 9 = 18.", ["18"]),
  ],
  commonMistakes: [
    { mistake: "Combining unlike terms, e.g. writing 4x + 3y = 7xy.", fix: "Only like terms combine; 4x + 3y stays as 4x + 3y." },
    { mistake: "Adding when multiplying, e.g. 2x × 3x = 5x.", fix: "Multiply coefficients and pronumerals: 2x × 3x = 6x²." },
    { mistake: "Squaring a negative as negative, e.g. (−2)² = −4.", fix: "A negative squared is positive: (−2)² = 4." },
    { mistake: "Dropping the pronumeral when dividing, e.g. 8a ÷ 2 = 4.", fix: "Only the coefficient is divided: 8a ÷ 2 = 4a." },
  ],
  masteryPassMark: 0.8,
};

// ── 1D Equations with Complex Algebraic Fractions (path) ───────────────────────────────
const equationsComplexFractions: Partial<ExplicitLesson> = {
  description: "Solve linear equations involving algebraic fractions by multiplying through by the lowest common denominator.",
  learningIntention: "Solve equations containing algebraic fractions by clearing the denominators with the LCD.",
  successCriteria: [
    "Find the lowest common denominator of the fractions in an equation.",
    "Multiply every term by the LCD to clear the fractions.",
    "Solve the resulting linear equation.",
    "Check the solution by substitution.",
  ],
  teaching: {
    paragraphs: [
      "Fractions in an equation are hard to work with directly, so the key move is to CLEAR them. Multiply EVERY term on both sides by the lowest common denominator (LCD) of all the fractions, and the denominators cancel.",
      "The LCD is the smallest expression every denominator divides into. For x/2 + x/3 the denominators are 2 and 3, so the LCD is 6. Multiplying each term by 6 turns x/2 into 3x and x/3 into 2x.",
      "After clearing fractions you are left with an ordinary linear equation: collect like terms and solve with inverse operations. For x/2 + x/3 = 5, multiplying by 6 gives 3x + 2x = 30, so 5x = 30 and x = 6.",
      "Multiply the WHOLE term — including any number on the right-hand side — by the LCD, not just the fractions. Forgetting a term is the most common error. Finish by checking your answer back in the original equation.",
    ],
    latexBlocks: [
      "\\frac{x}{2} + \\frac{x}{3} = 5 \\quad\\xrightarrow{\\times 6}\\quad 3x + 2x = 30",
      "5x = 30 \\Rightarrow x = 6",
      "\\text{LCD = smallest number every denominator divides into}",
    ],
  },
  workedExamples: [
    {
      title: "Clearing two fractions",
      questionLatex: "\\text{Solve } \\frac{x}{2} + \\frac{x}{3} = 5.",
      steps: [
        { explanation: "LCD of 2 and 3 is 6. Multiply every term by 6.", latex: "6\\cdot\\frac{x}{2} + 6\\cdot\\frac{x}{3} = 6\\cdot 5" },
        { explanation: "Simplify each term.", latex: "3x + 2x = 30" },
        { explanation: "Collect and solve.", latex: "5x = 30 \\Rightarrow x = 6" },
      ],
      finalAnswerLatex: "x = 6",
    },
    {
      title: "Fractions with brackets",
      questionLatex: "\\text{Solve } \\frac{x+1}{2} = \\frac{x-1}{3}.",
      steps: [
        { explanation: "Cross-multiply (LCD 6).", latex: "3(x+1) = 2(x-1)" },
        { explanation: "Expand.", latex: "3x + 3 = 2x - 2" },
        { explanation: "Solve.", latex: "x = -5" },
      ],
      finalAnswerLatex: "x = -5",
    },
    {
      title: "Subtraction of fractions",
      questionLatex: "\\text{Solve } \\frac{x}{4} - \\frac{x}{6} = 1.",
      steps: [
        { explanation: "LCD of 4 and 6 is 12. Multiply every term by 12.", latex: "3x - 2x = 12" },
        { explanation: "Simplify and solve.", latex: "x = 12" },
      ],
      finalAnswerLatex: "x = 12",
    },
  ],
  guidedPractice: [
    mcq("y10-ecf-g1", "To solve x/4 + x/2 = 3, which number should you multiply every term by?", "B", ["2", "4", "6", "8"], 3,
      "The LCD of 4 and 2 is 4 (the smallest number both divide into), so multiply every term by 4."),
    ans("y10-ecf-g2", "Solve x/2 = 5.", "\\frac{x}{2}=5", "10", 2, "Multiply both sides by 2: x = 10.", ["x=10", "x = 10"]),
    ans("y10-ecf-g3", "Solve x/3 + x/3 = 4.", "\\frac{x}{3}+\\frac{x}{3}=4", "6", 3, "The left side is 2x/3, so 2x/3 = 4. Multiply by 3: 2x = 12, then x = 6.", ["x=6", "x = 6"]),
    ans("y10-ecf-g4", "Solve x/2 + x/4 = 3.", "\\frac{x}{2}+\\frac{x}{4}=3", "4", 3, "LCD is 4: multiply through to get 2x + x = 12, so 3x = 12 and x = 4.", ["x=4", "x = 4"]),
  ],
  independentPractice: [
    ans("y10-ecf-i1", "Solve x/5 = 2.", "\\frac{x}{5}=2", "10", 2, "Multiply both sides by 5: x = 10.", ["x=10", "x = 10"]),
    mcq("y10-ecf-i2", "What is the lowest common denominator of x/3 and x/4?", "C", ["7", "1", "12", "24"], 3,
      "The LCD is the smallest number both 3 and 4 divide into, which is 12."),
    ans("y10-ecf-i3", "Solve x/2 + x/3 = 5.", "\\frac{x}{2}+\\frac{x}{3}=5", "6", 4, "LCD 6: 3x + 2x = 30, so 5x = 30 and x = 6.", ["x=6", "x = 6"]),
    ans("y10-ecf-i4", "Solve (x + 2)/3 = 4.", "\\frac{x+2}{3}=4", "10", 3, "Multiply both sides by 3: x + 2 = 12, so x = 10.", ["x=10", "x = 10"]),
    ans("y10-ecf-i5", "Solve x/4 − x/6 = 1.", "\\frac{x}{4}-\\frac{x}{6}=1", "12", 4, "LCD 12: 3x − 2x = 12, so x = 12.", ["x=12", "x = 12"]),
  ],
  masteryQuiz: [
    ans("y10-ecf-m1", "Solve x/3 = 7.", "\\frac{x}{3}=7", "21", 2, "Multiply both sides by 3: x = 21.", ["x=21", "x = 21"]),
    mcq("y10-ecf-m2", "What is the LCD of x/2 and x/5?", "B", ["7", "10", "20", "2"], 3, "The smallest number both 2 and 5 divide into is 10."),
    ans("y10-ecf-m3", "Solve x/2 + x/2 = 8.", "\\frac{x}{2}+\\frac{x}{2}=8", "8", 2, "The left side is x, so x = 8.", ["x=8", "x = 8"]),
    ans("y10-ecf-m4", "Solve x/3 + x/6 = 3.", "\\frac{x}{3}+\\frac{x}{6}=3", "6", 4, "LCD 6: 2x + x = 18, so 3x = 18 and x = 6.", ["x=6", "x = 6"]),
    mcq("y10-ecf-m5", "What is the first step to solve x/4 + x/3 = 7?", "C", ["Subtract x/3", "Square both sides", "Multiply every term by 12", "Add the numerators"], 3,
      "Clear the fractions first by multiplying every term by the LCD of 4 and 3, which is 12."),
    ans("y10-ecf-m6", "Solve (x − 1)/2 = 3.", "\\frac{x-1}{2}=3", "7", 3, "Multiply both sides by 2: x − 1 = 6, so x = 7.", ["x=7", "x = 7"]),
    ans("y10-ecf-m7", "Solve x/2 − x/5 = 3.", "\\frac{x}{2}-\\frac{x}{5}=3", "10", 4, "LCD 10: 5x − 2x = 30, so 3x = 30 and x = 10.", ["x=10", "x = 10"]),
    mcq("y10-ecf-m8", "Solve x/3 = 6.", "A", ["18", "2", "9", "3"], 2, "Multiply both sides by 3: x = 18."),
    ans("y10-ecf-m9", "Solve 2x/3 = 8.", "\\frac{2x}{3}=8", "12", 4, "Multiply both sides by 3: 2x = 24, then x = 12.", ["x=12", "x = 12"]),
    ans("y10-ecf-m10", "Solve x/4 + 1 = 3.", "\\frac{x}{4}+1=3", "8", 3, "Subtract 1: x/4 = 2. Multiply by 4: x = 8.", ["x=8", "x = 8"]),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the fractions by the LCD, not the whole-number terms.", fix: "Every term — including numbers on the right — is multiplied by the LCD." },
    { mistake: "Using the product of denominators instead of the LCD.", fix: "Use the smallest common denominator (e.g. 6 for 2 and 3, not necessarily 6 for all)." },
    { mistake: "Adding numerators over different denominators directly.", fix: "Clear the denominators first by multiplying through by the LCD." },
    { mistake: "Forgetting to check the answer.", fix: "Substitute the solution back into the original equation to confirm." },
  ],
  masteryPassMark: 0.8,
};

// ── 1L Regions on the Cartesian Plane (path) ───────────────────────────────────────────
const regionsCartesianPlane: Partial<ExplicitLesson> = {
  description: "Graph linear inequalities as regions, using a solid or dashed boundary line and a test point to choose the shaded side.",
  learningIntention: "Represent a linear inequality as a shaded region, choosing the correct boundary style and side.",
  successCriteria: [
    "Decide whether the boundary line is solid (≤, ≥) or dashed (<, >).",
    "Use a test point to decide which side of the line to shade.",
    "Interpret simple inequalities such as x ≥ a and y ≤ b.",
    "Check whether a point satisfies a given inequality.",
  ],
  teaching: {
    paragraphs: [
      "A linear inequality such as y < x + 1 is satisfied by a whole REGION of points, not just a line. To graph it, first draw the boundary line (y = x + 1), then shade every point on the correct side.",
      "The boundary line's style shows whether the line itself is included. For ≤ or ≥ the points ON the line count, so the line is SOLID. For < or > the line is not included, so it is DASHED.",
      "To pick which side to shade, use a TEST POINT — usually (0, 0) if it is not on the line. Substitute it into the inequality: if the statement is TRUE, shade the side containing the test point; if FALSE, shade the other side. For y < x + 1 at (0,0): 0 < 1 is true, so shade the side with the origin.",
      "Simple inequalities are quick: x ≥ 2 is a vertical boundary at x = 2 with everything to the RIGHT shaded; y ≤ 5 is a horizontal boundary at y = 5 with everything BELOW shaded.",
    ],
    latexBlocks: [
      "\\le,\\ \\ge \\Rightarrow \\text{solid line};\\qquad <,\\ > \\Rightarrow \\text{dashed line}",
      "\\text{Test }(0,0)\\text{ in } y < x+1:\\ 0 < 1\\ \\text{true} \\Rightarrow \\text{shade that side}",
      "x \\ge 2:\\ \\text{shade right};\\qquad y \\le 5:\\ \\text{shade below}",
    ],
  },
  workedExamples: [
    {
      title: "Boundary style and side",
      questionLatex: "\\text{Describe the region } y \\le 2x + 3.",
      steps: [
        { explanation: "The ≤ sign includes the line, so the boundary is solid.", latex: "y = 2x+3\\ \\text{(solid)}" },
        { explanation: "Test (0,0): 0 ≤ 3 is true, so shade the side with the origin.", latex: "0 \\le 3\\ \\checkmark" },
      ],
      finalAnswerLatex: "\\text{Solid line, shade the origin side}",
    },
    {
      title: "Strict inequality",
      questionLatex: "\\text{Describe the region } y > x.",
      steps: [
        { explanation: "The > sign excludes the line, so the boundary is dashed.", latex: "y = x\\ \\text{(dashed)}" },
        { explanation: "Test (0,1): 1 > 0 is true, so shade above the line.", latex: "1 > 0\\ \\checkmark" },
      ],
      finalAnswerLatex: "\\text{Dashed line, shade above}",
    },
    {
      title: "A vertical boundary",
      questionLatex: "\\text{Describe the region } x \\ge 2.",
      steps: [
        { explanation: "The ≥ sign includes the line, so the boundary x = 2 is solid (vertical).", latex: "x = 2\\ \\text{(solid)}" },
        { explanation: "x ≥ 2 means x is 2 or more, so shade to the right.", latex: "\\text{shade right of } x = 2" },
      ],
      finalAnswerLatex: "\\text{Solid vertical line, shade right}",
    },
  ],
  guidedPractice: [
    mcq("y10-reg-g1", "For the region y ≤ 2x, the boundary line should be drawn:", "A", ["Solid", "Dashed", "Dotted then solid", "Not drawn"], 2,
      "The ≤ sign includes points on the line, so the boundary line is solid."),
    ans("y10-reg-g2", "For y < x, is the boundary line solid or dashed?", "y<x", "dashed", 2, "The strict < sign excludes the line, so it is drawn dashed.", ["dashed line"]),
    ans("y10-reg-g3", "Test the point (0, 0) in y < x + 2. Is the inequality satisfied? Answer yes or no.", "y<x+2,\\ (0,0)", "yes", 2, "Substitute: 0 < 0 + 2, i.e. 0 < 2, which is true.", ["Yes"]),
    ans("y10-reg-g4", "For the region y ≥ 3, do you shade above or below the line y = 3?", "y \\ge 3", "above", 2, "y ≥ 3 means y is 3 or more, which is the region above the horizontal line y = 3.", ["above the line"]),
  ],
  independentPractice: [
    mcq("y10-reg-i1", "The region y > x + 1 is drawn with a boundary line that is:", "B", ["Solid", "Dashed", "Vertical", "Horizontal"], 2,
      "The strict > sign means the line is not included, so it is dashed."),
    ans("y10-reg-i2", "Does the point (1, 1) satisfy y ≤ 2x? Answer yes or no.", "y \\le 2x,\\ (1,1)", "yes", 3, "Substitute: 1 ≤ 2(1), i.e. 1 ≤ 2, which is true.", ["Yes"]),
    ans("y10-reg-i3", "For x ≥ 2, do you shade to the left or the right of the line x = 2?", "x \\ge 2", "right", 3, "x ≥ 2 means x is 2 or more, the region to the right of the vertical line x = 2.", ["the right"]),
    ans("y10-reg-i4", "Does the point (0, 0) lie in the region y > x + 5? Answer yes or no.", "y>x+5,\\ (0,0)", "no", 3, "Substitute: 0 > 0 + 5, i.e. 0 > 5, which is false.", ["No"]),
    ans("y10-reg-i5", "For y ≥ x, is the boundary line solid or dashed?", "y \\ge x", "solid", 2, "The ≥ sign includes the line, so it is solid.", ["solid line"]),
  ],
  masteryQuiz: [
    ans("y10-reg-m1", "Does the point (0, 0) satisfy y < 4? Answer yes or no.", "y<4,\\ (0,0)", "yes", 2, "Substitute y = 0: 0 < 4, which is true.", ["Yes"]),
    mcq("y10-reg-m2", "An inequality using ≤ or ≥ is graphed with a:", "A", ["Solid line", "Dashed line", "Curved line", "No line"], 2, "≤ and ≥ include the boundary, so the line is solid."),
    ans("y10-reg-m3", "Does the point (2, 3) satisfy y > x? Answer yes or no.", "y>x,\\ (2,3)", "yes", 2, "Substitute: 3 > 2, which is true.", ["Yes"]),
    ans("y10-reg-m4", "For x < 1, do you shade to the left or right of x = 1?", "x<1", "left", 2, "x < 1 means x is less than 1, the region to the left of the line x = 1.", ["the left"]),
    mcq("y10-reg-m5", "The region y > 2x + 1 has a boundary line that is:", "B", ["Solid", "Dashed", "Horizontal", "Always through the origin"], 2, "The strict > sign excludes the line, so it is dashed."),
    ans("y10-reg-m6", "Does the point (0, 0) satisfy y ≥ x − 3? Answer yes or no.", "y \\ge x-3,\\ (0,0)", "yes", 3, "Substitute: 0 ≥ 0 − 3, i.e. 0 ≥ −3, which is true.", ["Yes"]),
    ans("y10-reg-m7", "Does the point (4, 1) satisfy y < x? Answer yes or no.", "y<x,\\ (4,1)", "yes", 2, "Substitute: 1 < 4, which is true.", ["Yes"]),
    mcq("y10-reg-m8", "For y ≤ 5, you shade the region:", "B", ["Above the line y = 5", "Below the line y = 5", "Left of x = 5", "Right of x = 5"], 2, "y ≤ 5 means y is 5 or less, the region below the horizontal line y = 5."),
    ans("y10-reg-m9", "Is the point (3, 3) on the boundary line y = x? Answer yes or no.", "y=x,\\ (3,3)", "yes", 2, "Substitute: 3 = 3 is true, so the point lies on the line.", ["Yes"]),
    ans("y10-reg-m10", "Does the point (1, 5) satisfy y > 2x? Answer yes or no.", "y>2x,\\ (1,5)", "yes", 3, "Substitute: 5 > 2(1), i.e. 5 > 2, which is true.", ["Yes"]),
  ],
  commonMistakes: [
    { mistake: "Using a solid line for a strict inequality (< or >).", fix: "Strict inequalities exclude the boundary — draw it dashed." },
    { mistake: "Shading the wrong side without testing.", fix: "Substitute a test point like (0,0); shade the side that makes the inequality true." },
    { mistake: "Confusing x ≥ a (vertical boundary) with y ≥ a (horizontal boundary).", fix: "x = a is vertical (shade left/right); y = a is horizontal (shade up/down)." },
    { mistake: "Testing a point that lies on the boundary.", fix: "Choose a test point not on the line, such as the origin when the line misses it." },
  ],
  masteryPassMark: 0.8,
};

// ── 5F Completing the Square (Factorising) (path) ──────────────────────────────────────
const completingSquareFactorising: Partial<ExplicitLesson> = {
  description: "Rewrite a quadratic x² + bx + c in completed-square form (x + b/2)² − (b/2)² + c.",
  learningIntention: "Complete the square on a monic quadratic by halving the x-coefficient and adjusting the constant.",
  successCriteria: [
    "Halve the coefficient of x and square it.",
    "Write the perfect square (x + b/2)².",
    "Subtract (b/2)² and add the original constant to keep the expression equal.",
    "State the completed-square form of x² + bx + c.",
  ],
  teaching: {
    paragraphs: [
      "Completing the square rewrites x² + bx + c so it contains a perfect square (x + something)². The trick comes from the identity (x + p)² = x² + 2px + p²: the number inside the bracket is HALF the coefficient of x.",
      "So for x² + bx, take half of b and square it: (x + b/2)² gives you x² + bx + (b/2)². That is (b/2)² too much, so you SUBTRACT it back: x² + bx = (x + b/2)² − (b/2)².",
      "For example x² + 6x: half of 6 is 3, and 3² = 9, so x² + 6x = (x + 3)² − 9. Expanding (x + 3)² − 9 = x² + 6x + 9 − 9 = x² + 6x confirms it.",
      "When there is a constant c, carry it along: x² + 8x + 10 = (x + 4)² − 16 + 10 = (x + 4)² − 6. The (b/2)² you subtract depends only on b; the constant is then combined separately.",
    ],
    latexBlocks: [
      "x^2 + bx = \\left(x + \\tfrac{b}{2}\\right)^2 - \\left(\\tfrac{b}{2}\\right)^2",
      "x^2 + 6x = (x+3)^2 - 9",
      "x^2 + 8x + 10 = (x+4)^2 - 16 + 10 = (x+4)^2 - 6",
    ],
  },
  workedExamples: [
    {
      title: "Completing the square (no constant)",
      questionLatex: "\\text{Complete the square: } x^2 + 6x.",
      steps: [
        { explanation: "Half of 6 is 3; square it to get 9.", latex: "\\left(\\tfrac{6}{2}\\right)^2 = 9" },
        { explanation: "Write the square and subtract 9.", latex: "x^2 + 6x = (x+3)^2 - 9" },
      ],
      finalAnswerLatex: "(x+3)^2 - 9",
    },
    {
      title: "Completing the square with a constant",
      questionLatex: "\\text{Write } x^2 + 8x + 10 \\text{ in completed-square form.}",
      steps: [
        { explanation: "Half of 8 is 4; 4² = 16.", latex: "x^2 + 8x = (x+4)^2 - 16" },
        { explanation: "Add the original constant 10.", latex: "(x+4)^2 - 16 + 10 = (x+4)^2 - 6" },
      ],
      finalAnswerLatex: "(x+4)^2 - 6",
    },
    {
      title: "A negative x-coefficient",
      questionLatex: "\\text{Complete the square: } x^2 - 10x.",
      steps: [
        { explanation: "Half of −10 is −5; square it to get 25.", latex: "\\left(\\tfrac{-10}{2}\\right)^2 = 25" },
        { explanation: "Write the square and subtract 25.", latex: "x^2 - 10x = (x-5)^2 - 25" },
      ],
      finalAnswerLatex: "(x-5)^2 - 25",
    },
  ],
  guidedPractice: [
    mcq("y10-cts-g1", "To complete the square on x² + 6x, what number do you add and subtract?", "C", ["6", "3", "9", "36"], 3,
      "Take half of the coefficient of x (6 ÷ 2 = 3) and square it: 3² = 9."),
    ans("y10-cts-g2", "Complete the square: x² + 4x = (x + 2)² − ?", "x^2+4x", "4", 2, "Half of 4 is 2, and 2² = 4, so x² + 4x = (x + 2)² − 4.", ["4"]),
    ans("y10-cts-g3", "For x² + 10x, what is (half of 10) squared?", "x^2+10x", "25", 2, "Half of 10 is 5, and 5² = 25.", ["25"]),
    ans("y10-cts-g4", "Complete the square: x² + 6x = (x + 3)² − ?", "x^2+6x", "9", 2, "Half of 6 is 3, and 3² = 9, so x² + 6x = (x + 3)² − 9.", ["9"]),
  ],
  independentPractice: [
    mcq("y10-cts-i1", "x² + 8x = (x + 4)² − ?", "B", ["8", "16", "4", "64"], 3, "Half of 8 is 4, and 4² = 16, so the subtracted number is 16."),
    ans("y10-cts-i2", "Complete the square: x² + 2x = (x + 1)² − ?", "x^2+2x", "1", 2, "Half of 2 is 1, and 1² = 1.", ["1"]),
    ans("y10-cts-i3", "Complete the square: x² − 6x = (x − 3)² − ?", "x^2-6x", "9", 3, "Half of −6 is −3, and (−3)² = 9, so x² − 6x = (x − 3)² − 9.", ["9"]),
    ans("y10-cts-i4", "For x² + 12x, what number completes the square (the one you add and subtract)?", "x^2+12x", "36", 3, "Half of 12 is 6, and 6² = 36.", ["36"]),
    ans("y10-cts-i5", "Write x² + 10x + 20 as (x + 5)² + ?", "x^2+10x+20", "-5", 4, "x² + 10x = (x + 5)² − 25, then + 20 gives (x + 5)² − 5, so the number is −5.", ["−5", "-5"]),
  ],
  masteryQuiz: [
    ans("y10-cts-m1", "Complete the square: x² + 4x = (x + 2)² − ?", "x^2+4x", "4", 2, "Half of 4 is 2, 2² = 4.", ["4"]),
    mcq("y10-cts-m2", "What number completes the square for x² + 14x?", "C", ["14", "28", "49", "7"], 3, "Half of 14 is 7, and 7² = 49."),
    ans("y10-cts-m3", "Complete the square: x² − 8x = (x − 4)² − ?", "x^2-8x", "16", 3, "Half of −8 is −4, (−4)² = 16.", ["16"]),
    ans("y10-cts-m4", "Write x² + 2x + 5 as (x + 1)² + ?", "x^2+2x+5", "4", 4, "x² + 2x = (x + 1)² − 1, then + 5 gives (x + 1)² + 4.", ["4"]),
    mcq("y10-cts-m5", "Halving the coefficient of x and squaring it is the method called:", "B", ["Factorising by grouping", "Completing the square", "Difference of two squares", "The null factor law"], 2,
      "Halving b and squaring to form (x + b/2)² is completing the square."),
    ans("y10-cts-m6", "Complete the square: x² + 20x = (x + 10)² − ?", "x^2+20x", "100", 3, "Half of 20 is 10, 10² = 100.", ["100"]),
    ans("y10-cts-m7", "Write x² + 6x + 11 as (x + 3)² + ?", "x^2+6x+11", "2", 4, "x² + 6x = (x + 3)² − 9, then + 11 gives (x + 3)² + 2.", ["2"]),
    mcq("y10-cts-m8", "What number is added and subtracted to complete the square on x² + 5x?", "B", ["25", "6.25", "2.5", "5"], 4, "Half of 5 is 2.5, and 2.5² = 6.25."),
    ans("y10-cts-m9", "Complete the square: x² − 10x = (x − 5)² − ?", "x^2-10x", "25", 3, "Half of −10 is −5, (−5)² = 25.", ["25"]),
    ans("y10-cts-m10", "Write x² + 16x + 70 as (x + 8)² + ?", "x^2+16x+70", "6", 4, "x² + 16x = (x + 8)² − 64, then + 70 gives (x + 8)² + 6.", ["6"]),
  ],
  commonMistakes: [
    { mistake: "Adding b² instead of (b/2)².", fix: "Halve b FIRST, then square: the number is (b/2)²." },
    { mistake: "Forgetting to subtract (b/2)² to keep the expression equal.", fix: "(x + b/2)² is (b/2)² too big, so subtract it back." },
    { mistake: "Ignoring the original constant c.", fix: "Carry c along and combine it with −(b/2)² at the end." },
    { mistake: "Halving the constant instead of the x-coefficient.", fix: "Halve the coefficient of x (the b term), not the constant." },
  ],
  masteryPassMark: 0.8,
};

// ── 5H Quadratic Problems (core) ───────────────────────────────────────────────────────
const quadraticProblems: Partial<ExplicitLesson> = {
  description: "Form and solve quadratic equations from worded problems by factorising and applying the null factor law.",
  learningIntention: "Translate a worded situation into a quadratic equation and solve it by factorising.",
  successCriteria: [
    "Write a quadratic equation equal to zero from a worded problem.",
    "Factorise the quadratic and apply the null factor law.",
    "Choose the solution that fits the context.",
    "Check the answer against the original problem.",
  ],
  teaching: {
    paragraphs: [
      "Many problems lead to a quadratic equation. The reliable method is: form an equation, rearrange it so one side is ZERO, factorise, then use the null factor law — if a product is zero, at least one factor is zero.",
      "Getting to zero matters because the null factor law only works against zero. For x² − 5x + 6 = 0, factorise to (x − 2)(x − 3) = 0, so x − 2 = 0 or x − 3 = 0, giving x = 2 or x = 3.",
      "Worded problems hide the equation. 'Two consecutive integers multiply to 56' becomes n(n + 1) = 56, i.e. n² + n − 56 = 0, which factorises to (n + 8)(n − 7) = 0. The integers are 7 and 8 (taking n = 7).",
      "A quadratic usually has TWO solutions, but the context often rules one out — a length or a count cannot be negative. Always check which solution makes sense and verify it in the original wording.",
    ],
    latexBlocks: [
      "\\text{Null factor law: if } (x-a)(x-b)=0 \\text{ then } x=a \\text{ or } x=b",
      "x^2 - 5x + 6 = 0 \\Rightarrow (x-2)(x-3)=0 \\Rightarrow x = 2 \\text{ or } 3",
      "n(n+1) = 56 \\Rightarrow n^2 + n - 56 = 0 \\Rightarrow (n+8)(n-7)=0",
    ],
  },
  workedExamples: [
    {
      title: "Consecutive integers",
      questionLatex: "\\text{Two consecutive integers have a product of 56. Find the smaller integer.}",
      steps: [
        { explanation: "Let the integers be n and n + 1; form the equation.", latex: "n(n+1) = 56 \\Rightarrow n^2 + n - 56 = 0" },
        { explanation: "Factorise and apply the null factor law.", latex: "(n+8)(n-7)=0 \\Rightarrow n = -8 \\text{ or } 7" },
        { explanation: "Take the positive integer.", latex: "n = 7" },
      ],
      finalAnswerLatex: "7",
    },
    {
      title: "Rectangle area",
      questionLatex: "\\text{A rectangle's length is 3 more than its width and its area is 40. Find the width.}",
      steps: [
        { explanation: "Let width = w; form the equation.", latex: "w(w+3) = 40 \\Rightarrow w^2 + 3w - 40 = 0" },
        { explanation: "Factorise.", latex: "(w+8)(w-5)=0 \\Rightarrow w = -8 \\text{ or } 5" },
        { explanation: "A width must be positive.", latex: "w = 5" },
      ],
      finalAnswerLatex: "5",
    },
    {
      title: "Difference of two squares",
      questionLatex: "\\text{Solve } x^2 - 16 = 0.",
      steps: [
        { explanation: "Factorise as a difference of two squares.", latex: "(x-4)(x+4) = 0" },
        { explanation: "Apply the null factor law.", latex: "x = 4 \\text{ or } x = -4" },
      ],
      finalAnswerLatex: "x = 4 \\text{ or } x = -4",
    },
  ],
  guidedPractice: [
    mcq("y10-qp-g1", "To solve a quadratic by factorising, you must first make one side equal to:", "C", ["1", "the constant term", "0", "x"], 2,
      "The null factor law needs a product equal to zero, so rearrange the equation to equal 0 first."),
    ans("y10-qp-g2", "Solve x² − 5x + 6 = 0. Give the smaller solution.", "x^2-5x+6=0", "2", 3, "Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3. The smaller is 2.", ["x=2"]),
    ans("y10-qp-g3", "Two consecutive integers have a product of 12. Find the smaller integer.", "", "3", 3, "n² + n − 12 = 0 factorises to (n + 4)(n − 3) = 0, so n = 3 (the positive integer); the integers are 3 and 4.", ["3"]),
    ans("y10-qp-g4", "Solve x² = 9. Give the positive solution.", "x^2=9", "3", 2, "x² − 9 = 0 gives (x − 3)(x + 3) = 0, so x = 3 or x = −3. The positive solution is 3.", ["3"]),
  ],
  independentPractice: [
    mcq("y10-qp-i1", "Which is the correct factorisation of x² + x − 6?", "A", ["$(x+3)(x-2)$", "$(x-3)(x+2)$", "$(x+6)(x-1)$", "$(x+3)(x+2)$"], 3,
      "Find two numbers with product −6 and sum +1: that is +3 and −2, so (x + 3)(x − 2)."),
    ans("y10-qp-i2", "Solve x² − 7x + 10 = 0. Give the larger solution.", "x^2-7x+10=0", "5", 3, "Factorise: (x − 2)(x − 5) = 0, so x = 2 or x = 5. The larger is 5.", ["x=5"]),
    ans("y10-qp-i3", "A square has an area of 49 cm². Find its side length (cm).", "", "7", 2, "s² = 49, so s = 7 (a length must be positive).", ["7 cm"]),
    ans("y10-qp-i4", "Two consecutive integers have a product of 30. Find the smaller integer.", "", "5", 3, "n² + n − 30 = 0 gives (n + 6)(n − 5) = 0, so n = 5; the integers are 5 and 6.", ["5"]),
    ans("y10-qp-i5", "Solve x² − 16 = 0. Give the positive solution.", "x^2-16=0", "4", 2, "(x − 4)(x + 4) = 0, so x = 4 or x = −4. The positive solution is 4.", ["4"]),
  ],
  masteryQuiz: [
    ans("y10-qp-m1", "Solve x² − 9x + 20 = 0. Give the smaller solution.", "x^2-9x+20=0", "4", 3, "(x − 4)(x − 5) = 0, so x = 4 or x = 5. The smaller is 4.", ["x=4"]),
    mcq("y10-qp-m2", "Which is the correct factorisation of x² − x − 12?", "A", ["$(x-4)(x+3)$", "$(x+4)(x-3)$", "$(x-6)(x+2)$", "$(x-4)(x-3)$"], 3,
      "Two numbers with product −12 and sum −1: −4 and +3, so (x − 4)(x + 3)."),
    ans("y10-qp-m3", "A rectangle has width w and length w + 2, with area 35. Find the width.", "", "5", 4, "w² + 2w − 35 = 0 gives (w + 7)(w − 5) = 0, so w = 5 (positive).", ["5"]),
    ans("y10-qp-m4", "Solve x² = 25. Give the positive solution.", "x^2=25", "5", 2, "(x − 5)(x + 5) = 0, so x = 5 or x = −5. The positive solution is 5.", ["5"]),
    mcq("y10-qp-m5", "The first step in solving a quadratic worded problem is to:", "B", ["Guess and check", "Form an equation and set it equal to 0", "Divide by x", "Take the square root immediately"], 3,
      "Translate the words into an equation and rearrange it to equal zero so it can be factorised."),
    ans("y10-qp-m6", "Two consecutive integers have a product of 42. Find the smaller integer.", "", "6", 3, "n² + n − 42 = 0 gives (n + 7)(n − 6) = 0, so n = 6; the integers are 6 and 7.", ["6"]),
    ans("y10-qp-m7", "Solve x² + 2x − 15 = 0. Give the positive solution.", "x^2+2x-15=0", "3", 3, "(x + 5)(x − 3) = 0, so x = −5 or x = 3. The positive solution is 3.", ["x=3"]),
    mcq("y10-qp-m8", "Which is the correct factorisation of x² − 6x?", "A", ["$x(x-6)$", "$(x-6)(x+1)$", "$(x-3)(x-2)$", "$x(x+6)$"], 2,
      "Take out the common factor x: x² − 6x = x(x − 6)."),
    ans("y10-qp-m9", "A positive number added to its square gives 20. Find the number.", "", "4", 4, "n² + n − 20 = 0 gives (n + 5)(n − 4) = 0, so n = 4 (positive).", ["4"]),
    ans("y10-qp-m10", "A rectangle's length is 5 more than its width and its area is 24. Find the width.", "", "3", 4, "w² + 5w − 24 = 0 gives (w + 8)(w − 3) = 0, so w = 3 (positive).", ["3"]),
  ],
  commonMistakes: [
    { mistake: "Applying the null factor law without setting the equation to zero.", fix: "Rearrange to '= 0' before factorising; the law only works against zero." },
    { mistake: "Giving a negative length or count as an answer.", fix: "Reject solutions that the context forbids (lengths/counts are positive)." },
    { mistake: "Only finding one solution.", fix: "A quadratic usually has two; find both, then choose the valid one." },
    { mistake: "Forgetting to form the equation from the words.", fix: "Define a variable, translate the sentence, then solve." },
  ],
  masteryPassMark: 0.8,
};

// ── 5I Solving by Completing the Square (path) ─────────────────────────────────────────
const solvingCompletingSquare: Partial<ExplicitLesson> = {
  description: "Solve quadratic equations by completing the square and taking the square root of both sides.",
  learningIntention: "Solve a monic quadratic equation by completing the square, then square-rooting both sides.",
  successCriteria: [
    "Complete the square to rewrite the equation as (x + p)² = q.",
    "Take the square root of both sides, keeping the ± sign.",
    "Solve for the two values of x.",
    "Recognise when completing the square is needed instead of simple factorising.",
  ],
  teaching: {
    paragraphs: [
      "Completing the square also SOLVES quadratics, even ones that do not factorise neatly. The plan: move the constant, complete the square so the equation reads (x + p)² = q, then take the square root of both sides.",
      "The crucial step is the square root: (x + p)² = q gives x + p = ±√q — the ± is essential, because both a positive and a negative root square to q. Missing it loses one of the two solutions.",
      "For example x² + 6x + 5 = 0: complete the square to (x + 3)² − 9 + 5 = 0, so (x + 3)² = 4. Then x + 3 = ±2, giving x = −1 or x = −5.",
      "When q is not a perfect square the answers are surds: x² − 4x − 1 = 0 becomes (x − 2)² = 5, so x = 2 ± √5. The method works the same way; you just leave the answer in surd form.",
    ],
    latexBlocks: [
      "(x+p)^2 = q \\Rightarrow x + p = \\pm\\sqrt{q}",
      "x^2 + 6x + 5 = 0 \\Rightarrow (x+3)^2 = 4 \\Rightarrow x = -1 \\text{ or } -5",
      "x^2 - 4x - 1 = 0 \\Rightarrow (x-2)^2 = 5 \\Rightarrow x = 2 \\pm \\sqrt{5}",
    ],
  },
  workedExamples: [
    {
      title: "Completing the square to solve",
      questionLatex: "\\text{Solve } x^2 + 6x + 5 = 0.",
      steps: [
        { explanation: "Complete the square: half of 6 is 3, 3² = 9.", latex: "(x+3)^2 - 9 + 5 = 0" },
        { explanation: "Rearrange to (x + p)² = q.", latex: "(x+3)^2 = 4" },
        { explanation: "Square-root both sides (keep ±) and solve.", latex: "x + 3 = \\pm 2 \\Rightarrow x = -1 \\text{ or } -5" },
      ],
      finalAnswerLatex: "x = -1 \\text{ or } x = -5",
    },
    {
      title: "Surd answer",
      questionLatex: "\\text{Solve } x^2 - 4x - 1 = 0.",
      steps: [
        { explanation: "Complete the square: half of −4 is −2, (−2)² = 4.", latex: "(x-2)^2 - 4 - 1 = 0" },
        { explanation: "Rearrange.", latex: "(x-2)^2 = 5" },
        { explanation: "Square-root both sides.", latex: "x = 2 \\pm \\sqrt{5}" },
      ],
      finalAnswerLatex: "x = 2 \\pm \\sqrt{5}",
    },
    {
      title: "A perfect-square result",
      questionLatex: "\\text{Solve } x^2 + 4x + 3 = 0.",
      steps: [
        { explanation: "Complete the square: half of 4 is 2, 2² = 4.", latex: "(x+2)^2 - 4 + 3 = 0" },
        { explanation: "Rearrange and square-root both sides.", latex: "(x+2)^2 = 1 \\Rightarrow x = -1 \\text{ or } -3" },
      ],
      finalAnswerLatex: "x = -1 \\text{ or } x = -3",
    },
  ],
  guidedPractice: [
    mcq("y10-scs-g1", "Completing the square on x² + 6x + 5 = 0 gives (x + 3)² = ?", "B", ["9", "4", "5", "1"], 4,
      "x² + 6x + 5 = (x + 3)² − 9 + 5 = (x + 3)² − 4, so (x + 3)² = 4."),
    ans("y10-scs-g2", "(x + 2)² = 9, so x + 2 = ±3. Give the positive solution for x.", "(x+2)^2=9", "1", 3, "x + 2 = ±3 gives x = 1 or x = −5. The positive solution is 1.", ["x=1"]),
    ans("y10-scs-g3", "(x − 3)² = 16. Give the larger solution for x.", "(x-3)^2=16", "7", 3, "x − 3 = ±4 gives x = 7 or x = −1. The larger is 7.", ["x=7"]),
    ans("y10-scs-g4", "Rewrite x² + 4x + 3 = 0 as (x + 2)² = ?", "x^2+4x+3=0", "1", 3, "(x + 2)² − 4 + 3 = 0, so (x + 2)² = 1.", ["1"]),
  ],
  independentPractice: [
    mcq("y10-scs-i1", "(x + 1)² = 4. The solutions for x are:", "C", ["$x = 2$ or $x = -2$", "$x = 3$ or $x = -3$", "$x = 1$ or $x = -3$", "$x = 1$ only"], 4,
      "x + 1 = ±2 gives x = 1 or x = −3."),
    ans("y10-scs-i2", "Rewrite x² − 6x + 8 = 0 as (x − 3)² = ?", "x^2-6x+8=0", "1", 3, "(x − 3)² − 9 + 8 = 0, so (x − 3)² = 1.", ["1"]),
    ans("y10-scs-i3", "(x − 4)² = 9. Give the larger solution for x.", "(x-4)^2=9", "7", 3, "x − 4 = ±3 gives x = 7 or x = 1. The larger is 7.", ["x=7"]),
    ans("y10-scs-i4", "Rewrite x² + 2x − 3 = 0 as (x + 1)² = ?", "x^2+2x-3=0", "4", 3, "(x + 1)² − 1 − 3 = 0, so (x + 1)² = 4.", ["4"]),
    ans("y10-scs-i5", "(x + 5)² = 0. Give the solution for x.", "(x+5)^2=0", "-5", 2, "x + 5 = 0, so x = −5 (a single repeated solution).", ["x=-5", "−5"]),
  ],
  masteryQuiz: [
    ans("y10-scs-m1", "Rewrite x² + 8x + 15 = 0 as (x + 4)² = ?", "x^2+8x+15=0", "1", 3, "(x + 4)² − 16 + 15 = 0, so (x + 4)² = 1.", ["1"]),
    mcq("y10-scs-m2", "(x − 2)² = 16. The solutions are:", "A", ["$x = 6$ or $x = -2$", "$x = 4$ or $x = -4$", "$x = 6$ or $x = 2$", "$x = 8$ or $x = -8$"], 4,
      "x − 2 = ±4 gives x = 6 or x = −2."),
    ans("y10-scs-m3", "Rewrite x² − 10x + 21 = 0 as (x − 5)² = ?", "x^2-10x+21=0", "4", 3, "(x − 5)² − 25 + 21 = 0, so (x − 5)² = 4.", ["4"]),
    ans("y10-scs-m4", "(x + 3)² = 25. Give the positive solution for x.", "(x+3)^2=25", "2", 3, "x + 3 = ±5 gives x = 2 or x = −8. The positive solution is 2.", ["x=2"]),
    mcq("y10-scs-m5", "After reaching (x + p)² = q, the next step is to:", "B", ["Expand the bracket", "Take the square root of both sides (with ±)", "Add q to both sides", "Factorise again"], 3,
      "Square-root both sides, keeping the ± sign, then solve for x."),
    ans("y10-scs-m6", "Rewrite x² + 6x + 8 = 0 as (x + 3)² = ?", "x^2+6x+8=0", "1", 3, "(x + 3)² − 9 + 8 = 0, so (x + 3)² = 1.", ["1"]),
    ans("y10-scs-m7", "(x − 1)² = 36. Give the larger solution for x.", "(x-1)^2=36", "7", 3, "x − 1 = ±6 gives x = 7 or x = −5. The larger is 7.", ["x=7"]),
    mcq("y10-scs-m8", "x² + 2x + 1 = 0 becomes (x + 1)² = 0, so x =", "C", ["1", "0", "−1", "±1"], 3,
      "(x + 1)² = 0 means x + 1 = 0, so x = −1 (a single repeated root)."),
    ans("y10-scs-m9", "Rewrite x² − 4x + 3 = 0 as (x − 2)² = ?", "x^2-4x+3=0", "1", 3, "(x − 2)² − 4 + 3 = 0, so (x − 2)² = 1.", ["1"]),
    ans("y10-scs-m10", "(x + 4)² = 49. Give the positive solution for x.", "(x+4)^2=49", "3", 4, "x + 4 = ±7 gives x = 3 or x = −11. The positive solution is 3.", ["x=3"]),
  ],
  commonMistakes: [
    { mistake: "Dropping the ± when square-rooting.", fix: "(x + p)² = q gives x + p = ±√q — always include both roots." },
    { mistake: "Forgetting to move the constant before square-rooting.", fix: "Rearrange to (x + p)² = q first, isolating the square." },
    { mistake: "Halving the constant instead of the x-coefficient when completing the square.", fix: "Halve the coefficient of x (b), not the constant." },
    { mistake: "Expecting whole-number answers always.", fix: "If q is not a perfect square, leave the answer in surd form (x = p ± √q)." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "review-of-algebra": reviewOfAlgebra,
  "equations-complex-algebraic-fractions": equationsComplexFractions,
  "regions-cartesian-plane": regionsCartesianPlane,
  "completing-the-square-factorising": completingSquareFactorising,
  "quadratic-problems": quadraticProblems,
  "solving-completing-the-square": solvingCompletingSquare,
};

export function year10AlgebraWave1LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    !["algebra-equations-linear-relationships", "quadratic-expressions-equations"].includes(unit.slug)
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
