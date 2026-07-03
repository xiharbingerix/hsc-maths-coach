import type {
  ExplicitLesson,
  WorkedExample,
} from "../differentialCalculus";

type Standard2Blueprint = {
  topic: string;
  object: string;
  validMove: string;
  trap1: string;
  trap2: string;
  trap3: string;
  representation: string;
  check: string;
  d5Context: string;
  formula: string;
  transferQuestion: string;
  transferSteps: { explanation: string; latex: string }[];
  transferAnswer: string;
  multiStem: string;
  multiLatex: string;
  multiParts: {
    prompt: string;
    latex?: string;
    answer: string;
    acceptedAnswers?: string[];
    marks: number;
    hint: string;
    explanation: string;
    working?: string[];
  }[];
};

const BLUEPRINTS: Record<string, Standard2Blueprint> = {
  algebraic: {
    topic: "algebraic modelling",
    object: "the quantity that changes and the rule linking it to the input",
    validMove: "Define variables, choose the model type, then substitute the known information.",
    trap1: "Using a formula before deciding what each variable represents.",
    trap2: "Treating a contextual restriction as optional.",
    trap3: "Solving the equation but not checking the answer in the context.",
    representation: "table, graph, equation, and sentence description of the same relationship",
    check: "the answer fits the original units, restrictions, and trend",
    d5Context: "tariffs, break-even decisions, simultaneous constraints, and non-linear models",
    formula: "y=mx+b,\\quad ax^2+bx+c=0,\\quad y=ka^x,\\quad y=\\frac{k}{x}",
    transferQuestion:
      "\\text{A venue charges a fixed booking fee plus a per-person cost. }30\\text{ people cost }\\$740\\text{ and }45\\text{ people cost }\\$1040.\\text{ Find the fixed fee.}",
    transferSteps: [
      {
        explanation:
          "The per-person cost is the rate of change, so compare the two costs.",
        latex: "m=\\frac{1040-740}{45-30}=20",
      },
      {
        explanation:
          "Substitute one point into the linear model to recover the fixed part.",
        latex: "740=20(30)+b",
      },
      {
        explanation:
          "The intercept is the fixed booking fee because it is the cost before any people are added.",
        latex: "b=140",
      },
    ],
    transferAnswer: "\\$140",
    multiStem:
      "A community hall charges a fixed fee plus a constant amount per attendee. A booking for 20 attendees costs $520 and a booking for 35 attendees costs $820.",
    multiLatex: "",
    multiParts: [
      {
        prompt: "Find the cost per attendee.",
        answer: "20",
        marks: 1,
        hint: "Compare the change in cost with the change in attendees.",
        explanation: "The cost rises by $300 for 15 extra attendees, so the rate is $20 per attendee.",
        working: ["m=\\frac{820-520}{35-20}=20"],
      },
      {
        prompt: "Find the fixed fee.",
        answer: "120",
        marks: 2,
        hint: "Substitute one booking into C = mn + b.",
        explanation: "Using 20 attendees gives 520 = 20(20) + b, so b = 120.",
        working: ["520=20(20)+b", "b=120"],
      },
      {
        prompt: "Find the cost for 50 attendees.",
        answer: "1120",
        marks: 2,
        hint: "Use the completed model with n = 50.",
        explanation: "The model is C = 20n + 120, so 50 attendees cost $1120.",
        working: ["C=20(50)+120=1120"],
      },
    ],
  },
  trigonometry: {
    topic: "practical trigonometry",
    object: "the triangle, bearing, or angle relationship hidden in the context",
    validMove: "Draw or identify the triangle, label the known values, then choose the ratio or non-right-triangle rule.",
    trap1: "Using a right-triangle ratio on a non-right triangle.",
    trap2: "Measuring a bearing from the wrong north line.",
    trap3: "Rounding too early and carrying a distorted value into the final answer.",
    representation: "labelled triangle or bearing diagram connected to the calculation",
    check: "the answer has the right size compared with the longest side or steepest angle",
    d5Context: "navigation, elevation, ambiguous cases, and area of non-right triangles",
    formula: "\\sin\\theta=\\frac{O}{H},\\quad \\frac{a}{\\sin A}=\\frac{b}{\\sin B},\\quad c^2=a^2+b^2-2ab\\cos C",
    transferQuestion:
      "\\text{Two observation points are }80\\text{ m apart. Angles to a tower are }48^\\circ\\text{ and }63^\\circ.\\text{ Find the tower distance from the nearer point to the nearest metre.}",
    transferSteps: [
      {
        explanation:
          "The two sight lines and the baseline form a non-right triangle, so start by finding the third angle.",
        latex: "180^\\circ-48^\\circ-63^\\circ=69^\\circ",
      },
      {
        explanation:
          "Use the sine rule because a side-opposite-angle pair is known.",
        latex: "\\frac{x}{\\sin 48^\\circ}=\\frac{80}{\\sin 69^\\circ}",
      },
      {
        explanation:
          "The computed distance is checked against the diagram before rounding.",
        latex: "x\\approx64",
      },
    ],
    transferAnswer: "64\\text{ m}",
    multiStem:
      "A ship sails from A to B for 12 km on a bearing of 060 degrees, then from B to C for 9 km on a bearing of 140 degrees.",
    multiLatex: "\\text{bearings }060^\\circ\\text{ and }140^\\circ",
    multiParts: [
      {
        prompt: "Find the included angle at B between BA and BC.",
        answer: "100",
        marks: 1,
        hint: "Reverse the first bearing to get the direction from B back to A.",
        explanation: "The reverse bearing BA is 240 degrees. The smaller angle between 240 degrees and 140 degrees is 100 degrees.",
        working: ["240^\\circ-140^\\circ=100^\\circ"],
      },
      {
        prompt: "Find AC to the nearest kilometre.",
        answer: "16",
        acceptedAnswers: ["16 km"],
        marks: 2,
        hint: "Use the cosine rule with the included angle.",
        explanation: "AC squared equals 12 squared plus 9 squared minus 2 times 12 times 9 times cos 100 degrees, giving AC about 16 km.",
        working: ["AC^2=12^2+9^2-2(12)(9)\\cos100^\\circ", "AC\\approx16"],
      },
      {
        prompt: "Find the area of triangle ABC to the nearest square kilometre.",
        answer: "53",
        acceptedAnswers: ["53 km^2"],
        marks: 2,
        hint: "Use the two known sides and included angle.",
        explanation: "Area equals one half times 12 times 9 times sin 100 degrees, which is about 53 square kilometres.",
        working: ["A=\\frac12(12)(9)\\sin100^\\circ", "A\\approx53"],
      },
    ],
  },
  rates: {
    topic: "rates and ratios in practical contexts",
    object: "the unit rate or conversion factor that keeps the units consistent",
    validMove: "Write the units beside the numbers, then multiply by conversion factors so unwanted units cancel.",
    trap1: "Converting in the wrong direction.",
    trap2: "Mixing rates from different time or measurement units.",
    trap3: "Rounding intermediate values before the final comparison.",
    representation: "unit-cancellation chain or rate table",
    check: "the final unit matches the question and the size is reasonable",
    d5Context: "energy bills, rainfall, speed, time zones, and compound practical rates",
    formula: "\\text{rate}=\\frac{\\text{quantity}}{\\text{time}},\\quad E=Pt,\\quad V=Ah",
    transferQuestion:
      "\\text{A pump fills }18\\text{ L every }45\\text{ s. Find the time in minutes to fill }240\\text{ L.}",
    transferSteps: [
      {
        explanation:
          "Convert the pump information into a rate that matches the target volume.",
        latex: "\\frac{18}{45}=0.4\\text{ L/s}",
      },
      {
        explanation:
          "Use time equals quantity divided by rate.",
        latex: "t=\\frac{240}{0.4}=600\\text{ s}",
      },
      {
        explanation:
          "Convert seconds to minutes at the end so the calculation keeps one time unit until the final step.",
        latex: "600\\div60=10",
      },
    ],
    transferAnswer: "10\\text{ min}",
    multiStem:
      "A heater rated at 1.8 kW runs for 2.5 hours. Electricity costs 32 cents per kWh.",
    multiLatex: "",
    multiParts: [
      {
        prompt: "Find the energy used in kWh.",
        answer: "4.5",
        marks: 1,
        hint: "Multiply power in kW by time in hours.",
        explanation: "Energy equals 1.8 times 2.5, so the heater uses 4.5 kWh.",
        working: ["E=1.8\\times2.5=4.5"],
      },
      {
        prompt: "Find the cost in cents.",
        answer: "144",
        marks: 2,
        hint: "Multiply the energy by the price per kWh.",
        explanation: "The cost is 4.5 times 32 cents, which is 144 cents.",
        working: ["4.5\\times32=144"],
      },
      {
        prompt: "If the heater runs for 5 hours instead, find the cost in dollars.",
        answer: "2.88",
        acceptedAnswers: ["$2.88", "2.88 dollars"],
        marks: 2,
        hint: "Doubling the time doubles the energy and cost.",
        explanation: "Five hours is double 2.5 hours, so the cost is 288 cents, or $2.88.",
        working: ["2\\times144=288\\text{ cents}", "288\\div100=2.88"],
      },
    ],
  },
  finance: {
    topic: "financial mathematics",
    object: "the cash flow, rate, term, and compounding or repayment structure",
    validMove: "Identify whether the situation is simple interest, compound growth, depreciation, loan repayment, or annuity.",
    trap1: "Using a simple-interest model when the balance changes each period.",
    trap2: "Treating a percentage rate as a whole number instead of a decimal.",
    trap3: "Comparing options before converting them to the same time frame or net cost.",
    representation: "cash-flow timeline with rate and period labels",
    check: "the balance moves in the direction expected by the financial story",
    d5Context: "fees, tax, brokerage, depreciation, credit cards, annuities, and risk comparison",
    formula: "A=P(1+r)^n,\\quad I=Prn,\\quad \\text{future value from repeated payments}",
    transferQuestion:
      "\\text{A }\\$18000\\text{ car depreciates by }12\\%\\text{ p.a. Find its value after }3\\text{ years to the nearest dollar.}",
    transferSteps: [
      {
        explanation:
          "Depreciation is repeated percentage decrease, so the multiplier is less than 1.",
        latex: "1-0.12=0.88",
      },
      {
        explanation:
          "Apply the multiplier once per year.",
        latex: "V=18000(0.88)^3",
      },
      {
        explanation:
          "Round only at the end because money decisions can change if intermediate values are rounded.",
        latex: "V\\approx12266",
      },
    ],
    transferAnswer: "\\$12266",
    multiStem:
      "Mia invests $6000 at 5% p.a. compounded annually for 4 years. A competing account charges a $40 setup fee but pays 5.4% p.a. compounded annually.",
    multiLatex: "",
    multiParts: [
      {
        prompt: "Find the value of the first investment after 4 years to the nearest dollar.",
        answer: "7293",
        acceptedAnswers: ["$7293"],
        marks: 1,
        hint: "Use the compound interest formula with r = 0.05.",
        explanation: "The amount is 6000 times 1.05 to the power 4, which rounds to $7293.",
        working: ["6000(1.05)^4\\approx7293"],
      },
      {
        prompt: "Find the net value of the competing account after the setup fee to the nearest dollar.",
        answer: "7354",
        acceptedAnswers: ["$7354"],
        marks: 2,
        hint: "Apply compound interest, then subtract the fee.",
        explanation: "The account grows to about $7394 before the fee, so the net value is about $7354.",
        working: ["6000(1.054)^4\\approx7394", "7394-40=7354"],
      },
      {
        prompt: "Find the difference in net value between the two options to the nearest dollar.",
        answer: "61",
        acceptedAnswers: ["$61"],
        marks: 2,
        hint: "Compare the two final net values.",
        explanation: "The competing account is about $61 higher after accounting for the setup fee.",
        working: ["7354-7293=61"],
      },
    ],
  },
  statistics: {
    topic: "statistical modelling",
    object: "the variable pair, distribution feature, or standardised distance being compared",
    validMove: "Identify the variable, choose the display or model, then interpret the value in context.",
    trap1: "Confusing association with causation.",
    trap2: "Using a regression prediction outside the data range without caution.",
    trap3: "Reading a z-score as a raw mark instead of a standardised distance.",
    representation: "scatterplot, regression line, residual, or normal curve",
    check: "the interpretation matches the scale and context of the data",
    d5Context: "residuals, outliers, extrapolation, standardisation, and normal probabilities",
    formula: "z=\\frac{x-\\mu}{\\sigma},\\quad \\hat{y}=a+bx,\\quad \\text{residual}=y-\\hat{y}",
    transferQuestion:
      "\\text{A score of }74\\text{ comes from a distribution with mean }62\\text{ and standard deviation }8.\\text{ Find the z-score.}",
    transferSteps: [
      {
        explanation:
          "Subtracting the mean measures how far the score is from the centre.",
        latex: "74-62=12",
      },
      {
        explanation:
          "Dividing by the standard deviation converts that distance into standard-deviation units.",
        latex: "z=\\frac{12}{8}=1.5",
      },
      {
        explanation:
          "A positive z-score means the score is above the mean.",
        latex: "z=1.5",
      },
    ],
    transferAnswer: "z=1.5",
    multiStem:
      "For a set of exam marks, the mean is 68 and the standard deviation is 6. A student scores 77.",
    multiLatex: "",
    multiParts: [
      {
        prompt: "Find the student's z-score.",
        answer: "1.5",
        marks: 1,
        hint: "Subtract the mean, then divide by the standard deviation.",
        explanation: "The score is 9 above the mean, and 9 divided by 6 is 1.5.",
        working: ["z=\\frac{77-68}{6}=1.5"],
      },
      {
        prompt: "A second student has z = -0.5. Find their mark.",
        answer: "65",
        marks: 2,
        hint: "A z-score of -0.5 is half a standard deviation below the mean.",
        explanation: "Half of 6 is 3, so the mark is 68 minus 3, which is 65.",
        working: ["x=68+(-0.5)(6)=65"],
      },
      {
        prompt: "Find the difference between the two students' marks.",
        answer: "12",
        marks: 2,
        hint: "Use the two raw marks, not the two z-scores.",
        explanation: "The marks are 77 and 65, so the difference is 12 marks.",
        working: ["77-65=12"],
      },
    ],
  },
  networks: {
    topic: "networks and critical path analysis",
    object: "the vertices, edges, weights, dependencies, and path totals",
    validMove: "Model the situation as a network, then optimise the required path, tree, flow, or schedule.",
    trap1: "Choosing the locally shortest edge without checking the whole network.",
    trap2: "Ignoring a dependency before starting an activity.",
    trap3: "Confusing earliest start time with activity duration.",
    representation: "weighted network or activity-on-node schedule",
    check: "the selected route or schedule obeys all connectivity and dependency conditions",
    d5Context: "minimum spanning trees, shortest paths, flow limits, float, and project completion time",
    formula: "\\text{path total}=\\sum\\text{edge weights},\\quad \\text{float}=LS-ES",
    transferQuestion:
      "\\text{A project has paths }A\\!:\\!7\\text{ days}, B\\!:\\!11\\text{ days}, C\\!:\\!9\\text{ days. Find the critical path duration.}",
    transferSteps: [
      {
        explanation:
          "The project cannot finish until every path of dependent work is complete.",
        latex: "\\max(7,11,9)=11",
      },
      {
        explanation:
          "The longest dependent path controls the finish time, so it is the critical path.",
        latex: "B\\text{ is critical}",
      },
      {
        explanation:
          "Shorter paths have float because they can slip slightly without delaying the finish.",
        latex: "\\text{duration}=11",
      },
    ],
    transferAnswer: "11\\text{ days}",
    multiStem:
      "A project has three dependent paths with total durations 9 days, 14 days, and 12 days. One non-critical activity on the 9-day path can be delayed.",
    multiLatex: "",
    multiParts: [
      {
        prompt: "Find the project completion time.",
        answer: "14",
        marks: 1,
        hint: "The longest dependent path controls the finish.",
        explanation: "The maximum of 9, 14, and 12 is 14 days.",
        working: ["\\max(9,14,12)=14"],
      },
      {
        prompt: "Find the float on the 9-day path.",
        answer: "5",
        marks: 2,
        hint: "Compare the 9-day path with the project duration.",
        explanation: "The 9-day path has 5 days before it catches the 14-day critical path.",
        working: ["14-9=5"],
      },
      {
        prompt: "If that activity is delayed by 6 days, find the new project completion time.",
        answer: "15",
        marks: 2,
        hint: "Add the delay to the 9-day path and compare path totals again.",
        explanation: "The delayed path becomes 15 days, which is now longer than the old 14-day critical path.",
        working: ["9+6=15", "\\max(15,14,12)=15"],
      },
    ],
  },
};

const SLUG_BLUEPRINT: Record<string, keyof typeof BLUEPRINTS> = {
  "trigonometry-revision": "trigonometry",
  "elevation-depression-applications": "trigonometry",
  "sine-rule-cosine-rule-area-triangle": "trigonometry",
  "non-right-angled-trigonometry": "trigonometry",
  "ambiguous-case-sine-rule": "trigonometry",
  "ratios-rates-revision": "rates",
  "ratios-rates-unit-conversions": "rates",
  "energy-consumption-watts-kilowatts": "rates",
  "rainfall-volume-calculations": "rates",
  "bearings-navigation-problems": "trigonometry",
  "time-zones-conversions": "rates",
  "practical-rates-ratios-exam-practice": "rates",
  "investment-loans-revision": "finance",
  "investment-compound-interest": "finance",
  "shares-dividends-brokerage": "finance",
  "depreciation-loans": "finance",
  "straight-line-vs-declining-depreciation": "finance",
  "annuities-revision": "finance",
  "annuities-regular-payments": "finance",
  "present-value-annuities": "finance",
  "annuity-interest-factor-tables": "finance",
  "retirement-annuity-planning": "finance",
  "comparing-investments-risk-return": "finance",
  "credit-cards-consumer-decisions": "finance",
  "financial-decision-making-exam-practice": "finance",
  "bivariate-data-revision": "statistics",
  "bivariate-data-scatterplots": "statistics",
  "correlation-association": "statistics",
  "regression-prediction-residuals": "statistics",
  "normal-distribution-revision": "statistics",
  "normal-distribution-z-scores": "statistics",
  "statistical-analysis-exam-practice": "statistics",
  "network-flow-revision": "networks",
  "network-concepts-terminology": "networks",
  "shortest-paths-minimum-spanning-trees": "networks",
  "critical-path-revision": "networks",
  "critical-path-analysis": "networks",
  "gantt-charts-dummy-activities": "networks",
  "networks-exam-practice": "networks",
};

function blueprintFor(lesson: ExplicitLesson): Standard2Blueprint {
  const key =
    SLUG_BLUEPRINT[lesson.slug] ??
    (lesson.moduleSlug.includes("trig")
      ? "trigonometry"
      : lesson.moduleSlug.includes("financial") || lesson.moduleSlug.includes("investment")
        ? "finance"
        : lesson.moduleSlug.includes("stat") || lesson.moduleSlug.includes("normal")
          ? "statistics"
          : lesson.moduleSlug.includes("network") || lesson.moduleSlug.includes("critical")
            ? "networks"
            : "algebraic");
  return BLUEPRINTS[key];
}

function feynmanAdditions(lesson: ExplicitLesson, blueprint: Standard2Blueprint): string[] {
  return [
    `A Standard 2 exam question rarely announces the method first. For ${lesson.title}, begin by naming the structure: ${blueprint.object}. That one decision controls the calculation, because the same surface numbers can belong to a linear model, a rate comparison, a financial timeline, a statistical standardisation, or a network optimisation problem.`,
    `The reason the method works is that ${blueprint.representation} preserves the relationships that matter while removing distracting wording. Once the relationship is visible, the calculation is not a trick: ${blueprint.validMove} This is why the answer can be transferred to unfamiliar contexts such as ${blueprint.d5Context}.`,
    `The main misconception to dissolve here is ${blueprint.trap1} The safeguard is to pause before calculating and check that ${blueprint.check}. In Band 6 responses, that check is part of the mathematics, not an afterthought after the arithmetic.`,
  ];
}

function transferWorkedExample(
  lesson: ExplicitLesson,
  blueprint: Standard2Blueprint
): WorkedExample {
  return {
    title: "Transfer the method to an unfamiliar context",
    questionLatex: blueprint.transferQuestion,
    steps: blueprint.transferSteps,
    finalAnswerLatex: blueprint.transferAnswer,
  };
}

function enrichWorkedExamples(
  lesson: ExplicitLesson,
  blueprint: Standard2Blueprint
): WorkedExample[] {
  const worked = lesson.workedExamples ?? [];
  const stepCount = worked.reduce((total, example) => total + (example.steps?.length ?? 0), 0);
  if (worked.length >= 3 && stepCount >= 6) return worked;
  return [...worked, transferWorkedExample(lesson, blueprint)];
}

export function enrichYear12Standard2Depth(lesson: ExplicitLesson): ExplicitLesson {
  const blueprint = blueprintFor(lesson);
  const paragraphs = lesson.teaching.paragraphs ?? [];

  return {
    ...lesson,
    teaching: {
      ...lesson.teaching,
      paragraphs: [...paragraphs, ...feynmanAdditions(lesson, blueprint)],
      latexBlocks:
        lesson.teaching.latexBlocks.length >= 2
          ? lesson.teaching.latexBlocks
          : [...lesson.teaching.latexBlocks, blueprint.formula],
    },
    workedExamples: enrichWorkedExamples(lesson, blueprint),
    masteryQuiz:
      lesson.masteryQuiz.length > 10
        ? lesson.masteryQuiz.slice(0, 10)
        : lesson.masteryQuiz,
    // The updated authoring standard forbids template-expanded mastery pools.
    // Keep the authored 10-question mastery quiz and omit generated pool items.
    masteryQuizPool: undefined,
    // Preserve only explicitly authored shared-stem items. The authoring
    // standard forbids generated multipart backfill.
    multiPartPractice: lesson.multiPartPractice,
  };
}
