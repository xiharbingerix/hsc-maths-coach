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
>;

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
      "A percentage is simply a fraction with a denominator of 100. The word 'percent' comes from the Latin 'per centum', meaning 'out of a hundred'. So 47% means 47 out of 100, which is the fraction 47/100.",
      "To convert a fraction to a percentage, multiply it by 100%. For example, 3/4 becomes 3/4 × 100% = 75%. You are just scaling the fraction so its denominator becomes 100.",
      "To convert a percentage to a fraction, write it over 100 and simplify. For example, 60% = 60/100 = 3/5. Dividing both the numerator and denominator by their highest common factor (here, 20) gives the simplest form.",
      "Decimals and percentages are closely related: move the decimal point two places to the right to get a percentage, or two places to the left to get a decimal. For example, 0.35 = 35% and 8% = 0.08.",
      "To order a mixed list, convert everything to the same form — decimals are usually easiest. Then compare the decimal values and restate the original forms in order.",
    ],
    latexBlocks: [
      "\\text{fraction} \\to \\text{percentage}: \\quad \\frac{a}{b} \\times 100\\%",
      "\\text{percentage} \\to \\text{fraction}: \\quad n\\% = \\frac{n}{100} \\text{ (simplify)}",
      "\\text{decimal} \\to \\text{percentage}: \\times 100 \\qquad \\text{percentage} \\to \\text{decimal}: \\div 100",
    ],
  },
  workedExamples: [
    {
      title: "Convert a fraction to a percentage",
      questionLatex: "\\text{Convert }\\dfrac{7}{20}\\text{ to a percentage.}",
      steps: [
        { explanation: "Multiply the fraction by 100% to scale it to parts per hundred.", latex: "\\frac{7}{20} \\times 100\\% = \\frac{700}{20}\\%" },
        { explanation: "Divide 700 by 20 to get the percentage.", latex: "700 \\div 20 = 35\\%" },
      ],
      finalAnswerLatex: "\\dfrac{7}{20} = 35\\%",
    },
    {
      title: "Convert a percentage to a fraction in simplest form",
      questionLatex: "\\text{Convert }45\\%\\text{ to a fraction in simplest form.}",
      steps: [
        { explanation: "Write the percentage as a fraction over 100.", latex: "45\\% = \\frac{45}{100}" },
        { explanation: "Find the highest common factor of 45 and 100, which is 5, then divide.", latex: "\\frac{45 \\div 5}{100 \\div 5} = \\frac{9}{20}" },
      ],
      finalAnswerLatex: "45\\% = \\dfrac{9}{20}",
    },
    {
      title: "Order a mixed list from smallest to largest",
      questionLatex: "\\text{Order from smallest to largest: }\\quad 0.6,\\quad 55\\%,\\quad \\frac{3}{5},\\quad \\frac{7}{10}",
      steps: [
        { explanation: "Convert every value to a decimal so they can be compared directly.", latex: "0.6,\\quad 0.55,\\quad 0.6,\\quad 0.7" },
        { explanation: "Arrange the decimals in order: 0.55 < 0.6 = 0.6 < 0.7.", latex: "0.55 < 0.6 = 0.6 < 0.7" },
        { explanation: "Restate in the original forms. Note that 0.6 and 3/5 are equal.", latex: "55\\% < 0.6 = \\frac{3}{5} < \\frac{7}{10}" },
      ],
      finalAnswerLatex: "55\\% < 0.6 = \\dfrac{3}{5} < \\dfrac{7}{10}",
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
      "Finding a percentage of a quantity means finding that fraction of the total. For example, 20% of $50 means 'what is 20 hundredths of $50?' The word 'of' in maths means multiply.",
      "The quickest method is to convert the percentage to a decimal, then multiply. For example, 20% of $50: convert 20% to 0.20, then multiply — 0.20 × 50 = $10. This method works for any percentage.",
      "You can also use the fraction method: write the percentage as a fraction over 100, then multiply. For example, 35% of 80 = 35/100 × 80 = 2800/100 = 28. Both methods give the same answer — use whichever feels clearer.",
      "To express one quantity as a percentage of another, divide the part by the total, then multiply by 100. For example, if 15 students out of 25 passed a quiz: 15 ÷ 25 × 100% = 60%. The key is to always divide the part by the whole.",
    ],
    latexBlocks: [
      "p\\%\\text{ of }Q = \\frac{p}{100} \\times Q",
      "p\\%\\text{ of }Q = p \\div 100 \\times Q \\quad (\\text{decimal method})",
      "\\text{Express }A\\text{ as a }\\%\\text{ of }B: \\quad \\frac{A}{B} \\times 100\\%",
    ],
  },
  workedExamples: [
    {
      title: "Find a percentage of a quantity (decimal method)",
      questionLatex: "\\text{Find }35\\%\\text{ of }\\$240.",
      steps: [
        { explanation: "Convert 35% to a decimal by dividing by 100.", latex: "35\\% = 0.35" },
        { explanation: "Multiply the decimal by the quantity.", latex: "0.35 \\times 240 = 84" },
      ],
      finalAnswerLatex: "35\\%\\text{ of }\\$240 = \\$84",
    },
    {
      title: "Find a percentage of a quantity (fraction method)",
      questionLatex: "\\text{Find }15\\%\\text{ of }60\\text{ kg.}",
      steps: [
        { explanation: "Write 15% as a fraction over 100.", latex: "15\\% = \\frac{15}{100}" },
        { explanation: "Multiply the fraction by the quantity.", latex: "\\frac{15}{100} \\times 60 = \\frac{900}{100} = 9" },
      ],
      finalAnswerLatex: "15\\%\\text{ of }60\\text{ kg} = 9\\text{ kg}",
    },
    {
      title: "Express one quantity as a percentage of another",
      questionLatex: "\\text{A student scores }42\\text{ out of }60.\\text{ Express this as a percentage.}",
      steps: [
        { explanation: "Divide the part by the whole to form a fraction.", latex: "\\frac{42}{60}" },
        { explanation: "Multiply by 100% to convert to a percentage.", latex: "\\frac{42}{60} \\times 100\\% = 70\\%" },
      ],
      finalAnswerLatex: "\\text{Score} = 70\\%",
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
      "A percentage increase means adding a percentage of the original value to itself. A 20% increase on $50 adds 20% of $50 = $10, giving $60. You can also think of this as keeping 100% and adding 20%, which is 120% of the original — so multiply by 1.20.",
      "A percentage decrease subtracts a percentage from the original. A 15% decrease on $80 removes 15% of $80 = $12, giving $68. This is the same as keeping 85% of the original — so multiply by 0.85. The multiplier method is faster for large numbers.",
      "The multiplier for a percentage increase of p% is (1 + p/100). The multiplier for a decrease of p% is (1 − p/100). Always calculate the multiplier first, then multiply by the original value.",
      "To find the percentage change between two values, use this formula: percentage change = (new − original) ÷ original × 100%. A positive answer means an increase; a negative answer means a decrease.",
    ],
    latexBlocks: [
      "\\text{Increase by }p\\%: \\quad \\text{new value} = \\text{original} \\times \\left(1 + \\frac{p}{100}\\right)",
      "\\text{Decrease by }p\\%: \\quad \\text{new value} = \\text{original} \\times \\left(1 - \\frac{p}{100}\\right)",
      "\\text{Percentage change} = \\frac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%",
    ],
  },
  workedExamples: [
    {
      title: "Increase a price by a percentage",
      questionLatex: "\\text{A shop increases a price of }\\$120\\text{ by }25\\%.\\text{ Find the new price.}",
      steps: [
        { explanation: "Calculate the multiplier for a 25% increase: add 25% to 100%.", latex: "\\text{multiplier} = 1 + \\frac{25}{100} = 1.25" },
        { explanation: "Multiply the original price by the multiplier.", latex: "120 \\times 1.25 = 150" },
      ],
      finalAnswerLatex: "\\text{New price} = \\$150",
    },
    {
      title: "Decrease a quantity by a percentage",
      questionLatex: "\\text{A jacket costs }\\$180.\\text{ It is reduced by }30\\%.\\text{ Find the sale price.}",
      steps: [
        { explanation: "Calculate the multiplier for a 30% decrease: subtract 30% from 100%.", latex: "\\text{multiplier} = 1 - \\frac{30}{100} = 0.70" },
        { explanation: "Multiply the original price by the multiplier.", latex: "180 \\times 0.70 = 126" },
      ],
      finalAnswerLatex: "\\text{Sale price} = \\$126",
    },
    {
      title: "Calculate the percentage change",
      questionLatex: "\\text{A plant grows from }40\\text{ cm to }52\\text{ cm.\\text{ Find the percentage change.}}",
      steps: [
        { explanation: "Subtract the original value from the new value to find the change.", latex: "52 - 40 = 12\\text{ cm}" },
        { explanation: "Divide the change by the original value and multiply by 100%.", latex: "\\frac{12}{40} \\times 100\\% = 30\\%" },
      ],
      finalAnswerLatex: "\\text{Percentage increase} = 30\\%",
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
      "GST (Goods and Services Tax) in Australia adds 10% to the pre-tax price of most items. To find the GST-inclusive price, multiply the pre-tax price by 1.10. To find the GST component alone, divide the GST-inclusive price by 11 (since 1/11 of the total is the tax).",
      "A discount reduces the price by a percentage of the original. A 25% discount means you pay only 75% of the original price — so multiply by 0.75. In shops, 'off' means subtract: '25% off' → multiply by (1 − 0.25).",
      "A mark-up adds a percentage to the cost price to set a selling price. If a shop buys a pair of shoes for $60 and marks them up by 40%, the selling price is 60 × 1.40 = $84. The mark-up amount itself is 40% of the cost price.",
      "To find the original price when you only know the final price and the percentage applied, use the unitary method. Identify what percentage the final price represents, find 1%, then multiply by 100. For example, if a sale price of $72 is 80% of the original, then 1% = $72 ÷ 80 = $0.90, and 100% = $0.90 × 100 = $90.",
    ],
    latexBlocks: [
      "\\text{GST-inclusive price} = \\text{pre-tax price} \\times 1.10",
      "\\text{Sale price} = \\text{original price} \\times \\left(1 - \\frac{\\text{discount}\\%}{100}\\right)",
      "\\text{Original price} = \\frac{\\text{final price}}{\\text{final percentage}} \\times 100",
    ],
  },
  workedExamples: [
    {
      title: "Calculate a GST-inclusive price",
      questionLatex: "\\text{A textbook costs }\\$45\\text{ before GST.\\text{ Find the GST-inclusive price.}}",
      steps: [
        { explanation: "GST is 10%, so the GST-inclusive price is 110% of the pre-tax price. The multiplier is 1.10.", latex: "\\text{multiplier} = 1.10" },
        { explanation: "Multiply the pre-tax price by 1.10.", latex: "45 \\times 1.10 = 49.50" },
      ],
      finalAnswerLatex: "\\text{GST-inclusive price} = \\$49.50",
    },
    {
      title: "Find the sale price after a discount",
      questionLatex: "\\text{A jacket normally costs }\\$160.\\text{ It is on sale at }35\\%\\text{ off. Find the sale price.}",
      steps: [
        { explanation: "A 35% discount means you pay 65% of the original. The multiplier is 1 − 0.35 = 0.65.", latex: "\\text{multiplier} = 0.65" },
        { explanation: "Multiply the original price by the multiplier.", latex: "160 \\times 0.65 = 104" },
      ],
      finalAnswerLatex: "\\text{Sale price} = \\$104",
    },
    {
      title: "Find the original price using the unitary method",
      questionLatex: "\\text{After a 20\\% discount, a camera costs }\\$320.\\text{ Find the original price.}",
      steps: [
        { explanation: "A 20% discount means the sale price is 80% of the original price.", latex: "80\\%\\text{ of original} = \\$320" },
        { explanation: "Find 1% of the original by dividing $320 by 80.", latex: "1\\%\\text{ of original} = 320 \\div 80 = 4" },
        { explanation: "Find 100% (the original price) by multiplying by 100.", latex: "100\\%\\text{ of original} = 4 \\times 100 = 400" },
      ],
      finalAnswerLatex: "\\text{Original price} = \\$400",
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
