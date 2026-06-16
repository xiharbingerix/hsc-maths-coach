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
>;

// ── Helper builders ──────────────────────────────────────────────────────────

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
      "A ratio compares two or more quantities of the same kind. The notation $a:b$ (read 'a to b') shows how much of each quantity there is relative to the other. For example, a paint mix of 2 parts red to 5 parts white is written $2:5$.",
      "To simplify a ratio, divide every part by the highest common factor (HCF) of all the parts. For $12:8$, the HCF is 4, so $12 \\div 4 : 8 \\div 4 = 3:2$. A simplified ratio has no common factor other than 1.",
      "Equivalent ratios are formed by multiplying or dividing every part by the same non-zero number, just as you would scale equivalent fractions. So $3:2 = 6:4 = 15:10$.",
      "A common misconception is treating a ratio like a fraction. The ratio $2:3$ does not mean the same as $\\frac{2}{3}$. In a mixture of 2 red and 3 white, there are 5 parts in total; the fraction of the mixture that is red is $\\frac{2}{5}$, not $\\frac{2}{3}$.",
      "To compare ratios, rewrite them so the second part is the same in each — similar to finding a common denominator. Then compare the first parts directly.",
    ],
    latexBlocks: [
      "\\text{Simplify } a:b \\text{ by dividing by } \\gcd(a,b)",
      "a:b = (a \\times k):(b \\times k) \\text{ for any } k \\neq 0",
      "\\text{To compare } a:b \\text{ and } c:d, \\text{ write both with the same second term}",
    ],
  },
  workedExamples: [
    {
      title: "Simplify a ratio",
      questionLatex: "\\text{Simplify }24:18.",
      steps: [
        { explanation: "Find the HCF of 24 and 18.", latex: "\\gcd(24, 18) = 6" },
        { explanation: "Divide both parts by 6.", latex: "24 \\div 6 : 18 \\div 6 = 4:3" },
      ],
      finalAnswerLatex: "4:3",
    } as WorkedExample,
    {
      title: "Write a ratio from a word description",
      questionLatex: "\\text{A class has 14 boys and 11 girls. Write the ratio of boys to girls in simplest form.}",
      steps: [
        { explanation: "Write the ratio in the stated order: boys first.", latex: "14:11" },
        { explanation: "Check the HCF of 14 and 11. They share no common factor other than 1.", latex: "\\gcd(14, 11) = 1, \\text{ so } 14:11 \\text{ is already in simplest form}" },
      ],
      finalAnswerLatex: "14:11",
    } as WorkedExample,
    {
      title: "Compare two ratios",
      questionLatex: "\\text{Which ratio is larger in its first part: }3:4 \\text{ or }5:8?",
      steps: [
        { explanation: "Convert both ratios so the second part is 8.", latex: "3:4 = 6:8" },
        { explanation: "Compare the first parts: 6 vs 5.", latex: "6:8 > 5:8, \\text{ so } 3:4 > 5:8" },
      ],
      finalAnswerLatex: "3:4 \\text{ is larger}",
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
      "Dividing a quantity in a ratio is a three-step process: add up the parts to find the total number of parts; divide the quantity by the total parts to find the value of one part; then multiply the value of one part by each ratio number to find each share.",
      "For example, to share $200 in the ratio $3:2$: total parts $= 3 + 2 = 5$; one part $= \\$200 \\div 5 = \\$40$; shares are $3 \\times \\$40 = \\$120$ and $2 \\times \\$40 = \\$80$.",
      "The same method extends to three-part ratios. To mix paint in the ratio $2:3:1$: total parts $= 6$; find one part; multiply by 2, 3 and 1 for each colour.",
      "A very common mistake is dividing the quantity by one of the ratio numbers instead of by the total number of parts. Always add all the ratio numbers together first before dividing.",
      "Always check your answer: the shares must add back to the original quantity.",
    ],
    latexBlocks: [
      "\\text{Total parts} = a + b \\quad \\text{(or } a + b + c \\text{ for three-part ratios)}",
      "\\text{One part} = \\frac{\\text{Total quantity}}{\\text{Total parts}}",
      "\\text{Share}_1 = a \\times \\text{one part}, \\quad \\text{Share}_2 = b \\times \\text{one part}",
    ],
  },
  workedExamples: [
    {
      title: "Share money in a two-part ratio",
      questionLatex: "\\text{Share }\\$180\\text{ between Ali and Beth in the ratio }2:3.",
      steps: [
        { explanation: "Add the parts to find the total number of parts.", latex: "2 + 3 = 5 \\text{ parts}" },
        { explanation: "Divide the total by the number of parts to find one part.", latex: "\\$180 \\div 5 = \\$36 \\text{ per part}" },
        { explanation: "Multiply to find each share.", latex: "\\text{Ali} = 2 \\times \\$36 = \\$72, \\quad \\text{Beth} = 3 \\times \\$36 = \\$108" },
        { explanation: "Check: the shares add to the original total.", latex: "\\$72 + \\$108 = \\$180 \\checkmark" },
      ],
      finalAnswerLatex: "\\text{Ali: }\\$72, \\quad \\text{Beth: }\\$108",
    } as WorkedExample,
    {
      title: "Divide a length in a three-part ratio",
      questionLatex: "\\text{A 60 cm ribbon is cut in the ratio }1:2:3.",
      steps: [
        { explanation: "Total parts.", latex: "1 + 2 + 3 = 6" },
        { explanation: "One part.", latex: "60 \\div 6 = 10 \\text{ cm}" },
        { explanation: "Each piece.", latex: "1 \\times 10 = 10 \\text{ cm}, \\quad 2 \\times 10 = 20 \\text{ cm}, \\quad 3 \\times 10 = 30 \\text{ cm}" },
      ],
      finalAnswerLatex: "10 \\text{ cm}, \\; 20 \\text{ cm}, \\; 30 \\text{ cm}",
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
      "A ratio compares two quantities of the same kind (e.g. boys to girls). A rate compares two quantities of different kinds (e.g. kilometres and hours, dollars and kilograms). Rates always carry units on both quantities.",
      "A unit rate expresses the rate per 1 unit of the second quantity. To find a unit rate, divide the first quantity by the second. For example, if you travel 240 km in 3 hours, the unit rate is $240 \\div 3 = 80$ km per hour.",
      "To compare rates (e.g. which pack of biscuits is better value?), convert each to a unit rate — cost per gram or grams per dollar — and then compare.",
      "To convert km/h to m/s, multiply by $\\frac{1000}{3600} = \\frac{5}{18}$. To convert m/s to km/h, multiply by $\\frac{3600}{1000} = \\frac{18}{5} = 3.6$.",
      "A common error is dividing in the wrong direction when finding a unit rate. Always check that the answer makes sense: a unit rate of 80 km/h is reasonable for a car; 0.0125 km/h is not.",
    ],
    latexBlocks: [
      "\\text{Unit rate} = \\frac{\\text{first quantity}}{\\text{second quantity}}",
      "\\text{km/h} \\times \\frac{1000}{3600} = \\text{m/s}",
      "\\text{m/s} \\times 3.6 = \\text{km/h}",
    ],
  },
  workedExamples: [
    {
      title: "Calculate a unit rate",
      questionLatex: "\\text{A car uses 45 L of fuel to travel 630 km. Find the fuel consumption in L/100 km.}",
      steps: [
        { explanation: "L per 1 km: divide litres by distance.", latex: "45 \\div 630 = 0.0\\overline{714}\\text{ L/km}" },
        { explanation: "Scale up to 100 km.", latex: "0.0\\overline{714} \\times 100 \\approx 7.14 \\text{ L/100 km}" },
      ],
      finalAnswerLatex: "\\approx 7.14 \\text{ L/100 km}",
    } as WorkedExample,
    {
      title: "Compare rates to find best value",
      questionLatex: "\\text{Pack A: 400 g for }\\$3.20.\\text{ Pack B: 600 g for }\\$4.50.\\text{ Which is better value?}",
      steps: [
        { explanation: "Find the unit rate (cost per gram) for each pack.", latex: "\\text{Pack A: } \\$3.20 \\div 400 = \\$0.008 \\text{ per g}" },
        { explanation: "Unit rate for Pack B.", latex: "\\text{Pack B: } \\$4.50 \\div 600 = \\$0.0075 \\text{ per g}" },
        { explanation: "Lower cost per gram is better value.", latex: "0.0075 < 0.008, \\text{ so Pack B is better value}" },
      ],
      finalAnswerLatex: "\\text{Pack B is better value}",
    } as WorkedExample,
    {
      title: "Convert km/h to m/s",
      questionLatex: "\\text{Convert }90 \\text{ km/h to m/s.}",
      steps: [
        { explanation: "Multiply by $\\frac{1000}{3600}$.", latex: "90 \\times \\frac{1000}{3600} = 90 \\times \\frac{5}{18}" },
        { explanation: "Simplify.", latex: "\\frac{90 \\times 5}{18} = \\frac{450}{18} = 25 \\text{ m/s}" },
      ],
      finalAnswerLatex: "25 \\text{ m/s}",
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
      "Speed, distance and time are connected by one formula: $\\text{speed} = \\frac{\\text{distance}}{\\text{time}}$. Rearranging gives $\\text{distance} = \\text{speed} \\times \\text{time}$ and $\\text{time} = \\frac{\\text{distance}}{\\text{speed}}$.",
      "The triangle method is a memory aid: write D on top with S and T side by side below it. Cover the variable you want and read off the formula — covering D gives $S \\times T$; covering S gives $D \\div T$; covering T gives $D \\div S$.",
      "Units must be consistent. If speed is in km/h, distance must be in km and time in hours. If time is given in minutes, convert to hours first by dividing by 60.",
      "Average speed over a multi-leg journey is total distance divided by total time, not the average of the individual speeds. A common mistake is averaging the speeds directly — this gives a wrong answer whenever the legs take different amounts of time.",
      "For timetable problems, subtract the departure time from the arrival time to find the duration, then apply the speed–distance formula.",
    ],
    latexBlocks: [
      "\\text{speed} = \\frac{\\text{distance}}{\\text{time}}",
      "\\text{distance} = \\text{speed} \\times \\text{time}",
      "\\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
      "\\text{average speed} = \\frac{\\text{total distance}}{\\text{total time}}",
    ],
  },
  workedExamples: [
    {
      title: "Find distance from speed and time",
      questionLatex: "\\text{A train travels at 120 km/h for 2.5 hours. Find the distance.}",
      steps: [
        { explanation: "Use the formula $d = s \\times t$.", latex: "d = 120 \\times 2.5" },
        { explanation: "Multiply.", latex: "d = 300 \\text{ km}" },
      ],
      finalAnswerLatex: "300 \\text{ km}",
    } as WorkedExample,
    {
      title: "Find time from speed and distance",
      questionLatex: "\\text{How long does it take to travel 270 km at 90 km/h?}",
      steps: [
        { explanation: "Use the formula $t = \\frac{d}{s}$.", latex: "t = \\frac{270}{90}" },
        { explanation: "Divide.", latex: "t = 3 \\text{ hours}" },
      ],
      finalAnswerLatex: "3 \\text{ hours}",
    } as WorkedExample,
    {
      title: "Average speed over two legs",
      questionLatex: "\\text{A cyclist rides 60 km in 2 h, then 45 km in 1.5 h. Find the average speed.}",
      steps: [
        { explanation: "Total distance.", latex: "60 + 45 = 105 \\text{ km}" },
        { explanation: "Total time.", latex: "2 + 1.5 = 3.5 \\text{ h}" },
        { explanation: "Average speed.", latex: "\\frac{105}{3.5} = 30 \\text{ km/h}" },
      ],
      finalAnswerLatex: "30 \\text{ km/h}",
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
      "A scale tells you the ratio between a length on a drawing and the corresponding real length. The notation $1:200$ means every 1 unit on the drawing represents 200 of the same units in reality. So 1 cm on the plan equals 200 cm (or 2 m) in the actual building.",
      "To find the actual length, multiply the drawing length by the scale factor. For a scale of $1:50$, a drawing length of 6 cm gives an actual length of $6 \\times 50 = 300$ cm.",
      "To find the drawing length, divide the actual length by the scale factor. An actual wall of 8 m $= 800$ cm drawn at $1:200$ becomes $800 \\div 200 = 4$ cm on the plan.",
      "To find the scale, divide the actual length by the drawing length (using matching units). If a 3 cm line on a map represents 6 km, the scale is $3:600\\,000 = 1:200\\,000$ (converting 6 km to cm first).",
      "A common mistake is forgetting to convert units before applying the scale. Both the drawing and actual measurements must be in the same unit before dividing to find the scale factor.",
    ],
    latexBlocks: [
      "\\text{Actual length} = \\text{drawing length} \\times \\text{scale factor}",
      "\\text{Drawing length} = \\frac{\\text{actual length}}{\\text{scale factor}}",
      "\\text{Scale} = 1 : \\frac{\\text{actual length (same units)}}{\\text{drawing length}}",
    ],
  },
  workedExamples: [
    {
      title: "Find the actual length from a scale drawing",
      questionLatex: "\\text{A floor plan uses a scale of }1:50.\\text{ A room measures 8 cm on the plan. Find the actual length.}",
      steps: [
        { explanation: "The scale factor is 50 — every 1 cm on the plan equals 50 cm in reality.", latex: "\\text{Actual length} = 8 \\times 50 = 400 \\text{ cm}" },
        { explanation: "Convert to metres.", latex: "400 \\text{ cm} = 4 \\text{ m}" },
      ],
      finalAnswerLatex: "4 \\text{ m}",
    } as WorkedExample,
    {
      title: "Find the drawing length from an actual measurement",
      questionLatex: "\\text{A building is 15 m long. Draw it using a scale of }1:300.",
      steps: [
        { explanation: "Convert the actual length to centimetres.", latex: "15 \\text{ m} = 1500 \\text{ cm}" },
        { explanation: "Divide by the scale factor.", latex: "1500 \\div 300 = 5 \\text{ cm}" },
      ],
      finalAnswerLatex: "5 \\text{ cm on the drawing}",
    } as WorkedExample,
    {
      title: "Find the scale from measurements",
      questionLatex: "\\text{A 4 cm line on a map represents an actual distance of 20 km. Find the scale.}",
      steps: [
        { explanation: "Convert the actual distance to centimetres.", latex: "20 \\text{ km} = 2\\,000\\,000 \\text{ cm}" },
        { explanation: "Write as a ratio of drawing to actual.", latex: "4 : 2\\,000\\,000" },
        { explanation: "Simplify by dividing both parts by 4.", latex: "1 : 500\\,000" },
      ],
      finalAnswerLatex: "1 : 500\\,000",
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
    answer(
      "y8-rtr-scl-i5",
      "A bedroom is 4 m by 3 m. It is drawn on a plan using a scale of $1:40$. What is the area of the room on the plan in $\\text{cm}^2$?",
      "\\text{Area on plan} = \\;?",
      "75",
      "Drawing dimensions: length $= 400 \\div 40 = 10$ cm; width $= 300 \\div 40 = 7.5$ cm. Area $= 10 \\times 7.5 = 75 \\text{ cm}^2$.",
      "Convert each dimension to the drawing scale first, then calculate the area.",
      ["75 cm²"],
    ),
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
    answer(
      "y8-rtr-scl-m5",
      "A garden is 18 m by 12 m. A plan is drawn with a scale of $1:300$. What are the dimensions of the garden on the plan in centimetres?",
      "\\text{Dimensions on plan} = \\;?",
      "6 by 4",
      "$18 \\text{ m} = 1800 \\text{ cm}$; drawing: $1800 \\div 300 = 6$ cm. $12 \\text{ m} = 1200 \\text{ cm}$; drawing: $1200 \\div 300 = 4$ cm.",
      "Convert each dimension to cm, then divide by the scale factor.",
      ["6 cm by 4 cm", "6cm by 4cm"],
    ),
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
    choice(
      "y8-rtr-scl-m8",
      "A floor plan is drawn at $1:200$. A bathroom is shown as a rectangle 2.5 cm by 1.5 cm. What is the actual area of the bathroom?",
      "B",
      ["$750 \\text{ cm}^2$", "$15 \\text{ m}^2$", "$7.5 \\text{ m}^2$", "$3 \\text{ m}^2$"],
      "Actual dimensions: $2.5 \\times 200 = 500$ cm $= 5$ m and $1.5 \\times 200 = 300$ cm $= 3$ m. Area $= 5 \\times 3 = 15 \\text{ m}^2$.",
      "Find the actual dimensions first, convert to metres, then calculate area.",
    ),
    answer(
      "y8-rtr-scl-m9",
      "An architect draws a building to a scale of $1:500$. On the plan, a room appears as a rectangle of $4.8 \\text{ cm} \\times 3.6 \\text{ cm}$. Find the actual area of the room in $\\text{m}^2$.",
      "\\text{Actual area} = \\;?",
      "432",
      "Actual dimensions: $4.8 \\times 500 = 2400$ cm $= 24$ m and $3.6 \\times 500 = 1800$ cm $= 18$ m. Area $= 24 \\times 18 = 432 \\text{ m}^2$.",
      "Find actual length and width in metres, then multiply for area.",
      ["432 m²"],
    ),
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
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "ratios-and-rates") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    masteryPassMark: 0.8,
    ...content,
  };
}
