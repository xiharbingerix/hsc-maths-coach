import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function ssChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Identify the sequence or series structure before choosing a formula."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function ssNumber(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use the sequence or series information and give the requested value only.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function ssMoney(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  const numericValue = Number(answer.replace(/[$,]/g, ""));
  const moneyVariants = Number.isFinite(numericValue)
    ? [
        String(numericValue),
        numericValue.toFixed(2),
        numericValue.toLocaleString("en-AU"),
        numericValue.toLocaleString("en-AU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ]
    : [answer];

  const currencyVariants = moneyVariants.flatMap((value) => [
    value,
    `$${value}`,
  ]);

  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(
      new Set([answer, ...currencyVariants, ...acceptedAnswers])
    ),
    hint: "Track the growth factor or series terms, then give the money value.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function poolChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  explanation: string,
  hint = "Identify the sequence or series structure before choosing a formula."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function poolNumber(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  explanation: string,
  acceptedAnswers: string[] = [],
  hint = "Use the sequence or series information and give the requested value only."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

function poolMoney(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  explanation: string,
  acceptedAnswers: string[] = [],
  hint = "Track the growth factor or series terms, then give the money value."
): PracticeQuestion {
  const numericValue = Number(answer.replace(/[$,]/g, ""));
  const moneyVariants = Number.isFinite(numericValue)
    ? [
        String(numericValue),
        numericValue.toFixed(2),
        numericValue.toLocaleString("en-AU"),
        numericValue.toLocaleString("en-AU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ]
    : [answer];
  const currencyVariants = moneyVariants.flatMap((value) => [value, `$${value}`]);
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer,
    acceptedAnswers: Array.from(
      new Set([answer, ...currencyVariants, ...acceptedAnswers])
    ),
    hint,
    explanation,
  };
}

function ssLesson(
  id: string,
  title: string,
  description: string,
  learningIntention: string,
  successCriteria: string[],
  teaching: ExplicitLesson["teaching"],
  workedExamples: WorkedExample[],
  guidedPractice: PracticeQuestion[],
  independentPractice: PracticeQuestion[],
  commonMistakes: ExplicitLesson["commonMistakes"],
  masteryQuiz: PracticeQuestion[]
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "ma-sequences-and-series",
    moduleTitle: "Sequences and Series",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Sequences and Series",
    focus: "Sequences and series",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention,
    successCriteria,
    teaching,
    workedExamples,
    guidedPractice,
    independentPractice,
    commonMistakes,
    masteryQuiz,
    masteryPassMark: 0.8,
  };
}

const arithmeticGeometricSequencesLesson = ssLesson(
  "arithmetic-geometric-sequences",
  "Arithmetic and Geometric Sequences Review",
  "Review nth-term notation for arithmetic and geometric sequences, with emphasis on HSC-style interpretation and financial growth factors.",
  "Recognise arithmetic and geometric sequences and use nth-term rules to interpret HSC and financial contexts.",
  [
    "Identify arithmetic sequences by a constant difference.",
    "Identify geometric sequences by a constant ratio.",
    "Use nth-term notation to find selected terms.",
    "Find an unknown common difference or common ratio from given terms.",
    "Choose an appropriate sequence model for repeated percentage change.",
    "Avoid off-by-one errors when interpreting first terms.",
  ],
  {
    paragraphs: [
      "A sequence is just an ordered list of numbers built by a rule — each one called a term, and its position labelled $T_1$, $T_2$, $T_3$ and so on. The whole topic rests on one question: how do you get from one term to the next? There are two clean answers, and almost every HSC sequence is one of them.",
      "The first kind adds the same amount every step. The list $5,\\ 8,\\ 11,\\ 14,\\ldots$ never multiplies — it just keeps adding $3$. That constant gap is called the common difference $d$, and a sequence built this way is arithmetic. You find $d$ by subtracting any term from the one after it: $d=T_{n+1}-T_n$. Adding the same amount each time is what makes the terms march up (or down) in a straight line.",
      "Now build the formula for the $n$th term instead of grinding out every step. The first term is $a$. To reach $T_2$ you add one $d$; to reach $T_3$ you add two; to reach $T_n$ you add $d$ a total of $(n-1)$ times — because there are $(n-1)$ gaps between $n$ terms, not $n$. That gives $T_n=a+(n-1)d$. The $(n-1)$ is the single most-missed detail in the topic: the first term already sits there at $n=1$ before any difference is added, so for $T_{20}$ you add nineteen differences, not twenty.",
      "The second kind multiplies by the same amount every step. The list $2,\\ 6,\\ 18,\\ 54,\\ldots$ never adds a constant — each term is the previous one times $3$. That constant multiplier is the common ratio $r$, found by dividing any term by the one before it: $r=\\frac{T_{n+1}}{T_n}$. A sequence built this way is geometric, and the same counting argument gives its $n$th term: starting from $a$, you multiply by $r$ once to reach $T_2$, twice to reach $T_3$, and $(n-1)$ times to reach $T_n$, so $T_n=ar^{n-1}$. Same $(n-1)$, same reason — one fewer operation than there are terms.",
      "So the recognition test is simple: subtract consecutive terms — if the difference is constant, it is arithmetic; divide consecutive terms — if the ratio is constant, it is geometric. The classic trap is treating a percentage change as an arithmetic difference. A salary that rises by a fixed $\\$2000$ each year is arithmetic (repeated addition), but one that rises by $4\\%$ each year is geometric, because $4\\%$ of a bigger salary is a bigger dollar amount — the value is multiplied, not added.",
      "This is why geometric sequences are the language of finance. A percentage change is a multiplication, so it has a ratio. A $4\\%$ increase keeps the original $100\\%$ and adds $4\\%$ more, giving a growth factor of $r=1.04$. A $12\\%$ decrease leaves $88\\%$ behind, giving a depreciation factor of $r=0.88$. Read the ratio off the percentage every time: increase means $1+\\text{rate}$, decrease means $1-\\text{rate}$ — never the bare $0.04$ or $0.12$, which would throw away the money you already have.",
    ],
    latexBlocks: [
      "\\text{arithmetic: add }d\\text{ each step}\\quad\\Rightarrow\\quad T_n=a+(n-1)d",
      "\\text{geometric: multiply by }r\\text{ each step}\\quad\\Rightarrow\\quad T_n=ar^{n-1}",
      "d=T_{n+1}-T_n,\\qquad r=\\frac{T_{n+1}}{T_n}",
      "\\text{growth factor }=1+\\text{rate},\\qquad \\text{decay factor }=1-\\text{rate}",
    ],
  },
  [
    {
      title: "Find a term in an arithmetic sequence",
      questionLatex:
        "\\text{An arithmetic sequence has }a=7\\text{ and }d=3.\\text{ Find }T_{20}.",
      steps: [
        { explanation: "Adding the same d each step means the nth term is the first term plus a fixed number of differences, so use the arithmetic rule.", latex: "T_n=a+(n-1)d" },
        { explanation: "The 20th term sits 19 gaps after the first, so substitute a = 7, d = 3 and n - 1 = 19 — not 20.", latex: "T_{20}=7+19(3)" },
        { explanation: "Evaluate: nineteen lots of 3 is 57, added to the first term 7.", latex: "T_{20}=7+57=64" },
      ],
      finalAnswerLatex: "T_{20}=64",
    },
    {
      title: "Find a term in a geometric sequence",
      questionLatex:
        "\\text{A geometric sequence has }a=5\\text{ and }r=2.\\text{ Find }T_6.",
      steps: [
        { explanation: "Multiplying by the same r each step means the nth term is the first term times a fixed number of ratios, so use the geometric rule.", latex: "T_n=ar^{n-1}" },
        { explanation: "Reaching the sixth term from the first takes five multiplications by the ratio, so the exponent is 6 - 1 = 5.", latex: "T_6=5(2)^5" },
        { explanation: "Evaluate: 2 to the fifth power is 32, then multiply by the first term 5.", latex: "T_6=5\\times 32=160" },
      ],
      finalAnswerLatex: "T_6=160",
    },
    {
      title: "Classify a sequence",
      questionLatex: "4,\\ 7,\\ 10,\\ 13,\\ldots",
      steps: [
        { explanation: "First test for a constant difference by subtracting each term from the next.", latex: "7-4=3,\\quad 10-7=3,\\quad 13-10=3" },
        { explanation: "The gap is the same every time, so a fixed amount is being added — that is the signature of an arithmetic sequence.", latex: "d=3" },
        { explanation: "Multiplying would give a constant ratio instead; here 7 over 4 is not 10 over 7, so it is not geometric.", latex: "\\text{constant difference, not ratio}" },
      ],
      finalAnswerLatex: "\\text{arithmetic, with }d=3",
    },
  ],
  [
    ssNumber("y12adv-ssfm-seq-g1", "Find the eighth term of the arithmetic sequence.", "a=5,\\quad d=4", "33", [], "The eighth term is 5 plus seven common differences, which gives 33."),
    ssChoice("y12adv-ssfm-seq-g2", "Which description matches the sequence shown?", "2,\\ 6,\\ 18,\\ 54,\\ldots", "B", ["Arithmetic with d=4", "Geometric with r=3", "Geometric with r=4", "Neither arithmetic nor geometric"], "Each term is multiplied by 3, so the sequence is geometric."),
    ssNumber("y12adv-ssfm-seq-g3", "Find the fifth term of the geometric sequence.", "a=3,\\quad r=2", "48", [], "The fifth term is 3 multiplied by four factors of 2."),
    ssChoice("y12adv-ssfm-seq-g4", "A car loses 15 percent of its value each year. Which common ratio models the value after each year?", "\\text{annual depreciation}=15\\%", "C", ["1.15", "0.15", "0.85", "15"], "A 15 percent decrease leaves 85 percent of the value, so the ratio is 0.85."),
  ],
  [
    ssNumber("y12adv-ssfm-seq-i1", "Find the fifteenth term of the arithmetic sequence.", "a=12,\\quad d=-2", "-16", [], "Use fourteen common differences from the first term."),
    ssNumber("y12adv-ssfm-seq-i2", "Find the common difference of the arithmetic sequence.", "T_4=17,\\quad T_9=37", "4", [], "The term value increases by 20 over 5 term steps, so d=4."),
    ssChoice("y12adv-ssfm-seq-i3", "Which nth-term rule represents a geometric sequence with first term 6 and ratio 1.08?", "\\text{first term }6,\\quad r=1.08", "A", ["$T_n=6(1.08)^{n-1}$", "$T_n=6+1.08(n-1)$", "$T_n=1.08(6)^{n-1}$", "$T_n=6(0.08)^{n-1}$"], "A geometric sequence uses first term times the ratio to the power n-1."),
    ssNumber("y12adv-ssfm-seq-i4", "Find the sixth term of the geometric sequence.", "a=81,\\quad r=\\frac13", "1/3", ["1/3", "1 / 3"], "$T_6=81\\times\\left(\\tfrac13\\right)^5=\\tfrac{81}{243}=\\tfrac13$. Five multiplications by one third give one third."),
    ssChoice("y12adv-ssfm-seq-i5", "Which model is most appropriate for a salary that increases by the same dollar amount each year?", "\\text{same increase in dollars each year}", "A", ["Arithmetic sequence", "Geometric sequence", "Limiting series", "Alternating series"], "A fixed dollar increase is repeated addition, so it is arithmetic."),
  ],
  [
    { mistake: "Using n instead of n-1 in nth-term rules.", fix: "The first term already occurs at n=1, so the formula counts n-1 changes." },
    { mistake: "Treating a percentage increase as an arithmetic difference.", fix: "Repeated percentage change is geometric because the value is multiplied each period." },
    { mistake: "Using the common difference on a geometric sequence.", fix: "Check ratios as well as differences before choosing the model." },
    { mistake: "Confusing the first term with the zero-term in finance contexts.", fix: "Read whether the first listed value is the starting value or the value after one period." },
  ],
  [
    ssNumber("y12adv-ssfm-seq-m1", "Find the tenth term of the arithmetic sequence.", "a=6,\\quad d=5", "51", [], "The tenth term is 6 plus nine common differences."),
    ssNumber("y12adv-ssfm-seq-m2", "Find the seventh term of the geometric sequence.", "a=2,\\quad r=3", "1458", [], "The seventh term is 2 multiplied by six factors of 3."),
    ssChoice("y12adv-ssfm-seq-m3", "Which description matches the sequence?", "10,\\ 8,\\ 6,\\ 4,\\ldots", "A", ["Arithmetic with d=-2", "Geometric with r=-2", "Geometric with r=0.8", "Neither arithmetic nor geometric"], "The difference is consistently -2."),
    ssChoice("y12adv-ssfm-seq-m4", "Which formula gives the nth term of a geometric sequence with first term a and common ratio r?", "\\text{geometric nth term}", "B", ["$T_n=a+(n-1)r$", "$T_n=ar^{n-1}$", "$T_n=\\frac n2(a+l)$", "$T_n=a(1-r^n)$"], "The geometric nth term multiplies by the ratio n-1 times."),
    ssNumber("y12adv-ssfm-seq-m5", "Find the common difference of the arithmetic sequence.", "T_3=11,\\quad T_8=31", "4", [], "Five term steps increase the value by 20, so d=4."),
    ssNumber("y12adv-ssfm-seq-m6", "Find the common ratio of the geometric sequence.", "4,\\ 12,\\ 36,\\ldots", "3", [], "Each term is multiplied by 3."),
    ssChoice("y12adv-ssfm-seq-m7", "A student writes the third term as a plus three common differences. Which option identifies the error?", "\\text{third term of an arithmetic sequence}", "C", ["The common difference should be squared", "The first term should be ignored", "Only two common differences separate the first and third terms", "The sequence must be geometric"], "The third term is reached after two changes from the first term."),
    ssChoice("y12adv-ssfm-seq-m8", "An investment increases by 4 percent each year. Which common ratio should be used in a geometric model?", "\\text{annual increase}=4\\%", "B", ["0.04", "1.04", "4", "0.96"], "A 4 percent increase leaves 104 percent of the value, so the ratio is 1.04."),
    ssChoice("y12adv-ssfm-seq-m9", "A machine is worth 24000 dollars now and loses 15 percent of its value each year. Which term rule models the value after n listed annual values, with the first term equal to the current value?", "\\text{current value }24000,\\quad \\text{annual decrease }15\\%", "D", ["$T_n=24000(1.15)^{n-1}$", "$T_n=24000-0.15(n-1)$", "$T_n=24000(0.15)^{n-1}$", "$T_n=24000(0.85)^{n-1}$"], "Depreciation by 15 percent uses the ratio 0.85, and the first term uses exponent 0."),
    ssMoney("y12adv-ssfm-seq-m10", "A balance is 1000 dollars and then grows by 10 percent each year. Find the third listed value if the first listed value is 1000 dollars.", "\\text{first value }\\$1000,\\quad r=1.10", "1210", [], "The third listed value is after two growth factors of 1.10, giving $1210."),
  ]
);

const arithmeticGeometricSeriesLesson = ssLesson(
  "arithmetic-geometric-series",
  "Arithmetic and Geometric Series",
  "Use arithmetic and geometric series formulas, including sigma notation, to evaluate finite sums in abstract and contextual settings.",
  "Choose and apply finite series formulas to evaluate arithmetic, geometric and sigma sums.",
  [
    "Interpret a series as the sum of sequence terms.",
    "Use arithmetic series formulas with first, last and number of terms.",
    "Use geometric series formulas with first term, ratio and number of terms.",
    "Expand simple sigma notation before evaluating a sum.",
    "Choose between term and sum formulas in context.",
    "Recognise when a financial total is a geometric series.",
  ],
  {
    paragraphs: [
      "A series is what you get when you add the terms of a sequence together. The sequence $2,\\ 4,\\ 6,\\ 8$ becomes the series $2+4+6+8=20$. We write $S_n$ for the sum of the first $n$ terms. The first thing to get right is which question you are answering: a term question wants one value ($T_n$), a series question wants the running total ($S_n$). Reaching for a term formula when a total is required — or the reverse — is the single most common slip in this topic.",
      "You could always add the terms one by one, but for long sums there is a much faster way, and it is worth seeing where it comes from. Take the arithmetic sum $1+2+3+\\cdots+100$. Write it forwards, then write it backwards underneath: $100+99+\\cdots+1$. Add the two rows term by term and every pair makes $101$ — and there are $100$ such pairs, giving $100\\times 101=10100$. But that double-counted the sum, so the real total is half of it: $\\frac{100}{2}\\times 101 = 5050$. This is Gauss's pairing trick.",
      "Generalise that trick. Pairing the first term $a$ with the last term $l$ gives $a+l$, and every pair down the line sums to the same $a+l$ because as you step in from one end the terms rise by $d$ and from the other they fall by $d$. With $n$ terms you can form $\\frac n2$ such pairs, so $S_n=\\frac n2(a+l)$. If the last term is not handed to you, find it first with $l=a+(n-1)d$; substituting that in gives the equivalent form $S_n=\\frac n2\\big(2a+(n-1)d\\big)$. Use whichever the question makes easier — first-plus-last when you know both ends, the $2a+(n-1)d$ form when you only know $a$ and $d$.",
      "Geometric series need a different trick, because the terms multiply rather than add, so pairing does nothing. Instead, write the sum and then multiply the whole thing by $r$: $S_n=a+ar+ar^2+\\cdots+ar^{n-1}$ and $rS_n=ar+ar^2+\\cdots+ar^{n-1}+ar^n$. Almost every term appears in both lines. Subtract the first from the second and the middle all cancels, leaving only $rS_n-S_n=ar^n-a$. Factor: $S_n(r-1)=a(r^n-1)$, so $S_n=\\frac{a(r^n-1)}{r-1}$. Flipping both signs gives the equally valid $S_n=\\frac{a(1-r^n)}{1-r}$ — handier when $r<1$ because both top and bottom stay positive. The only forbidden case is $r=1$, where dividing by $r-1=0$ breaks down (and rightly so: with $r=1$ every term equals $a$ and the sum is just $na$).",
      "Sigma notation, $\\sum$, is shorthand for a sum and nothing more. In $\\sum_{k=1}^{5}(3k+1)$ the letter $k$ is a counter that starts at the bottom number and runs up to the top one; you substitute each value into the expression and add the results. So this means $(3\\cdot1+1)+(3\\cdot2+1)+\\cdots+(3\\cdot5+1)$. The trap is the starting index — if the bottom says $k=2$, your first term uses $2$, not $1$. Always begin substituting at the lower limit.",
      "In exam contexts, the word that decides everything is whether the question asks for a total. 'How many seats altogether in 12 rows?' or 'total interest over 8 years' is a sum — a series. 'The seats in row 12' or 'the value in year 8' is a single term. Spot the total-versus-term distinction first, then the recognition test (constant difference vs constant ratio) tells you which series formula to use.",
    ],
    latexBlocks: [
      "S_n=\\frac n2(a+l)\\qquad\\text{(Gauss pairing: }\\tfrac n2\\text{ pairs each summing to }a+l)",
      "S_n=\\frac n2\\big(2a+(n-1)d\\big)\\qquad\\text{(same formula with }l=a+(n-1)d)",
      "S_n=\\frac{a(r^n-1)}{r-1}=\\frac{a(1-r^n)}{1-r}\\quad (r\\ne1)",
      "\\sum_{k=1}^{n}u_k=u_1+u_2+\\cdots+u_n",
    ],
  },
  [
    {
      title: "Arithmetic series total",
      questionLatex:
        "\\text{Find the sum of 20 arithmetic terms with }a=12\\text{ and }d=2.",
      steps: [
        { explanation: "First-plus-last form needs the last term, so reach it by adding 19 differences to the first term.", latex: "l=12+19(2)=50" },
        { explanation: "Pair the first and last terms; with 20 terms there are 10 pairs, each summing to 12 + 50.", latex: "S_{20}=\\frac{20}{2}(12+50)" },
        { explanation: "Evaluate: 10 pairs of 62.", latex: "S_{20}=10\\times 62=620" },
      ],
      finalAnswerLatex: "S_{20}=620",
    },
    {
      title: "Geometric series total",
      questionLatex: "\\text{Find }S_6\\text{ for }a=5\\text{ and }r=2.",
      steps: [
        { explanation: "Terms multiply, so use the geometric sum from the multiply-by-r-and-subtract trick; r > 1 makes the r^n - 1 form tidiest.", latex: "S_n=\\frac{a(r^n-1)}{r-1}" },
        { explanation: "Substitute a = 5, r = 2 and n = 6.", latex: "S_6=\\frac{5(2^6-1)}{2-1}" },
        { explanation: "Evaluate: 2 to the sixth is 64, so the top is 5 times 63 and the bottom is 1.", latex: "S_6=\\frac{5\\times 63}{1}=315" },
      ],
      finalAnswerLatex: "S_6=315",
    },
    {
      title: "Expand sigma notation",
      questionLatex: "\\sum_{k=1}^{5}(3k+1)",
      steps: [
        { explanation: "The counter k runs from the lower limit 1 up to 5; substitute each value into 3k + 1.", latex: "(3+1)+(6+1)+(9+1)+(12+1)+(15+1)" },
        { explanation: "That gives the five terms, which form an arithmetic list rising by 3.", latex: "4+7+10+13+16" },
        { explanation: "Add them — by pairing 4 + 16 and 7 + 13 around the middle 10.", latex: "=50" },
      ],
      finalAnswerLatex: "\\sum_{k=1}^{5}(3k+1)=50",
    },
  ],
  [
    ssNumber("y12adv-ssfm-series-g1", "Find the sum of the first 10 terms of the arithmetic series.", "a=4,\\quad d=3", "175", [], "The tenth term is 31, so the sum is 10/2 times 4+31."),
    ssNumber("y12adv-ssfm-series-g2", "Find the sum of the first 5 terms of the geometric series.", "a=3,\\quad r=2", "93", [], "The terms are 3, 6, 12, 24 and 48."),
    ssNumber("y12adv-ssfm-series-g3", "Evaluate the sigma sum.", "\\sum_{k=1}^{4}(2k+1)", "24", [], "The terms are 3, 5, 7 and 9."),
    ssChoice("y12adv-ssfm-series-g4", "Which formula is most direct when the first term, last term and number of arithmetic terms are known?", "\\text{arithmetic series}", "A", ["$S_n=\\frac n2(a+l)$", "$T_n=ar^{n-1}$", "$S_n=\\frac{a(1-r^n)}{1-r}$", "$S_\\infty=\\frac a{1-r}$"], "The formula using first and last terms is the direct arithmetic series formula."),
  ],
  [
    ssNumber("y12adv-ssfm-series-i1", "Find the sum of 8 arithmetic terms.", "a=5,\\quad l=33", "152", [], "The average of the first and last terms is 19, and there are 8 terms."),
    ssNumber("y12adv-ssfm-series-i2", "Find the sum of the first 4 terms of the geometric series.", "a=2,\\quad r=3", "80", [], "The first four terms are 2, 6, 18 and 54."),
    ssChoice("y12adv-ssfm-series-i3", "Which expression expands the sigma notation correctly?", "\\sum_{k=2}^{5}k^2", "C", ["$1^2+2^2+3^2+4^2+5^2$", "$2+3+4+5$", "$2^2+3^2+4^2+5^2$", "$5^2-2^2$"], "The index starts at 2 and ends at 5, and the expression is k squared."),
    ssChoice("y12adv-ssfm-series-i4", "A theatre has 14 seats in the first row and 2 extra seats in each later row. Which model gives the total number of seats in the first 12 rows?", "\\text{row seats form an arithmetic sequence}", "B", ["A geometric term", "An arithmetic series", "A limiting sum", "A single common ratio"], "The question asks for a total across rows, so it needs an arithmetic series."),
    ssNumber("y12adv-ssfm-series-i5", "Evaluate the sum.", "7+10+13+\\cdots+34", "205", [], "There are 10 terms and the average of the first and last terms is 20.5."),
  ],
  [
    { mistake: "Using T_n when the question asks for a total.", fix: "A total of terms requires S_n, not only the nth term." },
    { mistake: "Using a geometric formula on an arithmetic series.", fix: "Check whether the pattern adds or multiplies before choosing the formula." },
    { mistake: "Expanding sigma notation from the wrong starting index.", fix: "Use the lower index as the first substituted value." },
    { mistake: "Forgetting that the last term may need to be found first.", fix: "If l is not given for an arithmetic series, calculate it before using first-plus-last form." },
  ],
  [
    ssNumber("y12adv-ssfm-series-m1", "Find the sum of the first 12 terms of the arithmetic series.", "a=10,\\quad d=5", "450", [], "The twelfth term is 65, and the sum is 12/2 times 10+65."),
    ssNumber("y12adv-ssfm-series-m2", "Find the sum of the first 6 terms of the geometric series.", "a=4,\\quad r=2", "252", [], "The six terms add to 252."),
    ssChoice("y12adv-ssfm-series-m3", "Which expression represents the sum of the first n terms of an arithmetic sequence?", "\\text{arithmetic series}", "A", ["$S_n=\\frac n2(2a+(n-1)d)$", "$T_n=a+(n-1)d$", "$S_n=ar^{n-1}$", "$S_\\infty=\\frac a{1-r}$"], "The sum formula includes n/2 and the first term plus the accumulated differences."),
    ssNumber("y12adv-ssfm-series-m4", "Evaluate the sigma sum.", "\\sum_{k=1}^{5}(4k-1)", "55", [], "The terms are 3, 7, 11, 15 and 19."),
    ssChoice("y12adv-ssfm-series-m5", "A savings bonus pays 100 dollars in the first month, then 110 dollars, then 120 dollars, continuing with the same increase. What type of total is needed for the first year?", "\\text{monthly bonuses increase by }\\$10", "B", ["A geometric series", "An arithmetic series", "A limiting sum", "A single term only"], "The payments increase by a fixed amount and the question asks for a total."),
    ssNumber("y12adv-ssfm-series-m6", "Find the total of the first 5 terms.", "6,\\ 18,\\ 54,\\ldots", "726", [], "This is a geometric series with a=6 and r=3."),
    ssChoice("y12adv-ssfm-series-m7", "A student uses a term formula to answer a question asking for total interest across 8 years. What is the main issue?", "\\text{term versus total}", "D", ["The ratio must be negative", "The first term must be zero", "Sigma notation cannot be used in finance", "A total requires a series formula"], "A term formula gives one term, not a sum over multiple years."),
    ssChoice("y12adv-ssfm-series-m8", "Which expression is the best setup for a geometric total with first term 200, ratio 1.05 and 6 terms?", "\\text{geometric series setup}", "C", ["$200(1.05)^5$", "$\\frac62(200+1.05)$", "$\\frac{200(1-1.05^6)}{1-1.05}$", "$\\frac{200}{1-1.05}$"], "A finite geometric total uses the first term, ratio and number of terms."),
    ssChoice("y12adv-ssfm-series-m9", "A contract pays 5000 dollars in year 1 and increases by 500 dollars each year for 6 years. Which value is needed before using first-plus-last form?", "\\text{arithmetic payment total}", "A", ["The sixth payment", "The common ratio", "The limiting sum", "The present value formula"], "First-plus-last form needs the final payment as well as the first payment."),
    ssNumber("y12adv-ssfm-series-m10", "A geometric series has first term 9 and ratio 2. Find the sum of the first 7 terms.", "a=9,\\quad r=2", "1143", [], "The first seven terms are summed using the finite geometric series formula."),
  ]
);

const limitingSumsLesson = ssLesson(
  "limiting-sums-infinite-series",
  "Limiting Sums and Infinite Series",
  "Analyse infinite geometric series, decide whether a limiting sum exists, and interpret repeated proportional change.",
  "Determine when an infinite geometric series has a limiting sum and calculate or interpret that sum.",
  [
    "State the condition for convergence of a geometric series.",
    "Use the limiting sum formula when the common ratio has magnitude less than 1.",
    "Recognise when no finite limiting sum exists.",
    "Interpret limiting sums in recurring decimal and financial contexts.",
    "Distinguish a finite sum from an infinite limiting sum.",
    "Avoid applying limiting formulas to growing series.",
  ],
  {
    paragraphs: [
      "It sounds impossible that adding infinitely many positive numbers could give a finite total — yet sometimes it does. Picture walking half the way to a wall, then half the remaining gap, then half again, forever: $\\tfrac12+\\tfrac14+\\tfrac18+\\cdots$. You never quite reach the wall, but you never pass it either — your total distance creeps up on exactly $1$ and stops there. That ceiling the partial sums approach is called the limiting sum, written $S_\\infty$.",
      "Why does it settle? Because the terms are shrinking fast — each is half the one before. In a geometric series every term is $r$ times the last, so when $|r|<1$ the terms get smaller and smaller, $r^n$ heads toward $0$, and the tail you are still adding becomes negligible. Add $0.1+0.01+0.001+\\cdots$ and the contributions die away to nothing; the sum closes in on $\\tfrac19$ and never escapes it. That shrinking is the whole reason a finite ceiling can exist.",
      "To get the exact value, start from the finite geometric sum $S_n=\\frac{a(1-r^n)}{1-r}$ and ask what happens as $n$ grows without bound. When $|r|<1$, the term $r^n$ collapses toward $0$, so $1-r^n$ collapses toward $1$, and the whole expression closes in on $\\frac{a}{1-r}$. That limit is the formula: $S_\\infty=\\frac{a}{1-r}$. It is not a new rule pulled from nowhere — it is the finite formula with the $r^n$ piece worn away to zero.",
      "Everything hinges on $|r|<1$, and the condition is strict for a reason. If $|r|>1$ the terms grow instead of shrink — $2+4+8+\\cdots$ races off to infinity with no ceiling at all. If $r=1$ every term equals $a$, so you are adding $a$ forever and the total never settles. If $r=-1$ the partial sums flip between $a$ and $0$ and never home in on one value. So a limiting sum exists only when the magnitude of the ratio is strictly below $1$ — never when it is $1$ or more. Applying $\\frac{a}{1-r}$ to a growing series is the headline error of this topic; the formula simply does not apply there.",
      "Note that $r$ may be negative and still converge: $r=-\\tfrac12$ has magnitude $\\tfrac12<1$, so its terms shrink (while alternating sign) and the series settles down fine. It is the magnitude $|r|$ that matters, not the sign. And keep $S_\\infty$ apart from $S_n$: a question about an ongoing, never-ending sum uses the limiting formula, but a question about a specific number of terms — even a large one like 'the first 50' — is a finite sum and needs $S_n$.",
      "One neat application is turning a recurring decimal into a fraction. The decimal $0.7777\\ldots$ is really $0.7+0.07+0.007+\\cdots$, a geometric series with $a=0.7$ and $r=0.1$. Since $|0.1|<1$ it has a limiting sum, $\\frac{0.7}{1-0.1}=\\frac{0.7}{0.9}=\\frac79$ — which is exactly the fraction the recurring decimal stands for. In finance, the same idea models a payment that shrinks by a fixed percentage forever, but always confirm $|r|<1$ before reaching for the formula.",
    ],
    latexBlocks: [
      "S_\\infty=\\frac{a}{1-r}\\quad\\text{valid only when }|r|<1",
      "S_\\infty=\\lim_{n\\to\\infty}\\frac{a(1-r^n)}{1-r}=\\frac{a}{1-r}\\quad\\text{because }r^n\\to0",
      "|r|\\ge1\\quad\\Rightarrow\\quad\\text{terms do not shrink to zero, no finite limiting sum}",
    ],
  },
  [
    {
      title: "Find a limiting sum",
      questionLatex: "a=12,\\quad r=\\frac13",
      steps: [
        { explanation: "Before using the formula, confirm the terms shrink: the magnitude of the ratio must be below 1.", latex: "\\left|\\tfrac13\\right|=\\tfrac13<1\\ \\checkmark" },
        { explanation: "Since it converges, the limiting sum is the first term divided by 1 minus the ratio.", latex: "S_\\infty=\\frac{12}{1-\\frac13}" },
        { explanation: "Simplify the denominator to two thirds, then dividing by two thirds is multiplying by three halves.", latex: "S_\\infty=\\frac{12}{\\frac23}=12\\times\\frac32=18" },
      ],
      finalAnswerLatex: "S_\\infty=18",
    },
    {
      title: "Decide whether a limiting sum exists",
      questionLatex: "a=5,\\quad r=1.2",
      steps: [
        { explanation: "Test the magnitude of the ratio against 1 before doing anything else.", latex: "|1.2|=1.2>1" },
        { explanation: "Because the ratio exceeds 1 the terms grow rather than shrink, so the partial sums race off and never settle.", latex: "r^n\\to\\infty\\ \\text{(no ceiling)}" },
        { explanation: "The convergence condition fails, so the limiting sum formula must not be applied.", latex: "\\text{no finite limiting sum}" },
      ],
      finalAnswerLatex: "\\text{no finite limiting sum exists}",
    },
    {
      title: "Recurring decimal as a geometric series",
      questionLatex: "0.777\\ldots",
      steps: [
        { explanation: "Split the recurring decimal into its place-value pieces — each is one tenth of the one before.", latex: "0.7+0.07+0.007+\\cdots" },
        { explanation: "Reading off the first piece and the constant multiplier gives the first term and ratio.", latex: "a=0.7,\\quad r=0.1" },
        { explanation: "Since the magnitude of 0.1 is below 1, apply the limiting sum formula.", latex: "S_\\infty=\\frac{0.7}{1-0.1}=\\frac{0.7}{0.9}" },
        { explanation: "Simplify the fraction to confirm the exact value the decimal represents.", latex: "=\\frac79" },
      ],
      finalAnswerLatex: "0.777\\ldots=\\frac79",
    },
  ],
  [
    ssNumber("y12adv-ssfm-limit-g1", "Find the limiting sum of the geometric series.", "a=10,\\quad r=0.5", "20", [], "The ratio has magnitude less than 1, so the limiting sum is 20."),
    ssChoice("y12adv-ssfm-limit-g2", "Does the geometric series have a finite limiting sum?", "a=4,\\quad r=1.1", "B", ["Yes, because the first term is positive", "No, because |r| is greater than 1", "Yes, because r is a decimal", "No, because a is not zero"], "A ratio greater than 1 makes the terms grow."),
    ssNumber("y12adv-ssfm-limit-g3", "Find the limiting sum of the geometric series.", "a=6,\\quad r=\\frac13", "9", [], "The limiting sum is 6 divided by 1 minus one third."),
    ssChoice("y12adv-ssfm-limit-g4", "Which condition is needed before using the limiting sum formula?", "\\text{infinite geometric series}", "C", ["a>1", "r>1", "$|r|<1$", "$n<10$"], "The common ratio must have magnitude less than 1."),
  ],
  [
    ssNumber("y12adv-ssfm-limit-i1", "Find the limiting sum of the geometric series.", "a=250,\\quad r=0.8", "1250", [], "The limiting sum is 250 divided by 0.2."),
    ssChoice("y12adv-ssfm-limit-i2", "Which geometric series has no finite limiting sum?", "\\text{choose one}", "D", ["$a=8,\\ r=0.25$", "$a=3,\\ r=-0.5$", "$a=10,\\ r=0.9$", "$a=2,\\ r=1$"], "A ratio with magnitude 1 does not produce a finite limiting sum."),
    ssChoice("y12adv-ssfm-limit-i3", "Which expression represents the recurring decimal shown?", "0.444\\ldots", "A", ["$0.4+0.04+0.004+\\cdots$", "$4+4+4+\\cdots$", "$0.4+0.4^2+0.4^3+\\cdots$", "$0.44+0.444+\\cdots$"], "Each repeated digit contributes the next power of one tenth."),
    ssNumber("y12adv-ssfm-limit-i4", "Find the limiting sum of the geometric series.", "a=18,\\quad r=\\frac23", "54", [], "The limiting sum is 18 divided by one third."),
    ssChoice("y12adv-ssfm-limit-i5", "A model uses a growth factor of 1.03 each period. Why is an infinite limiting sum not appropriate for the growing values themselves?", "\\text{growth factor }1.03", "B", ["The first term is unknown", "The common ratio is greater than 1", "The values are measured in dollars", "The model is arithmetic"], "A ratio above 1 does not lead to a finite limiting sum."),
  ],
  [
    { mistake: "Using the limiting sum formula for any geometric series.", fix: "Only use it when the ratio has magnitude less than 1." },
    { mistake: "Confusing a large finite number of terms with an infinite series.", fix: "Use S_n for a specified number of terms and S_infinity only for an ongoing infinite sum." },
    { mistake: "Ignoring a negative ratio.", fix: "A negative ratio can still converge if its magnitude is less than 1." },
    { mistake: "Using a limiting sum for repeated growth above 100 percent of the previous value.", fix: "Growth factors greater than 1 do not produce finite limiting sums." },
  ],
  [
    ssNumber("y12adv-ssfm-limit-m1", "Find the limiting sum of the geometric series.", "a=15,\\quad r=0.4", "25", [], "The limiting sum is 15 divided by 0.6."),
    ssChoice("y12adv-ssfm-limit-m2", "Which ratio gives a finite limiting sum?", "\\text{geometric series}", "C", ["1.2", "-1.1", "0.75", "1"], "Only 0.75 has magnitude less than 1."),
    ssNumber("y12adv-ssfm-limit-m3", "Find the limiting sum of the geometric series.", "a=40,\\quad r=0.2", "50", [], "The limiting sum is 40 divided by 0.8."),
    ssChoice("y12adv-ssfm-limit-m4", "Which statement is correct for an infinite geometric series with r=-0.5?", "\\text{infinite geometric series}", "A", ["It may have a finite limiting sum", "It cannot converge because r is negative", "It must have sum 0", "It is arithmetic"], "The magnitude of -0.5 is less than 1."),
    ssChoice("y12adv-ssfm-limit-m5", "Which formula should be used for the total of exactly 12 geometric terms?", "\\text{finite number of terms}", "B", ["$S_\\infty=\\frac a{1-r}$", "$S_n=\\frac{a(1-r^n)}{1-r}$", "$T_n=a+(n-1)d$", "$r=\\frac{T_{n+1}}{T_n}$"], "A specified number of terms requires the finite sum formula."),
    ssNumber("y12adv-ssfm-limit-m6", "Find the limiting sum of the geometric series.", "a=9,\\quad r=\\frac13", "13.5", ["27/2", "13.50"], "The limiting sum is 9 divided by two thirds."),
    ssChoice("y12adv-ssfm-limit-m7", "A student claims a series with r=1 has limiting sum a. What is the error?", "\\text{ratio }r=1", "D", ["The first term should be squared", "The series must be arithmetic", "The sum is always zero", "The terms do not shrink toward zero"], "With r=1, every term is the same size, so the infinite sum does not settle."),
    ssChoice("y12adv-ssfm-limit-m8", "Which choice best explains why 0.222... can be treated as a limiting sum?", "0.222\\ldots", "A", ["It is a geometric series with ratio 0.1", "It is an arithmetic series with difference 0.2", "It has no finite value", "Its common ratio is 2"], "Each successive term is one tenth of the previous decimal place contribution."),
    ssChoice("y12adv-ssfm-limit-m9", "A scholarship pays 500 dollars, then 80 percent of the previous payment each year forever. What is the limiting total paid?", "\\text{first payment }\\$500,\\quad r=0.8", "C", ["$900$", "$2000$", "$2500$", "$4000$"], "The limiting total is the first payment divided by 1 minus the ratio."),
    ssChoice("y12adv-ssfm-limit-m10", "An infinite geometric model has first term 12. Which option correctly describes the sign of any finite limiting sum?", "\\text{first term }12", "D", ["$r=0.5$ makes it negative", "$r=2$ gives a negative limiting sum", "$r=-0.5$ makes it negative", "No valid convergent ratio shown gives a negative limiting sum"], "For a positive first term and a convergent geometric series, the denominator 1-r is positive, so the limiting sum is positive."),
  ]
);

const sequencesSeriesFinanceLesson = ssLesson(
  "sequences-series-financial-maths",
  "Sequences and Series in Financial Mathematics",
  "Connect compound interest, depreciation and annuity models to geometric sequences and finite geometric series.",
  "Use sequence and series thinking to interpret financial growth, depreciation and annuity-style payments.",
  [
    "Model compound interest as geometric growth.",
    "Model depreciation as geometric decay.",
    "Connect repeated payments with finite geometric series.",
    "Interpret the first term, ratio and number of terms in financial contexts.",
    "Choose between recurrence, term and series approaches.",
    "Avoid off-by-one errors in annuity timing.",
  ],
  {
    paragraphs: [
      "Financial mathematics is not a separate subject — it is sequences and series wearing a dollar sign. Once you see that 'multiply by the same factor each period' is exactly what a geometric sequence does, the formulas in this section stop being things to memorise and become things you can rebuild. The key move is always the same: turn the words into a growth (or decay) factor, then count how many times it is applied.",
      "Compound interest is geometric growth. Each year the bank pays interest on the whole current balance — including last year's interest — so the balance is multiplied by the same factor every year, not increased by a fixed dollar amount. At $5\\%$, each year keeps the original $100\\%$ and adds $5\\%$ more, a growth factor of $1.05$. Two years means two multiplications: $2000\\to 2000(1.05)\\to 2000(1.05)^2$. Generalising, after $n$ years $A=P(1+r)^n$, where $P$ is the principal and $r$ the rate as a decimal. This is just $T_{n+1}=ar^n$ in disguise, with $a=P$ and ratio $1+r$.",
      "Depreciation is the same machine running downhill — geometric decay. An asset loses a fixed percentage of its current value each year, so again the value is multiplied, this time by a factor below $1$. Losing $10\\%$ leaves $90\\%$, a factor of $0.90$, so after $n$ years $V=P(1-r)^n$. The reason it must be geometric and not arithmetic: $10\\%$ of a $\\$4000$ computer is $\\$400$, but next year $10\\%$ of the reduced $\\$3600$ is only $\\$360$ — the dollar drop shrinks because it is always a percentage of the current value, which is precisely what a constant ratio produces.",
      "The factor itself is where students most often go wrong. A rate of $5\\%$ is $r=0.05$, but the multiplier you apply is $1+0.05=1.05$ for growth and $1-0.05=0.95$ for decay — never the bare $0.05$. Using $0.05$ as the ratio would throw away the original money entirely and shrink the balance to almost nothing each year. Read it as: growth factor $=1+\\text{rate}$, decay factor $=1-\\text{rate}$, every time.",
      "Annuities — regular equal payments — are where the series arrives. Each deposit sits in the account for a different length of time, so each earns a different number of interest multiplications, and the final balance is the sum of those separately-grown deposits. That sum is a geometric series. Three end-of-year deposits of $\\$1000$ at $5\\%$, valued just after the third, give $1000(1.05)^2+1000(1.05)^1+1000(1.05)^0$: the first deposit has had two full years to grow, the second one year, the third none.",
      "So the make-or-break skill is timing — counting the exponents. A payment made at the valuation moment has had zero completed periods, so its exponent is $0$ (it is multiplied by $1$, not dropped). The earliest payment has had the most time and carries the largest exponent. Lay the payments out as a series like the one above, identify that it is geometric with ratio $1+r$, and you can either add the few terms directly or apply $S_n=\\frac{a(R^n-1)}{R-1}$ with $R=1+r$. The off-by-one trap — giving the final payment an exponent of $1$ instead of $0$ — is the classic annuity error, so always anchor your counting at the valuation date.",
    ],
    latexBlocks: [
      "A=P(1+r)^n\\qquad\\text{(compound interest: geometric growth, ratio }1+r)",
      "V=P(1-r)^n\\qquad\\text{(depreciation: geometric decay, ratio }1-r)",
      "\\text{growth factor}=1+\\text{rate},\\qquad \\text{decay factor}=1-\\text{rate}",
      "\\text{annuity value }=P(1+r)^{n-1}+\\cdots+P(1+r)+P\\quad\\text{(a finite geometric series)}",
    ],
  },
  [
    {
      title: "Compound interest as a geometric sequence",
      questionLatex:
        "\\text{Find the value of }\\$2000\\text{ after 2 years at }5\\%\\text{ p.a. compound interest.}",
      steps: [
        { explanation: "A 5 percent increase keeps the original 100 percent and adds 5 percent, so the annual multiplier is 1 + 0.05, not 0.05.", latex: "\\text{growth factor}=1+0.05=1.05" },
        { explanation: "Two years means the factor is applied twice — interest compounds on the new balance each year.", latex: "2000(1.05)^2" },
        { explanation: "Evaluate: 1.05 squared is 1.1025, then multiply by the principal.", latex: "2000\\times 1.1025=\\$2205" },
      ],
      finalAnswerLatex: "\\$2205",
    },
    {
      title: "Depreciation as a geometric sequence",
      questionLatex:
        "\\text{A computer worth }\\$4000\\text{ depreciates by }10\\%\\text{ p.a. Find its value after 2 years.}",
      steps: [
        { explanation: "Losing 10 percent leaves 90 percent behind, so the decay multiplier is 1 - 0.10.", latex: "\\text{decay factor}=1-0.10=0.90" },
        { explanation: "Apply the factor once per year for two years; the dollar loss shrinks each year because it is a percentage of the current value.", latex: "4000(0.90)^2" },
        { explanation: "Evaluate: 0.9 squared is 0.81, then multiply by the starting value.", latex: "4000\\times 0.81=\\$3240" },
      ],
      finalAnswerLatex: "\\$3240",
    },
    {
      title: "Future value of repeated deposits",
      questionLatex:
        "\\text{Three end-of-year deposits of }\\$1000\\text{ earn }5\\%\\text{ p.a. Find the value immediately after the third deposit.}",
      steps: [
        { explanation: "Count interest periods from the valuation date: the first deposit has grown for two years, the second for one, and the third — just made — for none, so it carries exponent 0.", latex: "1000(1.05)^2+1000(1.05)^1+1000(1.05)^0" },
        { explanation: "These three grown deposits form a geometric series with ratio 1.05; write out each factor.", latex: "1000(1.1025)+1000(1.05)+1000(1)" },
        { explanation: "Add the three amounts: 1102.50 + 1050 + 1000.", latex: "=1102.50+1050+1000=\\$3152.50" },
      ],
      finalAnswerLatex: "\\$3152.50",
    },
  ],
  [
    ssMoney("y12adv-ssfm-fin-g1", "Find the balance after 2 years at 5 percent p.a. compound interest.", "\\text{principal }\\$2000", "2205", [], "Two annual growth factors of 1.05 give $2205."),
    ssMoney("y12adv-ssfm-fin-g2", "Find the depreciated value after 2 years.", "\\text{initial value }\\$4000,\\quad \\text{depreciation }10\\%\\text{ p.a.}", "3240", [], "Two annual depreciation factors of 0.90 give $3240."),
    ssChoice("y12adv-ssfm-fin-g3", "Which ratio models an investment earning 6 percent p.a. compound interest?", "\\text{annual interest }6\\%", "D", ["0.06", "0.94", "6", "1.06"], "A 6 percent increase uses growth factor 1.06."),
    ssChoice("y12adv-ssfm-fin-g4", "Which description best matches the value of regular deposits accumulated with interest?", "\\text{regular deposits with interest}", "C", ["A single arithmetic term", "A limiting sum with r>1", "A finite geometric series", "A constant sequence"], "Each deposit has a different number of growth factors, producing a finite geometric series."),
  ],
  [
    ssMoney("y12adv-ssfm-fin-i1", "Find the value after 2 years if the asset depreciates by 20 percent p.a.", "\\text{initial value }\\$5000", "3200", [], "Two depreciation factors of 0.80 give $3200."),
    ssMoney("y12adv-ssfm-fin-i2", "Find the future value immediately after the third end-of-year deposit.", "\\text{three deposits of }\\$1000,\\quad \\text{interest }5\\%\\text{ p.a.}", "3152.50", ["3152.5"], "The deposits have two, one and zero years of interest respectively."),
    ssChoice("y12adv-ssfm-fin-i3", "Which setup matches four end-of-year deposits of 500 dollars earning 10 percent p.a., valued immediately after the fourth deposit?", "\\text{four deposits, valued after final deposit}", "A", ["$500(1.10)^3+500(1.10)^2+500(1.10)+500$", "$500(1.10)^4$", "$500+500+500+500(1.10)^4$", "$500(0.10)^3+500(0.10)^2+500(0.10)+500$"], "The earliest deposit earns interest for three completed years and the final deposit earns none."),
    ssChoice("y12adv-ssfm-fin-i4", "A loan balance is updated monthly by multiplying by 1.006 before a repayment is subtracted. What does 1.006 represent?", "\\text{monthly update factor}", "B", ["A 0.6 percent monthly decrease", "A 0.6 percent monthly interest factor", "A 6 percent monthly interest factor", "The number of repayments"], "Multiplying by 1.006 applies 0.6 percent interest for the month."),
    ssChoice("y12adv-ssfm-fin-i5", "Which model best represents a car losing the same percentage of its current value each year?", "\\text{percentage depreciation}", "B", ["Arithmetic sequence", "Geometric sequence", "Arithmetic series", "Sigma notation only"], "A fixed percentage change multiplies the current value by the same factor each year."),
  ],
  [
    { mistake: "Confusing a 5 percent rate with a growth factor of 5.", fix: "Use 1.05 for 5 percent growth and 0.95 for 5 percent depreciation." },
    { mistake: "Counting one too many interest periods for the final annuity payment.", fix: "A payment made at the valuation time has no completed interest period." },
    { mistake: "Using an arithmetic sequence for depreciation by a percentage.", fix: "Percentage depreciation is geometric because the dollar decrease changes with the current value." },
    { mistake: "Using a limiting sum for a fixed number of payments.", fix: "A fixed number of payments needs a finite series." },
  ],
  [
    ssMoney("y12adv-ssfm-fin-m1", "Find the balance after 2 years at 10 percent p.a. compound interest.", "\\text{principal }\\$1000", "1210", [], "Two growth factors of 1.10 give $1210."),
    ssMoney("y12adv-ssfm-fin-m2", "Find the value after 3 years of depreciation at 10 percent p.a.", "\\text{initial value }\\$8000", "5832", [], "Three depreciation factors of 0.90 give $5832."),
    ssChoice("y12adv-ssfm-fin-m3", "Which factor represents depreciation of 12 percent each year?", "\\text{annual depreciation }12\\%", "A", ["0.88", "1.12", "0.12", "12"], "After a 12 percent decrease, 88 percent remains."),
    ssChoice("y12adv-ssfm-fin-m4", "Which expression best represents the future value of three annual payments of 1200 dollars valued immediately after the third payment at 4 percent p.a.?", "\\text{three annual payments}", "D", ["$1200(1.04)^3$", "$1200+1200+1200$", "$1200(0.04)^2+1200(0.04)+1200$", "$1200(1.04)^2+1200(1.04)+1200$"], "The three payments earn two, one and zero years of interest."),
    ssMoney("y12adv-ssfm-fin-m5", "Find the accumulated value of the three annual payments immediately after the third payment.", "\\text{payments }\\$1200,\\quad \\text{interest }4\\%\\text{ p.a.}", "3745.92", [], "The future value is 1200 times 1.04 squared plus 1200 times 1.04 plus 1200."),
    ssChoice("y12adv-ssfm-fin-m6", "A savings table starts with the balance after the first monthly deposit. Which exponent should the first listed term have in a geometric growth model for later listed balances before extra deposits?", "\\text{first listed term is after one deposit}", "B", ["1", "0", "n", "-1"], "The first listed term corresponds to exponent 0 in a term sequence."),
    ssChoice("y12adv-ssfm-fin-m7", "Which question would need a series rather than a single compound-interest term?", "\\text{choose the total-type context}", "C", ["Value of one investment after 5 years", "Value of one car after depreciation", "Future value of repeated deposits", "The annual growth factor"], "Repeated deposits create several terms that must be added."),
    ssChoice("y12adv-ssfm-fin-m8", "A student uses 0.07 as the ratio for 7 percent compound interest. What is the error?", "\\text{annual interest }7\\%", "A", ["The growth factor should be 1.07", "The rate must be negative", "The model should always be arithmetic", "The number of years should be the ratio"], "The ratio includes the original 100 percent plus 7 percent interest."),
    ssChoice("y12adv-ssfm-fin-m9", "Four end-of-year deposits earn interest and are valued immediately after the fourth deposit. Which deposit earns the most interest?", "\\text{same deposit each year}", "A", ["The first deposit", "The second deposit", "The fourth deposit", "All deposits earn the same interest"], "The first deposit is invested for the longest time."),
    ssChoice("y12adv-ssfm-fin-m10", "A finance model has monthly growth factor 1.004 and a fixed payment subtracted after interest. Which statement is most accurate?", "\\text{monthly recurrence model}", "C", ["The balance must increase every month", "The payment is multiplied by 1.004 before being subtracted", "Interest is applied before the payment in each update", "The model is a limiting sum only"], "The stated order applies interest first, then subtracts the fixed payment."),
  ]
);

const examPracticeLesson = ssLesson(
  "sequences-series-financial-maths-exam-practice",
  "Sequences, Series and Financial Mathematics Exam Practice",
  "Practise mixed HSC-style questions involving terms, sums, limiting sums, sigma notation, compound interest, depreciation and annuity interpretation.",
  "Apply sequence and series methods flexibly in mixed financial mathematics contexts.",
  [
    "Classify sequence and series models from context.",
    "Calculate terms and finite sums in HSC-style questions.",
    "Use limiting sum reasoning only when conditions are met.",
    "Interpret sigma notation and financial payment timing.",
    "Choose markable formula setups for financial mathematics.",
    "Connect growth factors, ratios and series totals.",
  ],
  {
    paragraphs: [
      "This lesson pulls the whole topic together, and in a mixed exam the hard part is rarely the arithmetic — it is choosing the right tool. Every question in this area is answered by a short decision process, and running that process deliberately is what separates a Band 6 response from a guess. The good news is that all five formulas you need are variations on two ideas you have already justified: 'add the same thing' and 'multiply by the same thing'.",
      "Decision one: is the pattern arithmetic or geometric? Subtract consecutive terms — a constant difference means arithmetic, use $d$. Divide consecutive terms — a constant ratio means geometric, use $r$. A fixed dollar change each period is arithmetic; a fixed percentage change is geometric, because a percentage multiplies the current value rather than adding a set amount.",
      "Decision two: does the question want one value, or a running total? 'The 8th term', 'the value in year 8' — that is a single term, so use $T_n=a+(n-1)d$ or $T_n=ar^{n-1}$. 'The total of', 'the sum', 'how many altogether', 'total interest' — that is a series, so use $S_n=\\frac n2(a+l)$ for arithmetic or $S_n=\\frac{a(1-r^n)}{1-r}$ for geometric. Underline the deciding word before you write anything; mixing up term and total is the most expensive slip in the topic.",
      "Decision three only arises for an unending geometric sum: a limiting total. Here use $S_\\infty=\\frac{a}{1-r}$, but only after checking $|r|<1$ — if the ratio's magnitude is $1$ or more the terms do not shrink and there is no finite answer. And a specified count of terms, even a large one, is never a limiting sum: 'the first 20 deposits' is finite, so it takes $S_n$, not $S_\\infty$.",
      "Financial questions wrap these choices in context, and the extra skill they demand is reading the timing. The exponent on each payment is the number of complete periods between when it is made and the valuation date. A payment made at the valuation moment has had zero periods, so its exponent is $0$; the earliest payment has had the most periods and the largest exponent. Get the first payment, the final payment and the valuation date straight, and the exponents fall into place — this is where careful candidates pick up marks that rushed ones drop.",
    ],
    latexBlocks: [
      "T_n=a+(n-1)d,\\qquad T_n=ar^{n-1}\\qquad\\text{(one term)}",
      "S_n=\\frac n2(a+l),\\qquad S_n=\\frac{a(1-r^n)}{1-r}\\qquad\\text{(a total)}",
      "S_\\infty=\\frac{a}{1-r}\\quad\\text{only when }|r|<1\\qquad\\text{(an endless total)}",
      "\\text{percentage change}\\Rightarrow\\text{geometric};\\quad\\text{fixed amount}\\Rightarrow\\text{arithmetic}",
    ],
  },
  [
    {
      title: "Choose term or sum",
      questionLatex:
        "\\text{A row pattern has 12, 15, 18, ... seats. Find the total seats in the first 10 rows.}",
      steps: [
        { explanation: "The word total means a running sum, and the seats rise by a constant 3 each row, so this is an arithmetic series.", latex: "\\text{total}\\Rightarrow S_{10},\\quad d=3" },
        { explanation: "First-plus-last form needs the tenth term, found by adding 9 differences to the first row.", latex: "l=12+9(3)=39" },
        { explanation: "Pair first and last: 10 terms give 5 pairs, each summing to 12 + 39 = 51.", latex: "S_{10}=\\frac{10}{2}(12+39)=5\\times 51=255" },
      ],
      finalAnswerLatex: "255\\text{ seats}",
    },
    {
      title: "Check limiting sum conditions",
      questionLatex: "\\text{Does }a=20,\\ r=1.05\\text{ have a finite limiting sum?}",
      steps: [
        { explanation: "A limiting sum exists only if the terms shrink, so test the magnitude of the ratio against 1.", latex: "|1.05|=1.05>1" },
        { explanation: "Because the ratio exceeds 1 the terms grow, the partial sums increase without bound, and the formula does not apply.", latex: "r^n\\to\\infty\\ \\Rightarrow\\ \\text{no finite }S_\\infty" },
      ],
      finalAnswerLatex: "\\text{No — } |r|>1\\text{, so no finite limiting sum}",
    },
    {
      title: "Financial series timing",
      questionLatex:
        "\\text{Three deposits of }\\$500\\text{ are made yearly and valued immediately after the third deposit.}",
      steps: [
        { explanation: "Count periods from the valuation date: the first deposit has grown two years, the second one year, the third just made carries exponent 0.", latex: "500(1+i)^2+500(1+i)^1+500(1+i)^0" },
        { explanation: "The three grown deposits form a finite geometric series with first term 500 and ratio 1 + i.", latex: "a=500,\\quad R=1+i,\\quad n=3" },
      ],
      finalAnswerLatex: "500(1+i)^2+500(1+i)+500",
    },
  ],
  [
    ssNumber("y12adv-ssfm-exam-g1", "Find the total seats in the first 10 rows.", "12,\\ 15,\\ 18,\\ldots", "255", [], "This is an arithmetic series with first term 12 and tenth term 39."),
    ssChoice("y12adv-ssfm-exam-g2", "Which method is most appropriate for finding the eighth term only?", "\\text{geometric sequence}", "A", ["Use $T_n$", "Use $S_n$", "Use $S_\\infty$", "Add every possible payment forever"], "A single specified term needs T_n."),
    ssNumber("y12adv-ssfm-exam-g3", "Find the limiting sum if it exists.", "a=20,\\quad r=0.6", "50", [], "The ratio has magnitude less than 1, and the limiting sum is 50."),
    ssMoney("y12adv-ssfm-exam-g4", "Find the value after 2 years at 8 percent p.a. compound interest.", "\\text{principal }\\$5000", "5832", [], "Two growth factors of 1.08 give $5832."),
  ],
  [
    ssChoice("y12adv-ssfm-exam-i1", "Which sequence type matches values that increase by the same percentage each period?", "\\text{same percentage increase}", "B", ["Arithmetic", "Geometric", "Neither", "Always limiting"], "Repeated percentage change is multiplicative."),
    ssNumber("y12adv-ssfm-exam-i2", "Evaluate the sigma sum.", "\\sum_{k=1}^{6}2k", "42", [], "The terms are 2, 4, 6, 8, 10 and 12."),
    ssNumber("y12adv-ssfm-exam-i3", "Find the sum of the first 5 terms.", "a=7,\\quad d=4", "75", [], "The fifth term is 23, so the average of first and last terms is 15."),
    ssChoice("y12adv-ssfm-exam-i4", "Which financial context is best represented by geometric decay?", "\\text{choose one}", "C", ["A fixed 200 dollar bonus each year", "Rows increasing by 3 seats", "A car losing 18 percent of its value each year", "A once-only account fee"], "A fixed percentage loss gives geometric decay."),
    ssChoice("y12adv-ssfm-exam-i5", "Which setup matches five deposits valued immediately after the fifth deposit?", "\\text{five equal deposits of }P\\text{ at ratio }R", "D", ["$PR^5$", "$P+PR+PR^2+PR^3$", "$P(1-R^5)$", "$PR^4+PR^3+PR^2+PR+P$"], "The earliest deposit has four completed growth periods and the final deposit has none."),
  ],
  [
    { mistake: "Choosing a formula before deciding whether the question asks for a term or a total.", fix: "Underline words such as term, total, sum, value, and limiting before starting." },
    { mistake: "Treating all finance questions as compound interest only.", fix: "Regular payments and totals often require a series." },
    { mistake: "Accepting a limiting sum whenever a series is geometric.", fix: "Check the magnitude of the common ratio." },
    { mistake: "Ignoring payment timing in annuity questions.", fix: "Count how many periods each payment earns interest before the valuation date." },
  ],
  [
    ssNumber("y12adv-ssfm-exam-m1", "Find the twelfth term of the arithmetic sequence.", "a=9,\\quad d=4", "53", [], "The twelfth term uses eleven common differences."),
    ssNumber("y12adv-ssfm-exam-m2", "Find the sum of the first 4 terms of the geometric series.", "a=5,\\quad r=3", "200", [], "The terms are 5, 15, 45 and 135."),
    ssChoice("y12adv-ssfm-exam-m3", "Which model fits a scholarship that pays 300 dollars in year 1 and increases by 50 dollars each year?", "\\text{annual payments}", "A", ["Arithmetic sequence", "Geometric sequence", "Limiting geometric series", "Compound interest only"], "The payment increases by a fixed dollar amount."),
    ssNumber("y12adv-ssfm-exam-m4", "Find the limiting sum of the geometric series.", "a=30,\\quad r=0.4", "50", [], "The limiting sum is 30 divided by 0.6."),
    ssChoice("y12adv-ssfm-exam-m5", "Which sigma expression represents the sum of the first 8 positive even integers?", "\\text{positive even integers}", "C", ["$\\sum_{k=1}^{8}k$", "$\\sum_{k=0}^{8}2k$", "$\\sum_{k=1}^{8}2k$", "$\\sum_{k=1}^{8}(2k+1)$"], "The kth positive even integer is 2k, starting at k=1."),
    ssMoney("y12adv-ssfm-exam-m6", "Find the value after 2 years if an item depreciates by 25 percent p.a.", "\\text{initial value }\\$6400", "3600", [], "Two depreciation factors of 0.75 give $3600."),
    ssChoice("y12adv-ssfm-exam-m7", "A student uses a limiting sum for 20 regular deposits. Which option identifies the issue?", "\\text{20 deposits}", "B", ["The common ratio cannot be positive", "There are finitely many deposits", "Deposits cannot form a series", "The first term must be 1"], "Twenty deposits require a finite sum, not an infinite limiting sum."),
    ssChoice("y12adv-ssfm-exam-m8", "Which interpretation of r=0.92 is most appropriate in a yearly value model?", "\\text{yearly ratio }0.92", "D", ["8 percent growth", "92 percent growth", "A fixed decrease of 92 dollars", "8 percent depreciation"], "A ratio of 0.92 means 92 percent remains, so the value falls by 8 percent."),
    ssChoice("y12adv-ssfm-exam-m9", "A fund receives 1000 dollars at the end of each year for 4 years and earns 5 percent p.a. Which expression gives the value immediately after the fourth deposit?", "\\text{four end-of-year deposits}", "A", ["$1000(1.05)^3+1000(1.05)^2+1000(1.05)+1000$", "$1000(1.05)^4$", "$1000+1000+1000+1000$", "$1000(0.05)^3+1000(0.05)^2+1000(0.05)+1000$"], "The first deposit earns three years of interest and the final deposit earns none."),
    ssChoice("y12adv-ssfm-exam-m10", "A sequence has T_2=18 and T_5=486, and it is known to be geometric with positive ratio. What is the common ratio?", "\\text{geometric sequence}", "C", ["2", "4", "3", "9"], "Three ratio steps take 18 to 486, so the ratio cubed is 27 and the ratio is 3."),
  ]
);

export const sequencesSeriesFinancialMathsOutline: LessonOutlineItem[] = [
  {
    id: "arithmetic-geometric-sequences",
    slug: "arithmetic-geometric-sequences",
    title: "Arithmetic and Geometric Sequences Review",
    description:
      "Review nth-term notation, arithmetic and geometric patterns, and HSC-style interpretation.",
    status: "active",
  },
  {
    id: "arithmetic-geometric-series",
    slug: "arithmetic-geometric-series",
    title: "Arithmetic and Geometric Series",
    description:
      "Evaluate finite arithmetic and geometric sums, including sigma notation and contextual totals.",
    status: "active",
  },
  {
    id: "limiting-sums-infinite-series",
    slug: "limiting-sums-infinite-series",
    title: "Limiting Sums and Infinite Series",
    description:
      "Decide when an infinite geometric series converges and use limiting sums in context.",
    status: "active",
  },
  {
    id: "sequences-series-financial-maths",
    slug: "sequences-series-financial-maths",
    title: "Sequences and Series in Financial Mathematics",
    description:
      "Connect compound interest, depreciation and annuity timing to sequence and series models.",
    status: "active",
  },
  {
    id: "sequences-series-financial-maths-exam-practice",
    slug: "sequences-series-financial-maths-exam-practice",
    title: "Sequences, Series and Financial Mathematics Exam Practice",
    description:
      "Practise mixed HSC-style sequence, series, limiting sum and financial mathematics questions.",
    status: "active",
  },
];

arithmeticGeometricSequencesLesson.masteryQuizPool = [
  // D1 — recognition / direct single-step
  poolChoice("y12adv-ssfm-seq-p1", "Which sequence is arithmetic?", "\\text{Choose one}", "B", ["2, 6, 18, 54, ...", "3, 7, 11, 15, ...", "1, 2, 4, 8, ...", "5, 10, 20, 40, ..."], 1, "Adding a constant 4 each time gives an arithmetic sequence."),
  poolChoice("y12adv-ssfm-seq-p2", "Which sequence is geometric?", "\\text{Choose one}", "C", ["4, 7, 10, 13, ...", "2, 5, 8, 11, ...", "3, 6, 12, 24, ...", "10, 8, 6, 4, ..."], 1, "Multiplying by a constant 2 each time gives a geometric sequence."),
  poolNumber("y12adv-ssfm-seq-p3", "Find the common difference of the arithmetic sequence.", "5,\\ 9,\\ 13,\\ 17,\\ldots", "4", 1, "Each term is 4 more than the previous one."),
  poolNumber("y12adv-ssfm-seq-p4", "Find the common ratio of the geometric sequence.", "2,\\ 10,\\ 50,\\ 250,\\ldots", "5", 1, "Each term is 5 times the previous one."),
  // D2 — direct nth-term application
  poolNumber("y12adv-ssfm-seq-p5", "Find the sixth term of the arithmetic sequence.", "a=4,\\quad d=5", "29", 2, "The sixth term is the first term plus five common differences: 4 plus 25."),
  poolNumber("y12adv-ssfm-seq-p6", "Find the tenth term of the arithmetic sequence.", "a=2,\\quad d=3", "29", 2, "The tenth term is the first term plus nine common differences: 2 plus 27."),
  poolNumber("y12adv-ssfm-seq-p7", "Find the fifth term of the geometric sequence.", "a=2,\\quad r=3", "162", 2, "The fifth term is the first term times four factors of the ratio: 2 times 81."),
  poolNumber("y12adv-ssfm-seq-p8", "Find the seventh term of the arithmetic sequence.", "a=1,\\quad d=4", "25", 2, "The seventh term is the first term plus six common differences: 1 plus 24."),
  poolChoice("y12adv-ssfm-seq-p9", "A population decreases by 6 percent each year. Which common ratio models the yearly value?", "\\text{annual decrease }6\\%", "C", ["1.06", "0.06", "0.94", "6"], 2, "A 6 percent decrease leaves 94 percent, so the ratio is 0.94."),
  // D3 — choose model / mild transfer
  poolNumber("y12adv-ssfm-seq-p10", "Find the ninth term of the geometric sequence.", "a=1,\\quad r=2", "256", 3, "The ninth term is the first term times eight factors of 2."),
  poolNumber("y12adv-ssfm-seq-p11", "Find the common difference of the arithmetic sequence.", "T_5=23,\\quad T_8=38", "5", 3, "Three term steps raise the value by 15, so the common difference is 5."),
  poolNumber("y12adv-ssfm-seq-p12", "Find the common ratio of the geometric sequence with positive ratio.", "T_2=6,\\quad T_4=24", "2", 3, "Two ratio steps multiply 6 by 4, so the ratio squared is 4 and the ratio is 2."),
  poolChoice("y12adv-ssfm-seq-p13", "Which nth-term rule represents a geometric sequence with first term 8 and ratio 1.05?", "\\text{first term }8,\\quad r=1.05", "A", ["$T_n=8(1.05)^{n-1}$", "$T_n=8+1.05(n-1)$", "$T_n=1.05(8)^{n-1}$", "$T_n=8(0.05)^{n-1}$"], 3, "A geometric sequence uses the first term times the ratio to the power n minus 1."),
  poolChoice("y12adv-ssfm-seq-p14", "A bank balance grows by the same dollar amount each month. Which model fits the listed balances?", "\\text{fixed dollar growth}", "A", ["Arithmetic sequence", "Geometric sequence", "Limiting sum", "Alternating sequence"], 3, "A fixed dollar increase is repeated addition, which is arithmetic."),
  poolNumber("y12adv-ssfm-seq-p15", "Find the fourth term of the geometric sequence.", "a=80,\\quad r=\\tfrac12", "10", 3, "The fourth term is 80 times one half cubed, which is 80 over 8.", ["10.0"]),
  // D4 — two-step reasoning
  poolNumber("y12adv-ssfm-seq-p16", "Find the eleventh term of the arithmetic sequence.", "T_1=-4,\\quad d=6", "56", 4, "The eleventh term is negative four plus ten common differences of 6."),
  poolNumber("y12adv-ssfm-seq-p17", "An arithmetic sequence has first term 7 and the fourth term is 19. Find the common difference.", "a=7,\\quad T_4=19", "4", 4, "Three common differences raise 7 to 19, so each common difference is 4."),
  poolNumber("y12adv-ssfm-seq-p18", "A geometric sequence has first term 5 and the fourth term is 135. Find the common ratio.", "a=5,\\quad T_4=135", "3", 4, "The ratio cubed multiplies 5 to 135, so the ratio cubed is 27 and the ratio is 3."),
  poolChoice("y12adv-ssfm-seq-p19", "A machine worth 30000 dollars loses 20 percent of its current value each year. Which rule gives the value after n listed annual values, with the first listed value equal to the current value?", "\\text{current value }30000,\\quad \\text{annual decrease }20\\%", "D", ["$T_n=30000(1.2)^{n-1}$", "$T_n=30000-0.2(n-1)$", "$T_n=30000(0.2)^{n-1}$", "$T_n=30000(0.8)^{n-1}$"], 4, "Depreciation by 20 percent uses ratio 0.8, with the first listed value at exponent zero."),
  poolNumber("y12adv-ssfm-seq-p20", "Find the common difference of the arithmetic sequence.", "T_6=4,\\quad T_{11}=-11", "-3", 4, "Five term steps lower the value by 15, so the common difference is negative 3.", ["−3"]),
  poolMoney("y12adv-ssfm-seq-p21", "A balance starts at 2000 dollars and grows by 5 percent each year. Find the third listed value if the first listed value is the starting balance.", "\\text{start }\\$2000,\\quad r=1.05", "2205", 4, "Two growth factors of 1.05 applied to 2000 give the third listed value."),
  poolChoice("y12adv-ssfm-seq-p22", "Which statement correctly distinguishes the models for 5 percent simple yearly growth versus 5 percent compound yearly growth?", "\\text{simple versus compound}", "B", ["Both are geometric sequences", "Simple growth is arithmetic and compound growth is geometric", "Both are arithmetic sequences", "Simple growth is geometric and compound growth is arithmetic"], 4, "Simple interest adds a fixed amount (arithmetic); compound interest multiplies each year (geometric)."),
  // D5 — Band-6 multi-step / mixed AP-GP
  poolNumber("y12adv-ssfm-seq-p23", "An arithmetic sequence has fifth term 23 and tenth term 48. Find the first term.", "T_5=23,\\quad T_{10}=48", "3", 5, "Five steps raise the value by 25, so the common difference is 5 and the first term is 23 minus four fives, namely 3."),
  poolNumber("y12adv-ssfm-seq-p24", "An arithmetic sequence has third term 11 and seventh term 31. Find the twelfth term.", "T_3=11,\\quad T_7=31", "56", 5, "Four steps raise the value by 20, so the common difference is 5 and the first term is 1; the twelfth term is 1 plus eleven fives, namely 56."),
  poolNumber("y12adv-ssfm-seq-p25", "A geometric sequence with positive ratio has second term 12 and fifth term 324. Find the common ratio.", "T_2=12,\\quad T_5=324", "3", 5, "Three ratio steps multiply 12 to 324, so the ratio cubed is 27 and the ratio is 3."),
  poolNumber("y12adv-ssfm-seq-p26", "A geometric sequence with positive ratio has second term 6 and fifth term 48. Find the eighth term.", "T_2=6,\\quad T_5=48", "384", 5, "The ratio cubed is 8, so the ratio is 2 and the first term is 3; the eighth term is 3 times 2 to the seventh, namely 384."),
  poolNumber("y12adv-ssfm-seq-p27", "The first three terms of an arithmetic sequence are x, x+5 and 2x+4. Find the value of x.", "x,\\ x+5,\\ 2x+4", "6", 5, "Equal differences give x+5 minus x equals 2x+4 minus (x+5), so 5 equals x-1 and x is 6."),
  poolChoice("y12adv-ssfm-seq-p28", "An asset of 12000 dollars depreciates 25 percent in the first year and then 25 percent of its reduced value again. A student multiplies 12000 by 0.5. Which option identifies the error?", "\\text{two years of }25\\%\\text{ depreciation}", "A", ["Two factors of 0.75 are needed, not a single subtraction of 50 percent", "The ratio should be 1.25", "Depreciation must be arithmetic", "The asset value cannot fall below the original"], 5, "Each year multiplies by 0.75; the correct value is 12000 times 0.75 squared, not 12000 times 0.5."),
  poolChoice("y12adv-ssfm-seq-p29", "A sequence has terms that are positive and the same value can be reached either by an arithmetic rule with d=4 from first term 3, or a geometric rule from first term 3. For the third terms to match, what must the geometric ratio be?", "\\text{AP: }a=3,\\ d=4", "C", ["$2$", "$\\sqrt5$", "$\\sqrt{\\tfrac{11}{3}}$", "$\\tfrac{11}{3}$"], 5, "The arithmetic third term is 3 plus two fours equals 11; the geometric third term is 3 times r squared, so r squared is 11 over 3 and r is the square root of 11 over 3."),
  poolNumber("y12adv-ssfm-seq-p30", "An arithmetic sequence has eighth term 0 and the fourth term is 12. Find the first term.", "T_8=0,\\quad T_4=12", "21", 5, "Four steps lower the value by 12, so the common difference is negative 3; the first term is the fourth term plus three threes, namely 21."),
];

arithmeticGeometricSequencesLesson.multiPartPractice = [
  {
    id: "y12adv-ssfm-seq-mp1",
    prompt:
      "An arithmetic sequence has third term 7 and eighth term 22.",
    latex: "T_3=7,\\quad T_8=22",
    answer: "3",
    hint: "Find the common difference from the gap between the two given terms, then the first term, then the requested term.",
    explanation:
      "Five steps raise the value by 15, so $d=3$ and $a=T_3-2d=7-6=1$. (a) $d=3$. (b) $T_1=1$. (c) $T_{12}=1+11(3)=34$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the common difference d.", latex: "T_8-T_3=22-7", marks: 2, answer: "3", acceptedAnswers: ["d=3"], hint: "Divide the change in value by the number of term steps.", explanation: "The value rises 15 over 5 steps, so d=3." },
      { key: "b", label: "(b)", prompt: "Find the first term.", latex: "T_3=a+2d", marks: 2, answer: "1", acceptedAnswers: ["a=1"], hint: "Subtract two common differences from the third term.", explanation: "a=7-2(3)=1." },
      { key: "c", label: "(c)", prompt: "Find the twelfth term.", latex: "T_{12}=a+11d", marks: 2, answer: "34", acceptedAnswers: ["T_{12}=34"], hint: "Add eleven common differences to the first term.", explanation: "$T_{12}=1+11(3)=34$." },
    ],
  },
];

arithmeticGeometricSeriesLesson.masteryQuizPool = [
  // D1
  poolChoice("y12adv-ssfm-series-p1", "Which formula gives the sum of an arithmetic series from the first and last terms?", "\\text{Choose one}", "A", ["$S_n=\\frac n2(a+l)$", "$T_n=ar^{n-1}$", "$S_\\infty=\\frac a{1-r}$", "$T_n=a+(n-1)d$"], 1, "The first-plus-last form averages the ends and multiplies by the number of terms."),
  poolChoice("y12adv-ssfm-series-p2", "A series is best described as:", "\\text{Choose one}", "B", ["a single term of a sequence", "the sum of terms of a sequence", "the ratio of two terms", "the difference of two terms"], 1, "A series is the running total of the terms of a sequence."),
  poolNumber("y12adv-ssfm-series-p3", "Evaluate the sigma sum.", "\\sum_{k=1}^{3}(2k+1)", "15", 1, "The terms are 3, 5 and 7, which add to 15."),
  poolNumber("y12adv-ssfm-series-p4", "Find the sum of the first 4 terms of the arithmetic series.", "a=1,\\quad d=1", "10", 1, "The terms 1, 2, 3 and 4 add to 10."),
  // D2
  poolNumber("y12adv-ssfm-series-p5", "Find the sum of the first 10 terms of the arithmetic series.", "a=3,\\quad d=2", "120", 2, "The tenth term is 21, so the sum is 5 times the sum of the ends, 3 plus 21."),
  poolNumber("y12adv-ssfm-series-p6", "Find the sum of the first 5 terms of the geometric series.", "a=2,\\quad r=2", "62", 2, "The terms 2, 4, 8, 16 and 32 add to 62."),
  poolNumber("y12adv-ssfm-series-p7", "Evaluate the sigma sum.", "\\sum_{k=1}^{5}3k", "45", 2, "The terms are 3, 6, 9, 12 and 15."),
  poolNumber("y12adv-ssfm-series-p8", "Find the sum of the first 6 terms of the arithmetic series.", "a=5,\\quad d=4", "90", 2, "The sixth term is 25, so the sum is 3 times the sum of the ends, 5 plus 25."),
  poolChoice("y12adv-ssfm-series-p9", "Which setup is correct for a finite geometric total with first term 7, ratio 2 and 5 terms?", "\\text{Choose one}", "C", ["$\\frac52(7+2)$", "$7(2)^4$", "$\\frac{7(2^5-1)}{2-1}$", "$\\frac{7}{1-2}$"], 2, "A finite geometric total uses the first term, ratio and number of terms in the series formula."),
  // D3
  poolNumber("y12adv-ssfm-series-p10", "Find the sum of the first 8 terms of the arithmetic series.", "a=2,\\quad d=3", "100", 3, "The eighth term is 23, so the sum is 4 times the sum of the ends, 2 plus 23."),
  poolNumber("y12adv-ssfm-series-p11", "Find the sum of the first 4 terms of the geometric series.", "a=5,\\quad r=3", "200", 3, "The terms 5, 15, 45 and 135 add to 200."),
  poolNumber("y12adv-ssfm-series-p12", "Evaluate the sum of the arithmetic series.", "9+13+17+\\cdots+41", "225", 3, "There are 9 terms and the average of the ends 9 and 41 is 25."),
  poolChoice("y12adv-ssfm-series-p13", "Which expression correctly expands the sigma notation?", "\\sum_{k=2}^{4}k^2", "B", ["$2+3+4$", "$2^2+3^2+4^2$", "$1^2+2^2+3^2+4^2$", "$4^2-2^2$"], 3, "The index runs from 2 to 4 and the summand is k squared."),
  poolNumber("y12adv-ssfm-series-p14", "Find the sum of the first 6 terms of the geometric series.", "a=3,\\quad r=2", "189", 3, "The terms 3, 6, 12, 24, 48 and 96 add to 189."),
  poolChoice("y12adv-ssfm-series-p15", "A hall has 20 seats in the front row and 3 extra seats in each later row. Which model gives the total seats in the first 15 rows?", "\\text{row seats increase by 3}", "B", ["A single geometric term", "An arithmetic series", "A limiting sum", "A common ratio only"], 3, "The question asks for a total across rows whose terms increase by a fixed amount, so it is an arithmetic series."),
  // D4
  poolNumber("y12adv-ssfm-series-p16", "Find the sum of the first 12 terms of the arithmetic series.", "a=4,\\quad d=6", "444", 4, "The twelfth term is 70, so the sum is 6 times the sum of the ends, 4 plus 70."),
  poolNumber("y12adv-ssfm-series-p17", "Find the sum of the first 7 terms of the geometric series.", "a=2,\\quad r=3", "2186", 4, "The series uses the finite geometric formula with first term 2, ratio 3 and 7 terms."),
  poolNumber("y12adv-ssfm-series-p18", "Evaluate the sigma sum.", "\\sum_{k=1}^{6}(5k-2)", "93", 4, "The terms are 3, 8, 13, 18, 23 and 28, which add to 93."),
  poolNumber("y12adv-ssfm-series-p19", "An arithmetic series has first term 8 and last term 53 over 10 terms. Find the sum.", "a=8,\\quad l=53,\\quad n=10", "305", 4, "The sum is 5 times the sum of the ends, 8 plus 53, which is 5 times 61."),
  poolChoice("y12adv-ssfm-series-p20", "Which sigma expression represents the sum of the first 8 positive odd numbers?", "\\text{positive odd numbers}", "C", ["$\\sum_{k=1}^{8}k$", "$\\sum_{k=1}^{8}2k$", "$\\sum_{k=1}^{8}(2k-1)$", "$\\sum_{k=0}^{8}(2k-1)$"], 4, "The kth odd number is 2k minus 1, starting at k equals 1."),
  poolNumber("y12adv-ssfm-series-p21", "Find the sum of the first 9 terms of the arithmetic series.", "a=-4,\\quad d=5", "144", 4, "The ninth term is 36, so the sum is 4.5 times the sum of the ends, negative 4 plus 36."),
  // D5 — Band-6 multi-step
  poolNumber("y12adv-ssfm-series-p22", "An arithmetic series has fourth term 20 and ninth term 45. Find the sum of the first 10 terms.", "T_4=20,\\quad T_9=45", "275", 5, "Five steps raise the value by 25, so d=5 and a=5; the sum of 10 terms is 5 times the sum of the ends, 5 plus the tenth term 50."),
  poolNumber("y12adv-ssfm-series-p23", "An arithmetic series has first term 6 and the sum of the first 10 terms is 195. Find the common difference.", "a=6,\\quad S_{10}=195", "3", 5, "The sum gives 5 times 12 plus 9d equals 195, so 12 plus 9d is 39 and d is 3."),
  poolNumber("y12adv-ssfm-series-p24", "Find the sum of the first 6 terms of the geometric series.", "a=4,\\quad r=3", "1456", 5, "The finite geometric total is 4 times 3 to the sixth minus 1, divided by 2, namely 4 times 728 divided by 2."),
  poolNumber("y12adv-ssfm-series-p25", "How many terms of the arithmetic series 5, 8, 11, ... are needed to reach a sum of 440?", "5+8+11+\\cdots", "16", 5, "The sum n over 2 times 10 plus 3(n-1) equals 440 gives 3n squared plus 7n minus 880 equals 0, so n is 16."),
  poolNumber("y12adv-ssfm-series-p26", "An arithmetic series has third term 14 and seventh term 30. Find the sum of the first 8 terms.", "T_3=14,\\quad T_7=30", "152", 5, "Four steps raise the value by 16, so d=4 and a=6; the eighth term is 34 and the sum is 4 times the sum of the ends, 6 plus 34."),
  poolChoice("y12adv-ssfm-series-p27", "A student finds the total interest over 8 years by computing one compound-interest balance and stopping. Which option best identifies the issue?", "\\text{total versus single term}", "D", ["The ratio must be negative", "Sigma notation is banned in finance", "The first term must be zero", "A total across years needs a sum, not a single term value"], 5, "A single balance is one value; a total across years requires a series sum."),
  poolNumber("y12adv-ssfm-series-p28", "Evaluate the sum.", "\\sum_{k=1}^{20}(3k-1)", "610", 5, "The summand 3k minus 1 is arithmetic with first term 2 and twentieth term 59; the sum is 10 times the sum of the ends, 2 plus 59."),
  poolNumber("y12adv-ssfm-series-p29", "A geometric series has first term 3 and the sum of the first 4 terms is 120. Find the positive common ratio.", "a=3,\\quad S_4=120", "3", 5, "The total 3 times 1 plus r plus r squared plus r cubed equals 120 gives the bracket equal to 40, which the positive ratio 3 satisfies as 1 plus 3 plus 9 plus 27."),
  poolNumber("y12adv-ssfm-series-p30", "The sum of the first n terms of an arithmetic series is given by S_n=2n squared plus 3n. Find the tenth term.", "S_n=2n^2+3n", "41", 5, "The tenth term is the difference of the tenth and ninth partial sums, 230 minus 189."),
];

arithmeticGeometricSeriesLesson.multiPartPractice = [
  {
    id: "y12adv-ssfm-series-mp1",
    prompt:
      "An arithmetic series has fourth term 17 and ninth term 37.",
    latex: "T_4=17,\\quad T_9=37",
    answer: "4",
    hint: "Find the common difference, then the first term, then use the sum formula.",
    explanation:
      "Five steps raise the value by 20, so $d=4$ and $a=T_4-3d=17-12=5$. (a) $d=4$. (b) $a=5$. (c) $S_{10}=\\frac{10}{2}(2\\cdot5+9\\cdot4)=5(46)=230$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the common difference d.", latex: "T_9-T_4=37-17", marks: 1, answer: "4", acceptedAnswers: ["d=4"], hint: "Divide the change in value by the number of steps.", explanation: "20 over 5 steps gives d=4." },
      { key: "b", label: "(b)", prompt: "Find the first term a.", latex: "T_4=a+3d", marks: 2, answer: "5", acceptedAnswers: ["a=5"], hint: "Subtract three common differences from the fourth term.", explanation: "a=17-3(4)=5." },
      { key: "c", label: "(c)", prompt: "Find the sum of the first 10 terms.", latex: "S_{10}=\\frac{10}{2}(2a+9d)", marks: 3, answer: "230", acceptedAnswers: ["S_{10}=230"], hint: "Use the sum formula with a, d and n equal to 10.", explanation: "$S_{10}=5(10+36)=5(46)=230$." },
    ],
  },
];

limitingSumsLesson.masteryQuizPool = [
  // D1
  poolChoice("y12adv-ssfm-limit-p1", "An infinite geometric series has a limiting sum when:", "\\text{Choose one}", "B", ["$r>1$", "$|r|<1$", "$a>0$", "$n>10$"], 1, "The limiting sum exists only when the magnitude of the ratio is less than 1."),
  poolChoice("y12adv-ssfm-limit-p2", "Which formula gives the limiting sum of a convergent geometric series?", "\\text{Choose one}", "A", ["$S_\\infty=\\frac a{1-r}$", "$S_n=\\frac n2(a+l)$", "$T_n=ar^{n-1}$", "$S_\\infty=\\frac a{1+r}$"], 1, "The limiting sum is the first term divided by one minus the ratio."),
  poolNumber("y12adv-ssfm-limit-p3", "Find the limiting sum of the geometric series.", "a=8,\\quad r=0.5", "16", 1, "The limiting sum is 8 divided by one minus 0.5, namely 8 divided by 0.5."),
  poolChoice("y12adv-ssfm-limit-p4", "Which ratio gives a convergent infinite geometric series?", "\\text{Choose one}", "C", ["1.5", "-2", "0.6", "1"], 1, "Only 0.6 has magnitude less than 1."),
  // D2
  poolNumber("y12adv-ssfm-limit-p5", "Find the limiting sum of the geometric series.", "a=20,\\quad r=0.5", "40", 2, "The limiting sum is 20 divided by 0.5."),
  poolNumber("y12adv-ssfm-limit-p6", "Find the limiting sum of the geometric series.", "a=6,\\quad r=0.4", "10", 2, "The limiting sum is 6 divided by 0.6."),
  poolChoice("y12adv-ssfm-limit-p7", "Which geometric series has no finite limiting sum?", "\\text{Choose one}", "D", ["$a=4,\\ r=0.5$", "$a=10,\\ r=-0.2$", "$a=3,\\ r=0.9$", "$a=2,\\ r=1.1$"], 2, "A ratio with magnitude greater than 1 makes the terms grow."),
  poolNumber("y12adv-ssfm-limit-p8", "Find the limiting sum of the geometric series.", "a=100,\\quad r=0.8", "500", 2, "The limiting sum is 100 divided by 0.2."),
  poolChoice("y12adv-ssfm-limit-p9", "Which expression represents the recurring decimal shown as a geometric series?", "0.555\\ldots", "A", ["$0.5+0.05+0.005+\\cdots$", "$5+5+5+\\cdots$", "$0.5+0.5^2+0.5^3+\\cdots$", "$0.55+0.555+\\cdots$"], 2, "Each repeated digit contributes the next power of one tenth."),
  // D3
  poolNumber("y12adv-ssfm-limit-p10", "Find the limiting sum of the geometric series.", "a=12,\\quad r=\\tfrac13", "18", 3, "The limiting sum is 12 divided by two thirds."),
  poolNumber("y12adv-ssfm-limit-p11", "Find the limiting sum of the geometric series.", "a=27,\\quad r=\\tfrac23", "81", 3, "The limiting sum is 27 divided by one third."),
  poolNumber("y12adv-ssfm-limit-p12", "Find the limiting sum of the geometric series with a negative ratio.", "a=16,\\quad r=-\\tfrac12", "32/3", 3, "The limiting sum is 16 divided by one and a half, which is 32 over 3.", ["10.666666666666666", "10.67"]),
  poolChoice("y12adv-ssfm-limit-p13", "Which value should the limiting sum formula give for a divergent series?", "\\text{divergent series}", "D", ["zero", "the first term", "twice the first term", "no finite value"], 3, "A divergent series has no finite limiting sum."),
  poolNumber("y12adv-ssfm-limit-p14", "Express the recurring decimal as a simple fraction.", "0.777\\ldots", "7/9", 3, "The series 0.7 plus 0.07 plus dots has first term 0.7 and ratio 0.1, giving 0.7 over 0.9.", ["7 / 9"]),
  // D4
  poolNumber("y12adv-ssfm-limit-p15", "Find the limiting sum of the geometric series.", "a=45,\\quad r=0.4", "75", 4, "The limiting sum is 45 divided by 0.6."),
  poolNumber("y12adv-ssfm-limit-p16", "Express the recurring decimal as a simple fraction.", "0.272727\\ldots", "3/11", 4, "The repeating block 27 over 99 simplifies to 3 over 11.", ["3 / 11"]),
  poolChoice("y12adv-ssfm-limit-p17", "Why is a limiting sum inappropriate for values growing by 3 percent each period?", "\\text{growth factor }1.03", "B", ["The first term is unknown", "The ratio exceeds 1 in magnitude", "The values are negative", "The model is arithmetic"], 4, "A ratio above 1 means the terms do not shrink toward zero."),
  poolNumber("y12adv-ssfm-limit-p18", "Express the recurring decimal as a simple fraction.", "0.444\\ldots", "4/9", 4, "The series with first term 0.4 and ratio 0.1 gives 0.4 over 0.9.", ["4 / 9"]),
  poolNumber("y12adv-ssfm-limit-p19", "Find the limiting sum of the geometric series.", "a=5,\\quad r=0.9", "50", 4, "The limiting sum is 5 divided by 0.1."),
  // D5 — Band-6 (find a or r from S_infinity, recurring with whole part, etc.)
  poolNumber("y12adv-ssfm-limit-p20", "An infinite geometric series has limiting sum 80 and first term 20. Find the common ratio.", "S_\\infty=80,\\quad a=20", "0.75", 5, "One minus the ratio equals the first term over the limiting sum, 20 over 80, namely 0.25, so the ratio is 0.75.", ["3/4"]),
  poolNumber("y12adv-ssfm-limit-p21", "An infinite geometric series has limiting sum 45 and common ratio 0.4. Find the first term.", "S_\\infty=45,\\quad r=0.4", "27", 5, "The first term is the limiting sum times one minus the ratio, 45 times 0.6."),
  poolNumber("y12adv-ssfm-limit-p22", "An infinite geometric series has first term 18 and limiting sum 30. Find the common ratio.", "a=18,\\quad S_\\infty=30", "0.4", 5, "One minus the ratio is 18 over 30, namely 0.6, so the ratio is 0.4.", ["2/5"]),
  poolNumber("y12adv-ssfm-limit-p23", "Express the recurring decimal as a simple fraction.", "0.4545\\ldots", "5/11", 5, "The repeating block 45 over 99 simplifies to 5 over 11.", ["5 / 11"]),
  poolChoice("y12adv-ssfm-limit-p24", "A geometric series has first term 10 and limiting sum 8. What can be concluded?", "a=10,\\quad S_\\infty=8", "C", ["The ratio is 0.2", "The ratio is 0.8", "No such convergent series exists because the limiting sum cannot be less than a positive first term", "The ratio is 1.25"], 5, "For a positive first term and convergent series the limiting sum exceeds the first term, so a limiting sum of 8 below 10 is impossible."),
  poolNumber("y12adv-ssfm-limit-p25", "A ball is dropped from 12 metres and each bounce rises to two thirds of the previous height. Find the total upward distance travelled over all bounces.", "\\text{rises: }8,\\ \\tfrac{16}{3},\\ldots", "24", 5, "The first rise is two thirds of 12, namely 8, with ratio two thirds; the upward total is 8 divided by one third, namely 24."),
  poolChoice("y12adv-ssfm-limit-p26", "A scholarship pays 600 dollars, then 75 percent of the previous payment each year forever. Which is the limiting total paid?", "\\text{first }\\$600,\\quad r=0.75", "B", ["$1800$", "$2400$", "$3000$", "$4800$"], 5, "The limiting total is 600 divided by 0.25, namely 2400."),
  poolNumber("y12adv-ssfm-limit-p27", "An infinite geometric series has limiting sum 50 and first term 30. Find the common ratio.", "S_\\infty=50,\\quad a=30", "0.4", 5, "One minus the ratio is 30 over 50, namely 0.6, so the ratio is 0.4.", ["2/5"]),
  poolNumber("y12adv-ssfm-limit-p28", "The terms of an infinite geometric series add to 9 and the first two terms add to 8. Find the common ratio.", "S_\\infty=9,\\quad a+ar=8", "1/3", 5, "From a equals 9 times one minus r, the first two terms 9(1-r)(1+r) equal 9 times one minus r squared equals 8, so r squared is one ninth and the ratio is one third.", ["0.3333333333333333"]),
  poolChoice("y12adv-ssfm-limit-p29", "Which statement about an infinite geometric series with r equal to negative 0.5 is correct?", "r=-0.5", "A", ["It converges because the magnitude of the ratio is less than 1", "It diverges because the ratio is negative", "Its limiting sum is always zero", "It is an arithmetic series"], 5, "A negative ratio still converges when its magnitude is below 1."),
  poolNumber("y12adv-ssfm-limit-p30", "An infinite geometric series has limiting sum 24 and first term 16. Find the common ratio.", "S_\\infty=24,\\quad a=16", "1/3", 5, "One minus the ratio is 16 over 24, namely two thirds, so the ratio is one third.", ["0.3333333333333333"]),
];

limitingSumsLesson.multiPartPractice = [
  {
    id: "y12adv-ssfm-limit-mp1",
    prompt:
      "An infinite geometric series has first term 24 and common ratio 0.5.",
    latex: "a=24,\\quad r=0.5",
    answer: "yes",
    hint: "First confirm convergence, then apply the limiting sum formula, then find the first term given a new limiting sum.",
    explanation:
      "(a) $|0.5|<1$ so the series converges. (b) $S_\\infty=\\frac{24}{1-0.5}=48$. (c) If a different series with the same ratio has limiting sum 30, then $a=30(1-0.5)=15$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Does the series converge? Answer yes or no.", latex: "|r|<1?", marks: 1, answer: "yes", acceptedAnswers: ["Yes", "YES"], hint: "Compare the magnitude of the ratio with 1.", explanation: "The magnitude of 0.5 is less than 1, so it converges." },
      { key: "b", label: "(b)", prompt: "Find the limiting sum.", latex: "S_\\infty=\\frac{a}{1-r}", marks: 2, answer: "48", acceptedAnswers: ["S=48"], hint: "Divide the first term by one minus the ratio.", explanation: "$S_\\infty=24$ divided by 0.5 equals 48." },
      { key: "c", label: "(c)", prompt: "A second series also has ratio 0.5 but a limiting sum of 30. Find its first term.", latex: "a=S_\\infty(1-r)", marks: 2, answer: "15", acceptedAnswers: ["a=15"], hint: "Rearrange the limiting sum formula for a.", explanation: "a=30 times 0.5 equals 15." },
    ],
  },
];

sequencesSeriesFinanceLesson.masteryQuizPool = [
  // D1
  poolChoice("y12adv-ssfm-fin-p1", "Which growth factor models 8 percent annual compound interest?", "\\text{Choose one}", "C", ["0.08", "0.92", "1.08", "8"], 1, "An 8 percent increase uses the factor 1.08."),
  poolChoice("y12adv-ssfm-fin-p2", "Which factor models 10 percent annual depreciation?", "\\text{Choose one}", "B", ["1.10", "0.90", "0.10", "10"], 1, "After a 10 percent decrease, 90 percent remains."),
  poolMoney("y12adv-ssfm-fin-p3", "Find the balance after 1 year at 5 percent p.a. compound interest.", "\\text{principal }\\$2000", "2100", 1, "One growth factor of 1.05 applied to 2000 gives 2100."),
  poolChoice("y12adv-ssfm-fin-p4", "Compound interest on a single deposit is modelled by which kind of sequence?", "\\text{Choose one}", "B", ["Arithmetic", "Geometric", "Limiting", "Constant"], 1, "Each period multiplies the balance by a fixed factor, which is geometric."),
  // D2
  poolMoney("y12adv-ssfm-fin-p5", "Find the balance after 2 years at 5 percent p.a. compound interest.", "\\text{principal }\\$4000", "4410", 2, "Two growth factors of 1.05 applied to 4000 give 4410."),
  poolMoney("y12adv-ssfm-fin-p6", "Find the value after 2 years of depreciation at 10 percent p.a.", "\\text{initial value }\\$2000", "1620", 2, "Two depreciation factors of 0.90 applied to 2000 give 1620."),
  poolChoice("y12adv-ssfm-fin-p7", "Which growth factor models 3.5 percent annual compound interest?", "\\text{Choose one}", "A", ["1.035", "0.965", "0.035", "3.5"], 2, "A 3.5 percent increase uses the factor 1.035."),
  poolMoney("y12adv-ssfm-fin-p8", "Find the value after 3 years of depreciation at 20 percent p.a.", "\\text{initial value }\\$5000", "2560", 2, "Three depreciation factors of 0.80 applied to 5000 give 2560."),
  poolChoice("y12adv-ssfm-fin-p9", "Which description best matches the accumulated value of several equal deposits earning interest?", "\\text{regular deposits}", "C", ["A single arithmetic term", "A limiting sum with r above 1", "A finite geometric series", "A constant sequence"], 2, "Each deposit earns interest for a different number of periods, giving a finite geometric series."),
  // D3
  poolMoney("y12adv-ssfm-fin-p10", "Find the balance after 3 years at 10 percent p.a. compound interest.", "\\text{principal }\\$1000", "1331", 3, "Three growth factors of 1.10 applied to 1000 give 1331."),
  poolMoney("y12adv-ssfm-fin-p11", "Find the value after 2 years of depreciation at 25 percent p.a.", "\\text{initial value }\\$8000", "4500", 3, "Two depreciation factors of 0.75 applied to 8000 give 4500."),
  poolChoice("y12adv-ssfm-fin-p12", "A loan balance is multiplied by 1.007 each month before a repayment is subtracted. What does 1.007 represent?", "\\text{monthly factor}", "B", ["A 0.7 percent monthly decrease", "A 0.7 percent monthly interest factor", "A 7 percent monthly interest factor", "The number of repayments"], 3, "Multiplying by 1.007 applies 0.7 percent interest for the month."),
  poolMoney("y12adv-ssfm-fin-p13", "Find the value immediately after the third end-of-year deposit.", "\\text{three deposits of }\\$1000,\\ 5\\%\\text{ p.a.}", "3152.50", 3, "The deposits earn two, one and zero years of interest at 1.05.", ["3152.5"]),
  poolChoice("y12adv-ssfm-fin-p14", "Which setup matches four end-of-year deposits of 600 dollars at 10 percent p.a., valued immediately after the fourth deposit?", "\\text{four deposits}", "A", ["$600(1.10)^3+600(1.10)^2+600(1.10)+600$", "$600(1.10)^4$", "$600+600+600+600(1.10)^4$", "$600(0.10)^3+600(0.10)^2+600(0.10)+600$"], 3, "The earliest deposit earns three completed years of interest and the final deposit earns none."),
  // D4
  poolMoney("y12adv-ssfm-fin-p15", "Find the balance after 4 years at 10 percent p.a. compound interest.", "\\text{principal }\\$1000", "1464.10", 4, "Four growth factors of 1.10 applied to 1000 give 1464.10."),
  poolMoney("y12adv-ssfm-fin-p16", "Find the value after 3 years of depreciation at 10 percent p.a.", "\\text{initial value }\\$8000", "5832", 4, "Three depreciation factors of 0.90 applied to 8000 give 5832."),
  poolMoney("y12adv-ssfm-fin-p17", "Find the accumulated value immediately after the third annual payment.", "\\text{payments }\\$1200,\\ 4\\%\\text{ p.a.}", "3745.92", 4, "The payments earn two, one and zero years of interest at 1.04."),
  poolChoice("y12adv-ssfm-fin-p18", "A student uses 0.06 as the ratio for 6 percent compound interest. What is the error?", "\\text{annual interest }6\\%", "A", ["The growth factor should be 1.06", "The rate must be negative", "The model should be arithmetic", "The years should be the ratio"], 4, "The ratio includes the original 100 percent plus the 6 percent interest."),
  poolMoney("y12adv-ssfm-fin-p19", "Find the value immediately after the third end-of-year deposit.", "\\text{three deposits of }\\$2000,\\ 5\\%\\text{ p.a.}", "6305", 4, "The deposits earn two, one and zero years of interest at 1.05, doubling the 1000-deposit total."),
  // D5 — Band-6
  poolMoney("y12adv-ssfm-fin-p20", "Find the future value immediately after the third end-of-year deposit.", "\\text{three deposits of }\\$1500,\\ 6\\%\\text{ p.a.}", "4775.40", 5, "The total is 1500 times the sum of 1.06 squared, 1.06 and 1, namely 1500 times 3.1836."),
  poolMoney("y12adv-ssfm-fin-p21", "Find the future value immediately after the fourth end-of-year deposit.", "\\text{four deposits of }\\$1000,\\ 5\\%\\text{ p.a.}", "4310.13", 5, "The total is 1000 times the sum of 1.05 cubed, 1.05 squared, 1.05 and 1.", ["4310.125"]),
  poolMoney("y12adv-ssfm-fin-p22", "A 12000 dollar asset depreciates 25 percent per year. Find its value after 2 years.", "\\text{initial }\\$12000,\\ 25\\%\\text{ p.a.}", "6750", 5, "Two depreciation factors of 0.75 applied to 12000 give 6750."),
  poolChoice("y12adv-ssfm-fin-p23", "Four end-of-year deposits earn interest and are valued immediately after the fourth deposit. Which deposit earns the most interest?", "\\text{equal yearly deposits}", "A", ["The first deposit", "The second deposit", "The fourth deposit", "All earn the same"], 5, "The first deposit is invested for the longest time, so it earns the most interest."),
  poolMoney("y12adv-ssfm-fin-p24", "Find the value after 2 years at 8 percent p.a. compound interest.", "\\text{principal }\\$5000", "5832", 5, "Two growth factors of 1.08 applied to 5000 give 5832."),
  poolChoice("y12adv-ssfm-fin-p25", "A finance model applies the monthly factor 1.004 and then subtracts a fixed repayment. Which statement is most accurate?", "\\text{monthly recurrence}", "C", ["The balance must rise every month", "The repayment is multiplied by 1.004 before subtraction", "Interest is applied before the repayment in each update", "The model is a limiting sum"], 5, "The stated order applies interest first, then subtracts the fixed repayment."),
  poolNumber("y12adv-ssfm-fin-p26", "An investment grows from 4000 dollars to 9000 dollars. By what overall growth factor did it increase?", "4000\\to9000", "2.25", 5, "The growth factor is the final value divided by the initial value, 9000 over 4000.", ["9/4"]),
  poolChoice("y12adv-ssfm-fin-p27", "Which question requires a series rather than a single compound-interest term?", "\\text{choose the total-type context}", "C", ["Value of one investment after 6 years", "Value of one machine after depreciation", "Future value of several yearly deposits", "The annual growth factor"], 5, "Several deposits create multiple terms that must be added, which needs a series."),
  poolMoney("y12adv-ssfm-fin-p28", "Find the value after 2 years of depreciation at 15 percent p.a.", "\\text{initial value }\\$20000", "14450", 5, "Two depreciation factors of 0.85 applied to 20000 give 14450."),
  poolMoney("y12adv-ssfm-fin-p29", "Find the future value immediately after the third end-of-year deposit.", "\\text{three deposits of }\\$800,\\ 10\\%\\text{ p.a.}", "2648", 5, "The total is 800 times the sum of 1.10 squared, 1.10 and 1, namely 800 times 3.31."),
  poolChoice("y12adv-ssfm-fin-p30", "A savings table lists balances starting with the balance after the first deposit. Which exponent should the first listed term carry in a geometric term model for later balances before extra deposits?", "\\text{first listed term}", "B", ["1", "0", "n", "-1"], 5, "The first listed term corresponds to exponent zero in a term sequence."),
];

sequencesSeriesFinanceLesson.multiPartPractice = [
  {
    id: "y12adv-ssfm-fin-mp1",
    prompt:
      "Geeta deposits 1000 dollars at the end of each year into an account earning 6 percent per annum compound interest. The account is valued immediately after the third deposit. Give money answers to the nearest cent.",
    latex: "\\text{deposits }\\$1000,\\quad 6\\%\\text{ p.a.}",
    answer: "1123.60",
    hint: "Work out how many years each deposit earns interest, value the oldest deposit, then add all three.",
    explanation:
      "The first deposit earns 2 years of interest, the second 1 year, the third none. (a) $1000(1.06)^2=1123.60$. (b) $1000(1.06)=1060.00$. (c) Total $=1123.60+1060.00+1000=3183.60$.",
    parts: [
      { key: "a", label: "(a)", prompt: "Find the value of the first deposit at the valuation time.", latex: "1000(1.06)^2", marks: 2, answer: "1123.60", acceptedAnswers: ["1123.6"], hint: "Apply two growth factors of 1.06.", explanation: "1000 times 1.1236 equals 1123.60." },
      { key: "b", label: "(b)", prompt: "Find the value of the second deposit at the valuation time.", latex: "1000(1.06)", marks: 1, answer: "1060.00", acceptedAnswers: ["1060", "1060.0"], hint: "Apply one growth factor of 1.06.", explanation: "1000 times 1.06 equals 1060.00." },
      { key: "c", label: "(c)", prompt: "Find the total value immediately after the third deposit.", latex: "1000(1.06)^2+1000(1.06)+1000", marks: 3, answer: "3183.60", acceptedAnswers: ["3183.6"], hint: "Add the three deposit values, remembering the third earns no interest.", explanation: "1123.60 plus 1060.00 plus 1000 equals 3183.60." },
    ],
  },
];

examPracticeLesson.masteryQuizPool = [
  // D1
  poolChoice("y12adv-ssfm-exam-p1", "Which formula finds a single specified term of a geometric sequence?", "\\text{Choose one}", "A", ["$T_n=ar^{n-1}$", "$S_n=\\frac n2(a+l)$", "$S_\\infty=\\frac a{1-r}$", "$d=T_{n+1}-T_n$"], 1, "A single term of a geometric sequence uses the nth-term rule."),
  poolChoice("y12adv-ssfm-exam-p2", "Values that increase by the same percentage each period form which kind of sequence?", "\\text{Choose one}", "B", ["Arithmetic", "Geometric", "Neither", "Constant"], 1, "Repeated percentage change is multiplicative, hence geometric."),
  poolNumber("y12adv-ssfm-exam-p3", "Evaluate the sigma sum.", "\\sum_{k=1}^{4}2k", "20", 1, "The terms 2, 4, 6 and 8 add to 20."),
  poolNumber("y12adv-ssfm-exam-p4", "Find the limiting sum of the geometric series.", "a=10,\\quad r=0.5", "20", 1, "The limiting sum is 10 divided by 0.5."),
  // D2
  poolNumber("y12adv-ssfm-exam-p5", "Find the eighth term of the arithmetic sequence.", "a=3,\\quad d=4", "31", 2, "The eighth term is 3 plus seven common differences of 4."),
  poolNumber("y12adv-ssfm-exam-p6", "Find the sum of the first 5 terms of the geometric series.", "a=2,\\quad r=3", "242", 2, "The terms 2, 6, 18, 54 and 162 add to 242."),
  poolMoney("y12adv-ssfm-exam-p7", "Find the value after 2 years at 8 percent p.a. compound interest.", "\\text{principal }\\$5000", "5832", 2, "Two growth factors of 1.08 applied to 5000 give 5832."),
  poolNumber("y12adv-ssfm-exam-p8", "Find the limiting sum of the geometric series.", "a=30,\\quad r=0.4", "50", 2, "The limiting sum is 30 divided by 0.6."),
  poolChoice("y12adv-ssfm-exam-p9", "Which financial context is best modelled by geometric decay?", "\\text{choose one}", "C", ["A fixed 200 dollar bonus each year", "Rows increasing by 3 seats", "A car losing 18 percent of its value each year", "A once-only fee"], 2, "A fixed percentage loss each year is geometric decay."),
  // D3
  poolNumber("y12adv-ssfm-exam-p10", "Find the total seats in the first 12 rows.", "10,\\ 14,\\ 18,\\ldots", "384", 3, "This arithmetic series has first term 10 and twelfth term 54, so the sum is 6 times their sum 64."),
  poolNumber("y12adv-ssfm-exam-p11", "Find the sum of the first 6 terms of the arithmetic series.", "a=5,\\quad d=5", "105", 3, "The sixth term is 30, so the sum is 3 times the sum of the ends, 5 plus 30."),
  poolNumber("y12adv-ssfm-exam-p12", "Find the limiting sum of the geometric series.", "a=24,\\quad r=\\tfrac13", "36", 3, "The limiting sum is 24 divided by two thirds."),
  poolMoney("y12adv-ssfm-exam-p13", "Find the value after 2 years of depreciation at 25 percent p.a.", "\\text{initial value }\\$6400", "3600", 3, "Two depreciation factors of 0.75 applied to 6400 give 3600."),
  poolChoice("y12adv-ssfm-exam-p14", "Which sigma expression gives the sum of the first 8 positive even integers?", "\\text{positive even integers}", "C", ["$\\sum_{k=1}^{8}k$", "$\\sum_{k=0}^{8}2k$", "$\\sum_{k=1}^{8}2k$", "$\\sum_{k=1}^{8}(2k+1)$"], 3, "The kth positive even integer is 2k starting at k equals 1."),
  // D4
  poolNumber("y12adv-ssfm-exam-p15", "Find the twelfth term of the arithmetic sequence.", "a=9,\\quad d=4", "53", 4, "The twelfth term is 9 plus eleven common differences of 4."),
  poolNumber("y12adv-ssfm-exam-p16", "Find the sum of the first 4 terms of the geometric series.", "a=5,\\quad r=3", "200", 4, "The terms 5, 15, 45 and 135 add to 200."),
  poolNumber("y12adv-ssfm-exam-p17", "Evaluate the sigma sum.", "\\sum_{k=1}^{5}(4k-1)", "55", 4, "The terms are 3, 7, 11, 15 and 19, which add to 55."),
  poolChoice("y12adv-ssfm-exam-p18", "A student uses a limiting sum for 20 regular deposits. Which option identifies the issue?", "\\text{20 deposits}", "B", ["The ratio cannot be positive", "There are finitely many deposits", "Deposits cannot form a series", "The first term must be 1"], 4, "Twenty deposits require a finite sum, not an infinite limiting sum."),
  poolMoney("y12adv-ssfm-exam-p19", "Find the value after 3 years at 10 percent p.a. compound interest.", "\\text{principal }\\$2000", "2662", 4, "Three growth factors of 1.10 applied to 2000 give 2662."),
  // D5 — Band-6
  poolNumber("y12adv-ssfm-exam-p20", "A geometric sequence with positive ratio has second term 18 and fifth term 486. Find the common ratio.", "T_2=18,\\quad T_5=486", "3", 5, "Three ratio steps multiply 18 to 486, so the ratio cubed is 27 and the ratio is 3."),
  poolNumber("y12adv-ssfm-exam-p21", "An arithmetic series has fourth term 16 and ninth term 41. Find the sum of the first 10 terms.", "T_4=16,\\quad T_9=41", "260", 5, "Five steps raise the value by 25, so d=5 and a=1; the tenth term is 46 and the sum is 5 times the sum of the ends, 1 plus 46."),
  poolNumber("y12adv-ssfm-exam-p22", "An infinite geometric series has limiting sum 60 and first term 24. Find the common ratio.", "S_\\infty=60,\\quad a=24", "0.6", 5, "One minus the ratio is 24 over 60, namely 0.4, so the ratio is 0.6.", ["3/5"]),
  poolMoney("y12adv-ssfm-exam-p23", "A fund receives 1000 dollars at the end of each year for 4 years at 5 percent p.a. Find the value immediately after the fourth deposit.", "\\text{four deposits of }\\$1000,\\ 5\\%", "4310.13", 5, "The total is 1000 times the sum of 1.05 cubed, 1.05 squared, 1.05 and 1.", ["4310.125"]),
  poolNumber("y12adv-ssfm-exam-p24", "Express the recurring decimal as a simple fraction.", "0.363636\\ldots", "4/11", 5, "The repeating block 36 over 99 simplifies to 4 over 11.", ["4 / 11"]),
  poolChoice("y12adv-ssfm-exam-p25", "Which interpretation of r equal to 0.92 is correct in a yearly value model?", "\\text{yearly ratio }0.92", "D", ["8 percent growth", "92 percent growth", "A fixed decrease of 92 dollars", "8 percent depreciation"], 5, "A ratio of 0.92 means 92 percent remains, so the value falls by 8 percent each year."),
  poolNumber("y12adv-ssfm-exam-p26", "How many terms of the arithmetic series 2, 5, 8, ... are needed to reach a sum of 100?", "2+5+8+\\cdots", "8", 5, "The sum n over 2 times 4 plus 3(n-1) equals 100 gives 3n squared plus n minus 200 equals 0, so n is 8."),
  poolNumber("y12adv-ssfm-exam-p27", "An arithmetic sequence has fifth term 0 and second term 9. Find the first term.", "T_5=0,\\quad T_2=9", "12", 5, "Three steps lower the value by 9, so the common difference is negative 3; the first term is the second term plus one three, namely 12."),
  poolChoice("y12adv-ssfm-exam-p28", "A series pays 5000 dollars in year 1 and increases by 500 dollars each year for 6 years. Which value is required before the first-plus-last form can be used?", "\\text{arithmetic payments}", "A", ["The sixth payment", "The common ratio", "The limiting sum", "The present value"], 5, "First-plus-last form needs the final payment, which is the sixth one here."),
  poolNumber("y12adv-ssfm-exam-p29", "The partial sums of a series satisfy S_n=3n squared minus n. Find the seventh term.", "S_n=3n^2-n", "38", 5, "The seventh term is the difference of the seventh and sixth partial sums, 140 minus 102."),
  poolMoney("y12adv-ssfm-exam-p30", "A 15000 dollar car depreciates 20 percent in its first year and 10 percent in its second year. Find its value after 2 years.", "\\text{first }20\\%\\text{ then }10\\%", "10800", 5, "Apply 0.8 then 0.9 to 15000: 15000 times 0.8 is 12000, times 0.9 is 10800."),
];

examPracticeLesson.multiPartPractice = [
  {
    id: "y12adv-ssfm-exam-mp1",
    prompt:
      "A theatre has 24 seats in the first row, and each later row has 4 more seats than the row in front of it.",
    latex: "24,\\ 28,\\ 32,\\ldots",
    answer: "60",
    hint: "Use the arithmetic nth-term rule for a single row, then the series sum for the total seats.",
    explanation:
      "Here $a=24$ and $d=4$. (a) $T_{10}=24+9(4)=60$. (b) $S_{10}=\\frac{10}{2}(24+60)=420$. (c) The 20th row has $T_{20}=24+19(4)=100$ seats.",
    parts: [
      { key: "a", label: "(a)", prompt: "How many seats are in the tenth row?", latex: "T_{10}=a+9d", marks: 2, answer: "60", acceptedAnswers: ["60 seats"], hint: "Add nine common differences to the first row's seats.", explanation: "$T_{10}=24+9(4)=60$." },
      { key: "b", label: "(b)", prompt: "Find the total number of seats in the first 10 rows.", latex: "S_{10}=\\frac{10}{2}(a+l)", marks: 2, answer: "420", acceptedAnswers: ["420 seats"], hint: "Use the first-plus-last sum form with the tenth-row value.", explanation: "$S_{10}=5(24+60)=420$." },
      { key: "c", label: "(c)", prompt: "How many seats are in the twentieth row?", latex: "T_{20}=a+19d", marks: 2, answer: "100", acceptedAnswers: ["100 seats"], hint: "Add nineteen common differences to the first row's seats.", explanation: "$T_{20}=24+19(4)=100$." },
    ],
  },
];

export const sequencesSeriesFinancialMathsLessons = [
  arithmeticGeometricSequencesLesson,
  arithmeticGeometricSeriesLesson,
  limitingSumsLesson,
  sequencesSeriesFinanceLesson,
  examPracticeLesson,
];
