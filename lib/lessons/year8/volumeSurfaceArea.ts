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
      "V = 8 \\times 5 \\times 3",
      "120",
      "V = 8 × 5 × 3 = 120 cm³.",
      "Multiply all three dimensions: length × width × height.",
    ),
    answer(
      "y8-vsa-vp-g3",
      "A triangular prism has a cross-section with base 6 cm and height 4 cm, and a prism length of 10 cm. Find its volume.",
      "V = \\frac{1}{2} \\times 6 \\times 4 \\times 10",
      "120",
      "Area of cross-section = ½ × 6 × 4 = 12 cm². V = 12 × 10 = 120 cm³.",
      "Find the triangular cross-section area first using A = ½bh, then multiply by the prism length.",
    ),
    answer(
      "y8-vsa-vp-g4",
      "A rectangular prism has length 10 cm, width 4 cm and height 2 cm. Find its volume.",
      "V = 10 \\times 4 \\times 2",
      "80",
      "V = 10 × 4 × 2 = 80 cm³.",
      "Multiply length × width × height.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-vp-i1",
      "A rectangular prism has length 7 cm, width 3 cm and height 4 cm. Find its volume.",
      "V = 7 \\times 3 \\times 4",
      "84",
      "V = 7 × 3 × 4 = 84 cm³.",
      "Use V = l × w × h.",
    ),
    answer(
      "y8-vsa-vp-i2",
      "A triangular prism has a cross-section with base 10 cm and height 6 cm, and a prism length of 5 cm. Find its volume.",
      "V = \\frac{1}{2} \\times 10 \\times 6 \\times 5",
      "150",
      "Area = ½ × 10 × 6 = 30 cm². V = 30 × 5 = 150 cm³.",
      "Calculate the triangular area with ½ × base × height, then multiply by the prism length.",
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
      "V = 24 \\times 7",
      "168",
      "V = A × l = 24 × 7 = 168 cm³.",
      "Apply V = A × l directly with the given cross-sectional area.",
    ),
    answer(
      "y8-vsa-vp-i5",
      "A rectangular prism has length 5 cm and width 6 cm. Its volume is 120 cm³. Find the height.",
      "5 \\times 6 \\times h = 120",
      "4",
      "5 × 6 = 30. So 30h = 120, giving h = 120 ÷ 30 = 4 cm.",
      "Divide the volume by the product of the two known dimensions.",
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
      "V = 9 \\times 4 \\times 5",
      "180",
      "V = 9 × 4 × 5 = 180 cm³.",
      "Multiply all three dimensions.",
    ),
    answer(
      "y8-vsa-vp-m2",
      "A triangular prism has a cross-section with base 12 cm and height 5 cm, and a prism length of 8 cm. Find its volume.",
      "V = \\frac{1}{2} \\times 12 \\times 5 \\times 8",
      "240",
      "Area = ½ × 12 × 5 = 30 cm². V = 30 × 8 = 240 cm³.",
      "Find the triangular cross-section area first.",
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
      "30 \\times l = 210",
      "7",
      "l = V ÷ A = 210 ÷ 30 = 7 cm.",
      "Rearrange V = A × l to get l = V ÷ A.",
    ),
    answer(
      "y8-vsa-vp-m5",
      "A triangular prism has a cross-section with base 9 cm and height 8 cm, and a prism length of 15 cm. Find its volume.",
      "V = \\frac{1}{2} \\times 9 \\times 8 \\times 15",
      "540",
      "Area = ½ × 9 × 8 = 36 cm². V = 36 × 15 = 540 cm³.",
      "Calculate the triangular area first, then multiply by the prism length.",
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
      "7 \\times 6 \\times h = 336",
      "8",
      "7 × 6 = 42. So 42h = 336, giving h = 336 ÷ 42 = 8 cm.",
      "Divide the volume by l × w to find h.",
    ),
    answer(
      "y8-vsa-vp-m8",
      "A concrete step is a rectangular prism with length 120 cm, width 40 cm and height 20 cm. Find its volume.",
      "V = 120 \\times 40 \\times 20",
      "96000",
      "V = 120 × 40 × 20 = 96 000 cm³.",
      "Apply V = l × w × h to the three given dimensions.",
      ["96 000"],
    ),
    answer(
      "y8-vsa-vp-m9",
      "A triangular prism has a cross-section with base 10 cm and prism length 12 cm. Its volume is 360 cm³. Find the height of the triangular cross-section.",
      "\\frac{1}{2} \\times 10 \\times h \\times 12 = 360",
      "6",
      "½ × 10 × h × 12 = 60h = 360. So h = 360 ÷ 60 = 6 cm.",
      "Set up ½ × 10 × h × 12 = 360, simplify, then solve for h.",
    ),
    answer(
      "y8-vsa-vp-m10",
      "A swimming pool is 25 m long, 8 m wide and has a uniform depth of 2 m. Find the volume of water it holds.",
      "V = 25 \\times 8 \\times 2",
      "400",
      "The pool is a rectangular prism. V = 25 × 8 × 2 = 400 m³.",
      "Treat the pool as a rectangular prism and apply V = l × w × h.",
    ),
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
      "SA = 2(lw + lh + wh)",
      "94",
      "SA = 2(5×4 + 5×3 + 4×3) = 2(20+15+12) = 2×47 = 94 cm².",
      "Apply SA = 2(lw + lh + wh): find each product, add, then double.",
    ),
    answer(
      "y8-vsa-sp-g3",
      "A cube has side length 6 cm. Find its total surface area.",
      "SA = 6 \\times 6^2",
      "216",
      "All 6 faces are identical squares. SA = 6 × 6² = 6 × 36 = 216 cm².",
      "A cube has 6 equal square faces — find one face area and multiply by 6.",
    ),
    answer(
      "y8-vsa-sp-g4",
      "A rectangular prism has length 8 cm, width 3 cm and height 2 cm. Find its surface area.",
      "SA = 2(lw + lh + wh)",
      "92",
      "SA = 2(8×3 + 8×2 + 3×2) = 2(24+16+6) = 2×46 = 92 cm².",
      "List the three pairs of faces: lw, lh, and wh.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-sp-i1",
      "A rectangular prism has length 10 cm, width 5 cm and height 4 cm. Find its surface area.",
      "SA = 2(lw + lh + wh)",
      "220",
      "SA = 2(10×5 + 10×4 + 5×4) = 2(50+40+20) = 2×110 = 220 cm².",
      "Calculate each of the three pairs: lw, lh, wh.",
    ),
    answer(
      "y8-vsa-sp-i2",
      "A triangular prism has a right-angled cross-section with legs 6 cm and 8 cm (hypotenuse 10 cm) and a prism length of 12 cm. Find its surface area.",
      "SA = 2 \\times \\tfrac{1}{2} \\times 6 \\times 8 + (6+8+10) \\times 12",
      "336",
      "Two triangular faces: 2 × ½ × 6 × 8 = 48 cm². Three rectangular faces: (6+8+10) × 12 = 24 × 12 = 288 cm². SA = 48 + 288 = 336 cm².",
      "Add the two triangular end areas to the total area of the three rectangular sides.",
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
      "2(7w + 2w + 7 \\times 2) = 100",
      "4",
      "SA = 2(7w + 2w + 14) = 2(9w + 14) = 18w + 28 = 100. So 18w = 72, w = 4 cm.",
      "Substitute l = 7 and h = 2 into SA = 2(lw + lh + wh), then solve for w.",
    ),
    answer(
      "y8-vsa-sp-i5",
      "An open-top rectangular fish tank has length 50 cm, width 30 cm and height 40 cm. Find the total area of glass needed for the base and four sides.",
      "SA = lw + 2lh + 2wh",
      "7900",
      "Base: 50×30 = 1500. Two long sides: 2×50×40 = 4000. Two short sides: 2×30×40 = 2400. Total = 7900 cm².",
      "Calculate the base plus the four side panels. There is no top face.",
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
      "SA = 2(lw + lh + wh)",
      "166",
      "SA = 2(7×5 + 7×4 + 5×4) = 2(35+28+20) = 2×83 = 166 cm².",
      "Apply SA = 2(lw + lh + wh).",
    ),
    answer(
      "y8-vsa-sp-m2",
      "A cube has side length 7 cm. Find its total surface area.",
      "SA = 6 \\times 7^2",
      "294",
      "SA = 6 × 7² = 6 × 49 = 294 cm².",
      "A cube has 6 identical square faces.",
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
      "SA = 2 \\times \\tfrac{1}{2} \\times 5 \\times 12 + (5+12+13) \\times 10",
      "360",
      "Two triangular faces: 2 × ½ × 5 × 12 = 60 cm². Three rectangular faces: (5+12+13) × 10 = 30 × 10 = 300 cm². SA = 60 + 300 = 360 cm².",
      "Find the two triangular end areas and three rectangular side areas separately.",
    ),
    answer(
      "y8-vsa-sp-m5",
      "A rectangular prism has length 6 cm and width 4 cm. Its total surface area is 148 cm². Find its height.",
      "2(6 \\times 4 + 6h + 4h) = 148",
      "5",
      "SA = 2(24 + 10h) = 48 + 20h = 148. So 20h = 100, h = 5 cm.",
      "Substitute l = 6 and w = 4 into SA = 2(lw + lh + wh), then solve for h.",
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
      "SA = 2 \\times \\tfrac{1}{2} \\times 8 \\times 6 + (8+6+10) \\times 15",
      "408",
      "Two triangular faces: 2 × ½ × 8 × 6 = 48 cm². Three rectangular faces: (8+6+10) × 15 = 24 × 15 = 360 cm². SA = 48 + 360 = 408 cm².",
      "Calculate the two triangular end areas and the three rectangular face areas separately.",
    ),
    answer(
      "y8-vsa-sp-m8",
      "An open-top box has length 40 cm, width 25 cm and height 30 cm. Find the total inner surface area including the base but not the top.",
      "SA = lw + 2lh + 2wh",
      "4900",
      "Base: 40×25 = 1000. Two long sides: 2×40×30 = 2400. Two short sides: 2×25×30 = 1500. Total = 1000+2400+1500 = 4900 cm².",
      "Add the base plus the four side panels — there is no top face.",
    ),
    answer(
      "y8-vsa-sp-m9",
      "A triangular prism has a right-angled cross-section with legs 3 cm and 4 cm (hypotenuse 5 cm). Its total surface area is 108 cm². Find the prism length.",
      "2 \\times \\tfrac{1}{2} \\times 3 \\times 4 + (3+4+5) \\times l = 108",
      "8",
      "Two triangular faces: 2 × ½ × 3 × 4 = 12 cm². Rectangular faces: 12 × l cm². So 12 + 12l = 108, 12l = 96, l = 8 cm.",
      "Find the area of the two triangular ends, then solve 12 + 12l = 108 for l.",
    ),
    answer(
      "y8-vsa-sp-m10",
      "A rectangular crate has length 120 cm, width 80 cm and height 60 cm. Find the total surface area of all 6 faces.",
      "SA = 2(lw + lh + wh)",
      "43200",
      "SA = 2(120×80 + 120×60 + 80×60) = 2(9600+7200+4800) = 2×21600 = 43200 cm².",
      "Apply SA = 2(lw + lh + wh) to the three given dimensions.",
      ["43 200"],
    ),
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
      "V = \\pi \\times 5^2 \\times 8",
      "200π",
      "V = π × 25 × 8 = 200π cm³.",
      "Substitute r = 5 and h = 8 into V = πr²h. Square the radius first.",
      ["628", "628.3"],
    ),
    answer(
      "y8-vsa-vc-g3",
      "Find the exact volume of a cylinder with radius 3 cm and height 4 cm. Express in terms of π.",
      "V = \\pi \\times 3^2 \\times 4",
      "36π",
      "V = π × 9 × 4 = 36π cm³.",
      "Square the radius, then multiply by π and the height.",
      ["113", "113.1"],
    ),
    answer(
      "y8-vsa-vc-g4",
      "Find the exact volume of a cylinder with radius 10 cm and height 6 cm. Express in terms of π.",
      "V = \\pi \\times 10^2 \\times 6",
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
      "V = \\pi \\times 7^2 \\times 5",
      "245π",
      "V = π × 49 × 5 = 245π cm³.",
      "Apply V = πr²h with r = 7 and h = 5.",
      ["770", "769.7"],
    ),
    answer(
      "y8-vsa-vc-i2",
      "Find the exact volume of a cylinder with radius 6 cm and height 3 cm. Express in terms of π.",
      "V = \\pi \\times 6^2 \\times 3",
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
      "\\pi \\times 5^2 \\times h = 100\\pi",
      "4",
      "π × 25 × h = 100π. Divide both sides by 25π: h = 100π ÷ (25π) = 4 cm.",
      "Divide the volume by πr². The π will cancel.",
    ),
    answer(
      "y8-vsa-vc-i5",
      "A cylindrical tin can has radius 4 cm and height 12 cm. Find its exact volume in terms of π.",
      "V = \\pi \\times 4^2 \\times 12",
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
      "V = \\pi \\times 8^2 \\times 5",
      "320π",
      "V = π × 64 × 5 = 320π cm³.",
      "Apply V = πr²h.",
      ["1005", "1005.3"],
    ),
    answer(
      "y8-vsa-vc-m2",
      "Find the exact volume of a cylinder with radius 3 cm and height 10 cm. Express in terms of π.",
      "V = \\pi \\times 3^2 \\times 10",
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
      "\\pi \\times 4^2 \\times h = 144\\pi",
      "9",
      "π × 16 × h = 144π. Divide both sides by 16π: h = 144π ÷ (16π) = 9 cm.",
      "Divide the volume by πr².",
    ),
    answer(
      "y8-vsa-vc-m5",
      "Find the exact volume of a cylinder with radius 5 cm and height 6 cm. Express in terms of π.",
      "V = \\pi \\times 5^2 \\times 6",
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
      "V = \\pi \\times 4^2 \\times 11",
      "176π",
      "V = π × 16 × 11 = 176π cm³.",
      "Apply V = πr²h.",
      ["553", "552.9"],
    ),
    answer(
      "y8-vsa-vc-m8",
      "A cylinder has height 2 cm and volume $50\\pi$ cm³. Find its radius.",
      "\\pi \\times r^2 \\times 2 = 50\\pi",
      "5",
      "2πr² = 50π. Divide both sides by 2π: r² = 25, so r = 5 cm.",
      "Rearrange to r² = V ÷ (πh), then take the square root.",
    ),
    answer(
      "y8-vsa-vc-m9",
      "Cylinder A has radius 3 cm and height 16 cm. Cylinder B has radius 4 cm and height 8 cm. Find the difference in their exact volumes in terms of π.",
      "V_A = \\pi \\times 9 \\times 16, \\quad V_B = \\pi \\times 16 \\times 8",
      "16π",
      "V_A = 144π cm³. V_B = 128π cm³. Difference = 144π − 128π = 16π cm³.",
      "Calculate each volume separately, then subtract.",
      ["50", "50.3"],
    ),
    answer(
      "y8-vsa-vc-m10",
      "A cylindrical pipe has outer radius 3 cm and inner radius 2 cm. It is 50 cm long. Find the exact volume of material in the pipe, in terms of π.",
      "V = \\pi(3^2 - 2^2) \\times 50",
      "250π",
      "V_outer = π × 9 × 50 = 450π. V_inner = π × 4 × 50 = 200π. Volume of material = 450π − 200π = 250π cm³.",
      "Subtract the inner cylinder volume from the outer cylinder volume.",
      ["785", "785.4"],
    ),
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
      "SA = 2\\pi r^2 + 2\\pi r h",
      "130π",
      "Two circles: 2π × 25 = 50π. Curved surface: 2π × 5 × 8 = 80π. SA = 50π + 80π = 130π cm².",
      "Find the area of the two circular ends and the curved surface separately, then add.",
      ["408", "408.4"],
    ),
    answer(
      "y8-vsa-sc-g3",
      "Find the exact surface area of a closed cylinder with radius 3 cm and height 4 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
      "42π",
      "Two circles: 2π × 9 = 18π. Curved surface: 2π × 3 × 4 = 24π. SA = 18π + 24π = 42π cm².",
      "Apply SA = 2πr² + 2πrh with r = 3 and h = 4.",
      ["132", "131.9"],
    ),
    answer(
      "y8-vsa-sc-g4",
      "Find the exact surface area of a closed cylinder with radius 4 cm and height 6 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
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
      "SA = 2\\pi r^2 + 2\\pi r h",
      "192π",
      "Two circles: 2π × 36 = 72π. Curved surface: 2π × 6 × 10 = 120π. SA = 72π + 120π = 192π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["603", "603.2"],
    ),
    answer(
      "y8-vsa-sc-i2",
      "Find the exact surface area of a closed cylinder with radius 2 cm and height 8 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
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
      "2\\pi \\times 3 \\times (3 + h) = 60\\pi",
      "7",
      "6π(3 + h) = 60π. Divide both sides by 6π: 3 + h = 10, so h = 7 cm.",
      "Use SA = 2πr(r + h), substitute r = 3, then solve for h.",
    ),
    answer(
      "y8-vsa-sc-i5",
      "Find the exact surface area of a closed cylinder with radius 4 cm and height 11 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
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
      "SA = 2\\pi r^2 + 2\\pi r h",
      "168π",
      "Two circles: 2π × 49 = 98π. Curved surface: 2π × 7 × 5 = 70π. SA = 98π + 70π = 168π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["528", "527.8"],
    ),
    answer(
      "y8-vsa-sc-m2",
      "Find the exact surface area of a closed cylinder with radius 10 cm and height 4 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
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
      "2\\pi \\times 4 \\times (4 + h) = 80\\pi",
      "6",
      "8π(4 + h) = 80π. Divide both sides by 8π: 4 + h = 10, so h = 6 cm.",
      "Use SA = 2πr(r + h), substitute r = 4, then solve for h.",
    ),
    answer(
      "y8-vsa-sc-m5",
      "Find the exact surface area of a closed cylinder with radius 9 cm and height 5 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
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
      "SA = \\pi r^2 + 2\\pi r h",
      "132π",
      "Base: π × 36 = 36π. Curved side: 2π × 6 × 8 = 96π. SA = 36π + 96π = 132π cm².",
      "An open-top cylinder has one circular base plus the curved side — omit the top face.",
      ["415", "414.7"],
    ),
    answer(
      "y8-vsa-sc-m8",
      "A closed cylinder has radius 8 cm and surface area $272\\pi$ cm². Find its height.",
      "2\\pi \\times 8 \\times (8 + h) = 272\\pi",
      "9",
      "16π(8 + h) = 272π. Divide both sides by 16π: 8 + h = 17, so h = 9 cm.",
      "Use SA = 2πr(r + h), substitute r = 8, then solve for h.",
    ),
    answer(
      "y8-vsa-sc-m9",
      "An open-top water tank has radius 3 m and height 5 m. Find the exact surface area of the inner surface (base and curved wall only). Express in terms of π.",
      "SA = \\pi r^2 + 2\\pi r h",
      "39π",
      "Base: π × 9 = 9π. Curved wall: 2π × 3 × 5 = 30π. SA = 9π + 30π = 39π m².",
      "An open-top tank has one circular base plus the curved inner wall.",
      ["122", "122.5"],
    ),
    answer(
      "y8-vsa-sc-m10",
      "Find the exact surface area of a closed cylinder with radius 5 cm and height 12 cm. Express in terms of π.",
      "SA = 2\\pi r^2 + 2\\pi r h",
      "170π",
      "Two circles: 2π × 25 = 50π. Curved surface: 2π × 5 × 12 = 120π. SA = 50π + 120π = 170π cm².",
      "Apply SA = 2πr² + 2πrh.",
      ["534", "534.1"],
    ),
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
      "V = 10 \\times 4 \\times 2 + 6 \\times 4 \\times 3",
      "152",
      "V_A = 80 cm³. V_B = 72 cm³. Total = 80 + 72 = 152 cm³.",
      "Calculate each prism volume separately then add.",
    ),
    answer(
      "y8-vsa-cv-g3",
      "A rectangular prism (8 cm × 6 cm × 4 cm) has a small rectangular block (3 cm × 2 cm × 4 cm) removed from it. Find the remaining volume.",
      "V = 8 \\times 6 \\times 4 - 3 \\times 2 \\times 4",
      "168",
      "Outer = 192 cm³. Removed = 24 cm³. Remaining = 192 − 24 = 168 cm³.",
      "Subtract the removed piece from the full outer shape.",
    ),
    answer(
      "y8-vsa-cv-g4",
      "A doorstop consists of a rectangular prism (10 cm × 4 cm × 3 cm) with a triangular prism on top. The triangle has base 4 cm and height 2 cm; the prism is 10 cm long. Find the total volume.",
      "V = 10 \\times 4 \\times 3 + \\tfrac{1}{2} \\times 4 \\times 2 \\times 10",
      "160",
      "Rectangular V = 120 cm³. Triangular V = ½ × 4 × 2 × 10 = 40 cm³. Total = 160 cm³.",
      "The triangular prism formula is ½ × base × height × length.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-cv-i1",
      "Two rectangular prisms are joined. Prism A is 12 cm × 6 cm × 3 cm. Prism B is 5 cm × 6 cm × 2 cm. Find the total volume.",
      "V = 12 \\times 6 \\times 3 + 5 \\times 6 \\times 2",
      "276",
      "V_A = 216 cm³. V_B = 60 cm³. Total = 276 cm³.",
      "Add both rectangular prism volumes.",
    ),
    answer(
      "y8-vsa-cv-i2",
      "An L-shaped solid consists of two rectangular prisms. Prism A is 15 cm × 5 cm × 4 cm and Prism B is 5 cm × 5 cm × 6 cm. Find the total volume.",
      "V = 15 \\times 5 \\times 4 + 5 \\times 5 \\times 6",
      "450",
      "V_A = 300 cm³. V_B = 150 cm³. Total = 450 cm³.",
      "Identify each rectangular prism and calculate both volumes separately.",
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
      "V = 10 \\times 8 \\times 5 - 4 \\times 2 \\times 5",
      "360",
      "Outer V = 400 cm³. Hole V = 40 cm³. Remaining = 400 − 40 = 360 cm³.",
      "Subtract the removed rectangular volume from the full outer prism.",
    ),
    answer(
      "y8-vsa-cv-i5",
      "Two triangular prisms are joined. Prism A has a right-triangle cross-section with base 6 cm and height 4 cm; it is 8 cm long. Prism B has base 3 cm and height 2 cm; also 8 cm long. Find the total volume.",
      "V = \\tfrac{1}{2} \\times 6 \\times 4 \\times 8 + \\tfrac{1}{2} \\times 3 \\times 2 \\times 8",
      "120",
      "V_A = ½ × 6 × 4 × 8 = 96 cm³. V_B = ½ × 3 × 2 × 8 = 24 cm³. Total = 120 cm³.",
      "Each triangular prism: V = ½ × base × height × length.",
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
      "V = 8 \\times 6 \\times 4 + 4 \\times 6 \\times 3",
      "264",
      "V_A = 192 cm³. V_B = 72 cm³. Total = 192 + 72 = 264 cm³.",
      "Add both rectangular prism volumes.",
    ),
    answer(
      "y8-vsa-cv-m2",
      "A rectangular prism (12 cm × 8 cm × 5 cm) has a square hole (3 cm × 3 cm × 5 cm) removed from it. Find the remaining volume.",
      "V = 12 \\times 8 \\times 5 - 3 \\times 3 \\times 5",
      "435",
      "Outer = 480 cm³. Removed = 45 cm³. Remaining = 480 − 45 = 435 cm³.",
      "Subtract the removed prism volume from the full outer prism.",
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
      "V = 10 \\times 6 \\times 4 + \\tfrac{1}{2} \\times 6 \\times 3 \\times 10",
      "330",
      "V_rect = 240 cm³. V_tri = ½ × 6 × 3 × 10 = 90 cm³. Total = 330 cm³.",
      "The triangular prism is on top — add its volume to the rectangular prism volume.",
    ),
    answer(
      "y8-vsa-cv-m5",
      "A stepped solid has a lower rectangular prism (14 cm × 6 cm × 3 cm) and an upper rectangular prism (8 cm × 6 cm × 3 cm) placed on top of one end. Find the total volume.",
      "V = 14 \\times 6 \\times 3 + 8 \\times 6 \\times 3",
      "396",
      "Lower V = 252 cm³. Upper V = 144 cm³. Total = 252 + 144 = 396 cm³.",
      "Add both rectangular prism volumes — neither is removed.",
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
      "V = 14 \\times 6 \\times 3 + 8 \\times 6 \\times 4",
      "444",
      "Lower V = 252 cm³. Upper V = 192 cm³. Total = 252 + 192 = 444 cm³.",
      "Add both rectangular prism volumes, noting the different heights.",
    ),
    answer(
      "y8-vsa-cv-m8",
      "A garden bed is L-shaped. One section is 4 m long and 2 m wide; the other is 3 m long and 1 m wide. Both sections are 0.5 m deep. Find the total volume of soil needed.",
      "V = 4 \\times 2 \\times 0.5 + 3 \\times 1 \\times 0.5",
      "5.5",
      "Section A: 4 × 2 × 0.5 = 4 m³. Section B: 3 × 1 × 0.5 = 1.5 m³. Total = 5.5 m³.",
      "Split the L-shape into two rectangles and find each section's volume.",
    ),
    answer(
      "y8-vsa-cv-m9",
      "A cylindrical pipe has outer radius 5 cm and inner radius 3 cm. It is 20 cm long. Find the exact volume of material in the pipe. Express your answer in terms of π.",
      "V = \\pi(5^2 - 3^2) \\times 20",
      "320π",
      "V_outer = π × 25 × 20 = 500π. V_inner = π × 9 × 20 = 180π. Material = 500π − 180π = 320π cm³.",
      "Subtract the volume of the hollow inner cylinder from the full outer cylinder.",
      ["1005", "1005.3"],
    ),
    answer(
      "y8-vsa-cv-m10",
      "A doorstop is a rectangular prism (8 cm × 5 cm × 4 cm) with a triangular prism on top. The triangular cross-section has base 8 cm and height 3 cm; the prism is 5 cm long. Find the total volume.",
      "V = 8 \\times 5 \\times 4 + \\tfrac{1}{2} \\times 8 \\times 3 \\times 5",
      "220",
      "V_rect = 160 cm³. V_tri = ½ × 8 × 3 × 5 = 60 cm³. Total = 220 cm³.",
      "Identify the two component shapes and add their volumes.",
    ),
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
      "SA = 248 + 108 - 2 \\times 24",
      "308",
      "SA_large = 2(60+40+24) = 248. SA_small = 2(24+18+12) = 108. Joint = 24. SA = 248+108−48 = 308 cm².",
      "Use SA = SA₁ + SA₂ − 2 × joint area.",
    ),
    answer(
      "y8-vsa-cs-g3",
      "A small rectangular prism (3 cm × 6 cm × 2 cm) is placed on top of a large rectangular prism (12 cm × 6 cm × 4 cm). Their shared joint face is 3 cm × 6 cm. Find the total surface area.",
      "SA = 288 + 72 - 2 \\times 18",
      "324",
      "SA_large = 2(72+48+24) = 288. SA_small = 2(18+6+12) = 72. Joint = 18. SA = 288+72−36 = 324 cm².",
      "Calculate full SA of each prism, then subtract 2 × joint area.",
    ),
    answer(
      "y8-vsa-cs-g4",
      "A house shape has a rectangular base (8 cm × 5 cm × 4 cm) with a triangular prism roof. The triangle has base 8 cm, height 3 cm and slant sides 5 cm; the prism is 5 cm long. Find the total surface area.",
      "SA = (40 + 64 + 40) + (24 + 50)",
      "218",
      "Base exposed (no top): 8×5 + 2×8×4 + 2×5×4 = 40+64+40 = 144. Roof (no bottom): 2×(½×8×3) + 2×(5×5) = 24+50 = 74. Total = 144+74 = 218 cm².",
      "Exclude the top of the base and the bottom of the roof — both are at the join.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-vsa-cs-i1",
      "A small rectangular prism (6 cm × 4 cm × 5 cm) sits on top of a large rectangular prism (12 cm × 8 cm × 3 cm). Their joint face is 6 cm × 4 cm. Find the total surface area.",
      "SA = 312 + 148 - 2 \\times 24",
      "412",
      "SA_large = 2(96+36+24) = 312. SA_small = 2(24+30+20) = 148. Joint = 24. SA = 312+148−48 = 412 cm².",
      "Apply SA = SA₁ + SA₂ − 2 × joint area.",
    ),
    answer(
      "y8-vsa-cs-i2",
      "A small rectangular prism (6 cm × 3 cm × 4 cm) is placed on top of a large rectangular prism (14 cm × 5 cm × 3 cm). Their joint face is 6 cm × 3 cm. Find the total surface area.",
      "SA = 254 + 108 - 2 \\times 18",
      "326",
      "SA_large = 2(70+42+15) = 254. SA_small = 2(18+24+12) = 108. Joint = 18. SA = 254+108−36 = 326 cm².",
      "Identify the joint face dimensions and apply the composite SA formula.",
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
      "SA = 352 + 158 - 2 \\times 40",
      "430",
      "SA_large = 2(96+48+32) = 352. SA_small = 2(40+24+15) = 158. Joint = 40. SA = 352+158−80 = 430 cm².",
      "Carefully calculate each full SA, identify the joint, then subtract 2 × joint.",
    ),
    answer(
      "y8-vsa-cs-i5",
      "A house shape has a rectangular base (6 cm × 4 cm × 3 cm) with a triangular prism roof. The triangle has base 6 cm, height 4 cm and slant sides 5 cm; the prism is 4 cm long. Find the total surface area.",
      "SA = (24 + 36 + 24) + (24 + 40)",
      "148",
      "Base exposed (no top): 6×4 + 2×6×3 + 2×4×3 = 24+36+24 = 84. Roof (no bottom): 2×(½×6×4) + 2×(5×4) = 24+40 = 64. Total = 84+64 = 148 cm².",
      "For the roof, include only the triangular ends and the slant rectangles — not the base rectangle.",
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
      "SA = 304 + 108 - 2 \\times 24",
      "364",
      "SA_large = 2(80+40+32) = 304. SA_small = 2(24+18+12) = 108. Joint = 24. SA = 304+108−48 = 364 cm².",
      "Apply SA = SA₁ + SA₂ − 2 × joint area.",
    ),
    answer(
      "y8-vsa-cs-m2",
      "A small square prism (6 cm × 6 cm × 3 cm) sits centred on top of a large square prism (8 cm × 8 cm × 5 cm). Their joint face is 6 cm × 6 cm. Find the total surface area.",
      "SA = 288 + 144 - 2 \\times 36",
      "360",
      "SA_large = 2(64+40+40) = 288. SA_small = 2(36+18+18) = 144. Joint = 36. SA = 288+144−72 = 360 cm².",
      "Full SA of each prism, minus 2 × joint. The joint is where the small prism base meets the large prism top.",
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
      "SA = (72 + 96 + 48) + (96 + 120)",
      "432",
      "Base exposed (no top): 72+96+48 = 216. Roof (no bottom): 2×(½×12×8)+2×(10×6) = 96+120 = 216. Total = 432 cm².",
      "Slant side check: half-base = 6, height = 8 → slant = √(36+64) = 10. ✓",
    ),
    answer(
      "y8-vsa-cs-m5",
      "A stepped solid has a lower rectangular prism (14 cm × 6 cm × 3 cm) with an upper rectangular prism (8 cm × 6 cm × 3 cm) on top of one end. Their joint face is 8 cm × 6 cm. Find the total surface area.",
      "SA = 288 + 180 - 2 \\times 48",
      "372",
      "SA_lower = 2(84+42+18) = 288. SA_upper = 2(48+24+18) = 180. Joint = 48. SA = 288+180−96 = 372 cm².",
      "A stepped solid has the upper prism sitting on part of the lower prism's top — that shared face is the joint.",
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
      "SA = (32 + 80 + 40) + (24 + 40)",
      "216",
      "Base exposed (no top): 8×4 + 2×8×5 + 2×4×5 = 32+80+40 = 152. Roof (no bottom): 2×(½×8×3)+2×(5×4) = 24+40 = 64. Total = 216 cm².",
      "Half-base = 4, height = 3 → slant = √(16+9) = 5. The two slant rectangles are 5×4 each.",
    ),
    answer(
      "y8-vsa-cs-m8",
      "A staircase consists of three rectangular prisms. Step 1 (bottom) is 12 cm × 6 cm × 2 cm. Step 2 is 8 cm × 6 cm × 2 cm placed on top. Step 3 is 4 cm × 6 cm × 2 cm placed on top of Step 2. Find the total surface area.",
      "SA = 216 + 152 + 88 - 2 \\times 48 - 2 \\times 24",
      "312",
      "SA₁ = 2(72+24+12) = 216. SA₂ = 2(48+16+12) = 152. SA₃ = 2(24+8+12) = 88. Joint 1-2 = 48. Joint 2-3 = 24. SA = 456−96−48 = 312 cm².",
      "Apply the composite SA formula twice: once for each joint between adjacent steps.",
    ),
    answer(
      "y8-vsa-cs-m9",
      "Two closed cylinders are stacked. The large cylinder has radius 6 cm and height 10 cm. The small cylinder has radius 3 cm and height 5 cm, placed on top. Their joint face is a circle with radius 3 cm. Find the total exact surface area in terms of π.",
      "SA = 192\\pi + 48\\pi - 2 \\times 9\\pi",
      "222π",
      "SA_large = 2π×36 + 2π×6×10 = 72π+120π = 192π. SA_small = 2π×9 + 2π×3×5 = 18π+30π = 48π. Joint = π×9 = 9π. SA = 192π+48π−18π = 222π cm².",
      "Joint area = π × r² of the smaller cylinder. Subtract it twice.",
      ["697", "697.4"],
    ),
    answer(
      "y8-vsa-cs-m10",
      "Three rectangular prisms are stacked in tiers. P1 (bottom): 12 cm × 10 cm × 3 cm. P2 (middle): 8 cm × 6 cm × 4 cm. P3 (top): 4 cm × 3 cm × 5 cm. Joint P1–P2 area = 48 cm². Joint P2–P3 area = 12 cm². Find the total surface area.",
      "SA = 372 + 208 + 94 - 2 \\times 48 - 2 \\times 12",
      "554",
      "SA_P1 = 2(120+36+30) = 372. SA_P2 = 2(48+32+24) = 208. SA_P3 = 2(12+20+15) = 94. SA = 372+208+94−96−24 = 554 cm².",
      "Subtract 2 × joint area for each of the two joins.",
    ),
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

export function year8VolumeSurfaceAreaLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics" || unit.slug !== "volume-and-surface-area") {
    return null;
  }

  const content = lessons[lesson.slug];
  if (!content) return null;

  return {
    syllabusArea: "Measurement and Space",
    masteryPassMark: 0.8,
    ...content,
  };
}
