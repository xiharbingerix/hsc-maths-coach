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
>;

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
      "A factor of a number divides into it exactly, leaving no remainder. The factors of 12 are 1, 2, 3, 4, 6, and 12, because each of those divides 12 exactly. Notice that 1 and the number itself are always factors.",
      "A multiple of a number is what you get when you multiply it by 1, 2, 3, 4, and so on. The multiples of 4 are 4, 8, 12, 16, 20, … Multiples go on forever; factors do not.",
      "The highest common factor (HCF) of two numbers is the largest factor they share. To find it, list all factors of each number and pick the biggest one that appears in both lists. For 12 and 18, the factors of 12 are 1, 2, 3, 4, 6, 12 and the factors of 18 are 1, 2, 3, 6, 9, 18. The HCF is 6.",
      "The lowest common multiple (LCM) is the smallest multiple that two numbers share. List multiples of each until you find one that appears in both lists. For 4 and 6: multiples of 4 are 4, 8, 12, 16, … and multiples of 6 are 6, 12, 18, … The LCM is 12. The LCM is useful when adding fractions or finding when two repeating events coincide.",
    ],
    latexBlocks: [
      "\\text{Factors of }12: \\{1,\\,2,\\,3,\\,4,\\,6,\\,12\\}",
      "\\text{Factors of }18: \\{1,\\,2,\\,3,\\,6,\\,9,\\,18\\} \\implies \\text{HCF}(12,18)=6",
      "\\text{Multiples of }4: 4,8,12,16,\\ldots \\quad \\text{Multiples of }6: 6,12,18,\\ldots \\implies \\text{LCM}(4,6)=12",
    ],
  },
  workedExamples: [
    {
      title: "Find HCF of two numbers",
      questionLatex: "\\text{Find the HCF of 24 and 36.}",
      steps: [
        { explanation: "List all factors of 24 by finding every number that divides it exactly.", latex: "\\text{Factors of }24: 1,2,3,4,6,8,12,24" },
        { explanation: "List all factors of 36.", latex: "\\text{Factors of }36: 1,2,3,4,6,9,12,18,36" },
        { explanation: "Identify the common factors — those that appear in both lists.", latex: "\\text{Common factors: }1,2,3,4,6,12" },
        { explanation: "The highest common factor is the largest of these.", latex: "\\text{HCF}(24,36)=12" },
      ],
      finalAnswerLatex: "\\text{HCF}=12",
    },
    {
      title: "Find LCM of two numbers",
      questionLatex: "\\text{Find the LCM of 6 and 8.}",
      steps: [
        { explanation: "List multiples of 6 until you find one shared with 8.", latex: "\\text{Multiples of }6: 6,12,18,24,30,\\ldots" },
        { explanation: "List multiples of 8.", latex: "\\text{Multiples of }8: 8,16,24,32,\\ldots" },
        { explanation: "The first multiple that appears in both lists is the LCM.", latex: "\\text{LCM}(6,8)=24" },
      ],
      finalAnswerLatex: "\\text{LCM}=24",
    },
    {
      title: "Apply LCM to a practical problem",
      questionLatex: "\\text{Bus A departs every 8 minutes. Bus B departs every 12 minutes. Both depart at 9:00 am. When do they next depart together?}",
      steps: [
        { explanation: "Find the LCM of 8 and 12 — that is how many minutes until they coincide.", latex: "\\text{Multiples of }8: 8,16,24,\\ldots \\quad \\text{Multiples of }12: 12,24,\\ldots" },
        { explanation: "The LCM is 24, so the buses depart together again 24 minutes later.", latex: "\\text{LCM}(8,12)=24\\text{ minutes}" },
        { explanation: "Add 24 minutes to 9:00 am.", latex: "9{:}00\\text{ am}+24\\text{ min}=9{:}24\\text{ am}" },
      ],
      finalAnswerLatex: "9{:}24\\text{ am}",
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
      "A prime number has exactly two factors: 1 and itself. For example, 7 is prime because only 1 × 7 gives 7. The number 1 is not prime — it has only one factor. The smallest prime is 2, the only even prime.",
      "A composite number has more than two factors, meaning it can be broken into smaller whole-number pieces. For example, 12 is composite because 12 = 3 × 4, and 4 can be broken further into 2 × 2.",
      "A factor tree lets you break a composite number down step by step until every branch ends in a prime. Start by writing any factor pair, then keep splitting each composite factor. The primes at the ends of all branches are the prime factors.",
      "Once you have all the prime factors, collect any repeated ones using index notation. For 36: the tree gives 2 × 2 × 3 × 3, which is written as 2² × 3². This is the prime factorisation — a compact, unique way to describe any composite number.",
    ],
    latexBlocks: [
      "36 = 2\\times18 = 2\\times2\\times9 = 2\\times2\\times3\\times3 = 2^2\\times3^2",
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
      "Index notation is a shorthand for repeated multiplication. Instead of writing 3 × 3 × 3 × 3, we write 3⁴ — it means the number 3 is multiplied by itself 4 times. The number 3 is called the base and the 4 is called the exponent (or index or power).",
      "Squaring a number means multiplying it by itself once: 5² = 5 × 5 = 25. The square numbers form a recognisable pattern — 1, 4, 9, 16, 25, … The square root undoes squaring: √25 = 5 because 5² = 25.",
      "Cubing a number means multiplying it by itself three times: 2³ = 2 × 2 × 2 = 8. The first five perfect cubes are 1, 8, 27, 64, 125. The cube root undoes cubing: ∛27 = 3 because 3³ = 27.",
      "Any base can be raised to any exponent. To evaluate 2⁵, multiply five copies of 2 together: 2 × 2 × 2 × 2 × 2 = 32. Count carefully — the exponent tells you how many copies of the base to multiply.",
    ],
    latexBlocks: [
      "a^n = \\underbrace{a\\times a\\times\\cdots\\times a}_{n\\text{ copies}}",
      "\\sqrt{25}=5\\text{ because }5^2=25 \\qquad \\sqrt[3]{27}=3\\text{ because }3^3=27",
      "2^4 = 2\\times2\\times2\\times2 = 16 \\qquad 3^3 = 27 \\qquad 5^2 = 25",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a power using repeated multiplication",
      questionLatex: "\\text{Evaluate }2^5.",
      steps: [
        { explanation: "The base is 2 and the exponent is 5, so multiply 2 by itself 5 times.", latex: "2^5 = 2\\times2\\times2\\times2\\times2" },
        { explanation: "Multiply step by step to avoid errors.", latex: "2\\times2=4,\\quad 4\\times2=8,\\quad 8\\times2=16,\\quad 16\\times2=32" },
      ],
      finalAnswerLatex: "2^5 = 32",
    },
    {
      title: "Find a square root",
      questionLatex: "\\text{Find }\\sqrt{144}.",
      steps: [
        { explanation: "Ask: what number times itself equals 144?", latex: "\\sqrt{144}=?\\implies n^2=144" },
        { explanation: "Recall that 12 × 12 = 144.", latex: "12^2=144" },
      ],
      finalAnswerLatex: "\\sqrt{144}=12",
    },
    {
      title: "Evaluate a cube and find a cube root",
      questionLatex: "\\text{Evaluate }4^3 \\text{ and find }\\sqrt[3]{125}.",
      steps: [
        { explanation: "For 4³: multiply 4 by itself three times.", latex: "4^3=4\\times4\\times4=64" },
        { explanation: "For ∛125: ask what number cubed gives 125.", latex: "5^3=5\\times5\\times5=125\\implies\\sqrt[3]{125}=5" },
      ],
      finalAnswerLatex: "4^3=64 \\quad \\sqrt[3]{125}=5",
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
      "When you multiply two powers that have the same base, you can add the exponents. For example, 2³ × 2⁴ means (2 × 2 × 2) × (2 × 2 × 2 × 2) — seven 2s multiplied together — which is 2⁷. Adding exponents is just a shortcut for counting how many copies of the base you have.",
      "When you divide two powers with the same base, subtract the exponents. For example, 3⁵ ÷ 3² means (3 × 3 × 3 × 3 × 3) ÷ (3 × 3). Two of the 3s cancel from top and bottom, leaving 3³. So 3⁵ ÷ 3² = 3³ = 27.",
      "When a power is itself raised to another power — for example (2³)⁴ — you multiply the exponents. This is because (2³)⁴ means four copies of 2³ multiplied together: 2³ × 2³ × 2³ × 2³ = 2¹². In Year 7, we apply these laws to numerical bases only.",
      "After applying an index law, always evaluate the result unless the question asks for the index form only. For example, if you simplify 2³ × 2⁴ to get 2⁷, evaluate: 2⁷ = 128.",
    ],
    latexBlocks: [
      "a^m\\times a^n = a^{m+n} \\quad \\text{(product law: add exponents)}",
      "a^m\\div a^n = a^{m-n} \\quad \\text{(quotient law: subtract exponents)}",
      "(a^m)^n = a^{mn} \\quad \\text{(power law: multiply exponents)}",
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
      "Any non-zero number raised to the power of zero equals 1. This is not a definition chosen arbitrarily — it follows directly from the quotient law. For example, $5^3 ÷ 5^3 = 1$ (any non-zero number divided by itself is 1), and by the quotient law $5^3 ÷ 5^3 = 5^{3−3} = 5^0$. So $5^0$ must equal 1.",
      "When an expression contains more than one operation, apply the index laws one step at a time. Work from left to right for operations at the same level — the same way you would with normal multiplication and division.",
      "To simplify 2³ × 2⁴ ÷ 2⁵: first apply the product law to 2³ × 2⁴ to get 2⁷, then apply the quotient law to 2⁷ ÷ 2⁵ to get 2². This keeps the working clear and reduces the chance of errors.",
      "When the question asks for an answer in index form, leave the result as a power. When it asks you to evaluate, calculate the numerical value. Check what the question is asking before you stop.",
    ],
    latexBlocks: [
      "a^0 = 1 \\quad (\\text{for any }a\\neq0)",
      "\\frac{a^m}{a^m} = a^{m-m} = a^0 = 1 \\quad \\text{(why the zero law works)}",
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
