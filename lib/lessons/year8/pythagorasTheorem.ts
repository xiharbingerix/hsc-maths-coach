import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";
import type { CartesianGraph, TriangleDiagram } from "../types";

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  triangleDiagram?: TriangleDiagram,
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify what is known and unknown, choose the matching method, then calculate step by step.",
    explanation,
    triangleDiagram,
    cartesianGraph,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C or D.}",
  triangleDiagram?: TriangleDiagram,
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully and use the labelled diagram if one is shown.",
    explanation,
    triangleDiagram,
    cartesianGraph,
  };
}

function tri(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"],
  rightAngleAt: "A" | "B" | "C" = "C",
  angleLabels: TriangleDiagram["angleLabels"] = {}
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 80, y: 40 },
      C: { x: 80, y: 230 },
      B: { x: 330, y: 230 },
    },
    rightAngleAt,
    sideLabels,
    angleLabels,
  };
}

function coordGraph(
  description: string,
  from: { x: number; y: number; label: string },
  to: { x: number; y: number; label: string },
  domain = { xMin: 0, xMax: 8, yMin: 0, yMax: 8, xStep: 1, yStep: 1 }
): CartesianGraph {
  return {
    description,
    ...domain,
    points: [from, to],
    lineSegments: [{ from, to }],
  };
}

function poolAnswer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  difficulty: number,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint: "Identify what is known and unknown, choose the matching method, then calculate step by step.",
    explanation,
  };
}

function poolChoice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  difficulty: number,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    hint: "Read the question carefully and use the labelled diagram if one is shown.",
    explanation,
  };
}

// ── Lesson 1: Introduction to right-angled triangles and the theorem ─────────

const introTheorem: LessonContent = {
  description:
    "Identify right-angled triangles, name the hypotenuse, and understand Pythagoras' theorem as a relationship between the three side lengths.",
  learningIntention:
    "Recognise right-angled triangles and state Pythagoras' theorem correctly.",
  successCriteria: [
    "Identify the right angle in a triangle from a diagram or description.",
    "Name the hypotenuse as the side directly opposite the right angle.",
    "State the theorem: a squared plus b squared equals c squared.",
    "Verify that a set of three numbers satisfies the theorem.",
  ],
  teaching: {
    paragraphs: [
      "A right-angled triangle has one angle that is exactly 90 degrees. This angle is marked with a small square in diagrams.",
      "The side directly opposite the right angle is called the hypotenuse. It is always the longest side of the triangle.",
      "Pythagoras' theorem says: if you square each shorter side and add the results, you get the square of the hypotenuse. Using a and b for the shorter sides and c for the hypotenuse: a squared plus b squared equals c squared.",
      "To check whether three lengths form a right-angled triangle, substitute them into the theorem. If the equation balances, they satisfy the theorem.",
    ],
    latexBlocks: [
      "a^2 + b^2 = c^2",
      "3^2 + 4^2 = 9 + 16 = 25 = 5^2 \\checkmark",
    ],
  },
  workedExamples: [
    {
      title: "Identify the hypotenuse",
      questionLatex: "\\text{In the triangle below, which side is the hypotenuse?}",
      triangleDiagram: tri(
        "Right-angled triangle ABC with right angle at C, shorter sides labelled a and b and hypotenuse labelled c.",
        { AC: "a", BC: "b", AB: "c" }
      ),
      steps: [
        { explanation: "The right angle is at C, marked with a square.", latex: "\\text{Right angle at }C" },
        { explanation: "The hypotenuse is opposite the right angle, so it is side AB.", latex: "\\text{Hypotenuse } = AB = c" },
      ],
      finalAnswerLatex: "\\text{Side }AB\\text{ is the hypotenuse.}",
    } as WorkedExample,
    {
      title: "Verify a 3-4-5 triangle",
      questionLatex: "\\text{Show that a triangle with sides }3\\text{ cm, }4\\text{ cm and }5\\text{ cm is right-angled.}",
      triangleDiagram: tri(
        "Triangle with shorter sides 3 cm and 4 cm and longest side 5 cm.",
        { AC: "3 cm", BC: "4 cm", AB: "5 cm" }
      ),
      steps: [
        { explanation: "Square each shorter side and add.", latex: "3^2 + 4^2 = 9 + 16 = 25" },
        { explanation: "Square the longest side.", latex: "5^2 = 25" },
        { explanation: "Both sides equal 25, so the theorem holds.", latex: "25 = 25 \\checkmark" },
      ],
      finalAnswerLatex: "\\text{The triangle is right-angled.}",
    } as WorkedExample,
    {
      title: "Show a triple is NOT right-angled",
      questionLatex: "\\text{A triangle has sides }4\\text{ cm, }5\\text{ cm and }7\\text{ cm. Is it right-angled?}",
      steps: [
        { explanation: "Square the two shorter sides and add.", latex: "4^2 + 5^2 = 16 + 25 = 41" },
        { explanation: "Square the longest side.", latex: "7^2 = 49" },
        { explanation: "41 is not equal to 49, so the theorem does not hold.", latex: "41 \\neq 49" },
      ],
      finalAnswerLatex: "\\text{Not a right-angled triangle.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-pyth-intro-g1",
      "Which side of a right-angled triangle is the hypotenuse?",
      "C",
      [
        "The shortest side",
        "A side that touches the right angle",
        "The side opposite the right angle",
        "The side at the top of the diagram",
      ],
      "The hypotenuse is always opposite the right angle.",
      "\\text{Select the correct description.}"
    ),
    answer(
      "y8-pyth-intro-g2",
      "A right-angled triangle has shorter sides 6 and 8. Calculate 6 squared plus 8 squared.",
      "",
      "100",
      "6 squared is 36 and 8 squared is 64. Their sum is 100."
    ),
    choice(
      "y8-pyth-intro-g3",
      "Which set of three lengths satisfies Pythagoras' theorem?",
      "B",
      ["3, 4, 6", "5, 12, 13", "6, 7, 9", "4, 5, 7"],
      "5 squared plus 12 squared equals 25 plus 144 equals 169, which equals 13 squared.",
      "\\text{Check } a^2+b^2=c^2."
    ),
    answer(
      "y8-pyth-intro-g4",
      "Do sides 8, 15, 17 form a right-angled triangle? Enter yes or no.",
      "",
      "yes",
      "64 plus 225 equals 289, and 17 squared equals 289. The theorem holds.",
      ["Yes", "YES"]
    ),
  ],
  independentPractice: [
    choice(
      "y8-pyth-intro-i1",
      "In a right-angled triangle, the right angle is at vertex C. Which side is the hypotenuse?",
      "A",
      ["AB", "AC", "BC", "All sides equally"],
      "The side opposite the right angle at C is AB.",
      "\\text{Triangle with right angle at }C."
    ),
    answer(
      "y8-pyth-intro-i2",
      "Calculate 5 squared plus 12 squared.",
      "",
      "169",
      "25 plus 144 equals 169."
    ),
    choice(
      "y8-pyth-intro-i3",
      "A student says 4, 6, 8 is a Pythagorean triple because 4 plus 6 equals 10 and 8 plus 2 equals 10. What is wrong?",
      "D",
      [
        "The numbers are too small",
        "Only two numbers can be used",
        "The triple must include 5",
        "The theorem uses squares, not sums",
      ],
      "Pythagoras' theorem uses squared values, not plain sums.",
      "\\text{Identify the error.}"
    ),
    answer(
      "y8-pyth-intro-i4",
      "Do sides 6, 8, 10 form a right-angled triangle? Enter yes or no.",
      "",
      "yes",
      "36 plus 64 equals 100, which equals 10 squared.",
      ["Yes", "YES"]
    ),
    answer(
      "y8-pyth-intro-i5",
      "Do sides 5, 6, 8 form a right-angled triangle? Enter yes or no.",
      "",
      "no",
      "25 plus 36 equals 61, but 8 squared is 64. The theorem does not hold.",
      ["No", "NO"]
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calling one of the shorter sides the hypotenuse.",
      fix: "Find the right-angle marker first. The side directly opposite it is always the hypotenuse.",
    },
    {
      mistake: "Using the theorem with the three sides added, not squared.",
      fix: "Square each shorter side separately before adding.",
    },
    {
      mistake: "Checking a² + b² = c using any side as c.",
      fix: "Use c for the longest side (the hypotenuse) and a, b for the two shorter sides.",
    },
    {
      mistake: "Concluding a triangle is right-angled without squaring.",
      fix: "Always substitute squared values. Check that the two results are exactly equal.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-pyth-intro-m1",
      "The right angle is at B. Which side is the hypotenuse?",
      "C",
      ["AB", "BC", "AC", "There is no hypotenuse"],
      "The hypotenuse is opposite the right angle at B, so it is AC.",
      "\\text{Triangle with right angle at }B.",
      tri("Right-angled triangle with right angle at B.", { AB: "AB", BC: "BC", AC: "AC" }, "B")
    ),
    answer(
      "y8-pyth-intro-m2",
      "Calculate 9 squared plus 12 squared.",
      "",
      "225",
      "81 plus 144 equals 225."
    ),
    choice(
      "y8-pyth-intro-m3",
      "Which of the following is a Pythagorean triple?",
      "A",
      ["8, 15, 17", "6, 7, 10", "3, 5, 6", "4, 6, 8"],
      "8 squared plus 15 squared is 64 plus 225 which equals 289, and 17 squared is 289."
    ),
    answer(
      "y8-pyth-intro-m4",
      "Do sides 9, 40, 41 satisfy Pythagoras' theorem? Enter yes or no.",
      "",
      "yes",
      "81 plus 1600 equals 1681, which equals 41 squared.",
      ["Yes", "YES"]
    ),
    answer(
      "y8-pyth-intro-m5",
      "Do sides 7, 8, 11 satisfy Pythagoras' theorem? Enter yes or no.",
      "",
      "no",
      "113 does not equal 121, so the theorem does not hold.",
      ["No", "NO"]
    ),
    choice(
      "y8-pyth-intro-m6",
      "Which statement correctly describes the hypotenuse?",
      "B",
      [
        "The shortest side of any triangle",
        "The longest side, opposite the right angle",
        "A side that touches the 90 degree corner",
        "Any side in a right-angled triangle",
      ],
      "The hypotenuse is the longest side and lies opposite the right angle."
    ),
    answer(
      "y8-pyth-intro-m7",
      "A right-angled triangle has shorter sides of length 20 and 21. Calculate 20 squared plus 21 squared.",
      "",
      "841",
      "400 plus 441 equals 841."
    ),
    choice(
      "y8-pyth-intro-m8",
      "A student checks whether 10, 24, 26 is a Pythagorean triple by computing 10 + 24 = 34. What is wrong?",
      "C",
      [
        "The numbers are too large",
        "The theorem only works for whole numbers under 20",
        "The theorem requires squaring, not adding plain lengths",
        "The student should subtract instead",
      ],
      "Pythagoras' theorem uses squares: 100 + 576 = 676 = 26 squared."
    ),
    answer(
      "y8-pyth-intro-m9",
      "Do sides 10, 24, 26 satisfy Pythagoras' theorem? Enter yes or no.",
      "",
      "yes",
      "100 plus 576 equals 676, which equals 26 squared.",
      ["Yes", "YES"]
    ),
    choice(
      "y8-pyth-intro-m10",
      "In the theorem a squared plus b squared equals c squared, what does c represent?",
      "D",
      [
        "The shortest side",
        "Any side of the triangle",
        "Either shorter side",
        "The hypotenuse",
      ],
      "In the standard form, c is always the hypotenuse."
    ),
  ],
  masteryQuizPool: [
    poolChoice("y8-pyth-intro-p1", "Which feature marks the right angle in a triangle diagram?", "B", ["A curved arc", "A small square", "A double line", "A dot"], "A right angle is shown by a small square in the corner.", 1),
    poolAnswer("y8-pyth-intro-p2", "Calculate 3 squared plus 4 squared.", "", "25", "9 plus 16 equals 25.", 1),
    poolAnswer("y8-pyth-intro-p3", "Calculate 5 squared plus 12 squared.", "", "169", "25 plus 144 equals 169.", 1),
    poolChoice("y8-pyth-intro-p4", "Which side is always the longest in a right-angled triangle?", "C", ["A shorter side", "Either shorter side", "The hypotenuse", "They are all equal"], "The hypotenuse, opposite the right angle, is the longest side.", 1),
    poolAnswer("y8-pyth-intro-p5", "Calculate 6 squared plus 8 squared.", "", "100", "36 plus 64 equals 100.", 1),
    poolChoice("y8-pyth-intro-p6", "The right angle is at vertex A. Which side is the hypotenuse?", "B", ["AB", "BC", "AC", "There is none"], "The hypotenuse BC is opposite the right angle at A.", 2),
    poolAnswer("y8-pyth-intro-p7", "Do sides 3, 4, 5 satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "9 plus 16 equals 25, which equals 5 squared.", 2, ["Yes", "YES"]),
    poolAnswer("y8-pyth-intro-p8", "Do sides 5, 12, 13 satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "25 plus 144 equals 169, which equals 13 squared.", 2, ["Yes", "YES"]),
    poolAnswer("y8-pyth-intro-p9", "Calculate 7 squared plus 24 squared.", "", "625", "49 plus 576 equals 625.", 2),
    poolChoice("y8-pyth-intro-p10", "Which set of three lengths is a Pythagorean triple?", "A", ["6, 8, 10", "2, 3, 4", "5, 6, 8", "4, 5, 6"], "6 squared plus 8 squared is 36 plus 64 equals 100, which is 10 squared.", 2),
    poolAnswer("y8-pyth-intro-p11", "Do sides 4, 5, 6 satisfy Pythagoras' theorem? Enter yes or no.", "", "no", "16 plus 25 equals 41, but 6 squared is 36. The theorem does not hold.", 2, ["No", "NO"]),
    poolChoice("y8-pyth-intro-p12", "In a squared plus b squared equals c squared, what are a and b?", "D", ["Any two sides", "The hypotenuse and one shorter side", "The right angle and a side", "The two shorter sides"], "a and b are the two shorter sides; c is the hypotenuse.", 2),
    poolAnswer("y8-pyth-intro-p13", "Calculate 8 squared plus 15 squared.", "", "289", "64 plus 225 equals 289.", 2),
    poolAnswer("y8-pyth-intro-p14", "Do sides 9, 12, 15 satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "81 plus 144 equals 225, which equals 15 squared.", 3),
    poolChoice("y8-pyth-intro-p15", "Which set of lengths is NOT a Pythagorean triple?", "C", ["3, 4, 5", "5, 12, 13", "6, 7, 9", "8, 15, 17"], "6 squared plus 7 squared is 85, but 9 squared is 81.", 3),
    poolAnswer("y8-pyth-intro-p16", "Do sides 7, 24, 25 satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "49 plus 576 equals 625, which equals 25 squared.", 3, ["Yes", "YES"]),
    poolAnswer("y8-pyth-intro-p17", "Calculate 12 squared plus 16 squared.", "", "400", "144 plus 256 equals 400.", 3),
    poolChoice("y8-pyth-intro-p18", "A student says 5, 6, 8 is a right triangle because 5 plus 6 is greater than 8. Why is this reasoning wrong?", "B", ["The numbers are too small", "The theorem compares squares, not a sum of two sides", "8 must be a shorter side", "All triangles are right-angled"], "Pythagoras' theorem checks a squared plus b squared against c squared, not a plain sum.", 3),
    poolAnswer("y8-pyth-intro-p19", "Do sides 10, 24, 26 satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "100 plus 576 equals 676, which equals 26 squared.", 3, ["Yes", "YES"]),
    poolChoice("y8-pyth-intro-p20", "Which describes a converse use of Pythagoras' theorem?", "A", ["Checking whether three given lengths form a right angle", "Finding the area of a triangle", "Measuring an angle with a protractor", "Adding all three sides for the perimeter"], "The converse uses the theorem to test whether a triangle is right-angled.", 4),
    poolAnswer("y8-pyth-intro-p21", "A triangle has sides 20, 21 and 29. Does it satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "400 plus 441 equals 841, which equals 29 squared.", 4, ["Yes", "YES"]),
    poolAnswer("y8-pyth-intro-p22", "A triangle has sides 9, 40 and 42. Does it satisfy Pythagoras' theorem? Enter yes or no.", "", "no", "81 plus 1600 equals 1681, but 42 squared is 1764. The theorem does not hold.", 4, ["No", "NO"]),
    poolChoice("y8-pyth-intro-p23", "For which set is a squared plus b squared LESS than c squared, suggesting an obtuse triangle?", "C", ["3, 4, 5", "6, 8, 10", "4, 5, 8", "5, 12, 13"], "4 squared plus 5 squared is 41, which is less than 8 squared (64).", 4),
    poolAnswer("y8-pyth-intro-p24", "Calculate 20 squared plus 21 squared.", "", "841", "400 plus 441 equals 841.", 4),
    poolAnswer("y8-pyth-intro-p25", "A triangle has sides 11, 60 and 61. Does it satisfy Pythagoras' theorem? Enter yes or no.", "", "yes", "121 plus 3600 equals 3721, which equals 61 squared.", 5, ["Yes", "YES"]),
    poolChoice("y8-pyth-intro-p26", "A triangle has sides 7, 8 and 10. Comparing 7 squared plus 8 squared with 10 squared, what does the result tell you?", "D", ["It is right-angled because 7 + 8 > 10", "It is right-angled because all sides differ", "It is obtuse because 113 is less than 100", "It is acute because 113 is greater than 100"], "7 squared plus 8 squared is 113, which is greater than 10 squared (100), so the largest angle is acute.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-intro-mp1",
      prompt:
        "A builder is checking three triangular brackets. Bracket P has sides 9 cm, 12 cm and 15 cm. Bracket Q has sides 8 cm, 9 cm and 12 cm.",
      latex: "\\text{Bracket P: }9,12,15.\\quad \\text{Bracket Q: }8,9,12.",
      answer: "yes",
      hint: "For each bracket, square the two shorter sides, add them, and compare with the square of the longest side.",
      explanation:
        "Part (a): 9 squared plus 12 squared is 81 plus 144 equals 225, and 15 squared is 225, so bracket P is right-angled (yes). Part (b): 8 squared plus 9 squared is 64 plus 81 equals 145, but 12 squared is 144, so bracket Q is not right-angled (no). Part (c): the longest side, 15 cm, is the hypotenuse of bracket P.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Is bracket P a right-angled triangle? Enter yes or no.",
          latex: "",
          marks: 1,
          answer: "yes",
          acceptedAnswers: ["Yes", "YES"],
          hint: "Add the squares of 9 and 12, then compare with 15 squared.",
          explanation: "81 plus 144 equals 225, which equals 15 squared, so bracket P is right-angled.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Is bracket Q a right-angled triangle? Enter yes or no.",
          latex: "",
          marks: 2,
          answer: "no",
          acceptedAnswers: ["No", "NO"],
          hint: "Add the squares of 8 and 9, then compare with 12 squared.",
          explanation: "64 plus 81 equals 145, but 12 squared is 144. Since 145 is not 144, bracket Q is not right-angled.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "For bracket P, give the length in centimetres of the hypotenuse.",
          latex: "",
          marks: 1,
          answer: "15",
          acceptedAnswers: ["15 cm"],
          hint: "The hypotenuse is the longest side, opposite the right angle.",
          explanation: "The hypotenuse is the longest side, which is 15 cm.",
        },
      ],
    },
  ],
};

// ── Lesson 2: Finding the hypotenuse ─────────────────────────────────────────

const findingHypotenuse: LessonContent = {
  description:
    "Use Pythagoras' theorem to calculate the hypotenuse when both shorter sides are known, expressing answers as exact values or rounded decimals.",
  learningIntention:
    "Calculate the hypotenuse by adding the squares of both shorter sides and taking the square root.",
  successCriteria: [
    "Confirm the unknown side is the hypotenuse.",
    "Square both shorter sides and add the results.",
    "Take the square root of the sum.",
    "Round decimal answers only when instructed.",
  ],
  teaching: {
    paragraphs: [
      "When both shorter sides are known, the hypotenuse is found by adding their squares and then taking the square root. Use c for the hypotenuse and a, b for the shorter sides.",
      "Some calculations produce a whole-number answer — these are called Pythagorean triples and should be left exact.",
      "When the answer is not a whole number, use a calculator and round to the stated number of decimal places at the very end.",
      "Why add the squares? Pythagoras' theorem says the square built on the hypotenuse has exactly the same area as the two squares on the shorter sides combined: a² + b² = c². So to find c you first rebuild that large square by adding a² and b², then undo the squaring with a square root. The hypotenuse is always the longest side, because c² is a sum of two positive areas and must exceed either one on its own.",
      "A quick sanity check: the hypotenuse must be longer than each shorter side but shorter than their sum. If your c comes out smaller than one of the given sides, you have probably subtracted instead of added, or solved for the wrong side.",
    ],
    latexBlocks: [
      "c = \\sqrt{a^2 + b^2}",
      "\\text{Example: }a=3,\\;b=4 \\Rightarrow c=\\sqrt{9+16}=\\sqrt{25}=5",
    ],
  },
  workedExamples: [
    {
      title: "Find a hypotenuse using a 3-4-5 triple",
      questionLatex: "\\text{Find }c\\text{ when }a=3\\text{ cm and }b=4\\text{ cm.}",
      triangleDiagram: tri("Right-angled triangle with shorter sides 3 cm and 4 cm and unknown hypotenuse c.", { AC: "3 cm", BC: "4 cm", AB: "c" }),
      steps: [
        { explanation: "The unknown is opposite the right angle, so it is the hypotenuse.", latex: "c^2 = 3^2 + 4^2" },
        { explanation: "Add the squares, then take the square root.", latex: "c = \\sqrt{9+16} = \\sqrt{25} = 5" },
      ],
      finalAnswerLatex: "c = 5\\text{ cm}",
    } as WorkedExample,
    {
      title: "Find a hypotenuse using a 5-12-13 triple",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }5\\text{ m and }12\\text{ m.}",
      steps: [
        { explanation: "Add the squares.", latex: "c^2 = 5^2 + 12^2 = 25 + 144 = 169" },
        { explanation: "Take the square root.", latex: "c = \\sqrt{169} = 13" },
      ],
      finalAnswerLatex: "13\\text{ m}",
    } as WorkedExample,
    {
      title: "Round a decimal hypotenuse",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }4\\text{ cm and }7\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Add the squares.", latex: "c = \\sqrt{4^2+7^2} = \\sqrt{16+49} = \\sqrt{65}" },
        { explanation: "Evaluate and round only at the end.", latex: "c \\approx 8.06\\ldots \\approx 8.1" },
      ],
      finalAnswerLatex: "8.1\\text{ cm}",
    } as WorkedExample,
    {
      title: "Recognise a scaled triple to save work",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }9\\text{ cm and }12\\text{ cm.}",
      steps: [
        { explanation: "Notice 9 and 12 are 3 times 3 and 4 — a scaled 3-4-5 triple — so the hypotenuse should be 3 × 5 = 15.", latex: "(9,12,?) = 3\\times(3,4,5)" },
        { explanation: "Confirm with the theorem.", latex: "c = \\sqrt{9^2+12^2} = \\sqrt{81+144} = \\sqrt{225} = 15" },
      ],
      finalAnswerLatex: "c = 15\\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-hyp-g1", "Find the hypotenuse in centimetres.", "", "10", "Square root of 36 plus 64 equals 10.", ["10 cm"], tri("Right triangle: shorter sides 6 cm and 8 cm, hypotenuse c.", { AC: "6 cm", BC: "8 cm", AB: "c" })),
    choice("y8-pyth-hyp-g2", "Which calculation finds the hypotenuse when a = 9 and b = 12?", "B", ["$9 + 12$", "$\\sqrt{9^2+12^2}$", "$\\sqrt{9^2-12^2}$", "$9^2+12^2$"], "Add the squares then take the square root.", "\\text{Select the correct setup.}"),
    answer("y8-pyth-hyp-g3", "Find the hypotenuse in metres.", "", "17", "Square root of 64 plus 225 equals 17.", ["17 m"]),
    answer("y8-pyth-hyp-g4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "", "7.6", "Square root of 58 is approximately 7.6.", ["7.6 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-hyp-i1", "Find the hypotenuse in millimetres.", "", "15", "Square root of 81 plus 144 equals 15.", ["15 mm"]),
    answer("y8-pyth-hyp-i2", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "8.6", "Square root of 74 is approximately 8.6.", ["8.6 m"]),
    choice("y8-pyth-hyp-i3", "A student adds 6 and 8 to get 14, then says the hypotenuse is 14. What error was made?", "A", ["Side lengths were added instead of squared", "The wrong sides were chosen", "The square root was taken of 14", "Nothing is wrong"], "Pythagoras requires squaring each side first."),
    answer("y8-pyth-hyp-i4", "Find the hypotenuse in centimetres.", "", "25", "Square root of 49 plus 576 equals 25.", ["25 cm"]),
    answer("y8-pyth-hyp-i5", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "", "7.8", "Square root of 61 is approximately 7.8.", ["7.8 cm"]),
  ],
  commonMistakes: [
    { mistake: "Adding the side lengths before squaring.", fix: "Square each shorter side first, then add the two squared values." },
    { mistake: "Forgetting to take the square root.", fix: "After finding c squared, take the square root to find c." },
    { mistake: "Rounding too early in the working.", fix: "Keep the full calculator value and round only the final answer." },
    { mistake: "Choosing a shorter side as the hypotenuse.", fix: "The hypotenuse is opposite the right angle and is always the longest side." },
  ],
  masteryQuiz: [
    answer("y8-pyth-hyp-m1", "Find the hypotenuse in centimetres.", "", "5", "Square root of 25 equals 5.", ["5 cm"]),
    answer("y8-pyth-hyp-m2", "Find the hypotenuse in metres.", "", "13", "Square root of 169 equals 13.", ["13 m"]),
    choice("y8-pyth-hyp-m3", "Which side is the hypotenuse in the triangle below?", "A", ["AB", "AC", "BC", "Cannot tell"], "AB is opposite the right angle at C.", "\\text{Use the diagram.}", tri("Right-angled triangle ABC with right angle at C.", { AB: "AB", AC: "AC", BC: "BC" })),
    answer("y8-pyth-hyp-m4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "", "9.2", "Square root of 85 is approximately 9.2.", ["9.2 cm"]),
    answer("y8-pyth-hyp-m5", "Find the hypotenuse in kilometres.", "", "29", "Square root of 841 equals 29.", ["29 km"]),
    choice("y8-pyth-hyp-m6", "Which is the correct calculation for shorter sides 10 and 11?", "C", ["$\\sqrt{11^2-10^2}$", "$10+11$", "$\\sqrt{10^2+11^2}$", "$10^2+11^2$"], "A hypotenuse uses the square root of the sum of squares."),
    answer("y8-pyth-hyp-m7", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "9.8", "Square root of 97 is approximately 9.8.", ["9.8 m"]),
    choice("y8-pyth-hyp-m8", "A student finds 9 + 16 = 25 for sides 3 and 4, then writes 25 cm as the answer. What step is missing?", "B", ["Subtract the squares", "Take the square root", "Double the result", "Round to a decimal"], "c squared was found; the square root gives c."),
    answer("y8-pyth-hyp-m9", "A rectangular screen is 30 cm wide and 40 cm high. Find its diagonal in centimetres.", "", "50", "Square root of 900 plus 1600 equals 50.", ["50 cm"]),
    answer("y8-pyth-hyp-m10", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "17.0", "Square root of 121 plus 169 is approximately 17.0.", ["17.0 m", "17 m", "17"]),
  ],
  masteryQuizPool: [
    poolAnswer("y8-pyth-hyp-p1", "Find the hypotenuse in centimetres.", "", "10", "Square root of 36 plus 64 equals 10.", 1, ["10 cm"]),
    poolAnswer("y8-pyth-hyp-p2", "Find the hypotenuse in metres.", "", "17", "Square root of 64 plus 225 equals 17.", 1, ["17 m"]),
    poolAnswer("y8-pyth-hyp-p3", "Find the hypotenuse in centimetres.", "", "15", "Square root of 81 plus 144 equals 15.", 1, ["15 cm"]),
    poolAnswer("y8-pyth-hyp-p4", "Find the hypotenuse in metres.", "", "25", "Square root of 49 plus 576 equals 25.", 1, ["25 m"]),
    poolChoice("y8-pyth-hyp-p5", "Which calculation finds the hypotenuse for shorter sides 5 and 12?", "B", ["$5+12$", "$\\sqrt{5^2+12^2}$", "$\\sqrt{12^2-5^2}$", "$5^2+12^2$"], "Add the squares then take the square root.", 1),
    poolAnswer("y8-pyth-hyp-p6", "Find the hypotenuse in metres.", "", "29", "Square root of 400 plus 441 equals 29.", 2, ["29 m"]),
    poolAnswer("y8-pyth-hyp-p7", "Find the hypotenuse in millimetres.", "", "20", "Square root of 144 plus 256 equals 20.", 2, ["20 mm"]),
    poolAnswer("y8-pyth-hyp-p8", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "", "8.1", "Square root of 65 is approximately 8.1.", 2, ["8.1 cm"]),
    poolAnswer("y8-pyth-hyp-p9", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "9.4", "Square root of 89 is approximately 9.4.", 2, ["9.4 m"]),
    poolAnswer("y8-pyth-hyp-p10", "Find the hypotenuse in centimetres.", "", "26", "Square root of 100 plus 576 equals 26.", 2, ["26 cm"]),
    poolChoice("y8-pyth-hyp-p11", "A student computes 9 + 16 = 25 for shorter sides 3 and 4 and writes 25 cm. What is missing?", "C", ["Subtract the squares", "Add the side lengths", "Take the square root", "Round the answer"], "After finding c squared, take the square root to get c equals 5.", 2),
    poolAnswer("y8-pyth-hyp-p12", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "", "10.8", "Square root of 36 plus 81 equals square root of 117 which is about 10.8.", 3, ["10.8 cm"]),
    poolAnswer("y8-pyth-hyp-p13", "A rectangle is 9 cm by 12 cm. Find its diagonal in centimetres.", "", "15", "Square root of 81 plus 144 equals 15.", 3, ["15 cm"]),
    poolAnswer("y8-pyth-hyp-p14", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "13.0", "Square root of 49 plus 121 equals square root of 170 which is about 13.0.", 3, ["13.0 m", "13 m", "13"]),
    poolAnswer("y8-pyth-hyp-p15", "Find the hypotenuse in centimetres.", "", "30", "Square root of 324 plus 576 equals 30.", 3, ["30 cm"]),
    poolChoice("y8-pyth-hyp-p16", "Which gives the longer hypotenuse: sides 5 and 12, or sides 6 and 10?", "A", ["Sides 5 and 12 (hypotenuse 13)", "Sides 6 and 10 (hypotenuse about 11.7)", "They are equal", "Cannot be compared"], "13 is greater than the square root of 136 (about 11.7).", 3),
    poolAnswer("y8-pyth-hyp-p17", "A square has side length 5 cm. Find its diagonal in centimetres. Round to 1 decimal place.", "", "7.1", "Square root of 25 plus 25 equals square root of 50 which is about 7.1.", 4, ["7.1 cm"]),
    poolAnswer("y8-pyth-hyp-p18", "A rectangle is 1.5 m by 2.0 m. Find its diagonal in metres.", "", "2.5", "Square root of 2.25 plus 4 equals square root of 6.25 which is 2.5.", 4, ["2.5 m"]),
    poolAnswer("y8-pyth-hyp-p19", "Find the hypotenuse in metres. Round to 2 decimal places.", "", "7.5", "Square root of 20.25 plus 36 equals square root of 56.25 which is 7.5.", 4, ["7.50 m", "7.5 m", "7.5"]),
    poolAnswer("y8-pyth-hyp-p20", "A right-angled triangle has shorter sides 1.2 m and 1.6 m. Find the hypotenuse in metres.", "", "2", "Square root of 1.44 plus 2.56 equals square root of 4 which is 2.", 4, ["2 m", "2.0 m"]),
    poolChoice("y8-pyth-hyp-p21", "Two shorter sides are tripled from 3 and 4 to 9 and 12. What happens to the hypotenuse?", "B", ["It stays 5", "It triples to 15", "It increases by 3 to 8", "It doubles to 10"], "Scaling both sides by 3 scales the hypotenuse by 3: from 5 to 15.", 4),
    poolAnswer("y8-pyth-hyp-p22", "Find the hypotenuse in metres. Round to 1 decimal place.", "", "19.8", "Square root of 169 plus 225 equals square root of 394 which is about 19.8.", 5, ["19.8 m"]),
    poolAnswer("y8-pyth-hyp-p23", "A ladder leans so its top is 8 m up a wall and its base is 6 m out. Find the ladder length in metres.", "", "10", "Square root of 64 plus 36 equals 10.", 5, ["10 m"]),
    poolAnswer("y8-pyth-hyp-p24", "A rectangular field is 40 m by 9 m. Find the diagonal in metres.", "", "41", "Square root of 1600 plus 81 equals square root of 1681 which is 41.", 5, ["41 m"]),
    poolAnswer("y8-pyth-hyp-p25", "Find the hypotenuse in centimetres. Round to 2 decimal places.", "", "6.5", "Square root of 6.25 plus 36 equals square root of 42.25 which is 6.5.", 5, ["6.50 cm", "6.5 cm", "6.5"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-hyp-mp1",
      prompt:
        "A rectangular gate is 24 cm wide and 7 cm high. A diagonal brace runs corner to corner. A second, larger gate is 8 cm wide and 6 cm high.",
      latex: "\\text{Gate 1: }24\\times 7.\\quad \\text{Gate 2: }8\\times 6.",
      answer: "25",
      hint: "A diagonal is the hypotenuse of a right triangle whose shorter sides are the width and height. Add the squares and take the square root.",
      explanation:
        "Part (a): square root of 24 squared plus 7 squared equals square root of 576 plus 49 equals square root of 625 equals 25 cm. Part (b): square root of 8 squared plus 6 squared equals square root of 64 plus 36 equals square root of 100 equals 10 cm. Part (c): 25 minus 10 equals 15 cm difference.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the length of the diagonal brace of gate 1 in centimetres.",
          latex: "",
          marks: 2,
          answer: "25",
          acceptedAnswers: ["25 cm"],
          hint: "Add the squares of 24 and 7, then take the square root.",
          explanation: "Square root of 576 plus 49 equals square root of 625 equals 25 cm.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the length of the diagonal of gate 2 in centimetres.",
          latex: "",
          marks: 1,
          answer: "10",
          acceptedAnswers: ["10 cm"],
          hint: "Add the squares of 8 and 6, then take the square root.",
          explanation: "Square root of 64 plus 36 equals square root of 100 equals 10 cm.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How much longer, in centimetres, is gate 1's diagonal than gate 2's?",
          latex: "",
          marks: 1,
          answer: "15",
          acceptedAnswers: ["15 cm"],
          hint: "Subtract the smaller diagonal from the larger.",
          explanation: "25 minus 10 equals 15 cm.",
        },
      ],
    },
  ],
};

// ── Lesson 3: Finding a shorter side ─────────────────────────────────────────

const findingShorterSide: LessonContent = {
  description:
    "Use Pythagoras' theorem to find an unknown shorter side when the hypotenuse and one shorter side are given.",
  learningIntention:
    "Rearrange Pythagoras' theorem to subtract and find a shorter side.",
  successCriteria: [
    "Identify the hypotenuse as the longest given side.",
    "Subtract the known shorter-side square from the hypotenuse square.",
    "Take the square root of the difference.",
    "Check the answer is shorter than the hypotenuse.",
  ],
  teaching: {
    paragraphs: [
      "When the unknown is a shorter side, start with the hypotenuse square and subtract the square of the known shorter side.",
      "Always identify the hypotenuse first — it is the longest side, opposite the right angle. The method only works if you subtract from the correct (largest) value.",
      "Subtract first, then take the square root. A common mistake is to take the square root of each value separately.",
      "Why subtract here? Pythagoras balances areas: a² + b² = c². If you already know the hypotenuse c and one leg, that leg's square uses up part of the c² area, so the missing leg's square is simply what is left over: b² = c² − a². Taking the square root then recovers the side. You subtract (rather than add) precisely because the unknown is a shorter side, whose square must be less than the hypotenuse's.",
      "This is why identifying the hypotenuse first is essential — it is the only side whose square you start from. If you accidentally add instead, you get a length longer than the hypotenuse, which is impossible in a right-angled triangle and is an instant signal that the set-up is wrong.",
    ],
    latexBlocks: [
      "a^2 + b^2 = c^2",
      "b = \\sqrt{c^2 - a^2}",
      "b = \\sqrt{13^2 - 5^2} = \\sqrt{169-25} = \\sqrt{144} = 12",
    ],
  },
  workedExamples: [
    {
      title: "Use a 5-12-13 triangle",
      questionLatex: "\\text{The hypotenuse is }13\\text{ cm and one shorter side is }5\\text{ cm. Find the unknown shorter side.}",
      triangleDiagram: tri("Right-angled triangle: hypotenuse 13 cm, one shorter side 5 cm, unknown shorter side x.", { AB: "13 cm", AC: "5 cm", BC: "x" }),
      steps: [
        { explanation: "Subtract the known shorter-side square from the hypotenuse square.", latex: "x^2 = 13^2 - 5^2 = 169 - 25 = 144" },
        { explanation: "Take the square root.", latex: "x = \\sqrt{144} = 12" },
      ],
      finalAnswerLatex: "12\\text{ cm}",
    } as WorkedExample,
    {
      title: "Use a 6-8-10 triangle",
      questionLatex: "\\text{Hypotenuse }10\\text{ m, one shorter side }6\\text{ m. Find the other shorter side.}",
      steps: [
        { explanation: "Subtract the squares.", latex: "x = \\sqrt{10^2 - 6^2} = \\sqrt{100-36} = \\sqrt{64}" },
        { explanation: "Take the square root.", latex: "x = 8" },
      ],
      finalAnswerLatex: "8\\text{ m}",
    } as WorkedExample,
    {
      title: "Round a decimal shorter side",
      questionLatex: "\\text{Hypotenuse }11\\text{ cm, one shorter side }7\\text{ cm. Find the other, rounded to 1 decimal place.}",
      steps: [
        { explanation: "Subtract the squares.", latex: "x = \\sqrt{11^2-7^2} = \\sqrt{121-49} = \\sqrt{72}" },
        { explanation: "Evaluate and round.", latex: "x \\approx 8.485\\ldots \\approx 8.5" },
      ],
      finalAnswerLatex: "8.5\\text{ cm}",
    } as WorkedExample,
    {
      title: "Recover a shorter side in a scaled triple",
      questionLatex: "\\text{Hypotenuse }25\\text{ m, one shorter side }20\\text{ m. Find the other shorter side.}",
      steps: [
        { explanation: "Subtract the known leg's square from the hypotenuse's square.", latex: "b^2 = 25^2 - 20^2 = 625 - 400 = 225" },
        { explanation: "Take the square root (this is a scaled 3-4-5: 15-20-25).", latex: "b = \\sqrt{225} = 15" },
      ],
      finalAnswerLatex: "b = 15\\text{ m}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-short-g1", "Find the unknown shorter side in centimetres.", "", "5", "Square root of 169 minus 144 equals 5.", ["5 cm"], tri("Right-angled triangle: hypotenuse 13 cm, known shorter side 12 cm, unknown side x.", { AB: "13 cm", BC: "12 cm", AC: "x" })),
    answer("y8-pyth-short-g2", "Find the unknown shorter side in metres.", "", "15", "Square root of 289 minus 64 equals 15.", ["15 m"]),
    choice("y8-pyth-short-g3", "Which setup finds unknown shorter side x when hypotenuse = 13 and known shorter side = 5?", "D", ["$\\sqrt{13^2+5^2}$", "$13-5$", "$13^2+5^2$", "$\\sqrt{13^2-5^2}$"], "Subtract the shorter-side square from the hypotenuse square."),
    answer("y8-pyth-short-g4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "", "8.1", "Square root of 65 is approximately 8.1.", ["8.1 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-short-i1", "Find the unknown shorter side in millimetres.", "", "24", "Square root of 625 minus 49 equals 24.", ["24 mm"]),
    answer("y8-pyth-short-i2", "Find the unknown shorter side in metres. Round to 1 decimal place.", "", "9.7", "Square root of 95 is approximately 9.7.", ["9.7 m"]),
    choice("y8-pyth-short-i3", "Which value must be the starting point before subtraction?", "A", ["The hypotenuse squared", "The shorter side squared", "The sum of all sides", "The right-angle value"], "Subtract from the hypotenuse square."),
    answer("y8-pyth-short-i4", "A 13 m ladder leans against a wall. Its base is 5 m from the wall. Find the height reached in metres.", "", "12", "Square root of 169 minus 25 equals 12.", ["12 m"]),
    choice("y8-pyth-short-i5", "Why is square root of 6 squared minus 10 squared not valid when finding a shorter side?", "C", ["Both values must be added", "Six is the hypotenuse", "The hypotenuse square must come first since it is larger", "Square roots are only used for hypotenuses"], "The hypotenuse square must be the value being subtracted from."),
  ],
  commonMistakes: [
    { mistake: "Adding the squares when the unknown is a shorter side.", fix: "Subtract the known shorter-side square from the hypotenuse square." },
    { mistake: "Subtracting the side lengths before squaring.", fix: "Square each value first: c squared minus a squared." },
    { mistake: "Using the shorter side as the hypotenuse in the subtraction.", fix: "Always subtract from the larger, hypotenuse square." },
    { mistake: "Getting a negative under the square root.", fix: "This signals the hypotenuse was not identified correctly. The largest value must be squared first." },
  ],
  masteryQuiz: [
    answer("y8-pyth-short-m1", "Find the unknown shorter side in centimetres.", "", "8", "Square root of 64 equals 8.", ["8 cm"]),
    answer("y8-pyth-short-m2", "Find the unknown shorter side in metres.", "", "15", "Square root of 625 minus 400 equals 15.", ["15 m"]),
    choice("y8-pyth-short-m3", "Which operation is performed immediately before taking the square root when finding a shorter side?", "B", ["Add the squared lengths", "Subtract the squared lengths", "Divide the side lengths", "Round the hypotenuse"], "For an unknown shorter side, subtract the squares."),
    answer("y8-pyth-short-m4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "", "10.7", "Square root of 115 is approximately 10.7.", ["10.7 cm"]),
    answer("y8-pyth-short-m5", "A 15 m ladder stands 9 m from a wall. Find the height reached in metres.", "", "12", "Square root of 225 minus 81 equals 12.", ["12 m"]),
    choice("y8-pyth-short-m6", "The diagram shows a triangle with hypotenuse 17 and one shorter side 8. Which side is unknown?", "C", ["AB", "The hypotenuse", "The side labelled x", "The right angle"], "The unknown shorter side is labelled x.", "\\text{Use the diagram.}", tri("Right-angled triangle: hypotenuse 17, known shorter side 8, unknown shorter side x.", { AB: "17", AC: "8", BC: "x" })),
    answer("y8-pyth-short-m7", "Find the unknown shorter side in metres. Round to 2 decimal places.", "", "14.25", "Square root of 203 is approximately 14.25.", ["14.25 m"]),
    choice("y8-pyth-short-m8", "A student writes square root of 6 squared minus 10 squared for shorter sides 6 and 10. What correction is needed?", "A", ["Use $\\sqrt{10^2-6^2}$", "Use $\\sqrt{10^2+6^2}$", "Use $10-6$", "Use $6^2+10^2$"], "The larger hypotenuse square must come first in the subtraction."),
    answer("y8-pyth-short-m9", "A rectangular park has diagonal 26 m and one side 10 m. Find the other side in metres.", "", "24", "Square root of 676 minus 100 equals 24.", ["24 m"]),
    answer("y8-pyth-short-m10", "A support wire is 9.5 m long and reaches 3.2 m horizontally from a pole. Find the pole height in metres. Round to 1 decimal place.", "", "8.9", "Square root of 90.25 minus 10.24 equals square root of 80.01 which is approximately 8.9.", ["8.9 m"]),
  ],
  masteryQuizPool: [
    poolAnswer("y8-pyth-short-p1", "Find the unknown shorter side in centimetres.", "", "4", "Square root of 25 minus 9 equals 4.", 1, ["4 cm"]),
    poolAnswer("y8-pyth-short-p2", "Find the unknown shorter side in metres.", "", "12", "Square root of 169 minus 25 equals 12.", 1, ["12 m"]),
    poolAnswer("y8-pyth-short-p3", "Find the unknown shorter side in centimetres.", "", "6", "Square root of 100 minus 64 equals 6.", 1, ["6 cm"]),
    poolAnswer("y8-pyth-short-p4", "Find the unknown shorter side in metres.", "", "8", "Square root of 289 minus 225 equals 8.", 1, ["8 m"]),
    poolChoice("y8-pyth-short-p5", "Which setup finds an unknown shorter side when the hypotenuse is 25 and a shorter side is 7?", "D", ["$\\sqrt{25^2+7^2}$", "$25-7$", "$25^2-7^2$", "$\\sqrt{25^2-7^2}$"], "Subtract the shorter-side square from the hypotenuse square, then take the square root.", 1),
    poolAnswer("y8-pyth-short-p6", "Find the unknown shorter side in millimetres.", "", "7", "Square root of 625 minus 576 equals 7.", 2, ["7 mm"]),
    poolAnswer("y8-pyth-short-p7", "Find the unknown shorter side in metres.", "", "24", "Square root of 676 minus 100 equals 24.", 2, ["24 m"]),
    poolAnswer("y8-pyth-short-p8", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "", "8.1", "Square root of 81 minus 16 equals square root of 65 which is about 8.1.", 2, ["8.1 cm"]),
    poolAnswer("y8-pyth-short-p9", "Find the unknown shorter side in metres. Round to 1 decimal place.", "", "10.9", "Square root of 144 minus 25 equals square root of 119 which is about 10.9.", 2, ["10.9 m"]),
    poolChoice("y8-pyth-short-p10", "Before taking the square root for an unknown shorter side, which value must be the starting point?", "A", ["The hypotenuse squared", "The shorter side squared", "The sum of squares", "The perimeter"], "Subtract from the hypotenuse square, which is the largest value.", 2),
    poolAnswer("y8-pyth-short-p11", "A 17 m ladder stands 8 m from a wall. Find the height reached in metres.", "", "15", "Square root of 289 minus 64 equals 15.", 2, ["15 m"]),
    poolAnswer("y8-pyth-short-p12", "A 25 m ladder stands 7 m from a wall. Find the height reached in metres.", "", "24", "Square root of 625 minus 49 equals 24.", 3, ["24 m"]),
    poolAnswer("y8-pyth-short-p13", "A rectangular gate has diagonal 15 m and one side 9 m. Find the other side in metres.", "", "12", "Square root of 225 minus 81 equals 12.", 3, ["12 m"]),
    poolAnswer("y8-pyth-short-p14", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "", "12.6", "Square root of 196 minus 36 equals square root of 160 which is about 12.6.", 3, ["12.6 cm"]),
    poolChoice("y8-pyth-short-p15", "Why is square root of 6 squared minus 10 squared invalid for an unknown shorter side?", "C", ["Squares cannot be subtracted", "6 is the hypotenuse", "The hypotenuse square (100) must come first because it is larger", "Square roots only find hypotenuses"], "The larger hypotenuse square must be the value subtracted from.", 3),
    poolAnswer("y8-pyth-short-p16", "Find the unknown shorter side in metres.", "", "40", "Square root of 1681 minus 81 equals 40.", 3, ["40 m"]),
    poolAnswer("y8-pyth-short-p17", "A 6.5 m ramp covers 6 m horizontally. Find the rise in metres.", "", "2.5", "Square root of 42.25 minus 36 equals square root of 6.25 which is 2.5.", 4, ["2.5 m"]),
    poolAnswer("y8-pyth-short-p18", "A rectangular park has diagonal 26 m and length 24 m. Find the width in metres.", "", "10", "Square root of 676 minus 576 equals 10.", 4, ["10 m"]),
    poolAnswer("y8-pyth-short-p19", "Find the unknown shorter side in metres. Round to 2 decimal places.", "", "14.25", "Square root of 324 minus 121 equals square root of 203 which is about 14.25.", 4, ["14.25 m"]),
    poolAnswer("y8-pyth-short-p20", "A 13 m guy wire reaches a point 12 m up a pole. Find its horizontal distance from the base in metres.", "", "5", "Square root of 169 minus 144 equals 5.", 4, ["5 m"]),
    poolChoice("y8-pyth-short-p21", "A shorter side comes out as the square root of a negative number. What does this mean?", "B", ["The triangle is valid", "The hypotenuse was identified incorrectly", "The answer is negative", "The sides must be doubled"], "A negative under the root means the wrong side was treated as the hypotenuse.", 4),
    poolAnswer("y8-pyth-short-p22", "A support cable 2.5 m long is fixed 1.5 m horizontally from a post. Find the height in metres.", "", "2", "Square root of 6.25 minus 2.25 equals square root of 4 which is 2.", 5, ["2 m", "2.0 m"]),
    poolAnswer("y8-pyth-short-p23", "A rectangular screen has diagonal 50 cm and height 30 cm. Find its width in centimetres.", "", "40", "Square root of 2500 minus 900 equals 40.", 5, ["40 cm"]),
    poolAnswer("y8-pyth-short-p24", "Find the unknown shorter side in metres. Round to 1 decimal place.", "", "15.2", "Square root of 400 minus 169 equals square root of 231 which is about 15.2.", 5, ["15.2 m"]),
    poolAnswer("y8-pyth-short-p25", "A 61 cm diagonal brace crosses a panel 60 cm wide. Find the panel height in centimetres.", "", "11", "Square root of 3721 minus 3600 equals square root of 121 which is 11.", 5, ["11 cm"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-short-mp1",
      prompt:
        "A 25 m fire-truck ladder is extended to a window. The foot of the ladder is 7 m from the base of the wall. A second ladder, 13 m long, has its foot 5 m from the wall.",
      latex: "\\text{Ladder 1: }25\\text{ m, base }7\\text{ m.}\\quad \\text{Ladder 2: }13\\text{ m, base }5\\text{ m.}",
      answer: "24",
      hint: "Each ladder is a hypotenuse. The wall height is an unknown shorter side: subtract the base-distance square from the ladder-length square, then take the square root.",
      explanation:
        "Part (a): square root of 25 squared minus 7 squared equals square root of 625 minus 49 equals square root of 576 equals 24 m. Part (b): square root of 13 squared minus 5 squared equals square root of 169 minus 25 equals square root of 144 equals 12 m. Part (c): 24 minus 12 equals 12 m higher.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the height up the wall reached by the 25 m ladder, in metres.",
          latex: "",
          marks: 2,
          answer: "24",
          acceptedAnswers: ["24 m"],
          hint: "Subtract 7 squared from 25 squared, then take the square root.",
          explanation: "Square root of 625 minus 49 equals square root of 576 equals 24 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the height up the wall reached by the 13 m ladder, in metres.",
          latex: "",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12 m"],
          hint: "Subtract 5 squared from 13 squared, then take the square root.",
          explanation: "Square root of 169 minus 25 equals square root of 144 equals 12 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How much higher, in metres, does the 25 m ladder reach than the 13 m ladder?",
          latex: "",
          marks: 1,
          answer: "12",
          acceptedAnswers: ["12 m"],
          hint: "Subtract the smaller height from the larger.",
          explanation: "24 minus 12 equals 12 m.",
        },
      ],
    },
  ],
};

// ── Lesson 4: Pythagoras in real contexts ─────────────────────────────────────

const realContexts: LessonContent = {
  description:
    "Apply Pythagoras' theorem to word problems involving ladders, rectangles, ramps and paths by identifying the right-angled triangle and choosing the correct setup.",
  learningIntention:
    "Translate a worded context into a right-angled triangle and apply the correct form of Pythagoras' theorem.",
  successCriteria: [
    "Sketch or identify the right triangle inside a context.",
    "Decide whether the unknown is the hypotenuse or a shorter side.",
    "Use addition or subtraction of squares accordingly.",
    "Include units and round only when required.",
  ],
  teaching: {
    paragraphs: [
      "Many real situations hide a right-angled triangle: a ladder against a wall, the diagonal of a rectangle, a ramp from floor to platform, or a direct path between two points.",
      "Start every problem by drawing a rough sketch. Label the right angle and any known lengths. Decide: is the unknown the hypotenuse, or is the hypotenuse already known?",
      "If the unknown is opposite the right angle, add the squares and take the square root. If the hypotenuse is known and a shorter side is missing, subtract squares and take the square root.",
      "The hard part of a worded Pythagoras problem is not the arithmetic — it is spotting the right angle hiding in the situation. Walls meet floors at 90°, the sides of a rectangle meet at 90°, and 'due east then due north' turns through 90°. Wherever two directions are perpendicular, the straight-line distance between the far ends is a hypotenuse, and Pythagoras applies.",
      "Once the triangle is sketched and labelled, the whole decision reduces to one question: is the unknown the longest side (opposite the right angle) or not? Longest unknown → add the squares; a shorter unknown with the hypotenuse known → subtract. Marking the right angle on your sketch makes that choice obvious and stops the classic error of subtracting when you should add.",
    ],
    latexBlocks: [
      "\\text{unknown hypotenuse: }c = \\sqrt{a^2+b^2}",
      "\\text{unknown shorter side: }b = \\sqrt{c^2-a^2}",
    ],
  },
  workedExamples: [
    {
      title: "Rectangle diagonal",
      questionLatex: "\\text{A rectangle is }6\\text{ m by }8\\text{ m. Find its diagonal.}",
      steps: [
        { explanation: "The diagonal cuts the rectangle into two right-angled triangles. The diagonal is the hypotenuse.", latex: "d = \\sqrt{6^2+8^2}" },
        { explanation: "Evaluate.", latex: "d = \\sqrt{36+64} = \\sqrt{100} = 10" },
      ],
      finalAnswerLatex: "10\\text{ m}",
    } as WorkedExample,
    {
      title: "Ladder against a wall",
      questionLatex: "\\text{A }10\\text{ m ladder reaches a wall. Its base is }6\\text{ m from the wall. How high does it reach?}",
      steps: [
        { explanation: "The ladder is the hypotenuse. The wall height is the unknown shorter side.", latex: "h = \\sqrt{10^2-6^2}" },
        { explanation: "Subtract then take the square root.", latex: "h = \\sqrt{100-36} = \\sqrt{64} = 8" },
      ],
      finalAnswerLatex: "8\\text{ m}",
    } as WorkedExample,
    {
      title: "Ramp rise",
      questionLatex: "\\text{A ramp is }6.5\\text{ m long and covers }6\\text{ m horizontally. Find the rise, rounded to 1 decimal place.}",
      steps: [
        { explanation: "The ramp is the hypotenuse; the rise is an unknown shorter side.", latex: "r = \\sqrt{6.5^2-6^2} = \\sqrt{42.25-36}" },
        { explanation: "Evaluate.", latex: "r = \\sqrt{6.25} = 2.5" },
      ],
      finalAnswerLatex: "2.5\\text{ m}",
    } as WorkedExample,
    {
      title: "Navigation: distance from the start",
      questionLatex: "\\text{A ship sails }9\\text{ km east, then }12\\text{ km north. How far is it from its start?}",
      steps: [
        { explanation: "East then north turn through a right angle, so the direct distance back is the hypotenuse.", latex: "d = \\sqrt{9^2 + 12^2}" },
        { explanation: "Add the squares and take the root (a 9-12-15 triple).", latex: "d = \\sqrt{81+144} = \\sqrt{225} = 15" },
      ],
      finalAnswerLatex: "15\\text{ km}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-ctx-g1", "A rectangle is 9 m by 12 m. Find its diagonal in metres.", "", "15", "Square root of 81 plus 144 equals 15.", ["15 m"]),
    choice("y8-pyth-ctx-g2", "A ladder leans against a wall forming a right triangle. Which length is the hypotenuse?", "B", ["The wall height", "The ladder length", "The ground distance", "The right-angle size"], "The ladder runs from ground to wall opposite the right angle."),
    answer("y8-pyth-ctx-g3", "A 5 m rope is tied from the top of a pole to the ground 3 m from the base. Find the pole height in metres.", "", "4", "Square root of 25 minus 9 equals 4.", ["4 m"]),
    choice("y8-pyth-ctx-g4", "Which setup gives the diagonal of an 8 cm by 15 cm rectangle?", "C", ["$\\sqrt{15^2-8^2}$", "$8+15$", "$\\sqrt{8^2+15^2}$", "$15-8$"], "A diagonal is a hypotenuse, so add the squares."),
  ],
  independentPractice: [
    answer("y8-pyth-ctx-i1", "A square has side length 5 cm. Find its diagonal in centimetres. Round to 1 decimal place.", "", "7.1", "Square root of 50 is approximately 7.1.", ["7.1 cm"]),
    answer("y8-pyth-ctx-i2", "A 17 m ladder stands 8 m from a wall. Find the height it reaches in metres.", "", "15", "Square root of 289 minus 64 equals 15.", ["15 m"]),
    choice("y8-pyth-ctx-i3", "A context gives a known hypotenuse and asks for a shorter side. Which operation is used?", "D", ["Add lengths", "Multiply lengths", "Add squares then take the square root", "Subtract the shorter-side square from the hypotenuse square"], "An unknown shorter side uses subtraction."),
    answer("y8-pyth-ctx-i4", "Find the distance between points (0, 0) and (5, 12) in units.", "", "13", "Square root of 25 plus 144 equals 13.", ["13 units"]),
    answer("y8-pyth-ctx-i5", "A garden path goes 7 m east and 24 m north. Find the direct distance in metres.", "", "25", "Square root of 49 plus 576 equals 25.", ["25 m"]),
  ],
  commonMistakes: [
    { mistake: "Using all numbers without identifying their roles.", fix: "Sketch the right triangle first, then label each side as hypotenuse or shorter side." },
    { mistake: "Adding squares when the hypotenuse is already known.", fix: "If the hypotenuse is given, subtract the known shorter-side square from it." },
    { mistake: "Forgetting to include units.", fix: "Return to the problem context and attach the correct unit to the answer." },
    { mistake: "Treating a diagonal as a shorter side.", fix: "A diagonal of a rectangle is the hypotenuse of the right triangle it creates." },
  ],
  masteryQuiz: [
    answer("y8-pyth-ctx-m1", "A rectangle is 5 m by 12 m. Find its diagonal in metres.", "", "13", "Square root of 25 plus 144 equals 13.", ["13 m"]),
    answer("y8-pyth-ctx-m2", "A 10 m rope stretches from the top of a 6 m pole straight to the ground. How far from the base does it reach?", "", "8", "Square root of 100 minus 36 equals 8.", ["8 m"]),
    choice("y8-pyth-ctx-m3", "Which word in a rectangle problem signals a hypotenuse?", "A", ["Diagonal", "Perimeter", "Area", "Width"], "A rectangle diagonal spans a right triangle."),
    answer("y8-pyth-ctx-m4", "A square has side 9 m. Find its diagonal in metres. Round to 1 decimal place.", "", "12.7", "Square root of 162 is approximately 12.7.", ["12.7 m"]),
    answer("y8-pyth-ctx-m5", "A television is 40 cm wide and 30 cm high. Find its diagonal in centimetres.", "", "50", "Square root of 1600 plus 900 equals 50.", ["50 cm"]),
    choice("y8-pyth-ctx-m6", "A ramp and its horizontal distance are known. Which is the hypotenuse?", "B", ["The horizontal distance", "The ramp", "The rise", "The right angle"], "The sloping ramp is opposite the right angle."),
    answer("y8-pyth-ctx-m7", "A path goes 20 m east and 21 m north. Find the direct distance home in metres.", "", "29", "Square root of 400 plus 441 equals 29.", ["29 m"]),
    choice("y8-pyth-ctx-m8", "A student adds the ladder length and wall height to find the ground distance. What is wrong?", "C", ["Area was used instead", "The answer should be in cm", "The correct method subtracts the shorter-side square from the hypotenuse square", "The ladder is not the hypotenuse"], "The ladder is the hypotenuse; subtract the wall-height square."),
    answer("y8-pyth-ctx-m9", "A support cable 14 m long connects to a point 11 m horizontally from a pole. Find the height in metres. Round to 1 decimal place.", "", "8.7", "Square root of 196 minus 121 equals square root of 75 which is approximately 8.7.", ["8.7 m"]),
    answer("y8-pyth-ctx-m10", "A rectangular window has diagonal 25 cm and width 7 cm. Find its height in centimetres.", "", "24", "Square root of 625 minus 49 equals 24.", ["24 cm"]),
  ],
  masteryQuizPool: [
    poolAnswer("y8-pyth-ctx-p1", "A rectangle is 3 m by 4 m. Find its diagonal in metres.", "", "5", "Square root of 9 plus 16 equals 5.", 1, ["5 m"]),
    poolAnswer("y8-pyth-ctx-p2", "A 5 m ladder rests with its base 3 m from a wall. Find the height reached in metres.", "", "4", "Square root of 25 minus 9 equals 4.", 1, ["4 m"]),
    poolChoice("y8-pyth-ctx-p3", "In a ladder-against-wall problem, which length is the hypotenuse?", "B", ["The wall height", "The ladder", "The ground distance", "The right angle"], "The sloping ladder is opposite the right angle, so it is the hypotenuse.", 1),
    poolAnswer("y8-pyth-ctx-p4", "A rectangle is 6 m by 8 m. Find its diagonal in metres.", "", "10", "Square root of 36 plus 64 equals 10.", 1, ["10 m"]),
    poolAnswer("y8-pyth-ctx-p5", "A path goes 3 km east then 4 km north. Find the direct distance in kilometres.", "", "5", "Square root of 9 plus 16 equals 5.", 1, ["5 km"]),
    poolAnswer("y8-pyth-ctx-p6", "A television screen is 16 cm wide and 12 cm high. Find its diagonal in centimetres.", "", "20", "Square root of 256 plus 144 equals 20.", 2, ["20 cm"]),
    poolChoice("y8-pyth-ctx-p7", "Which word in a rectangle problem signals you need the hypotenuse?", "A", ["Diagonal", "Perimeter", "Area", "Side"], "A diagonal spans a right triangle, acting as the hypotenuse.", 2),
    poolAnswer("y8-pyth-ctx-p8", "A 10 m rope runs from the top of a 6 m pole to the ground. How far from the base does it reach, in metres?", "", "8", "Square root of 100 minus 36 equals 8.", 2, ["8 m"]),
    poolAnswer("y8-pyth-ctx-p9", "A square has side 5 cm. Find its diagonal in centimetres. Round to 1 decimal place.", "", "7.1", "Square root of 50 is about 7.1.", 2, ["7.1 cm"]),
    poolAnswer("y8-pyth-ctx-p10", "A garden path goes 9 m east and 12 m north. Find the direct distance in metres.", "", "15", "Square root of 81 plus 144 equals 15.", 2, ["15 m"]),
    poolChoice("y8-pyth-ctx-p11", "A context gives a known hypotenuse and asks for a shorter side. Which operation is used?", "D", ["Add the squares", "Multiply the lengths", "Add the lengths", "Subtract the known shorter-side square from the hypotenuse square"], "An unknown shorter side uses subtraction of squares.", 2),
    poolAnswer("y8-pyth-ctx-p12", "Find the distance between the points (0, 0) and (8, 15) in units.", "", "17", "Square root of 64 plus 225 equals 17.", 3, ["17 units"]),
    poolAnswer("y8-pyth-ctx-p13", "A 17 m ladder stands 8 m from a wall. Find the height it reaches in metres.", "", "15", "Square root of 289 minus 64 equals 15.", 3, ["15 m"]),
    poolAnswer("y8-pyth-ctx-p14", "A square has side 9 m. Find its diagonal in metres. Round to 1 decimal place.", "", "12.7", "Square root of 162 is about 12.7.", 3, ["12.7 m"]),
    poolChoice("y8-pyth-ctx-p15", "A student adds the ladder length and wall height to find the ground distance. What is the error?", "C", ["Area was used", "The answer needs cm", "The ladder is the hypotenuse, so subtract the wall-height square from the ladder square", "The ladder is a shorter side"], "The ladder is the hypotenuse; subtract the known wall-height square.", 3),
    poolAnswer("y8-pyth-ctx-p16", "A rectangular paddock is 20 m by 21 m. Find the diagonal in metres.", "", "29", "Square root of 400 plus 441 equals 29.", 3, ["29 m"]),
    poolAnswer("y8-pyth-ctx-p17", "A ramp is 6.5 m long and covers 6 m horizontally. Find the rise in metres.", "", "2.5", "Square root of 42.25 minus 36 equals square root of 6.25 which is 2.5.", 4, ["2.5 m"]),
    poolAnswer("y8-pyth-ctx-p18", "A boat sails 24 km east then 7 km north. Find its direct distance from the start in kilometres.", "", "25", "Square root of 576 plus 49 equals 25.", 4, ["25 km"]),
    poolAnswer("y8-pyth-ctx-p19", "A rectangular room is 4.0 m by 3.0 m. Find the diagonal distance across the floor in metres.", "", "5", "Square root of 16 plus 9 equals 5.", 4, ["5 m", "5.0 m"]),
    poolAnswer("y8-pyth-ctx-p20", "A support cable 14 m long connects to a point 11 m horizontally from a pole. Find the height in metres. Round to 1 decimal place.", "", "8.7", "Square root of 196 minus 121 equals square root of 75 which is about 8.7.", 4, ["8.7 m"]),
    poolChoice("y8-pyth-ctx-p21", "Two ships leave a port. One sails 8 km north, the other 6 km east. Which calculation gives the distance between them?", "A", ["$\\sqrt{8^2+6^2}$", "$8+6$", "$\\sqrt{8^2-6^2}$", "$8\\times 6$"], "The two paths are at right angles, so the distance is the hypotenuse: square root of 64 plus 36 equals 10 km.", 4),
    poolAnswer("y8-pyth-ctx-p22", "A 2.6 m plank leans against a step, with its base 1.0 m out. Find the height it reaches in metres. Round to 1 decimal place.", "", "2.4", "Square root of 6.76 minus 1 equals square root of 5.76 which is 2.4.", 5, ["2.4 m"]),
    poolAnswer("y8-pyth-ctx-p23", "A rectangular pool is 12 m by 35 m. Find the diagonal in metres.", "", "37", "Square root of 144 plus 1225 equals square root of 1369 which is 37.", 5, ["37 m"]),
    poolAnswer("y8-pyth-ctx-p24", "A walker goes 1.2 km east, then 0.9 km north, then stops. Find the straight-line distance back to the start in kilometres.", "", "1.5", "Square root of 1.44 plus 0.81 equals square root of 2.25 which is 1.5.", 5, ["1.5 km"]),
    poolAnswer("y8-pyth-ctx-p25", "A rectangular box has a base 9 cm by 12 cm. A diagonal is drawn across the base. Find its length in centimetres.", "", "15", "Square root of 81 plus 144 equals 15.", 5, ["15 cm"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-ctx-mp1",
      prompt:
        "A rectangular sports field is 40 m long and 30 m wide. A player runs along two sides from one corner to the opposite corner, while a second player runs straight across the diagonal.",
      latex: "\\text{Field: }40\\text{ m}\\times 30\\text{ m.}",
      answer: "50",
      hint: "The diagonal is the hypotenuse of a right triangle whose shorter sides are the length and width. The two-side route is length plus width.",
      explanation:
        "Part (a): diagonal equals square root of 40 squared plus 30 squared equals square root of 1600 plus 900 equals square root of 2500 equals 50 m. Part (b): along two sides is 40 plus 30 equals 70 m. Part (c): 70 minus 50 equals 20 m shorter by going diagonally.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the length of the diagonal across the field, in metres.",
          latex: "",
          marks: 2,
          answer: "50",
          acceptedAnswers: ["50 m"],
          hint: "Add the squares of 40 and 30, then take the square root.",
          explanation: "Square root of 1600 plus 900 equals square root of 2500 equals 50 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the distance run by the first player along the two sides, in metres.",
          latex: "",
          marks: 1,
          answer: "70",
          acceptedAnswers: ["70 m"],
          hint: "Add the length and the width.",
          explanation: "40 plus 30 equals 70 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many metres shorter is the diagonal route than the two-side route?",
          latex: "",
          marks: 1,
          answer: "20",
          acceptedAnswers: ["20 m"],
          hint: "Subtract the diagonal distance from the two-side distance.",
          explanation: "70 minus 50 equals 20 m.",
        },
      ],
    },
  ],
};

// ── Lesson 5: Pythagorean triples ─────────────────────────────────────────────

const pythagoreanTriples: LessonContent = {
  description:
    "Recognise common Pythagorean triples and their multiples to find exact side lengths without a calculator.",
  learningIntention:
    "Identify Pythagorean triples and use multiples of triples to find exact answers.",
  successCriteria: [
    "State the four common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    "Recognise scaled multiples such as 6-8-10 as a multiple of 3-4-5.",
    "Find a missing side from a triple or its multiple without a calculator.",
    "Verify a given set of numbers is a Pythagorean triple.",
  ],
  teaching: {
    paragraphs: [
      "A Pythagorean triple is a set of three whole numbers that satisfies Pythagoras' theorem exactly. The four most common families are 3-4-5, 5-12-13, 8-15-17 and 7-24-25.",
      "Multiplying all three numbers in a triple by the same value creates a new triple. For example, 3-4-5 multiplied by 2 gives 6-8-10; multiplied by 3 gives 9-12-15.",
      "Recognising a triple means you can write the exact answer as a whole number without using a calculator.",
      "Why does multiplying a triple by a constant give another triple? If a² + b² = c², multiply every side by k: (ka)² + (kb)² = k²(a² + b²) = k²c² = (kc)². The k² factors out of every term, so the equation still balances. That is why 3-4-5 scales to 6-8-10, 9-12-15, 12-16-20, … — the same triangle shape, just enlarged.",
      "Triples are worth memorising because they let you skip the calculator: if the two given sides are a multiple of a known triple, the third side is that same multiple of the triple's third number. Always check that the largest number is the hypotenuse — in 8-15-17 the 17 sits opposite the right angle.",
    ],
    latexBlocks: [
      "3\\text{-}4\\text{-}5,\\quad 5\\text{-}12\\text{-}13,\\quad 8\\text{-}15\\text{-}17,\\quad 7\\text{-}24\\text{-}25",
      "\\text{Multiple: } (3k)^2+(4k)^2=(5k)^2 \\text{ for any }k",
    ],
  },
  workedExamples: [
    {
      title: "Recognise the 3-4-5 family",
      questionLatex: "\\text{A right triangle has shorter sides }9\\text{ cm and }12\\text{ cm. Find the hypotenuse without a calculator.}",
      steps: [
        { explanation: "Check whether 9 and 12 are multiples of a known triple.", latex: "9 = 3 \\times 3,\\quad 12 = 4 \\times 3" },
        { explanation: "The scale factor is 3, so the hypotenuse is 5 times 3.", latex: "c = 5 \\times 3 = 15" },
      ],
      finalAnswerLatex: "15\\text{ cm}",
    } as WorkedExample,
    {
      title: "Identify a 5-12-13 triple",
      questionLatex: "\\text{Show that }5,\\,12,\\,13\\text{ is a Pythagorean triple.}",
      steps: [
        { explanation: "Square the shorter sides and add.", latex: "5^2+12^2 = 25+144 = 169" },
        { explanation: "Square the longest side.", latex: "13^2 = 169" },
        { explanation: "Both sides equal 169.", latex: "169 = 169\\checkmark" },
      ],
      finalAnswerLatex: "\\text{5, 12, 13 is a Pythagorean triple.}",
    } as WorkedExample,
    {
      title: "Scale the 8-15-17 triple",
      questionLatex: "\\text{A right triangle has shorter sides }16\\text{ m and }30\\text{ m. Find the hypotenuse.}",
      steps: [
        { explanation: "Check: 16 = 8 × 2 and 30 = 15 × 2, so the scale factor is 2.", latex: "16 = 8 \\times 2,\\quad 30 = 15 \\times 2" },
        { explanation: "Multiply the third number in the triple by the scale factor.", latex: "c = 17 \\times 2 = 34" },
      ],
      finalAnswerLatex: "34\\text{ m}",
    } as WorkedExample,
    {
      title: "Test whether three numbers form a triple",
      questionLatex: "\\text{Is }9,\\;40,\\;41\\text{ a Pythagorean triple?}",
      steps: [
        { explanation: "Square the two smaller numbers and add; compare with the largest squared.", latex: "9^2 + 40^2 = 81 + 1600 = 1681" },
        { explanation: "Check against the largest side squared.", latex: "41^2 = 1681 \\Rightarrow \\text{equal, so yes}" },
      ],
      finalAnswerLatex: "\\text{Yes — }9\\text{-}40\\text{-}41\\text{ is a triple}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-trip-g1", "A right triangle has shorter sides 6 cm and 8 cm. State the hypotenuse using a triple.", "", "10", "This is a 3-4-5 triple scaled by 2, so the hypotenuse is 10.", ["10 cm"]),
    choice("y8-pyth-trip-g2", "Which set is a Pythagorean triple?", "C", ["3, 4, 6", "6, 7, 9", "7, 24, 25", "5, 9, 12"], "7 squared plus 24 squared equals 49 plus 576 equals 625 equals 25 squared."),
    answer("y8-pyth-trip-g3", "A right triangle has shorter sides 15 m and 20 m. Find the hypotenuse using a triple.", "", "25", "This is a 3-4-5 triple scaled by 5, so the hypotenuse is 25.", ["25 m"]),
    answer("y8-pyth-trip-g4", "The hypotenuse is 26 cm and one shorter side is 10 cm. Name the triple family and find the missing side.", "", "24", "10 and 26 are from the 5-12-13 family scaled by 2. The missing side is 12 times 2 equals 24.", ["24 cm"]),
  ],
  independentPractice: [
    answer("y8-pyth-trip-i1", "A right triangle has shorter sides 20 km and 21 km. State the hypotenuse.", "", "29", "20-21-29 is a Pythagorean triple.", ["29 km"]),
    choice("y8-pyth-trip-i2", "Which pair of shorter sides belongs to the 3-4-5 family?", "B", ["9 and 16", "12 and 16", "6 and 9", "10 and 15"], "12 and 16 are multiples of 3 and 4 scaled by 4, giving hypotenuse 20."),
    answer("y8-pyth-trip-i3", "A right triangle has shorter sides 24 m and 32 m. Find the hypotenuse using a triple.", "", "40", "This is 3-4-5 scaled by 8.", ["40 m"]),
    answer("y8-pyth-trip-i4", "The hypotenuse is 51 m and one shorter side is 24 m. Find the missing side.", "", "45", "51 and 24 are from the 8-15-17 family scaled by 3. The missing side is 15 times 3 equals 45.", ["45 m"]),
    choice("y8-pyth-trip-i5", "Why is 6-8-12 not a Pythagorean triple?", "A", ["6 squared plus 8 squared is 100 but 12 squared is 144", "12 is too large to be used", "The numbers must be under 10", "All three must be odd"], "100 does not equal 144, so the theorem fails."),
  ],
  commonMistakes: [
    { mistake: "Assuming any three whole numbers form a triple.", fix: "Verify by checking a squared plus b squared equals c squared before using the triple." },
    { mistake: "Using the triple without checking the scale factor.", fix: "Find what each member of the triple was multiplied by before using the third value." },
    { mistake: "Mixing up which number in the triple is the hypotenuse.", fix: "In a triple a-b-c, the largest number c is always the hypotenuse." },
    { mistake: "Thinking only 3-4-5 exists.", fix: "Learn all four families: 3-4-5, 5-12-13, 8-15-17, 7-24-25." },
  ],
  masteryQuiz: [
    answer("y8-pyth-trip-m1", "A right triangle has shorter sides 9 cm and 40 cm. State the hypotenuse.", "", "41", "9-40-41 is a Pythagorean triple.", ["41 cm"]),
    choice("y8-pyth-trip-m2", "Which is a multiple of the 5-12-13 triple?", "B", ["10-22-26", "10-24-26", "15-35-39", "20-48-53"], "10-24-26 is 5-12-13 scaled by 2."),
    answer("y8-pyth-trip-m3", "A right triangle has shorter sides 21 cm and 28 cm. Find the hypotenuse.", "", "35", "This is 3-4-5 scaled by 7.", ["35 cm"]),
    choice("y8-pyth-trip-m4", "Which set is NOT a Pythagorean triple?", "D", ["3, 4, 5", "5, 12, 13", "8, 15, 17", "6, 8, 11"], "6 squared plus 8 squared equals 100 but 11 squared equals 121."),
    answer("y8-pyth-trip-m5", "The hypotenuse is 65 m and one shorter side is 25 m. Find the other shorter side.", "", "60", "5-12-13 scaled by 5 gives 25-60-65.", ["60 m"]),
    answer("y8-pyth-trip-m6", "Do sides 11, 60, 61 form a Pythagorean triple? Enter yes or no.", "", "yes", "121 plus 3600 equals 3721 which equals 61 squared.", ["Yes", "YES"]),
    choice("y8-pyth-trip-m7", "A right triangle has shorter sides 16 and 12. Which triple family does this belong to?", "A", ["3-4-5 scaled by 4", "5-12-13 scaled by 2", "8-15-17 scaled by 2", "7-24-25 scaled by 2"], "12 and 16 are 3 and 4 scaled by 4."),
    answer("y8-pyth-trip-m8", "Find the hypotenuse for shorter sides 16 m and 12 m.", "", "20", "3-4-5 scaled by 4 gives hypotenuse 20.", ["20 m"]),
    answer("y8-pyth-trip-m9", "A right triangle has hypotenuse 34 and one shorter side 16. Find the other shorter side.", "", "30", "8-15-17 scaled by 2 gives 16-30-34.", ["30 m", "30"]),
    choice("y8-pyth-trip-m10", "Why can Pythagorean triples be used to give exact answers?", "C", ["They always produce decimals", "They follow a different theorem", "The three values satisfy the theorem exactly as whole numbers", "They only work with metric units"], "Whole-number triples produce exact integer answers without rounding."),
  ],
  masteryQuizPool: [
    poolAnswer("y8-pyth-trip-p1", "A right triangle has shorter sides 3 cm and 4 cm. State the hypotenuse.", "", "5", "3-4-5 is the basic triple.", 1, ["5 cm"]),
    poolAnswer("y8-pyth-trip-p2", "A right triangle has shorter sides 5 m and 12 m. State the hypotenuse.", "", "13", "5-12-13 is a Pythagorean triple.", 1, ["13 m"]),
    poolAnswer("y8-pyth-trip-p3", "A right triangle has shorter sides 8 cm and 15 cm. State the hypotenuse.", "", "17", "8-15-17 is a Pythagorean triple.", 1, ["17 cm"]),
    poolAnswer("y8-pyth-trip-p4", "A right triangle has shorter sides 7 m and 24 m. State the hypotenuse.", "", "25", "7-24-25 is a Pythagorean triple.", 1, ["25 m"]),
    poolChoice("y8-pyth-trip-p5", "Which set is a Pythagorean triple?", "C", ["3, 4, 6", "6, 7, 9", "7, 24, 25", "5, 9, 12"], "7 squared plus 24 squared equals 625 equals 25 squared.", 1),
    poolAnswer("y8-pyth-trip-p6", "A right triangle has shorter sides 6 cm and 8 cm. State the hypotenuse.", "", "10", "This is 3-4-5 scaled by 2.", 2, ["10 cm"]),
    poolAnswer("y8-pyth-trip-p7", "A right triangle has shorter sides 9 m and 12 m. State the hypotenuse.", "", "15", "This is 3-4-5 scaled by 3.", 2, ["15 m"]),
    poolAnswer("y8-pyth-trip-p8", "A right triangle has shorter sides 10 cm and 24 cm. State the hypotenuse.", "", "26", "This is 5-12-13 scaled by 2.", 2, ["26 cm"]),
    poolChoice("y8-pyth-trip-p9", "Which is a multiple of the 3-4-5 triple?", "B", ["9-15-18", "12-16-20", "6-9-12", "10-15-20"], "12-16-20 is 3-4-5 scaled by 4.", 2),
    poolAnswer("y8-pyth-trip-p10", "Do sides 9, 40, 41 form a Pythagorean triple? Enter yes or no.", "", "yes", "81 plus 1600 equals 1681, which is 41 squared.", 2, ["Yes", "YES"]),
    poolChoice("y8-pyth-trip-p11", "Which set is NOT a Pythagorean triple?", "D", ["3, 4, 5", "5, 12, 13", "8, 15, 17", "6, 8, 11"], "6 squared plus 8 squared equals 100, but 11 squared equals 121.", 2),
    poolAnswer("y8-pyth-trip-p12", "A right triangle has shorter sides 15 m and 20 m. State the hypotenuse.", "", "25", "This is 3-4-5 scaled by 5.", 3, ["25 m"]),
    poolAnswer("y8-pyth-trip-p13", "The hypotenuse is 26 cm and one shorter side is 10 cm. Find the other shorter side.", "", "24", "5-12-13 scaled by 2 gives 10-24-26.", 3, ["24 cm"]),
    poolAnswer("y8-pyth-trip-p14", "A right triangle has shorter sides 16 m and 30 m. State the hypotenuse.", "", "34", "8-15-17 scaled by 2 gives 16-30-34.", 3, ["34 m"]),
    poolChoice("y8-pyth-trip-p15", "Shorter sides 21 and 28 belong to which triple family?", "A", ["3-4-5 scaled by 7", "5-12-13 scaled by 4", "7-24-25 scaled by 3", "8-15-17 scaled by 3"], "21 and 28 are 3 and 4 scaled by 7, giving hypotenuse 35.", 3),
    poolAnswer("y8-pyth-trip-p16", "A right triangle has shorter sides 21 cm and 28 cm. State the hypotenuse.", "", "35", "3-4-5 scaled by 7 gives 21-28-35.", 3, ["35 cm"]),
    poolAnswer("y8-pyth-trip-p17", "The hypotenuse is 51 m and one shorter side is 24 m. Find the other shorter side.", "", "45", "8-15-17 scaled by 3 gives 24-45-51.", 4, ["45 m"]),
    poolAnswer("y8-pyth-trip-p18", "The hypotenuse is 65 m and one shorter side is 25 m. Find the other shorter side.", "", "60", "5-12-13 scaled by 5 gives 25-60-65.", 4, ["60 m"]),
    poolAnswer("y8-pyth-trip-p19", "A right triangle has shorter sides 24 m and 32 m. State the hypotenuse.", "", "40", "3-4-5 scaled by 8 gives 24-32-40.", 4, ["40 m"]),
    poolChoice("y8-pyth-trip-p20", "Why is 6-8-12 not a Pythagorean triple?", "A", ["6 squared plus 8 squared is 100 but 12 squared is 144", "12 is too large", "All values must be odd", "The numbers must be under 10"], "100 does not equal 144, so the theorem fails.", 4),
    poolAnswer("y8-pyth-trip-p21", "Do sides 11, 60, 61 form a Pythagorean triple? Enter yes or no.", "", "yes", "121 plus 3600 equals 3721, which is 61 squared.", 4, ["Yes", "YES"]),
    poolAnswer("y8-pyth-trip-p22", "A right triangle has shorter sides 20 km and 21 km. State the hypotenuse.", "", "29", "20-21-29 is a Pythagorean triple.", 5, ["29 km"]),
    poolChoice("y8-pyth-trip-p23", "Which set is a primitive triple that is NOT a multiple of 3-4-5, 5-12-13, 8-15-17 or 7-24-25?", "B", ["6-8-10", "20-21-29", "10-24-26", "9-12-15"], "20-21-29 is a distinct primitive triple, not a scaled version of the common four.", 5),
    poolAnswer("y8-pyth-trip-p24", "The hypotenuse is 85 cm and one shorter side is 13 cm. The triangle uses the 13-84-85 triple. Find the other shorter side.", "", "84", "13-84-85 is a Pythagorean triple, so the missing side is 84.", 5, ["84 cm"]),
    poolAnswer("y8-pyth-trip-p25", "A right triangle has shorter sides 40 m and 42 m. The hypotenuse is found from the 20-21-29 family scaled by 2. State the hypotenuse.", "", "58", "20-21-29 scaled by 2 gives 40-42-58.", 5, ["58 m"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-trip-mp1",
      prompt:
        "Two triangular sails are cut from cloth using Pythagorean triples so no rounding is needed. Sail A has shorter sides 9 m and 12 m. Sail B has shorter sides 16 m and 30 m.",
      latex: "\\text{Sail A: }9,12.\\quad \\text{Sail B: }16,30.",
      answer: "15",
      hint: "Recognise each pair as a scaled triple: 9-12 is 3-4 times 3; 16-30 is 8-15 times 2. The hypotenuse scales the same way.",
      explanation:
        "Part (a): 9 and 12 are 3 and 4 scaled by 3, so the hypotenuse is 5 times 3 equals 15 m. Part (b): 16 and 30 are 8 and 15 scaled by 2, so the hypotenuse is 17 times 2 equals 34 m. Part (c): 15 plus 34 equals 49 m of edging.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the length of the longest edge (hypotenuse) of sail A, in metres.",
          latex: "",
          marks: 1,
          answer: "15",
          acceptedAnswers: ["15 m"],
          hint: "9 and 12 are 3 and 4 scaled by 3.",
          explanation: "3-4-5 scaled by 3 gives a hypotenuse of 15 m.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the length of the longest edge (hypotenuse) of sail B, in metres.",
          latex: "",
          marks: 2,
          answer: "34",
          acceptedAnswers: ["34 m"],
          hint: "16 and 30 are 8 and 15 scaled by 2.",
          explanation: "8-15-17 scaled by 2 gives a hypotenuse of 34 m.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Edging is sewn along both hypotenuses. Find the total length of edging in metres.",
          latex: "",
          marks: 1,
          answer: "49",
          acceptedAnswers: ["49 m"],
          hint: "Add the two hypotenuse lengths.",
          explanation: "15 plus 34 equals 49 m.",
        },
      ],
    },
  ],
};

// ── Lesson 6: Distance between two points ────────────────────────────────────

const distanceBetweenPoints: LessonContent = {
  description:
    "Use Pythagoras' theorem to find the straight-line distance between two points on the Cartesian plane by treating the horizontal and vertical separations as the shorter sides.",
  learningIntention:
    "Apply Pythagoras' theorem to coordinate geometry to calculate the distance between two points.",
  successCriteria: [
    "Find the horizontal separation (Δx) and vertical separation (Δy) between two points.",
    "Recognise Δx and Δy as the shorter sides of a right-angled triangle.",
    "Apply Pythagoras' theorem to calculate the distance.",
    "Leave the answer exact when possible, or round as instructed.",
  ],
  teaching: {
    paragraphs: [
      "To find the straight-line distance between two points, draw a right-angled triangle by moving horizontally then vertically from one point to the other.",
      "The horizontal change (Δx) and vertical change (Δy) are the two shorter sides. The direct distance between the points is the hypotenuse.",
      "Use Pythagoras' theorem: distance equals the square root of Δx squared plus Δy squared. The sign of the change does not matter because you will square it.",
      "The distance formula is just Pythagoras wearing a coordinate disguise. Moving from one point to the other, the horizontal gap Δx and the vertical gap Δy are the two legs of a right-angled triangle, and the straight line joining the points is its hypotenuse — so d² = Δx² + Δy². There is nothing new beyond 'across, up, hypotenuse.'",
      "Squaring the gaps is also why the order of the points and the signs do not matter: (x₂ − x₁) and (x₁ − x₂) differ only in sign, and squaring erases it. So subtract in whichever order is easier and you still get the same positive distance.",
    ],
    latexBlocks: [
      "\\Delta x = x_2 - x_1,\\qquad \\Delta y = y_2 - y_1",
      "d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}",
    ],
  },
  workedExamples: [
    {
      title: "Distance between grid points",
      questionLatex: "\\text{Find the distance between }A(0,\\,0)\\text{ and }B(3,\\,4).",
      cartesianGraph: coordGraph(
        "Cartesian plane showing segment from A(0,0) to B(3,4).",
        { x: 0, y: 0, label: "A(0, 0)" },
        { x: 3, y: 4, label: "B(3, 4)" },
        { xMin: 0, xMax: 5, yMin: 0, yMax: 5, xStep: 1, yStep: 1 }
      ),
      steps: [
        { explanation: "Find the horizontal and vertical separations.", latex: "\\Delta x = 3,\\quad \\Delta y = 4" },
        { explanation: "Apply Pythagoras' theorem.", latex: "d = \\sqrt{3^2+4^2} = \\sqrt{9+16} = \\sqrt{25} = 5" },
      ],
      finalAnswerLatex: "5\\text{ units}",
    } as WorkedExample,
    {
      title: "Points not starting at the origin",
      questionLatex: "\\text{Find the distance between }P(1,\\,2)\\text{ and }Q(7,\\,10).",
      cartesianGraph: coordGraph(
        "Cartesian plane showing segment from P(1,2) to Q(7,10).",
        { x: 1, y: 2, label: "P(1, 2)" },
        { x: 7, y: 10, label: "Q(7, 10)" },
        { xMin: 0, xMax: 9, yMin: 0, yMax: 11, xStep: 1, yStep: 1 }
      ),
      steps: [
        { explanation: "Subtract coordinates to find the separations.", latex: "\\Delta x = 7-1 = 6,\\quad \\Delta y = 10-2 = 8" },
        { explanation: "Apply Pythagoras.", latex: "d = \\sqrt{6^2+8^2} = \\sqrt{36+64} = \\sqrt{100} = 10" },
      ],
      finalAnswerLatex: "10\\text{ units}",
    } as WorkedExample,
    {
      title: "Round a decimal distance",
      questionLatex: "\\text{Find the distance between }R(0,\\,0)\\text{ and }S(4,\\,6)\\text{. Round to 1 decimal place.}",
      steps: [
        { explanation: "Find the separations.", latex: "\\Delta x = 4,\\quad \\Delta y = 6" },
        { explanation: "Apply Pythagoras and round.", latex: "d = \\sqrt{16+36} = \\sqrt{52} \\approx 7.2" },
      ],
      finalAnswerLatex: "7.2\\text{ units}",
    } as WorkedExample,
    {
      title: "A whole-number distance via a triple",
      questionLatex: "\\text{Find the distance between }(1,\\,2)\\text{ and }(13,\\,7).",
      steps: [
        { explanation: "Find the horizontal and vertical separations.", latex: "\\Delta x = 13-1 = 12,\\quad \\Delta y = 7-2 = 5" },
        { explanation: "Apply Pythagoras — a 5-12-13 triple gives a whole number.", latex: "d = \\sqrt{12^2+5^2} = \\sqrt{144+25} = \\sqrt{169} = 13" },
      ],
      finalAnswerLatex: "13\\text{ units}",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer("y8-pyth-dist-g1", "Find the distance between (0, 0) and (5, 12) in units.", "", "13", "Square root of 25 plus 144 equals 13.", ["13 units"], undefined, coordGraph("Segment from (0,0) to (5,12).", { x: 0, y: 0, label: "A" }, { x: 5, y: 12, label: "B" }, { xMin: 0, xMax: 6, yMin: 0, yMax: 13, xStep: 1, yStep: 1 })),
    answer("y8-pyth-dist-g2", "Find the distance between (2, 1) and (5, 5) in units.", "", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    choice("y8-pyth-dist-g3", "Two points are 8 units apart horizontally and 6 units apart vertically. What is the straight-line distance?", "A", ["10", "14", "100", "48"], "Square root of 64 plus 36 equals 10."),
    answer("y8-pyth-dist-g4", "Find the distance between (0, 0) and (4, 6) in units. Round to 1 decimal place.", "", "7.2", "Square root of 52 is approximately 7.2.", ["7.2 units"]),
  ],
  independentPractice: [
    answer("y8-pyth-dist-i1", "Find the distance between (1, 1) and (7, 9) in units.", "", "10", "Square root of 36 plus 64 equals 10.", ["10 units"]),
    answer("y8-pyth-dist-i2", "Find the distance between (3, 1) and (3, 8) in units.", "", "7", "The points are on the same vertical line. The distance is 7.", ["7 units"]),
    choice("y8-pyth-dist-i3", "Which formula finds the distance between two points?", "C", ["$\\Delta x + \\Delta y$", "$\\Delta x \\times \\Delta y$", "$\\sqrt{(\\Delta x)^2+(\\Delta y)^2}$", "$\\Delta x^2 + \\Delta y^2$"], "The square root of the sum of the squares of the separations."),
    answer("y8-pyth-dist-i4", "Find the distance between (1, 2) and (9, 17) in units.", "", "17", "Square root of 64 plus 225 equals 17.", ["17 units"]),
    answer("y8-pyth-dist-i5", "Find the distance between (2, 5) and (6, 8) in units. Round to 1 decimal place.", "", "5", "Square root of 16 plus 9 equals 5.", ["5 units"]),
  ],
  commonMistakes: [
    { mistake: "Adding Δx and Δy before squaring.", fix: "Square each separation first, then add, then take the square root." },
    { mistake: "Using only the horizontal or vertical separation.", fix: "Both Δx and Δy are needed as the two shorter sides of the right triangle." },
    { mistake: "Worrying about negative separations.", fix: "Squaring removes negatives: (−6)² = 36, the same as 6²." },
    { mistake: "Forgetting the square root at the end.", fix: "After adding the squared separations, take the square root to find the actual distance." },
  ],
  masteryQuiz: [
    answer("y8-pyth-dist-m1", "Find the distance between (0, 0) and (8, 6) in units.", "", "10", "Square root of 64 plus 36 equals 10.", ["10 units"]),
    answer("y8-pyth-dist-m2", "Find the distance between (1, 3) and (4, 7) in units.", "", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    choice("y8-pyth-dist-m3", "Points A and B have Δx = 5 and Δy = 12. What is the distance AB?", "B", ["17", "13", "60", "169"], "Square root of 25 plus 144 equals 13."),
    answer("y8-pyth-dist-m4", "Find the distance between (−3, 0) and (0, 4) in units.", "", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
    answer("y8-pyth-dist-m5", "Find the distance between (2, 3) and (10, 18) in units.", "", "17", "Square root of 64 plus 225 equals 17.", ["17 units"]),
    choice("y8-pyth-dist-m6", "A student finds the distance from (0,0) to (6,8) by calculating 6 + 8 = 14. What is the correct answer?", "C", ["7", "100", "10", "14"], "Square root of 36 plus 64 equals 10."),
    answer("y8-pyth-dist-m7", "Find the distance between (0, 0) and (20, 21) in units.", "", "29", "Square root of 400 plus 441 equals 29.", ["29 units"]),
    answer("y8-pyth-dist-m8", "Find the distance between (3, 4) and (9, 12) in units.", "", "10", "Square root of 36 plus 64 equals 10.", ["10 units"]),
    choice("y8-pyth-dist-m9", "Why is the sign of Δx or Δy irrelevant for the distance calculation?", "A", ["Squaring makes any value positive", "Distance is always negative", "Subtraction removes the sign", "Only positive coordinates are used"], "Squaring converts negatives to positives."),
    answer("y8-pyth-dist-m10", "Find the distance between (1, 1) and (4, 5) in units.", "", "5", "Square root of 9 plus 16 equals 5.", ["5 units"]),
  ],
  masteryQuizPool: [
    poolAnswer("y8-pyth-dist-p1", "Find the distance between (0, 0) and (3, 4) in units.", "", "5", "Square root of 9 plus 16 equals 5.", 1, ["5 units"]),
    poolAnswer("y8-pyth-dist-p2", "Find the distance between (0, 0) and (6, 8) in units.", "", "10", "Square root of 36 plus 64 equals 10.", 1, ["10 units"]),
    poolAnswer("y8-pyth-dist-p3", "Find the distance between (0, 0) and (5, 12) in units.", "", "13", "Square root of 25 plus 144 equals 13.", 1, ["13 units"]),
    poolAnswer("y8-pyth-dist-p4", "Find the distance between (2, 1) and (2, 8) in units.", "", "7", "The points share an x-coordinate, so the distance is 7.", 1, ["7 units"]),
    poolChoice("y8-pyth-dist-p5", "Which formula gives the distance between two points?", "C", ["$\\Delta x + \\Delta y$", "$\\Delta x \\times \\Delta y$", "$\\sqrt{(\\Delta x)^2+(\\Delta y)^2}$", "$\\Delta x^2 + \\Delta y^2$"], "Take the square root of the sum of the squared separations.", 1),
    poolAnswer("y8-pyth-dist-p6", "Find the distance between (1, 2) and (4, 6) in units.", "", "5", "Square root of 9 plus 16 equals 5.", 2, ["5 units"]),
    poolAnswer("y8-pyth-dist-p7", "Find the distance between (1, 1) and (7, 9) in units.", "", "10", "Square root of 36 plus 64 equals 10.", 2, ["10 units"]),
    poolAnswer("y8-pyth-dist-p8", "Find the distance between (2, 3) and (10, 18) in units.", "", "17", "Square root of 64 plus 225 equals 17.", 2, ["17 units"]),
    poolChoice("y8-pyth-dist-p9", "Two points have Δx = 8 and Δy = 6. What is the distance between them?", "A", ["10", "14", "48", "100"], "Square root of 64 plus 36 equals 10.", 2),
    poolAnswer("y8-pyth-dist-p10", "Find the distance between (0, 0) and (4, 6) in units. Round to 1 decimal place.", "", "7.2", "Square root of 16 plus 36 equals square root of 52 which is about 7.2.", 2, ["7.2 units"]),
    poolChoice("y8-pyth-dist-p11", "A student finds the distance from (0,0) to (6,8) by computing 6 + 8 = 14. What is the correct distance?", "C", ["7", "100", "10", "14"], "Square root of 36 plus 64 equals 10.", 2),
    poolAnswer("y8-pyth-dist-p12", "Find the distance between (-3, 0) and (0, 4) in units.", "", "5", "Square root of 9 plus 16 equals 5; the negative sign disappears after squaring.", 3, ["5 units"]),
    poolAnswer("y8-pyth-dist-p13", "Find the distance between (0, 0) and (20, 21) in units.", "", "29", "Square root of 400 plus 441 equals 29.", 3, ["29 units"]),
    poolAnswer("y8-pyth-dist-p14", "Find the distance between (2, 5) and (5, 9) in units.", "", "5", "Square root of 9 plus 16 equals 5.", 3, ["5 units"]),
    poolChoice("y8-pyth-dist-p15", "Why does the sign of Δx or Δy not affect the distance?", "A", ["Squaring makes any value positive", "Distances can be negative", "Subtraction removes the sign", "Only positive coordinates are allowed"], "Squaring a negative gives a positive result, so the sign is irrelevant.", 3),
    poolAnswer("y8-pyth-dist-p16", "Find the distance between (1, 2) and (9, 17) in units.", "", "17", "Square root of 64 plus 225 equals 17.", 3, ["17 units"]),
    poolAnswer("y8-pyth-dist-p17", "Find the distance between (-2, -1) and (1, 3) in units.", "", "5", "Square root of 9 plus 16 equals 5.", 4, ["5 units"]),
    poolAnswer("y8-pyth-dist-p18", "Find the distance between (-4, 2) and (4, -4) in units.", "", "10", "Square root of 64 plus 36 equals 10.", 4, ["10 units"]),
    poolAnswer("y8-pyth-dist-p19", "Find the distance between (1, 1) and (6, 13) in units.", "", "13", "Square root of 25 plus 144 equals 13.", 4, ["13 units"]),
    poolAnswer("y8-pyth-dist-p20", "Find the distance between (3, 2) and (7, 9) in units. Round to 1 decimal place.", "", "8.1", "Square root of 16 plus 49 equals square root of 65 which is about 8.1.", 4, ["8.1 units"]),
    poolChoice("y8-pyth-dist-p21", "Points P(1, 2) and Q(4, 6) are given. Which expression gives PQ?", "B", ["$\\sqrt{(4+1)^2+(6+2)^2}$", "$\\sqrt{(4-1)^2+(6-2)^2}$", "$(4-1)+(6-2)$", "$\\sqrt{4^2+6^2}$"], "Subtract coordinates for the separations, then apply the distance formula.", 4),
    poolAnswer("y8-pyth-dist-p22", "Find the distance between (-5, -2) and (7, 3) in units.", "", "13", "Square root of 144 plus 25 equals 13.", 5, ["13 units"]),
    poolAnswer("y8-pyth-dist-p23", "Find the distance between (-6, 4) and (2, -11) in units.", "", "17", "Square root of 64 plus 225 equals 17.", 5, ["17 units"]),
    poolAnswer("y8-pyth-dist-p24", "Find the distance between (2, -3) and (-1, 1) in units.", "", "5", "Square root of 9 plus 16 equals 5.", 5, ["5 units"]),
    poolAnswer("y8-pyth-dist-p25", "Find the distance between (0, 0) and (9, 40) in units.", "", "41", "Square root of 81 plus 1600 equals square root of 1681 which is 41.", 5, ["41 units"]),
  ],
  multiPartPractice: [
    {
      id: "y8-pyth-dist-mp1",
      prompt:
        "On a town map (units in km), the library is at L(1, 2), the school is at S(9, 8), and the pool is at P(9, 2).",
      latex: "L(1,2),\\; S(9,8),\\; P(9,2).",
      answer: "10",
      hint: "For each distance, find Δx and Δy by subtracting coordinates, then apply the distance formula.",
      explanation:
        "Part (a): from L(1,2) to S(9,8), Δx = 8 and Δy = 6, so distance equals square root of 64 plus 36 equals square root of 100 equals 10 km. Part (b): from L(1,2) to P(9,2), Δy = 0 and Δx = 8, so distance equals 8 km. Part (c): 10 plus 8 equals 18 km.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the straight-line distance from the library to the school, in km.",
          latex: "",
          marks: 2,
          answer: "10",
          acceptedAnswers: ["10 km"],
          hint: "Δx = 9 − 1 = 8 and Δy = 8 − 2 = 6.",
          explanation: "Square root of 64 plus 36 equals square root of 100 equals 10 km.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the straight-line distance from the library to the pool, in km.",
          latex: "",
          marks: 1,
          answer: "8",
          acceptedAnswers: ["8 km"],
          hint: "The library and pool share the same y-coordinate.",
          explanation: "Δy = 0, so the distance is simply Δx = 8 km.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "A runner goes library to school then library to pool. Find the total distance in km.",
          latex: "",
          marks: 1,
          answer: "18",
          acceptedAnswers: ["18 km"],
          hint: "Add the two distances found above.",
          explanation: "10 plus 8 equals 18 km.",
        },
      ],
    },
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "right-angled-triangles-pythagoras": introTheorem,
  "finding-the-hypotenuse":            findingHypotenuse,
  "finding-a-shorter-side":            findingShorterSide,
  "pythagoras-real-contexts":          realContexts,
  "pythagorean-triples":               pythagoreanTriples,
  "distance-between-two-points":       distanceBetweenPoints,
};

export function year8PythagorasTheoremLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" ||
    unit.slug !== "pythagoras-theorem"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
