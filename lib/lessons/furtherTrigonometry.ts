import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./differentialCalculus";
import { formatChoiceText } from "./questionHelpers";

function trigChoice(
  id: string,
  prompt: string,
  latex: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint = "Choose the identity first, then check signs and quadrant information."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: formatChoiceText(choices[index]),
    })),
    answer,
    hint,
    explanation,
  };
}

function trigNumber(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Keep the answer short and use exact values where possible.",
    explanation: explanation ?? `The answer is ${answer}.`,
  };
}

function furtherTrigLesson(
  id: string,
  title: string,
  description: string,
  learningIntention: string,
  successCriteria: string[],
  teaching: ExplicitLesson["teaching"],
  workedExamples: WorkedExample[],
  guidedPractice: PracticeQuestion[],
  independentPractice: PracticeQuestion[],
  commonMistakes: ExplicitLesson["commonMistakes"],
  masteryQuiz: PracticeQuestion[],
  masteryQuizPool: PracticeQuestion[] = []
): ExplicitLesson {
  return {
    id,
    slug: id,
    moduleSlug: "ma-t2-trigonometric-functions-and-identities",
    moduleTitle: "Trigonometric Functions and Identities",
    courseTitle: "Year 12 Mathematics Advanced",
    title,
    description,
    syllabusArea: "Trigonometry",
    focus: "Further trigonometry",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention,
    successCriteria,
    teaching,
    workedExamples,
    guidedPractice,
    independentPractice,
    commonMistakes,
    masteryQuiz,
    ...(masteryQuizPool.length ? { masteryQuizPool } : {}),
    masteryPassMark: 0.8,
  };
}

export const compoundAngleFormulasLesson = furtherTrigLesson(
  "compound-angle-formulas",
  "Compound Angle Formulas",
  "Use compound angle identities for sine, cosine and tangent, with careful attention to signs and denominator restrictions.",
  "Select and apply compound angle formulas for sine, cosine and tangent expressions.",
  [
    "State the compound angle formulas for sine, cosine and tangent.",
    "Choose the correct identity for a sum or difference of angles.",
    "Identify sign changes in sine and cosine compound angle formulas.",
    "Recognise the denominator in the tangent compound angle formula.",
    "Use compound angle formulas to rewrite expressions.",
    "Avoid false identities such as cos(A+B)=cosA+cosB.",
  ],
  {
    paragraphs: [
      "A trigonometric function does not distribute across addition. For example, $\\cos(60^\\circ+30^\\circ)=\\cos90^\\circ=0$, but $\\cos60^\\circ+\\cos30^\\circ=\\frac12+\\frac{\\sqrt3}{2}$, which is not zero.",
      "Compound angle formulas are the correct tools when one angle is built from two simpler angles. They let us rewrite expressions such as $\\sin(A+B)$ or evaluate angles such as $75^\\circ=45^\\circ+30^\\circ$ using values we already know.",
      "For sine, the sign inside the angle carries through to the middle of the expansion: sine of a sum uses plus, and sine of a difference uses minus.",
      "Cosine has the common trap: its sign reverses. Cosine of a sum uses a minus between the products, while cosine of a difference uses a plus.",
      "Tangent also follows a sign pattern, but its formula is a fraction. Check the denominator because the expression is undefined when that denominator is zero.",
    ],
    latexBlocks: [
      "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B",
      "\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
      "\\tan(A\\pm B)=\\frac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}",
      "\\cos(A+B)\\ne\\cos A+\\cos B",
    ],
  },
  [
    {
      title: "Choose the sine formula",
      questionLatex: "\\sin(A+B)",
      steps: [
        { explanation: "Use the compound angle formula for sine." },
        { explanation: "For a sum, the sign between the terms is plus.", latex: "\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B" },
      ],
      finalAnswerLatex: "\\sin A\\cos B+\\cos A\\sin B",
    },
    {
      title: "Choose the cosine formula",
      questionLatex: "\\cos(A-B)",
      steps: [
        { explanation: "Use the compound angle formula for cosine." },
        { explanation: "For cosine of a difference, the sign between the terms is plus.", latex: "\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B" },
      ],
      finalAnswerLatex: "\\cos A\\cos B+\\sin A\\sin B",
    },
    {
      title: "Use the tangent formula",
      questionLatex: "\\tan(A+B)",
      steps: [
        { explanation: "Write the numerator using the same sign as A+B.", latex: "\\tan A+\\tan B" },
        { explanation: "Write the denominator with the opposite sign.", latex: "1-\\tan A\\tan B" },
      ],
      finalAnswerLatex: "\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}",
    },
  ],
  [
    trigChoice("ftrig-comp-g1", "Choose the correct identity.", "\\sin(A+B)", "A", ["$\\sin A\\cos B+\\cos A\\sin B$", "$\\sin A\\sin B+\\cos A\\cos B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\tan A+\\tan B$"], "The sine sum formula is $\\sin A\\cos B+\\cos A\\sin B$."),
    trigChoice("ftrig-comp-g2", "Choose the correct identity.", "\\cos(A+B)", "C", ["$\\cos A\\cos B+\\sin A\\sin B$", "$\\sin A\\cos B+\\cos A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}$"], "Cosine of a sum uses the minus sign between the two products."),
    trigChoice("ftrig-comp-g3", "Which identity has a denominator restriction?", "\\text{Compound angle formulas}", "D", ["$\\sin(A+B)$", "$\\sin(A-B)$", "$\\cos(A+B)$", "$\\tan(A+B)$"], "The tangent formula is a fraction, so its denominator cannot be zero."),
    trigChoice("ftrig-comp-g4", "Identify the error.", "\\cos(A+B)=\\cos A+\\cos B", "B", ["The signs should be both positive", "Cosine of a sum is not the sum of cosines", "The formula is correct", "Only tangent uses compound angles"], "Compound angle formulas involve products, not direct addition of function values."),
  ],
  [
    trigChoice("ftrig-comp-i1", "Choose the correct expansion.", "\\sin(A-B)", "B", ["$\\sin A\\cos B+\\cos A\\sin B$", "$\\sin A\\cos B-\\cos A\\sin B$", "$\\cos A\\cos B+\\sin A\\sin B$", "$\\frac{\\tan A-\\tan B}{1+\\tan A\\tan B}$"], "For sine of a difference, the sign is minus."),
    trigChoice("ftrig-comp-i2", "Choose the correct expansion.", "\\cos(A-B)", "A", ["$\\cos A\\cos B+\\sin A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\sin A\\cos B-\\cos A\\sin B$", "$\\sin A\\sin B-\\cos A\\cos B$"], "Cosine of a difference uses the plus sign between products."),
    trigChoice("ftrig-comp-i3", "Choose the correct tangent formula.", "\\tan(A-B)", "C", ["$\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}$", "$\\frac{\\tan A-\\tan B}{1-\\tan A\\tan B}$", "$\\frac{\\tan A-\\tan B}{1+\\tan A\\tan B}$", "$\\tan A-\\tan B$"], "The tangent difference formula has numerator $\\tan A-\\tan B$ and denominator $1+\\tan A\\tan B$."),
    trigChoice("ftrig-comp-i4", "Which expression matches the identity?", "\\sin(x+\\pi/3)", "D", ["$\\sin x\\sin\\frac{\\pi}{3}+\\cos x\\cos\\frac{\\pi}{3}$", "$\\cos x\\cos\\frac{\\pi}{3}-\\sin x\\sin\\frac{\\pi}{3}$", "$\\sin x+\\sin\\frac{\\pi}{3}$", "$\\sin x\\cos\\frac{\\pi}{3}+\\cos x\\sin\\frac{\\pi}{3}$"], "Use the sine sum formula."),
    trigChoice("ftrig-comp-i5", "Which expression matches the identity?", "\\cos(x-\\pi/4)", "A", ["$\\cos x\\cos\\frac{\\pi}{4}+\\sin x\\sin\\frac{\\pi}{4}$", "$\\cos x\\cos\\frac{\\pi}{4}-\\sin x\\sin\\frac{\\pi}{4}$", "$\\sin x\\cos\\frac{\\pi}{4}-\\cos x\\sin\\frac{\\pi}{4}$", "$\\cos x-\\cos\\frac{\\pi}{4}$"], "Use the cosine difference formula."),
  ],
  [
    { mistake: "Writing $\\cos(A+B)=\\cos A+\\cos B$.", fix: "Use products: $\\cos A\\cos B-\\sin A\\sin B$." },
    { mistake: "Using the same sign pattern for sine and cosine.", fix: "Sine keeps the sign; cosine reverses it." },
    { mistake: "Forgetting the denominator in the tangent formula.", fix: "Tangent compound formulas are fractions." },
    { mistake: "Ignoring when the tangent denominator is zero.", fix: "Check $1\\mp\\tan A\\tan B\\ne0$." },
  ],
  [
    trigChoice("ftrig-comp-m1", "Choose the correct formula.", "\\sin(A+B)", "A", ["$\\sin A\\cos B+\\cos A\\sin B$", "$\\sin A\\cos B-\\cos A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\cos A\\cos B+\\sin A\\sin B$"], "The sine sum formula has a plus sign."),
    trigChoice("ftrig-comp-m2", "Choose the correct formula.", "\\cos(A+B)", "C", ["$\\cos A\\cos B+\\sin A\\sin B$", "$\\sin A\\cos B+\\cos A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}$"], "The cosine sum formula has a minus sign."),
    trigChoice("ftrig-comp-m3", "Choose the correct formula.", "\\tan(A+B)", "D", ["$\\tan A+\\tan B$", "$\\frac{\\tan A+\\tan B}{1+\\tan A\\tan B}$", "$\\frac{\\tan A-\\tan B}{1+\\tan A\\tan B}$", "$\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}$"], "The denominator has $1-\\tan A\\tan B$."),
    trigChoice("ftrig-comp-m4", "Which formula would expand the expression?", "\\cos(3x-y)", "B", ["$\\sin(A-B)$", "$\\cos(A-B)$", "$\\cos(A+B)$", "$\\tan(A-B)$"], "The expression is cosine of a difference."),
    trigChoice("ftrig-comp-m5", "Identify the correct expression.", "\\sin(2x-y)", "A", ["$\\sin2x\\cos y-\\cos2x\\sin y$", "$\\sin2x\\cos y+\\cos2x\\sin y$", "$\\cos2x\\cos y+\\sin2x\\sin y$", "$\\tan2x-\\tan y$"], "Use the sine difference formula."),
    trigChoice("ftrig-comp-m6", "Identify the correct expression.", "\\cos(2x+y)", "C", ["$\\cos2x\\cos y+\\sin2x\\sin y$", "$\\sin2x\\cos y+\\cos2x\\sin y$", "$\\cos2x\\cos y-\\sin2x\\sin y$", "$\\cos2x+\\cos y$"], "Use the cosine sum formula."),
    trigChoice("ftrig-comp-m7", "A student expands $\\sin(A-B)$ using a plus sign. What is the error?", "\\sin(A-B)", "B", ["They used a cosine formula", "The sine difference formula uses a minus sign", "The tangent denominator is missing", "The expression cannot be expanded"], "For sine, the sign matches the sign in the angle expression."),
    trigChoice("ftrig-comp-m8", "Which denominator belongs with the tangent sum formula?", "\\tan(A+B)", "A", ["$1-\\tan A\\tan B$", "$1+\\tan A\\tan B$", "$\\tan A+\\tan B$", "$\\cos A\\cos B$"], "The tangent sum formula has denominator $1-\\tan A\\tan B$."),
    trigChoice("ftrig-comp-m9", "Which identity is most useful for rewriting this expression?", "\\sin x\\cos y+\\cos x\\sin y", "D", ["$\\cos(x+y)$", "$\\cos(x-y)$", "$\\tan(x+y)$", "$\\sin(x+y)$"], "The expression matches the sine sum identity."),
    trigChoice("ftrig-comp-m10", "Which statement is correct about $\\tan(A+B)$?", "\\tan(A+B)=\\frac{\\tan A+\\tan B}{1-\\tan A\\tan B}", "C", ["It is always defined", "It equals $\\tan A+\\tan B$", "It is undefined when the denominator is zero", "It uses cosine products only"], "The formula is a fraction, so the denominator must not be zero."),
  ]
);

export const exactValuesCompoundAnglesLesson = furtherTrigLesson(
  "exact-values-compound-angles",
  "Exact Values with Compound Angles",
  "Evaluate exact trigonometric values for non-standard angles by expressing them as sums or differences of known angles.",
  "Use compound angle formulas to evaluate exact trigonometric values such as 15, 75, 105 and 165 degrees.",
  [
    "Rewrite non-standard angles as sums or differences of known angles.",
    "Use compound angle identities to evaluate exact sine, cosine and tangent values.",
    "Choose signs using quadrant information.",
    "Recognise radian equivalents for common compound angles.",
    "Select exact surd values without relying on rounded decimals.",
    "Avoid typing fragile surd expressions in digital answers.",
  ],
  {
    paragraphs: [
      "Angles such as 15 degrees and 75 degrees can be built from 45 degrees and 30 degrees.",
      "After choosing a useful decomposition, apply the matching compound angle formula.",
      "Quadrant signs still matter. For example, 105 degrees is in quadrant II, so cosine is negative.",
      "Exact values are kept in surd form, not rounded decimal form.",
      "In this digital course, exact surd answers are usually multiple choice so equivalent forms do not cause marking problems.",
    ],
    latexBlocks: [
      "75^\\circ=45^\\circ+30^\\circ",
      "15^\\circ=45^\\circ-30^\\circ",
      "\\frac{\\pi}{12}=\\frac{\\pi}{4}-\\frac{\\pi}{6}",
      "\\frac{5\\pi}{12}=\\frac{\\pi}{4}+\\frac{\\pi}{6}",
    ],
  },
  [
    {
      title: "Find sin 75 degrees",
      questionLatex: "\\sin75^\\circ",
      steps: [
        { explanation: "Write 75 degrees as a sum of known angles.", latex: "75^\\circ=45^\\circ+30^\\circ" },
        { explanation: "Use the sine sum formula.", latex: "\\sin75^\\circ=\\sin45^\\circ\\cos30^\\circ+\\cos45^\\circ\\sin30^\\circ" },
        { explanation: "Substitute exact values and simplify.", latex: "\\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2}+\\frac{\\sqrt2}{2}\\cdot\\frac12=\\frac{\\sqrt6+\\sqrt2}{4}" },
      ],
      finalAnswerLatex: "\\frac{\\sqrt6+\\sqrt2}{4}",
    },
    {
      title: "Find cos 15 degrees",
      questionLatex: "\\cos15^\\circ",
      steps: [
        { explanation: "Write 15 degrees as a difference.", latex: "15^\\circ=45^\\circ-30^\\circ" },
        { explanation: "Use the cosine difference formula.", latex: "\\cos(45^\\circ-30^\\circ)=\\cos45^\\circ\\cos30^\\circ+\\sin45^\\circ\\sin30^\\circ" },
        { explanation: "Substitute exact values.", latex: "\\frac{\\sqrt6+\\sqrt2}{4}" },
      ],
      finalAnswerLatex: "\\frac{\\sqrt6+\\sqrt2}{4}",
    },
    {
      title: "Find tan 75 degrees",
      questionLatex: "\\tan75^\\circ",
      steps: [
        { explanation: "Write 75 degrees as 45 plus 30.", latex: "75^\\circ=45^\\circ+30^\\circ" },
        { explanation: "Use the tangent sum formula.", latex: "\\tan75^\\circ=\\frac{1+\\frac{1}{\\sqrt3}}{1-\\frac{1}{\\sqrt3}}" },
        { explanation: "Simplify the exact value.", latex: "2+\\sqrt3" },
      ],
      finalAnswerLatex: "2+\\sqrt3",
    },
  ],
  [
    trigChoice("ftrig-exact-g1", "Which decomposition is useful?", "75^\\circ", "A", ["$45^\\circ+30^\\circ$", "$90^\\circ+30^\\circ$", "$60^\\circ-45^\\circ$", "$180^\\circ-15^\\circ$"], "75 degrees can be written as 45 plus 30."),
    trigChoice("ftrig-exact-g2", "Choose the exact value.", "\\sin75^\\circ", "B", ["$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt3}{2}$", "$\\frac12$"], "Using $45^\\circ+30^\\circ$ gives $\\frac{\\sqrt6+\\sqrt2}{4}$."),
    trigChoice("ftrig-exact-g3", "Choose the exact value.", "\\cos15^\\circ", "B", ["$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt2}{2}$", "$\\frac{\\sqrt3}{2}$"], "Cosine 15 degrees is $\\frac{\\sqrt6+\\sqrt2}{4}$."),
    trigChoice("ftrig-exact-g4", "Which quadrant sign applies?", "\\cos105^\\circ", "C", ["positive", "zero", "negative", "undefined"], "105 degrees lies in quadrant II, where cosine is negative."),
  ],
  [
    trigChoice("ftrig-exact-i1", "Choose the exact value.", "\\sin15^\\circ", "A", ["$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt3}{2}$", "$\\frac12$"], "Sine 15 degrees is found using $45^\\circ-30^\\circ$."),
    trigChoice("ftrig-exact-i2", "Choose the exact value.", "\\cos75^\\circ", "A", ["$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$-\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt2}{2}$"], "Cosine 75 degrees is positive and equals $\\frac{\\sqrt6-\\sqrt2}{4}$."),
    trigChoice("ftrig-exact-i3", "Choose the exact value.", "\\tan75^\\circ", "D", ["$2-\\sqrt3$", "$\\sqrt3-1$", "$1+\\sqrt3$", "$2+\\sqrt3$"], "Using the tangent sum formula gives $2+\\sqrt3$."),
    trigChoice("ftrig-exact-i4", "Choose the radian equivalent.", "15^\\circ", "B", ["$\\frac{\\pi}{6}$", "$\\frac{\\pi}{12}$", "$\\frac{\\pi}{4}$", "$\\frac{5\\pi}{12}$"], "15 degrees is $\\frac{\\pi}{12}$."),
    trigChoice("ftrig-exact-i5", "Choose the exact value.", "\\sin165^\\circ", "A", ["$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$-\\frac{\\sqrt6+\\sqrt2}{4}$"], "165 degrees has reference angle 15 degrees and sine is positive in quadrant II."),
  ],
  [
    { mistake: "Rounding exact values to decimals.", fix: "Keep exact values in surd form unless an approximation is requested." },
    { mistake: "Choosing a decomposition that uses unknown angles.", fix: "Use known angles such as 30, 45 and 60 degrees." },
    { mistake: "Forgetting quadrant signs.", fix: "Check the quadrant before selecting the final sign." },
    { mistake: "Typing surd expressions in many equivalent forms.", fix: "Use multiple choice for exact surd values in this renderer." },
  ],
  [
    trigChoice("ftrig-exact-m1", "Choose a useful decomposition.", "15^\\circ", "C", ["$60^\\circ+45^\\circ$", "$90^\\circ-45^\\circ$", "$45^\\circ-30^\\circ$", "$30^\\circ-15^\\circ$"], "15 degrees is 45 minus 30."),
    trigChoice("ftrig-exact-m2", "Choose the exact value.", "\\sin75^\\circ", "A", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt3}{2}$", "$\\frac{\\sqrt2}{2}$"], "Sine 75 degrees uses the sine sum identity."),
    trigChoice("ftrig-exact-m3", "Choose the exact value.", "\\cos75^\\circ", "B", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac12$"], "Cosine 75 degrees is $\\frac{\\sqrt6-\\sqrt2}{4}$."),
    trigChoice("ftrig-exact-m4", "Choose the exact value.", "\\tan15^\\circ", "C", ["$2+\\sqrt3$", "$\\sqrt3+1$", "$2-\\sqrt3$", "$\\sqrt3-2$"], "Tangent 15 degrees is $2-\\sqrt3$."),
    trigChoice("ftrig-exact-m5", "Choose the exact value.", "\\cos105^\\circ", "D", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt2-\\sqrt6}{4}$"], "105 degrees is in quadrant II, so the value is negative."),
    trigChoice("ftrig-exact-m6", "Choose the exact value.", "\\sin\\left(\\frac{5\\pi}{12}\\right)", "A", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt3}{2}$", "$\\frac12$"], "$\\frac{5\\pi}{12}$ is 75 degrees."),
    trigChoice("ftrig-exact-m7", "Which angle has exact value $2+\\sqrt3$ for tangent?", "\\tan\\theta", "C", ["$15^\\circ$", "$30^\\circ$", "$75^\\circ$", "$105^\\circ$"], "$\\tan75^\\circ=2+\\sqrt3$."),
    trigChoice("ftrig-exact-m8", "Which choice explains why the value is negative?", "\\cos105^\\circ", "B", ["105 degrees is in quadrant I", "105 degrees is in quadrant II where cosine is negative", "105 degrees is a special angle with tangent undefined", "Cosine is always negative for compound angles"], "Quadrant II gives negative cosine."),
    trigChoice("ftrig-exact-m9", "Choose the exact value.", "\\sin105^\\circ", "A", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt2-\\sqrt6}{4}$"], "105 degrees has reference angle 75 degrees for sine and is positive in quadrant II."),
    trigChoice("ftrig-exact-m10", "Which identity and angle split best supports this exact value?", "\\cos15^\\circ", "D", ["$\\sin(45^\\circ+30^\\circ)$", "$\\cos(60^\\circ+45^\\circ)$", "$\\tan(45^\\circ-30^\\circ)$", "$\\cos(45^\\circ-30^\\circ)$"], "Cosine 15 degrees is naturally found using $\\cos(45^\\circ-30^\\circ)$."),
  ],
  [
    { id: "t2-pool-d5-3", prompt: "Given $\\cos\\theta=\\sin 30^\\circ$ with $\\theta$ acute, find $\\theta$ (in degrees).", latex: "\\cos\\theta=\\sin 30^\\circ", answer: "60", acceptedAnswers: ["60°", "60 degrees"], hint: "$\\sin 30^\\circ=\\tfrac12$; which acute angle has cosine $\\tfrac12$?", explanation: "$\\sin 30^\\circ=0.5$ and $\\cos 60^\\circ=0.5$, so $\\theta=60^\\circ$.", difficulty: 5 },
  ]
);

export const doubleAngleFormulasLesson = furtherTrigLesson(
  "double-angle-formulas",
  "Double Angle Formulas",
  "Use sine, cosine and tangent double-angle identities, including equivalent cosine forms and denominator restrictions.",
  "Apply double-angle formulas to simplify expressions and choose useful forms for calculations.",
  [
    "State the double-angle formulas for sine, cosine and tangent.",
    "Use equivalent forms of cos(2A).",
    "Choose the most useful double-angle form for a context.",
    "Recognise denominator restrictions in tan(2A).",
    "Simplify expressions using double-angle identities.",
    "Identify common sign and coefficient errors.",
  ],
  {
    paragraphs: [
      "Double-angle formulas do not appear from nowhere. They come from the compound angle formulas by setting the two angles equal: write $2A$ as $A+A$.",
      "For sine, substituting $A+A$ gives two identical products, so they combine to make $\\sin2A=2\\sin A\\cos A$.",
      "For cosine, the first form is $\\cos2A=\\cos^2A-\\sin^2A$. The Pythagorean identity $\\sin^2A+\\cos^2A=1$ lets us replace either squared term, producing the two equivalent forms $2\\cos^2A-1$ and $1-2\\sin^2A$.",
      "Choose the cosine form that matches the information you already have. Use $2\\cos^2A-1$ when cosine is known, $1-2\\sin^2A$ when sine is known, and $\\cos^2A-\\sin^2A$ when both appear naturally.",
      "The tangent double-angle formula comes from substituting $B=A$ into the tangent sum formula. It stays a fraction, so the denominator $1-\\tan^2A$ must not be zero.",
    ],
    latexBlocks: [
      "\\sin2A=2\\sin A\\cos A",
      "\\cos2A=\\cos^2A-\\sin^2A",
      "\\cos2A=2\\cos^2A-1=1-2\\sin^2A",
      "\\tan2A=\\frac{2\\tan A}{1-\\tan^2A}",
    ],
  },
  [
    {
      title: "Use sin 2A",
      questionLatex: "\\sin2A",
      steps: [
        { explanation: "Use the double-angle formula for sine.", latex: "\\sin2A=2\\sin A\\cos A" },
        { explanation: "The factor of 2 is essential." },
      ],
      finalAnswerLatex: "2\\sin A\\cos A",
    },
    {
      title: "Choose a cosine double-angle form",
      questionLatex: "\\cos2A\\quad \\text{given }\\cos A",
      steps: [
        { explanation: "When cosine is given, choose the form involving cosine only.", latex: "\\cos2A=2\\cos^2A-1" },
        { explanation: "This avoids needing to find sine first." },
      ],
      finalAnswerLatex: "2\\cos^2A-1",
    },
    {
      title: "Simplify with a double-angle identity",
      questionLatex: "2\\sin x\\cos x",
      steps: [
        { explanation: "Recognise the sine double-angle form.", latex: "2\\sin x\\cos x=\\sin2x" },
      ],
      finalAnswerLatex: "\\sin2x",
    },
  ],
  [
    trigChoice("ftrig-double-g1", "Choose the correct identity.", "\\sin2A", "B", ["$\\sin^2A+\\cos^2A$", "$2\\sin A\\cos A$", "$2\\sin A$", "$\\sin A+\\cos A$"], "The sine double-angle formula is $2\\sin A\\cos A$."),
    trigChoice("ftrig-double-g2", "Choose a correct form.", "\\cos2A", "A", ["$2\\cos^2A-1$", "$2\\cos A-1$", "$1+2\\sin^2A$", "$\\cos^2A+\\sin^2A$"], "One cosine double-angle form is $2\\cos^2A-1$."),
    trigChoice("ftrig-double-g3", "Choose the correct identity.", "\\tan2A", "D", ["$2\\tan A$", "$\\frac{\\tan A}{1-\\tan A}$", "$\\frac{1-\\tan^2A}{2\\tan A}$", "$\\frac{2\\tan A}{1-\\tan^2A}$"], "The tangent double-angle formula is $\\frac{2\\tan A}{1-\\tan^2A}$."),
    trigChoice("ftrig-double-g4", "Simplify the expression.", "2\\sin x\\cos x", "C", ["$\\cos2x$", "$\\tan2x$", "$\\sin2x$", "$1$"], "This is the sine double-angle identity."),
  ],
  [
    trigChoice("ftrig-double-i1", "Which form is best when $\\sin A$ is known?", "\\cos2A", "C", ["$2\\cos^2A-1$", "$\\cos^2A-\\sin^2A$", "$1-2\\sin^2A$", "$\\frac{2\\tan A}{1-\\tan^2A}$"], "The form $1-2\\sin^2A$ uses sine only."),
    trigChoice("ftrig-double-i2", "Simplify the expression.", "1-2\\sin^2x", "B", ["$\\sin2x$", "$\\cos2x$", "$\\tan2x$", "$1$"], "This is a cosine double-angle form."),
    trigChoice("ftrig-double-i3", "Simplify the expression.", "2\\cos^2x-1", "B", ["$\\sin2x$", "$\\cos2x$", "$\\tan2x$", "$\\cos x$"], "This is another form of $\\cos2x$."),
    trigChoice("ftrig-double-i4", "What restriction applies to the tangent double-angle formula?", "\\tan2A=\\frac{2\\tan A}{1-\\tan^2A}", "A", ["$1-\\tan^2A\\ne0$", "$\\sin A\\ne0$", "$\\cos2A=0$", "$A\\ne0$ only"], "The denominator cannot be zero."),
    trigChoice("ftrig-double-i5", "Choose the correct simplification.", "\\cos^2x-\\sin^2x", "D", ["$1$", "$\\sin2x$", "$\\tan2x$", "$\\cos2x$"], "This is the primary cosine double-angle identity."),
  ],
  [
    { mistake: "Forgetting the factor of 2 in $\\sin2A$.", fix: "Use $\\sin2A=2\\sin A\\cos A$." },
    { mistake: "Using only one cosine double-angle form.", fix: "Choose from $\\cos^2A-\\sin^2A$, $2\\cos^2A-1$, and $1-2\\sin^2A$." },
    { mistake: "Writing $\\tan2A=2\\tan A$.", fix: "Use the fraction $\\frac{2\\tan A}{1-\\tan^2A}$." },
    { mistake: "Ignoring denominator restrictions.", fix: "Check $1-\\tan^2A\\ne0$ for tangent double-angle work." },
  ],
  [
    trigChoice("ftrig-double-m1", "Choose the correct identity.", "\\sin2x", "A", ["$2\\sin x\\cos x$", "$\\sin^2x+\\cos^2x$", "$2\\sin x$", "$\\sin x+\\cos x$"], "The sine double-angle formula has both sine and cosine."),
    trigChoice("ftrig-double-m2", "Choose the expression equal to $\\cos2x$.", "\\cos2x", "C", ["$1+2\\sin^2x$", "$2\\sin^2x-1$", "$1-2\\sin^2x$", "$2\\sin x\\cos x$"], "$\\cos2x=1-2\\sin^2x$."),
    trigChoice("ftrig-double-m3", "Simplify the expression.", "2\\cos^2x-1", "B", ["$\\sin2x$", "$\\cos2x$", "$\\tan2x$", "$1$"], "This is a cosine double-angle form."),
    trigChoice("ftrig-double-m4", "Simplify the expression.", "\\frac{2\\tan x}{1-\\tan^2x}", "D", ["$\\sin2x$", "$\\cos2x$", "$2\\tan x$", "$\\tan2x$"], "This is the tangent double-angle formula."),
    trigChoice("ftrig-double-m5", "Choose the most useful identity.", "\\text{given }\\cos x=\\frac35\\text{, find }\\cos2x", "B", ["$1-2\\sin^2x$", "$2\\cos^2x-1$", "$2\\sin x\\cos x$", "$\\frac{2\\tan x}{1-\\tan^2x}$"], "Since cosine is given, $2\\cos^2x-1$ is direct."),
    trigChoice("ftrig-double-m6", "Choose the most useful identity.", "\\text{given }\\sin x=\\frac14\\text{, find }\\cos2x", "A", ["$1-2\\sin^2x$", "$2\\cos^2x-1$", "$2\\sin x\\cos x$", "$\\sin(x+x)$"], "Since sine is given, $1-2\\sin^2x$ is direct."),
    trigChoice("ftrig-double-m7", "Identify the error.", "\\tan2A=2\\tan A", "C", ["The numerator should be 1", "The formula should use cosine products", "The denominator is missing", "The formula is correct"], "The tangent double-angle identity is a fraction."),
    trigChoice("ftrig-double-m8", "Which expression is not generally equal to $\\cos2x$?", "\\cos2x", "D", ["$\\cos^2x-\\sin^2x$", "$2\\cos^2x-1$", "$1-2\\sin^2x$", "$\\cos x+\\cos x$"], "Cosine double-angle is not simply twice cosine."),
    trigChoice("ftrig-double-m9", "Choose the correct simplification.", "1-2\\sin^2(3x)", "B", ["$\\sin6x$", "$\\cos6x$", "$\\cos3x$", "$\\tan6x$"], "Use $1-2\\sin^2A=\\cos2A$ with $A=3x$."),
    trigChoice("ftrig-double-m10", "Which conclusion is safest for this tangent formula?", "1-\\tan^2A=0", "A", ["The formula for $\\tan2A$ is undefined", "$\\tan2A=0$", "$\\sin2A=0$", "$\\cos2A=1$"], "A zero denominator makes the tangent double-angle fraction undefined."),
  ]
);

export const furtherTrigEquationsIdentitiesLesson = furtherTrigLesson(
  "further-trig-equations-identities",
  "Further Trigonometry Equations and Identities",
  "Use compound and double-angle identities to simplify expressions and solve selected trigonometric equations.",
  "Recognise when compound or double-angle identities can simplify expressions and equations.",
  [
    "Recognise expressions that match compound angle identities.",
    "Recognise expressions that match double-angle identities.",
    "Use identities to simplify before solving.",
    "Select solutions from a given domain using multiple choice.",
    "Avoid proof-style typed answers in digital questions.",
    "Check denominator restrictions for tangent identities.",
  ],
  {
    paragraphs: [
      "Further trigonometry questions often hide a compound or double-angle identity inside an expression.",
      "Simplification usually begins by matching the expression to a known identity.",
      "For equation solving, identities can reduce a complicated expression to a familiar trigonometric equation.",
      "Domain restrictions still matter. Multiple-choice solution sets are used here to avoid fragile multi-value typed answers.",
      "For tangent identities, check that denominators are not zero.",
    ],
    latexBlocks: [
      "\\sin x\\cos y+\\cos x\\sin y=\\sin(x+y)",
      "\\cos x\\cos y+\\sin x\\sin y=\\cos(x-y)",
      "2\\sin x\\cos x=\\sin2x",
      "1-2\\sin^2x=\\cos2x",
    ],
  },
  [
    {
      title: "Recognise a compound angle",
      questionLatex: "\\sin x\\cos y+\\cos x\\sin y",
      steps: [
        { explanation: "Compare the expression with the sine sum formula.", latex: "\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B" },
        { explanation: "The expression matches with A = x and B = y." },
      ],
      finalAnswerLatex: "\\sin(x+y)",
    },
    {
      title: "Recognise a double-angle expression",
      questionLatex: "2\\sin x\\cos x",
      steps: [
        { explanation: "Use the sine double-angle identity.", latex: "2\\sin x\\cos x=\\sin2x" },
      ],
      finalAnswerLatex: "\\sin2x",
    },
    {
      title: "Solve after simplifying",
      questionLatex: "2\\sin x\\cos x=0,\\quad 0\\le x\\le\\pi",
      steps: [
        { explanation: "Use the double-angle identity.", latex: "\\sin2x=0" },
        { explanation: "Solve in the stated domain.", latex: "x=0,\\frac{\\pi}{2},\\pi" },
      ],
      finalAnswerLatex: "0,\\frac{\\pi}{2},\\pi",
    },
  ],
  [
    trigChoice("ftrig-id-g1", "Simplify the expression.", "\\sin x\\cos y+\\cos x\\sin y", "A", ["$\\sin(x+y)$", "$\\sin(x-y)$", "$\\cos(x+y)$", "$\\cos(x-y)$"], "The expression matches the sine sum identity."),
    trigChoice("ftrig-id-g2", "Simplify the expression.", "\\cos x\\cos y+\\sin x\\sin y", "D", ["$\\cos(x+y)$", "$\\sin(x+y)$", "$\\sin(x-y)$", "$\\cos(x-y)$"], "The expression matches the cosine difference identity."),
    trigChoice("ftrig-id-g3", "Simplify the expression.", "2\\sin x\\cos x", "B", ["$\\cos2x$", "$\\sin2x$", "$\\tan2x$", "$1$"], "This is the sine double-angle identity."),
    trigChoice("ftrig-id-g4", "Which identity is most useful first?", "1-2\\sin^2x=0", "C", ["compound sine", "compound tangent", "cosine double-angle", "Pythagorean identity only"], "The left side is $\\cos2x$."),
  ],
  [
    trigChoice("ftrig-id-i1", "Simplify the expression.", "\\sin x\\cos y-\\cos x\\sin y", "B", ["$\\sin(x+y)$", "$\\sin(x-y)$", "$\\cos(x-y)$", "$\\tan(x-y)$"], "The expression matches the sine difference identity."),
    trigChoice("ftrig-id-i2", "Simplify the expression.", "\\cos x\\cos y-\\sin x\\sin y", "A", ["$\\cos(x+y)$", "$\\cos(x-y)$", "$\\sin(x+y)$", "$\\sin(x-y)$"], "The expression matches the cosine sum identity."),
    trigChoice("ftrig-id-i3", "Choose the solutions.", "2\\sin x\\cos x=0,\\quad 0\\le x\\le\\pi", "C", ["$x=\\frac{\\pi}{4}$ only", "$x=0,\\pi$", "$x=0,\\frac{\\pi}{2},\\pi$", "$x=\\frac{\\pi}{2}$ only"], "The equation becomes $\\sin2x=0$."),
    trigChoice("ftrig-id-i4", "Choose the equivalent equation.", "1-2\\sin^2x=0", "D", ["$\\sin2x=0$", "$\\tan2x=0$", "$\\cos x=0$", "$\\cos2x=0$"], "Use $1-2\\sin^2x=\\cos2x$."),
    trigChoice("ftrig-id-i5", "Which expression shows a tangent denominator restriction?", "\\text{Select A, B, C, or D.}", "B", ["$2\\sin x\\cos x$", "$\\frac{2\\tan x}{1-\\tan^2x}$", "$\\cos^2x-\\sin^2x$", "$\\sin x\\cos y$"], "The tangent double-angle formula has a denominator."),
  ],
  [
    { mistake: "Trying to expand everything before recognising an identity.", fix: "Look for a known compound or double-angle pattern first." },
    { mistake: "Giving a proof-style response in a short-answer field.", fix: "Use multiple choice for full identity transformations." },
    { mistake: "Ignoring the stated domain when solving.", fix: "Check all solutions against the domain." },
    { mistake: "Forgetting tangent denominator restrictions.", fix: "Check the denominator before using tangent identities." },
  ],
  [
    trigChoice("ftrig-id-m1", "Simplify the expression.", "\\sin x\\cos y+\\cos x\\sin y", "A", ["$\\sin(x+y)$", "$\\sin(x-y)$", "$\\cos(x+y)$", "$\\cos(x-y)$"], "This is the sine sum identity."),
    trigChoice("ftrig-id-m2", "Simplify the expression.", "\\cos x\\cos y-\\sin x\\sin y", "C", ["$\\sin(x+y)$", "$\\cos(x-y)$", "$\\cos(x+y)$", "$\\tan(x+y)$"], "This is the cosine sum identity."),
    trigChoice("ftrig-id-m3", "Simplify the expression.", "1-2\\sin^2(2x)", "D", ["$\\sin4x$", "$\\cos2x$", "$\\tan4x$", "$\\cos4x$"], "Use $1-2\\sin^2A=\\cos2A$ with A = 2x."),
    trigChoice("ftrig-id-m4", "Simplify the expression.", "2\\sin(3x)\\cos(3x)", "B", ["$\\sin3x$", "$\\sin6x$", "$\\cos6x$", "$\\tan6x$"], "Use $2\\sin A\\cos A=\\sin2A$ with A = 3x."),
    trigChoice("ftrig-id-m5", "Choose the equivalent equation.", "2\\sin x\\cos x=\\frac12", "A", ["$\\sin2x=\\frac12$", "$\\cos2x=\\frac12$", "$\\tan2x=\\frac12$", "$\\sin x=\\frac12$"], "The left side is $\\sin2x$."),
    trigChoice("ftrig-id-m6", "Choose the solutions.", "\\cos2x=0,\\quad 0\\le x\\le\\pi", "C", ["$x=0,\\pi$", "$x=\\frac{\\pi}{2}$ only", "$x=\\frac{\\pi}{4},\\frac{3\\pi}{4}$", "$x=\\frac{\\pi}{6},\\frac{5\\pi}{6}$"], "Cosine is zero when $2x=\\frac{\\pi}{2},\\frac{3\\pi}{2}$ in the matching range."),
    trigChoice("ftrig-id-m7", "Which identity matches the expression?", "\\frac{2\\tan x}{1-\\tan^2x}", "D", ["$\\sin2x$", "$\\cos2x$", "$\\tan(x-y)$", "$\\tan2x$"], "This is the tangent double-angle formula."),
    trigChoice("ftrig-id-m8", "A student simplifies $\\cos x\\cos y+\\sin x\\sin y$ to $\\cos(x+y)$. What is the error?", "\\cos x\\cos y+\\sin x\\sin y", "B", ["The expression is not a compound angle pattern", "The plus sign matches $\\cos(x-y)$, not $\\cos(x+y)$", "It should equal $\\sin(x+y)$", "It should equal $\\tan(x-y)$"], "Cosine difference has the plus sign between products."),
    trigChoice("ftrig-id-m9", "Which first step is most efficient?", "1-2\\sin^2x=\\frac12", "A", ["Rewrite the left side as $\\cos2x$", "Differentiate both sides", "Use $\\cos(A+B)$", "Divide by $\\sin x$"], "Recognising $\\cos2x$ makes the equation simpler."),
    trigChoice("ftrig-id-m10", "Choose the safest conclusion.", "\\tan2x=\\frac{2\\tan x}{1-\\tan^2x}", "D", ["It can be used for every x-value", "It has no denominator restriction", "It proves tangent is always positive", "It requires $1-\\tan^2x\\ne0$"], "The denominator restriction must be checked."),
  ]
);

export const furtherTrigonometryExamPracticeLesson = furtherTrigLesson(
  "further-trigonometry-exam-practice",
  "Further Trigonometry Exam Practice",
  "Practise mixed HSC-style further trigonometry questions involving compound angles, exact values, double angles and identities.",
  "Select and apply compound and double-angle identities in mixed exam-style questions.",
  [
    "Choose an appropriate identity in mixed further trigonometry questions.",
    "Evaluate exact values using compound angles.",
    "Use double-angle identities to simplify expressions.",
    "Recognise common sign and denominator errors.",
    "Solve simple identity-based trigonometric equations using multiple choice.",
    "Distinguish exact values from approximations.",
  ],
  {
    paragraphs: [
      "Mixed further trigonometry questions often ask you to choose the right identity before doing any calculation.",
      "Compound angle formulas are useful for exact values and expressions involving A plus or minus B.",
      "Double-angle formulas are useful when the expression contains 2x, squared sine or cosine, or the product 2 sin x cos x.",
      "Exact surd values should stay exact. In this course, those answers are usually selected from multiple-choice options.",
      "For equations, use identities to simplify first, then apply the domain carefully.",
    ],
    latexBlocks: [
      "\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B",
      "\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B",
      "\\sin2A=2\\sin A\\cos A",
      "\\cos2A=2\\cos^2A-1=1-2\\sin^2A",
    ],
  },
  [
    {
      title: "Mixed identity recognition",
      questionLatex: "\\cos x\\cos y+\\sin x\\sin y",
      steps: [
        { explanation: "Identify the cosine difference pattern.", latex: "\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B" },
        { explanation: "Match A = x and B = y." },
      ],
      finalAnswerLatex: "\\cos(x-y)",
    },
    {
      title: "Mixed exact value",
      questionLatex: "\\sin15^\\circ",
      steps: [
        { explanation: "Write 15 degrees as 45 degrees minus 30 degrees.", latex: "15^\\circ=45^\\circ-30^\\circ" },
        { explanation: "Use the sine difference formula and simplify.", latex: "\\frac{\\sqrt6-\\sqrt2}{4}" },
      ],
      finalAnswerLatex: "\\frac{\\sqrt6-\\sqrt2}{4}",
    },
    {
      title: "Mixed double-angle simplification",
      questionLatex: "2\\sin(4x)\\cos(4x)",
      steps: [
        { explanation: "Use the sine double-angle identity with A = 4x.", latex: "2\\sin A\\cos A=\\sin2A" },
      ],
      finalAnswerLatex: "\\sin8x",
    },
  ],
  [
    trigChoice("ftrig-exam-g1", "Choose the matching identity.", "\\sin x\\cos y-\\cos x\\sin y", "B", ["$\\sin(x+y)$", "$\\sin(x-y)$", "$\\cos(x+y)$", "$\\cos(x-y)$"], "This is the sine difference identity."),
    trigChoice("ftrig-exam-g2", "Choose the exact value.", "\\cos15^\\circ", "A", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac12$", "$\\frac{\\sqrt3}{2}$"], "Cosine 15 degrees is $\\frac{\\sqrt6+\\sqrt2}{4}$."),
    trigChoice("ftrig-exam-g3", "Simplify the expression.", "2\\sin x\\cos x", "C", ["$\\cos2x$", "$\\tan2x$", "$\\sin2x$", "$1$"], "This is the sine double-angle identity."),
    trigChoice("ftrig-exam-g4", "Which identity is most useful?", "1-2\\sin^2x", "D", ["sine sum", "cosine sum", "tangent sum", "cosine double-angle"], "This expression is $\\cos2x$."),
  ],
  [
    trigChoice("ftrig-exam-i1", "Choose the correct formula.", "\\cos(A-B)", "A", ["$\\cos A\\cos B+\\sin A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$", "$\\sin A\\cos B-\\cos A\\sin B$", "$\\tan A-\\tan B$"], "Cosine of a difference uses a plus sign."),
    trigChoice("ftrig-exam-i2", "Choose the exact value.", "\\tan15^\\circ", "B", ["$2+\\sqrt3$", "$2-\\sqrt3$", "$\\sqrt3$", "$1$"], "Tangent 15 degrees is $2-\\sqrt3$."),
    trigChoice("ftrig-exam-i3", "Simplify the expression.", "\\cos^2x-\\sin^2x", "C", ["$\\sin2x$", "$1$", "$\\cos2x$", "$\\tan2x$"], "This is a cosine double-angle identity."),
    trigChoice("ftrig-exam-i4", "Choose the equivalent equation.", "2\\sin x\\cos x=0", "A", ["$\\sin2x=0$", "$\\cos2x=0$", "$\\tan2x=0$", "$\\sin x=1$"], "Use $2\\sin x\\cos x=\\sin2x$."),
    trigChoice("ftrig-exam-i5", "Which error is shown?", "\\cos(A+B)=\\cos A\\cos B+\\sin A\\sin B", "D", ["Sine and cosine were swapped", "The formula should be tangent", "The expression cannot be expanded", "The sign should be minus for a cosine sum"], "Cosine of a sum uses a minus sign."),
  ],
  [
    { mistake: "Choosing identities by appearance only.", fix: "Check whether the expression involves a sum, difference, double angle, product or squared terms." },
    { mistake: "Dropping signs when moving between quadrants.", fix: "Use quadrant information for exact values." },
    { mistake: "Solving identity-based equations before simplifying.", fix: "Simplify with identities first, then solve." },
    { mistake: "Using decimal approximations for exact values.", fix: "Keep exact values as surds or choose the exact option." },
  ],
  [
    trigChoice("ftrig-exam-m1", "Choose the correct identity.", "\\sin(A-B)", "A", ["$\\sin A\\cos B-\\cos A\\sin B$", "$\\sin A\\cos B+\\cos A\\sin B$", "$\\cos A\\cos B+\\sin A\\sin B$", "$\\cos A\\cos B-\\sin A\\sin B$"], "The sine difference formula uses a minus sign."),
    trigChoice("ftrig-exam-m2", "Choose the exact value.", "\\sin15^\\circ", "B", ["$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6-\\sqrt2}{4}$", "$\\frac{\\sqrt3}{2}$"], "Sine 15 degrees is $\\frac{\\sqrt6-\\sqrt2}{4}$."),
    trigChoice("ftrig-exam-m3", "Simplify the expression.", "2\\sin(5x)\\cos(5x)", "D", ["$\\sin5x$", "$\\cos10x$", "$\\tan10x$", "$\\sin10x$"], "Use $2\\sin A\\cos A=\\sin2A$ with A = 5x."),
    trigChoice("ftrig-exam-m4", "Choose the exact value.", "\\cos105^\\circ", "A", ["$\\frac{\\sqrt2-\\sqrt6}{4}$", "$\\frac{\\sqrt6+\\sqrt2}{4}$", "$\\frac{\\sqrt6-\\sqrt2}{4}$", "$-\\frac{\\sqrt6+\\sqrt2}{4}$"], "Cosine 105 degrees is negative."),
    trigChoice("ftrig-exam-m5", "Choose the best first step.", "\\frac{2\\tan x}{1-\\tan^2x}=1", "C", ["Use the sine sum formula", "Convert x to degrees", "Recognise the left side as $\\tan2x$", "Differentiate both sides"], "The left side is the tangent double-angle form."),
    trigChoice("ftrig-exam-m6", "Choose the matching simplification.", "\\cos x\\cos y+\\sin x\\sin y", "B", ["$\\cos(x+y)$", "$\\cos(x-y)$", "$\\sin(x+y)$", "$\\sin(x-y)$"], "This is the cosine difference formula."),
    trigChoice("ftrig-exam-m7", "Which identity is most efficient?", "\\cos^2x-\\sin^2x=\\frac12", "A", ["$\\cos2x$", "$\\sin2x$", "$\\tan2x$", "$\\sin(x+y)$"], "The left side is $\\cos2x$."),
    trigChoice("ftrig-exam-m8", "Which statement identifies the error?", "\\tan2A=\\frac{2\\tan A}{1+\\tan^2A}", "C", ["The numerator should be $\\tan^2A$", "There should be no denominator", "The denominator sign should be minus", "The formula should be $\\sin2A$"], "The correct denominator is $1-\\tan^2A$."),
    trigChoice("ftrig-exam-m9", "Choose the solution set.", "2\\sin x\\cos x=0,\\quad 0\\le x\\le2\\pi", "D", ["$0,\\pi$ only", "$\\frac{\\pi}{2},\\frac{3\\pi}{2}$ only", "$\\frac{\\pi}{4},\\frac{5\\pi}{4}$", "$0,\\frac{\\pi}{2},\\pi,\\frac{3\\pi}{2},2\\pi$"], "The equation is $\\sin2x=0$, giving these values in the domain."),
    trigChoice("ftrig-exam-m10", "Which chain of reasoning is strongest?", "\\sin105^\\circ", "A", ["Use $60^\\circ+45^\\circ$ with the sine sum formula and quadrant II sign", "Use $90^\\circ+15^\\circ$ and write sine as a sum", "Use $105^\\circ=45^\\circ-60^\\circ$ with no sign check", "Use the tangent double-angle formula"], "This uses known angles, the correct formula and the correct quadrant sign."),
  ]
);

furtherTrigEquationsIdentitiesLesson.moduleSlug = "ma-t3-trigonometric-equations";
furtherTrigEquationsIdentitiesLesson.moduleTitle = "Trigonometric Equations";
furtherTrigonometryExamPracticeLesson.moduleSlug = "ma-t3-trigonometric-equations";
furtherTrigonometryExamPracticeLesson.moduleTitle = "Trigonometric Equations";

export const furtherTrigonometryLessons = [
  compoundAngleFormulasLesson,
  exactValuesCompoundAnglesLesson,
  doubleAngleFormulasLesson,
  furtherTrigEquationsIdentitiesLesson,
  furtherTrigonometryExamPracticeLesson,
];

export const furtherTrigonometryOutline: LessonOutlineItem[] =
  furtherTrigonometryLessons.map((lesson) => ({
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    status: lesson.status,
  }));
