import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formatChoiceText } from "../questionHelpers";

function sequenceAnswer(
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
    hint: "Identify the sequence type first, then use the matching term or sum rule.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function sequenceChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
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
    hint: "Check whether terms are being added, multiplied, summed, or continued indefinitely.",
    explanation,
  };
}

function sequencesWorkedExamples(slug: string): WorkedExample[] {
  if (slug === "arithmetic-sequences") {
    return [
      {
        title: "Find the nth term of an arithmetic sequence",
        questionLatex: "5,\\ 8,\\ 11,\\ 14,\\ldots",
        steps: [
          { explanation: "The common difference is 3.", latex: "d=3" },
          { explanation: "Use the arithmetic term rule.", latex: "T_n=a+(n-1)d" },
          { explanation: "Substitute the first term and common difference.", latex: "T_n=5+(n-1)3=3n+2" },
        ],
        finalAnswerLatex: "T_n=3n+2",
      },
      {
        title: "Find a particular term",
        questionLatex: "T_n=4n-7.\\quad \\text{Find }T_{12}.",
        steps: [
          { explanation: "Substitute n = 12 into the term rule.", latex: "T_{12}=4(12)-7" },
          { explanation: "Evaluate.", latex: "T_{12}=41" },
        ],
        finalAnswerLatex: "41",
      },
      {
        title: "Find which term has a given value",
        questionLatex: "7,\\ 11,\\ 15,\\ldots\\quad \\text{Which term is }55?",
        steps: [
          { explanation: "Here a = 7 and d = 4.", latex: "T_n=7+(n-1)4" },
          { explanation: "Set the nth term equal to 55.", latex: "7+4(n-1)=55" },
          { explanation: "Solve for n.", latex: "4(n-1)=48,\\quad n=13" },
        ],
        finalAnswerLatex: "\\text{13th term}",
      },
      {
        title: "Find a and d from two terms",
        questionLatex: "T_3=14,\\quad T_8=34",
        steps: [
          { explanation: "The term numbers are 5 apart.", latex: "8-3=5" },
          { explanation: "The term values differ by 20, so five common differences make 20.", latex: "5d=20" },
          { explanation: "Find d, then work back to the first term.", latex: "d=4,\\quad a=14-2(4)=6" },
        ],
        finalAnswerLatex: "a=6,\\quad d=4",
      },
    ];
  }

  if (slug === "geometric-sequences") {
    return [
      {
        title: "Recognise a geometric sequence",
        questionLatex: "3,\\ 6,\\ 12,\\ 24,\\ldots",
        steps: [
          { explanation: "Each term is multiplied by 2 to get the next term.", latex: "r=2" },
          { explanation: "A constant multiplier means the sequence is geometric." },
        ],
        finalAnswerLatex: "\\text{Geometric, with }r=2",
      },
      {
        title: "Find a geometric term",
        questionLatex: "T_n=2(3)^{n-1}.\\quad \\text{Find }T_5.",
        steps: [
          { explanation: "Substitute n = 5.", latex: "T_5=2(3)^4" },
          { explanation: "Evaluate the power.", latex: "2(81)=162" },
        ],
        finalAnswerLatex: "162",
      },
      {
        title: "Find n in a clean geometric case",
        questionLatex: "5,\\ 10,\\ 20,\\ldots\\quad \\text{Which term is }160?",
        steps: [
          { explanation: "Here a = 5 and r = 2.", latex: "T_n=5(2)^{n-1}" },
          { explanation: "Set the term equal to 160.", latex: "5(2)^{n-1}=160" },
          { explanation: "Divide by 5 and match powers of 2.", latex: "2^{n-1}=32=2^5" },
        ],
        finalAnswerLatex: "n=6",
      },
      {
        title: "Classify a sequence",
        questionLatex: "2,\\ 5,\\ 10,\\ 17,\\ldots",
        steps: [
          { explanation: "The differences are 3, 5 and 7, so there is no common difference." },
          { explanation: "The ratios are not constant either." },
        ],
        finalAnswerLatex: "\\text{Neither arithmetic nor geometric}",
      },
    ];
  }

  if (slug === "arithmetic-series-sigma-notation") {
    return [
      {
        title: "Sum an arithmetic series using first and last terms",
        questionLatex: "8+11+14+\\cdots+50",
        steps: [
          { explanation: "The first term is 8, the last term is 50 and the common difference is 3.", latex: "a=8,\\quad l=50,\\quad d=3" },
          { explanation: "Find the number of terms.", latex: "50=8+(n-1)3\\Rightarrow n=15" },
          { explanation: "Use the arithmetic series formula.", latex: "S_n=\\frac{n}{2}(a+l)=\\frac{15}{2}(8+50)=435" },
        ],
        finalAnswerLatex: "435",
      },
      {
        title: "Use the arithmetic sum formula",
        questionLatex: "a=4,\\quad d=6,\\quad n=12",
        steps: [
          { explanation: "Use the formula with first term and common difference.", latex: "S_n=\\frac{n}{2}\\left(2a+(n-1)d\\right)" },
          { explanation: "Substitute and evaluate.", latex: "S_{12}=\\frac{12}{2}(8+66)=444" },
        ],
        finalAnswerLatex: "444",
      },
      {
        title: "Expand sigma notation",
        questionLatex: "\\sum_{k=1}^{4}(2k+1)",
        steps: [
          { explanation: "Substitute k = 1, 2, 3 and 4.", latex: "3+5+7+9" },
          { explanation: "Add the terms.", latex: "3+5+7+9=24" },
        ],
        finalAnswerLatex: "24",
      },
      {
        title: "Contextual arithmetic series",
        questionLatex:
          "\\text{A theatre has 18 seats in row 1, then 2 more seats in each following row for 12 rows.}",
        steps: [
          { explanation: "The row sizes form an arithmetic sequence.", latex: "a=18,\\quad d=2,\\quad n=12" },
          { explanation: "Find the total seats by summing the row sizes.", latex: "S_{12}=\\frac{12}{2}\\left(36+22\\right)=348" },
        ],
        finalAnswerLatex: "348\\text{ seats}",
      },
    ];
  }

  if (slug === "geometric-series-limiting-sums") {
    return [
      {
        title: "Sum a finite geometric series",
        questionLatex: "3+6+12+24+48",
        steps: [
          { explanation: "This is a geometric series with first term 3 and common ratio 2.", latex: "a=3,\\quad r=2,\\quad n=5" },
          { explanation: "Use the finite geometric sum formula.", latex: "S_n=\\frac{a(r^n-1)}{r-1}" },
          { explanation: "Substitute and evaluate.", latex: "S_5=\\frac{3(2^5-1)}{2-1}=93" },
        ],
        finalAnswerLatex: "93",
      },
      {
        title: "Decide whether a limiting sum exists",
        questionLatex: "12+6+3+\\cdots",
        steps: [
          { explanation: "The common ratio is one half.", latex: "r=\\frac{1}{2}" },
          { explanation: "A limiting sum exists because the absolute value of r is less than 1.", latex: "|r|<1" },
        ],
        finalAnswerLatex: "\\text{A limiting sum exists.}",
      },
      {
        title: "Find a limiting sum",
        questionLatex: "18+6+2+\\cdots",
        steps: [
          { explanation: "The first term is 18 and the common ratio is one third.", latex: "a=18,\\quad r=\\frac{1}{3}" },
          { explanation: "Use the limiting sum formula.", latex: "S_\\infty=\\frac{a}{1-r}" },
          { explanation: "Evaluate.", latex: "S_\\infty=\\frac{18}{1-\\frac{1}{3}}=27" },
        ],
        finalAnswerLatex: "27",
      },
      {
        title: "Recurring decimal as a geometric series",
        questionLatex: "0.777\\ldots",
        steps: [
          { explanation: "Write the decimal as a series.", latex: "0.7+0.07+0.007+\\cdots" },
          { explanation: "This is geometric with first term 0.7 and ratio 0.1.", latex: "a=0.7,\\quad r=0.1" },
          { explanation: "Find the limiting sum.", latex: "\\frac{0.7}{1-0.1}=\\frac{7}{9}" },
        ],
        finalAnswerLatex: "\\frac{7}{9}",
      },
    ];
  }

  return [
    {
      title: "Classify and continue a sequence",
      questionLatex: "4,\\ 9,\\ 14,\\ 19,\\ldots",
      steps: [
        { explanation: "The common difference is 5, so the sequence is arithmetic.", latex: "d=5" },
        { explanation: "The next term is found by adding 5.", latex: "19+5=24" },
      ],
      finalAnswerLatex: "24",
    },
    {
      title: "Choose a sequence model",
      questionLatex:
        "\\text{A savings balance doubles each month from }\\$40\\text{ to }\\$80\\text{ to }\\$160.",
      steps: [
        { explanation: "A repeated multiplier means the model is geometric." },
        { explanation: "The common ratio is 2.", latex: "r=2" },
      ],
      finalAnswerLatex: "\\text{Geometric}",
    },
    {
      title: "Mixed series problem",
      questionLatex:
        "\\text{A hall has 20 seats in the first row and 3 extra seats in each next row for 10 rows.}",
      steps: [
        { explanation: "The row sizes form an arithmetic series.", latex: "a=20,\\quad d=3,\\quad n=10" },
        { explanation: "Sum the row sizes.", latex: "S_{10}=\\frac{10}{2}(40+27)=335" },
      ],
      finalAnswerLatex: "335\\text{ seats}",
    },
  ];
}

export function year11AdvancedSequencesSeriesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-advanced" || unit.slug !== "sequences-series") {
    return null;
  }

  const base = {
    workedExamples: sequencesWorkedExamples(lesson.slug),
    syllabusArea: "Algebra",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "arithmetic-sequences") {
    return {
      ...base,
      description:
        "Use term notation, common differences and nth-term rules to analyse arithmetic sequences.",
      learningIntention:
        "Recognise, model and solve problems involving arithmetic sequences and their nth terms.",
      successCriteria: [
        "Use sequence notation such as T_n accurately.",
        "Identify the common difference in an arithmetic sequence.",
        "Use T_n = a + (n - 1)d to find terms.",
        "Find which term equals a given value in clean cases.",
        "Find a and d from information about two terms.",
        "Distinguish arithmetic sequences from non-arithmetic sequences.",
      ],
      teaching: {
        paragraphs: [
          "A sequence is an ordered list of terms. The nth term is often written as T_n.",
          "An arithmetic sequence has a constant difference between consecutive terms.",
          "The first term is usually called a, and the common difference is called d.",
          "The nth term formula lets you find a term without listing every previous term.",
          "If two terms are known, the difference in their values can be compared with the difference in their term numbers to find d.",
        ],
        latexBlocks: [
          "T_n=a+(n-1)d",
          "d=T_{n+1}-T_n",
          "T_m-T_n=(m-n)d",
        ],
      },
      guidedPractice: [
        sequenceAnswer("y11adv-seq-arith-g1", "Find the common difference for the arithmetic sequence.", "4,\\ 9,\\ 14,\\ 19,\\ldots", "5"),
        sequenceAnswer("y11adv-seq-arith-g2", "For the arithmetic sequence shown, find T_10.", "a=6,\\quad d=3", "33"),
        sequenceChoice("y11adv-seq-arith-g3", "Which nth-term rule matches the arithmetic sequence?", "B", ["$T_n=5n+3$", "$T_n=3n+2$", "$T_n=2n+3$", "$T_n=3^n+2$"], "The sequence 5, 8, 11, ... has first term 5 and common difference 3, so T_n = 3n + 2.", "5,\\ 8,\\ 11,\\ldots"),
        sequenceAnswer("y11adv-seq-arith-g4", "In an arithmetic sequence, T_4 = 17 and T_9 = 42. Find the common difference.", "T_4=17,\\quad T_9=42", "5"),
      ],
      independentPractice: [
        sequenceAnswer("y11adv-seq-arith-i1", "Find the 15th term of the arithmetic sequence.", "2,\\ 7,\\ 12,\\ 17,\\ldots", "72"),
        sequenceAnswer("y11adv-seq-arith-i2", "Which term of the arithmetic sequence is 46?", "6,\\ 11,\\ 16,\\ldots", "9", ["9th", "9th term"]),
        sequenceChoice("y11adv-seq-arith-i3", "Which sequence is arithmetic?", "C", ["$2,4,8,16,\\ldots$", "$1,4,9,16,\\ldots$", "$7,10,13,16,\\ldots$", "$3,6,10,15,\\ldots$"], "Only 7, 10, 13, 16, ... has a constant difference."),
        sequenceAnswer("y11adv-seq-arith-i4", "An arithmetic sequence has T_3 = 10 and common difference 4. Find the first term.", "T_3=10,\\quad d=4", "2"),
        sequenceAnswer("y11adv-seq-arith-i5", "An arithmetic sequence has T_2 = 9 and T_7 = 29. Find T_1.", "T_2=9,\\quad T_7=29", "5"),
      ],
      commonMistakes: [
        { mistake: "Using n instead of n - 1 in the nth-term formula.", fix: "The first term already occurs at n = 1, so use T_n = a + (n - 1)d." },
        { mistake: "Calling a sequence arithmetic after checking only one difference.", fix: "Check that the difference stays constant." },
        { mistake: "Solving for n but reporting the term value instead.", fix: "Track whether the question asks for T_n or for n." },
        { mistake: "Finding d from term values without considering term positions.", fix: "Divide the value change by the difference in term numbers." },
      ],
      masteryQuiz: [
        sequenceAnswer("y11adv-seq-arith-m1", "Find the common difference.", "11,\\ 17,\\ 23,\\ 29,\\ldots", "6"),
        sequenceAnswer("y11adv-seq-arith-m2", "Find T_12 for the arithmetic sequence.", "a=4,\\quad d=7", "81"),
        sequenceChoice("y11adv-seq-arith-m3", "Which rule matches the displayed arithmetic sequence?", "A", ["$T_n=4n-1$", "$T_n=3n+1$", "$T_n=4^n-1$", "$T_n=4n+3$"], "The first term is 3 and the common difference is 4, giving T_n = 4n - 1.", "3,\\ 7,\\ 11,\\ 15,\\ldots"),
        sequenceAnswer("y11adv-seq-arith-m4", "Which term of the sequence is 88?", "4,\\ 10,\\ 16,\\ldots", "15", ["15th", "15th term"]),
        sequenceAnswer("y11adv-seq-arith-m5", "An arithmetic sequence has T_5 = 21 and T_11 = 51. Find the common difference.", "T_5=21,\\quad T_{11}=51", "5"),
        sequenceAnswer("y11adv-seq-arith-m6", "An arithmetic sequence has first term 12 and T_8 = -9. Find the common difference.", "a=12,\\quad T_8=-9", "-3"),
        sequenceChoice("y11adv-seq-arith-m7", "Which sequence is not arithmetic?", "D", ["$5,9,13,17,\\ldots$", "$20,15,10,5,\\ldots$", "$-3,0,3,6,\\ldots$", "$2,6,12,20,\\ldots$"], "The last sequence has changing differences."),
        sequenceChoice("y11adv-seq-arith-m8", "A payment starts at $120 and increases by $15 each week. Which reasoning applies to the weekly payment amounts?", "A", ["Arithmetic sequence", "Geometric sequence", "Limiting geometric sum", "Neither arithmetic nor geometric"], "The same amount is added each week, so the payments form an arithmetic sequence."),
        sequenceAnswer("y11adv-seq-arith-m9", "An arithmetic sequence has T_5 = 32 and T_12 = 74. Find the common difference.", "T_5=32,\\quad T_{12}=74", "6"),
        sequenceAnswer("y11adv-seq-arith-m10", "An arithmetic sequence has T_4 = 19 and T_10 = 55. Find T_1.", "T_4=19,\\quad T_{10}=55", "1"),
      ],
    };
  }

  if (lesson.slug === "geometric-sequences") {
    return {
      ...base,
      description:
        "Use common ratios and nth-term rules to recognise and solve geometric sequence problems.",
      learningIntention:
        "Recognise geometric sequences and use their nth-term structure in exact, markable cases.",
      successCriteria: [
        "Identify the common ratio in a geometric sequence.",
        "Use T_n = ar^{n - 1} to find terms.",
        "Solve for n in clean geometric cases.",
        "Find a or r from given sequence information.",
        "Classify sequences as arithmetic, geometric or neither.",
      ],
      teaching: {
        paragraphs: [
          "A geometric sequence has a constant ratio between consecutive terms.",
          "The common ratio is found by dividing a term by the previous term, provided the previous term is not zero.",
          "The nth-term formula for a geometric sequence uses powers because the same factor is applied repeatedly.",
          "Some sequences are neither arithmetic nor geometric. Check differences and ratios before choosing a model.",
          "Clean geometric equations can often be solved by matching powers with the same base.",
        ],
        latexBlocks: [
          "T_n=ar^{n-1}",
          "r=\\frac{T_{n+1}}{T_n}",
          "T_m=T_n r^{m-n}",
        ],
      },
      guidedPractice: [
        sequenceAnswer("y11adv-seq-geo-g1", "Find the common ratio.", "3,\\ 12,\\ 48,\\ldots", "4"),
        sequenceAnswer("y11adv-seq-geo-g2", "Find T_6 for the geometric sequence.", "a=2,\\quad r=3", "486"),
        sequenceChoice("y11adv-seq-geo-g3", "Which sequence is geometric?", "A", ["$5,10,20,40,\\ldots$", "$5,10,15,20,\\ldots$", "$1,4,9,16,\\ldots$", "$2,5,10,17,\\ldots$"], "Only the first sequence has a constant multiplier."),
        sequenceAnswer("y11adv-seq-geo-g4", "A geometric sequence has T_2 = 12 and r = 3. Find the first term.", "T_2=12,\\quad r=3", "4"),
      ],
      independentPractice: [
        sequenceAnswer("y11adv-seq-geo-i1", "Find T_5 for the geometric sequence.", "4,\\ 8,\\ 16,\\ldots", "64"),
        sequenceAnswer("y11adv-seq-geo-i2", "Which term of the geometric sequence is 160?", "5,\\ 10,\\ 20,\\ldots", "6", ["6th", "6th term"]),
        sequenceChoice("y11adv-seq-geo-i3", "Classify the sequence.", "C", ["Arithmetic", "Geometric", "Neither", "Both arithmetic and geometric"], "The differences and ratios both change.", "2,\\ 5,\\ 10,\\ 17,\\ldots"),
        sequenceAnswer("y11adv-seq-geo-i4", "A geometric sequence has first term 81 and common ratio 1/3. Find T_4.", "a=81,\\quad r=\\frac{1}{3}", "3"),
        sequenceAnswer("y11adv-seq-geo-i5", "A geometric sequence has T_3 = 20 and r = 2. Find T_6.", "T_3=20,\\quad r=2", "160"),
      ],
      commonMistakes: [
        { mistake: "Using a common difference for a geometric sequence.", fix: "Use a common ratio and powers for geometric sequences." },
        { mistake: "Writing T_n = ar^n instead of T_n = ar^{n - 1}.", fix: "The first term occurs when n = 1, so the power is n - 1." },
        { mistake: "Assuming every increasing sequence is geometric.", fix: "Check whether each term is multiplied by the same number." },
        { mistake: "Solving for n by treating powers as ordinary multipliers.", fix: "Match powers in clean cases or use appropriate algebra when required." },
      ],
      masteryQuiz: [
        sequenceAnswer("y11adv-seq-geo-m1", "Find the common ratio.", "2,\\ 10,\\ 50,\\ldots", "5"),
        sequenceAnswer("y11adv-seq-geo-m2", "Find T_5 for the geometric sequence.", "a=3,\\quad r=2", "48"),
        sequenceChoice("y11adv-seq-geo-m3", "Which rule matches the sequence?", "B", ["$T_n=4n+2$", "$T_n=6(2)^{n-1}$", "$T_n=2(6)^{n-1}$", "$T_n=6+n^2$"], "The first term is 6 and each term is multiplied by 2.", "6,\\ 12,\\ 24,\\ldots"),
        sequenceAnswer("y11adv-seq-geo-m4", "Which term of the sequence is 243?", "3,\\ 9,\\ 27,\\ldots", "5", ["5th", "5th term"]),
        sequenceAnswer("y11adv-seq-geo-m5", "A geometric sequence has T_2 = 18 and T_5 = 486. Find the positive common ratio.", "T_2=18,\\quad T_5=486", "3"),
        sequenceChoice("y11adv-seq-geo-m6", "Classify the sequence.", "A", ["Arithmetic", "Geometric", "Neither", "Cannot be determined"], "The sequence has a constant difference of -4.", "20,\\ 16,\\ 12,\\ 8,\\ldots"),
        sequenceAnswer("y11adv-seq-geo-m7", "A geometric sequence has T_4 = 40 and r = 2. Find T_1.", "T_4=40,\\quad r=2", "5"),
        sequenceChoice("y11adv-seq-geo-m8", "A balance follows 500, 550, 605, ... . Which reasoning is most appropriate?", "B", ["Arithmetic, because the first increase is 50", "Geometric, because each term is multiplied by 1.1", "Neither, because the terms increase", "Limiting sum, because the terms are finite"], "The multiplier is constant: 550/500 = 1.1 and 605/550 = 1.1."),
        sequenceAnswer("y11adv-seq-geo-m9", "A geometric sequence has T_2 = 12 and T_5 = 96. Find the positive common ratio.", "T_2=12,\\quad T_5=96", "2"),
        sequenceChoice("y11adv-seq-geo-m10", "For the sequence with rule T_n = 5(2)^{n-1}, which term is 320?", "D", ["5th term", "6th term", "8th term", "7th term"], "Solving 5(2)^{n-1}=320 gives 2^{n-1}=64=2^6, so n = 7."),
      ],
    };
  }

  if (lesson.slug === "arithmetic-series-sigma-notation") {
    return {
      ...base,
      description:
        "Sum arithmetic series and interpret simple sigma notation in algebraic and contextual settings.",
      learningIntention:
        "Evaluate arithmetic series using term and sum formulas, including simple sigma notation.",
      successCriteria: [
        "Distinguish a sequence from a series.",
        "Use arithmetic series formulas with first, last and nth terms.",
        "Find the number of terms in an arithmetic series.",
        "Expand simple sigma notation.",
        "Evaluate finite sums from sigma notation.",
        "Apply arithmetic series to contextual row or savings problems.",
      ],
      teaching: {
        paragraphs: [
          "A sequence lists terms. A series is the sum of terms.",
          "Arithmetic series formulas add a finite number of terms from an arithmetic sequence.",
          "If the first and last terms are known, use the average of the first and last terms multiplied by the number of terms.",
          "Sigma notation is a compact way to write a sum. The index tells you which values to substitute.",
          "Contextual arithmetic series often involve rows, repeated deposits with a fixed increase, or patterns with a constant difference.",
        ],
        latexBlocks: [
          "S_n=\\frac{n}{2}(a+l)",
          "S_n=\\frac{n}{2}\\left(2a+(n-1)d\\right)",
          "\\sum_{k=1}^{4} k=1+2+3+4",
        ],
      },
      guidedPractice: [
        sequenceAnswer("y11adv-seq-aseries-g1", "Find the sum of the first 10 terms of the arithmetic sequence.", "a=3,\\quad d=4", "210"),
        sequenceAnswer("y11adv-seq-aseries-g2", "Find the sum of the arithmetic series.", "5+9+13+\\cdots+41", "253"),
        sequenceChoice("y11adv-seq-aseries-g3", "Which expansion matches the sigma notation?", "D", ["$2+3+4+5$", "$1+2+3+4$", "$3+5+7$", "$3+5+7+9$"], "Substitute k = 1, 2, 3 and 4 into 2k + 1.", "\\sum_{k=1}^{4}(2k+1)"),
        sequenceAnswer("y11adv-seq-aseries-g4", "Evaluate the finite sum.", "\\sum_{k=1}^{5} 3k", "45"),
      ],
      independentPractice: [
        sequenceAnswer("y11adv-seq-aseries-i1", "Find S_12 for the arithmetic sequence.", "a=7,\\quad d=2", "216"),
        sequenceAnswer("y11adv-seq-aseries-i2", "An arithmetic series has 15 terms, first term 4 and last term 46. Find the sum.", "n=15,\\quad a=4,\\quad l=46", "375"),
        sequenceAnswer("y11adv-seq-aseries-i3", "Evaluate the finite sum.", "\\sum_{k=2}^{5} k", "14"),
        sequenceChoice("y11adv-seq-aseries-i4", "A theatre has 12 rows. Row 1 has 18 seats and each following row has 2 more seats. Which model should be used for total seats?", "A", ["Arithmetic series", "Geometric sequence only", "Limiting geometric sum", "Probability table"], "The row sizes have a constant difference and must be summed."),
        sequenceAnswer("y11adv-seq-aseries-i5", "Find the number of terms in the arithmetic series.", "8+11+14+\\cdots+50", "15"),
      ],
      commonMistakes: [
        { mistake: "Finding only the nth term when the question asks for a sum.", fix: "A series question asks for S_n, not just T_n." },
        { mistake: "Using the last term as the number of terms.", fix: "Find n from the term pattern when it is not given." },
        { mistake: "Expanding sigma notation with the wrong index values.", fix: "Use the lower and upper limits exactly." },
        { mistake: "Using a geometric series formula for an arithmetic pattern.", fix: "Check for a constant difference before choosing the formula." },
      ],
      masteryQuiz: [
        sequenceAnswer("y11adv-seq-aseries-m1", "Find the sum of the first 8 terms of the arithmetic sequence.", "a=5,\\quad d=3", "124"),
        sequenceAnswer("y11adv-seq-aseries-m2", "Find the sum of the arithmetic series.", "6+10+14+\\cdots+42", "240"),
        sequenceChoice("y11adv-seq-aseries-m3", "Which expression represents the sum of the first n terms of an arithmetic sequence when a and l are known?", "A", ["$\\frac{n}{2}(a+l)$", "$ar^{n-1}$", "$\\frac{a}{1-r}$", "$a+(n-1)d$"], "The first-and-last-term arithmetic series formula is n/2 times a + l."),
        sequenceAnswer("y11adv-seq-aseries-m4", "Evaluate the finite sum.", "\\sum_{k=1}^{6} k", "21"),
        sequenceAnswer("y11adv-seq-aseries-m5", "Evaluate the finite sum.", "\\sum_{k=1}^{4}(3k-1)", "26"),
        sequenceAnswer("y11adv-seq-aseries-m6", "A hall has 20 seats in the first row and 3 extra seats in each next row for 10 rows. Find the total number of seats.", "\\text{10 rows with a constant increase}", "335"),
        sequenceChoice("y11adv-seq-aseries-m7", "Which statement correctly distinguishes a series from a sequence?", "B", ["A series lists terms only", "A series adds terms", "A sequence always has a limiting sum", "A sequence must be geometric"], "A series is the sum of terms."),
        sequenceAnswer("y11adv-seq-aseries-m8", "An arithmetic series has first term 6, last term 54 and sum 300. Find the number of terms.", "a=6,\\quad l=54,\\quad S_n=300", "10"),
        sequenceChoice("y11adv-seq-aseries-m9", "Which situation should be modelled with an arithmetic series?", "C", ["A value is multiplied by 1.04 each year", "An infinite geometric series has |r|<1", "Rows have 18 seats, then 21, then 24, and the total seats are needed", "A single term of a geometric sequence is needed"], "The row sizes increase by a constant amount and the total is required."),
        sequenceAnswer("y11adv-seq-aseries-m10", "A savings plan deposits $50 in week 1 and has a total of $930 after 12 weekly deposits. If the deposits increase by the same amount each week, find the weekly increase.", "a=50,\\quad n=12,\\quad S_{12}=930", "5", ["$5", "5 dollars"]),
      ],
    };
  }

  if (lesson.slug === "geometric-series-limiting-sums") {
    return {
      ...base,
      description:
        "Evaluate finite geometric series and determine whether a limiting sum exists for infinite geometric series.",
      learningIntention:
        "Use finite and limiting geometric series formulas, including convergence checks for limiting sums.",
      successCriteria: [
        "Identify a geometric series from its common ratio.",
        "Use finite geometric sum formulas to evaluate sums.",
        "Decide whether a limiting sum exists using |r| < 1.",
        "Calculate limiting sums for convergent geometric series.",
        "Recognise when no limiting sum exists.",
        "Connect simple recurring decimals with geometric series.",
      ],
      teaching: {
        paragraphs: [
          "A geometric series is the sum of terms from a geometric sequence.",
          "The finite geometric series formula depends on the first term, common ratio and number of terms.",
          "An infinite geometric series has a limiting sum only when the absolute value of the common ratio is less than 1.",
          "If the common ratio has absolute value 1 or greater, the terms do not shrink toward zero, so there is no limiting sum.",
          "Some recurring decimals can be understood as infinite geometric series with common ratio one tenth or a power of one tenth.",
        ],
        latexBlocks: [
          "S_n=\\frac{a(r^n-1)}{r-1}\\quad (r\\ne1)",
          "S_n=\\frac{a(1-r^n)}{1-r}\\quad (r\\ne1)",
          "S_\\infty=\\frac{a}{1-r}\\quad \\text{when }|r|<1",
        ],
      },
      guidedPractice: [
        sequenceAnswer("y11adv-seq-gseries-g1", "Find the sum of the first 5 terms of the geometric sequence.", "a=3,\\quad r=2", "93"),
        sequenceChoice("y11adv-seq-gseries-g2", "Does the infinite geometric series have a limiting sum?", "A", ["Yes, because $|r|<1$", "No, because $r>1$", "No, because it is arithmetic", "Yes, because all series have limiting sums"], "The common ratio is one half, so the limiting sum exists.", "10+5+2.5+\\cdots"),
        sequenceAnswer("y11adv-seq-gseries-g3", "Find the limiting sum.", "12+6+3+\\cdots", "24"),
        sequenceChoice("y11adv-seq-gseries-g4", "Which common ratio would not give a limiting sum?", "D", ["$\\frac{1}{2}$", "$-\\frac{1}{3}$", "$0.2$", "$2$"], "A limiting sum requires |r| < 1."),
      ],
      independentPractice: [
        sequenceAnswer("y11adv-seq-gseries-i1", "Find the sum of the first 4 terms.", "5+15+45+135", "200"),
        sequenceAnswer("y11adv-seq-gseries-i2", "Find the limiting sum.", "18+6+2+\\cdots", "27"),
        sequenceChoice("y11adv-seq-gseries-i3", "Which series has no limiting sum?", "C", ["$8+4+2+\\cdots$", "$9-3+1-\\cdots$", "$4+8+16+\\cdots$", "$6+3+1.5+\\cdots$"], "The third series has common ratio 2, so it diverges."),
        sequenceAnswer("y11adv-seq-gseries-i4", "Find the sum of the first 6 terms of the geometric sequence.", "a=2,\\quad r=3", "728"),
        sequenceAnswer("y11adv-seq-gseries-i5", "Write the recurring decimal as a fraction.", "0.444\\ldots", "4/9"),
      ],
      commonMistakes: [
        { mistake: "Using the limiting sum formula for any infinite series.", fix: "Check |r| < 1 first." },
        { mistake: "Confusing the finite sum S_n with the limiting sum S_infinity.", fix: "Use S_n for a fixed number of terms and S_infinity only for a convergent infinite series." },
        { mistake: "Dropping a negative common ratio when checking convergence.", fix: "Use the absolute value of r." },
        { mistake: "Using an arithmetic sum formula for a geometric series.", fix: "Check for a constant ratio before choosing the formula." },
      ],
      masteryQuiz: [
        sequenceAnswer("y11adv-seq-gseries-m1", "Find the sum of the first 4 terms of the geometric sequence.", "a=2,\\quad r=3", "80"),
        sequenceAnswer("y11adv-seq-gseries-m2", "Find the limiting sum.", "20+10+5+\\cdots", "40"),
        sequenceChoice("y11adv-seq-gseries-m3", "Which condition is required for an infinite geometric series to have a limiting sum?", "C", ["$r>1$", "$r=1$", "$|r|<1$", "$a=0$ only"], "A non-zero infinite geometric series converges when |r| < 1."),
        sequenceAnswer("y11adv-seq-gseries-m4", "Find the sum of the first 5 terms.", "4+8+16+32+64", "124"),
        sequenceChoice("y11adv-seq-gseries-m5", "Does the series have a limiting sum?", "B", ["Yes", "No", "Only if n = 10", "Only if a = 1"], "The common ratio is 3, so |r| is greater than 1.", "2+6+18+\\cdots"),
        sequenceAnswer("y11adv-seq-gseries-m6", "Find the limiting sum.", "9+3+1+\\cdots", "27/2", ["13.5"]),
        sequenceChoice("y11adv-seq-gseries-m7", "Which series is geometric?", "A", ["$5+10+20+40+\\cdots$", "$5+10+15+20+\\cdots$", "$1+4+9+16+\\cdots$", "$2+5+10+17+\\cdots$"], "Only the first series has a constant ratio."),
        sequenceAnswer("y11adv-seq-gseries-m8", "An infinite geometric series has first term 12 and common ratio -1/2. Find its limiting sum.", "a=12,\\quad r=-\\frac{1}{2}", "8"),
        sequenceChoice("y11adv-seq-gseries-m9", "A student uses S_infinity for 6 + 12 + 24 + ... . Which option identifies the error?", "D", ["The first term should be zero", "The series is arithmetic", "There is no common ratio", "The common ratio has absolute value greater than 1"], "The common ratio is 2, so a limiting sum does not exist."),
        sequenceAnswer("y11adv-seq-gseries-m10", "An infinite geometric series has first term 15 and limiting sum 25. Find the common ratio.", "a=15,\\quad S_\\infty=25", "2/5", ["0.4"]),
      ],
    };
  }

  if (lesson.slug === "sequences-series-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed Advanced-style sequence and series problems involving arithmetic, geometric, sigma and limiting-sum ideas.",
      learningIntention:
        "Choose and apply the correct sequence or series method in mixed assessment-style contexts.",
      successCriteria: [
        "Classify sequences as arithmetic, geometric or neither.",
        "Find nth terms and term positions in clean cases.",
        "Evaluate arithmetic and geometric series.",
        "Interpret simple sigma notation.",
        "Decide whether a limiting sum exists.",
        "Solve practical seating, saving or growth problems using the correct model.",
      ],
      teaching: {
        paragraphs: [
          "Mixed sequence and series questions reward choosing the model before calculating.",
          "Arithmetic models use repeated addition; geometric models use repeated multiplication.",
          "Series questions ask for a total, while sequence questions ask about individual terms.",
          "Sigma notation is a compact way to write a finite sum, so expand the index values if the expression is simple.",
          "For limiting sums, always check the common ratio before using the formula.",
        ],
        latexBlocks: [
          "T_n=a+(n-1)d",
          "T_n=ar^{n-1}",
          "S_n=\\frac{n}{2}(a+l)",
          "S_n=\\frac{a(1-r^n)}{1-r}",
          "S_\\infty=\\frac{a}{1-r}\\quad \\text{when }|r|<1",
        ],
      },
      guidedPractice: [
        sequenceChoice("y11adv-seq-exam-g1", "Classify the sequence.", "A", ["Arithmetic", "Geometric", "Neither", "A limiting series"], "The common difference is 6.", "4,\\ 10,\\ 16,\\ 22,\\ldots"),
        sequenceAnswer("y11adv-seq-exam-g2", "Find T_9 for the arithmetic sequence.", "a=11,\\quad d=-2", "-5"),
        sequenceAnswer("y11adv-seq-exam-g3", "Find the sum of the first 6 terms of the geometric sequence.", "a=1,\\quad r=2", "63"),
        sequenceChoice("y11adv-seq-exam-g4", "Which statement is true about the infinite geometric series?", "C", ["It has limiting sum 4", "It is arithmetic", "It has no limiting sum", "It has common ratio one half"], "The common ratio is 2, so it does not converge.", "4+8+16+\\cdots"),
      ],
      independentPractice: [
        sequenceAnswer("y11adv-seq-exam-i1", "Which term of the arithmetic sequence is 71?", "5,\\ 11,\\ 17,\\ldots", "12", ["12th", "12th term"]),
        sequenceChoice("y11adv-seq-exam-i2", "A population is multiplied by 1.1 each year. Which model is most suitable?", "B", ["Arithmetic sequence", "Geometric sequence", "Arithmetic series", "Two-way table"], "Repeated multiplication by 1.1 is geometric."),
        sequenceAnswer("y11adv-seq-exam-i3", "Evaluate the finite sum.", "\\sum_{k=1}^{5}(2k)", "30"),
        sequenceAnswer("y11adv-seq-exam-i4", "Find the limiting sum.", "16+4+1+\\cdots", "64/3"),
        sequenceAnswer("y11adv-seq-exam-i5", "A theatre has 16 seats in the first row and 4 more seats in each next row for 9 rows. Find the total seats.", "\\text{9 rows with a constant increase}", "288"),
      ],
      commonMistakes: [
        { mistake: "Choosing a formula before classifying the pattern.", fix: "Check differences and ratios first." },
        { mistake: "Using a term formula when the problem asks for a total.", fix: "Use a series formula for total amounts." },
        { mistake: "Assuming every infinite geometric series converges.", fix: "Check |r| < 1." },
        { mistake: "Treating sigma notation as multiplication.", fix: "Sigma means add the terms generated by the index." },
      ],
      masteryQuiz: [
        sequenceChoice("y11adv-seq-exam-m1", "Classify the sequence.", "B", ["Arithmetic", "Geometric", "Neither", "A finite series"], "The common ratio is 3.", "2,\\ 6,\\ 18,\\ 54,\\ldots"),
        sequenceAnswer("y11adv-seq-exam-m2", "Find T_20 for the arithmetic sequence.", "a=7,\\quad d=4", "83"),
        sequenceAnswer("y11adv-seq-exam-m3", "Find the sum of the arithmetic series.", "9+12+15+\\cdots+45", "351"),
        sequenceAnswer("y11adv-seq-exam-m4", "Find the sum of the first 5 terms of the geometric sequence.", "a=6,\\quad r=2", "186"),
        sequenceChoice("y11adv-seq-exam-m5", "Which expression is a finite sigma sum?", "D", ["$S_\\infty$", "$T_n$", "$ar^{n-1}$", "$\\sum_{k=1}^{6}(k+2)$"], "The sigma symbol represents a sum over index values."),
        sequenceAnswer("y11adv-seq-exam-m6", "Find the limiting sum.", "30+15+7.5+\\cdots", "60"),
        sequenceChoice("y11adv-seq-exam-m7", "A student models 100, 80, 64, ... with an arithmetic sequence. Which option identifies the issue?", "C", ["It has no pattern", "The terms are increasing", "The pattern uses a constant ratio, not a constant difference", "It is a two-way table"], "Each term is multiplied by 0.8."),
        sequenceChoice("y11adv-seq-exam-m8", "A balance follows 400, 420, 441, ... . Which method should be used to find the value in year 8?", "B", ["Arithmetic sequence", "Geometric sequence", "Arithmetic series", "Limiting sum"], "Each term is multiplied by 1.05, so geometric sequence reasoning applies."),
        sequenceAnswer("y11adv-seq-exam-m9", "An arithmetic sequence has T_4 = 19 and T_10 = 55. Find the common difference.", "T_4=19,\\quad T_{10}=55", "6"),
        sequenceChoice("y11adv-seq-exam-m10", "For the infinite series 12 - 9 + 6.75 - ... , which statement is correct?", "B", ["No limiting sum exists because signs alternate", "A limiting sum exists because $|r|<1$", "It is arithmetic because the signs alternate", "The common ratio is greater than 1"], "The common ratio is -3/4, and its absolute value is less than 1."),
      ],
    };
  }

  return null;
}
