import {
  richAnswer,
  richChoice,
  twoWayTable,
  type ProbabilityDataMasteryMap,
} from "./probabilityDataQualityHelpers";

export const probabilityDataQualityCore: ProbabilityDataMasteryMap = {
  "data-displays-summary-statistics": [
    richAnswer({
      id: "y11adv-pd-data-qm1",
      prompt: "Find the mean, median, and range of the data set.",
      latex: "3,\\ 5,\\ 7,\\ 9,\\ 16",
      answer: "mean 8, median 7, range 13",
      acceptedAnswers: ["mean=8, median=7, range=13"],
      hint: "Use all five values for the mean, the middle ordered value for the median, and maximum minus minimum for the range.",
      explanation:
        "The total is $3+5+7+9+16=40$, so the mean is $40/5=8$. The values are already ordered, making the middle value $7$ the median. The range is $16-3=13$. Each statistic answers a different question about centre or spread.",
      diagnosticIntent:
        "Checks coordinated calculation of three summaries without confusing their distinct definitions.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-data-qm2",
      prompt:
        "Household incomes are strongly right-skewed by a few very high values. Which pair best summarises a typical income and its spread?",
      latex: "\\text{strong right skew with high outliers}",
      answer: "C",
      choices: [
        "mean and range",
        "mean and standard deviation",
        "median and interquartile range",
        "mode and maximum",
      ],
      distractorMisconceptions: {
        A: "Selects two measures that are both strongly affected by extreme values.",
        B: "Uses a centre and spread pair that remains sensitive to the long upper tail.",
        D: "Uses statistics that do not describe the middle and middle-half spread reliably.",
      },
      hint: "Choose measures that resist the influence of a small number of extreme observations.",
      explanation:
        "The median depends on order rather than the magnitude of the extremes, and the IQR uses only the middle half of the data. Both are resistant to the high-income outliers. The mean, range, and standard deviation are pulled upward or widened by those extremes, so C is the most representative pair.",
      diagnosticIntent:
        "Tests reasoned selection of summary statistics from distribution shape rather than formula recall.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm3",
      prompt:
        "Four test scores have mean 14. Three scores are shown. Find the missing score and the median of the completed set.",
      latex: "9,\\ 13,\\ 18,\\ x,\\qquad \\bar{x}=14",
      answer: "missing score 16; median 14.5",
      acceptedAnswers: ["x=16, median=29/2"],
      hint: "Recover the required total from the mean, then reorder all four scores before taking the middle pair.",
      explanation:
        "A mean of $14$ across four scores requires a total of $56$. The known scores total $40$, so $x=16$. In order, the scores are $9,13,16,18$; therefore the median is the average of the two middle values, $(13+16)/2=14.5$.",
      diagnosticIntent:
        "Checks reverse use of the mean followed by correct even-sized median calculation.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-data-qm4",
      prompt: "Which comparison is supported by the two box plots?",
      latex: "\\text{compare Classes A and B}",
      answer: "B",
      choices: [
        "Class A has the larger median and larger IQR",
        "Class B has the larger median, while Class A has the larger IQR",
        "Both classes have the same median and IQR",
        "Class B has the smaller median and larger IQR",
      ],
      distractorMisconceptions: {
        A: "Reads the longer Class A box as also locating its median farther right.",
        C: "Ignores the distinct median lines and box widths.",
        D: "Reverses the positions of the two median markers.",
      },
      hint: "Read each median from the line inside its box and each IQR from the width of that box.",
      explanation:
        "Class A has median $12$ and IQR $16-8=8$. Class B has median $14$ and IQR $17-11=6$. Thus Class B has the higher centre, but Class A has the wider middle half. Option B is the only statement that compares both features correctly.",
      diagnosticIntent:
        "Checks visual interpretation of centre and spread as separate distribution features.",
      taskType: "procedural",
      difficulty: 3,
      boxPlotDiagram: {
        description:
          "Parallel box plots for Class A with quartiles 8, 12, 16 and Class B with quartiles 11, 14, 17",
        plots: [
          { label: "Class A", min: 4, q1: 8, median: 12, q3: 16, max: 22 },
          { label: "Class B", min: 7, q1: 11, median: 14, q3: 17, max: 20 },
        ],
        axisLabel: "Score",
        xMin: 0,
        xMax: 24,
        showValueLabels: true,
      },
    }),
    richChoice({
      id: "y11adv-pd-data-qm5",
      prompt:
        "For the nine ordered values, a student includes the median in both halves and obtains $Q_1=4$ and $Q_3=8$. Using the convention that excludes the median, which diagnosis is correct?",
      latex: "2,\\ 3,\\ 4,\\ 5,\\ 6,\\ 7,\\ 8,\\ 9,\\ 20",
      answer: "D",
      choices: [
        "the student is correct and 20 is not an outlier",
        "only Q1 is wrong; the upper fence is 14",
        "only Q3 is wrong; the upper fence is 15.5",
        "both quartiles are wrong; Q1=3.5, Q3=8.5, and 20 is a high outlier",
      ],
      distractorMisconceptions: {
        A: "Uses an inconsistent quartile convention and does not test the fence.",
        B: "Repairs only one half of the data after excluding the median.",
        C: "Repairs only the upper half and miscalculates the resulting fence.",
      },
      hint: "Remove the overall median 6, average each remaining pair of middle values, then compute the upper fence.",
      explanation:
        "Excluding the median leaves lower half $2,3,4,5$ and upper half $7,8,9,20$. Hence $Q_1=3.5$, $Q_3=8.5$, and $IQR=5$. The upper fence is $8.5+1.5(5)=16$, so $20$ is a high outlier. Therefore D gives the complete correction.",
      diagnosticIntent:
        "Diagnoses inconsistent quartile partitioning and carries the correction into an outlier decision.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm6",
      prompt:
        "Every value in a data set is transformed by $y=2x+5$. The original mean is 12 and IQR is 7. Find the new mean and IQR, explaining the different effects of the two operations.",
      latex: "y=2x+5,\\qquad \\bar{x}=12,\\qquad IQR_x=7",
      answer: "new mean 29; new IQR 14",
      acceptedAnswers: ["mean_y=29, IQR_y=14"],
      hint: "Both scaling and shifting affect location, but adding the same constant cancels when two quartiles are subtracted.",
      explanation:
        "The mean follows the full linear transformation, so $\\bar y=2(12)+5=29$. Quartiles also double and then increase by $5$, but subtraction cancels the shift: $IQR_y=(2Q_3+5)-(2Q_1+5)=2IQR_x=14$. Thus location shifts and scales, while spread only scales.",
      diagnosticIntent:
        "Tests transfer from individual-value transformations to the behaviour of centre and spread.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm7",
      prompt:
        "Investigate all real values of $x$ for which the median of the five-value set remains 8.",
      latex: "2,\\ 5,\\ 8,\\ 11,\\ x",
      answer: "x>=8",
      acceptedAnswers: ["x in [8,infinity)", "x\\ge8"],
      hint: "Place x below, at, and above 8, and track which value occupies the third position after sorting.",
      explanation:
        "With five observations, the median is the third ordered value. If $x\\ge8$, at least the values $2,5,8$ occur at or below the third position, and the third value is exactly $8$. If $x<8$, then $x$ joins $2$ and $5$ below $8$ or displaces one of them, so the third value is below $8$. Hence exactly $x\\ge8$ works.",
      diagnosticIntent:
        "Assesses a bounded case investigation of how an unknown observation changes an order statistic.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm8",
      prompt:
        "Five ordered values have minimum 5, median 12, maximum 20, mean 12, and IQR 11. Using quartiles that exclude the median, reconstruct the data set.",
      latex: "5,\\ x,\\ 12,\\ y,\\ 20",
      answer: "5, 8, 12, 15, 20",
      acceptedAnswers: ["x=8, y=15"],
      hint: "The mean gives x+y, while the IQR from the averages of the two lower and two upper values gives y-x.",
      explanation:
        "The mean requires total $60$, so $5+x+12+y+20=60$ and $x+y=23$. Here $Q_1=(5+x)/2$ and $Q_3=(y+20)/2$, so $IQR=(y+15-x)/2=11$, giving $y-x=7$. Solving the two equations gives $x=8$ and $y=15$, which respect the stated order.",
      diagnosticIntent:
        "Synthesises centre, quartile convention, spread, simultaneous equations, and order validation.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm9",
      prompt:
        "Prove how the mean, median, range, and IQR change when every observation is transformed by $y=3x-4$.",
      latex: "y=3x-4",
      answer: "mean and median become 3 times the original minus 4; range and IQR triple",
      acceptedAnswers: ["mean_y=3mean_x-4, median_y=3median_x-4, range_y=3range_x, IQR_y=3IQR_x"],
      hint: "The transformation is increasing, so it preserves order; subtract transformed endpoints or quartiles to analyse spread.",
      explanation:
        "Averages distribute over the transformation, giving $\\bar y=3\\bar x-4$. Because the map is increasing, the middle ordered value transforms in the same way, so the median becomes three times the old median minus four. In endpoint and quartile differences, the $-4$ cancels, leaving both range and IQR multiplied by $3$.",
      diagnosticIntent:
        "Tests a general proof connecting linear transformations with several distinct summary statistics.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-data-qm10",
      prompt:
        "The ordered data are shown with integer $x\\ge9$. Find the least $x$ that is a high outlier, then find the mean and median at that boundary value. Exclude the median when finding quartiles.",
      latex: "2,\\ 3,\\ 4,\\ 5,\\ 6,\\ 7,\\ 8,\\ 9,\\ x",
      answer: "x=17; mean=61/9; median=6",
      acceptedAnswers: ["least x 17, mean 61/9, median 6"],
      hint: "The quartiles do not depend on x once x is the maximum; form the upper fence and use the strict outlier inequality.",
      explanation:
        "Excluding median $6$ gives $Q_1=(3+4)/2=3.5$ and $Q_3=(8+9)/2=8.5$, so $IQR=5$ and the upper fence is $16$. A high outlier must be strictly above the fence, making the least integer $x=17$. The total is then $44+17=61$, so the mean is $61/9$, while the median remains $6$.",
      diagnosticIntent:
        "Combines quartile conventions, a strict boundary, integer optimisation, and comparison of two centres.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "probability-relative-frequency": [
    richAnswer({
      id: "y11adv-pd-prob-qm1",
      prompt:
        "A fair spinner has eight equal sectors numbered 1 to 8. Find the probability of landing on a prime number.",
      latex: "\\{1,2,3,4,5,6,7,8\\}",
      answer: "1/2",
      acceptedAnswers: ["0.5", "50%"],
      hint: "List the prime outcomes carefully; remember that 1 is not prime.",
      explanation:
        "The prime numbers among $1$ to $8$ are $2,3,5,7$, giving four favourable sectors out of eight equally likely sectors. Therefore the probability is $4/8=1/2$. Including $1$ would incorrectly produce five favourable outcomes.",
      diagnosticIntent:
        "Checks construction of a favourable-outcome set before simplifying a classical probability.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-prob-qm2",
      prompt:
        "A coin lands heads 58 times in 100 tosses. Which interpretation is justified?",
      latex: "\\text{relative frequency of heads}=0.58",
      answer: "B",
      choices: [
        "the next toss must be heads",
        "0.58 is an experimental estimate of the probability of heads",
        "the theoretical probability has been proved to be exactly 0.58",
        "exactly 58 of every future 100 tosses will be heads",
      ],
      distractorMisconceptions: {
        A: "Treats an aggregate estimate as a deterministic prediction of the next trial.",
        C: "Confuses experimental evidence with proof of an exact theoretical probability.",
        D: "Treats long-run tendency as a fixed quota in every block of trials.",
      },
      hint: "Relative frequency estimates an underlying chance; it does not determine individual trials or every future block.",
      explanation:
        "The observed proportion $58/100=0.58$ is evidence-based and can estimate the probability of heads. It neither forces the next outcome nor proves the coin's exact theoretical probability, and random variation means future blocks need not contain exactly 58 heads. Thus B is the defensible statement.",
      diagnosticIntent:
        "Distinguishes an experimental estimate from deterministic and unjustifiably exact claims.",
      taskType: "analytical",
      difficulty: 3,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm3",
      prompt: "Find the probability that at least one of the two events occurs.",
      latex: "P(A)=0.55,\\qquad P(B)=0.40,\\qquad P(A\\cap B)=0.20",
      answer: "0.75",
      acceptedAnswers: ["3/4", "75%"],
      hint: "Add the event probabilities, then remove the overlap that was counted twice.",
      explanation:
        "The general addition rule gives $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. Substitution yields $0.55+0.40-0.20=0.75$. The subtraction is essential because outcomes in the intersection appeared in both initial event totals.",
      diagnosticIntent:
        "Checks appropriate use and interpretation of the overlap term in the addition rule.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-prob-qm4",
      prompt:
        "Using the table, which fraction is the probability of choosing Sport given that the student is in Year 11?",
      latex: "P(\\text{Sport}\\mid\\text{Year 11})",
      answer: "D",
      choices: ["$18/80$", "$28/80$", "$18/28$", "$18/40$"],
      distractorMisconceptions: {
        A: "Uses the grand total instead of the conditioned Year 11 row total.",
        B: "Uses the Sport column total over the grand total.",
        C: "Conditions on Sport rather than on Year 11.",
      },
      hint: "Restrict the denominator to the highlighted Year 11 row, then count Sport within that row.",
      explanation:
        "Conditioning on Year 11 restricts the sample space to the 40 Year 11 students. Of those, 18 choose Sport, so the probability is $18/40$. The grand total and Sport column total answer different joint or reverse-conditional questions, making D correct.",
      diagnosticIntent:
        "Checks denominator selection from a two-way table and distinguishes a conditional probability from a joint one.",
      taskType: "procedural",
      difficulty: 3,
      twoWayTableDiagram: twoWayTable(
        "Activity choice by year group for eighty students, with the Year 11 row highlighted",
        ["Year 11", "Year 12"],
        ["Sport", "Music"],
        [
          [18, 22],
          [10, 30],
        ],
        [40, 40],
        [28, 52],
        80,
        { kind: "row", rowIndex: 0 },
      ),
    }),
    richChoice({
      id: "y11adv-pd-prob-qm5",
      prompt:
        "A student claims events are independent because $P(A\\cap B)=0.24$ equals $P(A)-P(B)$. Which diagnosis is correct?",
      latex: "P(A)=0.6,\\qquad P(B)=0.4,\\qquad P(A\\cap B)=0.24",
      answer: "C",
      choices: [
        "the events are not independent because their probabilities differ",
        "the events are mutually exclusive because the intersection is below each event probability",
        "the conclusion is correct, but the valid test is $0.24=0.6\\times0.4$",
        "independence requires the intersection to be zero",
      ],
      distractorMisconceptions: {
        A: "Assumes independent events must have equal marginal probabilities.",
        B: "Confuses a nonzero overlap with mutual exclusivity.",
        D: "Uses the defining feature of mutually exclusive events as an independence test.",
      },
      hint: "Independence is checked by multiplying the marginal probabilities, not subtracting them.",
      explanation:
        "Although the student's stated rule is invalid, $P(A)P(B)=0.6(0.4)=0.24$, which does equal the intersection. Therefore the events are independent for the correct reason. Different marginal probabilities and a nonzero intersection are both compatible with independence, so C is the complete diagnosis.",
      diagnosticIntent:
        "Separates a correct conclusion from invalid reasoning and targets confusion between independence and exclusivity.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm6",
      prompt:
        "Recover the overlap, then find the conditional probability $P(A\\mid B)$.",
      latex: "P(A)=0.65,\\qquad P(B)=0.50,\\qquad P(A\\cup B)=0.85",
      answer: "P(A intersection B)=0.30; P(A|B)=0.60",
      acceptedAnswers: ["intersection 0.3, conditional 0.6"],
      hint: "Rearrange the addition rule first, then divide the recovered intersection by P(B).",
      explanation:
        "The overlap is $P(A\\cap B)=0.65+0.50-0.85=0.30$. Conditioning on $B$ then gives $P(A\\mid B)=0.30/0.50=0.60$. This uses the union information to reconstruct the joint probability before changing the sample space.",
      diagnosticIntent:
        "Checks a two-stage reverse calculation linking union, intersection, and conditional probability.",
      taskType: "problem-solving",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm7",
      prompt:
        "Investigate the full possible range of $P(A\\cap B)$, and hence of $P(A\\cup B)$, for events with the given marginal probabilities.",
      latex: "P(A)=0.6,\\qquad P(B)=0.5",
      answer: "0.1<=P(A intersection B)<=0.5; 0.6<=P(A union B)<=1",
      acceptedAnswers: ["intersection in [0.1,0.5], union in [0.6,1]"],
      hint: "The overlap cannot exceed the smaller event, while the union cannot exceed 1; use the addition rule for both bounds.",
      explanation:
        "The intersection is at most the smaller marginal probability, so it is at most $0.5$. Since the union $1.1-P(A\\cap B)$ cannot exceed $1$, the intersection is at least $0.1$. Substitution into the same addition rule reverses the endpoints, giving union values from $0.6$ to $1$.",
      diagnosticIntent:
        "Assesses a bounded feasibility investigation rather than evaluation from a fully specified overlap.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm8",
      prompt:
        "In a school, 60% of students are juniors. Of the juniors, 30% travel by bus; of the seniors, 50% travel by bus. Find the probability a student travels by bus and the probability a bus traveller is a junior.",
      latex: "P(J)=0.6,\\quad P(B\\mid J)=0.3,\\quad P(B\\mid J')=0.5",
      answer: "P(bus)=0.38; P(junior|bus)=9/19",
      acceptedAnswers: ["0.38 and 0.18/0.38", "19/50 and 9/19"],
      hint: "Split bus travellers into junior and senior branches, add those joint probabilities, then reverse the condition.",
      explanation:
        "Junior bus travellers have probability $0.6(0.3)=0.18$, while senior bus travellers have probability $0.4(0.5)=0.20$. Thus $P(B)=0.38$. Among bus travellers, the junior share is $0.18/0.38=18/38=9/19$.",
      diagnosticIntent:
        "Synthesises partitioned relative frequencies, total probability, and a reverse conditional calculation.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm9",
      prompt:
        "After 200 trials an event has occurred 84 times. Fifty more trials are run. Find the possible range of the new relative frequency and the least additional successes needed for it to exceed 0.45.",
      latex: "\\frac{84+x}{250},\\qquad 0\\le x\\le50",
      answer: "range 0.336 to 0.536; at least 29 additional successes",
      acceptedAnswers: ["[0.336,0.536], minimum x=29"],
      hint: "Use x=0 and x=50 for the range, then solve a strict inequality for the threshold.",
      explanation:
        "The smallest new frequency is $84/250=0.336$, and the largest is $134/250=0.536$. To exceed $0.45$, solve $(84+x)/250>0.45$, giving $84+x>112.5$ and hence $x>28.5$. Since $x$ counts successes, the least possible integer is $29$.",
      diagnosticIntent:
        "Tests an investigation of how future evidence can change an estimate, including a strict integer boundary.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-prob-qm10",
      prompt:
        "Independent events satisfy the displayed relationships. Determine both marginal probabilities and verify the union.",
      latex: "P(A)=p,\\qquad P(B)=p+0.2,\\qquad P(A\\cup B)=0.76",
      answer: "p=0.4; P(A)=0.4 and P(B)=0.6",
      acceptedAnswers: ["p=2/5, probabilities 2/5 and 3/5"],
      hint: "For independent events replace the intersection in the addition rule by p(p+0.2), then reject invalid probability roots.",
      explanation:
        "Independence gives $P(A\\cap B)=p(p+0.2)$. Hence $p+(p+0.2)-p(p+0.2)=0.76$, which simplifies to $p^2-1.8p+0.56=0$. The roots are $0.4$ and $1.4$, but only $0.4$ is a probability. Then $P(B)=0.6$, and $0.4+0.6-0.24=0.76$ verifies the union.",
      diagnosticIntent:
        "Combines independence, the addition rule, a parameter equation, admissibility, and verification.",
      taskType: "synthesis",
      difficulty: 5,
    }),
  ],

  "sets-venn-diagrams": [
    richAnswer({
      id: "y11adv-pd-sets-qm1",
      prompt:
        "Write the region containing elements in exactly one of $A$ and $B$ using set notation.",
      latex: "\\text{exactly one of }A\\text{ and }B",
      answer: "(A intersection B') union (A' intersection B)",
      acceptedAnswers: ["(A intersect B complement) union (A complement intersect B)", "(A union B) minus (A intersection B)"],
      hint: "Split the region into A-only and B-only pieces, then join those disjoint pieces with a union.",
      explanation:
        "The $A$-only region is $A\\cap B'$, while the $B$-only region is $A'\\cap B$. Elements in exactly one set lie in either of these two regions, so their union is $(A\\cap B')\\cup(A'\\cap B)$. The intersection itself must be excluded.",
      diagnosticIntent:
        "Checks translation from precise region language into combined set operations.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-sets-qm2",
      prompt: "Which expression represents the unshaded region outside both sets?",
      latex: "\\text{outside both }A\\text{ and }B",
      answer: "D",
      choices: ["$A\\cap B$", "$A\\cup B$", "$A\\cap B'$", "$(A\\cup B)'$"],
      distractorMisconceptions: {
        A: "Chooses the central overlap rather than the outside region.",
        B: "Chooses every point inside either circle rather than its complement.",
        C: "Chooses only the A-only region and remains inside one set.",
      },
      hint: "First name everything inside at least one circle, then take its complement.",
      explanation:
        "The union $A\\cup B$ contains every point inside at least one of the circles. The region outside both circles is therefore the complement of that union, $(A\\cup B)'$. This is also equal to $A'\\cap B'$ by De Morgan's law, so D is correct.",
      diagnosticIntent:
        "Checks visual-to-symbolic translation and the distinction between a union and its complement.",
      taskType: "analytical",
      difficulty: 3,
      vennDiagram: {
        description:
          "Two overlapping sets A and B inside a universal set, with the region outside both circles left as the target",
        setALabel: "A",
        setBLabel: "B",
        showCounts: false,
      },
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm3",
      prompt:
        "In a group of 50 students, 28 study French, 24 study Japanese, and 10 study both. Find how many study exactly one language and how many study neither.",
      latex: "n(F)=28,\\quad n(J)=24,\\quad n(F\\cap J)=10,\\quad n(\\xi)=50",
      answer: "32 study exactly one; 8 study neither",
      acceptedAnswers: ["exactly one 32, neither 8"],
      hint: "Remove the intersection from each set for exactly one, then compare the union with the universal total.",
      explanation:
        "French only is $28-10=18$ and Japanese only is $24-10=14$, so exactly one language accounts for $32$ students. The union is $18+10+14=42$, leaving $50-42=8$ students outside both sets.",
      diagnosticIntent:
        "Checks construction and interpretation of all four regions from overlapping set totals.",
      taskType: "problem-solving",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-sets-qm4",
      prompt: "Which statement must be true for mutually exclusive events $A$ and $B$?",
      latex: "A\\cap B=\\varnothing",
      answer: "B",
      choices: [
        "$P(A\\cup B)=P(A)P(B)$",
        "$P(A\\cup B)=P(A)+P(B)$",
        "$P(A\\mid B)=P(A)$ whenever both probabilities are positive",
        "$A$ and $B$ must have equal probabilities",
      ],
      distractorMisconceptions: {
        A: "Uses multiplication associated with independence rather than disjointness.",
        C: "Claims independence even though observing one nonempty disjoint event rules out the other.",
        D: "Adds an equality condition not implied by mutually exclusive regions.",
      },
      hint: "Mutually exclusive events have zero overlap in the general addition formula.",
      explanation:
        "Mutual exclusivity means $P(A\\cap B)=0$. The general addition rule therefore reduces to $P(A\\cup B)=P(A)+P(B)$. Nonempty mutually exclusive events are not independent, and their individual probabilities need not match, so B is the only necessary statement.",
      diagnosticIntent:
        "Checks the structural consequence of disjointness and separates it from independence.",
      taskType: "procedural",
      difficulty: 3,
    }),
    richChoice({
      id: "y11adv-pd-sets-qm5",
      prompt:
        "A student writes $n(A\\cup B)=n(A)+n(B)$ for overlapping sets. Which correction is complete?",
      latex: "n(A)=35,\\qquad n(B)=27,\\qquad n(A\\cap B)=12",
      answer: "C",
      choices: [
        "add the intersection again, giving 74",
        "multiply the two set totals, giving 945",
        "subtract the intersection once, giving 50",
        "subtract both set totals from the intersection, giving -50",
      ],
      distractorMisconceptions: {
        A: "Counts the already duplicated overlap a third time.",
        B: "Uses multiplication without a counting interpretation.",
        D: "Reverses the subtraction and produces an impossible negative count.",
      },
      hint: "Adding both set totals counts every member of the intersection twice, so remove one copy.",
      explanation:
        "The sum $35+27$ includes each of the 12 intersection members once through $A$ and again through $B$. Subtracting one copy gives $n(A\\cup B)=35+27-12=50$. Option C both identifies the double count and repairs it numerically.",
      diagnosticIntent:
        "Diagnoses the double-counting mechanism rather than eliciting the addition formula by rote.",
      taskType: "analytical",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm6",
      prompt:
        "The Venn regions satisfy the displayed conditions. Find all four region counts.",
      latex: "n(A)=30,\\quad n(B)=26,\\quad n(A\\cup B)=44,\\quad n(\\xi)=50",
      answer: "A only 18, intersection 12, B only 14, neither 6",
      acceptedAnswers: ["18,12,14,6"],
      hint: "Recover the intersection from the addition rule, then subtract it from each set and the union from the total.",
      explanation:
        "The intersection is $30+26-44=12$. Therefore $A$ only contains $30-12=18$, while $B$ only contains $26-12=14$. The union accounts for 44 of the 50 elements, so the neither region contains $6$. These regions sum to $50$ as a check.",
      diagnosticIntent:
        "Checks systematic reconstruction of a complete Venn diagram from aggregate constraints.",
      taskType: "problem-solving",
      difficulty: 4,
      vennDiagram: {
        description:
          "Two overlapping sets A and B in a universal set of fifty elements, with region counts to be reconstructed",
        setALabel: "A",
        setBLabel: "B",
        total: 50,
        showCounts: false,
      },
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm7",
      prompt:
        "For subsets of a 60-element universal set with the stated sizes, investigate every possible integer value of the intersection.",
      latex: "n(A)=38,\\qquad n(B)=29,\\qquad n(\\xi)=60",
      answer: "7<=n(A intersection B)<=29",
      acceptedAnswers: ["intersection can be any integer from 7 to 29 inclusive"],
      hint: "The intersection cannot exceed the smaller set, and the union cannot exceed the universal set.",
      explanation:
        "At most, all 29 elements of the smaller set $B$ can lie in $A$, so the intersection is at most 29. Also $n(A\\cup B)=67-n(A\\cap B)$ cannot exceed 60, forcing the intersection to be at least 7. Every integer between these bounds can be realised by reallocating elements among the four regions.",
      diagnosticIntent:
        "Assesses a feasibility investigation using both containment and finite-universe constraints.",
      taskType: "investigative",
      difficulty: 4,
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm8",
      prompt:
        "A survey has an even-looking region pattern: $n(A)$ is twice the intersection, $n(B)$ is three times the intersection, exactly 36 people are in one set only, and 10 are in neither. Find every region and the survey total.",
      latex: "n(A)=2x,\\qquad n(B)=3x,\\qquad n(\\text{exactly one})=36",
      answer: "A only 12, intersection 12, B only 24, neither 10, total 58",
      acceptedAnswers: ["12,12,24,10; total 58"],
      hint: "Let the intersection be x; then A-only and B-only can both be written as multiples of x.",
      explanation:
        "If the intersection is $x$, then $A$ only is $2x-x=x$ and $B$ only is $3x-x=2x$. Exactly one therefore contains $3x=36$, so $x=12$. The four regions are $12,12,24,10$, and their sum gives a total of $58$ people.",
      diagnosticIntent:
        "Synthesises proportional aggregate information into a complete region model and total population.",
      taskType: "synthesis",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm9",
      prompt: "Prove De Morgan's law by following an arbitrary element $x$.",
      latex: "(A\\cup B)'=A'\\cap B'",
      answer: "x is outside A union B iff x is outside A and outside B, so the sets are equal",
      acceptedAnswers: ["x notin A union B iff x notin A and x notin B iff x in A' intersection B'"],
      hint: "Translate membership in the complement of a union into two simultaneous non-membership statements.",
      explanation:
        "Take any element $x$. It lies in $(A\\cup B)'$ exactly when it is not in $A\\cup B$. That means $x$ is not in $A$ and is not in $B$, which is equivalent to $x\\in A'$ and $x\\in B'$. Hence $x\\in A'\\cap B'$. Reversing each implication proves equality of the sets.",
      diagnosticIntent:
        "Tests a general membership proof rather than recognition of a memorised set identity.",
      taskType: "investigative",
      difficulty: 5,
    }),
    richAnswer({
      id: "y11adv-pd-sets-qm10",
      prompt:
        "The four Venn regions have probabilities $2p$, $p$, $3p$, and $0.2$ as shown for A-only, both, B-only, and neither. Find $p$, $P(A\\cup B)$, and $P(A\\mid B)$.",
      latex: "P(A\\cap B')=2p,\\quad P(A\\cap B)=p,\\quad P(A'\\cap B)=3p,\\quad P(A'\\cap B')=0.2",
      answer: "p=2/15; P(A union B)=4/5; P(A|B)=1/4",
      acceptedAnswers: ["p=0.133333..., union 0.8, conditional 0.25"],
      hint: "Make the four disjoint regions sum to 1, then assemble the union and the conditioned set B.",
      explanation:
        "The regions total $6p+0.2=1$, so $p=0.8/6=2/15$. The union is the first three regions, $6p=4/5$. Event $B$ consists of the intersection $p$ and the B-only region $3p$, so $P(A\\mid B)=p/(4p)=1/4$.",
      diagnosticIntent:
        "Combines a parameterised Venn model, normalisation, region aggregation, and conditional probability.",
      taskType: "synthesis",
      difficulty: 5,
      vennDiagram: {
        description: "Two-set Venn diagram showing symbolic probabilities in all four disjoint regions for events A and B.",
        setALabel: "A",
        setBLabel: "B",
        aOnly: "2p",
        intersection: "p",
        bOnly: "3p",
        neither: "0.2",
        total: "1",
      },
    }),
  ],
};
