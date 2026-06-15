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
    moduleSlug: "ma-m1-modelling-financial-situations",
    moduleTitle: "Modelling Financial Situations",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Financial Mathematics",
    focus: "Sequences, series and financial mathematics",
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
      "A sequence is an ordered list of terms. In HSC questions, the position of a term matters just as much as the pattern itself.",
      "An arithmetic sequence changes by adding the same amount each time. Its nth term depends on the first term and the common difference.",
      "A geometric sequence changes by multiplying by the same factor each time. This is the natural model for repeated percentage growth or depreciation.",
      "Financial sequences often use a growth factor. A 4 percent increase has ratio 1.04, while a 12 percent decrease has ratio 0.88.",
    ],
    latexBlocks: [
      "T_n=a+(n-1)d",
      "T_n=ar^{n-1}",
      "d=T_{n+1}-T_n",
      "r=\\frac{T_{n+1}}{T_n}",
    ],
  },
  [
    {
      title: "Find a term in an arithmetic sequence",
      questionLatex:
        "\\text{An arithmetic sequence has }a=7\\text{ and }d=3.\\text{ Find }T_{20}.",
      steps: [
        { explanation: "Use the arithmetic nth-term rule.", latex: "T_n=a+(n-1)d" },
        { explanation: "Substitute the first term, difference and position.", latex: "T_{20}=7+19(3)" },
        { explanation: "Evaluate the term.", latex: "T_{20}=64" },
      ],
      finalAnswerLatex: "64",
    },
    {
      title: "Find a term in a geometric sequence",
      questionLatex:
        "\\text{A geometric sequence has }a=5\\text{ and }r=2.\\text{ Find }T_6.",
      steps: [
        { explanation: "Use the geometric nth-term rule.", latex: "T_n=ar^{n-1}" },
        { explanation: "The sixth term uses five multiplications by the ratio.", latex: "T_6=5(2)^5" },
        { explanation: "Evaluate.", latex: "T_6=160" },
      ],
      finalAnswerLatex: "160",
    },
    {
      title: "Classify a sequence",
      questionLatex: "4,\\ 7,\\ 10,\\ 13,\\ldots",
      steps: [
        { explanation: "Compare consecutive terms.", latex: "7-4=3,\\quad 10-7=3" },
        { explanation: "The difference is constant.", latex: "d=3" },
        { explanation: "So the sequence is arithmetic.", latex: "\\text{arithmetic}" },
      ],
      finalAnswerLatex: "\\text{arithmetic}",
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
    ssNumber("y12adv-ssfm-seq-i4", "Find the sixth term of the geometric sequence.", "a=81,\\quad r=\\frac13", "1/3", ["1/3", "1 / 3"], "T_6=81\\times\\left(\\tfrac13\\right)^5=\\tfrac{81}{243}=\\tfrac13. Five multiplications by one third give one third."),
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
      "A series is a sum of terms from a sequence. Many HSC errors come from using a term formula when a total is required.",
      "For arithmetic series, the average of the first and last terms is multiplied by the number of terms.",
      "For geometric series, each term is produced by multiplying the previous term by the same ratio, so the total uses powers of the ratio.",
      "Sigma notation is a compact way to write a sum. The index tells you which values to substitute before adding.",
    ],
    latexBlocks: [
      "S_n=\\frac n2(a+l)",
      "S_n=\\frac n2\\left(2a+(n-1)d\\right)",
      "S_n=\\frac{a(1-r^n)}{1-r}\\quad (r\\ne1)",
      "\\sum_{k=1}^{n}u_k=u_1+u_2+\\cdots+u_n",
    ],
  },
  [
    {
      title: "Arithmetic series total",
      questionLatex:
        "\\text{Find the sum of 20 arithmetic terms with }a=12\\text{ and }d=2.",
      steps: [
        { explanation: "Find the last term.", latex: "l=12+19(2)=50" },
        { explanation: "Use the arithmetic series formula.", latex: "S_{20}=\\frac{20}{2}(12+50)" },
        { explanation: "Evaluate the total.", latex: "S_{20}=620" },
      ],
      finalAnswerLatex: "620",
    },
    {
      title: "Geometric series total",
      questionLatex: "\\text{Find }S_6\\text{ for }a=5\\text{ and }r=2.",
      steps: [
        { explanation: "Use the finite geometric series formula.", latex: "S_n=\\frac{a(r^n-1)}{r-1}" },
        { explanation: "Substitute the values.", latex: "S_6=\\frac{5(2^6-1)}{2-1}" },
        { explanation: "Evaluate.", latex: "S_6=315" },
      ],
      finalAnswerLatex: "315",
    },
    {
      title: "Expand sigma notation",
      questionLatex: "\\sum_{k=1}^{5}(3k+1)",
      steps: [
        { explanation: "Substitute k=1 to k=5.", latex: "4+7+10+13+16" },
        { explanation: "Add the terms.", latex: "50" },
      ],
      finalAnswerLatex: "50",
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
      "An infinite geometric series may approach a finite total if its terms shrink quickly enough.",
      "The condition is based on the common ratio. If the magnitude of the ratio is less than 1, the terms get closer to zero and the series has a limiting sum.",
      "If the ratio has magnitude 1 or greater, the infinite sum does not settle to a finite value.",
      "Limiting sums can model repeated proportional effects, but a finance context must still make sense before the formula is used.",
    ],
    latexBlocks: [
      "|r|<1",
      "S_\\infty=\\frac{a}{1-r}",
      "|r|\\ge1\\quad \\Rightarrow\\quad \\text{no finite limiting sum}",
    ],
  },
  [
    {
      title: "Find a limiting sum",
      questionLatex: "a=12,\\quad r=\\frac13",
      steps: [
        { explanation: "Check the convergence condition.", latex: "\\left|\\frac13\\right|<1" },
        { explanation: "Use the limiting sum formula.", latex: "S_\\infty=\\frac{12}{1-\\frac13}" },
        { explanation: "Evaluate.", latex: "S_\\infty=18" },
      ],
      finalAnswerLatex: "18",
    },
    {
      title: "Decide whether a limiting sum exists",
      questionLatex: "a=5,\\quad r=1.2",
      steps: [
        { explanation: "Check the ratio.", latex: "|1.2|>1" },
        { explanation: "The terms grow rather than shrink.", latex: "\\text{no finite limiting sum}" },
      ],
      finalAnswerLatex: "\\text{no finite limiting sum}",
    },
    {
      title: "Recurring decimal as a geometric series",
      questionLatex: "0.777\\ldots",
      steps: [
        { explanation: "Write the decimal as a geometric series.", latex: "0.7+0.07+0.007+\\cdots" },
        { explanation: "Identify the first term and ratio.", latex: "a=0.7,\\quad r=0.1" },
        { explanation: "Use the limiting sum formula.", latex: "S_\\infty=\\frac{0.7}{1-0.1}=\\frac79" },
      ],
      finalAnswerLatex: "\\frac79",
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
      "Compound interest is geometric because each period multiplies the previous balance by a growth factor.",
      "Depreciation is also geometric, but the ratio is less than 1 because the value decreases by a fixed percentage of its current value.",
      "Annuities connect to geometric series because regular payments may earn interest for different numbers of periods.",
      "The hardest part is often timing: identify whether a payment occurs at the start or end of a period before counting growth factors.",
    ],
    latexBlocks: [
      "A=P(1+r)^n",
      "V=P(1-r)^n",
      "\\text{growth factor}=1+\\text{rate}",
      "\\text{depreciation factor}=1-\\text{rate}",
      "\\text{annuity totals can be written as finite geometric series}",
    ],
  },
  [
    {
      title: "Compound interest as a geometric sequence",
      questionLatex:
        "\\text{Find the value of }\\$2000\\text{ after 2 years at }5\\%\\text{ p.a. compound interest.}",
      steps: [
        { explanation: "The annual growth factor is 1.05.", latex: "r=1.05" },
        { explanation: "Apply two growth factors.", latex: "2000(1.05)^2" },
        { explanation: "Evaluate the balance.", latex: "\\$2205" },
      ],
      finalAnswerLatex: "\\$2205",
    },
    {
      title: "Depreciation as a geometric sequence",
      questionLatex:
        "\\text{A computer worth }\\$4000\\text{ depreciates by }10\\%\\text{ p.a. Find its value after 2 years.}",
      steps: [
        { explanation: "The annual depreciation factor is 0.90.", latex: "r=0.90" },
        { explanation: "Apply two depreciation factors.", latex: "4000(0.90)^2" },
        { explanation: "Evaluate.", latex: "\\$3240" },
      ],
      finalAnswerLatex: "\\$3240",
    },
    {
      title: "Future value of repeated deposits",
      questionLatex:
        "\\text{Three end-of-year deposits of }\\$1000\\text{ earn }5\\%\\text{ p.a. Find the value immediately after the third deposit.}",
      steps: [
        { explanation: "The first deposit earns interest for two years, the second for one year, and the third for no completed years.", latex: "1000(1.05)^2+1000(1.05)+1000" },
        { explanation: "This is a finite geometric series.", latex: "1000(1.1025+1.05+1)" },
        { explanation: "Evaluate the total.", latex: "\\$3152.50" },
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
      "Mixed HSC questions often hide the sequence type inside a context. Decide first whether the question asks for one value, a total, or a limiting total.",
      "Term questions use T_n. Total questions use S_n. Infinite geometric totals require the limiting sum condition.",
      "In financial contexts, read the timing carefully. The first payment, final payment and valuation date determine the exponents.",
    ],
    latexBlocks: [
      "T_n=a+(n-1)d",
      "T_n=ar^{n-1}",
      "S_n=\\frac n2(a+l)",
      "S_n=\\frac{a(1-r^n)}{1-r}",
      "S_\\infty=\\frac a{1-r}\\quad \\text{when }|r|<1",
    ],
  },
  [
    {
      title: "Choose term or sum",
      questionLatex:
        "\\text{A row pattern has 12, 15, 18, ... seats. Find the total seats in the first 10 rows.}",
      steps: [
        { explanation: "The question asks for a total, so use a series.", latex: "S_{10}" },
        { explanation: "Find the last term.", latex: "l=12+9(3)=39" },
        { explanation: "Use first-plus-last form.", latex: "S_{10}=\\frac{10}{2}(12+39)=255" },
      ],
      finalAnswerLatex: "255",
    },
    {
      title: "Check limiting sum conditions",
      questionLatex: "\\text{Does }a=20,\\ r=1.05\\text{ have a finite limiting sum?}",
      steps: [
        { explanation: "Check the magnitude of the ratio.", latex: "|1.05|>1" },
        { explanation: "The terms do not shrink to zero.", latex: "\\text{no finite limiting sum}" },
      ],
      finalAnswerLatex: "\\text{No}",
    },
    {
      title: "Financial series timing",
      questionLatex:
        "\\text{Three deposits of }\\$500\\text{ are made yearly and valued immediately after the third deposit.}",
      steps: [
        { explanation: "The deposits earn two, one and zero years of interest.", latex: "500(1+i)^2+500(1+i)+500" },
        { explanation: "This is a finite geometric sum.", latex: "\\text{finite geometric series}" },
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

export const sequencesSeriesFinancialMathsLessons = [
  arithmeticGeometricSequencesLesson,
  arithmeticGeometricSeriesLesson,
  limitingSumsLesson,
  sequencesSeriesFinanceLesson,
  examPracticeLesson,
];
