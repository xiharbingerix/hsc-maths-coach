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

// ── Lesson 1: Circumference of Circles ───────────────────────────────────────

const circumferenceOfCircles: LessonContent = {
  description:
    "Define the circumference, diameter and radius of a circle, and calculate circumference using C = πd = 2πr with both approximate (π ≈ 3.14) and exact (π) answers.",
  learningIntention:
    "Use the formula C = πd = 2πr to calculate the circumference of circles and apply it to real-world contexts.",
  successCriteria: [
    "Define circumference, diameter and radius and state the relationship d = 2r.",
    "Apply C = πd to find the circumference given the diameter.",
    "Apply C = 2πr to find the circumference given the radius.",
    "Give answers as exact multiples of π or as decimals using π ≈ 3.14.",
  ],
  teaching: {
    paragraphs: [
      "The circumference is the distance all the way around a circle — it is the circle's perimeter. The diameter is the distance straight across the circle through the centre, while the radius is the distance from the centre to the edge. The diameter is always twice the radius: $d = 2r$.",
      "The number $\\pi$ (pi) is the ratio of a circle's circumference to its diameter: $\\pi = C \\div d$. This ratio is the same for every circle, no matter how large or small. Its decimal value is approximately $3.14159\\ldots$ and we use $\\pi \\approx 3.14$ for most calculations.",
      "The two equivalent circumference formulas are $C = \\pi d$ (use when the diameter is given) and $C = 2\\pi r$ (use when the radius is given). Both produce the same answer because $d = 2r$.",
      "A very common mistake is confusing radius and diameter. If you are given a diameter of 10 cm and use it directly in $C = 2\\pi r$, you will double-count and get the wrong answer. Always check which measurement you have been given before choosing which formula to apply.",
      "For an exact answer, leave $\\pi$ in your answer: for example, $C = 6\\pi$ cm. For an approximate decimal answer, substitute $\\pi \\approx 3.14$ and calculate.",
    ],
    latexBlocks: [
      "C = \\pi d = 2\\pi r",
      "d = 2r \\qquad r = \\frac{d}{2}",
      "\\pi \\approx 3.14",
    ],
  },
  workedExamples: [
    {
      title: "Circumference from diameter",
      questionLatex: "\\text{Find the circumference of a circle with diameter }10\\text{ cm. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Write the formula using diameter.", latex: "C = \\pi d" },
        { explanation: "Substitute d = 10 and π ≈ 3.14.", latex: "C = 3.14 \\times 10" },
        { explanation: "Multiply.", latex: "C = 31.4 \\text{ cm}" },
      ],
      finalAnswerLatex: "C = 31.4 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Exact circumference from radius",
      questionLatex: "\\text{Find the exact circumference of a circle with radius }7\\text{ m.}",
      steps: [
        { explanation: "Write the formula using radius.", latex: "C = 2\\pi r" },
        { explanation: "Substitute r = 7.", latex: "C = 2 \\times \\pi \\times 7" },
        { explanation: "Simplify, leaving the answer in terms of π.", latex: "C = 14\\pi \\text{ m}" },
      ],
      finalAnswerLatex: "C = 14\\pi \\text{ m}",
    } as WorkedExample,
    {
      title: "Real-world: wheel circumference",
      questionLatex: "\\text{A bicycle wheel has a diameter of }0.65\\text{ m. How far does it travel in one full turn? Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "One full turn covers exactly one circumference.", latex: "C = \\pi d" },
        { explanation: "Substitute d = 0.65.", latex: "C = 3.14 \\times 0.65" },
        { explanation: "Multiply.", latex: "C \\approx 2.04 \\text{ m}" },
      ],
      finalAnswerLatex: "C \\approx 2.04 \\text{ m}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-cal-coc-g1",
      "A circle has a radius of 5 cm. What is its diameter?",
      "B",
      ["5 cm", "10 cm", "15 cm", "25 cm"],
      "The diameter is twice the radius: $d = 2r = 2 \\times 5 = 10$ cm.",
      "The diameter spans the full width through the centre — it is twice the radius.",
    ),
    answer(
      "y8-cal-coc-g2",
      "Find the circumference of a circle with diameter 8 cm. Use $\\pi \\approx 3.14$.",
      "C = \\pi \\times 8 = \\;?",
      "25.12",
      "$C = \\pi d = 3.14 \\times 8 = 25.12$ cm.",
      "Use $C = \\pi d$ and substitute $d = 8$ with $\\pi \\approx 3.14$.",
      ["25.12 cm"],
    ),
    answer(
      "y8-cal-coc-g3",
      "Find the exact circumference of a circle with radius 9 m.",
      "C = 2\\pi \\times 9 = \\;?",
      "18π",
      "$C = 2\\pi r = 2 \\times \\pi \\times 9 = 18\\pi$ m.",
      "Use $C = 2\\pi r$ and leave $\\pi$ in your answer.",
      ["18pi"],
    ),
    answer(
      "y8-cal-coc-g4",
      "A circular pond has a radius of 3.5 m. Find its circumference using $\\pi \\approx 3.14$.",
      "C = 2\\pi \\times 3.5 = \\;?",
      "21.98",
      "$C = 2\\pi r = 2 \\times 3.14 \\times 3.5 = 6.28 \\times 3.5 = 21.98$ m.",
      "Use $C = 2\\pi r$, substitute $r = 3.5$ and $\\pi \\approx 3.14$.",
      ["21.98 m"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-cal-coc-i1",
      "Find the circumference of a circle with diameter 15 cm. Use $\\pi \\approx 3.14$.",
      "C = \\pi \\times 15 = \\;?",
      "47.1",
      "$C = \\pi d = 3.14 \\times 15 = 47.1$ cm.",
      "Use $C = \\pi d$ with $\\pi \\approx 3.14$.",
      ["47.1 cm"],
    ),
    answer(
      "y8-cal-coc-i2",
      "Find the exact circumference of a circle with radius 11 cm.",
      "C = 2\\pi \\times 11 = \\;?",
      "22π",
      "$C = 2\\pi r = 2 \\times \\pi \\times 11 = 22\\pi$ cm.",
      "Multiply 2 by 11 and keep $\\pi$ in the answer.",
      ["22pi"],
    ),
    answer(
      "y8-cal-coc-i3",
      "A circular pizza has a diameter of 30 cm. What is its circumference? Use $\\pi \\approx 3.14$.",
      "C = \\pi \\times 30 = \\;?",
      "94.2",
      "$C = \\pi d = 3.14 \\times 30 = 94.2$ cm.",
      "Apply $C = \\pi d$ with the given diameter.",
      ["94.2 cm"],
    ),
    choice(
      "y8-cal-coc-i4",
      "Which formula gives the circumference when the radius is known?",
      "C",
      [
        "\\(C = \\pi d\\)",
        "\\(C = \\pi r^2\\)",
        "\\(C = 2\\pi r\\)",
        "\\(C = \\frac{\\pi d}{2}\\)",
      ],
      "$C = 2\\pi r$ is the circumference formula using radius. $C = \\pi r^2$ is the area formula.",
      "Recall that $C = \\pi d$ and $d = 2r$, so substituting gives $C = 2\\pi r$.",
    ),
    answer(
      "y8-cal-coc-i5",
      "A pipe has a radius of 4.5 cm. Find its circumference to 2 decimal places. Use $\\pi \\approx 3.14$.",
      "C = 2\\pi \\times 4.5 = \\;?",
      "28.26",
      "$C = 2\\pi r = 2 \\times 3.14 \\times 4.5 = 6.28 \\times 4.5 = 28.26$ cm.",
      "Multiply $2 \\times 3.14$ first, then multiply by $r = 4.5$.",
      ["28.26 cm"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using the diameter in $C = 2\\pi r$ without halving it first.",
      fix: "When given the diameter, either use $C = \\pi d$ directly, or halve the diameter to get the radius before using $C = 2\\pi r$.",
    },
    {
      mistake: "Confusing circumference with area by using $\\pi r^2$ instead of $2\\pi r$.",
      fix: "$C = 2\\pi r$ gives circumference (distance around). $A = \\pi r^2$ gives area (space inside). Only circumference involves a linear measurement.",
    },
    {
      mistake: "Leaving out $\\pi$ and writing $C = 2r$ or $C = d$.",
      fix: "The ratio circumference-to-diameter equals $\\pi$, not 1. Always include $\\pi$ in the formula: $C = \\pi d$ or $C = 2\\pi r$.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-cal-coc-m1",
      "Find the circumference of a circle with diameter 20 cm. Use $\\pi \\approx 3.14$.",
      "C = \\pi \\times 20 = \\;?",
      "62.8",
      "$C = \\pi d = 3.14 \\times 20 = 62.8$ cm.",
      "Use $C = \\pi d$.",
      ["62.8 cm"],
    ),
    answer(
      "y8-cal-coc-m2",
      "Find the exact circumference of a circle with radius 13 cm.",
      "C = 2\\pi \\times 13 = \\;?",
      "26π",
      "$C = 2\\pi r = 2 \\times 13 \\times \\pi = 26\\pi$ cm.",
      "Multiply and leave $\\pi$ in your answer.",
      ["26pi"],
    ),
    choice(
      "y8-cal-coc-m3",
      "A circle has a circumference of $10\\pi$ cm. What is its radius?",
      "B",
      ["5π cm", "5 cm", "10 cm", "20 cm"],
      "$C = 2\\pi r$, so $10\\pi = 2\\pi r$. Divide both sides by $2\\pi$: $r = 5$ cm.",
      "Substitute into $C = 2\\pi r$ and solve for $r$.",
    ),
    answer(
      "y8-cal-coc-m4",
      "A wheel has a diameter of 50 cm. How far does it travel in 10 complete turns? Use $\\pi \\approx 3.14$.",
      "10 \\times \\pi \\times 50 = \\;?",
      "1570",
      "One turn: $C = \\pi d = 3.14 \\times 50 = 157$ cm. Ten turns: $157 \\times 10 = 1570$ cm.",
      "Find the circumference for one turn, then multiply by 10.",
      ["1570 cm"],
    ),
    answer(
      "y8-cal-coc-m5",
      "Find the circumference of a circle with radius 6.5 cm. Use $\\pi \\approx 3.14$.",
      "C = 2\\pi \\times 6.5 = \\;?",
      "40.82",
      "$C = 2\\pi r = 2 \\times 3.14 \\times 6.5 = 6.28 \\times 6.5 = 40.82$ cm.",
      "Use $C = 2\\pi r$ with $\\pi \\approx 3.14$.",
      ["40.82 cm"],
    ),
    answer(
      "y8-cal-coc-m6",
      "A circular running track has a diameter of 100 m. Find the exact circumference.",
      "C = \\pi \\times 100 = \\;?",
      "100π",
      "$C = \\pi d = \\pi \\times 100 = 100\\pi$ m.",
      "Use $C = \\pi d$ and leave $\\pi$ in the answer.",
      ["100pi"],
    ),
    choice(
      "y8-cal-coc-m7",
      "Which circle has the greatest circumference?",
      "D",
      [
        "Radius = 4 cm",
        "Diameter = 9 cm",
        "Radius = 3.5 cm",
        "Diameter = 11 cm",
      ],
      "Circumferences: A) $8\\pi \\approx 25.1$, B) $9\\pi \\approx 28.3$, C) $7\\pi \\approx 22.0$, D) $11\\pi \\approx 34.6$. D is largest.",
      "Convert all to diameters (or all to radii) and compare.",
    ),
    answer(
      "y8-cal-coc-m8",
      "A circle has a circumference of 43.96 cm. Find its diameter. Use $\\pi \\approx 3.14$.",
      "d = \\frac{43.96}{\\pi} = \\;?",
      "14",
      "$d = C \\div \\pi = 43.96 \\div 3.14 = 14$ cm.",
      "Rearrange $C = \\pi d$ to get $d = C \\div \\pi$.",
      ["14 cm"],
    ),
    answer(
      "y8-cal-coc-m9",
      "Find the circumference of a circle with radius 2.5 m. Give an exact answer.",
      "C = 2\\pi \\times 2.5 = \\;?",
      "5π",
      "$C = 2\\pi r = 2 \\times \\pi \\times 2.5 = 5\\pi$ m.",
      "Multiply $2 \\times 2.5$ and keep $\\pi$.",
      ["5pi"],
    ),
    answer(
      "y8-cal-coc-m10",
      "A circular garden has a radius of 3 m. Fencing costs $12 per metre. Find the total cost of fencing the garden. Use $\\pi \\approx 3.14$.",
      "\\text{Cost} = 2\\pi \\times 3 \\times 12 = \\;?",
      "226.08",
      "$C = 2\\pi r = 2 \\times 3.14 \\times 3 = 18.84$ m. Cost $= 18.84 \\times 12 = 226.08$.",
      "Find the circumference first, then multiply by the cost per metre.",
      ["$226.08", "226.08"],
    ),
  ],
};

// ── Lesson 2: Arc Length ──────────────────────────────────────────────────────

const arcLength: LessonContent = {
  description:
    "Calculate arc length as a fraction of the full circumference using l = (θ/360) × 2πr, where θ is the central angle in degrees.",
  learningIntention:
    "Use the arc length formula l = (θ/360) × 2πr to find arc lengths given a radius and central angle.",
  successCriteria: [
    "Explain why arc length equals a fraction of the circumference.",
    "Apply l = (θ/360) × 2πr to calculate arc length from radius and central angle.",
    "Give arc length answers as exact multiples of π or as decimals using π ≈ 3.14.",
    "Identify the arc corresponding to a given central angle in a diagram.",
  ],
  teaching: {
    paragraphs: [
      "An arc is a portion of the circumference of a circle. It is defined by a central angle $\\theta$ — the angle at the centre of the circle between the two radii that mark the endpoints of the arc. A larger central angle means a longer arc.",
      "Because a full circle has a central angle of $360°$ and a circumference of $2\\pi r$, an arc with central angle $\\theta$ takes up the fraction $\\frac{\\theta}{360}$ of the full circle. Multiplying this fraction by the full circumference gives the arc length: $l = \\frac{\\theta}{360} \\times 2\\pi r$.",
      "For example, a central angle of $90°$ corresponds to a quarter of the circle, so its arc length is $\\frac{90}{360} \\times 2\\pi r = \\frac{1}{4} \\times 2\\pi r = \\frac{\\pi r}{2}$.",
      "A frequent error is using the diameter instead of the radius in the arc length formula. The formula $l = \\frac{\\theta}{360} \\times 2\\pi r$ requires the radius. If you are given a diameter, divide by 2 before substituting.",
    ],
    latexBlocks: [
      "l = \\frac{\\theta}{360} \\times 2\\pi r",
      "\\text{Fraction of circle} = \\frac{\\theta}{360}",
    ],
  },
  workedExamples: [
    {
      title: "Arc length from radius and central angle",
      questionLatex: "\\text{Find the arc length of a sector with radius }8\\text{ cm and central angle }90°.\\text{ Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Write the arc length formula.", latex: "l = \\frac{\\theta}{360} \\times 2\\pi r" },
        { explanation: "Substitute θ = 90, r = 8 and π ≈ 3.14.", latex: "l = \\frac{90}{360} \\times 2 \\times 3.14 \\times 8" },
        { explanation: "Simplify the fraction.", latex: "\\frac{90}{360} = \\frac{1}{4}" },
        { explanation: "Calculate.", latex: "l = \\frac{1}{4} \\times 50.24 = 12.56 \\text{ cm}" },
      ],
      finalAnswerLatex: "l = 12.56 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Exact arc length",
      questionLatex: "\\text{Find the exact arc length for radius }6\\text{ cm and central angle }120°.",
      steps: [
        { explanation: "Write the formula.", latex: "l = \\frac{\\theta}{360} \\times 2\\pi r" },
        { explanation: "Substitute θ = 120 and r = 6.", latex: "l = \\frac{120}{360} \\times 2\\pi \\times 6" },
        { explanation: "Simplify the fraction to \\(\\frac{1}{3}\\).", latex: "l = \\frac{1}{3} \\times 12\\pi" },
        { explanation: "Multiply.", latex: "l = 4\\pi \\text{ cm}" },
      ],
      finalAnswerLatex: "l = 4\\pi \\text{ cm}",
    } as WorkedExample,
    {
      title: "Arc length when diameter is given",
      questionLatex: "\\text{A sector has diameter }10\\text{ cm and central angle }72°.\\text{ Find the arc length. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Convert diameter to radius.", latex: "r = 10 \\div 2 = 5 \\text{ cm}" },
        { explanation: "Apply the arc length formula.", latex: "l = \\frac{72}{360} \\times 2 \\times 3.14 \\times 5" },
        { explanation: "Simplify \\(\\frac{72}{360} = \\frac{1}{5}\\).", latex: "l = \\frac{1}{5} \\times 31.4 = 6.28 \\text{ cm}" },
      ],
      finalAnswerLatex: "l = 6.28 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-cal-arc-g1",
      "A sector has central angle 180°. What fraction of the full circumference is its arc?",
      "B",
      [
        "\\(\\frac{1}{4}\\)",
        "\\(\\frac{1}{2}\\)",
        "\\(\\frac{2}{3}\\)",
        "\\(\\frac{3}{4}\\)",
      ],
      "$\\frac{180}{360} = \\frac{1}{2}$. A central angle of 180° gives a semicircle, which is half the circumference.",
      "Divide the central angle by 360 to find the fraction.",
    ),
    answer(
      "y8-cal-arc-g2",
      "Find the arc length of a sector with radius 10 cm and central angle 90°. Use $\\pi \\approx 3.14$.",
      "l = \\frac{90}{360} \\times 2\\pi \\times 10 = \\;?",
      "15.7",
      "$l = \\frac{90}{360} \\times 2 \\times 3.14 \\times 10 = \\frac{1}{4} \\times 62.8 = 15.7$ cm.",
      "The fraction $\\frac{90}{360} = \\frac{1}{4}$. Multiply by the full circumference $2\\pi r$.",
      ["15.7 cm"],
    ),
    answer(
      "y8-cal-arc-g3",
      "Find the exact arc length of a sector with radius 9 cm and central angle 60°.",
      "l = \\frac{60}{360} \\times 2\\pi \\times 9 = \\;?",
      "3π",
      "$l = \\frac{60}{360} \\times 18\\pi = \\frac{1}{6} \\times 18\\pi = 3\\pi$ cm.",
      "$\\frac{60}{360} = \\frac{1}{6}$. Multiply by $2\\pi r = 18\\pi$.",
      ["3pi"],
    ),
    answer(
      "y8-cal-arc-g4",
      "A sector has radius 5 cm and central angle 144°. Find the arc length using $\\pi \\approx 3.14$.",
      "l = \\frac{144}{360} \\times 2\\pi \\times 5 = \\;?",
      "12.56",
      "$\\frac{144}{360} = \\frac{2}{5}$. $l = \\frac{2}{5} \\times 2 \\times 3.14 \\times 5 = \\frac{2}{5} \\times 31.4 = 12.56$ cm.",
      "Simplify $\\frac{144}{360}$ first, then multiply by $2\\pi r$.",
      ["12.56 cm"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-cal-arc-i1",
      "Find the arc length of a sector with radius 12 cm and central angle 30°. Use $\\pi \\approx 3.14$.",
      "l = \\frac{30}{360} \\times 2\\pi \\times 12 = \\;?",
      "6.28",
      "$l = \\frac{30}{360} \\times 2 \\times 3.14 \\times 12 = \\frac{1}{12} \\times 75.36 = 6.28$ cm.",
      "$\\frac{30}{360} = \\frac{1}{12}$. Multiply by $2\\pi r$.",
      ["6.28 cm"],
    ),
    answer(
      "y8-cal-arc-i2",
      "Find the exact arc length of a sector with radius 15 cm and central angle 120°.",
      "l = \\frac{120}{360} \\times 2\\pi \\times 15 = \\;?",
      "10π",
      "$l = \\frac{1}{3} \\times 30\\pi = 10\\pi$ cm.",
      "$\\frac{120}{360} = \\frac{1}{3}$. Multiply by $2\\pi \\times 15 = 30\\pi$.",
      ["10pi"],
    ),
    answer(
      "y8-cal-arc-i3",
      "A sector has diameter 16 cm and central angle 45°. Find the arc length using $\\pi \\approx 3.14$.",
      "l = \\frac{45}{360} \\times 2\\pi \\times 8 = \\;?",
      "6.28",
      "Radius $= 16 \\div 2 = 8$ cm. $l = \\frac{45}{360} \\times 2 \\times 3.14 \\times 8 = \\frac{1}{8} \\times 50.24 = 6.28$ cm.",
      "Halve the diameter to get the radius first, then apply $l = \\frac{\\theta}{360} \\times 2\\pi r$.",
      ["6.28 cm"],
    ),
    answer(
      "y8-cal-arc-i4",
      "Find the exact arc length of a sector with radius 4 cm and central angle 270°.",
      "l = \\frac{270}{360} \\times 2\\pi \\times 4 = \\;?",
      "6π",
      "$l = \\frac{3}{4} \\times 8\\pi = 6\\pi$ cm.",
      "$\\frac{270}{360} = \\frac{3}{4}$. Multiply by $2\\pi \\times 4 = 8\\pi$.",
      ["6pi"],
    ),
    choice(
      "y8-cal-arc-i5",
      "A sector has radius 5 cm and arc length $5\\pi$ cm. What is the central angle?",
      "C",
      ["90°", "120°", "180°", "270°"],
      "$l = \\frac{\\theta}{360} \\times 2\\pi r$, so $5\\pi = \\frac{\\theta}{360} \\times 10\\pi$. Dividing: $\\frac{\\theta}{360} = \\frac{1}{2}$, giving $\\theta = 180°$.",
      "Set up the arc length equation and solve for $\\theta$.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Using diameter instead of radius in $l = \\frac{\\theta}{360} \\times 2\\pi r$.",
      fix: "The formula requires the radius. If given a diameter, divide by 2 first: $r = d \\div 2$.",
    },
    {
      mistake: "Forgetting to multiply the fraction by $2\\pi r$ — stopping at $\\frac{\\theta}{360}$.",
      fix: "The fraction $\\frac{\\theta}{360}$ must be multiplied by the full circumference $2\\pi r$ to get the arc length.",
    },
    {
      mistake: "Confusing arc length with the area of a sector.",
      fix: "Arc length is a length (one-dimensional), measured in cm or m. Sector area is measured in cm² or m². Always check whether the question asks for arc length or area.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-cal-arc-m1",
      "Find the arc length of a sector with radius 6 cm and central angle 60°. Use $\\pi \\approx 3.14$.",
      "l = \\frac{60}{360} \\times 2\\pi \\times 6 = \\;?",
      "6.28",
      "$l = \\frac{1}{6} \\times 2 \\times 3.14 \\times 6 = \\frac{1}{6} \\times 37.68 = 6.28$ cm.",
      "$\\frac{60}{360} = \\frac{1}{6}$.",
      ["6.28 cm"],
    ),
    answer(
      "y8-cal-arc-m2",
      "Find the exact arc length of a sector with radius 10 cm and central angle 72°.",
      "l = \\frac{72}{360} \\times 2\\pi \\times 10 = \\;?",
      "4π",
      "$l = \\frac{1}{5} \\times 20\\pi = 4\\pi$ cm.",
      "$\\frac{72}{360} = \\frac{1}{5}$.",
      ["4pi"],
    ),
    choice(
      "y8-cal-arc-m3",
      "Which arc length formula is correct?",
      "A",
      [
        "\\(l = \\dfrac{\\theta}{360} \\times 2\\pi r\\)",
        "\\(l = \\dfrac{\\theta}{180} \\times \\pi r\\)",
        "\\(l = \\dfrac{\\theta}{360} \\times \\pi r^2\\)",
        "\\(l = \\dfrac{\\theta}{360} \\times \\pi d^2\\)",
      ],
      "$l = \\frac{\\theta}{360} \\times 2\\pi r$ is the arc length formula. Option C gives sector area, and option B uses the wrong denominator.",
      "The arc is a fraction of the full circumference $2\\pi r$, where the fraction is $\\frac{\\theta}{360}$.",
    ),
    answer(
      "y8-cal-arc-m4",
      "A sector has radius 8 cm and central angle 135°. Find the arc length using $\\pi \\approx 3.14$.",
      "l = \\frac{135}{360} \\times 2\\pi \\times 8 = \\;?",
      "18.84",
      "$\\frac{135}{360} = \\frac{3}{8}$. $l = \\frac{3}{8} \\times 50.24 = 18.84$ cm.",
      "Simplify $\\frac{135}{360}$ first.",
      ["18.84 cm"],
    ),
    answer(
      "y8-cal-arc-m5",
      "Find the exact arc length of a sector with radius 18 cm and central angle 40°.",
      "l = \\frac{40}{360} \\times 2\\pi \\times 18 = \\;?",
      "4π",
      "$l = \\frac{1}{9} \\times 36\\pi = 4\\pi$ cm.",
      "$\\frac{40}{360} = \\frac{1}{9}$, then multiply by $36\\pi$.",
      ["4pi"],
    ),
    answer(
      "y8-cal-arc-m6",
      "A sector has diameter 20 cm and central angle 90°. Find the arc length using $\\pi \\approx 3.14$.",
      "l = \\frac{90}{360} \\times 2\\pi \\times 10 = \\;?",
      "15.7",
      "Radius $= 20 \\div 2 = 10$ cm. $l = \\frac{1}{4} \\times 62.8 = 15.7$ cm.",
      "Halve the diameter to find the radius first.",
      ["15.7 cm"],
    ),
    choice(
      "y8-cal-arc-m7",
      "A sector has radius 12 cm and arc length $8\\pi$ cm. What is the central angle?",
      "B",
      ["90°", "120°", "150°", "180°"],
      "$8\\pi = \\frac{\\theta}{360} \\times 24\\pi$. So $\\frac{\\theta}{360} = \\frac{8}{24} = \\frac{1}{3}$, giving $\\theta = 120°$.",
      "Substitute known values into $l = \\frac{\\theta}{360} \\times 2\\pi r$ and solve for $\\theta$.",
    ),
    answer(
      "y8-cal-arc-m8",
      "Find the arc length of a sector with radius 7 cm and central angle 180°. Use $\\pi \\approx 3.14$.",
      "l = \\frac{180}{360} \\times 2\\pi \\times 7 = \\;?",
      "21.98",
      "$l = \\frac{1}{2} \\times 43.96 = 21.98$ cm. A 180° sector gives a semicircle arc.",
      "A 180° angle means the arc is half the circumference.",
      ["21.98 cm"],
    ),
    answer(
      "y8-cal-arc-m9",
      "A sector has central angle 240° and radius 3 cm. Find the exact arc length.",
      "l = \\frac{240}{360} \\times 2\\pi \\times 3 = \\;?",
      "4π",
      "$l = \\frac{2}{3} \\times 6\\pi = 4\\pi$ cm.",
      "$\\frac{240}{360} = \\frac{2}{3}$. Multiply by $2\\pi \\times 3 = 6\\pi$.",
      ["4pi"],
    ),
    answer(
      "y8-cal-arc-m10",
      "The minute hand of a clock is 10 cm long. How far does its tip travel between 12:00 and 12:20? Use $\\pi \\approx 3.14$.",
      "l = \\frac{120}{360} \\times 2\\pi \\times 10 = \\;?",
      "20.93",
      "20 minutes is $\\frac{20}{60} = \\frac{1}{3}$ of an hour, so the hand sweeps $120°$. $l = \\frac{120}{360} \\times 62.8 = \\frac{1}{3} \\times 62.8 \\approx 20.93$ cm.",
      "Work out what angle 20 minutes represents (out of 60 minutes in 360°), then apply the arc length formula.",
      ["20.93 cm"],
    ),
  ],
};

// ── Lesson 3: Perimeter of Sectors ───────────────────────────────────────────

const perimeterOfSectors: LessonContent = {
  description:
    "Find the perimeter of sectors (including semicircles and quarter circles) by adding the arc length to the two straight radii, and apply this to composite shapes involving arcs.",
  learningIntention:
    "Calculate the perimeter of sectors and composite shapes by combining arc lengths with straight sides.",
  successCriteria: [
    "State that the perimeter of a sector equals arc length plus two radii.",
    "Calculate the perimeter of a semicircle and a quarter circle.",
    "Calculate the perimeter of a general sector given radius and central angle.",
    "Find the perimeter of composite shapes that include one or more arcs.",
  ],
  teaching: {
    paragraphs: [
      "A sector is the 'pie slice' shape bounded by two radii and an arc. Its perimeter is the total distance around the outside: the curved arc plus the two straight radii. This gives the formula: perimeter $= l + 2r$, where $l$ is the arc length and $r$ is the radius.",
      "For a semicircle ($\\theta = 180°$), the arc is half the circumference: $l = \\pi r$. Adding the diameter (the straight edge) gives perimeter $= \\pi r + 2r = r(\\pi + 2)$.",
      "For a quarter circle ($\\theta = 90°$), the arc is $\\frac{1}{4} \\times 2\\pi r = \\frac{\\pi r}{2}$, and adding the two radii gives perimeter $= \\frac{\\pi r}{2} + 2r$.",
      "For composite shapes, identify each piece separately. A shape made of a rectangle and a semicircle on top, for example, has a perimeter that includes the three straight sides of the rectangle and the curved semicircle arc — not the side where they join.",
      "A common error is including the diameter in the perimeter of a semicircle alongside the full circumference, effectively counting the straight edge twice. Always trace around the outside boundary only.",
    ],
    latexBlocks: [
      "P_{\\text{sector}} = l + 2r = \\frac{\\theta}{360} \\times 2\\pi r + 2r",
      "P_{\\text{semicircle}} = \\pi r + 2r = r(\\pi + 2)",
      "P_{\\text{quarter circle}} = \\frac{\\pi r}{2} + 2r",
    ],
  },
  workedExamples: [
    {
      title: "Perimeter of a semicircle",
      questionLatex: "\\text{Find the perimeter of a semicircle with radius }7\\text{ cm. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Arc length of a semicircle is half the circumference.", latex: "l = \\frac{1}{2} \\times 2\\pi r = \\pi r = 3.14 \\times 7 = 21.98 \\text{ cm}" },
        { explanation: "Add the diameter (the straight edge).", latex: "P = l + 2r = 21.98 + 14 = 35.98 \\text{ cm}" },
      ],
      finalAnswerLatex: "P = 35.98 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Perimeter of a general sector",
      questionLatex: "\\text{Find the perimeter of a sector with radius }5\\text{ cm and central angle }72°.\\text{ Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Calculate the arc length.", latex: "l = \\frac{72}{360} \\times 2 \\times 3.14 \\times 5 = \\frac{1}{5} \\times 31.4 = 6.28 \\text{ cm}" },
        { explanation: "Add the two radii to get the perimeter.", latex: "P = l + 2r = 6.28 + 2 \\times 5 = 6.28 + 10 = 16.28 \\text{ cm}" },
      ],
      finalAnswerLatex: "P = 16.28 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Perimeter of a composite shape",
      questionLatex: "\\text{A shape consists of a square with side }4\\text{ cm and a quarter circle on one side. Find the perimeter. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "The quarter circle arc has radius 4 cm.", latex: "l = \\frac{90}{360} \\times 2 \\times 3.14 \\times 4 = \\frac{1}{4} \\times 25.12 = 6.28 \\text{ cm}" },
        { explanation: "The perimeter includes 3 sides of the square and the arc (the fourth side is replaced by the arc).", latex: "P = 3 \\times 4 + 6.28 = 12 + 6.28 = 18.28 \\text{ cm}" },
      ],
      finalAnswerLatex: "P = 18.28 \\text{ cm}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-cal-sec-g1",
      "What is the perimeter of a sector?",
      "D",
      [
        "Arc length only",
        "Two radii only",
        "Arc length plus one radius",
        "Arc length plus two radii",
      ],
      "A sector has two straight sides (radii) and one curved side (arc). The perimeter = arc length + 2r.",
      "Trace around the outside of a pie-slice shape and count each side.",
    ),
    answer(
      "y8-cal-sec-g2",
      "Find the perimeter of a semicircle with radius 5 cm. Use $\\pi \\approx 3.14$.",
      "P = \\pi r + 2r = \\;?",
      "25.7",
      "Arc $= \\pi r = 3.14 \\times 5 = 15.7$ cm. $P = 15.7 + 2 \\times 5 = 15.7 + 10 = 25.7$ cm.",
      "Arc length of a semicircle is $\\pi r$; add the diameter $2r$ for the straight edge.",
      ["25.7 cm"],
    ),
    answer(
      "y8-cal-sec-g3",
      "Find the perimeter of a quarter circle with radius 6 cm. Use $\\pi \\approx 3.14$.",
      "P = \\frac{\\pi \\times 6}{2} + 2 \\times 6 = \\;?",
      "21.42",
      "Arc $= \\frac{1}{4} \\times 2 \\times 3.14 \\times 6 = 9.42$ cm. $P = 9.42 + 12 = 21.42$ cm.",
      "Arc of a quarter circle is $\\frac{1}{4} \\times 2\\pi r$; add the two radii.",
      ["21.42 cm"],
    ),
    answer(
      "y8-cal-sec-g4",
      "A sector has radius 10 cm and central angle 120°. Find its perimeter using $\\pi \\approx 3.14$.",
      "P = \\frac{120}{360} \\times 2\\pi \\times 10 + 2 \\times 10 = \\;?",
      "40.93",
      "Arc $= \\frac{1}{3} \\times 62.8 \\approx 20.93$ cm. $P = 20.93 + 20 = 40.93$ cm.",
      "Find the arc length first using $l = \\frac{\\theta}{360} \\times 2\\pi r$, then add $2r$.",
      ["40.93 cm"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-cal-sec-i1",
      "Find the perimeter of a semicircle with radius 9 cm. Use $\\pi \\approx 3.14$.",
      "P = \\pi \\times 9 + 2 \\times 9 = \\;?",
      "46.26",
      "Arc $= 3.14 \\times 9 = 28.26$ cm. $P = 28.26 + 18 = 46.26$ cm.",
      "Arc of a semicircle is $\\pi r$; straight side is $2r$.",
      ["46.26 cm"],
    ),
    answer(
      "y8-cal-sec-i2",
      "Find the exact perimeter of a quarter circle with radius 8 cm.",
      "P = \\frac{\\pi \\times 8}{2} + 2 \\times 8 = \\;?",
      "4π + 16",
      "Arc $= \\frac{1}{4} \\times 16\\pi = 4\\pi$ cm. $P = 4\\pi + 16$ cm.",
      "Arc of a quarter circle is $\\frac{\\pi r}{2}$; add $2r = 16$.",
      ["4pi + 16"],
    ),
    answer(
      "y8-cal-sec-i3",
      "A sector has radius 12 cm and central angle 90°. Find its perimeter using $\\pi \\approx 3.14$.",
      "P = \\frac{90}{360} \\times 2\\pi \\times 12 + 2 \\times 12 = \\;?",
      "42.84",
      "Arc $= \\frac{1}{4} \\times 75.36 = 18.84$ cm. $P = 18.84 + 24 = 42.84$ cm.",
      "Use $l = \\frac{\\theta}{360} \\times 2\\pi r$ for the arc, then add $2r$.",
      ["42.84 cm"],
    ),
    choice(
      "y8-cal-sec-i4",
      "A semicircle is cut from a rectangle. Which sides form the perimeter of the remaining shape if the semicircle is on the top edge?",
      "B",
      [
        "Three sides of the rectangle plus the full circle",
        "Three sides of the rectangle plus the semicircle arc",
        "All four sides of the rectangle plus the arc",
        "Two sides of the rectangle plus the arc",
      ],
      "The top edge is replaced by the arc. The perimeter consists of the bottom and two vertical sides of the rectangle, plus the semicircular arc.",
      "Trace around the outside boundary of the composite shape, remembering the shared edge is internal.",
    ),
    answer(
      "y8-cal-sec-i5",
      "A sector has radius 15 cm and central angle 240°. Find its perimeter using $\\pi \\approx 3.14$.",
      "P = \\frac{240}{360} \\times 2\\pi \\times 15 + 2 \\times 15 = \\;?",
      "92.8",
      "Arc $= \\frac{2}{3} \\times 94.2 = 62.8$ cm. $P = 62.8 + 30 = 92.8$ cm.",
      "$\\frac{240}{360} = \\frac{2}{3}$. Find the arc, then add $2r = 30$.",
      ["92.8 cm"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Not adding the two radii — giving only the arc length as the perimeter.",
      fix: "A sector's perimeter = arc + 2r. The two straight sides (radii) must be included.",
    },
    {
      mistake: "Adding the diameter as a separate side when finding the perimeter of a semicircle, then also calculating it as part of $2r$.",
      fix: "For a semicircle: perimeter = arc length ($\\pi r$) + diameter ($2r$). Do not add the diameter twice.",
    },
    {
      mistake: "Including the internal shared edge in the perimeter of a composite shape.",
      fix: "Only count sides on the outer boundary. Where a straight edge meets an arc, that straight edge is internal and should not be counted.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-cal-sec-m1",
      "Find the perimeter of a semicircle with radius 4 cm. Use $\\pi \\approx 3.14$.",
      "P = \\pi \\times 4 + 2 \\times 4 = \\;?",
      "20.56",
      "Arc $= 3.14 \\times 4 = 12.56$ cm. $P = 12.56 + 8 = 20.56$ cm.",
      "Arc of a semicircle is $\\pi r$; add $2r$.",
      ["20.56 cm"],
    ),
    answer(
      "y8-cal-sec-m2",
      "Find the exact perimeter of a semicircle with radius 10 cm.",
      "P = \\pi \\times 10 + 2 \\times 10 = \\;?",
      "10π + 20",
      "$P = 10\\pi + 20$ cm.",
      "Arc is $\\pi r = 10\\pi$; add $2r = 20$.",
      ["10pi + 20"],
    ),
    choice(
      "y8-cal-sec-m3",
      "A sector has radius 6 cm and central angle 90°. Which expression gives its perimeter?",
      "C",
      [
        "\\(\\pi \\times 6\\)",
        "\\(\\frac{1}{4} \\times \\pi \\times 6^2\\)",
        "\\(\\frac{\\pi \\times 6}{2} + 12\\)",
        "\\(\\pi \\times 6 + 12\\)",
      ],
      "Arc $= \\frac{90}{360} \\times 2\\pi \\times 6 = \\frac{\\pi \\times 6}{2}$. Adding $2r = 12$ gives $\\frac{\\pi \\times 6}{2} + 12$.",
      "Arc length for 90° is one quarter of $2\\pi r$; then add two radii.",
    ),
    answer(
      "y8-cal-sec-m4",
      "Find the perimeter of a sector with radius 8 cm and central angle 45°. Use $\\pi \\approx 3.14$.",
      "P = \\frac{45}{360} \\times 2\\pi \\times 8 + 16 = \\;?",
      "22.28",
      "Arc $= \\frac{1}{8} \\times 50.24 = 6.28$ cm. $P = 6.28 + 16 = 22.28$ cm.",
      "$\\frac{45}{360} = \\frac{1}{8}$; then add $2r = 16$.",
      ["22.28 cm"],
    ),
    answer(
      "y8-cal-sec-m5",
      "A window is shaped like a rectangle 60 cm wide and 40 cm tall, with a semicircle on top. Find the perimeter of the window. Use $\\pi \\approx 3.14$.",
      "P = 2 \\times 40 + 60 + \\pi \\times 30 = \\;?",
      "234.2",
      "Semicircle radius $= 30$ cm. Arc $= \\pi \\times 30 = 94.2$ cm. Perimeter $= 40 + 40 + 60 + 94.2 = 234.2$ cm.",
      "Include both vertical sides, the bottom, and the semicircle arc. The top of the rectangle is replaced by the arc.",
      ["234.2 cm"],
    ),
    answer(
      "y8-cal-sec-m6",
      "Find the exact perimeter of a quarter circle with radius 14 cm.",
      "P = \\frac{\\pi \\times 14}{2} + 2 \\times 14 = \\;?",
      "7π + 28",
      "Arc $= \\frac{1}{4} \\times 28\\pi = 7\\pi$ cm. $P = 7\\pi + 28$ cm.",
      "Arc of a quarter circle is $\\frac{\\pi r}{2}$; add $2r = 28$.",
      ["7pi + 28"],
    ),
    answer(
      "y8-cal-sec-m7",
      "A sector has radius 9 cm and central angle 160°. Find its perimeter using $\\pi \\approx 3.14$.",
      "P = \\frac{160}{360} \\times 2\\pi \\times 9 + 18 = \\;?",
      "43.13",
      "Arc $= \\frac{4}{9} \\times 56.52 \\approx 25.13$ cm. $P \\approx 25.13 + 18 = 43.13$ cm.",
      "$\\frac{160}{360} = \\frac{4}{9}$. Multiply by $2\\pi r = 56.52$, then add $2r$.",
      ["43.13 cm"],
    ),
    choice(
      "y8-cal-sec-m8",
      "A running track has two straight sections of 100 m and two semicircular ends each with radius 20 m. What is the total perimeter? Use $\\pi \\approx 3.14$.",
      "B",
      ["$251.2$ m", "$325.6$ m", "$325.7$ m", "$400$ m"],
      "Two semicircles make one full circle: $C = 2\\pi \\times 20 = 125.6$ m. Two straights: $200$ m. Total $= 325.6$ m.",
      "Two semicircles of the same radius combine to make one full circle.",
    ),
    answer(
      "y8-cal-sec-m9",
      "A sector has a perimeter of 30 cm and radius 8 cm. Find the arc length.",
      "l = 30 - 2 \\times 8 = \\;?",
      "14",
      "$P = l + 2r$, so $l = P - 2r = 30 - 16 = 14$ cm.",
      "Rearrange $P = l + 2r$ to find $l = P - 2r$.",
      ["14 cm"],
    ),
    answer(
      "y8-cal-sec-m10",
      "A logo consists of a square with side 12 cm and a quarter circle inside one corner (radius 12 cm). The perimeter of the logo is three sides of the square plus the quarter circle arc. Find this perimeter using $\\pi \\approx 3.14$.",
      "P = 3 \\times 12 + \\frac{1}{4} \\times 2\\pi \\times 12 = \\;?",
      "54.84",
      "Three sides $= 36$ cm. Arc $= \\frac{1}{4} \\times 75.36 = 18.84$ cm. $P = 36 + 18.84 = 54.84$ cm.",
      "Calculate the quarter circle arc length, then add the three straight sides.",
      ["54.84 cm"],
    ),
  ],
};

// ── Lesson 4: Circumference Applications ─────────────────────────────────────

const circumferenceApplications: LessonContent = {
  description:
    "Solve multi-step real-world problems involving circumference and arc length, including finding diameter or radius from a given circumference and working backwards from arc length to find angle or radius.",
  learningIntention:
    "Apply circumference and arc length formulas in reverse and in multi-step real-world contexts.",
  successCriteria: [
    "Find the diameter or radius of a circle given its circumference.",
    "Find the central angle given arc length and radius.",
    "Find the radius given arc length and central angle.",
    "Solve multi-step problems that combine circumference or arc length with other measurements.",
  ],
  teaching: {
    paragraphs: [
      "Circumference problems do not always give you the radius or diameter and ask for the circumference. Sometimes the circumference is given and you need to find the radius or diameter. To find the diameter from circumference, rearrange $C = \\pi d$ to get $d = C \\div \\pi$. To find the radius, then halve the diameter.",
      "Similarly, the arc length formula $l = \\frac{\\theta}{360} \\times 2\\pi r$ can be rearranged. If you know the arc length and radius, you can find the central angle: $\\theta = \\frac{l}{2\\pi r} \\times 360$. If you know the arc length and angle, you can find the radius: $r = \\frac{l \\times 360}{\\theta \\times 2\\pi}$.",
      "Multi-step problems often chain two or more calculations. For example, finding the number of rotations a wheel makes to cover a distance requires first finding the circumference, then dividing the distance by the circumference.",
      "A common mistake in reverse problems is dividing by $2\\pi$ when you should divide by $\\pi$ (or vice versa). Always write out the formula first, substitute what you know, and then isolate the unknown algebraically rather than trying to recall a rearranged formula from memory.",
    ],
    latexBlocks: [
      "d = \\frac{C}{\\pi}, \\qquad r = \\frac{C}{2\\pi}",
      "\\theta = \\frac{l}{2\\pi r} \\times 360",
      "r = \\frac{l \\times 360}{\\theta \\times 2\\pi}",
    ],
  },
  workedExamples: [
    {
      title: "Find diameter from circumference",
      questionLatex: "\\text{A circle has circumference }62.8\\text{ cm. Find its diameter. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Start with $C = \\pi d$ and rearrange for $d$.", latex: "d = \\frac{C}{\\pi}" },
        { explanation: "Substitute C = 62.8 and π ≈ 3.14.", latex: "d = \\frac{62.8}{3.14} = 20 \\text{ cm}" },
      ],
      finalAnswerLatex: "d = 20 \\text{ cm}",
    } as WorkedExample,
    {
      title: "Find central angle from arc length",
      questionLatex: "\\text{A sector has radius }6\\text{ cm and arc length }6.28\\text{ cm. Find the central angle. Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Write the arc length formula and substitute known values.", latex: "6.28 = \\frac{\\theta}{360} \\times 2 \\times 3.14 \\times 6" },
        { explanation: "Simplify the right-hand side.", latex: "6.28 = \\frac{\\theta}{360} \\times 37.68" },
        { explanation: "Divide both sides by 37.68.", latex: "\\frac{\\theta}{360} = \\frac{6.28}{37.68} = \\frac{1}{6}" },
        { explanation: "Multiply both sides by 360.", latex: "\\theta = 60°" },
      ],
      finalAnswerLatex: "\\theta = 60°",
    } as WorkedExample,
    {
      title: "Multi-step: number of rotations",
      questionLatex: "\\text{A car tyre has diameter }0.6\\text{ m. How many complete rotations does it make travelling }1\\text{ km? Use }\\pi \\approx 3.14.",
      steps: [
        { explanation: "Find the circumference of the tyre.", latex: "C = \\pi d = 3.14 \\times 0.6 = 1.884 \\text{ m}" },
        { explanation: "Convert 1 km to metres.", latex: "1 \\text{ km} = 1000 \\text{ m}" },
        { explanation: "Divide distance by circumference.", latex: "\\text{Rotations} = \\frac{1000}{1.884} \\approx 530.9" },
        { explanation: "Round down to complete rotations.", latex: "530 \\text{ complete rotations}" },
      ],
      finalAnswerLatex: "530 \\text{ complete rotations}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-cal-app-g1",
      "A circle has circumference $20\\pi$ cm. What is its radius?",
      "C",
      ["5 cm", "20 cm", "10 cm", "40 cm"],
      "$C = 2\\pi r$, so $20\\pi = 2\\pi r$. Divide both sides by $2\\pi$: $r = 10$ cm.",
      "Substitute into $C = 2\\pi r$ and solve for $r$.",
    ),
    answer(
      "y8-cal-app-g2",
      "A circle has circumference 47.1 cm. Find its diameter using $\\pi \\approx 3.14$.",
      "d = \\frac{47.1}{\\pi} = \\;?",
      "15",
      "$d = C \\div \\pi = 47.1 \\div 3.14 = 15$ cm.",
      "Rearrange $C = \\pi d$ to get $d = C \\div \\pi$.",
      ["15 cm"],
    ),
    answer(
      "y8-cal-app-g3",
      "A sector has radius 5 cm and arc length $\\pi$ cm. Find the central angle.",
      "\\theta = \\frac{\\pi}{2\\pi \\times 5} \\times 360 = \\;?",
      "36",
      "$\\theta = \\frac{l}{2\\pi r} \\times 360 = \\frac{\\pi}{10\\pi} \\times 360 = \\frac{1}{10} \\times 360 = 36°$.",
      "Use $\\theta = \\frac{l}{2\\pi r} \\times 360$ and substitute $l = \\pi$ and $r = 5$.",
      ["36°", "36 degrees"],
    ),
    answer(
      "y8-cal-app-g4",
      "A wheel with radius 0.35 m completes 50 full rotations. How far does it travel? Use $\\pi \\approx 3.14$.",
      "50 \\times 2\\pi \\times 0.35 = \\;?",
      "109.9",
      "$C = 2\\pi r = 2 \\times 3.14 \\times 0.35 = 2.198$ m. Distance $= 50 \\times 2.198 = 109.9$ m.",
      "Find the circumference for one rotation, then multiply by 50.",
      ["109.9 m"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-cal-app-i1",
      "A circle has circumference 94.2 cm. Find its radius using $\\pi \\approx 3.14$.",
      "r = \\frac{94.2}{2\\pi} = \\;?",
      "15",
      "$r = C \\div (2\\pi) = 94.2 \\div 6.28 = 15$ cm.",
      "Rearrange $C = 2\\pi r$ to get $r = C \\div (2\\pi)$.",
      ["15 cm"],
    ),
    answer(
      "y8-cal-app-i2",
      "A sector has radius 8 cm and arc length 12.56 cm. Find the central angle using $\\pi \\approx 3.14$.",
      "\\theta = \\frac{12.56}{2\\pi \\times 8} \\times 360 = \\;?",
      "90",
      "$\\theta = \\frac{12.56}{50.24} \\times 360 = 0.25 \\times 360 = 90°$.",
      "Use $\\theta = \\frac{l}{2\\pi r} \\times 360$ with $l = 12.56$ and $r = 8$.",
      ["90°", "90 degrees"],
    ),
    answer(
      "y8-cal-app-i3",
      "An arc has length $6\\pi$ cm and central angle 60°. Find the radius of the circle.",
      "r = \\frac{6\\pi \\times 360}{60 \\times 2\\pi} = \\;?",
      "18",
      "$6\\pi = \\frac{60}{360} \\times 2\\pi r = \\frac{1}{6} \\times 2\\pi r$. So $2\\pi r = 36\\pi$, giving $r = 18$ cm.",
      "Substitute $l = 6\\pi$ and $\\theta = 60$ into the arc length formula and solve for $r$.",
      ["18 cm"],
    ),
    choice(
      "y8-cal-app-i4",
      "A bicycle travels 628 m. The wheel diameter is 1 m. Approximately how many complete rotations did the wheel make? Use $\\pi \\approx 3.14$.",
      "B",
      ["100", "200", "314", "628"],
      "Circumference $= \\pi d = 3.14 \\times 1 = 3.14$ m. Rotations $= 628 \\div 3.14 = 200$.",
      "Find the circumference for one rotation, then divide the total distance by it.",
    ),
    answer(
      "y8-cal-app-i5",
      "A sector has arc length 20 cm and central angle 90°. Find the radius using $\\pi \\approx 3.14$.",
      "r = \\frac{20 \\times 360}{90 \\times 2\\pi} = \\;?",
      "12.74",
      "$20 = \\frac{90}{360} \\times 2\\pi r = \\frac{1}{4} \\times 2\\pi r$. So $2\\pi r = 80$, $r = 80 \\div 6.28 \\approx 12.74$ cm.",
      "Substitute known values into $l = \\frac{\\theta}{360} \\times 2\\pi r$ and solve for $r$.",
      ["12.74 cm"],
    ),
  ],
  commonMistakes: [
    {
      mistake: "Dividing $C$ by $2\\pi$ when trying to find the diameter (giving the radius instead).",
      fix: "Use $d = C \\div \\pi$ to find the diameter, or $r = C \\div (2\\pi)$ to find the radius. Know which one the question asks for.",
    },
    {
      mistake: "Using the wrong formula version when rearranging arc length — for example, dividing by $2\\pi$ instead of $2\\pi r$ when solving for $\\theta$.",
      fix: "Always write out the full arc length formula $l = \\frac{\\theta}{360} \\times 2\\pi r$, substitute what you know, and then solve algebraically step by step.",
    },
    {
      mistake: "Forgetting to convert units (e.g. km to m, cm to m) before dividing distance by circumference.",
      fix: "Check that the distance and circumference are in the same units before dividing. Convert one of them if necessary.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-cal-app-m1",
      "A circle has circumference 31.4 cm. Find its diameter using $\\pi \\approx 3.14$.",
      "d = \\frac{31.4}{\\pi} = \\;?",
      "10",
      "$d = 31.4 \\div 3.14 = 10$ cm.",
      "Use $d = C \\div \\pi$.",
      ["10 cm"],
    ),
    answer(
      "y8-cal-app-m2",
      "A circle has circumference $18\\pi$ cm. Find its radius.",
      "r = \\frac{18\\pi}{2\\pi} = \\;?",
      "9",
      "$C = 2\\pi r$, so $r = 18\\pi \\div 2\\pi = 9$ cm.",
      "Divide the exact circumference by $2\\pi$.",
      ["9 cm"],
    ),
    choice(
      "y8-cal-app-m3",
      "A sector has arc length $3\\pi$ cm and radius 9 cm. What is the central angle?",
      "B",
      ["30°", "60°", "90°", "120°"],
      "$3\\pi = \\frac{\\theta}{360} \\times 18\\pi$, so $\\frac{\\theta}{360} = \\frac{3}{18} = \\frac{1}{6}$, giving $\\theta = 60°$.",
      "Substitute into $l = \\frac{\\theta}{360} \\times 2\\pi r$ and solve for $\\theta$.",
    ),
    answer(
      "y8-cal-app-m4",
      "A running track semicircle has arc length 62.8 m. Find the radius of the semicircle using $\\pi \\approx 3.14$.",
      "r = \\frac{62.8}{\\pi} = \\;?",
      "20",
      "Arc of a semicircle $= \\pi r$. So $r = 62.8 \\div 3.14 = 20$ m.",
      "For a semicircle, arc $= \\pi r$. Rearrange to $r = \\text{arc} \\div \\pi$.",
      ["20 m"],
    ),
    answer(
      "y8-cal-app-m5",
      "A wheel has circumference 1.57 m. How many complete rotations does it make to travel 200 m? Use $\\pi \\approx 3.14$.",
      "\\text{Rotations} = \\frac{200}{1.57} = \\;?",
      "127",
      "$200 \\div 1.57 \\approx 127.4$. So 127 complete rotations.",
      "Divide the total distance by the circumference per rotation, then round down.",
      ["127 rotations"],
    ),
    answer(
      "y8-cal-app-m6",
      "An arc has length 15.7 cm and central angle 90°. Find the radius using $\\pi \\approx 3.14$.",
      "r = \\frac{15.7 \\times 360}{90 \\times 2\\pi} = \\;?",
      "10",
      "$15.7 = \\frac{1}{4} \\times 2\\pi r$, so $2\\pi r = 62.8$ and $r = 62.8 \\div 6.28 = 10$ cm.",
      "Substitute $l = 15.7$ and $\\theta = 90$ into the arc length formula, then solve for $r$.",
      ["10 cm"],
    ),
    answer(
      "y8-cal-app-m7",
      "A satellite dish has circumference 9.42 m. Find its radius using $\\pi \\approx 3.14$.",
      "r = \\frac{9.42}{2\\pi} = \\;?",
      "1.5",
      "$r = 9.42 \\div 6.28 = 1.5$ m.",
      "Use $r = C \\div (2\\pi)$.",
      ["1.5 m"],
    ),
    choice(
      "y8-cal-app-m8",
      "An athlete runs around a circular track with circumference 400 m. After running 300 m, what central angle has she swept from the starting point? Use $\\pi \\approx 3.14$.",
      "C",
      ["180°", "240°", "270°", "300°"],
      "Fraction of track $= 300 \\div 400 = 0.75$. Central angle $= 0.75 \\times 360 = 270°$.",
      "Find what fraction of the full circumference 300 m represents, then multiply by 360°.",
    ),
    answer(
      "y8-cal-app-m9",
      "A clock's minute hand is 12 cm long. How far does its tip travel between 12:00 and 12:45? Use $\\pi \\approx 3.14$.",
      "l = \\frac{270}{360} \\times 2\\pi \\times 12 = \\;?",
      "56.52",
      "45 minutes $= \\frac{3}{4}$ of an hour $= 270°$. $l = \\frac{3}{4} \\times 75.36 = 56.52$ cm.",
      "45 minutes represents $\\frac{3}{4}$ of a full rotation, so the angle swept is 270°.",
      ["56.52 cm"],
    ),
    answer(
      "y8-cal-app-m10",
      "A circular irrigation system sweeps a sector with radius 50 m and arc length 78.5 m. Find the central angle of the sector and the perimeter of the sector. Use $\\pi \\approx 3.14$.",
      "\\theta = \\frac{78.5}{2\\pi \\times 50} \\times 360 = \\;?\\text{ then } P = 78.5 + 100",
      "90",
      "Step 1 — Find $\\theta$: $\\frac{78.5}{314} \\times 360 = 0.25 \\times 360 = 90°$. Step 2 — Perimeter: $78.5 + 2 \\times 50 = 178.5$ m. The central angle is 90° and the perimeter is 178.5 m.",
      "First find the central angle using $\\theta = \\frac{l}{2\\pi r} \\times 360$, then find the perimeter as arc + 2r.",
      ["90°", "90 degrees"],
    ),
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "circumference-of-circles":  circumferenceOfCircles,
  "arc-length":                arcLength,
  "perimeter-of-sectors":      perimeterOfSectors,
  "circumference-applications": circumferenceApplications,
};

export function year8CircumferenceArcLengthLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "circumference-and-arc-length") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
