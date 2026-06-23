// Year 9 Wave 6 — Chapter 5 (Length, Area, Surface Area & Volume) D6 challenge pools (Level-6 tier,
// post-mastery; ADR-Y9-001). 12 markable questions per section. Registered course-scoped in
// lib/challenges/index.ts (consolidating → Core; path → base + advanced; core → all 3).
// (circle-circumference-sector-perimeter D6 lives in year9Wave1.ts.)

import type { PracticeQuestion } from "../lessons/differentialCalculus";

function q(id: string, prompt: string, latex: string, answer: string, explanation: string, accepted: string[] = []): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty: 6, hint: "Challenge question — combine several steps.", explanation };
}
const cm = (a: string) => [a, `${a} cm`, `${a}cm`];
const a2 = (a: string) => [a, `${a} cm²`, `${a}cm²`, `${a} cm^2`];
const v3 = (a: string) => [a, `${a} cm³`, `${a}cm³`, `${a} cm^3`];
const pic = (n: number) => [`${n}π`, `${n}pi`, `${n} π`];

// length-and-perimeter (consol)
export const perimeterY9Challenge: PracticeQuestion[] = [
  q("y9c-lp-1", "A rectangle has perimeter 20 cm and width 4 cm. Find its length.", "P=20,w=4", "6", "2(l + 4) = 20 → l = 6.", cm("6")),
  q("y9c-lp-2", "A square has perimeter 36 cm. Find its side.", "P=36", "9", "36 ÷ 4 = 9.", cm("9")),
  q("y9c-lp-3", "A rectangle's length is twice its width; perimeter 36 cm. Find the width.", "l=2w,P=36", "6", "6w = 36 → w = 6.", cm("6")),
  q("y9c-lp-4", "An isosceles triangle has two 8 cm sides and a 5 cm base. Find the perimeter.", "8,8,5", "21", "8 + 8 + 5 = 21.", cm("21")),
  q("y9c-lp-5", "A regular hexagon has perimeter 48 cm. Find its side.", "P=48", "8", "48 ÷ 6 = 8.", cm("8")),
  q("y9c-lp-6", "A triangle has perimeter 30 cm with sides 11 cm and 7 cm. Find the third side.", "P=30,11,7", "12", "30 − 18 = 12.", cm("12")),
  q("y9c-lp-7", "A 50 m by 30 m field is fenced. Find the fencing length.", "50\\times30", "160", "2(50 + 30) = 160 m.", ["160", "160 m"]),
  q("y9c-lp-8", "A square has perimeter 50 cm. Find its side.", "P=50", "12.5", "50 ÷ 4 = 12.5.", cm("12.5")),
  q("y9c-lp-9", "A rectangle has perimeter 30 cm and length 9 cm. Find the width.", "P=30,l=9", "6", "2(9 + w) = 30 → w = 6.", cm("6")),
  q("y9c-lp-10", "An L-shape is a 6×4 rectangle with a 2×2 corner removed. Find the perimeter.", "\\text{L-shape}", "20", "Outer edges total 2(6 + 4) = 20.", cm("20")),
  q("y9c-lp-11", "A regular pentagon has side 6 cm. Find the perimeter.", "s=6", "30", "5 × 6 = 30.", cm("30")),
  q("y9c-lp-12", "A rectangle is 12 cm by 7 cm. Find the perimeter.", "12\\times7", "38", "2(12 + 7) = 38.", cm("38")),
];

// area (consol)
export const areaY9Challenge: PracticeQuestion[] = [
  q("y9c-ar-1", "Find the area of a trapezium: parallel sides 6 and 10, height 4.", "\\tfrac12(6+10)(4)", "32", "½(16)(4) = 32.", a2("32")),
  q("y9c-ar-2", "A triangle has area 24 cm² and base 8 cm. Find its height.", "A=24,b=8", "6", "24 = ½(8)h → h = 6.", cm("6")),
  q("y9c-ar-3", "A rectangle has area 48 cm² and width 6 cm. Find its length.", "A=48,w=6", "8", "48 ÷ 6 = 8.", cm("8")),
  q("y9c-ar-4", "Find the area of a trapezium: parallel sides 5 and 9, height 6.", "\\tfrac12(5+9)(6)", "42", "½(14)(6) = 42.", a2("42")),
  q("y9c-ar-5", "A square has area 49 cm². Find its side.", "A=49", "7", "√49 = 7.", cm("7")),
  q("y9c-ar-6", "A 10×6 rectangle has a 2×6 strip removed. Find the area.", "60-12", "48", "60 − 12 = 48.", a2("48")),
  q("y9c-ar-7", "A triangle has area 30 cm² and height 5 cm. Find its base.", "A=30,h=5", "12", "30 = ½(b)(5) → b = 12.", cm("12")),
  q("y9c-ar-8", "An 8×5 rectangle has a triangle (base 8, height 3) on top. Find the total area.", "40+12", "52", "40 + 12 = 52.", a2("52")),
  q("y9c-ar-9", "A parallelogram has area 60 cm² and base 12 cm. Find its height.", "A=60,b=12", "5", "60 ÷ 12 = 5.", cm("5")),
  q("y9c-ar-10", "Find the area of a trapezium: parallel sides 8 and 12, height 5.", "\\tfrac12(8+12)(5)", "50", "½(20)(5) = 50.", a2("50")),
  q("y9c-ar-11", "A 10×10 square has four 2×2 squares removed. Find the area.", "100-16", "84", "100 − 16 = 84.", a2("84")),
  q("y9c-ar-12", "Find the area of a triangle with base 15 cm and height 8 cm.", "\\tfrac12(15)(8)", "60", "½ × 120 = 60.", a2("60")),
];

// composite-shapes-perimeter-area (core)
export const compositeY9Challenge: PracticeQuestion[] = [
  q("y9c-cs-1", "A 12×8 rectangle has a semicircle (radius 4) removed. Find the area in terms of π.", "96-8\\pi", "96-8π", "96 − ½π(16) = 96 − 8π.", ["96 - 8π", "96-8pi"]),
  q("y9c-cs-2", "An L-shape: a 10×6 rectangle with a 4×3 corner removed. Find the perimeter.", "\\text{L-perimeter}", "32", "Outer edges total 2(10 + 6) = 32.", cm("32")),
  q("y9c-cs-3", "A 20×10 rectangle has two 3×3 squares removed. Find the area.", "200-18", "182", "200 − 18 = 182.", a2("182")),
  q("y9c-cs-4", "A trapezium (parallel sides 8 and 4, height 5) plus a 4×5 rectangle. Find the total area.", "30+20", "50", "30 + 20 = 50.", a2("50")),
  q("y9c-cs-5", "A 14×10 rectangle with a triangle (base 14, height 6) removed. Find the area.", "140-42", "98", "140 − 42 = 98.", a2("98")),
  q("y9c-cs-6", "A square side 10 with a quarter-circle (radius 10) removed. Find the area in terms of π.", "100-25\\pi", "100-25π", "100 − ¼π(100) = 100 − 25π.", ["100 - 25π", "100-25pi"]),
  q("y9c-cs-7", "Two triangles (each base 6, height 4) joined to a 6×5 rectangle. Find the total area.", "24+30", "54", "24 + 30 = 54.", a2("54")),
  q("y9c-cs-8", "A 16×9 rectangle with a 9×9 square removed. Find the area.", "144-81", "63", "144 − 81 = 63.", a2("63")),
  q("y9c-cs-9", "A house-shape: a 6×4 rectangle with a triangle (base 6, height 3) roof. Find the total area.", "24+9", "33", "24 + 9 = 33.", a2("33")),
  q("y9c-cs-10", "A 1 m × 2 m doorway is cut from a 5 m × 3 m wall. Find the remaining wall area.", "15-2", "13", "15 − 2 = 13 m².", ["13", "13 m²"]),
  q("y9c-cs-11", "An 8×6 rectangle plus a triangle (base 8, height 5). Find the total area.", "48+20", "68", "48 + 20 = 68.", a2("68")),
  q("y9c-cs-12", "A 12×12 square with four 2×2 corner squares removed. Find the area.", "144-16", "128", "144 − 16 = 128.", a2("128")),
];

// surface-area-prisms-pyramids (path)
export const saPrismsY9Challenge: PracticeQuestion[] = [
  q("y9c-sap-1", "A triangular prism (right-triangle legs 3, 4, hyp 5; length 10). Find the surface area.", "2(6)+(12)(10)", "132", "2 triangles (6 each) = 12; 3 rects (12)×10 = 120; total 132.", a2("132")),
  q("y9c-sap-2", "A square-based pyramid: base side 6, slant height 5. Find the surface area.", "36+4(15)", "96", "36 + 4(15) = 96.", a2("96")),
  q("y9c-sap-3", "Find the surface area of a 4×5×6 rectangular prism.", "2(20+24+30)", "148", "2(74) = 148.", a2("148")),
  q("y9c-sap-4", "A cube has surface area 96 cm². Find its side.", "6s^2=96", "4", "s² = 16 → s = 4.", cm("4")),
  q("y9c-sap-5", "A triangular prism (legs 6, 8, hyp 10; length 5). Find the surface area.", "2(24)+(24)(5)", "168", "48 + 120 = 168.", a2("168")),
  q("y9c-sap-6", "A square-based pyramid: base side 10, slant height 12. Find the surface area.", "100+4(60)", "340", "100 + 240 = 340.", a2("340")),
  q("y9c-sap-7", "Find the surface area of a 1×2×6 rectangular prism.", "2(2+6+12)", "40", "2(20) = 40.", a2("40")),
  q("y9c-sap-8", "A cube has surface area 150 cm². Find its side.", "6s^2=150", "5", "s² = 25 → s = 5.", cm("5")),
  q("y9c-sap-9", "An open-top box (no lid) is 4×4×3. Find the surface area.", "16+4(12)", "64", "Base 16 + 4 sides (12) = 64.", a2("64")),
  q("y9c-sap-10", "Find the surface area of a 7×3×2 rectangular prism.", "2(21+14+6)", "82", "2(41) = 82.", a2("82")),
  q("y9c-sap-11", "Find the surface area of a cube with side 9 cm.", "6\\times9^2", "486", "6 × 81 = 486.", a2("486")),
  q("y9c-sap-12", "Find the surface area of a 10×10×10 cube.", "6\\times100", "600", "6 × 100 = 600.", a2("600")),
];

// surface-area-cylinders (core)
export const saCylindersY9Challenge: PracticeQuestion[] = [
  q("y9c-sac-1", "Find the total surface area (in terms of π): r = 6, h = 4.", "2\\pi r(r+h)", "120π", "2π·6·10 = 120π.", pic(120)),
  q("y9c-sac-2", "Find the total surface area: r = 2, h = 5 (π ≈ 3.14, 2 d.p.).", "2\\pi r(r+h)", "87.92", "28π ≈ 87.92.", ["87.92"]),
  q("y9c-sac-3", "Find the total surface area (in terms of π): r = 10, h = 5.", "2\\pi r(r+h)", "300π", "2π·10·15 = 300π.", pic(300)),
  q("y9c-sac-4", "A cylinder has curved SA = 24π and r = 3. Find h.", "2\\pi rh=24\\pi", "4", "6h = 24 → h = 4.", cm("4")),
  q("y9c-sac-5", "Find the curved surface area (in terms of π): r = 7, h = 3.", "2\\pi rh", "42π", "2π·7·3 = 42π.", pic(42)),
  q("y9c-sac-6", "A cylinder has curved SA = 40π and h = 5. Find r.", "2\\pi rh=40\\pi", "4", "10r = 40 → r = 4.", cm("4")),
  q("y9c-sac-7", "Find the total surface area (in terms of π): r = 5, h = 3.", "2\\pi r(r+h)", "80π", "2π·5·8 = 80π.", pic(80)),
  q("y9c-sac-8", "Find the curved surface area: r = 5, h = 4 (π ≈ 3.14, 2 d.p.).", "2\\pi rh", "125.60", "40π ≈ 125.60.", ["125.6", "125.60"]),
  q("y9c-sac-9", "Find the total surface area (in terms of π): r = 3, h = 9.", "2\\pi r(r+h)", "72π", "2π·3·12 = 72π.", pic(72)),
  q("y9c-sac-10", "Find the total surface area (in terms of π): r = 4, h = 6.", "2\\pi r(r+h)", "80π", "2π·4·10 = 80π.", pic(80)),
  q("y9c-sac-11", "Find the curved surface area (in terms of π): r = 8, h = 2.", "2\\pi rh", "32π", "2π·8·2 = 32π.", pic(32)),
  q("y9c-sac-12", "Find the total surface area (in terms of π): r = 1, h = 9.", "2\\pi r(r+h)", "20π", "2π·1·10 = 20π.", pic(20)),
];

// volume-prisms (core)
export const volPrismsY9Challenge: PracticeQuestion[] = [
  q("y9c-vp-1", "A rectangular prism has volume 60 cm³ and base 3×4. Find its height.", "V=60,3\\times4", "5", "Base 12; 60 ÷ 12 = 5.", cm("5")),
  q("y9c-vp-2", "A cube has volume 64 cm³. Find its side.", "s^3=64", "4", "∛64 = 4.", cm("4")),
  q("y9c-vp-3", "A triangular prism (right-triangle legs 6, 8; length 10). Find the volume.", "(24)(10)", "240", "½·6·8 = 24; 24 × 10 = 240.", v3("240")),
  q("y9c-vp-4", "A rectangular prism has volume 120 cm³, length 6, width 4. Find its height.", "V=120,6,4", "5", "Base 24; 120 ÷ 24 = 5.", cm("5")),
  q("y9c-vp-5", "A cube has volume 125 cm³. Find its side.", "s^3=125", "5", "∛125 = 5.", cm("5")),
  q("y9c-vp-6", "A pool 10 m × 4 m × 2 m. Find its volume.", "10\\times4\\times2", "80", "80 m³.", ["80", "80 m³"]),
  q("y9c-vp-7", "A triangular prism has base area 15 cm² and volume 90 cm³. Find its length.", "V=90,A=15", "6", "90 ÷ 15 = 6.", cm("6")),
  q("y9c-vp-8", "A rectangular prism is 8×5×x with volume 160 cm³. Find x.", "8\\times5\\times x=160", "4", "40x = 160 → x = 4.", cm("4")),
  q("y9c-vp-9", "An L-shaped prism: cross-section 20 cm², length 7 cm. Find the volume.", "20\\times7", "140", "140.", v3("140")),
  q("y9c-vp-10", "How many 3 cm cubes fit in a 6×6×6 cube?", "6^3/3^3", "8", "216 ÷ 27 = 8.", ["8"]),
  q("y9c-vp-11", "Find the volume of a 12×3×2 rectangular prism.", "12\\times3\\times2", "72", "72.", v3("72")),
  q("y9c-vp-12", "A triangular prism (base ½·10·4 = 20; length 6). Find the volume.", "(20)(6)", "120", "20 × 6 = 120.", v3("120")),
];

// volume-cylinders (core)
export const volCylindersY9Challenge: PracticeQuestion[] = [
  q("y9c-vc-1", "Find the volume: r = 2, h = 5 (π ≈ 3.14, 2 d.p.).", "\\pi r^2 h", "62.80", "20π ≈ 62.80.", ["62.8", "62.80"]),
  q("y9c-vc-2", "Find the volume (in terms of π): r = 6, h = 5.", "\\pi r^2 h", "180π", "π·36·5 = 180π.", pic(180)),
  q("y9c-vc-3", "A cylinder has volume 50π and r = 5. Find h.", "\\pi r^2 h=50\\pi", "2", "25h = 50 → h = 2.", cm("2")),
  q("y9c-vc-4", "Find the volume: r = 3, h = 10 (π ≈ 3.14, 2 d.p.).", "\\pi r^2 h", "282.60", "90π ≈ 282.60.", ["282.6", "282.60"]),
  q("y9c-vc-5", "A cylinder has volume 36π and h = 4. Find r.", "\\pi r^2 h=36\\pi", "3", "r²·4 = 36 → r = 3.", cm("3")),
  q("y9c-vc-6", "Find the volume (in terms of π): r = 10, h = 10.", "\\pi r^2 h", "1000π", "π·100·10 = 1000π.", pic(1000)),
  q("y9c-vc-7", "A can has r = 4 cm, h = 10 cm. Find the volume (in terms of π).", "\\pi r^2 h", "160π", "π·16·10 = 160π.", pic(160)),
  q("y9c-vc-8", "Find the volume: r = 1, h = 1 (π ≈ 3.14, 2 d.p.).", "\\pi r^2 h", "3.14", "1π ≈ 3.14.", ["3.14"]),
  q("y9c-vc-9", "A cylinder has volume 100π and r = 5. Find h.", "\\pi r^2 h=100\\pi", "4", "25h = 100 → h = 4.", cm("4")),
  q("y9c-vc-10", "Find the volume (in terms of π): r = 7, h = 2.", "\\pi r^2 h", "98π", "π·49·2 = 98π.", pic(98)),
  q("y9c-vc-11", "Find the volume (in terms of π): r = 2, h = 9.", "\\pi r^2 h", "36π", "π·4·9 = 36π.", pic(36)),
  q("y9c-vc-12", "A cylinder has volume 12π and r = 2. Find h.", "\\pi r^2 h=12\\pi", "3", "4h = 12 → h = 3.", cm("3")),
];
