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

type LessonContent = Omit<
  Pick<
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
  >,
  "successCriteria" | "commonMistakes"
> & {
  successCriteria: string;
  commonMistakes: string[];
};

function fixForMistake(mistake: string): string {
  if (mistake.includes("units")) {
    return "Match the unit to the measure: linear for length, squared for area and cubic for volume.";
  }
  if (mistake.includes("diameter")) {
    return "Halve the diameter before substituting when the formula requires a radius.";
  }
  if (mistake.includes("triangle")) {
    return "Label the triangle base and perpendicular height, then check whether the factor of one half is required.";
  }
  if (mistake.includes("hole") || mistake.includes("cut-out")) {
    return "A removed section must be subtracted from the outer or combined total.";
  }
  if (mistake.includes("Rounding") || mistake.includes("rounding")) {
    return "Keep the calculator value during the working and round only the final answer.";
  }
  if (mistake.includes("surface area") || mistake.includes("outside")) {
    return "List the outside faces or curved surfaces required before choosing the formula.";
  }
  if (mistake.includes("volume")) {
    return "Use cross-sectional area times length and finish with cubic units.";
  }
  return "Label each region or dimension, choose the matching formula and check the calculation before submitting.";
}

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  acceptedAnswers: string[] = [],
): PracticeQuestion {
  const practiceLatex = /-(?:g|i)\d+$/.test(id)
    ? "\\text{Show your method and calculate carefully.}"
    : latex;

  return {
    id,
    prompt,
    latex: practiceLatex,
    answer: value,
    acceptedAnswers,
    explanation,
  };
}

function measure(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  unit: string,
  explanation: string,
): PracticeQuestion {
  return answer(id, prompt, latex, value, explanation, [
    `${value} ${unit}`,
    `${value}${unit}`,
  ]);
}

function choice(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  choices: { label: string; text: string }[],
  explanation: string,
): PracticeQuestion {
  return { id, prompt, latex, answer: value, choices, explanation };
}

const perimeterAreaReview: LessonContent = {
  description:
    "Review perimeter, circumference and area formulas before using them with solids.",
  learningIntention:
    "Distinguish boundary length from enclosed area and choose an appropriate formula and unit.",
  successCriteria:
    "Calculate perimeter, circumference and area for rectangles, triangles, parallelograms and circles.",
  teaching: {
    paragraphs: [
      "Perimeter measures the distance around a flat shape. Area measures the region covered by the shape. A perimeter answer uses linear units such as cm or m, while an area answer uses squared units such as cm^2 or m^2.",
      "For triangles and parallelograms, use the perpendicular height. For circles, check whether the question gives a radius or a diameter before substituting.",
      "These formulas are the building blocks for surface area. Later in this unit, each face of a solid will be treated as a flat shape.",
    ],
    latexBlocks: [
      "P_{\\text{rectangle}}=2l+2w \\qquad A_{\\text{rectangle}}=lw",
      "A_{\\text{triangle}}=\\frac{1}{2}bh \\qquad A_{\\text{parallelogram}}=bh",
      "C=2\\pi r=\\pi d \\qquad A_{\\text{circle}}=\\pi r^2",
    ],
  },
  workedExamples: [
    {
      title: "Rectangle perimeter and area",
      questionLatex: "\\text{Find }P\\text{ and }A\\text{ for a rectangle }9\\text{ cm by }4\\text{ cm}.",
      steps: [
        { explanation: "Add the four side lengths.", latex: "P=2(9)+2(4)=26\\text{ cm}" },
        { explanation: "Multiply length by width.", latex: "A=9\\times4=36\\text{ cm}^2" },
      ],
      finalAnswerLatex: "P=26\\text{ cm},\\quad A=36\\text{ cm}^2",
    },
    {
      title: "Triangle area",
      questionLatex: "\\text{Find the area of a triangle with }b=12\\text{ m and }h=7\\text{ m}.",
      steps: [
        { explanation: "Use the perpendicular height.", latex: "A=\\frac12 bh" },
        { explanation: "Substitute and simplify.", latex: "A=\\frac12(12)(7)=42\\text{ m}^2" },
      ],
      finalAnswerLatex: "42\\text{ m}^2",
    },
    {
      title: "Circle circumference and area",
      questionLatex: "\\text{Find }C\\text{ and }A\\text{ for a circle with }r=5\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Use the radius in each formula.", latex: "C=2\\pi(5)=10\\pi" },
        { explanation: "Square the radius for area.", latex: "A=\\pi(5)^2=25\\pi" },
      ],
      finalAnswerLatex: "C=31.4\\text{ cm},\\quad A=78.5\\text{ cm}^2",
    },
  ],
  guidedPractice: [
    measure("par-g1", "Find the perimeter of a 7 cm by 3 cm rectangle.", "P=2(7)+2(3)", "20", "cm", "Add both pairs of equal sides."),
    measure("par-g2", "Find the area of a triangle with base 10 m and perpendicular height 6 m.", "A=\\frac12(10)(6)", "30", "m^2", "Halve the product of the base and perpendicular height."),
    measure("par-g3", "Find the area of a parallelogram with base 8 cm and perpendicular height 5 cm.", "A=8\\times5", "40", "cm^2", "A parallelogram has area base times perpendicular height."),
    choice("par-g4", "Which unit is appropriate for the area of a classroom floor?", "\\text{Choose the correct unit.}", "B", [{ label: "A", text: "m" }, { label: "B", text: "m^2" }, { label: "C", text: "m^3" }], "Area is measured in squared units."),
  ],
  independentPractice: [
    measure("par-i1", "Find the area of a 12 cm by 5 cm rectangle.", "A=12\\times5", "60", "cm^2", "Multiply length by width."),
    measure("par-i2", "Find the area of a circle with radius 4 cm. Round to 1 decimal place.", "A=\\pi(4)^2", "50.3", "cm^2", "Use area equals pi times radius squared, then round."),
    measure("par-i3", "Find the circumference of a circle with diameter 12 m. Round to 1 decimal place.", "C=\\pi(12)", "37.7", "m", "Use circumference equals pi times diameter."),
    choice("par-i4", "A garden edging question asks for the distance around a garden. Which measure is needed?", "\\text{Choose the measure.}", "A", [{ label: "A", text: "Perimeter" }, { label: "B", text: "Area" }, { label: "C", text: "Volume" }], "Edging follows the boundary, so use perimeter."),
    measure("par-i5", "Find the area of a triangle with base 9 m and perpendicular height 8 m.", "A=\\frac12(9)(8)", "36", "m^2", "Use half base times perpendicular height."),
  ],
  commonMistakes: [
    "Using linear units for area instead of squared units.",
    "Forgetting to halve the product when finding triangle area.",
    "Using the diameter as the radius in a circle formula.",
    "Using a sloping side instead of the perpendicular height.",
  ],
  masteryQuiz: [
    measure("par-m1", "Find the perimeter of a rectangle with length 11 cm and width 6 cm.", "P=2(11)+2(6)", "34", "cm", "Add both pairs of sides."),
    measure("par-m2", "Find the area of a parallelogram with base 13 m and perpendicular height 4 m.", "A=13\\times4", "52", "m^2", "Multiply base by perpendicular height."),
    measure("par-m3", "Find the area of a triangle with base 15 cm and perpendicular height 6 cm.", "A=\\frac12(15)(6)", "45", "cm^2", "Use half base times height."),
    choice("par-m4", "Which formula gives the area of a circle?", "\\text{Choose the formula.}", "C", [{ label: "A", text: "2 pi r" }, { label: "B", text: "pi d" }, { label: "C", text: "pi r^2" }], "Circle area uses the square of the radius."),
    measure("par-m5", "Find the circumference of a circle with radius 7 m. Round to 1 decimal place.", "C=2\\pi(7)", "44.0", "m", "Use circumference equals two pi r and round to one decimal place."),
    measure("par-m6", "Find the area of a 14 cm by 9 cm rectangle.", "A=14\\times9", "126", "cm^2", "Multiply the side lengths."),
    choice("par-m7", "Which unit is appropriate for the circumference of a circular table?", "\\text{Choose the unit.}", "A", [{ label: "A", text: "cm" }, { label: "B", text: "cm^2" }, { label: "C", text: "cm^3" }], "Circumference is a length."),
    measure("par-m8", "A circular garden has radius 7 m. Find the length of edging required. Round to 1 decimal place.", "C=2\\pi(7)", "44.0", "m", "The edging follows the circumference."),
    measure("par-m9", "A rectangle has area 84 cm^2 and length 12 cm. Find its width.", "84=12w", "7", "cm", "Divide the area by the known length."),
    measure("par-m10", "Find the area of a circle with diameter 10 cm. Round to 1 decimal place.", "A=\\pi(5)^2", "78.5", "cm^2", "First halve the diameter to get a radius of 5 cm."),
  ],
};

const compositeArea: LessonContent = {
  description:
    "Calculate composite areas by adding useful parts or subtracting cut-outs.",
  learningIntention:
    "Break a composite shape into familiar shapes and calculate its total area efficiently.",
  successCriteria:
    "Use addition or subtraction to find composite areas in practical contexts.",
  teaching: {
    paragraphs: [
      "A composite shape is made from simpler shapes. Mark a sensible split, calculate each familiar area and combine the results.",
      "For an L-shape, subtraction is often efficient: calculate the enclosing rectangle and subtract the missing corner. For an added triangle, addition is usually clearer.",
      "Write one line for each region. This makes it easier to check that no region has been counted twice or missed.",
    ],
    latexBlocks: [
      "A_{\\text{composite}}=A_1+A_2+\\cdots",
      "A_{\\text{remaining}}=A_{\\text{outer}}-A_{\\text{cut-out}}",
    ],
  },
  workedExamples: [
    {
      title: "L-shaped floor",
      questionLatex: "\\text{An L-shape is a }10\\text{ m by }8\\text{ m rectangle with a }4\\text{ m by }3\\text{ m corner removed. Find its area.}",
      steps: [
        { explanation: "Find the outer rectangle area.", latex: "A_{\\text{outer}}=10\\times8=80" },
        { explanation: "Subtract the missing corner.", latex: "A=80-(4\\times3)=68\\text{ m}^2" },
      ],
      finalAnswerLatex: "68\\text{ m}^2",
    },
    {
      title: "Rectangle with a triangular end",
      questionLatex: "\\text{A shape contains an }8\\text{ cm by }5\\text{ cm rectangle and a triangle with }b=8\\text{ cm},h=3\\text{ cm}.",
      steps: [
        { explanation: "Find the rectangle area.", latex: "A_1=8\\times5=40" },
        { explanation: "Find the triangle area and add.", latex: "A_2=\\frac12(8)(3)=12,\\quad A=40+12=52\\text{ cm}^2" },
      ],
      finalAnswerLatex: "52\\text{ cm}^2",
    },
    {
      title: "Wall with a doorway",
      questionLatex: "\\text{A wall is }12\\text{ m by }3\\text{ m. A doorway is }2\\text{ m by }2.1\\text{ m. Find the area to paint.}",
      steps: [
        { explanation: "Find the full wall area.", latex: "A_{\\text{wall}}=12\\times3=36" },
        { explanation: "Subtract the doorway.", latex: "A=36-(2\\times2.1)=31.8\\text{ m}^2" },
      ],
      finalAnswerLatex: "31.8\\text{ m}^2",
    },
  ],
  guidedPractice: [
    measure("coa-g1", "An L-shape is a 9 m by 7 m rectangle with a 3 m by 2 m corner removed. Find its area.", "A=9(7)-3(2)", "57", "m^2", "Subtract the missing rectangle from the outer rectangle."),
    measure("coa-g2", "A shape contains a 6 cm by 4 cm rectangle and a triangle with base 6 cm and height 2 cm. Find its total area.", "A=6(4)+\\frac12(6)(2)", "30", "cm^2", "Add the rectangle and triangle areas."),
    measure("coa-g3", "An 8 m by 6 m floor has a 2 m by 2 m square section removed. Find the remaining area.", "A=8(6)-2(2)", "44", "m^2", "Subtract the removed square."),
    choice("coa-g4", "Which method is most efficient for a rectangular wall with one rectangular window?", "\\text{Choose the method.}", "B", [{ label: "A", text: "Add the wall and window areas" }, { label: "B", text: "Subtract the window area from the wall area" }, { label: "C", text: "Find the perimeter only" }], "The window is a cut-out, so subtract its area."),
  ],
  independentPractice: [
    measure("coa-i1", "A 15 cm by 8 cm rectangle has a 5 cm by 3 cm corner removed. Find the remaining area.", "A=15(8)-5(3)", "105", "cm^2", "Subtract the cut-out area."),
    measure("coa-i2", "A shape contains a 10 m by 4 m rectangle and a triangle with base 10 m and height 3 m. Find its total area.", "A=10(4)+\\frac12(10)(3)", "55", "m^2", "Add the two regions."),
    measure("coa-i3", "A wall is 9 m by 2.8 m with a 1.5 m by 1.2 m window. Find the area to paint.", "A=9(2.8)-1.5(1.2)", "23.4", "m^2", "Subtract the window from the wall."),
    choice("coa-i4", "An L-shape is described as an outer rectangle with a missing rectangular corner. Which calculation structure is suitable?", "\\text{Choose the structure.}", "C", [{ label: "A", text: "perimeter x height" }, { label: "B", text: "outer area + missing area" }, { label: "C", text: "outer area - missing area" }], "A missing section is subtracted."),
    measure("coa-i5", "A garden contains a 7 m by 5 m rectangle and a 3 m by 2 m rectangle joined without overlap. Find the total area.", "A=7(5)+3(2)", "41", "m^2", "Add the non-overlapping rectangle areas."),
  ],
  commonMistakes: [
    "Adding a cut-out area instead of subtracting it.",
    "Counting an overlapping region twice.",
    "Using a triangle base or height that does not match the described region.",
    "Forgetting squared units in the final answer.",
  ],
  masteryQuiz: [
    measure("coa-m1", "A 12 cm by 9 cm rectangle has a 4 cm by 3 cm corner removed. Find the remaining area.", "A=12(9)-4(3)", "96", "cm^2", "Subtract the corner area."),
    measure("coa-m2", "A shape contains a 9 m by 4 m rectangle and a triangle with base 9 m and height 2 m. Find the total area.", "A=9(4)+\\frac12(9)(2)", "45", "m^2", "Add both regions."),
    measure("coa-m3", "A 10 m by 3 m wall has a 2 m by 1.5 m window. Find the area to paint.", "A=10(3)-2(1.5)", "27", "m^2", "Subtract the window."),
    choice("coa-m4", "Which unit is appropriate for composite floor area?", "\\text{Choose the unit.}", "B", [{ label: "A", text: "m" }, { label: "B", text: "m^2" }, { label: "C", text: "m^3" }], "Floor area uses squared units."),
    measure("coa-m5", "Two non-overlapping rectangles measure 6 cm by 5 cm and 4 cm by 3 cm. Find their combined area.", "A=6(5)+4(3)", "42", "cm^2", "Add both rectangle areas."),
    measure("coa-m6", "A 14 m by 8 m lawn has a 4 m by 2 m garden bed removed. Find the remaining lawn area.", "A=14(8)-4(2)", "104", "m^2", "Subtract the garden bed area."),
    measure("coa-m7", "A shape contains a 5 cm by 6 cm rectangle and a triangle with base 5 cm and height 4 cm. Find its area.", "A=5(6)+\\frac12(5)(4)", "40", "cm^2", "Combine the rectangle and triangle."),
    measure("coa-m8", "An L-shaped floor is enclosed by an 11 m by 9 m rectangle with a 3 m by 4 m corner removed. Find its area.", "A=11(9)-3(4)", "87", "m^2", "Use the enclosing rectangle and remove the missing corner."),
    measure("coa-m9", "A wall is 8 m by 3 m. It has two windows, each 1.5 m by 1 m. Find the area to paint.", "A=8(3)-2(1.5)(1)", "21", "m^2", "Subtract both window areas."),
    measure("coa-m10", "A rectangle is 12 cm by 7 cm. A rectangular cut-out has width 3 cm. The remaining area is 72 cm^2. Find the cut-out height.", "72=12(7)-3h", "4", "cm", "The cut-out area is 84 minus 72, so its height is 12 divided by 3."),
  ],
};

const surfaceAreaPrisms: LessonContent = {
  description:
    "Calculate the total surface area of rectangular and triangular prisms.",
  learningIntention:
    "Treat prism faces as flat shapes and add their areas to find total surface area.",
  successCriteria:
    "Find surface area for closed prisms and adjust for missing faces in open containers.",
  teaching: {
    paragraphs: [
      "Surface area is the total area of the outside faces of a solid. A rectangular prism has three pairs of matching rectangular faces.",
      "A triangular prism has two triangular ends and three rectangular side faces. A net is useful for checking that each outside face has been counted once.",
      "If a container is open, subtract the missing face from the closed-prism surface area. Surface area always uses squared units.",
    ],
    latexBlocks: [
      "SA_{\\text{rectangular prism}}=2(lw+lh+wh)",
      "SA_{\\text{triangular prism}}=2A_{\\triangle}+L(a+b+c)",
    ],
  },
  workedExamples: [
    {
      title: "Closed rectangular prism",
      questionLatex: "\\text{Find the surface area of a }6\\text{ cm by }4\\text{ cm by }3\\text{ cm rectangular prism.}",
      steps: [
        { explanation: "List the three face-area pairs.", latex: "lw=24,\\quad lh=18,\\quad wh=12" },
        { explanation: "Double their sum.", latex: "SA=2(24+18+12)=108\\text{ cm}^2" },
      ],
      finalAnswerLatex: "108\\text{ cm}^2",
    },
    {
      title: "Triangular prism",
      questionLatex: "\\text{A triangular prism has a }3\\text{-}4\\text{-}5\\text{ cm triangular end and length }10\\text{ cm. Find }SA.",
      steps: [
        { explanation: "Find both triangular ends.", latex: "2A_{\\triangle}=2\\left(\\frac12(3)(4)\\right)=12" },
        { explanation: "Add the three rectangular side faces.", latex: "SA=12+10(3+4+5)=132\\text{ cm}^2" },
      ],
      finalAnswerLatex: "132\\text{ cm}^2",
    },
    {
      title: "Open-top box",
      questionLatex: "\\text{A box is }8\\text{ cm by }5\\text{ cm by }3\\text{ cm and has no top. Find its surface area.}",
      steps: [
        { explanation: "Calculate the closed-box surface area.", latex: "SA_{\\text{closed}}=2(8(5)+8(3)+5(3))=158" },
        { explanation: "Remove the missing top face.", latex: "SA=158-8(5)=118\\text{ cm}^2" },
      ],
      finalAnswerLatex: "118\\text{ cm}^2",
    },
  ],
  guidedPractice: [
    measure("sap-g1", "Find the surface area of a closed 5 cm by 4 cm by 2 cm rectangular prism.", "SA=2(5(4)+5(2)+4(2))", "76", "cm^2", "Add the three distinct face areas and double."),
    measure("sap-g2", "A triangular prism has a 3 cm, 4 cm, 5 cm triangular end and length 6 cm. Find its surface area.", "SA=2\\left(\\frac12(3)(4)\\right)+6(3+4+5)", "84", "cm^2", "Add two triangular ends and three side rectangles."),
    measure("sap-g3", "A 7 cm by 4 cm by 3 cm rectangular box has no top. Find its surface area.", "SA=2(7(4)+7(3)+4(3))-7(4)", "94", "cm^2", "Subtract the missing top from the closed-box total."),
    choice("sap-g4", "Which unit is appropriate for the surface area of a box?", "\\text{Choose the unit.}", "B", [{ label: "A", text: "cm" }, { label: "B", text: "cm^2" }, { label: "C", text: "cm^3" }], "Surface area is an area, so it uses squared units."),
  ],
  independentPractice: [
    measure("sap-i1", "Find the surface area of a closed 9 cm by 3 cm by 2 cm rectangular prism.", "SA=2(9(3)+9(2)+3(2))", "102", "cm^2", "Double the sum of the three face areas."),
    measure("sap-i2", "A triangular prism has a 5 cm, 5 cm, 6 cm triangular end. The perpendicular triangle height is 4 cm and the prism length is 8 cm. Find its surface area.", "SA=2\\left(\\frac12(6)(4)\\right)+8(5+5+6)", "152", "cm^2", "Add the two triangle areas and the rectangles around the triangle."),
    measure("sap-i3", "A 10 cm by 6 cm by 4 cm box has no top. Find its surface area.", "SA=2(10(6)+10(4)+6(4))-10(6)", "188", "cm^2", "Subtract the absent top face."),
    choice("sap-i4", "Which expression gives the surface area of a closed rectangular prism?", "\\text{Choose the expression.}", "A", [{ label: "A", text: "2(lw + lh + wh)" }, { label: "B", text: "lwh" }, { label: "C", text: "2l + 2w" }], "A closed rectangular prism has two of each rectangular face."),
    measure("sap-i5", "Two closed boxes are 6 cm by 4 cm by 2 cm and 5 cm by 5 cm by 2 cm. Find the surface area of the first box.", "SA=2(6(4)+6(2)+4(2))", "88", "cm^2", "Use the dimensions of the first box only."),
  ],
  commonMistakes: [
    "Calculating volume when the question asks for the outside area.",
    "Counting only one face from a matching pair.",
    "Forgetting the triangular ends of a triangular prism.",
    "Including a face that is missing from an open container.",
  ],
  masteryQuiz: [
    measure("sap-m1", "Find the surface area of a closed 7 cm by 5 cm by 3 cm rectangular prism.", "SA=2(7(5)+7(3)+5(3))", "142", "cm^2", "Double the sum of the three face areas."),
    measure("sap-m2", "A triangular prism has a 3 cm, 4 cm, 5 cm triangular end and length 9 cm. Find its surface area.", "SA=2\\left(\\frac12(3)(4)\\right)+9(3+4+5)", "120", "cm^2", "Add both ends and all side faces."),
    choice("sap-m3", "How many rectangular faces does a triangular prism have?", "\\text{Choose the number.}", "C", [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }], "Each side of the triangular end forms one rectangle."),
    measure("sap-m4", "Find the surface area of a closed 12 m by 3 m by 2 m rectangular prism.", "SA=2(12(3)+12(2)+3(2))", "132", "m^2", "Use squared metres for the outside area."),
    measure("sap-m5", "A 6 cm by 6 cm by 4 cm box has no top. Find its surface area.", "SA=2(6(6)+6(4)+6(4))-6(6)", "132", "cm^2", "Remove the top square from the closed-box area."),
    choice("sap-m6", "Which statement is correct for an open-top rectangular box?", "\\text{Choose the statement.}", "B", [{ label: "A", text: "Its surface area is the same as a closed box" }, { label: "B", text: "Subtract the area of the missing top" }, { label: "C", text: "Subtract its volume" }], "Only the absent outside face is removed."),
    measure("sap-m7", "A triangular prism has an isosceles triangular end with sides 5 cm, 5 cm and 6 cm, perpendicular height 4 cm, and prism length 10 cm. Find its surface area.", "SA=2\\left(\\frac12(6)(4)\\right)+10(5+5+6)", "184", "cm^2", "Use the triangle height for the ends and all three side lengths for the rectangles."),
    measure("sap-m8", "Find the difference in surface area between closed boxes measuring 5 cm by 4 cm by 3 cm and 6 cm by 4 cm by 3 cm.", "2(6(4)+6(3)+4(3))-2(5(4)+5(3)+4(3))", "14", "cm^2", "Calculate both totals and subtract."),
    measure("sap-m9", "A closed cube has side length 5 cm. Find its surface area.", "SA=6(5^2)", "150", "cm^2", "A cube has six equal square faces."),
    measure("sap-m10", "A closed rectangular prism has length 6 cm, width 4 cm and surface area 148 cm^2. Find its height.", "148=2(6(4)+6h+4h)", "5", "cm", "Solve 148 equals 48 plus 20h."),
  ],
};

const surfaceAreaCylinders: LessonContent = {
  description:
    "Calculate curved and total surface area for cylinders.",
  learningIntention:
    "Use the circle and rectangle in a cylinder net to calculate surface area.",
  successCriteria:
    "Find curved and total surface area, distinguish radius from diameter and round appropriately.",
  teaching: {
    paragraphs: [
      "A cylinder net contains a rectangle wrapped around the curved surface and two circular ends. The rectangle length is the circle circumference and its width is the cylinder height.",
      "Curved surface area counts only the wrapped rectangle. Total surface area for a closed cylinder adds both circular ends.",
      "Check whether the measurement is a radius or diameter before substituting. Round only at the end and state squared units.",
    ],
    latexBlocks: [
      "CSA=2\\pi rh",
      "TSA=2\\pi r^2+2\\pi rh",
    ],
  },
  workedExamples: [
    {
      title: "Curved surface area",
      questionLatex: "\\text{Find the curved surface area of a cylinder with }r=3\\text{ cm},h=8\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Use curved surface area only.", latex: "CSA=2\\pi rh" },
        { explanation: "Substitute and round at the end.", latex: "CSA=2\\pi(3)(8)=48\\pi\\approx150.8\\text{ cm}^2" },
      ],
      finalAnswerLatex: "150.8\\text{ cm}^2",
    },
    {
      title: "Total surface area",
      questionLatex: "\\text{Find the total surface area of a closed cylinder with }r=4\\text{ cm},h=10\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Include two circles and the curved surface.", latex: "TSA=2\\pi r^2+2\\pi rh" },
        { explanation: "Substitute and round.", latex: "TSA=2\\pi(4)^2+2\\pi(4)(10)=112\\pi\\approx351.9\\text{ cm}^2" },
      ],
      finalAnswerLatex: "351.9\\text{ cm}^2",
    },
    {
      title: "Diameter given",
      questionLatex: "\\text{A closed cylinder has diameter }10\\text{ cm and height }7\\text{ cm. Find }TSA\\text{ to 1 decimal place.}",
      steps: [
        { explanation: "Halve the diameter.", latex: "r=10\\div2=5\\text{ cm}" },
        { explanation: "Calculate total surface area.", latex: "TSA=2\\pi(5)^2+2\\pi(5)(7)=120\\pi\\approx377.0\\text{ cm}^2" },
      ],
      finalAnswerLatex: "377.0\\text{ cm}^2",
    },
  ],
  guidedPractice: [
    measure("sac-g1", "Find the curved surface area of a cylinder with radius 2 cm and height 5 cm. Round to 1 decimal place.", "CSA=2\\pi(2)(5)", "62.8", "cm^2", "Use the wrapped rectangle only."),
    measure("sac-g2", "Find the total surface area of a closed cylinder with radius 3 cm and height 4 cm. Round to 1 decimal place.", "TSA=2\\pi(3)^2+2\\pi(3)(4)", "131.9", "cm^2", "Include the curved surface and both ends."),
    measure("sac-g3", "A cylinder has diameter 12 cm. Find its radius.", "r=12\\div2", "6", "cm", "The radius is half the diameter."),
    choice("sac-g4", "Which formula gives the total surface area of a closed cylinder?", "\\text{Choose the formula.}", "C", [{ label: "A", text: "pi r^2 h" }, { label: "B", text: "2 pi r h" }, { label: "C", text: "2 pi r^2 + 2 pi r h" }], "A closed cylinder has two circles and one curved surface."),
  ],
  independentPractice: [
    measure("sac-i1", "Find the curved surface area of a cylinder with radius 4 cm and height 6 cm. Round to 1 decimal place.", "CSA=2\\pi(4)(6)", "150.8", "cm^2", "Calculate two pi r h."),
    measure("sac-i2", "A closed cylinder has diameter 8 cm and height 7 cm. Find its total surface area. Round to 1 decimal place.", "TSA=2\\pi(4)^2+2\\pi(4)(7)", "276.5", "cm^2", "Use radius 4 cm, not diameter 8 cm."),
    choice("sac-i3", "Which formula gives only the curved surface area of a cylinder?", "\\text{Choose the formula.}", "B", [{ label: "A", text: "pi r^2" }, { label: "B", text: "2 pi r h" }, { label: "C", text: "2 pi r^2 + 2 pi r h" }], "The curved surface unwraps to a rectangle with area circumference times height."),
    measure("sac-i4", "Find the total surface area of a closed cylinder with radius 5 m and height 12 m. Round to 1 decimal place.", "TSA=2\\pi(5)^2+2\\pi(5)(12)", "534.1", "m^2", "Include both circular ends."),
    choice("sac-i5", "Which expression gives the surface area of a cylinder with one circular end and no top?", "\\text{Choose the expression.}", "A", [{ label: "A", text: "pi r^2 + 2 pi r h" }, { label: "B", text: "2 pi r^2 + 2 pi r h" }, { label: "C", text: "pi r^2 h" }], "Count one base and the curved surface."),
  ],
  commonMistakes: [
    "Using the diameter as the radius.",
    "Using the volume formula when the question asks for surface area.",
    "Forgetting one or both circular ends when total surface area is required.",
    "Rounding intermediate values too early.",
  ],
  masteryQuiz: [
    measure("sac-m1", "Find the curved surface area of a cylinder with radius 3 cm and height 10 cm. Round to 1 decimal place.", "CSA=2\\pi(3)(10)", "188.5", "cm^2", "Use curved surface area equals two pi r h."),
    measure("sac-m2", "Find the total surface area of a closed cylinder with radius 2 cm and height 8 cm. Round to 1 decimal place.", "TSA=2\\pi(2)^2+2\\pi(2)(8)", "125.7", "cm^2", "Add two circles and the curved surface."),
    measure("sac-m3", "A cylinder has diameter 14 m. Find its radius.", "r=14\\div2", "7", "m", "Halve the diameter."),
    choice("sac-m4", "Which unit is appropriate for cylinder surface area?", "\\text{Choose the unit.}", "B", [{ label: "A", text: "cm" }, { label: "B", text: "cm^2" }, { label: "C", text: "cm^3" }], "Surface area uses squared units."),
    measure("sac-m5", "Find the total surface area of a closed cylinder with radius 1 cm and height 5 cm. Round to 1 decimal place.", "TSA=2\\pi(1)^2+2\\pi(1)(5)", "37.7", "cm^2", "Substitute into the total surface area formula."),
    measure("sac-m6", "A closed cylinder has diameter 10 cm and height 3 cm. Find its total surface area. Round to 1 decimal place.", "TSA=2\\pi(5)^2+2\\pi(5)(3)", "251.3", "cm^2", "Use radius 5 cm."),
    measure("sac-m7", "A cylinder has curved surface area 72 pi cm^2 and radius 4 cm. Find its height.", "72\\pi=2\\pi(4)h", "9", "cm", "Cancel pi and solve 72 equals 8h."),
    choice("sac-m8", "A cylinder has diameter 16 cm. Which radius should be used in a surface area formula?", "\\text{Choose the radius.}", "A", [{ label: "A", text: "8 cm" }, { label: "B", text: "16 cm" }, { label: "C", text: "32 cm" }], "The radius is half the diameter."),
    measure("sac-m9", "A cylinder with radius 3 cm and height 10 cm has one circular base and no top. Find its surface area. Round to 1 decimal place.", "SA=\\pi(3)^2+2\\pi(3)(10)", "216.8", "cm^2", "Count one circular base and the curved surface."),
    choice("sac-m10", "Cylinder A has radius 3 cm and height 8 cm. Cylinder B has radius 4 cm and height 5 cm. Which closed cylinder has the greater total surface area?", "\\text{Compare }2\\pi r^2+2\\pi rh.", "B", [{ label: "A", text: "Cylinder A" }, { label: "B", text: "Cylinder B" }, { label: "C", text: "They are equal" }], "Cylinder A has area 66 pi cm^2 and cylinder B has area 72 pi cm^2."),
  ],
};

const volumePrisms: LessonContent = {
  description:
    "Calculate volumes of rectangular and triangular prisms using cross-sectional area.",
  learningIntention:
    "Use cross-sectional area times length to calculate prism volume and find missing dimensions.",
  successCriteria:
    "Calculate prism volumes, use cubic units and solve simple missing-dimension problems.",
  teaching: {
    paragraphs: [
      "A prism has the same cross-section all the way along its length. Its volume is the cross-sectional area multiplied by the prism length or depth.",
      "For a rectangular prism, this becomes length times width times height. For a triangular prism, calculate the triangular cross-section first.",
      "Volume measures space inside a solid, so use cubic units such as cm^3 or m^3.",
    ],
    latexBlocks: [
      "V=A_{\\text{cross-section}}\\times L",
      "V_{\\text{rectangular prism}}=lwh",
      "V_{\\text{triangular prism}}=\\left(\\frac12 bh\\right)L",
    ],
  },
  workedExamples: [
    {
      title: "Rectangular prism volume",
      questionLatex: "\\text{Find the volume of an }8\\text{ cm by }5\\text{ cm by }3\\text{ cm rectangular prism.}",
      steps: [
        { explanation: "Multiply the three perpendicular dimensions.", latex: "V=lwh" },
        { explanation: "Substitute.", latex: "V=8\\times5\\times3=120\\text{ cm}^3" },
      ],
      finalAnswerLatex: "120\\text{ cm}^3",
    },
    {
      title: "Triangular prism volume",
      questionLatex: "\\text{A triangular prism has }b=6\\text{ cm},h=4\\text{ cm and length }10\\text{ cm. Find its volume.}",
      steps: [
        { explanation: "Calculate the triangular cross-section.", latex: "A_{\\triangle}=\\frac12(6)(4)=12\\text{ cm}^2" },
        { explanation: "Multiply by the prism length.", latex: "V=12\\times10=120\\text{ cm}^3" },
      ],
      finalAnswerLatex: "120\\text{ cm}^3",
    },
    {
      title: "Missing dimension",
      questionLatex: "\\text{A rectangular prism has volume }252\\text{ cm}^3\\text{ and a }7\\text{ cm by }6\\text{ cm cross-section. Find its depth.}",
      steps: [
        { explanation: "Find the cross-sectional area.", latex: "A=7\\times6=42\\text{ cm}^2" },
        { explanation: "Divide volume by cross-sectional area.", latex: "L=252\\div42=6\\text{ cm}" },
      ],
      finalAnswerLatex: "6\\text{ cm}",
    },
  ],
  guidedPractice: [
    measure("vpr-g1", "Find the volume of a 6 cm by 4 cm by 3 cm rectangular prism.", "V=6(4)(3)", "72", "cm^3", "Multiply all three dimensions."),
    measure("vpr-g2", "A triangular prism has triangle base 8 cm, perpendicular height 5 cm and prism length 7 cm. Find its volume.", "V=\\frac12(8)(5)(7)", "140", "cm^3", "Find the triangle area, then multiply by the prism length."),
    measure("vpr-g3", "A rectangular prism has volume 180 cm^3 and a cross-section measuring 6 cm by 5 cm. Find its length.", "180=6(5)L", "6", "cm", "Divide the volume by 30 cm^2."),
    choice("vpr-g4", "Which unit is appropriate for the volume of a storage box?", "\\text{Choose the unit.}", "C", [{ label: "A", text: "cm" }, { label: "B", text: "cm^2" }, { label: "C", text: "cm^3" }], "Volume uses cubic units."),
  ],
  independentPractice: [
    measure("vpr-i1", "Find the volume of a 9 m by 4 m by 2 m rectangular prism.", "V=9(4)(2)", "72", "m^3", "Multiply the three dimensions."),
    measure("vpr-i2", "A triangular prism has triangle base 10 cm, perpendicular height 6 cm and length 8 cm. Find its volume.", "V=\\frac12(10)(6)(8)", "240", "cm^3", "Calculate the triangular cross-section before multiplying by length."),
    measure("vpr-i3", "A prism has a cross-sectional area of 24 cm^2 and length 11 cm. Find its volume.", "V=24(11)", "264", "cm^3", "Use cross-sectional area times length."),
    choice("vpr-i4", "Which formula applies to any prism?", "\\text{Choose the formula.}", "B", [{ label: "A", text: "perimeter x height" }, { label: "B", text: "cross-sectional area x length" }, { label: "C", text: "2 pi r h" }], "A prism repeats the same cross-section along its length."),
    measure("vpr-i5", "A rectangular prism has volume 336 cm^3, width 7 cm and height 4 cm. Find its length.", "336=L(7)(4)", "12", "cm", "Divide volume by width times height."),
  ],
  commonMistakes: [
    "Using perimeter instead of cross-sectional area.",
    "Forgetting to halve the triangle base-height product.",
    "Writing squared units for a volume answer.",
    "Multiplying by a sloping triangle side instead of its perpendicular height.",
  ],
  masteryQuiz: [
    measure("vpr-m1", "Find the volume of a 12 cm by 5 cm by 3 cm rectangular prism.", "V=12(5)(3)", "180", "cm^3", "Multiply all three dimensions."),
    measure("vpr-m2", "A triangular prism has triangle base 7 cm, perpendicular height 4 cm and length 9 cm. Find its volume.", "V=\\frac12(7)(4)(9)", "126", "cm^3", "Use the triangular cross-sectional area."),
    choice("vpr-m3", "Which unit is appropriate for prism volume?", "\\text{Choose the unit.}", "C", [{ label: "A", text: "m" }, { label: "B", text: "m^2" }, { label: "C", text: "m^3" }], "Volume uses cubic units."),
    measure("vpr-m4", "A prism has cross-sectional area 35 cm^2 and length 8 cm. Find its volume.", "V=35(8)", "280", "cm^3", "Multiply cross-sectional area by length."),
    measure("vpr-m5", "A rectangular prism has volume 480 cm^3, length 12 cm and width 5 cm. Find its height.", "480=12(5)h", "8", "cm", "Divide 480 by 60."),
    measure("vpr-m6", "A triangular prism has triangle base 12 m, perpendicular height 5 m and length 4 m. Find its volume.", "V=\\frac12(12)(5)(4)", "120", "m^3", "Calculate the triangle area, then multiply."),
    choice("vpr-m7", "A prism has volume 150 cm^3 and cross-sectional area 25 cm^2. Which calculation finds its length?", "\\text{Choose the calculation.}", "A", [{ label: "A", text: "150 / 25" }, { label: "B", text: "150 x 25" }, { label: "C", text: "150 + 25" }], "Rearrange volume equals area times length."),
    measure("vpr-m8", "A rectangular water tank measures 2 m by 1.5 m by 4 m. Find its volume.", "V=2(1.5)(4)", "12", "m^3", "Multiply the perpendicular dimensions."),
    measure("vpr-m9", "A triangular prism has volume 180 cm^3 and length 9 cm. Find the area of its triangular cross-section.", "180=A(9)", "20", "cm^2", "Divide volume by prism length."),
    measure("vpr-m10", "A triangular channel has volume 360 cm^3. Its triangular cross-section has base 8 cm and perpendicular height 5 cm. Find its length.", "360=\\left(\\frac12(8)(5)\\right)L", "18", "cm", "The cross-sectional area is 20 cm^2, so divide 360 by 20."),
  ],
};

const volumeCylinders: LessonContent = {
  description:
    "Calculate cylinder volumes, capacities and missing dimensions.",
  learningIntention:
    "Use circular cross-sectional area to calculate cylinder volume.",
  successCriteria:
    "Calculate cylinder volume, handle diameter carefully and solve simple capacity and missing-height problems.",
  teaching: {
    paragraphs: [
      "A cylinder is a prism-like solid with a circular cross-section. Multiply the circle area by the cylinder height.",
      "The radius is squared, so using a diameter in place of the radius creates a large error. Halve the diameter first when needed.",
      "Cylinder volume uses cubic units. For capacity contexts, 1000 cm^3 is equal to 1 L.",
    ],
    latexBlocks: [
      "V=\\pi r^2h",
      "1000\\text{ cm}^3=1\\text{ L}",
    ],
  },
  workedExamples: [
    {
      title: "Cylinder volume",
      questionLatex: "\\text{Find the volume of a cylinder with }r=3\\text{ cm},h=10\\text{ cm. Round to 1 decimal place.}",
      steps: [
        { explanation: "Use the circular cross-section.", latex: "V=\\pi r^2h" },
        { explanation: "Substitute and round.", latex: "V=\\pi(3)^2(10)=90\\pi\\approx282.7\\text{ cm}^3" },
      ],
      finalAnswerLatex: "282.7\\text{ cm}^3",
    },
    {
      title: "Diameter given",
      questionLatex: "\\text{A cylinder has diameter }8\\text{ cm and height }6\\text{ cm. Find its volume to 1 decimal place.}",
      steps: [
        { explanation: "Halve the diameter.", latex: "r=8\\div2=4\\text{ cm}" },
        { explanation: "Substitute and round.", latex: "V=\\pi(4)^2(6)=96\\pi\\approx301.6\\text{ cm}^3" },
      ],
      finalAnswerLatex: "301.6\\text{ cm}^3",
    },
    {
      title: "Missing height",
      questionLatex: "\\text{A cylinder has volume }100\\pi\\text{ cm}^3\\text{ and radius }5\\text{ cm. Find its height.}",
      steps: [
        { explanation: "Substitute known values.", latex: "100\\pi=\\pi(5)^2h" },
        { explanation: "Cancel pi and solve.", latex: "100=25h,\\quad h=4\\text{ cm}" },
      ],
      finalAnswerLatex: "4\\text{ cm}",
    },
  ],
  guidedPractice: [
    measure("vcy-g1", "Find the volume of a cylinder with radius 2 cm and height 5 cm. Round to 1 decimal place.", "V=\\pi(2)^2(5)", "62.8", "cm^3", "Use pi r squared h."),
    measure("vcy-g2", "A cylinder has diameter 10 cm and height 4 cm. Find its volume. Round to 1 decimal place.", "V=\\pi(5)^2(4)", "314.2", "cm^3", "Use radius 5 cm."),
    measure("vcy-g3", "A cylinder has volume 144 pi cm^3 and radius 6 cm. Find its height.", "144\\pi=\\pi(6)^2h", "4", "cm", "Cancel pi and divide by 36."),
    choice("vcy-g4", "Which formula gives cylinder volume?", "\\text{Choose the formula.}", "A", [{ label: "A", text: "pi r^2 h" }, { label: "B", text: "2 pi r h" }, { label: "C", text: "2 pi r^2 + 2 pi r h" }], "Multiply circular cross-sectional area by height."),
  ],
  independentPractice: [
    measure("vcy-i1", "Find the volume of a cylinder with radius 4 m and height 3 m. Round to 1 decimal place.", "V=\\pi(4)^2(3)", "150.8", "m^3", "Substitute the radius and height."),
    measure("vcy-i2", "A cylinder has diameter 6 cm and height 8 cm. Find its volume. Round to 1 decimal place.", "V=\\pi(3)^2(8)", "226.2", "cm^3", "First use radius 3 cm."),
    choice("vcy-i3", "Which unit is appropriate for the volume of a cylinder measured in centimetres?", "\\text{Choose the unit.}", "C", [{ label: "A", text: "cm" }, { label: "B", text: "cm^2" }, { label: "C", text: "cm^3" }], "Volume uses cubic units."),
    answer("vcy-i4", "A cylindrical container has capacity 3000 cm^3. Express this capacity in litres.", "3000\\text{ cm}^3=\\frac{3000}{1000}\\text{ L}", "3", "Divide cubic centimetres by 1000.", ["3 L", "3L"]),
    measure("vcy-i5", "A cylinder has volume 245 pi cm^3 and radius 7 cm. Find its height.", "245\\pi=\\pi(7)^2h", "5", "cm", "Cancel pi and divide by 49."),
  ],
  commonMistakes: [
    "Using diameter in the formula without halving it.",
    "Forgetting to square the radius.",
    "Using squared units instead of cubic units.",
    "Rounding before the final calculation.",
  ],
  masteryQuiz: [
    measure("vcy-m1", "Find the volume of a cylinder with radius 5 cm and height 6 cm. Round to 1 decimal place.", "V=\\pi(5)^2(6)", "471.2", "cm^3", "Calculate pi times radius squared times height."),
    measure("vcy-m2", "A cylinder has diameter 12 cm and height 5 cm. Find its volume. Round to 1 decimal place.", "V=\\pi(6)^2(5)", "565.5", "cm^3", "Use radius 6 cm."),
    choice("vcy-m3", "A cylinder has diameter 18 cm. Which radius belongs in the volume formula?", "\\text{Choose the radius.}", "B", [{ label: "A", text: "18 cm" }, { label: "B", text: "9 cm" }, { label: "C", text: "36 cm" }], "Halve the diameter."),
    measure("vcy-m4", "Find the volume of a cylinder with radius 3 m and height 7 m. Round to 1 decimal place.", "V=\\pi(3)^2(7)", "197.9", "m^3", "Use cubic metres."),
    answer("vcy-m5", "A cylindrical container holds 4500 cm^3. Express this capacity in litres.", "4500\\text{ cm}^3=\\frac{4500}{1000}\\text{ L}", "4.5", "Divide by 1000.", ["4.5 L", "4.5L"]),
    measure("vcy-m6", "A cylinder has volume 180 pi cm^3 and radius 6 cm. Find its height.", "180\\pi=\\pi(6)^2h", "5", "cm", "Cancel pi and divide 180 by 36."),
    choice("vcy-m7", "Which change is required before using a diameter of 14 cm in the cylinder volume formula?", "\\text{Choose the change.}", "A", [{ label: "A", text: "Use radius 7 cm" }, { label: "B", text: "Square 14 and use it as the radius" }, { label: "C", text: "Double 14" }], "The formula uses radius."),
    measure("vcy-m8", "A cylindrical tank has diameter 4 m and height 3 m. Find its volume. Round to 1 decimal place.", "V=\\pi(2)^2(3)", "37.7", "m^3", "Use radius 2 m."),
    measure("vcy-m9", "A cylinder has volume 196 pi cm^3 and radius 7 cm. Find its height.", "196\\pi=\\pi(7)^2h", "4", "cm", "Cancel pi and solve 196 equals 49h."),
    choice("vcy-m10", "Cylinder A has radius 2 cm and height 9 cm. Cylinder B has radius 3 cm and height 4 cm. Which has the greater volume?", "\\text{Compare }\\pi(2)^2(9)\\text{ and }\\pi(3)^2(4).", "C", [{ label: "A", text: "Cylinder A" }, { label: "B", text: "Cylinder B" }, { label: "C", text: "They are equal" }], "Both volumes equal 36 pi cm^3."),
  ],
};

const compositeSolids: LessonContent = {
  description:
    "Calculate volumes of solids made by adding or subtracting prisms and cylinders.",
  learningIntention:
    "Model a composite solid with familiar volume formulas and combine the results accurately.",
  successCriteria:
    "Add joined-solid volumes, subtract cut-out volumes and round practical answers appropriately.",
  teaching: {
    paragraphs: [
      "A composite solid can be handled one familiar part at a time. Add volumes when parts are joined without overlap. Subtract volumes when a hole or cut-out has been removed.",
      "Sketch a simple calculation plan in words before substituting, such as rectangular prism plus cylinder or outer prism minus cylindrical hole.",
      "Keep exact pi values until the final step when cylinders are involved. Use cubic units for the final volume.",
    ],
    latexBlocks: [
      "V_{\\text{combined}}=V_1+V_2+\\cdots",
      "V_{\\text{remaining}}=V_{\\text{outer}}-V_{\\text{cut-out}}",
    ],
  },
  workedExamples: [
    {
      title: "Prism with a cylinder attached",
      questionLatex: "\\text{A solid contains an }8\\text{ cm by }5\\text{ cm by }3\\text{ cm prism and a cylinder with }r=2\\text{ cm},h=3\\text{ cm. Find total volume to 1 decimal place.}",
      steps: [
        { explanation: "Find each volume.", latex: "V_{\\text{prism}}=8(5)(3)=120,\\quad V_{\\text{cylinder}}=\\pi(2)^2(3)=12\\pi" },
        { explanation: "Add and round at the end.", latex: "V=120+12\\pi\\approx157.7\\text{ cm}^3" },
      ],
      finalAnswerLatex: "157.7\\text{ cm}^3",
    },
    {
      title: "Two joined prisms",
      questionLatex: "\\text{Two non-overlapping prisms measure }6\\times4\\times3\\text{ cm and }2\\times4\\times5\\text{ cm. Find total volume.}",
      steps: [
        { explanation: "Find each prism volume.", latex: "V_1=6(4)(3)=72,\\quad V_2=2(4)(5)=40" },
        { explanation: "Add the volumes.", latex: "V=72+40=112\\text{ cm}^3" },
      ],
      finalAnswerLatex: "112\\text{ cm}^3",
    },
    {
      title: "Cylindrical hole through a prism",
      questionLatex: "\\text{A }10\\text{ cm by }10\\text{ cm by }5\\text{ cm prism has a cylindrical hole with }r=2\\text{ cm},h=5\\text{ cm. Find remaining volume to 1 decimal place.}",
      steps: [
        { explanation: "Find the outer prism and removed cylinder volumes.", latex: "V_{\\text{outer}}=10(10)(5)=500,\\quad V_{\\text{hole}}=\\pi(2)^2(5)=20\\pi" },
        { explanation: "Subtract and round.", latex: "V=500-20\\pi\\approx437.2\\text{ cm}^3" },
      ],
      finalAnswerLatex: "437.2\\text{ cm}^3",
    },
  ],
  guidedPractice: [
    measure("cos-g1", "Two joined rectangular prisms measure 5 cm by 4 cm by 3 cm and 2 cm by 4 cm by 3 cm. Find their total volume.", "V=5(4)(3)+2(4)(3)", "84", "cm^3", "Add the volumes of the non-overlapping prisms."),
    measure("cos-g2", "A 6 cm by 5 cm by 4 cm prism has a 2 cm by 2 cm by 4 cm rectangular cut-out. Find the remaining volume.", "V=6(5)(4)-2(2)(4)", "104", "cm^3", "Subtract the cut-out volume."),
    measure("cos-g3", "A solid contains a 6 cm by 4 cm by 2 cm prism and a cylinder with radius 1 cm and height 2 cm. Find total volume. Round to 1 decimal place.", "V=6(4)(2)+\\pi(1)^2(2)", "54.3", "cm^3", "Add the prism and cylinder volumes, then round."),
    choice("cos-g4", "A cylindrical hole is drilled through a rectangular prism. Which operation combines the volumes?", "\\text{Choose the operation.}", "B", [{ label: "A", text: "Add the hole volume" }, { label: "B", text: "Subtract the hole volume" }, { label: "C", text: "Multiply the two volumes" }], "A drilled hole removes material."),
  ],
  independentPractice: [
    measure("cos-i1", "Two joined rectangular prisms measure 8 cm by 3 cm by 2 cm and 4 cm by 3 cm by 5 cm. Find total volume.", "V=8(3)(2)+4(3)(5)", "108", "cm^3", "Add both prism volumes."),
    measure("cos-i2", "A 9 cm by 7 cm by 4 cm prism has a 3 cm by 2 cm by 4 cm rectangular cut-out. Find the remaining volume.", "V=9(7)(4)-3(2)(4)", "228", "cm^3", "Subtract the removed prism."),
    measure("cos-i3", "A solid contains a 10 cm by 4 cm by 3 cm prism and a cylinder with radius 2 cm and height 3 cm. Find total volume. Round to 1 decimal place.", "V=10(4)(3)+\\pi(2)^2(3)", "157.7", "cm^3", "Add 120 and 12 pi, then round."),
    choice("cos-i4", "Which expression models a cylindrical hole of radius r drilled through the full height h of a rectangular prism with volume V?", "\\text{Choose the expression.}", "C", [{ label: "A", text: "V + pi r^2 h" }, { label: "B", text: "V - 2 pi r h" }, { label: "C", text: "V - pi r^2 h" }], "Subtract the cylinder volume from the prism volume."),
    measure("cos-i5", "A 6 cm by 6 cm by 5 cm prism has a cylindrical hole with radius 1 cm drilled through its 5 cm height. Find remaining volume. Round to 1 decimal place.", "V=6(6)(5)-\\pi(1)^2(5)", "164.3", "cm^3", "Subtract the cylindrical hole and round at the end."),
  ],
  commonMistakes: [
    "Adding the volume of a hole instead of subtracting it.",
    "Using surface area formulas for a volume question.",
    "Counting overlapping parts twice.",
    "Rounding a cylinder volume before combining the parts.",
  ],
  masteryQuiz: [
    measure("cos-m1", "Two joined prisms measure 7 cm by 4 cm by 3 cm and 3 cm by 4 cm by 2 cm. Find total volume.", "V=7(4)(3)+3(4)(2)", "108", "cm^3", "Add the two prism volumes."),
    measure("cos-m2", "A 10 cm by 6 cm by 4 cm prism has a 2 cm by 3 cm by 4 cm rectangular cut-out. Find remaining volume.", "V=10(6)(4)-2(3)(4)", "216", "cm^3", "Subtract the cut-out."),
    choice("cos-m3", "Which unit is appropriate for a composite solid volume?", "\\text{Choose the unit.}", "C", [{ label: "A", text: "m" }, { label: "B", text: "m^2" }, { label: "C", text: "m^3" }], "Volume uses cubic units."),
    measure("cos-m4", "A solid contains a 5 cm by 4 cm by 3 cm prism and a cylinder with radius 1 cm and height 3 cm. Find total volume. Round to 1 decimal place.", "V=5(4)(3)+\\pi(1)^2(3)", "69.4", "cm^3", "Add the prism and cylinder volumes."),
    choice("cos-m5", "Which expression models two non-overlapping joined solids with volumes V1 and V2?", "\\text{Choose the expression.}", "A", [{ label: "A", text: "V1 + V2" }, { label: "B", text: "V1 - V2" }, { label: "C", text: "V1 x V2" }], "Joined non-overlapping parts are added."),
    measure("cos-m6", "A 12 cm by 8 cm by 5 cm prism has a 4 cm by 3 cm by 5 cm cut-out. Find remaining volume.", "V=12(8)(5)-4(3)(5)", "420", "cm^3", "Subtract the cut-out prism volume."),
    measure("cos-m7", "A solid contains a 4 m by 3 m by 2 m prism and a cylinder with radius 1 m and height 2 m. Find total volume. Round to 1 decimal place.", "V=4(3)(2)+\\pi(1)^2(2)", "30.3", "m^3", "Add 24 and 2 pi, then round."),
    choice("cos-m8", "A rectangular prism has a cylindrical tunnel removed. Which expression is correct?", "\\text{Choose the expression.}", "B", [{ label: "A", text: "lwh + pi r^2 h" }, { label: "B", text: "lwh - pi r^2 h" }, { label: "C", text: "2(lw + lh + wh) - 2 pi r h" }], "Subtract the tunnel volume from the prism volume."),
    measure("cos-m9", "A 10 cm by 8 cm by 6 cm prism has a cylindrical hole with radius 2 cm drilled through its 6 cm height. Find remaining volume. Round to 1 decimal place.", "V=10(8)(6)-\\pi(2)^2(6)", "404.6", "cm^3", "Subtract 24 pi from 480 and round."),
    measure("cos-m10", "A solid contains a 9 cm by 5 cm by 4 cm prism and two identical cylinders, each with radius 2 cm and height 4 cm. Find total volume. Round to 1 decimal place.", "V=9(5)(4)+2\\pi(2)^2(4)", "280.5", "cm^3", "Add the prism volume and both cylinder volumes before rounding."),
  ],
};

const lessons: Record<string, LessonContent> = {
  "perimeter-area-review": perimeterAreaReview,
  "composite-area": compositeArea,
  "surface-area-prisms": surfaceAreaPrisms,
  "surface-area-cylinders": surfaceAreaCylinders,
  "volume-prisms": volumePrisms,
  "volume-cylinders": volumeCylinders,
  "composite-solids": compositeSolids,
};

export function year9PrismsAndCylindersLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed,
): Partial<ExplicitLesson> | null {
  if (
    !["year-9-mathematics", "year-9-mathematics-advanced", "year-9-mathematics-core"].includes(course.slug) ||
    unit.slug !== "prisms-and-cylinders"
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
    successCriteria: [content.successCriteria],
    commonMistakes: content.commonMistakes.map((mistake) => ({
      mistake,
      fix: fixForMistake(mistake),
    })),
  };
}
