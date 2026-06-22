import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function measurementExplanation(prompt: string, latex: string, answer: string) {
  const question = `${prompt} ${latex}`.toLowerCase();
  const isReverse = includesAny(question, [
    "find its radius",
    "find the radius",
    "find its height",
    "find the height",
    "find its side",
    "find the side",
    "find the length scale factor",
    "find k",
    "find the original",
  ]);

  if (includesAny(question, ["similar", "scale factor", "scale by"])) {
    if (includesAny(question, ["volume", "k^3", "k³"])) {
      if (question.includes("find the volume scale factor")) {
        return `Volume changes in three directions, so first find the length scale factor k and then cube it. The volume scale factor is ${answer}.`;
      }
      return isReverse
        ? `Volume changes in three directions, so it scales by k^3. Work backwards by taking the cube root of the volume scale factor; this gives ${answer}.`
        : `Volume changes in three directions, so use the volume scale factor k^3 rather than k. Apply the cubed scale factor to the original volume to get ${answer}.`;
    }
    if (includesAny(question, ["area", "surface area", "k^2", "k²"])) {
      if (question.includes("find the area scale factor")) {
        return `Area changes in two directions, so first find the length scale factor k and then square it. The area scale factor is ${answer}.`;
      }
      return isReverse
        ? `Area changes in two directions, so it scales by k^2. Work backwards by taking the square root of the area scale factor; this gives ${answer}.`
        : `Area changes in two directions, so use k^2 rather than k. Apply the squared scale factor to the original area to get ${answer}.`;
    }
    return `Lengths scale directly by k. Compare matching lengths in the same order, or multiply the original length by k, to get ${answer}.`;
  }

  if (question.includes("sphere")) {
    const radiusReminder = question.includes("diameter")
      ? "The formula needs the radius, so halve the diameter first. "
      : "";
    if (question.includes("surface area")) {
      return isReverse
        ? `${radiusReminder}Surface area uses 4pi r^2. To undo the square, divide by 4pi and then take the square root; the radius is ${answer}.`
        : `${radiusReminder}This asks for the outside skin of the sphere, so use 4pi r^2 and finish with square units. The result is ${answer}.`;
    }
    return isReverse
      ? `${radiusReminder}Volume uses (4/3)pi r^3. Work backwards through the formula, then take the cube root; the radius is ${answer}.`
      : `${radiusReminder}This asks for the space inside the sphere, so use (4/3)pi r^3 and finish with cubic units. The result is ${answer}.`;
  }

  if (question.includes("cone")) {
    const needsSlantHeight = includesAny(question, [
      "surface area",
      "curved surface",
      "slant height",
      "pi r l",
      "πrl",
    ]);
    if (needsSlantHeight) {
      return `A cone's curved surface uses the slant height l because that is the length running along the outside face. ${question.includes("total") ? "For total surface area, include the circular base as well. " : ""}The result is ${answer}.`;
    }
    return isReverse
      ? `Cone volume is one-third of the matching cylinder: V=(1/3)pi r^2h. Undo the multiplication carefully to find the missing dimension; this gives ${answer}.`
      : `This asks for the space inside the cone, so use the perpendicular height h and keep the one-third factor. The volume is ${answer}.`;
  }

  if (question.includes("pyramid")) {
    if (question.includes("surface area")) {
      return `Surface area counts the square base and the four triangular faces. Use the slant height along each triangular face, not the vertical height inside the pyramid; the result is ${answer}.`;
    }
    return isReverse
      ? `A pyramid holds one-third of the matching prism. Start from V=(1/3)A_base h and undo the operations to isolate the missing height; this gives ${answer}.`
      : `Volume measures the space inside the pyramid. Use the perpendicular height from the base to the apex and keep the one-third factor; the result is ${answer}.`;
  }

  if (question.includes("cylinder")) {
    const radiusReminder = question.includes("diameter")
      ? "The formula needs the radius, so halve the diameter first. "
      : "";
    if (includesAny(question, ["surface area", "lateral", "curved surface"])) {
      const surfaceReminder = includesAny(question, ["open", "no lid", "no base"])
        ? "Count the wrap-around rectangle and only the circular end that is actually present. "
        : includesAny(question, ["lateral", "curved surface"])
          ? "This asks for the wrap-around rectangle only, so do not add the circular ends. "
          : "For a closed cylinder, count the wrap-around rectangle and both circular ends. ";
      return `${radiusReminder}${surfaceReminder}The surface area is ${answer}.`;
    }
    return isReverse
      ? `${radiusReminder}Cylinder volume is pi r^2h. Divide by the full known product before undoing any square; the missing dimension is ${answer}.`
      : `${radiusReminder}Volume asks for the space inside the cylinder, so use the circular cross-section pi r^2 and multiply by the height. The volume is ${answer}.`;
  }

  if (question.includes("prism") || question.includes("cube")) {
    if (question.includes("surface area")) {
      return isReverse
        ? `Surface area counts the outside faces, not the space inside. Use the known face areas and work backwards to isolate the missing length; this gives ${answer}.`
        : `Surface area means the total area of the outside faces. Count every matching face once, use square units, and the result is ${answer}.`;
    }
    return isReverse
      ? `A prism's volume is cross-sectional area times length. Divide by the known dimensions to uncover the missing length; this gives ${answer}.`
      : `Volume means the space inside the prism. Find the cross-sectional area, multiply by the prism length, and use cubic units; the result is ${answer}.`;
  }

  if (includesAny(question, ["litre", "liter", " m^3", "m³"])) {
    return `Match the units before calculating: one cubic metre is 1000 litres. Convert in the direction the question asks to get ${answer}.`;
  }

  return `First decide whether the question is asking for a length, an area, or a volume. Use the matching dimensions and units; the result is ${answer}.`;
}

// Returns safe numeric formatting variants for a canonical answer string:
//   integer "7"   → ["7.0"]   (trailing decimal)
//   decimal "7.5" → ["7.50"]  (trailing zero)
// Does not generate variants for answers that contain letters, units, or
// non-standard characters — those are handled by explicit acceptedAnswers.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^\d+$/.test(t)) return [`${t}.0`];
  if (/^\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function measAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  hint = "Name the measure first: length, outside area, or inside volume. Then choose the dimensions that belong in that formula."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...numericFormatVariants(answer), ...acceptedAnswers])),
    hint,
    explanation: measurementExplanation(prompt, latex, answer),
  };
}

function measChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  latex = "\\text{Select A, B, C, or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    hint: "Identify the formula first, then check each option against it.",
    explanation,
  };
}

// ─── Lesson 1: Surface Area of Prisms ────────────────────────────────────────

const surfaceAreaPrismsWorkedExamples: WorkedExample[] = [
  {
    title: "Surface area of a rectangular prism",
    questionLatex:
      "\\text{Find the surface area of a rectangular prism with length 4 cm, width 5 cm, and height 6 cm.}",
    steps: [
      {
        explanation:
          "A rectangular prism has 3 pairs of identical rectangular faces. Identify the area of each pair.",
        latex:
          "\\text{Top/bottom: }4\\times 5=20\\text{ cm}^2\\quad\\text{(×2)}",
      },
      {
        explanation: "Front/back faces.",
        latex: "\\text{Front/back: }4\\times 6=24\\text{ cm}^2\\quad\\text{(×2)}",
      },
      {
        explanation: "Left/right faces.",
        latex: "\\text{Left/right: }5\\times 6=30\\text{ cm}^2\\quad\\text{(×2)}",
      },
      {
        explanation: "Add all six faces.",
        latex:
          "SA=2(20+24+30)=2\\times 74=148\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA=148\\text{ cm}^2",
  },
  {
    title: "Surface area of a triangular prism",
    questionLatex:
      "\\text{A triangular prism has a right-triangle cross-section with legs 3 cm and 4 cm (hypotenuse 5 cm). The prism is 10 cm long. Find the surface area.}",
    steps: [
      {
        explanation:
          "The two triangular ends are congruent right triangles. Find the area of one.",
        latex: "\\text{Triangle: }\\tfrac{1}{2}\\times 3\\times 4=6\\text{ cm}^2",
      },
      {
        explanation: "There are two triangular faces.",
        latex: "2\\times 6=12\\text{ cm}^2",
      },
      {
        explanation:
          "The three rectangular faces have widths equal to the three sides of the triangle (3, 4, 5) and length 10 cm.",
        latex:
          "\\text{Rectangles: }(3+4+5)\\times 10=12\\times 10=120\\text{ cm}^2",
      },
      {
        explanation: "Add the triangular ends and the three rectangular faces.",
        latex: "SA=12+120=132\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA=132\\text{ cm}^2",
  },
  {
    title: "Using the net to find all faces",
    questionLatex:
      "\\text{A prism has a cross-section that is an L-shape. The cross-section has area }28\\text{ cm}^2\\text{ and perimeter }22\\text{ cm. The prism is 8 cm long. Find the surface area.}",
    steps: [
      {
        explanation:
          "The surface area of any prism equals: 2 × area of cross-section + perimeter of cross-section × length.",
        latex: "SA=2A_{\\text{cross-section}}+P_{\\text{cross-section}}\\times l",
      },
      {
        explanation: "Substitute the given values.",
        latex: "SA=2\\times 28+22\\times 8",
      },
      {
        explanation: "Calculate each part.",
        latex: "SA=56+176=232\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA=232\\text{ cm}^2",
  },
];

const surfaceAreaPrismsGuided: PracticeQuestion[] = [
  measAnswer(
    "sa-prisms-g1",
    "A cube has side length 5 cm. Find its surface area.",
    "\\text{cube, side }=5\\text{ cm}",
    "150",
    ["150 cm²", "150 cm^2"],
    "A cube has 6 identical square faces. Find the area of one face, then multiply by 6."
  ),
  measAnswer(
    "sa-prisms-g2",
    "A rectangular prism has dimensions 3 m × 4 m × 2 m. Find its surface area.",
    "l=3\\text{ m},\\;w=4\\text{ m},\\;h=2\\text{ m}",
    "52",
    ["52 m²", "52 m^2"]
  ),
  measAnswer(
    "sa-prisms-g3",
    "A triangular prism has a right-triangle cross-section with legs 5 cm and 12 cm (hypotenuse 13 cm) and length 20 cm. Find the surface area.",
    "\\text{legs }5,12\\text{ cm; hyp }13\\text{ cm; length }20\\text{ cm}",
    "660",
    ["660 cm²", "660 cm^2"],
    "Two triangular ends plus three rectangles: SA = 2×(½×5×12) + (5+12+13)×20."
  ),
  measChoice(
    "sa-prisms-g4",
    "Which formula gives the surface area of any prism?",
    "B",
    [
      "$SA = l \\times w \\times h$",
      "$SA = 2A_{\\text{cross}} + P_{\\text{cross}} \\times l$",
      "$SA = P_{\\text{cross}} \\times l$",
      "$SA = A_{\\text{cross}} \\times l$",
    ],
    "Surface area = two end faces (2 × cross-sectional area) plus all the lateral rectangular faces (perimeter of cross-section × length). The formula l × w × h gives volume, not surface area."
  ),
];

const surfaceAreaPrismsIndependent: PracticeQuestion[] = [
  measAnswer(
    "sa-prisms-i1",
    "Find the surface area of a rectangular prism with dimensions 7 cm × 3 cm × 4 cm.",
    "l=7,\\;w=3,\\;h=4\\text{ cm}",
    "122",
    ["122 cm²", "122 cm^2"]
  ),
  measAnswer(
    "sa-prisms-i2",
    "A triangular prism has a right-triangle cross-section with legs 6 cm and 8 cm (hypotenuse 10 cm) and length 15 cm. Find the surface area.",
    "\\text{legs }6,8;\\text{ hyp }10;\\text{ length }15\\text{ cm}",
    "408",
    ["408 cm²", "408 cm^2"],
    "SA = 2×(½×6×8) + (6+8+10)×15."
  ),
  measAnswer(
    "sa-prisms-i3",
    "A cube has surface area 216 cm². Find its side length.",
    "SA=216\\text{ cm}^2",
    "6",
    ["6 cm"],
    "6 × s² = 216, so s² = 36, s = 6."
  ),
  measAnswer(
    "sa-prisms-i4",
    "A prism has a cross-section with area 35 cm² and perimeter 24 cm. The prism is 12 cm long. Find the surface area.",
    "A_{\\text{cross}}=35\\text{ cm}^2,\\;P_{\\text{cross}}=24\\text{ cm},\\;l=12\\text{ cm}",
    "358",
    ["358 cm²", "358 cm^2"]
  ),
  measChoice(
    "sa-prisms-i5",
    "A rectangular prism has dimensions 2 cm × 5 cm × 8 cm. What is its surface area?",
    "C",
    ["$80\\text{ cm}^2$", "$148\\text{ cm}^2$", "$132\\text{ cm}^2$", "$160\\text{ cm}^2$"],
    "SA = 2(2×5 + 2×8 + 5×8) = 2(10 + 16 + 40) = 2 × 66 = 132 cm².",
    "l=2,\\;w=5,\\;h=8\\text{ cm}"
  ),
];

const surfaceAreaPrismsMistakes = [
  {
    mistake:
      "Counting three faces instead of all six — forgetting that each face has a matching parallel face on the opposite side.",
    fix:
      "Pair the faces: top/bottom, front/back, left/right. Find the area of one face in each pair, then multiply by 2. Use SA = 2(lw + lh + wh) to avoid missing a face.",
  },
  {
    mistake:
      "Using volume formula (l × w × h) instead of surface area formula.",
    fix:
      "Surface area is measured in square units (cm²) and counts the outer skin. Volume is measured in cubic units (cm³). Write the formula before substituting any numbers.",
  },
  {
    mistake:
      "For a triangular prism, calculating area of only the rectangular faces and ignoring the two triangular ends.",
    fix:
      "A triangular prism has 5 faces: 2 triangles and 3 rectangles. Always sketch a net first. Add 2 × (area of triangle) to the total.",
  },
  {
    mistake:
      "Using the wrong triangle side as the base of a rectangular face — for example, using only the two legs but missing the hypotenuse face.",
    fix:
      "Each side of the triangular cross-section is the width of one rectangular face. For a 3-4-5 triangle the three rectangular faces have widths 3, 4, and 5. The perimeter of the triangle equals the total width of all lateral faces.",
  },
];

const surfaceAreaPrismsMastery: PracticeQuestion[] = [
  measAnswer(
    "sa-prisms-m1",
    "Find the surface area of a cube with side length 9 cm.",
    "\\text{cube, }s=9\\text{ cm}",
    "486",
    ["486 cm²", "486 cm^2"]
  ),
  measAnswer(
    "sa-prisms-m2",
    "A rectangular prism has dimensions 6 cm × 4 cm × 3 cm. Find its surface area.",
    "l=6,\\;w=4,\\;h=3\\text{ cm}",
    "108",
    ["108 cm²", "108 cm^2"]
  ),
  measChoice(
    "sa-prisms-m3",
    "A rectangular prism has l = 10 m, w = 2 m, h = 5 m. What is its surface area?",
    "D",
    ["$100\\text{ m}^2$", "$140\\text{ m}^2$", "$120\\text{ m}^2$", "$160\\text{ m}^2$"],
    "SA = 2(10×2 + 10×5 + 2×5) = 2(20 + 50 + 10) = 2 × 80 = 160 m².",
    "l=10,\\;w=2,\\;h=5\\text{ m}"
  ),
  measAnswer(
    "sa-prisms-m4",
    "A triangular prism has a right-triangle cross-section with legs 9 cm and 12 cm (hypotenuse 15 cm) and length 25 cm. Find the surface area.",
    "\\text{legs }9,12;\\text{ hyp }15;\\text{ length }25\\text{ cm}",
    "1008",
    ["1008 cm²", "1008 cm^2"],
    "SA = 2×(½×9×12) + (9+12+15)×25 = 108 + 900 = 1008."
  ),
  measChoice(
    "sa-prisms-m5",
    "A student computes the surface area of a 4 cm × 6 cm × 2 cm prism as 48 cm². What error did they make?",
    "B",
    [
      "They calculated only half the surface area — they found 3 faces instead of all 6 (3 pairs).",
      "They used the wrong formula and computed volume instead.",
      "They forgot to include the top and bottom faces.",
      "They added the dimensions instead of multiplying.",
    ],
    "l × w × h = 4 × 6 × 2 = 48 is the volume, not the surface area. SA = 2(4×6 + 4×2 + 6×2) = 2 × 44 = 88 cm². Computing only 3 faces (without doubling) gives 44, not 48 — so option A is ruled out.",
    "l=4,\\;w=6,\\;h=2\\text{ cm}"
  ),
  measAnswer(
    "sa-prisms-m6",
    "A prism has a cross-section with area 42 cm² and perimeter 26 cm. The prism is 9 cm long. Find the surface area.",
    "A_{\\text{cross}}=42\\text{ cm}^2,\\;P_{\\text{cross}}=26\\text{ cm},\\;l=9\\text{ cm}",
    "318",
    ["318 cm²", "318 cm^2"]
  ),
  measChoice(
    "sa-prisms-m7",
    "Which set of dimensions belongs to a rectangular prism with surface area 94 cm²?",
    "B",
    [
      "$2\\times 3\\times 4$",
      "$3\\times 4\\times 5$",
      "$2\\times 5\\times 6$",
      "$1\\times 4\\times 8$",
    ],
    "Check 3×4×5: SA = 2(12 + 15 + 20) = 2 × 47 = 94 cm². ✓",
    "SA=94\\text{ cm}^2"
  ),
  measAnswer(
    "sa-prisms-m8",
    "A rectangular prism has a square base of side 5 cm and height 8 cm. Find its surface area.",
    "\\text{square base }s=5\\text{ cm},\\;h=8\\text{ cm}",
    "210",
    ["210 cm²", "210 cm^2"],
    "Two square ends: 2×25 = 50. Four rectangular sides: 4×(5×8) = 160. Total = 210."
  ),
  measChoice(
    "sa-prisms-m9",
    "A triangular prism with a right-triangle cross-section (legs 3 and 4, hyp 5) has length 6 cm. What is the surface area?",
    "B",
    ["$96\\text{ cm}^2$", "$84\\text{ cm}^2$", "$72\\text{ cm}^2$", "$108\\text{ cm}^2$"],
    "SA = 2×(½×3×4) + (3+4+5)×6 = 12 + 72 = 84 cm².",
    "\\text{legs }3,4;\\text{ hyp }5;\\text{ length }6\\text{ cm}"
  ),
  measAnswer(
    "sa-prisms-m10",
    "A cube has surface area 150 cm². What is its side length?",
    "SA=150\\text{ cm}^2",
    "5",
    ["5 cm"],
    "6s² = 150, s² = 25, s = 5."
  ),
];

// ─── Lesson 2: Surface Area of Cylinders ─────────────────────────────────────

const surfaceAreaCylindersWorkedExamples: WorkedExample[] = [
  {
    title: "Surface area of a closed cylinder",
    questionLatex:
      "\\text{Find the surface area of a closed cylinder with radius 3 cm and height 10 cm. Give your answer to 1 decimal place.}",
    steps: [
      {
        explanation:
          "A closed cylinder has two circular ends and one curved lateral surface. Write the formula.",
        latex: "SA=2\\pi r^2+2\\pi r h",
      },
      {
        explanation: "Substitute r = 3 and h = 10.",
        latex: "SA=2\\pi(3)^2+2\\pi(3)(10)=18\\pi+60\\pi=78\\pi",
      },
      {
        explanation: "Evaluate using π ≈ 3.14159.",
        latex: "SA=78\\pi\\approx 245.0\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA\\approx 245.0\\text{ cm}^2",
  },
  {
    title: "Surface area of an open-top cylinder",
    questionLatex:
      "\\text{A cylindrical container has no lid. Its radius is 4 cm and height is 7 cm. Find the surface area to 1 decimal place.}",
    steps: [
      {
        explanation:
          "With no lid, only one circular face (the base) is included. The curved surface is still the full lateral area.",
        latex: "SA=\\pi r^2+2\\pi r h",
      },
      {
        explanation: "Substitute r = 4 and h = 7.",
        latex: "SA=\\pi(4)^2+2\\pi(4)(7)=16\\pi+56\\pi=72\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "SA=72\\pi\\approx 226.2\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA\\approx 226.2\\text{ cm}^2",
  },
  {
    title: "Identifying formula components",
    questionLatex:
      "\\text{Explain what each part of }SA=2\\pi r^2+2\\pi rh\\text{ represents, and describe how the formula changes for a cylinder with one open end.}",
    steps: [
      {
        explanation:
          "2πr² accounts for the two circular ends — each circle has area πr², so two circles give 2πr².",
        latex: "2\\pi r^2=\\text{two circular ends}",
      },
      {
        explanation:
          "2πrh is the curved lateral surface. If you cut the curved surface and unroll it, you get a rectangle of width 2πr (the circumference of the circle) and height h.",
        latex: "2\\pi r h=\\text{circumference}\\times\\text{height}=\\text{unrolled rectangle}",
      },
      {
        explanation:
          "For a cylinder with one open end (like a cup), subtract one circular face: use πr² + 2πrh.",
        latex: "\\text{One open end: }SA=\\pi r^2+2\\pi rh",
      },
    ],
    finalAnswerLatex: "SA_{\\text{closed}}=2\\pi r^2+2\\pi rh,\\quad SA_{\\text{open top}}=\\pi r^2+2\\pi rh",
  },
];

const surfaceAreaCylindersGuided: PracticeQuestion[] = [
  measAnswer(
    "sa-cyl-g1",
    "A closed cylinder has radius 5 cm and height 12 cm. Find its surface area to 1 decimal place.",
    "r=5\\text{ cm},\\;h=12\\text{ cm}",
    "534.1",
    ["534.1 cm²", "534.1 cm^2"],
    "SA = 2π(5²) + 2π(5)(12) = 50π + 120π = 170π."
  ),
  measAnswer(
    "sa-cyl-g2",
    "A closed cylinder has radius 2 m and height 6 m. Find its surface area in terms of π.",
    "r=2\\text{ m},\\;h=6\\text{ m}",
    "32π",
    ["32π m²", "32π m^2", "32pi"],
    "SA = 2π(4) + 2π(2)(6) = 8π + 24π = 32π."
  ),
  measChoice(
    "sa-cyl-g3",
    "A cylinder has radius r and height h. Which expression gives its lateral (curved) surface area only?",
    "C",
    [
      "$2\\pi r^2$",
      "$\\pi r^2 h$",
      "$2\\pi r h$",
      "$2\\pi r^2 + 2\\pi r h$",
    ],
    "The lateral surface unrolls into a rectangle with dimensions 2πr (circumference) by h (height), giving area 2πrh. The term 2πr² covers the two circular ends."
  ),
  measAnswer(
    "sa-cyl-g4",
    "An open-top cylindrical tank has radius 3 m and height 5 m. Find its surface area to 1 decimal place.",
    "r=3\\text{ m},\\;h=5\\text{ m},\\;\\text{open top}",
    "122.5",
    ["122.5 m²", "122.5 m^2"],
    "SA = π(9) + 2π(3)(5) = 9π + 30π = 39π ≈ 122.5."
  ),
];

const surfaceAreaCylindersIndependent: PracticeQuestion[] = [
  measAnswer(
    "sa-cyl-i1",
    "A closed cylinder has radius 6 cm and height 9 cm. Find its surface area to 1 decimal place.",
    "r=6\\text{ cm},\\;h=9\\text{ cm}",
    "565.5",
    ["565.5 cm²", "565.5 cm^2"],
    "SA = 2π(36) + 2π(6)(9) = 72π + 108π = 180π."
  ),
  measAnswer(
    "sa-cyl-i2",
    "A closed cylinder has diameter 8 cm and height 5 cm. Find its surface area to 1 decimal place.",
    "d=8\\text{ cm}\\Rightarrow r=4\\text{ cm},\\;h=5\\text{ cm}",
    "226.2",
    ["226.2 cm²", "226.2 cm^2"],
    "r = 4. SA = 2π(16) + 2π(4)(5) = 32π + 40π = 72π."
  ),
  measAnswer(
    "sa-cyl-i3",
    "A closed cylinder has radius 1 m and height 10 m. Find its surface area in terms of π.",
    "r=1\\text{ m},\\;h=10\\text{ m}",
    "22π",
    ["22π m²", "22π m^2", "22pi"],
    "SA = 2π(1) + 2π(1)(10) = 2π + 20π = 22π."
  ),
  measChoice(
    "sa-cyl-i4",
    "A closed cylinder has radius 5 cm and height 4 cm. What is its surface area to the nearest cm²?",
    "B",
    ["$220\\text{ cm}^2$", "$283\\text{ cm}^2$", "$314\\text{ cm}^2$", "$157\\text{ cm}^2$"],
    "SA = 2π(25) + 2π(5)(4) = 50π + 40π = 90π ≈ 282.7 ≈ 283 cm².",
    "r=5\\text{ cm},\\;h=4\\text{ cm}"
  ),
  measAnswer(
    "sa-cyl-i5",
    "A cylinder with no base (only the curved surface and one circular top) has radius 7 cm and height 3 cm. Find its surface area to 1 decimal place.",
    "r=7\\text{ cm},\\;h=3\\text{ cm},\\;\\text{one circular face only}",
    "285.9",
    ["285.9 cm²", "285.9 cm^2"],
    "SA = π(49) + 2π(7)(3) = 49π + 42π = 91π ≈ 285.9."
  ),
];

const surfaceAreaCylindersMistakes = [
  {
    mistake:
      "Using the diameter instead of the radius in the formula — substituting d into r without halving it first.",
    fix:
      "Always halve the diameter to get the radius before substituting: r = d ÷ 2. Check that r < h is plausible for the shape described.",
  },
  {
    mistake:
      "Forgetting the two circular ends and only calculating the curved lateral surface 2πrh.",
    fix:
      "The full formula for a closed cylinder is SA = 2πr² + 2πrh. The term 2πr² adds both circular faces. Sketch a net (two circles plus a rectangle) before writing the formula.",
  },
  {
    mistake:
      "Squaring after multiplying — writing 2 × π × r × r as 2πr then squaring the whole thing, getting (2πr)² instead of 2πr².",
    fix:
      "Square only the radius: 2πr² means 2 × π × (r²). Substitute the value of r first, then square it: 2 × π × 3² = 2 × π × 9 = 18π.",
  },
  {
    mistake:
      "Using the same formula for open and closed cylinders — including both circular ends when the problem specifies no lid.",
    fix:
      "Read the problem carefully. An open-top cylinder (like a cup or tank without a lid) uses SA = πr² + 2πrh — only one circular end. A closed cylinder uses SA = 2πr² + 2πrh.",
  },
];

const surfaceAreaCylindersMastery: PracticeQuestion[] = [
  measAnswer(
    "sa-cyl-m1",
    "A closed cylinder has radius 4 cm and height 6 cm. Find its surface area to 1 decimal place.",
    "r=4\\text{ cm},\\;h=6\\text{ cm}",
    "251.3",
    ["251.3 cm²", "251.3 cm^2"],
    "SA = 2π(16) + 2π(4)(6) = 32π + 48π = 80π."
  ),
  measAnswer(
    "sa-cyl-m2",
    "A closed cylinder has diameter 10 cm and height 8 cm. Find its surface area to 1 decimal place.",
    "d=10\\Rightarrow r=5\\text{ cm},\\;h=8\\text{ cm}",
    "408.4",
    ["408.4 cm²", "408.4 cm^2"],
    "SA = 2π(25) + 2π(5)(8) = 50π + 80π = 130π."
  ),
  measChoice(
    "sa-cyl-m3",
    "A closed cylinder has radius 3 cm and height 7 cm. What is its surface area in terms of π?",
    "A",
    ["$60\\pi\\text{ cm}^2$", "$54\\pi\\text{ cm}^2$", "$48\\pi\\text{ cm}^2$", "$42\\pi\\text{ cm}^2$"],
    "SA = 2π(9) + 2π(3)(7) = 18π + 42π = 60π cm².",
    "r=3\\text{ cm},\\;h=7\\text{ cm}"
  ),
  measAnswer(
    "sa-cyl-m4",
    "An open-top cylinder has radius 5 cm and height 10 cm. Find its surface area to 1 decimal place.",
    "r=5\\text{ cm},\\;h=10\\text{ cm},\\;\\text{open top}",
    "392.7",
    ["392.7 cm²", "392.7 cm^2"],
    "SA = π(25) + 2π(5)(10) = 25π + 100π = 125π."
  ),
  measChoice(
    "sa-cyl-m5",
    "A student calculates the surface area of a cylinder with r = 6 cm and h = 4 cm as 2π(6)(4) = 48π cm². What is missing?",
    "B",
    [
      "Nothing is missing — 48π cm² is correct.",
      "The two circular ends — the full answer is 2π(36) + 48π = 72π + 48π = 120π cm².",
      "The height was used incorrectly — it should be squared.",
      "The diameter was used instead of the radius.",
    ],
    "The student only computed the curved lateral surface 2πrh = 48π. They omitted the two circular ends 2πr² = 72π. Total SA = 120π ≈ 376.99 cm².",
    "r=6\\text{ cm},\\;h=4\\text{ cm}"
  ),
  measAnswer(
    "sa-cyl-m6",
    "A closed cylinder has radius 2 cm and height 2 cm. Find its surface area in terms of π.",
    "r=2\\text{ cm},\\;h=2\\text{ cm}",
    "16π",
    ["16π cm²", "16π cm^2", "16pi"],
    "SA = 2π(4) + 2π(2)(2) = 8π + 8π = 16π."
  ),
  measChoice(
    "sa-cyl-m7",
    "A closed cylinder has radius r and height equal to r. Which expression gives its surface area?",
    "B",
    [
      "$2\\pi r^2$",
      "$4\\pi r^2$",
      "$6\\pi r^2$",
      "$8\\pi r^2$",
    ],
    "SA = 2πr² + 2πrh. With h = r: SA = 2πr² + 2πr(r) = 2πr² + 2πr² = 4πr².",
    "h=r"
  ),
  measAnswer(
    "sa-cyl-m8",
    "A closed cylinder has diameter 14 cm and height 10 cm. Find its surface area to 1 decimal place.",
    "d=14\\Rightarrow r=7\\text{ cm},\\;h=10\\text{ cm}",
    "747.7",
    ["747.7 cm²", "747.7 cm^2"],
    "SA = 2π(49) + 2π(7)(10) = 98π + 140π = 238π."
  ),
  measAnswer(
    "sa-cyl-m9",
    "A closed cylinder has radius 10 cm and height 1 cm. Find its surface area to 1 decimal place.",
    "r=10\\text{ cm},\\;h=1\\text{ cm}",
    "691.2",
    ["691.2 cm²", "691.2 cm^2"],
    "SA = 2π(100) + 2π(10)(1) = 200π + 20π = 220π."
  ),
  measAnswer(
    "sa-cyl-m10",
    "An open-top cylinder has diameter 12 cm and height 8 cm. Find its surface area to 1 decimal place.",
    "d=12\\Rightarrow r=6\\text{ cm},\\;h=8\\text{ cm},\\;\\text{open top}",
    "414.7",
    ["414.7 cm²", "414.7 cm^2"],
    "SA = π(36) + 2π(6)(8) = 36π + 96π = 132π."
  ),
];

// ─── Lesson 3: Volume of Prisms and Cylinders ─────────────────────────────────

const volumePrismsCylindersWorkedExamples: WorkedExample[] = [
  {
    title: "Volume of a rectangular prism",
    questionLatex:
      "\\text{Find the volume of a rectangular prism with length 5 cm, width 4 cm, and height 3 cm.}",
    steps: [
      {
        explanation:
          "The volume of a prism is the area of the cross-section multiplied by the length (or height).",
        latex: "V=l\\times w\\times h",
      },
      {
        explanation: "Substitute the dimensions.",
        latex: "V=5\\times 4\\times 3",
      },
      {
        explanation: "Calculate.",
        latex: "V=60\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V=60\\text{ cm}^3",
  },
  {
    title: "Volume of a triangular prism",
    questionLatex:
      "\\text{A triangular prism has a cross-section with base 6 cm and perpendicular height 4 cm. The prism is 10 cm long. Find its volume.}",
    steps: [
      {
        explanation:
          "Find the area of the triangular cross-section first.",
        latex: "A_{\\text{triangle}}=\\tfrac{1}{2}\\times 6\\times 4=12\\text{ cm}^2",
      },
      {
        explanation: "Multiply by the length of the prism.",
        latex: "V=A_{\\text{cross-section}}\\times l=12\\times 10",
      },
      {
        explanation: "Calculate.",
        latex: "V=120\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V=120\\text{ cm}^3",
  },
  {
    title: "Volume of a cylinder — forward and reverse",
    questionLatex:
      "\\text{(a) A cylinder has radius 5 cm and height 8 cm. Find its volume to 1 decimal place.}\\\\\\text{(b) A cylinder has volume 300 cm}^3\\text{ and radius 5 cm. Find its height to 1 decimal place.}",
    steps: [
      {
        explanation: "(a) Write the volume formula for a cylinder.",
        latex: "V=\\pi r^2 h",
      },
      {
        explanation: "Substitute r = 5 and h = 8.",
        latex: "V=\\pi(5)^2(8)=200\\pi\\approx 628.3\\text{ cm}^3",
      },
      {
        explanation: "(b) Rearrange V = πr²h to solve for h.",
        latex: "h=\\frac{V}{\\pi r^2}=\\frac{300}{\\pi\\times 25}=\\frac{300}{25\\pi}\\approx 3.8\\text{ cm}",
      },
    ],
    finalAnswerLatex:
      "\\text{(a) }V\\approx 628.3\\text{ cm}^3\\quad\\text{(b) }h\\approx 3.8\\text{ cm}",
  },
];

const volumePrismsCylindersGuided: PracticeQuestion[] = [
  measAnswer(
    "vol-g1",
    "Find the volume of a rectangular prism with dimensions 8 cm × 3 cm × 5 cm.",
    "l=8,\\;w=3,\\;h=5\\text{ cm}",
    "120",
    ["120 cm³", "120 cm^3"]
  ),
  measAnswer(
    "vol-g2",
    "A triangular prism has a cross-section with base 10 cm and perpendicular height 6 cm, and the prism is 8 cm long. Find its volume.",
    "\\text{triangle base }10,\\;\\text{height }6,\\;\\text{length }8\\text{ cm}",
    "240",
    ["240 cm³", "240 cm^3"],
    "V = ½ × 10 × 6 × 8."
  ),
  measAnswer(
    "vol-g3",
    "A cylinder has radius 4 cm and height 10 cm. Find its volume to 1 decimal place.",
    "r=4\\text{ cm},\\;h=10\\text{ cm}",
    "502.7",
    ["502.7 cm³", "502.7 cm^3"],
    "V = π(16)(10) = 160π."
  ),
  measChoice(
    "vol-g4",
    "Which formula gives the volume of any prism or cylinder?",
    "A",
    [
      "$V = A_{\\text{cross-section}} \\times l$",
      "$V = P_{\\text{cross-section}} \\times l$",
      "$V = 2A_{\\text{cross-section}} + P_{\\text{cross-section}} \\times l$",
      "$V = A_{\\text{cross-section}} + l$",
    ],
    "Volume of a prism or cylinder = area of cross-section × length. The perimeter formula applies to surface area, not volume."
  ),
];

const volumePrismsCylindersIndependent: PracticeQuestion[] = [
  measAnswer(
    "vol-i1",
    "Find the volume of a cube with side length 7 cm.",
    "\\text{cube, }s=7\\text{ cm}",
    "343",
    ["343 cm³", "343 cm^3"]
  ),
  measAnswer(
    "vol-i2",
    "A triangular prism has a right-triangle cross-section with legs 5 cm and 12 cm. The prism is 20 cm long. Find its volume.",
    "\\text{legs }5,12\\text{ cm; length }20\\text{ cm}",
    "600",
    ["600 cm³", "600 cm^3"],
    "V = ½ × 5 × 12 × 20."
  ),
  measAnswer(
    "vol-i3",
    "A cylinder has diameter 10 cm and height 6 cm. Find its volume to 1 decimal place.",
    "d=10\\Rightarrow r=5\\text{ cm},\\;h=6\\text{ cm}",
    "471.2",
    ["471.2 cm³", "471.2 cm^3"],
    "V = π(25)(6) = 150π."
  ),
  measAnswer(
    "vol-i4",
    "A cylinder has volume 400π cm³ and radius 10 cm. Find its height.",
    "V=400\\pi\\text{ cm}^3,\\;r=10\\text{ cm}",
    "4",
    ["4 cm"],
    "h = 400π / (π × 100) = 400/100 = 4."
  ),
  measChoice(
    "vol-i5",
    "A rectangular prism has volume 360 cm³ and a 6 cm × 5 cm base. What is its height?",
    "C",
    ["$10\\text{ cm}$", "$15\\text{ cm}$", "$12\\text{ cm}$", "$6\\text{ cm}$"],
    "V = base area × height → 360 = 30 × h → h = 12 cm.",
    "V=360\\text{ cm}^3,\\;\\text{base }6\\times 5"
  ),
];

const volumePrismsCylindersMistakes = [
  {
    mistake:
      "Confusing surface area and volume — using a surface area formula (which involves a perimeter or adding faces) when asked for volume.",
    fix:
      "Volume is measured in cubic units (cm³) and tells you how much space the solid occupies. Always start by writing V = A_cross-section × length. If the formula has a '+' sign connecting face areas, it is surface area, not volume.",
  },
  {
    mistake:
      "Using the diameter instead of the radius in V = πr²h.",
    fix:
      "Always halve the diameter before substituting. If d = 8 cm, then r = 4 cm and r² = 16, not 64.",
  },
  {
    mistake:
      "Forgetting to find the cross-sectional area first for a triangular prism — multiplying base × height × length without the ½.",
    fix:
      "The cross-section is a triangle: A = ½ × base × height. Then V = A × length = ½ × base × height × length. Never skip the half.",
  },
  {
    mistake:
      "Rearranging V = πr²h incorrectly to find h — dividing by just π instead of by πr².",
    fix:
      "Isolate h by dividing both sides by πr²: h = V / (πr²). Enter this as V ÷ (π × r²) on the calculator. Dividing by only π gives r²h, not h.",
  },
];

const volumePrismsCylindersMastery: PracticeQuestion[] = [
  measAnswer(
    "vol-m1",
    "Find the volume of a rectangular prism with dimensions 9 cm × 4 cm × 5 cm.",
    "l=9,\\;w=4,\\;h=5\\text{ cm}",
    "180",
    ["180 cm³", "180 cm^3"]
  ),
  measAnswer(
    "vol-m2",
    "A cylinder has radius 3 cm and height 7 cm. Find its volume to 1 decimal place.",
    "r=3\\text{ cm},\\;h=7\\text{ cm}",
    "197.9",
    ["197.9 cm³", "197.9 cm^3"],
    "V = π(9)(7) = 63π."
  ),
  measChoice(
    "vol-m3",
    "A triangular prism has cross-section base 8 cm, height 5 cm, and prism length 6 cm. What is its volume?",
    "B",
    ["$240\\text{ cm}^3$", "$120\\text{ cm}^3$", "$80\\text{ cm}^3$", "$60\\text{ cm}^3$"],
    "V = ½ × 8 × 5 × 6 = 20 × 6 = 120 cm³.",
    "\\text{base }8,\\text{ height }5,\\text{ length }6\\text{ cm}"
  ),
  measAnswer(
    "vol-m4",
    "A cylinder has diameter 6 cm and height 10 cm. Find its volume to 1 decimal place.",
    "d=6\\Rightarrow r=3\\text{ cm},\\;h=10\\text{ cm}",
    "282.7",
    ["282.7 cm³", "282.7 cm^3"],
    "V = π(9)(10) = 90π."
  ),
  measChoice(
    "vol-m5",
    "A cylinder has volume 200π cm³ and height 8 cm. What is its radius?",
    "C",
    ["$4\\text{ cm}$", "$6\\text{ cm}$", "$5\\text{ cm}$", "$10\\text{ cm}$"],
    "V = πr²h → 200π = πr²(8) → r² = 200/8 = 25 → r = 5 cm.",
    "V=200\\pi\\text{ cm}^3,\\;h=8\\text{ cm}"
  ),
  measAnswer(
    "vol-m6",
    "A rectangular prism has a square base of side 6 cm and volume 216 cm³. Find its height.",
    "\\text{square base }s=6\\text{ cm},\\;V=216\\text{ cm}^3",
    "6",
    ["6 cm"],
    "V = 36 × h = 216 → h = 6 cm."
  ),
  measAnswer(
    "vol-m7",
    "A triangular prism has a right-triangle cross-section with legs 8 cm and 15 cm, and is 12 cm long. Find its volume.",
    "\\text{legs }8,15\\text{ cm; length }12\\text{ cm}",
    "720",
    ["720 cm³", "720 cm^3"],
    "V = ½ × 8 × 15 × 12 = 60 × 12 = 720."
  ),
  measChoice(
    "vol-m8",
    "A cylinder has radius 6 cm and height 4 cm. What is its volume to the nearest cm³?",
    "A",
    ["$452\\text{ cm}^3$", "$339\\text{ cm}^3$", "$226\\text{ cm}^3$", "$904\\text{ cm}^3$"],
    "V = π(36)(4) = 144π ≈ 452.4 ≈ 452 cm³.",
    "r=6\\text{ cm},\\;h=4\\text{ cm}"
  ),
  measAnswer(
    "vol-m9",
    "A cylinder has volume 500 cm³ and height 5 cm. Find its radius to 1 decimal place.",
    "V=500\\text{ cm}^3,\\;h=5\\text{ cm}",
    "5.6",
    ["5.6 cm"],
    "r² = 500 / (5π) = 100/π ≈ 31.83 → r ≈ 5.6."
  ),
  measChoice(
    "vol-m10",
    "A swimming pool is a rectangular prism 10 m long, 4 m wide, and 1.5 m deep. How many litres of water does it hold? (1 m³ = 1000 L)",
    "B",
    ["$6000\\text{ L}$", "$60000\\text{ L}$", "$600\\text{ L}$", "$600000\\text{ L}$"],
    "V = 10 × 4 × 1.5 = 60 m³. Converting: 60 × 1000 = 60 000 L.",
    "l=10,\\;w=4,\\;h=1.5\\text{ m}"
  ),
];

// ─── Lesson 4: Surface Area and Volume of Pyramids ───────────────────────────

const pyramidsWorkedExamples: WorkedExample[] = [
  {
    title: "Volume of a square pyramid",
    questionLatex:
      "\\text{A square pyramid has a base side of 6 cm and a perpendicular height of 8 cm. Find its volume.}",
    steps: [
      {
        explanation:
          "The volume of any pyramid is one-third of the base area multiplied by the perpendicular (vertical) height.",
        latex: "V=\\tfrac{1}{3}\\times A_{\\text{base}}\\times h",
      },
      {
        explanation: "The base is a square. Find its area: 6 × 6 = 36 cm².",
        latex: "A_{\\text{base}}=6^2=36\\text{ cm}^2",
      },
      {
        explanation: "Substitute and calculate.",
        latex: "V=\\tfrac{1}{3}\\times 36\\times 8=\\tfrac{288}{3}=96\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V=96\\text{ cm}^3",
  },
  {
    title: "Surface area of a square pyramid",
    questionLatex:
      "\\text{A square pyramid has a base side of 5 cm and a slant height of 7 cm. Find its surface area.}",
    steps: [
      {
        explanation:
          "The surface area is the square base plus four congruent triangular faces. Each triangular face has base = side length and height = slant height (the height of the triangular face, not the pyramid's vertical height).",
        latex: "SA=s^2+4\\times\\tfrac{1}{2}\\times s\\times l",
      },
      {
        explanation: "Substitute s = 5 and l = 7.",
        latex: "SA=5^2+4\\times\\tfrac{1}{2}\\times 5\\times 7=25+4\\times 17.5",
      },
      {
        explanation: "Calculate.",
        latex: "SA=25+70=95\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA=95\\text{ cm}^2",
  },
  {
    title: "Finding the height from the volume",
    questionLatex:
      "\\text{A rectangular pyramid has base dimensions 6 cm × 4 cm and volume 80 cm}^3.\\text{ Find its perpendicular height.}",
    steps: [
      {
        explanation: "Write the volume formula.",
        latex: "V=\\tfrac{1}{3}\\times l\\times w\\times h",
      },
      {
        explanation: "Substitute V = 80, l = 6, w = 4.",
        latex: "80=\\tfrac{1}{3}\\times 24\\times h=8h",
      },
      {
        explanation: "Solve for h.",
        latex: "h=\\frac{80}{8}=10\\text{ cm}",
      },
    ],
    finalAnswerLatex: "h=10\\text{ cm}",
  },
];

const pyramidsGuided: PracticeQuestion[] = [
  measAnswer(
    "pyr-g1",
    "A rectangular pyramid has base dimensions 6 cm × 4 cm and perpendicular height 9 cm. Find its volume.",
    "l=6\\text{ cm},\\;w=4\\text{ cm},\\;h=9\\text{ cm}",
    "72",
    ["72 cm³", "72 cm^3"],
    "V = (1/3) × base area × height = (1/3) × 24 × 9."
  ),
  measAnswer(
    "pyr-g2",
    "A square pyramid has base side 4 cm and slant height 5 cm. Find its surface area.",
    "s=4\\text{ cm},\\;l=5\\text{ cm (slant height)}",
    "56",
    ["56 cm²", "56 cm^2"],
    "SA = s² + 4 × (½ × s × l) = 16 + 4 × 10."
  ),
  measChoice(
    "pyr-g3",
    "A square pyramid is 12 cm tall (perpendicular height) and has a slant height of 14 cm. Which measurement do you use to find the volume?",
    "A",
    [
      "The perpendicular height of 12 cm — volume uses the vertical distance from base to apex.",
      "The slant height of 14 cm — this is the height of the pyramid.",
      "Either — both give the same volume.",
      "The average of both: (12 + 14) ÷ 2 = 13 cm.",
    ],
    "Volume = (1/3) × base area × perpendicular height. The slant height is used only in surface area calculations. It is always longer than the perpendicular height."
  ),
  measAnswer(
    "pyr-g4",
    "A square pyramid has base side 9 cm and perpendicular height 6 cm. Find its volume.",
    "s=9\\text{ cm},\\;h=6\\text{ cm}",
    "162",
    ["162 cm³", "162 cm^3"],
    "V = (1/3) × 81 × 6."
  ),
];

const pyramidsIndependent: PracticeQuestion[] = [
  measAnswer(
    "pyr-i1",
    "A square pyramid has base side 5 cm and perpendicular height 12 cm. Find its volume.",
    "s=5\\text{ cm},\\;h=12\\text{ cm}",
    "100",
    ["100 cm³", "100 cm^3"]
  ),
  measAnswer(
    "pyr-i2",
    "A square pyramid has base side 8 cm and slant height 10 cm. Find its surface area.",
    "s=8\\text{ cm},\\;l=10\\text{ cm (slant height)}",
    "224",
    ["224 cm²", "224 cm^2"],
    "SA = 8² + 4 × (½ × 8 × 10)."
  ),
  measAnswer(
    "pyr-i3",
    "A rectangular pyramid has base dimensions 10 cm × 3 cm and perpendicular height 8 cm. Find its volume.",
    "l=10\\text{ cm},\\;w=3\\text{ cm},\\;h=8\\text{ cm}",
    "80",
    ["80 cm³", "80 cm^3"]
  ),
  measAnswer(
    "pyr-i4",
    "A square pyramid has base side 6 cm and volume 60 cm³. Find its perpendicular height.",
    "s=6\\text{ cm},\\;V=60\\text{ cm}^3",
    "5",
    ["5 cm"],
    "60 = (1/3) × 36 × h → 60 = 12h → h = 5."
  ),
  measChoice(
    "pyr-i5",
    "A student calculates the volume of a square pyramid with base 4 cm and height 6 cm as V = 4² × 6 = 96 cm³. What error did they make?",
    "B",
    [
      "They used the wrong formula for the base area.",
      "They forgot to multiply by 1/3 — the correct answer is 32 cm³.",
      "They used the slant height instead of the perpendicular height.",
      "They should have used V = 4 × 6 = 24 cm³.",
    ],
    "V = (1/3) × s² × h = (1/3) × 16 × 6 = 32 cm³. The student correctly found the base area (16) and multiplied by h (6) but omitted the factor of 1/3."
  ),
];

const pyramidsMistakes = [
  {
    mistake:
      "Forgetting to multiply by 1/3 — computing volume as base area × height instead of (1/3) × base area × height.",
    fix:
      "A pyramid's volume is always one-third of the equivalent prism's volume. Write V = (1/3) × A_base × h before substituting. The 1/3 is not optional.",
  },
  {
    mistake:
      "Using the slant height instead of the perpendicular height in the volume formula.",
    fix:
      "The slant height is the length along the face of the pyramid from apex to base edge — it is always longer than the perpendicular height. The volume formula V = (1/3) × A_base × h uses only the perpendicular (vertical) height.",
  },
  {
    mistake:
      "Forgetting the base face when calculating surface area — adding only the four triangular faces.",
    fix:
      "A square pyramid has 5 faces: 1 square base and 4 triangular faces. Always include the base: SA = s² + 4 × (½ × s × l).",
  },
  {
    mistake:
      "Using the pyramid's perpendicular height in the surface area formula instead of the slant height.",
    fix:
      "The triangular faces are slanted, so their 'height' (measured from apex to base edge along the face) is the slant height l, not the pyramid's vertical height h. The slant height is always greater than the vertical height.",
  },
];

const pyramidsMastery: PracticeQuestion[] = [
  measAnswer(
    "pyr-m1",
    "A square pyramid has base side 3 cm and perpendicular height 5 cm. Find its volume.",
    "s=3\\text{ cm},\\;h=5\\text{ cm}",
    "15",
    ["15 cm³", "15 cm^3"]
  ),
  measAnswer(
    "pyr-m2",
    "A square pyramid has base side 6 cm and slant height 5 cm. Find its surface area.",
    "s=6\\text{ cm},\\;l=5\\text{ cm (slant height)}",
    "96",
    ["96 cm²", "96 cm^2"],
    "SA = 36 + 4 × (½ × 6 × 5) = 36 + 60."
  ),
  measChoice(
    "pyr-m3",
    "Which formula gives the surface area of a square pyramid with base side s and slant height l?",
    "C",
    [
      "$SA=\\tfrac{1}{3}s^2 l$",
      "$SA=s^2+4sl$",
      "$SA=s^2+2sl$",
      "$SA=4\\times\\tfrac{1}{2}\\times s\\times l$",
    ],
    "SA = base area + 4 triangular faces = s² + 4 × (½ × s × l) = s² + 2sl. Option B misses the ½ factor; option D omits the base."
  ),
  measAnswer(
    "pyr-m4",
    "A rectangular pyramid has base 8 cm × 5 cm and perpendicular height 9 cm. Find its volume.",
    "l=8\\text{ cm},\\;w=5\\text{ cm},\\;h=9\\text{ cm}",
    "120",
    ["120 cm³", "120 cm^3"]
  ),
  measAnswer(
    "pyr-m5",
    "A square pyramid has base side 10 cm and slant height 13 cm. Find its surface area.",
    "s=10\\text{ cm},\\;l=13\\text{ cm (slant height)}",
    "360",
    ["360 cm²", "360 cm^2"],
    "SA = 100 + 4 × (½ × 10 × 13) = 100 + 260."
  ),
  measAnswer(
    "pyr-m6",
    "A rectangular pyramid has base dimensions 10 cm × 5 cm and volume 200 cm³. Find its perpendicular height.",
    "l=10\\text{ cm},\\;w=5\\text{ cm},\\;V=200\\text{ cm}^3",
    "12",
    ["12 cm"],
    "200 = (1/3) × 50 × h → h = 200 × 3 / 50 = 12."
  ),
  measAnswer(
    "pyr-m7",
    "A square pyramid has base side 12 cm and perpendicular height 7 cm. Find its volume.",
    "s=12\\text{ cm},\\;h=7\\text{ cm}",
    "336",
    ["336 cm³", "336 cm^3"]
  ),
  measAnswer(
    "pyr-m8",
    "A square pyramid has base side 9 cm and slant height 12 cm. Find its surface area.",
    "s=9\\text{ cm},\\;l=12\\text{ cm (slant height)}",
    "297",
    ["297 cm²", "297 cm^2"],
    "SA = 81 + 4 × (½ × 9 × 12) = 81 + 216."
  ),
  measAnswer(
    "pyr-m9",
    "A square pyramid has base side 6 cm and volume 120 cm³. Find its perpendicular height.",
    "s=6\\text{ cm},\\;V=120\\text{ cm}^3",
    "10",
    ["10 cm"],
    "120 = (1/3) × 36 × h → h = 120 × 3 / 36 = 10."
  ),
  measAnswer(
    "pyr-m10",
    "A square pyramid has base side 8 cm and volume 192 cm³. Find its perpendicular height.",
    "s=8\\text{ cm},\\;V=192\\text{ cm}^3",
    "9",
    ["9 cm"],
    "192 = (1/3) × 64 × h → h = 192 × 3 / 64 = 9."
  ),
];

// ─── Lesson 5: Surface Area and Volume of Cones ───────────────────────────────

const conesWorkedExamples: WorkedExample[] = [
  {
    title: "Volume of a cone",
    questionLatex:
      "\\text{A cone has radius 6 cm and perpendicular height 8 cm. Find its volume to 1 decimal place.}",
    steps: [
      {
        explanation:
          "Like a pyramid, a cone's volume is one-third of the base area multiplied by the perpendicular height. The base is a circle of area πr².",
        latex: "V=\\tfrac{1}{3}\\pi r^2 h",
      },
      {
        explanation: "Substitute r = 6 and h = 8.",
        latex: "V=\\tfrac{1}{3}\\times\\pi\\times 36\\times 8=96\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "V=96\\pi\\approx 301.6\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V\\approx 301.6\\text{ cm}^3",
  },
  {
    title: "Curved surface area of a cone",
    questionLatex:
      "\\text{A cone has radius 5 cm and slant height 13 cm. Find its curved surface area to 1 decimal place.}",
    steps: [
      {
        explanation:
          "The curved surface area (CSA) of a cone uses the slant height l — the distance from the apex to any point on the base circle edge. CSA = πrl.",
        latex: "CSA=\\pi r l",
      },
      {
        explanation: "Substitute r = 5 and l = 13.",
        latex: "CSA=\\pi\\times 5\\times 13=65\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "CSA=65\\pi\\approx 204.2\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "CSA\\approx 204.2\\text{ cm}^2",
  },
  {
    title: "Total surface area of a cone",
    questionLatex:
      "\\text{A cone has radius 4 cm and slant height 5 cm. Find its total surface area to 1 decimal place.}",
    steps: [
      {
        explanation:
          "The total surface area (TSA) of a closed cone is the circular base plus the curved surface: TSA = πr² + πrl.",
        latex: "TSA=\\pi r^2+\\pi r l",
      },
      {
        explanation: "Substitute r = 4 and l = 5.",
        latex: "TSA=\\pi\\times 16+\\pi\\times 4\\times 5=16\\pi+20\\pi=36\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "TSA=36\\pi\\approx 113.1\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "TSA\\approx 113.1\\text{ cm}^2",
  },
];

const conesGuided: PracticeQuestion[] = [
  measAnswer(
    "cone-g1",
    "A cone has radius 3 cm and perpendicular height 4 cm. Find its volume to 1 decimal place.",
    "r=3\\text{ cm},\\;h=4\\text{ cm}",
    "37.7",
    ["37.7 cm³", "37.7 cm^3"],
    "V = (1/3)π(9)(4) = 12π."
  ),
  measAnswer(
    "cone-g2",
    "A cone has radius 6 cm and slant height 10 cm. Find its curved surface area to 1 decimal place.",
    "r=6\\text{ cm},\\;l=10\\text{ cm (slant height)}",
    "188.5",
    ["188.5 cm²", "188.5 cm^2"],
    "CSA = π × 6 × 10 = 60π."
  ),
  measAnswer(
    "cone-g3",
    "A cone has radius 5 cm and slant height 12 cm. Find its total surface area to 1 decimal place.",
    "r=5\\text{ cm},\\;l=12\\text{ cm (slant height)}",
    "267.0",
    ["267.0 cm²", "267.0 cm^2"],
    "TSA = π(25) + π(5)(12) = 25π + 60π = 85π."
  ),
  measChoice(
    "cone-g4",
    "Which formula gives the total surface area of a closed cone with radius r and slant height l?",
    "D",
    [
      "$TSA=\\pi r l$",
      "$TSA=\\tfrac{1}{3}\\pi r^2 h$",
      "$TSA=\\pi r^2$",
      "$TSA=\\pi r^2+\\pi r l$",
    ],
    "TSA = πr² (circular base) + πrl (curved surface). Option A is only the curved surface; option B is the volume formula; option C is only the base."
  ),
];

const conesIndependent: PracticeQuestion[] = [
  measAnswer(
    "cone-i1",
    "A cone has radius 5 cm and perpendicular height 12 cm. Find its volume to 1 decimal place.",
    "r=5\\text{ cm},\\;h=12\\text{ cm}",
    "314.2",
    ["314.2 cm³", "314.2 cm^3"],
    "V = (1/3)π(25)(12) = 100π."
  ),
  measAnswer(
    "cone-i2",
    "A cone has radius 3 cm and slant height 5 cm. Find its curved surface area to 1 decimal place.",
    "r=3\\text{ cm},\\;l=5\\text{ cm (slant height)}",
    "47.1",
    ["47.1 cm²", "47.1 cm^2"],
    "CSA = π × 3 × 5 = 15π."
  ),
  measAnswer(
    "cone-i3",
    "A cone has radius 6 cm and slant height 8 cm. Find its total surface area to 1 decimal place.",
    "r=6\\text{ cm},\\;l=8\\text{ cm (slant height)}",
    "263.9",
    ["263.9 cm²", "263.9 cm^2"],
    "TSA = π(36) + π(6)(8) = 36π + 48π = 84π."
  ),
  measAnswer(
    "cone-i4",
    "A cone has volume 48π cm³ and radius 6 cm. Find its perpendicular height.",
    "V=48\\pi\\text{ cm}^3,\\;r=6\\text{ cm}",
    "4",
    ["4 cm"],
    "48π = (1/3)π(36)h → 48 = 12h → h = 4."
  ),
  measChoice(
    "cone-i5",
    "A cone has diameter 8 cm and height 9 cm. What is its volume to 1 decimal place?",
    "A",
    ["$150.8\\text{ cm}^3$", "$452.4\\text{ cm}^3$", "$603.2\\text{ cm}^3$", "$37.7\\text{ cm}^3$"],
    "r = d/2 = 4 cm. V = (1/3)π(16)(9) = 48π ≈ 150.8 cm³. Option B omits the 1/3. Option C uses d=8 as if it were the radius. Option D incorrectly uses r=2.",
    "d=8\\text{ cm},\\;h=9\\text{ cm}"
  ),
];

const conesMistakes = [
  {
    mistake:
      "Forgetting to multiply by 1/3 in the volume formula — computing V = πr²h instead of V = (1/3)πr²h.",
    fix:
      "A cone holds exactly one-third the volume of a cylinder with the same base and height. Always write V = (1/3)πr²h and keep the 1/3 through to the final calculation.",
  },
  {
    mistake:
      "Using the perpendicular height instead of the slant height in the curved surface area formula CSA = πrl.",
    fix:
      "The slant height l is the length of the sloped side from apex to base circle. It is always longer than the perpendicular height h. Use l in CSA = πrl and h in V = (1/3)πr²h.",
  },
  {
    mistake:
      "Using the diameter instead of the radius — substituting d into r without halving first.",
    fix:
      "Always halve the diameter to get the radius before substituting into any cone formula. r = d ÷ 2. Squaring the diameter instead gives a volume four times too large.",
  },
  {
    mistake:
      "Forgetting the base circle when calculating total surface area — computing only the curved surface area πrl.",
    fix:
      "A closed cone has two parts: a circular base (area πr²) and a curved lateral surface (area πrl). Total SA = πr² + πrl. If the cone has no base (like an ice-cream cone without the scoop base), use CSA = πrl only.",
  },
];

const conesMastery: PracticeQuestion[] = [
  measAnswer(
    "cone-m1",
    "A cone has radius 3 cm and perpendicular height 8 cm. Find its volume to 1 decimal place.",
    "r=3\\text{ cm},\\;h=8\\text{ cm}",
    "75.4",
    ["75.4 cm³", "75.4 cm^3"],
    "V = (1/3)π(9)(8) = 24π."
  ),
  measAnswer(
    "cone-m2",
    "A cone has radius 4 cm and slant height 10 cm. Find its curved surface area to 1 decimal place.",
    "r=4\\text{ cm},\\;l=10\\text{ cm (slant height)}",
    "125.7",
    ["125.7 cm²", "125.7 cm^2"],
    "CSA = π × 4 × 10 = 40π."
  ),
  measChoice(
    "cone-m3",
    "Which measurement is needed for the volume of a cone but NOT for the curved surface area?",
    "B",
    [
      "The radius",
      "The perpendicular height",
      "The slant height",
      "π",
    ],
    "V = (1/3)πr²h uses the perpendicular height h. CSA = πrl uses the slant height l. The perpendicular height does not appear in the CSA formula."
  ),
  measAnswer(
    "cone-m4",
    "A cone has radius 4 cm and slant height 9 cm. Find its total surface area to 1 decimal place.",
    "r=4\\text{ cm},\\;l=9\\text{ cm (slant height)}",
    "163.4",
    ["163.4 cm²", "163.4 cm^2"],
    "TSA = π(16) + π(4)(9) = 16π + 36π = 52π."
  ),
  measAnswer(
    "cone-m5",
    "A cone has radius 9 cm and perpendicular height 4 cm. Find its volume to 1 decimal place.",
    "r=9\\text{ cm},\\;h=4\\text{ cm}",
    "339.3",
    ["339.3 cm³", "339.3 cm^3"],
    "V = (1/3)π(81)(4) = 108π."
  ),
  measAnswer(
    "cone-m6",
    "A cone has volume 75π cm³ and radius 5 cm. Find its perpendicular height.",
    "V=75\\pi\\text{ cm}^3,\\;r=5\\text{ cm}",
    "9",
    ["9 cm"],
    "75π = (1/3)π(25)h → 75 = (25/3)h → h = 9."
  ),
  measAnswer(
    "cone-m7",
    "A cone has radius 6 cm and slant height 10 cm. Find its total surface area to 1 decimal place.",
    "r=6\\text{ cm},\\;l=10\\text{ cm (slant height)}",
    "301.6",
    ["301.6 cm²", "301.6 cm^2"],
    "TSA = π(36) + π(6)(10) = 36π + 60π = 96π."
  ),
  measAnswer(
    "cone-m8",
    "A cone has diameter 12 cm and perpendicular height 7 cm. Find its volume to 1 decimal place.",
    "d=12\\Rightarrow r=6\\text{ cm},\\;h=7\\text{ cm}",
    "263.9",
    ["263.9 cm³", "263.9 cm^3"],
    "V = (1/3)π(36)(7) = 84π."
  ),
  measAnswer(
    "cone-m9",
    "A cone has radius 8 cm and perpendicular height 6 cm. Using the Pythagorean theorem to find the slant height, calculate the curved surface area to 1 decimal place.",
    "r=8\\text{ cm},\\;h=6\\text{ cm}",
    "251.3",
    ["251.3 cm²", "251.3 cm^2"],
    "l = √(r² + h²) = √(64 + 36) = √100 = 10 cm. CSA = π × 8 × 10 = 80π."
  ),
  measAnswer(
    "cone-m10",
    "A cone has radius 5 cm and perpendicular height 12 cm. Find the slant height using Pythagoras, then calculate the total surface area to 1 decimal place.",
    "r=5\\text{ cm},\\;h=12\\text{ cm}",
    "282.7",
    ["282.7 cm²", "282.7 cm^2"],
    "l = √(25 + 144) = √169 = 13 cm. TSA = π(25) + π(5)(13) = 25π + 65π = 90π."
  ),
];

// ─── Lesson 6: Surface Area and Volume of Spheres ─────────────────────────────

const spheresWorkedExamples: WorkedExample[] = [
  {
    title: "Surface area of a sphere",
    questionLatex:
      "\\text{Find the surface area of a sphere with radius 6 cm. Give your answer to 1 decimal place.}",
    steps: [
      {
        explanation:
          "The surface area of a sphere uses only the radius. Every point on the sphere is at the same distance r from the centre.",
        latex: "SA=4\\pi r^2",
      },
      {
        explanation: "Substitute r = 6.",
        latex: "SA=4\\times\\pi\\times 6^2=4\\times\\pi\\times 36=144\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "SA=144\\pi\\approx 452.4\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "SA\\approx 452.4\\text{ cm}^2",
  },
  {
    title: "Volume of a sphere",
    questionLatex:
      "\\text{Find the volume of a sphere with radius 3 cm. Give your answer to 1 decimal place.}",
    steps: [
      {
        explanation: "Write the volume formula for a sphere.",
        latex: "V=\\tfrac{4}{3}\\pi r^3",
      },
      {
        explanation: "Substitute r = 3. Cube the radius first.",
        latex: "V=\\tfrac{4}{3}\\times\\pi\\times 3^3=\\tfrac{4}{3}\\times\\pi\\times 27=36\\pi",
      },
      {
        explanation: "Evaluate.",
        latex: "V=36\\pi\\approx 113.1\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V\\approx 113.1\\text{ cm}^3",
  },
  {
    title: "Using a diameter to find surface area and volume",
    questionLatex:
      "\\text{A sphere has diameter 10 cm. Find its surface area and volume to 1 decimal place.}",
    steps: [
      {
        explanation: "The diameter is 10 cm, so the radius is r = 10 ÷ 2 = 5 cm.",
        latex: "r=\\frac{d}{2}=\\frac{10}{2}=5\\text{ cm}",
      },
      {
        explanation: "Surface area.",
        latex: "SA=4\\pi\\times 5^2=100\\pi\\approx 314.2\\text{ cm}^2",
      },
      {
        explanation: "Volume.",
        latex: "V=\\tfrac{4}{3}\\pi\\times 5^3=\\tfrac{500}{3}\\pi\\approx 523.6\\text{ cm}^3",
      },
    ],
    finalAnswerLatex:
      "SA\\approx 314.2\\text{ cm}^2,\\quad V\\approx 523.6\\text{ cm}^3",
  },
];

const spheresGuided: PracticeQuestion[] = [
  measAnswer(
    "sph-g1",
    "Find the surface area of a sphere with radius 4 cm. Give your answer to 1 decimal place.",
    "r=4\\text{ cm}",
    "201.1",
    ["201.1 cm²", "201.1 cm^2"],
    "SA = 4π(4²) = 64π."
  ),
  measAnswer(
    "sph-g2",
    "Find the volume of a sphere with radius 2 cm. Give your answer to 1 decimal place.",
    "r=2\\text{ cm}",
    "33.5",
    ["33.5 cm³", "33.5 cm^3"],
    "V = (4/3)π(2³) = (32/3)π."
  ),
  measChoice(
    "sph-g3",
    "A sphere has diameter 8 cm. Before applying any formula, what is the first step?",
    "C",
    [
      "Square the diameter: 8² = 64.",
      "Cube the diameter: 8³ = 512.",
      "Halve the diameter to find the radius: r = 4 cm.",
      "Multiply the diameter by π.",
    ],
    "Both SA = 4πr² and V = (4/3)πr³ require the radius, not the diameter. Always halve the diameter first: r = 8 ÷ 2 = 4 cm."
  ),
  measAnswer(
    "sph-g4",
    "Find the volume of a sphere with diameter 6 cm. Give your answer to 1 decimal place.",
    "d=6\\text{ cm}",
    "113.1",
    ["113.1 cm³", "113.1 cm^3"],
    "r = 3 cm. V = (4/3)π(27) = 36π."
  ),
];

const spheresIndependent: PracticeQuestion[] = [
  measAnswer(
    "sph-i1",
    "Find the surface area of a sphere with radius 7 cm. Give your answer to 1 decimal place.",
    "r=7\\text{ cm}",
    "615.8",
    ["615.8 cm²", "615.8 cm^2"],
    "SA = 4π(49) = 196π."
  ),
  measAnswer(
    "sph-i2",
    "Find the volume of a sphere with radius 6 cm. Give your answer to 1 decimal place.",
    "r=6\\text{ cm}",
    "904.8",
    ["904.8 cm³", "904.8 cm^3"],
    "V = (4/3)π(216) = 288π."
  ),
  measAnswer(
    "sph-i3",
    "Find the surface area of a sphere with diameter 16 cm. Give your answer to 1 decimal place.",
    "d=16\\text{ cm}",
    "804.2",
    ["804.2 cm²", "804.2 cm^2"],
    "r = 8 cm. SA = 4π(64) = 256π."
  ),
  measAnswer(
    "sph-i4",
    "A sphere has surface area 100π cm². Find its radius.",
    "SA=100\\pi\\text{ cm}^2",
    "5",
    ["5 cm"],
    "4πr² = 100π → r² = 25 → r = 5 cm."
  ),
  measChoice(
    "sph-i5",
    "A sphere has diameter 10 cm. A student calculates its volume as (4/3)π × 10³ ≈ 4189 cm³. What error did they make?",
    "A",
    [
      "They used the diameter 10 cm instead of the radius 5 cm — the correct volume is (4/3)π × 5³ ≈ 524 cm³.",
      "The formula should be (4/3)πr² not (4/3)πr³.",
      "There is no error — 4189 cm³ is correct.",
      "They should have multiplied by π² not π.",
    ],
    "V = (4/3)πr³ where r = d/2 = 5 cm. V = (4/3)π × 125 = (500/3)π ≈ 524 cm³. Using d = 10 instead gives (4/3)π × 1000 — eight times too large (because radius was doubled, and 2³ = 8).",
    "d=10\\text{ cm}"
  ),
];

const spheresMistakes = [
  {
    mistake:
      "Using the diameter instead of the radius — substituting d into r without halving first.",
    fix:
      "Both SA = 4πr² and V = (4/3)πr³ require the radius. If d is given, always compute r = d/2 as the very first step. Using d instead of r gives a surface area 4 times too large and a volume 8 times too large.",
  },
  {
    mistake:
      "Squaring instead of cubing in the volume formula — writing (4/3)πr² h instead of (4/3)πr³.",
    fix:
      "The sphere volume formula has r³ (r cubed), not r². There is no separate height for a sphere. The formula is V = (4/3)πr³. Memorise: the exponent matches the dimension — area has r², volume has r³.",
  },
  {
    mistake:
      "Writing 4/3 as 4 × 3 = 12 instead of the fraction 4/3 ≈ 1.333.",
    fix:
      "The formula is V = (4/3)πr³, where 4/3 is the fraction four-thirds (approximately 1.333). On a calculator: enter 4 ÷ 3 × π × r³, or equivalently 4 × π × r³ ÷ 3. Do not multiply by 12.",
  },
  {
    mistake:
      "Confusing surface area and volume — using 4πr³ for volume or (4/3)πr² for surface area.",
    fix:
      "Surface area SA = 4πr² (square units — the 2D outer skin). Volume V = (4/3)πr³ (cubic units — the 3D interior). The exponent on r tells you which formula: r² for area, r³ for volume.",
  },
];

const spheresMastery: PracticeQuestion[] = [
  measAnswer(
    "sph-m1",
    "Find the surface area of a sphere with radius 3 cm. Give your answer to 1 decimal place.",
    "r=3\\text{ cm}",
    "113.1",
    ["113.1 cm²", "113.1 cm^2"],
    "SA = 4π(9) = 36π."
  ),
  measAnswer(
    "sph-m2",
    "Find the volume of a sphere with radius 4 cm. Give your answer to 1 decimal place.",
    "r=4\\text{ cm}",
    "268.1",
    ["268.1 cm³", "268.1 cm^3"],
    "V = (4/3)π(64) = (256/3)π."
  ),
  measChoice(
    "sph-m3",
    "A sphere has radius r. Which expression gives its volume?",
    "B",
    [
      "$4\\pi r^2$",
      "$\\tfrac{4}{3}\\pi r^3$",
      "$\\tfrac{1}{3}\\pi r^2 h$",
      "$\\tfrac{4}{3}\\pi r^2$",
    ],
    "V = (4/3)πr³. Option A is the surface area. Option C is the cone volume formula. Option D has r² instead of r³.",
    "\\text{Select A, B, C, or D.}"
  ),
  measAnswer(
    "sph-m4",
    "Find the surface area of a sphere with radius 10 cm. Give your answer to 1 decimal place.",
    "r=10\\text{ cm}",
    "1256.6",
    ["1256.6 cm²", "1256.6 cm^2"],
    "SA = 4π(100) = 400π."
  ),
  measAnswer(
    "sph-m5",
    "Find the volume of a sphere with radius 9 cm. Give your answer to 1 decimal place.",
    "r=9\\text{ cm}",
    "3053.6",
    ["3053.6 cm³", "3053.6 cm^3"],
    "V = (4/3)π(729) = 972π."
  ),
  measAnswer(
    "sph-m6",
    "A sphere has surface area 64π cm². Find its radius.",
    "SA=64\\pi\\text{ cm}^2",
    "4",
    ["4 cm"],
    "4πr² = 64π → r² = 16 → r = 4 cm."
  ),
  measAnswer(
    "sph-m7",
    "Find the volume of a sphere with diameter 10 cm. Give your answer to 1 decimal place.",
    "d=10\\text{ cm}",
    "523.6",
    ["523.6 cm³", "523.6 cm^3"],
    "r = 5 cm. V = (4/3)π(125) = (500/3)π."
  ),
  measAnswer(
    "sph-m8",
    "Find the surface area of a sphere with radius 8 cm. Give your answer to 1 decimal place.",
    "r=8\\text{ cm}",
    "804.2",
    ["804.2 cm²", "804.2 cm^2"],
    "SA = 4π(64) = 256π."
  ),
  measAnswer(
    "sph-m9",
    "A sphere has volume 288π cm³. Find its radius.",
    "V=288\\pi\\text{ cm}^3",
    "6",
    ["6 cm"],
    "(4/3)πr³ = 288π → r³ = 288 × 3/4 = 216 → r = 6 cm."
  ),
  measChoice(
    "sph-m10",
    "A sphere has radius 6 cm. A smaller sphere has radius 3 cm. How many times greater is the volume of the larger sphere?",
    "C",
    [
      "2 times (the radius doubled)",
      "4 times (the radius ratio squared)",
      "8 times (the radius ratio cubed)",
      "6 times (the radii multiplied)",
    ],
    "Volume scale factor = (length scale factor)³ = (6/3)³ = 2³ = 8. The larger sphere has 8 times the volume of the smaller.",
    "r_1=6\\text{ cm},\\;r_2=3\\text{ cm}"
  ),
];

// ─── Lesson 7: Similar Figures and Scale Factors ──────────────────────────────

const similarFiguresWorkedExamples: WorkedExample[] = [
  {
    title: "Using a length scale factor to find new lengths and areas",
    questionLatex:
      "\\text{Two similar shapes have a length scale factor of }k=3.\\text{ The original shape has length 8 cm and area 12 cm}^2.\\text{ Find the new length and area.}",
    steps: [
      {
        explanation:
          "The length scale factor k means every length is multiplied by k.",
        latex: "\\text{New length}=8\\times 3=24\\text{ cm}",
      },
      {
        explanation:
          "Areas scale by k² (the square of the length scale factor), because area is a two-dimensional measurement.",
        latex: "\\text{New area}=12\\times 3^2=12\\times 9=108\\text{ cm}^2",
      },
    ],
    finalAnswerLatex: "\\text{New length }=24\\text{ cm},\\quad\\text{New area }=108\\text{ cm}^2",
  },
  {
    title: "Finding the scale factor from corresponding lengths",
    questionLatex:
      "\\text{Two similar prisms have corresponding lengths 5 cm and 15 cm. The smaller prism has volume 40 cm}^3.\\text{ Find the volume of the larger prism.}",
    steps: [
      {
        explanation: "Find the length scale factor from the corresponding lengths.",
        latex: "k=\\frac{15}{5}=3",
      },
      {
        explanation:
          "Volumes scale by k³ (the cube of the length scale factor).",
        latex: "\\text{Volume scale factor}=k^3=3^3=27",
      },
      {
        explanation: "Multiply the original volume by the volume scale factor.",
        latex: "\\text{New volume}=40\\times 27=1080\\text{ cm}^3",
      },
    ],
    finalAnswerLatex: "V_{\\text{large}}=1080\\text{ cm}^3",
  },
  {
    title: "Scale factor less than 1 — a reduction",
    questionLatex:
      "\\text{A model is built at scale }1:2\\text{, meaning every dimension is halved }(k=\\tfrac{1}{2}).\\text{ The original has length 12 cm, area 80 cm}^2\\text{, and volume 200 cm}^3.\\text{ Find the model's length, area, and volume.}",
    steps: [
      {
        explanation: "Length scales by k = 1/2.",
        latex: "\\text{Length}=12\\times\\tfrac{1}{2}=6\\text{ cm}",
      },
      {
        explanation: "Area scales by k² = (1/2)² = 1/4.",
        latex: "\\text{Area}=80\\times\\tfrac{1}{4}=20\\text{ cm}^2",
      },
      {
        explanation: "Volume scales by k³ = (1/2)³ = 1/8.",
        latex: "\\text{Volume}=200\\times\\tfrac{1}{8}=25\\text{ cm}^3",
      },
    ],
    finalAnswerLatex:
      "\\text{Length }=6\\text{ cm},\\quad\\text{Area }=20\\text{ cm}^2,\\quad\\text{Volume }=25\\text{ cm}^3",
  },
];

const similarFiguresGuided: PracticeQuestion[] = [
  measAnswer(
    "sim-g1",
    "Two similar shapes have length scale factor k = 4. The original shape has length 3 cm. Find the new length.",
    "k=4,\\;\\text{original length}=3\\text{ cm}",
    "12",
    ["12 cm"],
    "New length = original × k = 3 × 4."
  ),
  measAnswer(
    "sim-g2",
    "Two similar shapes have length scale factor k = 3. The original shape has area 15 cm². Find the new area.",
    "k=3,\\;\\text{original area}=15\\text{ cm}^2",
    "135",
    ["135 cm²", "135 cm^2"],
    "Area scale factor = k² = 9. New area = 15 × 9."
  ),
  measChoice(
    "sim-g3",
    "Two similar solids have a length scale factor of k. What is the area scale factor?",
    "B",
    [
      "$k$",
      "$k^2$",
      "$k^3$",
      "$2k$",
    ],
    "Areas scale by the square of the length scale factor. If k = 3, lengths triple but areas become 9 times as large. Volume scales by k³."
  ),
  measAnswer(
    "sim-g4",
    "Two similar solids have length scale factor k = 2. The original has volume 100 cm³. Find the new volume.",
    "k=2,\\;\\text{original volume}=100\\text{ cm}^3",
    "800",
    ["800 cm³", "800 cm^3"],
    "Volume scale factor = k³ = 8. New volume = 100 × 8."
  ),
];

const similarFiguresIndependent: PracticeQuestion[] = [
  measAnswer(
    "sim-i1",
    "Two similar triangles have corresponding sides 4 cm and 12 cm. Find the length scale factor.",
    "\\text{sides }4\\text{ cm and }12\\text{ cm}",
    "3",
    [],
    "k = larger ÷ smaller = 12 ÷ 4."
  ),
  measAnswer(
    "sim-i2",
    "Two similar figures have length scale factor k = 5. The original area is 8 cm². Find the new area.",
    "k=5,\\;\\text{original area}=8\\text{ cm}^2",
    "200",
    ["200 cm²", "200 cm^2"],
    "Area scale factor = 5² = 25. New area = 8 × 25."
  ),
  measAnswer(
    "sim-i3",
    "Two similar solids have length scale factor k = 2. The original has volume 27 cm³. Find the new volume.",
    "k=2,\\;\\text{original volume}=27\\text{ cm}^3",
    "216",
    ["216 cm³", "216 cm^3"],
    "Volume scale factor = 2³ = 8. New volume = 27 × 8."
  ),
  measAnswer(
    "sim-i4",
    "Two similar prisms have volumes 64 cm³ and 512 cm³. Find the length scale factor.",
    "V_1=64\\text{ cm}^3,\\;V_2=512\\text{ cm}^3",
    "2",
    [],
    "Volume scale factor = 512 ÷ 64 = 8 = k³. So k = ∛8 = 2."
  ),
  measChoice(
    "sim-i5",
    "A solid has volume 40 cm³. A similar solid has length scale factor k = 3. A student writes: new volume = 40 × 3 = 120 cm³. What is the correct new volume?",
    "C",
    ["$120\\text{ cm}^3$", "$360\\text{ cm}^3$", "$1080\\text{ cm}^3$", "$1200\\text{ cm}^3$"],
    "Volume scale factor = k³ = 3³ = 27. New volume = 40 × 27 = 1080 cm³. The student used k instead of k³. Option B used k² = 9.",
    "V=40\\text{ cm}^3,\\;k=3"
  ),
];

const similarFiguresMistakes = [
  {
    mistake:
      "Applying the length scale factor k to area or volume — multiplying by k instead of k² or k³.",
    fix:
      "The scale factor k applies only to lengths. Area (2D) scales by k². Volume (3D) scales by k³. If k = 3: lengths × 3, areas × 9, volumes × 27. Write this key fact at the top of any similar solids problem.",
  },
  {
    mistake:
      "Using the area scale factor (k²) for volume — multiplying volume by k² instead of k³.",
    fix:
      "Volume scales by k³. If you find k² to adjust area, you must go one step further and multiply again by k to get k³ for volume. Three dimensions → cube the scale factor.",
  },
  {
    mistake:
      "Finding the scale factor in the wrong direction — dividing smaller by larger to get k > 1 when comparing a reduction.",
    fix:
      "The scale factor k = new ÷ original. If the new shape is smaller, k < 1. If the new shape is larger, k > 1. Always be clear about which shape is 'original' and which is 'new'.",
  },
  {
    mistake:
      "Squaring or cubing the wrong number — applying the scale factor multiple times instead of raising it to a power.",
    fix:
      "If k = 4, the area scale factor is 4² = 16 (not 4 × 2 = 8). The volume scale factor is 4³ = 64 (not 4 × 3 = 12). Square or cube the scale factor itself, not the number of dimensions.",
  },
];

const similarFiguresMastery: PracticeQuestion[] = [
  measAnswer(
    "sim-m1",
    "Two similar shapes have corresponding sides 4 cm and 20 cm. The original shape has another side of 6 cm. Find the corresponding side in the new shape.",
    "\\text{sides }4\\text{ cm and }20\\text{ cm},\\;\\text{original side}=6\\text{ cm}",
    "30",
    ["30 cm"],
    "Find k first by dividing the new corresponding length by the original: k = 20 ÷ 4 = 5. Then multiply the other original side by k."
  ),
  measAnswer(
    "sim-m2",
    "Two similar shapes have length scale factor k = 2. The original area is 25 m². Find the new area.",
    "k=2,\\;\\text{original area}=25\\text{ m}^2",
    "100",
    ["100 m²", "100 m^2"],
    "Area scale factor = 4. New area = 25 × 4."
  ),
  measChoice(
    "sim-m3",
    "Two similar shapes have length scale factor k = 5. What is the ratio of their areas?",
    "C",
    ["$5:1$", "$10:1$", "$25:1$", "$125:1$"],
    "Area scale factor = k² = 5² = 25. The new area is 25 times the original, so the ratio is 25:1.",
    "k=5"
  ),
  measAnswer(
    "sim-m4",
    "Two similar solids have length scale factor k = 4. The original volume is 12 cm³. Find the new volume.",
    "k=4,\\;\\text{original volume}=12\\text{ cm}^3",
    "768",
    ["768 cm³", "768 cm^3"],
    "Volume scale factor = 4³ = 64. New volume = 12 × 64."
  ),
  measAnswer(
    "sim-m5",
    "Two similar shapes have corresponding sides 6 cm and 18 cm. The original area is 20 cm². Find the new area.",
    "\\text{sides }6\\text{ and }18\\text{ cm},\\;\\text{original area}=20\\text{ cm}^2",
    "180",
    ["180 cm²", "180 cm^2"],
    "k = 18/6 = 3. Area scale factor = 9. New area = 20 × 9."
  ),
  measAnswer(
    "sim-m6",
    "Two similar cylinders have radii 3 cm and 9 cm. Find the volume scale factor.",
    "r_1=3\\text{ cm},\\;r_2=9\\text{ cm}",
    "27",
    [],
    "k = 9/3 = 3. Volume scale factor = k³ = 27."
  ),
  measAnswer(
    "sim-m7",
    "Two similar shapes have length scale factor k = 2. The original surface area is 48 cm². Find the new surface area.",
    "k=2,\\;\\text{original SA}=48\\text{ cm}^2",
    "192",
    ["192 cm²", "192 cm^2"],
    "Area scale factor = k² = 4. New SA = 48 × 4."
  ),
  measAnswer(
    "sim-m8",
    "Two similar solids have volumes 8 cm³ and 216 cm³. Find the length scale factor.",
    "V_1=8\\text{ cm}^3,\\;V_2=216\\text{ cm}^3",
    "3",
    [],
    "Volume scale factor = 216/8 = 27 = k³. So k = ∛27 = 3."
  ),
  measChoice(
    "sim-m9",
    "All dimensions of a solid are halved. What happens to its volume?",
    "C",
    [
      "It halves — the volume is divided by 2.",
      "It becomes one quarter — the volume is divided by 4.",
      "It becomes one eighth — the volume is divided by 8.",
      "It stays the same — only the shape changes.",
    ],
    "k = 1/2. Volume scale factor = (1/2)³ = 1/8. The volume becomes one-eighth of the original. This shows why volume changes much more dramatically than length when dimensions are scaled."
  ),
  measChoice(
    "sim-m10",
    "A small container holds 125 mL and is similar in shape to a larger container that is 4 times as tall. How much does the larger container hold?",
    "D",
    ["$500\\text{ mL}$", "$2000\\text{ mL}$", "$1000\\text{ mL}$", "$8000\\text{ mL}$"],
    "k = 4 (length scale factor). Volume scale factor = k³ = 64. Larger volume = 125 × 64 = 8000 mL.",
    "V_{\\text{small}}=125\\text{ mL},\\;k=4"
  ),
];

// ─── Main override function ───────────────────────────────────────────────────

export function year10MeasurementLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) || !["measurement-and-surds"].includes(unit.slug)) {
    return null;
  }

  if (lesson.slug === "surface-area-prisms") {
    return {
      description:
        "Calculate the surface area of rectangular prisms, triangular prisms, and other prisms by finding the area of every face and adding them together.",
      learningIntention:
        "Find the surface area of a prism by identifying all faces, calculating each area, and adding them.",
      successCriteria: [
        "Identify and count all faces of a rectangular or triangular prism.",
        "Calculate the area of each face, including both ends and all lateral faces.",
        "Apply SA = 2(lw + lh + wh) for a rectangular prism.",
        "Apply SA = 2 × (cross-section area) + perimeter × length for any prism.",
      ],
      teaching: {
        paragraphs: [
          "The surface area of a solid is the total area of all its outer faces. A useful way to find surface area is to imagine unfolding the solid into a flat net — each face becomes a separate shape whose area you can calculate.",
          "A rectangular prism has 6 faces in 3 matching pairs: top/bottom, front/back, and left/right. The formula SA = 2(lw + lh + wh) adds one face from each pair and doubles.",
          "Any prism (not just rectangular) can be handled using SA = 2 × A_cross-section + P_cross-section × length. The two ends contribute 2A, and the lateral faces unroll into a rectangle of width equal to the perimeter of the cross-section.",
          "For a triangular prism, find the area of the triangular cross-section, then add the three rectangular lateral faces — one for each side of the triangle.",
        ],
        latexBlocks: [
          "SA_{\\text{rectangular prism}}=2(lw+lh+wh)",
          "SA_{\\text{any prism}}=2A_{\\text{cross}}+P_{\\text{cross}}\\times l",
        ],
      },
      workedExamples: surfaceAreaPrismsWorkedExamples,
      guidedPractice: surfaceAreaPrismsGuided,
      independentPractice: surfaceAreaPrismsIndependent,
      commonMistakes: surfaceAreaPrismsMistakes,
      masteryQuiz: surfaceAreaPrismsMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "surface-area-cylinders") {
    return {
      description:
        "Calculate the surface area of closed and open cylinders using the formula SA = 2πr² + 2πrh, understanding how each term represents the circular ends and the curved lateral surface.",
      learningIntention:
        "Apply the cylinder surface area formula correctly for closed and open cylinders.",
      successCriteria: [
        "Identify the radius from a given diameter by halving.",
        "Apply SA = 2πr² + 2πrh for a closed cylinder.",
        "Adjust the formula to SA = πr² + 2πrh for an open-top cylinder.",
        "Give answers in terms of π or as decimals rounded to 1 decimal place.",
      ],
      teaching: {
        paragraphs: [
          "A cylinder has three surfaces: two circular ends and one curved lateral surface. Unrolling the curved surface gives a rectangle with width equal to the circumference (2πr) and height h, so its area is 2πrh.",
          "The formula for a closed cylinder is SA = 2πr² + 2πrh, where 2πr² covers both circular ends (each has area πr²) and 2πrh covers the curved surface.",
          "If the cylinder has one open end (like a cup or tank without a lid), remove one circular face: SA = πr² + 2πrh.",
          "Always check whether a diameter or radius is given. If a diameter d is given, the radius is r = d/2. Square only the radius, not the diameter.",
        ],
        latexBlocks: [
          "SA_{\\text{closed}}=2\\pi r^2+2\\pi rh",
          "SA_{\\text{open top}}=\\pi r^2+2\\pi rh",
          "\\text{Lateral surface unrolled: width }=2\\pi r,\\text{ height }=h,\\text{ area }=2\\pi rh",
        ],
      },
      workedExamples: surfaceAreaCylindersWorkedExamples,
      guidedPractice: surfaceAreaCylindersGuided,
      independentPractice: surfaceAreaCylindersIndependent,
      commonMistakes: surfaceAreaCylindersMistakes,
      masteryQuiz: surfaceAreaCylindersMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "volume-prisms-cylinders") {
    return {
      description:
        "Calculate the volume of rectangular prisms, triangular prisms, and cylinders using V = A_cross-section × length, and rearrange to find an unknown dimension.",
      learningIntention:
        "Apply the volume formula V = A × l to prisms and V = πr²h to cylinders, and rearrange to find an unknown dimension.",
      successCriteria: [
        "Find the cross-sectional area of a rectangular or triangular prism and multiply by its length.",
        "Apply V = πr²h for a cylinder, using the radius (not diameter).",
        "Rearrange the volume formula to find an unknown length, width, height, or radius.",
        "Convert between cubic units and litres where required (1 m³ = 1000 L).",
      ],
      teaching: {
        paragraphs: [
          "Volume measures how much space a solid occupies, given in cubic units (cm³, m³). Every prism and cylinder has a constant cross-section: the volume equals the area of that cross-section multiplied by the length of the solid.",
          "For a rectangular prism: V = l × w × h. This is the same as A_cross-section (l × w) × height.",
          "For a triangular prism: V = ½ × base × height_of_triangle × length. Halving is essential — the cross-section is a triangle, not a rectangle.",
          "For a cylinder: V = πr²h. The cross-section is a circle of area πr². Always use the radius — if the diameter is given, divide by 2 first.",
          "To find an unknown dimension, rearrange the formula. For a cylinder: h = V / (πr²). Divide by the full product πr², not just π.",
        ],
        latexBlocks: [
          "V_{\\text{prism}}=A_{\\text{cross}}\\times l",
          "V_{\\text{rect. prism}}=l\\times w\\times h",
          "V_{\\text{triangular prism}}=\\tfrac{1}{2}\\times b\\times h_{\\triangle}\\times l",
          "V_{\\text{cylinder}}=\\pi r^2 h",
        ],
      },
      workedExamples: volumePrismsCylindersWorkedExamples,
      guidedPractice: volumePrismsCylindersGuided,
      independentPractice: volumePrismsCylindersIndependent,
      commonMistakes: volumePrismsCylindersMistakes,
      masteryQuiz: volumePrismsCylindersMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "pyramids") {
    return {
      description:
        "Calculate the volume of pyramids using V = (1/3) × base area × height, and the surface area of square pyramids using the slant height.",
      learningIntention:
        "Apply V = (1/3) × A_base × h for volume and SA = s² + 2sl for square pyramids, correctly distinguishing perpendicular height from slant height.",
      successCriteria: [
        "Calculate the volume of a square or rectangular pyramid using the perpendicular height.",
        "Calculate the surface area of a square pyramid using the slant height.",
        "Distinguish between the perpendicular height (used for volume) and the slant height (used for surface area).",
        "Rearrange the volume formula to find an unknown perpendicular height.",
      ],
      teaching: {
        paragraphs: [
          "A pyramid tapers from a polygonal base to a single apex. Its volume is always one-third of the equivalent prism: V = (1/3) × base area × h, where h is the perpendicular (vertical) height from the base to the apex.",
          "The slant height l is the height of a triangular face — the distance from the apex to the midpoint of a base edge, measured along the face. The slant height is always longer than the perpendicular height.",
          "For a square pyramid with base side s and slant height l: SA = s² + 4 × (½ × s × l) = s² + 2sl. The first term is the square base; the second is the area of four identical triangular faces.",
          "Rule: use the perpendicular height h for volume; use the slant height l for surface area. Never mix them up.",
        ],
        latexBlocks: [
          "V_{\\text{pyramid}}=\\tfrac{1}{3}\\times A_{\\text{base}}\\times h",
          "SA_{\\text{square pyramid}}=s^2+2sl\\quad(s=\\text{base side},\\;l=\\text{slant height})",
        ],
      },
      workedExamples: pyramidsWorkedExamples,
      guidedPractice: pyramidsGuided,
      independentPractice: pyramidsIndependent,
      commonMistakes: pyramidsMistakes,
      masteryQuiz: pyramidsMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "cones") {
    return {
      description:
        "Calculate the volume and surface area of cones using V = (1/3)πr²h and TSA = πr² + πrl, distinguishing between perpendicular height and slant height.",
      learningIntention:
        "Apply cone volume and surface area formulas correctly, using perpendicular height for volume and slant height for curved surface area.",
      successCriteria: [
        "Calculate the volume of a cone using V = (1/3)πr²h with the perpendicular height.",
        "Calculate the curved surface area using CSA = πrl with the slant height.",
        "Calculate the total surface area using TSA = πr² + πrl.",
        "Find the slant height using the Pythagorean theorem: l = √(r² + h²).",
      ],
      teaching: {
        paragraphs: [
          "A cone has a circular base and tapers to a single apex. Like a pyramid, its volume is one-third of the equivalent cylinder: V = (1/3)πr²h, where r is the base radius and h is the perpendicular height.",
          "The slant height l is the distance from the apex to any point on the base circle edge. It satisfies the Pythagorean theorem: l² = r² + h², so l = √(r² + h²). The slant height is always longer than the perpendicular height.",
          "The curved surface area (CSA) of a cone unrolls into a sector of a circle: CSA = πrl. The total surface area of a closed cone adds the circular base: TSA = πr² + πrl.",
          "Rule: volume uses h (perpendicular); curved surface area uses l (slant). If neither h nor l is given but the other is known, find the missing one with Pythagoras.",
        ],
        latexBlocks: [
          "V_{\\text{cone}}=\\tfrac{1}{3}\\pi r^2 h",
          "CSA=\\pi r l\\quad(l=\\text{slant height})",
          "TSA=\\pi r^2+\\pi r l",
          "l=\\sqrt{r^2+h^2}",
        ],
      },
      workedExamples: conesWorkedExamples,
      guidedPractice: conesGuided,
      independentPractice: conesIndependent,
      commonMistakes: conesMistakes,
      masteryQuiz: conesMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "spheres") {
    return {
      description:
        "Calculate the surface area and volume of spheres using SA = 4πr² and V = (4/3)πr³, correctly identifying the radius from a given diameter.",
      learningIntention:
        "Apply SA = 4πr² and V = (4/3)πr³ to find the surface area and volume of spheres, and rearrange to find the radius.",
      successCriteria: [
        "Apply SA = 4πr² to find the surface area of a sphere.",
        "Apply V = (4/3)πr³ to find the volume of a sphere.",
        "Identify the radius from a given diameter before substituting.",
        "Rearrange the surface area or volume formula to find the radius.",
      ],
      teaching: {
        paragraphs: [
          "A sphere is a perfectly round solid where every surface point is the same distance (the radius r) from the centre. The diameter d = 2r — always halve the diameter to get the radius before substituting into any formula.",
          "Surface area of a sphere: SA = 4πr². The surface area is four times the area of a great circle — a useful way to remember the formula.",
          "Volume of a sphere: V = (4/3)πr³. The exponent on r is 3 (cubed) for volume — one higher than the exponent 2 used in surface area.",
          "To find r from the surface area: rearrange 4πr² = SA → r = √(SA/(4π)). To find r from the volume: rearrange (4/3)πr³ = V → r = ∛(3V/(4π)).",
        ],
        latexBlocks: [
          "SA=4\\pi r^2",
          "V=\\tfrac{4}{3}\\pi r^3",
          "r=\\frac{d}{2}\\text{ (always halve the diameter first)}",
        ],
      },
      workedExamples: spheresWorkedExamples,
      guidedPractice: spheresGuided,
      independentPractice: spheresIndependent,
      commonMistakes: spheresMistakes,
      masteryQuiz: spheresMastery,
      masteryPassMark: 0.8,
    };
  }

  if (lesson.slug === "similar-figures-scale") {
    return {
      description:
        "Apply length, area, and volume scale factors to similar figures, understanding that area scales by k² and volume scales by k³ when the length scale factor is k.",
      learningIntention:
        "Use scale factors to find new lengths, areas, and volumes of similar figures, and find the scale factor from corresponding measurements.",
      successCriteria: [
        "Identify the length scale factor k from corresponding lengths of similar figures.",
        "Calculate new areas using the area scale factor k².",
        "Calculate new volumes using the volume scale factor k³.",
        "Find k from volumes or areas by taking the cube root or square root of the scale factor.",
      ],
      teaching: {
        paragraphs: [
          "Two figures are similar if one is an enlargement (or reduction) of the other, with all lengths multiplied by the same scale factor k. If k > 1, the figure is enlarged; if k < 1, it is reduced.",
          "Lengths scale by k: new length = original length × k. This applies to every linear measurement — sides, perimeter, radius, height.",
          "Areas scale by k²: new area = original area × k². Because area involves two length dimensions, the scale factor is applied twice (k × k = k²).",
          "Volumes scale by k³: new volume = original volume × k³. Volume involves three length dimensions, so the scale factor is cubed (k × k × k = k³). This means a small change in k causes a large change in volume.",
          "To find k from lengths: k = new ÷ original. To find k from areas: k = √(area scale factor). To find k from volumes: k = ∛(volume scale factor).",
        ],
        latexBlocks: [
          "\\text{Length scale factor: }k\\qquad\\text{e.g. }k=3",
          "\\text{Area scale factor: }k^2\\qquad\\text{e.g. }3^2=9",
          "\\text{Volume scale factor: }k^3\\qquad\\text{e.g. }3^3=27",
        ],
      },
      workedExamples: similarFiguresWorkedExamples,
      guidedPractice: similarFiguresGuided,
      independentPractice: similarFiguresIndependent,
      commonMistakes: similarFiguresMistakes,
      masteryQuiz: similarFiguresMastery,
      masteryPassMark: 0.8,
    };
  }

  return null;
}
