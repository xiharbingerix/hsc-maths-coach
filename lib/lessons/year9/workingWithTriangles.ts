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
>;

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
    hint: "Identify the given information, choose the matching method, then calculate carefully.",
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
  latex = "\\text{Select A, B, C, or D.}",
  triangleDiagram?: TriangleDiagram,
  cartesianGraph?: CartesianGraph
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer: value,
    hint: "Use the labelled information and choose the option that matches the method.",
    explanation,
    triangleDiagram,
    cartesianGraph,
  };
}

function triangle(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"],
  angleLabels: TriangleDiagram["angleLabels"] = {}
): TriangleDiagram {
  return {
    description,
    vertices: {
      A: { x: 80, y: 40 },
      C: { x: 80, y: 230 },
      B: { x: 330, y: 230 },
    },
    rightAngleAt: "C",
    sideLabels,
    angleLabels,
  };
}

function segmentGraph(
  description: string,
  from: { x: number; y: number; label: string },
  to: { x: number; y: number; label: string },
  domain = { xMin: -6, xMax: 6, yMin: -6, yMax: 6, xStep: 1, yStep: 1 }
): CartesianGraph {
  return {
    description,
    ...domain,
    points: [from, to],
    lineSegments: [{ from, to }],
  };
}

const hypotenuse: LessonContent = {
  description:
    "Use Pythagoras' theorem to find the hypotenuse of a right triangle and round decimal answers appropriately.",
  learningIntention:
    "Identify the hypotenuse and calculate it from the two shorter sides of a right triangle.",
  successCriteria: [
    "Identify the hypotenuse as the side opposite the right angle.",
    "Substitute shorter side lengths into a squared plus b squared equals c squared.",
    "Take the square root after adding the squares.",
    "Round non-integer lengths only when instructed.",
  ],
  teaching: {
    paragraphs: [
      "A right triangle contains one 90 degree angle. The hypotenuse is the side opposite that right angle, and it is always the longest side.",
      "Pythagoras' theorem connects the lengths of the three sides. Use c for the hypotenuse and a and b for the shorter sides.",
      "When both shorter sides are known, square them, add the results, then take the square root. Keep the calculator value until the final rounding step.",
    ],
    latexBlocks: [
      "a^2+b^2=c^2",
      "c=\\sqrt{a^2+b^2}",
      "3^2+4^2=25\\quad\\Rightarrow\\quad c=5",
    ],
  },
  workedExamples: [
    {
      title: "Use the 3-4-5 triangle",
      questionLatex: "\\text{Find the hypotenuse of a right triangle with shorter sides }3\\text{ cm and }4\\text{ cm.}",
      triangleDiagram: triangle("Right triangle with shorter sides 3 cm and 4 cm and unknown hypotenuse x.", { AC: "3 cm", BC: "4 cm", AB: "x" }),
      steps: [
        { explanation: "The unknown is opposite the right angle, so it is the hypotenuse.", latex: "x^2=3^2+4^2" },
        { explanation: "Add the squares, then take the square root.", latex: "x=\\sqrt{9+16}=\\sqrt{25}=5" },
      ],
      finalAnswerLatex: "5\\text{ cm}",
    },
    {
      title: "Use the 5-12-13 triangle",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }5\\text{ m and }12\\text{ m.}",
      steps: [
        { explanation: "Substitute the two shorter sides.", latex: "c=\\sqrt{5^2+12^2}" },
        { explanation: "Evaluate the square root.", latex: "c=\\sqrt{25+144}=\\sqrt{169}=13" },
      ],
      finalAnswerLatex: "13\\text{ m}",
    },
    {
      title: "Round a decimal length",
      questionLatex: "\\text{Find the hypotenuse when the shorter sides are }6\\text{ cm and }8.5\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Add the squares before taking the square root.", latex: "c=\\sqrt{6^2+8.5^2}=\\sqrt{108.25}" },
        { explanation: "Round only the final calculator value.", latex: "c\\approx10.404\\ldots\\approx10.4" },
      ],
      finalAnswerLatex: "10.4\\text{ cm}",
    },
  ],
  guidedPractice: [
    answer("y9-tri-hyp-g1", "Find the hypotenuse in centimetres.", "\\text{shorter sides: }6\\text{ cm and }8\\text{ cm}", "10", "The square root of 36 + 64 is 10.", ["10 cm"], triangle("Right triangle with shorter sides 6 cm and 8 cm and unknown hypotenuse x.", { AC: "6 cm", BC: "8 cm", AB: "x" })),
    choice("y9-tri-hyp-g2", "Which side is the hypotenuse?", "C", ["The shortest side", "A side touching the right angle", "The side opposite the right angle", "Any side labelled a"], "The hypotenuse is opposite the right angle."),
    answer("y9-tri-hyp-g3", "Find the hypotenuse in metres.", "\\text{shorter sides: }9\\text{ m and }12\\text{ m}", "15", "The square root of 81 + 144 is 15.", ["15 m"]),
    answer("y9-tri-hyp-g4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "\\text{shorter sides: }4\\text{ cm and }7\\text{ cm}", "8.1", "The square root of 65 is approximately 8.1.", ["8.1 cm"]),
  ],
  independentPractice: [
    answer("y9-tri-hyp-i1", "Find the hypotenuse in millimetres.", "\\text{shorter sides: }8\\text{ mm and }15\\text{ mm}", "17", "The square root of 64 + 225 is 17.", ["17 mm"]),
    answer("y9-tri-hyp-i2", "Find the hypotenuse in metres. Round to 1 decimal place.", "\\text{shorter sides: }5\\text{ m and }9\\text{ m}", "10.3", "The square root of 106 is approximately 10.3.", ["10.3 m"]),
    choice("y9-tri-hyp-i3", "Which setup finds the hypotenuse x?", "B", ["$x=7^2+24^2$", "$x=\\sqrt{7^2+24^2}$", "$x=\\sqrt{24^2-7^2}$", "$x=7+24$"], "Add the squares and then take the square root.", "\\text{shorter sides: }7\\text{ and }24"),
    answer("y9-tri-hyp-i4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "\\text{shorter sides: }7.2\\text{ cm and }9.5\\text{ cm}", "11.9", "The square root of 7.2 squared plus 9.5 squared is approximately 11.9.", ["11.9 cm"]),
    choice("y9-tri-hyp-i5", "Why must the hypotenuse be the longest side?", "D", ["It is always drawn horizontally", "It has the first letter alphabetically", "It touches every angle", "It is opposite the largest angle, the right angle"], "The side opposite the 90 degree angle is longest."),
  ],
  commonMistakes: [
    { mistake: "Choosing a shorter side as the hypotenuse.", fix: "Find the right-angle marker first. The opposite side is the hypotenuse." },
    { mistake: "Adding lengths before squaring.", fix: "Square each shorter side separately, then add." },
    { mistake: "Forgetting the final square root.", fix: "After finding c squared, take the square root to find c." },
    { mistake: "Rounding intermediate values too early.", fix: "Keep the calculator value and round the final length only." },
  ],
  masteryQuiz: [
    answer("y9-tri-hyp-m1", "Find the hypotenuse in centimetres.", "\\text{shorter sides: }3\\text{ cm and }4\\text{ cm}", "5", "This is a 3-4-5 triangle.", ["5 cm"]),
    answer("y9-tri-hyp-m2", "Find the hypotenuse in metres.", "\\text{shorter sides: }5\\text{ m and }12\\text{ m}", "13", "This is a 5-12-13 triangle.", ["13 m"]),
    choice("y9-tri-hyp-m3", "Which labelled side is the hypotenuse?", "A", ["AB", "AC", "BC", "There is no hypotenuse"], "AB is opposite the right angle at C.", "\\text{Use the diagram.}", triangle("Right triangle ABC with right angle at C.", { AB: "AB", AC: "AC", BC: "BC" })),
    answer("y9-tri-hyp-m4", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "\\text{shorter sides: }6\\text{ cm and }7\\text{ cm}", "9.2", "The square root of 85 is approximately 9.2.", ["9.2 cm"]),
    answer("y9-tri-hyp-m5", "Find the hypotenuse in kilometres.", "\\text{shorter sides: }20\\text{ km and }21\\text{ km}", "29", "The square root of 841 is 29.", ["29 km"]),
    choice("y9-tri-hyp-m6", "Which calculation is correct for shorter sides 10 and 11?", "C", ["$\\sqrt{11^2-10^2}$", "$10+11$", "$\\sqrt{10^2+11^2}$", "$10^2+11^2$"], "A hypotenuse uses the square root of the sum of squares."),
    answer("y9-tri-hyp-m7", "Find the hypotenuse in centimetres. Round to 1 decimal place.", "\\text{shorter sides: }2.5\\text{ cm and }6.8\\text{ cm}", "7.2", "The square root of 52.49 is approximately 7.2.", ["7.2 cm"]),
    choice("y9-tri-hyp-m8", "A student calculates 9 + 16 = 25 for sides 3 and 4, then answers 25 cm. What step is missing?", "B", ["Subtract the squares", "Take the square root", "Double the result", "Round to a whole number"], "The calculation found c squared, so a square root is still needed."),
    answer("y9-tri-hyp-m9", "A rectangular screen is 48 cm wide and 90 cm high. Find its diagonal length in centimetres.", "\\text{rectangle dimensions: }48\\text{ cm by }90\\text{ cm}", "102", "The diagonal is the hypotenuse: the square root of 48 squared plus 90 squared is 102.", ["102 cm"]),
    answer("y9-tri-hyp-m10", "Find the hypotenuse in metres. Round to 2 decimal places.", "\\text{shorter sides: }11.4\\text{ m and }13.7\\text{ m}", "17.82", "The square root of 11.4 squared plus 13.7 squared is approximately 17.82.", ["17.82 m"]),
  ],
};

const shorterSide: LessonContent = {
  description:
    "Use Pythagoras' theorem to calculate a shorter side when the hypotenuse and one shorter side are known.",
  learningIntention:
    "Rearrange Pythagoras' theorem to find an unknown shorter side.",
  successCriteria: [
    "Check that the known longest side is the hypotenuse.",
    "Subtract the known shorter-side square from the hypotenuse square.",
    "Take the square root after subtracting.",
    "Use units and final-answer rounding appropriately.",
  ],
  teaching: {
    paragraphs: [
      "When the unknown is a shorter side, start with the hypotenuse square and subtract the square of the known shorter side.",
      "The hypotenuse must be known before this method can be used. It is the side opposite the right angle and should be longer than the shorter side.",
      "Subtract the squares first, then take the square root. A common error is to subtract the side lengths before squaring.",
    ],
    latexBlocks: ["a^2+b^2=c^2", "b=\\sqrt{c^2-a^2}", "b=\\sqrt{13^2-5^2}=12"],
  },
  workedExamples: [
    {
      title: "Use a 5-12-13 triangle",
      questionLatex: "\\text{The hypotenuse is }13\\text{ cm and one shorter side is }5\\text{ cm. Find the other shorter side.}",
      triangleDiagram: triangle("Right triangle with hypotenuse 13 cm, one shorter side 5 cm and unknown shorter side x.", { AB: "13 cm", AC: "5 cm", BC: "x" }),
      steps: [
        { explanation: "Subtract the known shorter-side square from the hypotenuse square.", latex: "x^2=13^2-5^2" },
        { explanation: "Take the square root.", latex: "x=\\sqrt{169-25}=\\sqrt{144}=12" },
      ],
      finalAnswerLatex: "12\\text{ cm}",
    },
    {
      title: "Use a 6-8-10 triangle",
      questionLatex: "\\text{A hypotenuse is }10\\text{ m and a shorter side is }6\\text{ m. Find the other shorter side.}",
      steps: [
        { explanation: "Start with the hypotenuse square.", latex: "x=\\sqrt{10^2-6^2}" },
        { explanation: "Subtract, then take the square root.", latex: "x=\\sqrt{100-36}=8" },
      ],
      finalAnswerLatex: "8\\text{ m}",
    },
    {
      title: "Model a ladder against a wall",
      questionLatex: "\\text{A }7\\text{ m ladder reaches a wall. Its base is }2\\text{ m from the wall. Find the height reached, rounded to 1 decimal place.}",
      steps: [
        { explanation: "The ladder is the hypotenuse.", latex: "h=\\sqrt{7^2-2^2}" },
        { explanation: "Round the final value.", latex: "h=\\sqrt{45}\\approx6.7" },
      ],
      finalAnswerLatex: "6.7\\text{ m}",
    },
  ],
  guidedPractice: [
    answer("y9-tri-short-g1", "Find the unknown shorter side in centimetres.", "\\text{hypotenuse: }13\\text{ cm, known shorter side: }5\\text{ cm}", "12", "Subtract 25 from 169 and take the square root.", ["12 cm"], triangle("Right triangle with hypotenuse 13 cm, shorter side 5 cm and unknown shorter side x.", { AB: "13 cm", AC: "5 cm", BC: "x" })),
    answer("y9-tri-short-g2", "Find the unknown shorter side in metres.", "\\text{hypotenuse: }10\\text{ m, known shorter side: }6\\text{ m}", "8", "Subtract 36 from 100 and take the square root.", ["8 m"]),
    choice("y9-tri-short-g3", "Which setup finds an unknown shorter side x?", "D", ["$x=13^2+5^2$", "$x=13-5$", "$x=\\sqrt{13^2+5^2}$", "$x=\\sqrt{13^2-5^2}$"], "Subtract the shorter-side square from the hypotenuse square."),
    answer("y9-tri-short-g4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "\\text{hypotenuse: }9\\text{ cm, known shorter side: }4\\text{ cm}", "8.1", "The square root of 65 is approximately 8.1.", ["8.1 cm"]),
  ],
  independentPractice: [
    answer("y9-tri-short-i1", "Find the unknown shorter side in millimetres.", "\\text{hypotenuse: }17\\text{ mm, known shorter side: }8\\text{ mm}", "15", "The square root of 289 - 64 is 15.", ["15 mm"]),
    answer("y9-tri-short-i2", "Find the unknown shorter side in metres. Round to 1 decimal place.", "\\text{hypotenuse: }12\\text{ m, known shorter side: }7\\text{ m}", "9.7", "The square root of 95 is approximately 9.7.", ["9.7 m"]),
    choice("y9-tri-short-i3", "Which given length must be the hypotenuse before subtraction can be used?", "A", ["The side opposite the right angle", "The vertical side", "The side with the smallest label", "The unknown side"], "The theorem must subtract from the hypotenuse square."),
    answer("y9-tri-short-i4", "A 15 m ladder stands 9 m from a wall. Find the height reached in metres.", "\\text{ladder: }15\\text{ m, base distance: }9\\text{ m}", "12", "The ladder is the hypotenuse, so the height is the square root of 225 - 81.", ["12 m"]),
    choice("y9-tri-short-i5", "Why is square root of 8 squared minus 10 squared not a valid shorter-side setup?", "C", ["The answer should be added", "Eight is not squared", "The hypotenuse square must come first and be the larger value", "Square roots are not used"], "Subtract from the longer hypotenuse square."),
  ],
  commonMistakes: [
    { mistake: "Adding squares for an unknown shorter side.", fix: "Subtract the known shorter-side square from the hypotenuse square." },
    { mistake: "Subtracting lengths before squaring.", fix: "Use c squared minus a squared, then take the square root." },
    { mistake: "Treating the shorter known side as the hypotenuse.", fix: "Find the side opposite the right angle before substituting." },
    { mistake: "Ignoring an impossible negative result.", fix: "A negative value under the square root signals that the hypotenuse was not identified correctly." },
  ],
  masteryQuiz: [
    answer("y9-tri-short-m1", "Find the unknown shorter side in centimetres.", "\\text{hypotenuse: }10\\text{ cm, known shorter side: }6\\text{ cm}", "8", "The square root of 64 is 8.", ["8 cm"]),
    answer("y9-tri-short-m2", "Find the unknown shorter side in metres.", "\\text{hypotenuse: }25\\text{ m, known shorter side: }7\\text{ m}", "24", "The square root of 625 - 49 is 24.", ["24 m"]),
    choice("y9-tri-short-m3", "Which operation comes immediately before taking the square root?", "B", ["Add the side lengths", "Subtract the squared lengths", "Divide the side lengths", "Round the hypotenuse"], "For an unknown shorter side, subtract the squares."),
    answer("y9-tri-short-m4", "Find the unknown shorter side in centimetres. Round to 1 decimal place.", "\\text{hypotenuse: }14\\text{ cm, known shorter side: }9\\text{ cm}", "10.7", "The square root of 115 is approximately 10.7.", ["10.7 cm"]),
    answer("y9-tri-short-m5", "A 13 m ladder stands 5 m from a wall. Find the height reached in metres.", "\\text{ladder: }13\\text{ m, base distance: }5\\text{ m}", "12", "The square root of 169 - 25 is 12.", ["12 m"]),
    choice("y9-tri-short-m6", "Which side label is the unknown shorter side in the displayed triangle?", "C", ["AB", "AC", "The side labelled x", "The right-angle marker"], "The diagram labels the unknown shorter side as x.", "\\text{Use the diagram.}", triangle("Right triangle with hypotenuse 17 and unknown shorter side x.", { AB: "17", AC: "8", BC: "x" })),
    answer("y9-tri-short-m7", "Find the unknown shorter side in metres. Round to 2 decimal places.", "\\text{hypotenuse: }18\\text{ m, known shorter side: }11\\text{ m}", "14.25", "The square root of 203 is approximately 14.25.", ["14.25 m"]),
    choice("y9-tri-short-m8", "A student uses square root of 6 squared minus 10 squared for a triangle with sides 6 and 10. What correction is needed?", "A", ["Use $\\sqrt{10^2-6^2}$", "Use $\\sqrt{10^2+6^2}$", "Use $10-6$", "Use $6^2+10^2$"], "The larger hypotenuse square comes first."),
    answer("y9-tri-short-m9", "A rectangular park has diagonal 26 m and width 10 m. Find its length in metres.", "\\text{diagonal: }26\\text{ m, width: }10\\text{ m}", "24", "The rectangle side is the square root of 676 - 100.", ["24 m"]),
    answer("y9-tri-short-m10", "A guy rope is 9.5 m long and reaches the ground 3.2 m from a pole. Find the vertical height in metres. Round to 1 decimal place.", "\\text{rope: }9.5\\text{ m, ground distance: }3.2\\text{ m}", "8.9", "The height is the square root of 9.5 squared minus 3.2 squared, rounded to 1 decimal place.", ["8.9 m"]),
  ],
};

const applications: LessonContent = {
  description:
    "Model practical right-triangle problems, decide whether to add or subtract squares, and report sensible units and rounding.",
  learningIntention:
    "Choose and apply the correct Pythagoras setup in worded contexts.",
  successCriteria: [
    "Sketch or identify the right triangle in a context.",
    "Decide whether the unknown is the hypotenuse or a shorter side.",
    "Choose addition or subtraction of squares correctly.",
    "Include units and round only when required.",
  ],
  teaching: {
    paragraphs: [
      "Many practical problems hide a right triangle inside a rectangle, ladder, ramp or coordinate grid. Start by identifying the right angle and labelling the known lengths.",
      "If the unknown lies opposite the right angle, find a hypotenuse by adding squares. If the unknown is a shorter side and the hypotenuse is known, subtract squares.",
      "A final answer needs the unit from the context. For calculator decimals, follow the stated rounding instruction rather than rounding early.",
    ],
    latexBlocks: [
      "\\text{unknown hypotenuse: }c=\\sqrt{a^2+b^2}",
      "\\text{unknown shorter side: }b=\\sqrt{c^2-a^2}",
    ],
  },
  workedExamples: [
    {
      title: "Find a rectangle diagonal",
      questionLatex: "\\text{A rectangle is }8\\text{ m by }15\\text{ m. Find its diagonal.}",
      steps: [
        { explanation: "The diagonal is the hypotenuse of a right triangle.", latex: "d=\\sqrt{8^2+15^2}" },
        { explanation: "Evaluate.", latex: "d=\\sqrt{289}=17" },
      ],
      finalAnswerLatex: "17\\text{ m}",
    },
    {
      title: "Find a ramp height",
      questionLatex: "\\text{A ramp is }6.5\\text{ m long and covers }6\\text{ m horizontally. Find the rise, rounded to 1 decimal place.}",
      steps: [
        { explanation: "The ramp is the hypotenuse.", latex: "h=\\sqrt{6.5^2-6^2}" },
        { explanation: "Round the final result.", latex: "h=\\sqrt{6.25}=2.5" },
      ],
      finalAnswerLatex: "2.5\\text{ m}",
    },
    {
      title: "Use coordinate changes as triangle sides",
      questionLatex: "\\text{Find the distance between }(1,2)\\text{ and }(7,10).",
      cartesianGraph: segmentGraph("Coordinate plane showing segment AB from A one comma two to B seven comma ten.", { x: 1, y: 2, label: "A(1, 2)" }, { x: 7, y: 10, label: "B(7, 10)" }, { xMin: 0, xMax: 8, yMin: 0, yMax: 11, xStep: 1, yStep: 1 }),
      steps: [
        { explanation: "The horizontal and vertical changes form shorter sides.", latex: "\\Delta x=6,\\quad\\Delta y=8" },
        { explanation: "Use Pythagoras.", latex: "d=\\sqrt{6^2+8^2}=10" },
      ],
      finalAnswerLatex: "10\\text{ units}",
    },
  ],
  guidedPractice: [
    answer("y9-tri-app-g1", "A rectangle is 6 cm by 8 cm. Find its diagonal in centimetres.", "\\text{rectangle: }6\\text{ cm by }8\\text{ cm}", "10", "The diagonal is the hypotenuse.", ["10 cm"]),
    choice("y9-tri-app-g2", "A ladder leans against a wall. Which length is the hypotenuse?", "B", ["The wall height", "The ladder", "The ground distance", "The right angle"], "The ladder lies opposite the right angle between wall and ground."),
    answer("y9-tri-app-g3", "A ramp is 5 m long and covers 4 m horizontally. Find its rise in metres.", "\\text{ramp: }5\\text{ m, horizontal distance: }4\\text{ m}", "3", "The rise is the square root of 25 - 16.", ["3 m"]),
    choice("y9-tri-app-g4", "Which setup finds the diagonal of a 9 cm by 12 cm rectangle?", "C", ["$\\sqrt{12^2-9^2}$", "$9+12$", "$\\sqrt{9^2+12^2}$", "$12-9$"], "A rectangle diagonal is a hypotenuse."),
  ],
  independentPractice: [
    answer("y9-tri-app-i1", "A square has side length 5 cm. Find its diagonal in centimetres. Round to 1 decimal place.", "\\text{square side: }5\\text{ cm}", "7.1", "The diagonal is the square root of 50.", ["7.1 cm"]),
    answer("y9-tri-app-i2", "A 10 m rope reaches the top of a pole from a point 6 m away. Find the pole height in metres.", "\\text{rope: }10\\text{ m, ground distance: }6\\text{ m}", "8", "The pole height is the square root of 100 - 36.", ["8 m"]),
    choice("y9-tri-app-i3", "A right-triangle context gives a known hypotenuse and asks for a shorter side. Which operation is needed?", "D", ["Add lengths", "Multiply lengths", "Add squares", "Subtract squares before taking the square root"], "An unknown shorter side uses subtraction."),
    answer("y9-tri-app-i4", "Find the distance between the points in units.", "\\text{points: }(0,0)\\text{ and }(5,12)", "13", "The coordinate changes are 5 and 12.", ["13 units"]),
    answer("y9-tri-app-i5", "A rectangular garden is 7 m wide and has diagonal 25 m. Find its length in metres.", "\\text{width: }7\\text{ m, diagonal: }25\\text{ m}", "24", "The length is the square root of 625 - 49.", ["24 m"]),
  ],
  commonMistakes: [
    { mistake: "Using every number without identifying its role.", fix: "Label the right triangle before choosing a calculation." },
    { mistake: "Adding squares when a shorter side is unknown.", fix: "If the hypotenuse is known, subtract the known shorter-side square." },
    { mistake: "Omitting units.", fix: "Return to the context and attach cm, m or coordinate units." },
    { mistake: "Using trigonometry when no angle is needed.", fix: "Pythagoras is enough when two side lengths determine the third." },
  ],
  masteryQuiz: [
    answer("y9-tri-app-m1", "A rectangle is 5 cm by 12 cm. Find its diagonal in centimetres.", "\\text{rectangle: }5\\text{ cm by }12\\text{ cm}", "13", "The diagonal is a hypotenuse.", ["13 cm"]),
    answer("y9-tri-app-m2", "A ladder is 10 m long and stands 8 m from a wall. Find the height reached in metres.", "\\text{ladder: }10\\text{ m, ground distance: }8\\text{ m}", "6", "The height is the square root of 100 - 64.", ["6 m"]),
    choice("y9-tri-app-m3", "Which word usually signals a rectangle hypotenuse?", "A", ["Diagonal", "Perimeter", "Area", "Parallel"], "A rectangle diagonal spans a right triangle."),
    answer("y9-tri-app-m4", "A square has side length 9 m. Find its diagonal in metres. Round to 1 decimal place.", "\\text{square side: }9\\text{ m}", "12.7", "The square root of 162 is approximately 12.7.", ["12.7 m"]),
    answer("y9-tri-app-m5", "Find the distance between the points in units.", "\\text{points: }(2,3)\\text{ and }(10,9)", "10", "The coordinate changes are 8 and 6.", ["10 units"]),
    choice("y9-tri-app-m6", "A ramp length and horizontal distance are known. Which is the ramp length?", "B", ["A shorter side", "The hypotenuse", "The right angle", "The vertical axis"], "The sloping ramp is opposite the right angle."),
    answer("y9-tri-app-m7", "A television screen is 72 cm wide and 54 cm high. Find its diagonal in centimetres.", "\\text{screen: }72\\text{ cm by }54\\text{ cm}", "90", "The diagonal is the square root of 72 squared plus 54 squared.", ["90 cm"]),
    choice("y9-tri-app-m8", "A student finds a wall height from a ladder problem by adding the squares of ladder length and ground distance. What should change?", "C", ["Use area instead", "Round first", "Subtract the ground-distance square from the ladder square", "Add the side lengths"], "The ladder is the hypotenuse."),
    answer("y9-tri-app-m9", "A support cable is 14.2 m long and reaches a point 8.5 m horizontally from a post. Find the post height in metres. Round to 1 decimal place.", "\\text{cable: }14.2\\text{ m, horizontal distance: }8.5\\text{ m}", "11.4", "The square root of 14.2 squared minus 8.5 squared is approximately 11.4.", ["11.4 m"]),
    answer("y9-tri-app-m10", "A rectangle has diagonal 20.5 cm and width 12.3 cm. Find its length in centimetres. Round to 1 decimal place.", "\\text{diagonal: }20.5\\text{ cm, width: }12.3\\text{ cm}", "16.4", "The square root of 20.5 squared minus 12.3 squared is 16.4.", ["16.4 cm"]),
  ],
};

const ratios: LessonContent = {
  description:
    "Identify opposite, adjacent and hypotenuse sides relative to an acute angle and choose sine, cosine or tangent.",
  learningIntention:
    "Use SOH CAH TOA to write trigonometric ratios for right triangles.",
  successCriteria: [
    "Identify the hypotenuse independently of the reference angle.",
    "Identify opposite and adjacent sides relative to a marked acute angle.",
    "Write sine, cosine and tangent ratios.",
    "Choose the ratio that connects the given and required sides.",
  ],
  teaching: {
    paragraphs: [
      "Right-triangle trigonometry compares side lengths relative to one acute reference angle. Never use the right angle as the reference angle.",
      "The hypotenuse is always opposite the right angle. The opposite side is across from the reference angle. The adjacent side touches the reference angle but is not the hypotenuse.",
      "SOH CAH TOA is a memory aid: sine uses opposite over hypotenuse, cosine uses adjacent over hypotenuse, and tangent uses opposite over adjacent.",
    ],
    latexBlocks: [
      "\\sin\\theta=\\frac{\\text{opposite}}{\\text{hypotenuse}}",
      "\\cos\\theta=\\frac{\\text{adjacent}}{\\text{hypotenuse}}",
      "\\tan\\theta=\\frac{\\text{opposite}}{\\text{adjacent}}",
    ],
  },
  workedExamples: [
    {
      title: "Label sides relative to theta",
      questionLatex: "\\text{Label the sides relative to angle }\\theta\\text{ at }A.",
      triangleDiagram: triangle("Right triangle with theta at A and right angle at C.", { AB: "hypotenuse", AC: "adjacent", BC: "opposite" }, { A: "theta" }),
      steps: [
        { explanation: "AB is opposite the right angle, so it is the hypotenuse." },
        { explanation: "BC is across from theta, while AC touches theta and is not the hypotenuse." },
      ],
      finalAnswerLatex: "\\text{hyp: }AB,\\quad\\text{opp: }BC,\\quad\\text{adj: }AC",
    },
    {
      title: "Write all three ratios",
      questionLatex: "\\text{Relative to }\\theta,\\text{ the opposite side is }4,\\text{ adjacent side is }3\\text{ and hypotenuse is }5.\\text{ Write the ratios.}",
      steps: [
        { explanation: "Use SOH CAH TOA.", latex: "\\sin\\theta=\\frac45,\\quad\\cos\\theta=\\frac35,\\quad\\tan\\theta=\\frac43" },
      ],
      finalAnswerLatex: "\\sin\\theta=\\frac45,\\quad\\cos\\theta=\\frac35,\\quad\\tan\\theta=\\frac43",
    },
    {
      title: "Choose a ratio",
      questionLatex: "\\text{Choose a ratio when the opposite and adjacent sides are involved.}",
      steps: [
        { explanation: "TOA links opposite and adjacent.", latex: "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}" },
      ],
      finalAnswerLatex: "\\tan\\theta",
    },
  ],
  guidedPractice: [
    choice("y9-tri-ratio-g1", "Which side is the hypotenuse?", "A", ["AB", "AC", "BC", "Angle A"], "AB is opposite the right angle at C.", "\\text{Use the diagram.}", triangle("Right triangle ABC with right angle at C.", { AB: "AB", AC: "AC", BC: "BC" })),
    choice("y9-tri-ratio-g2", "Relative to angle theta, which side is opposite?", "C", ["AB", "AC", "BC", "The right angle"], "BC lies across from angle theta.", "\\text{Use the diagram.}", triangle("Right triangle with theta at A.", { AB: "AB", AC: "AC", BC: "BC" }, { A: "theta" })),
    choice("y9-tri-ratio-g3", "Which ratio uses opposite and hypotenuse?", "B", ["Cosine", "Sine", "Tangent", "Pythagoras"], "SOH means sine is opposite over hypotenuse."),
    choice("y9-tri-ratio-g4", "Which ratio should be used when adjacent and hypotenuse are involved?", "D", ["Tangent", "Sine", "Gradient", "Cosine"], "CAH links adjacent and hypotenuse."),
  ],
  independentPractice: [
    choice("y9-tri-ratio-i1", "Relative to angle theta, which side is adjacent?", "B", ["AB", "AC", "BC", "No side"], "AC touches theta and is not the hypotenuse.", "\\text{Use the diagram.}", triangle("Right triangle with theta at A.", { AB: "AB", AC: "AC", BC: "BC" }, { A: "theta" })),
    choice("y9-tri-ratio-i2", "Which expression is tan theta?", "C", ["$\\frac{\\text{adj}}{\\text{hyp}}$", "$\\frac{\\text{opp}}{\\text{hyp}}$", "$\\frac{\\text{opp}}{\\text{adj}}$", "$\\frac{\\text{hyp}}{\\text{opp}}$"], "TOA gives opposite over adjacent."),
    choice("y9-tri-ratio-i3", "Which expression is cos theta?", "A", ["$\\frac{\\text{adj}}{\\text{hyp}}$", "$\\frac{\\text{opp}}{\\text{hyp}}$", "$\\frac{\\text{opp}}{\\text{adj}}$", "$\\frac{\\text{hyp}}{\\text{adj}}$"], "CAH gives adjacent over hypotenuse."),
    choice("y9-tri-ratio-i4", "Which angle must not be used as the trigonometric reference angle?", "D", ["An acute marked angle", "Angle theta", "An angle less than 90 degrees", "The right angle"], "SOH CAH TOA uses an acute reference angle."),
    choice("y9-tri-ratio-i5", "The opposite side is 6 and hypotenuse is 10. Which ratio statement is correct?", "B", ["$\\cos\\theta=\\frac{6}{10}$", "$\\sin\\theta=\\frac{6}{10}$", "$\\tan\\theta=\\frac{10}{6}$", "$\\sin\\theta=\\frac{10}{6}$"], "Sine uses opposite over hypotenuse."),
  ],
  commonMistakes: [
    { mistake: "Calling the side touching theta adjacent even when it is the hypotenuse.", fix: "Identify the hypotenuse first. Adjacent is the other touching side." },
    { mistake: "Using the right angle as theta.", fix: "Choose one acute angle as the reference angle." },
    { mistake: "Assuming opposite and adjacent never change.", fix: "They depend on the chosen reference angle." },
    { mistake: "Mixing the order in a ratio.", fix: "Use SOH CAH TOA to keep numerator and denominator in order." },
  ],
  masteryQuiz: [
    choice("y9-tri-ratio-m1", "Which side is always opposite the right angle?", "C", ["Adjacent", "Opposite relative to theta", "Hypotenuse", "Shortest side"], "The hypotenuse is defined by its position opposite the right angle."),
    choice("y9-tri-ratio-m2", "Which ratio is opposite over adjacent?", "A", ["Tangent", "Cosine", "Sine", "Distance"], "TOA means tangent equals opposite over adjacent."),
    choice("y9-tri-ratio-m3", "Which ratio is adjacent over hypotenuse?", "D", ["Tangent", "Sine", "Gradient", "Cosine"], "CAH means cosine equals adjacent over hypotenuse."),
    choice("y9-tri-ratio-m4", "Relative to theta at A, identify the adjacent side.", "B", ["AB", "AC", "BC", "Angle C"], "AC touches theta and is not the hypotenuse.", "\\text{Use the diagram.}", triangle("Right triangle with theta at A.", { AB: "AB", AC: "AC", BC: "BC" }, { A: "theta" })),
    choice("y9-tri-ratio-m5", "The adjacent side is 8 and hypotenuse is 10. Which statement is correct?", "C", ["$\\sin\\theta=\\frac{8}{10}$", "$\\tan\\theta=\\frac{8}{10}$", "$\\cos\\theta=\\frac{8}{10}$", "$\\cos\\theta=\\frac{10}{8}$"], "Cosine uses adjacent over hypotenuse."),
    choice("y9-tri-ratio-m6", "The opposite side is 9 and adjacent side is 12. Which statement is correct?", "A", ["$\\tan\\theta=\\frac{9}{12}$", "$\\sin\\theta=\\frac{9}{12}$", "$\\cos\\theta=\\frac{12}{9}$", "$\\tan\\theta=\\frac{12}{9}$"], "Tangent uses opposite over adjacent."),
    choice("y9-tri-ratio-m7", "Which ratio connects x and 15 in the diagram?", "B", ["Cosine", "Sine", "Tangent", "Midpoint"], "x is opposite theta and 15 is the hypotenuse.", "\\text{Use the diagram.}", triangle("Right triangle with theta at A, hypotenuse 15 and opposite side x.", { AB: "15", BC: "x" }, { A: "theta" })),
    choice("y9-tri-ratio-m8", "A student labels BC adjacent to theta at A. What is the correction?", "D", ["BC is the hypotenuse", "BC touches theta", "AC is opposite", "BC is opposite because it does not touch A"], "BC lies across from theta.", "\\text{Use the diagram.}", triangle("Right triangle with theta at A.", { AB: "AB", AC: "AC", BC: "BC" }, { A: "theta" })),
    choice("y9-tri-ratio-m9", "The reference angle changes from A to B. Which statement is safest?", "C", ["The hypotenuse changes", "Every side name stays unchanged", "Opposite and adjacent swap roles while the hypotenuse stays fixed", "The right angle moves"], "The hypotenuse is fixed, but opposite and adjacent depend on the reference angle."),
    choice("y9-tri-ratio-m10", "Which ratio should be selected to find an adjacent side from a known opposite side and angle?", "A", ["Tangent", "Cosine", "Sine", "Pythagoras only"], "Tangent connects opposite and adjacent."),
  ],
};

const findingSides: LessonContent = {
  description:
    "Use sine, cosine and tangent in degree mode to calculate unknown sides in right triangles.",
  learningIntention:
    "Choose a trigonometric ratio and calculate an unknown side length.",
  successCriteria: [
    "Label sides relative to the marked acute angle.",
    "Choose sine, cosine or tangent from the known and unknown sides.",
    "Rearrange a simple trigonometric equation.",
    "Use degree mode and round final lengths to 1 decimal place when instructed.",
  ],
  teaching: {
    paragraphs: [
      "Start every right-triangle trigonometry question by labelling the hypotenuse, opposite and adjacent sides relative to the marked acute angle.",
      "Choose the ratio containing the known side and the unknown side. Then substitute the known values and rearrange if needed.",
      "Check that your calculator is in degree mode. Keep the calculator value until the end and round the final length as instructed.",
    ],
    latexBlocks: [
      "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}",
      "\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}}",
      "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}",
    ],
  },
  workedExamples: [
    {
      title: "Find an opposite side",
      questionLatex: "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: triangle("Right triangle with theta 35 degrees at A, hypotenuse 10 and unknown opposite side x.", { AB: "10", BC: "x" }, { A: "35 degrees" }),
      steps: [
        { explanation: "Opposite and hypotenuse require sine.", latex: "\\sin35^\\circ=\\frac{x}{10}" },
        { explanation: "Multiply by 10 and round.", latex: "x=10\\sin35^\\circ\\approx5.7" },
      ],
      finalAnswerLatex: "5.7",
    },
    {
      title: "Find an adjacent side",
      questionLatex: "\\text{A hypotenuse is }14\\text{ cm and the marked angle is }42^\\circ.\\text{ Find the adjacent side to 1 decimal place.}",
      steps: [
        { explanation: "Adjacent and hypotenuse require cosine.", latex: "\\cos42^\\circ=\\frac{x}{14}" },
        { explanation: "Multiply by 14.", latex: "x=14\\cos42^\\circ\\approx10.4" },
      ],
      finalAnswerLatex: "10.4\\text{ cm}",
    },
    {
      title: "Find a hypotenuse",
      questionLatex: "\\text{An opposite side is }8\\text{ m and the marked angle is }30^\\circ.\\text{ Find the hypotenuse.}",
      steps: [
        { explanation: "Opposite and hypotenuse require sine.", latex: "\\sin30^\\circ=\\frac{8}{h}" },
        { explanation: "Divide by sine 30 degrees.", latex: "h=\\frac{8}{\\sin30^\\circ}=16" },
      ],
      finalAnswerLatex: "16\\text{ m}",
    },
  ],
  guidedPractice: [
    answer("y9-tri-side-g1", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }12,\\quad\\theta=30^\\circ,\\quad x\\text{ is opposite}", "6.0", "Use x = 12 sin 30 degrees.", ["6", "6.0 units"], triangle("Right triangle with angle 30 degrees, hypotenuse 12 and unknown opposite x.", { AB: "12", BC: "x" }, { A: "30 degrees" })),
    answer("y9-tri-side-g2", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }10,\\quad\\theta=60^\\circ,\\quad x\\text{ is adjacent}", "5.0", "Use x = 10 cos 60 degrees.", ["5", "5.0 units"]),
    choice("y9-tri-side-g3", "Which equation finds an opposite side x from adjacent side 7 and angle 40 degrees?", "C", ["$x=7\\cos40^\\circ$", "$x=\\frac{7}{\\tan40^\\circ}$", "$x=7\\tan40^\\circ$", "$x=\\frac{7}{\\sin40^\\circ}$"], "Tangent connects opposite and adjacent."),
    answer("y9-tri-side-g4", "Find x. Round to 1 decimal place.", "\\text{adjacent }9,\\quad\\theta=45^\\circ,\\quad x\\text{ is opposite}", "9.0", "Use x = 9 tan 45 degrees.", ["9", "9.0 units"]),
  ],
  independentPractice: [
    answer("y9-tri-side-i1", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }15,\\quad\\theta=28^\\circ,\\quad x\\text{ is opposite}", "7.0", "Use x = 15 sin 28 degrees.", ["7", "7.0 units"]),
    answer("y9-tri-side-i2", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }18,\\quad\\theta=37^\\circ,\\quad x\\text{ is adjacent}", "14.4", "Use x = 18 cos 37 degrees.", ["14.4 units"]),
    answer("y9-tri-side-i3", "Find x. Round to 1 decimal place.", "\\text{adjacent }11,\\quad\\theta=52^\\circ,\\quad x\\text{ is opposite}", "14.1", "Use x = 11 tan 52 degrees.", ["14.1 units"]),
    choice("y9-tri-side-i4", "Which calculator setting is required for these angle questions?", "B", ["Radians", "Degrees", "Scientific notation only", "Statistics mode"], "The angles are measured in degrees."),
    answer("y9-tri-side-i5", "Find the hypotenuse x. Round to 1 decimal place.", "\\text{opposite }7,\\quad\\theta=34^\\circ", "12.5", "Use x = 7 divided by sin 34 degrees.", ["12.5 units"]),
  ],
  commonMistakes: [
    { mistake: "Choosing a ratio before labelling sides.", fix: "Mark opposite, adjacent and hypotenuse relative to the given angle first." },
    { mistake: "Using radians on the calculator.", fix: "Check degree mode before calculating." },
    { mistake: "Multiplying when the unknown is in the denominator.", fix: "Rearrange carefully: if sin theta equals opposite over hypotenuse, divide the opposite by sin theta to find the hypotenuse." },
    { mistake: "Rounding the trigonometric value too early.", fix: "Enter the full calculator expression and round the final side length." },
  ],
  masteryQuiz: [
    answer("y9-tri-side-m1", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }20,\\quad\\theta=30^\\circ,\\quad x\\text{ is opposite}", "10.0", "Use sine.", ["10", "10.0 units"]),
    answer("y9-tri-side-m2", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }16,\\quad\\theta=60^\\circ,\\quad x\\text{ is adjacent}", "8.0", "Use cosine.", ["8", "8.0 units"]),
    choice("y9-tri-side-m3", "Which ratio connects the marked angle, x and side 9?", "D", ["Sine", "Cosine", "Pythagoras", "Tangent"], "x is opposite and 9 is adjacent.", "\\text{Use the diagram.}", triangle("Right triangle with angle 38 degrees, adjacent side 9 and unknown opposite x.", { AC: "9", BC: "x" }, { A: "38 degrees" })),
    answer("y9-tri-side-m4", "Find x. Round to 1 decimal place.", "\\text{adjacent }8,\\quad\\theta=41^\\circ,\\quad x\\text{ is opposite}", "7.0", "Use x = 8 tan 41 degrees.", ["7", "7.0 units"]),
    answer("y9-tri-side-m5", "Find the hypotenuse x. Round to 1 decimal place.", "\\text{adjacent }12,\\quad\\theta=50^\\circ", "18.7", "Use x = 12 divided by cos 50 degrees.", ["18.7 units"]),
    choice("y9-tri-side-m6", "Which expression finds a hypotenuse x when the opposite side is 5 and angle is 25 degrees?", "B", ["$5\\sin25^\\circ$", "$\\frac{5}{\\sin25^\\circ}$", "$5\\cos25^\\circ$", "$\\frac{\\sin25^\\circ}{5}$"], "Rearrange sine equals opposite over hypotenuse."),
    answer("y9-tri-side-m7", "Find x. Round to 1 decimal place.", "\\text{hypotenuse }22,\\quad\\theta=47^\\circ,\\quad x\\text{ is opposite}", "16.1", "Use x = 22 sin 47 degrees.", ["16.1 units"]),
    answer("y9-tri-side-m8", "A right-triangle ramp has horizontal run 4.8 m and angle 18 degrees. Find its rise in metres. Round to 1 decimal place.", "\\text{adjacent }4.8\\text{ m},\\quad\\theta=18^\\circ", "1.6", "Use rise = 4.8 tan 18 degrees.", ["1.6 m"]),
    choice("y9-tri-side-m9", "A student calculates 10 divided by cos 35 degrees to find an adjacent side from hypotenuse 10. What is the correction?", "C", ["Use sine instead", "Use tangent instead", "Multiply: $10\\cos35^\\circ$", "Square both values"], "For adjacent from hypotenuse, multiply by cosine."),
    answer("y9-tri-side-m10", "A right triangle has opposite side 13.5 cm and angle 56 degrees. Find the hypotenuse in centimetres. Round to 1 decimal place.", "\\text{opposite }13.5\\text{ cm},\\quad\\theta=56^\\circ", "16.3", "Use hypotenuse = 13.5 divided by sin 56 degrees.", ["16.3 cm"]),
  ],
};

const findingAngles: LessonContent = {
  description:
    "Use inverse sine, cosine and tangent in degree mode to calculate acute angles in right triangles.",
  learningIntention:
    "Choose an inverse trigonometric ratio and calculate an unknown acute angle.",
  successCriteria: [
    "Identify the two known sides relative to the unknown angle.",
    "Choose inverse sine, cosine or tangent.",
    "Use degree mode.",
    "Round angles to the nearest degree when instructed.",
  ],
  teaching: {
    paragraphs: [
      "To find an angle, first identify the two known sides relative to that angle. Their names determine whether sine, cosine or tangent is appropriate.",
      "After writing the ratio, use the matching inverse trigonometric function on the calculator: inverse sine, inverse cosine or inverse tangent.",
      "Check degree mode and round the final angle only. Acute angles in a right triangle must be between 0 and 90 degrees.",
    ],
    latexBlocks: [
      "\\theta=\\sin^{-1}\\left(\\frac{\\text{opp}}{\\text{hyp}}\\right)",
      "\\theta=\\cos^{-1}\\left(\\frac{\\text{adj}}{\\text{hyp}}\\right)",
      "\\theta=\\tan^{-1}\\left(\\frac{\\text{opp}}{\\text{adj}}\\right)",
    ],
  },
  workedExamples: [
    {
      title: "Use inverse sine",
      questionLatex: "\\text{Find }\\theta\\text{ to the nearest degree.}",
      triangleDiagram: triangle("Right triangle with unknown theta at A, hypotenuse 10 and opposite side 6.", { AB: "10", BC: "6" }, { A: "theta" }),
      steps: [
        { explanation: "Opposite and hypotenuse require sine.", latex: "\\sin\\theta=\\frac{6}{10}" },
        { explanation: "Use inverse sine.", latex: "\\theta=\\sin^{-1}(0.6)\\approx37^\\circ" },
      ],
      finalAnswerLatex: "37^\\circ",
    },
    {
      title: "Use inverse cosine",
      questionLatex: "\\text{The adjacent side is }8\\text{ cm and hypotenuse is }11\\text{ cm. Find the angle to the nearest degree.}",
      steps: [
        { explanation: "Adjacent and hypotenuse require cosine.", latex: "\\theta=\\cos^{-1}\\left(\\frac{8}{11}\\right)" },
        { explanation: "Round the final angle.", latex: "\\theta\\approx43^\\circ" },
      ],
      finalAnswerLatex: "43^\\circ",
    },
    {
      title: "Use inverse tangent",
      questionLatex: "\\text{The opposite side is }7\\text{ m and adjacent side is }12\\text{ m. Find the angle to the nearest degree.}",
      steps: [
        { explanation: "Opposite and adjacent require tangent.", latex: "\\theta=\\tan^{-1}\\left(\\frac{7}{12}\\right)" },
        { explanation: "Round the final angle.", latex: "\\theta\\approx30^\\circ" },
      ],
      finalAnswerLatex: "30^\\circ",
    },
  ],
  guidedPractice: [
    answer("y9-tri-angle-g1", "Find theta to the nearest degree.", "\\text{opposite }3,\\quad\\text{hypotenuse }5", "37", "Use inverse sine of 3 divided by 5.", ["37 degrees", "37°"], triangle("Right triangle with unknown theta, hypotenuse 5 and opposite side 3.", { AB: "5", BC: "3" }, { A: "theta" })),
    answer("y9-tri-angle-g2", "Find theta to the nearest degree.", "\\text{adjacent }4,\\quad\\text{hypotenuse }5", "37", "Use inverse cosine of 4 divided by 5.", ["37 degrees", "37°"]),
    answer("y9-tri-angle-g3", "Find theta to the nearest degree.", "\\text{opposite }5,\\quad\\text{adjacent }5", "45", "Use inverse tangent of 1.", ["45 degrees", "45°"]),
    choice("y9-tri-angle-g4", "Which inverse ratio uses opposite and adjacent?", "C", ["Inverse sine", "Inverse cosine", "Inverse tangent", "Square root"], "Tangent connects opposite and adjacent."),
  ],
  independentPractice: [
    answer("y9-tri-angle-i1", "Find theta to the nearest degree.", "\\text{opposite }8,\\quad\\text{hypotenuse }13", "38", "Use inverse sine of 8 divided by 13.", ["38 degrees", "38°"]),
    answer("y9-tri-angle-i2", "Find theta to the nearest degree.", "\\text{adjacent }9,\\quad\\text{hypotenuse }14", "50", "Use inverse cosine of 9 divided by 14.", ["50 degrees", "50°"]),
    answer("y9-tri-angle-i3", "Find theta to the nearest degree.", "\\text{opposite }6,\\quad\\text{adjacent }11", "29", "Use inverse tangent of 6 divided by 11.", ["29 degrees", "29°"]),
    choice("y9-tri-angle-i4", "Which calculator setting is required?", "B", ["Radians", "Degrees", "Finance", "Statistics"], "These angles are measured in degrees."),
    choice("y9-tri-angle-i5", "Which expression finds theta from opposite 7 and hypotenuse 12?", "A", ["$\\sin^{-1}(7/12)$", "$\\cos^{-1}(7/12)$", "$\\tan^{-1}(12/7)$", "$7\\sin12$"], "Opposite and hypotenuse require inverse sine."),
  ],
  commonMistakes: [
    { mistake: "Using ordinary sine instead of inverse sine.", fix: "When the angle is unknown, use the matching inverse trigonometric function." },
    { mistake: "Entering the ratio upside down.", fix: "Keep SOH CAH TOA order before pressing the inverse function." },
    { mistake: "Leaving the calculator in radian mode.", fix: "Use degree mode for degree questions." },
    { mistake: "Giving an impossible acute angle.", fix: "A non-right angle in a right triangle should be greater than 0 and less than 90 degrees." },
  ],
  masteryQuiz: [
    answer("y9-tri-angle-m1", "Find theta to the nearest degree.", "\\text{opposite }4,\\quad\\text{hypotenuse }8", "30", "Use inverse sine of one half.", ["30 degrees", "30°"]),
    answer("y9-tri-angle-m2", "Find theta to the nearest degree.", "\\text{adjacent }6,\\quad\\text{hypotenuse }12", "60", "Use inverse cosine of one half.", ["60 degrees", "60°"]),
    answer("y9-tri-angle-m3", "Find theta to the nearest degree.", "\\text{opposite }9,\\quad\\text{adjacent }9", "45", "Use inverse tangent of 1.", ["45 degrees", "45°"]),
    choice("y9-tri-angle-m4", "Which inverse ratio matches the displayed sides?", "B", ["Inverse sine", "Inverse cosine", "Inverse tangent", "Pythagoras"], "The labelled sides are adjacent and hypotenuse.", "\\text{Use the diagram.}", triangle("Right triangle with unknown theta, adjacent side 7 and hypotenuse 10.", { AB: "10", AC: "7" }, { A: "theta" })),
    answer("y9-tri-angle-m5", "Find theta to the nearest degree.", "\\text{opposite }11,\\quad\\text{adjacent }15", "36", "Use inverse tangent of 11 divided by 15.", ["36 degrees", "36°"]),
    answer("y9-tri-angle-m6", "Find theta to the nearest degree.", "\\text{opposite }12,\\quad\\text{hypotenuse }17", "45", "Use inverse sine of 12 divided by 17.", ["45 degrees", "45°"]),
    choice("y9-tri-angle-m7", "A student uses cos inverse of 5 divided by 13 when the known sides are opposite 5 and hypotenuse 13. What should change?", "D", ["Use ordinary cosine", "Use inverse tangent", "Swap to 13 divided by 5", "Use inverse sine of 5 divided by 13"], "Opposite and hypotenuse require sine."),
    answer("y9-tri-angle-m8", "A ramp rises 1.8 m over a horizontal run of 7.2 m. Find its angle with the ground to the nearest degree.", "\\text{opposite }1.8\\text{ m},\\quad\\text{adjacent }7.2\\text{ m}", "14", "Use inverse tangent of 1.8 divided by 7.2.", ["14 degrees", "14°"]),
    answer("y9-tri-angle-m9", "A right triangle has adjacent side 13.4 cm and hypotenuse 18.6 cm. Find theta to the nearest degree.", "\\text{adjacent }13.4\\text{ cm},\\quad\\text{hypotenuse }18.6\\text{ cm}", "44", "Use inverse cosine of 13.4 divided by 18.6.", ["44 degrees", "44°"]),
    choice("y9-tri-angle-m10", "An inverse-trig calculation returns 0.64 on a calculator for an angle expected in degrees. What is the likely issue?", "C", ["The triangle is not right angled", "The ratio should be squared", "The calculator may be in radian mode", "The answer must be a length"], "A small decimal angle result often signals radian mode."),
  ],
};

const midpointDistance: LessonContent = {
  description:
    "Calculate midpoints and distances between points on the Cartesian plane using averages and Pythagoras.",
  learningIntention:
    "Use coordinate formulas to find a midpoint and the length of a line segment.",
  successCriteria: [
    "Write coordinate pairs in x-then-y order.",
    "Average x-coordinates and y-coordinates separately for a midpoint.",
    "Use horizontal and vertical changes in the distance formula.",
    "Round non-integer distances only when instructed.",
  ],
  teaching: {
    paragraphs: [
      "The midpoint lies halfway between two endpoints. Average the two x-coordinates, then average the two y-coordinates.",
      "Distance on the Cartesian plane comes from Pythagoras. The horizontal change and vertical change are the shorter sides of a right triangle.",
      "Keep the coordinate order consistent and square each change, so negative differences do not create negative squared values.",
    ],
    latexBlocks: [
      "M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)",
      "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
    ],
  },
  workedExamples: [
    {
      title: "Find a midpoint",
      questionLatex: "\\text{Find the midpoint of }A(1,2)\\text{ and }B(5,6).",
      cartesianGraph: segmentGraph("Coordinate plane showing segment AB from A one comma two to B five comma six.", { x: 1, y: 2, label: "A(1, 2)" }, { x: 5, y: 6, label: "B(5, 6)" }),
      steps: [
        { explanation: "Average x-values and y-values separately.", latex: "M=\\left(\\frac{1+5}{2},\\frac{2+6}{2}\\right)" },
        { explanation: "Simplify.", latex: "M=(3,4)" },
      ],
      finalAnswerLatex: "(3,4)",
    },
    {
      title: "Find a clean diagonal distance",
      questionLatex: "\\text{Find the distance between }P(0,0)\\text{ and }Q(6,8).",
      steps: [
        { explanation: "Find the coordinate changes.", latex: "\\Delta x=6,\\quad\\Delta y=8" },
        { explanation: "Use Pythagoras.", latex: "d=\\sqrt{6^2+8^2}=10" },
      ],
      finalAnswerLatex: "10\\text{ units}",
    },
    {
      title: "Round a coordinate distance",
      questionLatex: "\\text{Find the distance between }(-2,1)\\text{ and }(3,5)\\text{ to 1 decimal place.}",
      steps: [
        { explanation: "The coordinate changes are 5 and 4.", latex: "d=\\sqrt{5^2+4^2}=\\sqrt{41}" },
        { explanation: "Round the final result.", latex: "d\\approx6.4" },
      ],
      finalAnswerLatex: "6.4\\text{ units}",
    },
  ],
  guidedPractice: [
    answer("y9-tri-mid-g1", "Find the midpoint.", "\\text{endpoints: }(0,2)\\text{ and }(4,6)", "(2,4)", "Average the x-values and y-values separately.", ["2,4", "(2, 4)", "2, 4"]),
    answer("y9-tri-mid-g2", "Find the distance in units.", "\\text{endpoints: }(0,0)\\text{ and }(3,4)", "5", "The coordinate changes are 3 and 4.", ["5 units"], undefined, segmentGraph("Coordinate plane showing segment from zero comma zero to three comma four.", { x: 0, y: 0, label: "A" }, { x: 3, y: 4, label: "B" })),
    answer("y9-tri-mid-g3", "Find the midpoint.", "\\text{endpoints: }(-2,1)\\text{ and }(6,5)", "(2,3)", "Average -2 and 6, then 1 and 5.", ["2,3", "(2, 3)", "2, 3"]),
    choice("y9-tri-mid-g4", "Which formula finds a midpoint?", "A", ["Average the x-values and average the y-values", "Add every coordinate into one total", "Multiply the x-values and y-values", "Use rise divided by run"], "A midpoint averages matching coordinates."),
  ],
  independentPractice: [
    answer("y9-tri-mid-i1", "Find the midpoint.", "\\text{endpoints: }(1,-3)\\text{ and }(7,5)", "(4,1)", "Average corresponding coordinates.", ["4,1", "(4, 1)", "4, 1"]),
    answer("y9-tri-mid-i2", "Find the distance in units.", "\\text{endpoints: }(2,1)\\text{ and }(8,9)", "10", "The coordinate changes are 6 and 8.", ["10 units"]),
    answer("y9-tri-mid-i3", "Find the horizontal distance in units.", "\\text{endpoints: }(-4,3)\\text{ and }(5,3)", "9", "Only the x-coordinate changes.", ["9 units"]),
    answer("y9-tri-mid-i4", "Find the distance in units. Round to 1 decimal place.", "\\text{endpoints: }(-1,-2)\\text{ and }(4,4)", "7.8", "The changes are 5 and 6, so the distance is the square root of 61.", ["7.8 units"]),
    choice("y9-tri-mid-i5", "Why are coordinate differences squared in the distance formula?", "C", ["To find a midpoint", "To create negative lengths", "They act as perpendicular shorter-side lengths in Pythagoras", "To calculate gradient instead"], "Distance uses a right triangle formed by coordinate changes."),
  ],
  commonMistakes: [
    { mistake: "Averaging all four coordinates together.", fix: "Average x with x and y with y." },
    { mistake: "Reversing coordinate order.", fix: "Write each pair as x first, then y." },
    { mistake: "Forgetting to square a negative difference.", fix: "Use brackets around each coordinate difference before squaring." },
    { mistake: "Using midpoint when the question asks for distance.", fix: "Distance needs Pythagoras on the horizontal and vertical changes." },
  ],
  masteryQuiz: [
    answer("y9-tri-mid-m1", "Find the midpoint.", "\\text{endpoints: }(2,4)\\text{ and }(6,8)", "(4,6)", "Average matching coordinates.", ["4,6", "(4, 6)", "4, 6"]),
    answer("y9-tri-mid-m2", "Find the distance in units.", "\\text{endpoints: }(0,0)\\text{ and }(5,12)", "13", "The coordinate changes are 5 and 12.", ["13 units"]),
    answer("y9-tri-mid-m3", "Find the vertical distance in units.", "\\text{endpoints: }(3,-2)\\text{ and }(3,7)", "9", "Only y changes.", ["9 units"]),
    answer("y9-tri-mid-m4", "Find the midpoint.", "\\text{endpoints: }(-5,-1)\\text{ and }(3,7)", "(-1,3)", "Average -5 and 3, then -1 and 7.", ["-1,3", "(-1, 3)", "-1, 3"]),
    choice("y9-tri-mid-m5", "Which expression finds the distance between (1, 2) and (7, 10)?", "D", ["$\\sqrt{1^2+2^2}$", "$\\frac{1+7}{2}$", "$6+8$", "$\\sqrt{6^2+8^2}$"], "The coordinate changes are 6 and 8."),
    answer("y9-tri-mid-m6", "Find the distance in units. Round to 1 decimal place.", "\\text{endpoints: }(-3,2)\\text{ and }(4,7)", "8.6", "The changes are 7 and 5, so the distance is the square root of 74.", ["8.6 units"]),
    answer("y9-tri-mid-m7", "Find the midpoint of the displayed segment.", "\\text{Use the graph stimulus.}", "(3,4)", "The endpoints are (1, 1) and (5, 7).", ["3,4", "(3, 4)", "3, 4"], undefined, segmentGraph("Coordinate plane showing segment AB from A one comma one to B five comma seven.", { x: 1, y: 1, label: "A" }, { x: 5, y: 7, label: "B" }, { xMin: 0, xMax: 6, yMin: 0, yMax: 8, xStep: 1, yStep: 1 })),
    choice("y9-tri-mid-m8", "A student finds the midpoint of (-4, 6) and (2, 8) as (-1, 7), then swaps it to (7, -1). What is the correction?", "B", ["The average is wrong", "Keep the coordinate order as (-1, 7)", "Use distance instead", "Square both values"], "The x-coordinate remains first."),
    answer("y9-tri-mid-m9", "Find the distance in units. Round to 2 decimal places.", "\\text{endpoints: }(-2,-4)\\text{ and }(5,3)", "9.90", "Both changes are 7, so the distance is the square root of 98.", ["9.9", "9.90 units"]),
    answer("y9-tri-mid-m10", "One endpoint is (2, 3) and the midpoint is (6, 8). Find the other endpoint.", "\\text{endpoint: }(2,3),\\quad\\text{midpoint: }(6,8)", "(10,13)", "The second endpoint must balance the average: x is 10 and y is 13.", ["10,13", "(10, 13)", "10, 13"]),
  ],
};

const gradient: LessonContent = {
  description:
    "Calculate gradient as rise over run, identify its sign, and connect slope with coordinate geometry and rates.",
  learningIntention:
    "Calculate and interpret gradient from graphs and pairs of points.",
  successCriteria: [
    "Calculate rise and run in a consistent direction.",
    "Divide rise by run.",
    "Recognise positive, negative and zero gradient.",
    "Interpret simple contextual slopes as rates.",
  ],
  teaching: {
    paragraphs: [
      "Gradient describes the steepness and direction of a straight line. It is the vertical change divided by the horizontal change.",
      "Use the same direction for both differences. A line that rises from left to right has positive gradient, a line that falls has negative gradient, and a horizontal line has gradient zero.",
      "Gradient is also a rate of change. For a ramp it can describe rise per metre of run; in other contexts it can describe dollars per hour or kilometres per hour.",
    ],
    latexBlocks: [
      "m=\\frac{\\text{rise}}{\\text{run}}",
      "m=\\frac{y_2-y_1}{x_2-x_1}",
      "\\text{positive: rising}\\quad\\text{negative: falling}\\quad\\text{zero: horizontal}",
    ],
  },
  workedExamples: [
    {
      title: "Find a positive gradient",
      questionLatex: "\\text{Find the gradient through }(1,2)\\text{ and }(4,8).",
      cartesianGraph: segmentGraph("Coordinate plane showing segment AB from A one comma two to B four comma eight.", { x: 1, y: 2, label: "A(1, 2)" }, { x: 4, y: 8, label: "B(4, 8)" }, { xMin: 0, xMax: 5, yMin: 0, yMax: 9, xStep: 1, yStep: 1 }),
      steps: [
        { explanation: "Calculate rise and run in the same direction.", latex: "m=\\frac{8-2}{4-1}=\\frac63=2" },
      ],
      finalAnswerLatex: "2",
    },
    {
      title: "Find a negative gradient",
      questionLatex: "\\text{Find the gradient through }(0,5)\\text{ and }(4,1).",
      steps: [
        { explanation: "The line falls by 4 as x increases by 4.", latex: "m=\\frac{1-5}{4-0}=-1" },
      ],
      finalAnswerLatex: "-1",
    },
    {
      title: "Interpret a ramp gradient",
      questionLatex: "\\text{A ramp rises }0.6\\text{ m over a horizontal run of }4\\text{ m. Find its gradient.}",
      steps: [
        { explanation: "Divide rise by run.", latex: "m=\\frac{0.6}{4}=0.15" },
      ],
      finalAnswerLatex: "0.15",
    },
  ],
  guidedPractice: [
    answer("y9-tri-grad-g1", "Find the gradient.", "\\text{points: }(0,1)\\text{ and }(3,7)", "2", "Rise 6 divided by run 3 is 2.", ["m=2"]),
    choice("y9-tri-grad-g2", "A line falls from left to right. What sign is its gradient?", "B", ["Positive", "Negative", "Zero", "Always undefined"], "A falling line has negative gradient."),
    answer("y9-tri-grad-g3", "Find the gradient.", "\\text{points: }(1,4)\\text{ and }(5,4)", "0", "The rise is zero.", ["m=0"]),
    answer("y9-tri-grad-g4", "Find the gradient of the displayed segment.", "\\text{Use the graph stimulus.}", "2", "The marked points are (1, 1) and (4, 7), giving rise 6 and run 3.", ["m=2"], undefined, segmentGraph("Coordinate plane showing segment AB from A one comma one to B four comma seven.", { x: 1, y: 1, label: "A" }, { x: 4, y: 7, label: "B" }, { xMin: 0, xMax: 5, yMin: 0, yMax: 8, xStep: 1, yStep: 1 })),
  ],
  independentPractice: [
    answer("y9-tri-grad-i1", "Find the gradient.", "\\text{points: }(2,3)\\text{ and }(6,11)", "2", "Rise 8 divided by run 4 is 2.", ["m=2"]),
    answer("y9-tri-grad-i2", "Find the gradient.", "\\text{points: }(-1,5)\\text{ and }(3,-3)", "-2", "Rise -8 divided by run 4 is -2.", ["m=-2"]),
    choice("y9-tri-grad-i3", "Which description matches gradient zero?", "C", ["Rising line", "Falling line", "Horizontal line", "Any vertical line"], "A horizontal line has no rise."),
    answer("y9-tri-grad-i4", "A ramp rises 0.9 m over a horizontal run of 6 m. Find its gradient.", "\\text{rise }0.9\\text{ m},\\quad\\text{run }6\\text{ m}", "0.15", "Divide 0.9 by 6.", ["m=0.15"]),
    choice("y9-tri-grad-i5", "Which pair of points has gradient 3?", "D", ["$(0,0),(2,2)$", "$(1,4),(3,4)$", "$(0,3),(3,0)$", "$(1,2),(4,11)$"], "The last pair rises 9 over a run of 3."),
  ],
  commonMistakes: [
    { mistake: "Dividing run by rise.", fix: "Gradient is rise divided by run." },
    { mistake: "Using opposite directions for the two coordinate differences.", fix: "Subtract coordinates in the same order in the numerator and denominator." },
    { mistake: "Dropping the negative sign for a falling line.", fix: "A fall from left to right gives a negative rise." },
    { mistake: "Calling a horizontal line undefined.", fix: "Horizontal lines have rise zero, so their gradient is zero." },
  ],
  masteryQuiz: [
    answer("y9-tri-grad-m1", "Find the gradient.", "\\text{points: }(0,0)\\text{ and }(2,6)", "3", "Rise 6 divided by run 2 is 3.", ["m=3"]),
    answer("y9-tri-grad-m2", "Find the gradient.", "\\text{points: }(1,7)\\text{ and }(4,1)", "-2", "Rise -6 divided by run 3 is -2.", ["m=-2"]),
    choice("y9-tri-grad-m3", "Which gradient represents a horizontal line?", "A", ["0", "1", "-1", "3"], "No rise means zero gradient."),
    answer("y9-tri-grad-m4", "Find the gradient.", "\\text{points: }(-2,-1)\\text{ and }(2,7)", "2", "Rise 8 divided by run 4 is 2.", ["m=2"]),
    choice("y9-tri-grad-m5", "Which line is steepest?", "D", ["gradient 1", "gradient -2", "gradient 0", "gradient 4"], "The greatest gradient magnitude is 4."),
    answer("y9-tri-grad-m6", "Find the gradient of the displayed segment.", "\\text{Use the graph stimulus.}", "-1", "The marked points are (-2, 4) and (3, -1), giving rise -5 and run 5.", ["m=-1"], undefined, segmentGraph("Coordinate plane showing a falling segment from A negative two comma four to B three comma negative one.", { x: -2, y: 4, label: "A" }, { x: 3, y: -1, label: "B" })),
    answer("y9-tri-grad-m7", "A wheelchair ramp rises 0.72 m over a horizontal run of 9 m. Find its gradient.", "\\text{rise }0.72\\text{ m},\\quad\\text{run }9\\text{ m}", "0.08", "Divide rise by run.", ["m=0.08"]),
    choice("y9-tri-grad-m8", "A student calculates the gradient through (2, 9) and (6, 1) as positive 2. What is the correction?", "B", ["The run should be zero", "The rise is -8, so the gradient is -2", "The gradient is 8", "The gradient is one half"], "The line falls as x increases."),
    answer("y9-tri-grad-m9", "A line has gradient 2.5 and a run of 4. Find the rise.", "\\text{gradient }2.5,\\quad\\text{run }4", "10", "Rise equals gradient times run.", ["10 units"]),
    choice("y9-tri-grad-m10", "A segment has endpoints (-3, 5) and (5, -7). Which gradient is correct?", "C", ["$\\frac{3}{2}$", "$-\\frac{2}{3}$", "$-\\frac{3}{2}$", "$\\frac{2}{3}$"], "Rise is -12 and run is 8, so the gradient is -3/2."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "pythagoras-hypotenuse": hypotenuse,
  "pythagoras-shorter-side": shorterSide,
  "right-triangle-applications": applications,
  "trigonometric-ratios": ratios,
  "finding-sides-right-triangles": findingSides,
  "finding-angles-right-triangles": findingAngles,
  "midpoint-distance-coordinate": midpointDistance,
  "gradient-foundations": gradient,
};

export function year9WorkingWithTrianglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-9-mathematics" ||
    unit.slug !== "working-with-triangles"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) {
    return null;
  }

  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
