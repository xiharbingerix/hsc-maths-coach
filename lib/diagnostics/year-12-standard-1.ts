import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 12 Mathematics Standard 1",

  units: [
    {
      slug: "rates",
      title: "Rates",
      startHref: "/course/year-12-standard-1/rates",
    },
    {
      slug: "networks-and-paths",
      title: "Networks and Paths",
      startHref: "/course/year-12-standard-1/networks-and-paths",
    },
    {
      slug: "investments",
      title: "Investments",
      startHref: "/course/year-12-standard-1/investments",
    },
    {
      slug: "right-angled-triangles",
      title: "Right-Angled Triangles",
      startHref: "/course/year-12-standard-1/right-angled-triangles",
    },
    {
      slug: "simultaneous-linear-equations",
      title: "Simultaneous Linear Equations",
      startHref: "/course/year-12-standard-1/simultaneous-linear-equations",
    },
    {
      slug: "further-statistical-analysis",
      title: "Further Statistical Analysis",
      startHref: "/course/year-12-standard-1/further-statistical-analysis",
    },
    {
      slug: "scale-drawing",
      title: "Scale Drawing",
      startHref: "/course/year-12-standard-1/scale-drawing",
    },
    {
      slug: "depreciation-and-loans",
      title: "Depreciation and Loans",
      startHref: "/course/year-12-standard-1/depreciation-and-loans",
    },
    {
      slug: "graphs-of-practical-situations",
      title: "Graphs of Practical Situations",
      startHref: "/course/year-12-standard-1/graphs-of-practical-situations",
    },
  ],

  questions: [
    {
      id: "y12s1-d5-plan-break-even",
      unitSlug: "simultaneous-linear-equations",
      assessedUnitSlugs: ["graphs-of-practical-situations", "rates"],
      difficulty: 5,
      targetMisconception:
        "Solves a break-even equation but does not interpret which linear model is cheaper on either side of the intersection.",
      prompt:
        "Two gardening services charge by the hour. Service A costs 85 dollars plus 12 dollars per hour. Service B costs 45 dollars plus 20 dollars per hour. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "They cost the same for 5 hours; for a 3 hour job, Service B is cheaper.",
        },
        {
          label: "B",
          text: "They cost the same for 5 hours; for a 3 hour job, Service A is cheaper.",
        },
        {
          label: "C",
          text: "They cost the same for 6.5 hours; for a 3 hour job, Service B is cheaper.",
        },
        {
          label: "D",
          text: "They never cost the same because Service B has the higher hourly rate.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solve $85+12h=45+20h$, giving $40=8h$ and $h=5$. For 3 hours, Service A costs 121 dollars and Service B costs 105 dollars, so B is cheaper.",
    },
    {
      id: "y12s1-d5-scale-route-time",
      unitSlug: "scale-drawing",
      assessedUnitSlugs: ["rates"],
      difficulty: 5,
      targetMisconception:
        "Converts the map distance correctly but forgets either the detour percentage or the hour-to-minute conversion.",
      prompt:
        "On a map with scale $1:20\\,000$, a walking route measures 14 cm. A detour makes the actual walking distance 15% longer than the mapped route. At an average speed of 4.8 km/h, how long will the walk take, to the nearest minute?",
      choices: [
        { label: "A", text: "35 minutes" },
        { label: "B", text: "40 minutes" },
        { label: "C", text: "67 minutes" },
        { label: "D", text: "3 minutes" },
      ],
      correctAnswer: "B",
      explanation:
        "The mapped distance is $14\\times20000=280000$ cm, or 2.8 km. Including the detour gives $2.8\\times1.15=3.22$ km. Time is $3.22/4.8$ hours, about 40 minutes.",
    },
    {
      id: "y12s1-d5-ramp-scale-angle",
      unitSlug: "right-angled-triangles",
      assessedUnitSlugs: ["scale-drawing", "rates"],
      difficulty: 5,
      targetMisconception:
        "Finds a scaled length but uses the hypotenuse or reciprocal ratio when deciding the ramp angle.",
      prompt:
        "A ramp is drawn on a $1:50$ plan with horizontal run 16 cm. The real ramp rises 1.2 m. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "The real horizontal run is 8 m and the ramp angle is about $8.5^\\circ$.",
        },
        {
          label: "B",
          text: "The real horizontal run is 8 m and the ramp angle is about $81.5^\\circ$.",
        },
        {
          label: "C",
          text: "The real horizontal run is 0.8 m and the ramp angle is about $56.3^\\circ$.",
        },
        {
          label: "D",
          text: "The real horizontal run is 16 m and the ramp angle is about $4.3^\\circ$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The real horizontal run is $16\\times50=800$ cm, or 8 m. Since $\\tan\\theta=1.2/8=0.15$, $\\theta\\approx8.5^\\circ$.",
    },
    {
      id: "y12s1-d5-car-equity",
      unitSlug: "depreciation-and-loans",
      assessedUnitSlugs: ["investments"],
      difficulty: 5,
      targetMisconception:
        "Applies depreciation once or subtracts percentages linearly instead of using repeated percentage change before comparing with the loan.",
      prompt:
        "A car was bought for 18000 dollars. It depreciates by 12% per year using reducing balance depreciation. After 2 years, the loan balance is 14000 dollars. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "The car is worth about 13939 dollars, so the loan is about 61 dollars more than the car value.",
        },
        {
          label: "B",
          text: "The car is worth about 13680 dollars, so the loan is about 320 dollars more than the car value.",
        },
        {
          label: "C",
          text: "The car is worth about 15840 dollars, so the car value is about 1840 dollars more than the loan.",
        },
        {
          label: "D",
          text: "The car is worth about 14400 dollars, so the car value is about 400 dollars more than the loan.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Reducing balance depreciation gives $18000(0.88)^2=13939.20$ dollars. Compared with a 14000 dollar loan, the loan is 60.80 dollars higher.",
    },
    {
      id: "y12s1-d5-loan-payment-effect",
      unitSlug: "depreciation-and-loans",
      assessedUnitSlugs: ["simultaneous-linear-equations", "investments"],
      difficulty: 5,
      targetMisconception:
        "Treats the repayment as pure principal reduction and ignores interest added before the repayment.",
      prompt:
        "A loan balance follows $B_{n+1}=1.01B_n-420$ each month. If the balance starts at 12000 dollars, what is the balance after one month and how much principal was actually reduced?",
      choices: [
        {
          label: "A",
          text: "11700 dollars; the principal reduced by 420 dollars.",
        },
        {
          label: "B",
          text: "11700 dollars; the principal reduced by 300 dollars.",
        },
        {
          label: "C",
          text: "11580 dollars; the principal reduced by 420 dollars.",
        },
        {
          label: "D",
          text: "12120 dollars; the principal increased by 120 dollars.",
        },
      ],
      correctAnswer: "B",
      explanation:
        "The balance after one month is $1.01(12000)-420=12120-420=11700$ dollars. The balance fell from 12000 to 11700, so principal reduced by 300 dollars.",
    },
    {
      id: "y12s1-d5-data-standardised-change",
      unitSlug: "further-statistical-analysis",
      assessedUnitSlugs: ["rates"],
      difficulty: 5,
      targetMisconception:
        "Compares raw changes only and misses that variability changes the meaning of an improvement.",
      prompt:
        "A delivery driver has an average time of 42 min with standard deviation 6 min before a route change. After the change, the average is 39 min with standard deviation 3 min. A 36 min delivery occurs after the change. Which interpretation is best?",
      choices: [
        {
          label: "A",
          text: "The mean improved by 3 min, and 36 min is 1 standard deviation faster than the new mean.",
        },
        {
          label: "B",
          text: "The mean improved by 6 min, and 36 min is 2 standard deviations faster than the new mean.",
        },
        {
          label: "C",
          text: "The mean worsened by 3 min, because lower times are further from zero.",
        },
        {
          label: "D",
          text: "The 36 min delivery is average because it is 6 min faster than the old mean.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The average time decreased from 42 to 39 minutes, an improvement of 3 minutes. Relative to the new distribution, $36$ is $3$ minutes below the mean, which is $1$ new standard deviation.",
    },
    {
      id: "y12s1-d5-network-shortest-time",
      unitSlug: "networks-and-paths",
      assessedUnitSlugs: ["rates"],
      difficulty: 5,
      targetMisconception:
        "Chooses the route with fewer edges or adds all available edges instead of comparing complete path weights and converting speed to time.",
      prompt:
        "A courier can travel from depot $A$ to depot $D$ by these paths: $A-B-D$ is $9+8$ km, $A-C-D$ is $6+12$ km, and $A-C-E-D$ is $6+5+4$ km. At 60 km/h, which path is shortest and how long does it take?",
      choices: [
        { label: "A", text: "$A-C-E-D$, 15 minutes" },
        { label: "B", text: "$A-B-D$, 17 minutes" },
        { label: "C", text: "$A-C-D$, 18 minutes" },
        { label: "D", text: "$A-C-E-D$, 25 minutes" },
      ],
      correctAnswer: "A",
      explanation:
        "The path distances are 17 km, 18 km, and 15 km, so $A-C-E-D$ is shortest. At 60 km/h, 15 km takes $15/60$ hours, or 15 minutes.",
    },
    {
      id: "y12s1-d5-graph-tank-piecewise",
      unitSlug: "graphs-of-practical-situations",
      assessedUnitSlugs: ["rates", "simultaneous-linear-equations"],
      difficulty: 5,
      targetMisconception:
        "Reads the graph trend as a total change but cannot form or use the rate model to predict a later threshold.",
      prompt:
        "A tank contains 1200 L at time 0 hours and 800 L at time 8 hours, decreasing at a constant rate. If that rate continues after 8 hours, when will the tank first reach 500 L?",
      choices: [
        { label: "A", text: "14 hours after the start" },
        { label: "B", text: "6 hours after the start" },
        { label: "C", text: "10.5 hours after the start" },
        { label: "D", text: "24 hours after the start" },
      ],
      correctAnswer: "A",
      explanation:
        "The slope is $(800-1200)/(8-0)=-50$ L/h. From 1200 L to 500 L is a drop of 700 L, which takes $700/50=14$ hours from the start.",
    },
    {
      id: "y12s1-d5-investment-fee-break-even",
      unitSlug: "investments",
      assessedUnitSlugs: ["simultaneous-linear-equations"],
      difficulty: 5,
      targetMisconception:
        "Chooses the higher interest rate without modelling the fixed fee and break-even principal.",
      prompt:
        "Two one-year savings accounts pay simple interest. Account A pays $3.8\\%$ p.a. with no fee. Account B pays $4.4\\%$ p.a. but charges a 24 dollar annual fee. At what principal do the accounts give the same return after fees?",
      choices: [
        { label: "A", text: "4000 dollars" },
        { label: "B", text: "5455 dollars" },
        { label: "C", text: "2400 dollars" },
        { label: "D", text: "6000 dollars" },
      ],
      correctAnswer: "A",
      explanation:
        "Account B earns an extra $0.6\\%=0.006$ of the principal, but loses 24 dollars to the fee. Break-even occurs when $0.006P=24$, so $P=4000$ dollars.",
    },
    {
      id: "y12s1-d5-stat-graph-decision",
      unitSlug: "further-statistical-analysis",
      assessedUnitSlugs: ["graphs-of-practical-situations", "rates"],
      difficulty: 5,
      targetMisconception:
        "Uses only the final value on a practical graph and ignores consistency, spread, and rate of improvement.",
      prompt:
        "Two machines are tested for weekly output. Machine A has outputs 96, 98, 100, 102, 104. Machine B has outputs 90, 96, 102, 108, 114. A manager wants a machine with average output at least 100 and less variation. Which choice is best supported?",
      choices: [
        {
          label: "A",
          text: "Machine A, because both averages are 100 but A has the smaller spread.",
        },
        {
          label: "B",
          text: "Machine B, because its final weekly output is the highest.",
        },
        {
          label: "C",
          text: "Machine A, because its average is 104 and B's average is 90.",
        },
        {
          label: "D",
          text: "Neither machine, because both have outputs below 100 in some weeks.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Both machines have mean output 100. Machine A ranges from 96 to 104, while Machine B ranges from 90 to 114, so A has less variation while meeting the average target.",
    },
  ],
};
