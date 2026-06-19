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
    hint: "Think carefully about the rule for this lesson before calculating.",
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
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// Attach a difficulty tag (1–5) to a PracticeQuestion built by answer()/choice().
function diff(q: PracticeQuestion, d: number): PracticeQuestion {
  return { ...q, difficulty: d };
}

// ─── Lesson 1: Factors, Multiples, HCF and LCM ──────────────────────────────

const factorsMultiplesHcfLcm: LessonContent = {
  description: "List factors and multiples of whole numbers, then find the highest common factor (HCF) and lowest common multiple (LCM) of two numbers.",
  learningIntention: "Find the HCF and LCM of two numbers and use them to solve practical problems.",
  successCriteria: [
    "List all factors of a given whole number.",
    "List multiples of a given whole number.",
    "Find the highest common factor (HCF) of two numbers by comparing their factor lists.",
    "Find the lowest common multiple (LCM) of two numbers by comparing their multiple lists.",
    "Apply HCF and LCM to solve simple practical problems.",
  ],
  teaching: {
    paragraphs: [
      "A factor of a number is a whole number that divides into it exactly, leaving no remainder. Think of it as a number you can split a quantity into equal groups with: 12 lollies can be shared evenly among 1, 2, 3, 4, 6, or 12 children, so those are the factors of 12. You cannot share 12 evenly among 5 children, so 5 is not a factor.",
      "A multiple of a number is what you land on when you count up in steps of that number: the multiples of 4 are 4, 8, 12, 16, 20, and so on. A factor list always stops (12 has a largest factor, 12 itself), but multiples go on forever because you can always count one more step.",
      "Factors come in pairs, and that is the quickest way to list them all. For 12, you pair $1\\times12$, $2\\times6$, $3\\times4$ — each small factor has a partner you find by dividing. Writing the pairs $\\{1,12\\},\\{2,6\\},\\{3,4\\}$ guarantees you miss none, which is the usual error when people just guess.",
      "The highest common factor (HCF) of two numbers is the largest factor they both share. To find it, list the factors of each, look for the numbers in both lists, and take the biggest. For 12 and 18: factors of 12 are 1, 2, 3, 4, 6, 12 and factors of 18 are 1, 2, 3, 6, 9, 18; the shared factors are 1, 2, 3, 6, so the HCF is 6.",
      "Why does the HCF matter? It is the largest equal-group size you can split both numbers into at once. If you have 12 red counters and 18 blue counters and want identical piles using all of them, 6 piles works (2 red and 3 blue each) — and no larger number of piles divides both. So an HCF question is really a 'biggest equal share' question.",
      "The lowest common multiple (LCM) is the smallest number that appears in both multiple lists. For 4 and 6: multiples of 4 are 4, 8, 12, 16, … and multiples of 6 are 6, 12, 18, …; the first number in both is 12, so the LCM is 12. It is the first time two counting patterns line up again.",
      "Why does the LCM matter? Anything that repeats on a cycle — a bus every 4 minutes, a light every 6 minutes — meets again at the LCM of the cycles. That is also why the LCM is the smallest common denominator when adding fractions: it is the first number both denominators divide into.",
      "The easy mistake is mixing the two up. HCF is for splitting things into equal groups, so the answer is never larger than the smaller number. LCM is for finding when cycles coincide, so the answer is never smaller than the larger number. If your 'HCF' came out bigger than both numbers, you have actually found a common multiple — stop and re-check which one the question wants.",
    ],
    latexBlocks: [
      "\\text{Factors of }12: \\{1,\\,2,\\,3,\\,4,\\,6,\\,12\\} \\quad\\text{(pairs }1\\times12,\\;2\\times6,\\;3\\times4)",
      "\\text{Factors of }18: \\{1,\\,2,\\,3,\\,6,\\,9,\\,18\\} \\implies \\text{HCF}(12,18)=6",
      "\\text{Multiples of }4: 4,8,12,16,\\ldots \\quad \\text{Multiples of }6: 6,12,18,\\ldots \\implies \\text{LCM}(4,6)=12",
      "\\text{HCF}\\times\\text{LCM}=a\\times b",
    ],
  },
  workedExamples: [
    {
      title: "Find HCF of two numbers",
      questionLatex: "\\text{Find the HCF of 24 and 36.}",
      steps: [
        { explanation: "List all factors of 24 in pairs so none are missed.", latex: "\\text{Factors of }24: 1,2,3,4,6,8,12,24" },
        { explanation: "List all factors of 36 the same way.", latex: "\\text{Factors of }36: 1,2,3,4,6,9,12,18,36" },
        { explanation: "Mark the factors that appear in both lists.", latex: "\\text{Common factors: }1,2,3,4,6,12" },
        { explanation: "The HCF is the largest shared factor — the biggest equal-group size for both.", latex: "\\text{HCF}(24,36)=12" },
      ],
      finalAnswerLatex: "\\text{HCF}=12",
    },
    {
      title: "Find LCM of two numbers",
      questionLatex: "\\text{Find the LCM of 6 and 8.}",
      steps: [
        { explanation: "List multiples of 6 — count up in 6s.", latex: "\\text{Multiples of }6: 6,12,18,24,30,\\ldots" },
        { explanation: "List multiples of 8 — count up in 8s.", latex: "\\text{Multiples of }8: 8,16,24,32,\\ldots" },
        { explanation: "The first number to appear in both lists is where the two cycles first line up.", latex: "\\text{LCM}(6,8)=24" },
      ],
      finalAnswerLatex: "\\text{LCM}=24",
    },
    {
      title: "Apply LCM to a practical problem",
      questionLatex: "\\text{Bus A departs every 8 minutes. Bus B departs every 12 minutes. Both depart at 9:00 am. When do they next depart together?}",
      steps: [
        { explanation: "The buses meet again when both cycles line up, so find the LCM of 8 and 12.", latex: "\\text{Multiples of }8: 8,16,24,\\ldots \\quad \\text{Multiples of }12: 12,24,\\ldots" },
        { explanation: "The first shared multiple is 24, so they coincide 24 minutes later.", latex: "\\text{LCM}(8,12)=24\\text{ minutes}" },
        { explanation: "Add 24 minutes to the 9:00 am start.", latex: "9{:}00\\text{ am}+24\\text{ min}=9{:}24\\text{ am}" },
      ],
      finalAnswerLatex: "9{:}24\\text{ am}",
    },
    {
      title: "Use the HCF × LCM rule (harder)",
      questionLatex: "\\text{Two numbers have HCF 8 and LCM 240. One number is 48. Find the other.}",
      steps: [
        { explanation: "For any two numbers, the product of their HCF and LCM equals the product of the numbers themselves.", latex: "\\text{HCF}\\times\\text{LCM}=a\\times b" },
        { explanation: "Substitute the known HCF, LCM and one number.", latex: "8\\times240 = 48\\times b" },
        { explanation: "Work out the left side, then divide to isolate the unknown number.", latex: "1920 = 48\\times b \\implies b = \\tfrac{1920}{48}" },
        { explanation: "Divide to find the missing number.", latex: "b = 40" },
      ],
      finalAnswerLatex: "\\text{The other number is }40",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ind-fac-g1",
      "Which of the following is a factor of 20?",
      "C",
      ["7", "8", "4", "9"],
      "4 divides into 20 exactly (20 ÷ 4 = 5), so 4 is a factor. None of 7, 8, or 9 divide 20 exactly.",
      "\\text{Which divides 20 exactly?}"
    ),
    answer(
      "y7-ind-fac-g2",
      "List all factors of 18 and count them. How many factors does 18 have?",
      "\\text{Factors of }18: 1,2,3,6,9,18",
      "6",
      "The factors of 18 are 1, 2, 3, 6, 9, and 18. That is 6 factors."
    ),
    answer(
      "y7-ind-fac-g3",
      "Find the HCF of 12 and 20.",
      "\\text{Factors of }12: 1,2,3,4,6,12 \\quad \\text{Factors of }20: 1,2,4,5,10,20",
      "4",
      "Common factors of 12 and 20 are 1, 2, and 4. The largest is 4, so HCF = 4."
    ),
    answer(
      "y7-ind-fac-g4",
      "Find the LCM of 5 and 6.",
      "\\text{Multiples of }5: 5,10,15,20,25,30,\\ldots \\quad \\text{Multiples of }6: 6,12,18,24,30,\\ldots",
      "30",
      "The first shared multiple of 5 and 6 is 30, so LCM = 30."
    ),
  ],
  independentPractice: [
    answer(
      "y7-ind-fac-i1",
      "Find the HCF of 16 and 24.",
      "\\text{Factors of }16: 1,2,4,8,16 \\quad \\text{Factors of }24: 1,2,3,4,6,8,12,24",
      "8",
      "Common factors of 16 and 24 are 1, 2, 4, and 8. The largest is 8, so HCF = 8."
    ),
    answer(
      "y7-ind-fac-i2",
      "Find the LCM of 4 and 10.",
      "\\text{Multiples of }4: 4,8,12,16,20,\\ldots \\quad \\text{Multiples of }10: 10,20,\\ldots",
      "20",
      "The first shared multiple of 4 and 10 is 20, so LCM = 20."
    ),
    answer(
      "y7-ind-fac-i3",
      "Find the HCF of 30 and 45.",
      "\\text{Factors of }30: 1,2,3,5,6,10,15,30 \\quad \\text{Factors of }45: 1,3,5,9,15,45",
      "15",
      "Common factors of 30 and 45 are 1, 3, 5, and 15. The largest is 15, so HCF = 15."
    ),
    answer(
      "y7-ind-fac-i4",
      "Two friends mow lawns on different schedules. One mows every 4 days, the other every 6 days. They both mow today. After how many days will they next mow on the same day?",
      "\\text{LCM}(4,6)=?",
      "12",
      "Multiples of 4: 4, 8, 12, … Multiples of 6: 6, 12, … The LCM is 12, so they next mow together in 12 days."
    ),
    choice(
      "y7-ind-fac-i5",
      "Which statement about HCF and LCM is always true?",
      "B",
      [
        "The HCF of two numbers is always larger than the LCM.",
        "The LCM of two numbers is always at least as large as either number.",
        "The HCF of two numbers equals their product.",
        "Two prime numbers have a LCM equal to their HCF.",
      ],
      "The LCM is the smallest shared multiple, which must be at least as large as either number. The HCF is never larger than the LCM for positive integers."
    ),
  ],
  commonMistakes: [
    { mistake: "Confusing factors with multiples — listing 3, 6, 9, 12 as factors of 3.", fix: "Factors divide into the number; multiples are what you get by multiplying the number." },
    { mistake: "Stopping factor lists too early, e.g. listing factors of 12 as 1, 2, 3, 4 and missing 6 and 12.", fix: "Always check factor pairs: for each small factor, divide to find its partner (12 ÷ 2 = 6 means both 2 and 6 are factors)." },
    { mistake: "Saying the HCF is the product of the two numbers.", fix: "The HCF is the largest factor both numbers share — it is always less than or equal to the smaller number." },
    { mistake: "Using the LCM when the problem needs the HCF, or vice versa.", fix: "HCF is for splitting into equal groups; LCM is for finding when cycles coincide or for common denominators." },
  ],
  masteryQuiz: [
    answer(
      "y7-ind-fac-m1",
      "How many factors does 28 have?",
      "\\text{Factors of }28: 1,2,4,7,14,28",
      "6",
      "The factors of 28 are 1, 2, 4, 7, 14, and 28 — that is 6 factors."
    ),
    answer(
      "y7-ind-fac-m2",
      "Find the HCF of 18 and 27.",
      "\\text{Factors of }18: 1,2,3,6,9,18 \\quad \\text{Factors of }27: 1,3,9,27",
      "9",
      "Common factors of 18 and 27 are 1, 3, and 9. The HCF is 9."
    ),
    answer(
      "y7-ind-fac-m3",
      "Find the LCM of 8 and 12.",
      "\\text{Multiples of }8: 8,16,24,\\ldots \\quad \\text{Multiples of }12: 12,24,\\ldots",
      "24",
      "The first shared multiple of 8 and 12 is 24, so LCM = 24."
    ),
    choice(
      "y7-ind-fac-m4",
      "What is the HCF of 15 and 25?",
      "B",
      ["3", "5", "15", "25"],
      "Factors of 15: 1, 3, 5, 15. Factors of 25: 1, 5, 25. The largest common factor is 5."
    ),
    answer(
      "y7-ind-fac-m5",
      "Find the LCM of 9 and 12.",
      "\\text{Multiples of }9: 9,18,27,36,\\ldots \\quad \\text{Multiples of }12: 12,24,36,\\ldots",
      "36",
      "The first shared multiple of 9 and 12 is 36, so LCM = 36."
    ),
    answer(
      "y7-ind-fac-m6",
      "Find the HCF of 42 and 56.",
      "\\text{Factors of }42: 1,2,3,6,7,14,21,42 \\quad \\text{Factors of }56: 1,2,4,7,8,14,28,56",
      "14",
      "Common factors of 42 and 56 are 1, 2, 7, and 14. The HCF is 14."
    ),
    choice(
      "y7-ind-fac-m7",
      "Two lights flash together at 6:00 pm. Light A flashes every 3 minutes; Light B every 5 minutes. When do they next flash together?",
      "C",
      ["6:03 pm", "6:05 pm", "6:15 pm", "6:08 pm"],
      "LCM(3, 5) = 15, so the lights next flash together 15 minutes after 6:00 pm, at 6:15 pm."
    ),
    answer(
      "y7-ind-fac-m8",
      "Find the LCM of 6 and 14.",
      "\\text{Multiples of }6: 6,12,18,24,30,36,42,\\ldots \\quad \\text{Multiples of }14: 14,28,42,\\ldots",
      "42",
      "The first shared multiple of 6 and 14 is 42, so LCM = 42."
    ),
    answer(
      "y7-ind-fac-m9",
      "A number has HCF 6 with the number 18. Which of these could be the number: 8, 12, or 30? Write the number.",
      "\\text{HCF}(n,18)=6",
      "12",
      "Factors of 18 include 6. HCF(8,18)=2, HCF(12,18)=6, HCF(30,18)=6. Both 12 and 30 work, but 12 is the smallest such value among those listed.",
      ["30"]
    ),
    answer(
      "y7-ind-fac-m10",
      "The LCM of two numbers is 60 and their HCF is 5. One of the numbers is 15. Find the other number.",
      "\\text{LCM}\\times\\text{HCF}=a\\times b \\implies 60\\times5=15\\times b",
      "20",
      "Using LCM × HCF = a × b: 60 × 5 = 15 × b, so 300 = 15b, giving b = 20."
    ),
  ],
};

// ─── Lesson 2: Primes and Prime Factorisation ────────────────────────────────

const primesAndPrimeFactorisation: LessonContent = {
  description: "Identify prime and composite numbers, build factor trees, and write any composite number as a product of prime factors using index notation.",
  learningIntention: "Express composite numbers as a product of prime factors using factor trees and index notation.",
  successCriteria: [
    "State whether a given number is prime or composite and explain why.",
    "Identify all prime numbers up to 50.",
    "Build a factor tree for a composite number.",
    "Write the prime factorisation of a number using index notation.",
  ],
  teaching: {
    paragraphs: [
      "A prime number is a whole number bigger than 1 that has exactly two factors: 1 and itself. It cannot be split into equal groups in any other way. For example, 7 is prime because the only way to write it as a product of whole numbers is $1\\times7$ — try 7 counters and you can only make one row of 7 or seven rows of 1.",
      "A composite number has more than two factors, so it can be broken into smaller whole-number pieces. For example, 12 is composite because $12 = 3\\times4$, and you could go further: 4 itself splits into $2\\times2$. The number 1 is neither prime nor composite — it has only one factor, itself — and 2 is the only even prime, because every other even number already has 2 as an extra factor.",
      "Here is the key idea behind prime factorisation: every composite number can be built by multiplying primes together, and it can be built in only one way (apart from the order). Primes are the 'atoms' of whole numbers — the building blocks that cannot be broken down any further. This is why prime factorisation gives a single, fixed fingerprint for each number.",
      "A factor tree is how we find that fingerprint. Start by splitting the number into any factor pair, then keep splitting any branch that is still composite, until every branch ends in a prime. It does not matter which pair you start with — because the prime building blocks are fixed, you always reach the same set of primes at the bottom.",
      "Write the result using index notation, which is just shorthand for repeated multiplication. For 36, the tree gives $2\\times2\\times3\\times3$; counting two 2s and two 3s, we write $2^2\\times3^2$. The little numbers tell you how many times each prime atom appears.",
      "The two common traps are stopping too early and forgetting the index form. If you write $36 = 4\\times9$ and stop, you have not reached primes — 4 and 9 still split. Keep going until every branch is prime, then count repeats and write them as powers. A finished prime factorisation contains only prime bases.",
    ],
    latexBlocks: [
      "36 = 4\\times9 = 2\\times2\\times3\\times3 = 2^2\\times3^2",
      "\\text{Primes to 50: }2,3,5,7,11,13,17,19,23,29,31,37,41,43,47",
      "\\text{Prime factorisation of }60 = 2^2\\times3\\times5",
    ],
  },
  workedExamples: [
    {
      title: "Identify prime and composite numbers",
      questionLatex: "\\text{State whether 37 and 49 are prime or composite.}",
      steps: [
        { explanation: "Test 37: check whether any number from 2 to 6 divides it (since 6² = 36 < 37).", latex: "37\\div2,\\,37\\div3,\\,37\\div5\\text{ — none divide exactly}" },
        { explanation: "37 has no factors other than 1 and 37, so it is prime.", latex: "37\\text{ is prime}" },
        { explanation: "Test 49: 7 × 7 = 49, so 7 is a factor.", latex: "49 = 7\\times7" },
        { explanation: "49 has factors 1, 7, and 49, so it is composite.", latex: "49\\text{ is composite}" },
      ],
      finalAnswerLatex: "37\\text{ is prime; }49\\text{ is composite}",
    },
    {
      title: "Build a factor tree and write prime factorisation",
      questionLatex: "\\text{Write 72 as a product of prime factors using index notation.}",
      steps: [
        { explanation: "Split 72 into any factor pair — choose 8 × 9.", latex: "72 = 8\\times9" },
        { explanation: "Split 8 and 9 further.", latex: "8=2\\times4,\\quad 9=3\\times3" },
        { explanation: "Split 4 further; 3, 2 are already prime.", latex: "4=2\\times2" },
        { explanation: "Collect all prime factors: three 2s and two 3s.", latex: "72 = 2\\times2\\times2\\times3\\times3 = 2^3\\times3^2" },
      ],
      finalAnswerLatex: "72 = 2^3\\times3^2",
    },
    {
      title: "Use prime factorisation to find the HCF",
      questionLatex: "\\text{Use prime factorisation to find the HCF of 36 and 60.}",
      steps: [
        { explanation: "Write the prime factorisation of each number.", latex: "36=2^2\\times3^2 \\quad 60=2^2\\times3\\times5" },
        { explanation: "The HCF uses the lowest power of each shared prime factor.", latex: "\\text{Shared primes: }2^2\\text{ and }3^1" },
        { explanation: "Multiply the shared prime powers together.", latex: "\\text{HCF}=2^2\\times3=4\\times3=12" },
      ],
      finalAnswerLatex: "\\text{HCF}(36,60)=12",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ind-pri-g1",
      "Which of the following is a prime number?",
      "C",
      ["15", "21", "23", "27"],
      "23 has no factors other than 1 and 23, so it is prime. 15 = 3 × 5, 21 = 3 × 7, 27 = 3 × 9 are all composite.",
      "\\text{Which number has exactly two factors?}"
    ),
    answer(
      "y7-ind-pri-g2",
      "Write 20 as a product of prime factors. Give your answer in index form (e.g. $2^2 × 5$).",
      "20 = 4\\times5 = 2\\times2\\times5",
      "2^2*5",
      "20 = 4 × 5 = 2 × 2 × 5 = 2² × 5.",
      ["2^2 x 5", "2^2 × 5", "4*5", "2*2*5"]
    ),
    answer(
      "y7-ind-pri-g3",
      "How many prime numbers are there between 10 and 30?",
      "\\text{Check: }11,13,17,19,23,29",
      "6",
      "The primes between 10 and 30 are 11, 13, 17, 19, 23, and 29 — that is 6 prime numbers."
    ),
    answer(
      "y7-ind-pri-g4",
      "Write 45 as a product of prime factors in index form.",
      "45 = 9\\times5 = 3\\times3\\times5",
      "3^2*5",
      "45 = 9 × 5 = 3 × 3 × 5 = 3² × 5.",
      ["3^2 x 5", "3^2 × 5", "9*5"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ind-pri-i1",
      "Write 48 as a product of prime factors in index form.",
      "48 = 2\\times24 = 2\\times2\\times12 = 2\\times2\\times4\\times3",
      "2^4*3",
      "48 = 2 × 2 × 2 × 2 × 3 = 2⁴ × 3.",
      ["2^4 x 3", "2^4 × 3"]
    ),
    answer(
      "y7-ind-pri-i2",
      "Write 100 as a product of prime factors in index form.",
      "100 = 4\\times25 = 2\\times2\\times5\\times5",
      "2^2*5^2",
      "100 = 2 × 2 × 5 × 5 = 2² × 5².",
      ["2^2 x 5^2", "2^2 × 5^2", "4*25"]
    ),
    answer(
      "y7-ind-pri-i3",
      "Find the largest prime number less than 40.",
      "\\text{Primes near 40: }31,37",
      "37",
      "The primes below 40 include 31 and 37. The largest is 37."
    ),
    answer(
      "y7-ind-pri-i4",
      "Write 84 as a product of prime factors in index form.",
      "84 = 4\\times21 = 2\\times2\\times3\\times7",
      "2^2*3*7",
      "84 = 4 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7.",
      ["2^2 x 3 x 7", "2^2 × 3 × 7"]
    ),
    choice(
      "y7-ind-pri-i5",
      "The prime factorisation of a number is 2³ × 5. What is the number?",
      "B",
      ["20", "40", "30", "10"],
      "2³ × 5 = 8 × 5 = 40."
    ),
  ],
  commonMistakes: [
    { mistake: "Saying 1 is a prime number.", fix: "1 has only one factor (itself), so it does not meet the definition of prime. The smallest prime is 2." },
    { mistake: "Stopping the factor tree too early — writing 12 = 4 × 3 without splitting 4 into 2 × 2.", fix: "Keep splitting every composite factor until every branch ends in a prime number." },
    { mistake: "Forgetting to use index notation — writing 2 × 2 × 2 × 3 instead of 2³ × 3.", fix: "Count how many times each prime appears and write it as a power." },
    { mistake: "Thinking even numbers cannot be prime.", fix: "2 is the only even prime. Every other even number has 2 as a factor, making it composite." },
  ],
  masteryQuiz: [
    choice(
      "y7-ind-pri-m1",
      "Which of the following is composite?",
      "D",
      ["11", "17", "41", "51"],
      "51 = 3 × 17, so it is composite. The others (11, 17, 41) are all prime."
    ),
    answer(
      "y7-ind-pri-m2",
      "Write 56 as a product of prime factors in index form.",
      "56 = 8\\times7 = 2\\times2\\times2\\times7",
      "2^3*7",
      "56 = 2 × 2 × 2 × 7 = 2³ × 7.",
      ["2^3 x 7", "2^3 × 7"]
    ),
    answer(
      "y7-ind-pri-m3",
      "Write 90 as a product of prime factors in index form.",
      "90 = 2\\times45 = 2\\times9\\times5 = 2\\times3\\times3\\times5",
      "2*3^2*5",
      "90 = 2 × 3 × 3 × 5 = 2 × 3² × 5.",
      ["2 x 3^2 x 5", "2 × 3^2 × 5"]
    ),
    answer(
      "y7-ind-pri-m4",
      "A number has prime factorisation 2² × 7. What is the number?",
      "2^2\\times7",
      "28",
      "2² × 7 = 4 × 7 = 28."
    ),
    answer(
      "y7-ind-pri-m5",
      "Write 120 as a product of prime factors in index form.",
      "120 = 8\\times15 = 2^3\\times3\\times5",
      "2^3*3*5",
      "120 = 8 × 15 = 2³ × 3 × 5.",
      ["2^3 x 3 x 5", "2^3 × 3 × 5"]
    ),
    choice(
      "y7-ind-pri-m6",
      "What is the prime factorisation of 36?",
      "A",
      ["$2^2\\times3^2$", "$2^3\\times3$", "$2\\times3^3$", "$6^2$"],
      "36 = 4 × 9 = 2 × 2 × 3 × 3 = 2² × 3². Option B gives 24, option C gives 54, option D is not a prime factorisation."
    ),
    answer(
      "y7-ind-pri-m7",
      "How many prime factors (counting multiplicity) does 180 have?",
      "180 = 2^2\\times3^2\\times5",
      "5",
      "180 = 2² × 3² × 5 = 2 × 2 × 3 × 3 × 5. Counting each prime with its multiplicity gives 2 + 2 + 1 = 5 prime factors."
    ),
    answer(
      "y7-ind-pri-m8",
      "Find the HCF of 72 and 90 using prime factorisation.",
      "72=2^3\\times3^2 \\quad 90=2\\times3^2\\times5",
      "18",
      "72 = 2³ × 3², 90 = 2 × 3² × 5. Shared primes with lowest powers: 2¹ × 3² = 2 × 9 = 18."
    ),
    answer(
      "y7-ind-pri-m9",
      "The prime factorisation of a number is 3 × 5 × 7. Is this number prime or composite? Write 'prime' or 'composite'.",
      "3\\times5\\times7",
      "composite",
      "3 × 5 × 7 = 105, which has multiple factors (3, 5, 7, 15, 21, 35, 105). Any number with a prime factorisation involving more than one prime is composite."
    ),
    answer(
      "y7-ind-pri-m10",
      "Write 2² × 3 × 5² as a single number.",
      "2^2\\times3\\times5^2",
      "300",
      "2² × 3 × 5² = 4 × 3 × 25 = 12 × 25 = 300."
    ),
  ],
};

// ─── Lesson 3: Squares, Cubes and Index Notation ─────────────────────────────

const squaresCubesIndexNotation: LessonContent = {
  description: "Evaluate squares and square roots, cubes and cube roots, and read and write index notation with any base and exponent.",
  learningIntention: "Read and write index notation, evaluate powers of whole numbers, and find square and cube roots.",
  successCriteria: [
    "Identify the base and exponent in index notation.",
    "Evaluate squares (1² to 15²) and find square roots of perfect squares.",
    "Evaluate cubes (1³ to 5³) and find cube roots of perfect cubes.",
    "Evaluate expressions written in index notation such as 2⁴ and 3³.",
  ],
  teaching: {
    paragraphs: [
      "Index notation is shorthand for repeated multiplication. Writing $3\\times3\\times3\\times3$ four times over is slow, so instead we write $3^4$: the small raised number says how many copies of the big number to multiply. The big number is the base and the small one is the exponent (also called the index or power).",
      "Concretely, $2^5$ means take five 2s and multiply them: $2\\times2\\times2\\times2\\times2 = 32$. The exponent is a count of copies, not something you multiply the base by — that distinction is the heart of this topic.",
      "In general $a^n$ means $n$ copies of $a$ multiplied together. Read $a^n$ as '$a$ to the power $n$'. Squaring is the power-2 case ($5^2 = 5\\times5 = 25$) and cubing is the power-3 case ($2^3 = 2\\times2\\times2 = 8$); they get their own names because area uses squares and volume uses cubes.",
      "Why does this matter? Because powers grow by repeated multiplication, they get big fast — $2^5 = 32$ but $2^{10} = 1024$. That is also why $2^5$ and $5^2$ are different: $2^5$ is five 2s ($=32$) while $5^2$ is two 5s ($=25$). The base and exponent play different roles and you cannot swap them.",
      "A root runs the operation backwards. The square root asks 'what number, squared, gives this?' — so $\\sqrt{25}=5$ because $5^2=25$. The cube root asks 'what number, cubed, gives this?' — so $\\sqrt[3]{27}=3$ because $3^3=27$. Knowing the square numbers 1, 4, 9, 16, 25, … and cubes 1, 8, 27, 64, 125 lets you read roots straight off.",
      "Watch the most common slip: $2^3$ is not $2\\times3=6$, and it is not $2+2+2=6$ either. It is $2\\times2\\times2=8$. Whenever you are unsure, write the base out that many times and multiply — the notation never means anything more exotic than 'this many copies, multiplied'.",
    ],
    latexBlocks: [
      "a^n = \\underbrace{a\\times a\\times\\cdots\\times a}_{n\\text{ copies}}",
      "\\sqrt{25}=5\\text{ because }5^2=25 \\qquad \\sqrt[3]{27}=3\\text{ because }3^3=27",
      "2^5 = 2\\times2\\times2\\times2\\times2 = 32 \\quad\\neq\\quad 5^2 = 5\\times5 = 25",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a power using repeated multiplication",
      questionLatex: "\\text{Evaluate }2^5.",
      steps: [
        { explanation: "The base is 2 and the exponent is 5, so the answer is five 2s multiplied together.", latex: "2^5 = 2\\times2\\times2\\times2\\times2" },
        { explanation: "Multiply one factor at a time so you do not lose track of how many copies you have used.", latex: "2\\times2=4,\\quad 4\\times2=8,\\quad 8\\times2=16,\\quad 16\\times2=32" },
      ],
      finalAnswerLatex: "2^5 = 32",
    },
    {
      title: "Find a square root",
      questionLatex: "\\text{Find }\\sqrt{144}.",
      steps: [
        { explanation: "A square root asks: what number multiplied by itself gives 144?", latex: "\\sqrt{144}=?\\implies n^2=144" },
        { explanation: "Recall the square numbers; 12 is the one that works.", latex: "12^2=12\\times12=144" },
      ],
      finalAnswerLatex: "\\sqrt{144}=12",
    },
    {
      title: "Evaluate a cube and find a cube root",
      questionLatex: "\\text{Evaluate }4^3 \\text{ and find }\\sqrt[3]{125}.",
      steps: [
        { explanation: "For 4³, multiply three copies of 4 together.", latex: "4^3=4\\times4\\times4=64" },
        { explanation: "For ∛125, a cube root asks what number cubed gives 125.", latex: "5^3=5\\times5\\times5=125\\implies\\sqrt[3]{125}=5" },
      ],
      finalAnswerLatex: "4^3=64 \\quad \\sqrt[3]{125}=5",
    },
    {
      title: "Compare and combine powers (harder)",
      questionLatex: "\\text{Which is larger, }3^4\\text{ or }4^3,\\text{ and by how much?}",
      steps: [
        { explanation: "Evaluate the first power as four copies of 3.", latex: "3^4 = 3\\times3\\times3\\times3 = 81" },
        { explanation: "Evaluate the second power as three copies of 4 — note the base and exponent are swapped.", latex: "4^3 = 4\\times4\\times4 = 64" },
        { explanation: "Compare the two values; swapping base and exponent changes the result.", latex: "81 > 64" },
        { explanation: "Subtract to find the difference.", latex: "81 - 64 = 17" },
      ],
      finalAnswerLatex: "3^4=81\\text{ is larger than }4^3=64\\text{ by }17",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ind-idx-g1",
      "What does 3⁴ mean?",
      "B",
      ["$3\\times4$", "$3\\times3\\times3\\times3$", "$4\\times4\\times4$", "$3+3+3+3$"],
      "3⁴ means the base 3 multiplied by itself 4 times: 3 × 3 × 3 × 3.",
      "3^4"
    ),
    answer(
      "y7-ind-idx-g2",
      "Evaluate 6².",
      "6^2 = 6\\times6",
      "36",
      "6² = 6 × 6 = 36."
    ),
    answer(
      "y7-ind-idx-g3",
      "Find $\\sqrt{81}$.",
      "\\sqrt{81}=?",
      "9",
      "9 × 9 = 81, so √81 = 9."
    ),
    answer(
      "y7-ind-idx-g4",
      "Evaluate 2⁶.",
      "2^6 = 2\\times2\\times2\\times2\\times2\\times2",
      "64",
      "2⁶ = 2 × 2 × 2 × 2 × 2 × 2 = 64."
    ),
  ],
  independentPractice: [
    answer(
      "y7-ind-idx-i1",
      "Evaluate 3⁴.",
      "3^4 = 3\\times3\\times3\\times3",
      "81",
      "3⁴ = 3 × 3 × 3 × 3 = 9 × 9 = 81."
    ),
    answer(
      "y7-ind-idx-i2",
      "Find $\\sqrt[3]{64}$.",
      "\\sqrt[3]{64}=?\\implies n^3=64",
      "4",
      "4³ = 4 × 4 × 4 = 64, so ∛64 = 4."
    ),
    answer(
      "y7-ind-idx-i3",
      "Find $\\sqrt{225}$.",
      "\\sqrt{225}=?",
      "15",
      "15² = 15 × 15 = 225, so √225 = 15."
    ),
    answer(
      "y7-ind-idx-i4",
      "Evaluate 5³.",
      "5^3 = 5\\times5\\times5",
      "125",
      "5³ = 5 × 5 × 5 = 25 × 5 = 125."
    ),
    choice(
      "y7-ind-idx-i5",
      "Which value is larger: 2⁵ or 5²?",
      "A",
      ["$2^5=32$, which is larger", "$5^2=32$, which is larger", "They are equal", "$5^2=25$, which is larger"],
      "2⁵ = 32 and 5² = 25. Since 32 > 25, 2⁵ is larger."
    ),
  ],
  commonMistakes: [
    { mistake: "Multiplying the base by the exponent: 3⁴ = 12 (doing 3 × 4 instead of 3 × 3 × 3 × 3).", fix: "The exponent tells you how many times to use the base as a factor in multiplication, not what to multiply the base by." },
    { mistake: "Thinking √81 = 40.5 by halving 81.", fix: "Square root means 'what number times itself gives this?', not 'divide by 2'." },
    { mistake: "Evaluating 2³ as 6 (adding 2 three times) instead of 8.", fix: "Index notation means repeated multiplication: 2³ = 2 × 2 × 2 = 8, not 2 + 2 + 2." },
    { mistake: "Writing 7² as 14 (doing 7 × 2).", fix: "7² means 7 × 7 = 49. The exponent 2 tells you to multiply the base by itself, not by 2." },
  ],
  masteryQuiz: [
    answer(
      "y7-ind-idx-m1",
      "Evaluate 4³.",
      "4^3 = 4\\times4\\times4",
      "64",
      "4³ = 4 × 4 × 4 = 16 × 4 = 64."
    ),
    answer(
      "y7-ind-idx-m2",
      "Find $\\sqrt{196}$.",
      "\\sqrt{196}=?",
      "14",
      "14² = 14 × 14 = 196, so √196 = 14."
    ),
    choice(
      "y7-ind-idx-m3",
      "What is 2⁴ + 3²?",
      "C",
      ["7", "15", "25", "12"],
      "2⁴ = 16 and 3² = 9. So 2⁴ + 3² = 16 + 9 = 25."
    ),
    answer(
      "y7-ind-idx-m4",
      "Find $\\sqrt[3]{216}$.",
      "\\sqrt[3]{216}=?\\implies n^3=216",
      "6",
      "6³ = 6 × 6 × 6 = 216, so ∛216 = 6."
    ),
    answer(
      "y7-ind-idx-m5",
      "Evaluate 10³.",
      "10^3 = 10\\times10\\times10",
      "1000",
      "10³ = 10 × 10 × 10 = 1000."
    ),
    answer(
      "y7-ind-idx-m6",
      "Write 32 in index notation using base 2.",
      "2^{\\,?}=32",
      "2^5",
      "32 = 2 × 2 × 2 × 2 × 2 = 2⁵.",
      ["2^{5}"]
    ),
    choice(
      "y7-ind-idx-m7",
      "A student writes 5³ = 15. What mistake did they make?",
      "B",
      ["They used the wrong base.", "They multiplied 5 × 3 instead of 5 × 5 × 5.", "They forgot to add the exponent.", "They calculated the square root instead."],
      "5³ means 5 × 5 × 5 = 125, not 5 × 3 = 15. The exponent says how many times to multiply the base by itself."
    ),
    answer(
      "y7-ind-idx-m8",
      "Evaluate 7².",
      "7^2 = 7\\times7",
      "49",
      "7² = 7 × 7 = 49."
    ),
    answer(
      "y7-ind-idx-m9",
      "What is $\\sqrt{169}$?",
      "\\sqrt{169}=?",
      "13",
      "13² = 13 × 13 = 169, so √169 = 13."
    ),
    answer(
      "y7-ind-idx-m10",
      "Evaluate 2³ × 3² without a calculator.",
      "2^3\\times3^2",
      "72",
      "2³ = 8 and 3² = 9. 8 × 9 = 72."
    ),
  ],
};

// ─── Lesson 4: Index Laws — Product, Quotient and Power ─────────────────────

const indexLawsProductQuotientPower: LessonContent = {
  description: "Apply the product, quotient, and power-of-a-power index laws to simplify and evaluate numerical expressions.",
  learningIntention: "Use the product law, quotient law, and power-of-a-power law to simplify expressions with the same base.",
  successCriteria: [
    "Apply the product law: aᵐ × aⁿ = aᵐ⁺ⁿ to add exponents when multiplying same-base powers.",
    "Apply the quotient law: aᵐ ÷ aⁿ = aᵐ⁻ⁿ to subtract exponents when dividing same-base powers.",
    "Apply the power-of-a-power law: (aᵐ)ⁿ = aᵐⁿ to multiply exponents.",
    "Evaluate the resulting numerical expression after applying an index law.",
  ],
  teaching: {
    paragraphs: [
      "Index laws are shortcuts that let you combine powers without ever writing them out in full. There are three to learn — for multiplying, dividing, and raising a power to a power — and each is really just a counting trick. Every one of them only works when the powers share the same base.",
      "Start with multiplying. To work out $2^3\\times2^4$ without any rule, write each power out: $(2\\times2\\times2)\\times(2\\times2\\times2\\times2)$. Count the 2s — there are three from the first power and four from the second, so seven 2s in all, which is $2^7$. You added the counts: $3+4=7$. That is the product law: $a^m\\times a^n = a^{m+n}$, and it works because you are just totalling how many copies of the base you have.",
      "Dividing reverses that idea by cancelling. To do $3^5\\div3^2$, write it as a fraction: $\\dfrac{3\\times3\\times3\\times3\\times3}{3\\times3}$. Two 3s on the bottom cancel two 3s on the top, leaving three 3s, which is $3^3$. You removed 2 copies from 5, so $5-2=3$. That is the quotient law: $a^m\\div a^n = a^{m-n}$ — subtraction counts the copies left after cancelling.",
      "Raising a power to a power stacks copies. $(2^3)^4$ means four copies of $2^3$ multiplied: $2^3\\times2^3\\times2^3\\times2^3$. Each $2^3$ contributes three 2s, and there are four of them, so the total is $3\\times4=12$ twos, giving $2^{12}$. That is the power law: $(a^m)^n = a^{mn}$ — you multiply because you have $n$ groups of $m$ copies each.",
      "Notice every law is a statement about counting copies of one repeated base. That is exactly why the bases must match: if the bases differ, the copies are not the same thing, so there is nothing to count together. In Year 7 we use whole-number bases, but the same counting logic holds for any base.",
      "The mistake to guard against is touching the base. In $2^3\\times2^4=2^7$, the base stays 2 — it does not become $4^7$. You never multiply or add the bases; the rule moves only the exponents. And keep the laws straight: multiplying adds exponents, but a power-of-a-power multiplies them, so $(2^3)^4$ is $2^{12}$, not $2^7$.",
      "Finally, read the question before you stop. If it says 'simplify', leaving the answer as a single power like $2^7$ is enough; if it says 'evaluate', finish the job — $2^7 = 128$.",
    ],
    latexBlocks: [
      "2^3\\times2^4 = (2{\\times}2{\\times}2)(2{\\times}2{\\times}2{\\times}2) = 2^{3+4} = 2^7",
      "a^m\\times a^n = a^{m+n} \\quad\\text{(product: add)} \\qquad a^m\\div a^n = a^{m-n} \\quad\\text{(quotient: subtract)}",
      "(a^m)^n = a^{mn} \\quad\\text{(power of a power: multiply)}",
    ],
  },
  workedExamples: [
    {
      title: "Apply the product law and evaluate",
      questionLatex: "\\text{Simplify }3^2\\times3^3\\text{ and evaluate.}",
      steps: [
        { explanation: "The bases are the same (both 3), so add the exponents.", latex: "3^2\\times3^3 = 3^{2+3} = 3^5" },
        { explanation: "Evaluate 3⁵ by repeated multiplication.", latex: "3^5 = 3\\times3\\times3\\times3\\times3 = 243" },
      ],
      finalAnswerLatex: "3^2\\times3^3 = 243",
    },
    {
      title: "Apply the quotient law and evaluate",
      questionLatex: "\\text{Simplify }2^6\\div2^2\\text{ and evaluate.}",
      steps: [
        { explanation: "The bases are the same, so subtract the exponents.", latex: "2^6\\div2^2 = 2^{6-2} = 2^4" },
        { explanation: "Evaluate 2⁴.", latex: "2^4 = 2\\times2\\times2\\times2 = 16" },
      ],
      finalAnswerLatex: "2^6\\div2^2 = 16",
    },
    {
      title: "Apply the power-of-a-power law and evaluate",
      questionLatex: "\\text{Simplify }(2^3)^2\\text{ and evaluate.}",
      steps: [
        { explanation: "Multiply the exponents together using the power-of-a-power law.", latex: "(2^3)^2 = 2^{3\\times2} = 2^6" },
        { explanation: "Evaluate 2⁶.", latex: "2^6 = 64" },
      ],
      finalAnswerLatex: "(2^3)^2 = 64",
    },
    {
      title: "Combine all three laws (harder)",
      questionLatex: "\\text{Simplify }(3^2)^3\\times3^4\\div3^8\\text{ and evaluate.}",
      steps: [
        { explanation: "Resolve the power-of-a-power first: multiply its exponents.", latex: "(3^2)^3 = 3^{2\\times3} = 3^6" },
        { explanation: "Apply the product law to the multiplication: add exponents.", latex: "3^6\\times3^4 = 3^{6+4} = 3^{10}" },
        { explanation: "Apply the quotient law to the division: subtract exponents.", latex: "3^{10}\\div3^8 = 3^{10-8} = 3^2" },
        { explanation: "Evaluate the single power that remains.", latex: "3^2 = 9" },
      ],
      finalAnswerLatex: "(3^2)^3\\times3^4\\div3^8 = 9",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ind-law-g1",
      "To simplify 5³ × 5⁴, which operation do you perform on the exponents?",
      "A",
      ["Add them: 3 + 4 = 7", "Multiply them: 3 × 4 = 12", "Subtract them: 4 − 3 = 1", "Divide them: 4 ÷ 3"],
      "The product law says same-base powers are multiplied by adding exponents: 5³ × 5⁴ = 5⁷.",
      "5^3\\times5^4"
    ),
    answer(
      "y7-ind-law-g2",
      "Simplify 2³ × 2⁴ and evaluate your answer.",
      "2^3\\times2^4 = 2^{3+4}",
      "128",
      "2³ × 2⁴ = 2⁷ = 128."
    ),
    answer(
      "y7-ind-law-g3",
      "Simplify 3⁵ ÷ 3³ and evaluate your answer.",
      "3^5\\div3^3 = 3^{5-3}",
      "9",
      "3⁵ ÷ 3³ = 3² = 9."
    ),
    answer(
      "y7-ind-law-g4",
      "Simplify (2²)³ and evaluate your answer.",
      "(2^2)^3 = 2^{2\\times3}",
      "64",
      "(2²)³ = 2⁶ = 64."
    ),
  ],
  independentPractice: [
    answer(
      "y7-ind-law-i1",
      "Simplify 4² × 4³ and evaluate.",
      "4^2\\times4^3 = 4^{2+3}",
      "1024",
      "4² × 4³ = 4⁵ = 4 × 4 × 4 × 4 × 4 = 1024."
    ),
    answer(
      "y7-ind-law-i2",
      "Simplify 5⁶ ÷ 5⁴ and evaluate.",
      "5^6\\div5^4 = 5^{6-4}",
      "25",
      "5⁶ ÷ 5⁴ = 5² = 25."
    ),
    answer(
      "y7-ind-law-i3",
      "Simplify (3²)⁴ and evaluate.",
      "(3^2)^4 = 3^{2\\times4}",
      "6561",
      "(3²)⁴ = 3⁸ = 6561."
    ),
    answer(
      "y7-ind-law-i4",
      "Simplify 2⁸ ÷ 2³ and evaluate.",
      "2^8\\div2^3 = 2^{8-3}",
      "32",
      "2⁸ ÷ 2³ = 2⁵ = 32."
    ),
    choice(
      "y7-ind-law-i5",
      "Which expression is equivalent to (5²)³?",
      "C",
      ["$5^5$", "$5^2+5^3$", "$5^6$", "$5^8$"],
      "$(5^2)^3 = 5^{2×3} = 5^6$. Multiplying the exponents gives 6."
    ),
  ],
  commonMistakes: [
    { mistake: "Multiplying the bases as well as adding exponents: 2³ × 2⁴ = 4⁷.", fix: "Keep the base the same — only the exponents change. 2³ × 2⁴ = 2⁷, not 4⁷." },
    { mistake: "Applying an index law when the bases are different: 2³ × 3² = 6⁵.", fix: "Index laws only work when the bases are identical. 2³ × 3² cannot be simplified with the product law — evaluate each power separately." },
    { mistake: "Subtracting in the wrong order for division: 3³ ÷ 3⁵ = 3² instead of 3⁻².", fix: "Subtract the bottom exponent from the top: 3³ ÷ 3⁵ = 3^(3−5) = 3^(−2). Year 7 questions are designed so the result is non-negative, but the order still matters." },
    { mistake: "Adding exponents for the power-of-a-power law: (2³)⁴ = 2⁷ instead of 2¹².", fix: "Power-of-a-power multiplies the exponents: (2³)⁴ = 2^(3×4) = 2¹²." },
  ],
  masteryQuiz: [
    answer(
      "y7-ind-law-m1",
      "Simplify 2⁴ × 2³ and evaluate.",
      "2^4\\times2^3",
      "128",
      "2⁴ × 2³ = 2⁷ = 128."
    ),
    answer(
      "y7-ind-law-m2",
      "Simplify 3⁶ ÷ 3⁴ and evaluate.",
      "3^6\\div3^4",
      "9",
      "3⁶ ÷ 3⁴ = 3² = 9."
    ),
    choice(
      "y7-ind-law-m3",
      "Simplify 2³ × 2⁴ × 2⁵. Which answer is correct?",
      "B",
      ["$2^{60}$", "$2^{12}$", "$2^7$", "$8^{12}$"],
      "Add all exponents: 3 + 4 + 5 = 12. The answer is 2¹²."
    ),
    answer(
      "y7-ind-law-m4",
      "Simplify (5²)² and evaluate.",
      "(5^2)^2 = 5^{2\\times2}",
      "625",
      "(5²)² = 5⁴ = 625."
    ),
    answer(
      "y7-ind-law-m5",
      "Simplify 6⁵ ÷ 6³ and evaluate.",
      "6^5\\div6^3",
      "36",
      "6⁵ ÷ 6³ = 6² = 36."
    ),
    answer(
      "y7-ind-law-m6",
      "Evaluate (2⁴)² ÷ 2³.",
      "(2^4)^2\\div2^3",
      "32",
      "(2⁴)² = 2⁸. Then 2⁸ ÷ 2³ = 2⁵ = 32."
    ),
    choice(
      "y7-ind-law-m7",
      "A student writes 3⁴ × 3⁵ = 9⁹. What errors did they make?",
      "A",
      [
        "They multiplied the bases and added the exponents — bases stay the same.",
        "They added the bases and multiplied the exponents.",
        "They multiplied both the bases and exponents.",
        "They used the wrong law — should divide the exponents.",
      ],
      "$3^4 × 3^5 = 3^{4+5} = 3^9$. The base stays 3; only the exponents are added."
    ),
    answer(
      "y7-ind-law-m8",
      "Simplify 2² × 2³ × 2² and evaluate.",
      "2^2\\times2^3\\times2^2 = 2^{2+3+2}",
      "128",
      "2² × 2³ × 2² = 2⁷ = 128."
    ),
    answer(
      "y7-ind-law-m9",
      "Evaluate (3³)² ÷ 3³.",
      "(3^3)^2\\div3^3",
      "27",
      "(3³)² = 3⁶. Then 3⁶ ÷ 3³ = 3^(6−3) = 3³ = 27."
    ),
    answer(
      "y7-ind-law-m10",
      "Find the value of the exponent n if 2ⁿ = 2³ × 2⁴.",
      "2^n = 2^3\\times2^4 = 2^{3+4}",
      "7",
      "2³ × 2⁴ = 2⁷, so n = 7."
    ),
  ],
};

// ─── Lesson 5: Zero Index and Mixed Indices ──────────────────────────────────

const zeroIndexAndMixedIndices: LessonContent = {
  description: "Apply the zero index law (a⁰ = 1) and combine multiple index laws to simplify and evaluate mixed index expressions.",
  learningIntention: "Apply the zero index law and combine index laws to simplify and evaluate expressions involving multiple operations.",
  successCriteria: [
    "State and apply the zero index law: a⁰ = 1 for any non-zero base.",
    "Simplify expressions by applying index laws in the correct order.",
    "Evaluate mixed expressions such as 2³ × 2⁴ ÷ 2⁵.",
    "Write answers in simplest index form when required.",
  ],
  teaching: {
    paragraphs: [
      "Here is a surprising-looking fact: any non-zero number raised to the power zero equals 1. So $7^0 = 1$, $100^0 = 1$, and $(3^2)^0 = 1$. It feels odd at first because 'zero copies multiplied' has no obvious meaning — but the rule is forced on us by the laws we already have, not chosen at random.",
      "To see why, take any non-zero number divided by itself, which is always 1 — for instance $5^3\\div5^3 = 1$, since the top and bottom are identical. Now apply the quotient law to the very same expression: $5^3\\div5^3 = 5^{3-3} = 5^0$. The one expression equals both 1 and $5^0$, so $5^0$ must be 1. Nothing else is consistent.",
      "This is why the base must be non-zero. The argument relies on dividing a number by itself, and you cannot divide by 0. So $0^0$ is left undefined — every other base gives $a^0 = 1$.",
      "Once you trust the zero law, mixed expressions are just the earlier index laws applied in turn, with $a^0$ quietly contributing a factor of 1. Work one operation at a time, left to right for steps at the same level, exactly as you would with ordinary multiplication and division.",
      "For example, to simplify $2^3\\times2^4\\div2^5$: first the product law gives $2^3\\times2^4 = 2^7$, then the quotient law gives $2^7\\div2^5 = 2^2 = 4$. Doing one law per line keeps the exponent arithmetic visible and hard to get wrong.",
      "Two cautions. First, $5^0 = 1$, not 0 — the exponent being zero does not make the answer zero; it makes it 1. Second, after simplifying, re-read the question: if it wants index form, stop at the single power; if it wants a value, evaluate it.",
    ],
    latexBlocks: [
      "5^3\\div5^3 = 1 \\quad\\text{and}\\quad 5^3\\div5^3 = 5^{3-3} = 5^0 \\implies 5^0 = 1",
      "a^0 = 1 \\quad (\\text{for any }a\\neq0)",
      "2^3\\times2^4\\div2^5 = 2^{3+4}\\div2^5 = 2^7\\div2^5 = 2^2 = 4",
    ],
  },
  workedExamples: [
    {
      title: "Apply the zero index law",
      questionLatex: "\\text{Evaluate }7^0\\text{ and }(3^2)^0.",
      steps: [
        { explanation: "Any non-zero base raised to the power zero equals 1.", latex: "7^0 = 1" },
        { explanation: "The base here is 3², which is non-zero. So it also raises to zero and equals 1.", latex: "(3^2)^0 = 1" },
      ],
      finalAnswerLatex: "7^0=1 \\quad (3^2)^0=1",
    },
    {
      title: "Simplify a mixed index expression",
      questionLatex: "\\text{Simplify }3^4\\times3^2\\div3^5\\text{ and evaluate.}",
      steps: [
        { explanation: "Apply the product law first: add exponents for the multiplication.", latex: "3^4\\times3^2 = 3^{4+2} = 3^6" },
        { explanation: "Apply the quotient law: subtract the exponent for the division.", latex: "3^6\\div3^5 = 3^{6-5} = 3^1 = 3" },
      ],
      finalAnswerLatex: "3^4\\times3^2\\div3^5 = 3",
    },
    {
      title: "Write an expression in simplest index form",
      questionLatex: "\\text{Simplify }(2^3)^2\\div2^4.\\text{ Write in index form.}",
      steps: [
        { explanation: "Apply the power-of-a-power law first.", latex: "(2^3)^2 = 2^{3\\times2} = 2^6" },
        { explanation: "Apply the quotient law.", latex: "2^6\\div2^4 = 2^{6-4} = 2^2" },
      ],
      finalAnswerLatex: "2^2",
    },
    {
      title: "Combine the power and zero laws (harder)",
      questionLatex: "\\text{Simplify }(5^2)^3\\times5^0\\div5^6\\text{ and evaluate.}",
      steps: [
        { explanation: "Resolve the power-of-a-power first: multiply its exponents.", latex: "(5^2)^3 = 5^{2\\times3} = 5^6" },
        { explanation: "Apply the zero law: 5⁰ is just a factor of 1, so it leaves the product unchanged.", latex: "5^6\\times5^0 = 5^{6+0} = 5^6" },
        { explanation: "Apply the quotient law: subtract the exponents.", latex: "5^6\\div5^6 = 5^{6-6} = 5^0" },
        { explanation: "Evaluate the zero power.", latex: "5^0 = 1" },
      ],
      finalAnswerLatex: "(5^2)^3\\times5^0\\div5^6 = 1",
    },
  ],
  guidedPractice: [
    choice(
      "y7-ind-zer-g1",
      "What is the value of 100⁰?",
      "B",
      ["100", "1", "0", "10"],
      "Any non-zero base raised to the power 0 equals 1. So 100⁰ = 1.",
      "100^0 = ?"
    ),
    answer(
      "y7-ind-zer-g2",
      "Evaluate 5⁰ + 3².",
      "5^0+3^2",
      "10",
      "5⁰ = 1 and 3² = 9. So 5⁰ + 3² = 1 + 9 = 10."
    ),
    answer(
      "y7-ind-zer-g3",
      "Simplify 2⁵ × 2³ ÷ 2⁶ and evaluate.",
      "2^5\\times2^3\\div2^6",
      "4",
      "2⁵ × 2³ = 2⁸. Then 2⁸ ÷ 2⁶ = 2² = 4."
    ),
    answer(
      "y7-ind-zer-g4",
      "Simplify (3³)² ÷ 3⁶. Write your answer in index form.",
      "(3^3)^2\\div3^6",
      "3^0",
      "(3³)² = 3⁶. Then 3⁶ ÷ 3⁶ = 3⁰. The answer in index form is 3⁰.",
      ["3^{0}", "1"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-ind-zer-i1",
      "Evaluate 8⁰ + 4¹ + 2².",
      "8^0+4^1+2^2",
      "9",
      "8⁰ = 1, 4¹ = 4, 2² = 4. So 1 + 4 + 4 = 9."
    ),
    answer(
      "y7-ind-zer-i2",
      "Simplify 5⁴ ÷ 5² × 5⁰ and evaluate.",
      "5^4\\div5^2\\times5^0",
      "25",
      "5⁴ ÷ 5² = 5². Then 5² × 5⁰ = 5² × 1 = 25."
    ),
    answer(
      "y7-ind-zer-i3",
      "Simplify 2⁶ × 2³ ÷ 2⁷ and evaluate.",
      "2^6\\times2^3\\div2^7",
      "4",
      "2⁶ × 2³ = 2⁹. Then 2⁹ ÷ 2⁷ = 2² = 4."
    ),
    answer(
      "y7-ind-zer-i4",
      "Simplify (4²)³ ÷ 4⁵ and evaluate.",
      "(4^2)^3\\div4^5",
      "4",
      "(4²)³ = 4⁶. Then 4⁶ ÷ 4⁵ = 4^(6−5) = 4¹ = 4."
    ),
    choice(
      "y7-ind-zer-i5",
      "Which expression does NOT equal 1?",
      "D",
      ["$10^0$", "$7^0$", "$(2^3)^0$", "$0^0$"],
      "10⁰ = 7⁰ = (2³)⁰ = 1 since any non-zero base to the power 0 is 1. The expression 0⁰ is undefined — 0 is excluded from the zero index law."
    ),
  ],
  commonMistakes: [
    { mistake: "Writing a⁰ = 0 instead of 1.", fix: "Any non-zero number raised to the power 0 equals 1, not 0. Use the quotient law to verify: 5³ ÷ 5³ = 5⁰ = 1." },
    { mistake: "Applying the product law across different bases: 2³ × 3² = 6⁵.", fix: "Index laws only apply when bases are identical. Evaluate powers of different bases separately before combining." },
    { mistake: "Adding instead of multiplying exponents in (2³)⁴: writing 2⁷ instead of 2¹².", fix: "The power-of-a-power law multiplies the exponents: (2³)⁴ = 2^(3×4) = 2¹²." },
    { mistake: "Not simplifying fully — leaving 2⁷ ÷ 2⁵ as 2⁷ ÷ 2⁵ rather than evaluating to 2² = 4.", fix: "After applying an index law, check whether the exponent can be evaluated further and whether the question asks for a number or index form." },
  ],
  masteryQuiz: [
    answer(
      "y7-ind-zer-m1",
      "Evaluate 9⁰.",
      "9^0",
      "1",
      "Any non-zero base raised to the power 0 equals 1. So 9⁰ = 1."
    ),
    choice(
      "y7-ind-zer-m2",
      "Simplify 3² × 3³ ÷ 3⁴. Which answer is correct?",
      "B",
      ["$3^9$", "$3^1$", "$3^0$", "$3^{24}$"],
      "3² × 3³ = 3⁵. Then 3⁵ ÷ 3⁴ = 3¹ = 3."
    ),
    answer(
      "y7-ind-zer-m3",
      "Evaluate 2⁴ × 2⁰ × 2².",
      "2^4\\times2^0\\times2^2",
      "64",
      "2⁴ × 2⁰ × 2² = 2^(4+0+2) = 2⁶ = 64."
    ),
    answer(
      "y7-ind-zer-m4",
      "Simplify (5²)³ ÷ 5⁵ and evaluate.",
      "(5^2)^3\\div5^5",
      "5",
      "(5²)³ = 5⁶. Then 5⁶ ÷ 5⁵ = 5^(6−5) = 5¹ = 5."
    ),
    choice(
      "y7-ind-zer-m5",
      "Which of these expressions equals 1?",
      "C",
      ["$3^3\\div3^4$", "$2^0+1$", "$5^3\\div5^3$", "$4^1\\times4^0$"],
      "5³ ÷ 5³ = 5^(3−3) = 5⁰ = 1. Option A gives 3^(−1), option B gives 2, option D gives 4."
    ),
    answer(
      "y7-ind-zer-m6",
      "Evaluate 10⁰ + 2³ − 3².",
      "10^0+2^3-3^2",
      "0",
      "10⁰ = 1, 2³ = 8, 3² = 9. So 1 + 8 − 9 = 0."
    ),
    answer(
      "y7-ind-zer-m7",
      "Simplify 4² × 4³ ÷ 4⁴ and evaluate.",
      "4^2\\times4^3\\div4^4",
      "4",
      "4² × 4³ = 4⁵. Then 4⁵ ÷ 4⁴ = 4¹ = 4."
    ),
    answer(
      "y7-ind-zer-m8",
      "Simplify (2²)⁴ ÷ 2⁶ and evaluate.",
      "(2^2)^4\\div2^6",
      "4",
      "(2²)⁴ = 2⁸. Then 2⁸ ÷ 2⁶ = 2² = 4."
    ),
    answer(
      "y7-ind-zer-m9",
      "Find the value of n if 3ⁿ = 3⁵ × 3² ÷ 3⁴.",
      "3^n = 3^5\\times3^2\\div3^4",
      "3",
      "3⁵ × 3² = 3⁷. Then 3⁷ ÷ 3⁴ = 3³. So n = 3."
    ),
    choice(
      "y7-ind-zer-m10",
      "A student claims that 5⁰ = 0. What is the best explanation of their error?",
      "B",
      [
        "They confused the base with the exponent.",
        "They confused the zero exponent with a zero result; 5⁰ = 1 because 5³ ÷ 5³ = 5⁰ = 1.",
        "They applied the product law incorrectly.",
        "They should have used the power-of-a-power law.",
      ],
      "The zero index law says a⁰ = 1 for any non-zero a. The quotient law shows why: a³ ÷ a³ = 1 and also equals a⁰, so a⁰ must be 1, not 0."
    ),
  ],
};

// ─── Depth-parity additions: mastery pools and multi-part practice ──────────

factorsMultiplesHcfLcm.masteryQuizPool = [
  diff(choice("y7-ind-fac-p1", "Which number is a factor of 24?", "C", ["5", "7", "8", "9"], "8 divides 24 exactly (24 ÷ 8 = 3). None of 5, 7, or 9 divide 24 exactly."), 1),
  diff(answer("y7-ind-fac-p2", "How many factors does 16 have?", "\\text{Factors of }16: 1,2,4,8,16", "5", "The factors of 16 are 1, 2, 4, 8, and 16 — that is 5 factors."), 1),
  diff(answer("y7-ind-fac-p3", "Write the third multiple of 7.", "7\\times3", "21", "The multiples of 7 are 7, 14, 21, … The third is 7 × 3 = 21."), 1),
  diff(choice("y7-ind-fac-p4", "Which list shows the first four multiples of 6?", "B", ["1, 2, 3, 6", "6, 12, 18, 24", "6, 7, 8, 9", "1, 6, 12, 36"], "Multiples of 6 are 6 × 1, 6 × 2, 6 × 3, 6 × 4 = 6, 12, 18, 24."), 1),
  diff(answer("y7-ind-fac-p5", "Find the HCF of 8 and 12.", "\\text{Factors of }8: 1,2,4,8 \\quad \\text{Factors of }12: 1,2,3,4,6,12", "4", "Common factors are 1, 2, and 4. The HCF is 4."), 2),
  diff(answer("y7-ind-fac-p6", "Find the HCF of 10 and 15.", "\\text{Factors of }10: 1,2,5,10 \\quad \\text{Factors of }15: 1,3,5,15", "5", "Common factors are 1 and 5. The HCF is 5."), 2),
  diff(answer("y7-ind-fac-p7", "Find the LCM of 3 and 4.", "\\text{Multiples of }3: 3,6,9,12,\\ldots \\quad \\text{Multiples of }4: 4,8,12,\\ldots", "12", "The first shared multiple of 3 and 4 is 12, so LCM = 12."), 2),
  diff(answer("y7-ind-fac-p8", "Find the LCM of 6 and 9.", "\\text{Multiples of }6: 6,12,18,\\ldots \\quad \\text{Multiples of }9: 9,18,\\ldots", "18", "The first shared multiple of 6 and 9 is 18, so LCM = 18."), 2),
  diff(answer("y7-ind-fac-p9", "Find the HCF of 14 and 21.", "\\text{Factors of }14: 1,2,7,14 \\quad \\text{Factors of }21: 1,3,7,21", "7", "Common factors are 1 and 7. The HCF is 7."), 2),
  diff(choice("y7-ind-fac-p10", "What is the HCF of 9 and 16?", "A", ["1", "3", "8", "9"], "Factors of 9: 1, 3, 9. Factors of 16: 1, 2, 4, 8, 16. The only common factor is 1, so the HCF is 1."), 3),
  diff(answer("y7-ind-fac-p11", "Find the HCF of 24 and 40.", "\\text{Factors of }24: 1,2,3,4,6,8,12,24 \\quad \\text{Factors of }40: 1,2,4,5,8,10,20,40", "8", "Common factors are 1, 2, 4, and 8. The HCF is 8."), 3),
  diff(answer("y7-ind-fac-p12", "Find the LCM of 4 and 6.", "\\text{Multiples of }4: 4,8,12,\\ldots \\quad \\text{Multiples of }6: 6,12,\\ldots", "12", "The first shared multiple is 12, so LCM = 12."), 3),
  diff(answer("y7-ind-fac-p13", "Find the LCM of 10 and 15.", "\\text{Multiples of }10: 10,20,30,\\ldots \\quad \\text{Multiples of }15: 15,30,\\ldots", "30", "The first shared multiple is 30, so LCM = 30."), 3),
  diff(answer("y7-ind-fac-p14", "How many factors does 36 have?", "\\text{Factors of }36: 1,2,3,4,6,9,12,18,36", "9", "The factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, and 36 — that is 9 factors."), 3),
  diff(answer("y7-ind-fac-p15", "Find the HCF of 27 and 36.", "\\text{Factors of }27: 1,3,9,27 \\quad \\text{Factors of }36: 1,2,3,4,6,9,12,18,36", "9", "Common factors are 1, 3, and 9. The HCF is 9."), 3),
  diff(choice("y7-ind-fac-m4-alt", "What is the LCM of 12 and 15?", "C", ["30", "45", "60", "180"], "Multiples of 12: 12, 24, 36, 48, 60, … Multiples of 15: 15, 30, 45, 60, … The first shared one is 60."), 4),
  diff(answer("y7-ind-fac-p16", "Find the LCM of 8 and 10.", "\\text{Multiples of }8: 8,16,24,32,40,\\ldots \\quad \\text{Multiples of }10: 10,20,30,40,\\ldots", "40", "The first shared multiple is 40, so LCM = 40."), 4),
  diff(answer("y7-ind-fac-p17", "Find the HCF of 48 and 60.", "\\text{Factors of }48: \\ldots,12,16,24,48 \\quad \\text{Factors of }60: \\ldots,12,15,20,30,60", "12", "The largest common factor of 48 and 60 is 12."), 4),
  diff(answer("y7-ind-fac-p18", "Two trains leave a station together. Train A returns every 15 minutes and Train B every 20 minutes. After how many minutes do they next leave together?", "\\text{LCM}(15,20)=?", "60", "Multiples of 15: 15, 30, 45, 60, … Multiples of 20: 20, 40, 60, … The LCM is 60, so they next leave together after 60 minutes."), 4),
  diff(answer("y7-ind-fac-p19", "A baker has 36 muffins and 48 cookies. She packs them into identical boxes with no items left over and the same number of each item per box. What is the greatest number of boxes she can make?", "\\text{HCF}(36,48)=?", "12", "The greatest number of equal boxes is the HCF of 36 and 48, which is 12."), 4),
  diff(choice("y7-ind-fac-p20", "The HCF of two numbers is 6 and their LCM is 36. If one number is 12, which is the other?", "C", ["6", "9", "18", "24"], "Using LCM × HCF = a × b: 36 × 6 = 12 × b, so 216 = 12b, giving b = 18."), 5),
  diff(answer("y7-ind-fac-p21", "Skipping ropes are sold in bundles of 8 and skipping mats in bundles of 6. A teacher wants an equal number of ropes and mats with none left over. What is the smallest number of each item she can buy?", "\\text{LCM}(8,6)=?", "24", "The smallest equal count of ropes (in 8s) and mats (in 6s) is the LCM of 8 and 6, which is 24."), 5),
  diff(answer("y7-ind-fac-p22", "The LCM of two numbers is 84 and their HCF is 7. One of the numbers is 21. Find the other number.", "\\text{LCM}\\times\\text{HCF}=a\\times b", "28", "Using LCM × HCF = a × b: 84 × 7 = 21 × b, so 588 = 21b, giving b = 28."), 5),
  diff(answer("y7-ind-fac-p23", "A red light flashes every 12 seconds and a green light every 18 seconds. They flash together at the start. How many times in the first 2 minutes (after the start) do they flash together again?", "\\text{LCM}(12,18)=36", "3", "LCM(12, 18) = 36, so they flash together every 36 seconds. In 120 seconds after the start, that happens at 36, 72, and 108 seconds — 3 times."), 5),
  diff(answer("y7-ind-fac-p24", "Two numbers have HCF 4 and LCM 48. If the two numbers are not 4 and 48, find the smaller of the two numbers.", "4\\times48=a\\times b,\\ a<b", "12", "Product = HCF × LCM = 4 × 48 = 192. The pair must multiply to 192 and have HCF 4. The pair 12 and 16 works: HCF(12, 16) = 4, LCM(12, 16) = 48. The smaller is 12."), 5),
];

zeroIndexAndMixedIndices.masteryQuizPool = [
  diff(choice("y7-ind-zer-p1", "What is the value of 5⁰?", "B", ["5", "1", "0", "50"], "Any non-zero base raised to the power 0 equals 1. So 5⁰ = 1."), 1),
  diff(answer("y7-ind-zer-p2", "Evaluate 12⁰.", "12^0", "1", "Any non-zero base raised to the power 0 equals 1. So 12⁰ = 1."), 1),
  diff(answer("y7-ind-zer-p3", "Evaluate 3¹.", "3^1", "3", "Any number to the power 1 is itself. So 3¹ = 3."), 1),
  diff(choice("y7-ind-zer-p4", "Which expression equals 1?", "C", ["$3^1$", "$2^2$", "$9^0$", "$0^1$"], "9⁰ = 1 (any non-zero base to the power 0). 3¹ = 3, 2² = 4, 0¹ = 0."), 1),
  diff(answer("y7-ind-zer-p5", "Evaluate 4⁰ + 2³.", "4^0+2^3", "9", "4⁰ = 1 and 2³ = 8. So 1 + 8 = 9."), 2),
  diff(answer("y7-ind-zer-p6", "Evaluate 7⁰ + 5⁰.", "7^0+5^0", "2", "7⁰ = 1 and 5⁰ = 1. So 1 + 1 = 2."), 2),
  diff(answer("y7-ind-zer-p7", "Simplify 2⁴ × 2³ ÷ 2⁵ and evaluate.", "2^4\\times2^3\\div2^5", "4", "2⁴ × 2³ = 2⁷. Then 2⁷ ÷ 2⁵ = 2² = 4."), 2),
  diff(answer("y7-ind-zer-p8", "Evaluate 3² × 3⁰.", "3^2\\times3^0", "9", "3⁰ = 1, so 3² × 3⁰ = 9 × 1 = 9."), 2),
  diff(answer("y7-ind-zer-p9", "Simplify 5⁵ ÷ 5³ and evaluate.", "5^5\\div5^3", "25", "5⁵ ÷ 5³ = 5² = 25."), 2),
  diff(choice("y7-ind-zer-p10", "Which expression equals 1?", "B", ["$4^2\\div4^0$", "$6^3\\div6^3$", "$2^0+2^0$", "$3^1\\times3^0$"], "6³ ÷ 6³ = 6⁰ = 1. (A = 16, C = 2, D = 3.)"), 3),
  diff(answer("y7-ind-zer-p11", "Simplify 2⁶ × 2² ÷ 2⁶ and evaluate.", "2^6\\times2^2\\div2^6", "4", "2⁶ × 2² = 2⁸. Then 2⁸ ÷ 2⁶ = 2² = 4."), 3),
  diff(answer("y7-ind-zer-p12", "Evaluate 6⁰ + 3² − 2³.", "6^0+3^2-2^3", "2", "6⁰ = 1, 3² = 9, 2³ = 8. So 1 + 9 − 8 = 2."), 3),
  diff(answer("y7-ind-zer-p13", "Simplify 4³ ÷ 4¹ × 4⁰ and evaluate.", "4^3\\div4^1\\times4^0", "16", "4³ ÷ 4¹ = 4². Then 4² × 4⁰ = 16 × 1 = 16."), 3),
  diff(answer("y7-ind-zer-p14", "Simplify (2²)³ ÷ 2⁶ and evaluate.", "(2^2)^3\\div2^6", "1", "(2²)³ = 2⁶. Then 2⁶ ÷ 2⁶ = 2⁰ = 1."), 3),
  diff(answer("y7-ind-zer-p15", "Evaluate 10⁰ + 10¹.", "10^0+10^1", "11", "10⁰ = 1 and 10¹ = 10. So 1 + 10 = 11."), 3),
  diff(answer("y7-ind-zer-p16", "Simplify (3²)² ÷ 3³ and evaluate.", "(3^2)^2\\div3^3", "3", "(3²)² = 3⁴. Then 3⁴ ÷ 3³ = 3¹ = 3."), 4),
  diff(answer("y7-ind-zer-p17", "Evaluate 2⁵ × 2⁰ ÷ 2³.", "2^5\\times2^0\\div2^3", "4", "2⁵ × 2⁰ = 2⁵. Then 2⁵ ÷ 2³ = 2² = 4."), 4),
  diff(answer("y7-ind-zer-p18", "Find n if 2ⁿ = 2⁶ × 2² ÷ 2⁸.", "2^n=2^6\\times2^2\\div2^8", "0", "2⁶ × 2² = 2⁸. Then 2⁸ ÷ 2⁸ = 2⁰, so n = 0."), 4),
  diff(choice("y7-ind-zer-p19", "A student claims 4⁰ = 0. The best correction is…", "B", ["4⁰ = 4 because the base is 4", "4⁰ = 1 because 4³ ÷ 4³ = 4⁰ = 1", "4⁰ is undefined", "4⁰ = 4 × 0 = 0"], "Any non-zero base to the power 0 equals 1. The quotient law shows why: 4³ ÷ 4³ = 1 and also = 4⁰."), 4),
  diff(answer("y7-ind-zer-p20", "Simplify 5⁴ × 5² ÷ 5⁵ and evaluate.", "5^4\\times5^2\\div5^5", "5", "5⁴ × 5² = 5⁶. Then 5⁶ ÷ 5⁵ = 5¹ = 5."), 4),
  diff(answer("y7-ind-zer-p21", "Evaluate (2³)² ÷ 2⁴ × 2⁰.", "(2^3)^2\\div2^4\\times2^0", "4", "(2³)² = 2⁶. Then 2⁶ ÷ 2⁴ = 2². And 2² × 2⁰ = 4 × 1 = 4."), 5),
  diff(answer("y7-ind-zer-p22", "Find n if 3ⁿ = (3³)² ÷ 3⁴ × 3⁰.", "3^n=(3^3)^2\\div3^4\\times3^0", "2", "(3³)² = 3⁶. Then 3⁶ ÷ 3⁴ = 3². And 3² × 3⁰ = 3², so n = 2."), 5),
  diff(answer("y7-ind-zer-p23", "Evaluate 2⁰ + 2¹ + 2² + 2³.", "2^0+2^1+2^2+2^3", "15", "2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8. The sum is 1 + 2 + 4 + 8 = 15."), 5),
  diff(answer("y7-ind-zer-p24", "Simplify (4² × 4³) ÷ (4⁴ × 4⁰) and evaluate.", "(4^2\\times4^3)\\div(4^4\\times4^0)", "4", "Numerator: 4² × 4³ = 4⁵. Denominator: 4⁴ × 4⁰ = 4⁴. Then 4⁵ ÷ 4⁴ = 4¹ = 4."), 5),
  diff(answer("y7-ind-zer-p25", "Evaluate $\\dfrac{3^4 \\times 3^0}{3^2}$.", "\\frac{3^4\\times3^0}{3^2}", "9", "3⁴ × 3⁰ = 3⁴. Then 3⁴ ÷ 3² = 3² = 9."), 5),
];

zeroIndexAndMixedIndices.multiPartPractice = [
  {
    id: "y7-ind-zer-mp1",
    prompt: "Consider the expression 2⁴ × 2⁰ × 2³ ÷ 2⁵.",
    latex: "2^4 \\times 2^0 \\times 2^3 \\div 2^5",
    answer: "1",
    hint: "Use the zero index law on 2⁰, then combine with the product and quotient laws, and finally evaluate.",
    explanation: "(a) 2⁰ = 1. (b) 2⁴ × 1 × 2³ = 2⁷, then 2⁷ ÷ 2⁵ = 2². (c) 2² = 4.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Evaluate 2⁰.",
        latex: "2^0",
        marks: 1,
        answer: "1",
        explanation: "Any non-zero base raised to the power 0 equals 1, so 2⁰ = 1.",
        hint: "Recall the zero index law.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Simplify the whole expression to a single power of 2. Give your answer as a power, e.g. $2^3$.",
        latex: "2^4 \\times 2^0 \\times 2^3 \\div 2^5",
        marks: 2,
        answer: "2^2",
        acceptedAnswers: ["2^{2}"],
        explanation: "Add the exponents for multiplication: 4 + 0 + 3 = 7, giving 2⁷. Then subtract for division: 2⁷ ÷ 2⁵ = $2^{7-5}$ = 2².",
        hint: "Add exponents when multiplying (remember 2⁰ adds 0), then subtract for the division.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Evaluate your answer to (b) as a whole number.",
        latex: "2^2",
        marks: 1,
        answer: "4",
        explanation: "2² = 2 × 2 = 4.",
        hint: "Square the base 2.",
      },
    ],
  },
];

indexLawsProductQuotientPower.masteryQuizPool = [
  diff(choice("y7-ind-law-p1", "To simplify 2³ × 2⁵, you should…", "A", ["add the exponents", "multiply the exponents", "subtract the exponents", "multiply the bases"], "The product law: when multiplying same-base powers, add the exponents. 2³ × 2⁵ = 2⁸."), 1),
  diff(choice("y7-ind-law-p2", "To simplify 3⁷ ÷ 3², you should…", "C", ["add the exponents", "multiply the exponents", "subtract the exponents", "divide the bases"], "The quotient law: when dividing same-base powers, subtract the exponents. 3⁷ ÷ 3² = 3⁵."), 1),
  diff(choice("y7-ind-law-p3", "Simplify 4² × 4³. Which is correct?", "B", ["$4^6$", "$4^5$", "$16^5$", "$8^5$"], "Add the exponents and keep the base: 4² × 4³ = 4⁵."), 1),
  diff(choice("y7-ind-law-p4", "Simplify (2⁴)². Which is correct?", "D", ["$2^6$", "$2^2$", "$4^8$", "$2^8$"], "Power-of-a-power: multiply the exponents. (2⁴)² = $2^{4\\times2}$ = 2⁸."), 1),
  diff(answer("y7-ind-law-p5", "Simplify 3² × 3² and evaluate.", "3^2\\times3^2", "81", "3² × 3² = 3⁴ = 81."), 2),
  diff(answer("y7-ind-law-p6", "Simplify 2⁵ ÷ 2² and evaluate.", "2^5\\div2^2", "8", "2⁵ ÷ 2² = 2³ = 8."), 2),
  diff(answer("y7-ind-law-p7", "Simplify (3²)² and evaluate.", "(3^2)^2", "81", "(3²)² = 3⁴ = 81."), 2),
  diff(answer("y7-ind-law-p8", "Simplify 5² × 5¹ and evaluate.", "5^2\\times5^1", "125", "5² × 5¹ = 5³ = 125."), 2),
  diff(answer("y7-ind-law-p9", "Simplify 7⁴ ÷ 7³ and evaluate.", "7^4\\div7^3", "7", "7⁴ ÷ 7³ = 7¹ = 7."), 2),
  diff(choice("y7-ind-law-p10", "Which expression equals 2¹²?", "C", ["$2^4\\times2^3$", "$(2^4)^2$", "$(2^3)^4$", "$2^6\\times2^4$"], "(2³)⁴ = 2^(3×4) = 2¹². (Option A = 2⁷, B = 2⁸, D = 2¹⁰.)"), 3),
  diff(answer("y7-ind-law-p11", "Simplify 4³ × 4² and evaluate.", "4^3\\times4^2", "1024", "4³ × 4² = 4⁵ = 1024."), 3),
  diff(answer("y7-ind-law-p12", "Simplify 6⁴ ÷ 6² and evaluate.", "6^4\\div6^2", "36", "6⁴ ÷ 6² = 6² = 36."), 3),
  diff(answer("y7-ind-law-p13", "Simplify (5²)² and evaluate.", "(5^2)^2", "625", "(5²)² = 5⁴ = 625."), 3),
  diff(answer("y7-ind-law-p14", "Find n if 2ⁿ = 2⁴ × 2³.", "2^n=2^4\\times2^3", "7", "2⁴ × 2³ = 2⁷, so n = 7."), 3),
  diff(answer("y7-ind-law-p15", "Simplify 3⁶ ÷ 3⁴ and evaluate.", "3^6\\div3^4", "9", "3⁶ ÷ 3⁴ = 3² = 9."), 3),
  diff(answer("y7-ind-law-p16", "Evaluate (2³)² ÷ 2⁴.", "(2^3)^2\\div2^4", "4", "(2³)² = 2⁶. Then 2⁶ ÷ 2⁴ = 2² = 4."), 4),
  diff(answer("y7-ind-law-p17", "Simplify 2³ × 2² × 2⁴ and evaluate.", "2^3\\times2^2\\times2^4", "512", "Add the exponents: 3 + 2 + 4 = 9. So 2⁹ = 512."), 4),
  diff(answer("y7-ind-law-p18", "Find n if 5ⁿ = 5⁸ ÷ 5³.", "5^n=5^8\\div5^3", "5", "5⁸ ÷ 5³ = 5⁵, so n = 5."), 4),
  diff(choice("y7-ind-law-p19", "A student writes 2³ × 2⁴ = 4⁷. What is their error?", "A", ["they multiplied the bases as well as adding exponents", "they added the bases", "they multiplied the exponents", "they subtracted the exponents"], "The base must stay the same. 2³ × 2⁴ = 2⁷, not 4⁷."), 4),
  diff(answer("y7-ind-law-p20", "Simplify (3²)³ ÷ 3⁴ and evaluate.", "(3^2)^3\\div3^4", "9", "(3²)³ = 3⁶. Then 3⁶ ÷ 3⁴ = 3² = 9."), 4),
  diff(answer("y7-ind-law-p21", "Evaluate (2²)³ × 2² ÷ 2⁵.", "(2^2)^3\\times2^2\\div2^5", "8", "(2²)³ = 2⁶. Then 2⁶ × 2² = 2⁸, and 2⁸ ÷ 2⁵ = 2³ = 8."), 5),
  diff(answer("y7-ind-law-p22", "Find n if (2ⁿ)² = 2¹⁰.", "(2^n)^2=2^{10}", "5", "(2ⁿ)² = 2^(2n), so 2n = 10, giving n = 5."), 5),
  diff(answer("y7-ind-law-p23", "Evaluate (3³ × 3²) ÷ (3² × 3).", "(3^3\\times3^2)\\div(3^2\\times3)", "9", "Numerator: 3³ × 3² = 3⁵. Denominator: 3² × 3¹ = 3³. Then 3⁵ ÷ 3³ = 3² = 9."), 5),
  diff(answer("y7-ind-law-p24", "Find the value of n if 4ⁿ = 2¹⁰. (Hint: write 4 as a power of 2.)", "4^n=2^{10}", "5", "4 = 2², so 4ⁿ = (2²)ⁿ = 2^(2n). Setting 2n = 10 gives n = 5."), 5),
  diff(answer("y7-ind-law-p25", "A bacterium doubles every hour. After 4 hours there are 2⁴ bacteria; after another 3 hours the count is multiplied by 2³ more. Write the total count after 7 hours as a single power of 2, then evaluate it.", "2^4\\times2^3", "128", "2⁴ × 2³ = 2⁷ = 128 bacteria."), 5),
];

indexLawsProductQuotientPower.multiPartPractice = [
  {
    id: "y7-ind-law-mp1",
    prompt: "Consider the expression (2³)² × 2⁴ ÷ 2⁵.",
    latex: "(2^3)^2 \\times 2^4 \\div 2^5",
    answer: "32",
    hint: "Apply the power-of-a-power law first, then the product law, then the quotient law, and finally evaluate.",
    explanation: "(a) (2³)² = 2⁶. (b) 2⁶ × 2⁴ = 2¹⁰, then 2¹⁰ ÷ 2⁵ = 2⁵. (c) 2⁵ = 32.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Simplify (2³)² to a single power of 2. Give your answer as a power, e.g. $2^6$.",
        latex: "(2^3)^2",
        marks: 1,
        answer: "2^6",
        acceptedAnswers: ["2^{6}"],
        explanation: "Power-of-a-power: multiply the exponents. (2³)² = $2^{3\\times2}$ = 2⁶.",
        hint: "Multiply the exponents.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Using your answer to (a), simplify the whole expression to a single power of 2. Give your answer as a power, e.g. $2^5$.",
        latex: "2^6 \\times 2^4 \\div 2^5",
        marks: 2,
        answer: "2^5",
        acceptedAnswers: ["2^{5}"],
        explanation: "2⁶ × 2⁴ = $2^{6+4}$ = 2¹⁰ (product law). Then 2¹⁰ ÷ 2⁵ = $2^{10-5}$ = 2⁵ (quotient law).",
        hint: "Add the exponents when multiplying, then subtract when dividing.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Evaluate your answer to (b) as a whole number.",
        latex: "2^5",
        marks: 2,
        answer: "32",
        explanation: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
        hint: "Multiply five copies of 2 together.",
      },
    ],
  },
];

squaresCubesIndexNotation.masteryQuizPool = [
  diff(choice("y7-ind-idx-p1", "What does 2³ mean?", "C", ["$2\\times3$", "$3\\times3$", "$2\\times2\\times2$", "$2+2+2$"], "2³ means the base 2 multiplied by itself 3 times: 2 × 2 × 2."), 1),
  diff(answer("y7-ind-idx-p2", "Evaluate 5².", "5^2 = 5\\times5", "25", "5² = 5 × 5 = 25."), 1),
  diff(answer("y7-ind-idx-p3", "Evaluate 3².", "3^2 = 3\\times3", "9", "3² = 3 × 3 = 9."), 1),
  diff(answer("y7-ind-idx-p4", "In the expression 4⁵, what is the base?", "4^5", "4", "In 4⁵ the base is 4 (the number being multiplied) and the exponent is 5."), 1),
  diff(answer("y7-ind-idx-p5", "Evaluate 2⁴.", "2^4 = 2\\times2\\times2\\times2", "16", "2⁴ = 2 × 2 × 2 × 2 = 16."), 2),
  diff(answer("y7-ind-idx-p6", "Find $\\sqrt{49}$.", "\\sqrt{49}=?", "7", "7 × 7 = 49, so √49 = 7."), 2),
  diff(answer("y7-ind-idx-p7", "Find $\\sqrt{100}$.", "\\sqrt{100}=?", "10", "10 × 10 = 100, so √100 = 10."), 2),
  diff(answer("y7-ind-idx-p8", "Evaluate 2³.", "2^3 = 2\\times2\\times2", "8", "2³ = 2 × 2 × 2 = 8."), 2),
  diff(answer("y7-ind-idx-p9", "Find $\\sqrt[3]{27}$.", "\\sqrt[3]{27}=?\\implies n^3=27", "3", "3³ = 3 × 3 × 3 = 27, so ∛27 = 3."), 2),
  diff(answer("y7-ind-idx-p10", "Evaluate 6².", "6^2 = 6\\times6", "36", "6² = 6 × 6 = 36."), 3),
  diff(answer("y7-ind-idx-p11", "Find $\\sqrt{121}$.", "\\sqrt{121}=?", "11", "11 × 11 = 121, so √121 = 11."), 3),
  diff(answer("y7-ind-idx-p12", "Evaluate 3³.", "3^3 = 3\\times3\\times3", "27", "3³ = 3 × 3 × 3 = 27."), 3),
  diff(answer("y7-ind-idx-p13", "Find $\\sqrt[3]{8}$.", "\\sqrt[3]{8}=?\\implies n^3=8", "2", "2³ = 2 × 2 × 2 = 8, so ∛8 = 2."), 3),
  diff(answer("y7-ind-idx-p14", "Evaluate 2⁷.", "2^7 = 2\\times2\\times2\\times2\\times2\\times2\\times2", "128", "2⁷ = 128 (doubling: 2, 4, 8, 16, 32, 64, 128)."), 3),
  diff(choice("y7-ind-idx-p15", "Which is the square of 12?", "B", ["24", "144", "121", "169"], "12² = 12 × 12 = 144. (24 is 12 × 2, 121 = 11², 169 = 13².)"), 3),
  diff(answer("y7-ind-idx-p16", "Find $\\sqrt{256}$.", "\\sqrt{256}=?", "16", "16 × 16 = 256, so √256 = 16."), 4),
  diff(answer("y7-ind-idx-p17", "Evaluate 4⁴.", "4^4 = 4\\times4\\times4\\times4", "256", "4⁴ = 16 × 16 = 256."), 4),
  diff(answer("y7-ind-idx-p18", "Write 27 in index notation using base 3.", "3^{\\,?}=27", "3^3", "27 = 3 × 3 × 3 = 3³.", ["3^{3}"]), 4),
  diff(answer("y7-ind-idx-p19", "Evaluate 5² + 3³.", "5^2+3^3", "52", "5² = 25 and 3³ = 27. So 25 + 27 = 52."), 4),
  diff(choice("y7-ind-idx-p20", "Which is larger: 3⁴ or 4³?", "A", ["$3^4=81$, larger", "$4^3=81$, larger", "they are equal", "$4^3=64$, larger"], "3⁴ = 81 and 4³ = 64. Since 81 > 64, 3⁴ is larger."), 4),
  diff(answer("y7-ind-idx-p21", "Evaluate 2⁴ × 3² without a calculator.", "2^4\\times3^2", "144", "2⁴ = 16 and 3² = 9. 16 × 9 = 144."), 5),
  diff(answer("y7-ind-idx-p22", "A square garden has an area of 196 m². What is the length of one side, in metres?", "\\text{side}=\\sqrt{196}", "14", "The side length is √196 = 14 m, because 14 × 14 = 196."), 5),
  diff(answer("y7-ind-idx-p23", "A cube has a volume of 125 cm³. What is the length of one edge, in centimetres?", "\\text{edge}=\\sqrt[3]{125}", "5", "The edge length is ∛125 = 5 cm, because 5 × 5 × 5 = 125."), 5),
  diff(answer("y7-ind-idx-p24", "Evaluate $\\sqrt{169} + \\sqrt[3]{64}$.", "\\sqrt{169}+\\sqrt[3]{64}", "17", "√169 = 13 (since 13² = 169) and ∛64 = 4 (since 4³ = 64). So 13 + 4 = 17."), 5),
  diff(answer("y7-ind-idx-p25", "A number squared is 81. The same number cubed gives what value?", "n^2=81 \\implies n^3=?", "729", "If n² = 81 then n = 9. So n³ = 9³ = 9 × 9 × 9 = 729."), 5),
];

squaresCubesIndexNotation.multiPartPractice = [
  {
    id: "y7-ind-idx-mp1",
    prompt: "A storage cube has edges of length 6 cm.",
    latex: "\\text{edge} = 6\\text{ cm}",
    answer: "36",
    hint: "Use squaring for the face area and cubing for the volume, then reverse with a root.",
    explanation: "(a) Area of one face = 6² = 36 cm². (b) Volume = 6³ = 216 cm³. (c) A different cube with volume 343 cm³ has edge ∛343 = 7 cm.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the area of one square face of the cube, in cm².",
        latex: "6^2",
        marks: 1,
        answer: "36",
        explanation: "The area of a square face is side² = 6² = 36 cm².",
        hint: "Square the edge length.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the volume of the cube, in cm³.",
        latex: "6^3",
        marks: 2,
        answer: "216",
        explanation: "The volume of a cube is edge³ = 6³ = 6 × 6 × 6 = 216 cm³.",
        hint: "Cube the edge length: multiply 6 by itself three times.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "A second cube has a volume of 343 cm³. Find the length of one edge, in cm.",
        latex: "\\sqrt[3]{343}",
        marks: 2,
        answer: "7",
        explanation: "The edge is the cube root of the volume: ∛343 = 7, because 7 × 7 × 7 = 343.",
        hint: "Find the number that, cubed, gives 343.",
      },
    ],
  },
];

primesAndPrimeFactorisation.masteryQuizPool = [
  diff(choice("y7-ind-pri-p1", "Which number is prime?", "B", ["9", "13", "21", "25"], "13 has exactly two factors, 1 and 13, so it is prime. 9 = 3 × 3, 21 = 3 × 7, 25 = 5 × 5 are composite."), 1),
  diff(choice("y7-ind-pri-p2", "Which number is composite?", "D", ["2", "5", "7", "9"], "9 = 3 × 3, so it has more than two factors and is composite. 2, 5, and 7 are all prime."), 1),
  diff(answer("y7-ind-pri-p3", "Is 19 prime or composite? Write 'prime' or 'composite'.", "19", "prime", "19 has no factors other than 1 and 19, so it is prime."), 1),
  diff(answer("y7-ind-pri-p4", "What is the smallest prime number?", "\\text{smallest prime}=?", "2", "2 is the smallest prime — its only factors are 1 and 2. It is also the only even prime."), 1),
  diff(choice("y7-ind-pri-p5", "Write 12 as a product of prime factors in index form.", "A", ["$2^2\\times3$", "$2\\times3^2$", "$2^3$", "$4\\times3$"], "12 = 4 × 3 = 2 × 2 × 3 = 2² × 3. Option D is not fully a product of primes."), 2),
  diff(answer("y7-ind-pri-p6", "Write 18 as a product of prime factors in index form.", "18 = 2\\times9 = 2\\times3\\times3", "2*3^2", "18 = 2 × 3 × 3 = 2 × 3².", ["2 x 3^2", "2 × 3^2", "2*3*3"]), 2),
  diff(answer("y7-ind-pri-p7", "How many primes are there between 1 and 10?", "\\text{Check: }2,3,5,7", "4", "The primes between 1 and 10 are 2, 3, 5, and 7 — that is 4 primes."), 2),
  diff(answer("y7-ind-pri-p8", "Write 24 as a product of prime factors in index form.", "24 = 8\\times3 = 2^3\\times3", "2^3*3", "24 = 8 × 3 = 2 × 2 × 2 × 3 = 2³ × 3.", ["2^3 x 3", "2^3 × 3"]), 2),
  diff(answer("y7-ind-pri-p9", "Write 50 as a product of prime factors in index form.", "50 = 2\\times25 = 2\\times5\\times5", "2*5^2", "50 = 2 × 5 × 5 = 2 × 5².", ["2 x 5^2", "2 × 5^2"]), 2),
  diff(choice("y7-ind-pri-p10", "What is the prime factorisation of 40?", "B", ["$2^2\\times5$", "$2^3\\times5$", "$2\\times5^2$", "$4\\times10$"], "40 = 8 × 5 = 2 × 2 × 2 × 5 = 2³ × 5."), 3),
  diff(answer("y7-ind-pri-p11", "Write 75 as a product of prime factors in index form.", "75 = 3\\times25 = 3\\times5\\times5", "3*5^2", "75 = 3 × 5 × 5 = 3 × 5².", ["3 x 5^2", "3 × 5^2"]), 3),
  diff(answer("y7-ind-pri-p12", "Write 96 as a product of prime factors in index form.", "96 = 2\\times48 = 2^5\\times3", "2^5*3", "96 = 2 × 2 × 2 × 2 × 2 × 3 = 2⁵ × 3.", ["2^5 x 3", "2^5 × 3"]), 3),
  diff(answer("y7-ind-pri-p13", "A number has prime factorisation 2³ × 3². What is the number?", "2^3\\times3^2", "72", "2³ × 3² = 8 × 9 = 72."), 3),
  diff(answer("y7-ind-pri-p14", "Find the largest prime number less than 30.", "\\text{Primes near 30: }23,29", "29", "The primes below 30 include 23 and 29. The largest is 29."), 3),
  diff(answer("y7-ind-pri-p15", "How many prime factors (counting multiplicity) does 24 have?", "24 = 2^3\\times3", "4", "24 = 2³ × 3 = 2 × 2 × 2 × 3. Counting with multiplicity gives 3 + 1 = 4 prime factors."), 3),
  diff(answer("y7-ind-pri-p16", "Write 108 as a product of prime factors in index form.", "108 = 4\\times27 = 2^2\\times3^3", "2^2*3^3", "108 = 4 × 27 = 2 × 2 × 3 × 3 × 3 = 2² × 3³.", ["2^2 x 3^3", "2^2 × 3^3"]), 4),
  diff(answer("y7-ind-pri-p17", "Write 144 as a product of prime factors in index form.", "144 = 16\\times9 = 2^4\\times3^2", "2^4*3^2", "144 = 16 × 9 = 2⁴ × 3².", ["2^4 x 3^2", "2^4 × 3^2"]), 4),
  diff(answer("y7-ind-pri-p18", "Use prime factorisation to find the HCF of 48 and 72. (48 = 2⁴ × 3, 72 = 2³ × 3²)", "48=2^4\\times3 \\quad 72=2^3\\times3^2", "24", "Shared primes at the lowest power: 2³ × 3¹ = 8 × 3 = 24."), 4),
  diff(answer("y7-ind-pri-p19", "Write 2⁴ × 3 × 5 as a single number.", "2^4\\times3\\times5", "240", "2⁴ × 3 × 5 = 16 × 3 × 5 = 48 × 5 = 240."), 4),
  diff(choice("y7-ind-pri-p20", "Which number is NOT prime?", "C", ["31", "37", "39", "41"], "39 = 3 × 13, so it is composite. The others (31, 37, 41) are all prime."), 4),
  diff(answer("y7-ind-pri-p21", "Use prime factorisation to find the LCM of 12 and 18. (12 = 2² × 3, 18 = 2 × 3²)", "12=2^2\\times3 \\quad 18=2\\times3^2", "36", "The LCM takes the highest power of each prime: 2² × 3² = 4 × 9 = 36."), 5),
  diff(answer("y7-ind-pri-p22", "A number has prime factorisation 2² × 3 × 7. A second number is 2 × 3² × 7. Find the HCF of the two numbers.", "2^2\\times3\\times7 \\;\\text{and}\\; 2\\times3^2\\times7", "42", "HCF uses the lowest power of each shared prime: 2¹ × 3¹ × 7¹ = 2 × 3 × 7 = 42."), 5),
  diff(answer("y7-ind-pri-p23", "The prime factorisation of a number is 2³ × 3 × 5². How many factors does this number have? (Add 1 to each index and multiply.)", "(3+1)(1+1)(2+1)", "24", "Add 1 to each index and multiply: (3 + 1)(1 + 1)(2 + 1) = 4 × 2 × 3 = 24 factors."), 5),
  diff(answer("y7-ind-pri-p24", "Two numbers are 2² × 3² × 5 and 2 × 3³. Find their LCM as a single number.", "2^2\\times3^2\\times5 \\;\\text{and}\\; 2\\times3^3", "540", "LCM takes the highest power of each prime: 2² × 3³ × 5 = 4 × 27 × 5 = 540."), 5),
];

primesAndPrimeFactorisation.multiPartPractice = [
  {
    id: "y7-ind-pri-mp1",
    prompt: "A number is given by the product 2⁴ × 3² × 5.",
    latex: "2^4 \\times 3^2 \\times 5",
    answer: "720",
    hint: "Evaluate the product first, then use the prime factorisation to find the HCF with another number.",
    explanation: "(a) 2⁴ × 3² × 5 = 16 × 9 × 5 = 720. (b) Counting with multiplicity: 4 + 2 + 1 = 7 prime factors. (c) HCF with 2² × 3 × 7 uses lowest shared powers: 2² × 3 = 12.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Evaluate 2⁴ × 3² × 5 as a single whole number.",
        latex: "2^4\\times3^2\\times5",
        marks: 2,
        answer: "720",
        explanation: "2⁴ = 16, 3² = 9. So 16 × 9 × 5 = 144 × 5 = 720.",
        hint: "Work out each power first, then multiply the results together.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "How many prime factors does this number have, counting each prime as many times as it appears?",
        marks: 1,
        answer: "7",
        explanation: "2⁴ × 3² × 5 = 2 × 2 × 2 × 2 × 3 × 3 × 5. Counting with multiplicity: 4 + 2 + 1 = 7.",
        hint: "Add up the indices.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "A second number has prime factorisation 2² × 3 × 7. Find the HCF of the two numbers.",
        latex: "2^2\\times3\\times7",
        marks: 2,
        answer: "12",
        explanation: "Compare shared primes at their lowest power: 2² (from 2⁴ vs 2²) and 3¹ (from 3² vs 3¹). The prime 7 and the 5 are not shared. HCF = 2² × 3 = 12.",
        hint: "Take each shared prime to the lower of the two powers, then multiply.",
      },
    ],
  },
];

factorsMultiplesHcfLcm.multiPartPractice = [
  {
    id: "y7-ind-fac-mp1",
    prompt: "Two numbers are 18 and 24.",
    latex: "18 \\text{ and } 24",
    answer: "6",
    hint: "Find the HCF, then the LCM, then check the rule HCF × LCM = product.",
    explanation: "(a) HCF(18, 24) = 6. (b) LCM(18, 24) = 72. (c) HCF × LCM = 6 × 72 = 432, which equals 18 × 24 = 432.",
    parts: [
      {
        key: "a",
        label: "(a)",
        prompt: "Find the highest common factor (HCF) of 18 and 24.",
        marks: 1,
        answer: "6",
        explanation: "Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The largest common factor is 6.",
        hint: "List the factors of each number and pick the largest shared one.",
      },
      {
        key: "b",
        label: "(b)",
        prompt: "Find the lowest common multiple (LCM) of 18 and 24.",
        marks: 2,
        answer: "72",
        explanation: "Multiples of 18: 18, 36, 54, 72, … Multiples of 24: 24, 48, 72, … The first shared multiple is 72.",
        hint: "List multiples of each until one appears in both lists.",
      },
      {
        key: "c",
        label: "(c)",
        prompt: "Find the product of your HCF and LCM answers (HCF × LCM).",
        latex: "\\text{HCF}\\times\\text{LCM}",
        marks: 2,
        answer: "432",
        explanation: "6 × 72 = 432. This matches 18 × 24 = 432, confirming the rule HCF × LCM = product of the two numbers.",
        hint: "Multiply your answers from parts (a) and (b).",
      },
    ],
  },
];

// ─── Lesson registry ─────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "factors-multiples-hcf-lcm": factorsMultiplesHcfLcm,
  "primes-and-prime-factorisation": primesAndPrimeFactorisation,
  "squares-cubes-index-notation": squaresCubesIndexNotation,
  "index-laws-product-quotient-power": indexLawsProductQuotientPower,
  "zero-index-and-mixed-indices": zeroIndexAndMixedIndices,
};

export function year7IndicesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "indices") {
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
