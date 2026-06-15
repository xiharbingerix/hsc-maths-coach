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
    hint: "Re-read the worked example in this lesson and apply the same steps.",
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
    hint: "Eliminate obviously wrong answers, then apply the key rule from this lesson.",
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
// Lesson 1 — Types and equivalence
// ─────────────────────────────────────────────────────────────────────────────

const fractionsTypesAndEquivalence: LessonContent = {
  description: "Classify fractions as proper, improper, or mixed numerals; convert between improper fractions and mixed numerals; find equivalent fractions; and simplify to lowest terms.",
  learningIntention: "Understand and work with different representations of fractions, including equivalent forms and simplest form.",
  successCriteria: [
    "Classify a fraction as proper, improper, or a mixed numeral.",
    "Convert an improper fraction to a mixed numeral and vice versa.",
    "Find equivalent fractions by multiplying or dividing numerator and denominator by the same number.",
    "Simplify a fraction to lowest terms by dividing by the highest common factor.",
    "Determine whether two fractions are equivalent.",
  ],
  teaching: {
    paragraphs: [
      "A fraction represents part of a whole. The bottom number (denominator) tells you how many equal parts the whole is divided into. The top number (numerator) tells you how many of those parts you have. So 3/4 means the whole is cut into 4 equal parts and you have 3 of them.",
      "A proper fraction has a numerator smaller than the denominator, like 3/4 or 2/5 — the value is less than 1. An improper fraction has a numerator equal to or larger than the denominator, like 7/4 or 9/3 — the value is 1 or more. A mixed numeral combines a whole number with a proper fraction, like 1 and 3/4, and is just another way of writing an improper fraction.",
      "Two fractions are equivalent when they represent the same amount. You create equivalent fractions by multiplying or dividing both the numerator and denominator by the same non-zero number. For example, 1/2 = 2/4 = 3/6 = 4/8 — the size of the piece changes, but the total amount does not. To simplify a fraction to lowest terms, divide both top and bottom by their highest common factor (HCF).",
      "The most common error is multiplying only the numerator or only the denominator. You must apply the same operation to both parts. Multiplying 1/2 by 3 on top only gives 3/2, which is a completely different (and larger) value than 1/2.",
    ],
    latexBlocks: [
      "\\text{Proper: }\\frac{a}{b}\\text{ where }a < b \\qquad \\text{Improper: }\\frac{a}{b}\\text{ where }a \\geq b",
      "\\text{Mixed numeral: }1\\tfrac{3}{4}=\\frac{4+3}{4}=\\frac{7}{4}",
      "\\text{Equivalent: }\\frac{1}{2}=\\frac{1\\times3}{2\\times3}=\\frac{3}{6}",
      "\\text{Simplify: }\\frac{12}{18}\\div\\frac{6}{6}=\\frac{2}{3}",
    ],
  },
  workedExamples: [
    {
      title: "Convert an improper fraction to a mixed numeral",
      questionLatex: "\\text{Write }\\dfrac{11}{4}\\text{ as a mixed numeral.}",
      steps: [
        { explanation: "Divide the numerator by the denominator to find how many wholes there are.", latex: "11 \\div 4 = 2 \\text{ remainder } 3" },
        { explanation: "The quotient is the whole number part and the remainder sits over the original denominator.", latex: "\\frac{11}{4} = 2\\tfrac{3}{4}" },
      ],
      finalAnswerLatex: "2\\tfrac{3}{4}",
    },
    {
      title: "Convert a mixed numeral to an improper fraction",
      questionLatex: "\\text{Write }3\\tfrac{2}{5}\\text{ as an improper fraction.}",
      steps: [
        { explanation: "Multiply the whole number by the denominator to find how many fifths are in the whole-number part.", latex: "3 \\times 5 = 15" },
        { explanation: "Add the numerator of the fraction part to that result.", latex: "15 + 2 = 17" },
        { explanation: "Write the total over the original denominator.", latex: "3\\tfrac{2}{5} = \\frac{17}{5}" },
      ],
      finalAnswerLatex: "\\dfrac{17}{5}",
    },
    {
      title: "Simplify a fraction to lowest terms",
      questionLatex: "\\text{Simplify }\\dfrac{18}{24}.",
      steps: [
        { explanation: "Find the highest common factor of 18 and 24.", latex: "\\text{HCF}(18, 24) = 6" },
        { explanation: "Divide both numerator and denominator by the HCF.", latex: "\\frac{18 \\div 6}{24 \\div 6} = \\frac{3}{4}" },
      ],
      finalAnswerLatex: "\\dfrac{3}{4}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-typ-g1",
      "Which of the following is an improper fraction?",
      "C",
      ["$\\dfrac{3}{7}$", "$2\\tfrac{1}{4}$", "$\\dfrac{9}{5}$", "$\\dfrac{1}{3}$"],
      "An improper fraction has a numerator greater than or equal to its denominator. Only 9/5 satisfies this — 9 > 5.",
    ),
    answer(
      "y7-frc-typ-g2",
      "Write the improper fraction as a mixed numeral.",
      "\\dfrac{13}{5}",
      "2 3/5",
      "13 divided by 5 is 2 remainder 3, so 13/5 = 2 and 3/5.",
      ["2 3/5", "2\\tfrac{3}{5}"]
    ),
    answer(
      "y7-frc-typ-g3",
      "Write the mixed numeral as an improper fraction.",
      "2\\tfrac{3}{4}",
      "11/4",
      "Multiply 2 by 4 to get 8, then add 3 to get 11. The denominator stays as 4, giving 11/4.",
      ["11 / 4"]
    ),
    answer(
      "y7-frc-typ-g4",
      "Simplify the fraction to lowest terms.",
      "\\dfrac{10}{15}",
      "2/3",
      "The HCF of 10 and 15 is 5. Dividing both by 5 gives 2/3.",
      ["2 / 3"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-typ-i1",
      "Write the improper fraction as a mixed numeral.",
      "\\dfrac{17}{6}",
      "2 5/6",
      "17 divided by 6 is 2 remainder 5, so 17/6 = 2 and 5/6.",
      ["2 5/6"]
    ),
    answer(
      "y7-frc-typ-i2",
      "Write the mixed numeral as an improper fraction.",
      "4\\tfrac{1}{3}",
      "13/3",
      "Multiply 4 by 3 to get 12, then add 1 to get 13. The denominator stays as 3, giving 13/3.",
      ["13 / 3"]
    ),
    answer(
      "y7-frc-typ-i3",
      "Simplify the fraction to lowest terms.",
      "\\dfrac{16}{24}",
      "2/3",
      "The HCF of 16 and 24 is 8. Dividing both by 8 gives 2/3.",
      ["2 / 3"]
    ),
    answer(
      "y7-frc-typ-i4",
      "A pizza is cut into 8 equal slices and you eat 5. Write this as a fraction in simplest form. Is it proper or improper?",
      "\\dfrac{5}{8}",
      "proper",
      "You ate 5 out of 8 slices, which is 5/8. Since 5 < 8, this is a proper fraction.",
      ["Proper", "PROPER"]
    ),
    answer(
      "y7-frc-typ-i5",
      "A recipe calls for 2 and 3/4 cups of flour. Write this amount as an improper fraction.",
      "2\\tfrac{3}{4}",
      "11/4",
      "Multiply 2 by 4 to get 8, then add 3 to get 11. The denominator stays as 4, giving 11/4 cups.",
      ["11 / 4"]
    ),
  ],
  commonMistakes: [
    { mistake: "When converting a mixed numeral, forgetting to add the numerator: writing 3 and 2/5 as 15/5 instead of 17/5.", fix: "After multiplying the whole number by the denominator, add the original numerator to that product." },
    { mistake: "Multiplying only the numerator to make an equivalent fraction: 1/3 becomes 3/3 instead of 3/9.", fix: "Whatever you multiply the numerator by, you must also multiply the denominator by the same number." },
    { mistake: "Dividing by a common factor that is not the highest: simplifying 18/24 by 2 to get 9/12 instead of going all the way to 3/4.", fix: "Find the HCF first, or keep dividing until no common factor remains." },
    { mistake: "Confusing improper fractions with mixed numerals — writing 7/4 as 1 and 7/4 instead of 1 and 3/4.", fix: "The remainder after division becomes the new numerator, not the original numerator." },
  ],
  masteryQuiz: [
    choice(
      "y7-frc-typ-m1",
      "Which fraction is equivalent to 2/3?",
      "B",
      ["$\\dfrac{4}{9}$", "$\\dfrac{8}{12}$", "$\\dfrac{6}{8}$", "$\\dfrac{3}{6}$"],
      "Multiply both numerator and denominator of 2/3 by 4: 2/3 = 8/12. Checking the others: 4/9 simplifies to 4/9, 6/8 simplifies to 3/4, and 3/6 simplifies to 1/2.",
    ),
    answer(
      "y7-frc-typ-m2",
      "Write the improper fraction as a mixed numeral.",
      "\\dfrac{19}{7}",
      "2 5/7",
      "19 divided by 7 is 2 remainder 5, so 19/7 = 2 and 5/7.",
      ["2 5/7"]
    ),
    answer(
      "y7-frc-typ-m3",
      "Write the mixed numeral as an improper fraction.",
      "5\\tfrac{2}{3}",
      "17/3",
      "Multiply 5 by 3 to get 15, then add 2 to get 17. The denominator stays as 3, giving 17/3.",
      ["17 / 3"]
    ),
    answer(
      "y7-frc-typ-m4",
      "Simplify the fraction to lowest terms.",
      "\\dfrac{24}{36}",
      "2/3",
      "The HCF of 24 and 36 is 12. Dividing both by 12 gives 2/3.",
      ["2 / 3"]
    ),
    answer(
      "y7-frc-typ-m5",
      "Find the missing numerator to make the fractions equivalent.",
      "\\dfrac{3}{5} = \\dfrac{?}{20}",
      "12",
      "The denominator is multiplied by 4 (5 x 4 = 20), so multiply the numerator by 4 as well: 3 x 4 = 12.",
    ),
    answer(
      "y7-frc-typ-m6",
      "Simplify the fraction to lowest terms.",
      "\\dfrac{30}{45}",
      "2/3",
      "The HCF of 30 and 45 is 15. Dividing both by 15 gives 2/3.",
      ["2 / 3"]
    ),
    choice(
      "y7-frc-typ-m7",
      "A student converts 3 and 1/4 to the improper fraction 12/4. What error did they make?",
      "A",
      [
        "They multiplied without adding the numerator — the answer should be 13/4.",
        "They used the wrong denominator — the answer should be 3/4.",
        "They added the whole number and numerator — the answer should be 4/4.",
        "They swapped numerator and denominator — the answer should be 4/13.",
      ],
      "Correct conversion: 3 x 4 = 12, then 12 + 1 = 13. The answer is 13/4, not 12/4.",
    ),
    answer(
      "y7-frc-typ-m8",
      "Write the mixed numeral as an improper fraction.",
      "6\\tfrac{3}{8}",
      "51/8",
      "Multiply 6 by 8 to get 48, then add 3 to get 51. The denominator stays as 8, giving 51/8.",
      ["51 / 8"]
    ),
    answer(
      "y7-frc-typ-m9",
      "Find the missing denominator to make the fractions equivalent.",
      "\\dfrac{4}{7} = \\dfrac{20}{?}",
      "35",
      "The numerator is multiplied by 5 (4 x 5 = 20), so multiply the denominator by 5 as well: 7 x 5 = 35.",
    ),
    answer(
      "y7-frc-typ-m10",
      "A 400 m running track has 160 m marked for the first straight. Write this as a fraction in simplest form.",
      "\\dfrac{160}{400}",
      "2/5",
      "The HCF of 160 and 400 is 80. Dividing both by 80 gives 2/5. The first straight is 2/5 of the total track.",
      ["2 / 5"]
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Comparing and ordering fractions
// ─────────────────────────────────────────────────────────────────────────────

const comparingOrderingFractions: LessonContent = {
  description: "Compare and order fractions using a common denominator or number line, and compare unit fractions.",
  learningIntention: "Compare the size of fractions and place them in order from smallest to largest or largest to smallest.",
  successCriteria: [
    "Compare two unit fractions by reasoning about the size of each part.",
    "Find a common denominator to compare two fractions with different denominators.",
    "Order a set of fractions from smallest to largest.",
    "Place fractions and mixed numerals on a number line.",
  ],
  teaching: {
    paragraphs: [
      "To compare fractions, you need to think about what the denominator tells you. A unit fraction has 1 as its numerator — like 1/2, 1/3, or 1/8. The larger the denominator, the smaller each piece. A pizza cut into 8 slices gives you smaller pieces than a pizza cut into 4 slices. So 1/8 is smaller than 1/4, even though 8 is bigger than 4.",
      "When fractions have the same denominator, comparing is straightforward: 3/8 and 5/8 can be compared by looking only at the numerators. The fraction with the larger numerator is larger, because both fractions use the same-sized pieces. So 5/8 is larger than 3/8.",
      "When fractions have different denominators, convert them to a common denominator first. Find the lowest common multiple (LCM) of the denominators, rewrite each fraction with that denominator, then compare the numerators. For example, to compare 2/3 and 3/4, the LCM of 3 and 4 is 12. Convert: 2/3 = 8/12 and 3/4 = 9/12. Since 9/12 > 8/12, we have 3/4 > 2/3.",
      "When ordering mixed numerals, compare the whole-number parts first. If the whole numbers are the same, compare the fraction parts using the method above.",
    ],
    latexBlocks: [
      "\\text{Unit fractions: larger denominator} \\Rightarrow \\text{smaller fraction} \\quad \\frac{1}{8}<\\frac{1}{4}<\\frac{1}{2}",
      "\\text{Same denominator: compare numerators} \\quad \\frac{3}{8}<\\frac{5}{8}",
      "\\text{Different denominators: find common denominator} \\quad \\frac{2}{3}=\\frac{8}{12},\\;\\frac{3}{4}=\\frac{9}{12}\\Rightarrow\\frac{3}{4}>\\frac{2}{3}",
    ],
  },
  workedExamples: [
    {
      title: "Compare two unit fractions",
      questionLatex: "\\text{Which is larger: }\\dfrac{1}{5}\\text{ or }\\dfrac{1}{7}?",
      steps: [
        { explanation: "Both are unit fractions with numerator 1. The larger the denominator, the smaller each piece.", latex: "\\text{5 parts are larger pieces than 7 parts}" },
        { explanation: "Since each fifth is a bigger piece than each seventh, 1/5 is larger.", latex: "\\frac{1}{5} > \\frac{1}{7}" },
      ],
      finalAnswerLatex: "\\dfrac{1}{5} > \\dfrac{1}{7}",
    },
    {
      title: "Compare fractions with different denominators",
      questionLatex: "\\text{Which is larger: }\\dfrac{5}{6}\\text{ or }\\dfrac{7}{9}?",
      steps: [
        { explanation: "Find the lowest common multiple of the denominators 6 and 9.", latex: "\\text{LCM}(6, 9) = 18" },
        { explanation: "Rewrite each fraction with denominator 18.", latex: "\\frac{5}{6} = \\frac{15}{18}, \\quad \\frac{7}{9} = \\frac{14}{18}" },
        { explanation: "Compare the numerators: 15 > 14, so the first fraction is larger.", latex: "\\frac{15}{18} > \\frac{14}{18} \\Rightarrow \\frac{5}{6} > \\frac{7}{9}" },
      ],
      finalAnswerLatex: "\\dfrac{5}{6} > \\dfrac{7}{9}",
    },
    {
      title: "Order fractions from smallest to largest",
      questionLatex: "\\text{Order from smallest to largest: }\\dfrac{3}{4},\\;\\dfrac{2}{3},\\;\\dfrac{5}{6}.",
      steps: [
        { explanation: "Find the LCD of 4, 3, and 6.", latex: "\\text{LCD} = 12" },
        { explanation: "Convert each fraction to twelfths.", latex: "\\frac{3}{4}=\\frac{9}{12},\\quad\\frac{2}{3}=\\frac{8}{12},\\quad\\frac{5}{6}=\\frac{10}{12}" },
        { explanation: "Order by numerator: 8 < 9 < 10.", latex: "\\frac{8}{12}<\\frac{9}{12}<\\frac{10}{12}" },
        { explanation: "Write the answer in the original form.", latex: "\\frac{2}{3}<\\frac{3}{4}<\\frac{5}{6}" },
      ],
      finalAnswerLatex: "\\dfrac{2}{3} < \\dfrac{3}{4} < \\dfrac{5}{6}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-cmp-g1",
      "Which unit fraction is the largest?",
      "A",
      ["$\\dfrac{1}{3}$", "$\\dfrac{1}{5}$", "$\\dfrac{1}{8}$", "$\\dfrac{1}{10}$"],
      "For unit fractions, the smaller the denominator, the larger the fraction. 1/3 has the smallest denominator, so it is the largest.",
    ),
    answer(
      "y7-frc-cmp-g2",
      "Which fraction is larger? Type > or < between them. (Hint: find a common denominator.)",
      "\\dfrac{3}{5} \\quad \\square \\quad \\dfrac{2}{3}",
      "<",
      "LCD of 5 and 3 is 15. Convert: 3/5 = 9/15 and 2/3 = 10/15. Since 9 < 10, we have 3/5 < 2/3.",
      ["less than"]
    ),
    answer(
      "y7-frc-cmp-g3",
      "Write the smaller fraction.",
      "\\dfrac{5}{8} \\quad \\text{or} \\quad \\dfrac{3}{4}",
      "5/8",
      "LCD of 8 and 4 is 8. Convert: 5/8 = 5/8 and 3/4 = 6/8. Since 5 < 6, the fraction 5/8 is smaller.",
      ["5 / 8"]
    ),
    answer(
      "y7-frc-cmp-g4",
      "Which is larger: 1/4 or 1/6? Type the larger fraction.",
      "\\dfrac{1}{4} \\quad \\text{or} \\quad \\dfrac{1}{6}",
      "1/4",
      "Both are unit fractions. The smaller denominator gives a larger piece. Since 4 < 6, each quarter is larger than each sixth: 1/4 > 1/6.",
      ["1 / 4"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-cmp-i1",
      "Write the larger fraction.",
      "\\dfrac{7}{10} \\quad \\text{or} \\quad \\dfrac{3}{4}",
      "3/4",
      "LCD of 10 and 4 is 20. Convert: 7/10 = 14/20 and 3/4 = 15/20. Since 15 > 14, we have 3/4 > 7/10.",
      ["3 / 4"]
    ),
    answer(
      "y7-frc-cmp-i2",
      "Order these fractions from smallest to largest. Write them separated by commas.",
      "\\dfrac{1}{2},\\;\\dfrac{3}{8},\\;\\dfrac{5}{16}",
      "5/16, 3/8, 1/2",
      "LCD of 2, 8, and 16 is 16. Convert: 1/2 = 8/16, 3/8 = 6/16, 5/16 = 5/16. Order: 5/16 < 6/16 < 8/16, so 5/16 < 3/8 < 1/2.",
      ["5/16, 3/8, 1/2"]
    ),
    answer(
      "y7-frc-cmp-i3",
      "Tom ran 3/4 of a km and Jess ran 5/6 of a km. Who ran further? Type the name.",
      "\\dfrac{3}{4} \\quad \\text{vs} \\quad \\dfrac{5}{6}",
      "Jess",
      "LCD of 4 and 6 is 12. Convert: 3/4 = 9/12 and 5/6 = 10/12. Since 10 > 9, Jess ran further.",
      ["jess", "JESS"]
    ),
    answer(
      "y7-frc-cmp-i4",
      "Order these from largest to smallest. Write them separated by commas.",
      "\\dfrac{2}{3},\\;\\dfrac{3}{5},\\;\\dfrac{7}{15}",
      "2/3, 3/5, 7/15",
      "LCD of 3, 5, and 15 is 15. Convert: 2/3 = 10/15, 3/5 = 9/15, 7/15 = 7/15. Largest to smallest: 10/15 > 9/15 > 7/15, so 2/3 > 3/5 > 7/15.",
      ["2/3, 3/5, 7/15"]
    ),
    choice(
      "y7-frc-cmp-i5",
      "A student says 3/7 > 2/5 because 3 > 2. What is wrong with this reasoning?",
      "C",
      [
        "The student should have compared the denominators, not the numerators.",
        "The student is correct — 3/7 is larger than 2/5.",
        "The numerators cannot be compared directly when denominators are different; a common denominator is needed.",
        "The student should have simplified both fractions first.",
      ],
      "To compare fractions with different denominators, convert to a common denominator first. LCD of 7 and 5 is 35: 3/7 = 15/35 and 2/5 = 14/35. So 3/7 > 2/5 in this case, but the student's reasoning is flawed — it was coincidence.",
    ),
  ],
  commonMistakes: [
    { mistake: "Comparing 1/5 and 1/8 and saying 1/8 is larger because 8 > 5.", fix: "For unit fractions, a bigger denominator means smaller pieces. 1/5 > 1/8." },
    { mistake: "Comparing numerators without finding a common denominator: saying 3/5 > 3/4 because both have 3 on top.", fix: "Fractions with the same numerator are ordered by denominator in reverse: the larger the denominator, the smaller the fraction. 3/5 < 3/4." },
    { mistake: "Using the product of denominators instead of the LCD, then making arithmetic errors with large numbers.", fix: "Finding the LCD (not just the product) keeps numbers manageable. For 1/4 and 1/6, LCD = 12, not 24." },
    { mistake: "When ordering mixed numerals, comparing fractions before looking at the whole number.", fix: "Compare whole numbers first. If the whole numbers differ, the larger whole number means the larger value regardless of the fraction." },
  ],
  masteryQuiz: [
    choice(
      "y7-frc-cmp-m1",
      "Which list shows unit fractions ordered from largest to smallest?",
      "D",
      [
        "$\\dfrac{1}{3}, \\dfrac{1}{5}, \\dfrac{1}{2}$",
        "$\\dfrac{1}{2}, \\dfrac{1}{3}, \\dfrac{1}{4}, \\dfrac{1}{6}$",
        "$\\dfrac{1}{6}, \\dfrac{1}{4}, \\dfrac{1}{2}$",
        "$\\dfrac{1}{2}, \\dfrac{1}{4}, \\dfrac{1}{6}$",
      ],
      "For unit fractions, largest to smallest means smallest denominator first. Only option D has denominators in increasing order: 2, 4, 6.",
    ),
    answer(
      "y7-frc-cmp-m2",
      "Write the larger fraction.",
      "\\dfrac{4}{5} \\quad \\text{or} \\quad \\dfrac{7}{9}",
      "4/5",
      "LCD of 5 and 9 is 45. Convert: 4/5 = 36/45 and 7/9 = 35/45. Since 36 > 35, we have 4/5 > 7/9.",
      ["4 / 5"]
    ),
    answer(
      "y7-frc-cmp-m3",
      "Order from smallest to largest. Write them separated by commas.",
      "\\dfrac{5}{6},\\;\\dfrac{7}{8},\\;\\dfrac{2}{3}",
      "2/3, 5/6, 7/8",
      "LCD of 6, 8, and 3 is 24. Convert: 5/6 = 20/24, 7/8 = 21/24, 2/3 = 16/24. Order: 16 < 20 < 21, so 2/3 < 5/6 < 7/8.",
      ["2/3, 5/6, 7/8"]
    ),
    answer(
      "y7-frc-cmp-m4",
      "Which is larger: 5/12 or 3/8?",
      "\\dfrac{5}{12} \\quad \\text{vs} \\quad \\dfrac{3}{8}",
      "5/12",
      "LCD of 12 and 8 is 24. Convert: 5/12 = 10/24 and 3/8 = 9/24. Since 10 > 9, we have 5/12 > 3/8.",
      ["5 / 12"]
    ),
    answer(
      "y7-frc-cmp-m5",
      "Ali drank 2/3 of a bottle, Ben drank 3/5 of the same size bottle. How much more did Ali drink? Give your answer as a fraction.",
      "\\dfrac{2}{3} - \\dfrac{3}{5}",
      "1/15",
      "LCD of 3 and 5 is 15. Convert: 2/3 = 10/15 and 3/5 = 9/15. Ali drank 10/15 - 9/15 = 1/15 more.",
      ["1 / 15"]
    ),
    answer(
      "y7-frc-cmp-m6",
      "Write the smaller fraction.",
      "\\dfrac{11}{15} \\quad \\text{or} \\quad \\dfrac{7}{10}",
      "7/10",
      "LCD of 15 and 10 is 30. Convert: 11/15 = 22/30 and 7/10 = 21/30. Since 21 < 22, we have 7/10 < 11/15.",
      ["7 / 10"]
    ),
    choice(
      "y7-frc-cmp-m7",
      "A student places 5/8 between 1/2 and 3/4 on a number line. Is this correct?",
      "A",
      [
        "Yes — 5/8 is between 1/2 and 3/4 because 4/8 < 5/8 < 6/8.",
        "No — 5/8 is greater than 3/4.",
        "No — 5/8 is less than 1/2.",
        "Cannot be determined without a calculator.",
      ],
      "Convert to eighths: 1/2 = 4/8 and 3/4 = 6/8. Since 4/8 < 5/8 < 6/8, the student is correct.",
    ),
    answer(
      "y7-frc-cmp-m8",
      "Order from largest to smallest. Write them separated by commas.",
      "\\dfrac{3}{4},\\;\\dfrac{5}{8},\\;\\dfrac{7}{12}",
      "3/4, 5/8, 7/12",
      "LCD of 4, 8, and 12 is 24. Convert: 3/4 = 18/24, 5/8 = 15/24, 7/12 = 14/24. Order: 18 > 15 > 14, so 3/4 > 5/8 > 7/12.",
      ["3/4, 5/8, 7/12"]
    ),
    answer(
      "y7-frc-cmp-m9",
      "Find the fraction exactly halfway between 1/3 and 1/2.",
      "\\dfrac{1}{3} \\quad \\text{and} \\quad \\dfrac{1}{2}",
      "5/12",
      "LCD of 3 and 2 is 6. Convert: 1/3 = 2/6 and 1/2 = 3/6. The midpoint in sixths is 2.5/6 = 5/12. Alternatively, add and halve: (1/3 + 1/2)/2 = (5/6)/2 = 5/12.",
      ["5 / 12"]
    ),
    answer(
      "y7-frc-cmp-m10",
      "Three students each completed a different fraction of their homework. Nia completed 7/10, Sam completed 2/3, and Pat completed 3/5. Who completed the least? Type the name.",
      "\\dfrac{7}{10},\\;\\dfrac{2}{3},\\;\\dfrac{3}{5}",
      "Pat",
      "LCD of 10, 3, and 5 is 30. Convert: 7/10 = 21/30, 2/3 = 20/30, 3/5 = 18/30. Smallest is 18/30 = 3/5, which belongs to Pat.",
      ["pat", "PAT"]
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Adding and subtracting fractions
// ─────────────────────────────────────────────────────────────────────────────

const addingSubtractingFractions: LessonContent = {
  description: "Add and subtract fractions with like and unlike denominators, including mixed numerals.",
  learningIntention: "Add and subtract fractions and mixed numerals by finding a common denominator.",
  successCriteria: [
    "Add fractions with the same denominator by adding the numerators.",
    "Subtract fractions with the same denominator by subtracting the numerators.",
    "Find the lowest common denominator to add or subtract fractions with different denominators.",
    "Add and subtract mixed numerals by handling whole number and fraction parts separately.",
    "Simplify the result when a common factor exists.",
  ],
  teaching: {
    paragraphs: [
      "Adding fractions is like adding slices of a pizza. If you have 2 slices and I give you 3 more slices, and all slices are the same size (say, eighths), you have 5 eighths: 2/8 + 3/8 = 5/8. When the denominators are the same, add only the numerators — the denominator does not change.",
      "When denominators are different, the slice sizes are different and you cannot add them directly. You first need to cut all pieces to the same size. Find the lowest common denominator (LCD) — the smallest number both denominators divide into evenly — and rewrite each fraction with that denominator. Then add or subtract the numerators.",
      "With mixed numerals, handle the whole numbers and fraction parts separately. Add the whole numbers, then add the fractions. If the fractions add to more than 1, convert the extra to a whole number and carry it over. When subtracting, sometimes you need to borrow 1 from the whole number part and convert it to a fraction.",
      "The most common error is adding denominators as well as numerators: 1/4 + 1/4 = 2/8 is wrong. The denominator tells you the size of each piece — that size does not change when you combine pieces. The correct answer is 2/4 = 1/2.",
    ],
    latexBlocks: [
      "\\frac{a}{c}+\\frac{b}{c}=\\frac{a+b}{c} \\qquad \\text{(same denominator)}",
      "\\frac{1}{3}+\\frac{1}{4}=\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12} \\qquad \\text{(different denominators, LCD = 12)}",
      "2\\tfrac{1}{3}+1\\tfrac{1}{2}=3+\\frac{2}{6}+\\frac{3}{6}=3\\tfrac{5}{6}",
    ],
  },
  workedExamples: [
    {
      title: "Add fractions with unlike denominators",
      questionLatex: "\\text{Calculate }\\dfrac{2}{5}+\\dfrac{1}{4}.",
      steps: [
        { explanation: "Find the lowest common multiple of the denominators 5 and 4.", latex: "\\text{LCD}(5,4)=20" },
        { explanation: "Rewrite each fraction with denominator 20.", latex: "\\frac{2}{5}=\\frac{8}{20},\\quad\\frac{1}{4}=\\frac{5}{20}" },
        { explanation: "Add the numerators; the denominator stays as 20.", latex: "\\frac{8}{20}+\\frac{5}{20}=\\frac{13}{20}" },
      ],
      finalAnswerLatex: "\\dfrac{13}{20}",
    },
    {
      title: "Subtract fractions with unlike denominators",
      questionLatex: "\\text{Calculate }\\dfrac{3}{4}-\\dfrac{2}{5}.",
      steps: [
        { explanation: "Find the LCD of 4 and 5.", latex: "\\text{LCD}(4,5)=20" },
        { explanation: "Rewrite each fraction with denominator 20.", latex: "\\frac{3}{4}=\\frac{15}{20},\\quad\\frac{2}{5}=\\frac{8}{20}" },
        { explanation: "Subtract the numerators.", latex: "\\frac{15}{20}-\\frac{8}{20}=\\frac{7}{20}" },
      ],
      finalAnswerLatex: "\\dfrac{7}{20}",
    },
    {
      title: "Add mixed numerals",
      questionLatex: "\\text{Calculate }2\\tfrac{3}{4}+1\\tfrac{2}{3}.",
      steps: [
        { explanation: "Add the whole numbers together.", latex: "2+1=3" },
        { explanation: "Find the LCD of 4 and 3, then rewrite the fractions.", latex: "\\frac{3}{4}=\\frac{9}{12},\\quad\\frac{2}{3}=\\frac{8}{12}" },
        { explanation: "Add the fractions.", latex: "\\frac{9}{12}+\\frac{8}{12}=\\frac{17}{12}=1\\tfrac{5}{12}" },
        { explanation: "Add the extra whole number to the whole-number total.", latex: "3+1\\tfrac{5}{12}=4\\tfrac{5}{12}" },
      ],
      finalAnswerLatex: "4\\tfrac{5}{12}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-add-g1",
      "What is the correct result of the addition shown?",
      "B",
      ["$\\dfrac{2}{6}$", "$\\dfrac{5}{6}$", "$\\dfrac{5}{12}$", "$\\dfrac{7}{6}$"],
      "The denominators are the same (sixths), so add only the numerators: 1 + 4 = 5. The answer is 5/6.",
      "\\dfrac{1}{6}+\\dfrac{4}{6}"
    ),
    answer(
      "y7-frc-add-g2",
      "Calculate the sum. Simplify if possible.",
      "\\dfrac{1}{3}+\\dfrac{1}{6}",
      "1/2",
      "LCD of 3 and 6 is 6. Convert: 1/3 = 2/6. Then 2/6 + 1/6 = 3/6 = 1/2.",
      ["1 / 2", "3/6"]
    ),
    answer(
      "y7-frc-add-g3",
      "Calculate the difference. Simplify if possible.",
      "\\dfrac{5}{6}-\\dfrac{1}{4}",
      "7/12",
      "LCD of 6 and 4 is 12. Convert: 5/6 = 10/12 and 1/4 = 3/12. Then 10/12 - 3/12 = 7/12.",
      ["7 / 12"]
    ),
    answer(
      "y7-frc-add-g4",
      "Calculate the sum.",
      "1\\tfrac{1}{2}+2\\tfrac{1}{4}",
      "3 3/4",
      "Whole numbers: 1 + 2 = 3. Fractions: LCD of 2 and 4 is 4. Convert: 1/2 = 2/4. Then 2/4 + 1/4 = 3/4. Total: 3 and 3/4.",
      ["3 3/4", "3\\tfrac{3}{4}", "15/4"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-add-i1",
      "Calculate the sum. Simplify if possible.",
      "\\dfrac{2}{3}+\\dfrac{3}{4}",
      "17/12",
      "LCD of 3 and 4 is 12. Convert: 2/3 = 8/12 and 3/4 = 9/12. Then 8/12 + 9/12 = 17/12.",
      ["1 5/12", "1\\tfrac{5}{12}", "17 / 12"]
    ),
    answer(
      "y7-frc-add-i2",
      "Calculate the difference. Simplify if possible.",
      "\\dfrac{7}{8}-\\dfrac{1}{3}",
      "13/24",
      "LCD of 8 and 3 is 24. Convert: 7/8 = 21/24 and 1/3 = 8/24. Then 21/24 - 8/24 = 13/24.",
      ["13 / 24"]
    ),
    answer(
      "y7-frc-add-i3",
      "A recipe uses 1 and 1/3 cups of sugar and 2 and 1/4 cups of flour. How many cups of dry ingredients are there in total?",
      "1\\tfrac{1}{3}+2\\tfrac{1}{4}",
      "3 7/12",
      "Whole numbers: 1 + 2 = 3. Fractions: LCD of 3 and 4 is 12. Convert: 1/3 = 4/12 and 1/4 = 3/12. Sum of fractions: 4/12 + 3/12 = 7/12. Total: 3 and 7/12 cups.",
      ["3 7/12", "3\\tfrac{7}{12}"]
    ),
    answer(
      "y7-frc-add-i4",
      "Calculate the difference.",
      "3\\tfrac{1}{2}-1\\tfrac{3}{4}",
      "1 3/4",
      "LCD of 2 and 4 is 4. Convert: 3 and 1/2 = 3 and 2/4. Since 2/4 < 3/4, borrow 1 whole: 2 and 6/4. Then 6/4 - 3/4 = 3/4, and 2 - 1 = 1. Answer: 1 and 3/4.",
      ["1 3/4", "1\\tfrac{3}{4}", "7/4"]
    ),
    answer(
      "y7-frc-add-i5",
      "Jaya ran 2 and 5/8 km on Monday and 1 and 3/4 km on Tuesday. How far did she run in total?",
      "2\\tfrac{5}{8}+1\\tfrac{3}{4}",
      "4 3/8",
      "Whole numbers: 2 + 1 = 3. Fractions: LCD of 8 and 4 is 8. Convert: 3/4 = 6/8. Then 5/8 + 6/8 = 11/8 = 1 and 3/8. Total: 3 + 1 and 3/8 = 4 and 3/8 km.",
      ["4 3/8", "4\\tfrac{3}{8}"]
    ),
  ],
  commonMistakes: [
    { mistake: "Adding denominators: 1/4 + 1/4 = 2/8 instead of 2/4.", fix: "When denominators are the same, only add the numerators. The denominator stays the same because the piece size has not changed." },
    { mistake: "Forgetting to convert to a common denominator before adding: 1/3 + 1/4 = 2/7.", fix: "Find the LCD first, rewrite each fraction, then add the numerators." },
    { mistake: "When adding mixed numerals, ignoring the carry: 1 and 3/4 + 1 and 3/4 = 2 and 6/4 instead of 3 and 1/2.", fix: "When the fraction part is improper, convert it: 6/4 = 1 and 1/2, then add the extra 1 to the whole number total." },
    { mistake: "When subtracting mixed numerals, subtracting the fraction from the whole number when borrowing is needed.", fix: "Borrow 1 from the whole number and add it as the denominator to the existing numerator before subtracting." },
  ],
  masteryQuiz: [
    answer(
      "y7-frc-add-m1",
      "Calculate the sum.",
      "\\dfrac{3}{8}+\\dfrac{5}{8}",
      "1",
      "The denominators are the same. Add numerators: 3 + 5 = 8. Result: 8/8 = 1.",
    ),
    choice(
      "y7-frc-add-m2",
      "A student calculates 1/3 + 1/4 = 2/7. What error did they make?",
      "B",
      [
        "They subtracted the numerators instead of adding.",
        "They added the denominators instead of finding the LCD.",
        "They forgot to simplify the final answer.",
        "They used the wrong common denominator.",
      ],
      "Adding 3 + 4 = 7 in the denominator is the classic error. The correct LCD is 12: 1/3 = 4/12, 1/4 = 3/12, and 4/12 + 3/12 = 7/12.",
    ),
    answer(
      "y7-frc-add-m3",
      "Calculate the sum. Simplify your answer.",
      "\\dfrac{5}{6}+\\dfrac{1}{4}",
      "13/12",
      "LCD of 6 and 4 is 12. Convert: 5/6 = 10/12 and 1/4 = 3/12. Then 10/12 + 3/12 = 13/12.",
      ["1 1/12", "1\\tfrac{1}{12}", "13 / 12"]
    ),
    answer(
      "y7-frc-add-m4",
      "Calculate the difference.",
      "\\dfrac{5}{6}-\\dfrac{3}{8}",
      "11/24",
      "LCD of 6 and 8 is 24. Convert: 5/6 = 20/24 and 3/8 = 9/24. Then 20/24 - 9/24 = 11/24.",
      ["11 / 24"]
    ),
    answer(
      "y7-frc-add-m5",
      "Calculate the sum.",
      "2\\tfrac{2}{3}+3\\tfrac{3}{4}",
      "6 5/12",
      "Whole numbers: 2 + 3 = 5. Fractions: LCD of 3 and 4 is 12. Convert: 2/3 = 8/12 and 3/4 = 9/12. Sum: 8/12 + 9/12 = 17/12 = 1 and 5/12. Total: 5 + 1 and 5/12 = 6 and 5/12.",
      ["6 5/12", "6\\tfrac{5}{12}"]
    ),
    answer(
      "y7-frc-add-m6",
      "Calculate the difference.",
      "4\\tfrac{1}{4}-2\\tfrac{2}{3}",
      "1 7/12",
      "LCD of 4 and 3 is 12. Convert: 1/4 = 3/12 and 2/3 = 8/12. Since 3/12 < 8/12, borrow 1 whole: 3 and 15/12. Subtract: 15/12 - 8/12 = 7/12, and 3 - 2 = 1. Answer: 1 and 7/12.",
      ["1 7/12", "1\\tfrac{7}{12}"]
    ),
    answer(
      "y7-frc-add-m7",
      "A plank of wood is 3 and 5/8 m long. A piece of 1 and 3/4 m is cut off. How long is the remaining piece?",
      "3\\tfrac{5}{8}-1\\tfrac{3}{4}",
      "1 7/8",
      "LCD of 8 and 4 is 8. Convert: 3/4 = 6/8. Since 5/8 < 6/8, borrow 1: 2 and 13/8. Subtract: 13/8 - 6/8 = 7/8, and 2 - 1 = 1. Remaining: 1 and 7/8 m.",
      ["1 7/8", "1\\tfrac{7}{8}"]
    ),
    choice(
      "y7-frc-add-m8",
      "Which calculation gives the correct answer for 5/6 - 1/4?",
      "C",
      [
        "$\\dfrac{5-1}{6-4}=\\dfrac{4}{2}=2$",
        "$\\dfrac{5-1}{6+4}=\\dfrac{4}{10}$",
        "$\\dfrac{10}{12}-\\dfrac{3}{12}=\\dfrac{7}{12}$",
        "$\\dfrac{5}{6}-\\dfrac{1}{4}=\\dfrac{4}{24}$",
      ],
      "LCD of 6 and 4 is 12. Convert: 5/6 = 10/12 and 1/4 = 3/12. Subtract: 10/12 - 3/12 = 7/12. Only option C shows this correctly.",
    ),
    answer(
      "y7-frc-add-m9",
      "Calculate the sum.",
      "1\\tfrac{5}{6}+2\\tfrac{7}{8}",
      "4 17/24",
      "Whole numbers: 1 + 2 = 3. LCD of 6 and 8 is 24. Convert: 5/6 = 20/24 and 7/8 = 21/24. Sum of fractions: 20/24 + 21/24 = 41/24 = 1 and 17/24. Total: 3 + 1 and 17/24 = 4 and 17/24.",
      ["4 17/24", "4\\tfrac{17}{24}"]
    ),
    answer(
      "y7-frc-add-m10",
      "A cyclist rode 5 and 2/3 km on day 1 and 4 and 5/6 km on day 2. How far did they ride in total over the two days?",
      "5\\tfrac{2}{3}+4\\tfrac{5}{6}",
      "10 1/2",
      "Whole numbers: 5 + 4 = 9. LCD of 3 and 6 is 6. Convert: 2/3 = 4/6. Sum of fractions: 4/6 + 5/6 = 9/6 = 1 and 1/2. Total: 9 + 1 and 1/2 = 10 and 1/2 km.",
      ["10 1/2", "10\\tfrac{1}{2}", "21/2"]
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Multiplying and dividing fractions
// ─────────────────────────────────────────────────────────────────────────────

const multiplyingDividingFractions: LessonContent = {
  description: "Multiply a fraction by a whole number, multiply two fractions, and divide fractions using the reciprocal method.",
  learningIntention: "Multiply and divide fractions and whole numbers by fractions, simplifying results to lowest terms.",
  successCriteria: [
    "Multiply a fraction by a whole number by multiplying only the numerator.",
    "Multiply two fractions by multiplying numerators and multiplying denominators.",
    "Simplify before multiplying by cancelling common factors diagonally.",
    "Find the reciprocal of a fraction by swapping numerator and denominator.",
    "Divide a fraction or whole number by a fraction using the reciprocal method.",
  ],
  teaching: {
    paragraphs: [
      "Multiplying fractions is simpler than adding them — you do not need a common denominator. You just multiply straight across: multiply the numerators together, then multiply the denominators together. For example, 2/3 x 3/4 = (2x3)/(3x4) = 6/12 = 1/2. Think of it as finding a fraction of a fraction — two-thirds of three-quarters.",
      "Before multiplying, look for common factors to cancel. If a numerator and a denominator (from either fraction) share a factor, divide both by it. This keeps numbers small and avoids having to simplify a large fraction at the end. For example, in 2/3 x 3/4, the 3 in the numerator of the second fraction and the 3 in the denominator of the first cancel: you get 2/1 x 1/4 = 2/4 = 1/2.",
      "To divide by a fraction, multiply by its reciprocal. The reciprocal of a fraction is formed by flipping it: the reciprocal of 2/3 is 3/2. So 3/4 ÷ 2/3 = 3/4 x 3/2 = 9/8. This works because dividing by a number and multiplying by its reciprocal produce the same result.",
      "The most common error in division is flipping the wrong fraction. Always flip the second fraction — the one you are dividing by. The first fraction stays unchanged. Never flip both.",
    ],
    latexBlocks: [
      "\\frac{a}{b}\\times\\frac{c}{d}=\\frac{a\\times c}{b\\times d}",
      "\\text{Reciprocal of }\\frac{a}{b}\\text{ is }\\frac{b}{a}",
      "\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}=\\frac{ad}{bc}",
      "\\frac{2}{3}\\times\\frac{3}{4}=\\frac{\\cancel{2}}{\\cancel{3}}\\times\\frac{\\cancel{3}}{\\cancel{4}\\,2}=\\frac{1}{2}",
    ],
  },
  workedExamples: [
    {
      title: "Multiply a fraction by a whole number",
      questionLatex: "\\text{Calculate }4\\times\\dfrac{3}{8}.",
      steps: [
        { explanation: "Write the whole number 4 as a fraction over 1.", latex: "4=\\frac{4}{1}" },
        { explanation: "Multiply numerators and multiply denominators.", latex: "\\frac{4}{1}\\times\\frac{3}{8}=\\frac{12}{8}" },
        { explanation: "Simplify by dividing by the HCF of 12 and 8, which is 4.", latex: "\\frac{12}{8}=\\frac{3}{2}=1\\tfrac{1}{2}" },
      ],
      finalAnswerLatex: "1\\tfrac{1}{2}",
    },
    {
      title: "Multiply two fractions with cancellation",
      questionLatex: "\\text{Calculate }\\dfrac{5}{6}\\times\\dfrac{3}{10}.",
      steps: [
        { explanation: "Look for common factors to cancel: 5 in the first numerator and 10 in the second denominator share factor 5; 3 in the second numerator and 6 in the first denominator share factor 3.", latex: "\\frac{\\cancel{5}}{\\cancelto{2}{6}}\\times\\frac{\\cancel{3}}{\\cancelto{2}{10}}" },
        { explanation: "Multiply the remaining values.", latex: "\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}" },
      ],
      finalAnswerLatex: "\\dfrac{1}{4}",
    },
    {
      title: "Divide fractions using the reciprocal",
      questionLatex: "\\text{Calculate }\\dfrac{3}{4}\\div\\dfrac{3}{8}.",
      steps: [
        { explanation: "Find the reciprocal of the second fraction by swapping numerator and denominator.", latex: "\\text{Reciprocal of }\\frac{3}{8}=\\frac{8}{3}" },
        { explanation: "Change the division to multiplication by the reciprocal.", latex: "\\frac{3}{4}\\times\\frac{8}{3}" },
        { explanation: "Cancel 3 from the first numerator and second denominator, and note that 4 and 8 share factor 4.", latex: "\\frac{\\cancel{3}}{\\cancelto{1}{4}}\\times\\frac{\\cancelto{2}{8}}{\\cancel{3}}=\\frac{1}{1}\\times\\frac{2}{1}=2" },
      ],
      finalAnswerLatex: "2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-mul-g1",
      "To calculate 2/3 ÷ 4/5, which expression do we use?",
      "B",
      [
        "$\\dfrac{2}{3}\\times\\dfrac{4}{5}$",
        "$\\dfrac{2}{3}\\times\\dfrac{5}{4}$",
        "$\\dfrac{3}{2}\\times\\dfrac{4}{5}$",
        "$\\dfrac{3}{2}\\times\\dfrac{5}{4}$",
      ],
      "Dividing by 4/5 means multiplying by its reciprocal, which is 5/4. The first fraction stays as 2/3.",
    ),
    answer(
      "y7-frc-mul-g2",
      "Calculate the product.",
      "\\dfrac{2}{3}\\times\\dfrac{3}{5}",
      "2/5",
      "Numerators: 2 x 3 = 6. Denominators: 3 x 5 = 15. Result: 6/15. Simplify by dividing by 3: 2/5.",
      ["2 / 5"]
    ),
    answer(
      "y7-frc-mul-g3",
      "Calculate the product.",
      "3\\times\\dfrac{5}{6}",
      "5/2",
      "Write 3 as 3/1. Multiply: 3/1 x 5/6 = 15/6. Simplify by dividing by 3: 5/2.",
      ["2 1/2", "2\\tfrac{1}{2}", "5 / 2"]
    ),
    answer(
      "y7-frc-mul-g4",
      "Calculate the quotient.",
      "\\dfrac{2}{3}\\div\\dfrac{4}{9}",
      "3/2",
      "Reciprocal of 4/9 is 9/4. Multiply: 2/3 x 9/4 = 18/12. Simplify by dividing by 6: 3/2.",
      ["1 1/2", "1\\tfrac{1}{2}", "3 / 2"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-mul-i1",
      "Calculate the product. Simplify your answer.",
      "\\dfrac{3}{4}\\times\\dfrac{8}{9}",
      "2/3",
      "Cancel: 3 and 9 share factor 3 (giving 1 and 3); 4 and 8 share factor 4 (giving 1 and 2). Result: 1/1 x 2/3 = 2/3.",
      ["2 / 3"]
    ),
    answer(
      "y7-frc-mul-i2",
      "Calculate the quotient. Simplify your answer.",
      "\\dfrac{5}{6}\\div\\dfrac{5}{12}",
      "2",
      "Reciprocal of 5/12 is 12/5. Multiply: 5/6 x 12/5. Cancel 5 from numerators and denominators, and 6 and 12 share factor 6. Result: 1/1 x 2/1 = 2.",
    ),
    answer(
      "y7-frc-mul-i3",
      "A bag of rice weighs 3/4 kg. If you use 2/3 of the bag for a recipe, how many kilograms do you use?",
      "\\dfrac{2}{3}\\times\\dfrac{3}{4}",
      "1/2",
      "Multiply 2/3 x 3/4. Cancel the 3s: 2/1 x 1/4 = 2/4 = 1/2. You use 1/2 kg of rice.",
      ["1 / 2", "0.5"]
    ),
    answer(
      "y7-frc-mul-i4",
      "A 3/4 m ribbon is cut into pieces each 3/8 m long. How many pieces are there?",
      "\\dfrac{3}{4}\\div\\dfrac{3}{8}",
      "2",
      "Reciprocal of 3/8 is 8/3. Multiply: 3/4 x 8/3. Cancel the 3s. Then 1/4 x 8/1 = 8/4 = 2. There are 2 pieces.",
    ),
    choice(
      "y7-frc-mul-i5",
      "A student calculates 3/5 ÷ 2/7 = 6/35. What error did they make?",
      "A",
      [
        "They multiplied directly instead of using the reciprocal of the second fraction.",
        "They used the reciprocal of the first fraction instead of the second.",
        "They added the denominators instead of multiplying.",
        "They forgot to simplify the final answer.",
      ],
      "The correct method: flip 2/7 to get 7/2, then multiply 3/5 x 7/2 = 21/10. The student multiplied 3/5 x 2/7 = 6/35 without flipping.",
    ),
  ],
  commonMistakes: [
    { mistake: "Dividing instead of multiplying when asked to find a fraction of a quantity: treating 2/3 of 3/4 as 2/3 ÷ 3/4.", fix: "'Of' means multiply. Calculate 2/3 x 3/4 = 6/12 = 1/2." },
    { mistake: "Flipping the first fraction when dividing instead of the second: 3/4 ÷ 2/5 becomes 4/3 x 2/5 instead of 3/4 x 5/2.", fix: "Always flip only the fraction you are dividing by — the second one. The first fraction is unchanged." },
    { mistake: "Not simplifying after multiplying, leaving the answer as a large fraction like 15/20 instead of 3/4.", fix: "After multiplying, check for common factors in the numerator and denominator and divide by the HCF." },
    { mistake: "Trying to find a common denominator before multiplying (as if adding fractions).", fix: "No common denominator is needed for multiplication or division. Multiply straight across (then simplify)." },
  ],
  masteryQuiz: [
    answer(
      "y7-frc-mul-m1",
      "Calculate the product. Simplify your answer.",
      "\\dfrac{2}{5}\\times\\dfrac{5}{6}",
      "1/3",
      "Cancel: 5 appears in both second numerator and first denominator. Then 2/1 x 1/6 = 2/6 = 1/3.",
      ["1 / 3"]
    ),
    answer(
      "y7-frc-mul-m2",
      "Calculate the product.",
      "6\\times\\dfrac{5}{8}",
      "15/4",
      "Write 6 as 6/1. Multiply: 6/1 x 5/8 = 30/8. Simplify by dividing by 2: 15/4.",
      ["3 3/4", "3\\tfrac{3}{4}", "15 / 4"]
    ),
    choice(
      "y7-frc-mul-m3",
      "What is the reciprocal of 7/3?",
      "B",
      ["$\\dfrac{7}{3}$", "$\\dfrac{3}{7}$", "$-\\dfrac{7}{3}$", "$\\dfrac{1}{7}$"],
      "The reciprocal of a fraction is formed by swapping numerator and denominator. The reciprocal of 7/3 is 3/7.",
    ),
    answer(
      "y7-frc-mul-m4",
      "Calculate the quotient. Simplify your answer.",
      "\\dfrac{7}{8}\\div\\dfrac{7}{4}",
      "1/2",
      "Reciprocal of 7/4 is 4/7. Multiply: 7/8 x 4/7. Cancel the 7s and 4 with 8 (factor 4). Result: 1/2.",
      ["1 / 2"]
    ),
    answer(
      "y7-frc-mul-m5",
      "Calculate the product. Simplify your answer.",
      "\\dfrac{4}{9}\\times\\dfrac{3}{8}",
      "1/6",
      "Cancel: 4 and 8 share factor 4 (giving 1 and 2); 3 and 9 share factor 3 (giving 1 and 3). Result: 1/2 x 1/3 = 1/6.",
      ["1 / 6"]
    ),
    answer(
      "y7-frc-mul-m6",
      "A school hall is 2/3 km long and 3/5 km wide. Find the area in square kilometres.",
      "\\dfrac{2}{3}\\times\\dfrac{3}{5}",
      "2/5",
      "Multiply 2/3 x 3/5. Cancel the 3s: 2/1 x 1/5 = 2/5. The area is 2/5 square kilometres.",
      ["2 / 5"]
    ),
    answer(
      "y7-frc-mul-m7",
      "Calculate the quotient.",
      "\\dfrac{4}{5}\\div\\dfrac{2}{15}",
      "6",
      "Reciprocal of 2/15 is 15/2. Multiply: 4/5 x 15/2. Cancel: 5 and 15 share factor 5 (giving 1 and 3); 4 and 2 share factor 2 (giving 2 and 1). Result: 2 x 3 = 6.",
    ),
    answer(
      "y7-frc-mul-m8",
      "Calculate the product. Simplify your answer.",
      "\\dfrac{7}{10}\\times\\dfrac{5}{14}",
      "1/4",
      "Cancel: 7 and 14 share factor 7 (giving 1 and 2); 5 and 10 share factor 5 (giving 1 and 2). Result: 1/2 x 1/2 = 1/4.",
      ["1 / 4"]
    ),
    answer(
      "y7-frc-mul-m9",
      "How many 3/8 kg servings can be made from 3 kg of pasta?",
      "3\\div\\dfrac{3}{8}",
      "8",
      "Write 3 as 3/1. Reciprocal of 3/8 is 8/3. Multiply: 3/1 x 8/3. Cancel the 3s: 1 x 8 = 8. There are 8 servings.",
    ),
    choice(
      "y7-frc-mul-m10",
      "Which expression is equivalent to 5/6 ÷ 3/4?",
      "C",
      [
        "$\\dfrac{5}{6}\\times\\dfrac{3}{4}$",
        "$\\dfrac{6}{5}\\times\\dfrac{3}{4}$",
        "$\\dfrac{5}{6}\\times\\dfrac{4}{3}$",
        "$\\dfrac{6}{5}\\times\\dfrac{4}{3}$",
      ],
      "Dividing by 3/4 means multiplying by its reciprocal, 4/3. The first fraction stays as 5/6. So the equivalent expression is 5/6 x 4/3.",
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 5 — Fractions and decimals conversion
// ─────────────────────────────────────────────────────────────────────────────

const fractionsDecimalsConversion: LessonContent = {
  description: "Convert fractions to terminating and recurring decimals by dividing, and convert decimals back to fractions in simplest form.",
  learningIntention: "Convert between fractions and decimals, and recognise when a fraction produces a recurring decimal.",
  successCriteria: [
    "Convert a fraction to a decimal by dividing the numerator by the denominator.",
    "Identify whether the resulting decimal terminates or recurs.",
    "Recognise common recurring decimals such as 1/3, 1/6, 1/9.",
    "Convert a terminating decimal to a fraction in simplest form.",
  ],
  teaching: {
    paragraphs: [
      "Every fraction can be written as a decimal. To convert, divide the numerator by the denominator. For example, 3/4 means 3 ÷ 4 = 0.75. This is a terminating decimal because the division ends after a finite number of digits.",
      "Some fractions, when you divide, produce a decimal that goes on forever with a repeating pattern. These are called recurring decimals. For example, 1/3 = 0.333... where the 3 repeats forever. We write a dot above the repeating digit: 0.3 with a dot over the 3. The fraction 1/6 = 0.1666... is written as 0.16 with a dot over the 6.",
      "To convert a terminating decimal to a fraction, read the decimal as a fraction with a power of 10 in the denominator, then simplify. For example, 0.35 = 35/100. Dividing by the HCF of 35 and 100, which is 5, gives 7/20. Check: 7 ÷ 20 = 0.35.",
      "Fractions whose denominators (in simplest form) have only 2 and 5 as prime factors always give terminating decimals. Fractions with any other prime factor in the denominator will give recurring decimals. So 1/8 terminates (8 = 2³), but 1/7 recurs (7 is prime and not 2 or 5).",
    ],
    latexBlocks: [
      "\\frac{a}{b}=a\\div b \\quad \\Rightarrow \\quad \\text{terminating or recurring decimal}",
      "\\frac{1}{3}=0.\\overline{3}\\quad\\frac{1}{6}=0.1\\overline{6}\\quad\\frac{1}{9}=0.\\overline{1}\\quad\\frac{2}{3}=0.\\overline{6}",
      "0.35=\\frac{35}{100}=\\frac{7}{20}\\qquad 0.125=\\frac{125}{1000}=\\frac{1}{8}",
    ],
  },
  workedExamples: [
    {
      title: "Convert a fraction to a decimal",
      questionLatex: "\\text{Convert }\\dfrac{7}{8}\\text{ to a decimal.}",
      steps: [
        { explanation: "Divide the numerator by the denominator: 7 ÷ 8.", latex: "7.000 \\div 8" },
        { explanation: "Perform the division step by step.", latex: "7 \\div 8 = 0.875" },
        { explanation: "The decimal terminates after three places, so no recurring notation is needed.", latex: "\\frac{7}{8} = 0.875" },
      ],
      finalAnswerLatex: "0.875",
    },
    {
      title: "Identify a recurring decimal",
      questionLatex: "\\text{Convert }\\dfrac{5}{6}\\text{ to a decimal.}",
      steps: [
        { explanation: "Divide 5 by 6. The remainder keeps cycling, producing a repeating digit.", latex: "5 \\div 6 = 0.8333\\ldots" },
        { explanation: "The digit 3 repeats forever. Write a dot over the repeating digit to show the recurring part.", latex: "\\frac{5}{6} = 0.8\\overline{3}" },
      ],
      finalAnswerLatex: "0.8\\overline{3}",
    },
    {
      title: "Convert a decimal to a fraction",
      questionLatex: "\\text{Write }0.64\\text{ as a fraction in simplest form.}",
      steps: [
        { explanation: "The decimal has two places, so place it over 100.", latex: "0.64 = \\frac{64}{100}" },
        { explanation: "Find the HCF of 64 and 100.", latex: "\\text{HCF}(64, 100) = 4" },
        { explanation: "Divide both numerator and denominator by 4.", latex: "\\frac{64 \\div 4}{100 \\div 4} = \\frac{16}{25}" },
      ],
      finalAnswerLatex: "\\dfrac{16}{25}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-cvt-g1",
      "Which fraction gives a terminating decimal?",
      "C",
      ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{3}{8}$", "$\\dfrac{2}{9}$"],
      "A fraction terminates when its denominator (in simplest form) has only 2 and 5 as prime factors. 8 = 2³, so 3/8 terminates. The others have 3 as a prime factor, giving recurring decimals.",
    ),
    answer(
      "y7-frc-cvt-g2",
      "Convert the fraction to a decimal.",
      "\\dfrac{3}{5}",
      "0.6",
      "Divide 3 by 5: 3 ÷ 5 = 0.6. This is a terminating decimal.",
    ),
    answer(
      "y7-frc-cvt-g3",
      "Convert the decimal to a fraction in simplest form.",
      "0.45",
      "9/20",
      "0.45 = 45/100. HCF of 45 and 100 is 5. Divide both by 5: 9/20.",
      ["9 / 20"]
    ),
    answer(
      "y7-frc-cvt-g4",
      "Convert the fraction to a decimal. Use dot notation for recurring digits (e.g. write 0.3 recurring as 0.33...).",
      "\\dfrac{1}{6}",
      "0.1666...",
      "Divide 1 by 6: 1 ÷ 6 = 0.1666... The digit 6 repeats, giving 0.16 recurring.",
      ["0.16666...", "0.1̄6̄", "0.16 recurring"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-cvt-i1",
      "Convert the fraction to a decimal.",
      "\\dfrac{9}{16}",
      "0.5625",
      "Divide 9 by 16: 9 ÷ 16 = 0.5625. This is a terminating decimal.",
    ),
    answer(
      "y7-frc-cvt-i2",
      "Convert the decimal to a fraction in simplest form.",
      "0.125",
      "1/8",
      "0.125 = 125/1000. HCF of 125 and 1000 is 125. Divide both by 125: 1/8.",
      ["1 / 8"]
    ),
    answer(
      "y7-frc-cvt-i3",
      "Write 2/3 as a decimal. Use recurring notation (e.g. 0.66...).",
      "\\dfrac{2}{3}",
      "0.6666...",
      "Divide 2 by 3: 2 ÷ 3 = 0.6666... The digit 6 repeats forever.",
      ["0.666...", "0.6̄", "0.67"]
    ),
    answer(
      "y7-frc-cvt-i4",
      "A student scores 17 out of 25 on a test. Write their score as a decimal.",
      "\\dfrac{17}{25}",
      "0.68",
      "Divide 17 by 25: 17 ÷ 25 = 0.68. Alternatively, multiply top and bottom by 4 to get 68/100 = 0.68.",
    ),
    choice(
      "y7-frc-cvt-i5",
      "Which decimal is equivalent to 3/11?",
      "B",
      ["$0.33$", "$0.\\overline{27}$", "$0.27$", "$0.\\overline{3}$"],
      "Divide 3 by 11: 3.0000 ÷ 11 = 0.272727... The digits 27 repeat, giving 0.27 with a dot over 2 and 7. This matches option B.",
    ),
  ],
  commonMistakes: [
    { mistake: "Writing 1/3 = 0.33 (rounded to 2 d.p.) rather than recognising the decimal recurs.", fix: "1/3 = 0.333... — it never ends. Use recurring notation unless asked to round." },
    { mistake: "Converting 0.3 to 3/100 instead of 3/10.", fix: "Count the decimal places to choose the power of 10: one decimal place means tenths (over 10), two places means hundredths (over 100)." },
    { mistake: "Forgetting to simplify the fraction after converting from a decimal: leaving 25/100 instead of 1/4.", fix: "After placing the decimal over the appropriate power of 10, always simplify by dividing by the HCF." },
    { mistake: "Dividing the denominator by the numerator instead of the numerator by the denominator.", fix: "The fraction a/b means a ÷ b. The numerator goes inside the division sign." },
  ],
  masteryQuiz: [
    answer(
      "y7-frc-cvt-m1",
      "Convert the fraction to a decimal.",
      "\\dfrac{3}{4}",
      "0.75",
      "Divide 3 by 4: 3 ÷ 4 = 0.75. This is a terminating decimal.",
    ),
    choice(
      "y7-frc-cvt-m2",
      "Which of these fractions produces a recurring decimal?",
      "D",
      ["$\\dfrac{1}{4}$", "$\\dfrac{3}{8}$", "$\\dfrac{7}{20}$", "$\\dfrac{5}{12}$"],
      "Denominators with only 2 and 5 as prime factors produce terminating decimals: 4 = 2², 8 = 2³, 20 = 4×5. But 12 = 4×3 — the factor 3 causes 5/12 to recur.",
    ),
    answer(
      "y7-frc-cvt-m3",
      "Convert the decimal to a fraction in simplest form.",
      "0.72",
      "18/25",
      "0.72 = 72/100. HCF of 72 and 100 is 4. Divide both by 4: 18/25.",
      ["18 / 25"]
    ),
    answer(
      "y7-frc-cvt-m4",
      "Convert the fraction to a decimal.",
      "\\dfrac{5}{8}",
      "0.625",
      "Divide 5 by 8: 5 ÷ 8 = 0.625. This is a terminating decimal.",
    ),
    answer(
      "y7-frc-cvt-m5",
      "Write 1/9 as a decimal. Use recurring notation.",
      "\\dfrac{1}{9}",
      "0.1111...",
      "Divide 1 by 9: 1 ÷ 9 = 0.1111... The digit 1 repeats forever.",
      ["0.111...", "0.1̄"]
    ),
    answer(
      "y7-frc-cvt-m6",
      "Convert the decimal to a fraction in simplest form.",
      "0.875",
      "7/8",
      "0.875 = 875/1000. HCF of 875 and 1000 is 125. Divide both by 125: 7/8.",
      ["7 / 8"]
    ),
    answer(
      "y7-frc-cvt-m7",
      "A jar contains 0.6 kg of almonds. Write this weight as a fraction in simplest form.",
      "0.6",
      "3/5",
      "0.6 = 6/10. HCF of 6 and 10 is 2. Divide both by 2: 3/5.",
      ["3 / 5"]
    ),
    choice(
      "y7-frc-cvt-m8",
      "A student converts 0.35 to 35/10. What error did they make?",
      "C",
      [
        "They forgot to simplify the fraction.",
        "They placed 35 over the wrong numerator.",
        "They used the wrong power of 10 — two decimal places means hundredths, not tenths.",
        "They should have multiplied the numerator and denominator by 10.",
      ],
      "0.35 has two decimal places, so the denominator should be 100, not 10. The correct conversion is 0.35 = 35/100 = 7/20.",
    ),
    answer(
      "y7-frc-cvt-m9",
      "Convert to a decimal, rounding to 4 decimal places if necessary.",
      "\\dfrac{5}{7}",
      "0.7143",
      "Divide 5 by 7: 5 ÷ 7 = 0.714285... Rounding to 4 decimal places gives 0.7143.",
    ),
    answer(
      "y7-frc-cvt-m10",
      "Write 11/20 as a decimal.",
      "\\dfrac{11}{20}",
      "0.55",
      "Multiply top and bottom by 5 to get 55/100 = 0.55. Alternatively, 11 ÷ 20 = 0.55.",
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 6 — Decimals operations
// ─────────────────────────────────────────────────────────────────────────────

const decimalsOperations: LessonContent = {
  description: "Add, subtract, multiply, and divide decimals, and round to a given number of decimal places.",
  learningIntention: "Perform the four operations with decimals and round answers to a required level of precision.",
  successCriteria: [
    "Add and subtract decimals by aligning decimal points before calculating.",
    "Multiply decimals by ignoring the decimal point during multiplication, then placing it correctly in the answer.",
    "Divide decimals by converting to whole number division where possible.",
    "Round a decimal to a given number of decimal places using the 'look at the next digit' rule.",
  ],
  teaching: {
    paragraphs: [
      "Adding and subtracting decimals is the same as adding whole numbers — with one extra rule. You must align the decimal points so that tenths line up with tenths, hundredths with hundredths, and so on. Fill any gaps with zeros as placeholders. Then add or subtract column by column, carrying or borrowing as usual.",
      "To multiply decimals, ignore the decimal points at first and multiply as if both numbers are whole numbers. Count the total number of decimal places in both numbers you multiplied. That is how many decimal places to put in the answer, counting from the right. For example, 2.4 x 1.3: multiply 24 x 13 = 312. Both numbers had 1 decimal place each, so the answer has 2 decimal places: 3.12.",
      "To divide a decimal by a whole number, set up the division normally and bring the decimal point straight up into the answer. To divide by a decimal, convert the divisor to a whole number by multiplying both numbers by the same power of 10. For example, 4.8 ÷ 0.6: multiply both by 10 to get 48 ÷ 6 = 8.",
      "To round to a given number of decimal places, look at the digit immediately after the required place. If it is 5 or more, round up the last kept digit by 1. If it is less than 5, leave the last kept digit unchanged. For example, 3.476 rounded to 2 decimal places: the third decimal is 6 (≥ 5), so round up to 3.48.",
    ],
    latexBlocks: [
      "\\text{Add/subtract: align decimal points, then calculate column by column}",
      "2.4\\times1.3:\\quad 24\\times13=312,\\quad\\text{2 d.p.}\\Rightarrow 3.12",
      "4.8\\div0.6=\\frac{4.8\\times10}{0.6\\times10}=\\frac{48}{6}=8",
      "\\text{Round 3.476 to 2 d.p.: third digit is 6}\\geq 5\\Rightarrow3.48",
    ],
  },
  workedExamples: [
    {
      title: "Add and subtract decimals",
      questionLatex: "\\text{Calculate }12.45 + 7.8 - 3.06.",
      steps: [
        { explanation: "Align all decimal points vertically. Write 7.8 as 7.80 and add trailing zeros as needed.", latex: "\\begin{array}{r}12.45\\\\+\\;\\,7.80\\\\\\hline 20.25\\end{array}" },
        { explanation: "Now subtract 3.06 from 20.25, again aligning decimal points.", latex: "\\begin{array}{r}20.25\\\\-\\;\\,3.06\\\\\\hline 17.19\\end{array}" },
      ],
      finalAnswerLatex: "17.19",
    },
    {
      title: "Multiply decimals",
      questionLatex: "\\text{Calculate }3.6\\times0.25.",
      steps: [
        { explanation: "Ignore decimal points and multiply 36 by 25.", latex: "36\\times25=900" },
        { explanation: "Count total decimal places: 3.6 has 1 and 0.25 has 2, so the product has 3 decimal places.", latex: "1+2=3\\text{ decimal places}" },
        { explanation: "Place the decimal point 3 places from the right in 900.", latex: "900\\rightarrow 0.900=0.9" },
      ],
      finalAnswerLatex: "0.9",
    },
    {
      title: "Round a decimal to a given number of places",
      questionLatex: "\\text{Round }5.7382\\text{ to 2 decimal places.}",
      steps: [
        { explanation: "Keep the first 2 decimal places and look at the third decimal digit to decide whether to round up or keep.", latex: "5.7\\underline{3}\\,\\mathbf{8}\\,2 \\quad \\text{(third digit is 8)}" },
        { explanation: "Since the third decimal digit 8 is greater than or equal to 5, round the second decimal place up by 1.", latex: "5.73\\rightarrow5.74" },
      ],
      finalAnswerLatex: "5.74",
    },
  ],
  guidedPractice: [
    choice(
      "y7-frc-dec-g1",
      "When adding 4.7 and 2.35, which column arrangement is correct?",
      "B",
      [
        "Place 4.7 under 2.35 so that 4 lines up with 3.",
        "Align the decimal points so that 4.70 is directly above 2.35.",
        "Add the digits from left to right without aligning.",
        "Multiply by 10 first to remove the decimal points.",
      ],
      "Decimal points must be aligned. Writing 4.7 as 4.70 ensures the tenths and hundredths columns line up correctly with 2.35.",
    ),
    answer(
      "y7-frc-dec-g2",
      "Calculate the sum.",
      "6.3 + 4.85",
      "11.15",
      "Write 6.3 as 6.30. Align decimal points and add: 6.30 + 4.85 = 11.15.",
    ),
    answer(
      "y7-frc-dec-g3",
      "Calculate the product.",
      "2.5\\times1.4",
      "3.5",
      "Multiply 25 x 14 = 350. Total decimal places: 1 + 1 = 2. So 350 becomes 3.50 = 3.5.",
    ),
    answer(
      "y7-frc-dec-g4",
      "Round 8.274 to 1 decimal place.",
      "8.274",
      "8.3",
      "Look at the second decimal digit: 7. Since 7 >= 5, round the first decimal digit up: 8.2 becomes 8.3.",
    ),
  ],
  independentPractice: [
    answer(
      "y7-frc-dec-i1",
      "Calculate the difference.",
      "15.3 - 8.74",
      "6.56",
      "Write 15.3 as 15.30. Align decimal points and subtract: 15.30 - 8.74. Borrow as needed: 6.56.",
    ),
    answer(
      "y7-frc-dec-i2",
      "Calculate the product.",
      "3.8\\times0.6",
      "2.28",
      "Multiply 38 x 6 = 228. Total decimal places: 1 + 1 = 2. So 228 becomes 2.28.",
    ),
    answer(
      "y7-frc-dec-i3",
      "Calculate the quotient.",
      "7.2\\div0.9",
      "8",
      "Multiply both by 10: 72 ÷ 9 = 8.",
    ),
    answer(
      "y7-frc-dec-i4",
      "A bottle holds 1.75 L of juice. Three friends each drink 0.4 L. How much juice is left?",
      "1.75 - 3\\times0.4",
      "0.55",
      "Three friends drink 3 x 0.4 = 1.20 L. Remaining: 1.75 - 1.20 = 0.55 L.",
    ),
    answer(
      "y7-frc-dec-i5",
      "Round 12.0853 to 3 decimal places.",
      "12.0853",
      "12.085",
      "The third decimal place is 5. Look at the fourth digit: 3. Since 3 < 5, the third decimal place stays as 5. Answer: 12.085.",
    ),
  ],
  commonMistakes: [
    { mistake: "Adding without aligning decimal points: writing 4.5 + 2.37 as 45 + 237 = 282, then misplacing the decimal.", fix: "Always write one number above the other with decimal points in the same column. Use trailing zeros as placeholders." },
    { mistake: "Placing the decimal in the product by counting only one factor's places: 2.4 x 1.3 gives 31.2 instead of 3.12.", fix: "Count the total decimal places in both numbers being multiplied and apply all of them to the product." },
    { mistake: "Rounding by looking at the last digit rather than the digit immediately after the required place.", fix: "To round to n decimal places, look only at the (n+1)th decimal digit. That single digit tells you whether to round up or keep." },
    { mistake: "Dividing 4.8 ÷ 0.6 by bringing up the decimal and getting 0.8 instead of 8.", fix: "Multiply both numbers by 10 to make the divisor a whole number first: 48 ÷ 6 = 8." },
  ],
  masteryQuiz: [
    answer(
      "y7-frc-dec-m1",
      "Calculate the sum.",
      "3.07 + 12.9 + 0.085",
      "16.055",
      "Align decimal points: 3.070 + 12.900 + 0.085 = 16.055.",
    ),
    choice(
      "y7-frc-dec-m2",
      "A student calculates 1.2 x 3.4 = 40.8. What error did they make?",
      "C",
      [
        "They multiplied 12 x 34 incorrectly.",
        "They added instead of multiplying.",
        "They placed the decimal point incorrectly — the answer should have 2 decimal places, giving 4.08.",
        "They forgot to carry during multiplication.",
      ],
      "12 x 34 = 408 is correct. But 1.2 has 1 d.p. and 3.4 has 1 d.p., giving a total of 2 d.p. So 408 becomes 4.08, not 40.8.",
    ),
    answer(
      "y7-frc-dec-m3",
      "Calculate the difference.",
      "20.05 - 8.7",
      "11.35",
      "Write 8.7 as 8.70. Align and subtract: 20.05 - 8.70. Borrow as needed: 11.35.",
    ),
    answer(
      "y7-frc-dec-m4",
      "Calculate the product.",
      "4.5\\times2.8",
      "12.6",
      "Multiply 45 x 28 = 1260. Total decimal places: 1 + 1 = 2. So 1260 becomes 12.60 = 12.6.",
    ),
    answer(
      "y7-frc-dec-m5",
      "Round 0.9748 to 3 decimal places.",
      "0.9748",
      "0.975",
      "Keep three decimal places and look at the fourth digit: 8. Since 8 >= 5, round the third decimal place up: 0.974 becomes 0.975.",
    ),
    answer(
      "y7-frc-dec-m6",
      "Calculate the quotient.",
      "15.6\\div0.04",
      "390",
      "Multiply both by 100: 1560 ÷ 4 = 390.",
    ),
    answer(
      "y7-frc-dec-m7",
      "Petrol costs $1.89 per litre. How much does 12.5 litres cost?",
      "12.5\\times1.89",
      "23.625",
      "Multiply 125 x 189 = 23625. Total decimal places: 1 + 2 = 3. So 23625 becomes 23.625. The cost is $23.625.",
      ["23.63"]
    ),
    answer(
      "y7-frc-dec-m8",
      "A piece of rope 8.4 m long is cut into pieces of 0.35 m each. How many pieces are there?",
      "8.4\\div0.35",
      "24",
      "Multiply both by 100: 840 ÷ 35 = 24. There are 24 pieces.",
    ),
    choice(
      "y7-frc-dec-m9",
      "Which of these is 7.3652 rounded to 2 decimal places?",
      "B",
      ["$7.36$", "$7.37$", "$7.40$", "$7.365$"],
      "Keep 2 decimal places: 7.36. Look at the third decimal digit: 5. Since 5 >= 5, round up: 7.36 becomes 7.37.",
    ),
    answer(
      "y7-frc-dec-m10",
      "A swimming pool is being filled at a rate of 1.35 m³ per minute. How much water enters the pool in 7.5 minutes?",
      "7.5\\times1.35",
      "10.125",
      "Multiply 75 x 135 = 10125. Total decimal places: 1 + 2 = 3. So 10125 becomes 10.125 m³.",
    ),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "fractions-types-and-equivalence": fractionsTypesAndEquivalence,
  "comparing-ordering-fractions": comparingOrderingFractions,
  "adding-subtracting-fractions": addingSubtractingFractions,
  "multiplying-dividing-fractions": multiplyingDividingFractions,
  "fractions-decimals-conversion": fractionsDecimalsConversion,
  "decimals-operations": decimalsOperations,
};

export function year7FractionsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "fractions") {
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
