import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { enhanceYear9CoreLesson } from "./coreDepthEnhancements";

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
    hint: "Use inverse operations to isolate x, working one step at a time.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = ""
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Think about which operation was last applied to x and undo it.",
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

const linearEquationsTwoStep: LessonContent = {
  description: "Solve linear equations that require two inverse operations, including those with a bracket.",
  learningIntention: "Solve linear equations of the form ax + b = c and a(x + b) = c.",
  successCriteria: [
    "Identify the two operations applied to x in an equation.",
    "Apply inverse operations in reverse order to isolate x.",
    "Solve equations of the form ax + b = c.",
    "Solve equations of the form a(x + b) = c by dividing before subtracting.",
  ],
  teaching: {
    paragraphs: [
      "Solving an equation means finding the value of x that makes it true. To do this, we use inverse operations to undo everything that has been done to x until x is alone on one side.",
      "For an equation like 3x + 4 = 19, two things have been done to x: it was multiplied by 3, then 4 was added. To undo this, work in reverse order: subtract 4 first, then divide by 3.",
      "For an equation like 4(x + 2) = 24, divide both sides by 4 first to undo the multiplication, giving x + 2 = 6. Then subtract 2 to get x = 4.",
      "After solving, always check by substituting your answer back into the original equation. If both sides are equal, the solution is correct.",
    ],
    latexBlocks: [
      "3x+4=19\\implies 3x=15\\implies x=5",
      "4(x+2)=24\\implies x+2=6\\implies x=4",
    ],
  },
  workedExamples: [
    {
      title: "Solve a two-step equation",
      questionLatex: "\\text{Solve }3x+4=19.",
      steps: [
        { explanation: "Subtract 4 from both sides to undo the addition.", latex: "3x+4-4=19-4\\implies3x=15" },
        { explanation: "Divide both sides by 3 to undo the multiplication.", latex: "x=\\frac{15}{3}=5" },
        { explanation: "Check: substitute x = 5 into the original equation.", latex: "3(5)+4=15+4=19\\checkmark" },
      ],
      finalAnswerLatex: "x=5",
    },
    {
      title: "Solve an equation with subtraction",
      questionLatex: "\\text{Solve }2x-7=9.",
      steps: [
        { explanation: "Add 7 to both sides to undo the subtraction.", latex: "2x-7+7=9+7\\implies2x=16" },
        { explanation: "Divide both sides by 2.", latex: "x=\\frac{16}{2}=8" },
      ],
      finalAnswerLatex: "x=8",
    },
    {
      title: "Solve an equation with a bracket",
      questionLatex: "\\text{Solve }3(2x-1)=15.",
      steps: [
        { explanation: "Divide both sides by 3 to remove the bracket's coefficient.", latex: "2x-1=5" },
        { explanation: "Add 1 to both sides.", latex: "2x=6" },
        { explanation: "Divide both sides by 2.", latex: "x=3" },
      ],
      finalAnswerLatex: "x=3",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-equ-two-g1",
      "What is the first step to solve 2x + 5 = 11?",
      "B",
      [
        "Divide both sides by 2.",
        "Subtract 5 from both sides.",
        "Add 5 to both sides.",
        "Multiply both sides by 2.",
      ],
      "Subtraction undoes the +5, isolating the 2x term before dividing."
    ),
    answer(
      "y9c-equ-two-g2",
      "Solve the equation.",
      "3x+4=16",
      "4",
      "3x = 12, so x = 4."
    ),
    answer(
      "y9c-equ-two-g3",
      "Solve the equation.",
      "2x-7=9",
      "8",
      "2x = 16, so x = 8."
    ),
    answer(
      "y9c-equ-two-g4",
      "Solve the equation.",
      "5x+3=28",
      "5",
      "5x = 25, so x = 5."
    ),
  ],
  independentPractice: [
    answer(
      "y9c-equ-two-i1",
      "Solve the equation.",
      "4x-3=13",
      "4",
      "4x = 16, so x = 4."
    ),
    answer(
      "y9c-equ-two-i2",
      "Solve the equation.",
      "6x+7=43",
      "6",
      "6x = 36, so x = 6."
    ),
    answer(
      "y9c-equ-two-i3",
      "Solve the equation.",
      "9-2x=3",
      "3",
      "-2x = -6, so x = 3."
    ),
    answer(
      "y9c-equ-two-i4",
      "Solve the equation.",
      "4(x+2)=24",
      "4",
      "Divide by 4: x + 2 = 6. Subtract 2: x = 4."
    ),
    choice(
      "y9c-equ-two-i5",
      "Solve the equation shown. What is x?",
      "B",
      ["1", "2", "4", "8"],
      "4x + 9 = 17 gives 4x = 8, so x = 2.",
      "4x+9=17"
    ),
  ],
  commonMistakes: [
    { mistake: "Applying inverse operations in the wrong order.", fix: "Work in reverse: undo the last operation first. For ax + b = c, subtract b before dividing by a." },
    { mistake: "Performing the operation on one side only.", fix: "Whatever you do to one side, do exactly the same to the other side." },
    { mistake: "Sign error when subtracting a negative: 9 - 2x = 3 gives 2x = 6 instead of -2x = -6.", fix: "Subtract 9 from both sides: -2x = 3 - 9 = -6, so x = 3." },
    { mistake: "Not dividing first when there is a bracket: 4(x + 2) = 24, writing 4x + 2 = 24.", fix: "The bracket coefficient 4 applies to the whole bracket. Divide first or expand carefully." },
  ],
  masteryQuiz: [
    answer(
      "y9c-equ-two-m1",
      "Solve the equation.",
      "7x-5=51",
      "8",
      "7x = 56, so x = 8."
    ),
    answer(
      "y9c-equ-two-m2",
      "Solve the equation.",
      "3x+15=0",
      "-5",
      "3x = -15, so x = -5.",
      ["-5"]
    ),
    answer(
      "y9c-equ-two-m3",
      "Solve the equation.",
      "10-3x=1",
      "3",
      "-3x = -9, so x = 3."
    ),
    choice(
      "y9c-equ-two-m4",
      "Solve the equation shown. What is x?",
      "A",
      ["-4", "4", "-3", "3"],
      "12 + 3x = 0 gives 3x = -12, so x = -4.",
      "12+3x=0"
    ),
    answer(
      "y9c-equ-two-m5",
      "Solve the equation.",
      "4(x+2)=24",
      "4",
      "Divide by 4: x + 2 = 6. Subtract 2: x = 4."
    ),
    answer(
      "y9c-equ-two-m6",
      "Solve the equation.",
      "3(2x-1)=15",
      "3",
      "Divide by 3: 2x - 1 = 5. Add 1: 2x = 6. Divide by 2: x = 3."
    ),
    choice(
      "y9c-equ-two-m7",
      "Solve the equation shown. What is x?",
      "A",
      ["2", "7", "12", "4"],
      "2(x + 5) = 14 gives x + 5 = 7, so x = 2.",
      "2(x+5)=14"
    ),
    answer(
      "y9c-equ-two-m8",
      "Solve the equation.",
      "5(x-3)=10",
      "5",
      "Divide by 5: x - 3 = 2. Add 3: x = 5."
    ),
    answer(
      "y9c-equ-two-m9",
      "Solve the equation.",
      "20-4x=8",
      "3",
      "-4x = -12, so x = 3."
    ),
    answer(
      "y9c-equ-two-m10",
      "Solve the equation.",
      "3(2x+1)=21",
      "3",
      "Divide by 3: 2x + 1 = 7. Subtract 1: 2x = 6. Divide by 2: x = 3."
    ),
  ],
};

const linearEquationsThreeStep: LessonContent = {
  description: "Solve linear equations with variables on both sides, or that require expanding a bracket before solving.",
  learningIntention: "Solve linear equations of up to three steps, including equations with the variable on both sides.",
  successCriteria: [
    "Collect variable terms on one side and constants on the other.",
    "Solve equations with the variable appearing on both sides.",
    "Expand a bracket and then solve the resulting equation.",
    "Solve equations involving a negative bracket.",
  ],
  teaching: {
    paragraphs: [
      "When the variable x appears on both sides of an equation, the first step is to collect all x terms on one side. Choose the side with the larger x coefficient to keep the coefficient positive.",
      "For example, in 5x + 3 = 2x + 12, subtract 2x from both sides to get 3x + 3 = 12. Then subtract 3 to get 3x = 9, and divide by 3 to get x = 3.",
      "When a bracket appears, expand it first, then solve. For 2(x + 3) = x + 10, expand to get 2x + 6 = x + 10, then collect x terms: x = 4.",
      "A bracket with a negative coefficient requires particular care: -(x + 4) = -x - 4. Change the sign of every term inside.",
    ],
    latexBlocks: [
      "5x+3=2x+12\\implies3x=9\\implies x=3",
      "2(x+3)=x+10\\implies2x+6=x+10\\implies x=4",
    ],
  },
  workedExamples: [
    {
      title: "Variable on both sides",
      questionLatex: "\\text{Solve }5x-3=3x+7.",
      steps: [
        { explanation: "Subtract 3x from both sides to collect x terms on the left.", latex: "5x-3x-3=7\\implies2x-3=7" },
        { explanation: "Add 3 to both sides.", latex: "2x=10" },
        { explanation: "Divide both sides by 2.", latex: "x=5" },
      ],
      finalAnswerLatex: "x=5",
    },
    {
      title: "Expand bracket then solve",
      questionLatex: "\\text{Solve }2(x+3)=x+10.",
      steps: [
        { explanation: "Expand the bracket on the left.", latex: "2x+6=x+10" },
        { explanation: "Subtract x from both sides.", latex: "x+6=10" },
        { explanation: "Subtract 6 from both sides.", latex: "x=4" },
      ],
      finalAnswerLatex: "x=4",
    },
    {
      title: "Two brackets and a subtraction",
      questionLatex: "\\text{Solve }3x-(x+4)=10.",
      steps: [
        { explanation: "Expand the bracket, being careful with the negative sign.", latex: "3x-x-4=10" },
        { explanation: "Collect like terms.", latex: "2x-4=10" },
        { explanation: "Add 4, then divide by 2.", latex: "2x=14\\implies x=7" },
      ],
      finalAnswerLatex: "x=7",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-equ-thr-g1",
      "What is the first step to solve 5x + 3 = 2x + 12?",
      "B",
      [
        "Add 3 to both sides.",
        "Subtract 2x from both sides.",
        "Divide both sides by 5.",
        "Multiply both sides by 2.",
      ],
      "Subtracting 2x collects all x terms on the left side."
    ),
    answer(
      "y9c-equ-thr-g2",
      "Solve the equation.",
      "4x+7=2x+15",
      "4",
      "Subtract 2x: 2x + 7 = 15. Subtract 7: 2x = 8. Divide by 2: x = 4."
    ),
    answer(
      "y9c-equ-thr-g3",
      "Solve the equation.",
      "5x-3=3x+7",
      "5",
      "Subtract 3x: 2x - 3 = 7. Add 3: 2x = 10. Divide by 2: x = 5."
    ),
    answer(
      "y9c-equ-thr-g4",
      "Solve the equation.",
      "2(x+3)=x+10",
      "4",
      "Expand: 2x + 6 = x + 10. Subtract x: x + 6 = 10. Subtract 6: x = 4."
    ),
  ],
  independentPractice: [
    answer(
      "y9c-equ-thr-i1",
      "Solve the equation.",
      "6x+1=4x+11",
      "5",
      "Subtract 4x: 2x + 1 = 11. Subtract 1: 2x = 10. Divide by 2: x = 5."
    ),
    answer(
      "y9c-equ-thr-i2",
      "Solve the equation.",
      "3(x+5)=2x+20",
      "5",
      "Expand: 3x + 15 = 2x + 20. Subtract 2x: x + 15 = 20. Subtract 15: x = 5."
    ),
    answer(
      "y9c-equ-thr-i3",
      "Solve the equation.",
      "3x-(x+4)=10",
      "7",
      "Expand: 3x - x - 4 = 10, so 2x - 4 = 10. Add 4: 2x = 14. Divide by 2: x = 7."
    ),
    answer(
      "y9c-equ-thr-i4",
      "Solve the equation.",
      "4(x-1)+2x=14",
      "3",
      "Expand: 4x - 4 + 2x = 14, so 6x - 4 = 14. Add 4: 6x = 18. Divide by 6: x = 3."
    ),
    choice(
      "y9c-equ-thr-i5",
      "Solve the equation shown. What is x?",
      "B",
      ["4", "6", "2", "8"],
      "Subtract 5x: 2x = 12, so x = 6.",
      "7x-4=5x+8"
    ),
  ],
  commonMistakes: [
    { mistake: "Forgetting to change the sign when subtracting a bracket: -(x + 4) written as -x + 4.", fix: "Every term inside the bracket changes sign: -(x + 4) = -x - 4." },
    { mistake: "Moving a term without changing its sign: subtracting 2x from the right but keeping +2x.", fix: "Subtracting 2x from both sides removes it from the right and leaves 0 there." },
    { mistake: "Collecting constants and variables in the same step without tracking signs.", fix: "Do one operation per step and check the sign of each term carefully." },
    { mistake: "Dividing before collecting all x terms onto one side.", fix: "Always collect x terms first, then collect constants, then divide." },
  ],
  masteryQuiz: [
    answer(
      "y9c-equ-thr-m1",
      "Solve the equation.",
      "8x-3=5x+12",
      "5",
      "Subtract 5x: 3x - 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5."
    ),
    choice(
      "y9c-equ-thr-m2",
      "Solve the equation shown. What is x?",
      "A",
      ["5", "3", "7", "4"],
      "Expand: 3x + 6 = x + 16. Subtract x: 2x + 6 = 16. Subtract 6: 2x = 10. x = 5.",
      "3(x+2)=x+16"
    ),
    answer(
      "y9c-equ-thr-m3",
      "Solve the equation.",
      "2(3x+1)=4x+16",
      "7",
      "Expand: 6x + 2 = 4x + 16. Subtract 4x: 2x + 2 = 16. Subtract 2: 2x = 14. Divide by 2: x = 7."
    ),
    answer(
      "y9c-equ-thr-m4",
      "Solve the equation.",
      "5(x-2)-3(x-4)=10",
      "4",
      "Expand: 5x - 10 - 3x + 12 = 10, so 2x + 2 = 10. Subtract 2: 2x = 8. Divide by 2: x = 4."
    ),
    answer(
      "y9c-equ-thr-m5",
      "Solve the equation.",
      "4x-(2x+5)=7",
      "6",
      "Expand: 4x - 2x - 5 = 7, so 2x - 5 = 7. Add 5: 2x = 12. Divide by 2: x = 6."
    ),
    answer(
      "y9c-equ-thr-m6",
      "Solve the equation.",
      "6x+2=4(x+3)",
      "5",
      "Expand right side: 6x + 2 = 4x + 12. Subtract 4x: 2x + 2 = 12. Subtract 2: 2x = 10. Divide by 2: x = 5."
    ),
    choice(
      "y9c-equ-thr-m7",
      "A student solves 3x + 4 = x + 12 and gets x = 4. Is this correct?",
      "A",
      [
        "Yes, x = 4 is correct.",
        "No, the answer is x = 2.",
        "No, the answer is x = 8.",
        "No, the answer is x = 6.",
      ],
      "Check: 3(4) + 4 = 16 and 4 + 12 = 16. Both sides equal 16, so x = 4 is correct."
    ),
    answer(
      "y9c-equ-thr-m8",
      "Solve the equation.",
      "9x-5=7x+11",
      "8",
      "Subtract 7x: 2x - 5 = 11. Add 5: 2x = 16. Divide by 2: x = 8."
    ),
    answer(
      "y9c-equ-thr-m9",
      "Solve the equation.",
      "2(3x-5)-4(x-2)=4",
      "3",
      "Expand: 6x - 10 - 4x + 8 = 4, so 2x - 2 = 4. Add 2: 2x = 6. Divide by 2: x = 3."
    ),
    answer(
      "y9c-equ-thr-m10",
      "Three consecutive integers add to 48. If the first integer is x, solve the equation to find x.",
      "x+(x+1)+(x+2)=48",
      "15",
      "3x + 3 = 48, so 3x = 45 and x = 15. The three integers are 15, 16 and 17."
    ),
  ],
};

const equationsWithFractions: LessonContent = {
  description: "Solve linear equations that contain one algebraic fraction by multiplying both sides to eliminate the denominator.",
  learningIntention: "Solve linear equations containing one algebraic fraction by clearing the denominator.",
  successCriteria: [
    "Identify the denominator of the algebraic fraction in the equation.",
    "Multiply both sides of the equation by the denominator to eliminate the fraction.",
    "Solve the resulting equation using inverse operations.",
    "Solve equations of the form (ax + b)/c = d.",
  ],
  teaching: {
    paragraphs: [
      "Some linear equations contain a fraction with x in the numerator, such as x/3 + 2 = 5. Working with the fraction directly is awkward, so we remove it first by multiplying both sides of the equation by the denominator.",
      "For x/3 + 2 = 5, subtracting 2 from both sides gives x/3 = 3. Multiplying both sides by 3 gives x = 9. The fraction disappears because 3 × (x/3) = x.",
      "For an equation of the form (x + b)/c = d, multiply both sides by c first. This gives x + b = cd, which is now a two-step equation without fractions.",
      "Always check your answer by substituting back into the original equation. With fraction equations, substitution is especially important because a sign error can produce a plausible but incorrect result.",
    ],
    latexBlocks: [
      "\\frac{x}{a}+b=c\\implies\\frac{x}{a}=c-b\\implies x=a(c-b)",
      "\\frac{x+b}{c}=d\\implies x+b=cd\\implies x=cd-b",
      "\\frac{x}{3}+2=5\\implies\\frac{x}{3}=3\\implies x=9",
    ],
  },
  workedExamples: [
    {
      title: "Solve an equation with x divided by a number",
      questionLatex: "\\text{Solve }\\dfrac{x}{4}+1=5.",
      steps: [
        { explanation: "Subtract 1 from both sides to isolate the fraction.", latex: "\\frac{x}{4}=4" },
        { explanation: "Multiply both sides by 4 to clear the denominator.", latex: "x=4\\times4=16" },
        { explanation: "Check: 16/4 + 1 = 4 + 1 = 5.", latex: "\\frac{16}{4}+1=4+1=5\\checkmark" },
      ],
      finalAnswerLatex: "x=16",
    },
    {
      title: "Solve an equation with a coefficient on x",
      questionLatex: "\\text{Solve }\\dfrac{3x}{4}=12.",
      steps: [
        { explanation: "Multiply both sides by 4 to clear the denominator.", latex: "3x=48" },
        { explanation: "Divide both sides by 3.", latex: "x=16" },
      ],
      finalAnswerLatex: "x=16",
    },
    {
      title: "Solve an equation with the bracket in the numerator",
      questionLatex: "\\text{Solve }\\dfrac{2x-1}{5}=3.",
      steps: [
        { explanation: "Multiply both sides by 5 to clear the denominator.", latex: "2x-1=15" },
        { explanation: "Add 1 to both sides.", latex: "2x=16" },
        { explanation: "Divide both sides by 2.", latex: "x=8" },
      ],
      finalAnswerLatex: "x=8",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-equ-fra-g1",
      "Which operation removes the fraction from the equation shown?",
      "C",
      [
        "Add 3 to both sides.",
        "Subtract 3 from both sides.",
        "Multiply both sides by 3.",
        "Divide both sides by 3.",
      ],
      "Multiplying both sides by 3 gives 3 × (x/3) = x, removing the fraction.",
      "\\dfrac{x}{3}=4"
    ),
    answer(
      "y9c-equ-fra-g2",
      "Solve the equation.",
      "\\dfrac{x}{5}=6",
      "30",
      "Multiply both sides by 5: x = 30."
    ),
    answer(
      "y9c-equ-fra-g3",
      "Solve the equation.",
      "\\dfrac{x}{4}+1=5",
      "16",
      "x/4 = 4, so x = 16."
    ),
    answer(
      "y9c-equ-fra-g4",
      "Solve the equation.",
      "\\dfrac{x}{3}-2=7",
      "27",
      "x/3 = 9, so x = 27."
    ),
  ],
  independentPractice: [
    answer(
      "y9c-equ-fra-i1",
      "Solve the equation.",
      "\\dfrac{x}{6}+3=8",
      "30",
      "x/6 = 5, so x = 30."
    ),
    answer(
      "y9c-equ-fra-i2",
      "Solve the equation.",
      "\\dfrac{2x}{5}=10",
      "25",
      "Multiply by 5: 2x = 50. Divide by 2: x = 25."
    ),
    answer(
      "y9c-equ-fra-i3",
      "Solve the equation.",
      "\\dfrac{x}{4}-5=3",
      "32",
      "x/4 = 8, so x = 32."
    ),
    answer(
      "y9c-equ-fra-i4",
      "Solve the equation.",
      "\\dfrac{3x}{4}=12",
      "16",
      "Multiply by 4: 3x = 48. Divide by 3: x = 16."
    ),
    choice(
      "y9c-equ-fra-i5",
      "Solve the equation shown. What is x?",
      "B",
      ["6", "12", "3", "24"],
      "x/2 = 6, so x = 12.",
      "\\dfrac{x}{2}+3=9"
    ),
  ],
  commonMistakes: [
    { mistake: "Multiplying only the fraction term by the denominator, not both sides.", fix: "Whatever you multiply on one side must be done to the whole other side too." },
    { mistake: "Forgetting to isolate the fraction before multiplying: x/4 + 1 = 5, multiplying to get x + 4 = 20.", fix: "Subtract the constant first: x/4 = 4, then multiply by 4." },
    { mistake: "Dividing instead of multiplying to clear a fraction.", fix: "Dividing makes the fraction smaller. Multiply by the denominator to cancel it." },
    { mistake: "For (2x - 1)/5 = 3, writing 2x - 1/5 = 3 and subtracting only 1/5.", fix: "The whole expression (2x - 1) is the numerator. Multiply both sides by 5 first: 2x - 1 = 15." },
  ],
  masteryQuiz: [
    answer(
      "y9c-equ-fra-m1",
      "Solve the equation.",
      "\\dfrac{x}{7}+4=9",
      "35",
      "x/7 = 5, so x = 35."
    ),
    answer(
      "y9c-equ-fra-m2",
      "Solve the equation.",
      "\\dfrac{3x}{8}=9",
      "24",
      "Multiply by 8: 3x = 72. Divide by 3: x = 24."
    ),
    choice(
      "y9c-equ-fra-m3",
      "Solve the equation shown. What is x?",
      "C",
      ["6", "10", "12", "60"],
      "Multiply by 6: 5x = 60. Divide by 5: x = 12.",
      "\\dfrac{5x}{6}=10"
    ),
    answer(
      "y9c-equ-fra-m4",
      "Solve the equation.",
      "\\dfrac{x}{3}+x=8",
      "6",
      "x/3 + 3x/3 = 4x/3 = 8. Multiply by 3: 4x = 24. Divide by 4: x = 6."
    ),
    answer(
      "y9c-equ-fra-m5",
      "Solve the equation.",
      "\\dfrac{x+5}{3}=4",
      "7",
      "Multiply by 3: x + 5 = 12. Subtract 5: x = 7."
    ),
    answer(
      "y9c-equ-fra-m6",
      "Solve the equation.",
      "\\dfrac{2x-1}{5}=3",
      "8",
      "Multiply by 5: 2x - 1 = 15. Add 1: 2x = 16. Divide by 2: x = 8."
    ),
    choice(
      "y9c-equ-fra-m7",
      "Solve the equation shown. What is x?",
      "A",
      ["10", "14", "1", "2"],
      "Multiply by 4: x + 2 = 12. Subtract 2: x = 10.",
      "\\dfrac{x+2}{4}=3"
    ),
    answer(
      "y9c-equ-fra-m8",
      "Solve the equation.",
      "\\dfrac{x}{5}+6=14",
      "40",
      "x/5 = 8, so x = 40."
    ),
    answer(
      "y9c-equ-fra-m9",
      "Solve the equation.",
      "\\dfrac{3x+1}{4}=7",
      "9",
      "Multiply by 4: 3x + 1 = 28. Subtract 1: 3x = 27. Divide by 3: x = 9."
    ),
    answer(
      "y9c-equ-fra-m10",
      "A number is divided by 4, then decreased by 3, giving 7. Find the number.",
      "\\dfrac{x}{4}-3=7",
      "40",
      "x/4 = 10, so x = 40. Check: 40 ÷ 4 - 3 = 10 - 3 = 7."
    ),
  ],
};

const lessons: Record<string, LessonContent> = {
  "linear-equations-two-step": linearEquationsTwoStep,
  "linear-equations-three-step": linearEquationsThreeStep,
  "equations-with-fractions": equationsWithFractions,
};

export function year9EquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "equations") {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) {
    return null;
  }

  return enhanceYear9CoreLesson(course, unit, lesson, {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  });
}
