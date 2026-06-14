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

const inverseExamples: WorkedExample[] = [
  {
    title: "Use principal values",
    questionLatex: "\\arcsin\\left(\\frac12\\right)",
    steps: [
      { explanation: "The principal range of arcsine is from negative pi over 2 to pi over 2.", latex: "-\\frac\\pi2\\le y\\le\\frac\\pi2" },
      { explanation: "In that range, sine equals one half at pi over 6.", latex: "\\sin\\frac\\pi6=\\frac12" },
    ],
    finalAnswerLatex: "\\frac\\pi6",
  },
  {
    title: "Use arccos range",
    questionLatex: "\\arccos\\left(-\\frac12\\right)",
    steps: [
      { explanation: "The principal range of arccos is zero to pi.", latex: "0\\le y\\le\\pi" },
      { explanation: "Cosine equals negative one half at two pi over three.", latex: "\\cos\\frac{2\\pi}{3}=-\\frac12" },
    ],
    finalAnswerLatex: "\\frac{2\\pi}{3}",
  },
  {
    title: "Solve with inverse tangent",
    questionLatex: "\\tan x=1,\\quad -\\frac\\pi2<x<\\frac\\pi2",
    steps: [
      { explanation: "Arctangent returns the principal solution in this interval.", latex: "x=\\arctan(1)" },
      { explanation: "Use the exact value.", latex: "x=\\frac\\pi4" },
    ],
    finalAnswerLatex: "\\frac\\pi4",
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
      choice("ftrig-comp-m6", "Which formula gives sin(A-B)?", "A", ["$\\sin A\\cos B-\\cos A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\sin A-\\sin B$", "$\\tan A/\\tan B$"], "Sine subtraction changes the sign between the sine-cosine products."),
      choice("ftrig-comp-m7", "Which formula gives cos(A-B)?", "D", ["$\\cos A\\cos B-\\sin A\\sin B$", "$\\sin A\\cos B-\\cos A\\sin B$", "$\\cos A-\\cos B$", "$\\cos A\\cos B+\\sin A\\sin B$"], "Cosine subtraction uses a plus between the products."),
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
        "\\tan2A=\\frac{2\\tan A}{1-\tan^2A}",
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
      choice("ftrig-tf-m6", "Which expression gives R for asin theta+bcos theta?", "D", ["$a+b$", "$ab$", "$a^2+b^2$", "$\\sqrt{a^2+b^2}$"], "R is the Pythagorean magnitude."),
      choice("ftrig-tf-m7", "For Rsin(theta+alpha), which coefficient matches sin theta?", "A", ["$R\\cos\\alpha$", "$R\\sin\\alpha$", "$R\\tan\\alpha$", "$R$"], "Expanding gives Rsin theta cos alpha + Rcos theta sin alpha."),
      choice("ftrig-tf-m8", "What is t in the t-formula?", "B", ["$\\tan\\theta$", "$\\tan(\\theta/2)$", "$\\sin\\theta$", "$\\sec\\theta$"], "The substitution is t=tan(theta/2)."),
      countAnswer("ftrig-tf-m9", "For 5sin theta+12cos theta=Rsin(theta+alpha), find tan alpha.", "5\\sin\\theta+12\\cos\\theta", "12/5", "Rcos alpha=5 and Rsin alpha=12, so tan alpha=12/5."),
      countAnswer("ftrig-tf-m10", "Find the range of 3sin theta+4cos theta using interval notation.", "3\\sin\\theta+4\\cos\\theta", "[-5,5]", "R=5, so the range is [-5,5]."),
    ],
  };
}

function inverseTrigLesson(lesson: CourseLessonSeed): Partial<ExplicitLesson> {
  return {
    ...lessonBase(lesson, "Use inverse trigonometric functions, principal ranges, and simple inverse trig equations.", "Inverse trigonometric functions"),
    learningIntention: "Evaluate inverse trigonometric functions using principal values and solve simple equations.",
    successCriteria: [
      "State the principal range of arcsin, arccos, and arctan.",
      "Evaluate exact inverse trigonometric values.",
      "Use inverse trig functions to solve simple restricted equations.",
      "Distinguish inverse trig notation from reciprocal trig notation.",
    ],
    teaching: {
      paragraphs: [
        "Inverse trigonometric functions return angles, not ratios.",
        "Because sine, cosine, and tangent are not one-to-one on all real numbers, inverse trig functions use restricted principal ranges.",
        "Arcsine returns values from negative pi over two to pi over two, arccosine returns values from zero to pi, and arctangent returns values from negative pi over two to pi over two.",
        "Inverse notation such as sine to the negative one means arcsine in this context, not cosecant.",
      ],
      latexBlocks: [
        "\\arcsin x\\in\\left[-\\frac\\pi2,\\frac\\pi2\\right]",
        "\\arccos x\\in[0,\\pi]",
        "\\arctan x\\in\\left(-\\frac\\pi2,\\frac\\pi2\\right)",
      ],
    },
    workedExamples: inverseExamples,
    guidedPractice: [
      countAnswer("ftrig-inv-g1", "Find arcsin(1/2).", "\\arcsin(1/2)", "pi/6", "The principal angle with sine 1/2 is pi/6.", ["\\pi/6"]),
      countAnswer("ftrig-inv-g2", "Find arccos(1/2).", "\\arccos(1/2)", "pi/3", "The principal angle with cosine 1/2 is pi/3.", ["\\pi/3"]),
      choice("ftrig-inv-g3", "What is the principal range of arccos x?", "B", ["$[-\\pi/2,\\pi/2]$", "$[0,\\pi]$", "$(-\\pi/2,\\pi/2)$", "$[0,2\\pi]$"], "Arccos returns angles from 0 to pi."),
      choice("ftrig-inv-g4", "What does sin^{-1}(x) mean in inverse trig?", "C", ["$1/\\sin x$", "$\\sec x$", "$\\arcsin x$", "$\\sin x$"], "In inverse trig notation it means arcsine."),
    ],
    independentPractice: [
      countAnswer("ftrig-inv-i1", "Find arcsin(0).", "\\arcsin0", "0", "The principal angle with sine zero is 0."),
      countAnswer("ftrig-inv-i2", "Find arccos(-1/2).", "\\arccos(-1/2)", "2pi/3", "In [0,pi], cosine is -1/2 at 2pi/3.", ["2\\pi/3"]),
      countAnswer("ftrig-inv-i3", "Find arctan(1).", "\\arctan1", "pi/4", "The principal angle with tangent 1 is pi/4.", ["\\pi/4"]),
      countAnswer("ftrig-inv-i4", "Find arcsin(-1).", "\\arcsin(-1)", "-pi/2", "The principal angle with sine -1 is -pi/2.", ["-\\pi/2"]),
      choice("ftrig-inv-i5", "Which inverse trig function has range (-pi/2, pi/2)?", "D", ["arccos only", "cosec", "sec", "arctan"], "Arctan uses an open interval from -pi/2 to pi/2."),
    ],
    commonMistakes: [
      { mistake: "Treating inverse sine as reciprocal sine.", fix: "Use arcsin for inverse sine; cosec is reciprocal sine." },
      { mistake: "Giving a non-principal value.", fix: "Check the principal range for the inverse function." },
      { mistake: "Using degrees and radians inconsistently.", fix: "Follow the units used in the question." },
      { mistake: "Using the arcsin range for arccos.", fix: "Arccos returns values from 0 to pi." },
    ],
    masteryQuiz: [
      countAnswer("ftrig-inv-m1", "Find arcsin(1/2).", "\\arcsin(1/2)", "pi/6", "The principal value is pi/6.", ["\\pi/6"]),
      countAnswer("ftrig-inv-m2", "Find arcsin(-1/2).", "\\arcsin(-1/2)", "-pi/6", "The principal value is -pi/6.", ["-\\pi/6"]),
      countAnswer("ftrig-inv-m3", "Find arccos(1).", "\\arccos1", "0", "cos 0=1."),
      countAnswer("ftrig-inv-m4", "Find arccos(-1).", "\\arccos(-1)", "pi", "cos pi=-1.", ["\\pi"]),
      countAnswer("ftrig-inv-m5", "Find arctan(0).", "\\arctan0", "0", "tan 0=0."),
      choice("ftrig-inv-m6", "Which value is in the principal range of arcsin?", "A", ["$\\pi/6$", "$5\\pi/6$", "$3\\pi/2$", "$2\\pi$"], "Arcsin values lie between -pi/2 and pi/2."),
      choice("ftrig-inv-m7", "Which value is in the principal range of arccos?", "C", ["$-\\pi/3$", "$3\\pi/2$", "$2\\pi/3$", "$-\\pi$"], "Arccos values lie from 0 to pi."),
      choice("ftrig-inv-m8", "Which equation is solved by x=arctan(3) on the principal interval?", "B", ["$\\sin x=3$", "$\\tan x=3$", "$\\cos x=3$", "$\\sec x=3$"], "Arctan returns the angle whose tangent is the input."),
      countAnswer("ftrig-inv-m9", "Solve sin x=1/2 for x in [-pi/2, pi/2].", "\\sin x=1/2", "pi/6", "The principal arcsine value is pi/6.", ["\\pi/6"]),
      countAnswer("ftrig-inv-m10", "Solve cos x=-1/2 for x in [0, pi].", "\\cos x=-1/2", "2pi/3", "The arccos principal value is 2pi/3.", ["2\\pi/3"]),
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

  if (lesson.slug === "inverse-trigonometric-functions") {
    return inverseTrigLesson(lesson);
  }

  return null;
}
