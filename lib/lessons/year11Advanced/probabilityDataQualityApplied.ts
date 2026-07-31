import {
  dataTable,
  richAnswer,
  richChoice,
  twoWayTable,
  type ProbabilityDataMasteryMap,
} from "./probabilityDataQualityHelpers";

export const probabilityDataQualityApplied: ProbabilityDataMasteryMap = {
  "expected-value-standard-deviation": [
    richAnswer({
      id: "y11adv-pd-ev-qm1",
      prompt: "Find the expected value and standard deviation of $X$.",
      latex: "\\begin{array}{c|ccc}x&0&2&4\\\\ \\hline P(X=x)&0.2&0.5&0.3\\end{array}",
      answer: "E(X)=2.2; SD(X)=1.4",
      acceptedAnswers: ["mean 11/5, standard deviation 7/5"],
      hint: "Calculate both E(X) and E(X squared); variance is the second moment minus the square of the mean.",
      explanation:
        "$E(X)=0(0.2)+2(0.5)+4(0.3)=2.2$. Also $E(X^2)=0+4(0.5)+16(0.3)=6.8$. Thus $Var(X)=6.8-2.2^2=1.96$, and the standard deviation is $\\sqrt{1.96}=1.4$.",
      diagnosticIntent:
        "Checks the full expected-value, second-moment, variance, and standard-deviation chain.",
      taskType: "procedural",
      difficulty: 3,
      dataTableDiagram: dataTable(
        "Probability distribution with values zero, two and four and probabilities 0.2, 0.5 and 0.3",
        ["x", "0", "2", "4"],
        [["P(X=x)", "0.2", "0.5", "0.3"]],
      ),
    }),
    richChoice({
      id: "y11adv-pd-ev-qm2",
      prompt:
        "A game has expected net winnings of $-0.60 per play. Which interpretation is correct?",
      latex: "E(X)=-0.60",
      answer: "B",
      choices: [
        "the player loses exactly $0.60 on every play",
        "over many plays, the player's average net result approaches a loss of about $0.60 per play",
        "the player has a 60% chance of losing",
        "the game has standard deviation $0.60",
      ],
      distractorMisconceptions: {
        A: "Treats a long-run average as the result of each individual trial.",
        C: "Confuses an expected monetary value with a probability.",
        D: "Confuses centre with a measure of spread.",
      },
      hint: "Expected value describes a long-run average outcome, not a guaranteed result or a probability.",
      explanation:
        "Expected value is the average net outcome approached across many repetitions. A value of $-0.60$ therefore represents a long-run average loss of about 60 cents per play. Individual outcomes can differ, and the value says nothing by itself about loss probability or standard deviation, so B is correct.",
      diagnosticIntent:
        "Distinguishes long-run expectation from guaranteed outcomes, probabilities, and spread.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm3",
      prompt:
        "A game pays a gross prize of $12 with probability $1/4$ and $0 otherwise. Find the entry fee that makes the player's expected net winnings zero.",
      latex: "P(\\text{prize }12)=\\frac14",
      answer: "$3",
      acceptedAnswers: ["3", "$3.00"],
      hint: "A fair entry fee equals the expected gross prize because it is subtracted in every outcome.",
      explanation:
        "The expected gross prize is $12(1/4)+0(3/4)=3$ dollars. If the entry fee is $c$, expected net winnings are $3-c$. Setting this equal to zero gives $c=3$, so an entry fee of $3 makes the game fair in expectation.",
      diagnosticIntent:
        "Checks construction of a net-outcome expectation and reverse solution for a fair price.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-ev-qm4",
      prompt:
        "Two investments have the same expected return. Investment A has standard deviation 2.1%, while B has standard deviation 5.4%. Which comparison is justified?",
      latex: "E(A)=E(B),\\qquad SD(A)=2.1\\%,\\qquad SD(B)=5.4\\%",
      answer: "D",
      choices: [
        "B has the higher expected return",
        "A must make a profit on every occasion",
        "the investments have identical risk because their means match",
        "B's returns are more variable around the same expected return",
      ],
      distractorMisconceptions: {
        A: "Infers a different centre despite the stated equal expected returns.",
        B: "Treats lower variability as a guarantee of a positive result.",
        C: "Ignores the explicit difference in standard deviations.",
      },
      hint: "Use expected value to compare centre and standard deviation to compare variability.",
      explanation:
        "The equal expected returns give the investments the same long-run centre. The larger standard deviation for B means its outcomes typically lie farther from that centre, so B is more variable. Standard deviation does not guarantee the sign of any individual outcome, making D the supported conclusion.",
      diagnosticIntent:
        "Checks separate interpretation of expectation and standard deviation in a comparative context.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-ev-qm5",
      prompt:
        "A student says adding 5 to every outcome doubles the variance because the outcomes are larger. For $Y=2X+5$ and $Var(X)=3$, which diagnosis is correct?",
      latex: "Y=2X+5,\\qquad Var(X)=3",
      answer: "C",
      choices: [
        "$Var(Y)=8$ because both 2 and 5 affect spread",
        "$Var(Y)=6$ because variance is multiplied by 2",
        "$Var(Y)=12$ because the shift does not affect spread and the scale factor is squared",
        "$Var(Y)=3$ because linear transformations never affect variance",
      ],
      distractorMisconceptions: {
        A: "Treats a shift as an added contribution to spread.",
        B: "Scales variance by the factor rather than its square.",
        D: "Ignores the effect of multiplying all deviations from the mean.",
      },
      hint: "A constant shift moves the centre only; multiplying deviations by 2 multiplies their squares by 4.",
      explanation:
        "Adding $5$ changes every outcome and the mean equally, so deviations from the mean are unchanged. Multiplying by $2$ doubles each deviation, which multiplies squared deviations and variance by $2^2=4$. Hence $Var(Y)=4(3)=12$, and C diagnoses the student's reasoning.",
      diagnosticIntent:
        "Targets confusion between shifts, scales, standard deviation, and variance under transformation.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm6",
      prompt: "Complete the distribution and then find its expected value.",
      latex: "\\begin{array}{c|ccc}x&0&2&5\\\\ \\hline P(X=x)&0.3&p&0.2\\end{array}",
      answer: "p=0.5; E(X)=2",
      acceptedAnswers: ["missing probability 1/2, mean 2"],
      hint: "Normalise the probability row before calculating the weighted average.",
      explanation:
        "The missing probability is $p=1-0.3-0.2=0.5$. The expected value is then $0(0.3)+2(0.5)+5(0.2)=0+1+1=2$. Calculating expectation before completing the distribution would omit half of the probability mass.",
      diagnosticIntent:
        "Checks sequencing of normalisation and weighted averaging in an incomplete distribution.",
      taskType: "problem-solving",
      difficulty: 4,
      dataTableDiagram: dataTable(
        "Incomplete probability distribution for outcomes zero, two and five",
        ["x", "0", "2", "5"],
        [["P(X=x)", "0.3", "p", "0.2"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm7",
      prompt:
        "Investigate the expected value and standard deviation of $Y=3X-2$ from the supplied summaries of $X$.",
      latex: "E(X)=4,\\qquad SD(X)=1.5,\\qquad Y=3X-2",
      answer: "E(Y)=10; SD(Y)=4.5",
      acceptedAnswers: ["mean 10, standard deviation 9/2"],
      hint: "Expectation follows the entire linear transformation, while standard deviation uses the absolute scale factor only.",
      explanation:
        "$E(Y)=3E(X)-2=3(4)-2=10$. Subtracting $2$ shifts all outcomes and their mean together, so it does not alter spread. Multiplication by $3$ triples every deviation, giving $SD(Y)=3(1.5)=4.5$.",
      diagnosticIntent:
        "Assesses a general transformation rule through distinct effects on centre and spread.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm8",
      prompt:
        "The symmetric-looking distribution has standard deviation $\\sqrt6$. Determine $p$ and the full distribution.",
      latex: "\\begin{array}{c|ccc}x&-2&1&4\\\\ \\hline P(X=x)&p&1-2p&p\\end{array}",
      answer: "p=1/3; all three probabilities are 1/3",
      acceptedAnswers: ["uniform distribution, p=1/3"],
      hint: "First show that E(X)=1 for every p, then express the variance in terms of p.",
      explanation:
        "$E(X)=-2p+(1-2p)+4p=1$. Also $E(X^2)=4p+(1-2p)+16p=1+18p$, so $Var(X)=1+18p-1^2=18p$. Since the standard deviation is $\\sqrt6$, the variance is $6$, giving $18p=6$ and $p=1/3$.",
      diagnosticIntent:
        "Synthesises a parameterised distribution, invariant mean, second moment, and reverse spread condition.",
      taskType: "synthesis",
      difficulty: 5,
      dataTableDiagram: dataTable(
        "Symmetric parameterised distribution on negative two, one and four",
        ["x", "-2", "1", "4"],
        [["P(X=x)", "p", "1-2p", "p"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm9",
      prompt:
        "Compare the expected net return and risk of the two games. State which game a player seeking the same expectation with lower variability should choose.",
      latex: "A:\\ 10\\ (0.5),\\ -2\\ (0.5);\\qquad B:\\ 5\\ (0.75),\\ 1\\ (0.25)",
      answer: "both have expected value 4; SD(A)=6, SD(B)=sqrt(3); choose B",
      acceptedAnswers: ["same mean 4, B has lower standard deviation"],
      hint: "Calculate each first and second moment; equal means do not imply equal standard deviations.",
      explanation:
        "Game A has mean $4$ and second moment $52$, so its variance is $52-16=36$ and standard deviation $6$. Game B also has mean $4$, but its second moment is $19$, giving variance $3$ and standard deviation $\\sqrt3$. The expectations match, while B is much less variable, so the stated preference selects B.",
      diagnosticIntent:
        "Synthesises complete distribution comparisons and makes a decision using both centre and spread.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-ev-qm10",
      prompt:
        "A ticket costs $4 and pays a gross prize of $20 with probability $1/5$, otherwise nothing. Show the game is fair in net winnings and find the standard deviation of net winnings.",
      latex: "X=16\\ (1/5),\\qquad X=-4\\ (4/5)",
      answer: "E(X)=0; SD(X)=8",
      acceptedAnswers: ["fair, standard deviation $8"],
      hint: "Use net outcomes after the ticket cost; when the mean is zero, variance equals the second moment.",
      explanation:
        "The net win is $20-4=16$, while a non-winning ticket gives $-4$. Thus $E(X)=16(1/5)-4(4/5)=3.2-3.2=0$, so the game is fair in expectation. Since the mean is zero, $Var(X)=16^2(1/5)+(-4)^2(4/5)=64$, giving $SD(X)=8$.",
      diagnosticIntent:
        "Combines gross-to-net modelling, fairness, second moment, and risk in one game analysis.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "probability-data-exam-practice": [
    richAnswer({
      id: "y11adv-pd-exam-qm1",
      prompt: "Find the mean, median, and range of the ordered data.",
      latex: "4,\\ 6,\\ 8,\\ 11,\\ 16",
      answer: "mean 9, median 8, range 12",
      acceptedAnswers: ["9, 8, 12"],
      hint: "Calculate the total for the mean, read the middle value for the median, and subtract the endpoints for the range.",
      explanation:
        "The values total $45$, so the mean is $45/5=9$. The middle ordered observation is $8$, giving the median. The range is $16-4=12$. Reporting all three distinguishes the two measures of centre from the full spread.",
      diagnosticIntent:
        "Checks concise exam fluency across multiple summary-statistic definitions.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-exam-qm2",
      prompt: "Which expression represents students who study neither Physics nor Chemistry?",
      latex: "P=\\text{Physics},\\qquad C=\\text{Chemistry}",
      answer: "B",
      choices: ["$P\\cap C$", "$(P\\cup C)'$", "$P\\cap C'$", "$P'\\cup C'$"],
      distractorMisconceptions: {
        A: "Chooses students studying both subjects rather than neither.",
        C: "Chooses Physics-only students, who are still inside one set.",
        D: "Uses a union of complements, which includes students missing either one subject.",
      },
      hint: "Take the complement of the event that a student studies at least one of the two subjects.",
      explanation:
        "Students studying at least one subject lie in $P\\cup C$. Those studying neither are outside that entire union, so the required set is $(P\\cup C)'$. By De Morgan's law this also equals $P'\\cap C'$, not the union of the complements, making B correct.",
      diagnosticIntent:
        "Checks precise set notation and guards against a common De Morgan reversal.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm3",
      prompt: "Find the missing probability and then $P(X\\ge2)$.",
      latex: "\\begin{array}{c|cccc}x&0&1&2&3\\\\ \\hline P(X=x)&0.15&p&0.30&0.25\\end{array}",
      answer: "p=0.30; P(X>=2)=0.55",
      acceptedAnswers: ["p=3/10, tail probability 11/20"],
      hint: "Normalise all four entries, then add only the probabilities for values 2 and 3.",
      explanation:
        "The known probabilities total $0.70$, so $p=1-0.70=0.30$. The event $X\\ge2$ contains values $2$ and $3$, giving $0.30+0.25=0.55$. The recovered probability belongs to $X=1$ and is not part of the requested tail.",
      diagnosticIntent:
        "Checks distribution completion and accurate selection of a discrete tail event.",
      taskType: "problem-solving",
      difficulty: 3,
      dataTableDiagram: dataTable(
        "Incomplete four-value probability distribution used to find an upper tail",
        ["x", "0", "1", "2", "3"],
        [["P(X=x)", "0.15", "p", "0.30", "0.25"]],
      ),
    }),
    richChoice({
      id: "y11adv-pd-exam-qm4",
      prompt: "Which statement correctly interprets the displayed expected value?",
      latex: "E(X)=1.7\\quad \\text{goals per match}",
      answer: "A",
      choices: [
        "over many matches, the average number of goals is about 1.7",
        "every match contains exactly 1.7 goals",
        "there is a 170% chance of a goal",
        "the standard deviation is 1.7 goals",
      ],
      distractorMisconceptions: {
        B: "Treats a long-run average as a possible exact count in every match.",
        C: "Converts a mean count into an invalid probability.",
        D: "Confuses the distribution's centre with its spread.",
      },
      hint: "Expected value describes the long-run average of repeated observations.",
      explanation:
        "The random variable is a count, so individual matches have whole-number outcomes. The non-integer expected value describes the average approached across many matches, not a guaranteed result, probability, or standard deviation. Therefore A is the valid interpretation.",
      diagnosticIntent:
        "Checks contextual interpretation of a non-integer expectation for a discrete count.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-exam-qm5",
      prompt:
        "A student concludes that $A$ and $B$ are independent because $P(A\\mid B)=P(B)$. Which option gives the correct test and conclusion?",
      latex: "P(A)=0.35,\\qquad P(B)=0.50,\\qquad P(A\\mid B)=0.50",
      answer: "D",
      choices: [
        "independent, because the two displayed conditional and marginal values match",
        "independent, because P(A) and P(B) need not be checked",
        "mutually exclusive, because P(A given B) is positive",
        "not independent, because independence requires P(A given B)=P(A), but 0.50 is not 0.35",
      ],
      distractorMisconceptions: {
        A: "Compares the conditional probability with the wrong marginal event.",
        B: "Accepts an incomplete independence check.",
        C: "Treats a positive conditional probability as evidence of disjointness.",
      },
      hint: "The event before the conditioning bar must be compared with its own marginal probability.",
      explanation:
        "Independence requires learning $B$ to leave the probability of $A$ unchanged, so the correct comparison is $P(A\\mid B)=P(A)$. Here $0.50\\ne0.35$, which proves dependence. Matching $P(A\\mid B)$ with $P(B)$ has no general independence meaning, so D is correct.",
      diagnosticIntent:
        "Diagnoses a wrong-event comparison in a superficially plausible independence argument.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm6",
      prompt:
        "Use the table to find $P(Group\\ A\\mid Sport)$ and determine whether group and activity choice are independent.",
      latex: "P(A\\mid S)\\quad\\text{and an independence test}",
      answer: "P(Group A|Sport)=5/8; not independent",
      acceptedAnswers: ["30/48 and dependent"],
      hint: "Condition on the Sport column, then compare the result with the overall probability of Group A.",
      explanation:
        "There are 48 Sport students, 30 from Group A, so $P(A\\mid S)=30/48=5/8$. Overall, $P(A)=60/120=1/2$. Since $5/8\\ne1/2$, knowing the activity changes the group probability, so group and activity choice are not independent.",
      diagnosticIntent:
        "Checks extraction of a conditional probability and use of that result as evidence about independence.",
      taskType: "problem-solving",
      difficulty: 4,
      twoWayTableDiagram: twoWayTable(
        "Activity choice by two equal-sized groups, with the Sport column highlighted",
        ["Group A", "Group B"],
        ["Sport", "Other"],
        [
          [30, 30],
          [18, 42],
        ],
        [60, 60],
        [48, 72],
        120,
        { kind: "column", columnIndex: 0 },
      ),
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm7",
      prompt:
        "A score of 25 is added to the five-value data set. Compare the mean, median, and range before and after the addition.",
      latex: "4,\\ 6,\\ 7,\\ 8,\\ 10\\quad\\longrightarrow\\quad4,\\ 6,\\ 7,\\ 8,\\ 10,\\ 25",
      answer: "mean 7 to 10; median 7 to 7.5; range 6 to 21",
      acceptedAnswers: ["mean increases 3, median increases 0.5, range increases 15"],
      hint: "Recalculate each summary; adding an observation changes both the total and the number of values.",
      explanation:
        "Initially the total is $35$, so the mean is $7$; the median is $7$ and the range is $6$. After adding $25$, the total is $60$ across six values, giving mean $10$; the median is $(7+8)/2=7.5$ and the range is $25-4=21$. The extreme value affects mean and range most strongly.",
      diagnosticIntent:
        "Assesses quantitative comparison of how an added extreme observation changes several summaries.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm8",
      prompt:
        "The parameterised distribution has expected value 1.3. Determine the distribution, $P(X\\ge1)$, and the standard deviation.",
      latex: "\\begin{array}{c|ccc}x&0&1&2\\\\ \\hline P(X=x)&k&2k&1-3k\\end{array}",
      answer: "k=7/40; distribution 7/40, 7/20, 19/40; P(X>=1)=33/40; SD=sqrt(14)/5",
      acceptedAnswers: ["k=.175, probabilities .175,.35,.475, tail .825, SD about .7483"],
      hint: "Use the expectation to find k, then calculate the second moment and subtract 1.3 squared.",
      explanation:
        "$E(X)=2k+2(1-3k)=2-4k=1.3$, so $k=7/40$. The last two probabilities total $33/40$. Also $E(X^2)=2k+4(1-3k)=4-10k=9/4$, giving variance $9/4-(13/10)^2=14/25$ and standard deviation $\\sqrt{14}/5$.",
      diagnosticIntent:
        "Synthesises parameter recovery, distribution validity, an event probability, and a spread calculation.",
      taskType: "synthesis",
      difficulty: 5,
      dataTableDiagram: dataTable(
        "Parameterised three-value distribution constrained by its expected value",
        ["x", "0", "1", "2"],
        [["P(X=x)", "k", "2k", "1-3k"]],
      ),
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm9",
      prompt:
        "Five scores have mean 12. Four are shown. After reconstructing the fifth score, one score is selected uniformly and called $X$. Find $P(X>12)$ and $SD(X)$.",
      latex: "4,\\ 8,\\ 10,\\ 14,\\ x,\\qquad \\bar{x}=12",
      answer: "x=24; P(X>12)=2/5; SD(X)=sqrt(232/5)",
      acceptedAnswers: ["missing 24, probability 0.4, SD about 6.8118"],
      hint: "Recover the total first; a uniform selection assigns probability 1/5 to each score, so use the data mean as E(X).",
      explanation:
        "The required total is $5(12)=60$, while the known scores total $36$, so $x=24$. Values above $12$ are $14$ and $24$, giving probability $2/5$. The second moment is $(16+64+100+196+576)/5=952/5$, so variance is $952/5-12^2=232/5$ and the standard deviation is $\\sqrt{232/5}$.",
      diagnosticIntent:
        "Combines reverse data reconstruction with a uniform random-variable model and exact spread analysis.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-exam-qm10",
      prompt:
        "Among 100 students, 60 study Calculus, 50 study Statistics, and 70 study exactly one of them. Reconstruct the Venn regions. If $X$ is the number of these subjects studied, find its distribution, expected value, and variance.",
      latex: "n(C)=60,\\qquad n(S)=50,\\qquad n(\\text{exactly one})=70",
      answer: "regions 40,20,30,10; P(X=0,1,2)=0.1,0.7,0.2; E(X)=1.1; Var(X)=0.29",
      acceptedAnswers: ["C only 40, both 20, S only 30, neither 10; mean 11/10, variance 29/100"],
      hint: "Let the intersection be y; exactly one equals 60-y plus 50-y. Then group the four regions by how many subjects they represent.",
      explanation:
        "Let the intersection be $y$. Exactly one gives $(60-y)+(50-y)=70$, so $y=20$. The regions are Calculus only $40$, both $20$, Statistics only $30$, and neither $10$. Thus $P(X=0,1,2)=0.1,0.7,0.2$. The expected value is $1.1$ and the second moment is $1.5$, so the variance is $1.5-1.21=0.29$.",
      diagnosticIntent:
        "Synthesises set reconstruction, random-variable construction, expectation, and variance across representations.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],
};
