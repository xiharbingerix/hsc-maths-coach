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

// ── Lesson 1: Area of Circles ─────────────────────────────────────────────────

const areaOfCircles: LessonContent = {
  description:
    "Calculate the area of circles using A = πr², giving exact answers in terms of π and decimal approximations, from radius or diameter in real-world contexts.",
  learningIntention:
    "Calculate the area of a circle using A = πr², including from a given diameter, and express answers exactly or as decimals.",
  successCriteria: [
    "State the formula A = πr² and identify r as the radius.",
    "Halve a given diameter to find the radius before substituting.",
    "Calculate exact area answers in terms of π (e.g. 25π cm²).",
    "Round area to a specified number of decimal places using a calculator.",
    "Apply the area formula in real-world contexts such as pools, pizzas and garden beds.",
  ],
  teaching: {
    paragraphs: [
      "Area measures the amount of flat surface inside a shape. For a circle, every point on the boundary is the same distance from the centre — that distance is the radius $r$. The area formula is $A = \\pi r^2$.",
      "The number $\\pi$ (pi) is the ratio of a circle's circumference to its diameter. It is approximately 3.14159. When a question asks for an exact answer, leave $\\pi$ as a symbol: for example, a circle of radius 5 cm has area $25\\pi$ cm², which is exact. Use a calculator to convert: $25\\pi \\approx 78.54$ cm².",
      "A very common mistake is squaring the diameter instead of the radius. If a question gives a diameter of 10 cm, first halve it: radius $= 10 \\div 2 = 5$ cm. Then substitute $r = 5$ into the formula, not 10.",
      "Real-world contexts often describe a circular object by its diameter (a 30 cm pizza, a 12 m pool). Always identify whether you are given the radius or diameter, convert if necessary, then apply $A = \\pi r^2$.",
      "Units of area are always square units: mm², cm², m². If the radius is in metres, the area is in m².",
    ],
    latexBlocks: [
      "A = \\pi r^2",
      "r = \\frac{\\text{diameter}}{2}",
      "A \\approx 3.14159 \\times r^2 \\quad (\\text{decimal approximation})",
    ],
  },
  workedExamples: [
    {
      title: "Exact area given the radius",
      questionLatex: "\\text{Find the exact area of a circle with radius 7 cm.}",
      steps: [
        { explanation: "Write the formula and substitute r = 7.", latex: "A = \\pi \\times 7^2" },
        { explanation: "Square the radius.", latex: "A = \\pi \\times 49 = 49\\pi" },
      ],
      finalAnswerLatex: "A = 49\\pi \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Area given the diameter",
      questionLatex: "\\text{A circular pool has diameter 8 m. Find its area correct to 2 decimal places.}",
      steps: [
        { explanation: "Halve the diameter to find the radius.", latex: "r = 8 \\div 2 = 4 \\text{ m}" },
        { explanation: "Substitute into A = πr².", latex: "A = \\pi \\times 4^2 = 16\\pi" },
        { explanation: "Evaluate using a calculator.", latex: "A \\approx 50.27 \\text{ m}^2" },
      ],
      finalAnswerLatex: "A \\approx 50.27 \\text{ m}^2",
    } as WorkedExample,
    {
      title: "Finding the radius from a known area",
      questionLatex: "\\text{A circular garden has area }100\\pi\\text{ m}^2.\\text{ Find its radius.}",
      steps: [
        { explanation: "Set up the equation A = πr².", latex: "\\pi r^2 = 100\\pi" },
        { explanation: "Divide both sides by π.", latex: "r^2 = 100" },
        { explanation: "Take the positive square root.", latex: "r = 10 \\text{ m}" },
      ],
      finalAnswerLatex: "r = 10 \\text{ m}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-acs-aoc-g1",
      "Which formula gives the area of a circle with radius $r$?",
      "B",
      [
        "$A = 2\\pi r$",
        "$A = \\pi r^2$",
        "$A = \\pi d^2$",
        "$A = \\pi r^2 \\div 2$",
      ],
      "The area formula is $A = \\pi r^2$ — multiply $\\pi$ by the radius squared. Option A is the circumference; option C incorrectly uses the diameter.",
      "Remember: area = π × radius². The radius must be squared.",
    ),
    answer(
      "y8-acs-aoc-g2",
      "Find the exact area of a circle with radius 6 cm. Express your answer in terms of π.",
      "",
      "36π",
      "A = π × 36 = 36π cm².",
      "Square the radius first, then multiply by π.",
      ["36π cm^2"],
    ),
    answer(
      "y8-acs-aoc-g3",
      "A circular pizza has diameter 30 cm. Find its exact area in terms of π.",
      "",
      "225π",
      "Radius = 30 ÷ 2 = 15 cm. A = π × 225 = 225π cm².",
      "Halve the diameter to find the radius, then apply A = πr².",
      ["225π cm^2"],
    ),
    answer(
      "y8-acs-aoc-g4",
      "Find the area of a circle with radius 10 m, correct to 2 decimal places.",
      "",
      "314.16",
      "A = 100π ≈ 314.16 m².",
      "A = π × 100. Evaluate 100π on a calculator and round to 2 decimal places.",
      ["314.16 m^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-acs-aoc-i1",
      "Find the exact area of a circle with radius 9 cm. Express in terms of π.",
      "",
      "81π",
      "A = π × 81 = 81π cm².",
      "Apply A = πr² with r = 9.",
      ["81π cm^2"],
    ),
    answer(
      "y8-acs-aoc-i2",
      "A circular garden bed has diameter 14 m. Find its exact area in terms of π.",
      "",
      "49π",
      "Radius = 14 ÷ 2 = 7 m. A = π × 49 = 49π m².",
      "Divide the diameter by 2 to get the radius, then square it.",
      ["49π m^2"],
    ),
    answer(
      "y8-acs-aoc-i3",
      "Find the area of a circle with radius 5 cm, correct to 1 decimal place.",
      "",
      "78.5",
      "A = 25π ≈ 78.5 cm².",
      "Calculate 25π on a calculator and round to 1 decimal place.",
      ["78.5 cm^2"],
    ),
    choice(
      "y8-acs-aoc-i4",
      "A circle has diameter 12 cm. Which expression gives its exact area?",
      "C",
      [
        "\\(\\pi \\times 12^2 = 144\\pi\\)",
        "\\(\\pi \\times 12 = 12\\pi\\)",
        "\\(\\pi \\times 6^2 = 36\\pi\\)",
        "\\(2\\pi \\times 6 = 12\\pi\\)",
      ],
      "Radius = 12 ÷ 2 = 6 cm. A = π × 6² = 36π cm². Option A incorrectly uses the diameter in A = πd².",
      "Halve the diameter first. The formula uses the radius, not the diameter.",
    ),
    answer(
      "y8-acs-aoc-i5",
      "A circular pond has area $196\\pi$ m². Find its radius.",
      "",
      "14",
      "r² = 196, so r = 14 m.",
      "Divide both sides of πr² = 196π by π, then take the square root.",
      ["14 m"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the diameter instead of the radius: writing A = π × 10² when the diameter is 10.",
      fix: "Always halve the diameter before substituting. If diameter = 10 cm, use r = 5 cm, so A = π × 5² = 25π cm².",
    },
    {
      mistake: "Forgetting to square the radius: computing A = π × r instead of π × r².",
      fix: "The formula is A = πr². The exponent 2 is essential — area grows with the square of the radius.",
    },
    {
      mistake: "Rounding π too early and losing precision.",
      fix: "Keep the exact answer as a multiple of π (e.g. 36π) unless the question asks you to round. Use a calculator's π button for decimal approximations.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-acs-aoc-m1",
      "Find the exact area of a circle with radius 11 cm. Express in terms of π.",
      "",
      "121π",
      "A = π × 121 = 121π cm².",
      "Apply A = πr².",
      ["121π cm^2"],
    ),
    answer(
      "y8-acs-aoc-m2",
      "A circular swimming pool has diameter 16 m. Find its exact area in terms of π.",
      "",
      "64π",
      "Radius = 8 m. A = π × 64 = 64π m².",
      "Halve the diameter to get r = 8, then apply A = πr².",
      ["64π m^2"],
    ),
    choice(
      "y8-acs-aoc-m3",
      "A circle has radius 4 cm. Which statement correctly gives its area?",
      "A",
      [
        "\\(A = 16\\pi \\approx 50.27\\text{ cm}^2\\)",
        "\\(A = 8\\pi \\approx 25.13\\text{ cm}^2\\)",
        "\\(A = 64\\pi \\approx 201.06\\text{ cm}^2\\)",
        "\\(A = 4\\pi \\approx 12.57\\text{ cm}^2\\)",
      ],
      "A = π × 4² = 16π ≈ 50.27 cm². Options B and D are based on circumference-type errors; option C incorrectly squares 8.",
      "Square the radius: 4² = 16, not 4 × 2 = 8.",
    ),
    answer(
      "y8-acs-aoc-m4",
      "Find the area of a circle with diameter 20 cm, correct to 2 decimal places.",
      "",
      "314.16",
      "Radius = 10 cm. A = 100π ≈ 314.16 cm².",
      "Halve the diameter, square the radius, multiply by π.",
      ["314.16 cm^2"],
    ),
    answer(
      "y8-acs-aoc-m5",
      "A circle has area $64\\pi$ cm². Find its diameter.",
      "",
      "16",
      "r² = 64, so r = 8 cm. Diameter = 2 × 8 = 16 cm.",
      "Find the radius first, then double it for the diameter.",
      ["16 cm"],
    ),
    answer(
      "y8-acs-aoc-m6",
      "Find the exact area of a circle with radius 13 cm. Express in terms of π.",
      "",
      "169π",
      "A = π × 169 = 169π cm².",
      "Square 13, then multiply by π.",
      ["169π cm^2"],
    ),
    answer(
      "y8-acs-aoc-m7",
      "A circular running track has an inner radius of 40 m. Find its inner area in terms of π.",
      "",
      "1600π",
      "A = π × 1600 = 1600π m².",
      "Apply A = πr² with r = 40.",
      ["1600π m^2"],
    ),
    answer(
      "y8-acs-aoc-m8",
      "Two circles have radii 3 cm and 4 cm. Find the combined exact area of both circles in terms of π.",
      "",
      "25π",
      "A = 9π + 16π = 25π cm².",
      "Find each area separately using A = πr², then add.",
      ["25π cm^2"],
    ),
    answer(
      "y8-acs-aoc-m9",
      "A circular tablecloth has diameter 2.4 m. Find its area correct to 2 decimal places.",
      "",
      "4.52",
      "Radius = 1.2 m. A = 1.44π ≈ 4.52 m².",
      "Divide the diameter by 2: r = 1.2 m. Then A = π × 1.44.",
      ["4.52 m^2"],
    ),
    answer(
      "y8-acs-aoc-m10",
      "A square has side 10 cm. A circle of radius 5 cm is drawn inside it, touching all four sides. Find the area between the square and the circle, correct to 2 decimal places.",
      "",
      "21.46",
      "Area of square = 100 cm². Area of circle = 25π ≈ 78.54 cm². Area between = 100 − 78.54 = 21.46 cm².",
      "Subtract the circle area from the square area.",
      ["21.46 cm^2"],
    ),
  ],
};

// ── Lesson 2: Area of Sectors ─────────────────────────────────────────────────

const areaOfSectors: LessonContent = {
  description:
    "Calculate the area of sectors (including semicircles and quarter circles) using A = (θ/360) × πr², find exact and decimal answers, and find an unknown angle or radius given the sector area.",
  learningIntention:
    "Apply the sector area formula A = (θ/360) × πr² for any angle, including special cases, and rearrange to find an unknown angle or radius.",
  successCriteria: [
    "State the sector area formula A = (θ/360) × πr².",
    "Recognise that a semicircle uses θ = 180° and a quarter circle uses θ = 90°.",
    "Calculate exact sector areas in terms of π and decimal approximations.",
    "Find the angle θ given the sector area and radius.",
    "Find the radius given the sector area and angle.",
  ],
  teaching: {
    paragraphs: [
      "A sector is a 'pizza-slice' portion of a circle, bounded by two radii and an arc. The sector angle $\\theta$ (theta) at the centre tells us what fraction of the full circle the sector represents: the fraction is $\\frac{\\theta}{360}$.",
      "Multiplying this fraction by the full circle area $\\pi r^2$ gives the sector area: $A = \\frac{\\theta}{360} \\times \\pi r^2$. A semicircle ($\\theta = 180°$) has area $\\frac{1}{2}\\pi r^2$. A quarter circle ($\\theta = 90°$) has area $\\frac{1}{4}\\pi r^2$.",
      "A key misconception is confusing the sector area formula with the arc length formula. Arc length uses $\\frac{\\theta}{360} \\times 2\\pi r$ — it involves the circumference $2\\pi r$, not the area $\\pi r^2$. Sector area involves $\\pi r^2$.",
      "To find an unknown angle, substitute the known area and radius into the formula, then solve for $\\theta$. To find an unknown radius, substitute the area and angle, then solve for $r^2$ and take the square root.",
      "Always state the unit as a square unit (cm², m²) for area. A sector's area is part of the circle's area — it is never larger than $\\pi r^2$.",
    ],
    latexBlocks: [
      "A_{\\text{sector}} = \\frac{\\theta}{360} \\times \\pi r^2",
      "A_{\\text{semicircle}} = \\frac{1}{2}\\pi r^2",
      "A_{\\text{quarter circle}} = \\frac{1}{4}\\pi r^2",
      "\\theta = \\frac{A \\times 360}{\\pi r^2} \\quad (\\text{finding the angle})",
    ],
  },
  workedExamples: [
    {
      title: "Sector area given radius and angle",
      questionLatex: "\\text{Find the exact area of a sector with radius 6 cm and angle }120°.",
      steps: [
        { explanation: "Write the formula and substitute θ = 120 and r = 6.", latex: "A = \\frac{120}{360} \\times \\pi \\times 6^2" },
        { explanation: "Simplify the fraction and square the radius.", latex: "A = \\frac{1}{3} \\times \\pi \\times 36 = 12\\pi" },
      ],
      finalAnswerLatex: "A = 12\\pi \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Finding the angle given area and radius",
      questionLatex: "\\text{A sector has radius 9 cm and area }27\\pi\\text{ cm}^2.\\text{ Find the sector angle.}",
      steps: [
        { explanation: "Substitute into the formula.", latex: "\\frac{\\theta}{360} \\times \\pi \\times 81 = 27\\pi" },
        { explanation: "Divide both sides by 81π.", latex: "\\frac{\\theta}{360} = \\frac{27}{81} = \\frac{1}{3}" },
        { explanation: "Multiply both sides by 360.", latex: "\\theta = 120°" },
      ],
      finalAnswerLatex: "\\theta = 120°",
    } as WorkedExample,
    {
      title: "Semicircle area",
      questionLatex: "\\text{Find the exact area of a semicircle with diameter 14 cm.}",
      steps: [
        { explanation: "Halve the diameter: r = 7 cm. A semicircle has θ = 180°.", latex: "A = \\frac{180}{360} \\times \\pi \\times 7^2 = \\frac{1}{2} \\times 49\\pi" },
        { explanation: "Simplify.", latex: "A = \\frac{49\\pi}{2}" },
      ],
      finalAnswerLatex: "A = \\dfrac{49\\pi}{2} \\text{ cm}^2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-acs-sec-g1",
      "Which formula gives the area of a sector with radius $r$ and angle $\\theta$°?",
      "C",
      [
        "$A = \\dfrac{\\theta}{360} \\times 2\\pi r$",
        "$A = \\dfrac{\\theta}{180} \\times \\pi r^2$",
        "$A = \\dfrac{\\theta}{360} \\times \\pi r^2$",
        "$A = \\dfrac{\\theta}{360} \\times \\pi r$",
      ],
      "Sector area = fraction of full circle × full circle area = (θ/360) × πr². Option A is arc length, not area.",
      "A sector is a fraction of a full circle. The full circle area is πr², and the fraction is θ/360.",
    ),
    answer(
      "y8-acs-sec-g2",
      "Find the exact area of a sector with radius 6 cm and angle 120°. Express in terms of π.",
      "",
      "12π",
      "A = (1/3) × π × 36 = 12π cm².",
      "Simplify 120/360 = 1/3, then multiply by πr².",
      ["12π cm^2"],
    ),
    answer(
      "y8-acs-sec-g3",
      "Find the exact area of a quarter circle with radius 8 cm. Express in terms of π.",
      "",
      "16π",
      "A = (1/4) × π × 64 = 16π cm².",
      "A quarter circle uses θ = 90°. Simplify 90/360 = 1/4.",
      ["16π cm^2"],
    ),
    answer(
      "y8-acs-sec-g4",
      "Find the exact area of a semicircle with radius 10 cm. Express in terms of π.",
      "",
      "50π",
      "A = (1/2) × π × 100 = 50π cm².",
      "A semicircle has θ = 180°, so the fraction is 180/360 = 1/2.",
      ["50π cm^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-acs-sec-i1",
      "Find the exact area of a sector with radius 12 cm and angle 90°. Express in terms of π.",
      "",
      "36π",
      "A = (1/4) × π × 144 = 36π cm².",
      "A quarter circle: use the fraction 1/4.",
      ["36π cm^2"],
    ),
    answer(
      "y8-acs-sec-i2",
      "A sector has radius 5 cm and angle 72°. Find its area correct to 2 decimal places.",
      "",
      "15.71",
      "A = (1/5) × π × 25 = 5π ≈ 15.71 cm².",
      "Simplify 72/360 = 1/5, then multiply by π × 25.",
      ["15.71 cm^2"],
    ),
    choice(
      "y8-acs-sec-i3",
      "A sector has radius 4 cm and angle 270°. Which expression gives its exact area?",
      "B",
      [
        "\\(\\frac{1}{4} \\times \\pi \\times 16 = 4\\pi\\)",
        "\\(\\frac{3}{4} \\times \\pi \\times 16 = 12\\pi\\)",
        "\\(\\frac{1}{2} \\times \\pi \\times 16 = 8\\pi\\)",
        "\\(\\pi \\times 16 = 16\\pi\\)",
      ],
      "270/360 = 3/4. A = (3/4) × π × 16 = 12π cm².",
      "Simplify 270/360 to its simplest fraction, then multiply by πr².",
    ),
    answer(
      "y8-acs-sec-i4",
      "A sector has radius 9 cm and area $27\\pi$ cm². Find the sector angle.",
      "",
      "120",
      "θ/360 = 27/81 = 1/3. θ = 120°.",
      "Rearrange: θ/360 = A ÷ (πr²). Substitute and solve.",
      ["120°"],
    ),
    answer(
      "y8-acs-sec-i5",
      "A sector has angle 60° and area $12\\pi$ cm². Find the radius.",
      "",
      "6√2",
      "(1/6) × πr² = 12π. Multiply both sides by 6: πr² = 72π. Divide by π: r² = 72. So r = √72 = 6√2 ≈ 8.49 cm.",
      "Rearrange (1/6) × πr² = 12π → r² = 72 → r = 6√2.",
      ["6\\sqrt{2}", "8.49"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Confusing the sector area formula with the arc length formula: using (θ/360) × 2πr instead of (θ/360) × πr².",
      fix: "Sector area uses the full circle area πr². Arc length uses the circumference 2πr. Area always involves r².",
    },
    {
      mistake: "Using the diameter instead of the radius in the sector formula.",
      fix: "Halve the diameter to find r before substituting into A = (θ/360) × πr².",
    },
    {
      mistake: "For a semicircle, multiplying the full circle area by 2 instead of dividing by 2.",
      fix: "A semicircle is half a circle, so A = (1/2)πr². The fraction 180/360 = 1/2 means you halve the circle area.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-acs-sec-m1",
      "Find the exact area of a sector with radius 10 cm and angle 180°. Express in terms of π.",
      "",
      "50π",
      "A = (1/2) × 100π = 50π cm².",
      "θ = 180° is a semicircle: fraction = 1/2.",
      ["50π cm^2"],
    ),
    answer(
      "y8-acs-sec-m2",
      "Find the exact area of a sector with radius 9 cm and angle 40°. Express in terms of π.",
      "",
      "9π",
      "A = (1/9) × π × 81 = 9π cm².",
      "Simplify 40/360 = 1/9, then multiply by 81π.",
      ["9π cm^2"],
    ),
    choice(
      "y8-acs-sec-m3",
      "A sector has radius 6 cm and angle 240°. Which expression gives its exact area?",
      "D",
      [
        "\\(\\frac{1}{2} \\times \\pi \\times 36 = 18\\pi\\)",
        "\\(\\frac{1}{3} \\times \\pi \\times 36 = 12\\pi\\)",
        "\\(\\frac{2}{3} \\times \\pi \\times 12 = 8\\pi\\)",
        "\\(\\frac{2}{3} \\times \\pi \\times 36 = 24\\pi\\)",
      ],
      "240/360 = 2/3. A = (2/3) × π × 36 = 24π cm².",
      "Simplify 240/360 first, then multiply by πr².",
    ),
    answer(
      "y8-acs-sec-m4",
      "A sector has radius 6 cm and angle 30°. Find its area correct to 2 decimal places.",
      "",
      "9.42",
      "A = (1/12) × π × 36 = 3π ≈ 9.42 cm².",
      "Simplify 30/360 = 1/12, multiply by 36π, then evaluate.",
      ["9.42 cm^2"],
    ),
    answer(
      "y8-acs-sec-m5",
      "A sector has radius 5 cm and area $\\frac{25\\pi}{4}$ cm². Find the sector angle.",
      "",
      "90",
      "θ/360 = (25π/4) ÷ (25π) = 1/4. θ = 90°.",
      "Divide the area by πr² to find θ/360, then multiply by 360.",
      ["90°"],
    ),
    answer(
      "y8-acs-sec-m6",
      "A sector has angle 60° and area $6\\pi$ cm². Find the radius.",
      "",
      "6",
      "(1/6) × πr² = 6π → r² = 36 → r = 6 cm.",
      "Rearrange to isolate r², then take the square root.",
      ["6 cm"],
    ),
    answer(
      "y8-acs-sec-m7",
      "Find the exact area of a sector with radius 15 cm and angle 120°. Express in terms of π.",
      "",
      "75π",
      "A = (1/3) × π × 225 = 75π cm².",
      "120/360 = 1/3. Then multiply by 225π.",
      ["75π cm^2"],
    ),
    answer(
      "y8-acs-sec-m8",
      "Find the area of a sector with radius 7 cm and angle 315°, correct to 2 decimal places.",
      "",
      "134.68",
      "A = (7/8) × π × 49 = (343π/8) ≈ 134.68 cm².",
      "Simplify 315/360 = 7/8, then multiply by 49π.",
      ["134.68 cm^2"],
    ),
    answer(
      "y8-acs-sec-m9",
      "Two sectors both have radius 8 cm. One has angle 60° and the other has angle 90°. Find the combined exact area of both sectors in terms of π.",
      "",
      "40π",
      "The combined angle is 60° + 90° = 150°. Use the combined fraction: 150/360 = 5/12. A = (5/12) × π × 64 = 320π/12 = 80π/3 cm².",
      "Find each sector area using (θ/360) × πr², then add. The combined fraction is (60+90)/360 = 150/360 = 5/12.",
      ["80π/3", "\\frac{80\\pi}{3}", "83.78"],
    ),
    answer(
      "y8-acs-sec-m10",
      "A sprinkler irrigates a sector-shaped region with radius 12 m and angle 150°. Find the irrigated area correct to 2 decimal places.",
      "",
      "188.50",
      "A = (5/12) × π × 144 = 60π ≈ 188.50 m².",
      "150/360 = 5/12. Multiply by 144π, then evaluate.",
      ["188.50 m^2"],
    ),
  ],
};

// ── Lesson 3: Area of Annuli ──────────────────────────────────────────────────

const areaOfAnnuli: LessonContent = {
  description:
    "Calculate the area of an annulus (ring) using A = π(R² − r²) from inner and outer radii, and apply to real-world contexts including circular paths, washers and pipe cross-sections.",
  learningIntention:
    "Find the area of an annulus by subtracting the inner circle area from the outer circle area and applying the factored formula A = π(R² − r²).",
  successCriteria: [
    "Define an annulus as the region between two concentric circles.",
    "Apply A = π(R² − r²) given inner radius r and outer radius R.",
    "Identify R and r correctly from descriptions such as circular paths and pipe cross-sections.",
    "Give exact annulus areas in terms of π and decimal approximations.",
    "Find an unknown radius given the annulus area and the other radius.",
  ],
  teaching: {
    paragraphs: [
      "An annulus (plural: annuli) is the flat ring shape between two concentric circles (circles that share the same centre). Its area equals the area of the outer circle minus the area of the inner circle.",
      "If the outer radius is $R$ and the inner radius is $r$, then: $A = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$. The factored form $\\pi(R^2 - r^2)$ is more efficient because you only multiply by $\\pi$ once.",
      "A common misconception is subtracting the radii first and then squaring: writing $\\pi(R - r)^2$ instead of $\\pi(R^2 - r^2)$. These are not equal. Always square each radius separately before subtracting.",
      "Real-world examples include the cross-section of a pipe (the material between the inner and outer walls), a circular garden path (the ring between the inner lawn and outer edge), and a washer (the metal ring with a hole).",
      "Always check which measurement is R (outer) and which is r (inner). If a problem gives a path width, add the width to the inner radius to find the outer radius.",
    ],
    latexBlocks: [
      "A = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)",
      "\\text{Do NOT write } \\pi(R - r)^2 \\text{ — that is incorrect.}",
    ],
  },
  workedExamples: [
    {
      title: "Basic annulus area",
      questionLatex: "\\text{Find the exact area of an annulus with outer radius 10 cm and inner radius 6 cm.}",
      steps: [
        { explanation: "Apply A = π(R² − r²).", latex: "A = \\pi(10^2 - 6^2)" },
        { explanation: "Square each radius.", latex: "A = \\pi(100 - 36) = 64\\pi" },
      ],
      finalAnswerLatex: "A = 64\\pi \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Circular garden path",
      questionLatex: "\\text{A circular garden has radius 5 m. A path 2 m wide surrounds it. Find the exact area of the path.}",
      steps: [
        { explanation: "The outer radius includes the path: R = 5 + 2 = 7 m.", latex: "R = 7 \\text{ m}, \\quad r = 5 \\text{ m}" },
        { explanation: "Apply the annulus formula.", latex: "A = \\pi(7^2 - 5^2) = \\pi(49 - 25) = 24\\pi" },
      ],
      finalAnswerLatex: "A = 24\\pi \\text{ m}^2",
    } as WorkedExample,
    {
      title: "Finding an unknown inner radius",
      questionLatex: "\\text{An annulus has outer radius 8 cm and area }48\\pi\\text{ cm}^2.\\text{ Find the inner radius.}",
      steps: [
        { explanation: "Set up the equation.", latex: "\\pi(64 - r^2) = 48\\pi" },
        { explanation: "Divide both sides by π.", latex: "64 - r^2 = 48" },
        { explanation: "Solve for r².", latex: "r^2 = 16 \\Rightarrow r = 4 \\text{ cm}" },
      ],
      finalAnswerLatex: "r = 4 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-acs-ann-g1",
      "Which formula gives the area of an annulus with outer radius $R$ and inner radius $r$?",
      "B",
      [
        "$A = \\pi(R - r)^2$",
        "$A = \\pi(R^2 - r^2)$",
        "$A = \\pi R^2 + \\pi r^2$",
        "$A = 2\\pi(R - r)$",
      ],
      "Annulus area = outer circle area − inner circle area = πR² − πr² = π(R² − r²). Option A is the common mistake of subtracting radii before squaring.",
      "Subtract the inner circle's area from the outer circle's area: π(R² − r²).",
    ),
    answer(
      "y8-acs-ann-g2",
      "Find the exact area of an annulus with outer radius 10 cm and inner radius 6 cm. Express in terms of π.",
      "",
      "64π",
      "A = π(100 − 36) = 64π cm².",
      "Square each radius separately, subtract, then multiply by π.",
      ["64π cm^2"],
    ),
    answer(
      "y8-acs-ann-g3",
      "A circular garden has radius 5 m. A path 2 m wide surrounds it. Find the exact area of the path in terms of π.",
      "",
      "24π",
      "Outer radius = 5 + 2 = 7 m. A = π(49 − 25) = 24π m².",
      "Add the path width to the inner radius to find the outer radius.",
      ["24π m^2"],
    ),
    answer(
      "y8-acs-ann-g4",
      "A washer has outer radius 8 mm and inner radius 4 mm. Find its area correct to 2 decimal places.",
      "",
      "150.80",
      "A = π(64 − 16) = 48π ≈ 150.80 mm².",
      "Apply A = π(R² − r²) and use a calculator.",
      ["150.80 mm^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-acs-ann-i1",
      "Find the exact area of an annulus with outer radius 7 cm and inner radius 3 cm. Express in terms of π.",
      "",
      "40π",
      "A = π(49 − 9) = 40π cm².",
      "Square each radius, subtract, multiply by π.",
      ["40π cm^2"],
    ),
    answer(
      "y8-acs-ann-i2",
      "A pipe has an outer diameter of 20 cm and an inner diameter of 14 cm. Find the exact area of the pipe's cross-section in terms of π.",
      "",
      "51π",
      "R = 10 cm, r = 7 cm. A = π(100 − 49) = 51π cm².",
      "Halve each diameter to get the radii, then apply the annulus formula.",
      ["51π cm^2"],
    ),
    choice(
      "y8-acs-ann-i3",
      "An annulus has outer radius 9 cm and inner radius 6 cm. Which expression gives its exact area?",
      "A",
      [
        "\\(\\pi(81 - 36) = 45\\pi\\)",
        "\\(\\pi(9 - 6)^2 = 9\\pi\\)",
        "\\(\\pi(81 + 36) = 117\\pi\\)",
        "\\(\\pi \\times 9^2 = 81\\pi\\)",
      ],
      "A = π(9² − 6²) = π(81 − 36) = 45π cm². Option B is the common error of subtracting radii before squaring.",
      "Square each radius separately before subtracting.",
    ),
    answer(
      "y8-acs-ann-i4",
      "An annulus has outer radius 8 cm and area $48\\pi$ cm². Find the inner radius.",
      "",
      "4",
      "64 − r² = 48. r² = 16. r = 4 cm.",
      "Divide both sides by π, then solve 64 − r² = 48.",
      ["4 cm"],
    ),
    answer(
      "y8-acs-ann-i5",
      "A circular running track is 3 m wide. The inner edge has radius 40 m. Find the area of the track, correct to the nearest whole number.",
      "",
      "783",
      "Outer radius = 43 m. A = π(1849 − 1600) = 249π ≈ 782.54 ≈ 783 m².",
      "Outer radius = 40 + 3 = 43 m. Use A = π(R² − r²).",
      ["783 m^2"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Writing π(R − r)² instead of π(R² − r²): subtracting the radii first, then squaring.",
      fix: "Always square each radius separately before subtracting. The correct formula is π(R² − r²), not π(R − r)².",
    },
    {
      mistake: "Confusing R and r — using the inner radius as the outer radius.",
      fix: "R is always the larger (outer) radius and r is the smaller (inner) radius. If only one is given plus a path width, add the width to the inner radius to find R.",
    },
    {
      mistake: "Adding the two circle areas instead of subtracting: writing πR² + πr² instead of πR² − πr².",
      fix: "An annulus is the region between the circles — subtract the inner area from the outer area.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-acs-ann-m1",
      "Find the exact area of an annulus with outer radius 12 cm and inner radius 9 cm. Express in terms of π.",
      "",
      "63π",
      "A = π(144 − 81) = 63π cm².",
      "Apply A = π(R² − r²).",
      ["63π cm^2"],
    ),
    answer(
      "y8-acs-ann-m2",
      "A circular path 4 m wide surrounds a pond of radius 6 m. Find the exact area of the path in terms of π.",
      "",
      "64π",
      "Outer radius = 6 + 4 = 10 m. A = π(100 − 36) = 64π m².",
      "Add the path width to the inner radius, then apply the annulus formula.",
      ["64π m^2"],
    ),
    choice(
      "y8-acs-ann-m3",
      "An annulus has inner radius 5 cm and outer radius 13 cm. Which is the correct exact area?",
      "C",
      [
        "\\(\\pi(13 - 5)^2 = 64\\pi\\)",
        "\\(\\pi(169 + 25) = 194\\pi\\)",
        "\\(\\pi(169 - 25) = 144\\pi\\)",
        "\\(\\pi(13 - 5) = 8\\pi\\)",
      ],
      "A = π(13² − 5²) = π(169 − 25) = 144π cm². Option A squares the difference instead of squaring each separately.",
      "Square R and r separately first, then subtract inside the brackets.",
    ),
    answer(
      "y8-acs-ann-m4",
      "A steel washer has an outer radius of 15 mm and an inner radius of 9 mm. Find its area correct to 2 decimal places.",
      "",
      "452.39",
      "A = π(225 − 81) = 144π ≈ 452.39 mm².",
      "Apply A = π(R² − r²) with R = 15 and r = 9, then evaluate on a calculator.",
      ["452.39 mm^2"],
    ),
    answer(
      "y8-acs-ann-m5",
      "An annulus has outer radius 10 cm and area $51\\pi$ cm². Find the inner radius.",
      "",
      "7",
      "100 − r² = 51. r² = 49. r = 7 cm.",
      "Divide both sides by π, then solve for r².",
      ["7 cm"],
    ),
    answer(
      "y8-acs-ann-m6",
      "A pipe has outer diameter 30 cm and wall thickness 3 cm. Find the exact cross-sectional area of the pipe wall in terms of π.",
      "",
      "81π",
      "R = 15 cm, r = 15 − 3 = 12 cm. A = π(225 − 144) = 81π cm².",
      "Outer radius = 30 ÷ 2 = 15. Inner radius = 15 − wall thickness = 12.",
      ["81π cm^2"],
    ),
    answer(
      "y8-acs-ann-m7",
      "Find the exact area of an annulus with outer radius 20 m and inner radius 15 m. Express in terms of π.",
      "",
      "175π",
      "A = π(400 − 225) = 175π m².",
      "Apply A = π(R² − r²) with R = 20 and r = 15.",
      ["175π m^2"],
    ),
    answer(
      "y8-acs-ann-m8",
      "Two annuli share the same outer radius of 10 cm. Annulus A has inner radius 4 cm; Annulus B has inner radius 6 cm. How much greater is the area of Annulus A than Annulus B? Give an exact answer in terms of π.",
      "",
      "20π",
      "A_A = π(100 − 16) = 84π. A_B = π(100 − 36) = 64π. Difference = 84π − 64π = 20π cm².",
      "Find each annulus area separately using π(R² − r²), then subtract.",
      ["20π cm^2"],
    ),
    answer(
      "y8-acs-ann-m9",
      "An annulus has area $77\\pi$ cm². The outer radius is 11 cm. Find the inner radius.",
      "",
      "2√11",
      "121 − r² = 77. r² = 44. r = √44 = 2√11 ≈ 6.63 cm.",
      "Rearrange to r² = 121 − 77 = 44, then take the square root.",
      ["√44", "6.63"],
    ),
    answer(
      "y8-acs-ann-m10",
      "A circular road has two kerbs. The inner kerb has radius 30 m and the outer kerb has radius 34 m. Two lanes run side by side, each of equal width. Find the exact area of the inner lane in terms of π.",
      "",
      "124π",
      "Each lane is 2 m wide. Inner lane: inner radius 30 m, outer radius 32 m. A = π(1024 − 900) = 124π m².",
      "Split the road into two equal-width lanes. The inner lane has radii 30 m and 32 m.",
      ["124π m^2"],
    ),
  ],
};

// ── Lesson 4: Composite Areas with Circles ────────────────────────────────────

const compositeAreasWithCircles: LessonContent = {
  description:
    "Calculate areas of composite figures combining circles, sectors and annuli with rectangles, triangles and other polygons, including adding and subtracting regions and unit conversions.",
  learningIntention:
    "Find the area of composite figures involving circular regions by identifying component shapes, calculating each area, and combining them with addition or subtraction.",
  successCriteria: [
    "Identify the component shapes in a composite figure involving circles or sectors.",
    "Decide whether to add or subtract each circular region.",
    "Give exact composite areas in terms of π and decimal approximations.",
    "Perform unit conversions between cm² and m².",
    "Solve multi-step composite area problems in real contexts.",
  ],
  teaching: {
    paragraphs: [
      "Many real objects — courts, windows, signs, gardens — have shapes made up of simpler parts. To find the area of a composite figure, split it into recognisable shapes: rectangles, triangles, circles, semicircles, sectors.",
      "Once you have identified the parts, decide whether each part should be added or subtracted. A circular window cut into a rectangular wall means the window area is subtracted from the wall area. A running track with semicircular ends means the semicircle areas are added to the rectangular strip.",
      "For unit conversions: $1 \\text{ m} = 100 \\text{ cm}$, so $1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2$. To convert cm² to m², divide by 10 000. To convert m² to cm², multiply by 10 000. Check that all measurements are in the same unit before computing.",
      "A common error in composite problems is forgetting to use the radius (not the diameter) when the full diameter of a circle is shown as a labelled width. For example, if a semicircle sits on top of a rectangle and the rectangle width is 8 cm, the semicircle's diameter is 8 cm so its radius is 4 cm.",
      "Show all working clearly: write down each component area, label it, then combine. This avoids sign errors and makes it easy to check.",
    ],
    latexBlocks: [
      "A_{\\text{composite}} = A_{\\text{rect}} + A_{\\text{semicircle}} \\quad (\\text{add when region is included})",
      "A_{\\text{composite}} = A_{\\text{shape}} - A_{\\text{circle}} \\quad (\\text{subtract when region is removed})",
      "1\\text{ m}^2 = 10\\,000\\text{ cm}^2",
    ],
  },
  workedExamples: [
    {
      title: "Rectangle with a semicircle on top",
      questionLatex: "\\text{A shape consists of a 12 cm × 8 cm rectangle with a semicircle of diameter 8 cm placed on top. Find the exact total area.}",
      steps: [
        { explanation: "Rectangle area.", latex: "A_{\\text{rect}} = 12 \\times 8 = 96 \\text{ cm}^2" },
        { explanation: "Semicircle radius = 8 ÷ 2 = 4 cm. Area = (1/2)πr².", latex: "A_{\\text{semi}} = \\tfrac{1}{2} \\times \\pi \\times 4^2 = 8\\pi \\text{ cm}^2" },
        { explanation: "Add both regions.", latex: "A = 96 + 8\\pi \\text{ cm}^2" },
      ],
      finalAnswerLatex: "A = (96 + 8\\pi) \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Rectangle with a circular hole",
      questionLatex: "\\text{A 20 cm × 15 cm rectangular metal plate has a circular hole of radius 4 cm cut from its centre. Find the remaining area correct to 2 decimal places.}",
      steps: [
        { explanation: "Rectangle area.", latex: "A_{\\text{rect}} = 20 \\times 15 = 300 \\text{ cm}^2" },
        { explanation: "Circle area (the hole).", latex: "A_{\\text{circle}} = \\pi \\times 4^2 = 16\\pi \\text{ cm}^2" },
        { explanation: "Subtract the hole.", latex: "A = 300 - 16\\pi \\approx 300 - 50.27 = 249.73 \\text{ cm}^2" },
      ],
      finalAnswerLatex: "A \\approx 249.73 \\text{ cm}^2",
    } as WorkedExample,
    {
      title: "Olympic-style athletics track",
      questionLatex: "\\text{An athletics track has two straight sections each 100 m long and 8 m wide, with semicircular ends of diameter 56 m. Find the total track area in terms of }\\pi.",
      steps: [
        { explanation: "Two rectangular strips.", latex: "A_{\\text{rects}} = 2 \\times (100 \\times 8) = 1600 \\text{ m}^2" },
        { explanation: "The two semicircular ends form one full circle of radius 28 m.", latex: "A_{\\text{circle}} = \\pi \\times 28^2 = 784\\pi \\text{ m}^2" },
        { explanation: "However, only the annular ring (8 m wide) between inner radius 20 m and outer radius 28 m is the track.", latex: "A_{\\text{ends}} = \\pi(28^2 - 20^2) = \\pi(784 - 400) = 384\\pi \\text{ m}^2" },
        { explanation: "Total track area.", latex: "A = 1600 + 384\\pi \\text{ m}^2" },
      ],
      finalAnswerLatex: "A = (1600 + 384\\pi) \\text{ m}^2",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-acs-com-g1",
      "A semicircle sits on top of a rectangle. The rectangle is 10 cm wide. What is the radius of the semicircle?",
      "B",
      ["10 cm", "5 cm", "20 cm", "25 cm"],
      "The diameter of the semicircle equals the rectangle width = 10 cm. Radius = diameter ÷ 2 = 5 cm.",
      "The diameter of the semicircle matches the width it sits on. Halve it to get the radius.",
    ),
    answer(
      "y8-acs-com-g2",
      "A shape consists of a 10 cm × 6 cm rectangle with a semicircle of diameter 6 cm on top. Find the exact total area in terms of π.",
      "",
      "60 + 4.5π",
      "Rectangle: 60 cm². Semicircle: r = 3, area = (1/2)π×9 = 4.5π cm². Total = (60 + 4.5π) cm².",
      "Find each component area separately, then add. The semicircle diameter equals the rectangle width.",
      ["(60 + 4.5π) cm^2", "60 + 9π/2"],
    ),
    answer(
      "y8-acs-com-g3",
      "A 20 cm × 15 cm rectangular metal plate has a circular hole of radius 4 cm cut from its centre. Find the remaining area correct to 2 decimal places.",
      "",
      "249.73",
      "Rectangle: 300 cm². Circle: 16π ≈ 50.27 cm². Remaining = 300 − 50.27 = 249.73 cm².",
      "Subtract the circular hole area from the rectangle area.",
      ["249.73 cm^2"],
    ),
    answer(
      "y8-acs-com-g4",
      "A composite shape is made from a square of side 10 cm with a quarter circle of radius 10 cm removed from one corner. Find the remaining area correct to 2 decimal places.",
      "",
      "21.46",
      "Square: 100 cm². Quarter circle: (1/4)π×100 = 25π ≈ 78.54 cm². Remaining = 100 − 78.54 = 21.46 cm².",
      "Subtract the quarter circle area from the square area.",
      ["21.46 cm^2"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-acs-com-i1",
      "A figure consists of a 16 cm × 10 cm rectangle with a semicircle of diameter 10 cm on each short end. Find the exact total area in terms of π.",
      "",
      "160 + 25π",
      "Rectangle: 160 cm². Two semicircles of radius 5 cm form one full circle: π×25 = 25π. Total = (160 + 25π) cm².",
      "The two semicircles combine to form one full circle.",
      ["(160 + 25π) cm^2"],
    ),
    answer(
      "y8-acs-com-i2",
      "A triangle has base 12 cm and perpendicular height 8 cm. A semicircle of diameter 12 cm is attached to the base. Find the exact total area in terms of π.",
      "",
      "48 + 18π",
      "Triangle: (1/2) × 12 × 8 = 48 cm². Semicircle: r = 6, (1/2)π×36 = 18π. Total = (48 + 18π) cm².",
      "Find each area separately. The semicircle radius is half the base length.",
      ["(48 + 18π) cm^2"],
    ),
    choice(
      "y8-acs-com-i3",
      "A 30 cm × 20 cm banner has two semicircles of diameter 20 cm cut from each short end. Which expression gives the remaining area?",
      "B",
      [
        "\\(30 \\times 20 - \\pi \\times 20^2\\)",
        "\\(30 \\times 20 - \\pi \\times 10^2\\)",
        "\\(30 \\times 20 - 2 \\times \\tfrac{1}{2}\\pi \\times 20^2\\)",
        "\\(30 \\times 20 + \\pi \\times 10^2\\)",
      ],
      "Two semicircles of diameter 20 cm (radius 10 cm) form one full circle with area π×10² = 100π. Remaining = 30×20 − π×10². Option A incorrectly uses the diameter in A = πd². Option D adds instead of subtracts.",
      "Two semicircles of radius 10 cm together form one complete circle. Use the radius, not the diameter.",
    ),
    answer(
      "y8-acs-com-i4",
      "A large rectangle is 3 m × 2 m. A circular logo of radius 40 cm is painted on it. Find the area of the rectangle NOT covered by the logo. Give your answer in m², correct to 4 decimal places.",
      "",
      "5.4973",
      "Rectangle: 6 m². Radius = 40 cm = 0.4 m. Circle = π × 0.16 ≈ 0.5027 m². Remaining ≈ 6 − 0.5027 = 5.4973 m².",
      "Convert 40 cm to 0.4 m before computing the circle area.",
      ["5.4973 m^2"],
    ),
    answer(
      "y8-acs-com-i5",
      "A composite shape is formed by a rectangle 14 cm × 8 cm with a semicircle of diameter 8 cm on one short end and a triangular notch (base 8 cm, height 4 cm) removed from the other end. Find the exact area in terms of π.",
      "",
      "96 + 8π",
      "Rectangle: 112 cm². Semicircle (r=4): 8π cm². Triangle removed: (1/2)×8×4 = 16 cm². Total = 112 + 8π − 16 = (96 + 8π) cm².",
      "Identify what is added (rectangle and semicircle) and what is removed (triangle notch).",
      ["(96 + 8π) cm^2"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the rectangle width as the radius of a semicircle instead of halving it to find the radius.",
      fix: "The diameter of the semicircle equals the side it sits on. Halve it to find the radius before substituting into the area formula.",
    },
    {
      mistake: "Adding a circular region when it should be subtracted (or vice versa).",
      fix: "Ask: is this region part of the shape (add) or removed from it (subtract)? A hole is subtracted; an attached region is added.",
    },
    {
      mistake: "Mixing units — computing a circle area in cm² and adding it to a rectangle area in m².",
      fix: "Convert all measurements to the same unit before calculating. Remember 1 m² = 10 000 cm². Convert radii given in cm to m (divide by 100) before computing the area in m².",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-acs-com-m1",
      "A rectangular room is 8 m × 5 m. A semicircular bay window of diameter 2 m protrudes from one long wall (adding area to the room). Find the exact total floor area in terms of π.",
      "",
      "40 + π/2",
      "Rectangle: 40 m². Semicircle r = 1 m: (1/2)π×1 = π/2. Total = (40 + π/2) m².",
      "The bay window adds a semicircle of radius 1 m to the room area.",
      ["(40 + π/2) m^2", "40 + 0.5π"],
    ),
    answer(
      "y8-acs-com-m2",
      "A circular target board has radius 30 cm. The bullseye is a circle of radius 5 cm. Find the exact area of the board excluding the bullseye in terms of π.",
      "",
      "875π",
      "Board: 900π. Bullseye: 25π. Remaining = 875π cm².",
      "This is an annulus: A = π(30² − 5²) = π(900 − 25) = 875π.",
      ["875π cm^2"],
    ),
    choice(
      "y8-acs-com-m3",
      "An athletics track has two straight sections each 80 m long and 10 m wide. The ends are semicircles with outer radius 45 m and inner radius 35 m. Which expression gives the total track area in terms of π?",
      "B",
      [
        "\\(2 \\times 80 \\times 10 + \\pi \\times 45^2\\)",
        "\\(2 \\times 80 \\times 10 + \\pi(45^2 - 35^2)\\)",
        "\\(2 \\times 80 \\times 10 - \\pi(45^2 - 35^2)\\)",
        "\\(2 \\times 80 \\times 45 + \\pi \\times 10^2\\)",
      ],
      "Track area = two rectangles + two semicircular annuli. Two semicircular annuli make one full annulus: π(45² − 35²). Total = 1600 + π(2025 − 1225) = 1600 + 800π.",
      "The curved sections are annuli (rings), not full circles. Two semicircular annuli equal one circular annulus.",
    ),
    answer(
      "y8-acs-com-m4",
      "A rectangular window frame is 1.2 m × 0.8 m. A circular porthole of diameter 60 cm is cut into it. Find the remaining frame area in m², correct to 4 decimal places.",
      "",
      "0.6773",
      "Frame: 0.96 m². Porthole radius = 0.3 m. Circle = 0.09π ≈ 0.2827 m². Remaining ≈ 0.96 − 0.2827 = 0.6773 m².",
      "Convert 60 cm to 0.6 m diameter, so r = 0.3 m. Compute in m² throughout.",
      ["0.6773 m^2"],
    ),
    answer(
      "y8-acs-com-m5",
      "A shape consists of a right triangle with legs 12 cm and 16 cm, with a semicircle drawn on the hypotenuse as the diameter. Find the exact total area in terms of π.",
      "",
      "96 + 50π",
      "Hypotenuse = √(144+256) = √400 = 20 cm. r = 10. Triangle: 96 cm². Semicircle: (1/2)π×100 = 50π. Total = (96 + 50π) cm².",
      "Find the hypotenuse using Pythagoras, then r = hypotenuse/2.",
      ["(96 + 50π) cm^2"],
    ),
    answer(
      "y8-acs-com-m6",
      "A garden bed is shaped like a rectangle 6 m × 4 m with a quarter circle of radius 4 m removed from one corner. Find the remaining area correct to 2 decimal places.",
      "",
      "11.43",
      "Rectangle: 24 m². Quarter circle: (1/4)π×16 = 4π ≈ 12.57 m². Remaining ≈ 24 − 12.57 = 11.43 m².",
      "Subtract the quarter circle area from the rectangle area.",
      ["11.43 m^2"],
    ),
    answer(
      "y8-acs-com-m7",
      "A composite figure consists of a 20 cm × 10 cm rectangle with a full circle of radius 5 cm centred on the top edge (half inside, half outside). Find the exact total area of the figure in terms of π.",
      "",
      "200 + 12.5π",
      "Rectangle: 200 cm². Only the upper semicircle (outside) is added: (1/2)π×25 = 12.5π. Total = (200 + 12.5π) cm².",
      "Only half the circle is outside the rectangle (the upper semicircle). Add that half.",
      ["(200 + 12.5π) cm^2", "200 + 25π/2"],
    ),
    answer(
      "y8-acs-com-m8",
      "A floor tile is a square of side 40 cm. Four quarter circles, each of radius 20 cm, are removed from the corners. Find the remaining area correct to 2 decimal places.",
      "",
      "343.36",
      "Square: 1600 cm². Four quarter circles = one full circle of radius 20: π×400 = 400π ≈ 1256.64 cm². Remaining ≈ 1600 − 1256.64 = 343.36 cm².",
      "Four quarter circles combine to form one full circle.",
      ["343.36 cm^2"],
    ),
    answer(
      "y8-acs-com-m9",
      "A running track has two straight sections (each 100 m × 10 m) and two semicircular ends. The outer radius of each curved end is 42 m and the inner radius is 32 m. Find the total track area in terms of π.",
      "",
      "2000 + 740π",
      "Straight sections: 2000 m². Two semicircular annuli form one full annulus: π(1764 − 1024) = 740π. Total = (2000 + 740π) m².",
      "Two semicircular annuli combine to one full annulus: π(R² − r²).",
      ["(2000 + 740π) m^2"],
    ),
    answer(
      "y8-acs-com-m10",
      "A decorative panel is a 50 cm × 30 cm rectangle. A row of 3 semicircles of diameter 10 cm is cut from the top edge, and a single circle of radius 6 cm is cut from the centre. Find the remaining area correct to 2 decimal places. (Use π ≈ 3.14159.)",
      "",
      "1269.09",
      "Rectangle: 1500 cm². Three semicircles (r=5): 3×(1/2)π×25 = 37.5π ≈ 117.81 cm². Circle (r=6): π×36 ≈ 113.10 cm². Remaining ≈ 1500 − 117.81 − 113.10 = 1269.09 cm².",
      "Find the area removed by the semicircles and the circle separately, then subtract both from the rectangle.",
      ["1269.09 cm^2"],
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "area-of-circles":               areaOfCircles,
  "area-of-sectors":               areaOfSectors,
  "area-of-annuli":                areaOfAnnuli,
  "composite-areas-with-circles":  compositeAreasWithCircles,
};

export function year8AreaCirclesSectorsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "area-circles-sectors") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
