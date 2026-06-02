import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function probabilityVariants(answer: string, extra: string[] = []) {
  const variants = [answer, ...extra];
  const fraction = answer.match(/^(\d+)\/(\d+)$/);

  if (fraction) {
    const value = Number(fraction[1]) / Number(fraction[2]);
    variants.push(String(value), `${value * 100}%`);
  }

  return Array.from(new Set(variants));
}

function probAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: probabilityVariants(answer, acceptedAnswers),
    hint: "Identify the relevant outcomes or restricted group before calculating.",
    explanation,
  };
}

function probChoice(
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
      text: choices[index],
    })),
    answer,
    hint: "Match the description to the probability idea being tested.",
    explanation,
  };
}

const multiStageWorkedExamples: WorkedExample[] = [
  {
    title: "Count outcomes for a coin and a die",
    questionLatex: "\\text{A fair coin is tossed and a fair six-sided die is rolled. How many outcomes are possible?}",
    steps: [
      { explanation: "There are 2 possible coin outcomes and 6 possible die outcomes.", latex: "2\\times 6=12" },
      { explanation: "Use multiplication because each coin result can occur with each die result." },
    ],
    finalAnswerLatex: "12\\text{ outcomes}",
  },
  {
    title: "Find a combined-event probability",
    questionLatex: "\\text{A fair coin is tossed and a fair die is rolled. Find }P(\\text{heads and an even number}).",
    steps: [
      { explanation: "There are 12 equally likely combined outcomes." },
      { explanation: "Three outcomes are favourable: heads with 2, 4 or 6.", latex: "P=\\frac{3}{12}=\\frac{1}{4}" },
    ],
    finalAnswerLatex: "\\frac{1}{4}",
  },
  {
    title: "Compare replacement and no replacement",
    questionLatex: "\\text{A bag has 3 red and 2 blue counters. Find the probability of selecting red twice without replacement.}",
    steps: [
      { explanation: "The first red selection has probability 3 out of 5.", latex: "\\frac{3}{5}" },
      { explanation: "Without replacement, 2 red counters remain out of 4 counters.", latex: "\\frac{2}{4}" },
      { explanation: "Multiply along the two-stage path.", latex: "\\frac{3}{5}\\times\\frac{2}{4}=\\frac{3}{10}" },
    ],
    finalAnswerLatex: "\\frac{3}{10}",
  },
];

const multiStageGuided: PracticeQuestion[] = [
  probAnswer("y10-prob-ms-g1", "A spinner has 4 sectors and a coin is tossed. How many combined outcomes are possible?", "\\text{spinner sectors}=4,\\quad \\text{coin outcomes}=2", "8", "There are 8 combined outcomes."),
  probAnswer("y10-prob-ms-g2", "A fair coin is tossed and a fair six-sided die is rolled. Find the probability of tails and rolling a 5.", "\\text{coin outcomes}=2,\\quad \\text{die outcomes}=6", "1/12", "Only one of the 12 equally likely combined outcomes is favourable."),
  probChoice("y10-prob-ms-g3", "A counter is selected, replaced, and then another counter is selected. What stays the same for the second selection?", "B", ["The first selected colour must repeat", "The number of counters in the bag", "The probability becomes zero", "The sample space has one outcome"], "Replacement returns the bag to its original composition."),
  probAnswer("y10-prob-ms-g4", "A bag has 4 red and 1 blue counter. Two counters are selected without replacement. Find the probability of selecting blue first and then red.", "\\text{bag: }4\\text{ red},\\quad 1\\text{ blue}", "1/5", "The probability is one fifth: blue must be selected first, then any remaining counter is red."),
];

const multiStageIndependent: PracticeQuestion[] = [
  probAnswer("y10-prob-ms-i1", "A menu has 3 drink choices and 4 sandwich choices. How many drink-and-sandwich combinations are possible?", "\\text{drinks}=3,\\quad \\text{sandwiches}=4", "12", "There are 12 possible combinations."),
  probAnswer("y10-prob-ms-i2", "Two fair coins are tossed. Find the probability of two heads.", "\\text{two fair coin tosses}", "1/4", "One of the four equally likely outcomes is two heads."),
  probAnswer("y10-prob-ms-i3", "A fair die is rolled twice. Find the probability of rolling a 6 both times.", "\\text{two rolls of a fair six-sided die}", "1/36", "Each roll has probability one sixth, so both sixes have probability one thirty-sixth."),
  probChoice("y10-prob-ms-i4", "A bag has 5 counters. One counter is selected and not replaced. How many counters are available for the second selection?", "C", ["3", "5", "4", "10"], "Without replacement, one counter has been removed, leaving 4."),
  probAnswer("y10-prob-ms-i5", "A bag has 2 green and 3 yellow counters. Two counters are selected with replacement. Find the probability of selecting green both times.", "\\text{bag: }2\\text{ green},\\quad 3\\text{ yellow};\\quad \\text{with replacement}", "4/25", "Each green selection has probability two fifths, so the combined probability is four twenty-fifths."),
];

const multiStageMastery: PracticeQuestion[] = [
  probAnswer("y10-prob-ms-m1", "A spinner has 3 sectors and a die has 6 faces. How many combined outcomes are possible?", "\\text{spinner sectors}=3,\\quad \\text{die faces}=6", "18", "There are 18 combined outcomes."),
  probAnswer("y10-prob-ms-m2", "Two fair coins are tossed. Find the probability of heads followed by tails.", "\\text{two fair coin tosses}", "1/4", "One of the four equally likely outcomes is heads then tails."),
  probChoice("y10-prob-ms-m3", "Which phrase means the first selected counter is returned before the second selection?", "A", ["With replacement", "Without replacement", "Mutually exclusive", "Outside both sets"], "With replacement means the counter is returned."),
  probAnswer("y10-prob-ms-m4", "A 5-sector spinner and a 4-sector spinner are spun. How many combined outcomes are possible?", "\\text{first spinner sectors}=5,\\quad \\text{second spinner sectors}=4", "20", "Multiply the numbers of possible outcomes."),
  probAnswer("y10-prob-ms-m5", "A fair die is rolled and a fair coin is tossed. Find the probability of rolling an odd number and tossing heads.", "\\text{fair die and fair coin}", "1/4", "Three of the 12 combined outcomes are favourable."),
  probAnswer("y10-prob-ms-m6", "A bag has 3 red and 2 blue counters. Two counters are selected with replacement. Find the probability of selecting blue twice.", "\\text{bag: }3\\text{ red},\\quad 2\\text{ blue};\\quad \\text{with replacement}", "4/25", "Multiply two probabilities of two fifths."),
  probAnswer("y10-prob-ms-m7", "A bag has 3 red and 2 blue counters. Two counters are selected without replacement. Find the probability of selecting blue twice.", "\\text{bag: }3\\text{ red},\\quad 2\\text{ blue};\\quad \\text{without replacement}", "1/10", "The probabilities are two fifths and one quarter."),
  probChoice("y10-prob-ms-m8", "A bag has 4 red and 3 blue counters. Two counters are selected without replacement. Which calculation finds the probability of selecting one red and one blue in any order?", "D", ["$\\frac{4}{7}\\times\\frac{3}{6}$", "$\\frac{3}{7}\\times\\frac{4}{6}$", "$\\frac{4}{7}+\\frac{3}{7}$", "$\\frac{4}{7}\\times\\frac{3}{6}+\\frac{3}{7}\\times\\frac{4}{6}$"], "One red and one blue can occur in either order, so add the two path probabilities."),
  probAnswer("y10-prob-ms-m9", "A bag has 4 red and 3 blue counters. Two counters are selected without replacement. Find the probability of selecting one red and one blue in any order.", "\\text{bag: }4\\text{ red},\\quad 3\\text{ blue};\\quad \\text{without replacement}", "4/7", "Adding the red-blue and blue-red paths gives four sevenths."),
  probChoice("y10-prob-ms-m10", "A password uses one letter from A, B or C, followed by one digit from 1, 2, 3 or 4. Exactly one password is chosen at random. What is the probability that it starts with B and ends with an even digit?", "B", ["$\\frac{1}{12}$", "$\\frac{1}{6}$", "$\\frac{1}{4}$", "$\\frac{1}{2}$"], "There are 12 passwords and two favourable passwords: B2 and B4."),
];

const treeWorkedExamples: WorkedExample[] = [
  {
    title: "Multiply along a path",
    questionLatex: "\\text{A fair coin is tossed twice. Find }P(HT).",
    steps: [
      { explanation: "Follow the heads branch and then the tails branch.", latex: "P(HT)=\\frac{1}{2}\\times\\frac{1}{2}" },
      { explanation: "Multiply along the path.", latex: "P(HT)=\\frac{1}{4}" },
    ],
    finalAnswerLatex: "\\frac{1}{4}",
  },
  {
    title: "Add paths for an or event",
    questionLatex: "\\text{A fair coin is tossed twice. Find the probability of exactly one head.}",
    steps: [
      { explanation: "Exactly one head can occur as heads-tails or tails-heads.", latex: "P(HT)=\\frac{1}{4},\\quad P(TH)=\\frac{1}{4}" },
      { explanation: "Add the two paths.", latex: "\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}" },
    ],
    finalAnswerLatex: "\\frac{1}{2}",
  },
  {
    title: "Update branches without replacement",
    questionLatex: "\\text{A bag has 3 red and 2 blue counters. Two are selected without replacement. Find }P(RB).",
    steps: [
      { explanation: "The first red branch has probability three fifths.", latex: "\\frac{3}{5}" },
      { explanation: "After a red is removed, two blue counters remain among four counters.", latex: "\\frac{2}{4}" },
      { explanation: "Multiply along the red-blue path.", latex: "\\frac{3}{5}\\times\\frac{2}{4}=\\frac{3}{10}" },
    ],
    finalAnswerLatex: "\\frac{3}{10}",
  },
];

const treeGuided: PracticeQuestion[] = [
  probAnswer("y10-prob-tree-g1", "A fair coin is tossed twice. Find the probability of tails followed by tails.", "\\text{two fair coin tosses}", "1/4", "Multiply the two tails branches."),
  probChoice("y10-prob-tree-g2", "On a tree diagram, what should you do with branch probabilities along one complete path?", "C", ["Subtract them", "Add them", "Multiply them", "Ignore them"], "Multiply branch probabilities along a path."),
  probAnswer("y10-prob-tree-g3", "A bag has 2 red and 3 blue counters. Two counters are selected with replacement. Find the probability of red followed by blue.", "\\text{bag: }2\\text{ red},\\quad 3\\text{ blue};\\quad \\text{with replacement}", "6/25", "Multiply two fifths by three fifths."),
  probAnswer("y10-prob-tree-g4", "A bag has 2 red and 3 blue counters. Two counters are selected without replacement. Find the probability of red followed by blue.", "\\text{bag: }2\\text{ red},\\quad 3\\text{ blue};\\quad \\text{without replacement}", "3/10", "Multiply two fifths by three quarters."),
];

const treeIndependent: PracticeQuestion[] = [
  probAnswer("y10-prob-tree-i1", "A fair coin is tossed twice. Find the probability of exactly one tail.", "\\text{two fair coin tosses}", "1/2", "Add the heads-tails and tails-heads paths."),
  probAnswer("y10-prob-tree-i2", "A bag has 4 green and 1 yellow counter. Two counters are selected with replacement. Find the probability of yellow twice.", "\\text{bag: }4\\text{ green},\\quad 1\\text{ yellow};\\quad \\text{with replacement}", "1/25", "Multiply one fifth by one fifth."),
  probAnswer("y10-prob-tree-i3", "A bag has 4 green and 1 yellow counter. Two counters are selected without replacement. Find the probability of green followed by yellow.", "\\text{bag: }4\\text{ green},\\quad 1\\text{ yellow};\\quad \\text{without replacement}", "1/5", "Multiply four fifths by one quarter."),
  probChoice("y10-prob-tree-i4", "Which phrase tells you to add the probabilities of two different paths?", "B", ["Along one path", "Either path can produce the event", "Without replacement", "The branches are labelled"], "Add path probabilities when more than one path produces the event."),
  probAnswer("y10-prob-tree-i5", "A bag has 3 red and 2 blue counters. Two counters are selected without replacement. Find the probability of two counters of the same colour.", "\\text{bag: }3\\text{ red},\\quad 2\\text{ blue};\\quad \\text{without replacement}", "2/5", "Add the red-red and blue-blue path probabilities."),
];

const treeMastery: PracticeQuestion[] = [
  probAnswer("y10-prob-tree-m1", "A fair coin is tossed twice. Find the probability of two heads.", "\\text{two fair coin tosses}", "1/4", "Multiply the two heads branches."),
  probChoice("y10-prob-tree-m2", "What happens to the second-stage probabilities when a counter is not replaced?", "A", ["They may change", "They always stay equal", "They become percentages above 100%", "They are ignored"], "Removing a counter changes the bag composition."),
  probAnswer("y10-prob-tree-m3", "A bag has 1 red and 3 blue counters. Two counters are selected with replacement. Find the probability of red followed by blue.", "\\text{bag: }1\\text{ red},\\quad 3\\text{ blue};\\quad \\text{with replacement}", "3/16", "Multiply one quarter by three quarters."),
  probAnswer("y10-prob-tree-m4", "A fair coin is tossed twice. Find the probability of at least one head.", "\\text{two fair coin tosses}", "3/4", "Three of the four paths include at least one head."),
  probAnswer("y10-prob-tree-m5", "A bag has 3 red and 2 blue counters. Two counters are selected without replacement. Find the probability of red followed by red.", "\\text{bag: }3\\text{ red},\\quad 2\\text{ blue};\\quad \\text{without replacement}", "3/10", "Multiply three fifths by two quarters."),
  probAnswer("y10-prob-tree-m6", "A bag has 3 red and 2 blue counters. Two counters are selected without replacement. Find the probability of one counter of each colour.", "\\text{bag: }3\\text{ red},\\quad 2\\text{ blue};\\quad \\text{without replacement}", "3/5", "Add the red-blue and blue-red paths."),
  probChoice("y10-prob-tree-m7", "A bag contains 2 green and 3 yellow counters. Which second branch probability follows a first green selection without replacement?", "D", ["$P(G)=\\frac{2}{5}$", "$P(Y)=\\frac{3}{5}$", "$P(G)=\\frac{2}{4}$", "$P(Y)=\\frac{3}{4}$"], "After a green is removed, 3 yellow counters remain among 4 counters."),
  probAnswer("y10-prob-tree-m8", "A bag has 2 red and 3 blue counters. Two counters are selected without replacement. Find the probability that the second counter is blue.", "\\text{bag: }2\\text{ red},\\quad 3\\text{ blue};\\quad \\text{without replacement}", "3/5", "Add the red-blue and blue-blue paths."),
  probChoice("y10-prob-tree-m9", "A tree has paths with probabilities one quarter, one quarter, one quarter and one quarter. Which calculation finds the probability of exactly one head in two fair coin tosses?", "C", ["$\\frac{1}{4}$", "$\\frac{1}{4}\\times\\frac{1}{4}$", "$\\frac{1}{4}+\\frac{1}{4}$", "$1-\\frac{1}{4}-\\frac{1}{4}-\\frac{1}{4}$"], "Exactly one head is produced by two paths, so add their probabilities."),
  probAnswer("y10-prob-tree-m10", "A bag has 2 red, 1 blue and 1 green counter. Two counters are selected without replacement. Find the probability that neither counter is red.", "\\text{bag: }2\\text{ red},\\quad 1\\text{ blue},\\quad 1\\text{ green};\\quad \\text{without replacement}", "1/6", "The non-red paths are blue-green and green-blue, which add to one sixth."),
];

const vennWorkedExamples: WorkedExample[] = [
  {
    title: "Fill the overlap and single-set regions",
    questionLatex: "\\text{In a class of 30 students, 18 play sport, 12 play music, and 5 play both. Find how many play sport only and music only.}",
    steps: [
      { explanation: "Subtract the overlap from each set total.", latex: "\\text{sport only}=18-5=13" },
      { explanation: "Repeat for music.", latex: "\\text{music only}=12-5=7" },
    ],
    finalAnswerLatex: "\\text{sport only}=13,\\quad \\text{music only}=7",
    vennDiagram: {
      description: "Venn diagram for a class of 30 students. Sport only is 13, both sport and music is 5, music only is 7, and neither is 5.",
      setALabel: "Sport",
      setBLabel: "Music",
      aOnly: 13,
      intersection: 5,
      bOnly: 7,
      neither: 5,
      total: 30,
    },
  },
  {
    title: "Find the union",
    questionLatex: "\\text{Using the same class, find how many students play sport or music.}",
    steps: [
      { explanation: "Add the two set totals, then subtract the overlap counted twice.", latex: "18+12-5=25" },
    ],
    finalAnswerLatex: "25",
    vennDiagram: {
      description: "Venn diagram for the same class. The union contains sport only 13, both activities 5, and music only 7, for a total of 25 students in at least one circle.",
      setALabel: "Sport",
      setBLabel: "Music",
      aOnly: 13,
      intersection: 5,
      bOnly: 7,
      neither: 5,
      total: 30,
    },
  },
  {
    title: "Find outside both sets",
    questionLatex: "\\text{In a group of 40 students, 22 study French, 15 study Japanese, and 8 study both. Find how many study neither.}",
    steps: [
      { explanation: "First find the number in at least one set.", latex: "22+15-8=29" },
      { explanation: "Subtract from the total group.", latex: "40-29=11" },
    ],
    finalAnswerLatex: "11",
    vennDiagram: {
      description: "Venn diagram for a group of 40 students. French only is 14, both languages is 8, Japanese only is 7, and the 11 students outside both circles study neither language.",
      setALabel: "French",
      setBLabel: "Japanese",
      aOnly: 14,
      intersection: 8,
      bOnly: 7,
      neither: 11,
      total: 40,
    },
  },
];

const vennGuided: PracticeQuestion[] = [
  probAnswer("y10-prob-venn-g1", "In a class, 16 students play sport and 6 of them also play music. How many play sport only?", "\\text{sport}=16,\\quad \\text{both}=6", "10", "Subtract the overlap from the sport total."),
  probAnswer("y10-prob-venn-g2", "In a group of 30 students, 14 like tea, 12 like coffee, and 5 like both. How many like tea or coffee?", "\\text{tea}=14,\\quad \\text{coffee}=12,\\quad \\text{both}=5", "21", "Add the set totals and subtract the overlap once."),
  probAnswer("y10-prob-venn-g3", "In a group of 30 students, 14 like tea, 12 like coffee, and 5 like both. How many like neither?", "\\text{total}=30,\\quad \\text{tea}=14,\\quad \\text{coffee}=12,\\quad \\text{both}=5", "9", "There are 21 in the union, leaving 9 outside both sets."),
  probChoice("y10-prob-venn-g4", "Which region represents students who study both science and music?", "B", ["Outside both circles", "The overlap of the circles", "Science only", "Music only"], "The overlap represents membership of both sets."),
];

const vennIndependent: PracticeQuestion[] = [
  probAnswer("y10-prob-venn-i1", "In a survey, 20 students use a bus, 13 use a train, and 7 use both. How many use a bus only?", "\\text{bus}=20,\\quad \\text{train}=13,\\quad \\text{both}=7", "13", "Subtract the overlap from the bus total."),
  probAnswer("y10-prob-venn-i2", "In a survey of 35 students, 20 use a bus, 13 use a train, and 7 use both. How many use neither?", "\\text{total}=35,\\quad \\text{bus}=20,\\quad \\text{train}=13,\\quad \\text{both}=7", "9", "The union contains 26 students, so 9 use neither."),
  probAnswer("y10-prob-venn-i3", "In a group of 40 students, 18 play chess, 15 play tennis, and 6 play both. Find the probability that a randomly selected student plays both.", "\\text{total}=40,\\quad \\text{both}=6", "3/20", "Six out of 40 students play both, which simplifies to three twentieths."),
  probChoice("y10-prob-venn-i4", "Which description matches the union of sets A and B?", "C", ["In A but not B", "In both A and B only", "In A or B or both", "Outside A and B"], "The union includes everything in either set, including the overlap."),
  probAnswer("y10-prob-venn-i5", "In a class of 32 students, 17 study art, 14 study drama, and 8 study both. How many study art only?", "\\text{art}=17,\\quad \\text{drama}=14,\\quad \\text{both}=8", "9", "Subtract the overlap from the art total."),
];

const vennMastery: PracticeQuestion[] = [
  probAnswer("y10-prob-venn-m1", "A set contains 15 students and its overlap with another set contains 4 students. How many are in the first set only?", "\\text{set total}=15,\\quad \\text{overlap}=4", "11", "Subtract the overlap."),
  probChoice("y10-prob-venn-m2", "Where are students who belong to neither set shown?", "D", ["In the first circle only", "In the overlap", "In the second circle only", "Outside both circles"], "Students in neither set are outside both circles."),
  probAnswer("y10-prob-venn-m3", "In a group, 18 students like films, 11 like games, and 3 like both. How many like films or games?", "\\text{films}=18,\\quad \\text{games}=11,\\quad \\text{both}=3", "26", "Add the set totals and subtract the overlap once."),
  probAnswer("y10-prob-venn-m4", "In a group of 40 students, 18 like films, 11 like games, and 3 like both. How many like neither?", "\\text{total}=40,\\quad \\text{films}=18,\\quad \\text{games}=11,\\quad \\text{both}=3", "14", "The union contains 26 students, leaving 14."),
  probAnswer("y10-prob-venn-m5", "In a group of 50 students, 24 play sport, 20 play music, and 9 play both. Find the probability that a selected student plays both.", "\\text{total}=50,\\quad \\text{both}=9", "9/50", "Nine of the 50 students are in the overlap."),
  probChoice("y10-prob-venn-m6", "Which description matches the intersection of sets A and B?", "A", ["In both A and B", "In A or B or both", "Outside both sets", "In A only"], "The intersection is the overlap of the two sets."),
  probAnswer("y10-prob-venn-m7", "In a group of 60 students, 32 play sport, 25 play music, and 12 play both. How many play exactly one of the two activities?", "\\text{total}=60,\\quad \\text{sport}=32,\\quad \\text{music}=25,\\quad \\text{both}=12", "33", "Sport only is 20 and music only is 13, giving 33."),
  probAnswer("y10-prob-venn-m8", "In a group of 80 students, 46 study science, 35 study music, and 18 study both. Find the probability that a selected student studies neither subject.", "\\text{total}=80,\\quad \\text{science}=46,\\quad \\text{music}=35,\\quad \\text{both}=18", "17/80", "The union contains 63 students, leaving 17 outside both sets."),
  probChoice("y10-prob-venn-m9", "A survey reports 28 students in A, 19 in B, 8 in both, and 45 students in total. Which calculation finds the number outside both sets?", "C", ["$45-(28+19)$", "$45-(28-8)-(19-8)$", "$45-(28+19-8)$", "$28+19-8$"], "Find the union by subtracting the overlap once, then subtract the union from the total. Option B subtracts only the two single-set regions (20 and 11) but omits the overlap itself, giving 14."),
  probAnswer("y10-prob-venn-m10", "In a class of 36 students, 19 play sport, 16 play music, and 7 play both. Find the probability that a selected student plays exactly one activity.", "\\text{total}=36,\\quad \\text{sport}=19,\\quad \\text{music}=16,\\quad \\text{both}=7", "7/12", "Exactly one activity includes 12 sport-only and 9 music-only students, giving 21 out of 36."),
];

const tableA = "\\begin{array}{c|cc|c}&\\text{Maths}&\\text{Art}&\\text{Total}\\\\\\hline\\text{Year 10}&18&12&30\\\\\\text{Year 11}&14&16&30\\\\\\hline\\text{Total}&32&28&60\\end{array}";
const tableB = "\\begin{array}{c|cc|c}&\\text{Sport}&\\text{No sport}&\\text{Total}\\\\\\hline\\text{Bus}&15&10&25\\\\\\text{Walk}&9&6&15\\\\\\hline\\text{Total}&24&16&40\\end{array}";

const tablesWorkedExamples: WorkedExample[] = [
  {
    title: "Read a joint frequency",
    questionLatex: `${tableA}\\quad\\text{How many Year 10 students prefer Maths?}`,
    steps: [{ explanation: "Use the cell where the Year 10 row and Maths column meet.", latex: "18" }],
    finalAnswerLatex: "18",
  },
  {
    title: "Read a marginal frequency",
    questionLatex: `${tableA}\\quad\\text{How many students prefer Art?}`,
    steps: [{ explanation: "Use the total at the bottom of the Art column.", latex: "28" }],
    finalAnswerLatex: "28",
  },
  {
    title: "Compare proportions",
    questionLatex: `${tableB}\\quad\\text{Compare the proportion who play sport in each travel group.}`,
    steps: [
      { explanation: "For bus travellers, compare sport with the bus-row total.", latex: "\\frac{15}{25}=0.60" },
      { explanation: "For walkers, compare sport with the walk-row total.", latex: "\\frac{9}{15}=0.60" },
    ],
    finalAnswerLatex: "\\text{The proportions are equal at }60\\%.",
  },
];

const tablesGuided: PracticeQuestion[] = [
  probAnswer("y10-prob-table-g1", "Using the table, how many Year 11 students prefer Art?", tableA, "16", "Read the Year 11 and Art cell."),
  probAnswer("y10-prob-table-g2", "Using the table, how many students prefer Maths?", tableA, "32", "Read the Maths column total."),
  probAnswer("y10-prob-table-g3", "Using the table, find the probability that a randomly selected student is in Year 10 and prefers Art.", tableA, "1/5", "There are 12 favourable students out of 60."),
  probChoice("y10-prob-table-g4", "In a two-way table, what is a marginal frequency?", "B", ["A value outside the table", "A row or column total", "Only a joint cell", "A probability above 1"], "Marginal frequencies are row or column totals."),
];

const tablesIndependent: PracticeQuestion[] = [
  probAnswer("y10-prob-table-i1", "Using the table, how many bus travellers play sport?", tableB, "15", "Read the Bus and Sport cell."),
  probAnswer("y10-prob-table-i2", "Using the table, how many people do not play sport?", tableB, "16", "Read the No sport column total."),
  probAnswer("y10-prob-table-i3", "Using the table, find the probability that a randomly selected person walks and does not play sport.", tableB, "3/20", "There are 6 favourable people out of 40."),
  probChoice("y10-prob-table-i4", "Which value is a joint frequency in the displayed table?", "A", ["The 15 bus travellers who play sport", "The total of 40 people", "The total of 24 sport players", "The total of 25 bus travellers"], "A joint frequency belongs to one row and one column."),
  probAnswer("y10-prob-table-i5", "Using the table, among walkers, find the proportion who play sport.", tableB, "3/5", "There are 9 sport players among 15 walkers."),
];

const tablesMastery: PracticeQuestion[] = [
  probAnswer("y10-prob-table-m1", "Using the table, how many Year 10 students are included?", tableA, "30", "Read the Year 10 row total."),
  probAnswer("y10-prob-table-m2", "Using the table, how many students prefer Art?", tableA, "28", "Read the Art column total."),
  probChoice("y10-prob-table-m3", "Which description is a joint frequency?", "C", ["All students", "All students in Year 10", "Students in Year 10 who prefer Maths", "All students who prefer Maths"], "A joint frequency is at the intersection of a row and a column."),
  probAnswer("y10-prob-table-m4", "Using the table, find the probability that a randomly selected student is in Year 11 and prefers Maths.", tableA, "7/30", "There are 14 favourable students out of 60."),
  probAnswer("y10-prob-table-m5", "Using the table, find the probability that a randomly selected person travels by bus.", tableB, "5/8", "There are 25 bus travellers out of 40."),
  probAnswer("y10-prob-table-m6", "Using the table, among bus travellers, find the proportion who play sport.", tableB, "3/5", "There are 15 sport players among 25 bus travellers."),
  probAnswer("y10-prob-table-m7", "Using the table, among people who play sport, find the proportion who walk.", tableB, "3/8", "There are 9 walkers among 24 sport players."),
  probChoice("y10-prob-table-m8", "Which group has the higher proportion who play sport?", "D", ["Bus travellers", "Walkers", "The table does not contain enough information", "The proportions are equal"], "Bus travellers have 15 out of 25 and walkers have 9 out of 15. Both equal 60%.", tableB),
  probAnswer("y10-prob-table-m9", "Using the table, find the probability that a randomly selected person travels by bus or plays sport.", tableB, "17/20", "The union has 25 bus travellers plus 24 sport players minus the 15 counted in both groups, giving 34 out of 40."),
  probChoice("y10-prob-table-m10", "A student says 15 out of 40 is the proportion of bus travellers who play sport. What denominator should be used instead?", "B", ["15", "25", "24", "40"], "The restricted group is bus travellers, so use the bus-row total of 25.", tableB),
];

const conditionalWorkedExamples: WorkedExample[] = [
  {
    title: "Restrict the denominator",
    questionLatex: `${tableA}\\quad\\text{Given that a student is in Year 10, find the probability they prefer Maths.}`,
    steps: [
      { explanation: "Restrict attention to the 30 Year 10 students.", latex: "\\text{condition group}=30" },
      { explanation: "Of these students, 18 prefer Maths.", latex: "P(\\text{Maths}\\mid\\text{Year 10})=\\frac{18}{30}=\\frac{3}{5}" },
    ],
    finalAnswerLatex: "\\frac{3}{5}",
  },
  {
    title: "Use an overlap as the favourable count",
    questionLatex: "\\text{Of 24 students who play sport, 9 also play music. Given that a student plays sport, find the probability they play music.}",
    steps: [
      { explanation: "The condition group is the 24 sport players.", latex: "\\text{denominator}=24" },
      { explanation: "The overlap contains 9 students.", latex: "P(\\text{music}\\mid\\text{sport})=\\frac{9}{24}=\\frac{3}{8}" },
    ],
    finalAnswerLatex: "\\frac{3}{8}",
  },
  {
    title: "Distinguish intersection from conditional probability",
    questionLatex: `${tableB}\\quad\\text{Compare }P(\\text{bus and sport})\\text{ with }P(\\text{sport}\\mid\\text{bus}).`,
    steps: [
      { explanation: "For the joint probability, use the overall total.", latex: "P(\\text{bus and sport})=\\frac{15}{40}=\\frac{3}{8}" },
      { explanation: "For the conditional probability, restrict to bus travellers.", latex: "P(\\text{sport}\\mid\\text{bus})=\\frac{15}{25}=\\frac{3}{5}" },
    ],
    finalAnswerLatex: "\\frac{3}{8}\\neq\\frac{3}{5}",
  },
];

const conditionalGuided: PracticeQuestion[] = [
  probAnswer("y10-prob-cond-g1", "Using the table, given that a student is in Year 10, find the probability they prefer Maths.", tableA, "3/5", "Use the 30 Year 10 students as the denominator."),
  probAnswer("y10-prob-cond-g2", "Using the table, given that a person travels by bus, find the probability they play sport.", tableB, "3/5", "Use the 25 bus travellers as the denominator."),
  probChoice("y10-prob-cond-g3", "For a probability given that a student is in Year 10, which group supplies the denominator?", "C", ["All students", "Students who prefer Maths only", "Year 10 students", "Year 11 students"], "The condition restricts the denominator to Year 10 students."),
  probAnswer("y10-prob-cond-g4", "Of 20 students who play sport, 8 also play music. Given that a student plays sport, find the probability they play music.", "\\text{sport}=20,\\quad \\text{sport and music}=8", "2/5", "Use the sport group as the denominator."),
];

const conditionalIndependent: PracticeQuestion[] = [
  probAnswer("y10-prob-cond-i1", "Using the table, given that a student prefers Art, find the probability they are in Year 11.", tableA, "4/7", "Use the 28 Art-preferring students as the denominator."),
  probAnswer("y10-prob-cond-i2", "Using the table, given that a person plays sport, find the probability they travel by bus.", tableB, "5/8", "Use the 24 sport players as the denominator."),
  probChoice("y10-prob-cond-i3", "Which statement best describes conditional probability?", "A", ["A probability calculated after restricting the group", "A probability that must equal 1", "A probability found by ignoring the condition", "A count outside both sets"], "Conditional probability changes the group being considered."),
  probAnswer("y10-prob-cond-i4", "Of 35 students who study science, 14 also study music. Given that a student studies science, find the probability they study music.", "\\text{science}=35,\\quad \\text{science and music}=14", "2/5", "Use the 35 science students as the denominator."),
  probChoice("y10-prob-cond-i5", "A survey has 12 students who play both sport and music, and 30 who play sport. Which fraction represents the probability of music given sport?", "D", ["$\\frac{12}{42}$", "$\\frac{30}{12}$", "$\\frac{18}{30}$", "$\\frac{12}{30}$"], "The condition group is sport, so use 30 as the denominator."),
];

const conditionalMastery: PracticeQuestion[] = [
  probAnswer("y10-prob-cond-m1", "Using the table, given that a student is in Year 11, find the probability they prefer Art.", tableA, "8/15", "Use the 30 Year 11 students as the denominator."),
  probChoice("y10-prob-cond-m2", "In conditional probability, what usually changes?", "B", ["The favourable group must disappear", "The denominator is restricted", "Every answer becomes a percentage", "The table totals are ignored"], "The condition restricts the group used as the denominator."),
  probAnswer("y10-prob-cond-m3", "Of 25 students who play sport, 10 also play music. Given that a student plays sport, find the probability they play music.", "\\text{sport}=25,\\quad \\text{sport and music}=10", "2/5", "Use the sport group as the denominator."),
  probAnswer("y10-prob-cond-m4", "Using the table, given that a person does not play sport, find the probability they walk.", tableB, "3/8", "Use the 16 people who do not play sport as the denominator."),
  probAnswer("y10-prob-cond-m5", "Using the table, given that a student prefers Maths, find the probability they are in Year 10.", tableA, "9/16", "Use the 32 students who prefer Maths as the denominator."),
  probChoice("y10-prob-cond-m6", "Which fraction represents the probability of bus travel given sport in the displayed table?", "A", ["$\\frac{15}{24}$", "$\\frac{15}{40}$", "$\\frac{24}{40}$", "$\\frac{25}{40}$"], "Restrict the denominator to the 24 sport players.", tableB),
  probChoice("y10-prob-cond-m7", "Why are the probabilities of bus and sport, and sport given bus, different?", "C", ["One must be above 1", "They use different favourable counts", "They use different denominators", "Conditional probability ignores the table"], "Both use the joint count of 15, but the denominators differ."),
  probAnswer("y10-prob-cond-m8", "In a group, 28 students play sport, 18 play music, and 12 play both. Given that a student plays music, find the probability they also play sport.", "\\text{sport}=28,\\quad \\text{music}=18,\\quad \\text{both}=12", "2/3", "Use the 18 music students as the denominator."),
  probChoice("y10-prob-cond-m9", "A class has 20 Year 10 students and 30 Year 11 students. Twelve Year 10 students and 9 Year 11 students prefer maths. Which statement is correct?", "D", ["Overall maths preference is the same as maths preference given Year 10", "Year 11 has the higher conditional maths preference", "Both year groups have a 42% conditional maths preference", "Year 10 has the higher conditional maths preference"], "Year 10 has 12 out of 20, or 60%, while Year 11 has 9 out of 30, or 30%."),
  probChoice("y10-prob-cond-m10", "A survey has 16 students in both sport and music, 40 sport players, and 25 music players. Which probability is larger?", "A", ["$P(\\text{sport}\\mid\\text{music})$", "$P(\\text{music}\\mid\\text{sport})$", "They are equal", "Neither can be calculated"], "Sport given music is 16 out of 25, while music given sport is 16 out of 40. The first listed probability is larger.", "\\text{Compare the two restricted groups.}"),
];

function probabilityMistakes(topic: string) {
  return {
    multi: [
      { mistake: "Adding the number of outcomes for successive stages.", fix: "Multiply the number of choices when each first-stage outcome can pair with every second-stage outcome." },
      { mistake: "Treating selections without replacement as independent.", fix: "Update the number of available counters after the first selection." },
      { mistake: "Counting only one valid order when an event can happen in either order.", fix: "List the favourable paths carefully, then add their probabilities." },
      { mistake: "Using favourable outcomes as the denominator.", fix: "The denominator is the total number of equally likely outcomes." },
    ],
    tree: [
      { mistake: "Adding branch probabilities along one path.", fix: "Multiply probabilities along a path." },
      { mistake: "Multiplying different successful paths together.", fix: "Add different paths when any one of them produces the event." },
      { mistake: "Keeping second-stage probabilities unchanged without replacement.", fix: "Update the bag composition after the first counter is removed." },
      { mistake: "Missing one order for an event such as one red and one blue.", fix: "Include both red-blue and blue-red paths." },
    ],
    venn: [
      { mistake: "Counting the overlap twice when finding the union.", fix: "Subtract the overlap once after adding the two set totals." },
      { mistake: "Treating the overlap as belonging to neither set.", fix: "The overlap belongs to both sets." },
      { mistake: "Forgetting the region outside both circles.", fix: "Subtract the union from the overall total to find neither." },
      { mistake: "Confusing union and intersection.", fix: "Union means either set or both. Intersection means the overlap only." },
    ],
    table: [
      { mistake: "Reading a row total when the question asks for a joint cell.", fix: "Use the cell at the intersection of the named row and column." },
      { mistake: "Using a joint frequency as the overall total.", fix: "Check the bottom-right cell for the complete table total." },
      { mistake: "Comparing group counts instead of proportions.", fix: "Divide by each group total before comparing groups of different sizes." },
      { mistake: "Confusing row and column totals.", fix: "Trace the named category to the correct marginal total." },
    ],
    conditional: [
      { mistake: "Using the overall total after a condition has restricted the group.", fix: "Use the condition group as the new denominator." },
      { mistake: "Confusing an intersection with a conditional probability.", fix: "A joint probability uses the overall total. A conditional probability uses a restricted denominator." },
      { mistake: "Reversing the condition.", fix: "Read the phrase after given that carefully. It tells you which denominator to use." },
      { mistake: "Using the overlap as both numerator and denominator.", fix: "The overlap is usually the favourable count; the condition group supplies the denominator." },
    ],
  }[topic]!;
}

export function year10ProbabilityLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "probability") return null;

  const base = { syllabusArea: "Statistics and Probability", masteryPassMark: 0.8 };

  if (lesson.slug === "multi-stage-events") return {
    ...base,
    description: "Count outcomes and calculate probabilities for simple multi-stage events with and without replacement.",
    learningIntention: "Use sample spaces and multiplication to analyse simple multi-stage events.",
    successCriteria: ["Count outcomes across successive stages.", "Calculate probability as favourable outcomes divided by total outcomes.", "Distinguish between selection with and without replacement.", "Calculate simple combined-event probabilities."],
    teaching: { paragraphs: ["A sample space lists all possible outcomes of an experiment.", "For successive stages, multiply the number of choices when each outcome from one stage can pair with each outcome from the next stage.", "Probability compares favourable equally likely outcomes with the total number of equally likely outcomes.", "With replacement returns the selected item before the next selection. Without replacement changes the available group."], latexBlocks: ["P(E)=\\frac{\\text{favourable outcomes}}{\\text{total outcomes}}", "\\text{total outcomes}=\\text{stage 1 outcomes}\\times\\text{stage 2 outcomes}"] },
    workedExamples: multiStageWorkedExamples, guidedPractice: multiStageGuided, independentPractice: multiStageIndependent, commonMistakes: probabilityMistakes("multi"), masteryQuiz: multiStageMastery,
  };

  if (lesson.slug === "tree-diagrams") return {
    ...base,
    description: "Use tree diagrams to organise stages, multiply along paths and add alternative successful paths.",
    learningIntention: "Interpret probability trees for events with and without replacement.",
    successCriteria: ["Label tree branches with probabilities.", "Multiply probabilities along one path.", "Add probabilities for alternative successful paths.", "Update branches for selections without replacement."],
    teaching: { paragraphs: ["A tree diagram organises a multi-stage event into branches.", "Multiply branch probabilities along one complete path.", "If an event can occur through more than one path, add the probabilities of those successful paths.", "Without replacement, the second-stage branches may change because an item has been removed."], latexBlocks: ["P(\\text{one path})=\\text{branch 1}\\times\\text{branch 2}", "P(\\text{either successful path})=P(\\text{path 1})+P(\\text{path 2})"] },
    workedExamples: treeWorkedExamples, guidedPractice: treeGuided, independentPractice: treeIndependent, commonMistakes: probabilityMistakes("tree"), masteryQuiz: treeMastery,
  };

  if (lesson.slug === "venn-diagrams") return {
    ...base,
    description: "Interpret Venn regions, overlaps, unions and students outside both sets.",
    learningIntention: "Use Venn-diagram counts to calculate totals and probabilities.",
    successCriteria: ["Identify overlap, single-set and outside-both regions.", "Find a union without double-counting the overlap.", "Fill missing Venn regions from totals.", "Calculate probabilities from Venn-diagram counts."],
    teaching: { paragraphs: ["A Venn diagram shows how sets overlap.", "The intersection is the overlap: items that belong to both sets.", "The union includes items in either set or both sets. When adding set totals, subtract the overlap once because it was counted twice.", "Items outside both circles belong to neither set."], latexBlocks: ["n(A\\cup B)=n(A)+n(B)-n(A\\cap B)", "\\text{neither}=\\text{total}-n(A\\cup B)"] },
    workedExamples: vennWorkedExamples, guidedPractice: vennGuided, independentPractice: vennIndependent, commonMistakes: probabilityMistakes("venn"), masteryQuiz: vennMastery,
  };

  if (lesson.slug === "two-way-tables") return {
    ...base,
    description: "Read two-way tables, identify joint and marginal frequencies, and compare proportions.",
    learningIntention: "Use two-way tables to calculate probabilities and compare groups fairly.",
    successCriteria: ["Read joint frequencies from table cells.", "Read marginal frequencies from row and column totals.", "Calculate probabilities from table counts.", "Compare groups using proportions rather than counts alone."],
    teaching: { paragraphs: ["A two-way table organises counts using two categories.", "A joint frequency is found inside the table where a row and column meet.", "A marginal frequency is a row or column total.", "When comparing groups of different sizes, compare proportions rather than raw counts."], latexBlocks: ["P(E)=\\frac{\\text{frequency of }E}{\\text{total frequency}}", "\\text{group proportion}=\\frac{\\text{favourable count in group}}{\\text{group total}}"] },
    workedExamples: tablesWorkedExamples, guidedPractice: tablesGuided, independentPractice: tablesIndependent, commonMistakes: probabilityMistakes("table"), masteryQuiz: tablesMastery,
  };

  if (lesson.slug === "conditional-probability") return {
    ...base,
    description: "Calculate simple conditional probabilities by restricting the group represented by the denominator.",
    learningIntention: "Interpret conditional probability as a probability calculated within a restricted group.",
    successCriteria: ["Identify the condition group.", "Use the restricted group as the denominator.", "Calculate conditional probabilities from tables and Venn counts.", "Distinguish a joint probability from a conditional probability."],
    teaching: { paragraphs: ["Conditional probability asks for a probability after the group has been restricted.", "The phrase given that identifies the condition group. This group becomes the denominator.", "From a two-way table, use the relevant row or column total as the denominator.", "From a Venn diagram, the overlap is often the favourable count, while the condition set supplies the denominator."], latexBlocks: ["P(A\\mid B)=\\frac{n(A\\cap B)}{n(B)}", "\\text{condition group}=\\text{new denominator}"] },
    workedExamples: conditionalWorkedExamples, guidedPractice: conditionalGuided, independentPractice: conditionalIndependent, commonMistakes: probabilityMistakes("conditional"), masteryQuiz: conditionalMastery,
  };

  return null;
}
