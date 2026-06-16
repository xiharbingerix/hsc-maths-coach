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

// ── Lesson 1: Negative Indices ───────────────────────────────────────────────

const negativeIndices: LessonContent = {
  description:
    "Apply the negative index law to evaluate expressions with negative integer exponents, convert between negative index and fraction forms, and simplify using index laws with negative exponents.",
  learningIntention:
    "Use the negative index law $a^{-n} = \\frac{1}{a^n}$ to evaluate and simplify expressions with negative exponents.",
  successCriteria: [
    "State the negative index law and explain why $a^{-n} = \\frac{1}{a^n}$.",
    "Evaluate expressions such as $2^{-3}$ and $5^{-2}$ without a calculator.",
    "Convert between negative index form and fraction form.",
    "Simplify expressions involving negative exponents using index laws.",
  ],
  teaching: {
    paragraphs: [
      "You already know that $2^3 = 8$ and $2^2 = 4$ and $2^1 = 2$. Notice that each step divides by 2. Continuing the pattern: $2^0 = 1$, then $2^{-1} = \\frac{1}{2}$, then $2^{-2} = \\frac{1}{4}$. Negative exponents extend the pattern into reciprocals.",
      "The negative index law states: $a^{-n} = \\frac{1}{a^n}$ for any non-zero base $a$. So $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$. The negative sign means 'take the reciprocal', not 'make the number negative'. The result $\\frac{1}{8}$ is still positive.",
      "You can also move a factor with a negative index between numerator and denominator: $\\frac{a^{-n}}{1} = \\frac{1}{a^n}$ and $\\frac{1}{a^{-n}} = a^n$. This is very useful when simplifying expressions. For example, $\\frac{3^{-2}}{1} = \\frac{1}{9}$.",
      "When combining index laws with negative exponents, the rules work exactly the same way. For example, $a^3 \\times a^{-5} = a^{3+(-5)} = a^{-2} = \\frac{1}{a^2}$. A common mistake is thinking $3^{-2} = -9$ — remember that the negative is in the exponent, not the result.",
      "To convert $\\frac{1}{5^3}$ back to index form, write it as $5^{-3}$. Being fluent in both directions — index form to fraction, and fraction to index form — is essential for scientific notation and algebraic simplification.",
    ],
    latexBlocks: [
      "a^{-n} = \\frac{1}{a^n} \\quad (a \\neq 0)",
      "\\frac{1}{a^{-n}} = a^n",
      "a^m \\times a^{-n} = a^{m-n}",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a negative index",
      questionLatex: "\\text{Evaluate } 2^{-4}.",
      steps: [
        { explanation: "Apply the negative index law: take the reciprocal of the positive power.", latex: "2^{-4} = \\frac{1}{2^4}" },
        { explanation: "Evaluate the denominator.", latex: "2^4 = 16" },
        { explanation: "Write the final answer.", latex: "2^{-4} = \\frac{1}{16}" },
      ],
      finalAnswerLatex: "\\frac{1}{16}",
    } as WorkedExample,
    {
      title: "Convert fraction to negative index form",
      questionLatex: "\\text{Write } \\frac{1}{3^5} \\text{ using a negative index.}",
      steps: [
        { explanation: "Recognise that a fraction $\\frac{1}{a^n}$ equals $a^{-n}$.", latex: "\\frac{1}{3^5} = 3^{-5}" },
      ],
      finalAnswerLatex: "3^{-5}",
    } as WorkedExample,
    {
      title: "Simplify using index laws with negative exponents",
      questionLatex: "\\text{Simplify } a^5 \\times a^{-3}.",
      steps: [
        { explanation: "Add the indices using the multiplication law.", latex: "a^5 \\times a^{-3} = a^{5 + (-3)}" },
        { explanation: "Simplify the exponent.", latex: "a^{5-3} = a^2" },
      ],
      finalAnswerLatex: "a^2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-ile-neg-g1",
      "Which of the following correctly evaluates $3^{-2}$?",
      "C",
      [
        "$-9$",
        "$-6$",
        "$\\frac{1}{9}$",
        "$\\frac{1}{6}$",
      ],
      "$3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$. The negative exponent gives a reciprocal, not a negative value.",
      "Apply the negative index law: $a^{-n} = \\frac{1}{a^n}$.",
    ),
    answer(
      "y8-ile-neg-g2",
      "Evaluate $5^{-2}$.",
      "5^{-2} = \\frac{1}{5^2} = \\;?",
      "1/25",
      "$5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}$.",
      "The negative index means take the reciprocal of $5^2$.",
    ),
    answer(
      "y8-ile-neg-g3",
      "Write $\\frac{1}{7^3}$ using a negative index.",
      "\\frac{1}{7^3} = \\;?",
      "7^{-3}",
      "$\\frac{1}{7^3} = 7^{-3}$. The negative index form of $\\frac{1}{a^n}$ is $a^{-n}$.",
      "Recognise that $\\frac{1}{a^n} = a^{-n}$.",
    ),
    answer(
      "y8-ile-neg-g4",
      "Simplify $x^6 \\times x^{-4}$.",
      "x^6 \\times x^{-4} = \\;?",
      "x^2",
      "$x^6 \\times x^{-4} = x^{6+(-4)} = x^2$. Add the indices.",
      "Use the multiplication index law: add the exponents.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-ile-neg-i1",
      "Evaluate $4^{-2}$.",
      "4^{-2} = \\;?",
      "1/16",
      "$4^{-2} = \\frac{1}{4^2} = \\frac{1}{16}$.",
      "Apply the negative index law.",
    ),
    answer(
      "y8-ile-neg-i2",
      "Evaluate $10^{-3}$.",
      "10^{-3} = \\;?",
      "1/1000",
      "$10^{-3} = \\frac{1}{10^3} = \\frac{1}{1000}$.",
      "Negative indices on base 10 give unit fractions: thousandths, millionths, etc.",
      ["0.001"],
    ),
    answer(
      "y8-ile-neg-i3",
      "Simplify $m^2 \\times m^{-7}$.",
      "m^2 \\times m^{-7} = \\;?",
      "m^{-5}",
      "$m^2 \\times m^{-7} = m^{2+(-7)} = m^{-5} = \\frac{1}{m^5}$.",
      "Add the indices: $2 + (-7)$.",
      ["1/m^5"],
    ),
    answer(
      "y8-ile-neg-i4",
      "Write $\\frac{1}{2^6}$ using a negative index.",
      "\\frac{1}{2^6} = \\;?",
      "2^{-6}",
      "$\\frac{1}{2^6} = 2^{-6}$.",
      "Use the rule $\\frac{1}{a^n} = a^{-n}$.",
    ),
    choice(
      "y8-ile-neg-i5",
      "Which expression equals $\\frac{1}{a^3}$?",
      "B",
      [
        "$a^3$",
        "$a^{-3}$",
        "$-a^3$",
        "$3a^{-1}$",
      ],
      "$\\frac{1}{a^3} = a^{-3}$ by the negative index law.",
      "Think about which index form equals a reciprocal.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing $3^{-2} = -9$ — treating the negative exponent as a negative sign on the result.",
      fix: "$3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$. The negative is in the exponent only; the value of $3^{-2}$ is positive.",
    },
    {
      mistake: "Writing $2^{-3} = \\frac{1}{-8}$ — applying the negative sign to the base evaluation.",
      fix: "$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$. Evaluate the positive power first, then take the reciprocal.",
    },
    {
      mistake: "Adding indices incorrectly with mixed signs: $a^3 \\times a^{-5} = a^{15}$ by multiplying indices.",
      fix: "Use the multiplication law — add the indices: $a^3 \\times a^{-5} = a^{3+(-5)} = a^{-2}$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-ile-neg-m1",
      "Evaluate $2^{-5}$.",
      "2^{-5} = \\;?",
      "1/32",
      "$2^{-5} = \\frac{1}{2^5} = \\frac{1}{32}$.",
      "Apply the negative index law.",
    ),
    answer(
      "y8-ile-neg-m2",
      "Evaluate $10^{-4}$.",
      "10^{-4} = \\;?",
      "1/10000",
      "$10^{-4} = \\frac{1}{10^4} = \\frac{1}{10\\,000}$.",
      "Powers of 10 with negative indices give unit fractions.",
      ["0.0001"],
    ),
    choice(
      "y8-ile-neg-m3",
      "Which is equal to $6^{-1}$?",
      "A",
      [
        "$\\frac{1}{6}$",
        "$-6$",
        "$\\frac{1}{-6}$",
        "$6$",
      ],
      "$6^{-1} = \\frac{1}{6^1} = \\frac{1}{6}$.",
      "A negative index of 1 just takes the reciprocal of the base.",
    ),
    answer(
      "y8-ile-neg-m4",
      "Write $\\frac{1}{10^5}$ using a negative index.",
      "\\frac{1}{10^5} = \\;?",
      "10^{-5}",
      "$\\frac{1}{10^5} = 10^{-5}$.",
      "Use the rule $\\frac{1}{a^n} = a^{-n}$.",
    ),
    answer(
      "y8-ile-neg-m5",
      "Simplify $p^4 \\times p^{-6}$.",
      "p^4 \\times p^{-6} = \\;?",
      "p^{-2}",
      "$p^4 \\times p^{-6} = p^{4-6} = p^{-2} = \\frac{1}{p^2}$.",
      "Add the indices: $4 + (-6)$.",
      ["1/p^2"],
    ),
    answer(
      "y8-ile-neg-m6",
      "Evaluate $3^{-3}$.",
      "3^{-3} = \\;?",
      "1/27",
      "$3^{-3} = \\frac{1}{3^3} = \\frac{1}{27}$.",
      "Apply $a^{-n} = \\frac{1}{a^n}$ with $a=3$, $n=3$.",
    ),
    choice(
      "y8-ile-neg-m7",
      "Which statement about $5^{-3}$ is correct?",
      "D",
      [
        "It equals $-125$.",
        "It equals $-\\frac{1}{125}$.",
        "It equals $\\frac{1}{-125}$.",
        "It equals $\\frac{1}{125}$.",
      ],
      "$5^{-3} = \\frac{1}{5^3} = \\frac{1}{125}$. The result is a positive fraction.",
      "Negative exponent means reciprocal, not negative value.",
    ),
    answer(
      "y8-ile-neg-m8",
      "Simplify $\\frac{a^2}{a^5}$ using index laws.",
      "\\frac{a^2}{a^5} = \\;?",
      "a^{-3}",
      "$\\frac{a^2}{a^5} = a^{2-5} = a^{-3} = \\frac{1}{a^3}$.",
      "Use the division index law: subtract the indices.",
      ["1/a^3"],
    ),
    answer(
      "y8-ile-neg-m9",
      "Evaluate $2^{-3} \\times 2^5$.",
      "2^{-3} \\times 2^5 = \\;?",
      "4",
      "$2^{-3} \\times 2^5 = 2^{-3+5} = 2^2 = 4$.",
      "Add the indices: $-3 + 5 = 2$.",
    ),
    answer(
      "y8-ile-neg-m10",
      "Simplify $\\frac{3^2 \\times 3^{-5}}{3^{-4}}$ and write as a whole number or simple fraction.",
      "\\frac{3^2 \\times 3^{-5}}{3^{-4}} = \\;?",
      "3",
      "Numerator: $3^2 \\times 3^{-5} = 3^{-3}$. Then $\\frac{3^{-3}}{3^{-4}} = 3^{-3-(-4)} = 3^1 = 3$.",
      "Simplify the numerator first using the multiplication law, then apply the division law.",
    ),
  ],
};

// ── Lesson 2: Scientific Notation — Large Numbers ────────────────────────────

const scientificNotationLarge: LessonContent = {
  description:
    "Write large numbers in scientific notation $a \\times 10^n$ where $1 \\leq a < 10$ and $n$ is a positive integer, convert from scientific notation back to standard form, and order large numbers expressed in scientific notation.",
  learningIntention:
    "Express large numbers in scientific notation and convert between scientific notation and standard form.",
  successCriteria: [
    "Explain the form $a \\times 10^n$ where $1 \\leq a < 10$.",
    "Convert large numbers such as 6 400 000 into scientific notation.",
    "Convert from scientific notation back to standard form.",
    "Order a set of large numbers given in scientific notation.",
  ],
  teaching: {
    paragraphs: [
      "Scientists regularly work with very large numbers — the distance from Earth to the Sun is about 150 000 000 000 metres. Writing and comparing such numbers in full is error-prone. Scientific notation compresses them into a neat product: a number between 1 and 10 multiplied by a power of 10.",
      "The rule is $a \\times 10^n$ where $1 \\leq a < 10$. The coefficient $a$ must be at least 1 but strictly less than 10 — it always has exactly one non-zero digit before the decimal point. The exponent $n$ tells you how many places the decimal point moved to the left to create $a$. For example, $6\\,400\\,000 = 6.4 \\times 10^6$ because the decimal moves 6 places.",
      "To convert back to standard form, multiply by the power of 10 — which means moving the decimal point $n$ places to the right. So $3.72 \\times 10^5 = 372\\,000$.",
      "A common mistake is writing $15 \\times 10^4$ instead of $1.5 \\times 10^5$. The coefficient must be less than 10 — if it is 10 or more, adjust by increasing the exponent. Always check: is $a$ between 1 and 10 (not including 10)?",
      "To order numbers in scientific notation, compare the exponents first. The larger the exponent, the larger the number. If two numbers have the same exponent, compare the coefficients.",
    ],
    latexBlocks: [
      "a \\times 10^n, \\quad 1 \\leq a < 10, \\quad n \\in \\mathbb{Z}^+",
      "6\\,400\\,000 = 6.4 \\times 10^6",
      "3.72 \\times 10^5 = 372\\,000",
    ],
  },
  workedExamples: [
    {
      title: "Write a large number in scientific notation",
      questionLatex: "\\text{Write } 45\\,300\\,000 \\text{ in scientific notation.}",
      steps: [
        { explanation: "Place the decimal point after the first significant digit.", latex: "4.53\\ldots" },
        { explanation: "Count how many places the decimal moved from the original position.", latex: "45\\,300\\,000 \\to 4.53 \\times 10^7 \\quad (7 \\text{ places})" },
      ],
      finalAnswerLatex: "4.53 \\times 10^7",
    } as WorkedExample,
    {
      title: "Convert scientific notation to standard form",
      questionLatex: "\\text{Write } 2.6 \\times 10^8 \\text{ in standard form.}",
      steps: [
        { explanation: "Move the decimal point 8 places to the right, filling with zeros.", latex: "2.6 \\times 10^8 = 260\\,000\\,000" },
      ],
      finalAnswerLatex: "260\\,000\\,000",
    } as WorkedExample,
    {
      title: "Order large numbers in scientific notation",
      questionLatex: "\\text{Arrange in ascending order: } 3.1 \\times 10^6,\\; 8.2 \\times 10^4,\\; 5.0 \\times 10^6.",
      steps: [
        { explanation: "Compare exponents first. $10^4 < 10^6$, so $8.2 \\times 10^4$ is smallest.", latex: "8.2 \\times 10^4 \\approx 82\\,000" },
        { explanation: "Both remaining numbers have exponent 6; compare coefficients: $3.1 < 5.0$.", latex: "3.1 \\times 10^6 < 5.0 \\times 10^6" },
      ],
      finalAnswerLatex: "8.2 \\times 10^4 < 3.1 \\times 10^6 < 5.0 \\times 10^6",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-ile-snl-g1",
      "Which of the following is correctly written in scientific notation?",
      "C",
      [
        "$15 \\times 10^3$",
        "$0.72 \\times 10^6$",
        "$7.2 \\times 10^5$",
        "$72 \\times 10^4$",
      ],
      "In scientific notation the coefficient must satisfy $1 \\leq a < 10$. Only $7.2 \\times 10^5$ meets this condition.",
      "Check: is the coefficient between 1 (inclusive) and 10 (exclusive)?",
    ),
    answer(
      "y8-ile-snl-g2",
      "Write $3\\,800\\,000$ in scientific notation.",
      "3\\,800\\,000 = \\;?",
      "3.8 × 10^6",
      "The decimal moves 6 places left: $3\\,800\\,000 = 3.8 \\times 10^6$.",
      "Place the decimal after the first digit, then count the places moved.",
      ["3.8 * 10^6", "3.8e6"],
    ),
    answer(
      "y8-ile-snl-g3",
      "Write $5.04 \\times 10^4$ in standard form.",
      "5.04 \\times 10^4 = \\;?",
      "50400",
      "Move the decimal 4 places right: $5.04 \\times 10^4 = 50\\,400$.",
      "Multiply by $10^4$ by moving the decimal point 4 places to the right.",
      ["50,400"],
    ),
    answer(
      "y8-ile-snl-g4",
      "Write $920\\,000\\,000$ in scientific notation.",
      "920\\,000\\,000 = \\;?",
      "9.2 × 10^8",
      "The decimal moves 8 places left: $920\\,000\\,000 = 9.2 \\times 10^8$.",
      "Count the digits after the first significant digit.",
      ["9.2 * 10^8", "9.2e8"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-ile-snl-i1",
      "Write $67\\,000$ in scientific notation.",
      "67\\,000 = \\;?",
      "6.7 × 10^4",
      "$67\\,000 = 6.7 \\times 10^4$. The decimal moves 4 places left.",
      "Place the decimal after the 6.",
      ["6.7 * 10^4"],
    ),
    answer(
      "y8-ile-snl-i2",
      "Write $1.35 \\times 10^7$ in standard form.",
      "1.35 \\times 10^7 = \\;?",
      "13500000",
      "Move the decimal 7 places right: $1.35 \\times 10^7 = 13\\,500\\,000$.",
      "Move the decimal point 7 places to the right.",
      ["13,500,000"],
    ),
    answer(
      "y8-ile-snl-i3",
      "The population of Australia is approximately $26\\,500\\,000$. Write this in scientific notation.",
      "26\\,500\\,000 = \\;?",
      "2.65 × 10^7",
      "$26\\,500\\,000 = 2.65 \\times 10^7$.",
      "Place the decimal after the first significant digit and count the places.",
      ["2.65 * 10^7"],
    ),
    choice(
      "y8-ile-snl-i4",
      "Which number is largest?",
      "D",
      [
        "$9.9 \\times 10^4$",
        "$1.2 \\times 10^5$",
        "$8.0 \\times 10^5$",
        "$2.3 \\times 10^6$",
      ],
      "$2.3 \\times 10^6 = 2\\,300\\,000$ is the largest. Compare exponents first: $10^6 > 10^5 > 10^4$.",
      "Compare the powers of 10 first to determine which number is largest.",
    ),
    answer(
      "y8-ile-snl-i5",
      "The distance from Earth to the nearest star (other than the Sun) is about $40\\,000\\,000\\,000\\,000$ km. Write this in scientific notation.",
      "40\\,000\\,000\\,000\\,000 = \\;?",
      "4.0 × 10^13",
      "$40\\,000\\,000\\,000\\,000 = 4.0 \\times 10^{13}$. Count 13 places from the decimal to the right of the 4.",
      "Count how many places the decimal moves from after the 4 to the end of the number.",
      ["4 × 10^13", "4.0 * 10^13"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing $15 \\times 10^4$ instead of $1.5 \\times 10^5$ — the coefficient is 10 or more.",
      fix: "If the coefficient is 10 or more, divide it by 10 and increase the exponent by 1: $15 \\times 10^4 = 1.5 \\times 10^5$.",
    },
    {
      mistake: "Losing zeros when converting back: writing $3.6 \\times 10^5 = 36\\,000$ (only 4 zeros).",
      fix: "Move the decimal point exactly $n$ places right. $3.6 \\times 10^5$: starting at $3.6$, move 5 places to get $360\\,000$.",
    },
    {
      mistake: "Comparing $9.9 \\times 10^4$ and $1.2 \\times 10^5$ by looking at coefficients only and choosing 9.9.",
      fix: "Always compare exponents first. $10^5 > 10^4$, so $1.2 \\times 10^5 = 120\\,000 > 99\\,000 = 9.9 \\times 10^4$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-ile-snl-m1",
      "Write $580\\,000$ in scientific notation.",
      "580\\,000 = \\;?",
      "5.8 × 10^5",
      "$580\\,000 = 5.8 \\times 10^5$.",
      "The decimal moves 5 places left.",
      ["5.8 * 10^5"],
    ),
    answer(
      "y8-ile-snl-m2",
      "Write $8.1 \\times 10^6$ in standard form.",
      "8.1 \\times 10^6 = \\;?",
      "8100000",
      "Move the decimal 6 places right: $8\\,100\\,000$.",
      "Move the decimal point 6 places to the right.",
      ["8,100,000"],
    ),
    choice(
      "y8-ile-snl-m3",
      "Which represents $3\\,450\\,000$ in correct scientific notation?",
      "B",
      [
        "$34.5 \\times 10^5$",
        "$3.45 \\times 10^6$",
        "$0.345 \\times 10^7$",
        "$3.45 \\times 10^5$",
      ],
      "$3\\,450\\,000 = 3.45 \\times 10^6$. The coefficient must be between 1 and 10.",
      "Check that the coefficient is at least 1 but less than 10.",
    ),
    answer(
      "y8-ile-snl-m4",
      "Write $1.08 \\times 10^9$ in standard form.",
      "1.08 \\times 10^9 = \\;?",
      "1080000000",
      "Move the decimal 9 places right: $1\\,080\\,000\\,000$.",
      "Move the decimal 9 places right, padding with zeros.",
      ["1,080,000,000"],
    ),
    answer(
      "y8-ile-snl-m5",
      "The national debt is approximately $\\$905\\,000\\,000\\,000$. Write this in scientific notation.",
      "\\$905\\,000\\,000\\,000 = \\;?",
      "9.05 × 10^11",
      "$905\\,000\\,000\\,000 = 9.05 \\times 10^{11}$.",
      "Place the decimal after the 9 and count the remaining digits.",
      ["9.05 * 10^11"],
    ),
    answer(
      "y8-ile-snl-m6",
      "Write $7\\,200\\,000\\,000$ in scientific notation.",
      "7\\,200\\,000\\,000 = \\;?",
      "7.2 × 10^9",
      "$7\\,200\\,000\\,000 = 7.2 \\times 10^9$.",
      "Count the digits after the first significant digit.",
      ["7.2 * 10^9"],
    ),
    choice(
      "y8-ile-snl-m7",
      "Arrange in ascending order: $5.0 \\times 10^7$, $9.9 \\times 10^6$, $1.1 \\times 10^8$.",
      "A",
      [
        "$9.9 \\times 10^6 < 5.0 \\times 10^7 < 1.1 \\times 10^8$",
        "$5.0 \\times 10^7 < 9.9 \\times 10^6 < 1.1 \\times 10^8$",
        "$1.1 \\times 10^8 < 5.0 \\times 10^7 < 9.9 \\times 10^6$",
        "$9.9 \\times 10^6 < 1.1 \\times 10^8 < 5.0 \\times 10^7$",
      ],
      "$9.9 \\times 10^6 \\approx 10$ million, $5.0 \\times 10^7 = 50$ million, $1.1 \\times 10^8 = 110$ million. So A is correct.",
      "Compare exponents first, then coefficients.",
    ),
    answer(
      "y8-ile-snl-m8",
      "A light-year is approximately $9\\,461\\,000\\,000\\,000$ km. Write this in scientific notation.",
      "9\\,461\\,000\\,000\\,000 = \\;?",
      "9.461 × 10^12",
      "$9\\,461\\,000\\,000\\,000 = 9.461 \\times 10^{12}$.",
      "Place the decimal after the 9 and count the remaining digits.",
      ["9.461 * 10^12"],
    ),
    answer(
      "y8-ile-snl-m9",
      "Write $3.0 \\times 10^8$ in standard form. (This is approximately the speed of light in m/s.)",
      "3.0 \\times 10^8 = \\;?",
      "300000000",
      "Move the decimal 8 places right: $300\\,000\\,000$.",
      "Move the decimal point 8 places to the right.",
      ["300,000,000"],
    ),
    answer(
      "y8-ile-snl-m10",
      "A company's revenue is $2.4 \\times 10^8$ dollars and its costs are $1.75 \\times 10^8$ dollars. Find the profit in scientific notation.",
      "2.4 \\times 10^8 - 1.75 \\times 10^8 = \\;?",
      "6.5 × 10^7",
      "Same exponent, so subtract coefficients: $(2.4 - 1.75) \\times 10^8 = 0.65 \\times 10^8 = 6.5 \\times 10^7$.",
      "Subtract the coefficients (same power of 10), then check the result is in proper scientific notation.",
      ["6.5 * 10^7"],
    ),
  ],
};

// ── Lesson 3: Scientific Notation — Small Numbers ────────────────────────────

const scientificNotationSmall: LessonContent = {
  description:
    "Write small decimal numbers in scientific notation using negative exponents, convert between scientific notation and standard decimal form, and order numbers including a mix of large and small values in scientific notation.",
  learningIntention:
    "Express small decimals in scientific notation $a \\times 10^n$ where $n$ is a negative integer, and convert fluently in both directions.",
  successCriteria: [
    "Explain why small decimals use negative exponents in scientific notation.",
    "Write numbers such as $0.0034$ in scientific notation as $3.4 \\times 10^{-3}$.",
    "Convert from scientific notation with a negative exponent back to decimal form.",
    "Order a mixed set of numbers given in scientific notation.",
  ],
  teaching: {
    paragraphs: [
      "Just as large numbers use positive exponents, small decimals use negative exponents. Recall that $10^{-1} = 0.1$, $10^{-2} = 0.01$, $10^{-3} = 0.001$, and so on. Each negative step moves the decimal one further to the left.",
      "To write a small number like $0.0034$ in scientific notation, move the decimal point to the right until you have a number between 1 and 10. Here: $0.0034 \\to 3.4$, and the decimal moved 3 places to the right, so the exponent is $-3$: $0.0034 = 3.4 \\times 10^{-3}$.",
      "To convert back, move the decimal point to the left by the size of the negative exponent. $5.6 \\times 10^{-4}$: move 4 places left to get $0.00056$.",
      "When ordering a mix of large and small numbers in scientific notation, a positive exponent always beats a negative one. Between two numbers with the same exponent (both negative), the less negative exponent is larger. For example, $10^{-2} > 10^{-5}$.",
      "A common error is writing $0.0034 = 3.4 \\times 10^3$ with a positive exponent. Because the original number is less than 1, the exponent must be negative. A quick check: multiplying $3.4 \\times 10^3 = 3400$, which is nothing like $0.0034$.",
    ],
    latexBlocks: [
      "0.0034 = 3.4 \\times 10^{-3}",
      "5.6 \\times 10^{-4} = 0.00056",
      "10^{-n} = \\frac{1}{10^n}",
    ],
  },
  workedExamples: [
    {
      title: "Write a small decimal in scientific notation",
      questionLatex: "\\text{Write } 0.000072 \\text{ in scientific notation.}",
      steps: [
        { explanation: "Move the decimal right until the number is between 1 and 10.", latex: "0.000072 \\to 7.2 \\quad (\\text{moved 5 places right})" },
        { explanation: "Since the number is less than 1 and the decimal moved right, the exponent is negative.", latex: "0.000072 = 7.2 \\times 10^{-5}" },
      ],
      finalAnswerLatex: "7.2 \\times 10^{-5}",
    } as WorkedExample,
    {
      title: "Convert to decimal form",
      questionLatex: "\\text{Write } 4.3 \\times 10^{-6} \\text{ as a decimal.}",
      steps: [
        { explanation: "A negative exponent means move the decimal to the left.", latex: "4.3 \\times 10^{-6}: \\text{ move 6 places left}" },
        { explanation: "Insert leading zeros as needed.", latex: "4.3 \\times 10^{-6} = 0.0000043" },
      ],
      finalAnswerLatex: "0.0000043",
    } as WorkedExample,
    {
      title: "Order a mix of values in scientific notation",
      questionLatex: "\\text{Order from smallest to largest: } 3.0 \\times 10^{-3},\\; 2.5 \\times 10^{2},\\; 8.0 \\times 10^{-5}.",
      steps: [
        { explanation: "Convert each to standard form to compare.", latex: "8.0 \\times 10^{-5} = 0.00008, \\quad 3.0 \\times 10^{-3} = 0.003, \\quad 2.5 \\times 10^2 = 250" },
        { explanation: "Arrange from smallest to largest.", latex: "0.00008 < 0.003 < 250" },
      ],
      finalAnswerLatex: "8.0 \\times 10^{-5} < 3.0 \\times 10^{-3} < 2.5 \\times 10^{2}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-ile-sns-g1",
      "Which correctly expresses $0.0056$ in scientific notation?",
      "B",
      [
        "$5.6 \\times 10^{3}$",
        "$5.6 \\times 10^{-3}$",
        "$0.56 \\times 10^{-2}$",
        "$56 \\times 10^{-4}$",
      ],
      "$0.0056$: move the decimal 3 places right to get $5.6$, so the exponent is $-3$. Answer: $5.6 \\times 10^{-3}$.",
      "Move the decimal right until the number is between 1 and 10; count the places for the (negative) exponent.",
    ),
    answer(
      "y8-ile-sns-g2",
      "Write $0.00091$ in scientific notation.",
      "0.00091 = \\;?",
      "9.1 × 10^{-4}",
      "Move the decimal 4 places right: $0.00091 = 9.1 \\times 10^{-4}$.",
      "Count how many places the decimal moves to the right.",
      ["9.1 * 10^{-4}"],
    ),
    answer(
      "y8-ile-sns-g3",
      "Write $3.2 \\times 10^{-5}$ as a decimal.",
      "3.2 \\times 10^{-5} = \\;?",
      "0.000032",
      "Move the decimal 5 places left: $3.2 \\times 10^{-5} = 0.000032$.",
      "Move the decimal point 5 places to the left.",
    ),
    answer(
      "y8-ile-sns-g4",
      "A red blood cell has a diameter of about $0.000007$ m. Write this in scientific notation.",
      "0.000007 = \\;?",
      "7.0 × 10^{-6}",
      "Move the decimal 6 places right: $0.000007 = 7.0 \\times 10^{-6}$ m.",
      "Count the places to move the decimal to reach a number between 1 and 10.",
      ["7 × 10^{-6}", "7 * 10^{-6}"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-ile-sns-i1",
      "Write $0.00000045$ in scientific notation.",
      "0.00000045 = \\;?",
      "4.5 × 10^{-7}",
      "Move the decimal 7 places right: $0.00000045 = 4.5 \\times 10^{-7}$.",
      "Count the zeros and the leading position.",
      ["4.5 * 10^{-7}"],
    ),
    answer(
      "y8-ile-sns-i2",
      "Write $6.04 \\times 10^{-4}$ as a decimal.",
      "6.04 \\times 10^{-4} = \\;?",
      "0.000604",
      "Move the decimal 4 places left: $6.04 \\times 10^{-4} = 0.000604$.",
      "Move the decimal point 4 places to the left.",
    ),
    answer(
      "y8-ile-sns-i3",
      "Write $0.000000001$ (one nanometre in metres) in scientific notation.",
      "0.000000001 = \\;?",
      "1.0 × 10^{-9}",
      "Move the decimal 9 places right: $0.000000001 = 1.0 \\times 10^{-9}$.",
      "Count the zeros after the decimal point.",
      ["10^{-9}", "1 × 10^{-9}"],
    ),
    choice(
      "y8-ile-sns-i4",
      "Which is the smallest number?",
      "C",
      [
        "$1.5 \\times 10^{-2}$",
        "$3.0 \\times 10^{-3}$",
        "$8.0 \\times 10^{-6}$",
        "$2.0 \\times 10^{-4}$",
      ],
      "$8.0 \\times 10^{-6}$ has the most negative exponent, so it is the smallest: $0.000008$.",
      "The most negative exponent gives the smallest value.",
    ),
    answer(
      "y8-ile-sns-i5",
      "Write $1.25 \\times 10^{-3}$ as a decimal, then write $0.00085$ in scientific notation.",
      "\\text{Convert both; give the scientific notation answer.}",
      "8.5 × 10^{-4}",
      "$1.25 \\times 10^{-3} = 0.00125$. For $0.00085$: move decimal 4 places right to get $8.5 \\times 10^{-4}$.",
      "Convert the first to decimal form, then express the second in scientific notation.",
      ["8.5 * 10^{-4}"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing $0.0034 = 3.4 \\times 10^3$ with a positive exponent.",
      fix: "Numbers less than 1 need a negative exponent. Check by multiplying back: $3.4 \\times 10^3 = 3400 \\neq 0.0034$. Use $3.4 \\times 10^{-3}$.",
    },
    {
      mistake: "Thinking $10^{-5} > 10^{-2}$ because $5 > 2$.",
      fix: "$10^{-5} = 0.00001$ and $10^{-2} = 0.01$. A more negative exponent gives a smaller number: $10^{-5} < 10^{-2}$.",
    },
    {
      mistake: "Counting zeros incorrectly: writing $0.0034 = 3.4 \\times 10^{-2}$ instead of $10^{-3}$.",
      fix: "Count places moved, not zeros. From $0.0034$: $0.0034 \\to 0.034 \\to 0.34 \\to 3.4$ — that is 3 moves, so $10^{-3}$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-ile-sns-m1",
      "Write $0.0000062$ in scientific notation.",
      "0.0000062 = \\;?",
      "6.2 × 10^{-6}",
      "Move decimal 6 places right: $6.2 \\times 10^{-6}$.",
      "Count the places the decimal moves right.",
      ["6.2 * 10^{-6}"],
    ),
    answer(
      "y8-ile-sns-m2",
      "Write $9.9 \\times 10^{-7}$ as a decimal.",
      "9.9 \\times 10^{-7} = \\;?",
      "0.00000099",
      "Move the decimal 7 places left: $0.00000099$.",
      "Move the decimal point 7 places to the left.",
    ),
    choice(
      "y8-ile-sns-m3",
      "Which is correctly written in scientific notation?",
      "D",
      [
        "$0.45 \\times 10^{-2}$",
        "$45 \\times 10^{-5}$",
        "$4.5 \\times 10^{2}$",
        "$4.5 \\times 10^{-3}$",
      ],
      "Only $4.5 \\times 10^{-3}$ has a coefficient between 1 and 10 and matches a small number ($0.0045$).",
      "The coefficient must be between 1 (inclusive) and 10 (exclusive).",
    ),
    answer(
      "y8-ile-sns-m4",
      "A grain of sand has a diameter of approximately $0.00025$ m. Write this in scientific notation.",
      "0.00025 = \\;?",
      "2.5 × 10^{-4}",
      "Move the decimal 4 places right: $2.5 \\times 10^{-4}$.",
      "Count the places moved to reach a coefficient between 1 and 10.",
      ["2.5 * 10^{-4}"],
    ),
    answer(
      "y8-ile-sns-m5",
      "Write $3.07 \\times 10^{-5}$ as a decimal.",
      "3.07 \\times 10^{-5} = \\;?",
      "0.0000307",
      "Move the decimal 5 places left: $0.0000307$.",
      "Move the decimal point 5 places to the left.",
    ),
    answer(
      "y8-ile-sns-m6",
      "Order from smallest to largest: $7.0 \\times 10^{-4}$, $3.0 \\times 10^{2}$, $5.5 \\times 10^{-6}$. Give the smallest.",
      "\\text{Smallest of the three?}",
      "5.5 × 10^{-6}",
      "$5.5 \\times 10^{-6} = 0.0000055$, which is the smallest. Then $7.0 \\times 10^{-4} = 0.0007$, then $3.0 \\times 10^2 = 300$.",
      "The most negative exponent gives the smallest value.",
      ["5.5 * 10^{-6}"],
    ),
    choice(
      "y8-ile-sns-m7",
      "Which is larger: $6.0 \\times 10^{-3}$ or $9.0 \\times 10^{-4}$?",
      "A",
      [
        "$6.0 \\times 10^{-3}$, because $10^{-3} > 10^{-4}$.",
        "$9.0 \\times 10^{-4}$, because 9 > 6.",
        "They are equal.",
        "$9.0 \\times 10^{-4}$, because more negative means larger.",
      ],
      "$6.0 \\times 10^{-3} = 0.006$ and $9.0 \\times 10^{-4} = 0.0009$. Since $-3 > -4$, $10^{-3} > 10^{-4}$, so the first is larger.",
      "Compare exponents: the less negative exponent produces the larger number.",
    ),
    answer(
      "y8-ile-sns-m8",
      "Write $0.000000008$ in scientific notation.",
      "0.000000008 = \\;?",
      "8.0 × 10^{-9}",
      "Move the decimal 9 places right: $8.0 \\times 10^{-9}$.",
      "Count the digits after the decimal point before the 8.",
      ["8 × 10^{-9}", "8 * 10^{-9}"],
    ),
    answer(
      "y8-ile-sns-m9",
      "The wavelength of green light is about $5.5 \\times 10^{-7}$ m. Write this as a decimal.",
      "5.5 \\times 10^{-7} = \\;?",
      "0.00000055",
      "Move the decimal 7 places left: $0.00000055$.",
      "Move the decimal point 7 places to the left.",
    ),
    answer(
      "y8-ile-sns-m10",
      "A sample contains $4.8 \\times 10^{-3}$ g of a substance, split equally into 6 vials. How many grams are in each vial? Give your answer in scientific notation.",
      "\\frac{4.8 \\times 10^{-3}}{6} = \\;?",
      "8.0 × 10^{-4}",
      "$\\frac{4.8}{6} = 0.8$ and the exponent stays $-3$: $0.8 \\times 10^{-3} = 8.0 \\times 10^{-4}$.",
      "Divide the coefficient by 6, then adjust to proper scientific notation.",
      ["8 × 10^{-4}", "8 * 10^{-4}"],
    ),
  ],
};

// ── Lesson 4: Significant Figures ────────────────────────────────────────────

const significantFigures: LessonContent = {
  description:
    "Count significant figures using the rules for leading and trailing zeros, round numbers to 1, 2 or 3 significant figures, and apply significant figures to measurements and scientific contexts.",
  learningIntention:
    "Identify the number of significant figures in a measurement and round to a specified number of significant figures.",
  successCriteria: [
    "Apply the rules for identifying significant figures, including treatment of leading and trailing zeros.",
    "Round a number to 1, 2 or 3 significant figures.",
    "Distinguish between significant figures and decimal places.",
    "Express rounded results appropriately in measurement and scientific contexts.",
  ],
  teaching: {
    paragraphs: [
      "Significant figures (sig figs) communicate how precisely a measurement is known. The number $3.45$ has 3 sig figs; $3400$ could have 2, 3 or 4 depending on context; $0.0034$ has exactly 2 sig figs. Knowing the rules is essential for science and engineering.",
      "The rules: (1) All non-zero digits are significant. (2) Zeros between non-zero digits are significant: $3006$ has 4 sig figs. (3) Leading zeros — zeros before the first non-zero digit — are never significant: $0.0034$ has 2 sig figs, not 4. (4) Trailing zeros after the decimal point are significant: $2.50$ has 3 sig figs.",
      "To round to $n$ significant figures, find the $n$th significant digit, look at the next digit, and round up if it is 5 or more. For example, rounding $0.008472$ to 2 sig figs: the significant digits are $8, 4, 7, 2$; the 2nd is 4; the next digit is 7 (≥ 5), so round up: $0.0085$.",
      "A very common mistake is confusing significant figures with decimal places. $0.0034$ rounded to 2 decimal places is $0.00$ (which loses the data completely), but rounded to 2 significant figures it is $0.0034$ itself — they are already 2 sig figs. Significant figures count from the first non-zero digit, not from the decimal point.",
      "In scientific notation, the number of sig figs equals the number of digits in the coefficient. $3.40 \\times 10^5$ has 3 sig figs; $3.4 \\times 10^5$ has 2. This is why trailing zeros matter in the coefficient.",
    ],
    latexBlocks: [
      "0.00470 \\to \\text{3 sig figs (leading zeros excluded, trailing zero counted)}",
      "\\text{Round } 8472 \\text{ to 2 sig figs: } 8472 \\approx 8500",
      "\\text{Round } 0.006385 \\text{ to 2 sig figs: } 0.0064",
    ],
  },
  workedExamples: [
    {
      title: "Count significant figures",
      questionLatex: "\\text{How many significant figures does } 0.00460 \\text{ have?}",
      steps: [
        { explanation: "Leading zeros (before the 4) are not significant.", latex: "0.00\\underline{4}60 \\to \\text{start counting at 4}" },
        { explanation: "The digits 4, 6, and 0 are all significant (the trailing zero after the decimal is significant).", latex: "\\text{Significant digits: } 4, 6, 0 \\to 3 \\text{ sig figs}" },
      ],
      finalAnswerLatex: "3 \\text{ significant figures}",
    } as WorkedExample,
    {
      title: "Round to 2 significant figures",
      questionLatex: "\\text{Round } 0.08374 \\text{ to 2 significant figures.}",
      steps: [
        { explanation: "Identify the first two significant digits: 8 and 3.", latex: "0.0\\underline{83}74" },
        { explanation: "The digit after the 3 is 7 (≥ 5), so round up the 3 to 4.", latex: "0.08374 \\approx 0.084" },
      ],
      finalAnswerLatex: "0.084",
    } as WorkedExample,
    {
      title: "Round a large number to 3 significant figures",
      questionLatex: "\\text{Round } 47\\,862 \\text{ to 3 significant figures.}",
      steps: [
        { explanation: "The first 3 significant digits are 4, 7, 8.", latex: "\\underline{478}62" },
        { explanation: "The next digit is 6 (≥ 5), so round up the 8 to 9.", latex: "47\\,862 \\approx 47\\,900" },
      ],
      finalAnswerLatex: "47\\,900",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-ile-sig-g1",
      "How many significant figures does $0.00305$ have?",
      "C",
      [
        "5",
        "2",
        "3",
        "4",
      ],
      "Leading zeros are not significant. Counting from the first non-zero digit: $3$, $0$ (between non-zeros), $5$ — that is 3 sig figs.",
      "Start counting from the first non-zero digit.",
    ),
    answer(
      "y8-ile-sig-g2",
      "Round $7463$ to 2 significant figures.",
      "7463 \\approx \\;?\\text{ (2 sig figs)}",
      "7500",
      "First 2 sig figs: 7 and 4. Next digit is 6 (≥ 5), round up: $7463 \\approx 7500$.",
      "Find the 2nd sig fig and look at the next digit to decide.",
    ),
    answer(
      "y8-ile-sig-g3",
      "Round $0.005826$ to 2 significant figures.",
      "0.005826 \\approx \\;?\\text{ (2 sig figs)}",
      "0.0058",
      "First 2 sig figs: 5 and 8. Next digit is 2 (< 5), round down: $0.005826 \\approx 0.0058$.",
      "Start counting significant figures from the 5.",
    ),
    answer(
      "y8-ile-sig-g4",
      "How many significant figures does $3.080$ have?",
      "\\text{Number of sig figs in } 3.080 = \\;?",
      "4",
      "All digits in $3.080$ are significant: the trailing zero after the decimal point counts. So 4 sig figs: $3, 0, 8, 0$.",
      "Trailing zeros after the decimal point are always significant.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-ile-sig-i1",
      "Round $23\\,481$ to 3 significant figures.",
      "23\\,481 \\approx \\;?\\text{ (3 sig figs)}",
      "23500",
      "First 3 sig figs: 2, 3, 4. Next digit is 8 (≥ 5), round up: $23\\,481 \\approx 23\\,500$.",
      "Identify the 3rd significant digit and look at the next one.",
    ),
    answer(
      "y8-ile-sig-i2",
      "Round $0.0009271$ to 2 significant figures.",
      "0.0009271 \\approx \\;?\\text{ (2 sig figs)}",
      "0.00093",
      "First 2 sig figs: 9 and 2. Next digit is 7 (≥ 5), round up: $0.0009271 \\approx 0.00093$.",
      "Start from the first non-zero digit.",
    ),
    answer(
      "y8-ile-sig-i3",
      "How many significant figures does $40\\,200$ have, assuming all non-zero digits and sandwiched zeros are significant but trailing zeros in a whole number are not?",
      "\\text{Sig figs in } 40\\,200 = \\;?",
      "3",
      "The digits 4, 0 (between non-zeros), and 2 are significant; the trailing zeros are ambiguous in standard form, so 3 sig figs are certain.",
      "Zeros between non-zero digits are significant; trailing zeros in a whole number are ambiguous without a decimal point.",
    ),
    choice(
      "y8-ile-sig-i4",
      "A mass is recorded as $5.60$ g. Which statement is correct?",
      "B",
      [
        "It has 2 significant figures because the trailing zero is not counted.",
        "It has 3 significant figures because the trailing zero after the decimal point is significant.",
        "It has 2 significant figures because only non-zero digits count.",
        "It has 4 significant figures.",
      ],
      "The trailing zero after the decimal in $5.60$ is significant. So $5.60$ has 3 sig figs: $5$, $6$, $0$.",
      "Trailing zeros after the decimal point are always significant.",
    ),
    answer(
      "y8-ile-sig-i5",
      "Round $0.08456$ to 1 significant figure.",
      "0.08456 \\approx \\;?\\text{ (1 sig fig)}",
      "0.08",
      "First sig fig is 8. Next digit is 4 (< 5), round down: $0.08456 \\approx 0.08$.",
      "Only keep one sig fig; the rest become zeros or are dropped.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Counting leading zeros as significant: saying $0.0034$ has 4 sig figs.",
      fix: "Leading zeros are placeholders only. $0.0034$ has 2 sig figs — counting starts at the 3.",
    },
    {
      mistake: "Confusing significant figures with decimal places: rounding $0.0034$ to 2 decimal places and getting $0.00$.",
      fix: "Decimal places count from the decimal point; significant figures count from the first non-zero digit. $0.0034$ rounded to 2 sig figs is $0.0034$ (already 2 sig figs).",
    },
    {
      mistake: "Ignoring trailing zeros after the decimal: writing $4.20$ as $4.2$ when recording a precise measurement.",
      fix: "In a measured value, $4.20$ and $4.2$ are different — $4.20$ has 3 sig figs and $4.2$ has 2 sig figs. Keep trailing zeros that are significant.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-ile-sig-m1",
      "How many significant figures does $0.00709$ have?",
      "\\text{Sig figs in } 0.00709 = \\;?",
      "3",
      "Leading zeros not counted; 7, 0 (between non-zeros), 9 are all significant — 3 sig figs.",
      "Start counting from the first non-zero digit.",
    ),
    answer(
      "y8-ile-sig-m2",
      "Round $56\\,390$ to 2 significant figures.",
      "56\\,390 \\approx \\;?\\text{ (2 sig figs)}",
      "56000",
      "First 2 sig figs: 5, 6. Next digit is 3 (< 5), round down: $56\\,390 \\approx 56\\,000$.",
      "Look at the digit after the 2nd sig fig.",
    ),
    choice(
      "y8-ile-sig-m3",
      "Which number has exactly 4 significant figures?",
      "C",
      [
        "$0.0034$",
        "$40\\,000$",
        "$6.050$",
        "$1300$",
      ],
      "$6.050$ has 4 sig figs: $6$, $0$ (between non-zeros), $5$, $0$ (trailing zero after decimal).",
      "Count from the first non-zero digit and apply the trailing zero rule.",
    ),
    answer(
      "y8-ile-sig-m4",
      "Round $0.0008354$ to 3 significant figures.",
      "0.0008354 \\approx \\;?\\text{ (3 sig figs)}",
      "0.000835",
      "First 3 sig figs: 8, 3, 5. Next digit is 4 (< 5), round down: $0.000835$.",
      "Start from the 8 and count 3 significant digits.",
    ),
    answer(
      "y8-ile-sig-m5",
      "The mass of an electron is approximately $0.000000000000000000000000000000911$ kg. In scientific notation this is $9.11 \\times 10^{-31}$ kg. How many significant figures does this have?",
      "\\text{Sig figs in } 9.11 \\times 10^{-31} = \\;?",
      "3",
      "In scientific notation, the number of sig figs equals the digits in the coefficient. $9.11$ has 3 digits, so 3 sig figs.",
      "Count the digits in the coefficient of the scientific notation form.",
    ),
    answer(
      "y8-ile-sig-m6",
      "Round $1.0047$ to 3 significant figures.",
      "1.0047 \\approx \\;?\\text{ (3 sig figs)}",
      "1.00",
      "First 3 sig figs: 1, 0 (between non-zeros), 0 (between non-zeros). Next digit is 4 (< 5), round down: $1.0047 \\approx 1.00$.",
      "The zeros between 1 and 4 are significant — count them.",
    ),
    answer(
      "y8-ile-sig-m7",
      "A length is measured as $34.70$ cm. Round to 3 significant figures.",
      "34.70 \\approx \\;?\\text{ (3 sig figs)}",
      "34.7",
      "First 3 sig figs: 3, 4, 7. Next digit is 0 (< 5), round down: $34.7$.",
      "The 4th sig fig is 0 — look at it to decide rounding for the 3rd.",
    ),
    choice(
      "y8-ile-sig-m8",
      "Which shows $0.007382$ rounded to 2 significant figures?",
      "A",
      [
        "$0.0074$",
        "$0.0073$",
        "$0.007$",
        "$0.00738$",
      ],
      "First 2 sig figs: 7 and 3. Next digit is 8 (≥ 5), round up: $0.0074$.",
      "Start from the first non-zero digit and round the second sig fig.",
    ),
    answer(
      "y8-ile-sig-m9",
      "Express $8400$ in scientific notation so that it clearly shows 3 significant figures.",
      "8400 = \\;?\\text{ (3 sig figs, scientific notation)}",
      "8.40 × 10^3",
      "$8400$ to 3 sig figs is $8.40 \\times 10^3$. The trailing zero in the coefficient shows the third sig fig.",
      "Include the trailing zero in the coefficient to show the precision.",
      ["8.40 * 10^3"],
    ),
    answer(
      "y8-ile-sig-m10",
      "A chemist records two masses: $12.36$ g (4 sig figs) and $5.8$ g (2 sig figs). Their sum is $18.16$ g. Round the result to the appropriate number of significant figures for addition (match the least precise decimal place).",
      "18.16 \\approx \\;?\\text{ (to nearest 0.1 g)}",
      "18.2",
      "When adding, match the least precise decimal place. $5.8$ g is given to 1 decimal place, so round to $18.2$ g.",
      "For addition, round to the same decimal place as the least precise measurement.",
    ),
  ],
};

// ── Lesson 5: Operations with Scientific Notation ────────────────────────────

const operationsWithScientificNotation: LessonContent = {
  description:
    "Multiply and divide numbers in scientific notation by operating on coefficients and adjusting exponents, and add and subtract numbers in scientific notation by matching exponents first.",
  learningIntention:
    "Perform multiplication, division, addition and subtraction with numbers in scientific notation, and express results in correct scientific notation.",
  successCriteria: [
    "Multiply numbers in scientific notation by multiplying coefficients and adding exponents.",
    "Divide numbers in scientific notation by dividing coefficients and subtracting exponents.",
    "Add and subtract numbers in scientific notation by first converting to a common exponent.",
    "Adjust the result so the coefficient is between 1 and 10.",
  ],
  teaching: {
    paragraphs: [
      "When multiplying numbers in scientific notation, use the fact that multiplication is commutative and associative. Multiply the two coefficients together and add the exponents: $(3 \\times 10^4) \\times (2 \\times 10^3) = (3 \\times 2) \\times 10^{4+3} = 6 \\times 10^7$.",
      "For division, divide the coefficients and subtract the exponents: $\\frac{8 \\times 10^6}{2 \\times 10^2} = \\frac{8}{2} \\times 10^{6-2} = 4 \\times 10^4$. After dividing, always check that the coefficient is still between 1 and 10.",
      "For addition and subtraction, the exponents must match before you can combine the coefficients. Convert the number with the smaller exponent to match the larger: $3.2 \\times 10^5 + 4.0 \\times 10^4 = 3.2 \\times 10^5 + 0.40 \\times 10^5 = 3.6 \\times 10^5$.",
      "After any operation, check the result is in proper scientific notation. If the coefficient is 10 or more, divide by 10 and increase the exponent: $12 \\times 10^5 = 1.2 \\times 10^6$. If the coefficient is less than 1, multiply by 10 and decrease the exponent: $0.5 \\times 10^4 = 5 \\times 10^3$.",
      "Calculators display scientific notation results, but may use E notation (e.g. $1.5E8$ means $1.5 \\times 10^8$). Always write final answers in the standard $a \\times 10^n$ form for this course.",
    ],
    latexBlocks: [
      "(a \\times 10^m) \\times (b \\times 10^n) = (a \\times b) \\times 10^{m+n}",
      "\\frac{a \\times 10^m}{b \\times 10^n} = \\frac{a}{b} \\times 10^{m-n}",
      "(a \\times 10^n) \\pm (b \\times 10^n) = (a \\pm b) \\times 10^n",
    ],
  },
  workedExamples: [
    {
      title: "Multiply numbers in scientific notation",
      questionLatex: "\\text{Calculate } (4 \\times 10^3) \\times (5 \\times 10^6).",
      steps: [
        { explanation: "Multiply the coefficients and add the exponents.", latex: "(4 \\times 5) \\times 10^{3+6} = 20 \\times 10^9" },
        { explanation: "Adjust: $20 = 2.0 \\times 10^1$, so increase the exponent by 1.", latex: "20 \\times 10^9 = 2.0 \\times 10^{10}" },
      ],
      finalAnswerLatex: "2.0 \\times 10^{10}",
    } as WorkedExample,
    {
      title: "Divide numbers in scientific notation",
      questionLatex: "\\text{Calculate } \\frac{9.6 \\times 10^8}{3.2 \\times 10^3}.",
      steps: [
        { explanation: "Divide the coefficients and subtract the exponents.", latex: "\\frac{9.6}{3.2} \\times 10^{8-3} = 3 \\times 10^5" },
      ],
      finalAnswerLatex: "3 \\times 10^5",
    } as WorkedExample,
    {
      title: "Add numbers in scientific notation",
      questionLatex: "\\text{Calculate } 5.3 \\times 10^6 + 4.0 \\times 10^5.",
      steps: [
        { explanation: "Rewrite the smaller-exponent term to match the larger exponent.", latex: "4.0 \\times 10^5 = 0.40 \\times 10^6" },
        { explanation: "Add the coefficients, keeping the common exponent.", latex: "5.3 \\times 10^6 + 0.40 \\times 10^6 = 5.70 \\times 10^6" },
      ],
      finalAnswerLatex: "5.7 \\times 10^6",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-ile-ops-g1",
      "Which correctly shows the first step when multiplying $(3 \\times 10^4) \\times (4 \\times 10^5)$?",
      "A",
      [
        "Multiply $3 \\times 4$ and add $4 + 5$.",
        "Multiply $3 \\times 4$ and multiply $4 \\times 5$.",
        "Add $3 + 4$ and add $4 + 5$.",
        "Divide $3 \\div 4$ and subtract $4 - 5$.",
      ],
      "Multiply the coefficients and add the exponents: $(3 \\times 4) \\times 10^{4+5} = 12 \\times 10^9 = 1.2 \\times 10^{10}$.",
      "Coefficients multiply; exponents add.",
    ),
    answer(
      "y8-ile-ops-g2",
      "Calculate $(2 \\times 10^3) \\times (3 \\times 10^4)$.",
      "(2 \\times 10^3) \\times (3 \\times 10^4) = \\;?",
      "6 × 10^7",
      "$2 \\times 3 = 6$ and $10^{3+4} = 10^7$. Result: $6 \\times 10^7$.",
      "Multiply the coefficients and add the exponents.",
      ["6 * 10^7"],
    ),
    answer(
      "y8-ile-ops-g3",
      "Calculate $\\frac{8 \\times 10^9}{4 \\times 10^3}$.",
      "\\frac{8 \\times 10^9}{4 \\times 10^3} = \\;?",
      "2 × 10^6",
      "$\\frac{8}{4} = 2$ and $10^{9-3} = 10^6$. Result: $2 \\times 10^6$.",
      "Divide the coefficients and subtract the exponents.",
      ["2 * 10^6"],
    ),
    answer(
      "y8-ile-ops-g4",
      "Calculate $3.0 \\times 10^5 + 2.0 \\times 10^5$.",
      "3.0 \\times 10^5 + 2.0 \\times 10^5 = \\;?",
      "5.0 × 10^5",
      "Same exponent — add coefficients: $(3.0 + 2.0) \\times 10^5 = 5.0 \\times 10^5$.",
      "When exponents match, just add the coefficients.",
      ["5 × 10^5", "5 * 10^5"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-ile-ops-i1",
      "Calculate $(5 \\times 10^6) \\times (4 \\times 10^3)$.",
      "(5 \\times 10^6) \\times (4 \\times 10^3) = \\;?",
      "2 × 10^10",
      "$5 \\times 4 = 20$ and $10^{6+3} = 10^9$. So $20 \\times 10^9 = 2 \\times 10^{10}$.",
      "Multiply coefficients and add exponents, then adjust if the coefficient is ≥ 10.",
      ["2.0 × 10^10", "2 * 10^10"],
    ),
    answer(
      "y8-ile-ops-i2",
      "Calculate $\\frac{6.0 \\times 10^{-2}}{2.0 \\times 10^3}$.",
      "\\frac{6.0 \\times 10^{-2}}{2.0 \\times 10^3} = \\;?",
      "3.0 × 10^{-5}",
      "$\\frac{6.0}{2.0} = 3.0$ and $10^{-2-3} = 10^{-5}$. Result: $3.0 \\times 10^{-5}$.",
      "Divide coefficients and subtract exponents: $-2 - 3 = -5$.",
      ["3 × 10^{-5}", "3 * 10^{-5}"],
    ),
    answer(
      "y8-ile-ops-i3",
      "Calculate $7.4 \\times 10^4 + 6.0 \\times 10^3$.",
      "7.4 \\times 10^4 + 6.0 \\times 10^3 = \\;?",
      "8.0 × 10^4",
      "$6.0 \\times 10^3 = 0.60 \\times 10^4$. Then $(7.4 + 0.60) \\times 10^4 = 8.0 \\times 10^4$.",
      "Convert the smaller-exponent term so both have the same power of 10.",
      ["8 × 10^4", "8 * 10^4"],
    ),
    choice(
      "y8-ile-ops-i4",
      "$(6 \\times 10^5) \\times (7 \\times 10^4) = 42 \\times 10^9$. What is the correct final answer in scientific notation?",
      "B",
      [
        "$42 \\times 10^9$",
        "$4.2 \\times 10^{10}$",
        "$4.2 \\times 10^9$",
        "$42 \\times 10^{10}$",
      ],
      "$42 \\times 10^9 = 4.2 \\times 10^{10}$. The coefficient 42 is ≥ 10, so rewrite as $4.2 \\times 10^1$ and increase the exponent.",
      "Always adjust so the coefficient is between 1 and 10.",
    ),
    answer(
      "y8-ile-ops-i5",
      "Calculate $5.8 \\times 10^{-3} - 2.3 \\times 10^{-3}$.",
      "5.8 \\times 10^{-3} - 2.3 \\times 10^{-3} = \\;?",
      "3.5 × 10^{-3}",
      "Same exponent — subtract coefficients: $(5.8 - 2.3) \\times 10^{-3} = 3.5 \\times 10^{-3}$.",
      "When exponents match, subtract the coefficients directly.",
      ["3.5 * 10^{-3}"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding the exponents when adding: $3 \\times 10^4 + 2 \\times 10^3 = 5 \\times 10^7$.",
      fix: "Only multiply/divide operations combine exponents. For addition, match exponents first, then add the coefficients: $3 \\times 10^4 + 0.2 \\times 10^4 = 3.2 \\times 10^4$.",
    },
    {
      mistake: "Leaving the result as $12 \\times 10^5$ without converting to proper scientific notation.",
      fix: "$12 \\times 10^5 = 1.2 \\times 10^6$. Always adjust so the coefficient is at least 1 but less than 10.",
    },
    {
      mistake: "Subtracting exponents in the wrong order when dividing: $\\frac{10^3}{10^7} = 10^{7-3} = 10^4$.",
      fix: "Subtract bottom from top: $\\frac{10^3}{10^7} = 10^{3-7} = 10^{-4}$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-ile-ops-m1",
      "Calculate $(3 \\times 10^5) \\times (3 \\times 10^5)$.",
      "(3 \\times 10^5) \\times (3 \\times 10^5) = \\;?",
      "9 × 10^10",
      "$3 \\times 3 = 9$ and $10^{5+5} = 10^{10}$. Result: $9 \\times 10^{10}$.",
      "Multiply coefficients and add exponents.",
      ["9 * 10^10"],
    ),
    answer(
      "y8-ile-ops-m2",
      "Calculate $\\frac{1.2 \\times 10^7}{4.0 \\times 10^4}$.",
      "\\frac{1.2 \\times 10^7}{4.0 \\times 10^4} = \\;?",
      "3.0 × 10^2",
      "$\\frac{1.2}{4.0} = 0.3$ and $10^{7-4} = 10^3$. So $0.3 \\times 10^3 = 3.0 \\times 10^2$.",
      "Divide coefficients and subtract exponents, then adjust to proper form.",
      ["3 × 10^2", "300"],
    ),
    choice(
      "y8-ile-ops-m3",
      "$(2.5 \\times 10^3) \\times (4 \\times 10^{-6})$ equals:",
      "B",
      [
        "$10 \\times 10^{-3}$",
        "$1.0 \\times 10^{-2}$",
        "$1.0 \\times 10^{-3}$",
        "$10 \\times 10^{3}$",
      ],
      "$2.5 \\times 4 = 10$ and $10^{3+(-6)} = 10^{-3}$. So $10 \\times 10^{-3} = 1.0 \\times 10^{-2}$.",
      "Multiply coefficients and add exponents, then adjust the coefficient.",
    ),
    answer(
      "y8-ile-ops-m4",
      "Calculate $4.5 \\times 10^8 + 3.0 \\times 10^7$.",
      "4.5 \\times 10^8 + 3.0 \\times 10^7 = \\;?",
      "4.8 × 10^8",
      "$3.0 \\times 10^7 = 0.30 \\times 10^8$. Then $(4.5 + 0.30) \\times 10^8 = 4.8 \\times 10^8$.",
      "Rewrite the smaller term so both exponents match.",
      ["4.8 * 10^8"],
    ),
    answer(
      "y8-ile-ops-m5",
      "Calculate $6.0 \\times 10^{-4} - 1.5 \\times 10^{-5}$.",
      "6.0 \\times 10^{-4} - 1.5 \\times 10^{-5} = \\;?",
      "5.85 × 10^{-4}",
      "$1.5 \\times 10^{-5} = 0.15 \\times 10^{-4}$. Then $(6.0 - 0.15) \\times 10^{-4} = 5.85 \\times 10^{-4}$.",
      "Convert to match the larger exponent, then subtract coefficients.",
      ["5.85 * 10^{-4}"],
    ),
    answer(
      "y8-ile-ops-m6",
      "The speed of light is $3.0 \\times 10^8$ m/s. How far does light travel in $5.0 \\times 10^2$ seconds? Give your answer in scientific notation.",
      "(3.0 \\times 10^8) \\times (5.0 \\times 10^2) = \\;?",
      "1.5 × 10^11",
      "$3.0 \\times 5.0 = 15$ and $10^{8+2} = 10^{10}$. So $15 \\times 10^{10} = 1.5 \\times 10^{11}$ m.",
      "Multiply and then adjust the coefficient.",
      ["1.5 * 10^11"],
    ),
    answer(
      "y8-ile-ops-m7",
      "Calculate $\\frac{9.0 \\times 10^{-3}}{3.0 \\times 10^{-7}}$.",
      "\\frac{9.0 \\times 10^{-3}}{3.0 \\times 10^{-7}} = \\;?",
      "3.0 × 10^4",
      "$\\frac{9.0}{3.0} = 3.0$ and $10^{-3-(-7)} = 10^{-3+7} = 10^4$. Result: $3.0 \\times 10^4$.",
      "Subtract exponents: top minus bottom, $-3 - (-7) = 4$.",
      ["3 × 10^4", "30000"],
    ),
    choice(
      "y8-ile-ops-m8",
      "Which correctly completes $8.0 \\times 10^6 - 5.0 \\times 10^5$?",
      "C",
      [
        "$3.0 \\times 10^1$",
        "$3.0 \\times 10^6$",
        "$7.5 \\times 10^6$",
        "$7.5 \\times 10^5$",
      ],
      "$5.0 \\times 10^5 = 0.50 \\times 10^6$. Then $(8.0 - 0.50) \\times 10^6 = 7.5 \\times 10^6$.",
      "Match exponents first, then subtract coefficients.",
    ),
    answer(
      "y8-ile-ops-m9",
      "A cell phone battery holds $2.4 \\times 10^4$ joules of energy. A device uses $8.0 \\times 10^2$ joules per hour. How many hours will the battery last? Give your answer in scientific notation.",
      "\\frac{2.4 \\times 10^4}{8.0 \\times 10^2} = \\;?",
      "3.0 × 10^1",
      "$\\frac{2.4}{8.0} = 0.3$ and $10^{4-2} = 10^2$. So $0.3 \\times 10^2 = 3.0 \\times 10^1 = 30$ hours.",
      "Divide coefficients and subtract exponents, then adjust.",
      ["30", "3 × 10^1"],
    ),
    answer(
      "y8-ile-ops-m10",
      "The mass of Jupiter is $1.898 \\times 10^{27}$ kg and the mass of Saturn is $5.683 \\times 10^{26}$ kg. Find the combined mass in scientific notation (round coefficient to 3 sig figs).",
      "(1.898 \\times 10^{27}) + (5.683 \\times 10^{26}) = \\;?",
      "2.47 × 10^27",
      "$5.683 \\times 10^{26} = 0.5683 \\times 10^{27}$. Sum: $(1.898 + 0.5683) \\times 10^{27} = 2.4663 \\times 10^{27} \\approx 2.47 \\times 10^{27}$.",
      "Match exponents, add coefficients, then round as required.",
      ["2.47 × 10^27", "2.47 * 10^27"],
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "negative-indices":                   negativeIndices,
  "scientific-notation-large-numbers":  scientificNotationLarge,
  "scientific-notation-small-numbers":  scientificNotationSmall,
  "significant-figures":                significantFigures,
  "operations-with-scientific-notation": operationsWithScientificNotation,
};

export function year8IndexLawsExtensionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "index-laws-extension") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
