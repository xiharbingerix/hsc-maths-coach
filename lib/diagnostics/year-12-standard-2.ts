import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Standard 2",

  units: [
    {
      slug: "algebraic-relationships",
      title: "Algebraic Relationships",
      startHref: "/course/year-12-standard-2/algebraic-relationships",
    },
    {
      slug: "trigonometry",
      title: "Trigonometry",
      startHref: "/course/year-12-standard-2/trigonometry",
    },
    {
      slug: "ratios-rates",
      title: "Rates and Ratios",
      startHref: "/course/year-12-standard-2/ratios-rates",
    },
    {
      slug: "measurement-surface-area-volume",
      title: "Surface Area and Volume",
      startHref: "/course/year-12-standard-2/measurement-surface-area-volume",
    },
    {
      slug: "investment-loans",
      title: "Investment and Loans",
      startHref: "/course/year-12-standard-2/investment-loans",
    },
    {
      slug: "annuities",
      title: "Annuities",
      startHref: "/course/year-12-standard-2/annuities",
    },
    {
      slug: "bivariate-data",
      title: "Bivariate Data Analysis",
      startHref: "/course/year-12-standard-2/bivariate-data",
    },
    {
      slug: "probability",
      title: "Relative Frequency and Probability",
      startHref: "/course/year-12-standard-2/probability",
    },
    {
      slug: "normal-distribution",
      title: "The Normal Distribution",
      startHref: "/course/year-12-standard-2/normal-distribution",
    },
    {
      slug: "network-flow",
      title: "Network Flow",
      startHref: "/course/year-12-standard-2/network-flow",
    },
    {
      slug: "critical-path-analysis",
      title: "Critical Path Analysis",
      startHref: "/course/year-12-standard-2/critical-path-analysis",
    },
  ],

  questions: [
    {
      id: "y12std2-d5-regression-budget-residual",
      unitSlug: "algebraic-relationships",
      assessedUnitSlugs: ["bivariate-data"],
      difficulty: 5,
      targetMisconception:
        "Solves the linear model but then compares the actual cost with the budget instead of calculating a regression residual.",
      prompt:
        "A delivery company models cost by $C=8+2.4d$, where $d$ is distance in kilometres and $C$ is dollars. A customer has a 50 dollar budget. A 19 km delivery actually costs 53.60 dollars. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "The budget distance is 17.5 km, and the 19 km delivery has residual 0 dollars.",
        },
        {
          label: "B",
          text: "The budget distance is 17.5 km, and the 19 km delivery has residual 3.60 dollars.",
        },
        {
          label: "C",
          text: "The budget distance is 24.2 km, and the 19 km delivery has residual 0 dollars.",
        },
        {
          label: "D",
          text: "The budget distance is 19 km, and the 19 km delivery has residual -3.60 dollars.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solving $50=8+2.4d$ gives $d=17.5$. For 19 km, the model predicts $8+2.4(19)=53.60$, so actual minus predicted is $0$.",
    },
    {
      id: "y12std2-d5-ramp-gradient-angle",
      unitSlug: "trigonometry",
      assessedUnitSlugs: ["ratios-rates"],
      difficulty: 5,
      targetMisconception:
        "Uses the angle calculation but checks compliance against the reciprocal gradient or ignores the rise-run ratio.",
      prompt:
        "A ramp rises 1.1 m over a horizontal run of 16 m. A design limit requires the gradient to be no steeper than $1:14$. Which statement best describes the ramp?",
      choices: [
        {
          label: "A",
          text: "Its angle is about $3.9^\\circ$ and it satisfies the gradient limit.",
        },
        {
          label: "B",
          text: "Its angle is about $3.9^\\circ$ but it is too steep for the limit.",
        },
        {
          label: "C",
          text: "Its angle is about $86.1^\\circ$ and it satisfies the gradient limit.",
        },
        {
          label: "D",
          text: "Its angle is about $4.5^\\circ$ and it is exactly at the limit.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "$\\tan\\theta=1.1/16$, so $\\theta\\approx3.9^\\circ$. The gradient is $1.1:16=1:14.55$, which is less steep than $1:14$.",
    },
    {
      id: "y12std2-d5-tank-fill-rate",
      unitSlug: "measurement-surface-area-volume",
      assessedUnitSlugs: ["ratios-rates"],
      difficulty: 5,
      targetMisconception:
        "Finds a cylinder volume but fails to combine percentage fill, unit conversion, and rate in the same model.",
      prompt:
        "A cylindrical tank has radius 0.8 m and height 1.5 m. It is filled to 80% of capacity at 12 L/min. Using $1\\text{ m}^3=1000$ L, about how long does this take?",
      choices: [
        { label: "A", text: "201 minutes" },
        { label: "B", text: "251 minutes" },
        { label: "C", text: "804 minutes" },
        { label: "D", text: "2.4 minutes" },
      ],
      correctAnswer: "A",
      explanation:
        "The capacity is $\\pi(0.8)^2(1.5)=0.96\\pi\\text{ m}^3$. At 80%, this is about $2.414\\text{ m}^3=2414$ L, and $2414\\div12\\approx201$ minutes.",
    },
    {
      id: "y12std2-d5-loan-recurrence-principal",
      unitSlug: "investment-loans",
      assessedUnitSlugs: ["annuities", "algebraic-relationships"],
      difficulty: 5,
      targetMisconception:
        "Substitutes into the recurrence forward but cannot reverse it to infer the starting loan balance and principal reduction.",
      prompt:
        "A monthly loan balance follows $B_{n+1}=1.006B_n-650$. After the first repayment, the balance is 24500 dollars. What was the original balance and what happened during the first month?",
      choices: [
        {
          label: "A",
          text: "Original balance 25000 dollars; the balance fell by 500 dollars.",
        },
        {
          label: "B",
          text: "Original balance 23850 dollars; the balance rose by 650 dollars.",
        },
        {
          label: "C",
          text: "Original balance 25000 dollars; the balance fell by 650 dollars.",
        },
        {
          label: "D",
          text: "Original balance 25150 dollars; the balance fell by 650 dollars.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solve $24500=1.006B_0-650$, so $B_0=25000$. The first month's interest is $0.006(25000)=150$, so the 650 dollar repayment reduces the balance by $650-150=500$.",
    },
    {
      id: "y12std2-d5-standardised-residual",
      unitSlug: "bivariate-data",
      assessedUnitSlugs: ["normal-distribution"],
      difficulty: 5,
      targetMisconception:
        "Calculates a residual but does not standardise it relative to the typical residual spread.",
      prompt:
        "A regression model predicts exam score by $\\hat{y}=42+6x$, where $x$ is study hours. For $x=7$, a student scores 92. If residuals have standard deviation 8 marks, how should this result be interpreted?",
      choices: [
        {
          label: "A",
          text: "The score is 8 marks above prediction, which is 1 residual standard deviation.",
        },
        {
          label: "B",
          text: "The score is 8 marks below prediction, which is 1 residual standard deviation.",
        },
        {
          label: "C",
          text: "The score is 50 marks above prediction, which is 6.25 residual standard deviations.",
        },
        {
          label: "D",
          text: "The score is exactly predicted because $42+6(7)=92$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The predicted score is $42+6(7)=84$. The residual is $92-84=8$, and $8/8=1$, so it is one residual standard deviation above the prediction.",
    },
    {
      id: "y12std2-d5-normal-batch-risk",
      unitSlug: "normal-distribution",
      assessedUnitSlugs: ["probability"],
      difficulty: 5,
      targetMisconception:
        "Reads a normal tail probability for one item but treats it as the probability for an entire batch.",
      prompt:
        "Can volumes are normally distributed with mean 375 mL and standard deviation 5 mL. A can below 365 mL is considered underfilled. Using the empirical rule, what is the best interpretation for a batch of 200 cans?",
      choices: [
        {
          label: "A",
          text: "About 5 cans are expected to be underfilled, and at least one underfilled can is very likely.",
        },
        {
          label: "B",
          text: "About 2.5 cans are expected to be underfilled, and at least one underfilled can is unlikely.",
        },
        {
          label: "C",
          text: "About 95 cans are expected to be underfilled, because 365 is within two standard deviations.",
        },
        {
          label: "D",
          text: "About 195 cans are expected to be underfilled, because 365 is below the mean.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The cutoff 365 mL is two standard deviations below the mean, so about 2.5% are below it. In 200 cans, $0.025\\times200=5$, making at least one underfilled can very likely.",
    },
    {
      id: "y12std2-d5-flow-bottleneck",
      unitSlug: "network-flow",
      assessedUnitSlugs: ["ratios-rates"],
      difficulty: 5,
      targetMisconception:
        "Adds all edge capacities instead of identifying source, sink, and transfer bottlenecks in the network.",
      prompt:
        "A flow network has directed capacities $S\\to A:8$, $S\\to B:5$, $A\\to T:6$, $A\\to B:2$, and $B\\to T:7$, all in units per minute. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "The maximum flow is 13 units/min; removing $A\\to B$ lowers it to 11 units/min.",
        },
        {
          label: "B",
          text: "The maximum flow is 28 units/min; removing $A\\to B$ lowers it to 26 units/min.",
        },
        {
          label: "C",
          text: "The maximum flow is 11 units/min; removing $A\\to B$ makes no difference.",
        },
        {
          label: "D",
          text: "The maximum flow is 15 units/min; removing $A\\to B$ lowers it to 13 units/min.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Send 8 from $S$ to $A$: 6 goes to $T$ and 2 transfers to $B$. Send 5 from $S$ to $B$, so $B\\to T$ carries 7. The total is 13. Without $A\\to B$, the total is only $6+5=11$.",
    },
    {
      id: "y12std2-d5-critical-path-shortening",
      unitSlug: "critical-path-analysis",
      assessedUnitSlugs: ["network-flow"],
      difficulty: 5,
      targetMisconception:
        "Shortens a non-critical activity and expects the whole project duration to decrease by the same amount.",
      prompt:
        "A project has activities: $A=3$ days; after $A$, $B=5$ and $C=4$ can run; after $B$ and $C$, $D=2$ can run; after $C$, $E=6$ can run. The project finishes when both $D$ and $E$ are complete. Which statement is true?",
      choices: [
        {
          label: "A",
          text: "The project duration is 13 days, and shortening $C$ by 1 day shortens the project to 12 days.",
        },
        {
          label: "B",
          text: "The project duration is 10 days, and shortening $B$ by 1 day shortens the project to 9 days.",
        },
        {
          label: "C",
          text: "The project duration is 13 days, and shortening $B$ by 1 day shortens the project to 12 days.",
        },
        {
          label: "D",
          text: "The project duration is 15 days, because $D$ and $E$ must be added after both branches.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The path $A\\to C\\to E$ takes $3+4+6=13$ days, longer than paths ending through $D$. Since $C$ lies on the critical path, reducing $C$ by 1 day reduces the project duration to 12 days.",
    },
    {
      id: "y12std2-d5-investment-break-even",
      unitSlug: "investment-loans",
      assessedUnitSlugs: ["algebraic-relationships", "ratios-rates"],
      difficulty: 5,
      targetMisconception:
        "Compares interest rates alone without accounting for fixed fees and the time horizon.",
      prompt:
        "Two 1-year investment accounts pay simple interest. Account A pays $4.8\\%$ p.a. with no fee. Account B pays $5.4\\%$ p.a. but charges a 36 dollar annual fee. For what principal does Account B first match Account A?",
      choices: [
        { label: "A", text: "6000 dollars" },
        { label: "B", text: "7500 dollars" },
        { label: "C", text: "3600 dollars" },
        { label: "D", text: "12000 dollars" },
      ],
      correctAnswer: "A",
      explanation:
        "Account B's extra interest rate is $5.4\\%-4.8\\%=0.6\\%=0.006$. It matches Account A when $0.006P=36$, so $P=6000$ dollars.",
    },
    {
      id: "y12std2-d5-trig-scale-volume",
      unitSlug: "trigonometry",
      assessedUnitSlugs: ["measurement-surface-area-volume", "ratios-rates"],
      difficulty: 5,
      targetMisconception:
        "Finds the sloping height or scale factor but applies it linearly to a volume-like quantity.",
      prompt:
        "A triangular prism model is built at scale $1:25$. In the real object, a right triangular end has horizontal side 7.5 m and angle of elevation $36.9^\\circ$ to the hypotenuse, so its vertical height is about 5.6 m. Which statement about the model is correct?",
      choices: [
        {
          label: "A",
          text: "The model end height is about 22.4 cm, and the model's volume scale factor is $1:15625$.",
        },
        {
          label: "B",
          text: "The model end height is about 14.0 cm, and the model's volume scale factor is $1:25$.",
        },
        {
          label: "C",
          text: "The model end height is about 22.4 cm, and the model's volume scale factor is $1:625$.",
        },
        {
          label: "D",
          text: "The model end height is about 140 cm, and the model's volume scale factor is $1:15625$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The real height is about $7.5\\tan36.9^\\circ\\approx5.6$ m. At scale $1:25$, the model height is $5.6/25=0.224$ m, or 22.4 cm. Volumes scale by $25^3=15625$.",
    },
  ],
};
