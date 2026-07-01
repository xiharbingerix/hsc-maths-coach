// Year 9 Wave 6 — Chapter 5, 3D-solid sections (ADR-Y9-001): surface-area-prisms-pyramids (path),
// surface-area-cylinders (core), volume-prisms (core), volume-cylinders (core). Full per-subtopic
// contract. Cylinder answers are given in terms of π (clean integer coefficients) unless a numeric
// value is requested (π ≈ 3.14).

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Use the surface-area or volume formula for the solid.", explanation };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Recall the formula for this solid.", explanation };
}
const sa = (a: string) => [a, `${a} cm²`, `${a}cm²`, `${a} cm^2`];
const vol = (a: string) => [a, `${a} cm³`, `${a}cm³`, `${a} cm^3`];
const pic = (n: number) => [`${n}π`, `${n}pi`, `${n} π`]; // π-form coefficients

// ── surface-area-prisms-pyramids (path) ────────────────────────────────────────────────
const surfaceAreaPrisms: Partial<ExplicitLesson> = {
  description: "Find the surface area of prisms and pyramids by summing the areas of all faces.",
  learningIntention: "Compute surface area by adding face areas.",
  successCriteria: ["Find the surface area of a cube.", "Find the surface area of a rectangular prism.", "Handle a triangular prism.", "Handle a simple pyramid."],
  teaching: {
    paragraphs: [
      "The SURFACE AREA of a solid is the total area of all its faces — find each face's area and ADD them.",
      "A CUBE has 6 equal square faces: SA = 6s². For side 4: 6 × 16 = 96.",
      "A RECTANGULAR PRISM has three pairs of faces: SA = 2(lw + lh + wh). For 2×3×4: 2(6 + 8 + 12) = 52.",
      "For a TRIANGULAR PRISM or PYRAMID, add the area of every triangular and rectangular face.",
    ],
    latexBlocks: ["SA_{\\text{cube}} = 6s^2", "SA_{\\text{prism}} = 2(lw + lh + wh)"],
  },
  workedExamples: [
    { title: "Cube", questionLatex: "\\text{Cube side } 4.", steps: [{ explanation: "6 × 16.", latex: "96" }], finalAnswerLatex: "96" },
    { title: "Rectangular prism", questionLatex: "2 \\times 3 \\times 4.", steps: [{ explanation: "2(6 + 8 + 12).", latex: "52" }], finalAnswerLatex: "52" },
    { title: "Cube again", questionLatex: "\\text{Cube side } 5.", steps: [{ explanation: "6 × 25.", latex: "150" }], finalAnswerLatex: "150" },
  ],
  guidedPractice: [
    ans("y9-sap-g1", "Find the surface area of a cube with side 3 cm.", "", "54", 2, "6 × 9 = 54.", sa("54")),
    ans("y9-sap-g2", "Find the surface area of a 1×2×3 rectangular prism.", "", "22", 3, "2(2 + 3 + 6) = 22.", sa("22")),
    ans("y9-sap-g3", "Find the surface area of a cube with side 2 cm.", "", "24", 2, "6 × 4 = 24.", sa("24")),
    mcq("y9-sap-g4", "Surface area is the:", "A", ["sum of all face areas", "space inside", "longest edge", "base area only"], 2, "Add all the faces."),
  ],
  independentPractice: [
    ans("y9-sap-i1", "Find the surface area of a cube with side 6 cm.", "", "216", 2, "6 × 36 = 216.", sa("216")),
    ans("y9-sap-i2", "Find the surface area of a 2×2×5 rectangular prism.", "", "48", 3, "2(4 + 10 + 10) = 48.", sa("48")),
    ans("y9-sap-i3", "Find the surface area of a cube with side 10 cm.", "", "600", 2, "6 × 100 = 600.", sa("600")),
    ans("y9-sap-i4", "Find the surface area of a 3×3×4 rectangular prism.", "", "66", 3, "2(9 + 12 + 12) = 66.", sa("66")),
    mcq("y9-sap-i5", "A cube's surface area is:", "B", ["s³", "6s²", "4s²", "s²"], 2, "6 faces of s²."),
  ],
  masteryQuiz: [
    ans("y9-sap-m1", "Find the surface area of a cube with side 4 cm.", "", "96", 2, "96.", sa("96")),
    ans("y9-sap-m2", "Find the surface area of a 2×3×4 rectangular prism.", "", "52", 3, "52.", sa("52")),
    ans("y9-sap-m3", "Find the surface area of a cube with side 5 cm.", "", "150", 2, "150.", sa("150")),
    ans("y9-sap-m4", "Find the surface area of a 1×1×1 cube.", "", "6", 2, "6.", sa("6")),
    mcq("y9-sap-m5", "A rectangular prism's surface area is:", "C", ["lwh", "6s²", "2(lw + lh + wh)", "l + w + h"], 3, "Three pairs of faces."),
    ans("y9-sap-m6", "Find the surface area of a cube with side 7 cm.", "", "294", 3, "6 × 49 = 294.", sa("294")),
    ans("y9-sap-m7", "Find the surface area of a 5×4×3 rectangular prism.", "", "94", 3, "2(20 + 15 + 12) = 94.", sa("94")),
    ans("y9-sap-m8", "Find the surface area of a cube with side 8 cm.", "", "384", 3, "6 × 64 = 384.", sa("384")),
    ans("y9-sap-m9", "Find the surface area of a 2×3×5 rectangular prism.", "", "62", 3, "2(6 + 10 + 15) = 62.", sa("62")),
    mcq("y9-sap-m10", "To find a prism's surface area you:", "A", ["add the area of every face", "multiply length × width × height", "use πr²", "find the diagonal"], 2, "Sum all face areas."),
  ],
  masteryQuizPool: [
    ans("y9-sap-p1", "A triangular prism has a right-triangle cross-section (legs 3, 4, hyp 5) and length 10. Find the surface area.", "", "132", 5, "2 triangles (½·3·4 = 6 each) = 12; 3 rectangles (3+4+5)×10 = 120; total 132.", sa("132")),
    ans("y9-sap-p2", "A square-based pyramid has base side 6 and slant height 5. Find the surface area.", "", "96", 5, "Base 36 + 4 triangles (½·6·5 = 15) = 60; total 96.", sa("96")),
    ans("y9-sap-p3", "Find the surface area of a 4×5×6 rectangular prism.", "", "148", 5, "2(20 + 24 + 30) = 148.", sa("148")),
    ans("y9-sap-p4", "A cube has surface area 96 cm². Find its side length.", "", "4", 5, "s² = 16 → s = 4.", ["4", "4 cm"]),
    ans("y9-sap-p5", "A triangular prism has cross-section ½·6·8 = 24 (legs 6, 8, hyp 10), length 5. Find the surface area.", "", "168", 5, "2(24) = 48; (24)×5 = 120; total 168.", sa("168")),
    ans("y9-sap-p6", "A square-based pyramid has base side 10 and slant height 12. Find the surface area.", "", "340", 5, "100 + 4(60) = 340.", sa("340")),
    ans("y9-sap-p7", "Find the surface area of a 1×2×6 rectangular prism.", "", "40", 5, "2(2 + 6 + 12) = 40.", sa("40")),
    ans("y9-sap-p8", "A cube has surface area 150 cm². Find its side length.", "", "5", 5, "s² = 25 → s = 5.", ["5", "5 cm"]),
    ans("y9-sap-p9", "An open-top box (no lid) is 4×4×3. Find the surface area.", "", "64", 5, "Base 16 + 4 sides (4·3 = 12) = 16 + 48 = 64.", sa("64")),
    ans("y9-sap-p10", "Find the surface area of a 7×3×2 rectangular prism.", "", "82", 5, "2(21 + 14 + 6) = 82.", sa("82")),
  ],
  commonMistakes: [
    { mistake: "Confusing surface area with volume.", fix: "Surface area sums faces (cm²); volume fills space (cm³)." },
    { mistake: "Counting only some faces of a prism.", fix: "Include all 6 faces (three pairs)." },
    { mistake: "Using the slant of a pyramid as a base edge.", fix: "Slant height is for the triangular faces." },
    { mistake: "Including a missing face (open box).", fix: "Leave out a face that isn't there." },
  ],
  masteryPassMark: 0.8,
};

// ── surface-area-cylinders (core) ──────────────────────────────────────────────────────
const surfaceAreaCylinders: Partial<ExplicitLesson> = {
  description: "Find the curved and total surface area of a cylinder using 2πrh and 2πr(r + h).",
  learningIntention: "Compute cylinder surface area, in terms of π.",
  successCriteria: ["Use curved SA = 2πrh.", "Use total SA = 2πr(r + h).", "Give answers in terms of π.", "Identify r and h."],
  teaching: {
    paragraphs: [
      "A cylinder's CURVED surface unrolls into a rectangle of width 2πr (the circumference) and height h, so the CURVED surface area is 2πrh.",
      "The TOTAL surface area adds the two circular ends (each πr²): SA = 2πr² + 2πrh = 2πr(r + h).",
      "For r = 2, h = 5: total SA = 2π(2)(2 + 5) = 28π.",
      "Give answers in terms of π (e.g. 28π) unless a decimal is asked for (then use π ≈ 3.14).",
    ],
    latexBlocks: ["\\text{curved} = 2\\pi r h", "\\text{total} = 2\\pi r(r + h)"],
  },
  workedExamples: [
    { title: "Total SA", questionLatex: "r=2, h=5. \\text{ Total SA?}", steps: [{ explanation: "2π·2·(2+5).", latex: "28\\pi" }], finalAnswerLatex: "28\\pi" },
    { title: "Total SA", questionLatex: "r=3, h=4. \\text{ Total SA?}", steps: [{ explanation: "2π·3·7.", latex: "42\\pi" }], finalAnswerLatex: "42\\pi" },
    { title: "Curved SA", questionLatex: "r=5, h=10. \\text{ Curved SA?}", steps: [{ explanation: "2π·5·10.", latex: "100\\pi" }], finalAnswerLatex: "100\\pi" },
  ],
  guidedPractice: [
    ans("y9-sac-g1", "Find the total surface area (in terms of π): r = 1, h = 4.", "", "10π", 3, "2π·1·5 = 10π.", pic(10)),
    ans("y9-sac-g2", "Find the curved surface area (in terms of π): r = 2, h = 3.", "", "12π", 2, "2π·2·3 = 12π.", pic(12)),
    ans("y9-sac-g3", "Find the total surface area (in terms of π): r = 2, h = 8.", "", "40π", 3, "2π·2·10 = 40π.", pic(40)),
    mcq("y9-sac-g4", "The curved surface area of a cylinder is:", "B", ["πr²", "2πrh", "πr²h", "2πr"], 2, "Curved SA = 2πrh."),
  ],
  independentPractice: [
    ans("y9-sac-i1", "Find the curved surface area (in terms of π): r = 3, h = 5.", "", "30π", 2, "2π·3·5 = 30π.", pic(30)),
    ans("y9-sac-i2", "Find the total surface area (in terms of π): r = 4, h = 6.", "", "80π", 3, "2π·4·10 = 80π.", pic(80)),
    ans("y9-sac-i3", "Find the curved surface area (in terms of π): r = 1, h = 10.", "", "20π", 2, "2π·1·10 = 20π.", pic(20)),
    ans("y9-sac-i4", "Find the total surface area (in terms of π): r = 5, h = 5.", "", "100π", 3, "2π·5·10 = 100π.", pic(100)),
    mcq("y9-sac-i5", "The total surface area of a cylinder is:", "C", ["2πrh", "πr²", "2πr² + 2πrh", "πr²h"], 3, "Two ends plus the curved part."),
  ],
  masteryQuiz: [
    ans("y9-sac-m1", "Find the curved surface area (in terms of π): r = 2, h = 5.", "", "20π", 2, "2π·2·5 = 20π.", pic(20)),
    ans("y9-sac-m2", "Find the total surface area (in terms of π): r = 3, h = 7.", "", "60π", 3, "2π·3·10 = 60π.", pic(60)),
    ans("y9-sac-m3", "Find the curved surface area (in terms of π): r = 4, h = 10.", "", "80π", 2, "2π·4·10 = 80π.", pic(80)),
    ans("y9-sac-m4", "Find the total surface area (in terms of π): r = 1, h = 1.", "", "4π", 3, "2π·1·2 = 4π.", pic(4)),
    mcq("y9-sac-m5", "The total surface area is 2πr² plus:", "A", ["2πrh", "πr²", "2πr", "πrh"], 2, "Plus the curved 2πrh."),
    ans("y9-sac-m6", "Find the curved surface area (in terms of π): r = 6, h = 5.", "", "60π", 2, "2π·6·5 = 60π.", pic(60)),
    ans("y9-sac-m7", "Find the total surface area (in terms of π): r = 2, h = 3.", "", "20π", 3, "2π·2·5 = 20π.", pic(20)),
    ans("y9-sac-m8", "Find the curved surface area (in terms of π): r = 10, h = 2.", "", "40π", 2, "2π·10·2 = 40π.", pic(40)),
    ans("y9-sac-m9", "Find the total surface area (in terms of π): r = 4, h = 1.", "", "40π", 3, "2π·4·5 = 40π.", pic(40)),
    mcq("y9-sac-m10", "The curved surface unrolls into a rectangle of width:", "B", ["πr", "2πr", "πr²", "r"], 3, "Width = circumference = 2πr."),
  ],
  masteryQuizPool: [
    ans("y9-sac-p1", "Find the curved surface area: r = 3, h = 5 (π ≈ 3.14, 2 d.p.).", "", "94.20", 5, "30π ≈ 94.20.", ["94.2", "94.20"]),
    ans("y9-sac-p2", "Find the total surface area (in terms of π): r = 6, h = 4.", "", "120π", 5, "2π·6·10 = 120π.", pic(120)),
    ans("y9-sac-p3", "Find the total surface area: r = 2, h = 5 (π ≈ 3.14, 2 d.p.).", "", "87.92", 5, "28π ≈ 87.92.", ["87.92"]),
    ans("y9-sac-p4", "A cylinder has curved SA = 24π and r = 3. Find h.", "", "4", 5, "6h = 24 → h = 4.", ["4", "4 cm"]),
    ans("y9-sac-p5", "Find the total surface area (in terms of π): r = 10, h = 5.", "", "300π", 5, "2π·10·15 = 300π.", pic(300)),
    ans("y9-sac-p6", "Find the curved surface area (in terms of π): r = 7, h = 3.", "", "42π", 5, "2π·7·3 = 42π.", pic(42)),
    ans("y9-sac-p7", "A cylinder has curved SA = 40π and h = 5. Find r.", "", "4", 5, "10r = 40 → r = 4.", ["4", "4 cm"]),
    ans("y9-sac-p8", "Find the total surface area (in terms of π): r = 5, h = 3.", "", "80π", 5, "2π·5·8 = 80π.", pic(80)),
    ans("y9-sac-p9", "Find the curved surface area: r = 5, h = 4 (π ≈ 3.14, 2 d.p.).", "", "125.60", 5, "40π ≈ 125.60.", ["125.6", "125.60"]),
    ans("y9-sac-p10", "Find the total surface area (in terms of π): r = 3, h = 9.", "", "72π", 5, "2π·3·12 = 72π.", pic(72)),
  ],
  commonMistakes: [
    { mistake: "Forgetting the two circular ends in total SA.", fix: "Total SA = 2πr² + 2πrh." },
    { mistake: "Using πr² (area) for the curved surface.", fix: "Curved SA = 2πrh." },
    { mistake: "Mixing up r and h.", fix: "r is the radius; h is the height." },
    { mistake: "Leaving a numeric answer when π-form is asked (or vice versa).", fix: "Match the requested form." },
  ],
  masteryPassMark: 0.8,
};

// ── volume-prisms (core) ───────────────────────────────────────────────────────────────
const volumePrisms: Partial<ExplicitLesson> = {
  description: "Find the volume of prisms as base area × height (length).",
  learningIntention: "Compute prism volumes.",
  successCriteria: ["Use V = base area × length.", "Find rectangular-prism volume.", "Find cube volume.", "Handle a triangular prism."],
  teaching: {
    paragraphs: [
      "The VOLUME of any PRISM is the cross-sectional (base) AREA times the LENGTH: V = A_base × length.",
      "A rectangular prism 2×3×4 has volume 2 × 3 × 4 = 24. A cube has V = s³ (side 5 → 125).",
      "A TRIANGULAR prism: find the triangle's area (½bh), then multiply by the length. Base area 12, length 10 → 120.",
      "Volume is measured in CUBIC units (cm³, m³).",
    ],
    latexBlocks: ["V_{\\text{prism}} = A_{\\text{base}} \\times \\text{length}", "V_{\\text{cube}} = s^3"],
  },
  workedExamples: [
    { title: "Rectangular prism", questionLatex: "2 \\times 3 \\times 4.", steps: [{ explanation: "Multiply.", latex: "24" }], finalAnswerLatex: "24" },
    { title: "Cube", questionLatex: "\\text{Side } 5.", steps: [{ explanation: "5³.", latex: "125" }], finalAnswerLatex: "125" },
    { title: "Triangular prism", questionLatex: "\\text{base area } 12, \\text{ length } 10.", steps: [{ explanation: "12 × 10.", latex: "120" }], finalAnswerLatex: "120" },
  ],
  guidedPractice: [
    ans("y9-vp-g1", "Find the volume of a 3×4×5 rectangular prism.", "", "60", 2, "60.", vol("60")),
    ans("y9-vp-g2", "Find the volume of a cube with side 3 cm.", "", "27", 2, "27.", vol("27")),
    ans("y9-vp-g3", "A triangular prism has base area 6 cm² and length 5 cm. Find the volume.", "", "30", 2, "30.", vol("30")),
    mcq("y9-vp-g4", "The volume of a prism is:", "A", ["base area × length", "2 × base area", "base perimeter × length", "½ base × length"], 2, "V = base area × length."),
  ],
  independentPractice: [
    ans("y9-vp-i1", "Find the volume of a 2×2×10 rectangular prism.", "", "40", 2, "40.", vol("40")),
    ans("y9-vp-i2", "Find the volume of a cube with side 4 cm.", "", "64", 2, "64.", vol("64")),
    ans("y9-vp-i3", "A triangular prism has cross-section ½·8·3 = 12 cm² and length 5 cm. Find the volume.", "", "60", 3, "60.", vol("60")),
    ans("y9-vp-i4", "Find the volume of a 5×5×2 rectangular prism.", "", "50", 2, "50.", vol("50")),
    mcq("y9-vp-i5", "Volume is measured in:", "C", ["units", "square units", "cubic units", "degrees"], 2, "Cubic units."),
  ],
  masteryQuiz: [
    ans("y9-vp-m1", "Find the volume of a 2×3×4 rectangular prism.", "", "24", 2, "24.", vol("24")),
    ans("y9-vp-m2", "Find the volume of a cube with side 6 cm.", "", "216", 2, "216.", vol("216")),
    ans("y9-vp-m3", "Find the volume of a 10×2×3 rectangular prism.", "", "60", 2, "60.", vol("60")),
    ans("y9-vp-m4", "A triangular prism has base area 10 cm² and length 4 cm. Find the volume.", "", "40", 2, "40.", vol("40")),
    mcq("y9-vp-m5", "The volume of a cube is:", "B", ["6s²", "s³", "s²", "3s"], 2, "V = s³."),
    ans("y9-vp-m6", "Find the volume of a cube with side 2 cm.", "", "8", 2, "8.", vol("8")),
    ans("y9-vp-m7", "Find the volume of a 7×2×2 rectangular prism.", "", "28", 2, "28.", vol("28")),
    ans("y9-vp-m8", "A triangular prism has cross-section ½·4·3 = 6 cm² and length 10 cm. Find the volume.", "", "60", 3, "60.", vol("60")),
    ans("y9-vp-m9", "Find the volume of a 5×4×3 rectangular prism.", "", "60", 2, "60.", vol("60")),
    mcq("y9-vp-m10", "For a triangular prism, the base area is found with:", "A", ["½ × base × height", "base × height", "πr²", "2(l + w)"], 2, "Triangle area = ½bh."),
  ],
  masteryQuizPool: [
    ans("y9-vp-p1", "A rectangular prism has volume 60 cm³ and base 3×4. Find its height.", "V=60,3\\times4", "5", 5, "Base area 12; 60 ÷ 12 = 5.", ["5", "5 cm"]),
    ans("y9-vp-p2", "A cube has volume 64 cm³. Find its side length.", "", "4", 5, "∛64 = 4.", ["4", "4 cm"]),
    ans("y9-vp-p3", "A triangular prism has a right-triangle cross-section (legs 6, 8) and length 10. Find the volume.", "", "240", 5, "24 × 10 = 240.", vol("240")),
    ans("y9-vp-p4", "A rectangular prism has volume 120 cm³, length 6 and width 4. Find its height.", "V=120,6,4", "5", 5, "Base 24; 120 ÷ 24 = 5.", ["5", "5 cm"]),
    ans("y9-vp-p5", "A cube has volume 125 cm³. Find its side length.", "", "5", 5, "∛125 = 5.", ["5", "5 cm"]),
    ans("y9-vp-p6", "A pool 10 m × 4 m × 2 m is filled. Find its volume.", "", "80", 5, "80 m³.", ["80", "80 m³"]),
    ans("y9-vp-p7", "A triangular prism has base area 15 cm² and volume 90 cm³. Find its length.", "V=90,A=15", "6", 5, "90 ÷ 15 = 6.", ["6", "6 cm"]),
    ans("y9-vp-p8", "A rectangular prism is 8×5×x with volume 160 cm³. Find x.", "", "4", 5, "40x = 160 → x = 4.", ["4", "4 cm"]),
    ans("y9-vp-p9", "An L-shaped prism: cross-section area 20 cm², length 7 cm. Find the volume.", "", "140", 5, "140.", vol("140")),
    ans("y9-vp-p10", "A cube of side 3 cm — how many fit in a 6×6×6 cube?", "", "8", 5, "216 ÷ 27 = 8.", ["8"]),
  ],
  commonMistakes: [
    { mistake: "Using perimeter instead of area for the base.", fix: "Use the base AREA × length." },
    { mistake: "Forgetting the ½ for a triangular cross-section.", fix: "Triangle base area = ½bh." },
    { mistake: "Giving volume in square units.", fix: "Volume is in cubic units (cm³)." },
    { mistake: "Confusing s² with s³ for a cube.", fix: "Volume = s³." },
  ],
  masteryPassMark: 0.8,
};

// ── volume-cylinders (core) ────────────────────────────────────────────────────────────
const volumeCylinders: Partial<ExplicitLesson> = {
  description: "Find the volume of a cylinder using V = πr²h, in terms of π.",
  learningIntention: "Compute cylinder volumes.",
  successCriteria: ["Use V = πr²h.", "Give answers in terms of π.", "Identify r and h.", "Find a missing dimension."],
  teaching: {
    paragraphs: [
      "A cylinder is a prism with a CIRCULAR base, so its volume is the base area (πr²) times the height: V = πr²h.",
      "For r = 2, h = 5: V = π(2²)(5) = 20π.",
      "Square the radius FIRST, then multiply by the height. For r = 3, h = 10: π(9)(10) = 90π.",
      "Give answers in terms of π unless a decimal is requested (π ≈ 3.14).",
    ],
    latexBlocks: ["V_{\\text{cylinder}} = \\pi r^2 h", "\\pi(2^2)(5) = 20\\pi"],
  },
  workedExamples: [
    { title: "Volume", questionLatex: "r=2, h=5.", steps: [{ explanation: "π·4·5.", latex: "20\\pi" }], finalAnswerLatex: "20\\pi" },
    { title: "Volume", questionLatex: "r=3, h=10.", steps: [{ explanation: "π·9·10.", latex: "90\\pi" }], finalAnswerLatex: "90\\pi" },
    { title: "Volume", questionLatex: "r=1, h=7.", steps: [{ explanation: "π·1·7.", latex: "7\\pi" }], finalAnswerLatex: "7\\pi" },
  ],
  guidedPractice: [
    ans("y9-vc-g1", "Find the volume (in terms of π): r = 2, h = 3.", "", "12π", 2, "π·4·3 = 12π.", pic(12)),
    ans("y9-vc-g2", "Find the volume (in terms of π): r = 1, h = 10.", "", "10π", 2, "π·1·10 = 10π.", pic(10)),
    ans("y9-vc-g3", "Find the volume (in terms of π): r = 5, h = 2.", "", "50π", 3, "π·25·2 = 50π.", pic(50)),
    mcq("y9-vc-g4", "The volume of a cylinder is:", "A", ["πr²h", "2πrh", "πr²", "2πr(r + h)"], 2, "V = πr²h."),
  ],
  independentPractice: [
    ans("y9-vc-i1", "Find the volume (in terms of π): r = 3, h = 4.", "", "36π", 2, "π·9·4 = 36π.", pic(36)),
    ans("y9-vc-i2", "Find the volume (in terms of π): r = 2, h = 10.", "", "40π", 2, "π·4·10 = 40π.", pic(40)),
    ans("y9-vc-i3", "Find the volume (in terms of π): r = 4, h = 5.", "", "80π", 3, "π·16·5 = 80π.", pic(80)),
    ans("y9-vc-i4", "Find the volume (in terms of π): r = 10, h = 1.", "", "100π", 3, "π·100·1 = 100π.", pic(100)),
    mcq("y9-vc-i5", "In V = πr²h, you first:", "B", ["multiply r by h", "square the radius", "double the radius", "add r and h"], 2, "Square r, then × h."),
  ],
  masteryQuiz: [
    ans("y9-vc-m1", "Find the volume (in terms of π): r = 2, h = 5.", "", "20π", 2, "20π.", pic(20)),
    ans("y9-vc-m2", "Find the volume (in terms of π): r = 3, h = 3.", "", "27π", 2, "π·9·3 = 27π.", pic(27)),
    ans("y9-vc-m3", "Find the volume (in terms of π): r = 1, h = 12.", "", "12π", 2, "12π.", pic(12)),
    ans("y9-vc-m4", "Find the volume (in terms of π): r = 5, h = 4.", "", "100π", 3, "π·25·4 = 100π.", pic(100)),
    mcq("y9-vc-m5", "A cylinder is a prism with a base that is a:", "C", ["square", "triangle", "circle", "rectangle"], 2, "Circular base."),
    ans("y9-vc-m6", "Find the volume (in terms of π): r = 2, h = 2.", "", "8π", 2, "π·4·2 = 8π.", pic(8)),
    ans("y9-vc-m7", "Find the volume (in terms of π): r = 4, h = 10.", "", "160π", 3, "π·16·10 = 160π.", pic(160)),
    ans("y9-vc-m8", "Find the volume (in terms of π): r = 3, h = 5.", "", "45π", 3, "π·9·5 = 45π.", pic(45)),
    ans("y9-vc-m9", "Find the volume (in terms of π): r = 6, h = 2.", "", "72π", 3, "π·36·2 = 72π.", pic(72)),
    mcq("y9-vc-m10", "If the radius doubles (height fixed), the volume:", "D", ["doubles", "stays the same", "triples", "quadruples"], 4, "V ∝ r², so ×4."),
  ],
  masteryQuizPool: [
    ans("y9-vc-p1", "Find the volume: r = 2, h = 5 (π ≈ 3.14, 2 d.p.).", "", "62.80", 5, "20π ≈ 62.80.", ["62.8", "62.80"]),
    ans("y9-vc-p2", "Find the volume (in terms of π): r = 6, h = 5.", "", "180π", 5, "π·36·5 = 180π.", pic(180)),
    ans("y9-vc-p3", "A cylinder has volume 50π and r = 5. Find h.", "", "2", 5, "25h = 50 → h = 2.", ["2", "2 cm"]),
    ans("y9-vc-p4", "Find the volume: r = 3, h = 10 (π ≈ 3.14, 2 d.p.).", "", "282.60", 5, "90π ≈ 282.60.", ["282.6", "282.60"]),
    ans("y9-vc-p5", "A cylinder has volume 36π and h = 4. Find r.", "", "3", 5, "r²·4 = 36 → r² = 9 → r = 3.", ["3", "3 cm"]),
    ans("y9-vc-p6", "Find the volume (in terms of π): r = 10, h = 10.", "", "1000π", 5, "π·100·10 = 1000π.", pic(1000)),
    ans("y9-vc-p7", "A can has r = 4 cm and h = 10 cm. Find its volume (in terms of π).", "", "160π", 5, "π·16·10 = 160π.", pic(160)),
    ans("y9-vc-p8", "Find the volume: r = 1, h = 1 (π ≈ 3.14, 2 d.p.).", "", "3.14", 5, "1π ≈ 3.14.", ["3.14"]),
    ans("y9-vc-p9", "A cylinder has volume 100π and r = 5. Find h.", "", "4", 5, "25h = 100 → h = 4.", ["4", "4 cm"]),
    ans("y9-vc-p10", "Find the volume (in terms of π): r = 7, h = 2.", "", "98π", 5, "π·49·2 = 98π.", pic(98)),
  ],
  commonMistakes: [
    { mistake: "Using 2πr or πr instead of πr².", fix: "Base area is πr²." },
    { mistake: "Multiplying r by h before squaring.", fix: "Square the radius first." },
    { mistake: "Using the diameter as the radius.", fix: "Radius = diameter ÷ 2." },
    { mistake: "Giving volume in square units.", fix: "Volume is in cubic units." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "surface-area-prisms-pyramids": surfaceAreaPrisms,
  "surface-area-cylinders": surfaceAreaCylinders,
  "volume-prisms": volumePrisms,
  "volume-cylinders": volumeCylinders,
};

export function year9Chapter5SolidsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (!["year-9-mathematics", "year-9-mathematics-core", "year-9-mathematics-advanced"].includes(course.slug) || unit.slug !== "length-area-surface-area-volume") {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
