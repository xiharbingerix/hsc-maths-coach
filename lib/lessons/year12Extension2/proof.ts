import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function proofChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Match the statement to the proof structure before choosing."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select the best option.}",
    choices: choices.map((text, i) => ({
      label: String.fromCharCode(65 + i),
      text,
    })),
    answer,
    acceptedAnswers: [],
    hint,
    explanation,
  };
}

function proofTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Use the proof setup to find the exact requested value or word."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

const contradictionLesson: Partial<ExplicitLesson> = {
  description:
    "Use contradiction safely: assume the negation, follow exact algebra or number facts to an impossible condition, then select the valid conclusion.",
  learningIntention:
    "Recognise the structure of proof by contradiction and complete markable intermediate steps without relying on free-text proof marking.",
  successCriteria: [
    "Choose the negated assumption that starts a contradiction argument.",
    "Calculate exact parity, divisibility or irrationality consequences from the assumption.",
    "Identify the condition that has been contradicted.",
    "Select the conclusion that follows once a contradiction has been reached.",
  ],
  teaching: {
    paragraphs: [
      "A proof by contradiction begins by assuming the opposite of the statement you want. The aim is not to keep that assumption; the aim is to show it forces something impossible.",
      "The contradiction might be arithmetic, such as an integer being both even and odd, or structural, such as a fraction being in lowest terms while both numerator and denominator share a factor.",
      "In Extension 2, contradiction is useful when the direct path is unclear but the negated statement gives a concrete object to analyse, such as a rational representation p/q.",
      "For auto-marked practice, the full written proof belongs in worked examples and explanations. Practice questions target the assumption, a key algebraic consequence, or the contradiction itself.",
    ],
    latexBlocks: [
      "\\text{To prove }S:\\quad \\text{assume }\\neg S,\\quad \\neg S \\Rightarrow \\text{impossible},\\quad \\therefore S.",
      "\\sqrt{2}=\\frac{p}{q}\\text{ in lowest terms}\\Rightarrow p^2=2q^2",
      "n\\text{ odd}\\Rightarrow n=2k+1\\Rightarrow n^2=4k^2+4k+1\\text{ is odd}",
    ],
  },
  workedExamples: [
    {
      title: "Irrationality from a lowest-terms contradiction",
      questionLatex: "\\text{Use contradiction to show }\\sqrt{2}\\text{ is irrational.}",
      steps: [
        {
          explanation:
            "Assume the opposite: suppose sqrt(2) is rational, so sqrt(2) = p/q for integers p and q in lowest terms.",
          latex: "\\sqrt{2}=\\frac{p}{q},\\quad \\gcd(p,q)=1",
        },
        {
          explanation:
            "Square both sides. This gives p^2 = 2q^2, so p^2 is even and therefore p is even.",
          latex: "2=\\frac{p^2}{q^2}\\Rightarrow p^2=2q^2",
        },
        {
          explanation:
            "Write p = 2m. Then 4m^2 = 2q^2, so q^2 = 2m^2 and q is even too.",
          latex: "p=2m\\Rightarrow 4m^2=2q^2\\Rightarrow q^2=2m^2",
        },
        {
          explanation:
            "Both p and q are even, contradicting the assumption that p/q was in lowest terms.",
          latex: "2\\mid p\\text{ and }2\\mid q\\quad\\text{contradicts }\\gcd(p,q)=1",
        },
      ],
      finalAnswerLatex: "\\sqrt{2}\\text{ is irrational.}",
    },
    {
      title: "No greatest prime",
      questionLatex: "\\text{Assume }p_1,p_2,\\ldots,p_n\\text{ are all the primes and set }N=p_1p_2\\cdots p_n+1.",
      steps: [
        {
          explanation:
            "If the list contains every prime, any prime divisor of N must be one of p1, p2, ..., pn.",
          latex: "N=p_1p_2\\cdots p_n+1",
        },
        {
          explanation:
            "Dividing N by any prime pi in the list leaves remainder 1, because the product term is divisible by pi.",
          latex: "N\\equiv 1\\pmod {p_i}",
        },
        {
          explanation:
            "So no prime in the supposed complete list divides N. But every integer greater than 1 has a prime divisor.",
        },
        {
          explanation:
            "This contradiction means the original assumption of a complete finite list of primes is false.",
        },
      ],
      finalAnswerLatex: "\\text{There is no greatest prime.}",
    },
    {
      title: "Parity contradiction",
      questionLatex: "\\text{Use contradiction for: if }n^2\\text{ is even, then }n\\text{ is even.}",
      steps: [
        {
          explanation:
            "Assume the opposite of the conclusion: n is odd, while keeping the given condition n^2 is even.",
          latex: "n=2k+1",
        },
        {
          explanation:
            "Square the odd form. The result is one more than an even number, so it is odd.",
          latex: "n^2=(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1",
        },
        {
          explanation:
            "This says n^2 is odd, contradicting the given condition that n^2 is even.",
        },
      ],
      finalAnswerLatex: "\\text{Therefore }n\\text{ is even.}",
    },
  ],
  guidedPractice: [
    proofChoice(
      "y12e2-proof-contr-g1",
      "To start a contradiction argument for '$\\sqrt{3}$ is irrational', which assumption is used?",
      "B",
      [
        "$\\sqrt{3}$ is an integer",
        "$\\sqrt{3}=p/q$ for integers p, q in lowest terms",
        "$\\sqrt{3}$ is negative",
        "$\\sqrt{3}=3p/q$ for all integers p, q",
      ],
      "Contradiction starts with the negation of irrational: rational. The useful rational form is sqrt(3)=p/q in lowest terms."
    ),
    proofTyped(
      "y12e2-proof-contr-g2",
      "In the sqrt(2) contradiction setup, $p^2=2q^2$. Type the divisor that must divide $p^2$.",
      "p^2=2q^2",
      "2",
      [],
      "Because p^2 equals 2 times q^2, p^2 is divisible by 2.",
      "Look at the factor multiplying q^2."
    ),
    proofTyped(
      "y12e2-proof-contr-g3",
      "If $n$ is assumed odd and $n=2k+1$, type the parity of $n^2$.",
      "n^2=(2k+1)^2",
      "odd",
      ["Odd", "ODD"],
      "Squaring gives n^2=4k^2+4k+1=2(2k^2+2k)+1, which is odd.",
      "Square 2k+1 and check whether the final form is 2m or 2m+1."
    ),
    proofChoice(
      "y12e2-proof-contr-g4",
      "A fraction is assumed to be in lowest terms, but the argument shows both numerator and denominator are even. What is the contradiction?",
      "A",
      [
        "The fraction has a common factor of 2",
        "The denominator is zero",
        "The numerator is larger than the denominator",
        "The fraction is negative",
      ],
      "If both numerator and denominator are even, they share factor 2, contradicting lowest terms.",
      "Lowest terms means the numerator and denominator share no factor greater than 1."
    ),
  ],
  independentPractice: [
    proofChoice(
      "y12e2-proof-contr-i1",
      "For a contradiction argument that no integer is both even and odd, which assumption is negated?",
      "C",
      [
        "Every integer is positive",
        "Every odd integer is prime",
        "There exists an integer that is both even and odd",
        "There are no even integers",
      ],
      "To contradict 'no integer is both even and odd', assume there exists one integer with both properties."
    ),
    proofTyped(
      "y12e2-proof-contr-i2",
      "If $p=3m$, type the coefficient of $m^2$ in $p^2$.",
      "p=3m",
      "9",
      [],
      "Squaring p=3m gives p^2=9m^2, so the coefficient of m^2 is 9."
    ),
    proofChoice(
      "y12e2-proof-contr-i3",
      "In the finite-primes contradiction, $N=p_1p_2\\cdots p_n+1$. What remainder does N leave when divided by any listed prime $p_i$?",
      "D",
      ["0", "$p_i$", "$n$", "1"],
      "The product p1p2...pn is divisible by pi, so adding 1 leaves remainder 1."
    ),
    proofTyped(
      "y12e2-proof-contr-i4",
      "If $n=2k+1$, type the constant term in $n^2=4k^2+4k+\\square$.",
      "n^2=(2k+1)^2",
      "1",
      [],
      "(2k+1)^2=4k^2+4k+1, so the constant term is 1.",
      "Use (a+b)^2=a^2+2ab+b^2."
    ),
    proofChoice(
      "y12e2-proof-contr-i5",
      "Which final statement is valid after a contradiction has been reached from assuming '$S$ is false'?",
      "B",
      [
        "$S$ is sometimes true",
        "$S$ must be true",
        "Both $S$ and not $S$ are true",
        "No conclusion can be made",
      ],
      "If assuming not S leads to an impossibility, then not S is false and S must be true."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Assuming the statement itself instead of its negation.",
      fix: "Start with the opposite of the target conclusion, then push that assumption to an impossible result.",
    },
    {
      mistake: "Calling any surprising result a contradiction.",
      fix: "Name the exact violated condition, such as lowest terms, parity, divisibility, or a given assumption.",
    },
    {
      mistake: "Writing the whole proof as a typed answer.",
      fix: "For Nova practice, answer the requested checkpoint: method choice, divisor, parity, remainder, or conclusion.",
    },
    {
      mistake: "Forgetting that p and q in an irrationality proof are chosen in lowest terms.",
      fix: "The contradiction works because showing both p and q have the same factor violates that setup.",
    },
  ],
  masteryQuiz: [
    proofChoice(
      "y12e2-proof-contr-m1",
      "Which method most naturally fits the statement '$\\sqrt{5}$ is irrational'?",
      "A",
      ["Proof by contradiction", "Graph sketching", "Numerical approximation", "Differentiation"],
      "Irrationality arguments commonly begin by assuming a lowest-terms rational form and deriving a divisor contradiction."
    ),
    proofTyped(
      "y12e2-proof-contr-m2",
      "In a sqrt(3) contradiction, $p^2=3q^2$. Type the divisor forced on $p^2$.",
      "p^2=3q^2",
      "3",
      [],
      "Since p^2 equals 3 times q^2, p^2 is divisible by 3."
    ),
    proofChoice(
      "y12e2-proof-contr-m3",
      "If the assumption says $p/q$ is in lowest terms, which outcome creates the contradiction?",
      "C",
      [
        "p is positive",
        "q is positive",
        "p and q have a common factor greater than 1",
        "p and q are different numbers",
      ],
      "Lowest terms means the greatest common divisor is 1, so any shared factor greater than 1 contradicts it."
    ),
    proofTyped(
      "y12e2-proof-contr-m4",
      "Assume $n$ is odd. Type the parity of $n^2+1$.",
      "n=2k+1",
      "even",
      ["Even", "EVEN"],
      "Odd squared is odd; adding 1 gives an even number."
    ),
    proofChoice(
      "y12e2-proof-contr-m5",
      "A contradiction proof assumes '$n$ is odd' and derives '$n$ is even'. What has been contradicted?",
      "A",
      [
        "The assumed parity of n",
        "The definition of a square",
        "The value of k",
        "The existence of integers",
      ],
      "The derived even conclusion conflicts directly with the assumption that n is odd."
    ),
    proofTyped(
      "y12e2-proof-contr-m6",
      "If $a=5r$, type the coefficient of $r^2$ in $a^2$.",
      "a=5r",
      "25",
      [],
      "Squaring a=5r gives a^2=25r^2, so the coefficient is 25."
    ),
    proofChoice(
      "y12e2-proof-contr-m7",
      "In a contradiction proof, what should be checked immediately after assuming the negation?",
      "D",
      [
        "Whether the final answer is rounded",
        "Whether a diagram is needed",
        "Whether the result is aesthetically simple",
        "Which given condition or definition the assumption can be combined with",
      ],
      "The negated assumption only becomes useful when combined with definitions or given conditions that force consequences."
    ),
    proofTyped(
      "y12e2-proof-contr-m8",
      "For $N=p_1p_2\\cdots p_n+1$, type the remainder when N is divided by $p_3$.",
      "N=p_1p_2\\cdots p_n+1",
      "1",
      [],
      "The product includes p3, so it is divisible by p3. Adding 1 gives remainder 1."
    ),
    proofChoice(
      "y12e2-proof-contr-m9",
      "Which option identifies a genuine contradiction?",
      "B",
      [
        "A number is large",
        "A lowest-terms fraction has numerator and denominator both divisible by 3",
        "A square number is positive",
        "An integer is written as 2k",
      ],
      "A lowest-terms fraction cannot have numerator and denominator sharing factor 3."
    ),
    proofTyped(
      "y12e2-proof-contr-m10",
      "Assume an integer is both even and odd. If $n=2a=2b+1$, type the parity of $2a-2b$.",
      "2a=2b+1",
      "odd",
      ["Odd", "ODD"],
      "Rearranging gives 2a-2b=1, which is odd. The left side is also a multiple of 2, creating the contradiction."
    ),
  ],
};

const contrapositiveLesson: Partial<ExplicitLesson> = {
  description:
    "Use the logically equivalent contrapositive of a conditional statement to make parity, divisibility and rationality arguments easier to complete.",
  learningIntention:
    "Convert P implies Q into not Q implies not P and complete exact proof checkpoints from the contrapositive form.",
  successCriteria: [
    "Identify the hypothesis P and conclusion Q in a conditional statement.",
    "Choose the correct contrapositive form not Q implies not P.",
    "Complete exact parity or divisibility steps in the contrapositive argument.",
    "Recognise that proving the contrapositive proves the original conditional.",
  ],
  teaching: {
    paragraphs: [
      "The contrapositive of 'if P then Q' is 'if not Q then not P'. These two statements are logically equivalent, so proving the contrapositive proves the original.",
      "Contrapositive proof is often cleaner when the original conclusion is awkward but its negation has a simple algebraic form. For parity, 'not odd' means even and 'not divisible by 3' means a remainder of 1 or 2.",
      "Do not confuse the contrapositive with the converse. The converse is 'if Q then P', which is generally not equivalent to the original.",
      "In marked-safe practice, students choose the correct contrapositive or compute a specific algebraic consequence rather than writing a full proof paragraph.",
    ],
    latexBlocks: [
      "P\\Rightarrow Q\\quad\\text{is equivalent to}\\quad \\neg Q\\Rightarrow \\neg P",
      "\\text{Original: }n^2\\text{ odd}\\Rightarrow n\\text{ odd}",
      "\\text{Contrapositive: }n\\text{ even}\\Rightarrow n^2\\text{ even}",
    ],
  },
  workedExamples: [
    {
      title: "Odd square implies odd base",
      questionLatex: "\\text{If }n^2\\text{ is odd, then }n\\text{ is odd.}",
      steps: [
        {
          explanation:
            "Use the contrapositive: if n is not odd, then n^2 is not odd. For integers, not odd means even.",
          latex: "n\\text{ even}\\Rightarrow n^2\\text{ even}",
        },
        {
          explanation:
            "Write n = 2k for some integer k and square it.",
          latex: "n^2=(2k)^2=4k^2=2(2k^2)",
        },
        {
          explanation:
            "The square is even, so the contrapositive is true. Therefore the original conditional is true.",
        },
      ],
      finalAnswerLatex: "n^2\\text{ odd}\\Rightarrow n\\text{ odd}",
    },
    {
      title: "Divisibility by 3",
      questionLatex: "\\text{If }n^2\\text{ is divisible by }3,\\text{ then }n\\text{ is divisible by }3.",
      steps: [
        {
          explanation:
            "Use the contrapositive: if n is not divisible by 3, then n^2 is not divisible by 3.",
          latex: "n\\equiv 1\\text{ or }2\\pmod 3",
        },
        {
          explanation:
            "Square the possible residues. Both give remainder 1 modulo 3.",
          latex: "1^2\\equiv 1\\pmod3,\\quad 2^2\\equiv 4\\equiv1\\pmod3",
        },
        {
          explanation:
            "So n^2 is not divisible by 3. The contrapositive proves the original statement.",
        },
      ],
      finalAnswerLatex: "3\\mid n^2\\Rightarrow 3\\mid n",
    },
    {
      title: "Irrational product statement",
      questionLatex: "\\text{If }xy\\text{ is irrational, then at least one of }x,y\\text{ is irrational.}",
      steps: [
        {
          explanation:
            "The contrapositive is: if neither x nor y is irrational, then xy is not irrational. That means if x and y are rational, then xy is rational.",
        },
        {
          explanation:
            "Write x=a/b and y=c/d with non-zero denominators. Their product is ac/bd, a ratio of integers.",
          latex: "xy=\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{ac}{bd}",
        },
        {
          explanation:
            "Since bd is non-zero, xy is rational. The contrapositive proves the original statement.",
        },
      ],
      finalAnswerLatex: "xy\\text{ irrational}\\Rightarrow x\\text{ irrational or }y\\text{ irrational}",
    },
  ],
  guidedPractice: [
    proofChoice(
      "y12e2-proof-contra-g1",
      "What is the contrapositive of 'if P then Q'?",
      "C",
      ["If Q then P", "If not P then not Q", "If not Q then not P", "P and Q are both false"],
      "The contrapositive reverses the direction and negates both parts: not Q implies not P."
    ),
    proofChoice(
      "y12e2-proof-contra-g2",
      "Choose the contrapositive of 'if n is even, then n^2 is even'.",
      "A",
      [
        "If n^2 is odd, then n is odd",
        "If n^2 is even, then n is even",
        "If n is odd, then n^2 is odd",
        "If n is even, then n^2 is odd",
      ],
      "The conclusion 'n^2 is even' is negated to 'n^2 is odd', and the hypothesis is negated to 'n is odd'."
    ),
    proofTyped(
      "y12e2-proof-contra-g3",
      "In the contrapositive step, if $n=2k$, type the coefficient of $k^2$ in $n^2$.",
      "n=2k",
      "4",
      [],
      "Squaring n=2k gives n^2=4k^2, so the coefficient is 4."
    ),
    proofTyped(
      "y12e2-proof-contra-g4",
      "If $n$ is even, type the parity of $n^2$.",
      "n=2k",
      "even",
      ["Even", "EVEN"],
      "n=2k gives n^2=4k^2=2(2k^2), so n^2 is even."
    ),
  ],
  independentPractice: [
    proofChoice(
      "y12e2-proof-contra-i1",
      "Which statement is the converse, not the contrapositive, of 'if P then Q'?",
      "A",
      ["If Q then P", "If not Q then not P", "If P then not Q", "If not P then Q"],
      "The converse simply reverses the direction to Q implies P. It is not generally equivalent to the original."
    ),
    proofChoice(
      "y12e2-proof-contra-i2",
      "For 'if $n^2$ is divisible by 5, then n is divisible by 5', which contrapositive is correct?",
      "D",
      [
        "If n is divisible by 5, then $n^2$ is divisible by 5",
        "If n is not divisible by 5, then $n^2$ is divisible by 5",
        "If $n^2$ is not divisible by 5, then n is not divisible by 5",
        "If n is not divisible by 5, then $n^2$ is not divisible by 5",
      ],
      "Negate the conclusion first and make it the new hypothesis: n not divisible by 5 implies n^2 not divisible by 5."
    ),
    proofTyped(
      "y12e2-proof-contra-i3",
      "If $n\\equiv 2\\pmod 3$, type the remainder of $n^2$ modulo 3.",
      "n\\equiv2\\pmod3",
      "1",
      [],
      "2^2=4, and 4 leaves remainder 1 modulo 3."
    ),
    proofTyped(
      "y12e2-proof-contra-i4",
      "If $x=a/b$ and $y=c/d$, type the denominator in the product $xy$.",
      "xy=\\frac{a}{b}\\cdot\\frac{c}{d}",
      "bd",
      ["b d", "d b", "db"],
      "Multiplying fractions gives xy=ac/bd, so the denominator is bd."
    ),
    proofChoice(
      "y12e2-proof-contra-i5",
      "When is contrapositive proof usually a good choice?",
      "B",
      [
        "When the converse is easier",
        "When the negation of the conclusion has a simple algebraic form",
        "Only when the answer is numeric",
        "Only when a diagram is provided",
      ],
      "Contrapositive proof is useful when not Q is easier to express and combine with algebra than Q itself."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the converse instead of the contrapositive.",
      fix: "The contrapositive of P implies Q is not Q implies not P, not Q implies P.",
    },
    {
      mistake: "Negating only one side of the conditional.",
      fix: "Both parts are negated and the direction reverses.",
    },
    {
      mistake: "Forgetting to link back to the original statement.",
      fix: "Once the contrapositive is proved, state that the original conditional follows because they are equivalent.",
    },
    {
      mistake: "Choosing contrapositive when a direct proof is already simpler.",
      fix: "Use contrapositive when the negated conclusion gives a clean form such as even, odd, rational, or not divisible.",
    },
  ],
  masteryQuiz: [
    proofChoice(
      "y12e2-proof-contra-m1",
      "Choose the contrapositive of 'if a product is irrational, then at least one factor is irrational'.",
      "C",
      [
        "If at least one factor is irrational, then the product is irrational",
        "If the product is rational, then both factors are rational",
        "If both factors are rational, then the product is rational",
        "If both factors are irrational, then the product is irrational",
      ],
      "Negating 'at least one factor is irrational' gives 'both factors are rational', and negating 'product irrational' gives 'product rational'."
    ),
    proofTyped(
      "y12e2-proof-contra-m2",
      "If $n=2k+1$, type the parity of $n$.",
      "n=2k+1",
      "odd",
      ["Odd", "ODD"],
      "The form 2k+1 is the standard form of an odd integer."
    ),
    proofChoice(
      "y12e2-proof-contra-m3",
      "Which proof technique targets a conditional by proving an equivalent reversed-and-negated statement?",
      "B",
      ["Contradiction", "Contrapositive", "Mathematical induction", "Completing the square"],
      "A contrapositive proof proves not Q implies not P, which is equivalent to P implies Q."
    ),
    proofTyped(
      "y12e2-proof-contra-m4",
      "If $n\\equiv 4\\pmod 5$, type the remainder of $n^2$ modulo 5.",
      "n\\equiv4\\pmod5",
      "1",
      [],
      "4^2=16, and 16 leaves remainder 1 modulo 5."
    ),
    proofChoice(
      "y12e2-proof-contra-m5",
      "For 'if $n^2$ is odd, then n is odd', which starting point belongs to the contrapositive?",
      "A",
      ["Assume n is even", "Assume n is odd", "Assume n^2 is odd", "Assume n^2 is prime"],
      "The contrapositive starts with the negation of the conclusion: n is not odd, so n is even."
    ),
    proofTyped(
      "y12e2-proof-contra-m6",
      "If $n=3k$, type the coefficient of $k^2$ in $n^2$.",
      "n=3k",
      "9",
      [],
      "Squaring n=3k gives n^2=9k^2."
    ),
    proofChoice(
      "y12e2-proof-contra-m7",
      "Which statement is logically equivalent to 'if P then Q'?",
      "D",
      ["If Q then P", "If not P then not Q", "P if and only if Q", "If not Q then not P"],
      "The contrapositive is logically equivalent to the original conditional."
    ),
    proofTyped(
      "y12e2-proof-contra-m8",
      "If rational $x=a/b$ and rational $y=c/d$ have non-zero denominators, type the numerator of $xy$.",
      "xy=\\frac{a}{b}\\cdot\\frac{c}{d}",
      "ac",
      ["a c", "ca", "c a"],
      "The product is ac/bd, so the numerator is ac."
    ),
    proofChoice(
      "y12e2-proof-contra-m9",
      "What conclusion is justified after proving the contrapositive of a statement?",
      "A",
      [
        "The original conditional is true",
        "Only the converse is true",
        "The original conditional is false",
        "No conditional statement has been proved",
      ],
      "A statement and its contrapositive are equivalent, so proving one proves the other."
    ),
    proofTyped(
      "y12e2-proof-contra-m10",
      "For an integer not divisible by 3, the possible remainders modulo 3 are 1 and what?",
      "2",
      "2",
      [],
      "Integers modulo 3 have remainders 0, 1, or 2. Not divisible by 3 excludes remainder 0."
    ),
  ],
};

const inequalitiesLesson: Partial<ExplicitLesson> = {
  description:
    "Establish inequalities by rewriting expressions as non-negative squares, checking discriminants, and identifying exact equality conditions.",
  learningIntention:
    "Use algebraic structure to verify inequalities through markable coefficients, discriminants and equality cases.",
  successCriteria: [
    "Recognise when completing the square creates a non-negative form.",
    "Use a discriminant condition to classify a quadratic as always non-negative.",
    "Find the equality condition for a square-based inequality.",
    "Select the algebraic move that supports an inequality argument.",
  ],
  teaching: {
    paragraphs: [
      "Many Extension 2 inequalities are proved by moving all terms to one side and rewriting the result in a form that is clearly non-negative.",
      "A square is always non-negative for real variables. If an expression becomes (x-a)^2 plus a positive constant, the expression is always positive.",
      "For a quadratic ax^2+bx+c with a>0, a negative discriminant means the graph has no real x-intercepts and stays above the x-axis.",
      "Equality conditions matter. In square-based proofs, equality occurs when the square term is zero.",
    ],
    latexBlocks: [
      "(a-b)^2\\ge 0\\Rightarrow a^2+b^2\\ge 2ab",
      "x^2+6x+10=(x+3)^2+1>0",
      "\\Delta=b^2-4ac<0\\text{ and }a>0\\Rightarrow ax^2+bx+c>0",
    ],
  },
  workedExamples: [
    {
      title: "Square form for a basic inequality",
      questionLatex: "\\text{Show why }a^2+b^2\\ge 2ab\\text{ for real }a,b.",
      steps: [
        {
          explanation:
            "Move the right side to the left so the target becomes a non-negative expression.",
          latex: "a^2+b^2-2ab\\ge0",
        },
        {
          explanation:
            "Recognise the left side as a perfect square.",
          latex: "a^2-2ab+b^2=(a-b)^2",
        },
        {
          explanation:
            "A real square is always non-negative, so the inequality follows. Equality occurs when a-b=0.",
          latex: "(a-b)^2\\ge0,\\quad a=b",
        },
      ],
      finalAnswerLatex: "a^2+b^2\\ge2ab\\text{ with equality when }a=b",
    },
    {
      title: "Completing the square",
      questionLatex: "\\text{Establish that }x^2-4x+7>0\\text{ for all real }x.",
      steps: [
        {
          explanation:
            "Complete the square by halving -4 to get -2, then adding and subtracting 4.",
          latex: "x^2-4x+7=(x-2)^2+3",
        },
        {
          explanation:
            "The square term is at least 0, so the whole expression is at least 3.",
          latex: "(x-2)^2\\ge0\\Rightarrow (x-2)^2+3\\ge3",
        },
        {
          explanation:
            "Since 3 is positive, the original expression is positive for every real x.",
        },
      ],
      finalAnswerLatex: "x^2-4x+7>0",
    },
    {
      title: "Discriminant condition",
      questionLatex: "\\text{Use the discriminant to classify }2x^2+4x+5.",
      steps: [
        {
          explanation:
            "Compute the discriminant Delta = b^2 - 4ac.",
          latex: "\\Delta=4^2-4(2)(5)=16-40=-24",
        },
        {
          explanation:
            "The discriminant is negative, so the quadratic has no real x-intercepts.",
        },
        {
          explanation:
            "Since the leading coefficient is positive, the parabola opens upward and stays above the x-axis.",
        },
      ],
      finalAnswerLatex: "2x^2+4x+5>0\\text{ for all real }x",
    },
  ],
  guidedPractice: [
    proofChoice(
      "y12e2-proof-ineq-g1",
      "Which expression is always non-negative for real x?",
      "B",
      ["$x-3$", "$(x-3)^2$", "$-x^2-1$", "$1/x$"],
      "A square such as (x-3)^2 is always at least 0 for real x.",
      "Look for a square with no negative multiplier."
    ),
    proofTyped(
      "y12e2-proof-ineq-g2",
      "Complete the square: $x^2+6x+10=(x+3)^2+c$. Type c.",
      "x^2+6x+10=(x+3)^2+c",
      "1",
      [],
      "(x+3)^2=x^2+6x+9, so c must be 1 to make x^2+6x+10."
    ),
    proofTyped(
      "y12e2-proof-ineq-g3",
      "For $(a-b)^2=a^2-2ab+b^2$, type the coefficient of $ab$.",
      "(a-b)^2=a^2-2ab+b^2",
      "-2",
      ["-2", "\u22122"],
      "Expanding (a-b)^2 gives a^2-2ab+b^2, so the coefficient of ab is -2."
    ),
    proofTyped(
      "y12e2-proof-ineq-g4",
      "For $a^2+b^2\\ge 2ab$, equality occurs when a equals what variable?",
      "(a-b)^2\\ge0",
      "b",
      ["B"],
      "Equality occurs when (a-b)^2=0, so a-b=0 and a=b."
    ),
  ],
  independentPractice: [
    proofTyped(
      "y12e2-proof-ineq-i1",
      "Complete the square: $x^2-8x+20=(x-4)^2+c$. Type c.",
      "x^2-8x+20=(x-4)^2+c",
      "4",
      [],
      "(x-4)^2=x^2-8x+16, so c=4."
    ),
    proofTyped(
      "y12e2-proof-ineq-i2",
      "For $x^2+2x+5$, type the discriminant.",
      "\\Delta=b^2-4ac",
      "-16",
      ["-16", "\u221216"],
      "Here a=1, b=2, c=5. Delta=2^2-4(1)(5)=4-20=-16."
    ),
    proofChoice(
      "y12e2-proof-ineq-i3",
      "Which first move best supports $x^2-10x+26\\ge1$?",
      "A",
      [
        "Rewrite the left side as $(x-5)^2+1$",
        "Differentiate the expression",
        "Assume x is an integer",
        "Divide by x",
      ],
      "Completing the square gives x^2-10x+26=(x-5)^2+1, which is at least 1."
    ),
    proofTyped(
      "y12e2-proof-ineq-i4",
      "For $x^2-10x+26=(x-5)^2+c$, type c.",
      "x^2-10x+26=(x-5)^2+c",
      "1",
      [],
      "(x-5)^2=x^2-10x+25, so c=1."
    ),
    proofTyped(
      "y12e2-proof-ineq-i5",
      "For $2x^2+4x+5$, type the discriminant.",
      "\\Delta=b^2-4ac",
      "-24",
      ["-24", "\u221224"],
      "Delta=4^2-4(2)(5)=16-40=-24, so the quadratic has no real roots."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Completing the square but losing the constant adjustment.",
      fix: "Expand the square you wrote and compare constants to find the leftover term.",
    },
    {
      mistake: "Treating a negative discriminant alone as enough.",
      fix: "Also check the leading coefficient. If a>0 and Delta<0, the quadratic is always positive.",
    },
    {
      mistake: "Forgetting the equality condition.",
      fix: "Set the square term equal to zero to find when equality occurs.",
    },
    {
      mistake: "Asking for or writing a full symbolic proof in a typed answer.",
      fix: "Use exact checkpoints such as a coefficient, discriminant, constant, or equality value.",
    },
  ],
  masteryQuiz: [
    proofChoice(
      "y12e2-proof-ineq-m1",
      "Which method is most direct for $x^2+12x+40\\ge4$?",
      "C",
      ["Contrapositive", "Prime factorisation", "Completing the square", "Vector projection"],
      "Completing the square gives x^2+12x+40=(x+6)^2+4, which is at least 4."
    ),
    proofTyped(
      "y12e2-proof-ineq-m2",
      "Complete the square: $x^2+12x+40=(x+6)^2+c$. Type c.",
      "x^2+12x+40=(x+6)^2+c",
      "4",
      [],
      "(x+6)^2=x^2+12x+36, so c=4."
    ),
    proofTyped(
      "y12e2-proof-ineq-m3",
      "For $3x^2+6x+4$, type the discriminant.",
      "\\Delta=b^2-4ac",
      "-12",
      ["-12", "\u221212"],
      "Delta=6^2-4(3)(4)=36-48=-12."
    ),
    proofChoice(
      "y12e2-proof-ineq-m4",
      "If a quadratic has $a>0$ and $\\Delta<0$, what can be concluded?",
      "D",
      [
        "It has two real roots",
        "It is sometimes negative and sometimes positive",
        "It is always zero",
        "It is always positive for real x",
      ],
      "With a>0 the parabola opens upward, and Delta<0 means it never crosses the x-axis, so it is always positive."
    ),
    proofTyped(
      "y12e2-proof-ineq-m5",
      "For $(x-7)^2\\ge0$, equality occurs at $x=$ what?",
      "(x-7)^2\\ge0",
      "7",
      [],
      "A square equals zero only when its base is zero, so x-7=0 and x=7."
    ),
    proofTyped(
      "y12e2-proof-ineq-m6",
      "For $a^2+b^2-2ab=(a-b)^2$, type the coefficient of $b^2$.",
      "a^2+b^2-2ab=(a-b)^2",
      "1",
      [],
      "The coefficient of b^2 is 1 in a^2+b^2-2ab."
    ),
    proofChoice(
      "y12e2-proof-ineq-m7",
      "Which expression certifies $x^2-2x+2>0$?",
      "A",
      ["$(x-1)^2+1$", "$(x-1)^2-1$", "$(x+1)^2+2x$", "$x(x-2)$"],
      "x^2-2x+2=(x-1)^2+1, which is greater than 0 for every real x."
    ),
    proofTyped(
      "y12e2-proof-ineq-m8",
      "For $x^2-2x+2=(x-1)^2+c$, type c.",
      "x^2-2x+2=(x-1)^2+c",
      "1",
      [],
      "(x-1)^2=x^2-2x+1, so c=1."
    ),
    proofTyped(
      "y12e2-proof-ineq-m9",
      "For $x^2+1/x^2\\ge2$ with positive x, equality occurs at $x=$ what?",
      "x^2+\\frac{1}{x^2}\\ge2",
      "1",
      [],
      "Let t=x^2>0. The form t+1/t has equality at t=1, so x=1 for positive x."
    ),
    proofChoice(
      "y12e2-proof-ineq-m10",
      "Which is the most marking-safe answer type for an algebraic inequality practice question?",
      "B",
      [
        "A full written proof paragraph",
        "A discriminant value or equality condition",
        "A hand-drawn sketch",
        "An unrestricted free-text derivation",
      ],
      "A discriminant value or equality condition is exact and auto-markable, while full proof paragraphs need human or AI marking."
    ),
  ],
};

// ─── Lesson 4: Proof by Mathematical Induction ───────────────────────────────

const inductionLesson: Partial<ExplicitLesson> = {
  description:
    "Prove divisibility, inequality and summation results by induction: verify the base case, state the inductive hypothesis, and complete the algebraic step that closes the argument.",
  learningIntention:
    "Apply the three-part structure of mathematical induction (base case, hypothesis, inductive step) to divisibility and summation proofs, and complete exact checkpoints at each stage.",
  successCriteria: [
    "Verify the base case by direct substitution.",
    "Write the correct inductive hypothesis P(k).",
    "Complete the algebraic manipulation that proves P(k+1) from P(k).",
    "State the conclusion that the result holds for all positive integers n.",
  ],
  teaching: {
    paragraphs: [
      "Mathematical induction proves a statement P(n) for all integers n ≥ 1 in three steps. First, verify P(1) directly. Second, assume P(k) is true for some integer k ≥ 1. Third, prove P(k+1) follows from P(k).",
      "For summation proofs, the key step is writing the (k+1)-th partial sum as the k-th partial sum plus the next term, then using the hypothesis to simplify.",
      "For divisibility proofs of the form 'n divides f(n)', express f(k+1) in terms of f(k), extract the inductive hypothesis, and show the remainder is also divisible.",
      "The conclusion must state that by mathematical induction, P(n) holds for all positive integers n (or whatever domain was specified).",
    ],
    latexBlocks: [
      "\\textbf{Step 1:}\\;P(1)\\text{ is verified directly.}",
      "\\textbf{Step 2:}\\;\\text{Assume }P(k):\\;f(k)=\\text{[formula in }k\\text{]}",
      "\\textbf{Step 3:}\\;\\text{Prove }P(k+1):\\;f(k+1)=f(k)+a_{k+1}=\\ldots",
      "\\text{By induction, }P(n)\\text{ holds for all integers }n\\ge1.",
    ],
  },
  workedExamples: [
    {
      title: "Summation by induction",
      questionLatex:
        "\\text{Prove }1+2+3+\\cdots+n=\\frac{n(n+1)}{2}\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation: "Base case n = 1.",
          latex: "\\text{LHS}=1,\\quad \\text{RHS}=\\frac{1\\cdot2}{2}=1.\\;\\checkmark",
        },
        {
          explanation: "Assume true for n = k: inductive hypothesis.",
          latex: "1+2+\\cdots+k=\\frac{k(k+1)}{2}",
        },
        {
          explanation: "Prove for n = k+1: write the (k+1)-th sum as hypothesis plus next term.",
          latex:
            "1+2+\\cdots+k+(k+1)=\\frac{k(k+1)}{2}+(k+1)=\\frac{(k+1)(k+2)}{2}",
        },
        {
          explanation: "This matches the formula with n = k+1.",
          latex:
            "\\frac{(k+1)((k+1)+1)}{2}=\\frac{(k+1)(k+2)}{2}\\;\\checkmark",
        },
      ],
      finalAnswerLatex:
        "\\text{By induction, }1+2+\\cdots+n=\\frac{n(n+1)}{2}\\text{ for all }n\\ge1.",
    },
    {
      title: "Divisibility by induction",
      questionLatex:
        "\\text{Prove }3\\mid (4^n-1)\\text{ for all }n\\ge1.",
      steps: [
        {
          explanation: "Base case n = 1: 4¹ − 1 = 3, which is divisible by 3.",
          latex: "4^1-1=3=3\\times1.\\;\\checkmark",
        },
        {
          explanation: "Assume 3 divides 4^k − 1, so 4^k = 3m + 1 for some integer m.",
          latex: "4^k - 1 = 3m \\implies 4^k = 3m+1",
        },
        {
          explanation: "Write 4^{k+1} − 1 using the hypothesis.",
          latex:
            "4^{k+1}-1=4\\cdot4^k-1=4(3m+1)-1=12m+3=3(4m+1)",
        },
        {
          explanation: "Since 3(4m+1) is divisible by 3, P(k+1) holds.",
          latex: "3\\mid(4^{k+1}-1).\\;\\checkmark",
        },
      ],
      finalAnswerLatex:
        "\\text{By induction, }3\\mid(4^n-1)\\text{ for all }n\\ge1.",
    },
  ],
  guidedPractice: [
    proofTyped(
      "y12e2-proof-ind-g1",
      "For the statement $1+2+\\cdots+n=\\frac{n(n+1)}{2}$, what is the LHS when $n=1$?",
      "P(1):\\;1+2+\\cdots+1",
      "1",
      [],
      "When n = 1 there is only one term: LHS = 1. RHS = 1(2)/2 = 1. ✓",
      "Substitute n = 1 directly."
    ),
    proofChoice(
      "y12e2-proof-ind-g2",
      "In an induction proof for $n\\ge1$, the inductive hypothesis assumes the statement is true for:",
      "B",
      ["All integers", "Some fixed integer $k\\ge1$", "All primes", "The case $n=k+1$ only"],
      "The hypothesis assumes P(k) for a fixed but arbitrary k ≥ 1. The goal is to prove P(k+1) from P(k)."
    ),
    proofTyped(
      "y12e2-proof-ind-g3",
      "For the sum proof, what term is added to the $k$-th partial sum to obtain the $(k+1)$-th sum?",
      "S_{k+1}=S_k + a_{k+1}",
      "k+1",
      ["(k+1)"],
      "The (k+1)-th term is k+1. So S_{k+1} = S_k + (k+1).",
      "Identify the next term in the sequence 1, 2, 3, …"
    ),
    proofChoice(
      "y12e2-proof-ind-g4",
      "After the inductive step is complete, the final conclusion must state the result holds:",
      "C",
      [
        "For $n=k$ only",
        "For one arbitrary $k$",
        "For all integers $n\\ge1$",
        "For all real $n$",
      ],
      "The conclusion closes the induction: the result holds for all integers n ≥ 1 (or the domain stated)."
    ),
  ],
  independentPractice: [
    proofTyped(
      "y12e2-proof-ind-i1",
      "For $P(n):\\;3\\mid(4^n-1)$, verify the base case by computing $4^1-1$.",
      "4^1-1=\\,?",
      "3",
      [],
      "4¹ − 1 = 3. Since 3 divides 3, P(1) holds.",
      "Substitute n = 1 and check divisibility by 3."
    ),
    proofTyped(
      "y12e2-proof-ind-i2",
      "Inductive hypothesis: $4^k=3m+1$ for some integer $m$. Write $4^{k+1}$ in terms of $m$.",
      "4^{k+1}=4\\cdot4^k",
      "12m+4",
      ["4(3m+1)"],
      "4^{k+1} = 4 × (3m+1) = 12m + 4.",
      "Multiply 4^k = 3m+1 by 4."
    ),
    proofChoice(
      "y12e2-proof-ind-i3",
      "After finding $4^{k+1}-1=12m+3=3(4m+1)$, what has been shown?",
      "A",
      [
        "$3\\mid(4^{k+1}-1)$, so $P(k+1)$ holds",
        "$4^{k+1}$ is prime",
        "The formula is only valid for small $m$",
        "The base case fails",
      ],
      "Expressing 4^{k+1}−1 as 3(4m+1) shows it is divisible by 3, confirming P(k+1)."
    ),
    proofTyped(
      "y12e2-proof-ind-i4",
      "For the sum $S_n=\\frac{n(n+1)}{2}$, write $S_{k+1}$ by adding the next term to $S_k$.",
      "S_{k+1}=S_k+(k+1)=\\frac{k(k+1)}{2}+(k+1)",
      "(k+1)(k+2)/2",
      ["\\frac{(k+1)(k+2)}{2}"],
      "Factoring: (k+1)(k/2 + 1) = (k+1)(k+2)/2.",
      "Factor out (k+1) from the two terms."
    ),
    proofChoice(
      "y12e2-proof-ind-i5",
      "In a divisibility induction, expressing $f(k+1)$ as $f(k)+g(k)$ is useful because:",
      "B",
      [
        "It avoids using the inductive hypothesis",
        "The hypothesis gives divisibility of $f(k)$, so divisibility of $f(k+1)$ follows if $g(k)$ is also divisible",
        "It shows $f$ is always positive",
        "It replaces the base case",
      ],
      "The inductive hypothesis controls f(k). If g(k) shares the same divisor, then f(k+1) = f(k) + g(k) is divisible too."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Proving the base case after the inductive step.",
      fix: "Always verify P(1) first. If P(1) fails the whole proof collapses, so check it before investing effort in the step.",
    },
    {
      mistake: "Using P(k+1) inside the inductive step (circular reasoning).",
      fix: "The hypothesis is P(k). The goal is P(k+1). Derive P(k+1) from P(k) — never assume P(k+1) to prove P(k+1).",
    },
    {
      mistake: "Forgetting to add the (k+1)-th term in a summation proof.",
      fix: "S_{k+1} = S_k + a_{k+1}. Write out the extra term explicitly before applying the hypothesis.",
    },
    {
      mistake: "Stating the wrong domain in the conclusion.",
      fix: "Match the domain to the question: 'for all integers n ≥ 1' or 'for all positive integers n'. Check the base case matches too.",
    },
  ],
  masteryQuiz: [
    proofTyped(
      "y12e2-proof-ind-m1",
      "For $P(1)$ in the sum $1+2+\\cdots+n=\\frac{n(n+1)}{2}$, type the RHS value.",
      "\\frac{1\\cdot2}{2}",
      "1",
      [],
      "RHS = 1 × 2 / 2 = 1. LHS = 1. Base case holds.",
      "Substitute n = 1 into the formula n(n+1)/2."
    ),
    proofChoice(
      "y12e2-proof-ind-m2",
      "The inductive hypothesis for $3\\mid(4^n-1)$ states:",
      "A",
      [
        "$3\\mid(4^k-1)$ for some integer $k\\ge1$",
        "$3\\mid(4^{k+1}-1)$",
        "$4^k=3$ for all $k$",
        "$k$ is divisible by 3",
      ],
      "The hypothesis assumes P(k): 3 divides 4^k − 1. The step proves P(k+1)."
    ),
    proofTyped(
      "y12e2-proof-ind-m3",
      "If $4^k-1=3m$, compute $4^{k+1}-1-4(4^k-1)$.",
      "4^{k+1}-1-4(4^k-1)",
      "3",
      [],
      "4^{k+1} − 1 − 4(4^k − 1) = 4·4^k − 1 − 4·4^k + 4 = 3.",
      "Expand and simplify; the 4·4^k terms cancel."
    ),
    proofChoice(
      "y12e2-proof-ind-m4",
      "For the sum $1^2+2^2+\\cdots+n^2=\\frac{n(n+1)(2n+1)}{6}$, the base case LHS at $n=1$ is:",
      "A",
      ["1", "6", "3", "2"],
      "LHS = 1² = 1. RHS = 1×2×3/6 = 1. ✓"
    ),
    proofTyped(
      "y12e2-proof-ind-m5",
      "Write $\\frac{k(k+1)}{2}+(k+1)$ as a single fraction.",
      "\\frac{k(k+1)}{2}+(k+1)",
      "(k+1)(k+2)/2",
      ["\\frac{(k+1)(k+2)}{2}"],
      "Factor out (k+1): (k+1)(k/2+1) = (k+1)(k+2)/2.",
      "Factor (k+1) from both terms."
    ),
    proofChoice(
      "y12e2-proof-ind-m6",
      "After proving the inductive step for all k ≥ 1, what additional assumption is needed for the conclusion?",
      "D",
      [
        "That k is even",
        "That k > 100",
        "That the formula has been verified by a computer",
        "None — the base case and step are sufficient",
      ],
      "Base case + inductive step is all that is needed. No extra assumption is required for the conclusion."
    ),
    proofTyped(
      "y12e2-proof-ind-m7",
      "For $P(n):\\;5\\mid(6^n-1)$, compute $6^1-1$.",
      "6^1-1",
      "5",
      [],
      "6¹ − 1 = 5. Since 5 divides 5, P(1) holds.",
      "Substitute n = 1."
    ),
    proofChoice(
      "y12e2-proof-ind-m8",
      "Which expression proves P(k+1) for $5\\mid(6^n-1)$ given $6^k-1=5m$?",
      "B",
      [
        "$6^{k+1}-1=5^{k+1}$",
        "$6^{k+1}-1=6(5m+1)-1=30m+5=5(6m+1)$",
        "$6^{k+1}=6^k+1$",
        "$6^{k+1}-1=6m+5$",
      ],
      "Write 6^{k+1} = 6·6^k = 6(5m+1), so 6^{k+1} − 1 = 30m + 5 = 5(6m+1). Divisible by 5."
    ),
    proofTyped(
      "y12e2-proof-ind-m9",
      "For $\\sum_{r=1}^n r = \\frac{n(n+1)}{2}$, type the $(k+1)$-th term of the sum.",
      "a_{k+1}",
      "k+1",
      ["(k+1)"],
      "The sequence is 1, 2, 3, …, k, k+1. The (k+1)-th term is k+1.",
      "Identify the term added when moving from n=k to n=k+1."
    ),
    proofChoice(
      "y12e2-proof-ind-m10",
      "Mathematical induction proves a statement P(n) is true:",
      "B",
      [
        "For one specific value $n=k$",
        "For all integers $n\\ge1$ (or the specified domain)",
        "Only when $n$ is prime",
        "Only for $n$ in the base case",
      ],
      "Induction establishes the result for every integer in the specified domain, not just one value."
    ),
  ],
};

export function year12Extension2ProofLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-2") return undefined;
  if (unit.slug !== "proof") return undefined;

  const base = { masteryPassMark: 0.8 };

  switch (lesson.slug) {
    case "proof-by-contradiction":
      return { ...base, ...contradictionLesson };
    case "proof-by-contrapositive":
      return { ...base, ...contrapositiveLesson };
    case "inequalities-algebraic-proof":
      return { ...base, ...inequalitiesLesson };
    case "proof-by-mathematical-induction":
      return { ...base, ...inductionLesson };
    default:
      return undefined;
  }
}
