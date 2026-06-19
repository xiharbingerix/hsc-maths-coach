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
    hint: "Use inverse operations to isolate the unknown.",
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
    hint: "Think about which operation is being done to the unknown, then reverse it.",
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

// Pool question builders — same auto-markable shape as `answer`/`choice`, but
// carrying a `difficulty` tag (1 = easiest … 5 = hardest) for the ramped pool.
function poolAnswer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return { ...answer(id, prompt, latex, ans, explanation, acceptedAnswers), difficulty };
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
  return { ...choice(id, prompt, ans, choices, explanation, latex), difficulty };
}

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 1 — One-step equations
// ─────────────────────────────────────────────────────────────────────────────

const oneStepEquations: LessonContent = {
  description: "Understand the difference between expressions and equations, then solve one-step linear equations using inverse operations.",
  learningIntention: "Solve one-step linear equations by applying the appropriate inverse operation and verify the solution by substitution.",
  successCriteria: [
    "Distinguish between an algebraic expression and an equation.",
    "Identify which inverse operation undoes the operation applied to the unknown.",
    "Solve one-step equations involving addition, subtraction, multiplication, and division.",
    "Verify a solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "An equation is a balance. Think of an old pair of scales with a pan on each side. The equals sign is the middle of the scales, and it tells you the two sides weigh exactly the same. The equation $x + 5 = 12$ says: 'whatever is in the left pan — some unknown number plus 5 — weighs the same as the 12 in the right pan.' Our job is to figure out what that unknown number is.",
      "This is different from an expression. An expression like $3x + 5$ is just a collection of terms with no equals sign — there is nothing to balance and nothing to find. You can tidy an expression up, but you can only *solve* an equation, because only an equation makes the claim that two sides are equal.",
      "Here is a concrete picture. Imagine the left pan holds a mystery bag (that is $x$) plus 5 single coins, and the right pan holds 12 coins, and the scales sit level. If you quietly lift 5 coins off the left pan, the left side gets lighter and the scales tip — unless you also lift 5 coins off the right pan at the same moment. Take 5 off both pans and the scales stay level: now the bag alone balances 7 coins. So the bag holds 7. That is exactly $x = 7$.",
      "In symbols, $5$ is being added to $x$, so we subtract $5$ from both sides: $x + 5 - 5 = 12 - 5$, giving $x = 7$. The phrase 'do the same thing to both sides' is not a rule someone invented — it is forced on us by the balance. Any change to one pan must be matched on the other, or the two sides stop being equal and the statement breaks.",
      "Now the deeper why: why does subtracting undo adding? Because they are opposite moves of the same size. Adding 5 then taking 5 away lands you exactly where you started — the two cancel to zero. That is what 'inverse operation' means: an operation paired with its exact opposite. Addition and subtraction are one such pair; multiplication and division are the other. Multiplying by 3 then dividing by 3 also returns you to the start, because dividing by 3 splits back up what multiplying by 3 grouped together. So to free $x$, we hit it with the inverse of whatever was done to it.",
      "That gives one method for every one-step equation. Find the single operation attached to $x$, then apply its inverse to both sides. For $3x = 18$, $x$ is multiplied by 3, so divide both sides by 3 to get $x = 6$. For $\\dfrac{x}{2} = 6$, $x$ is divided by 2, so multiply both sides by 2 to get $x = 12$.",
      "Watch out for the most common trap: changing only one side. A student who reads $x + 5 = 12$ and writes $x = 12 + 5 = 17$ has made two errors at once — they added instead of subtracting, and they only touched one side. Picture the scales: that move dumps 5 extra coins onto the right pan while leaving the left untouched, so the scales tip and the answer is wrong. Always pair every move across both pans, and always use the *opposite* operation.",
      "Finish by checking. Substitute your answer back into the original equation and confirm the two sides really are equal. For $x = 7$ in $x + 5 = 12$: $7 + 5 = 12$. True, so $x = 7$ is correct. This five-second check catches arithmetic slips before they cost marks.",
    ],
    latexBlocks: [
      "\\text{Balance rule: do the same operation to BOTH sides}",
      "x + a = b \\implies x + a - a = b - a \\implies x = b - a",
      "ax = b \\implies \\frac{ax}{a} = \\frac{b}{a} \\implies x = \\frac{b}{a}",
      "\\frac{x}{a} = b \\implies \\frac{x}{a} \\times a = b \\times a \\implies x = b \\times a",
    ],
  },
  workedExamples: [
    {
      title: "Solve an addition equation",
      questionLatex: "\\text{Solve } x + 5 = 12.",
      steps: [
        { explanation: "5 is added to x. The inverse of addition is subtraction, so subtract 5 from both sides.", latex: "x + 5 - 5 = 12 - 5" },
        { explanation: "Simplify both sides.", latex: "x = 7" },
        { explanation: "Verify by substituting x = 7 back into the original equation.", latex: "7 + 5 = 12 \\checkmark" },
      ],
      finalAnswerLatex: "x = 7",
    },
    {
      title: "Solve a multiplication equation",
      questionLatex: "\\text{Solve } 3x = 18.",
      steps: [
        { explanation: "x is being multiplied by 3. The inverse of multiplication is division, so divide both sides by 3.", latex: "\\frac{3x}{3} = \\frac{18}{3}" },
        { explanation: "Simplify both sides.", latex: "x = 6" },
        { explanation: "Check: substitute x = 6 into 3x = 18.", latex: "3 \\times 6 = 18 \\checkmark" },
      ],
      finalAnswerLatex: "x = 6",
    },
    {
      title: "Solve a division equation",
      questionLatex: "\\text{Solve } \\dfrac{x}{2} = 6.",
      steps: [
        { explanation: "x is being divided by 2. The inverse of division is multiplication, so multiply both sides by 2.", latex: "\\frac{x}{2} \\times 2 = 6 \\times 2" },
        { explanation: "Simplify both sides.", latex: "x = 12" },
        { explanation: "Check: 12 ÷ 2 = 6.", latex: "\\frac{12}{2} = 6 \\checkmark" },
      ],
      finalAnswerLatex: "x = 12",
    },
    {
      title: "Harder: an addition equation with a negative result",
      questionLatex: "\\text{Solve } x + 15 = 7.",
      steps: [
        { explanation: "15 is added to x. The inverse of addition is subtraction, so subtract 15 from both sides — keeping the balance by doing it to both pans.", latex: "x + 15 - 15 = 7 - 15" },
        { explanation: "Simplify the left side; the +15 and −15 cancel to zero, leaving x.", latex: "x = 7 - 15" },
        { explanation: "Compute the right side. Since 7 is smaller than 15, the result is negative.", latex: "x = -8" },
        { explanation: "Verify by substituting x = −8 back into the original equation.", latex: "-8 + 15 = 7 \\checkmark" },
      ],
      finalAnswerLatex: "x = -8",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-one-g1",
      "To solve x + 8 = 15, which operation should you apply to both sides?",
      "B",
      ["Add 8", "Subtract 8", "Multiply by 8", "Divide by 8"],
      "8 is added to x, so subtract 8 from both sides to leave x alone: x = 15 − 8 = 7.",
      "x + 8 = 15"
    ),
    answer(
      "y7-equ-one-g2",
      "Solve the equation.",
      "x - 4 = 7",
      "11",
      "Add 4 to both sides: x = 7 + 4 = 11. Check: 11 − 4 = 7."
    ),
    answer(
      "y7-equ-one-g3",
      "Solve the equation.",
      "4x = 28",
      "7",
      "Divide both sides by 4: x = 28 ÷ 4 = 7. Check: 4 × 7 = 28."
    ),
    answer(
      "y7-equ-one-g4",
      "Solve the equation.",
      "\\dfrac{x}{3} = 9",
      "27",
      "Multiply both sides by 3: x = 9 × 3 = 27. Check: 27 ÷ 3 = 9."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-one-i1",
      "Solve the equation.",
      "x + 13 = 20",
      "7",
      "Subtract 13 from both sides: x = 20 − 13 = 7."
    ),
    answer(
      "y7-equ-one-i2",
      "Solve the equation.",
      "x - 9 = 14",
      "23",
      "Add 9 to both sides: x = 14 + 9 = 23."
    ),
    answer(
      "y7-equ-one-i3",
      "Solve the equation.",
      "7x = 56",
      "8",
      "Divide both sides by 7: x = 56 ÷ 7 = 8."
    ),
    answer(
      "y7-equ-one-i4",
      "Solve the equation.",
      "\\dfrac{x}{5} = 8",
      "40",
      "Multiply both sides by 5: x = 8 × 5 = 40."
    ),
    choice(
      "y7-equ-one-i5",
      "A student solves 5x = 35 and gets x = 175. What error did they make?",
      "C",
      ["They divided 35 by 5 instead of 5 by 35.", "They subtracted 5 instead of dividing.", "They multiplied 35 by 5 instead of dividing.", "They added 5 to both sides."],
      "To undo multiplication by 5, divide both sides by 5: x = 35 ÷ 5 = 7. Multiplying gives 175, which is the wrong inverse operation.",
      "5x = 35"
    ),
  ],
  commonMistakes: [
    { mistake: "Applying the operation to only one side: x + 5 = 12, so x = 12 + 5 = 17.", fix: "Whatever you do to one side, you must do to the other. Subtract 5 from both sides: x = 12 − 5 = 7." },
    { mistake: "Using the same operation instead of the inverse: x + 5 = 12, so x = 12 + 5.", fix: "Identify the operation on x (here, +5) and apply the opposite (−5) to both sides." },
    { mistake: "Not checking the answer by substitution.", fix: "Always substitute your answer back into the original equation to confirm both sides are equal." },
    { mistake: "Confusing expressions and equations: trying to 'solve' 3x + 5.", fix: "An expression has no equals sign and cannot be solved. An equation has an equals sign — that is what you solve." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-one-m1",
      "Solve the equation.",
      "x + 6 = 19",
      "13",
      "Subtract 6 from both sides: x = 19 − 6 = 13."
    ),
    answer(
      "y7-equ-one-m2",
      "Solve the equation.",
      "x - 11 = 8",
      "19",
      "Add 11 to both sides: x = 8 + 11 = 19."
    ),
    choice(
      "y7-equ-one-m3",
      "Which equation has the solution x = 9?",
      "C",
      ["$x + 9 = 9$", "$3x = 36$", "$x - 5 = 4$", "$\\dfrac{x}{9} = 81$"],
      "Check each: x + 9 = 9 gives x = 0; 3x = 36 gives x = 12; x − 5 = 4 gives x = 9 (correct); x/9 = 81 gives x = 729.",
      "\\text{Select the equation with solution } x = 9."
    ),
    answer(
      "y7-equ-one-m4",
      "Solve the equation.",
      "9x = 63",
      "7",
      "Divide both sides by 9: x = 63 ÷ 9 = 7."
    ),
    answer(
      "y7-equ-one-m5",
      "Solve the equation.",
      "\\dfrac{x}{4} = 11",
      "44",
      "Multiply both sides by 4: x = 11 × 4 = 44."
    ),
    answer(
      "y7-equ-one-m6",
      "Solve the equation.",
      "x + 25 = 40",
      "15",
      "Subtract 25 from both sides: x = 40 − 25 = 15."
    ),
    choice(
      "y7-equ-one-m7",
      "A student says x/6 = 7 has solution x = 7/6. What is the correct solution?",
      "B",
      ["$x = \\dfrac{7}{6}$", "$x = 42$", "$x = 1$", "$x = 13$"],
      "To undo division by 6, multiply both sides by 6: x = 7 × 6 = 42. The student divided instead of multiplying.",
      "\\dfrac{x}{6} = 7"
    ),
    answer(
      "y7-equ-one-m8",
      "Solve the equation.",
      "x - 17 = 30",
      "47",
      "Add 17 to both sides: x = 30 + 17 = 47."
    ),
    answer(
      "y7-equ-one-m9",
      "Solve the equation.",
      "12x = 96",
      "8",
      "Divide both sides by 12: x = 96 ÷ 12 = 8."
    ),
    answer(
      "y7-equ-one-m10",
      "A value of x satisfies the equation $\\dfrac{x}{8} = 6$. What is x?",
      "\\dfrac{x}{8} = 6",
      "48",
      "Multiply both sides by 8: x = 6 × 8 = 48. Check: 48 ÷ 8 = 6."
    ),
  ],
  masteryQuizPool: [
    poolAnswer("y7-equ-one-p1", "Solve the equation.", "x + 4 = 11", "7", "Subtract 4 from both sides: x = 11 − 4 = 7.", 1),
    poolAnswer("y7-equ-one-p2", "Solve the equation.", "x + 7 = 16", "9", "Subtract 7 from both sides: x = 16 − 7 = 9.", 1),
    poolAnswer("y7-equ-one-p3", "Solve the equation.", "x - 5 = 12", "17", "Add 5 to both sides: x = 12 + 5 = 17.", 1),
    poolAnswer("y7-equ-one-p4", "Solve the equation.", "x - 8 = 6", "14", "Add 8 to both sides: x = 6 + 8 = 14.", 1),
    poolAnswer("y7-equ-one-p5", "Solve the equation.", "6x = 42", "7", "Divide both sides by 6: x = 42 ÷ 6 = 7.", 1),
    poolAnswer("y7-equ-one-p6", "Solve the equation.", "8x = 40", "5", "Divide both sides by 8: x = 40 ÷ 8 = 5.", 2),
    poolAnswer("y7-equ-one-p7", "Solve the equation.", "\\dfrac{x}{3} = 7", "21", "Multiply both sides by 3: x = 7 × 3 = 21.", 2),
    poolAnswer("y7-equ-one-p8", "Solve the equation.", "\\dfrac{x}{7} = 4", "28", "Multiply both sides by 7: x = 4 × 7 = 28.", 2),
    poolAnswer("y7-equ-one-p9", "Solve the equation.", "x + 19 = 31", "12", "Subtract 19 from both sides: x = 31 − 19 = 12.", 2),
    poolAnswer("y7-equ-one-p10", "Solve the equation.", "x - 14 = 21", "35", "Add 14 to both sides: x = 21 + 14 = 35.", 2),
    poolChoice("y7-equ-one-p11", "To solve x − 7 = 5, which operation should you apply to both sides?", "A", ["Add 7", "Subtract 7", "Multiply by 7", "Divide by 7"], "7 is subtracted from x, so add 7 to both sides: x = 5 + 7 = 12.", 2, "x - 7 = 5"),
    poolAnswer("y7-equ-one-p12", "Solve the equation.", "11x = 88", "8", "Divide both sides by 11: x = 88 ÷ 11 = 8.", 2),
    poolAnswer("y7-equ-one-p13", "Solve the equation.", "\\dfrac{x}{9} = 5", "45", "Multiply both sides by 9: x = 5 × 9 = 45.", 2),
    poolAnswer("y7-equ-one-p14", "Solve the equation.", "x + 38 = 50", "12", "Subtract 38 from both sides: x = 50 − 38 = 12.", 3),
    poolAnswer("y7-equ-one-p15", "Solve the equation.", "13x = 91", "7", "Divide both sides by 13: x = 91 ÷ 13 = 7.", 3),
    poolAnswer("y7-equ-one-p16", "Solve the equation.", "x - 23 = 19", "42", "Add 23 to both sides: x = 19 + 23 = 42.", 3),
    poolChoice("y7-equ-one-p17", "Which equation has the solution x = 12?", "B", ["$x + 12 = 12$", "$\\dfrac{x}{2} = 6$", "$x - 12 = 24$", "$3x = 24$"], "Check each: x + 12 = 12 gives x = 0; x/2 = 6 gives x = 12 (correct); x − 12 = 24 gives x = 36; 3x = 24 gives x = 8.", 3, "\\text{Select the equation with solution } x = 12."),
    poolAnswer("y7-equ-one-p18", "Solve the equation.", "\\dfrac{x}{6} = 11", "66", "Multiply both sides by 6: x = 11 × 6 = 66.", 3),
    poolAnswer("y7-equ-one-p19", "Solve the equation.", "x + 47 = 63", "16", "Subtract 47 from both sides: x = 63 − 47 = 16.", 3),
    poolAnswer("y7-equ-one-p20", "Solve the equation. The solution may be negative.", "x + 9 = 4", "-5", "Subtract 9 from both sides: x = 4 − 9 = −5. Check: −5 + 9 = 4.", 4, ["−5"]),
    poolAnswer("y7-equ-one-p21", "Solve the equation. The solution may be negative.", "x + 15 = 7", "-8", "Subtract 15 from both sides: x = 7 − 15 = −8. Check: −8 + 15 = 7.", 4, ["−8"]),
    poolChoice("y7-equ-one-p22", "A student solves x/5 = 9 by dividing both sides by 5, getting x = 9/5. What is the correct solution?", "C", ["$x = \\dfrac{9}{5}$", "$x = 14$", "$x = 45$", "$x = 4$"], "To undo division by 5, multiply both sides by 5: x = 9 × 5 = 45. The student divided instead of multiplying.", 4, "\\dfrac{x}{5} = 9"),
    poolAnswer("y7-equ-one-p23", "Solve the equation.", "16x = 208", "13", "Divide both sides by 16: x = 208 ÷ 16 = 13.", 4),
    poolAnswer("y7-equ-one-p24", "Solve the equation. The solution may be negative.", "x - 6 = -10", "-4", "Add 6 to both sides: x = −10 + 6 = −4. Check: −4 − 6 = −10.", 4, ["−4"]),
    poolAnswer("y7-equ-one-p25", "Solve the equation.", "\\dfrac{x}{12} = 12", "144", "Multiply both sides by 12: x = 12 × 12 = 144.", 4),
    poolChoice("y7-equ-one-p26", "If 7x = 0, what is the value of x?", "A", ["$0$", "$7$", "$1$", "\\text{No solution}"], "Divide both sides by 7: x = 0 ÷ 7 = 0. Any number times 0 gives 0, so x must be 0.", 5, "7x = 0"),
    poolAnswer("y7-equ-one-p27", "Solve the equation. The solution may be negative.", "x + 24 = 11", "-13", "Subtract 24 from both sides: x = 11 − 24 = −13.", 5, ["−13"]),
    poolAnswer("y7-equ-one-p28", "Solve the equation.", "25x = 600", "24", "Divide both sides by 25: x = 600 ÷ 25 = 24.", 5),
  ],
  multiPartPractice: [
    {
      id: "y7-equ-one-mp1",
      prompt:
        "A small market stall sells one type of item. Use one-step equations to answer each part. (Each part is independent.)",
      latex: "\\text{Solve each one-step equation below.}",
      answer: "8",
      hint: "For each part, identify the operation applied to the unknown and apply its inverse to both sides.",
      explanation:
        "Part (a): x + 17 = 25, so x = 25 − 17 = 8. Part (b): 4x = 52, so x = 52 ÷ 4 = 13. Part (c): x/5 = 9, so x = 9 × 5 = 45.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Solve x + 17 = 25.",
          latex: "x + 17 = 25",
          marks: 1,
          answer: "8",
          acceptedAnswers: ["8.0"],
          hint: "Subtract 17 from both sides.",
          explanation: "x = 25 − 17 = 8. Check: 8 + 17 = 25.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Solve 4x = 52.",
          latex: "4x = 52",
          marks: 1,
          answer: "13",
          acceptedAnswers: ["13.0"],
          hint: "Divide both sides by 4.",
          explanation: "x = 52 ÷ 4 = 13. Check: 4 × 13 = 52.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Solve x/5 = 9.",
          latex: "\\dfrac{x}{5} = 9",
          marks: 1,
          answer: "45",
          acceptedAnswers: ["45.0"],
          hint: "Multiply both sides by 5.",
          explanation: "x = 9 × 5 = 45. Check: 45 ÷ 5 = 9.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 2 — Two-step equations
// ─────────────────────────────────────────────────────────────────────────────

const twoStepEquations: LessonContent = {
  description: "Solve two-step linear equations by undoing addition or subtraction first, then multiplication or division.",
  learningIntention: "Solve two-step linear equations using inverse operations in the correct order, and verify solutions by substitution.",
  successCriteria: [
    "Identify the two operations applied to the unknown in a two-step equation.",
    "Apply inverse operations in the correct order: undo addition or subtraction first, then multiplication or division.",
    "Solve two-step equations of the form ax + b = c and x/a + b = c.",
    "Verify the solution by substituting it back into the original equation.",
  ],
  teaching: {
    paragraphs: [
      "A two-step equation has two operations stacked on the unknown instead of one. In $2x + 3 = 11$, the $x$ is first multiplied by 2 and then 3 is added. The balance is still the same idea — the two sides weigh the same — but now there are two layers to peel off before $x$ stands alone.",
      "Here is the everyday picture for why order matters. In the morning you put your socks on first, then your shoes. To undo that at night you reverse the order: shoes off first, then socks. You can't take the socks off while the shoes are still on. Unwrapping an equation works the same way — you undo the *last* thing that was done first.",
      "Look at $2x + 3 = 11$ in that light. The very last thing done to $x$ was 'add 3'. So that is the first thing we undo. Subtract 3 from both sides (keeping the balance) to get $2x = 8$. Now only the 'multiply by 2' layer is left, so divide both sides by 2 to get $x = 4$.",
      "This gives the rule: undo addition or subtraction first, then undo the multiplication or division. The reason is not arbitrary. The $+3$ sits *outside* the $2x$ — it acts on the whole $2x$ block, not on $x$ alone. While that $+3$ is still attached, $x$ is buried inside a bundle and you can't get a clean division to reach it. Peeling the outer $+3$ off first exposes the $2x$ so the division can finish the job.",
      "You can see why peeling out of order goes wrong. If you tried to divide $2x + 3 = 11$ by 2 first, fairness forces you to divide *every* term by 2 — you'd get $x + \\dfrac{3}{2} = \\dfrac{11}{2}$, which is messier, not simpler, and still two steps from done. Subtracting the 3 first avoids that mess entirely.",
      "Each step still uses an inverse paired with its opposite, applied to both sides. Subtraction undoes the $+3$; division undoes the $\\times 2$. For $3x - 5 = 16$, the last move was $-5$, so add 5 first (getting $3x = 21$), then divide by 3 ($x = 7$). For $\\dfrac{x}{4} + 2 = 7$, subtract 2 first ($\\dfrac{x}{4} = 5$), then multiply by 4 ($x = 20$).",
      "The common trap here is undoing in the wrong order — dividing before subtracting — or, as in one-step equations, changing only one side. Picture the scales each time: subtract the constant from both pans, then split both pans by the coefficient. If you only touch one side, the scales tip and the answer is wrong.",
      "Finish by substituting back. For $x = 4$ in $2x + 3 = 11$: $2 \\times 4 + 3 = 8 + 3 = 11$. Correct. Five seconds of checking catches most slips.",
    ],
    latexBlocks: [
      "\\text{Undo in reverse order: addition/subtraction first, then multiplication/division}",
      "ax + b = c \\implies ax + b - b = c - b \\implies ax = c - b \\implies x = \\frac{c-b}{a}",
      "ax - b = c \\implies ax = c + b \\implies x = \\frac{c+b}{a}",
      "\\frac{x}{a} + b = c \\implies \\frac{x}{a} = c - b \\implies x = a(c-b)",
    ],
  },
  workedExamples: [
    {
      title: "Solve a two-step equation with addition",
      questionLatex: "\\text{Solve } 2x + 3 = 11.",
      steps: [
        { explanation: "3 is added last, so undo it first by subtracting 3 from both sides.", latex: "2x + 3 - 3 = 11 - 3" },
        { explanation: "Simplify to get the multiplication step.", latex: "2x = 8" },
        { explanation: "x is multiplied by 2, so divide both sides by 2.", latex: "x = \\frac{8}{2} = 4" },
        { explanation: "Check by substituting x = 4: 2(4) + 3 = 8 + 3 = 11.", latex: "2(4) + 3 = 11 \\checkmark" },
      ],
      finalAnswerLatex: "x = 4",
    },
    {
      title: "Solve a two-step equation with subtraction",
      questionLatex: "\\text{Solve } 3x - 5 = 16.",
      steps: [
        { explanation: "5 is subtracted last, so undo it first by adding 5 to both sides.", latex: "3x - 5 + 5 = 16 + 5" },
        { explanation: "Simplify.", latex: "3x = 21" },
        { explanation: "Divide both sides by 3.", latex: "x = \\frac{21}{3} = 7" },
        { explanation: "Check: 3(7) − 5 = 21 − 5 = 16.", latex: "3(7) - 5 = 16 \\checkmark" },
      ],
      finalAnswerLatex: "x = 7",
    },
    {
      title: "Solve a two-step equation with division",
      questionLatex: "\\text{Solve } \\dfrac{x}{4} + 2 = 7.",
      steps: [
        { explanation: "2 is added last, so subtract 2 from both sides first.", latex: "\\frac{x}{4} + 2 - 2 = 7 - 2" },
        { explanation: "Simplify.", latex: "\\frac{x}{4} = 5" },
        { explanation: "x is divided by 4, so multiply both sides by 4.", latex: "x = 5 \\times 4 = 20" },
        { explanation: "Check: 20/4 + 2 = 5 + 2 = 7.", latex: "\\frac{20}{4} + 2 = 7 \\checkmark" },
      ],
      finalAnswerLatex: "x = 20",
    },
    {
      title: "Harder: a two-step equation with a negative solution",
      questionLatex: "\\text{Solve } 3x + 20 = 8.",
      steps: [
        { explanation: "20 is added last, so undo it first by subtracting 20 from both sides.", latex: "3x + 20 - 20 = 8 - 20" },
        { explanation: "Simplify. Because 8 is smaller than 20, the right side is negative.", latex: "3x = -12" },
        { explanation: "x is multiplied by 3, so divide both sides by 3. A negative divided by a positive is negative.", latex: "x = \\frac{-12}{3} = -4" },
        { explanation: "Check: 3(−4) + 20 = −12 + 20 = 8.", latex: "3(-4) + 20 = 8 \\checkmark" },
      ],
      finalAnswerLatex: "x = -4",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-two-g1",
      "For the equation 4x + 6 = 22, which is the correct first step?",
      "A",
      ["Subtract 6 from both sides", "Divide both sides by 4", "Add 6 to both sides", "Multiply both sides by 4"],
      "Undo the addition of 6 first by subtracting 6 from both sides: 4x = 22 − 6 = 16. Then divide by 4 to get x = 4.",
      "4x + 6 = 22"
    ),
    answer(
      "y7-equ-two-g2",
      "Solve the equation.",
      "2x + 5 = 13",
      "4",
      "Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4. Check: 2(4) + 5 = 13."
    ),
    answer(
      "y7-equ-two-g3",
      "Solve the equation.",
      "3x - 7 = 14",
      "7",
      "Add 7 to both sides: 3x = 21. Divide by 3: x = 7. Check: 3(7) − 7 = 14."
    ),
    answer(
      "y7-equ-two-g4",
      "Solve the equation.",
      "\\dfrac{x}{3} + 4 = 9",
      "15",
      "Subtract 4 from both sides: x/3 = 5. Multiply by 3: x = 15. Check: 15/3 + 4 = 9."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-two-i1",
      "Solve the equation.",
      "5x + 3 = 28",
      "5",
      "Subtract 3 from both sides: 5x = 25. Divide by 5: x = 5."
    ),
    answer(
      "y7-equ-two-i2",
      "Solve the equation.",
      "4x - 9 = 19",
      "7",
      "Add 9 to both sides: 4x = 28. Divide by 4: x = 7."
    ),
    answer(
      "y7-equ-two-i3",
      "Solve the equation.",
      "\\dfrac{x}{5} - 3 = 4",
      "35",
      "Add 3 to both sides: x/5 = 7. Multiply by 5: x = 35."
    ),
    answer(
      "y7-equ-two-i4",
      "Solve the equation.",
      "6x + 11 = 47",
      "6",
      "Subtract 11 from both sides: 6x = 36. Divide by 6: x = 6."
    ),
    choice(
      "y7-equ-two-i5",
      "A student solves 3x + 2 = 17 and gets x = 19/3. What went wrong?",
      "B",
      ["They divided by 3 before subtracting 2.", "They forgot to subtract 2 first and divided 17 by 3.", "They added 2 instead of subtracting it.", "They multiplied instead of dividing."],
      "The correct first step is to subtract 2: 3x = 15, then divide by 3 to get x = 5. Dividing 17 by 3 before subtracting 2 gives a wrong result.",
      "3x + 2 = 17"
    ),
  ],
  commonMistakes: [
    { mistake: "Dividing before subtracting: for 2x + 3 = 11, dividing by 2 first to get x + 3/2 = 11/2.", fix: "Undo addition and subtraction first. Subtract 3 to get 2x = 8, then divide by 2." },
    { mistake: "Subtracting from the wrong side: 2x + 3 = 11 becomes 2x = 11 + 3 = 14.", fix: "Whatever you do to one side you must do to the other. Subtract 3 from both sides: 2x = 11 − 3 = 8." },
    { mistake: "Forgetting to verify the answer.", fix: "Substitute your solution back into the original equation to confirm both sides are equal." },
    { mistake: "Getting the sign wrong when undoing subtraction: 3x − 5 = 16 becomes 3x = 16 − 5.", fix: "To undo −5, add 5 to both sides: 3x = 16 + 5 = 21." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-two-m1",
      "Solve the equation.",
      "2x + 7 = 21",
      "7",
      "Subtract 7 from both sides: 2x = 14. Divide by 2: x = 7."
    ),
    answer(
      "y7-equ-two-m2",
      "Solve the equation.",
      "5x - 4 = 31",
      "7",
      "Add 4 to both sides: 5x = 35. Divide by 5: x = 7."
    ),
    choice(
      "y7-equ-two-m3",
      "Which equation has the solution x = 3?",
      "D",
      ["$2x + 3 = 3$", "$4x - 5 = 17$", "$3x + 6 = 6$", "$5x - 1 = 14$"],
      "Check each: 2(3)+3=9≠3; 4(3)−5=7≠17; 3(3)+6=15≠6; 5(3)−1=14. Only D gives 14.",
      "\\text{Select the equation with solution } x = 3."
    ),
    answer(
      "y7-equ-two-m4",
      "Solve the equation.",
      "\\dfrac{x}{6} + 3 = 8",
      "30",
      "Subtract 3 from both sides: x/6 = 5. Multiply by 6: x = 30."
    ),
    answer(
      "y7-equ-two-m5",
      "Solve the equation.",
      "7x - 8 = 41",
      "7",
      "Add 8 to both sides: 7x = 49. Divide by 7: x = 7."
    ),
    answer(
      "y7-equ-two-m6",
      "Solve the equation.",
      "3x + 14 = 35",
      "7",
      "Subtract 14 from both sides: 3x = 21. Divide by 3: x = 7."
    ),
    choice(
      "y7-equ-two-m7",
      "To solve x/4 − 3 = 5, a student writes x/4 = 2. What error did they make?",
      "A",
      ["They subtracted 3 instead of adding it.", "They multiplied instead of dividing.", "They forgot to subtract from the left side.", "They divided by 4 before moving the constant."],
      "To undo −3, add 3 to both sides: x/4 = 5 + 3 = 8. Then x = 32. The student subtracted 3 instead.",
      "\\dfrac{x}{4} - 3 = 5"
    ),
    answer(
      "y7-equ-two-m8",
      "Solve the equation.",
      "\\dfrac{x}{2} - 6 = 4",
      "20",
      "Add 6 to both sides: x/2 = 10. Multiply by 2: x = 20. Check: 20/2 − 6 = 4."
    ),
    answer(
      "y7-equ-two-m9",
      "Solve the equation.",
      "9x + 3 = 57",
      "6",
      "Subtract 3 from both sides: 9x = 54. Divide by 9: x = 6."
    ),
    answer(
      "y7-equ-two-m10",
      "Solve the equation.",
      "4x - 13 = 23",
      "9",
      "Add 13 to both sides: 4x = 36. Divide by 4: x = 9. Check: 4(9) − 13 = 36 − 13 = 23."
    ),
  ],
  masteryQuizPool: [
    poolAnswer("y7-equ-two-p1", "Solve the equation.", "2x + 1 = 9", "4", "Subtract 1: 2x = 8. Divide by 2: x = 4.", 1),
    poolAnswer("y7-equ-two-p2", "Solve the equation.", "3x + 2 = 14", "4", "Subtract 2: 3x = 12. Divide by 3: x = 4.", 1),
    poolAnswer("y7-equ-two-p3", "Solve the equation.", "2x - 3 = 9", "6", "Add 3: 2x = 12. Divide by 2: x = 6.", 1),
    poolAnswer("y7-equ-two-p4", "Solve the equation.", "4x + 5 = 21", "4", "Subtract 5: 4x = 16. Divide by 4: x = 4.", 1),
    poolAnswer("y7-equ-two-p5", "Solve the equation.", "5x - 2 = 18", "4", "Add 2: 5x = 20. Divide by 5: x = 4.", 2),
    poolAnswer("y7-equ-two-p6", "Solve the equation.", "3x + 8 = 29", "7", "Subtract 8: 3x = 21. Divide by 3: x = 7.", 2),
    poolAnswer("y7-equ-two-p7", "Solve the equation.", "\\dfrac{x}{2} + 5 = 11", "12", "Subtract 5: x/2 = 6. Multiply by 2: x = 12.", 2),
    poolAnswer("y7-equ-two-p8", "Solve the equation.", "\\dfrac{x}{3} - 2 = 4", "18", "Add 2: x/3 = 6. Multiply by 3: x = 18.", 2),
    poolAnswer("y7-equ-two-p9", "Solve the equation.", "6x - 5 = 31", "6", "Add 5: 6x = 36. Divide by 6: x = 6.", 2),
    poolChoice("y7-equ-two-p10", "For 5x − 7 = 23, which is the correct first step?", "C", ["Subtract 7 from both sides", "Divide both sides by 5", "Add 7 to both sides", "Multiply both sides by 5"], "Undo the subtraction of 7 first by adding 7: 5x = 30. Then divide by 5 to get x = 6.", 2, "5x - 7 = 23"),
    poolAnswer("y7-equ-two-p11", "Solve the equation.", "7x + 6 = 48", "6", "Subtract 6: 7x = 42. Divide by 7: x = 6.", 3),
    poolAnswer("y7-equ-two-p12", "Solve the equation.", "\\dfrac{x}{4} + 7 = 12", "20", "Subtract 7: x/4 = 5. Multiply by 4: x = 20.", 3),
    poolAnswer("y7-equ-two-p13", "Solve the equation.", "8x - 11 = 53", "8", "Add 11: 8x = 64. Divide by 8: x = 8.", 3),
    poolAnswer("y7-equ-two-p14", "Solve the equation.", "\\dfrac{x}{5} - 4 = 3", "35", "Add 4: x/5 = 7. Multiply by 5: x = 35.", 3),
    poolChoice("y7-equ-two-p15", "Which equation has the solution x = 6?", "B", ["$3x + 4 = 16$", "$5x - 7 = 23$", "$2x + 9 = 27$", "$4x - 1 = 27$"], "Check each: 3(6)+4=22≠16; 5(6)−7=23 (correct); 2(6)+9=21≠27; 4(6)−1=23≠27.", 3, "\\text{Select the equation with solution } x = 6."),
    poolAnswer("y7-equ-two-p16", "Solve the equation.", "10x + 3 = 73", "7", "Subtract 3: 10x = 70. Divide by 10: x = 7.", 3),
    poolAnswer("y7-equ-two-p17", "Solve the equation.", "9x - 14 = 49", "7", "Add 14: 9x = 63. Divide by 9: x = 7.", 4),
    poolAnswer("y7-equ-two-p18", "Solve the equation. The solution may be negative.", "2x + 13 = 5", "-4", "Subtract 13: 2x = −8. Divide by 2: x = −4. Check: 2(−4) + 13 = 5.", 4, ["−4"]),
    poolAnswer("y7-equ-two-p19", "Solve the equation. The solution may be negative.", "3x + 20 = 8", "-4", "Subtract 20: 3x = −12. Divide by 3: x = −4. Check: 3(−4) + 20 = 8.", 4, ["−4"]),
    poolChoice("y7-equ-two-p20", "A student solves 4x + 6 = 30 by first dividing by 4, writing x + 6 = 7.5. What error did they make?", "A", ["They divided before subtracting the constant.", "They added 6 instead of subtracting it.", "They divided 30 by 6 instead of 4.", "They made no error."], "The correct first step is to subtract 6: 4x = 24, then divide by 4 to get x = 6. Dividing first only divides part of the left side.", 4, "4x + 6 = 30"),
    poolAnswer("y7-equ-two-p21", "Solve the equation.", "\\dfrac{x}{6} + 9 = 14", "30", "Subtract 9: x/6 = 5. Multiply by 6: x = 30.", 4),
    poolAnswer("y7-equ-two-p22", "Solve the equation.", "12x - 7 = 89", "8", "Add 7: 12x = 96. Divide by 12: x = 8.", 4),
    poolAnswer("y7-equ-two-p23", "Solve the equation. The solution may be negative.", "5x - 4 = -24", "-4", "Add 4: 5x = −20. Divide by 5: x = −4. Check: 5(−4) − 4 = −24.", 5, ["−4"]),
    poolAnswer("y7-equ-two-p24", "Solve the equation.", "\\dfrac{x}{8} - 6 = 1", "56", "Add 6: x/8 = 7. Multiply by 8: x = 56.", 5),
    poolChoice("y7-equ-two-p25", "Solving x/3 − 5 = 2, a student writes x/3 = −3. What did they do wrong?", "B", ["They divided instead of multiplying.", "They subtracted 5 instead of adding it.", "They forgot to multiply by 3.", "They made no error."], "To undo −5, add 5 to both sides: x/3 = 2 + 5 = 7, then x = 21. The student subtracted 5 instead of adding.", 5, "\\dfrac{x}{3} - 5 = 2"),
    poolAnswer("y7-equ-two-p26", "Solve the equation.", "11x + 12 = 78", "6", "Subtract 12: 11x = 66. Divide by 11: x = 6.", 5),
    poolAnswer("y7-equ-two-p27", "Solve the equation.", "7x + 15 = 71", "8", "Subtract 15: 7x = 56. Divide by 7: x = 8.", 3),
    poolAnswer("y7-equ-two-p28", "Solve the equation.", "\\dfrac{x}{2} + 13 = 30", "34", "Subtract 13: x/2 = 17. Multiply by 2: x = 34.", 4),
  ],
  multiPartPractice: [
    {
      id: "y7-equ-two-mp1",
      prompt:
        "A taxi charges a fixed booking fee plus a fixed amount per kilometre. The total fare in dollars for a trip of x kilometres is given by F = 3x + 5. Use this to answer each part.",
      latex: "F = 3x + 5",
      answer: "6",
      hint: "Substitute the given fare for F, then solve the resulting two-step equation for x by undoing the +5 first.",
      explanation:
        "Part (a): 3x + 5 = 23, so 3x = 18, x = 6. Part (b): 3x + 5 = 41, so 3x = 36, x = 12. Part (c): For a fare of $5, 3x + 5 = 5 gives 3x = 0, so x = 0 km.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "A trip costs $23. How many kilometres was it? Solve 3x + 5 = 23.",
          latex: "3x + 5 = 23",
          marks: 1,
          answer: "6",
          acceptedAnswers: ["6.0"],
          hint: "Subtract 5, then divide by 3.",
          explanation: "Subtract 5: 3x = 18. Divide by 3: x = 6 km. Check: 3(6) + 5 = 23.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Another trip costs $41. How many kilometres was it? Solve 3x + 5 = 41.",
          latex: "3x + 5 = 41",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12.0"],
          hint: "Subtract 5, then divide by 3.",
          explanation: "Subtract 5: 3x = 36. Divide by 3: x = 12 km. Check: 3(12) + 5 = 41.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What distance corresponds to a fare equal to just the booking fee of $5? Solve 3x + 5 = 5.",
          latex: "3x + 5 = 5",
          marks: 2,
          answer: "0",
          acceptedAnswers: ["0.0", "0 km"],
          hint: "Subtract 5 from both sides first.",
          explanation: "Subtract 5: 3x = 0. Divide by 3: x = 0 km — the booking fee alone means no distance travelled.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 3 — Equations from worded problems
// ─────────────────────────────────────────────────────────────────────────────

const equationsWordedProblems: LessonContent = {
  description: "Translate worded problems into equations using a pronumeral, solve them, and interpret the answer in context.",
  learningIntention: "Write and solve linear equations from worded problems, and verify that the solution makes sense in the original situation.",
  successCriteria: [
    "Choose a pronumeral and state clearly what it represents.",
    "Translate a worded problem into a linear equation.",
    "Solve the equation and state the answer using the correct units and context.",
    "Check that the answer makes sense in the original problem.",
  ],
  teaching: {
    paragraphs: [
      "A worded problem is a real situation described in sentences. The power of algebra is that you can turn those sentences into an equation — a balance — solve it with the inverse-operation method you already know, and then translate the answer back into the real situation. The only new skill in this lesson is the translation; the solving is exactly what you have been doing.",
      "Every translation starts the same way: give the unknown a name. Choose a letter — a pronumeral — to stand for the quantity you are trying to find, and write down in plain words what it represents: 'Let $n$ = the number', 'Let $w$ = the width in cm'. This matters because the rest of the equation only has meaning once you have said what the letter is. An equation full of $x$'s with no statement of what $x$ stands for is just symbols.",
      "Next, find the relationship hidden in the words and copy it into symbols, phrase by phrase. Certain words are reliable signposts: 'add', 'more than', 'increased by' mean addition; 'subtract', 'less than', 'decreased by' mean subtraction; 'times', 'product', 'each', 'twice', 'triple' mean multiplication; 'shared', 'split', 'per' often mean division. The word 'is', 'gives', 'equals', or 'totals' is where the $=$ sign goes — it marks the two things being balanced.",
      "Here it is in action. 'I think of a number, add 7, and get 15.' Let $n$ = the number. 'Add 7' becomes $n + 7$; 'get 15' puts $= 15$ on the end: $n + 7 = 15$. This is now an ordinary one-step equation, so subtract 7 from both sides: $n = 8$. Check: $8 + 7 = 15$. State the answer in words: the number is 8.",
      "Why is it valid to treat a real situation as a balance? Because the equals sign you wrote is a genuine claim that two quantities are the same size — the number-plus-7 really does equal 15, the two ages really do sum to 26. Once two things are equal, every balance rule applies: do the same operation to both sides and they stay equal. The story the numbers came from doesn't change the algebra at all.",
      "Where students go wrong is reversing the relationship at the translation stage. 'Sam is 4 years older than Alex' means Sam's age is the bigger one: $\\text{Sam} = \\text{Alex} + 4$, i.e. $s = a + 4$, not $a = s + 4$. Read slowly and ask 'who is bigger?'. The moment you would write the relationship is exactly the moment to catch this — once the equation is wrong, every later step is wasted.",
      "Finally, sense-check the answer against the real world. If algebra hands you −3 students, or a 1000 km school corridor, the equation was set up wrong even if the arithmetic was perfect. A worded answer should be stated in context — 'Alex is 11 years old' — and should be physically possible.",
    ],
    latexBlocks: [
      "\\text{Step 1: Let } n = \\text{the unknown (state what it means)}",
      "\\text{Step 2: translate words to symbols} \\quad \\text{('is'} \\to =\\text{)}",
      "\\text{'a number plus 7 equals 15'} \\implies n + 7 = 15",
      "\\text{'Sam is 4 older than Alex'} \\implies s = a + 4 \\ \\text{(Sam is bigger)}",
    ],
  },
  workedExamples: [
    {
      title: "Think of a number problem",
      questionLatex: "\\text{I think of a number, add 7, and get 15. Find the number.}",
      steps: [
        { explanation: "Define the unknown. Let n = the number.", latex: "\\text{Let } n = \\text{the number.}" },
        { explanation: "Write the equation using the words of the problem.", latex: "n + 7 = 15" },
        { explanation: "Solve by subtracting 7 from both sides.", latex: "n = 15 - 7 = 8" },
        { explanation: "Check: 8 + 7 = 15. The number is 8.", latex: "8 + 7 = 15 \\checkmark" },
      ],
      finalAnswerLatex: "n = 8 \\text{ (the number is 8)}",
    },
    {
      title: "Perimeter problem",
      questionLatex: "\\text{A rectangle has perimeter 28 cm. Its width is 5 cm. Find the length.}",
      steps: [
        { explanation: "Let l = the length in cm. The perimeter formula gives an equation.", latex: "2l + 2(5) = 28" },
        { explanation: "Simplify the constant term.", latex: "2l + 10 = 28" },
        { explanation: "Subtract 10 from both sides.", latex: "2l = 18" },
        { explanation: "Divide both sides by 2.", latex: "l = 9" },
        { explanation: "Check: 2(9) + 2(5) = 18 + 10 = 28.", latex: "2(9) + 2(5) = 28 \\checkmark" },
      ],
      finalAnswerLatex: "l = 9 \\text{ cm}",
    },
    {
      title: "Age problem",
      questionLatex: "\\text{Sam is 4 years older than Alex. The sum of their ages is 26. How old is Alex?}",
      steps: [
        { explanation: "Let a = Alex's age. Then Sam's age = a + 4.", latex: "\\text{Alex} = a, \\quad \\text{Sam} = a + 4" },
        { explanation: "Write the equation: their ages add to 26.", latex: "a + (a + 4) = 26" },
        { explanation: "Simplify the left side.", latex: "2a + 4 = 26" },
        { explanation: "Subtract 4 from both sides.", latex: "2a = 22" },
        { explanation: "Divide by 2.", latex: "a = 11" },
        { explanation: "Check: Alex is 11, Sam is 15, and 11 + 15 = 26.", latex: "11 + 15 = 26 \\checkmark" },
      ],
      finalAnswerLatex: "a = 11 \\text{ (Alex is 11 years old)}",
    },
    {
      title: "Harder: consecutive integers and a sense-check",
      questionLatex: "\\text{Three consecutive whole numbers add to 72. Find the three numbers.}",
      steps: [
        { explanation: "Name the unknown. Let n = the smallest of the three numbers.", latex: "\\text{Let } n = \\text{the smallest number.}" },
        { explanation: "Consecutive means each is one more than the last, so the next two are n + 1 and n + 2.", latex: "n, \\quad n + 1, \\quad n + 2" },
        { explanation: "Translate 'add to 72' into an equation.", latex: "n + (n + 1) + (n + 2) = 72" },
        { explanation: "Collect the like terms on the left: three n's and the constants 1 + 2.", latex: "3n + 3 = 72" },
        { explanation: "Undo the +3 first by subtracting 3 from both sides.", latex: "3n = 69" },
        { explanation: "Divide both sides by 3 to isolate n.", latex: "n = 23" },
        { explanation: "Translate back: the three numbers are n, n + 1, n + 2. Sense-check that they are whole numbers and sum to 72.", latex: "23 + 24 + 25 = 72 \\checkmark" },
      ],
      finalAnswerLatex: "\\text{The numbers are } 23, 24, 25.",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-wrd-g1",
      "I think of a number, multiply it by 3, and get 24. Which equation represents this?",
      "B",
      ["$n + 3 = 24$", "$3n = 24$", "$n - 3 = 24$", "$n \\div 3 = 24$"],
      "'Multiply by 3' means the number is multiplied by 3, giving 3n = 24. The solution is n = 8."
    ),
    answer(
      "y7-equ-wrd-g2",
      "I think of a number, subtract 6, and get 10. Let n = the number. Solve for n.",
      "n - 6 = 10",
      "16",
      "Add 6 to both sides: n = 10 + 6 = 16. Check: 16 − 6 = 10."
    ),
    answer(
      "y7-equ-wrd-g3",
      "A rectangle has length 9 cm and perimeter 30 cm. Let w = the width. Solve for w.",
      "2(9) + 2w = 30",
      "6",
      "18 + 2w = 30. Subtract 18: 2w = 12. Divide by 2: w = 6. Check: 2(9) + 2(6) = 18 + 12 = 30."
    ),
    answer(
      "y7-equ-wrd-g4",
      "I think of a number, add 9, and get 22. Let n = the number. Solve for n.",
      "n + 9 = 22",
      "13",
      "Subtract 9 from both sides: n = 22 − 9 = 13. Check: 13 + 9 = 22."
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-wrd-i1",
      "Five times a number equals 45. Let n = the number. Find n.",
      "5n = 45",
      "9",
      "Divide both sides by 5: n = 45 ÷ 5 = 9."
    ),
    answer(
      "y7-equ-wrd-i2",
      "A number is doubled and then 3 is added. The result is 19. Let n = the number. Find n.",
      "2n + 3 = 19",
      "8",
      "Subtract 3: 2n = 16. Divide by 2: n = 8. Check: 2(8) + 3 = 19."
    ),
    answer(
      "y7-equ-wrd-i3",
      "Maya and Lena together have 36 stickers. Maya has 14 more than Lena. Let s = Lena's stickers. Find s.",
      "s + (s + 14) = 36",
      "11",
      "2s + 14 = 36. Subtract 14: 2s = 22. Divide by 2: s = 11. Check: 11 + 25 = 36."
    ),
    answer(
      "y7-equ-wrd-i4",
      "A square has perimeter 52 cm. Let s = the side length. Find s.",
      "4s = 52",
      "13",
      "Divide both sides by 4: s = 52 ÷ 4 = 13 cm."
    ),
    choice(
      "y7-equ-wrd-i5",
      "Which equation models this problem: 'A number is halved and 5 is subtracted, giving 7'?",
      "A",
      ["$\\dfrac{n}{2} - 5 = 7$", "$2n - 5 = 7$", "$\\dfrac{n}{2} + 5 = 7$", "$\\dfrac{n-5}{2} = 7$"],
      "'Halved' means divided by 2 (n/2), then 5 is subtracted, giving n/2 − 5 = 7. Solving: n/2 = 12, n = 24."
    ),
  ],
  commonMistakes: [
    { mistake: "Setting up the wrong equation — reversing the relationship: 'Sam is 4 older than Alex' written as a = s + 4 instead of s = a + 4.", fix: "Read carefully who is older. If Sam is 4 older than Alex, Sam's age = Alex's age + 4." },
    { mistake: "Forgetting to state what the pronumeral represents before writing the equation.", fix: "Always write 'Let n = …' first. Without this, the equation has no meaning." },
    { mistake: "Giving a purely algebraic answer without interpreting it in context.", fix: "If the question asks for the number of students, write 'There are 11 students', not just n = 11." },
    { mistake: "Not checking whether the answer makes sense — for example, accepting a negative number of people.", fix: "After solving, re-read the problem and ask whether the answer is physically possible." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-wrd-m1",
      "I think of a number, subtract 11, and get 7. Let n = the number. Find n.",
      "n - 11 = 7",
      "18",
      "Add 11 to both sides: n = 7 + 11 = 18."
    ),
    answer(
      "y7-equ-wrd-m2",
      "A number is multiplied by 6 and then 4 is added, giving 34. Let n = the number. Find n.",
      "6n + 4 = 34",
      "5",
      "Subtract 4: 6n = 30. Divide by 6: n = 5. Check: 6(5) + 4 = 34."
    ),
    choice(
      "y7-equ-wrd-m3",
      "Which equation models: 'Three less than four times a number is 17'?",
      "C",
      ["$4n + 3 = 17$", "$3 - 4n = 17$", "$4n - 3 = 17$", "$4(n - 3) = 17$"],
      "'Four times a number' is 4n; 'three less than' means subtract 3 from 4n, giving 4n − 3 = 17. Solving: n = 5."
    ),
    answer(
      "y7-equ-wrd-m4",
      "The perimeter of an equilateral triangle is 39 cm. Let s = the side length in cm. Find s.",
      "3s = 39",
      "13",
      "All three sides are equal, so 3s = 39. Divide by 3: s = 13 cm."
    ),
    answer(
      "y7-equ-wrd-m5",
      "Two friends share $50. One receives $8 more than the other. Let a = the smaller share. Find a.",
      "a + (a + 8) = 50",
      "21",
      "2a + 8 = 50. Subtract 8: 2a = 42. Divide by 2: a = 21. Check: 21 + 29 = 50."
    ),
    answer(
      "y7-equ-wrd-m6",
      "I think of a number, divide it by 4, and add 3 to get 8. Let n = the number. Find n.",
      "\\dfrac{n}{4} + 3 = 8",
      "20",
      "Subtract 3: n/4 = 5. Multiply by 4: n = 20. Check: 20/4 + 3 = 8."
    ),
    choice(
      "y7-equ-wrd-m7",
      "A rectangle's length is 3 times its width. The perimeter is 48 cm. What is the width?",
      "B",
      ["8 cm", "6 cm", "12 cm", "4 cm"],
      "Let w = width, so length = 3w. Perimeter: 2(3w) + 2w = 48, giving 8w = 48, w = 6 cm.",
      "2(3w) + 2w = 48"
    ),
    answer(
      "y7-equ-wrd-m8",
      "Tickets cost $9 each. Mia spent $63 on tickets. Let t = the number of tickets. Find t.",
      "9t = 63",
      "7",
      "Divide both sides by 9: t = 63 ÷ 9 = 7 tickets."
    ),
    answer(
      "y7-equ-wrd-m9",
      "Three consecutive integers add to 48. Let n = the smallest integer. Find n.",
      "n + (n+1) + (n+2) = 48",
      "15",
      "3n + 3 = 48. Subtract 3: 3n = 45. Divide by 3: n = 15. The three integers are 15, 16, 17."
    ),
    answer(
      "y7-equ-wrd-m10",
      "A bag of apples weighs 2 kg more than a bag of oranges. Together they weigh 14 kg. Let o = the mass of oranges in kg. Find o.",
      "o + (o + 2) = 14",
      "6",
      "2o + 2 = 14. Subtract 2: 2o = 12. Divide by 2: o = 6 kg. Check: 6 + 8 = 14."
    ),
  ],
  masteryQuizPool: [
    poolAnswer("y7-equ-wrd-p1", "I think of a number, add 5, and get 12. Let n = the number. Find n.", "n + 5 = 12", "7", "Subtract 5: n = 12 − 5 = 7.", 1),
    poolAnswer("y7-equ-wrd-p2", "I think of a number, subtract 4, and get 9. Let n = the number. Find n.", "n - 4 = 9", "13", "Add 4: n = 9 + 4 = 13.", 1),
    poolAnswer("y7-equ-wrd-p3", "Four times a number equals 36. Let n = the number. Find n.", "4n = 36", "9", "Divide by 4: n = 36 ÷ 4 = 9.", 1),
    poolAnswer("y7-equ-wrd-p4", "A number divided by 3 equals 8. Let n = the number. Find n.", "\\dfrac{n}{3} = 8", "24", "Multiply by 3: n = 8 × 3 = 24.", 1),
    poolAnswer("y7-equ-wrd-p5", "Seven times a number equals 84. Let n = the number. Find n.", "7n = 84", "12", "Divide by 7: n = 84 ÷ 7 = 12.", 2),
    poolAnswer("y7-equ-wrd-p6", "A number is tripled and then 5 is added, giving 26. Let n = the number. Find n.", "3n + 5 = 26", "7", "Subtract 5: 3n = 21. Divide by 3: n = 7.", 2),
    poolAnswer("y7-equ-wrd-p7", "A square has perimeter 48 cm. Let s = the side length in cm. Find s.", "4s = 48", "12", "Divide by 4: s = 48 ÷ 4 = 12 cm.", 2),
    poolAnswer("y7-equ-wrd-p8", "Pens cost $4 each. Jo spent $36 on pens. Let p = the number of pens. Find p.", "4p = 36", "9", "Divide by 4: p = 36 ÷ 4 = 9 pens.", 2),
    poolChoice("y7-equ-wrd-p9", "I think of a number, multiply it by 5, and get 40. Which equation represents this?", "C", ["$n + 5 = 40$", "$n - 5 = 40$", "$5n = 40$", "$\\dfrac{n}{5} = 40$"], "'Multiply by 5' gives 5n = 40, so n = 8.", 2),
    poolAnswer("y7-equ-wrd-p10", "A rectangle has width 7 cm and perimeter 40 cm. Let l = the length in cm. Find l.", "2l + 2(7) = 40", "13", "2l + 14 = 40. Subtract 14: 2l = 26. Divide by 2: l = 13 cm.", 3),
    poolAnswer("y7-equ-wrd-p11", "A number is doubled and then 7 is subtracted, giving 15. Let n = the number. Find n.", "2n - 7 = 15", "11", "Add 7: 2n = 22. Divide by 2: n = 11.", 3),
    poolAnswer("y7-equ-wrd-p12", "Two friends share $44. One receives $6 more than the other. Let a = the smaller share. Find a.", "a + (a + 6) = 44", "19", "2a + 6 = 44. Subtract 6: 2a = 38. Divide by 2: a = 19. Check: 19 + 25 = 44.", 3),
    poolAnswer("y7-equ-wrd-p13", "The perimeter of an equilateral triangle is 45 cm. Let s = the side length in cm. Find s.", "3s = 45", "15", "Divide by 3: s = 45 ÷ 3 = 15 cm.", 3),
    poolChoice("y7-equ-wrd-p14", "Which equation models: 'Five more than three times a number is 23'?", "B", ["$3n - 5 = 23$", "$3n + 5 = 23$", "$5n + 3 = 23$", "$3(n + 5) = 23$"], "'Three times a number' is 3n; 'five more than' adds 5, giving 3n + 5 = 23. Solving: n = 6.", 3),
    poolAnswer("y7-equ-wrd-p15", "A number is divided by 5 and then 2 is added, giving 9. Let n = the number. Find n.", "\\dfrac{n}{5} + 2 = 9", "35", "Subtract 2: n/5 = 7. Multiply by 5: n = 35.", 3),
    poolAnswer("y7-equ-wrd-p16", "Three consecutive integers add to 60. Let n = the smallest integer. Find n.", "n + (n+1) + (n+2) = 60", "19", "3n + 3 = 60. Subtract 3: 3n = 57. Divide by 3: n = 19. The integers are 19, 20, 21.", 4),
    poolAnswer("y7-equ-wrd-p17", "A rectangle's length is 4 times its width. The perimeter is 60 cm. Let w = the width in cm. Find w.", "2(4w) + 2w = 60", "6", "10w = 60. Divide by 10: w = 6 cm. The length is 24 cm.", 4),
    poolAnswer("y7-equ-wrd-p18", "Mara is 5 years older than Tom. The sum of their ages is 31. Let t = Tom's age. Find t.", "t + (t + 5) = 31", "13", "2t + 5 = 31. Subtract 5: 2t = 26. Divide by 2: t = 13. Tom is 13, Mara is 18.", 4),
    poolChoice("y7-equ-wrd-p19", "A number is halved and then 4 is added, giving 10. What is the number?", "C", ["8", "20", "12", "28"], "Let n be the number: n/2 + 4 = 10, so n/2 = 6, n = 12. Check: 12/2 + 4 = 10.", 4, "\\dfrac{n}{2} + 4 = 10"),
    poolAnswer("y7-equ-wrd-p20", "Three identical boxes plus a 7 kg weight balance a 34 kg mass. Let b = the mass of one box in kg. Find b.", "3b + 7 = 34", "9", "Subtract 7: 3b = 27. Divide by 3: b = 9 kg.", 4),
    poolAnswer("y7-equ-wrd-p21", "The sum of two consecutive even numbers is 38. Let n = the smaller number. Find n.", "n + (n + 2) = 38", "18", "2n + 2 = 38. Subtract 2: 2n = 36. Divide by 2: n = 18. The numbers are 18 and 20.", 4),
    poolAnswer("y7-equ-wrd-p22", "A phone plan costs $15 plus $0 per call but $3 per gigabyte of data. The bill is $33. Let g = gigabytes used. Find g.", "3g + 15 = 33", "6", "Subtract 15: 3g = 18. Divide by 3: g = 6 GB.", 5),
    poolAnswer("y7-equ-wrd-p23", "A number is multiplied by 4, then 9 is subtracted, giving 31. Let n = the number. Find n.", "4n - 9 = 31", "10", "Add 9: 4n = 40. Divide by 4: n = 10.", 5),
    poolChoice("y7-equ-wrd-p24", "A father is three times as old as his son. Together their ages total 48. How old is the son?", "A", ["12", "16", "24", "36"], "Let s = son's age, father = 3s. Then s + 3s = 48, so 4s = 48, s = 12. The father is 36.", 5, "s + 3s = 48"),
    poolAnswer("y7-equ-wrd-p25", "Four consecutive integers add to 74. Let n = the smallest integer. Find n.", "n + (n+1) + (n+2) + (n+3) = 74", "17", "4n + 6 = 74. Subtract 6: 4n = 68. Divide by 4: n = 17. The integers are 17, 18, 19, 20.", 5),
    poolAnswer("y7-equ-wrd-p26", "A rectangle's length is 5 cm more than its width. The perimeter is 38 cm. Let w = the width in cm. Find w.", "2w + 2(w + 5) = 38", "7", "4w + 10 = 38. Subtract 10: 4w = 28. Divide by 4: w = 7 cm. The length is 12 cm.", 5),
    poolAnswer("y7-equ-wrd-p27", "Tickets cost $12 each. A group spent $108. Let t = the number of tickets. Find t.", "12t = 108", "9", "Divide by 12: t = 108 ÷ 12 = 9 tickets.", 3),
    poolAnswer("y7-equ-wrd-p28", "A number increased by 18 gives 45. Let n = the number. Find n.", "n + 18 = 45", "27", "Subtract 18: n = 45 − 18 = 27.", 2),
  ],
  multiPartPractice: [
    {
      id: "y7-equ-wrd-mp1",
      prompt:
        "Two rectangular garden beds are being planned. Bed A is square; Bed B has its length 3 cm longer than its width. Use equations to answer each part.",
      latex: "\\text{Set up and solve a linear equation for each part.}",
      answer: "7",
      hint: "Define a pronumeral, translate the words into an equation, solve it, then check the answer is sensible.",
      explanation:
        "Part (a): square bed, 4s = 28 gives s = 7 cm. Part (b): three consecutive integers n + (n+1) + (n+2) = 27 gives 3n + 3 = 27, n = 8. Part (c): Bed B width w with 2w + 2(w + 3) = 46 gives 4w + 6 = 46, w = 10 cm.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Bed A is a square with perimeter 28 cm. Find its side length in cm.",
          latex: "4s = 28",
          marks: 1,
          answer: "7",
          acceptedAnswers: ["7.0", "7 cm"],
          hint: "All four sides are equal, so 4s = 28.",
          explanation: "Divide by 4: s = 28 ÷ 4 = 7 cm.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Three consecutive plant labels are numbered with consecutive integers that add to 27. Find the smallest label number.",
          latex: "n + (n+1) + (n+2) = 27",
          marks: 2,
          answer: "8",
          acceptedAnswers: ["8.0"],
          hint: "Simplify to 3n + 3 = 27, then solve.",
          explanation: "3n + 3 = 27. Subtract 3: 3n = 24. Divide by 3: n = 8. The integers are 8, 9, 10.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Bed B has length 3 cm more than its width and a perimeter of 46 cm. Find its width in cm.",
          latex: "2w + 2(w + 3) = 46",
          marks: 2,
          answer: "10",
          acceptedAnswers: ["10.0", "10 cm"],
          hint: "Expand to 4w + 6 = 46, then solve.",
          explanation: "4w + 6 = 46. Subtract 6: 4w = 40. Divide by 4: w = 10 cm. The length is 13 cm.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lesson 4 — Quadratic equations of the form ax² = c
// ─────────────────────────────────────────────────────────────────────────────

const quadraticEquationsAxSquaredEqualsC: LessonContent = {
  description: "Solve equations of the form ax² = c by isolating x² and taking the square root, giving both positive and negative solutions where appropriate.",
  learningIntention: "Solve quadratic equations of the form ax² = c by isolating x² then taking the square root, and recognise when no real solution exists.",
  successCriteria: [
    "Isolate x² by dividing both sides by the coefficient.",
    "Take the square root of both sides, giving both the positive and negative root when the context allows.",
    "Identify that x² = negative number has no real solution.",
    "Solve equations of the form ax² = c including cases like 2x² = 50.",
  ],
  teaching: {
    paragraphs: [
      "A quadratic equation is one where the unknown appears squared — $x^2$ is the highest power. The simplest kind is $ax^2 = c$, with no plain $x$ term and no constant added on. It is still a balance, so the same plan works: peel the layers off $x^2$ until $x^2$ sits alone, then undo the squaring itself.",
      "Take a concrete one: $x^2 = 25$. In words, this asks 'what number, multiplied by itself, gives 25?'. You might say 5, because $5 \\times 5 = 25$. The operation undoing 'multiply a number by itself' (squaring) is the square root, so $x = \\sqrt{25} = 5$. For a two-layer version like $2x^2 = 50$, first divide both sides by 2 to isolate $x^2$ (getting $x^2 = 25$), then square-root.",
      "In general, $ax^2 = c$ becomes $x^2 = \\dfrac{c}{a}$ after dividing by the coefficient $a$, and then $x = \\pm\\sqrt{\\dfrac{c}{a}}$ after taking the square root of both sides. The strange-looking $\\pm$ (plus-or-minus) sign is the whole point of this lesson, so here is why it is there.",
      "Why are there two solutions, not one? Because squaring throws away the sign of a number. Watch: $5 \\times 5 = 25$, but also $(-5) \\times (-5) = 25$, since a negative times a negative is positive. Both 5 and −5 square to 25, so when you run the process backwards from 25 you cannot tell which one you started with — both are valid. That is why $x^2 = 25$ has two answers, $x = 5$ and $x = -5$, written compactly as $x = \\pm 5$. Forgetting the $-5$ is the single most common error in this topic; the $\\pm$ is your reminder that squaring hid a sign you must restore.",
      "The same sign fact explains why some of these equations have no real answer at all. Consider $x^2 = -4$. A positive number squared is positive, a negative number squared is also positive, and $0^2 = 0$. There is simply no real number whose square is negative — squaring can only ever produce zero or a positive result. So $x^2 = -4$ has no real solution. (A student who answers $x = -2$ here has confused 'the number is negative' with 'the square is negative' — but $(-2)^2 = +4$, not $-4$.)",
      "One exam-practical note. Many questions, and physical ones especially, ask only for 'the positive solution' or for a length — and a length can't be negative, so you give just the positive root. Read the wording: when it asks for both, give both; when it restricts to positive, give the positive root only.",
    ],
    latexBlocks: [
      "ax^2 = c \\implies x^2 = \\frac{c}{a} \\implies x = \\pm\\sqrt{\\frac{c}{a}}",
      "5^2 = 25 \\quad \\text{and} \\quad (-5)^2 = 25 \\implies x^2 = 25 \\implies x = \\pm 5",
      "\\text{any real } x:\\ x^2 \\ge 0 \\implies x^2 = -4 \\ \\text{has no real solution}",
    ],
  },
  workedExamples: [
    {
      title: "Solve x² = 25",
      questionLatex: "\\text{Solve } x^2 = 25.",
      steps: [
        { explanation: "x² is already isolated. Take the square root of both sides.", latex: "x = \\pm\\sqrt{25}" },
        { explanation: "Evaluate the square root.", latex: "x = 5 \\text{ or } x = -5" },
        { explanation: "Verify both solutions: 5² = 25 and (−5)² = 25.", latex: "5^2 = 25 \\checkmark, \\quad (-5)^2 = 25 \\checkmark" },
      ],
      finalAnswerLatex: "x = 5 \\text{ or } x = -5",
    },
    {
      title: "Solve 2x² = 50",
      questionLatex: "\\text{Solve } 2x^2 = 50.",
      steps: [
        { explanation: "Divide both sides by 2 to isolate x².", latex: "x^2 = \\frac{50}{2} = 25" },
        { explanation: "Take the square root of both sides.", latex: "x = \\pm\\sqrt{25}" },
        { explanation: "Evaluate.", latex: "x = 5 \\text{ or } x = -5" },
        { explanation: "Check: 2(5²) = 2(25) = 50.", latex: "2(25) = 50 \\checkmark" },
      ],
      finalAnswerLatex: "x = 5 \\text{ or } x = -5",
    },
    {
      title: "Recognise no real solution",
      questionLatex: "\\text{Solve } x^2 = -4.",
      steps: [
        { explanation: "x² is isolated. Consider what x² = −4 means.", latex: "x^2 = -4" },
        { explanation: "Squaring any real number gives zero or a positive result, never a negative. So there is no real number x such that x² = −4.", latex: "\\text{No real solution exists.}" },
      ],
      finalAnswerLatex: "\\text{No real solution}",
    },
    {
      title: "Harder: a length from a square's area (positive root only)",
      questionLatex: "\\text{A square has area } 144 \\text{ cm}^2. \\text{ Find its side length.}",
      steps: [
        { explanation: "The area of a square is side × side, so if s is the side length, s² equals the area.", latex: "s^2 = 144" },
        { explanation: "x² is already isolated. Take the square root of both sides.", latex: "s = \\pm\\sqrt{144}" },
        { explanation: "Evaluate the square root. Algebraically there are two roots: 12 and −12.", latex: "s = 12 \\text{ or } s = -12" },
        { explanation: "A side length cannot be negative, so reject −12 and keep only the positive root.", latex: "s = 12" },
        { explanation: "Check: a side of 12 cm gives area 12 × 12 = 144 cm².", latex: "12^2 = 144 \\checkmark" },
      ],
      finalAnswerLatex: "s = 12 \\text{ cm}",
    },
  ],
  guidedPractice: [
    choice(
      "y7-equ-qdr-g1",
      "How many real solutions does x² = 36 have?",
      "C",
      ["None", "One (x = 6 only)", "Two (x = 6 and x = −6)", "Three"],
      "Taking the square root of a positive number gives two solutions: x = 6 and x = −6, since both square to 36.",
      "x^2 = 36"
    ),
    answer(
      "y7-equ-qdr-g2",
      "Solve x² = 49. Find the positive solution.",
      "x^2 = 49",
      "7",
      "Take the square root: x = 7 or x = −7. The positive solution is x = 7. Note: x = −7 is also a valid solution.",
      ["7"]
    ),
    answer(
      "y7-equ-qdr-g3",
      "Solve 3x² = 75. Find the positive solution.",
      "3x^2 = 75",
      "5",
      "Divide both sides by 3: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.",
      ["5"]
    ),
    answer(
      "y7-equ-qdr-g4",
      "Solve 5x² = 80. Find the positive solution.",
      "5x^2 = 80",
      "4",
      "Divide both sides by 5: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4.",
      ["4"]
    ),
  ],
  independentPractice: [
    answer(
      "y7-equ-qdr-i1",
      "Solve x² = 64. Find the positive solution.",
      "x^2 = 64",
      "8",
      "Take the square root: x = 8 or x = −8. The positive solution is x = 8.",
      ["8"]
    ),
    answer(
      "y7-equ-qdr-i2",
      "Solve 4x² = 100. Find the positive solution.",
      "4x^2 = 100",
      "5",
      "Divide by 4: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.",
      ["5"]
    ),
    answer(
      "y7-equ-qdr-i3",
      "Solve 2x² = 72. Find the positive solution.",
      "2x^2 = 72",
      "6",
      "Divide by 2: x² = 36. Take the square root: x = 6 or x = −6. The positive solution is x = 6.",
      ["6"]
    ),
    answer(
      "y7-equ-qdr-i4",
      "Solve x² = 121. Find the negative solution.",
      "x^2 = 121",
      "-11",
      "Take the square root: x = 11 or x = −11. The negative solution is x = −11.",
      ["−11"]
    ),
    choice(
      "y7-equ-qdr-i5",
      "Which equation has no real solution?",
      "D",
      ["$x^2 = 1$", "$x^2 = 0$", "$2x^2 = 8$", "$x^2 = -9$"],
      "x² = −9 has no real solution because squaring any real number cannot give a negative result. All other options have non-negative right-hand sides."
    ),
  ],
  commonMistakes: [
    { mistake: "Forgetting the negative solution: solving x² = 25 and giving only x = 5.", fix: "Taking the square root of a positive number always gives two solutions: x = 5 and x = −5. Check which solutions the question asks for." },
    { mistake: "Trying to take the square root before isolating x²: for 2x² = 50, writing x = ±√50 ÷ 2.", fix: "Divide by the coefficient first: x² = 25. Then take the square root to get x = ±5." },
    { mistake: "Saying x² = −4 has solution x = −2 (thinking the negative sign cancels).", fix: "Squaring always gives a non-negative result. x² = −4 has no real solution." },
    { mistake: "Writing x = ±√25 = ±(±5), creating four 'answers'.", fix: "√25 = 5 (the principal positive root). Then the two solutions are x = 5 and x = −5." },
  ],
  masteryQuiz: [
    answer(
      "y7-equ-qdr-m1",
      "Solve x² = 81. Find the positive solution.",
      "x^2 = 81",
      "9",
      "Take the square root: x = 9 or x = −9. The positive solution is x = 9. Note: x = −9 is also a valid solution."
    ),
    answer(
      "y7-equ-qdr-m2",
      "Solve 2x² = 32. Find the positive solution.",
      "2x^2 = 32",
      "4",
      "Divide by 2: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4."
    ),
    choice(
      "y7-equ-qdr-m3",
      "What are the solutions of x² = 100?",
      "C",
      ["$x = 10$ only", "$x = 50$ only", "$x = 10$ or $x = -10$", "$x = 10$ or $x = 0$"],
      "Both 10² = 100 and (−10)² = 100, so x = 10 or x = −10 are both solutions."
    ),
    answer(
      "y7-equ-qdr-m4",
      "Solve 3x² = 48. Find the positive solution.",
      "3x^2 = 48",
      "4",
      "Divide by 3: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4."
    ),
    answer(
      "y7-equ-qdr-m5",
      "Solve x² = 144. Find the negative solution.",
      "x^2 = 144",
      "-12",
      "Take the square root: x = 12 or x = −12. The negative solution is x = −12.",
      ["−12"]
    ),
    answer(
      "y7-equ-qdr-m6",
      "Solve 5x² = 125. Find the positive solution.",
      "5x^2 = 125",
      "5",
      "Divide by 5: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5."
    ),
    choice(
      "y7-equ-qdr-m7",
      "How many real solutions does x² = −16 have?",
      "A",
      ["None", "One", "Two", "Four"],
      "No real number squared equals a negative number. x² = −16 has no real solution."
    ),
    answer(
      "y7-equ-qdr-m8",
      "Solve 4x² = 196. Find the positive solution.",
      "4x^2 = 196",
      "7",
      "Divide by 4: x² = 49. Take the square root: x = 7 or x = −7. The positive solution is x = 7."
    ),
    answer(
      "y7-equ-qdr-m9",
      "Solve 6x² = 54. Find the positive solution.",
      "6x^2 = 54",
      "3",
      "Divide by 6: x² = 9. Take the square root: x = 3 or x = −3. The positive solution is x = 3."
    ),
    choice(
      "y7-equ-qdr-m10",
      "A student solves 2x² = 18 and gets x = 3 only. What is missing from their answer?",
      "B",
      ["They should also give x = 0.", "They should also give x = −3.", "They should also give x = 9.", "Their answer is complete."],
      "Dividing by 2 gives x² = 9. Taking the square root gives x = 3 or x = −3. Both solutions must be stated — the student omitted x = −3.",
      "2x^2 = 18"
    ),
  ],
  masteryQuizPool: [
    poolAnswer("y7-equ-qdr-p1", "Solve x² = 9. Find the positive solution.", "x^2 = 9", "3", "Take the square root: x = 3 or x = −3. The positive solution is x = 3.", 1),
    poolAnswer("y7-equ-qdr-p2", "Solve x² = 16. Find the positive solution.", "x^2 = 16", "4", "Take the square root: x = 4 or x = −4. The positive solution is x = 4.", 1),
    poolAnswer("y7-equ-qdr-p3", "Solve x² = 4. Find the positive solution.", "x^2 = 4", "2", "Take the square root: x = 2 or x = −2. The positive solution is x = 2.", 1),
    poolAnswer("y7-equ-qdr-p4", "Solve x² = 100. Find the positive solution.", "x^2 = 100", "10", "Take the square root: x = 10 or x = −10. The positive solution is x = 10.", 1),
    poolAnswer("y7-equ-qdr-p5", "Solve 2x² = 8. Find the positive solution.", "2x^2 = 8", "2", "Divide by 2: x² = 4. Take the square root: x = 2 or x = −2. The positive solution is x = 2.", 2),
    poolAnswer("y7-equ-qdr-p6", "Solve 3x² = 27. Find the positive solution.", "3x^2 = 27", "3", "Divide by 3: x² = 9. Take the square root: x = 3 or x = −3. The positive solution is x = 3.", 2),
    poolAnswer("y7-equ-qdr-p7", "Solve x² = 169. Find the negative solution.", "x^2 = 169", "-13", "Take the square root: x = 13 or x = −13. The negative solution is x = −13.", 2, ["−13"]),
    poolAnswer("y7-equ-qdr-p8", "Solve 4x² = 64. Find the positive solution.", "4x^2 = 64", "4", "Divide by 4: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4.", 2),
    poolChoice("y7-equ-qdr-p9", "How many real solutions does x² = 49 have?", "C", ["None", "One (x = 7 only)", "Two (x = 7 and x = −7)", "Three"], "Taking the square root of a positive number gives two solutions: x = 7 and x = −7.", 2, "x^2 = 49"),
    poolAnswer("y7-equ-qdr-p10", "Solve 5x² = 45. Find the positive solution.", "5x^2 = 45", "3", "Divide by 5: x² = 9. Take the square root: x = 3 or x = −3. The positive solution is x = 3.", 3),
    poolAnswer("y7-equ-qdr-p11", "Solve 2x² = 98. Find the positive solution.", "2x^2 = 98", "7", "Divide by 2: x² = 49. Take the square root: x = 7 or x = −7. The positive solution is x = 7.", 3),
    poolAnswer("y7-equ-qdr-p12", "Solve x² = 225. Find the positive solution.", "x^2 = 225", "15", "Take the square root: x = 15 or x = −15. The positive solution is x = 15.", 3),
    poolAnswer("y7-equ-qdr-p13", "Solve 3x² = 108. Find the positive solution.", "3x^2 = 108", "6", "Divide by 3: x² = 36. Take the square root: x = 6 or x = −6. The positive solution is x = 6.", 3),
    poolChoice("y7-equ-qdr-p14", "Which equation has no real solution?", "D", ["$x^2 = 4$", "$2x^2 = 0$", "$x^2 = 36$", "$x^2 = -25$"], "x² = −25 has no real solution because squaring any real number cannot give a negative result.", 3, "\\text{Select the equation with no real solution.}"),
    poolAnswer("y7-equ-qdr-p15", "Solve 4x² = 144. Find the positive solution.", "4x^2 = 144", "6", "Divide by 4: x² = 36. Take the square root: x = 6 or x = −6. The positive solution is x = 6.", 3),
    poolAnswer("y7-equ-qdr-p16", "Solve x² = 196. Find the negative solution.", "x^2 = 196", "-14", "Take the square root: x = 14 or x = −14. The negative solution is x = −14.", 4, ["−14"]),
    poolAnswer("y7-equ-qdr-p17", "Solve 6x² = 96. Find the positive solution.", "6x^2 = 96", "4", "Divide by 6: x² = 16. Take the square root: x = 4 or x = −4. The positive solution is x = 4.", 4),
    poolAnswer("y7-equ-qdr-p18", "Solve 7x² = 175. Find the positive solution.", "7x^2 = 175", "5", "Divide by 7: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.", 4),
    poolChoice("y7-equ-qdr-p19", "A student solves 3x² = 75 and gives only x = 5. What is missing?", "B", ["They should also give x = 0.", "They should also give x = −5.", "They should also give x = 25.", "Their answer is complete."], "Dividing by 3 gives x² = 25, so x = 5 or x = −5. The student omitted x = −5.", 4, "3x^2 = 75"),
    poolAnswer("y7-equ-qdr-p20", "Solve 2x² = 200. Find the positive solution.", "2x^2 = 200", "10", "Divide by 2: x² = 100. Take the square root: x = 10 or x = −10. The positive solution is x = 10.", 4),
    poolAnswer("y7-equ-qdr-p21", "A square has area 81 cm². Its side length s satisfies s² = 81. Find the side length s in cm.", "s^2 = 81", "9", "Take the square root: s = 9 (a side length must be positive). Check: 9² = 81.", 4),
    poolChoice("y7-equ-qdr-p22", "How many real solutions does x² = −1 have?", "A", ["None", "One", "Two", "Infinitely many"], "No real number squared equals a negative number, so x² = −1 has no real solution.", 4, "x^2 = -1"),
    poolAnswer("y7-equ-qdr-p23", "Solve 5x² = 320. Find the positive solution.", "5x^2 = 320", "8", "Divide by 5: x² = 64. Take the square root: x = 8 or x = −8. The positive solution is x = 8.", 5),
    poolAnswer("y7-equ-qdr-p24", "Solve 9x² = 225. Find the positive solution.", "9x^2 = 225", "5", "Divide by 9: x² = 25. Take the square root: x = 5 or x = −5. The positive solution is x = 5.", 5),
    poolAnswer("y7-equ-qdr-p25", "A square garden has area 144 m². Its side length s satisfies s² = 144. Find the side length s in m.", "s^2 = 144", "12", "Take the square root: s = 12 (a length must be positive). Check: 12² = 144.", 5),
    poolChoice("y7-equ-qdr-p26", "What are the solutions of x² = 64?", "C", ["$x = 8$ only", "$x = 32$ only", "$x = 8$ or $x = -8$", "$x = 8$ or $x = 0$"], "Both 8² = 64 and (−8)² = 64, so x = 8 or x = −8 are both solutions.", 5, "x^2 = 64"),
    poolAnswer("y7-equ-qdr-p27", "Solve 8x² = 72. Find the positive solution.", "8x^2 = 72", "3", "Divide by 8: x² = 9. Take the square root: x = 3 or x = −3. The positive solution is x = 3.", 3),
    poolAnswer("y7-equ-qdr-p28", "Solve x² = 256. Find the positive solution.", "x^2 = 256", "16", "Take the square root: x = 16 or x = −16. The positive solution is x = 16.", 3),
  ],
  multiPartPractice: [
    {
      id: "y7-equ-qdr-mp1",
      prompt:
        "A square tile and a square paving slab are being compared. All side lengths and areas are positive. Use equations of the form ax² = c to answer each part.",
      latex: "\\text{Solve each equation; give positive lengths where a length is asked for.}",
      answer: "9",
      hint: "Isolate x² by dividing by the coefficient, then take the square root. For a physical length, give the positive root only.",
      explanation:
        "Part (a): a square tile of area 49 cm² has s² = 49, so s = 7 cm. Part (b): 2x² = 162 gives x² = 81, so the positive solution is x = 9. Part (c): x² = −5 has no real solution because squaring never gives a negative.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "A square tile has area 49 cm². Its side length s satisfies s² = 49. Find s in cm.",
          latex: "s^2 = 49",
          marks: 1,
          answer: "7",
          acceptedAnswers: ["7.0", "7 cm"],
          hint: "Take the square root; a length is positive.",
          explanation: "s = √49 = 7 cm (the positive root, since a side length is positive).",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Solve 2x² = 162 and give the positive solution.",
          latex: "2x^2 = 162",
          marks: 2,
          answer: "9",
          acceptedAnswers: ["9.0"],
          hint: "Divide by 2 first, then take the square root.",
          explanation: "Divide by 2: x² = 81. Take the square root: x = 9 or x = −9. The positive solution is x = 9.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many real solutions does x² = −5 have? Give the number.",
          latex: "x^2 = -5",
          marks: 1,
          answer: "0",
          acceptedAnswers: ["none", "zero", "no real solution"],
          hint: "Can squaring a real number ever give a negative result?",
          explanation: "Squaring any real number gives zero or a positive result, so x² = −5 has 0 real solutions.",
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Lessons map and export
// ─────────────────────────────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "one-step-equations": oneStepEquations,
  "two-step-equations": twoStepEquations,
  "equations-worded-problems": equationsWordedProblems,
  "quadratic-equations-ax2-equals-c": quadraticEquationsAxSquaredEqualsC,
};

export function year7EquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-7-mathematics" || unit.slug !== "equations") {
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
