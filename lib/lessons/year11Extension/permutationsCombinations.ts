import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formulaAnswer, practicalChoice } from "../questionHelpers";

function countAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return formulaAnswer(id, prompt, latex, answer, acceptedAnswers);
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return practicalChoice(id, prompt, answer, choices, explanation, latex);
}

const base = {
  syllabusArea: "Combinatorics",
  masteryPassMark: 0.8,
};

function lessonBase(
  lesson: CourseLessonSeed,
  description: string,
  focus: string
): Partial<ExplicitLesson> {
  return {
    ...base,
    description,
    focus,
    status: "active",
  };
}

const countingExamples: WorkedExample[] = [
  {
    title: "Outfits from independent stages",
    questionLatex:
      "\\text{There are }4\\text{ shirts, }3\\text{ trousers, and }2\\text{ jackets. How many outfits are possible?}",
    steps: [
      { explanation: "Choosing a shirt, trousers, and a jacket are independent stages.", latex: "4\\times 3\\times 2" },
      { explanation: "Multiply the number of choices in each stage.", latex: "24" },
    ],
    finalAnswerLatex: "24\\text{ outfits}",
  },
  {
    title: "Separate categories use addition",
    questionLatex:
      "\\text{A student chooses exactly one item: }5\\text{ novels, }4\\text{ biographies, or }3\\text{ poetry books.}",
    steps: [
      { explanation: "The categories are separate cases because the student chooses one item only.", latex: "5+4+3" },
      { explanation: "Add mutually exclusive choices.", latex: "12" },
    ],
    finalAnswerLatex: "12\\text{ choices}",
  },
  {
    title: "Factorial notation",
    questionLatex: "5!\\quad \\text{and}\\quad 0!",
    steps: [
      { explanation: "Expand the factorial.", latex: "5!=5\\times4\\times3\\times2\\times1" },
      { explanation: "By definition, zero factorial is one.", latex: "0!=1" },
    ],
    finalAnswerLatex: "5!=120,\\quad 0!=1",
  },
  {
    title: "A staged access code",
    questionLatex:
      "\\text{A code has one letter from }\\{A,B,C,D\\}\\text{ followed by two digits from }\\{0,1,2,3,4\\}.",
    steps: [
      { explanation: "There are 4 choices for the letter.", latex: "4" },
      { explanation: "Each digit has 5 choices, and repetition is allowed.", latex: "5\\times5" },
      { explanation: "Multiply the stages.", latex: "4\\times5\\times5=100" },
    ],
    finalAnswerLatex: "100\\text{ codes}",
  },
];

const permutationExamples: WorkedExample[] = [
  {
    title: "Arrange distinct books",
    questionLatex: "\\text{How many ways can }5\\text{ distinct books be arranged on a shelf?}",
    steps: [
      { explanation: "All 5 distinct books are arranged, so use a factorial.", latex: "5!" },
      { explanation: "Evaluate the factorial.", latex: "5!=120" },
    ],
    finalAnswerLatex: "120",
  },
  {
    title: "Podium positions",
    questionLatex:
      "\\text{From }8\\text{ runners, how many ordered gold-silver-bronze podiums are possible?}",
    steps: [
      { explanation: "The positions are ordered, so this is a permutation.", latex: "P(8,3)" },
      { explanation: "Use the first three factors from 8 downwards.", latex: "8\\times7\\times6=336" },
    ],
    finalAnswerLatex: "336",
  },
  {
    title: "Use permutation notation",
    questionLatex: "P(7,2)",
    steps: [
      { explanation: "Use the permutation formula.", latex: "P(n,r)=\\frac{n!}{(n-r)!}" },
      { explanation: "Substitute the values.", latex: "P(7,2)=\\frac{7!}{5!}=7\\times6" },
      { explanation: "Evaluate.", latex: "42" },
    ],
    finalAnswerLatex: "42",
  },
  {
    title: "Decide whether order matters",
    questionLatex:
      "\\text{A club assigns a president, secretary, and treasurer from }10\\text{ members.}",
    steps: [
      { explanation: "The roles are different, so swapping two people changes the outcome." },
      { explanation: "Because order or role matters, use a permutation.", latex: "P(10,3)" },
    ],
    finalAnswerLatex: "\\text{Permutation}",
  },
];

const combinationExamples: WorkedExample[] = [
  {
    title: "Choose students for a group",
    questionLatex: "\\text{How many groups of }3\\text{ can be chosen from }8\\text{ students?}",
    steps: [
      { explanation: "The order within the group does not matter.", latex: "C(8,3)" },
      { explanation: "Use the combination formula.", latex: "C(8,3)=\\frac{8!}{3!5!}" },
      { explanation: "Evaluate.", latex: "56" },
    ],
    finalAnswerLatex: "56",
  },
  {
    title: "Choose toppings",
    questionLatex: "\\text{How many ways can }2\\text{ toppings be selected from }6\\text{ toppings?}",
    steps: [
      { explanation: "This is a selection, so order does not matter.", latex: "C(6,2)" },
      { explanation: "Evaluate.", latex: "C(6,2)=15" },
    ],
    finalAnswerLatex: "15",
  },
  {
    title: "Compare permutations and combinations",
    questionLatex: "P(5,2)\\quad \\text{and}\\quad C(5,2)",
    steps: [
      { explanation: "For ordered choices, use a permutation.", latex: "P(5,2)=5\\times4=20" },
      { explanation: "For unordered choices, divide by the arrangements of the selected objects.", latex: "C(5,2)=\\frac{20}{2!}=10" },
    ],
    finalAnswerLatex: "P(5,2)=20,\\quad C(5,2)=10",
  },
  {
    title: "Decide whether a context is a combination",
    questionLatex: "\\text{A teacher chooses }4\\text{ students from }12\\text{ to attend a workshop.}",
    steps: [
      { explanation: "The chosen students form a group." },
      { explanation: "There are no different roles or positions, so order does not matter.", latex: "C(12,4)" },
    ],
    finalAnswerLatex: "\\text{Combination}",
  },
];

const restrictionExamples: WorkedExample[] = [
  {
    title: "Two people together",
    questionLatex:
      "\\text{How many ways can }6\\text{ people stand in a line if Alex and Bea must stand together?}",
    steps: [
      { explanation: "Treat Alex and Bea as one block. There are 5 objects to arrange.", latex: "5!" },
      { explanation: "The two people inside the block can swap places.", latex: "2!" },
      { explanation: "Multiply the block arrangements by the internal arrangements.", latex: "5!\\times2!=240" },
    ],
    finalAnswerLatex: "240",
  },
  {
    title: "Two people not together",
    questionLatex:
      "\\text{How many ways can }6\\text{ people stand in a line if Alex and Bea must not stand together?}",
    steps: [
      { explanation: "Start with all arrangements.", latex: "6!=720" },
      { explanation: "Subtract the arrangements where Alex and Bea are together.", latex: "5!\\times2!=240" },
      { explanation: "Use the complement.", latex: "720-240=480" },
    ],
    finalAnswerLatex: "480",
  },
  {
    title: "Repeated letters",
    questionLatex: "\\text{How many distinct arrangements are there of the letters in LEVEL?}",
    steps: [
      { explanation: "There are 5 letters, with two Ls and two Es repeated.", latex: "\\frac{5!}{2!2!}" },
      { explanation: "Evaluate.", latex: "\\frac{120}{4}=30" },
    ],
    finalAnswerLatex: "30",
  },
  {
    title: "Circular arrangement",
    questionLatex: "\\text{How many ways can }6\\text{ distinct people sit around a round table?}",
    steps: [
      { explanation: "For circular arrangements, fix one person to remove rotations.", latex: "(n-1)!" },
      { explanation: "With 6 people, arrange the remaining 5.", latex: "5!=120" },
    ],
    finalAnswerLatex: "120",
  },
];

const examExamples: WorkedExample[] = [
  {
    title: "Choose the counting structure",
    questionLatex:
      "\\text{A code has }3\\text{ letters followed by }2\\text{ digits. Repetition is allowed.}",
    steps: [
      { explanation: "There are five independent stages." },
      { explanation: "Use the multiplication principle.", latex: "26^3\\times10^2=1757600" },
    ],
    finalAnswerLatex: "1757600",
  },
  {
    title: "Order or no order",
    questionLatex:
      "\\text{A team captain and vice-captain are chosen from }9\\text{ students.}",
    steps: [
      { explanation: "The roles are different, so order matters.", latex: "P(9,2)" },
      { explanation: "Evaluate.", latex: "9\\times8=72" },
    ],
    finalAnswerLatex: "72",
  },
  {
    title: "Selection with no repeated counting",
    questionLatex: "\\text{A committee of }4\\text{ is chosen from }10\\text{ students.}",
    steps: [
      { explanation: "The committee has no roles, so order does not matter.", latex: "C(10,4)" },
      { explanation: "Evaluate.", latex: "C(10,4)=210" },
    ],
    finalAnswerLatex: "210",
  },
  {
    title: "Restricted arrangement",
    questionLatex:
      "\\text{How many arrangements of }7\\text{ people have two nominated people together?}",
    steps: [
      { explanation: "Treat the nominated pair as a block.", latex: "6!" },
      { explanation: "The pair can be ordered internally in two ways.", latex: "2!" },
      { explanation: "Multiply.", latex: "6!\\times2=1440" },
    ],
    finalAnswerLatex: "1440",
  },
];

function countingLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Use multiplication, addition, and factorial notation to count staged choices and arrangements.",
      "Counting principles and factorials"
    ),
    learningIntention:
      "Use addition, multiplication, and factorial notation to count outcomes without listing every possibility.",
    successCriteria: [
      "Identify independent stages and multiply the number of choices.",
      "Identify separate mutually exclusive cases and add the number of choices.",
      "Evaluate factorial expressions including zero factorial.",
      "Use factorial notation to represent arrangements of distinct objects.",
      "Count simple staged codes or choices with repetition allowed.",
      "Explain why adding and multiplying apply in different counting situations.",
    ],
    teaching: {
      paragraphs: [
        "Counting becomes efficient when a task can be broken into stages or separate cases.",
        "Use the multiplication principle when one choice is followed by another choice. The total number of outcomes is the product of the choices at each stage.",
        "Use the addition principle when cases are separate and exactly one case can occur. The total number of outcomes is the sum of the cases.",
        "Factorial notation counts arrangements of distinct objects. For a positive integer n, n factorial multiplies all whole numbers from n down to 1.",
        "The value of zero factorial is defined as 1. This makes counting formulas work cleanly when no objects remain to arrange.",
      ],
      latexBlocks: [
        "\\text{multiplication principle: }a\\text{ choices then }b\\text{ choices gives }ab\\text{ outcomes}",
        "\\text{addition principle: separate cases give }a+b\\text{ outcomes}",
        "n!=n(n-1)(n-2)\\cdots 1",
        "0!=1",
      ],
    },
    workedExamples: countingExamples,
    guidedPractice: [
      countAnswer("y11ext-pc-count-g1", "A lunch order has 5 mains and 3 drinks. How many main-and-drink orders are possible?", "\\text{5 mains, 3 drinks}", "15"),
      countAnswer("y11ext-pc-count-g2", "A student chooses exactly one activity from 6 sports or 4 music groups. How many choices are possible?", "\\text{6 sports or 4 music groups}", "10"),
      countAnswer("y11ext-pc-count-g3", "Evaluate the factorial.", "4!", "24"),
      choice("y11ext-pc-count-g4", "A code uses one letter followed by one digit. Which principle applies?", "B", ["Addition", "Multiplication", "Complement", "Circular arrangement"], "The code is built in stages, so the choices multiply."),
    ],
    independentPractice: [
      countAnswer("y11ext-pc-count-i1", "A menu has 4 entrees, 5 mains and 2 desserts. How many three-course meals are possible?", "\\text{4 entrees, 5 mains, 2 desserts}", "40"),
      countAnswer("y11ext-pc-count-i2", "A club chooses exactly one badge design from 7 round designs or 9 square designs. How many choices are possible?", "\\text{7 round designs or 9 square designs}", "16"),
      countAnswer("y11ext-pc-count-i3", "Evaluate the factorial expression.", "6!", "720"),
      countAnswer("y11ext-pc-count-i4", "A code has two letters chosen from 5 allowed letters, with repetition allowed. How many codes are possible?", "\\text{two stages, 5 choices each}", "25"),
      choice("y11ext-pc-count-i5", "A question separates cases into vowel-starting words and consonant-starting words. Which operation combines the cases?", "A", ["Addition", "Multiplication", "Division by a factorial", "Circular fixing"], "Separate cases are added when exactly one case can occur."),
    ],
    commonMistakes: [
      { mistake: "Adding choices when a task happens in stages.", fix: "If one choice is followed by another, multiply the choices." },
      { mistake: "Multiplying separate cases that cannot happen together.", fix: "If exactly one separate case is chosen, add the cases." },
      { mistake: "Treating zero factorial as zero.", fix: "Use $0!=1$." },
      { mistake: "Listing outcomes when a counting principle is faster.", fix: "Break the task into stages or cases first." },
    ],
    masteryQuiz: [
      countAnswer("y11ext-pc-count-m1", "A student chooses 3 notebooks and 4 pens options as one notebook-and-pen set. How many sets are possible?", "\\text{3 notebook choices, 4 pen choices}", "12"),
      countAnswer("y11ext-pc-count-m2", "Evaluate the factorial.", "5!", "120"),
      countAnswer("y11ext-pc-count-m3", "A password has one symbol from 6 choices followed by one digit from 10 choices. How many passwords are possible?", "\\text{one symbol stage, one digit stage}", "60"),
      countAnswer("y11ext-pc-count-m4", "A student chooses exactly one elective from 8 arts choices or 5 technology choices. How many choices are possible?", "\\text{8 arts choices or 5 technology choices}", "13"),
      countAnswer("y11ext-pc-count-m5", "How many arrangements are possible for 4 distinct trophies in a row?", "\\text{arrange 4 distinct trophies}", "24"),
      choice("y11ext-pc-count-m6", "Which expression represents arranging 7 distinct objects in a row?", "C", ["$7+6$", "$7^2$", "$7!$", "$7/2$"], "Arranging all 7 distinct objects is counted by $7!$."),
      choice("y11ext-pc-count-m7", "A student multiplies 9 and 4 when choosing exactly one item from either of two separate lists. What is the issue?", "B", ["The numbers should be squared", "The cases should be added", "The answer must be zero", "The order should be reversed"], "Exactly one separate case is chosen, so the counts are added."),
      choice("y11ext-pc-count-m8", "Which situation should use multiplication?", "D", ["Choose one book from fiction or non-fiction", "Choose one committee from two separate lists", "Choose one prize from a shelf", "Choose a shirt and then choose trousers"], "A shirt choice followed by a trousers choice is a staged process."),
      countAnswer("y11ext-pc-count-m9", "A code has three stages with 2, 5 and 6 choices respectively. How many codes are possible?", "\\text{three independent stages}", "60"),
      countAnswer("y11ext-pc-count-m10", "Evaluate the factorial expression.", "3!\\times 0!", "6"),
    ],
  };
}

function permutationsLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Count ordered arrangements using factorials, permutation notation, and role assignments.",
      "Permutations"
    ),
    learningIntention:
      "Count ordered arrangements and role assignments using factorials and permutation notation.",
    successCriteria: [
      "Recognise when order matters in a counting problem.",
      "Count arrangements of all distinct objects using factorial notation.",
      "Use $P(n,r)$ to count ordered selections of r objects from n distinct objects.",
      "Evaluate simple permutation counts with clean integer answers.",
      "Apply permutations to podiums, roles, and letter arrangements with distinct letters.",
      "Avoid using combinations when positions or order are important.",
    ],
    teaching: {
      paragraphs: [
        "A permutation is an ordered arrangement. If swapping two selected objects changes the outcome, order matters.",
        "Arranging all n distinct objects in a row gives n factorial arrangements.",
        "Arranging r objects chosen from n distinct objects is counted by a permutation. This is useful for podiums, rankings, and different roles.",
        "Permutation notation may be written as $P(n,r)$ or $_nP_r$. Both mean an ordered selection of r objects from n.",
        "A common error is to use a combination when roles or positions are different. If first and second place are different, use a permutation.",
      ],
      latexBlocks: [
        "P(n,r)=\\frac{n!}{(n-r)!}",
        "P(n,n)=n!",
        "\\text{order matters }\\Rightarrow\\text{ permutation}",
      ],
    },
    workedExamples: permutationExamples,
    guidedPractice: [
      countAnswer("y11ext-pc-perm-g1", "How many ways can 4 distinct books be arranged in a row?", "\\text{arrange 4 distinct books}", "24"),
      countAnswer("y11ext-pc-perm-g2", "From 6 students, how many ordered captain and vice-captain choices are possible?", "\\text{6 students, 2 ordered roles}", "30"),
      countAnswer("y11ext-pc-perm-g3", "Evaluate the permutation.", "P(5,2)", "20"),
      choice("y11ext-pc-perm-g4", "A race awards first, second and third place. Which counting type is appropriate?", "A", ["Permutation", "Combination", "Addition only", "Repeated letters"], "Podium positions are ordered, so this is a permutation."),
    ],
    independentPractice: [
      countAnswer("y11ext-pc-perm-i1", "How many arrangements are there of the distinct letters in TRAIN?", "\\text{5 distinct letters}", "120"),
      countAnswer("y11ext-pc-perm-i2", "From 7 players, how many ordered first, second and third positions are possible?", "\\text{7 players, ordered top 3}", "210"),
      countAnswer("y11ext-pc-perm-i3", "Evaluate the permutation.", "P(8,2)", "56"),
      choice("y11ext-pc-perm-i4", "Which context requires a permutation rather than a combination?", "C", ["Choosing 3 people for an unranked group", "Selecting 2 toppings", "Assigning chairperson and secretary", "Choosing 4 books to borrow"], "Different roles make order matter."),
      countAnswer("y11ext-pc-perm-i5", "A code uses 3 different letters selected from 6 available letters. How many ordered codes are possible?", "\\text{6 letters, ordered code length 3, no repetition}", "120"),
    ],
    commonMistakes: [
      { mistake: "Using a combination when positions or roles are different.", fix: "If swapping people changes the outcome, use a permutation." },
      { mistake: "Using $n!$ when only some objects are arranged.", fix: "Use $P(n,r)$ when only r of n objects are arranged." },
      { mistake: "Allowing repetition when the question says distinct objects.", fix: "Reduce the number of available choices after each selection." },
      { mistake: "Treating letter arrangements as unordered selections.", fix: "Words and ordered strings are arrangements, so order matters." },
    ],
    masteryQuiz: [
      countAnswer("y11ext-pc-perm-m1", "How many ways can 5 distinct medals be arranged in a row?", "\\text{arrange 5 distinct medals}", "120"),
      countAnswer("y11ext-pc-perm-m2", "Evaluate the permutation.", "P(6,2)", "30"),
      countAnswer("y11ext-pc-perm-m3", "From 8 runners, how many ordered top 3 podiums are possible?", "\\text{8 runners, ordered top 3 positions}", "336"),
      countAnswer("y11ext-pc-perm-m4", "How many arrangements are there of the distinct letters in MATHS?", "\\text{5 distinct letters}", "120"),
      countAnswer("y11ext-pc-perm-m5", "A club assigns president, secretary and treasurer from 9 members. How many assignments are possible?", "\\text{9 members, 3 different roles}", "504"),
      choice("y11ext-pc-perm-m6", "Which notation matches an ordered selection of 4 objects from 10 distinct objects?", "A", ["$P(10,4)$", "$C(10,4)$", "$10+4$", "$4!$ only"], "An ordered selection is a permutation."),
      choice("y11ext-pc-perm-m7", "A student uses a combination for assigning two different leadership roles. What is the error?", "D", ["The roles are identical", "There are no students", "The answer must be one", "The roles make order matter"], "Different roles mean each assignment is ordered."),
      choice("y11ext-pc-perm-m8", "Which situation does not require a permutation?", "B", ["Ranking 4 finalists", "Choosing 4 students for an unranked group", "Assigning 3 roles", "Arranging 6 books"], "An unranked group is a selection, not an ordered arrangement."),
      countAnswer("y11ext-pc-perm-m9", "From 10 distinct books, how many ordered displays of 3 books can be made?", "\\text{10 books, ordered display of 3}", "720"),
      countAnswer("y11ext-pc-perm-m10", "A lock code uses 4 different digits selected from digits 1 to 7. How many ordered codes are possible?", "\\text{7 digits, ordered code length 4, no repetition}", "840"),
    ],
  };
}

function combinationsLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Count unordered selections and compare combination counts with permutation counts.",
      "Combinations"
    ),
    learningIntention:
      "Count selections where order does not matter using combination notation and factorial relationships.",
    successCriteria: [
      "Recognise when order does not matter in a selection problem.",
      "Use $C(n,r)$ to count selections of r objects from n distinct objects.",
      "Evaluate simple combination counts with clean integer answers.",
      "Compare a permutation count with a combination count for the same n and r.",
      "Apply combinations to committees, teams, and groups with no roles.",
      "Avoid counting the same group multiple times.",
    ],
    teaching: {
      paragraphs: [
        "A combination is an unordered selection. If the same people or objects are chosen, the order in which they were selected does not create a new outcome.",
        "Combination notation may be written as $C(n,r)$ or $_nC_r$. It counts groups of r chosen from n distinct objects.",
        "A permutation first orders the selected objects. A combination removes repeated orderings by dividing by the number of ways to arrange the selected objects.",
        "Committees, teams, and groups usually use combinations unless the question gives different roles or positions.",
      ],
      latexBlocks: [
        "C(n,r)=\\frac{n!}{r!(n-r)!}",
        "C(n,r)=\\frac{P(n,r)}{r!}",
        "\\text{order does not matter }\\Rightarrow\\text{ combination}",
      ],
    },
    workedExamples: combinationExamples,
    guidedPractice: [
      countAnswer("y11ext-pc-comb-g1", "How many groups of 2 can be chosen from 5 students?", "\\text{choose 2 students from 5}", "10"),
      countAnswer("y11ext-pc-comb-g2", "Evaluate the combination.", "C(6,3)", "20"),
      countAnswer("y11ext-pc-comb-g3", "A cafe lets a customer choose 3 toppings from 7. How many topping selections are possible?", "\\text{choose 3 toppings from 7}", "35"),
      choice("y11ext-pc-comb-g4", "Which context is best counted using a combination?", "B", ["Assigning first and second place", "Choosing 4 students for a committee with no roles", "Arranging books on a shelf", "Creating a 3-letter code"], "A committee with no roles is an unordered selection."),
    ],
    independentPractice: [
      countAnswer("y11ext-pc-comb-i1", "How many teams of 4 can be chosen from 9 players?", "\\text{choose 4 players from 9}", "126"),
      countAnswer("y11ext-pc-comb-i2", "Evaluate the combination.", "C(8,2)", "28"),
      countAnswer("y11ext-pc-comb-i3", "How many committees of 3 can be chosen from 10 people?", "\\text{choose 3 people from 10}", "120"),
      choice("y11ext-pc-comb-i4", "A student counts choosing 2 toppings from 6 as 30 ordered pairs. What should happen next?", "C", ["Multiply by 2", "Add 6", "Divide by $2!$", "Use $6!$"], "Each unordered pair has been counted in two orders."),
      countAnswer("y11ext-pc-comb-i5", "The value of P(7,3) is 210. What is C(7,3)?", "\\text{ordered count }210\\text{ for selections of 3}", "35"),
    ],
    commonMistakes: [
      { mistake: "Using a permutation for a group with no roles.", fix: "If the same group is unchanged by reordering, use a combination." },
      { mistake: "Counting the same selected group several times.", fix: "Divide ordered arrangements by $r!$ to remove repeated orders." },
      { mistake: "Assuming every selection has order.", fix: "Look for words such as group, committee, team, or selection." },
      { mistake: "Forgetting that different roles change the problem.", fix: "If roles are named, the count may become a permutation." },
    ],
    masteryQuiz: [
      countAnswer("y11ext-pc-comb-m1", "How many pairs can be chosen from 6 students?", "\\text{choose 2 students from 6}", "15"),
      countAnswer("y11ext-pc-comb-m2", "Evaluate the combination.", "C(7,3)", "35"),
      countAnswer("y11ext-pc-comb-m3", "A group of 4 is chosen from 8 students. How many groups are possible?", "\\text{choose 4 students from 8}", "70"),
      countAnswer("y11ext-pc-comb-m4", "How many ways can 2 electives be selected from 9 electives?", "\\text{choose 2 electives from 9}", "36"),
      countAnswer("y11ext-pc-comb-m5", "A committee of 5 is chosen from 10 people. How many committees are possible?", "\\text{choose 5 people from 10}", "252"),
      choice("y11ext-pc-comb-m6", "Which notation matches an unordered selection of 3 objects from 11 distinct objects?", "B", ["$P(11,3)$", "$C(11,3)$", "$11!$", "$3^{11}$"], "An unordered selection is a combination."),
      choice("y11ext-pc-comb-m7", "A student says choosing Ali and Bea is different from choosing Bea and Ali for the same team. What is the issue?", "A", ["The same team has been counted twice", "The team has no members", "Order must always matter", "The answer must be zero"], "For a team, the order of names does not create a new selection."),
      choice("y11ext-pc-comb-m8", "Which situation should not be counted using a combination?", "D", ["Choosing 3 books to borrow", "Selecting 4 students for a group", "Choosing 2 toppings", "Assigning president and secretary"], "Different roles make order matter."),
      countAnswer("y11ext-pc-comb-m9", "There are 12 players. How many starting groups of 5 can be selected if positions are not assigned?", "\\text{choose 5 players from 12}", "792"),
      countAnswer("y11ext-pc-comb-m10", "The value of P(8,2) is 56. What is C(8,2)?", "\\text{ordered count }56\\text{ for selections of 2}", "28"),
    ],
  };
}

function restrictionsLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Count arrangements with together, not-together, repeated-object, and circular restrictions.",
      "Arrangements with restrictions"
    ),
    learningIntention:
      "Choose efficient strategies for restricted arrangements using blocks, complements, repeated objects, and circular counting.",
    successCriteria: [
      "Use a block to count arrangements where specified objects must stay together.",
      "Use a complement to count arrangements where specified objects must not stay together.",
      "Count arrangements with repeated identical objects using factorial division.",
      "Count simple circular arrangements of distinct objects using $(n-1)!$.",
      "Choose between cases, complements, and fixed-position reasoning.",
      "Check whether restrictions change the objects being arranged or only their positions.",
    ],
    teaching: {
      paragraphs: [
        "Restricted arrangements often become manageable after choosing the right structure.",
        "When objects must be together, treat them as a single block, arrange the block with the other objects, then arrange inside the block.",
        "When objects must not be together, it is often safer to count all arrangements and subtract the arrangements where they are together.",
        "When some objects are identical, divide by the factorial of each repeated group to remove repeated arrangements that look the same.",
        "For distinct objects around a round table, rotations are considered the same. Fix one object, then arrange the remaining objects.",
      ],
      latexBlocks: [
        "\\text{together: arrange a block, then arrange inside the block}",
        "\\text{not together: total}-\\text{together}",
        "\\text{repeated objects: }\\frac{n!}{a!b!\\cdots}",
        "\\text{circular arrangements of }n\\text{ distinct objects: }(n-1)!",
      ],
    },
    workedExamples: restrictionExamples,
    guidedPractice: [
      countAnswer("y11ext-pc-rest-g1", "How many ways can 5 people stand in a line if two nominated people must stand together?", "\\text{5 people, nominated pair together}", "48"),
      countAnswer("y11ext-pc-rest-g2", "How many distinct arrangements are there of the letters in LEVEL?", "\\text{letters in LEVEL}", "30"),
      countAnswer("y11ext-pc-rest-g3", "How many ways can 5 distinct people sit around a round table?", "\\text{5 distinct people around a table}", "24"),
      choice("y11ext-pc-rest-g4", "For two people who must not stand together in a line, which approach is usually efficient?", "C", ["Use circular arrangements", "Ignore the restriction", "Subtract together arrangements from all arrangements", "Divide by the number of people"], "The complement is often efficient for not-together restrictions."),
    ],
    independentPractice: [
      countAnswer("y11ext-pc-rest-i1", "How many ways can 6 people stand in a line if two nominated people must stand together?", "\\text{6 people, nominated pair together}", "240"),
      countAnswer("y11ext-pc-rest-i2", "How many ways can 6 people stand in a line if two nominated people must not stand together?", "\\text{6 people, nominated pair not together}", "480"),
      countAnswer("y11ext-pc-rest-i3", "How many distinct arrangements are there of the letters in BALLOON?", "\\text{letters in BALLOON}", "1260"),
      countAnswer("y11ext-pc-rest-i4", "How many ways can 7 distinct people sit around a round table?", "\\text{7 distinct people around a table}", "720"),
      choice("y11ext-pc-rest-i5", "A word has two identical letters. Why is division by a factorial needed?", "B", ["To make the answer larger", "To remove arrangements that look identical", "To force circular seating", "To make order irrelevant"], "Swapping identical letters does not create a new visible arrangement."),
    ],
    commonMistakes: [
      { mistake: "Forgetting to arrange inside a block.", fix: "After forming a block, multiply by the internal arrangements of the block." },
      { mistake: "Counting not-together arrangements directly without checking gaps.", fix: "Use total minus together when the complement is simpler." },
      { mistake: "Treating identical letters as distinct.", fix: "Divide by the factorial of each repeated group." },
      { mistake: "Using $n!$ for a round-table arrangement.", fix: "For distinct objects around a circle, use $(n-1)!$." },
    ],
    masteryQuiz: [
      countAnswer("y11ext-pc-rest-m1", "How many ways can 5 people stand in a line if two nominated people must stand together?", "\\text{5 people, nominated pair together}", "48"),
      countAnswer("y11ext-pc-rest-m2", "How many distinct arrangements are there of the letters in LEVEL?", "\\text{letters in LEVEL}", "30"),
      countAnswer("y11ext-pc-rest-m3", "How many ways can 6 distinct people sit around a round table?", "\\text{6 distinct people around a table}", "120"),
      countAnswer("y11ext-pc-rest-m4", "How many ways can 6 people stand in a line if two nominated people must not stand together?", "\\text{6 people, nominated pair not together}", "480"),
      countAnswer("y11ext-pc-rest-m5", "How many distinct arrangements are there of the letters in BALLOON?", "\\text{letters in BALLOON}", "1260"),
      choice("y11ext-pc-rest-m6", "Which method is most direct when two specified people must sit together in a row?", "A", ["Use a block", "Use circular fixing", "Use a committee selection", "Ignore the pair"], "Together restrictions are usually handled by treating the pair as a block."),
      choice("y11ext-pc-rest-m7", "A student uses 7! for arranging 7 people around a round table. What is the issue?", "C", ["The answer is too small", "The people are identical", "Rotations have been counted repeatedly", "The table has no seats"], "Circular arrangements treat rotations as the same."),
      choice("y11ext-pc-rest-m8", "For two nominated people who must not be adjacent, why can a complement be useful?", "D", ["It changes the people", "It makes all arrangements impossible", "It removes order", "It subtracts the easier adjacent case"], "Not-adjacent counts are often total arrangements minus adjacent arrangements."),
      countAnswer("y11ext-pc-rest-m9", "How many ways can 7 people stand in a line if two nominated people must stand together?", "\\text{7 people, nominated pair together}", "1440"),
      countAnswer("y11ext-pc-rest-m10", "How many distinct arrangements are there of the letters in SUCCESS?", "\\text{letters in SUCCESS}", "420"),
    ],
  };
}

function examLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(
      lesson,
      "Apply counting principles, permutations, combinations, and restrictions to mixed assessment-style questions.",
      "Mixed permutations and combinations"
    ),
    learningIntention:
      "Select and apply suitable counting strategies in mixed Extension-style permutations and combinations questions.",
    successCriteria: [
      "Choose between addition, multiplication, permutations, and combinations.",
      "Evaluate factorial, permutation, and combination counts accurately.",
      "Identify when order matters and when it does not.",
      "Apply block, complement, repeated-object, and circular strategies.",
      "Interpret common counting errors in worked solutions.",
      "Use concise working that matches the wording of the question.",
    ],
    teaching: {
      paragraphs: [
        "Mixed counting questions are mainly about choosing the correct structure before calculating.",
        "Look for whether the task is staged, split into separate cases, ordered, unordered, restricted, repeated, or circular.",
        "Words such as arranged, ranked, roles, or positions usually indicate order matters. Words such as group, committee, or selection usually indicate order does not matter.",
        "For restrictions, decide whether a block, complement, repeated-object formula, or circular arrangement is the safest first move.",
      ],
      latexBlocks: [
        "\\text{stages }\\Rightarrow\\text{ multiply}",
        "\\text{separate cases }\\Rightarrow\\text{ add}",
        "\\text{order matters }\\Rightarrow P(n,r)",
        "\\text{order does not matter }\\Rightarrow C(n,r)",
        "\\text{not together }\\Rightarrow\\text{ total}-\\text{together}",
      ],
    },
    workedExamples: examExamples,
    guidedPractice: [
      countAnswer("y11ext-pc-exam-g1", "A code has one letter from 4 choices and one digit from 6 choices. How many codes are possible?", "\\text{one letter stage, one digit stage}", "24"),
      countAnswer("y11ext-pc-exam-g2", "How many ordered top 2 places can be awarded from 7 finalists?", "\\text{7 finalists, ordered top 2}", "42"),
      countAnswer("y11ext-pc-exam-g3", "How many groups of 3 can be chosen from 9 students?", "\\text{choose 3 students from 9}", "84"),
      choice("y11ext-pc-exam-g4", "A question asks for a committee with no roles. Which count type should be used?", "B", ["Permutation", "Combination", "Circular arrangement", "Repeated letters"], "A committee with no roles is an unordered selection."),
    ],
    independentPractice: [
      countAnswer("y11ext-pc-exam-i1", "How many arrangements are there of 6 distinct objects in a row?", "\\text{arrange 6 distinct objects}", "720"),
      countAnswer("y11ext-pc-exam-i2", "How many ways can 4 people be selected from 11 people for an unranked group?", "\\text{choose 4 people from 11}", "330"),
      countAnswer("y11ext-pc-exam-i3", "How many distinct arrangements are there of the letters in RADAR?", "\\text{letters in RADAR}", "30"),
      countAnswer("y11ext-pc-exam-i4", "How many ways can 6 people sit around a round table?", "\\text{6 distinct people around a table}", "120"),
      choice("y11ext-pc-exam-i5", "A student counts president and secretary choices using a combination. What has been missed?", "A", ["The roles are different", "The people are identical", "The order does not matter", "There are no choices"], "Different roles make order matter."),
    ],
    commonMistakes: [
      { mistake: "Choosing a formula before reading whether order matters.", fix: "Decide whether the outcome is ordered or unordered first." },
      { mistake: "Using multiplication for separate either-or cases.", fix: "Separate mutually exclusive cases are added." },
      { mistake: "Forgetting repeated objects in letter arrangements.", fix: "Divide by factorials for repeated identical letters." },
      { mistake: "Ignoring restrictions until after calculating.", fix: "Build the restriction into the counting structure from the start." },
    ],
    masteryQuiz: [
      countAnswer("y11ext-pc-exam-m1", "Evaluate the factorial.", "4!", "24"),
      countAnswer("y11ext-pc-exam-m2", "How many ordered top 3 places can be awarded from 6 finalists?", "\\text{6 finalists, ordered top 3}", "120"),
      countAnswer("y11ext-pc-exam-m3", "How many groups of 3 can be chosen from 8 students?", "\\text{choose 3 students from 8}", "56"),
      countAnswer("y11ext-pc-exam-m4", "A code has two letters chosen from 5 letters, followed by one digit from 4 digits. Repetition is allowed. How many codes are possible?", "\\text{two letter stages and one digit stage}", "100"),
      countAnswer("y11ext-pc-exam-m5", "How many distinct arrangements are there of the letters in LEVEL?", "\\text{letters in LEVEL}", "30"),
      countAnswer("y11ext-pc-exam-m6", "How many ways can 6 people stand in a line if two nominated people must stand together?", "\\text{6 people, nominated pair together}", "240"),
      choice("y11ext-pc-exam-m7", "Which question should be counted using a combination?", "C", ["Arrange 5 books", "Rank 3 finalists", "Select 4 students for a group", "Assign 2 leadership roles"], "A group with no roles is an unordered selection."),
      choice("y11ext-pc-exam-m8", "A student gets an answer that is too large for selecting a group because each group has been counted in several orders. Which correction is likely needed?", "B", ["Multiply by another factorial", "Divide by the arrangements of the selected objects", "Use circular seating", "Add separate cases"], "Combinations remove repeated orderings of the same selected group."),
      countAnswer("y11ext-pc-exam-m9", "How many ways can 7 people stand in a line if two nominated people must not stand together?", "\\text{7 people, nominated pair not together}", "3600"),
      countAnswer("y11ext-pc-exam-m10", "How many ways can 8 distinct people sit around a round table?", "\\text{8 distinct people around a table}", "5040"),
    ],
  };
}

export function year11ExtensionPermutationsCombinationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-extension" ||
    unit.slug !== "permutations-combinations"
  ) {
    return null;
  }

  if (lesson.slug === "counting-principles") {
    return countingLesson(lesson);
  }

  if (lesson.slug === "permutations") {
    return permutationsLesson(lesson);
  }

  if (lesson.slug === "combinations") {
    return combinationsLesson(lesson);
  }

  if (lesson.slug === "arrangements-with-restrictions") {
    return restrictionsLesson(lesson);
  }

  if (lesson.slug === "perms-combs-exam-practice") {
    return examLesson(lesson);
  }

  return null;
}
