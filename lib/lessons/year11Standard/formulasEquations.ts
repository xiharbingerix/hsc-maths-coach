import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { financeChoice, formulaAnswer as baseFormulaAnswer } from "../questionHelpers";

function formulasEquationsFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if ((context.includes("make") && context.includes("subject")) || context.includes("rearrange")) {
    if (context.includes("2\\pi") || context.includes("circumference")) {
      return `Changing the subject means isolating the named variable. Here r is multiplied by the whole coefficient 2 pi, so divide both sides by 2 pi to get ${answer}.`;
    }

    if (context.includes("bh/2") || context.includes("\\frac{bh}{2}") || context.includes("triangle area")) {
      return `The variable is trapped inside a divide-by-2 formula, so undo the division first, then divide by the remaining coefficient. Keeping the same operation on both sides gives ${answer}.`;
    }

    if (context.includes("1.8") || context.includes("fahrenheit") || context.includes("celsius")) {
      return `Undo the formula in reverse order: remove the +32 first, then undo the multiplication by 1.8. That keeps the formula balanced and gives ${answer}.`;
    }

    if (context.includes("+") || context.includes("-")) {
      return `To change the subject, undo the outside addition or subtraction first, then undo the multiplication or division attached to the variable. Doing both sides the same way gives ${answer}.`;
    }

    return `Changing the subject is just solving for a different variable. Undo what is attached to that variable on both sides until it is alone, giving ${answer}.`;
  }

  if (
    context.includes("if c =") ||
    context.includes("if the total") ||
    context.includes("if f =") ||
    context.includes("if d =") ||
    context.includes("find h") ||
    context.includes("find n") ||
    context.includes("find p")
  ) {
    return `This is an equation-solving question, so work backwards from the final value. Undo the fixed part first, then undo the multiplier to isolate the unknown: ${answer}.`;
  }

  if (
    context.includes("v^2") ||
    context.includes("stopping distance") ||
    context.includes("square")
  ) {
    return `Substitution means replacing the variable with the given number. Because the formula contains a square, square the value before multiplying, then finish the arithmetic to get ${answer}.`;
  }

  if (
    context.includes("d=st") ||
    context.includes("speed") ||
    context.includes("distance") ||
    context.includes("time")
  ) {
    return `Match each value to the variable before substituting: speed goes into s and time goes into t. Multiplying the matching quantities gives the distance ${answer}.`;
  }

  if (
    context.includes("cost") ||
    context.includes("electricity") ||
    context.includes("parking") ||
    context.includes("hire") ||
    context.includes("delivery") ||
    context.includes("bill") ||
    context.includes("$")
  ) {
    if (context.includes("if c =")) {
      return `For a cost equation, the fixed starting cost is removed first, then the per-item or per-hour rate is undone. That leaves the unknown value as ${answer}.`;
    }

    return `For a cost formula, substitute the usage value first and then add any fixed charge. The final amount should be in dollars, so the result is ${answer}.`;
  }

  if (
    context.includes("dose") ||
    context.includes("dosage") ||
    context.includes("weight") ||
    context.includes("w=")
  ) {
    return `The formula links the practical quantity to the variable named in the question. Substitute the given weight for w and keep the context unit in mind to get ${answer}.`;
  }

  if (
    context.includes("fuel") ||
    context.includes("litres") ||
    context.includes("km")
  ) {
    return `Keep the practical units connected to the variables: distance goes into d and the formula returns fuel or distance as requested. Substitute or rearrange first, then calculate ${answer}.`;
  }

  if (context.includes("perimeter") || context.includes("area")) {
    return `Formula questions work best when each variable is matched to its meaning first. Substitute the given lengths, or rearrange for the requested length, then keep the correct unit with ${answer}.`;
  }

  return `Start by deciding whether the question asks you to substitute, solve, or rearrange. Use inverse operations carefully and check the practical unit to get ${answer}.`;
}

function formulaAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseFormulaAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: formulasEquationsFeedback(prompt, latex, answer),
  };
}
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

  if (slug === "solving-linear-equations") {
    return [
      {
        title: "Solving a two-step equation",
        questionLatex: "\\text{Solve }5x + 8 = 33.",
        steps: [
          { explanation: "The variable x is multiplied by 5 and then 8 is added. Undo the addition first by subtracting 8 from both sides.", latex: "5x = 33 - 8 = 25" },
          { explanation: "Divide both sides by 5 to isolate x.", latex: "x = 25 \\div 5 = 5" },
          { explanation: "Check the answer by substituting x = 5 back into the original equation.", latex: "5(5) + 8 = 33 \\checkmark" },
        ],
        finalAnswerLatex: "x = 5",
      },
      {
        title: "Solving an equation with brackets",
        questionLatex: "\\text{Solve }4(y - 3) = 20.",
        steps: [
          { explanation: "Divide both sides by 4 first to remove the bracket multiplier.", latex: "y - 3 = 5" },
          { explanation: "Add 3 to both sides to isolate y.", latex: "y = 5 + 3 = 8" },
          { explanation: "Check: 4(8 - 3) = 4(5) = 20. Correct.", latex: "4(8 - 3) = 20 \\checkmark" },
        ],
        finalAnswerLatex: "y = 8",
      },
      {
        title: "Solving a practical equation",
        questionLatex: "\\text{A phone plan costs }C = 20 + 5g.\\text{ If }C = 45,\\text{ find }g.",
        steps: [
          { explanation: "Substitute C = 45 into the equation.", latex: "45 = 20 + 5g" },
          { explanation: "Subtract 20 from both sides.", latex: "5g = 25" },
          { explanation: "Divide both sides by 5.", latex: "g = 5" },
        ],
        finalAnswerLatex: "g = 5 \\text{ GB}",
      },
    ];
  }

  if (slug === "nonlinear-models-context") {
    return [
      {
        title: "Area of a square",
        questionLatex: "\\text{A square tile has side length }s = 9\\text{ cm. Find its area using }A = s^2.",
        steps: [
          { explanation: "The formula A = s² means multiply s by itself, not by 2.", latex: "A = 9^2" },
          { explanation: "Evaluate the square.", latex: "A = 9 \\times 9 = 81" },
        ],
        finalAnswerLatex: "A = 81 \\text{ cm}^2",
      },
      {
        title: "Stopping distance formula",
        questionLatex: "\\text{Stopping distance is }d = 0.01v^2 + 0.4v.\\text{ Find }d\\text{ when }v = 30.",
        steps: [
          { explanation: "Square v first: 30² = 900. Always apply the power before multiplying.", latex: "v^2 = 30^2 = 900" },
          { explanation: "Substitute into both terms of the formula.", latex: "d = 0.01(900) + 0.4(30)" },
          { explanation: "Calculate each term and add.", latex: "d = 9 + 12 = 21" },
        ],
        finalAnswerLatex: "d = 21 \\text{ m}",
      },
      {
        title: "Area of a circular garden",
        questionLatex: "\\text{Find the area of a circular garden with radius }r = 10\\text{ m. Use }\\pi \\approx 3.14.",
        steps: [
          { explanation: "Square the radius first: 10² = 100.", latex: "r^2 = 10^2 = 100" },
          { explanation: "Multiply by π ≈ 3.14.", latex: "A = 3.14 \\times 100 = 314" },
        ],
        finalAnswerLatex: "A = 314 \\text{ m}^2",
      },
    ];
  }

  if (slug === "simultaneous-equations-context") {
    return [
      {
        title: "Finding when two taxi fares are equal",
        questionLatex: "\\text{Taxi A: }C = 8 + 2d.\\quad \\text{Taxi B: }C = 3 + 3d.",
        steps: [
          { explanation: "Set the two cost rules equal to each other — this finds the distance where both fares are the same.", latex: "8 + 2d = 3 + 3d" },
          { explanation: "Subtract 2d from both sides to collect d terms on the right.", latex: "8 = 3 + d" },
          { explanation: "Subtract 3 from both sides.", latex: "d = 5" },
          { explanation: "Find the equal cost by substituting d = 5 into Taxi A's rule.", latex: "C = 8 + 2(5) = 18" },
        ],
        finalAnswerLatex: "d = 5 \\text{ km},\\quad C = \\$18",
      },
      {
        title: "Finding when two phone plans cost the same",
        questionLatex: "\\text{Plan A: }C = 20 + 5g.\\quad \\text{Plan B: }C = 35 + 2g.",
        steps: [
          { explanation: "Set the two plan costs equal.", latex: "20 + 5g = 35 + 2g" },
          { explanation: "Subtract 2g from both sides.", latex: "20 + 3g = 35" },
          { explanation: "Subtract 20 from both sides, then divide by 3.", latex: "3g = 15 \\Rightarrow g = 5" },
          { explanation: "Both plans cost $45 at g = 5 GB.", latex: "C = 20 + 5(5) = 45" },
        ],
        finalAnswerLatex: "g = 5 \\text{ GB},\\quad \\text{equal cost } \\$45",
      },
    ];
  }

  if (slug === "inequalities-in-context") {
    return [
      {
        title: "Solving a linear inequality",
        questionLatex: "\\text{Solve }3x + 4 < 19.\\text{ Find the largest whole number value of }x.",
        steps: [
          { explanation: "Subtract 4 from both sides.", latex: "3x < 15" },
          { explanation: "Divide both sides by 3.", latex: "x < 5" },
          { explanation: "x must be strictly less than 5, so the largest whole number that satisfies this is 4.", latex: "\\text{largest whole number: } x = 4" },
        ],
        finalAnswerLatex: "x = 4",
      },
      {
        title: "Budget constraint: maximum items",
        questionLatex: "\\text{Budget: at most }\\$200.\\text{ Fixed cost }\\$60.\\text{ Each item }\\$14.\\text{ Find max items.}",
        steps: [
          { explanation: "Write the inequality: fixed cost plus item costs must not exceed $200.", latex: "60 + 14n \\leq 200" },
          { explanation: "Subtract 60 from both sides.", latex: "14n \\leq 140" },
          { explanation: "Divide both sides by 14.", latex: "n \\leq 10" },
        ],
        finalAnswerLatex: "\\text{Maximum } 10 \\text{ items}",
      },
      {
        title: "Lift weight constraint",
        questionLatex: "\\text{Lift maximum: }800 \\text{ kg. Equipment: }150 \\text{ kg. Find max weight per box for 5 boxes.}",
        steps: [
          { explanation: "Total weight is 150 kg of equipment plus 5 boxes at b kg each.", latex: "150 + 5b \\leq 800" },
          { explanation: "Subtract 150 from both sides.", latex: "5b \\leq 650" },
          { explanation: "Divide both sides by 5.", latex: "b \\leq 130" },
        ],
        finalAnswerLatex: "\\text{Maximum } 130 \\text{ kg per box}",
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
  if (course.slug !== "year-11-standard" || unit.slug !== "formulae-equations") {
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
          "Substitution means following the formula like a recipe: replace each variable with its given value, then evaluate. Put each value with the correct variable and keep the units in mind.",
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
        formulaAnswer("formula-sub-g1", "A trip uses d = st. If speed is 80 km/h and time is 2.5 h, find the distance.", "d=st,\\quad s=80\\text{ km/h},\\quad t=2.5\\text{ h}", "200 km", ["200", "200km"]),
        formulaAnswer("formula-sub-g2", "A simplified medication dosage rule is D = 5w, where w is weight in kg. Find D for a 22 kg child.", "D=5w,\\quad w=22\\text{ kg}", "110", ["110 mg", "110mg"]),
        formulaAnswer("formula-sub-g3", "The stopping distance model is d = 0.01v^2 + 0.4v. Estimate d when v = 60.", "d=0.01v^2+0.4v,\\quad v=60", "60 m", ["60", "60m"]),
        financeChoice("formula-sub-g4", "In D = 5w, where w is weight in kg, w represents:", "B", ["Dose", "Weight in kg", "Time in hours", "Cost"], "The question defines w as weight in kg."),
      ],
      independentPractice: [
        formulaAnswer("formula-sub-i1", "Electricity cost is C = 0.32k + 8. Find C when k = 50 kWh.", "C=0.32k+8,\\quad k=50", "$24", ["24", "24.00", "$24.00"]),
        formulaAnswer("formula-sub-i2", "Fuel use is F = 0.08d, where d is distance in km. Find F for a 150 km trip.", "F=0.08d,\\quad d=150\\text{ km}", "12 L", ["12", "12L", "12 litres"]),
        formulaAnswer("formula-sub-i3", "A hall hire cost is C = 60 + 25h. If the total cost is 185 dollars, find h.", "C=60+25h,\\quad C=185", "5", ["5 h", "5 hours"]),
        financeChoice("formula-sub-i4", "In the stopping distance formula d = 0.01v^2 + 0.4v, the first step when v = 50 is to:", "A", ["Square 50 before multiplying by 0.01", "Add 0.01 and 50", "Ignore v^2", "Use v = 0.4"], "The square is part of the order of operations."),
        formulaAnswer("formula-sub-i5", "A phone repair quote is C = 45 + 30p. If C = 135, find p.", "C=45+30p,\\quad C=135", "3", ["3 parts", "3parts"]),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into the wrong variable.", fix: "Match each value with its defined variable before substituting." },
        { mistake: "In d = 0.01v² + 0.4v, multiplying 0.01 by v before squaring v.", fix: "Square v first, then multiply: 0.01 × v² is not the same as (0.01 × v)²." },
        { mistake: "Dropping units from practical answers.", fix: "Include units such as km, L, dollars or minutes in the final answer." },
        { mistake: "When solving C = 12 + 3n for n, dividing by 3 before subtracting 12.", fix: "Undo addition before division: subtract 12 first, then divide by 3." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-sub-m1", "A cycling distance is modelled by d = st. If s = 18 km/h and t = 3 h, find d.", "s=18\\text{ km/h},\\quad t=3\\text{ h}", "54 km", ["54", "54km"]),
        formulaAnswer("formula-sub-m2", "A simplified dose rule is D = 4w. Find D for a 16 kg child.", "D=4w,\\quad w=16\\text{ kg}", "64", ["64 mg", "64mg"]),
        formulaAnswer("formula-sub-m3", "Stopping distance is d = 0.01v^2 + 0.4v. Find d when v = 40.", "d=0.01v^2+0.4v,\\quad v=40", "32 m", ["32", "32m"]),
        formulaAnswer("formula-sub-m4", "A delivery cost is C = 12 + 3n. If C = 30, find n.", "C=12+3n,\\quad C=30", "6", ["6 items", "6items"]),
        financeChoice("formula-sub-m5", "A result of 200 km for a distance formula should be written with:", "C", ["No unit ever", "Dollars", "Kilometres", "Kilograms"], "Distance is measured in kilometres here."),
        formulaAnswer("formula-sub-m6", "A water bill is C = 18 + 2.5k. Find C when k = 20.", "C=18+2.5k,\\quad k=20", "$68", ["68", "68.00", "$68.00"]),
        formulaAnswer("formula-sub-m7", "A perimeter formula is P = 2l + 2w. Find P when l = 8 m and w = 3 m.", "P=2l+2w,\\quad l=8\\text{ m},\\ w=3\\text{ m}", "22 m", ["22", "22m"]),
        financeChoice("formula-sub-m8", "If C = 60 + 25h and h is hours, the 60 is:", "B", ["Hourly rate", "Fixed starting cost", "Number of hours", "Final answer"], "The constant term is the fixed starting cost."),
        formulaAnswer("formula-sub-m9", "A parking cost is C = 8 + 4h. If C = 28, find h.", "C=8+4h,\\quad C=28", "5", ["5 h", "5 hours"]),
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
          "Use inverse operations to unwrap the variable — peel off the operations surrounding it one at a time, undoing the outermost first, like untying the outer layer of a parcel.",
          "For two-step formulae, undo addition or subtraction before undoing multiplication or division.",
          "A rearranged formula should keep the same meaning as the original. Substitution can be used to check it.",
        ],
        latexBlocks: [
          "C=2\\pi r\\Rightarrow r=\\frac{C}{2\\pi}",
          "A=\\frac{bh}{2}\\Rightarrow h=\\frac{2A}{b}",
        ],
      },
      guidedPractice: [
        formulaAnswer("formula-subject-g1", "The formula $C = 2\\pi r$ gives circumference. Rearrange it to make $r$ the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
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
        { mistake: "Applying an operation to only one side of the formula.", fix: "Whatever is done to one side must be done to the other." },
        { mistake: "In F = 1.8C + 32, dividing by 1.8 before subtracting 32.", fix: "Undo addition or subtraction first: subtract 32 to get F - 32 = 1.8C, then divide by 1.8." },
        { mistake: "In C = 2πr, giving r = C/2 and dropping π.", fix: "Divide by the whole coefficient 2π, not just 2." },
        { mistake: "When a variable is squared, giving the result without taking the square root.", fix: "If x² = 100 and x is a positive length, then x = 10, not 100." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-subject-m1", "The circumference formula is $C = 2\\pi r$. Make $r$ the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
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

  if (lesson.slug === "solving-linear-equations") {
    return {
      ...base,
      description:
        "Use inverse operations to solve one-step, two-step and bracket equations, including equations with unknowns on both sides, in practical contexts.",
      learningIntention:
        "Solve linear equations using inverse operations, including equations with brackets and unknowns on both sides.",
      successCriteria: [
        "Undo addition or subtraction before undoing multiplication or division.",
        "Solve equations with brackets by dividing first or expanding first.",
        "Collect unknown terms on one side when the unknown appears on both sides.",
        "Check solutions by substituting back into the original equation.",
      ],
      teaching: {
        paragraphs: [
          "Solving an equation means finding the value of the unknown. Think of it as undoing what the equation does to the variable — working backwards from the result to the starting value.",
          "For a two-step equation like 5x + 8 = 33, undo the addition first (subtract 8 from both sides to get 5x = 25), then undo the multiplication (divide both sides by 5 to get x = 5).",
          "For equations with brackets like 4(y − 3) = 20, you can divide both sides by 4 first to get y − 3 = 5, then add 3 to get y = 8. Alternatively, expand the brackets first: 4y − 12 = 20.",
          "When the unknown appears on both sides — for example 5x + 3 = 2x + 18 — subtract the smaller x term from both sides first: 3x + 3 = 18, then solve as normal to get x = 5.",
        ],
        latexBlocks: [
          "5x + 8 = 33 \\Rightarrow 5x = 25 \\Rightarrow x = 5",
          "4(y - 3) = 20 \\Rightarrow y - 3 = 5 \\Rightarrow y = 8",
          "5x + 3 = 2x + 18 \\Rightarrow 3x = 15 \\Rightarrow x = 5",
        ],
      },
      guidedPractice: [
        financeChoice(
          "formula-solve-g1",
          "What is the first step to solve 3x + 7 = 22?",
          "A",
          ["Subtract 7 from both sides", "Divide both sides by 3", "Add 7 to both sides", "Multiply by 3"],
          "Undo the addition of 7 first: 3x + 7 − 7 = 22 − 7, giving 3x = 15.",
        ),
        {
          id: "formula-solve-g2",
          prompt: "Solve 3x + 7 = 22. Find x.",
          latex: "3x + 7 = 22",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 7 from both sides first, then divide by 3.",
          explanation: "Subtract 7: 3x = 15. Divide by 3: x = 5. Check: 3(5) + 7 = 22.",
        },
        {
          id: "formula-solve-g3",
          prompt: "Solve 4(x + 1) = 28. Find x.",
          latex: "4(x + 1) = 28",
          answer: "6",
          acceptedAnswers: [],
          hint: "Divide both sides by 4 first to simplify the bracket.",
          explanation: "Divide by 4: x + 1 = 7. Subtract 1: x = 6. Check: 4(6 + 1) = 28.",
        },
        {
          id: "formula-solve-g4",
          prompt: "A hire cost is C = 15 + 8h. If C = 55, find h.",
          latex: "15 + 8h = 55",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 15 from both sides first, then divide by 8.",
          explanation: "Subtract 15: 8h = 40. Divide by 8: h = 5 hours.",
        },
      ],
      independentPractice: [
        {
          id: "formula-solve-i1",
          prompt: "Solve 6x − 5 = 37. Find x.",
          latex: "6x - 5 = 37",
          answer: "7",
          acceptedAnswers: [],
          hint: "Add 5 to both sides first, then divide by 6.",
          explanation: "Add 5: 6x = 42. Divide by 6: x = 7. Check: 6(7) − 5 = 37.",
        },
        {
          id: "formula-solve-i2",
          prompt: "Solve 2(x + 4) = 26. Find x.",
          latex: "2(x + 4) = 26",
          answer: "9",
          acceptedAnswers: [],
          hint: "Divide both sides by 2 first to remove the bracket multiplier.",
          explanation: "Divide by 2: x + 4 = 13. Subtract 4: x = 9. Check: 2(9 + 4) = 26.",
        },
        {
          id: "formula-solve-i3",
          prompt: "A cost formula is C = 25 + 6n. If C = 61, find n.",
          latex: "25 + 6n = 61",
          answer: "6",
          acceptedAnswers: [],
          hint: "Subtract 25 from both sides first.",
          explanation: "Subtract 25: 6n = 36. Divide by 6: n = 6.",
        },
        {
          id: "formula-solve-i4",
          prompt: "Solve 5x + 3 = 2x + 18. Find x.",
          latex: "5x + 3 = 2x + 18",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 2x from both sides to collect x terms on the left.",
          explanation: "Subtract 2x: 3x + 3 = 18. Subtract 3: 3x = 15. Divide by 3: x = 5.",
        },
        financeChoice(
          "formula-solve-i5",
          "Which is the correct first step to solve 2(3x − 1) = 16?",
          "A",
          ["Divide both sides by 2: 3x − 1 = 8", "Add 1 to both sides", "Divide by 3x", "Multiply both sides by 2"],
          "Dividing both sides by 2 removes the bracket multiplier: 3x − 1 = 8.",
        ),
      ],
      commonMistakes: [
        { mistake: "In 5x + 8 = 33, dividing by 5 before subtracting 8.", fix: "Undo addition and subtraction first: subtract 8 to get 5x = 25, then divide by 5." },
        { mistake: "In 4(y − 3) = 20, subtracting 4 instead of dividing by 4.", fix: "The 4 is a multiplier of the bracket, not an addend — divide both sides by 4." },
        { mistake: "In 5x + 3 = 2x + 18, subtracting 5x from the left only.", fix: "Whatever is done to one side must be done to the other: subtract 2x from both sides." },
        { mistake: "Forgetting to check the answer by substituting back.", fix: "After finding x, substitute it back into the original equation to verify both sides are equal." },
      ],
      masteryQuiz: [
        {
          id: "formula-solve-m1",
          prompt: "Solve 7x − 4 = 31. Find x.",
          latex: "7x - 4 = 31",
          answer: "5",
          acceptedAnswers: [],
          hint: "Add 4 to both sides first.",
          explanation: "Add 4: 7x = 35. Divide by 7: x = 5.",
        },
        {
          id: "formula-solve-m2",
          prompt: "Solve 3(x + 5) = 33. Find x.",
          latex: "3(x + 5) = 33",
          answer: "6",
          acceptedAnswers: [],
          hint: "Divide both sides by 3 first.",
          explanation: "Divide by 3: x + 5 = 11. Subtract 5: x = 6.",
        },
        financeChoice(
          "formula-solve-m3",
          "Which correctly starts solving 2x + 9 = 25?",
          "A",
          ["Subtract 9 from both sides", "Divide both sides by 2 first", "Add 9 to both sides", "Multiply both sides by 2"],
          "Undo addition before division: subtract 9 to get 2x = 16, then divide by 2.",
        ),
        {
          id: "formula-solve-m4",
          prompt: "A phone plan costs C = 20 + 5g. If C = 60, find g.",
          latex: "20 + 5g = 60",
          answer: "8",
          acceptedAnswers: [],
          hint: "Subtract 20 from both sides first.",
          explanation: "Subtract 20: 5g = 40. Divide by 5: g = 8 GB.",
        },
        {
          id: "formula-solve-m5",
          prompt: "Solve 4x − 7 = 2x + 5. Find x.",
          latex: "4x - 7 = 2x + 5",
          answer: "6",
          acceptedAnswers: [],
          hint: "Subtract 2x from both sides first.",
          explanation: "Subtract 2x: 2x − 7 = 5. Add 7: 2x = 12. Divide by 2: x = 6.",
        },
        {
          id: "formula-solve-m6",
          prompt: "Solve 5(2x − 1) = 45. Find x.",
          latex: "5(2x - 1) = 45",
          answer: "5",
          acceptedAnswers: [],
          hint: "Divide both sides by 5 first.",
          explanation: "Divide by 5: 2x − 1 = 9. Add 1: 2x = 10. Divide by 2: x = 5.",
        },
        financeChoice(
          "formula-solve-m7",
          "The solution to 8x + 2 = 34 is:",
          "B",
          ["x = 3", "x = 4", "x = 5", "x = 6"],
          "Subtract 2: 8x = 32. Divide by 8: x = 4.",
        ),
        {
          id: "formula-solve-m8",
          prompt: "A delivery fee is C = 18 + 7n. If C = 67, find n.",
          latex: "18 + 7n = 67",
          answer: "7",
          acceptedAnswers: [],
          hint: "Subtract 18 from both sides, then divide by 7.",
          explanation: "Subtract 18: 7n = 49. Divide by 7: n = 7.",
        },
        {
          id: "formula-solve-m9",
          prompt: "Solve 3(x + 4) = 2(x + 9). Find x.",
          latex: "3(x + 4) = 2(x + 9)",
          answer: "6",
          acceptedAnswers: [],
          hint: "Expand both brackets, then collect x terms on one side.",
          explanation: "Expand: 3x + 12 = 2x + 18. Subtract 2x: x + 12 = 18. Subtract 12: x = 6.",
        },
        {
          id: "formula-solve-m10",
          prompt: "A car park charges $3 entry plus $5 per hour. If the total is $28, how many hours did the car park?",
          latex: "3 + 5h = 28",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 3 from both sides, then divide by 5.",
          explanation: "Subtract 3: 5h = 25. Divide by 5: h = 5 hours.",
        },
      ],
    };
  }

  if (lesson.slug === "nonlinear-models-context") {
    return {
      ...base,
      description:
        "Evaluate non-linear formulas involving squares and square roots, and recognise when a relationship is quadratic rather than linear.",
      learningIntention:
        "Apply formulas with squares and square roots to practical contexts and recognise non-linear growth.",
      successCriteria: [
        "Apply the order of operations correctly: evaluate powers before multiplication.",
        "Substitute values into formulas involving squares such as A = s² and A = πr².",
        "Substitute values into formulas involving two terms such as d = 0.01v² + 0.4v.",
        "Recognise that squaring a value produces non-linear growth.",
      ],
      teaching: {
        paragraphs: [
          "Not all practical relationships are straight lines. When a formula includes a variable that is squared, the output grows much faster as the input increases — this is called a non-linear or quadratic relationship.",
          "The area of a square with side s is A = s². If you double the side length, the area becomes (2s)² = 4s² — four times larger, not twice as large. This is why squaring produces non-linear growth.",
          "When substituting into a formula with a square, always apply the power first. In d = 0.01v² + 0.4v, compute v² before multiplying by 0.01. Getting the order of operations right is the most common place to make an error.",
          "Practical formulas with squares include stopping distance (d = 0.01v² + 0.4v), circle area (A = πr²), and volume of a cube (V = s³). These appear throughout the Standard course.",
        ],
        latexBlocks: [
          "A = s^2 \\quad \\text{(square area)}",
          "A = \\pi r^2 \\quad \\text{(circle area, use } \\pi \\approx 3.14\\text{)}",
          "d = 0.01v^2 + 0.4v \\quad \\text{(stopping distance)}",
        ],
      },
      guidedPractice: [
        financeChoice(
          "formula-nonlin-g1",
          "In the formula A = s², if s = 5, what is the first step?",
          "A",
          ["Evaluate 5² = 25", "Multiply s by 2", "Divide A by s", "Find the square root of s"],
          "The formula means multiply s by itself: 5² = 5 × 5 = 25.",
        ),
        {
          id: "formula-nonlin-g2",
          prompt: "The area of a square garden is A = s². Find A when s = 9 m.",
          latex: "A = s^2,\\quad s = 9",
          answer: "81",
          acceptedAnswers: [],
          hint: "Multiply 9 by itself.",
          explanation: "A = 9² = 9 × 9 = 81 m².",
        },
        {
          id: "formula-nonlin-g3",
          prompt: "Find the area of a circle with radius r = 10 m. Use A = πr² and π ≈ 3.14.",
          latex: "A = \\pi r^2,\\quad r = 10,\\quad \\pi \\approx 3.14",
          answer: "314",
          acceptedAnswers: [],
          hint: "Square r first: 10² = 100. Then multiply by 3.14.",
          explanation: "A = 3.14 × 10² = 3.14 × 100 = 314 m².",
        },
        {
          id: "formula-nonlin-g4",
          prompt: "Stopping distance is d = 0.01v² + 0.4v. Find d when v = 20.",
          latex: "d = 0.01v^2 + 0.4v,\\quad v = 20",
          answer: "12",
          acceptedAnswers: [],
          hint: "Square v first: 20² = 400. Then calculate each term separately.",
          explanation: "v² = 400. d = 0.01(400) + 0.4(20) = 4 + 8 = 12 m.",
        },
      ],
      independentPractice: [
        {
          id: "formula-nonlin-i1",
          prompt: "Find the area of a square floor tile using A = s². The tile has side length s = 12 cm.",
          latex: "A = s^2,\\quad s = 12",
          answer: "144",
          acceptedAnswers: [],
          hint: "Multiply 12 by itself.",
          explanation: "A = 12² = 12 × 12 = 144 cm².",
        },
        {
          id: "formula-nonlin-i2",
          prompt: "The volume of a cube is V = s³. Find V when s = 4 cm.",
          latex: "V = s^3,\\quad s = 4",
          answer: "64",
          acceptedAnswers: [],
          hint: "Multiply 4 by itself three times: 4 × 4 × 4.",
          explanation: "V = 4³ = 4 × 4 × 4 = 64 cm³.",
        },
        {
          id: "formula-nonlin-i3",
          prompt: "Find the area of a circle with radius r = 5 m. Use A = πr² and π ≈ 3.14.",
          latex: "A = \\pi r^2,\\quad r = 5,\\quad \\pi \\approx 3.14",
          answer: "78.5",
          acceptedAnswers: ["78.50"],
          hint: "Square 5 first: 5² = 25. Then multiply by 3.14.",
          explanation: "A = 3.14 × 5² = 3.14 × 25 = 78.5 m².",
        },
        {
          id: "formula-nonlin-i4",
          prompt: "Stopping distance is d = 0.01v² + 0.4v. Find d when v = 30.",
          latex: "d = 0.01v^2 + 0.4v,\\quad v = 30",
          answer: "21",
          acceptedAnswers: [],
          hint: "v² = 900. Calculate 0.01 × 900 and 0.4 × 30 separately, then add.",
          explanation: "v² = 900. d = 0.01(900) + 0.4(30) = 9 + 12 = 21 m.",
        },
        financeChoice(
          "formula-nonlin-i5",
          "Kinetic energy is KE = 0.5mv². If m = 2 and v = 6, what is v²?",
          "C",
          ["6", "3", "36", "12"],
          "v² = 6² = 6 × 6 = 36. Square v before multiplying by m or 0.5.",
        ),
      ],
      commonMistakes: [
        { mistake: "In A = s² with s = 9, multiplying 9 by 2 instead of squaring: getting 18 instead of 81.", fix: "The ² means multiply s by itself: 9² = 9 × 9 = 81, not 9 × 2." },
        { mistake: "In d = 0.01v² + 0.4v, computing 0.01v first and then squaring.", fix: "Square v first: v² = v × v. Then multiply the result by 0.01." },
        { mistake: "In A = πr², multiplying π by r and then squaring the whole thing.", fix: "Square r first, then multiply by π: A = π × r², not (π × r)²." },
        { mistake: "Thinking that doubling the side length doubles the area.", fix: "Area involves a square, so doubling the side quadruples the area: (2s)² = 4s²." },
      ],
      masteryQuiz: [
        {
          id: "formula-nonlin-m1",
          prompt: "Find the area of a square with side s = 15 m using A = s².",
          latex: "A = s^2,\\quad s = 15",
          answer: "225",
          acceptedAnswers: [],
          hint: "15 × 15 = ?",
          explanation: "A = 15² = 15 × 15 = 225 m².",
        },
        {
          id: "formula-nonlin-m2",
          prompt: "Find the volume of a cube with side s = 5 cm using V = s³.",
          latex: "V = s^3,\\quad s = 5",
          answer: "125",
          acceptedAnswers: [],
          hint: "Multiply 5 by itself three times.",
          explanation: "V = 5³ = 5 × 5 × 5 = 125 cm³.",
        },
        financeChoice(
          "formula-nonlin-m3",
          "In A = πr², if the radius is doubled, the area becomes:",
          "C",
          ["Doubled", "Tripled", "Quadrupled", "Unchanged"],
          "Doubling r gives (2r)² = 4r², so the area is multiplied by 4.",
        ),
        {
          id: "formula-nonlin-m4",
          prompt: "Find the area of a circle with radius r = 5 m. Use A = πr² and π ≈ 3.14.",
          latex: "A = \\pi r^2,\\quad r = 5,\\quad \\pi \\approx 3.14",
          answer: "78.5",
          acceptedAnswers: ["78.50"],
          hint: "5² = 25. Multiply by 3.14.",
          explanation: "A = 3.14 × 25 = 78.5 m².",
        },
        {
          id: "formula-nonlin-m5",
          prompt: "Stopping distance is d = 0.01v² + 0.4v. Find d when v = 50.",
          latex: "d = 0.01v^2 + 0.4v,\\quad v = 50",
          answer: "45",
          acceptedAnswers: [],
          hint: "v² = 2500. Calculate 0.01 × 2500 and 0.4 × 50 separately.",
          explanation: "v² = 2500. d = 0.01(2500) + 0.4(50) = 25 + 20 = 45 m.",
        },
        {
          id: "formula-nonlin-m6",
          prompt: "Find the area of a circle with radius r = 10 m. Use A = πr² and π ≈ 3.14.",
          latex: "A = \\pi r^2,\\quad r = 10,\\quad \\pi \\approx 3.14",
          answer: "314",
          acceptedAnswers: [],
          hint: "10² = 100. Multiply by 3.14.",
          explanation: "A = 3.14 × 100 = 314 m².",
        },
        financeChoice(
          "formula-nonlin-m7",
          "Using just the quadratic term d = 0.01v², find d when v = 10.",
          "B",
          ["0.1", "1", "10", "100"],
          "v² = 100. d = 0.01 × 100 = 1.",
        ),
        {
          id: "formula-nonlin-m8",
          prompt: "Kinetic energy is KE = 0.5mv². Find KE when m = 4 and v = 5.",
          latex: "KE = 0.5mv^2,\\quad m = 4,\\quad v = 5",
          answer: "50",
          acceptedAnswers: [],
          hint: "Square v first: 5² = 25. Then multiply 0.5 × 4 × 25.",
          explanation: "v² = 25. KE = 0.5 × 4 × 25 = 2 × 25 = 50.",
        },
        {
          id: "formula-nonlin-m9",
          prompt: "A square garden has area A = s² = 64 m². Find its perimeter using P = 4s.",
          latex: "A = s^2 = 64,\\quad P = 4s",
          answer: "32",
          acceptedAnswers: [],
          hint: "Find s from s² = 64, then use P = 4s.",
          explanation: "s² = 64, so s = 8 m. P = 4 × 8 = 32 m.",
        },
        {
          id: "formula-nonlin-m10",
          prompt: "Stopping distance is d = 0.01v² + 0.4v. Find d when v = 80.",
          latex: "d = 0.01v^2 + 0.4v,\\quad v = 80",
          answer: "96",
          acceptedAnswers: [],
          hint: "v² = 6400. Calculate 0.01 × 6400 and 0.4 × 80 separately, then add.",
          explanation: "v² = 6400. d = 0.01(6400) + 0.4(80) = 64 + 32 = 96 m.",
        },
      ],
    };
  }

  if (lesson.slug === "simultaneous-equations-context") {
    return {
      ...base,
      description:
        "Set up and solve pairs of practical linear equations to find where two models give the same output, such as equal-cost or break-even situations.",
      learningIntention:
        "Find the simultaneous solution of two linear models by setting them equal and solving algebraically.",
      successCriteria: [
        "Set two practical rules equal to each other to form one equation.",
        "Solve that equation to find the input value where both models agree.",
        "Substitute back to find the common output value.",
        "Interpret the solution in its practical context.",
      ],
      teaching: {
        paragraphs: [
          "Sometimes two different practical rules describe the same situation — for example, two companies quoting costs for the same job. The simultaneous solution is the input value at which both rules give exactly the same output.",
          "To find the simultaneous solution, set the two rules equal to each other. This turns a two-equation problem into a single equation in one unknown, which you can solve with inverse operations.",
          "For example, Taxi A charges C = 8 + 2d and Taxi B charges C = 3 + 3d. Setting them equal gives 8 + 2d = 3 + 3d. Subtracting 2d from both sides: 8 = 3 + d. Subtracting 3: d = 5. At 5 km, both taxis charge the same fare.",
          "After finding the common input, substitute it back into either original rule to find the common output. In the taxi example, C = 8 + 2(5) = $18.",
        ],
        latexBlocks: [
          "\\text{If } C_A = 8 + 2d \\text{ and } C_B = 3 + 3d",
          "\\text{set equal: } 8 + 2d = 3 + 3d \\Rightarrow d = 5",
          "\\text{common cost: } C = 8 + 2(5) = \\$18",
        ],
      },
      guidedPractice: [
        financeChoice(
          "formula-simul-g1",
          "Two plans A: C = 10 + 4g and B: C = 20 + 2g. To find when they cost the same, you should:",
          "B",
          ["Add the two equations", "Set them equal: 10 + 4g = 20 + 2g", "Find the product of the two costs", "Divide plan A by plan B"],
          "Setting the costs equal creates one equation in g, which can then be solved.",
        ),
        {
          id: "formula-simul-g2",
          prompt: "Plan A: C = 10 + 4g. Plan B: C = 20 + 2g. Solve 10 + 4g = 20 + 2g for g.",
          latex: "10 + 4g = 20 + 2g",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 2g from both sides, then subtract 10 from both sides.",
          explanation: "Subtract 2g: 10 + 2g = 20. Subtract 10: 2g = 10. Divide by 2: g = 5.",
        },
        {
          id: "formula-simul-g3",
          prompt: "Using g = 5, find the cost for Plan A using C = 10 + 4g.",
          latex: "C = 10 + 4g,\\quad g = 5",
          answer: "30",
          acceptedAnswers: [],
          hint: "Substitute g = 5 into the rule for Plan A.",
          explanation: "C = 10 + 4(5) = 10 + 20 = 30.",
        },
        {
          id: "formula-simul-g4",
          prompt: "Taxi A: C = 8 + 2d. Taxi B: C = 3 + 3d. Find the distance d where both fares are equal.",
          latex: "8 + 2d = 3 + 3d",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 2d from both sides, then subtract 3 from both sides.",
          explanation: "Subtract 2d: 8 = 3 + d. Subtract 3: d = 5 km.",
        },
      ],
      independentPractice: [
        {
          id: "formula-simul-i1",
          prompt: "Hire company A costs C = 15 + 4h. Company B costs C = 5 + 6h. Find h where both cost the same.",
          latex: "15 + 4h = 5 + 6h",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 4h from both sides, then solve for h.",
          explanation: "Subtract 4h: 15 = 5 + 2h. Subtract 5: 10 = 2h. Divide by 2: h = 5.",
        },
        {
          id: "formula-simul-i2",
          prompt: "For h = 5, find the equal cost using C = 15 + 4h.",
          latex: "C = 15 + 4h,\\quad h = 5",
          answer: "35",
          acceptedAnswers: [],
          hint: "Substitute h = 5 into the rule for Company A.",
          explanation: "C = 15 + 4(5) = 15 + 20 = 35.",
        },
        {
          id: "formula-simul-i3",
          prompt: "Savings account A: S = 80 + 30w. Savings account B: S = 200 + 10w. After how many weeks w do both have the same balance?",
          latex: "80 + 30w = 200 + 10w",
          answer: "6",
          acceptedAnswers: [],
          hint: "Subtract 10w from both sides, then subtract 80.",
          explanation: "Subtract 10w: 80 + 20w = 200. Subtract 80: 20w = 120. Divide by 20: w = 6.",
        },
        {
          id: "formula-simul-i4",
          prompt: "Company A charges C = 20 + 3d for deliveries. Company B charges C = 8 + 5d. Find the distance d where both charge the same.",
          latex: "20 + 3d = 8 + 5d",
          answer: "6",
          acceptedAnswers: [],
          hint: "Subtract 3d from both sides, then subtract 8.",
          explanation: "Subtract 3d: 20 = 8 + 2d. Subtract 8: 12 = 2d. Divide by 2: d = 6 km.",
        },
        financeChoice(
          "formula-simul-i5",
          "To solve 15 + 4h = 5 + 6h, the best first step is:",
          "B",
          ["Subtract 5 from both sides", "Subtract 4h from both sides to collect h terms", "Divide by 4h", "Add 4h and 6h together"],
          "Subtracting 4h from both sides collects all h terms on the right: 15 = 5 + 2h.",
        ),
      ],
      commonMistakes: [
        { mistake: "Adding the two equations instead of setting them equal.", fix: "To find where two models agree, set them equal: C₁ = C₂. Adding them gives an unrelated expression." },
        { mistake: "After finding the common input, forgetting to find the common output.", fix: "The simultaneous solution has two parts: the input value and the common output. Substitute back into either rule to find the output." },
        { mistake: "Subtracting the wrong x term and getting a negative coefficient.", fix: "Subtract the smaller x term from both sides so the x coefficient stays positive and the next step is simpler." },
        { mistake: "Using the wrong rule to find the common cost.", fix: "Either rule gives the same common cost. Substituting into both is a good check." },
      ],
      masteryQuiz: [
        {
          id: "formula-simul-m1",
          prompt: "Solve 3 + 5x = 13 + 3x. Find x.",
          latex: "3 + 5x = 13 + 3x",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 3x from both sides, then subtract 3.",
          explanation: "Subtract 3x: 3 + 2x = 13. Subtract 3: 2x = 10. Divide by 2: x = 5.",
        },
        financeChoice(
          "formula-simul-m2",
          "Plan X: C = 5 + 3n. Plan Y: C = 11 + n. At which value of n are both costs equal?",
          "B",
          ["n = 2", "n = 3", "n = 4", "n = 5"],
          "5 + 3n = 11 + n → 2n = 6 → n = 3. Check: Plan X = 14, Plan Y = 14.",
        ),
        {
          id: "formula-simul-m3",
          prompt: "Plan A: C = 30 + 2n. Plan B: C = 10 + 4n. Find n where both plans cost the same.",
          latex: "30 + 2n = 10 + 4n",
          answer: "10",
          acceptedAnswers: [],
          hint: "Subtract 2n from both sides, then subtract 10.",
          explanation: "Subtract 2n: 30 = 10 + 2n. Subtract 10: 20 = 2n. Divide by 2: n = 10.",
        },
        {
          id: "formula-simul-m4",
          prompt: "For n = 10, find the equal cost using C = 30 + 2n.",
          latex: "C = 30 + 2n,\\quad n = 10",
          answer: "50",
          acceptedAnswers: [],
          hint: "Substitute n = 10 into Plan A.",
          explanation: "C = 30 + 2(10) = 30 + 20 = 50.",
        },
        {
          id: "formula-simul-m5",
          prompt: "Electricity provider A charges C = 80 + 0.20k. Provider B charges C = 20 + 0.50k. Find the usage k (in kWh) where both cost the same.",
          latex: "80 + 0.20k = 20 + 0.50k",
          answer: "200",
          acceptedAnswers: [],
          hint: "Subtract 0.20k from both sides, then subtract 20.",
          explanation: "Subtract 0.20k: 80 = 20 + 0.30k. Subtract 20: 60 = 0.30k. Divide by 0.30: k = 200 kWh.",
        },
        {
          id: "formula-simul-m6",
          prompt: "For k = 200 kWh, find the equal cost using C = 80 + 0.20k.",
          latex: "C = 80 + 0.20k,\\quad k = 200",
          answer: "120",
          acceptedAnswers: [],
          hint: "Substitute k = 200 into Provider A's rule.",
          explanation: "C = 80 + 0.20(200) = 80 + 40 = 120.",
        },
        financeChoice(
          "formula-simul-m7",
          "The simultaneous solution to two practical linear models gives the point where:",
          "B",
          ["One model has a steeper gradient", "Both models give the same output for the same input", "The sum of the two outputs is largest", "One model stops being valid"],
          "The simultaneous solution is where the two rules intersect — same input, same output.",
        ),
        {
          id: "formula-simul-m8",
          prompt: "Taxi A: C = 6 + 1.5d. Taxi B: C = 2 + 2.5d. Find the distance d where both fares are equal.",
          latex: "6 + 1.5d = 2 + 2.5d",
          answer: "4",
          acceptedAnswers: [],
          hint: "Subtract 1.5d from both sides, then subtract 2.",
          explanation: "Subtract 1.5d: 6 = 2 + d. Subtract 2: d = 4 km.",
        },
        {
          id: "formula-simul-m9",
          prompt: "For d = 4 km, find the equal fare using C = 6 + 1.5d.",
          latex: "C = 6 + 1.5d,\\quad d = 4",
          answer: "12",
          acceptedAnswers: [],
          hint: "Substitute d = 4 into Taxi A's rule.",
          explanation: "C = 6 + 1.5(4) = 6 + 6 = 12.",
        },
        {
          id: "formula-simul-m10",
          prompt: "Internet Plan A total cost after n months: C = 45 + 8n. Plan B: C = 25 + 13n. After how many months are the total costs equal?",
          latex: "45 + 8n = 25 + 13n",
          answer: "4",
          acceptedAnswers: [],
          hint: "Subtract 8n from both sides, then subtract 25.",
          explanation: "Subtract 8n: 45 = 25 + 5n. Subtract 25: 20 = 5n. Divide by 5: n = 4 months.",
        },
      ],
    };
  }

  if (lesson.slug === "inequalities-in-context") {
    return {
      ...base,
      description:
        "Read, set up and solve linear inequalities using correct notation, and interpret solutions as maximum or minimum values in practical constraint problems.",
      learningIntention:
        "Use inequality notation to model practical constraints and solve for maximum or minimum values.",
      successCriteria: [
        "Read and write inequalities using >, <, ≥ and ≤ correctly.",
        "Set up a linear inequality from a practical constraint.",
        "Solve a linear inequality using the same steps as solving an equation.",
        "Interpret the solution as a maximum or minimum whole number in context.",
      ],
      teaching: {
        paragraphs: [
          "An inequality compares two expressions that are not necessarily equal. The symbols >, <, ≥ and ≤ each describe a different relationship. For example, 'a maximum load of 500 kg' means w ≤ 500 — the weight can be 500 kg or less.",
          "Solving a linear inequality uses the same inverse operations as solving an equation. For 3x + 4 < 19, subtract 4 from both sides to get 3x < 15, then divide by 3 to get x < 5.",
          "There is one important difference from equations: if you divide or multiply both sides by a negative number, the inequality sign reverses. In Standard course problems, this is usually avoided by keeping the positive coefficient on the variable side.",
          "The solution to an inequality is a range of values. 'x ≤ 10' means any whole number from 10 downward. In a practical context, this might mean 'at most 10 items can be ordered'.",
        ],
        latexBlocks: [
          "x \\leq 500 \\quad \\text{(at most 500)}",
          "x \\geq 13 \\quad \\text{(at least 13)}",
          "60 + 14n \\leq 200 \\Rightarrow 14n \\leq 140 \\Rightarrow n \\leq 10",
        ],
      },
      guidedPractice: [
        financeChoice(
          "formula-ineq-g1",
          "A sign reads 'maximum 150 bikes'. Which inequality models the number b of bikes?",
          "C",
          ["b > 150", "b < 150", "b ≤ 150", "b ≥ 150"],
          "'Maximum 150' means no more than 150: b ≤ 150.",
        ),
        {
          id: "formula-ineq-g2",
          prompt: "Solve 2x + 3 ≤ 11. Find the largest whole number value of x.",
          latex: "2x + 3 \\leq 11",
          answer: "4",
          acceptedAnswers: [],
          hint: "Subtract 3 from both sides, then divide by 2.",
          explanation: "Subtract 3: 2x ≤ 8. Divide by 2: x ≤ 4. Largest whole number: 4.",
        },
        {
          id: "formula-ineq-g3",
          prompt: "A budget of $80 allows at least $8 to remain after buying t tickets at $12 each. Solve 12t ≤ 72 to find the maximum number of tickets.",
          latex: "12t \\leq 72",
          answer: "6",
          acceptedAnswers: [],
          hint: "Divide both sides by 12.",
          explanation: "Divide by 12: t ≤ 6. Maximum tickets: 6.",
        },
        {
          id: "formula-ineq-g4",
          prompt: "Solve 4x − 1 < 15. Find the largest whole number value of x.",
          latex: "4x - 1 < 15",
          answer: "3",
          acceptedAnswers: [],
          hint: "Add 1 to both sides first, then divide by 4.",
          explanation: "Add 1: 4x < 16. Divide by 4: x < 4. The largest whole number strictly less than 4 is 3.",
        },
      ],
      independentPractice: [
        {
          id: "formula-ineq-i1",
          prompt: "Solve 3x + 7 ≤ 25. Find the largest whole number value of x.",
          latex: "3x + 7 \\leq 25",
          answer: "6",
          acceptedAnswers: [],
          hint: "Subtract 7, then divide by 3.",
          explanation: "Subtract 7: 3x ≤ 18. Divide by 3: x ≤ 6. Largest whole number: 6.",
        },
        {
          id: "formula-ineq-i2",
          prompt: "A lift can carry at most 600 kg. Six equal boxes are loaded. Find the maximum weight per box.",
          latex: "6b \\leq 600",
          answer: "100",
          acceptedAnswers: [],
          hint: "Divide both sides by 6.",
          explanation: "Divide by 6: b ≤ 100. Maximum weight per box: 100 kg.",
        },
        {
          id: "formula-ineq-i3",
          prompt: "Solve 5x − 3 < 22. Find the largest whole number value of x.",
          latex: "5x - 3 < 22",
          answer: "4",
          acceptedAnswers: [],
          hint: "Add 3 to both sides, then divide by 5.",
          explanation: "Add 3: 5x < 25. Divide by 5: x < 5. The largest whole number strictly less than 5 is 4.",
        },
        financeChoice(
          "formula-ineq-i4",
          "After solving 2x + 10 ≤ 30 to get 2x ≤ 20, the final step is:",
          "C",
          ["Add 10 to both sides", "Multiply both sides by 2", "Divide both sides by 2", "Subtract 2 from both sides"],
          "Divide both sides by 2 to isolate x: x ≤ 10.",
        ),
        {
          id: "formula-ineq-i5",
          prompt: "A budget allows at most $120. A fixed entry fee is $16 and snacks cost $8 each. Find the maximum number of snacks that can be bought.",
          latex: "16 + 8n \\leq 120",
          answer: "13",
          acceptedAnswers: [],
          hint: "Subtract 16 from both sides, then divide by 8.",
          explanation: "Subtract 16: 8n ≤ 104. Divide by 8: n ≤ 13. Maximum snacks: 13.",
        },
      ],
      commonMistakes: [
        { mistake: "Confusing ≤ (at most) with ≥ (at least).", fix: "'Maximum 10' means no more than 10 items, so use ≤ 10. 'Minimum 5' means at least 5, so use ≥ 5." },
        { mistake: "Solving an inequality as an equation and giving a single value instead of a range.", fix: "An inequality solution is a range: x ≤ 4 means 4, 3, 2, 1, 0, -1, ... all satisfy it. The question then asks for the maximum or minimum whole number." },
        { mistake: "In 4x - 1 < 15, getting x < 4 but then giving 4 as the largest whole number.", fix: "x < 4 means x is strictly less than 4. The largest whole number satisfying this is 3, not 4." },
        { mistake: "Forgetting to set up the inequality before solving.", fix: "Read the constraint carefully and write the inequality first: 'at most $200' means total ≤ 200." },
      ],
      masteryQuiz: [
        financeChoice(
          "formula-ineq-m1",
          "Which symbol means 'at least'?",
          "C",
          ["> (greater than)", "< (less than)", "≥ (greater than or equal to)", "≤ (less than or equal to)"],
          "'At least 5' means 5 or more, which is written ≥ 5.",
        ),
        {
          id: "formula-ineq-m2",
          prompt: "Solve 5x + 2 ≤ 27. Find the largest whole number value of x.",
          latex: "5x + 2 \\leq 27",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 2, then divide by 5.",
          explanation: "Subtract 2: 5x ≤ 25. Divide by 5: x ≤ 5. Largest whole number: 5.",
        },
        {
          id: "formula-ineq-m3",
          prompt: "Solve 3x − 4 > 8. Find the smallest whole number value of x that satisfies the inequality.",
          latex: "3x - 4 > 8",
          answer: "5",
          acceptedAnswers: [],
          hint: "Add 4 to both sides, then divide by 3. x must be strictly greater than the result.",
          explanation: "Add 4: 3x > 12. Divide by 3: x > 4. The smallest whole number strictly greater than 4 is 5.",
        },
        {
          id: "formula-ineq-m4",
          prompt: "A lift holds at most 750 kg. Equipment already loaded: 90 kg. Six equal crates are added. Find the maximum weight per crate.",
          latex: "90 + 6c \\leq 750",
          answer: "110",
          acceptedAnswers: [],
          hint: "Subtract 90 from both sides, then divide by 6.",
          explanation: "Subtract 90: 6c ≤ 660. Divide by 6: c ≤ 110. Maximum weight per crate: 110 kg.",
        },
        {
          id: "formula-ineq-m5",
          prompt: "Solve 6x + 5 ≤ 35. Find the largest whole number value of x.",
          latex: "6x + 5 \\leq 35",
          answer: "5",
          acceptedAnswers: [],
          hint: "Subtract 5, then divide by 6.",
          explanation: "Subtract 5: 6x ≤ 30. Divide by 6: x ≤ 5. Largest whole number: 5.",
        },
        financeChoice(
          "formula-ineq-m6",
          "The solution to 4x < 20 is:",
          "A",
          ["x < 5", "x > 5", "x ≤ 5", "x ≥ 5"],
          "Divide both sides by 4: x < 5. The inequality sign stays the same when dividing by a positive number.",
        ),
        {
          id: "formula-ineq-m7",
          prompt: "A student scored 68, 72 and 60 in three tests. She needs an average of at least 70 across 4 tests. What is the minimum score needed in the fourth test?",
          latex: "\\frac{68 + 72 + 60 + s}{4} \\geq 70",
          answer: "80",
          acceptedAnswers: [],
          hint: "Total needed ≥ 4 × 70 = 280. Current total = 68 + 72 + 60 = 200.",
          explanation: "Total needed ≥ 280. Current total = 200. Minimum fourth score = 280 − 200 = 80.",
        },
        {
          id: "formula-ineq-m8",
          prompt: "Solve 2(x + 3) ≤ 22. Find the largest whole number value of x.",
          latex: "2(x + 3) \\leq 22",
          answer: "8",
          acceptedAnswers: [],
          hint: "Divide both sides by 2 first.",
          explanation: "Divide by 2: x + 3 ≤ 11. Subtract 3: x ≤ 8. Largest whole number: 8.",
        },
        financeChoice(
          "formula-ineq-m9",
          "A problem says 'a maximum of 15 students can attend'. Which inequality models the number s of students?",
          "D",
          ["s > 15", "s < 15", "s ≥ 15", "s ≤ 15"],
          "'Maximum 15' means 15 or fewer: s ≤ 15.",
        ),
        {
          id: "formula-ineq-m10",
          prompt: "A company pays $12 per hour. An employee needs to earn at least $156. Find the minimum number of hours h they must work.",
          latex: "12h \\geq 156",
          answer: "13",
          acceptedAnswers: [],
          hint: "Divide both sides by 12.",
          explanation: "Divide by 12: h ≥ 13. Minimum hours: 13.",
        },
      ],
    };
  }

  if (lesson.slug === "formulae-equations-exam-practice") {
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
        "Formula and equation exam questions combine context, units and algebra, and the first decision is which job the question wants: substitute (every variable known but one — just compute it), solve (the unknown is tangled inside an equation to unpick), or rearrange (make a new variable the subject first).",
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
      formulaAnswer("formula-exam-g1", "A trip formula is d = st. If s = 90 km/h and t = 2 h, find d.", "d=st,\\quad s=90\\text{ km/h},\\quad t=2\\text{ h}", "180 km", ["180", "180km"]),
      formulaAnswer("formula-exam-g2", "Electricity cost is C = 0.32k + 8. Find C when k = 25.", "C=0.32k+8,\\quad k=25", "$16", ["16", "16.00", "$16.00"]),
      formulaAnswer("formula-exam-g3", "A delivery cost is C = 12 + 3n. If C = 39, find n.", "C=12+3n,\\quad C=39", "9", ["9 items", "9items"]),
      financeChoice("formula-exam-g4", "Which rearrangement makes h the subject of A = bh/2?", "B", ["h = A/(2b)", "h = 2A/b", "h = b/(2A)", "h = A - b/2"], "Multiply by 2, then divide by b."),
    ],
    independentPractice: [
      formulaAnswer("formula-exam-i1", "A simplified fuel formula is F = 0.08d. Find F for d = 250 km.", "F=0.08d,\\quad d=250\\text{ km}", "20 L", ["20", "20L", "20 litres"]),
      formulaAnswer("formula-exam-i2", "A parking formula is C = 8 + 4h. If C = 32, find h.", "C=8+4h,\\quad C=32", "6", ["6 h", "6 hours"]),
      formulaAnswer("formula-exam-i3", "The area formula A = lw is used for a room. Make l the subject.", "A=lw", "l = A/w", ["l=A/w", "l = A ÷ w"]),
      financeChoice("formula-exam-i4", "A stopping-distance formula includes v^2. A common mistake is:", "C", ["Using units", "Substituting v", "Forgetting to square v", "Checking reasonableness"], "The square must be applied before multiplying."),
      financeChoice("formula-exam-i5", "A formula answer in a cost context should usually include:", "A", ["Dollars", "Kilograms", "Degrees Celsius only", "No units"], "Cost is measured in dollars."),
    ],
    commonMistakes: [
      { mistake: "Picking a formula before identifying what the question is asking for.", fix: "Read the question and name the unknown first, then choose the matching formula." },
      { mistake: "In d = st, substituting numbers without rearranging when the question asks for t.", fix: "Rearrange to t = d/s first, then substitute — this avoids solving a messy equation." },
      { mistake: "Dropping units in practical answers.", fix: "Attach the unit from the context: km for distance, dollars for cost, litres for fuel." },
      { mistake: "Getting a negative distance or a cost in the thousands from a simple context.", fix: "Check that the size and sign of the answer make sense before writing it down." },
    ],
    masteryQuiz: [
      formulaAnswer("formula-exam-m1", "The stopping distance model is d = 0.01v^2 + 0.4v. Find d when v = 30.", "d=0.01v^2+0.4v,\\quad v=30", "21 m", ["21", "21m"]),
      formulaAnswer("formula-exam-m2", "A simplified dosage rule is D = 5w. Find D for w = 22 kg.", "D=5w,\\quad w=22\\text{ kg}", "110", ["110 mg", "110mg"]),
      formulaAnswer("formula-exam-m3", "A hire cost is C = 35 + 12h. If C = 95, find h.", "C=35+12h,\\quad C=95", "5", ["5 h", "5 hours"]),
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

  if (lesson.slug === "bac-formulas-medication-dosage") {
    return {
      ...base,
      description:
        "Apply the male and female BAC formulas to calculate blood alcohol content, use Time = BAC/0.015 to find when BAC reaches zero, identify limitations of BAC estimation, and apply Fried's, Young's and Clark's formulas for medication dosage.",
      learningIntention:
        "Use practical medical and safety formulas to calculate BAC and medication doses, and evaluate the limitations of formula-based estimates.",
      successCriteria: [
        "Substitute into the BAC formula for males and females to calculate blood alcohol content.",
        "Apply Time = BAC/0.015 to determine how many hours are needed for BAC to reach zero.",
        "Identify at least two limitations of formulas used to estimate BAC.",
        "Apply Fried's, Young's or Clark's formula to calculate a medication dose for a child given age or weight.",
      ],
      teaching: {
        paragraphs: [
          "Blood alcohol content (BAC) is a measure of the concentration of alcohol in the blood, expressed as grams per 100 mL. It depends on the number of standard drinks consumed, the hours spent drinking, and the person's body weight. Because males and females metabolise alcohol differently, separate formulas are used.",
          "The BAC formulas are: BAC_male = (10N − 7.5H) / (6.8M) and BAC_female = (10N − 7.5H) / (5.5M), where N is the number of standard drinks, H is the number of hours drinking, and M is the body mass in kilograms. A BAC of 0.05 means 0.05 g per 100 mL of blood — the legal driving limit in Australia.",
          "Once drinking stops, the body eliminates alcohol at a roughly constant rate. The time needed for BAC to reach zero is given by Time = BAC / 0.015. This formula has significant limitations: it assumes a constant elimination rate, does not account for individual variation, food intake, medications, or health conditions. A lower BAC reading does not guarantee fitness to drive.",
          "Medication dosage formulas adjust adult doses for children, who cannot safely receive the same dose as an adult. Fried's formula (for children 1–2 years): Dose = Age (in months) × Adult dose / 150. Young's formula (for children 1–12 years): Dose = Age (years) × Adult dose / (Age + 12). Clark's formula (based on weight): Dose = Weight (kg) × Adult dose / 70. Always use the formula specified in the question.",
        ],
        latexBlocks: [
          "\\text{BAC}_\\text{male} = \\frac{10N - 7.5H}{6.8M},\\quad \\text{BAC}_\\text{female} = \\frac{10N - 7.5H}{5.5M}",
          "\\text{Time (hours)} = \\frac{\\text{BAC}}{0.015}",
          "\\text{Young's formula: }D = \\frac{A}{A+12} \\times \\text{Adult dose}\\quad (A=\\text{age in years})",
          "\\text{Clark's formula: }D = \\frac{W}{70} \\times \\text{Adult dose}\\quad (W=\\text{weight in kg})",
        ],
      },
      workedExamples: [
        {
          title: "Calculating BAC for a male",
          questionLatex:
            "\\text{A male weighing 80 kg consumes 4 standard drinks over 2 hours. Calculate his BAC.}",
          steps: [
            {
              explanation: "Identify the values: N = 4 drinks, H = 2 hours, M = 80 kg. Use the male BAC formula.",
              latex: "\\text{BAC}_\\text{male} = \\frac{10N - 7.5H}{6.8M}",
            },
            {
              explanation: "Substitute the values into the formula.",
              latex: "\\text{BAC} = \\frac{10(4) - 7.5(2)}{6.8(80)} = \\frac{40 - 15}{544} = \\frac{25}{544}",
            },
            {
              explanation: "Calculate and round to 4 decimal places.",
              latex: "\\text{BAC} \\approx 0.0460",
            },
          ],
          finalAnswerLatex: "\\text{BAC} \\approx 0.046",
        },
        {
          title: "Time to reach zero BAC",
          questionLatex:
            "\\text{A driver has a BAC of 0.072. How many hours must pass before the BAC reaches zero? Use Time = BAC/0.015.}",
          steps: [
            {
              explanation: "Write the formula and substitute the BAC value.",
              latex: "\\text{Time} = \\frac{\\text{BAC}}{0.015} = \\frac{0.072}{0.015}",
            },
            {
              explanation: "Divide to find the time.",
              latex: "\\text{Time} = 4.8 \\text{ hours}",
            },
          ],
          finalAnswerLatex: "4.8 \\text{ hours}",
        },
        {
          title: "Medication dose using Young's formula",
          questionLatex:
            "\\text{The adult dose of a painkiller is 500 mg. Find the dose for a 6-year-old child using Young's formula.}",
          steps: [
            {
              explanation: "Young's formula: Dose = A/(A + 12) × Adult dose, where A = age in years.",
              latex: "D = \\frac{A}{A + 12} \\times 500",
            },
            {
              explanation: "Substitute A = 6.",
              latex: "D = \\frac{6}{6 + 12} \\times 500 = \\frac{6}{18} \\times 500",
            },
            {
              explanation: "Calculate the dose.",
              latex: "D = \\frac{1}{3} \\times 500 \\approx 167 \\text{ mg}",
            },
          ],
          finalAnswerLatex: "D \\approx 167 \\text{ mg}",
        },
      ],
      guidedPractice: [
        formulaAnswer(
          "y11s-bac-g1",
          "A female weighing 60 kg consumes 3 standard drinks over 1 hour. Calculate her BAC. Use BAC_female = (10N − 7.5H)/(5.5M).",
          "",
          "0.068",
          ["0.0682", "0.07"]
        ),
        formulaAnswer(
          "y11s-bac-g2",
          "A person has a BAC of 0.045. How many hours must pass before their BAC reaches zero? Use Time = BAC/0.015.",
          "",
          "3",
          ["3.0", "3 hours", "3h"]
        ),
        financeChoice(
          "y11s-bac-g3",
          "Which is a limitation of BAC formulas?",
          "B",
          [
            "They use body mass",
            "They assume a constant alcohol elimination rate for everyone",
            "They account for meal timing",
            "They vary by drink type",
          ],
          "BAC formulas assume a constant elimination rate, but individuals vary."
        ),
        formulaAnswer(
          "y11s-bac-g4",
          "The adult dose is 400 mg. Find the dose for an 8-year-old using Young's formula: D = A/(A+12) × Adult dose.",
          "",
          "160 mg",
          ["160", "160mg"]
        ),
      ],
      independentPractice: [
        formulaAnswer(
          "y11s-bac-i1",
          "A male weighing 70 kg consumes 5 standard drinks over 3 hours. Calculate his BAC. Use BAC_male = (10N − 7.5H)/(6.8M).",
          "",
          "0.058",
          ["0.0578", "0.06"]
        ),
        formulaAnswer(
          "y11s-bac-i2",
          "A person has a BAC of 0.096. How many hours until their BAC reaches zero? Use Time = BAC/0.015.",
          "",
          "6.4",
          ["6.4 hours", "6.4h"]
        ),
        formulaAnswer(
          "y11s-bac-i3",
          "Adult dose is 600 mg. Find the dose for a child weighing 28 kg using Clark's formula: D = W/70 × Adult dose.",
          "",
          "240 mg",
          ["240", "240mg"]
        ),
        financeChoice(
          "y11s-bac-i4",
          "A person's BAC is 0.05 and they need to drive. According to Time = BAC/0.015, the minimum time to wait is:",
          "C",
          ["2 hours", "2.5 hours", "3.33 hours", "5 hours"],
          "Time = 0.05/0.015 = 3.33 hours (3 hours 20 minutes)."
        ),
        formulaAnswer(
          "y11s-bac-i5",
          "A child is 18 months old. The adult dose is 150 mg. Use Fried's formula: D = Age(months)/150 × Adult dose.",
          "",
          "18 mg",
          ["18", "18mg"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Using the male BAC formula for a female (or vice versa).",
          fix: "The denominator differs: use 6.8M for males and 5.5M for females. Always check the gender specified in the question before substituting.",
        },
        {
          mistake: "Confusing N (standard drinks) and H (hours) in the BAC formula.",
          fix: "N is multiplied by 10; H is multiplied by 7.5. N goes in the positive term, H in the negative term: 10N − 7.5H.",
        },
        {
          mistake: "Using age in months instead of years (or vice versa) in Young's formula.",
          fix: "Young's formula uses age in years: D = A/(A+12) × Adult dose. Fried's formula uses age in months: D = Age(months)/150 × Adult dose. Read the formula label carefully.",
        },
        {
          mistake: "Concluding that a BAC below 0.05 means it is safe to drive based solely on the formula.",
          fix: "The formula gives an estimate only. Individual variation, food intake, medications and health all affect actual BAC. A formula result below 0.05 does not guarantee fitness to drive.",
        },
      ],
      masteryQuiz: [
        formulaAnswer(
          "y11s-bac-m1",
          "A male weighing 90 kg consumes 6 standard drinks over 2 hours. Find his BAC. Use BAC_male = (10N − 7.5H)/(6.8M).",
          "",
          "0.074",
          ["0.0735", "0.073", "0.07"]
        ),
        formulaAnswer(
          "y11s-bac-m2",
          "A female weighing 55 kg consumes 2 standard drinks over 1 hour. Find her BAC. Use BAC_female = (10N − 7.5H)/(5.5M).",
          "",
          "0.041",
          ["0.0413", "0.04"]
        ),
        formulaAnswer(
          "y11s-bac-m3",
          "A person has a BAC of 0.030. How many hours until their BAC reaches zero?",
          "",
          "2",
          ["2.0", "2 hours", "2h"]
        ),
        formulaAnswer(
          "y11s-bac-m4",
          "A person has a BAC of 0.108. How many hours until their BAC reaches zero?",
          "",
          "7.2",
          ["7.2 hours", "7.2h"]
        ),
        financeChoice(
          "y11s-bac-m5",
          "Young's formula is most appropriate for a:",
          "B",
          ["6-month-old infant", "5-year-old child", "35-year-old adult", "75-year-old adult"],
          "Young's formula applies to children aged 1–12 years."
        ),
        formulaAnswer(
          "y11s-bac-m6",
          "Adult dose is 800 mg. Find the dose for a 4-year-old using Young's formula: D = A/(A+12) × Adult dose.",
          "",
          "200 mg",
          ["200", "200mg"]
        ),
        formulaAnswer(
          "y11s-bac-m7",
          "Adult dose is 500 mg. Find the dose for a child weighing 35 kg using Clark's formula: D = W/70 × Adult dose.",
          "",
          "250 mg",
          ["250", "250mg"]
        ),
        financeChoice(
          "y11s-bac-m8",
          "Which factor is NOT accounted for in the BAC formula?",
          "C",
          ["Number of standard drinks", "Hours of drinking", "Type of food eaten", "Body mass"],
          "Food intake is not in the BAC formula, so the formula only gives an estimate."
        ),
        formulaAnswer(
          "y11s-bac-m9",
          "A child is 24 months old. The adult dose is 200 mg. Use Fried's formula: D = Age(months)/150 × Adult dose.",
          "",
          "32 mg",
          ["32", "32mg"]
        ),
        financeChoice(
          "y11s-bac-m10",
          "The legal BAC driving limit in Australia is:",
          "A",
          ["0.05", "0.08", "0.10", "0.15"],
          "The legal limit is 0.05 g per 100 mL of blood for standard licence holders."
        ),
      ],
    };
  }

  if (lesson.slug === "formulas-equations-revision") {
    return {
      ...base,
      description:
        "Activate Year 10 algebraic skills: substitute values into expressions and formulas, use inverse operations to solve linear equations, and set up equations from word problems — foundational skills for all Year 11 formula work.",
      learningIntention:
        "Recall and apply Year 10 algebraic techniques so that Year 11 formula substitution, rearranging and equation work builds on secure foundations.",
      successCriteria: [
        "Substitute a given value into an algebraic expression and evaluate the result.",
        "Use inverse operations to solve a one-step and two-step linear equation.",
        "Identify inverse operations: addition↔subtraction and multiplication↔division.",
        "Represent a simple word problem as a linear equation and solve it.",
      ],
      teaching: {
        paragraphs: [
          "Substitution means replacing a variable (a letter) with its given numerical value. Work through the arithmetic carefully after substituting, applying order of operations: brackets first, then powers, then multiplication and division, then addition and subtraction.",
          "Inverse operations reverse an operation. Addition and subtraction are inverses of each other; multiplication and division are inverses of each other. To solve an equation, apply the inverse operation to both sides until the variable is alone.",
          "For a two-step equation such as 3x + 5 = 20, undo the operations in reverse order: subtract 5 from both sides first (because addition was done last), then divide both sides by 3. The variable is then isolated.",
          "Word problems describe a real situation using words. Identify the unknown, assign it a letter, translate the words into mathematical operations, and write an equation. Then solve using inverse operations and check that the answer makes sense in the original context.",
        ],
        latexBlocks: [
          "\\text{Substitution: replace letter with number, then evaluate}",
          "\\text{Inverse: }+\\leftrightarrow -,\\quad \\times\\leftrightarrow \\div",
          "3x + 5 = 20 \\Rightarrow 3x = 15 \\Rightarrow x = 5",
          "\\text{Word problem: name the unknown, write an equation, solve}",
        ],
      },
      workedExamples: [
        {
          title: "Substituting into an expression",
          questionLatex:
            "\\text{Evaluate }4x^2 - 3x + 1\\text{ when }x = 2.",
          steps: [
            {
              explanation: "Replace every x with 2.",
              latex: "4(2)^2 - 3(2) + 1",
            },
            {
              explanation: "Calculate the power first: 2² = 4.",
              latex: "4(4) - 3(2) + 1 = 16 - 6 + 1",
            },
            {
              explanation: "Complete the arithmetic left to right.",
              latex: "= 11",
            },
          ],
          finalAnswerLatex: "11",
        },
        {
          title: "Solving a two-step equation",
          questionLatex: "\\text{Solve }5x - 8 = 22.",
          steps: [
            {
              explanation: "Add 8 to both sides to undo the subtraction.",
              latex: "5x = 22 + 8 = 30",
            },
            {
              explanation: "Divide both sides by 5.",
              latex: "x = 30 \\div 5 = 6",
            },
            {
              explanation: "Check: 5(6) − 8 = 30 − 8 = 22. ✓",
              latex: "5(6) - 8 = 22 \\checkmark",
            },
          ],
          finalAnswerLatex: "x = 6",
        },
        {
          title: "Word problem as an equation",
          questionLatex:
            "\\text{A plumber charges a \\$60 call-out fee plus \\$45 per hour. The total bill was \\$195. How many hours did the plumber work?}",
          steps: [
            {
              explanation: "Let h = number of hours. Write the equation.",
              latex: "60 + 45h = 195",
            },
            {
              explanation: "Subtract 60 from both sides.",
              latex: "45h = 135",
            },
            {
              explanation: "Divide both sides by 45.",
              latex: "h = 3",
            },
          ],
          finalAnswerLatex: "3 \\text{ hours}",
        },
      ],
      guidedPractice: [
        formulaAnswer(
          "y11s-fer-g1",
          "Evaluate 3x + 7 when x = 4.",
          "",
          "19",
          ["19.0"]
        ),
        formulaAnswer(
          "y11s-fer-g2",
          "Solve 2x + 6 = 18.",
          "",
          "6",
          ["6.0", "x=6"]
        ),
        formulaAnswer(
          "y11s-fer-g3",
          "Solve 4x − 3 = 17.",
          "",
          "5",
          ["5.0", "x=5"]
        ),
        financeChoice(
          "y11s-fer-g4",
          "The inverse of multiplying by 6 is:",
          "B",
          ["Multiplying by 6 again", "Dividing by 6", "Subtracting 6", "Adding 6"],
          "Multiplication and division are inverse operations."
        ),
      ],
      independentPractice: [
        formulaAnswer(
          "y11s-fer-i1",
          "Evaluate 2x² + 5 when x = 3.",
          "",
          "23",
          ["23.0"]
        ),
        formulaAnswer(
          "y11s-fer-i2",
          "Solve 7x + 4 = 39.",
          "",
          "5",
          ["5.0", "x=5"]
        ),
        formulaAnswer(
          "y11s-fer-i3",
          "Solve 3x − 12 = 0.",
          "",
          "4",
          ["4.0", "x=4"]
        ),
        formulaAnswer(
          "y11s-fer-i4",
          "A taxi charges a $4 flag-fall plus $2.50 per km. The fare was $19. Find the distance.",
          "",
          "6 km",
          ["6", "6km"]
        ),
        financeChoice(
          "y11s-fer-i5",
          "To solve x/3 = 8, the correct first step is to:",
          "C",
          ["Subtract 3", "Divide by 3", "Multiply both sides by 3", "Add 8"],
          "The x is being divided by 3, so multiply both sides by 3."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Evaluating 4x² as (4x)² instead of 4×(x²).",
          fix: "The exponent applies only to x, not to the coefficient 4. Calculate x² first, then multiply by 4.",
        },
        {
          mistake: "In 5x − 8 = 22, adding 8 to only one side of the equation.",
          fix: "Whatever is done to one side must be done to the other. If you add 8 to the left side, add 8 to the right side as well: 5x = 22 + 8 = 30.",
        },
        {
          mistake: "Solving the word problem without checking the answer back in the original context.",
          fix: "After solving, substitute the answer back into the original equation or re-read the problem to check the answer makes practical sense.",
        },
        {
          mistake: "Reversing the order of inverse operations — dividing before subtracting in a two-step equation.",
          fix: "Undo operations in reverse order. In 3x + 5 = 20: the +5 was done after ×3, so undo the addition first (subtract 5), then undo the multiplication (divide by 3).",
        },
      ],
      masteryQuiz: [
        formulaAnswer("y11s-fer-m1", "Evaluate 5x − 4 when x = 3.", "", "11", ["11.0"]),
        formulaAnswer("y11s-fer-m2", "Solve 3x + 7 = 28.", "", "7", ["7.0", "x=7"]),
        formulaAnswer("y11s-fer-m3", "Solve 6x − 9 = 27.", "", "6", ["6.0", "x=6"]),
        formulaAnswer("y11s-fer-m4", "Evaluate x² + 3x when x = 5.", "", "40", ["40.0"]),
        financeChoice(
          "y11s-fer-m5",
          "To solve x + 9 = 20, you should:",
          "A",
          ["Subtract 9 from both sides", "Multiply both sides by 9", "Add 9 to both sides", "Divide both sides by 9"],
          "The +9 is undone by subtracting 9 from both sides."
        ),
        formulaAnswer("y11s-fer-m6", "Solve x/4 = 7.", "", "28", ["28.0", "x=28"]),
        formulaAnswer(
          "y11s-fer-m7",
          "A mobile plan costs $30 per month plus $0.10 per SMS. The monthly bill was $37. Find the number of SMSs.",
          "",
          "70",
          ["70 sms", "70 texts"]
        ),
        financeChoice(
          "y11s-fer-m8",
          "The first step to solve 2x + 5 = 13 is to:",
          "B",
          ["Divide both sides by 2", "Subtract 5 from both sides", "Multiply by 5", "Add 13 to both sides"],
          "Undo the +5 first by subtracting 5 from both sides."
        ),
        formulaAnswer("y11s-fer-m9", "Solve 9x = 63.", "", "7", ["7.0", "x=7"]),
        formulaAnswer(
          "y11s-fer-m10",
          "Evaluate 3x² − 2x when x = 4.",
          "",
          "40",
          ["40.0"]
        ),
      ],
    };
  }

  return null;
}

