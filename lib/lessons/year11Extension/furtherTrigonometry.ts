import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import { formulaAnswer, practicalChoice } from "../questionHelpers";

function countAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const intVal = Number(answer);
  const intVariant = Number.isInteger(intVal) && !Number.isNaN(intVal) ? [`${answer}.0`] : [];
  const question = formulaAnswer(id, prompt, latex, answer, [...intVariant, ...acceptedAnswers]);
  return { ...question, explanation };
}

function choice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return practicalChoice(id, prompt, answer, choices, explanation, latex);
}

const base = {
  syllabusArea: "Trigonometry",
  masteryPassMark: 0.8,
};

function lessonBase(
  lesson: CourseLessonSeed,
  description: string,
  focus: string
): Partial<ExplicitLesson> {
  return {
    ...base,
    description,
    focus,
    status: "active",
  };
}

const reciprocalExamples: WorkedExample[] = [
  {
    title: "Find reciprocal trig values",
    questionLatex: "\\sin\\theta=\\frac35,\\quad \\cos\\theta=\\frac45",
    steps: [
      { explanation: "Cosecant is the reciprocal of sine.", latex: "\\cosec\\theta=\\frac{1}{\\sin\\theta}=\\frac53" },
      { explanation: "Secant is the reciprocal of cosine.", latex: "\\sec\\theta=\\frac{1}{\\cos\\theta}=\\frac54" },
    ],
    finalAnswerLatex: "\\cosec\\theta=\\frac53,\\quad \\sec\\theta=\\frac54",
  },
  {
    title: "Use exact values",
    questionLatex: "\\sec 60^\\circ",
    steps: [
      { explanation: "Use cosine first.", latex: "\\cos60^\\circ=\\frac12" },
      { explanation: "Take the reciprocal.", latex: "\\sec60^\\circ=2" },
    ],
    finalAnswerLatex: "2",
  },
  {
    title: "Recognise undefined values",
    questionLatex: "\\cot 0^\\circ",
    steps: [
      { explanation: "Cotangent is cosine divided by sine.", latex: "\\cot\\theta=\\frac{\\cos\\theta}{\\sin\\theta}" },
      { explanation: "At zero degrees, sine is zero.", latex: "\\sin0^\\circ=0" },
    ],
    finalAnswerLatex: "\\text{undefined}",
  },
];

const compoundExamples: WorkedExample[] = [
  {
    title: "Find sine of 75 degrees",
    questionLatex: "\\sin75^\\circ",
    steps: [
      { explanation: "Write 75 degrees as 45 plus 30.", latex: "\\sin(45^\\circ+30^\\circ)" },
      { explanation: "Use the compound angle formula.", latex: "\\sin A\\cos B+\\cos A\\sin B" },
      { explanation: "Substitute exact values.", latex: "\\frac{\\sqrt2}{2}\\frac{\\sqrt3}{2}+\\frac{\\sqrt2}{2}\\frac12=\\frac{\\sqrt6+\\sqrt2}{4}" },
    ],
    finalAnswerLatex: "\\frac{\\sqrt6+\\sqrt2}{4}",
  },
  {
    title: "Find cosine of a difference",
    questionLatex: "\\cos15^\\circ",
    steps: [
      { explanation: "Write 15 degrees as 45 minus 30.", latex: "\\cos(45^\\circ-30^\\circ)" },
      { explanation: "Use cosine difference.", latex: "\\cos A\\cos B+\\sin A\\sin B" },
      { explanation: "Substitute exact values.", latex: "\\frac{\\sqrt6+\\sqrt2}{4}" },
    ],
    finalAnswerLatex: "\\frac{\\sqrt6+\\sqrt2}{4}",
  },
  {
    title: "Use tangent addition",
    questionLatex: "\\tan75^\\circ",
    steps: [
      { explanation: "Use 75 equals 45 plus 30.", latex: "\\tan(45^\\circ+30^\\circ)" },
      { explanation: "Apply the tangent addition formula.", latex: "\\frac{1+1/\\sqrt3}{1-1/\\sqrt3}" },
      { explanation: "Simplify.", latex: "2+\\sqrt3" },
    ],
    finalAnswerLatex: "2+\\sqrt3",
  },
];

const doubleExamples: WorkedExample[] = [
  {
    title: "Evaluate a double angle",
    questionLatex: "\\cos(2\\times60^\\circ)",
    steps: [
      { explanation: "Use the cosine double angle formula.", latex: "\\cos2A=2\\cos^2A-1" },
      { explanation: "Substitute A equals 60 degrees.", latex: "2\\left(\\frac12\\right)^2-1=-\\frac12" },
    ],
    finalAnswerLatex: "-\\frac12",
  },
  {
    title: "Use sine double angle",
    questionLatex: "\\sin120^\\circ",
    steps: [
      { explanation: "Write 120 degrees as two times 60 degrees.", latex: "\\sin(2\\times60^\\circ)" },
      { explanation: "Use sine double angle.", latex: "2\\sin60^\\circ\\cos60^\\circ" },
      { explanation: "Evaluate.", latex: "2\\cdot\\frac{\\sqrt3}{2}\\cdot\\frac12=\\frac{\\sqrt3}{2}" },
    ],
    finalAnswerLatex: "\\frac{\\sqrt3}{2}",
  },
  {
    title: "Choose a cosine form",
    questionLatex: "\\cos2A\\text{ in terms of }\\sin A",
    steps: [
      { explanation: "Start from cosine squared minus sine squared.", latex: "\\cos2A=\\cos^2A-\\sin^2A" },
      { explanation: "Replace cosine squared with one minus sine squared.", latex: "\\cos2A=1-2\\sin^2A" },
    ],
    finalAnswerLatex: "1-2\\sin^2A",
  },
];

const tFormulaExamples: WorkedExample[] = [
  {
    title: "Write a sine-cosine sum as one sine",
    questionLatex: "3\\sin\\theta+4\\cos\\theta",
    steps: [
      { explanation: "Let the expression be R sin(theta plus alpha).", latex: "R\\sin(\\theta+\\alpha)=R\\sin\\theta\\cos\\alpha+R\\cos\\theta\\sin\\alpha" },
      { explanation: "Match coefficients.", latex: "R\\cos\\alpha=3,\\quad R\\sin\\alpha=4" },
      { explanation: "Calculate R.", latex: "R=\\sqrt{3^2+4^2}=5" },
    ],
    finalAnswerLatex: "5\\sin(\\theta+\\alpha),\\quad \\tan\\alpha=\\frac43",
  },
  {
    title: "Use the t substitution",
    questionLatex: "t=\\tan\\frac{\\theta}{2}",
    steps: [
      { explanation: "The t-formula rewrites sine and cosine rationally.", latex: "\\sin\\theta=\\frac{2t}{1+t^2}" },
      { explanation: "Cosine has numerator one minus t squared.", latex: "\\cos\\theta=\\frac{1-t^2}{1+t^2}" },
    ],
    finalAnswerLatex: "\\sin\\theta=\\frac{2t}{1+t^2},\\quad \\cos\\theta=\\frac{1-t^2}{1+t^2}",
  },
  {
    title: "Find a maximum value",
    questionLatex: "5\\sin\\theta+12\\cos\\theta",
    steps: [
      { explanation: "The amplitude is R.", latex: "R=\\sqrt{5^2+12^2}=13" },
      { explanation: "A shifted sine has maximum R.", latex: "-13\\le 5\\sin\\theta+12\\cos\\theta\\le13" },
    ],
    finalAnswerLatex: "13",
  },
];

const productExamples: WorkedExample[] = [
  {
    title: "Convert a product to a sum",
    questionLatex: "2\\sin A\\cos B",
    steps: [
      { explanation: "Start with the sine addition and subtraction formulae.", latex: "\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B" },
      { explanation: "Add the sine sum and sine difference formulae.", latex: "\\sin(A+B)+\\sin(A-B)=2\\sin A\\cos B" },
    ],
    finalAnswerLatex: "\\sin(A+B)+\\sin(A-B)",
  },
  {
    title: "Use a product-to-sum identity",
    questionLatex: "2\\cos75^\\circ\\cos15^\\circ",
    steps: [
      { explanation: "Use two cosine product-to-sum.", latex: "2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)" },
      { explanation: "Substitute A equals 75 degrees and B equals 15 degrees.", latex: "\\cos90^\\circ+\\cos60^\\circ" },
      { explanation: "Evaluate exact values.", latex: "0+\\frac12=\\frac12" },
    ],
    finalAnswerLatex: "\\frac12",
  },
  {
    title: "Prove a double-angle link",
    questionLatex: "\\sin(2A)=2\\sin A\\cos A",
    steps: [
      { explanation: "Use the sine addition formula.", latex: "\\sin(A+A)=\\sin A\\cos A+\\cos A\\sin A" },
      { explanation: "Combine like terms.", latex: "\\sin(2A)=2\\sin A\\cos A" },
    ],
    finalAnswerLatex: "\\sin(2A)=2\\sin A\\cos A",
  },
];

function reciprocalLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Define secant, cosecant and cotangent, and evaluate exact reciprocal trigonometric values.", "Reciprocal trigonometric functions"),
    learningIntention: "Use reciprocal trigonometric functions and connect their exact values with sine, cosine, and tangent.",
    successCriteria: [
      "Define sec, cosec, and cot in terms of sine, cosine, and tangent.",
      "Evaluate simple exact reciprocal trig values.",
      "Identify values where reciprocal trig functions are undefined.",
      "Use reciprocal relationships to simplify expressions.",
    ],
    teaching: {
      paragraphs: [
        "The reciprocal trigonometric functions are built from sine, cosine, and tangent.",
        "Secant is the reciprocal of cosine, cosecant is the reciprocal of sine, and cotangent is the reciprocal of tangent.",
        "A reciprocal function is undefined where its denominator is zero.",
        "Exact values come from the same special angles used for sine, cosine, and tangent.",
      ],
      latexBlocks: [
        "\\sec x=\\frac1{\\cos x}",
        "\\cosec x=\\frac1{\\sin x}",
        "\\cot x=\\frac1{\\tan x}=\\frac{\\cos x}{\\sin x}",
      ],
    },
    workedExamples: reciprocalExamples,
    guidedPractice: [
      countAnswer("ftrig-rec-g1", "Find sec 60 degrees.", "\\sec60^\\circ", "2", "cos 60 degrees is 1/2, so sec 60 degrees is 2."),
      countAnswer("ftrig-rec-g2", "Find cosec 30 degrees.", "\\cosec30^\\circ", "2", "sin 30 degrees is 1/2, so cosec 30 degrees is 2."),
      choice("ftrig-rec-g3", "Which identity defines cot x?", "C", ["$1/\\sin x$", "$1/\\cos x$", "$1/\\tan x$", "$\\sin x$"], "Cotangent is the reciprocal of tangent."),
      choice("ftrig-rec-g4", "Where is sec x undefined?", "A", ["where cos x=0", "where sin x=0", "where tan x=1", "where x=0 only"], "Secant has cosine in the denominator."),
    ],
    independentPractice: [
      countAnswer("ftrig-rec-i1", "Find cot 45 degrees.", "\\cot45^\\circ", "1", "tan 45 degrees is 1, so cot 45 degrees is 1."),
      countAnswer("ftrig-rec-i2", "Find sec 0 degrees.", "\\sec0^\\circ", "1", "cos 0 degrees is 1, so sec 0 degrees is 1."),
      countAnswer("ftrig-rec-i3", "Find cosec 90 degrees.", "\\cosec90^\\circ", "1", "sin 90 degrees is 1, so cosec 90 degrees is 1."),
      countAnswer("ftrig-rec-i4", "Find sec 45 degrees.", "\\sec45^\\circ", "sqrt(2)", "cos 45 degrees is sqrt(2)/2, so the reciprocal is sqrt(2).", ["\\sqrt{2}"]),
      choice("ftrig-rec-i5", "Which reciprocal function is undefined when sin x=0?", "B", ["sec x", "cosec x", "cos x", "tan x always"], "Cosecant has sine in the denominator."),
    ],
    commonMistakes: [
      { mistake: "Confusing secant with sine.", fix: "Secant is the reciprocal of cosine, not sine." },
      { mistake: "Forgetting undefined values.", fix: "Check whether the denominator is zero before taking a reciprocal." },
      { mistake: "Rationalising unnecessarily before identifying exact values.", fix: "Use familiar reciprocal pairs first." },
      { mistake: "Treating cot x as 1 over sin x.", fix: "Cotangent is cos x over sin x." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-rec-m1", "Find sec 60 degrees.", "\\sec60^\\circ", "2", "The reciprocal of cos 60 degrees is 2."),
      countAnswer("ftrig-rec-m2", "Find cosec 30 degrees.", "\\cosec30^\\circ", "2", "The reciprocal of sin 30 degrees is 2."),
      countAnswer("ftrig-rec-m3", "Find cot 60 degrees.", "\\cot60^\\circ", "1/sqrt(3)", "tan 60 degrees is sqrt(3), so cot 60 degrees is 1/sqrt(3).", ["\\frac{1}{\\sqrt{3}}", "sqrt(3)/3"]),
      countAnswer("ftrig-rec-m4", "Find sec 180 degrees.", "\\sec180^\\circ", "-1", "cos 180 degrees is -1, so sec 180 degrees is -1."),
      countAnswer("ftrig-rec-m5", "Find cosec 270 degrees.", "\\cosec270^\\circ", "-1", "sin 270 degrees is -1, so cosec 270 degrees is -1."),
      choice("ftrig-rec-m6", "Which equals sec x?", "D", ["$\\sin x$", "$1/\\sin x$", "$\\cos x/\\sin x$", "$1/\\cos x$"], "Secant is reciprocal cosine."),
      choice("ftrig-rec-m7", "Which equals cosec x?", "A", ["$1/\\sin x$", "$1/\\cos x$", "$1/\\tan x$", "$\\cos x$"], "Cosecant is reciprocal sine."),
      choice("ftrig-rec-m8", "Why is cot 0 degrees undefined?", "B", ["cos 0 is zero", "sin 0 is zero", "tan 0 is one", "sec 0 is zero"], "cot x=cos x/sin x and sin 0 degrees is zero."),
      countAnswer("ftrig-rec-m9", "If sin theta=2/5, find cosec theta.", "\\sin\\theta=\\frac25", "5/2", "Cosecant is the reciprocal of sine.", ["2.5"]),
      countAnswer("ftrig-rec-m10", "If cos theta=3/7, find sec theta.", "\\cos\\theta=\\frac37", "7/3", "Secant is the reciprocal of cosine."),
    ],
  };
}

function compoundLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Apply compound angle formulae for sine, cosine, and tangent.", "Compound angle formulae"),
    learningIntention: "Use compound angle identities to evaluate exact trigonometric values and simplify expressions.",
    successCriteria: [
      "Use sine addition and subtraction formulae.",
      "Use cosine addition and subtraction formulae.",
      "Use tangent addition and subtraction formulae.",
      "Evaluate exact values such as 75 degrees and 15 degrees.",
    ],
    teaching: {
      paragraphs: [
        "Compound angle formulae express trig functions of sums and differences in terms of simpler angles.",
        "Sine addition has a plus pattern across sine-cosine products, while sine subtraction changes the sign between them.",
        "Cosine addition and subtraction have the opposite sign pattern to what many students expect.",
        "Tangent compound formulae are useful when the exact tangent values are simple.",
      ],
      latexBlocks: [
        "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B",
        "\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
        "\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}",
      ],
    },
    workedExamples: compoundExamples,
    guidedPractice: [
      countAnswer("ftrig-comp-g1", "Find sin 75 degrees exactly.", "\\sin75^\\circ", "(sqrt(6)+sqrt(2))/4", "Use sin(45+30) to get (sqrt6+sqrt2)/4.", ["(\\sqrt{6}+\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-g2", "Find cos 75 degrees exactly.", "\\cos75^\\circ", "(sqrt(6)-sqrt(2))/4", "Use cos(45+30)=cos45 cos30 - sin45 sin30.", ["(\\sqrt{6}-\\sqrt{2})/4"]),
      choice("ftrig-comp-g3", "Which formula is correct?", "A", ["$\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B$", "$\\sin(A+B)=\\sin A\\sin B+\\cos A\\cos B$", "$\\cos(A+B)=\\cos A\\cos B+\\sin A\\sin B$", "$\\tan(A+B)=\\tan A+\\tan B$"], "This is the sine addition formula."),
      choice("ftrig-comp-g4", "Which angles are useful for 15 degrees?", "C", ["60 and 60", "90 and 30", "45 and 30", "30 and 30"], "15 degrees is 45 degrees minus 30 degrees."),
    ],
    independentPractice: [
      countAnswer("ftrig-comp-i1", "Find sin 15 degrees exactly.", "\\sin15^\\circ", "(sqrt(6)-sqrt(2))/4", "Use sin(45-30).", ["(\\sqrt{6}-\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-i2", "Find cos 15 degrees exactly.", "\\cos15^\\circ", "(sqrt(6)+sqrt(2))/4", "Use cos(45-30).", ["(\\sqrt{6}+\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-i3", "Find tan 75 degrees exactly.", "\\tan75^\\circ", "2+sqrt(3)", "Use tan(45+30) and simplify.", ["2+\\sqrt{3}"]),
      countAnswer("ftrig-comp-i4", "Find tan 15 degrees exactly.", "\\tan15^\\circ", "2-sqrt(3)", "Use tan(45-30) and simplify.", ["2-\\sqrt{3}"]),
      choice("ftrig-comp-i5", "In cos(A+B), which sign appears between the two products?", "B", ["plus", "minus", "both products vanish", "division"], "cos(A+B)=cos A cos B - sin A sin B."),
    ],
    commonMistakes: [
      { mistake: "Using cos(A+B) with a plus sign.", fix: "Cosine addition uses a minus between the products." },
      { mistake: "Forgetting exact-value radicals.", fix: "Substitute exact values for 30, 45, and 60 degrees." },
      { mistake: "Treating tan(A+B) as tan A plus tan B.", fix: "Use the fraction formula for tangent." },
      { mistake: "Mixing degree and radian angles in one calculation.", fix: "Keep the angle measure consistent throughout." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-comp-m1", "Find sin 75 degrees exactly.", "\\sin75^\\circ", "(sqrt(6)+sqrt(2))/4", "sin(45+30)=(sqrt6+sqrt2)/4.", ["(\\sqrt{6}+\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-m2", "Find sin 15 degrees exactly.", "\\sin15^\\circ", "(sqrt(6)-sqrt(2))/4", "sin(45-30)=(sqrt6-sqrt2)/4.", ["(\\sqrt{6}-\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-m3", "Find cos 75 degrees exactly.", "\\cos75^\\circ", "(sqrt(6)-sqrt(2))/4", "cos(45+30)=(sqrt6-sqrt2)/4.", ["(\\sqrt{6}-\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-m4", "Find cos 15 degrees exactly.", "\\cos15^\\circ", "(sqrt(6)+sqrt(2))/4", "cos(45-30)=(sqrt6+sqrt2)/4.", ["(\\sqrt{6}+\\sqrt{2})/4"]),
      countAnswer("ftrig-comp-m5", "Find tan 75 degrees exactly.", "\\tan75^\\circ", "2+sqrt(3)", "tan(45+30)=2+sqrt3.", ["2+\\sqrt{3}"]),
      choice("ftrig-comp-m6", "The expression sinA cosB − cosA sinB simplifies to which compound angle?", "A", ["$\\sin(A-B)$", "$\\sin(A+B)$", "$\\cos(A-B)$", "$\\cos(A+B)$"], "sinA cosB − cosA sinB is the expansion of sin(A − B); the minus between the products corresponds to A − B (a plus would give A + B)."),
      choice("ftrig-comp-m7", "The expression cosA cosB + sinA sinB simplifies to which compound angle?", "B", ["$\\cos(A+B)$", "$\\cos(A-B)$", "$\\sin(A-B)$", "$\\sin(A+B)$"], "cosA cosB + sinA sinB is the expansion of cos(A − B); for cosine the plus sign corresponds to A − B, while cos(A + B) uses a minus."),
      choice("ftrig-comp-m8", "What is the denominator of tan(A+B)?", "C", ["$1+\\tan A\\tan B$", "$\\tan A+\\tan B$", "$1-\\tan A\\tan B$", "$\\cos A\\cos B$"], "The denominator is 1 minus the product."),
      countAnswer("ftrig-comp-m9", "Find tan 15 degrees exactly.", "\\tan15^\\circ", "2-sqrt(3)", "tan(45-30)=2-sqrt3.", ["2-\\sqrt{3}"]),
      countAnswer("ftrig-comp-m10", "Find sin(45 degrees plus 45 degrees).", "\\sin(45^\\circ+45^\\circ)", "1", "This is sin 90 degrees, equal to 1."),
    ],
  };
}

function doubleLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use double angle formulae for sine, cosine, and tangent, including alternate cosine forms.", "Double angle formulae"),
    learningIntention: "Apply double angle identities to exact values and algebraic simplification.",
    successCriteria: [
      "Use sin 2A equals 2 sin A cos A.",
      "Use three equivalent forms of cos 2A.",
      "Use the tangent double angle formula.",
      "Choose the most efficient double angle form for a question.",
    ],
    teaching: {
      paragraphs: [
        "Double angle identities are special cases of compound angle formulae where the two angles are the same.",
        "The sine double angle formula is often used when both sine and cosine of the original angle are known.",
        "Cosine double angle has three common forms, which let you work with sine only, cosine only, or both.",
        "Tangent double angle is useful but requires checking that the denominator is not zero.",
      ],
      latexBlocks: [
        "\\sin2A=2\\sin A\\cos A",
        "\\cos2A=\\cos^2A-\\sin^2A=2\\cos^2A-1=1-2\\sin^2A",
        "\\tan2A=\\frac{2\\tan A}{1-\\tan^2A}",
      ],
    },
    workedExamples: doubleExamples,
    guidedPractice: [
      countAnswer("ftrig-dbl-g1", "Find cos(2 x 60 degrees).", "\\cos(2\\times60^\\circ)", "-1/2", "Use 2cos^2(60)-1=2(1/4)-1=-1/2.", ["-0.5"]),
      countAnswer("ftrig-dbl-g2", "Find sin 120 degrees using a double angle.", "\\sin120^\\circ", "sqrt(3)/2", "sin(2*60)=2 sin60 cos60=sqrt3/2.", ["\\sqrt{3}/2"]),
      choice("ftrig-dbl-g3", "Which is a correct form of cos 2A?", "B", ["$2\\sin^2A-1$", "$2\\cos^2A-1$", "$2\\sin A\\cos A$", "$1+2\\sin^2A$"], "One cosine double-angle form is 2cos^2A-1."),
      choice("ftrig-dbl-g4", "Which formula gives sin 2A?", "A", ["$2\\sin A\\cos A$", "$\\sin^2A-\\cos^2A$", "$1-2\\cos^2A$", "$2\\tan A$"], "This is the sine double-angle formula."),
    ],
    independentPractice: [
      countAnswer("ftrig-dbl-i1", "Find cos 120 degrees.", "\\cos120^\\circ", "-1/2", "cos(2*60)=2cos^2(60)-1=-1/2.", ["-0.5"]),
      countAnswer("ftrig-dbl-i2", "If sin A=3/5 and cos A=4/5, find sin 2A.", "\\sin A=3/5,\\ \\cos A=4/5", "24/25", "sin2A=2*(3/5)*(4/5)=24/25."),
      countAnswer("ftrig-dbl-i3", "If cos A=4/5, find cos 2A using 2cos^2A-1.", "\\cos A=4/5", "7/25", "2*(16/25)-1=32/25-25/25=7/25."),
      countAnswer("ftrig-dbl-i4", "If tan A=1/2, find tan 2A.", "\\tan A=1/2", "4/3", "tan2A=(2*(1/2))/(1-1/4)=1/(3/4)=4/3."),
      choice("ftrig-dbl-i5", "Which cos 2A form uses sine only?", "C", ["$2\\cos^2A-1$", "$\\cos^2A-\\sin^2A$", "$1-2\\sin^2A$", "$2\\sin A\\cos A$"], "This form uses only sine."),
    ],
    commonMistakes: [
      { mistake: "Writing sin 2A as 2 sin A.", fix: "Use 2 sin A cos A." },
      { mistake: "Using the wrong sign in cosine double angle.", fix: "Check against cos 120 degrees equals -1/2." },
      { mistake: "Forgetting the denominator in tan 2A.", fix: "Use the full fraction with 1 minus tan squared A." },
      { mistake: "Choosing a form with unavailable values.", fix: "Pick the cosine form that matches the given sine or cosine information." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-dbl-m1", "Find cos 120 degrees.", "\\cos120^\\circ", "-1/2", "cos(2*60)=-1/2.", ["-0.5"]),
      countAnswer("ftrig-dbl-m2", "Find sin 60 degrees using a double angle from 30 degrees.", "\\sin60^\\circ", "sqrt(3)/2", "sin(2*30)=2*(1/2)*(sqrt3/2)=sqrt3/2.", ["\\sqrt{3}/2"]),
      countAnswer("ftrig-dbl-m3", "If sin A=5/13 and cos A=12/13, find sin 2A.", "\\sin A=5/13,\\ \\cos A=12/13", "120/169", "sin2A=2*(5/13)*(12/13)=120/169."),
      countAnswer("ftrig-dbl-m4", "If cos A=3/5, find cos 2A.", "\\cos A=3/5", "-7/25", "2*(9/25)-1=-7/25."),
      countAnswer("ftrig-dbl-m5", "If sin A=4/5, find cos 2A using 1-2sin^2A.", "\\sin A=4/5", "-7/25", "1-2*(16/25)=-7/25."),
      choice("ftrig-dbl-m6", "Which identity is not a correct cosine double-angle form?", "D", ["$\\cos^2A-\\sin^2A$", "$2\\cos^2A-1$", "$1-2\\sin^2A$", "$1+2\\sin^2A$"], "The sine-only form has a minus sign."),
      choice("ftrig-dbl-m7", "What condition makes tan 2A undefined in its formula?", "B", ["$\\tan A=0$", "$1-\\tan^2A=0$", "$\\sin A=1$", "$\\cos A=1$"], "The denominator cannot be zero."),
      choice("ftrig-dbl-m8", "Double angle formulae come from which formulae?", "A", ["Compound angle formulae", "Quadratic formula", "Remainder theorem", "Vieta formulae"], "Set the two angles equal in compound angle formulae."),
      countAnswer("ftrig-dbl-m9", "If tan A=2, find tan 2A.", "\\tan A=2", "-4/3", "tan2A=4/(1-4)=-4/3."),
      countAnswer("ftrig-dbl-m10", "Find cos 90 degrees using cos(2 x 45 degrees).", "\\cos(2\\times45^\\circ)", "0", "2*(sqrt2/2)^2-1=1-1=0."),
    ],
  };
}

function tFormulaLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use the t-formula and subsidiary angle method to rewrite trigonometric expressions.", "t-formula and subsidiary angle method"),
    learningIntention: "Rewrite a sin theta plus b cos theta in single-angle form and use t-substitution identities.",
    successCriteria: [
      "Find R for a sin theta plus b cos theta.",
      "Match coefficients in R sin(theta plus alpha) or R cos(theta minus alpha).",
      "Use the maximum and minimum values of a sinusoidal expression.",
      "State the t-formula identities for sine, cosine, and tangent.",
    ],
    teaching: {
      paragraphs: [
        "The subsidiary angle method rewrites a sine-cosine combination as one shifted sine or cosine.",
        "The amplitude R is found from the Pythagorean sum of the two coefficients.",
        "Matching coefficients determines the auxiliary angle.",
        "The t-formula uses t equals tangent of half the angle to express sine and cosine as rational functions of t.",
      ],
      latexBlocks: [
        "a\\sin\\theta+b\\cos\\theta=R\\sin(\\theta+\\alpha)",
        "R=\\sqrt{a^2+b^2}",
        "\\sin\\theta=\\frac{2t}{1+t^2},\\quad \\cos\\theta=\\frac{1-t^2}{1+t^2},\\quad t=\\tan\\frac\\theta2",
      ],
    },
    workedExamples: tFormulaExamples,
    guidedPractice: [
      countAnswer("ftrig-tf-g1", "Find R for 3sin theta+4cos theta.", "3\\sin\\theta+4\\cos\\theta", "5", "R=sqrt(3^2+4^2)=5."),
      countAnswer("ftrig-tf-g2", "Find R for 5sin theta+12cos theta.", "5\\sin\\theta+12\\cos\\theta", "13", "R=sqrt(25+144)=13."),
      choice("ftrig-tf-g3", "If t=tan(theta/2), which is sin theta?", "A", ["$2t/(1+t^2)$", "$(1-t^2)/(1+t^2)$", "$2t/(1-t^2)$", "$1/t$"], "This is the sine t-formula."),
      choice("ftrig-tf-g4", "The maximum of 3sin theta+4cos theta is what?", "C", ["3", "4", "5", "7"], "The maximum is R=5."),
    ],
    independentPractice: [
      countAnswer("ftrig-tf-i1", "Find R for 8sin theta+6cos theta.", "8\\sin\\theta+6\\cos\\theta", "10", "R=sqrt(64+36)=10."),
      countAnswer("ftrig-tf-i2", "Find the maximum of 7sin theta+24cos theta.", "7\\sin\\theta+24\\cos\\theta", "25", "The maximum is R=sqrt(49+576)=25."),
      countAnswer("ftrig-tf-i3", "Find the minimum of 9sin theta+12cos theta.", "9\\sin\\theta+12\\cos\\theta", "-15", "R=15, so the minimum is -15."),
      countAnswer("ftrig-tf-i4", "For 3sin theta+4cos theta=Rsin(theta+alpha), find tan alpha.", "3\\sin\\theta+4\\cos\\theta", "4/3", "Matching gives Rcos alpha=3 and Rsin alpha=4, so tan alpha=4/3."),
      choice("ftrig-tf-i5", "If t=tan(theta/2), which is cos theta?", "B", ["$2t/(1+t^2)$", "$(1-t^2)/(1+t^2)$", "$2t/(1-t^2)$", "$t^2$"], "This is the cosine t-formula."),
    ],
    commonMistakes: [
      { mistake: "Adding coefficients to find R.", fix: "Use R equals the square root of a squared plus b squared." },
      { mistake: "Swapping sine and cosine coefficient matches.", fix: "Expand the chosen shifted sine or cosine before matching." },
      { mistake: "Forgetting the negative minimum.", fix: "A shifted sine ranges from -R to R." },
      { mistake: "Using t equals tan theta instead of tan theta over 2.", fix: "The t-formula uses half-angle tangent." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-tf-m1", "Find R for 3sin theta+4cos theta.", "3\\sin\\theta+4\\cos\\theta", "5", "R=5."),
      countAnswer("ftrig-tf-m2", "Find R for 5sin theta+12cos theta.", "5\\sin\\theta+12\\cos\\theta", "13", "R=13."),
      countAnswer("ftrig-tf-m3", "Find R for 20sin theta+21cos theta.", "20\\sin\\theta+21\\cos\\theta", "29", "R=sqrt(400+441)=29."),
      countAnswer("ftrig-tf-m4", "Find the maximum of 8sin theta-15cos theta.", "8\\sin\\theta-15\\cos\\theta", "17", "R=sqrt(64+225)=17."),
      countAnswer("ftrig-tf-m5", "Find the minimum of 7sin theta+24cos theta.", "7\\sin\\theta+24\\cos\\theta", "-25", "R=25, so the minimum is -25."),
      choice("ftrig-tf-m6", "What is the maximum value of 5 sinθ + 12 cosθ?", "B", ["$17$", "$13$", "$169$", "$7$"], "Writing a sinθ + b cosθ as R sin(θ + α) gives R = √(a² + b²) = √(25 + 144) = 13. The maximum of R sin(θ + α) is R = 13, not a + b = 17."),
      choice("ftrig-tf-m7", "For Rsin(theta+alpha), which coefficient matches sin theta?", "A", ["$R\\cos\\alpha$", "$R\\sin\\alpha$", "$R\\tan\\alpha$", "$R$"], "Expanding gives Rsin theta cos alpha + Rcos theta sin alpha."),
      choice("ftrig-tf-m8", "What is t in the t-formula?", "B", ["$\\tan\\theta$", "$\\tan(\\theta/2)$", "$\\sin\\theta$", "$\\sec\\theta$"], "The substitution is t=tan(theta/2)."),
      countAnswer("ftrig-tf-m9", "For 5sin theta+12cos theta=Rsin(theta+alpha), find tan alpha.", "5\\sin\\theta+12\\cos\\theta", "12/5", "Rcos alpha=5 and Rsin alpha=12, so tan alpha=12/5."),
      countAnswer("ftrig-tf-m10", "Find the range of 3sin theta+4cos theta using interval notation.", "3\\sin\\theta+4\\cos\\theta", "[-5,5]", "R=5, so the range is [-5,5].", ["[-5, 5]", "-5<=y<=5", "-5\\le y\\le5"]),
    ],
  };
}

function productSumLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use product-to-sum, sum-to-product, and identity reasoning in further trigonometry.", "Product-to-sum identities and proofs"),
    learningIntention: "Transform trigonometric products and sums, and use compound-angle identities to prove simple results.",
    successCriteria: [
      "Convert products such as $2\\sin A\\cos B$ into sums.",
      "Convert sums such as $\\sin X+\\sin Y$ into products.",
      "Use product-to-sum identities to evaluate exact expressions.",
      "Use compound-angle formulae to justify double-angle and related identities.",
    ],
    teaching: {
      paragraphs: [
        "Product-to-sum and sum-to-product identities are efficient ways to transform trigonometric expressions.",
        "They are derived by adding or subtracting compound-angle formulae, so the signs must be tracked carefully.",
        "These identities can make exact-value products easier because the resulting angles are often familiar special angles.",
        "Identity proofs usually become simpler when both sides are rewritten using compound-angle, double-angle, or product-to-sum forms.",
      ],
      latexBlocks: [
        "2\\sin A\\cos B=\\sin(A+B)+\\sin(A-B)",
        "2\\cos A\\cos B=\\cos(A+B)+\\cos(A-B)",
        "2\\sin A\\sin B=\\cos(A-B)-\\cos(A+B)",
        "\\sin X+\\sin Y=2\\sin\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}",
      ],
    },
    workedExamples: productExamples,
    guidedPractice: [
      countAnswer("ftrig-prod-g1", "Rewrite 2sin A cos B as a sum.", "2\\sin A\\cos B", "sin(A+B)+sin(A-B)", "Add the sine sum and sine difference formulae.", ["\\sin(A+B)+\\sin(A-B)"]),
      countAnswer("ftrig-prod-g2", "Evaluate 2cos 75 degrees cos 15 degrees.", "2\\cos75^\\circ\\cos15^\\circ", "1/2", "Use cos(90)+cos(60)=0+1/2.", ["0.5"]),
      choice("ftrig-prod-g3", "Which identity matches 2cos A cos B?", "B", ["$\\cos(A-B)-\\cos(A+B)$", "$\\cos(A+B)+\\cos(A-B)$", "$\\sin(A+B)+\\sin(A-B)$", "$\\sin(A+B)-\\sin(A-B)$"], "Two cosine product-to-sum uses the sum of cosine sum and cosine difference."),
      choice("ftrig-prod-g4", "Which formula is usually the source of product-to-sum identities?", "A", ["Compound angle formulae", "Quadratic formula", "Remainder theorem", "Vieta's formulae"], "Product-to-sum identities come from adding or subtracting compound-angle identities."),
    ],
    independentPractice: [
      countAnswer("ftrig-prod-i1", "Rewrite 2sin A sin B as a difference of cosines.", "2\\sin A\\sin B", "cos(A-B)-cos(A+B)", "Subtract cosine sum from cosine difference.", ["\\cos(A-B)-\\cos(A+B)"]),
      countAnswer("ftrig-prod-i2", "Rewrite sin X+sin Y as a product.", "\\sin X+\\sin Y", "2sin((X+Y)/2)cos((X-Y)/2)", "Use the sum-to-product identity for sine plus sine.", ["2\\sin((X+Y)/2)\\cos((X-Y)/2)"]),
      countAnswer("ftrig-prod-i3", "Evaluate 2sin 75 degrees cos 15 degrees.", "2\\sin75^\\circ\\cos15^\\circ", "1+sqrt(3)/2", "Use 2sin A cos B=sin(A+B)+sin(A-B), so sin90+sin60=1+sqrt3/2.", ["1+\\sqrt{3}/2", "(2+sqrt(3))/2", "(2+\\sqrt{3})/2"]),
      countAnswer("ftrig-prod-i4", "Evaluate 2sin 45 degrees sin 15 degrees exactly.", "2\\sin45^\\circ\\sin15^\\circ", "(sqrt(3)-1)/2", "Use cos(30)-cos(60)=sqrt3/2-1/2.", ["(\\sqrt{3}-1)/2"]),
      choice("ftrig-prod-i5", "Which expression equals sin X-sin Y?", "C", ["$2\\sin\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$2\\cos\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$2\\cos\\frac{X+Y}{2}\\sin\\frac{X-Y}{2}$", "$\\cos(X-Y)-\\cos(X+Y)$"], "The sine difference sum-to-product identity uses cosine of the average times sine of the half-difference."),
    ],
    commonMistakes: [
      { mistake: "Forgetting the factor of 2 in sum-to-product identities.", fix: "Check whether the identity starts with a product or a sum before rearranging." },
      { mistake: "Reversing the signs in cosine product identities.", fix: "Derive from cosine sum and difference if unsure." },
      { mistake: "Using product-to-sum without halving angles in sum-to-product.", fix: "Sum-to-product identities use the average and half-difference of the angles." },
      { mistake: "Writing a proof as isolated formula quoting.", fix: "Show which compound-angle formulae are added or subtracted." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-prod-m1", "Rewrite 2sin A cos B as a sum.", "2\\sin A\\cos B", "sin(A+B)+sin(A-B)", "Add sine sum and sine difference.", ["\\sin(A+B)+\\sin(A-B)"]),
      countAnswer("ftrig-prod-m2", "Rewrite 2cos A cos B as a sum.", "2\\cos A\\cos B", "cos(A+B)+cos(A-B)", "Add cosine sum and cosine difference.", ["\\cos(A+B)+\\cos(A-B)"]),
      countAnswer("ftrig-prod-m3", "Rewrite 2sin A sin B as a difference.", "2\\sin A\\sin B", "cos(A-B)-cos(A+B)", "Subtract cosine sum from cosine difference.", ["\\cos(A-B)-\\cos(A+B)"]),
      countAnswer("ftrig-prod-m4", "Evaluate 2cos 75 degrees cos 15 degrees.", "2\\cos75^\\circ\\cos15^\\circ", "1/2", "cos90+cos60=1/2.", ["0.5"]),
      countAnswer("ftrig-prod-m5", "Evaluate 2sin 75 degrees sin 15 degrees.", "2\\sin75^\\circ\\sin15^\\circ", "1/2", "cos60-cos90=1/2.", ["0.5"]),
      choice("ftrig-prod-m6", "Which identity matches cos X+cos Y?", "B", ["$2\\sin\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$2\\cos\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$2\\cos\\frac{X+Y}{2}\\sin\\frac{X-Y}{2}$", "$\\cos(X+Y)+\\cos(X-Y)$"], "Cosine plus cosine becomes two cosines using average and half-difference."),
      choice("ftrig-prod-m7", "Which identity matches cos X-cos Y?", "D", ["$2\\cos\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$2\\sin\\frac{X+Y}{2}\\cos\\frac{X-Y}{2}$", "$\\sin(X+Y)-\\sin(X-Y)$", "$-2\\sin\\frac{X+Y}{2}\\sin\\frac{X-Y}{2}$"], "Cosine difference has the negative two sine product form."),
      choice("ftrig-prod-m8", "A proof of sin 2A=2sin A cos A should start from which identity?", "A", ["$\\sin(A+A)$", "$\\cos(A-A)$", "$\\tan(A-A)$", "$\\sec A$"], "Set both angles equal in the sine addition formula."),
      countAnswer("ftrig-prod-m9", "Rewrite sin 80 degrees+sin 20 degrees as a product.", "\\sin80^\\circ+\\sin20^\\circ", "2sin50cos30", "Average is 50 degrees and half-difference is 30 degrees.", ["2\\sin50^\\circ\\cos30^\\circ"]),
      countAnswer("ftrig-prod-m10", "Evaluate cos 80 degrees+cos 40 degrees as a product.", "\\cos80^\\circ+\\cos40^\\circ", "2cos60cos20", "Average is 60 degrees and half-difference is 20 degrees.", ["2\\cos60^\\circ\\cos20^\\circ", "cos20"]),
    ],
  };
}

const trigEquationSolvingExamples: WorkedExample[] = [
  {
    title: "Solve sin 2θ = sin θ for 0 ≤ θ ≤ 2π",
    questionLatex: "\\sin2\\theta=\\sin\\theta,\\quad 0\\le\\theta\\le2\\pi",
    steps: [
      { explanation: "Apply the sine double angle formula.", latex: "2\\sin\\theta\\cos\\theta=\\sin\\theta" },
      { explanation: "Bring all terms to one side.", latex: "2\\sin\\theta\\cos\\theta-\\sin\\theta=0" },
      { explanation: "Factorise by taking out sin θ.", latex: "\\sin\\theta(2\\cos\\theta-1)=0" },
      { explanation: "Set each factor to zero.", latex: "\\sin\\theta=0\\quad\\text{or}\\quad\\cos\\theta=\\tfrac12" },
      { explanation: "Solve sin θ = 0 on [0, 2π].", latex: "\\theta=0,\\,\\pi,\\,2\\pi" },
      { explanation: "Solve cos θ = 1/2 on [0, 2π].", latex: "\\theta=\\frac{\\pi}{3},\\,\\frac{5\\pi}{3}" },
    ],
    finalAnswerLatex: "\\theta=0,\\,\\frac{\\pi}{3},\\,\\pi,\\,\\frac{5\\pi}{3},\\,2\\pi\\quad(5\\text{ solutions})",
  },
  {
    title: "Solve cos 2θ + cos θ = 0 for 0° ≤ θ ≤ 360°",
    questionLatex: "\\cos2\\theta+\\cos\\theta=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
    steps: [
      { explanation: "Use the cosine double angle form that produces a quadratic in cos θ.", latex: "\\cos2\\theta=2\\cos^2\\theta-1" },
      { explanation: "Substitute into the equation.", latex: "2\\cos^2\\theta-1+\\cos\\theta=0" },
      { explanation: "Rearrange as a quadratic in cos θ.", latex: "2\\cos^2\\theta+\\cos\\theta-1=0" },
      { explanation: "Factorise the quadratic.", latex: "(2\\cos\\theta-1)(\\cos\\theta+1)=0" },
      { explanation: "Solve each factor.", latex: "\\cos\\theta=\\tfrac12\\;\\Rightarrow\\;\\theta=60^\\circ,300^\\circ\\qquad\\cos\\theta=-1\\;\\Rightarrow\\;\\theta=180^\\circ" },
    ],
    finalAnswerLatex: "\\theta=60^\\circ,\\,180^\\circ,\\,300^\\circ\\quad(3\\text{ solutions})",
  },
  {
    title: "Solve sin 2θ = cos θ for 0 ≤ θ ≤ 2π — why you cannot divide by cos θ",
    questionLatex: "\\sin2\\theta=\\cos\\theta,\\quad 0\\le\\theta\\le2\\pi",
    steps: [
      { explanation: "Apply the sine double angle formula.", latex: "2\\sin\\theta\\cos\\theta=\\cos\\theta" },
      { explanation: "Bring all terms to one side — do not divide by cos θ.", latex: "2\\sin\\theta\\cos\\theta-\\cos\\theta=0" },
      { explanation: "Factorise by taking out cos θ.", latex: "\\cos\\theta(2\\sin\\theta-1)=0" },
      { explanation: "Solve cos θ = 0. Dividing by cos θ would lose these solutions.", latex: "\\theta=\\frac{\\pi}{2},\\,\\frac{3\\pi}{2}" },
      { explanation: "Solve 2 sin θ − 1 = 0.", latex: "\\sin\\theta=\\tfrac12\\;\\Rightarrow\\;\\theta=\\frac{\\pi}{6},\\,\\frac{5\\pi}{6}" },
    ],
    finalAnswerLatex: "\\theta=\\frac{\\pi}{6},\\,\\frac{\\pi}{2},\\,\\frac{5\\pi}{6},\\,\\frac{3\\pi}{2}\\quad(4\\text{ solutions})",
  },
];

function trigEquationSolvingLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Solve trigonometric equations using compound and double angle identities.", "Solving trig equations using compound and double angle identities"),
    learningIntention: "Use double angle and compound angle identities to reduce trig equations to single-angle form, then solve within a given domain.",
    successCriteria: [
      "Replace sin 2θ, cos 2θ, or tan 2A with the appropriate identity to reduce to a single angle.",
      "Factorise after substitution to find all solutions — never divide both sides by a trig function.",
      "Form and solve a quadratic in sin θ or cos θ when the identity produces a squared term.",
      "Adjust the domain correctly when a doubled angle is introduced.",
      "List all solutions within the specified domain, including boundary values.",
    ],
    teaching: {
      paragraphs: [
        "When a trig equation contains a double angle such as sin 2θ or cos 2θ, the first step is to replace it with the appropriate identity. For sin 2θ use 2 sin θ cos θ; for cos 2θ choose the form that matches the other terms — use 1 − 2sin²θ when the equation also involves sin θ, or 2cos²θ − 1 when it involves cos θ.",
        "After substituting, the equation usually factors or becomes a quadratic in a single trig function. Always bring all terms to one side and factorise rather than dividing through by a trig expression. Dividing by sin θ or cos θ loses any solutions where that factor is zero — a very common error that removes valid answers.",
        "When the equation involves a quadratic in sin θ or cos θ, apply standard factorisation or the quadratic formula. Remember that |sin θ| ≤ 1 and |cos θ| ≤ 1, so discard any factor value outside that range.",
        "Domain handling is critical. If the equation is cos 2θ = something, find 2θ in the doubled domain first, then halve to get θ. For example, if θ ∈ [0°, 360°] then 2θ ∈ [0°, 720°] and you must find all solutions for 2θ in that wider range before dividing by 2.",
        "For compound angle equations such as sin(θ + π/6) = cos θ, expand the left side using the sine addition formula, collect like terms, and solve. These often reduce to a linear or factorable equation once the compound part is opened out.",
      ],
      latexBlocks: [
        "\\sin2\\theta=2\\sin\\theta\\cos\\theta",
        "\\cos2\\theta=2\\cos^2\\theta-1=1-2\\sin^2\\theta=\\cos^2\\theta-\\sin^2\\theta",
        "\\tan2A=\\frac{2\\tan A}{1-\\tan^2A}",
        "\\text{Factorise, do not divide: }\\sin\\theta(2\\cos\\theta-1)=0",
      ],
    },
    workedExamples: trigEquationSolvingExamples,
    guidedPractice: [
      choice(
        "y11ext-ft-eqs-g1",
        "The equation sin 2θ = sin θ is rewritten as sin θ(2 cos θ − 1) = 0. Which single step achieved this?",
        "A",
        [
          "Used sin 2θ = 2 sin θ cos θ and then factorised",
          "Used a cos 2θ identity",
          "Divided both sides by sin θ",
          "Used the product-to-sum formula",
        ],
        "Replacing sin 2θ with 2 sin θ cos θ gives 2 sin θ cos θ − sin θ = 0, which factorises to sin θ(2 cos θ − 1) = 0.",
      ),
      countAnswer(
        "y11ext-ft-eqs-g2",
        "How many solutions does sin 2θ = 0 have for 0 ≤ θ ≤ 2π (include both endpoints)?",
        "\\sin2\\theta=0,\\quad 0\\le\\theta\\le2\\pi",
        "5",
        "2θ ranges over [0, 4π], so sin 2θ = 0 when 2θ = 0, π, 2π, 3π, 4π giving θ = 0, π/2, π, 3π/2, 2π — five solutions.",
      ),
      countAnswer(
        "y11ext-ft-eqs-g3",
        "How many solutions does cos 2θ = cos θ have for 0° ≤ θ ≤ 360°? Use cos 2θ = 2cos²θ − 1.",
        "\\cos2\\theta=\\cos\\theta,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "4",
        "2cos²θ − 1 = cos θ → 2cos²θ − cos θ − 1 = 0 → (2cos θ + 1)(cos θ − 1) = 0 → cos θ = 1 or cos θ = −1/2 → θ = 0°, 120°, 240°, 360°.",
      ),
      choice(
        "y11ext-ft-eqs-g4",
        "Which substitution converts cos 2θ + 3 cos θ + 2 = 0 directly into a quadratic in cos θ?",
        "B",
        [
          "cos 2θ = 1 − 2sin²θ",
          "cos 2θ = 2cos²θ − 1",
          "cos 2θ = cos²θ − sin²θ",
          "cos 2θ = −cos θ",
        ],
        "Using cos 2θ = 2cos²θ − 1 gives 2cos²θ + 3cos θ + 1 = 0, a quadratic in cos θ with no sine terms.",
      ),
    ],
    independentPractice: [
      countAnswer(
        "y11ext-ft-eqs-i1",
        "How many solutions does sin 2θ = sin θ have for 0 ≤ θ ≤ 2π (include both endpoints)?",
        "\\sin2\\theta=\\sin\\theta,\\quad 0\\le\\theta\\le2\\pi",
        "5",
        "sin θ(2 cos θ − 1) = 0 → sin θ = 0 (θ = 0, π, 2π) or cos θ = 1/2 (θ = π/3, 5π/3) — five solutions.",
      ),
      countAnswer(
        "y11ext-ft-eqs-i2",
        "How many solutions does cos 2θ + cos θ = 0 have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta+\\cos\\theta=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "3",
        "Use cos 2θ = 2cos²θ − 1: 2cos²θ + cos θ − 1 = 0 → (2cos θ − 1)(cos θ + 1) = 0 → θ = 60°, 180°, 300°.",
      ),
      choice(
        "y11ext-ft-eqs-i3",
        "Solving sin 2θ = cos θ, a student divides both sides by cos θ to get 2 sin θ = 1. What is the error?",
        "C",
        [
          "The double angle formula was applied incorrectly",
          "The domain was not adjusted for the double angle",
          "Dividing by cos θ loses solutions where cos θ = 0",
          "The equation cannot be solved algebraically",
        ],
        "Dividing by cos θ assumes cos θ ≠ 0, but cos θ = 0 gives valid solutions θ = π/2 and 3π/2 that are lost.",
      ),
      countAnswer(
        "y11ext-ft-eqs-i4",
        "How many solutions does sin 2θ = cos θ have for 0 ≤ θ ≤ 2π?",
        "\\sin2\\theta=\\cos\\theta,\\quad 0\\le\\theta\\le2\\pi",
        "4",
        "cos θ(2 sin θ − 1) = 0 → cos θ = 0 (θ = π/2, 3π/2) or sin θ = 1/2 (θ = π/6, 5π/6) — four solutions.",
      ),
      countAnswer(
        "y11ext-ft-eqs-i5",
        "How many solutions does cos 2θ + sin θ = 0 have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta+\\sin\\theta=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "3",
        "Use cos 2θ = 1 − 2sin²θ: 1 − 2sin²θ + sin θ = 0 → 2sin²θ − sin θ − 1 = 0 → (2sin θ + 1)(sin θ − 1) = 0 → θ = 90°, 210°, 330°.",
      ),
    ],
    commonMistakes: [
      {
        mistake: "Dividing both sides by sin θ or cos θ to simplify.",
        fix: "Always factorise instead. Dividing by a trig function loses all solutions where that function equals zero.",
      },
      {
        mistake: "Using the wrong form of cos 2θ.",
        fix: "Match the form to the other terms: use 1 − 2sin²θ when sin θ appears elsewhere; use 2cos²θ − 1 when cos θ appears elsewhere.",
      },
      {
        mistake: "Forgetting to widen the domain before solving a doubled-angle equation.",
        fix: "If θ ∈ [0°, 360°] and the equation is in 2θ, solve for 2θ ∈ [0°, 720°] first, then halve all solutions.",
      },
    ],
    masteryQuiz: [
      choice(
        "y11ext-ft-eqs-m1",
        "How many solutions does sin 2θ = 0 have on 0 ≤ θ < 2π (excluding 2π)?",
        "C",
        ["2", "3", "4", "5"],
        "2θ ∈ [0, 4π), so sin 2θ = 0 when 2θ = 0, π, 2π, 3π giving θ = 0, π/2, π, 3π/2 — four solutions.",
      ),
      choice(
        "y11ext-ft-eqs-m2",
        "Solving cos 2θ = sin²θ, which form of cos 2θ leads most directly to a quadratic in sin θ?",
        "C",
        [
          "cos²θ − sin²θ",
          "2cos²θ − 1",
          "1 − 2sin²θ",
          "It doesn't matter which form is used",
        ],
        "Using 1 − 2sin²θ gives 1 − 2sin²θ = sin²θ → 3sin²θ = 1, a quadratic in sin θ with no cos θ.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m3",
        "How many solutions does 2 sin 2θ = √3 have for 0° ≤ θ ≤ 360°?",
        "2\\sin2\\theta=\\sqrt3,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "4",
        "sin 2θ = √3/2; 2θ ∈ [0°, 720°] gives 2θ = 60°, 120°, 420°, 480° → θ = 30°, 60°, 210°, 240°.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m4",
        "How many solutions does cos 2θ = sin²θ have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta=\\sin^2\\theta,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "4",
        "1 − 2sin²θ = sin²θ → 3sin²θ = 1 → sin θ = ±1/√3; each gives two angles in [0°, 360°].",
      ),
      countAnswer(
        "y11ext-ft-eqs-m5",
        "How many solutions does sin 2θ − cos θ = 0 have for 0 ≤ θ ≤ 2π?",
        "\\sin2\\theta-\\cos\\theta=0,\\quad 0\\le\\theta\\le2\\pi",
        "4",
        "2 sin θ cos θ − cos θ = 0 → cos θ(2 sin θ − 1) = 0 → θ = π/2, 3π/2, π/6, 5π/6.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m6",
        "How many solutions does cos 2θ + sin θ = 0 have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta+\\sin\\theta=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "3",
        "1 − 2sin²θ + sin θ = 0 → (2sin θ + 1)(sin θ − 1) = 0 → θ = 90°, 210°, 330°.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m7",
        "How many solutions does cos 2θ + 3 cos θ + 2 = 0 have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta+3\\cos\\theta+2=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "3",
        "2cos²θ + 3cos θ + 1 = 0 → (2cos θ + 1)(cos θ + 1) = 0 → cos θ = −1/2 (120°, 240°) or cos θ = −1 (180°).",
      ),
      countAnswer(
        "y11ext-ft-eqs-m8",
        "How many solutions does sin 2θ + 2 sin θ = 0 have for 0° ≤ θ ≤ 360°?",
        "\\sin2\\theta+2\\sin\\theta=0,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "3",
        "2 sin θ cos θ + 2 sin θ = 0 → 2 sin θ(cos θ + 1) = 0 → sin θ = 0 (0°, 180°, 360°) or cos θ = −1 (180°) — distinct solutions: 0°, 180°, 360°.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m9",
        "How many solutions does cos 2θ = cos θ have for 0 ≤ θ ≤ 2π?",
        "\\cos2\\theta=\\cos\\theta,\\quad 0\\le\\theta\\le2\\pi",
        "4",
        "2cos²θ − 1 = cos θ → (2cos θ + 1)(cos θ − 1) = 0 → θ = 0, 2π/3, 4π/3, 2π.",
      ),
      countAnswer(
        "y11ext-ft-eqs-m10",
        "How many solutions does cos 2θ − sin θ = 1 have for 0° ≤ θ ≤ 360°?",
        "\\cos2\\theta-\\sin\\theta=1,\\quad 0^\\circ\\le\\theta\\le360^\\circ",
        "5",
        "1 − 2sin²θ − sin θ − 1 = 0 → sin θ(2sin θ + 1) = 0 → sin θ = 0 (0°, 180°, 360°) or sin θ = −1/2 (210°, 330°).",
      ),
    ],
  };
}

export function year11ExtensionFurtherTrigonometryLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-extension" || unit.slug !== "further-trigonometry") {
    return null;
  }

  if (lesson.slug === "reciprocal-trigonometric-functions") {
    return reciprocalLesson(lesson);
  }

  if (lesson.slug === "compound-angle-formulae") {
    return compoundLesson(lesson);
  }

  if (lesson.slug === "double-angle-formulae") {
    return doubleLesson(lesson);
  }

  if (lesson.slug === "t-formula-subsidiary-angle") {
    return tFormulaLesson(lesson);
  }

  if (lesson.slug === "product-to-sum-identities") {
    return productSumLesson(lesson);
  }

  if (lesson.slug === "trig-equation-solving") {
    return trigEquationSolvingLesson(lesson);
  }

  return null;
}
