import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";
import { randomVariablesProbabilityDistributionsLesson } from "./statisticalAnalysis";
import { probabilitySimulationRelativeFrequencyLesson } from "./probabilitySimulation";

function probChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Identify the probability rule that applies, then work through the options."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function probNumeric(
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
    hint: "Set up the probability expression before substituting.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function probLesson(
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
  masteryQuiz: PracticeQuestion[],
  masteryQuizPool: PracticeQuestion[] = []
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "ma-s1-probability-and-discrete-probability-distributions",
    moduleTitle: "Probability and Discrete Probability Distributions (Year 11 assumed knowledge)",
    courseTitle: "Year 12 Mathematics Advanced — assumed knowledge revision",
    title,
    description,
    syllabusArea: "Statistical Analysis",
    focus: "Probability",
    status: "active",
    coursePlacement: "year-11-assumed-knowledge",
    syllabusReferences: ["MA-S1.1"],
    syllabusOutcomes: ["MA11-7", "MA11-8", "MA11-9"],
    syllabusContent: [
      "Probability language, relative frequency and the probability scale",
      "Multi-stage events represented with arrays, Venn diagrams and tree diagrams",
      "Addition, complement, conditional-probability and multiplication rules",
    ],
    video: { title, url: "/videos/placeholder-lesson.mp4" },
    learningIntention,
    successCriteria,
    teaching,
    workedExamples,
    guidedPractice,
    independentPractice,
    commonMistakes,
    masteryQuiz,
    ...(masteryQuizPool.length ? { masteryQuizPool } : {}),
    masteryPassMark: 0.8,
  };
}

// ─── Lesson 1: Probability Basics and Venn Diagrams ──────────────────────────

export const probabilityBasicsVennDiagramsLesson = probLesson(
  "probability-basics-venn-diagrams",
  "Probability Basics and Venn Diagrams",
  "Use probability axioms, the complement rule, and the addition rule with Venn diagrams for two events.",
  "Apply probability axioms and the addition rule to solve problems involving Venn diagrams and two events.",
  [
    "State P(E) = n(E)/n(S) for equally likely outcomes.",
    "Apply the complement rule: P(Ā) = 1 − P(A).",
    "Apply the addition rule: P(A∪B) = P(A) + P(B) − P(A∩B).",
    "Identify mutually exclusive events: P(A∩B) = 0.",
    "Read probabilities from a Venn diagram.",
  ],
  {
    paragraphs: [
      "The probability of an event E in a sample space S of equally likely outcomes is P(E) = n(E)/n(S), where n(E) is the number of favourable outcomes.",
      "The complement rule: P(Ā) = 1 − P(A). Every outcome either belongs to A or not, so P(A) + P(Ā) = 1.",
      "The addition rule for any two events: P(A∪B) = P(A) + P(B) − P(A∩B). The intersection is subtracted once because it has been counted twice.",
      "Two events are mutually exclusive if they cannot both occur: P(A∩B) = 0. For mutually exclusive events the addition rule simplifies to P(A∪B) = P(A) + P(B).",
      "A Venn diagram shows the sample space as a rectangle and each event as a circle. The overlap region represents A∩B.",
    ],
    latexBlocks: [
      "P(E)=\\frac{n(E)}{n(S)}",
      "P(\\bar{A})=1-P(A)",
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      "A,B\\text{ mutually exclusive}\\Rightarrow P(A\\cap B)=0",
    ],
  },
  [
    {
      title: "Addition rule from a Venn diagram",
      questionLatex:
        "P(A)=0.4,\\;P(B)=0.3,\\;P(A\\cap B)=0.1.",
      steps: [
        { explanation: "Apply the addition rule.", latex: "P(A\\cup B)=0.4+0.3-0.1" },
        { explanation: "Evaluate.", latex: "P(A\\cup B)=0.6" },
      ],
      finalAnswerLatex: "P(A\\cup B)=0.6",
    },
    {
      title: "Finding P(A∩B) from P(A∪B)",
      questionLatex:
        "P(A)=0.5,\\;P(B)=0.4,\\;P(A\\cup B)=0.75.",
      steps: [
        { explanation: "Rearrange the addition rule.", latex: "P(A\\cap B)=P(A)+P(B)-P(A\\cup B)" },
        { explanation: "Substitute.", latex: "P(A\\cap B)=0.5+0.4-0.75=0.15" },
      ],
      finalAnswerLatex: "P(A\\cap B)=0.15",
    },
  ],
  [
    probNumeric("prob-basic-g1", "P(A) = 3/8. Find P(Ā).", "", "5/8", ["0.625"], "P(Ā) = 1 − 3/8 = 5/8."),
    probNumeric("prob-basic-g2", "A bag has 4 red, 3 blue, 3 green. Find P(not red).", "", "3/5", ["0.6", "6/10"], "Not red means blue or green: 6 out of 10, so P = 6/10 = 3/5."),
    probNumeric("prob-basic-g3", "P(A) = 0.4, P(B) = 0.35, P(A∩B) = 0.15. Find P(A∪B).", "", "0.6", [], "P(A∪B) = 0.4 + 0.35 − 0.15 = 0.60."),
    probChoice("prob-basic-g4", "A and B are mutually exclusive. P(A∪B) = P(A) + P(B) because:", "D", ["P(A) = P(B)", "P(A∪B) = 1", "They are independent", "P(A∩B) = 0"], "Mutually exclusive means A and B cannot both occur, so P(A∩B) = 0. The subtracted term vanishes."),
  ],
  [
    probNumeric("prob-basic-i1", "P(A) = 0.72. Find P(Ā).", "", "0.28", [], "P(Ā) = 1 − 0.72 = 0.28."),
    probNumeric("prob-basic-i2", "A deck of 52 cards. Find P(queen or heart).", "", "4/13", ["0.3077", "16/52", "0.308"], "4 queens + 13 hearts − 1 queen of hearts = 16 cards. P = 16/52 = 4/13."),
    probNumeric("prob-basic-i3", "P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2. Find P(A∪B).", "", "0.7", [], "P(A∪B) = 0.5 + 0.4 − 0.2 = 0.70."),
    probNumeric("prob-basic-i4", "P(A∪B) = 0.75, P(A) = 0.5, P(B) = 0.4. Find P(A∩B).", "", "0.15", [], "Rearrange: P(A∩B) = 0.5 + 0.4 − 0.75 = 0.15."),
    probChoice("prob-basic-i5", "A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.25. Find P(A∪B).", "B", ["0.075", "0.55", "0.475", "1"], "Mutually exclusive: P(A∪B) = P(A) + P(B) = 0.3 + 0.25 = 0.55."),
  ],
  [
    { mistake: "Forgetting to subtract P(A∩B) in the addition rule.", fix: "Always use P(A∪B) = P(A) + P(B) − P(A∩B). The overlap is counted twice if you don't subtract." },
    { mistake: "Confusing union (∪) with intersection (∩).", fix: "Union (∪) means A or B (either/both). Intersection (∩) means A and B (both)." },
    { mistake: "Applying the mutually exclusive formula when events overlap.", fix: "Only use P(A∪B) = P(A) + P(B) when P(A∩B) = 0. Always check for overlap first." },
    { mistake: "Setting P(Ā) = P(A).", fix: "P(Ā) = 1 − P(A). The complement removes the event from the full sample space." },
  ],
  [
    probNumeric("prob-basic-m1", "P(A) = 0.65. Find P(Ā).", "", "0.35", [], "P(Ā) = 1 − 0.65 = 0.35."),
    probNumeric("prob-basic-m2", "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Find P(A∪B).", "", "0.58", [], "P(A∪B) = 0.4 + 0.3 − 0.12 = 0.58."),
    probNumeric("prob-basic-m3", "Venn: n(A only) = 5, n(B only) = 3, n(A∩B) = 2, n(neither) = 4. Find P(A∪B).", "", "5/7", ["0.714", "10/14", "0.7143"], "n(A∪B) = 5 + 3 + 2 = 10. Total = 14. P = 10/14 = 5/7."),
    probChoice("prob-basic-m4", "P(Ā) = 0.3. What is P(A)?", "C", ["0.3", "0.6", "0.7", "Cannot determine"], "P(A) = 1 − P(Ā) = 1 − 0.3 = 0.7."),
    probNumeric("prob-basic-m5", "P(A∪B) = 0.6, P(A∩B) = 0.1, P(B) = 0.25. Find P(A).", "", "0.45", [], "Rearrange addition rule: P(A) = 0.6 − 0.25 + 0.1 = 0.45."),
    probNumeric("prob-basic-m6", "30 students: 18 play sport, 12 play music, 5 play both. Find P(sport or music).", "", "5/6", ["0.8333", "25/30", "0.833"], "P = (18 + 12 − 5)/30 = 25/30 = 5/6."),
    probChoice("prob-basic-m7", "The addition rule P(A∪B) = P(A) + P(B) applies without subtracting P(A∩B) only when:", "A", ["A and B are mutually exclusive", "A and B are independent", "P(A) = P(B)", "P(A∪B) = 1"], "Mutually exclusive means P(A∩B) = 0 so the subtracted term disappears."),
    probNumeric("prob-basic-m8", "P(A) = 0.45, P(B) = 0.35, P(A∪B) = 0.65. Find P(A∩B).", "", "0.15", [], "P(A∩B) = 0.45 + 0.35 − 0.65 = 0.15."),
    probChoice("prob-basic-m9", "The complement of 'at least one head in 3 flips' is:", "B", ["Exactly one head", "No heads (all tails)", "All heads", "At most two heads"], "At least one head means 1, 2, or 3 heads. Its complement is 0 heads — all tails."),
    probNumeric("prob-basic-m10", "Bag: 6 red, 4 blue, 2 green. Find P(not green).", "", "5/6", ["0.8333", "10/12", "0.833"], "Not green: 6 + 4 = 10 out of 12. P = 10/12 = 5/6."),
  ],
  [
    { ...probNumeric("prob-basic-d5-1", "In a class of 30, 18 study French, 12 study German, and 5 study both. Find how many study neither.", "", "5", [], "French or German = 18 + 12 − 5 = 25, so neither = 30 − 25 = 5."), difficulty: 5 },
    { ...probNumeric("prob-basic-d5-2", "A fair die is rolled twice. Find the probability of getting at least one six.", "", "11/36", ["0.3056", "0.306"], "P(no six) = (5/6)^2 = 25/36, so P(at least one six) = 1 − 25/36 = 11/36."), difficulty: 5 },
  ]
);

// ─── Lesson 2: Conditional Probability and Tree Diagrams ─────────────────────

export const conditionalProbabilityTreeDiagramsLesson = probLesson(
  "conditional-probability-tree-diagrams",
  "Conditional Probability and Tree Diagrams",
  "Calculate conditional probability using P(A|B) = P(A∩B)/P(B), and use tree diagrams to find joint and marginal probabilities in two-stage experiments.",
  "Use the conditional probability formula and tree diagrams to find probabilities in two-stage and dependent-event contexts.",
  [
    "State and apply P(A|B) = P(A∩B)/P(B).",
    "Draw and label a two-stage tree diagram.",
    "Find a joint probability by multiplying along branches.",
    "Find a marginal probability by summing joint probabilities across all branches that end in that event.",
    "Identify when a conditional probability changes because events are dependent.",
  ],
  {
    paragraphs: [
      "Conditional probability P(A|B) is the probability of A occurring given that B has already occurred. Restricting the sample space to B changes the probability of A.",
      "Formula: P(A|B) = P(A∩B) / P(B). This can be rearranged to the multiplication rule: P(A∩B) = P(B) × P(A|B).",
      "A tree diagram shows outcomes in stages. Each branch carries a probability. Multiply along a branch to get the joint probability of that sequence.",
      "To find the probability of an event across all paths, add the joint probabilities of every branch that ends in that event.",
      "When drawing without replacement, the probabilities on the second set of branches depend on what happened first — the events are dependent.",
    ],
    latexBlocks: [
      "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
      "P(A\\cap B)=P(B)\\times P(A\\mid B)",
      "P(B)=P(A)P(B\\mid A)+P(\\bar A)P(B\\mid\\bar A)",
    ],
  },
  [
    {
      title: "Tree diagram and marginal probability",
      questionLatex:
        "P(A)=0.4,\\;P(B\\mid A)=0.3,\\;P(B\\mid\\bar{A})=0.2.",
      steps: [
        { explanation: "Joint probability along the A then B branch.", latex: "P(A\\cap B)=0.4\\times0.3=0.12" },
        { explanation: "Joint probability along the Ā then B branch.", latex: "P(\\bar{A}\\cap B)=0.6\\times0.2=0.12" },
        { explanation: "Marginal probability of B.", latex: "P(B)=0.12+0.12=0.24" },
      ],
      finalAnswerLatex: "P(B)=0.24",
    },
    {
      title: "Without replacement",
      questionLatex:
        "\\text{Bag: 5 red, 3 blue. Draw two without replacement.}",
      steps: [
        { explanation: "P(1st red).", latex: "P(R_1)=\\tfrac{5}{8}" },
        { explanation: "P(2nd red | 1st red) — one red removed.", latex: "P(R_2\\mid R_1)=\\tfrac{4}{7}" },
        { explanation: "Multiply along the branch.", latex: "P(R_1\\cap R_2)=\\tfrac{5}{8}\\times\\tfrac{4}{7}=\\tfrac{20}{56}=\\tfrac{5}{14}" },
      ],
      finalAnswerLatex: "P(\\text{both red})=\\tfrac{5}{14}",
    },
  ],
  [
    probNumeric("prob-cond-g1", "P(A) = 0.6, P(B|A) = 0.4. Find P(A∩B).", "", "0.24", [], "P(A∩B) = 0.6 × 0.4 = 0.24."),
    probNumeric("prob-cond-g2", "P(A) = 0.5, P(B|A) = 0.6, P(B|Ā) = 0.3. Find P(B).", "", "0.45", [], "P(B) = 0.5 × 0.6 + 0.5 × 0.3 = 0.30 + 0.15 = 0.45."),
    probNumeric("prob-cond-g3", "P(A∩B) = 0.3, P(B) = 0.5. Find P(A|B).", "", "0.6", [], "P(A|B) = 0.3 / 0.5 = 0.6."),
    probChoice("prob-cond-g4", "P(A|B) = P(A∩B)/P(B). This formula requires:", "C", ["P(A) > 0", "A and B to be independent", "P(B) > 0", "P(A) = P(B)"], "P(B) must be positive — you cannot condition on an impossible event."),
  ],
  [
    probNumeric("prob-cond-i1", "P(A) = 0.3, P(B|A) = 0.5. Find P(A∩B).", "", "0.15", [], "P(A∩B) = 0.3 × 0.5 = 0.15."),
    probNumeric("prob-cond-i2", "P(A) = 0.3, P(B|A) = 0.5, P(B|Ā) = 0.2. Find P(B).", "", "0.29", [], "P(B) = 0.15 + 0.14 = 0.29."),
    probNumeric("prob-cond-i3", "P(A∩B) = 0.18, P(A) = 0.6. Find P(B|A).", "", "0.3", [], "P(B|A) = 0.18 / 0.6 = 0.30."),
    probNumeric("prob-cond-i4", "Bag: 4 red, 6 blue. Two drawn without replacement. Find P(both red).", "", "2/15", ["0.1333", "12/90", "0.133"], "P = 4/10 × 3/9 = 12/90 = 2/15."),
    probChoice("prob-cond-i5", "'The card drawn is a heart, given it is red' is an example of:", "A", ["Conditional probability", "Mutually exclusive events", "Independent events", "Complementary events"], "The condition 'given it is red' restricts the sample space — this is conditional probability."),
  ],
  [
    { mistake: "Swapping the condition and the event in P(A|B).", fix: "P(A|B) ≠ P(B|A). The event after the bar is the condition — always check which event is given." },
    { mistake: "Using the same denominator when drawing without replacement.", fix: "Each draw without replacement reduces both the total and the count. Update both the numerator and denominator after each draw." },
    { mistake: "Multiplying instead of adding to find P(B) from a tree.", fix: "Multiply along each branch to get joint probabilities, then add the joint probabilities of all branches that end in B." },
    { mistake: "Forgetting to include all branches when summing to find P(B).", fix: "Check every branch of the tree. If P(B|Ā) > 0, the Ā branch also contributes to P(B)." },
  ],
  [
    probNumeric("prob-cond-m1", "P(A) = 0.4, P(B|A) = 0.6. Find P(A∩B).", "", "0.24", [], "P(A∩B) = 0.4 × 0.6 = 0.24."),
    probNumeric("prob-cond-m2", "P(A) = 0.4, P(B|A) = 0.6, P(B|Ā) = 0.25. Find P(B).", "", "0.39", [], "P(B) = 0.24 + 0.15 = 0.39."),
    probChoice("prob-cond-m3", "P(A|B) = P(A∩B)/P(B). If both P(A∩B) and P(B) are doubled, P(A|B):", "C", ["Doubles", "Halves", "Stays the same", "Becomes undefined"], "The ratio P(A∩B)/P(B) is unchanged when both are multiplied by the same factor."),
    probNumeric("prob-cond-m4", "P(A∩B) = 0.24, P(B) = 0.8. Find P(A|B).", "", "0.3", [], "P(A|B) = 0.24 / 0.8 = 0.30."),
    probNumeric("prob-cond-m5", "P(A∩B) = 0.2, P(A) = 0.4. Find P(B|A).", "", "0.5", [], "P(B|A) = 0.2 / 0.4 = 0.50."),
    probNumeric("prob-cond-m6", "Urn: 3 red, 5 blue. Two drawn without replacement. Find P(2nd blue | 1st red).", "", "5/7", ["0.714", "0.7143"], "After removing 1 red: 5 blue remain out of 7 total. P = 5/7."),
    probChoice("prob-cond-m7", "In a two-stage tree diagram, to find P(B) you:", "B", ["Multiply all branch probabilities", "Add the joint probabilities of every branch ending in B", "Take the largest branch probability", "Divide P(A∩B) by P(A)"], "Sum all joint probabilities of paths that include B."),
    probNumeric("prob-cond-m8", "P(A) = 0.55, P(B|A) = 0.4, P(B|Ā) = 0.2. Find P(A∩B).", "", "0.22", [], "P(A∩B) = 0.55 × 0.4 = 0.22."),
    probNumeric("prob-cond-m9", "P(A) = 0.55, P(B|A) = 0.4, P(B|Ā) = 0.2. Find P(B).", "", "0.31", [], "P(B) = 0.22 + 0.09 = 0.31."),
    probNumeric("prob-cond-m10", "P(A|B) = 0.5, P(B) = 0.6. Find P(A∩B).", "", "0.3", [], "Rearrange: P(A∩B) = P(A|B) × P(B) = 0.5 × 0.6 = 0.30."),
  ]
);

// ─── Lesson 3: Independence and the Multiplication Rule ───────────────────────

export const independenceMultiplicationRuleLesson = probLesson(
  "independence-multiplication-rule",
  "Independence and the Multiplication Rule",
  "Identify independent events using P(A∩B) = P(A)P(B), apply the multiplication rule, and distinguish with-replacement (independent) from without-replacement (dependent) sampling.",
  "Recognise independent events and apply the multiplication rule P(A∩B) = P(A)P(B).",
  [
    "State the definition of independent events: P(A|B) = P(A), equivalently P(A∩B) = P(A)P(B).",
    "Test whether two events are independent by checking if P(A∩B) = P(A)P(B).",
    "Apply the multiplication rule for independent events.",
    "Identify that sampling with replacement creates independent events.",
    "Identify that sampling without replacement creates dependent events.",
  ],
  {
    paragraphs: [
      "Events A and B are independent if knowing that B occurred gives no information about A. Formally, P(A|B) = P(A).",
      "An equivalent and often more practical test: A and B are independent if and only if P(A∩B) = P(A) × P(B).",
      "For independent events, the multiplication rule is P(A∩B) = P(A) × P(B). The condition is simply removed because it doesn't change the probability.",
      "Sampling with replacement: after each draw the item is returned, so the composition of the remaining items is unchanged. Successive draws are independent.",
      "Sampling without replacement: the item is not returned, so each draw changes the composition. Successive draws are dependent.",
    ],
    latexBlocks: [
      "A,B\\text{ independent}\\Leftrightarrow P(A\\cap B)=P(A)\\times P(B)",
      "A,B\\text{ independent}\\Leftrightarrow P(A\\mid B)=P(A)",
      "\\text{With replacement}\\Rightarrow\\text{independent};\\quad\\text{without}\\Rightarrow\\text{dependent}",
    ],
  },
  [
    {
      title: "Testing independence",
      questionLatex:
        "P(A)=0.5,\\;P(B)=0.3,\\;P(A\\cap B)=0.15.",
      steps: [
        { explanation: "Compute P(A) × P(B).", latex: "P(A)\\times P(B)=0.5\\times0.3=0.15" },
        { explanation: "Compare with P(A∩B).", latex: "0.15=0.15\\checkmark" },
        { explanation: "Conclusion.", latex: "A\\text{ and }B\\text{ are independent.}" },
      ],
      finalAnswerLatex: "\\text{Independent (}P(A\\cap B)=P(A)P(B)\\text{)}",
    },
    {
      title: "Multiplication rule for independent events",
      questionLatex:
        "\\text{Flip a fair coin and roll a fair die. Find }P(\\text{head and 6}).",
      steps: [
        { explanation: "The coin and die are independent.", latex: "P(H\\cap 6)=P(H)\\times P(6)" },
        { explanation: "Substitute.", latex: "P(H\\cap 6)=\\tfrac{1}{2}\\times\\tfrac{1}{6}=\\tfrac{1}{12}" },
      ],
      finalAnswerLatex: "P(\\text{head and 6})=\\tfrac{1}{12}",
    },
  ],
  [
    probNumeric("prob-indep-g1", "P(A) = 0.4, P(B) = 0.5. A and B are independent. Find P(A∩B).", "", "0.2", [], "P(A∩B) = 0.4 × 0.5 = 0.20."),
    probChoice("prob-indep-g2", "P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.12. Are A and B independent?", "A", ["Yes, because 0.3 × 0.4 = 0.12", "No, because P(A) ≠ P(B)", "Yes, because they are mutually exclusive", "No, because P(A∩B) ≠ 0"], "P(A) × P(B) = 0.12 = P(A∩B). The test passes, so A and B are independent."),
    probChoice("prob-indep-g3", "P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.35. Are A and B independent?", "B", ["Yes, because P(A∩B) > 0", "No, because 0.6 × 0.5 = 0.30 ≠ 0.35", "Yes, because P(A) + P(B) > 1", "Cannot determine"], "P(A) × P(B) = 0.30 ≠ 0.35 = P(A∩B). The test fails; A and B are dependent."),
    probChoice("prob-indep-g4", "If A and B are independent, then P(B|A) equals:", "C", ["P(A)", "P(A|B)", "P(B)", "P(A) × P(B)"], "Independence means knowing A gives no information about B, so P(B|A) = P(B)."),
  ],
  [
    probNumeric("prob-indep-i1", "P(A) = 0.7, P(B) = 0.6. A and B are independent. Find P(A∩B).", "", "0.42", [], "P(A∩B) = 0.7 × 0.6 = 0.42."),
    probChoice("prob-indep-i2", "P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2. Are A and B independent?", "A", ["Yes, 0.5 × 0.4 = 0.2", "No, 0.5 × 0.4 ≠ 0.2", "Yes, because they overlap", "No, independent events cannot overlap"], "0.5 × 0.4 = 0.20 = P(A∩B), so the test passes: independent."),
    probChoice("prob-indep-i3", "P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.25. Are A and B independent?", "B", ["Yes", "No, 0.5 × 0.4 = 0.20 ≠ 0.25", "Cannot be determined", "Yes, if P(A) = P(B) they are always independent"], "0.5 × 0.4 = 0.20 ≠ 0.25, so A and B are not independent."),
    probNumeric("prob-indep-i4", "A fair die is rolled twice independently. Find P(both show 4).", "", "1/36", ["0.0278", "0.028"], "P(4 and 4) = 1/6 × 1/6 = 1/36."),
    probChoice("prob-indep-i5", "Sampling with replacement means successive draws are:", "B", ["Dependent", "Independent", "Mutually exclusive", "Conditional"], "Returning the item restores the original composition, so subsequent draws have the same probabilities — the draws are independent."),
  ],
  [
    { mistake: "Confusing independence with mutual exclusivity.", fix: "Independent events CAN both occur; mutually exclusive events CANNOT. If P(A) > 0 and P(B) > 0, mutually exclusive events are never independent." },
    { mistake: "Testing independence by checking P(A) = P(B).", fix: "Independence is P(A∩B) = P(A) × P(B), not P(A) = P(B). Equal probabilities do not imply independence." },
    { mistake: "Using with-replacement probabilities when sampling without replacement.", fix: "Without replacement changes the total on each subsequent draw. Adjust both numerator and denominator after each draw." },
    { mistake: "Multiplying P(A) × P(B) when events are not independent.", fix: "P(A∩B) = P(A) × P(B) only holds for independent events. For dependent events use P(A∩B) = P(A) × P(B|A)." },
  ],
  [
    probNumeric("prob-indep-m1", "P(A) = 0.6, P(B) = 0.4. A and B are independent. Find P(A∩B).", "", "0.24", [], "P(A∩B) = 0.6 × 0.4 = 0.24."),
    probChoice("prob-indep-m2", "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Are A and B independent?", "A", ["Yes, P(A) × P(B) = 0.12 = P(A∩B)", "No, they cannot overlap", "Yes, because P(A∩B) ≠ 0", "No, because P(A) ≠ P(B)"], "0.4 × 0.3 = 0.12 = P(A∩B). Independent."),
    probChoice("prob-indep-m3", "P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.25. Are A and B independent?", "B", ["Yes", "No, 0.6 × 0.5 = 0.30 ≠ 0.25", "Yes, if both probabilities are below 1", "Cannot tell"], "0.60 × 0.50 = 0.30 ≠ 0.25. Not independent."),
    probChoice("prob-indep-m4", "For independent events A and B, P(A∩B) equals:", "C", ["P(A) + P(B)", "P(A) − P(B)", "P(A) × P(B)", "P(A) / P(B)"], "The multiplication rule for independent events: P(A∩B) = P(A) × P(B)."),
    probNumeric("prob-indep-m5", "A biased coin has P(H) = 0.6. It is flipped twice independently. Find P(HH).", "", "0.36", [], "P(HH) = 0.6 × 0.6 = 0.36."),
    probNumeric("prob-indep-m6", "P(A) = 0.5, P(B) = 0.7. A and B are independent. Find P(A∪B).", "", "0.85", [], "P(A∪B) = 0.5 + 0.7 − 0.35 = 0.85."),
    probChoice("prob-indep-m7", "P(A∩B) = 0.2, P(A) = 0.4, P(B) = 0.5. Is P(A∩B) = P(A) × P(B)?", "A", ["Yes, 0.4 × 0.5 = 0.20 = P(A∩B)", "No, 0.4 × 0.5 = 0.25", "Yes, but only if A and B are mutually exclusive", "Cannot tell without more information"], "0.40 × 0.50 = 0.20 = P(A∩B). The condition is satisfied; A and B are independent."),
    probChoice("prob-indep-m8", "Sampling without replacement means successive draws are:", "B", ["Independent", "Dependent", "Mutually exclusive", "Equally likely"], "Without replacement changes the composition after each draw, making successive draws dependent."),
    probNumeric("prob-indep-m9", "Bag: 3 red, 7 blue. Two drawn with replacement. Find P(both red).", "", "9/100", ["0.09"], "With replacement, each draw has P(red) = 3/10. P = 9/100."),
    probNumeric("prob-indep-m10", "P(A) = 0.45, P(B) = 0.5. A and B are independent. Find P(A∩B).", "", "0.225", [], "P(A∩B) = 0.45 × 0.5 = 0.225."),
  ],
  [
    { ...probNumeric("prob-indep-d5-1", "On any day the probability of rain is 0.3, independently of other days. Find the probability of no rain on two consecutive days.", "", "0.49", [], "P(no rain) = 0.7 each day, so for two independent days P = 0.7 × 0.7 = 0.49."), difficulty: 5 },
    { ...probNumeric("prob-indep-d5-2", "Events A and B are independent with P(A) = 0.5 and P(B) = 0.3. Find P(A and not B), i.e. P(A ∩ B′).", "", "0.35", [], "P(A ∩ B′) = P(A)·P(B′) = 0.5 × 0.7 = 0.35 (using independence)."), difficulty: 5 },
  ]
);

// ─── Lesson 4: Probability — Two-Way Tables and Exam Practice ─────────────────

export const probabilityExamPracticeLesson = probLesson(
  "probability-exam-practice",
  "Probability — Two-Way Tables and Exam Practice",
  "Read probabilities from two-way tables and practise mixed HSC-style probability questions involving Venn diagrams, conditional probability, tree diagrams, and independence.",
  "Apply all probability techniques — complement rule, addition rule, conditional probability, and independence — to two-way tables and HSC exam-style questions.",
  [
    "Read joint and marginal frequencies from a two-way table.",
    "Calculate conditional probabilities from a two-way table.",
    "Identify whether events are independent using a two-way table.",
    "Select the appropriate rule for each probability question type.",
    "Solve mixed HSC-style probability questions across all probability concepts.",
  ],
  {
    paragraphs: [
      "A two-way (contingency) table classifies outcomes by two categories. The interior cells are joint frequencies; the row and column totals are marginal frequencies.",
      "From a two-way table: P(A) = row total / grand total; P(A|B) = cell(A∩B) / column total for B.",
      "To test independence from a table: check if P(A|B) = P(A), or equivalently if P(A∩B) = P(A) × P(B).",
      "For HSC questions, read carefully: 'and' usually means intersection, 'or' means union, 'given' means conditional probability.",
      "Always check whether events are independent or dependent before choosing a formula, and whether the question asks for 'or' (union) or 'and' (intersection).",
    ],
    latexBlocks: [
      "\\text{From a table: }P(A\\mid B)=\\frac{n(A\\cap B)}{n(B)}",
      "\\text{Independence check: }P(A\\mid B)\\overset{?}{=}P(A)",
      "P(A\\cup B)=P(A)+P(B)-P(A\\cap B),\\quad P(A\\cap B)=P(A)P(B\\mid A)",
    ],
  },
  [
    {
      title: "Conditional probability from a two-way table",
      questionLatex:
        "\\begin{array}{c|cc|c} & \\text{Pass}&\\text{Fail}&\\text{Total}\\\\\\hline\\text{Male}&24&6&30\\\\\\text{Female}&32&8&40\\\\\\hline\\text{Total}&56&14&70\\end{array}",
      steps: [
        { explanation: "Find P(Female | Pass).", latex: "P(\\text{Female}\\mid\\text{Pass})=\\frac{32}{56}" },
        { explanation: "Simplify.", latex: "P(\\text{Female}\\mid\\text{Pass})=\\frac{4}{7}" },
      ],
      finalAnswerLatex: "P(\\text{Female}\\mid\\text{Pass})=\\tfrac{4}{7}",
    },
    {
      title: "Testing independence from a table",
      questionLatex:
        "\\text{Using the same table above.}",
      steps: [
        { explanation: "Find P(Female).", latex: "P(\\text{Female})=\\frac{40}{70}=\\frac{4}{7}" },
        { explanation: "Compare with P(Female | Pass) = 4/7.", latex: "P(\\text{Female}\\mid\\text{Pass})=\\frac{4}{7}=P(\\text{Female})\\checkmark" },
        { explanation: "Conclusion.", latex: "\\text{Gender and pass/fail are independent.}" },
      ],
      finalAnswerLatex: "\\text{Independent}",
    },
  ],
  [
    probChoice("prob-exam-g1", "A two-way table has n(A∩B) = 12 and n(B) = 40. P(A|B) is:", "B", ["12/40 × 40", "12/40", "40/12", "12/(total)"], "P(A|B) = n(A∩B)/n(B) = 12/40 = 0.3."),
    probNumeric("prob-exam-g2", "P(A) = 0.5, P(B) = 0.6, and A and B are independent. Find P(A∪B).", "", "0.8", [], "P(A∪B) = 0.5 + 0.6 − 0.30 = 0.80."),
    probNumeric("prob-exam-g3", "P(A) = 0.4, P(B|A) = 0.3, P(B|Ā) = 0.1. Find P(A|B).", "", "2/3", ["0.6667", "0.667"], "P(A∩B) = 0.12, P(Ā∩B) = 0.6×0.1 = 0.06, P(B) = 0.18. P(A|B) = 0.12/0.18 = 2/3."),
    probChoice("prob-exam-g4", "In a probability question, 'at least one' is usually solved by:", "D", ["Adding all individual probabilities", "Subtracting from 0", "Using the addition rule only", "Finding the complement (1 minus P(none))"], "1 − P(none) is almost always easier than listing all 'at least one' cases."),
  ],
  [
    probNumeric("prob-exam-i1", "Table: n(A∩B) = 15, n(B) = 50. Find P(A|B).", "", "3/10", ["0.3", "0.30"], "P(A|B) = 15/50 = 3/10."),
    probNumeric("prob-exam-i2", "P(A) = 0.3, P(B) = 0.5. Independent. Find P(A∪B).", "", "0.65", [], "P(A∪B) = 0.3 + 0.5 − 0.15 = 0.65."),
    probNumeric("prob-exam-i3", "P(A) = 0.5, P(B|A) = 0.4, P(B|Ā) = 0.1. Find P(A∩B).", "", "0.2", [], "P(A∩B) = P(A) × P(B|A) = 0.5 × 0.4 = 0.20."),
    probNumeric("prob-exam-i4", "A coin is flipped 3 times independently. P(all heads).", "", "1/8", ["0.125"], "P(HHH) = (1/2)³ = 1/8."),
    probChoice("prob-exam-i5", "P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.3. Are A and B independent?", "A", ["Yes, P(A) × P(B) = 0.3 = P(A∩B)", "No, 0.6 × 0.5 ≠ 0.3", "Yes, all overlapping events are independent", "No, independent events cannot overlap"], "0.60 × 0.50 = 0.30 = P(A∩B). Independent."),
  ],
  [
    { mistake: "Reading a cell value instead of a row/column total for conditional probability.", fix: "P(A|B) uses the column (or row) total for B as the denominator, not the grand total." },
    { mistake: "Applying the multiplication rule for independent events to dependent events.", fix: "Always test independence first: check P(A∩B) = P(A)×P(B). If it fails, use P(A∩B) = P(A)×P(B|A)." },
    { mistake: "Treating 'or' as requiring both events to happen.", fix: "'Or' in probability means union: A∪B includes A, B, or both. Use P(A∪B) = P(A) + P(B) − P(A∩B)." },
    { mistake: "Using the grand total instead of the marginal total for P(A|B).", fix: "Condition on B means the sample space shrinks to B's total. Divide by n(B) not n(total)." },
  ],
  [
    probNumeric("prob-exam-m1", "P(A) = 0.55. Find P(Ā).", "", "0.45", [], "P(Ā) = 1 − 0.55 = 0.45."),
    probNumeric("prob-exam-m2", "P(A) = 0.4, P(B) = 0.35, P(A∩B) = 0.15. Find P(A∪B).", "", "0.6", [], "P(A∪B) = 0.4 + 0.35 − 0.15 = 0.60."),
    probNumeric("prob-exam-m3", "P(A∩B) = 0.2, P(B) = 0.5. Find P(A|B).", "", "0.4", [], "P(A|B) = 0.20 / 0.50 = 0.40."),
    probChoice("prob-exam-m4", "A and B are independent with P(A) = 0.4, P(B) = 0.6. P(A∩B) is:", "B", ["1.0", "0.24", "0.04", "0.6"], "P(A∩B) = 0.4 × 0.6 = 0.24 for independent events."),
    probNumeric("prob-exam-m5", "P(A) = 0.6, P(B|A) = 0.5, P(B|Ā) = 0.2. Find P(B).", "", "0.38", [], "P(B) = 0.30 + 0.08 = 0.38."),
    probNumeric("prob-exam-m6", "A bag has 5 red, 5 blue. Two drawn with replacement. Find P(one of each colour).", "", "1/2", ["0.5", "0.50"], "P(RB) + P(BR) = 2 × (1/2 × 1/2) = 1/2."),
    probChoice("prob-exam-m7", "P(A) = 0.5, P(B) = 0.4, P(A∩B) = 0.2. Are A and B independent?", "A", ["Yes, 0.5 × 0.4 = 0.2 = P(A∩B)", "No, P(A∩B) must be 0 for independence", "Yes, but only if they are also mutually exclusive", "No, P(A) ≠ P(B)"], "0.50 × 0.40 = 0.20 = P(A∩B). Independent."),
    probNumeric("prob-exam-m8", "P(A) = 0.3, P(B) = 0.5, P(A∩B) = 0.12. Find P(A∪B).", "", "0.68", [], "P(A∪B) = 0.30 + 0.50 − 0.12 = 0.68."),
    probNumeric("prob-exam-m9", "A fair die is rolled twice. Find P(at least one 6).", "", "11/36", ["0.3056", "0.306"], "P(at least one 6) = 1 − P(no 6) = 1 − (5/6)² = 1 − 25/36 = 11/36."),
    probChoice("prob-exam-m10", "From a two-way table, P(A|B) = 0.4 and P(A) = 0.4. This means:", "C", ["A and B are mutually exclusive", "P(B|A) = 0.4", "A and B are independent", "A and B are complementary"], "P(A|B) = P(A) is the definition of independence."),
  ],
  [
    { ...probNumeric("prob-exam-d5-1", "Given P(A ∩ B) = 0.2 and P(B) = 0.5, find P(A | B).", "", "0.4", [], "P(A | B) = 0.2 / 0.5 = 0.4."), difficulty: 5 },
    { ...probNumeric("prob-exam-d5-2", "A bag has 4 red and 6 blue balls. Two balls are drawn with replacement. Find the probability both are red.", "", "0.16", ["4/25"], "With replacement P(red) = 0.4 each draw, so P(both red) = 0.4 × 0.4 = 0.16."), difficulty: 5 },
  ]
);

// ─── Outline and Lesson Array ─────────────────────────────────────────────────

export const probabilityOutline: LessonOutlineItem[] = [
  {
    id: "probability-simulation-relative-frequency",
    slug: "probability-simulation-relative-frequency",
    title: "Probability Simulation and Relative Frequency",
    description:
      "Design simulations, calculate relative frequencies, and judge the quality of probability estimates.",
    status: "active",
  },
  {
    id: "probability-basics-venn-diagrams",
    slug: "probability-basics-venn-diagrams",
    title: "Probability Basics and Venn Diagrams",
    description:
      "Use probability axioms, the complement rule, and the addition rule with Venn diagrams for two events.",
    status: "active",
  },
  {
    id: "conditional-probability-tree-diagrams",
    slug: "conditional-probability-tree-diagrams",
    title: "Conditional Probability and Tree Diagrams",
    description:
      "Calculate conditional probability using P(A|B) = P(A∩B)/P(B) and use tree diagrams for two-stage experiments.",
    status: "active",
  },
  {
    id: "independence-multiplication-rule",
    slug: "independence-multiplication-rule",
    title: "Independence and the Multiplication Rule",
    description:
      "Identify independent events and apply P(A∩B) = P(A)P(B); distinguish with- and without-replacement sampling.",
    status: "active",
  },
  {
    id: "probability-exam-practice",
    slug: "probability-exam-practice",
    title: "Probability — Two-Way Tables and Exam Practice",
    description:
      "Read probabilities from two-way tables and practise mixed HSC-style probability questions.",
    status: "active",
  },
  {
    id: "random-variables-probability-distributions",
    slug: "random-variables-probability-distributions",
    title: "Random Variables and Probability Distributions",
    description:
      "Classify random variables and calculate expected value, variance and standard deviation for discrete distributions.",
    status: "active",
  },
];

export const probabilityLessons: ExplicitLesson[] = [
  probabilitySimulationRelativeFrequencyLesson,
  probabilityBasicsVennDiagramsLesson,
  conditionalProbabilityTreeDiagramsLesson,
  independenceMultiplicationRuleLesson,
  probabilityExamPracticeLesson,
  randomVariablesProbabilityDistributionsLesson,
];
