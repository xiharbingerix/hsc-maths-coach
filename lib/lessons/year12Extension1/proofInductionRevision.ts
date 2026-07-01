import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  opts: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}",
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: opts.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer: ans,
    ...(hint ? { hint } : {}),
    explanation,
  };
}

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers?: string[],
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: ans,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    ...(hint ? { hint } : {}),
    explanation,
  };
}

const base = { masteryPassMark: 0.8 };

const proofInductionRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate the prior knowledge needed for mathematical induction: evaluating sigma notation sums with standard formulas, computing combinations C(n,r), and factoring exponential expressions of the form A^(k+1) ± A^k.",
  learningIntention:
    "Evaluate sigma notation sums using ∑k and ∑k² formulas, compute C(n,r) using the factorial definition, apply Pascal's identity, and factor expressions that arise in algebraic inductive steps.",
  successCriteria: [
    "Evaluate $\\sum_{k=1}^{n} k$ and $\\sum_{k=1}^{n} k^2$ using the standard closed-form formulas.",
    "Compute C(n,r) using n! / (r!(n−r)!).",
    "State and apply Pascal's identity: C(n,r) + C(n,r+1) = C(n+1,r+1).",
    "Factor A^(k+1) ± A^k to expose a multiple of A^k.",
    "Simplify factorial expressions such as (k+1)! ÷ k!.",
  ],
  teaching: {
    paragraphs: [
      "Proof by induction draws on three skills you have already built: evaluating sigma notation sums, computing combinations $\\binom{n}{r}$, and factoring exponential expressions. This lesson reviews all three before you write your first induction proof.",
      "Sigma notation gives you shortcuts for long sums. The two most important are $\\sum_{k=1}^{n}k = \\frac{n(n+1)}{2}$ and $\\sum_{k=1}^{n}k^2 = \\frac{n(n+1)(2n+1)}{6}$. Induction is the standard method for proving these formulas — so you need to evaluate them fluently before you prove them.",
      "Combinations appear in induction for the binomial theorem. The formula is $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$, where $n! = n \\times (n-1) \\times \\cdots \\times 1$ and $0! = 1$ by convention. Pascal's identity, $\\binom{n}{r}+\\binom{n}{r+1}=\\binom{n+1}{r+1}$, is the algebraic key you will use in the inductive step for binomial theorem proofs. Notice $\\binom{n}{n}=1$ and $\\binom{n}{0}=1$ for all $n$.",
    ],
    latexBlocks: [
      "\\sum_{k=1}^{n}k=\\frac{n(n+1)}{2},\\qquad\\sum_{k=1}^{n}k^2=\\frac{n(n+1)(2n+1)}{6}",
      "\\binom{n}{r}=\\frac{n!}{r!\\,(n-r)!}",
      "\\binom{n}{r}+\\binom{n}{r+1}=\\binom{n+1}{r+1}\\qquad\\text{(Pascal's identity)}",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate a sigma notation sum",
      questionLatex: "\\text{Evaluate }\\displaystyle\\sum_{k=1}^{5}k^2.",
      steps: [
        {
          explanation:
            "Identify n = 5 and substitute into the sum-of-squares formula.",
          latex:
            "\\sum_{k=1}^{5}k^2=\\frac{5\\times6\\times11}{6}",
        },
        {
          explanation:
            "Simplify: 5 × 6 × 11 = 330, and 330 ÷ 6 = 55.",
          latex:
            "=55",
        },
      ],
      finalAnswerLatex: "\\displaystyle\\sum_{k=1}^{5}k^2=55",
    },
    {
      title: "Compute a combination and verify Pascal's identity",
      questionLatex:
        "\\text{Compute }\\binom{8}{3},\\text{ then verify }\\binom{7}{2}+\\binom{7}{3}=\\binom{8}{3}.",
      steps: [
        {
          explanation:
            "Apply the formula with n = 8, r = 3. Cancel the 5! from numerator and denominator.",
          latex:
            "\\binom{8}{3}=\\frac{8!}{3!\\,5!}=\\frac{8\\times7\\times6}{3\\times2\\times1}=\\frac{336}{6}=56",
        },
        {
          explanation:
            "Compute C(7,2) and C(7,3) separately, then check their sum equals 56.",
          latex:
            "\\binom{7}{2}=21,\\quad\\binom{7}{3}=35,\\quad21+35=56\\;\\checkmark",
        },
      ],
      finalAnswerLatex: "\\binom{8}{3}=56",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-pir-g1",
      "∑_{k=1}^{n} k equals:",
      "B",
      ["n²", "n(n+1)/2", "n(n−1)/2", "n²/2"],
      "The sum of the first n positive integers is n(n+1)/2. For n=4: 1+2+3+4=10=4×5/2.",
      "\\text{Choose the best option.}",
      "Recall the triangular number formula — the answer depends on both n and n+1."
    ),
    // g2 — typed
    answer(
      "y12e1-pir-g2",
      "Evaluate ∑_{k=1}^{6} k.",
      "",
      "21",
      "Using n(n+1)/2 with n = 6: 6 × 7 ÷ 2 = 21.",
      ["21"],
      "Substitute n = 6 into n(n+1)/2."
    ),
    // g3 — typed
    answer(
      "y12e1-pir-g3",
      "Compute C(5, 2).",
      "",
      "10",
      "C(5,2) = (5 × 4)/(2 × 1) = 20/2 = 10.",
      ["10"],
      "Multiply the top two descending values (5, 4) and divide by 2!."
    ),
    // g4 — typed
    answer(
      "y12e1-pir-g4",
      "Factor $3^{k+1} + 3^k$ and write the result as $A × 3^k$. Find $A$.",
      "",
      "4",
      "3^(k+1) + 3^k = 3·3^k + 3^k = (3+1)·3^k = 4·3^k. So A = 4.",
      ["4"],
      "Write $3^{k+1}$ as 3 × $3^k$, then factor $3^k$ from both terms."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-pir-i1",
      "Evaluate ∑_{k=1}^{10} k.",
      "",
      "55",
      "n(n+1)/2 with n = 10: 10 × 11 ÷ 2 = 55.",
      ["55"],
      "Substitute n = 10 into n(n+1)/2."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-pir-i2",
      "Compute C(7, 3).",
      "",
      "35",
      "C(7,3) = (7 × 6 × 5)/(3 × 2 × 1) = 210/6 = 35.",
      ["35"],
      "Take the top 3 descending values (7, 6, 5) and divide by 3!."
    ),
    // i3 — typed, D2
    answer(
      "y12e1-pir-i3",
      "Factor $5^{k+2} − 5^k$ and write the result as $A × 5^k$. Find $A$.",
      "",
      "24",
      "5^(k+2) − 5^k = 25·5^k − 5^k = (25−1)·5^k = 24·5^k. So A = 24.",
      ["24"],
      "Write $5^{k+2} = 5^2 × 5^k = 25 × 5^k$, then factor out $5^k$."
    ),
    // i4 — MCQ, D3
    choice(
      "y12e1-pir-i4",
      "Pascal's identity states C(n, r) + C(n, r+1) equals:",
      "B",
      ["C(n+1, r)", "C(n+1, r+1)", "C(n, r+1)", "C(n+2, r+1)"],
      "Pascal's identity: C(n,r) + C(n,r+1) = C(n+1,r+1). Each entry in Pascal's triangle is the sum of the two entries directly above it.",
      "\\text{Choose the best option.}",
      "Think of Pascal's triangle: each entry is the sum of the two above it — n increases by 1, and r also increases by 1."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-pir-i5",
      "Simplify (k+1)! ÷ k!.",
      "\\frac{(k+1)!}{k!}",
      "k+1",
      "(k+1)! = (k+1) × k!, so (k+1)!/k! = k+1. This simplification arises constantly in induction algebraic steps involving factorials.",
      ["k+1"],
      "Write (k+1)! as (k+1) × k!, then cancel k! from numerator and denominator."
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-pir-m1",
      "Evaluate ∑_{k=1}^{8} k.",
      "",
      "36",
      "n(n+1)/2 with n = 8: 8 × 9 ÷ 2 = 36.",
      ["36"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-pir-m2",
      "0! equals:",
      "C",
      ["0", "undefined", "1", "∞"],
      "By convention 0! = 1. This makes C(n,0) = n!/(0!·n!) = 1 correct — there is exactly one way to choose 0 items from n."
    ),
    // m3 — typed, D3
    answer(
      "y12e1-pir-m3",
      "Compute C(9, 2).",
      "",
      "36",
      "C(9,2) = (9 × 8)/(2 × 1) = 72/2 = 36.",
      ["36"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-pir-m4",
      "Factor $7^{k+1} − 7^k$. Write the result as $A × 7^k$. Find $A$.",
      "",
      "6",
      "7^(k+1) − 7^k = 7·7^k − 7^k = (7−1)·7^k = 6·7^k. So A = 6.",
      ["6"]
    ),
    // m5 — typed, D4
    answer(
      "y12e1-pir-m5",
      "Evaluate ∑_{k=1}^{4} k².",
      "",
      "30",
      "n(n+1)(2n+1)/6 with n = 4: 4 × 5 × 9 ÷ 6 = 180 ÷ 6 = 30.",
      ["30"]
    ),
    // m6 — typed, D4
    answer(
      "y12e1-pir-m6",
      "Factor $4^{k+2} − 4^k$. Write the result as $A × 4^k$. Find $A$.",
      "",
      "15",
      "4^(k+2) − 4^k = 16·4^k − 4^k = (16−1)·4^k = 15·4^k. So A = 15.",
      ["15"]
    ),
    // m7 — MCQ, D4
    choice(
      "y12e1-pir-m7",
      "C(n, n) equals:",
      "A",
      ["1", "0", "n", "n!"],
      "C(n,n) = n!/(n!·0!) = 1. There is exactly one way to select all n items from a group of n."
    ),
    // m8 — typed, D5
    answer(
      "y12e1-pir-m8",
      "Compute C(10, 4).",
      "",
      "210",
      "C(10,4) = (10 × 9 × 8 × 7)/(4 × 3 × 2 × 1) = 5040/24 = 210.",
      ["210"]
    ),
    // m9 — typed, D5
    answer(
      "y12e1-pir-m9",
      "Evaluate ∑_{k=1}^{6} k².",
      "",
      "91",
      "n(n+1)(2n+1)/6 with n = 6: 6 × 7 × 13 ÷ 6 = 91.",
      ["91"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-pir-m10",
      "Simplify (k+2)! ÷ k!.",
      "",
      "(k+2)(k+1)",
      "(k+2)! = (k+2)(k+1)·k!, so (k+2)!/k! = (k+2)(k+1). For example with k=3: 5!/3! = 5 × 4 = 20.",
      ["(k+2)(k+1)", "(k+1)(k+2)"]
    ),
  ],
};

export function year12Extension1ProofInductionRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "proof-induction" &&
    lesson.slug === "proof-induction-revision"
  ) {
    return proofInductionRevision;
  }
  return undefined;
}
