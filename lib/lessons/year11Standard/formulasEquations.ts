import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, WorkedExample } from "../differentialCalculus";
import { financeChoice, formulaAnswer } from "../questionHelpers";
function formulasEquationsWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "substitution-formulae-equations") {
    return [
      {
        title: "Substituting into a travel formula",
        questionLatex:
          "\\text{A trip uses }d=st\\text{. If }s=80\\text{ km/h and }t=2.5\\text{ h, find }d.",
        steps: [
          { explanation: "Substitute speed and time into the formula.", latex: "d=80\\times 2.5" },
          { explanation: "Calculate the distance.", latex: "d=200" },
        ],
        finalAnswerLatex: "200\\text{ km}",
      },
      {
        title: "Substituting into a stopping distance model",
        questionLatex:
          "\\text{Stopping distance is }d=0.01v^2+0.4v.\\text{ Estimate }d\\text{ when }v=60.",
        steps: [
          { explanation: "Square the speed before multiplying by 0.01.", latex: "60^2=3600" },
          { explanation: "Substitute and calculate.", latex: "d=0.01(3600)+0.4(60)=36+24=60" },
        ],
        finalAnswerLatex: "60\\text{ m}",
      },
      {
        title: "Solving a contextual equation",
        questionLatex:
          "\\text{A delivery fee is }C=12+3n.\\text{ If }C=30,\\text{ find }n.",
        steps: [
          { explanation: "Subtract the fixed fee first.", latex: "30-12=18" },
          { explanation: "Divide by the charge per item.", latex: "n=18\\div 3=6" },
        ],
        finalAnswerLatex: "6\\text{ items}",
      },
    ];
  }

  if (slug === "changing-subject-formula") {
    return [
      {
        title: "Circumference formula",
        questionLatex: "\\text{The formula }C=2\\pi r\\text{ gives circumference. Make }r\\text{ the subject.}",
        steps: [
          { explanation: "r is multiplied by 2 pi." },
          { explanation: "Divide both sides by 2 pi.", latex: "r=\\frac{C}{2\\pi}" },
        ],
        finalAnswerLatex: "r=\\frac{C}{2\\pi}",
      },
      {
        title: "Triangle area formula",
        questionLatex: "\\text{The formula }A=\\frac{bh}{2}\\text{ gives triangle area. Make }h\\text{ the subject.}",
        steps: [
          { explanation: "Multiply both sides by 2.", latex: "2A=bh" },
          { explanation: "Divide by b.", latex: "h=\\frac{2A}{b}" },
        ],
        finalAnswerLatex: "h=\\frac{2A}{b}",
      },
      {
        title: "Temperature conversion",
        questionLatex: "\\text{The formula }F=1.8C+32\\text{ converts Celsius to Fahrenheit. Make }C\\text{ the subject.}",
        steps: [
          { explanation: "Subtract 32 first.", latex: "F-32=1.8C" },
          { explanation: "Divide by 1.8.", latex: "C=\\frac{F-32}{1.8}" },
        ],
        finalAnswerLatex: "C=\\frac{F-32}{1.8}",
      },
    ];
  }

  return [
    {
      title: `${title}: substitution in a cost formula`,
      questionLatex:
        "\\text{Electricity cost is }C=0.32k+8.\\text{ Find }C\\text{ when }k=50.",
      steps: [
        { explanation: "Substitute 50 for k.", latex: "C=0.32(50)+8" },
        { explanation: "Calculate the cost.", latex: "C=16+8=24" },
      ],
      finalAnswerLatex: "\\$24",
    },
    {
      title: `${title}: rearranging a practical formula`,
      questionLatex:
        "\\text{The formula }C=5w\\text{ gives a simplified dose. Make }w\\text{ the subject.}",
      steps: [
        { explanation: "w is multiplied by 5." },
        { explanation: "Divide both sides by 5.", latex: "w=\\frac{C}{5}" },
      ],
      finalAnswerLatex: "w=\\frac{C}{5}",
    },
  ];
}



export function year11StandardFormulasEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "formulas-equations") {
    return null;
  }

  const base = {
    workedExamples: formulasEquationsWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "substitution-formulae-equations") {
    return {
      ...base,
      description:
        "Substitute into practical formulae, solve simple contextual equations, and interpret answers with units.",
      learningIntention:
        "Evaluate practical formulae and solve simple equations from everyday contexts.",
      successCriteria: [
        "Substitute values into formulae using the correct variable.",
        "Apply order of operations in practical formulae.",
        "Solve simple linear equations from contexts.",
        "Interpret answers with appropriate units and reasonableness.",
      ],
      teaching: {
        paragraphs: [
          "A formula shows how quantities are connected. In practical questions, each variable represents a real quantity such as distance, time, weight or cost.",
          "Substitution means replacing a variable with a given value. Use the value for the correct variable and keep the units in mind.",
          "Order of operations matters. Powers are calculated before multiplication and addition.",
          "Equations from contexts can often be solved by undoing operations in reverse order.",
        ],
        latexBlocks: [
          "d=st",
          "d=0.01v^2+0.4v",
          "\\text{dose}=5w\\quad\\text{(simplified hypothetical rule)}",
        ],
      },
      guidedPractice: [
        formulaAnswer("formula-sub-g1", "A trip uses d = st. If speed is 80 km/h and time is 2.5 h, find the distance.", "d=80\\times 2.5", "200 km", ["200", "200km"]),
        formulaAnswer("formula-sub-g2", "A simplified medication dosage rule is D = 5w, where w is weight in kg. Find D for a 22 kg child.", "D=5\\times 22", "110", ["110 mg", "110mg"]),
        formulaAnswer("formula-sub-g3", "The stopping distance model is d = 0.01v^2 + 0.4v. Estimate d when v = 60.", "d=0.01(60)^2+0.4(60)", "60 m", ["60", "60m"]),
        financeChoice("formula-sub-g4", "In D = 5w, where w is weight in kg, w represents:", "B", ["Dose", "Weight in kg", "Time in hours", "Cost"], "The question defines w as weight in kg."),
      ],
      independentPractice: [
        formulaAnswer("formula-sub-i1", "Electricity cost is C = 0.32k + 8. Find C when k = 50 kWh.", "C=0.32(50)+8", "$24", ["24", "24.00", "$24.00"]),
        formulaAnswer("formula-sub-i2", "Fuel use is F = 0.08d, where d is distance in km. Find F for a 150 km trip.", "F=0.08\\times 150", "12 L", ["12", "12L", "12 litres"]),
        formulaAnswer("formula-sub-i3", "A hall hire cost is C = 60 + 25h. If the total cost is 185 dollars, find h.", "185=60+25h", "5", ["5 h", "5 hours"]),
        financeChoice("formula-sub-i4", "In the stopping distance formula d = 0.01v^2 + 0.4v, the first step when v = 50 is to:", "A", ["Square 50 before multiplying by 0.01", "Add 0.01 and 50", "Ignore v^2", "Use v = 0.4"], "The square is part of the order of operations."),
        formulaAnswer("formula-sub-i5", "A phone repair quote is C = 45 + 30p. If C = 135, find p.", "135=45+30p", "3", ["3 parts", "3parts"]),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into the wrong variable.", fix: "Match each value with its defined variable." },
        { mistake: "Ignoring order of operations.", fix: "Calculate powers before multiplication and addition." },
        { mistake: "Dropping units from practical answers.", fix: "Include units such as km, L, dollars or minutes where needed." },
        { mistake: "Solving equations by undoing operations in the wrong order.", fix: "Undo addition/subtraction before multiplication/division when needed." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-sub-m1", "A cycling distance is modelled by d = st. If s = 18 km/h and t = 3 h, find d.", "d=18\\times 3", "54 km", ["54", "54km"]),
        formulaAnswer("formula-sub-m2", "A simplified dose rule is D = 4w. Find D for a 16 kg child.", "D=4\\times 16", "64", ["64 mg", "64mg"]),
        formulaAnswer("formula-sub-m3", "Stopping distance is d = 0.01v^2 + 0.4v. Find d when v = 40.", "d=0.01(40)^2+0.4(40)", "32 m", ["32", "32m"]),
        formulaAnswer("formula-sub-m4", "A delivery cost is C = 12 + 3n. If C = 30, find n.", "30=12+3n", "6", ["6 items", "6items"]),
        financeChoice("formula-sub-m5", "A result of 200 km for a distance formula should be written with:", "C", ["No unit ever", "Dollars", "Kilometres", "Kilograms"], "Distance is measured in kilometres here."),
        formulaAnswer("formula-sub-m6", "A water bill is C = 18 + 2.5k. Find C when k = 20.", "18+2.5\\times 20", "$68", ["68", "68.00", "$68.00"]),
        formulaAnswer("formula-sub-m7", "A perimeter formula is P = 2l + 2w. Find P when l = 8 m and w = 3 m.", "2(8)+2(3)", "22 m", ["22", "22m"]),
        financeChoice("formula-sub-m8", "If C = 60 + 25h and h is hours, the 60 is:", "B", ["Hourly rate", "Fixed starting cost", "Number of hours", "Final answer"], "The constant term is the fixed starting cost."),
        formulaAnswer("formula-sub-m9", "A parking cost is C = 8 + 4h. If C = 28, find h.", "28=8+4h", "5", ["5 h", "5 hours"]),
        financeChoice("formula-sub-m10", "A formula answer should be checked for reasonableness because:", "D", ["Units never matter", "Substitution is always impossible", "All answers are exact dollars", "A wrong variable can give an unrealistic result"], "Reasonableness helps catch substitution errors."),
      ],
    };
  }

  if (lesson.slug === "changing-subject-formula") {
    return {
      ...base,
      description:
        "Rearrange practical formulae using inverse operations, including cost, area, circumference and temperature formulae.",
      learningIntention:
        "Change the subject of practical formulae using inverse operations.",
      successCriteria: [
        "Use inverse operations to isolate a variable.",
        "Rearrange one-step and two-step formulae.",
        "Rearrange formulae involving multiplication, division, addition and subtraction.",
        "Check a rearranged formula by substitution where appropriate.",
      ],
      teaching: {
        paragraphs: [
          "Changing the subject means rewriting a formula so a different variable is alone on one side.",
          "Use inverse operations to undo what has been done to the variable.",
          "For two-step formulae, undo addition or subtraction before undoing multiplication or division.",
          "A rearranged formula should keep the same meaning as the original. Substitution can be used to check it.",
        ],
        latexBlocks: [
          "C=2\\pi r\\Rightarrow r=\\frac{C}{2\\pi}",
          "A=\\frac{bh}{2}\\Rightarrow h=\\frac{2A}{b}",
        ],
      },
      guidedPractice: [
        formulaAnswer("formula-subject-g1", "The formula C = 2\\pi r gives circumference. Rearrange it to make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
        formulaAnswer("formula-subject-g2", "The triangle area formula is A = bh/2. Rearrange it to make h the subject.", "A=\\frac{bh}{2}", "h = 2A/b", ["h=2A/b", "h=(2A)/b", "h = (2A)/b"]),
        formulaAnswer("formula-subject-g3", "A hire formula is C = 35 + 12h. Rearrange it to make h the subject.", "C=35+12h", "h = (C - 35)/12", ["h=(C-35)/12", "h = (C-35)/12", "h=C-35/12"]),
        financeChoice("formula-subject-g4", "To make h the subject of C = 35 + 12h, the first inverse operation is:", "A", ["Subtract 35", "Divide by 35", "Add 12", "Square h"], "Undo the added 35 before dividing by 12."),
      ],
      independentPractice: [
        formulaAnswer("formula-subject-i1", "The speed formula is d = st. Rearrange it to make s the subject.", "d=st", "s = d/t", ["s=d/t", "s = d ÷ t"]),
        formulaAnswer("formula-subject-i2", "The cost formula C = 8 + 4h gives parking cost. Rearrange it to make h the subject.", "C=8+4h", "h = (C - 8)/4", ["h=(C-8)/4", "h = (C-8)/4"]),
        formulaAnswer("formula-subject-i3", "The rectangle area formula A = lw is used for flooring. Make w the subject.", "A=lw", "w = A/l", ["w=A/l", "w = A ÷ l"]),
        formulaAnswer("formula-subject-i4", "The formula F = 1.8C + 32 converts Celsius to Fahrenheit. Make C the subject.", "F=1.8C+32", "C = (F - 32)/1.8", ["C=(F-32)/1.8", "c=(f-32)/1.8"]),
        financeChoice("formula-subject-i5", "When rearranging A = bh/2 to make h the subject, why multiply by 2 first?", "B", ["To remove b", "To undo division by 2", "To square h", "To remove A"], "Multiplying by 2 undoes the division by 2."),
      ],
      commonMistakes: [
        { mistake: "Changing only one side of the formula.", fix: "Apply the same inverse operation to both sides." },
        { mistake: "Dividing before subtracting in a two-step formula.", fix: "Undo addition or subtraction first when the variable term is grouped." },
        { mistake: "Dropping constants such as 2 or pi.", fix: "Keep every factor attached to the variable until it is divided away." },
        { mistake: "Forgetting square roots in formulas involving squares.", fix: "Undo squaring with a square root when required." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-subject-m1", "The circumference formula is C = 2\\pi r. Make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
        formulaAnswer("formula-subject-m2", "The triangle area formula is A = bh/2. Make b the subject.", "A=\\frac{bh}{2}", "b = 2A/h", ["b=2A/h", "b=(2A)/h", "b = (2A)/h"]),
        formulaAnswer("formula-subject-m3", "A cost formula is C = 20 + 5n. Make n the subject.", "C=20+5n", "n = (C - 20)/5", ["n=(C-20)/5", "n = (C-20)/5"]),
        formulaAnswer("formula-subject-m4", "The distance formula is d = st. Make t the subject.", "d=st", "t = d/s", ["t=d/s", "t = d ÷ s"]),
        financeChoice("formula-subject-m5", "To isolate r in C = 2\\pi r, divide by:", "D", ["C", "r", "2 only", "2\\pi"], "r is multiplied by 2 pi."),
        formulaAnswer("formula-subject-m6", "The formula P = 2l + 2w is used for a rectangle perimeter. Make l the subject.", "P=2l+2w", "l = (P - 2w)/2", ["l=(P-2w)/2", "l = P/2 - w", "l=P/2-w"]),
        formulaAnswer("formula-subject-m7", "The formula C = 0.32k + 8 gives electricity cost. Make k the subject.", "C=0.32k+8", "k = (C - 8)/0.32", ["k=(C-8)/0.32", "k = (C-8)/.32", "k=(C-8)/.32"]),
        financeChoice("formula-subject-m8", "A rearranged formula can be checked by:", "A", ["Substituting values to see if both forms match", "Ignoring units", "Changing only one side", "Guessing the subject"], "Substitution can verify equivalent formulae."),
        formulaAnswer("formula-subject-m9", "A simplified dosage formula is D = 5w. Make w the subject.", "D=5w", "w = D/5", ["w=D/5", "w = D ÷ 5"]),
        financeChoice("formula-subject-m10", "If x^2 = A and x is a positive length, then x is:", "C", ["A^2", "2A", "sqrt(A)", "A/2"], "Undo squaring with a square root for a positive length."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed formula and equation questions involving substitution, rearranging, units and reasonableness.",
    learningIntention:
      "Apply substitution, equation solving and changing the subject to practical exam-style contexts.",
    successCriteria: [
      "Choose the correct formula for a practical context.",
      "Substitute values accurately and use order of operations.",
      "Solve simple contextual equations.",
      "Rearrange practical formulae and interpret units.",
    ],
    teaching: {
      paragraphs: [
        "Formula and equation exam questions often combine context, units and algebraic steps.",
        "Start by identifying the variable you need to find. Then choose whether to substitute, solve an equation, or rearrange first.",
        "For substitution, replace variables carefully and follow order of operations.",
        "For rearranging, use inverse operations to make the required variable the subject.",
      ],
      latexBlocks: [
        "\\text{substitute values into the correct variables}",
        "\\text{use inverse operations to solve or rearrange}",
      ],
    },
    guidedPractice: [
      formulaAnswer("formula-exam-g1", "A trip formula is d = st. If s = 90 km/h and t = 2 h, find d.", "d=90\\times 2", "180 km", ["180", "180km"]),
      formulaAnswer("formula-exam-g2", "Electricity cost is C = 0.32k + 8. Find C when k = 25.", "0.32\\times 25+8", "$16", ["16", "16.00", "$16.00"]),
      formulaAnswer("formula-exam-g3", "A delivery cost is C = 12 + 3n. If C = 39, find n.", "39=12+3n", "9", ["9 items", "9items"]),
      financeChoice("formula-exam-g4", "Which rearrangement makes h the subject of A = bh/2?", "B", ["h = A/(2b)", "h = 2A/b", "h = b/(2A)", "h = A - b/2"], "Multiply by 2, then divide by b."),
    ],
    independentPractice: [
      formulaAnswer("formula-exam-i1", "A simplified fuel formula is F = 0.08d. Find F for d = 250 km.", "0.08\\times 250", "20 L", ["20", "20L", "20 litres"]),
      formulaAnswer("formula-exam-i2", "A parking formula is C = 8 + 4h. If C = 32, find h.", "32=8+4h", "6", ["6 h", "6 hours"]),
      formulaAnswer("formula-exam-i3", "The area formula A = lw is used for a room. Make l the subject.", "A=lw", "l = A/w", ["l=A/w", "l = A ÷ w"]),
      financeChoice("formula-exam-i4", "A stopping-distance formula includes v^2. A common mistake is:", "C", ["Using units", "Substituting v", "Forgetting to square v", "Checking reasonableness"], "The square must be applied before multiplying."),
      financeChoice("formula-exam-i5", "A formula answer in a cost context should usually include:", "A", ["Dollars", "Kilograms", "Degrees Celsius only", "No units"], "Cost is measured in dollars."),
    ],
    commonMistakes: [
      { mistake: "Choosing the wrong formula for the context.", fix: "Identify the quantity being found first." },
      { mistake: "Substituting before rearranging when rearranging would be clearer.", fix: "Use the method that isolates the required variable cleanly." },
      { mistake: "Dropping units in practical questions.", fix: "Attach the unit from the context." },
      { mistake: "Accepting an unreasonable answer.", fix: "Check whether the size and unit make sense." },
    ],
    masteryQuiz: [
      formulaAnswer("formula-exam-m1", "The stopping distance model is d = 0.01v^2 + 0.4v. Find d when v = 30.", "0.01(30)^2+0.4(30)", "21 m", ["21", "21m"]),
      formulaAnswer("formula-exam-m2", "A simplified dosage rule is D = 5w. Find D for w = 22 kg.", "5\\times 22", "110", ["110 mg", "110mg"]),
      formulaAnswer("formula-exam-m3", "A hire cost is C = 35 + 12h. If C = 95, find h.", "95=35+12h", "5", ["5 h", "5 hours"]),
      formulaAnswer("formula-exam-m4", "The formula C = 2\\pi r gives circumference. Make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
      formulaAnswer("formula-exam-m5", "The formula A = bh/2 gives triangle area. Make h the subject.", "A=\\frac{bh}{2}", "h = 2A/b", ["h=2A/b", "h=(2A)/b", "h = (2A)/b"]),
      financeChoice("formula-exam-m6", "In d = st, if d is distance and t is time, s represents:", "D", ["Cost", "Temperature", "Dose", "Speed"], "Speed times time gives distance."),
      formulaAnswer("formula-exam-m7", "The temperature formula is F = 1.8C + 32. Make C the subject.", "F=1.8C+32", "C = (F - 32)/1.8", ["C=(F-32)/1.8", "c=(f-32)/1.8"]),
      financeChoice("formula-exam-m8", "When solving C = 35 + 12h for h, after subtracting 35 you should:", "A", ["Divide by 12", "Multiply by 35", "Square h", "Add 12"], "The h term is multiplied by 12."),
      formulaAnswer("formula-exam-m9", "A fuel formula is F = 0.08d. If F = 16 L, find d.", "16=0.08d", "200 km", ["200", "200km"]),
      financeChoice("formula-exam-m10", "A practical equation answer should be rejected if it:", "C", ["Has correct units", "Matches the formula", "Is impossible in context", "Uses inverse operations"], "Context and reasonableness matter."),
    ],
  };
}

