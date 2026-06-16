import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import {
  practicalChoice,
  measurementAnswer as baseMeasurementAnswer,
} from "../questionHelpers";

function measurementFeedback(prompt: string, answer: string) {
  const p = prompt.toLowerCase();
  if (p.includes("total surface area") || p.includes("tsa") || p.includes("surface area")) {
    return `Find the area of every face and add them together. Label each face before calculating to avoid missing one. This gives ${answer}.`;
  }
  if (p.includes("volume") && (p.includes("prism") || p.includes("cylinder") || p.includes("rectangular"))) {
    return `Volume of a prism is V = Ah, where A is the cross-sectional area and h is the length. Identify the cross-section shape first, then multiply by the height to get ${answer}.`;
  }
  if (p.includes("sphere")) {
    return `Volume of a sphere uses V = (4/3)πr³. Cube the radius, then multiply by 4π/3 to get ${answer}.`;
  }
  if (p.includes("litre") || p.includes("kilolitre") || p.includes("capacity")) {
    return `1 cm³ = 1 mL, 1000 cm³ = 1 L. Convert cubic centimetres to litres by dividing by 1000 to get ${answer}.`;
  }
  if (p.includes("composite") || p.includes("combined") || p.includes("subtract")) {
    return `For composite solids, either add or subtract volumes of basic shapes. Identify which basic solid to use before calculating to get ${answer}.`;
  }
  return `Identify the solid, select the correct formula, substitute the measurements, and round only at the end to get ${answer}.`;
}

function measurementAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseMeasurementAnswer(id, prompt, latex, answer, acceptedAnswers),
    explanation: measurementFeedback(prompt, answer),
  };
}

export function year12Standard2MeasurementSAVLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-2") return null;
  if (unit.slug !== "measurement-surface-area-volume") return null;

  const base = { masteryPassMark: 0.8 };

  if (lesson.slug === "surface-area-prisms-cylinders") {
    return {
      ...base,
      description:
        "Find the total surface area of rectangular prisms, triangular prisms and cylinders by identifying each face, using nets, and applying TSA formulas.",
      learningIntention:
        "Calculate total surface area of prisms and cylinders by finding and adding the area of every face.",
      successCriteria: [
        "Identify all faces of a rectangular prism, triangular prism, or cylinder.",
        "Apply TSA = 2(lw + lh + wh) for a rectangular prism.",
        "Apply TSA = 2πr² + 2πrh for a closed cylinder.",
        "Use a net to organise the face areas before adding.",
      ],
      teaching: {
        paragraphs: [
          "Total surface area (TSA) is the sum of the areas of all faces of a solid. Every face must be included.",
          "A rectangular prism has 6 rectangular faces: top/bottom (lw), front/back (lh), and left/right (wh). Each pair appears twice: TSA = 2(lw + lh + wh).",
          "A cylinder has two circular ends and one curved surface. Unroll the curved surface into a rectangle with width 2πr and height h. TSA = 2πr² + 2πrh.",
          "A triangular prism has two triangular faces and three rectangular faces. Find the triangle area first (A = bh/2), then multiply by 2; then find each rectangular face separately.",
        ],
        latexBlocks: [
          "\\text{Rectangular prism: TSA}=2(lw+lh+wh)",
          "\\text{Cylinder: TSA}=2\\pi r^2+2\\pi rh",
          "\\text{Triangular prism: TSA}=2\\times\\text{triangle}+\\text{3 rectangles}",
        ],
      },
      workedExamples: [
        {
          title: "TSA of a rectangular prism",
          questionLatex:
            "l=8\\text{ cm},\\;w=5\\text{ cm},\\;h=3\\text{ cm}.",
          steps: [
            {
              explanation: "Apply TSA = 2(lw + lh + wh).",
              latex: "TSA=2(8\\times5+8\\times3+5\\times3)=2(40+24+15)=2(79)=158",
            },
          ],
          finalAnswerLatex: "TSA=158\\text{ cm}^2",
        },
        {
          title: "TSA of a closed cylinder",
          questionLatex:
            "r=4\\text{ cm},\\;h=10\\text{ cm}.",
          steps: [
            {
              explanation: "Two circular ends: 2πr².",
              latex: "2\\pi(4)^2=32\\pi",
            },
            {
              explanation: "Curved surface: 2πrh.",
              latex: "2\\pi(4)(10)=80\\pi",
            },
            {
              explanation: "Add the two parts.",
              latex: "TSA=112\\pi\\approx351.9\\text{ cm}^2",
            },
          ],
          finalAnswerLatex: "TSA=112\\pi\\approx351.9\\text{ cm}^2",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-sa-g1", "Find the total surface area of a rectangular prism with l = 6, w = 4, h = 2 (all in cm).", "TSA=2(lw+lh+wh)=2(24+12+8)", "88 cm^2", ["88", "88cm²", "88 cm2"]),
        measurementAnswer("y12s2-sa-g2", "Find the area of one circular end of a cylinder with r = 3 cm.", "A=\\pi r^2=\\pi(3)^2", "9π cm^2", ["9pi cm²", "28.27 cm^2", "28.3 cm^2"]),
        practicalChoice("y12s2-sa-g3", "A cylinder with r = 5 cm and h = 12 cm. The curved surface area is:", "C", ["60π cm²", "25π cm²", "120π cm²", "144π cm²"], "Curved SA = 2πrh = 2π(5)(12) = 120π."),
        practicalChoice("y12s2-sa-g4", "A rectangular box is opened at the top. How many faces contribute to the surface area?", "B", ["6", "5", "4", "3"], "Remove one face (the open top): 5 faces remain."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-sa-i1", "Find the TSA of a rectangular prism: l = 10 cm, w = 6 cm, h = 4 cm.", "TSA=2(lw+lh+wh)", "248 cm^2", ["248", "248cm²"]),
        measurementAnswer("y12s2-sa-i2", "Find the TSA of a closed cylinder with r = 7 cm, h = 15 cm. Give your answer to 1 decimal place.", "TSA=2\\pi r^2+2\\pi rh", "967.6 cm^2", ["967.6", "967.6 cm2", "967.6cm²"]),
        measurementAnswer("y12s2-sa-i3", "A triangular prism has equilateral triangular faces with base 6 cm and height 5.2 cm. The prism length is 10 cm. Find the TSA.", "TSA=2\\times\\frac{1}{2}(6)(5.2)+3\\times(6\\times10)", "211.2 cm^2", ["211.2", "211.2 cm2"]),
        practicalChoice("y12s2-sa-i4", "A cylindrical can with r = 5 and h = 20. Which formula gives the TSA?", "A", ["2π(5)² + 2π(5)(20)", "π(5)² + 2π(5)(20)", "2π(5)(20)", "2π(25)² + 2π(5)(20)"], "Closed cylinder: two circles plus curved surface."),
        measurementAnswer("y12s2-sa-i5", "Find the TSA of a cube with side length 9 cm.", "TSA=6s^2=6\\times81", "486 cm^2", ["486", "486cm²"]),
      ],
      commonMistakes: [
        { mistake: "Forgetting to count both ends of a cylinder.", fix: "A closed cylinder has two circular faces: 2πr²." },
        { mistake: "Using diameter instead of radius in formulas.", fix: "The formulas use radius r. If given diameter d, compute r = d/2 first." },
        { mistake: "Missing a face on a rectangular prism.", fix: "List all 6 faces: top, bottom, front, back, left, right. Group in pairs." },
        { mistake: "Confusing TSA with volume.", fix: "TSA is measured in cm² (area units). Volume is measured in cm³." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-sa-m1", "Find the TSA of a rectangular prism: l = 5, w = 3, h = 2 (all in cm).", "TSA=2(lw+lh+wh)", "62 cm^2", ["62", "62cm²"]),
        practicalChoice("y12s2-sa-m2", "The formula TSA = 2πr² + 2πrh is for:", "B", ["A cone", "A closed cylinder", "A sphere", "A triangular prism"], "This is the closed cylinder formula."),
        measurementAnswer("y12s2-sa-m3", "TSA of a closed cylinder with r = 2 cm and h = 8 cm. Give exact answer in terms of π.", "TSA=2\\pi(2)^2+2\\pi(2)(8)=8\\pi+32\\pi", "40π cm^2", ["40pi cm²", "40π"]),
        measurementAnswer("y12s2-sa-m4", "A storage box (no lid): l = 20, w = 15, h = 10 (all in cm). Find the open TSA.", "TSA=2(lh+wh)+lw=2(200+150)+300", "1000 cm^2", ["1000", "1000cm²"]),
        practicalChoice("y12s2-sa-m5", "The curved surface of a cylinder is 'unrolled' into a rectangle. Its dimensions are:", "C", ["r × h", "π r × h", "2πr × h", "r² × 2π"], "When unrolled: width = circumference = 2πr, height = h."),
        measurementAnswer("y12s2-sa-m6", "Find the TSA of a rectangular prism: l = 12, w = 9, h = 6 (all in cm).", "TSA=2(108+72+54)", "468 cm^2", ["468", "468cm²"]),
        measurementAnswer("y12s2-sa-m7", "Find the curved surface area of a cylinder with diameter 10 cm and height 25 cm.", "CSA=2\\pi r h=2\\pi(5)(25)", "250π cm^2", ["250pi cm²", "785.4 cm^2"]),
        practicalChoice("y12s2-sa-m8", "A rectangular prism has l = w = h = 4 cm. Its TSA is:", "A", ["96 cm²", "64 cm²", "48 cm²", "192 cm²"], "TSA = 6 × 4² = 6 × 16 = 96 cm²."),
        measurementAnswer("y12s2-sa-m9", "A cylinder has r = 6 cm and h = 20 cm. Find TSA to 1 decimal place.", "TSA=2\\pi(36)+2\\pi(6)(20)=72\\pi+240\\pi=312\\pi", "980.2 cm^2", ["980.2", "980.2cm²"]),
        practicalChoice("y12s2-sa-m10", "For a triangular prism, which faces are triangular?", "B", ["The longest face", "The two ends", "The three rectangular sides", "All five faces"], "A triangular prism has two triangular ends and three rectangular sides."),
      ],
    };
  }

  if (lesson.slug === "volume-prisms-cylinders-spheres") {
    return {
      ...base,
      description:
        "Calculate volume using V = Ah for prisms, V = πr²h for cylinders and V = (4/3)πr³ for spheres, and convert between cm³, m³ and litres.",
      learningIntention:
        "Apply volume formulas for prisms, cylinders and spheres, and convert between volume and capacity units.",
      successCriteria: [
        "Apply V = Ah for any right prism, identifying the cross-sectional area A.",
        "Apply V = πr²h for a cylinder.",
        "Apply V = (4/3)πr³ for a sphere.",
        "Convert between cm³, m³ and litres (1 cm³ = 1 mL; 1 L = 1000 cm³; 1 m³ = 1000 L).",
      ],
      teaching: {
        paragraphs: [
          "The volume of any right prism is V = Ah, where A is the area of the cross-section and h is the length (or height) of the prism. For a rectangular prism, A = lw, so V = lwh.",
          "For a cylinder, the cross-section is a circle: A = πr². So V = πr²h.",
          "For a sphere of radius r: V = (4/3)πr³. This formula must be memorised.",
          "Capacity conversions: 1 mL = 1 cm³; 1 L = 1000 mL = 1000 cm³; 1 m³ = 1 000 000 cm³ = 1000 L = 1 kL.",
        ],
        latexBlocks: [
          "V=Ah\\;(\\text{prism}),\\quad V=\\pi r^2h\\;(\\text{cylinder})",
          "V=\\frac{4}{3}\\pi r^3\\;(\\text{sphere})",
          "1\\text{ cm}^3=1\\text{ mL},\\quad1\\text{ L}=1000\\text{ cm}^3,\\quad1\\text{ m}^3=1000\\text{ L}",
        ],
      },
      workedExamples: [
        {
          title: "Volume of a cylinder",
          questionLatex:
            "r=5\\text{ cm},\\;h=12\\text{ cm}.",
          steps: [
            {
              explanation: "Apply V = πr²h.",
              latex: "V=\\pi(5)^2(12)=300\\pi\\approx942.5\\text{ cm}^3",
            },
            {
              explanation: "Convert to litres: divide by 1000.",
              latex: "V=942.5\\div1000=0.9425\\text{ L}",
            },
          ],
          finalAnswerLatex: "V\\approx942.5\\text{ cm}^3=0.9425\\text{ L}",
        },
        {
          title: "Volume of a sphere",
          questionLatex:
            "r=6\\text{ cm}.",
          steps: [
            {
              explanation: "Apply V = (4/3)πr³.",
              latex: "V=\\frac{4}{3}\\pi(6)^3=\\frac{4}{3}\\pi(216)=288\\pi\\approx904.8\\text{ cm}^3",
            },
          ],
          finalAnswerLatex: "V\\approx904.8\\text{ cm}^3",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-vol-g1", "Find the volume of a rectangular prism: l = 10, w = 4, h = 5 (all in cm).", "V=lwh=10\\times4\\times5", "200 cm^3", ["200", "200cm³"]),
        measurementAnswer("y12s2-vol-g2", "Find the volume of a cylinder with r = 3 cm and h = 8 cm. Give exact answer in terms of π.", "V=\\pi r^2h=\\pi(9)(8)", "72π cm^3", ["72pi cm³", "72π"]),
        practicalChoice("y12s2-vol-g3", "The volume formula for a sphere with radius 4 cm is:", "B", ["(4/3)π(16)", "(4/3)π(64)", "4π(4)²", "π(4)³/3"], "V = (4/3)πr³ = (4/3)π(4³) = (4/3)π(64)."),
        practicalChoice("y12s2-vol-g4", "A volume of 3500 cm³ is equal to how many litres?", "C", ["0.35 L", "35 L", "3.5 L", "350 L"], "1 L = 1000 cm³. 3500 ÷ 1000 = 3.5 L."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-vol-i1", "Find the volume of a triangular prism with triangular cross-section base 6 cm, height 4 cm and prism length 15 cm.", "V=Ah=\\frac{1}{2}(6)(4)\\times15", "180 cm^3", ["180", "180cm³"]),
        measurementAnswer("y12s2-vol-i2", "Find the volume of a cylinder with r = 10 cm and h = 30 cm. Give answer to 1 decimal place.", "V=\\pi(100)(30)", "9424.8 cm^3", ["9424.8", "9424.8cm³"]),
        measurementAnswer("y12s2-vol-i3", "Find the volume of a sphere with r = 3 cm to 1 decimal place.", "V=\\frac{4}{3}\\pi(3)^3", "113.1 cm^3", ["113.1", "113.1cm³"]),
        measurementAnswer("y12s2-vol-i4", "A cylindrical tank has r = 0.8 m and h = 2 m. Find the volume in m³ to 2 decimal places.", "V=\\pi(0.64)(2)", "4.02 m^3", ["4.02", "4.02m³"]),
        measurementAnswer("y12s2-vol-i5", "The tank in i4 holds how many litres? (1 m³ = 1000 L)", "V=4.02\\text{ m}^3\\times1000", "4020 L", ["4020", "4020L"]),
      ],
      commonMistakes: [
        { mistake: "Using diameter instead of radius in V = πr²h or V = (4/3)πr³.", fix: "If given diameter d, halve it: r = d/2 before substituting." },
        { mistake: "Forgetting to cube the radius for a sphere.", fix: "V = (4/3)πr³ — the r is cubed, not squared." },
        { mistake: "Confusing volume units with area units.", fix: "Volume is in cm³ or m³ (three dimensions multiplied). Area is in cm² or m²." },
        { mistake: "Not converting to litres when asked for capacity.", fix: "Divide cm³ by 1000 to get litres. The formula gives cm³; the question may ask for L." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-vol-m1", "Find the volume of a rectangular prism: l = 8, w = 6, h = 4 (all in cm).", "V=lwh", "192 cm^3", ["192", "192cm³"]),
        practicalChoice("y12s2-vol-m2", "V = (4/3)πr³ is the formula for:", "C", ["Cylinder", "Rectangular prism", "Sphere", "Triangular prism"], "The sphere volume formula."),
        measurementAnswer("y12s2-vol-m3", "Find the volume of a cylinder with r = 6 cm and h = 10 cm. Give exact answer in terms of π.", "V=\\pi(36)(10)", "360π cm^3", ["360pi cm³", "360π"]),
        measurementAnswer("y12s2-vol-m4", "Find the volume of a sphere with r = 9 cm to 1 decimal place.", "V=\\frac{4}{3}\\pi(9)^3=\\frac{4}{3}\\pi(729)", "3053.6 cm^3", ["3053.6", "3053.6cm³"]),
        practicalChoice("y12s2-vol-m5", "A volume of 2.4 m³ is how many litres?", "B", ["24 L", "2400 L", "240 L", "24000 L"], "1 m³ = 1000 L. 2.4 × 1000 = 2400 L."),
        measurementAnswer("y12s2-vol-m6", "A triangular prism: right-triangle cross-section with legs 5 and 12 cm, prism length 20 cm. Find the volume.", "V=\\frac{1}{2}(5)(12)\\times20", "600 cm^3", ["600", "600cm³"]),
        practicalChoice("y12s2-vol-m7", "For a cylinder with diameter 14 cm and h = 10 cm, the correct radius is:", "B", ["14 cm", "7 cm", "28 cm", "3.5 cm"], "r = diameter/2 = 14/2 = 7 cm."),
        measurementAnswer("y12s2-vol-m8", "Find the volume of a cylinder with diameter 14 cm and h = 10 cm to 1 decimal place.", "V=\\pi(7)^2(10)", "1539.4 cm^3", ["1539.4", "1539.4cm³"]),
        measurementAnswer("y12s2-vol-m9", "A sphere has r = 5 cm. Find V to the nearest whole number.", "V=\\frac{4}{3}\\pi(125)", "524 cm^3", ["524", "524cm³"]),
        practicalChoice("y12s2-vol-m10", "A cylinder with V = 1256.6 cm³ holds how many mL (1 cm³ = 1 mL)?", "A", ["1256.6 mL", "12566 mL", "125.66 mL", "12.566 mL"], "1 cm³ = 1 mL exactly."),
      ],
    };
  }

  if (lesson.slug === "composite-solids-practical") {
    return {
      ...base,
      description:
        "Find surface area and volume of composite solids formed by combining or removing basic shapes, and solve practical capacity and material-cost problems.",
      learningIntention:
        "Decompose composite solids into familiar shapes and apply appropriate formulas to find total surface area and volume.",
      successCriteria: [
        "Identify a composite solid as two or more basic solids joined or subtracted.",
        "Find the volume of a composite solid by adding or subtracting component volumes.",
        "Find the exposed surface area by adding outer faces and subtracting joined internal faces.",
        "Solve practical problems involving capacity (tanks) or material quantities (paint, concrete).",
      ],
      teaching: {
        paragraphs: [
          "A composite solid is formed by joining two or more basic solids (prisms, cylinders, spheres) or by removing one from another.",
          "Volume of composite = sum of component volumes (addition) or larger minus smaller (subtraction).",
          "Surface area is trickier: the joined face is internal and must be removed from each component before adding. Exposed area = sum of individual TSAs − 2 × joined face area.",
          "Practical applications: 'How many litres does the tank hold?' → find volume in cm³, then divide by 1000. 'How much paint?' → find the exposed surface area.",
        ],
        latexBlocks: [
          "V_{\\text{composite}}=V_1+V_2\\quad(\\text{or }V_1-V_2\\text{ for removal})",
          "\\text{SA}_{\\text{exposed}}=\\text{SA}_1+\\text{SA}_2-2\\times A_{\\text{joined}}",
          "\\text{Capacity (L)}=V(\\text{cm}^3)\\div1000",
        ],
      },
      workedExamples: [
        {
          title: "Volume of a composite solid (addition)",
          questionLatex:
            "\\text{A cylinder (r=3, h=8) sits on a rectangular prism (8×8×4, all in cm).}",
          steps: [
            {
              explanation: "Volume of cylinder.",
              latex: "V_1=\\pi(3)^2(8)=72\\pi\\approx226.2\\text{ cm}^3",
            },
            {
              explanation: "Volume of rectangular prism.",
              latex: "V_2=8\\times8\\times4=256\\text{ cm}^3",
            },
            {
              explanation: "Total volume.",
              latex: "V=226.2+256=482.2\\text{ cm}^3",
            },
          ],
          finalAnswerLatex: "V\\approx482.2\\text{ cm}^3",
        },
        {
          title: "Capacity of a cylindrical tank",
          questionLatex:
            "\\text{A cylindrical water tank: r=0.6 m, h=1.5 m. Find capacity in litres.}",
          steps: [
            {
              explanation: "Find volume in m³.",
              latex: "V=\\pi(0.36)(1.5)=0.54\\pi\\approx1.696\\text{ m}^3",
            },
            {
              explanation: "Convert to litres: 1 m³ = 1000 L.",
              latex: "\\text{Capacity}=1.696\\times1000=1696\\text{ L}",
            },
          ],
          finalAnswerLatex: "\\text{Capacity}\\approx1696\\text{ L}",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-comp-g1", "A composite shape consists of a rectangular prism (10 × 4 × 6 cm) on top of a rectangular prism (10 × 8 × 4 cm). Find the total volume.", "V=10\\times4\\times6+10\\times8\\times4", "560 cm^3", ["560", "560cm³"]),
        measurementAnswer("y12s2-comp-g2", "A cylindrical hole (r = 2, h = 10 cm) is drilled through a rectangular block (10 × 10 × 10 cm). Find the remaining volume to 1 decimal place.", "V=10^3-\\pi(2)^2(10)=1000-40\\pi", "874.3 cm^3", ["874.3", "874.3cm³"]),
        practicalChoice("y12s2-comp-g3", "A fish tank (rectangular prism) has length 60 cm, width 30 cm and water depth 40 cm. Its capacity is:", "C", ["7.2 L", "720 L", "72 L", "7200 L"], "V = 60 × 30 × 40 = 72000 cm³ = 72 L."),
        practicalChoice("y12s2-comp-g4", "When finding the surface area of a composite solid, the joined face is:", "B", ["Counted twice", "Removed from both shapes and not included in the total", "The largest face", "Added three times"], "The joined face is internal — subtract it from both components."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-comp-i1", "A solid consists of a triangular prism (A = 15 cm², length 20 cm) attached to a rectangular prism (20 × 8 × 6 cm). Find the total volume.", "V=15\\times20+20\\times8\\times6", "1260 cm^3", ["1260", "1260cm³"]),
        measurementAnswer("y12s2-comp-i2", "A cylindrical water tank with r = 1.2 m and h = 2 m. Find the capacity in kilolitres (1 m³ = 1 kL) to 2 decimal places.", "V=\\pi(1.44)(2)=2.88\\pi", "9.05 kL", ["9.05", "9.05kL"]),
        measurementAnswer("y12s2-comp-i3", "A concrete step is a prism with a right-angle cross-section: two 'treads' each 30 × 15 cm and risers 15 cm tall. The step is 1.2 m (120 cm) wide. Find the volume of concrete needed.", "V=A_{\\text{cross}}\\times120=(30\\times15+30\\times15)\\times120", "108000 cm^3", ["108000", "108000cm³"]),
        practicalChoice("y12s2-comp-i4", "Paint covers 8 m² per litre. A warehouse wall (10 m × 4 m) has a square window (2 m × 2 m). How many litres are needed to paint the wall?", "B", ["5 L", "4.5 L", "36 L", "4 L"], "Area = 10×4 − 2×2 = 40 − 4 = 36 m². Litres = 36/8 = 4.5 L."),
        measurementAnswer("y12s2-comp-i5", "A hemisphere (half sphere, r = 5 cm) sits on top of a cylinder (r = 5, h = 10 cm). Find the total volume to 1 decimal place.", "V=\\frac{1}{2}\\cdot\\frac{4}{3}\\pi(125)+\\pi(25)(10)", "1047.2 cm^3", ["1047.2", "1047.2cm³"]),
      ],
      commonMistakes: [
        { mistake: "Adding all faces of both solids for surface area without removing the joined face.", fix: "Subtract 2 × joined face area (once from each solid) from the total before adding." },
        { mistake: "Forgetting to convert m³ to litres.", fix: "Multiply by 1000 to convert m³ to litres, or by 1000000 to get mL." },
        { mistake: "Treating a drilled-out solid as addition instead of subtraction.", fix: "When a shape is removed, subtract its volume from the whole." },
        { mistake: "Using diameter as radius in composite shapes.", fix: "r = diameter ÷ 2. Check each component's radius separately." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-comp-m1", "A composite solid: cube (5 × 5 × 5 cm) with a rectangular prism (5 × 5 × 3 cm) on top. Find total volume.", "V=125+75", "200 cm^3", ["200", "200cm³"]),
        practicalChoice("y12s2-comp-m2", "A cylindrical tank with r = 0.5 m and h = 1 m holds approximately:", "B", ["785 L", "785.4 L", "250 L", "1000 L"], "V = π(0.25)(1) = 0.25π m³ ≈ 0.7854 m³ = 785.4 L."),
        measurementAnswer("y12s2-comp-m3", "A rectangular room (5 × 4 × 3 m) needs the floor and 4 walls painted (no ceiling). Find the area in m².", "A=5\\times4+2(5\\times3)+2(4\\times3)", "74 m^2", ["74", "74m²"]),
        practicalChoice("y12s2-comp-m4", "When a cylinder is drilled out of a rectangular block, the remaining volume is:", "A", ["Block volume minus cylinder volume", "Block volume plus cylinder volume", "Cylinder volume only", "The average of the two volumes"], "Remove the drilled portion: subtract the cylinder volume."),
        measurementAnswer("y12s2-comp-m5", "A hemisphere with r = 9 cm. Find its volume to 1 decimal place.", "V=\\frac{1}{2}\\cdot\\frac{4}{3}\\pi(729)=\\frac{2}{3}\\pi(729)", "1526.8 cm^3", ["1526.8", "1526.8cm³"]),
        measurementAnswer("y12s2-comp-m6", "A fish tank is a rectangular prism: 80 × 40 × 50 cm. It is 3/4 full. Find the volume of water in litres.", "V=80\\times40\\times50\\times0.75=120000", "120 L", ["120", "120L"]),
        practicalChoice("y12s2-comp-m7", "Two equal cylinders are stacked (r = 4, h = 5 each). The total volume is:", "A", ["160π", "40π", "320π", "40π × 2 = 80π"], "Each cylinder: π(16)(5) = 80π. Two cylinders: 160π."),
        measurementAnswer("y12s2-comp-m8", "A ramp is a triangular prism: right-triangle cross-section with legs 1.2 m and 0.5 m, length 3 m. Find volume in m³.", "V=\\frac{1}{2}(1.2)(0.5)\\times3", "0.9 m^3", ["0.9", "0.9m³"]),
        measurementAnswer("y12s2-comp-m9", "A pool is 12 m long, 6 m wide and 2 m deep. Find the capacity in kilolitres (1 m³ = 1 kL).", "V=12\\times6\\times2", "144 kL", ["144", "144kL"]),
        practicalChoice("y12s2-comp-m10", "Paint covers 10 m² per litre. A cylindrical column has r = 0.3 m and h = 4 m. How many litres of paint to the nearest 0.1 L?", "B", ["1.6 L", "0.8 L", "7.5 L", "2.4 L"], "Curved surface = 2πrh = 2π(0.3)(4) ≈ 7.54 m². But only the curved surface is painted: 7.54/10 ≈ 0.8 L."),
      ],
    };
  }

  return null;
}
