import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import {
  financeChoice,
  linearAnswer as baseLinearAnswer,
  moneyAnswer as baseMoneyAnswer,
} from "../questionHelpers";

function linearRelationshipsFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (
    context.includes("gradient") ||
    context.includes("hourly increase") ||
    context.includes("weekly increase") ||
    context.includes("rate")
  ) {
    return `The gradient is the constant change in the output for each 1-unit increase in the input. Compare two matching table values or read the coefficient of the input to get ${answer}.`;
  }

  if (
    context.includes("starting") ||
    context.includes("intercept") ||
    context.includes("fixed") ||
    context.includes("when }w=0") ||
    context.includes("when }d=0")
  ) {
    return `The starting value is the output when the input is 0, so it appears as the constant term in the rule. Do not confuse it with the rate of change; here it is ${answer}.`;
  }

  if (
    context.includes("write a rule") ||
    context.includes("write a direct variation rule") ||
    context.includes("model") ||
    context.includes("rule for")
  ) {
    if (
      context.includes("drains") ||
      context.includes("decreases") ||
      context.includes("negative") ||
      context.includes("tank")
    ) {
      return `A draining or decreasing situation needs a negative gradient because the output goes down as the input increases. Start with the initial amount, then subtract the rate each time to get ${answer}.`;
    }

    if (
      context.includes("direct variation") ||
      context.includes("per litre") ||
      context.includes("per page") ||
      context.includes("per person") ||
      context.includes("conversion")
    ) {
      return `Direct variation has no starting fee or fixed amount, so the rule is just multiplier times input. Use the unit rate as the multiplier to get ${answer}.`;
    }

    return `A linear rule is starting value plus rate times input. Use the intercept for the fixed part and the gradient for the repeated change to get ${answer}.`;
  }

  if (
    context.includes("cost for") ||
    context.includes("fare for") ||
    context.includes("cost of") ||
    context.includes("using c =") ||
    context.includes("charges")
  ) {
    if (context.includes("+")) {
      return `For a linear cost model, add the fixed starting amount after calculating the variable part. That keeps the intercept and the rate separate, giving ${answer}.`;
    }

    return `This cost comes from a rate multiplied by the amount used. Multiply the unit cost by the input quantity to get ${answer}.`;
  }

  if (
    context.includes("direct variation") ||
    context.includes("y=kx") ||
    context.includes("constant of variation")
  ) {
    return `Direct variation means the graph passes through the origin and every output is the same multiplier times the input. Find that multiplier from y divided by x to get ${answer}.`;
  }

  if (
    context.includes("table") ||
    context.includes("costs:") ||
    context.includes("0, 1, 2, 3")
  ) {
    return `A linear table changes by the same amount each step. Use the first value as the starting amount and the repeated difference as the gradient to get ${answer}.`;
  }

  if (
    context.includes("tank") ||
    context.includes("drains") ||
    context.includes("volume")
  ) {
    return `In a tank model, the intercept is the starting volume and the gradient is the fill or drain rate. A negative rate means the volume is decreasing, so the result is ${answer}.`;
  }

  return `Look for the starting value and the constant rate of change. Those two pieces build or interpret the linear relationship, giving ${answer}.`;
}

function linearAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseLinearAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: linearRelationshipsFeedback(prompt, latex, answer),
  };
}

function moneyAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseMoneyAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: linearRelationshipsFeedback(prompt, latex, answer),
  };
}
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

  if (slug === "constructing-linear-models") {
    return [
      {
        title: "Building a rule from two points",
        questionLatex: "\\text{A cost table has points }(2,\\ 34)\\text{ and }(6,\\ 66).\\text{ Find the rule.}",
        steps: [
          { explanation: "Calculate the gradient using the two points.", latex: "m = \\frac{66 - 34}{6 - 2} = \\frac{32}{4} = 8" },
          { explanation: "Substitute one point into C = 8x + b to find b.", latex: "34 = 8(2) + b \\Rightarrow b = 18" },
          { explanation: "Write the rule and verify with the second point.", latex: "C = 18 + 8x \\quad \\checkmark\\ C(6) = 18 + 48 = 66" },
        ],
        finalAnswerLatex: "C = 18 + 8x",
      },
      {
        title: "Building a rule from a table",
        questionLatex: "\\begin{array}{c|c}x & 0 & 1 & 2 & 3 \\\\ C & 25 & 38 & 51 & 64\\end{array}",
        steps: [
          { explanation: "The cost at x = 0 is the y-intercept.", latex: "b = 25" },
          { explanation: "The repeated difference gives the gradient.", latex: "m = 38 - 25 = 13" },
          { explanation: "Write the rule.", latex: "C = 25 + 13x" },
        ],
        finalAnswerLatex: "C = 25 + 13x",
      },
      {
        title: "Building a rule from a word description",
        questionLatex: "\\text{A plumber charges a }\\$80\\text{ callout fee plus }\\$60\\text{ per hour.}",
        steps: [
          { explanation: "The callout fee is the starting value — it is charged regardless of hours.", latex: "b = 80" },
          { explanation: "The hourly charge is the gradient — it repeats for each extra hour.", latex: "m = 60" },
          { explanation: "Write the rule for cost C after h hours.", latex: "C = 80 + 60h" },
        ],
        finalAnswerLatex: "C = 80 + 60h",
      },
    ];
  }

  if (slug === "piecewise-step-functions") {
    return [
      {
        title: "Electricity tariff with two rates",
        questionLatex: "\\text{First 200 kWh at }\\$0.20\\text{/kWh, remainder at }\\$0.30\\text{/kWh.}\\text{ Find cost for 320 kWh.}",
        steps: [
          { explanation: "The first 200 kWh use the lower rate.", latex: "200 \\times 0.20 = 40" },
          { explanation: "The remaining 120 kWh use the higher rate.", latex: "120 \\times 0.30 = 36" },
          { explanation: "Add the two parts.", latex: "40 + 36 = 76" },
        ],
        finalAnswerLatex: "\\$76",
      },
      {
        title: "Step postage rates",
        questionLatex: "\\text{Up to 100 g: }\\$2.50.\\quad 101\\text{–}250\\text{ g: }\\$4.50.\\quad \\text{Find cost for 180 g.}",
        steps: [
          { explanation: "180 g falls in the 101–250 g range.", latex: "180 \\in [101,\\ 250]" },
          { explanation: "Apply the flat rate for that range.", latex: "\\text{Cost} = \\$4.50" },
        ],
        finalAnswerLatex: "\\$4.50",
      },
      {
        title: "Parking fee: first hour free",
        questionLatex: "\\text{First 1 hour free, then }\\$5\\text{ per hour. Find fee for 4 hours.}",
        steps: [
          { explanation: "The first hour costs nothing.", latex: "\\text{hours at }\\$0: 1" },
          { explanation: "The remaining 3 hours cost $5 each.", latex: "3 \\times 5 = 15" },
        ],
        finalAnswerLatex: "\\$15",
      },
    ];
  }

  if (slug === "break-even-analysis") {
    return [
      {
        title: "Finding the break-even quantity",
        questionLatex: "\\text{Sell at }\\$5\\text{ each. Fixed costs }\\$60,\\text{ variable cost }\\$2\\text{ per item.}",
        steps: [
          { explanation: "Write the revenue rule: price times quantity.", latex: "R = 5n" },
          { explanation: "Write the cost rule: fixed cost plus variable cost times quantity.", latex: "C = 60 + 2n" },
          { explanation: "Set revenue equal to cost and solve.", latex: "5n = 60 + 2n \\Rightarrow 3n = 60 \\Rightarrow n = 20" },
          { explanation: "Find the break-even revenue or cost.", latex: "R = 5(20) = \\$100" },
        ],
        finalAnswerLatex: "n = 20\\text{ items},\\quad \\text{break-even revenue }\\$100",
      },
      {
        title: "Interpreting profit at a given quantity",
        questionLatex: "\\text{Using }R = 5n\\text{ and }C = 60 + 2n.\\text{ Find profit when }n = 25.",
        steps: [
          { explanation: "Calculate revenue at n = 25.", latex: "R = 5(25) = 125" },
          { explanation: "Calculate cost at n = 25.", latex: "C = 60 + 2(25) = 110" },
          { explanation: "Profit equals revenue minus cost.", latex: "\\text{Profit} = 125 - 110 = \\$15" },
        ],
        finalAnswerLatex: "\\$15\\text{ profit}",
      },
    ];
  }

  if (slug === "practical-limitations-linear-models") {
    return [
      {
        title: "Finding when a tank model becomes invalid",
        questionLatex: "\\text{Tank model: }V = 200 - 10t.\\text{ When does the model stop being valid?}",
        steps: [
          { explanation: "The tank is empty when V = 0 — it cannot drain further.", latex: "200 - 10t = 0 \\Rightarrow t = 20" },
          { explanation: "For t > 20, the formula gives V < 0, which is impossible.", latex: "\\text{Valid domain: } 0 \\leq t \\leq 20" },
        ],
        finalAnswerLatex: "\\text{Valid for }0 \\leq t \\leq 20\\text{ min}",
      },
      {
        title: "Explaining extrapolation risk",
        questionLatex: "\\text{A savings model }S = 50 + 30w\\text{ is built from 6 weeks of data. A student uses it to predict }S\\text{ after 3 years (156 weeks).}",
        steps: [
          { explanation: "The model predicts S = 50 + 30(156) = $4730, but this is extrapolation — using the model far beyond its data range.", latex: "S = 50 + 30(156) = 4730" },
          { explanation: "Over 3 years, the weekly savings amount may change: income may rise or fall, expenses change, or the person may stop saving at the same rate.", latex: "\\text{Extrapolation warning: constant rate may not hold for 3 years.}" },
        ],
        finalAnswerLatex: "\\text{Unreliable extrapolation — savings rate may not stay constant for 3 years.}",
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
          "A linear relationship changes by the same amount for every one-unit step in the input — a constant rate of change — which is what makes its graph a straight line.",
          "In a rule such as y = mx + b you start at b and add the gradient m for each one-unit step in x: m is the gradient (the rate of change) and b is the y-intercept (the starting value).",
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
          "Direct variation means two quantities scale together — double one and the other doubles — because one is always a constant multiple of the other (the ratio y ÷ x stays the same).",
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

  if (lesson.slug === "constructing-linear-models") {
    return {
      ...base,
      description:
        "Write a linear rule from a word description, two given points or a table of values, and verify by substituting back.",
      learningIntention:
        "Construct a linear rule in the form C = b + mx from practical information.",
      successCriteria: [
        "Identify the starting value (y-intercept) and rate of change (gradient) from a word description.",
        "Calculate the gradient from two given points using the rise-over-run formula.",
        "Read the gradient and intercept from a table of values.",
        "Verify a constructed rule by substituting a known input.",
      ],
      teaching: {
        paragraphs: [
          "Every linear rule in the form C = b + mx has two key parts: b is the starting value (what C equals when input is zero) and m is the gradient (how much C increases for each extra unit of input).",
          "When building from a word description, find the starting value first: it is the fixed amount that applies even at zero input, like a callout fee or joining fee. The gradient is the repeated charge per unit, such as dollars per hour.",
          "When given two points, calculate the gradient first: m = (y₂ − y₁) ÷ (x₂ − x₁). Then substitute one point into C = mx + b to find b.",
          "When given a table, check the output at x = 0 for the intercept, and find the consistent difference between successive outputs for the gradient. Always verify by checking another point in the table.",
        ],
        latexBlocks: [
          "C = b + mx \\quad (b = \\text{starting value},\\ m = \\text{gradient})",
          "m = \\frac{y_2 - y_1}{x_2 - x_1}",
          "\\text{Verify: substitute known } x \\text{ and check } C \\text{ matches.}",
        ],
      },
      guidedPractice: [
        financeChoice(
          "linear-constr-g1",
          "A tradesman charges a $80 callout fee plus $60 per hour. In the rule C = 80 + 60h, the gradient is:",
          "B",
          ["80", "60", "140", "20"],
          "The gradient is the rate per hour: $60/h. The $80 is the fixed starting cost.",
        ),
        linearAnswer("linear-constr-g2", "A tradesman charges a $80 callout fee plus $60 per hour. Write a rule for cost C after h hours.", "C = 80 + 60h", "C = 80 + 60h", ["C=80+60h", "c=80+60h", "C=60h+80", "c=60h+80"]),
        linearAnswer("linear-constr-g3", "Two points on a linear graph are (0, 40) and (5, 90). Find the gradient.", "m = \\frac{90-40}{5-0}", "10", ["m=10", "gradient = 10", "10 per unit"]),
        linearAnswer("linear-constr-g4", "Using gradient 10 and y-intercept 40, write the linear rule for C in terms of x.", "m=10,\\quad b=40", "C = 40 + 10x", ["C=40+10x", "C=10x+40", "c=40+10x", "c=10x+40"]),
      ],
      independentPractice: [
        linearAnswer("linear-constr-i1", "A table shows x = 0, 1, 2, 3 with y = 15, 23, 31, 39. What is the gradient?", "23-15", "8", ["m=8", "gradient = 8", "8 per unit", "$8"]),
        linearAnswer("linear-constr-i2", "Using that table (starting at 15, gradient 8), write the rule for y in terms of x.", "b=15,\\quad m=8", "y = 15 + 8x", ["y=15+8x", "y=8x+15", "C=15+8x", "C=8x+15"]),
        linearAnswer("linear-constr-i3", "Two points are (2, 30) and (5, 51). Find the gradient.", "m = \\frac{51-30}{5-2}", "7", ["m=7", "gradient = 7", "7 per unit"]),
        moneyAnswer("linear-constr-i4", "A gym membership costs a $25 joining fee plus $12 per month. Find the total cost after 6 months.", "C=25+12\\times 6", "97"),
        financeChoice(
          "linear-constr-i5",
          "Which pair of points gives a gradient of 3?",
          "A",
          ["(0, 5) and (2, 11)", "(1, 4) and (3, 9)", "(0, 1) and (5, 11)", "(2, 6) and (4, 10)"],
          "(11 − 5) ÷ (2 − 0) = 6 ÷ 2 = 3.",
        ),
      ],
      commonMistakes: [
        { mistake: "In C = 80 + 60h, calling 80 the gradient and 60 the starting cost.", fix: "The gradient is the coefficient of the input variable (60 per hour); the constant 80 is the fixed starting cost." },
        { mistake: "When finding gradient from two points, subtracting x values but not dividing: getting 32 instead of 8.", fix: "Gradient = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁). Always divide the change in output by the change in input." },
        { mistake: "Reading gradient from the table as the y-value at x = 1, not the difference.", fix: "If the value at x = 0 is 25 and at x = 1 is 38, the gradient is 38 − 25 = 13, not 38." },
        { mistake: "Not verifying the rule by substituting a second known point.", fix: "After finding the rule, substitute a second point from the table or problem to confirm the rule is correct." },
      ],
      masteryQuiz: [
        moneyAnswer("linear-constr-m1", "A taxi charges $4 plus $2.50 per km. Find the total cost for 6 km.", "4+2.50\\times 6", "19"),
        financeChoice(
          "linear-constr-m2",
          "Two points (0, 20) and (3, 35) give gradient:",
          "A",
          ["5", "10", "15", "20"],
          "(35 − 20) ÷ (3 − 0) = 15 ÷ 3 = 5.",
        ),
        linearAnswer("linear-constr-m3", "Using gradient 5 and intercept 20, write the rule for C in terms of n.", "m=5,\\quad b=20", "C = 20 + 5n", ["C=20+5n", "C=5n+20", "c=20+5n"]),
        linearAnswer("linear-constr-m4", "A table has x = 0, 2, 4, 6 with y = 10, 18, 26, 34. Find the gradient.", "m = \\frac{18-10}{2-0}", "4", ["m=4", "gradient = 4", "4 per 2 units → 4/unit → 4"]),
        linearAnswer("linear-constr-m5", "Using gradient 4 and intercept 10, write the rule for y in terms of x.", "m=4,\\quad b=10", "y = 10 + 4x", ["y=10+4x", "y=4x+10", "C=10+4x"]),
        moneyAnswer("linear-constr-m6", "Use y = 10 + 4x to find y when x = 7.", "y=10+4\\times 7", "38"),
        financeChoice(
          "linear-constr-m7",
          "A tradesman charges a $60 callout fee and $75 per hour. The y-intercept in the cost rule is:",
          "B",
          ["75", "60", "135", "0"],
          "The y-intercept is the fixed cost at zero hours: $60.",
        ),
        moneyAnswer("linear-constr-m8", "Tickets cost $15 each with a $5 booking fee. Find the total cost for 8 tickets.", "5+15\\times 8", "125"),
        linearAnswer("linear-constr-m9", "A pool starts empty and fills at 40 L/min. After how many minutes does it hold 2000 L?", "40t = 2000", "50", ["t=50", "50 minutes", "50 min"]),
        linearAnswer("linear-constr-m10", "A hire cost line passes through (1, 45) and (4, 87). Find the hourly rate (gradient).", "m = \\frac{87-45}{4-1}", "14", ["m=14", "gradient = 14", "$14 per hour", "14 per hour"]),
      ],
    };
  }

  if (lesson.slug === "piecewise-step-functions") {
    return {
      ...base,
      description:
        "Identify and evaluate piecewise and step models with different rates for different input ranges, such as tariffs and parking fees.",
      learningIntention:
        "Calculate costs from piecewise and step function models by identifying the correct rule for a given input.",
      successCriteria: [
        "Identify which range an input falls into for a piecewise model.",
        "Apply the correct rate to each portion of usage in a two-rate tariff.",
        "Read a step function to find the flat rate that applies for a given input.",
        "Explain how a piecewise model differs from a single linear model.",
      ],
      teaching: {
        paragraphs: [
          "Some practical situations have different rates for different ranges of input. Electricity tariffs, parking fees, postage rates and mobile data plans often work this way. These are called piecewise or step functions.",
          "A piecewise function uses one rule for inputs in one range and a different rule for inputs in another range. To find the output, first check which range the input falls into, then apply the correct rule.",
          "A step function is a special case where the output stays constant across a range and then jumps to a new flat value. Postage pricing is a good example — a letter weighing 180 g costs the same as one weighing 120 g if both fall in the same weight band.",
          "To calculate the cost under a two-rate tariff (like electricity), split the total usage at the boundary. Charge the lower rate for the first portion and the higher rate for the rest, then add.",
        ],
        latexBlocks: [
          "\\text{Cost} = r_1 \\times q_1 + r_2 \\times q_2",
          "\\text{where } q_1 + q_2 = \\text{total quantity and } r_1 \\neq r_2",
        ],
      },
      guidedPractice: [
        financeChoice(
          "linear-piece-g1",
          "A tariff charges $0.20/kWh for the first 200 kWh and $0.30/kWh after. A customer uses 150 kWh. Which rate applies?",
          "A",
          ["$0.20/kWh", "$0.30/kWh", "Both rates equally", "$0.25/kWh (average)"],
          "150 ≤ 200, so the first-tier rate of $0.20/kWh applies to all 150 kWh.",
        ),
        moneyAnswer("linear-piece-g2", "Using $0.20/kWh for the first 200 kWh, find the electricity cost for 150 kWh.", "0.20 \\times 150", "30"),
        moneyAnswer("linear-piece-g3", "A customer uses 280 kWh. The first 200 kWh cost $0.20 each; the remaining 80 kWh cost $0.30 each. Find the total cost.", "200 \\times 0.20 + 80 \\times 0.30", "64"),
        financeChoice(
          "linear-piece-g4",
          "Which of these best describes a step function?",
          "A",
          ["Output stays constant across a range, then jumps to a new flat value", "Output increases by the same amount for every extra unit of input", "Output passes through the origin in all cases", "There is only one possible output for all inputs"],
          "A step function has constant output over each range, then jumps — like postage rates by weight band.",
        ),
      ],
      independentPractice: [
        moneyAnswer("linear-piece-i1", "A parking fee is $0 for the first 2 hours, then $4 per hour after. Find the fee for 5 hours.", "3 \\times 4", "12"),
        moneyAnswer("linear-piece-i2", "Postage: up to 100 g costs $2.00, and 101–250 g costs $4.00. Find the postage for a 180 g parcel.", "\\text{180 g} \\in [101,250]", "4"),
        moneyAnswer("linear-piece-i3", "An electricity tariff: first 300 kWh at $0.18/kWh, remainder at $0.28/kWh. Find the cost for 450 kWh.", "300 \\times 0.18 + 150 \\times 0.28", "96"),
        moneyAnswer("linear-piece-i4", "A phone tariff: first 100 min at $0.05/min, then 101–500 min at $0.03/min. Find the cost for 350 min.", "100 \\times 0.05 + 250 \\times 0.03", "12.5", ["12.50", "$12.50", "$12.5"]),
        financeChoice(
          "linear-piece-i5",
          "A piecewise model uses one rule for x ≤ 10 and another for x > 10. For x = 10, which rule applies?",
          "B",
          ["The rule for x > 10", "The rule for x ≤ 10", "Neither rule", "The average of both rules"],
          "x = 10 satisfies x ≤ 10, so the first rule applies.",
        ),
      ],
      commonMistakes: [
        { mistake: "Applying the higher rate to all usage when only part of the usage exceeds the threshold.", fix: "Split usage at the threshold: charge the lower rate for the first portion and the higher rate only for the remainder." },
        { mistake: "In a step function (like postage), calculating a rate per gram instead of using the flat fee for the weight band.", fix: "A step function has one flat fee per weight band — look up which band the weight falls into and apply that fee." },
        { mistake: "Adding the two rates instead of multiplying each rate by its portion.", fix: "The formula is Cost = r₁ × q₁ + r₂ × q₂. Multiply each rate by the number of units in its portion, then add the two amounts." },
        { mistake: "Forgetting to subtract the lower-tier amount when finding the remaining usage.", fix: "If total usage is 280 kWh and the lower tier covers 200 kWh, the remainder is 280 − 200 = 80 kWh at the higher rate." },
      ],
      masteryQuiz: [
        financeChoice(
          "linear-piece-m1",
          "A tariff charges $0.22/kWh for the first 250 kWh and $0.32/kWh after. Which expression gives the cost for 300 kWh?",
          "C",
          ["300 × 0.22", "300 × 0.32", "250 × 0.22 + 50 × 0.32", "50 × 0.22 + 250 × 0.32"],
          "Split at 250: 250 kWh at $0.22 plus 50 kWh at $0.32.",
        ),
        moneyAnswer("linear-piece-m2", "Using the tariff from the previous question, find the cost for 300 kWh.", "250 \\times 0.22 + 50 \\times 0.32", "71"),
        moneyAnswer("linear-piece-m3", "A gym: $5 per visit for the first 10 visits, $3 per visit after. Find the cost for 15 visits.", "10 \\times 5 + 5 \\times 3", "65"),
        moneyAnswer("linear-piece-m4", "Postage: up to 250 g = $3.50, 251–500 g = $6.00. Find the cost for a 400 g parcel.", "\\text{400 g} \\in [251,500]", "6"),
        financeChoice(
          "linear-piece-m5",
          "Parking is free for the first 2 hours, then $4 per hour. The cost for exactly 2 hours is:",
          "C",
          ["$4", "$8", "$0", "$2"],
          "2 hours falls within the free period — no charge.",
        ),
        moneyAnswer("linear-piece-m6", "Using the same parking fee (free for first 2 hours, $4 per hour after), find the fee for 7 hours.", "(7-2) \\times 4", "20"),
        moneyAnswer("linear-piece-m7", "Electricity tariff: first 200 kWh at $0.15/kWh, rest at $0.25/kWh. Find cost for 350 kWh.", "200 \\times 0.15 + 150 \\times 0.25", "67.5", ["67.50", "$67.50", "$67.5"]),
        moneyAnswer("linear-piece-m8", "Water rate: first 200 kL per quarter at $1.20/kL, remainder at $2.40/kL. A household uses 280 kL. Find the bill.", "200 \\times 1.20 + 80 \\times 2.40", "432"),
        financeChoice(
          "linear-piece-m9",
          "A piecewise model differs from a single linear model because:",
          "C",
          ["It always passes through the origin", "It has one constant gradient everywhere", "It uses different rules for different input ranges", "It can only apply to electricity"],
          "A piecewise model applies different rules across different portions of the domain.",
        ),
        moneyAnswer("linear-piece-m10", "A data tariff: first 10 GB included free, then $2 per GB extra. Find the cost for 14 GB.", "(14-10) \\times 2", "8"),
      ],
    };
  }

  if (lesson.slug === "break-even-analysis") {
    return {
      ...base,
      description:
        "Find the break-even quantity by setting revenue equal to cost and interpret profit and loss regions in practical contexts.",
      learningIntention:
        "Calculate and interpret the break-even point using simultaneous linear equations for revenue and cost.",
      successCriteria: [
        "Write a revenue rule and a cost rule as linear functions of quantity sold.",
        "Find the break-even quantity by setting revenue equal to cost.",
        "Calculate the break-even revenue by substituting the break-even quantity back.",
        "Determine whether a given quantity produces a profit or a loss.",
      ],
      teaching: {
        paragraphs: [
          "Break-even is the quantity at which total revenue exactly equals total cost — no profit and no loss. Below break-even the seller makes a loss; above it the seller makes a profit.",
          "Revenue is the total money received from sales: Revenue = selling price × quantity. Cost is the total money spent: Cost = fixed costs + variable cost per item × quantity.",
          "To find the break-even quantity, set Revenue = Cost and solve. This is a simultaneous equation problem — the same approach used when two practical models intersect.",
          "After finding the break-even quantity, substitute back into either rule to find the break-even dollar amount. For a profit/loss question, calculate Revenue − Cost: positive means profit, negative means loss.",
        ],
        latexBlocks: [
          "R = p \\cdot n \\quad (\\text{selling price} \\times \\text{quantity})",
          "C = F + v \\cdot n \\quad (\\text{fixed cost} + \\text{variable cost per item} \\times \\text{quantity})",
          "\\text{Break-even: } R = C \\Rightarrow p \\cdot n = F + v \\cdot n",
        ],
      },
      guidedPractice: [
        financeChoice(
          "linear-beven-g1",
          "A stall sells items at $5 each. Revenue for n items sold is:",
          "B",
          ["60 + 2n", "5n", "5 + n", "2n"],
          "Revenue = selling price × quantity = 5n.",
        ),
        linearAnswer("linear-beven-g2", "A stall has fixed costs of $60 and variable cost $2 per item. Write the cost rule for n items.", "C = 60 + 2n", "C = 60 + 2n", ["C=60+2n", "c=60+2n", "C=2n+60"]),
        linearAnswer("linear-beven-g3", "Set 5n = 60 + 2n and solve for the break-even quantity n.", "5n = 60 + 2n", "20", ["n=20", "20 items"]),
        moneyAnswer("linear-beven-g4", "Find the break-even revenue by substituting n = 20 into R = 5n.", "R=5\\times 20", "100"),
      ],
      independentPractice: [
        linearAnswer("linear-beven-i1", "A product sells for $8 each. Fixed costs are $90, variable cost $3 per item. Write the cost rule.", "C = 90 + 3n", "C = 90 + 3n", ["C=90+3n", "c=90+3n"]),
        linearAnswer("linear-beven-i2", "Set 8n = 90 + 3n and solve for the break-even quantity n.", "8n = 90 + 3n", "18", ["n=18", "18 items"]),
        moneyAnswer("linear-beven-i3", "Find the break-even revenue using R = 8n and n = 18.", "R=8\\times 18", "144"),
        linearAnswer("linear-beven-i4", "A market stall sells at $10 per item. Fixed cost $120, variable cost $4 per item. Find the break-even quantity.", "10n = 120 + 4n", "20", ["n=20", "20 items"]),
        financeChoice(
          "linear-beven-i5",
          "At the break-even point, profit is:",
          "C",
          ["Maximum", "Negative", "Zero", "Equal to fixed costs"],
          "Break-even means Revenue = Cost, so Profit = Revenue − Cost = 0.",
        ),
      ],
      commonMistakes: [
        { mistake: "Writing Revenue as Fixed cost + selling price, confusing revenue with total cost.", fix: "Revenue = selling price × quantity only. Fixed costs and variable costs belong in the Cost rule, not Revenue." },
        { mistake: "Setting Revenue = 0 instead of Revenue = Cost to find break-even.", fix: "Break-even is where Revenue and Cost are equal to each other, not where either is zero." },
        { mistake: "After finding break-even quantity, forgetting to find the break-even dollar amount.", fix: "Substitute n back into either R or C to find the dollar value at break-even." },
        { mistake: "Confusing profit with revenue — reporting revenue as profit.", fix: "Profit = Revenue − Cost. If selling 25 items at $5 gives revenue $125 but cost is $110, profit is $15, not $125." },
      ],
      masteryQuiz: [
        linearAnswer("linear-beven-m1", "A food truck earns $12 per meal. Fixed costs $160, variable cost $4 per meal. Write the cost rule.", "C = 160 + 4n", "C = 160 + 4n", ["C=160+4n", "c=160+4n"]),
        linearAnswer("linear-beven-m2", "Write the revenue rule for the food truck (selling at $12 per meal).", "R = 12n", "R = 12n", ["R=12n", "r=12n"]),
        financeChoice(
          "linear-beven-m3",
          "To find the break-even quantity, you should:",
          "C",
          ["Set Cost = 0", "Set Revenue = 0", "Set Revenue = Cost", "Subtract Revenue from Cost"],
          "Break-even is the point where Revenue = Cost.",
        ),
        linearAnswer("linear-beven-m4", "Solve 12n = 160 + 4n to find the break-even quantity.", "12n = 160 + 4n \\Rightarrow 8n = 160", "20", ["n=20", "20 meals"]),
        moneyAnswer("linear-beven-m5", "Find the break-even revenue for the food truck using R = 12n and n = 20.", "R=12\\times 20", "240"),
        financeChoice(
          "linear-beven-m6",
          "A stall sells 30 items. Revenue = $150 and Cost = $120. The profit is:",
          "C",
          ["$150", "$120", "$30", "-$30"],
          "Profit = Revenue − Cost = $150 − $120 = $30.",
        ),
        linearAnswer("linear-beven-m7", "A popcorn stall charges $6 per bag. Fixed cost $90, variable cost $1 per bag. Find the break-even quantity.", "6n = 90 + n \\Rightarrow 5n = 90", "18", ["n=18", "18 bags"]),
        moneyAnswer("linear-beven-m8", "Find the break-even revenue for the popcorn stall (n = 18, R = 6n).", "R=6\\times 18", "108"),
        linearAnswer("linear-beven-m9", "A craft stall sells items at $15 each. Fixed cost $180, variable cost $6 per item. Find the quantity needed to make a $90 profit.", "9n - 180 = 90 \\Rightarrow 9n = 270", "30", ["n=30", "30 items"]),
        financeChoice(
          "linear-beven-m10",
          "A stall with fixed costs $100 sells items at $8 each, variable cost $3. At n = 15 items, the stall has:",
          "B",
          ["Profit of $25", "Loss of $25", "Profit of $10", "Break-even"],
          "Revenue = $120. Cost = $100 + $45 = $145. Profit = $120 − $145 = −$25 (loss).",
        ),
      ],
    };
  }

  if (lesson.slug === "practical-limitations-linear-models") {
    return {
      ...base,
      description:
        "Identify domain restrictions, explain why extrapolation may be unreliable, and state meaningful limitations of linear models in context.",
      learningIntention:
        "Evaluate whether a linear model gives reliable predictions for a given input by checking domain restrictions and extrapolation risks.",
      successCriteria: [
        "Identify valid and invalid input values for a practical linear model.",
        "Find the endpoint of a model's domain by setting the output to its minimum or maximum practical value.",
        "Explain why extrapolation beyond the data range may be unreliable.",
        "State a practical limitation of a linear model in context.",
      ],
      teaching: {
        paragraphs: [
          "Every practical linear model is only meaningful for a specific range of inputs. This range is called the domain. For example, a tank volume model cannot predict negative litres, so it is only valid until V = 0.",
          "To find the domain endpoint, set the output to its boundary value and solve. For V = 200 − 10t, setting V = 0 gives t = 20 — the tank empties at 20 minutes and the model stops being valid.",
          "Extrapolation means using a model for input values beyond the range of the original data it was built from. A model built on 6 weeks of data may work well for week 7, but predicting year 3 is extrapolation and may be very unreliable — the situation may have changed significantly.",
          "Linear models also assume a constant rate of change. In reality, rates can change over time: fuel prices change, spending habits shift, and demand fluctuates. Always state practical limitations in context, not just as a general statement.",
        ],
        latexBlocks: [
          "\\text{Find domain endpoint: set output} = \\text{boundary value and solve for input}",
          "V = 200 - 10t \\geq 0 \\Rightarrow t \\leq 20",
          "\\text{Extrapolation risk: model built on data for } 0 \\leq x \\leq a \\text{ may fail for } x \\gg a",
        ],
      },
      guidedPractice: [
        financeChoice(
          "linear-limit-g1",
          "A tank model V = 200 − 10t is valid only while:",
          "B",
          ["t ≥ 200", "V ≥ 0, i.e. t ≤ 20", "V can be any value including negative", "t can be any value including negative"],
          "The tank cannot have a negative volume, so the model is valid only while V ≥ 0.",
        ),
        linearAnswer("linear-limit-g2", "For V = 200 − 10t, find the value of t when V = 0 (the tank is empty).", "200 - 10t = 0", "20", ["t=20", "20 minutes", "20 min"]),
        financeChoice(
          "linear-limit-g3",
          "Extrapolation means:",
          "B",
          ["Using a model within the range of its data", "Using a model beyond the range of its data", "Finding the gradient of a model", "Identifying the y-intercept"],
          "Extrapolation uses the model for inputs outside the range from which it was built.",
        ),
        financeChoice(
          "linear-limit-g4",
          "A fuel model C = 1.80L is built from data with 0 ≤ L ≤ 60. Using it to predict cost for 90 L is unreliable because:",
          "A",
          ["90 > 60, so the model is used outside its data range", "Multiplication is too difficult for 90", "The model only works at exactly 60 L", "Direct variation is always unreliable"],
          "Using the model for L = 90 is extrapolation — it is outside the observed data range of 0–60 L.",
        ),
      ],
      independentPractice: [
        moneyAnswer("linear-limit-i1", "A car hire costs C = 80 + 0.25d. Find the maximum cost if the car can travel at most 1000 km.", "80 + 0.25 \\times 1000", "330"),
        linearAnswer("linear-limit-i2", "A savings model is S = 50 + 30w. After how many weeks does the model predict a balance of $500?", "50 + 30w = 500", "15", ["w=15", "15 weeks"]),
        financeChoice(
          "linear-limit-i3",
          "A factory output grows by 200 units per month. Why might a model for 5 years into the future be unreliable?",
          "B",
          ["Monthly growth is impossible", "Resources or demand may limit growth over a long period", "Linear models are always accurate for factories", "5 years is the same as 5 months"],
          "A constant growth rate over 5 years is unlikely — resources, staffing, or demand will change.",
        ),
        linearAnswer("linear-limit-i4", "A water model V = 120 − 8t is used for 0 ≤ t ≤ 15 minutes. What is the model's output at t = 15 (the boundary)?", "V = 120 - 8\\times 15", "0", ["V=0", "0 L", "zero"]),
        linearAnswer("linear-limit-i5", "A population model P = 1200 + 50t is extrapolated to t = 100 years. What value does the model predict?", "P = 1200 + 50\\times 100", "6200", ["P=6200", "6200 people"]),
      ],
      commonMistakes: [
        { mistake: "Applying a model for inputs that make the output negative or physically impossible.", fix: "Find the domain first: set the output to its minimum meaningful value (often 0) and solve to find the upper limit of valid input." },
        { mistake: "Treating a model's prediction as exact even when far from its data range.", fix: "Any prediction well outside the original data range is extrapolation — acknowledge that the actual value may differ significantly." },
        { mistake: "Stating a limitation as 'the model may be wrong' without context.", fix: "State specifically why the rate may change: 'the fuel price may change over time' or 'demand may not grow at a constant rate'." },
        { mistake: "Confusing domain restriction with the model being incorrect.", fix: "A linear model is not wrong — it just has a finite valid range. State the domain and use the model only within it." },
      ],
      masteryQuiz: [
        financeChoice(
          "linear-limit-m1",
          "A practical linear model should only be used where:",
          "B",
          ["The gradient is positive", "Inputs are within the realistic domain", "All negative values are included", "The model gives very large numbers"],
          "A model is only meaningful within the context and range for which it was built.",
        ),
        linearAnswer("linear-limit-m2", "A battery model is B = 100 − 2h for h hours of use. After how many hours does B = 0?", "100 - 2h = 0", "50", ["h=50", "50 hours", "50 h"]),
        linearAnswer("linear-limit-m3", "For the battery model B = 100 − 2h, state the upper limit of the valid domain (the value of h where B = 0).", "100 - 2h = 0 \\Rightarrow h = 50", "50", ["h=50", "50 hours", "50"]),
        financeChoice(
          "linear-limit-m4",
          "A hire car cost model uses data from 0 to 500 km. Using it to predict costs at 800 km is:",
          "B",
          ["Reliable because it is just multiplication", "Unreliable as it is outside the data range (extrapolation)", "Exact always", "Impossible to calculate"],
          "800 km is beyond the 500 km data range — this is extrapolation and may be unreliable.",
        ),
        linearAnswer("linear-limit-m5", "A tank model V = 400 − 20t is valid while V ≥ 0. Find the time t when V = 0.", "400 - 20t = 0", "20", ["t=20", "20 minutes", "20 min"]),
        linearAnswer("linear-limit-m6", "A savings model S = 200 + 40w was built from 8 weeks of data. What does the model predict for week 52?", "S = 200 + 40\\times 52", "2280", ["S=2280", "$2280", "2280 dollars"]),
        financeChoice(
          "linear-limit-m7",
          "The prediction for week 52 may be unreliable because:",
          "B",
          ["52 weeks is fewer than 8 weeks", "The model is extrapolated far beyond the 8-week data range", "Savings always stop growing", "The gradient is always wrong beyond 8 weeks"],
          "Using an 8-week model to predict 52 weeks ahead is a large extrapolation — the savings rate may have changed.",
        ),
        moneyAnswer("linear-limit-m8", "A hire model is C = 60 + 12h, valid for 0 ≤ h ≤ 8 hours. Find the maximum cost within the valid domain.", "60 + 12\\times 8", "156"),
        moneyAnswer("linear-limit-m9", "A fuel model C = 1.75L is valid for 0 ≤ L ≤ 60 litres. Find the maximum predicted cost within this domain.", "1.75\\times 60", "105"),
        financeChoice(
          "linear-limit-m10",
          "Which statement best describes a practical limitation of a linear model?",
          "C",
          ["Linear models are never useful in real life", "Linear models cannot be graphed", "A constant rate of change may not apply indefinitely in real contexts", "Linear models are too complex to apply in practice"],
          "Real rates of change (prices, savings, usage) often vary over time, so assuming a constant gradient indefinitely may lead to unreliable predictions.",
        ),
      ],
    };
  }

  if (lesson.slug === "linear-relationships-exam-practice") {
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

  if (lesson.slug === "linear-relationships-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 linear-algebra skills: identify gradient and y-intercept from an equation or table, calculate gradient from two points, and write the equation of a straight line — foundations for all Year 11 linear-relationships work.",
      learningIntention:
        "Recall and apply Year 10 linear-relationship skills so that Year 11 gradient, intercept and modelling work builds on secure foundations.",
      successCriteria: [
        "State the gradient and y-intercept directly from an equation in the form y = mx + b.",
        "Calculate the gradient between two coordinate points using rise over run.",
        "Write the equation of a line given its gradient and y-intercept.",
        "Read a table of values and identify whether it represents a linear relationship.",
      ],
      teaching: {
        paragraphs: [
          "A linear relationship has a constant rate of change. When graphed, it forms a straight line. The equation y = mx + b describes any non-vertical straight line: m is the gradient (how steep) and b is the y-intercept (where the line crosses the vertical axis, i.e. the value of y when x = 0).",
          "The gradient measures steepness and direction. A positive m means the line rises from left to right; a negative m means it falls. A larger absolute value means a steeper line. To find the gradient between two points, use m = (y₂ − y₁) / (x₂ − x₁). The order of subtraction must be consistent: if you put point 2 first in the numerator, put point 2 first in the denominator.",
          "To write the equation of a line when you know the gradient and one point, substitute the known x and y values into y = mx + b and solve for b. Once b is found, write the full equation. If you are given the gradient and y-intercept directly, substitute into y = mx + b immediately.",
          "A table of values represents a linear relationship if the y values change by the same amount each time x increases by 1 (or any constant step). The common difference in y divided by the step in x gives the gradient m. The b value is the y value when x = 0.",
        ],
        latexBlocks: [
          "y = mx + b\\quad (m=\\text{gradient},\\; b=\\text{y-intercept})",
          "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{rise}}{\\text{run}}",
          "\\text{Example: gradient } 3,\\text{ y-intercept } -4 \\Rightarrow y = 3x - 4",
        ],
      },
      workedExamples: [
        {
          title: "Gradient between two points",
          questionLatex:
            "\\text{Find the gradient of the line passing through }(2,\\,1)\\text{ and }(6,\\,9).",
          steps: [
            {
              explanation: "Label the points: (x₁, y₁) = (2, 1) and (x₂, y₂) = (6, 9).",
              latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{9 - 1}{6 - 2}",
            },
            {
              explanation: "Calculate rise and run.",
              latex: "m = \\frac{8}{4} = 2",
            },
          ],
          finalAnswerLatex: "m = 2",
        },
        {
          title: "Reading gradient and y-intercept from an equation",
          questionLatex:
            "\\text{State the gradient and y-intercept of }y = -3x + 5.",
          steps: [
            {
              explanation: "Compare with y = mx + b. The coefficient of x is m and the constant is b.",
              latex: "y = -3x + 5 \\Rightarrow m = -3,\\quad b = 5",
            },
          ],
          finalAnswerLatex: "m = -3,\\quad b = 5",
        },
        {
          title: "Writing the equation from gradient and a point",
          questionLatex:
            "\\text{A line has gradient }2\\text{ and passes through }(3,\\,7).\\text{ Find its equation.}",
          steps: [
            {
              explanation: "Substitute m = 2 and the point (3, 7) into y = mx + b.",
              latex: "7 = 2(3) + b = 6 + b",
            },
            {
              explanation: "Solve for b.",
              latex: "b = 7 - 6 = 1",
            },
            {
              explanation: "Write the equation.",
              latex: "y = 2x + 1",
            },
          ],
          finalAnswerLatex: "y = 2x + 1",
        },
      ],
      guidedPractice: [
        linearAnswer(
          "y11s-lrr-g1",
          "Find the gradient of the line through (1, 3) and (5, 11).",
          "m = \\frac{11-3}{5-1} = \\frac{8}{4}",
          "2",
          ["2.0", "m=2"]
        ),
        financeChoice(
          "y11s-lrr-g2",
          "For the equation y = 4x − 7, the y-intercept is:",
          "B",
          ["-4", "-7", "4", "7"],
          "The y-intercept b is the constant term: b = −7."
        ),
        linearAnswer(
          "y11s-lrr-g3",
          "State the gradient of y = -5x + 2.",
          "y = mx + b\\text{, compare: }m = -5",
          "-5",
          ["m=-5", "−5"]
        ),
        financeChoice(
          "y11s-lrr-g4",
          "A table of values has x: 0, 1, 2, 3 and y: 4, 7, 10, 13. The gradient is:",
          "C",
          ["4", "1", "3", "13"],
          "y increases by 3 for each 1-unit increase in x, so gradient = 3."
        ),
      ],
      independentPractice: [
        linearAnswer(
          "y11s-lrr-i1",
          "Find the gradient of the line through (0, 2) and (4, 10).",
          "m = \\frac{10-2}{4-0} = \\frac{8}{4}",
          "2",
          ["2.0", "m=2"]
        ),
        linearAnswer(
          "y11s-lrr-i2",
          "A line has gradient 3 and y-intercept 5. Write its equation.",
          "y = mx + b,\\quad m=3,\\quad b=5",
          "y = 3x + 5",
          ["y=3x+5"]
        ),
        linearAnswer(
          "y11s-lrr-i3",
          "Find the gradient between (-2, 1) and (4, 13).",
          "m = \\frac{13-1}{4-(-2)} = \\frac{12}{6}",
          "2",
          ["2.0", "m=2"]
        ),
        financeChoice(
          "y11s-lrr-i4",
          "Which equation has a negative gradient?",
          "B",
          ["y = 2x + 1", "y = -3x + 4", "y = 5x", "y = x + 6"],
          "The coefficient of x in y = −3x + 4 is negative."
        ),
        linearAnswer(
          "y11s-lrr-i5",
          "A line passes through (0, −1) and has gradient 4. Write the equation.",
          "b=-1\\text{ (y-intercept)},\\quad m=4",
          "y = 4x - 1",
          ["y=4x-1"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Swapping rise and run: writing (x₂ − x₁) in the numerator instead of (y₂ − y₁).",
          fix: "Rise (vertical change) goes on top, run (horizontal change) goes on the bottom. m = (y₂ − y₁)/(x₂ − x₁).",
        },
        {
          mistake: "Using inconsistent order — subtracting in different orders in numerator and denominator.",
          fix: "Pick one point as 'point 2' and always subtract 'point 1' from it in both numerator and denominator. Either order works as long as it is consistent.",
        },
        {
          mistake: "Confusing gradient m with y-intercept b in y = mx + b.",
          fix: "In y = 3x + 5, the gradient is 3 (coefficient of x) and the y-intercept is 5 (constant term). 'mx' is the variable part; 'b' is the fixed number.",
        },
        {
          mistake: "Reading gradient from a table by using y-values only, forgetting to divide by the x-step.",
          fix: "Gradient = change in y ÷ change in x. If x increases by 2 and y increases by 6, the gradient is 6/2 = 3, not 6.",
        },
      ],
      masteryQuiz: [
        linearAnswer("y11s-lrr-m1", "Find the gradient of the line through (3, 5) and (7, 13).", "m = \\frac{13-5}{7-3}", "2", ["2.0", "m=2"]),
        financeChoice("y11s-lrr-m2", "The gradient of y = -2x + 9 is:", "A", ["-2", "9", "2", "-9"], "The coefficient of x is −2."),
        linearAnswer("y11s-lrr-m3", "A line is written as 2y = 8x − 10. Find its y-intercept.", "2y = 8x - 10", "-5", ["b=-5", "−5"]),
        financeChoice("y11s-lrr-m4", "Which pair gives gradient = 4?", "C", ["(0,4) and (4,0)", "(1,4) and (5,4)", "(0,2) and (1,6)", "(2,8) and (0,0)"], "m = (6−2)/(1−0) = 4."),
        linearAnswer("y11s-lrr-m5", "A line has gradient −1 and y-intercept 7. Write the equation.", "y = mx + b,\\quad m=-1,\\quad b=7", "y = -x + 7", ["y=-x+7", "y = -1x + 7"]),
        financeChoice("y11s-lrr-m6", "A table shows x: 0,1,2 and y: 10,8,6. The gradient is:", "B", ["10", "-2", "2", "-10"], "y decreases by 2 for each 1-unit increase in x."),
        linearAnswer("y11s-lrr-m7", "Find the gradient of the line through (−1, 4) and (3, 12).", "m = \\frac{12-4}{3-(-1)} = \\frac{8}{4}", "2", ["2.0"]),
        financeChoice("y11s-lrr-m8", "A line with gradient 0 is:", "D", ["Vertical", "Steep", "Falling right to left", "Horizontal"], "Zero gradient means the y value does not change — a horizontal line."),
        linearAnswer("y11s-lrr-m9", "A line passes through (0, 6) with gradient 2. State the equation.", "m=2,\\quad b=6", "y = 2x + 6", ["y=2x+6"]),
        financeChoice("y11s-lrr-m10", "The y-intercept is the y-value when:", "A", ["x = 0", "y = 0", "gradient = 0", "x = 1"], "The y-intercept occurs at x = 0."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}

