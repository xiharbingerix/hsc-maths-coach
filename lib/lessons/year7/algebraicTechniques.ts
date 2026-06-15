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
    hint: "Re-read the teaching section and look at the worked examples for a similar question.",
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

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — Algebraic notation
// ─────────────────────────────────────────────────────────────────────────────

const algebraicNotation: LessonContent = {
  description: "Understand and use algebraic notation: pronumerals, expressions, terms, and equations written in the conventional shorthand.",
  learningIntention: "Read and write algebraic expressions using correct notation, and distinguish between terms, expressions, and equations.",
  successCriteria: [
    "Explain what a pronumeral is and give an example.",
    "Write products and powers in correct algebraic shorthand (3x, a², ab).",
    "Identify the number of terms in an expression.",
    "Distinguish between an expression and an equation.",
    "Write an algebraic expression from a word description.",
  ],
  teaching: {
    paragraphs: [
      "A pronumeral is a letter that stands in for an unknown or changing number. In the expression 5x, the letter x is the pronumeral — we do not know its value yet. Using letters lets us write rules that work for any number, not just one specific value.",
      "Algebra has its own shorthand to keep expressions tidy. When a number multiplies a pronumeral we write them side by side without a multiplication sign: 3 × x becomes 3x, and a × b becomes ab. When a letter multiplies itself we use a power: a × a becomes a², and b × b × b becomes b³.",
      "A term is a single part of an expression — it can be a number, a pronumeral, or a combination like 4x or 3ab. An expression is one or more terms joined by addition or subtraction: 2x + 5 is an expression with two terms. An equation has an equals sign and states that two expressions are equal: 2x + 5 = 11 is an equation.",
      "When writing expressions from words, pay close attention to order. 'Five more than a number n' means n + 5, while 'a number n less than five' means 5 − n. The phrases 'the product of' and 'the sum of' tell you which operation to use.",
    ],
    latexBlocks: [
      "3 \\times x = 3x, \\quad a \\times b = ab, \\quad a \\times a = a^2",
      "\\text{term} \\rightarrow \\text{expression} \\rightarrow \\text{equation}",
      "\\underbrace{4x}_{\\text{term}} + \\underbrace{3}_{\\text{term}} \\quad \\text{(expression with 2 terms)}",
      "4x + 3 = 11 \\quad \\text{(equation — has an equals sign)}",
    ],
  },
  workedExamples: [
    {
      title: "Rewrite using algebraic notation",
      questionLatex: "\\text{Write each product using algebraic notation:}\\quad (a)\\; 5 \\times n \\quad (b)\\; p \\times p \\quad (c)\\; 4 \\times a \\times b",
      steps: [
        { explanation: "Drop the multiplication sign between a number and a pronumeral.", latex: "5 \\times n = 5n" },
        { explanation: "A pronumeral multiplied by itself is written as a square.", latex: "p \\times p = p^2" },
        { explanation: "Drop all multiplication signs and write the number first, then the pronumerals in alphabetical order.", latex: "4 \\times a \\times b = 4ab" },
      ],
      finalAnswerLatex: "5n, \\quad p^2, \\quad 4ab",
    },
    {
      title: "Write an expression from words",
      questionLatex: "\\text{Write an algebraic expression for: four more than three times a number } n.",
      steps: [
        { explanation: "Identify 'three times a number n' — multiply the pronumeral by 3.", latex: "3 \\times n = 3n" },
        { explanation: "Identify 'four more than' — add 4 to the result.", latex: "3n + 4" },
      ],
      finalAnswerLatex: "3n + 4",
    },
    {
      title: "Count the terms in an expression",
      questionLatex: "\\text{How many terms does } 5x^2 + 3x - 7 \\text{ have?}",
      steps: [
        { explanation: "Count the parts separated by addition or subtraction signs.", latex: "5x^2, \\quad 3x, \\quad -7" },
        { explanation: "There are three separate parts, so the expression has three terms.", latex: "\\text{Number of terms} = 3" },
      ],
      finalAnswerLatex: "\\text{3 terms}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-alg-not-g1",
      "Which of the following is written correctly in algebraic notation?",
      "C",
      ["$3 \\times x$", "$a \\times a$", "$5n$", "$b \\times 4$"],
      "5n is correct algebraic shorthand: the number is written first, then the pronumeral, with no multiplication sign."
    ),
    answer(
      "y7-alg-not-g2",
      "Write the product $m \\times m \\times m$ using algebraic notation.",
      "m \\times m \\times m",
      "m^3",
      "m multiplied by itself three times is written as m cubed: m³.",
      ["m³", "m^(3)"]
    ),
    answer(
      "y7-alg-not-g3",
      "How many terms does the expression $4a + 9b - 2$ have?",
      "4a + 9b - 2",
      "3",
      "The three terms are 4a, 9b, and -2, separated by + and - signs."
    ),
    answer(
      "y7-alg-not-g4",
      "Write an expression for: double a number $k$, then subtract 3.",
      "\\text{double } k \\text{ then subtract } 3",
      "2k-3",
      "Double k is 2k, and subtracting 3 gives 2k - 3.",
      ["2k - 3", "2*k-3"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-alg-not-i1",
      "Write the product $6 \\times y$ using algebraic notation.",
      "6 \\times y",
      "6y",
      "Drop the multiplication sign and write the number before the pronumeral: 6y."
    ),
    answer(
      "y7-alg-not-i2",
      "Write $x \\times x$ using a power.",
      "x \\times x",
      "x^2",
      "x multiplied by itself is x squared, written x².",
      ["x²", "x^(2)"]
    ),
    answer(
      "y7-alg-not-i3",
      "How many terms does $7p - 4q + 1$ have?",
      "7p - 4q + 1",
      "3",
      "The three terms are 7p, -4q, and 1."
    ),
    answer(
      "y7-alg-not-i4",
      "Write an expression for: five less than a number $n$.",
      "\\text{five less than } n",
      "n-5",
      "Five less than n means we subtract 5 from n: n - 5.",
      ["n - 5"]
    ),
    choice(
      "y7-alg-not-i5",
      "Which of these is an equation (not just an expression)?",
      "B",
      ["$3x + 7$", "$3x + 7 = 16$", "$3x$", "$x + x + x$"],
      "An equation has an equals sign. Only 3x + 7 = 16 has one, making it an equation."
    ),
  ],
  commonMistakes: [
    { mistake: "Writing a × b as ab but putting the pronumeral before the number, e.g. x3 instead of 3x.", fix: "Always write the numeral first: 3x, not x3." },
    { mistake: "Confusing an expression with an equation — treating 3x + 5 as if it already has a solution.", fix: "An expression has no equals sign and cannot be solved. An equation has an equals sign and can be solved." },
    { mistake: "Thinking 'five less than n' means 5 − n because 5 is mentioned first.", fix: "Start with n and subtract 5: n − 5. Read the words carefully — 'less than' comes after the amount being subtracted." },
    { mistake: "Writing a² as 2a — confusing a power with multiplication by 2.", fix: "a² means a × a (a times itself). 2a means 2 × a (two lots of a). These are different." },
  ],
  masteryQuiz: [
    answer(
      "y7-alg-not-m1",
      "Write $4 \\times a \\times a$ using algebraic notation.",
      "4 \\times a \\times a",
      "4a^2",
      "4 × a × a = 4a². The number comes first, then a squared.",
      ["4a²", "4a^(2)"]
    ),
    choice(
      "y7-alg-not-m2",
      "How many terms does $x^2 + 3x - 8$ have?",
      "C",
      ["1", "2", "3", "4"],
      "The three terms are x², 3x, and -8, separated by + and - signs."
    ),
    answer(
      "y7-alg-not-m3",
      "Write an expression for: the product of $p$ and $q$.",
      "\\text{the product of } p \\text{ and } q",
      "pq",
      "The product of p and q means p multiplied by q, written as pq in algebraic notation."
    ),
    answer(
      "y7-alg-not-m4",
      "Write an expression for: three times $m$ squared.",
      "\\text{three times } m \\text{ squared}",
      "3m^2",
      "Three times m squared is 3 × m² = 3m².",
      ["3m²", "3m^(2)"]
    ),
    choice(
      "y7-alg-not-m5",
      "Which expression means 'two more than four times a number $n$'?",
      "A",
      ["$4n + 2$", "$2n + 4$", "$4 + 2n$", "$4n - 2$"],
      "'Four times n' is 4n, and 'two more than' means we add 2: 4n + 2."
    ),
    answer(
      "y7-alg-not-m6",
      "Write $n \\times n \\times n \\times n$ using a power.",
      "n \\times n \\times n \\times n",
      "n^4",
      "n multiplied by itself four times is n to the power 4, written n⁴.",
      ["n⁴", "n^(4)"]
    ),
    answer(
      "y7-alg-not-m7",
      "Write an expression for: subtract $k$ from 10.",
      "\\text{subtract } k \\text{ from } 10",
      "10-k",
      "Subtracting k from 10 gives 10 - k. Start with 10, then subtract k.",
      ["10 - k"]
    ),
    answer(
      "y7-alg-not-m8",
      "Write the expression $3 \\times c \\times c + 5 \\times c$ using algebraic notation.",
      "3 \\times c \\times c + 5 \\times c",
      "3c^2+5c",
      "3 × c × c = 3c² and 5 × c = 5c, so the expression is 3c² + 5c.",
      ["3c² + 5c", "3c^(2)+5c", "3c^2 + 5c"]
    ),
    answer(
      "y7-alg-not-m9",
      "A book costs $d$ dollars. Write an expression for the total cost of 5 books.",
      "\\text{cost of 5 books at } \\$d \\text{ each}",
      "5d",
      "5 books at d dollars each cost 5 × d = 5d dollars."
    ),
    answer(
      "y7-alg-not-m10",
      "Write an expression for: the sum of $a$ squared and $b$ squared.",
      "\\text{sum of } a^2 \\text{ and } b^2",
      "a^2+b^2",
      "The sum of a² and b² is a² + b².",
      ["a² + b²", "a^(2)+b^(2)", "a^2 + b^2"]
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Collecting like terms
// ─────────────────────────────────────────────────────────────────────────────

const collectingLikeTerms: LessonContent = {
  description: "Identify like terms and simplify algebraic expressions by collecting them.",
  learningIntention: "Simplify algebraic expressions by identifying and collecting like terms.",
  successCriteria: [
    "Explain what makes two terms 'like terms'.",
    "Identify which terms in an expression are like terms.",
    "Add and subtract like terms to simplify an expression.",
    "Simplify expressions containing two or more different pronumerals.",
  ],
  teaching: {
    paragraphs: [
      "Like terms are terms that have exactly the same pronumeral part — the same letter (or letters) raised to the same power. For example, 3x and 7x are like terms because both contain x. But 3x and 3x² are not like terms because the powers differ.",
      "Collecting like terms is similar to counting objects. If you have 3 apples and 5 apples you have 8 apples — you can add them because they are the same thing. Likewise, 3x + 5x = 8x. You add the coefficients (the numbers in front) and keep the pronumeral part unchanged.",
      "When an expression has more than one type of pronumeral, group the like terms separately before adding. In 4a + 2b + 3a − b, the a-terms are 4a and 3a, and the b-terms are 2b and −b. Collecting gives 7a + b.",
      "Only the coefficients change when you collect like terms. The pronumeral part is not affected — 3x + 5x = 8x, not 8x².",
    ],
    latexBlocks: [
      "3x + 5x = 8x \\quad \\text{(same variable, add coefficients)}",
      "7a - 2a = 5a \\quad \\text{(same variable, subtract coefficients)}",
      "4a + 2b + 3a - b = (4a+3a) + (2b-b) = 7a + b",
    ],
  },
  workedExamples: [
    {
      title: "Simplify an expression with one type of pronumeral",
      questionLatex: "\\text{Simplify }\\; 5x + 3x - 2x.",
      steps: [
        { explanation: "All three terms are like terms because they all contain x.", latex: "5x,\\; 3x,\\; 2x \\text{ are all like terms}" },
        { explanation: "Add and subtract the coefficients in order, keeping x.", latex: "5 + 3 - 2 = 6" },
        { explanation: "Write the simplified expression.", latex: "5x + 3x - 2x = 6x" },
      ],
      finalAnswerLatex: "6x",
    },
    {
      title: "Simplify an expression with two different pronumerals",
      questionLatex: "\\text{Simplify }\\; 4a + 3b + 2a - b.",
      steps: [
        { explanation: "Group the a-terms together.", latex: "4a + 2a = 6a" },
        { explanation: "Group the b-terms together. Note that −b means −1b.", latex: "3b - b = 3b - 1b = 2b" },
        { explanation: "Write the simplified expression.", latex: "4a + 3b + 2a - b = 6a + 2b" },
      ],
      finalAnswerLatex: "6a + 2b",
    },
    {
      title: "Identify like terms and simplify",
      questionLatex: "\\text{Simplify }\\; 3x^2 + 5x + 2x^2 - x.",
      steps: [
        { explanation: "x² terms and x terms are different: group x² terms and x terms separately.", latex: "3x^2 + 2x^2 = 5x^2 \\quad \\text{and} \\quad 5x - x = 4x" },
        { explanation: "Write the simplified expression.", latex: "3x^2 + 5x + 2x^2 - x = 5x^2 + 4x" },
      ],
      finalAnswerLatex: "5x^2 + 4x",
    },
  ],
  guidedPractice: [
    choice(
      "y7-alg-like-g1",
      "Which pair are like terms?",
      "A",
      ["$5x$ and $3x$", "$5x$ and $3x^2$", "$5x$ and $5y$", "$4ab$ and $4a$"],
      "5x and 3x are like terms because both contain x (same letter, same power). The others differ in their pronumeral or power."
    ),
    answer(
      "y7-alg-like-g2",
      "Simplify $8m + 3m$.",
      "8m + 3m",
      "11m",
      "Add the coefficients: 8 + 3 = 11. The result is 11m."
    ),
    answer(
      "y7-alg-like-g3",
      "Simplify $9k - 4k$.",
      "9k - 4k",
      "5k",
      "Subtract the coefficients: 9 - 4 = 5. The result is 5k."
    ),
    answer(
      "y7-alg-like-g4",
      "Simplify $5p + 3q + 2p$. Write the coefficient of $p$ in the simplified expression.",
      "5p + 3q + 2p",
      "7",
      "The p-terms are 5p and 2p. Their sum is 7p. The q-term stays as 3q. Simplified: 7p + 3q. Coefficient of p is 7."
    ),
  ],
  independentPractice: [
    answer(
      "y7-alg-like-i1",
      "Simplify $6a + 4a - 3a$.",
      "6a + 4a - 3a",
      "7a",
      "Combine the coefficients in order: 6 + 4 - 3 = 7. Result is 7a."
    ),
    answer(
      "y7-alg-like-i2",
      "Simplify $3x + 2y + 5x + y$. Write the coefficient of $x$.",
      "3x + 2y + 5x + y",
      "8",
      "x-terms: 3x + 5x = 8x. y-terms: 2y + y = 3y. Simplified: 8x + 3y. Coefficient of x is 8."
    ),
    answer(
      "y7-alg-like-i3",
      "Simplify $10n - 3n + n$.",
      "10n - 3n + n",
      "8n",
      "Combine: 10 - 3 + 1 = 8. Note that n alone has coefficient 1. Result is 8n."
    ),
    answer(
      "y7-alg-like-i4",
      "A rectangle has sides of length $3x$ cm and $x$ cm. Write a simplified expression for the perimeter.",
      "P = 3x + x + 3x + x",
      "8x",
      "Perimeter = 3x + x + 3x + x = 8x. Add all four sides: 3 + 1 + 3 + 1 = 8."
    ),
    choice(
      "y7-alg-like-i5",
      "Simplify $4x^2 + 3x + 2x^2$. Which answer is correct?",
      "B",
      ["$9x^3$", "$6x^2 + 3x$", "$9x^2$", "$6x^3 + 3x$"],
      "4x² and 2x² are like terms (both x²): 4 + 2 = 6, giving 6x². The 3x term stays. Result: 6x² + 3x."
    ),
  ],
  commonMistakes: [
    { mistake: "Adding unlike terms: 3x + 2y = 5xy.", fix: "Only like terms can be added. 3x and 2y have different pronumerals, so they cannot be combined." },
    { mistake: "Adding powers when collecting: 3x + 5x = 8x².", fix: "When you collect like terms, only the coefficients change. The power stays the same: 3x + 5x = 8x, not 8x²." },
    { mistake: "Forgetting that x alone means 1x: 5x - x = 5 instead of 4x.", fix: "A lone pronumeral x has a coefficient of 1. So x = 1x, and 5x - x = 5x - 1x = 4x." },
    { mistake: "Treating x² and x as like terms because both contain x.", fix: "x² and x are not like terms — the powers differ (2 vs 1). They must be grouped separately." },
  ],
  masteryQuiz: [
    answer(
      "y7-alg-like-m1",
      "Simplify $7t + 4t - 2t$.",
      "7t + 4t - 2t",
      "9t",
      "7 + 4 - 2 = 9. The result is 9t."
    ),
    choice(
      "y7-alg-like-m2",
      "Which pair of terms are NOT like terms?",
      "C",
      ["$6p$ and $2p$", "$4a$ and $9a$", "$3x$ and $3x^2$", "$5b$ and $b$"],
      "3x and 3x² differ in power (x vs x²), so they are not like terms. All other pairs share the same variable and power."
    ),
    answer(
      "y7-alg-like-m3",
      "Simplify $8c + 3d - 5c + 2d$. Write the coefficient of $c$.",
      "8c + 3d - 5c + 2d",
      "3",
      "c-terms: 8c - 5c = 3c. d-terms: 3d + 2d = 5d. Simplified: 3c + 5d. Coefficient of c is 3."
    ),
    answer(
      "y7-alg-like-m4",
      "Simplify $5x^2 + 4x + 3x^2 - x$. What is the coefficient of $x^2$?",
      "5x^2 + 4x + 3x^2 - x",
      "8",
      "x² terms: 5x² + 3x² = 8x². x terms: 4x - x = 3x. Simplified: 8x² + 3x. Coefficient of x² is 8."
    ),
    answer(
      "y7-alg-like-m5",
      "Simplify $2a + 3b + 4c + 5a - b$. What is the coefficient of $b$?",
      "2a + 3b + 4c + 5a - b",
      "2",
      "a-terms: 2a + 5a = 7a. b-terms: 3b - b = 2b. c-term stays. Simplified: 7a + 2b + 4c. Coefficient of b is 2."
    ),
    answer(
      "y7-alg-like-m6",
      "Simplify $12m - 5m + m$.",
      "12m - 5m + m",
      "8m",
      "12 - 5 + 1 = 8. Remember m alone has coefficient 1. Result is 8m."
    ),
    choice(
      "y7-alg-like-m7",
      "A student simplifies $3x + 4x^2 + 2x$ and gets $9x^3$. What did they do wrong?",
      "A",
      [
        "They added the powers instead of collecting coefficients of like terms.",
        "They forgot to include the x² term.",
        "They subtracted instead of adding.",
        "They combined unlike terms correctly.",
      ],
      "3x and 2x are like terms (both x): 3x + 2x = 5x. The 4x² term stays separately. Correct answer is 4x² + 5x, not 9x³."
    ),
    answer(
      "y7-alg-like-m8",
      "Simplify $6a + 3b - 2a - 3b$.",
      "6a + 3b - 2a - 3b",
      "4a",
      "a-terms: 6a - 2a = 4a. b-terms: 3b - 3b = 0. Result is 4a."
    ),
    answer(
      "y7-alg-like-m9",
      "A triangle has sides $2x + 1$, $3x - 1$, and $x + 4$. Write a simplified expression for the perimeter.",
      "(2x+1) + (3x-1) + (x+4)",
      "6x+4",
      "Add all sides: x-terms: 2x + 3x + x = 6x. Constants: 1 - 1 + 4 = 4. Perimeter = 6x + 4.",
      ["6x + 4"]
    ),
    answer(
      "y7-alg-like-m10",
      "Simplify $9y - 4y + 3y - 2y$.",
      "9y - 4y + 3y - 2y",
      "6y",
      "Combine in order: 9 - 4 + 3 - 2 = 6. Result is 6y."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Expanding brackets
// ─────────────────────────────────────────────────────────────────────────────

const expandingBrackets: LessonContent = {
  description: "Apply the distributive law to expand single brackets, including those with negative coefficients, then simplify.",
  learningIntention: "Use the distributive law to expand and simplify expressions involving single brackets.",
  successCriteria: [
    "State the distributive law in words and symbols.",
    "Expand a single bracket with a positive coefficient.",
    "Expand a single bracket with a negative coefficient, applying sign rules correctly.",
    "Expand two single brackets in the same expression and collect like terms.",
  ],
  teaching: {
    paragraphs: [
      "The distributive law says that a number (or pronumeral) outside a bracket multiplies every single term inside the bracket. For example, 3(x + 4) means 3 × x and 3 × 4, giving 3x + 12. The key word is every — you cannot multiply only the first term.",
      "When the coefficient outside is negative, every sign inside the bracket changes. This is because a negative times a positive is negative, and a negative times a negative is positive. For example, −2(x − 5) becomes −2x + 10: the first product is negative, and the second flips to positive.",
      "When an expression contains two separate brackets, expand each one independently, then collect any like terms. For 4(x + 1) + 2(x + 3), expand to get 4x + 4 + 2x + 6, then collect to get 6x + 10.",
      "Year 7 algebra uses single brackets only. Every term inside the bracket has just one pronumeral or is a constant. Binomial products such as (x + 2)(x + 3) are a Year 9 topic — do not use double brackets here.",
    ],
    latexBlocks: [
      "a(b + c) = ab + ac",
      "-a(b + c) = -ab - ac",
      "-a(b - c) = -ab + ac \\quad \\text{(negative × negative = positive)}",
      "4(x+1)+2(x+3) = 4x+4+2x+6 = 6x+10",
    ],
  },
  workedExamples: [
    {
      title: "Expand a bracket with a positive coefficient",
      questionLatex: "\\text{Expand }\\; 5(3x + 2).",
      steps: [
        { explanation: "Multiply 5 by the first term inside the bracket.", latex: "5 \\times 3x = 15x" },
        { explanation: "Multiply 5 by the second term inside the bracket.", latex: "5 \\times 2 = 10" },
        { explanation: "Write the expanded expression.", latex: "5(3x+2) = 15x + 10" },
      ],
      finalAnswerLatex: "15x + 10",
    },
    {
      title: "Expand a bracket with a negative coefficient",
      questionLatex: "\\text{Expand }\\; -3(2x - 4).",
      steps: [
        { explanation: "Multiply −3 by the first term. Negative times positive is negative.", latex: "-3 \\times 2x = -6x" },
        { explanation: "Multiply −3 by the second term. Negative times negative is positive.", latex: "-3 \\times (-4) = +12" },
        { explanation: "Write the expanded expression.", latex: "-3(2x-4) = -6x + 12" },
      ],
      finalAnswerLatex: "-6x + 12",
    },
    {
      title: "Expand two brackets and collect like terms",
      questionLatex: "\\text{Expand and simplify }\\; 2(x + 3) + 4(x - 1).",
      steps: [
        { explanation: "Expand the first bracket.", latex: "2(x+3) = 2x + 6" },
        { explanation: "Expand the second bracket.", latex: "4(x-1) = 4x - 4" },
        { explanation: "Write both expansions together.", latex: "2x + 6 + 4x - 4" },
        { explanation: "Collect the x-terms and the constants.", latex: "(2x+4x) + (6-4) = 6x + 2" },
      ],
      finalAnswerLatex: "6x + 2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-alg-exp-g1",
      "Expand $3(x + 5)$. Which answer is correct?",
      "B",
      ["$3x + 5$", "$3x + 15$", "$x + 15$", "$3x + 8$"],
      "3 multiplies every term inside: 3 × x = 3x and 3 × 5 = 15. Result: 3x + 15."
    ),
    answer(
      "y7-alg-exp-g2",
      "Expand $4(2x + 3)$. What is the constant term?",
      "4(2x + 3)",
      "12",
      "4 × 3 = 12. The expanded form is 8x + 12. The constant term is 12."
    ),
    answer(
      "y7-alg-exp-g3",
      "Expand $-2(3x + 5)$. What is the coefficient of $x$?",
      "-2(3x + 5)",
      "-6",
      "-2 × 3x = -6x and -2 × 5 = -10. Expanded: -6x - 10. Coefficient of x is -6.",
      ["−6"]
    ),
    answer(
      "y7-alg-exp-g4",
      "Expand and simplify $3(x + 2) + 2(x + 4)$. What is the coefficient of $x$?",
      "3(x+2)+2(x+4)",
      "5",
      "3x + 6 + 2x + 8 = 5x + 14. The coefficient of x is 5."
    ),
  ],
  independentPractice: [
    answer(
      "y7-alg-exp-i1",
      "Expand $6(x + 4)$. What is the constant term?",
      "6(x+4)",
      "24",
      "6 × 4 = 24. The expanded form is 6x + 24. Constant term is 24."
    ),
    answer(
      "y7-alg-exp-i2",
      "Expand $-5(x - 3)$. What is the constant term?",
      "-5(x-3)",
      "15",
      "-5 × (-3) = +15 because negative × negative = positive. Expanded: -5x + 15. Constant is 15."
    ),
    answer(
      "y7-alg-exp-i3",
      "Expand $3(4x - 2)$. What is the coefficient of $x$?",
      "3(4x-2)",
      "12",
      "3 × 4x = 12x. Expanded: 12x - 6. Coefficient of x is 12."
    ),
    answer(
      "y7-alg-exp-i4",
      "Expand and simplify $5(x + 1) + 3(x - 2)$. What is the constant term?",
      "5(x+1)+3(x-2)",
      "-1",
      "5x + 5 + 3x - 6 = 8x - 1. The constant term is 5 - 6 = -1.",
      ["−1"]
    ),
    choice(
      "y7-alg-exp-i5",
      "Expand $-4(x - 2)$. Which answer is correct?",
      "C",
      ["$-4x - 8$", "$-4x - 2$", "$-4x + 8$", "$4x - 8$"],
      "-4 × x = -4x and -4 × (-2) = +8. Result: -4x + 8."
    ),
  ],
  commonMistakes: [
    { mistake: "Only multiplying the first term: 3(x + 4) = 3x + 4.", fix: "The factor outside the bracket multiplies every term inside. 3(x + 4) = 3x + 12." },
    { mistake: "Getting the sign wrong with negatives: -2(x - 5) = -2x - 10.", fix: "Negative × negative = positive. -2 × (-5) = +10. So -2(x - 5) = -2x + 10." },
    { mistake: "Expanding correctly but then not collecting like terms.", fix: "After expanding all brackets, look for like terms and combine them." },
    { mistake: "Adding the coefficient to the constant instead of multiplying: 3(x + 5) = 3x + 8.", fix: "The coefficient multiplies every term inside: 3 × 5 = 15, not 3 + 5 = 8." },
  ],
  masteryQuiz: [
    answer(
      "y7-alg-exp-m1",
      "Expand $7(2x + 3)$. What is the coefficient of $x$?",
      "7(2x+3)",
      "14",
      "7 × 2x = 14x. Expanded: 14x + 21. Coefficient of x is 14."
    ),
    choice(
      "y7-alg-exp-m2",
      "Expand $-3(4x - 2)$. Which answer is correct?",
      "B",
      ["$-12x - 6$", "$-12x + 6$", "$12x - 6$", "$-12x + 2$"],
      "-3 × 4x = -12x and -3 × (-2) = +6. Result: -12x + 6."
    ),
    answer(
      "y7-alg-exp-m3",
      "Expand $2(3x - 5)$ and write the constant term.",
      "2(3x-5)",
      "-10",
      "2 × (-5) = -10. Expanded: 6x - 10. Constant term is -10.",
      ["−10"]
    ),
    answer(
      "y7-alg-exp-m4",
      "Expand and simplify $4(x + 3) + 3(2x - 1)$. Write the coefficient of $x$.",
      "4(x+3)+3(2x-1)",
      "10",
      "4x + 12 + 6x - 3 = 10x + 9. Coefficient of x is 4 + 6 = 10."
    ),
    answer(
      "y7-alg-exp-m5",
      "Expand and simplify $5(2x + 4) - 2(3x + 1)$. Write the constant term.",
      "5(2x+4)-2(3x+1)",
      "18",
      "10x + 20 - 6x - 2 = 4x + 18. Constants: 20 - 2 = 18."
    ),
    answer(
      "y7-alg-exp-m6",
      "Expand $-6(x - 4)$ and write the constant term.",
      "-6(x-4)",
      "24",
      "-6 × (-4) = +24. Expanded: -6x + 24. Constant term is 24."
    ),
    choice(
      "y7-alg-exp-m7",
      "A student expands $4(x + 3)$ and gets $4x + 3$. What is wrong?",
      "D",
      [
        "They multiplied both terms by 3 instead of 4.",
        "They forgot to include the x term.",
        "They used subtraction instead of addition.",
        "They only multiplied the first term inside the bracket, not the constant.",
      ],
      "The factor 4 must multiply every term inside: 4 × x = 4x and 4 × 3 = 12. Correct answer is 4x + 12."
    ),
    answer(
      "y7-alg-exp-m8",
      "Expand $3(2x + 5) + 5(x + 1)$. Write the coefficient of $x$.",
      "3(2x+5)+5(x+1)",
      "11",
      "6x + 15 + 5x + 5 = 11x + 20. Coefficient of x is 6 + 5 = 11."
    ),
    answer(
      "y7-alg-exp-m9",
      "A rectangle has width $(x + 3)$ cm and length 4 cm. Write a simplified expression for its area.",
      "A = 4(x+3)",
      "4x+12",
      "Area = 4 × (x + 3). Expanding: 4x + 12.",
      ["4x + 12"]
    ),
    answer(
      "y7-alg-exp-m10",
      "Expand and simplify $6(x - 2) - 3(x - 4)$. Write the constant term.",
      "6(x-2)-3(x-4)",
      "0",
      "6x - 12 - 3x + 12 = 3x + 0. Constants: -12 + 12 = 0. Constant term is 0."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Factorising common factors
// ─────────────────────────────────────────────────────────────────────────────

const factorisingCommonFactors: LessonContent = {
  description: "Find the highest common factor (HCF) of two or more terms and factorise expressions by taking the HCF outside a bracket.",
  learningIntention: "Factorise algebraic expressions by finding and extracting the highest common factor.",
  successCriteria: [
    "Find the HCF of two or more numerical coefficients.",
    "Find the HCF of two or more algebraic terms.",
    "Factorise an expression by writing the HCF outside the bracket.",
    "Check a factorisation by expanding back to the original expression.",
  ],
  teaching: {
    paragraphs: [
      "Factorising is the reverse of expanding. When we expand 3(x + 4) we get 3x + 12. Factorising means taking 3x + 12 and writing it back as 3(x + 4). The number or expression we place outside the bracket is called the highest common factor (HCF).",
      "To find the HCF, first look at the numerical coefficients and find the largest number that divides all of them. Then look for any pronumeral that appears in all terms. For 6x + 10, the coefficients 6 and 10 share a common factor of 2, and there is no common pronumeral, so the HCF is 2.",
      "Once you have found the HCF, divide every term in the expression by it to find what goes inside the bracket. For 6x + 10, dividing each term by 2 gives 3x + 5 inside the bracket, so 6x + 10 = 2(3x + 5).",
      "Always check your answer by expanding. If 2(3x + 5) = 6x + 10 (which it does), the factorisation is correct. This check takes only a few seconds and will catch any arithmetic errors.",
    ],
    latexBlocks: [
      "\\text{HCF of } 6x \\text{ and } 10 = 2 \\quad \\Rightarrow \\quad 6x + 10 = 2(3x + 5)",
      "\\text{HCF of } 4x \\text{ and } 8x^2 = 4x \\quad \\Rightarrow \\quad 4x + 8x^2 = 4x(1 + 2x)",
      "\\text{Check: expand and verify} \\quad 2(3x+5) = 6x+10 \\checkmark",
    ],
  },
  workedExamples: [
    {
      title: "Factorise a simple two-term expression",
      questionLatex: "\\text{Factorise }\\; 12x + 8.",
      steps: [
        { explanation: "Find the HCF of 12 and 8. The factors of 12 are 1, 2, 3, 4, 6, 12 and factors of 8 are 1, 2, 4, 8. The highest common factor is 4.", latex: "\\text{HCF}(12, 8) = 4" },
        { explanation: "Divide each term by the HCF to find what goes inside the bracket.", latex: "12x \\div 4 = 3x, \\quad 8 \\div 4 = 2" },
        { explanation: "Write the factorised form with the HCF outside.", latex: "12x + 8 = 4(3x + 2)" },
        { explanation: "Check by expanding: 4 × 3x + 4 × 2 = 12x + 8. Correct.", latex: "4(3x+2) = 12x + 8 \\checkmark" },
      ],
      finalAnswerLatex: "4(3x + 2)",
    },
    {
      title: "Factorise when the HCF includes a pronumeral",
      questionLatex: "\\text{Factorise }\\; 6x + 9x^2.",
      steps: [
        { explanation: "Find the HCF of the coefficients 6 and 9.", latex: "\\text{HCF}(6, 9) = 3" },
        { explanation: "Find the common pronumeral factor. Both terms contain x, so the HCF includes x.", latex: "\\text{HCF} = 3x" },
        { explanation: "Divide each term by 3x.", latex: "6x \\div 3x = 2, \\quad 9x^2 \\div 3x = 3x" },
        { explanation: "Write the factorised form.", latex: "6x + 9x^2 = 3x(2 + 3x)" },
      ],
      finalAnswerLatex: "3x(2 + 3x)",
    },
    {
      title: "Factorise a three-term expression",
      questionLatex: "\\text{Factorise }\\; 10a + 15b + 5.",
      steps: [
        { explanation: "Find the HCF of 10, 15, and 5. The HCF is 5 (the largest number dividing all three).", latex: "\\text{HCF}(10, 15, 5) = 5" },
        { explanation: "Divide each term by 5.", latex: "10a \\div 5 = 2a, \\quad 15b \\div 5 = 3b, \\quad 5 \\div 5 = 1" },
        { explanation: "Write the factorised form.", latex: "10a + 15b + 5 = 5(2a + 3b + 1)" },
      ],
      finalAnswerLatex: "5(2a + 3b + 1)",
    },
  ],
  guidedPractice: [
    choice(
      "y7-alg-fac-g1",
      "What is the HCF of 12 and 18?",
      "C",
      ["3", "4", "6", "9"],
      "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The highest factor in both lists is 6."
    ),
    answer(
      "y7-alg-fac-g2",
      "Factorise $8x + 12$. Write the number that goes outside the bracket.",
      "8x + 12",
      "4",
      "HCF of 8 and 12 is 4. Factorised: 4(2x + 3). The factor outside is 4."
    ),
    answer(
      "y7-alg-fac-g3",
      "Factorise $10x + 5$. What is the term inside the bracket for the $x$ part?",
      "10x + 5",
      "2x",
      "HCF of 10 and 5 is 5. 10x ÷ 5 = 2x and 5 ÷ 5 = 1. Factorised: 5(2x + 1). The x part inside is 2x."
    ),
    answer(
      "y7-alg-fac-g4",
      "Factorise $6a + 9b + 3$. What number goes outside the bracket?",
      "6a + 9b + 3",
      "3",
      "HCF of 6, 9, and 3 is 3. Factorised: 3(2a + 3b + 1). The factor outside is 3."
    ),
  ],
  independentPractice: [
    answer(
      "y7-alg-fac-i1",
      "Factorise $15x + 10$. What number goes outside the bracket?",
      "15x + 10",
      "5",
      "HCF of 15 and 10 is 5. 15x ÷ 5 = 3x and 10 ÷ 5 = 2. Factorised: 5(3x + 2)."
    ),
    answer(
      "y7-alg-fac-i2",
      "Factorise $4x + 8x^2$. What goes outside the bracket?",
      "4x + 8x^2",
      "4x",
      "HCF of coefficients: HCF(4, 8) = 4. Both terms have x, so HCF = 4x. 4x ÷ 4x = 1 and 8x² ÷ 4x = 2x. Factorised: 4x(1 + 2x)."
    ),
    answer(
      "y7-alg-fac-i3",
      "Factorise $14m + 21n$. What number goes outside the bracket?",
      "14m + 21n",
      "7",
      "HCF of 14 and 21 is 7. 14m ÷ 7 = 2m and 21n ÷ 7 = 3n. Factorised: 7(2m + 3n)."
    ),
    answer(
      "y7-alg-fac-i4",
      "Factorise $12x - 8$. What is the number outside the bracket?",
      "12x - 8",
      "4",
      "HCF of 12 and 8 is 4. 12x ÷ 4 = 3x and 8 ÷ 4 = 2. Factorised: 4(3x - 2). Check: 4 × 3x - 4 × 2 = 12x - 8."
    ),
    choice(
      "y7-alg-fac-i5",
      "Which is the correct factorisation of $18p + 12q$?",
      "B",
      ["$3(6p + 4q)$", "$6(3p + 2q)$", "$9(2p + q)$", "$2(9p + 6q)$"],
      "HCF of 18 and 12 is 6. 18p ÷ 6 = 3p and 12q ÷ 6 = 2q. Correct factorisation: 6(3p + 2q)."
    ),
  ],
  commonMistakes: [
    { mistake: "Using a common factor that is not the highest: 6x + 9 = 3(2x + 3) is valid but leaves 3 as the factor instead of the HCF.", fix: "Find the highest common factor. For 6x + 9, the HCF is 3, so 3(2x + 3) is actually correct here. Always check you have the largest possible factor." },
    { mistake: "Forgetting to include a 1 when a term is completely divided: 5x + 5 = 5(x) instead of 5(x + 1).", fix: "When a term divides exactly to leave nothing, write 1 inside the bracket. 5 ÷ 5 = 1, so 5x + 5 = 5(x + 1)." },
    { mistake: "Not checking the answer by expanding.", fix: "Always expand your factorisation to confirm it gives back the original expression." },
    { mistake: "Incorrectly finding the HCF of pronumerals: 4x + 8x² = 4(x + 2x²) instead of 4x(1 + 2x).", fix: "If x appears in every term, it is part of the HCF. Take out the highest power of x that divides all terms." },
  ],
  masteryQuiz: [
    answer(
      "y7-alg-fac-m1",
      "Factorise $20x + 16$. What number goes outside the bracket?",
      "20x + 16",
      "4",
      "HCF of 20 and 16 is 4. 20x ÷ 4 = 5x and 16 ÷ 4 = 4. Factorised: 4(5x + 4)."
    ),
    choice(
      "y7-alg-fac-m2",
      "Which is the correct fully factorised form of $12x + 18$?",
      "C",
      ["$2(6x + 9)$", "$3(4x + 6)$", "$6(2x + 3)$", "$9(x + 2)$"],
      "HCF of 12 and 18 is 6. 12x ÷ 6 = 2x and 18 ÷ 6 = 3. Fully factorised: 6(2x + 3)."
    ),
    answer(
      "y7-alg-fac-m3",
      "Factorise $9a + 6b - 3$. What number goes outside the bracket?",
      "9a + 6b - 3",
      "3",
      "HCF of 9, 6, and 3 is 3. 9a ÷ 3 = 3a, 6b ÷ 3 = 2b, 3 ÷ 3 = 1. Factorised: 3(3a + 2b - 1)."
    ),
    answer(
      "y7-alg-fac-m4",
      "Factorise $5x + 15x^2$. What goes outside the bracket?",
      "5x + 15x^2",
      "5x",
      "HCF of coefficients 5 and 15 is 5. Both terms have x. HCF = 5x. 5x ÷ 5x = 1 and 15x² ÷ 5x = 3x. Factorised: 5x(1 + 3x)."
    ),
    answer(
      "y7-alg-fac-m5",
      "Factorise $24m - 16n$. What is the HCF?",
      "24m - 16n",
      "8",
      "HCF of 24 and 16 is 8. 24m ÷ 8 = 3m and 16n ÷ 8 = 2n. Factorised: 8(3m - 2n)."
    ),
    answer(
      "y7-alg-fac-m6",
      "Factorise $30x + 18$. What number goes outside the bracket?",
      "30x + 18",
      "6",
      "HCF of 30 and 18 is 6. 30x ÷ 6 = 5x and 18 ÷ 6 = 3. Factorised: 6(5x + 3)."
    ),
    choice(
      "y7-alg-fac-m7",
      "A student factorises $10x + 15$ as $5(2x + 15)$. What is wrong?",
      "B",
      [
        "They used the wrong HCF — it should be 10.",
        "They forgot to divide the second term by the HCF.",
        "They used the wrong operation inside the bracket.",
        "The HCF should be 15, not 5.",
      ],
      "The HCF is 5, which is correct. But they forgot to divide 15 by 5: 15 ÷ 5 = 3. Correct answer: 5(2x + 3)."
    ),
    answer(
      "y7-alg-fac-m8",
      "Factorise $8a + 12b + 4c$. What number goes outside the bracket?",
      "8a + 12b + 4c",
      "4",
      "HCF of 8, 12, and 4 is 4. 8a ÷ 4 = 2a, 12b ÷ 4 = 3b, 4c ÷ 4 = c. Factorised: 4(2a + 3b + c)."
    ),
    answer(
      "y7-alg-fac-m9",
      "Factorise $6x^2 + 9x$. Write the factor outside the bracket.",
      "6x^2 + 9x",
      "3x",
      "HCF of 6 and 9 is 3. Both terms contain x. HCF = 3x. 6x² ÷ 3x = 2x and 9x ÷ 3x = 3. Factorised: 3x(2x + 3)."
    ),
    answer(
      "y7-alg-fac-m10",
      "Factorise $7x - 49$ and write the number that goes outside the bracket.",
      "7x - 49",
      "7",
      "HCF of 7 and 49 is 7. 7x ÷ 7 = x and 49 ÷ 7 = 7. Factorised: 7(x - 7). Check: 7x - 49."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 5 — Substitution
// ─────────────────────────────────────────────────────────────────────────────

const substitution: LessonContent = {
  description: "Evaluate algebraic expressions and formulas by substituting given values for the pronumerals.",
  learningIntention: "Evaluate expressions and formulas by substituting numerical values for pronumerals.",
  successCriteria: [
    "Substitute a given value into a simple algebraic expression and evaluate it.",
    "Substitute values into a formula (area, perimeter) and calculate the result.",
    "Follow the correct order of operations when evaluating after substitution.",
    "Find an unknown value when the result of an expression is given.",
  ],
  teaching: {
    paragraphs: [
      "Substitution means replacing a pronumeral with a specific number and then calculating the result. If the expression is 3x + 1 and we are told x = 4, we swap the x for 4 to get 3 × 4 + 1 = 13. The expression now has only numbers and can be evaluated.",
      "Order of operations still applies after substitution. Multiplication and division are done before addition and subtraction. If you substitute x = 5 into 2x² + 3, calculate 2 × 5² first: 2 × 25 = 50, then add 3 to get 53.",
      "Formulas like area and perimeter are algebraic rules we evaluate by substituting. The area of a rectangle is A = lw. If l = 8 and w = 5, substitute to get A = 8 × 5 = 40. The formula gives a general rule; substitution gives a specific answer.",
      "Sometimes we know the result and need to find the unknown. If 3n + 2 = 17, we can check which value of n makes this true by substituting trial values, or we can use inverse operations to work backwards.",
    ],
    latexBlocks: [
      "\\text{If } x = 4: \\quad 3x + 1 = 3 \\times 4 + 1 = 13",
      "\\text{Area of rectangle: } A = lw",
      "\\text{If } l = 8,\\; w = 5: \\quad A = 8 \\times 5 = 40",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate an expression by substitution",
      questionLatex: "\\text{Find the value of } 4x - 3 \\text{ when } x = 5.",
      steps: [
        { explanation: "Replace x with 5 in the expression.", latex: "4 \\times 5 - 3" },
        { explanation: "Multiply first (order of operations).", latex: "4 \\times 5 = 20" },
        { explanation: "Then subtract.", latex: "20 - 3 = 17" },
      ],
      finalAnswerLatex: "4x - 3 = 17 \\text{ when } x = 5",
    },
    {
      title: "Substitute into a formula",
      questionLatex: "\\text{The perimeter of a rectangle is } P = 2l + 2w. \\text{ Find } P \\text{ when } l = 9 \\text{ and } w = 4.",
      steps: [
        { explanation: "Write the formula and substitute the given values.", latex: "P = 2 \\times 9 + 2 \\times 4" },
        { explanation: "Carry out the multiplications.", latex: "P = 18 + 8" },
        { explanation: "Add the results.", latex: "P = 26" },
      ],
      finalAnswerLatex: "P = 26 \\text{ cm}",
    },
    {
      title: "Find an unknown value",
      questionLatex: "\\text{If } 2n + 5 = 13, \\text{ find } n.",
      steps: [
        { explanation: "The expression 2n + 5 equals 13. Subtract 5 from both sides to isolate the term with n.", latex: "2n = 13 - 5 = 8" },
        { explanation: "Divide both sides by 2 to find n.", latex: "n = 8 \\div 2 = 4" },
        { explanation: "Check by substituting n = 4: 2 × 4 + 5 = 8 + 5 = 13. Correct.", latex: "2(4) + 5 = 13 \\checkmark" },
      ],
      finalAnswerLatex: "n = 4",
    },
  ],
  guidedPractice: [
    choice(
      "y7-alg-sub-g1",
      "What is the value of $3x + 2$ when $x = 4$?",
      "B",
      ["12", "14", "9", "18"],
      "Substitute x = 4: 3 × 4 + 2 = 12 + 2 = 14."
    ),
    answer(
      "y7-alg-sub-g2",
      "Find the value of $5m - 3$ when $m = 6$.",
      "5m - 3 \\text{ when } m = 6",
      "27",
      "5 × 6 - 3 = 30 - 3 = 27."
    ),
    answer(
      "y7-alg-sub-g3",
      "The area of a triangle is $A = \\dfrac{bh}{2}$. Find $A$ when $b = 10$ and $h = 6$.",
      "A = \\dfrac{bh}{2}, \\quad b = 10, \\; h = 6",
      "30",
      "A = (10 × 6) ÷ 2 = 60 ÷ 2 = 30."
    ),
    answer(
      "y7-alg-sub-g4",
      "Find the value of $n$ if $4n + 3 = 23$.",
      "4n + 3 = 23",
      "5",
      "4n = 23 - 3 = 20. n = 20 ÷ 4 = 5. Check: 4 × 5 + 3 = 23."
    ),
  ],
  independentPractice: [
    answer(
      "y7-alg-sub-i1",
      "Find the value of $2x^2 + 1$ when $x = 3$.",
      "2x^2 + 1 \\text{ when } x = 3",
      "19",
      "Substitute x = 3: 2 × 3² + 1 = 2 × 9 + 1 = 18 + 1 = 19."
    ),
    answer(
      "y7-alg-sub-i2",
      "The perimeter of a square is $P = 4s$. Find $P$ when $s = 7$.",
      "P = 4s, \\quad s = 7",
      "28",
      "P = 4 × 7 = 28."
    ),
    answer(
      "y7-alg-sub-i3",
      "Find the value of $3a + 2b$ when $a = 4$ and $b = 5$.",
      "3a + 2b \\text{ when } a = 4, \\; b = 5",
      "22",
      "3 × 4 + 2 × 5 = 12 + 10 = 22."
    ),
    answer(
      "y7-alg-sub-i4",
      "Find the value of $n$ if $3n - 7 = 8$.",
      "3n - 7 = 8",
      "5",
      "3n = 8 + 7 = 15. n = 15 ÷ 3 = 5. Check: 3 × 5 - 7 = 15 - 7 = 8."
    ),
    choice(
      "y7-alg-sub-i5",
      "Which value of $x$ makes $5x - 4 = 11$ true?",
      "C",
      ["2", "2.5", "3", "4"],
      "5 × 3 - 4 = 15 - 4 = 11. So x = 3 is correct. Check the others: 5×2-4=6, 5×4-4=16 — neither equals 11."
    ),
  ],
  commonMistakes: [
    { mistake: "Ignoring order of operations: evaluating 3x + 1 with x = 4 as 3 × 5 = 15 instead of 3 × 4 + 1 = 13.", fix: "Replace x with the given number first, then follow BODMAS: multiplication before addition." },
    { mistake: "When substituting a negative value, writing 3 × -2 = 3 - 2 = 1 instead of -6.", fix: "Write parentheses around negative values: 3 × (-2) = -6. Multiplication applies to the full signed number." },
    { mistake: "Substituting into A = lw by adding instead of multiplying: A = 8 + 5 = 13.", fix: "In a formula, two pronumerals written next to each other (lw) mean multiplication. A = lw = l × w." },
    { mistake: "After finding that 3n = 15, solving by subtracting 3 instead of dividing: n = 12.", fix: "To undo multiplication by 3, divide both sides by 3: n = 15 ÷ 3 = 5." },
  ],
  masteryQuiz: [
    answer(
      "y7-alg-sub-m1",
      "Find the value of $6x - 4$ when $x = 3$.",
      "6x - 4 \\text{ when } x = 3",
      "14",
      "6 × 3 - 4 = 18 - 4 = 14."
    ),
    choice(
      "y7-alg-sub-m2",
      "What is the value of $2x^2 - 3x$ when $x = 4$?",
      "C",
      ["4", "16", "20", "44"],
      "Substitute x = 4: 2 × 16 - 3 × 4 = 32 - 12 = 20."
    ),
    answer(
      "y7-alg-sub-m3",
      "The area of a rectangle is $A = lw$. Find $A$ when $l = 12$ and $w = 7$.",
      "A = lw, \\quad l = 12, \\; w = 7",
      "84",
      "A = 12 × 7 = 84."
    ),
    answer(
      "y7-alg-sub-m4",
      "Find the value of $5p + 3q$ when $p = 2$ and $q = 4$.",
      "5p + 3q \\text{ when } p = 2, \\; q = 4",
      "22",
      "5 × 2 + 3 × 4 = 10 + 12 = 22."
    ),
    answer(
      "y7-alg-sub-m5",
      "Find $n$ if $5n + 8 = 38$.",
      "5n + 8 = 38",
      "6",
      "5n = 38 - 8 = 30. n = 30 ÷ 5 = 6. Check: 5 × 6 + 8 = 38."
    ),
    answer(
      "y7-alg-sub-m6",
      "Find the value of $3x^2 + 2$ when $x = 4$.",
      "3x^2 + 2 \\text{ when } x = 4",
      "50",
      "3 × 4² + 2 = 3 × 16 + 2 = 48 + 2 = 50."
    ),
    choice(
      "y7-alg-sub-m7",
      "A student evaluates $4x^2$ when $x = 3$ and gets 144. What did they do wrong?",
      "A",
      [
        "They calculated $(4x)^2 = 12^2 = 144$ instead of $4 \\times x^2 = 4 \\times 9 = 36$.",
        "They substituted x = 4 instead of x = 3.",
        "They added 4 and 3 instead of multiplying.",
        "They evaluated 4 × 3 + 2 instead of 4 × 3².",
      ],
      "4x² means 4 × x². With x = 3: 4 × 3² = 4 × 9 = 36. The error was squaring 4x (treating it as (4x)²) = 144 instead."
    ),
    answer(
      "y7-alg-sub-m8",
      "Find $n$ if $6n - 10 = 20$.",
      "6n - 10 = 20",
      "5",
      "6n = 20 + 10 = 30. n = 30 ÷ 6 = 5. Check: 6 × 5 - 10 = 30 - 10 = 20."
    ),
    answer(
      "y7-alg-sub-m9",
      "The formula for simple interest (in dollars) is $I = PRT \\div 100$ where $P$ is the principal, $R$ is the rate, and $T$ is the time in years. Find $I$ when $P = 400$, $R = 5$, and $T = 2$.",
      "I = \\dfrac{PRT}{100}, \\quad P = 400,\\; R = 5,\\; T = 2",
      "40",
      "I = (400 × 5 × 2) ÷ 100 = 4000 ÷ 100 = 40."
    ),
    answer(
      "y7-alg-sub-m10",
      "Find the value of $2a^2 - 3b$ when $a = 5$ and $b = 6$.",
      "2a^2 - 3b \\text{ when } a = 5, \\; b = 6",
      "32",
      "2 × 5² - 3 × 6 = 2 × 25 - 18 = 50 - 18 = 32."
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson map and export
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "algebraic-notation": algebraicNotation,
  "collecting-like-terms": collectingLikeTerms,
  "expanding-brackets": expandingBrackets,
  "factorising-common-factors": factorisingCommonFactors,
  "substitution": substitution,
};

export function year7AlgebraicTechniquesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "algebraic-techniques") {
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
