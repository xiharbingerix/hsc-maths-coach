import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 11 Mathematics Extension",

  units: [
    {
      slug: "further-functions",
      title: "Further Work with Functions",
      startHref: "/course/year-11-extension/further-functions",
    },
    {
      slug: "polynomials",
      title: "Polynomials",
      startHref: "/course/year-11-extension/polynomials",
    },
    {
      slug: "further-trigonometry",
      title: "Further Trigonometry",
      startHref: "/course/year-11-extension/further-trigonometry",
    },
    {
      slug: "permutations-combinations",
      title: "Permutations and Combinations",
      startHref: "/course/year-11-extension/permutations-combinations",
    },
    {
      slug: "binomial-theorem",
      title: "The Binomial Theorem",
      startHref: "/course/year-11-extension/binomial-theorem",
    },
  ],

  questions: [
    {
      id: "y11ext-d5-composite-range",
      unitSlug: "further-functions",
      assessedUnitSlugs: ["polynomials"],
      difficulty: 5,
      targetMisconception:
        "Composes the functions mechanically but does not track the restricted domain through the quadratic transformation.",
      prompt:
        "Let $f(x)=x^2-4x+1$ with domain $x\\geq2$, and let $g(x)=f(x+3)$. Which statement about $g$ is correct?",
      choices: [
        {
          label: "A",
          text: "The domain is $x\\geq-1$ and the minimum value is $-3$.",
        },
        {
          label: "B",
          text: "The domain is $x\\geq2$ and the minimum value is $-3$.",
        },
        {
          label: "C",
          text: "The domain is $x\\geq-1$ and the minimum value is $1$.",
        },
        {
          label: "D",
          text: "The domain is all real $x$ and the minimum value is $-3$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "$f(x)=(x-2)^2-3$, so its minimum is $-3$ at input $2$. For $g(x)=f(x+3)$, the input to $f$ must satisfy $x+3\\geq2$, giving $x\\geq-1$. The same minimum occurs when $x+3=2$.",
    },
    {
      id: "y11ext-d5-polynomial-parameter-root",
      unitSlug: "polynomials",
      assessedUnitSlugs: ["further-functions"],
      difficulty: 5,
      targetMisconception:
        "Uses the factor theorem for one root but ignores that the second condition imposes a separate parameter constraint.",
      prompt:
        "The polynomial $P(x)=x^3+ax^2+bx-6$ has factors $(x-1)$ and $(x+2)$. Which values of $a$ and $b$ are forced?",
      choices: [
        { label: "A", text: "$a=4,\\ b=1$" },
        { label: "B", text: "$a=0,\\ b=5$" },
        { label: "C", text: "$a=-4,\\ b=-1$" },
        { label: "D", text: "$a=1,\\ b=4$" },
      ],
      correctAnswer: "A",
      explanation:
        "$P(1)=1+a+b-6=0$, so $a+b=5$. Also $P(-2)=-8+4a-2b-6=0$, so $2a-b=7$. Solving the simultaneous equations gives $a=4$ and $b=1$.",
    },
    {
      id: "y11ext-d5-trig-polynomial-roots",
      unitSlug: "further-trigonometry",
      assessedUnitSlugs: ["polynomials"],
      difficulty: 5,
      targetMisconception:
        "Solves the quadratic in sine but accepts extraneous roots outside the possible range or misses interval solutions.",
      prompt:
        "How many solutions does $2\\sin^2 x-\\sin x-1=0$ have for $0\\leq x\\leq2\\pi$?",
      choices: [
        { label: "A", text: "$2$" },
        { label: "B", text: "$3$" },
        { label: "C", text: "$4$" },
        { label: "D", text: "$1$" },
      ],
      correctAnswer: "B",
      explanation:
        "Factor as $(2\\sin x+1)(\\sin x-1)=0$. Thus $\\sin x=1$ gives $x=\\pi/2$, and $\\sin x=-1/2$ gives $x=7\\pi/6,11\\pi/6$. There are three solutions.",
    },
    {
      id: "y11ext-d5-counting-binomial-constraint",
      unitSlug: "permutations-combinations",
      assessedUnitSlugs: ["binomial-theorem"],
      difficulty: 5,
      targetMisconception:
        "Counts the choices but forgets that a selected term in the binomial expansion determines both the combinatorial coefficient and the power.",
      prompt:
        "A committee of 6 is chosen from 4 teachers and 6 students. Which expression counts committees with exactly 2 teachers?",
      choices: [
        {
          label: "A",
          text: "$\\binom{4}{2}\\binom{6}{4}$; committees with exactly 2 teachers.",
        },
        {
          label: "B",
          text: "$\\binom{4}{2}\\binom{6}{4}$; committees with exactly 2 students.",
        },
        {
          label: "C",
          text: "$\\binom{4}{4}\\binom{6}{2}$; committees with exactly 2 teachers.",
        },
        {
          label: "D",
          text: "$\\binom{10}{6}$; committees with exactly 2 teachers.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Choosing exactly 2 teachers means choosing $2$ from $4$ teachers and $4$ from $6$ students: $\\binom42\\binom64$. In a generating-function view, the $t^2s^4$ term represents 2 teachers and 4 students.",
    },
    {
      id: "y11ext-d5-binomial-middle-term",
      unitSlug: "binomial-theorem",
      assessedUnitSlugs: ["polynomials"],
      difficulty: 5,
      targetMisconception:
        "Finds the middle position but mishandles the negative term and the power needed for a constant term.",
      prompt:
        "What is the constant term in the expansion of $\\left(2x-\\dfrac{1}{x}\\right)^6$?",
      choices: [
        { label: "A", text: "$240$" },
        { label: "B", text: "$-240$" },
        { label: "C", text: "$160$" },
        { label: "D", text: "$-160$" },
      ],
      correctAnswer: "D",
      explanation:
        "The general term is $\\binom6r(2x)^{6-r}(-x^{-1})^r$. The power of $x$ is $6-r-r=6-2r$, so the constant term has $r=3$. The coefficient is $\\binom63 2^3(-1)^3=-160$.",
    },
    {
      id: "y11ext-d5-function-inverse-restriction",
      unitSlug: "further-functions",
      assessedUnitSlugs: ["further-trigonometry"],
      difficulty: 5,
      targetMisconception:
        "Finds an inverse expression but chooses the wrong branch after a transformation restricts the domain.",
      prompt:
        "The function $f(x)=\\cos x$ is restricted to $0\\leq x\\leq\\pi$. If $g(x)=f(x-\\frac{\\pi}{3})$, which domain makes $g$ one-to-one with range $[-1,1]$?",
      choices: [
        {
          label: "A",
          text: "$\\dfrac{\\pi}{3}\\leq x\\leq\\dfrac{4\\pi}{3}$",
        },
        {
          label: "B",
          text: "$0\\leq x\\leq\\pi$",
        },
        {
          label: "C",
          text: "$-\\dfrac{\\pi}{3}\\leq x\\leq\\dfrac{2\\pi}{3}$",
        },
        {
          label: "D",
          text: "$0\\leq x\\leq2\\pi$",
        },
      ],
      correctAnswer: "A",
      explanation:
        "For $g(x)=\\cos(x-\\pi/3)$ to use the same one-to-one branch as $f$, the input $x-\\pi/3$ must run from $0$ to $\\pi$. Hence $\\pi/3\\leq x\\leq4\\pi/3$.",
    },
    {
      id: "y11ext-d5-polynomial-combinatorial-coeff",
      unitSlug: "binomial-theorem",
      assessedUnitSlugs: ["permutations-combinations", "polynomials"],
      difficulty: 5,
      targetMisconception:
        "Multiplies all available choices instead of selecting term combinations whose powers add to the required exponent.",
      prompt:
        "What is the coefficient of $x^3$ in $(1+2x)^4(1-x)^3$?",
      choices: [
        { label: "A", text: "$5$" },
        { label: "B", text: "$13$" },
        { label: "C", text: "$-17$" },
        { label: "D", text: "$21$" },
      ],
      correctAnswer: "C",
      explanation:
        "Add contributions where powers sum to 3: $[x^0][x^3]$ gives $-1$, $[x^1][x^2]$ gives $8\\cdot3=24$, $[x^2][x^1]$ gives $24\\cdot(-3)=-72$, and $[x^3][x^0]$ gives $32$. Total $-1+24-72+32=-17$.",
    },
    {
      id: "y11ext-d5-trig-composite-domain",
      unitSlug: "further-trigonometry",
      assessedUnitSlugs: ["further-functions"],
      difficulty: 5,
      targetMisconception:
        "Uses the reference angle but misses that the inverse sine output is restricted to its principal-value range.",
      prompt:
        "For $h(x)=\\arcsin(2x-1)$, which statement is correct?",
      choices: [
        {
          label: "A",
          text: "The domain is $0\\leq x\\leq1$ and the range is $-\\dfrac{\\pi}{2}\\leq h(x)\\leq\\dfrac{\\pi}{2}$.",
        },
        {
          label: "B",
          text: "The domain is $-1\\leq x\\leq1$ and the range is $0\\leq h(x)\\leq\\pi$.",
        },
        {
          label: "C",
          text: "The domain is all real numbers and the range is $-1\\leq h(x)\\leq1$.",
        },
        {
          label: "D",
          text: "The domain is $0\\leq x\\leq1$ and the range is $0\\leq h(x)\\leq2\\pi$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The input to $\\arcsin$ must satisfy $-1\\leq2x-1\\leq1$, giving $0\\leq x\\leq1$. The principal range of $\\arcsin$ is $[-\\pi/2,\\pi/2]$.",
    },
    {
      id: "y11ext-d5-repeated-letter-condition",
      unitSlug: "permutations-combinations",
      assessedUnitSlugs: ["polynomials"],
      difficulty: 5,
      targetMisconception:
        "Counts arrangements with repeated letters but does not subtract the cases that violate the adjacency constraint.",
      prompt:
        "How many distinct arrangements of the letters in LEVEL have the two E's not adjacent?",
      choices: [
        { label: "A", text: "$12$" },
        { label: "B", text: "$18$" },
        { label: "C", text: "$24$" },
        { label: "D", text: "$30$" },
      ],
      correctAnswer: "B",
      explanation:
        "Total arrangements are $5!/(2!2!)=30$. If the E's are adjacent, treat EE as one item with L, L, V: $4!/2!=12$. Therefore not adjacent is $30-12=18$.",
    },
    {
      id: "y11ext-d5-root-counting-model",
      unitSlug: "polynomials",
      assessedUnitSlugs: ["permutations-combinations"],
      difficulty: 5,
      targetMisconception:
        "Chooses roots independently but forgets that selecting a polynomial from a set of roots is unordered and constrained by degree.",
      prompt:
        "A monic cubic polynomial has three distinct integer roots chosen from $\\{-3,-2,-1,1,2,3\\}$. How many such polynomials have product of roots negative?",
      choices: [
        { label: "A", text: "$10$" },
        { label: "B", text: "$11$" },
        { label: "C", text: "$12$" },
        { label: "D", text: "$20$" },
      ],
      correctAnswer: "A",
      explanation:
        "A negative product needs an odd number of negative roots. Choose 1 negative and 2 positive: $\\binom31\\binom32=9$, or choose 3 negative: $\\binom33=1$. Total $10$ monic cubics.",
    },
  ],
};
