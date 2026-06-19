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
    hint: "Think about what the question is asking, then apply the percentage method step by step.",
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

// Pool questions carry a difficulty tag (1 = easiest … 5 = hardest) used by the
// mastery-quiz selector. The `answer`/`choice` helpers above do not set it, so
// we attach it with this thin wrapper.
function withDifficulty(q: PracticeQuestion, difficulty: number): PracticeQuestion {
  return { ...q, difficulty };
}

// ─── Lesson 1: Converting fractions, decimals and percentages ───────────────

const convertingFractionsDecimalsPercentages: LessonContent = {
  description: "Convert between fractions, decimals, and percentages, and order a mixed list of all three forms.",
  learningIntention: "Understand percentage as parts per hundred and convert fluently between fractions, decimals, and percentages.",
  successCriteria: [
    "Explain what a percentage means as a fraction with denominator 100.",
    "Convert a fraction to a percentage by multiplying by 100%.",
    "Convert a percentage to a fraction in simplest form.",
    "Convert between decimals and percentages by multiplying or dividing by 100.",
    "Order a mixed list of fractions, decimals, and percentages from smallest to largest.",
  ],
  teaching: {
    paragraphs: [
      "A percentage is just a way of counting out of 100. The word 'percent' comes from the Latin 'per centum', which literally means 'for each hundred'. So when you read 47%, picture a grid of 100 squares with 47 of them shaded — the percent sign is a shorthand for 'out of 100'.",
      "Here is a concrete picture. If 47 students out of every 100 walk to school, we say 47% walk. The same shaded grid can be written three ways: as the fraction $\\frac{47}{100}$, as the decimal $0.47$, and as $47\\%$. They are three names for one amount, so being fluent means moving between the names without changing the amount.",
      "In notation, a percentage $n\\%$ always means the fraction $\\frac{n}{100}$. That single fact is the engine behind every conversion: percentage to fraction is 'write it over 100', and fraction to percentage is 'rewrite it so the denominator is 100'.",
      "Why does multiplying a fraction by $100\\%$ convert it? Because $100\\%$ equals $\\frac{100}{100} = 1$, and multiplying by 1 never changes a value — it only re-dresses it. So $\\frac{3}{4} \\times 100\\% = \\frac{300}{4}\\% = 75\\%$ is the same amount as $\\frac{3}{4}$, now expressed in hundredths. Going back, $60\\% = \\frac{60}{100}$, and dividing top and bottom by their highest common factor 20 gives the simplest form $\\frac{3}{5}$.",
      "Why does moving the decimal point two places convert a decimal to a percentage? Because a percentage is hundredths, and multiplying by 100 shifts every digit two columns to the left. So $0.35 = 0.35 \\times 100\\% = 35\\%$, and to undo it you divide by 100, shifting two columns right: $8\\% = 0.08$. The two-place shift is not a trick — it is exactly what multiplying or dividing by 100 does.",
      "To transfer this, watch the common slip: a student sees $7\\%$ and writes $0.7$, moving the point only one place. Going from a percentage to a decimal always moves the point exactly two places left, because percent means hundredths — so $7\\% = 0.07$, not $0.7$. When you order a mixed list, convert everything to one form first (decimals are usually easiest), compare, then restate in the original forms — and remember that $\\frac{3}{4}$, $0.75$ and $75\\%$ are equal, not three different sizes.",
    ],
    latexBlocks: [
      "n\\% = \\frac{n}{100} \\qquad \\text{(percent means hundredths)}",
      "\\frac{a}{b} \\to \\text{percentage}: \\ \\frac{a}{b} \\times 100\\% \\qquad n\\% \\to \\text{fraction}: \\ \\frac{n}{100} \\text{ (simplify)}",
      "\\text{decimal} \\xrightarrow{\\times 100} \\text{percentage} \\xrightarrow{\\div 100} \\text{decimal}",
    ],
  },
  workedExamples: [
    {
      title: "Convert a fraction to a percentage",
      questionLatex: "\\text{Convert }\\dfrac{7}{20}\\text{ to a percentage.}",
      steps: [
        { explanation: "Multiply by 100% — that is multiplying by 1, so the amount is unchanged, just rewritten in hundredths.", latex: "\\frac{7}{20} \\times 100\\% = \\frac{700}{20}\\%" },
        { explanation: "Divide 700 by 20 to finish the calculation.", latex: "\\frac{700}{20}\\% = 35\\%" },
      ],
      finalAnswerLatex: "\\dfrac{7}{20} = 35\\%",
    },
    {
      title: "Convert a percentage to a fraction in simplest form",
      questionLatex: "\\text{Convert }45\\%\\text{ to a fraction in simplest form.}",
      steps: [
        { explanation: "Percent means hundredths, so write 45% directly as a fraction over 100.", latex: "45\\% = \\frac{45}{100}" },
        { explanation: "Find the highest common factor of 45 and 100 (it is 5) so we can simplify.", latex: "\\gcd(45, 100) = 5" },
        { explanation: "Divide top and bottom by 5 to reach simplest form.", latex: "\\frac{45 \\div 5}{100 \\div 5} = \\frac{9}{20}" },
      ],
      finalAnswerLatex: "45\\% = \\dfrac{9}{20}",
    },
    {
      title: "Order a mixed list from smallest to largest",
      questionLatex: "\\text{Order from smallest to largest: }\\quad 0.6,\\quad 55\\%,\\quad \\frac{3}{5},\\quad \\frac{7}{10}",
      steps: [
        { explanation: "Convert every value to a decimal so they sit in one common form and can be compared digit by digit.", latex: "0.6,\\quad 55\\% = 0.55,\\quad \\frac{3}{5} = 0.6,\\quad \\frac{7}{10} = 0.7" },
        { explanation: "Compare the decimals; note 0.6 and 3/5 are the same value, so they tie.", latex: "0.55 < 0.6 = 0.6 < 0.7" },
        { explanation: "Restate in the original forms, keeping the tie between 0.6 and 3/5.", latex: "55\\% < 0.6 = \\frac{3}{5} < \\frac{7}{10}" },
      ],
      finalAnswerLatex: "55\\% < 0.6 = \\dfrac{3}{5} < \\dfrac{7}{10}",
    },
    {
      title: "Harder: chain all three forms and spot the rounding trap",
      questionLatex: "\\text{A student writes }\\dfrac{1}{3} = 33\\%.\\text{ Is this exact? Give the exact percentage, then convert }0.625\\text{ to a fraction.}",
      steps: [
        { explanation: "Convert 1/3 by multiplying by 100% — divide 100 by 3 to see what happens.", latex: "\\frac{1}{3} \\times 100\\% = \\frac{100}{3}\\% = 33.333\\ldots\\%" },
        { explanation: "Because 100 is not a whole number of thirds, the decimal recurs, so 33% is only a rounded approximation, not exact.", latex: "\\frac{1}{3} = 33.\\overline{3}\\% \\neq 33\\%" },
        { explanation: "Now convert 0.625: it is 625 thousandths, so write it over 1000.", latex: "0.625 = \\frac{625}{1000}" },
        { explanation: "Divide top and bottom by their highest common factor 125 to simplify.", latex: "\\frac{625 \\div 125}{1000 \\div 125} = \\frac{5}{8}" },
      ],
      finalAnswerLatex: "\\dfrac{1}{3} = 33.\\overline{3}\\%\\ \\text{(33\\% is approximate);}\\quad 0.625 = \\dfrac{5}{8}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-pct-cvt-g1",
      "Which of the following is the same as 30%?",
      "B",
      ["3/10 and 3.0", "3/10 and 0.3", "3/100 and 0.3", "30/10 and 0.03"],
      "30% = 30/100 = 3/10. As a decimal, divide by 100: 30 ÷ 100 = 0.3.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-pct-cvt-g2",
      "Convert 2/5 to a percentage. Enter a number (e.g. 40).",
      "\\frac{2}{5} \\times 100\\%",
      "40",
      "2/5 × 100% = 200/5% = 40%. So 2/5 = 40%.",
      ["40%"]
    ),
    answer(
      "y7-pct-cvt-g3",
      "Convert 72% to a decimal.",
      "72\\% \\div 100",
      "0.72",
      "Divide 72 by 100 to move the decimal point two places left: 72% = 0.72.",
      [".72"]
    ),
    answer(
      "y7-pct-cvt-g4",
      "Convert 80% to a fraction in simplest form. Write your answer as a fraction (e.g. 4/5).",
      "80\\% = \\frac{80}{100}",
      "4/5",
      "80/100 — divide both by 20: 4/5. So 80% = 4/5.",
      ["4 / 5"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-pct-cvt-i1",
      "Convert 3/8 to a percentage.",
      "\\frac{3}{8} \\times 100\\%",
      "37.5",
      "3/8 × 100% = 300/8% = 37.5%. So 3/8 = 37.5%.",
      ["37.5%"]
    ),
    answer(
      "y7-pct-cvt-i2",
      "Convert 0.045 to a percentage.",
      "0.045 \\times 100",
      "4.5",
      "Multiply by 100 (move decimal two places right): 0.045 × 100 = 4.5%. So 0.045 = 4.5%.",
      ["4.5%"]
    ),
    answer(
      "y7-pct-cvt-i3",
      "Convert 15% to a fraction in simplest form.",
      "15\\% = \\frac{15}{100}",
      "3/20",
      "15/100 — divide both by 5: 3/20. So 15% = 3/20.",
      ["3 / 20"]
    ),
    answer(
      "y7-pct-cvt-i4",
      "A student scores 18 out of 24 on a test. What percentage is this? Round to one decimal place.",
      "\\frac{18}{24} \\times 100\\%",
      "75",
      "18/24 = 0.75 = 75%. The student scored 75%.",
      ["75%"]
    ),
    choice(
      "y7-pct-cvt-i5",
      "Which list is in order from smallest to largest?",
      "C",
      [
        "70%, 0.65, 3/4",
        "3/4, 70%, 0.65",
        "0.65, 70%, 3/4",
        "3/4, 0.65, 70%",
      ],
      "Convert to decimals: 70% = 0.70, 3/4 = 0.75. Ordering: 0.65 < 0.70 < 0.75, so 0.65 < 70% < 3/4.",
      "\\text{Select A, B, C, or D.}"
    ),
  ],
  commonMistakes: [
    { mistake: "Dividing by 100 instead of multiplying when converting a fraction to a percentage.", fix: "To convert a fraction to a percentage, multiply by 100. To go the other way (% to decimal), divide by 100." },
    { mistake: "Forgetting to simplify after converting a percentage to a fraction (e.g. leaving 40/100 instead of 2/5).", fix: "Always divide numerator and denominator by their highest common factor to reach simplest form." },
    { mistake: "Moving the decimal point the wrong number of places (e.g. writing 0.7 instead of 0.07 for 7%).", fix: "Percentage to decimal always moves the point exactly two places to the left." },
    { mistake: "Comparing 3/4 and 75% as if they are different values.", fix: "3/4 = 0.75 = 75%. Convert to the same form before comparing." },
  ],
  masteryQuiz: [
    answer(
      "y7-pct-cvt-m1",
      "Convert 9/25 to a percentage.",
      "\\frac{9}{25} \\times 100\\%",
      "36",
      "9/25 × 100% = 900/25% = 36%. So 9/25 = 36%.",
      ["36%"]
    ),
    answer(
      "y7-pct-cvt-m2",
      "Convert 0.008 to a percentage.",
      "0.008 \\times 100",
      "0.8",
      "0.008 × 100 = 0.8. So 0.008 = 0.8%.",
      ["0.8%"]
    ),
    choice(
      "y7-pct-cvt-m3",
      "A student converts 64% to a fraction and gets 16/25. Is this correct?",
      "A",
      ["Yes — 64/100 simplifies to 16/25", "No — it should be 8/25", "No — it should be 32/50", "No — it should be 64/10"],
      "64/100 ÷ 4/4 = 16/25. The student is correct."
    ),
    answer(
      "y7-pct-cvt-m4",
      "Convert 125% to a decimal.",
      "125\\% \\div 100",
      "1.25",
      "125 ÷ 100 = 1.25. Percentages greater than 100% give decimals greater than 1.",
      []
    ),
    answer(
      "y7-pct-cvt-m5",
      "Write 5/8 as a percentage.",
      "\\frac{5}{8} \\times 100\\%",
      "62.5",
      "5/8 × 100% = 500/8% = 62.5%. So 5/8 = 62.5%.",
      ["62.5%"]
    ),
    answer(
      "y7-pct-cvt-m6",
      "Convert 0.3% to a decimal.",
      "0.3\\% \\div 100",
      "0.003",
      "0.3 ÷ 100 = 0.003. Small percentages give very small decimals.",
      [".003"]
    ),
    choice(
      "y7-pct-cvt-m7",
      "Which value is the largest?",
      "D",
      ["0.9", "88%", "17/20", "\\(\\frac{19}{20}\\)"],
      "Convert all to decimals: 0.9 = 0.90, 88% = 0.88, 17/20 = 0.85, 19/20 = 0.95. The largest is 19/20 = 0.95.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-pct-cvt-m8",
      "A class has 13 girls out of 20 students. Express this as a percentage.",
      "\\frac{13}{20} \\times 100\\%",
      "65",
      "13/20 × 100% = 1300/20% = 65%. So 65% of the class are girls.",
      ["65%"]
    ),
    answer(
      "y7-pct-cvt-m9",
      "Convert 7% to a fraction in simplest form.",
      "7\\% = \\frac{7}{100}",
      "7/100",
      "7/100 cannot be simplified further as 7 is prime and does not divide 100. So 7% = 7/100.",
      ["7 / 100"]
    ),
    answer(
      "y7-pct-cvt-m10",
      "A survey finds that 0.04 of people prefer tea. What percentage is this?",
      "0.04 \\times 100\\%",
      "4",
      "0.04 × 100 = 4. So 4% of people prefer tea.",
      ["4%"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y7-pct-cvt-p01", "Convert 1/2 to a percentage.", "\\frac{1}{2} \\times 100\\%", "50", "1/2 × 100% = 50%.", ["50%"]), 1),
    withDifficulty(answer("y7-pct-cvt-p02", "Convert 50% to a decimal.", "50\\% \\div 100", "0.5", "50 ÷ 100 = 0.5.", [".5"]), 1),
    withDifficulty(answer("y7-pct-cvt-p03", "Convert 0.25 to a percentage.", "0.25 \\times 100", "25", "0.25 × 100 = 25%.", ["25%"]), 1),
    withDifficulty(choice("y7-pct-cvt-p04", "Which decimal is equal to 10%?", "B", ["1.0", "0.1", "0.01", "10.0"], "10% = 10 ÷ 100 = 0.1."), 1),
    withDifficulty(answer("y7-pct-cvt-p05", "Convert 1/4 to a percentage.", "\\frac{1}{4} \\times 100\\%", "25", "1/4 × 100% = 25%.", ["25%"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y7-pct-cvt-p06", "Convert 3/5 to a percentage.", "\\frac{3}{5} \\times 100\\%", "60", "3/5 × 100% = 300/5% = 60%.", ["60%"]), 2),
    withDifficulty(answer("y7-pct-cvt-p07", "Convert 0.07 to a percentage.", "0.07 \\times 100", "7", "0.07 × 100 = 7%.", ["7%"]), 2),
    withDifficulty(answer("y7-pct-cvt-p08", "Convert 24% to a fraction in simplest form. Write as a fraction (e.g. 6/25).", "24\\% = \\frac{24}{100}", "6/25", "24/100 — divide both by 4: 6/25.", ["6 / 25"]), 2),
    withDifficulty(answer("y7-pct-cvt-p09", "Convert 35% to a decimal.", "35\\% \\div 100", "0.35", "35 ÷ 100 = 0.35.", [".35"]), 2),
    withDifficulty(choice("y7-pct-cvt-p10", "Which of these equals 3/4?", "C", ["0.34", "34%", "75%", "0.34%"], "3/4 = 0.75 = 75%."), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y7-pct-cvt-p11", "Convert 7/8 to a percentage.", "\\frac{7}{8} \\times 100\\%", "87.5", "7/8 × 100% = 700/8% = 87.5%.", ["87.5%"]), 3),
    withDifficulty(answer("y7-pct-cvt-p12", "Convert 0.125 to a percentage.", "0.125 \\times 100", "12.5", "0.125 × 100 = 12.5%.", ["12.5%"]), 3),
    withDifficulty(answer("y7-pct-cvt-p13", "Convert 0.006 to a percentage.", "0.006 \\times 100", "0.6", "0.006 × 100 = 0.6%.", ["0.6%"]), 3),
    withDifficulty(answer("y7-pct-cvt-p14", "A student answers 21 of 28 questions correctly. What percentage is this?", "\\frac{21}{28} \\times 100\\%", "75", "21/28 = 0.75 = 75%.", ["75%"]), 3),
    withDifficulty(answer("y7-pct-cvt-p15", "Convert 12.5% to a fraction in simplest form. Write as a fraction (e.g. 1/8).", "12.5\\% = \\frac{12.5}{100}", "1/8", "12.5/100 = 125/1000 = 1/8.", ["1 / 8"]), 3),
    withDifficulty(choice("y7-pct-cvt-p16", "Which list is ordered from smallest to largest?", "C", ["0.8, 3/4, 78%", "78%, 0.8, 3/4", "3/4, 78%, 0.8", "0.8, 78%, 3/4"], "3/4 = 0.75, 78% = 0.78, 0.8 = 0.80. So 0.75 < 0.78 < 0.80."), 3),
    withDifficulty(answer("y7-pct-cvt-p17", "Convert 9/40 to a percentage.", "\\frac{9}{40} \\times 100\\%", "22.5", "9/40 × 100% = 900/40% = 22.5%.", ["22.5%"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y7-pct-cvt-p18", "Convert 5/16 to a percentage.", "\\frac{5}{16} \\times 100\\%", "31.25", "5/16 × 100% = 500/16% = 31.25%.", ["31.25%"]), 4),
    withDifficulty(answer("y7-pct-cvt-p19", "Convert 175% to a fraction in simplest form. Write as an improper fraction (e.g. 7/4).", "175\\% = \\frac{175}{100}", "7/4", "175/100 — divide both by 25: 7/4.", ["7 / 4"]), 4),
    withDifficulty(choice("y7-pct-cvt-p20", "Which value is the smallest?", "B", ["0.4", "37%", "2/5", "\\(\\frac{19}{50}\\)"], "0.4 = 0.40, 37% = 0.37, 2/5 = 0.40, 19/50 = 0.38. The smallest is 37%."), 4),
    withDifficulty(answer("y7-pct-cvt-p21", "Convert 0.0025 to a percentage.", "0.0025 \\times 100", "0.25", "0.0025 × 100 = 0.25%.", ["0.25%"]), 4),
    withDifficulty(answer("y7-pct-cvt-p22", "A class of 24 students has 9 who walk to school. What percentage walk? Round to one decimal place.", "\\frac{9}{24} \\times 100\\%", "37.5", "9/24 = 0.375 = 37.5%.", ["37.5%"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y7-pct-cvt-p23", "Convert 0.6% to a fraction in simplest form. Write as a fraction (e.g. 3/500).", "0.6\\% = \\frac{0.6}{100}", "3/500", "0.6/100 = 6/1000 = 3/500.", ["3 / 500"]), 5),
    withDifficulty(answer("y7-pct-cvt-p24", "Convert 7/12 to a percentage. Round to two decimal places.", "\\frac{7}{12} \\times 100\\%", "58.33", "7/12 × 100% = 700/12% = 58.33% (2 dp).", ["58.33%"]), 5),
    withDifficulty(choice("y7-pct-cvt-p25", "A student claims 1/3 = 33%. Which statement is most correct?", "C", ["Yes, exactly 33%", "No, it is 30%", "No, 1/3 = 33.33...% (33% is only an approximation)", "No, it is 35%"], "1/3 × 100% = 33.333...%, a recurring decimal. 33% is a rounded approximation, not exact."), 5),
    withDifficulty(answer("y7-pct-cvt-p26", "Order these by converting to decimals; enter the largest as a percentage (a whole number): 5/8, 62%, 0.63.", "\\frac{5}{8},\\; 62\\%,\\; 0.63", "63", "5/8 = 0.625, 62% = 0.62, 0.63 = 0.63. The largest is 0.63 = 63%.", ["63%"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-pct-cvt-mp1",
      prompt: "A survey of a Year 7 class records each student's favourite subject. Out of 40 students, 16 chose Maths, 0.30 of the class chose English (given as a decimal), and the fraction 1/5 chose Science.",
      latex: "\\text{40 students surveyed}",
      answer: "40",
      hint: "Convert each given form (fraction, decimal, percentage) using its conversion rule, and remember a percentage is a value out of 100.",
      explanation: "Part (a): 16/40 × 100% = 40%. Part (b): 0.30 × 100% = 30%, which is 0.30 × 40 = 12 students. Part (c): 1/5 = 20%, which is 8 students. Part (d): 40% + 30% + 20% = 90%, leaving 10% for other subjects.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What percentage of the class chose Maths? Enter a number (e.g. 40).",
          latex: "\\frac{16}{40} \\times 100\\%",
          marks: 1,
          answer: "40",
          acceptedAnswers: ["40%"],
          hint: "Write the Maths count as a fraction of the total, then multiply by 100.",
          explanation: "16/40 × 100% = 1600/40% = 40%.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many students chose English?",
          latex: "0.30 \\times 40",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12.0"],
          hint: "0.30 means 30%. Find 30% of 40.",
          explanation: "0.30 × 40 = 12 students chose English.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many students chose Science?",
          latex: "\\frac{1}{5} \\times 40",
          marks: 1,
          answer: "8",
          acceptedAnswers: ["8.0"],
          hint: "1/5 of 40 students.",
          explanation: "1/5 × 40 = 8 students chose Science.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "What percentage of the class chose a subject other than Maths, English, or Science?",
          latex: "100\\% - (40\\% + 30\\% + 20\\%)",
          marks: 1,
          answer: "10",
          acceptedAnswers: ["10%"],
          hint: "Add the three percentages and subtract from 100%.",
          explanation: "Maths 40% + English 30% + Science 20% = 90%, so 100% − 90% = 10% chose other subjects.",
        },
      ],
    },
  ],
};

// ─── Lesson 2: Percentage of a quantity ─────────────────────────────────────

const percentageOfQuantity: LessonContent = {
  description: "Calculate a percentage of a quantity and express one quantity as a percentage of another.",
  learningIntention: "Find a percentage of a quantity and express one quantity as a percentage of another.",
  successCriteria: [
    "Convert a percentage to a decimal, then multiply to find a percentage of a quantity.",
    "Use the fraction method (write % over 100, multiply) to find a percentage of a quantity.",
    "Express one quantity as a percentage of another by dividing, then multiplying by 100.",
    "Apply percentage of a quantity in real-world contexts such as test scores and discounts.",
  ],
  teaching: {
    paragraphs: [
      "Finding a percentage of a quantity means taking that many hundredths of the whole. The little word 'of' is the key: in mathematics, 'of' a quantity means multiply by it. So '20% of $50' is asking 'what is twenty hundredths of fifty dollars?'",
      "Picture $50 split into 100 equal pieces of 50 cents each. Twenty of those pieces is $10 — that is 20% of $50. You did not need the picture every time, but it shows why the answer is sensible: 20% is one fifth, and a fifth of $50 is $10.",
      "Formally, $p\\%$ of a quantity $Q$ is $\\frac{p}{100} \\times Q$. Reading it left to right: $\\frac{p}{100}$ turns the percentage into 'how many hundredths', and multiplying by $Q$ takes that share of the whole. The quickest version is to write $\\frac{p}{100}$ as a decimal first, then multiply — so $20\\%$ of $\\(\\$50\\)$ becomes $0.20 \\times 50 = 10$.",
      "Why is dividing by 100 the right move? Because $p\\%$ literally is $\\frac{p}{100}$ — the percentage was hundredths all along. Converting $35\\%$ to $0.35$ and computing $0.35 \\times 80 = 28$ is the same as $\\frac{35}{100} \\times 80 = \\frac{2800}{100} = 28$. The decimal method and the fraction method are the identical calculation written two ways, so use whichever you find clearer.",
      "Reverse the question and you get the second skill: expressing one quantity as a percentage of another. If 15 students out of 25 passed, the fraction that passed is $\\frac{15}{25}$, and a percentage is just that fraction rewritten in hundredths — multiply by $100\\%$: $\\frac{15}{25} \\times 100\\% = 60\\%$. The part always goes on top, the whole on the bottom.",
      "Two errors to head off. First, never multiply by the percentage number itself: $25 \\times 80$ is not 25% of 80 — convert to $0.25$ first, giving $0.25 \\times 80 = 20$. Second, when comparing two amounts make sure they share the same unit before you divide: to find 750 g as a percentage of 5 kg, change 5 kg to 5000 g, then $\\frac{750}{5000} \\times 100\\% = 15\\%$, or you will be dividing grams by kilograms and get nonsense.",
    ],
    latexBlocks: [
      "p\\%\\text{ of }Q = \\frac{p}{100} \\times Q = (p \\div 100) \\times Q",
      "\\text{Express }A\\text{ as a }\\%\\text{ of }B: \\quad \\frac{A}{B} \\times 100\\% \\quad (\\text{part} \\div \\text{whole})",
      "\\text{Same units first, then divide: } \\frac{\\text{part}}{\\text{whole}} \\times 100\\%",
    ],
  },
  workedExamples: [
    {
      title: "Find a percentage of a quantity (decimal method)",
      questionLatex: "\\text{Find }35\\%\\text{ of }\\$240.",
      steps: [
        { explanation: "Convert 35% to a decimal — percent means hundredths, so divide by 100.", latex: "35\\% = \\frac{35}{100} = 0.35" },
        { explanation: "'Of' means multiply, so multiply the decimal by the quantity.", latex: "0.35 \\times 240 = 84" },
      ],
      finalAnswerLatex: "35\\%\\text{ of }\\$240 = \\$84",
    },
    {
      title: "Find a percentage of a quantity (fraction method)",
      questionLatex: "\\text{Find }15\\%\\text{ of }60\\text{ kg.}",
      steps: [
        { explanation: "Write 15% as a fraction over 100 — this is the same number as 0.15, just in fraction form.", latex: "15\\% = \\frac{15}{100}" },
        { explanation: "Multiply the fraction by the quantity to take that share of the whole.", latex: "\\frac{15}{100} \\times 60 = \\frac{900}{100}" },
        { explanation: "Simplify the result.", latex: "\\frac{900}{100} = 9" },
      ],
      finalAnswerLatex: "15\\%\\text{ of }60\\text{ kg} = 9\\text{ kg}",
    },
    {
      title: "Express one quantity as a percentage of another",
      questionLatex: "\\text{A student scores }42\\text{ out of }60.\\text{ Express this as a percentage.}",
      steps: [
        { explanation: "Write the score as a fraction with the part on top and the whole on the bottom.", latex: "\\frac{42}{60}" },
        { explanation: "Multiply by 100% to rewrite that fraction in hundredths.", latex: "\\frac{42}{60} \\times 100\\% = \\frac{4200}{60}\\%" },
        { explanation: "Divide to finish.", latex: "\\frac{4200}{60}\\% = 70\\%" },
      ],
      finalAnswerLatex: "\\text{Score} = 70\\%",
    },
    {
      title: "Harder: mismatched units and a leftover percentage",
      questionLatex: "\\text{A 2 kg bag of nuts contains 360 g of almonds. What percentage are almonds, and what percentage are not?}",
      steps: [
        { explanation: "The two amounts use different units, so convert the whole to grams before dividing.", latex: "2\\text{ kg} = 2000\\text{ g}" },
        { explanation: "Write the almond part over the whole, both in grams.", latex: "\\frac{360}{2000}" },
        { explanation: "Multiply by 100% to express as a percentage.", latex: "\\frac{360}{2000} \\times 100\\% = 18\\%" },
        { explanation: "The rest of the bag is the remaining share of 100%.", latex: "100\\% - 18\\% = 82\\%" },
      ],
      finalAnswerLatex: "18\\%\\text{ are almonds; } 82\\%\\text{ are not}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-pct-qty-g1",
      "To find 25% of $80 using the decimal method, which calculation is correct?",
      "B",
      ["\\(25 \\times 80\\)", "\\(0.25 \\times 80\\)", "\\(80 \\div 25\\)", "\\(25 + 80\\)"],
      "Convert 25% to the decimal 0.25, then multiply: 0.25 × 80 = 20.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-pct-qty-g2",
      "Find 10% of $350.",
      "10\\% \\text{ of } \\$350",
      "35",
      "10% = 0.10. 0.10 × 350 = 35. So 10% of $350 is $35.",
      ["$35", "35.0"]
    ),
    answer(
      "y7-pct-qty-g3",
      "Find 20% of 85 kg.",
      "20\\% \\text{ of } 85",
      "17",
      "20% = 0.20. 0.20 × 85 = 17. So 20% of 85 kg is 17 kg.",
      ["17.0"]
    ),
    answer(
      "y7-pct-qty-g4",
      "A class has 30 students and 18 are girls. What percentage are girls?",
      "\\frac{18}{30} \\times 100\\%",
      "60",
      "18 ÷ 30 × 100% = 60%. So 60% of the class are girls.",
      ["60%"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-pct-qty-i1",
      "Find 45% of 200.",
      "45\\% \\text{ of } 200",
      "90",
      "45% = 0.45. 0.45 × 200 = 90.",
      ["90.0"]
    ),
    answer(
      "y7-pct-qty-i2",
      "Find 12% of $75.",
      "12\\% \\text{ of } \\$75",
      "9",
      "12% = 0.12. 0.12 × 75 = 9. So 12% of $75 is $9.",
      ["$9", "9.0", "$9.00"]
    ),
    answer(
      "y7-pct-qty-i3",
      "A survey of 400 people found that 52% prefer coffee. How many people is this?",
      "52\\% \\text{ of } 400",
      "208",
      "52% = 0.52. 0.52 × 400 = 208. So 208 people prefer coffee.",
      ["208.0"]
    ),
    answer(
      "y7-pct-qty-i4",
      "A bag of rice weighs 5 kg. A smaller bag contains 750 g. What percentage of the large bag's weight is the smaller bag? (Hint: convert both to the same unit first.)",
      "\\frac{750}{5000} \\times 100\\%",
      "15",
      "5 kg = 5000 g. 750 ÷ 5000 × 100% = 75000/5000% = 15%. The smaller bag is 15% of the large bag.",
      ["15%"]
    ),
    choice(
      "y7-pct-qty-i5",
      "A running club has 60 members. 75% turn up to training. How many attend?",
      "C",
      ["30", "40", "45", "50"],
      "75% = 0.75. 0.75 × 60 = 45. So 45 members attend training.",
      "\\text{Select A, B, C, or D.}"
    ),
  ],
  commonMistakes: [
    { mistake: "Multiplying by the percentage itself instead of the decimal: 25 × 80 = 2000 instead of 0.25 × 80 = 20.", fix: "Always convert the percentage to a decimal (divide by 100) before multiplying." },
    { mistake: "Dividing the wrong quantity when expressing one value as a percentage of another (e.g. dividing the total by the part).", fix: "Always divide the part by the whole: (part ÷ whole) × 100%." },
    { mistake: "Forgetting to multiply by 100 after dividing — giving 0.6 instead of 60%.", fix: "After dividing, multiply by 100% to convert the decimal to a percentage." },
    { mistake: "Using different units in the same calculation (e.g. dividing grams by kilograms).", fix: "Convert all values to the same unit before dividing to express as a percentage." },
  ],
  masteryQuiz: [
    answer(
      "y7-pct-qty-m1",
      "Find 30% of 90.",
      "30\\% \\text{ of } 90",
      "27",
      "30% = 0.30. 0.30 × 90 = 27.",
      ["27.0"]
    ),
    choice(
      "y7-pct-qty-m2",
      "Which calculation correctly expresses 36 as a percentage of 48?",
      "A",
      ["\\(36 \\div 48 \\times 100\\)", "\\(48 \\div 36 \\times 100\\)", "\\(36 \\times 48\\)", "\\(36 \\div 100 \\times 48\\)"],
      "To express 36 as a percentage of 48, divide the part (36) by the whole (48) and multiply by 100: 36 ÷ 48 × 100 = 75%."
    ),
    answer(
      "y7-pct-qty-m3",
      "Express 36 as a percentage of 48.",
      "\\frac{36}{48} \\times 100\\%",
      "75",
      "36 ÷ 48 × 100% = 3600/48% = 75%. So 36 is 75% of 48.",
      ["75%"]
    ),
    answer(
      "y7-pct-qty-m4",
      "Find 8% of $1250.",
      "8\\% \\text{ of } \\$1250",
      "100",
      "8% = 0.08. 0.08 × 1250 = 100. So 8% of $1250 is $100.",
      ["$100", "100.0", "$100.00"]
    ),
    answer(
      "y7-pct-qty-m5",
      "A school has 480 students. 35% travel by bus. How many students travel by bus?",
      "35\\% \\text{ of } 480",
      "168",
      "35% = 0.35. 0.35 × 480 = 168. So 168 students travel by bus.",
      ["168.0"]
    ),
    answer(
      "y7-pct-qty-m6",
      "A basketball player makes 27 successful shots out of 36 attempts. What percentage did they make?",
      "\\frac{27}{36} \\times 100\\%",
      "75",
      "27 ÷ 36 × 100% = 75%. The player made 75% of their shots.",
      ["75%"]
    ),
    answer(
      "y7-pct-qty-m7",
      "A garden occupies 120 m² of a 800 m² property. What percentage of the property is the garden?",
      "\\frac{120}{800} \\times 100\\%",
      "15",
      "120 ÷ 800 × 100% = 12000/800% = 15%. The garden covers 15% of the property.",
      ["15%"]
    ),
    choice(
      "y7-pct-qty-m8",
      "A student says 15% of 60 is 9. Another says it is 0.9. Who is correct?",
      "A",
      ["The first student — 0.15 × 60 = 9", "The second student — 15 × 60 = 0.9", "Both are wrong", "Both are correct"],
      "15% = 0.15. 0.15 × 60 = 9. The second student forgot to convert the percentage to a decimal first."
    ),
    answer(
      "y7-pct-qty-m9",
      "A council plant-out programme has 2400 trees. After a drought, only 1800 survive. What percentage survived?",
      "\\frac{1800}{2400} \\times 100\\%",
      "75",
      "1800 ÷ 2400 × 100% = 180000/2400% = 75%. So 75% of the trees survived.",
      ["75%"]
    ),
    answer(
      "y7-pct-qty-m10",
      "Find 6.5% of $400.",
      "6.5\\% \\text{ of } \\$400",
      "26",
      "6.5% = 0.065. 0.065 × 400 = 26. So 6.5% of $400 is $26.",
      ["$26", "26.0", "$26.00"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y7-pct-qty-p01", "Find 50% of 80.", "50\\% \\text{ of } 80", "40", "50% = 0.5. 0.5 × 80 = 40.", ["40.0"]), 1),
    withDifficulty(answer("y7-pct-qty-p02", "Find 10% of 60.", "10\\% \\text{ of } 60", "6", "10% = 0.1. 0.1 × 60 = 6.", ["6.0"]), 1),
    withDifficulty(answer("y7-pct-qty-p03", "Find 25% of 40.", "25\\% \\text{ of } 40", "10", "25% = 0.25. 0.25 × 40 = 10.", ["10.0"]), 1),
    withDifficulty(choice("y7-pct-qty-p04", "Which calculation finds 20% of 50?", "B", ["\\(20 \\times 50\\)", "\\(0.2 \\times 50\\)", "\\(50 \\div 20\\)", "\\(20 + 50\\)"], "Convert 20% to 0.2, then multiply: 0.2 × 50 = 10."), 1),
    withDifficulty(answer("y7-pct-qty-p05", "Find 100% of 35.", "100\\% \\text{ of } 35", "35", "100% of any quantity is the whole quantity: 35.", ["35.0"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y7-pct-qty-p06", "Find 15% of 200.", "15\\% \\text{ of } 200", "30", "0.15 × 200 = 30.", ["30.0"]), 2),
    withDifficulty(answer("y7-pct-qty-p07", "Find 40% of $90.", "40\\% \\text{ of } \\$90", "36", "0.40 × 90 = 36. So 40% of $90 is $36.", ["$36", "36.0", "$36.00"]), 2),
    withDifficulty(answer("y7-pct-qty-p08", "Express 12 as a percentage of 48.", "\\frac{12}{48} \\times 100\\%", "25", "12 ÷ 48 × 100% = 25%.", ["25%"]), 2),
    withDifficulty(answer("y7-pct-qty-p09", "Find 5% of 240.", "5\\% \\text{ of } 240", "12", "0.05 × 240 = 12.", ["12.0"]), 2),
    withDifficulty(choice("y7-pct-qty-p10", "A jar holds 80 marbles. 30% are red. How many are red?", "C", ["20", "22", "24", "26"], "0.30 × 80 = 24 red marbles."), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y7-pct-qty-p11", "Find 65% of 320.", "65\\% \\text{ of } 320", "208", "0.65 × 320 = 208.", ["208.0"]), 3),
    withDifficulty(answer("y7-pct-qty-p12", "Express 51 as a percentage of 60.", "\\frac{51}{60} \\times 100\\%", "85", "51 ÷ 60 × 100% = 85%.", ["85%"]), 3),
    withDifficulty(answer("y7-pct-qty-p13", "Find 7.5% of 600.", "7.5\\% \\text{ of } 600", "45", "0.075 × 600 = 45.", ["45.0"]), 3),
    withDifficulty(answer("y7-pct-qty-p14", "A 2 kg bag of flour is used to make a recipe needing 250 g. What percentage of the bag is used?", "\\frac{250}{2000} \\times 100\\%", "12.5", "2 kg = 2000 g. 250 ÷ 2000 × 100% = 12.5%.", ["12.5%"]), 3),
    withDifficulty(answer("y7-pct-qty-p15", "Find 110% of 50.", "110\\% \\text{ of } 50", "55", "1.10 × 50 = 55. (Over 100% gives more than the original.)", ["55.0"]), 3),
    withDifficulty(choice("y7-pct-qty-p16", "36 students out of 45 passed. What percentage passed?", "D", ["70%", "75%", "78%", "80%"], "36 ÷ 45 × 100% = 80%."), 3),
    withDifficulty(answer("y7-pct-qty-p17", "Find 22% of 350.", "22\\% \\text{ of } 350", "77", "0.22 × 350 = 77.", ["77.0"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y7-pct-qty-p18", "Find 12.5% of 480.", "12.5\\% \\text{ of } 480", "60", "0.125 × 480 = 60.", ["60.0"]), 4),
    withDifficulty(answer("y7-pct-qty-p19", "A 750 mL bottle is 60% full. How many millilitres of liquid does it contain?", "60\\% \\text{ of } 750", "450", "0.60 × 750 = 450 mL.", ["450.0"]), 4),
    withDifficulty(answer("y7-pct-qty-p20", "A test has 80 marks. A student needs 65% to pass. How many marks must they score?", "65\\% \\text{ of } 80", "52", "0.65 × 80 = 52 marks needed to pass.", ["52.0"]), 4),
    withDifficulty(choice("y7-pct-qty-p21", "A library has 1200 books; 18% are non-fiction. How many are non-fiction?", "B", ["196", "216", "224", "240"], "0.18 × 1200 = 216 non-fiction books."), 4),
    withDifficulty(answer("y7-pct-qty-p22", "Express 1.5 km as a percentage of 6 km.", "\\frac{1.5}{6} \\times 100\\%", "25", "1.5 ÷ 6 × 100% = 25%.", ["25%"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y7-pct-qty-p23", "Find 8.75% of 1600.", "8.75\\% \\text{ of } 1600", "140", "0.0875 × 1600 = 140.", ["140.0"]), 5),
    withDifficulty(answer("y7-pct-qty-p24", "A bag contains 250 g of nuts: 90 g are almonds. What percentage are almonds?", "\\frac{90}{250} \\times 100\\%", "36", "90 ÷ 250 × 100% = 36%.", ["36%"]), 5),
    withDifficulty(answer("y7-pct-qty-p25", "In a pond there are 400 fish. 35% are goldfish and 25% are koi. How many fish are neither goldfish nor koi?", "(100\\% - 60\\%) \\text{ of } 400", "160", "Goldfish + koi = 60%, so 40% are neither. 0.40 × 400 = 160 fish.", ["160.0"]), 5),
    withDifficulty(choice("y7-pct-qty-p26", "A recipe uses 320 g of sugar. Maria reduces the sugar to 240 g. What percentage of the original sugar is now used?", "C", ["65%", "70%", "75%", "80%"], "240 ÷ 320 × 100% = 75% of the original sugar."), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-pct-qty-mp1",
      prompt: "A school of 600 students is surveyed about how they travel to school. 45% travel by bus, 30% walk, and the rest are driven by car.",
      latex: "\\text{600 students}",
      answer: "600",
      hint: "Find each percentage of 600, and remember the three groups together make up 100% of the students.",
      explanation: "Part (a): 45% of 600 = 0.45 × 600 = 270. Part (b): 30% of 600 = 0.30 × 600 = 180. Part (c): bus + walk = 75%, so 25% are driven; 0.25 × 600 = 150. Part (d): 270 bus students out of 600 total is 270/600 × 100% = 45% (confirming part a as a check).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many students travel by bus?",
          latex: "45\\% \\text{ of } 600",
          marks: 1,
          answer: "270",
          acceptedAnswers: ["270.0"],
          hint: "Find 45% of 600.",
          explanation: "0.45 × 600 = 270 students travel by bus.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many students walk?",
          latex: "30\\% \\text{ of } 600",
          marks: 1,
          answer: "180",
          acceptedAnswers: ["180.0"],
          hint: "Find 30% of 600.",
          explanation: "0.30 × 600 = 180 students walk.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many students are driven by car?",
          latex: "(100\\% - 75\\%) \\text{ of } 600",
          marks: 1,
          answer: "150",
          acceptedAnswers: ["150.0"],
          hint: "Bus and walking together are 75%, so find the remaining percentage of 600.",
          explanation: "100% − (45% + 30%) = 25%. 0.25 × 600 = 150 students are driven by car.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Of the 600 students, 24 are absent on the day of the survey. What percentage are absent?",
          latex: "\\frac{24}{600} \\times 100\\%",
          marks: 1,
          answer: "4",
          acceptedAnswers: ["4%"],
          hint: "Write the absent count as a fraction of the total, then multiply by 100.",
          explanation: "24 ÷ 600 × 100% = 4% of students are absent.",
        },
      ],
    },
  ],
};

// ─── Lesson 3: Percentage increase and decrease ──────────────────────────────

const percentageIncreaseDecrease: LessonContent = {
  description: "Increase or decrease a quantity by a percentage using a multiplier, and calculate the percentage change between two values.",
  learningIntention: "Apply a percentage increase or decrease to a quantity and calculate the percentage change between an original and a new value.",
  successCriteria: [
    "Increase a quantity by a percentage by multiplying by (1 + percentage/100).",
    "Decrease a quantity by a percentage by multiplying by (1 − percentage/100).",
    "Calculate the multiplier for a given percentage change.",
    "Find the percentage change given an original value and a new value.",
  ],
  teaching: {
    paragraphs: [
      "A percentage increase means adding a slice of the original onto itself. If a $\\(\\$50\\)$ item goes up by 20%, you add 20% of $\\(\\$50\\)$, which is $\\(\\$10\\)$, to reach $\\(\\$60\\)$. The increase is measured against where you started.",
      "There is a faster way to see the same thing. The original is 100% of itself. Adding 20% means the new value is $100\\% + 20\\% = 120\\%$ of the original. And $120\\%$ as a decimal is $1.20$, so the new value is simply $50 \\times 1.20 = 60$. This single number, $1.20$, is called the multiplier.",
      "Why does the multiplier $1.20$ work? Because $50 \\times 1.20 = 50 \\times (1 + 0.20) = 50 + 50 \\times 0.20 = 50 + 10$ — the '$1$' carries the whole original across unchanged, and the '$0.20$' adds exactly the 20% on top. So for any increase of $p\\%$ the multiplier is $1 + \\frac{p}{100}$, and for a decrease of $p\\%$ you subtract instead, giving $1 - \\frac{p}{100}$. A 15% cut keeps 85%, so the multiplier is $0.85$.",
      "To find the percentage change between two values, you must compare the change with the value you started from — the original is the base. So percentage change $= \\frac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%$. Why the original on the bottom? Because 'increase' and 'decrease' both mean 'relative to where it was'; a $\\(\\$10\\)$ rise on a $\\(\\$50\\)$ item ($20\\%$) is a bigger deal than the same $\\(\\$10\\)$ rise on a $\\(\\$500\\)$ item ($2\\%$). A positive answer is an increase, a negative answer a decrease.",
      "Here is the misconception this base catches. A 20% rise followed by a 20% fall does not return you to the start. Start at $\\(\\$100\\)$: up 20% gives $100 \\times 1.20 = 120$; then down 20% takes 20% of $\\(\\$120\\)$, not of $\\(\\$100\\)$, so $120 \\times 0.80 = 96$. You end at $\\(\\$96\\)$, because the second percentage is measured against the larger amount. In multiplier language, $1.20 \\times 0.80 = 0.96$, a net 4% fall.",
      "This is why multipliers are the safe tool for chains of changes: just multiply them. A 25% discount then a 10% discount is $0.75 \\times 0.90 = 0.675$, a 32.5% overall reduction — not 35%. To reverse a single change and recover the original, divide by the multiplier: if a price is $\\(\\$840\\)$ after a 20% rise, the original is $840 \\div 1.20 = 700$.",
    ],
    latexBlocks: [
      "\\text{Increase by }p\\%: \\ \\text{new} = \\text{original} \\times \\left(1 + \\frac{p}{100}\\right)",
      "\\text{Decrease by }p\\%: \\ \\text{new} = \\text{original} \\times \\left(1 - \\frac{p}{100}\\right)",
      "\\text{Percentage change} = \\frac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%",
      "\\text{Chained changes multiply: } 1.20 \\times 0.80 = 0.96 \\neq 1",
    ],
  },
  workedExamples: [
    {
      title: "Increase a price by a percentage",
      questionLatex: "\\text{A shop increases a price of }\\$120\\text{ by }25\\%.\\text{ Find the new price.}",
      steps: [
        { explanation: "The new price keeps 100% and adds 25%, so build the multiplier as 1 + 25/100.", latex: "\\text{multiplier} = 1 + \\frac{25}{100} = 1.25" },
        { explanation: "Multiply the original by the multiplier — the 1 carries the original, the 0.25 adds the rise.", latex: "120 \\times 1.25 = 150" },
      ],
      finalAnswerLatex: "\\text{New price} = \\$150",
    },
    {
      title: "Decrease a quantity by a percentage",
      questionLatex: "\\text{A jacket costs }\\$180.\\text{ It is reduced by }30\\%.\\text{ Find the sale price.}",
      steps: [
        { explanation: "A 30% cut keeps the remaining 70%, so the multiplier is 1 − 30/100.", latex: "\\text{multiplier} = 1 - \\frac{30}{100} = 0.70" },
        { explanation: "Multiply the original price by 0.70 to keep 70% of it.", latex: "180 \\times 0.70 = 126" },
      ],
      finalAnswerLatex: "\\text{Sale price} = \\$126",
    },
    {
      title: "Calculate the percentage change",
      questionLatex: "\\text{A plant grows from }40\\text{ cm to }52\\text{ cm. Find the percentage change.}",
      steps: [
        { explanation: "Find the actual change by subtracting the original from the new value.", latex: "52 - 40 = 12\\text{ cm}" },
        { explanation: "Compare the change to the original (the base) by dividing, then multiply by 100%.", latex: "\\frac{12}{40} \\times 100\\% = 30\\%" },
      ],
      finalAnswerLatex: "\\text{Percentage increase} = 30\\%",
    },
    {
      title: "Harder: a rise then a fall does not cancel",
      questionLatex: "\\text{A \\$200 share rises 20\\%, then falls 20\\% the next day. Find the final price and the overall percentage change.}",
      steps: [
        { explanation: "Apply the 20% rise as a multiplier of 1.20.", latex: "200 \\times 1.20 = 240" },
        { explanation: "The 20% fall is taken on the NEW $240, not the original, so multiply 240 by 0.80.", latex: "240 \\times 0.80 = 192" },
        { explanation: "Compare the final price with the original $200 using the percentage-change formula.", latex: "\\frac{192 - 200}{200} \\times 100\\% = -4\\%" },
      ],
      finalAnswerLatex: "\\text{Final price} = \\$192,\\ \\text{a } 4\\% \\text{ overall decrease (not back to \\$200)}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-pct-chg-g1",
      "Which multiplier is used to increase a value by 40%?",
      "C",
      ["0.40", "0.60", "1.40", "1.60"],
      "A 40% increase means you keep 100% and add 40%, so the multiplier is 1 + 0.40 = 1.40.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-pct-chg-g2",
      "Increase $200 by 15%.",
      "200 \\times 1.15",
      "230",
      "Multiplier = 1 + 15/100 = 1.15. 200 × 1.15 = 230. The new value is $230.",
      ["$230", "230.0", "$230.00"]
    ),
    answer(
      "y7-pct-chg-g3",
      "Decrease $80 by 20%.",
      "80 \\times 0.80",
      "64",
      "Multiplier = 1 − 20/100 = 0.80. 80 × 0.80 = 64. The new value is $64.",
      ["$64", "64.0", "$64.00"]
    ),
    answer(
      "y7-pct-chg-g4",
      "A price rises from $50 to $60. What is the percentage increase?",
      "\\frac{60 - 50}{50} \\times 100\\%",
      "20",
      "Change = 60 − 50 = 10. Percentage change = 10/50 × 100% = 20%. The price increased by 20%.",
      ["20%"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-pct-chg-i1",
      "A population of 2000 birds increases by 12%. What is the new population?",
      "2000 \\times 1.12",
      "2240",
      "Multiplier = 1 + 12/100 = 1.12. 2000 × 1.12 = 2240. The new population is 2240 birds.",
      ["2240.0"]
    ),
    answer(
      "y7-pct-chg-i2",
      "A bike originally costs $350. It is on sale at 18% off. Find the sale price.",
      "350 \\times 0.82",
      "287",
      "Multiplier = 1 − 18/100 = 0.82. 350 × 0.82 = 287. The sale price is $287.",
      ["$287", "287.0", "$287.00"]
    ),
    answer(
      "y7-pct-chg-i3",
      "The temperature drops from 25°C to 20°C. What is the percentage decrease?",
      "\\frac{25 - 20}{25} \\times 100\\%",
      "20",
      "Change = 25 − 20 = 5. Percentage change = 5/25 × 100% = 20%. The temperature fell by 20%.",
      ["20%"]
    ),
    answer(
      "y7-pct-chg-i4",
      "A gym membership costs $480 per year and increases by 7.5%. What is the new annual cost?",
      "480 \\times 1.075",
      "516",
      "Multiplier = 1 + 7.5/100 = 1.075. 480 × 1.075 = 516. The new annual cost is $516.",
      ["$516", "516.0", "$516.00"]
    ),
    choice(
      "y7-pct-chg-i5",
      "A phone price drops from $600 to $480. What is the percentage decrease?",
      "B",
      ["15%", "20%", "25%", "30%"],
      "Change = 600 − 480 = 120. Percentage decrease = 120/600 × 100% = 20%.",
      "\\text{Select A, B, C, or D.}"
    ),
  ],
  commonMistakes: [
    { mistake: "Using the multiplier 0.25 for a 25% increase instead of 1.25.", fix: "A percentage increase multiplier is always greater than 1: multiplier = 1 + p/100." },
    { mistake: "Calculating the change as new ÷ original instead of (new − original) ÷ original.", fix: "Subtract the original from the new value first to get the change, then divide by the original." },
    { mistake: "Finding 30% of the new value instead of the original when checking a decrease.", fix: "Percentage change is always calculated relative to the original (starting) value." },
    { mistake: "Writing a percentage decrease multiplier as 1 + p/100 (e.g. 1.20 for a 20% decrease).", fix: "A decrease multiplier subtracts: 1 − 20/100 = 0.80, not 1.20." },
  ],
  masteryQuiz: [
    answer(
      "y7-pct-chg-m1",
      "Increase 450 by 8%.",
      "450 \\times 1.08",
      "486",
      "Multiplier = 1.08. 450 × 1.08 = 486.",
      ["486.0"]
    ),
    answer(
      "y7-pct-chg-m2",
      "Decrease $340 by 35%.",
      "340 \\times 0.65",
      "221",
      "Multiplier = 1 − 35/100 = 0.65. 340 × 0.65 = 221. The new value is $221.",
      ["$221", "221.0", "$221.00"]
    ),
    choice(
      "y7-pct-chg-m3",
      "A student says a 50% decrease followed by a 50% increase returns to the original price. Is this true?",
      "B",
      ["Yes — the increases and decreases cancel out", "No — the result is 75% of the original", "No — the result is 50% of the original", "Yes — because 50% = 50%"],
      "Start with $100. Decrease 50%: $50. Increase 50%: $50 × 1.5 = $75. The final price is only 75% of the original."
    ),
    answer(
      "y7-pct-chg-m4",
      "A share price rises from $2.50 to $3.00. What is the percentage increase?",
      "\\frac{3.00 - 2.50}{2.50} \\times 100\\%",
      "20",
      "Change = 3.00 − 2.50 = 0.50. Percentage change = 0.50/2.50 × 100% = 20%.",
      ["20%"]
    ),
    answer(
      "y7-pct-chg-m5",
      "A factory produces 1200 items per day. After a productivity boost, output rises by 22.5%. Find the new daily output.",
      "1200 \\times 1.225",
      "1470",
      "Multiplier = 1 + 22.5/100 = 1.225. 1200 × 1.225 = 1470. The new output is 1470 items.",
      ["1470.0"]
    ),
    answer(
      "y7-pct-chg-m6",
      "A town's population falls from 8000 to 6800. Find the percentage decrease.",
      "\\frac{8000 - 6800}{8000} \\times 100\\%",
      "15",
      "Change = 8000 − 6800 = 1200. Percentage decrease = 1200/8000 × 100% = 15%.",
      ["15%"]
    ),
    answer(
      "y7-pct-chg-m7",
      "A retailer marks up a wholesale price of $96 by 37.5%. What is the retail price?",
      "96 \\times 1.375",
      "132",
      "Multiplier = 1 + 37.5/100 = 1.375. 96 × 1.375 = 132. The retail price is $132.",
      ["$132", "132.0", "$132.00"]
    ),
    choice(
      "y7-pct-chg-m8",
      "A coat is reduced from $240 to $180. Which working correctly finds the percentage decrease?",
      "A",
      ["\\((240 - 180) \\div 240 \\times 100\\)", "\\((240 - 180) \\div 180 \\times 100\\)", "\\(180 \\div 240 \\times 100\\)", "\\(240 \\div 180 \\times 100\\)"],
      "Percentage decrease = change ÷ original × 100 = (240 − 180) ÷ 240 × 100 = 60/240 × 100 = 25%."
    ),
    answer(
      "y7-pct-chg-m9",
      "A coat is reduced from $240 to $180. What is the percentage decrease?",
      "\\frac{240 - 180}{240} \\times 100\\%",
      "25",
      "Change = 240 − 180 = 60. Percentage decrease = 60/240 × 100% = 25%.",
      ["25%"]
    ),
    answer(
      "y7-pct-chg-m10",
      "After a 20% wage increase, an employee earns $840 per week. What was the original weekly wage?",
      "\\text{new} = \\text{original} \\times 1.20",
      "700",
      "If the new wage is 120% of the original, then original = 840 ÷ 1.20 = 700. The original weekly wage was $700.",
      ["$700", "700.0", "$700.00"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y7-pct-chg-p01", "Increase 100 by 10%.", "100 \\times 1.10", "110", "100 × 1.10 = 110.", ["110.0"]), 1),
    withDifficulty(answer("y7-pct-chg-p02", "Decrease 100 by 25%.", "100 \\times 0.75", "75", "100 × 0.75 = 75.", ["75.0"]), 1),
    withDifficulty(choice("y7-pct-chg-p03", "Which multiplier increases a value by 20%?", "C", ["0.20", "0.80", "1.20", "2.00"], "A 20% increase keeps 100% and adds 20%: multiplier = 1.20."), 1),
    withDifficulty(answer("y7-pct-chg-p04", "Increase 50 by 50%.", "50 \\times 1.50", "75", "50 × 1.50 = 75.", ["75.0"]), 1),
    withDifficulty(choice("y7-pct-chg-p05", "Which multiplier decreases a value by 10%?", "A", ["0.90", "1.10", "0.10", "0.99"], "A 10% decrease keeps 90%: multiplier = 0.90."), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y7-pct-chg-p06", "Increase $250 by 12%.", "250 \\times 1.12", "280", "250 × 1.12 = 280. The new value is $280.", ["$280", "280.0", "$280.00"]), 2),
    withDifficulty(answer("y7-pct-chg-p07", "Decrease 400 by 15%.", "400 \\times 0.85", "340", "400 × 0.85 = 340.", ["340.0"]), 2),
    withDifficulty(answer("y7-pct-chg-p08", "A price rises from $40 to $46. What is the percentage increase?", "\\frac{46 - 40}{40} \\times 100\\%", "15", "Change = 6. 6/40 × 100% = 15%.", ["15%"]), 2),
    withDifficulty(answer("y7-pct-chg-p09", "Increase 80 by 5%.", "80 \\times 1.05", "84", "80 × 1.05 = 84.", ["84.0"]), 2),
    withDifficulty(choice("y7-pct-chg-p10", "A $60 item is decreased by 25%. What is the new price?", "B", ["$40", "$45", "$48", "$50"], "60 × 0.75 = $45."), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y7-pct-chg-p11", "Increase 320 by 7.5%.", "320 \\times 1.075", "344", "320 × 1.075 = 344.", ["344.0"]), 3),
    withDifficulty(answer("y7-pct-chg-p12", "A population falls from 5000 to 4600. What is the percentage decrease?", "\\frac{5000 - 4600}{5000} \\times 100\\%", "8", "Change = 400. 400/5000 × 100% = 8%.", ["8%"]), 3),
    withDifficulty(answer("y7-pct-chg-p13", "Decrease $720 by 35%.", "720 \\times 0.65", "468", "720 × 0.65 = 468. The new value is $468.", ["$468", "468.0", "$468.00"]), 3),
    withDifficulty(answer("y7-pct-chg-p14", "A salary of $640 increases by 12.5%. Find the new salary.", "640 \\times 1.125", "720", "640 × 1.125 = 720. The new salary is $720.", ["$720", "720.0", "$720.00"]), 3),
    withDifficulty(answer("y7-pct-chg-p15", "A value rises from 250 to 300. What is the percentage increase?", "\\frac{300 - 250}{250} \\times 100\\%", "20", "Change = 50. 50/250 × 100% = 20%.", ["20%"]), 3),
    withDifficulty(choice("y7-pct-chg-p16", "Which working finds the percentage decrease from $80 to $68?", "A", ["\\((80 - 68) \\div 80 \\times 100\\)", "\\((80 - 68) \\div 68 \\times 100\\)", "\\(68 \\div 80 \\times 100\\)", "\\(80 \\div 68 \\times 100\\)"], "Percentage decrease = change ÷ original × 100 = 12 ÷ 80 × 100 = 15%."), 3),
    withDifficulty(answer("y7-pct-chg-p17", "Decrease 900 by 22%.", "900 \\times 0.78", "702", "900 × 0.78 = 702.", ["702.0"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y7-pct-chg-p18", "A car worth $24000 loses 17.5% of its value in a year. What is its new value?", "24000 \\times 0.825", "19800", "24000 × 0.825 = 19800. The car is worth $19,800.", ["$19800", "19800.0", "19,800"]), 4),
    withDifficulty(answer("y7-pct-chg-p19", "After a 25% increase, a price is $200. What was the original price?", "200 \\div 1.25", "160", "Original = 200 ÷ 1.25 = 160. The original price was $160.", ["$160", "160.0", "$160.00"]), 4),
    withDifficulty(answer("y7-pct-chg-p20", "After a 30% discount, an item costs $84. What was the original price?", "84 \\div 0.70", "120", "Sale price = 70% of original. Original = 84 ÷ 0.70 = 120. The original price was $120.", ["$120", "120.0", "$120.00"]), 4),
    withDifficulty(choice("y7-pct-chg-p21", "A quantity is increased by 10% and then the result is increased by 10% again. Overall, by what percentage has it increased?", "C", ["20%", "19%", "21%", "22%"], "Multiplier = 1.10 × 1.10 = 1.21, which is a 21% overall increase, not 20%."), 4),
    withDifficulty(answer("y7-pct-chg-p22", "A share price rises from $1.60 to $2.00. What is the percentage increase?", "\\frac{2.00 - 1.60}{1.60} \\times 100\\%", "25", "Change = 0.40. 0.40/1.60 × 100% = 25%.", ["25%"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y7-pct-chg-p23", "A jacket is reduced by 20%, then a further 10% off the reduced price. The final price is $144. What was the original price?", "144 \\div (0.80 \\times 0.90)", "200", "Combined multiplier = 0.80 × 0.90 = 0.72. Original = 144 ÷ 0.72 = 200. The original price was $200.", ["$200", "200.0", "$200.00"]), 5),
    withDifficulty(answer("y7-pct-chg-p24", "A town's population grows by 8% to reach 5400. What was the original population?", "5400 \\div 1.08", "5000", "Original = 5400 ÷ 1.08 = 5000.", ["5000.0", "5,000"]), 5),
    withDifficulty(choice("y7-pct-chg-p25", "A price increases by 25%, then decreases by 20%. Compared with the start, the final price is:", "B", ["5% higher", "exactly the same", "5% lower", "20% lower"], "Multiplier = 1.25 × 0.80 = 1.00, so the final price equals the original."), 5),
    withDifficulty(answer("y7-pct-chg-p26", "A laptop is on sale for $612 after a 15% discount. How much money was saved compared with the original price?", "\\text{original} = 612 \\div 0.85", "108", "Original = 612 ÷ 0.85 = 720. Saving = 720 − 612 = $108.", ["$108", "108.0", "$108.00"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-pct-chg-mp1",
      prompt: "A bicycle has a recommended retail price of $480. During a sale it is discounted by 25%. Later, after the sale ends, the discounted price is increased by 20%.",
      latex: "\\text{Recommended price} = \\$480",
      answer: "480",
      hint: "Use multipliers: a 25% decrease multiplies by 0.75, and a 20% increase multiplies by 1.20. Apply them one after the other.",
      explanation: "Part (a): 480 × 0.75 = $360 sale price. Part (b): 360 × 1.20 = $432. Part (c): the final price $432 compared with $480 is a decrease of 480 − 432 = $48, which is 48/480 × 100% = 10% below the recommended price.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the sale price after the 25% discount?",
          latex: "480 \\times 0.75",
          marks: 1,
          answer: "360",
          acceptedAnswers: ["$360", "360.0", "$360.00"],
          hint: "A 25% discount means you pay 75%. Multiply by 0.75.",
          explanation: "480 × 0.75 = $360.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "After the sale, the $360 price is increased by 20%. What is the new price?",
          latex: "360 \\times 1.20",
          marks: 1,
          answer: "432",
          acceptedAnswers: ["$432", "432.0", "$432.00"],
          hint: "A 20% increase multiplies by 1.20.",
          explanation: "360 × 1.20 = $432.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "By what percentage is the final price of $432 below the original recommended price of $480?",
          latex: "\\frac{480 - 432}{480} \\times 100\\%",
          marks: 2,
          answer: "10",
          acceptedAnswers: ["10%"],
          hint: "Find the difference from $480, then express it as a percentage of $480.",
          explanation: "Change = 480 − 432 = 48. 48/480 × 100% = 10%. The final price is 10% below the recommended price.",
        },
      ],
    },
  ],
};

// ─── Lesson 4: Percentage applications ──────────────────────────────────────

const percentageApplications: LessonContent = {
  description: "Apply percentages to real-world contexts including GST, discounts, mark-ups, and finding the original price using the unitary method.",
  learningIntention: "Solve problems involving GST, discounts, sale prices, mark-ups, and finding the original price from a discounted price.",
  successCriteria: [
    "Calculate the GST-inclusive price by multiplying the pre-tax price by 1.10.",
    "Find the price after a discount by multiplying by the appropriate multiplier.",
    "Calculate the mark-up amount and selling price given a cost price and mark-up percentage.",
    "Use the unitary method to find the original price when the percentage and final price are known.",
    "Solve multi-step percentage problems set in realistic buying and selling contexts.",
  ],
  teaching: {
    paragraphs: [
      "Everyday money problems — tax, discounts, mark-ups — are all the percentage increase and decrease you already know, dressed in shop language. The skill here is reading the words to find the right multiplier, then working forwards or backwards.",
      "Take GST, the Australian Goods and Services Tax, which adds 10% to the pre-tax price of most items. Adding 10% means the final price is 110% of the original, so the multiplier is $1.10$: a $\\(\\$45\\)$ book becomes $45 \\times 1.10 = \\(\\$49.50\\)$. A 'mark-up' is the same idea from the seller's side — adding a percentage to the cost price — so a $\\(\\$60\\)$ pair of shoes marked up 40% sells for $60 \\times 1.40 = \\(\\$84\\)$.",
      "Discounts go the other way. '$25\\%$ off' subtracts 25% of the price, so you pay the remaining 75% — multiply by $0.75$. The word 'off' is the signal to subtract, so the multiplier is $1 - \\frac{25}{100} = 0.75$, exactly the percentage decrease rule from the previous lesson.",
      "Why is the GST component of an inclusive price found by dividing by 11, not by taking 10%? Because the GST-inclusive total is 110% of the pre-tax price, and 110% splits into 11 equal tenths-of-the-original: ten of them are the goods and one is the tax. So the tax is $\\frac{1}{11}$ of the total — for a $\\(\\$660\\)$ inclusive bill the GST is $660 \\div 11 = \\(\\$60\\)$. Taking 10% of the inclusive total would be wrong, because that 10% is measured against the larger, tax-included amount.",
      "Working backwards to the original price is the unitary method, and it rests on one idea: find what 1% is worth, then scale up to 100%. If a $\\(\\$72\\)$ sale price is 80% of the original (after a 20% discount), then $1\\%$ of the original is $72 \\div 80 = \\(\\$0.90\\)$, and the full $100\\%$ is $0.90 \\times 100 = \\(\\$90\\)$. Equivalently, just divide by the multiplier: $72 \\div 0.80 = 90$.",
      "The error to dissolve is dividing by the wrong number. After a 30% discount you did not pay 30% — you paid 70% — so to recover the original you divide the sale price by $0.70$, never by $0.30$. And for chained shop changes, multiply the multipliers in order: a 40% mark-up then a 25% discount then 10% GST is $1.40 \\times 0.75 \\times 1.10$, applied to the cost price.",
    ],
    latexBlocks: [
      "\\text{GST-inclusive} = \\text{pre-tax} \\times 1.10 \\qquad \\text{GST component} = \\frac{\\text{inclusive total}}{11}",
      "\\text{Discount of }d\\%: \\ \\text{sale price} = \\text{original} \\times \\left(1 - \\frac{d}{100}\\right)",
      "\\text{Unitary method: } \\text{original} = \\frac{\\text{final price}}{\\text{final \\%}} \\times 100 = \\frac{\\text{final price}}{\\text{multiplier}}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate a GST-inclusive price",
      questionLatex: "\\text{A textbook costs }\\$45\\text{ before GST. Find the GST-inclusive price.}",
      steps: [
        { explanation: "Adding 10% GST makes the price 110% of the pre-tax amount, so the multiplier is 1.10.", latex: "\\text{multiplier} = 1 + \\frac{10}{100} = 1.10" },
        { explanation: "Multiply the pre-tax price by 1.10 to add the tax on top.", latex: "45 \\times 1.10 = 49.50" },
      ],
      finalAnswerLatex: "\\text{GST-inclusive price} = \\$49.50",
    },
    {
      title: "Find the sale price after a discount",
      questionLatex: "\\text{A jacket normally costs }\\$160.\\text{ It is on sale at }35\\%\\text{ off. Find the sale price.}",
      steps: [
        { explanation: "'35% off' subtracts 35%, so you pay the remaining 65%.", latex: "\\text{multiplier} = 1 - \\frac{35}{100} = 0.65" },
        { explanation: "Multiply the original price by 0.65 to keep 65% of it.", latex: "160 \\times 0.65 = 104" },
      ],
      finalAnswerLatex: "\\text{Sale price} = \\$104",
    },
    {
      title: "Find the original price using the unitary method",
      questionLatex: "\\text{After a }20\\%\\text{ discount, a camera costs }\\$320.\\text{ Find the original price.}",
      steps: [
        { explanation: "A 20% discount means $320 represents 80% of the original — not the full price.", latex: "80\\%\\text{ of original} = \\$320" },
        { explanation: "Scale down to 1% of the original by dividing by 80.", latex: "1\\%\\text{ of original} = 320 \\div 80 = 4" },
        { explanation: "Scale up to the full 100% by multiplying by 100.", latex: "100\\%\\text{ of original} = 4 \\times 100 = 400" },
      ],
      finalAnswerLatex: "\\text{Original price} = \\$400",
    },
    {
      title: "Harder: mark-up, discount and GST in one chain",
      questionLatex: "\\text{A store buys a tablet for }\\$300,\\text{ marks it up }40\\%,\\text{ discounts the listed price }25\\%,\\text{ then adds }10\\%\\text{ GST. Find the final price.}",
      steps: [
        { explanation: "The 40% mark-up multiplies the cost by 1.40 to set the listed price.", latex: "300 \\times 1.40 = 420" },
        { explanation: "A 25% discount means paying 75%, so multiply the listed price by 0.75.", latex: "420 \\times 0.75 = 315" },
        { explanation: "Adding 10% GST multiplies the discounted price by 1.10.", latex: "315 \\times 1.10 = 346.50" },
        { explanation: "As a check, the three multipliers combine into one overall factor on the cost.", latex: "1.40 \\times 0.75 \\times 1.10 = 1.155,\\quad 300 \\times 1.155 = 346.50" },
      ],
      finalAnswerLatex: "\\text{Final price} = \\$346.50",
    },
  ],
  guidedPractice: [
    choice(
      "y7-pct-app-g1",
      "A hairdryer costs $80 before GST. Which calculation gives the GST-inclusive price?",
      "B",
      ["\\(80 \\times 0.10\\)", "\\(80 \\times 1.10\\)", "\\(80 + 0.10\\)", "\\(80 \\div 1.10\\)"],
      "GST adds 10%, so the final price is 110% of the pre-tax price. Multiply by 1.10: 80 × 1.10 = $88.",
      "\\text{Select A, B, C, or D.}"
    ),
    answer(
      "y7-pct-app-g2",
      "A laptop costs $900 before GST. Find the GST-inclusive price.",
      "900 \\times 1.10",
      "990",
      "900 × 1.10 = 990. The GST-inclusive price is $990.",
      ["$990", "990.0", "$990.00"]
    ),
    answer(
      "y7-pct-app-g3",
      "A shirt normally costs $60. It is discounted by 30%. What is the sale price?",
      "60 \\times 0.70",
      "42",
      "A 30% discount means you pay 70%: 60 × 0.70 = 42. The sale price is $42.",
      ["$42", "42.0", "$42.00"]
    ),
    answer(
      "y7-pct-app-g4",
      "After a 25% discount, a pair of shoes costs $60. What was the original price?",
      "\\text{original} = 60 \\div 0.75",
      "80",
      "A 25% discount means you pay 75%. So original = 60 ÷ 0.75 = 80. The original price was $80.",
      ["$80", "80.0", "$80.00"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-pct-app-i1",
      "A plumber charges $240 for labour before GST. Find the total charge including GST.",
      "240 \\times 1.10",
      "264",
      "240 × 1.10 = 264. The total charge including GST is $264.",
      ["$264", "264.0", "$264.00"]
    ),
    answer(
      "y7-pct-app-i2",
      "A store buys a watch for $80 and marks it up by 60%. What is the selling price?",
      "80 \\times 1.60",
      "128",
      "A 60% mark-up means the selling price is 160% of the cost: 80 × 1.60 = 128. The selling price is $128.",
      ["$128", "128.0", "$128.00"]
    ),
    answer(
      "y7-pct-app-i3",
      "A gaming console is on sale at 15% off its original price of $480. What is the sale price?",
      "480 \\times 0.85",
      "408",
      "A 15% discount means you pay 85%: 480 × 0.85 = 408. The sale price is $408.",
      ["$408", "408.0", "$408.00"]
    ),
    answer(
      "y7-pct-app-i4",
      "After a 40% discount, a bicycle costs $210. What was the original price?",
      "\\text{original} = 210 \\div 0.60",
      "350",
      "A 40% discount means you pay 60%. So original = 210 ÷ 0.60 = 350. The original price was $350.",
      ["$350", "350.0", "$350.00"]
    ),
    choice(
      "y7-pct-app-i5",
      "A café sells coffee for $4.40 including GST. What was the price before GST?",
      "B",
      ["$3.96", "$4.00", "$4.20", "$4.84"],
      "Divide the GST-inclusive price by 1.10: 4.40 ÷ 1.10 = 4.00. The pre-tax price was $4.00.",
      "\\text{Select A, B, C, or D.}"
    ),
  ],
  commonMistakes: [
    { mistake: "Adding 10 to the pre-tax price to find the GST-inclusive price (e.g. $45 + 10 = $55 instead of $45 × 1.10 = $49.50).", fix: "GST is 10% of the price, not a flat $10. Multiply the pre-tax price by 1.10." },
    { mistake: "Subtracting the discount percentage from the original number (e.g. $200 − 20 = $180 for a 20% discount) instead of finding 20% of the price.", fix: "Find 20% of the price first: 20% of $200 = $40. Then subtract: $200 − $40 = $160. Or use the multiplier: $200 × 0.80 = $160." },
    { mistake: "Dividing by the discount percentage instead of the remaining percentage when finding the original price (e.g. dividing by 0.30 instead of 0.70 for a 30% discount).", fix: "After a 30% discount you paid 70% of the original. Divide the sale price by 0.70 (not 0.30) to find the original." },
    { mistake: "Calculating the mark-up on the selling price instead of the cost price.", fix: "Mark-up percentage always applies to the cost (buying) price, not the selling price." },
  ],
  masteryQuiz: [
    answer(
      "y7-pct-app-m1",
      "A speaker costs $350 before GST. Find the GST-inclusive price.",
      "350 \\times 1.10",
      "385",
      "350 × 1.10 = 385. The GST-inclusive price is $385.",
      ["$385", "385.0", "$385.00"]
    ),
    answer(
      "y7-pct-app-m2",
      "A bookshop marks up books by 45% on the cost price. A book costs the shop $20. Find the selling price.",
      "20 \\times 1.45",
      "29",
      "20 × 1.45 = 29. The selling price is $29.",
      ["$29", "29.0", "$29.00"]
    ),
    choice(
      "y7-pct-app-m3",
      "A TV is advertised at 20% off. Its sale price is $720. Which equation finds the original price?",
      "B",
      ["\\(720 \\times 1.20\\)", "\\(720 \\div 0.80\\)", "\\(720 \\times 0.80\\)", "\\(720 \\div 1.20\\)"],
      "A 20% discount means the sale price is 80% of the original. Divide by 0.80 to find 100%: 720 ÷ 0.80 = $900."
    ),
    answer(
      "y7-pct-app-m4",
      "A TV is on sale at 20% off. Its sale price is $720. Find the original price.",
      "720 \\div 0.80",
      "900",
      "Sale price = 80% of original. Original = 720 ÷ 0.80 = 900. The original price was $900.",
      ["$900", "900.0", "$900.00"]
    ),
    answer(
      "y7-pct-app-m5",
      "A tradesperson quotes $660 including GST for a job. How much is the GST component?",
      "660 \\div 11",
      "60",
      "GST is 1/11 of the GST-inclusive price: 660 ÷ 11 = 60. The GST component is $60.",
      ["$60", "60.0", "$60.00"]
    ),
    answer(
      "y7-pct-app-m6",
      "A department store has a 'buy one get one 50% off' deal. Two shirts normally cost $45 each. What is the total cost under this deal?",
      "45 + 45 \\times 0.50",
      "67.5",
      "First shirt: $45 (full price). Second shirt: $45 × 0.50 = $22.50. Total = $45 + $22.50 = $67.50.",
      ["$67.50", "67.50", "$67.5"]
    ),
    answer(
      "y7-pct-app-m7",
      "A market trader buys mangoes for $30 and sells them for $45. What is the percentage mark-up on cost?",
      "\\frac{45 - 30}{30} \\times 100\\%",
      "50",
      "Mark-up = 45 − 30 = $15. Percentage mark-up = 15/30 × 100% = 50%.",
      ["50%"]
    ),
    answer(
      "y7-pct-app-m8",
      "After a 12% GST, a restaurant bill comes to $112. How much was the pre-tax amount?",
      "112 \\div 1.12",
      "100",
      "Pre-tax amount = 112 ÷ 1.12 = 100. The bill before tax was $100.",
      ["$100", "100.0", "$100.00"]
    ),
    choice(
      "y7-pct-app-m9",
      "A shop sells a camera for $528 after a 12% mark-up on cost. What was the cost price?",
      "C",
      ["$480", "$460", "$471.43", "$465"],
      "Selling price = cost × 1.12. Cost = 528 ÷ 1.12 = 471.43 (rounded to the nearest cent). The cost price was approximately $471.43."
    ),
    answer(
      "y7-pct-app-m10",
      "A shoe store sells sneakers for $132 after a 10% GST and a 20% discount off the pre-GST listed price. The listed price was $150. Verify: 15% discount on the listed price gives the same sale price (before GST). What would the GST-inclusive price be with a 15% discount off $150?",
      "150 \\times 0.85 \\times 1.10",
      "140.25",
      "15% discount on $150: 150 × 0.85 = $127.50. Adding 10% GST: 127.50 × 1.10 = $140.25. This is different from $132, confirming the 20% discount scenario.",
      ["$140.25", "140.25"]
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y7-pct-app-p01", "A $50 item has 10% GST added. What is the GST-inclusive price?", "50 \\times 1.10", "55", "50 × 1.10 = 55. The GST-inclusive price is $55.", ["$55", "55.0", "$55.00"]), 1),
    withDifficulty(answer("y7-pct-app-p02", "A $100 item is discounted by 20%. What is the sale price?", "100 \\times 0.80", "80", "100 × 0.80 = 80. The sale price is $80.", ["$80", "80.0", "$80.00"]), 1),
    withDifficulty(choice("y7-pct-app-p03", "GST in Australia adds what percentage to the pre-tax price?", "B", ["5%", "10%", "15%", "20%"], "Australian GST adds 10% to the pre-tax price."), 1),
    withDifficulty(answer("y7-pct-app-p04", "A $200 item is on sale at 50% off. What is the sale price?", "200 \\times 0.50", "100", "200 × 0.50 = 100. The sale price is $100.", ["$100", "100.0", "$100.00"]), 1),
    withDifficulty(choice("y7-pct-app-p05", "Which multiplier adds 10% GST to a price?", "C", ["0.10", "0.90", "1.10", "1.01"], "Adding 10% GST means multiplying by 1.10."), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y7-pct-app-p06", "A meal costs $40 before GST. Find the GST-inclusive price.", "40 \\times 1.10", "44", "40 × 1.10 = 44. The total is $44.", ["$44", "44.0", "$44.00"]), 2),
    withDifficulty(answer("y7-pct-app-p07", "A shop marks up a $50 item by 30%. What is the selling price?", "50 \\times 1.30", "65", "50 × 1.30 = 65. The selling price is $65.", ["$65", "65.0", "$65.00"]), 2),
    withDifficulty(answer("y7-pct-app-p08", "A $250 jacket is 40% off. What is the sale price?", "250 \\times 0.60", "150", "250 × 0.60 = 150. The sale price is $150.", ["$150", "150.0", "$150.00"]), 2),
    withDifficulty(answer("y7-pct-app-p09", "A bill is $220 including 10% GST. What is the GST component? (Divide by 11.)", "220 \\div 11", "20", "GST = 220 ÷ 11 = 20. The GST component is $20.", ["$20", "20.0", "$20.00"]), 2),
    withDifficulty(choice("y7-pct-app-p10", "A $120 item is marked up by 25%. What is the selling price?", "C", ["$140", "$145", "$150", "$155"], "120 × 1.25 = $150."), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y7-pct-app-p11", "A laptop costs $1200 before GST. Find the GST-inclusive price.", "1200 \\times 1.10", "1320", "1200 × 1.10 = 1320. The price is $1320.", ["$1320", "1320.0", "1,320"]), 3),
    withDifficulty(answer("y7-pct-app-p12", "After a 25% discount, a coat costs $90. What was the original price?", "90 \\div 0.75", "120", "Sale price = 75% of original. Original = 90 ÷ 0.75 = 120. The original price was $120.", ["$120", "120.0", "$120.00"]), 3),
    withDifficulty(answer("y7-pct-app-p13", "A trader buys an item for $40 and sells it for $52. What is the percentage mark-up on cost?", "\\frac{52 - 40}{40} \\times 100\\%", "30", "Mark-up = 12. 12/40 × 100% = 30%.", ["30%"]), 3),
    withDifficulty(answer("y7-pct-app-p14", "A coffee costs $5.50 including 10% GST. What was the pre-GST price?", "5.50 \\div 1.10", "5", "5.50 ÷ 1.10 = 5. The pre-GST price was $5.", ["$5", "5.0", "$5.00"]), 3),
    withDifficulty(answer("y7-pct-app-p15", "A store buys shoes for $75 and marks them up by 40%. Find the selling price.", "75 \\times 1.40", "105", "75 × 1.40 = 105. The selling price is $105.", ["$105", "105.0", "$105.00"]), 3),
    withDifficulty(choice("y7-pct-app-p16", "A TV is 20% off and sells for $640. Which finds the original price?", "B", ["\\(640 \\times 0.80\\)", "\\(640 \\div 0.80\\)", "\\(640 \\times 1.20\\)", "\\(640 \\div 1.20\\)"], "Sale price = 80% of original, so original = 640 ÷ 0.80 = $800."), 3),
    withDifficulty(answer("y7-pct-app-p17", "A service costs $360 before GST. Find the total including 10% GST.", "360 \\times 1.10", "396", "360 × 1.10 = 396. The total is $396.", ["$396", "396.0", "$396.00"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y7-pct-app-p18", "After a 35% discount, a guitar costs $260. What was the original price?", "260 \\div 0.65", "400", "Sale price = 65% of original. Original = 260 ÷ 0.65 = 400. The original price was $400.", ["$400", "400.0", "$400.00"]), 4),
    withDifficulty(answer("y7-pct-app-p19", "A quote is $935 including 10% GST. How much is the GST component?", "935 \\div 11", "85", "GST = 935 ÷ 11 = 85. The GST component is $85.", ["$85", "85.0", "$85.00"]), 4),
    withDifficulty(answer("y7-pct-app-p20", "A shop buys a watch for $80 and sells it for $110. What is the percentage mark-up on cost? Round to one decimal place.", "\\frac{110 - 80}{80} \\times 100\\%", "37.5", "Mark-up = 30. 30/80 × 100% = 37.5%.", ["37.5%"]), 4),
    withDifficulty(choice("y7-pct-app-p21", "An item is listed at $200. A 10% discount is applied, then 10% GST is added. What is the final price?", "C", ["$190", "$196", "$198", "$200"], "200 × 0.90 = $180, then 180 × 1.10 = $198."), 4),
    withDifficulty(answer("y7-pct-app-p22", "A 'buy one get one half price' deal applies to two $36 shirts. What is the total cost?", "36 + 36 \\times 0.50", "54", "First shirt $36, second shirt 36 × 0.50 = $18. Total = $54.", ["$54", "54.0", "$54.00"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y7-pct-app-p23", "A camera is marked up 20% on cost then sells with 10% GST added for a final price of $396. What was the cost price?", "396 \\div (1.20 \\times 1.10)", "300", "Combined multiplier = 1.20 × 1.10 = 1.32. Cost = 396 ÷ 1.32 = 300. The cost price was $300.", ["$300", "300.0", "$300.00"]), 5),
    withDifficulty(answer("y7-pct-app-p24", "A jacket originally $250 is discounted 30%, then a $20 voucher is subtracted. What is the final price?", "250 \\times 0.70 - 20", "155", "250 × 0.70 = $175, then 175 − 20 = $155.", ["$155", "155.0", "$155.00"]), 5),
    withDifficulty(choice("y7-pct-app-p25", "A trader sells an item for $90, making a 50% profit on cost. What did the item cost?", "B", ["$45", "$60", "$67.50", "$135"], "Selling price = cost × 1.50, so cost = 90 ÷ 1.50 = $60."), 5),
    withDifficulty(answer("y7-pct-app-p26", "A restaurant bill is $66 including 10% GST. A 15% service charge is then added to the pre-GST amount. What is the service charge in dollars?", "15\\% \\text{ of } (66 \\div 1.10)", "9", "Pre-GST amount = 66 ÷ 1.10 = $60. Service charge = 0.15 × 60 = $9.", ["$9", "9.0", "$9.00"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y7-pct-app-mp1",
      prompt: "An electronics store buys a tablet from its supplier for $300. The store marks the tablet up by 40% to set the listed price. During a sale, the listed price is discounted by 25%. Finally, 10% GST is added to the discounted price at the checkout.",
      latex: "\\text{Supplier cost} = \\$300",
      answer: "300",
      hint: "Work through one step at a time: mark-up multiplies by 1.40, the discount multiplies by 0.75, and GST multiplies by 1.10.",
      explanation: "Part (a): 300 × 1.40 = $420 listed price. Part (b): 420 × 0.75 = $315 discounted price. Part (c): 315 × 1.10 = $346.50 final price. Part (d): the GST component is the discounted price × 10% = 315 × 0.10 = $31.50 (equivalently 346.50 ÷ 11 = $31.50).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the listed price after the 40% mark-up?",
          latex: "300 \\times 1.40",
          marks: 1,
          answer: "420",
          acceptedAnswers: ["$420", "420.0", "$420.00"],
          hint: "A 40% mark-up multiplies the cost by 1.40.",
          explanation: "300 × 1.40 = $420.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the discounted price after 25% is taken off the listed price?",
          latex: "420 \\times 0.75",
          marks: 1,
          answer: "315",
          acceptedAnswers: ["$315", "315.0", "$315.00"],
          hint: "A 25% discount means you pay 75%. Multiply by 0.75.",
          explanation: "420 × 0.75 = $315.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the final price after 10% GST is added to the discounted price?",
          latex: "315 \\times 1.10",
          marks: 1,
          answer: "346.50",
          acceptedAnswers: ["$346.50", "346.5", "$346.5"],
          hint: "Adding 10% GST multiplies by 1.10.",
          explanation: "315 × 1.10 = $346.50.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "How much of the final price is GST?",
          latex: "315 \\times 0.10",
          marks: 1,
          answer: "31.50",
          acceptedAnswers: ["$31.50", "31.5", "$31.5"],
          hint: "The GST is 10% of the discounted price (or the final price divided by 11).",
          explanation: "GST = 315 × 0.10 = $31.50 (also 346.50 ÷ 11 = $31.50).",
        },
      ],
    },
  ],
};

// ─── Lessons map ─────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "converting-fractions-decimals-percentages": convertingFractionsDecimalsPercentages,
  "percentage-of-quantity": percentageOfQuantity,
  "percentage-increase-decrease": percentageIncreaseDecrease,
  "percentage-applications": percentageApplications,
};

// ─── Export function ──────────────────────────────────────────────────────────

export function year7PercentagesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "percentages") {
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
