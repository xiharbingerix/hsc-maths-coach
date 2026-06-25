import type { DiagnosticData } from "./types";

export const diagnosticData: DiagnosticData = {
  yearLevelTitle: "Year 11 Mathematics Standard",

  units: [
    {
      slug: "formulae-equations",
      title: "Formulae and Equations",
      startHref: "/course/year-11-standard/formulae-equations",
    },
    {
      slug: "linear-relationships",
      title: "Linear Relationships",
      startHref: "/course/year-11-standard/linear-relationships",
    },
    {
      slug: "money-and-financial-mathematics",
      title: "Money and Financial Mathematics",
      startHref: "/course/year-11-standard/money-and-financial-mathematics",
    },
    {
      slug: "applications-of-measurement",
      title: "Applications of Measurement",
      startHref: "/course/year-11-standard/applications-of-measurement",
    },
    {
      slug: "working-with-time",
      title: "Working with Time",
      startHref: "/course/year-11-standard/working-with-time",
    },
    {
      slug: "networks-and-paths",
      title: "Networks and Paths",
      startHref: "/course/year-11-standard/networks-and-paths",
    },
    {
      slug: "data-analysis",
      title: "Data Analysis",
      startHref: "/course/year-11-standard/data-analysis",
    },
    {
      slug: "relative-frequency-and-probability",
      title: "Relative Frequency and Probability",
      startHref: "/course/year-11-standard/relative-frequency-and-probability",
    },
  ],

  questions: [
    {
      id: "y11std-d5-plan-threshold",
      unitSlug: "linear-relationships",
      assessedUnitSlugs: ["formulae-equations"],
      difficulty: 5,
      targetMisconception:
        "Solves a break-even equation but does not interpret which linear model is cheaper before and after the intersection.",
      prompt:
        "Service A costs 35 dollars plus 18 dollars per hour. Service B costs 15 dollars plus 23 dollars per hour. Which statement is correct?",
      choices: [
        {
          label: "A",
          text: "They cost the same at 4 hours; for 2 hours, Service B is cheaper.",
        },
        {
          label: "B",
          text: "They cost the same at 4 hours; for 2 hours, Service A is cheaper.",
        },
        {
          label: "C",
          text: "They cost the same at 10 hours; for 2 hours, Service B is cheaper.",
        },
        {
          label: "D",
          text: "Service A is always cheaper because its hourly rate is lower.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Solve $35+18h=15+23h$, giving $20=5h$ and $h=4$. At 2 hours, Service A costs 71 dollars and Service B costs 61 dollars, so Service B is cheaper.",
    },
    {
      id: "y11std-d5-overtime-shift",
      unitSlug: "money-and-financial-mathematics",
      assessedUnitSlugs: ["working-with-time"],
      difficulty: 5,
      targetMisconception:
        "Calculates total shift length but ignores unpaid break time or applies overtime to all hours.",
      prompt:
        "A shift runs from 8:30 am to 5:15 pm with a 45 minute unpaid break. Pay is 28 dollars per hour for the first 7.5 paid hours and time-and-a-half after that. What is the gross pay?",
      choices: [
        { label: "A", text: "224 dollars" },
        { label: "B", text: "231 dollars" },
        { label: "C", text: "245 dollars" },
        { label: "D", text: "367.50 dollars" },
      ],
      correctAnswer: "B",
      explanation:
        "The shift is 8 hours 45 minutes, but the 45 minute break is unpaid, so paid time is 8 hours. Regular pay is $7.5\\times28=210$ dollars and overtime is $0.5\\times42=21$ dollars, totalling 231 dollars.",
    },
    {
      id: "y11std-d5-tiles-whole-boxes",
      unitSlug: "applications-of-measurement",
      assessedUnitSlugs: ["money-and-financial-mathematics"],
      difficulty: 5,
      targetMisconception:
        "Finds the area but rounds the number of boxes down instead of interpreting whole-purchase constraints.",
      prompt:
        "A floor is $4.2\\text{ m}$ by $3.5\\text{ m}$. One box of tiles covers $1.2\\text{ m}^2$ and costs 38 dollars. Boxes cannot be split. What is the minimum cost?",
      choices: [
        { label: "A", text: "456 dollars" },
        { label: "B", text: "465.50 dollars" },
        { label: "C", text: "494 dollars" },
        { label: "D", text: "558.60 dollars" },
      ],
      correctAnswer: "C",
      explanation:
        "The floor area is $4.2\\times3.5=14.7\\text{ m}^2$. Since $14.7\\div1.2=12.25$, 13 boxes are needed. The cost is $13\\times38=494$ dollars.",
    },
    {
      id: "y11std-d5-linear-time-tank",
      unitSlug: "working-with-time",
      assessedUnitSlugs: ["linear-relationships"],
      difficulty: 5,
      targetMisconception:
        "Uses the total change as the rate or mishandles elapsed time when building the linear model.",
      prompt:
        "A tank has 900 L at 10:15 am and 660 L at 11:45 am, decreasing at a constant rate. When will it first reach 500 L?",
      choices: [
        { label: "A", text: "12:15 pm" },
        { label: "B", text: "12:45 pm" },
        { label: "C", text: "1:15 pm" },
        { label: "D", text: "2:30 pm" },
      ],
      correctAnswer: "B",
      explanation:
        "The tank loses 240 L in 1.5 hours, so the rate is 160 L per hour. To fall from 900 L to 500 L is a 400 L drop, which takes 2.5 hours after 10:15 am: 12:45 pm.",
    },
    {
      id: "y11std-d5-network-deadline",
      unitSlug: "networks-and-paths",
      assessedUnitSlugs: ["working-with-time"],
      difficulty: 5,
      targetMisconception:
        "Chooses the path with the fewest edges instead of comparing complete path weights against the time deadline.",
      prompt:
        "Travel times are $A-B-D:9+8$ min, $A-C-D:6+12$ min, and $A-C-E-D:6+4+5$ min. Leaving $A$ at 9:05 am, which path arrives by 9:20 am?",
      choices: [
        { label: "A", text: "$A-B-D$ only" },
        { label: "B", text: "$A-C-D$ only" },
        { label: "C", text: "$A-C-E-D$ only" },
        { label: "D", text: "All three paths" },
      ],
      correctAnswer: "C",
      explanation:
        "The path times are 17 min, 18 min, and 15 min. Leaving at 9:05 am gives 15 minutes to arrive by 9:20 am, so only $A-C-E-D$ meets the deadline.",
    },
    {
      id: "y11std-d5-relative-frequency-forecast",
      unitSlug: "relative-frequency-and-probability",
      assessedUnitSlugs: ["data-analysis"],
      difficulty: 5,
      targetMisconception:
        "Treats a sample count as a percentage or fails to compare an observed result with the expected frequency.",
      prompt:
        "In 60 trial games, a player wins 18 times. Using this relative frequency, what is the expected number of wins in 250 games, and how does 90 actual wins compare?",
      choices: [
        {
          label: "A",
          text: "Expected 75 wins; 90 is 15 more than expected.",
        },
        {
          label: "B",
          text: "Expected 45 wins; 90 is 45 more than expected.",
        },
        {
          label: "C",
          text: "Expected 18 wins; 90 is 72 more than expected.",
        },
        {
          label: "D",
          text: "Expected 75 wins; 90 is 15 fewer than expected.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "The relative frequency is $18/60=0.3$. In 250 games, the expected wins are $0.3\\times250=75$. An actual 90 wins is 15 more than expected.",
    },
    {
      id: "y11std-d5-cylinder-rearrange",
      unitSlug: "formulae-equations",
      assessedUnitSlugs: ["applications-of-measurement"],
      difficulty: 5,
      targetMisconception:
        "Substitutes into a measurement formula but cannot rearrange it before interpreting the required dimension.",
      prompt:
        "A cylinder has volume $2.4\\text{ m}^3$ and height $1.5\\text{ m}$. Using $V=\\pi r^2h$, which radius is closest?",
      choices: [
        { label: "A", text: "$0.51\\text{ m}$" },
        { label: "B", text: "$0.71\\text{ m}$" },
        { label: "C", text: "$1.02\\text{ m}$" },
        { label: "D", text: "$1.60\\text{ m}$" },
      ],
      correctAnswer: "B",
      explanation:
        "Rearrange to $r=\\sqrt{V/(\\pi h)}$. Then $r=\\sqrt{2.4/(1.5\\pi)}\\approx\\sqrt{0.509}\\approx0.71\\text{ m}$.",
    },
    {
      id: "y11std-d5-measurement-spread",
      unitSlug: "data-analysis",
      assessedUnitSlugs: ["applications-of-measurement"],
      difficulty: 5,
      targetMisconception:
        "Chooses using the average error only and ignores variation when judging measurement consistency.",
      prompt:
        "Two devices measure error in millimetres. Device A errors are $-2,-1,0,1,2$. Device B errors are $-5,0,0,0,5$. Which device is more consistent?",
      choices: [
        {
          label: "A",
          text: "Device A, because both mean errors are 0 but A has smaller spread.",
        },
        {
          label: "B",
          text: "Device B, because it has more zero errors.",
        },
        {
          label: "C",
          text: "They are equally consistent because both mean errors are 0.",
        },
        {
          label: "D",
          text: "Device B, because its largest positive error is greater.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "Both devices have mean error 0. Device A ranges from -2 to 2, while Device B ranges from -5 to 5, so Device A has the smaller spread and is more consistent.",
    },
    {
      id: "y11std-d5-route-reliability",
      unitSlug: "relative-frequency-and-probability",
      assessedUnitSlugs: ["networks-and-paths"],
      difficulty: 5,
      targetMisconception:
        "Chooses the route with fewer links without comparing the combined probability of successful independent links.",
      prompt:
        "Route A uses two independent links, each with reliability $0.9$. Route B uses one link with reliability $0.8$. Which route is more reliable?",
      choices: [
        {
          label: "A",
          text: "Route A, because its reliability is $0.81$.",
        },
        {
          label: "B",
          text: "Route B, because it has fewer links.",
        },
        {
          label: "C",
          text: "Route A, because its reliability is $1.8$.",
        },
        {
          label: "D",
          text: "They are equally reliable because both reliabilities round to $0.8$.",
        },
      ],
      correctAnswer: "A",
      explanation:
        "For both independent links on Route A to work, multiply: $0.9\\times0.9=0.81$. Since $0.81>0.8$, Route A is more reliable.",
    },
    {
      id: "y11std-d5-converted-mean",
      unitSlug: "formulae-equations",
      assessedUnitSlugs: ["data-analysis"],
      difficulty: 5,
      targetMisconception:
        "Converts individual values or subtracts from the mean without applying the whole conversion formula to the mean.",
      prompt:
        "A set of temperatures has mean $68^\\circ\\text{F}$. Using $C=\\frac{5}{9}(F-32)$, what is the mean in degrees Celsius?",
      choices: [
        { label: "A", text: "$20^\\circ\\text{C}$" },
        { label: "B", text: "$36^\\circ\\text{C}$" },
        { label: "C", text: "$37.8^\\circ\\text{C}$" },
        { label: "D", text: "$52^\\circ\\text{C}$" },
      ],
      correctAnswer: "A",
      explanation:
        "Because the conversion is linear, convert the mean directly: $C=\\frac{5}{9}(68-32)=\\frac{5}{9}\\times36=20^\\circ\\text{C}$.",
    },
  ],
};
