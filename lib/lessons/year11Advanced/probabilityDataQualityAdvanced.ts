import {
  dataTable,
  richAnswer,
  richChoice,
  twoWayTable,
  type ProbabilityDataMasteryMap,
} from "./probabilityDataQualityHelpers";

export const probabilityDataQualityAdvanced: ProbabilityDataMasteryMap = {
  "conditional-probability-independence": [
    richAnswer({
      id: "y11adv-pd-cond-qm1",
      prompt: "Find the conditional probability $P(A\\mid B)$.",
      latex: "P(A\\cap B)=0.18,\\qquad P(B)=0.45",
      answer: "0.4",
      acceptedAnswers: ["2/5", "40%"],
      hint: "Restrict to event B by dividing the joint probability by P(B).",
      explanation:
        "Conditional probability uses $P(A\\mid B)=P(A\\cap B)/P(B)$. Therefore $P(A\\mid B)=0.18/0.45=0.4$. The denominator is the probability of the event after the conditioning bar because $B$ is the restricted sample space.",
      diagnosticIntent:
        "Checks direct conditional-probability calculation and correct denominator selection.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-cond-qm2",
      prompt: "Using the table, which expression is $P(Year\\ 12\\mid Online)$?",
      latex: "P(\\text{Year 12}\\mid\\text{Online})",
      answer: "D",
      choices: ["$12/70$", "$30/70$", "$18/40$", "$12/30$"],
      distractorMisconceptions: {
        A: "Uses the grand total rather than the Online column total.",
        B: "Uses the entire Online column as a joint probability over the grand total.",
        C: "Uses the Year 11 Online count over the Year 11 row total, reversing both the target group and condition.",
      },
      hint: "Conditioning on Online restricts the denominator to the highlighted column total of 30.",
      explanation:
        "The Online column contains 30 students, and 12 of them are in Year 12. Thus $P(Year\\ 12\\mid Online)=12/30$, which is option D. The grand total of 70 is not the conditioned sample space.",
      diagnosticIntent:
        "Checks reversal of conditioning direction and denominator selection from a highlighted column.",
      taskType: "analytical",
      difficulty: 3,
      twoWayTableDiagram: twoWayTable(
        "Lesson mode by year group, with the Online column highlighted as the conditioned group",
        ["Year 11", "Year 12"],
        ["Online", "In person"],
        [
          [18, 22],
          [12, 18],
        ],
        [40, 30],
        [30, 40],
        70,
        { kind: "column", columnIndex: 0 },
      ),
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm3",
      prompt:
        "Use the multiplication rule to find $P(B)$, then state $P(A\\cap B')$ if $P(A)=0.5$.",
      latex: "P(A\\cap B)=0.21,\\qquad P(A\\mid B)=0.7,\\qquad P(A)=0.5",
      answer: "P(B)=0.3; P(A intersection B')=0.29",
      acceptedAnswers: ["0.3 and 0.29"],
      hint: "First divide the joint probability by the conditional probability; then split A into its B and B-complement parts.",
      explanation:
        "From $P(A\\cap B)=P(A\\mid B)P(B)$, we get $P(B)=0.21/0.7=0.3$. Event $A$ is partitioned into $A\\cap B$ and $A\\cap B'$, so the second probability is $0.5-0.21=0.29$.",
      diagnosticIntent:
        "Checks reverse use of the multiplication rule followed by a complementary partition within an event.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-cond-qm4",
      prompt: "Which evidence proves that $A$ and $B$ are independent?",
      latex: "P(A)=0.4,\\qquad P(B)=0.7",
      answer: "B",
      choices: [
        "$P(A\\cap B)=0$",
        "$P(A\\cap B)=0.28$",
        "$P(A\\cup B)=1.10$",
        "$P(A\\mid B)=0.7$",
      ],
      distractorMisconceptions: {
        A: "Uses mutual exclusivity, which contradicts independence for nonzero events.",
        C: "Accepts an impossible union probability above one.",
        D: "Equates P(A given B) with P(B) instead of with P(A).",
      },
      hint: "For independence, compare the intersection with the product of the two marginal probabilities.",
      explanation:
        "$P(A)P(B)=0.4(0.7)=0.28$, so an intersection of $0.28$ proves independence. Equivalently, independence would require $P(A\\mid B)=0.4$. A zero intersection describes mutually exclusive nonempty events, not independent ones, making B correct.",
      diagnosticIntent:
        "Checks selection among equivalent and commonly confused tests for independence.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-cond-qm5",
      prompt:
        "Events $A$ and $B$ are mutually exclusive and both have positive probability. Which conclusion is correct?",
      latex: "P(A\\cap B)=0,\\qquad P(A)>0,\\qquad P(B)>0",
      answer: "D",
      choices: [
        "they are independent because their intersection is zero",
        "they are independent only if their probabilities are equal",
        "conditioning on B leaves P(A) unchanged",
        "they are not independent because P(A)P(B)>0 but P(A intersection B)=0",
      ],
      distractorMisconceptions: {
        A: "Treats no overlap as independence rather than as complete negative dependence.",
        B: "Adds an irrelevant equality condition to the independence test.",
        C: "Ignores that observing B makes A impossible for disjoint events.",
      },
      hint: "Compare the actual zero intersection with the positive product required by independence.",
      explanation:
        "Because both marginal probabilities are positive, $P(A)P(B)>0$. Independence would require this product to equal $P(A\\cap B)$, but mutual exclusivity makes the intersection zero. Therefore the events cannot be independent, and observing $B$ actually makes $P(A\\mid B)=0$. Option D states the decisive contradiction.",
      diagnosticIntent:
        "Targets the persistent misconception that mutually exclusive events are automatically independent.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm6",
      prompt:
        "A bag contains two red and three blue counters. Two counters are drawn without replacement. Find $P(\\text{second red}\\mid\\text{first blue})$ and $P(\\text{first blue and second red})$.",
      latex: "2R,\\ 3B;\\qquad \\text{draw twice without replacement}",
      answer: "conditional 1/2; joint 3/10",
      acceptedAnswers: ["P(R2|B1)=1/2, P(B1 intersection R2)=3/10"],
      hint: "After a blue counter is removed, two of the four remaining counters are red; multiply by the first-blue probability for the joint event.",
      explanation:
        "Given that the first counter is blue, the bag contains two red and two blue counters, so the conditional probability is $2/4=1/2$. The first draw is blue with probability $3/5$, so the joint probability is $(3/5)(1/2)=3/10$.",
      diagnosticIntent:
        "Checks updating a finite sample space and linking a conditional branch to its joint probability.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm7",
      prompt:
        "In a group of 100 people, 40 satisfy $A$, 50 satisfy $B$, and $x$ satisfy both. Investigate the value of $x$ that makes the events independent, then find the union count.",
      latex: "P(A)=0.4,\\qquad P(B)=0.5,\\qquad P(A\\cap B)=x/100",
      answer: "x=20; union count 70",
      acceptedAnswers: ["intersection 20, n(A union B)=70"],
      hint: "Set the observed intersection proportion equal to the product of the marginal proportions.",
      explanation:
        "Independence requires $x/100=0.4(0.5)=0.20$, hence $x=20$. The union then contains $40+50-20=70$ people. This value also produces $P(A\\mid B)=20/50=0.4=P(A)$, providing an equivalent check.",
      diagnosticIntent:
        "Assesses parameter recovery from an independence condition and translation back to counts.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm8",
      prompt:
        "A condition affects 10% of people. A test is positive for 80% of affected people and 20% of unaffected people. Find the probability that a person with a positive result has the condition.",
      latex: "P(C)=0.1,\\quad P(+\\mid C)=0.8,\\quad P(+\\mid C')=0.2",
      answer: "4/13",
      acceptedAnswers: ["0.3076923077", "about 30.77%"],
      hint: "Find both routes to a positive result before dividing the affected-positive route by all positive results.",
      explanation:
        "Affected positive results have probability $0.1(0.8)=0.08$. Unaffected false positives have probability $0.9(0.2)=0.18$, so all positives have probability $0.26$. Therefore $P(C\\mid +)=0.08/0.26=8/26=4/13$.",
      diagnosticIntent:
        "Synthesises base rates, two conditional branches, total probability, and reverse conditioning.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm9",
      prompt:
        "The three probability conditions hold. Determine $P(A)$, $P(B)$, and $P(A\\cap B)$.",
      latex: "P(A\\mid B)=\\frac12,\\qquad P(B\\mid A)=\\frac13,\\qquad P(A\\cup B)=0.8",
      answer: "P(A)=0.6, P(B)=0.4, P(A intersection B)=0.2",
      acceptedAnswers: ["3/5, 2/5, 1/5"],
      hint: "Let the intersection be x; each conditional equation expresses one marginal probability as a multiple of x.",
      explanation:
        "Let $P(A\\cap B)=x$. The first conditional gives $P(B)=2x$, while the second gives $P(A)=3x$. The union is then $3x+2x-x=4x=0.8$, so $x=0.2$. Therefore $P(A)=0.6$ and $P(B)=0.4$.",
      diagnosticIntent:
        "Combines two reverse conditional constraints with a union equation to reconstruct the probability model.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-cond-qm10",
      prompt:
        "Two cards are drawn from a standard deck. Compare whether the events 'first card is an ace' and 'second card is an ace' are independent when drawing with replacement and without replacement.",
      latex: "52\\text{-card deck with }4\\text{ aces}",
      answer: "independent with replacement; not independent without replacement",
      acceptedAnswers: ["with replacement yes, without replacement no"],
      hint: "Compare the second-ace probability before and after learning that the first card was an ace in each scheme.",
      explanation:
        "With replacement, the deck is restored, so $P(A_2\\mid A_1)=4/52=1/13=P(A_2)$ and the events are independent. Without replacement, an ace first leaves only three aces among 51 cards, so $P(A_2\\mid A_1)=3/51=1/17$, not $1/13$. The second scheme is therefore dependent.",
      diagnosticIntent:
        "Synthesises conditional updating and independence across two closely related sampling models.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "discrete-random-variables": [
    richAnswer({
      id: "y11adv-pd-drv-qm1",
      prompt: "Find the missing probability and verify that the distribution is valid.",
      latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.25&p&0.45\\end{array}",
      answer: "p=0.30; valid",
      acceptedAnswers: ["p=3/10 and valid"],
      hint: "A valid distribution has nonnegative probabilities whose total is exactly one.",
      explanation:
        "The probabilities must sum to $1$, so $p=1-0.25-0.45=0.30$. All three probabilities are between $0$ and $1$, and $0.25+0.30+0.45=1$. The distribution therefore satisfies both validity conditions.",
      diagnosticIntent:
        "Checks normalisation and explicit validation rather than calculation of a missing entry alone.",
      taskType: "procedural",
      difficulty: 3,
      dataTableDiagram: dataTable(
        "Incomplete probability distribution for values zero, one and two",
        ["x", "0", "1", "2"],
        [["P(X=x)", "0.25", "p", "0.45"]],
      ),
    }),
    richChoice({
      id: "y11adv-pd-drv-qm2",
      prompt: "Which quantity is appropriately modelled by a discrete random variable?",
      latex: "\\text{select one context}",
      answer: "C",
      choices: [
        "the exact mass of a randomly selected apple",
        "the waiting time until the next train",
        "the number of defective items in a batch of 20",
        "the temperature of a liquid after five minutes",
      ],
      distractorMisconceptions: {
        A: "Treats a measurement on a continuum as a countable outcome.",
        B: "Treats continuously measured time as a discrete count.",
        D: "Treats continuously measured temperature as a discrete count.",
      },
      hint: "Look for an outcome that can take only separated count values rather than every value in an interval.",
      explanation:
        "A defect count can take only the integers from $0$ to $20$, so it has a finite, countable outcome set and is discrete. Mass, waiting time, and temperature are measurements that can in principle take any real value within a range, making C the appropriate model.",
      diagnosticIntent:
        "Checks classification from the nature of possible values rather than from superficial context words.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm3",
      prompt: "Find $P(1\\le X<4)$ from the probability table.",
      latex: "\\begin{array}{c|ccccc}x&0&1&2&3&4\\\\ \\hline P(X=x)&0.10&0.20&0.25&0.30&0.15\\end{array}",
      answer: "0.75",
      acceptedAnswers: ["3/4", "75%"],
      hint: "Include the table entries for 1, 2, and 3, but not either excluded endpoint.",
      explanation:
        "The compound inequality includes $X=1,2,3$. Adding their probabilities gives $0.20+0.25+0.30=0.75$. The value $0$ is below the interval, and $4$ is excluded by the strict upper inequality.",
      diagnosticIntent:
        "Checks translation of a compound discrete event into the correct set of table entries.",
      taskType: "problem-solving",
      difficulty: 3,
      dataTableDiagram: dataTable(
        "Probability distribution for X taking values zero through four",
        ["x", "0", "1", "2", "3", "4"],
        [["P(X=x)", "0.10", "0.20", "0.25", "0.30", "0.15"]],
      ),
    }),
    richChoice({
      id: "y11adv-pd-drv-qm4",
      prompt: "Which expression means that $X$ is more than 1 but at most 4?",
      latex: "\\text{more than 1 and at most 4}",
      answer: "A",
      choices: ["$P(1<X\\le4)$", "$P(1\\le X<4)$", "$P(X>4)$", "$P(X\\ne1)$"],
      distractorMisconceptions: {
        B: "Includes 1 and excludes 4, reversing both boundary instructions.",
        C: "Keeps only outcomes above the upper boundary.",
        D: "Includes outcomes greater than 4 and outcomes below 1 as well.",
      },
      hint: "Translate 'more than' as a strict lower inequality and 'at most' as an inclusive upper inequality.",
      explanation:
        "More than $1$ means $X>1$, so the lower endpoint is excluded. At most $4$ means $X\\le4$, so the upper endpoint is included. Combining them gives $P(1<X\\le4)$, which is option A.",
      diagnosticIntent:
        "Checks precise interpretation of strict and inclusive event boundaries.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-drv-qm5",
      prompt:
        "A student says the table is valid because its entries sum to one. Which diagnosis is correct?",
      latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&0.7&0.4&-0.1\\end{array}",
      answer: "B",
      choices: [
        "the student is correct because normalisation is the only condition",
        "the distribution is invalid because a probability is negative",
        "the distribution is invalid because x begins at zero",
        "replace -0.1 by its absolute value without changing other entries",
      ],
      distractorMisconceptions: {
        A: "Checks the total but omits the nonnegativity requirement.",
        C: "Treats zero as an invalid random-variable value.",
        D: "Repairs one entry in a way that destroys the required total of one.",
      },
      hint: "A probability distribution must satisfy both normalisation and an entry-by-entry range condition.",
      explanation:
        "Although $0.7+0.4-0.1=1$, every individual probability must lie between $0$ and $1$. The entry $-0.1$ violates nonnegativity, so the distribution is invalid. Taking an absolute value would make the total $1.2$, so B is the complete diagnosis.",
      diagnosticIntent:
        "Targets the error of treating a unit total as sufficient for distribution validity.",
      taskType: "analytical",
      difficulty: 4,
      dataTableDiagram: dataTable(
        "Proposed probability distribution containing a negative probability",
        ["x", "0", "1", "2"],
        [["P(X=x)", "0.7", "0.4", "-0.1"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm6",
      prompt:
        "The distribution follows the displayed rule for $x=0,1,2$. Find $k$ and $P(X\\ge1)$.",
      latex: "P(X=x)=k(x+1),\\qquad x\\in\\{0,1,2\\}",
      answer: "k=1/6; P(X>=1)=5/6",
      acceptedAnswers: ["k=1/6 and probability 5/6"],
      hint: "Write the three probabilities as k, 2k, and 3k, then normalise before adding the requested event.",
      explanation:
        "The probabilities are $k,2k,3k$, so normalisation gives $6k=1$ and $k=1/6$. The event $X\\ge1$ contains values $1$ and $2$, whose probabilities total $2k+3k=5k=5/6$.",
      diagnosticIntent:
        "Checks conversion of a symbolic probability rule into a normalised table and compound event.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm7",
      prompt:
        "Investigate all real values of $p$ for which the displayed probabilities form a valid distribution.",
      latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&p&2p&1-3p\\end{array}",
      answer: "0<=p<=1/3",
      acceptedAnswers: ["p in [0,1/3]"],
      hint: "The entries already sum to one, so impose nonnegativity on each probability.",
      explanation:
        "The total is $p+2p+1-3p=1$ for every $p$. Validity therefore depends on nonnegativity: $p\\ge0$, $2p\\ge0$, and $1-3p\\ge0$. Combining these inequalities gives exactly $0\\le p\\le1/3$.",
      diagnosticIntent:
        "Assesses a parameter investigation separating automatic normalisation from nonnegativity constraints.",
      taskType: "investigative",
      difficulty: 4,
      dataTableDiagram: dataTable(
        "Parameterised probability distribution with three symbolic entries",
        ["x", "0", "1", "2"],
        [["P(X=x)", "p", "2p", "1-3p"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm8",
      prompt:
        "Three fair coins are tossed and $X$ is the number of heads. Construct the probability distribution and find $P(X\\ge2)$.",
      latex: "X\\in\\{0,1,2,3\\}",
      answer: "probabilities 1/8, 3/8, 3/8, 1/8; P(X>=2)=1/2",
      acceptedAnswers: ["P0=1/8,P1=3/8,P2=3/8,P3=1/8; probability 4/8"],
      hint: "List the eight equally likely ordered outcomes and group them by their number of heads.",
      explanation:
        "Among the eight equally likely outcomes, one has no heads, three have one head, three have two heads, and one has three heads. Thus the distribution is $1/8,3/8,3/8,1/8$. The event $X\\ge2$ contains the last two groups, so its probability is $3/8+1/8=1/2$.",
      diagnosticIntent:
        "Synthesises an underlying sample space into a complete random-variable distribution and event probability.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm9",
      prompt:
        "The distribution has a repeated endpoint probability and satisfies the event condition. Determine every probability.",
      latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&p&2p&q&p\\end{array},\\qquad P(X\\ge2)=0.55",
      answer: "p=0.15, q=0.40; distribution 0.15, 0.30, 0.40, 0.15",
      acceptedAnswers: ["p=3/20, q=2/5"],
      hint: "Use the event equation q+p=0.55 together with the total-probability equation 4p+q=1.",
      explanation:
        "The event condition gives $q+p=0.55$. Normalisation gives $p+2p+q+p=4p+q=1$. Subtracting the event equation from the total equation gives $3p=0.45$, so $p=0.15$ and $q=0.40$. All entries are nonnegative and sum to one.",
      diagnosticIntent:
        "Combines an aggregate event constraint with normalisation to reconstruct a parameterised distribution.",
      taskType: "investigative",
      difficulty: 5,
      dataTableDiagram: dataTable(
        "Four-value distribution with repeated endpoint probability and two unknown parameters",
        ["x", "0", "1", "2", "3"],
        [["P(X=x)", "p", "2p", "q", "p"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-drv-qm10",
      prompt:
        "The four probabilities form an arithmetic sequence. Their total is one and $P(X\\ge2)=0.7$. Determine the distribution.",
      latex: "P(X=x)=p+xd,\\qquad x\\in\\{0,1,2,3\\}",
      answer: "p=0.1, d=0.1; distribution 0.1, 0.2, 0.3, 0.4",
      acceptedAnswers: ["1/10,1/5,3/10,2/5"],
      hint: "Form one equation from the sum of all four terms and another from the last two terms.",
      explanation:
        "Normalisation gives $4p+6d=1$. The event condition gives $(p+2d)+(p+3d)=2p+5d=0.7$. Twice the second equation minus the first gives $4d=0.4$, so $d=0.1$ and then $p=0.1$. The resulting probabilities are valid and have the required tail total.",
      diagnosticIntent:
        "Synthesises sequence structure, probability normalisation, an event constraint, and validity checking.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
