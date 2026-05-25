import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson } from "../differentialCalculus";
import { practicalChoice, moneyAnswer, measurementAnswer, linearAnswer } from "../questionHelpers";
export function year12Standard2AlgebraicRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "algebraic-relationships"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "linear-relationships-modelling") {
    return {
      ...base,
      description:
        "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
      learningIntention:
        "Use linear equations, tables, gradients, and intercepts to model practical situations.",
      successCriteria: [
        "Write a linear model from a fixed amount and constant rate.",
        "Interpret gradient as a rate of change in context.",
        "Interpret the intercept as a starting value or fixed cost when appropriate.",
        "Use a linear model or table to calculate and compare values.",
      ],
      teaching: {
        paragraphs: [
          "A linear model has a constant rate of change. In practical problems, this might be a fixed joining fee plus a weekly cost, a taxi flagfall plus a cost per kilometre, or a savings account growing by the same amount each week.",
          "The gradient is the rate of change. In C = 40 + 18w, the gradient 18 means the cost increases by 18 dollars each week.",
          "The intercept is the value when the input is 0. In a cost model, it often represents a fixed fee or starting amount.",
          "Tables can reveal linear patterns. If the output increases by the same amount whenever the input increases by 1, the relationship is linear.",
        ],
        latexBlocks: [
          "y=mx+b",
          "\\text{gradient}=\\frac{\\text{change in output}}{\\text{change in input}}",
          "\\text{linear model}=\\text{starting value}+\\text{rate}\\times\\text{input}",
        ],
      },
      workedExamples: [
        {
          title: "Build a linear model from a fixed fee and rate",
          questionLatex:
            "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
          steps: [
            {
              explanation:
                "The fixed fee is paid when w = 0, so it is the intercept.",
              latex: "40",
            },
            {
              explanation:
                "The weekly cost is the gradient.",
              latex: "18w",
            },
          ],
          finalAnswerLatex: "C=40+18w",
        },
        {
          title: "Interpret gradient and intercept",
          questionLatex:
            "\\text{A phone plan is }C=25+0.12g\\text{, where }g\\text{ is extra GB.}",
          steps: [
            {
              explanation:
                "The intercept 25 is the base monthly cost before extra data.",
            },
            {
              explanation:
                "The gradient 0.12 is the cost per extra GB.",
            },
          ],
          finalAnswerLatex:
            "\\$25\\text{ base cost and }\\$0.12\\text{ per extra GB.}",
        },
        {
          title: "Use a linear model",
          questionLatex:
            "\\text{A hire cost is }C=35+12h.\\text{ Find the cost for }4\\text{ hours.}",
          steps: [
            {
              explanation:
                "Substitute h = 4 into the model.",
              latex: "C=35+12(4)",
            },
            {
              explanation: "Calculate the total cost.",
              latex: "C=83",
            },
          ],
          finalAnswerLatex: "\\$83",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-lin-g1", "A gym charges a 40 dollar joining fee plus 18 dollars per week. Write a model for total cost C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-g2", "A taxi fare is F = 6 + 2.40d. What does 6 represent?", "A", ["The fixed starting fare", "The cost per kilometre", "The distance travelled", "The total fare for 6 km"], "The intercept is the starting fare when d = 0."),
        moneyAnswer("y12s2-lin-g3", "A hire model is C = 35 + 12h. Find the cost for 3 hours.", "35+12(3)", "71"),
        practicalChoice("y12s2-lin-g4", "A table has costs 40, 58, 76, 94 for weeks 0, 1, 2, 3. What is the weekly increase?", "B", ["40 dollars", "18 dollars", "58 dollars", "94 dollars"], "The cost rises by 18 each week."),
      ],
      independentPractice: [
        linearAnswer("y12s2-lin-i1", "A bike hire costs 22 dollars plus 9 dollars per hour. Write the total cost C for h hours.", "C=22+9h", "C = 22 + 9h", ["C=22+9h", "c=22+9h", "C=9h+22", "c=9h+22"]),
        practicalChoice("y12s2-lin-i2", "In S = 120 + 25w for a savings plan, the gradient 25 represents:", "C", ["Starting savings", "Number of weeks", "Dollars saved per week", "Total savings after 25 weeks"], "The gradient is the weekly increase."),
        moneyAnswer("y12s2-lin-i3", "A taxi fare is F = 6 + 2.40d. Find the fare for 10 km.", "6+2.40(10)", "30"),
        linearAnswer("y12s2-lin-i4", "A water tank starts with 500 L and drains by 20 L each minute. Write V after t minutes.", "V=500-20t", "V = 500 - 20t", ["V=500-20t", "v=500-20t", "V=-20t+500", "v=-20t+500"]),
        practicalChoice("y12s2-lin-i5", "In V = 500 - 20t, what does the negative gradient mean?", "D", ["The tank starts empty", "Time is negative", "The model is quadratic", "The volume decreases by 20 L per minute"], "A negative gradient shows a decrease."),
      ],
      commonMistakes: [
        { mistake: "Confusing gradient and intercept.", fix: "The intercept is the starting value; the gradient is the rate of change." },
        { mistake: "Writing the fixed fee as the coefficient of the variable.", fix: "The fixed amount stands alone in the model." },
        { mistake: "Substituting into the wrong variable.", fix: "Match the input variable to the quantity in the question." },
        { mistake: "Ignoring units in interpretation.", fix: "State rates such as dollars per week, dollars per km, or litres per minute." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-lin-m1", "A gym charges 40 dollars plus 18 dollars per week. Write C after w weeks.", "", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-m2", "In C = 40 + 18w, the 40 represents:", "A", ["Joining fee", "Weekly cost", "Number of weeks", "Gradient only"], "It is the starting cost when w = 0."),
        practicalChoice("y12s2-lin-m3", "In C = 40 + 18w, the 18 represents:", "B", ["Joining fee", "Cost per week", "Total cost", "Number of weeks"], "The coefficient of w is the weekly rate."),
        moneyAnswer("y12s2-lin-m4", "A hire company charges C = 30 + 15h. Find C for 4 hours.", "C=30+15h,\\quad h=4", "90"),
        linearAnswer("y12s2-lin-m5", "A savings account starts at 200 dollars and increases by 35 dollars per week. Write S after w weeks.", "", "S = 200 + 35w", ["S=200+35w", "s=200+35w", "S=35w+200"]),
        moneyAnswer("y12s2-lin-m6", "Using S = 200 + 35w, find S after 6 weeks.", "S=200+35w,\\quad w=6", "410"),
        practicalChoice("y12s2-lin-m7", "A table increases by the same amount each step. The relationship is likely:", "C", ["Quadratic", "Reciprocal", "Linear", "Random"], "Constant first difference suggests linear."),
        linearAnswer("y12s2-lin-m8", "A phone plan costs 25 dollars plus 0.12 dollars per extra GB. Write C for g extra GB.", "", "C = 25 + 0.12g", ["C=25+0.12g", "c=25+0.12g", "C=0.12g+25"]),
        practicalChoice("y12s2-lin-m9", "In F = 6 + 2.40d, the gradient is measured in:", "D", ["Dollars only", "Kilometres only", "Hours", "Dollars per kilometre"], "The fare changes by dollars for each kilometre."),
        moneyAnswer("y12s2-lin-m10", "A weekly cost model is C = 80 + 22w. Find C when w = 5.", "C=80+22w,\\quad w=5", "190"),
      ],
    };
  }

  if (lesson.slug === "non-linear-relationships-graphs") {
    return {
      ...base,
      description:
        "Interpret and evaluate non-linear models, including quadratic height and area models, graph features, and context restrictions.",
      learningIntention:
        "Recognise and use non-linear relationships in practical graph and modelling contexts.",
      successCriteria: [
        "Recognise when a relationship is not linear.",
        "Evaluate a quadratic or other simple non-linear model in context.",
        "Interpret initial values, intercepts, and maximum or minimum values from a model or graph description.",
        "Apply context restrictions such as non-negative time or distance.",
      ],
      teaching: {
        paragraphs: [
          "A non-linear relationship does not have a constant rate of change. Its graph is not a straight line.",
          "Quadratic models often appear in height, area, revenue, and projectile contexts. A parabola can have a maximum or minimum turning point.",
          "The initial value is the output when the input is 0. In h = -5t^2 + 20t + 1.5, the initial height is 1.5 m.",
          "Context restrictions matter. Time, length, and distance usually cannot be negative, even if an algebraic equation has a negative solution.",
        ],
        latexBlocks: [
          "h=-5t^2+20t+1.5",
          "\\text{initial value}=\\text{output when input}=0",
          "\\text{linear: constant first difference; non-linear: changing rate}",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a quadratic model",
          questionLatex:
            "\\text{A ball's height is }h=-5t^2+20t+1.5.\\text{ Find }h\\text{ when }t=2.",
          steps: [
            {
              explanation: "Substitute t = 2 into the model.",
              latex: "h=-5(2)^2+20(2)+1.5",
            },
            {
              explanation: "Calculate the height.",
              latex: "h=21.5",
            },
          ],
          finalAnswerLatex: "21.5\\text{ m}",
        },
        {
          title: "Interpret a maximum height",
          questionLatex:
            "\\text{A graph of a ball's height has vertex }(2,21.5).",
          steps: [
            {
              explanation:
                "The vertex of a downward-opening height parabola is the maximum point.",
            },
            {
              explanation:
                "The y-value gives the maximum height.",
            },
          ],
          finalAnswerLatex:
            "\\text{Maximum height is }21.5\\text{ m at }2\\text{ s.}",
        },
        {
          title: "Identify why a relationship is not linear",
          questionLatex:
            "\\begin{array}{c|c} x&0&1&2&3\\\\ y&1&4&9&16 \\end{array}",
          steps: [
            {
              explanation:
                "Check the first differences.",
              latex: "4-1=3,\\quad 9-4=5,\\quad 16-9=7",
            },
            {
              explanation:
                "The differences are not constant.",
            },
          ],
          finalAnswerLatex: "\\text{The relationship is non-linear.}",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-nonlin-g1", "A ball's height is h = -5t^2 + 20t + 1.5. Find the initial height.", "h(0)=1.5", "1.5 m", ["1.5", "1.50", "1.5m"]),
        measurementAnswer("y12s2-nonlin-g2", "Using h = -5t^2 + 20t + 1.5, find h when t = 2.", "-5(2)^2+20(2)+1.5", "21.5 m", ["21.5", "21.50", "21.5m"]),
        practicalChoice("y12s2-nonlin-g3", "A graph is a parabola with vertex (3, 40). What does 40 most likely represent in a maximum-height context?", "B", ["Initial time", "Maximum height", "Gradient", "x-intercept"], "The y-value of the vertex is the maximum height."),
        practicalChoice("y12s2-nonlin-g4", "A table has y-values 2, 5, 10, 17 for equal x-steps. Why is it not linear?", "C", ["The values are positive", "There is an intercept", "The first differences are not constant", "It has units"], "Linear tables have constant first differences."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-nonlin-i1", "A revenue model is R = -2p^2 + 40p. Find R when p = 5.", "-2(5)^2+40(5)", "$150", ["150", "150.00", "$150.00"]),
        measurementAnswer("y12s2-nonlin-i2", "A ball's height is h = -4t^2 + 16t + 2. Find the initial height.", "h(0)=2", "2 m", ["2", "2.0", "2m"]),
        practicalChoice("y12s2-nonlin-i3", "The graph of A = s^2 for square area is not linear because:", "A", ["Area changes by increasing amounts as side length increases", "It has no input", "It is a straight line", "Area cannot be modelled"], "Squaring creates a changing rate."),
        practicalChoice("y12s2-nonlin-i4", "A model gives t = -3 seconds as one solution for time. In context this should usually be:", "D", ["Chosen first", "Converted to dollars", "Treated as the maximum", "Rejected because time cannot be negative"], "Negative time is not meaningful in most practical contexts."),
        measurementAnswer("y12s2-nonlin-i5", "A graph description says a quadratic cost has minimum point (4, 120). What is the minimum cost?", "y=120", "$120", ["120", "120.00", "$120.00"]),
      ],
      commonMistakes: [
        { mistake: "Treating every table as linear.", fix: "Check whether first differences are constant." },
        { mistake: "Interpreting the x-intercept as the starting value.", fix: "The starting value is the y-intercept when x = 0." },
        { mistake: "Ignoring negative values that are impossible in context.", fix: "Reject negative time, distance, or length unless the context allows it." },
        { mistake: "Forgetting to square the input in a quadratic model.", fix: "Apply powers before multiplication and addition." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-nonlin-m1", "A ball's height is h = -5t^2 + 20t + 1.5. What is the initial height?", "h=-5t^2+20t+1.5,\\quad t=0", "1.5 m", ["1.5", "1.50", "1.5m"]),
        measurementAnswer("y12s2-nonlin-m2", "Using h = -5t^2 + 20t + 1.5, find h when t = 1.", "h=-5t^2+20t+1.5,\\quad t=1", "16.5 m", ["16.5", "16.50", "16.5m"]),
        practicalChoice("y12s2-nonlin-m3", "A parabola opening downward has vertex (2, 21.5). In a height model, this is the:", "A", ["Maximum height", "Starting time only", "Gradient", "Linear rate"], "A downward parabola has a maximum at its vertex."),
        practicalChoice("y12s2-nonlin-m4", "A graph that curves is generally:", "B", ["Linear", "Non-linear", "A fixed fee", "A constant gradient line"], "A curve is non-linear."),
        practicalChoice("y12s2-nonlin-m5", "A table has equal x-steps and y-values 3, 8, 15, 24. The first differences are:", "C", ["Constant", "3, 3, 3", "5, 7, 9", "Negative only"], "The differences increase."),
        measurementAnswer("y12s2-nonlin-m6", "A profit model is P = -x^2 + 12x. Find P when x = 4.", "P=-x^2+12x,\\quad x=4", "$32", ["32", "32.00", "$32.00"]),
        practicalChoice("y12s2-nonlin-m7", "A solution x = -5 metres in a length context is:", "D", ["Always correct", "A maximum", "The y-intercept", "Not meaningful"], "Lengths cannot be negative."),
        measurementAnswer("y12s2-nonlin-m8", "A square garden has area A = s^2. Find A when s = 6 m.", "A=s^2,\\quad s=6\\text{ m}", "36 m^2", ["36", "36m^2", "36 m2"]),
        practicalChoice("y12s2-nonlin-m9", "In h = -5t^2 + 20t + 1.5, the constant 1.5 represents:", "A", ["Initial height", "Maximum time", "Gradient", "Final height always"], "At t = 0, h = 1.5."),
        practicalChoice("y12s2-nonlin-m10", "A quadratic model can be useful for:", "C", ["Only fixed fees", "Only straight-line costs", "Projectile height or area contexts", "Only ratio sharing"], "Quadratics commonly model curved height or area relationships."),
      ],
    };
  }

  if (lesson.slug === "simultaneous-equations-context") {
    return {
      ...base,
      description:
        "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
      learningIntention:
        "Use simultaneous equations to find and interpret where two practical models are equal.",
      successCriteria: [
        "Recognise that an intersection means two models have the same value.",
        "Solve two linear models by setting them equal or using substitution.",
        "Interpret the solution in context with correct units.",
        "Choose which option is better before or after the intersection point.",
      ],
      teaching: {
        paragraphs: [
          "Simultaneous equations often compare two options, such as hire companies, phone plans, taxi fares, or savings plans.",
          "The solution is the point where both models are true at the same time. On a graph, this is the intersection point.",
          "For two cost models, the intersection tells when the costs are equal. Before or after that point, one option may be cheaper.",
          "Always interpret both values in context. If h = 6 and C = 120, that means the options cost the same after 6 hours at 120 dollars.",
        ],
        latexBlocks: [
          "A=30+15h,\\quad B=60+10h",
          "\\text{equal cost: }30+15h=60+10h",
          "\\text{intersection}=(\\text{input},\\text{common output})",
        ],
      },
      workedExamples: [
        {
          title: "Find when two hire companies cost the same",
          questionLatex:
            "A=30+15h,\\quad B=60+10h",
          steps: [
            {
              explanation: "Set the two costs equal.",
              latex: "30+15h=60+10h",
            },
            {
              explanation: "Solve for h.",
              latex: "5h=30\\Rightarrow h=6",
            },
            {
              explanation: "Substitute h = 6 into either model.",
              latex: "A=30+15(6)=120",
            },
          ],
          finalAnswerLatex: "\\text{Equal after }6\\text{ hours at }\\$120.",
        },
        {
          title: "Solve a contextual pair",
          questionLatex:
            "\\text{A savings balance is }S=200+30w.\\text{ A second is }T=80+50w.",
          steps: [
            {
              explanation: "Set the balances equal.",
              latex: "200+30w=80+50w",
            },
            {
              explanation: "Solve for w.",
              latex: "120=20w\\Rightarrow w=6",
            },
          ],
          finalAnswerLatex: "\\text{The balances are equal after }6\\text{ weeks.}",
        },
        {
          title: "Choose the cheaper option after the intersection",
          questionLatex:
            "A=30+15h,\\quad B=60+10h,\\quad h=8",
          steps: [
            {
              explanation: "Calculate each cost at 8 hours.",
              latex: "A=30+15(8)=150,\\quad B=60+10(8)=140",
            },
            {
              explanation: "The smaller cost is cheaper.",
            },
          ],
          finalAnswerLatex: "\\text{Company B is cheaper at }8\\text{ hours.}",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-sim-g1", "Two hire companies are A = 30 + 15h and B = 60 + 10h. After how many hours are the costs equal?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-g2", "For A = 30 + 15h, find the equal cost when h = 6.", "30+15(6)", "120"),
        practicalChoice("y12s2-sim-g3", "On a graph of two hire cost models, the intersection represents:", "B", ["The highest cost always", "The input where both costs are equal", "The fixed fee only", "The gradient of the first line"], "The intersection is where both models have the same value."),
        practicalChoice("y12s2-sim-g4", "Two hire company models are shown. Which company is cheaper at the given time?", "D", ["A, because 15 is bigger", "They are equal", "Neither can be calculated", "B, because $B=140$ and $A=150$"], "Substitution shows B has the smaller cost.", "A=30+15h,\\quad B=60+10h,\\quad h=8"),
      ],
      independentPractice: [
        linearAnswer("y12s2-sim-i1", "Taxi A costs A = 6 + 2d and Taxi B costs B = 12 + 1.5d. Find d when costs are equal.", "6+2d=12+1.5d", "12", ["12 km", "12km"]),
        moneyAnswer("y12s2-sim-i2", "Using Taxi A: A = 6 + 2d, find the equal cost when d = 12.", "6+2(12)", "30"),
        linearAnswer("y12s2-sim-i3", "Plans P = 25 + 3g and Q = 40 + g are equal at what value of g?", "25+3g=40+g", "7.5", ["7.5 GB", "7.5GB"]),
        practicalChoice("y12s2-sim-i4", "If the solution is (6, 120) for hire time and cost, what does 120 mean?", "A", ["The common cost in dollars", "The number of hours", "The gradient", "The fixed fee"], "The output coordinate is the common cost."),
        practicalChoice("y12s2-sim-i5", "A student solves only A = 30 + 15h and never uses B = 60 + 10h. What is missing?", "C", ["A table", "A quadratic term", "The comparison with the second model", "A unit conversion"], "A simultaneous-equations question needs both models."),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into only one model and calling it the intersection.", fix: "At an intersection, both models must have the same output." },
        { mistake: "Mixing up the input and output in the solution.", fix: "Interpret the x-value as the input and the y-value as the common value." },
        { mistake: "Choosing the wrong option after the intersection.", fix: "Substitute the given input into both models and compare outputs." },
        { mistake: "Forgetting context units.", fix: "State hours, kilometres, dollars, weeks, or GB as appropriate." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-sim-m1", "Hire costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "A=30+15h,\\quad B=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-m2", "At h = 6, what is the equal cost for A = 30 + 15h?", "A=30+15h,\\quad h=6", "120"),
        linearAnswer("y12s2-sim-m3", "Phone plans P = 20 + 4g and Q = 50 + g are equal at what g?", "P=20+4g,\\quad Q=50+g", "10", ["10 GB", "10GB"]),
        moneyAnswer("y12s2-sim-m4", "Using P = 20 + 4g, find the equal cost when g = 10.", "P=20+4g,\\quad g=10", "60"),
        practicalChoice("y12s2-sim-m5", "The intersection of two cost lines means:", "B", ["Both gradients are zero", "Both costs are equal", "The cheaper option is impossible", "The y-intercept is negative"], "The outputs are the same at the intersection."),
        practicalChoice("y12s2-sim-m6", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 4?", "A", ["A", "B", "They are equal", "Neither has a cost"], "A = 90 and B = 100."),
        practicalChoice("y12s2-sim-m7", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 8?", "C", ["A", "They are equal", "B", "Both are free"], "A = 150 and B = 140."),
        linearAnswer("y12s2-sim-m8", "Savings S = 200 + 30w and T = 80 + 50w are equal at what w?", "S=200+30w,\\quad T=80+50w", "6", ["6 weeks", "6weeks"]),
        practicalChoice("y12s2-sim-m9", "If a simultaneous solution gives negative time in a hire context, it should usually be:", "D", ["Chosen as the answer", "Converted to dollars", "Called a maximum", "Rejected as not meaningful"], "Negative time is not practical."),
        practicalChoice("y12s2-sim-m10", "Which method is suitable for comparing two linear cost models?", "A", ["Set the two expressions equal", "Use only the first expression", "Find the area under a curve", "Use a z-score"], "Equal costs occur when the expressions are equal."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise HSC-style algebra modelling questions using linear models, non-linear graphs, simultaneous equations, and contextual interpretation.",
    learningIntention:
      "Apply algebraic models to practical exam-style contexts involving costs, savings, height, area, revenue, and option comparisons.",
    successCriteria: [
      "Construct and interpret linear models from fixed costs and rates.",
      "Evaluate and interpret non-linear models and graph features.",
      "Solve and interpret simultaneous equations in context.",
      "Check units, context restrictions, and reasonableness.",
    ],
    teaching: {
      paragraphs: [
        "Algebraic Relationships questions usually start with a real situation and ask you to build, use, compare, or interpret a model.",
        "Linear models have constant rates of change. Non-linear models, such as quadratic height or area models, have changing rates and curved graphs.",
        "Simultaneous equations are useful when two models describe two options. The solution tells where the options have the same value.",
        "For exam responses, keep typed answers short: an equation, a value, a coordinate, or a labelled multiple-choice conclusion.",
      ],
      latexBlocks: [
        "y=mx+b",
        "h=-5t^2+20t+1.5",
        "\\text{intersection: model A} = \\text{model B}",
      ],
    },
    workedExamples: [
      {
        title: "Construct and use a cost model",
        questionLatex:
          "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
        steps: [
          {
            explanation: "Write the model from fixed fee plus weekly rate.",
            latex: "C=40+18w",
          },
          {
            explanation: "For 5 weeks, substitute w = 5.",
            latex: "C=40+18(5)=130",
          },
        ],
        finalAnswerLatex: "\\$130",
      },
      {
        title: "Use a non-linear model",
        questionLatex:
          "h=-5t^2+20t+1.5,\\quad t=2",
        steps: [
          {
            explanation: "Substitute t = 2 and calculate.",
            latex: "h=-5(2)^2+20(2)+1.5=21.5",
          },
        ],
        finalAnswerLatex: "21.5\\text{ m}",
      },
      {
        title: "Compare two options",
        questionLatex:
          "A=30+15h,\\quad B=60+10h",
        steps: [
          {
            explanation: "Set the models equal.",
            latex: "30+15h=60+10h",
          },
          {
            explanation: "Solve for h.",
            latex: "h=6",
          },
        ],
        finalAnswerLatex: "\\text{Equal after }6\\text{ hours.}",
      },
    ],
    guidedPractice: [
      linearAnswer("y12s2-alg-exam-g1", "A gym charges 40 dollars plus 18 dollars per week. Write the cost model C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40"]),
      moneyAnswer("y12s2-alg-exam-g2", "Using C = 40 + 18w, find the cost after 5 weeks.", "40+18(5)", "130"),
      measurementAnswer("y12s2-alg-exam-g3", "A ball height is h = -5t^2 + 20t + 1.5. Find h when t = 2.", "-5(2)^2+20(2)+1.5", "21.5 m", ["21.5", "21.50", "21.5m"]),
      linearAnswer("y12s2-alg-exam-g4", "Costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
    ],
    independentPractice: [
      practicalChoice("y12s2-alg-exam-i1", "In C = 25 + 0.12g for a phone plan, 0.12 represents:", "B", ["Base cost", "Cost per extra GB", "Total data", "Number of months"], "The coefficient of g is the rate per GB."),
      linearAnswer("y12s2-alg-exam-i2", "A taxi charges 6 dollars plus 2.40 dollars per km. Write F for d km.", "F=6+2.40d", "F = 6 + 2.40d", ["F=6+2.40d", "f=6+2.40d", "F=2.40d+6", "F=6+2.4d"]),
      moneyAnswer("y12s2-alg-exam-i3", "Using F = 6 + 2.40d, find the fare for 10 km.", "6+2.40(10)", "30"),
      practicalChoice("y12s2-alg-exam-i4", "A graph has vertex (3, 45) in a revenue model that opens downward. What does 45 represent?", "C", ["Initial cost", "Time", "Maximum revenue", "Gradient"], "The y-value of a downward vertex is the maximum."),
      practicalChoice("y12s2-alg-exam-i5", "Two models are equal at (6, 120). In a hire context, 6 represents:", "A", ["Hours", "Dollars", "Gradient", "Initial fee"], "The input coordinate is hours."),
    ],
    commonMistakes: [
      { mistake: "Confusing the meaning of gradient and intercept.", fix: "Gradient is rate; intercept is starting value or fixed amount." },
      { mistake: "Treating a non-linear model as if it has a constant rate.", fix: "Look for powers, curves, or changing first differences." },
      { mistake: "Solving two models but not interpreting the result.", fix: "State what the input and output mean in context." },
      { mistake: "Accepting impossible context values.", fix: "Reject negative time, length, or cost when the context makes them impossible." },
    ],
    masteryQuiz: [
      linearAnswer("y12s2-alg-exam-m1", "A hire company charges 35 dollars plus 12 dollars per hour. Write C for h hours.", "", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35"]),
      moneyAnswer("y12s2-alg-exam-m2", "Using C = 35 + 12h, find C when h = 4.", "C=35+12h,\\quad h=4", "83"),
      practicalChoice("y12s2-alg-exam-m3", "In S = 120 + 25w, the 120 is:", "A", ["Starting savings", "Weekly increase", "Number of weeks", "Gradient only"], "It is the value when w = 0."),
      measurementAnswer("y12s2-alg-exam-m4", "A height model is h = -4t^2 + 16t + 2. Find the initial height.", "h=-4t^2+16t+2,\\quad t=0", "2 m", ["2", "2m", "2.0"]),
      measurementAnswer("y12s2-alg-exam-m5", "Using h = -4t^2 + 16t + 2, find h when t = 1.", "h=-4t^2+16t+2,\\quad t=1", "14 m", ["14", "14m"]),
      practicalChoice("y12s2-alg-exam-m6", "A curved graph with changing rate is:", "B", ["Linear", "Non-linear", "Always impossible", "A fixed fee"], "Curved graphs are non-linear."),
      linearAnswer("y12s2-alg-exam-m7", "Models A = 30 + 15h and B = 60 + 10h are equal at what h?", "A=30+15h,\\quad B=60+10h", "6", ["6 h", "6 hours"]),
      moneyAnswer("y12s2-alg-exam-m8", "Using A = 30 + 15h, find the equal cost when h = 6.", "A=30+15h,\\quad h=6", "120"),
      practicalChoice("y12s2-alg-exam-m9", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 8?", "C", ["A", "They are equal", "B", "Neither"], "A = 150 and B = 140."),
      practicalChoice("y12s2-alg-exam-m10", "A negative time solution in a practical model should usually be:", "D", ["Used first", "Called the gradient", "Converted to dollars", "Rejected as not meaningful"], "Negative time is not practical."),
    ],
  };
}

