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
import { volumeSurfaceAreaQuestionVisuals } from "./volumeSurfaceAreaVisuals";

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
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint,
    explanation,
  };
}

// Difficulty-tagged pool builders (1 = easiest … 5 = hardest).
function poolA(
  id: string,
  difficulty: number,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint,
    explanation,
  };
}

function poolC(
  id: string,
  difficulty: number,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint: string,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    difficulty,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint,
    explanation,
  };
}

// ── Lesson 1: Volume of Prisms ────────────────────────────────────────────────

const volumeOfPrisms: LessonContent = {
  description:
    "Calculate the volume of rectangular and triangular prisms using the formula V = Ah, and solve problems involving finding a missing dimension from a known volume.",
  learningIntention:
    "Calculate the volume of prisms by multiplying the cross-sectional area by the length, and find missing dimensions from a given volume.",
  successCriteria: [
    "State that the volume of any prism equals the cross-sectional area multiplied by the length.",
    "Calculate the volume of a rectangular prism using V = l × w × h.",
    "Calculate the volume of a triangular prism using V = ½ × b × h × l.",
    "Find a missing dimension of a prism given its volume and other measurements.",
  ],
  teaching: {
    paragraphs: [
      "Volume measures the three-dimensional space a solid occupies. It is measured in cubic units — cm³, m³, mm³. Think of filling a solid with unit cubes; the number of cubes is the volume.",
      "A prism is a solid with a uniform cross-section — the same shape all the way through. The volume of any prism is found by multiplying the area of the cross-section by the length the prism extends: $V = A \\times l$.",
      "For a rectangular prism, the cross-section is a rectangle, so $A = w \\times h$ and $V = l \\times w \\times h$. For a triangular prism, the cross-section is a triangle, so $A = \\frac{1}{2} \\times b \\times h$ and $V = \\frac{1}{2} \\times b \\times h \\times l$.",
      "A common mistake is forgetting the $\\frac{1}{2}$ when the cross-section is a triangle. Always find the cross-sectional area first, then multiply by the prism length.",
    ],
    latexBlocks: [
      "V = A \\times l \\quad (\\text{any prism})",
      "V_{\\text{rect}} = l \\times w \\times h",
      "V_{\\text{tri}} = \\frac{1}{2} \\times b \\times h \\times l",
    ],
  },
  workedExamples: [
    {
      title: "Volume of a rectangular prism",
      questionLatex: "\\text{Find the volume of a rectangular prism with length 8 cm, width 5 cm and height 3 cm.}",
      steps: [
        { explanation: "Use V = l × w × h.", latex: "V = 8 \\times 5 \\times 3" },
        { explanation: "Multiply step by step.", latex: "V = 40 \\times 3 = 120" },
      ],
      finalAnswerLatex: "V = 120 \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Volume of a triangular prism",
      questionLatex: "\\text{A triangular prism has a cross-section with base 6 cm and height 4 cm. The prism is 10 cm long. Find its volume.}",
      steps: [
        { explanation: "Find the area of the triangular cross-section.", latex: "A = \\frac{1}{2} \\times 6 \\times 4 = 12 \\text{ cm}^2" },
        { explanation: "Multiply by the prism length.", latex: "V = 12 \\times 10 = 120" },
      ],
      finalAnswerLatex: "V = 120 \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Find a missing dimension",
      questionLatex: "\\text{A prism has cross-sectional area }30\\text{ cm}^2\\text{ and volume }210\\text{ cm}^3.\\text{ Find its length.}",
      steps: [
        { explanation: "Use V = A × l and rearrange.", latex: "l = \\frac{V}{A} = \\frac{210}{30}" },
        { explanation: "Divide.", latex: "l = 7" },
      ],
      finalAnswerLatex: "l = 7 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-vp-g1",
      "Which formula gives the volume of any prism?",
      "C",
      [
        "$V = A + l$",
        "$V = 2A \\times l$",
        "$V = A \\times l$",
        "$V = A \\times l^2$",
      ],
      "Volume of any prism = cross-sectional area × length: $V = A \\times l$.",
      "A prism has a uniform cross-section — multiply that area by how far it extends.",
    ),
    answer(
      "y8-vsa-vp-g2",
      "A rectangular prism has length 8 cm, width 5 cm and height 3 cm. Find its volume.",
      "",
      "120",
      "V = 8 × 5 × 3 = 120 cm³.",
      "Multiply all three dimensions: length × width × height.",
      ["120 cm^3"],
    ),
    answer(
      "y8-vsa-vp-g3",
      "A triangular prism has a cross-section with base 6 cm and height 4 cm, and a prism length of 10 cm. Find its volume.",
      "",
      "120",
      "Area of cross-section = ½ × 6 × 4 = 12 cm². V = 12 × 10 = 120 cm³.",
      "Find the triangular cross-section area first using A = ½bh, then multiply by the prism length.",
      ["120 cm^3"],
    ),
    answer(
      "y8-vsa-vp-g4",
      "A rectangular prism has length 10 cm, width 4 cm and height 2 cm. Find its volume.",
      "",
      "80",
      "V = 10 × 4 × 2 = 80 cm³.",
      "Multiply length × width × height.",
      ["80 cm^3"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-vp-i1",
      "A rectangular prism has length 7 cm, width 3 cm and height 4 cm. Find its volume.",
      "",
      "84",
      "V = 7 × 3 × 4 = 84 cm³.",
      "Use V = l × w × h.",
      ["84 cm^3"],
    ),
    answer(
      "y8-vsa-vp-i2",
      "A triangular prism has a cross-section with base 10 cm and height 6 cm, and a prism length of 5 cm. Find its volume.",
      "",
      "150",
      "Area = ½ × 10 × 6 = 30 cm². V = 30 × 5 = 150 cm³.",
      "Calculate the triangular area with ½ × base × height, then multiply by the prism length.",
      ["150 cm^3"],
    ),
    choice(
      "y8-vsa-vp-i3",
      "A rectangular prism has volume 240 cm³. Its height is doubled while length and width remain the same. What is the new volume?",
      "C",
      [
        "\\(240\\text{ cm}^3\\)",
        "\\(360\\text{ cm}^3\\)",
        "\\(480\\text{ cm}^3\\)",
        "\\(960\\text{ cm}^3\\)",
      ],
      "Doubling one dimension doubles the volume: $2 \\times 240 = 480$ cm³.",
      "Think about how multiplying one dimension by 2 changes the product V = l × w × h.",
    ),
    answer(
      "y8-vsa-vp-i4",
      "A prism has a cross-sectional area of 24 cm² and a length of 7 cm. Find its volume.",
      "",
      "168",
      "V = A × l = 24 × 7 = 168 cm³.",
      "Apply V = A × l directly with the given cross-sectional area.",
      ["168 cm^3"],
    ),
    answer(
      "y8-vsa-vp-i5",
      "A rectangular prism has length 5 cm and width 6 cm. Its volume is 120 cm³. Find the height.",
      "",
      "4",
      "5 × 6 = 30. So 30h = 120, giving h = 120 ÷ 30 = 4 cm.",
      "Divide the volume by the product of the two known dimensions.",
      ["4 cm"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting the ½ for a triangular prism: using V = b × h × l instead of V = ½ × b × h × l.",
      fix: "The cross-section is a triangle. Always halve the base × height before multiplying by the prism length.",
    },
    {
      mistake: "Confusing the height of the triangular cross-section with the length of the prism.",
      fix: "Identify two separate measurements: the triangle's height (inside the cross-section) and the prism's length (how far it extends).",
    },
    {
      mistake: "Writing the answer in cm² instead of cm³ for volume.",
      fix: "Volume is three-dimensional, so the unit is always cubic: cm³, m³, mm³.",
    },
    {
      mistake: "Adding the three dimensions instead of multiplying for a rectangular prism.",
      fix: "V = l × w × h — all three dimensions are multiplied together.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-vp-m1",
      "A rectangular prism has length 9 cm, width 4 cm and height 5 cm. Find its volume.",
      "",
      "180",
      "V = 9 × 4 × 5 = 180 cm³.",
      "Multiply all three dimensions.",
      ["180 cm^3"],
    ),
    answer(
      "y8-vsa-vp-m2",
      "A triangular prism has a cross-section with base 12 cm and height 5 cm, and a prism length of 8 cm. Find its volume.",
      "",
      "240",
      "Area = ½ × 12 × 5 = 30 cm². V = 30 × 8 = 240 cm³.",
      "Find the triangular cross-section area first.",
      ["240 cm^3"],
    ),
    choice(
      "y8-vsa-vp-m3",
      "Which calculation correctly gives the volume of a triangular prism with cross-section base 6 cm, triangle height 4 cm and prism length 10 cm?",
      "B",
      [
        "\\(6 \\times 4 \\times 10 = 240\\)",
        "\\(\\frac{1}{2} \\times 6 \\times 4 \\times 10 = 120\\)",
        "\\(6 \\times 4 \\times 10 \\div 3 = 80\\)",
        "\\(\\frac{1}{2} \\times 6 \\times 10 = 30\\)",
      ],
      "The cross-section is a triangle, so area = ½ × 6 × 4 = 12. V = 12 × 10 = 120 cm³.",
      "The cross-sectional area of a triangle requires the factor of ½.",
    ),
    answer(
      "y8-vsa-vp-m4",
      "A prism has a cross-sectional area of 30 cm² and volume 210 cm³. Find its length.",
      "",
      "7",
      "l = V ÷ A = 210 ÷ 30 = 7 cm.",
      "Rearrange V = A × l to get l = V ÷ A.",
      ["7 cm"],
    ),
    answer(
      "y8-vsa-vp-m5",
      "A triangular prism has a cross-section with base 9 cm and height 8 cm, and a prism length of 15 cm. Find its volume.",
      "",
      "540",
      "Area = ½ × 9 × 8 = 36 cm². V = 36 × 15 = 540 cm³.",
      "Calculate the triangular area first, then multiply by the prism length.",
      ["540 cm^3"],
    ),
    choice(
      "y8-vsa-vp-m6",
      "A rectangular prism has volume 360 cm³. Its length and width are each doubled while the height stays the same. What is the new volume?",
      "C",
      [
        "\\(720\\text{ cm}^3\\)",
        "\\(1080\\text{ cm}^3\\)",
        "\\(1440\\text{ cm}^3\\)",
        "\\(2880\\text{ cm}^3\\)",
      ],
      "Doubling both length and width multiplies the volume by $2 \\times 2 = 4$. New V = $4 \\times 360 = 1440$ cm³.",
      "Each dimension you double multiplies the total volume by 2.",
    ),
    answer(
      "y8-vsa-vp-m7",
      "A rectangular prism has length 7 cm and width 6 cm. Its volume is 336 cm³. Find its height.",
      "",
      "8",
      "7 × 6 = 42. So 42h = 336, giving h = 336 ÷ 42 = 8 cm.",
      "Divide the volume by l × w to find h.",
      ["8 cm"],
    ),
    answer(
      "y8-vsa-vp-m8",
      "A concrete step is a rectangular prism with length 120 cm, width 40 cm and height 20 cm. Find its volume.",
      "",
      "96000",
      "V = 120 × 40 × 20 = 96 000 cm³.",
      "Apply V = l × w × h to the three given dimensions.",
      ["96 000"],
    ),
    answer(
      "y8-vsa-vp-m9",
      "A triangular prism has a cross-section with base 10 cm and prism length 12 cm. Its volume is 360 cm³. Find the height of the triangular cross-section.",
      "",
      "6",
      "½ × 10 × h × 12 = 60h = 360. So h = 360 ÷ 60 = 6 cm.",
      "Set up ½ × 10 × h × 12 = 360, simplify, then solve for h.",
      ["6 cm"],
    ),
    answer(
      "y8-vsa-vp-m10",
      "A swimming pool is 25 m long, 8 m wide and has a uniform depth of 2 m. Find the volume of water it holds.",
      "",
      "400",
      "The pool is a rectangular prism. V = 25 × 8 × 2 = 400 m³.",
      "Treat the pool as a rectangular prism and apply V = l × w × h.",
      ["400 m^3"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vp-p1", 1, "A rectangular prism has length 3 cm, width 2 cm and height 2 cm. Find its volume.", "", "12", "V = 3 × 2 × 2 = 12 cm³.", "Multiply length × width × height.", ["12 cm^3"]),
    poolA("y8-vsa-vp-p2", 1, "A cube has side length 4 cm. Find its volume.", "", "64", "V = 4³ = 64 cm³.", "All three dimensions of a cube are equal.", ["64 cm^3"]),
    poolC("y8-vsa-vp-p3", 1, "Volume is measured in which kind of units?", "C", ["Linear units (cm)", "Square units (cm²)", "Cubic units (cm³)", "No units"], "Volume measures 3D space, so it uses cubic units such as cm³.", "Volume fills space in three dimensions."),
    poolA("y8-vsa-vp-p4", 1, "A prism has cross-sectional area 9 cm² and length 5 cm. Find its volume.", "", "45", "V = A × l = 9 × 5 = 45 cm³.", "Apply V = A × l.", ["45 cm^3"]),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vp-p5", 2, "A rectangular prism has length 6 cm, width 5 cm and height 4 cm. Find its volume.", "", "120", "V = 6 × 5 × 4 = 120 cm³.", "Multiply all three dimensions.", ["120 cm^3"]),
    poolA("y8-vsa-vp-p6", 2, "A triangular prism has a cross-section with base 8 cm and height 3 cm, and a prism length of 7 cm. Find its volume.", "", "84", "Area = ½ × 8 × 3 = 12 cm². V = 12 × 7 = 84 cm³.", "Find the triangular area first, then multiply by the length.", ["84 cm^3"]),
    poolA("y8-vsa-vp-p7", 2, "A prism has cross-sectional area 18 cm² and length 6 cm. Find its volume.", "", "108", "V = 18 × 6 = 108 cm³.", "Apply V = A × l.", ["108 cm^3"]),
    poolC("y8-vsa-vp-p8", 2, "Which calculation gives the volume of a triangular prism with cross-section base 4 cm, triangle height 5 cm and prism length 6 cm?", "B", ["\\(4 \\times 5 \\times 6 = 120\\)", "\\(\\frac{1}{2} \\times 4 \\times 5 \\times 6 = 60\\)", "\\(4 \\times 5 + 6 = 26\\)", "\\(\\frac{1}{2} \\times 4 \\times 6 = 12\\)"], "Area = ½ × 4 × 5 = 10 cm². V = 10 × 6 = 60 cm³.", "The triangular cross-section needs the factor of ½."),
    poolA("y8-vsa-vp-p9", 2, "A cube has side length 5 cm. Find its volume.", "", "125", "V = 5³ = 125 cm³.", "Cube the side length.", ["125 cm^3"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vp-p10", 3, "A rectangular prism has length 11 cm, width 6 cm and height 5 cm. Find its volume.", "", "330", "V = 11 × 6 × 5 = 330 cm³.", "Multiply all three dimensions.", ["330 cm^3"]),
    poolA("y8-vsa-vp-p11", 3, "A triangular prism has a cross-section with base 14 cm and height 6 cm, and a prism length of 10 cm. Find its volume.", "", "420", "Area = ½ × 14 × 6 = 42 cm². V = 42 × 10 = 420 cm³.", "Compute the triangular area, then multiply by the length.", ["420 cm^3"]),
    poolA("y8-vsa-vp-p12", 3, "A prism has cross-sectional area 25 cm² and volume 300 cm³. Find its length.", "", "12", "l = V ÷ A = 300 ÷ 25 = 12 cm.", "Rearrange V = A × l to l = V ÷ A.", ["12 cm"]),
    poolA("y8-vsa-vp-p13", 3, "A rectangular prism has length 8 cm and width 5 cm. Its volume is 200 cm³. Find the height.", "", "5", "8 × 5 = 40. So 40h = 200, h = 5 cm.", "Divide the volume by l × w.", ["5 cm"]),
    poolA("y8-vsa-vp-p14", 3, "A shipping crate is a rectangular prism with length 200 cm, width 100 cm and height 80 cm. Find its volume.", "", "1600000", "V = 200 × 100 × 80 = 1 600 000 cm³.", "Multiply all three dimensions.", ["1 600 000"]),
    poolA("y8-vsa-vp-p15", 3, "A triangular prism has cross-section base 7 cm and height 4 cm. Its volume is 196 cm³. Find the prism length.", "", "14", "Area = ½ × 7 × 4 = 14 cm². So 14l = 196, l = 14 cm.", "Find the cross-sectional area, then divide the volume by it.", ["14 cm"]),
    poolC("y8-vsa-vp-p16", 3, "A rectangular prism has volume 90 cm³. Its length is tripled while width and height stay the same. What is the new volume?", "C", ["\\(90\\text{ cm}^3\\)", "\\(180\\text{ cm}^3\\)", "\\(270\\text{ cm}^3\\)", "\\(810\\text{ cm}^3\\)"], "Tripling one dimension triples the volume: 3 × 90 = 270 cm³.", "Multiplying one dimension by 3 multiplies the volume by 3."),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vp-p17", 4, "A triangular prism has a cross-section with base 16 cm and height 9 cm, and a prism length of 20 cm. Find its volume.", "", "1440", "Area = ½ × 16 × 9 = 72 cm². V = 72 × 20 = 1440 cm³.", "Find the triangular area first, then multiply by the length.", ["1440 cm^3"]),
    poolA("y8-vsa-vp-p18", 4, "A prism has a cross-sectional area of 35 cm² and volume 595 cm³. Find its length.", "", "17", "l = 595 ÷ 35 = 17 cm.", "Divide the volume by the cross-sectional area.", ["17 cm"]),
    poolA("y8-vsa-vp-p19", 4, "A rectangular water trough is 150 cm long, 60 cm wide and 50 cm deep. Find the volume of water it holds when full, in cubic centimetres.", "", "450000", "V = 150 × 60 × 50 = 450 000 cm³.", "Treat the trough as a rectangular prism.", ["450 000"]),
    poolC("y8-vsa-vp-p20", 4, "A rectangular prism has volume 240 cm³. Each of its three dimensions is doubled. What is the new volume?", "D", ["\\(480\\text{ cm}^3\\)", "\\(720\\text{ cm}^3\\)", "\\(960\\text{ cm}^3\\)", "\\(1920\\text{ cm}^3\\)"], "Doubling all three dimensions multiplies the volume by 2 × 2 × 2 = 8: 8 × 240 = 1920 cm³.", "Each doubled dimension multiplies the volume by 2."),
    poolA("y8-vsa-vp-p21", 4, "A triangular prism has cross-section base 12 cm and prism length 25 cm. Its volume is 1500 cm³. Find the triangle's height.", "", "10", "½ × 12 × 25 = 150. So 150h = 1500, h = 10 cm.", "Set up ½ × 12 × h × 25 = 1500 and solve for h.", ["10 cm"]),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vp-p22", 5, "A swimming pool is 50 m long and 20 m wide with a uniform depth of 1.5 m. Find the volume of water it holds in cubic metres.", "", "1500", "V = 50 × 20 × 1.5 = 1500 m³.", "Treat the pool as a rectangular prism with depth 1.5 m.", ["1500 m^3"]),
    poolA("y8-vsa-vp-p23", 5, "A rectangular prism has length 12 cm and height 4 cm. Its volume is 480 cm³. Find its width.", "", "10", "12 × 4 = 48. So 48w = 480, w = 10 cm.", "Divide the volume by the product of the two known dimensions.", ["10 cm"]),
    poolA("y8-vsa-vp-p24", 5, "Tank A is a rectangular prism 40 cm × 30 cm × 20 cm. Tank B is a triangular prism with cross-section base 30 cm, height 16 cm and length 25 cm. Find how much more volume (in cm³) Tank A holds than Tank B.", "", "18000", "V_A = 40 × 30 × 20 = 24 000 cm³. V_B = ½ × 30 × 16 × 25 = 6000 cm³. Difference = 18 000 cm³.", "Find each volume separately, then subtract.", ["18 000"]),
    poolC("y8-vsa-vp-p25", 5, "A rectangular prism of volume V has its length doubled and its width halved (height unchanged). The new volume is:", "B", ["\\(\\tfrac{1}{2}V\\)", "\\(V\\)", "\\(2V\\)", "\\(4V\\)"], "Doubling length (×2) and halving width (×½) gives 2 × ½ = 1, so the volume is unchanged: V.", "Multiply the scale factors together: 2 × ½ = 1."),
    poolA("y8-vsa-vp-p26", 5, "A triangular prism has a cross-section with base 18 cm and height 12 cm, and a prism length of 30 cm. Find its volume.", "", "3240", "Area = ½ × 18 × 12 = 108 cm². V = 108 × 30 = 3240 cm³.", "Compute the cross-sectional area, then multiply by the length.", ["3240 cm^3"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-vp-mp1",
      prompt:
        "A rectangular fish tank has length 60 cm, width 30 cm and height 40 cm. It is filled with water to a depth of 25 cm.",
      latex: "\\text{Rectangular tank: } 60 \\times 30 \\times 40 \\text{ cm}",
      answer: "72000",
      hint: "Volume = length × width × depth of water. Use the full height only for the tank's capacity.",
      explanation:
        "(a) Base area = 60 × 30 = 1800 cm². (b) Water volume = 1800 × 25 = 45 000 cm³. (c) Full capacity = 60 × 30 × 40 = 72 000 cm³. (d) Extra water to fill = 72 000 − 45 000 = 27 000 cm³.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the area of the rectangular base in cm².", latex: "", marks: 1, answer: "1800", acceptedAnswers: ["1800 cm^2"], hint: "Multiply length × width.", explanation: "A = 60 × 30 = 1800 cm²." },
        { key: "b", label: "(b)", prompt: "Find the volume of water (depth 25 cm) in cm³.", latex: "", marks: 1, answer: "45000", acceptedAnswers: ["45 000", "45000 cm^3"], hint: "Multiply the base area by the water depth.", explanation: "V = 1800 × 25 = 45 000 cm³." },
        { key: "c", label: "(c)", prompt: "Find the total capacity of the tank (filled to the top) in cm³.", latex: "", marks: 1, answer: "72000", acceptedAnswers: ["72 000", "72000 cm^3"], hint: "Use the full height of 40 cm.", explanation: "V = 60 × 30 × 40 = 72 000 cm³." },
        { key: "d", label: "(d)", prompt: "How much more water (cm³) is needed to fill the tank to the top?", latex: "", marks: 1, answer: "27000", acceptedAnswers: ["27 000", "27000 cm^3"], hint: "Subtract the current water volume from the full capacity.", explanation: "72 000 − 45 000 = 27 000 cm³." },
      ],
    },
  ],
};

// ── Lesson 2: Surface Area of Prisms ─────────────────────────────────────────

const surfaceAreaOfPrisms: LessonContent = {
  description:
    "Calculate the total surface area of rectangular and triangular prisms by summing all face areas, and solve problems involving missing dimensions.",
  learningIntention:
    "Calculate the surface area of prisms by identifying all faces, finding each area and summing them.",
  successCriteria: [
    "Identify the number and shape of all faces of a rectangular and triangular prism.",
    "Apply SA = 2(lw + lh + wh) to calculate the surface area of a rectangular prism.",
    "Calculate the surface area of a triangular prism by adding two triangle areas and three rectangle areas.",
    "Find a missing dimension of a prism given its surface area.",
  ],
  teaching: {
    paragraphs: [
      "Surface area is the total area of all outer faces of a solid. It is measured in square units (cm², m²). Imagine unfolding the solid flat — the total area of the unfolded net equals the surface area.",
      "A rectangular prism has 6 faces arranged in 3 pairs: top and bottom (area lw each), front and back (area lh each), left and right (area wh each). Total: $SA = 2(lw + lh + wh)$.",
      "A triangular prism has 5 faces: 2 identical triangular ends and 3 rectangular sides. The surface area equals twice the triangular end area plus the sum of the three rectangular face areas.",
      "A common mistake is forgetting a face. Work systematically — list every face, calculate its area, then add. Check by confirming you have the right number of faces.",
    ],
    latexBlocks: [
      "SA_{\\text{rect}} = 2(lw + lh + wh)",
      "SA_{\\text{tri\\,prism}} = bh + (a + b + c) \\times l \\quad (\\text{where }a,b,c\\text{ are triangle sides})",
    ],
  },
  workedExamples: [
    {
      title: "Surface area of a rectangular prism",
      questionLatex: "\\text{Find the surface area of a rectangular prism with }l=6\\text{ cm, }w=4\\text{ cm, }h=3\\text{ cm.}",
      steps: [
        { explanation: "Identify the three pairs of faces.", latex: "lw = 6 \\times 4 = 24, \\quad lh = 6 \\times 3 = 18, \\quad wh = 4 \\times 3 = 12" },
        { explanation: "Apply the formula.", latex: "SA = 2(24 + 18 + 12) = 2 \\times 54 = 108" },
      ],
      finalAnswerLatex: "SA = 108 \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Surface area of a triangular prism",
      questionLatex: "\\text{A triangular prism has a right-angled cross-section with legs 3 cm and 4 cm (hypotenuse 5 cm) and length 10 cm. Find its surface area.}",
      steps: [
        { explanation: "Two triangular faces: each has area ½ × 3 × 4.", latex: "2 \\times \\tfrac{1}{2} \\times 3 \\times 4 = 12 \\text{ cm}^2" },
        { explanation: "Three rectangular faces: perimeter of cross-section × length.", latex: "(3 + 4 + 5) \\times 10 = 12 \\times 10 = 120 \\text{ cm}^2" },
        { explanation: "Add all faces.", latex: "SA = 12 + 120 = 132" },
      ],
      finalAnswerLatex: "SA = 132 \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Find a missing dimension from surface area",
      questionLatex: "\\text{A rectangular prism has }l=6\\text{ cm, }w=4\\text{ cm and }SA=148\\text{ cm}^2.\\text{ Find the height.}",
      steps: [
        { explanation: "Substitute known values into the formula.", latex: "2(6 \\times 4 + 6h + 4h) = 148" },
        { explanation: "Simplify.", latex: "2(24 + 10h) = 148 \\Rightarrow 48 + 20h = 148" },
        { explanation: "Solve for h.", latex: "20h = 100 \\Rightarrow h = 5" },
      ],
      finalAnswerLatex: "h = 5 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-sp-g1",
      "How many faces does a rectangular prism have?",
      "C",
      ["4", "5", "6", "8"],
      "A rectangular prism has 6 faces: top, bottom, front, back, left and right — three pairs of identical rectangles.",
      "Count the faces systematically: top/bottom, front/back, left/right.",
    ),
    answer(
      "y8-vsa-sp-g2",
      "A rectangular prism has length 5 cm, width 4 cm and height 3 cm. Find its surface area.",
      "",
      "94",
      "SA = 2(5×4 + 5×3 + 4×3) = 2(20+15+12) = 2×47 = 94 cm².",
      "Apply SA = 2(lw + lh + wh): find each product, add, then double.",
      ["94 cm^2"],
    ),
    answer(
      "y8-vsa-sp-g3",
      "A cube has side length 6 cm. Find its total surface area.",
      "",
      "216",
      "All 6 faces are identical squares. SA = 6 × 6² = 6 × 36 = 216 cm².",
      "A cube has 6 equal square faces — find one face area and multiply by 6.",
      ["216 cm^2"],
    ),
    answer(
      "y8-vsa-sp-g4",
      "A rectangular prism has length 8 cm, width 3 cm and height 2 cm. Find its surface area.",
      "",
      "92",
      "SA = 2(8×3 + 8×2 + 3×2) = 2(24+16+6) = 2×46 = 92 cm².",
      "List the three pairs of faces: lw, lh, and wh.",
      ["92 cm^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-sp-i1",
      "A rectangular prism has length 10 cm, width 5 cm and height 4 cm. Find its surface area.",
      "",
      "220",
      "SA = 2(10×5 + 10×4 + 5×4) = 2(50+40+20) = 2×110 = 220 cm².",
      "Calculate each of the three pairs: lw, lh, wh.",
      ["220 cm^2"],
    ),
    answer(
      "y8-vsa-sp-i2",
      "A triangular prism has a right-angled cross-section with legs 6 cm and 8 cm (hypotenuse 10 cm) and a prism length of 12 cm. Find its surface area.",
      "",
      "336",
      "Two triangular faces: 2 × ½ × 6 × 8 = 48 cm². Three rectangular faces: (6+8+10) × 12 = 24 × 12 = 288 cm². SA = 48 + 288 = 336 cm².",
      "Add the two triangular end areas to the total area of the three rectangular sides.",
      ["336 cm^2"],
    ),
    choice(
      "y8-vsa-sp-i3",
      "Which formula correctly gives the surface area of a rectangular prism?",
      "C",
      [
        "$SA = l \\times w \\times h$",
        "$SA = 2(l + w + h)$",
        "$SA = 2(lw + lh + wh)$",
        "$SA = 6lw$",
      ],
      "$SA = 2(lw + lh + wh)$ accounts for all three pairs of identical rectangular faces.",
      "Think about the three distinct pairs of parallel faces on a rectangular prism.",
    ),
    answer(
      "y8-vsa-sp-i4",
      "A rectangular prism has length 7 cm and height 2 cm. Its total surface area is 100 cm². Find the width.",
      "",
      "4",
      "SA = 2(7w + 2w + 14) = 2(9w + 14) = 18w + 28 = 100. So 18w = 72, w = 4 cm.",
      "Substitute l = 7 and h = 2 into SA = 2(lw + lh + wh), then solve for w.",
      ["4 cm"],
    ),
    answer(
      "y8-vsa-sp-i5",
      "An open-top rectangular fish tank has length 50 cm, width 30 cm and height 40 cm. Find the total area of glass needed for the base and four sides.",
      "",
      "7900",
      "Base: 50×30 = 1500. Two long sides: 2×50×40 = 4000. Two short sides: 2×30×40 = 2400. Total = 7900 cm².",
      "Calculate the base plus the four side panels. There is no top face.",
      ["7900 cm^2"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting a face — calculating 5 faces instead of 6 for a rectangular prism.",
      fix: "Use the formula SA = 2(lw + lh + wh) and check it accounts for all three pairs: top/bottom, front/back, left/right.",
    },
    {
      mistake: "Confusing surface area (cm²) with volume (cm³).",
      fix: "Surface area is measured in square units — it is a 2D measurement of a 3D shape. Volume is measured in cubic units.",
    },
    {
      mistake: "For a triangular prism, forgetting to add the two triangular end faces.",
      fix: "A triangular prism has 5 faces: 2 triangles + 3 rectangles. Add both triangular areas to the three rectangular areas.",
    },
    {
      mistake: "Using the prism length as a triangle side when calculating triangular end areas.",
      fix: "The triangular end faces are the cross-sections — use only the base and height of the triangle, not the prism length.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-sp-m1",
      "A rectangular prism has length 7 cm, width 5 cm and height 4 cm. Find its surface area.",
      "",
      "166",
      "SA = 2(7×5 + 7×4 + 5×4) = 2(35+28+20) = 2×83 = 166 cm².",
      "Apply SA = 2(lw + lh + wh).",
      ["166 cm^2"],
    ),
    answer(
      "y8-vsa-sp-m2",
      "A cube has side length 7 cm. Find its total surface area.",
      "",
      "294",
      "SA = 6 × 7² = 6 × 49 = 294 cm².",
      "A cube has 6 identical square faces.",
      ["294 cm^2"],
    ),
    choice(
      "y8-vsa-sp-m3",
      "How many faces does a triangular prism have in total?",
      "C",
      ["3", "4", "5", "6"],
      "A triangular prism has 2 triangular ends and 3 rectangular side faces, giving 5 faces in total.",
      "Count the triangular ends and the rectangular faces that connect them.",
    ),
    answer(
      "y8-vsa-sp-m4",
      "A triangular prism has a right-angled cross-section with legs 5 cm and 12 cm (hypotenuse 13 cm) and a prism length of 10 cm. Find the surface area.",
      "",
      "360",
      "Two triangular faces: 2 × ½ × 5 × 12 = 60 cm². Three rectangular faces: (5+12+13) × 10 = 30 × 10 = 300 cm². SA = 60 + 300 = 360 cm².",
      "Find the two triangular end areas and three rectangular side areas separately.",
      ["360 cm^2"],
    ),
    answer(
      "y8-vsa-sp-m5",
      "A rectangular prism has length 6 cm and width 4 cm. Its total surface area is 148 cm². Find its height.",
      "",
      "5",
      "SA = 2(24 + 10h) = 48 + 20h = 148. So 20h = 100, h = 5 cm.",
      "Substitute l = 6 and w = 4 into SA = 2(lw + lh + wh), then solve for h.",
      ["5 cm"],
    ),
    choice(
      "y8-vsa-sp-m6",
      "A rectangular prism has surface area SA. All three dimensions are doubled. The new surface area is…",
      "B",
      [
        "\\(2 \\times SA\\)",
        "\\(4 \\times SA\\)",
        "\\(6 \\times SA\\)",
        "\\(8 \\times SA\\)",
      ],
      "SA involves products of pairs of dimensions. Doubling all dimensions multiplies every product by 4: new SA = 4 × SA.",
      "Each product in lw + lh + wh involves two dimensions — think about how scaling both affects each product.",
    ),
    answer(
      "y8-vsa-sp-m7",
      "A triangular prism has a right-angled cross-section with legs 8 cm and 6 cm (hypotenuse 10 cm) and a prism length of 15 cm. Find the surface area.",
      "",
      "408",
      "Two triangular faces: 2 × ½ × 8 × 6 = 48 cm². Three rectangular faces: (8+6+10) × 15 = 24 × 15 = 360 cm². SA = 48 + 360 = 408 cm².",
      "Calculate the two triangular end areas and the three rectangular face areas separately.",
      ["408 cm^2"],
    ),
    answer(
      "y8-vsa-sp-m8",
      "An open-top box has length 40 cm, width 25 cm and height 30 cm. Find the total inner surface area including the base but not the top.",
      "",
      "4900",
      "Base: 40×25 = 1000. Two long sides: 2×40×30 = 2400. Two short sides: 2×25×30 = 1500. Total = 1000+2400+1500 = 4900 cm².",
      "Add the base plus the four side panels — there is no top face.",
      ["4900 cm^2"],
    ),
    answer(
      "y8-vsa-sp-m9",
      "A triangular prism has a right-angled cross-section with legs 3 cm and 4 cm (hypotenuse 5 cm). Its total surface area is 108 cm². Find the prism length.",
      "",
      "8",
      "Two triangular faces: 2 × ½ × 3 × 4 = 12 cm². Rectangular faces: 12 × l cm². So 12 + 12l = 108, 12l = 96, l = 8 cm.",
      "Find the area of the two triangular ends, then solve 12 + 12l = 108 for l.",
      ["8 cm"],
    ),
    answer(
      "y8-vsa-sp-m10",
      "A rectangular crate has length 120 cm, width 80 cm and height 60 cm. Find the total surface area of all 6 faces.",
      "",
      "43200",
      "SA = 2(120×80 + 120×60 + 80×60) = 2(9600+7200+4800) = 2×21600 = 43200 cm².",
      "Apply SA = 2(lw + lh + wh) to the three given dimensions.",
      ["43 200"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolC("y8-vsa-sp-p1", 1, "Surface area is measured in which kind of units?", "B", ["Cubic units (cm³)", "Square units (cm²)", "Linear units (cm)", "No units"], "Surface area is a 2D measure of a solid's outer faces, so it uses square units such as cm².", "Area of faces is two-dimensional."),
    poolA("y8-vsa-sp-p2", 1, "A cube has side length 3 cm. Find its total surface area.", "", "54", "SA = 6 × 9 = 54 cm².", "A cube has 6 equal square faces.", ["54 cm^2"]),
    poolC("y8-vsa-sp-p3", 1, "How many faces does a triangular prism have?", "B", ["4", "5", "6", "8"], "A triangular prism has 2 triangular ends and 3 rectangular sides: 5 faces.", "Count the two ends and the connecting rectangles."),
    poolA("y8-vsa-sp-p4", 1, "A rectangular prism has length 2 cm, width 2 cm and height 1 cm. Find its surface area.", "", "16", "SA = 2(4 + 2 + 2) = 2 × 8 = 16 cm².", "Apply SA = 2(lw + lh + wh).", ["16 cm^2"]),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sp-p5", 2, "A rectangular prism has length 6 cm, width 4 cm and height 5 cm. Find its surface area.", "", "148", "SA = 2(24 + 30 + 20) = 2 × 74 = 148 cm².", "Find lw, lh and wh, add, then double.", ["148 cm^2"]),
    poolA("y8-vsa-sp-p6", 2, "A cube has side length 5 cm. Find its total surface area.", "", "150", "SA = 6 × 25 = 150 cm².", "Six equal square faces.", ["150 cm^2"]),
    poolA("y8-vsa-sp-p7", 2, "A rectangular prism has length 10 cm, width 2 cm and height 3 cm. Find its surface area.", "", "112", "SA = 2(20 + 30 + 6) = 2 × 56 = 112 cm².", "List the three pairs of faces.", ["112 cm^2"]),
    poolC("y8-vsa-sp-p8", 2, "Which formula gives the surface area of a rectangular prism?", "C", ["$SA = lwh$", "$SA = 2(l + w + h)$", "$SA = 2(lw + lh + wh)$", "$SA = 4lw$"], "$SA = 2(lw + lh + wh)$ counts all three pairs of identical faces.", "There are three distinct pairs of parallel faces."),
    poolA("y8-vsa-sp-p9", 2, "A triangular prism has a right-angled cross-section with legs 3 cm and 4 cm (hypotenuse 5 cm) and a prism length of 6 cm. Find its surface area.", "", "84", "Triangles: 2 × ½ × 3 × 4 = 12. Rectangles: 12 × 6 = 72. SA = 12 + 72 = 84 cm².", "Add the two triangular ends to the three rectangular faces.", ["84 cm^2"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sp-p10", 3, "A rectangular prism has length 9 cm, width 6 cm and height 4 cm. Find its surface area.", "", "228", "SA = 2(54 + 36 + 24) = 2 × 114 = 228 cm².", "Compute each product, then double the sum.", ["228 cm^2"]),
    poolA("y8-vsa-sp-p11", 3, "A triangular prism has a right-angled cross-section with legs 6 cm and 8 cm (hypotenuse 10 cm) and a prism length of 9 cm. Find its surface area.", "", "264", "Triangles: 2 × ½ × 6 × 8 = 48. Rectangles: 24 × 9 = 216. SA = 48 + 216 = 264 cm².", "Add the two triangular ends to the three rectangular faces.", ["264 cm^2"]),
    poolA("y8-vsa-sp-p12", 3, "A rectangular prism has length 8 cm and width 5 cm. Its surface area is 158 cm². Find the height.", "", "3", "2(40 + 13h) = 158 → 80 + 26h = 158 → 26h = 78 → h = 3 cm.", "Substitute l = 8, w = 5 into SA = 2(lw + lh + wh) and solve.", ["3 cm"]),
    poolA("y8-vsa-sp-p13", 3, "An open-top box has length 30 cm, width 20 cm and height 15 cm. Find the area of glass for the base and four sides (no top).", "", "2100", "Base: 30×20 = 600. Long sides: 2×30×15 = 900. Short sides: 2×20×15 = 600. Total = 2100 cm².", "Add the base plus the four side panels.", ["2100 cm^2"]),
    poolC("y8-vsa-sp-p14", 3, "A cube has surface area 96 cm². What is the area of one face?", "B", ["8 cm²", "16 cm²", "24 cm²", "48 cm²"], "A cube has 6 faces, so one face = 96 ÷ 6 = 16 cm².", "Divide the total surface area by 6."),
    poolA("y8-vsa-sp-p15", 3, "A rectangular prism has length 12 cm, width 8 cm and height 6 cm. Find its surface area.", "", "432", "SA = 2(96 + 72 + 48) = 2 × 216 = 432 cm².", "Find each pair of faces and add.", ["432 cm^2"]),
    poolA("y8-vsa-sp-p16", 3, "A cube has surface area 150 cm². Find the length of one edge.", "", "5", "6s² = 150 → s² = 25 → s = 5 cm.", "Divide by 6, then take the square root.", ["5 cm"]),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sp-p17", 4, "A triangular prism has a right-angled cross-section with legs 9 cm and 12 cm (hypotenuse 15 cm) and a prism length of 20 cm. Find its surface area.", "", "828", "Triangles: 2 × ½ × 9 × 12 = 108. Rectangles: 36 × 20 = 720. SA = 108 + 720 = 828 cm².", "Add the two triangular ends to the three rectangular faces.", ["828 cm^2"]),
    poolA("y8-vsa-sp-p18", 4, "A triangular prism has a right-angled cross-section with legs 5 cm and 12 cm (hypotenuse 13 cm). Its surface area is 240 cm². Find the prism length.", "", "6", "Triangles: 60 cm². Rectangles: 30l. So 60 + 30l = 240 → 30l = 180 → l = 6 cm.", "Find the triangular end area, then solve 60 + 30l = 240.", ["6 cm"]),
    poolA("y8-vsa-sp-p19", 4, "A storage crate is a rectangular prism with length 150 cm, width 90 cm and height 60 cm. Find the total surface area of all 6 faces.", "", "55800", "SA = 2(13 500 + 9000 + 5400) = 2 × 27 900 = 55 800 cm².", "Apply SA = 2(lw + lh + wh).", ["55 800"]),
    poolC("y8-vsa-sp-p20", 4, "A cube has surface area S. Its edge length is doubled. What is the new surface area?", "C", ["\\(2S\\)", "\\(3S\\)", "\\(4S\\)", "\\(8S\\)"], "Surface area depends on edge². Doubling the edge multiplies the area by 2² = 4: new SA = 4S.", "Area scales with the square of the edge length."),
    poolA("y8-vsa-sp-p21", 4, "A rectangular prism has width 5 cm and height 4 cm. Its surface area is 166 cm². Find the length.", "", "7", "2(9l + 20) = 166 → 18l + 40 = 166 → 18l = 126 → l = 7 cm.", "Substitute w = 5, h = 4 into SA = 2(lw + lh + wh) and solve for l.", ["7 cm"]),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sp-p22", 5, "A closed cardboard box is a rectangular prism 25 cm long, 18 cm wide and 12 cm high. Find the area of cardboard needed for all 6 faces.", "", "1932", "SA = 2(450 + 300 + 216) = 2 × 966 = 1932 cm².", "Apply SA = 2(lw + lh + wh).", ["1932 cm^2"]),
    poolA("y8-vsa-sp-p23", 5, "A triangular prism has an equilateral-style cross-section (all three sides 10 cm) with a triangle height of 8.66 cm and a prism length of 15 cm. Using triangle area ½ × 10 × 8.66 = 43.3 cm², find the total surface area.", "", "536.6", "Triangles: 2 × 43.3 = 86.6 cm². Rectangles: 30 × 15 = 450 cm². SA = 86.6 + 450 = 536.6 cm².", "Add the two triangular ends to the three equal rectangular faces.", ["536.6 cm^2"]),
    poolA("y8-vsa-sp-p24", 5, "An open-top rectangular planter is 80 cm long, 40 cm wide and 35 cm deep. Find the area of timber for the base and four sides (no top).", "", "11600", "Base: 80×40 = 3200. Long sides: 2×80×35 = 5600. Short sides: 2×40×35 = 2800. Total = 11 600 cm².", "Add the base plus the four side panels.", ["11 600"]),
    poolC("y8-vsa-sp-p25", 5, "Box A is a cube of edge 6 cm. Box B is a rectangular prism 8 cm × 6 cm × 4 cm. Which has the greater surface area, and by how much?", "A", ["Box A, by 8 cm²", "Box B, by 8 cm²", "They are equal", "Box A, by 32 cm²"], "SA_A = 6 × 36 = 216 cm². SA_B = 2(48 + 32 + 24) = 208 cm². Box A is greater by 216 − 208 = 8 cm².", "Compute both surface areas, then compare."),
    poolA("y8-vsa-sp-p26", 5, "A rectangular prism has length 10 cm, width 6 cm and surface area 376 cm². Find the height.", "", "8", "2(60 + 16h) = 376 → 120 + 32h = 376 → 32h = 256 → h = 8 cm.", "Substitute l = 10, w = 6 into SA = 2(lw + lh + wh) and solve for h.", ["8 cm"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-sp-mp1",
      prompt:
        "A closed wooden box is a rectangular prism with length 20 cm, width 15 cm and height 10 cm. It will be painted on all outer faces.",
      latex: "\\text{Box: } 20 \\times 15 \\times 10 \\text{ cm}",
      answer: "1300",
      hint: "Surface area = 2(lw + lh + wh). The lid removes one lw face.",
      explanation:
        "(a) lw = 20 × 15 = 300 cm². (b) lh = 20 × 10 = 200 cm². (c) Total SA = 2(300 + 200 + 150) = 1300 cm². (d) Removing the top (one lw = 300 cm²) leaves 1300 − 300 = 1000 cm².",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the area of the top face (lw) in cm².", latex: "", marks: 1, answer: "300", acceptedAnswers: ["300 cm^2"], hint: "Multiply length × width.", explanation: "lw = 20 × 15 = 300 cm²." },
        { key: "b", label: "(b)", prompt: "Find the area of one front face (lh) in cm².", latex: "", marks: 1, answer: "200", acceptedAnswers: ["200 cm^2"], hint: "Multiply length × height.", explanation: "lh = 20 × 10 = 200 cm²." },
        { key: "c", label: "(c)", prompt: "Find the total surface area of all 6 faces in cm².", latex: "", marks: 2, answer: "1300", acceptedAnswers: ["1300 cm^2"], hint: "wh = 15 × 10 = 150. Add the three products and double.", explanation: "SA = 2(300 + 200 + 150) = 2 × 650 = 1300 cm²." },
        { key: "d", label: "(d)", prompt: "If the box has no lid, find the area to be painted (omit one top face) in cm².", latex: "", marks: 1, answer: "1000", acceptedAnswers: ["1000 cm^2"], hint: "Subtract one lw face from the total.", explanation: "1300 − 300 = 1000 cm²." },
      ],
    },
  ],
};

// ── Lesson 3: Volume of Cylinders ────────────────────────────────────────────

const volumeOfCylinders: LessonContent = {
  description:
    "Calculate the volume of cylinders using V = πr²h, express answers in terms of π, and solve problems involving missing dimensions.",
  learningIntention:
    "Calculate the volume of a cylinder using V = πr²h and find missing dimensions from a known volume.",
  successCriteria: [
    "Identify the radius and height of a cylinder from a diagram or description.",
    "Apply V = πr²h to find the exact volume of a cylinder in terms of π.",
    "Use the diameter correctly by halving it to find the radius before substituting.",
    "Rearrange V = πr²h to find the height given the volume and radius.",
  ],
  teaching: {
    paragraphs: [
      "A cylinder is a prism with a circular cross-section. Because the cross-section is always a circle, the formula is $V = \\pi r^2 \\times h$, where $r$ is the radius and $h$ is the height (or length).",
      "The area of the circular cross-section is $\\pi r^2$. Multiplying by the height gives the volume. For example, a cylinder with radius 5 cm and height 8 cm has volume $\\pi \\times 25 \\times 8 = 200\\pi$ cm³.",
      "Watch for problems that give the diameter — always halve the diameter to find the radius before substituting. If diameter $= 10$ cm, then $r = 5$ cm.",
      "To find a missing dimension, rearrange the formula. If volume and radius are known, $h = \\frac{V}{\\pi r^2}$. If the volume contains $\\pi$, it often cancels cleanly.",
    ],
    latexBlocks: [
      "V = \\pi r^2 h",
      "r = \\frac{\\text{diameter}}{2}",
      "h = \\frac{V}{\\pi r^2}",
    ],
  },
  workedExamples: [
    {
      title: "Volume of a cylinder",
      questionLatex: "\\text{Find the exact volume of a cylinder with radius 5 cm and height 8 cm.}",
      steps: [
        { explanation: "Substitute r = 5 and h = 8 into V = πr²h.", latex: "V = \\pi \\times 5^2 \\times 8" },
        { explanation: "Square the radius, then multiply.", latex: "V = \\pi \\times 25 \\times 8 = 200\\pi" },
      ],
      finalAnswerLatex: "V = 200\\pi \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Diameter given — find volume",
      questionLatex: "\\text{A cylinder has diameter 8 cm and height 10 cm. Find its exact volume.}",
      steps: [
        { explanation: "Halve the diameter to find the radius.", latex: "r = 8 \\div 2 = 4 \\text{ cm}" },
        { explanation: "Substitute into V = πr²h.", latex: "V = \\pi \\times 4^2 \\times 10 = \\pi \\times 16 \\times 10 = 160\\pi" },
      ],
      finalAnswerLatex: "V = 160\\pi \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Find the height given volume and radius",
      questionLatex: "\\text{A cylinder has radius 4 cm and volume }144\\pi\\text{ cm}^3.\\text{ Find the height.}",
      steps: [
        { explanation: "Use h = V ÷ (πr²).", latex: "h = \\frac{144\\pi}{\\pi \\times 4^2}" },
        { explanation: "π cancels and the denominator simplifies.", latex: "h = \\frac{144}{16} = 9" },
      ],
      finalAnswerLatex: "h = 9 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-vc-g1",
      "Which formula gives the volume of a cylinder with radius $r$ and height $h$?",
      "C",
      ["$V = 2\\pi r h$", "$V = \\pi r h$", "$V = \\pi r^2 h$", "$V = 2\\pi r^2 h$"],
      "Volume = circular cross-section area × height. Cross-section area = πr², so V = πr²h.",
      "The cross-section of a cylinder is a circle with area πr². Multiply by height.",
    ),
    answer(
      "y8-vsa-vc-g2",
      "Find the exact volume of a cylinder with radius 5 cm and height 8 cm. Express in terms of π.",
      "",
      "200π",
      "V = π × 25 × 8 = 200π cm³.",
      "Substitute r = 5 and h = 8 into V = πr²h. Square the radius first.",
      ["628", "628.3"],
    ),
    answer(
      "y8-vsa-vc-g3",
      "Find the exact volume of a cylinder with radius 3 cm and height 4 cm. Express in terms of π.",
      "",
      "36π",
      "V = π × 9 × 4 = 36π cm³.",
      "Square the radius, then multiply by π and the height.",
      ["113", "113.1"],
    ),
    answer(
      "y8-vsa-vc-g4",
      "Find the exact volume of a cylinder with radius 10 cm and height 6 cm. Express in terms of π.",
      "",
      "600π",
      "V = π × 100 × 6 = 600π cm³.",
      "Square the radius (10² = 100), then multiply by π and height.",
      ["1885"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-vc-i1",
      "Find the exact volume of a cylinder with radius 7 cm and height 5 cm. Express in terms of π.",
      "",
      "245π",
      "V = π × 49 × 5 = 245π cm³.",
      "Apply V = πr²h with r = 7 and h = 5.",
      ["770", "769.7"],
    ),
    answer(
      "y8-vsa-vc-i2",
      "Find the exact volume of a cylinder with radius 6 cm and height 3 cm. Express in terms of π.",
      "",
      "108π",
      "V = π × 36 × 3 = 108π cm³.",
      "Square r = 6 to get 36, then multiply by π and h.",
      ["339", "339.3"],
    ),
    choice(
      "y8-vsa-vc-i3",
      "A cylinder has diameter 8 cm and height 10 cm. Which expression gives its exact volume?",
      "B",
      [
        "\\(\\pi \\times 8^2 \\times 10 = 640\\pi\\)",
        "\\(\\pi \\times 4^2 \\times 10 = 160\\pi\\)",
        "\\(\\pi \\times 8 \\times 10 = 80\\pi\\)",
        "\\(2\\pi \\times 4 \\times 10 = 80\\pi\\)",
      ],
      "Radius = 8 ÷ 2 = 4 cm. V = π × 4² × 10 = 160π cm³.",
      "Halve the diameter first to find the radius before substituting.",
    ),
    answer(
      "y8-vsa-vc-i4",
      "A cylinder has radius 5 cm and volume $100\\pi$ cm³. Find its height.",
      "",
      "4",
      "π × 25 × h = 100π. Divide both sides by 25π: h = 100π ÷ (25π) = 4 cm.",
      "Divide the volume by πr². The π will cancel.",
      ["4 cm"],
    ),
    answer(
      "y8-vsa-vc-i5",
      "A cylindrical tin can has radius 4 cm and height 12 cm. Find its exact volume in terms of π.",
      "",
      "192π",
      "V = π × 16 × 12 = 192π cm³.",
      "Square r = 4 to get 16, then multiply by 12 and π.",
      ["603", "603.2"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the diameter instead of the radius: V = π × 10² × h when the diameter is 10.",
      fix: "Halve the diameter to get the radius. If diameter = 10 cm, then r = 5 cm.",
    },
    {
      mistake: "Forgetting to square the radius: computing V = π × r × h instead of π × r² × h.",
      fix: "The cross-section area of a circle is πr². The exponent 2 on the radius is essential.",
    },
    {
      mistake: "Rounding π prematurely and getting an imprecise answer when an exact answer is required.",
      fix: "Leave the answer in terms of π (e.g. 200π cm³) unless the question asks you to round.",
    },
    {
      mistake: "Not cancelling π when finding a missing dimension: dividing volume by πr² without simplifying.",
      fix: "If V = 144π and r = 4, then h = 144π ÷ (π × 16) = 144π ÷ (16π) = 9. The π cancels.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-vc-m1",
      "Find the exact volume of a cylinder with radius 8 cm and height 5 cm. Express in terms of π.",
      "",
      "320π",
      "V = π × 64 × 5 = 320π cm³.",
      "Apply V = πr²h.",
      ["1005", "1005.3"],
    ),
    answer(
      "y8-vsa-vc-m2",
      "Find the exact volume of a cylinder with radius 3 cm and height 10 cm. Express in terms of π.",
      "",
      "90π",
      "V = π × 9 × 10 = 90π cm³.",
      "Square r first.",
      ["283", "282.7"],
    ),
    choice(
      "y8-vsa-vc-m3",
      "Which calculation correctly gives the volume of a cylinder with radius 6 cm and height 4 cm?",
      "B",
      [
        "\\(\\pi \\times 6 \\times 4 = 24\\pi\\)",
        "\\(\\pi \\times 6^2 \\times 4 = 144\\pi\\)",
        "\\(2\\pi \\times 6 \\times 4 = 48\\pi\\)",
        "\\(\\pi \\times 6^2 + 4 \\approx 117\\)",
      ],
      "V = πr²h = π × 36 × 4 = 144π cm³. The radius must be squared.",
      "The radius must be squared before multiplying by π and h.",
    ),
    answer(
      "y8-vsa-vc-m4",
      "A cylinder has radius 4 cm and volume $144\\pi$ cm³. Find its height.",
      "",
      "9",
      "π × 16 × h = 144π. Divide both sides by 16π: h = 144π ÷ (16π) = 9 cm.",
      "Divide the volume by πr².",
      ["9 cm"],
    ),
    answer(
      "y8-vsa-vc-m5",
      "Find the exact volume of a cylinder with radius 5 cm and height 6 cm. Express in terms of π.",
      "",
      "150π",
      "V = π × 25 × 6 = 150π cm³.",
      "Apply V = πr²h.",
      ["471", "471.2"],
    ),
    choice(
      "y8-vsa-vc-m6",
      "A cylinder has volume $V$. The radius is doubled and the height is halved. What is the new volume?",
      "C",
      [
        "$\\frac{1}{2}V$",
        "$V$",
        "$2V$",
        "$4V$",
      ],
      "New V = π(2r)²(h/2) = π × 4r² × h/2 = 2πr²h = 2V.",
      "Substitute 2r for r and h/2 for h into the formula and simplify.",
    ),
    answer(
      "y8-vsa-vc-m7",
      "Find the exact volume of a cylinder with radius 4 cm and height 11 cm. Express in terms of π.",
      "",
      "176π",
      "V = π × 16 × 11 = 176π cm³.",
      "Apply V = πr²h.",
      ["553", "552.9"],
    ),
    answer(
      "y8-vsa-vc-m8",
      "A cylinder has height 2 cm and volume $50\\pi$ cm³. Find its radius.",
      "",
      "5",
      "2πr² = 50π. Divide both sides by 2π: r² = 25, so r = 5 cm.",
      "Rearrange to r² = V ÷ (πh), then take the square root.",
      ["5 cm"],
    ),
    answer(
      "y8-vsa-vc-m9",
      "Cylinder A has radius 3 cm and height 16 cm. Cylinder B has radius 4 cm and height 8 cm. Find the difference in their exact volumes in terms of π.",
      "",
      "16π",
      "V_A = 144π cm³. V_B = 128π cm³. Difference = 144π − 128π = 16π cm³.",
      "Calculate each volume separately, then subtract.",
      ["50", "50.3"],
    ),
    answer(
      "y8-vsa-vc-m10",
      "A cylindrical pipe has outer radius 3 cm and inner radius 2 cm. It is 50 cm long. Find the exact volume of material in the pipe, in terms of π.",
      "",
      "250π",
      "V_outer = π × 9 × 50 = 450π. V_inner = π × 4 × 50 = 200π. Volume of material = 450π − 200π = 250π cm³.",
      "Subtract the inner cylinder volume from the outer cylinder volume.",
      ["785", "785.4"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolC("y8-vsa-vc-p1", 1, "Which formula gives the volume of a cylinder?", "C", ["$V = 2\\pi r h$", "$V = \\pi r h$", "$V = \\pi r^2 h$", "$V = \\pi r^2$"], "Volume = circular cross-section area (πr²) × height: V = πr²h.", "Multiply the circle area by the height."),
    poolA("y8-vsa-vc-p2", 1, "Find the exact volume of a cylinder with radius 2 cm and height 3 cm. Express in terms of π.", "", "12π", "V = π × 4 × 3 = 12π cm³.", "Square the radius, then multiply by π and h.", ["37.7", "37.70"]),
    poolA("y8-vsa-vc-p3", 1, "A cylinder has radius 1 cm and height 10 cm. Find its exact volume in terms of π.", "", "10π", "V = π × 1 × 10 = 10π cm³.", "1² = 1, then multiply by π and the height.", ["31.4", "31.42"]),
    poolA("y8-vsa-vc-p4", 1, "A cylinder has diameter 6 cm. Find its radius.", "", "3", "Radius = diameter ÷ 2 = 6 ÷ 2 = 3 cm.", "Halve the diameter.", ["3 cm"]),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vc-p5", 2, "Find the exact volume of a cylinder with radius 4 cm and height 5 cm. Express in terms of π.", "", "80π", "V = π × 16 × 5 = 80π cm³.", "Square r, then multiply by π and h.", ["251", "251.3"]),
    poolA("y8-vsa-vc-p6", 2, "Find the exact volume of a cylinder with radius 6 cm and height 2 cm. Express in terms of π.", "", "72π", "V = π × 36 × 2 = 72π cm³.", "Square r = 6 to get 36.", ["226", "226.2"]),
    poolA("y8-vsa-vc-p7", 2, "A cylinder has diameter 10 cm and height 4 cm. Find its exact volume in terms of π.", "", "100π", "Radius = 5 cm. V = π × 25 × 4 = 100π cm³.", "Halve the diameter first to find the radius.", ["314", "314.2"]),
    poolC("y8-vsa-vc-p8", 2, "Which calculation gives the volume of a cylinder with radius 3 cm and height 7 cm?", "B", ["\\(\\pi \\times 3 \\times 7 = 21\\pi\\)", "\\(\\pi \\times 3^2 \\times 7 = 63\\pi\\)", "\\(2\\pi \\times 3 \\times 7 = 42\\pi\\)", "\\(\\pi \\times 3^2 + 7\\)"], "V = π × 9 × 7 = 63π cm³. The radius must be squared.", "The radius is squared before multiplying."),
    poolA("y8-vsa-vc-p9", 2, "Find the exact volume of a cylinder with radius 5 cm and height 4 cm. Express in terms of π.", "", "100π", "V = π × 25 × 4 = 100π cm³.", "Apply V = πr²h.", ["314", "314.2"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vc-p10", 3, "Find the exact volume of a cylinder with radius 7 cm and height 10 cm. Express in terms of π.", "", "490π", "V = π × 49 × 10 = 490π cm³.", "Square r = 7 to get 49.", ["1539", "1539.4"]),
    poolA("y8-vsa-vc-p11", 3, "A cylinder has radius 6 cm and volume 180π cm³. Find its height.", "", "5", "36πh = 180π → h = 180 ÷ 36 = 5 cm.", "Divide the volume by πr²; the π cancels.", ["5 cm"]),
    poolA("y8-vsa-vc-p12", 3, "A cylinder has diameter 12 cm and height 5 cm. Find its exact volume in terms of π.", "", "180π", "Radius = 6 cm. V = π × 36 × 5 = 180π cm³.", "Halve the diameter to find r = 6.", ["565", "565.5"]),
    poolA("y8-vsa-vc-p13", 3, "A cylinder has height 4 cm and volume 64π cm³. Find its radius.", "", "4", "4πr² = 64π → r² = 16 → r = 4 cm.", "Rearrange to r² = V ÷ (πh), then square-root.", ["4 cm"]),
    poolA("y8-vsa-vc-p14", 3, "A cylindrical drinking glass has radius 4 cm and height 14 cm. Find its exact volume in terms of π.", "", "224π", "V = π × 16 × 14 = 224π cm³.", "Square r = 4, then multiply by 14 and π.", ["704", "703.7"]),
    poolC("y8-vsa-vc-p15", 3, "A cylinder has volume V. Its radius is doubled (height unchanged). What is the new volume?", "C", ["$V$", "$2V$", "$4V$", "$8V$"], "V = πr²h. Doubling r gives π(2r)²h = 4πr²h = 4V.", "Volume depends on the square of the radius."),
    poolA("y8-vsa-vc-p16", 3, "Find the exact volume of a cylinder with radius 9 cm and height 2 cm. Express in terms of π.", "", "162π", "V = π × 81 × 2 = 162π cm³.", "Square r = 9 to get 81.", ["509", "508.9"]),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vc-p17", 4, "A cylindrical water tank has radius 50 cm and height 100 cm. Find its exact volume in terms of π.", "", "250000π", "V = π × 2500 × 100 = 250 000π cm³.", "Square r = 50 to get 2500.", ["785 398", "785398"]),
    poolA("y8-vsa-vc-p18", 4, "A cylinder has radius 5 cm and volume 250π cm³. Find its height.", "", "10", "25πh = 250π → h = 10 cm.", "Divide the volume by πr².", ["10 cm"]),
    poolA("y8-vsa-vc-p19", 4, "A cylinder has height 9 cm and volume 144π cm³. Find its radius.", "", "4", "9πr² = 144π → r² = 16 → r = 4 cm.", "Solve r² = V ÷ (πh), then take the square root.", ["4 cm"]),
    poolA("y8-vsa-vc-p20", 4, "A cylindrical pipe has outer radius 4 cm and inner radius 3 cm. It is 100 cm long. Find the exact volume of material in terms of π.", "", "700π", "Outer = π × 16 × 100 = 1600π. Inner = π × 9 × 100 = 900π. Material = 700π cm³.", "Subtract the inner cylinder volume from the outer.", ["2199", "2199.1"]),
    poolC("y8-vsa-vc-p21", 4, "A cylinder has volume V. Its radius is tripled and its height is divided by 3. What is the new volume?", "C", ["$V$", "$\\tfrac{1}{3}V$", "$3V$", "$9V$"], "New V = π(3r)²(h/3) = π × 9r² × h/3 = 3πr²h = 3V.", "Substitute 3r and h/3 and simplify."),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-vc-p22", 5, "Cylinder A has radius 5 cm and height 12 cm. Cylinder B has radius 6 cm and height 8 cm. Find the difference in their exact volumes in terms of π.", "", "12π", "V_A = 300π cm³. V_B = 288π cm³. Difference = 12π cm³.", "Compute each volume, then subtract the smaller from the larger.", ["37.7", "37.70"]),
    poolA("y8-vsa-vc-p23", 5, "A cylindrical rainwater tank has radius 80 cm and height 120 cm. Using π = 3.14, find its volume in cubic centimetres.", "", "2411520", "V = 3.14 × 6400 × 120 = 2 411 520 cm³.", "Square r = 80 to get 6400, then multiply by 120 and 3.14.", ["2 411 520"]),
    poolA("y8-vsa-vc-p24", 5, "A cylinder has radius 3 cm and volume 99π cm³. Find its height.", "", "11", "9πh = 99π → h = 11 cm.", "Divide the volume by πr²; the π cancels.", ["11 cm"]),
    poolA("y8-vsa-vc-p25", 5, "A solid cylinder of radius 6 cm and height 10 cm has a cylindrical hole of radius 2 cm drilled all the way through (length 10 cm). Find the exact remaining volume in terms of π.", "", "320π", "Outer = π × 36 × 10 = 360π. Hole = π × 4 × 10 = 40π. Remaining = 360π − 40π = 320π cm³.", "Subtract the drilled cylinder volume from the full cylinder.", ["1005", "1005.3"]),
    poolA("y8-vsa-vc-p26", 5, "A cylinder of radius 3 cm and height 10 cm and a rectangular prism 6 cm × 5 cm × 10 cm are compared. Using π = 3.14, find how much greater the prism's volume is than the cylinder's, in cm³.", "", "17.4", "Cylinder = 3.14 × 9 × 10 = 282.6 cm³. Prism = 6 × 5 × 10 = 300 cm³. Difference = 300 − 282.6 = 17.4 cm³.", "Compute both volumes with π = 3.14, then subtract.", ["17.4 cm^3"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-vc-mp1",
      prompt:
        "A cylindrical water tank has radius 7 cm and height 20 cm. Use π = 3.14 throughout and round each answer to the nearest whole number.",
      latex: "\\text{Cylinder: } r = 7,\\ h = 20",
      answer: "3077",
      hint: "Area of the circular base = πr². Volume = πr²h. Use π = 3.14.",
      explanation:
        "(a) Base area = 3.14 × 7² = 3.14 × 49 = 153.86 ≈ 154 cm². (b) Volume = 153.86 × 20 = 3077.2 ≈ 3077 cm³. (c) Half full = 3077 ÷ 2 ≈ 1539 cm³. (d) A second identical tank doubles the total: 2 × 3077 = 6154 cm³.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the area of the circular base in cm² (π = 3.14, nearest whole number).", latex: "", marks: 1, answer: "154", acceptedAnswers: ["153.86", "154 cm^2"], hint: "πr² = 3.14 × 49.", explanation: "A = 3.14 × 49 = 153.86 ≈ 154 cm²." },
        { key: "b", label: "(b)", prompt: "Find the volume of the tank in cm³ (nearest whole number).", latex: "", marks: 1, answer: "3077", acceptedAnswers: ["3077.2", "3077 cm^3"], hint: "Multiply the base area by the height.", explanation: "V = 153.86 × 20 = 3077.2 ≈ 3077 cm³." },
        { key: "c", label: "(c)", prompt: "Find the volume of water when the tank is half full, in cm³ (nearest whole number).", latex: "", marks: 1, answer: "1539", acceptedAnswers: ["1538.6", "1539 cm^3"], hint: "Halve the full volume.", explanation: "3077 ÷ 2 ≈ 1539 cm³." },
        { key: "d", label: "(d)", prompt: "Find the combined volume (cm³) of two identical tanks.", latex: "", marks: 1, answer: "6154", acceptedAnswers: ["6154 cm^3"], hint: "Double the volume of one tank.", explanation: "2 × 3077 = 6154 cm³." },
      ],
    },
  ],
};

// ── Lesson 4: Surface Area of Cylinders ──────────────────────────────────────

const surfaceAreaOfCylinders: LessonContent = {
  description:
    "Calculate the total surface area of a closed cylinder using SA = 2πr² + 2πrh, find surface area of open cylinders, and solve for missing dimensions.",
  learningIntention:
    "Calculate the surface area of a cylinder by summing the two circular face areas and the curved surface area.",
  successCriteria: [
    "Identify the two circular faces and the curved surface of a cylinder.",
    "Apply SA = 2πr² + 2πrh to find the exact surface area of a closed cylinder.",
    "Adapt the formula for open cylinders (one or no circular face).",
    "Find a missing dimension given the surface area and one other measurement.",
  ],
  teaching: {
    paragraphs: [
      "A closed cylinder has three surfaces: two circular ends (top and bottom) and one curved surface wrapped around the side. Imagine unrolling the curved surface — it becomes a rectangle with width $2\\pi r$ (the circumference) and height $h$.",
      "The total surface area is the sum of all three parts: two circles plus the curved rectangle. $SA = 2\\pi r^2 + 2\\pi rh$. This can be factorised as $SA = 2\\pi r(r + h)$.",
      "For an open cylinder — like a cup or open pipe — omit the top circle: $SA = \\pi r^2 + 2\\pi rh$. Always check whether the problem specifies a closed or open shape.",
      "To find a missing dimension, substitute known values and solve. Because $2\\pi r$ and $2\\pi r^2$ share the factor $\\pi$, it often cancels when $SA$ is given in terms of $\\pi$.",
    ],
    latexBlocks: [
      "SA = 2\\pi r^2 + 2\\pi r h = 2\\pi r(r + h)",
      "SA_{\\text{open}} = \\pi r^2 + 2\\pi r h",
      "h = \\frac{SA}{2\\pi r} - r \\quad (\\text{from }SA = 2\\pi r(r+h))",
    ],
  },
  workedExamples: [
    {
      title: "Surface area of a closed cylinder",
      questionLatex: "\\text{Find the exact surface area of a cylinder with radius 5 cm and height 8 cm.}",
      steps: [
        { explanation: "Two circular faces: 2 × πr².", latex: "2\\pi r^2 = 2\\pi \\times 25 = 50\\pi" },
        { explanation: "Curved surface: 2πrh.", latex: "2\\pi r h = 2\\pi \\times 5 \\times 8 = 80\\pi" },
        { explanation: "Add both parts.", latex: "SA = 50\\pi + 80\\pi = 130\\pi" },
      ],
      finalAnswerLatex: "SA = 130\\pi \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Surface area of an open cylinder",
      questionLatex: "\\text{A cylindrical cup (open top) has radius 4 cm and height 9 cm. Find its exact outer surface area.}",
      steps: [
        { explanation: "One circular base: πr².", latex: "\\pi r^2 = \\pi \\times 16 = 16\\pi" },
        { explanation: "Curved surface: 2πrh.", latex: "2\\pi r h = 2\\pi \\times 4 \\times 9 = 72\\pi" },
        { explanation: "Add the base and curved surface.", latex: "SA = 16\\pi + 72\\pi = 88\\pi" },
      ],
      finalAnswerLatex: "SA = 88\\pi \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Find height from surface area",
      questionLatex: "\\text{A closed cylinder has radius 3 cm and surface area }60\\pi\\text{ cm}^2.\\text{ Find the height.}",
      steps: [
        { explanation: "Use SA = 2πr(r + h) and substitute.", latex: "2\\pi \\times 3 \\times (3 + h) = 60\\pi" },
        { explanation: "Divide both sides by 6π.", latex: "3 + h = 10" },
        { explanation: "Solve for h.", latex: "h = 7" },
      ],
      finalAnswerLatex: "h = 7 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-sc-g1",
      "A cylinder has two circular ends and one curved surface. How many distinct surfaces does it have in total?",
      "C",
      ["1", "2", "3", "4"],
      "A closed cylinder has 3 surfaces: top circle, bottom circle, and curved side.",
      "Think about the base, the top, and the side that wraps around.",
    ),
    answer(
      "y8-vsa-sc-g2",
      "Find the exact surface area of a closed cylinder with radius 5 cm and height 8 cm. Express in terms of π.",
      "",
      "130π",
      "Two circles: 2π × 25 = 50π. Curved surface: 2π × 5 × 8 = 80π. SA = 50π + 80π = 130π cm².",
      "Find the area of the two circular ends and the curved surface separately, then add.",
      ["408", "408.4"],
    ),
    answer(
      "y8-vsa-sc-g3",
      "Find the exact surface area of a closed cylinder with radius 3 cm and height 4 cm. Express in terms of π.",
      "",
      "42π",
      "Two circles: 2π × 9 = 18π. Curved surface: 2π × 3 × 4 = 24π. SA = 18π + 24π = 42π cm².",
      "Apply SA = 2πr² + 2πrh with r = 3 and h = 4.",
      ["132", "131.9"],
    ),
    answer(
      "y8-vsa-sc-g4",
      "Find the exact surface area of a closed cylinder with radius 4 cm and height 6 cm. Express in terms of π.",
      "",
      "80π",
      "Two circles: 2π × 16 = 32π. Curved surface: 2π × 4 × 6 = 48π. SA = 32π + 48π = 80π cm².",
      "Calculate 2πr² and 2πrh separately, then add.",
      ["251", "251.3"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-sc-i1",
      "Find the exact surface area of a closed cylinder with radius 6 cm and height 10 cm. Express in terms of π.",
      "",
      "192π",
      "Two circles: 2π × 36 = 72π. Curved surface: 2π × 6 × 10 = 120π. SA = 72π + 120π = 192π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["603", "603.2"],
    ),
    answer(
      "y8-vsa-sc-i2",
      "Find the exact surface area of a closed cylinder with radius 2 cm and height 8 cm. Express in terms of π.",
      "",
      "40π",
      "Two circles: 2π × 4 = 8π. Curved surface: 2π × 2 × 8 = 32π. SA = 8π + 32π = 40π cm².",
      "Find both the circular ends and the curved side.",
      ["126", "125.7"],
    ),
    choice(
      "y8-vsa-sc-i3",
      "Which formula gives the total surface area of a closed cylinder?",
      "C",
      [
        "$SA = 2\\pi r h$",
        "$SA = \\pi r^2 + 2\\pi r h$",
        "$SA = 2\\pi r^2 + 2\\pi r h$",
        "$SA = 4\\pi r^2$",
      ],
      "$SA = 2\\pi r^2 + 2\\pi rh$: two circular ends ($2\\pi r^2$) plus the curved surface ($2\\pi rh$).",
      "A closed cylinder has two circular faces — option B only counts one.",
    ),
    answer(
      "y8-vsa-sc-i4",
      "A closed cylinder has radius 3 cm and surface area $60\\pi$ cm². Find its height.",
      "",
      "7",
      "6π(3 + h) = 60π. Divide both sides by 6π: 3 + h = 10, so h = 7 cm.",
      "Use SA = 2πr(r + h), substitute r = 3, then solve for h.",
      ["7 cm"],
    ),
    answer(
      "y8-vsa-sc-i5",
      "Find the exact surface area of a closed cylinder with radius 4 cm and height 11 cm. Express in terms of π.",
      "",
      "120π",
      "Two circles: 2π × 16 = 32π. Curved surface: 2π × 4 × 11 = 88π. SA = 32π + 88π = 120π cm².",
      "Apply SA = 2πr² + 2πrh with r = 4 and h = 11.",
      ["377"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to include both circular ends: computing SA = 2πrh (curved surface only).",
      fix: "A closed cylinder has three surfaces. Add the two circular ends: SA = 2πr² + 2πrh.",
    },
    {
      mistake: "Using the diameter instead of the radius in the formula.",
      fix: "Halve the diameter to get the radius. Substitute the radius, not the diameter, into SA = 2πr² + 2πrh.",
    },
    {
      mistake: "Applying the closed cylinder formula to an open cylinder question.",
      fix: "Check whether the cylinder is open or closed. An open cylinder omits one circular face: SA = πr² + 2πrh.",
    },
    {
      mistake: "Confusing the curved surface area formula (2πrh) with the volume formula (πr²h).",
      fix: "Curved surface area = 2πrh (circumference × height). Volume = πr²h (circle area × height).",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-sc-m1",
      "Find the exact surface area of a closed cylinder with radius 7 cm and height 5 cm. Express in terms of π.",
      "",
      "168π",
      "Two circles: 2π × 49 = 98π. Curved surface: 2π × 7 × 5 = 70π. SA = 98π + 70π = 168π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["528", "527.8"],
    ),
    answer(
      "y8-vsa-sc-m2",
      "Find the exact surface area of a closed cylinder with radius 10 cm and height 4 cm. Express in terms of π.",
      "",
      "280π",
      "Two circles: 2π × 100 = 200π. Curved surface: 2π × 10 × 4 = 80π. SA = 200π + 80π = 280π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["880", "879.6"],
    ),
    choice(
      "y8-vsa-sc-m3",
      "A closed cylinder has radius 5 cm and height 3 cm. Which is its exact surface area?",
      "A",
      [
        "\\(80\\pi\\text{ cm}^2\\)",
        "\\(100\\pi\\text{ cm}^2\\)",
        "\\(120\\pi\\text{ cm}^2\\)",
        "\\(160\\pi\\text{ cm}^2\\)",
      ],
      "SA = 2π × 25 + 2π × 5 × 3 = 50π + 30π = 80π cm².",
      "Calculate 2πr² and 2πrh separately, then add.",
    ),
    answer(
      "y8-vsa-sc-m4",
      "A closed cylinder has radius 4 cm and surface area $80\\pi$ cm². Find its height.",
      "",
      "6",
      "8π(4 + h) = 80π. Divide both sides by 8π: 4 + h = 10, so h = 6 cm.",
      "Use SA = 2πr(r + h), substitute r = 4, then solve for h.",
      ["6 cm"],
    ),
    answer(
      "y8-vsa-sc-m5",
      "Find the exact surface area of a closed cylinder with radius 9 cm and height 5 cm. Express in terms of π.",
      "",
      "252π",
      "Two circles: 2π × 81 = 162π. Curved surface: 2π × 9 × 5 = 90π. SA = 162π + 90π = 252π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["792", "791.7"],
    ),
    choice(
      "y8-vsa-sc-m6",
      "A cylinder has surface area $SA$. Both the radius and height are doubled. What is the new surface area?",
      "C",
      [
        "\\(2 \\times SA\\)",
        "\\(3 \\times SA\\)",
        "\\(4 \\times SA\\)",
        "\\(8 \\times SA\\)",
      ],
      "New SA = 2π(2r)² + 2π(2r)(2h) = 4×2πr² + 4×2πrh = 4(2πr² + 2πrh) = 4 × SA.",
      "Replace r with 2r and h with 2h in the formula and simplify.",
    ),
    answer(
      "y8-vsa-sc-m7",
      "An open-top cylindrical tank has radius 6 cm and height 8 cm. Find the exact outer surface area (base and curved side only). Express in terms of π.",
      "",
      "132π",
      "Base: π × 36 = 36π. Curved side: 2π × 6 × 8 = 96π. SA = 36π + 96π = 132π cm².",
      "An open-top cylinder has one circular base plus the curved side — omit the top face.",
      ["415", "414.7"],
    ),
    answer(
      "y8-vsa-sc-m8",
      "A closed cylinder has radius 8 cm and surface area $272\\pi$ cm². Find its height.",
      "",
      "9",
      "16π(8 + h) = 272π. Divide both sides by 16π: 8 + h = 17, so h = 9 cm.",
      "Use SA = 2πr(r + h), substitute r = 8, then solve for h.",
      ["9 cm"],
    ),
    answer(
      "y8-vsa-sc-m9",
      "An open-top water tank has radius 3 m and height 5 m. Find the exact surface area of the inner surface (base and curved wall only). Express in terms of π.",
      "",
      "39π",
      "Base: π × 9 = 9π. Curved wall: 2π × 3 × 5 = 30π. SA = 9π + 30π = 39π m².",
      "An open-top tank has one circular base plus the curved inner wall.",
      ["122", "122.5"],
    ),
    answer(
      "y8-vsa-sc-m10",
      "Find the exact surface area of a closed cylinder with radius 5 cm and height 12 cm. Express in terms of π.",
      "",
      "170π",
      "Two circles: 2π × 25 = 50π. Curved surface: 2π × 5 × 12 = 120π. SA = 50π + 120π = 170π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["534", "534.1"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolC("y8-vsa-sc-p1", 1, "How many distinct surfaces does a closed cylinder have?", "C", ["1", "2", "3", "4"], "A closed cylinder has 3 surfaces: top circle, bottom circle and curved side.", "Count the base, the top and the curved wall."),
    poolA("y8-vsa-sc-p2", 1, "Find the curved surface area of a cylinder with radius 2 cm and height 5 cm. Express in terms of π.", "", "20π", "CSA = 2π × 2 × 5 = 20π cm².", "Curved surface area = 2πrh.", ["62.8", "62.83"]),
    poolC("y8-vsa-sc-p3", 1, "Which expression is the curved surface area of a cylinder?", "B", ["$\\pi r^2$", "$2\\pi r h$", "$2\\pi r^2$", "$\\pi r^2 h$"], "The curved surface unrolls to a rectangle of width 2πr and height h, area 2πrh.", "Unroll the side into a rectangle."),
    poolA("y8-vsa-sc-p4", 1, "Find the area of the two circular ends of a cylinder with radius 3 cm. Express in terms of π.", "", "18π", "2πr² = 2π × 9 = 18π cm².", "Each end has area πr²; double it.", ["56.5", "56.55"]),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sc-p5", 2, "Find the exact surface area of a closed cylinder with radius 2 cm and height 5 cm. Express in terms of π.", "", "28π", "Circles: 2π × 4 = 8π. Curved: 2π × 2 × 5 = 20π. SA = 28π cm².", "Add 2πr² and 2πrh.", ["87.9", "87.96"]),
    poolA("y8-vsa-sc-p6", 2, "Find the exact surface area of a closed cylinder with radius 4 cm and height 4 cm. Express in terms of π.", "", "64π", "Circles: 2π × 16 = 32π. Curved: 2π × 4 × 4 = 32π. SA = 64π cm².", "Compute 2πr² and 2πrh separately.", ["201", "201.1"]),
    poolA("y8-vsa-sc-p7", 2, "Find the exact surface area of a closed cylinder with radius 3 cm and height 7 cm. Express in terms of π.", "", "60π", "Circles: 2π × 9 = 18π. Curved: 2π × 3 × 7 = 42π. SA = 60π cm².", "Add the two circular ends and the curved surface.", ["188", "188.5"]),
    poolC("y8-vsa-sc-p8", 2, "Which formula gives the total surface area of a closed cylinder?", "C", ["$2\\pi r h$", "$\\pi r^2 + 2\\pi r h$", "$2\\pi r^2 + 2\\pi r h$", "$4\\pi r^2$"], "$2\\pi r^2 + 2\\pi rh$: two circular ends plus the curved surface.", "A closed cylinder has two circular faces."),
    poolA("y8-vsa-sc-p9", 2, "Find the exact surface area of an open-top cylinder (no top) with radius 4 cm and height 5 cm. Express in terms of π.", "", "56π", "Base: π × 16 = 16π. Curved: 2π × 4 × 5 = 40π. SA = 56π cm².", "An open-top cylinder has one circular base plus the curved side.", ["176", "175.9"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sc-p10", 3, "Find the exact surface area of a closed cylinder with radius 6 cm and height 4 cm. Express in terms of π.", "", "120π", "Circles: 2π × 36 = 72π. Curved: 2π × 6 × 4 = 48π. SA = 120π cm².", "Apply SA = 2πr² + 2πrh.", ["377", "376.99"]),
    poolA("y8-vsa-sc-p11", 3, "A closed cylinder has radius 4 cm and surface area 96π cm². Find its height.", "", "8", "8π(4 + h) = 96π → 4 + h = 12 → h = 8 cm.", "Use SA = 2πr(r + h), substitute r = 4 and solve.", ["8 cm"]),
    poolA("y8-vsa-sc-p12", 3, "A cylinder has diameter 8 cm and height 5 cm. Find its exact total surface area in terms of π.", "", "72π", "Radius = 4 cm. Circles: 2π × 16 = 32π. Curved: 2π × 4 × 5 = 40π. SA = 72π cm².", "Halve the diameter to find r = 4 first.", ["226", "226.2"]),
    poolA("y8-vsa-sc-p13", 3, "Find the exact surface area of a closed cylinder with radius 5 cm and height 5 cm. Express in terms of π.", "", "100π", "Circles: 2π × 25 = 50π. Curved: 2π × 5 × 5 = 50π. SA = 100π cm².", "Apply SA = 2πr² + 2πrh.", ["314", "314.2"]),
    poolC("y8-vsa-sc-p14", 3, "A closed cylinder has radius 2 cm and height 3 cm. Which is its exact surface area?", "B", ["\\(16\\pi\\text{ cm}^2\\)", "\\(20\\pi\\text{ cm}^2\\)", "\\(24\\pi\\text{ cm}^2\\)", "\\(28\\pi\\text{ cm}^2\\)"], "Circles: 2π × 4 = 8π. Curved: 2π × 2 × 3 = 12π. SA = 20π cm².", "Compute 2πr² and 2πrh and add."),
    poolA("y8-vsa-sc-p15", 3, "An open-top cylindrical cup has radius 3 cm and height 10 cm. Find its exact outer surface area (base and curved side) in terms of π.", "", "69π", "Base: π × 9 = 9π. Curved: 2π × 3 × 10 = 60π. SA = 69π cm².", "Omit the top face for an open cup.", ["217", "216.8"]),
    poolA("y8-vsa-sc-p16", 3, "Find the exact surface area of a closed cylinder with radius 8 cm and height 2 cm. Express in terms of π.", "", "160π", "Circles: 2π × 64 = 128π. Curved: 2π × 8 × 2 = 32π. SA = 160π cm².", "Apply SA = 2πr² + 2πrh.", ["503", "502.7"]),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sc-p17", 4, "A closed cylinder has radius 6 cm and surface area 192π cm². Find its height.", "", "10", "12π(6 + h) = 192π → 6 + h = 16 → h = 10 cm.", "Use SA = 2πr(r + h), substitute r = 6 and solve.", ["10 cm"]),
    poolA("y8-vsa-sc-p18", 4, "A closed cylinder has radius 5 cm and surface area 150π cm². Find its height.", "", "10", "10π(5 + h) = 150π → 5 + h = 15 → h = 10 cm.", "Use SA = 2πr(r + h), substitute r = 5 and solve.", ["10 cm"]),
    poolA("y8-vsa-sc-p19", 4, "Find the exact total surface area of a closed cylinder with radius 10 cm and height 15 cm. Express in terms of π.", "", "500π", "Circles: 2π × 100 = 200π. Curved: 2π × 10 × 15 = 300π. SA = 500π cm².", "Apply SA = 2πr² + 2πrh.", ["1571", "1570.8"]),
    poolC("y8-vsa-sc-p20", 4, "A cylinder has surface area S. Both its radius and height are tripled. What is the new surface area?", "C", ["\\(3S\\)", "\\(6S\\)", "\\(9S\\)", "\\(27S\\)"], "Each term (2πr² and 2πrh) scales by 3² = 9 when r and h are tripled: new SA = 9S.", "Both terms involve a product of two lengths."),
    poolA("y8-vsa-sc-p21", 4, "An open-top cylindrical paint tin has radius 7 cm and height 10 cm. Find its exact surface area (base and curved side only) in terms of π.", "", "189π", "Base: π × 49 = 49π. Curved: 2π × 7 × 10 = 140π. SA = 189π cm².", "Add the single base to the curved side.", ["594", "593.8"]),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-sc-p22", 5, "A closed cylindrical can has radius 5 cm and height 12 cm. Using π = 3.14, find its total surface area in cm² (one decimal place).", "", "533.8", "Circles: 2 × 3.14 × 25 = 157. Curved: 2 × 3.14 × 5 × 12 = 376.8. SA = 533.8 cm².", "Compute 2πr² and 2πrh using π = 3.14, then add.", ["533.8 cm^2"]),
    poolA("y8-vsa-sc-p23", 5, "A closed cylinder has radius 4 cm and surface area 176π cm². Find its height.", "", "18", "8π(4 + h) = 176π → 4 + h = 22 → h = 18 cm.", "Use SA = 2πr(r + h), substitute r = 4 and solve.", ["18 cm"]),
    poolA("y8-vsa-sc-p24", 5, "A label wraps around the curved surface of a cylindrical can (no ends). The can has radius 4 cm and height 11 cm. Find the exact label area in terms of π.", "", "88π", "Curved surface area = 2π × 4 × 11 = 88π cm².", "A label covers only the curved surface: 2πrh.", ["276", "276.5"]),
    poolC("y8-vsa-sc-p25", 5, "Cylinder A is closed with radius 3 cm and height 6 cm. Cylinder B is open-top with the same radius and height. How much greater (in terms of π) is A's surface area than B's?", "B", ["\\(6\\pi\\text{ cm}^2\\)", "\\(9\\pi\\text{ cm}^2\\)", "\\(18\\pi\\text{ cm}^2\\)", "\\(0\\)"], "The only difference is the missing top circle: πr² = π × 9 = 9π cm².", "An open-top cylinder lacks exactly one circular end."),
    poolA("y8-vsa-sc-p26", 5, "A closed cylinder has radius 7 cm and height 7 cm. Find its exact total surface area in terms of π.", "", "196π", "Circles: 2π × 49 = 98π. Curved: 2π × 7 × 7 = 98π. SA = 196π cm².", "Apply SA = 2πr² + 2πrh.", ["616", "615.8"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-sc-mp1",
      prompt:
        "A closed cylindrical drink can has radius 3 cm and height 11 cm. Leave each answer in terms of π unless a decimal is asked for.",
      latex: "\\text{Cylinder: } r = 3,\\ h = 11",
      answer: "84π",
      hint: "Two ends = 2πr². Curved surface = 2πrh. Total = their sum.",
      explanation:
        "(a) Two circular ends = 2π × 3² = 18π cm². (b) Curved surface = 2π × 3 × 11 = 66π cm². (c) Total SA = 18π + 66π = 84π cm². (d) Using π = 3.14, 84π ≈ 263.76 ≈ 263.8 cm².",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the combined area of the two circular ends, in terms of π.", latex: "", marks: 1, answer: "18π", acceptedAnswers: ["18pi", "18 pi"], hint: "2πr² = 2π × 9.", explanation: "2π × 9 = 18π cm²." },
        { key: "b", label: "(b)", prompt: "Find the curved surface area, in terms of π.", latex: "", marks: 1, answer: "66π", acceptedAnswers: ["66pi", "66 pi"], hint: "2πrh = 2π × 3 × 11.", explanation: "2π × 3 × 11 = 66π cm²." },
        { key: "c", label: "(c)", prompt: "Find the total surface area, in terms of π.", latex: "", marks: 1, answer: "84π", acceptedAnswers: ["84pi", "84 pi"], hint: "Add the ends and the curved surface.", explanation: "18π + 66π = 84π cm²." },
        { key: "d", label: "(d)", prompt: "Find the total surface area as a decimal using π = 3.14 (one decimal place).", latex: "", marks: 1, answer: "263.8", acceptedAnswers: ["263.76", "263.8 cm^2"], hint: "Multiply 84 by 3.14.", explanation: "84 × 3.14 = 263.76 ≈ 263.8 cm²." },
      ],
    },
  ],
};

// ── Lesson 5: Volume of Composite Solids ────────────────────────────────────

const volumeOfCompositeSolids: LessonContent = {
  description:
    "Calculate the volume of composite solids by splitting them into familiar prisms and cylinders, or by subtracting a removed section from an outer shape.",
  learningIntention:
    "Find the volume of composite solids by identifying component shapes and combining their volumes.",
  successCriteria: [
    "Split a composite solid into two or more familiar shapes.",
    "Add component volumes when shapes are joined together.",
    "Subtract a removed volume when a piece has been cut out.",
    "Apply volume formulas for rectangular prisms, triangular prisms, and cylinders to composite situations.",
  ],
  teaching: {
    paragraphs: [
      "A composite solid is built from two or more simpler 3D shapes. To find its volume, identify the component shapes, calculate each volume separately, then combine them.",
      "When two shapes are joined together, add their volumes: V_total = V₁ + V₂. For example, a house shape is a rectangular prism base plus a triangular prism roof.",
      "When a piece has been removed from a solid (like a hole or a step cut out), subtract the removed volume: V_remaining = V_outer − V_removed.",
      "The key strategy is to split the shape at natural boundaries — where one shape ends and another begins — and check that every region is counted exactly once.",
    ],
    latexBlocks: [
      "V_{\\text{composite}} = V_1 + V_2 + \\cdots",
      "V_{\\text{remaining}} = V_{\\text{outer}} - V_{\\text{removed}}",
      "V_{\\text{prism}} = A_{\\text{base}} \\times h, \\quad V_{\\text{cylinder}} = \\pi r^2 h",
    ],
  },
  workedExamples: [
    {
      title: "Two rectangular prisms joined",
      questionLatex:
        "\\text{A solid consists of two rectangular prisms. Prism A is } 10\\text{ cm} \\times 6\\text{ cm} \\times 4\\text{ cm.}\\text{ Prism B is }4\\text{ cm} \\times 6\\text{ cm} \\times 3\\text{ cm, placed on top. Find the total volume.}",
      steps: [
        { explanation: "Volume of Prism A.", latex: "V_A = 10 \\times 6 \\times 4 = 240" },
        { explanation: "Volume of Prism B.", latex: "V_B = 4 \\times 6 \\times 3 = 72" },
        { explanation: "Add the two volumes.", latex: "V = 240 + 72 = 312" },
      ],
      finalAnswerLatex: "V = 312 \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Rectangular prism minus a removed section",
      questionLatex:
        "\\text{A solid starts as a } 10\\text{ cm} \\times 8\\text{ cm} \\times 5\\text{ cm rectangular prism. A }3\\text{ cm} \\times 4\\text{ cm} \\times 5\\text{ cm block is removed from one corner. Find the remaining volume.}",
      steps: [
        { explanation: "Volume of the full outer prism.", latex: "V_{\\text{outer}} = 10 \\times 8 \\times 5 = 400" },
        { explanation: "Volume of the removed block.", latex: "V_{\\text{removed}} = 3 \\times 4 \\times 5 = 60" },
        { explanation: "Subtract.", latex: "V = 400 - 60 = 340" },
      ],
      finalAnswerLatex: "V = 340 \\text{ cm}^3",
    } as WorkedExample,
    {
      title: "Rectangular prism plus triangular prism",
      questionLatex:
        "\\text{A wedge shape has a rectangular prism base (}12\\text{ cm} \\times 5\\text{ cm} \\times 3\\text{ cm) with a triangular prism on top. The triangle has base }12\\text{ cm and height }4\\text{ cm; the prism is }5\\text{ cm long. Find the total volume.}",
      steps: [
        { explanation: "Volume of the rectangular prism.", latex: "V_{\\text{rect}} = 12 \\times 5 \\times 3 = 180" },
        {
          explanation: "Volume of the triangular prism: base area × length.",
          latex: "V_{\\text{tri}} = \\tfrac{1}{2} \\times 12 \\times 4 \\times 5 = 120",
        },
        { explanation: "Add.", latex: "V = 180 + 120 = 300" },
      ],
      finalAnswerLatex: "V = 300 \\text{ cm}^3",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-cv-g1",
      "To find the volume of a composite solid made by joining two rectangular prisms, you should:",
      "C",
      [
        "Add all six side lengths together",
        "Multiply the two individual volumes",
        "Calculate each volume separately and add them",
        "Average the two individual volumes",
      ],
      "Each prism occupies its own space, so the total volume is simply V₁ + V₂.",
      "Think about what 'composite' means — parts combined together.",
    ),
    answer(
      "y8-vsa-cv-g2",
      "A composite solid has two rectangular prisms joined together. Prism A is 10 cm × 4 cm × 2 cm. Prism B is 6 cm × 4 cm × 3 cm. Find the total volume.",
      "",
      "152",
      "V_A = 80 cm³. V_B = 72 cm³. Total = 80 + 72 = 152 cm³.",
      "Calculate each prism volume separately then add.",
      ["152 cm^3"],
    ),
    answer(
      "y8-vsa-cv-g3",
      "A rectangular prism (8 cm × 6 cm × 4 cm) has a small rectangular block (3 cm × 2 cm × 4 cm) removed from it. Find the remaining volume.",
      "",
      "168",
      "Outer = 192 cm³. Removed = 24 cm³. Remaining = 192 − 24 = 168 cm³.",
      "Subtract the removed piece from the full outer shape.",
      ["168 cm^3"],
    ),
    answer(
      "y8-vsa-cv-g4",
      "A doorstop consists of a rectangular prism (10 cm × 4 cm × 3 cm) with a triangular prism on top. The triangle has base 4 cm and height 2 cm; the prism is 10 cm long. Find the total volume.",
      "",
      "160",
      "Rectangular V = 120 cm³. Triangular V = ½ × 4 × 2 × 10 = 40 cm³. Total = 160 cm³.",
      "The triangular prism formula is ½ × base × height × length.",
      ["160 cm^3"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-cv-i1",
      "Two rectangular prisms are joined. Prism A is 12 cm × 6 cm × 3 cm. Prism B is 5 cm × 6 cm × 2 cm. Find the total volume.",
      "",
      "276",
      "V_A = 216 cm³. V_B = 60 cm³. Total = 276 cm³.",
      "Add both rectangular prism volumes.",
      ["276 cm^3"],
    ),
    answer(
      "y8-vsa-cv-i2",
      "An L-shaped solid consists of two rectangular prisms. Prism A is 15 cm × 5 cm × 4 cm and Prism B is 5 cm × 5 cm × 6 cm. Find the total volume.",
      "",
      "450",
      "V_A = 300 cm³. V_B = 150 cm³. Total = 450 cm³.",
      "Identify each rectangular prism and calculate both volumes separately.",
      ["450 cm^3"],
    ),
    choice(
      "y8-vsa-cv-i3",
      "A rectangular prism has a cylindrical hole drilled straight through it. To find the volume of the remaining solid, you should:",
      "B",
      [
        "Add the prism volume and the cylinder volume",
        "Subtract the cylinder volume from the prism volume",
        "Divide the prism volume by the cylinder volume",
        "Multiply the prism volume and the cylinder volume",
      ],
      "The cylinder is removed material, so subtract its volume: V_remaining = V_prism − V_cylinder.",
      "Removing material reduces volume — which operation does that?",
    ),
    answer(
      "y8-vsa-cv-i4",
      "A solid outer rectangular prism (10 cm × 8 cm × 5 cm) has a rectangular hole (4 cm × 2 cm × 5 cm) cut all the way through. Find the volume of the remaining solid.",
      "",
      "360",
      "Outer V = 400 cm³. Hole V = 40 cm³. Remaining = 400 − 40 = 360 cm³.",
      "Subtract the removed rectangular volume from the full outer prism.",
      ["360 cm^3"],
    ),
    answer(
      "y8-vsa-cv-i5",
      "Two triangular prisms are joined. Prism A has a right-triangle cross-section with base 6 cm and height 4 cm; it is 8 cm long. Prism B has base 3 cm and height 2 cm; also 8 cm long. Find the total volume.",
      "",
      "120",
      "V_A = ½ × 6 × 4 × 8 = 96 cm³. V_B = ½ × 3 × 2 × 8 = 24 cm³. Total = 120 cm³.",
      "Each triangular prism: V = ½ × base × height × length.",
      ["120 cm^3"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Adding volumes when a piece should be subtracted.",
      fix:
        "If part of a solid has been removed or is hollow, subtract that component's volume from the outer shape.",
    },
    {
      mistake: "Counting the volume of the joined face as additional space.",
      fix:
        "Shared faces are internal surfaces — they do not add or subtract volume. Volume is about the 3D space occupied.",
    },
    {
      mistake: "Using the wrong formula for triangular prisms (forgetting ½).",
      fix:
        "A triangular prism has V = ½ × base × height × length. The ½ comes from the triangular cross-section.",
    },
    {
      mistake: "Mixing up which shape to subtract when identifying a composite with a hole.",
      fix:
        "Identify the outer (complete) shape and the removed (inner) shape separately, then apply V_remaining = V_outer − V_removed.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-cv-m1",
      "Two rectangular prisms are joined. Prism A is 8 cm × 6 cm × 4 cm. Prism B is 4 cm × 6 cm × 3 cm. Find the total volume.",
      "",
      "264",
      "V_A = 192 cm³. V_B = 72 cm³. Total = 192 + 72 = 264 cm³.",
      "Add both rectangular prism volumes.",
      ["264 cm^3"],
    ),
    answer(
      "y8-vsa-cv-m2",
      "A rectangular prism (12 cm × 8 cm × 5 cm) has a square hole (3 cm × 3 cm × 5 cm) removed from it. Find the remaining volume.",
      "",
      "435",
      "Outer = 480 cm³. Removed = 45 cm³. Remaining = 480 − 45 = 435 cm³.",
      "Subtract the removed prism volume from the full outer prism.",
      ["435 cm^3"],
    ),
    choice(
      "y8-vsa-cv-m3",
      "A composite solid is made by placing a triangular prism on top of a rectangular prism. The rectangular prism is 8 cm × 6 cm × 4 cm. The triangular prism has base 8 cm, height 5 cm and length 6 cm. Which expression gives the correct total volume?",
      "B",
      [
        "\\(8 \\times 6 \\times 4 \\times \\tfrac{1}{2} \\times 8 \\times 5 \\times 6\\)",
        "\\(8 \\times 6 \\times 4 + \\tfrac{1}{2} \\times 8 \\times 5 \\times 6\\)",
        "\\(\\tfrac{1}{2}(8 \\times 6 \\times 4 + 8 \\times 5 \\times 6)\\)",
        "\\(8 \\times 6 \\times 4 - \\tfrac{1}{2} \\times 8 \\times 5 \\times 6\\)",
      ],
      "V_rect = 8×6×4 = 192 cm³. V_tri = ½×8×5×6 = 120 cm³. Total = 192 + 120 = 312 cm³. The volumes are added, not multiplied or halved.",
      "Identify which operation joins the two shapes: the prism sits on top, so volumes are added.",
    ),
    answer(
      "y8-vsa-cv-m4",
      "A composite solid has a rectangular prism (10 cm × 6 cm × 4 cm) base with a triangular prism on top. The triangular cross-section has base 6 cm and height 3 cm; the prism is 10 cm long. Find the total volume.",
      "",
      "330",
      "V_rect = 240 cm³. V_tri = ½ × 6 × 3 × 10 = 90 cm³. Total = 330 cm³.",
      "The triangular prism is on top — add its volume to the rectangular prism volume.",
      ["330 cm^3"],
    ),
    answer(
      "y8-vsa-cv-m5",
      "A stepped solid has a lower rectangular prism (14 cm × 6 cm × 3 cm) and an upper rectangular prism (8 cm × 6 cm × 3 cm) placed on top of one end. Find the total volume.",
      "",
      "396",
      "Lower V = 252 cm³. Upper V = 144 cm³. Total = 252 + 144 = 396 cm³.",
      "Add both rectangular prism volumes — neither is removed.",
      ["396 cm^3"],
    ),
    choice(
      "y8-vsa-cv-m6",
      "A rectangular prism has volume 360 cm³. A smaller rectangular prism with volume 45 cm³ is removed from inside it. What is the remaining volume?",
      "C",
      ["405 cm³", "360 cm³", "315 cm³", "270 cm³"],
      "V_remaining = 360 − 45 = 315 cm³. Removing material subtracts from the total volume.",
      "Removing a piece subtracts its volume.",
    ),
    answer(
      "y8-vsa-cv-m7",
      "A composite solid consists of a lower rectangular prism (14 cm × 6 cm × 3 cm) and an upper rectangular prism (8 cm × 6 cm × 4 cm) placed on top of one end. Find the total volume.",
      "",
      "444",
      "Lower V = 252 cm³. Upper V = 192 cm³. Total = 252 + 192 = 444 cm³.",
      "Add both rectangular prism volumes, noting the different heights.",
      ["444 cm^3"],
    ),
    answer(
      "y8-vsa-cv-m8",
      "A garden bed is L-shaped. One section is 4 m long and 2 m wide; the other is 3 m long and 1 m wide. Both sections are 0.5 m deep. Find the total volume of soil needed.",
      "",
      "5.5",
      "Section A: 4 × 2 × 0.5 = 4 m³. Section B: 3 × 1 × 0.5 = 1.5 m³. Total = 5.5 m³.",
      "Split the L-shape into two rectangles and find each section's volume.",
      ["5.5 m^3"],
    ),
    answer(
      "y8-vsa-cv-m9",
      "A cylindrical pipe has outer radius 5 cm and inner radius 3 cm. It is 20 cm long. Find the exact volume of material in the pipe. Express your answer in terms of π.",
      "",
      "320π",
      "V_outer = π × 25 × 20 = 500π. V_inner = π × 9 × 20 = 180π. Material = 500π − 180π = 320π cm³.",
      "Subtract the volume of the hollow inner cylinder from the full outer cylinder.",
      ["1005", "1005.3"],
    ),
    answer(
      "y8-vsa-cv-m10",
      "A doorstop is a rectangular prism (8 cm × 5 cm × 4 cm) with a triangular prism on top. The triangular cross-section has base 8 cm and height 3 cm; the prism is 5 cm long. Find the total volume.",
      "",
      "220",
      "V_rect = 160 cm³. V_tri = ½ × 8 × 3 × 5 = 60 cm³. Total = 220 cm³.",
      "Identify the two component shapes and add their volumes.",
      ["220 cm^3"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolC("y8-vsa-cv-p1", 1, "To find the volume of two rectangular prisms joined together, you should:", "B", ["Multiply the two volumes", "Add the two volumes", "Subtract the smaller from the larger", "Average the two volumes"], "Each prism occupies its own space, so total volume = V₁ + V₂.", "Joined shapes combine their space."),
    poolA("y8-vsa-cv-p2", 1, "Two rectangular prisms are joined. Prism A has volume 50 cm³ and Prism B has volume 30 cm³. Find the total volume.", "", "80", "Total = 50 + 30 = 80 cm³.", "Add the two volumes.", ["80 cm^3"]),
    poolA("y8-vsa-cv-p3", 1, "A solid of volume 100 cm³ has a 20 cm³ piece removed. Find the remaining volume.", "", "80", "Remaining = 100 − 20 = 80 cm³.", "Subtract the removed piece.", ["80 cm^3"]),
    poolC("y8-vsa-cv-p4", 1, "When a hole is cut out of a solid, to find the remaining volume you should:", "B", ["Add the hole's volume", "Subtract the hole's volume", "Multiply by the hole's volume", "Ignore the hole"], "A removed piece reduces volume, so subtract it.", "Removing material reduces volume."),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cv-p5", 2, "Two rectangular prisms are joined. Prism A is 6 cm × 4 cm × 2 cm. Prism B is 4 cm × 4 cm × 3 cm. Find the total volume.", "", "96", "V_A = 48 cm³. V_B = 48 cm³. Total = 96 cm³.", "Add both prism volumes.", ["96 cm^3"]),
    poolA("y8-vsa-cv-p6", 2, "A rectangular prism (6 cm × 5 cm × 4 cm) has a block (2 cm × 2 cm × 4 cm) removed. Find the remaining volume.", "", "104", "Outer = 120 cm³. Removed = 16 cm³. Remaining = 104 cm³.", "Subtract the removed block.", ["104 cm^3"]),
    poolA("y8-vsa-cv-p7", 2, "A doorstop has a rectangular prism (8 cm × 4 cm × 2 cm) with a triangular prism on top (triangle base 4 cm, height 3 cm, prism length 8 cm). Find the total volume.", "", "112", "Rect = 64 cm³. Tri = ½ × 4 × 3 × 8 = 48 cm³. Total = 112 cm³.", "Add the rectangular and triangular prism volumes.", ["112 cm^3"]),
    poolC("y8-vsa-cv-p8", 2, "A composite solid is two prisms joined. Their volumes are 120 cm³ and 75 cm³. The total volume is:", "B", ["45 cm³", "195 cm³", "9000 cm³", "97.5 cm³"], "Total = 120 + 75 = 195 cm³.", "Add the volumes when shapes are joined."),
    poolA("y8-vsa-cv-p9", 2, "An L-shaped solid is two rectangular prisms: 10 cm × 4 cm × 3 cm and 4 cm × 4 cm × 3 cm. Find the total volume.", "", "168", "V₁ = 120 cm³. V₂ = 48 cm³. Total = 168 cm³.", "Split into two rectangles and add their volumes.", ["168 cm^3"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cv-p10", 3, "Two rectangular prisms are joined: 14 cm × 6 cm × 4 cm and 6 cm × 6 cm × 5 cm. Find the total volume.", "", "516", "V₁ = 336 cm³. V₂ = 180 cm³. Total = 516 cm³.", "Add both prism volumes.", ["516 cm^3"]),
    poolA("y8-vsa-cv-p11", 3, "A rectangular prism (12 cm × 10 cm × 5 cm) has a rectangular hole (4 cm × 3 cm × 5 cm) cut through it. Find the remaining volume.", "", "540", "Outer = 600 cm³. Hole = 60 cm³. Remaining = 540 cm³.", "Subtract the hole from the outer prism.", ["540 cm^3"]),
    poolA("y8-vsa-cv-p12", 3, "A house shape has a rectangular prism (10 cm × 6 cm × 5 cm) with a triangular prism roof (triangle base 10 cm, height 4 cm, prism length 6 cm). Find the total volume.", "", "420", "Rect = 300 cm³. Tri = ½ × 10 × 4 × 6 = 120 cm³. Total = 420 cm³.", "Add the rectangular base and the triangular roof.", ["420 cm^3"]),
    poolA("y8-vsa-cv-p13", 3, "A cylindrical pipe has outer radius 4 cm and inner radius 2 cm and length 30 cm. Find the exact volume of material in terms of π.", "", "360π", "Outer = π × 16 × 30 = 480π. Inner = π × 4 × 30 = 120π. Material = 360π cm³.", "Subtract the hollow inner cylinder from the outer.", ["1131", "1131.0"]),
    poolA("y8-vsa-cv-p14", 3, "Two triangular prisms are joined. Prism A: triangle base 8 cm, height 6 cm, length 10 cm. Prism B: triangle base 4 cm, height 3 cm, length 10 cm. Find the total volume.", "", "300", "V_A = 240 cm³. V_B = 60 cm³. Total = 300 cm³.", "Each: V = ½ × base × height × length.", ["300 cm^3"]),
    poolC("y8-vsa-cv-p15", 3, "A rectangular prism has a cylindrical hole drilled through it. To find the remaining volume you should:", "B", ["Add the cylinder volume to the prism volume", "Subtract the cylinder volume from the prism volume", "Multiply the two volumes", "Halve the prism volume"], "The cylinder is removed material, so V_remaining = V_prism − V_cylinder.", "A drilled hole removes material."),
    poolA("y8-vsa-cv-p16", 3, "An L-shaped garden bed: one part 5 m × 2 m, the other 3 m × 2 m, both 0.4 m deep. Find the total soil volume in m³.", "", "6.4", "Part A = 4 m³. Part B = 2.4 m³. Total = 6.4 m³.", "Find each section's volume and add.", ["6.4 m^3"]),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cv-p17", 4, "A solid is a rectangular prism (20 cm × 12 cm × 8 cm) with a smaller rectangular prism (8 cm × 6 cm × 8 cm) sitting on top. Find the total volume.", "", "2304", "V₁ = 1920 cm³. V₂ = 384 cm³. Total = 2304 cm³.", "Add both rectangular prism volumes.", ["2304 cm^3"]),
    poolA("y8-vsa-cv-p18", 4, "A cylindrical hole (radius 3 cm, length 10 cm) is drilled through a cube of edge 10 cm. Find the exact remaining volume in terms of π.", "", "1000 - 90π", "Cube = 1000 cm³. Hole = π × 9 × 10 = 90π cm³. Remaining = (1000 − 90π) cm³.", "Subtract the drilled cylinder from the cube.", ["717", "717.4"]),
    poolA("y8-vsa-cv-p19", 4, "A house-shaped solid: rectangular prism 12 cm × 8 cm × 6 cm with a triangular prism roof (triangle base 12 cm, height 5 cm, length 8 cm). Find the total volume.", "", "816", "Rect = 576 cm³. Tri = ½ × 12 × 5 × 8 = 240 cm³. Total = 816 cm³.", "Add the rectangular base and triangular roof.", ["816 cm^3"]),
    poolC("y8-vsa-cv-p20", 4, "A composite solid is a rectangular prism (volume 480 cm³) with a triangular prism (volume 120 cm³) on top, then a 60 cm³ cylindrical hole drilled through. What is the final volume?", "C", ["660 cm³", "600 cm³", "540 cm³", "420 cm³"], "Add the joined parts then subtract the hole: 480 + 120 − 60 = 540 cm³.", "Add the joined volumes, then subtract the hole."),
    poolA("y8-vsa-cv-p21", 4, "A stepped solid is three rectangular prisms stacked: 12 cm × 8 cm × 2 cm, 8 cm × 8 cm × 2 cm, 4 cm × 8 cm × 2 cm. Find the total volume.", "", "384", "V₁ = 192, V₂ = 128, V₃ = 64. Total = 192 + 128 + 64 = 384 cm³.", "Add all three prism volumes.", ["384 cm^3"]),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cv-p22", 5, "A concrete column is a cylinder (radius 20 cm, height 300 cm) standing on a rectangular base (80 cm × 80 cm × 30 cm). Find the exact total volume, keeping the cylinder term in π.", "", "120000π + 192000", "Cylinder = π × 400 × 300 = 120 000π cm³. Base = 80 × 80 × 30 = 192 000 cm³. Total = (120 000π + 192 000) cm³.", "Add the cylinder volume (in π) to the rectangular base volume.", ["192000 + 120000π"]),
    poolA("y8-vsa-cv-p23", 5, "A rectangular tank (50 cm × 40 cm × 30 cm) is full of water. A solid metal cube of edge 10 cm is dropped in and fully submerged. Find the volume of water that overflows, in cm³.", "", "1000", "The submerged cube displaces its own volume: 10³ = 1000 cm³ of water overflows.", "A fully submerged object displaces a volume equal to its own.", ["1000 cm^3"]),
    poolA("y8-vsa-cv-p24", 5, "A solid is a rectangular prism (15 cm × 10 cm × 8 cm) with a triangular-prism notch cut out (triangle base 6 cm, height 4 cm, length 10 cm). Find the remaining volume.", "", "1080", "Prism = 1200 cm³. Notch = ½ × 6 × 4 × 10 = 120 cm³. Remaining = 1080 cm³.", "Subtract the triangular-prism notch from the rectangular prism.", ["1080 cm^3"]),
    poolC("y8-vsa-cv-p25", 5, "A pool has a rectangular shallow end (10 m × 6 m × 1 m) joined to a deeper rectangular section (10 m × 6 m × 2 m). What is the total water volume?", "C", ["120 m³", "150 m³", "180 m³", "240 m³"], "Shallow = 60 m³. Deep = 120 m³. Total = 180 m³.", "Add the two rectangular volumes."),
    poolA("y8-vsa-cv-p26", 5, "A planter is a rectangular box (60 cm × 40 cm × 30 cm) with a cylindrical hole (radius 10 cm, depth 30 cm) for a pot. Find the exact volume of soil it holds, keeping the cylinder term in π.", "", "72000 - 3000π", "Box = 72 000 cm³. Hole = π × 100 × 30 = 3000π cm³. Soil = (72 000 − 3000π) cm³.", "Subtract the cylindrical hole volume from the box volume.", ["62580", "62 580"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-cv-mp1",
      prompt:
        "A house-shaped solid has a rectangular prism base measuring 12 cm long, 6 cm wide and 5 cm high, topped by a triangular prism roof. The triangular cross-section has base 12 cm and height 4 cm, and the roof is 6 cm long (the same as the base width).",
      latex: "\\text{Base } 12 \\times 6 \\times 5,\\ \\text{roof triangle base } 12,\\ \\text{height } 4,\\ \\text{length } 6",
      answer: "504",
      hint: "Find each prism's volume separately, then add them.",
      explanation:
        "(a) Rectangular base volume = 12 × 6 × 5 = 360 cm³. (b) Triangular cross-section area = ½ × 12 × 4 = 24 cm². (c) Roof volume = 24 × 6 = 144 cm³. (d) Total volume = 360 + 144 = 504 cm³.",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the volume of the rectangular base in cm³.", latex: "", marks: 1, answer: "360", acceptedAnswers: ["360 cm^3"], hint: "Multiply length × width × height.", explanation: "12 × 6 × 5 = 360 cm³." },
        { key: "b", label: "(b)", prompt: "Find the area of the triangular cross-section of the roof in cm².", latex: "", marks: 1, answer: "24", acceptedAnswers: ["24 cm^2"], hint: "Area = ½ × base × height.", explanation: "½ × 12 × 4 = 24 cm²." },
        { key: "c", label: "(c)", prompt: "Find the volume of the triangular prism roof in cm³.", latex: "", marks: 1, answer: "144", acceptedAnswers: ["144 cm^3"], hint: "Multiply the cross-sectional area by the roof length.", explanation: "24 × 6 = 144 cm³." },
        { key: "d", label: "(d)", prompt: "Find the total volume of the house-shaped solid in cm³.", latex: "", marks: 1, answer: "504", acceptedAnswers: ["504 cm^3"], hint: "Add the base and roof volumes.", explanation: "360 + 144 = 504 cm³." },
      ],
    },
  ],
};

// ── Lesson 6: Surface Area of Composite Solids ──────────────────────────────

const surfaceAreaOfCompositeSolids: LessonContent = {
  description:
    "Calculate the surface area of composite solids by summing the surface areas of component shapes, then subtracting the internal joint faces that are no longer exposed.",
  learningIntention:
    "Find the surface area of composite solids by accounting for exposed faces only.",
  successCriteria: [
    "Identify which faces are exposed (outer) and which faces are hidden (internal joints).",
    "Calculate the total SA of each component shape separately.",
    "Subtract twice the joint area (once for each shape at the join) to find the total outer SA.",
    "Apply this strategy to rectangular prisms, triangular prisms, and cylinders in composite situations.",
  ],
  teaching: {
    paragraphs: [
      "When two shapes are joined, the faces where they touch become internal — they are no longer part of the outer surface. Those faces must be subtracted from the total.",
      "The rule is: SA_composite = SA_shape1 + SA_shape2 − 2 × (joint area). Both shapes lose one face at the join, so subtract the joint area twice.",
      "For a 'house' shape (rectangular base plus triangular prism roof), the top of the rectangular prism and the bottom of the triangular prism both disappear. Subtract each once — which is the same as subtracting the joint area twice.",
      "Strategy: (1) Find the full SA of each component. (2) Identify the join face and its area. (3) Subtract 2 × joint area. This works for any number of components: subtract each joint area twice.",
    ],
    latexBlocks: [
      "SA_{\\text{composite}} = SA_1 + SA_2 - 2 \\times A_{\\text{joint}}",
      "SA_{\\text{3 shapes}} = SA_1 + SA_2 + SA_3 - 2A_{\\text{joint 1-2}} - 2A_{\\text{joint 2-3}}",
    ],
  },
  workedExamples: [
    {
      title: "Two rectangular prisms stacked",
      questionLatex:
        "\\text{A small rectangular prism (}6\\text{ cm}\\times4\\text{ cm}\\times3\\text{ cm) sits on top of a large rectangular prism (}10\\text{ cm}\\times6\\text{ cm}\\times4\\text{ cm). Find the total surface area.}",
      steps: [
        {
          explanation: "Full SA of the large prism.",
          latex: "SA_{\\text{large}} = 2(10\\times6 + 10\\times4 + 6\\times4) = 2(60+40+24) = 248",
        },
        {
          explanation: "Full SA of the small prism.",
          latex: "SA_{\\text{small}} = 2(6\\times4 + 6\\times3 + 4\\times3) = 2(24+18+12) = 108",
        },
        { explanation: "Joint face area (top of large = base of small).", latex: "A_{\\text{joint}} = 6 \\times 4 = 24" },
        {
          explanation: "Subtract twice the joint area.",
          latex: "SA = 248 + 108 - 2\\times24 = 356 - 48 = 308",
        },
      ],
      finalAnswerLatex: "SA = 308 \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "House shape: rectangular base with triangular prism roof",
      questionLatex:
        "\\text{A house shape has a rectangular base (}8\\text{ cm}\\times5\\text{ cm}\\times4\\text{ cm) with a triangular prism roof. The triangle has base }8\\text{ cm, height }3\\text{ cm and slant sides }5\\text{ cm; the prism is }5\\text{ cm long. Find the total surface area.}",
      steps: [
        {
          explanation: "SA of the rectangular base, excluding the top (covered by the roof).",
          latex: "SA_{\\text{base}} = 8\\times5 + 2(8\\times4) + 2(5\\times4) = 40 + 64 + 40 = 144",
        },
        {
          explanation: "SA of the triangular prism, excluding the bottom rectangle (joint with base).",
          latex: "SA_{\\text{roof}} = 2\\left(\\tfrac{1}{2}\\times8\\times3\\right) + 2(5\\times5) = 24 + 50 = 74",
        },
        {
          explanation: "Add the exposed faces only.",
          latex: "SA = 144 + 74 = 218",
        },
      ],
      finalAnswerLatex: "SA = 218 \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Using the formula",
      questionLatex:
        "\\text{Two rectangular prisms are joined side by side, sharing a }5\\text{ cm}\\times4\\text{ cm face. Prism A has SA = 184 cm}^2\\text{ and Prism B has SA = 112 cm}^2\\text{. Find the total composite SA.}",
      steps: [
        { explanation: "Joint face area.", latex: "A_{\\text{joint}} = 5 \\times 4 = 20" },
        {
          explanation: "Apply the composite SA formula.",
          latex: "SA = 184 + 112 - 2 \\times 20 = 296 - 40 = 256",
        },
      ],
      finalAnswerLatex: "SA = 256 \\text{ cm}^2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-vsa-cs-g1",
      "When two rectangular prisms are joined face-to-face to form a composite solid, what happens to the surfaces at the join?",
      "B",
      [
        "Both surfaces are added to the total outer surface area",
        "Both surfaces become internal and disappear from the outer surface area",
        "One surface remains visible and one disappears",
        "The two surfaces fuse into one larger surface",
      ],
      "Where shapes join, the touching faces are internal — they are no longer part of the outer (visible) surface. Both are removed.",
      "Imagine gluing two boxes together — can you see the faces where the glue is?",
    ),
    answer(
      "y8-vsa-cs-g2",
      "A small rectangular prism (6 cm × 4 cm × 3 cm) sits on top of a large rectangular prism (10 cm × 6 cm × 4 cm). Their shared joint face is 6 cm × 4 cm. Find the total surface area.",
      "",
      "308",
      "SA_large = 2(60+40+24) = 248. SA_small = 2(24+18+12) = 108. Joint = 24. SA = 248+108−48 = 308 cm².",
      "Use SA = SA₁ + SA₂ − 2 × joint area.",
      ["308 cm^2"],
    ),
    answer(
      "y8-vsa-cs-g3",
      "A small rectangular prism (3 cm × 6 cm × 2 cm) is placed on top of a large rectangular prism (12 cm × 6 cm × 4 cm). Their shared joint face is 3 cm × 6 cm. Find the total surface area.",
      "",
      "324",
      "SA_large = 2(72+48+24) = 288. SA_small = 2(18+6+12) = 72. Joint = 18. SA = 288+72−36 = 324 cm².",
      "Calculate full SA of each prism, then subtract 2 × joint area.",
      ["324 cm^2"],
    ),
    answer(
      "y8-vsa-cs-g4",
      "A house shape has a rectangular base (8 cm × 5 cm × 4 cm) with a triangular prism roof. The triangle has base 8 cm, height 3 cm and slant sides 5 cm; the prism is 5 cm long. Find the total surface area.",
      "",
      "218",
      "Base exposed (no top): 8×5 + 2×8×4 + 2×5×4 = 40+64+40 = 144. Roof (no bottom): 2×(½×8×3) + 2×(5×5) = 24+50 = 74. Total = 144+74 = 218 cm².",
      "Exclude the top of the base and the bottom of the roof — both are at the join.",
      ["218 cm^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-cs-i1",
      "A small rectangular prism (6 cm × 4 cm × 5 cm) sits on top of a large rectangular prism (12 cm × 8 cm × 3 cm). Their joint face is 6 cm × 4 cm. Find the total surface area.",
      "",
      "412",
      "SA_large = 2(96+36+24) = 312. SA_small = 2(24+30+20) = 148. Joint = 24. SA = 312+148−48 = 412 cm².",
      "Apply SA = SA₁ + SA₂ − 2 × joint area.",
      ["412 cm^2"],
    ),
    answer(
      "y8-vsa-cs-i2",
      "A small rectangular prism (6 cm × 3 cm × 4 cm) is placed on top of a large rectangular prism (14 cm × 5 cm × 3 cm). Their joint face is 6 cm × 3 cm. Find the total surface area.",
      "",
      "326",
      "SA_large = 2(70+42+15) = 254. SA_small = 2(18+24+12) = 108. Joint = 18. SA = 254+108−36 = 326 cm².",
      "Identify the joint face dimensions and apply the composite SA formula.",
      ["326 cm^2"],
    ),
    choice(
      "y8-vsa-cs-i3",
      "Prism A has a full surface area of 200 cm². Prism B has a full surface area of 80 cm². They are joined at a face with area 15 cm². What is the total outer surface area of the composite solid?",
      "C",
      ["280 cm²", "265 cm²", "250 cm²", "215 cm²"],
      "SA = 200 + 80 − 2×15 = 280 − 30 = 250 cm². Both shapes lose one face at the join, so subtract the joint area twice.",
      "Both shapes lose one face at the join — subtract the joint area twice.",
    ),
    answer(
      "y8-vsa-cs-i4",
      "A small rectangular prism (8 cm × 5 cm × 3 cm) sits on top of a large rectangular prism (12 cm × 8 cm × 4 cm). Their joint face is 8 cm × 5 cm. Find the total surface area.",
      "",
      "430",
      "SA_large = 2(96+48+32) = 352. SA_small = 2(40+24+15) = 158. Joint = 40. SA = 352+158−80 = 430 cm².",
      "Carefully calculate each full SA, identify the joint, then subtract 2 × joint.",
      ["430 cm^2"],
    ),
    answer(
      "y8-vsa-cs-i5",
      "A house shape has a rectangular base (6 cm × 4 cm × 3 cm) with a triangular prism roof. The triangle has base 6 cm, height 4 cm and slant sides 5 cm; the prism is 4 cm long. Find the total surface area.",
      "",
      "148",
      "Base exposed (no top): 6×4 + 2×6×3 + 2×4×3 = 24+36+24 = 84. Roof (no bottom): 2×(½×6×4) + 2×(5×4) = 24+40 = 64. Total = 84+64 = 148 cm².",
      "For the roof, include only the triangular ends and the slant rectangles — not the base rectangle.",
      ["148 cm^2"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to subtract the joint face area twice.",
      fix:
        "When two shapes join, both lose one face — so subtract the joint area once for each shape. The formula is SA₁ + SA₂ − 2 × joint area.",
    },
    {
      mistake: "Subtracting the joint only once (subtracting 1× instead of 2×).",
      fix:
        "Each shape at a joint loses a face. If the joint area is 20 cm², subtract 2 × 20 = 40 cm² from the combined SA, not just 20 cm².",
    },
    {
      mistake: "Including the bottom of the triangular prism roof in the SA calculation.",
      fix:
        "The bottom rectangle of the triangular prism (the joint with the walls) is internal — it is not part of the outer surface. Only count the two triangular ends and the two slant rectangles.",
    },
    {
      mistake: "Using the volume approach (add everything) instead of the surface area approach (subtract joints).",
      fix:
        "Volume adds all internal space; surface area counts only exposed faces. Always subtract the hidden joint faces when computing composite surface area.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-vsa-cs-m1",
      "A small rectangular prism (6 cm × 4 cm × 3 cm) sits on top of a large rectangular prism (10 cm × 8 cm × 4 cm). Their joint face is 6 cm × 4 cm. Find the total surface area.",
      "",
      "364",
      "SA_large = 2(80+40+32) = 304. SA_small = 2(24+18+12) = 108. Joint = 24. SA = 304+108−48 = 364 cm².",
      "Apply SA = SA₁ + SA₂ − 2 × joint area.",
      ["364 cm^2"],
    ),
    answer(
      "y8-vsa-cs-m2",
      "A small square prism (6 cm × 6 cm × 3 cm) sits centred on top of a large square prism (8 cm × 8 cm × 5 cm). Their joint face is 6 cm × 6 cm. Find the total surface area.",
      "",
      "360",
      "SA_large = 2(64+40+40) = 288. SA_small = 2(36+18+18) = 144. Joint = 36. SA = 288+144−72 = 360 cm².",
      "Full SA of each prism, minus 2 × joint. The joint is where the small prism base meets the large prism top.",
      ["360 cm^2"],
    ),
    choice(
      "y8-vsa-cs-m3",
      "Prism A has SA = 280 cm² and Prism B has SA = 96 cm². They are joined at a 20 cm² face. What is the total composite surface area?",
      "C",
      ["376 cm²", "356 cm²", "336 cm²", "316 cm²"],
      "SA = 280 + 96 − 2×20 = 376 − 40 = 336 cm². Both shapes lose one face at the join.",
      "Subtract the joint area twice — once per shape.",
    ),
    answer(
      "y8-vsa-cs-m4",
      "A house shape has a rectangular base (12 cm × 6 cm × 4 cm) with a triangular prism roof. The triangle has base 12 cm, height 8 cm and slant sides 10 cm; the prism is 6 cm long. Find the total surface area.",
      "",
      "432",
      "Base exposed (no top): 72+96+48 = 216. Roof (no bottom): 2×(½×12×8)+2×(10×6) = 96+120 = 216. Total = 432 cm².",
      "Slant side check: half-base = 6, height = 8 → slant = √(36+64) = 10. ✓",
      ["432 cm^2"],
    ),
    answer(
      "y8-vsa-cs-m5",
      "A stepped solid has a lower rectangular prism (14 cm × 6 cm × 3 cm) with an upper rectangular prism (8 cm × 6 cm × 3 cm) on top of one end. Their joint face is 8 cm × 6 cm. Find the total surface area.",
      "",
      "372",
      "SA_lower = 2(84+42+18) = 288. SA_upper = 2(48+24+18) = 180. Joint = 48. SA = 288+180−96 = 372 cm².",
      "A stepped solid has the upper prism sitting on part of the lower prism's top — that shared face is the joint.",
      ["372 cm^2"],
    ),
    choice(
      "y8-vsa-cs-m6",
      "A rectangular prism has surface area 240 cm². A smaller rectangular prism (SA = 80 cm²) is placed on top, sharing a 20 cm² face. Which expression gives the total composite surface area?",
      "C",
      [
        "\\(240 + 80\\)",
        "\\(240 + 80 - 20\\)",
        "\\(240 + 80 - 2 \\times 20\\)",
        "\\(240 + 80 - 4 \\times 20\\)",
      ],
      "SA = 240 + 80 − 2×20 = 320 − 40 = 280 cm². The joint is subtracted twice because both shapes lose one face.",
      "Both shapes lose the joint face — subtract it once for each shape.",
    ),
    answer(
      "y8-vsa-cs-m7",
      "A house shape has a rectangular base (8 cm × 4 cm × 5 cm) with a triangular prism roof. The triangle has base 8 cm, height 3 cm and slant sides 5 cm; the prism is 4 cm long. Find the total surface area.",
      "",
      "216",
      "Base exposed (no top): 8×4 + 2×8×5 + 2×4×5 = 32+80+40 = 152. Roof (no bottom): 2×(½×8×3)+2×(5×4) = 24+40 = 64. Total = 216 cm².",
      "Half-base = 4, height = 3 → slant = √(16+9) = 5. The two slant rectangles are 5×4 each.",
      ["216 cm^2"],
    ),
    answer(
      "y8-vsa-cs-m8",
      "A staircase consists of three rectangular prisms. Step 1 (bottom) is 12 cm × 6 cm × 2 cm. Step 2 is 8 cm × 6 cm × 2 cm placed on top. Step 3 is 4 cm × 6 cm × 2 cm placed on top of Step 2. Find the total surface area.",
      "",
      "312",
      "SA₁ = 2(72+24+12) = 216. SA₂ = 2(48+16+12) = 152. SA₃ = 2(24+8+12) = 88. Joint 1-2 = 48. Joint 2-3 = 24. SA = 456−96−48 = 312 cm².",
      "Apply the composite SA formula twice: once for each joint between adjacent steps.",
      ["312 cm^2"],
    ),
    answer(
      "y8-vsa-cs-m9",
      "Two closed cylinders are stacked. The large cylinder has radius 6 cm and height 10 cm. The small cylinder has radius 3 cm and height 5 cm, placed on top. Their joint face is a circle with radius 3 cm. Find the total exact surface area in terms of π.",
      "",
      "222π",
      "SA_large = 2π×36 + 2π×6×10 = 72π+120π = 192π. SA_small = 2π×9 + 2π×3×5 = 18π+30π = 48π. Joint = π×9 = 9π. SA = 192π+48π−18π = 222π cm².",
      "Joint area = π × r² of the smaller cylinder. Subtract it twice.",
      ["697", "697.4"],
    ),
    answer(
      "y8-vsa-cs-m10",
      "Three rectangular prisms are stacked in tiers. P1 (bottom): 12 cm × 10 cm × 3 cm. P2 (middle): 8 cm × 6 cm × 4 cm. P3 (top): 4 cm × 3 cm × 5 cm. Joint P1–P2 area = 48 cm². Joint P2–P3 area = 12 cm². Find the total surface area.",
      "",
      "554",
      "SA_P1 = 2(120+36+30) = 372. SA_P2 = 2(48+32+24) = 208. SA_P3 = 2(12+20+15) = 94. SA = 372+208+94−96−24 = 554 cm².",
      "Subtract 2 × joint area for each of the two joins.",
      ["554 cm^2"],
    ),
  ],
  masteryQuizPool: [
    // ── Difficulty 1 ──────────────────────────────────────────────────────
    poolC("y8-vsa-cs-p1", 1, "When two prisms are joined face-to-face, the two touching faces:", "B", ["Stay part of the outer surface", "Become internal and are not counted", "Double the surface area", "Add to the volume only"], "Touching faces become internal — they are no longer part of the outer surface.", "Hidden faces inside the join are not visible."),
    poolC("y8-vsa-cs-p2", 1, "The composite surface area formula for two joined shapes is:", "C", ["$SA_1 + SA_2$", "$SA_1 + SA_2 - A_{joint}$", "$SA_1 + SA_2 - 2A_{joint}$", "$SA_1 \\times SA_2$"], "Both shapes lose one face at the join, so subtract the joint area twice.", "Each shape loses one face at the join."),
    poolA("y8-vsa-cs-p3", 1, "Prism A has SA 100 cm² and Prism B has SA 60 cm². They join at a 10 cm² face. Find the composite SA.", "", "140", "SA = 100 + 60 − 20 = 140 cm².", "Subtract 2 × joint area.", ["140 cm^2"]),
    poolA("y8-vsa-cs-p4", 1, "Two prisms with SA 50 cm² and 40 cm² join at a 5 cm² face. Find the composite SA.", "", "80", "SA = 50 + 40 − 10 = 80 cm².", "Subtract twice the joint area.", ["80 cm^2"]),
    // ── Difficulty 2 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cs-p5", 2, "A small prism (SA 108 cm²) sits on a large prism (SA 248 cm²), sharing a 24 cm² face. Find the composite SA.", "", "308", "SA = 248 + 108 − 48 = 308 cm².", "Apply SA = SA₁ + SA₂ − 2 × joint.", ["308 cm^2"]),
    poolC("y8-vsa-cs-p6", 2, "Prism A has SA 200 cm² and Prism B has SA 120 cm². They join at a 25 cm² face. The composite SA is:", "C", ["320 cm²", "295 cm²", "270 cm²", "245 cm²"], "SA = 200 + 120 − 2 × 25 = 320 − 50 = 270 cm².", "Subtract the joint area twice."),
    poolA("y8-vsa-cs-p7", 2, "A cube of SA 96 cm² sits on a cube of SA 216 cm². The joint face is 16 cm². Find the composite SA.", "", "280", "SA = 216 + 96 − 32 = 280 cm².", "Subtract 2 × joint area.", ["280 cm^2"]),
    poolA("y8-vsa-cs-p8", 2, "Two prisms with SA 150 cm² and 90 cm² join at a 12 cm² face. Find the composite SA.", "", "216", "SA = 150 + 90 − 24 = 216 cm².", "Apply the composite formula.", ["216 cm^2"]),
    poolA("y8-vsa-cs-p9", 2, "A small prism (6 cm × 4 cm × 2 cm) sits on a large prism (10 cm × 6 cm × 3 cm); the joint face is 6 cm × 4 cm. Find the composite SA.", "", "256", "SA_large = 2(60+30+18) = 216. SA_small = 2(24+12+8) = 88. Joint = 24. SA = 216+88−48 = 256 cm².", "Find each full SA, then subtract 2 × joint.", ["256 cm^2"]),
    // ── Difficulty 3 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cs-p10", 3, "A small prism (8 cm × 4 cm × 3 cm) sits on a large prism (10 cm × 8 cm × 5 cm); the joint face is 8 cm × 4 cm. Find the composite SA.", "", "412", "SA_large = 2(80+50+40) = 340. SA_small = 2(32+24+12) = 136. Joint = 32. SA = 340+136−64 = 412 cm².", "Apply SA = SA₁ + SA₂ − 2 × joint.", ["412 cm^2"]),
    poolA("y8-vsa-cs-p11", 3, "A house shape: rectangular base (6 cm × 4 cm × 3 cm) with a triangular prism roof (triangle base 6 cm, height 4 cm, slant 5 cm, length 4 cm). Find the total SA.", "", "148", "Base (no top): 6×4 + 2×6×3 + 2×4×3 = 24+36+24 = 84. Roof (no bottom): 2×(½×6×4) + 2×(5×4) = 24+40 = 64. Total = 148 cm².", "Exclude the top of the base and the bottom of the roof.", ["148 cm^2"]),
    poolA("y8-vsa-cs-p12", 3, "A small prism (4 cm × 4 cm × 2 cm) sits centred on a large prism (8 cm × 6 cm × 4 cm); the joint face is 4 cm × 4 cm. Find the composite SA.", "", "240", "SA_large = 2(48+32+24) = 208. SA_small = 2(16+8+8) = 64. Joint = 16. SA = 208+64−32 = 240 cm².", "Full SA of each, then subtract 2 × joint.", ["240 cm^2"]),
    poolC("y8-vsa-cs-p13", 3, "Prism A has SA 184 cm² and Prism B has SA 112 cm². They share a 5 cm × 4 cm face. Which gives the composite SA?", "C", ["\\(184 + 112\\)", "\\(184 + 112 - 20\\)", "\\(184 + 112 - 2 \\times 20\\)", "\\(184 + 112 - 4 \\times 20\\)"], "Joint = 20 cm². SA = 184 + 112 − 2×20 = 256 cm². Subtract the joint twice.", "Both shapes lose the joint face."),
    poolA("y8-vsa-cs-p14", 3, "A house shape: rectangular base (8 cm × 5 cm × 4 cm) with a triangular prism roof (triangle base 8 cm, height 3 cm, slant 5 cm, length 5 cm). Find the total SA.", "", "218", "Base (no top): 8×5 + 2×8×4 + 2×5×4 = 144. Roof (no bottom): 2×(½×8×3)+2×(5×5) = 74. Total = 218 cm².", "Slant rectangles are 5×5; exclude the roof's bottom face.", ["218 cm^2"]),
    poolA("y8-vsa-cs-p15", 3, "Two closed cylinders stacked: large radius 4 cm, height 6 cm; small radius 2 cm, height 3 cm. Joint circle radius 2 cm. Find the exact total SA in terms of π.", "", "92π", "SA_large = 2π×16 + 2π×4×6 = 32π+48π = 80π. SA_small = 2π×4 + 2π×2×3 = 8π+12π = 20π. Joint = 4π. SA = 80π+20π−8π = 92π cm².", "Joint = π × r² of the smaller cylinder; subtract it twice.", ["289", "289.0"]),
    poolA("y8-vsa-cs-p16", 3, "A small prism (5 cm × 5 cm × 2 cm) sits on a large prism (9 cm × 7 cm × 4 cm); the joint face is 5 cm × 5 cm. Find the composite SA.", "", "294", "SA_large = 2(63+36+28) = 254. SA_small = 2(25+10+10) = 90. Joint = 25. SA = 254+90−50 = 294 cm².", "Apply SA = SA₁ + SA₂ − 2 × joint.", ["294 cm^2"]),
    // ── Difficulty 4 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cs-p17", 4, "A staircase has three prisms: 12 cm × 6 cm × 2 cm, 8 cm × 6 cm × 2 cm (on top), 4 cm × 6 cm × 2 cm (on top of that). Joint 1–2 = 48 cm², joint 2–3 = 24 cm². Find the total SA.", "", "312", "SA₁ = 2(72+24+12) = 216. SA₂ = 2(48+16+12) = 152. SA₃ = 2(24+8+12) = 88. SA = 456−96−48 = 312 cm².", "Subtract 2 × joint area for each of the two joins.", ["312 cm^2"]),
    poolA("y8-vsa-cs-p18", 4, "A house shape: rectangular base (12 cm × 6 cm × 4 cm) with a triangular prism roof (triangle base 12 cm, height 8 cm, slant 10 cm, length 6 cm). Find the total SA.", "", "432", "Base (no top): 72+96+48 = 216. Roof (no bottom): 2×(½×12×8)+2×(10×6) = 96+120 = 216. Total = 432 cm².", "Slant: √(6²+8²)=10. Exclude the roof's bottom rectangle.", ["432 cm^2"]),
    poolA("y8-vsa-cs-p19", 4, "A small prism (8 cm × 5 cm × 3 cm) sits on a large prism (12 cm × 8 cm × 4 cm); the joint face is 8 cm × 5 cm. Find the composite SA.", "", "430", "SA_large = 2(96+48+32) = 352. SA_small = 2(40+24+15) = 158. Joint = 40. SA = 352+158−80 = 430 cm².", "Find each full SA, then subtract 2 × joint.", ["430 cm^2"]),
    poolC("y8-vsa-cs-p20", 4, "Two cubes (edges 4 cm and 2 cm) are joined, the small cube centred on a face of the large cube. The joint is the small cube's face. The composite SA is:", "B", ["\\(120\\text{ cm}^2\\)", "\\(112\\text{ cm}^2\\)", "\\(104\\text{ cm}^2\\)", "\\(96\\text{ cm}^2\\)"], "SA_large = 6×16 = 96 cm². SA_small = 6×4 = 24 cm². Joint = 2×2 = 4 cm². SA = 96 + 24 − 2×4 = 120 − 8 = 112 cm².", "Subtract twice the small cube's joint face."),
    poolA("y8-vsa-cs-p21", 4, "A stepped solid: lower prism (16 cm × 6 cm × 3 cm) with an upper prism (10 cm × 6 cm × 3 cm) on one end. Joint face = 10 cm × 6 cm. Find the total SA.", "", "420", "SA_lower = 2(96+48+18) = 324 cm². SA_upper = 2(60+30+18) = 216 cm². Joint = 60 cm². SA = 324 + 216 − 120 = 420 cm².", "Find each full SA and subtract 2 × joint area.", ["420 cm^2"]),
    // ── Difficulty 5 ──────────────────────────────────────────────────────
    poolA("y8-vsa-cs-p22", 5, "Three prisms are stacked: P1 12 cm × 10 cm × 3 cm, P2 8 cm × 6 cm × 4 cm, P3 4 cm × 3 cm × 5 cm. Joint P1–P2 = 48 cm², joint P2–P3 = 12 cm². Find the total SA.", "", "554", "SA_P1 = 2(120+36+30) = 372. SA_P2 = 2(48+32+24) = 208. SA_P3 = 2(12+20+15) = 94. SA = 674−96−24 = 554 cm².", "Subtract 2 × joint area for each of the two joins.", ["554 cm^2"]),
    poolA("y8-vsa-cs-p23", 5, "Two closed cylinders are stacked: large radius 6 cm, height 10 cm; small radius 3 cm, height 5 cm. The joint circle has radius 3 cm. Find the exact total SA in terms of π.", "", "222π", "SA_large = 2π×36 + 2π×6×10 = 192π. SA_small = 2π×9 + 2π×3×5 = 48π. Joint = 9π. SA = 192π+48π−18π = 222π cm².", "Joint = π × r² of the smaller cylinder; subtract it twice.", ["697", "697.4"]),
    poolA("y8-vsa-cs-p24", 5, "A house shape: rectangular base (10 cm × 6 cm × 5 cm) with a triangular prism roof (triangle base 10 cm, height 12 cm, slant 13 cm, length 6 cm). Find the total SA.", "", "496", "Base (no top): 10×6 + 2×10×5 + 2×6×5 = 60+100+60 = 220. Roof (no bottom): 2×(½×10×12)+2×(13×6) = 120+156 = 276. Total = 496 cm².", "Slant: √(5²+12²)=13. Exclude the roof's bottom rectangle.", ["496 cm^2"]),
    poolC("y8-vsa-cs-p25", 5, "A small prism (SA 80 cm²) is placed on a large prism (SA 240 cm²), sharing a 20 cm² face. A student forgets to subtract the joint and answers 320 cm². By how much is the answer too large?", "B", ["20 cm²", "40 cm²", "60 cm²", "80 cm²"], "The correct SA = 320 − 2×20 = 280 cm². The error overstates by 2×20 = 40 cm².", "The omitted subtraction is 2 × joint area."),
    poolA("y8-vsa-cs-p26", 5, "A small cube (edge 3 cm) sits centred on a large cube (edge 6 cm). The joint is the small cube's bottom face. Find the composite SA.", "", "252", "SA_large = 6×36 = 216. SA_small = 6×9 = 54. Joint = 3×3 = 9. SA = 216+54−18 = 252 cm².", "Subtract 2 × the small cube's joint face.", ["252 cm^2"]),
  ],
  multiPartPractice: [
    {
      id: "y8-vsa-cs-mp1",
      prompt:
        "A composite solid is formed by placing a small rectangular prism (6 cm long, 4 cm wide, 3 cm high) centred on top of a large rectangular prism (10 cm long, 8 cm wide, 5 cm high). The small prism's base (6 cm × 4 cm) sits entirely on the large prism's top face.",
      latex: "\\text{Large } 10 \\times 8 \\times 5,\\ \\text{small } 6 \\times 4 \\times 3",
      answer: "412",
      hint: "Find each prism's full surface area, then subtract twice the joint face area.",
      explanation:
        "(a) Large SA = 2(80 + 50 + 40) = 340 cm². (b) Small SA = 2(24 + 18 + 12) = 108 cm². (c) Joint face = 6 × 4 = 24 cm². (d) Composite SA = 340 + 108 − 2×24 = 412 cm².",
      parts: [
        { key: "a", label: "(a)", prompt: "Find the full surface area of the large prism in cm².", latex: "", marks: 1, answer: "340", acceptedAnswers: ["340 cm^2"], hint: "Use SA = 2(lw + lh + wh).", explanation: "2(80 + 50 + 40) = 340 cm²." },
        { key: "b", label: "(b)", prompt: "Find the full surface area of the small prism in cm².", latex: "", marks: 1, answer: "108", acceptedAnswers: ["108 cm^2"], hint: "Use SA = 2(lw + lh + wh).", explanation: "2(24 + 18 + 12) = 108 cm²." },
        { key: "c", label: "(c)", prompt: "Find the area of the joint face in cm².", latex: "", marks: 1, answer: "24", acceptedAnswers: ["24 cm^2"], hint: "The joint is the small prism's base.", explanation: "6 × 4 = 24 cm²." },
        { key: "d", label: "(d)", prompt: "Find the total composite surface area in cm².", latex: "", marks: 1, answer: "412", acceptedAnswers: ["412 cm^2"], hint: "Subtract twice the joint area from the sum of the two surface areas.", explanation: "340 + 108 − 48 = 412 cm²." },
      ],
    },
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "volume-of-prisms":              volumeOfPrisms,
  "surface-area-of-prisms":        surfaceAreaOfPrisms,
  "volume-of-cylinders":           volumeOfCylinders,
  "surface-area-of-cylinders":     surfaceAreaOfCylinders,
  "volume-of-composite-solids":    volumeOfCompositeSolids,
  "surface-area-of-composite-solids": surfaceAreaOfCompositeSolids,
};

function addQuestionVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = volumeSurfaceAreaQuestionVisuals[question.id];
  return visual ? { ...question, ...visual } : question;
}

function addQuestionVisuals(content: LessonContent): LessonContent {
  return {
    ...content,
    guidedPractice: content.guidedPractice.map(addQuestionVisual),
    independentPractice: content.independentPractice.map(addQuestionVisual),
    masteryQuiz: content.masteryQuiz.map(addQuestionVisual),
    masteryQuizPool: content.masteryQuizPool?.map(addQuestionVisual),
    multiPartPractice: content.multiPartPractice?.map(addQuestionVisual),
  };
}

export function year8VolumeSurfaceAreaLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-8-mathematics" &&
    course.slug !== "year-7-mathematics"
  ) {
    return null;
  }
  if (
    unit.slug !== "volume-and-surface-area" &&
    unit.slug !== "surface-area-of-solids" &&
    unit.slug !== "volume-of-composite-solids" &&
    unit.slug !== "volume"
  ) {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;
  const scopedContent =
    course.slug === "year-8-mathematics" ? addQuestionVisuals(content) : content;

  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...scopedContent,
  };
}
