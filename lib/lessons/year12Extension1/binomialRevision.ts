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

const binomialRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate the prior knowledge needed for the Binomial Distribution: probability rules (complement, addition, multiplication), combinations C(n,r), and expected value of a discrete random variable.",
  learningIntention:
    "Apply the complement, addition and multiplication rules of probability; compute C(n,r); and calculate the expected value E(X) of a discrete random variable.",
  successCriteria: [
    "Apply P(A') = 1 − P(A) and P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
    "Use the multiplication rule P(A ∩ B) = P(A) × P(B|A).",
    "Identify when events are independent and apply P(A ∩ B) = P(A) × P(B).",
    "Compute C(n,r) using the factorial formula.",
    "Calculate E(X) = ∑ x · P(X = x) for a discrete random variable.",
  ],
  teaching: {
    paragraphs: [
      "The Binomial Distribution builds on probability skills from Year 11. This lesson reviews four of them: the complement and addition rules, the multiplication rule and independence, the combinations formula $\\binom{n}{r}$, and expected value of a discrete random variable $X$.",
      "Probability rules: $P(A') = 1-P(A)$ (complement). $P(A\\cup B) = P(A)+P(B)-P(A\\cap B)$ (addition). For dependent events: $P(A\\cap B)=P(A)\\cdot P(B\\mid A)$ (multiplication). For independent events $A$ and $B$: $P(B\\mid A)=P(B)$, so $P(A\\cap B)=P(A)\\cdot P(B)$.",
      "Combinations $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$ count the number of ways to choose $r$ items from $n$ without regard to order. Note $\\binom{n}{0}=\\binom{n}{n}=1$. In the binomial distribution, $\\binom{n}{r}$ counts the number of sequences of $n$ trials that contain exactly $r$ successes.",
      "Expected value of a discrete random variable: $E(X)=\\sum_{x} x\\cdot P(X=x)$. Multiply each possible value by its probability, then add. $E(X)$ is the long-run average of $X$ over many trials — not the most likely single value.",
    ],
    latexBlocks: [
      "P(A')=1-P(A),\\quad P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "P(A\\cap B)=P(A)\\cdot P(B\\mid A);\\quad\\text{if independent: }P(A\\cap B)=P(A)\\cdot P(B)",
      "\\binom{n}{r}=\\frac{n!}{r!\\,(n-r)!},\\qquad E(X)=\\sum_{x}x\\cdot P(X=x)",
    ],
  },
  workedExamples: [
    {
      title: "Multi-stage probability without replacement",
      questionLatex:
        "\\text{A bag has 3 red and 5 blue balls. Two balls are drawn without replacement. Find }P(\\text{both red}).",
      steps: [
        {
          explanation:
            "Find the probability the first ball is red: 3 red out of 8 total.",
          latex:
            "P(\\text{1st red})=\\tfrac{3}{8}",
        },
        {
          explanation:
            "After removing one red ball, 2 red and 5 blue remain (7 total). Find P(2nd red | 1st red).",
          latex:
            "P(\\text{2nd red}\\mid\\text{1st red})=\\tfrac{2}{7}",
        },
        {
          explanation:
            "Multiply using the multiplication rule.",
          latex:
            "P(\\text{both red})=\\tfrac{3}{8}\\times\\tfrac{2}{7}=\\tfrac{6}{56}=\\tfrac{3}{28}",
        },
      ],
      finalAnswerLatex: "P(\\text{both red})=\\dfrac{3}{28}",
    },
    {
      title: "Expected value of a discrete random variable",
      questionLatex:
        "\\text{X has } P(X=0)=0.3,\\; P(X=1)=0.5,\\; P(X=2)=0.2.\\text{ Find } E(X).",
      steps: [
        {
          explanation:
            "Multiply each value of X by its probability.",
          latex:
            "E(X)=0\\times0.3+1\\times0.5+2\\times0.2",
        },
        {
          explanation:
            "Sum the products.",
          latex:
            "=0+0.5+0.4=0.9",
        },
      ],
      finalAnswerLatex: "E(X)=0.9",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-br-g1",
      "P(A') equals:",
      "C",
      ["P(A) − 1", "1 + P(A)", "1 − P(A)", "P(A) × P(B)"],
      "P(A') = 1 − P(A) — the complement rule. Every outcome is either in A or not in A, so their probabilities add to 1.",
      "\\text{Choose the best option.}",
      "Events A and A' together cover the entire sample space, so P(A) + P(A') = 1."
    ),
    // g2 — typed
    answer(
      "y12e1-br-g2",
      "P(A) = 0.4. Find P(A').",
      "P(A')=1-P(A)",
      "0.6",
      "P(A') = 1 − 0.4 = 0.6.",
      ["0.6"],
      "Apply the complement rule: P(A') = 1 − P(A)."
    ),
    // g3 — typed
    answer(
      "y12e1-br-g3",
      "Compute C(6, 2).",
      "\\binom{6}{2}=\\frac{6!}{2!\\,4!}",
      "15",
      "C(6,2) = (6 × 5)/(2 × 1) = 30/2 = 15.",
      ["15"],
      "Multiply the top 2 descending values (6, 5) and divide by 2!."
    ),
    // g4 — typed
    answer(
      "y12e1-br-g4",
      "X has P(X=0) = 0.5, P(X=1) = 0.3, P(X=2) = 0.2. Find E(X).",
      "E(X)=0\\times0.5+1\\times0.3+2\\times0.2",
      "0.7",
      "E(X) = 0(0.5) + 1(0.3) + 2(0.2) = 0 + 0.3 + 0.4 = 0.7.",
      ["0.7"],
      "Multiply each value of X by its probability, then add."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-br-i1",
      "P(A) = 0.6, P(B) = 0.3. Events A and B are independent. Find P(A ∩ B).",
      "P(A\\cap B)=P(A)\\times P(B)\\quad(\\text{independent})",
      "0.18",
      "For independent events: P(A ∩ B) = P(A) × P(B) = 0.6 × 0.3 = 0.18.",
      ["0.18"],
      "Independence means P(B|A) = P(B), so P(A ∩ B) = P(A) × P(B)."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-br-i2",
      "Compute C(8, 2).",
      "\\binom{8}{2}=\\frac{8\\times7}{2!}",
      "28",
      "C(8,2) = (8 × 7)/(2 × 1) = 56/2 = 28.",
      ["28"],
      "Use the top 2 descending values (8, 7) and divide by 2!."
    ),
    // i3 — typed, D2
    answer(
      "y12e1-br-i3",
      "P(A) = 0.4, P(B) = 0.5, P(A ∩ B) = 0.2. Find P(A ∪ B).",
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "0.7",
      "P(A ∪ B) = 0.4 + 0.5 − 0.2 = 0.7.",
      ["0.7"],
      "Use the addition rule and subtract the intersection to avoid double-counting."
    ),
    // i4 — MCQ, D3
    choice(
      "y12e1-br-i4",
      "C(n, 0) equals:",
      "C",
      ["0", "n", "1", "n!"],
      "C(n,0) = n!/(0!·n!) = 1. There is exactly one way to choose 0 items from n — choose nothing.",
      "\\text{Choose the best option.}",
      "Try the formula: C(n,0) = n!/(0!·n!). Recall 0! = 1."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-br-i5",
      "A fair coin is flipped twice. Find P(at least one head).",
      "P(\\text{at least one H})=1-P(\\text{no heads})",
      "3/4",
      "P(no heads) = P(TT) = (1/2)² = 1/4. So P(at least one head) = 1 − 1/4 = 3/4.",
      ["3/4", "0.75"],
      "Use the complement: P(at least one head) = 1 − P(no heads at all)."
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-br-m1",
      "Compute C(10, 3).",
      "\\binom{10}{3}=\\frac{10\\times9\\times8}{3!}",
      "120",
      "C(10,3) = (10 × 9 × 8)/(3 × 2 × 1) = 720/6 = 120.",
      ["120"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-br-m2",
      "P(A|B) equals:",
      "B",
      ["P(A∩B)/P(A)", "P(A∩B)/P(B)", "P(A)×P(B)", "P(A)+P(B)"],
      "P(A|B) = P(A∩B)/P(B). Dividing by P(B) rescales the probability to the reduced sample space where B has already occurred."
    ),
    // m3 — typed, D3
    answer(
      "y12e1-br-m3",
      "X takes values 1, 2, 3 each with probability 1/3. Find E(X).",
      "E(X)=1\\cdot\\tfrac{1}{3}+2\\cdot\\tfrac{1}{3}+3\\cdot\\tfrac{1}{3}",
      "2",
      "E(X) = 1(1/3) + 2(1/3) + 3(1/3) = (1+2+3)/3 = 6/3 = 2.",
      ["2", "2.0"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-br-m4",
      "P(A) = 0.5 and P(B|A) = 0.4. Find P(A ∩ B).",
      "P(A\\cap B)=P(A)\\times P(B\\mid A)",
      "0.2",
      "P(A ∩ B) = P(A) × P(B|A) = 0.5 × 0.4 = 0.2.",
      ["0.2"]
    ),
    // m5 — typed, D4
    answer(
      "y12e1-br-m5",
      "A bag has 4 red and 6 blue balls. Two balls drawn without replacement. Find P(both blue). Give an exact fraction.",
      "P(\\text{both blue})=\\frac{6}{10}\\times\\frac{5}{9}",
      "1/3",
      "P(1st blue) = 6/10. After removing one blue, 5 blue and 9 total remain. P(both blue) = (6/10)(5/9) = 30/90 = 1/3.",
      ["1/3"]
    ),
    // m6 — typed, D4
    answer(
      "y12e1-br-m6",
      "Compute C(7, 4).",
      "\\binom{7}{4}=\\binom{7}{3}=\\frac{7\\times6\\times5}{3!}",
      "35",
      "C(7,4) = C(7,3) by symmetry = (7 × 6 × 5)/(3 × 2 × 1) = 210/6 = 35.",
      ["35"]
    ),
    // m7 — MCQ, D4
    choice(
      "y12e1-br-m7",
      "E(X) represents:",
      "B",
      [
        "the most likely single outcome",
        "the long-run average of X over many trials",
        "the maximum value of X",
        "the median of X",
      ],
      "E(X) is the long-run average — the weighted mean of all possible values. It is not necessarily the most probable single value, and may not even be a possible value of X."
    ),
    // m8 — typed, D5
    answer(
      "y12e1-br-m8",
      "P(A) = 0.3, P(B) = 0.6. A and B are mutually exclusive. Find P(A ∪ B).",
      "P(A\\cup B)=P(A)+P(B)\\quad(\\text{mutually exclusive: }P(A\\cap B)=0)",
      "0.9",
      "For mutually exclusive events, P(A ∩ B) = 0, so P(A ∪ B) = 0.3 + 0.6 = 0.9.",
      ["0.9"]
    ),
    // m9 — typed, D5
    answer(
      "y12e1-br-m9",
      "X has P(X=0) = 1/4, P(X=1) = 1/2, P(X=2) = 1/4. Find E(X).",
      "E(X)=0\\cdot\\tfrac{1}{4}+1\\cdot\\tfrac{1}{2}+2\\cdot\\tfrac{1}{4}",
      "1",
      "E(X) = 0(1/4) + 1(1/2) + 2(1/4) = 0 + 1/2 + 1/2 = 1.",
      ["1", "1.0"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-br-m10",
      "Compute C(12, 10).",
      "\\binom{12}{10}=\\binom{12}{2}=\\frac{12\\times11}{2}",
      "66",
      "C(12,10) = C(12,2) by symmetry (n−r = 2). C(12,2) = (12 × 11)/(2 × 1) = 132/2 = 66.",
      ["66"]
    ),
  ],
};

export function year12Extension1BinomialRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "binomial-distribution" &&
    lesson.slug === "binomial-revision"
  ) {
    return binomialRevision;
  }
  return undefined;
}
