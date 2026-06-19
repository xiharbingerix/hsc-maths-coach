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
import { enhanceYear9CoreLesson } from "./coreDepthEnhancements";

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
  latex = "",
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

// ── Year 9 Core trig lessons (slugs exclusive to year-9-mathematics-core) ──────

function triangleAltB(
  description: string,
  sideLabels: TriangleDiagram["sideLabels"],
  angleLabels: TriangleDiagram["angleLabels"] = {}
): TriangleDiagram {
  // Right angle at B (bottom-right), θ typically at A (top-left).
  // A(80,230) bottom-left · C(330,230) bottom-right · B(330,40) top-right
  // AB = diagonal hypotenuse, AC = bottom horiz adj, BC = right vert opp
  return {
    description,
    vertices: {
      A: { x: 80, y: 230 },
      C: { x: 330, y: 230 },
      B: { x: 330, y: 40 },
    },
    rightAngleAt: "B",
    sideLabels,
    angleLabels,
  };
}

const trigNamingSides: LessonContent = {
  description:
    "Identify the hypotenuse, opposite and adjacent sides of a right triangle relative to any marked acute angle.",
  learningIntention:
    "Name the hypotenuse, opposite and adjacent sides of a right triangle for any position of the reference angle.",
  successCriteria: [
    "State that the hypotenuse is always opposite the right angle.",
    "Name the opposite side as the side that does not touch the marked angle.",
    "Name the adjacent side as the non-hypotenuse side that touches the marked angle.",
    "Re-label opposite and adjacent correctly when the marked angle changes vertex.",
  ],
  teaching: {
    paragraphs: [
      "Every right triangle has three named sides. The hypotenuse is always opposite the right angle and is always the longest side. It stays fixed no matter which acute angle you choose as the reference.",
      "The other two sides depend on which acute angle is marked as theta. The opposite side lies directly across from theta — it does not touch the vertex of theta at all. The adjacent side is right next to theta but is not the hypotenuse.",
      "When theta moves to a different vertex, the hypotenuse label stays put, but opposite and adjacent swap. Always fix the hypotenuse first, then decide opposite and adjacent relative to where theta is.",
    ],
    latexBlocks: [
      "\\text{hypotenuse: always opposite the right angle}",
      "\\text{opposite: does not touch }\\theta",
      "\\text{adjacent: touches }\\theta\\text{ (not the hypotenuse)}",
    ],
  },
  workedExamples: [
    {
      title: "Label sides with theta at A",
      questionLatex:
        "\\text{Triangle ABC has its right angle at C. Label all three sides relative to }\\theta\\text{ at }A.",
      triangleDiagram: triangle(
        "Right triangle ABC with right angle at C and theta at A.",
        { AB: "hypotenuse", BC: "opposite", AC: "adjacent" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation:
            "AB is opposite the right angle at C, so AB is the hypotenuse.",
        },
        {
          explanation:
            "BC lies across from theta at A and does not touch A, so BC is the opposite side.",
        },
        {
          explanation:
            "AC touches theta at A and is not the hypotenuse, so AC is the adjacent side.",
        },
      ],
      finalAnswerLatex:
        "\\text{hyp: }AB,\\quad\\text{opp: }BC,\\quad\\text{adj: }AC",
    },
    {
      title: "Re-label when theta moves to B",
      questionLatex:
        "\\text{Same triangle. Now }\\theta\\text{ is at }B.\\text{ Which labels change?}",
      triangleDiagram: {
        description:
          "Right triangle ABC with right angle at C and theta at B.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "hypotenuse", BC: "adjacent", AC: "opposite" },
        angleLabels: { B: "theta" },
      },
      steps: [
        {
          explanation:
            "AB is still opposite the right angle at C, so AB is still the hypotenuse.",
        },
        {
          explanation:
            "AC lies across from theta at B and does not touch B, so AC is now the opposite side.",
        },
        {
          explanation:
            "BC touches theta at B and is not the hypotenuse, so BC is now the adjacent side.",
        },
      ],
      finalAnswerLatex:
        "\\text{hyp: }AB,\\quad\\text{opp: }AC,\\quad\\text{adj: }BC",
    },
    {
      title: "A different triangle orientation",
      questionLatex:
        "\\text{Triangle with right angle at B and }\\theta\\text{ at }A.\\text{ Name the three sides.}",
      triangleDiagram: triangleAltB(
        "Right triangle with right angle at B (top-right) and theta at A (bottom-left).",
        { AB: "hypotenuse", AC: "adjacent", BC: "opposite" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation:
            "AB is opposite the right angle at B, so AB is the hypotenuse.",
        },
        {
          explanation:
            "BC lies across from theta at A and does not touch A, so BC is the opposite side.",
        },
        {
          explanation:
            "AC touches theta at A and is not the hypotenuse, so AC is the adjacent side.",
        },
      ],
      finalAnswerLatex:
        "\\text{hyp: }AB,\\quad\\text{opp: }BC,\\quad\\text{adj: }AC",
    },
  ],
  guidedPractice: [
    choice(
      "tri-nam-g1",
      "Which side is the hypotenuse in the triangle shown?",
      "A",
      ["AB", "AC", "BC", "The angle at C"],
      "AB is opposite the right angle at C, so AB is the hypotenuse.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A.",
      triangle(
        "Right triangle ABC with right angle at C and theta at A, sides labelled AB, AC, BC.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-g2",
      "Relative to theta at A, which side is the opposite?",
      "C",
      ["AB", "AC", "BC", "The right angle at C"],
      "BC lies across from theta at A and does not touch vertex A.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A.",
      triangle(
        "Right triangle ABC with right angle at C and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-g3",
      "Relative to theta at A, which side is the adjacent?",
      "B",
      ["AB", "AC", "BC", "None of these"],
      "AC touches theta at A and is not the hypotenuse, so AC is adjacent.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A.",
      triangle(
        "Right triangle ABC with right angle at C and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-g4",
      "Theta moves from A to B. Which side is now the adjacent?",
      "D",
      ["AB", "AC", "The right angle at C", "BC"],
      "When theta is at B, BC touches theta and is not the hypotenuse — so BC is adjacent.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ now at }B.",
      {
        description: "Right triangle ABC with right angle at C and theta at B.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "AB", AC: "AC", BC: "BC" },
        angleLabels: { B: "theta" },
      }
    ),
  ],
  independentPractice: [
    choice(
      "tri-nam-i1",
      "With theta at B, which side is the opposite?",
      "B",
      ["BC", "AC", "AB", "The right angle"],
      "AC lies across from theta at B and does not touch vertex B.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }B.",
      {
        description: "Right triangle ABC with right angle at C and theta at B.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "AB", AC: "AC", BC: "BC" },
        angleLabels: { B: "theta" },
      }
    ),
    choice(
      "tri-nam-i2",
      "Which side keeps the same label no matter which acute angle is chosen as theta?",
      "C",
      ["Opposite", "Adjacent", "Hypotenuse", "The shortest side"],
      "The hypotenuse is defined by the right angle position, not the choice of theta."
    ),
    choice(
      "tri-nam-i3",
      "A student says: adjacent is the side next to the right angle. What is wrong?",
      "A",
      [
        "Adjacent is the non-hypotenuse side next to theta, not the right angle",
        "Adjacent is always the longest side",
        "Adjacent and opposite are the same thing",
        "Nothing is wrong — that definition is correct",
      ],
      "Adjacent is defined relative to theta, not relative to the right angle."
    ),
    choice(
      "tri-nam-i4",
      "In the triangle shown, which side is the hypotenuse?",
      "D",
      ["AC", "BC", "The right angle at B", "AB"],
      "AB is opposite the right angle at B, so AB is the hypotenuse.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A.",
      triangleAltB(
        "Right triangle with right angle at B and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-i5",
      "In the same triangle, which side is the opposite relative to theta at A?",
      "C",
      ["AB", "AC", "BC", "The right angle vertex"],
      "BC lies across from theta at A and does not touch vertex A.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A.",
      triangleAltB(
        "Right triangle with right angle at B and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calling the side touching the right angle the adjacent side.",
      fix: "Adjacent is defined relative to theta, not the right angle. Fix the hypotenuse first, then find the side touching theta.",
    },
    {
      mistake: "Assuming opposite and adjacent never change.",
      fix: "They depend on which angle is chosen as theta. The hypotenuse is the only fixed label.",
    },
    {
      mistake: "Choosing the hypotenuse as the adjacent side.",
      fix: "The hypotenuse is opposite the right angle. The adjacent is the other side that touches theta.",
    },
    {
      mistake: "Using the right angle as the reference angle.",
      fix: "Always choose an acute angle as theta. The right angle cannot be the reference.",
    },
  ],
  masteryQuiz: [
    choice(
      "tri-nam-m1",
      "In triangle ABC with right angle at C, which side is always the hypotenuse?",
      "B",
      ["AC", "AB", "BC", "Whichever is longest on the page"],
      "AB is opposite the right angle at C.",
      "\\text{Right angle at }C.",
      triangle(
        "Right triangle ABC with right angle at C, sides labelled.",
        { AB: "AB", AC: "AC", BC: "BC" }
      )
    ),
    choice(
      "tri-nam-m2",
      "Relative to theta at A, which side is opposite?",
      "A",
      ["BC", "AC", "AB", "The right angle"],
      "BC does not touch vertex A, so BC is opposite theta.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A.",
      triangle(
        "Right triangle ABC with right angle at C and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-m3",
      "Relative to theta at B, which side is adjacent?",
      "D",
      ["AB", "AC", "The right angle at C", "BC"],
      "BC touches theta at B and is not the hypotenuse.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }B.",
      {
        description: "Right triangle ABC with right angle at C and theta at B.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "AB", AC: "AC", BC: "BC" },
        angleLabels: { B: "theta" },
      }
    ),
    choice(
      "tri-nam-m4",
      "Which statement about the adjacent side is correct?",
      "C",
      [
        "It is always the shortest side",
        "It is always next to the right angle",
        "It is the non-hypotenuse side that touches the reference angle theta",
        "It is always opposite the reference angle",
      ],
      "Adjacent means next to theta — specifically, the non-hypotenuse side that touches theta."
    ),
    choice(
      "tri-nam-m5",
      "Theta moves from A to B. Which side keeps the same label?",
      "B",
      ["BC", "AB", "AC", "All three sides change label"],
      "AB remains the hypotenuse because the right angle at C does not move.",
      "\\text{Right angle at }C.",
      triangle(
        "Right triangle ABC with right angle at C.",
        { AB: "AB", AC: "AC", BC: "BC" }
      )
    ),
    choice(
      "tri-nam-m6",
      "In the rotated triangle shown, which side is the opposite relative to theta at A?",
      "B",
      ["AC", "BC", "AB", "The right angle at B"],
      "BC lies across from theta at A and does not touch vertex A.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A.",
      triangleAltB(
        "Right triangle with right angle at B (top-right) and theta at A (bottom-left).",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-m7",
      "In the same rotated triangle, which side is adjacent to theta at A?",
      "C",
      ["AB", "BC", "AC", "The vertex B"],
      "AC touches theta at A and is not the hypotenuse.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A.",
      triangleAltB(
        "Right triangle with right angle at B and theta at A.",
        { AB: "AB", AC: "AC", BC: "BC" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-m8",
      "Which of the following is always true for a right triangle?",
      "D",
      [
        "The adjacent side is longer than the opposite side",
        "The hypotenuse touches every angle",
        "Opposite and adjacent are fixed labels that never change",
        "The hypotenuse is the longest side",
      ],
      "The hypotenuse is opposite the right angle — the largest angle — so it is always longest."
    ),
    choice(
      "tri-nam-m9",
      "In triangle ABC with right angle at C and theta at A: AC = 5, BC = 12, AB = 13. Which side is the adjacent?",
      "A",
      ["AC (length 5)", "BC (length 12)", "AB (length 13)", "None — no adjacent when lengths are given"],
      "AC touches theta at A and is not the hypotenuse, so AC is adjacent regardless of its length.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=5,\\;BC=12,\\;AB=13.",
      triangle(
        "Right triangle with right angle at C, theta at A, AC=5, BC=12, AB=13.",
        { AB: "13", AC: "5", BC: "12" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-nam-m10",
      "When theta changes position, which two side labels swap?",
      "B",
      [
        "Hypotenuse and opposite",
        "Opposite and adjacent",
        "Hypotenuse and adjacent",
        "All three labels swap",
      ],
      "The hypotenuse is fixed by the right angle. When theta moves, opposite and adjacent swap roles."
    ),
  ],
};

const trigRatiosIntro: LessonContent = {
  description:
    "Write sine, cosine and tangent ratios from labelled side lengths and select the correct ratio for a given pair of sides.",
  learningIntention:
    "Use SOH-CAH-TOA to write sin theta, cos theta and tan theta as fractions from a labelled right triangle.",
  successCriteria: [
    "Recall that sin = opp/hyp, cos = adj/hyp, tan = opp/adj.",
    "Write each ratio as a simplified fraction given numeric side lengths.",
    "Select the correct ratio when two specific sides are named.",
    "Identify which ratio to use from a word description of two sides.",
  ],
  teaching: {
    paragraphs: [
      "Once you have labelled the hypotenuse, opposite and adjacent sides, you can write a trigonometric ratio as a fraction. The memory aid SOH-CAH-TOA tells you which sides go in each ratio.",
      "SOH: sine equals opposite over hypotenuse. CAH: cosine equals adjacent over hypotenuse. TOA: tangent equals opposite over adjacent. The order — numerator first, denominator second — is fixed. Never flip them.",
      "When you need to find a side or an angle, start by asking which two sides are involved. Then choose the ratio that connects exactly those two sides. If the opposite and hypotenuse are involved, use sine. If adjacent and hypotenuse, use cosine. If opposite and adjacent, use tangent.",
    ],
    latexBlocks: [
      "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}},\\quad\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}},\\quad\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}",
    ],
  },
  workedExamples: [
    {
      title: "Write all three ratios from a 3-4-5 triangle",
      questionLatex:
        "\\text{Write }\\sin\\theta,\\;\\cos\\theta\\text{ and }\\tan\\theta\\text{ for the triangle shown.}",
      triangleDiagram: triangle(
        "Right triangle with right angle at C, theta at A, AC=3, BC=4, AB=5.",
        { AB: "5", AC: "3", BC: "4" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation: "Label the sides: AB = 5 is the hypotenuse; BC = 4 is opposite theta at A; AC = 3 is adjacent.",
        },
        {
          explanation: "Apply SOH-CAH-TOA.",
          latex:
            "\\sin\\theta=\\frac{4}{5},\\quad\\cos\\theta=\\frac{3}{5},\\quad\\tan\\theta=\\frac{4}{3}",
        },
      ],
      finalAnswerLatex:
        "\\sin\\theta=\\frac{4}{5},\\quad\\cos\\theta=\\frac{3}{5},\\quad\\tan\\theta=\\frac{4}{3}",
    },
    {
      title: "Select the correct ratio",
      questionLatex:
        "\\text{The opposite side is }12\\text{ and the hypotenuse is }13.\\text{ Which ratio uses these two sides, and what is its value?}",
      steps: [
        {
          explanation:
            "Opposite and hypotenuse appear in sine (SOH).",
          latex: "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}=\\frac{12}{13}",
        },
      ],
      finalAnswerLatex: "\\sin\\theta=\\frac{12}{13}",
    },
    {
      title: "Write ratios with theta at a different vertex",
      questionLatex:
        "\\text{Same 3-4-5 triangle, but now }\\theta\\text{ is at }B.\\text{ Write }\\sin\\theta\\text{ and }\\tan\\theta.",
      triangleDiagram: {
        description:
          "Right triangle with right angle at C, theta at B, AC=3, BC=4, AB=5.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "5", AC: "3", BC: "4" },
        angleLabels: { B: "theta" },
      },
      steps: [
        {
          explanation:
            "With theta at B: opp = AC = 3, adj = BC = 4, hyp = AB = 5.",
        },
        {
          explanation: "Apply SOH and TOA.",
          latex: "\\sin\\theta=\\frac{3}{5},\\quad\\tan\\theta=\\frac{3}{4}",
        },
      ],
      finalAnswerLatex: "\\sin\\theta=\\frac{3}{5},\\quad\\tan\\theta=\\frac{3}{4}",
    },
  ],
  guidedPractice: [
    choice(
      "tri-rat-g1",
      "Which expression equals sin theta?",
      "C",
      [
        "$\\frac{\\text{adj}}{\\text{hyp}}$",
        "$\\frac{\\text{opp}}{\\text{adj}}$",
        "$\\frac{\\text{opp}}{\\text{hyp}}$",
        "$\\frac{\\text{hyp}}{\\text{opp}}$",
      ],
      "SOH: sine equals opposite over hypotenuse."
    ),
    answer(
      "tri-rat-g2",
      "Write sin theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=3,\\;BC=4,\\;AB=5.",
      "4/5",
      "Opposite is BC = 4, hypotenuse is AB = 5. So sin theta = 4/5.",
      ["0.8"],
      triangle(
        "Right triangle with right angle at C, theta at A, AC=3, BC=4, AB=5.",
        { AB: "5", AC: "3", BC: "4" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-rat-g3",
      "Write cos theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=3,\\;BC=4,\\;AB=5.",
      "3/5",
      "Adjacent is AC = 3, hypotenuse is AB = 5. So cos theta = 3/5.",
      ["0.6"],
      triangle(
        "Right triangle with right angle at C, theta at A, AC=3, BC=4, AB=5.",
        { AB: "5", AC: "3", BC: "4" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-rat-g4",
      "Which ratio should you use when the opposite and adjacent sides are both known or needed?",
      "B",
      ["Sine", "Tangent", "Cosine", "Pythagoras"],
      "TOA: tangent equals opposite over adjacent."
    ),
  ],
  independentPractice: [
    answer(
      "tri-rat-i1",
      "Write sin theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=5,\\;BC=12,\\;AB=13.",
      "12/13",
      "Opposite is BC = 12, hypotenuse is AB = 13. So sin theta = 12/13.",
      ["\\frac{12}{13}", "0.923", "0.92"],
      triangle(
        "Right triangle with right angle at C, theta at A, AC=5, BC=12, AB=13.",
        { AB: "13", AC: "5", BC: "12" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-rat-i2",
      "Write tan theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=5,\\;BC=12,\\;AB=13.",
      "12/5",
      "Tangent equals opposite over adjacent. Opposite is BC = 12, adjacent is AC = 5. So tan theta = 12/5.",
      ["\\frac{12}{5}", "2.4"],
      triangle(
        "Right triangle with right angle at C, theta at A, AC=5, BC=12, AB=13.",
        { AB: "13", AC: "5", BC: "12" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-rat-i3",
      "The adjacent side is 8 and the hypotenuse is 17. Which ratio statement is correct?",
      "D",
      [
        "$\\sin\\theta=\\frac{8}{17}$",
        "$\\tan\\theta=\\frac{8}{17}$",
        "$\\cos\\theta=\\frac{17}{8}$",
        "$\\cos\\theta=\\frac{8}{17}$",
      ],
      "CAH: cosine equals adjacent over hypotenuse."
    ),
    choice(
      "tri-rat-i4",
      "A student writes sin theta = hyp/opp. What is wrong?",
      "A",
      [
        "Sine uses opp/hyp — the numerator and denominator are swapped",
        "Sine should use adj instead of opp",
        "The hypotenuse should be the adjacent side",
        "Nothing is wrong — that is a valid form of sine",
      ],
      "SOH means opposite over hypotenuse. The student reversed the fraction."
    ),
    answer(
      "tri-rat-i5",
      "Write cos theta as a fraction. Use the diagram.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A,\\quad AC=8,\\;BC=6,\\;AB=10.",
      "8/10",
      "Adjacent to theta at A is AC = 8, hypotenuse is AB = 10. So cos theta = 8/10.",
      ["4/5", "0.8"],
      triangleAltB(
        "Right triangle with right angle at B, theta at A, AC=8, BC=6, AB=10.",
        { AB: "10", AC: "8", BC: "6" },
        { A: "theta" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing sine as hypotenuse over opposite.",
      fix: "SOH: sine is opposite over hypotenuse. The smaller part (opposite) goes on top.",
    },
    {
      mistake: "Using the right angle as the reference angle when writing ratios.",
      fix: "Always mark an acute angle as theta. The three ratios are defined relative to theta.",
    },
    {
      mistake: "Confusing which ratio uses adjacent and which uses opposite.",
      fix: "Memorise SOH-CAH-TOA in order: sine = opp/hyp, cosine = adj/hyp, tangent = opp/adj.",
    },
    {
      mistake: "Assuming opposite and adjacent lengths are fixed.",
      fix: "They change when theta moves to a different vertex. Re-label before writing the ratio.",
    },
  ],
  masteryQuiz: [
    choice(
      "tri-rat-m1",
      "Which expression equals cos theta?",
      "B",
      [
        "$\\frac{\\text{opp}}{\\text{hyp}}$",
        "$\\frac{\\text{adj}}{\\text{hyp}}$",
        "$\\frac{\\text{opp}}{\\text{adj}}$",
        "$\\frac{\\text{hyp}}{\\text{adj}}$",
      ],
      "CAH: cosine equals adjacent over hypotenuse."
    ),
    choice(
      "tri-rat-m2",
      "Which expression equals tan theta?",
      "C",
      [
        "$\\frac{\\text{hyp}}{\\text{opp}}$",
        "$\\frac{\\text{adj}}{\\text{hyp}}$",
        "$\\frac{\\text{opp}}{\\text{adj}}$",
        "$\\frac{\\text{opp}}{\\text{hyp}}$",
      ],
      "TOA: tangent equals opposite over adjacent."
    ),
    answer(
      "tri-rat-m3",
      "Write tan theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }A,\\quad AC=3,\\;BC=4,\\;AB=5.",
      "4/3",
      "Tangent equals opposite over adjacent. Opposite is BC = 4, adjacent is AC = 3. So tan theta = 4/3.",
      ["\\frac{4}{3}", "1.333", "1.33"],
      triangle(
        "Right triangle with right angle at C, theta at A, AC=3, BC=4, AB=5.",
        { AB: "5", AC: "3", BC: "4" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-rat-m4",
      "Write sin theta as a fraction. Use the diagram.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ at }B,\\quad AC=3,\\;BC=4,\\;AB=5.",
      "3/5",
      "With theta at B: opposite is AC = 3, hypotenuse is AB = 5. So sin theta = 3/5.",
      ["0.6"],
      {
        description:
          "Right triangle with right angle at C, theta at B, AC=3, BC=4, AB=5.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "5", AC: "3", BC: "4" },
        angleLabels: { B: "theta" },
      }
    ),
    choice(
      "tri-rat-m5",
      "The opposite side is 9 and hypotenuse is 15. Which statement is correct?",
      "A",
      [
        "$\\sin\\theta=\\frac{9}{15}$",
        "$\\cos\\theta=\\frac{9}{15}$",
        "$\\tan\\theta=\\frac{15}{9}$",
        "$\\sin\\theta=\\frac{15}{9}$",
      ],
      "Sine uses opposite over hypotenuse: 9/15."
    ),
    choice(
      "tri-rat-m6",
      "The adjacent side is 7 and the opposite side is 24. Which ratio value is correct?",
      "D",
      [
        "$\\sin\\theta=\\frac{7}{24}$",
        "$\\cos\\theta=\\frac{24}{7}$",
        "$\\sin\\theta=\\frac{24}{7}$",
        "$\\tan\\theta=\\frac{24}{7}$",
      ],
      "TOA: tan theta = opposite over adjacent = 24/7."
    ),
    answer(
      "tri-rat-m7",
      "Write cos theta as a fraction. Use the diagram.",
      "\\text{Right angle at }B,\\quad\\theta\\text{ at }A,\\quad AC=8,\\;BC=6,\\;AB=10.",
      "8/10",
      "With theta at A: adjacent is AC = 8, hypotenuse is AB = 10. Cos theta = 8/10.",
      ["4/5", "0.8"],
      triangleAltB(
        "Right triangle with right angle at B, theta at A, AC=8, BC=6, AB=10.",
        { AB: "10", AC: "8", BC: "6" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-rat-m8",
      "Which ratio connects the opposite and hypotenuse in a right triangle?",
      "B",
      ["Cosine", "Sine", "Tangent", "Gradient"],
      "SOH: sine is opposite over hypotenuse."
    ),
    choice(
      "tri-rat-m9",
      "A student writes tan theta = opp/hyp. What should it be?",
      "C",
      [
        "$\\frac{\\text{hyp}}{\\text{opp}}$",
        "$\\frac{\\text{adj}}{\\text{hyp}}$",
        "$\\frac{\\text{opp}}{\\text{adj}}$",
        "$\\frac{\\text{hyp}}{\\text{adj}}$",
      ],
      "TOA: tangent equals opposite over adjacent, not over hypotenuse."
    ),
    choice(
      "tri-rat-m10",
      "Which pair of sides must you know to use the cosine ratio?",
      "A",
      [
        "Adjacent and hypotenuse",
        "Opposite and hypotenuse",
        "Opposite and adjacent",
        "Any two sides",
      ],
      "CAH: cosine equals adjacent over hypotenuse — both of those sides must be involved."
    ),
  ],
};

const trigFindingSidesMultiply: LessonContent = {
  description:
    "Use SOH-CAH-TOA to find an unknown opposite or adjacent side by multiplying the given side by the trig ratio.",
  learningIntention:
    "Set up a trig equation and find an unknown side by multiplying when the hypotenuse or adjacent side is given.",
  successCriteria: [
    "Label sides relative to the marked angle and identify the unknown.",
    "Write the correct ratio equation (e.g. sin theta = x / hyp).",
    "Rearrange to x = hyp × sin theta and evaluate using a calculator in degree mode.",
    "Round the final answer to 1 decimal place as instructed.",
  ],
  teaching: {
    paragraphs: [
      "When the unknown side is in the numerator of the trig ratio, the equation rearranges by multiplying. For example, if sin theta = x / hyp, then multiply both sides by hyp to get x = hyp × sin theta.",
      "This lesson covers only the cases where you multiply: finding the opposite side when the hypotenuse is given (use sine), finding the adjacent side when the hypotenuse is given (use cosine), or finding the opposite side when the adjacent side is given (use tangent).",
      "Always check that your calculator is in degree mode before evaluating. A common error is leaving the calculator in radian mode, which gives completely wrong answers for degree questions.",
    ],
    latexBlocks: [
      "\\sin\\theta=\\frac{x}{\\text{hyp}}\\quad\\Rightarrow\\quad x=\\text{hyp}\\times\\sin\\theta",
      "\\cos\\theta=\\frac{x}{\\text{hyp}}\\quad\\Rightarrow\\quad x=\\text{hyp}\\times\\cos\\theta",
      "\\tan\\theta=\\frac{x}{\\text{adj}}\\quad\\Rightarrow\\quad x=\\text{adj}\\times\\tan\\theta",
    ],
  },
  workedExamples: [
    {
      title: "Find an opposite side using sine",
      questionLatex:
        "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: triangle(
        "Right triangle with right angle at C, angle 30 degrees at A, hypotenuse AB=10 and unknown opposite BC=x.",
        { AB: "10", BC: "x" },
        { A: "30°" }
      ),
      steps: [
        {
          explanation:
            "The unknown x is opposite theta and the given side (10) is the hypotenuse — use sine.",
          latex: "\\sin30^\\circ=\\frac{x}{10}",
        },
        {
          explanation:
            "Multiply both sides by 10 and evaluate on a calculator in degree mode.",
          latex: "x=10\\times\\sin30^\\circ=10\\times0.5=5.0",
        },
      ],
      finalAnswerLatex: "5.0",
    },
    {
      title: "Find an adjacent side using cosine",
      questionLatex:
        "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: {
        description:
          "Right triangle with right angle at C, angle 60 degrees at B, hypotenuse AB=8 and unknown adjacent BC=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "8", BC: "x" },
        angleLabels: { B: "60°" },
      },
      steps: [
        {
          explanation:
            "The unknown x is adjacent to theta at B, and the given side (8) is the hypotenuse — use cosine.",
          latex: "\\cos60^\\circ=\\frac{x}{8}",
        },
        {
          explanation:
            "Multiply both sides by 8 and evaluate.",
          latex: "x=8\\times\\cos60^\\circ=8\\times0.5=4.0",
        },
      ],
      finalAnswerLatex: "4.0",
    },
    {
      title: "Find the opposite side using tangent",
      questionLatex:
        "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: triangleAltB(
        "Right triangle with right angle at B, angle 45 degrees at A, adjacent AC=9 and unknown opposite BC=x.",
        { AC: "9", BC: "x" },
        { A: "45°" }
      ),
      steps: [
        {
          explanation:
            "The unknown x is opposite theta at A and the given side (9) is adjacent — use tangent.",
          latex: "\\tan45^\\circ=\\frac{x}{9}",
        },
        {
          explanation:
            "Multiply both sides by 9 and evaluate.",
          latex: "x=9\\times\\tan45^\\circ=9\\times1=9.0",
        },
      ],
      finalAnswerLatex: "9.0",
    },
  ],
  guidedPractice: [
    answer(
      "tri-sm-g1",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=10,\\quad\\theta=30^\\circ,\\quad x\\text{ is opposite}",
      "5.0",
      "Sine: x = 10 × sin 30° = 10 × 0.5 = 5.0.",
      ["5"],
      triangle(
        "Right triangle with right angle at C, 30 degrees at A, hypotenuse 10 and unknown opposite x.",
        { AB: "10", BC: "x" },
        { A: "30°" }
      )
    ),
    answer(
      "tri-sm-g2",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=8,\\quad\\theta=60^\\circ,\\quad x\\text{ is adjacent (theta at }B)",
      "4.0",
      "Cosine: x = 8 × cos 60° = 8 × 0.5 = 4.0.",
      ["4"],
      {
        description:
          "Right triangle with right angle at C, 60 degrees at B, hypotenuse 8 and unknown adjacent x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "8", BC: "x" },
        angleLabels: { B: "60°" },
      }
    ),
    choice(
      "tri-sm-g3",
      "Which equation correctly sets up the calculation to find the unknown opposite side x?",
      "C",
      [
        "$\\cos40^\\circ=\\frac{x}{12}$",
        "$x=\\frac{12}{\\sin40^\\circ}$",
        "$x=12\\times\\sin40^\\circ$",
        "$\\tan40^\\circ=\\frac{x}{12}$",
      ],
      "The unknown x is opposite and 12 is the hypotenuse — use sine and multiply: x = 12 × sin 40°.",
      "\\text{hyp}=12,\\quad\\theta=40^\\circ,\\quad x\\text{ is opposite}.",
      triangle(
        "Right triangle with right angle at C, 40 degrees at A, hypotenuse 12 and unknown opposite x.",
        { AB: "12", BC: "x" },
        { A: "40°" }
      )
    ),
    answer(
      "tri-sm-g4",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=9,\\quad\\theta=45^\\circ,\\quad x\\text{ is opposite}",
      "9.0",
      "Tangent: x = 9 × tan 45° = 9 × 1 = 9.0.",
      ["9"],
      triangleAltB(
        "Right triangle with right angle at B, 45 degrees at A, adjacent AC=9 and unknown opposite BC=x.",
        { AC: "9", BC: "x" },
        { A: "45°" }
      )
    ),
  ],
  independentPractice: [
    answer(
      "tri-sm-i1",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=15,\\quad\\theta=40^\\circ,\\quad x\\text{ is opposite}",
      "9.6",
      "Sine: x = 15 × sin 40° = 15 × 0.6428 ≈ 9.6.",
      ["9.60"],
      triangle(
        "Right triangle with right angle at C, 40 degrees at A, hypotenuse 15 and unknown opposite x.",
        { AB: "15", BC: "x" },
        { A: "40°" }
      )
    ),
    answer(
      "tri-sm-i2",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=14,\\quad\\theta=37^\\circ,\\quad x\\text{ is adjacent (theta at }B)",
      "11.2",
      "Cosine: x = 14 × cos 37° = 14 × 0.7986 ≈ 11.2.",
      ["11.20"],
      {
        description:
          "Right triangle with right angle at C, 37 degrees at B, hypotenuse 14 and unknown adjacent x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "14", BC: "x" },
        angleLabels: { B: "37°" },
      }
    ),
    answer(
      "tri-sm-i3",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=7,\\quad\\theta=53^\\circ,\\quad x\\text{ is opposite}",
      "9.3",
      "Tangent: x = 7 × tan 53° = 7 × 1.3270 ≈ 9.3.",
      ["9.30"],
      triangleAltB(
        "Right triangle with right angle at B, 53 degrees at A, adjacent AC=7 and unknown opposite BC=x.",
        { AC: "7", BC: "x" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-sm-i4",
      "A ramp has a length of 8 m and makes an angle of 30 degrees with the ground. Find the height it rises in metres. Round to 1 decimal place.",
      "\\text{hyp}=8\\text{ m},\\quad\\theta=30^\\circ,\\quad\\text{height is opposite}",
      "4.0",
      "Sine: height = 8 × sin 30° = 8 × 0.5 = 4.0 m.",
      ["4"],
      triangle(
        "Right triangle with right angle at C, 30 degrees at A, hypotenuse ramp 8 m and unknown height x.",
        { AB: "8 m", BC: "x" },
        { A: "30°" }
      )
    ),
    choice(
      "tri-sm-i5",
      "Which ratio should you use when the hypotenuse is given and the adjacent side is unknown?",
      "B",
      ["Sine", "Cosine", "Tangent", "Pythagoras"],
      "CAH: cosine links the adjacent side and the hypotenuse."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing instead of multiplying when the unknown is in the numerator.",
      fix: "If sin theta = x/hyp, rearrange by multiplying both sides by hyp to get x = hyp × sin theta.",
    },
    {
      mistake: "Using the calculator in radian mode.",
      fix: "Check degree mode before every calculation. Radian mode gives incorrect results for degree angles.",
    },
    {
      mistake: "Choosing cosine when the opposite side is needed.",
      fix: "If the unknown is the opposite and the hyp is given, use sine (SOH). Cosine connects the adjacent and hyp.",
    },
    {
      mistake: "Rounding the trig value before multiplying.",
      fix: "Enter the full calculator expression (e.g. 15 × sin 40°) and round only the final answer.",
    },
  ],
  masteryQuiz: [
    answer(
      "tri-sm-m1",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=16,\\quad\\theta=30^\\circ,\\quad x\\text{ is opposite}",
      "8.0",
      "Sine: x = 16 × sin 30° = 16 × 0.5 = 8.0.",
      ["8"],
      triangle(
        "Right triangle with right angle at C, 30 degrees at A, hypotenuse 16 and unknown opposite x.",
        { AB: "16", BC: "x" },
        { A: "30°" }
      )
    ),
    answer(
      "tri-sm-m2",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=10,\\quad\\theta=37^\\circ,\\quad x\\text{ is adjacent (theta at }B)",
      "8.0",
      "Cosine: x = 10 × cos 37° = 10 × 0.7986 ≈ 8.0.",
      ["8"],
      {
        description:
          "Right triangle with right angle at C, 37 degrees at B, hypotenuse 10 and unknown adjacent x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "10", BC: "x" },
        angleLabels: { B: "37°" },
      }
    ),
    answer(
      "tri-sm-m3",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=6,\\quad\\theta=37^\\circ,\\quad x\\text{ is opposite}",
      "4.5",
      "Tangent: x = 6 × tan 37° = 6 × 0.7536 ≈ 4.5.",
      ["4.50"],
      triangleAltB(
        "Right triangle with right angle at B, 37 degrees at A, adjacent AC=6 and unknown opposite BC=x.",
        { AC: "6", BC: "x" },
        { A: "37°" }
      )
    ),
    choice(
      "tri-sm-m4",
      "Which equation correctly finds the adjacent side x given hyp=20 and theta=53 degrees?",
      "B",
      [
        "$x=20\\times\\sin53^\\circ$",
        "$x=20\\times\\cos53^\\circ$",
        "$x=20\\times\\tan53^\\circ$",
        "$x=\\frac{20}{\\cos53^\\circ}$",
      ],
      "The adjacent and hypotenuse are involved — use cosine and multiply: x = 20 × cos 53°.",
      "\\text{hyp}=20,\\quad\\theta=53^\\circ,\\quad x\\text{ is adjacent}.",
      triangle(
        "Right triangle with right angle at C, 53 degrees at A, hypotenuse AB=20 and unknown adjacent AC=x.",
        { AB: "20", AC: "x" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-sm-m5",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=25,\\quad\\theta=53^\\circ,\\quad x\\text{ is opposite}",
      "20.0",
      "Sine: x = 25 × sin 53° = 25 × 0.7986 ≈ 20.0.",
      ["20"],
      triangle(
        "Right triangle with right angle at C, 53 degrees at A, hypotenuse 25 and unknown opposite x.",
        { AB: "25", BC: "x" },
        { A: "53°" }
      )
    ),
    choice(
      "tri-sm-m6",
      "The opposite side is unknown and the adjacent side is given. Which ratio connects these two sides?",
      "C",
      ["Sine", "Cosine", "Tangent", "Pythagoras"],
      "TOA: tangent equals opposite over adjacent."
    ),
    answer(
      "tri-sm-m7",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=18,\\quad\\theta=40^\\circ,\\quad x\\text{ is opposite}",
      "11.6",
      "Sine: x = 18 × sin 40° = 18 × 0.6428 ≈ 11.6.",
      ["11.60"],
      triangle(
        "Right triangle with right angle at C, 40 degrees at A, hypotenuse 18 and unknown opposite x.",
        { AB: "18", BC: "x" },
        { A: "40°" }
      )
    ),
    answer(
      "tri-sm-m8",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=10,\\quad\\theta=60^\\circ,\\quad x\\text{ is opposite}",
      "17.3",
      "Tangent: x = 10 × tan 60° = 10 × 1.7321 ≈ 17.3.",
      ["17.30"],
      triangleAltB(
        "Right triangle with right angle at B, 60 degrees at A, adjacent AC=10 and unknown opposite BC=x.",
        { AC: "10", BC: "x" },
        { A: "60°" }
      )
    ),
    answer(
      "tri-sm-m9",
      "A ramp surface is 5 m long and is angled at 37 degrees to the ground. Find the height it rises in metres. Round to 1 decimal place.",
      "\\text{hyp}=5\\text{ m},\\quad\\theta=37^\\circ,\\quad\\text{height is opposite}",
      "3.0",
      "Sine: height = 5 × sin 37° = 5 × 0.6018 ≈ 3.0 m.",
      ["3", "3 m", "3.0 m"],
      triangle(
        "Right triangle: ramp is hypotenuse 5 m, 37 degrees at base, unknown height x.",
        { AB: "5 m", BC: "x" },
        { A: "37°" }
      )
    ),
    choice(
      "tri-sm-m10",
      "A student evaluates 12 × sin 45° on a calculator and gets 0.848. The expected answer is about 8.5. What is the most likely cause?",
      "A",
      [
        "The calculator is in radian mode",
        "The student used cosine instead of sine",
        "The student divided instead of multiplied",
        "The hypotenuse value was entered incorrectly",
      ],
      "Sin 45° in radian mode returns about 0.0707, and 12 × 0.0707 ≈ 0.848. Switching to degree mode gives sin 45° ≈ 0.7071, and 12 × 0.7071 ≈ 8.5."
    ),
  ],
};

const trigFindingSidesDivide: LessonContent = {
  description:
    "Use SOH-CAH-TOA to find an unknown hypotenuse or adjacent side by rearranging a trig equation and dividing.",
  learningIntention:
    "Recognise when the unknown side is in the denominator of a trig ratio and find it by dividing.",
  successCriteria: [
    "Identify when the unknown appears in the denominator of the trig equation.",
    "Rearrange the equation by multiplying both sides then dividing to isolate the unknown.",
    "Evaluate the result on a calculator in degree mode and round to 1 decimal place.",
    "Check that the hypotenuse is longer than both shorter sides as a plausibility check.",
  ],
  teaching: {
    paragraphs: [
      "When the unknown side is in the denominator of the trig ratio, a different rearrangement is needed. For example, sin θ = opp / hyp. If the hypotenuse is unknown, multiply both sides by hyp, then divide both sides by sin θ to get hyp = opp ÷ sin θ.",
      "The key sign: if the unknown sits under the fraction line, you divide by the trig ratio value to find it. This is the opposite of the multiply step from the previous lesson. Always write the equation first, then rearrange.",
      "A quick plausibility check: the hypotenuse must be the longest side. If your calculated hypotenuse is shorter than the given side, something has gone wrong — most likely you multiplied when you should have divided.",
    ],
    latexBlocks: [
      "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}\\quad\\Rightarrow\\quad\\text{hyp}=\\frac{\\text{opp}}{\\sin\\theta}",
      "\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}}\\quad\\Rightarrow\\quad\\text{hyp}=\\frac{\\text{adj}}{\\cos\\theta}",
      "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}\\quad\\Rightarrow\\quad\\text{adj}=\\frac{\\text{opp}}{\\tan\\theta}",
    ],
  },
  workedExamples: [
    {
      title: "Find the hypotenuse using sine",
      questionLatex: "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: triangle(
        "Right triangle with right angle at C, 30 degrees at A, opposite BC=6 and unknown hypotenuse AB=x.",
        { AB: "x", BC: "6" },
        { A: "30°" }
      ),
      steps: [
        {
          explanation:
            "The unknown x is the hypotenuse and the given side (6) is opposite — use sine.",
          latex: "\\sin30^\\circ=\\frac{6}{x}",
        },
        {
          explanation: "Multiply both sides by x, then divide by sin 30°.",
          latex: "x=\\frac{6}{\\sin30^\\circ}=\\frac{6}{0.5}=12.0",
        },
      ],
      finalAnswerLatex: "12.0",
    },
    {
      title: "Find the hypotenuse using cosine",
      questionLatex: "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: {
        description:
          "Right triangle with right angle at C, 37 degrees at B, adjacent BC=8 and unknown hypotenuse AB=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "x", BC: "8" },
        angleLabels: { B: "37°" },
      },
      steps: [
        {
          explanation:
            "The unknown x is the hypotenuse and the given side (8) is adjacent to theta at B — use cosine.",
          latex: "\\cos37^\\circ=\\frac{8}{x}",
        },
        {
          explanation: "Rearrange: x = 8 ÷ cos 37°.",
          latex: "x=\\frac{8}{\\cos37^\\circ}=\\frac{8}{0.7986}\\approx10.0",
        },
      ],
      finalAnswerLatex: "10.0",
    },
    {
      title: "Find an adjacent side using tangent",
      questionLatex: "\\text{Find }x\\text{ to 1 decimal place.}",
      triangleDiagram: triangleAltB(
        "Right triangle with right angle at B, 53 degrees at A, opposite BC=9 and unknown adjacent AC=x.",
        { AC: "x", BC: "9" },
        { A: "53°" }
      ),
      steps: [
        {
          explanation:
            "The unknown x is adjacent and the given side (9) is opposite — use tangent.",
          latex: "\\tan53^\\circ=\\frac{9}{x}",
        },
        {
          explanation: "Rearrange: x = 9 ÷ tan 53°.",
          latex: "x=\\frac{9}{\\tan53^\\circ}=\\frac{9}{1.3270}\\approx6.8",
        },
      ],
      finalAnswerLatex: "6.8",
    },
  ],
  guidedPractice: [
    choice(
      "tri-sd-g1",
      "The unknown side is in the denominator of a trig equation. Which operation isolates it?",
      "B",
      [
        "Multiply by the trig ratio",
        "Divide by the trig ratio",
        "Take the square root",
        "Use Pythagoras instead",
      ],
      "When the unknown is in the denominator, rearrange by dividing both sides by the trig ratio."
    ),
    answer(
      "tri-sd-g2",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=6,\\quad\\theta=30^\\circ,\\quad x\\text{ is the hypotenuse}",
      "12.0",
      "Sine: x = 6 ÷ sin 30° = 6 ÷ 0.5 = 12.0.",
      ["12"],
      triangle(
        "Right triangle with 30 degrees at A, opposite 6 and unknown hypotenuse x.",
        { AB: "x", BC: "6" },
        { A: "30°" }
      )
    ),
    choice(
      "tri-sd-g3",
      "Which equation finds the hypotenuse x when the adjacent side is 8 and the angle is 53 degrees?",
      "D",
      [
        "$x=8\\times\\cos53^\\circ$",
        "$x=8\\times\\sin53^\\circ$",
        "$x=\\frac{\\cos53^\\circ}{8}$",
        "$x=\\frac{8}{\\cos53^\\circ}$",
      ],
      "Cosine links adjacent and hypotenuse. Since hyp is unknown, rearrange: x = adj ÷ cos θ.",
      "\\text{adj}=8,\\quad\\theta=53^\\circ,\\quad x\\text{ is hypotenuse}.",
      triangle(
        "Right triangle with 53 degrees at A, adjacent AC=8 and unknown hypotenuse AB=x.",
        { AB: "x", AC: "8" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-sd-g4",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=8,\\quad\\theta=37^\\circ\\text{ at }B,\\quad x\\text{ is the hypotenuse}",
      "10.0",
      "Cosine: x = 8 ÷ cos 37° = 8 ÷ 0.7986 ≈ 10.0.",
      ["10"],
      {
        description:
          "Right triangle with right angle at C, 37 degrees at B, adjacent BC=8 and unknown hypotenuse AB=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "x", BC: "8" },
        angleLabels: { B: "37°" },
      }
    ),
  ],
  independentPractice: [
    answer(
      "tri-sd-i1",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=8,\\quad\\theta=53^\\circ,\\quad x\\text{ is the hypotenuse}",
      "10.0",
      "Sine: x = 8 ÷ sin 53° = 8 ÷ 0.7986 ≈ 10.0.",
      ["10"],
      triangle(
        "Right triangle with 53 degrees at A, opposite BC=8 and unknown hypotenuse AB=x.",
        { AB: "x", BC: "8" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-sd-i2",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=12,\\quad\\theta=60^\\circ\\text{ at }B,\\quad x\\text{ is the hypotenuse}",
      "24.0",
      "Cosine: x = 12 ÷ cos 60° = 12 ÷ 0.5 = 24.0.",
      ["24"],
      {
        description:
          "Right triangle with right angle at C, 60 degrees at B, adjacent BC=12 and unknown hypotenuse AB=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "x", BC: "12" },
        angleLabels: { B: "60°" },
      }
    ),
    answer(
      "tri-sd-i3",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=7,\\quad\\theta=40^\\circ,\\quad x\\text{ is the adjacent}",
      "8.3",
      "Tangent: x = 7 ÷ tan 40° = 7 ÷ 0.8391 ≈ 8.3.",
      ["8.30"],
      triangleAltB(
        "Right triangle with right angle at B, 40 degrees at A, opposite BC=7 and unknown adjacent AC=x.",
        { AC: "x", BC: "7" },
        { A: "40°" }
      )
    ),
    choice(
      "tri-sd-i4",
      "A student writes x = 3 × sin 30° to find the hypotenuse when the opposite side is 3 and the angle is 30°. What is wrong?",
      "C",
      [
        "Cosine should be used instead of sine",
        "The angle should be 60° not 30°",
        "The hypotenuse is in the denominator, so the student should divide: x = 3 ÷ sin 30°",
        "The student should use Pythagoras instead",
      ],
      "When the hypotenuse is unknown it sits in the denominator, so rearrange by dividing: hyp = opp ÷ sin θ."
    ),
    answer(
      "tri-sd-i5",
      "A slide surface is inclined at 37 degrees and its bottom edge (opposite side) is 3 m above the ground. Find the length of the slide surface in metres. Round to 1 decimal place.",
      "\\text{opp}=3\\text{ m},\\quad\\theta=37^\\circ,\\quad x\\text{ is the slide surface (hypotenuse)}",
      "5.0",
      "Sine: x = 3 ÷ sin 37° = 3 ÷ 0.6018 ≈ 5.0 m.",
      ["5", "5 m", "5.0 m"],
      triangle(
        "Right triangle: slide surface is hypotenuse x, height 3 m is opposite, angle 37 degrees at base.",
        { AB: "x", BC: "3 m" },
        { A: "37°" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Multiplying by the trig ratio when the unknown is in the denominator.",
      fix: "Write the equation first. If the unknown is under the fraction line, rearrange by dividing: hyp = opp ÷ sin θ.",
    },
    {
      mistake: "Getting a result smaller than the given side when finding the hypotenuse.",
      fix: "The hypotenuse is always the longest side. A smaller result means you multiplied instead of divided.",
    },
    {
      mistake: "Using the wrong ratio for the sides involved.",
      fix: "Label opp, adj and hyp relative to the marked angle before choosing a ratio.",
    },
    {
      mistake: "Forgetting to check degree mode.",
      fix: "Radian mode gives a completely different result. Check the calculator setting before evaluating.",
    },
  ],
  masteryQuiz: [
    answer(
      "tri-sd-m1",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=5,\\quad\\theta=30^\\circ,\\quad x\\text{ is the hypotenuse}",
      "10.0",
      "Sine: x = 5 ÷ sin 30° = 5 ÷ 0.5 = 10.0.",
      ["10"],
      triangle(
        "Right triangle with 30 degrees at A, opposite BC=5 and unknown hypotenuse AB=x.",
        { AB: "x", BC: "5" },
        { A: "30°" }
      )
    ),
    answer(
      "tri-sd-m2",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=6,\\quad\\theta=45^\\circ,\\quad x\\text{ is the hypotenuse}",
      "8.5",
      "Cosine: x = 6 ÷ cos 45° = 6 ÷ 0.7071 ≈ 8.5.",
      ["8.50"],
      triangleAltB(
        "Right triangle with right angle at B, 45 degrees at A, adjacent AC=6 and unknown hypotenuse AB=x.",
        { AB: "x", AC: "6" },
        { A: "45°" }
      )
    ),
    choice(
      "tri-sd-m3",
      "Which equation correctly finds the hypotenuse x when the opposite is 9 and the angle is 45 degrees?",
      "A",
      [
        "$x=\\frac{9}{\\sin45^\\circ}$",
        "$x=9\\times\\sin45^\\circ$",
        "$x=9\\times\\cos45^\\circ$",
        "$x=\\frac{\\sin45^\\circ}{9}$",
      ],
      "Sine links opp and hyp. Hyp is unknown, so rearrange: x = opp ÷ sin θ.",
      "\\text{opp}=9,\\quad\\theta=45^\\circ,\\quad x\\text{ is hypotenuse}.",
      triangle(
        "Right triangle with right angle at C, 45 degrees at A, opposite BC=9 and unknown hypotenuse AB=x.",
        { AB: "x", BC: "9" },
        { A: "45°" }
      )
    ),
    answer(
      "tri-sd-m4",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=12,\\quad\\theta=53^\\circ,\\quad x\\text{ is the adjacent}",
      "9.0",
      "Tangent: x = 12 ÷ tan 53° = 12 ÷ 1.3270 ≈ 9.0.",
      ["9"],
      triangleAltB(
        "Right triangle with right angle at B, 53 degrees at A, opposite BC=12 and unknown adjacent AC=x.",
        { AC: "x", BC: "12" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-sd-m5",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=9,\\quad\\theta=45^\\circ,\\quad x\\text{ is the hypotenuse}",
      "12.7",
      "Cosine: x = 9 ÷ cos 45° = 9 ÷ 0.7071 ≈ 12.7.",
      ["12.70"],
      triangle(
        "Right triangle with 45 degrees at A, adjacent AC=9 and unknown hypotenuse AB=x.",
        { AB: "x", AC: "9" },
        { A: "45°" }
      )
    ),
    choice(
      "tri-sd-m6",
      "A calculated hypotenuse turns out shorter than the given opposite side. What does this signal?",
      "B",
      [
        "The angle was wrong",
        "The student multiplied instead of divided",
        "The triangle has no hypotenuse",
        "The answer should be negative",
      ],
      "The hypotenuse is always the longest side. A shorter result means the rearrangement step was inverted."
    ),
    answer(
      "tri-sd-m7",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=15,\\quad\\theta=60^\\circ\\text{ at }B,\\quad x\\text{ is the hypotenuse}",
      "30.0",
      "Cosine: x = 15 ÷ cos 60° = 15 ÷ 0.5 = 30.0.",
      ["30"],
      {
        description:
          "Right triangle with right angle at C, 60 degrees at B, adjacent BC=15 and unknown hypotenuse AB=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "x", BC: "15" },
        angleLabels: { B: "60°" },
      }
    ),
    answer(
      "tri-sd-m8",
      "A slide makes an angle of 40 degrees with the ground. The top of the slide is 2 m above the ground. Find the length of the slide surface in metres. Round to 1 decimal place.",
      "\\text{opp}=2\\text{ m},\\quad\\theta=40^\\circ,\\quad x\\text{ is the slide surface (hypotenuse)}",
      "3.1",
      "Sine: x = 2 ÷ sin 40° = 2 ÷ 0.6428 ≈ 3.1 m.",
      ["3.10", "3.1 m"],
      triangle(
        "Right triangle: slide surface is hypotenuse x, height 2 m opposite, angle 40 degrees.",
        { AB: "x", BC: "2 m" },
        { A: "40°" }
      )
    ),
    choice(
      "tri-sd-m9",
      "When is the divide step needed instead of the multiply step?",
      "C",
      [
        "When the given side is the hypotenuse",
        "When the angle is greater than 45 degrees",
        "When the unknown side appears in the denominator of the trig equation",
        "When both shorter sides are given",
      ],
      "If the unknown is in the denominator, multiply both sides by it and then divide by the trig ratio."
    ),
    answer(
      "tri-sd-m10",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=10,\\quad\\theta=60^\\circ,\\quad x\\text{ is the adjacent}",
      "5.8",
      "Tangent: x = 10 ÷ tan 60° = 10 ÷ 1.7321 ≈ 5.8.",
      ["5.80"],
      triangleAltB(
        "Right triangle with right angle at B, 60 degrees at A, opposite BC=10 and unknown adjacent AC=x.",
        { AC: "x", BC: "10" },
        { A: "60°" }
      )
    ),
  ],
};

const trigChoosingRatio: LessonContent = {
  description:
    "Select the correct trig ratio for any pair of sides and decide whether to multiply or divide to find the unknown.",
  learningIntention:
    "Choose sin, cos or tan and the correct operation given any right-triangle setup.",
  successCriteria: [
    "Name the two sides involved and match them to sin, cos or tan.",
    "Decide whether to multiply or divide based on whether the unknown is in the numerator or denominator.",
    "Set up the equation correctly before evaluating.",
    "Identify and correct common ratio-selection errors.",
  ],
  teaching: {
    paragraphs: [
      "Every right-triangle trig problem requires two decisions: which ratio, and which operation. Work through them in order. First, label the sides relative to the marked angle. Then identify which two sides are involved. Finally, pick the ratio that connects those two sides.",
      "Once the ratio is chosen, look at where the unknown sits. If the unknown is in the numerator (it equals hyp × trig or adj × tan), multiply. If the unknown is in the denominator (it equals opp ÷ sin, adj ÷ cos, or opp ÷ tan), divide.",
      "A common mistake is mixing up the ratio and the operation independently. They are linked: always write the equation first (sin θ = opp/hyp, etc.) and read off the operation from the position of the unknown.",
    ],
    latexBlocks: [
      "\\text{opp and hyp} \\to \\sin\\theta \\qquad \\text{adj and hyp} \\to \\cos\\theta \\qquad \\text{opp and adj} \\to \\tan\\theta",
      "\\text{unknown on top} \\Rightarrow \\text{multiply} \\qquad \\text{unknown on bottom} \\Rightarrow \\text{divide}",
    ],
  },
  workedExamples: [
    {
      title: "Identify the ratio from the sides involved",
      questionLatex:
        "\\text{The marked angle is }\\theta.\\text{ The known side is the hypotenuse and the unknown is the opposite. Which ratio and which operation?}",
      triangleDiagram: triangle(
        "Right triangle with right angle at C, theta at A, hypotenuse AB=14 and unknown opposite BC=x.",
        { AB: "14", BC: "x" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation:
            "Opposite and hypotenuse are involved — choose sine.",
          latex: "\\sin\\theta=\\frac{x}{14}",
        },
        {
          explanation:
            "The unknown x is in the numerator, so multiply both sides by 14.",
          latex: "x=14\\times\\sin\\theta",
        },
      ],
      finalAnswerLatex: "\\text{sine, multiply: }x=14\\times\\sin\\theta",
    },
    {
      title: "Ratio and divide",
      questionLatex:
        "\\text{The adjacent side is }9\\text{ and the hypotenuse is unknown. Which ratio and operation?}",
      triangleDiagram: {
        description:
          "Right triangle with right angle at C, 40 degrees at B, adjacent BC=9 and unknown hypotenuse AB=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "x", BC: "9" },
        angleLabels: { B: "40°" },
      },
      steps: [
        {
          explanation:
            "Adjacent and hypotenuse — choose cosine. The hypotenuse (x) is in the denominator.",
          latex: "\\cos40^\\circ=\\frac{9}{x}",
        },
        {
          explanation: "Divide to isolate x.",
          latex: "x=\\frac{9}{\\cos40^\\circ}\\approx11.7",
        },
      ],
      finalAnswerLatex: "\\text{cosine, divide: }x\\approx11.7",
    },
    {
      title: "Tangent case — full solve",
      questionLatex:
        "\\text{Adjacent }=11,\\text{ angle }=30^\\circ,\\text{ find the opposite side }x.\\text{ Round to 1 decimal place.}",
      triangleDiagram: triangleAltB(
        "Right triangle with right angle at B, 30 degrees at A, adjacent AC=11 and unknown opposite BC=x.",
        { AC: "11", BC: "x" },
        { A: "30°" }
      ),
      steps: [
        {
          explanation: "Opposite and adjacent — choose tangent.",
          latex: "\\tan30^\\circ=\\frac{x}{11}",
        },
        {
          explanation:
            "The unknown x is in the numerator, so multiply by 11.",
          latex: "x=11\\times\\tan30^\\circ=11\\times0.5774\\approx6.4",
        },
      ],
      finalAnswerLatex: "6.4",
    },
  ],
  guidedPractice: [
    choice(
      "tri-ch-g1",
      "The known side is the hypotenuse and the unknown is the opposite. Which ratio?",
      "A",
      ["Sine", "Cosine", "Tangent", "Pythagoras"],
      "SOH: sine links opposite and hypotenuse.",
      "\\text{opp unknown, hyp given}.",
      triangle(
        "Right triangle with theta at A, hypotenuse AB labelled and opposite BC marked x.",
        { AB: "hyp", BC: "x" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-ch-g2",
      "The known side is the hypotenuse and the unknown is the adjacent. Which ratio?",
      "B",
      ["Sine", "Cosine", "Tangent", "Inverse tangent"],
      "CAH: cosine links adjacent and hypotenuse.",
      "\\text{adj unknown, hyp given}.",
      {
        description:
          "Right triangle with theta at B, hypotenuse AB and unknown adjacent BC=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "hyp", BC: "x" },
        angleLabels: { B: "theta" },
      }
    ),
    choice(
      "tri-ch-g3",
      "The known side is the adjacent and the unknown is the opposite. Which ratio?",
      "C",
      ["Sine", "Cosine", "Tangent", "Cosine inverse"],
      "TOA: tangent links opposite and adjacent.",
      "\\text{opp unknown, adj given}.",
      triangleAltB(
        "Right triangle with theta at A, adjacent AC and unknown opposite BC=x.",
        { AC: "adj", BC: "x" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-ch-g4",
      "The hypotenuse is known and the adjacent is unknown. Which operation?",
      "A",
      [
        "Multiply: adj = hyp × cos θ",
        "Divide: adj = cos θ ÷ hyp",
        "Divide: adj = hyp ÷ cos θ",
        "Add: adj = hyp + cos θ",
      ],
      "Cosine: adj/hyp = cos θ, so adj = hyp × cos θ — the unknown is in the numerator."
    ),
  ],
  independentPractice: [
    choice(
      "tri-ch-i1",
      "The opposite is known and the hypotenuse is unknown. Which operation?",
      "B",
      [
        "Multiply: hyp = opp × sin θ",
        "Divide: hyp = opp ÷ sin θ",
        "Multiply: hyp = sin θ × opp",
        "Divide: hyp = sin θ ÷ opp",
      ],
      "Sine: opp/hyp = sin θ. Since hyp is unknown (in the denominator), rearrange: hyp = opp ÷ sin θ."
    ),
    choice(
      "tri-ch-i2",
      "Which equation correctly sets up the problem: hyp=13, theta=40 degrees, find the opposite side x?",
      "C",
      [
        "$x=\\frac{13}{\\sin40^\\circ}$",
        "$x=13\\times\\cos40^\\circ$",
        "$x=13\\times\\sin40^\\circ$",
        "$x=\\frac{13}{\\cos40^\\circ}$",
      ],
      "Opposite and hypotenuse — use sine. Unknown x is in the numerator, so multiply: x = 13 × sin 40°.",
      "\\text{hyp}=13,\\quad\\theta=40^\\circ,\\quad x\\text{ is opposite}.",
      triangle(
        "Right triangle with right angle at C, 40 degrees at A, hypotenuse AB=13 and unknown opposite BC=x.",
        { AB: "13", BC: "x" },
        { A: "40°" }
      )
    ),
    choice(
      "tri-ch-i3",
      "A student writes tan theta = opp/hyp. What is wrong?",
      "D",
      [
        "Tangent should use adj/hyp",
        "Tangent should use hyp/opp",
        "The ratio should be cos not tan",
        "Tangent uses opp/adj, not opp/hyp",
      ],
      "TOA: tangent equals opposite over adjacent. Using hypotenuse in place of adjacent is a common error."
    ),
    answer(
      "tri-ch-i4",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=20,\\quad\\theta=53^\\circ,\\quad x\\text{ is opposite}",
      "16.0",
      "Sine — opposite in numerator, so multiply: x = 20 × sin 53° = 20 × 0.7986 ≈ 16.0.",
      ["16"],
      triangle(
        "Right triangle with 53 degrees at A, hypotenuse AB=20 and unknown opposite BC=x.",
        { AB: "20", BC: "x" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-ch-i5",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=6,\\quad\\theta=37^\\circ,\\quad x\\text{ is the hypotenuse}",
      "10.0",
      "Sine — hypotenuse in denominator, so divide: x = 6 ÷ sin 37° = 6 ÷ 0.6018 ≈ 10.0.",
      ["10"],
      triangleAltB(
        "Right triangle with 37 degrees at A, opposite BC=6 and unknown hypotenuse AB=x.",
        { AB: "x", BC: "6" },
        { A: "37°" }
      )
    ),
  ],
  commonMistakes: [
    {
      mistake: "Selecting the ratio first and then deciding to multiply or divide at random.",
      fix: "Write the equation (e.g. sin θ = x/hyp) and read the operation from the position of the unknown.",
    },
    {
      mistake: "Writing tan θ = opp/hyp.",
      fix: "Tangent uses opposite over adjacent. The hypotenuse never appears in the tangent ratio.",
    },
    {
      mistake: "Choosing cosine when the opposite side is involved.",
      fix: "Cosine connects adjacent and hypotenuse. If the opposite side is involved, use sine or tangent.",
    },
    {
      mistake: "Forgetting to label sides relative to the marked angle before choosing a ratio.",
      fix: "Always identify hyp, opp and adj first. The ratio choice follows from these labels.",
    },
  ],
  masteryQuiz: [
    choice(
      "tri-ch-m1",
      "Which ratio connects the opposite side and the hypotenuse?",
      "A",
      ["Sine", "Cosine", "Tangent", "Gradient"],
      "SOH: sine equals opposite over hypotenuse."
    ),
    choice(
      "tri-ch-m2",
      "Which ratio connects the adjacent side and the hypotenuse?",
      "B",
      ["Sine", "Cosine", "Tangent", "Pythagoras"],
      "CAH: cosine equals adjacent over hypotenuse."
    ),
    choice(
      "tri-ch-m3",
      "Which ratio connects the opposite side and the adjacent side?",
      "C",
      ["Sine", "Cosine", "Tangent", "Inverse sine"],
      "TOA: tangent equals opposite over adjacent."
    ),
    answer(
      "tri-ch-m4",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=11,\\quad\\theta=30^\\circ,\\quad x\\text{ is opposite}",
      "6.4",
      "Tangent — opposite in numerator, multiply: x = 11 × tan 30° = 11 × 0.5774 ≈ 6.4.",
      ["6.40"],
      triangleAltB(
        "Right triangle with right angle at B, 30 degrees at A, adjacent AC=11 and unknown opposite BC=x.",
        { AC: "11", BC: "x" },
        { A: "30°" }
      )
    ),
    choice(
      "tri-ch-m5",
      "The adjacent is known and the hypotenuse is unknown. Which operation?",
      "D",
      [
        "Multiply: hyp = adj × cos θ",
        "Add the sides",
        "Multiply: hyp = adj × sin θ",
        "Divide: hyp = adj ÷ cos θ",
      ],
      "Cosine: adj/hyp = cos θ. Since hyp is in the denominator, rearrange by dividing: hyp = adj ÷ cos θ."
    ),
    answer(
      "tri-ch-m6",
      "Find x. Round to 1 decimal place.",
      "\\text{adj}=10,\\quad\\theta=37^\\circ,\\quad x\\text{ is the hypotenuse}",
      "12.5",
      "Cosine — hyp in denominator, divide: x = 10 ÷ cos 37° = 10 ÷ 0.7986 ≈ 12.5.",
      ["12.50"],
      triangle(
        "Right triangle with 37 degrees at A, adjacent AC=10 and unknown hypotenuse AB=x.",
        { AB: "x", AC: "10" },
        { A: "37°" }
      )
    ),
    choice(
      "tri-ch-m7",
      "A student writes tan theta = opp/hyp. Which correction is needed?",
      "B",
      [
        "Change tan to sin",
        "Change hyp to adj in the denominator",
        "Flip the fraction to hyp/opp",
        "Change opp to adj in the numerator",
      ],
      "Tangent is opposite over adjacent. Replacing hyp with adj fixes the error."
    ),
    answer(
      "tri-ch-m8",
      "Find x. Round to 1 decimal place.",
      "\\text{hyp}=16,\\quad\\theta=45^\\circ,\\quad x\\text{ is opposite}",
      "11.3",
      "Sine — opposite in numerator, multiply: x = 16 × sin 45° = 16 × 0.7071 ≈ 11.3.",
      ["11.30"],
      {
        description:
          "Right triangle with right angle at C, 45 degrees at B, hypotenuse AB=16 and unknown opposite AC=x.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "16", AC: "x" },
        angleLabels: { B: "45°" },
      }
    ),
    answer(
      "tri-ch-m9",
      "Find x. Round to 1 decimal place.",
      "\\text{opp}=8,\\quad\\theta=53^\\circ,\\quad x\\text{ is adjacent}",
      "6.0",
      "Tangent — adjacent in denominator, divide: x = 8 ÷ tan 53° = 8 ÷ 1.3270 ≈ 6.0.",
      ["6"],
      triangleAltB(
        "Right triangle with right angle at B, 53 degrees at A, opposite BC=8 and unknown adjacent AC=x.",
        { AC: "x", BC: "8" },
        { A: "53°" }
      )
    ),
    choice(
      "tri-ch-m10",
      "Which pair of steps is always correct when solving a right-triangle trig problem?",
      "C",
      [
        "Choose a ratio, then guess whether to multiply or divide",
        "Use Pythagoras first, then choose a ratio",
        "Label opp, adj and hyp relative to theta; then choose the ratio linking the two sides involved",
        "Subtract the angle from 90°, then use the complementary angle",
      ],
      "Labelling comes first. The ratio choice and operation follow directly from which sides are known and unknown."
    ),
  ],
};

const trigFindingAngles: LessonContent = {
  description:
    "Use inverse sine, cosine and tangent to find an unknown acute angle in a right triangle from two known sides.",
  learningIntention:
    "Apply the correct inverse trig function to find an unknown angle, given two side lengths.",
  successCriteria: [
    "Identify the two known sides and write the trig ratio involving those sides.",
    "Apply the matching inverse function (sin⁻¹, cos⁻¹ or tan⁻¹) to find the angle.",
    "Round the angle to the nearest degree.",
    "Recognise the radian-mode error and avoid inverting the ratio.",
  ],
  teaching: {
    paragraphs: [
      "When two sides are known but the angle is unknown, write the trig ratio in the usual way and then apply the inverse function to both sides. For example, sin θ = 4/5 becomes θ = sin⁻¹(4/5).",
      "The inverse functions are labelled sin⁻¹, cos⁻¹ and tan⁻¹ on a calculator — sometimes written as arcsin, arccos, arctan. They undo the original trig function and give you back the angle.",
      "Two common errors: leaving the calculator in radian mode (the answer will be a tiny decimal such as 0.64 instead of a sensible degree value), and inverting the ratio before applying the inverse (writing sin⁻¹(hyp/opp) instead of sin⁻¹(opp/hyp)). Always write the ratio correctly first.",
    ],
    latexBlocks: [
      "\\theta=\\sin^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{hyp}}\\right),\\quad\\theta=\\cos^{-1}\\!\\left(\\frac{\\text{adj}}{\\text{hyp}}\\right),\\quad\\theta=\\tan^{-1}\\!\\left(\\frac{\\text{opp}}{\\text{adj}}\\right)",
    ],
  },
  workedExamples: [
    {
      title: "Use inverse sine",
      questionLatex: "\\text{Find }\\theta\\text{ to the nearest degree.}",
      triangleDiagram: triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=10 and opposite BC=8.",
        { AB: "10", BC: "8" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation: "Opposite (8) and hypotenuse (10) — write the sine ratio.",
          latex: "\\sin\\theta=\\frac{8}{10}",
        },
        {
          explanation: "Apply inverse sine.",
          latex: "\\theta=\\sin^{-1}(0.8)\\approx53^\\circ",
        },
      ],
      finalAnswerLatex: "53^\\circ",
    },
    {
      title: "Use inverse cosine",
      questionLatex: "\\text{Find }\\theta\\text{ to the nearest degree.}",
      triangleDiagram: {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=9 and hypotenuse AB=15.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "15", BC: "9" },
        angleLabels: { B: "theta" },
      },
      steps: [
        {
          explanation: "Adjacent (9) and hypotenuse (15) — write the cosine ratio.",
          latex: "\\cos\\theta=\\frac{9}{15}",
        },
        {
          explanation: "Apply inverse cosine.",
          latex: "\\theta=\\cos^{-1}(0.6)\\approx53^\\circ",
        },
      ],
      finalAnswerLatex: "53^\\circ",
    },
    {
      title: "Use inverse tangent",
      questionLatex: "\\text{Find }\\theta\\text{ to the nearest degree.}",
      triangleDiagram: triangleAltB(
        "Right triangle with right angle at B, unknown theta at A, adjacent AC=7 and opposite BC=7.",
        { AC: "7", BC: "7" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation: "Opposite (7) and adjacent (7) — write the tangent ratio.",
          latex: "\\tan\\theta=\\frac{7}{7}=1",
        },
        {
          explanation: "Apply inverse tangent.",
          latex: "\\theta=\\tan^{-1}(1)=45^\\circ",
        },
      ],
      finalAnswerLatex: "45^\\circ",
    },
  ],
  guidedPractice: [
    choice(
      "tri-ang-g1",
      "The two known sides are the opposite and the hypotenuse. Which inverse function is needed?",
      "A",
      [
        "Inverse sine",
        "Inverse cosine",
        "Inverse tangent",
        "Square root",
      ],
      "SOH links opposite and hypotenuse, so use inverse sine to find the angle."
    ),
    answer(
      "tri-ang-g2",
      "Find theta to the nearest degree.",
      "\\text{opp}=3,\\quad\\text{hyp}=5",
      "37",
      "Sine: sin theta = 3/5 = 0.6. Apply inverse sine: theta = sin⁻¹(0.6) ≈ 37°.",
      ["37°", "37 degrees"],
      triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=5 and opposite BC=3.",
        { AB: "5", BC: "3" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-ang-g3",
      "Find theta to the nearest degree.",
      "\\text{adj}=4,\\quad\\text{hyp}=5",
      "37",
      "Cosine: cos theta = 4/5 = 0.8. Apply inverse cosine: theta = cos⁻¹(0.8) ≈ 37°.",
      ["37°", "37 degrees"],
      {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=4 and hypotenuse AB=5.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "5", BC: "4" },
        angleLabels: { B: "theta" },
      }
    ),
    answer(
      "tri-ang-g4",
      "Find theta to the nearest degree.",
      "\\text{opp}=5,\\quad\\text{adj}=5",
      "45",
      "Tangent: tan theta = 5/5 = 1. Apply inverse tangent: theta = tan⁻¹(1) = 45°.",
      ["45°", "45 degrees"],
      triangleAltB(
        "Right triangle with right angle at B, unknown theta at A, opposite BC=5 and adjacent AC=5.",
        { AC: "5", BC: "5" },
        { A: "theta" }
      )
    ),
  ],
  independentPractice: [
    answer(
      "tri-ang-i1",
      "Find theta to the nearest degree.",
      "\\text{opp}=12,\\quad\\text{hyp}=13",
      "67",
      "Sine: sin theta = 12/13 ≈ 0.9231. Apply inverse sine: theta ≈ 67°.",
      ["67°", "67 degrees"],
      triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=13 and opposite BC=12.",
        { AB: "13", BC: "12" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-ang-i2",
      "Find theta to the nearest degree.",
      "\\text{adj}=8,\\quad\\text{hyp}=10",
      "37",
      "Cosine: cos theta = 8/10 = 0.8. Apply inverse cosine: theta = cos⁻¹(0.8) ≈ 37°.",
      ["37°", "37 degrees"],
      {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=8 and hypotenuse AB=10.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "10", BC: "8" },
        angleLabels: { B: "theta" },
      }
    ),
    answer(
      "tri-ang-i3",
      "Find theta to the nearest degree.",
      "\\text{opp}=9,\\quad\\text{adj}=9",
      "45",
      "Tangent: tan theta = 9/9 = 1. Apply inverse tangent: theta = tan⁻¹(1) = 45°.",
      ["45°", "45 degrees"],
      triangleAltB(
        "Right triangle with right angle at B, unknown theta at A, opposite BC=9 and adjacent AC=9.",
        { AC: "9", BC: "9" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-ang-i4",
      "Which inverse function finds an angle when the adjacent and opposite sides are both given?",
      "C",
      ["Inverse sine", "Inverse cosine", "Inverse tangent", "Pythagoras"],
      "TOA links opposite and adjacent, so use inverse tangent."
    ),
    choice(
      "tri-ang-i5",
      "A student applies inverse sine to (10/6) instead of (6/10) when the opposite is 6 and the hypotenuse is 10. What is wrong?",
      "B",
      [
        "Inverse cosine should be used",
        "The ratio is inverted — it should be sin⁻¹(6/10), not sin⁻¹(10/6)",
        "The calculator must be in radian mode",
        "Both values should be squared first",
      ],
      "Sine equals opp/hyp, which is 6/10. Applying the inverse to 10/6 gives an error because 10/6 > 1, which is outside the valid range for sine."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using sin instead of sin⁻¹ when the angle is unknown.",
      fix: "When the angle is the unknown, apply the inverse function to both sides of the equation.",
    },
    {
      mistake: "Inverting the ratio before applying the inverse function.",
      fix: "Write the ratio in standard SOH-CAH-TOA order first, then apply the inverse to the whole fraction.",
    },
    {
      mistake: "Leaving the calculator in radian mode.",
      fix: "A degree answer between 0° and 90° that comes back as a tiny decimal (e.g. 0.64) is a radian-mode result.",
    },
    {
      mistake: "Using inverse cosine when the opposite and adjacent sides are given.",
      fix: "Cosine involves adjacent and hypotenuse. For opposite and adjacent, use inverse tangent.",
    },
  ],
  masteryQuiz: [
    answer(
      "tri-ang-m1",
      "Find theta to the nearest degree.",
      "\\text{opp}=5,\\quad\\text{hyp}=10",
      "30",
      "Sine: sin theta = 5/10 = 0.5. Apply inverse sine: theta = sin⁻¹(0.5) = 30°.",
      ["30°", "30 degrees"],
      triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=10 and opposite BC=5.",
        { AB: "10", BC: "5" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-ang-m2",
      "Find theta to the nearest degree.",
      "\\text{adj}=8,\\quad\\text{hyp}=16",
      "60",
      "Cosine: cos theta = 8/16 = 0.5. Apply inverse cosine: theta = cos⁻¹(0.5) = 60°.",
      ["60°", "60 degrees"],
      {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=8 and hypotenuse AB=16.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "16", BC: "8" },
        angleLabels: { B: "theta" },
      }
    ),
    answer(
      "tri-ang-m3",
      "Find theta to the nearest degree.",
      "\\text{opp}=7,\\quad\\text{adj}=7",
      "45",
      "Tangent: tan theta = 7/7 = 1. Apply inverse tangent: theta = tan⁻¹(1) = 45°.",
      ["45°", "45 degrees"],
      triangleAltB(
        "Right triangle with right angle at B, unknown theta at A, opposite BC=7 and adjacent AC=7.",
        { AC: "7", BC: "7" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-ang-m4",
      "Which inverse ratio matches the two sides shown in the diagram?",
      "B",
      [
        "Inverse sine",
        "Inverse cosine",
        "Inverse tangent",
        "Pythagoras",
      ],
      "The labelled sides are adjacent and hypotenuse — use inverse cosine.",
      "\\text{Right angle at }C,\\quad\\theta\\text{ unknown at }B,\\quad BC=7\\text{ (adj)},\\;AB=10\\text{ (hyp)}.",
      {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=7 and hypotenuse AB=10.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "10", BC: "7" },
        angleLabels: { B: "theta" },
      }
    ),
    answer(
      "tri-ang-m5",
      "Find theta to the nearest degree.",
      "\\text{opp}=4,\\quad\\text{hyp}=8",
      "30",
      "Sine: sin theta = 4/8 = 0.5. Apply inverse sine: theta = sin⁻¹(0.5) = 30°.",
      ["30°", "30 degrees"],
      triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=8 and opposite BC=4.",
        { AB: "8", BC: "4" },
        { A: "theta" }
      )
    ),
    answer(
      "tri-ang-m6",
      "Find theta to the nearest degree.",
      "\\text{adj}=9,\\quad\\text{hyp}=18",
      "60",
      "Cosine: cos theta = 9/18 = 0.5. Apply inverse cosine: theta = cos⁻¹(0.5) = 60°.",
      ["60°", "60 degrees"],
      {
        description:
          "Right triangle with right angle at C, unknown theta at B, adjacent BC=9 and hypotenuse AB=18.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AB: "18", BC: "9" },
        angleLabels: { B: "theta" },
      }
    ),
    choice(
      "tri-ang-m7",
      "A student's calculator returns 0.93 when finding an angle expected to be around 68 degrees. What is the most likely cause?",
      "C",
      [
        "The ratio was set up incorrectly",
        "The sides were swapped",
        "The calculator is in radian mode",
        "Inverse tangent was used instead of inverse sine",
      ],
      "An angle near 68° should return about 68. A result near 0.93 is what radian mode gives for that same input."
    ),
    answer(
      "tri-ang-m8",
      "Find theta to the nearest degree.",
      "\\text{opp}=7,\\quad\\text{hyp}=25",
      "16",
      "Sine: sin theta = 7/25 = 0.28. Apply inverse sine: theta = sin⁻¹(0.28) ≈ 16°.",
      ["16°", "16 degrees"],
      triangle(
        "Right triangle with right angle at C, unknown theta at A, hypotenuse AB=25 and opposite BC=7.",
        { AB: "25", BC: "7" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-ang-m9",
      "A student writes theta = cos⁻¹(hyp/adj) when the adjacent and hypotenuse are given. What is the correction?",
      "A",
      [
        "Write theta = cos⁻¹(adj/hyp) — cosine is adj over hyp, not hyp over adj",
        "Use inverse sine instead",
        "The ratio is correct but the inverse function is wrong",
        "Swap cos⁻¹ for tan⁻¹",
      ],
      "CAH: cosine = adj/hyp. Applying inverse cosine to the correct fraction gives the angle."
    ),
    answer(
      "tri-ang-m10",
      "A ramp rises 3 m over a horizontal run of 9 m. Find the angle the ramp makes with the ground, to the nearest degree.",
      "\\text{opp (rise)}=3\\text{ m},\\quad\\text{adj (run)}=9\\text{ m}",
      "18",
      "Tangent: tan theta = 3/9 = 0.333. Apply inverse tangent: theta = tan⁻¹(0.333) ≈ 18°.",
      ["18°", "18 degrees"],
      triangleAltB(
        "Right triangle: rise 3 m is opposite, run 9 m is adjacent, unknown angle theta at base.",
        { AC: "9 m", BC: "3 m" },
        { A: "theta" }
      )
    ),
  ],
};

const trigApplications: LessonContent = {
  description:
    "Apply right-angle trigonometry to practical contexts including ramp heights, building heights, shadow lengths and roof pitch.",
  learningIntention:
    "Identify the right triangle in a practical situation, choose the appropriate trig method, and interpret the answer in context.",
  successCriteria: [
    "Draw and label a right triangle from a word description.",
    "Identify the given sides and angle, and name the unknown.",
    "Choose and apply the correct ratio to find the unknown.",
    "State the answer with appropriate units.",
  ],
  teaching: {
    paragraphs: [
      "Many real-world problems involve a right triangle hidden inside a physical situation. Common examples include ramps (the surface is the hypotenuse), buildings with shadows (shadow is adjacent, building height is opposite), and roof pitch (horizontal span is adjacent, rise is opposite).",
      "The process is always the same: draw the right triangle and label the sides relative to the marked angle. Then apply SOH-CAH-TOA exactly as in the earlier lessons. The only new skill is reading the triangle out of a word description.",
      "State your answer with units from the context. A ramp height of 4.0 is meaningless — 4.0 m tells the reader what it is. If the question asks for a length, include the unit. If it asks for an angle, include the degree symbol.",
    ],
    latexBlocks: [
      "\\text{Ramp: hyp = surface, opp = rise, adj = horizontal run}",
      "\\text{Shadow: adj = shadow length, opp = height, hyp = sun-ray path}",
    ],
  },
  workedExamples: [
    {
      title: "Find the height a ramp rises",
      questionLatex:
        "\\text{A ramp surface is }10\\text{ m long and makes an angle of }30^\\circ\\text{ with the ground. Find the height it rises.}",
      triangleDiagram: triangle(
        "Right triangle: ramp surface is hypotenuse 10 m, angle 30 degrees at base, unknown rise x is opposite.",
        { AB: "10 m", BC: "x" },
        { A: "30°" }
      ),
      steps: [
        {
          explanation:
            "The ramp surface (10 m) is the hypotenuse. The rise is opposite the 30° angle — use sine.",
          latex: "\\sin30^\\circ=\\frac{x}{10}",
        },
        {
          explanation: "Multiply both sides by 10.",
          latex: "x=10\\times0.5=5.0\\text{ m}",
        },
      ],
      finalAnswerLatex: "5.0\\text{ m}",
    },
    {
      title: "Find a building height from a shadow",
      questionLatex:
        "\\text{A vertical pole casts a shadow }8\\text{ m long. The angle between the sun-ray and the ground is }37^\\circ.\\text{ Find the height of the pole.}",
      triangleDiagram: {
        description:
          "Right triangle: shadow 8 m is adjacent (ground), angle 37 degrees at far end of shadow, unknown pole height x is opposite.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "x", BC: "8 m" },
        angleLabels: { B: "37°" },
      },
      steps: [
        {
          explanation:
            "Shadow (8 m) is adjacent, pole height is opposite — use tangent.",
          latex: "\\tan37^\\circ=\\frac{x}{8}",
        },
        {
          explanation: "Multiply both sides by 8.",
          latex: "x=8\\times0.7536\\approx6.0\\text{ m}",
        },
      ],
      finalAnswerLatex: "6.0\\text{ m}",
    },
    {
      title: "Find the angle of a roof",
      questionLatex:
        "\\text{A roof rises }4\\text{ m over a horizontal span of }6\\text{ m. Find the angle of the roof to the nearest degree.}",
      triangleDiagram: triangleAltB(
        "Right triangle: horizontal span 6 m is adjacent, rise 4 m is opposite, unknown angle theta at base.",
        { AC: "6 m", BC: "4 m" },
        { A: "theta" }
      ),
      steps: [
        {
          explanation:
            "Rise (4 m) is opposite and horizontal span (6 m) is adjacent — use inverse tangent.",
          latex: "\\theta=\\tan^{-1}\\!\\left(\\frac{4}{6}\\right)",
        },
        {
          explanation: "Evaluate on a calculator in degree mode.",
          latex: "\\theta\\approx34^\\circ",
        },
      ],
      finalAnswerLatex: "34^\\circ",
    },
  ],
  guidedPractice: [
    answer(
      "tri-app-g1",
      "A ramp surface is 6 m long and makes an angle of 30 degrees with the ground. Find the height it rises in metres.",
      "\\text{hyp (ramp surface)}=6\\text{ m},\\quad\\theta=30^\\circ,\\quad\\text{rise is opposite}",
      "3.0",
      "Sine: rise = 6 × sin 30° = 6 × 0.5 = 3.0 m.",
      ["3"],
      triangle(
        "Right triangle: ramp surface 6 m is hypotenuse, angle 30 degrees at base, unknown rise x is opposite.",
        { AB: "6 m", BC: "x" },
        { A: "30°" }
      )
    ),
    choice(
      "tri-app-g2",
      "In a shadow problem, a vertical building casts a horizontal shadow. Which side is the shadow length?",
      "B",
      [
        "Hypotenuse",
        "Adjacent",
        "Opposite",
        "The right angle",
      ],
      "The shadow lies along the ground next to the angle — it is the adjacent side.",
      "\\text{Building height is vertical; shadow is horizontal along the ground.}",
      {
        description:
          "Right triangle for a shadow problem: vertical building height is opposite, horizontal shadow is adjacent, sun-ray path is hypotenuse.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "building", BC: "shadow", AB: "sun ray" },
        angleLabels: { B: "theta" },
      }
    ),
    answer(
      "tri-app-g3",
      "A shadow is 8 m long and the sun angle is 37 degrees. Find the pole height in metres. Round to 1 decimal place.",
      "\\text{adj (shadow)}=8\\text{ m},\\quad\\theta=37^\\circ,\\quad\\text{height is opposite}",
      "6.0",
      "Tangent: height = 8 × tan 37° = 8 × 0.7536 ≈ 6.0 m.",
      ["6", "6 m", "6.0 m"],
      {
        description:
          "Right triangle: shadow 8 m is adjacent, angle 37 degrees at base, unknown height x is opposite.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "x", BC: "8 m" },
        angleLabels: { B: "37°" },
      }
    ),
    answer(
      "tri-app-g4",
      "A ramp surface is 6 m long and makes an angle of 30 degrees with the horizontal. Find the horizontal run in metres.",
      "\\text{hyp (ramp surface)}=6\\text{ m},\\quad\\theta=30^\\circ,\\quad\\text{run is adjacent}",
      "5.2",
      "Cosine: run = 6 × cos 30° = 6 × 0.8660 ≈ 5.2 m.",
      ["5.20", "5.2 m"],
      triangle(
        "Right triangle: ramp surface 6 m is hypotenuse, angle 30 degrees at base, unknown run x is adjacent.",
        { AB: "6 m", AC: "x" },
        { A: "30°" }
      )
    ),
  ],
  independentPractice: [
    answer(
      "tri-app-i1",
      "A ramp surface is 10 m long and is angled at 37 degrees to the ground. Find the rise in metres. Round to 1 decimal place.",
      "\\text{hyp (ramp surface)}=10\\text{ m},\\quad\\theta=37^\\circ,\\quad\\text{rise is opposite}",
      "6.0",
      "Sine: rise = 10 × sin 37° = 10 × 0.6018 ≈ 6.0 m.",
      ["6", "6 m", "6.0 m"],
      triangle(
        "Right triangle: ramp surface 10 m is hypotenuse, angle 37 degrees at base, unknown rise x.",
        { AB: "10 m", BC: "x" },
        { A: "37°" }
      )
    ),
    answer(
      "tri-app-i2",
      "A building is 12 m tall. The angle from the ground to the top is 53 degrees (measured from the base). Find the horizontal distance from the base to the observation point in metres. Round to 1 decimal place.",
      "\\text{opp (height)}=12\\text{ m},\\quad\\theta=53^\\circ,\\quad\\text{horizontal is adjacent}",
      "9.0",
      "Tangent: horizontal = 12 ÷ tan 53° = 12 ÷ 1.3270 ≈ 9.0 m.",
      ["9", "9 m", "9.0 m"],
      triangleAltB(
        "Right triangle: building height 12 m is opposite, angle 53 degrees at base, unknown horizontal distance x is adjacent.",
        { AC: "x", BC: "12 m" },
        { A: "53°" }
      )
    ),
    answer(
      "tri-app-i3",
      "A 9 m pole casts a shadow. The angle from the tip of the shadow to the top of the pole is 45 degrees. Find the shadow length in metres.",
      "\\text{opp (pole)}=9\\text{ m},\\quad\\theta=45^\\circ,\\quad\\text{shadow is adjacent}",
      "9.0",
      "Tangent: tan 45° = 1, so shadow = 9 ÷ tan 45° = 9 ÷ 1 = 9.0 m.",
      ["9"],
      {
        description:
          "Right triangle: pole height 9 m is opposite, angle 45 degrees at base, unknown shadow length x is adjacent.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "9 m", BC: "x" },
        angleLabels: { B: "45°" },
      }
    ),
    answer(
      "tri-app-i4",
      "A roof rises 6 m over a horizontal span of 8 m. Find the angle of the roof to the nearest degree.",
      "\\text{opp (rise)}=6\\text{ m},\\quad\\text{adj (span)}=8\\text{ m}",
      "37",
      "Tangent: theta = tan⁻¹(6/8) = tan⁻¹(0.75) ≈ 37°.",
      ["37°", "37 degrees"],
      triangleAltB(
        "Right triangle: rise 6 m is opposite, span 8 m is adjacent, unknown angle theta at base.",
        { AC: "8 m", BC: "6 m" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-app-i5",
      "A ramp rises to a platform and the hypotenuse (ramp surface) and angle are both given. Which method finds the rise?",
      "A",
      [
        "Multiply the ramp length by sine of the angle",
        "Divide the ramp length by cosine of the angle",
        "Multiply the ramp length by cosine of the angle",
        "Use Pythagoras with the ramp and angle",
      ],
      "Sine links opposite (rise) and hypotenuse (ramp). Rise = ramp × sin θ."
    ),
  ],
  commonMistakes: [
    {
      mistake: "Identifying the ramp surface as the opposite side.",
      fix: "The ramp surface is the hypotenuse — it is the longest side and lies opposite the right angle.",
    },
    {
      mistake: "Forgetting to include units in a practical answer.",
      fix: "Return to the context after calculating and attach the correct unit (m, cm, etc.).",
    },
    {
      mistake: "Using the elevation/depression angle as the interior right-triangle angle incorrectly.",
      fix: "Draw the right triangle first and mark the angle at the correct vertex before applying any formula.",
    },
    {
      mistake: "Confusing shadow (adjacent) with the sun-ray path (hypotenuse).",
      fix: "The shadow is horizontal — it touches the angle at the base and is not the hypotenuse.",
    },
  ],
  masteryQuiz: [
    answer(
      "tri-app-m1",
      "A ramp surface is 20 m long and makes an angle of 30 degrees with the ground. Find the rise in metres.",
      "\\text{hyp}=20\\text{ m},\\quad\\theta=30^\\circ,\\quad\\text{rise is opposite}",
      "10.0",
      "Sine: rise = 20 × sin 30° = 20 × 0.5 = 10.0 m.",
      ["10"],
      triangle(
        "Right triangle: ramp surface 20 m hypotenuse, 30 degrees at base, rise x is opposite.",
        { AB: "20 m", BC: "x" },
        { A: "30°" }
      )
    ),
    answer(
      "tri-app-m2",
      "A ramp rises 5 m at an angle of 30 degrees to the ground. Find the horizontal run in metres. Round to 1 decimal place.",
      "\\text{opp (rise)}=5\\text{ m},\\quad\\theta=30^\\circ,\\quad\\text{run is adjacent}",
      "8.7",
      "Tangent: run = 5 ÷ tan 30° = 5 ÷ 0.5774 ≈ 8.7 m.",
      ["8.70", "8.7 m"],
      triangleAltB(
        "Right triangle: rise 5 m is opposite, angle 30 degrees at base, unknown run x is adjacent.",
        { AC: "x", BC: "5 m" },
        { A: "30°" }
      )
    ),
    choice(
      "tri-app-m3",
      "In a shadow problem, which trig ratio connects the shadow length (adjacent) and the building height (opposite)?",
      "C",
      ["Sine", "Cosine", "Tangent", "Inverse cosine"],
      "TOA: tangent links opposite (height) and adjacent (shadow)."
    ),
    answer(
      "tri-app-m4",
      "A shadow is 12 m long and the sun angle is 45 degrees. Find the building height in metres.",
      "\\text{adj (shadow)}=12\\text{ m},\\quad\\theta=45^\\circ,\\quad\\text{height is opposite}",
      "12 m",
      "Tangent: height = 12 × tan 45° = 12 × 1 = 12.0 m.",
      ["12", "12.0", "12.0 m"],
      {
        description:
          "Right triangle: shadow 12 m is adjacent, angle 45 degrees at base, unknown height x is opposite.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "x", BC: "12 m" },
        angleLabels: { B: "45°" },
      }
    ),
    answer(
      "tri-app-m5",
      "A ramp surface is 13 m long and rises 5 m. Find the angle the ramp makes with the ground to the nearest degree.",
      "\\text{hyp}=13\\text{ m},\\quad\\text{opp (rise)}=5\\text{ m}",
      "23",
      "Sine: theta = sin⁻¹(5/13) = sin⁻¹(0.3846) ≈ 23°.",
      ["23°", "23 degrees"],
      triangle(
        "Right triangle: ramp surface 13 m is hypotenuse, rise 5 m is opposite, unknown angle theta at base.",
        { AB: "13 m", BC: "5 m" },
        { A: "theta" }
      )
    ),
    choice(
      "tri-app-m6",
      "In a ramp problem, which side is the hypotenuse?",
      "D",
      [
        "The horizontal ground",
        "The vertical rise",
        "The right angle",
        "The sloped ramp surface",
      ],
      "The ramp surface is the longest side and lies opposite the right angle at the corner of the ramp."
    ),
    answer(
      "tri-app-m7",
      "A roof makes an angle of 40 degrees with the horizontal. The horizontal span is 10 m. Find the rise in metres. Round to 1 decimal place.",
      "\\text{adj (span)}=10\\text{ m},\\quad\\theta=40^\\circ,\\quad\\text{rise is opposite}",
      "8.4",
      "Tangent: rise = 10 × tan 40° = 10 × 0.8391 ≈ 8.4 m.",
      ["8.40", "8.4 m"],
      triangleAltB(
        "Right triangle: span 10 m is adjacent, angle 40 degrees at base, unknown rise x is opposite.",
        { AC: "10 m", BC: "x" },
        { A: "40°" }
      )
    ),
    answer(
      "tri-app-m8",
      "A building stands 7 m from a measurement point. The angle from the ground to the top of the building is 60 degrees. Find the building height in metres. Round to 1 decimal place.",
      "\\text{adj (distance)}=7\\text{ m},\\quad\\theta=60^\\circ,\\quad\\text{height is opposite}",
      "12.1",
      "Tangent: height = 7 × tan 60° = 7 × 1.7321 ≈ 12.1 m.",
      ["12.10", "12.1 m"],
      {
        description:
          "Right triangle: horizontal distance 7 m is adjacent, angle 60 degrees at base, unknown height x is opposite.",
        vertices: {
          A: { x: 80, y: 40 },
          C: { x: 80, y: 230 },
          B: { x: 330, y: 230 },
        },
        rightAngleAt: "C",
        sideLabels: { AC: "x", BC: "7 m" },
        angleLabels: { B: "60°" },
      }
    ),
    choice(
      "tri-app-m9",
      "A ramp surface and its angle are given. Which ratio finds the rise (height)?",
      "A",
      [
        "Sine: rise = ramp × sin θ",
        "Cosine: rise = ramp × cos θ",
        "Tangent: rise = ramp × tan θ",
        "Pythagoras: rise = ramp − run",
      ],
      "Sine links the opposite (rise) and the hypotenuse (ramp surface)."
    ),
    answer(
      "tri-app-m10",
      "A ramp must rise 4 m with the ramp surface inclined at 53 degrees. Find the length of the ramp surface in metres. Round to 1 decimal place.",
      "\\text{opp (rise)}=4\\text{ m},\\quad\\theta=53^\\circ,\\quad\\text{ramp surface is hypotenuse}",
      "5.0",
      "Sine: ramp = 4 ÷ sin 53° = 4 ÷ 0.7986 ≈ 5.0 m.",
      ["5", "5 m", "5.0 m"],
      triangle(
        "Right triangle: ramp surface x is hypotenuse, rise 4 m is opposite, angle 53 degrees at base.",
        { AB: "x", BC: "4 m" },
        { A: "53°" }
      )
    ),
  ],
};

const trigElevationDepression: LessonContent = {
  description: "Apply trigonometry to solve problems involving angles of elevation and depression.",
  learningIntention: "Use right-angle trigonometry to find unknown distances and angles in elevation and depression problems.",
  successCriteria: [
    "Identify the angle of elevation as measured upward from the horizontal.",
    "Identify the angle of depression as measured downward from the horizontal.",
    "Draw and label a right triangle from an elevation or depression scenario.",
    "Apply SOH-CAH-TOA to find an unknown side or angle.",
    "State that the angle of elevation from A to B equals the angle of depression from B to A.",
  ],
  teaching: {
    paragraphs: [
      "The angle of elevation is the angle measured upward from the horizontal to a line of sight aimed at an object above eye level. If you look up at a flagpole from the ground, the angle between the horizontal and your line of sight is the angle of elevation.",
      "The angle of depression is the angle measured downward from the horizontal to a line of sight aimed at an object below eye level. A lookout at the top of a cliff looking down at a boat uses the angle of depression.",
      "In both cases, the horizontal, the vertical height, and the line of sight form a right triangle. The angle of elevation or depression is the angle at the observer's position inside that triangle. Use SOH-CAH-TOA exactly as you would for any right-triangle problem.",
      "A useful symmetry: the angle of elevation from A looking up to B is always equal to the angle of depression from B looking down to A. They are alternate angles between the parallel horizontal lines at each point.",
    ],
    latexBlocks: [
      "\\tan(\\theta)=\\frac{\\text{height}}{\\text{horizontal distance}}",
      "\\sin(\\theta)=\\frac{\\text{height}}{\\text{line of sight}}",
      "\\text{angle of elevation from }A = \\text{angle of depression from }B",
    ],
  },
  workedExamples: [
    {
      title: "Find height using angle of elevation",
      questionLatex: "\\text{A flagpole is 15 m from an observer. The angle of elevation to the top is }40^\\circ\\text{. Find the height.}",
      steps: [
        { explanation: "The horizontal distance is 15 m and the angle of elevation is 40°. Height is the opposite side, horizontal distance is the adjacent.", latex: "\\tan(40^\\circ)=\\frac{h}{15}" },
        { explanation: "Rearrange to find h.", latex: "h=15\\times\\tan(40^\\circ)\\approx15\\times0.839=12.6\\text{ m}" },
      ],
      finalAnswerLatex: "\\text{height}\\approx12.6\\text{ m}",
    },
    {
      title: "Find distance using angle of depression",
      questionLatex: "\\text{From the top of a 60 m cliff, the angle of depression to a boat is }25^\\circ\\text{. Find the horizontal distance to the boat.}",
      steps: [
        { explanation: "The height is 60 m and the angle of depression is 25°. The opposite is 60 m and the unknown is the adjacent.", latex: "\\tan(25^\\circ)=\\frac{60}{d}" },
        { explanation: "Rearrange to find d.", latex: "d=\\frac{60}{\\tan(25^\\circ)}\\approx\\frac{60}{0.466}\\approx128.7\\text{ m}" },
      ],
      finalAnswerLatex: "\\text{horizontal distance}\\approx128.7\\text{ m}",
    },
    {
      title: "Find the angle of elevation",
      questionLatex: "\\text{A building is 40 m tall. An observer stands 40 m from its base. Find the angle of elevation to the top.}",
      steps: [
        { explanation: "Opposite = 40 m (height), adjacent = 40 m (horizontal distance).", latex: "\\tan(\\theta)=\\frac{40}{40}=1" },
        { explanation: "Apply the inverse tangent.", latex: "\\theta=\\tan^{-1}(1)=45^\\circ" },
      ],
      finalAnswerLatex: "\\theta=45^\\circ",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-tri-elv-g1",
      "The angle of elevation is measured from which reference line?",
      "B",
      [
        "The vertical, upward from the ground.",
        "The horizontal, upward to the line of sight.",
        "The horizontal, downward to the object.",
        "The hypotenuse, measured at the base.",
      ],
      "Elevation angles are always measured upward from the horizontal to the line of sight."
    ),
    answer(
      "y9c-tri-elv-g2",
      "A flagpole stands 15 m from an observer. The angle of elevation to the top is 30°. Find the height of the flagpole in metres. Round to 1 decimal place.",
      "\\tan(30^\\circ)=\\dfrac{h}{15}",
      "8.7",
      "h = 15 × tan(30°) ≈ 15 × 0.577 = 8.7 m.",
      ["8.7 m"],
      triangle("Right triangle: height h is opposite, 15 m is adjacent, angle of elevation 30° at observer.", { AC: "h", BC: "15 m" }, { B: "30°" })
    ),
    answer(
      "y9c-tri-elv-g3",
      "A building is 50 m tall. An observer stands 50 m from its base. What is the angle of elevation to the top in degrees?",
      "\\tan(\\theta)=\\dfrac{50}{50}=1",
      "45",
      "tan(θ) = 50/50 = 1, so θ = tan⁻¹(1) = 45°.",
      ["45°"]
    ),
    choice(
      "y9c-tri-elv-g4",
      "The angle of depression from the top of a cliff to a boat is 35°. What is the angle of elevation from the boat to the top of the cliff?",
      "A",
      ["35°", "55°", "90°", "145°"],
      "The angle of elevation from the boat equals the angle of depression from the cliff — they are alternate angles between parallel horizontal lines."
    ),
  ],
  independentPractice: [
    answer(
      "y9c-tri-elv-i1",
      "An observer stands 25 m from a tree. The angle of elevation to the top of the tree is 40°. Find the height of the tree in metres. Round to 1 decimal place.",
      "\\tan(40^\\circ)=\\dfrac{h}{25}",
      "21.0",
      "h = 25 × tan(40°) ≈ 25 × 0.839 = 21.0 m.",
      ["21.0 m", "21 m", "21"],
      triangle("Right triangle: tree height h opposite, 25 m adjacent, angle 40° at observer.", { AC: "h", BC: "25 m" }, { B: "40°" })
    ),
    answer(
      "y9c-tri-elv-i2",
      "From the top of an 80 m cliff, the angle of depression to a boat is 20°. Find the horizontal distance from the base of the cliff to the boat. Round to the nearest metre.",
      "\\tan(20^\\circ)=\\dfrac{80}{d}",
      "220",
      "d = 80 ÷ tan(20°) ≈ 80 ÷ 0.364 ≈ 219.8 ≈ 220 m.",
      ["220 m"],
      triangle("Right triangle: cliff height 80 m opposite, horizontal distance d adjacent, angle of depression 20° at cliff top.", { AC: "80 m", BC: "d" }, { B: "20°" })
    ),
    answer(
      "y9c-tri-elv-i3",
      "A kite is flown on 80 m of string at an angle of elevation of 35°. Find the height of the kite above the ground in metres. Round to 1 decimal place.",
      "\\sin(35^\\circ)=\\dfrac{h}{80}",
      "45.9",
      "h = 80 × sin(35°) ≈ 80 × 0.574 = 45.9 m.",
      ["45.9 m"],
      triangle("Right triangle: kite height h opposite, string 80 m is hypotenuse, elevation angle 35° at base.", { AB: "80 m", BC: "h" }, { A: "35°" })
    ),
    answer(
      "y9c-tri-elv-i4",
      "From a window 90 m above the street, the angle of depression to a point on the street is 40°. How far horizontally is the point from directly below the window? Round to the nearest metre.",
      "\\tan(40^\\circ)=\\dfrac{90}{d}",
      "107",
      "d = 90 ÷ tan(40°) ≈ 90 ÷ 0.839 ≈ 107 m.",
      ["107 m"]
    ),
    choice(
      "y9c-tri-elv-i5",
      "From a 50 m cliff, the angle of depression to a boat is 40°. Which expression gives the horizontal distance to the boat?",
      "B",
      [
        "$50\\times\\tan(40^\\circ)$",
        "$50\\div\\tan(40^\\circ)$",
        "$50\\times\\sin(40^\\circ)$",
        "$50\\div\\sin(40^\\circ)$",
      ],
      "tan(40°) = 50/d, so d = 50 ÷ tan(40°)."
    ),
  ],
  commonMistakes: [
    { mistake: "Measuring the angle from the vertical instead of the horizontal.", fix: "Elevation and depression angles are always measured from the horizontal line of sight." },
    { mistake: "Confusing which side is opposite and which is adjacent.", fix: "The height (vertical) is always the opposite side; the horizontal distance is always the adjacent side." },
    { mistake: "Using sin instead of tan when only the horizontal distance and height are given.", fix: "When you have opposite and adjacent (no hypotenuse), use tan." },
    { mistake: "Thinking the angle of depression and elevation are supplementary (add to 180°).", fix: "They are equal — alternate angles between parallel horizontal lines." },
  ],
  masteryQuiz: [
    answer(
      "y9c-tri-elv-m1",
      "A ladder 8 m long rests against a wall at an angle of elevation of 70°. How high up the wall does the ladder reach? Round to 1 decimal place.",
      "\\sin(70^\\circ)=\\dfrac{h}{8}",
      "7.5",
      "h = 8 × sin(70°) ≈ 8 × 0.940 = 7.5 m.",
      ["7.5 m"],
      triangle("Right triangle: wall height h opposite, ladder 8 m is hypotenuse, angle 70° at base.", { AB: "8 m", BC: "h" }, { A: "70°" })
    ),
    answer(
      "y9c-tri-elv-m2",
      "A person stands 60 m from the base of a tower. The angle of elevation to the top is 28°. Find the height of the tower in metres. Round to 1 decimal place.",
      "\\tan(28^\\circ)=\\dfrac{h}{60}",
      "31.9",
      "h = 60 × tan(28°) ≈ 60 × 0.532 = 31.9 m.",
      ["31.9 m"],
      triangle("Right triangle: tower height h opposite, 60 m adjacent, elevation angle 28°.", { AC: "h", BC: "60 m" }, { B: "28°" })
    ),
    choice(
      "y9c-tri-elv-m3",
      "From the top of a 40 m cliff, the angle of depression to a boat directly below is 45°. How far is the boat horizontally from the base of the cliff?",
      "B",
      ["20 m", "40 m", "57 m", "80 m"],
      "tan(45°) = 40/d, so d = 40 ÷ tan(45°) = 40 ÷ 1 = 40 m."
    ),
    answer(
      "y9c-tri-elv-m4",
      "The angle of elevation from the ground to the top of a cliff is 25°. What is the angle of depression from the top of the cliff back to the same point on the ground?",
      "\\text{alternate angles}",
      "25",
      "The angle of depression from the top equals the angle of elevation from the ground — they are alternate angles between parallel horizontal lines.",
      ["25°"]
    ),
    answer(
      "y9c-tri-elv-m5",
      "From the top of a 45 m building, the angle of depression to a car on the street is 32°. How far is the car from the base of the building? Round to 1 decimal place.",
      "\\tan(32^\\circ)=\\dfrac{45}{d}",
      "72.0",
      "d = 45 ÷ tan(32°) ≈ 45 ÷ 0.625 = 72.0 m.",
      ["72 m", "72"],
      triangle("Right triangle: building 45 m opposite, distance d adjacent, depression angle 32°.", { AC: "45 m", BC: "d" }, { B: "32°" })
    ),
    answer(
      "y9c-tri-elv-m6",
      "A ramp is 12 m long and inclined at 15° to the horizontal. Find the vertical height of the ramp in metres. Round to 1 decimal place.",
      "\\sin(15^\\circ)=\\dfrac{h}{12}",
      "3.1",
      "h = 12 × sin(15°) ≈ 12 × 0.259 = 3.1 m.",
      ["3.1 m"],
      triangle("Right triangle: ramp 12 m hypotenuse, height h opposite, angle 15° at base.", { AB: "12 m", BC: "h" }, { A: "15°" })
    ),
    choice(
      "y9c-tri-elv-m7",
      "A student draws the elevation diagram and marks the angle of elevation between the vertical wall and the line of sight. What has the student done wrong?",
      "A",
      [
        "The angle of elevation is measured from the horizontal, not the vertical.",
        "The angle should be at the top of the diagram.",
        "The line of sight should be horizontal.",
        "The angle of elevation cannot be found without the hypotenuse.",
      ],
      "The angle of elevation is always measured upward from the horizontal to the line of sight."
    ),
    answer(
      "y9c-tri-elv-m8",
      "An observer stands 90 m from a building. The angle of elevation to the top is 38°. Find the height of the building in metres. Round to 1 decimal place.",
      "\\tan(38^\\circ)=\\dfrac{h}{90}",
      "70.3",
      "h = 90 × tan(38°) ≈ 90 × 0.781 = 70.3 m.",
      ["70.3 m"],
      triangle("Right triangle: building height h opposite, 90 m adjacent, angle 38°.", { AC: "h", BC: "90 m" }, { B: "38°" })
    ),
    answer(
      "y9c-tri-elv-m9",
      "From a window 70 m above the ground, the angle of depression to a parked car is 30°. How far is the car from directly below the window? Round to 1 decimal place.",
      "\\tan(30^\\circ)=\\dfrac{70}{d}",
      "121.2",
      "d = 70 ÷ tan(30°) = 70 ÷ (1/√3) = 70√3 ≈ 121.2 m.",
      ["121.2 m", "121 m", "121"],
      triangle("Right triangle: height 70 m opposite, distance d adjacent, depression angle 30°.", { AC: "70 m", BC: "d" }, { B: "30°" })
    ),
    answer(
      "y9c-tri-elv-m10",
      "A ramp is 20 m long and makes an angle of 12° with the horizontal. Find the horizontal run of the ramp in metres. Round to 1 decimal place.",
      "\\cos(12^\\circ)=\\dfrac{\\text{run}}{20}",
      "19.6",
      "run = 20 × cos(12°) ≈ 20 × 0.978 = 19.6 m.",
      ["19.6 m"],
      triangle("Right triangle: ramp 20 m hypotenuse, horizontal run adjacent, angle 12° at base.", { AB: "20 m", BC: "run" }, { A: "12°" })
    ),
  ],
};

const trigBearings: LessonContent = {
  description: "Use true bearings and compass bearings to describe direction, and apply trigonometry to solve bearing problems.",
  learningIntention: "Apply right-angle trigonometry to solve problems involving true bearings and compass bearings.",
  successCriteria: [
    "State that a true bearing is measured clockwise from North and expressed with three digits.",
    "Convert between compass bearings (e.g. N40°E) and true bearings (e.g. 040°).",
    "Draw a right triangle from a bearing problem and identify its components.",
    "Calculate north–south and east–west distances using trigonometry.",
  ],
  teaching: {
    paragraphs: [
      "A true bearing is the angle measured clockwise from North, always written using three digits. Due East is 090°, due South is 180°, due West is 270°, and due North is 360° (or 000°).",
      "A compass bearing uses the four cardinal directions as a reference. N40°E means 'start facing North, rotate 40° toward East.' It is the same as a true bearing of 040°. S30°W means 'start facing South, rotate 30° toward West,' which equals 210°.",
      "To solve a bearing problem, draw a diagram with North pointing up. Mark the path as the hypotenuse of a right triangle. The north–south leg and east–west leg are the other two sides. For a bearing of 030° and distance D, the northward distance is D cos(30°) and the eastward distance is D sin(30°).",
      "The angle in the right triangle relates to the bearing. For a bearing in the NE quadrant (0° to 90°), the angle from North equals the bearing. Use sine for the east–west component and cosine for the north–south component.",
    ],
    latexBlocks: [
      "\\text{North component} = D\\cos(\\theta),\\quad\\text{East component} = D\\sin(\\theta)",
      "\\text{N40}^\\circ\\text{E} = 040^\\circ,\\quad\\text{S30}^\\circ\\text{W} = 210^\\circ",
      "\\text{Back bearing} = \\text{forward bearing}\\pm180^\\circ",
    ],
  },
  workedExamples: [
    {
      title: "Convert a compass bearing to a true bearing",
      questionLatex: "\\text{Express S45}^\\circ\\text{W as a true bearing.}",
      steps: [
        { explanation: "S45°W starts at South (180°) and rotates 45° toward West.", latex: "180^\\circ+45^\\circ=225^\\circ" },
      ],
      finalAnswerLatex: "225^\\circ",
    },
    {
      title: "Find north and east components from a bearing",
      questionLatex: "\\text{A ship sails on bearing }060^\\circ\\text{ for 80 km. Find how far north and east it has moved.}",
      steps: [
        { explanation: "The bearing is 60° from North. Draw a right triangle with the path as hypotenuse.", latex: "\\text{North component} = 80\\cos(60^\\circ)=80\\times0.5=40\\text{ km}" },
        { explanation: "Calculate the east component using sine.", latex: "\\text{East component} = 80\\sin(60^\\circ)\\approx80\\times0.866=69.3\\text{ km}" },
      ],
      finalAnswerLatex: "\\text{40 km north, 69.3 km east}",
    },
    {
      title: "Find a bearing from north-south and east-west distances",
      questionLatex: "\\text{A town is 30 km north and 30 km east of a city. Find the true bearing from the city to the town.}",
      steps: [
        { explanation: "The north and east distances are equal, so the path is at 45° from North.", latex: "\\tan(\\theta)=\\frac{30}{30}=1\\implies\\theta=45^\\circ" },
        { explanation: "The direction is NE, so the bearing is 045°.", latex: "\\text{bearing}=045^\\circ" },
      ],
      finalAnswerLatex: "045^\\circ",
    },
  ],
  guidedPractice: [
    choice(
      "y9c-tri-brg-g1",
      "A true bearing is measured from North in which direction?",
      "B",
      ["Anti-clockwise", "Clockwise", "Toward East only", "Toward South only"],
      "True bearings are always measured clockwise from North."
    ),
    answer(
      "y9c-tri-brg-g2",
      "Express the compass bearing N40°E as a true bearing using three digits (for example, 045).",
      "\\text{N}40^\\circ\\text{E}",
      "040",
      "N40°E means 40° clockwise from North, which is the true bearing 040°.",
      ["040°", "40", "40°"]
    ),
    choice(
      "y9c-tri-brg-g3",
      "What compass direction corresponds to a true bearing of 270°?",
      "D",
      ["North", "East", "South", "West"],
      "090° = East, 180° = South, 270° = West, 360°/000° = North."
    ),
    answer(
      "y9c-tri-brg-g4",
      "Express the compass bearing S30°W as a true bearing using three digits.",
      "\\text{S}30^\\circ\\text{W}",
      "210",
      "S30°W starts at South (180°) and adds 30° toward West: 180° + 30° = 210°.",
      ["210°"]
    ),
  ],
  independentPractice: [
    answer(
      "y9c-tri-brg-i1",
      "A ship sails due East for 50 km. What is the true bearing of its direction of travel?",
      "\\text{due East}",
      "090",
      "Due East corresponds to a true bearing of 090°.",
      ["090°", "90", "90°"]
    ),
    answer(
      "y9c-tri-brg-i2",
      "Convert the true bearing 135° to a compass bearing (for example, S45°E).",
      "135^\\circ",
      "S45°E",
      "135° is in the SE quadrant. 135° = 180° − 45°, so it is 45° from South toward East: S45°E.",
      ["S45E", "s45e", "S 45 E"]
    ),
    answer(
      "y9c-tri-brg-i3",
      "A ship travels on bearing 030° for 60 km. How far north has it moved? Round to 1 decimal place.",
      "\\text{North} = 60\\cos(30^\\circ)",
      "52.0",
      "North = 60 × cos(30°) ≈ 60 × 0.866 = 52.0 km.",
      ["52.0 km", "52 km", "52"],
      triangle("Right triangle: bearing path 60 km is hypotenuse, north leg AC, east leg BC, bearing angle 30° at top.", { AB: "60 km", AC: "North", BC: "East" }, { A: "30°" })
    ),
    choice(
      "y9c-tri-brg-i4",
      "A bearing of 045° points in which compass direction?",
      "A",
      ["NE (north-east)", "SE (south-east)", "NW (north-west)", "SW (south-west)"],
      "045° is halfway between 000° (North) and 090° (East), so it points north-east."
    ),
    answer(
      "y9c-tri-brg-i5",
      "Express the compass bearing S70°E as a true bearing.",
      "\\text{S}70^\\circ\\text{E}",
      "110",
      "S70°E starts at South (180°) and rotates 70° toward East: 180° − 70° = 110°.",
      ["110°"]
    ),
  ],
  commonMistakes: [
    { mistake: "Adding instead of subtracting when converting S70°E to a true bearing.", fix: "For S θ°E, the true bearing = 180° − θ. For S θ°W, the true bearing = 180° + θ." },
    { mistake: "Using sin for the north component and cos for the east component.", fix: "North = D cos(bearing angle from North), East = D sin(bearing angle from North)." },
    { mistake: "Writing a true bearing with fewer than three digits (e.g. 45° instead of 045°).", fix: "True bearings always use three digits: 045°, not 45°." },
    { mistake: "Confusing the back-bearing with the complement of the forward bearing.", fix: "The back bearing = forward bearing ± 180°. Add 180° if the forward bearing is less than 180°." },
  ],
  masteryQuiz: [
    answer(
      "y9c-tri-brg-m1",
      "Convert the true bearing 315° to a compass bearing.",
      "315^\\circ",
      "N45°W",
      "315° = 360° − 45°, which is 45° west of North: N45°W.",
      ["N45W", "n45w", "N 45 W"]
    ),
    choice(
      "y9c-tri-brg-m2",
      "Which true bearing is equivalent to S25°W?",
      "C",
      ["025°", "155°", "205°", "335°"],
      "S25°W: start at South (180°) and add 25° toward West → 180° + 25° = 205°."
    ),
    answer(
      "y9c-tri-brg-m3",
      "A ship sails 120 km on bearing 060°. How far east has it moved? Round to 1 decimal place.",
      "\\text{East} = 120\\sin(60^\\circ)",
      "103.9",
      "East = 120 × sin(60°) ≈ 120 × 0.866 = 103.9 km.",
      ["103.9 km"],
      triangle("Right triangle: path 120 km hypotenuse, north leg AC, east leg BC, bearing angle 60° at top.", { AB: "120 km", AC: "North", BC: "East" }, { A: "60°" })
    ),
    answer(
      "y9c-tri-brg-m4",
      "A ship sails 120 km on bearing 060°. How far north has it moved? Round to 1 decimal place.",
      "\\text{North} = 120\\cos(60^\\circ)",
      "60.0",
      "North = 120 × cos(60°) = 120 × 0.5 = 60.0 km.",
      ["60 km", "60"]
    ),
    answer(
      "y9c-tri-brg-m5",
      "A plane travels 8 km north and 6 km east. Find the true bearing from the starting point to the finishing point. Round to the nearest degree.",
      "\\tan(\\theta)=\\dfrac{6}{8}",
      "37",
      "θ = tan⁻¹(6/8) = tan⁻¹(0.75) ≈ 36.9° ≈ 37°. The direction is NE so the bearing is 037°.",
      ["037", "037°", "37°"]
    ),
    choice(
      "y9c-tri-brg-m6",
      "What is the back-bearing (return bearing) of a bearing of 040°?",
      "C",
      ["040°", "140°", "220°", "310°"],
      "Back bearing = 040° + 180° = 220°."
    ),
    answer(
      "y9c-tri-brg-m7",
      "A boat sails on bearing 330° for 80 km. How far north has it moved? Round to 1 decimal place.",
      "\\text{North} = 80\\cos(330^\\circ)",
      "69.3",
      "cos(330°) = cos(360° − 30°) = cos(30°) ≈ 0.866. North = 80 × 0.866 = 69.3 km.",
      ["69.3 km"]
    ),
    answer(
      "y9c-tri-brg-m8",
      "A ship is 50 km due south of port. A lighthouse is 50 km due east of port. Find the true bearing from the ship to the lighthouse. Round to the nearest degree.",
      "\\tan(\\theta)=\\dfrac{50}{50}",
      "45",
      "From the ship, the lighthouse is 50 km north and 50 km east. tan(θ) = 50/50 = 1, so θ = 45°. Bearing = 045°.",
      ["045", "045°", "45°"]
    ),
    choice(
      "y9c-tri-brg-m9",
      "A student says a true bearing of 270° is the same as due West. Is this correct?",
      "A",
      [
        "Yes — 270° is due West.",
        "No — 270° is due East.",
        "No — 270° is due South.",
        "No — 270° is NW.",
      ],
      "Clockwise from North: 090° = East, 180° = South, 270° = West, 360° = North. So 270° is indeed due West."
    ),
    answer(
      "y9c-tri-brg-m10",
      "A person walks on bearing 150° for 40 km. How far south have they moved? Round to 1 decimal place.",
      "\\text{Bearing }150^\\circ\\Rightarrow\\text{South component}=40\\cos(30^\\circ)",
      "34.6",
      "Bearing 150° = S30°E. South component = 40 × cos(30°) ≈ 40 × 0.866 = 34.6 km.",
      ["34.6 km"]
    ),
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
  "trig-naming-sides": trigNamingSides,
  "trig-ratios-intro": trigRatiosIntro,
  "trig-finding-sides-multiply": trigFindingSidesMultiply,
  "trig-finding-sides-divide": trigFindingSidesDivide,
  "trig-choosing-ratio": trigChoosingRatio,
  "trig-finding-angles": trigFindingAngles,
  "trig-applications": trigApplications,
  "trig-elevation-depression": trigElevationDepression,
  "trig-bearings": trigBearings,
};

export function year9WorkingWithTrianglesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) ||
    unit.slug !== "working-with-triangles"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) {
    return null;
  }

  return enhanceYear9CoreLesson(course, unit, lesson, {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  });
}
