import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

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

// ── Helper builders ──────────────────────────────────────────────────────────

// Pool questions carry a difficulty tag (1 = easiest … 5 = hardest) used by the
// mastery-quiz selector. The `answer`/`choice` helpers do not set it, so we
// attach it with this thin wrapper.
function withDifficulty(q: PracticeQuestion, difficulty: number): PracticeQuestion {
  return { ...q, difficulty };
}

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint,
    explanation,
  };
}

// ── Lesson 1: Introduction to Ratios ─────────────────────────────────────────

const introductionToRatios: LessonContent = {
  description:
    "Write ratios using colon notation, simplify ratios to lowest terms using the HCF, form equivalent ratios, and compare ratios by converting to a common form.",
  learningIntention:
    "Understand ratio notation and simplify, form, and compare ratios in a variety of contexts.",
  successCriteria: [
    "Write a ratio in the form $a:b$ from a word description or diagram.",
    "Simplify a ratio to its lowest terms by dividing both parts by their HCF.",
    "Generate equivalent ratios by multiplying or dividing both parts by the same number.",
    "Compare two or more ratios by converting them to equivalent ratios with a common second term.",
  ],
  teaching: {
    paragraphs: [
      "A ratio is a way of comparing quantities of the same kind — how much of one there is next to another. If you mix paint using 2 scoops of red for every 5 scoops of white, the ratio of red to white is 'two to five'. It does not tell you how many scoops in total; it tells you the recipe, the proportion that stays the same no matter how big the batch is.",
      "Picture that paint mix as groups. One batch is 2 red and 5 white. If you want more paint and keep the colour exactly the same, you make the same groups again: 4 red and 10 white, or 6 red and 15 white. Each time, both numbers grow together. We write this comparison with a colon: $2:5$ (read 'two to five').",
      "In general a ratio is written $a:b$, where $a$ is how much of the first quantity and $b$ is how much of the second. The order matters: 'red to white' is $2:5$, but 'white to red' is $5:2$. The colon is just shorthand for 'compared with'.",
      "Here is why making more paint scales both parts by the same number. The whole point of a ratio is that the relationship between the two amounts stays fixed. If you doubled only the red, the mix would turn redder — a different colour, a different ratio. To keep the comparison unchanged you must multiply (or divide) every part by the same number $k$. That is why $2:5 = 4:10 = 6:15$: each is the original recipe scaled by $2$, then $3$. Ratios built this way are called equivalent ratios.",
      "Simplifying runs the same idea backwards. To get the cleanest form of a ratio, divide every part by the largest number that goes into all of them — the highest common factor (HCF). For $12:8$ the HCF is $4$, so $12 \\div 4 : 8 \\div 4 = 3:2$. A ratio is in simplest form when the only number dividing both parts is $1$. We divide both parts (not just one) for exactly the reason above: scaling only one part would change the comparison.",
      "Be careful with the most common trap: a ratio is not the same as a fraction of the whole. In a $2:3$ mix there are $2 + 3 = 5$ parts altogether, so the fraction that is the first ingredient is $\\frac{2}{5}$, not $\\frac{2}{3}$. The number after the colon is the *other* part, not the total — always add the parts to find the total before writing a fraction of the whole.",
      "To compare two ratios, rewrite them so they share the same second part — exactly like finding a common denominator for fractions. Once the second parts match, a bigger first part means a bigger ratio. For $3:4$ and $5:8$, scale the first to $6:8$; now $6 > 5$, so $3:4$ is the larger ratio. In exams, ratios appear as paint and concrete mixes, map scales, and 'sharing in a ratio' problems — the same scale-both-parts idea drives all of them.",
    ],
    latexBlocks: [
      "a:b \\quad\\text{means } a \\text{ of the first for every } b \\text{ of the second}",
      "a:b = (a \\times k):(b \\times k) \\quad\\text{for any } k \\neq 0 \\quad(\\text{equivalent ratios})",
      "\\text{simplest form: divide every part by } \\gcd(a,b)",
      "\\text{fraction of the whole that is the first part} = \\frac{a}{a+b}",
    ],
  },
  workedExamples: [
    {
      title: "Simplify a ratio to lowest terms",
      questionLatex: "\\text{Simplify }24:18.",
      steps: [
        { explanation: "Find the largest number that divides both 24 and 18 — the HCF.", latex: "\\gcd(24, 18) = 6" },
        { explanation: "Divide the first part by the HCF.", latex: "24 \\div 6 = 4" },
        { explanation: "Divide the second part by the same HCF, so the comparison is unchanged.", latex: "18 \\div 6 = 3" },
        { explanation: "Write the simplified ratio; 4 and 3 share no factor but 1, so it is in lowest terms.", latex: "24:18 = 4:3" },
      ],
      finalAnswerLatex: "24:18 = 4:3",
    } as WorkedExample,
    {
      title: "Write a ratio from a word description",
      questionLatex: "\\text{A class has 14 boys and 11 girls. Write the ratio of boys to girls in simplest form.}",
      steps: [
        { explanation: "Write the quantities in the stated order — 'boys to girls' puts boys first.", latex: "\\text{boys}:\\text{girls} = 14:11" },
        { explanation: "Look for a common factor. 11 is prime and does not divide 14.", latex: "\\gcd(14, 11) = 1" },
        { explanation: "Since the only common factor is 1, the ratio is already in simplest form.", latex: "14:11" },
      ],
      finalAnswerLatex: "\\text{boys}:\\text{girls} = 14:11",
    } as WorkedExample,
    {
      title: "Build an equivalent ratio",
      questionLatex: "\\text{Write an equivalent ratio to }3:5\\text{ with a second part of }20.",
      steps: [
        { explanation: "Decide what the second part must be multiplied by to reach 20.", latex: "20 \\div 5 = 4" },
        { explanation: "Multiply the first part by the same factor, so the comparison stays the same.", latex: "3 \\times 4 = 12" },
        { explanation: "Multiply the second part by that factor to confirm it lands on 20.", latex: "5 \\times 4 = 20" },
        { explanation: "Write the equivalent ratio.", latex: "3:5 = 12:20" },
      ],
      finalAnswerLatex: "3:5 = 12:20",
    } as WorkedExample,
    {
      title: "Compare two ratios (harder)",
      questionLatex: "\\text{Which is larger: }3:4 \\text{ or }5:8?",
      steps: [
        { explanation: "Make the second parts match. The smallest number both 4 and 8 divide into is 8.", latex: "\\text{LCM}(4, 8) = 8" },
        { explanation: "Scale the first ratio so its second part becomes 8 (multiply both parts by 2).", latex: "3:4 = 6:8" },
        { explanation: "The second ratio already has 8 as its second part, so leave it.", latex: "5:8 = 5:8" },
        { explanation: "With equal second parts, compare the first parts directly.", latex: "6 > 5 \\;\\Rightarrow\\; 6:8 > 5:8" },
      ],
      finalAnswerLatex: "3:4 \\text{ is the larger ratio}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-rtr-int-g1",
      "Which of the following is the simplified form of $20:15$?",
      "B",
      ["$10:7$", "$4:3$", "$5:3$", "$2:1$"],
      "The HCF of 20 and 15 is 5. Dividing both parts: $20 \\div 5 : 15 \\div 5 = 4:3$.",
      "Find the HCF of 20 and 15, then divide both parts by it.",
    ),
    answer(
      "y8-rtr-int-g2",
      "Simplify the ratio $36:24$.",
      "36:24 = \\;?",
      "3:2",
      "The HCF of 36 and 24 is 12. So $36 \\div 12 : 24 \\div 12 = 3:2$.",
      "Find the HCF of 36 and 24.",
    ),
    answer(
      "y8-rtr-int-g3",
      "A fruit bowl has 6 apples and 9 oranges. Write the ratio of apples to oranges in simplest form.",
      "\\text{apples : oranges} = \\;?",
      "2:3",
      "The ratio is $6:9$. The HCF is 3, so $6 \\div 3 : 9 \\div 3 = 2:3$.",
      "Write the ratio in the given order, then simplify.",
    ),
    answer(
      "y8-rtr-int-g4",
      "Write an equivalent ratio to $3:5$ with a second part of $20$.",
      "3:5 = \\;?:20",
      "12:20",
      "To get from 5 to 20, multiply by 4. Multiply the first part by 4 as well: $3 \\times 4 = 12$. So the equivalent ratio is $12:20$.",
      "Decide what you multiply 5 by to reach 20, then apply the same factor to the first part.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-rtr-int-i1",
      "Simplify $45:30$.",
      "45:30 = \\;?",
      "3:2",
      "The HCF of 45 and 30 is 15. So $45 \\div 15 : 30 \\div 15 = 3:2$.",
      "Find the HCF of 45 and 30.",
    ),
    answer(
      "y8-rtr-int-i2",
      "A recipe uses 200 g of sugar and 500 g of flour. Write the ratio of sugar to flour in simplest form.",
      "\\text{sugar : flour} = \\;?",
      "2:5",
      "The ratio is $200:500$. The HCF is 100, so $200 \\div 100 : 500 \\div 100 = 2:5$.",
      "Both quantities share a common factor — divide out that factor.",
    ),
    answer(
      "y8-rtr-int-i3",
      "Write an equivalent ratio to $5:7$ with a first part of $15$.",
      "5:7 = 15:\\;?",
      "15:21",
      "To get from 5 to 15, multiply by 3. Multiply the second part by 3 as well: $7 \\times 3 = 21$. So the equivalent ratio is $15:21$.",
      "Decide what you multiply 5 by to reach 15, then apply the same factor to the second part.",
    ),
    answer(
      "y8-rtr-int-i4",
      "Simplify the three-part ratio $12:8:20$.",
      "12:8:20 = \\;?",
      "3:2:5",
      "The HCF of 12, 8 and 20 is 4. So $12 \\div 4 : 8 \\div 4 : 20 \\div 4 = 3:2:5$.",
      "Find the HCF of all three numbers, then divide each part by it.",
    ),
    choice(
      "y8-rtr-int-i5",
      "Which pair of ratios are equivalent?",
      "C",
      ["$2:3$ and $4:9$", "$5:4$ and $10:9$", "$3:7$ and $9:21$", "$2:5$ and $6:20$"],
      "$3:7$ scaled by 3 gives $9:21$. So $3:7$ and $9:21$ are equivalent.",
      "Test each pair by checking whether one ratio can be obtained from the other by multiplying both parts by the same number.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the ratio $a:b$ with the fraction $\\frac{a}{b}$. For a mix of $2:3$, students say the red fraction is $\\frac{2}{3}$.",
      fix: "There are $2 + 3 = 5$ parts in total. The fraction that is red is $\\frac{2}{5}$, not $\\frac{2}{3}$.",
    },
    {
      mistake: "Only dividing one part when simplifying: writing $12:8$ as $3:8$ (dividing only 12 by 4).",
      fix: "Divide every part by the HCF. $12:8 \\div 4 = 3:2$.",
    },
    {
      mistake: "Writing ratios in the wrong order — reversing the quantities described.",
      fix: "Follow the stated order exactly. 'Boys to girls' means boys first: $14:11$, not $11:14$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-rtr-int-m1",
      "Simplify $28:21$.",
      "28:21 = \\;?",
      "4:3",
      "The HCF of 28 and 21 is 7. So $28 \\div 7 : 21 \\div 7 = 4:3$.",
      "Find the HCF of 28 and 21.",
    ),
    answer(
      "y8-rtr-int-m2",
      "A bag holds 18 red marbles and 12 blue marbles. Write the ratio of red to blue in simplest form.",
      "\\text{red : blue} = \\;?",
      "3:2",
      "The ratio is $18:12$. The HCF is 6, so $18 \\div 6 : 12 \\div 6 = 3:2$.",
      "Write the ratio in the given order, then simplify by the HCF.",
    ),
    choice(
      "y8-rtr-int-m3",
      "Which ratio is equivalent to $4:6$?",
      "A",
      ["$6:9$", "$8:14$", "$2:4$", "$12:16$"],
      "$4:6$ simplifies to $2:3$. Scaling $2:3$ by 3 gives $6:9$, which is equivalent.",
      "Simplify $4:6$ first, then check which option matches when scaled.",
    ),
    answer(
      "y8-rtr-int-m4",
      "Write an equivalent ratio to $7:4$ with a second part of $12$.",
      "7:4 = \\;?:12",
      "21:12",
      "To get from 4 to 12, multiply by 3. Multiply the first part by 3: $7 \\times 3 = 21$. The ratio is $21:12$.",
      "Find the scale factor from 4 to 12, then apply it to 7.",
    ),
    answer(
      "y8-rtr-int-m5",
      "Simplify the ratio $60:45:15$.",
      "60:45:15 = \\;?",
      "4:3:1",
      "The HCF of 60, 45 and 15 is 15. So $60 \\div 15 : 45 \\div 15 : 15 \\div 15 = 4:3:1$.",
      "Find the HCF of all three parts.",
    ),
    answer(
      "y8-rtr-int-m6",
      "A smoothie uses 3 parts mango, 2 parts banana and 1 part yoghurt. Write this as a ratio in simplest form.",
      "\\text{mango : banana : yoghurt} = \\;?",
      "3:2:1",
      "The ratio $3:2:1$ already has no common factor other than 1, so it is in simplest form.",
      "Check whether all three parts share a common factor greater than 1.",
    ),
    choice(
      "y8-rtr-int-m7",
      "Which ratio is greater in its first part: $5:8$ or $7:12$?",
      "B",
      ["$7:12$", "$5:8$", "They are equal", "Cannot be determined"],
      "Convert to the same second part (LCM of 8 and 12 is 24): $5:8 = 15:24$ and $7:12 = 14:24$. Since $15 > 14$, the ratio $5:8$ is greater.",
      "Convert both ratios to have the same second part, then compare the first parts.",
    ),
    answer(
      "y8-rtr-int-m8",
      "A map scale shows 1 cm represents 5 km. Write this as a ratio $1:n$ where $n$ is in centimetres.",
      "1 \\text{ cm} : 5 \\text{ km} = 1:\\;?",
      "1:500000",
      "$5 \\text{ km} = 500\\,000 \\text{ cm}$. So the scale ratio is $1:500\\,000$.",
      "Convert 5 km to centimetres first: $1 \\text{ km} = 100\\,000 \\text{ cm}$.",
    ),
    answer(
      "y8-rtr-int-m9",
      "The ratio of adults to children at an event is $3:5$. There are 120 adults. How many children are there?",
      "\\text{If adults} = 120 \\text{ and ratio is } 3:5, \\text{ children} = \\;?",
      "200",
      "The scale factor is $120 \\div 3 = 40$. Children $= 5 \\times 40 = 200$.",
      "Find how many times 3 goes into 120, then multiply that by 5.",
    ),
    answer(
      "y8-rtr-int-m10",
      "Concrete is made from cement, sand and gravel in the ratio $1:2:4$. If a builder uses 15 kg of cement, how many kilograms of gravel are needed?",
      "\\text{cement : gravel} = 1:4, \\text{ cement} = 15 \\text{ kg, gravel} = \\;?",
      "60",
      "The scale factor is $15 \\div 1 = 15$. Gravel $= 4 \\times 15 = 60$ kg.",
      "The ratio of cement to gravel is $1:4$. Find the scale factor from cement to 15 kg.",
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y8-rtr-int-p01", "Simplify $10:5$.", "10:5 = \\;?", "2:1", "The HCF of 10 and 5 is 5, so $10 \\div 5 : 5 \\div 5 = 2:1$.", "Divide both parts by the HCF.", ["2 : 1"]), 1),
    withDifficulty(answer("y8-rtr-int-p02", "Simplify $6:9$.", "6:9 = \\;?", "2:3", "The HCF of 6 and 9 is 3, so $6 \\div 3 : 9 \\div 3 = 2:3$.", "Divide both parts by 3.", ["2 : 3"]), 1),
    withDifficulty(choice("y8-rtr-int-p03", "What is the simplest form of $8:4$?", "C", ["$4:2$", "$8:4$", "$2:1$", "$1:2$"], "The HCF of 8 and 4 is 4, giving $2:1$.", "Divide both parts by their HCF."), 1),
    withDifficulty(answer("y8-rtr-int-p04", "A box has 4 red and 6 blue pens. Write the ratio of red to blue in simplest form.", "\\text{red : blue} = \\;?", "2:3", "$4:6$ has HCF 2, so $2:3$.", "Write in order, then simplify.", ["2 : 3"]), 1),
    withDifficulty(answer("y8-rtr-int-p05", "Write an equivalent ratio to $2:3$ with a first part of $4$.", "2:3 = 4:\\;?", "4:6", "Multiply both parts by 2: $4:6$.", "Find the factor that takes 2 to 4.", ["4 : 6"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y8-rtr-int-p06", "Simplify $14:35$.", "14:35 = \\;?", "2:5", "The HCF of 14 and 35 is 7, so $2:5$.", "Find the HCF of 14 and 35.", ["2 : 5"]), 2),
    withDifficulty(answer("y8-rtr-int-p07", "Simplify $40:24$.", "40:24 = \\;?", "5:3", "The HCF of 40 and 24 is 8, so $5:3$.", "Find the HCF of 40 and 24.", ["5 : 3"]), 2),
    withDifficulty(answer("y8-rtr-int-p08", "Write an equivalent ratio to $4:9$ with a second part of $36$.", "4:9 = \\;?:36", "16:36", "Multiply both parts by 4: $16:36$.", "Find the factor that takes 9 to 36.", ["16 : 36"]), 2),
    withDifficulty(choice("y8-rtr-int-p09", "Which ratio is equivalent to $3:4$?", "B", ["$6:9$", "$9:12$", "$5:6$", "$8:9$"], "$3:4$ scaled by 3 gives $9:12$.", "Scale $3:4$ by a whole number and see which option matches."), 2),
    withDifficulty(answer("y8-rtr-int-p10", "A team has 22 players and 8 reserves. Write the ratio of players to reserves in simplest form.", "\\text{players : reserves} = \\;?", "11:4", "$22:8$ has HCF 2, so $11:4$.", "Divide both parts by 2.", ["11 : 4"]), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y8-rtr-int-p11", "Simplify the three-part ratio $18:27:9$.", "18:27:9 = \\;?", "2:3:1", "The HCF of 18, 27 and 9 is 9, so $2:3:1$.", "Find the HCF of all three numbers.", ["2 : 3 : 1"]), 3),
    withDifficulty(answer("y8-rtr-int-p12", "Simplify $48:36$.", "48:36 = \\;?", "4:3", "The HCF of 48 and 36 is 12, so $4:3$.", "Find the HCF of 48 and 36.", ["4 : 3"]), 3),
    withDifficulty(answer("y8-rtr-int-p13", "Write an equivalent ratio to $5:8$ with a first part of $35$.", "5:8 = 35:\\;?", "35:56", "Multiply both parts by 7: $35:56$.", "Find the factor that takes 5 to 35.", ["35 : 56"]), 3),
    withDifficulty(choice("y8-rtr-int-p14", "Which pair of ratios are equivalent?", "D", ["$2:5$ and $4:9$", "$3:8$ and $9:25$", "$4:7$ and $8:13$", "$5:6$ and $15:18$"], "$5:6$ scaled by 3 gives $15:18$.", "Check whether one ratio is a whole-number multiple of the other."), 3),
    withDifficulty(answer("y8-rtr-int-p15", "A paint mix uses 9 L white and 12 L blue. Write white to blue in simplest form.", "\\text{white : blue} = \\;?", "3:4", "$9:12$ has HCF 3, so $3:4$.", "Divide both parts by 3.", ["3 : 4"]), 3),
    withDifficulty(answer("y8-rtr-int-p16", "Simplify $25:100$.", "25:100 = \\;?", "1:4", "The HCF of 25 and 100 is 25, so $1:4$.", "Find the HCF of 25 and 100.", ["1 : 4"]), 3),
    withDifficulty(answer("y8-rtr-int-p17", "Simplify the three-part ratio $30:20:50$.", "30:20:50 = \\;?", "3:2:5", "The HCF of 30, 20 and 50 is 10, so $3:2:5$.", "Find the HCF of all three.", ["3 : 2 : 5"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(choice("y8-rtr-int-p18", "Which ratio is greater in its first part: $4:5$ or $7:9$?", "A", ["$4:5$", "$7:9$", "They are equal", "Cannot be determined"], "Common second part (LCM of 5 and 9 = 45): $4:5 = 36:45$ and $7:9 = 35:45$. Since $36 > 35$, $4:5$ is greater.", "Convert both ratios to a common second part, then compare first parts."), 4),
    withDifficulty(answer("y8-rtr-int-p19", "The ratio of cats to dogs at a shelter is $4:7$. There are 28 cats. How many dogs are there?", "\\text{If cats} = 28, \\text{ dogs} = \\;?", "49", "Scale factor $= 28 \\div 4 = 7$. Dogs $= 7 \\times 7 = 49$.", "Find how many times 4 goes into 28.", ["49 dogs"]), 4),
    withDifficulty(answer("y8-rtr-int-p20", "Simplify $0.6:0.9$ to a whole-number ratio in simplest form.", "0.6:0.9 = \\;?", "2:3", "Multiply both parts by 10: $6:9$, then divide by HCF 3: $2:3$.", "Multiply both parts by 10 to clear the decimals first.", ["2 : 3"]), 4),
    withDifficulty(answer("y8-rtr-int-p21", "A map scale shows 1 cm represents 8 km. Write this as a ratio $1:n$ in centimetres.", "1 \\text{ cm} : 8 \\text{ km} = 1:\\;?", "1:800000", "$8 \\text{ km} = 800\\,000 \\text{ cm}$, so $1:800\\,000$.", "Convert 8 km to cm: $1 \\text{ km} = 100\\,000 \\text{ cm}$.", ["1:800 000", "800000"]), 4),
    withDifficulty(answer("y8-rtr-int-p22", "Concrete is mixed cement : sand : gravel in $2:3:5$. A builder uses 14 kg of cement. How many kilograms of gravel are needed?", "\\text{cement : gravel} = 2:5, \\text{ gravel} = \\;?", "35", "Scale factor $= 14 \\div 2 = 7$. Gravel $= 5 \\times 7 = 35$ kg.", "Find the scale factor from the cement part.", ["35 kg"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y8-rtr-int-p23", "Simplify the ratio $\\tfrac{1}{2}:\\tfrac{3}{4}$ to a whole-number ratio in simplest form.", "\\tfrac{1}{2}:\\tfrac{3}{4} = \\;?", "2:3", "Multiply both parts by 4: $2:3$.", "Multiply both parts by the LCD of the fractions (4).", ["2 : 3"]), 5),
    withDifficulty(answer("y8-rtr-int-p24", "The ratio of red to blue to green counters is $2:3:5$ and there are 60 counters in total. How many green counters are there?", "\\text{green} = \\;?", "30", "Total parts $= 2 + 3 + 5 = 10$. One part $= 60 \\div 10 = 6$. Green $= 5 \\times 6 = 30$.", "Add the parts to find the total, then find one part.", ["30 green"]), 5),
    withDifficulty(choice("y8-rtr-int-p25", "A recipe ratio of flour to sugar is $5:2$. To keep the same ratio with 15 cups of flour, how much sugar is needed?", "C", ["3 cups", "5 cups", "6 cups", "7.5 cups"], "Scale factor $= 15 \\div 5 = 3$. Sugar $= 2 \\times 3 = 6$ cups.", "Find the factor that scales 5 up to 15, then apply it to the sugar part."), 5),
    withDifficulty(answer("y8-rtr-int-p26", "Two ratios $a:12$ and $5:8$ are equivalent. Find $a$.", "a:12 = 5:8, \\quad a = \\;?", "7.5", "From 8 to 12 the factor is $12 \\div 8 = 1.5$, so $a = 5 \\times 1.5 = 7.5$.", "Find the factor that scales 8 up to 12.", ["15/2"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y8-rtr-int-mp1",
      prompt: "A school orchestra of 60 students is made up of strings, woodwind and brass players in the ratio $7:3:2$.",
      latex: "\\text{strings : woodwind : brass} = 7:3:2",
      answer: "60",
      hint: "Find the total number of parts first, then the value of one part.",
      explanation: "Total parts $= 7 + 3 + 2 = 12$. One part $= 60 \\div 12 = 5$ students. Strings $= 35$, woodwind $= 15$, brass $= 10$. Strings to brass simplifies to $7:2$.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the total number of parts in the ratio?",
          latex: "7 + 3 + 2",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12 parts"],
          hint: "Add the three ratio numbers.",
          explanation: "$7 + 3 + 2 = 12$ parts.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many students play a string instrument?",
          latex: "7 \\times (60 \\div 12)",
          marks: 1,
          answer: "35",
          acceptedAnswers: ["35 students"],
          hint: "One part = 60 ÷ 12. Multiply by 7.",
          explanation: "One part $= 60 \\div 12 = 5$. Strings $= 7 \\times 5 = 35$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many students play brass?",
          latex: "2 \\times (60 \\div 12)",
          marks: 1,
          answer: "10",
          acceptedAnswers: ["10 students"],
          hint: "Multiply one part by the brass ratio number.",
          explanation: "Brass $= 2 \\times 5 = 10$ students.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Write the ratio of string players to brass players in simplest form (as a:b).",
          latex: "35:10 = \\;?",
          marks: 1,
          answer: "7:2",
          acceptedAnswers: ["7 : 2"],
          hint: "Divide both parts by their HCF.",
          explanation: "$35:10$ has HCF 5, so $7:2$.",
        },
      ],
    },
  ],
};

// ── Lesson 2: Dividing Quantities in Ratio ────────────────────────────────────

const dividingQuantitiesInRatio: LessonContent = {
  description:
    "Divide a quantity into two or three parts in a given ratio, and solve word problems involving sharing money, mixing ingredients and allocating time.",
  learningIntention:
    "Share a quantity in a given ratio by finding the value of one part, then calculating each share.",
  successCriteria: [
    "Find the total number of parts in a ratio.",
    "Calculate the value of one part by dividing the total quantity by the total number of parts.",
    "Multiply to find the value of each share in a two-part or three-part ratio.",
    "Apply the sharing method to word problems involving money, ingredients and time.",
  ],
  teaching: {
    paragraphs: [
      "Sometimes you know the total amount and the ratio, and you need to split the total so it matches that ratio. For example, two people share $200 in the ratio $3:2$ — the question is how many dollars each one gets while keeping the comparison $3$ to $2$.",
      "The key idea is to think of the ratio as a count of equal-sized parts. The mix $3:2$ is $3$ parts for one person and $2$ parts for the other, so the money is being cut into $3 + 2 = 5$ equal parts in total. Imagine $200 laid out and chopped into $5$ identical piles.",
      "Once you know there are $5$ equal piles, each pile is worth $\\$200 \\div 5 = \\$40$. That number — the value of one part — is the heart of the method. From it, the first person takes $3$ piles: $3 \\times \\$40 = \\$120$. The second takes $2$ piles: $2 \\times \\$40 = \\$80$.",
      "So the method is always three steps: add the ratio numbers to get the total parts; divide the quantity by the total parts to find the value of one part; multiply one part by each ratio number to get each share. Written generally, total parts $= a + b$, one part $= \\frac{\\text{quantity}}{a+b}$, and the shares are $a$ and $b$ lots of one part.",
      "Why divide by the *total* parts and not by one of the ratio numbers? Because the quantity is split across every part at once. Dividing $\\$200$ by $3$ would pretend the money fills only the first person's piles — but the same $200 also has to cover the other person's $2$ piles. Only the sum $5$ counts every pile, so only the sum gives a pile its true value. This is the single most common error: always add first, then divide.",
      "The method extends straight to three-part ratios. To mix concrete cement : sand : gravel in $2:3:1$, the total is $2 + 3 + 1 = 6$ parts; find one part, then multiply by $2$, $3$ and $1$. And there is a built-in check: the shares must add back to the original quantity. If $\\$120 + \\$80 = \\$200$, the split is sound; if they do not, an arithmetic slip has crept in. This sharing idea is exactly what 'divide in a ratio' problems on prizes, recipes, alloys and study timetables ask for.",
    ],
    latexBlocks: [
      "\\text{total parts} = a + b \\quad (\\text{or } a + b + c \\text{ for three parts})",
      "\\text{one part} = \\frac{\\text{total quantity}}{\\text{total parts}}",
      "\\text{share}_1 = a \\times (\\text{one part}), \\quad \\text{share}_2 = b \\times (\\text{one part})",
      "\\text{check: } \\text{share}_1 + \\text{share}_2 = \\text{total quantity}",
    ],
  },
  workedExamples: [
    {
      title: "Share money in a two-part ratio",
      questionLatex: "\\text{Share }\\$180\\text{ between Ali and Beth in the ratio }2:3.",
      steps: [
        { explanation: "Add the ratio numbers to find how many equal parts the money is cut into.", latex: "2 + 3 = 5 \\text{ parts}" },
        { explanation: "Divide the total by the number of parts to find the value of one part.", latex: "\\$180 \\div 5 = \\$36 \\text{ per part}" },
        { explanation: "Ali gets 2 parts — multiply one part by 2.", latex: "\\text{Ali} = 2 \\times \\$36 = \\$72" },
        { explanation: "Beth gets 3 parts — multiply one part by 3.", latex: "\\text{Beth} = 3 \\times \\$36 = \\$108" },
        { explanation: "Check the shares add back to the original total.", latex: "\\$72 + \\$108 = \\$180 \\;\\checkmark" },
      ],
      finalAnswerLatex: "\\text{Ali: }\\$72, \\quad \\text{Beth: }\\$108",
    } as WorkedExample,
    {
      title: "Divide a length in a three-part ratio",
      questionLatex: "\\text{A 60 cm ribbon is cut in the ratio }1:2:3.",
      steps: [
        { explanation: "Add all three ratio numbers to find the total parts.", latex: "1 + 2 + 3 = 6 \\text{ parts}" },
        { explanation: "Divide the length by the total parts to find one part.", latex: "60 \\div 6 = 10 \\text{ cm}" },
        { explanation: "The pieces are 1, 2 and 3 lots of one part.", latex: "1 \\times 10 = 10, \\quad 2 \\times 10 = 20, \\quad 3 \\times 10 = 30 \\text{ (cm)}" },
        { explanation: "Check the pieces add back to 60 cm.", latex: "10 + 20 + 30 = 60 \\;\\checkmark" },
      ],
      finalAnswerLatex: "10 \\text{ cm}, \\; 20 \\text{ cm}, \\; 30 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Work backwards from one known share (harder)",
      questionLatex: "\\text{Luca and Ava share chores in the ratio }3:5.\\text{ Ava does 40 chores. How many does Luca do?}",
      steps: [
        { explanation: "Here the total is unknown, but Ava's share is. Ava's 5 parts equal 40 chores.", latex: "5 \\text{ parts} = 40 \\text{ chores}" },
        { explanation: "Divide to find the value of one part.", latex: "40 \\div 5 = 8 \\text{ chores per part}" },
        { explanation: "Luca does 3 parts — multiply one part by 3.", latex: "\\text{Luca} = 3 \\times 8 = 24 \\text{ chores}" },
      ],
      finalAnswerLatex: "\\text{Luca does } 24 \\text{ chores}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-rtr-div-g1",
      "To share $90 in the ratio $1:2$, what is the total number of parts?",
      "B",
      ["$1$", "$3$", "$2$", "$90$"],
      "Add the ratio numbers: $1 + 2 = 3$ parts in total.",
      "Add all the ratio numbers together to find the total parts.",
    ),
    answer(
      "y8-rtr-div-g2",
      "Share $120 in the ratio $1:3$. What is the smaller share?",
      "\\text{Smaller share} = \\;?",
      "$30",
      "Total parts $= 1 + 3 = 4$. One part $= \\$120 \\div 4 = \\$30$. Smaller share $= 1 \\times \\$30 = \\$30$.",
      "Find the total parts, then calculate one part, then multiply by the smaller ratio number.",
    ),
    answer(
      "y8-rtr-div-g3",
      "Two friends share 56 lollies in the ratio $3:4$. How many lollies does the friend with the larger share receive?",
      "\\text{Larger share} = \\;?",
      "32",
      "Total parts $= 3 + 4 = 7$. One part $= 56 \\div 7 = 8$. Larger share $= 4 \\times 8 = 32$.",
      "Divide the total by the total number of parts, then multiply by 4.",
    ),
    answer(
      "y8-rtr-div-g4",
      "A drink is made by mixing cordial and water in the ratio $1:4$. How much cordial is needed to make 750 mL of drink?",
      "\\text{Cordial} = \\;?",
      "150",
      "Total parts $= 1 + 4 = 5$. One part $= 750 \\div 5 = 150$ mL. Cordial $= 1 \\times 150 = 150$ mL.",
      "Add the ratio parts to get the total, then find the value of one part.",
      ["150 mL"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-rtr-div-i1",
      "Share $240 between Priya and Sam in the ratio $5:3$. How much does Priya receive?",
      "\\text{Priya's share} = \\;?",
      "$150",
      "Total parts $= 5 + 3 = 8$. One part $= \\$240 \\div 8 = \\$30$. Priya $= 5 \\times \\$30 = \\$150$.",
      "Add the ratio parts, find one part's value, then multiply by 5.",
    ),
    answer(
      "y8-rtr-div-i2",
      "Concrete is mixed in the ratio $1:2:3$ (cement : sand : gravel). How much sand is needed to make $180$ kg of concrete?",
      "\\text{Sand} = \\;?",
      "60",
      "Total parts $= 1 + 2 + 3 = 6$. One part $= 180 \\div 6 = 30$ kg. Sand $= 2 \\times 30 = 60$ kg.",
      "Total parts for a three-part ratio is the sum of all three numbers.",
      ["60 kg"],
    ),
    answer(
      "y8-rtr-div-i3",
      "A 2-hour study session is divided between maths, science and English in the ratio $3:2:1$. How many minutes are spent on maths?",
      "\\text{Maths time} = \\;?",
      "60",
      "Convert 2 hours to 120 minutes. Total parts $= 3 + 2 + 1 = 6$. One part $= 120 \\div 6 = 20$ min. Maths $= 3 \\times 20 = 60$ min.",
      "Convert 2 hours to minutes first, then apply the ratio method.",
      ["60 minutes"],
    ),
    answer(
      "y8-rtr-div-i4",
      "Jake and Mia share a prize of $350 in the ratio $4:3$. How much more does Jake receive than Mia?",
      "\\text{Difference} = \\;?",
      "$50",
      "Total parts $= 4 + 3 = 7$. One part $= \\$350 \\div 7 = \\$50$. Jake $= \\$200$, Mia $= \\$150$. Difference $= \\$200 - \\$150 = \\$50$.",
      "Find each share, then subtract.",
    ),
    choice(
      "y8-rtr-div-i5",
      "Three siblings share $120 in the ratio $1:2:3$. The youngest receives the smallest share. How much does the youngest receive?",
      "A",
      ["$20", "$40", "$60", "$30"],
      "Total parts $= 1 + 2 + 3 = 6$. One part $= \\$120 \\div 6 = \\$20$. Youngest (1 part) $= \\$20$.",
      "The smallest ratio number corresponds to the smallest share.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing the quantity by one ratio number instead of the total parts. For $3:2$, dividing by 3 or 2 instead of $3 + 2 = 5$.",
      fix: "Always add all ratio parts together first to find the total number of parts, then divide the quantity by that total.",
    },
    {
      mistake: "Forgetting to check that the shares sum to the original quantity.",
      fix: "Add all shares at the end. If they do not equal the original total, an error was made somewhere.",
    },
    {
      mistake: "Assigning the larger ratio number to the wrong person when order matters.",
      fix: "Match each ratio number to the correct person or quantity in the order they are stated in the question.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-rtr-div-m1",
      "Share $60 in the ratio $2:3$. Find the larger share.",
      "\\text{Larger share} = \\;?",
      "$36",
      "Total parts $= 5$. One part $= \\$12$. Larger share $= 3 \\times \\$12 = \\$36$.",
      "Add the ratio parts, find one part, then multiply by 3.",
    ),
    answer(
      "y8-rtr-div-m2",
      "A 90 cm piece of wire is cut in the ratio $4:5$. Find the length of the shorter piece.",
      "\\text{Shorter piece} = \\;?",
      "40",
      "Total parts $= 4 + 5 = 9$. One part $= 90 \\div 9 = 10$ cm. Shorter piece $= 4 \\times 10 = 40$ cm.",
      "The smaller ratio number gives the shorter piece.",
      ["40 cm"],
    ),
    choice(
      "y8-rtr-div-m3",
      "Juice is mixed from orange, apple and mango in the ratio $3:2:1$. A 600 mL bottle is filled. How much apple juice is used?",
      "B",
      ["100 mL", "200 mL", "300 mL", "150 mL"],
      "Total parts $= 6$. One part $= 600 \\div 6 = 100$ mL. Apple (2 parts) $= 200$ mL.",
      "Find one part's volume, then multiply by the apple juice ratio number.",
    ),
    answer(
      "y8-rtr-div-m4",
      "Three people invest in a business in the ratio $2:3:5$. The total profit is $4000. How much does the person with the largest investment receive?",
      "\\text{Largest share} = \\;?",
      "$2000",
      "Total parts $= 2 + 3 + 5 = 10$. One part $= \\$4000 \\div 10 = \\$400$. Largest share $= 5 \\times \\$400 = \\$2000$.",
      "Find one part's value, then multiply by the largest ratio number.",
    ),
    answer(
      "y8-rtr-div-m5",
      "Luca and Ava share chores in the ratio $3:5$. If Ava does 40 chores, how many chores does Luca do?",
      "\\text{Luca's chores} = \\;?",
      "24",
      "Ava's 5 parts equal 40 chores, so one part $= 40 \\div 5 = 8$ chores. Luca $= 3 \\times 8 = 24$ chores.",
      "Use Ava's known share to find the value of one part.",
    ),
    answer(
      "y8-rtr-div-m6",
      "A school fundraiser raises $1800. The money is split between sports, arts and library in the ratio $4:3:2$. How much does the arts program receive?",
      "\\text{Arts} = \\;?",
      "$600",
      "Total parts $= 4 + 3 + 2 = 9$. One part $= \\$1800 \\div 9 = \\$200$. Arts $= 3 \\times \\$200 = \\$600$.",
      "Find one part's value, then multiply by the arts ratio number.",
    ),
    answer(
      "y8-rtr-div-m7",
      "A bag contains red, blue and green beads in the ratio $5:3:2$. There are 120 beads in total. How many blue beads are there?",
      "\\text{Blue beads} = \\;?",
      "36",
      "Total parts $= 5 + 3 + 2 = 10$. One part $= 120 \\div 10 = 12$. Blue $= 3 \\times 12 = 36$.",
      "Add all three ratio numbers to find total parts.",
    ),
    answer(
      "y8-rtr-div-m8",
      "Share $350 between two people in the ratio $3:4$. Find the difference between the two shares.",
      "\\text{Difference} = \\;?",
      "$50",
      "Total parts $= 7$. One part $= \\$50$. Shares: $\\$150$ and $\\$200$. Difference $= \\$200 - \\$150 = \\$50$.",
      "Find both shares, then subtract.",
    ),
    choice(
      "y8-rtr-div-m9",
      "Gold and silver are mixed in the ratio $7:3$ by mass to make 500 g of an alloy. How much gold is used?",
      "C",
      ["150 g", "300 g", "350 g", "175 g"],
      "Total parts $= 10$. One part $= 50$ g. Gold $= 7 \\times 50 = 350$ g.",
      "Find the total parts, then one part's mass, then multiply by the gold ratio number.",
    ),
    answer(
      "y8-rtr-div-m10",
      "A farm has chickens, cows and pigs in the ratio $6:2:1$. There are 180 animals in total. Chickens earn $3 each per week. What is the weekly income from chickens?",
      "\\text{Weekly income from chickens} = \\;?",
      "$360",
      "Total parts $= 6 + 2 + 1 = 9$. One part $= 180 \\div 9 = 20$ animals. Chickens $= 6 \\times 20 = 120$. Income $= 120 \\times \\$3 = \\$360$.",
      "First find the number of chickens using the ratio method, then calculate the income.",
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y8-rtr-div-p01", "To share an amount in the ratio $2:3$, how many parts are there in total?", "2 + 3 = \\;?", "5", "Add the ratio numbers: $2 + 3 = 5$.", "Add the ratio numbers together.", ["5 parts"]), 1),
    withDifficulty(answer("y8-rtr-div-p02", "Share $20 in the ratio $1:1$. How much is each share?", "\\text{Each share} = \\;?", "$10", "Total parts $= 2$. One part $= \\$20 \\div 2 = \\$10$.", "Two equal parts means split in half.", ["10", "$10.00"]), 1),
    withDifficulty(choice("y8-rtr-div-p03", "Share 12 lollies in the ratio $1:2$. What is the smaller share?", "B", ["2", "4", "6", "8"], "Total parts $= 3$. One part $= 4$. Smaller share $= 1 \\times 4 = 4$.", "Divide 12 by the total parts, then multiply by the smaller ratio number."), 1),
    withDifficulty(answer("y8-rtr-div-p04", "Share $40 in the ratio $1:3$. Find the larger share.", "\\text{Larger share} = \\;?", "$30", "Total parts $= 4$. One part $= \\$10$. Larger $= 3 \\times \\$10 = \\$30$.", "Find one part, then multiply by 3.", ["30"]), 1),
    withDifficulty(answer("y8-rtr-div-p05", "Share 18 stickers in the ratio $1:2$. Find the larger share.", "\\text{Larger share} = \\;?", "12", "Total parts $= 3$. One part $= 6$. Larger $= 2 \\times 6 = 12$.", "Divide 18 by 3 parts, then multiply by 2.", ["12 stickers"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y8-rtr-div-p06", "Share $100 in the ratio $2:3$. Find the smaller share.", "\\text{Smaller share} = \\;?", "$40", "Total parts $= 5$. One part $= \\$20$. Smaller $= 2 \\times \\$20 = \\$40$.", "Find one part, then multiply by 2.", ["40"]), 2),
    withDifficulty(answer("y8-rtr-div-p07", "A 72 cm ribbon is cut in the ratio $5:4$. Find the longer piece.", "\\text{Longer piece} = \\;?", "40", "Total parts $= 9$. One part $= 8$ cm. Longer $= 5 \\times 8 = 40$ cm.", "Find one part, then multiply by 5.", ["40 cm"]), 2),
    withDifficulty(choice("y8-rtr-div-p08", "Share $80 in the ratio $3:5$. What is the larger share?", "C", ["$30", "$40", "$50", "$60"], "Total parts $= 8$. One part $= \\$10$. Larger $= 5 \\times \\$10 = \\$50$.", "Find one part, then multiply by the larger ratio number."), 2),
    withDifficulty(answer("y8-rtr-div-p09", "Mix juice and water in the ratio $2:5$ to make 700 mL. How much juice is used?", "\\text{Juice} = \\;?", "200", "Total parts $= 7$. One part $= 100$ mL. Juice $= 2 \\times 100 = 200$ mL.", "Find one part, then multiply by the juice ratio number.", ["200 mL"]), 2),
    withDifficulty(answer("y8-rtr-div-p10", "Two friends share 45 marbles in the ratio $4:5$. How many does the one with more receive?", "\\text{Larger share} = \\;?", "25", "Total parts $= 9$. One part $= 5$. Larger $= 5 \\times 5 = 25$.", "Find one part, then multiply by 5.", ["25 marbles"]), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y8-rtr-div-p11", "Share $480 between three people in the ratio $1:2:3$. How much does the middle share receive?", "\\text{Middle share} = \\;?", "$160", "Total parts $= 6$. One part $= \\$80$. Middle $= 2 \\times \\$80 = \\$160$.", "Add all three ratio numbers for the total parts.", ["160"]), 3),
    withDifficulty(answer("y8-rtr-div-p12", "A 120 cm wire is cut in the ratio $3:5$. Find the difference between the two pieces.", "\\text{Difference} = \\;?", "30", "Total parts $= 8$. One part $= 15$ cm. Pieces: 45 cm and 75 cm. Difference $= 30$ cm.", "Find both pieces, then subtract.", ["30 cm"]), 3),
    withDifficulty(choice("y8-rtr-div-p13", "Paint is mixed red : white : blue in $2:3:5$ for a 500 mL can. How much white is used?", "B", ["100 mL", "150 mL", "200 mL", "250 mL"], "Total parts $= 10$. One part $= 50$ mL. White $= 3 \\times 50 = 150$ mL.", "Add the three ratio numbers, find one part, then multiply by the white number."), 3),
    withDifficulty(answer("y8-rtr-div-p14", "Ben and Tia share chores in the ratio $2:7$. Tia does 28 chores. How many does Ben do?", "\\text{Ben's chores} = \\;?", "8", "Tia's 7 parts $= 28$, so one part $= 4$. Ben $= 2 \\times 4 = 8$.", "Use Tia's share to find one part.", ["8 chores"]), 3),
    withDifficulty(answer("y8-rtr-div-p15", "A bag of 90 beads has red, blue and yellow in the ratio $4:3:2$. How many blue beads?", "\\text{Blue beads} = \\;?", "30", "Total parts $= 9$. One part $= 10$. Blue $= 3 \\times 10 = 30$.", "Add the three ratio numbers for the total parts.", ["30 beads"]), 3),
    withDifficulty(answer("y8-rtr-div-p16", "Share $600 in the ratio $5:7$. Find the larger share.", "\\text{Larger share} = \\;?", "$350", "Total parts $= 12$. One part $= \\$50$. Larger $= 7 \\times \\$50 = \\$350$.", "Find one part, then multiply by 7.", ["350"]), 3),
    withDifficulty(answer("y8-rtr-div-p17", "A 3-hour shift is split between setup, service and cleanup in the ratio $1:4:1$. How many minutes are spent on service?", "\\text{Service time} = \\;?", "120", "3 hours $= 180$ min. Total parts $= 6$. One part $= 30$ min. Service $= 4 \\times 30 = 120$ min.", "Convert hours to minutes first.", ["120 minutes"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y8-rtr-div-p18", "Three people invest in the ratio $3:4:5$ and share a $2400 profit. How much does the largest investor receive?", "\\text{Largest share} = \\;?", "$1000", "Total parts $= 12$. One part $= \\$200$. Largest $= 5 \\times \\$200 = \\$1000$.", "Add all three ratio numbers, then find one part.", ["1000"]), 4),
    withDifficulty(answer("y8-rtr-div-p19", "Gold and copper are mixed in the ratio $5:3$ to make 480 g of alloy. How much more gold than copper is used?", "\\text{Difference} = \\;?", "120", "Total parts $= 8$. One part $= 60$ g. Gold $= 300$ g, copper $= 180$ g. Difference $= 120$ g.", "Find both masses, then subtract.", ["120 g"]), 4),
    withDifficulty(choice("y8-rtr-div-p20", "Sam and Lee share money in the ratio $3:8$. Sam receives $35 less than Lee. How much do they share in total?", "C", ["$33", "$55", "$77", "$99"], "Difference in parts $= 8 - 3 = 5$ parts $= \\$35$, so one part $= \\$7$. Total parts $= 11$, total $= 11 \\times \\$7 = \\$77$.", "The stated difference equals (8 − 3) parts. Find one part, then the total."), 4),
    withDifficulty(answer("y8-rtr-div-p21", "A 750 g mix of nuts and raisins is in the ratio $7:8$. How many grams of raisins are there?", "\\text{Raisins} = \\;?", "400", "Total parts $= 15$. One part $= 50$ g. Raisins $= 8 \\times 50 = 400$ g.", "Add the parts to find the total, then one part.", ["400 g"]), 4),
    withDifficulty(answer("y8-rtr-div-p22", "A field of 240 animals has sheep, goats and cows in the ratio $9:5:2$. How many more sheep than cows are there?", "\\text{Difference} = \\;?", "105", "Total parts $= 16$. One part $= 15$. Sheep $= 135$, cows $= 30$. Difference $= 105$.", "Find both counts, then subtract.", ["105 animals"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y8-rtr-div-p23", "Three classes raise money in the ratio $5:8:9$. The second class raises $300 more than the first. How much is raised in total?", "\\text{Total raised} = \\;?", "$2200", "Difference $= 8 - 5 = 3$ parts $= \\$300$, so one part $= \\$100$. Total parts $= 22$. Total $= 22 \\times \\$100 = \\$2200$.", "The stated difference equals (8 − 5) parts. Find one part, then multiply by the total parts.", ["2200"]), 5),
    withDifficulty(answer("y8-rtr-div-p24", "A prize of $924 is shared in the ratio $2:3:6$. The smallest share is then split equally between 4 children. How much does each child get?", "\\text{Each child} = \\;?", "$42", "Total parts $= 11$. One part $= \\$84$. Smallest $= 2 \\times \\$84 = \\$168$. Each child $= \\$168 \\div 4 = \\$42$.", "Find the smallest share first, then divide by 4.", ["42"]), 5),
    withDifficulty(choice("y8-rtr-div-p25", "Cement, sand and gravel are mixed $1:2:4$. A builder has 30 kg of cement and unlimited sand and gravel. What is the maximum mass of concrete he can make?", "D", ["120 kg", "150 kg", "180 kg", "210 kg"], "Cement is 1 part $= 30$ kg, so total parts $= 7$, total mass $= 7 \\times 30 = 210$ kg.", "Cement is 1 part. Multiply 30 kg by the total number of parts."), 5),
    withDifficulty(answer("y8-rtr-div-p26", "Two quantities are in the ratio $4:9$ and the larger one is 27. A third quantity equal to the smaller one is then added to the total. What is the new total of all three quantities?", "\\text{New total} = \\;?", "51", "One part $= 27 \\div 9 = 3$. Smaller $= 4 \\times 3 = 12$. Original total $= 12 + 27 = 39$. Adding another 12 gives $39 + 12 = 51$.", "Find one part from the larger quantity, then work out the smaller and combine.", ["51"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y8-rtr-div-mp1",
      prompt: "A $360 prize is shared between three winners — Ana, Beck and Cara — in the ratio $3:4:5$.",
      latex: "\\text{Ana : Beck : Cara} = 3:4:5",
      answer: "360",
      hint: "Add the ratio numbers to find the total parts, then find the value of one part.",
      explanation: "Total parts $= 12$. One part: \\(\\$360\\) ÷ 12 = \\(\\$30\\). Ana \\(= \\$90\\), Beck \\(= \\$120\\), Cara \\(= \\$150\\). Cara receives \\(\\$150 - \\$90 = \\$60\\) more than Ana.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the value of one part, in dollars?",
          latex: "360 \\div 12",
          marks: 1,
          answer: "$30",
          acceptedAnswers: ["30", "$30.00"],
          hint: "Divide $360 by the total number of parts.",
          explanation: "Total parts $= 3 + 4 + 5 = 12$. One part: \\(\\$360\\) ÷ 12 = \\(\\$30\\).",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How much does Ana receive?",
          latex: "3 \\times 30",
          marks: 1,
          answer: "$90",
          acceptedAnswers: ["90", "$90.00"],
          hint: "Multiply one part by Ana's ratio number.",
          explanation: "Ana $= 3 \\times \\$30 = \\$90$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How much does Cara receive?",
          latex: "5 \\times 30",
          marks: 1,
          answer: "$150",
          acceptedAnswers: ["150", "$150.00"],
          hint: "Multiply one part by Cara's ratio number.",
          explanation: "Cara $= 5 \\times \\$30 = \\$150$.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "How much more does Cara receive than Ana, in dollars?",
          latex: "150 - 90",
          marks: 1,
          answer: "$60",
          acceptedAnswers: ["60", "$60.00"],
          hint: "Subtract Ana's share from Cara's share.",
          explanation: "$\\$150 - \\$90 = \\$60$.",
        },
      ],
    },
  ],
};

// ── Lesson 3: Rates and Unit Rates ────────────────────────────────────────────

const ratesAndUnitRates: LessonContent = {
  description:
    "Distinguish rates from ratios, calculate unit rates, compare rates to find the best value, and work with common practical rates including pay rate, fuel consumption and flow rate.",
  learningIntention:
    "Calculate and compare rates, including unit rates, and apply them in practical contexts.",
  successCriteria: [
    "Explain the difference between a ratio and a rate.",
    "Calculate a unit rate by dividing the first quantity by the second.",
    "Compare rates by converting to unit rates or a common quantity.",
    "Convert between related rates such as km/h and m/s.",
    "Apply rates in practical contexts including pay, fuel and flow.",
  ],
  teaching: {
    paragraphs: [
      "A rate is a comparison of two quantities that are measured in different units. A ratio compares like with like — boys to girls, both just counts of people. A rate compares unlike with unlike — kilometres against hours, dollars against kilograms, litres against minutes. Because the two quantities are different kinds of thing, a rate always carries units on both, such as 'km per hour' or 'dollars per kilogram'.",
      "The most useful form of a rate is the unit rate: how much of the first quantity goes with exactly $1$ of the second. If a car travels $240$ km in $3$ hours, then in $1$ hour it covers $240 \\div 3 = 80$ km, so its speed is $80$ km per hour. You find a unit rate by dividing the first quantity by the second.",
      "Why does dividing give the 'per 1' amount? Sharing $240$ km equally across $3$ hours means each hour gets the same slice: $240 \\div 3 = 80$ km in each. Division is exactly the operation that spreads a total evenly over the second quantity, so the answer is automatically the amount for one unit of it. That is why the unit of a rate is written as 'first-unit per second-unit'.",
      "Unit rates make comparing easy, and that is the whole reason to compute them. Two grocery packs at different sizes and prices cannot be compared directly — but reduce each to cost per gram (or per 100 g) and you have two numbers on the same footing; the smaller cost per gram is the better buy. Lining everything up against a single shared unit is what turns a messy comparison into one quick 'which is smaller'.",
      "Converting between rates uses the same per-unit reasoning. To turn km/h into m/s, swap the units underneath: $1$ km $= 1000$ m and $1$ h $= 3600$ s, so each km/h is worth $\\frac{1000}{3600} = \\frac{5}{18}$ m/s — multiply by $\\frac{5}{18}$. Going the other way, multiply by $\\frac{3600}{1000} = 3.6$. The fractions are not magic; they are just 'how many metres per kilometre' divided by 'how many seconds per hour'.",
      "Watch the direction of the division — this is the usual slip. The unit rate is always first quantity $\\div$ second quantity, matched to the label you want: for km/h, divide km by hours, not hours by km. A quick sanity check catches reversals: $80$ km/h is a sensible car speed, but $0.0125$ km/h (the upside-down answer) clearly is not. In exams these rates appear as pay per hour, fuel use in L/100 km, tap flow in L/min and best-buy questions — all the same divide-to-get-per-one move.",
    ],
    latexBlocks: [
      "\\text{unit rate} = \\frac{\\text{first quantity}}{\\text{second quantity}} \\quad(\\text{amount per } 1)",
      "\\text{km/h} \\times \\tfrac{1000}{3600} = \\text{km/h} \\times \\tfrac{5}{18} = \\text{m/s}",
      "\\text{m/s} \\times 3.6 = \\text{km/h}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate a unit rate (pay per hour)",
      questionLatex: "\\text{A worker earns }\\$312\\text{ for 8 hours. Find the pay rate in dollars per hour.}",
      steps: [
        { explanation: "A pay rate is dollars per 1 hour, so divide dollars by hours.", latex: "\\$312 \\div 8" },
        { explanation: "Do the division to share the earnings evenly across the hours.", latex: "\\$312 \\div 8 = \\$39" },
        { explanation: "Check the answer is sensible for an hourly wage.", latex: "\\$39 \\text{ per hour is reasonable}" },
      ],
      finalAnswerLatex: "\\$39 \\text{ per hour}",
    } as WorkedExample,
    {
      title: "Compare rates to find best value",
      questionLatex: "\\text{Pack A: 400 g for }\\$3.20.\\text{ Pack B: 600 g for }\\$4.50.\\text{ Which is better value?}",
      steps: [
        { explanation: "Reduce Pack A to cost per gram so both packs share one unit.", latex: "\\text{Pack A: } \\$3.20 \\div 400 = \\$0.008 \\text{ per g}" },
        { explanation: "Reduce Pack B to cost per gram the same way.", latex: "\\text{Pack B: } \\$4.50 \\div 600 = \\$0.0075 \\text{ per g}" },
        { explanation: "Compare the two unit rates; the lower cost per gram wins.", latex: "0.0075 < 0.008" },
      ],
      finalAnswerLatex: "\\text{Pack B is better value (}\\$0.0075\\text{ per g)}",
    } as WorkedExample,
    {
      title: "Convert km/h to m/s",
      questionLatex: "\\text{Convert }90 \\text{ km/h to m/s.}",
      steps: [
        { explanation: "Each km/h is worth 5/18 m/s, so multiply by that conversion factor.", latex: "90 \\times \\frac{5}{18}" },
        { explanation: "Multiply out the numerator.", latex: "= \\frac{90 \\times 5}{18} = \\frac{450}{18}" },
        { explanation: "Divide to simplify.", latex: "= 25 \\text{ m/s}" },
      ],
      finalAnswerLatex: "90 \\text{ km/h} = 25 \\text{ m/s}",
    } as WorkedExample,
    {
      title: "Find fuel consumption in L/100 km (harder)",
      questionLatex: "\\text{A car uses 45 L of fuel to travel 630 km. Find the fuel consumption in L/100 km.}",
      steps: [
        { explanation: "First find litres per 1 km by dividing litres by distance.", latex: "45 \\div 630 = 0.0\\overline{714} \\text{ L/km}" },
        { explanation: "L/100 km is the litres for 100 km, so multiply the per-km rate by 100.", latex: "0.0\\overline{714} \\times 100" },
        { explanation: "Work out the product and round to two decimal places.", latex: "\\approx 7.14 \\text{ L/100 km}" },
      ],
      finalAnswerLatex: "\\approx 7.14 \\text{ L/100 km}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-rtr-rat-g1",
      "Which of the following is a rate (not a ratio)?",
      "C",
      ["Boys to girls in a class", "Red marbles to blue marbles", "Kilometres per hour", "Length to width of a rectangle"],
      "A rate compares two quantities with different units (km and hours). Ratios compare quantities of the same kind.",
      "A rate always involves two different types of measurement.",
    ),
    answer(
      "y8-rtr-rat-g2",
      "A worker earns $312 for 8 hours of work. What is the pay rate in $/h?",
      "\\text{Pay rate} = \\;?",
      "$39/h",
      "$312 \\div 8 = \\$39$ per hour.",
      "Divide the total earnings by the number of hours.",
      ["$39", "39"],
    ),
    answer(
      "y8-rtr-rat-g3",
      "Convert $54$ km/h to m/s.",
      "54 \\text{ km/h} = \\;? \\text{ m/s}",
      "15",
      "$54 \\times \\frac{1000}{3600} = 54 \\times \\frac{5}{18} = 15$ m/s.",
      "Multiply km/h by $\\frac{5}{18}$ to get m/s.",
      ["15 m/s"],
    ),
    answer(
      "y8-rtr-rat-g4",
      "A tap fills 180 L in 12 minutes. What is the flow rate in L/min?",
      "\\text{Flow rate} = \\;?",
      "15",
      "$180 \\div 12 = 15$ L/min.",
      "Divide the total volume by the time taken.",
      ["15 L/min"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-rtr-rat-i1",
      "A cyclist covers 84 km in 3.5 hours. What is the average speed in km/h?",
      "\\text{Speed} = \\;?",
      "24",
      "$84 \\div 3.5 = 24$ km/h.",
      "Divide the distance by the time.",
      ["24 km/h"],
    ),
    answer(
      "y8-rtr-rat-i2",
      "Convert $20$ m/s to km/h.",
      "20 \\text{ m/s} = \\;? \\text{ km/h}",
      "72",
      "$20 \\times 3.6 = 72$ km/h.",
      "Multiply m/s by 3.6 to convert to km/h.",
      ["72 km/h"],
    ),
    answer(
      "y8-rtr-rat-i3",
      "Juice A costs $2.40 for 600 mL. Juice B costs $1.80 for 400 mL. Which is cheaper per 100 mL, and what is that cost?",
      "\\text{Cost per 100 mL of cheaper juice} = \\;?",
      "$0.40",
      "Juice A: $\\$2.40 \\div 6 = \\$0.40$ per 100 mL. Juice B: $\\$1.80 \\div 4 = \\$0.45$ per 100 mL. Juice A is cheaper at $\\$0.40$ per 100 mL.",
      "Find the cost per 100 mL for each juice, then compare.",
      ["40 cents", "40c"],
    ),
    choice(
      "y8-rtr-rat-i4",
      "A car uses 60 L of fuel over 900 km. What is the fuel consumption in L/100 km?",
      "B",
      ["5 L/100 km", "\\(6\\tfrac{2}{3}\\) L/100 km", "15 L/100 km", "10 L/100 km"],
      "$60 \\div 900 \\times 100 = \\frac{60}{9} = 6.\\overline{6}$ L/100 km.",
      "Divide litres by distance to get L per km, then multiply by 100.",
    ),
    answer(
      "y8-rtr-rat-i5",
      "A printer prints 180 pages in 4 minutes. How long will it take to print 315 pages at the same rate?",
      "\\text{Time} = \\;?",
      "7",
      "Rate $= 180 \\div 4 = 45$ pages/min. Time $= 315 \\div 45 = 7$ minutes.",
      "Find the unit rate (pages per minute), then divide the required pages by that rate.",
      ["7 minutes"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing in the wrong direction to find a unit rate — for example, dividing hours by kilometres instead of kilometres by hours.",
      fix: "The unit rate is always: first quantity divided by second quantity, matching the units in the rate label (e.g. km ÷ h for km/h).",
    },
    {
      mistake: "Forgetting to multiply by 100 when calculating L/100 km, giving L/km instead.",
      fix: "L/100 km $= (\\text{litres} \\div \\text{km}) \\times 100$. The '100' in L/100 km must be included.",
    },
    {
      mistake: "Confusing which direction to convert: multiplying instead of dividing (or vice versa) between km/h and m/s.",
      fix: "km/h to m/s: multiply by $\\frac{5}{18}$ (values get smaller). m/s to km/h: multiply by $3.6$ (values get larger).",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-rtr-rat-m1",
      "A factory produces 2400 bottles in 8 hours. What is the production rate in bottles per hour?",
      "\\text{Rate} = \\;?",
      "300",
      "$2400 \\div 8 = 300$ bottles per hour.",
      "Divide the total output by the number of hours.",
      ["300 bottles/hour"],
    ),
    answer(
      "y8-rtr-rat-m2",
      "Convert $108$ km/h to m/s.",
      "108 \\text{ km/h} = \\;? \\text{ m/s}",
      "30",
      "$108 \\times \\frac{5}{18} = \\frac{540}{18} = 30$ m/s.",
      "Multiply by $\\frac{5}{18}$.",
      ["30 m/s"],
    ),
    choice(
      "y8-rtr-rat-m3",
      "Store X sells 500 g of rice for $1.50. Store Y sells 750 g for $2.10. Which store offers better value?",
      "B",
      ["Store X at $0.30/100 g", "Store Y at $0.28/100 g", "They are the same value", "Store X at $0.003/g"],
      "Store X: $\\$1.50 \\div 5 = \\$0.30$ per 100 g. Store Y: $\\$2.10 \\div 7.5 = \\$0.28$ per 100 g. Store Y is cheaper.",
      "Convert each price to cost per 100 g, then compare.",
    ),
    answer(
      "y8-rtr-rat-m4",
      "Convert $12.5$ m/s to km/h.",
      "12.5 \\text{ m/s} = \\;? \\text{ km/h}",
      "45",
      "$12.5 \\times 3.6 = 45$ km/h.",
      "Multiply m/s by 3.6.",
      ["45 km/h"],
    ),
    answer(
      "y8-rtr-rat-m5",
      "A worker is paid $18.50 per hour. How much does she earn for a 38-hour week?",
      "\\text{Earnings} = \\;?",
      "$703",
      "$\\$18.50 \\times 38 = \\$703$.",
      "Multiply the hourly rate by the number of hours.",
    ),
    answer(
      "y8-rtr-rat-m6",
      "A pump empties a 9000 L tank in 2.5 hours. What is the flow rate in L/min?",
      "\\text{Flow rate} = \\;?",
      "60",
      "$2.5 \\text{ hours} = 150 \\text{ min}$. Rate $= 9000 \\div 150 = 60$ L/min.",
      "Convert hours to minutes first, then divide the volume by the time.",
      ["60 L/min"],
    ),
    answer(
      "y8-rtr-rat-m7",
      "A car travels 420 km and uses 35 L of petrol. What is the fuel consumption in L/100 km?",
      "\\text{Consumption} = \\;?",
      "8.33",
      "$35 \\div 420 \\times 100 = 8.\\overline{3}$ L/100 km $\\approx 8.33$ L/100 km.",
      "Divide litres by kilometres, then multiply by 100.",
      ["8.3", "25/3"],
    ),
    answer(
      "y8-rtr-rat-m8",
      "Brand A: 1.2 kg for $4.80. Brand B: 800 g for $3.60. Which brand has the lower price per 100 g?",
      "\\text{Lower price is Brand ?}",
      "A",
      "Brand A: $\\$4.80 \\div 12 = \\$0.40$ per 100 g. Brand B: $\\$3.60 \\div 8 = \\$0.45$ per 100 g. Brand A is cheaper.",
      "Convert both quantities to the same unit (100 g), then compare costs.",
    ),
    choice(
      "y8-rtr-rat-m9",
      "A runner completes 400 m in 50 seconds. What is her speed in m/s, and which of the following is closest to her speed in km/h?",
      "C",
      ["$5$ km/h", "$18$ km/h", "$29$ km/h", "$50$ km/h"],
      "Speed $= 400 \\div 50 = 8$ m/s. Convert: $8 \\times 3.6 = 28.8$ km/h, which is closest to $29$ km/h.",
      "Find the speed in m/s first, then convert to km/h by multiplying by 3.6.",
    ),
    answer(
      "y8-rtr-rat-m10",
      "A holiday house uses electricity at a rate of $0.28 per kWh. In one month, 850 kWh are used. An energy-saving upgrade reduces consumption by 15%. How much is saved per month?",
      "\\text{Monthly saving} = \\;?",
      "$35.70",
      "Monthly bill $= 850 \\times \\$0.28 = \\$238$. Reduction $= 15\\%$ of $\\$238 = 0.15 \\times \\$238 = \\$35.70$.",
      "Calculate the original bill, then find 15% of it.",
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y8-rtr-rat-p01", "A car travels 100 km in 2 hours. What is its speed in km/h?", "100 \\div 2 = \\;?", "50", "$100 \\div 2 = 50$ km/h.", "Divide distance by time.", ["50 km/h"]), 1),
    withDifficulty(answer("y8-rtr-rat-p02", "A tap fills 60 L in 6 minutes. What is the flow rate in L/min?", "60 \\div 6 = \\;?", "10", "$60 \\div 6 = 10$ L/min.", "Divide volume by time.", ["10 L/min"]), 1),
    withDifficulty(choice("y8-rtr-rat-p03", "Which is a rate, not a ratio?", "C", ["Boys to girls", "Apples to oranges", "Dollars per hour", "Length to width"], "A rate compares quantities with different units, like dollars and hours.", "A rate involves two different types of measurement."), 1),
    withDifficulty(answer("y8-rtr-rat-p04", "A worker earns $80 for 4 hours. What is the pay rate in $/h?", "80 \\div 4 = \\;?", "$20/h", "$80 \\div 4 = \\$20$ per hour.", "Divide earnings by hours.", ["20", "$20"]), 1),
    withDifficulty(answer("y8-rtr-rat-p05", "A machine makes 200 parts in 5 hours. What is the rate in parts per hour?", "200 \\div 5 = \\;?", "40", "$200 \\div 5 = 40$ parts per hour.", "Divide total parts by hours.", ["40 parts/hour"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y8-rtr-rat-p06", "Convert $36$ km/h to m/s.", "36 \\times \\tfrac{5}{18} = \\;?", "10", "$36 \\times \\frac{5}{18} = 10$ m/s.", "Multiply by $\\frac{5}{18}$.", ["10 m/s"]), 2),
    withDifficulty(answer("y8-rtr-rat-p07", "Convert $15$ m/s to km/h.", "15 \\times 3.6 = \\;?", "54", "$15 \\times 3.6 = 54$ km/h.", "Multiply by 3.6.", ["54 km/h"]), 2),
    withDifficulty(answer("y8-rtr-rat-p08", "A cyclist covers 60 km in 2.5 hours. Find the average speed in km/h.", "60 \\div 2.5 = \\;?", "24", "$60 \\div 2.5 = 24$ km/h.", "Divide distance by time.", ["24 km/h"]), 2),
    withDifficulty(choice("y8-rtr-rat-p09", "A pump moves 240 L in 8 minutes. What is the flow rate?", "B", ["20 L/min", "30 L/min", "32 L/min", "40 L/min"], "$240 \\div 8 = 30$ L/min.", "Divide the volume by the time."), 2),
    withDifficulty(answer("y8-rtr-rat-p10", "A worker is paid $22 per hour. How much for a 6-hour shift?", "22 \\times 6 = \\;?", "$132", "$\\$22 \\times 6 = \\$132$.", "Multiply the rate by the hours.", ["132"]), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y8-rtr-rat-p11", "A car uses 48 L over 600 km. Find the fuel consumption in L/100 km.", "48 \\div 600 \\times 100 = \\;?", "8", "$48 \\div 600 \\times 100 = 8$ L/100 km.", "Divide litres by km, then multiply by 100.", ["8 L/100 km"]), 3),
    withDifficulty(answer("y8-rtr-rat-p12", "Convert $72$ km/h to m/s.", "72 \\times \\tfrac{5}{18} = \\;?", "20", "$72 \\times \\frac{5}{18} = 20$ m/s.", "Multiply by $\\frac{5}{18}$.", ["20 m/s"]), 3),
    withDifficulty(choice("y8-rtr-rat-p13", "Pack A: 500 g for $4.00. Pack B: 800 g for $6.00. Which is better value?", "B", ["Pack A at $0.80/100 g", "Pack B at $0.75/100 g", "They are equal", "Pack A at $0.008/g"], "Pack A: $\\$4.00 \\div 5 = \\$0.80$ per 100 g. Pack B: $\\$6.00 \\div 8 = \\$0.75$ per 100 g. Pack B is cheaper.", "Find the cost per 100 g for each pack, then compare."), 3),
    withDifficulty(answer("y8-rtr-rat-p14", "A printer prints 120 pages in 3 minutes. How long to print 280 pages?", "\\text{Time (min)} = \\;?", "7", "Rate $= 40$ pages/min. Time $= 280 \\div 40 = 7$ min.", "Find pages per minute, then divide.", ["7 minutes"]), 3),
    withDifficulty(answer("y8-rtr-rat-p15", "A pump empties a 6000 L tank in 2 hours. What is the flow rate in L/min?", "\\text{Rate} = \\;?", "50", "2 h $= 120$ min. $6000 \\div 120 = 50$ L/min.", "Convert hours to minutes first.", ["50 L/min"]), 3),
    withDifficulty(answer("y8-rtr-rat-p16", "Convert $25$ m/s to km/h.", "25 \\times 3.6 = \\;?", "90", "$25 \\times 3.6 = 90$ km/h.", "Multiply by 3.6.", ["90 km/h"]), 3),
    withDifficulty(answer("y8-rtr-rat-p17", "A worker earns $437 for 23 hours. What is the pay rate in $/h?", "437 \\div 23 = \\;?", "$19/h", "$437 \\div 23 = \\$19$ per hour.", "Divide earnings by hours.", ["19", "$19"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y8-rtr-rat-p18", "A car travels 360 km on 30 L. Find consumption in L/100 km.", "\\text{Consumption} = \\;?", "8.33", "$30 \\div 360 \\times 100 = 8.\\overline{3} \\approx 8.33$ L/100 km.", "Divide litres by km, then multiply by 100.", ["8.3", "25/3"]), 4),
    withDifficulty(choice("y8-rtr-rat-p19", "A runner does 300 m in 40 s. Which is closest to her speed in km/h?", "C", ["$18$ km/h", "$24$ km/h", "$27$ km/h", "$30$ km/h"], "Speed $= 300 \\div 40 = 7.5$ m/s. $7.5 \\times 3.6 = 27$ km/h.", "Find the speed in m/s, then multiply by 3.6."), 4),
    withDifficulty(answer("y8-rtr-rat-p20", "Brand A: 1.5 kg for $6.00. Brand B: 900 g for $4.05. Which brand is cheaper per 100 g? Answer A or B.", "\\text{Cheaper brand} = ?", "A", "Brand A: $\\$6.00 \\div 15 = \\$0.40$ per 100 g. Brand B: $\\$4.05 \\div 9 = \\$0.45$ per 100 g. Brand A is cheaper.", "Convert both to cost per 100 g.", ["Brand A"]), 4),
    withDifficulty(answer("y8-rtr-rat-p21", "A train travels at 90 km/h. How far does it go in 40 seconds? Give your answer in metres.", "\\text{Distance} = \\;?", "1000", "$90 \\text{ km/h} = 25$ m/s. $25 \\times 40 = 1000$ m.", "Convert to m/s first, then multiply by the time.", ["1000 m"]), 4),
    withDifficulty(answer("y8-rtr-rat-p22", "A tap leaks 3 mL every 5 seconds. How many litres leak in one hour?", "\\text{Litres per hour} = \\;?", "2.16", "Rate $= 0.6$ mL/s. In 3600 s: $0.6 \\times 3600 = 2160$ mL $= 2.16$ L.", "Find the rate per second, then multiply by 3600 s, then convert mL to L.", ["2.16 L"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y8-rtr-rat-p23", "Electricity costs $0.30 per kWh. A household uses 920 kWh in a month. A 20% reduction is achieved. What is the new monthly bill?", "\\text{New bill} = \\;?", "$220.80", "Original $= 920 \\times \\$0.30 = \\$276$. After 20% off: $0.80 \\times \\$276 = \\$220.80$.", "Find the original bill, then take 80% of it.", ["220.80"]), 5),
    withDifficulty(answer("y8-rtr-rat-p24", "Tap A fills a 600 L tank in 30 min; tap B in 20 min. Running together, what is their combined flow rate in L/min?", "\\text{Combined rate} = \\;?", "50", "Tap A $= 20$ L/min, tap B $= 30$ L/min. Combined $= 20 + 30 = 50$ L/min.", "Find each tap's rate, then add them.", ["50 L/min"]), 5),
    withDifficulty(choice("y8-rtr-rat-p25", "Shop X: 6 cans for $9.00. Shop Y: 10 cans for $14.00. A buyer needs 30 cans. How much is saved by buying all at the cheaper shop?", "B", ["$1.50", "$3.00", "$4.50", "$6.00"], "Shop X: \\$1.50/can → 30 cans $= \\$45$. Shop Y: \\$1.40/can → 30 cans $= \\$42$. Saving $= \\$45 - \\$42 = \\$3.00$.", "Find each shop's price per can, then the cost of 30 cans at each."), 5),
    withDifficulty(answer("y8-rtr-rat-p26", "A car averages 7.5 L/100 km and travels 480 km. Fuel costs $2.00 per litre. What is the fuel cost for the trip?", "\\text{Fuel cost} = \\;?", "$72", "Fuel used $= 7.5 \\times \\frac{480}{100} = 36$ L. Cost $= 36 \\times \\$2.00 = \\$72$.", "Find the litres used first, then multiply by the price per litre.", ["72"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y8-rtr-rat-mp1",
      prompt: "A family car travels 540 km on a road trip and uses 45 L of petrol. Petrol costs $1.80 per litre.",
      latex: "\\text{540 km on 45 L, } \\$1.80\\text{/L}",
      answer: "540",
      hint: "Work out the consumption per 100 km, then use it to find litres and cost.",
      explanation: "Consumption $= 45 \\div 540 \\times 100 = 8.\\overline{3}$ L/100 km. The trip uses 45 L, costing $45 \\times \\$1.80 = \\$81$. For a 300 km leg at the same rate: $45 \\div 540 \\times 300 = 25$ L.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the fuel consumption in L/100 km? Round to two decimal places.",
          latex: "45 \\div 540 \\times 100",
          marks: 1,
          answer: "8.33",
          acceptedAnswers: ["8.3", "25/3"],
          hint: "Divide litres by km, then multiply by 100.",
          explanation: "$45 \\div 540 \\times 100 = 8.\\overline{3} \\approx 8.33$ L/100 km.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the total cost of the petrol for the trip, in dollars?",
          latex: "45 \\times 1.80",
          marks: 1,
          answer: "$81",
          acceptedAnswers: ["81", "$81.00"],
          hint: "Multiply the litres used by the price per litre.",
          explanation: "$45 \\times \\$1.80 = \\$81$.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many litres would a 300 km journey use at the same consumption rate?",
          latex: "45 \\div 540 \\times 300",
          marks: 1,
          answer: "25",
          acceptedAnswers: ["25 L"],
          hint: "Use the per-km rate, then multiply by 300.",
          explanation: "$45 \\div 540 = 0.08\\overline{3}$ L/km. $0.08\\overline{3} \\times 300 = 25$ L.",
        },
      ],
    },
  ],
};

// ── Lesson 4: Speed, Distance and Time ───────────────────────────────────────

const speedDistanceTime: LessonContent = {
  description:
    "Apply the speed–distance–time relationship to find any variable, maintain unit consistency, solve timetable problems, and calculate average speed over multi-leg journeys.",
  learningIntention:
    "Use the relationship between speed, distance and time to solve a variety of practical problems.",
  successCriteria: [
    "State the formula $\\text{speed} = \\text{distance} \\div \\text{time}$ and rearrange it to find distance or time.",
    "Use the triangle method to select the correct formula for the unknown.",
    "Convert units so that speed, distance and time are consistent.",
    "Calculate average speed over a journey with multiple legs.",
    "Solve problems involving timetables and scheduled travel.",
  ],
  teaching: {
    paragraphs: [
      "Speed is just a rate — it tells you how much distance is covered in each unit of time. Saying a car goes at $60$ km/h means that, hour after hour, it adds $60$ km. So speed is distance shared out over time, which is why $\\text{speed} = \\frac{\\text{distance}}{\\text{time}}$.",
      "Picture a $300$ km drive that takes $5$ hours. To find the speed you spread the $300$ km evenly over the $5$ hours: $300 \\div 5 = 60$ km in each hour, so $60$ km/h. The division is doing the same 'amount per one unit' job as any unit rate from the last lesson — distance is the first quantity, time is the second.",
      "From that one relationship you can recover the other two formulas without memorising them. If $\\text{speed} = \\frac{\\text{distance}}{\\text{time}}$, then multiplying both sides by time gives $\\text{distance} = \\text{speed} \\times \\text{time}$ — sensible, since each hour adds 'speed' km, so $t$ hours add $s \\times t$ km. Dividing instead gives $\\text{time} = \\frac{\\text{distance}}{\\text{speed}}$ — how many speed-sized chunks of distance you must cover. The triangle (D on top, S and T below) is just a picture of these three: cover the one you want and read off the rest.",
      "Units must agree, and the formula itself tells you why. The 'h' in km/h is a denominator, so a time you plug in must be in hours to cancel it; feed in minutes and the units no longer match. To travel $90$ km at $60$ km/h takes $90 \\div 60 = 1.5$ hours — not $90$ minutes by accident. When a time is given in minutes, divide by $60$ to convert to hours first.",
      "Average speed over a journey with several legs is total distance divided by total time — never the average of the leg speeds. Here is why averaging the speeds fails: speed is distance per time, and you can only add up a 'per time' quantity fairly if each piece covers the same time. Drive $90$ km at $60$ km/h ($1.5$ h) then $90$ km at $90$ km/h ($1$ h): the slow leg lasts longer, so it pulls the true average toward the slow end. Total distance $\\div$ total time $= 180 \\div 2.5 = 72$ km/h, not the tempting $\\frac{60+90}{2} = 75$. Add all the distances and all the times separately, then divide once.",
      "For timetable questions, the only extra step is finding the duration: subtract the departure time from the arrival time, convert any minutes into hours, then use the speed–distance relationship as usual. In exams these appear as train and flight schedules, multi-leg road trips with rest stops, and m/s ↔ km/h conversions layered on top.",
    ],
    latexBlocks: [
      "\\text{speed} = \\frac{\\text{distance}}{\\text{time}}",
      "\\text{distance} = \\text{speed} \\times \\text{time}",
      "\\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
      "\\text{average speed} = \\frac{\\text{total distance}}{\\text{total time}} \\;\\neq\\; \\text{average of the speeds}",
    ],
  },
  workedExamples: [
    {
      title: "Find distance from speed and time",
      questionLatex: "\\text{A train travels at 120 km/h for 2.5 hours. Find the distance.}",
      steps: [
        { explanation: "Distance is wanted, so use distance = speed × time.", latex: "d = s \\times t = 120 \\times 2.5" },
        { explanation: "Multiply: each hour adds 120 km, over 2.5 hours.", latex: "d = 300 \\text{ km}" },
      ],
      finalAnswerLatex: "d = 300 \\text{ km}",
    } as WorkedExample,
    {
      title: "Find time from speed and distance",
      questionLatex: "\\text{How long does it take to travel 270 km at 90 km/h?}",
      steps: [
        { explanation: "Time is wanted, so use time = distance ÷ speed.", latex: "t = \\frac{d}{s} = \\frac{270}{90}" },
        { explanation: "Divide: count how many 90 km chunks fit into 270 km.", latex: "t = 3 \\text{ hours}" },
      ],
      finalAnswerLatex: "t = 3 \\text{ hours}",
    } as WorkedExample,
    {
      title: "Convert minutes before using the formula",
      questionLatex: "\\text{A bus travels at 60 km/h. How far does it go in 45 minutes?}",
      steps: [
        { explanation: "The speed is in km/h, so the time must be in hours — convert 45 minutes.", latex: "45 \\div 60 = 0.75 \\text{ h}" },
        { explanation: "Now apply distance = speed × time with matching units.", latex: "d = 60 \\times 0.75" },
        { explanation: "Multiply to get the distance.", latex: "d = 45 \\text{ km}" },
      ],
      finalAnswerLatex: "d = 45 \\text{ km}",
    } as WorkedExample,
    {
      title: "Average speed over two legs (harder)",
      questionLatex: "\\text{A car drives 90 km at 60 km/h, then 90 km at 90 km/h. Find the average speed.}",
      steps: [
        { explanation: "Average speed needs total time, so find each leg's time separately. Leg 1:", latex: "90 \\div 60 = 1.5 \\text{ h}" },
        { explanation: "Leg 2 time.", latex: "90 \\div 90 = 1 \\text{ h}" },
        { explanation: "Add the distances for the total distance.", latex: "90 + 90 = 180 \\text{ km}" },
        { explanation: "Add the times for the total time.", latex: "1.5 + 1 = 2.5 \\text{ h}" },
        { explanation: "Divide total distance by total time — not the average of 60 and 90.", latex: "\\frac{180}{2.5} = 72 \\text{ km/h}" },
      ],
      finalAnswerLatex: "\\text{average speed} = 72 \\text{ km/h}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-rtr-sdt-g1",
      "Which formula correctly gives the time taken for a journey?",
      "D",
      [
        "\\(\\text{time} = \\text{speed} \\times \\text{distance}\\)",
        "\\(\\text{time} = \\text{speed} + \\text{distance}\\)",
        "\\(\\text{time} = \\text{distance} \\times \\text{speed}\\)",
        "\\(\\text{time} = \\text{distance} \\div \\text{speed}\\)",
      ],
      "Rearranging $s = \\frac{d}{t}$ gives $t = \\frac{d}{s} = d \\div s$.",
      "Start from $s = \\frac{d}{t}$ and rearrange to make $t$ the subject.",
    ),
    answer(
      "y8-rtr-sdt-g2",
      "A car travels at 80 km/h for 3 hours. How far does it travel?",
      "d = 80 \\times 3 = \\;?",
      "240",
      "$d = s \\times t = 80 \\times 3 = 240$ km.",
      "Use $d = s \\times t$.",
      ["240 km"],
    ),
    answer(
      "y8-rtr-sdt-g3",
      "A runner completes 12 km in 1.5 hours. What is her average speed in km/h?",
      "s = 12 \\div 1.5 = \\;?",
      "8",
      "$s = \\frac{d}{t} = \\frac{12}{1.5} = 8$ km/h.",
      "Use $s = \\frac{d}{t}$.",
      ["8 km/h"],
    ),
    answer(
      "y8-rtr-sdt-g4",
      "How long does it take to travel 330 km at 110 km/h? Give your answer in hours.",
      "t = 330 \\div 110 = \\;?",
      "3",
      "$t = \\frac{d}{s} = \\frac{330}{110} = 3$ hours.",
      "Use $t = \\frac{d}{s}$.",
      ["3 hours"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-rtr-sdt-i1",
      "A bus travels at 60 km/h. How far does it travel in 45 minutes?",
      "d = 60 \\times \\frac{45}{60} = \\;?",
      "45",
      "Convert 45 minutes to hours: $\\frac{45}{60} = 0.75$ h. $d = 60 \\times 0.75 = 45$ km.",
      "Convert the time to hours before using the formula.",
      ["45 km"],
    ),
    answer(
      "y8-rtr-sdt-i2",
      "A plane flies 1800 km at a speed of 600 km/h. How long is the flight in hours?",
      "t = 1800 \\div 600 = \\;?",
      "3",
      "$t = \\frac{1800}{600} = 3$ hours.",
      "Use $t = \\frac{d}{s}$.",
      ["3 hours"],
    ),
    answer(
      "y8-rtr-sdt-i3",
      "A train leaves at 09:20 and arrives at 11:50. It travels 195 km. Find its average speed in km/h.",
      "s = 195 \\div 2.5 = \\;?",
      "78",
      "Travel time $= 11\\text{:}50 - 09\\text{:}20 = 2$ h $30$ min $= 2.5$ h. Speed $= 195 \\div 2.5 = 78$ km/h.",
      "Find the travel time from the timetable, then use $s = \\frac{d}{t}$.",
      ["78 km/h"],
    ),
    answer(
      "y8-rtr-sdt-i4",
      "On a road trip, Zara drives 150 km at 75 km/h and then 120 km at 60 km/h. Find her average speed for the whole trip in km/h.",
      "\\text{Average speed} = \\;?",
      "67.5",
      "Time for leg 1: $150 \\div 75 = 2$ h. Time for leg 2: $120 \\div 60 = 2$ h. Total: $270$ km in $4$ h. Average speed $= 270 \\div 4 = 67.5$ km/h.",
      "Find the time for each leg, then calculate total distance ÷ total time.",
      ["67.5 km/h"],
    ),
    choice(
      "y8-rtr-sdt-i5",
      "A student says the average speed for two legs is $\\frac{60 + 80}{2} = 70$ km/h. When is this correct?",
      "B",
      [
        "Always",
        "Only when the two legs take the same amount of time",
        "Only when the two legs cover the same distance",
        "Never",
      ],
      "Averaging speeds is only valid when each leg takes the same time. When the times differ, you must use total distance ÷ total time.",
      "Think about what conditions would make averaging the speeds give the correct answer.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using minutes instead of hours in a formula that uses km/h: travelling 90 km at 60 km/h takes 90 min, not 1.5 h.",
      fix: "Always convert time to the same unit as the speed denominator. If speed is in km/h, time must be in hours.",
    },
    {
      mistake: "Calculating average speed as the mean of the individual speeds over each leg.",
      fix: "Average speed $=$ total distance $\\div$ total time. Add up all distances and all times separately before dividing.",
    },
    {
      mistake: "Rearranging the formula incorrectly — for example, writing $d = t \\div s$ instead of $d = s \\times t$.",
      fix: "Use the triangle: cover the quantity you want to find and read off the operation for the remaining two variables.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-rtr-sdt-m1",
      "How far does a car travel at 95 km/h in 4 hours?",
      "d = 95 \\times 4 = \\;?",
      "380",
      "$d = 95 \\times 4 = 380$ km.",
      "Use $d = s \\times t$.",
      ["380 km"],
    ),
    answer(
      "y8-rtr-sdt-m2",
      "A cyclist rides 48 km in 2.5 hours. Find the average speed in km/h.",
      "s = 48 \\div 2.5 = \\;?",
      "19.2",
      "$s = 48 \\div 2.5 = 19.2$ km/h.",
      "Use $s = \\frac{d}{t}$.",
      ["19.2 km/h"],
    ),
    choice(
      "y8-rtr-sdt-m3",
      "A car travels at 100 km/h. How long does it take to travel 250 km?",
      "B",
      ["2 h", "2 h 30 min", "3 h", "1 h 30 min"],
      "$t = 250 \\div 100 = 2.5$ hours $= 2$ h $30$ min.",
      "Use $t = \\frac{d}{s}$ and then convert the decimal hours to minutes.",
    ),
    answer(
      "y8-rtr-sdt-m4",
      "A bus leaves at 07:45 and arrives at 10:15, covering 195 km. What is the average speed in km/h?",
      "s = 195 \\div 2.5 = \\;?",
      "78",
      "Journey time $= 2$ h $30$ min $= 2.5$ h. Speed $= 195 \\div 2.5 = 78$ km/h.",
      "Find the journey time from the timetable, then apply $s = \\frac{d}{t}$.",
      ["78 km/h"],
    ),
    answer(
      "y8-rtr-sdt-m5",
      "A plane flies at 900 km/h. How long (in minutes) does it take to cover 300 km?",
      "t = 300 \\div 900 \\text{ h} = \\;? \\text{ min}",
      "20",
      "$t = \\frac{300}{900} = \\frac{1}{3}$ h $= 20$ minutes.",
      "Find the time in hours first, then convert to minutes by multiplying by 60.",
      ["20 minutes"],
    ),
    answer(
      "y8-rtr-sdt-m6",
      "A hiker walks 12 km in 2.5 h, then rests for 30 min, then walks a further 8 km in 1.5 h. What is the average speed for the entire trip (including the rest)?",
      "\\text{Average speed} = \\;?",
      "4.44",
      "Total distance $= 12 + 8 = 20$ km. Total time $= 2.5 + 0.5 + 1.5 = 4.5$ h. Average speed $= 20 \\div 4.5 \\approx 4.44$ km/h.",
      "Include the rest time in the total time when calculating average speed for the whole trip.",
      ["4.4", "40/9"],
    ),
    answer(
      "y8-rtr-sdt-m7",
      "A car travels 90 km at 60 km/h and then 90 km at 90 km/h. Find the average speed for the whole journey.",
      "\\text{Average speed} = \\;?",
      "72",
      "Time for leg 1: $90 \\div 60 = 1.5$ h. Time for leg 2: $90 \\div 90 = 1$ h. Total: $180$ km in $2.5$ h. Average speed $= 180 \\div 2.5 = 72$ km/h.",
      "Do not average the speeds directly — find total distance ÷ total time.",
      ["72 km/h"],
    ),
    answer(
      "y8-rtr-sdt-m8",
      "A train travels at 54 km/h. Convert this to m/s, then find how far it travels in 20 seconds.",
      "\\text{Distance in 20 s} = \\;?",
      "300",
      "$54 \\text{ km/h} = 54 \\times \\frac{5}{18} = 15$ m/s. Distance $= 15 \\times 20 = 300$ m.",
      "Convert the speed to m/s first, then use $d = s \\times t$.",
      ["300 m"],
    ),
    choice(
      "y8-rtr-sdt-m9",
      "Alana catches the 08:12 train, which arrives at 09:42. The train travels at an average speed of 80 km/h. Which is the closest distance to the destination?",
      "C",
      ["80 km", "100 km", "120 km", "160 km"],
      "Travel time $= 1$ h $30$ min $= 1.5$ h. Distance $= 80 \\times 1.5 = 120$ km.",
      "Find the travel time from the timetable, then use $d = s \\times t$.",
    ),
    answer(
      "y8-rtr-sdt-m10",
      "A rally car completes three stages: 80 km in 40 min, 120 km in 1 h, and 60 km in 30 min. A rest stop of 15 min occurs between each stage. Find the average speed over the entire event, including rest stops. Round to 1 decimal place.",
      "\\text{Average speed} = \\;?",
      "104.0",
      "Total distance $= 80 + 120 + 60 = 260$ km. Stage times: $\\frac{40}{60} + 1 + \\frac{30}{60} = 2$ h. Rest stops: $2 \\times \\frac{15}{60} = 0.5$ h. Total time $= 2.5$ h. Average speed $= 260 \\div 2.5 = 104$ km/h — wait, recalculate: $2 \\times 0.25 = 0.5$ h rest, total $2.5$ h, $260 \\div 2.5 = 104$ km/h. Rounding: $104.0$ km/h.",
      "Add up all stage times and rest times separately, then divide total distance by total time.",
      ["104", "104.0"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y8-rtr-sdt-p01", "How far does a car travel at 50 km/h for 2 hours?", "d = 50 \\times 2 = \\;?", "100", "$d = 50 \\times 2 = 100$ km.", "Use $d = s \\times t$.", ["100 km"]), 1),
    withDifficulty(answer("y8-rtr-sdt-p02", "A runner covers 10 km in 2 hours. What is the average speed in km/h?", "s = 10 \\div 2 = \\;?", "5", "$s = 10 \\div 2 = 5$ km/h.", "Use $s = d \\div t$.", ["5 km/h"]), 1),
    withDifficulty(choice("y8-rtr-sdt-p03", "Which formula finds distance?", "B", ["$d = s \\div t$", "$d = s \\times t$", "$d = t \\div s$", "$d = s + t$"], "Distance $=$ speed $\\times$ time.", "Rearrange $s = d \\div t$ to make $d$ the subject."), 1),
    withDifficulty(answer("y8-rtr-sdt-p04", "How long to travel 200 km at 100 km/h? Give your answer in hours.", "t = 200 \\div 100 = \\;?", "2", "$t = 200 \\div 100 = 2$ hours.", "Use $t = d \\div s$.", ["2 hours"]), 1),
    withDifficulty(answer("y8-rtr-sdt-p05", "A car travels at 60 km/h for 3 hours. How far?", "d = 60 \\times 3 = \\;?", "180", "$d = 60 \\times 3 = 180$ km.", "Use $d = s \\times t$.", ["180 km"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y8-rtr-sdt-p06", "A cyclist rides 36 km in 1.5 hours. Find the average speed in km/h.", "s = 36 \\div 1.5 = \\;?", "24", "$s = 36 \\div 1.5 = 24$ km/h.", "Use $s = d \\div t$.", ["24 km/h"]), 2),
    withDifficulty(answer("y8-rtr-sdt-p07", "A plane flies 2400 km at 800 km/h. How long is the flight in hours?", "t = 2400 \\div 800 = \\;?", "3", "$t = 2400 \\div 800 = 3$ hours.", "Use $t = d \\div s$.", ["3 hours"]), 2),
    withDifficulty(choice("y8-rtr-sdt-p08", "How far does a train travel at 120 km/h in 2.5 hours?", "C", ["240 km", "280 km", "300 km", "360 km"], "$d = 120 \\times 2.5 = 300$ km.", "Use $d = s \\times t$."), 2),
    withDifficulty(answer("y8-rtr-sdt-p09", "A bus travels at 80 km/h. How far in 1.5 hours?", "d = 80 \\times 1.5 = \\;?", "120", "$d = 80 \\times 1.5 = 120$ km.", "Use $d = s \\times t$.", ["120 km"]), 2),
    withDifficulty(answer("y8-rtr-sdt-p10", "A car covers 105 km in 1.5 hours. Find its speed in km/h.", "s = 105 \\div 1.5 = \\;?", "70", "$s = 105 \\div 1.5 = 70$ km/h.", "Use $s = d \\div t$.", ["70 km/h"]), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y8-rtr-sdt-p11", "A car travels at 72 km/h. How far in 45 minutes? Give your answer in km.", "\\text{Distance} = \\;?", "54", "45 min $= 0.75$ h. $d = 72 \\times 0.75 = 54$ km.", "Convert minutes to hours first.", ["54 km"]), 3),
    withDifficulty(answer("y8-rtr-sdt-p12", "A plane flies at 900 km/h. How long (in minutes) to cover 450 km?", "\\text{Time (min)} = \\;?", "30", "$t = 450 \\div 900 = 0.5$ h $= 30$ min.", "Find the time in hours, then convert to minutes.", ["30 minutes"]), 3),
    withDifficulty(choice("y8-rtr-sdt-p13", "A car travels at 100 km/h. How long to travel 150 km?", "B", ["1 h", "1 h 30 min", "2 h", "2 h 30 min"], "$t = 150 \\div 100 = 1.5$ h $= 1$ h $30$ min.", "Use $t = d \\div s$, then convert the decimal to minutes."), 3),
    withDifficulty(answer("y8-rtr-sdt-p14", "A train leaves at 10:15 and arrives at 12:45, travelling 200 km. Find the average speed in km/h.", "\\text{Speed} = \\;?", "80", "Time $= 2.5$ h. $s = 200 \\div 2.5 = 80$ km/h.", "Find the journey time first.", ["80 km/h"]), 3),
    withDifficulty(answer("y8-rtr-sdt-p15", "A hiker walks 9 km in 1.5 h, then 6 km in 1.5 h. Find the average speed for the whole walk in km/h.", "\\text{Average speed} = \\;?", "5", "Total $= 15$ km in $3$ h. $15 \\div 3 = 5$ km/h.", "Use total distance ÷ total time.", ["5 km/h"]), 3),
    withDifficulty(answer("y8-rtr-sdt-p16", "Convert $90$ km/h to m/s, then find the distance in 12 seconds.", "\\text{Distance} = \\;?", "300", "$90 \\text{ km/h} = 25$ m/s. $25 \\times 12 = 300$ m.", "Convert to m/s, then use $d = s \\times t$.", ["300 m"]), 3),
    withDifficulty(answer("y8-rtr-sdt-p17", "A car travels 60 km at 60 km/h then 60 km at 120 km/h. Find the average speed for the trip in km/h.", "\\text{Average speed} = \\;?", "80", "Times: $1$ h and $0.5$ h. Total $120$ km in $1.5$ h. $120 \\div 1.5 = 80$ km/h.", "Find each leg's time, then total distance ÷ total time.", ["80 km/h"]), 3),
    // ── Difficulty 4 ──
    withDifficulty(answer("y8-rtr-sdt-p18", "On a trip, Mia drives 180 km at 90 km/h then 100 km at 50 km/h. Find the average speed in km/h.", "\\text{Average speed} = \\;?", "70", "Times: $2$ h and $2$ h. Total $280$ km in $4$ h. $280 \\div 4 = 70$ km/h.", "Find each leg's time, then total distance ÷ total time.", ["70 km/h"]), 4),
    withDifficulty(answer("y8-rtr-sdt-p19", "A walker covers 8 km in 2 h, rests 30 min, then 6 km in 1.5 h. Find the average speed (including the rest) in km/h.", "\\text{Average speed} = \\;?", "3.5", "Total $14$ km. Total time $= 2 + 0.5 + 1.5 = 4$ h. $14 \\div 4 = 3.5$ km/h.", "Include the rest in the total time.", ["3.5 km/h"]), 4),
    withDifficulty(choice("y8-rtr-sdt-p20", "A train at 80 km/h leaves at 08:00. At what time has it travelled 200 km?", "C", ["09:30", "10:00", "10:30", "11:00"], "$t = 200 \\div 80 = 2.5$ h. $08{:}00 + 2$ h $30$ min $= 10{:}30$.", "Find the time taken, then add it to the departure time."), 4),
    withDifficulty(answer("y8-rtr-sdt-p21", "A car travels at 54 km/h. Convert to m/s, then find how far it goes in 25 seconds.", "\\text{Distance} = \\;?", "375", "$54 \\text{ km/h} = 15$ m/s. $15 \\times 25 = 375$ m.", "Convert to m/s first.", ["375 m"]), 4),
    withDifficulty(answer("y8-rtr-sdt-p22", "Two towns are 240 km apart. A car leaves at 09:00 at 60 km/h; another leaves the same town at 10:00 at 80 km/h on the same road. The second catches the first after how many hours of the second car's travel?", "\\text{Hours (second car)} = \\;?", "3", "At 10:00 the first car is 60 km ahead. Gap closes at $80 - 60 = 20$ km/h. Time $= 60 \\div 20 = 3$ h.", "Find the head start distance, then divide by the closing speed.", ["3 hours"]), 4),
    // ── Difficulty 5 ──
    withDifficulty(answer("y8-rtr-sdt-p23", "A rally has three stages: 90 km in 1 h, 60 km in 45 min, and 75 km in 1.25 h, with a 30 min rest between consecutive stages. Find the average speed over the whole event (including rests), to 1 decimal place.", "\\text{Average speed} = \\;?", "50.0", "Total distance $= 225$ km. Stage times $= 1 + 0.75 + 1.25 = 3$ h. Rests $= 2 \\times 0.5 = 1$ h. Total $= 4.5$ h. $225 \\div 4.5 = 50$ km/h.", "Add all stage times and rest times, then divide total distance by total time.", ["50", "50.0 km/h"]), 5),
    withDifficulty(answer("y8-rtr-sdt-p24", "A cyclist rides at 24 km/h for the first half of a journey's distance and 16 km/h for the second half. The whole journey is 96 km. Find the average speed for the whole trip in km/h.", "\\text{Average speed} = \\;?", "19.2", "Each half $= 48$ km. Times $= 48 \\div 24 = 2$ h and $48 \\div 16 = 3$ h. Total $96$ km in $5$ h. $96 \\div 5 = 19.2$ km/h.", "Find the time for each half, then total distance ÷ total time.", ["19.2 km/h"]), 5),
    withDifficulty(choice("y8-rtr-sdt-p25", "A train travels 300 km. If it had gone 10 km/h faster, the trip would have taken 1 hour less. What was the original speed?", "B", ["40 km/h", "50 km/h", "60 km/h", "75 km/h"], "At 50 km/h: $300 \\div 50 = 6$ h. At 60 km/h: $300 \\div 60 = 5$ h, which is 1 h less. So the original speed was 50 km/h.", "Test each option: check whether going 10 km/h faster saves exactly 1 hour."), 5),
    withDifficulty(answer("y8-rtr-sdt-p26", "A bus leaves at 08:20 and is scheduled to arrive at 11:05, covering 220 km. It is delayed and arrives 15 minutes late. Find the actual average speed in km/h, to 1 decimal place.", "\\text{Actual average speed} = \\;?", "73.3", "Scheduled time $= 2$ h $45$ min. Actual $= 3$ h $= 3$ h. $220 \\div 3 = 73.\\overline{3} \\approx 73.3$ km/h.", "Add the delay to the scheduled time to get the actual time.", ["73.3 km/h"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y8-rtr-sdt-mp1",
      prompt: "A family drives from home to a holiday town. The first leg is 150 km at an average speed of 75 km/h. After a 30-minute lunch stop, the second leg is 120 km at an average speed of 80 km/h.",
      latex: "\\text{Leg 1: 150 km at 75 km/h; Leg 2: 120 km at 80 km/h}",
      answer: "270",
      hint: "Find each leg's time, add the rest, then use total distance ÷ total time for the average.",
      explanation: "Leg 1 time $= 150 \\div 75 = 2$ h. Leg 2 time $= 120 \\div 80 = 1.5$ h. Total distance $= 270$ km. Total time including the 0.5 h stop $= 2 + 0.5 + 1.5 = 4$ h. Average speed $= 270 \\div 4 = 67.5$ km/h.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How long does the first leg take, in hours?",
          latex: "150 \\div 75",
          marks: 1,
          answer: "2",
          acceptedAnswers: ["2 hours", "2 h"],
          hint: "Use $t = d \\div s$.",
          explanation: "$t = 150 \\div 75 = 2$ hours.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How long does the second leg take, in hours?",
          latex: "120 \\div 80",
          marks: 1,
          answer: "1.5",
          acceptedAnswers: ["1.5 hours", "1 h 30 min"],
          hint: "Use $t = d \\div s$.",
          explanation: "$t = 120 \\div 80 = 1.5$ hours.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the total distance travelled, in km?",
          latex: "150 + 120",
          marks: 1,
          answer: "270",
          acceptedAnswers: ["270 km"],
          hint: "Add the two leg distances.",
          explanation: "$150 + 120 = 270$ km.",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "What is the average speed for the whole journey, including the lunch stop, in km/h?",
          latex: "270 \\div (2 + 0.5 + 1.5)",
          marks: 1,
          answer: "67.5",
          acceptedAnswers: ["67.5 km/h"],
          hint: "Total distance ÷ total time, and include the 30-minute stop in the time.",
          explanation: "Total time $= 2 + 0.5 + 1.5 = 4$ h. Average speed $= 270 \\div 4 = 67.5$ km/h.",
        },
      ],
    },
  ],
};

// ── Lesson 5: Scale Drawings ──────────────────────────────────────────────────

const scaleDrawings: LessonContent = {
  description:
    "Interpret scale notation, convert between scale and actual lengths, solve map problems, and determine the scale given both a drawing length and an actual length.",
  learningIntention:
    "Use scale notation to convert between measurements on a drawing or map and real-world distances.",
  successCriteria: [
    "Interpret a scale written as $1:n$ and explain what it means.",
    "Convert a length on a scale drawing to the actual length by multiplying by the scale factor.",
    "Convert an actual length to a scale-drawing length by dividing by the scale factor.",
    "Find the scale given a drawing length and the corresponding actual length.",
    "Solve map problems involving distances and scale.",
  ],
  teaching: {
    paragraphs: [
      "A scale drawing shows a real object shrunk down so it fits on paper, while keeping every length in the same proportion. A scale is just a ratio between a length on the drawing and the matching real length. It is the recipe that connects the two worlds: the small drawing and the full-size reality.",
      "The scale $1:200$ means every $1$ unit on the drawing stands for $200$ of the same units in real life. The two sides must use the same unit, so $1$ cm on a plan represents $200$ cm — which is $2$ m — of the actual building. The number after the colon, called the scale factor, is simply how many times bigger reality is than the drawing.",
      "To go from drawing to reality, multiply by the scale factor; to go from reality to drawing, divide by it. This follows straight from the ratio. If drawing : actual is $1:200$, then actual is $200$ times the drawing, so multiplying a drawing length by $200$ gives the real length, and dividing a real length by $200$ gives the drawing length. They are inverse operations because one direction enlarges and the other shrinks. For a $1:50$ plan, a $6$ cm room is really $6 \\times 50 = 300$ cm; an $8$ m $= 800$ cm wall on a $1:200$ plan is drawn $800 \\div 200 = 4$ cm.",
      "To find the scale itself, write drawing length : actual length in the same unit, then simplify so the first part is $1$. If a $3$ cm line on a map represents $6$ km, first convert $6$ km to $600\\,000$ cm, giving $3:600\\,000$; dividing both parts by $3$ gives $1:200\\,000$. Simplifying to $1:n$ is the same 'divide both parts' move from the ratios lesson — it just rewrites the comparison so one drawing unit sits on the left.",
      "The matching-units rule is where most marks are lost, so do the conversion before you do the arithmetic. A scale is a pure ratio with no units attached, which only works if both lengths are measured the same way. Mixing $3$ cm with $6$ km directly would compare centimetres against kilometres and give an answer wrong by a factor of $100\\,000$ — always convert km or m down to a single common unit first.",
      "In exams, scale drawings show up as floor plans, maps measured in km, and 'find the real distance / find the scale' questions. Every one of them is the same three-way link: drawing length, scale factor, and actual length — know any two and you can find the third by multiplying or dividing.",
    ],
    latexBlocks: [
      "\\text{scale } 1:n \\;\\Rightarrow\\; \\text{real length is } n \\text{ times the drawing length}",
      "\\text{actual length} = \\text{drawing length} \\times n",
      "\\text{drawing length} = \\frac{\\text{actual length}}{n}",
      "\\text{scale} = \\text{drawing} : \\text{actual} \\;(\\text{same unit}),\\; \\text{simplified to } 1:n",
    ],
  },
  workedExamples: [
    {
      title: "Find the actual length from a scale drawing",
      questionLatex: "\\text{A floor plan uses a scale of }1:50.\\text{ A room measures 8 cm on the plan. Find the actual length.}",
      steps: [
        { explanation: "Reality is 50 times the drawing, so multiply the drawing length by the scale factor.", latex: "8 \\times 50" },
        { explanation: "Work out the product to get the length in centimetres.", latex: "8 \\times 50 = 400 \\text{ cm}" },
        { explanation: "Convert to metres, since 100 cm = 1 m.", latex: "400 \\text{ cm} = 4 \\text{ m}" },
      ],
      finalAnswerLatex: "\\text{actual length} = 4 \\text{ m}",
    } as WorkedExample,
    {
      title: "Find the drawing length from an actual measurement",
      questionLatex: "\\text{A building is 15 m long. Draw it using a scale of }1:300.",
      steps: [
        { explanation: "Convert to a common unit first — the scale needs both lengths in the same unit.", latex: "15 \\text{ m} = 1500 \\text{ cm}" },
        { explanation: "Going from reality to drawing means dividing by the scale factor.", latex: "1500 \\div 300" },
        { explanation: "Do the division to get the drawing length.", latex: "1500 \\div 300 = 5 \\text{ cm}" },
      ],
      finalAnswerLatex: "5 \\text{ cm on the drawing}",
    } as WorkedExample,
    {
      title: "Find the scale from measurements (harder)",
      questionLatex: "\\text{A 4 cm line on a map represents an actual distance of 20 km. Find the scale.}",
      steps: [
        { explanation: "Convert the real distance to the same unit as the drawing (cm).", latex: "20 \\text{ km} = 2\\,000\\,000 \\text{ cm}" },
        { explanation: "Write the comparison as drawing : actual.", latex: "4 : 2\\,000\\,000" },
        { explanation: "Simplify so the first part is 1 by dividing both parts by 4.", latex: "4 \\div 4 : 2\\,000\\,000 \\div 4" },
        { explanation: "Read off the scale.", latex: "= 1 : 500\\,000" },
      ],
      finalAnswerLatex: "\\text{scale} = 1 : 500\\,000",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-rtr-scl-g1",
      "A scale of $1:100$ means:",
      "C",
      [
        "1 m on the drawing equals 100 m in reality",
        "1 cm on the drawing equals 1 m in reality",
        "1 cm on the drawing equals 100 cm in reality",
        "1 mm on the drawing equals 100 m in reality",
      ],
      "The scale $1:100$ means 1 unit on the drawing equals 100 of the same units in reality. So 1 cm on the drawing equals 100 cm in reality.",
      "The units on both sides of the ratio must match.",
    ),
    answer(
      "y8-rtr-scl-g2",
      "A room measures 6 cm on a floor plan drawn to the scale $1:50$. What is the actual length of the room in metres?",
      "\\text{Actual length} = 6 \\times 50 = \\;?",
      "3",
      "Actual length $= 6 \\times 50 = 300$ cm $= 3$ m.",
      "Multiply the drawing length by the scale factor, then convert cm to m.",
      ["3 m"],
    ),
    answer(
      "y8-rtr-scl-g3",
      "A road is 2.4 km long. On a map with scale $1:40\\,000$, what length does the road appear in centimetres?",
      "\\text{Drawing length} = \\;?",
      "6",
      "$2.4 \\text{ km} = 240\\,000 \\text{ cm}$. Drawing length $= 240\\,000 \\div 40\\,000 = 6$ cm.",
      "Convert the actual distance to centimetres first, then divide by the scale factor.",
      ["6 cm"],
    ),
    answer(
      "y8-rtr-scl-g4",
      "On an architectural plan, a wall of 5 cm represents an actual length of 10 m. Write the scale in the form $1:n$.",
      "\\text{Scale} = 1:\\;?",
      "1:200",
      "$10 \\text{ m} = 1000 \\text{ cm}$. Scale $= 5:1000 = 1:200$.",
      "Convert the actual length to cm and divide by the drawing length.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-rtr-scl-i1",
      "A swimming pool is 7 cm long on a plan drawn to the scale $1:250$. What is the actual length in metres?",
      "\\text{Actual length} = \\;?",
      "17.5",
      "Actual length $= 7 \\times 250 = 1750$ cm $= 17.5$ m.",
      "Multiply the drawing length by the scale factor, then convert to metres.",
      ["17.5 m"],
    ),
    answer(
      "y8-rtr-scl-i2",
      "A map has a scale of $1:25\\,000$. Two towns are 8 cm apart on the map. How many kilometres apart are they in reality?",
      "\\text{Actual distance} = \\;?",
      "2",
      "Actual distance $= 8 \\times 25\\,000 = 200\\,000$ cm $= 2$ km.",
      "Multiply the map distance by the scale factor, then convert cm to km.",
      ["2 km"],
    ),
    answer(
      "y8-rtr-scl-i3",
      "A bridge is 480 m long. On a drawing using a scale of $1:6000$, what length should the bridge be drawn in centimetres?",
      "\\text{Drawing length} = \\;?",
      "8",
      "Actual length $= 480 \\text{ m} = 48\\,000 \\text{ cm}$. Drawing length $= 48\\,000 \\div 6000 = 8$ cm.",
      "Convert metres to centimetres first, then divide by the scale factor.",
      ["8 cm"],
    ),
    choice(
      "y8-rtr-scl-i4",
      "A 3 cm line on a map represents 9 km. What is the scale of the map?",
      "B",
      ["$1:3000$", "$1:300\\,000$", "$1:30\\,000$", "$1:3\\,000\\,000$"],
      "$9 \\text{ km} = 900\\,000 \\text{ cm}$. Scale $= 3:900\\,000 = 1:300\\,000$.",
      "Convert km to cm before dividing. $1 \\text{ km} = 100\\,000 \\text{ cm}$.",
    ),
    {
      ...answer(
        "y8-rtr-scl-i5",
        "A bedroom is 4 m by 3 m. It is drawn on a plan using a scale of $1:40$. The plan shows the room as the rectangle below. What is the area of the room on the plan in $\\text{cm}^2$?",
        "\\text{Area on plan} = \\;?",
        "75",
        "Drawing dimensions: length $= 400 \\div 40 = 10$ cm; width $= 300 \\div 40 = 7.5$ cm. Area $= 10 \\times 7.5 = 75 \\text{ cm}^2$.",
        "Convert each dimension to the drawing scale first, then calculate the area.",
        ["75 cm²"],
      ),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a bedroom at scale 1:40, drawn 10 cm long and 7.5 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 10, y: 0, rightAngle: true },
          { x: 10, y: 7.5, rightAngle: true },
          { x: 0, y: 7.5, rightAngle: true },
        ],
        edges: [{ label: "10 cm" }, { label: "7.5 cm" }, { label: "10 cm" }, { label: "7.5 cm" }],
        fill: "blue",
      },
    },
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to convert units before applying the scale — for example, using metres and centimetres together in the same calculation.",
      fix: "Always convert both measurements to the same unit (usually centimetres) before multiplying or dividing.",
    },
    {
      mistake: "Dividing the actual length by the drawing length without matching units, giving a scale in mixed or wrong units.",
      fix: "Convert the actual length to centimetres (or the same unit as the drawing) before forming the ratio.",
    },
    {
      mistake: "Dividing the drawing length by the scale factor to find the actual length (instead of multiplying).",
      fix: "Actual length $=$ drawing length $\\times$ scale factor. Dividing gives the drawing length from the actual, not the other way around.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-rtr-scl-m1",
      "A house plan is drawn at $1:100$. A corridor measures 4.5 cm on the plan. Find the actual length in metres.",
      "\\text{Actual length} = \\;?",
      "4.5",
      "Actual length $= 4.5 \\times 100 = 450$ cm $= 4.5$ m.",
      "Multiply the plan length by 100, then convert cm to m.",
      ["4.5 m"],
    ),
    answer(
      "y8-rtr-scl-m2",
      "A country's coast is 840 km long. On a map with scale $1:12\\,000\\,000$, how long is the coastline in centimetres?",
      "\\text{Map length} = \\;?",
      "7",
      "$840 \\text{ km} = 84\\,000\\,000 \\text{ cm}$. Map length $= 84\\,000\\,000 \\div 12\\,000\\,000 = 7$ cm.",
      "Convert km to cm, then divide by the scale factor.",
      ["7 cm"],
    ),
    choice(
      "y8-rtr-scl-m3",
      "A model car is built at a scale of $1:20$. The model is 23.5 cm long. How long is the actual car?",
      "C",
      ["$23.5$ cm", "$1.175$ m", "$4.7$ m", "$47$ m"],
      "Actual length $= 23.5 \\times 20 = 470$ cm $= 4.7$ m.",
      "Multiply the model length by the scale factor, then convert to metres.",
    ),
    answer(
      "y8-rtr-scl-m4",
      "On a map with scale $1:50\\,000$, two parks are 6.4 cm apart. Find the actual distance in kilometres.",
      "\\text{Actual distance} = \\;?",
      "3.2",
      "Actual $= 6.4 \\times 50\\,000 = 320\\,000$ cm $= 3.2$ km.",
      "Multiply by the scale factor, then convert cm to km.",
      ["3.2 km"],
    ),
    {
      ...answer(
        "y8-rtr-scl-m5",
        "A garden is 18 m by 12 m. A plan is drawn with a scale of $1:300$, shown below. What are the dimensions of the garden on the plan in centimetres?",
        "\\text{Dimensions on plan} = \\;?",
        "6 by 4",
        "$18 \\text{ m} = 1800 \\text{ cm}$; drawing: $1800 \\div 300 = 6$ cm. $12 \\text{ m} = 1200 \\text{ cm}$; drawing: $1200 \\div 300 = 4$ cm.",
        "Convert each dimension to cm, then divide by the scale factor.",
        ["6 cm by 4 cm", "6cm by 4cm"],
      ),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a garden at scale 1:300, drawn 6 cm long and 4 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, { label: "6 cm" }, { label: "4 cm" }],
        fill: "green",
      },
    },
    answer(
      "y8-rtr-scl-m6",
      "A 2 cm measurement on a technical drawing represents an actual length of 50 m. Find the scale in the form $1:n$.",
      "\\text{Scale} = 1:\\;?",
      "1:2500",
      "$50 \\text{ m} = 5000 \\text{ cm}$. Scale $= 2:5000 = 1:2500$.",
      "Convert the actual length to cm, then simplify the ratio.",
    ),
    answer(
      "y8-rtr-scl-m7",
      "Two cities are 450 km apart. On a map they appear 9 cm apart. What is the scale of the map?",
      "\\text{Scale} = 1:\\;?",
      "1:5000000",
      "$450 \\text{ km} = 45\\,000\\,000 \\text{ cm}$. Scale $= 9:45\\,000\\,000 = 1:5\\,000\\,000$.",
      "Convert km to cm, write the ratio, then simplify.",
      ["1:5 000 000"],
    ),
    {
      ...choice(
        "y8-rtr-scl-m8",
        "A floor plan is drawn at $1:200$. A bathroom is shown as the rectangle below, 2.5 cm by 1.5 cm. What is the actual area of the bathroom?",
        "B",
        ["$750 \\text{ cm}^2$", "$15 \\text{ m}^2$", "$7.5 \\text{ m}^2$", "$3 \\text{ m}^2$"],
        "Actual dimensions: $2.5 \\times 200 = 500$ cm $= 5$ m and $1.5 \\times 200 = 300$ cm $= 3$ m. Area $= 5 \\times 3 = 15 \\text{ m}^2$.",
        "Find the actual dimensions first, convert to metres, then calculate area.",
      ),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a bathroom at scale 1:200, drawn 2.5 cm long and 1.5 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 2.5, y: 0, rightAngle: true },
          { x: 2.5, y: 1.5, rightAngle: true },
          { x: 0, y: 1.5, rightAngle: true },
        ],
        edges: [{ label: "2.5 cm" }, { label: "1.5 cm" }, { label: "2.5 cm" }, { label: "1.5 cm" }],
        fill: "teal",
      },
    },
    {
      ...answer(
        "y8-rtr-scl-m9",
        "An architect draws a building to a scale of $1:500$. On the plan, a room appears as the rectangle below, $4.8 \\text{ cm} \\times 3.6 \\text{ cm}$. Find the actual area of the room in $\\text{m}^2$.",
        "\\text{Actual area} = \\;?",
        "432",
        "Actual dimensions: $4.8 \\times 500 = 2400$ cm $= 24$ m and $3.6 \\times 500 = 1800$ cm $= 18$ m. Area $= 24 \\times 18 = 432 \\text{ m}^2$.",
        "Find actual length and width in metres, then multiply for area.",
        ["432 m²"],
      ),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a room at scale 1:500, drawn 4.8 cm long and 3.6 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 4.8, y: 0, rightAngle: true },
          { x: 4.8, y: 3.6, rightAngle: true },
          { x: 0, y: 3.6, rightAngle: true },
        ],
        edges: [{ label: "4.8 cm" }, { label: "3.6 cm" }, { label: "4.8 cm" }, { label: "3.6 cm" }],
        fill: "blue",
      },
    },
    answer(
      "y8-rtr-scl-m10",
      "A city map has a scale of $1:250\\,000$. Fiona measures the distance between two suburbs as 7.2 cm. She then drives at 60 km/h. Using the map distance, estimate how long the drive takes in minutes.",
      "\\text{Time} = \\;?",
      "18",
      "Actual distance $= 7.2 \\times 250\\,000 = 1\\,800\\,000$ cm $= 18$ km. Time $= 18 \\div 60 = 0.3$ h $= 18$ minutes.",
      "Find the actual distance from the map, then use time = distance ÷ speed.",
      ["18 minutes"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──
    withDifficulty(answer("y8-rtr-scl-p01", "A scale of $1:100$ is used. A line is 3 cm on the plan. What is the actual length in cm?", "3 \\times 100 = \\;?", "300", "Actual $= 3 \\times 100 = 300$ cm.", "Multiply the drawing length by the scale factor.", ["300 cm"]), 1),
    withDifficulty(answer("y8-rtr-scl-p02", "A scale of $1:50$ is used. A line is 2 cm on the plan. What is the actual length in cm?", "2 \\times 50 = \\;?", "100", "Actual $= 2 \\times 50 = 100$ cm.", "Multiply by the scale factor.", ["100 cm"]), 1),
    withDifficulty(choice("y8-rtr-scl-p03", "A scale of $1:100$ means 1 cm on the drawing equals:", "B", ["10 cm", "100 cm", "1000 cm", "1 cm"], "1 cm represents 100 cm in reality.", "The units on both sides of the ratio must match."), 1),
    withDifficulty(answer("y8-rtr-scl-p04", "A scale of $1:20$ is used. The actual length is 200 cm. What is the drawing length in cm?", "200 \\div 20 = \\;?", "10", "Drawing $= 200 \\div 20 = 10$ cm.", "Divide the actual length by the scale factor.", ["10 cm"]), 1),
    withDifficulty(answer("y8-rtr-scl-p05", "A model is built at $1:10$. The model is 5 cm long. How long is the actual object in cm?", "5 \\times 10 = \\;?", "50", "Actual $= 5 \\times 10 = 50$ cm.", "Multiply the model length by the scale factor.", ["50 cm"]), 1),
    // ── Difficulty 2 ──
    withDifficulty(answer("y8-rtr-scl-p06", "A plan is at $1:50$. A wall is 8 cm on the plan. Find the actual length in metres.", "\\text{Actual length} = \\;?", "4", "$8 \\times 50 = 400$ cm $= 4$ m.", "Multiply, then convert cm to m.", ["4 m"]), 2),
    withDifficulty(answer("y8-rtr-scl-p07", "A building is 12 m long. On a $1:200$ plan, how long is it in cm?", "\\text{Drawing length} = \\;?", "6", "$12 \\text{ m} = 1200$ cm; $1200 \\div 200 = 6$ cm.", "Convert m to cm first, then divide.", ["6 cm"]), 2),
    withDifficulty(choice("y8-rtr-scl-p08", "A plan is at $1:100$. A room is 5 cm on the plan. What is the actual length?", "C", ["50 cm", "1 m", "5 m", "50 m"], "$5 \\times 100 = 500$ cm $= 5$ m.", "Multiply by the scale factor, then convert cm to m."), 2),
    withDifficulty(answer("y8-rtr-scl-p09", "A map has scale $1:20\\,000$. Two points are 4 cm apart. Find the actual distance in km.", "\\text{Actual distance} = \\;?", "0.8", "$4 \\times 20\\,000 = 80\\,000$ cm $= 0.8$ km.", "Multiply, then convert cm to km.", ["0.8 km"]), 2),
    withDifficulty(answer("y8-rtr-scl-p10", "A 4 cm line on a plan represents 8 m. Write the scale as $1:n$.", "\\text{Scale} = 1:\\;?", "1:200", "$8 \\text{ m} = 800$ cm; $4:800 = 1:200$.", "Convert the actual length to cm, then simplify.", ["200"]), 2),
    // ── Difficulty 3 ──
    withDifficulty(answer("y8-rtr-scl-p11", "A pool is 6 cm on a $1:150$ plan. Find the actual length in metres.", "\\text{Actual length} = \\;?", "9", "$6 \\times 150 = 900$ cm $= 9$ m.", "Multiply, then convert to metres.", ["9 m"]), 3),
    withDifficulty(answer("y8-rtr-scl-p12", "A map has scale $1:25\\,000$. Two towns are 12 cm apart. Find the actual distance in km.", "\\text{Actual distance} = \\;?", "3", "$12 \\times 25\\,000 = 300\\,000$ cm $= 3$ km.", "Multiply, then convert cm to km.", ["3 km"]), 3),
    withDifficulty(choice("y8-rtr-scl-p13", "A 5 cm line on a map represents 15 km. What is the scale?", "B", ["$1:30\\,000$", "$1:300\\,000$", "$1:3\\,000\\,000$", "$1:3000$"], "$15 \\text{ km} = 1\\,500\\,000$ cm; $5:1\\,500\\,000 = 1:300\\,000$.", "Convert km to cm, then simplify the ratio."), 3),
    withDifficulty(answer("y8-rtr-scl-p14", "A road is 3.5 km long. On a $1:50\\,000$ map, how long is it in cm?", "\\text{Map length} = \\;?", "7", "$3.5 \\text{ km} = 350\\,000$ cm; $350\\,000 \\div 50\\,000 = 7$ cm.", "Convert km to cm, then divide.", ["7 cm"]), 3),
    withDifficulty(answer("y8-rtr-scl-p15", "A model car is at $1:25$. The model is 18 cm long. Find the actual length in metres.", "\\text{Actual length} = \\;?", "4.5", "$18 \\times 25 = 450$ cm $= 4.5$ m.", "Multiply, then convert to metres.", ["4.5 m"]), 3),
    withDifficulty(answer("y8-rtr-scl-p16", "A 2.5 cm line on a plan represents 5 m. Write the scale as $1:n$.", "\\text{Scale} = 1:\\;?", "1:200", "$5 \\text{ m} = 500$ cm; $2.5:500 = 1:200$.", "Convert to cm, then simplify.", ["200"]), 3),
    withDifficulty({
      ...answer("y8-rtr-scl-p17", "A garden is 9 m by 6 m. On a $1:150$ plan it is drawn as the rectangle below. What are its dimensions in cm?", "\\text{Plan dimensions} = \\;?", "6 by 4", "$900 \\div 150 = 6$ cm; $600 \\div 150 = 4$ cm.", "Convert each side to cm, then divide.", ["6 cm by 4 cm", "6 by 4 cm"]),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a garden at scale 1:150, drawn 6 cm long and 4 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, { label: "6 cm" }, { label: "4 cm" }],
        fill: "green",
      },
    }, 3),
    // ── Difficulty 4 ──
    withDifficulty({
      ...answer("y8-rtr-scl-p18", "A bedroom is 4 m by 5 m, drawn at $1:50$ as the rectangle below. Find the area of the room on the plan in cm².", "\\text{Plan area} = \\;?", "80", "$400 \\div 50 = 8$ cm; $500 \\div 50 = 10$ cm. Area $= 8 \\times 10 = 80$ cm².", "Convert each dimension to the plan, then multiply.", ["80 cm²"]),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a bedroom at scale 1:50, drawn 8 cm long and 10 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 10, rightAngle: true },
          { x: 0, y: 10, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "10 cm" }, { label: "8 cm" }, { label: "10 cm" }],
        fill: "blue",
      },
    }, 4),
    withDifficulty({
      ...choice("y8-rtr-scl-p19", "A floor plan is at $1:200$. A room shows as the rectangle below, 3 cm by 2 cm. What is its actual area?", "C", ["$6 \\text{ m}^2$", "$12 \\text{ m}^2$", "$24 \\text{ m}^2$", "$48 \\text{ m}^2$"], "Actual: $3 \\times 200 = 600$ cm $= 6$ m and $2 \\times 200 = 400$ cm $= 4$ m. Area $= 6 \\times 4 = 24$ m².", "Find each actual dimension in metres first, then multiply."),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a room at scale 1:200, drawn 3 cm long and 2 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 3, y: 0, rightAngle: true },
          { x: 3, y: 2, rightAngle: true },
          { x: 0, y: 2, rightAngle: true },
        ],
        edges: [{ label: "3 cm" }, { label: "2 cm" }, { label: "3 cm" }, { label: "2 cm" }],
        fill: "teal",
      },
    }, 4),
    withDifficulty(answer("y8-rtr-scl-p20", "Two cities are 360 km apart. On a map they are 8 cm apart. Find the scale as $1:n$.", "\\text{Scale} = 1:\\;?", "1:4500000", "$360 \\text{ km} = 36\\,000\\,000$ cm; $8:36\\,000\\,000 = 1:4\\,500\\,000$.", "Convert km to cm, then simplify.", ["4500000", "1:4 500 000"]), 4),
    withDifficulty({
      ...answer("y8-rtr-scl-p21", "On a $1:300$ plan, a hall is drawn as the rectangle below, 7.2 cm by 5 cm. Find the actual floor area in m².", "\\text{Actual area} = \\;?", "324", "$7.2 \\times 300 = 2160$ cm $= 21.6$ m; $5 \\times 300 = 1500$ cm $= 15$ m. Area $= 21.6 \\times 15 = 324$ m².", "Find actual dimensions in metres, then multiply.", ["324 m²"]),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a hall at scale 1:300, drawn 7.2 cm long and 5 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 7.2, y: 0, rightAngle: true },
          { x: 7.2, y: 5, rightAngle: true },
          { x: 0, y: 5, rightAngle: true },
        ],
        edges: [{ label: "7.2 cm" }, { label: "5 cm" }, { label: "7.2 cm" }, { label: "5 cm" }],
        fill: "amber",
      },
    }, 4),
    withDifficulty(answer("y8-rtr-scl-p22", "A map has scale $1:200\\,000$. A road measures 9 cm. A car drives the road at 72 km/h. How long does the drive take in minutes?", "\\text{Time} = \\;?", "15", "$9 \\times 200\\,000 = 1\\,800\\,000$ cm $= 18$ km. $18 \\div 72 = 0.25$ h $= 15$ min.", "Find the actual distance, then use time = distance ÷ speed.", ["15 minutes"]), 4),
    // ── Difficulty 5 ──
    withDifficulty({
      ...answer("y8-rtr-scl-p23", "A plan is at $1:250$. A rectangular courtyard is drawn 8 cm by 6 cm on the plan, as shown below. Find the cost to pave the actual courtyard at $45 per m².", "\\text{Total cost} = \\;?", "$13500", "Actual: $8 \\times 250 = 2000$ cm $= 20$ m; $6 \\times 250 = 1500$ cm $= 15$ m. Area $= 300$ m². Cost $= 300 \\times \\$45 = \\$13\\,500$.", "Find the actual area first, then multiply by the cost per m².", ["13500"]),
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a courtyard at scale 1:250, drawn 8 cm long and 6 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 8, y: 0, rightAngle: true },
          { x: 8, y: 6, rightAngle: true },
          { x: 0, y: 6, rightAngle: true },
        ],
        edges: [{ label: "8 cm" }, { label: "6 cm" }, { label: "8 cm" }, { label: "6 cm" }],
        fill: "violet",
      },
    }, 5),
    withDifficulty(choice("y8-rtr-scl-p24", "Map A has scale $1:50\\,000$; map B has scale $1:200\\,000$. A road is 8 cm on map A. How long is the same road on map B?", "A", ["2 cm", "4 cm", "16 cm", "32 cm"], "Actual $= 8 \\times 50\\,000 = 400\\,000$ cm. On map B: $400\\,000 \\div 200\\,000 = 2$ cm.", "Find the actual distance from map A, then divide by map B's scale factor."), 5),
    withDifficulty(answer("y8-rtr-scl-p25", "A scale model of a tower is built at $1:400$. The real tower is 320 m tall and has a square base of side 60 m. Find the height of the model in cm and the side of its base in cm; give the base side.", "\\text{Model base side} = \\;?", "15", "Base side $= 6000 \\text{ cm} \\div 400 = 15$ cm. (Height $= 32\\,000 \\div 400 = 80$ cm.)", "Convert the real base side to cm, then divide by the scale factor.", ["15 cm"]), 5),
    withDifficulty(answer("y8-rtr-scl-p26", "On a $1:25\\,000$ map, a triangular reserve has a base of 4 cm and a height of 3 cm. Find the actual area of the reserve in km².", "\\text{Actual area} = \\;?", "0.375", "Actual base $= 4 \\times 25\\,000 = 100\\,000$ cm $= 1$ km; height $= 3 \\times 25\\,000 = 75\\,000$ cm $= 0.75$ km. Area $= \\frac{1}{2} \\times 1 \\times 0.75 = 0.375$ km².", "Convert both dimensions to km, then use $\\frac{1}{2} bh$.", ["0.375 km²", "3/8"]), 5),
  ],
  multiPartPractice: [
    {
      id: "y8-rtr-scl-mp1",
      prompt: "An architect draws a rectangular function room on a floor plan using a scale of $1:200$. On the plan the room measures 6 cm long and 4 cm wide, as shown below.",
      latex: "\\text{Scale } 1:200, \\text{ plan } 6 \\text{ cm} \\times 4 \\text{ cm}",
      planeShapeDiagram: {
        description:
          "Scale-drawing rectangle of a function room at scale 1:200, drawn 6 cm long and 4 cm wide, with right angles at all four corners.",
        vertices: [
          { x: 0, y: 0, rightAngle: true },
          { x: 6, y: 0, rightAngle: true },
          { x: 6, y: 4, rightAngle: true },
          { x: 0, y: 4, rightAngle: true },
        ],
        edges: [{ label: "6 cm" }, { label: "4 cm" }, { label: "6 cm" }, { label: "4 cm" }],
        fill: "blue",
      },
      answer: "200",
      hint: "Multiply each plan length by the scale factor, then convert to metres before finding the area.",
      explanation: "Actual length $= 6 \\times 200 = 1200$ cm $= 12$ m. Actual width $= 4 \\times 200 = 800$ cm $= 8$ m. Actual area $= 12 \\times 8 = 96$ m². At \\(\\$30\\) per m², carpet costs \\(96 \\times \\$30 = \\$2880\\).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "What is the actual length of the room, in metres?",
          latex: "6 \\times 200",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12 m"],
          hint: "Multiply the plan length by 200, then convert cm to m.",
          explanation: "$6 \\times 200 = 1200$ cm $= 12$ m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "What is the actual width of the room, in metres?",
          latex: "4 \\times 200",
          marks: 1,
          answer: "8",
          acceptedAnswers: ["8 m"],
          hint: "Multiply the plan width by 200, then convert cm to m.",
          explanation: "$4 \\times 200 = 800$ cm $= 8$ m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "What is the actual floor area of the room, in m²?",
          latex: "12 \\times 8",
          marks: 1,
          answer: "96",
          acceptedAnswers: ["96 m²"],
          hint: "Multiply the actual length by the actual width.",
          explanation: "Area $= 12 \\times 8 = 96$ m².",
        },
        {
          key: "d",
          label: "(d)",
          prompt: "Carpet costs $30 per m². What is the cost to carpet the whole room, in dollars?",
          latex: "96 \\times 30",
          marks: 1,
          answer: "$2880",
          acceptedAnswers: ["2880", "$2880.00"],
          hint: "Multiply the floor area by the cost per square metre.",
          explanation: "$96 \\times \\$30 = \\$2880$.",
        },
      ],
    },
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "introduction-to-ratios":      introductionToRatios,
  "dividing-quantities-in-ratio": dividingQuantitiesInRatio,
  "rates-and-unit-rates":        ratesAndUnitRates,
  "speed-distance-time":         speedDistanceTime,
  "scale-drawings":              scaleDrawings,
};

export function year8RatiosRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics" && course.slug !== "year-7-mathematics") return null;
  if (unit.slug !== "ratios-and-rates") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
