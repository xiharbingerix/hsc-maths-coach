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
    hint: "Use the rules for algebraic fractions carefully, then simplify.",
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

const algebraicFractionsAddSubtract: LessonContent = {
  description: "Add and subtract algebraic fractions that have different numerical denominators.",
  learningIntention: "Simplify expressions involving addition and subtraction of algebraic fractions with numerical denominators.",
  successCriteria: [
    "Find a common denominator for two algebraic fractions.",
    "Rewrite each fraction with the common denominator by multiplying the numerator.",
    "Add or subtract the numerators and write as a single fraction.",
    "Simplify the result when a common factor exists.",
  ],
  teaching: {
    paragraphs: [
      "An algebraic fraction has a variable in the numerator, the denominator, or both. The fraction x/3 has the variable x in the numerator — it behaves like an ordinary fraction, just with a letter instead of a number.",
      "To add or subtract fractions, the denominators must be the same. With algebraic fractions, we follow exactly the same process: find a common denominator, rewrite each fraction, then combine the numerators. For x/3 + x/4, the common denominator is 12.",
      "Once fractions share a denominator, add or subtract only the numerators. The denominator does not change. After combining, check whether the result can be simplified by cancelling any common factor.",
      "The most frequent mistake is adding the denominators. The rule x/3 + x/4 = 2x/7 is wrong. Find the common denominator first, then add the numerators only.",
    ],
    latexBlocks: [
      "\\frac{x}{a}+\\frac{x}{b}=\\frac{bx}{ab}+\\frac{ax}{ab}=\\frac{(a+b)x}{ab}",
      "\\frac{x}{3}+\\frac{x}{4}=\\frac{4x}{12}+\\frac{3x}{12}=\\frac{7x}{12}",
      "\\frac{2x}{3}-\\frac{x}{4}=\\frac{8x}{12}-\\frac{3x}{12}=\\frac{5x}{12}",
    ],
  },
  workedExamples: [
    {
      title: "Add algebraic fractions",
      questionLatex: "\\text{Simplify }\\dfrac{x}{3}+\\dfrac{x}{5}.",
      steps: [
        { explanation: "The denominators are 3 and 5, so the lowest common denominator is 15.", latex: "\\text{LCD}=15" },
        { explanation: "Rewrite each fraction with denominator 15 by multiplying the numerator by the missing factor.", latex: "\\frac{x}{3}=\\frac{5x}{15},\\quad\\frac{x}{5}=\\frac{3x}{15}" },
        { explanation: "Add the numerators. The denominator stays as 15.", latex: "\\frac{5x}{15}+\\frac{3x}{15}=\\frac{8x}{15}" },
      ],
      finalAnswerLatex: "\\dfrac{8x}{15}",
    },
    {
      title: "Subtract algebraic fractions",
      questionLatex: "\\text{Simplify }\\dfrac{2x}{3}-\\dfrac{x}{4}.",
      steps: [
        { explanation: "The lowest common denominator of 3 and 4 is 12.", latex: "\\text{LCD}=12" },
        { explanation: "Rewrite each fraction with denominator 12.", latex: "\\frac{2x}{3}=\\frac{8x}{12},\\quad\\frac{x}{4}=\\frac{3x}{12}" },
        { explanation: "Subtract the numerators.", latex: "\\frac{8x}{12}-\\frac{3x}{12}=\\frac{5x}{12}" },
      ],
      finalAnswerLatex: "\\dfrac{5x}{12}",
    },
    {
      title: "Simplify and check for further reduction",
      questionLatex: "\\text{Simplify }\\dfrac{5x}{6}-\\dfrac{x}{3}.",
      steps: [
        { explanation: "The lowest common denominator of 6 and 3 is 6.", latex: "\\text{LCD}=6" },
        { explanation: "Rewrite x/3 with denominator 6.", latex: "\\frac{x}{3}=\\frac{2x}{6}" },
        { explanation: "Subtract the numerators.", latex: "\\frac{5x}{6}-\\frac{2x}{6}=\\frac{3x}{6}" },
        { explanation: "Simplify by cancelling the common factor of 3.", latex: "\\frac{3x}{6}=\\frac{x}{2}" },
      ],
      finalAnswerLatex: "\\dfrac{x}{2}",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-alg-add-g1",
      "What is the lowest common denominator of the two fractions shown?",
      "B",
      ["4", "8", "12", "32"],
      "The LCD of 4 and 8 is 8, since 8 is a multiple of 4.",
      "\\frac{x}{4}+\\frac{x}{8}"
    ),
    answer(
      "y9c-alg-add-g2",
      "Simplify the expression. Give your answer as a fraction in simplest form (for example, 3x/4).",
      "\\dfrac{x}{2}+\\dfrac{x}{4}",
      "3x/4",
      "x/2 = 2x/4, so 2x/4 + x/4 = 3x/4.",
      ["3x / 4"]
    ),
    answer(
      "y9c-alg-add-g3",
      "Simplify the expression.",
      "\\dfrac{x}{3}+\\dfrac{x}{3}",
      "2x/3",
      "The denominators are the same, so add the numerators: x + x = 2x over 3.",
      ["2x / 3"]
    ),
    answer(
      "y9c-alg-add-g4",
      "Simplify the expression.",
      "\\dfrac{x}{4}-\\dfrac{x}{8}",
      "x/8",
      "x/4 = 2x/8, so 2x/8 - x/8 = x/8.",
      ["x / 8"]
    ),
  ],
  independentPractice: [
    answer(
      "y9c-alg-add-i1",
      "Simplify the expression.",
      "\\dfrac{2x}{3}+\\dfrac{x}{6}",
      "5x/6",
      "2x/3 = 4x/6, so 4x/6 + x/6 = 5x/6.",
      ["5x / 6"]
    ),
    answer(
      "y9c-alg-add-i2",
      "Simplify the expression.",
      "\\dfrac{3x}{5}+\\dfrac{x}{10}",
      "7x/10",
      "3x/5 = 6x/10, so 6x/10 + x/10 = 7x/10.",
      ["7x / 10"]
    ),
    answer(
      "y9c-alg-add-i3",
      "Simplify the expression.",
      "\\dfrac{5x}{6}-\\dfrac{x}{3}",
      "x/2",
      "x/3 = 2x/6, so 5x/6 - 2x/6 = 3x/6 = x/2.",
      ["x / 2"]
    ),
    answer(
      "y9c-alg-add-i4",
      "Simplify the expression.",
      "\\dfrac{3x}{4}-\\dfrac{x}{2}",
      "x/4",
      "x/2 = 2x/4, so 3x/4 - 2x/4 = x/4.",
      ["x / 4"]
    ),
    answer(
      "y9c-alg-add-i5",
      "Simplify the expression.",
      "\\dfrac{x}{2}-\\dfrac{x}{6}",
      "x/3",
      "x/2 = 3x/6, so 3x/6 - x/6 = 2x/6 = x/3.",
      ["x / 3"]
    ),
  ],
  commonMistakes: [
    { mistake: "Adding the denominators: x/3 + x/4 = 2x/7.", fix: "Find the common denominator first, then add only the numerators." },
    { mistake: "Forgetting to multiply the numerator when converting to a common denominator.", fix: "Whatever you multiply the denominator by, multiply the numerator by the same factor." },
    { mistake: "Not simplifying the final result.", fix: "Check whether the numerator and denominator share a common factor and cancel it." },
    { mistake: "Using the product of denominators when a smaller LCD exists.", fix: "Finding the LCD keeps numbers smaller, but the product of denominators always works too." },
  ],
  masteryQuiz: [
    answer(
      "y9c-alg-add-m1",
      "Simplify the expression.",
      "\\dfrac{x}{3}+\\dfrac{x}{4}",
      "7x/12",
      "x/3 = 4x/12 and x/4 = 3x/12, so 4x/12 + 3x/12 = 7x/12.",
      ["7x / 12"]
    ),
    choice(
      "y9c-alg-add-m2",
      "Simplify the expression shown.",
      "A",
      ["$\\dfrac{3x}{20}$", "$\\dfrac{x}{9}$", "$\\dfrac{x}{20}$", "$\\dfrac{3x}{1}$"],
      "LCD of 5 and 4 is 20: 8x/20 - 5x/20 = 3x/20.",
      "\\dfrac{2x}{5}-\\dfrac{x}{4}"
    ),
    answer(
      "y9c-alg-add-m3",
      "Simplify the expression.",
      "\\dfrac{3x}{4}-\\dfrac{x}{6}",
      "7x/12",
      "LCD = 12: 9x/12 - 2x/12 = 7x/12.",
      ["7x / 12"]
    ),
    answer(
      "y9c-alg-add-m4",
      "Simplify the expression.",
      "\\dfrac{x}{4}+\\dfrac{3x}{8}",
      "5x/8",
      "x/4 = 2x/8, so 2x/8 + 3x/8 = 5x/8.",
      ["5x / 8"]
    ),
    answer(
      "y9c-alg-add-m5",
      "Simplify the expression.",
      "\\dfrac{5x}{6}-\\dfrac{2x}{9}",
      "11x/18",
      "LCD = 18: 15x/18 - 4x/18 = 11x/18.",
      ["11x / 18"]
    ),
    choice(
      "y9c-alg-add-m6",
      "A student writes x/6 + x/9 = 2x/15. What error did they make?",
      "B",
      [
        "They multiplied the numerators instead of adding.",
        "They added the denominators instead of finding the LCD.",
        "They forgot to simplify the final answer.",
        "They used the wrong common denominator.",
      ],
      "Adding denominators (6 + 9 = 15) is the classic error. The LCD of 6 and 9 is 18, giving 3x/18 + 2x/18 = 5x/18."
    ),
    answer(
      "y9c-alg-add-m7",
      "Simplify the expression.",
      "\\dfrac{3x}{4}+\\dfrac{x}{6}",
      "11x/12",
      "LCD = 12: 9x/12 + 2x/12 = 11x/12.",
      ["11x / 12"]
    ),
    answer(
      "y9c-alg-add-m8",
      "Simplify the expression.",
      "\\dfrac{x}{3}-\\dfrac{x}{7}",
      "4x/21",
      "LCD = 21: 7x/21 - 3x/21 = 4x/21.",
      ["4x / 21"]
    ),
    answer(
      "y9c-alg-add-m9",
      "Simplify the expression.",
      "\\dfrac{3x}{4}-\\dfrac{2x}{5}",
      "7x/20",
      "LCD = 20: 15x/20 - 8x/20 = 7x/20.",
      ["7x / 20"]
    ),
    answer(
      "y9c-alg-add-m10",
      "Simplify the expression.",
      "\\dfrac{x}{6}+\\dfrac{x}{9}",
      "5x/18",
      "LCD = 18: 3x/18 + 2x/18 = 5x/18.",
      ["5x / 18"]
    ),
  ],
};

const algebraicFractionsMultiplyDivide: LessonContent = {
  description: "Multiply and divide algebraic fractions with numerical denominators, simplifying by cancelling common factors.",
  learningIntention: "Simplify expressions involving multiplication and division of algebraic fractions with numerical denominators.",
  successCriteria: [
    "Multiply algebraic fractions by multiplying numerators and multiplying denominators.",
    "Cancel common factors before or after multiplying to simplify.",
    "Divide algebraic fractions by multiplying by the reciprocal of the second fraction.",
    "Identify the correct fraction to flip when dividing.",
  ],
  teaching: {
    paragraphs: [
      "To multiply two fractions, multiply the numerators together and the denominators together. This works the same way for algebraic fractions: multiply across the top, multiply across the bottom, then simplify.",
      "Before multiplying, look for common factors between any numerator and any denominator. Cancelling early keeps the numbers smaller and the working cleaner.",
      "To divide by a fraction, multiply by its reciprocal — that is, flip the second fraction upside down, then multiply. This is true for both number fractions and algebraic fractions.",
      "The most common error in division is flipping the wrong fraction. Always flip the second fraction — the one you are dividing by. The first fraction stays as it is.",
    ],
    latexBlocks: [
      "\\frac{a}{b}\\times\\frac{c}{d}=\\frac{ac}{bd}",
      "\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}=\\frac{ad}{bc}",
      "\\frac{3x}{4}\\times\\frac{2}{9}=\\frac{6x}{36}=\\frac{x}{6}",
    ],
  },
  workedExamples: [
    {
      title: "Multiply algebraic fractions",
      questionLatex: "\\text{Simplify }\\dfrac{x}{3}\\times\\dfrac{6}{5}.",
      steps: [
        { explanation: "Multiply numerators together and denominators together.", latex: "\\frac{x}{3}\\times\\frac{6}{5}=\\frac{6x}{15}" },
        { explanation: "Simplify by dividing numerator and denominator by their common factor of 3.", latex: "\\frac{6x}{15}=\\frac{2x}{5}" },
      ],
      finalAnswerLatex: "\\dfrac{2x}{5}",
    },
    {
      title: "Multiply and cancel common factors",
      questionLatex: "\\text{Simplify }\\dfrac{3x}{4}\\times\\dfrac{2}{9}.",
      steps: [
        { explanation: "Cancel 3 from the first numerator and 9 in the second denominator (factor of 3), and cancel 2 from the second numerator and 4 in the first denominator (factor of 2).", latex: "\\frac{\\cancel{3}x}{\\cancel{4}\\,2}\\times\\frac{\\cancel{2}}{\\cancel{9}\\,3}=\\frac{x}{2}\\times\\frac{1}{3}" },
        { explanation: "Multiply across.", latex: "\\frac{x}{2}\\times\\frac{1}{3}=\\frac{x}{6}" },
      ],
      finalAnswerLatex: "\\dfrac{x}{6}",
    },
    {
      title: "Divide algebraic fractions",
      questionLatex: "\\text{Simplify }\\dfrac{x}{4}\\div\\dfrac{3}{8}.",
      steps: [
        { explanation: "Flip the second fraction and change division to multiplication.", latex: "\\frac{x}{4}\\div\\frac{3}{8}=\\frac{x}{4}\\times\\frac{8}{3}" },
        { explanation: "Multiply across and simplify.", latex: "\\frac{8x}{12}=\\frac{2x}{3}" },
      ],
      finalAnswerLatex: "\\dfrac{2x}{3}",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-alg-mul-g1",
      "To divide the expression shown, what do we multiply by?",
      "B",
      ["$\\dfrac{2}{5}$", "$\\dfrac{5}{2}$", "$\\dfrac{3}{2}$", "$\\dfrac{5}{3}$"],
      "Dividing by 2/5 means multiplying by its reciprocal, which is 5/2.",
      "\\dfrac{x}{3}\\div\\dfrac{2}{5}"
    ),
    answer(
      "y9c-alg-mul-g2",
      "Simplify the expression.",
      "\\dfrac{x}{5}\\times\\dfrac{1}{3}",
      "x/15",
      "Multiply numerators: x. Multiply denominators: 15. Answer: x/15.",
      ["x / 15"]
    ),
    answer(
      "y9c-alg-mul-g3",
      "Simplify the expression.",
      "\\dfrac{2x}{3}\\times\\dfrac{3}{4}",
      "x/2",
      "2x/3 x 3/4 = 6x/12 = x/2.",
      ["x / 2"]
    ),
    answer(
      "y9c-alg-mul-g4",
      "Simplify the expression.",
      "\\dfrac{x}{4}\\div\\dfrac{1}{2}",
      "x/2",
      "Flip 1/2 to get 2/1: x/4 x 2 = 2x/4 = x/2.",
      ["x / 2"]
    ),
  ],
  independentPractice: [
    answer(
      "y9c-alg-mul-i1",
      "Simplify the expression.",
      "\\dfrac{x}{6}\\times\\dfrac{3}{4}",
      "x/8",
      "3x/24 = x/8.",
      ["x / 8"]
    ),
    answer(
      "y9c-alg-mul-i2",
      "Simplify the expression.",
      "\\dfrac{3x}{4}\\times\\dfrac{2}{9}",
      "x/6",
      "6x/36 = x/6.",
      ["x / 6"]
    ),
    answer(
      "y9c-alg-mul-i3",
      "Simplify the expression.",
      "\\dfrac{x}{3}\\div\\dfrac{2}{9}",
      "3x/2",
      "Flip 2/9 to get 9/2: x/3 x 9/2 = 9x/6 = 3x/2.",
      ["3x / 2"]
    ),
    answer(
      "y9c-alg-mul-i4",
      "Simplify the expression.",
      "\\dfrac{5x}{6}\\div\\dfrac{5}{3}",
      "x/2",
      "Flip 5/3 to get 3/5: 5x/6 x 3/5 = 15x/30 = x/2.",
      ["x / 2"]
    ),
    choice(
      "y9c-alg-mul-i5",
      "Simplify the expression shown.",
      "B",
      ["$\\dfrac{2x}{15}$", "$\\dfrac{3x}{2}$", "$\\dfrac{x}{6}$", "$\\dfrac{2x}{5}$"],
      "Flip 4/15: 2x/5 x 15/4 = 30x/20 = 3x/2.",
      "\\dfrac{2x}{5}\\div\\dfrac{4}{15}"
    ),
  ],
  commonMistakes: [
    { mistake: "Flipping the first fraction instead of the second when dividing.", fix: "Always flip only the second fraction — the divisor — then multiply." },
    { mistake: "Not simplifying after multiplying.", fix: "After multiplying across, check for common factors in the numerator and denominator." },
    { mistake: "Adding denominators instead of multiplying them.", fix: "In multiplication, denominators are multiplied together, not added." },
    { mistake: "Cancelling across an addition or subtraction sign.", fix: "Cancelling is only valid across multiplication. Never cancel terms separated by + or -." },
  ],
  masteryQuiz: [
    answer(
      "y9c-alg-mul-m1",
      "Simplify the expression.",
      "\\dfrac{x}{4}\\times\\dfrac{2}{3}",
      "x/6",
      "2x/12 = x/6.",
      ["x / 6"]
    ),
    choice(
      "y9c-alg-mul-m2",
      "Simplify the expression shown.",
      "B",
      ["$\\dfrac{4x}{8}$", "$\\dfrac{x}{2}$", "$\\dfrac{9x}{13}$", "$\\dfrac{2x}{5}$"],
      "4x/5 x 5/8 = 20x/40 = x/2.",
      "\\dfrac{4x}{5}\\times\\dfrac{5}{8}"
    ),
    answer(
      "y9c-alg-mul-m3",
      "Simplify the expression.",
      "\\dfrac{3x}{8}\\times\\dfrac{4}{9}",
      "x/6",
      "12x/72 = x/6.",
      ["x / 6"]
    ),
    answer(
      "y9c-alg-mul-m4",
      "Simplify the expression.",
      "\\dfrac{x}{6}\\div\\dfrac{1}{3}",
      "x/2",
      "Flip 1/3 to get 3: x/6 x 3 = 3x/6 = x/2.",
      ["x / 2"]
    ),
    answer(
      "y9c-alg-mul-m5",
      "Simplify the expression.",
      "\\dfrac{3x}{4}\\div\\dfrac{9}{8}",
      "2x/3",
      "Flip 9/8 to get 8/9: 3x/4 x 8/9 = 24x/36 = 2x/3.",
      ["2x / 3"]
    ),
    answer(
      "y9c-alg-mul-m6",
      "Simplify the expression.",
      "\\dfrac{5x}{6}\\times\\dfrac{3}{10}",
      "x/4",
      "15x/60 = x/4.",
      ["x / 4"]
    ),
    choice(
      "y9c-alg-mul-m7",
      "A student divides x/4 by 3/8 and gets 3x/32. What is the correct answer?",
      "B",
      ["$\\dfrac{3x}{32}$", "$\\dfrac{2x}{3}$", "$\\dfrac{3x}{8}$", "$\\dfrac{x}{6}$"],
      "Flip 3/8 to get 8/3: x/4 x 8/3 = 8x/12 = 2x/3. The student multiplied directly without flipping."
    ),
    answer(
      "y9c-alg-mul-m8",
      "Simplify the expression.",
      "\\dfrac{5x}{8}\\div\\dfrac{5}{4}",
      "x/2",
      "Flip 5/4 to get 4/5: 5x/8 x 4/5 = 20x/40 = x/2.",
      ["x / 2"]
    ),
    answer(
      "y9c-alg-mul-m9",
      "Simplify the expression.",
      "\\dfrac{3x}{10}\\div\\dfrac{9}{5}",
      "x/6",
      "Flip 9/5 to get 5/9: 3x/10 x 5/9 = 15x/90 = x/6.",
      ["x / 6"]
    ),
    choice(
      "y9c-alg-mul-m10",
      "Which expression is equivalent to the one shown?",
      "C",
      [
        "$\\dfrac{2x}{3}\\times\\dfrac{4}{9}$",
        "$\\dfrac{8x}{27}$",
        "$\\dfrac{2x}{3}\\times\\dfrac{9}{4}$",
        "$\\dfrac{3x}{2}$",
      ],
      "Dividing by 4/9 means multiplying by the reciprocal 9/4. The equivalent expression is 2x/3 x 9/4 = 18x/12 = 3x/2.",
      "\\dfrac{2x}{3}\\div\\dfrac{4}{9}"
    ),
  ],
};

const expandingExpressions: LessonContent = {
  description: "Expand single brackets and binomial products using the distributive law, including expressions with negative coefficients.",
  learningIntention: "Use the distributive law to expand and simplify algebraic expressions, including binomial products.",
  successCriteria: [
    "Expand a single bracket by multiplying the factor outside by every term inside.",
    "Expand brackets with negative coefficients, applying sign rules correctly.",
    "Expand and simplify expressions with two brackets by expanding each and collecting like terms.",
    "Expand a binomial product of the form (x + a)(x + b).",
  ],
  teaching: {
    paragraphs: [
      "The distributive law says that a number or variable outside a bracket multiplies every term inside. For example, 3(x + 4) = 3 × x + 3 × 4 = 3x + 12. Every term inside the bracket gets multiplied — not just the first one.",
      "When the coefficient outside the bracket is negative, the sign of every term inside changes. This is because a negative times a positive is negative, and a negative times a negative is positive. For example, -2(x - 5) = -2x + 10.",
      "To expand two brackets in the same expression such as 2(x + 3) + 4(x - 1), expand each bracket separately, then collect like terms. Remember to apply the sign rule to any negative bracket.",
      "A binomial product (x + 3)(x + 8) is expanded by multiplying every term in the first bracket by every term in the second. This gives four products: x × x = x², x × 8 = 8x, 3 × x = 3x, and 3 × 8 = 24. Collecting like terms gives x² + 11x + 24.",
    ],
    latexBlocks: [
      "a(b+c)=ab+ac",
      "-a(b+c)=-ab-ac",
      "(x+a)(x+b)=x^2+(a+b)x+ab",
      "(x+3)(x+8)=x^2+11x+24",
    ],
  },
  workedExamples: [
    {
      title: "Expand a single bracket with a negative coefficient",
      questionLatex: "\\text{Expand }-3(5x^2+2y+4).",
      steps: [
        { explanation: "Multiply -3 by the first term.", latex: "-3\\times5x^2=-15x^2" },
        { explanation: "Multiply -3 by the second term.", latex: "-3\\times2y=-6y" },
        { explanation: "Multiply -3 by the third term.", latex: "-3\\times4=-12" },
        { explanation: "Write the expanded result.", latex: "-15x^2-6y-12" },
      ],
      finalAnswerLatex: "-15x^2-6y-12",
    },
    {
      title: "Expand two brackets and collect like terms",
      questionLatex: "\\text{Expand and simplify }2y(y-5)+4(y-5).",
      steps: [
        { explanation: "Expand the first bracket.", latex: "2y(y-5)=2y^2-10y" },
        { explanation: "Expand the second bracket.", latex: "4(y-5)=4y-20" },
        { explanation: "Collect like terms.", latex: "2y^2-10y+4y-20=2y^2-6y-20" },
      ],
      finalAnswerLatex: "2y^2-6y-20",
    },
    {
      title: "Expand a binomial product",
      questionLatex: "\\text{Expand }(x+3)(x+8).",
      steps: [
        { explanation: "Multiply the first term of the first bracket by each term of the second bracket.", latex: "x\\times x=x^2,\\quad x\\times8=8x" },
        { explanation: "Multiply the second term of the first bracket by each term of the second bracket.", latex: "3\\times x=3x,\\quad 3\\times8=24" },
        { explanation: "Collect like terms.", latex: "x^2+8x+3x+24=x^2+11x+24" },
      ],
      finalAnswerLatex: "x^2+11x+24",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-alg-exp-g1",
      "Expand 5(x + 3). Which answer is correct?",
      "B",
      ["$5x+3$", "$5x+15$", "$x+15$", "$5x+8$"],
      "5 multiplies every term inside: 5 x x = 5x and 5 x 3 = 15."
    ),
    answer(
      "y9c-alg-exp-g2",
      "Expand 3(x + 4). What is the constant term?",
      "3(x+4)",
      "12",
      "3 x 4 = 12. The expanded form is 3x + 12."
    ),
    choice(
      "y9c-alg-exp-g3",
      "Expand -2(3x + 5). Which answer is correct?",
      "B",
      ["$-6x+5$", "$-6x-10$", "$6x+10$", "$-6x+10$"],
      "-2 x 3x = -6x and -2 x 5 = -10. Both terms become negative."
    ),
    answer(
      "y9c-alg-exp-g4",
      "Expand 2(x + 3) + 3(x + 1) and simplify. What is the coefficient of x in the result?",
      "2(x+3)+3(x+1)",
      "5",
      "2x + 6 + 3x + 3 = 5x + 9. The coefficient of x is 5."
    ),
  ],
  independentPractice: [
    answer(
      "y9c-alg-exp-i1",
      "Expand 5(2x + 3). What is the coefficient of x?",
      "5(2x+3)",
      "10",
      "5 x 2x = 10x. The coefficient of x is 10."
    ),
    answer(
      "y9c-alg-exp-i2",
      "Expand -4(x - 3). What is the constant term?",
      "-4(x-3)",
      "12",
      "-4 x (-3) = +12. The constant term is 12."
    ),
    answer(
      "y9c-alg-exp-i3",
      "Expand 3x(x + 4). What is the coefficient of x in the result?",
      "3x(x+4)",
      "12",
      "3x x x = 3x² and 3x x 4 = 12x. The coefficient of x is 12."
    ),
    answer(
      "y9c-alg-exp-i4",
      "Expand and simplify 2(x + 5) + 3(x - 2). What is the coefficient of x?",
      "2(x+5)+3(x-2)",
      "5",
      "2x + 10 + 3x - 6 = 5x + 4. The coefficient of x is 5."
    ),
    choice(
      "y9c-alg-exp-i5",
      "Expand (x + 2)(x + 5). Which answer is correct?",
      "A",
      ["$x^2+7x+10$", "$x^2+10x+7$", "$x^2+7x+7$", "$2x^2+7x+10$"],
      "x² + 5x + 2x + 10 = x² + 7x + 10."
    ),
  ],
  commonMistakes: [
    { mistake: "Expanding only the first term: 3(x + 4) = 3x + 4.", fix: "Multiply every term inside the bracket by the factor outside." },
    { mistake: "Sign error with negative: -2(x - 5) = -2x - 10.", fix: "Negative times negative is positive: -2 x (-5) = +10." },
    { mistake: "Forgetting to collect like terms after expanding two brackets.", fix: "After expanding each bracket separately, group and combine the x terms." },
    { mistake: "Writing (x + 3)(x + 8) = x² + 24 (ignoring the middle terms).", fix: "Each term in the first bracket multiplies each term in the second, giving four products." },
  ],
  masteryQuiz: [
    answer(
      "y9c-alg-exp-m1",
      "Expand 6(3x - 2). What is the coefficient of x?",
      "6(3x-2)",
      "18",
      "6 x 3x = 18x. The coefficient of x is 18."
    ),
    choice(
      "y9c-alg-exp-m2",
      "Expand -3(5x² + 2y + 4). Which answer is correct?",
      "A",
      ["$-15x^2-6y-12$", "$-15x^2+6y+12$", "$-15x^2-6y+12$", "$15x^2-6y-12$"],
      "-3 x 5x² = -15x², -3 x 2y = -6y, -3 x 4 = -12. All terms become negative."
    ),
    answer(
      "y9c-alg-exp-m3",
      "Expand (x + 4)(x + 9). What is the coefficient of x?",
      "(x+4)(x+9)",
      "13",
      "x² + 9x + 4x + 36 = x² + 13x + 36. Coefficient of x is 4 + 9 = 13."
    ),
    answer(
      "y9c-alg-exp-m4",
      "Expand (x + 4)(x + 9). What is the constant term?",
      "(x+4)(x+9)",
      "36",
      "The constant term is 4 x 9 = 36."
    ),
    answer(
      "y9c-alg-exp-m5",
      "Expand 2y(y - 5) + 4(y - 5) and simplify. What is the coefficient of y in the result?",
      "2y(y-5)+4(y-5)",
      "-6",
      "2y² - 10y + 4y - 20 = 2y² - 6y - 20. Coefficient of y is -10 + 4 = -6.",
      ["-6"]
    ),
    answer(
      "y9c-alg-exp-m6",
      "Expand (x + 3)(x + 8). What is the coefficient of x?",
      "(x+3)(x+8)",
      "11",
      "x² + 8x + 3x + 24 = x² + 11x + 24. Coefficient of x is 3 + 8 = 11."
    ),
    choice(
      "y9c-alg-exp-m7",
      "Expand (x - 3)(x + 7). Which answer is correct?",
      "A",
      ["$x^2+4x-21$", "$x^2+10x-21$", "$x^2-4x-21$", "$x^2+4x+21$"],
      "x² + 7x - 3x - 21 = x² + 4x - 21. Note the negative sign on -3 affects the middle terms."
    ),
    answer(
      "y9c-alg-exp-m8",
      "Expand 4x(3x + 2y + 2) - (x - 1) and simplify. What is the coefficient of x in the result?",
      "4x(3x+2y+2)-(x-1)",
      "7",
      "4x(3x+2y+2) = 12x² + 8xy + 8x. -(x-1) = -x + 1. Combining: 12x² + 8xy + 8x - x + 1 = 12x² + 8xy + 7x + 1. Coefficient of x is 7.",
      ["7"]
    ),
    answer(
      "y9c-alg-exp-m9",
      "Expand (x - 5)(x + 5). What is the coefficient of x in the result?",
      "(x-5)(x+5)",
      "0",
      "x² + 5x - 5x - 25 = x² - 25. The x terms cancel, so the coefficient of x is 0."
    ),
    answer(
      "y9c-alg-exp-m10",
      "Expand (x + 6)(x - 4). What is the constant term?",
      "(x+6)(x-4)",
      "-24",
      "x² - 4x + 6x - 24 = x² + 2x - 24. The constant term is 6 x (-4) = -24.",
      ["-24"]
    ),
  ],
};

const lessons: Record<string, LessonContent> = {
  "algebraic-fractions-add-subtract": algebraicFractionsAddSubtract,
  "algebraic-fractions-multiply-divide": algebraicFractionsMultiplyDivide,
  "expanding-expressions": expandingExpressions,
};

export function year9AlgebraicTechniquesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) || unit.slug !== "algebraic-techniques") {
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
