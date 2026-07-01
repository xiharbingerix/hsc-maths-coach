import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";

function choice(
  id: string,
  prompt: string,
  ans: "A" | "B" | "C" | "D",
  opts: string[],
  explanation: string,
  latex = "\\text{Choose the best option.}",
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: opts.map((text, i) => ({ label: String.fromCharCode(65 + i), text })),
    answer: ans,
    ...(hint ? { hint } : {}),
    explanation,
  };
}

function answer(
  id: string,
  prompt: string,
  latex: string,
  ans: string,
  explanation: string,
  acceptedAnswers?: string[],
  hint?: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: ans,
    ...(acceptedAnswers ? { acceptedAnswers } : {}),
    ...(hint ? { hint } : {}),
    explanation,
  };
}

const base = { masteryPassMark: 0.8 };

const vectorsRevision: Partial<ExplicitLesson> = {
  ...base,
  description:
    "Activate prior knowledge for vectors: distinguish scalars and vectors, find vector magnitude using Pythagoras, apply the distance formula between two points, and resolve a vector into components using bearings.",
  learningIntention:
    "Identify scalar and vector quantities, calculate the magnitude of a vector using the Pythagorean theorem, apply the distance formula, and find vector components given a magnitude and bearing.",
  successCriteria: [
    "Distinguish between scalar quantities (magnitude only) and vector quantities (magnitude and direction).",
    "Compute |v| = √(a² + b²) for a vector v = (a, b).",
    "Apply the distance formula |AB| = √((x₂−x₁)² + (y₂−y₁)²).",
    "State the bearing convention and convert a bearing to north/east components.",
    "Recognise a Pythagorean triple to find magnitudes without a calculator.",
  ],
  teaching: {
    paragraphs: [
      "Vectors have two parts: a magnitude and a direction. Scalars have only a magnitude. Speed (50 km/h) is a scalar; velocity (50 km/h due north) is a vector. Displacement, force, and acceleration are vectors — they need both 'how much' and 'which way'.",
      "A vector $\\mathbf{v}=(a,b)$ can be drawn as an arrow from the origin to the point $(a,b)$. Its magnitude (length) is $|\\mathbf{v}|=\\sqrt{a^2+b^2}$ by Pythagoras. The distance between two points $A=(x_1,y_1)$ and $B=(x_2,y_2)$ is the same formula applied to the difference: $|AB|=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.",
      "Bearings measure direction clockwise from north, written as a three-digit angle (e.g. 045° = north-east, 270° = due west). To find the north and east components of a vector with magnitude $|\\mathbf{v}|$ on bearing $\\theta$: north component $=|\\mathbf{v}|\\cos\\theta$, east component $=|\\mathbf{v}|\\sin\\theta$. The two components form a right triangle with the vector as hypotenuse.",
    ],
    latexBlocks: [
      "|\\mathbf{v}|=\\sqrt{a^2+b^2}\\quad\\text{for }\\mathbf{v}=(a,b)",
      "|AB|=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
      "\\text{Bearing }\\theta:\\quad\\text{north component}=|\\mathbf{v}|\\cos\\theta,\\quad\\text{east component}=|\\mathbf{v}|\\sin\\theta",
    ],
  },
  workedExamples: [
    {
      title: "Find the magnitude of a vector",
      questionLatex: "\\text{Find }|\\mathbf{v}|\\text{ for }\\mathbf{v}=(-3,\\,4).",
      steps: [
        {
          explanation:
            "Apply the magnitude formula — the negative sign does not affect the result since both components are squared.",
          latex:
            "|\\mathbf{v}|=\\sqrt{(-3)^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5",
        },
      ],
      finalAnswerLatex: "|\\mathbf{v}|=5",
    },
    {
      title: "Find the distance between two points",
      questionLatex:
        "\\text{Find the distance between }A=(2,\\,1)\\text{ and }B=(8,\\,9).",
      steps: [
        {
          explanation:
            "Compute the differences in x and y coordinates, then apply the distance formula.",
          latex:
            "|AB|=\\sqrt{(8-2)^2+(9-1)^2}=\\sqrt{36+64}=\\sqrt{100}=10",
        },
      ],
      finalAnswerLatex: "|AB|=10",
    },
  ],
  guidedPractice: [
    // g1 — MCQ
    choice(
      "y12e1-vr-g1",
      "Which of the following is a vector quantity?",
      "C",
      ["mass", "temperature", "displacement", "speed"],
      "Displacement has both magnitude (how far) and direction (which way), making it a vector. Mass, temperature, and speed are scalars — they have magnitude only.",
      "\\text{Choose the best option.}",
      "Vectors need both a size and a direction — which of these has a direction?"
    ),
    // g2 — typed
    answer(
      "y12e1-vr-g2",
      "Find |v| for v = (5, 12).",
      "",
      "13",
      "|v| = √(25 + 144) = √169 = 13. This is the 5-12-13 Pythagorean triple.",
      ["13"],
      "Use |v| = √(a² + b²) and recognise the 5-12-13 triple."
    ),
    // g3 — typed
    answer(
      "y12e1-vr-g3",
      "Find the distance between A = (1, 2) and B = (4, 6).",
      "",
      "5",
      "|AB| = √(9 + 16) = √25 = 5. The differences are (3, 4), which is a 3-4-5 triple.",
      ["5"],
      "Use the distance formula and check for a Pythagorean triple."
    ),
    // g4 — typed
    answer(
      "y12e1-vr-g4",
      "A vector has magnitude 10 and bearing 030°. Find its northward component. Give an exact value.",
      "",
      "5sqrt(3)",
      "North = 10 × cos(30°) = 10 × (√3/2) = 5√3.",
      ["5sqrt(3)", "5√3"],
      "North component = |v| × cos(bearing). Recall cos(30°) = √3/2."
    ),
  ],
  independentPractice: [
    // i1 — typed, D2
    answer(
      "y12e1-vr-i1",
      "Find |v| for v = (8, 15).",
      "",
      "17",
      "|v| = √(64 + 225) = √289 = 17. This is the 8-15-17 Pythagorean triple.",
      ["17"],
      "Recognise the 8-15-17 Pythagorean triple."
    ),
    // i2 — typed, D2
    answer(
      "y12e1-vr-i2",
      "Find the distance between A = (−1, 3) and B = (5, −5).",
      "",
      "10",
      "|AB| = √(6² + 8²) = √(36 + 64) = √100 = 10. The differences are (6, 8), a 6-8-10 triple.",
      ["10"],
      "Find the x and y differences, then apply the distance formula."
    ),
    // i3 — typed, D2
    answer(
      "y12e1-vr-i3",
      "A vector has magnitude 20 and bearing 090° (due east). Find its northward component.",
      "",
      "0",
      "North = 20 × cos(90°) = 20 × 0 = 0. A due-east vector has no northward component.",
      ["0"],
      "cos(90°) = 0 — a purely eastward vector contributes nothing in the north direction."
    ),
    // i4 — MCQ, D3
    choice(
      "y12e1-vr-i4",
      "A bearing of 180° points in which direction?",
      "C",
      ["north", "east", "south", "west"],
      "Bearings are measured clockwise from north. 180° clockwise from north points due south.",
      "\\text{Choose the best option.}",
      "Bearings go clockwise from north: 090° = east, 180° = south, 270° = west."
    ),
    // i5 — typed, D3
    answer(
      "y12e1-vr-i5",
      "Find |v| for v = (−6, 8).",
      "",
      "10",
      "|v| = √(36 + 64) = √100 = 10. Note: squaring removes the negative sign.",
      ["10"]
    ),
  ],
  masteryQuiz: [
    // m1 — typed, D3
    answer(
      "y12e1-vr-m1",
      "Find the distance between A = (2, −3) and B = (−1, 1).",
      "",
      "5",
      "|AB| = √(9 + 16) = √25 = 5. The differences are (−3, 4), a 3-4-5 triple.",
      ["5"]
    ),
    // m2 — MCQ, D3
    choice(
      "y12e1-vr-m2",
      "Which of these represents a scalar quantity?",
      "D",
      ["force", "velocity", "acceleration", "temperature"],
      "Temperature has magnitude only (no direction), so it is a scalar. Force, velocity, and acceleration all have both magnitude and direction — they are vectors."
    ),
    // m3 — typed, D3
    answer(
      "y12e1-vr-m3",
      "A vector v has magnitude 13 and eastward component 5. Find its northward component.",
      "",
      "12",
      "By Pythagoras: north² = 13² − 5² = 169 − 25 = 144, so north = 12. This is the 5-12-13 triple.",
      ["12"]
    ),
    // m4 — typed, D3
    answer(
      "y12e1-vr-m4",
      "Find the distance between P = (0, 0) and Q = (7, 24).",
      "",
      "25",
      "|PQ| = √(49 + 576) = √625 = 25. This is the 7-24-25 Pythagorean triple.",
      ["25"]
    ),
    // m5 — typed, D4
    answer(
      "y12e1-vr-m5",
      "A ship travels at 25 km/h on a bearing of 090° (due east). Find its eastward component.",
      "",
      "25",
      "East = 25 × sin(90°) = 25 × 1 = 25. A due-east vector has all its magnitude in the eastward direction.",
      ["25"]
    ),
    // m6 — MCQ, D4
    choice(
      "y12e1-vr-m6",
      "A bearing of 270° points in which direction?",
      "D",
      ["north", "east", "south", "west"],
      "270° clockwise from north points due west. (090° = east, 180° = south, 270° = west, 360°/000° = north.)"
    ),
    // m7 — typed, D4
    answer(
      "y12e1-vr-m7",
      "Find |v| for v = (−3, −4).",
      "",
      "5",
      "|v| = √(9 + 16) = √25 = 5. Both signs are removed by squaring.",
      ["5"]
    ),
    // m8 — typed, D5
    answer(
      "y12e1-vr-m8",
      "A ship travels at 40 km/h on bearing 030°. Find its northward component. Give an exact value.",
      "",
      "20sqrt(3)",
      "North = 40 × cos(30°) = 40 × (√3/2) = 20√3 km/h.",
      ["20sqrt(3)", "20√3"]
    ),
    // m9 — typed, D5
    answer(
      "y12e1-vr-m9",
      "Find the distance between A = (3, 4) and B = (6, 8).",
      "",
      "5",
      "|AB| = √(9 + 16) = √25 = 5. The differences (3, 4) form a 3-4-5 triple.",
      ["5"]
    ),
    // m10 — typed, D5
    answer(
      "y12e1-vr-m10",
      "A vector v = (a, 24) has magnitude 26. Find the positive value of a.",
      "",
      "10",
      "a² = 26² − 24² = 676 − 576 = 100, so a = 10. This is the 10-24-26 triple (2 × 5-12-13).",
      ["10"]
    ),
  ],
};

export function year12Extension1VectorsRevisionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | undefined {
  if (
    course.slug === "year-12-extension-1" &&
    unit.slug === "vectors" &&
    lesson.slug === "vectors-revision"
  ) {
    return vectorsRevision;
  }
  return undefined;
}
