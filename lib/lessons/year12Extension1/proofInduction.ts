import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function inductionChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Look for the base case, the inductive hypothesis, and the move from k to k+1.",
    explanation,
  };
}

function inductionTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Write the small algebraic result the induction step needs.",
    explanation,
  };
}

const base = {
  masteryPassMark: 0.8,
};

const introToMathematicalInduction: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Understand why mathematical induction works and use the base case plus inductive step structure to prove summation formulae.",
  learningIntention:
    "Use mathematical induction to prove statements about positive integers, especially summation formulae.",
  successCriteria: [
    "State and verify the base case for an induction proof.",
    "Write the inductive hypothesis clearly for n = k.",
    "Use the inductive hypothesis to complete the algebraic step from k to k + 1.",
    "Write a clear conclusion that the statement is true for all required integers.",
  ],
  teaching: {
    paragraphs: [
      "Induction is like setting up a chain of dominoes. The base case knocks over the first domino, and the inductive step proves that whenever one domino falls, the next one must fall too.",
      "The base case checks the first value of n. The inductive hypothesis assumes the statement is true for some general integer k, not because we are finished, but so we can prove the next case.",
      "The inductive step must show that the statement for k forces the statement for k + 1. For sums, this usually means taking the formula up to k and adding the new final term.",
      "A complete proof ends with a sentence linking the two parts: since the base case is true and the implication from k to k + 1 is true, the result holds for all integers in the range.",
    ],
    latexBlocks: [
      "P(1)\\text{ is true}",
      "P(k)\\Rightarrow P(k+1)",
      "\\therefore P(n)\\text{ is true for all }n\\ge 1",
    ],
  },
  workedExamples: [
    {
      title: "Prove the sum of the first n positive integers",
      questionLatex:
        "\\text{Prove that }1+2+3+\\cdots+n=\\frac{n(n+1)}{2}\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation:
            "Check the first domino: when n = 1, the left side and right side both equal 1.",
          latex: "1=\\frac{1(1+1)}{2}=1",
        },
        {
          explanation:
            "Assume the formula is true up to n = k. This is the inductive hypothesis.",
          latex: "1+2+\\cdots+k=\\frac{k(k+1)}{2}",
        },
        {
          explanation:
            "To reach k + 1, add the next term, k + 1, to both sides of the assumed formula.",
          latex:
            "1+2+\\cdots+k+(k+1)=\\frac{k(k+1)}{2}+(k+1)",
        },
        {
          explanation:
            "Factor the common k + 1. This creates the same formula shape with k + 1 replacing k.",
          latex:
            "\\frac{k(k+1)}{2}+(k+1)=\\frac{(k+1)(k+2)}{2}",
        },
      ],
      finalAnswerLatex:
        "\\therefore 1+2+\\cdots+n=\\frac{n(n+1)}{2}\\text{ for all }n\\ge1.",
    },
    {
      title: "Identify the two jobs in induction",
      questionLatex:
        "\\text{Explain the role of the base case and inductive step.}",
      steps: [
        {
          explanation:
            "The base case proves the result actually starts in the required range.",
          latex: "P(1)\\text{ true}",
        },
        {
          explanation:
            "The inductive step proves the statement can keep moving forward one integer at a time.",
          latex: "P(k)\\Rightarrow P(k+1)",
        },
      ],
      finalAnswerLatex:
        "\\text{Base case starts the chain; inductive step continues it.}",
    },
    {
      title: "Set up a square-sum proof",
      questionLatex:
        "\\text{For }\\sum_{r=1}^{n}r^2=\\frac{n(n+1)(2n+1)}{6},\\text{ write the hypothesis and next step.}",
      steps: [
        {
          explanation:
            "The inductive hypothesis writes the formula with n replaced by k.",
          latex:
            "\\sum_{r=1}^{k}r^2=\\frac{k(k+1)(2k+1)}{6}",
        },
        {
          explanation:
            "The k + 1 case adds the new final term, (k + 1)^2.",
          latex:
            "\\sum_{r=1}^{k+1}r^2=\\frac{k(k+1)(2k+1)}{6}+(k+1)^2",
        },
      ],
      finalAnswerLatex:
        "\\text{Use the hypothesis, then add }(k+1)^2\\text{ and simplify.}",
    },
  ],
  guidedPractice: [
    inductionChoice(
      "y12e1-induction-intro-g1",
      "For the square-sum formula, what should the base case check?",
      "A",
      [
        "Check n = 1 on both sides.",
        "Check n = k on both sides.",
        "Assume the result for all n immediately.",
        "Start by expanding the right side for n = 10.",
      ],
      "The base case checks the first allowed integer. Here the formula starts at n = 1.",
      "\\sum_{r=1}^{n}r^2=\\frac{n(n+1)(2n+1)}{6}"
    ),
    inductionChoice(
      "y12e1-induction-intro-g2",
      "Which is the correct inductive hypothesis for the square-sum formula?",
      "B",
      [
        "\\sum_{r=1}^{k+1}r^2=\\frac{(k+1)(k+2)(2k+3)}{6}",
        "\\sum_{r=1}^{k}r^2=\\frac{k(k+1)(2k+1)}{6}",
        "\\sum_{r=1}^{n}r=\\frac{n(n+1)}{2}",
        "\\sum_{r=1}^{k}r^2=k^2",
      ],
      "The hypothesis is the statement assumed true at n = k. The k + 1 version is what we still need to prove."
    ),
    inductionChoice(
      "y12e1-induction-intro-g3",
      "After assuming the square-sum formula for k, what do you add to move to k + 1?",
      "C",
      ["k", "2k+1", "(k+1)^2", "k^2+1"],
      "The sum of squares gains the next square term. From k to k + 1, that term is (k + 1)^2."
    ),
    inductionTyped(
      "y12e1-induction-intro-g4",
      "Complete the factor after simplifying the square-sum step.",
      "\\frac{k(k+1)(2k+1)}{6}+(k+1)^2=\\frac{(k+1)(k+2)(\\,?\\,)}{6}",
      "2k+3",
      ["2k + 3"],
      "The k + 1 formula needs 2(k + 1) + 1, which simplifies to 2k + 3."
    ),
  ],
  independentPractice: [
    inductionChoice(
      "y12e1-induction-intro-i1",
      "Which statement best describes the inductive step?",
      "D",
      [
        "It checks a random value of n.",
        "It proves the answer by trying several examples.",
        "It assumes the result is true forever.",
        "It proves that truth at k forces truth at k + 1.",
      ],
      "The inductive step is the bridge from one integer to the next."
    ),
    inductionChoice(
      "y12e1-induction-intro-i2",
      "For a summation proof, why do we add the next term in the k + 1 step?",
      "A",
      [
        "Because the sum up to k + 1 is the sum up to k plus the new final term.",
        "Because every induction proof must add 1 to the answer.",
        "Because the base case is usually too small.",
        "Because the formula should become shorter.",
      ],
      "A finite sum grows by one extra final term when the upper limit changes from k to k + 1."
    ),
    inductionTyped(
      "y12e1-induction-intro-i3",
      "For the triangular-number proof, what expression is added in the k + 1 step?",
      "1+2+\\cdots+k+(\\,?\\,)",
      "k+1",
      ["k + 1"],
      "The next term after k is k + 1."
    ),
    inductionChoice(
      "y12e1-induction-intro-i4",
      "Which conclusion is logically valid after a true base case and true inductive step?",
      "C",
      [
        "The result is true only for n = 1.",
        "The result is probably true for large n.",
        "The result is true for all integers in the stated range.",
        "The result is true for all real numbers.",
      ],
      "Induction proves the statement for the integer chain starting from the base case."
    ),
    inductionChoice(
      "y12e1-induction-intro-i5",
      "What is the main error in assuming P(k + 1) before proving it?",
      "B",
      [
        "It makes the base case too long.",
        "It assumes the result that the proof is supposed to establish.",
        "It changes the variable from n to k.",
        "It checks too many values.",
      ],
      "The hypothesis is P(k). The whole job is to prove P(k + 1), not assume it."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Skipping the base case.",
      fix: "The base case starts the integer chain. Without it, the inductive step has nowhere to begin.",
    },
    {
      mistake: "Assuming the k + 1 case.",
      fix: "Only assume P(k). The proof must build P(k + 1) from that assumption.",
    },
    {
      mistake: "Adding the wrong next term in a sum.",
      fix: "Look at the upper limit. Moving from k to k + 1 adds the term with index k + 1.",
    },
    {
      mistake: "Writing no final conclusion.",
      fix: "Finish by saying the result follows for all integers in the stated range by induction.",
    },
  ],
  masteryQuiz: [
    inductionChoice("y12e1-induction-intro-m1", "Which two parts are essential in a basic induction proof?", "A", ["Base case and inductive step", "Graph and table", "Derivative and integral", "Mean and standard deviation"], "Induction needs a starting point and a rule that moves from one integer to the next."),
    inductionChoice("y12e1-induction-intro-m2", "For $1+2+\\cdots+n=\\frac{n(n+1)}{2}$, what is the inductive hypothesis?", "B", ["$1+2+\\cdots+k=\\frac{k(k-1)}{2}$", "$1+2+\\cdots+k=\\frac{k(k+1)}{2}$", "$1+2+\\cdots+(k+1)=\\frac{k(k+1)}{2}$", "$1+2+\\cdots+n=k$"], "Replace n by k in the statement you are allowed to assume."),
    inductionTyped("y12e1-induction-intro-m3", "What term is added when proving the triangular-number formula from k to k + 1?", "1+2+\\cdots+k+(\\,?\\,)", "k+1", ["k + 1"], "The next integer after k is k + 1."),
    inductionChoice("y12e1-induction-intro-m4", "For the square-sum formula, the k + 1 step should add:", "C", ["k+1", "k^2", "(k+1)^2", "2k+1"], "The formula sums squares, so the new term is the square of k + 1."),
    inductionChoice("y12e1-induction-intro-m5", "Which option is a valid induction conclusion?", "D", ["Therefore the result is true for n = k only.", "Therefore the result is true for some examples.", "Therefore the result is true for all real x.", "Therefore the result is true for all integers n in the stated range."], "Induction works along integer values starting from the base case."),
    inductionChoice("y12e1-induction-intro-m6", "What is wrong with starting an induction proof by saying 'Assume true for n = k + 1'?", "A", ["That is the statement to prove, not the hypothesis.", "The variable k is not allowed.", "Base cases cannot use numbers.", "The formula must be differentiated."], "The allowed assumption is P(k)."),
    inductionTyped("y12e1-induction-intro-m7", "Simplify the missing factor: $2(k+1)+1= ?$", "2(k+1)+1", "2k+3", ["2k + 3"], "Expanding gives 2k + 2 + 1 = 2k + 3."),
    inductionChoice("y12e1-induction-intro-m8", "Why is checking n = 1, 2, and 3 not a full induction proof?", "B", ["It is too much checking.", "Examples do not prove every integer case.", "It proves only the k + 1 case.", "It proves all real numbers."], "A pattern can hold for early examples and fail later, so induction needs the general step."),
    inductionChoice("y12e1-induction-intro-m9", "In an induction proof, P(k) implies P(k + 1) means:", "C", ["P(k) is false.", "P(k + 1) is assumed first.", "If the statement holds at k, it must hold at the next integer.", "The result skips every second integer."], "The implication is the domino step."),
    inductionChoice("y12e1-induction-intro-m10", "Which topic is most naturally proved by adding a new final term in the inductive step?", "A", ["Summation formula", "Circle theorem", "Median from a data set", "Solving a quadratic by formula"], "Sums change from k to k + 1 by adding the next term."),
  ],
};

const inductionDivisibility: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Use mathematical induction to prove divisibility statements involving powers and algebraic rearrangement.",
  learningIntention:
    "Prove divisibility results by using the inductive hypothesis to keep a known multiple visible.",
  successCriteria: [
    "State the divisibility claim using a multiple such as 2m or 3m.",
    "Use the inductive hypothesis in the k + 1 step.",
    "Rewrite the k + 1 expression to expose a known divisible part.",
    "Avoid assuming the k + 1 divisibility result before it is proved.",
  ],
  teaching: {
    paragraphs: [
      "A divisibility proof is about keeping a multiple visible. If something is divisible by 3, write it as 3m for some integer m.",
      "The inductive hypothesis gives you permission to replace the k case with a known multiple. The k + 1 expression should be rearranged until that known multiple appears.",
      "The common trap is circular reasoning: saying the k + 1 expression is divisible because it looks similar. You must show it is made from multiples of the divisor.",
    ],
    latexBlocks: [
      "3^k-1=2m",
      "3^{k+1}-1=3(3^k)-1",
      "\\text{multiple} + \\text{multiple} = \\text{multiple}",
    ],
  },
  workedExamples: [
    {
      title: "Prove $3^n-1$ is divisible by 2",
      questionLatex:
        "\\text{Prove that }3^n-1\\text{ is divisible by }2\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation: "Check n = 1 first.",
          latex: "3^1-1=2",
        },
        {
          explanation:
            "Assume the statement is true at n = k, so the expression is an even number.",
          latex: "3^k-1=2m",
        },
        {
          explanation:
            "Build the k + 1 case and separate it so the hypothesis appears.",
          latex:
            "3^{k+1}-1=3\\cdot3^k-1=3(3^k-1)+2",
        },
        {
          explanation:
            "The first part is 3 times an even number, and the second part is also even.",
          latex: "3(2m)+2=2(3m+1)",
        },
      ],
      finalAnswerLatex:
        "\\therefore 3^n-1\\text{ is divisible by }2\\text{ for all }n\\ge1.",
    },
    {
      title: "Prove $4^n-1$ is divisible by 3",
      questionLatex:
        "\\text{Prove that }4^n-1\\text{ is divisible by }3\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation: "Check the first value.",
          latex: "4^1-1=3",
        },
        {
          explanation:
            "Assume $4^k-1$ is a multiple of 3.",
          latex: "4^k-1=3m",
        },
        {
          explanation:
            "Rewrite the next case so the assumed expression $4^k-1$ appears.",
          latex:
            "4^{k+1}-1=4(4^k)-1=4(4^k-1)+3",
        },
        {
          explanation:
            "Both terms are multiples of 3, so their sum is a multiple of 3.",
          latex: "4(3m)+3=3(4m+1)",
        },
      ],
      finalAnswerLatex:
        "\\therefore 4^n-1\\text{ is divisible by }3\\text{ for all }n\\ge1.",
    },
    {
      title: "Spot circular reasoning",
      questionLatex:
        "\\text{A student writes: }5^{k+1}-1\\text{ is divisible by }4\\text{ because }5^k-1\\text{ is.}",
      steps: [
        {
          explanation:
            "This has the right idea but no algebraic bridge. The k + 1 expression must be rewritten.",
          latex: "5^{k+1}-1=5(5^k)-1",
        },
        {
          explanation:
            "Now expose the hypothesis by subtracting and adding 5.",
          latex: "5(5^k-1)+4",
        },
      ],
      finalAnswerLatex:
        "\\text{Use the hypothesis explicitly; do not just claim the next case.}",
    },
  ],
  guidedPractice: [
    inductionChoice("y12e1-induction-div-g1", "If $a^k-1$ is divisible by 4, which notation expresses the inductive hypothesis?", "B", ["$a^k-1=4+k$", "$a^k-1=4m$", "$a^{k+1}-1=4m$", "$a^k=4$"], "Divisible by 4 means equal to 4 times some integer."),
    inductionTyped("y12e1-induction-div-g2", "Complete the useful rewrite.", "5^{k+1}-1=5(5^k-1)+?", "4", ["+4"], "Expanding 5(5^k - 1) + 4 gives 5^{k+1} - 5 + 4 = 5^{k+1} - 1."),
    inductionChoice("y12e1-induction-div-g3", "Why is $4(3m)+3$ divisible by 3?", "A", ["It equals $3(4m+1)$.", "It is close to a multiple of 3.", "It contains the number 4.", "It works for k = 1 only."], "Factoring out 3 shows the whole expression is a multiple of 3."),
    inductionChoice("y12e1-induction-div-g4", "Which is the circular-reasoning error?", "D", ["Checking the base case.", "Writing the hypothesis as a multiple.", "Factoring out the divisor.", "Saying the k + 1 case is divisible without proving it."], "The k + 1 case is the destination, not an allowed assumption."),
  ],
  independentPractice: [
    inductionChoice("y12e1-induction-div-i1", "To prove $2^n$ is divisible by 2 for $n\\ge1$, what is the base case value?", "A", ["$2^1=2$", "$2^0=1$", "$2^k=2$", "$2^{k+1}=2$"], "The statement begins at n = 1."),
    inductionTyped("y12e1-induction-div-i2", "If $7^k-1=6m$, complete the factorised conclusion for $7^{k+1}-1=7(7^k-1)+6$.", "7(6m)+6=6(?)", "7m+1", ["7m + 1"], "Both terms have a factor of 6: 42m + 6 = 6(7m + 1)."),
    inductionChoice("y12e1-induction-div-i3", "Which divisor matches the claim $6^n-1$ is divisible by 5?", "C", ["2", "3", "5", "6"], "The divisor is the number the expression must be a multiple of."),
    inductionChoice("y12e1-induction-div-i4", "What should appear inside the k + 1 algebra for a divisibility proof?", "B", ["Only the answer from the base case", "The expression from the inductive hypothesis", "A decimal approximation", "A graph"], "The hypothesis is useful only if the k + 1 expression is rewritten to contain it."),
    inductionChoice("y12e1-induction-div-i5", "If two terms are each divisible by 4, what can you conclude about their sum?", "A", ["The sum is divisible by 4.", "The sum is always 4.", "The sum is not divisible by 4.", "The sum must be prime."], "Multiples of the same divisor add to another multiple of that divisor."),
  ],
  commonMistakes: [
    {
      mistake: "Assuming the k + 1 divisibility result.",
      fix: "Use only the k case as the hypothesis, then rewrite the k + 1 expression to reveal it.",
    },
    {
      mistake: "Not writing 'for some integer m'.",
      fix: "Divisibility proofs need the multiple form, such as $3^k-1=2m$ for some integer m.",
    },
    {
      mistake: "Losing the extra constant when rearranging powers.",
      fix: "Expand your rewritten expression to check it really equals the k + 1 expression.",
    },
    {
      mistake: "Checking examples instead of proving the general step.",
      fix: "Examples support intuition, but induction needs the algebraic k to k + 1 step.",
    },
  ],
  masteryQuiz: [
    inductionChoice("y12e1-induction-div-m1", "Divisible by 6 means the expression can be written as:", "C", ["$m+6$", "$6/m$", "$6m$ for some integer m", "$m^6$"], "A multiple of 6 has the form 6m."),
    inductionChoice("y12e1-induction-div-m2", "For $3^n-1$ divisible by 2, the correct hypothesis is:", "A", ["$3^k-1=2m$", "$3^{k+1}-1=2m$", "$3^k=2m-1$", "$3^n=2$"], "The hypothesis states the k case as a multiple of 2."),
    inductionTyped("y12e1-induction-div-m3", "Complete: $3^{k+1}-1=3(3^k-1)+?$", "3^{k+1}-1=3(3^k-1)+?", "2", ["+2"], "Expanding gives 3^{k+1} - 3 + 2 = 3^{k+1} - 1."),
    inductionChoice("y12e1-induction-div-m4", "For $4^n-1$ divisible by 3, why is $4(3m)+3$ useful?", "B", ["It removes k.", "It shows a factor of 3.", "It proves the base case only.", "It changes the divisor to 4."], "Factoring gives 3(4m + 1)."),
    inductionChoice("y12e1-induction-div-m5", "Which rewrite helps prove $5^n-1$ is divisible by 4?", "D", ["$5^k-1+1$", "$5(5^k+1)$", "$5^{k+1}+4$", "$5(5^k-1)+4$"], "This exposes the k case and an extra multiple of 4."),
    inductionChoice("y12e1-induction-div-m6", "What is the base case for proving $4^n-1$ is divisible by 3 for $n\\ge1$?", "A", ["$4^1-1=3$", "$4^0-1=0$", "$4^3-1=63$", "$4^k-1=3m$"], "The first required value is n = 1."),
    inductionChoice("y12e1-induction-div-m7", "Which statement is a valid reason that $2(3m+1)$ is divisible by 2?", "C", ["It contains an odd number.", "It has a bracket.", "It is 2 times an integer.", "It is greater than 2."], "Being 2 times an integer is exactly the divisibility condition."),
    inductionChoice("y12e1-induction-div-m8", "A proof says '$7^{k+1}-1$ is divisible by 6 because $7^k-1$ is.' What is missing?", "B", ["A graph", "Algebra connecting the k case to the k + 1 case", "The word therefore only", "A decimal answer"], "The proof must show the k + 1 expression contains the hypothesis plus another multiple."),
    inductionTyped("y12e1-induction-div-m9", "If $a^k-1=5m$, what divisor is being proved?", "\\text{divisor}=?", "5", ["divisible by 5"], "The expression is written as 5 times an integer."),
    inductionChoice("y12e1-induction-div-m10", "Which divisor set appears in these practice divisibility proofs?", "A", ["2, 3, 4, 5, and 6", "Only 10", "Only prime numbers above 10", "No divisors"], "The unit practises small divisors such as 2, 3, 4, 5, and 6."),
  ],
};

const inductionInequalities: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Use induction to prove inequalities, including choosing the correct base case and strengthening the k to k + 1 comparison.",
  learningIntention:
    "Prove inequality statements by induction and explain why the starting value matters.",
  successCriteria: [
    "Check the correct base case for the stated range.",
    "Use the inductive hypothesis to compare the k + 1 expression.",
    "Recognise when a proof needs a stronger starting point such as n = 4.",
    "Complete inequality steps without reversing or weakening the comparison.",
  ],
  teaching: {
    paragraphs: [
      "Inequality induction still uses the same domino idea, but the algebra usually compares sizes rather than proving equality.",
      "The base case is especially important. Some inequalities are false for small values and only become true from a later starting value.",
      "In the inductive step, use the hypothesis to replace part of the k + 1 expression with something smaller or larger, then finish the comparison carefully.",
    ],
    latexBlocks: [
      "P(k):\\quad 2^k>k",
      "2^{k+1}=2\\cdot2^k>2k",
      "2k>k+1\\quad \\text{for }k\\ge2",
    ],
  },
  workedExamples: [
    {
      title: "Prove $2^n>n$",
      questionLatex:
        "\\text{Prove that }2^n>n\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation: "Check the first value.",
          latex: "2^1=2>1",
        },
        {
          explanation:
            "Assume the inequality is true at n = k.",
          latex: "2^k>k",
        },
        {
          explanation:
            "Double both sides of the useful comparison by multiplying $2^k$ by 2.",
          latex: "2^{k+1}=2\\cdot2^k>2k",
        },
        {
          explanation:
            "For k >= 1, 2k is at least k + 1, so the next inequality follows.",
          latex: "2k\\ge k+1",
        },
      ],
      finalAnswerLatex: "\\therefore 2^{k+1}>k+1,\\text{ so }2^n>n\\text{ for all }n\\ge1.",
    },
    {
      title: "Prove $n!>2^n$ from n = 4",
      questionLatex:
        "\\text{Prove that }n!>2^n\\text{ for all }n\\ge4.",
      steps: [
        {
          explanation:
            "The correct base case is n = 4 because the statement is not true at n = 2 or n = 3.",
          latex: "4!=24>16=2^4",
        },
        {
          explanation: "Assume the result is true at n = k for k >= 4.",
          latex: "k!>2^k",
        },
        {
          explanation:
            "Move to k + 1 by multiplying k! by k + 1.",
          latex: "(k+1)!=(k+1)k!>(k+1)2^k",
        },
        {
          explanation:
            "Since k + 1 > 2 for k >= 4, the right side is greater than $2\\cdot2^k$.",
          latex: "(k+1)2^k>2\\cdot2^k=2^{k+1}",
        },
      ],
      finalAnswerLatex:
        "\\therefore (k+1)!>2^{k+1},\\text{ so }n!>2^n\\text{ for all }n\\ge4.",
    },
    {
      title: "Choose the correct base case",
      questionLatex:
        "\\text{Why would }n!>2^n\\text{ not start at }n=1?",
      steps: [
        {
          explanation:
            "Test small values before choosing the base case.",
          latex: "1!=1<2,\\quad 2!=2<4,\\quad 3!=6<8",
        },
        {
          explanation:
            "At n = 4 the inequality becomes true and the induction chain can start.",
          latex: "4!=24>16",
        },
      ],
      finalAnswerLatex: "\\text{Start at }n=4.",
    },
  ],
  guidedPractice: [
    inductionChoice("y12e1-induction-ineq-g1", "For $2^n>n$, what is the base case at n = 1?", "A", ["$2>1$", "$1>2$", "$2^k>k$", "$2^{k+1}>k+1$"], "The base case substitutes n = 1 into the original statement."),
    inductionChoice("y12e1-induction-ineq-g2", "If $2^k>k$, what can we say about $2^{k+1}$?", "B", ["$2^{k+1}=2^k+1$", "$2^{k+1}=2\\cdot2^k>2k$", "$2^{k+1}<k$", "$2^{k+1}=k+1$"], "Doubling $2^k$ also doubles the lower bound k."),
    inductionChoice("y12e1-induction-ineq-g3", "Why does $n!>2^n$ start at n = 4?", "C", ["Because 4 is always used in induction.", "Because factorials cannot use n = 1.", "Because the inequality is false for some smaller n.", "Because powers of 2 stop at 4."], "The base case must be a value where the statement is true."),
    inductionTyped("y12e1-induction-ineq-g4", "Complete the key factorial step.", "(k+1)!=(? )k!", "k+1", ["(k+1)", "k + 1"], "The factorial (k + 1)! is (k + 1) times k!."),
  ],
  independentPractice: [
    inductionChoice("y12e1-induction-ineq-i1", "Which inequality is needed to finish $2^{k+1}>k+1$ after showing $2^{k+1}>2k$?", "A", ["$2k\\ge k+1$ for k >= 1", "$2k<k+1$ for k >= 1", "$k=0$", "$2^k=k$"], "If $2^{k+1}$ is bigger than 2k, and 2k is at least k+1, then it is bigger than k+1."),
    inductionChoice("y12e1-induction-ineq-i2", "Which base case is correct for proving a statement for all n >= 4?", "D", ["n = 1", "n = 2", "n = k", "n = 4"], "The base case must match the first integer in the stated range."),
    inductionTyped("y12e1-induction-ineq-i3", "Evaluate the base case comparison for $n!>2^n$ at n = 4. Enter $4!$.", "4!", "24", ["24"], "The base case compares 24 with 16."),
    inductionChoice("y12e1-induction-ineq-i4", "What is the common inequality-proof trap?", "B", ["Checking the base case.", "Using an inequality in the wrong direction.", "Writing k instead of n in the hypothesis.", "Multiplying by 1."], "The direction of the inequality carries the logic, so reversing it breaks the proof."),
    inductionChoice("y12e1-induction-ineq-i5", "What is the inductive hypothesis for $n!>2^n$?", "C", ["$(k+1)!>2^{k+1}$", "$n!>2^n$", "$k!>2^k$", "$k!<2^k$"], "The hypothesis is the statement at n = k."),
  ],
  commonMistakes: [
    {
      mistake: "Starting from the wrong base case.",
      fix: "Use the first n-value in the statement, especially when the result starts at n >= 4.",
    },
    {
      mistake: "Assuming the inequality for k + 1.",
      fix: "Assume only the k case, then prove the k + 1 case using comparison.",
    },
    {
      mistake: "Reversing the inequality direction.",
      fix: "Track whether each step gives a greater-than or less-than comparison.",
    },
    {
      mistake: "Using examples as the whole proof.",
      fix: "Examples help find the base case, but induction still needs the general k to k + 1 step.",
    },
  ],
  masteryQuiz: [
    inductionChoice("y12e1-induction-ineq-m1", "What is the base case for $2^n>n$ for all n >= 1?", "A", ["$2^1>1$", "$2^0>0$", "$2^k>k$", "$2^{k+1}>k+1$"], "Substitute the first allowed value, n = 1."),
    inductionChoice("y12e1-induction-ineq-m2", "From $2^k>k$, which comparison is valid?", "B", ["$2^{k+1}>k$", "$2^{k+1}>2k$", "$2^{k+1}<2k$", "$2^{k+1}=k+1$"], "Multiply both sides of the useful comparison by 2."),
    inductionChoice("y12e1-induction-ineq-m3", "The statement $n!>2^n$ is first true at:", "D", ["n = 1", "n = 2", "n = 3", "n = 4"], "At n = 4, 24 > 16. The smaller tested values do not work."),
    inductionTyped("y12e1-induction-ineq-m4", "Complete: $(k+1)!=(k+1)(?)$.", "(k+1)!=(k+1)(?)", "k!", ["k !"], "Factorial grows by multiplying k! by k + 1."),
    inductionChoice("y12e1-induction-ineq-m5", "Why is $k+1>2$ true in the factorial proof for k >= 4?", "A", ["Because k + 1 >= 5.", "Because k + 1 = 2.", "Because factorial means divide by 2.", "Because the base case is n = 1."], "If k is at least 4, then k + 1 is at least 5."),
    inductionChoice("y12e1-induction-ineq-m6", "Which proof type best matches $4^n-1$ divisible by 3?", "B", ["Inequality induction", "Divisibility induction", "Coordinate proof", "Statistical proof"], "The key claim is that an expression is a multiple of 3."),
    inductionChoice("y12e1-induction-ineq-m7", "Which proof type best matches $1+2+\\cdots+n=\\frac{n(n+1)}{2}$?", "C", ["Divisibility", "Inequality", "Summation induction", "Probability simulation"], "The claim is a formula for a finite sum."),
    inductionChoice("y12e1-induction-ineq-m8", "Which error appears in 'Since $k!>2^k$, therefore $(k+1)!>2^{k+1}$' with no extra working?", "D", ["No base case can exist.", "The statement is false for all k.", "It used too many brackets.", "It skipped the comparison needed for the k + 1 step."], "The proof must show how multiplying by k + 1 beats multiplying by 2."),
    inductionChoice("y12e1-induction-ineq-m9", "For an inequality proof, the inductive step usually needs:", "A", ["A comparison chain from the k case to the k + 1 case", "A two-way table", "A tangent equation", "A decimal approximation only"], "Inequality induction is built by chaining valid comparisons."),
    inductionChoice("y12e1-induction-ineq-m10", "Which statement best explains induction?", "B", ["It proves a result by drawing an accurate graph.", "It proves a first case and a repeatable next-case step.", "It checks only the largest value.", "It works only for decimal values."], "The base case and next-case implication are the heart of induction."),
  ],
};

export function year12Extension1ProofInductionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-extension-1" ||
    unit.slug !== "proof-induction"
  ) {
    return null;
  }

  if (lesson.slug === "intro-to-mathematical-induction") {
    return introToMathematicalInduction;
  }

  if (lesson.slug === "induction-divisibility") {
    return inductionDivisibility;
  }

  if (lesson.slug === "induction-inequalities") {
    return inductionInequalities;
  }

  return null;
}
