import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { Vector2DDiagram } from "../types";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function vectorChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}",
  vector2DDiagram?: Vector2DDiagram
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: choices.map((text, index) => ({
      label: String.fromCharCode(65 + index),
      text,
    })),
    answer,
    hint: "Track the vector components carefully and decide whether the answer should be a vector or a scalar.",
    explanation,
    ...(vector2DDiagram ? { vector2DDiagram } : {}),
  };
}

function vectorTyped(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Work component-by-component and keep exact surd answers where possible.",
    explanation,
  };
}

const base = {
  masteryPassMark: 0.8,
};

const vectorsScalarsNotation: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Define vectors and scalars, use column and i, j notation, and find magnitudes and unit vectors.",
  learningIntention:
    "Represent two-dimensional vectors in different notation systems and calculate magnitude and unit vectors.",
  successCriteria: [
    "Distinguish vectors from scalars.",
    "Write vectors in column notation and i, j notation.",
    "Find the magnitude of a vector using Pythagoras.",
    "Find a unit vector in the same direction as a given vector.",
  ],
  teaching: {
    paragraphs: [
      "A scalar has size only, such as 8 metres or 20 dollars. A vector has size and direction, such as 8 metres east or a displacement of 3 units right and 4 units down.",
      "A two-dimensional vector can be written as a column vector or using the unit vectors i and j. The vector (3, -4) means 3 units in the x-direction and -4 units in the y-direction.",
      "Magnitude is the length of the vector. Because the components form a right triangle, the magnitude is found with Pythagoras.",
      "A unit vector has length 1. To make a unit vector in the same direction, divide every component by the vector's magnitude.",
    ],
    latexBlocks: [
      "\\mathbf{a}=\\begin{pmatrix}a_1\\\\a_2\\end{pmatrix}=a_1\\mathbf{i}+a_2\\mathbf{j}",
      "|\\mathbf{a}|=\\sqrt{a_1^2+a_2^2}",
      "\\hat{\\mathbf{a}}=\\frac{\\mathbf{a}}{|\\mathbf{a}|}",
    ],
  },
  workedExamples: [
    {
      title: "Find magnitude and unit vector",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}3\\\\-4\\end{pmatrix}.\\quad \\text{Find }|\\mathbf{a}|\\text{ and }\\hat{\\mathbf{a}}.",
      steps: [
        {
          explanation:
            "The components 3 and -4 form the legs of a right triangle, so use Pythagoras for the length.",
          latex: "|\\mathbf{a}|=\\sqrt{3^2+(-4)^2}=\\sqrt{25}=5",
        },
        {
          explanation:
            "Divide each component by the magnitude to make the vector length 1 without changing its direction.",
          latex:
            "\\hat{\\mathbf{a}}=\\frac{1}{5}\\begin{pmatrix}3\\\\-4\\end{pmatrix}=\\begin{pmatrix}3/5\\\\-4/5\\end{pmatrix}",
        },
      ],
      finalAnswerLatex:
        "|\\mathbf{a}|=5,\\quad \\hat{\\mathbf{a}}=\\begin{pmatrix}3/5\\\\-4/5\\end{pmatrix}",
      vector2DDiagram: {
        description: "Vector a from the origin to (3, -4), with dashed horizontal and vertical component legs of lengths 3 and 4 forming a right triangle.",
        xMin: -1, xMax: 5, yMin: -5, yMax: 1,
        vectors: [{ to: { x: 3, y: -4 }, label: "a = (3,-4)" }],
        segments: [
          { from: { x: 0, y: 0 }, to: { x: 3, y: 0 }, label: "3", dashed: true },
          { from: { x: 3, y: 0 }, to: { x: 3, y: -4 }, label: "-4", dashed: true },
        ],
        angles: [{ vertex: { x: 3, y: 0 }, from: { x: 0, y: 0 }, to: { x: 3, y: -4 }, rightAngle: true }],
      },
    },
    {
      title: "Convert between vector notation",
      questionLatex:
        "\\mathbf{b}=2\\mathbf{i}-7\\mathbf{j}.\\quad \\text{Write }\\mathbf{b}\\text{ as a column vector.}",
      steps: [
        {
          explanation:
            "The i coefficient is the x-component and the j coefficient is the y-component.",
          latex: "2\\mathbf{i}-7\\mathbf{j}\\Rightarrow x=2,\\ y=-7",
        },
        {
          explanation:
            "Place the components vertically in the same order: x first, y second.",
          latex: "\\mathbf{b}=\\begin{pmatrix}2\\\\-7\\end{pmatrix}",
        },
      ],
      finalAnswerLatex: "\\begin{pmatrix}2\\\\-7\\end{pmatrix}",
    },
    {
      title: "Classify vector and scalar quantities",
      questionLatex:
        "\\text{Classify speed, velocity, mass and displacement as scalar or vector quantities.}",
      steps: [
        {
          explanation:
            "Scalars only need size. Speed and mass do not require a direction.",
          latex: "\\text{speed, mass: scalars}",
        },
        {
          explanation:
            "Vectors need size and direction. Velocity and displacement both include direction.",
          latex: "\\text{velocity, displacement: vectors}",
        },
      ],
      finalAnswerLatex:
        "\\text{Scalars: speed, mass. Vectors: velocity, displacement.}",
    },
  ],
  guidedPractice: [
    vectorTyped("y12e1-vectors-notation-g1", "Find the magnitude of the vector.", "\\mathbf{a}=\\begin{pmatrix}6\\\\8\\end{pmatrix}", "10", ["|a|=10", "|\\mathbf{a}|=10"], "Use Pythagoras: sqrt(6^2 + 8^2) = 10."),
    vectorChoice("y12e1-vectors-notation-g2", "Which quantity is a vector?", "C", ["Mass", "Temperature", "Displacement", "Time"], "Displacement includes both distance and direction."),
    vectorTyped("y12e1-vectors-notation-g3", "Write the vector in column form.", "5\\mathbf{i}-2\\mathbf{j}", "(5,-2)", ["(5, -2)", "5,-2", "\\begin{pmatrix}5\\\\-2\\end{pmatrix}"], "The i coefficient is 5 and the j coefficient is -2."),
    vectorChoice("y12e1-vectors-notation-g4", "A unit vector has magnitude:", "A", ["1", "0", "The same as the original vector", "Always 10"], "Unit means one unit long."),
  ],
  independentPractice: [
    vectorTyped("y12e1-vectors-notation-i1", "Find the magnitude of the vector.", "\\mathbf{u}=\\begin{pmatrix}5\\\\12\\end{pmatrix}", "13", ["|u|=13", "|\\mathbf{u}|=13"], "The length is $\\sqrt{5^2 + 12^2} = 13$."),
    vectorTyped("y12e1-vectors-notation-i2", "Find the magnitude of the vector.", "\\mathbf{v}=\\begin{pmatrix}-1\\\\-1\\end{pmatrix}", "sqrt(2)", ["\\sqrt{2}", "√2"], "Both components are squared, so the negative signs do not make the length negative."),
    vectorChoice("y12e1-vectors-notation-i3", "Which notation matches $-3\\mathbf{i}+4\\mathbf{j}$?", "B", ["(3,-4)", "(-3,4)", "(4,-3)", "(-4,3)"], "The i coefficient is the first component and the j coefficient is the second."),
    vectorTyped("y12e1-vectors-notation-i4", "Find a unit vector in the direction of the vector.", "\\mathbf{a}=\\begin{pmatrix}0\\\\5\\end{pmatrix}", "(0,1)", ["(0, 1)", "0,1", "\\begin{pmatrix}0\\\\1\\end{pmatrix}"], "The magnitude is 5, so divide both components by 5."),
    vectorChoice("y12e1-vectors-notation-i5", "What is the main difference between a vector and a scalar?", "D", ["A scalar is always negative.", "A vector has no size.", "A scalar must be written in brackets.", "A vector has size and direction."], "Direction is the extra information that makes a quantity a vector."),
  ],
  commonMistakes: [
    {
      mistake: "Treating magnitude as a vector.",
      fix: "Magnitude is a scalar length, so it is a single non-negative number.",
    },
    {
      mistake: "Forgetting to square negative components.",
      fix: "Use $(-4)^2=16$, not -16.",
    },
    {
      mistake: "Swapping i and j components.",
      fix: "The i component is horizontal/x first; the j component is vertical/y second.",
    },
    {
      mistake: "Calling any short vector a unit vector.",
      fix: "A unit vector must have magnitude exactly 1.",
    },
  ],
  masteryQuiz: [
    vectorTyped("y12e1-vectors-notation-m1", "Find the magnitude.", "\\begin{pmatrix}3\\\\4\\end{pmatrix}", "5", ["|a|=5"], "Use Pythagoras: sqrt(9 + 16) = 5."),
    vectorChoice("y12e1-vectors-notation-m2", "Which is a scalar?", "A", ["Speed", "Velocity", "Displacement", "Force"], "Speed has size only; velocity needs direction."),
    vectorTyped("y12e1-vectors-notation-m3", "Write $-2\\mathbf{i}+6\\mathbf{j}$ as an ordered pair.", "-2\\mathbf{i}+6\\mathbf{j}", "(-2,6)", ["(-2, 6)", "-2,6"], "The components are -2 and 6."),
    vectorChoice("y12e1-vectors-notation-m4", "The magnitude formula for $(a_1,a_2)$ is:", "B", ["$a_1+a_2$", "$\\sqrt{a_1^2+a_2^2}$", "$a_1^2-a_2^2$", "$a_1/a_2$"], "Magnitude is the Pythagorean length."),
    vectorTyped("y12e1-vectors-notation-m5", "Find a unit vector in the same direction.", "\\begin{pmatrix}8\\\\0\\end{pmatrix}", "(1,0)", ["(1, 0)", "1,0"], "The magnitude is 8, so divide by 8."),
    vectorChoice("y12e1-vectors-notation-m6", "Why is $|\\mathbf{a}|$ never negative?", "C", ["Because vectors cannot point down.", "Because components are never negative.", "Because magnitude is length.", "Because i and j are positive."], "Length is measured as a non-negative scalar."),
    vectorTyped("y12e1-vectors-notation-m7", "Find the magnitude.", "\\begin{pmatrix}-5\\\\0\\end{pmatrix}", "5", ["|a|=5"], "The length of 5 units left is still 5."),
    vectorChoice("y12e1-vectors-notation-m8", "Which ordered pair matches $4\\mathbf{i}+9\\mathbf{j}$?", "A", ["(4,9)", "(9,4)", "(-4,9)", "(4,-9)"], "The i coefficient comes first."),
    vectorChoice("y12e1-vectors-notation-m9", "To find a unit vector, divide each component by:", "D", ["The x-component", "The y-component", "2", "The magnitude"], "Dividing by the magnitude scales the length to 1."),
    vectorTyped("y12e1-vectors-notation-m10", "Find the magnitude.", "\\begin{pmatrix}1\\\\-2\\end{pmatrix}", "sqrt(5)", ["\\sqrt{5}", "√5"], "The length is $\\sqrt{1^2 + (-2)^2} = \\sqrt{5}$."),
  ],
  masteryQuizPool: [
    {
      ...vectorTyped(
        "y12e1-vectors-notation-pool-d5-1",
        "Find the magnitude.",
        "\\begin{pmatrix}-6\\\\8\\end{pmatrix}",
        "10",
        ["|a|=10"],
        "Use Pythagoras: sqrt(36 + 64) = sqrt(100) = 10."
      ),
      difficulty: 5,
    },
  ],
};

const vectorAdditionSubtraction: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Add, subtract and scale vectors component-by-component, and interpret the operations geometrically.",
  learningIntention:
    "Use vector addition, subtraction and scalar multiplication to model displacement and velocity.",
  successCriteria: [
    "Add and subtract vectors component-by-component.",
    "Use scalar multiplication to stretch or reverse a vector.",
    "Explain head-to-tail addition and the parallelogram rule.",
    "Solve simple displacement and velocity word problems using vectors.",
  ],
  teaching: {
    paragraphs: [
      "Vector addition combines movements. If one vector moves right 3 and up 1, and another moves right 2 and down 4, the total movement adds the horizontal parts and the vertical parts separately.",
      "Geometrically, head-to-tail addition means placing the second vector at the end of the first. The resulting vector goes from the original start to the final end.",
      "Scalar multiplication stretches a vector. A negative scalar also reverses its direction.",
      "Subtraction means adding the opposite vector: $\\mathbf{a}-\\mathbf{b}=\\mathbf{a}+(-\\mathbf{b})$.",
    ],
    latexBlocks: [
      "\\begin{pmatrix}a_1\\\\a_2\\end{pmatrix}+\\begin{pmatrix}b_1\\\\b_2\\end{pmatrix}=\\begin{pmatrix}a_1+b_1\\\\a_2+b_2\\end{pmatrix}",
      "c\\begin{pmatrix}a_1\\\\a_2\\end{pmatrix}=\\begin{pmatrix}ca_1\\\\ca_2\\end{pmatrix}",
    ],
  },
  workedExamples: [
    {
      title: "Add two vectors",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}2\\\\-1\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}5\\\\3\\end{pmatrix}.\\quad \\text{Find }\\mathbf{a}+\\mathbf{b}.",
      steps: [
        {
          explanation: "Add the x-components and y-components separately.",
          latex:
            "\\mathbf{a}+\\mathbf{b}=\\begin{pmatrix}2+5\\\\-1+3\\end{pmatrix}",
        },
        {
          explanation: "Simplify each component.",
          latex: "\\begin{pmatrix}7\\\\2\\end{pmatrix}",
        },
      ],
      finalAnswerLatex: "\\begin{pmatrix}7\\\\2\\end{pmatrix}",
    },
    {
      title: "Find $3\\mathbf{a}-2\\mathbf{b}$",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}1\\\\4\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}-2\\\\3\\end{pmatrix}.\\quad \\text{Find }3\\mathbf{a}-2\\mathbf{b}.",
      steps: [
        {
          explanation: "Scale each vector first.",
          latex:
            "3\\mathbf{a}=\\begin{pmatrix}3\\\\12\\end{pmatrix},\\quad 2\\mathbf{b}=\\begin{pmatrix}-4\\\\6\\end{pmatrix}",
        },
        {
          explanation: "Subtract component-by-component.",
          latex:
            "3\\mathbf{a}-2\\mathbf{b}=\\begin{pmatrix}3-(-4)\\\\12-6\\end{pmatrix}=\\begin{pmatrix}7\\\\6\\end{pmatrix}",
        },
      ],
      finalAnswerLatex: "\\begin{pmatrix}7\\\\6\\end{pmatrix}",
    },
    {
      title: "Model displacement",
      questionLatex:
        "\\text{A drone moves }4\\text{ km east and }1\\text{ km north, then }2\\text{ km west and }3\\text{ km north. Find the total displacement.}",
      steps: [
        {
          explanation:
            "Represent east as positive x and north as positive y.",
          latex:
            "\\begin{pmatrix}4\\\\1\\end{pmatrix}+\\begin{pmatrix}-2\\\\3\\end{pmatrix}",
        },
        {
          explanation: "Add components to get the single net movement.",
          latex: "\\begin{pmatrix}2\\\\4\\end{pmatrix}",
        },
      ],
      finalAnswerLatex:
        "\\text{Total displacement }=\\begin{pmatrix}2\\\\4\\end{pmatrix}\\text{ km}",
      vector2DDiagram: {
        description: "Head-to-tail displacement diagram: the drone moves from O to A by (4, 1), then from A to B by (-2, 3). The resultant vector runs from O to B and equals (2, 4).",
        xMin: -0.5, xMax: 5, yMin: -0.5, yMax: 5,
        vectors: [
          { to: { x: 4, y: 1 }, label: "(4,1)", color: "blue" },
          { from: { x: 4, y: 1 }, to: { x: 2, y: 4 }, label: "(-2,3)", color: "violet" },
          { to: { x: 2, y: 4 }, label: "resultant (2,4)", color: "teal" },
        ],
        points: [{ x: 0, y: 0, label: "O" }, { x: 4, y: 1, label: "A" }, { x: 2, y: 4, label: "B" }],
      },
    },
  ],
  guidedPractice: [
    vectorTyped("y12e1-vector-add-g1", "Find $\\mathbf{a}+\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}1\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}", "(4,6)", ["(4, 6)", "4,6", "\\begin{pmatrix}4\\\\6\\end{pmatrix}"], "Add matching components."),
    vectorTyped("y12e1-vector-add-g2", "Find $2\\mathbf{a}$.", "\\mathbf{a}=\\begin{pmatrix}-3\\\\5\\end{pmatrix}", "(-6,10)", ["(-6, 10)", "-6,10", "\\begin{pmatrix}-6\\\\10\\end{pmatrix}"], "Multiply both components by 2."),
    vectorChoice("y12e1-vector-add-g3", "What does a negative scalar do to a vector?", "C", ["Only changes its length", "Only changes its name", "Reverses direction and scales length", "Makes it a scalar"], "A negative multiplier points the vector in the opposite direction."),
    vectorTyped("y12e1-vector-add-g4", "A runner moves $(5,0)$ then $(0,3)$. Find the total displacement.", "\\begin{pmatrix}5\\\\0\\end{pmatrix}+\\begin{pmatrix}0\\\\3\\end{pmatrix}", "(5,3)", ["(5, 3)", "5,3"], "Add the two movement vectors head-to-tail."),
  ],
  independentPractice: [
    vectorTyped("y12e1-vector-add-i1", "Find $\\mathbf{a}-\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}7\\\\1\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}2\\\\5\\end{pmatrix}", "(5,-4)", ["(5, -4)", "5,-4"], "Subtract matching components."),
    vectorTyped("y12e1-vector-add-i2", "Find $3\\mathbf{v}$.", "\\mathbf{v}=\\begin{pmatrix}2\\\\-3\\end{pmatrix}", "(6,-9)", ["(6, -9)", "6,-9"], "Multiply each component by 3."),
    vectorTyped("y12e1-vector-add-i3", "Find $2\\mathbf{a}+\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}1\\\\-1\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}4\\\\3\\end{pmatrix}", "(6,1)", ["(6, 1)", "6,1"], "First double a, then add b."),
    vectorChoice(
      "y12e1-vector-add-i4",
      "Using the diagram, the head-to-tail method represents:",
      "A",
      ["Vector addition", "Dot product only", "Finding magnitude only", "Changing to scalar form"],
      "It shows one movement followed by another.",
      "\\text{Choose the best option.}",
      {
        description: "Two directed vectors arranged head-to-tail, followed by a resultant vector from the first tail to the final head.",
        xMin: -0.5, xMax: 6, yMin: -0.5, yMax: 5, showGrid: false,
        vectors: [
          { to: { x: 3, y: 1 }, label: "a", color: "blue" },
          { from: { x: 3, y: 1 }, to: { x: 5, y: 4 }, label: "b", color: "violet" },
          { to: { x: 5, y: 4 }, label: "a + b", color: "teal" },
        ],
      }
    ),
    vectorTyped("y12e1-vector-add-i5", "A velocity changes by adding wind vector $(-2,1)$ to plane velocity $(8,3)$. Find the resulting velocity.", "\\begin{pmatrix}8\\\\3\\end{pmatrix}+\\begin{pmatrix}-2\\\\1\\end{pmatrix}", "(6,4)", ["(6, 4)", "6,4"], "Combine the velocity components."),
  ],
  commonMistakes: [
    {
      mistake: "Adding x from one vector to y from the other.",
      fix: "Only combine matching components: x with x, y with y.",
    },
    {
      mistake: "Forgetting that subtraction changes both components.",
      fix: "Subtract the whole vector, or add the opposite vector.",
    },
    {
      mistake: "Multiplying only one component by a scalar.",
      fix: "A scalar stretches the entire vector, so every component is multiplied.",
    },
    {
      mistake: "Confusing vector addition with magnitude addition.",
      fix: "Add components first; only find a magnitude if the question asks for length.",
    },
  ],
  masteryQuiz: [
    vectorTyped("y12e1-vector-add-m1", "Find $\\mathbf{a}+\\mathbf{b}$.", "\\begin{pmatrix}2\\\\3\\end{pmatrix}+\\begin{pmatrix}4\\\\-1\\end{pmatrix}", "(6,2)", ["(6, 2)", "6,2"], "Add components."),
    vectorTyped("y12e1-vector-add-m2", "Find $\\mathbf{a}-\\mathbf{b}$.", "\\begin{pmatrix}2\\\\3\\end{pmatrix}-\\begin{pmatrix}4\\\\-1\\end{pmatrix}", "(-2,4)", ["(-2, 4)", "-2,4"], "Subtract components."),
    vectorChoice("y12e1-vector-add-m3", "Multiplying a vector by 3:", "B", ["Turns it into a dot product", "Stretches it by factor 3", "Always reverses it", "Makes its magnitude 1"], "A positive scalar stretches without reversing."),
    vectorTyped("y12e1-vector-add-m4", "Find $-2\\mathbf{v}$.", "\\mathbf{v}=\\begin{pmatrix}3\\\\-5\\end{pmatrix}", "(-6,10)", ["(-6, 10)", "-6,10"], "Multiply both components by -2."),
    vectorChoice(
      "y12e1-vector-add-m5",
      "Using the diagram, the parallelogram rule is a geometric way to show:",
      "A",
      ["Vector addition", "Scalar projection", "Perpendicularity", "Magnitude only"],
      "The diagonal gives the sum of two vectors.",
      "\\text{Choose the best option.}",
      {
        description: "Parallelogram formed by vectors a and b from the origin, with the diagonal labelled a + b as the resultant.",
        xMin: -0.5, xMax: 6, yMin: -0.5, yMax: 5,
        showGrid: false,
        vectors: [
          { to: { x: 4, y: 1 }, label: "a", color: "blue" },
          { to: { x: 1.5, y: 3 }, label: "b", color: "violet" },
          { to: { x: 5.5, y: 4 }, label: "a + b", color: "teal" },
        ],
        segments: [
          { from: { x: 4, y: 1 }, to: { x: 5.5, y: 4 }, dashed: true, color: "violet" },
          { from: { x: 1.5, y: 3 }, to: { x: 5.5, y: 4 }, dashed: true, color: "blue" },
        ],
      }
    ),
    vectorTyped("y12e1-vector-add-m6", "Find $3\\mathbf{a}-2\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}1\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}2\\\\1\\end{pmatrix}", "(-1,4)", ["(-1, 4)", "-1,4"], "3a = (3,6) and 2b = (4,2), so the result is (-1,4)."),
    vectorTyped("y12e1-vector-add-m7", "A displacement $(3,2)$ is followed by $(-1,5)$. Find the total displacement.", "\\begin{pmatrix}3\\\\2\\end{pmatrix}+\\begin{pmatrix}-1\\\\5\\end{pmatrix}", "(2,7)", ["(2, 7)", "2,7"], "Add the movements head-to-tail."),
    vectorChoice("y12e1-vector-add-m8", "Which operation reverses the direction of $(2,4)$?", "D", ["Multiply by 2", "Add (0,0)", "Find magnitude", "Multiply by -1"], "A negative scalar points the vector in the opposite direction."),
    vectorTyped("y12e1-vector-add-m9", "Find $\\mathbf{a}+2\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}0\\\\5\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\-2\\end{pmatrix}", "(6,1)", ["(6, 1)", "6,1"], "Double b first, then add a."),
    vectorChoice("y12e1-vector-add-m10", "A vector word problem about total movement usually asks for:", "C", ["The product of components", "Only the largest component", "The sum of displacement vectors", "The square root first"], "Successive movements are combined by vector addition."),
  ],
  masteryQuizPool: [
    {
      ...vectorTyped(
        "y12e1-vector-add-pool-d5-1",
        "Find the magnitude of a + b.",
        "\\mathbf{a}=\\begin{pmatrix}1\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}",
        "2sqrt(5)",
        ["2√5", "2\\sqrt5", "sqrt(20)", "√20"],
        "a + b = (4, 6); |(4, 6)| = sqrt(16 + 36) = sqrt(52) = 2 sqrt(5)."
      ),
      difficulty: 5,
    },
  ],
};

const dotProduct: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Use the dot product to calculate scalar products, angles between vectors, and perpendicularity.",
  learningIntention:
    "Connect the component form and geometric form of the dot product.",
  successCriteria: [
    "Calculate a dot product from components.",
    "Use $\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta$ to find an angle.",
    "Recognise perpendicular vectors from a zero dot product.",
    "Explain why the dot product is a scalar, not a vector.",
  ],
  teaching: {
    paragraphs: [
      "The dot product combines two vectors and produces one number. That number measures how much the vectors point in the same direction.",
      "From components, multiply matching components and add. Geometrically, the dot product also equals the product of the lengths and the cosine of the angle between them.",
      "A zero dot product means the vectors are perpendicular. This is because $\\cos 90^\\circ=0$.",
      "The dot product is not vector multiplication that creates a new arrow. It is a scalar measurement of alignment.",
    ],
    latexBlocks: [
      "\\mathbf{a}\\cdot\\mathbf{b}=a_1b_1+a_2b_2",
      "\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta",
      "\\mathbf{a}\\cdot\\mathbf{b}=0\\Rightarrow \\mathbf{a}\\perp\\mathbf{b}",
    ],
  },
  workedExamples: [
    {
      title: "Find the angle between two vectors",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}1\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\-1\\end{pmatrix}.\\quad \\text{Find the angle between them.}",
      steps: [
        {
          explanation: "Calculate the dot product from matching components.",
          latex: "\\mathbf{a}\\cdot\\mathbf{b}=1(3)+2(-1)=1",
        },
        {
          explanation: "Find both magnitudes.",
          latex:
            "|\\mathbf{a}|=\\sqrt{5},\\quad |\\mathbf{b}|=\\sqrt{10}",
        },
        {
          explanation:
            "Use the geometric dot product formula and solve for the angle.",
          latex:
            "\\cos\\theta=\\frac{1}{\\sqrt{5}\\sqrt{10}}=\\frac{1}{\\sqrt{50}}",
        },
      ],
      finalAnswerLatex: "\\theta\\approx81.9^\\circ",
      vector2DDiagram: {
        description: "Two vectors from the origin: a = (1, 2) in quadrant I and b = (3, -1) in quadrant IV, with the angle theta marked between them.",
        xMin: -0.5, xMax: 4, yMin: -2, yMax: 3,
        vectors: [
          { to: { x: 1, y: 2 }, label: "a = (1,2)", color: "blue" },
          { to: { x: 3, y: -1 }, label: "b = (3,-1)", color: "violet" },
        ],
        angles: [{ vertex: { x: 0, y: 0 }, from: { x: 3, y: -1 }, to: { x: 1, y: 2 }, label: "theta", radius: 0.65 }],
      },
    },
    {
      title: "Show two vectors are perpendicular",
      questionLatex:
        "\\mathbf{u}=\\begin{pmatrix}2\\\\3\\end{pmatrix},\\quad \\mathbf{v}=\\begin{pmatrix}3\\\\-2\\end{pmatrix}.\\quad \\text{Show they are perpendicular.}",
      steps: [
        {
          explanation: "Find the dot product.",
          latex: "\\mathbf{u}\\cdot\\mathbf{v}=2(3)+3(-2)=6-6=0",
        },
        {
          explanation:
            "A zero dot product means the angle is 90 degrees, so the vectors are perpendicular.",
          latex: "\\mathbf{u}\\perp\\mathbf{v}",
        },
      ],
      finalAnswerLatex: "\\text{The vectors are perpendicular.}",
    },
    {
      title: "Interpret a positive dot product",
      questionLatex:
        "\\mathbf{p}=\\begin{pmatrix}4\\\\1\\end{pmatrix},\\quad \\mathbf{q}=\\begin{pmatrix}2\\\\3\\end{pmatrix}.\\quad \\text{Find }\\mathbf{p}\\cdot\\mathbf{q}\\text{ and interpret its sign.}",
      steps: [
        {
          explanation: "Multiply matching components and add.",
          latex: "\\mathbf{p}\\cdot\\mathbf{q}=4(2)+1(3)=11",
        },
        {
          explanation:
            "A positive dot product means the angle between the vectors is acute.",
        },
      ],
      finalAnswerLatex: "\\mathbf{p}\\cdot\\mathbf{q}=11\\text{, acute angle}",
    },
  ],
  guidedPractice: [
    vectorTyped("y12e1-dot-g1", "Find the dot product.", "\\begin{pmatrix}2\\\\5\\end{pmatrix}\\cdot\\begin{pmatrix}3\\\\1\\end{pmatrix}", "11", ["dot=11", "a.b=11"], "Multiply matching components and add."),
    vectorChoice("y12e1-dot-g2", "If $\\mathbf{a}\\cdot\\mathbf{b}=0$, the vectors are:", "B", ["Parallel", "Perpendicular", "Equal", "Unit vectors"], "A zero dot product corresponds to a 90 degree angle."),
    vectorTyped("y12e1-dot-g3", "Find the dot product.", "\\begin{pmatrix}1\\\\2\\end{pmatrix}\\cdot\\begin{pmatrix}3\\\\-1\\end{pmatrix}", "1", ["dot=1", "a.b=1"], "1(3) + 2(-1) = 1."),
    vectorChoice("y12e1-dot-g4", "The dot product produces:", "A", ["A scalar", "A column vector", "A matrix", "A new coordinate axis"], "The dot product is one number."),
  ],
  independentPractice: [
    vectorTyped("y12e1-dot-i1", "Find the dot product.", "\\begin{pmatrix}4\\\\-2\\end{pmatrix}\\cdot\\begin{pmatrix}1\\\\3\\end{pmatrix}", "-2", ["dot=-2", "a.b=-2"], "4(1) + (-2)(3) = -2."),
    vectorChoice("y12e1-dot-i2", "Which pair is perpendicular?", "C", ["(1,1) and (2,2)", "(3,0) and (1,0)", "(2,3) and (3,-2)", "(1,2) and (2,1)"], "The dot product of (2,3) and (3,-2) is 6 - 6 = 0."),
    vectorTyped("y12e1-dot-i3", "Find $\\cos\\theta$ using the dot product formula.", "|\\mathbf{a}|=5,\\ |\\mathbf{b}|=4,\\ \\mathbf{a}\\cdot\\mathbf{b}=10", "0.5", ["1/2", "50%"], "cos theta = 10/(5 times 4) = 1/2."),
    vectorChoice("y12e1-dot-i4", "A negative dot product means the angle is:", "D", ["Zero degrees", "Acute", "Exactly 90 degrees", "Obtuse"], "Cosine is negative for obtuse angles."),
    vectorTyped("y12e1-dot-i5", "Find the dot product.", "\\begin{pmatrix}-1\\\\4\\end{pmatrix}\\cdot\\begin{pmatrix}5\\\\2\\end{pmatrix}", "3", ["dot=3", "a.b=3"], "-1(5) + 4(2) = 3."),
  ],
  commonMistakes: [
    {
      mistake: "Writing the dot product as a vector.",
      fix: "The dot product is a scalar, so the answer is a single number.",
    },
    {
      mistake: "Multiplying non-matching components.",
      fix: "Use x with x and y with y, then add the two products.",
    },
    {
      mistake: "Thinking zero dot product means zero vectors.",
      fix: "A zero dot product can mean non-zero vectors are perpendicular.",
    },
    {
      mistake: "Forgetting to divide by both magnitudes when finding an angle.",
      fix: "Use $\\cos\\theta=(\\mathbf{a}\\cdot\\mathbf{b})/(|\\mathbf{a}||\\mathbf{b}|)$.",
    },
  ],
  masteryQuiz: [
    vectorTyped("y12e1-dot-m1", "Find the dot product.", "\\begin{pmatrix}2\\\\3\\end{pmatrix}\\cdot\\begin{pmatrix}4\\\\1\\end{pmatrix}", "11", ["dot=11"], "2(4) + 3(1) = 11."),
    vectorTyped("y12e1-dot-m2", "Find the dot product.", "\\begin{pmatrix}2\\\\3\\end{pmatrix}\\cdot\\begin{pmatrix}3\\\\-2\\end{pmatrix}", "0", ["dot=0"], "6 - 6 = 0."),
    vectorChoice("y12e1-dot-m3", "A dot product of zero indicates:", "A", ["Perpendicular vectors", "Equal magnitudes", "Same direction", "No components"], "Zero alignment means a right angle."),
    vectorChoice("y12e1-dot-m4", "Which formula finds the angle between vectors?", "C", ["$a_1+b_1$", "$|a|+|b|$", "$\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta$", "$\\mathbf{a}-\\mathbf{b}=0$"], "The geometric dot product formula links dot product and angle."),
    vectorTyped("y12e1-dot-m5", "Find $\\cos\\theta$.", "\\mathbf{a}\\cdot\\mathbf{b}=6,\\ |\\mathbf{a}|=3,\\ |\\mathbf{b}|=4", "0.5", ["1/2", "50%"], "cos theta = 6/(3 times 4) = 1/2."),
    vectorChoice("y12e1-dot-m6", "The dot product is best interpreted as measuring:", "B", ["Total distance only", "Alignment between two vectors", "The y-intercept", "The area of a triangle"], "It measures how much the vectors point together."),
    vectorTyped("y12e1-dot-m7", "Find the dot product.", "\\begin{pmatrix}0\\\\7\\end{pmatrix}\\cdot\\begin{pmatrix}5\\\\0\\end{pmatrix}", "0", ["dot=0"], "The vectors point along perpendicular axes."),
    vectorChoice("y12e1-dot-m8", "If the dot product is positive, the angle is usually:", "D", ["Reflex", "Right", "Obtuse", "Acute"], "Positive cosine corresponds to an acute angle."),
    vectorChoice("y12e1-dot-m9", "Which is the common dot-product mistake?", "A", ["Treating the result as a vector", "Using matching components", "Adding the products", "Checking for zero"], "The result is scalar, not a new arrow."),
    vectorTyped("y12e1-dot-m10", "Find the dot product.", "\\begin{pmatrix}-2\\\\-3\\end{pmatrix}\\cdot\\begin{pmatrix}4\\\\-1\\end{pmatrix}", "-5", ["dot=-5"], "-2(4) + (-3)(-1) = -8 + 3 = -5."),
  ],
  masteryQuizPool: [
    {
      ...vectorTyped(
        "y12e1-dot-pool-d5-1",
        "Find the dot product.",
        "\\begin{pmatrix}2\\\\3\\end{pmatrix}\\cdot\\begin{pmatrix}4\\\\-1\\end{pmatrix}",
        "5",
        ["dot=5"],
        "2(4) + 3(-1) = 8 - 3 = 5."
      ),
      difficulty: 5,
    },
    {
      ...vectorTyped(
        "y12e1-dot-pool-d5-2",
        "Find the value of k for which the vectors are perpendicular.",
        "\\begin{pmatrix}2\\\\k\\end{pmatrix}\\perp\\begin{pmatrix}3\\\\-6\\end{pmatrix}",
        "1",
        ["k=1"],
        "Perpendicular ⟹ dot product 0: 2(3) + k(-6) = 6 - 6k = 0, so k = 1."
      ),
      difficulty: 5,
    },
    {
      ...vectorTyped(
        "y12e1-dot-pool-d5-3",
        "Find the exact value of cos(theta), the angle between the vectors.",
        "\\begin{pmatrix}1\\\\1\\end{pmatrix},\\ \\begin{pmatrix}1\\\\0\\end{pmatrix}",
        "√2/2",
        ["sqrt(2)/2", "1/sqrt(2)", "\\frac{\\sqrt2}{2}"],
        "cos theta = (1·1 + 1·0)/(sqrt(2)·1) = 1/sqrt(2) = sqrt(2)/2."
      ),
      difficulty: 5,
    },
  ],
};

const vectorProjectionsApplications: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Use scalar and vector projections to resolve vectors into components and solve force, velocity and displacement applications.",
  learningIntention:
    "Calculate scalar and vector projections and interpret components in practical vector contexts.",
  successCriteria: [
    "Find scalar projection using $\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|}$.",
    "Find vector projection using $\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}\\mathbf{b}$.",
    "Interpret projections as components of one vector in another vector's direction.",
    "Apply projections to force, velocity and displacement contexts.",
  ],
  teaching: {
    paragraphs: [
      "Projection asks: how much of one vector points in the direction of another? It is like shining a light from one vector onto a direction line.",
      "Scalar projection gives a signed length. Vector projection gives the actual vector component in the direction of the chosen vector.",
      "The denominator matters. Scalar projection divides by $|\\mathbf{b}|$, while vector projection divides by $|\\mathbf{b}|^2$ and then multiplies by $\\mathbf{b}$.",
      "In applications, a projection can describe the component of a force along a ramp or the part of velocity in a chosen direction.",
    ],
    latexBlocks: [
      "\\text{scalar projection of }\\mathbf{a}\\text{ on }\\mathbf{b}=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|}",
      "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|^2}\\mathbf{b}",
    ],
  },
  workedExamples: [
    {
      title: "Find a scalar projection",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}6\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}.\\quad \\text{Find the scalar projection of }\\mathbf{a}\\text{ on }\\mathbf{b}.",
      steps: [
        {
          explanation: "Find the dot product and the magnitude of the direction vector.",
          latex: "\\mathbf{a}\\cdot\\mathbf{b}=6(3)+2(4)=26,\\quad |\\mathbf{b}|=5",
        },
        {
          explanation:
            "Scalar projection is the signed length of a in the direction of b.",
          latex: "\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{b}|}=\\frac{26}{5}",
        },
      ],
      finalAnswerLatex: "\\frac{26}{5}",
    },
    {
      title: "Find a vector projection",
      questionLatex:
        "\\mathbf{a}=\\begin{pmatrix}6\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}.\\quad \\text{Find }\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}.",
      steps: [
        {
          explanation:
            "Use the same dot product, but divide by the square of the magnitude of b.",
          latex: "\\mathbf{a}\\cdot\\mathbf{b}=26,\\quad |\\mathbf{b}|^2=25",
        },
        {
          explanation:
            "Multiply the scalar factor by vector b to get a vector component.",
          latex:
            "\\operatorname{proj}_{\\mathbf{b}}\\mathbf{a}=\\frac{26}{25}\\begin{pmatrix}3\\\\4\\end{pmatrix}=\\begin{pmatrix}78/25\\\\104/25\\end{pmatrix}",
        },
      ],
      finalAnswerLatex: "\\begin{pmatrix}78/25\\\\104/25\\end{pmatrix}",
      vector2DDiagram: {
        description: "Vector a = (6, 2), direction vector b = (3, 4), and the projection of a onto the b-direction shown from the origin.",
        xMin: -0.5, xMax: 7, yMin: -0.5, yMax: 5,
        vectors: [
          { to: { x: 6, y: 2 }, label: "a", color: "violet" },
          { to: { x: 3, y: 4 }, label: "b", color: "blue" },
          { to: { x: 78 / 25, y: 104 / 25 }, label: "proj_b(a)", color: "teal" },
        ],
        segments: [{ from: { x: 78 / 25, y: 104 / 25 }, to: { x: 6, y: 2 }, dashed: true, color: "amber" }],
      },
    },
    {
      title: "Resolve velocity into a direction",
      questionLatex:
        "\\text{A velocity is }\\mathbf{v}=\\begin{pmatrix}8\\\\6\\end{pmatrix}.\\text{ Find its component in the direction }\\mathbf{d}=\\begin{pmatrix}1\\\\0\\end{pmatrix}.",
      steps: [
        {
          explanation:
            "The direction vector points along the positive x-axis, so the projection measures the horizontal component.",
          latex:
            "\\frac{\\mathbf{v}\\cdot\\mathbf{d}}{|\\mathbf{d}|}=\\frac{8(1)+6(0)}{1}=8",
        },
        {
          explanation: "The component in that direction is 8 units per time unit.",
        },
      ],
      finalAnswerLatex: "8",
    },
  ],
  guidedPractice: [
    vectorTyped("y12e1-proj-g1", "Find the scalar projection of a on b.", "\\mathbf{a}=\\begin{pmatrix}4\\\\0\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}1\\\\0\\end{pmatrix}", "4", ["proj=4", "scalar projection=4"], "The whole vector a points in the direction of b."),
    vectorChoice("y12e1-proj-g2", "Vector projection gives:", "B", ["A signed length only", "A vector component", "A probability", "A perpendicularity test only"], "Vector projection keeps direction information."),
    vectorTyped("y12e1-proj-g3", "Find $|\\mathbf{b}|^2$.", "\\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}", "25", ["|b|^2=25"], "The magnitude is 5, so the squared magnitude is 25."),
    vectorChoice("y12e1-proj-g4", "A force component along a direction is found using:", "C", ["A histogram", "Completing the square", "Projection", "Sigma notation"], "Projection measures the part of a vector in a chosen direction."),
  ],
  independentPractice: [
    vectorTyped("y12e1-proj-i1", "Find the scalar projection of a on b.", "\\mathbf{a}=\\begin{pmatrix}2\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}1\\\\1\\end{pmatrix}", "2sqrt(2)", ["2\\sqrt{2}", "2√2"], "The dot product is 4 and |b| = sqrt(2), so the scalar projection is 4/sqrt(2) = 2sqrt(2)."),
    vectorTyped("y12e1-proj-i2", "Find the vector projection of a on b.", "\\mathbf{a}=\\begin{pmatrix}5\\\\0\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}1\\\\0\\end{pmatrix}", "(5,0)", ["(5, 0)", "5,0"], "The vector already points in the direction of b."),
    vectorChoice("y12e1-proj-i3", "A negative scalar projection means:", "D", ["The magnitude is negative", "The vector is zero", "The formula is invalid", "The component points opposite to the chosen direction"], "The sign tells whether the component aligns with or opposes the direction vector."),
    vectorTyped("y12e1-proj-i4", "Find the horizontal component of velocity.", "\\mathbf{v}=\\begin{pmatrix}7\\\\-3\\end{pmatrix},\\quad \\mathbf{d}=\\begin{pmatrix}1\\\\0\\end{pmatrix}", "7", ["horizontal component=7"], "Projection onto the x-axis gives the x-component."),
    vectorChoice("y12e1-proj-i5", "Which denominator belongs in vector projection?", "A", ["$|\\mathbf{b}|^2$", "$|\\mathbf{a}|^2$", "$|\\mathbf{a}|+|\\mathbf{b}|$", "$\\mathbf{a}\\cdot\\mathbf{b}$ only"], "Vector projection uses the squared length of the direction vector."),
  ],
  commonMistakes: [
    {
      mistake: "Mixing scalar projection and vector projection.",
      fix: "Scalar projection is a signed length; vector projection is a vector.",
    },
    {
      mistake: "Dividing vector projection by $|\\mathbf{b}|$ instead of $|\\mathbf{b}|^2$.",
      fix: "Use $|\\mathbf{b}|$ for scalar projection and $|\\mathbf{b}|^2$ for vector projection.",
    },
    {
      mistake: "Projecting onto the wrong vector.",
      fix: "The subscript or wording tells you the direction vector.",
    },
    {
      mistake: "Ignoring a negative projection.",
      fix: "A negative scalar projection means the component is in the opposite direction.",
    },
  ],
  masteryQuiz: [
    vectorTyped("y12e1-proj-m1", "Find the scalar projection of a on b.", "\\mathbf{a}=\\begin{pmatrix}3\\\\0\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}1\\\\0\\end{pmatrix}", "3", ["proj=3"], "The whole vector is along b."),
    vectorTyped("y12e1-proj-m2", "Find $\\mathbf{a}\\cdot\\mathbf{b}$.", "\\mathbf{a}=\\begin{pmatrix}6\\\\2\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}3\\\\4\\end{pmatrix}", "26", ["dot=26"], "6(3) + 2(4) = 26."),
    vectorChoice("y12e1-proj-m3", "Scalar projection returns:", "A", ["A signed scalar length", "Always a unit vector", "A matrix", "A probability"], "Scalar projection is one signed number."),
    vectorChoice("y12e1-proj-m4", "Vector projection returns:", "B", ["A percentage", "A vector", "A theorem", "A scalar only"], "It gives the actual vector component."),
    vectorTyped("y12e1-proj-m5", "Find $|\\mathbf{b}|^2$.", "\\mathbf{b}=\\begin{pmatrix}0\\\\5\\end{pmatrix}", "25", ["|b|^2=25"], "0^2 + 5^2 = 25."),
    vectorChoice("y12e1-proj-m6", "Which formula is scalar projection of a on b?", "C", ["$\\frac{a\\cdot b}{|b|^2}b$", "$a+b$", "$\\frac{a\\cdot b}{|b|}$", "$|a|+|b|$"], "Scalar projection divides the dot product by the length of the direction vector."),
    vectorChoice("y12e1-proj-m7", "Which formula is vector projection of a on b?", "D", ["$a\\cdot b$", "$|a||b|$", "$\\frac{a\\cdot b}{|b|}$", "$\\frac{a\\cdot b}{|b|^2}b$"], "Vector projection multiplies the scalar factor by b."),
    vectorTyped("y12e1-proj-m8", "Find the component of $(4,5)$ in the x-direction.", "\\mathbf{v}=\\begin{pmatrix}4\\\\5\\end{pmatrix},\\quad \\mathbf{d}=\\begin{pmatrix}1\\\\0\\end{pmatrix}", "4", ["x component=4"], "The x-direction projection is the x-component."),
    vectorChoice("y12e1-proj-m9", "In a force problem, projection helps find:", "A", ["The component of force in a chosen direction", "The median force", "The domain restriction", "The number of trials"], "Projection resolves a vector into a direction."),
    vectorChoice("y12e1-proj-m10", "What does a negative scalar projection tell you?", "B", ["The vector has no length", "The component points opposite to the chosen direction", "The angle is impossible", "The vector is a scalar"], "The sign gives direction along or against the chosen vector."),
  ],
  masteryQuizPool: [
    {
      ...vectorTyped(
        "y12e1-proj-pool-d5-1",
        "Find the scalar projection of a on b.",
        "\\mathbf{a}=\\begin{pmatrix}3\\\\4\\end{pmatrix},\\quad \\mathbf{b}=\\begin{pmatrix}1\\\\0\\end{pmatrix}",
        "3",
        ["proj=3"],
        "Scalar projection = a·b/|b| = (3·1 + 4·0)/1 = 3."
      ),
      difficulty: 5,
    },
  ],
};

export function year12Extension1VectorsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-extension-1" || unit.slug !== "vectors") {
    return null;
  }

  if (lesson.slug === "vectors-scalars-notation") {
    return vectorsScalarsNotation;
  }

  if (lesson.slug === "vector-addition-subtraction") {
    return vectorAdditionSubtraction;
  }

  if (lesson.slug === "dot-product") {
    return dotProduct;
  }

  if (lesson.slug === "vector-projections-applications") {
    return vectorProjectionsApplications;
  }

  return null;
}
