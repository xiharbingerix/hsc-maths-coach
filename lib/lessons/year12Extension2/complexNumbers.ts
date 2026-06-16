import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { ArgandDiagram } from "../types";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function cxChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  hint = "Recall the key definition before choosing."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Choose the best option.}",
    choices: choices.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer,
    hint,
    explanation,
  };
}

function cxTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  explanation: string,
  hint = "Set up the expression, then simplify using i² = −1 where needed."
): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers, hint, explanation };
}

const conjugateArgandDiagram: ArgandDiagram = {
  description:
    "Argand diagram showing z = 2 - 3i and its conjugate 2 + 3i reflected across the real axis.",
  realMin: -1,
  realMax: 4,
  imaginaryMin: -4,
  imaginaryMax: 4,
  points: [
    { re: 2, im: -3, label: "z = 2 - 3i" },
  ],
  vectorsFromOrigin: [
    { to: { re: 2, im: -3 }, label: "z" },
  ],
  showConjugates: true,
};

const unitCircleArgandDiagram: ArgandDiagram = {
  description:
    "Argand diagram showing the locus |z| = 2 as a circle of radius 2 centred at the origin.",
  realMin: -3,
  realMax: 3,
  imaginaryMin: -3,
  imaginaryMax: 3,
  modulusCircles: [{ radius: 2, label: "|z| = 2" }],
  points: [
    { re: 2, im: 0, label: "2" },
    { re: 0, im: 2, label: "2i" },
  ],
};

// ─── Lesson 1: Complex Number Arithmetic ─────────────────────────────────────

const complexArithmetic: Partial<ExplicitLesson> = {
  description:
    "Add, subtract and multiply complex numbers in the form a + bi, and simplify expressions involving powers of i.",
  learningIntention:
    "Perform arithmetic operations on complex numbers and simplify powers of i using i² = −1.",
  successCriteria: [
    "Identify the real part and imaginary part of a complex number.",
    "Add and subtract complex numbers by combining like parts.",
    "Multiply complex numbers by expanding brackets and replacing i² with −1.",
    "Simplify i³, i⁴ and higher powers by reducing modulo 4.",
  ],
  teaching: {
    paragraphs: [
      "A complex number has the form z = a + bi, where a is the real part and b is the imaginary part. The symbol i satisfies i² = −1.",
      "To add or subtract: (a + bi) ± (c + di) = (a ± c) + (b ± d)i. Combine the real parts and imaginary parts separately.",
      "To multiply: expand the brackets exactly as with algebraic expressions, then replace every i² with −1. For example, (1 + 2i)(3 − i) = 3 − i + 6i − 2i² = 3 + 5i + 2 = 5 + 5i.",
      "Powers of i cycle with period 4: i¹ = i, i² = −1, i³ = −i, i⁴ = 1. To simplify iⁿ, find the remainder when n is divided by 4.",
    ],
    latexBlocks: [
      "z = a + bi \\quad (a, b \\in \\mathbb{R},\\; i^2 = -1)",
      "(a+bi)+(c+di) = (a+c)+(b+d)i",
      "(a+bi)(c+di) = (ac-bd)+(ad+bc)i",
      "i^1=i,\\quad i^2=-1,\\quad i^3=-i,\\quad i^4=1",
    ],
  },
  workedExamples: [
    {
      title: "Multiplying complex numbers",
      questionLatex: "\\text{Expand and simplify }(2+3i)(1-2i).",
      steps: [
        {
          explanation: "Expand the brackets.",
          latex: "(2+3i)(1-2i)=2-4i+3i-6i^2",
        },
        {
          explanation: "Replace i² = −1.",
          latex: "=2-i-6(-1)=2-i+6=8-i",
        },
      ],
      finalAnswerLatex: "8-i",
    },
    {
      title: "Simplifying a power of i",
      questionLatex: "\\text{Simplify }i^{11}.",
      steps: [
        { explanation: "Divide 11 by 4: remainder 3.", latex: "11 = 4 \\times 2 + 3" },
        { explanation: "So i¹¹ = i³ = −i.", latex: "i^{11}=i^3=-i" },
      ],
      finalAnswerLatex: "-i",
    },
  ],
  guidedPractice: [
    cxChoice(
      "cx1-g1",
      "What is the real part of the complex number 3 − 5i?",
      "A",
      ["3", "−5", "5", "−3"],
      "3 − 5i has real part 3 and imaginary part −5.",
      "The real part is the coefficient of the term without i."
    ),
    cxTyped(
      "cx1-g2",
      "Find (2 + 3i) + (4 − i).",
      "(2+3i)+(4-i)",
      "6+2i",
      ["6 + 2i"],
      "Add real parts: 2+4=6. Add imaginary parts: 3+(−1)=2. Answer: 6+2i.",
      "Add the real parts together, then add the imaginary parts together."
    ),
    cxChoice(
      "cx1-g3",
      "Which of the following equals i²?",
      "A",
      ["−1", "1", "i", "−i"],
      "By definition, i² = −1.",
      "Recall the fundamental property of the imaginary unit."
    ),
    cxTyped(
      "cx1-g4",
      "Find (1 + 2i) − (3 − i).",
      "(1+2i)-(3-i)",
      "-2+3i",
      ["−2+3i", "-2 + 3i"],
      "Subtract real: 1−3=−2. Subtract imaginary: 2−(−1)=3. Answer: −2+3i.",
      "Subtract the real parts, then subtract the imaginary parts (watch the sign of −i)."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx1-i1",
      "Find (3 + i) + (2 − 4i).",
      "(3+i)+(2-4i)",
      "5-3i",
      ["5 − 3i", "5 - 3i"],
      "Real: 3+2=5. Imaginary: 1+(−4)=−3. Answer: 5−3i."
    ),
    cxTyped(
      "cx1-i2",
      "Find (4 − 2i) − (1 + 3i).",
      "(4-2i)-(1+3i)",
      "3-5i",
      ["3 − 5i", "3 - 5i"],
      "Real: 4−1=3. Imaginary: −2−3=−5. Answer: 3−5i."
    ),
    cxTyped(
      "cx1-i3",
      "Simplify i³.",
      "i^3",
      "-i",
      ["−i"],
      "i³ = i² × i = (−1) × i = −i.",
      "Use the cycle: i, −1, −i, 1. The third power gives −i."
    ),
    cxTyped(
      "cx1-i4",
      "Expand and simplify (1 + i)².",
      "(1+i)^2",
      "2i",
      [],
      "(1+i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i.",
      "Expand like a binomial, then replace i² = −1."
    ),
    cxTyped(
      "cx1-i5",
      "Expand and simplify (2 + i)(3 − i).",
      "(2+i)(3-i)",
      "7+i",
      ["7 + i"],
      "(2+i)(3−i) = 6 − 2i + 3i − i² = 6 + i + 1 = 7 + i.",
      "Expand the brackets fully, replace i² = −1, then combine."
    ),
  ],
  masteryQuiz: [
    cxChoice(
      "cx1-m1",
      "What is the imaginary part of 5 − 3i?",
      "B",
      ["3", "−3", "5", "−5"],
      "The imaginary part is the coefficient of i, which is −3.",
      "The imaginary part is the number multiplying i."
    ),
    cxTyped(
      "cx1-m2",
      "Expand and simplify (2 + 3i)(2 − 3i).",
      "(2+3i)(2-3i)",
      "13",
      [],
      "(2+3i)(2−3i) = 4 − 6i + 6i − 9i² = 4 + 9 = 13.",
      "This is a product of a complex number and its conjugate: a² + b² = 4+9."
    ),
    cxChoice(
      "cx1-m3",
      "Which of the following equals i⁴?",
      "A",
      ["1", "−1", "i", "−i"],
      "i⁴ = (i²)² = (−1)² = 1.",
      "Use the power cycle: i⁴ = 1 always."
    ),
    cxTyped(
      "cx1-m4",
      "Find the real part of (1 + i)².",
      "\\text{Re}((1+i)^2)",
      "0",
      [],
      "(1+i)² = 2i, which has real part 0.",
      "Expand first: (1+i)² = 1 + 2i + i² = 2i. The real part is 0."
    ),
    cxTyped(
      "cx1-m5",
      "Expand and simplify (1 + 2i)(3 + 4i).",
      "(1+2i)(3+4i)",
      "-5+10i",
      ["−5+10i", "-5 + 10i"],
      "(1+2i)(3+4i) = 3 + 4i + 6i + 8i² = 3 + 10i − 8 = −5 + 10i.",
      "Expand fully, then replace i² = −1."
    ),
    cxTyped(
      "cx1-m6",
      "Simplify i⁶.",
      "i^6",
      "-1",
      ["−1"],
      "6 ÷ 4 = 1 remainder 2, so i⁶ = i² = −1.",
      "Divide the exponent by 4 and use the remainder: remainder 2 gives −1."
    ),
    cxChoice(
      "cx1-m7",
      "Which of the following is the conjugate of 2 − 3i?",
      "A",
      ["2 + 3i", "−2 + 3i", "−2 − 3i", "3 − 2i"],
      "The conjugate of a + bi is a − bi. Conjugate of 2−3i is 2+3i.",
      "The conjugate keeps the real part but flips the sign of the imaginary part."
    ),
    cxTyped(
      "cx1-m8",
      "Expand and simplify (3 + 2i)².",
      "(3+2i)^2",
      "5+12i",
      ["5 + 12i"],
      "(3+2i)² = 9 + 12i + 4i² = 9 + 12i − 4 = 5 + 12i.",
      "Expand the square, then replace i² = −1."
    ),
    cxTyped(
      "cx1-m9",
      "Find the imaginary part of (1 + i)³.",
      "\\text{Im}((1+i)^3)",
      "2",
      [],
      "(1+i)² = 2i, so (1+i)³ = 2i(1+i) = 2i + 2i² = 2i − 2 = −2 + 2i. Imaginary part = 2.",
      "First find (1+i)², then multiply by (1+i) again."
    ),
    cxTyped(
      "cx1-m10",
      "Evaluate (2 + i)² + (2 − i)².",
      "(2+i)^2+(2-i)^2",
      "6",
      [],
      "(2+i)² = 3+4i and (2−i)² = 3−4i. Sum = 6.",
      "Expand each square separately, then add. The imaginary parts cancel."
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "cx1-mp-1",
      prompt: "Let z = 2 + 3i and w = 1 − 2i.",
      latex: "z = 2+3i,\\quad w = 1-2i",
      answer: "3+i",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find z + w.",
          marks: 1,
          answer: "3+i",
          acceptedAnswers: ["3 + i"],
          hint: "Add the real parts and imaginary parts separately.",
          explanation: "z + w = (2+1) + (3+(−2))i = 3 + i.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find zw.",
          marks: 2,
          answer: "8-i",
          acceptedAnswers: ["8 − i", "8 - i"],
          hint: "Expand brackets: (2+3i)(1−2i). Replace i² = −1.",
          explanation: "zw = (2+3i)(1−2i) = 2 − 4i + 3i − 6i² = 2 − i + 6 = 8 − i.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the imaginary part of z².",
          marks: 1,
          answer: "12",
          hint: "Expand (2+3i)², then replace i² = −1 and read off the imaginary part.",
          explanation: "z² = (2+3i)² = 4 + 12i + 9i² = 4 + 12i − 9 = −5 + 12i. Imaginary part = 12.",
        },
      ],
    },
  ],
};

// ─── Lesson 2: Modulus, Argument and Conjugate ───────────────────────────────

const modulusArgumentConjugate: Partial<ExplicitLesson> = {
  description:
    "Find the modulus and argument of a complex number, form its conjugate, and use the product z z̄ = |z|².",
  learningIntention:
    "Calculate the modulus and argument of a complex number and apply conjugate properties.",
  successCriteria: [
    "Find the modulus |z| = √(a² + b²) of a complex number z = a + bi.",
    "Form the conjugate z̄ = a − bi.",
    "Apply the identity z z̄ = |z|².",
    "Find the argument of z for standard angles (multiples of 30° or 45°) in the range (−180°, 180°].",
  ],
  teaching: {
    paragraphs: [
      "The modulus of z = a + bi is |z| = √(a² + b²). This is the distance from the origin to z on the Argand diagram.",
      "The conjugate of z = a + bi is z̄ = a − bi. It reflects z across the real axis.",
      "The product z z̄ = (a + bi)(a − bi) = a² + b² = |z|². This is always a real non-negative number.",
      "The argument arg(z) is the angle from the positive real axis to the ray through z, measured anti-clockwise. The principal argument lies in (−180°, 180°]. For the standard angles, use exact triangle ratios.",
    ],
    latexBlocks: [
      "|z| = \\sqrt{a^2+b^2}",
      "\\bar{z} = a - bi",
      "z\\bar{z} = |z|^2 = a^2+b^2",
      "\\arg(z) \\in (-180^\\circ, 180^\\circ]",
    ],
  },
  workedExamples: [
    {
      title: "Modulus and conjugate product",
      questionLatex: "\\text{Find }|z|\\text{ and }z\\bar{z}\\text{ for }z=3+4i.",
      steps: [
        { explanation: "Compute the modulus.", latex: "|z|=\\sqrt{9+16}=\\sqrt{25}=5" },
        { explanation: "Form the conjugate: z̄ = 3 − 4i. Multiply.", latex: "z\\bar{z}=(3+4i)(3-4i)=9+16=25=|z|^2" },
      ],
      finalAnswerLatex: "|z|=5,\\quad z\\bar{z}=25",
    },
    {
      title: "Finding the argument",
      questionLatex: "\\text{Find }\\arg(1+i)\\text{ in degrees.}",
      steps: [
        { explanation: "The point (1,1) is in the first quadrant at 45° from the positive real axis.", latex: "\\tan\\theta=\\frac{1}{1}=1\\;\\Rightarrow\\;\\theta=45^\\circ" },
        { explanation: "This is the principal argument.", latex: "\\arg(1+i)=45^\\circ" },
      ],
      finalAnswerLatex: "45^\\circ",
    },
    {
      title: "Divide complex numbers using the conjugate",
      questionLatex: "\\frac{3+2i}{1-i}",
      steps: [
        { explanation: "Multiply numerator and denominator by the conjugate of the denominator.", latex: "\\frac{(3+2i)(1+i)}{(1-i)(1+i)}" },
        { explanation: "Expand the numerator: (3+2i)(1+i) = 3+3i+2i+2i² = 3+5i−2.", latex: "\\frac{1+5i}{(1)^2+(1)^2}" },
        { explanation: "The denominator is |1−i|² = 1²+1² = 2.", latex: "\\frac{1+5i}{2}" },
        { explanation: "Write in a+bi form.", latex: "\\frac{1}{2}+\\frac{5}{2}i" },
      ],
      finalAnswerLatex: "\\frac{1}{2}+\\frac{5}{2}i",
    },
  ],
  guidedPractice: [
    cxChoice(
      "cx2-g1",
      "What is |3 + 4i|?",
      "A",
      ["5", "7", "25", "√7"],
      "|3+4i| = √(9+16) = √25 = 5.",
      "Use |z| = √(a² + b²) with a = 3, b = 4."
    ),
    cxTyped(
      "cx2-g2",
      "Find |5 + 12i|.",
      "|5+12i|",
      "13",
      [],
      "|5+12i| = √(25+144) = √169 = 13.",
      "Apply |z| = √(a² + b²) with a = 5, b = 12."
    ),
    {
      ...cxChoice(
        "cx2-g3",
        "Which of the following is the conjugate of 2 − 3i?",
        "A",
        ["2 + 3i", "−2 − 3i", "−2 + 3i", "3 − 2i"],
        "The conjugate of a − bi is a + bi. Conjugate of 2 − 3i is 2 + 3i.",
        "The conjugate keeps the real part and flips the sign of the imaginary part."
      ),
      argandDiagram: conjugateArgandDiagram,
    },
    cxTyped(
      "cx2-g4",
      "Find (3 + 4i)(3 − 4i).",
      "(3+4i)(3-4i)",
      "25",
      [],
      "(3+4i)(3−4i) = 9 + 16 = 25 = |3+4i|².",
      "This is z z̄, which always equals a² + b²."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx2-i1",
      "Find |4 − 3i|.",
      "|4-3i|",
      "5",
      [],
      "|4−3i| = √(16+9) = √25 = 5."
    ),
    cxTyped(
      "cx2-i2",
      "Write the conjugate of −1 + 2i.",
      "\\overline{-1+2i}",
      "-1-2i",
      ["−1−2i", "−1 − 2i", "-1 - 2i"],
      "Conjugate of −1 + 2i is −1 − 2i (flip the imaginary sign)."
    ),
    cxTyped(
      "cx2-i3",
      "Find arg(i) in degrees.",
      "\\arg(i)",
      "90",
      ["90°", "90 degrees"],
      "i = 0 + 1·i sits on the positive imaginary axis, which is at 90°.",
      "Locate i on the Argand diagram: it is directly above the origin."
    ),
    cxTyped(
      "cx2-i4",
      "Find arg(1 − i) in degrees. Give the principal argument in (−180°, 180°].",
      "\\arg(1-i)",
      "-45",
      ["−45", "−45°", "-45°"],
      "1 − i is in the fourth quadrant. tan θ = −1/1, principal argument = −45°.",
      "1 − i has positive real part and negative imaginary part: angle is negative."
    ),
    cxTyped(
      "cx2-i5",
      "Find (1 + 2i)(1 − 2i).",
      "(1+2i)(1-2i)",
      "5",
      [],
      "(1+2i)(1−2i) = 1 + 4 = 5. (Using z z̄ = a² + b² = 1 + 4.)"
    ),
  ],
  masteryQuiz: [
    cxChoice(
      "cx2-m1",
      "What is |i|?",
      "B",
      ["0", "1", "−1", "i"],
      "|i| = √(0² + 1²) = 1.",
      "Apply the modulus formula: |a + bi| = √(a² + b²) with a = 0, b = 1."
    ),
    cxTyped(
      "cx2-m2",
      "Find |3 + 4i|².",
      "|3+4i|^2",
      "25",
      [],
      "|3+4i|² = 3² + 4² = 9 + 16 = 25.",
      "|z|² = a² + b². No need to square-root first."
    ),
    cxChoice(
      "cx2-m3",
      "What is arg(−1) in degrees?",
      "C",
      ["0°", "90°", "180°", "−180°"],
      "−1 lies on the negative real axis at exactly 180°. (The principal argument range is (−180°, 180°], so 180° is included.)",
      "Locate −1 on the real axis: it is directly to the left of the origin."
    ),
    cxTyped(
      "cx2-m4",
      "Write the conjugate of i.",
      "\\bar{i}",
      "-i",
      ["−i"],
      "i = 0 + 1·i, so its conjugate is 0 − 1·i = −i.",
      "Flip the sign of the imaginary part."
    ),
    cxTyped(
      "cx2-m5",
      "Find (2 + 3i)(2 − 3i).",
      "(2+3i)(2-3i)",
      "13",
      [],
      "(2+3i)(2−3i) = 4 + 9 = 13."
    ),
    cxTyped(
      "cx2-m6",
      "Find arg(1 + i) in degrees.",
      "\\arg(1+i)",
      "45",
      ["45°"],
      "1 + i is in the first quadrant. tan θ = 1/1, so arg = 45°."
    ),
    cxChoice(
      "cx2-m7",
      "If z = a + bi, which expression equals z + z̄?",
      "A",
      ["2a", "2b", "2bi", "0"],
      "z + z̄ = (a+bi) + (a−bi) = 2a.",
      "Add z and its conjugate: the imaginary parts cancel."
    ),
    cxTyped(
      "cx2-m8",
      "Find arg(−i) in degrees. Give the principal argument.",
      "\\arg(-i)",
      "-90",
      ["−90", "−90°", "-90°"],
      "−i is on the negative imaginary axis. The principal argument is −90°.",
      "−i points straight down on the Argand diagram."
    ),
    cxTyped(
      "cx2-m9",
      "If |z| = 5 and z = 3 + yi with y > 0, find y.",
      "|z|=5,\\;z=3+yi",
      "4",
      [],
      "3² + y² = 25, so y² = 16, y = 4 (taking positive root).",
      "Use |z|² = a² + b²: substitute a = 3 and |z| = 5."
    ),
    cxTyped(
      "cx2-m10",
      "Simplify (1 + i)(1 − i)².",
      "(1+i)(1-i)^2",
      "2-2i",
      ["2 − 2i", "2 - 2i"],
      "(1−i)² = 1 − 2i + i² = −2i. Then (1+i)(−2i) = −2i − 2i² = −2i + 2 = 2 − 2i.",
      "Expand (1−i)² first, then multiply by (1+i)."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 3: Argand Diagram and Geometry ────────────────────────────────────

const argandDiagramGeometry: Partial<ExplicitLesson> = {
  description:
    "Plot complex numbers on the Argand diagram, find distances between points, and interpret basic loci geometrically.",
  learningIntention:
    "Use the Argand diagram to represent complex numbers, find distances using |z₁ − z₂|, and identify simple loci.",
  successCriteria: [
    "Represent a complex number z = a + bi as the point (a, b) on the Argand diagram.",
    "Find the distance between two complex numbers as |z₁ − z₂|.",
    "Find the midpoint of two complex numbers on the Argand diagram.",
    "Identify that |z − c| = r represents a circle with centre c and radius r.",
  ],
  teaching: {
    paragraphs: [
      "The Argand diagram is a coordinate plane where the real part of z gives the x-coordinate and the imaginary part gives the y-coordinate. The point representing z = a + bi is plotted at (a, b).",
      "The distance from the origin to z is |z|. The distance between z₁ and z₂ is |z₁ − z₂|, computed exactly like the distance formula in coordinate geometry.",
      "The midpoint of z₁ and z₂ is (z₁ + z₂)/2, which gives the complex number at the average of the two points.",
      "The locus |z − c| = r is the set of all points at distance r from c. This is a circle centred at c with radius r.",
    ],
    latexBlocks: [
      "z = a+bi \\leftrightarrow (a,\\,b)\\text{ on Argand diagram}",
      "|z_1-z_2|=\\sqrt{(a_1-a_2)^2+(b_1-b_2)^2}",
      "\\text{Midpoint} = \\frac{z_1+z_2}{2}",
      "|z-c|=r\\;\\Leftrightarrow\\;\\text{circle, centre }c\\text{, radius }r",
    ],
  },
  workedExamples: [
    {
      title: "Distance between two complex numbers",
      questionLatex: "\\text{Find }|z_1-z_2|\\text{ where }z_1=5+3i,\\;z_2=2-i.",
      steps: [
        { explanation: "Subtract the complex numbers.", latex: "z_1-z_2=(5-2)+(3-(-1))i=3+4i" },
        { explanation: "Find the modulus.", latex: "|3+4i|=\\sqrt{9+16}=5" },
      ],
      finalAnswerLatex: "|z_1-z_2|=5",
    },
    {
      title: "Midpoint on the Argand diagram",
      questionLatex: "\\text{Find the midpoint of }2+4i\\text{ and }6-2i.",
      steps: [
        { explanation: "Add the complex numbers and halve.", latex: "\\frac{(2+4i)+(6-2i)}{2}=\\frac{8+2i}{2}=4+i" },
      ],
      finalAnswerLatex: "4+i",
    },
  ],
  guidedPractice: [
    cxChoice(
      "cx3-g1",
      "On the Argand diagram, the point representing 3 − 2i is located at coordinates…",
      "A",
      ["(3, −2)", "(−2, 3)", "(3, 2)", "(−3, 2)"],
      "z = 3 − 2i has real part 3 (x-coordinate) and imaginary part −2 (y-coordinate): the point is (3, −2).",
      "The real part gives the x-coordinate; the imaginary part gives the y-coordinate."
    ),
    cxTyped(
      "cx3-g2",
      "What complex number does the point (0, 4) on the Argand diagram represent?",
      "(0,\\,4)",
      "4i",
      [],
      "Real part = 0, imaginary part = 4, so the complex number is 0 + 4i = 4i.",
      "Read off real part (x) and imaginary part (y): z = x + yi."
    ),
    cxChoice(
      "cx3-g3",
      "What is the distance from the origin to the point representing 5 − 12i?",
      "A",
      ["13", "17", "7", "60"],
      "|5 − 12i| = √(25 + 144) = √169 = 13.",
      "Distance from origin = |z| = √(a² + b²)."
    ),
    cxTyped(
      "cx3-g4",
      "Find the complex number at the midpoint of z₁ = 2 + 4i and z₂ = 6 − 2i.",
      "\\frac{(2+4i)+(6-2i)}{2}",
      "4+i",
      ["4 + i"],
      "Midpoint = (z₁+z₂)/2 = (8+2i)/2 = 4+i.",
      "Add the two complex numbers and divide by 2."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx3-i1",
      "What is the real part of the complex number represented by the point (5, −3) on the Argand diagram?",
      "(5,\\,-3)",
      "5",
      [],
      "The real part is the x-coordinate: 5.",
      "In the Argand diagram, the x-coordinate is the real part."
    ),
    cxTyped(
      "cx3-i2",
      "Find |z₁ − z₂| where z₁ = 5 + 3i and z₂ = 2 − i.",
      "|z_1-z_2|",
      "5",
      [],
      "z₁ − z₂ = 3 + 4i. |3+4i| = √(9+16) = 5."
    ),
    cxChoice(
      "cx3-i3",
      "The midpoint of 0 and 4 + 2i on the Argand diagram represents…",
      "A",
      ["2 + i", "2 + 2i", "1 + i", "4 + i"],
      "Midpoint = (0 + 4+2i)/2 = (4+2i)/2 = 2+i.",
      "Average the two complex numbers: (0 + (4+2i))/2."
    ),
    cxTyped(
      "cx3-i4",
      "Find |z₁ − z₂| where z₁ = 1 + i and z₂ = 4 + 5i.",
      "|z_1-z_2|",
      "5",
      [],
      "z₁ − z₂ = −3 − 4i. |−3−4i| = √(9+16) = 5."
    ),
    cxTyped(
      "cx3-i5",
      "The equation |z − 2| = 3 represents a circle. What is its radius?",
      "|z-2|=3",
      "3",
      [],
      "|z − c| = r is a circle with radius r. Here r = 3.",
      "Compare |z − c| = r: the radius is the number on the right-hand side."
    ),
  ],
  masteryQuiz: [
    cxChoice(
      "cx3-m1",
      "Numbers on the imaginary axis of the Argand diagram are of the form…",
      "A",
      ["bi", "a + bi", "a", "0"],
      "Points on the imaginary axis have real part 0, so they are of the form bi (with b real, b ≠ 0).",
      "The imaginary axis is the vertical axis; points on it have zero real part."
    ),
    cxTyped(
      "cx3-m2",
      "Find the distance from 1 + i to 4 + 5i.",
      "|4+5i-(1+i)|",
      "5",
      [],
      "(4+5i) − (1+i) = 3+4i. Distance = |3+4i| = 5."
    ),
    cxChoice(
      "cx3-m3",
      "What does the equation |z − 1| = |z + 1| represent on the Argand diagram?",
      "A",
      ["the imaginary axis", "the real axis", "a circle centred at the origin", "a single point"],
      "|z−1|=|z+1| means equal distance from 1 and −1. The perpendicular bisector of these two points is the imaginary axis.",
      "Equal distance from two points gives the perpendicular bisector of the segment joining them."
    ),
    cxTyped(
      "cx3-m4",
      "Find the complex number at the midpoint of 3 + i and −1 + 5i.",
      "\\frac{(3+i)+(-1+5i)}{2}",
      "1+3i",
      ["1 + 3i"],
      "Midpoint = (3+i+(−1+5i))/2 = (2+6i)/2 = 1+3i."
    ),
    cxTyped(
      "cx3-m5",
      "Find |i − (1 + i)|.",
      "|i-(1+i)|",
      "1",
      [],
      "i − (1+i) = −1. |−1| = 1."
    ),
    cxTyped(
      "cx3-m6",
      "Find the distance between 2 − 3i and 2 + 3i.",
      "|(2+3i)-(2-3i)|",
      "6",
      [],
      "(2+3i) − (2−3i) = 6i. |6i| = 6."
    ),
    {
      ...cxChoice(
        "cx3-m7",
        "|z| = 2 represents which of the following on the Argand diagram?",
        "A",
        ["a circle of radius 2 centred at the origin", "a horizontal line", "a single point", "a circle of radius 4"],
        "|z| = 2 means distance from origin equals 2: a circle of radius 2 centred at the origin.",
        "|z − 0| = 2 is a circle centred at 0 with radius 2."
      ),
      argandDiagram: unitCircleArgandDiagram,
    },
    cxTyped(
      "cx3-m8",
      "If z = x + yi satisfies |z − 3i| = |z + 3i|, find y.",
      "|z-3i|=|z+3i|",
      "0",
      [],
      "Equal distance from 3i and −3i means z lies on the real axis, so Im(z) = y = 0.",
      "This is the perpendicular bisector of the segment from 3i to −3i, which is the real axis."
    ),
    cxTyped(
      "cx3-m9",
      "The circle |z| = r passes through the point 5 + 12i. Find r.",
      "|z|=r,\\;z=5+12i",
      "13",
      [],
      "r = |5+12i| = √(25+144) = 13."
    ),
    cxTyped(
      "cx3-m10",
      "Find |z₂ − z₁| where z₁ = 2 + i and z₂ = 5 + 5i.",
      "|z_2-z_1|",
      "5",
      [],
      "z₂ − z₁ = 3 + 4i. |3+4i| = √(9+16) = 5."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 4: Polar Form and De Moivre's Theorem ────────────────────────────

const polarFormDeMoivre: Partial<ExplicitLesson> = {
  description:
    "Convert complex numbers to polar form r cis θ, multiply and divide using polar form, and apply De Moivre's theorem to compute integer powers.",
  learningIntention:
    "Express complex numbers in polar form and use De Moivre's theorem to find powers efficiently.",
  successCriteria: [
    "Write z = a + bi as r cis θ, where r = |z| and θ = arg(z).",
    "Convert from polar form r cis θ back to Cartesian form a + bi.",
    "Multiply two complex numbers in polar form: r₁ cis θ₁ × r₂ cis θ₂ = r₁r₂ cis(θ₁ + θ₂).",
    "Apply De Moivre's theorem: (r cis θ)ⁿ = rⁿ cis(nθ).",
  ],
  teaching: {
    paragraphs: [
      "Polar form writes a complex number as z = r(cos θ + i sin θ), abbreviated r cis θ, where r = |z| ≥ 0 is the modulus and θ = arg(z) is the argument.",
      "To convert from Cartesian: r = √(a² + b²) and θ = arg(z) using exact triangle ratios for standard angles.",
      "Multiplication in polar form is elegant: r₁ cis θ₁ × r₂ cis θ₂ = r₁r₂ cis(θ₁ + θ₂). Multiply the moduli and add the arguments.",
      "De Moivre's theorem states (r cis θ)ⁿ = rⁿ cis(nθ) for any integer n. Raise the modulus to the power n and multiply the argument by n.",
    ],
    latexBlocks: [
      "z = r\\operatorname{cis}\\theta = r(\\cos\\theta+i\\sin\\theta)",
      "r = |z|,\\quad \\theta = \\arg(z)",
      "r_1\\operatorname{cis}\\theta_1\\times r_2\\operatorname{cis}\\theta_2 = r_1 r_2\\operatorname{cis}(\\theta_1+\\theta_2)",
      "(r\\operatorname{cis}\\theta)^n = r^n\\operatorname{cis}(n\\theta)\\quad (n\\in\\mathbb{Z})",
    ],
  },
  workedExamples: [
    {
      title: "Converting to polar form",
      questionLatex: "\\text{Write }z=\\sqrt{3}+i\\text{ in polar form.}",
      steps: [
        { explanation: "Find the modulus.", latex: "r=|z|=\\sqrt{3+1}=2" },
        { explanation: "Find the argument using exact ratios.", latex: "\\tan\\theta=\\frac{1}{\\sqrt{3}}\\;\\Rightarrow\\;\\theta=30^\\circ" },
        { explanation: "Write in polar form.", latex: "z=2\\operatorname{cis}30^\\circ" },
      ],
      finalAnswerLatex: "z = 2\\operatorname{cis}30^\\circ",
    },
    {
      title: "De Moivre's theorem",
      questionLatex: "\\text{Find }(2\\operatorname{cis}45^\\circ)^3.",
      steps: [
        { explanation: "Apply De Moivre: raise modulus to the power, multiply argument by the power.", latex: "(2\\operatorname{cis}45^\\circ)^3=2^3\\operatorname{cis}(3\\times45^\\circ)=8\\operatorname{cis}135^\\circ" },
      ],
      finalAnswerLatex: "8\\operatorname{cis}135^\\circ",
    },
  ],
  guidedPractice: [
    cxChoice(
      "cx4-g1",
      "What is the modulus of 2 cis(30°)?",
      "A",
      ["2", "30", "2√2", "1"],
      "In r cis θ, r is the modulus. Here r = 2.",
      "The modulus in r cis θ is simply r."
    ),
    cxTyped(
      "cx4-g2",
      "What is the argument (in degrees) of 2 cis(45°)?",
      "2\\operatorname{cis}(45^\\circ)",
      "45",
      ["45°"],
      "In r cis θ, θ is the argument. Here θ = 45°.",
      "Read the angle directly from the cis notation."
    ),
    cxChoice(
      "cx4-g3",
      "Which of the following equals cis(90°)?",
      "A",
      ["i", "−1", "1", "−i"],
      "cis(90°) = cos90° + i sin90° = 0 + i·1 = i.",
      "Evaluate cos90° = 0 and sin90° = 1."
    ),
    cxTyped(
      "cx4-g4",
      "5(cos 30° + i sin 30°) = 5 cis(θ°). Find θ.",
      "5(\\cos30^\\circ+i\\sin30^\\circ)",
      "30",
      [],
      "r cis θ = r(cos θ + i sin θ). Here θ = 30°.",
      "Match the angle in (cos θ + i sin θ) with the cis θ notation."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx4-i1",
      "Write −2 in polar form r cis θ. What is the argument θ in degrees?",
      "-2=r\\operatorname{cis}\\theta",
      "180",
      ["180°"],
      "−2 is on the negative real axis. r = 2, θ = 180°.",
      "Locate −2 on the Argand diagram: it points left at 180°."
    ),
    cxTyped(
      "cx4-i2",
      "What is the modulus of 3 cis(π/4)?",
      "3\\operatorname{cis}(\\pi/4)",
      "3",
      [],
      "The modulus in r cis θ is r = 3."
    ),
    cxChoice(
      "cx4-i3",
      "Which of the following equals cis(30°) × cis(60°)?",
      "A",
      ["cis(90°)", "cis(30°)", "cis(1800°)", "2 cis(90°)"],
      "Add arguments: 30° + 60° = 90°. Moduli: 1 × 1 = 1. Answer: cis(90°).",
      "Multiply moduli and add arguments."
    ),
    cxTyped(
      "cx4-i4",
      "Using De Moivre's theorem, (cis 60°)³ = cis(?)°. Find the angle.",
      "(\\operatorname{cis}60^\\circ)^3",
      "180",
      ["180°"],
      "(cis 60°)³ = cis(3 × 60°) = cis(180°).",
      "Multiply the argument by the exponent: 3 × 60° = 180°."
    ),
    cxTyped(
      "cx4-i5",
      "(2 cis 45°)² = r cis θ. What is r?",
      "(2\\operatorname{cis}45^\\circ)^2",
      "4",
      [],
      "(2 cis 45°)² = 2² cis(90°) = 4 cis(90°). So r = 4.",
      "Raise the modulus to the power: 2² = 4."
    ),
  ],
  masteryQuiz: [
    cxChoice(
      "cx4-m1",
      "r cis θ is equivalent to which of the following?",
      "A",
      ["r(cos θ + i sin θ)", "r cos θ + sin θ", "r + i(cos θ + sin θ)", "r cos θ · r sin θ"],
      "By definition, cis θ = cos θ + i sin θ, so r cis θ = r(cos θ + i sin θ).",
      "cis is an abbreviation for cos + i sin."
    ),
    cxTyped(
      "cx4-m2",
      "Write −4 in polar form r cis θ. What is r?",
      "-4=r\\operatorname{cis}\\theta",
      "4",
      [],
      "r = |−4| = 4."
    ),
    cxTyped(
      "cx4-m3",
      "What is the argument of −4 in degrees?",
      "\\arg(-4)",
      "180",
      ["180°"],
      "−4 is on the negative real axis: arg(−4) = 180°."
    ),
    cxChoice(
      "cx4-m4",
      "By De Moivre's theorem, (cis θ)ⁿ = …",
      "A",
      ["cis(nθ)", "n cis θ", "cis(θⁿ)", "cis(θ/n)"],
      "De Moivre: (r cis θ)ⁿ = rⁿ cis(nθ). With r = 1 this is (cis θ)ⁿ = cis(nθ).",
      "Raise the modulus to n and multiply the argument by n."
    ),
    cxTyped(
      "cx4-m5",
      "(2 cis 60°)³ = r cis θ. Find r.",
      "(2\\operatorname{cis}60^\\circ)^3",
      "8",
      [],
      "r = 2³ = 8."
    ),
    cxTyped(
      "cx4-m6",
      "(2 cis 60°)³ = r cis θ. Find θ in degrees.",
      "(2\\operatorname{cis}60^\\circ)^3",
      "180",
      ["180°"],
      "θ = 3 × 60° = 180°."
    ),
    cxTyped(
      "cx4-m7",
      "cis(180°) = a + bi. Find a.",
      "\\operatorname{cis}(180^\\circ)",
      "-1",
      ["−1"],
      "cis(180°) = cos180° + i sin180° = −1 + 0i. So a = −1."
    ),
    cxChoice(
      "cx4-m8",
      "Which of the following equals (cis 45°)⁸?",
      "A",
      ["1", "−1", "i", "−i"],
      "(cis 45°)⁸ = cis(8 × 45°) = cis(360°) = cis(0°) = 1.",
      "Apply De Moivre, then simplify using the fact that cis(360°) = 1."
    ),
    cxTyped(
      "cx4-m9",
      "Simplify (cis 30°)⁶.",
      "(\\operatorname{cis}30^\\circ)^6",
      "-1",
      ["−1"],
      "(cis 30°)⁶ = cis(180°) = cos180° + i sin180° = −1.",
      "De Moivre: cis(6 × 30°) = cis(180°) = −1."
    ),
    cxTyped(
      "cx4-m10",
      "Let z = √2 cis 45°. Find Re(z⁴).",
      "z=\\sqrt{2}\\operatorname{cis}45^\\circ,\\;\\text{Re}(z^4)=?",
      "-4",
      ["−4"],
      "z⁴ = (√2)⁴ cis(4×45°) = 4 cis(180°) = 4(−1) = −4. Re(z⁴) = −4.",
      "Apply De Moivre: raise |z|=√2 to the power 4 and multiply arg by 4."
    ),
  ],
  masteryPassMark: 0.8,
  multiPartPractice: [
    {
      id: "cx4-mp-1",
      prompt: "Let z = √3 + i.",
      latex: "z = \\sqrt{3}+i",
      answer: "2",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the modulus |z|.",
          marks: 1,
          answer: "2",
          hint: "Use |z| = √(a² + b²) with a = √3, b = 1.",
          explanation: "|z| = √(3 + 1) = √4 = 2.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the argument of z in degrees.",
          marks: 1,
          answer: "30",
          acceptedAnswers: ["30°", "30 degrees"],
          hint: "tan θ = b/a = 1/√3. Recall the exact ratio for 30°.",
          explanation: "tan θ = 1/√3, so arg(z) = 30° (first quadrant).",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find Re(z⁴).",
          marks: 2,
          answer: "-8",
          acceptedAnswers: ["−8"],
          hint: "Write z = 2 cis 30°, then apply De Moivre to find z⁴. Read off the real part.",
          explanation: "z = 2 cis 30°, so z⁴ = 2⁴ cis(120°) = 16(cos120° + i sin120°). cos120° = −1/2, so Re(z⁴) = 16 × (−1/2) = −8.",
        },
      ],
    },
  ],
};

// ─── Lesson 5: Roots of Unity ─────────────────────────────────────────────────

const rootsOfUnity: Partial<ExplicitLesson> = {
  description:
    "Find all nth roots of unity using De Moivre's theorem, plot them on the Argand diagram as equally-spaced points on the unit circle, and prove their sum is zero.",
  learningIntention:
    "Express the nth roots of unity in polar form, describe their Argand diagram arrangement, and use the sum-of-roots property.",
  successCriteria: [
    "Write the nth roots of unity as cis(2πk/n) for k = 0, 1, …, n−1.",
    "State that they lie at equal angular intervals of 2π/n on the unit circle.",
    "Verify that their sum equals zero using the geometric series formula.",
    "Identify the primitive nth root of unity ω = cis(2π/n).",
  ],
  teaching: {
    paragraphs: [
      "The nth roots of unity are the n solutions to z^n = 1. They lie equally spaced on the unit circle |z| = 1 in the Argand plane, starting at z = 1.",
      "The general formula is z_k = cis(2πk/n) for k = 0, 1, 2, …, n−1. The angular gap between consecutive roots is 2π/n radians (or 360°/n).",
      "The primitive nth root is ω = cis(2π/n). All other roots are powers: ω², ω³, …, ω^{n−1}, ω^n = 1.",
      "The sum of all nth roots of unity is zero. Algebraically this follows from the geometric series 1 + ω + ω² + … + ω^{n−1} = (ω^n − 1)/(ω − 1) = 0 for ω ≠ 1.",
    ],
    latexBlocks: [
      "z^n=1\\implies z_k=\\operatorname{cis}\\!\\left(\\frac{2\\pi k}{n}\\right),\\quad k=0,1,\\ldots,n-1",
      "\\omega=\\operatorname{cis}\\!\\left(\\frac{2\\pi}{n}\\right)\\;(\\text{primitive }n\\text{th root})",
      "1+\\omega+\\omega^2+\\cdots+\\omega^{n-1}=0",
    ],
  },
  workedExamples: [
    {
      title: "Find the cube roots of unity",
      questionLatex: "\\text{Find all solutions to }z^3=1.",
      steps: [
        {
          explanation: "Apply the formula with n = 3.",
          latex:
            "z_k=\\operatorname{cis}\\!\\left(\\frac{2\\pi k}{3}\\right),\\;k=0,1,2",
        },
        {
          explanation: "List the three roots.",
          latex:
            "z_0=1,\\quad z_1=\\operatorname{cis}\\frac{2\\pi}{3},\\quad z_2=\\operatorname{cis}\\frac{4\\pi}{3}",
        },
        {
          explanation: "They lie on the unit circle at 0°, 120° and 240°.",
          latex:
            "\\text{Angular spacing }=\\frac{360^\\circ}{3}=120^\\circ",
        },
      ],
      finalAnswerLatex:
        "z=1,\\;\\operatorname{cis}120^\\circ,\\;\\operatorname{cis}240^\\circ",
    },
    {
      title: "Verify the sum of cube roots of unity is zero",
      questionLatex:
        "\\text{Show }1+\\omega+\\omega^2=0\\text{ where }\\omega=\\operatorname{cis}\\frac{2\\pi}{3}.",
      steps: [
        {
          explanation: "Use the geometric series formula.",
          latex:
            "1+\\omega+\\omega^2=\\frac{\\omega^3-1}{\\omega-1}=\\frac{1-1}{\\omega-1}=0\\quad(\\omega\\ne1)",
        },
      ],
      finalAnswerLatex: "1+\\omega+\\omega^2=0",
    },
    {
      title: "Find the cube roots of 8i",
      questionLatex: "z^3 = 8i",
      steps: [
        { explanation: "Write 8i in polar form. |8i| = 8, arg(8i) = π/2.", latex: "8i = 8\\operatorname{cis}\\frac{\\pi}{2}" },
        { explanation: "Apply De Moivre: z_k = 8^{1/3} cis((π/2 + 2πk)/3) for k = 0, 1, 2.", latex: "z_k = 2\\operatorname{cis}\\!\\left(\\frac{\\pi/2+2\\pi k}{3}\\right)" },
        { explanation: "k=0: z₀ = 2 cis(π/6)", latex: "z_0 = 2\\operatorname{cis}\\frac{\\pi}{6} = \\sqrt{3}+i" },
        { explanation: "k=1: z₁ = 2 cis(π/6 + 2π/3) = 2 cis(5π/6)", latex: "z_1 = 2\\operatorname{cis}\\frac{5\\pi}{6} = -\\sqrt{3}+i" },
        { explanation: "k=2: z₂ = 2 cis(π/6 + 4π/3) = 2 cis(3π/2)", latex: "z_2 = 2\\operatorname{cis}\\frac{3\\pi}{2} = -2i" },
      ],
      finalAnswerLatex: "z = \\sqrt{3}+i,\\quad -\\sqrt{3}+i,\\quad -2i",
    },
  ],
  guidedPractice: [
    cxTyped(
      "cx5-g1",
      "Write the formula for the $k$-th $n$th root of unity.",
      "z_k=\\operatorname{cis}\\!\\left(?\\right)",
      "2πk/n",
      ["2*pi*k/n", "2\\pi k/n"],
      "z_k = cis(2πk/n). The angle for the k-th root is 2πk/n radians.",
      "The roots are equally spaced at intervals of 2π/n."
    ),
    cxTyped(
      "cx5-g2",
      "How many 4th roots of unity are there?",
      "z^4=1",
      "4",
      [],
      "z^n = 1 always has exactly n solutions in ℂ, so z^4 = 1 has 4 roots.",
      "The degree equals the number of roots."
    ),
    cxTyped(
      "cx5-g3",
      "State the angular spacing (in degrees) between 6th roots of unity.",
      "\\frac{360^\\circ}{n},\\;n=6",
      "60",
      ["60°"],
      "360°/6 = 60°. Six roots are equally spaced at 60° apart.",
      "Divide 360° by n."
    ),
    cxChoice(
      "cx5-g4",
      "The sum $1+\\omega+\\omega^2+\\cdots+\\omega^{n-1}$ equals:",
      "B",
      ["$n$", "$0$", "$\\omega^n$", "$1$"],
      "The sum of all nth roots of unity is zero for n ≥ 2.",
      "Apply the geometric series result."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx5-i1",
      "Find the argument (in degrees) of $z_2$ among the cube roots of unity.",
      "z_2=\\operatorname{cis}\\frac{2\\pi\\cdot2}{3}",
      "240",
      ["240°"],
      "Argument = 2π × 2/3 radians = 4π/3 = 240°.",
      "Use the formula 2πk/n with k=2 and n=3, then convert to degrees."
    ),
    cxTyped(
      "cx5-i2",
      "If $\\omega=\\operatorname{cis}\\frac{2\\pi}{4}=\\operatorname{cis}90^\\circ$, write $\\omega$ in Cartesian form.",
      "\\omega=\\operatorname{cis}90^\\circ=\\cos90^\\circ+i\\sin90^\\circ",
      "i",
      ["0+i", "0 + i"],
      "cos90° = 0, sin90° = 1. So ω = 0 + i = i.",
      "Evaluate cos and sin at 90°."
    ),
    cxTyped(
      "cx5-i3",
      "For the 4th roots of unity, list how many roots lie on the real axis.",
      "z^4=1,\\text{ real axis: }\\operatorname{Im}(z)=0",
      "2",
      [],
      "The 4th roots are 1, i, −1, −i. Two of these (1 and −1) are real.",
      "Check which of the 4 roots have zero imaginary part."
    ),
    cxChoice(
      "cx5-i4",
      "The nth roots of unity all satisfy $|z| =$",
      "A",
      ["$1$", "$n$", "$2\\pi/n$", "$0$"],
      "Every root of unity has modulus 1 since they lie on the unit circle.",
      "Apply |cis θ| = 1."
    ),
    cxTyped(
      "cx5-i5",
      "For the 5th roots of unity $z_0,z_1,\\ldots,z_4$, compute $z_0+z_1+z_2+z_3+z_4$.",
      "\\sum_{k=0}^{4}\\operatorname{cis}\\frac{2\\pi k}{5}",
      "0",
      [],
      "The sum of all nth roots of unity is zero for n ≥ 2.",
      "Apply the standard result for the sum of roots of unity."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Including z = cis(2π) as a separate root.",
      fix: "cis(2π) = cis(0) = 1, so it is the same as z₀. Use k = 0, 1, …, n−1 exactly.",
    },
    {
      mistake: "Confusing the number of roots with the degree.",
      fix: "z^n = 1 has exactly n complex solutions. The degree n gives the count directly.",
    },
    {
      mistake: "Forgetting that roots of unity have modulus 1.",
      fix: "|cis θ| = 1 always. All nth roots of unity lie on the unit circle.",
    },
    {
      mistake: "Thinking the sum being zero is a coincidence.",
      fix: "It follows from the geometric series formula and is always true for n ≥ 2.",
    },
  ],
  masteryQuiz: [
    cxTyped(
      "cx5-m1",
      "Write $z_1$ (i.e. $k=1$) among the cube roots of unity as a cis expression.",
      "z_1=\\operatorname{cis}\\frac{2\\pi\\cdot1}{3}",
      "cis(2π/3)",
      ["cis 2π/3", "cis(120°)"],
      "z₁ = cis(2π/3). This is the primitive cube root of unity ω.",
      "Apply the formula with k=1, n=3."
    ),
    cxChoice(
      "cx5-m2",
      "The 6th roots of unity are equally spaced on the unit circle. The angular spacing is:",
      "B",
      ["$30^\\circ$", "$60^\\circ$", "$90^\\circ$", "$120^\\circ$"],
      "360°/6 = 60°. Each consecutive root is 60° apart.",
      "Divide 360° by n = 6."
    ),
    cxTyped(
      "cx5-m3",
      "How many 8th roots of unity lie on the real axis?",
      "z^8=1",
      "2",
      [],
      "The 8th roots are at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°. Only 0° (z=1) and 180° (z=−1) are real.",
      "Count roots with argument 0° or 180°."
    ),
    cxChoice(
      "cx5-m4",
      "If $\\omega$ is a primitive $n$th root of unity, then $\\omega^n =$",
      "A",
      ["$1$", "$0$", "$\\omega$", "$-1$"],
      "By definition ω satisfies ω^n = 1.",
      "Apply the definition of nth root of unity."
    ),
    cxTyped(
      "cx5-m5",
      "Find the product of all cube roots of unity.",
      "z_0\\cdot z_1\\cdot z_2=1\\cdot\\operatorname{cis}120^\\circ\\cdot\\operatorname{cis}240^\\circ",
      "1",
      [],
      "Moduli: 1×1×1 = 1. Arguments: 0+120°+240° = 360° = 0°. Product = cis(0°) = 1.",
      "Multiply moduli and add arguments."
    ),
    cxTyped(
      "cx5-m6",
      "For the 5th roots of unity, type the argument of $z_3$ in degrees.",
      "z_3=\\operatorname{cis}\\frac{2\\pi\\cdot3}{5}",
      "216",
      ["216°"],
      "2π × 3/5 radians = 216°.",
      "Multiply 360°/5 = 72° by k = 3."
    ),
    cxChoice(
      "cx5-m7",
      "Which statement about the $n$th roots of unity is FALSE?",
      "C",
      [
        "They all have modulus 1",
        "They are equally spaced on the unit circle",
        "Their product is always 0",
        "Their sum is 0 for $n\\ge2$",
      ],
      "Their product is 1 (not 0): moduli product = 1, and argument sum = 2π(0+1+…+(n−1))/n = π(n−1) which is a multiple of 2π only at limits. In fact the product of all nth roots equals (−1)^{n+1} but is never 0."
    ),
    cxTyped(
      "cx5-m8",
      "The primitive 4th root of unity is $\\omega=\\operatorname{cis}90^\\circ$. Write $\\omega^2$ in exact Cartesian form.",
      "\\omega^2=(\\operatorname{cis}90^\\circ)^2=\\operatorname{cis}180^\\circ",
      "-1",
      ["−1"],
      "cis(180°) = cos180° + i sin180° = −1 + 0i = −1.",
      "Apply De Moivre: double the argument."
    ),
    cxChoice(
      "cx5-m9",
      "Which value of $k$ gives the same root as $k=n$ in the formula $\\operatorname{cis}(2\\pi k/n)$?",
      "A",
      ["$k=0$", "$k=n+1$", "$k=n-1$", "$k=2$"],
      "cis(2πn/n) = cis(2π) = cis(0) = 1 = z₀. So k = n gives the same root as k = 0.",
      "cis(2π) = cis(0)."
    ),
    cxTyped(
      "cx5-m10",
      "If $\\omega^3=1$ and $\\omega\\ne1$, simplify $1+\\omega+\\omega^2$.",
      "1+\\omega+\\omega^2",
      "0",
      [],
      "The sum of all cube roots of unity is zero: 1 + ω + ω² = 0.",
      "Apply the sum-of-roots-of-unity result."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson 6: Complex Polynomials ────────────────────────────────────────────

const complexPolynomials: Partial<ExplicitLesson> = {
  description:
    "Apply the conjugate root theorem to real polynomials, find complex roots in conjugate pairs, and factorise real polynomials over ℂ into linear and irreducible quadratic factors.",
  learningIntention:
    "Use the conjugate root theorem to find all complex roots of a real polynomial and factorise completely over ℂ.",
  successCriteria: [
    "State the conjugate root theorem: if a + bi is a root of a real polynomial, so is a − bi.",
    "Find the remaining roots of a real polynomial given one complex root.",
    "Form the quadratic factor (z − (a+bi))(z − (a−bi)) = z² − 2az + (a²+b²).",
    "Factorise a real polynomial completely over ℂ.",
  ],
  teaching: {
    paragraphs: [
      "The Conjugate Root Theorem: if P(z) is a polynomial with real coefficients and a + bi (b ≠ 0) is a root, then its conjugate a − bi is also a root.",
      "Each pair of conjugate roots (a + bi) and (a − bi) multiplies to give a real quadratic factor z² − 2az + (a² + b²), which is irreducible over ℝ.",
      "A degree-n real polynomial with at least one non-real root always has its non-real roots in conjugate pairs, so the number of non-real roots is even.",
      "To factorise completely over ℂ: find all roots (using the conjugate theorem to generate pairs from one known root), then write P(z) = a(z − z₁)(z − z₂)···(z − zₙ).",
    ],
    latexBlocks: [
      "P(z)\\text{ real coefficients: }a+bi\\text{ root}\\implies a-bi\\text{ root}",
      "(z-(a+bi))(z-(a-bi))=z^2-2az+(a^2+b^2)",
      "P(z)=a_n(z-z_1)(z-z_2)\\cdots(z-z_n)\\quad(z_i\\in\\mathbb{C})",
    ],
  },
  workedExamples: [
    {
      title: "Find all roots given one complex root",
      questionLatex:
        "P(z)=z^3-2z^2+4z-8\\text{ has root }2i.\\text{ Find all roots.}",
      steps: [
        {
          explanation: "Since P has real coefficients and 2i is a root, −2i is also a root.",
          latex: "\\text{Roots include }2i\\text{ and }-2i",
        },
        {
          explanation: "The quadratic factor for these two roots is:",
          latex: "(z-2i)(z+2i)=z^2+4",
        },
        {
          explanation: "Divide P(z) by z² + 4 to find the remaining factor.",
          latex: "z^3-2z^2+4z-8 = (z^2+4)(z-2)",
        },
        {
          explanation: "The third root is z = 2.",
          latex: "\\text{All roots: }z=2i,\\;-2i,\\;2",
        },
      ],
      finalAnswerLatex: "z=2i,\\;-2i,\\;2",
    },
    {
      title: "Form and use an irreducible quadratic factor",
      questionLatex:
        "P(z)=z^3+z^2+z+1.\\text{ Given }z=i\\text{ is a root, factorise fully over }\\mathbb{C}.",
      steps: [
        {
          explanation: "Conjugate root: −i is also a root. Form the quadratic.",
          latex: "(z-i)(z+i)=z^2+1",
        },
        {
          explanation: "Divide P(z) by z² + 1.",
          latex: "z^3+z^2+z+1=(z^2+1)(z+1)",
        },
        {
          explanation: "Write in fully factorised form over ℂ.",
          latex: "P(z)=(z-i)(z+i)(z+1)",
        },
      ],
      finalAnswerLatex: "P(z)=(z-i)(z+i)(z+1)",
    },
  ],
  guidedPractice: [
    cxChoice(
      "cx6-g1",
      "If $P(z)$ has real coefficients and $3-2i$ is a root, which other value is also a root?",
      "A",
      ["$3+2i$", "$-3+2i$", "$-3-2i$", "$2-3i$"],
      "The conjugate root theorem gives 3 + 2i as a root whenever 3 − 2i is a root of a real polynomial.",
      "Take the complex conjugate: negate the imaginary part."
    ),
    cxTyped(
      "cx6-g2",
      "Write the quadratic factor for the conjugate pair $z=1+i$ and $z=1-i$.",
      "(z-(1+i))(z-(1-i))",
      "z^2-2z+2",
      ["z² - 2z + 2"],
      "(z−(1+i))(z−(1−i)) = z² − 2z + (1²+1²) = z² − 2z + 2.",
      "Use (z − (a+bi))(z − (a−bi)) = z² − 2az + (a² + b²) with a=1, b=1."
    ),
    cxTyped(
      "cx6-g3",
      "For $(z-(a+bi))(z-(a-bi))$, the constant term is $a^2+\\square$.",
      "(z-(a+bi))(z-(a-bi))=z^2-2az+(a^2+b^2)",
      "b^2",
      ["b²"],
      "Expanding gives z² − 2az + a² + b². The constant term is a² + b².",
      "Expand the brackets, noting i² = −1."
    ),
    cxChoice(
      "cx6-g4",
      "A degree-4 real polynomial with no real roots must have how many complex conjugate pairs?",
      "B",
      ["1 pair", "2 pairs", "4 pairs", "3 pairs"],
      "With degree 4 and no real roots, all 4 roots are non-real and come in 2 conjugate pairs.",
      "Non-real roots of a real polynomial come in conjugate pairs."
    ),
  ],
  independentPractice: [
    cxTyped(
      "cx6-i1",
      "A real polynomial has root $2+3i$. Write its conjugate root.",
      "\\overline{2+3i}",
      "2-3i",
      ["2 - 3i"],
      "The conjugate of 2+3i is 2−3i.",
      "Negate the imaginary part."
    ),
    cxTyped(
      "cx6-i2",
      "Form the real quadratic factor for the root pair $z=2\\pm i$.",
      "(z-(2+i))(z-(2-i))",
      "z^2-4z+5",
      ["z² - 4z + 5"],
      "a = 2, b = 1. Quadratic = z² − 4z + (4+1) = z² − 4z + 5.",
      "Apply z² − 2az + (a² + b²)."
    ),
    cxChoice(
      "cx6-i3",
      "$P(z)=z^4+4$ can be factorised using the roots $1\\pm i$ and $-1\\pm i$. How many linear factors does it have over $\\mathbb{C}$?",
      "B",
      ["2", "4", "1", "3"],
      "A degree-4 polynomial has exactly 4 linear factors over ℂ.",
      "Over ℂ, every real polynomial of degree n splits into exactly n linear factors."
    ),
    cxTyped(
      "cx6-i4",
      "Given $P(z)=z^3-3z^2+4z-2$ has root $1+i$, write the quadratic factor from both complex roots.",
      "(z-(1+i))(z-(1-i))",
      "z^2-2z+2",
      ["z² - 2z + 2"],
      "Conjugate pair 1+i and 1−i: quadratic = z² − 2z + (1+1) = z² − 2z + 2.",
      "Use z² − 2az + (a² + b²) with a=1, b=1."
    ),
    cxTyped(
      "cx6-i5",
      "Divide $P(z)=z^3-3z^2+4z-2$ by $z^2-2z+2$ to find the real linear factor.",
      "\\frac{z^3-3z^2+4z-2}{z^2-2z+2}",
      "z-1",
      ["(z-1)"],
      "Polynomial division: z³−3z²+4z−2 = (z²−2z+2)(z−1). The linear factor is z−1.",
      "Do polynomial long division."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to include the conjugate root.",
      fix: "Every non-real root of a real polynomial has a conjugate partner. Always list both.",
    },
    {
      mistake: "Writing (z − (a+bi))(z − (a−bi)) = z² − (a+bi)².",
      fix: "The correct expansion is z² − 2az + (a² + b²). Verify by expanding carefully.",
    },
    {
      mistake: "Confusing 'factorise over ℂ' with 'factorise over ℝ'.",
      fix: "Over ℂ: all factors are linear. Over ℝ: non-real roots pair into real quadratics.",
    },
    {
      mistake: "Claiming a real polynomial can have an odd number of non-real roots.",
      fix: "Non-real roots of real polynomials always come in conjugate pairs, so the count is even.",
    },
  ],
  masteryQuiz: [
    cxChoice(
      "cx6-m1",
      "For a real polynomial, if $5-3i$ is a root, which must also be a root?",
      "B",
      ["$-5-3i$", "$5+3i$", "$-5+3i$", "$3+5i$"],
      "The conjugate root theorem gives 5 + 3i whenever 5 − 3i is a root of a real polynomial.",
      "Negate only the imaginary part."
    ),
    cxTyped(
      "cx6-m2",
      "Write the irreducible quadratic factor for roots $z=3\\pm 2i$.",
      "(z-(3+2i))(z-(3-2i))",
      "z^2-6z+13",
      ["z² - 6z + 13"],
      "a = 3, b = 2. Quadratic = z² − 6z + (9+4) = z² − 6z + 13.",
      "Apply z² − 2az + (a² + b²)."
    ),
    cxTyped(
      "cx6-m3",
      "For $P(z)=z^3-2z^2+4z-8$ with roots $\\pm2i$ and $2$, write the fully factorised form over $\\mathbb{C}$.",
      "P(z)=(z-2i)(z+2i)(z-2)",
      "(z-2i)(z+2i)(z-2)",
      ["(z − 2i)(z + 2i)(z − 2)"],
      "P(z) = (z−2i)(z+2i)(z−2).",
      "Write one linear factor per root."
    ),
    cxChoice(
      "cx6-m4",
      "A degree-5 real polynomial has exactly two non-real roots. How many real roots does it have (counting multiplicity)?",
      "C",
      ["2", "4", "3", "5"],
      "Degree 5 total. Two non-real roots come as one conjugate pair. Remaining 5−2 = 3 roots must be real.",
      "Total degree = real roots + conjugate pairs × 2."
    ),
    cxTyped(
      "cx6-m5",
      "The constant term in $z^2-2az+(a^2+b^2)$ when $a=4,b=3$ is:",
      "a^2+b^2,\\;a=4,\\;b=3",
      "25",
      [],
      "4² + 3² = 16 + 9 = 25.",
      "Apply a² + b²."
    ),
    cxChoice(
      "cx6-m6",
      "For a real polynomial $P(z)$, which factorisation is correct over $\\mathbb{C}$?",
      "A",
      [
        "All factors are linear: $P(z)=a_n(z-z_1)\\cdots(z-z_n)$",
        "All factors are quadratic",
        "Factors alternate between linear and quadratic",
        "Only factors with real roots appear",
      ],
      "Over ℂ every polynomial of degree n splits into exactly n linear factors (fundamental theorem of algebra)."
    ),
    cxTyped(
      "cx6-m7",
      "A degree-3 real polynomial has one real root $r$ and complex root $a+bi$. How many distinct roots are there in total?",
      "\\text{degree 3 real polynomial}",
      "3",
      [],
      "One real root r, plus conjugate pair a+bi and a−bi: total 3 roots.",
      "Count r plus both members of the conjugate pair."
    ),
    cxChoice(
      "cx6-m8",
      "Which polynomial has roots $i,-i,2$?",
      "C",
      [
        "$z^3+z^2+z+2$",
        "$z^3-2z^2+z-2$",
        "$z^3-2z^2+z-2$",
        "$z^3+z^2-z-2$",
      ],
      "(z−i)(z+i)(z−2) = (z²+1)(z−2) = z³−2z²+z−2.",
      "Multiply (z−i)(z+i) first, then multiply by (z−2)."
    ),
    cxTyped(
      "cx6-m9",
      "If $z=1-2i$ is a root of a real polynomial, write the corresponding real quadratic factor.",
      "(z-(1-2i))(z-(1+2i))",
      "z^2-2z+5",
      ["z² - 2z + 5"],
      "a = 1, b = 2. Quadratic = z² − 2z + (1+4) = z² − 2z + 5.",
      "Apply z² − 2az + (a² + b²)."
    ),
    cxTyped(
      "cx6-m10",
      "A real polynomial $P$ has $2+i$ as a root and degree 3. Given $P(z)=(z^2-4z+5)(z-r)$, find $r$ if $P(0)=-10$.",
      "P(0)=(5)(-r)=-10",
      "2",
      [],
      "P(0) = (0−4×0+5)(0−r) = 5×(−r) = −10. So r = 2.",
      "Substitute z = 0 and solve for r."
    ),
  ],
  masteryPassMark: 0.8,
};

// ─── Lesson builder ───────────────────────────────────────────────────────────

function cx2Lesson(
  id: string,
  title: string,
  partial: Partial<ExplicitLesson>
): Partial<ExplicitLesson> {
  return {
    ...partial,
    id,
    slug: id,
    moduleSlug: "complex-numbers",
    moduleTitle: "Complex Numbers",
    courseTitle: "Year 12 Mathematics Extension 2",
    syllabusArea: "Complex Numbers",
    focus: "Complex numbers and the Argand diagram",
    status: "active",
    video: {
      title,
      url: "/videos/placeholder-lesson.mp4",
    },
    masteryPassMark: 0.8,
  };
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function year12Extension2ComplexNumbersLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (course.slug !== "year-12-extension-2") return undefined;
  if (unit.slug !== "complex-numbers") return undefined;

  switch (lesson.slug) {
    case "complex-number-arithmetic":
      return cx2Lesson("complex-number-arithmetic", "Complex Number Arithmetic", complexArithmetic);
    case "modulus-argument-conjugate":
      return cx2Lesson("modulus-argument-conjugate", "Modulus, Argument and Conjugate", modulusArgumentConjugate);
    case "argand-diagram-geometry":
      return cx2Lesson("argand-diagram-geometry", "Argand Diagram and Geometry", argandDiagramGeometry);
    case "polar-form-de-moivre":
      return cx2Lesson("polar-form-de-moivre", "Polar Form and De Moivre's Theorem", polarFormDeMoivre);
    case "roots-of-unity":
      return cx2Lesson("roots-of-unity", "Roots of Unity", rootsOfUnity);
    case "complex-polynomials":
      return cx2Lesson("complex-polynomials", "Complex Polynomials", complexPolynomials);
    default:
      return undefined;
  }
}
