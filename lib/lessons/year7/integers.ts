import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  hint = "Place the integers on a number line to compare them."
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

  const unicodeMinus = ans.startsWith("-") ? [ans.replace("-", "−")] : [];

  return {
    id,
    prompt,
    latex,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants, ...unicodeMinus])),
    hint,
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

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty-tagged pool builders
// ─────────────────────────────────────────────────────────────────────────────

function poolAnswer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = [],
  hint = "Apply the rule taught in this lesson, then check the sign."
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
  const unicodeMinus = ans.startsWith("-") ? [ans.replace("-", "−")] : [];
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: ans,
    acceptedAnswers: Array.from(new Set([ans, ...acceptedAnswers, ...autoVariants, ...unicodeMinus])),
    hint,
    explanation,
  };
}

function poolChoice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, index) => ({ label, text: choices[index] })),
    answer: ans,
    hint: "Consider the key rule taught in this lesson before choosing.",
    explanation,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — Integers on the Number Line
// ─────────────────────────────────────────────────────────────────────────────

const integersNumberLine: LessonContent = {
  description: "Compare, order, and represent integers on a number line, and find the absolute value of an integer.",
  learningIntention: "Represent integers on a number line, compare their values using inequality symbols, and calculate absolute value.",
  successCriteria: [
    "Place positive and negative integers correctly on a number line.",
    "Compare two integers using the symbols < and > by using their positions on the number line.",
    "Order a set of integers from smallest to largest.",
    "Calculate the absolute value of an integer as its distance from zero.",
  ],
  teaching: {
    paragraphs: [
      "Integers are the whole numbers: ..., -3, -2, -1, 0, 1, 2, 3, ... The negative integers sit to the left of zero on the number line, and the positive integers sit to the right. Zero is neither positive nor negative.",
      "The further right a number sits on the number line, the larger it is. So -1 is greater than -5, even though -5 looks like a 'bigger' number at first glance. A negative number close to zero is always greater than one further from zero.",
      "The absolute value of a number is its distance from zero on the number line, ignoring direction. We write absolute value using vertical bars: |−7| = 7 and |3| = 3. Distance is never negative, so absolute value is always zero or positive.",
      "A common trap: students think −8 > −3 because 8 > 3. Always picture the number line — −3 is closer to zero and sits to the right of −8, so −3 > −8.",
    ],
    latexBlocks: [
      "\\ldots < -3 < -2 < -1 < 0 < 1 < 2 < 3 < \\ldots",
      "|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases}",
      "|-7| = 7, \\quad |3| = 3, \\quad |0| = 0",
    ],
  },
  workedExamples: [
    {
      title: "Order integers from smallest to largest",
      questionLatex: "\\text{Write in order from smallest to largest: } 3,\\; -5,\\; 0,\\; -1,\\; 4.",
      steps: [
        {
          explanation: "Imagine a number line. Negative numbers sit to the left of zero, positive to the right.",
          latex: "\\leftarrow \\quad -5 \\quad -1 \\quad 0 \\quad 3 \\quad 4 \\quad \\rightarrow",
        },
        {
          explanation: "Read the numbers from left to right — left means smaller.",
          latex: "-5 < -1 < 0 < 3 < 4",
        },
      ],
      finalAnswerLatex: "-5,\\; -1,\\; 0,\\; 3,\\; 4",
    },
    {
      title: "Calculate absolute value",
      questionLatex: "\\text{Find: } (a)\\; |-9| \\qquad (b)\\; |6|",
      steps: [
        {
          explanation: "Absolute value is distance from zero, always positive or zero.",
          latex: "|-9| = 9 \\quad \\text{(9 steps from zero)}",
        },
        {
          explanation: "A positive number is already its own distance from zero.",
          latex: "|6| = 6",
        },
      ],
      finalAnswerLatex: "|-9| = 9, \\quad |6| = 6",
    },
    {
      title: "Compare integers using inequality symbols",
      questionLatex: "\\text{Insert < or > to make each statement true: } -4 \\;\\square\\; 2, \\quad -6 \\;\\square\\; -2.",
      steps: [
        {
          explanation: "-4 sits to the left of 2 on the number line, so it is smaller.",
          latex: "-4 < 2",
        },
        {
          explanation: "-6 sits further left than -2, so -6 is the smaller number.",
          latex: "-6 < -2",
        },
      ],
      finalAnswerLatex: "-4 < 2 \\quad \\text{and} \\quad -6 < -2",
    },
  ],
  guidedPractice: [
    choice(
      "y7-int-nl-g1",
      "Which inequality is correct?",
      "C",
      ["-3 > -1", "-5 > 0", "-2 > -7", "-4 > 1"],
      "-2 sits to the right of -7 on the number line, so -2 > -7. All other options are false.",
      "\\text{Choose the correct inequality.}"
    ),
    answer(
      "y7-int-nl-g2",
      "What is the absolute value of -11? Write just the number.",
      "|{-11}|",
      "11",
      "|-11| = 11 because -11 is 11 steps from zero on the number line.",
      [],
      "Absolute value is the distance from zero — it is always positive."
    ),
    answer(
      "y7-int-nl-g3",
      "Order these integers from smallest to largest and write the smallest one: -8, 2, -3, 0, 5.",
      "\\text{Order: } -8,\\; -3,\\; 0,\\; 2,\\; 5",
      "-8",
      "-8 is furthest to the left on the number line, making it the smallest. The order is -8, -3, 0, 2, 5.",
      ["−8"],
      "Place each number on a number line. The leftmost is the smallest."
    ),
    answer(
      "y7-int-nl-g4",
      "What integer has an absolute value of 6 and is negative?",
      "|x| = 6,\\; x < 0",
      "-6",
      "If |x| = 6, then x = 6 or x = -6. The negative one is -6.",
      ["−6"],
      "Absolute value 6 means the number is 6 units from zero — it could be 6 or -6."
    ),
  ],
  independentPractice: [
    answer(
      "y7-int-nl-i1",
      "Find |−15|. Write just the number.",
      "|{-15}|",
      "15",
      "|-15| = 15 because -15 is 15 units from zero on the number line.",
      [],
      "Absolute value is distance from zero — ignore the sign."
    ),
    answer(
      "y7-int-nl-i2",
      "Which is greater: -4 or -9? Write the greater integer.",
      "-4 \\;\\square\\; -9",
      "-4",
      "-4 is closer to zero and sits to the right of -9 on the number line, so -4 > -9.",
      ["−4"],
      "On a number line, the number further to the right is greater."
    ),
    answer(
      "y7-int-nl-i3",
      "Order -6, 1, -10, 4, -2 from smallest to largest. Write the largest integer.",
      "\\text{Order: } -10,\\; -6,\\; -2,\\; 1,\\; 4",
      "4",
      "From smallest to largest: -10, -6, -2, 1, 4. The largest is 4.",
      [],
      "Place each integer on a number line and read from left to right."
    ),
    answer(
      "y7-int-nl-i4",
      "A submarine is at -45 m (below sea level) and a fish is at -12 m. Which is deeper? Write the depth as a negative integer.",
      "\\text{Which is smaller: } -45 \\text{ or } -12?",
      "-45",
      "-45 < -12 on the number line, so the submarine at -45 m is deeper below sea level.",
      ["−45"],
      "Deeper below sea level means a more negative number — further left on the number line."
    ),
    choice(
      "y7-int-nl-i5",
      "Which list is ordered correctly from smallest to largest?",
      "B",
      ["-1, -3, -5, 0, 2", "-5, -3, -1, 0, 2", "0, -1, -3, -5, 2", "2, 0, -1, -3, -5"],
      "-5 < -3 < -1 < 0 < 2 is the correct order from smallest to largest. Option B is correct.",
      "\\text{Smallest to largest}"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Thinking -8 > -3 because 8 is larger than 3.",
      fix: "On the number line, -3 is to the right of -8, so -3 > -8. For negatives, the number closer to zero is always greater.",
    },
    {
      mistake: "Writing |-5| = -5.",
      fix: "Absolute value is always positive or zero. |-5| = 5 because -5 is 5 steps from zero.",
    },
    {
      mistake: "Confusing 'deepest' or 'coldest' with 'greatest' when working in context.",
      fix: "The deepest or coldest value is the most negative (the smallest integer). Read the question carefully to check whether you want the greatest or smallest value.",
    },
    {
      mistake: "Placing negative numbers in the wrong direction on the number line (e.g. -3 to the right of 0).",
      fix: "Negative numbers always sit to the left of zero. The larger the magnitude, the further left they sit.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-int-nl-m1",
      "Find |−23|.",
      "|{-23}|",
      "23",
      "|-23| = 23 because -23 is 23 units from zero on the number line.",
      [],
      "Absolute value is distance from zero."
    ),
    choice(
      "y7-int-nl-m2",
      "Which statement about -7 and -2 is correct?",
      "B",
      ["-7 > -2", "-2 > -7", "-7 = -2", "|-7| < |-2|"],
      "-2 sits to the right of -7 on the number line, so -2 > -7. Also |-7| = 7 > |-2| = 2, making option D false.",
      "-7 \\;\\square\\; -2"
    ),
    answer(
      "y7-int-nl-m3",
      "Order -3, -10, 5, -1, 0 from smallest to largest. Write the second-smallest integer.",
      "\\text{Order: } -10,\\; -3,\\; -1,\\; 0,\\; 5",
      "-3",
      "Ordered from smallest to largest: -10, -3, -1, 0, 5. The second smallest is -3.",
      ["−3"],
      "List all numbers in order on a number line first."
    ),
    answer(
      "y7-int-nl-m4",
      "What is |0|?",
      "|0|",
      "0",
      "|0| = 0 because zero is zero steps from itself on the number line.",
      [],
      "Absolute value is distance from zero — zero is zero steps from itself."
    ),
    answer(
      "y7-int-nl-m5",
      "The temperature in Canberra was -7°C on Monday and -12°C on Tuesday. What is the difference in absolute values? (Subtract the smaller absolute value from the larger.)",
      "|-12| - |-7|",
      "5",
      "|-12| = 12 and |-7| = 7. The difference is 12 - 7 = 5.",
      [],
      "Find each absolute value, then subtract."
    ),
    answer(
      "y7-int-nl-m6",
      "How many integers are between -4 and 3 (not including -4 and 3 themselves)?",
      "\\text{Integers between } -4 \\text{ and } 3",
      "6",
      "The integers between -4 and 3 (exclusive) are: -3, -2, -1, 0, 1, 2. That is 6 integers.",
      [],
      "List the integers strictly between the two endpoints."
    ),
    choice(
      "y7-int-nl-m7",
      "A diver is at -18 m and a rock is at -5 m. Which is at a greater depth (further below sea level)?",
      "A",
      ["The diver at -18 m", "The rock at -5 m", "They are at the same depth", "Cannot tell"],
      "-18 < -5 on the number line, so -18 m is further below sea level — the diver is deeper.",
      "\\text{Which is deeper: } -18 \\text{ m or } -5 \\text{ m?}"
    ),
    answer(
      "y7-int-nl-m8",
      "Write the integer that is 4 units to the left of -2 on the number line.",
      "-2 - 4",
      "-6",
      "Moving 4 units to the left of -2 means subtracting 4: -2 - 4 = -6.",
      ["−6"],
      "Moving left on the number line means decreasing the value."
    ),
    answer(
      "y7-int-nl-m9",
      "Two integers have absolute values of 5 and 8. If both are negative, what is the greater of the two integers?",
      "\\text{Which is greater: } -5 \\text{ or } -8?",
      "-5",
      "The two negative integers are -5 and -8. Since -5 > -8 (closer to zero), -5 is the greater integer.",
      ["−5"],
      "For negative integers, the one closer to zero (smaller absolute value) is greater."
    ),
    answer(
      "y7-int-nl-m10",
      "A building has floors numbered -2 (basement level 2), -1 (basement level 1), 0 (ground), 1, 2, ..., 10. How many floors separate floor -2 and floor 5? (Count the floors between them, not including those two floors.)",
      "\\text{Floors between } -2 \\text{ and } 5",
      "6",
      "Floors between -2 and 5 (exclusive): -1, 0, 1, 2, 3, 4. That is 6 floors.",
      [],
      "List all floor numbers strictly between the two given floors and count them."
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    poolAnswer("y7-int-nl-p1", "Find |−3|.", "|{-3}|", "3", "|-3| = 3 because -3 is 3 units from zero.", 1),
    poolAnswer("y7-int-nl-p2", "Find |8|.", "|8|", "8", "|8| = 8 because 8 is already its own distance from zero.", 1),
    poolChoice("y7-int-nl-p3", "Which integer is the smallest?", "C", ["-1", "0", "-4", "2"],
      "-4 is furthest to the left on the number line, so it is the smallest.", 1, "\\text{Smallest integer?}"),
    poolAnswer("y7-int-nl-p4", "Which is greater: -2 or -9? Write the greater integer.", "-2 \\;\\square\\; -9", "-2",
      "-2 is closer to zero and sits to the right of -9, so -2 > -9.", 1, ["−2"]),
    poolChoice("y7-int-nl-p5", "Where does -5 sit relative to zero on the number line?", "B",
      ["5 units to the right", "5 units to the left", "At zero", "10 units to the right"],
      "Negative numbers sit to the left of zero; -5 is 5 units left.", 1, "\\text{Position of } -5"),
    // ── Difficulty 2 ──
    poolAnswer("y7-int-nl-p6", "Find |−14|.", "|{-14}|", "14", "|-14| = 14, the distance of -14 from zero.", 2),
    poolAnswer("y7-int-nl-p7", "Order -7, 3, -2, 0 from smallest to largest. Write the smallest.", "\\text{Order these}", "-7",
      "From smallest to largest: -7, -2, 0, 3. The smallest is -7.", 2, ["−7"]),
    poolChoice("y7-int-nl-p8", "Which inequality is true?", "D", ["-2 > 1", "-8 > -3", "0 > 5", "-4 > -10"],
      "-4 sits to the right of -10, so -4 > -10. The others are all false.", 2, "\\text{True inequality?}"),
    poolAnswer("y7-int-nl-p9", "What negative integer has an absolute value of 9?", "|x| = 9,\\; x < 0", "-9",
      "If |x| = 9 then x = 9 or x = -9; the negative one is -9.", 2, ["−9"]),
    poolAnswer("y7-int-nl-p10", "How many integers lie between -3 and 3 (exclusive)?", "\\text{Between } -3 \\text{ and } 3", "5",
      "The integers are -2, -1, 0, 1, 2 — that is 5 integers.", 2),
    poolAnswer("y7-int-nl-p11", "Which is deeper: a fish at -8 m or a shark at -20 m? Write the deeper depth.",
      "\\text{Deeper: } -8 \\text{ or } -20?", "-20", "-20 < -8, so -20 m is deeper below sea level.", 2, ["−20"]),
    // ── Difficulty 3 ──
    poolAnswer("y7-int-nl-p12", "Write the integer 5 units to the left of -1.", "-1 - 5", "-6",
      "Moving 5 units left of -1: -1 - 5 = -6.", 3, ["−6"]),
    poolAnswer("y7-int-nl-p13", "Two negative integers have absolute values 4 and 11. Write the greater integer.",
      "\\text{Greater: } -4 \\text{ or } -11?", "-4", "The integers are -4 and -11; -4 is closer to zero, so it is greater.", 3, ["−4"]),
    poolChoice("y7-int-nl-p14", "Which statement is correct?", "A",
      ["|-6| > |-2|", "|-2| > |-6|", "|-6| = |-2|", "|-6| < 0"],
      "|-6| = 6 and |-2| = 2, so |-6| > |-2|.", 3, "\\text{Compare absolute values}"),
    poolAnswer("y7-int-nl-p15", "Order -5, -12, 4, -1, 0. Write the second-largest integer.", "\\text{Order these}", "0",
      "From smallest to largest: -12, -5, -1, 0, 4. The second-largest is 0.", 3),
    poolAnswer("y7-int-nl-p16", "Find |−7| + |3|.", "|{-7}| + |3|", "10", "|-7| = 7 and |3| = 3, so 7 + 3 = 10.", 3),
    poolAnswer("y7-int-nl-p17", "A lift is on floor -4 and the lobby is floor 0. How many floors apart are they?",
      "\\text{Floors apart}", "4", "The distance from -4 to 0 is |0 - (-4)| = 4 floors.", 3),
    // ── Difficulty 4 ──
    poolAnswer("y7-int-nl-p18", "Find |−15| − |−9|.", "|{-15}| - |{-9}|", "6",
      "|-15| = 15 and |-9| = 9, so 15 - 9 = 6.", 4),
    poolAnswer("y7-int-nl-p19", "How many integers x satisfy |x| < 4 (so -4 < x < 4)?", "|x| < 4", "7",
      "The integers are -3, -2, -1, 0, 1, 2, 3 — that is 7 integers.", 4),
    poolAnswer("y7-int-nl-p20", "The temperatures -6°C, 2°C, -9°C, -1°C are recorded. How many are below -3°C?",
      "\\text{Below } -3?", "2", "Below -3 means more negative than -3: -6 and -9 qualify, so 2 readings.", 4),
    poolChoice("y7-int-nl-p21", "Which integer has the largest absolute value?", "C",
      ["-7", "5", "-9", "8"], "|-9| = 9 is the largest absolute value among the options.", 4, "\\text{Largest } |x|"),
    poolAnswer("y7-int-nl-p22", "An integer is 6 units from zero and to the right. Another is 10 units from zero and to the left. Write the sum of these two integers.",
      "6 + (-10)", "-4", "The integers are 6 and -10; 6 + (-10) = -4.", 4, ["−4"]),
    poolAnswer("y7-int-nl-p23", "On a number line, point A is at -8 and point B is at 5. What is the distance between A and B?",
      "\\text{Distance from } -8 \\text{ to } 5", "13", "Distance = |5 - (-8)| = |13| = 13 units.", 4),
    // ── Difficulty 5 ──
    poolAnswer("y7-int-nl-p24", "Find the value of x if |x| = 7 and x is 3 units to the left of zero plus 4 more units left. Write x.",
      "x = -(3 + 4)", "-7", "Moving 3 then 4 more units left of zero reaches -7, and |-7| = 7.", 5, ["−7"]),
    poolAnswer("y7-int-nl-p25", "The midpoint of -10 and 4 on the number line is which integer?", "\\text{Midpoint of } -10 \\text{ and } 4",
      "-3", "Midpoint = (-10 + 4) ÷ 2 = -6 ÷ 2 = -3.", 5, ["−3"]),
    poolAnswer("y7-int-nl-p26", "How many integers x satisfy 3 ≤ |x| ≤ 5?", "3 \\le |x| \\le 5", "6",
      "Values with |x| of 3, 4, or 5: ±3, ±4, ±5 — that is 6 integers.", 5),
    poolAnswer("y7-int-nl-p27", "Point P is at -2. Point Q is the same distance from zero as P but on the other side. What is |P| + |Q|?",
      "|P| + |Q|", "4", "P = -2 and Q = 2, so |P| + |Q| = 2 + 2 = 4.", 5),
    poolChoice("y7-int-nl-p28", "Which list is in correct order from largest to smallest?", "B",
      ["-1, -5, 0, 3", "6, 0, -2, -9", "-9, -2, 0, 6", "0, 6, -2, -9"],
      "Largest to smallest: 6, 0, -2, -9. Option B is correct.", 5, "\\text{Largest to smallest}"),
    poolAnswer("y7-int-nl-p29", "A submarine at -120 m and a drone at 40 m. What is the total vertical distance between them?",
      "40 - (-120)", "160", "Distance = 40 - (-120) = 40 + 120 = 160 m.", 5),
    poolAnswer("y7-int-nl-p30", "If |a| = 5 and |b| = 8 with a < 0 < b, find b - a.", "b - a", "13",
      "a = -5 and b = 8, so b - a = 8 - (-5) = 13.", 5),
  ],
  multiPartPractice: [
    {
      id: "y7-int-nl-mp1",
      prompt: "A weather station logs temperatures at four sites: Alpine -9°C, Coastal 4°C, Plateau -2°C, and Desert -6°C. Use a number line to answer each part.",
      latex: "-9,\\; 4,\\; -2,\\; -6",
      answer: "13",
      hint: "Place all four temperatures on a number line, then read off positions and distances.",
      explanation: "(a) The coldest is the most negative, -9. (b) Ordered smallest to largest: -9, -6, -2, 4. (c) |-9| = 9. (d) Distance from -9 to 4 is 4 - (-9) = 13.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Which temperature is the coldest? Write the integer.",
          latex: "-9,\\; 4,\\; -2,\\; -6",
          marks: 1,
          answer: "-9",
          acceptedAnswers: ["−9"],
          hint: "The coldest is the most negative.",
          explanation: "-9 is furthest left on the number line, so it is the coldest.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Order the four temperatures from smallest to largest and write the second-smallest.",
          latex: "\\text{Order: } ?",
          marks: 1,
          answer: "-6",
          acceptedAnswers: ["−6"],
          hint: "Read left to right on the number line.",
          explanation: "Ordered: -9, -6, -2, 4. The second-smallest is -6.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the absolute value of the Alpine temperature.",
          latex: "|-9|",
          marks: 1,
          answer: "9",
          hint: "Absolute value is distance from zero.",
          explanation: "|-9| = 9 because -9 is 9 units from zero.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "How many degrees apart are the Alpine and Coastal temperatures?",
          latex: "4 - (-9)",
          marks: 1,
          answer: "13",
          hint: "Distance = higher value minus lower value.",
          explanation: "4 - (-9) = 4 + 9 = 13 degrees apart.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Adding and Subtracting Integers
// ─────────────────────────────────────────────────────────────────────────────

const addingSubtractingIntegers: LessonContent = {
  description: "Add and subtract positive and negative integers using sign rules and number line reasoning.",
  learningIntention: "Apply integer sign rules to add and subtract positive and negative integers, including subtracting a negative.",
  successCriteria: [
    "Add a negative integer to a positive integer using the sign rule.",
    "Add two negative integers by combining their values.",
    "Subtract a positive integer from a negative integer.",
    "Recognise that subtracting a negative number is equivalent to adding a positive.",
  ],
  teaching: {
    paragraphs: [
      "Adding a positive integer moves you to the right on the number line. Adding a negative integer moves you to the left. For example, 5 + (-3) means start at 5 and move 3 steps left, landing at 2.",
      "When you add two negative integers, you move further left each time. For example, -4 + (-2) = -6. Think of it as combining two debts: owing $4 and owing another $2 means you owe $6 in total.",
      "Subtracting a negative number means removing a negative, which is the same as adding a positive. The rule is: a − (−b) = a + b. For example, 3 − (−5) = 3 + 5 = 8. The two minus signs cancel each other.",
      "A common mistake is treating 3 − (−5) as 3 − 5. Remember: subtracting a negative flips the sign to positive. If someone removes a $5 debt from your account, your balance increases by $5.",
    ],
    latexBlocks: [
      "a + (-b) = a - b",
      "(-a) + (-b) = -(a + b)",
      "a - (-b) = a + b",
    ],
  },
  workedExamples: [
    {
      title: "Add a positive and a negative integer",
      questionLatex: "\\text{Calculate } 7 + (-10).",
      steps: [
        {
          explanation: "Adding -10 means moving 10 steps to the left from 7.",
          latex: "7 + (-10) = 7 - 10",
        },
        {
          explanation: "7 - 10: start at 7 and subtract 10, which takes us below zero.",
          latex: "7 - 10 = -3",
        },
      ],
      finalAnswerLatex: "7 + (-10) = -3",
    },
    {
      title: "Add two negative integers",
      questionLatex: "\\text{Calculate } (-6) + (-4).",
      steps: [
        {
          explanation: "Both integers are negative, so we add their absolute values and keep the negative sign.",
          latex: "6 + 4 = 10",
        },
        {
          explanation: "Since both are negative, the result is negative.",
          latex: "(-6) + (-4) = -10",
        },
      ],
      finalAnswerLatex: "(-6) + (-4) = -10",
    },
    {
      title: "Subtract a negative integer",
      questionLatex: "\\text{Calculate } -2 - (-9).",
      steps: [
        {
          explanation: "Subtracting a negative is the same as adding a positive: the double negative becomes a plus.",
          latex: "-2 - (-9) = -2 + 9",
        },
        {
          explanation: "Start at -2 and add 9, moving 9 steps to the right.",
          latex: "-2 + 9 = 7",
        },
      ],
      finalAnswerLatex: "-2 - (-9) = 7",
    },
  ],
  guidedPractice: [
    choice(
      "y7-int-as-g1",
      "What does 4 + (-7) equal?",
      "B",
      ["11", "-3", "3", "-11"],
      "4 + (-7) = 4 - 7 = -3. Adding -7 moves 7 steps left from 4.",
      "4 + (-7)"
    ),
    answer(
      "y7-int-as-g2",
      "Calculate (-5) + (-8). Write just the answer.",
      "(-5) + (-8)",
      "-13",
      "Both are negative: 5 + 8 = 13, so (-5) + (-8) = -13.",
      ["−13"],
      "Adding two negatives: add the absolute values and keep the negative sign."
    ),
    answer(
      "y7-int-as-g3",
      "Calculate 6 - (-4). Write just the answer.",
      "6 - (-4)",
      "10",
      "Subtracting a negative is the same as adding a positive: 6 - (-4) = 6 + 4 = 10.",
      [],
      "Apply the sign rule: subtracting a negative is the same as adding a positive."
    ),
    answer(
      "y7-int-as-g4",
      "Calculate (-3) - (-7). Write just the answer.",
      "(-3) - (-7)",
      "4",
      "-3 - (-7) = -3 + 7 = 4. The double negative becomes addition.",
      [],
      "Subtracting a negative: change the subtraction to addition, then compute."
    ),
  ],
  independentPractice: [
    answer(
      "y7-int-as-i1",
      "Calculate 9 + (-14).",
      "9 + (-14)",
      "-5",
      "9 + (-14) = 9 - 14 = -5. Adding -14 moves 14 steps left from 9.",
      ["−5"],
      "Adding a negative means subtracting its absolute value."
    ),
    answer(
      "y7-int-as-i2",
      "Calculate (-8) + (-6).",
      "(-8) + (-6)",
      "-14",
      "Both negative: 8 + 6 = 14, so (-8) + (-6) = -14.",
      ["−14"],
      "Two negatives added: add the values and keep the minus sign."
    ),
    answer(
      "y7-int-as-i3",
      "Calculate -11 - (-5).",
      "-11 - (-5)",
      "-6",
      "-11 - (-5) = -11 + 5 = -6. Move 5 steps right from -11.",
      ["−6"],
      "Subtracting a negative: rewrite as addition and compute."
    ),
    answer(
      "y7-int-as-i4",
      "At 6 am the temperature was -8°C. By noon it had risen 13°C. What was the noon temperature? Write just the number.",
      "-8 + 13",
      "5",
      "-8 + 13 = 5. The temperature rose from -8°C to 5°C.",
      [],
      "Rising temperature means adding to the current value."
    ),
    answer(
      "y7-int-as-i5",
      "A bank account has a balance of -$20 (overdrawn by $20). A fee of $15 is then removed from the balance (subtracted). What is the new balance? Write just the number.",
      "-20 - 15",
      "-35",
      "-20 - 15 = -35. Taking another $15 away from an account already $20 in debt gives -$35.",
      ["−35"],
      "Removing money from a negative balance makes the balance more negative."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing 3 - (-5) = 3 - 5 = -2 instead of 3 + 5 = 8.",
      fix: "Two minus signs next to each other combine to make a plus. Always rewrite a - (-b) as a + b before computing.",
    },
    {
      mistake: "Writing (-4) + (-6) = 2 by subtracting the smaller from the larger.",
      fix: "When adding two negative numbers, add their absolute values and keep the negative sign: (-4) + (-6) = -10.",
    },
    {
      mistake: "Getting the sign wrong in 5 + (-8): writing +3 instead of -3.",
      fix: "5 + (-8) means moving left past zero. Since 8 > 5 and the larger number is negative, the result is -(8 - 5) = -3.",
    },
    {
      mistake: "Confusing subtraction of a negative with addition of a negative.",
      fix: "a - (-b) = a + b (two minuses make a plus). But a + (-b) = a - b (adding a negative is subtraction). These are different operations.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-int-as-m1",
      "Calculate (-9) + 4.",
      "(-9) + 4",
      "-5",
      "(-9) + 4 = 4 - 9 = -5. Adding 4 to -9 moves 4 steps right from -9.",
      ["−5"],
      "Adding a positive to a negative: move right on the number line."
    ),
    choice(
      "y7-int-as-m2",
      "Which calculation gives a result of -12?",
      "C",
      ["(-5) + (-5)", "3 - (-9)", "(-7) + (-5)", "8 + (-4)"],
      "(-7) + (-5) = -12. Option A gives -10, option B gives 12, option D gives 4.",
      "\\text{Which equals } -12?"
    ),
    answer(
      "y7-int-as-m3",
      "Calculate 0 - (-13).",
      "0 - (-13)",
      "13",
      "0 - (-13) = 0 + 13 = 13. Subtracting -13 is the same as adding 13.",
      [],
      "Subtracting a negative from zero gives a positive result."
    ),
    answer(
      "y7-int-as-m4",
      "Calculate (-15) + 8 + (-3).",
      "(-15) + 8 + (-3)",
      "-10",
      "(-15) + 8 = -7, then -7 + (-3) = -10. Work left to right.",
      ["−10"],
      "Work through one operation at a time from left to right."
    ),
    answer(
      "y7-int-as-m5",
      "Calculate -6 - (-6).",
      "-6 - (-6)",
      "0",
      "-6 - (-6) = -6 + 6 = 0. A number subtracted from itself (via double negative) gives zero.",
      [],
      "Rewrite the double negative as addition, then compute."
    ),
    answer(
      "y7-int-as-m6",
      "A submarine descends from -30 m to -75 m. By how much did it descend? Write the answer as a positive number.",
      "-75 - (-30)",
      "45",
      "-75 - (-30) = -75 + 30 = -45. The depth increased by 45 m (the magnitude of the change).",
      [],
      "Find the change in depth, then take the absolute value."
    ),
    choice(
      "y7-int-as-m7",
      "Which expression equals 3 - (-5)?",
      "D",
      ["3 - 5", "-(3 + 5)", "3 + (-5)", "3 + 5"],
      "Subtracting a negative is the same as adding a positive: 3 - (-5) = 3 + 5 = 8.",
      "3 - (-5) = \\;?"
    ),
    answer(
      "y7-int-as-m8",
      "The daytime temperature was 4°C and overnight it fell 11°C. What was the overnight temperature? Write just the number.",
      "4 - 11",
      "-7",
      "4 - 11 = -7. The temperature fell below zero to -7°C.",
      ["−7"],
      "A temperature fall means subtracting the drop from the starting temperature."
    ),
    answer(
      "y7-int-as-m9",
      "Calculate (-20) - (-8) + (-3).",
      "(-20) - (-8) + (-3)",
      "-15",
      "(-20) - (-8) = -20 + 8 = -12, then -12 + (-3) = -15. Work left to right.",
      ["−15"],
      "Work left to right: convert double negatives to addition first."
    ),
    answer(
      "y7-int-as-m10",
      "In a card game, Sam has a score of -7 and gains 10 points, then loses 6 points. What is Sam's final score?",
      "-7 + 10 - 6",
      "-3",
      "-7 + 10 = 3, then 3 - 6 = -3. Sam's final score is -3.",
      ["−3"],
      "Apply each change to the running total in order."
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    poolAnswer("y7-int-as-p1", "Calculate 5 + (-2).", "5 + (-2)", "3", "5 + (-2) = 5 - 2 = 3.", 1),
    poolAnswer("y7-int-as-p2", "Calculate (-3) + (-4).", "(-3) + (-4)", "-7", "Both negative: 3 + 4 = 7, so the answer is -7.", 1, ["−7"]),
    poolChoice("y7-int-as-p3", "What is 2 + (-6)?", "B", ["8", "-4", "4", "-8"],
      "2 + (-6) = 2 - 6 = -4.", 1, "2 + (-6)"),
    poolAnswer("y7-int-as-p4", "Calculate 7 - (-2).", "7 - (-2)", "9", "Subtracting a negative: 7 + 2 = 9.", 1),
    poolAnswer("y7-int-as-p5", "Calculate (-5) + 5.", "(-5) + 5", "0", "(-5) + 5 = 0; opposites sum to zero.", 1),
    // ── Difficulty 2 ──
    poolAnswer("y7-int-as-p6", "Calculate 8 + (-13).", "8 + (-13)", "-5", "8 + (-13) = 8 - 13 = -5.", 2, ["−5"]),
    poolAnswer("y7-int-as-p7", "Calculate (-9) + (-7).", "(-9) + (-7)", "-16", "Both negative: 9 + 7 = 16, so -16.", 2, ["−16"]),
    poolAnswer("y7-int-as-p8", "Calculate -4 - (-11).", "-4 - (-11)", "7", "-4 - (-11) = -4 + 11 = 7.", 2),
    poolChoice("y7-int-as-p9", "Which equals -8?", "C", ["(-3) + (-3)", "5 - (-3)", "(-5) + (-3)", "2 + (-6)"],
      "(-5) + (-3) = -8. The others give -6, 8, and -4.", 2, "\\text{Which equals } -8?"),
    poolAnswer("y7-int-as-p10", "A temperature of 3°C falls 9°C. What is the new temperature?", "3 - 9", "-6",
      "3 - 9 = -6°C.", 2, ["−6"]),
    poolAnswer("y7-int-as-p11", "Calculate (-12) + 12.", "(-12) + 12", "0", "(-12) + 12 = 0.", 2),
    // ── Difficulty 3 ──
    poolAnswer("y7-int-as-p12", "Calculate (-7) + 3 + (-2).", "(-7) + 3 + (-2)", "-6",
      "(-7) + 3 = -4, then -4 + (-2) = -6.", 3, ["−6"]),
    poolAnswer("y7-int-as-p13", "Calculate -10 - (-4).", "-10 - (-4)", "-6", "-10 - (-4) = -10 + 4 = -6.", 3, ["−6"]),
    poolChoice("y7-int-as-p14", "Which expression equals 5 - (-9)?", "D", ["5 - 9", "-(5 + 9)", "5 + (-9)", "5 + 9"],
      "Subtracting a negative is adding a positive: 5 - (-9) = 5 + 9.", 3, "5 - (-9)"),
    poolAnswer("y7-int-as-p15", "Calculate 6 + (-10) + 1.", "6 + (-10) + 1", "-3", "6 + (-10) = -4, then -4 + 1 = -3.", 3, ["−3"]),
    poolAnswer("y7-int-as-p16", "A diver at -8 m rises 3 m then descends 6 m. What is the new depth?", "-8 + 3 - 6", "-11",
      "-8 + 3 = -5, then -5 - 6 = -11 m.", 3, ["−11"]),
    poolAnswer("y7-int-as-p17", "Calculate 0 - 7 + (-3).", "0 - 7 + (-3)", "-10", "0 - 7 = -7, then -7 + (-3) = -10.", 3, ["−10"]),
    // ── Difficulty 4 ──
    poolAnswer("y7-int-as-p18", "Calculate (-15) - (-8) + (-6).", "(-15) - (-8) + (-6)", "-13",
      "(-15) - (-8) = -7, then -7 + (-6) = -13.", 4, ["−13"]),
    poolAnswer("y7-int-as-p19", "Calculate 14 + (-9) - (-3).", "14 + (-9) - (-3)", "8",
      "14 + (-9) = 5, then 5 - (-3) = 5 + 3 = 8.", 4),
    poolAnswer("y7-int-as-p20", "A submarine descends from -20 m to -65 m. By how much did it descend? Write as a positive number.",
      "|{-65} - (-20)|", "45", "-65 - (-20) = -45; the magnitude of descent is 45 m.", 4),
    poolChoice("y7-int-as-p21", "A bank balance of -$30 has a $50 deposit then a $25 withdrawal. What is the final balance?", "A",
      ["-$5", "$5", "-$45", "$45"], "-30 + 50 - 25 = -5.", 4, "\\text{Final balance}"),
    poolAnswer("y7-int-as-p22", "Calculate (-6) + (-6) + (-6).", "(-6) + (-6) + (-6)", "-18",
      "Three lots of -6: -6 - 6 - 6 = -18.", 4, ["−18"]),
    poolAnswer("y7-int-as-p23", "Tom starts at score -12, gains 20, then loses 15. What is his score?", "-12 + 20 - 15", "-7",
      "-12 + 20 = 8, then 8 - 15 = -7.", 4, ["−7"]),
    // ── Difficulty 5 ──
    poolAnswer("y7-int-as-p24", "Calculate (-3) - (-7) - (-2) + (-9).", "(-3) - (-7) - (-2) + (-9)", "-3",
      "-3 + 7 = 4, then 4 + 2 = 6, then 6 - 9 = -3.", 5, ["−3"]),
    poolAnswer("y7-int-as-p25", "The temperature was -4°C, rose 6°C, fell 11°C, then rose 2°C. What is the final temperature?",
      "-4 + 6 - 11 + 2", "-7", "-4 + 6 = 2, 2 - 11 = -9, -9 + 2 = -7.", 5, ["−7"]),
    poolAnswer("y7-int-as-p26", "A lift starts at floor 3, goes down 8, up 2, down 5. What floor does it end on?", "3 - 8 + 2 - 5", "-8",
      "3 - 8 = -5, -5 + 2 = -3, -3 - 5 = -8.", 5, ["−8"]),
    poolAnswer("y7-int-as-p27", "Find the missing number: -5 + ___ = -2.", "-5 + x = -2", "3",
      "x = -2 - (-5) = -2 + 5 = 3.", 5),
    poolAnswer("y7-int-as-p28", "Find the missing number: 4 - ___ = 10.", "4 - x = 10", "-6",
      "4 - x = 10 means x = 4 - 10 = -6.", 5, ["−6"]),
    poolChoice("y7-int-as-p29", "Which calculation gives the greatest result?", "C",
      ["(-5) + (-3)", "2 - (-1)", "(-4) - (-9)", "(-7) + 2"],
      "(-4) - (-9) = 5, the greatest. Others give -8, 3, -5.", 5, "\\text{Greatest result?}"),
    poolAnswer("y7-int-as-p30", "Across 4 days the daily change in a glacier's position was -3 m, -5 m, +2 m, -4 m. What was the total change?",
      "-3 - 5 + 2 - 4", "-10", "-3 - 5 = -8, -8 + 2 = -6, -6 - 4 = -10.", 5, ["−10"]),
  ],
  multiPartPractice: [
    {
      id: "y7-int-as-mp1",
      prompt: "Mia's bank account starts the week at -$25 (overdrawn). On Monday she deposits $60. On Wednesday a $15 fee is charged. On Friday she withdraws $30. Work through the week in order.",
      latex: "-25,\\; +60,\\; -15,\\; -30",
      answer: "-10",
      hint: "Apply each change to the running balance, one transaction at a time.",
      explanation: "(a) -25 + 60 = 35. (b) 35 - 15 = 20. (c) 20 - 30 = -10. The account ends overdrawn by $10.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "After Monday's deposit, what is the balance?",
          latex: "-25 + 60",
          marks: 1,
          answer: "35",
          hint: "A deposit adds to the balance.",
          explanation: "-25 + 60 = 35.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "After Wednesday's fee, what is the balance?",
          latex: "35 - 15",
          marks: 1,
          answer: "20",
          hint: "A fee is subtracted.",
          explanation: "35 - 15 = 20.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "After Friday's withdrawal, what is the final balance?",
          latex: "20 - 30",
          marks: 1,
          answer: "-10",
          acceptedAnswers: ["−10"],
          hint: "Withdrawing more than the balance gives a negative result.",
          explanation: "20 - 30 = -10, so the account is overdrawn by $10.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Multiplying and Dividing Integers
// ─────────────────────────────────────────────────────────────────────────────

const multiplyingDividingIntegers: LessonContent = {
  description: "Multiply and divide positive and negative integers using the sign rules for products and quotients.",
  learningIntention: "Apply the sign rules for multiplication and division of integers to calculate products and quotients.",
  successCriteria: [
    "State and apply the rule that the product of two integers with the same sign is positive.",
    "State and apply the rule that the product of two integers with different signs is negative.",
    "Divide integers by applying the same sign rules as multiplication.",
    "Evaluate expressions involving multiple multiplication or division operations.",
  ],
  teaching: {
    paragraphs: [
      "When you multiply or divide two integers, the sign of the result depends on the signs of the two numbers. There are only two rules to remember: same signs give a positive result, and different signs give a negative result.",
      "Think of it as agreeing or disagreeing. Two people who agree (both positive, or both negative) produce a positive outcome. Two people who disagree (one positive, one negative) produce a negative outcome. So 3 × 4 = 12, (-3) × (-4) = 12, but 3 × (-4) = -12 and (-3) × 4 = -12.",
      "The sign rules for division are identical. Positive ÷ positive = positive, negative ÷ negative = positive, and positive ÷ negative (or negative ÷ positive) = negative. For example, -20 ÷ (-4) = 5, but -20 ÷ 4 = -5.",
      "A common error is forgetting that two negatives multiplied give a positive. This is because multiplying by -1 flips the sign, and doing it twice returns to positive. Always count the number of negative factors: an even count gives positive, an odd count gives negative.",
    ],
    latexBlocks: [
      "(+) \\times (+) = +, \\quad (-) \\times (-) = +",
      "(+) \\times (-) = -, \\quad (-) \\times (+) = -",
      "(-a) \\times (-b) = ab, \\quad (-a) \\times b = -ab",
    ],
  },
  workedExamples: [
    {
      title: "Multiply integers with the same sign",
      questionLatex: "\\text{Calculate } (-7) \\times (-5).",
      steps: [
        {
          explanation: "Both integers are negative — same signs give a positive result.",
          latex: "(-7) \\times (-5) \\to \\text{positive}",
        },
        {
          explanation: "Multiply the absolute values: 7 × 5 = 35.",
          latex: "(-7) \\times (-5) = +35",
        },
      ],
      finalAnswerLatex: "(-7) \\times (-5) = 35",
    },
    {
      title: "Multiply integers with different signs",
      questionLatex: "\\text{Calculate } 8 \\times (-6).",
      steps: [
        {
          explanation: "One integer is positive and one is negative — different signs give a negative result.",
          latex: "8 \\times (-6) \\to \\text{negative}",
        },
        {
          explanation: "Multiply the absolute values: 8 × 6 = 48, then apply the negative sign.",
          latex: "8 \\times (-6) = -48",
        },
      ],
      finalAnswerLatex: "8 \\times (-6) = -48",
    },
    {
      title: "Divide integers using sign rules",
      questionLatex: "\\text{Calculate } (-36) \\div 9.",
      steps: [
        {
          explanation: "Negative divided by positive — different signs give a negative result.",
          latex: "(-36) \\div 9 \\to \\text{negative}",
        },
        {
          explanation: "Divide the absolute values: 36 ÷ 9 = 4, then apply the negative sign.",
          latex: "(-36) \\div 9 = -4",
        },
      ],
      finalAnswerLatex: "(-36) \\div 9 = -4",
    },
  ],
  guidedPractice: [
    choice(
      "y7-int-md-g1",
      "What is the sign of (-3) × (-8)?",
      "A",
      ["Positive", "Negative", "Zero", "Cannot tell"],
      "Both signs are negative — same signs give a positive result. (-3) × (-8) = 24.",
      "(-3) \\times (-8)"
    ),
    answer(
      "y7-int-md-g2",
      "Calculate (-4) × 9.",
      "(-4) \\times 9",
      "-36",
      "Different signs: positive × negative = negative. 4 × 9 = 36, so (-4) × 9 = -36.",
      ["−36"],
      "Same signs give positive; different signs give negative result."
    ),
    answer(
      "y7-int-md-g3",
      "Calculate (-5) × (-6).",
      "(-5) \\times (-6)",
      "30",
      "Same signs (both negative): the product is positive. 5 × 6 = 30, so (-5) × (-6) = 30.",
      [],
      "Two negatives multiplied always give a positive result."
    ),
    answer(
      "y7-int-md-g4",
      "Calculate (-42) ÷ (-7).",
      "(-42) \\div (-7)",
      "6",
      "Same signs (both negative): the quotient is positive. 42 ÷ 7 = 6, so (-42) ÷ (-7) = 6.",
      [],
      "Same signs give a positive result — this applies to division too."
    ),
  ],
  independentPractice: [
    answer(
      "y7-int-md-i1",
      "Calculate 7 × (-8).",
      "7 \\times (-8)",
      "-56",
      "Different signs: positive × negative = negative. 7 × 8 = 56, so 7 × (-8) = -56.",
      ["−56"],
      "Different signs always give a negative product."
    ),
    answer(
      "y7-int-md-i2",
      "Calculate (-9) × (-4).",
      "(-9) \\times (-4)",
      "36",
      "Same signs (both negative): 9 × 4 = 36, so (-9) × (-4) = 36.",
      [],
      "Two negatives multiplied give a positive."
    ),
    answer(
      "y7-int-md-i3",
      "Calculate 56 ÷ (-8).",
      "56 \\div (-8)",
      "-7",
      "Different signs: positive ÷ negative = negative. 56 ÷ 8 = 7, so 56 ÷ (-8) = -7.",
      ["−7"],
      "Different signs give a negative quotient."
    ),
    answer(
      "y7-int-md-i4",
      "A diver descends at a rate of -3 m per minute. How many metres has the diver descended after 12 minutes? Write the depth as a negative integer.",
      "(-3) \\times 12",
      "-36",
      "(-3) × 12 = -36. Different signs give a negative result. The diver is 36 m below the surface.",
      ["−36"],
      "Multiply the rate by the time — track the sign carefully."
    ),
    choice(
      "y7-int-md-i5",
      "A stock falls in value by $6 each day for 5 days. Which expression gives the total change in value?",
      "B",
      ["6 × 5 = 30", "(-6) × 5 = -30", "6 ÷ 5 = 1.2", "(-6) ÷ 5 = -1.2"],
      "A fall of $6 per day is represented by -6. Over 5 days: (-6) × 5 = -30. The total change is -$30.",
      "\\text{Total change over 5 days}"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing (-5) × (-4) = -20 instead of +20.",
      fix: "Negative × negative = positive. Two negatives multiplied always give a positive result.",
    },
    {
      mistake: "Writing (-3) × 7 = 21 (forgetting the sign).",
      fix: "Different signs give a negative result. (-3) × 7 = -21.",
    },
    {
      mistake: "Thinking 0 × (-6) = -6.",
      fix: "Anything multiplied by zero is zero. 0 × (-6) = 0.",
    },
    {
      mistake: "Applying the wrong sign rule to division, e.g. writing (-30) ÷ (-5) = -6.",
      fix: "The same sign rules apply to division: negative ÷ negative = positive. (-30) ÷ (-5) = 6.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-int-md-m1",
      "Calculate (-6) × 7.",
      "(-6) \\times 7",
      "-42",
      "Different signs: 6 × 7 = 42, so (-6) × 7 = -42.",
      ["−42"],
      "Different signs give a negative product."
    ),
    answer(
      "y7-int-md-m2",
      "Calculate (-8) × (-9).",
      "(-8) \\times (-9)",
      "72",
      "Same signs (both negative): 8 × 9 = 72, so (-8) × (-9) = 72.",
      [],
      "Same signs give a positive product."
    ),
    choice(
      "y7-int-md-m3",
      "Which expression has a positive value?",
      "B",
      ["(-4) × 7", "(-5) × (-3)", "8 × (-2)", "(-6) × 1"],
      "(-5) × (-3) = 15. Same signs give positive. The other three all have different signs and give negative results.",
      "\\text{Which is positive?}"
    ),
    answer(
      "y7-int-md-m4",
      "Calculate (-63) ÷ 9.",
      "(-63) \\div 9",
      "-7",
      "Different signs: 63 ÷ 9 = 7, so (-63) ÷ 9 = -7.",
      ["−7"],
      "Different signs give a negative quotient."
    ),
    answer(
      "y7-int-md-m5",
      "Calculate (-4) × (-3) × (-2).",
      "(-4) \\times (-3) \\times (-2)",
      "-24",
      "(-4) × (-3) = 12 (same signs, positive). Then 12 × (-2) = -24 (different signs, negative). Three negative factors give a negative product.",
      ["−24"],
      "Multiply left to right, applying the sign rule at each step."
    ),
    answer(
      "y7-int-md-m6",
      "Calculate (-72) ÷ (-8).",
      "(-72) \\div (-8)",
      "9",
      "Same signs (both negative): 72 ÷ 8 = 9, so (-72) ÷ (-8) = 9.",
      [],
      "Same signs give a positive quotient."
    ),
    choice(
      "y7-int-md-m7",
      "A student calculates (-3) × (-4) × 2 and gets -24. What error did they make?",
      "A",
      [
        "They treated (-3) × (-4) as negative instead of positive.",
        "They added instead of multiplied.",
        "They forgot to multiply by 2.",
        "They used the wrong absolute values.",
      ],
      "(-3) × (-4) = 12 (positive, same signs), then 12 × 2 = 24. The student incorrectly made the first product negative, giving -12 × 2 = -24.",
      "(-3) \\times (-4) \\times 2"
    ),
    answer(
      "y7-int-md-m8",
      "A submarine descends 5 m per minute. After 8 minutes, what is its depth relative to sea level? Write as a negative integer.",
      "(-5) \\times 8",
      "-40",
      "(-5) × 8 = -40. The submarine is 40 m below sea level.",
      ["−40"],
      "Multiply the rate of descent (negative) by the time."
    ),
    answer(
      "y7-int-md-m9",
      "Calculate (-3)^2. (Remember: (-3)^2 means (-3) × (-3).)",
      "(-3)^2 = (-3) \\times (-3)",
      "9",
      "(-3) × (-3) = 9. Same signs (both negative) give a positive product.",
      [],
      "Squaring a negative: multiply the negative by itself — same signs give positive."
    ),
    answer(
      "y7-int-md-m10",
      "A penalty of 8 points is applied each round. After 6 rounds of penalties, what is the total point change? Write as a negative integer.",
      "(-8) \\times 6",
      "-48",
      "(-8) × 6 = -48. Different signs: the total penalty is -48 points.",
      ["−48"],
      "Multiply the penalty per round (negative) by the number of rounds."
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    poolAnswer("y7-int-md-p1", "Calculate (-2) × 3.", "(-2) \\times 3", "-6", "Different signs: 2 × 3 = 6, so -6.", 1, ["−6"]),
    poolAnswer("y7-int-md-p2", "Calculate (-4) × (-2).", "(-4) \\times (-2)", "8", "Same signs: 4 × 2 = 8, positive.", 1),
    poolChoice("y7-int-md-p3", "What is the sign of (-5) × 6?", "B", ["Positive", "Negative", "Zero", "Cannot tell"],
      "Different signs give a negative product.", 1, "(-5) \\times 6"),
    poolAnswer("y7-int-md-p4", "Calculate (-10) ÷ 2.", "(-10) \\div 2", "-5", "Different signs: 10 ÷ 2 = 5, so -5.", 1, ["−5"]),
    poolAnswer("y7-int-md-p5", "Calculate (-12) ÷ (-4).", "(-12) \\div (-4)", "3", "Same signs: 12 ÷ 4 = 3, positive.", 1),
    // ── Difficulty 2 ──
    poolAnswer("y7-int-md-p6", "Calculate 6 × (-7).", "6 \\times (-7)", "-42", "Different signs: 6 × 7 = 42, so -42.", 2, ["−42"]),
    poolAnswer("y7-int-md-p7", "Calculate (-8) × (-5).", "(-8) \\times (-5)", "40", "Same signs: 8 × 5 = 40, positive.", 2),
    poolAnswer("y7-int-md-p8", "Calculate 48 ÷ (-6).", "48 \\div (-6)", "-8", "Different signs: 48 ÷ 6 = 8, so -8.", 2, ["−8"]),
    poolChoice("y7-int-md-p9", "Which product is positive?", "C", ["(-3) × 4", "5 × (-2)", "(-6) × (-1)", "7 × (-3)"],
      "(-6) × (-1) = 6, positive (same signs). The others are negative.", 2, "\\text{Positive product?}"),
    poolAnswer("y7-int-md-p10", "Calculate (-56) ÷ (-7).", "(-56) \\div (-7)", "8", "Same signs: 56 ÷ 7 = 8, positive.", 2),
    poolAnswer("y7-int-md-p11", "A debt grows by -$9 each week for 4 weeks. Write the total change.", "(-9) \\times 4", "-36",
      "(-9) × 4 = -36.", 2, ["−36"]),
    // ── Difficulty 3 ──
    poolAnswer("y7-int-md-p12", "Calculate (-3) × (-3) × (-1).", "(-3) \\times (-3) \\times (-1)", "-9",
      "(-3) × (-3) = 9, then 9 × (-1) = -9. Three negatives give a negative.", 3, ["−9"]),
    poolAnswer("y7-int-md-p13", "Calculate (-2)^2.", "(-2)^2", "4", "(-2) × (-2) = 4; same signs give positive.", 3),
    poolChoice("y7-int-md-p14", "What is the sign of (-2) × (-3) × (-4)?", "B", ["Positive", "Negative", "Zero", "Cannot tell"],
      "Three negative factors (odd count) give a negative product.", 3, "(-2) \\times (-3) \\times (-4)"),
    poolAnswer("y7-int-md-p15", "Calculate (-100) ÷ 25.", "(-100) \\div 25", "-4", "Different signs: 100 ÷ 25 = 4, so -4.", 3, ["−4"]),
    poolAnswer("y7-int-md-p16", "Calculate 0 × (-15).", "0 \\times (-15)", "0", "Anything times zero is zero.", 3),
    poolAnswer("y7-int-md-p17", "A submarine descends 6 m per minute for 9 minutes. Write its depth as a negative integer.",
      "(-6) \\times 9", "-54", "(-6) × 9 = -54 m.", 3, ["−54"]),
    // ── Difficulty 4 ──
    poolAnswer("y7-int-md-p18", "Calculate (-2) × 3 × (-4).", "(-2) \\times 3 \\times (-4)", "24",
      "(-2) × 3 = -6, then -6 × (-4) = 24. Two negatives give positive.", 4),
    poolAnswer("y7-int-md-p19", "Calculate (-3)^3.", "(-3)^3", "-27",
      "(-3) × (-3) × (-3) = 9 × (-3) = -27.", 4, ["−27"]),
    poolAnswer("y7-int-md-p20", "Calculate (-72) ÷ 9 × (-2).", "(-72) \\div 9 \\times (-2)", "16",
      "(-72) ÷ 9 = -8, then -8 × (-2) = 16. Work left to right.", 4),
    poolChoice("y7-int-md-p21", "Which expression has a negative value?", "D",
      ["(-2) × (-8)", "(-4)^2", "(-3) × (-3)", "(-5) × 2 × (-1) × (-1)"],
      "(-5) × 2 × (-1) × (-1) has three negative factors → negative (= -10). The others are positive.", 4, "\\text{Negative value?}"),
    poolAnswer("y7-int-md-p22", "Calculate (-144) ÷ (-12) ÷ (-2).", "(-144) \\div (-12) \\div (-2)", "-6",
      "(-144) ÷ (-12) = 12, then 12 ÷ (-2) = -6.", 4, ["−6"]),
    poolAnswer("y7-int-md-p23", "A stock falls $4 per day for 7 days, then the total loss is shared between 2 owners. Write each owner's share as a negative integer.",
      "((-4) \\times 7) \\div 2", "-14", "(-4) × 7 = -28, then -28 ÷ 2 = -14.", 4, ["−14"]),
    // ── Difficulty 5 ──
    poolAnswer("y7-int-md-p24", "Calculate (-1) × (-2) × (-3) × (-4).", "(-1) \\times (-2) \\times (-3) \\times (-4)", "24",
      "Four negative factors (even count) give a positive product: 1 × 2 × 3 × 4 = 24.", 5),
    poolAnswer("y7-int-md-p25", "Calculate (-2)^4.", "(-2)^4", "16",
      "(-2) raised to an even power is positive: $2^4$ = 16.", 5),
    poolAnswer("y7-int-md-p26", "Find the missing number: (-6) × ___ = 42.", "(-6) \\times x = 42", "-7",
      "x = 42 ÷ (-6) = -7.", 5, ["−7"]),
    poolAnswer("y7-int-md-p27", "Find the missing number: ___ ÷ (-3) = 8.", "x \\div (-3) = 8", "-24",
      "x = 8 × (-3) = -24.", 5, ["−24"]),
    poolChoice("y7-int-md-p28", "Which expression equals -1?", "A",
      ["(-8) ÷ 8", "(-8) ÷ (-8)", "8 ÷ 8", "(-4) × (-2)"],
      "(-8) ÷ 8 = -1 (different signs). The others give 1, 1, and 8.", 5, "\\text{Equals } -1?"),
    poolAnswer("y7-int-md-p29", "Calculate (-3) × 4 ÷ (-2) × (-1).", "(-3) \\times 4 \\div (-2) \\times (-1)", "-6",
      "(-3) × 4 = -12, ÷ (-2) = 6, × (-1) = -6. Work left to right.", 5, ["−6"]),
    poolAnswer("y7-int-md-p30", "A diver descends 5 m per minute for 6 minutes, then ascends at the same rate for 2 minutes. Write the final depth as a negative integer.",
      "(-5) \\times 6 + 5 \\times 2", "-20", "(-5) × 6 = -30 descent, +5 × 2 = +10 ascent, so -30 + 10 = -20 m.", 5, ["−20"]),
  ],
  multiPartPractice: [
    {
      id: "y7-int-md-mp1",
      prompt: "A mine shaft is dug downward. The drill descends at a steady -8 m per minute. Use multiplication and division of integers to answer each part.",
      latex: "\\text{Rate} = -8 \\text{ m/min}",
      answer: "5",
      hint: "Multiply the rate by time for depth; divide depth by rate for time.",
      explanation: "(a) (-8) × 5 = -40 m. (b) (-8) × 3 × 2 considers two drills, but here -96 ÷ (-8) = 12 min. (c) -40 ÷ (-8) = 5 min to reach -40 m.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What depth is reached after 5 minutes? Write as a negative integer.",
          latex: "(-8) \\times 5",
          marks: 1,
          answer: "-40",
          acceptedAnswers: ["−40"],
          hint: "Multiply the rate by the time.",
          explanation: "(-8) × 5 = -40 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many minutes does it take to reach a depth of -96 m?",
          latex: "(-96) \\div (-8)",
          marks: 1,
          answer: "12",
          hint: "Divide the depth by the rate; same signs give a positive time.",
          explanation: "(-96) ÷ (-8) = 12 minutes.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Starting again from the surface, how many minutes to reach -40 m?",
          latex: "(-40) \\div (-8)",
          marks: 1,
          answer: "5",
          hint: "Divide the target depth by the rate.",
          explanation: "(-40) ÷ (-8) = 5 minutes.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Order of Operations with Integers (BEDMAS)
// ─────────────────────────────────────────────────────────────────────────────

const orderOfOperationsIntegers: LessonContent = {
  description: "Evaluate integer expressions correctly by applying the BEDMAS order of operations.",
  learningIntention: "Apply BEDMAS order of operations to evaluate expressions containing integers, including brackets, exponents, and all four operations.",
  successCriteria: [
    "State the correct order of operations: Brackets, Exponents, Division and Multiplication (left to right), Addition and Subtraction (left to right).",
    "Evaluate expressions with brackets involving integers before other operations.",
    "Apply multiplication and division before addition and subtraction.",
    "Evaluate multi-step integer expressions using the full BEDMAS sequence.",
  ],
  teaching: {
    paragraphs: [
      "When an expression contains more than one operation, we need agreed rules to decide which to calculate first. Without these rules, different people could get different answers from the same expression. The rules are called BEDMAS: Brackets, Exponents, Division, Multiplication, Addition, Subtraction.",
      "Brackets always come first. Whatever is inside the brackets is calculated before anything outside. Exponents (powers) come next. Then multiplication and division are done from left to right as they appear — they have equal priority, so left-to-right order matters. Finally, addition and subtraction are done from left to right.",
      "For example, to evaluate 3 + 4 × (-2): multiplication comes before addition, so do 4 × (-2) = -8 first, then 3 + (-8) = -5. If we added first incorrectly, we would get 7 × (-2) = -14, which is wrong.",
      "A common mistake is doing addition or subtraction before multiplication. Remember: multiplication and division are always done before addition and subtraction unless brackets say otherwise.",
    ],
    latexBlocks: [
      "\\text{BEDMAS: } \\underbrace{B}_{\\text{Brackets}} \\to \\underbrace{E}_{\\text{Exponents}} \\to \\underbrace{D,\\,M}_{\\text{left to right}} \\to \\underbrace{A,\\,S}_{\\text{left to right}}",
      "3 + 4 \\times (-2) = 3 + (-8) = -5 \\quad (\\text{not } 7 \\times (-2))",
      "(3 + 4) \\times (-2) = 7 \\times (-2) = -14 \\quad (\\text{brackets first})",
    ],
  },
  workedExamples: [
    {
      title: "Evaluate using multiplication before addition",
      questionLatex: "\\text{Evaluate } -2 + 5 \\times (-3).",
      steps: [
        {
          explanation: "Multiplication comes before addition in BEDMAS. Evaluate 5 × (-3) first.",
          latex: "5 \\times (-3) = -15",
        },
        {
          explanation: "Now add: -2 + (-15). Adding a negative means subtracting.",
          latex: "-2 + (-15) = -17",
        },
      ],
      finalAnswerLatex: "-2 + 5 \\times (-3) = -17",
    },
    {
      title: "Evaluate brackets first",
      questionLatex: "\\text{Evaluate } (-4 + 7) \\times (-3) - 1.",
      steps: [
        {
          explanation: "Brackets come first. Evaluate -4 + 7 inside the brackets.",
          latex: "-4 + 7 = 3",
        },
        {
          explanation: "Multiply: 3 × (-3). Different signs give a negative result.",
          latex: "3 \\times (-3) = -9",
        },
        {
          explanation: "Subtract: -9 - 1.",
          latex: "-9 - 1 = -10",
        },
      ],
      finalAnswerLatex: "(-4 + 7) \\times (-3) - 1 = -10",
    },
    {
      title: "Evaluate a multi-step expression with division",
      questionLatex: "\\text{Evaluate } 20 \\div (-4) + (-3) \\times 2.",
      steps: [
        {
          explanation: "Perform division and multiplication first (left to right). Start with 20 ÷ (-4).",
          latex: "20 \\div (-4) = -5",
        },
        {
          explanation: "Now evaluate (-3) × 2.",
          latex: "(-3) \\times 2 = -6",
        },
        {
          explanation: "Finally, add the two results.",
          latex: "-5 + (-6) = -11",
        },
      ],
      finalAnswerLatex: "20 \\div (-4) + (-3) \\times 2 = -11",
    },
  ],
  guidedPractice: [
    choice(
      "y7-int-oo-g1",
      "In the expression 6 - 2 × 3, which operation should you perform first?",
      "B",
      ["Subtraction: 6 - 2 = 4", "Multiplication: 2 × 3 = 6", "Both at the same time", "Neither — read left to right"],
      "BEDMAS says multiplication comes before subtraction. Evaluate 2 × 3 = 6 first, giving 6 - 6 = 0.",
      "6 - 2 \\times 3"
    ),
    answer(
      "y7-int-oo-g2",
      "Evaluate 8 + (-3) × 4.",
      "8 + (-3) \\times 4",
      "-4",
      "Multiplication first: (-3) × 4 = -12. Then 8 + (-12) = 8 - 12 = -4.",
      ["−4"],
      "Work through BEDMAS: Brackets then Exponents then Multiplication/Division then Addition/Subtraction."
    ),
    answer(
      "y7-int-oo-g3",
      "Evaluate (-5 + 2) × 6.",
      "(-5 + 2) \\times 6",
      "-18",
      "Brackets first: -5 + 2 = -3. Then (-3) × 6 = -18.",
      ["−18"],
      "Calculate what is inside the brackets before multiplying."
    ),
    answer(
      "y7-int-oo-g4",
      "Evaluate 24 ÷ (-6) - 1.",
      "24 \\div (-6) - 1",
      "-5",
      "Division first: 24 ÷ (-6) = -4. Then -4 - 1 = -5.",
      ["−5"],
      "Division comes before subtraction in BEDMAS."
    ),
  ],
  independentPractice: [
    answer(
      "y7-int-oo-i1",
      "Evaluate (-3)^2 - 5.",
      "(-3)^2 - 5",
      "4",
      "Exponent first: (-3)^2 = (-3) × (-3) = 9. Then 9 - 5 = 4.",
      [],
      "Exponents come before subtraction in BEDMAS."
    ),
    answer(
      "y7-int-oo-i2",
      "Evaluate 2 × (-4) + 3 × 5.",
      "2 \\times (-4) + 3 \\times 5",
      "7",
      "Multiplications first (left to right): 2 × (-4) = -8 and 3 × 5 = 15. Then -8 + 15 = 7.",
      [],
      "Do all multiplications before the addition."
    ),
    answer(
      "y7-int-oo-i3",
      "Evaluate 5 - (2 + 3 × (-2)).",
      "5 - (2 + 3 \\times (-2))",
      "7",
      "Inside the brackets: 3 × (-2) = -6 first (multiplication), then 2 + (-6) = -4. Then 5 - (-4) = 5 + 4 = 7.",
      [],
      "Work inside brackets first, applying BEDMAS within the brackets too."
    ),
    answer(
      "y7-int-oo-i4",
      "Evaluate (-18) ÷ 3 + (-2) × (-4).",
      "(-18) \\div 3 + (-2) \\times (-4)",
      "2",
      "Division: (-18) ÷ 3 = -6. Multiplication: (-2) × (-4) = 8. Then -6 + 8 = 2.",
      [],
      "Do both division and multiplication before addition."
    ),
    choice(
      "y7-int-oo-i5",
      "A student evaluates 10 - 2 × 3 and gets 24. What error did they make?",
      "A",
      [
        "They subtracted first (10 - 2 = 8) then multiplied (8 × 3 = 24).",
        "They multiplied first (2 × 3 = 6) then subtracted (10 - 6 = 4).",
        "They added instead of subtracting.",
        "They forgot to apply the sign rule.",
      ],
      "The correct answer is 10 - (2 × 3) = 10 - 6 = 4. The student incorrectly did subtraction before multiplication.",
      "10 - 2 \\times 3"
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calculating left to right without following BEDMAS: evaluating 3 + 4 × 2 as 7 × 2 = 14.",
      fix: "Always perform multiplication and division before addition and subtraction. The correct answer is 3 + (4 × 2) = 3 + 8 = 11.",
    },
    {
      mistake: "Ignoring the sign inside brackets: evaluating (-3 + 5) as -(3 + 5) = -8 instead of 2.",
      fix: "Brackets mean calculate the expression inside. -3 + 5 = 2, not -(3 + 5).",
    },
    {
      mistake: "Treating (-3)^2 as -(3^2) = -9.",
      fix: "(-3)^2 = (-3) × (-3) = 9. The negative is inside the brackets, so it is squared too. Only -3^2 = -(3^2) = -9.",
    },
    {
      mistake: "Doing multiplication and division in order of which symbol appears last, rather than left to right.",
      fix: "Multiplication and division have equal priority. When they appear together, work from left to right: 12 ÷ 3 × 2 = 4 × 2 = 8, not 12 ÷ 6 = 2.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-int-oo-m1",
      "Evaluate 5 × (-2) + 3.",
      "5 \\times (-2) + 3",
      "-7",
      "Multiplication first: 5 × (-2) = -10. Then -10 + 3 = -7.",
      ["−7"],
      "Multiplication before addition."
    ),
    choice(
      "y7-int-oo-m2",
      "What is the value of 12 ÷ (-4) × 3?",
      "C",
      ["1", "-1", "-9", "9"],
      "Division and multiplication have equal priority — work left to right. 12 ÷ (-4) = -3, then (-3) × 3 = -9.",
      "12 \\div (-4) \\times 3"
    ),
    answer(
      "y7-int-oo-m3",
      "Evaluate (6 - 10) × (-4).",
      "(6 - 10) \\times (-4)",
      "16",
      "Brackets first: 6 - 10 = -4. Then (-4) × (-4) = 16. Same signs give positive.",
      [],
      "Evaluate inside the brackets first, then multiply."
    ),
    answer(
      "y7-int-oo-m4",
      "Evaluate 30 ÷ (-5) + 7.",
      "30 \\div (-5) + 7",
      "1",
      "Division first: 30 ÷ (-5) = -6. Then -6 + 7 = 1.",
      [],
      "Division before addition."
    ),
    answer(
      "y7-int-oo-m5",
      "Evaluate (-2)^3 + 5.",
      "(-2)^3 + 5",
      "-3",
      "Exponent first: (-2)^3 = (-2) × (-2) × (-2) = 4 × (-2) = -8. Then -8 + 5 = -3.",
      ["−3"],
      "Evaluate the exponent before addition."
    ),
    answer(
      "y7-int-oo-m6",
      "Evaluate 4 × (-3) - 20 ÷ (-5).",
      "4 \\times (-3) - 20 \\div (-5)",
      "-8",
      "Multiplications and divisions first (left to right): 4 × (-3) = -12 and 20 ÷ (-5) = -4. Then -12 - (-4) = -12 + 4 = -8.",
      ["−8"],
      "Do all multiplications and divisions before the subtraction."
    ),
    answer(
      "y7-int-oo-m7",
      "Evaluate 3 + 2 × (-4) - (-6) ÷ 3.",
      "3 + 2 \\times (-4) - (-6) \\div 3",
      "-3",
      "Multiplications/divisions first: 2 × (-4) = -8 and (-6) ÷ 3 = -2. Then 3 + (-8) - (-2) = 3 - 8 + 2 = -3.",
      ["−3"],
      "Handle all multiplications and divisions before additions and subtractions."
    ),
    choice(
      "y7-int-oo-m8",
      "Evaluate $(−3)^2$ and select the correct answer.",
      "C",
      ["-9", "6", "9", "-6"],
      "$(-3)^2 = (-3) × (-3) = 9$. Same signs give a positive result. This is different from $-3^2 = -(3^2) = -9$.",
      "(-3)^2"
    ),
    answer(
      "y7-int-oo-m9",
      "Evaluate 15 - 3 × (2 - 6).",
      "15 - 3 \\times (2 - 6)",
      "27",
      "Brackets first: 2 - 6 = -4. Then multiplication: 3 × (-4) = -12. Then 15 - (-12) = 15 + 12 = 27.",
      [],
      "Work through BEDMAS: brackets, then multiplication, then subtraction."
    ),
    answer(
      "y7-int-oo-m10",
      "Evaluate (−10 + 4) ÷ (−1) − 3 × 2.",
      "(-10 + 4) \\div (-1) - 3 \\times 2",
      "0",
      "Brackets first: -10 + 4 = -6. Then division: (-6) ÷ (-1) = 6. Multiplication: 3 × 2 = 6. Then 6 - 6 = 0.",
      [],
      "Evaluate both brackets first, then division and multiplication, then subtraction."
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    poolAnswer("y7-int-oo-p1", "Evaluate 2 + 3 × 4.", "2 + 3 \\times 4", "14", "Multiply first: 3 × 4 = 12, then 2 + 12 = 14.", 1),
    poolAnswer("y7-int-oo-p2", "Evaluate 10 - 2 × 3.", "10 - 2 \\times 3", "4", "Multiply first: 2 × 3 = 6, then 10 - 6 = 4.", 1),
    poolChoice("y7-int-oo-p3", "In 5 + 6 ÷ 2, which is done first?", "B",
      ["Addition", "Division", "Both together", "Right to left"],
      "Division comes before addition: 6 ÷ 2 = 3, then 5 + 3 = 8.", 1, "5 + 6 \\div 2"),
    poolAnswer("y7-int-oo-p4", "Evaluate (4 + 1) × 2.", "(4 + 1) \\times 2", "10", "Brackets first: 4 + 1 = 5, then 5 × 2 = 10.", 1),
    poolAnswer("y7-int-oo-p5", "Evaluate 3^2 + 1.", "3^2 + 1", "10", "Exponent first: 3^2 = 9, then 9 + 1 = 10.", 1),
    // ── Difficulty 2 ──
    poolAnswer("y7-int-oo-p6", "Evaluate 4 + (-2) × 5.", "4 + (-2) \\times 5", "-6", "Multiply first: (-2) × 5 = -10, then 4 - 10 = -6.", 2, ["−6"]),
    poolAnswer("y7-int-oo-p7", "Evaluate (-3 + 8) × 2.", "(-3 + 8) \\times 2", "10", "Brackets: -3 + 8 = 5, then 5 × 2 = 10.", 2),
    poolAnswer("y7-int-oo-p8", "Evaluate 18 ÷ (-3) + 2.", "18 \\div (-3) + 2", "-4", "Divide first: 18 ÷ (-3) = -6, then -6 + 2 = -4.", 2, ["−4"]),
    poolChoice("y7-int-oo-p9", "Evaluate 6 - 3 × (-2).", "A", ["12", "0", "-12", "6"],
      "Multiply first: 3 × (-2) = -6, then 6 - (-6) = 12.", 2, "6 - 3 \\times (-2)"),
    poolAnswer("y7-int-oo-p10", "Evaluate (-2)^2 + 3.", "(-2)^2 + 3", "7", "Exponent: (-2)^2 = 4, then 4 + 3 = 7.", 2),
    poolAnswer("y7-int-oo-p11", "Evaluate 20 - 4 × 3.", "20 - 4 \\times 3", "8", "Multiply: 4 × 3 = 12, then 20 - 12 = 8.", 2),
    // ── Difficulty 3 ──
    poolAnswer("y7-int-oo-p12", "Evaluate 2 × (-3) + 4 × 2.", "2 \\times (-3) + 4 \\times 2", "2",
      "2 × (-3) = -6 and 4 × 2 = 8, then -6 + 8 = 2.", 3),
    poolAnswer("y7-int-oo-p13", "Evaluate (5 - 9) × (-3).", "(5 - 9) \\times (-3)", "12",
      "Brackets: 5 - 9 = -4, then (-4) × (-3) = 12.", 3),
    poolAnswer("y7-int-oo-p14", "Evaluate (-24) ÷ 6 - 2.", "(-24) \\div 6 - 2", "-6",
      "Divide: (-24) ÷ 6 = -4, then -4 - 2 = -6.", 3, ["−6"]),
    poolChoice("y7-int-oo-p15", "Evaluate (-3)^2 - 10.", "C", ["19", "-19", "-1", "1"],
      "(-3)^2 = 9, then 9 - 10 = -1.", 3, "(-3)^2 - 10"),
    poolAnswer("y7-int-oo-p16", "Evaluate 12 ÷ (-4) × 2.", "12 \\div (-4) \\times 2", "-6",
      "Left to right: 12 ÷ (-4) = -3, then -3 × 2 = -6.", 3, ["−6"]),
    poolAnswer("y7-int-oo-p17", "Evaluate 7 - (3 - 8).", "7 - (3 - 8)", "12",
      "Brackets: 3 - 8 = -5, then 7 - (-5) = 12.", 3),
    // ── Difficulty 4 ──
    poolAnswer("y7-int-oo-p18", "Evaluate (-2)^3 + 4 × (-1).", "(-2)^3 + 4 \\times (-1)", "-12",
      "(-2)^3 = -8 and 4 × (-1) = -4, then -8 + (-4) = -12.", 4, ["−12"]),
    poolAnswer("y7-int-oo-p19", "Evaluate 3 × (-4) - 16 ÷ (-8).", "3 \\times (-4) - 16 \\div (-8)", "-10",
      "3 × (-4) = -12 and 16 ÷ (-8) = -2, then -12 - (-2) = -10.", 4, ["−10"]),
    poolAnswer("y7-int-oo-p20", "Evaluate 5 - 2 × (3 - 7).", "5 - 2 \\times (3 - 7)", "13",
      "Brackets: 3 - 7 = -4, then 2 × (-4) = -8, then 5 - (-8) = 13.", 4),
    poolChoice("y7-int-oo-p21", "Evaluate (-18 + 6) ÷ (-4).", "B", ["-3", "3", "-6", "6"],
      "Brackets: -18 + 6 = -12, then (-12) ÷ (-4) = 3.", 4, "(-18 + 6) \\div (-4)"),
    poolAnswer("y7-int-oo-p22", "Evaluate 2 + 3 × (-2)^2.", "2 + 3 \\times (-2)^2", "14",
      "Exponent: (-2)^2 = 4, then 3 × 4 = 12, then 2 + 12 = 14.", 4),
    poolAnswer("y7-int-oo-p23", "Evaluate (-30) ÷ 5 + (-2) × (-3).", "(-30) \\div 5 + (-2) \\times (-3)", "0",
      "(-30) ÷ 5 = -6 and (-2) × (-3) = 6, then -6 + 6 = 0.", 4),
    // ── Difficulty 5 ──
    poolAnswer("y7-int-oo-p24", "Evaluate 4 + 2 × (-3) - (-8) ÷ 2.", "4 + 2 \\times (-3) - (-8) \\div 2", "2",
      "2 × (-3) = -6 and (-8) ÷ 2 = -4, then 4 + (-6) - (-4) = 4 - 6 + 4 = 2.", 5),
    poolAnswer("y7-int-oo-p25", "Evaluate (3 - 5)^2 × (-2).", "(3 - 5)^2 \\times (-2)", "-8",
      "Brackets: 3 - 5 = -2, then (-2)^2 = 4, then 4 × (-2) = -8.", 5, ["−8"]),
    poolAnswer("y7-int-oo-p26", "Evaluate (-2)^3 - (-3)^2.", "(-2)^3 - (-3)^2", "-17",
      "(-2)^3 = -8 and (-3)^2 = 9, then -8 - 9 = -17.", 5, ["−17"]),
    poolAnswer("y7-int-oo-p27", "Evaluate 10 - 2 × (5 - 3 × 4).", "10 - 2 \\times (5 - 3 \\times 4)", "24",
      "Inside brackets: 3 × 4 = 12, 5 - 12 = -7. Then 2 × (-7) = -14, then 10 - (-14) = 24.", 5),
    poolChoice("y7-int-oo-p28", "Evaluate (-4)^2 ÷ (-8) + 5.", "A", ["3", "-3", "7", "-7"],
      "(-4)^2 = 16, then 16 ÷ (-8) = -2, then -2 + 5 = 3.", 5, "(-4)^2 \\div (-8) + 5"),
    poolAnswer("y7-int-oo-p29", "Evaluate (-6 + 2) × (-3) - (-12) ÷ 4.", "(-6 + 2) \\times (-3) - (-12) \\div 4", "15",
      "Brackets: -6 + 2 = -4, then (-4) × (-3) = 12. (-12) ÷ 4 = -3. Then 12 - (-3) = 15.", 5),
    poolAnswer("y7-int-oo-p30", "Evaluate 36 ÷ (-3)^2 - 5 × (-2).", "36 \\div (-3)^2 - 5 \\times (-2)", "14",
      "(-3)^2 = 9, then 36 ÷ 9 = 4. 5 × (-2) = -10. Then 4 - (-10) = 14.", 5),
  ],
  multiPartPractice: [
    {
      id: "y7-int-oo-mp1",
      prompt: "Evaluate each expression by applying BEDMAS carefully. Show the value of each part.",
      latex: "\\text{B} \\to \\text{E} \\to \\text{D,M} \\to \\text{A,S}",
      answer: "-19",
      hint: "Brackets and exponents first, then multiplication/division, then addition/subtraction.",
      explanation: "(a) 3 × (-4) + 2 = -12 + 2 = -10. (b) $(-5 + 2)^2$ = $(-3)^2$ = 9. (c) $(-2)^3$ - 16 ÷ (-2) = -8 - (-8) = 0.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Evaluate 3 × (-4) + 2.",
          latex: "3 \\times (-4) + 2",
          marks: 1,
          answer: "-10",
          acceptedAnswers: ["−10"],
          hint: "Multiply before adding.",
          explanation: "3 × (-4) = -12, then -12 + 2 = -10.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Evaluate $(-5 + 2)^2$.",
          latex: "(-5 + 2)^2",
          marks: 1,
          answer: "9",
          hint: "Brackets first, then square.",
          explanation: "-5 + 2 = -3, then $(-3)^2$ = 9.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Evaluate $(-2)^3$ - 16 ÷ (-2).",
          latex: "(-2)^3 - 16 \\div (-2)",
          marks: 2,
          answer: "0",
          hint: "Exponent and division before subtraction.",
          explanation: "$(-2)^3$ = -8 and 16 ÷ (-2) = -8, then -8 - (-8) = 0.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 5 — Integers Problem Solving
// ─────────────────────────────────────────────────────────────────────────────

const integersProblemSolving: LessonContent = {
  description: "Solve practical problems involving integers in contexts such as temperature change, profit and loss, sea level, and building floors.",
  learningIntention: "Choose the correct integer operation and calculate an answer to solve real-world problems involving positive and negative numbers.",
  successCriteria: [
    "Interpret a real-world context and decide whether to add, subtract, multiply, or divide integers.",
    "Write a mathematical expression to model a practical problem involving integers.",
    "Calculate and interpret the result in context, including the correct units and sign.",
    "Solve multi-step integer problems using more than one operation.",
  ],
  teaching: {
    paragraphs: [
      "Integers appear in many real-world situations. Temperature can be negative (below 0°C). Money can be negative (a debt or overdraft). Height or depth can be negative (below sea level). Floor numbers in a building can be negative (basement levels). In each case, the same rules for adding, subtracting, multiplying, and dividing integers apply.",
      "The key step in problem solving is choosing the right operation. A rise in temperature means adding. A fall means subtracting. Repeated equal losses means multiplying by a negative. Sharing a loss equally means dividing. Read the question carefully and decide which operation to use before calculating.",
      "Always interpret the answer in context. A result of -15 might mean 15 m below sea level, a debt of $15, or 15°C below zero. The sign tells you which side of zero you are on.",
      "For multi-step problems, break the problem into smaller steps. Solve each step in order, using the result from each step in the next one. Check at the end that your answer makes sense in context.",
    ],
    latexBlocks: [
      "\\text{Rise/gain: add a positive} \\quad \\text{Fall/loss: add a negative (or subtract)}",
      "\\text{Repeated loss: multiply by a negative}",
      "\\text{Starting position} + \\text{change} = \\text{final position}",
    ],
  },
  workedExamples: [
    {
      title: "Temperature change problem",
      questionLatex: "\\text{At midnight the temperature was } -8^\\circ\\text{C}. \\text{ By 3 pm it had risen } 15^\\circ\\text{C}. \\text{ What was the 3 pm temperature?}",
      steps: [
        {
          explanation: "A rise in temperature means adding a positive number.",
          latex: "-8 + 15",
        },
        {
          explanation: "Calculate: start at -8 and add 15, moving 15 steps right.",
          latex: "-8 + 15 = 7",
        },
      ],
      finalAnswerLatex: "\\text{The temperature at 3 pm was } 7^\\circ\\text{C.}",
    },
    {
      title: "Profit and loss problem",
      questionLatex: "\\text{A business loses } \\$200 \\text{ per month for 6 months. What is the total profit/loss?}",
      steps: [
        {
          explanation: "A loss of $200 per month is represented as -200. Six months of loss means multiplying.",
          latex: "(-200) \\times 6",
        },
        {
          explanation: "Different signs: negative × positive = negative.",
          latex: "(-200) \\times 6 = -1200",
        },
      ],
      finalAnswerLatex: "\\text{Total loss: } \\$1200 \\text{ (a loss of } \\$1200\\text{)}",
    },
    {
      title: "Multi-step sea level problem",
      questionLatex: "\\text{A diver is at } -15 \\text{ m. She ascends } 6 \\text{ m, then descends } 10 \\text{ m. What is her final depth?}",
      steps: [
        {
          explanation: "Ascending 6 m means adding 6 to the current depth.",
          latex: "-15 + 6 = -9",
        },
        {
          explanation: "Descending 10 m means subtracting 10 (or adding -10).",
          latex: "-9 + (-10) = -19",
        },
      ],
      finalAnswerLatex: "\\text{Final depth: } -19 \\text{ m (19 m below sea level)}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-int-ps-g1",
      "At 7 am the temperature was -5°C. By noon it fell another 3°C. Which expression gives the noon temperature?",
      "A",
      ["-5 - 3", "-5 + 3", "5 - 3", "5 + 3"],
      "A further fall in temperature means subtracting. Starting at -5°C and falling 3°C: -5 - 3 = -8°C.",
      "\\text{Starting temp: } -5^\\circ\\text{C, falls } 3^\\circ\\text{C}"
    ),
    answer(
      "y7-int-ps-g2",
      "A building has a ground floor (floor 0) and 3 basement floors (-1, -2, -3). A lift is on floor -2 and goes up 5 floors. What floor does it reach?",
      "-2 + 5",
      "3",
      "-2 + 5 = 3. The lift reaches floor 3.",
      [],
      "Going up means adding to the current floor number."
    ),
    answer(
      "y7-int-ps-g3",
      "A swimmer dives from sea level to -12 m, then descends another 7 m. What is the swimmer's final depth? Write as a negative integer.",
      "-12 + (-7)",
      "-19",
      "-12 + (-7) = -12 - 7 = -19. The swimmer is 19 m below sea level.",
      ["−19"],
      "Descending further means adding a negative (going more negative)."
    ),
    answer(
      "y7-int-ps-g4",
      "A bank account starts at -$45 (overdrawn). The owner deposits $60. What is the new balance? Write just the number.",
      "-45 + 60",
      "15",
      "-45 + 60 = 15. The account now has a positive balance of $15.",
      [],
      "A deposit adds to the balance — even a negative balance can become positive."
    ),
  ],
  independentPractice: [
    answer(
      "y7-int-ps-i1",
      "At dawn the temperature was -14°C. By midday it had risen 19°C. What was the midday temperature? Write just the number.",
      "-14 + 19",
      "5",
      "-14 + 19 = 5. The temperature rose from -14°C to 5°C.",
      [],
      "A rise adds to the current temperature."
    ),
    answer(
      "y7-int-ps-i2",
      "A company loses $350 each month. How much has it lost after 4 months? Write as a negative integer.",
      "(-350) \\times 4",
      "-1400",
      "(-350) × 4 = -1400. Different signs give a negative product. The total loss is $1400.",
      ["−1400"],
      "A repeated loss means multiplying the loss per period by the number of periods."
    ),
    answer(
      "y7-int-ps-i3",
      "A submarine is at -240 m. It ascends to -60 m. What is the change in depth? Write as a positive number (how many metres it rose).",
      "-60 - (-240)",
      "180",
      "-60 - (-240) = -60 + 240 = 180. The submarine rose 180 m.",
      [],
      "Change = final position minus starting position. Subtracting a negative flips to addition."
    ),
    answer(
      "y7-int-ps-i4",
      "In a quiz, Priya scores 5 points for each correct answer and -3 points for each wrong answer. She gets 8 correct and 5 wrong. What is her total score?",
      "8 \\times 5 + 5 \\times (-3)",
      "25",
      "8 × 5 = 40 for correct answers. 5 × (-3) = -15 for wrong answers. Total: 40 + (-15) = 25.",
      [],
      "Calculate the points for correct and wrong answers separately, then add them."
    ),
    answer(
      "y7-int-ps-i5",
      "The bottom of Death Valley is approximately -86 m relative to sea level. Mt Kosciuszko is 2228 m above sea level. What is the difference in height between them? Write as a positive integer.",
      "2228 - (-86)",
      "2314",
      "2228 - (-86) = 2228 + 86 = 2314. The total difference in height is 2314 m.",
      [],
      "Difference = higher elevation minus lower elevation. Subtracting a negative becomes addition."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Treating a 'fall' or 'loss' as adding a positive number.",
      fix: "A fall in temperature, a financial loss, or a descent below sea level are all represented as negative numbers. A fall of 5°C means adding -5 (or subtracting 5).",
    },
    {
      mistake: "Forgetting that subtracting a deeper position (more negative) gives a positive change.",
      fix: "To find a change in depth or height, subtract: final - start. If you go from -80 m to -20 m, the change is -20 - (-80) = 60 m upward (positive).",
    },
    {
      mistake: "Ignoring the sign of the answer and writing a positive number when the result should be negative.",
      fix: "Always check whether your answer should be positive or negative. A final depth is negative (below sea level). A debt is negative. Reread the question to confirm the expected sign.",
    },
    {
      mistake: "Multiplying a rate by the wrong sign (e.g., a loss of $50 per week written as +50 instead of -50).",
      fix: "Identify whether the rate represents a gain or a loss before writing the expression. A loss of $50 per week is -50, so after 4 weeks the change is (-50) × 4 = -200.",
    },
  ],
  masteryQuiz: [
    answer(
      "y7-int-ps-m1",
      "The temperature in Hobart was -3°C at midnight. By 9 am it had risen 8°C. What was the 9 am temperature? Write just the number.",
      "-3 + 8",
      "5",
      "-3 + 8 = 5. The temperature at 9 am was 5°C.",
      [],
      "A rise in temperature means adding to the current value."
    ),
    choice(
      "y7-int-ps-m2",
      "A diver is at -12 m and descends 7 more metres. Which expression gives the final depth?",
      "A",
      ["-12 - 7", "-12 + 7", "12 + 7", "12 - 7"],
      "Descending further means subtracting (going more negative): -12 - 7 = -19 m.",
      "\\text{Starting depth: } -12\\text{ m, descends } 7\\text{ m}"
    ),
    answer(
      "y7-int-ps-m3",
      "A football team loses 4 points each game for 5 consecutive games. What is their total change in points? Write as a negative integer.",
      "(-4) \\times 5",
      "-20",
      "(-4) × 5 = -20. The team's total change is -20 points.",
      ["−20"],
      "A repeated loss means multiplying the loss per game by the number of games."
    ),
    answer(
      "y7-int-ps-m4",
      "A bank account has a balance of -$180. The owner makes 4 equal deposits to bring the balance to exactly $0. How much is each deposit? Write as a positive integer.",
      "180 \\div 4",
      "45",
      "To reach $0 from -$180, a total of $180 must be deposited. Each deposit is 180 ÷ 4 = $45.",
      [],
      "Total needed divided by number of deposits gives each deposit amount."
    ),
    answer(
      "y7-int-ps-m5",
      "At 6 am the temperature was -9°C. It rose 4°C by 10 am, then fell 7°C by 3 pm. What was the 3 pm temperature? Write just the number.",
      "-9 + 4 - 7",
      "-12",
      "-9 + 4 = -5 (10 am temperature). Then -5 - 7 = -12 (3 pm temperature).",
      ["−12"],
      "Apply each change to the running temperature in order."
    ),
    answer(
      "y7-int-ps-m6",
      "A submarine is at -50 m. It ascends at 5 m per minute. After 8 minutes, what is its depth? Write as a negative integer.",
      "-50 + 5 \\times 8",
      "-10",
      "Ascending 5 m per minute for 8 minutes: 5 × 8 = 40 m gained. -50 + 40 = -10 m.",
      ["−10"],
      "Calculate the total ascent (positive), then add to the starting depth."
    ),
    choice(
      "y7-int-ps-m7",
      "A lift starts at floor -3 (basement 3) and travels up 7 floors. Which floor does it reach?",
      "C",
      ["Floor -10", "Floor -4", "Floor 4", "Floor 10"],
      "-3 + 7 = 4. The lift reaches floor 4 above ground.",
      "\\text{Start: floor } -3, \\text{ travels up 7 floors}"
    ),
    answer(
      "y7-int-ps-m8",
      "In a game, each correct answer gives 6 points and each wrong answer gives -2 points. Tom gets 7 correct and 4 wrong. What is his score?",
      "7 \\times 6 + 4 \\times (-2)",
      "34",
      "7 × 6 = 42 and 4 × (-2) = -8. Total: 42 + (-8) = 34.",
      [],
      "Calculate points from correct and wrong answers separately, then add."
    ),
    answer(
      "y7-int-ps-m9",
      "The highest point in Australia is 2228 m above sea level and the deepest lake floor in the ocean near Australia is at -6000 m. What is the total distance from the lake floor to the peak? Write as a positive integer.",
      "2228 - (-6000)",
      "8228",
      "2228 - (-6000) = 2228 + 6000 = 8228 m total vertical distance.",
      [],
      "Difference between highest and lowest: subtract the lower value (negative) from the upper."
    ),
    answer(
      "y7-int-ps-m10",
      "A scientist records temperatures over 3 days: -4°C, -8°C, and 3°C. What is the mean (average) temperature? Write just the number.",
      "\\dfrac{(-4) + (-8) + 3}{3}",
      "-3",
      "Sum: (-4) + (-8) + 3 = -12 + 3 = -9. Mean = -9 ÷ 3 = -3.",
      ["−3"],
      "Add all temperatures together, then divide by the number of days."
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    poolAnswer("y7-int-ps-p1", "The temperature was -2°C and rose 5°C. What is the new temperature?", "-2 + 5", "3",
      "-2 + 5 = 3°C.", 1),
    poolAnswer("y7-int-ps-p2", "A lift is on floor -1 and goes up 4 floors. What floor does it reach?", "-1 + 4", "3",
      "-1 + 4 = floor 3.", 1),
    poolChoice("y7-int-ps-p3", "A diver at -5 m descends 3 m. Which expression gives the new depth?", "A",
      ["-5 - 3", "-5 + 3", "5 - 3", "5 + 3"], "Descending means subtracting: -5 - 3 = -8 m.", 1, "\\text{New depth}"),
    poolAnswer("y7-int-ps-p4", "A debt of $10 grows by another $5. What is the total debt as a negative integer?", "-10 - 5", "-15",
      "-10 - 5 = -15.", 1, ["−15"]),
    poolAnswer("y7-int-ps-p5", "The temperature was 1°C and fell 6°C. What is the new temperature?", "1 - 6", "-5",
      "1 - 6 = -5°C.", 1, ["−5"]),
    // ── Difficulty 2 ──
    poolAnswer("y7-int-ps-p6", "At dawn it was -11°C; by noon it had risen 16°C. What was the noon temperature?", "-11 + 16", "5",
      "-11 + 16 = 5°C.", 2),
    poolAnswer("y7-int-ps-p7", "A shop loses $80 each day for 3 days. Write the total change as a negative integer.", "(-80) \\times 3", "-240",
      "(-80) × 3 = -240.", 2, ["−240"]),
    poolAnswer("y7-int-ps-p8", "A submarine at -90 m ascends to -25 m. How many metres did it rise?", "-25 - (-90)", "65",
      "-25 - (-90) = -25 + 90 = 65 m.", 2),
    poolChoice("y7-int-ps-p9", "A team loses 3 points per game for 6 games. What is the total change?", "C",
      ["18", "-3", "-18", "9"], "(-3) × 6 = -18 points.", 2, "\\text{Total change}"),
    poolAnswer("y7-int-ps-p10", "A bank balance of -$60 receives a $90 deposit. What is the new balance?", "-60 + 90", "30",
      "-60 + 90 = 30.", 2),
    poolAnswer("y7-int-ps-p11", "Mt Everest peak is 8848 m and the Dead Sea shore is -430 m. What is the height difference?",
      "8848 - (-430)", "9278", "8848 - (-430) = 8848 + 430 = 9278 m.", 2),
    // ── Difficulty 3 ──
    poolAnswer("y7-int-ps-p12", "At 6 am it was -7°C; it rose 5°C by noon, then fell 9°C by night. What was the night temperature?",
      "-7 + 5 - 9", "-11", "-7 + 5 = -2, then -2 - 9 = -11°C.", 3, ["−11"]),
    poolAnswer("y7-int-ps-p13", "A diver at -10 m descends 4 m, then ascends 7 m. What is the final depth?", "-10 - 4 + 7", "-7",
      "-10 - 4 = -14, then -14 + 7 = -7 m.", 3, ["−7"]),
    poolAnswer("y7-int-ps-p14", "A quiz gives 4 points per correct and -1 per wrong. Ann gets 6 correct, 3 wrong. What is her score?",
      "6 \\times 4 + 3 \\times (-1)", "21", "24 + (-3) = 21.", 3),
    poolAnswer("y7-int-ps-p15", "A balance of -$120 is paid off by 4 equal deposits to reach $0. How much is each deposit?",
      "120 \\div 4", "30", "120 ÷ 4 = $30.", 3),
    poolChoice("y7-int-ps-p16", "A lift at floor -2 goes up 8 floors then down 3. Which floor?", "B",
      ["Floor 13", "Floor 3", "Floor -3", "Floor 9"], "-2 + 8 - 3 = 3.", 3, "\\text{Final floor}"),
    poolAnswer("y7-int-ps-p17", "A submarine at -40 m ascends 5 m per minute for 6 minutes. What is its depth?", "-40 + 5 \\times 6", "-10",
      "5 × 6 = 30 ascent, then -40 + 30 = -10 m.", 3, ["−10"]),
    // ── Difficulty 4 ──
    poolAnswer("y7-int-ps-p18", "A glacier moves -2 m, -3 m, +1 m, -4 m over four days. What is the mean daily change?",
      "((-2) + (-3) + 1 + (-4)) \\div 4", "-2", "Sum = -8, mean = -8 ÷ 4 = -2 m.", 4, ["−2"]),
    poolAnswer("y7-int-ps-p19", "A game gives 7 points per correct, -3 per wrong. Sam gets 5 correct, 8 wrong. What is his score?",
      "5 \\times 7 + 8 \\times (-3)", "11", "35 + (-24) = 11.", 4),
    poolAnswer("y7-int-ps-p20", "A diver descends 4 m/min for 9 min then ascends 6 m/min for 3 min. Final depth as a negative integer?",
      "(-4) \\times 9 + 6 \\times 3", "-18", "(-4) × 9 = -36, +6 × 3 = +18, so -36 + 18 = -18 m.", 4, ["−18"]),
    poolChoice("y7-int-ps-p21", "Three temperatures -6°C, -2°C, 5°C have what mean?", "A",
      ["-1", "1", "-3", "3"], "Sum = -3, mean = -3 ÷ 3 = -1°C.", 4, "\\text{Mean temperature}"),
    poolAnswer("y7-int-ps-p22", "A debt of -$45 doubles, then $30 is repaid. What is the balance?", "-45 \\times 2 + 30", "-60",
      "-45 × 2 = -90, then -90 + 30 = -60.", 4, ["−60"]),
    poolAnswer("y7-int-ps-p23", "Death Valley is -86 m and a hill is 314 m. A drone flies from the valley floor to twice the hill's height. How far up did it travel?",
      "314 \\times 2 - (-86)", "714", "Twice hill = 628 m. From -86 to 628: 628 - (-86) = 714 m.", 4),
    // ── Difficulty 5 ──
    poolAnswer("y7-int-ps-p24", "Daily profit over a week: -$20, $50, -$30, $10, -$40. What is the total for the week?",
      "-20 + 50 - 30 + 10 - 40", "-30", "-20 + 50 = 30, 30 - 30 = 0, 0 + 10 = 10, 10 - 40 = -30.", 5, ["−30"]),
    poolAnswer("y7-int-ps-p25", "Four temperature readings are -8°C, -3°C, x°C, 5°C with a mean of -2°C. Find x.",
      "(-8 - 3 + x + 5) \\div 4 = -2", "-2", "Sum must be -8: -8 - 3 + 5 = -6, so x = -8 - (-6) = -2.", 5, ["−2"]),
    poolAnswer("y7-int-ps-p26", "A lift starts at floor 5, then makes moves -7, +3, -6, +2. What floor does it end on?",
      "5 - 7 + 3 - 6 + 2", "-3", "5 - 7 = -2, -2 + 3 = 1, 1 - 6 = -5, -5 + 2 = -3.", 5, ["−3"]),
    poolAnswer("y7-int-ps-p27", "A diver descends 3 m/min for 8 min, rests, then descends 5 m/min for 4 min. Final depth as a negative integer?",
      "(-3) \\times 8 + (-5) \\times 4", "-44", "(-3) × 8 = -24, (-5) × 4 = -20, so -24 + (-20) = -44 m.", 5, ["−44"]),
    poolAnswer("y7-int-ps-p28", "A test scores +5 per correct and -2 per wrong over 20 questions. Liam answers all and scores 30. How many did he get correct?",
      "5c - 2(20 - c) = 30", "10", "5c - 40 + 2c = 30, so 7c = 70, c = 10.", 5),
    poolChoice("y7-int-ps-p29", "A submarine at -30 m must reach -150 m descending 8 m/min. How long does it take?", "C",
      ["10 min", "12 min", "15 min", "20 min"], "Change = -150 - (-30) = -120 m, at -8 m/min: -120 ÷ -8 = 15 min.", 5, "\\text{Time taken}"),
    poolAnswer("y7-int-ps-p30", "Over 5 hours a thermometer changed by -3°C, -2°C, +4°C, -5°C, +1°C from a start of 6°C. What is the final temperature?",
      "6 - 3 - 2 + 4 - 5 + 1", "1", "6 - 3 = 3, 3 - 2 = 1, 1 + 4 = 5, 5 - 5 = 0, 0 + 1 = 1°C.", 5),
  ],
  multiPartPractice: [
    {
      id: "y7-int-ps-mp1",
      prompt: "A research submarine begins a dive at sea level (0 m). It descends at 6 m per minute for 8 minutes, then ascends 15 m, and finally descends to a wreck that is 12 m below its current position. Work through the dive in stages.",
      latex: "\\text{Rate} = -6 \\text{ m/min}",
      answer: "-45",
      hint: "Track the depth stage by stage, applying each change in order.",
      explanation: "(a) (-6) × 8 = -48 m after descent. (b) -48 + 15 = -33 m after ascent. (c) -33 - 12 = -45 m at the wreck.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What depth is reached after the 8-minute descent? Write as a negative integer.",
          latex: "(-6) \\times 8",
          marks: 1,
          answer: "-48",
          acceptedAnswers: ["−48"],
          hint: "Multiply the rate by the time.",
          explanation: "(-6) × 8 = -48 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "After ascending 15 m, what is the new depth?",
          latex: "-48 + 15",
          marks: 1,
          answer: "-33",
          acceptedAnswers: ["−33"],
          hint: "Ascending adds to the depth.",
          explanation: "-48 + 15 = -33 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "The wreck is 12 m below the current position. What is the wreck's depth?",
          latex: "-33 - 12",
          marks: 1,
          answer: "-45",
          acceptedAnswers: ["−45"],
          hint: "Going 12 m further down subtracts 12.",
          explanation: "-33 - 12 = -45 m.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson registry
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "integers-number-line": integersNumberLine,
  "adding-subtracting-integers": addingSubtractingIntegers,
  "multiplying-dividing-integers": multiplyingDividingIntegers,
  "order-of-operations-integers": orderOfOperationsIntegers,
  "integers-problem-solving": integersProblemSolving,
};

export function year7IntegersLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "integers") {
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
