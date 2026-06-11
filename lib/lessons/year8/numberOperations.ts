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

// ── Lesson 1: Directed Numbers ───────────────────────────────────────────────

const directedNumbers: LessonContent = {
  description:
    "Add, subtract, multiply and divide with positive and negative integers, and apply directed numbers to real-world contexts such as temperature and depth.",
  learningIntention:
    "Perform the four operations with directed (positive and negative) numbers and apply the rules for signs.",
  successCriteria: [
    "Add and subtract positive and negative integers using a number line or sign rules.",
    "Apply the rule: two negatives in subtraction become addition.",
    "Multiply and divide directed numbers using the rule: same signs give positive, different signs give negative.",
    "Solve real-world problems involving directed numbers.",
  ],
  teaching: {
    paragraphs: [
      "Directed numbers include all positive and negative integers, as well as zero. They appear whenever a quantity can go in two opposite directions — temperature above or below zero, floors above or below ground, bank credits and debits.",
      "When adding and subtracting, think of movement on a number line. Adding a positive number moves right; adding a negative number moves left. Subtracting a negative is the same as adding a positive: $5 - (-3) = 5 + 3 = 8$.",
      "For multiplication and division, one rule covers all cases: same signs give a positive result; different signs give a negative result. So $(-3) \\times (-4) = 12$ and $(-3) \\times 4 = -12$.",
      "A common mistake is treating subtraction of a negative as still negative. Remember: $- (-) = +$. Visualise it as removing a debt — removing a negative makes you richer.",
    ],
    latexBlocks: [
      "a - (-b) = a + b",
      "(+) \\times (+) = (+), \\quad (-) \\times (-) = (+), \\quad (+) \\times (-) = (-)",
      "\\frac{-12}{3} = -4, \\quad \\frac{-12}{-3} = 4",
    ],
  },
  workedExamples: [
    {
      title: "Subtract a negative integer",
      questionLatex: "\\text{Evaluate }7 - (-5).",
      steps: [
        { explanation: "Subtracting a negative is the same as adding its positive.", latex: "7 - (-5) = 7 + 5" },
        { explanation: "Add the two positive values.", latex: "7 + 5 = 12" },
      ],
      finalAnswerLatex: "12",
    } as WorkedExample,
    {
      title: "Multiply two directed numbers",
      questionLatex: "\\text{Evaluate }(-6) \\times 4.",
      steps: [
        { explanation: "The signs are different (one negative, one positive), so the result is negative.", latex: "(-6) \\times 4 = -(6 \\times 4)" },
        { explanation: "Multiply the absolute values.", latex: "6 \\times 4 = 24, \\text{ so the result is } -24" },
      ],
      finalAnswerLatex: "-24",
    } as WorkedExample,
    {
      title: "Divide two negative numbers",
      questionLatex: "\\text{Evaluate }(-20) \\div (-4).",
      steps: [
        { explanation: "The signs are the same (both negative), so the result is positive.", latex: "(-20) \\div (-4) = +(20 \\div 4)" },
        { explanation: "Divide the absolute values.", latex: "20 \\div 4 = 5" },
      ],
      finalAnswerLatex: "5",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-dn-g1",
      "Which statement correctly describes subtracting a negative number?",
      "B",
      [
        "It makes the result more negative.",
        "It is the same as adding a positive number.",
        "It leaves the value unchanged.",
        "It is the same as multiplying by negative one.",
      ],
      "Subtracting a negative reverses the subtraction: $a - (-b) = a + b$.",
      "Think about what happens on the number line when you remove a negative.",
    ),
    answer(
      "y8-nop-dn-g2",
      "Evaluate $-8 + 3$.",
      "-8 + 3 = \\;?",
      "-5",
      "Start at $-8$ on the number line and move 3 to the right: $-8 + 3 = -5$.",
      "Start at $-8$ on the number line and move right by 3.",
      ["−5"],
    ),
    answer(
      "y8-nop-dn-g3",
      "Evaluate $4 - (-6)$.",
      "4 - (-6) = \\;?",
      "10",
      "Subtracting a negative is the same as adding: $4 - (-6) = 4 + 6 = 10$.",
      "Change the double negative to addition: $4 - (-6) = 4 + 6$.",
    ),
    answer(
      "y8-nop-dn-g4",
      "Evaluate $(-5) \\times (-3)$.",
      "(-5) \\times (-3) = \\;?",
      "15",
      "Same signs (both negative) give a positive result: $(-5) \\times (-3) = 15$.",
      "Identify the signs first — same signs give a positive answer.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-dn-i1",
      "Evaluate $-12 + 7$.",
      "-12 + 7 = \\;?",
      "-5",
      "Moving 7 to the right from $-12$ gives $-5$.",
      "Move right on the number line from $-12$.",
      ["−5"],
    ),
    answer(
      "y8-nop-dn-i2",
      "Evaluate $3 - (-9)$.",
      "3 - (-9) = \\;?",
      "12",
      "$3 - (-9) = 3 + 9 = 12$.",
      "A subtraction of a negative becomes addition.",
    ),
    answer(
      "y8-nop-dn-i3",
      "Evaluate $(-7) \\times 5$.",
      "(-7) \\times 5 = \\;?",
      "-35",
      "Different signs give a negative result: $7 \\times 5 = 35$, so $(-7) \\times 5 = -35$.",
      "Different signs produce a negative answer.",
      ["−35"],
    ),
    answer(
      "y8-nop-dn-i4",
      "Evaluate $(-18) \\div (-3)$.",
      "(-18) \\div (-3) = \\;?",
      "6",
      "Same signs give a positive result: $18 \\div 3 = 6$, so $(-18) \\div (-3) = 6$.",
      "Same signs produce a positive answer.",
    ),
    choice(
      "y8-nop-dn-i5",
      "The temperature is $-3°C$ at midnight and drops by another $4°C$. What is the new temperature?",
      "C",
      ["$1°C$", "$-1°C$", "$-7°C$", "$7°C$"],
      "$-3 - 4 = -7$. Both changes are in the negative direction.",
      "Dropping means subtracting from the current temperature.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Treating $a - (-b)$ as $a - b$ instead of $a + b$.",
      fix: "Two negatives in a row always become a positive: $a - (-b) = a + b$.",
    },
    {
      mistake: "Assuming a negative times a negative is negative.",
      fix: "Same signs produce a positive: $(-3) \\times (-4) = +12$.",
    },
    {
      mistake: "Adding absolute values when signs differ: $-5 + 3 = 8$ instead of $-2$.",
      fix: "When adding numbers with different signs, subtract the smaller absolute value from the larger and keep the sign of the larger.",
    },
    {
      mistake: "Forgetting the sign when dividing: $(-12) \\div 4 = 3$ instead of $-3$.",
      fix: "Apply the sign rule after dividing: different signs give a negative result.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-dn-m1",
      "Evaluate $-9 + 14$.",
      "-9 + 14 = \\;?",
      "5",
      "$-9 + 14 = 5$. Moving 14 to the right from $-9$ lands at 5.",
      "Move right on the number line.",
    ),
    answer(
      "y8-nop-dn-m2",
      "Evaluate $-6 - (-10)$.",
      "-6 - (-10) = \\;?",
      "4",
      "$-6 - (-10) = -6 + 10 = 4$.",
      "Convert the double negative to addition.",
    ),
    choice(
      "y8-nop-dn-m3",
      "Which expression equals a positive number?",
      "D",
      [
        "\\((-3) \\times 5\\)",
        "\\(4 \\times (-2)\\)",
        "\\((-6) \\div 2\\)",
        "\\((-8) \\div (-4)\\)",
      ],
      "$(-8) \\div (-4) = +2$. Same signs produce a positive result.",
      "Apply the sign rule: same signs give positive, different signs give negative.",
    ),
    answer(
      "y8-nop-dn-m4",
      "Evaluate $(-4) \\times (-9)$.",
      "(-4) \\times (-9) = \\;?",
      "36",
      "Same signs give a positive result: $4 \\times 9 = 36$.",
      "Same signs produce a positive answer.",
    ),
    answer(
      "y8-nop-dn-m5",
      "Evaluate $(-24) \\div 6$.",
      "(-24) \\div 6 = \\;?",
      "-4",
      "Different signs give a negative result: $24 \\div 6 = 4$, so $(-24) \\div 6 = -4$.",
      "Different signs produce a negative answer.",
      ["−4"],
    ),
    answer(
      "y8-nop-dn-m6",
      "A submarine is at $-45$ m and rises $18$ m. Find its new depth.",
      "\\text{New depth} = -45 + 18 = \\;?",
      "-27",
      "$-45 + 18 = -27$. The submarine is now at $-27$ m.",
      "Rising means adding a positive value to the current depth.",
      ["−27"],
    ),
    choice(
      "y8-nop-dn-m7",
      "What is $(-3)^2$?",
      "C",
      ["$-9$", "$-6$", "$9$", "$6$"],
      "$(-3)^2 = (-3) \\times (-3) = 9$. Same signs give a positive result.",
      "Squaring means multiplying the number by itself — apply the sign rule.",
    ),
    answer(
      "y8-nop-dn-m8",
      "Evaluate $2 - 11$.",
      "2 - 11 = \\;?",
      "-9",
      "Subtracting a larger number from a smaller one gives a negative result: $2 - 11 = -9$.",
      "The result is negative when you subtract a larger number from a smaller one.",
      ["−9"],
    ),
    answer(
      "y8-nop-dn-m9",
      "Evaluate $(-5) \\times 3 \\times (-2)$.",
      "(-5) \\times 3 \\times (-2) = \\;?",
      "30",
      "$(-5) \\times 3 = -15$, then $(-15) \\times (-2) = 30$. Two negatives in the product give a positive.",
      "Work left to right, applying the sign rule at each step.",
    ),
    answer(
      "y8-nop-dn-m10",
      "The temperature falls from $2°C$ to $-11°C$. By how many degrees did it fall?",
      "\\text{Change} = 2 - (-11) = \\;?",
      "13",
      "Change = $2 - (-11) = 2 + 11 = 13$. The temperature fell by 13 degrees.",
      "The change in temperature is the final temperature minus the starting temperature.",
    ),
  ],
};

// ── Lesson 2: Fractions and Decimals ─────────────────────────────────────────

const fractionsAndDecimals: LessonContent = {
  description:
    "Add, subtract, multiply and divide fractions and mixed numbers, convert between fractions and decimals, and order fractions on a number line.",
  learningIntention:
    "Perform the four operations with fractions and mixed numbers, and convert fluently between fractions and decimals.",
  successCriteria: [
    "Add and subtract fractions by finding a common denominator.",
    "Multiply fractions by multiplying numerators and denominators directly.",
    "Divide fractions using the keep-change-flip (multiply by the reciprocal) method.",
    "Convert between fractions and terminating or recurring decimals.",
  ],
  teaching: {
    paragraphs: [
      "A fraction represents a part of a whole. The denominator (bottom number) tells you how many equal parts the whole is divided into; the numerator (top number) tells you how many of those parts you have.",
      "To add or subtract fractions, the denominators must be the same. Find the lowest common denominator, rewrite each fraction, then add or subtract the numerators. For example, $\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$.",
      "To multiply fractions, multiply the numerators together and the denominators together: $\\frac{2}{3} \\times \\frac{3}{5} = \\frac{6}{15} = \\frac{2}{5}$. To divide, flip the second fraction and multiply: $\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}$.",
      "To convert a fraction to a decimal, divide the numerator by the denominator. The result either terminates ($\\frac{1}{4} = 0.25$) or recurs ($\\frac{1}{3} = 0.\\overline{3}$).",
    ],
    latexBlocks: [
      "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}",
      "\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}",
      "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}",
    ],
  },
  workedExamples: [
    {
      title: "Add fractions with different denominators",
      questionLatex: "\\text{Evaluate }\\frac{2}{3} + \\frac{1}{4}.",
      steps: [
        { explanation: "The lowest common denominator of 3 and 4 is 12.", latex: "\\frac{2}{3} = \\frac{8}{12}, \\quad \\frac{1}{4} = \\frac{3}{12}" },
        { explanation: "Add the numerators, keeping the denominator.", latex: "\\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}" },
      ],
      finalAnswerLatex: "\\frac{11}{12}",
    } as WorkedExample,
    {
      title: "Multiply two fractions",
      questionLatex: "\\text{Evaluate }\\frac{3}{4} \\times \\frac{2}{5}.",
      steps: [
        { explanation: "Multiply the numerators and denominators directly.", latex: "\\frac{3 \\times 2}{4 \\times 5} = \\frac{6}{20}" },
        { explanation: "Simplify by dividing numerator and denominator by 2.", latex: "\\frac{6}{20} = \\frac{3}{10}" },
      ],
      finalAnswerLatex: "\\frac{3}{10}",
    } as WorkedExample,
    {
      title: "Divide a fraction by a fraction",
      questionLatex: "\\text{Evaluate }\\frac{3}{5} \\div \\frac{3}{10}.",
      steps: [
        { explanation: "Keep the first fraction, flip the second, and multiply.", latex: "\\frac{3}{5} \\times \\frac{10}{3}" },
        { explanation: "Multiply numerators and denominators, then simplify.", latex: "\\frac{30}{15} = 2" },
      ],
      finalAnswerLatex: "2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-frd-g1",
      "To add $\\frac{1}{3} + \\frac{1}{5}$, what is the lowest common denominator?",
      "B",
      ["3", "15", "8", "30"],
      "The smallest number divisible by both 3 and 5 is 15.",
      "Find the smallest number that both denominators divide into evenly.",
    ),
    answer(
      "y8-nop-frd-g2",
      "Evaluate $\\frac{1}{2} + \\frac{1}{4}$.",
      "\\frac{1}{2} + \\frac{1}{4} = \\;?",
      "3/4",
      "$\\frac{1}{2} = \\frac{2}{4}$, so $\\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$.",
      "Convert $\\frac{1}{2}$ to quarters so the denominators match.",
      ["0.75"],
    ),
    answer(
      "y8-nop-frd-g3",
      "Evaluate $\\frac{2}{3} \\times \\frac{3}{4}$.",
      "\\frac{2}{3} \\times \\frac{3}{4} = \\;?",
      "1/2",
      "$\\frac{2 \\times 3}{3 \\times 4} = \\frac{6}{12} = \\frac{1}{2}$.",
      "Multiply numerators together and denominators together, then simplify.",
      ["0.5"],
    ),
    answer(
      "y8-nop-frd-g4",
      "Convert $\\frac{3}{4}$ to a decimal.",
      "\\frac{3}{4} = \\;?",
      "0.75",
      "Divide the numerator by the denominator: $3 \\div 4 = 0.75$.",
      "Divide the top number by the bottom number.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-frd-i1",
      "Evaluate $\\frac{3}{5} - \\frac{1}{4}$.",
      "\\frac{3}{5} - \\frac{1}{4} = \\;?",
      "7/20",
      "LCD is 20. $\\frac{3}{5} = \\frac{12}{20}$, $\\frac{1}{4} = \\frac{5}{20}$. So $\\frac{12}{20} - \\frac{5}{20} = \\frac{7}{20}$.",
      "Find a common denominator for 5 and 4.",
      ["0.35"],
    ),
    answer(
      "y8-nop-frd-i2",
      "Evaluate $\\frac{5}{6} \\times \\frac{3}{10}$.",
      "\\frac{5}{6} \\times \\frac{3}{10} = \\;?",
      "1/4",
      "$\\frac{5 \\times 3}{6 \\times 10} = \\frac{15}{60} = \\frac{1}{4}$.",
      "Multiply numerators and denominators, then simplify.",
      ["0.25"],
    ),
    answer(
      "y8-nop-frd-i3",
      "Evaluate $\\frac{4}{5} \\div \\frac{2}{3}$.",
      "\\frac{4}{5} \\div \\frac{2}{3} = \\;?",
      "6/5",
      "Keep-change-flip: $\\frac{4}{5} \\times \\frac{3}{2} = \\frac{12}{10} = \\frac{6}{5}$.",
      "Flip the second fraction and multiply.",
      ["1 1/5", "1.2"],
    ),
    choice(
      "y8-nop-frd-i4",
      "Which decimal is equal to $\\frac{5}{8}$?",
      "C",
      ["$0.5$", "$0.58$", "$0.625$", "$0.8$"],
      "$5 \\div 8 = 0.625$.",
      "Divide the numerator by the denominator.",
    ),
    answer(
      "y8-nop-frd-i5",
      "A recipe uses $\\frac{2}{3}$ cup of flour and $\\frac{1}{4}$ cup of sugar. How much dry ingredient is that in total?",
      "\\frac{2}{3} + \\frac{1}{4} = \\;?",
      "11/12",
      "LCD is 12. $\\frac{2}{3} = \\frac{8}{12}$, $\\frac{1}{4} = \\frac{3}{12}$. Total = $\\frac{11}{12}$ cup.",
      "Find a common denominator for 3 and 4.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding denominators when adding fractions: $\\frac{1}{3} + \\frac{1}{4} = \\frac{2}{7}$.",
      fix: "Only add numerators, never denominators. Find a common denominator first.",
    },
    {
      mistake: "Forgetting to find a common denominator before adding or subtracting.",
      fix: "Before adding or subtracting fractions, always rewrite both fractions with the same denominator.",
    },
    {
      mistake: "Dividing fractions by dividing numerators and denominators separately.",
      fix: "To divide fractions, flip the second fraction and multiply: keep-change-flip.",
    },
    {
      mistake: "Converting $\\frac{3}{4}$ to $0.34$ instead of $0.75$.",
      fix: "Divide the top by the bottom: $3 \\div 4 = 0.75$, not $3$ and $4$ placed side by side.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-frd-m1",
      "Evaluate $\\frac{2}{5} + \\frac{1}{3}$.",
      "\\frac{2}{5} + \\frac{1}{3} = \\;?",
      "11/15",
      "LCD is 15. $\\frac{2}{5} = \\frac{6}{15}$, $\\frac{1}{3} = \\frac{5}{15}$. Sum = $\\frac{11}{15}$.",
      "Find a common denominator for 5 and 3.",
    ),
    answer(
      "y8-nop-frd-m2",
      "Evaluate $\\frac{5}{6} - \\frac{1}{3}$.",
      "\\frac{5}{6} - \\frac{1}{3} = \\;?",
      "1/2",
      "LCD is 6. $\\frac{1}{3} = \\frac{2}{6}$. So $\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$.",
      "Rewrite $\\frac{1}{3}$ with denominator 6.",
      ["0.5"],
    ),
    choice(
      "y8-nop-frd-m3",
      "Which is the correct method for $\\frac{3}{4} \\div \\frac{9}{8}$?",
      "A",
      [
        "\\(\\frac{3}{4} \\times \\frac{8}{9}\\)",
        "\\(\\frac{3}{4} \\times \\frac{9}{8}\\)",
        "\\(\\frac{4}{3} \\times \\frac{9}{8}\\)",
        "\\(\\frac{3 \\div 9}{4 \\div 8}\\)",
      ],
      "Division: keep the first fraction, flip the second, multiply. So $\\frac{3}{4} \\times \\frac{8}{9}$.",
      "Apply the keep-change-flip rule for dividing fractions.",
    ),
    answer(
      "y8-nop-frd-m4",
      "Evaluate $\\frac{3}{4} \\div \\frac{9}{8}$.",
      "\\frac{3}{4} \\div \\frac{9}{8} = \\;?",
      "2/3",
      "$\\frac{3}{4} \\times \\frac{8}{9} = \\frac{24}{36} = \\frac{2}{3}$.",
      "Flip the second fraction and multiply.",
    ),
    answer(
      "y8-nop-frd-m5",
      "Convert $\\frac{7}{8}$ to a decimal.",
      "\\frac{7}{8} = \\;?",
      "0.875",
      "$7 \\div 8 = 0.875$.",
      "Divide the numerator by the denominator.",
    ),
    answer(
      "y8-nop-frd-m6",
      "Evaluate $1\\frac{1}{2} \\times \\frac{2}{3}$.",
      "1\\frac{1}{2} \\times \\frac{2}{3} = \\;?",
      "1",
      "Convert: $1\\frac{1}{2} = \\frac{3}{2}$. Then $\\frac{3}{2} \\times \\frac{2}{3} = \\frac{6}{6} = 1$.",
      "Convert the mixed number to an improper fraction first.",
    ),
    choice(
      "y8-nop-frd-m7",
      "Which fraction is equivalent to $0.4$?",
      "B",
      ["$\\frac{4}{100}$", "$\\frac{2}{5}$", "$\\frac{4}{5}$", "$\\frac{1}{4}$"],
      "$0.4 = \\frac{4}{10} = \\frac{2}{5}$.",
      "Write $0.4$ as a fraction with denominator 10, then simplify.",
    ),
    answer(
      "y8-nop-frd-m8",
      "Evaluate $\\frac{7}{10} - \\frac{2}{5}$.",
      "\\frac{7}{10} - \\frac{2}{5} = \\;?",
      "3/10",
      "LCD is 10. $\\frac{2}{5} = \\frac{4}{10}$. So $\\frac{7}{10} - \\frac{4}{10} = \\frac{3}{10}$.",
      "Rewrite $\\frac{2}{5}$ with denominator 10.",
      ["0.3"],
    ),
    answer(
      "y8-nop-frd-m9",
      "A length of $\\frac{3}{4}$ m is cut from a piece of rope $1\\frac{1}{2}$ m long. How much remains?",
      "1\\frac{1}{2} - \\frac{3}{4} = \\;?",
      "3/4",
      "$1\\frac{1}{2} = \\frac{6}{4}$. So $\\frac{6}{4} - \\frac{3}{4} = \\frac{3}{4}$ m.",
      "Convert the mixed number to quarters, then subtract.",
      ["0.75"],
    ),
    answer(
      "y8-nop-frd-m10",
      "Evaluate $2\\frac{1}{3} + 1\\frac{1}{2}$.",
      "2\\frac{1}{3} + 1\\frac{1}{2} = \\;?",
      "23/6",
      "$2\\frac{1}{3} = \\frac{7}{3}$, $1\\frac{1}{2} = \\frac{3}{2}$. LCD 6: $\\frac{14}{6} + \\frac{9}{6} = \\frac{23}{6}$.",
      "Convert both mixed numbers to improper fractions, then find a common denominator.",
      ["3 5/6"],
    ),
  ],
};

// ── Lesson 3: Percentages and Fractions ──────────────────────────────────────

const percentagesAndFractions: LessonContent = {
  description:
    "Convert between percentages, fractions and decimals, express one quantity as a percentage of another, and find a percentage of an amount.",
  learningIntention:
    "Convert fluently between percentages, fractions and decimals, and calculate a percentage of a quantity.",
  successCriteria: [
    "Convert a percentage to a fraction in simplest form.",
    "Convert a percentage to a decimal by dividing by 100.",
    "Find a percentage of an amount by multiplying by the decimal equivalent.",
    "Express one quantity as a percentage of another.",
  ],
  teaching: {
    paragraphs: [
      "A percentage means 'out of 100'. Every percentage can be written as a fraction with denominator 100 and simplified: $35\\% = \\frac{35}{100} = \\frac{7}{20}$.",
      "Converting to a decimal is a single step — divide by 100, which moves the decimal point two places left: $35\\% = 0.35$ and $8\\% = 0.08$.",
      "To find a percentage of an amount, convert the percentage to a decimal and multiply. For example, $30\\%$ of $80 = 0.30 \\times 80 = 24$.",
      "To express one quantity as a percentage of another, divide the part by the whole and multiply by 100. For example, 18 out of 24 is $\\frac{18}{24} \\times 100 = 75\\%$.",
    ],
    latexBlocks: [
      "p\\% = \\frac{p}{100}",
      "p\\% \\text{ of } Q = \\frac{p}{100} \\times Q",
      "\\text{Percentage} = \\frac{\\text{part}}{\\text{whole}} \\times 100",
    ],
  },
  workedExamples: [
    {
      title: "Convert a percentage to a fraction and decimal",
      questionLatex: "\\text{Write }45\\%\\text{ as a fraction and a decimal.}",
      steps: [
        { explanation: "Write as a fraction over 100 and simplify.", latex: "\\frac{45}{100} = \\frac{9}{20}" },
        { explanation: "Divide by 100 to get the decimal.", latex: "45 \\div 100 = 0.45" },
      ],
      finalAnswerLatex: "\\frac{9}{20} = 0.45",
    } as WorkedExample,
    {
      title: "Find a percentage of an amount",
      questionLatex: "\\text{Find }35\\%\\text{ of }120.",
      steps: [
        { explanation: "Convert 35% to a decimal.", latex: "35\\% = 0.35" },
        { explanation: "Multiply by the amount.", latex: "0.35 \\times 120 = 42" },
      ],
      finalAnswerLatex: "42",
    } as WorkedExample,
    {
      title: "Express one quantity as a percentage of another",
      questionLatex: "\\text{What percentage is }15\\text{ out of }60?",
      steps: [
        { explanation: "Divide the part by the whole.", latex: "\\frac{15}{60} = 0.25" },
        { explanation: "Multiply by 100 to convert to a percentage.", latex: "0.25 \\times 100 = 25\\%" },
      ],
      finalAnswerLatex: "25\\%",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-pf-g1",
      "Which decimal is equal to $40\\%$?",
      "C",
      ["$4$", "$0.004$", "$0.4$", "$0.04$"],
      "$40\\% = 40 \\div 100 = 0.4$. Moving the decimal point two places left gives 0.4.",
      "Divide the percentage number by 100.",
    ),
    answer(
      "y8-nop-pf-g2",
      "Convert $60\\%$ to a fraction in simplest form.",
      "60\\% = \\frac{60}{100} = \\;?",
      "3/5",
      "$\\frac{60}{100} = \\frac{3}{5}$ after dividing numerator and denominator by 20.",
      "Write $\\frac{60}{100}$ and simplify by dividing by the highest common factor.",
    ),
    answer(
      "y8-nop-pf-g3",
      "Find $25\\%$ of $80$.",
      "25\\% \\text{ of } 80 = \\;?",
      "20",
      "$25\\% = 0.25$, so $0.25 \\times 80 = 20$.",
      "Convert $25\\%$ to a decimal, then multiply by 80.",
    ),
    answer(
      "y8-nop-pf-g4",
      "What percentage is $12$ out of $48$?",
      "\\frac{12}{48} \\times 100 = \\;?",
      "25",
      "$\\frac{12}{48} = 0.25$, and $0.25 \\times 100 = 25\\%$.",
      "Divide 12 by 48, then multiply by 100.",
      ["25%"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-pf-i1",
      "Convert $15\\%$ to a decimal.",
      "15\\% = \\;?",
      "0.15",
      "$15 \\div 100 = 0.15$.",
      "Move the decimal point two places to the left.",
    ),
    answer(
      "y8-nop-pf-i2",
      "Find $20\\%$ of $65$.",
      "20\\% \\text{ of } 65 = \\;?",
      "13",
      "$0.20 \\times 65 = 13$.",
      "Convert $20\\%$ to $0.20$, then multiply.",
    ),
    answer(
      "y8-nop-pf-i3",
      "Express $18$ out of $72$ as a percentage.",
      "\\frac{18}{72} \\times 100 = \\;?",
      "25",
      "$\\frac{18}{72} = 0.25$, and $0.25 \\times 100 = 25\\%$.",
      "Divide 18 by 72, then multiply by 100.",
      ["25%"],
    ),
    choice(
      "y8-nop-pf-i4",
      "A student scored 36 out of 45. Which correctly finds the percentage score?",
      "A",
      [
        "\\(\\frac{36}{45} \\times 100\\)",
        "\\(\\frac{45}{36} \\times 100\\)",
        "\\(36 \\times 45\\)",
        "\\(36 + 45\\)",
      ],
      "Percentage = (part ÷ whole) × 100 = (36 ÷ 45) × 100 = 80%.",
      "The part goes on top, the whole goes on the bottom.",
    ),
    answer(
      "y8-nop-pf-i5",
      "A class has 30 students. $70\\%$ brought their lunch. How many students brought lunch?",
      "70\\% \\text{ of } 30 = \\;?",
      "21",
      "$0.70 \\times 30 = 21$ students.",
      "Convert $70\\%$ to a decimal, then multiply by the total.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing $5\\%$ as $0.5$ instead of $0.05$.",
      fix: "Move the decimal point two places left: $5\\% = 5 \\div 100 = 0.05$.",
    },
    {
      mistake: "Multiplying by the percentage number directly: $30\\%$ of $50 = 30 \\times 50 = 1500$.",
      fix: "Convert to a decimal first: $30\\% = 0.30$, then $0.30 \\times 50 = 15$.",
    },
    {
      mistake: "Dividing the whole by the part when expressing as a percentage.",
      fix: "Percentage = (part ÷ whole) × 100. The smaller quantity goes on top.",
    },
    {
      mistake: "Confusing $\\frac{3}{5}$ with $35\\%$.",
      fix: "$\\frac{3}{5} = 0.6 = 60\\%$. Convert by dividing: $3 \\div 5 = 0.6$, then multiply by 100.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-pf-m1",
      "Convert $75\\%$ to a fraction in simplest form.",
      "75\\% = \\;?",
      "3/4",
      "$\\frac{75}{100} = \\frac{3}{4}$ after dividing by 25.",
      "Write as a fraction over 100 and simplify.",
    ),
    answer(
      "y8-nop-pf-m2",
      "Find $12\\%$ of $200$.",
      "12\\% \\text{ of } 200 = \\;?",
      "24",
      "$0.12 \\times 200 = 24$.",
      "Convert to a decimal and multiply.",
    ),
    choice(
      "y8-nop-pf-m3",
      "Which percentage–decimal pair is correct?",
      "B",
      ["$6\\% = 0.6$", "$6\\% = 0.06$", "$6\\% = 6.0$", "$6\\% = 0.006$"],
      "$6\\% = 6 \\div 100 = 0.06$. Two places left from 6 gives 0.06.",
      "Divide by 100 to convert a percentage to a decimal.",
    ),
    answer(
      "y8-nop-pf-m4",
      "What percentage is $9$ out of $36$?",
      "\\frac{9}{36} \\times 100 = \\;?",
      "25",
      "$\\frac{9}{36} = 0.25$, and $0.25 \\times 100 = 25\\%$.",
      "Divide 9 by 36, then multiply by 100.",
      ["25%"],
    ),
    answer(
      "y8-nop-pf-m5",
      "Find $8\\%$ of $350$.",
      "8\\% \\text{ of } 350 = \\;?",
      "28",
      "$0.08 \\times 350 = 28$.",
      "Convert $8\\%$ to $0.08$, then multiply.",
    ),
    answer(
      "y8-nop-pf-m6",
      "A bag of rice weighs $2$ kg. $15\\%$ is wasted. How many grams are wasted?",
      "15\\% \\text{ of } 2000 = \\;?",
      "300",
      "$0.15 \\times 2000 = 300$ g.",
      "Convert the weight to grams first, then find $15\\%$.",
    ),
    choice(
      "y8-nop-pf-m7",
      "A student answers 42 out of 56 questions correctly. What is the percentage correct?",
      "C",
      ["$56\\%$", "$66\\%$", "$75\\%$", "$42\\%$"],
      "$\\frac{42}{56} \\times 100 = 0.75 \\times 100 = 75\\%$.",
      "Divide the score by the total, then multiply by 100.",
    ),
    answer(
      "y8-nop-pf-m8",
      "Convert $\\frac{3}{8}$ to a percentage.",
      "\\frac{3}{8} \\times 100 = \\;?",
      "37.5",
      "$3 \\div 8 = 0.375$, and $0.375 \\times 100 = 37.5\\%$.",
      "Divide the numerator by the denominator, then multiply by 100.",
      ["37.5%"],
    ),
    answer(
      "y8-nop-pf-m9",
      "In a survey, $45$ out of $180$ students prefer sport. Express this as a percentage.",
      "\\frac{45}{180} \\times 100 = \\;?",
      "25",
      "$\\frac{45}{180} = 0.25$, and $0.25 \\times 100 = 25\\%$.",
      "Divide the part by the total, then multiply by 100.",
      ["25%"],
    ),
    answer(
      "y8-nop-pf-m10",
      "Find $17.5\\%$ of $80$.",
      "17.5\\% \\text{ of } 80 = \\;?",
      "14",
      "$0.175 \\times 80 = 14$.",
      "Convert $17.5\\%$ to $0.175$, then multiply.",
    ),
  ],
};

// ── Lesson 4: Order of Operations ────────────────────────────────────────────

const orderOfOperations: LessonContent = {
  description:
    "Apply the order of operations (BODMAS) to evaluate numerical expressions involving brackets, powers, multiplication, division, addition and subtraction.",
  learningIntention:
    "Evaluate multi-operation expressions using the correct order: brackets, then powers, then multiplication and division left-to-right, then addition and subtraction left-to-right.",
  successCriteria: [
    "State the correct order of operations (BODMAS).",
    "Evaluate expressions by working through operations in the correct sequence.",
    "Identify and correct errors caused by applying operations in the wrong order.",
    "Evaluate expressions involving nested brackets.",
  ],
  teaching: {
    paragraphs: [
      "When an expression has more than one operation, the order matters. $2 + 3 \\times 4$ does not equal $20$ — it equals $14$, because multiplication is done before addition.",
      "The agreed order is BODMAS: Brackets first, then Other (powers and roots), then Division and Multiplication left to right, then Addition and Subtraction left to right.",
      "For example, $3 + 2 \\times (8 - 5)^2$: start inside the bracket to get $3$, then square to get $9$, then multiply to get $18$, then add to get $21$.",
      "When operations have the same priority level — like multiplication and division — work strictly left to right. $12 \\div 4 \\times 3 = 3 \\times 3 = 9$, not $12 \\div 12 = 1$.",
    ],
    latexBlocks: [
      "\\text{BODMAS: } \\underbrace{\\text{B}}_{\\text{Brackets}} \\; \\underbrace{\\text{O}}_{\\text{Orders}} \\; \\underbrace{\\text{DM}}_{\\div\\text{ then }\\times} \\; \\underbrace{\\text{AS}}_{+\\text{ then }-}",
      "2 + 3 \\times 4 = 2 + 12 = 14",
      "(2 + 3) \\times 4 = 5 \\times 4 = 20",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate using BODMAS",
      questionLatex: "\\text{Evaluate }10 - 2 \\times 3 + 1.",
      steps: [
        { explanation: "Multiplication is done before addition or subtraction.", latex: "2 \\times 3 = 6" },
        { explanation: "Work left to right for addition and subtraction.", latex: "10 - 6 + 1 = 4 + 1 = 5" },
      ],
      finalAnswerLatex: "5",
    } as WorkedExample,
    {
      title: "Evaluate with brackets and a power",
      questionLatex: "\\text{Evaluate }(5 + 1)^2 \\div 4.",
      steps: [
        { explanation: "Evaluate inside the bracket first.", latex: "5 + 1 = 6" },
        { explanation: "Apply the power.", latex: "6^2 = 36" },
        { explanation: "Then divide.", latex: "36 \\div 4 = 9" },
      ],
      finalAnswerLatex: "9",
    } as WorkedExample,
    {
      title: "Division and multiplication left to right",
      questionLatex: "\\text{Evaluate }24 \\div 6 \\times 2.",
      steps: [
        { explanation: "Division and multiplication are equal priority; work left to right.", latex: "24 \\div 6 = 4" },
        { explanation: "Then multiply.", latex: "4 \\times 2 = 8" },
      ],
      finalAnswerLatex: "8",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-oo-g1",
      "In BODMAS, which operation is performed first?",
      "A",
      ["Brackets", "Division", "Multiplication", "Addition"],
      "BODMAS: Brackets are evaluated first, before all other operations.",
      "Recall the order: B → O → DM → AS.",
    ),
    answer(
      "y8-nop-oo-g2",
      "Evaluate $3 + 4 \\times 2$.",
      "3 + 4 \\times 2 = \\;?",
      "11",
      "Multiplication before addition: $4 \\times 2 = 8$, then $3 + 8 = 11$.",
      "Perform the multiplication before adding.",
    ),
    answer(
      "y8-nop-oo-g3",
      "Evaluate $(3 + 4) \\times 2$.",
      "(3 + 4) \\times 2 = \\;?",
      "14",
      "Brackets first: $3 + 4 = 7$, then $7 \\times 2 = 14$.",
      "Evaluate the expression inside the brackets first.",
    ),
    answer(
      "y8-nop-oo-g4",
      "Evaluate $20 - 3^2 + 1$.",
      "20 - 3^2 + 1 = \\;?",
      "12",
      "Powers before subtraction: $3^2 = 9$, then $20 - 9 + 1 = 11 + 1 = 12$.",
      "Apply the power before adding or subtracting.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-oo-i1",
      "Evaluate $5 + 6 \\times 3 - 2$.",
      "5 + 6 \\times 3 - 2 = \\;?",
      "21",
      "$6 \\times 3 = 18$, then $5 + 18 - 2 = 21$.",
      "Handle the multiplication before adding or subtracting.",
    ),
    answer(
      "y8-nop-oo-i2",
      "Evaluate $24 \\div 6 \\times 2$.",
      "24 \\div 6 \\times 2 = \\;?",
      "8",
      "Division and multiplication: left to right. $24 \\div 6 = 4$, then $4 \\times 2 = 8$.",
      "Work left to right when operations have equal priority.",
    ),
    answer(
      "y8-nop-oo-i3",
      "Evaluate $(8 - 3)^2 + 6$.",
      "(8 - 3)^2 + 6 = \\;?",
      "31",
      "Bracket: $8 - 3 = 5$. Power: $5^2 = 25$. Addition: $25 + 6 = 31$.",
      "Work through B → O → A in order.",
    ),
    choice(
      "y8-nop-oo-i4",
      "A student evaluates $10 - 2 \\times 4$ as $(10 - 2) \\times 4 = 32$. What was the error?",
      "B",
      [
        "They forgot to subtract.",
        "They added brackets that were not there, performing subtraction before multiplication.",
        "They used the wrong order — addition should come before subtraction.",
        "They should have divided instead of multiplied.",
      ],
      "Without brackets, multiplication comes before subtraction: $10 - 2 \\times 4 = 10 - 8 = 2$, not 32.",
      "Compare the expression with and without the brackets the student imagined.",
    ),
    answer(
      "y8-nop-oo-i5",
      "Evaluate $3 \\times (2 + 4)^2 \\div 9$.",
      "3 \\times (2 + 4)^2 \\div 9 = \\;?",
      "12",
      "Bracket: $2 + 4 = 6$. Power: $6^2 = 36$. Left to right: $3 \\times 36 = 108$, then $108 \\div 9 = 12$.",
      "Work through B → O → then left to right for × and ÷.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Evaluating left to right without applying BODMAS: $2 + 3 \\times 4 = 5 \\times 4 = 20$.",
      fix: "Multiplication and division must be done before addition and subtraction: $2 + 3 \\times 4 = 2 + 12 = 14$.",
    },
    {
      mistake: "Doing multiplication before division regardless of position: $12 \\div 4 \\times 3 = 12 \\div 12 = 1$.",
      fix: "Multiplication and division have equal priority. Work left to right: $12 \\div 4 = 3$, then $3 \\times 3 = 9$.",
    },
    {
      mistake: "Forgetting to apply the power to the full bracket result.",
      fix: "Evaluate inside the bracket completely before squaring: $(2 + 3)^2 = 5^2 = 25$, not $2^2 + 3^2 = 13$.",
    },
    {
      mistake: "Treating nested brackets incorrectly by working outside-in.",
      fix: "Always evaluate the innermost bracket first and work outward.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-oo-m1",
      "Evaluate $8 + 2 \\times 5$.",
      "8 + 2 \\times 5 = \\;?",
      "18",
      "$2 \\times 5 = 10$, then $8 + 10 = 18$.",
      "Multiplication before addition.",
    ),
    answer(
      "y8-nop-oo-m2",
      "Evaluate $36 \\div 9 \\times 2$.",
      "36 \\div 9 \\times 2 = \\;?",
      "8",
      "Left to right: $36 \\div 9 = 4$, then $4 \\times 2 = 8$.",
      "Equal-priority operations go left to right.",
    ),
    choice(
      "y8-nop-oo-m3",
      "What is the value of $4 + 3^2 \\times 2$?",
      "D",
      ["$98$", "$50$", "$26$", "$22$"],
      "Power first: $3^2 = 9$. Multiply: $9 \\times 2 = 18$. Add: $4 + 18 = 22$.",
      "Apply O (powers) before M (multiplication) before A (addition).",
    ),
    answer(
      "y8-nop-oo-m4",
      "Evaluate $(10 - 4) \\times (2 + 3)$.",
      "(10 - 4) \\times (2 + 3) = \\;?",
      "30",
      "Brackets: $10 - 4 = 6$ and $2 + 3 = 5$. Multiply: $6 \\times 5 = 30$.",
      "Evaluate both brackets before multiplying.",
    ),
    answer(
      "y8-nop-oo-m5",
      "Evaluate $50 - 4 \\times (3 + 2)^2$.",
      "50 - 4 \\times (3 + 2)^2 = \\;?",
      "-50",
      "Bracket: $3 + 2 = 5$. Power: $5^2 = 25$. Multiply: $4 \\times 25 = 100$. Subtract: $50 - 100 = -50$.",
      "Follow B → O → M → S in strict order.",
      ["−50"],
    ),
    choice(
      "y8-nop-oo-m6",
      "Which expression has a value of $10$?",
      "C",
      [
        "\\(2 + 4 \\times 3\\)",
        "\\((2 + 4) \\times 3\\)",
        "\\(20 \\div (4 - 2)\\)",
        "\\(20 \\div 4 - 2\\)",
      ],
      "$20 \\div (4 - 2) = 20 \\div 2 = 10$.",
      "Evaluate each expression carefully using BODMAS.",
    ),
    answer(
      "y8-nop-oo-m7",
      "Evaluate $2 \\times 3^2 - 4 \\times 2 + 1$.",
      "2 \\times 3^2 - 4 \\times 2 + 1 = \\;?",
      "11",
      "Power: $3^2 = 9$. Multiplications: $2 \\times 9 = 18$ and $4 \\times 2 = 8$. Then $18 - 8 + 1 = 11$.",
      "Handle powers, then all multiplications, then add/subtract left to right.",
    ),
    answer(
      "y8-nop-oo-m8",
      "Evaluate $100 \\div (2 + 3)^2$.",
      "100 \\div (2 + 3)^2 = \\;?",
      "4",
      "Bracket: $2 + 3 = 5$. Power: $5^2 = 25$. Divide: $100 \\div 25 = 4$.",
      "B → O → D in order.",
    ),
    answer(
      "y8-nop-oo-m9",
      "Evaluate $3 + 4 \\times [10 - (2 + 3)]$.",
      "3 + 4 \\times [10 - (2 + 3)] = \\;?",
      "23",
      "Inner bracket: $2 + 3 = 5$. Outer bracket: $10 - 5 = 5$. Multiply: $4 \\times 5 = 20$. Add: $3 + 20 = 23$.",
      "Work from the innermost bracket outwards.",
    ),
    choice(
      "y8-nop-oo-m10",
      "A student evaluates $5 + 7 \\times 5$ and gets $60$. What error did they make?",
      "B",
      [
        "They forgot to include the 5 at the end.",
        "They added first: \\((5 + 7) \\times 5 = 60\\) instead of multiplying first.",
        "They applied BODMAS correctly.",
        "They divided instead of multiplied.",
      ],
      "Correct: $7 \\times 5 = 35$, then $5 + 35 = 40$. The student got 60 by adding first: $(5 + 7) \\times 5 = 12 \\times 5 = 60$.",
      "Identify which operation the student applied first to produce 60.",
    ),
  ],
};

// ── Lesson 5: Powers, Roots and Squares ──────────────────────────────────────

const powersRootsAndSquares: LessonContent = {
  description:
    "Evaluate powers and square roots, apply index notation, identify perfect squares and square roots, and use these in calculations.",
  learningIntention:
    "Evaluate expressions involving integer powers and square roots, and identify perfect squares.",
  successCriteria: [
    "Write repeated multiplication using index notation.",
    "Evaluate powers of integers, including negative bases.",
    "Identify perfect squares from 1 to 144 and their square roots.",
    "Evaluate square roots of perfect squares and estimate square roots of non-perfect squares.",
  ],
  teaching: {
    paragraphs: [
      "Index notation is a short way of writing repeated multiplication. $3^4$ means $3 \\times 3 \\times 3 \\times 3$. The base is 3 and the index (or exponent) is 4.",
      "A perfect square is the result of multiplying a whole number by itself: $1, 4, 9, 16, 25, \\ldots$ The square root reverses this — $\\sqrt{25} = 5$ because $5^2 = 25$.",
      "When the base is negative, the sign of the result depends on the index. A negative base raised to an even power gives a positive result; to an odd power gives a negative result. For example, $(-2)^3 = -8$ but $(-2)^4 = 16$.",
      "For non-perfect squares like $\\sqrt{20}$, the result lies between the two nearest perfect squares: $\\sqrt{16} = 4$ and $\\sqrt{25} = 5$, so $\\sqrt{20}$ is between 4 and 5, closer to 4.5.",
    ],
    latexBlocks: [
      "a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ factors}}",
      "\\sqrt{a^2} = a \\quad (a \\geq 0)",
      "(-a)^{\\text{even}} = +, \\quad (-a)^{\\text{odd}} = -",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a power",
      questionLatex: "\\text{Evaluate }2^5.",
      steps: [
        { explanation: "Write out the repeated multiplication.", latex: "2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2" },
        { explanation: "Multiply step by step.", latex: "4 \\times 2 = 8, \\; 8 \\times 2 = 16, \\; 16 \\times 2 = 32" },
      ],
      finalAnswerLatex: "2^5 = 32",
    } as WorkedExample,
    {
      title: "Evaluate a negative base",
      questionLatex: "\\text{Evaluate }(-3)^3.",
      steps: [
        { explanation: "Write out the repeated multiplication.", latex: "(-3)^3 = (-3) \\times (-3) \\times (-3)" },
        { explanation: "First two factors: same signs give positive.", latex: "(-3) \\times (-3) = 9" },
        { explanation: "Multiply by the third factor: different signs give negative.", latex: "9 \\times (-3) = -27" },
      ],
      finalAnswerLatex: "(-3)^3 = -27",
    } as WorkedExample,
    {
      title: "Estimate a square root",
      questionLatex: "\\text{Estimate }\\sqrt{50}\\text{ to one decimal place.}",
      steps: [
        { explanation: "Identify the nearest perfect squares.", latex: "\\sqrt{49} = 7, \\quad \\sqrt{64} = 8" },
        { explanation: "$\\sqrt{50}$ is just above 7 since 50 is just above 49.", latex: "\\sqrt{50} \\approx 7.1" },
      ],
      finalAnswerLatex: "\\sqrt{50} \\approx 7.1",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-pr-g1",
      "What does $3^4$ mean?",
      "C",
      [
        "\\(3 \\times 4\\)",
        "\\(3 + 3 + 3 + 3\\)",
        "\\(3 \\times 3 \\times 3 \\times 3\\)",
        "\\(4 \\times 4 \\times 4\\)",
      ],
      "$3^4$ means the base 3 multiplied by itself 4 times: $3 \\times 3 \\times 3 \\times 3 = 81$.",
      "The index tells you how many times the base is multiplied by itself.",
    ),
    answer(
      "y8-nop-pr-g2",
      "Evaluate $5^3$.",
      "5^3 = \\;?",
      "125",
      "$5^3 = 5 \\times 5 \\times 5 = 25 \\times 5 = 125$.",
      "Multiply $5 \\times 5$ first, then multiply by 5 again.",
    ),
    answer(
      "y8-nop-pr-g3",
      "Evaluate $\\sqrt{64}$.",
      "\\sqrt{64} = \\;?",
      "8",
      "$8^2 = 64$, so $\\sqrt{64} = 8$.",
      "Ask: what number multiplied by itself gives 64?",
    ),
    answer(
      "y8-nop-pr-g4",
      "Evaluate $(-2)^4$.",
      "(-2)^4 = \\;?",
      "16",
      "$(-2)^4 = (-2) \\times (-2) \\times (-2) \\times (-2) = 4 \\times 4 = 16$. Even power of a negative is positive.",
      "An even index always produces a positive result, even with a negative base.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-pr-i1",
      "Evaluate $4^3$.",
      "4^3 = \\;?",
      "64",
      "$4 \\times 4 = 16$, then $16 \\times 4 = 64$.",
      "Write out the repeated multiplication.",
    ),
    answer(
      "y8-nop-pr-i2",
      "Evaluate $\\sqrt{121}$.",
      "\\sqrt{121} = \\;?",
      "11",
      "$11^2 = 121$, so $\\sqrt{121} = 11$.",
      "Recall the perfect squares up to 144.",
    ),
    answer(
      "y8-nop-pr-i3",
      "Evaluate $(-3)^4$.",
      "(-3)^4 = \\;?",
      "81",
      "$(-3)^4 = (-3) \\times (-3) \\times (-3) \\times (-3) = 9 \\times 9 = 81$. Even power gives positive.",
      "An even power of a negative base is always positive.",
    ),
    choice(
      "y8-nop-pr-i4",
      "Between which two consecutive whole numbers does $\\sqrt{30}$ lie?",
      "B",
      ["4 and 5", "5 and 6", "6 and 7", "7 and 8"],
      "$\\sqrt{25} = 5$ and $\\sqrt{36} = 6$. Since $25 < 30 < 36$, we have $5 < \\sqrt{30} < 6$.",
      "Find the two perfect squares that 30 sits between.",
    ),
    answer(
      "y8-nop-pr-i5",
      "Evaluate $2^3 + 3^2$.",
      "2^3 + 3^2 = \\;?",
      "17",
      "$2^3 = 8$ and $3^2 = 9$. So $8 + 9 = 17$.",
      "Evaluate each power separately, then add.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Multiplying the base by the index: $3^4 = 3 \\times 4 = 12$ instead of $81$.",
      fix: "The index tells you how many times to multiply the base by itself: $3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$.",
    },
    {
      mistake: "Assuming $(-3)^2 = -9$ because the base is negative.",
      fix: "A negative base with an even index gives a positive result: $(-3)^2 = (-3) \\times (-3) = +9$.",
    },
    {
      mistake: "Confusing $\\sqrt{a + b}$ with $\\sqrt{a} + \\sqrt{b}$.",
      fix: "Square roots do not distribute over addition: $\\sqrt{9 + 16} = \\sqrt{25} = 5$, not $3 + 4 = 7$.",
    },
    {
      mistake: "Writing $2^3 = 6$ by multiplying base and index.",
      fix: "$2^3 = 2 \\times 2 \\times 2 = 8$. The index is a count of how many times 2 appears as a factor.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-pr-m1",
      "Evaluate $3^5$.",
      "3^5 = \\;?",
      "243",
      "$3^5 = 3 \\times 3 \\times 3 \\times 3 \\times 3 = 243$.",
      "Multiply step by step.",
    ),
    answer(
      "y8-nop-pr-m2",
      "Evaluate $\\sqrt{144}$.",
      "\\sqrt{144} = \\;?",
      "12",
      "$12^2 = 144$, so $\\sqrt{144} = 12$.",
      "Recall perfect squares up to $12^2$.",
    ),
    choice(
      "y8-nop-pr-m3",
      "What is $(-2)^5$?",
      "C",
      ["$32$", "$10$", "$-32$", "$-10$"],
      "$(-2)^5 = -2 \\times (-2)^4 = -2 \\times 16 = -32$. Odd power of a negative is negative.",
      "An odd power of a negative base gives a negative result.",
    ),
    answer(
      "y8-nop-pr-m4",
      "Evaluate $\\sqrt{169}$.",
      "\\sqrt{169} = \\;?",
      "13",
      "$13^2 = 169$, so $\\sqrt{169} = 13$.",
      "Check which perfect square equals 169.",
    ),
    answer(
      "y8-nop-pr-m5",
      "Evaluate $2^4 - \\sqrt{36}$.",
      "2^4 - \\sqrt{36} = \\;?",
      "10",
      "$2^4 = 16$ and $\\sqrt{36} = 6$. So $16 - 6 = 10$.",
      "Evaluate the power and root separately, then subtract.",
    ),
    choice(
      "y8-nop-pr-m6",
      "Which value is between $\\sqrt{70}$ and $\\sqrt{80}$?",
      "B",
      ["$7$", "$8.5$", "$9$", "$10$"],
      "$\\sqrt{64} = 8$ and $\\sqrt{81} = 9$, so $\\sqrt{70}$ and $\\sqrt{80}$ both lie between 8 and 9. $8.5$ fits.",
      "Find the perfect squares on either side of 70 and 80.",
    ),
    answer(
      "y8-nop-pr-m7",
      "Evaluate $(-4)^3$.",
      "(-4)^3 = \\;?",
      "-64",
      "$(-4)^3 = (-4) \\times (-4) \\times (-4) = 16 \\times (-4) = -64$.",
      "Odd power of a negative base gives a negative result.",
      ["−64"],
    ),
    answer(
      "y8-nop-pr-m8",
      "Evaluate $\\sqrt{4 \\times 25}$.",
      "\\sqrt{4 \\times 25} = \\;?",
      "10",
      "$4 \\times 25 = 100$, and $\\sqrt{100} = 10$.",
      "Evaluate inside the square root first.",
    ),
    answer(
      "y8-nop-pr-m9",
      "A square has area $196 \\text{ cm}^2$. Find the side length.",
      "\\sqrt{196} = \\;?",
      "14",
      "$14^2 = 196$, so each side is $\\sqrt{196} = 14$ cm.",
      "The side length of a square is the square root of its area.",
    ),
    choice(
      "y8-nop-pr-m10",
      "Which statement is correct?",
      "D",
      [
        "$\\sqrt{9 + 16} = \\sqrt{9} + \\sqrt{16} = 7$",
        "$(-5)^2 = -25$",
        "$3^4 = 3 \\times 4 = 12$",
        "$\\sqrt{9 + 16} = \\sqrt{25} = 5$",
      ],
      "$\\sqrt{9 + 16} = \\sqrt{25} = 5$. Square roots do not distribute over addition.",
      "Evaluate what is under the square root sign first.",
    ),
  ],
};

// ── Lesson 6: Estimation and Reasonableness ───────────────────────────────────

const estimationAndReasonableness: LessonContent = {
  description:
    "Use rounding, leading-digit estimation and benchmark values to estimate calculations, and judge whether answers to real-world problems are reasonable.",
  learningIntention:
    "Estimate the results of calculations using rounding and leading-digit strategies, and check whether answers are reasonable.",
  successCriteria: [
    "Round numbers to a specified number of significant figures or decimal places.",
    "Use leading-digit or front-end estimation to approximate a calculation.",
    "Identify when a calculated answer is unreasonable by comparing with an estimate.",
    "Apply estimation to real-world contexts such as shopping, measurement and time.",
  ],
  teaching: {
    paragraphs: [
      "Estimation means finding an approximate answer quickly, without exact arithmetic. It is used to check whether a precise answer is in the right ballpark — if your exact answer is far from your estimate, an error has likely been made.",
      "Leading-digit (front-end) estimation rounds each number to its first digit and uses those rounded values. For example, $487 + 312 \\approx 500 + 300 = 800$.",
      "When rounding to a decimal place or significant figure, look at the digit immediately to the right of the rounding position: 5 or more rounds up; less than 5 rounds down.",
      "Reasonableness checks are especially important in real-world problems. If a total cost comes out to $4000 when you expected around $40, a decimal-point error has almost certainly occurred.",
    ],
    latexBlocks: [
      "487 + 312 \\approx 500 + 300 = 800",
      "\\text{Round }3.746\\text{ to 1 d.p.: look at 4 (2nd d.p.) — round down} \\Rightarrow 3.7",
      "\\text{Round }3.76\\text{ to 1 d.p.: look at 6 (2nd d.p.) — round up} \\Rightarrow 3.8",
    ],
  },
  workedExamples: [
    {
      title: "Estimate a product using leading digits",
      questionLatex: "\\text{Estimate }38 \\times 52.",
      steps: [
        { explanation: "Round each number to the nearest ten (leading digit).", latex: "38 \\approx 40, \\quad 52 \\approx 50" },
        { explanation: "Multiply the rounded values.", latex: "40 \\times 50 = 2000" },
      ],
      finalAnswerLatex: "38 \\times 52 \\approx 2000",
    } as WorkedExample,
    {
      title: "Round to a given decimal place",
      questionLatex: "\\text{Round }7.483\\text{ to 1 decimal place.}",
      steps: [
        { explanation: "Identify the first decimal place digit (4) and the next digit (8).", latex: "7.\\underline{4}83" },
        { explanation: "Since 8 ≥ 5, round up the 4 to 5.", latex: "7.483 \\approx 7.5" },
      ],
      finalAnswerLatex: "7.5",
    } as WorkedExample,
    {
      title: "Check reasonableness of an answer",
      questionLatex: "\\text{A student calculates }\\$4.95 \\times 6 = \\$2.97.\\text{ Is this reasonable?}",
      steps: [
        { explanation: "Estimate: $5 × 6 = $30.", latex: "\\$5 \\times 6 = \\$30" },
        { explanation: "The calculated answer $2.97 is far below the estimate of $30, so an error has been made.", latex: "\\$2.97 \\ll \\$30" },
      ],
      finalAnswerLatex: "\\text{Not reasonable — likely a decimal-place error}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-nop-er-g1",
      "To round $6.847$ to 1 decimal place, which digit do you look at to decide?",
      "B",
      ["The digit 6", "The digit 4", "The digit 7", "The digit 8"],
      "The 1st decimal place is 8. To round it, look at the 2nd decimal place digit, which is 4. Since 4 < 5, the 8 stays: $6.847 \\approx 6.8$.",
      "Look at the digit immediately to the right of the rounding position.",
    ),
    answer(
      "y8-nop-er-g2",
      "Round $3.762$ to 1 decimal place.",
      "3.762 \\approx \\;?",
      "3.8",
      "The 1st decimal place is 7. The next digit is 6 ≥ 5, so round up: $3.762 \\approx 3.8$.",
      "Look at the 2nd decimal place to decide whether to round up or down.",
    ),
    answer(
      "y8-nop-er-g3",
      "Estimate $49 \\times 21$ using leading-digit estimation.",
      "49 \\times 21 \\approx \\;?",
      "1000",
      "$49 \\approx 50$ and $21 \\approx 20$. So $50 \\times 20 = 1000$.",
      "Round each number to its leading (first) digit, then multiply.",
    ),
    answer(
      "y8-nop-er-g4",
      "Round $0.0463$ to 2 decimal places.",
      "0.0463 \\approx \\;?",
      "0.05",
      "The 2nd decimal place is 4. The next digit is 6 ≥ 5, so round up: $0.0463 \\approx 0.05$.",
      "Count two digits after the decimal point, then look at the third digit.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-nop-er-i1",
      "Round $4.275$ to 2 decimal places.",
      "4.275 \\approx \\;?",
      "4.28",
      "2nd decimal place is 7. Next digit is 5 ≥ 5, so round up: $4.275 \\approx 4.28$.",
      "Look at the 3rd decimal place to decide.",
    ),
    answer(
      "y8-nop-er-i2",
      "Estimate $287 + 413$ using leading-digit estimation.",
      "287 + 413 \\approx \\;?",
      "700",
      "$287 \\approx 300$ and $413 \\approx 400$. So $300 + 400 = 700$.",
      "Round each number to its leading digit.",
    ),
    choice(
      "y8-nop-er-i3",
      "A student calculates $23 \\times 48 = 11.04$. Is this reasonable?",
      "B",
      [
        "Yes, $23 \\times 48$ is close to $10$.",
        "No, $20 \\times 50 = 1000$ so the answer should be close to $1000$.",
        "Yes, the exact answer is always smaller than the estimate.",
        "No, the answer should be close to $100$.",
      ],
      "Estimate: $20 \\times 50 = 1000$. The answer $11.04$ is far too small — a decimal error has occurred.",
      "Use leading-digit estimation to get a rough expected size.",
    ),
    answer(
      "y8-nop-er-i4",
      "Estimate $\\frac{598}{31}$ by rounding to leading digits.",
      "\\frac{598}{31} \\approx \\;?",
      "20",
      "$598 \\approx 600$ and $31 \\approx 30$. So $600 \\div 30 = 20$.",
      "Round numerator and denominator to leading digits, then divide.",
    ),
    answer(
      "y8-nop-er-i5",
      "A jacket costs $89.95. Estimate the cost of 4 jackets.",
      "\\$89.95 \\times 4 \\approx \\;?",
      "360",
      "$89.95 \\approx 90$. So $90 \\times 4 = 360$.",
      "Round the price to the nearest dollar, then multiply.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Looking at the wrong digit when rounding — using the digit at the rounding position instead of the next digit.",
      fix: "To round to 1 d.p., look at the 2nd decimal digit to decide: 5 or more rounds up, less than 5 rounds down.",
    },
    {
      mistake: "Rounding $4.35$ to 1 d.p. as $4.3$ instead of $4.4$.",
      fix: "The 2nd decimal place is 5, which rounds up: $4.35 \\approx 4.4$.",
    },
    {
      mistake: "Accepting any calculated answer without checking whether it is plausible.",
      fix: "Always estimate first. If your exact answer differs from your estimate by a large factor, recheck for a decimal or arithmetic error.",
    },
    {
      mistake: "Rounding both numbers up in an estimate, producing an overestimate that leads to accepting too-small answers.",
      fix: "Note whether your estimation strategy consistently over- or underestimates, and adjust your reasonableness check accordingly.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-nop-er-m1",
      "Round $8.356$ to 2 decimal places.",
      "8.356 \\approx \\;?",
      "8.36",
      "2nd decimal place is 5. Next digit is 6 ≥ 5, so round up: $8.356 \\approx 8.36$.",
      "Look at the 3rd decimal place digit.",
    ),
    answer(
      "y8-nop-er-m2",
      "Estimate $72 \\times 38$ using leading-digit estimation.",
      "72 \\times 38 \\approx \\;?",
      "2800",
      "$72 \\approx 70$ and $38 \\approx 40$. So $70 \\times 40 = 2800$.",
      "Round each factor to the leading digit.",
    ),
    choice(
      "y8-nop-er-m3",
      "Which correctly rounds $5.648$ to 1 decimal place?",
      "B",
      ["$5.7$", "$5.6$", "$6.0$", "$5.64$"],
      "1st decimal place is 6. Next digit is 4 < 5, so round down: $5.648 \\approx 5.6$.",
      "Look at the 2nd decimal place digit to decide whether to round up or down.",
    ),
    answer(
      "y8-nop-er-m4",
      "Estimate $\\frac{803}{42}$ using leading digits.",
      "\\frac{803}{42} \\approx \\;?",
      "20",
      "$803 \\approx 800$ and $42 \\approx 40$. So $800 \\div 40 = 20$.",
      "Round each number to its leading digit.",
    ),
    answer(
      "y8-nop-er-m5",
      "A phone costs $498 and a case costs $29. Estimate the total cost.",
      "\\$498 + \\$29 \\approx \\;?",
      "530",
      "$498 \\approx 500$ and $29 \\approx 30$. Estimate: $500 + 30 = 530$.",
      "Round each price to the nearest convenient value.",
    ),
    choice(
      "y8-nop-er-m6",
      "A student calculates $196 \\div 4 = 0.49$. Is this reasonable?",
      "B",
      [
        "Yes, dividing makes numbers smaller.",
        "No, \\(200 \\div 4 = 50\\) so the answer should be close to 50.",
        "Yes, $0.49$ is a valid answer for any division.",
        "No, the answer should be negative.",
      ],
      "Estimate: $200 \\div 4 = 50$. The answer $0.49$ is far too small — a decimal error has occurred.",
      "Estimate the division using rounded values first.",
    ),
    answer(
      "y8-nop-er-m7",
      "Round $0.00847$ to 3 decimal places.",
      "0.00847 \\approx \\;?",
      "0.008",
      "3rd decimal place is 8. Next digit is 4 < 5, so round down: $0.00847 \\approx 0.008$.",
      "Count three places after the decimal point and look at the fourth.",
    ),
    answer(
      "y8-nop-er-m8",
      "Estimate the cost of $6$ items at $\\$12.95$ each.",
      "\\$12.95 \\times 6 \\approx \\;?",
      "78",
      "$12.95 \\approx 13$. So $13 \\times 6 = 78$.",
      "Round the price to the nearest dollar.",
    ),
    answer(
      "y8-nop-er-m9",
      "A car travels $487$ km on $52$ litres of fuel. Estimate the fuel efficiency in km/L.",
      "487 \\div 52 \\approx \\;?",
      "10",
      "$487 \\approx 500$ and $52 \\approx 50$. So $500 \\div 50 = 10$ km/L.",
      "Round both values to leading digits, then divide.",
    ),
    choice(
      "y8-nop-er-m10",
      "Which estimate is closest to $317 \\times 4.8$?",
      "C",
      ["$120$", "$400$", "$1500$", "$3000$"],
      "$317 \\approx 300$ and $4.8 \\approx 5$. So $300 \\times 5 = 1500$.",
      "Round each factor to a convenient value and multiply.",
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "directed-numbers":           directedNumbers,
  "fractions-and-decimals":     fractionsAndDecimals,
  "percentages-and-fractions":  percentagesAndFractions,
  "order-of-operations":        orderOfOperations,
  "powers-roots-and-squares":   powersRootsAndSquares,
  "estimation-and-reasonableness": estimationAndReasonableness,
};

export function year8NumberOperationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics" || unit.slug !== "number-operations") {
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
