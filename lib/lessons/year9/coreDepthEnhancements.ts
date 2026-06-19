import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, PracticeQuestionPart } from "../differentialCalculus";

type CoreLessonContent = Partial<ExplicitLesson> & Pick<ExplicitLesson, "teaching">;

type MultiPartTemplate = {
  prompt: string;
  latex: string;
  answer: string;
  acceptedAnswers?: string[];
  hint: string;
  explanation: string;
  parts: PracticeQuestionPart[];
};

const teachingAdditions: Record<string, string[]> = {
  "geometrical-representations": [
    "The useful idea in this unit is invariance: when a figure is enlarged or reduced, its angles stay the same while its lengths are multiplied by one scale factor.",
    "That is why scale problems should start by matching corresponding sides. Once the matching is clear, the arithmetic is just a multiplier; if the matching is wrong, a neat calculation still gives the wrong length.",
    "For maps and scale drawings, the drawing is a model of a real object. A scale tells you how many real units one drawing unit represents, so every prediction from the drawing must pass through that scale relationship.",
  ],
  "working-with-triangles": [
    "Right-triangle methods work because the side lengths and acute angles are locked together. Pythagoras links the three side lengths; trigonometry links one acute angle to a ratio of two sides.",
    "The first decision is therefore structural, not arithmetic: decide whether the question gives two sides, one side and one angle, or a direction such as a bearing. That decision chooses the tool.",
    "A common error is to chase the number that looks easiest to calculate. Label the triangle first, then the formula follows from the labels rather than from guesswork.",
  ],
  "prisms-and-cylinders": [
    "Measurement formulas are compressed counting methods. Area counts square units on a surface; volume counts cubic units filling a solid.",
    "Surface area is not a new kind of measurement: it is the sum of the areas of the outside faces. Volume is different because it counts layers through the depth of the solid.",
    "Composite shapes are solved by splitting or subtracting because area and volume are additive. If two non-overlapping pieces make the whole, their measures add to the whole measure.",
  ],
  "index-laws": [
    "Index laws are bookkeeping rules for repeated multiplication. They work because powers with the same base count how many copies of that base are being multiplied.",
    "Multiplying powers joins copies, so exponents add. Dividing powers cancels matching copies, so exponents subtract. Raising a power to a power repeats the whole power, so exponents multiply.",
    "The zero and negative index rules are not exceptions to memorise; they are what the quotient rule must mean if it is to keep working consistently.",
  ],
  "numbers-of-any-magnitude": [
    "Scientific notation separates size from accuracy. The power of 10 tells the scale of the number; the coefficient tells the significant digits being carried.",
    "Moving a decimal point does not change the value if the power of 10 changes in the opposite direction. This is the same place-value idea used for ordinary decimals, extended to very large and very small numbers.",
    "Rounding is a decision about precision. The rounded value should be easier to use while still staying close enough for the context.",
  ],
  "algebraic-techniques": [
    "Algebraic fractions follow the same logic as numerical fractions: denominators name the size of the pieces, and numerators count the pieces.",
    "Adding or subtracting requires a common denominator because only like-sized pieces can be combined directly. Multiplying and dividing do not need that step because they scale the pieces instead.",
    "Expanding brackets is distribution: every term inside the bracket receives the multiplier outside it. Missing one term is the most common source of wrong answers.",
  ],
  equations: [
    "Solving an equation means preserving balance while isolating the unknown. Each operation is chosen because it undoes an operation attached to the variable.",
    "The order matters because expressions are built in layers. To uncover the variable, undo the outermost layer first, then keep working inward.",
    "Fractions in equations are cleared by multiplying every term by a common denominator. Multiplying only part of the equation breaks the balance.",
  ],
  "financial-mathematics": [
    "Financial mathematics is arithmetic with a decision attached. The calculation finds the amount; the interpretation decides what that amount means for pay, tax, interest, or cost.",
    "Percentages compare a part with a whole. Before using a percentage, identify the base amount it applies to; using the wrong base is the most common finance error.",
    "Good comparisons use total amounts over the same time period. A smaller weekly payment can still cost more overall if it continues for longer or includes fees.",
  ],
  "constant-rates-of-change": [
    "A constant rate of change means equal changes in the input produce equal changes in the output. That steady change is why the graph is a straight line.",
    "Gradient measures the rate: vertical change divided by horizontal change. The y-intercept is the starting output when the input is zero.",
    "A linear model is a prediction tool, not just an equation. Its predictions are strongest inside the context where the constant-rate assumption makes sense.",
  ],
  "making-decisions": [
    "Statistics summarise data so decisions are based on the whole set, not on a few memorable values. Centre describes a typical value; spread describes how consistent the values are.",
    "No single statistic tells the whole story. A higher median can be less convincing if the spread is much larger or if an outlier changes the mean.",
    "A strong data-based decision names both the comparison and the evidence. The calculation gives the evidence; the decision comes from connecting it to the context.",
  ],
};

function part(
  key: "a" | "b" | "c",
  prompt: string,
  marks: number,
  answer: string,
  hint: string,
  explanation: string,
  working: string[],
  acceptedAnswers: string[] = []
): PracticeQuestionPart {
  return { key, label: `(${key})`, prompt, marks, answer, acceptedAnswers, hint, explanation, working };
}

function makeQuestion(id: string, template: MultiPartTemplate): PracticeQuestion {
  return {
    id,
    prompt: template.prompt,
    latex: template.latex,
    answer: template.answer,
    acceptedAnswers: template.acceptedAnswers ?? [],
    hint: template.hint,
    explanation: template.explanation,
    parts: template.parts,
  };
}

function templateFor(unitSlug: string, lessonSlug: string, lessonTitle: string): MultiPartTemplate {
  if (unitSlug === "working-with-triangles") {
    if (lessonSlug.includes("bearing")) {
      return {
        prompt: `A Year 9 Core bearings task linked to ${lessonTitle}: town B is 6 km due east of town A, and town C is 8 km due north of town B.`,
        latex: "\\text{Use the right triangle formed by A, B and C.}",
        answer: "10",
        hint: "The east and north legs are perpendicular.",
        explanation: "The towns form a right triangle with perpendicular legs 6 km and 8 km, so Pythagoras gives the direct distance and the bearing is measured clockwise from north.",
        parts: [
          part("a", "Find the direct distance from A to C.", 2, "10", "Use Pythagoras with legs 6 and 8.", "The direct distance is the hypotenuse: $\\sqrt{6^2+8^2}=10$ km.", ["AC=\\sqrt{6^2+8^2}=10"]),
          part("b", "Find the acute angle east of north from A to C, rounded to the nearest degree.", 2, "37", "Use $\\tan\\theta=\\frac{6}{8}$.", "The angle east of north satisfies $\\tan\\theta=\\frac{6}{8}$, so $\\theta\\approx37^\\circ$.", ["\\theta=\\tan^{-1}\\left(\\frac{6}{8}\\right)\\approx37^\\circ"], ["37 degrees", "37°"]),
          part("c", "State the three-digit bearing of C from A.", 1, "037", "A bearing is measured clockwise from north.", "The direction is 37 degrees east of north, so the three-digit bearing is $037^\\circ$.", ["\\text{bearing}=037^\\circ"], ["37", "037°", "37°"]),
        ],
      };
    }
    if (lessonSlug.includes("elevation")) {
      return {
        prompt: `A Year 9 Core elevation task linked to ${lessonTitle}: a student stands 20 m from the base of a tower and measures an angle of elevation of $35^\\circ$.`,
        latex: "\\text{Use tangent with opposite and adjacent sides.}",
        answer: "14",
        acceptedAnswers: ["14.0"],
        hint: "The tower height is opposite the angle and the ground distance is adjacent.",
        explanation: "The tangent ratio links the height to the ground distance: height equals adjacent times $\\tan 35^\\circ$.",
        parts: [
          part("a", "State the trigonometric ratio needed.", 1, "tan", "Opposite and adjacent sides are involved.", "Tangent links opposite and adjacent sides.", ["\\tan\\theta=\\frac{\\text{opposite}}{\\text{adjacent}}"], ["tangent", "Tan"]),
          part("b", "Find the tower height to the nearest metre.", 2, "14", "Calculate $20\\tan35^\\circ$.", "The height is $20\\tan35^\\circ\\approx14.0$, so the nearest metre is 14.", ["h=20\\tan35^\\circ\\approx14.0"], ["14 m"]),
          part("c", "If the student moves to 10 m from the base, state whether the angle of elevation increases or decreases.", 1, "increases", "Closer means the same height is seen more steeply.", "For the same tower height, a smaller horizontal distance gives a larger angle of elevation.", ["\\text{closer distance}\\Rightarrow\\text{larger angle}"], ["increase", "larger"]),
        ],
      };
    }
    if (lessonSlug.includes("trig")) {
      return {
        prompt: `A Year 9 Core trigonometry task linked to ${lessonTitle}: a right triangle has an angle of $40^\\circ$, hypotenuse 15 cm, and unknown opposite side x.`,
        latex: "\\sin40^\\circ=\\frac{x}{15}",
        answer: "sin",
        hint: "Opposite and hypotenuse point to sine.",
        explanation: "Sine is the correct ratio because the known side is the hypotenuse and the unknown side is opposite the angle.",
        parts: [
          part("a", "State the trigonometric ratio needed.", 1, "sin", "Match opposite and hypotenuse.", "The sine ratio links opposite and hypotenuse.", ["\\sin\\theta=\\frac{\\text{opposite}}{\\text{hypotenuse}}"], ["sine", "Sin"]),
          part("b", "Find x to 1 decimal place.", 2, "9.6", "Calculate $15\\sin40^\\circ$.", "Rearranging gives $x=15\\sin40^\\circ\\approx9.6$ cm.", ["x=15\\sin40^\\circ\\approx9.6"], ["9.6 cm"]),
          part("c", "If the angle increases while the hypotenuse stays 15 cm, state whether x increases or decreases.", 1, "increases", "A larger acute angle has a larger opposite side for the same hypotenuse.", "Increasing the angle increases the opposite side when the hypotenuse is fixed.", ["\\theta\\uparrow\\Rightarrow x\\uparrow"], ["increase", "larger"]),
        ],
      };
    }
    return {
      prompt: `A Year 9 Core right-triangle task linked to ${lessonTitle}: a ladder, wall and ground form a right triangle. The ladder is 13 m and the base is 5 m from the wall.`,
      latex: "h^2+5^2=13^2",
      answer: "12",
      hint: "The ladder is the hypotenuse.",
      explanation: "The wall height is the shorter side of a right triangle, so subtract the square of the base from the square of the hypotenuse.",
      parts: [
        part("a", "Find the height reached by the ladder.", 2, "12", "Use $h^2=13^2-5^2$.", "The height is $\\sqrt{13^2-5^2}=12$ m.", ["h^2=13^2-5^2=144", "h=12"], ["12 m"]),
        part("b", "Find the area of the right triangle formed.", 1, "30", "Use $\\frac12\\times5\\times12$.", "The area is $\\frac12\\times5\\times12=30$ square metres.", ["A=\\frac12\\times5\\times12=30"], ["30 m^2"]),
        part("c", "If the ladder length stays 13 m and the base is moved closer to the wall, state whether the height increases or decreases.", 1, "increases", "A shorter base leaves more of the fixed hypotenuse for height.", "With the same hypotenuse, decreasing one leg increases the other leg.", ["h^2=13^2-b^2"], ["increase", "larger"]),
      ],
    };
  }

  if (unitSlug === "financial-mathematics") {
    return {
      prompt: `A Year 9 Core finance task linked to ${lessonTitle}: Sam earns $24 per hour for 18 ordinary hours and 4 overtime hours paid at time-and-a-half.`,
      latex: "\\text{overtime rate}=1.5\\times\\$24",
      answer: "36",
      hint: "Find the overtime hourly rate before adding the pay amounts.",
      explanation: "Time-and-a-half means 1.5 times the ordinary hourly rate. Total pay is ordinary pay plus overtime pay.",
      parts: [
        part("a", "Find the overtime hourly rate.", 1, "36", "Multiply 24 by 1.5.", "The overtime rate is $24\\times1.5=$36 per hour.", ["24\\times1.5=36"], ["$36", "36 dollars"]),
        part("b", "Find Sam's total pay before tax.", 2, "576", "Add ordinary pay and overtime pay.", "Ordinary pay is $24\\times18=$432 and overtime pay is $36\\times4=$144, so the total is $576.", ["24\\times18=432", "36\\times4=144", "432+144=576"], ["$576"]),
        part("c", "A $48 deduction is taken. Find Sam's net pay.", 1, "528", "Subtract the deduction from gross pay.", "Net pay is $576-$48=$528.", ["576-48=528"], ["$528"]),
      ],
    };
  }

  if (unitSlug === "constant-rates-of-change") {
    return {
      prompt: `A Year 9 Core linear modelling task linked to ${lessonTitle}: a hire company charges a $30 booking fee plus $12 per hour.`,
      latex: "C=30+12h",
      answer: "12",
      hint: "The hourly charge is the constant rate of change.",
      explanation: "The fixed fee is the starting value and the hourly charge is the gradient of the linear model.",
      parts: [
        part("a", "State the gradient of the cost model.", 1, "12", "The gradient is the amount added for each extra hour.", "Each extra hour adds $12, so the gradient is 12.", ["m=12"]),
        part("b", "Find the cost for 5 hours.", 2, "90", "Substitute $h=5$.", "The cost is $30+12\\times5=$90.", ["C=30+12\\times5=90"], ["$90"]),
        part("c", "Find the number of hours if the cost is $126.", 2, "8", "Solve $30+12h=126$.", "Subtracting 30 gives $12h=96$, so $h=8$.", ["30+12h=126", "12h=96", "h=8"], ["8 hours"]),
      ],
    };
  }

  if (unitSlug === "making-decisions") {
    return {
      prompt: `A Year 9 Core statistics task linked to ${lessonTitle}: two teams record scores. Team A: 6, 7, 8, 8, 21. Team B: 7, 8, 8, 9, 10.`,
      latex: "\\text{Compare centre and spread.}",
      answer: "8",
      hint: "Order is already shown; compare typical value and spread.",
      explanation: "Both teams have median 8, but Team A has a much larger range because of the outlier 21.",
      parts: [
        part("a", "Find the median score for Team A.", 1, "8", "Use the middle value of the ordered list.", "The middle value of 6, 7, 8, 8, 21 is 8.", ["\\text{median}=8"]),
        part("b", "Find the range for Team A.", 1, "15", "Subtract the smallest value from the largest.", "The range is $21-6=15$.", ["21-6=15"]),
        part("c", "State which team is more consistent: A or B.", 2, "B", "The more consistent team has the smaller spread.", "Team B is more consistent because its scores are closer together; its range is $10-7=3$ compared with Team A's 15.", ["\\text{range}_B=10-7=3"], ["Team B", "team b", "b"]),
      ],
    };
  }

  if (unitSlug === "prisms-and-cylinders") {
    return {
      prompt: `A Year 9 Core measurement task linked to ${lessonTitle}: a rectangular prism has length 8 cm, width 5 cm and height 3 cm.`,
      latex: "\\text{Use face areas and volume.}",
      answer: "40",
      hint: "Area is two-dimensional; volume is three-dimensional.",
      explanation: "The base area is length times width. Volume is base area times height. Surface area adds all six outside faces.",
      parts: [
        part("a", "Find the area of the base.", 1, "40", "Multiply length by width.", "The base area is $8\\times5=40$ square centimetres.", ["A_{\\text{base}}=8\\times5=40"], ["40 cm^2"]),
        part("b", "Find the volume.", 2, "120", "Multiply base area by height.", "The volume is $40\\times3=120$ cubic centimetres.", ["V=40\\times3=120"], ["120 cm^3"]),
        part("c", "Find the total surface area.", 2, "158", "Add the areas of the three pairs of matching faces.", "The surface area is $2(8\\times5+8\\times3+5\\times3)=158$ square centimetres.", ["SA=2(40+24+15)=158"], ["158 cm^2"]),
      ],
    };
  }

  if (unitSlug === "geometrical-representations") {
    return {
      prompt: `A Year 9 Core scale task linked to ${lessonTitle}: two similar rectangles have corresponding widths 6 cm and 15 cm. The smaller rectangle has length 10 cm.`,
      latex: "\\text{scale factor}=\\frac{15}{6}",
      answer: "2.5",
      hint: "Use corresponding sides to find the scale factor.",
      explanation: "Similarity preserves shape and multiplies all corresponding lengths by the same scale factor.",
      parts: [
        part("a", "Find the scale factor from the smaller rectangle to the larger rectangle.", 1, "2.5", "Divide the larger width by the smaller width.", "The scale factor is $15\\div6=2.5$.", ["\\frac{15}{6}=2.5"]),
        part("b", "Find the larger rectangle's length.", 2, "25", "Multiply the smaller length by the scale factor.", "The larger length is $10\\times2.5=25$ cm.", ["10\\times2.5=25"], ["25 cm"]),
        part("c", "Find the area scale factor.", 2, "6.25", "Square the length scale factor.", "Area scales by the square of the length scale factor: $2.5^2=6.25$.", ["2.5^2=6.25"]),
      ],
    };
  }

  if (unitSlug === "index-laws" || unitSlug === "numbers-of-any-magnitude") {
    return {
      prompt: `A Year 9 Core indices task linked to ${lessonTitle}: simplify powers of 10 in a scientific-notation calculation.`,
      latex: "(3\\times10^4)(2\\times10^3)",
      answer: "6",
      hint: "Multiply the front numbers and add the powers of 10.",
      explanation: "The coefficients multiply and the powers of the same base add, because the powers count repeated factors of 10.",
      parts: [
        part("a", "Find the coefficient before normalising.", 1, "6", "Multiply 3 by 2.", "The coefficient is $3\\times2=6$.", ["3\\times2=6"]),
        part("b", "Find the power of 10 before normalising.", 1, "7", "Add the exponents 4 and 3.", "The power is $10^{4+3}=10^7$.", ["10^4\\times10^3=10^7"]),
        part("c", "Write the product in scientific notation.", 2, "6x10^7", "Combine the coefficient and power of 10.", "The product is $6\\times10^7$, which is already in scientific notation.", ["(3\\times10^4)(2\\times10^3)=6\\times10^7"], ["6\\times10^7", "6*10^7"]),
      ],
    };
  }

  if (unitSlug === "algebraic-techniques") {
    return {
      prompt: `A Year 9 Core algebra task linked to ${lessonTitle}: simplify an expression involving a bracket and like terms.`,
      latex: "3(x+4)+2x",
      answer: "3x+12",
      hint: "Expand the bracket before collecting like terms.",
      explanation: "Distribution sends the 3 to both terms in the bracket, then like terms can be combined.",
      parts: [
        part("a", "Expand $3(x+4)$.", 1, "3x+12", "Multiply both terms inside the bracket by 3.", "Expanding gives $3x+12$.", ["3(x+4)=3x+12"], ["3x + 12"]),
        part("b", "Simplify $3(x+4)+2x$.", 2, "5x+12", "Add the $x$ terms after expanding.", "The expression becomes $3x+12+2x=5x+12$.", ["3x+12+2x=5x+12"], ["5x + 12"]),
        part("c", "Evaluate the simplified expression when $x=4$.", 1, "32", "Substitute 4 into $5x+12$.", "The value is $5\\times4+12=32$.", ["5\\times4+12=32"]),
      ],
    };
  }

  return {
    prompt: `A Year 9 Core equation task linked to ${lessonTitle}: solve and use a two-step equation.`,
    latex: "3x+5=26",
    answer: "7",
    hint: "Undo addition before division.",
    explanation: "Solving preserves balance by applying the same inverse operation to both sides.",
    parts: [
      part("a", "Solve $3x+5=26$.", 2, "7", "Subtract 5, then divide by 3.", "Subtracting 5 gives $3x=21$, then dividing by 3 gives $x=7$.", ["3x+5=26", "3x=21", "x=7"]),
      part("b", "Find the value of $2x-1$ using your value of x.", 1, "13", "Substitute $x=7$.", "Using $x=7$, $2x-1=14-1=13$.", ["2(7)-1=13"]),
      part("c", "If $3x+5=35$ instead, find x.", 2, "10", "Use the same inverse operations.", "Subtracting 5 gives $3x=30$, so $x=10$.", ["3x+5=35", "3x=30", "x=10"]),
    ],
  };
}

export function enhanceYear9CoreLesson(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed,
  content: CoreLessonContent
): CoreLessonContent {
  if (course.slug !== "year-9-mathematics-core" || unit.slug === "making-predictions") {
    return content;
  }

  const additions = teachingAdditions[unit.slug] ?? [];
  const existingParagraphs = content.teaching?.paragraphs ?? [];
  const template = templateFor(unit.slug, lesson.slug, lesson.title);

  return {
    ...content,
    teaching: {
      ...content.teaching,
      paragraphs: [...existingParagraphs, ...additions],
    },
    multiPartPractice: content.multiPartPractice ?? [
      makeQuestion(`y9c-${unit.slug}-${lesson.slug}-mp1`, template),
    ],
  };
}
