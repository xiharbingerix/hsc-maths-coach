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
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Work through the problem step by step, showing each operation clearly.",
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully and consider each option before choosing.",
    explanation,
  };
}

// ── Lesson 1: Simplifying Algebraic Expressions ──────────────────────────────

const simplifyingExpressions: LessonContent = {
  description:
    "Recognise terms, coefficients and variables, and write algebraic expressions in simplified notation by removing unnecessary multiplication signs and evaluating products.",
  learningIntention:
    "Write algebraic expressions in simplified form using correct coefficient and variable notation.",
  successCriteria: [
    "Name the coefficient and variable in a single term such as 5x.",
    "Simplify 1 × x to x and -1 × y to -y.",
    "Simplify products such as 3 × 4m to 12m.",
    "Simplify quotients such as 10x ÷ 5 to 2x.",
  ],
  teaching: {
    paragraphs: [
      "In algebra, a term is a number, a variable, or a product of numbers and variables. For example, 3x, 5 and ab are all terms. A coefficient is the number that multiplies the variable — it tells you how many of that variable you have, so 3x means three x's added together (x + x + x). In 3x, the coefficient is 3.",
      "When a variable is written on its own, its coefficient is understood to be 1, so x means 1x. Similarly, when the coefficient is negative one, write just -x, not -1x.",
      "To simplify a product involving a variable, multiply the numbers together and write the variable after. For example, 4 × 3x equals 12x.",
      "To simplify a quotient, divide the coefficient by the divisor and keep the variable. For example, 8x ÷ 4 equals 2x.",
    ],
    latexBlocks: [
      "\\text{coefficient of }3x\\text{ is }3",
      "1 \\times x = x,\\quad -1 \\times y = -y",
      "4 \\times 3x = 12x,\\quad 8x \\div 4 = 2x",
    ],
  },
  workedExamples: [
    {
      title: "Write using correct notation",
      questionLatex: "\\text{Write }1 \\times x\\text{ in simplified form.}",
      steps: [
        { explanation: "A coefficient of 1 is never shown in algebra.", latex: "1 \\times x = x" },
      ],
      finalAnswerLatex: "x",
    } as WorkedExample,
    {
      title: "Simplify a product",
      questionLatex: "\\text{Simplify }5 \\times 3a.",
      steps: [
        { explanation: "Multiply the numerical coefficients.", latex: "5 \\times 3 = 15" },
        { explanation: "Write the result with the variable.", latex: "15a" },
      ],
      finalAnswerLatex: "15a",
    } as WorkedExample,
    {
      title: "Simplify a quotient",
      questionLatex: "\\text{Simplify }12x \\div 4.",
      steps: [
        { explanation: "Divide the coefficient by 4.", latex: "12 \\div 4 = 3" },
        { explanation: "The variable remains unchanged.", latex: "3x" },
      ],
      finalAnswerLatex: "3x",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-alg-simp-g1",
      "What is the coefficient of 7m?",
      "A",
      ["7", "m", "7m", "1"],
      "In 7m, the coefficient is the number 7."
    ),
    answer(
      "y8-alg-simp-g2",
      "Simplify 1 × y.",
      "",
      "y",
      "A coefficient of 1 is not written in simplified algebra."
    ),
    answer(
      "y8-alg-simp-g3",
      "Simplify 4 × 5b.",
      "",
      "20b",
      "4 × 5 = 20, so the result is 20b."
    ),
    answer(
      "y8-alg-simp-g4",
      "Simplify 15a ÷ 3.",
      "",
      "5a",
      "15 ÷ 3 = 5, so the result is 5a."
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-simp-i1",
      "What is the coefficient of -3p?",
      "",
      "-3",
      "The coefficient is the number multiplying p, including its sign: -3."
    ),
    choice(
      "y8-alg-simp-i2",
      "Which expression is already in simplified form?",
      "C",
      ["1x", "2 × x", "2x", "x × 2"],
      "2x has the coefficient written directly before the variable with no extra symbols."
    ),
    answer(
      "y8-alg-simp-i3",
      "Simplify 3 × 6m.",
      "",
      "18m",
      "3 × 6 = 18, so the result is 18m."
    ),
    answer(
      "y8-alg-simp-i4",
      "Simplify 20y ÷ 4.",
      "",
      "5y",
      "20 ÷ 4 = 5, so the result is 5y."
    ),
    choice(
      "y8-alg-simp-i5",
      "A student writes -1 × n as -1n. What is the correct simplified form?",
      "B",
      ["-1n", "-n", "1n", "n"],
      "-1 × n is written as -n in algebra; the coefficient -1 is never shown explicitly."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing 1x instead of x.",
      fix: "A coefficient of 1 is never shown. Write just x, not 1x.",
    },
    {
      mistake: "Writing the variable before the coefficient, such as x3.",
      fix: "Always write the coefficient first: 3x, not x3.",
    },
    {
      mistake: "Leaving the multiplication sign in 3 × x.",
      fix: "Algebra drops the multiplication sign between a coefficient and a variable: 3 × x becomes 3x.",
    },
    {
      mistake: "Dropping the variable when dividing, writing 3 instead of 3x for 12x ÷ 4.",
      fix: "Only the coefficient is divided. The variable stays: 12x ÷ 4 = 3x.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-alg-simp-m1",
      "What is the coefficient of -5k?",
      "A",
      ["-5", "5", "k", "-5k"],
      "The coefficient is the number including its sign: -5."
    ),
    answer(
      "y8-alg-simp-m2",
      "Simplify 1 × a.",
      "",
      "a",
      "A coefficient of 1 is never written. The answer is a."
    ),
    choice(
      "y8-alg-simp-m3",
      "Which is the simplified form of -1 × z?",
      "C",
      ["1z", "-1z", "-z", "z"],
      "-1 × z is written as -z. The coefficient -1 is not shown explicitly."
    ),
    answer(
      "y8-alg-simp-m4",
      "Simplify 2 × 7n.",
      "",
      "14n",
      "2 × 7 = 14, so the result is 14n."
    ),
    answer(
      "y8-alg-simp-m5",
      "Simplify 24p ÷ 6.",
      "",
      "4p",
      "24 ÷ 6 = 4, so the result is 4p."
    ),
    choice(
      "y8-alg-simp-m6",
      "A student writes 4 × x as 4x. Is this correct?",
      "A",
      [
        "Yes, the multiplication sign is dropped between a coefficient and a variable",
        "No, it should be x4",
        "No, it should be 4 + x",
        "No, it should be 4/x",
      ],
      "Dropping the multiplication sign between a coefficient and a variable is exactly correct."
    ),
    answer(
      "y8-alg-simp-m7",
      "Simplify 3 × 8t.",
      "",
      "24t",
      "3 × 8 = 24, so the result is 24t."
    ),
    answer(
      "y8-alg-simp-m8",
      "Simplify 18m ÷ 9.",
      "",
      "2m",
      "18 ÷ 9 = 2, so the result is 2m."
    ),
    choice(
      "y8-alg-simp-m9",
      "What is the coefficient of x when no number is written in front of it?",
      "B",
      ["0", "1", "x", "There is no coefficient"],
      "When no number is written in front of a variable, the coefficient is understood to be 1."
    ),
    answer(
      "y8-alg-simp-m10",
      "Simplify 5 × 4ab.",
      "",
      "20ab",
      "5 × 4 = 20, so the result is 20ab."
    ),
  ],
};

// ── Lesson 2: Collecting Like Terms ──────────────────────────────────────────

const collectingLikeTerms: LessonContent = {
  description:
    "Identify like terms and simplify algebraic expressions by adding or subtracting the coefficients of matching terms.",
  learningIntention:
    "Simplify algebraic expressions by collecting all like terms.",
  successCriteria: [
    "Recognise like terms as terms that have exactly the same variable.",
    "Add or subtract the coefficients of like terms only.",
    "Simplify expressions containing two or more different variable groups.",
    "Identify when unlike terms cannot be combined.",
  ],
  teaching: {
    paragraphs: [
      "Like terms contain exactly the same variable part. For example, 3x and 7x are like terms because both contain x. The terms 3x and 3y are not like terms because the variables differ.",
      "To collect like terms, add or subtract their coefficients and keep the variable the same. For example, 3x + 7x equals 10x because 3 + 7 = 10.",
      "A constant (a plain number with no variable) can only be combined with other constants. For example, 4x + 3 + 2x + 1 simplifies to 6x + 4.",
      "Terms that have no matching like terms in the expression are left unchanged in the simplified result.",
    ],
    latexBlocks: [
      "3x + 7x = 10x",
      "5a - 2a + 4b = 3a + 4b",
      "4x + 3 + 2x + 1 = 6x + 4",
    ],
  },
  workedExamples: [
    {
      title: "Two like terms",
      questionLatex: "\\text{Simplify }3x + 5x.",
      steps: [
        { explanation: "Both terms contain x, so they are like terms.", latex: "\\text{Like terms: }3x\\text{ and }5x" },
        { explanation: "Add the coefficients and keep the variable.", latex: "3 + 5 = 8,\\quad \\text{result: }8x" },
      ],
      finalAnswerLatex: "8x",
    } as WorkedExample,
    {
      title: "Mixed like and unlike terms",
      questionLatex: "\\text{Simplify }4a + 2b - a + 3b.",
      steps: [
        { explanation: "Collect the a terms: 4a - a = 3a.", latex: "4a - a = 3a" },
        { explanation: "Collect the b terms: 2b + 3b = 5b.", latex: "2b + 3b = 5b" },
      ],
      finalAnswerLatex: "3a + 5b",
    } as WorkedExample,
    {
      title: "Collecting terms including a constant",
      questionLatex: "\\text{Simplify }5x - 2 + 3x + 7.",
      steps: [
        { explanation: "Collect the x terms.", latex: "5x + 3x = 8x" },
        { explanation: "Collect the constants.", latex: "-2 + 7 = 5" },
      ],
      finalAnswerLatex: "8x + 5",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-alg-like-g1",
      "Which pair are like terms?",
      "B",
      ["3x and 3", "4m and 7m", "2x and 2y", "ab and a"],
      "4m and 7m both contain the variable m, so they are like terms."
    ),
    answer(
      "y8-alg-like-g2",
      "Simplify 6p + 4p.",
      "",
      "10p",
      "6 + 4 = 10, so the result is 10p."
    ),
    answer(
      "y8-alg-like-g3",
      "Simplify 7a - 3a + 2b.",
      "",
      "4a + 2b",
      "7 - 3 = 4 for the a terms. 2b has no like term and is left unchanged."
    ),
    answer(
      "y8-alg-like-g4",
      "Simplify 3x + 5 + 2x - 1.",
      "",
      "5x + 4",
      "3x + 2x = 5x and 5 - 1 = 4."
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-like-i1",
      "Simplify 9m - 4m.",
      "",
      "5m",
      "9 - 4 = 5, so the result is 5m."
    ),
    choice(
      "y8-alg-like-i2",
      "Why can 3x and 5y not be added together?",
      "A",
      [
        "They have different variables",
        "Their coefficients are different",
        "One coefficient is odd and the other is even",
        "Both must equal the same number first",
      ],
      "Only like terms with exactly the same variable can be combined. 3x and 5y have different variables."
    ),
    answer(
      "y8-alg-like-i3",
      "Simplify 2a + 3b + 5a - b.",
      "",
      "7a + 2b",
      "2a + 5a = 7a and 3b - b = 2b."
    ),
    answer(
      "y8-alg-like-i4",
      "Simplify 4x + 6 - x + 2.",
      "",
      "3x + 8",
      "4x - x = 3x and 6 + 2 = 8."
    ),
    choice(
      "y8-alg-like-i5",
      "A student simplifies 5a + 3b as 8ab. What is wrong?",
      "D",
      [
        "The coefficients were subtracted instead of added",
        "The variables should both be squared",
        "The constant term was ignored",
        "Unlike terms cannot be added; the correct answer is 5a + 3b",
      ],
      "5a and 3b have different variables. They are unlike terms and cannot be combined."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding unlike terms, writing 3x + 2y = 5xy.",
      fix: "Only terms with exactly the same variable can be added. 3x + 2y cannot be simplified further.",
    },
    {
      mistake: "Dropping the variable when collecting: 7a - 3a = 4.",
      fix: "Keep the variable in the result: 7a - 3a = 4a.",
    },
    {
      mistake: "Mishandling the sign: treating 4x - 3x as 4x + 3x.",
      fix: "The minus sign belongs to 3x. Subtract: 4x - 3x = x.",
    },
    {
      mistake: "Combining a variable term with a constant: 4x + 3 = 7x.",
      fix: "4x and 3 are unlike terms. The simplified form stays as 4x + 3.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-alg-like-m1",
      "Which pair are like terms?",
      "C",
      ["5a and 5b", "3x and 3", "6m and 2m", "4ab and 4a"],
      "6m and 2m both contain only m."
    ),
    answer(
      "y8-alg-like-m2",
      "Simplify 8t + 3t.",
      "",
      "11t",
      "8 + 3 = 11, so the result is 11t."
    ),
    answer(
      "y8-alg-like-m3",
      "Simplify 10k - 7k.",
      "",
      "3k",
      "10 - 7 = 3, so the result is 3k."
    ),
    choice(
      "y8-alg-like-m4",
      "Simplify 3p + 2q + 5p.",
      "B",
      ["10pq", "8p + 2q", "5p + 2q", "3p + 7pq"],
      "3p + 5p = 8p. The term 2q has no like term and is unchanged."
    ),
    answer(
      "y8-alg-like-m5",
      "Simplify 5x + 3y - 2x + y.",
      "",
      "3x + 4y",
      "5x - 2x = 3x and 3y + y = 4y."
    ),
    answer(
      "y8-alg-like-m6",
      "Simplify 6a - 4 + a + 9.",
      "",
      "7a + 5",
      "6a + a = 7a and -4 + 9 = 5."
    ),
    choice(
      "y8-alg-like-m7",
      "A student writes 4m + 5m = 9m². Is this correct?",
      "D",
      [
        "Yes, the variable gets squared when terms are added",
        "Yes, because 4 + 5 = 9",
        "No, the answer is 20m",
        "No, the answer is 9m",
      ],
      "Collecting like terms adds the coefficients; the power does not change. 4m + 5m = 9m."
    ),
    answer(
      "y8-alg-like-m8",
      "Simplify 7b - 3b + 2c - c.",
      "",
      "4b + c",
      "7b - 3b = 4b and 2c - c = c."
    ),
    choice(
      "y8-alg-like-m9",
      "Which expression is fully simplified?",
      "A",
      ["3x + 2y", "3x + 5x", "4m - m + m", "2a + a - 3a + a"],
      "3x + 2y has different variables in each term, so no further collection is possible."
    ),
    answer(
      "y8-alg-like-m10",
      "Simplify 9n + 3 - 4n - 1.",
      "",
      "5n + 2",
      "9n - 4n = 5n and 3 - 1 = 2."
    ),
  ],
};

// ── Lesson 3: Substitution ────────────────────────────────────────────────────

const substitution: LessonContent = {
  description:
    "Evaluate algebraic expressions by replacing variables with given numerical values and applying the correct order of operations.",
  learningIntention:
    "Evaluate algebraic expressions by substituting given values and following BIDMAS.",
  successCriteria: [
    "Replace each variable with its given value using brackets.",
    "Apply BIDMAS correctly after substituting.",
    "Evaluate expressions that include squared terms.",
    "Substitute into two-variable expressions.",
  ],
  teaching: {
    paragraphs: [
      "Substitution means replacing a variable with a specific number. Write the number inside brackets in the place of the variable to keep the calculation clear.",
      "After substituting, evaluate the expression using BIDMAS: Brackets, Indices, then Division and Multiplication left to right, then Addition and Subtraction left to right.",
      "When a variable is squared, substitute first and then square the result. For example, if x = 3, then x squared equals 3 squared equals 9.",
      "For expressions with two variables, substitute both values at the same time before evaluating.",
    ],
    latexBlocks: [
      "\\text{If }x = 4:\\quad 3x + 2 = 3(4) + 2 = 12 + 2 = 14",
      "\\text{If }a = 3:\\quad a^2 = 3^2 = 9",
      "\\text{BIDMAS: Brackets, Indices, Division, Multiplication, Addition, Subtraction}",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a linear expression",
      questionLatex: "\\text{Find }3x + 2\\text{ when }x = 5.",
      steps: [
        { explanation: "Replace x with 5.", latex: "3(5) + 2" },
        { explanation: "Multiply first, then add.", latex: "15 + 2 = 17" },
      ],
      finalAnswerLatex: "17",
    } as WorkedExample,
    {
      title: "Expression with a squared term",
      questionLatex: "\\text{Find }a^2 + 4\\text{ when }a = 3.",
      steps: [
        { explanation: "Replace a with 3.", latex: "3^2 + 4" },
        { explanation: "Apply the index first, then add.", latex: "9 + 4 = 13" },
      ],
      finalAnswerLatex: "13",
    } as WorkedExample,
    {
      title: "Two-variable expression",
      questionLatex: "\\text{Find }2m - n\\text{ when }m = 6\\text{ and }n = 4.",
      steps: [
        { explanation: "Substitute both values.", latex: "2(6) - 4" },
        { explanation: "Multiply then subtract.", latex: "12 - 4 = 8" },
      ],
      finalAnswerLatex: "8",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-alg-sub-g1",
      "Find 4x when x = 3.",
      "",
      "12",
      "4 × 3 = 12."
    ),
    answer(
      "y8-alg-sub-g2",
      "Find 2a + 5 when a = 4.",
      "",
      "13",
      "2(4) + 5 = 8 + 5 = 13."
    ),
    choice(
      "y8-alg-sub-g3",
      "Which step comes first when evaluating 3x² when x = 2?",
      "B",
      [
        "Calculate 3 × 2 = 6, then square to get 36",
        "Calculate 2² = 4, then multiply by 3 to get 12",
        "Add 3 and 2 to get 5",
        "Divide by x first",
      ],
      "Indices come before multiplication in BIDMAS. Square 2 first: 2² = 4, then 3 × 4 = 12."
    ),
    answer(
      "y8-alg-sub-g4",
      "Find 5p - q when p = 3 and q = 7.",
      "",
      "8",
      "5(3) - 7 = 15 - 7 = 8."
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-sub-i1",
      "Find 6 - x when x = 2.",
      "",
      "4",
      "6 - 2 = 4."
    ),
    answer(
      "y8-alg-sub-i2",
      "Find 3m + 2n when m = 4 and n = 1.",
      "",
      "14",
      "3(4) + 2(1) = 12 + 2 = 14."
    ),
    choice(
      "y8-alg-sub-i3",
      "A student evaluates x² when x = 5 by computing x × 2 = 10. What error was made?",
      "A",
      [
        "x² means x times x, not x times 2",
        "x should be replaced by 2, not 5",
        "The answer should be negative",
        "2 should be added to x",
      ],
      "x² means x squared: 5² = 5 × 5 = 25, not 5 × 2 = 10."
    ),
    answer(
      "y8-alg-sub-i4",
      "Find a² - 3 when a = 4.",
      "",
      "13",
      "4² - 3 = 16 - 3 = 13."
    ),
    answer(
      "y8-alg-sub-i5",
      "Find 3x - 2y + 4 when x = 2 and y = 3.",
      "",
      "4",
      "3(2) - 2(3) + 4 = 6 - 6 + 4 = 4."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Multiplying instead of squaring: writing x² = x × 2.",
      fix: "x² means x times x, not x times 2. If x = 3, then x² = 9.",
    },
    {
      mistake: "Forgetting brackets around a negative substitution.",
      fix: "Use brackets: if x = -2, then -x = -(-2) = 2. Write the brackets first to handle the sign correctly.",
    },
    {
      mistake: "Adding before multiplying, e.g. evaluating 3x + 2 with x = 4 as 3(6) = 18.",
      fix: "Follow BIDMAS: multiply 3 × 4 = 12 first, then add 2.",
    },
    {
      mistake: "Substituting only one variable in a two-variable expression.",
      fix: "Replace every variable in the expression before evaluating.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-alg-sub-m1",
      "Find 5x when x = 4.",
      "",
      "20",
      "5 × 4 = 20."
    ),
    answer(
      "y8-alg-sub-m2",
      "Find 3a - 1 when a = 5.",
      "",
      "14",
      "3(5) - 1 = 15 - 1 = 14."
    ),
    choice(
      "y8-alg-sub-m3",
      "What is 2x + 7 when x = 3?",
      "B",
      ["9", "13", "17", "27"],
      "2(3) + 7 = 6 + 7 = 13."
    ),
    answer(
      "y8-alg-sub-m4",
      "Find x² when x = 7.",
      "",
      "49",
      "7² = 7 × 7 = 49."
    ),
    answer(
      "y8-alg-sub-m5",
      "Find 4p + 3q when p = 2 and q = 3.",
      "",
      "17",
      "4(2) + 3(3) = 8 + 9 = 17."
    ),
    choice(
      "y8-alg-sub-m6",
      "What is a² + a when a = 4?",
      "A",
      ["20", "8", "16", "24"],
      "4² + 4 = 16 + 4 = 20."
    ),
    answer(
      "y8-alg-sub-m7",
      "Find 10 - 3x when x = 2.",
      "",
      "4",
      "10 - 3(2) = 10 - 6 = 4."
    ),
    choice(
      "y8-alg-sub-m8",
      "A student finds 3x² when x = 2 by computing (3 × 2)² = 36. What is the correct answer?",
      "C",
      ["9", "18", "12", "36"],
      "Indices apply to x only: 2² = 4, then 3 × 4 = 12."
    ),
    answer(
      "y8-alg-sub-m9",
      "Find 2m - 3n when m = 5 and n = 2.",
      "",
      "4",
      "2(5) - 3(2) = 10 - 6 = 4."
    ),
    answer(
      "y8-alg-sub-m10",
      "Find a² - 2b + 1 when a = 3 and b = 5.",
      "",
      "0",
      "3² - 2(5) + 1 = 9 - 10 + 1 = 0."
    ),
  ],
};

// ── Lesson 4: Expanding Single Brackets ──────────────────────────────────────

const expandingBrackets: LessonContent = {
  description:
    "Multiply a term over a bracket to remove it, applying the distributive law to expressions with positive and negative coefficients.",
  learningIntention:
    "Expand brackets by multiplying each term inside by the term outside.",
  successCriteria: [
    "Apply the distributive law: a(b + c) = ab + ac.",
    "Expand brackets where the outside coefficient is a positive integer.",
    "Expand brackets where the outside coefficient is negative.",
    "Expand and then collect like terms.",
  ],
  teaching: {
    paragraphs: [
      "Expanding a bracket means removing it by multiplying each term inside by the term outside. This is called the distributive law: a(b + c) = ab + ac.",
      "When the coefficient outside is positive, multiply each term inside by that number. For example, 3(x + 4) equals 3x + 12.",
      "When the coefficient outside is negative, the sign of every term inside changes. For example, -2(x + 3) equals -2x - 6.",
      "After expanding, check whether any like terms can be collected to simplify further.",
    ],
    latexBlocks: [
      "a(b + c) = ab + ac",
      "3(x + 4) = 3x + 12",
      "-2(x + 3) = -2x - 6",
    ],
  },
  workedExamples: [
    {
      title: "Positive coefficient",
      questionLatex: "\\text{Expand }4(x + 3).",
      steps: [
        { explanation: "Multiply each term inside the bracket by 4.", latex: "4 \\times x + 4 \\times 3" },
        { explanation: "Simplify each product.", latex: "4x + 12" },
      ],
      finalAnswerLatex: "4x + 12",
    } as WorkedExample,
    {
      title: "Coefficient with a variable term inside",
      questionLatex: "\\text{Expand }3(2x - 5).",
      steps: [
        { explanation: "Multiply 3 by 2x and by -5.", latex: "3 \\times 2x + 3 \\times (-5)" },
        { explanation: "Simplify.", latex: "6x - 15" },
      ],
      finalAnswerLatex: "6x - 15",
    } as WorkedExample,
    {
      title: "Negative coefficient",
      questionLatex: "\\text{Expand }{-2(x + 4)}.",
      steps: [
        { explanation: "Multiply each term inside by -2.", latex: "(-2) \\times x + (-2) \\times 4" },
        { explanation: "Both products are negative.", latex: "-2x - 8" },
      ],
      finalAnswerLatex: "-2x - 8",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-alg-exp-g1",
      "What is the first step when expanding 5(x + 2)?",
      "C",
      [
        "Write 5x + 2",
        "Write x + 10",
        "Multiply 5 by each term inside the bracket",
        "Add 5 to each term inside",
      ],
      "The distributive law multiplies (not adds) the outside term by every term inside."
    ),
    answer(
      "y8-alg-exp-g2",
      "Expand 3(x + 6).",
      "",
      "3x + 18",
      "3 × x = 3x and 3 × 6 = 18."
    ),
    answer(
      "y8-alg-exp-g3",
      "Expand 2(4x - 3).",
      "",
      "8x - 6",
      "2 × 4x = 8x and 2 × (-3) = -6."
    ),
    answer(
      "y8-alg-exp-g4",
      "Expand -3(x + 2).",
      "",
      "-3x - 6",
      "-3 × x = -3x and -3 × 2 = -6."
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-exp-i1",
      "Expand 5(x + 4).",
      "",
      "5x + 20",
      "5 × x = 5x and 5 × 4 = 20."
    ),
    choice(
      "y8-alg-exp-i2",
      "Expand -4(x - 3).",
      "B",
      ["-4x - 12", "-4x + 12", "4x - 12", "4x + 12"],
      "-4 × x = -4x and -4 × (-3) = +12. A negative times a negative gives a positive."
    ),
    answer(
      "y8-alg-exp-i3",
      "Expand 6(2x + 1).",
      "",
      "12x + 6",
      "6 × 2x = 12x and 6 × 1 = 6."
    ),
    answer(
      "y8-alg-exp-i4",
      "Expand and collect like terms: 3(x + 4) + 2x.",
      "",
      "5x + 12",
      "3(x + 4) = 3x + 12, then 3x + 12 + 2x = 5x + 12."
    ),
    choice(
      "y8-alg-exp-i5",
      "A student expands 2(x + 5) as 2x + 5. What is wrong?",
      "A",
      [
        "Only the first term was multiplied by 2; the 5 must also be multiplied",
        "The 2 should be added to x, not multiplied",
        "The sign of the answer should be negative",
        "The expansion is correct",
      ],
      "Every term inside the bracket must be multiplied: 2 × 5 = 10, not 5."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Only multiplying the first term: 3(x + 4) = 3x + 4.",
      fix: "Every term inside the bracket must be multiplied by the term outside.",
    },
    {
      mistake: "Getting the sign wrong for a negative coefficient: -2(x + 3) = -2x + 6.",
      fix: "-2 × 3 = -6, not +6. A negative times a positive gives a negative.",
    },
    {
      mistake: "Adding the outside term instead of multiplying: 4(x + 3) = 4 + x + 3 = x + 7.",
      fix: "Use multiplication: 4 × x = 4x and 4 × 3 = 12, giving 4x + 12.",
    },
    {
      mistake: "Not collecting like terms after expanding.",
      fix: "After expanding, always check whether the expression can be simplified further.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-alg-exp-m1",
      "Expand 2(x + 7).",
      "",
      "2x + 14",
      "2 × x = 2x and 2 × 7 = 14."
    ),
    answer(
      "y8-alg-exp-m2",
      "Expand 4(3x - 2).",
      "",
      "12x - 8",
      "4 × 3x = 12x and 4 × (-2) = -8."
    ),
    choice(
      "y8-alg-exp-m3",
      "Expand -5(x + 1).",
      "A",
      ["-5x - 5", "-5x + 5", "5x + 5", "5x - 5"],
      "-5 × x = -5x and -5 × 1 = -5."
    ),
    answer(
      "y8-alg-exp-m4",
      "Expand 3(2x + 5).",
      "",
      "6x + 15",
      "3 × 2x = 6x and 3 × 5 = 15."
    ),
    choice(
      "y8-alg-exp-m5",
      "Expand -2(3x - 4).",
      "B",
      ["-6x - 8", "-6x + 8", "6x - 8", "6x + 8"],
      "-2 × 3x = -6x and -2 × (-4) = +8."
    ),
    answer(
      "y8-alg-exp-m6",
      "Expand and collect: 2(x + 3) + 4x.",
      "",
      "6x + 6",
      "2x + 6 + 4x = 6x + 6."
    ),
    answer(
      "y8-alg-exp-m7",
      "Expand 7(x - 2).",
      "",
      "7x - 14",
      "7 × x = 7x and 7 × (-2) = -14."
    ),
    choice(
      "y8-alg-exp-m8",
      "Which expansion is correct?",
      "C",
      [
        "3(x + 2) = 3x + 2",
        "4(x - 3) = 4x - 3",
        "5(2x + 1) = 10x + 5",
        "-2(x + 4) = -2x + 8",
      ],
      "5 × 2x = 10x and 5 × 1 = 5, giving 10x + 5."
    ),
    answer(
      "y8-alg-exp-m9",
      "Expand -3(2x - 5).",
      "",
      "-6x + 15",
      "-3 × 2x = -6x and -3 × (-5) = +15."
    ),
    answer(
      "y8-alg-exp-m10",
      "Expand and collect: 4(x + 2) - 3(x + 1).",
      "",
      "x + 5",
      "4x + 8 - 3x - 3 = x + 5."
    ),
  ],
};

// ── Lesson 5: Solving One-Step Equations ─────────────────────────────────────

const solvingOneStep: LessonContent = {
  description:
    "Solve one-step linear equations using inverse operations, and verify solutions by substituting back into the original equation.",
  learningIntention:
    "Solve equations that require exactly one inverse operation to isolate the variable.",
  successCriteria: [
    "Identify which operation has been applied to the variable.",
    "Apply the inverse operation to both sides to isolate the variable.",
    "Solve equations involving addition, subtraction, multiplication and division.",
    "Check a solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "An equation states that two expressions are equal. To solve an equation means to find the value of the variable that makes it true.",
      "To isolate the variable, apply the inverse operation to both sides. The inverse of addition is subtraction, the inverse of subtraction is addition, the inverse of multiplication is division, and the inverse of division is multiplication.",
      "Whatever operation you apply to one side must also be applied to the other side. This keeps the equation balanced.",
      "Always check your solution by substituting it back into the original equation to confirm both sides are equal.",
    ],
    latexBlocks: [
      "x + 7 = 12 \\Rightarrow x = 12 - 7 = 5",
      "3x = 21 \\Rightarrow x = 21 \\div 3 = 7",
      "\\frac{x}{4} = 5 \\Rightarrow x = 5 \\times 4 = 20",
    ],
  },
  workedExamples: [
    {
      title: "Addition equation",
      questionLatex: "\\text{Solve }x + 8 = 15.",
      steps: [
        { explanation: "Subtract 8 from both sides to undo the addition.", latex: "x + 8 - 8 = 15 - 8" },
        { explanation: "Simplify.", latex: "x = 7" },
      ],
      finalAnswerLatex: "x = 7",
    } as WorkedExample,
    {
      title: "Multiplication equation",
      questionLatex: "\\text{Solve }4x = 28.",
      steps: [
        { explanation: "Divide both sides by 4 to undo the multiplication.", latex: "\\frac{4x}{4} = \\frac{28}{4}" },
        { explanation: "Simplify.", latex: "x = 7" },
      ],
      finalAnswerLatex: "x = 7",
    } as WorkedExample,
    {
      title: "Subtraction equation",
      questionLatex: "\\text{Solve }x - 5 = 11.",
      steps: [
        { explanation: "Add 5 to both sides to undo the subtraction.", latex: "x - 5 + 5 = 11 + 5" },
        { explanation: "Simplify.", latex: "x = 16" },
      ],
      finalAnswerLatex: "x = 16",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-alg-1eq-g1",
      "To solve x + 9 = 17, which inverse operation is needed?",
      "C",
      [
        "Add 9 to both sides",
        "Multiply both sides by 9",
        "Subtract 9 from both sides",
        "Divide both sides by 9",
      ],
      "The inverse of adding 9 is subtracting 9."
    ),
    answer(
      "y8-alg-1eq-g2",
      "Solve x + 6 = 14.",
      "",
      "8",
      "14 - 6 = 8.",
      ["x = 8"]
    ),
    answer(
      "y8-alg-1eq-g3",
      "Solve 5x = 35.",
      "",
      "7",
      "35 ÷ 5 = 7.",
      ["x = 7"]
    ),
    answer(
      "y8-alg-1eq-g4",
      "Solve x - 3 = 9.",
      "",
      "12",
      "9 + 3 = 12.",
      ["x = 12"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-1eq-i1",
      "Solve x + 11 = 20.",
      "",
      "9",
      "20 - 11 = 9.",
      ["x = 9"]
    ),
    choice(
      "y8-alg-1eq-i2",
      "Which equation has the solution x = 6?",
      "B",
      ["x + 6 = 6", "3x = 18", "x - 6 = 12", "x ÷ 6 = 12"],
      "3 × 6 = 18, so x = 6 satisfies 3x = 18."
    ),
    answer(
      "y8-alg-1eq-i3",
      "Solve x ÷ 4 = 5.",
      "",
      "20",
      "5 × 4 = 20.",
      ["x = 20"]
    ),
    answer(
      "y8-alg-1eq-i4",
      "Solve 7x = 56.",
      "",
      "8",
      "56 ÷ 7 = 8.",
      ["x = 8"]
    ),
    choice(
      "y8-alg-1eq-i5",
      "A student solves 2x = 10 by writing x = 10 × 2 = 20. What is wrong?",
      "D",
      [
        "The right operation was used",
        "10 should be added to both sides",
        "x should be squared",
        "Dividing (not multiplying) undoes multiplication",
      ],
      "To undo multiplication by 2, divide by 2: x = 10 ÷ 2 = 5."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the wrong inverse: multiplying to undo addition.",
      fix: "Learn each pair: + undone by −, × undone by ÷, − undone by +, ÷ undone by ×.",
    },
    {
      mistake: "Applying the inverse to only one side of the equation.",
      fix: "The equation stays balanced only when the same operation is done to both sides.",
    },
    {
      mistake: "Solving x + 7 = 12 as x = 12 + 7 = 19 instead of subtracting.",
      fix: "Subtract the added value: x = 12 - 7 = 5.",
    },
    {
      mistake: "Not checking the answer.",
      fix: "Substitute the solution back. For x + 8 = 15 with x = 7: 7 + 8 = 15. ✓",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-alg-1eq-m1",
      "Solve x + 5 = 13.",
      "",
      "8",
      "13 - 5 = 8.",
      ["x = 8"]
    ),
    answer(
      "y8-alg-1eq-m2",
      "Solve x - 7 = 4.",
      "",
      "11",
      "4 + 7 = 11.",
      ["x = 11"]
    ),
    choice(
      "y8-alg-1eq-m3",
      "Which step solves 6x = 54?",
      "A",
      [
        "Divide both sides by 6",
        "Subtract 6 from both sides",
        "Multiply both sides by 6",
        "Add 54 to both sides",
      ],
      "Dividing both sides by 6 isolates x: x = 54 ÷ 6 = 9."
    ),
    answer(
      "y8-alg-1eq-m4",
      "Solve 9x = 72.",
      "",
      "8",
      "72 ÷ 9 = 8.",
      ["x = 8"]
    ),
    answer(
      "y8-alg-1eq-m5",
      "Solve x + 15 = 24.",
      "",
      "9",
      "24 - 15 = 9.",
      ["x = 9"]
    ),
    choice(
      "y8-alg-1eq-m6",
      "Solve x ÷ 5 = 7.",
      "C",
      ["5", "2", "35", "12"],
      "Multiply both sides by 5: x = 7 × 5 = 35."
    ),
    answer(
      "y8-alg-1eq-m7",
      "Solve x - 12 = 8.",
      "",
      "20",
      "8 + 12 = 20.",
      ["x = 20"]
    ),
    choice(
      "y8-alg-1eq-m8",
      "A student solves x - 4 = 9 as x = 9 - 4 = 5. Is this correct?",
      "B",
      ["Yes, x = 5", "No, x = 13", "No, x = 4", "No, x = 36"],
      "To undo subtracting 4, add 4: x = 9 + 4 = 13."
    ),
    answer(
      "y8-alg-1eq-m9",
      "Solve 8x = 40.",
      "",
      "5",
      "40 ÷ 8 = 5.",
      ["x = 5"]
    ),
    answer(
      "y8-alg-1eq-m10",
      "Solve x ÷ 3 = 9.",
      "",
      "27",
      "9 × 3 = 27.",
      ["x = 27"]
    ),
  ],
};

// ── Lesson 6: Solving Two-Step Equations ─────────────────────────────────────

const solvingTwoStep: LessonContent = {
  description:
    "Solve two-step linear equations by undoing operations in reverse order, then verify solutions by substituting back.",
  learningIntention:
    "Solve equations that require two inverse operations by undoing them in reverse order.",
  successCriteria: [
    "Identify the two operations applied to the variable.",
    "Undo addition or subtraction first, then undo multiplication or division.",
    "Solve two-step equations with integer solutions.",
    "Verify solutions by substituting back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "A two-step equation requires two inverse operations to isolate the variable. Think of it as undoing what was done to x in reverse: in 2x + 3 = 11, first undo adding 3 by subtracting 3, then undo multiplying by 2 by dividing by 2.",
      "Always undo addition or subtraction first, then undo multiplication or division. This reverse order mirrors how the expression was built.",
      "After each step write the simplified equation clearly before taking the next step.",
      "Check by substituting back into the original equation.",
    ],
    latexBlocks: [
      "2x + 3 = 11 \\Rightarrow 2x = 8 \\Rightarrow x = 4",
      "\\text{Check: }2(4) + 3 = 8 + 3 = 11\\checkmark",
      "\\frac{x}{3} - 2 = 4 \\Rightarrow \\frac{x}{3} = 6 \\Rightarrow x = 18",
    ],
  },
  workedExamples: [
    {
      title: "Undo addition then multiplication",
      questionLatex: "\\text{Solve }2x + 3 = 11.",
      steps: [
        { explanation: "Subtract 3 from both sides.", latex: "2x + 3 - 3 = 11 - 3 \\Rightarrow 2x = 8" },
        { explanation: "Divide both sides by 2.", latex: "x = 8 \\div 2 = 4" },
        { explanation: "Check: 2(4) + 3 = 11. ✓", latex: "2(4) + 3 = 11\\checkmark" },
      ],
      finalAnswerLatex: "x = 4",
    } as WorkedExample,
    {
      title: "Undo subtraction then multiplication",
      questionLatex: "\\text{Solve }3x - 5 = 10.",
      steps: [
        { explanation: "Add 5 to both sides.", latex: "3x = 15" },
        { explanation: "Divide both sides by 3.", latex: "x = 5" },
      ],
      finalAnswerLatex: "x = 5",
    } as WorkedExample,
    {
      title: "Undo addition then division",
      questionLatex: "\\text{Solve }\\dfrac{x}{2} + 4 = 9.",
      steps: [
        { explanation: "Subtract 4 from both sides.", latex: "\\frac{x}{2} = 5" },
        { explanation: "Multiply both sides by 2.", latex: "x = 10" },
      ],
      finalAnswerLatex: "x = 10",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-alg-2eq-g1",
      "Which step comes first when solving 3x + 7 = 19?",
      "B",
      [
        "Divide both sides by 3",
        "Subtract 7 from both sides",
        "Add 7 to both sides",
        "Multiply both sides by 3",
      ],
      "Undo addition and subtraction before multiplication and division."
    ),
    answer(
      "y8-alg-2eq-g2",
      "Solve 2x + 1 = 9.",
      "",
      "4",
      "2x = 8, then x = 4.",
      ["x = 4"]
    ),
    answer(
      "y8-alg-2eq-g3",
      "Solve 4x - 3 = 13.",
      "",
      "4",
      "4x = 16, then x = 4.",
      ["x = 4"]
    ),
    answer(
      "y8-alg-2eq-g4",
      "Solve x/3 + 2 = 7.",
      "",
      "15",
      "x/3 = 5, then x = 15.",
      ["x = 15"]
    ),
  ],
  independentPractice: [
    answer(
      "y8-alg-2eq-i1",
      "Solve 3x + 4 = 19.",
      "",
      "5",
      "3x = 15, then x = 5.",
      ["x = 5"]
    ),
    choice(
      "y8-alg-2eq-i2",
      "Solve 5x - 10 = 15.",
      "C",
      ["x = 1", "x = 3", "x = 5", "x = 25"],
      "5x = 25, then x = 5."
    ),
    answer(
      "y8-alg-2eq-i3",
      "Solve 2x - 7 = 11.",
      "",
      "9",
      "2x = 18, then x = 9.",
      ["x = 9"]
    ),
    answer(
      "y8-alg-2eq-i4",
      "Solve x/5 + 3 = 8.",
      "",
      "25",
      "x/5 = 5, then x = 25.",
      ["x = 25"]
    ),
    choice(
      "y8-alg-2eq-i5",
      "A student solves 2x + 4 = 12 in one step: x = 12 ÷ 2 = 6. What is the error?",
      "A",
      [
        "The constant 4 must be removed before dividing by 2",
        "The answer x = 6 is actually correct",
        "Dividing by 2 is the wrong operation",
        "12 should be multiplied by 2 first",
      ],
      "Subtract 4 first: 2x = 8, then x = 4."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing before removing the constant: for 2x + 4 = 12, dividing by 2 first.",
      fix: "Always subtract or add the constant first. 2x + 4 = 12 → 2x = 8 → x = 4.",
    },
    {
      mistake: "Applying the inverse to the wrong side: subtracting the constant from only one side.",
      fix: "Subtract from both sides: 3x + 5 = 14 → 3x + 5 - 5 = 14 - 5 → 3x = 9.",
    },
    {
      mistake: "Forgetting to divide after removing the constant.",
      fix: "Once the constant is removed, divide both sides by the coefficient of x.",
    },
    {
      mistake: "Not checking the solution.",
      fix: "Substitute back: for 3x - 5 = 10 with x = 5, check 3(5) - 5 = 10. ✓",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-alg-2eq-m1",
      "Solve 2x + 5 = 17.",
      "",
      "6",
      "2x = 12, then x = 6.",
      ["x = 6"]
    ),
    answer(
      "y8-alg-2eq-m2",
      "Solve 3x - 6 = 12.",
      "",
      "6",
      "3x = 18, then x = 6.",
      ["x = 6"]
    ),
    choice(
      "y8-alg-2eq-m3",
      "Solve 4x + 3 = 23.",
      "B",
      ["x = 6.5", "x = 5", "x = 26", "x = 20"],
      "4x = 20, then x = 5."
    ),
    answer(
      "y8-alg-2eq-m4",
      "Solve 5x - 4 = 21.",
      "",
      "5",
      "5x = 25, then x = 5.",
      ["x = 5"]
    ),
    answer(
      "y8-alg-2eq-m5",
      "Solve x/4 + 1 = 6.",
      "",
      "20",
      "x/4 = 5, then x = 20.",
      ["x = 20"]
    ),
    choice(
      "y8-alg-2eq-m6",
      "Which shows the correct first step for solving 6x - 7 = 29?",
      "A",
      [
        "Add 7 to both sides",
        "Divide both sides by 6",
        "Subtract 29 from both sides",
        "Multiply both sides by 6",
      ],
      "Remove the constant first: 6x - 7 + 7 = 29 + 7 gives 6x = 36."
    ),
    answer(
      "y8-alg-2eq-m7",
      "Solve 7x + 2 = 30.",
      "",
      "4",
      "7x = 28, then x = 4.",
      ["x = 4"]
    ),
    choice(
      "y8-alg-2eq-m8",
      "A student solves 3x + 9 = 21 as x = 21 ÷ 3 - 9 = -2. What is correct?",
      "C",
      ["x = -2", "x = 10", "x = 4", "x = 30"],
      "First subtract 9: 3x = 12. Then divide by 3: x = 4."
    ),
    answer(
      "y8-alg-2eq-m9",
      "Solve 2x - 3 = 15.",
      "",
      "9",
      "2x = 18, then x = 9.",
      ["x = 9"]
    ),
    answer(
      "y8-alg-2eq-m10",
      "Solve x/6 - 2 = 4.",
      "",
      "36",
      "x/6 = 6, then x = 36.",
      ["x = 36"]
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "simplifying-algebraic-expressions": simplifyingExpressions,
  "collecting-like-terms":             collectingLikeTerms,
  "substitution":                      substitution,
  "expanding-single-brackets":         expandingBrackets,
  "solving-one-step-equations":        solvingOneStep,
  "solving-two-step-equations":        solvingTwoStep,
};

export function year8AlgebraFoundationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "algebra-foundations"
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
