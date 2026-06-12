import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
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
    cxChoice(
      "cx2-g3",
      "Which of the following is the conjugate of 2 − 3i?",
      "A",
      ["2 + 3i", "−2 − 3i", "−2 + 3i", "3 − 2i"],
      "The conjugate of a − bi is a + bi. Conjugate of 2 − 3i is 2 + 3i.",
      "The conjugate keeps the real part and flips the sign of the imaginary part."
    ),
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
    cxChoice(
      "cx3-m7",
      "|z| = 2 represents which of the following on the Argand diagram?",
      "A",
      ["a circle of radius 2 centred at the origin", "a horizontal line", "a single point", "a circle of radius 4"],
      "|z| = 2 means distance from origin equals 2: a circle of radius 2 centred at the origin.",
      "|z − 0| = 2 is a circle centred at 0 with radius 2."
    ),
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
    default:
      return undefined;
  }
}
