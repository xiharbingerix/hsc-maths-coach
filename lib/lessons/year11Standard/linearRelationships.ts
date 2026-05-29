import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";
import { financeChoice, moneyAnswer, linearAnswer } from "../questionHelpers";
function linearRelationshipsWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "linear-relationships-graphs") {
    return [
      {
        title: "Interpreting a fare model",
        questionLatex:
          "\\text{A taxi fare is modelled by }C=4+2.20d\\text{, where }d\\text{ is distance in km.}",
        steps: [
          { explanation: "The constant term is the starting amount when distance is 0.", latex: "C=4\\text{ when }d=0" },
          { explanation: "The coefficient of d is the rate per kilometre.", latex: "2.20\\text{ dollars per km}" },
        ],
        finalAnswerLatex: "\\$4\\text{ fixed fee, }\\$2.20\\text{/km}",
      },
      {
        title: "Completing a table from a hire rule",
        questionLatex:
          "\\text{A hire company charges }C=35+12h\\text{ for }h\\text{ hours.}",
        steps: [
          { explanation: "Substitute h = 0, 1, 2 and 3.", latex: "35,\\ 47,\\ 59,\\ 71" },
          { explanation: "The cost increases by 12 dollars each hour, so the relationship is linear." },
        ],
        finalAnswerLatex: "\\begin{array}{c|c}h&0&1&2&3\\\\C&35&47&59&71\\end{array}",
      },
      {
        title: "Choosing a graph description",
        questionLatex:
          "\\text{A tank starts at }120\\text{ L and drains at }8\\text{ L/min.}",
        steps: [
          { explanation: "The starting amount is the vertical intercept." },
          { explanation: "Draining means the graph decreases with a negative gradient.", latex: "V=120-8t" },
        ],
        finalAnswerLatex: "\\text{Starts at }120\\text{ L and decreases by }8\\text{ L/min.}",
      },
    ];
  }

  if (slug === "direct-variation-practical-linear-models") {
    return [
      {
        title: "Cost per litre as direct variation",
        questionLatex:
          "\\text{Fuel costs }\\$1.80\\text{ per litre. Let }C\\text{ be cost and }L\\text{ be litres.}",
        steps: [
          { explanation: "There is no fixed fee, so cost is proportional to litres." },
          { explanation: "The constant of variation is the unit cost.", latex: "C=1.80L" },
        ],
        finalAnswerLatex: "C=1.80L",
      },
      {
        title: "Currency conversion",
        questionLatex:
          "\\text{A conversion gives }1\\text{ AUD}=0.65\\text{ USD.}",
        steps: [
          { explanation: "USD is directly proportional to AUD in this simplified model." },
          { explanation: "Multiply the number of Australian dollars by 0.65.", latex: "U=0.65A" },
        ],
        finalAnswerLatex: "U=0.65A",
      },
      {
        title: "Direct variation or fixed cost",
        questionLatex:
          "\\text{A scooter hire costs }\\$10\\text{ unlock fee plus }\\$4\\text{ per hour.}",
        steps: [
          { explanation: "A direct variation graph goes through the origin." },
          { explanation: "The 10 dollar fixed fee means the cost is not zero at 0 hours.", latex: "C=10+4h" },
        ],
        finalAnswerLatex: "\\text{Not direct variation.}",
      },
    ];
  }

  return [
    {
      title: `${title}: table to rule`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Hours}&0&1&2&3\\\\\\text{Cost}&35&47&59&71\\end{array}",
      steps: [
        { explanation: "The starting value is 35 dollars at 0 hours." },
        { explanation: "The cost increases by 12 dollars for each extra hour." },
      ],
      finalAnswerLatex: "C=35+12h",
    },
    {
      title: `${title}: graph feature in context`,
      questionLatex:
        "\\text{A water tank has }V=120-8t\\text{ litres after }t\\text{ minutes.}",
      steps: [
        { explanation: "The intercept 120 is the starting volume." },
        { explanation: "The gradient -8 is the draining rate in litres per minute." },
      ],
      finalAnswerLatex: "\\text{Starts at }120\\text{ L and drains at }8\\text{ L/min.}",
    },
  ];
}



export function year11StandardLinearRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "linear-relationships"
  ) {
    return null;
  }

  const base = {
    workedExamples: linearRelationshipsWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "linear-relationships-graphs") {
    return {
      ...base,
      description:
        "Interpret straight-line rules, tables and graphs using gradients, rates and starting values.",
      learningIntention:
        "Use linear rules, tables and graph features to model practical situations.",
      successCriteria: [
        "Identify the gradient as a practical rate of change.",
        "Identify the y-intercept as a starting value or fixed amount.",
        "Complete a table from a linear rule.",
        "Match graph features to practical contexts.",
      ],
      teaching: {
        paragraphs: [
          "A linear relationship has a constant rate of change. Its graph is a straight line.",
          "In a rule such as y = mx + b, m is the gradient and b is the y-intercept.",
          "In practical contexts, the gradient is often a rate such as dollars per hour or litres per minute.",
          "The y-intercept is the starting value when the input is 0, such as a fixed fee or initial amount.",
        ],
        latexBlocks: [
          "y=mx+b",
          "\\text{gradient}=\\frac{\\text{change in output}}{\\text{change in input}}",
        ],
      },
      guidedPractice: [
        financeChoice("linear-graph-g1", "A taxi fare is modelled by C = 4 + 2.20d. What does the 4 represent?", "B", ["Cost per kilometre", "Fixed starting fare", "Total distance", "Maximum fare"], "The constant term is the cost when d = 0."),
        moneyAnswer("linear-graph-g2", "A hire company charges C = 35 + 12h. What is the cost for 3 hours?", "C=35+12h,\\quad h=3", "71"),
        linearAnswer("linear-graph-g3", "A table shows hire costs: 0 h costs 35 dollars, 1 h costs 47 dollars, 2 h costs 59 dollars. What is the hourly rate?", "47-35", "12", ["$12", "12 dollars", "12 dollars per hour", "$12/h"]),
        financeChoice("linear-graph-g4", "A water tank model V = 120 - 8t has a graph that:", "C", ["Starts at 8 and increases", "Starts at 0 and increases", "Starts at 120 and decreases", "Has no starting value"], "The intercept is 120 and the gradient is negative."),
      ],
      independentPractice: [
        financeChoice("linear-graph-i1", "A phone plan is C = 20 + 5g, where g is gigabytes used. What does 5 represent?", "A", ["Cost per gigabyte", "Fixed monthly fee", "Total cost", "Number of months"], "The coefficient of g is the rate per gigabyte."),
        moneyAnswer("linear-graph-i2", "A bike hire costs 18 dollars plus 9 dollars per hour. What is the total cost for 4 hours?", "C=18+9h,\\quad h=4", "54"),
        linearAnswer("linear-graph-i3", "A savings balance is S = 60 + 25w. What is the starting balance?", "S=60\\text{ when }w=0", "60", ["$60", "60 dollars"]),
        linearAnswer("linear-graph-i4", "A tank starts at 200 L and drains at 10 L/min. Write a rule for volume V after t minutes.", "V=200-10t", "V = 200 - 10t", ["V=200-10t", "v=200-10t", "V=-10t+200", "v=-10t+200"]),
        financeChoice("linear-graph-i5", "A graph of cost against hours crosses the vertical axis at 35. In context, this is the:", "D", ["Hourly rate", "Travel time", "Gradient only", "Fixed starting cost"], "The vertical intercept is the starting cost."),
      ],
      commonMistakes: [
        { mistake: "In C = 35 + 12h, saying the gradient is 35 and the fixed fee is 12.", fix: "The coefficient of h is the gradient (rate of 12 dollars per hour); the constant 35 is the y-intercept (starting cost)." },
        { mistake: "Treating the fixed fee as the hourly rate.", fix: "The fixed fee is the cost when the input is zero; the gradient is what changes per additional unit." },
        { mistake: "Writing the gradient as 12 without a unit in a hire-cost model.", fix: "Include the unit: a gradient of 12 in this context means 12 dollars per hour." },
        { mistake: "Writing a rule for a draining tank with a positive gradient, such as V = 120 + 8t.", fix: "A decreasing quantity has a negative gradient: V = 120 - 8t." },
      ],
      masteryQuiz: [
        financeChoice("linear-graph-m1", "A taxi model C = 5 + 2d has gradient 2. In context, this is:", "A", ["2 dollars per km", "5 dollars per km", "2 km fixed fee", "Total fare always"], "The gradient is the cost per kilometre."),
        financeChoice("linear-graph-m2", "In C = 5 + 2d, the y-intercept means:", "C", ["Distance travelled", "Cost per km", "Fixed starting fare", "Maximum fare"], "The intercept is the cost when d = 0."),
        moneyAnswer("linear-graph-m3", "A hire cost is C = 40 + 15h. Find the cost for 2 hours.", "C=40+15h,\\quad h=2", "70"),
        linearAnswer("linear-graph-m4", "A table has costs 35, 47, 59, 71 for 0, 1, 2, 3 hours. What is the gradient?", "\\text{costs: }35,47,59,71\\text{ for }h=0,1,2,3", "12", ["$12", "12 dollars per hour", "$12/h"]),
        linearAnswer("linear-graph-m5", "A water tank starts with 120 L and drains at 8 L/min. Write the rule for volume V after t minutes.", "V_0=120\\text{ L},\\quad \\text{rate}=8\\text{ L/min}", "V = 120 - 8t", ["V=120-8t", "v=120-8t", "V=-8t+120", "v=-8t+120"]),
        financeChoice("linear-graph-m6", "A decreasing straight-line graph in a tank context most likely represents:", "B", ["A tank filling", "A tank draining", "A fixed fee", "A bar chart"], "A decreasing volume suggests draining."),
        moneyAnswer("linear-graph-m7", "A phone plan costs 25 dollars plus 4 dollars per extra GB. Find the cost for 6 extra GB.", "C=25+4g,\\quad g=6", "49"),
        linearAnswer("linear-graph-m8", "A savings model is S = 100 + 30w. What is the weekly increase?", "30", "30", ["$30", "30 dollars", "30 dollars per week", "$30/week"]),
        financeChoice("linear-graph-m9", "A graph crossing the vertical axis at 0 means the starting value is:", "D", ["The gradient", "The maximum", "Unknown always", "Zero"], "The vertical intercept is the starting value."),
        financeChoice("linear-graph-m10", "A practical linear model should usually be used:", "A", ["Within the context and sensible input range", "For all possible values forever", "Only at negative times", "Without checking units"], "Practical models have context limits."),
      ],
    };
  }

  if (lesson.slug === "direct-variation-practical-linear-models") {
    return {
      ...base,
      description:
        "Use direct variation, constants of variation and practical linear models with and without fixed costs.",
      learningIntention:
        "Recognise direct variation and distinguish it from linear models with fixed costs.",
      successCriteria: [
        "Identify direct variation as y = kx.",
        "Find a constant of variation from a practical context.",
        "Use direct variation rules for cost, fuel or conversion contexts.",
        "Recognise when a fixed cost means the model is not direct variation.",
      ],
      teaching: {
        paragraphs: [
          "Direct variation means one quantity is a constant multiple of another.",
          "A direct variation graph passes through the origin because if the input is 0, the output is also 0.",
          "The constant of variation k is the multiplier in y = kx. It may represent a unit cost, conversion rate or rate per item.",
          "A linear model with a fixed cost, such as C = 10 + 4h, is not direct variation because the graph does not pass through the origin.",
        ],
        latexBlocks: [
          "y=kx",
          "\\text{direct variation graph passes through }(0,0)",
        ],
      },
      guidedPractice: [
        linearAnswer("linear-direct-g1", "Fuel costs 1.80 dollars per litre. Write a direct variation rule for cost C in dollars for L litres.", "C=1.80L", "C = 1.80L", ["C=1.80L", "c=1.80L", "C=1.8L", "c=1.8L"]),
        moneyAnswer("linear-direct-g2", "Using C = 1.80L, find the cost of 20 L of fuel.", "1.80\\times 20", "36"),
        financeChoice("linear-direct-g3", "Which model is direct variation?", "B", ["C = 10 + 4h", "C = 4h", "C = 4h + 10", "C = 10"], "Direct variation has the form y = kx and passes through the origin."),
        financeChoice("linear-direct-g4", "A scooter hire has a 10 dollar unlock fee plus 4 dollars per hour. This is not direct variation because:", "C", ["It has hours", "It is linear", "It has a fixed fee", "It has a rate"], "The fixed fee means the graph does not pass through the origin."),
      ],
      independentPractice: [
        linearAnswer("linear-direct-i1", "A currency conversion uses 1 AUD = 0.65 USD. Write a rule for U USD from A Australian dollars.", "U=0.65A", "U = 0.65A", ["U=0.65A", "u=0.65a", "U=.65A", "u=.65a"]),
        linearAnswer("linear-direct-i2", "A recipe uses 250 g of pasta per person. Write a rule for grams G for p people.", "G=250p", "G = 250p", ["G=250p", "g=250p"]),
        financeChoice("linear-direct-i3", "A plan C = 20 + 5g is:", "D", ["Direct variation", "A graph through the origin", "A model with no fixed cost", "Linear but not direct variation"], "The fixed 20 means it is not direct variation."),
        moneyAnswer("linear-direct-i4", "A stall sells apples at 3 dollars per kg. What is the cost of 4 kg?", "3\\times 4", "12"),
        financeChoice("linear-direct-i5", "For the displayed direct variation rule, the value shown as k is the:", "A", ["Constant of variation", "Fixed fee", "x-intercept always", "Maximum value"], "k is the constant multiplier.", "y=kx"),
      ],
      commonMistakes: [
        { mistake: "Calling C = 10 + 4h direct variation because it contains multiplication.", fix: "Direct variation must pass through the origin; a fixed fee means the graph starts above zero." },
        { mistake: "In C = 10 + 4h, treating k as 10 and ignoring the fixed fee.", fix: "The constant of variation k is 4 (the rate per hour); the 10 is a fixed unlock fee that prevents direct variation." },
        { mistake: "Giving k without units in a practical model.", fix: "In C = 1.80L, k = 1.80 means 1.80 dollars per litre — the unit belongs with k." },
        { mistake: "Using a fuel cost model to predict cost for a negative number of litres.", fix: "Only use a direct variation rule for input values that make practical sense in the context." },
      ],
      masteryQuiz: [
        financeChoice("linear-direct-m1", "A graph of direct variation must pass through:", "A", ["The origin", "The point (0, 5)", "The highest point", "The x-axis at 10 only"], "Direct variation has y = 0 when x = 0."),
        linearAnswer("linear-direct-m2", "Printing costs 12 cents per page. Write a direct variation rule for cost C in cents for p pages.", "C=12p", "C = 12p", ["C=12p", "c=12p"]),
        moneyAnswer("linear-direct-m3", "A drink costs 2.50 dollars per bottle. What is the cost of 8 bottles?", "\\text{price}=2.50\\text{ per bottle},\\quad n=8", "20"),
        financeChoice("linear-direct-m4", "Which relationship is not direct variation?", "C", ["C = 3n", "D = 80t", "C = 15 + 2n", "M = 100b"], "C = 15 + 2n has a fixed cost."),
        linearAnswer("linear-direct-m5", "A conversion uses 1 km = 0.621 miles. Write a rule for miles M from kilometres k.", "M=0.621k", "M = 0.621k", ["M=0.621k", "m=0.621k"]),
        financeChoice("linear-direct-m6", "A taxi fare with a flagfall fee is usually:", "D", ["Direct variation", "A graph through the origin", "No fixed cost", "Linear with an intercept"], "A flagfall is a fixed starting cost."),
        moneyAnswer("linear-direct-m7", "A car uses fuel at 9 L per 100 km. In a simplified direct model, how many litres for 300 km?", "\\text{rate}=9\\text{ L per }100\\text{ km},\\quad d=300\\text{ km}", "27"),
        linearAnswer("linear-direct-m8", "A direct variation relationship is shown. Find the constant of variation.", "y=kx,\\quad y=24\\text{ when }x=6", "4", ["k=4"]),
        financeChoice("linear-direct-m9", "The model S = 50w for savings after w weeks means:", "B", ["50 dollars fixed fee", "50 dollars saved each week", "50 weeks", "50 dollars subtracted"], "The multiplier is the weekly saving rate."),
        financeChoice("linear-direct-m10", "A limitation of a fuel cost model is that:", "A", ["Prices can change over time", "Costs can never be estimated", "Litres are not measurable", "Direct variation has no context"], "Fuel prices may change, so the model may stop being accurate."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed linear relationship questions using tables, rules, graph features, direct variation and practical limitations.",
    learningIntention:
      "Apply linear relationship skills to practical exam-style contexts.",
    successCriteria: [
      "Find a linear rule from a practical table.",
      "Interpret gradient and y-intercept in context.",
      "Recognise direct variation and fixed-cost models.",
      "Choose reasonable conclusions about practical linear models.",
    ],
    teaching: {
      paragraphs: [
        "Exam-style linear relationship questions often use tables, rules, graphs and practical contexts.",
        "Look for the starting value and the constant change. These become the intercept and gradient in a linear rule.",
        "A direct variation model has no fixed starting amount and passes through the origin.",
        "Practical models have limitations. Do not assume the rule works forever or outside the context given.",
      ],
      latexBlocks: [
        "y=mx+b",
        "y=kx\\quad\\text{for direct variation}",
      ],
    },
    guidedPractice: [
      linearAnswer("linear-exam-g1", "A hire table shows 0 hours costs 35 dollars, 1 hour costs 47 dollars, and 2 hours costs 59 dollars. What is the hourly increase?", "47-35", "12", ["$12", "12 dollars", "$12/h", "12 dollars per hour"]),
      linearAnswer("linear-exam-g2", "Using the hire table with starting cost 35 dollars and hourly increase 12 dollars, write a rule for cost C after h hours.", "C=35+12h", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35", "c=12h+35"]),
      financeChoice("linear-exam-g3", "In C = 35 + 12h, the 35 represents:", "A", ["Fixed starting cost", "Hourly rate", "Number of hours", "Maximum cost"], "The intercept is the fixed cost."),
      financeChoice("linear-exam-g4", "A cost model C = 5n is direct variation because:", "B", ["It has a fixed fee", "It passes through the origin", "It has no rate", "It is not linear"], "C = 5n has no fixed starting amount."),
    ],
    independentPractice: [
      moneyAnswer("linear-exam-i1", "A taxi charges 6 dollars plus 2 dollars per kilometre. What is the fare for 9 km?", "6+2\\times 9", "24"),
      linearAnswer("linear-exam-i2", "A water tank starts at 150 L and drains at 5 L/min. Write a rule for volume V after t minutes.", "V=150-5t", "V = 150 - 5t", ["V=150-5t", "v=150-5t", "V=-5t+150", "v=-5t+150"]),
      financeChoice("linear-exam-i3", "In V = 150 - 5t, the gradient -5 means:", "C", ["The tank starts with 5 L", "The tank fills by 150 L/min", "The tank drains by 5 L/min", "The cost is 5 dollars"], "A negative gradient means volume decreases by 5 L each minute."),
      financeChoice("linear-exam-i4", "Which model is direct variation?", "D", ["C = 20 + 4x", "V = 100 - 2t", "C = 50", "C = 1.5L"], "C = 1.5L has the form y = kx."),
      financeChoice("linear-exam-i5", "A practical model should not be extrapolated too far because:", "A", ["The context may stop being realistic", "The rule is always wrong", "Units do not matter", "Graphs cannot be interpreted"], "Models have sensible domains in context."),
    ],
    commonMistakes: [
      { mistake: "In a hire table with costs 35, 47, 59, 71 for hours 0, 1, 2, 3, using 35 as the gradient instead of 12.", fix: "The gradient is the output change per one input step: 47 - 35 = 12, not the starting value 35." },
      { mistake: "Writing C = 12h for a hire that costs 35 dollars at zero hours.", fix: "The starting cost is the y-intercept: the correct rule is C = 35 + 12h." },
      { mistake: "Writing V = 120 + 8t for a tank that drains at 8 L/min.", fix: "A draining quantity decreases, so the gradient is negative: V = 120 - 8t." },
      { mistake: "Applying a fuel cost model for a negative or impossible number of litres.", fix: "Use a practical model only for input values that make sense in the context it describes." },
    ],
    masteryQuiz: [
      linearAnswer("linear-exam-m1", "A hire table has costs 35, 47, 59, 71 dollars for 0, 1, 2, 3 hours. Find the gradient.", "\\text{costs: }35,47,59,71\\text{ for }h=0,1,2,3", "12", ["$12", "12 dollars", "$12/h", "12 dollars per hour"]),
      linearAnswer("linear-exam-m2", "For that hire table, write a rule for cost C after h hours.", "\\text{costs: }35,47,59,71\\text{ for }h=0,1,2,3", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35", "c=12h+35"]),
      moneyAnswer("linear-exam-m3", "Using C = 35 + 12h, find the cost for 5 hours.", "C=35+12h,\\quad h=5", "95"),
      financeChoice("linear-exam-m4", "The y-intercept in a hire-cost graph represents:", "B", ["Hourly rate", "Fixed starting cost", "Total hours", "Distance"], "The y-intercept is the cost at 0 hours."),
      financeChoice("linear-exam-m5", "A water tank graph with negative gradient represents:", "C", ["Constant temperature", "A fixed fee", "Draining or decreasing volume", "Direct variation only"], "Negative gradient means decreasing output."),
      linearAnswer("linear-exam-m6", "Fuel costs 1.75 dollars per litre. Write a direct variation rule for cost C for L litres.", "\\text{price}=1.75\\text{ per litre}", "C = 1.75L", ["C=1.75L", "c=1.75L"]),
      moneyAnswer("linear-exam-m7", "Using C = 1.75L, find the cost of 12 L of fuel.", "C=1.75L,\\quad L=12", "21"),
      financeChoice("linear-exam-m8", "Which statement is true?", "A", ["Direct variation has no fixed fee", "All linear models are direct variation", "Intercept is always the rate", "Gradient is always positive"], "Direct variation has the form y = kx."),
      financeChoice("linear-exam-m9", "A model C = 12 + 3n should be described as:", "D", ["Direct variation", "Non-linear only", "A graph through origin", "Linear with a fixed cost"], "The 12 is a fixed starting cost."),
      financeChoice("linear-exam-m10", "A reasonable conclusion from a phone plan model should:", "C", ["Ignore units", "Use negative data amounts", "Stay within the plan context", "Assume infinite usage is valid"], "Practical conclusions should stay within context."),
    ],
  };
}

