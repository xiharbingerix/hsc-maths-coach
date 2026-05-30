import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";

function measAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = [],
  hint = "Write the formula, substitute the dimensions, and calculate step by step."
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint,
    explanation: `The answer is ${answer}.`,
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

// ─── Main override function ───────────────────────────────────────────────────

export function year10MeasurementLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-10-mathematics" || unit.slug !== "measurement") {
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

  return null;
}
